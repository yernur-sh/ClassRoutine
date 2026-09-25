// Сыныпқа қатысты негізгі баптаулар.
// Мұғалім / сынып жетекші рөлі осы e-mail тізімі арқылы анықталады.

export const CLASS_ID = '7-A';
export const CLASS_LABEL = '7 «А» сыныбы';
export const SCHOOL_NAME = 'Мектеп-лицей';

/** Сынып жетекшісінің e-mail-ы. Тек осы адам сынып хабарламасын жариялай алады. */
export const HOMEROOM_TEACHER_EMAIL = 'ainur@school.kz';

/** Мұғалім құқығы бар e-mail-дар (сынып жетекшісі де осында кіреді). */
export const TEACHER_EMAILS = [
  HOMEROOM_TEACHER_EMAIL,
  'teacher@school.kz',
];

export const DAYS: { key: DayKey; label: string; short: string }[] = [
  { key: 'monday', label: 'Дүйсенбі', short: 'Дс' },
  { key: 'tuesday', label: 'Сейсенбі', short: 'Сс' },
  { key: 'wednesday', label: 'Сәрсенбі', short: 'Ср' },
  { key: 'thursday', label: 'Бейсенбі', short: 'Бс' },
  { key: 'friday', label: 'Жұма', short: 'Жм' },
  { key: 'saturday', label: 'Сенбі', short: 'Сн' },
];

export type DayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export const LESSON_TIMES = [
  '08:30 - 09:15',
  '09:25 - 10:10',
  '10:20 - 11:05',
  '11:25 - 12:10',
  '12:20 - 13:05',
  '13:15 - 14:00',
  '14:10 - 14:55',
];

export const SUBJECT_COLORS: Record<string, string> = {
  default: 'from-sky-400 to-blue-500',
};

const PALETTE = [
  'from-rose-400 to-pink-500',
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-teal-500',
  'from-sky-400 to-blue-500',
  'from-violet-400 to-purple-500',
  'from-fuchsia-400 to-rose-500',
  'from-lime-400 to-emerald-500',
  'from-cyan-400 to-sky-500',
];

/** Пән атауынан тұрақты түс градиентін шығарады. */
export function subjectGradient(subject: string) {
  let hash = 0;
  for (let i = 0; i < subject.length; i++) hash = (hash * 31 + subject.charCodeAt(i)) % 9973;
  return PALETTE[hash % PALETTE.length];
}

export const ACHIEVEMENT_CATEGORIES = [
  { key: 'olympiad', label: 'Олимпиада', emoji: '🏅' },
  { key: 'sport', label: 'Спорт', emoji: '⚽' },
  { key: 'art', label: 'Өнер', emoji: '🎨' },
  { key: 'science', label: 'Ғылым', emoji: '🔬' },
  { key: 'reading', label: 'Оқырмандық', emoji: '📚' },
  { key: 'discipline', label: 'Тәртіп', emoji: '⭐' },
] as const;

export const BREAK_EXERCISES = [
  {
    id: 'eye',
    title: 'Көзге арналған жаттығу',
    emoji: '👁️',
    seconds: 60,
    gradient: 'from-sky-400 to-cyan-500',
    steps: [
      'Көзді 5 секунд жұмып, ашыңыз (3 рет).',
      'Көз алмасын баяу солға-оңға жүргізіңіз.',
      'Алыстағы затқа 20 секунд қараңыз.',
      'Көзді жеңіл ысқылап, терең дем алыңыз.',
    ],
  },
  {
    id: 'stretch',
    title: 'Сергіту жаттығуы',
    emoji: '🤸',
    seconds: 90,
    gradient: 'from-emerald-400 to-teal-500',
    steps: [
      'Орныңыздан тұрып, иықты 10 рет айналдырыңыз.',
      'Қолды жоғары созып, денені екі жаққа иіңіз.',
      'Мойынды баяу оңға-солға бұрыңыз.',
      'Орнында 15 рет отырып-тұрыңыз.',
    ],
  },
  {
    id: 'breathing',
    title: 'Тыныс алу жаттығуы',
    emoji: '🌬️',
    seconds: 60,
    gradient: 'from-violet-400 to-indigo-500',
    steps: [
      '4 секунд мұрынмен дем алыңыз.',
      '4 секунд деміңізді ұстаңыз.',
      '6 секунд ауызбен баяу шығарыңыз.',
      'Осыны 5 рет қайталаңыз.',
    ],
  },
];
