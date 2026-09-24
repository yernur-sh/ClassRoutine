'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  UserRole,
  LessonItem,
  AchievementItem,
  ChatMessage,
  HomeworkItem,
  AnnouncementItem,
  ParentConsultation,
  StudentAttendanceAndGrade
} from './types';
import {
  DEMO_USERS,
  INITIAL_SCHEDULE,
  INITIAL_ACHIEVEMENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_HOMEWORK,
  INITIAL_MESSAGES,
  INITIAL_PARENT_CONSULTATIONS,
  STUDENT_PROGRESS_DATA,
  CLASS_STUDENTS
} from './mockData';
import confetti from 'canvas-confetti';

interface AppContextType {
  currentUser: UserProfile | null;
  currentRole: UserRole;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (email: string, password?: string, role?: UserRole) => boolean;
  loginWithGoogle: (role?: UserRole) => void;
  register: (name: string, email: string, password: string, role: UserRole, studentName?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;

  // Schedule
  schedule: LessonItem[];
  addLesson: (lesson: Omit<LessonItem, 'id'>) => void;
  updateLesson: (id: string, lesson: Partial<LessonItem>) => void;
  deleteLesson: (id: string) => void;

  // Achievements
  achievements: AchievementItem[];
  students: typeof CLASS_STUDENTS;
  addAchievement: (achievement: Omit<AchievementItem, 'id' | 'date'>) => void;
  deleteAchievement: (id: string) => void;

  // Messages & Communication
  messages: ChatMessage[];
  sendMessage: (channel: 'general' | 'qa' | 'parent-teacher', content: string, recipientId?: string, recipientName?: string) => void;

  // Homework
  homeworkList: HomeworkItem[];
  addHomework: (hw: Omit<HomeworkItem, 'id' | 'assignedDate' | 'submissions'>) => void;
  submitHomework: (homeworkId: string, content: string, fileUrl?: string, fileName?: string) => void;
  gradeHomework: (homeworkId: string, studentId: string, grade: number, feedback: string) => void;

  // Announcements
  announcements: AnnouncementItem[];
  addAnnouncement: (ann: Omit<AnnouncementItem, 'id' | 'date' | 'author' | 'authorRole'>) => void;

  // Parent Consultations
  consultations: ParentConsultation[];
  bookConsultation: (teacherId: string, teacherName: string, topic: string, requestedDate: string, timeSlot: string) => void;
  updateConsultationStatus: (id: string, status: 'accepted' | 'declined' | 'completed') => void;

  // Student Progress
  studentProgress: StudentAttendanceAndGrade;
  triggerConfetti: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Default user is the Teacher (Айнұр Маратқызы) for richest testing experience, or can easily toggle
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEMO_USERS[0]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const [schedule, setSchedule] = useState<LessonItem[]>(INITIAL_SCHEDULE);
  const [achievements, setAchievements] = useState<AchievementItem[]>(INITIAL_ACHIEVEMENTS);
  const [students, setStudents] = useState(CLASS_STUDENTS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>(INITIAL_HOMEWORK);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const [consultations, setConsultations] = useState<ParentConsultation[]>(INITIAL_PARENT_CONSULTATIONS);
  const [studentProgress, setStudentProgress] = useState<StudentAttendanceAndGrade>(STUDENT_PROGRESS_DATA);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('cr_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));

      const savedSchedule = localStorage.getItem('cr_schedule');
      if (savedSchedule) setSchedule(JSON.parse(savedSchedule));

      const savedAchievements = localStorage.getItem('cr_achievements');
      if (savedAchievements) setAchievements(JSON.parse(savedAchievements));

      const savedMessages = localStorage.getItem('cr_messages');
      if (savedMessages) setMessages(JSON.parse(savedMessages));

      const savedHomework = localStorage.getItem('cr_homework');
      if (savedHomework) setHomeworkList(JSON.parse(savedHomework));

      const savedAnnouncements = localStorage.getItem('cr_announcements');
      if (savedAnnouncements) setAnnouncements(JSON.parse(savedAnnouncements));

      const savedConsultations = localStorage.getItem('cr_consultations');
      if (savedConsultations) setConsultations(JSON.parse(savedConsultations));
    } catch (e) {
      console.error('LocalStorage load error', e);
    }
  }, []);

