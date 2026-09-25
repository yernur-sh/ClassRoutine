// 8 «А» сыныбының апталық сабақ кестесі — суреттегі кесте бойынша.
// ⚠️ Кесте сайт арқылы емес, ОСЫ ФАЙЛ арқылы ғана өзгертіледі.
// Өзгерту үшін төмендегі WEEK_SCHEDULE нысанын түзетіңіз — сайт бірден жаңарады.

import type { DayKey } from './config';
import { DAYS } from './config';

export interface Lesson {
  lessonNumber: number;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  /** Қосымша ескертпе (міндетті емес) */
  notes?: string;
}

/** Мұғалімдер тізімі (кестеде қолданылады). */
export const TEACHERS = {
  ainur: 'Айнұр Серікқызы',
  dana: 'Дана Мұратқызы',
  bolat: 'Болат Ерланұлы',
  gulnar: 'Гүлнар Қайратқызы',
  aset: 'Әсет Нұрланұлы',
  zhanna: 'Жанна Төлеуқызы',
  marat: 'Марат Абайұлы',
  aliya: 'Әлия Бекқызы',
} as const;

const T = TEACHERS;

/** Апталық кесте — суреттегі 8 «А» кестесі, 5 оқу күні. */
export const WEEK_SCHEDULE: Record<DayKey, Lesson[]> = {
  // Дүйсенбі — суреттегі 1-блок: 7 сабақ
  monday: [
    { lessonNumber: 1, time: '08:30 - 09:15', subject: 'Ағылшын тілі', teacher: T.gulnar, room: '№207' },
    { lessonNumber: 2, time: '09:25 - 10:10', subject: 'Алгебра', teacher: T.ainur, room: '№304' },
    { lessonNumber: 3, time: '10:20 - 11:05', subject: 'Химия', teacher: T.aliya, room: '№309' },
    { lessonNumber: 4, time: '11:25 - 12:10', subject: 'Қазақстан тарихы', teacher: T.zhanna, room: '№210' },
    { lessonNumber: 5, time: '12:20 - 13:05', subject: 'География', teacher: T.zhanna, room: '№212' },
    { lessonNumber: 6, time: '13:15 - 14:00', subject: 'Қазақ тілі', teacher: T.dana, room: '№204' },
    { lessonNumber: 7, time: '14:10 - 14:55', subject: 'Дене шынықтыру', teacher: T.marat, room: 'Спортзал' },
  ],
  // Сейсенбі — суреттегі 2-блок: 6 сабақ
  tuesday: [
    { lessonNumber: 1, time: '08:30 - 09:15', subject: 'Қазақ әдебиеті', teacher: T.dana, room: '№204' },
    { lessonNumber: 2, time: '09:25 - 10:10', subject: 'Физика', teacher: T.bolat, room: '№311' },
    { lessonNumber: 3, time: '10:20 - 11:05', subject: 'Орыс тілі', teacher: T.zhanna, room: '№206' },
    { lessonNumber: 4, time: '11:25 - 12:10', subject: 'Геометрия', teacher: T.ainur, room: '№304' },
    { lessonNumber: 5, time: '12:20 - 13:05', subject: 'Ағылшын тілі', teacher: T.gulnar, room: '№207' },
    { lessonNumber: 6, time: '13:15 - 14:00', subject: 'География', teacher: T.zhanna, room: '№212' },
  ],
  // Сәрсенбі — суреттегі 3-блок: 6 сабақ
  wednesday: [
    { lessonNumber: 1, time: '08:30 - 09:15', subject: 'Ағылшын тілі', teacher: T.gulnar, room: '№207' },
    { lessonNumber: 2, time: '09:25 - 10:10', subject: 'Дене шынықтыру', teacher: T.marat, room: 'Спортзал' },
    { lessonNumber: 3, time: '10:20 - 11:05', subject: 'Алгебра', teacher: T.ainur, room: '№304' },
    { lessonNumber: 4, time: '11:25 - 12:10', subject: 'Дүниежүзі тарихы', teacher: T.zhanna, room: '№210' },
    { lessonNumber: 5, time: '12:20 - 13:05', subject: 'Қазақ тілі', teacher: T.dana, room: '№204' },
    { lessonNumber: 6, time: '13:15 - 14:00', subject: 'Қазақ әдебиеті', teacher: T.dana, room: '№204' },
  ],
  // Бейсенбі — суреттегі 4-блок: 7 сабақ
  thursday: [
    { lessonNumber: 1, time: '08:30 - 09:15', subject: 'Дене шынықтыру', teacher: T.marat, room: 'Спортзал' },
    { lessonNumber: 2, time: '09:25 - 10:10', subject: 'Геометрия', teacher: T.ainur, room: '№304' },
    { lessonNumber: 3, time: '10:20 - 11:05', subject: 'Орыс тілі', teacher: T.zhanna, room: '№206' },
    { lessonNumber: 4, time: '11:25 - 12:10', subject: 'Информатика', teacher: T.aset, room: '№112' },
    { lessonNumber: 5, time: '12:20 - 13:05', subject: 'Биология', teacher: T.aliya, room: '№308' },
    { lessonNumber: 6, time: '13:15 - 14:00', subject: 'Химия', teacher: T.aliya, room: '№309' },
    { lessonNumber: 7, time: '14:10 - 14:55', subject: 'Көркем еңбек', teacher: T.aliya, room: '№101' },
  ],
  // Жұма — суреттегі 5-блок: 6 сабақ
  friday: [
    { lessonNumber: 1, time: '08:30 - 09:15', subject: 'Қазақ әдебиеті', teacher: T.dana, room: '№204' },
    { lessonNumber: 2, time: '09:25 - 10:10', subject: 'Биология', teacher: T.aliya, room: '№308' },
    { lessonNumber: 3, time: '10:20 - 11:05', subject: 'Алгебра', teacher: T.ainur, room: '№304' },
    { lessonNumber: 4, time: '11:25 - 12:10', subject: 'Қазақстан тарихы', teacher: T.zhanna, room: '№210' },
    { lessonNumber: 5, time: '12:20 - 13:05', subject: 'Физика', teacher: T.bolat, room: '№311' },
    { lessonNumber: 6, time: '13:15 - 14:00', subject: 'Орыс тілі', teacher: T.zhanna, room: '№206' },
  ],
  saturday: [],
};

