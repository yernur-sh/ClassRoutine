'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  QueryConstraint,
} from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';
import { CLASS_ID, HOMEROOM_TEACHER_EMAIL, TEACHER_EMAILS } from './config';
import type { UserProfile, UserRole } from './types';

function resolveRole(email: string, requested: UserRole): UserRole {
  return TEACHER_EMAILS.includes(email.toLowerCase()) ? 'teacher' : requested;
}

interface AppContextType {
  user: UserProfile | null;
  firebaseUser: User | null;
  loading: boolean;
  isTeacher: boolean;
  isHomeroom: boolean;
  authModal: 'login' | 'register' | null;
  openAuth: (mode?: 'login' | 'register') => void;
  closeAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    studentName?: string
  ) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (!fbUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      const ref = doc(db, 'users', fbUser.uid);
      let snap = await getDoc(ref);
      if (!snap.exists()) {
        const email = (fbUser.email || '').toLowerCase();
        const profile: UserProfile = {
          id: fbUser.uid,
          name: fbUser.displayName || email.split('@')[0],
          email,
          role: resolveRole(email, 'student'),
          classId: CLASS_ID,
          isHomeroom: email === HOMEROOM_TEACHER_EMAIL,
          createdAt: Date.now(),
        };
        await setDoc(ref, profile);
        setUser(profile);
      } else {
        setUser({ id: fbUser.uid, ...(snap.data() as Omit<UserProfile, 'id'>) });
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email.trim(), password);
    setAuthModal(null);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    studentName?: string
  ) => {
    const cleanEmail = email.trim().toLowerCase();
    const cred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
    await updateProfile(cred.user, { displayName: name });
    const profile: UserProfile = {
      id: cred.user.uid,
      name,
      email: cleanEmail,
      role: resolveRole(cleanEmail, role),
      classId: CLASS_ID,
      isHomeroom: cleanEmail === HOMEROOM_TEACHER_EMAIL,
      ...(role === 'parent' && studentName ? { studentName } : {}),
      createdAt: Date.now(),
    };
    await setDoc(doc(db, 'users', cred.user.uid), profile);
    setUser(profile);
    setAuthModal(null);
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    setAuthModal(null);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = useMemo<AppContextType>(
    () => ({
      user,
      firebaseUser,
      loading,
      isTeacher: user?.role === 'teacher',
      isHomeroom: !!user?.isHomeroom,
      authModal,
      openAuth: (mode: 'login' | 'register' = 'login') => setAuthModal(mode),
      closeAuth: () => setAuthModal(null),
      login,
      register,
      loginWithGoogle,
      logout,
    }),
    [user, firebaseUser, loading, authModal]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

/** Firestore коллекциясын нақты уақытта тыңдайтын hook. */
export function useCollection<T extends { id: string }>(
  path: string,
  orderField?: string,
  direction: 'asc' | 'desc' = 'desc'
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const constraints: QueryConstraint[] = orderField
      ? [orderBy(orderField, direction)]
      : [];
    const q = query(collection(db, path), ...constraints);
    const unsub = onSnapshot(
      q,
      (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as T[]);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Firestore error', path, err);
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [path, orderField, direction]);

  return { data, loading, error };
}
