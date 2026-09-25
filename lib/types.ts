import type { DayKey } from './config';

export type UserRole = 'student' | 'teacher' | 'parent';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  classId: string;
  studentName?: string; // ата-ана үшін: баласының аты
  isHomeroom?: boolean; // сынып жетекшісі ме
  createdAt?: number;
}

export interface Lesson {
  id: string;
  day: DayKey;
  lessonNumber: number;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  notes?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  important: boolean;
  authorId: string;
  authorName: string;
  createdAt: number;
}

export interface Submission {
  id: string; // studentId
  studentName: string;
  content: string;
  submittedAt: number;
  grade?: number;
  feedback?: string;
}

export interface Homework {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  teacherId: string;
  teacherName: string;
  createdAt: number;
}

export interface Achievement {
  id: string;
  studentName: string;
  title: string;
  category: string;
  description: string;
  points: number;
  teacherName: string;
  createdAt: number;
}

export interface Message {
  id: string;
  channel: 'general' | 'qa';
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  createdAt: number;
}

export interface Consultation {
  id: string;
  parentId: string;
  parentName: string;
  studentName: string;
  teacherName: string;
  topic: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdAt: number;
}
