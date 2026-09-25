'use client';

import React from 'react';

// assets папкасындағы ортақ Loading — сайт беттері обновляться еткенде / навигацияда көрсетіледі
// app/loading.tsx осы компонентті қолданады, қаласа басқа жерде де import етіп қолдануға болады

export default function LoadingScreen() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center gap-6 px-4 py-16">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-3xl bg-gradient-to-br from-sky-400 to-indigo-500 opacity-20" />
        <div className="relative grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 shadow-lg shadow-sky-200">
          <span className="text-xl font-black tracking-tight text-white">8A</span>
        </div>
        <span className="absolute -right-1 -bottom-1 grid h-7 w-7 place-items-center rounded-full bg-white shadow-md ring-1 ring-slate-100">
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-200 border-t-sky-500" />
        </span>
      </div>
      <div className="text-center">
        <p className="text-sm font-extrabold tracking-wide text-slate-900">
          SynypKz <span className="font-normal text-slate-400">•</span> Жүктелуде…
        </p>
        <p className="mt-1 text-xs font-medium text-slate-400">Бет жаңартылуда, сәл күте тұрыңыз</p>
      </div>
      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-1/2 animate-[shimmer_1.1s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" />
      </div>
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
