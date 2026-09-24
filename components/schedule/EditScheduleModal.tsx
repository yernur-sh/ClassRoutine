'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { LessonItem, DayOfWeek } from '@/lib/types';
import { X, Clock, BookOpen, User, MapPin, FileText, CheckCircle2 } from 'lucide-react';

interface EditScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLesson?: LessonItem | null;
  defaultDay?: DayOfWeek;
}

const DAYS: { id: DayOfWeek; name: string }[] = [
  { id: 'monday', name: 'Дүйсенбі' },
  { id: 'tuesday', name: 'Сейсенбі' },
  { id: 'wednesday', name: 'Сәрсенбі' },
  { id: 'thursday', name: 'Бейсенбі' },
  { id: 'friday', name: 'Жұма' },
  { id: 'saturday', name: 'Сенбі' },
];

const STANDARD_TIMES = [
  { num: 1, time: '08:30 - 09:15' },
  { num: 2, time: '09:25 - 10:10' },
  { num: 3, time: '10:25 - 11:10' },
  { num: 4, time: '11:25 - 12:10' },
  { num: 5, time: '12:20 - 13:05' },
  { num: 6, time: '13:15 - 14:00' },
  { num: 7, time: '14:10 - 14:55' },
];

export default function EditScheduleModal({
  isOpen,
  onClose,
  initialLesson,
  defaultDay = 'monday'
}: EditScheduleModalProps) {
  const { addLesson, updateLesson } = useApp();

  const [day, setDay] = useState<DayOfWeek>(defaultDay);
  const [lessonNumber, setLessonNumber] = useState<number>(1);
  const [time, setTime] = useState<string>('08:30 - 09:15');
  const [subject, setSubject] = useState<string>('');
  const [teacher, setTeacher] = useState<string>('Айнұр Маратқызы');
  const [room, setRoom] = useState<string>('№304 каб.');
  const [notes, setNotes] = useState<string>('');
  const [color, setColor] = useState<string>('blue');

  useEffect(() => {
    if (initialLesson) {
      setDay(initialLesson.day);
      setLessonNumber(initialLesson.lessonNumber);
      setTime(initialLesson.time);
      setSubject(initialLesson.subject);
      setTeacher(initialLesson.teacher);
      setRoom(initialLesson.room);
      setNotes(initialLesson.notes || '');
      setColor(initialLesson.color || 'blue');
    } else {
      setDay(defaultDay);
      setLessonNumber(1);
      setTime('08:30 - 09:15');
      setSubject('');
      setTeacher('Айнұр Маратқызы');
      setRoom('№304 каб.');
      setNotes('');
      setColor('blue');
    }
  }, [initialLesson, defaultDay, isOpen]);

  if (!isOpen) return null;

  const handleLessonNumberChange = (num: number) => {
    setLessonNumber(num);
    const standard = STANDARD_TIMES.find(t => t.num === num);
    if (standard) {
      setTime(standard.time);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    if (initialLesson) {
      updateLesson(initialLesson.id, {
        day,
        lessonNumber,
        time,
        subject,
        teacher,
        room,
        notes,
        color,
      });
    } else {
      addLesson({
        day,
        lessonNumber,
        time,
        subject,
        teacher,
        room,
        notes,
        color,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-100">
            Мұғалім кабинеті
          </span>
          <h2 className="text-xl font-bold mt-2">
            {initialLesson ? 'Сабақты өзгерту' : 'Сабақ кестесіне жаңа сабақ қосу'}
          </h2>
          <p className="text-blue-100 text-xs mt-0.5">
            1 апталық сынып кестесіне өзгертулер енгізу
          </p>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Day Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Апта күні:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DAYS.map((d) => (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => setDay(d.id)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition ${
                    day === d.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          {/* Lesson Number & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Сабақ реті (Пара):</label>
              <select
                value={lessonNumber}
                onChange={(e) => handleLessonNumberChange(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
              >
                {STANDARD_TIMES.map((t) => (
                  <option key={t.num} value={t.num}>
                    {t.num}-сабақ ({t.time})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Уақыты (Қолмен):</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="08:30 - 09:15"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Пән атауы:</label>
            <div className="relative">
              <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Мысалы: Алгебра, Қазақ тілі, Физика"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>

          {/* Teacher & Room */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Мұғалімнің аты-жөні:</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  placeholder="Айнұр Маратқызы"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Кабинет нөмірі:</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="№304 каб."
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Ескерту немесе қажетті құралдар:</label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Мысалы: Сызғыш пен калькулятор алып келу, БЖБ жазылады"
                rows={2}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Color theme tag */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Түстік белгі:</label>
            <div className="flex items-center gap-2">
              {[
                { name: 'blue', bg: 'bg-blue-500' },
                { name: 'emerald', bg: 'bg-emerald-500' },
                { name: 'purple', bg: 'bg-purple-500' },
                { name: 'amber', bg: 'bg-amber-500' },
                { name: 'cyan', bg: 'bg-cyan-500' },
                { name: 'rose', bg: 'bg-rose-500' },
              ].map((c) => (
                <button
                  type="button"
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`w-7 h-7 rounded-full ${c.bg} transition-transform ${
                    color === c.name ? 'ring-4 ring-offset-2 ring-slate-400 scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Бас тарту
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/25 transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{initialLesson ? 'Сақтау' : 'Кестеге қосу'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
