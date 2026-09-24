'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { DayOfWeek, LessonItem } from '@/lib/types';
import EditScheduleModal from './EditScheduleModal';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Plus,
  Edit2,
  Trash2,
  Printer,
  Sparkles,
  BookOpen,
  CheckCircle,
  Search,
  School
} from 'lucide-react';

const DAYS: { id: DayOfWeek; name: string; short: string }[] = [
  { id: 'monday', name: 'Дүйсенбі', short: 'Дүй' },
  { id: 'tuesday', name: 'Сейсенбі', short: 'Сей' },
  { id: 'wednesday', name: 'Сәрсенбі', short: 'Сәр' },
  { id: 'thursday', name: 'Бейсенбі', short: 'Бей' },
  { id: 'friday', name: 'Жұма', short: 'Жұм' },
  { id: 'saturday', name: 'Сенбі (Үйірмелер)', short: 'Сен' },
];

export default function ScheduleView() {
  const { schedule, currentRole, deleteLesson } = useApp();
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | 'all'>('monday');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<LessonItem | null>(null);

  // Filter lessons
  const filteredSchedule = schedule.filter((lesson) => {
    const matchesDay = selectedDay === 'all' || lesson.day === selectedDay;
    const matchesSearch =
      lesson.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.room.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDay && matchesSearch;
  });

  // Group by day for "all" view
  const getLessonsByDay = (day: DayOfWeek) => {
    return schedule
      .filter((l) => l.day === day)
      .sort((a, b) => a.lessonNumber - b.lessonNumber);
  };

  const handleEdit = (lesson: LessonItem) => {
    setEditingLesson(lesson);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingLesson(null);
    setIsModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const getSubjectColorStyles = (color?: string) => {
    switch (color) {
      case 'emerald':
      case 'green':
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
          badge: 'bg-emerald-600 text-white',
          pill: 'bg-emerald-100 text-emerald-800',
        };
      case 'purple':
      case 'violet':
        return {
          bg: 'bg-purple-50 border-purple-200 text-purple-900',
          badge: 'bg-purple-600 text-white',
          pill: 'bg-purple-100 text-purple-800',
        };
      case 'amber':
      case 'yellow':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-900',
          badge: 'bg-amber-600 text-white',
          pill: 'bg-amber-100 text-amber-800',
        };
      case 'cyan':
      case 'teal':
        return {
          bg: 'bg-cyan-50 border-cyan-200 text-cyan-900',
          badge: 'bg-cyan-600 text-white',
          pill: 'bg-cyan-100 text-cyan-800',
        };
      case 'rose':
      case 'pink':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-900',
          badge: 'bg-rose-600 text-white',
          pill: 'bg-rose-100 text-rose-800',
        };
      case 'orange':
        return {
          bg: 'bg-orange-50 border-orange-200 text-orange-900',
          badge: 'bg-orange-600 text-white',
          pill: 'bg-orange-100 text-orange-800',
        };
      case 'blue':
      default:
        return {
          bg: 'bg-blue-50 border-blue-200 text-blue-900',
          badge: 'bg-blue-600 text-white',
          pill: 'bg-blue-100 text-blue-800',
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner / Title Header */}
      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-xl shadow-blue-900/10">
        <div className="absolute right-0 top-0 -mt-6 -mr-6 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-blue-100 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-yellow-300" /> 2026–2027 Оқу жылы
              </span>
              <span className="px-2.5 py-1 bg-emerald-500/30 text-emerald-200 rounded-full text-xs font-semibold">
                1-тоқсан
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              7 «А» сыныбының 1 апталық сабақ кестесі
            </h1>
            
            <p className="text-blue-100 text-sm max-w-2xl">
              Әр күнге арналған сабақтар тізімі, уақыты, мұғалімдері және кабинеттері. Кесте күн сайын автоматты түрде жаңартылып отырады.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Teacher button to add lesson */}
            {currentRole === 'teacher' && (
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-5 py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold rounded-2xl shadow-lg transition transform active:scale-95 text-xs sm:text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Жаңа сабақ қосу</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-2xl backdrop-blur-md border border-white/20 transition text-xs sm:text-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Басып шығару (Print)</span>
            </button>
          </div>
        </div>

        {/* Quick summary stats in banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
            <span className="text-[11px] text-blue-200 font-medium block">Апталық сағат:</span>
            <span className="text-lg font-bold">33 сағат</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
            <span className="text-[11px] text-blue-200 font-medium block">Пәндер саны:</span>
            <span className="text-lg font-bold">14 негізгі пән</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
            <span className="text-[11px] text-blue-200 font-medium block">Сабақ басталуы:</span>
            <span className="text-lg font-bold">08:30 таңертең</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
            <span className="text-[11px] text-blue-200 font-medium block">Үзіліс ұзақтығы:</span>
            <span className="text-lg font-bold">10 – 15 минут</span>
          </div>
        </div>
      </div>

      {/* Control bar: Days Selector & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        
        {/* Day selection tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              selectedDay === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Толық 1 апта
          </button>
          {DAYS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDay(d.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedDay === d.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Пән, мұғалім немесе кабинет іздеу..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Schedule Display */}
      {selectedDay === 'all' ? (
        /* Full Week View (Grouped by Day) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DAYS.map((dayObj) => {
            const lessons = getLessonsByDay(dayObj.id).filter((l) =>
              l.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
              l.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
              l.room.toLowerCase().includes(searchQuery.toLowerCase())
            );

            return (
              <div
                key={dayObj.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
              >
                {/* Day Header */}
                <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-sm">{dayObj.name}</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                    {lessons.length} сабақ
                  </span>
                </div>

                {/* Day Lesson Items */}
                <div className="p-4 space-y-3 flex-1">
                  {lessons.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      Бұл күнге сабақ енгізілмеген немесе іздеу нәтижесі жоқ
                    </div>
                  ) : (
                    lessons.map((lesson) => {
                      const styles = getSubjectColorStyles(lesson.color);
                      return (
                        <div
                          key={lesson.id}
                          className={`p-3.5 rounded-2xl border transition-all hover:shadow-md ${styles.bg}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 ${styles.badge}`}>
                                {lesson.lessonNumber}
                              </span>
                              <h4 className="font-bold text-sm text-slate-900 leading-tight">
                                {lesson.subject}
                              </h4>
                            </div>

                            {/* Teacher action buttons */}
                            {currentRole === 'teacher' && (
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  onClick={() => handleEdit(lesson)}
                                  className="p-1 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white/80 transition"
                                  title="Сабақты өзгерту"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => deleteLesson(lesson.id)}
                                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white/80 transition"
                                  title="Өшіру"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="mt-2.5 space-y-1 text-xs text-slate-600">
                            <div className="flex items-center gap-1.5 font-medium">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>{lesson.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-slate-400" />
                              <span className="truncate">{lesson.teacher}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-semibold text-slate-800">{lesson.room}</span>
                            </div>
                          </div>

                          {lesson.notes && (
                            <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 italic">
                              📌 {lesson.notes}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Single Day Detailed View */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {DAYS.find((d) => d.id === selectedDay)?.name} күнгі сабақ кестесі
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Сабақтар реті, кабинеттер және қажетті оқу құралдары
              </p>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-200">
              Барлығы: {filteredSchedule.length} сабақ
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {filteredSchedule.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                <p className="font-semibold">Бұл күнге сабақтар тіркелмеген</p>
                {currentRole === 'teacher' && (
                  <button
                    onClick={handleAdd}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                  >
                    + Алғашқы сабақты қосу
                  </button>
                )}
              </div>
            ) : (
              filteredSchedule
                .sort((a, b) => a.lessonNumber - b.lessonNumber)
                .map((lesson) => {
                  const styles = getSubjectColorStyles(lesson.color);
                  return (
                    <div
                      key={lesson.id}
                      className={`p-5 rounded-2xl border transition-all hover:shadow-md ${styles.bg}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        
                        <div className="flex items-start sm:items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-black shadow-sm ${styles.badge}`}>
                            <span className="text-xs opacity-80 uppercase">Пара</span>
                            <span className="text-lg leading-none">{lesson.lessonNumber}</span>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
                                {lesson.subject}
                              </h4>
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/80 border border-slate-200 text-slate-700">
                                {lesson.room}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-1">
                              <span className="flex items-center gap-1 font-semibold text-blue-900">
                                <Clock className="w-3.5 h-3.5 text-blue-600" />
                                {lesson.time}
                              </span>
                              <span className="flex items-center gap-1 font-medium">
                                <User className="w-3.5 h-3.5 text-slate-400" />
                                {lesson.teacher}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right side notes & teacher actions */}
                        <div className="flex items-center gap-3 self-end sm:self-center">
                          {lesson.notes && (
                            <div className="text-xs bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 max-w-xs">
                              <span className="font-semibold text-slate-900">Тапсырма:</span> {lesson.notes}
                            </div>
                          )}

                          {currentRole === 'teacher' && (
                            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                              <button
                                onClick={() => handleEdit(lesson)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition"
                                title="Өзгерту"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteLesson(lesson.id)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition"
                                title="Өшіру"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      )}

      {/* Edit/Add Modal */}
      <EditScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialLesson={editingLesson}
        defaultDay={selectedDay === 'all' ? 'monday' : selectedDay}
      />
    </div>
  );
}
