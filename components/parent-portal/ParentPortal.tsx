'use client';

import React, { useState } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useApp, useCollection } from '@/lib/store';
import { Consultation } from '@/lib/types';
import { EmptyState, Loading, Modal, PageHeader, formatDate } from '@/components/ui';
import { Users, CalendarPlus, Check, X, Loader2 } from 'lucide-react';

const TIME_SLOTS = ['09:00 - 09:30', '13:00 - 13:30', '15:00 - 15:30', '17:00 - 17:30'];

const STATUS: Record<Consultation['status'], { label: string; cls: string }> = {
  pending: { label: 'Күтілуде', cls: 'bg-amber-50 text-amber-600' },
  accepted: { label: 'Қабылданды', cls: 'bg-emerald-50 text-emerald-600' },
  declined: { label: 'Қабылданбады', cls: 'bg-rose-50 text-rose-600' },
  completed: { label: 'Өтті', cls: 'bg-slate-100 text-slate-500' },
};

export default function ParentPortal() {
  const { user, isTeacher, openAuth } = useApp();
  const { data, loading } = useCollection<Consultation>('consultations', 'createdAt');
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    teacherName: '',
    topic: '',
    date: '',
    timeSlot: TIME_SLOTS[0],
  });

  const visible = isTeacher ? data : data.filter((c) => c.parentId === user?.id);

  const book = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    try {
      await addDoc(collection(db, 'consultations'), {
        parentId: user.id,
        parentName: user.name,
        studentName: user.studentName || '',
        teacherName: form.teacherName.trim(),
        topic: form.topic.trim(),
        date: form.date,
        timeSlot: form.timeSlot,
        status: 'pending',
        createdAt: Date.now(),
      });
      setForm({ ...form, topic: '', date: '' });
      setOpen(false);
    } finally {
      setBusy(false);
    }
  };

  const setStatus = (id: string, status: Consultation['status']) =>
    updateDoc(doc(db, 'consultations', id), { status });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ата-аналар порталы"
        subtitle="Мұғаліммен кездесуге жазылу және өтініштер"
        icon={<Users className="h-6 w-6" />}
        action={
          user ? (
            user.role === 'parent' && (
              <button onClick={() => setOpen(true)} className="btn-primary">
                <CalendarPlus className="h-4 w-4" /> Кездесуге жазылу
              </button>
            )
          ) : (
            <button onClick={() => openAuth('login')} className="btn-primary">
              Кіру
            </button>
          )
        }
      />

      {loading ? (
        <Loading />
      ) : visible.length === 0 ? (
        <EmptyState
          title="Өтініш жоқ"
          description={
            user?.role === 'parent'
              ? 'Мұғаліммен кездесуге жазылыңыз — өтінішіңіз осында көрінеді.'
              : 'Ата-аналар жазылған кезде өтініштер осында шығады.'
          }
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {visible.map((c, i) => (
            <article key={c.id} className={`card card-hover animate-fade-up delay-${Math.min(i + 1, 4)} p-4`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-bold text-slate-900">{c.topic}</h3>
                  <p className="text-xs text-slate-500">
                    {c.parentName}
                    {c.studentName && ` · оқушы: ${c.studentName}`}
                  </p>
                </div>
                <span className={`chip shrink-0 ${STATUS[c.status].cls}`}>{STATUS[c.status].label}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="chip bg-sky-50 text-sky-600">{c.date}</span>
                <span className="chip bg-slate-100 text-slate-600">{c.timeSlot}</span>
                {c.teacherName && <span className="chip bg-violet-50 text-violet-600">{c.teacherName}</span>}
              </div>
              {isTeacher && c.status === 'pending' && (
                <div className="mt-3 flex gap-2">
                  <button onClick={() => setStatus(c.id, 'accepted')} className="btn-soft flex-1">
                    <Check className="h-4 w-4" /> Қабылдау
                  </button>
                  <button onClick={() => setStatus(c.id, 'declined')} className="btn-danger flex-1">
                    <X className="h-4 w-4" /> Бас тарту
                  </button>
                </div>
              )}
              <p className="mt-3 text-[11px] text-slate-400">Жіберілді: {formatDate(c.createdAt)}</p>
            </article>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Кездесуге жазылу">
        <form onSubmit={book} className="space-y-4">
          <div>
            <label className="label">Мұғалімнің аты-жөні</label>
            <input
              className="input"
              value={form.teacherName}
              onChange={(e) => setForm({ ...form, teacherName: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label">Тақырып</label>
            <input
              className="input"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              placeholder="Баламның үлгерімі туралы"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Күні</label>
              <input
                type="date"
                className="input"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Уақыты</label>
              <select
                className="input"
                value={form.timeSlot}
                onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
              >
                {TIME_SLOTS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full" disabled={busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Жіберу
          </button>
        </form>
      </Modal>
    </div>
  );
}
