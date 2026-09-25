'use client';

import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useApp, useCollection } from '@/lib/store';
import { Message } from '@/lib/types';
import { Avatar, EmptyState, Loading, PageHeader, formatDateTime } from '@/components/ui';
import { Users, Send } from 'lucide-react';

export default function ParentPortal() {
  const { user, openAuth } = useApp();
  // Барлық хабарламаларды алып, тек ата-ана чатын (channel === 'parent') сүзу — Байланыс чатымен бір коллекция, бөлек арна
  const { data: allMessages, loading } = useCollection<Message>('messages', 'createdAt', 'asc');
  const messages = allMessages.filter((m) => m.channel === 'parent');
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !text.trim() || sending) return;
    const content = text.trim();
    setText('');
    setError(null);
    setSending(true);
    try {
      await addDoc(collection(db, 'messages'), {
        channel: 'parent',
        senderId: user.id,
        senderName: user.name,
        senderRole: user.role,
        content,
        createdAt: Date.now(),
      });
    } catch (err: any) {
      console.error('Ата-ана чаты жіберу қатесі', err);
      setError(err?.message || 'Хабарлама жіберілмеді. Қайталап көріңіз.');
      setText(content);
    } finally {
      setSending(false);
    }
  };

  const isStudent = user?.role === 'student';

  if (!user) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Ата-ана чаты"
          subtitle="Мұғаліммен тікелей байланыс — сұрақ қойып, жауап алыңыз"
          icon={<Users className="h-6 w-6" />}
        />
        <div className="card animate-fade-up flex h-[400px] flex-col items-center justify-center p-8 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-slate-400">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-800">Чат тек тіркелгендерге арналған</h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Мұғаліммен чатты көру және жазу үшін жүйеге кіріңіз немесе тіркеліңіз. Тек ата-аналар мен мұғалімдер жаза алады.
          </p>
          <div className="mt-5 flex gap-2">
            <button onClick={() => openAuth('login')} className="btn-primary">
              Кіру
            </button>
            <button onClick={() => openAuth('register')} className="btn-ghost">
              Тіркелу
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ата-ана чаты"
        subtitle="Мұғаліммен тікелей байланыс — сұрақ қойып, жауап алыңыз"
        icon={<Users className="h-6 w-6" />}
      />

      {error && (
        <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</div>
      )}

      <div className="card animate-fade-up flex h-[560px] flex-col overflow-hidden">
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {loading ? (
            <Loading />
          ) : messages.length === 0 ? (
            <EmptyState title="Хабарлама жоқ" description="Алғашқы хабарламаңызды жазыңыз — мұғалім осында жауап береді." />
          ) : (
            messages.map((m) => {
              const own = m.senderId === user?.id;
              return (
                <div key={m.id} className={`flex animate-fade-in gap-2 ${own ? 'flex-row-reverse' : ''}`}>
                  <Avatar name={m.senderName} />
                  <div className={`max-w-[75%] ${own ? 'items-end text-right' : ''}`}>
                    <p className="text-[11px] font-semibold text-slate-400">
                      {m.senderName}
                      {m.senderRole === 'teacher' && ' · мұғалім'}
                      {m.senderRole === 'parent' && ' · ата-ана'}
                    </p>
                    <div
                      className={`mt-0.5 inline-block rounded-2xl px-3.5 py-2 text-sm ${
                        own
                          ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {m.content}
                    </div>
                    <p className="mt-0.5 text-[10px] text-slate-300">{formatDateTime(m.createdAt)}</p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={send} className="flex gap-2 border-t border-slate-100 bg-white p-3">
          {!user ? (
            <button type="button" onClick={() => openAuth('login')} className="btn-soft w-full">
              Жазу үшін жүйеге кіріңіз
            </button>
          ) : isStudent ? (
            <div className="flex w-full items-center justify-center rounded-xl bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-700">
              Бұл чат тек ата-аналар мен мұғалімдерге арналған
            </div>
          ) : (
            <>
              <input
                className="input"
                placeholder="Хабарлама жазыңыз…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={sending}
              />
              <button type="submit" className="btn-primary px-4" disabled={!text.trim() || sending}>
                <Send className="h-4 w-4" />
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