/** Барлық сабақтардың жалпы саны. */
export const TOTAL_LESSONS = Object.values(WEEK_SCHEDULE).reduce((n, d) => n + d.length, 0);

/** Кестедегі бірегей пәндер. */
export const SUBJECTS = Array.from(
  new Set(Object.values(WEEK_SCHEDULE).flat().map((l) => l.subject))
).sort((a, b) => a.localeCompare(b, 'kk'));

const DAY_KEYS: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

/** Бүгінгі күннің кілті (жексенбіде — null). */
export function todayKey(date = new Date()): DayKey | null {
  const i = date.getDay(); // 0 = жексенбі
  return i === 0 ? null : DAY_KEYS[i - 1];
}

/** Ертеңгі күннің кілті (сенбі/жексенбі → дүйсенбі). */
export function tomorrowKey(date = new Date()): DayKey {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return todayKey(d) ?? 'monday';
}

/** Күн кілті бойынша сабақтарды алу. */
export function lessonsFor(day: DayKey | null): Lesson[] {
  if (!day) return [];
  return [...WEEK_SCHEDULE[day]].sort((a, b) => a.lessonNumber - b.lessonNumber);
}

/** Күн кілтінің қазақша атауы. */
export function dayLabel(day: DayKey | null): string {
  return DAYS.find((d) => d.key === day)?.label ?? 'Жексенбі';
}
