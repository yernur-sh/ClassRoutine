'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { UserRole } from '@/lib/types';
import {
  Calendar,
  MessageSquare,
  Trophy,
  Users,
  Smile,
  Home,
  LogIn,
  LogOut,
  ChevronDown,
  Sparkles,
  School,
  GraduationCap,
  Menu,
  X,
  Bell,
  Check
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { currentUser, currentRole, openAuthModal, logout, switchRole, announcements } = useApp();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Басты бет', icon: Home },
    { href: '/schedule', label: 'Сабақ кестесі', icon: Calendar, badge: '1 апта' },
    { href: '/communication', label: 'Мұғалім & Оқушы', icon: MessageSquare },
    { href: '/achievements', label: 'Жетістіктер', icon: Trophy, badge: 'XP' },
    { href: '/parent-portal', label: 'Ата-ана порталы', icon: Users },
    { href: '/fun-break', label: 'Көңілді үзіліс', icon: Smile, highlight: true },
  ];

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'teacher':
        return { label: 'Мұғалім', icon: School, bg: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'parent':
        return { label: 'Ата-ана', icon: Users, bg: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'student':
      default:
        return { label: 'Оқушы', icon: GraduationCap, bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    }
  };

  const roleInfo = getRoleBadge(currentRole);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-yellow-400 text-blue-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              7 «А» СЫНЫБЫ
            </span>
            <span className="truncate hidden sm:inline">
              Әл-Фараби атындағы №178 мамандандырылған мектеп-лицейінің ресми цифрлық кеңістігі
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] shrink-0 font-medium text-blue-100">
            <span>Сынып жетекшісі: Айнұр Маратқызы</span>
            <span className="text-blue-300">|</span>
            <span className="flex items-center gap-1 text-emerald-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Портал онлайн
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Class title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              7A
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  ClassRoutine
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none">
                7 «А» сынып басқару жүйесі
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                      : link.highlight
                        ? 'text-amber-700 hover:bg-amber-50 hover:text-amber-800 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : link.highlight ? 'text-amber-500' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                      {link.badge}
                    </span>
                  )}
                  {link.highlight && (
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header: Role switcher, Notifications, Auth */}
          <div className="flex items-center gap-2.5">
            
            {/* Quick Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${roleInfo.bg}`}
                title="Рөлді ауыстыру"
              >
                <roleInfo.icon className="w-3.5 h-3.5" />
                <span>Рөл: {roleInfo.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {roleMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setRoleMenuOpen(false)}
                >
                  <div className="px-3.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Рөлді ауыстыру (Демо):
                  </div>
                  <button
                    onClick={() => { switchRole('student'); setRoleMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left font-medium hover:bg-slate-50 transition ${
                      currentRole === 'student' ? 'text-emerald-700 bg-emerald-50/50 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div>Оқушы (Арман Сейітов)</div>
                        <div className="text-[10px] text-slate-400">Тапсырмалар мен ойындар</div>
                      </div>
                    </div>
                    {currentRole === 'student' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    onClick={() => { switchRole('teacher'); setRoleMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left font-medium hover:bg-slate-50 transition ${
                      currentRole === 'teacher' ? 'text-blue-700 bg-blue-50/50 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <School className="w-4 h-4 text-blue-600" />
                      <div>
                        <div>Мұғалім (Айнұр Маратқызы)</div>
                        <div className="text-[10px] text-slate-400">Жетістік қосу, кесте түзету</div>
                      </div>
                    </div>
                    {currentRole === 'teacher' && <Check className="w-4 h-4 text-blue-600" />}
                  </button>

                  <button
                    onClick={() => { switchRole('parent'); setRoleMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left font-medium hover:bg-slate-50 transition ${
                      currentRole === 'parent' ? 'text-purple-700 bg-purple-50/50 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <div>
                        <div>Ата-ана (Сейіт Қасымұлы)</div>
                        <div className="text-[10px] text-slate-400">Үлгерім мен мұғалімге сұрақ</div>
                      </div>
                    </div>
                    {currentRole === 'parent' && <Check className="w-4 h-4 text-purple-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications toggle */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition"
                aria-label="Хабарландырулар"
              >
                <Bell className="w-5 h-5" />
                {announcements.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse"></span>
                )}
              </button>

              {notificationsOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-fadeIn"
                  onMouseLeave={() => setNotificationsOpen(false)}
                >
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">Сынып хабарландырулары</span>
                    <span className="text-[11px] text-blue-600 font-semibold">{announcements.length} жаңа</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                    {announcements.slice(0, 3).map((ann) => (
                      <div key={ann.id} className="p-3 hover:bg-slate-50 transition text-xs">
                        <div className="font-bold text-slate-800 line-clamp-1">{ann.title}</div>
                        <p className="text-slate-500 line-clamp-2 mt-0.5">{ann.content}</p>
                        <span className="text-[10px] text-slate-400 mt-1 inline-block">{ann.date} • {ann.author}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile or Login/Register Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2 bg-slate-100 hover:bg-slate-200/80 rounded-2xl border border-slate-200 transition"
                >
                  <div className="text-right hidden sm:block leading-tight">
                    <div className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500">
                      {roleInfo.label}
                    </div>
                  </div>
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-xl object-cover ring-2 ring-white shadow-sm"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                      {currentUser.name.charAt(0)}
                    </div>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 pr-1" />
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-fadeIn"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize" style={{ backgroundColor: '#f1f5f9' }}>
                        <span>Рөлі: {roleInfo.label}</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/schedule"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        <Calendar className="w-4 h-4 text-slate-400" /> Сабақ кестесі
                      </Link>
                      <Link
                        href="/achievements"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        <Trophy className="w-4 h-4 text-slate-400" /> Жетістіктер тақтасы
                      </Link>
                      {currentRole === 'parent' && (
                        <Link
                          href="/parent-portal"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        >
                          <Users className="w-4 h-4 text-purple-500" /> Бала үлгерімі
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-semibold transition"
                      >
                        <LogOut className="w-4 h-4" /> Жүйеден шығу (Logout)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Кіру</span>
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 transition transform active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Тіркелу</span>
                </button>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Мәзір"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {/* Quick role selector for mobile */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 mb-3">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Ағымдағы рөл: <span className="text-slate-800">{roleInfo.label}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => { switchRole('student'); setMobileMenuOpen(false); }}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold ${
                  currentRole === 'student' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 border'
                }`}
              >
                👨‍🎓 Оқушы
              </button>
              <button
                onClick={() => { switchRole('teacher'); setMobileMenuOpen(false); }}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold ${
                  currentRole === 'teacher' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border'
                }`}
              >
                👩‍🏫 Мұғалім
              </button>
              <button
                onClick={() => { switchRole('parent'); setMobileMenuOpen(false); }}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold ${
                  currentRole === 'parent' ? 'bg-purple-600 text-white' : 'bg-white text-slate-700 border'
                }`}
              >
                👨‍👩‍👦 Ата-ана
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : link.highlight
                        ? 'bg-amber-50 text-amber-800 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : link.highlight ? 'text-amber-500' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {!currentUser && (
            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                className="flex-1 py-2.5 bg-slate-100 text-slate-800 font-bold rounded-xl text-xs text-center"
              >
                Кіру
              </button>
              <button
                onClick={() => { openAuthModal('register'); setMobileMenuOpen(false); }}
                className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs text-center shadow"
              >
                Тіркелу
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
