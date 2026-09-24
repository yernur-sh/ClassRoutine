'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import BookMeetingModal from './BookMeetingModal';
import {
  Users,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Award,
  Send,
  User,
  Heart,
  School,
  FileCheck
} from 'lucide-react';

export default function ParentTeacherPortal() {
  const {
    currentUser,
    currentRole,
    studentProgress,
    messages,
    sendMessage,
    consultations,
    updateConsultationStatus,
    announcements
  } = useApp();

  const [activeTab, setActiveTab] = useState<'progress' | 'chat' | 'consultations' | 'announcements'>('progress');
  const [chatInput, setChatInput] = useState('');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Filter messages for parent-teacher channel
  const parentMessages = messages.filter((m) => m.channel === 'parent-teacher');

  const handleSendParentMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    sendMessage(
      'parent-teacher',
      chatInput,
      'teacher-1',
      'Айнұр Маратқызы'
    );
    setChatInput('');
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-purple-900/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-purple-100 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-yellow-300" /> Ата-ана мен Мұғалім порталы
              </span>
              <span className="px-2.5 py-1 bg-emerald-500/30 text-emerald-200 rounded-full text-xs font-semibold">
                Сенімді байланыс
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Оқушы үлгерімі және ата-анамен серіктестік
            </h1>

            <p className="text-purple-100 text-sm max-w-2xl">
              Балаңыздың сабаққа қатысуын, күнделікті бағаларын қадағалап, сынып жетекшісімен жеке байланыста болыңыз.
            </p>
          </div>

          <button
            onClick={() => setIsBookModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-bold rounded-2xl shadow-xl transition transform active:scale-95 text-xs sm:text-sm shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Мұғаліммен кеңеске жазылу</span>
          </button>
        </div>

        {/* Child Snapshot Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
          <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
            <span className="text-[11px] text-purple-200 font-medium block">Бақылаудағы оқушы:</span>
            <span className="text-base sm:text-lg font-bold">{studentProgress.studentName}</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
            <span className="text-[11px] text-purple-200 font-medium block">Сабаққа қатысуы:</span>
            <span className="text-base sm:text-lg font-bold text-emerald-300">{studentProgress.attendanceRate}% (Өте жоғары)</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
            <span className="text-[11px] text-purple-200 font-medium block">Орташа үлгерім балы:</span>
            <span className="text-base sm:text-lg font-bold text-yellow-300">{studentProgress.averageGrade} / 5.0</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
            <span className="text-[11px] text-purple-200 font-medium block">Сынып жетекшісі:</span>
            <span className="text-base sm:text-lg font-bold">Айнұр Маратқызы</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'progress' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Баланың оқу үлгерімі мен қатысуы</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'chat' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Мұғаліммен жеке чат</span>
        </button>

        <button
          onClick={() => setActiveTab('consultations')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'consultations' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Жеке кеңестер тізімі</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-800">
            {consultations.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'announcements' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4 text-purple-500" />
          <span>Ата-аналар жиналысы</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        
        {/* Tab 1: Progress & Grades Table */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            
            {/* Student praise & teacher feedback cards */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Мұғалімдердің соңғы пікірлері мен мадақтаулары:</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {studentProgress.recentTeacherNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50/40 border border-purple-100 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-900">{note.subject}</span>
                      <span className="text-[10px] text-slate-400">{note.date}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      «{note.note}»
                    </p>
                    <div className="text-[11px] text-purple-700 font-semibold pt-1 border-t border-purple-100">
                      {note.teacher}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject grades table */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Пәндер бойынша ағымдағы бағалар журналы (1-тоқсан):</span>
              </h3>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="p-3.5">Пән атауы</th>
                      <th className="p-3.5 text-center">Формативті балл</th>
                      <th className="p-3.5 text-center">Қорытынды баға</th>
                      <th className="p-3.5 text-center">Қатысуы</th>
                      <th className="p-3.5">Мұғалімнің түсіндірмесі</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentProgress.subjects.map((sub, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition">
                        <td className="p-3.5 font-bold text-slate-900">{sub.name}</td>
                        <td className="p-3.5 text-center">
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg font-extrabold border border-emerald-200">
                            {sub.faGrade}
                          </span>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold inline-flex items-center justify-center">
                            {sub.grade}
                          </span>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                            ✓ {sub.attendance}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-600 text-xs">{sub.teacherNote || 'Тамаша үлгерім'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Direct Parent-Teacher Chat */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[550px]">
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                  👩‍🏫
                </div>
                <div>
                  <h4 className="font-bold text-xs text-purple-950">Айнұр Маратқызы (Сынып жетекшісі)</h4>
                  <p className="text-[10px] text-purple-700">Жеке кеңес және хабарламалар</p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                Онлайн
              </span>
            </div>

            {/* Messages stream */}
            <div className="flex-1 overflow-y-auto space-y-4 p-2">
              {parentMessages.map((msg) => {
                const isMe = currentUser?.id === msg.senderId;
                const isTeacher = msg.senderRole === 'teacher';

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                      isMe ? 'ml-auto flex-row-reverse' : ''
                    }`}
                  >
                    <img
                      src={msg.senderAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
                      alt={msg.senderName}
                      className="w-9 h-9 rounded-xl object-cover ring-2 ring-white shrink-0 mt-1"
                    />

                    <div>
                      <div className={`flex items-center gap-2 mb-1 ${isMe ? 'justify-end' : ''}`}>
                        <span className="font-bold text-xs text-slate-900">{msg.senderName}</span>
                        <span className="text-[10px] text-slate-400">{msg.timestamp.split(' ')[1] || msg.timestamp}</span>
                      </div>

                      <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-purple-600 text-white rounded-tr-none shadow-md shadow-purple-500/10'
                          : 'bg-purple-50 text-purple-950 border border-purple-200 rounded-tl-none font-medium'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <form onSubmit={handleSendParentMessage} className="pt-3 border-t border-slate-200 flex items-center gap-2 mt-auto">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Мұғалімге жеке сұрағыңызды немесе ұсынысыңызды жазыңыз..."
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow"
              >
                <Send className="w-4 h-4" />
                <span>Жіберу</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Consultations list */}
        {activeTab === 'consultations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Мұғалімдермен жоспарланған кездесулер</h3>
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="px-4 py-2 bg-purple-600 text-white font-bold text-xs rounded-xl shadow"
              >
                + Жаңа кеңеске жазылу
              </button>
            </div>

            <div className="space-y-3">
              {consultations.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{c.teacherName}</span>
                      <span className="text-xs text-slate-500">({c.studentName} үшін)</span>
                    </div>
                    <p className="text-xs text-slate-700"><strong>Тақырыбы:</strong> {c.topic}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-semibold text-purple-700">
                        <Calendar className="w-3.5 h-3.5" /> {c.requestedDate}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-purple-700">
                        <Clock className="w-3.5 h-3.5" /> {c.timeSlot}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {c.status === 'accepted' && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200">
                        ✓ Қабылданды (Бекітілді)
                      </span>
                    )}
                    {c.status === 'pending' && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-xl text-xs font-bold border border-amber-200">
                        ⏳ Қарастырылуда
                      </span>
                    )}

                    {currentRole === 'teacher' && c.status === 'pending' && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateConsultationStatus(c.id, 'accepted')}
                          className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                        >
                          Қабылдау
                        </button>
                        <button
                          onClick={() => updateConsultationStatus(c.id, 'declined')}
                          className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold"
                        >
                          Бас тарту
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Parent Announcements */}
        {activeTab === 'announcements' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Ата-аналарға арналған маңызды хабарландырулар</h3>
            
            {announcements
              .filter((a) => a.targetAudience === 'parents' || a.targetAudience === 'all')
              .map((ann) => (
                <div
                  key={ann.id}
                  className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-bold text-xs">
                      {ann.category}
                    </span>
                    <span className="text-xs text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="text-base font-extrabold text-purple-950">{ann.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{ann.content}</p>
                </div>
              ))}
          </div>
        )}

      </div>

      {/* Book Meeting Modal */}
      <BookMeetingModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </div>
  );
}
