'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { HomeworkItem } from '@/lib/types';
import { X, BookOpen, Calendar, FileText, Send, CheckCircle2, Paperclip, Star } from 'lucide-react';

interface HomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'submit' | 'grade';
  homework?: HomeworkItem | null;
  studentSubmission?: { studentId: string; studentName: string; content: string } | null;
}

export default function HomeworkModal({
  isOpen,
  onClose,
  mode,
  homework,
  studentSubmission
}: HomeworkModalProps) {
  const { addHomework, submitHomework, gradeHomework, currentUser } = useApp();

  // Create mode state
  const [subject, setSubject] = useState('Алгебра');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Submit mode state
  const [submissionContent, setSubmissionContent] = useState('');
  const [fileName, setFileName] = useState('');

  // Grade mode state
  const [grade, setGrade] = useState<number>(10);
  const [feedback, setFeedback] = useState('Өте жақсы орындалған!');

  if (!isOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !dueDate) return;

    addHomework({
      subject,
      title,
      description,
      dueDate,
      teacherName: currentUser?.name || 'Айнұр Маратқызы',
      teacherId: currentUser?.id || 'teacher-1',
    });

    onClose();
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homework || !submissionContent.trim()) return;

    submitHomework(
      homework.id,
      submissionContent,
      fileName ? '#' : undefined,
      fileName || undefined
    );

    onClose();
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homework || !studentSubmission) return;

    gradeHomework(
      homework.id,
      studentSubmission.studentId,
      Number(grade),
      feedback
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-100">
            {mode === 'create' ? 'Мұғалім' : mode === 'submit' ? 'Оқушы' : 'Бағалау'}
          </span>

          <h2 className="text-xl font-bold mt-2">
            {mode === 'create' && 'Жаңа үй тапсырмасын беру'}
            {mode === 'submit' && `Үй тапсырмасын тапсыру: ${homework?.subject}`}
            {mode === 'grade' && `Жұмысты бағалау: ${studentSubmission?.studentName}`}
          </h2>
        </div>

        {/* Create Homework Form */}
        {mode === 'create' && (
          <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Пән:</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
              >
                <option value="Алгебра">Алгебра</option>
                <option value="Геометрия">Геометрия</option>
                <option value="Қазақ тілі мен әдебиеті">Қазақ тілі мен әдебиеті</option>
                <option value="Физика">Физика</option>
                <option value="Информатика">Информатика</option>
                <option value="Ағылшын тілі">Ағылшын тілі</option>
                <option value="Қазақстан тарихы">Қазақстан тарихы</option>
                <option value="Биология">Биология</option>
                <option value="География">География</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Тапсырма тақырыбы:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Мысалы: §15. Формулаларды қолданып есептеу"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Мерзімі (Тапсыру уақыты):</label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Тапсырма нұсқаулығы:</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Есептер нөмірлері, орындалу талаптары мен ережелерін жазыңыз..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Бас тарту
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition"
              >
                Тапсырманы жариялау
              </button>
            </div>
          </form>
        )}

        {/* Student Submit Form */}
        {mode === 'submit' && homework && (
          <form onSubmit={handleStudentSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-blue-900">
              <div className="font-bold text-sm mb-1">{homework.title}</div>
              <p className="text-blue-800 leading-relaxed">{homework.description}</p>
              <div className="mt-2 text-[11px] text-blue-600 font-semibold">
                Мерзімі: {homework.dueDate} дейін
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Жауабыңызды немесе шығару жолын жазыңыз:</label>
              <textarea
                required
                rows={5}
                value={submissionContent}
                onChange={(e) => setSubmissionContent(e.target.value)}
                placeholder="Мысалы: Барлық 5 есепті дәптерге орындадым. Шыққан жауаптары: 1) x = 4, 2) y = 12..."
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Файл немесе фото тіркеу (Қосымша):</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Үй_жұмысы_дәптер_беті.jpg"
                  className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setFileName('Үй_тапсырмасы_7А_Сейітов.pdf')}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Үлгі файл
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Бас тарту
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Тапсыруды жіберу</span>
              </button>
            </div>
          </form>
        )}

        {/* Teacher Grade Form */}
        {mode === 'grade' && studentSubmission && (
          <form onSubmit={handleGradeSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div className="font-bold text-slate-900 mb-1">Оқушының жауабы:</div>
              <p className="text-slate-700 italic">«{studentSubmission.content}»</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Формативті балл (1 - 10 балл):</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value))}
                  className="flex-1 accent-blue-600"
                />
                <span className="w-12 h-10 rounded-xl bg-blue-100 text-blue-900 font-extrabold text-lg flex items-center justify-center">
                  {grade}/10
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Мұғалімнің кері байланысы (Пікірі):</label>
              <textarea
                required
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Жарайсың! Есеп толық әрі дұрыс шығарылған..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Бас тарту
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Бағаны сақтау</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
