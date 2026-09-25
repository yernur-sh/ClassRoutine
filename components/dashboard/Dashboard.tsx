'use client';

import React from 'react';
import Link from 'next/link';
import { useApp, useCollection } from '@/lib/store';
import { Announcement, Achievement } from '@/lib/types';
import { CLASS_LABEL } from '@/lib/config';
import { TOTAL_LESSONS, todayKey, dayLabel, lessonsFor } from '@/lib/schedule-data';
import { EmptyState, formatDate } from '@/components/ui';
import MembersList from '@/components/dashboard/MembersList';
import {
  CalendarDays,
  Megaphone,
  Trophy,
  ArrowRight,
  Clock,
  AlertCircle,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';

export default function Dashboard() {
  const { user, openAuth, loading: authLoading } = useApp();
  const { data: announcements } = useCollection<Announcement>('announcements', 'createdAt');
  const { data: achievements } = useCollection<Achievement>('achievements', 'createdAt');

  const day = todayKey();
  const todayLessons = lessonsFor(day);
  const label = dayLabel(day);

  const stats = [
    { label: 'Апталық сабақ', value: TOTAL_LESSONS, icon: CalendarDays, color: 'from-sky-400 to-blue-500', href: '/schedule' },
    { label: 'Хабарлама', value: announcements.length, icon: Megaphone, color: 'from-amber-400 to-orange-500', href: '/communication' },
    { label: 'Жетістік', value: achievements.length, icon: Trophy, color: 'from-violet-400 to-purple-500', href: '/achievements' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="animate-fade-up relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 animate-gradient px-6 py-8 text-white shadow-lg shadow-sky-200 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 animate-floaty" />
        <div className="pointer-events-none absolute -bottom-20 right-32 h-40 w-40 rounded-full bg-white/10" />
        <div className="relative max-w-2xl">
          <span className="chip bg-white/20 text-white">{CLASS_LABEL}</span>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            {user ? `Сәлем, ${user.name.split(' ')[0]}!` : 'Сынып порталына қош келдіңіз'}
          </h1>
          <p className="mt-2 max-w-lg text-sm text-white/85 sm:text-base">
            Сабақ кестесі, тәрбие сағаты, жетістіктер және ЖИ-көмекші — бәрі бір жерде.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/schedule" className="btn bg-white text-sky-600 hover:bg-sky-50">
              Кестені ашу <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/ai-assistant" className="btn bg-white/15 text-white hover:bg-white/25">
              <Sparkles className="h-4 w-4" /> ЖИ-көмекші
            </Link>
            {!user && !authLoading && (
              <button onClick={() => openAuth('register')} className="btn bg-white/15 text-white hover:bg-white/25">
                Тіркелу
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {stats.map((s, i) => (
          <Link
            key={s.label}
            href={s.href}
            className={`card card-hover animate-fade-up delay-${i + 1} flex items-center gap-3 p-4`}
          >
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-sm`}>
              <s.icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xl font-extrabold text-slate-900">{s.value}</span>
              <span className="block truncate text-xs font-medium text-slate-500">{s.label}</span>
            </span>
          </Link>
        ))}
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Бүгінгі сабақтар */}
        <section className="card animate-fade-up p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <CalendarDays className="h-5 w-5 text-sky-500" /> Бүгін: {label}
            </h2>
            <Link href="/schedule" className="btn-soft h-8 text-xs">
              Толық кесте <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {todayLessons.length === 0 ? (
            <EmptyState
              title="Бүгін сабақ жоқ"
              description="Демалыс күні. Апталық кестені «Толық кесте» бөлімінен қараңыз."
            />
          ) : (
            <ul className="space-y-2">
              {todayLessons.map((l, i) => (
                <li
                  key={l.lessonNumber}
                  className={`animate-fade-up delay-${Math.min(i + 1, 4)} flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3 transition hover:border-sky-200 hover:bg-white hover:shadow-sm`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-sky-200 bg-sky-50 text-sm font-black text-sky-400 shadow-sm">
                    {l.lessonNumber}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-800">{l.subject}</p>
                    <p className="truncate text-xs text-slate-500">{l.teacher}</p>
                  </div>
                  <div className="shrink-0 text-right text-xs text-slate-500">
                    <p className="flex items-center justify-end gap-1 font-semibold text-slate-700">
                      <Clock className="h-3.5 w-3.5" /> {l.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Соңғы хабарламалар */}
        <section className="card animate-fade-up delay-2 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Megaphone className="h-5 w-5 text-amber-500" /> Хабарламалар
            </h2>
            <Link href="/communication" className="btn-soft h-8 text-xs">
              Барлығы
            </Link>
          </div>
          {announcements.length === 0 ? (
            <EmptyState title="Хабарлама жоқ" description="Сынып жетекшісі жариялағанда осында шығады." />
          ) : (
            <ul className="space-y-2.5">
              {announcements.slice(0, 4).map((a) => (
                <li
                  key={a.id}
                  className="rounded-2xl border border-slate-100 p-3 transition hover:border-amber-200 hover:bg-amber-50/40"
                >
                  <div className="flex items-start gap-2">
                    {a.important && <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />}
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-800">{a.title}</p>
                      <p className="line-clamp-2 text-xs text-slate-500">{a.content}</p>
                      <p className="mt-1 text-[11px] font-medium text-slate-400">
                        {a.authorName} · {formatDate(a.createdAt)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Тіркелген оқушылар мен ата-аналар */}
      <MembersList />

      {/* Жылдам сілтемелер */}
      <section className="grid gap-3 sm:grid-cols-2">
        <Link href="/class-hour" className="card card-hover animate-fade-up flex items-center gap-4 p-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-sm">
            <HeartHandshake className="h-6 w-6" />
          </span>
          <span className="min-w-0">
            <span className="block font-bold text-slate-900">Тәрбие сағаты</span>
            <span className="block text-xs text-slate-500">Апталық тақырып, жоспар және сынып ережелері</span>
          </span>
          <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-400" />
        </Link>
        <Link href="/ai-assistant" className="card card-hover animate-fade-up delay-1 flex items-center gap-4 p-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 text-white shadow-sm">
            <Sparkles className="h-6 w-6" />
          </span>
          <span className="min-w-0">
            <span className="block font-bold text-slate-900">ЖИ-көмекші</span>
            <span className="block text-xs text-slate-500">Кесте, сабақ және оқу туралы сұрақтарға жауап береді</span>
          </span>
          <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-400" />
        </Link>
      </section>
    </div>
  );
}
