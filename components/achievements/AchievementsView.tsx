'use client';

import React, { useMemo, useState } from 'react';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useApp, useCollection } from '@/lib/store';
import { Achievement } from '@/lib/types';
import { ACHIEVEMENT_CATEGORIES } from '@/lib/config';
import { Avatar, EmptyState, Loading, Modal, PageHeader, formatDate } from '@/components/ui';
import { Trophy, Plus, Trash2, Loader2, Medal } from 'lucide-react';

export default function AchievementsView() {
  const { user, isTeacher } = useApp();
  const { data, loading } = useCollection<Achievement>('achievements', 'createdAt');
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    studentName: '',
    title: '',
    category: ACHIEVEMENT_CATEGORIES[0].key as string,
    description: '',
    points: 50,
  });

  const leaderboard = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach((a) => map.set(a.studentName, (map.get(a.studentName) || 0) + (a.points || 0)));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [data]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    try {
      await addDoc(collection(db, 'achievements'), {
        ...form,
        studentName: form.studentName.trim(),
        teacherName: user.name,
        createdAt: Date.now(),
      });
      setForm({ ...form, studentName: '', title: '', description: '' });
      setOpen(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Жетістіктер тақтасы"
        subtitle="Оқушылардың нақты жеңістері мен марапаттары"
        icon={<Trophy className="h-6 w-6" />}
        action={
          isTeacher && (
            <button onClick={() => setOpen(true)} className="btn-primary">
              <Plus className="h-4 w-4" /> Жетістік қосу
            </button>
          )
        }
      />

      {/* Жетістіктер тізімі — толық ені */}
      <div className="space-y-4">
        {loading ? (
          <Loading />
        ) : data.length === 0 ? (
          <EmptyState
            title="Жетістік жоқ"
            description="Мұғалім оқушының жеңісін тіркегенде осында шығады."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((a, i) => {
              const cat = ACHIEVEMENT_CATEGORIES.find((c) => c.key === a.category);
              return (
                <article
                  key={a.id}
                  className={`card card-hover animate-fade-up delay-${Math.min(i + 1, 4)} p-4`}
                >
                  <div className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-lg shadow-sm">
                      {cat?.emoji || '🏆'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-bold text-slate-900">{a.title}</h3>
                      <p className="truncate text-xs text-slate-500">{a.studentName}</p>
                    </div>
                    <span className="chip shrink-0 bg-amber-50 text-amber-600">+{a.points} XP</span>
                  </div>
                  {a.description && <p className="mt-2.5 text-sm text-slate-600">{a.description}</p>}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      {cat?.label} · {formatDate(a.createdAt)}
                    </span>
                    {isTeacher && (
                      <button
                        onClick={() => deleteDoc(doc(db, 'achievements', a.id))}
                        className="btn-danger h-7 w-7 !p-0"
                        aria-label="Жою"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Үздіктер — төменде, жетістіктермен бірдей ен және стиль */}
      <section className="card animate-fade-up p-5">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <Medal className="h-5 w-5 text-amber-500" /> Үздіктер
        </h2>
        {leaderboard.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">Дерек жиналған соң рейтинг көрінеді.</p>
        ) : (
          <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {leaderboard.map(([name, points], i) => (
              <li
                key={name}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3 transition hover:border-amber-200 hover:bg-amber-50/40"
              >
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-sm font-black text-slate-500">
                  {i + 1}
                </span>
                <Avatar name={name} />
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-700">{name}</span>
                <span className="chip bg-amber-50 text-amber-600">{points} XP</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title="Жаңа жетістік">
        <form onSubmit={save} className="space-y-4">
          <div>
            <label className="label">Оқушының аты-жөні</label>
            <input
              className="input"
              value={form.studentName}
              onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label">Жетістік атауы</label>
            <input
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Қала олимпиадасының жеңімпазы"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Санаты</label>
              <select
                className="input"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {ACHIEVEMENT_CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.emoji} {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Ұпай (XP)</label>
              <input
                type="number"
                min={5}
                max={500}
                className="input"
                value={form.points}
                onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
              />
            </div>
          </div>
          <div>
            <label className="label">Сипаттама</label>
            <textarea
              className="input min-h-[90px]"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
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
