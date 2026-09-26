// ЖИ-көмекшінің серверлік API маршруты.
// Кез келген OpenAI-үйлесімді провайдермен жұмыс істейді (OpenAI, OpenRouter, Groq, Gemini-ның OpenAI режимі).
// API кілті тек серверде тұрады — браузерге ешқашан жіберілмейді.

import { NextRequest } from 'next/server';
import { buildSystemPrompt } from '@/lib/ai-prompt';
import { checkScope } from '@/lib/ai-scope';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface Provider {
  url: string;
  key: string;
  model: string;
  headers?: Record<string, string>;
}

/** Қолжетімді провайдерді env айнымалылары бойынша табу. */
function resolveProvider(): Provider | null {
  const model = process.env.AI_MODEL;

  if (process.env.OPENAI_API_KEY) {
    return {
      url: (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1') + '/chat/completions',
      key: process.env.OPENAI_API_KEY,
      model: model || 'gpt-4o-mini',
    };
  }
  if (process.env.OPENROUTER_API_KEY) {
    return {
      url: 'https://openrouter.ai/api/v1/chat/completions',
      key: process.env.OPENROUTER_API_KEY,
      model: model || 'openai/gpt-4o-mini',
      headers: { 'X-Title': 'SynypKz' },
    };
  }
  if (process.env.GROQ_API_KEY) {
    return {
      url: 'https://api.groq.com/openai/v1/chat/completions',
      key: process.env.GROQ_API_KEY,
      model: model || 'llama-3.3-70b-versatile',
    };
  }
  if (process.env.GEMINI_API_KEY) {
    return {
      url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
      key: process.env.GEMINI_API_KEY,
      model: model || 'gemini-2.0-flash',
    };
  }
  return null;
}

interface InMsg {
  role: 'user' | 'assistant';
  content: string;
}

function sse(data: unknown) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export async function POST(req: NextRequest) {
  let body: { messages?: InMsg[]; userName?: string; role?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'bad_request' }, { status: 400 });
  }

  const history = (body.messages || [])
    .filter((m) => m && typeof m.content === 'string' && m.content.trim())
    .slice(-12)
    .map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content.slice(0, 4000) }));

  const last = [...history].reverse().find((m) => m.role === 'user');
  if (!last) return Response.json({ error: 'empty' }, { status: 400 });

  // 1-қорған: сервер жағындағы тақырып сүзгісі (модельге жеткізбей тоқтатады)
  const verdict = checkScope(last.content);
  if (verdict.kind !== 'allow') {
    return new Response(
      sse({ delta: verdict.reply }) + sse({ done: true, blocked: true }),
      { headers: { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-store' } }
    );
  }

  const provider = resolveProvider();
  if (!provider) {
    // Кілт жоқ — клиент офлайн «мида» жауап береді
    return Response.json({ error: 'no_provider' }, { status: 503 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(provider.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${provider.key}`,
        ...(provider.headers || {}),
      },
      body: JSON.stringify({
        model: provider.model,
        stream: true,
        temperature: 0.4,
        max_tokens: 900,
        messages: [
          { role: 'system', content: buildSystemPrompt({ userName: body.userName, role: body.role }) },
          ...history,
        ],
      }),
    });
  } catch {
    return Response.json({ error: 'upstream_unreachable' }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => '');
    console.error('AI provider error', upstream.status, text.slice(0, 500));
    return Response.json({ error: 'upstream_error', status: upstream.status }, { status: 502 });
  }

  // OpenAI SSE ағынын клиентке қарапайым пішімде қайта жіберу
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const enc = new TextEncoder();
      const dec = new TextDecoder();
      const reader = upstream.body!.getReader();
      let buffer = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += dec.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            const s = line.trim();
            if (!s.startsWith('data:')) continue;
            const payload = s.slice(5).trim();
            if (payload === '[DONE]') continue;
            try {
              const json = JSON.parse(payload);
              const delta = json?.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(enc.encode(sse({ delta })));
            } catch {
              /* толық емес чанк — елемейміз */
            }
          }
        }
        controller.enqueue(enc.encode(sse({ done: true })));
      } catch (e) {
        controller.enqueue(enc.encode(sse({ error: 'stream_error' })));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-store, no-transform',
      Connection: 'keep-alive',
    },
  });
}
