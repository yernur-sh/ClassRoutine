'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useApp, useCollection } from '@/lib/store';
import { Announcement, Homework, Message, Submission } from '@/lib/types';
import { HOMEROOM_TEACHER_EMAIL } from '@/lib/config';
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
  BookOpen,
  Plus,
  Send,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Lock,
} from 'lucide-react';

type Tab = 'announcements' | 'homework' | 'chat';

export default function CommunicationHub() {
  const { user, isTeacher, isHomeroom, openAuth } = useApp();
  const [tab, setTab] = useState<Tab>('announcements');

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: 'announcements', label: 'Сынып хабарламалары', icon: Megaphone },
    { key: 'homework', label: 'Үй тапсырмасы', icon: BookOpen },
    { key: 'chat', label: 'Сұрақ-жауап', icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Байланыс орталығы"
        subtitle="Хабарламалар, үй тапсырмасы және сынып чаты"
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
      {tab === 'homework' && <HomeworkSection />}
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
      {canPost ? (
        <button onClick={() => setOpen(true)} className="btn-primary">
          <Plus className="h-4 w-4" /> Хабарлама жариялау
        </button>
      ) : (
        <p className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2.5 text-xs font-medium text-slate-500">
          <Lock className="h-3.5 w-3.5" />
          Хабарламаны тек сынып жетекшісі жариялайды ({HOMEROOM_TEACHER_EMAIL}).
        </p>
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

/* ---------------- Үй тапсырмасы ---------------- */

function HomeworkSection() {
  const { user, isTeacher } = useApp();
  const { data, loading } = useCollection<Homework>('homework', 'createdAt');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ subject: '', title: '', description: '', dueDate: '' });
  const [busy, setBusy] = useState(false);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    try {
      await addDoc(collection(db, 'homework'), {
        ...form,
        teacherId: user.id,
        teacherName: user.name,
        createdAt: Date.now(),
      });
      setForm({ subject: '', title: '', description: '', dueDate: '' });
      setOpen(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      {isTeacher && (
        <button onClick={() => setOpen(true)} className="btn-primary">
          <Plus className="h-4 w-4" /> Тапсырма беру
        </button>
      )}

      {loading ? (
        <Loading />
      ) : data.length === 0 ? (
        <EmptyState title="Тапсырма жоқ" description="Мұғалім тапсырма бергенде осында көрінеді." />
      ) : (
        <div className="space-y-3">
          {data.map((hw) => (
            <HomeworkCard key={hw.id} hw={hw} />
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Жаңа үй тапсырмасы">
        <form onSubmit={create} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Пән</label>
              <input
                className="input"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Тапсыру мерзімі</label>
              <input
                type="date"
                className="input"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label className="label">Тақырып</label>
            <input
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label">Сипаттама</label>
            <textarea
              className="input min-h-[100px]"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Сақтау
          </button>
        </form>
      </Modal>
    </div>
  );
}

function HomeworkCard({ hw }: { hw: Homework }) {
  const { user, isTeacher } = useApp();
  const { data: submissions } = useCollection<Submission>(`homework/${hw.id}/submissions`);
  const [expanded, setExpanded] = useState(false);
  const [answer, setAnswer] = useState('');
  const [busy, setBusy] = useState(false);

  const mine = submissions.find((s) => s.id === user?.id);

  const submit = async () => {
    if (!user || !answer.trim()) return;
    setBusy(true);
    try {
      await setDoc(doc(db, `homework/${hw.id}/submissions`, user.id), {
        studentName: user.name,
        content: answer.trim(),
        submittedAt: Date.now(),
      });
      setAnswer('');
    } finally {
      setBusy(false);
    }
  };

  const grade = async (studentId: string, value: number, feedback: string) => {
    await updateDoc(doc(db, `homework/${hw.id}/submissions`, studentId), { grade: value, feedback });
  };

  return (
    <article className="card card-hover animate-fade-up overflow-hidden">
      <div className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="chip bg-emerald-50 text-emerald-600">{hw.subject}</span>
            <h3 className="mt-1.5 font-bold text-slate-900">{hw.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{hw.description}</p>
          </div>
          <div className="shrink-0 text-right text-xs">
            <p className="font-bold text-rose-500">Мерзімі: {hw.dueDate}</p>
            <p className="text-slate-400">{hw.teacherName}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {isTeacher && (
            <span className="chip bg-sky-50 text-sky-600">Тапсырғандар: {submissions.length}</span>
          )}
          {mine && (
            <span className="chip bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-3 w-3" /> Тапсырылды
              {mine.grade != null && ` · Баға: ${mine.grade}`}
            </span>
          )}
          <button onClick={() => setExpanded((v) => !v)} className="btn-ghost h-8 text-xs">
            {expanded ? 'Жабу' : isTeacher ? 'Жұмыстарды көру' : 'Тапсыру'}
          </button>
        </div>

        {expanded && (
          <div className="mt-4 animate-fade-in space-y-3 border-t border-slate-100 pt-4">
            {!isTeacher && user && (
              <div className="space-y-2">
                {mine && (
                  <div className="rounded-xl bg-slate-50 p-3 text-sm">
                    <p className="text-slate-700">{mine.content}</p>
                    {mine.feedback && (
                      <p className="mt-2 text-xs text-emerald-600">Пікір: {mine.feedback}</p>
                    )}
                  </div>
                )}
                <textarea
                  className="input min-h-[90px]"
                  placeholder="Жауабыңызды жазыңыз…"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <button onClick={submit} className="btn-primary" disabled={busy || !answer.trim()}>
                  {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                  {mine ? 'Жауапты жаңарту' : 'Тапсыру'}
                </button>
              </div>
            )}

            {!user && <p className="text-sm text-slate-500">Тапсыру үшін жүйеге кіріңіз.</p>}

            {isTeacher &&
              (submissions.length === 0 ? (
                <p className="text-sm text-slate-500">Әзірге ешкім тапсырмаған.</p>
              ) : (
                submissions.map((s) => (
                  <div key={s.id} className="rounded-xl border border-slate-100 p-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={s.studentName} className="h-8 w-8 text-[10px]" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">{s.studentName}</p>
                        <p className="text-[11px] text-slate-400">{formatDateTime(s.submittedAt)}</p>
                      </div>
                      {s.grade != null && (
                        <span className="chip bg-emerald-50 text-emerald-600">Баға: {s.grade}</span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{s.content}</p>
                    <GradeForm onGrade={(g, f) => grade(s.id, g, f)} initial={s} />
                  </div>
                ))
              ))}
          </div>
        )}
      </div>
    </article>
  );
}

function GradeForm({
  onGrade,
  initial,
}: {
  onGrade: (grade: number, feedback: string) => void;
  initial: Submission;
}) {
  const [grade, setGrade] = useState(initial.grade ?? 5);
  const [feedback, setFeedback] = useState(initial.feedback ?? '');
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <input
        type="number"
        min={1}
        max={10}
        value={grade}
        onChange={(e) => setGrade(Number(e.target.value))}
        className="input w-20"
      />
      <input
        className="input flex-1 min-w-[140px]"
        placeholder="Пікір"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button onClick={() => onGrade(grade, feedback)} className="btn-soft">
        Бағалау
      </button>
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
