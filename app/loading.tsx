// SynypKz — беттер жаңарғанда / навигация кезінде көрсетілетін loading
// Next.js App Router бұл файлды автоматты түрде Suspense fallback ретінде көрсетеді:
// бет ауысқанда немесе refresh кезінде children дайын болғанша осы экран тұрады.
// Нақты UI assets/LoadingScreen-нен алынады — assets папкасындағы loading қолданылады.

import LoadingScreen from '@/assets/LoadingScreen';

export default function Loading() {
  return <LoadingScreen />;
}
