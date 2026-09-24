export type UserRole = 'student' | 'teacher' | 'parent';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  studentId?: string; // For parents: which student is their child
  studentName?: string; // e.g., "Арман Сейітов" for parent
  subject?: string; // For teachers: e.g. "Математика және сынып жетекшісі"
  classId: string; // e.g. "7-A"
  points?: number; // For students: XP points
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export interface LessonItem {
  id: string;
  day: DayOfWeek;
  lessonNumber: number; // 1 to 7
  time: string; // e.g., "08:30 - 09:15"
  subject: string; // e.g. "Қазақ тілі мен әдебиеті"
  teacher: string; // e.g. "Айнұр Маратқызы"
  room: string; // e.g. "№304 каб."
  color?: string; // Theme color badge
  notes?: string; // e.g. "Дәптер мен сөздік алып келу"
}

export interface AchievementItem {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  title: string;
  category: 'olympiad' | 'sport' | 'art' | 'science' | 'discipline' | 'reading';
  categoryLabel: string;
  description: string;
  date: string;
  points: number;
  badgeIcon: string;
  medalType?: 'gold' | 'silver' | 'bronze' | 'special';
  teacherName: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar?: string;
  channel: 'general' | 'qa' | 'parent-teacher';
  recipientId?: string; // For direct parent-teacher or 1-on-1
  recipientName?: string;
  content: string;
  timestamp: string;
  attachmentUrl?: string;
  attachmentName?: string;
}

export interface HomeworkItem {
  id: string;
  subject: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  teacherName: string;
  teacherId: string;
  attachments?: { name: string; url: string }[];
  submissions: {
    studentId: string;
    studentName: string;
    submittedDate: string;
    content: string;
    fileUrl?: string;
    fileName?: string;
    grade?: number; // e.g., 1-10 or 100
    feedback?: string;
    status: 'submitted' | 'graded';
  }[];
}

export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  authorRole: UserRole;
  targetAudience: 'all' | 'students' | 'parents';
  important?: boolean;
  category: string;
}

export interface ParentConsultation {
  id: string;
  parentId: string;
  parentName: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  topic: string;
  requestedDate: string;
  timeSlot: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  notes?: string;
}

export interface StudentAttendanceAndGrade {
  studentId: string;
  studentName: string;
  avatar: string;
  attendanceRate: number; // e.g., 96%
  averageGrade: number; // e.g. 4.8 / 5.0 or 92/100
  subjects: {
    name: string;
    grade: number;
    faGrade: string; // Формативті бағалау: e.g. 9/10
    attendance: 'қатысты' | 'кешікті' | 'себепті' | 'себепсіз';
    teacherNote?: string;
  }[];
  recentTeacherNotes: {
    date: string;
    teacher: string;
    subject: string;
    note: string;
    type: 'praise' | 'notice' | 'recommendation';
  }[];
}

export interface BreakExercise {
  id: string;
  title: string;
  category: 'eye' | 'stretch' | 'brain' | 'breathing';
  durationSeconds: number;
  description: string;
  steps: string[];
  icon: string;
  bgGradient: string;
  benefits: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}
