'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Бет жаңарғанда / маршрут ауысқанда жоғарғы жіңішке прогресс + жеңіл overlay
// App Router-да navigation RSC fetch болғанша жүреді — осы компонент визуалды кері байланыс береді.
// Сондай-ақ F5 (refresh) кезінде алғашқы 600мс ішінде қысқа loader көрсетеді.

export default function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Алғашқы жүктелу (refresh) — қысқа көрсету, сосын жасыру
  useEffect(() => {
    setVisible(true);
    setProgress(30);
    progRef.current = setInterval(() => {
      setProgress((p) => (p < 85 ? p + Math.random() * 18 : p));
    }, 180);
    timerRef.current = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setVisible(false), 250);
      if (progRef.current) clearInterval(progRef.current);
    }, 650);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progRef.current) clearInterval(progRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Маршрут ауысқанда (pathname/searchParams өзгергенде) қайта көрсету
  useEffect(() => {
    // Алғашқы mount-ты өткізіп жіберу үшін кішкене кідіріс — жоғарыдағы эффект жауып үлгерсін
    const t0 = setTimeout(() => {
      setVisible(true);
      setProgress(25);
      if (progRef.current) clearInterval(progRef.current);
      progRef.current = setInterval(() => {
        setProgress((p) => (p < 90 ? p + Math.random() * 15 : p));
      }, 160);
      timerRef.current = setTimeout(() => {
        setProgress(100);
        setTimeout(() => setVisible(false), 300);
        if (progRef.current) clearInterval(progRef.current);
      }, 700);
    }, 50);
    return () => {
      clearTimeout(t0);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progRef.current) clearInterval(progRef.current);
    };
    // pathname/searchParams өзгерген сайын іске қосылады
  }, [pathname, searchParams]);

  if (!visible) return null;

  return (
    <>
      {/* Жоғарғы прогресс жолағы */}
      <div className="pointer-events-none fixed left-0 top-0 z-[9999] h-[3px] w-full">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 shadow-sm transition-all duration-200 ease-out"
          style={{ width: `${progress}%`, opacity: progress >= 100 ? 0 : 1 }}
        />
      </div>

      {/* Жеңіл overlay + ортадағы шағын spinner — бет ауысуы байқалады */}
      {progress < 100 && progress > 25 && (
        <div className="pointer-events-none fixed inset-0 z-[9998] bg-white/25 backdrop-blur-[1px]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-lg ring-1 ring-slate-100">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-200 border-t-sky-500" />
              Жүктелуде…
            </div>
          </div>
        </div>
      )}
    </>
  );
}
