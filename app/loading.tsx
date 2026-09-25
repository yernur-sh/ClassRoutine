'use client';

import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/loading.json';

// SynypKz — беттер жаңарғанда / навигация кезінде көрсетілетін loading
// Next.js App Router бұл файлды автоматты түрде Suspense fallback ретінде көрсетеді:
// бет ауысқанда немесе refresh кезінде children дайын болғанша осы экран тұрады.
// Анимация assets/loading.json (Lottie) арқылы көрсетіледі.

export default function Loading() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center gap-6 px-4 py-16">
      {/* Lottie анимациясы — assets/loading.json */}
      <div className="relative">
        <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 opacity-10 blur-xl" />
        <div className="h-28 w-28">
          <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-extrabold tracking-wide text-slate-900">
          SynypKz <span className="font-normal text-slate-400">•</span> Жүктелуде…
        </p>
        <p className="mt-1 text-xs font-medium text-slate-400">Бет жаңартылуда, сәл күте тұрыңыз</p>
      </div>

      {/* Жіңішке прогресс сызығы */}
      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-1/2 animate-[shimmer_1.1s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" />
      </div>

      {/* Скелетон — мазмұн жүктелуде деген әсер */}
      <div className="mt-2 grid w-full max-w-2xl gap-3 opacity-60">
        <div className="h-20 rounded-3xl bg-slate-100 animate-pulse" />
        <div className="grid grid-cols-3 gap-3">
          <div className="h-16 rounded-2xl bg-slate-100 animate-pulse" />
          <div className="h-16 rounded-2xl bg-slate-100 animate-pulse" />
          <div className="h-16 rounded-2xl bg-slate-100 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
