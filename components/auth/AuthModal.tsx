'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { X, GraduationCap, School, Users, CheckCircle2, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode, login, loginWithGoogle, register } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState('');

  // Update mode when parent changes authModalMode
  React.useEffect(() => {
    setMode(authModalMode);
  }, [authModalMode]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email) {
        setError('Электрондық поштаны енгізіңіз');
        return;
      }
      login(email, password, selectedRole);
    } else {
      if (!name || !email) {
        setError('Барлық өрістерді толтырыңыз');
        return;
      }
      register(name, email, password, selectedRole, studentName);
    }
  };

  const handleQuickDemo = (role: UserRole) => {
    if (role === 'teacher') {
      login('ainur.kasymova@school.kz', '123456', 'teacher');
    } else if (role === 'parent') {
      login('seit.kasymuly@gmail.com', '123456', 'parent');
    } else {
      login('arman.seitov@school.kz', '123456', 'student');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header gradient banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Жабу"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-blue-100 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> 7 «А» сынып порталы
            </span>
          </div>
          <h2 className="text-2xl font-bold">
            {mode === 'login' ? 'Сынып порталына кіру' : 'Жаңа аккаунт тіркеу'}
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            {mode === 'login' 
              ? 'Рөліңізді таңдап, жүйеге кіріңіз' 
              : 'Өз рөліңізді белгілеп, сынып порталының мүмкіндіктерін ашыңыз'}
          </p>

          {/* Tab switch */}
          <div className="flex bg-blue-900/40 p-1 rounded-xl mt-4 max-w-xs">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login' ? 'bg-white text-blue-900 shadow-md' : 'text-blue-100 hover:text-white'
              }`}
            >
              Кіру (Логин)
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'register' ? 'bg-white text-blue-900 shadow-md' : 'text-blue-100 hover:text-white'
              }`}
            >
              Тіркелу (Регистрация)
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {/* Quick Demo Access Bar */}
          <div className="mb-6 p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl">
            <div className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Жылдам демо кіру (Бір батырмамен тексеру):
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('teacher')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-blue-600 hover:text-white border border-blue-200 rounded-xl text-xs font-semibold text-blue-700 transition shadow-sm hover:shadow"
              >
                <School className="w-3.5 h-3.5" /> Мұғалім
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-emerald-600 hover:text-white border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-700 transition shadow-sm hover:shadow"
              >
                <GraduationCap className="w-3.5 h-3.5" /> Оқушы
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('parent')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-purple-600 hover:text-white border border-purple-200 rounded-xl text-xs font-semibold text-purple-700 transition shadow-sm hover:shadow"
              >
                <Users className="w-3.5 h-3.5" /> Ата-ана
              </button>
            </div>
          </div>

          {/* Role selection cards */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Рөліңізді таңдаңыз (3 роль):
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              
              {/* Student Role */}
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`relative flex flex-col items-center p-3.5 rounded-2xl border-2 text-center transition-all ${
                  selectedRole === 'student'
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-md ring-2 ring-emerald-400/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {selectedRole === 'student' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute top-2 right-2" />
                )}
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1.5 text-lg">
                  👨‍🎓
                </div>
                <div className="font-bold text-sm text-slate-800">Оқушы</div>
                <div className="text-[11px] text-slate-500 leading-tight mt-0.5">Сабақ кестесі, үй жұмысы, үзіліс</div>
              </button>

              {/* Teacher Role */}
              <button
                type="button"
                onClick={() => setSelectedRole('teacher')}
                className={`relative flex flex-col items-center p-3.5 rounded-2xl border-2 text-center transition-all ${
                  selectedRole === 'teacher'
                    ? 'border-blue-500 bg-blue-50/60 shadow-md ring-2 ring-blue-400/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {selectedRole === 'teacher' && (
                  <CheckCircle2 className="w-4 h-4 text-blue-600 absolute top-2 right-2" />
                )}
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-1.5 text-lg">
                  👩‍🏫
                </div>
                <div className="font-bold text-sm text-slate-800">Мұғалім</div>
                <div className="text-[11px] text-slate-500 leading-tight mt-0.5">Жетістік қосу, журнал, хабарландыру</div>
              </button>

              {/* Parent Role */}
              <button
                type="button"
                onClick={() => setSelectedRole('parent')}
                className={`relative flex flex-col items-center p-3.5 rounded-2xl border-2 text-center transition-all ${
                  selectedRole === 'parent'
                    ? 'border-purple-500 bg-purple-50/60 shadow-md ring-2 ring-purple-400/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {selectedRole === 'parent' && (
                  <CheckCircle2 className="w-4 h-4 text-purple-600 absolute top-2 right-2" />
                )}
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mb-1.5 text-lg">
                  👨‍👩‍👦
                </div>
                <div className="font-bold text-sm text-slate-800">Ата-ана</div>
                <div className="text-[11px] text-slate-500 leading-tight mt-0.5">Үлгерім, кеңес алу, мұғаліммен чат</div>
              </button>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={() => loginWithGoogle(selectedRole)}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-300 hover:bg-slate-50 rounded-2xl font-semibold text-slate-700 transition shadow-sm hover:shadow mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google аккаунтымен {mode === 'login' ? 'кіру' : 'тіркелу'}</span>
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-xs text-slate-400 font-medium uppercase">немесе email арқылы</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Толық аты-жөніңіз</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Мысалы: Арман Сейітов немесе Айнұр Маратқызы"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
            )}

            {mode === 'register' && selectedRole === 'parent' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Балаңыздың аты-жөні</label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Мысалы: Арман Сейітов (7 «А» сынып)"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-purple-50/40 border border-purple-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Электрондық пошта (Email)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@school.kz"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Құпия сөз (Пароль)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition transform active:scale-95"
            >
              <span>{mode === 'login' ? 'Жүйеге кіру' : 'Тіркелуді аяқтау'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer toggle */}
          <div className="mt-4 text-center text-xs text-slate-500">
            {mode === 'login' ? (
              <span>
                Аккаунтыңыз жоқ па?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Сайтқа тіркелу
                </button>
              </span>
            ) : (
              <span>
                Аккаунтыңыз бар ма?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Кіру
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
