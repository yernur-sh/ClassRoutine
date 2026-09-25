'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '@/lib/store';
import { answer, QUICK_PROMPTS, type ChatMessage } from '@/lib/assistant';
import { PageHeader, Avatar } from '@/components/ui';
import { Sparkles, Send, Bot, RotateCcw, Lightbulb, ShieldCheck } from 'lucide-react';

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/** Қарапайым мәтін безендіру: **қалың**, жол ауысу, • тізім. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <p key={i} className={line.startsWith('•') || /^\d+\./.test(line) ? 'pl-1' : ''}>
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={j} className="font-bold">
                {part.slice(2, -2)}
              </strong>
            ) : (
              <span key={j}>{part}</span>
            )
          )}
        </p>
      ))}
    </>
  );
}

export default function AiAssistant() {
  const { user } = useApp();
  const greeting: ChatMessage = {
    id: 'hello',
    role: 'assistant',
    content:
      'Сәлеметсіз бе! Мен — сынып порталының ЖИ-көмекшісімін 🤖\nКесте, тәрбие сағаты, мұғалімдер және сабаққа дайындық туралы сұрай беріңіз.',
    createdAt: Date.now(),
  };

  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, typing]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    const userMsg: ChatMessage = { id: uid(), role: 'user', content: q, createdAt: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    const reply = answer(q);
    const delay = Math.min(300 + reply.length * 4, 1100);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: uid(), role: 'assistant', content: reply, createdAt: Date.now() },
      ]);
      setTyping(false);
      inputRef.current?.focus();
    }, delay);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="ЖИ-көмекші"
        subtitle="Сынып деректері негізінде жауап беретін ақылды көмекші"
        icon={<Sparkles className="h-6 w-6" />}
        action={
          <button
            onClick={() => setMessages([greeting])}
            className="btn-ghost"
            disabled={messages.length <= 1}
          >
            <RotateCcw className="h-4 w-4" /> Тазалау
          </button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Чат */}
        <section className="card animate-fade-up flex h-[70vh] min-h-[480px] flex-col overflow-hidden lg:col-span-2">
          <header className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-3 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/20">
              <Bot className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-bold">SynypKz көмекшісі</p>
              <p className="text-[11px] text-white/80">
                {typing ? 'жазып жатыр…' : 'онлайн · сынып деректеріне қосылған'}
              </p>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50/60 px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}
              >
                {m.role === 'assistant' && (
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-white">
                    <Bot className="h-4 w-4" />
                  </span>
                )}
                <div
                  className={`animate-pop max-w-[85%] space-y-1 rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-gradient-to-r from-sky-500 to-indigo-500 text-white'
                      : 'rounded-bl-md border border-slate-100 bg-white text-slate-700'
                  }`}
                >
                  <Rich text={m.content} />
                </div>
                {m.role === 'user' && <Avatar name={user?.name || 'Мен'} className="h-8 w-8 text-[10px]" />}
              </div>
            ))}

            {typing && (
              <div className="flex items-end gap-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-white">
                  <Bot className="h-4 w-4" />
                </span>
                <div className="flex gap-1 rounded-2xl rounded-bl-md border border-slate-100 bg-white px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-300"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-slate-100 bg-white px-3 py-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Сұрағыңызды жазыңыз…"
              className="input"
            />
            <button type="submit" className="btn-primary h-11 w-11 !p-0" disabled={!input.trim() || typing}>
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>

        {/* Оң жақ бағана */}
        <div className="space-y-5">
          <section className="card animate-fade-up delay-1 p-5">
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
              <Lightbulb className="h-4 w-4 text-amber-500" /> Дайын сұрақтар
            </h2>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  disabled={typing}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 disabled:opacity-50"
                >
                  {p}
                </button>
              ))}
            </div>
          </section>

          <section className="card animate-fade-up delay-2 p-5">
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Қауіпсіз қолдану
            </h2>
            <ul className="space-y-2 text-xs leading-relaxed text-slate-500">
              <li>• Көмекші сынып кестесі мен тәрбие сағаты деректерін пайдаланады.</li>
              <li>• Жеке деректерді (құпиясөз, телефон нөмірі) жазбаңыз.</li>
              <li>• Үй тапсырмасын орнына орындамайды — тек түсінуге көмектеседі.</li>
              <li>• Барлық жауап құрылғыңызда жасалады, сыртқа жіберілмейді.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
