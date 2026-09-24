'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { HomeworkItem } from '@/lib/types';
import HomeworkModal from './HomeworkModal';
import {
  MessageSquare,
  Send,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Plus,
  HelpCircle,
  FileText,
  User,
  Sparkles,
  School,
  Check,
  AlertCircle
} from 'lucide-react';

export default function TeacherStudentHub() {
  const { messages, sendMessage, homeworkList, currentUser, currentRole, announcements } = useApp();
  
  const [activeTab, setActiveTab] = useState<'chat' | 'qa' | 'homework' | 'announcements'>('chat');
  const [inputText, setInputText] = useState('');
  
  // Homework modal states
  const [isHwModalOpen, setIsHwModalOpen] = useState(false);
  const [hwModalMode, setHwModalMode] = useState<'create' | 'submit' | 'grade'>('create');
  const [selectedHomework, setSelectedHomework] = useState<HomeworkItem | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<{ studentId: string; studentName: string; content: string } | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const channel = activeTab === 'qa' ? 'qa' : 'general';
    sendMessage(channel, inputText);
    setInputText('');
  };

  const currentMessages = messages.filter((m) => {
    if (activeTab === 'qa') return m.channel === 'qa';
    if (activeTab === 'chat') return m.channel === 'general';
    return false;
  });

  const handleOpenCreateHomework = () => {
    setSelectedHomework(null);
    setHwModalMode('create');
    setIsHwModalOpen(true);
  };

  const handleOpenSubmitHomework = (hw: HomeworkItem) => {
    setSelectedHomework(hw);
    setHwModalMode('submit');
    setIsHwModalOpen(true);
  };

  const handleOpenGradeHomework = (hw: HomeworkItem, sub: any) => {
    setSelectedHomework(hw);
    setSelectedSubmission(sub);
    setHwModalMode('grade');
    setIsHwModalOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-blue-100 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-yellow-300" /> Интерактивті байланыс
              </span>
              <span className="px-2.5 py-1 bg-emerald-500/30 text-emerald-200 rounded-full text-xs font-semibold">
                Тікелей диалог
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Мұғалім мен Оқушы байланыс орталығы
            </h1>

            <p className="text-blue-100 text-sm max-w-2xl">
              Сынып чаты, пәндік сұрақ-жауап, үй тапсырмаларын тапсыру және мұғалімнің жедел кері байланысы.
            </p>
          </div>

          {currentRole === 'teacher' && (
            <button
              onClick={handleOpenCreateHomework}
              className="flex items-center gap-2 px-5 py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold rounded-2xl shadow-lg transition transform active:scale-95 text-xs sm:text-sm shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Үй тапсырмасын беру</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'chat' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Жалпы сынып чаты</span>
        </button>

        <button
          onClick={() => setActiveTab('homework')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'homework' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Үй тапсырмалары</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-800">
            {homeworkList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('qa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'qa' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Пәндік сұрақ-жауап</span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'announcements' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Хабарландырулар</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800">
            {announcements.length}
          </span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Tab 1 & Tab 3: Chat / Q&A Channels */}
        {(activeTab === 'chat' || activeTab === 'qa') && (
          <div className="flex flex-col h-[600px]">
            {/* Header info in chat */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${activeTab === 'chat' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                <h3 className="font-bold text-sm text-slate-800">
                  {activeTab === 'chat' ? '7 «А» сынып оқушылары мен мұғалімдердің ашық диалог арнасы' : 'Пәндік сұрақтар мен мұғалім түсіндірмелері'}
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">Барлығы {currentMessages.length} хабарлама</span>
            </div>

            {/* Messages scroll area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {currentMessages.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                  <MessageSquare className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                  <p className="font-medium text-sm">Әзірге бұл арнада хабарлама жоқ. Алғашқы болып жазыңыз!</p>
                </div>
              ) : (
                currentMessages.map((msg) => {
                  const isMe = currentUser?.id === msg.senderId;
                  const isTeacher = msg.senderRole === 'teacher';

                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[85%] sm:max-w-[70%] ${
                        isMe ? 'ml-auto flex-row-reverse' : ''
                      }`}
                    >
                      <img
                        src={msg.senderAvatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'}
                        alt={msg.senderName}
                        className="w-9 h-9 rounded-xl object-cover ring-2 ring-white shrink-0 mt-1 shadow-sm"
                      />

                      <div>
                        <div className={`flex items-center gap-2 mb-1 ${isMe ? 'justify-end' : ''}`}>
                          <span className="font-bold text-xs text-slate-900">{msg.senderName}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                            isTeacher ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {isTeacher ? 'Мұғалім' : 'Оқушы'}
                          </span>
                          <span className="text-[10px] text-slate-400">{msg.timestamp.split(' ')[1] || msg.timestamp}</span>
                        </div>

                        <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isMe
                            ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-500/10'
                            : isTeacher
                              ? 'bg-blue-50 text-blue-950 border border-blue-200 rounded-tl-none font-medium'
                              : 'bg-slate-100 text-slate-800 rounded-tl-none'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Message input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={activeTab === 'chat' ? 'Хабарлама жазу...' : 'Пән бойынша сұрағыңызды қойыңыз...'}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-2.5 sm:px-5 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md transition flex items-center gap-1.5 text-xs sm:text-sm font-bold"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Жіберу</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Homework Module */}
        {activeTab === 'homework' && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Ағымдағы үй тапсырмалары</h3>
                <p className="text-xs text-slate-500">
                  Тапсырмаларды мерзімінен кешіктірмей орындап, мұғалімнің бағасы мен пікірін алыңыз
                </p>
              </div>

              {currentRole === 'teacher' && (
                <button
                  onClick={handleOpenCreateHomework}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Тапсырма қосу</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {homeworkList.map((hw) => {
                const mySubmission = hw.submissions.find((s) => s.studentId === currentUser?.id);
                const isStudent = currentRole === 'student';

                return (
                  <div
                    key={hw.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-200 transition space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-800">
                            {hw.subject}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            Мерзімі: {hw.dueDate} дейін
                          </span>
                        </div>
                        <h4 className="text-base font-extrabold text-slate-900 mt-1">
                          {hw.title}
                        </h4>
                      </div>

                      {/* Action buttons */}
                      <div>
                        {isStudent && (
                          mySubmission ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200">
                              <Check className="w-3.5 h-3.5" /> Тапсырылды
                            </span>
                          ) : (
                            <button
                              onClick={() => handleOpenSubmitHomework(hw)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition"
                            >
                              Тапсырманы орындау
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/60">
                      {hw.description}
                    </p>

                    {/* Teacher information */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span>Мұғалім: {hw.teacherName}</span>
                      <span>Тапсырғандар: {hw.submissions.length} оқушы</span>
                    </div>

                    {/* Student's own submission details */}
                    {isStudent && mySubmission && (
                      <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
                        <div className="font-bold text-emerald-900 flex items-center justify-between">
                          <span>Сіздің жауабыңыз ({mySubmission.submittedDate}):</span>
                          {mySubmission.grade && (
                            <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-extrabold">
                              Бағасы: {mySubmission.grade}/10 балл
                            </span>
                          )}
                        </div>
                        <p className="text-emerald-950 font-medium">{mySubmission.content}</p>
                        {mySubmission.feedback && (
                          <div className="mt-1 pt-1 border-t border-emerald-200 text-emerald-800 italic">
                            💬 Мұғалім пікірі: {mySubmission.feedback}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Teacher view of all student submissions */}
                    {currentRole === 'teacher' && hw.submissions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <div className="text-xs font-bold text-slate-700 mb-2">
                          Оқушылардың жұмыстары ({hw.submissions.length}):
                        </div>
                        <div className="space-y-2">
                          {hw.submissions.map((sub) => (
                            <div
                              key={sub.studentId}
                              className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                            >
                              <div>
                                <span className="font-bold text-slate-900">{sub.studentName}</span>
                                <span className="text-slate-400 text-[11px] ml-2">({sub.submittedDate})</span>
                                <p className="text-slate-600 mt-1">{sub.content}</p>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {sub.status === 'graded' ? (
                                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg border border-emerald-200">
                                    Бағаланды: {sub.grade}/10
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => handleOpenGradeHomework(hw, sub)}
                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs"
                                  >
                                    Бағалау
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Announcements */}
        {activeTab === 'announcements' && (
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Сынып хабарландырулары мен жаңалықтары</h3>
            <div className="space-y-4">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className={`p-5 rounded-2xl border ${
                    ann.important
                      ? 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-300/40'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      {ann.category}
                    </span>
                    <span className="text-xs text-slate-400">{ann.date}</span>
                  </div>

                  <h4 className="font-extrabold text-base text-slate-900 mb-1">{ann.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{ann.content}</p>
                  
                  <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                    Жариялаған: {ann.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Homework Action Modal */}
      <HomeworkModal
        isOpen={isHwModalOpen}
        onClose={() => setIsHwModalOpen(false)}
        mode={hwModalMode}
        homework={selectedHomework}
        studentSubmission={selectedSubmission}
      />
    </div>
  );
}
