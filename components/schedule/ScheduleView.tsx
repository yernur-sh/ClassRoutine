'use client';

import React, { useState } from 'react';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useApp, useCollection } from '@/lib/store';
import { Lesson } from '@/lib/types';
import { DAYS, DayKey, LESSON_TIMES, subjectGradient } from '@/lib/config';
import { EmptyState, Loading, Modal, PageHeader } from '@/components/ui';
import { CalendarDays, Plus, Pencil, Trash2, Clock, MapPin, Loader2 } from 'lucide-react';

const EMPTY: Omit<Lesson, 'id'> = {
  day: 'monday',
  lessonNumber: 1,
  time: LESSON_TIMES[0],
  subject: '',
  teacher: '',
  room: '',
  notes: '',
};

export default function ScheduleView() {
  const { isTeacher } = useApp();
  const { data: lessons, loading, error } = useCollection<Lesson>('lessons');
  const [activeDay, setActiveDay] = useState<DayKey>(DAYS[0].key);
  const [editing, setEditing] = useState<Lesson | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const dayLessons = lessons
    .filter((l) => l.day === activeDay)
    .sort((a, b) => a.lessonNumber - b.lessonNumber);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY, day: activeDay, lessonNumber: dayLessons.length + 1 });
    setOpen(true);
  };

  const openEdit = (lesson: Lesson) => {
    setEditing(lesson);
    const { id, ...rest } = lesson;
    setForm({ ...EMPTY, ...rest });
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (editing) await updateDoc(doc(db, 'lessons', editing.id), { ...form });
      else await addDoc(collection(db, 'lessons'), { ...form, createdAt: Date.now() });
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert('Сақтау кезінде қате шықты.');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Бұл сабақты жойғыңыз келе ме?')) return;
    await deleteDoc(doc(db, 'lessons', id));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Сабақ кестесі"
        subtitle="Апталық кесте нақты уақытта жаңарып отырады"
        icon={<CalendarDays className="h-6 w-6" />}
        action={
          isTeacher && (
            <button onClick={openCreate} className="btn-primary">
              <Plus className="h-4 w-4" /> Сабақ қосу
            </button>
          )
        }
      />

      {/* Күндер */}
      <div className="animate-fade-up flex gap-2 overflow-x-auto pb-1">
        {DAYS.map((d) => {
          const count = lessons.filter((l) => l.day === d.key).length;
          const active = activeDay === d.key;
          return (
            <button
              key={d.key}
              onClick={() => setActiveDay(d.key)}
              className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
                active
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md shadow-sky-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-600'
              }`}
            >
              {d.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  active ? 'bg-white/25' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
          Дерекқорға қосылу қатесі: {error}
        </p>
      )}

      {loading ? (
        <Loading />
      ) : dayLessons.length === 0 ? (
        <EmptyState
          title="Бұл күнге сабақ жоқ"
          description={
            isTeacher
              ? 'Кестені толтыру үшін «Сабақ қосу» батырмасын басыңыз.'
              : 'Сынып жетекшісі кестені толтырғаннан кейін көрінеді.'
          }
          action={
            isTeacher && (
              <button onClick={openCreate} className="btn-primary mt-2">
                <Plus className="h-4 w-4" /> Сабақ қосу
              </button>
            )
          }
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {dayLessons.map((l, i) => (
            <article
              key={l.id}
              className={`card card-hover animate-fade-up delay-${Math.min(i + 1, 4)} overflow-hidden`}
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${subjectGradient(l.subject)}`} />
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${subjectGradient(
                      l.subject
                    )} text-sm font-bold text-white`}
                  >
                    {l.lessonNumber}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold text-slate-900">{l.subject}</h3>
                    <p className="truncate text-xs text-slate-500">{l.teacher}</p>
                  </div>
                  {isTeacher && (
                    <div className="flex shrink-0 gap-1">
                      <button onClick={() => openEdit(l)} className="btn-ghost h-8 w-8 !p-0" aria-label="Өңдеу">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => remove(l.id)} className="btn-danger h-8 w-8 !p-0" aria-label="Жою">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="chip bg-sky-50 text-sky-700">
                    <Clock className="h-3 w-3" /> {l.time}
                  </span>
                  {l.room && (
                    <span className="chip bg-slate-100 text-slate-600">
                      <MapPin className="h-3 w-3" /> {l.room}
                    </span>
                  )}
                </div>
                {l.notes && (
                  <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">{l.notes}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Сабақты өңдеу' : 'Жаңа сабақ'}>
        <form onSubmit={save} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Күн</label>
              <select
                className="input"
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value as DayKey })}
              >
                {DAYS.map((d) => (
                  <option key={d.key} value={d.key}>{d.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Сабақ №</label>
              <input
                type="number"
                min={1}
                max={10}
                className="input"
                value={form.lessonNumber}
                onChange={(e) => setForm({ ...form, lessonNumber: Number(e.target.value) })}
              />
            </div>
          </div>
          <div>
            <label className="label">Уақыты</label>
            <select className="input" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
              {LESSON_TIMES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Пән</label>
            <input
              className="input"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Математика"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Мұғалім</label>
              <input
                className="input"
                value={form.teacher}
                onChange={(e) => setForm({ ...form, teacher: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Кабинет</label>
              <input
                className="input"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                placeholder="№304"
              />
            </div>
          </div>
          <div>
            <label className="label">Ескертпе (міндетті емес)</label>
            <input
              className="input"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Дәптер алып келу"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button type="button" onClick={() => setOpen(false)} className="btn-ghost flex-1">
              Бас тарту
            </button>
            <button type="submit" className="btn-primary flex-1" disabled={busy}>
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Сақтау
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
