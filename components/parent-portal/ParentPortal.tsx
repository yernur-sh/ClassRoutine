'use client';

import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useApp, useCollection } from '@/lib/store';
import { Message } from '@/lib/types';
import { Avatar, EmptyState, Loading, PageHeader, formatDateTime } from '@/components/ui';
import { Users, Send, MessageCircle } from 'lucide-react';

export default function ParentPortal() {
  const { user, openAuth } = useApp();
  const { data: messages, loading } = useCollection<Message>('parentMessages', 'createdAt', 'asc');
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !text.trim()) return;
    const content = text.trim();
    setText('');
    await addDoc(collection(db, 'parentMessages'), {
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      content,
      createdAt: Date.now(),
    });
  };

  const isStudent = user?.role === 'student';
  const canChat = !!user && !isStudent;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ата-ана чаты"
        subtitle="Мұғаліммен тікелей байланыс — сұрақ қойып, жауап алыңыз"
        icon={<Users className="h-6 w-6" />}
      />

      {/* Сипаттама — Байланыс бетіндегідей түсіндірме */}
      <div className="flex items-center gap-2 rounded-2xl bg-sky-50 px-4 py-3 text-sm text-sky-700">
        <MessageCircle className="h-4 w-4 shrink-0" />
        <p>
          Бұл чат <b>тек ата-аналар мен мұғалімдерге</b> арналған. Хабарламалар нақты уақытта көрінеді
          — Байланыс бетіндегі сұрақ-жауап чаты сияқты.
        </p>
      </div>

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
              />
              <button type="submit" className="btn-primary px-4" disabled={!text.trim()}>
                <Send className="h-4 w-4" />
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
