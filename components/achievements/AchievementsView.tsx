'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { AchievementItem } from '@/lib/types';
import AddAchievementModal from './AddAchievementModal';
import {
  Trophy,
  Award,
  Medal,
  Sparkles,
  Star,
  BookOpen,
  Plus,
  Search,
  Flame,
  User,
  Calendar,
  Trash2,
  CheckCircle,
  TrendingUp,
  School
} from 'lucide-react';

export default function AchievementsView() {
  const { achievements, students, currentRole, deleteAchievement } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedStudentId, setPreselectedStudentId] = useState<string | undefined>();

  // Filter achievements
  const filteredAchievements = achievements.filter((ach) => {
    const matchesCategory = selectedCategory === 'all' || ach.category === selectedCategory;
    const matchesSearch =
      ach.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ach.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ach.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort students by XP for top ranking
  const sortedStudents = [...students].sort((a, b) => b.points - a.points);
  const top1 = sortedStudents[0];
  const top2 = sortedStudents[1];
  const top3 = sortedStudents[2];

  const handleOpenAddModal = (studentId?: string) => {
    setPreselectedStudentId(studentId);
    setIsModalOpen(true);
  };

  const getMedalBadge = (type?: string) => {
    switch (type) {
      case 'gold':
        return { label: 'Алтын медаль', icon: '🥇', bg: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'silver':
        return { label: 'Күміс медаль', icon: '🥈', bg: 'bg-slate-100 text-slate-800 border-slate-300' };
      case 'bronze':
        return { label: 'Қола медаль', icon: '🥉', bg: 'bg-orange-100 text-orange-900 border-orange-300' };
      case 'special':
      default:
        return { label: 'Ерекше диплом', icon: '⭐', bg: 'bg-purple-100 text-purple-900 border-purple-300' };
    }
  };

  const categoriesList = [
    { id: 'all', label: 'Барлық жетістіктер' },
    { id: 'olympiad', label: '🏆 Олимпиадалар' },
    { id: 'science', label: '💡 Ғылым және STEM' },
    { id: 'sport', label: '⚽ Спорт' },
    { id: 'art', label: '🎨 Өнер' },
    { id: 'reading', label: '📖 Үздік оқырман' },
    { id: 'discipline', label: '⭐ Үлгілі тәртіп' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Banner / Title Header */}
      <div className="relative bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 rounded-3xl p-6 sm:p-8 text-slate-950 overflow-hidden shadow-xl shadow-amber-500/10">
        <div className="absolute right-0 top-0 -mt-6 -mr-6 w-56 h-56 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-black/15 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" /> 7 «А» Сынып мақтаныштары
              </span>
              <span className="px-2.5 py-1 bg-white/30 text-slate-950 rounded-full text-xs font-bold">
                Барлығы: {achievements.length} марапат
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950">
              Оқушылардың жетістіктері мен марапаттары
            </h1>

            <p className="text-slate-900/80 text-sm max-w-2xl font-medium">
              Сынып оқушыларының қалалық және республикалық олимпиадалардағы, ғылыми жобалардағы, спорт пен өнердегі толағай табыстары.
            </p>
          </div>

          {/* Teacher button to add achievement */}
          {currentRole === 'teacher' && (
            <button
              onClick={() => handleOpenAddModal()}
              className="flex items-center gap-2 px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-amber-400 font-extrabold rounded-2xl shadow-xl transition transform active:scale-95 text-xs sm:text-sm shrink-0"
            >
              <Plus className="w-5 h-5 text-amber-400" />
              <span>Жаңа жетістік қосу</span>
            </button>
          )}
        </div>

        {/* Podium Top 3 */}
        <div className="mt-8 pt-6 border-t border-black/10">
          <div className="text-xs font-black uppercase tracking-wider text-slate-900/70 mb-4 flex items-center gap-2">
            <Flame className="w-4 h-4 text-slate-950" /> Апта үздіктерінің тұғыры (Top 3 оқушы):
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Rank 2 */}
            {top2 && (
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/60 shadow-sm flex items-center gap-3 order-2 sm:order-1">
                <div className="relative">
                  <img
                    src={top2.avatar}
                    alt={top2.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-300"
                  />
                  <span className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-slate-400 text-white font-black text-xs flex items-center justify-center shadow">
                    2
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{top2.name}</h4>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                    <span>🥈 2-орын</span>
                    <span>•</span>
                    <span>{top2.points} XP</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{top2.badge}</span>
                </div>
              </div>
            )}

            {/* Rank 1 (Champion) */}
            {top1 && (
              <div className="bg-gradient-to-br from-yellow-200 to-amber-100 rounded-2xl p-4 border-2 border-amber-400 shadow-md flex items-center gap-3 order-1 sm:order-2 transform sm:-translate-y-2">
                <div className="relative">
                  <img
                    src={top1.avatar}
                    alt={top1.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-4 ring-amber-400 shadow-md"
                  />
                  <span className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-lg">
                    👑 1
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-full bg-amber-400/50 text-[10px] font-black text-amber-950 uppercase">
                      Көшбасшы
                    </span>
                  </div>
                  <h4 className="font-black text-base text-slate-900 line-clamp-1">{top1.name}</h4>
                  <div className="flex items-center gap-2 text-xs font-black text-amber-800">
                    <span>🥇 1-орын</span>
                    <span>•</span>
                    <span className="text-amber-900 bg-amber-300/50 px-1.5 rounded">{top1.points} XP</span>
                  </div>
                </div>
              </div>
            )}

            {/* Rank 3 */}
            {top3 && (
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200/60 shadow-sm flex items-center gap-3 order-3">
                <div className="relative">
                  <img
                    src={top3.avatar}
                    alt={top3.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-orange-300"
                  />
                  <span className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow">
                    3
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{top3.name}</h4>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
                    <span>🥉 3-орын</span>
                    <span>•</span>
                    <span>{top3.points} XP</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">{top3.badge}</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Control bar: Categories & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Оқушы аты немесе жетістік бойынша іздеу..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Main Grid: Student Leaderboard summary + Detailed Achievements Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Full Class Leaderboard */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <span>Сынып рейтингі (Барлық оқушылар)</span>
            </h3>
            <span className="text-xs text-slate-500 font-semibold">{students.length} оқушы</span>
          </div>

          <div className="space-y-2.5">
            {sortedStudents.map((st, index) => (
              <div
                key={st.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200/70 transition group"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center shrink-0 ${
                    index === 0 ? 'bg-amber-400 text-amber-950' : index === 1 ? 'bg-slate-300 text-slate-800' : index === 2 ? 'bg-orange-300 text-orange-950' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {index + 1}
                  </span>
                  
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-white"
                  />

                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-950">
                      {st.name}
                    </h5>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {st.achievementsCount} марапат
                    </span>
                  </div>
                </div>

                <div className="text-right flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 font-black text-xs">
                    {st.points} XP
                  </div>

                  {currentRole === 'teacher' && (
                    <button
                      onClick={() => handleOpenAddModal(st.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-white transition"
                      title="Осы оқушыға марапат қосу"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Detailed Achievement Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Марапаттар мен дипломдар галереясы</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Көрсетілуде: {filteredAchievements.length} марапат
            </span>
          </div>

          {filteredAchievements.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
              <Trophy className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-slate-600">Сәйкес келетін жетістіктер табылмады</p>
              {currentRole === 'teacher' && (
                <button
                  onClick={() => handleOpenAddModal()}
                  className="mt-4 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow"
                >
                  + Оқушыға алғашқы жетістікті қосу
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredAchievements.map((ach) => {
                const medal = getMedalBadge(ach.medalType);
                return (
                  <div
                    key={ach.id}
                    className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
                  >
                    <div>
                      {/* Top bar in card: Category & Medal Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${medal.bg} flex items-center gap-1`}>
                          <span>{medal.icon}</span>
                          <span>{medal.label}</span>
                        </span>

                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-800 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-amber-600" />
                          +{ach.points} XP
                        </span>
                      </div>

                      {/* Student info */}
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={ach.studentAvatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'}
                          alt={ach.studentName}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{ach.studentName}</h4>
                          <span className="text-[11px] text-blue-600 font-semibold">{ach.categoryLabel}</span>
                        </div>
                      </div>

                      {/* Achievement Title & Description */}
                      <h4 className="font-extrabold text-base text-slate-900 mb-2 leading-snug">
                        {ach.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>

                    {/* Footer Info: Teacher & Date */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center gap-1 truncate">
                        <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{ach.teacherName}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {ach.date}
                        </span>

                        {currentRole === 'teacher' && (
                          <button
                            onClick={() => deleteAchievement(ach.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition"
                            title="Өшіру"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add Achievement Modal */}
      <AddAchievementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedStudentId={preselectedStudentId}
      />
    </div>
  );
}
