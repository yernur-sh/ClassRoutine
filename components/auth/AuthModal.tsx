'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Modal } from '@/components/ui';
import { UserRole } from '@/lib/types';
import { GraduationCap, School, Users, Loader2 } from 'lucide-react';

const ROLES: { key: UserRole; label: string; icon: any }[] = [
  { key: 'student', label: 'Оқушы', icon: GraduationCap },
  { key: 'parent', label: 'Ата-ана', icon: Users },
  { key: 'teacher', label: 'Мұғалім', icon: School },
];

export default function AuthModal() {
  const { authModal, closeAuth, login, register, loginWithGoogle, openAuth } = useApp();
  const mode = authModal;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [studentName, setStudentName] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (mode === 'login') await login(email, password);
      else await register(name.trim(), email, password, role, studentName.trim());
    } catch (err: any) {
      const code: string = err?.code || '';
      const map: Record<string, string> = {
        'auth/invalid-credential': 'E-mail немесе құпиясөз қате.',
        'auth/invalid-email': 'E-mail форматы дұрыс емес.',
        'auth/weak-password': 'Құпиясөз кемінде 6 таңба болуы керек.',
        'auth/email-already-in-use': 'Бұл e-mail тіркелген. Кіріңіз.',
        'auth/popup-closed-by-user': 'Терезе жабылды.',
      };
      setError(map[code] || err?.message || 'Қате шықты, қайталап көріңіз.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open={mode !== null}
      onClose={closeAuth}
      title={mode === 'register' ? 'Тіркелу' : 'Кіру'}
      maxWidth="max-w-md"
    >
      <form onSubmit={submit} className="space-y-4">
        {mode === 'register' && (
          <>
            <div>
              <label className="label">Аты-жөні</label>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Арман Сейітов"
                required
              />
            </div>
            <div>
              <label className="label">Рөліңіз</label>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map(({ key, label, icon: Icon }) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setRole(key)}
                    className={`flex flex-col items-center gap-1 rounded-xl border p-2.5 text-xs font-semibold transition ${
                      role === key
                        ? 'border-sky-400 bg-sky-50 text-sky-700 shadow-sm'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
              {role === 'teacher' && (
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Мұғалім құқығы тек мектеп бекіткен e-mail-дарға беріледі.
                </p>
              )}
            </div>
            {role === 'parent' && (
              <div>
                <label className="label">Балаңыздың аты-жөні</label>
                <input
                  className="input"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Арман Сейітов"
                  required
                />
              </div>
            )}
          </>
        )}

        <div>
          <label className="label">E-mail</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            required
          />
        </div>
        <div>
          <label className="label">Құпиясөз</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            minLength={6}
            required
          />
        </div>

        {error && (
          <p className="animate-fade-in rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary w-full" disabled={busy}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === 'register' ? 'Тіркелу' : 'Кіру'}
        </button>

        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-300">
          <span className="h-px flex-1 bg-slate-100" /> НЕМЕСЕ <span className="h-px flex-1 bg-slate-100" />
        </div>

        <button
          type="button"
          onClick={async () => {
            setError('');
            try {
              await loginWithGoogle();
            } catch (err: any) {
              setError(err?.message || 'Google арқылы кіру сәтсіз.');
            }
          }}
          className="btn w-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        >
          Google арқылы кіру
        </button>

        <p className="text-center text-xs text-slate-500">
          {mode === 'register' ? 'Аккаунтыңыз бар ма?' : 'Аккаунтыңыз жоқ па?'}{' '}
          <button
            type="button"
            className="font-bold text-sky-600 hover:underline"
            onClick={() => openAuth(mode === 'register' ? 'login' : 'register')}
          >
            {mode === 'register' ? 'Кіру' : 'Тіркелу'}
          </button>
        </p>
      </form>
    </Modal>
  );
}
