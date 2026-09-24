'use client';

import React from 'react';
import Link from 'next/link';
import { School, Heart, Shield, Sparkles, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Column 1: School Branding */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/20">
                7A
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">ClassRoutine</span>
                <span className="ml-2 px-2 py-0.5 rounded bg-blue-900 text-blue-300 font-bold text-xs">
                  7 «А» Сыныбы
                </span>
                <p className="text-xs text-slate-400">№178 мамандандырылған лицейінің ресми порталы</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Оқушылар, ұстаздар мен ата-аналарға арналған бірыңғай цифрлық платформа. 
              Сабақ кестесі, жетістіктер тақтасы, үй тапсырмасы мен көңілді үзіліс жаттығулары бір жерде.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-blue-400 border border-slate-700">
                <Sparkles className="w-3.5 h-3.5" /> Next.js + TS + Firebase Ready
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-emerald-400 border border-slate-700">
                <Shield className="w-3.5 h-3.5" /> 3 Рөлдік қауіпсіз жүйе
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" /> Сайт бөлімдері
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/schedule" className="hover:text-blue-400 transition-colors">
                  📅 1 апталық сабақ кестесі
                </Link>
              </li>
              <li>
                <Link href="/communication" className="hover:text-blue-400 transition-colors">
                  💬 Мұғалім мен оқушы байланысы
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-blue-400 transition-colors">
                  🏆 Оқушылар жетістіктері (XP)
                </Link>
              </li>
              <li>
                <Link href="/parent-portal" className="hover:text-blue-400 transition-colors">
                  👨‍👩‍👦 Ата-ана мен мұғалім байланысы
                </Link>
              </li>
              <li>
                <Link href="/fun-break" className="hover:text-amber-400 text-amber-300 font-semibold transition-colors">
                  ⚡ «Көңілді үзіліс» жаттығулары
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Class Info */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <School className="w-4 h-4 text-emerald-400" /> Сынып деректері
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p><strong className="text-slate-200">Сынып жетекшісі:</strong> Айнұр Маратқызы</p>
              <p><strong className="text-slate-200">Оқушылар саны:</strong> 28 оқушы</p>
              <p><strong className="text-slate-200">Басты кабинет:</strong> №304 математика кабинеті</p>
              <p><strong className="text-slate-200">Сынып ұраны:</strong> «Ізденіс, білім, жетістік!»</p>
              <p><strong className="text-slate-200">Байланыс:</strong> +7 (701) 555-12-34</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 ClassRoutine – 7 «А» сыныбының цифрлық порталы. Барлық құқықтар қорғалған.</p>
          <p className="flex items-center gap-1">
            Білімге құштар оқушылар үшін <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> жасалған
          </p>
        </div>
      </div>
    </footer>
  );
}
