// Диагностика: ЖИ провайдері бапталған ба? (кілттің өзі ешқашан қайтарылмайды)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function key(name: string): string | null {
  const v = (process.env[name] || '').trim();
  if (!v || v.length < 20) return null;
  if (/МҰНДА|ӨЗ_КІЛТ|your[-_ ]?key|xxx|\.\.\./i.test(v)) return null;
  return v;
}

export async function GET() {
  const providers = {
    openai: !!key('OPENAI_API_KEY'),
    openrouter: !!key('OPENROUTER_API_KEY'),
    groq: !!key('GROQ_API_KEY'),
    gemini: !!key('GEMINI_API_KEY'),
  };
  const active = Object.entries(providers).find(([, v]) => v)?.[0] ?? null;

  return Response.json({
    configured: !!active,
    provider: active,
    model: process.env.AI_MODEL || (active ? 'әдепкі модель' : null),
    hint: active
      ? 'ЖИ қосулы. Егер бәрібір офлайн болса — кілттің дұрыстығын және лимитті тексеріңіз.'
      : '.env.local файлына GROQ_API_KEY / OPENAI_API_KEY / OPENROUTER_API_KEY / GEMINI_API_KEY қосып, серверді қайта іске қосыңыз.',
  });
}
