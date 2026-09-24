'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import {
  Calendar,
  Trophy,
  MessageSquare,
  Users,
  Smile,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
  School,
  GraduationCap,
  Award,
  CheckCircle2,
  Flame,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import AddAchievementModal from '../achievements/AddAchievementModal';
import EditScheduleModal from '../schedule/EditScheduleModal';
import HomeworkModal from '../communication/HomeworkModal';
import BookMeetingModal from '../parent-portal/BookMeetingModal';

export default function RoleDashboard() {
  const {
    currentUser,
    currentRole,
    switchRole,
    openAuthModal,
    schedule,
    achievements,
    students,
    homeworkList,
    announcements,
    messages
  } = useApp();

  // Modals
  const [isAchModalOpen, setIsAchModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isHwModalOpen, setIsHwModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Today's schedule (default to monday for full classroom routine display)
  const todayLessons = schedule.filter((l) => l.day === 'monday').sort((a, b) => a.lessonNumber - b.lessonNumber);
  const topStudents = [...students].sort((a, b) => b.points - a.points).slice(0, 3);
  const recentAchievements = achievements.slice(0, 3);

  return (
    <div className="space-y-8">
      
      {/* 1. Dynamic Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-10 text-white overflow-hidden shadow-2xl shadow-blue-900/20">
        
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider text-blue-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Әл-Фараби лицейі • 7 «А» сыныбы
              </span>

              {currentUser && (
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold capitalize ${
                  currentRole === 'teacher'
                    ? 'bg-blue-400 text-blue-950'
                    : currentRole === 'parent'
                      ? 'bg-purple-300 text-purple-950'
                      : 'bg-emerald-300 text-emerald-950'
                }`}>
                  {currentRole === 'teacher' ? '👩‍🏫 Мұғалім режимі' : currentRole === 'parent' ? '👨‍👩‍👦 Ата-ана режимі' : '👨‍🎓 Оқушы режимі'}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {currentRole === 'teacher' && 'Қош келдіңіз, Айнұр Маратқызы!'}
              {currentRole === 'student' && `Сәлем, ${currentUser?.name || 'Арман'}!`}
              {currentRole === 'parent' && 'Құрметті ата-ана, қош келдіңіз!'}
            </h1>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              {currentRole === 'teacher' && 'Бүгін 7 «А» сыныбында 6 сабақ жоспарланған. Оқушылардың жетістіктерін қосыңыз, үй тапсырмаларын тексеріңіз және ата-аналар сауалдарына жауап беріңіз.'}
              {currentRole === 'student' && 'Бүгінгі сабақ кестесін тексер, үй тапсырмасын жүкте, жетістік ұпайларын (XP) жина және көңілді үзіліс жаттығуларын орында!'}
              {currentRole === 'parent' && 'Балаңыздың оқу үлгерімін, қатысу көрсеткішін бақылап, сынып жетекшісімен жеке байланыста болыңыз.'}
            </p>

            {/* Quick Role Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {currentRole === 'teacher' && (
                <>
                  <button
                    onClick={() => setIsAchModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-black rounded-2xl shadow-lg transition transform active:scale-95 text-xs sm:text-sm"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Жетістік қосу (+XP)</span>
                  </button>
                  <button
                    onClick={() => setIsHwModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl backdrop-blur-md border border-white/20 transition text-xs sm:text-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Үй тапсырмасын беру</span>
                  </button>
                </>
              )}

              {currentRole === 'student' && (
                <>
                  <Link
                    href="/schedule"
                    className="flex items-center gap-2 px-5 py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-black rounded-2xl shadow-lg transition transform active:scale-95 text-xs sm:text-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Сабақ кестесі</span>
                  </Link>
                  <Link
                    href="/fun-break"
                    className="flex items-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-2xl shadow-lg transition transform active:scale-95 text-xs sm:text-sm"
                  >
                    <Smile className="w-4 h-4" />
                    <span>Көңілді үзіліс жаттығулары</span>
                  </Link>
                </>
              )}

              {currentRole === 'parent' && (
                <>
                  <Link
                    href="/parent-portal"
                    className="flex items-center gap-2 px-5 py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-black rounded-2xl shadow-lg transition transform active:scale-95 text-xs sm:text-sm"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Баланың үлгерім журналы</span>
                  </Link>
                  <button
                    onClick={() => setIsBookModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl backdrop-blur-md border border-white/20 transition text-xs sm:text-sm"
                  >
                    <Users className="w-4 h-4" />
                    <span>Мұғаліммен кеңеске жазылу</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Quick interactive role switch widget inside hero */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 space-y-3 min-w-[280px]">
            <div className="text-xs font-black uppercase tracking-wider text-blue-200 flex items-center justify-between">
              <span>Сайтты басқа рөлде сынау:</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => switchRole('teacher')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition ${
                  currentRole === 'teacher'
                    ? 'bg-white text-blue-900 shadow-md ring-2 ring-white/60'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">👩‍🏫</span>
                  <div className="text-left">
                    <div>Мұғалім режимі</div>
                    <div className="text-[10px] opacity-75">Жетістік, журнал, бағалау</div>
                  </div>
                </div>
                {currentRole === 'teacher' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
              </button>

              <button
                onClick={() => switchRole('student')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition ${
                  currentRole === 'student'
                    ? 'bg-white text-blue-900 shadow-md ring-2 ring-white/60'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">👨‍🎓</span>
                  <div className="text-left">
                    <div>Оқушы режимі</div>
                    <div className="text-[10px] opacity-75">Кесте, тапсырма, үзіліс</div>
                  </div>
                </div>
                {currentRole === 'student' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
              </button>

              <button
                onClick={() => switchRole('parent')}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition ${
                  currentRole === 'parent'
                    ? 'bg-white text-blue-900 shadow-md ring-2 ring-white/60'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">👨‍👩‍👦</span>
                  <div className="text-left">
                    <div>Ата-ана режимі</div>
                    <div className="text-[10px] opacity-75">Үлгерім мен мұғалім чаты</div>
                  </div>
                </div>
                {currentRole === 'parent' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Feature Quick Access Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <Link
          href="/schedule"
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900">Сабақ кестесі</h4>
            <p className="text-[11px] text-slate-500 mt-1">1 апталық сабақтар тізбегі</p>
          </div>
          <div className="mt-3 flex items-center text-xs font-bold text-blue-600 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Ашу</span> <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/communication"
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition-all group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900">Мұғалім-Оқушы</h4>
            <p className="text-[11px] text-slate-500 mt-1">Чат, сұрақ-жауап, тапсырма</p>
          </div>
          <div className="mt-3 flex items-center text-xs font-bold text-indigo-600 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Ашу</span> <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/achievements"
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900">Жетістіктер</h4>
            <p className="text-[11px] text-slate-500 mt-1">Олимпиада, марапат, XP</p>
          </div>
          <div className="mt-3 flex items-center text-xs font-bold text-amber-600 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Ашу</span> <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/parent-portal"
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900">Ата-ана порталы</h4>
            <p className="text-[11px] text-slate-500 mt-1">Үлгерім, кеңес, хабарландыру</p>
          </div>
          <div className="mt-3 flex items-center text-xs font-bold text-purple-600 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Ашу</span> <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/fun-break"
          className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 hover:border-orange-400 hover:shadow-lg transition-all group flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Smile className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-amber-950">Көңілді үзіліс</h4>
            <p className="text-[11px] text-amber-800/80 mt-1">Көз, дене және ми сергіту</p>
          </div>
          <div className="mt-3 flex items-center text-xs font-bold text-orange-600 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Бастау</span> <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </Link>

      </div>

      {/* 3. Main Dashboard Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 spans): Today's Schedule + Active Homework */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Schedule Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                  Бүгінгі сабақтар (Дүйсенбі)
                </h3>
              </div>
              <Link
                href="/schedule"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>Толық 1 апталық кесте</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {todayLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-extrabold flex items-center justify-center">
                      {lesson.lessonNumber}
                    </span>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                      {lesson.time}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{lesson.subject}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                    <span className="truncate">{lesson.teacher}</span>
                    <span className="font-semibold text-slate-700">{lesson.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Homework & Communication preview */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                  Ағымдағы үй тапсырмалары
                </h3>
              </div>
              <Link
                href="/communication"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Тапсырмалар орталығы</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {homeworkList.slice(0, 2).map((hw) => (
                <div
                  key={hw.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                        {hw.subject}
                      </span>
                      <span className="text-xs text-slate-400">Мерзімі: {hw.dueDate}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mt-1">{hw.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{hw.description}</p>
                  </div>

                  <Link
                    href="/communication"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm text-center shrink-0"
                  >
                    Толығырақ
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Achievements Podium + Announcements */}
        <div className="space-y-6">
          
          {/* Top Students XP Widget */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base text-slate-900">
                  Сынып үздіктері (Top 3)
                </h3>
              </div>
              <Link
                href="/achievements"
                className="text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1"
              >
                <span>Барлығы</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {topStudents.map((st, idx) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center shrink-0 ${
                      idx === 0 ? 'bg-amber-400 text-amber-950' : idx === 1 ? 'bg-slate-300 text-slate-800' : 'bg-orange-300 text-orange-950'
                    }`}>
                      {idx + 1}
                    </span>
                    <img
                      src={st.avatar}
                      alt={st.name}
                      className="w-9 h-9 rounded-xl object-cover ring-2 ring-white"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">{st.name}</h4>
                      <span className="text-[10px] text-slate-500">{st.badge}</span>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-950 font-black text-xs">
                    {st.points} XP
                  </div>
                </div>
              ))}
            </div>

            {currentRole === 'teacher' && (
              <button
                onClick={() => setIsAchModalOpen(true)}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Оқушыға жетістік қосу</span>
              </button>
            )}
          </div>

          {/* Announcements Widget */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  Сынып хабарландырулары
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {announcements.slice(0, 2).map((ann) => (
                <div
                  key={ann.id}
                  className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px] text-indigo-700 font-bold">
                    <span>{ann.category}</span>
                    <span>{ann.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs leading-snug">{ann.title}</h4>
                  <p className="text-slate-600 line-clamp-2">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Global Modals triggered from dashboard */}
      <AddAchievementModal
        isOpen={isAchModalOpen}
        onClose={() => setIsAchModalOpen(false)}
      />

      <EditScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      <HomeworkModal
        isOpen={isHwModalOpen}
        onClose={() => setIsHwModalOpen(false)}
        mode="create"
      />

      <BookMeetingModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </div>
  );
}
