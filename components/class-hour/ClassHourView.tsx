'use client';

import React, { useState } from 'react';
import {
  CLASS_HOURS,
  CLASS_HOUR_DIRECTIONS,
  CLASS_HOUR_SLOT,
  CLASS_RULES,
  DUTY_ROSTER,
  type ClassHourTopic,
} from '@/lib/class-hour-data';
import { PageHeader } from '@/components/ui';
import {
  HeartHandshake,
  Clock,
  MapPin,
  User,
  Target,
  ListChecks,
  MessageCircleQuestion,
  CheckCircle2,
  CalendarDays,
  Sparkles,
  ChevronDown,
  Brush,
} from 'lucide-react';

function direction(key: string) {
  return CLASS_HOUR_DIRECTIONS.find((d) => d.key === key) ?? CLASS_HOUR_DIRECTIONS[0];
}

function TopicCard({ topic, index }: { topic: ClassHourTopic; index: number }) {
  const [open, setOpen] = useState(false);
  const dir = direction(topic.direction);
  return (
    <article className={`card animate-fade-up delay-${Math.min(index + 1, 4)} overflow-hidden`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-slate-50"
      >
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${dir.gradient} text-base`}
        >
          {topic.emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-1.5">
            <span className="chip bg-slate-100 text-slate-600">{topic.week}</span>
            <span className="chip bg-sky-50 text-sky-600">{topic.date}</span>
            {topic.done && (
              <span className="chip bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-3 w-3" /> Өтті
              </span>
            )}
          </span>
          <span className="mt-1.5 block font-bold text-slate-900">{topic.title}</span>
          <span className="mt-0.5 block text-xs text-slate-500">{dir.label}</span>
        </span>
        <ChevronDown
          className={`mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="animate-fade-in space-y-4 border-t border-slate-100 px-4 py-4">
          <div className="rounded-2xl bg-sky-50/70 p-3">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-sky-700">
              <Target className="h-3.5 w-3.5" /> Мақсаты
            </p>
            <p className="text-sm text-slate-600">{topic.goal}</p>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <ListChecks className="h-3.5 w-3.5" /> Жоспар
            </p>
            <ol className="space-y-1.5">
              {topic.plan.map((step, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-500">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <MessageCircleQuestion className="h-3.5 w-3.5" /> Талқылау сұрақтары
            </p>
            <ul className="flex flex-wrap gap-2">
              {topic.questions.map((q) => (
                <li
                  key={q}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600"
                >
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}

export default function ClassHourView() {
  const upcoming = CLASS_HOURS.filter((t) => !t.done);
  const past = CLASS_HOURS.filter((t) => t.done);
  const next = upcoming[0];
  const nextDir = next ? direction(next.direction) : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Тәрбие сағаты"
        subtitle="Сынып жетекшісінің апталық тәрбие сағаты — тақырып, жоспар және құндылықтар"
        icon={<HeartHandshake className="h-6 w-6" />}
      />

      {/* Кезекті тәрбие сағаты */}
      {next && nextDir && (
        <section
          className={`animate-fade-up relative overflow-hidden rounded-3xl bg-gradient-to-r ${nextDir.gradient} px-6 py-7 text-white shadow-lg sm:px-8`}
        >
          <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/15 animate-floaty" />
          <div className="relative">
            <span className="chip bg-white/20 text-white">
              <Sparkles className="h-3 w-3" /> Кезекті тақырып · {next.week}
            </span>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              {next.emoji} {next.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/85">{next.goal}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="chip bg-white/20 text-white">
                <CalendarDays className="h-3 w-3" /> {next.date} · {CLASS_HOUR_SLOT.day}
              </span>
              <span className="chip bg-white/20 text-white">
                <Clock className="h-3 w-3" /> {CLASS_HOUR_SLOT.time}
              </span>
              <span className="chip bg-white/20 text-white">
                <MapPin className="h-3 w-3" /> {CLASS_HOUR_SLOT.room}
              </span>
              <span className="chip bg-white/20 text-white">
                <User className="h-3 w-3" /> {CLASS_HOUR_SLOT.teacher}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Бағыттар */}
      <section className="animate-fade-up flex flex-wrap gap-2">
        {CLASS_HOUR_DIRECTIONS.map((d) => (
          <span
            key={d.key}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600"
          >
            <span className={`grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br ${d.gradient} text-[10px]`}>
              {d.emoji}
            </span>
            {d.label}
          </span>
        ))}
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Тақырыптар */}
        <div className="space-y-5 lg:col-span-2">
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <CalendarDays className="h-5 w-5 text-sky-500" /> Жоспарланған тәрбие сағаттары
            </h2>
            {upcoming.map((t, i) => (
              <TopicCard key={t.id} topic={t} index={i} />
            ))}
          </section>

          {past.length > 0 && (
            <section className="space-y-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Өткен тақырыптар
              </h2>
              {past.map((t, i) => (
                <TopicCard key={t.id} topic={t} index={i} />
              ))}
            </section>
          )}
        </div>

        {/* Оң жақ бағана */}
        <div className="space-y-5">
          <section className="card animate-fade-up p-5">
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
              <ListChecks className="h-4 w-4 text-indigo-500" /> Сынып келісімі
            </h2>
            <ul className="space-y-2">
              {CLASS_RULES.map((r, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  {r}
                </li>
              ))}
            </ul>
          </section>

          <section className="card animate-fade-up delay-1 p-5">
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
              <Brush className="h-4 w-4 text-amber-500" /> Кезекшілік кестесі
            </h2>
            <ul className="space-y-2">
              {DUTY_ROSTER.map((d) => (
                <li
                  key={d.week}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-slate-100 bg-slate-50/60 px-3 py-2 text-sm"
                >
                  <span className="font-semibold text-slate-700">{d.week}</span>
                  <span className="text-xs text-slate-500">{d.students}</span>
                </li>
              ))}
            </ul>
          </section>

          <p className="rounded-2xl bg-slate-100/70 px-4 py-3 text-[11px] leading-relaxed text-slate-500">
            Тәрбие сағатының тақырыптары мен жоспары <b>lib/class-hour-data.ts</b> файлында
            сақталады және тек әзірлеуші арқылы жаңартылады.
          </p>
        </div>
      </div>
    </div>
  );
}
