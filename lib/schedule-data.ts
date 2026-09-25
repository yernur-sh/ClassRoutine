// 8 «А» сыныбының апталық сабақ кестесі.
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

/** Апталық кесте — барлық күн бір жерде. */
export const WEEK_SCHEDULE: Record<DayKey, Lesson[]> = {
  monday: [
    { lessonNumber: 1, time: '08:30 - 09:15', subject: 'Қазақ тілі', teacher: T.dana, room: '№204' },
    { lessonNumber: 2, time: '09:25 - 10:10', subject: 'Алгебра', teacher: T.ainur, room: '№304' },
    { lessonNumber: 3, time: '10:20 - 11:05', subject: 'Ағылшын тілі', teacher: T.gulnar, room: '№207' },
    { lessonNumber: 4, time: '11:25 - 12:10', subject: 'Физика', teacher: T.bolat, room: '№311', notes: 'Зертханалық жұмыс' },
    { lessonNumber: 5, time: '12:20 - 13:05', subject: 'Қазақстан тарихы', teacher: T.zhanna, room: '№210' },
    { lessonNumber: 6, time: '13:15 - 14:00', subject: 'Дене шынықтыру', teacher: T.marat, room: 'Спортзал' },
  ],
  tuesday: [
    { lessonNumber: 1, time: '08:30 - 09:15', subject: 'Геометрия', teacher: T.ainur, room: '№304' },
    { lessonNumber: 2, time: '09:25 - 10:10', subject: 'Қазақ әдебиеті', teacher: T.dana, room: '№204' },
    { lessonNumber: 3, time: '10:20 - 11:05', subject: 'Биология', teacher: T.aliya, room: '№308' },
    { lessonNumber: 4, time: '11:25 - 12:10', subject: 'Информатика', teacher: T.aset, room: '№112', notes: 'Ноутбук алып келу' },
    { lessonNumber: 5, time: '12:20 - 13:05', subject: 'Орыс тілі', teacher: T.zhanna, room: '№206' },
    { lessonNumber: 6, time: '13:15 - 14:00', subject: 'Көркем еңбек', teacher: T.aliya, room: '№101' },
  ],
  wednesday: [
    { lessonNumber: 1, time: '08:30 - 09:15', subject: 'Алгебра', teacher: T.ainur, room: '№304' },
    { lessonNumber: 2, time: '09:25 - 10:10', subject: 'Химия', teacher: T.aliya, room: '№309' },
    { lessonNumber: 3, time: '10:20 - 11:05', subject: 'Ағылшын тілі', teacher: T.gulnar, room: '№207' },
    { lessonNumber: 4, time: '11:25 - 12:10', subject: 'География', teacher: T.zhanna, room: '№212' },
    { lessonNumber: 5, time: '12:20 - 13:05', subject: 'Қазақ тілі', teacher: T.dana, room: '№204' },
    { lessonNumber: 6, time: '13:15 - 14:00', subject: 'Дене шынықтыру', teacher: T.marat, room: 'Спортзал' },
    { lessonNumber: 7, time: '14:10 - 14:55', subject: 'Музыка', teacher: T.gulnar, room: '№103' },
  ],
  thursday: [
    { lessonNumber: 1, time: '08:30 - 09:15', subject: 'Физика', teacher: T.bolat, room: '№311' },
    { lessonNumber: 2, time: '09:25 - 10:10', subject: 'Геометрия', teacher: T.ainur, room: '№304' },
    { lessonNumber: 3, time: '10:20 - 11:05', subject: 'Дүниежүзі тарихы', teacher: T.zhanna, room: '№210' },
    { lessonNumber: 4, time: '11:25 - 12:10', subject: 'Орыс әдебиеті', teacher: T.zhanna, room: '№206' },
    { lessonNumber: 5, time: '12:20 - 13:05', subject: 'Информатика', teacher: T.aset, room: '№112' },
    { lessonNumber: 6, time: '13:15 - 14:00', subject: 'Биология', teacher: T.aliya, room: '№308' },
  ],
  friday: [
    { lessonNumber: 1, time: '08:30 - 09:15', subject: 'Қазақ әдебиеті', teacher: T.dana, room: '№204' },
    { lessonNumber: 2, time: '09:25 - 10:10', subject: 'Алгебра', teacher: T.ainur, room: '№304' },
    { lessonNumber: 3, time: '10:20 - 11:05', subject: 'Химия', teacher: T.aliya, room: '№309' },
    { lessonNumber: 4, time: '11:25 - 12:10', subject: 'Ағылшын тілі', teacher: T.gulnar, room: '№207' },
    { lessonNumber: 5, time: '12:20 - 13:05', subject: 'География', teacher: T.zhanna, room: '№212' },
    { lessonNumber: 6, time: '13:15 - 14:00', subject: 'Тәрбие сағаты', teacher: T.ainur, room: '№304', notes: 'Сынып жетекшісінің сағаты' },
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
