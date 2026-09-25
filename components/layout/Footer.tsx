import React from 'react';
import Link from 'next/link';
import { CLASS_LABEL } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200/80 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 text-[10px] font-black text-white">
            7A
          </span>
          ClassRoutine — {CLASS_LABEL}
        </p>
        <div className="flex items-center gap-4">
          <Link href="/schedule" className="transition hover:text-sky-600">Кесте</Link>
          <Link href="/communication" className="transition hover:text-sky-600">Хабарламалар</Link>
          <span className="text-slate-300">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
