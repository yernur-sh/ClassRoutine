'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { AchievementItem } from '@/lib/types';
import { X, Trophy, Award, Medal, Sparkles, Star, BookOpen, CheckCircle2, User, Flame } from 'lucide-react';

interface AddAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedStudentId?: string;
}

const CATEGORIES = [
  { id: 'olympiad', label: 'Олимпиада жеңісі', icon: Trophy, points: 300, color: 'text-amber-500 bg-amber-50' },
  { id: 'science', label: 'Ғылым және STEM', icon: Sparkles, points: 250, color: 'text-blue-500 bg-blue-50' },
  { id: 'sport', label: 'Спорттық жетістік', icon: Medal, points: 200, color: 'text-emerald-500 bg-emerald-50' },
  { id: 'art', label: 'Өнер және мәдениет', icon: Award, points: 200, color: 'text-purple-500 bg-purple-50' },
  { id: 'reading', label: 'Үздік оқырман', icon: BookOpen, points: 150, color: 'text-cyan-500 bg-cyan-50' },
  { id: 'discipline', label: 'Үлгілі тәртіп & белсенділік', icon: Star, points: 150, color: 'text-rose-500 bg-rose-50' },
];

export default function AddAchievementModal({
  isOpen,
  onClose,
  preselectedStudentId
}: AddAchievementModalProps) {
  const { students, currentUser, addAchievement } = useApp();

  const [studentId, setStudentId] = useState(preselectedStudentId || students[0]?.id || '');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'olympiad' | 'sport' | 'art' | 'science' | 'discipline' | 'reading'>('olympiad');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState<number>(300);
  const [medalType, setMedalType] = useState<'gold' | 'silver' | 'bronze' | 'special'>('gold');
  const [badgeIcon, setBadgeIcon] = useState('Trophy');

  React.useEffect(() => {
    if (preselectedStudentId) {
      setStudentId(preselectedStudentId);
    }
  }, [preselectedStudentId]);

  if (!isOpen) return null;

  const handleCategorySelect = (catId: any, defaultPoints: number, iconName: string) => {
    setCategory(catId);
    setPoints(defaultPoints);
    setBadgeIcon(iconName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !studentId) return;

    const studentObj = students.find((s) => s.id === studentId);
    if (!studentObj) return;

    const catObj = CATEGORIES.find((c) => c.id === category);

    addAchievement({
      studentId: studentObj.id,
      studentName: studentObj.name,
      studentAvatar: studentObj.avatar,
      title,
      category,
      categoryLabel: catObj?.label || 'Жетістік',
      description,
      points: Number(points),
      badgeIcon,
      medalType,
      teacherName: currentUser?.name || 'Айнұр Маратқызы',
    });

    // Reset & close
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header banner */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-6 text-slate-900 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/10 hover:bg-black/20 transition text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-black/10 rounded-full text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" /> Мұғалім марапаттау құралы
            </span>
          </div>

          <h2 className="text-2xl font-black mt-2">
            Оқушыға жаңа жетістік & марапат қосу
          </h2>
          <p className="text-slate-800 text-xs mt-0.5 font-medium">
            Оқушының олимпиада, спорт, өнер немесе үлгеріміндегі жетістігін бекітіп, ұпай (XP) беру
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Student Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              1. Оқушыны таңдаңыз:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {students.map((st) => (
                <button
                  type="button"
                  key={st.id}
                  onClick={() => setStudentId(st.id)}
                  className={`flex flex-col items-center p-2.5 rounded-2xl border text-center transition ${
                    studentId === st.id
                      ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-400/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-white mb-1.5 shadow-sm"
                  />
                  <div className="font-bold text-xs text-slate-800 line-clamp-1">{st.name}</div>
                  <div className="text-[10px] text-amber-600 font-extrabold">{st.points} XP</div>
                </button>
              ))}
            </div>
          </div>

          {/* Category Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              2. Жетістік бағыты (Категория):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id, cat.points, cat.icon.name)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-bold transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="line-clamp-1">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Medal Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              3. Марапат түрі (Медаль / Диплом):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'gold', name: '🥇 Алтын медаль', border: 'border-amber-400 bg-amber-50' },
                { id: 'silver', name: '🥈 Күміс медаль', border: 'border-slate-300 bg-slate-50' },
                { id: 'bronze', name: '🥉 Қола медаль', border: 'border-orange-300 bg-orange-50' },
                { id: 'special', name: '⭐ Ерекше диплом', border: 'border-purple-300 bg-purple-50' },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setMedalType(m.id as any)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl border text-center transition ${
                    medalType === m.id
                      ? `${m.border} ring-2 ring-blue-500 text-slate-900 shadow-sm`
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Achievement Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Жетістік атауы (Тақырыбы):
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Мысалы: Қалалық Математика Олимпиадасы 1-орын"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
            />
          </div>

          {/* Points (XP) & Teacher Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Берілетін ұпай (+XP):</label>
              <div className="relative">
                <Flame className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="10"
                  max="1000"
                  step="10"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Марапаттаған мұғалім:</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  disabled
                  value={currentUser?.name || 'Айнұр Маратқызы'}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Сипаттама / Марапаттау себебі:
            </label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Оқушының қандай байқауда, қалай ерекшеленгені туралы қысқаша мәлімет жазыңыз..."
              rows={3}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>

          {/* Actions */}
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
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              <span>Марапатты бекіту (+{points} XP)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