  // Save changes to LocalStorage
  const saveToStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('LocalStorage save error', e);
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email: string, password?: string, role?: UserRole): boolean => {
    // Check if matching demo user
    let user = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      const selectedRole = role || 'student';
      user = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
        role: selectedRole,
        classId: '7-A',
        avatar: selectedRole === 'teacher'
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
          : selectedRole === 'parent'
            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
      };
    }
    setCurrentUser(user);
    saveToStorage('cr_user', user);
    closeAuthModal();
    return true;
  };

  const loginWithGoogle = (role: UserRole = 'student') => {
    // Google login representation
    const googleUser: UserProfile = {
      id: `google-user-${Date.now()}`,
      name: role === 'teacher' ? 'Меруерт Қайратқызы' : role === 'parent' ? 'Ерлан Сапарұлы' : 'Алихан Серіков',
      email: `${role}.demo@gmail.com`,
      role: role,
      avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
      classId: '7-A',
      studentName: role === 'parent' ? 'Арман Сейітов' : undefined,
    };
    setCurrentUser(googleUser);
    saveToStorage('cr_user', googleUser);
    closeAuthModal();
    triggerConfetti();
  };

  const register = (name: string, email: string, password: string, role: UserRole, studentName?: string) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      classId: '7-A',
      studentName: role === 'parent' ? (studentName || 'Арман Сейітов') : undefined,
      avatar: role === 'teacher'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
        : role === 'parent'
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
    };
    setCurrentUser(newUser);
    saveToStorage('cr_user', newUser);
    closeAuthModal();
    triggerConfetti();
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('cr_user');
  };

  const switchRole = (role: UserRole) => {
    const matched = DEMO_USERS.find(u => u.role === role);
    if (matched) {
      setCurrentUser(matched);
      saveToStorage('cr_user', matched);
    } else {
      const fallbackUser: UserProfile = {
        id: `role-user-${role}`,
        name: role === 'teacher' ? 'Айнұр Маратқызы' : role === 'parent' ? 'Сейіт Қасымұлы' : 'Арман Сейітов',
        email: `${role}@school.kz`,
        role: role,
        classId: '7-A',
        studentName: role === 'parent' ? 'Арман Сейітов' : undefined,
      };
      setCurrentUser(fallbackUser);
      saveToStorage('cr_user', fallbackUser);
    }
  };

  // Schedule operations
  const addLesson = (lesson: Omit<LessonItem, 'id'>) => {
    const newLesson: LessonItem = {
      ...lesson,
      id: `lesson-${Date.now()}`
    };
    const updated = [...schedule, newLesson];
    setSchedule(updated);
    saveToStorage('cr_schedule', updated);
  };

  const updateLesson = (id: string, updatedFields: Partial<LessonItem>) => {
    const updated = schedule.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    setSchedule(updated);
    saveToStorage('cr_schedule', updated);
  };

  const deleteLesson = (id: string) => {
    const updated = schedule.filter(item => item.id !== id);
    setSchedule(updated);
    saveToStorage('cr_schedule', updated);
  };

  // Achievement operations
  const addAchievement = (achievementData: Omit<AchievementItem, 'id' | 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newAch: AchievementItem = {
      ...achievementData,
      id: `ach-${Date.now()}`,
      date: today,
    };
    const updatedAchievements = [newAch, ...achievements];
    setAchievements(updatedAchievements);
    saveToStorage('cr_achievements', updatedAchievements);

    // Update student points in student list
    const updatedStudents = students.map(s => {
      if (s.id === achievementData.studentId) {
        return {
          ...s,
          points: s.points + achievementData.points,
          achievementsCount: s.achievementsCount + 1,
        };
      }
      return s;
    });
    setStudents(updatedStudents);

    // If current student is the one, update their points too
    if (currentUser && currentUser.id === achievementData.studentId) {
      const updatedUser = {
        ...currentUser,
        points: (currentUser.points || 0) + achievementData.points
      };
      setCurrentUser(updatedUser);
      saveToStorage('cr_user', updatedUser);
    }

    triggerConfetti();
  };

  const deleteAchievement = (id: string) => {
    const updated = achievements.filter(a => a.id !== id);
    setAchievements(updated);
    saveToStorage('cr_achievements', updated);
  };

  // Communication & Chat
  const sendMessage = (channel: 'general' | 'qa' | 'parent-teacher', content: string, recipientId?: string, recipientName?: string) => {
    if (!currentUser) return;
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      senderAvatar: currentUser.avatar,
      channel,
      recipientId,
      recipientName,
      content,
      timestamp: timeStr,
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    saveToStorage('cr_messages', updated);
  };

  // Homework operations
  const addHomework = (hwData: Omit<HomeworkItem, 'id' | 'assignedDate' | 'submissions'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newHw: HomeworkItem = {
      ...hwData,
      id: `hw-${Date.now()}`,
      assignedDate: today,
      submissions: [],
    };
    const updated = [newHw, ...homeworkList];
    setHomeworkList(updated);
    saveToStorage('cr_homework', updated);
  };

  const submitHomework = (homeworkId: string, content: string, fileUrl?: string, fileName?: string) => {
    if (!currentUser) return;
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const updated = homeworkList.map(hw => {
      if (hw.id === homeworkId) {
        // Replace or add submission
        const existingWithoutCurrent = hw.submissions.filter(s => s.studentId !== currentUser.id);
        const newSubmission = {
          studentId: currentUser.id,
          studentName: currentUser.name,
          submittedDate: timeStr,
          content,
          fileUrl,
          fileName,
          status: 'submitted' as const,
        };
        return {
          ...hw,
          submissions: [newSubmission, ...existingWithoutCurrent]
        };
      }
      return hw;
    });

    setHomeworkList(updated);
    saveToStorage('cr_homework', updated);
    triggerConfetti();
  };

  const gradeHomework = (homeworkId: string, studentId: string, grade: number, feedback: string) => {
    const updated = homeworkList.map(hw => {
      if (hw.id === homeworkId) {
        const updatedSubmissions = hw.submissions.map(sub => {
          if (sub.studentId === studentId) {
            return {
              ...sub,
              grade,
              feedback,
              status: 'graded' as const,
            };
          }
          return sub;
        });
        return {
          ...hw,
          submissions: updatedSubmissions
        };
      }
      return hw;
    });

    setHomeworkList(updated);
    saveToStorage('cr_homework', updated);
  };

  // Announcements
  const addAnnouncement = (annData: Omit<AnnouncementItem, 'id' | 'date' | 'author' | 'authorRole'>) => {
    if (!currentUser) return;
    const today = new Date().toISOString().split('T')[0];
    const newAnn: AnnouncementItem = {
      ...annData,
      id: `ann-${Date.now()}`,
      date: today,
      author: currentUser.name,
      authorRole: currentUser.role,
    };
    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    saveToStorage('cr_announcements', updated);
  };

  // Consultations
  const bookConsultation = (teacherId: string, teacherName: string, topic: string, requestedDate: string, timeSlot: string) => {
    if (!currentUser) return;
    const newCons: ParentConsultation = {
      id: `cons-${Date.now()}`,
      parentId: currentUser.id,
      parentName: currentUser.name,
      studentName: currentUser.studentName || 'Арман Сейітов',
      teacherId,
      teacherName,
      topic,
      requestedDate,
      timeSlot,
      status: 'pending',
    };
    const updated = [newCons, ...consultations];
    setConsultations(updated);
    saveToStorage('cr_consultations', updated);
  };

  const updateConsultationStatus = (id: string, status: 'accepted' | 'declined' | 'completed') => {
    const updated = consultations.map(c => c.id === id ? { ...c, status } : c);
    setConsultations(updated);
    saveToStorage('cr_consultations', updated);
  };

  const currentRole = currentUser?.role || 'student';

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        loginWithGoogle,
        register,
        logout,
        switchRole,
        schedule,
        addLesson,
        updateLesson,
        deleteLesson,
        achievements,
        students,
        addAchievement,
        deleteAchievement,
        messages,
        sendMessage,
        homeworkList,
        addHomework,
        submitHomework,
        gradeHomework,
        announcements,
        addAnnouncement,
        consultations,
        bookConsultation,
        updateConsultationStatus,
        studentProgress,
        triggerConfetti,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
