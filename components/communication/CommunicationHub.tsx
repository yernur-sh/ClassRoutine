'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useApp, useCollection } from '@/lib/store';
import { Announcement, Message } from '@/lib/types';
import {
  Avatar,
  EmptyState,
  Loading,
  Modal,
  PageHeader,
  formatDate,
  formatDateTime,
} from '@/components/ui';
import {
  MessageSquare,
  Megaphone,
  Plus,
  Send,
  Trash2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

type Tab = 'announcements' | 'chat';

export default function CommunicationHub() {
  const { isHomeroom, openAuth } = useApp();
  const [tab, setTab] = useState<Tab>('announcements');

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: 'announcements', label: 'Сынып хабарламалары', icon: Megaphone },
    { key: 'chat', label: 'Сұрақ-жауап', icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Байланыс орталығы"
        subtitle="Хабарламалар және сынып чаты"
        icon={<MessageSquare className="h-6 w-6" />}
      />

      <div className="animate-fade-up flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
              tab === t.key
                ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md shadow-sky-200'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600'
            }`}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'announcements' && <Announcements canPost={isHomeroom} />}
      {tab === 'chat' && <Chat onNeedAuth={() => openAuth('login')} />}
    </div>
  );
}

/* ---------------- Хабарламалар ---------------- */

function Announcements({ canPost }: { canPost: boolean }) {
  const { user } = useApp();
  const { data, loading } = useCollection<Announcement>('announcements', 'createdAt');
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [important, setImportant] = useState(false);
  const [busy, setBusy] = useState(false);

  const publish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    try {
      await addDoc(collection(db, 'announcements'), {
        title: title.trim(),
        content: content.trim(),
        important,
        authorId: user.id,
        authorName: user.name,
        createdAt: Date.now(),
      });
      setTitle('');
      setContent('');
      setImportant(false);
      setOpen(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      {canPost && (
        <button onClick={() => setOpen(true)} className="btn-primary">
          <Plus className="h-4 w-4" /> Хабарлама жариялау
        </button>
      )}

      {loading ? (
        <Loading />
      ) : data.length === 0 ? (
        <EmptyState title="Әзірге хабарлама жоқ" description="Сынып жетекшісі жариялаған хабарламалар осында шығады." />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {data.map((a, i) => (
            <article
              key={a.id}
              className={`card card-hover animate-fade-up delay-${Math.min(i + 1, 4)} overflow-hidden`}
            >
              <div
                className={`h-1.5 w-full bg-gradient-to-r ${
                  a.important ? 'from-rose-400 to-orange-500' : 'from-sky-400 to-indigo-500'
                }`}
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="flex items-center gap-2 font-bold text-slate-900">
                    {a.important && <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />}
                    {a.title}
                  </h3>
                  {user?.id === a.authorId && (
                    <button
                      onClick={() => deleteDoc(doc(db, 'announcements', a.id))}
                      className="btn-danger h-8 w-8 shrink-0 !p-0"
                      aria-label="Жою"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">{a.content}</p>
                <p className="mt-3 text-[11px] font-medium text-slate-400">
                  {a.authorName} · {formatDate(a.createdAt)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Сынып хабарламасы">
        <form onSubmit={publish} className="space-y-4">
          <div>
            <label className="label">Тақырып</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="label">Мәтін</label>
            <textarea
              className="input min-h-[120px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600">
            <input
              type="checkbox"
              checked={important}
              onChange={(e) => setImportant(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-200"
            />
            Маңызды деп белгілеу
          </label>
          <button type="submit" className="btn-primary w-full" disabled={busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Жариялау
          </button>
        </form>
      </Modal>
    </div>
  );
}

/* ---------------- Чат ---------------- */

function Chat({ onNeedAuth }: { onNeedAuth: () => void }) {
  const { user } = useApp();
  const { data: messages, loading } = useCollection<Message>('messages', 'createdAt', 'asc');
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
    await addDoc(collection(db, 'messages'), {
      channel: 'general',
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      content,
      createdAt: Date.now(),
    });
  };

  return (
    <div className="card animate-fade-up flex h-[560px] flex-col overflow-hidden">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {loading ? (
          <Loading />
        ) : messages.length === 0 ? (
          <EmptyState title="Хабарлама жоқ" description="Алғашқы сұрағыңызды жазыңыз." />
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
        {user ? (
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
        ) : (
          <button type="button" onClick={onNeedAuth} className="btn-soft w-full">
            Жазу үшін жүйеге кіріңіз
          </button>
        )}
      </form>
    </div>
  );
}
