'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { X, Calendar, Clock, User, CheckCircle2, MessageSquare } from 'lucide-react';

interface BookMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookMeetingModal({ isOpen, onClose }: BookMeetingModalProps) {
  const { bookConsultation, currentUser } = useApp();

  const [teacherName, setTeacherName] = useState('Айнұр Маратқызы (Сынып жетекшісі, Математика)');
  const [topic, setTopic] = useState('');
  const [requestedDate, setRequestedDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('15:30 - 16:00');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !requestedDate) return;

    bookConsultation(
      'teacher-1',
      teacherName.split('(')[0].trim(),
      topic,
      requestedDate,
      timeSlot
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider text-purple-100">
            Ата-аналар қызметі
          </span>
          <h2 className="text-xl font-bold mt-2">
            Мұғаліммен жеке кеңеске жазылу
          </h2>
          <p className="text-purple-100 text-xs mt-0.5">
            Балаңыздың үлгерімі мен тәрбиесіне қатысты сұрақтар бойынша жеке кездесу
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Мұғалімді таңдаңыз:</label>
            <select
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
            >
              <option value="Айнұр Маратқызы (Сынып жетекшісі, Математика)">Айнұр Маратқызы (Сынып жетекшісі, Математика)</option>
              <option value="Гүлнәр Бақытқызы (Қазақ тілі мен әдебиеті)">Гүлнәр Бақытқызы (Қазақ тілі мен әдебиеті)</option>
              <option value="Сәкен Омарұлы (Физика)">Сәкен Омарұлы (Физика)</option>
              <option value="Меруерт Қайратқызы (Ағылшын тілі)">Меруерт Қайратқызы (Ағылшын тілі)</option>
              <option value="Бауыржан Дәулетұлы (Информатика)">Бауыржан Дәулетұлы (Информатика)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Кездесу тақырыбы / Мақсаты:</label>
            <textarea
              required
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Мысалы: Оқушының олимпиадаға дайындығы немесе тоқсандық бағаларын талқылау..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ыңғайлы күн:</label>
              <input
                type="date"
                required
                value={requestedDate}
                onChange={(e) => setRequestedDate(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Уақыт аралығы:</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="14:30 - 15:00">14:30 - 15:00</option>
                <option value="15:30 - 16:00">15:30 - 16:00</option>
                <option value="16:00 - 16:30">16:00 - 16:30</option>
                <option value="17:00 - 17:30">17:00 - 17:30</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-purple-50 rounded-xl text-xs text-purple-900 border border-purple-100 leading-relaxed">
            💡 Өтінішіңіз мұғалімге жіберіледі. Мұғалім растаған соң осы бөлімде кездесу орны мен уақыты бекітіледі.
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Бас тарту
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Кеңеске жазылу</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
