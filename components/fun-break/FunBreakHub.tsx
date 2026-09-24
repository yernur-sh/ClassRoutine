'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/lib/store';
import { FUN_BREAK_EXERCISES, FUN_QUIZ_QUESTIONS } from '@/lib/mockData';
import {
  Smile,
  Eye,
  Activity,
  Brain,
  Wind,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  CheckCircle2,
  XCircle,
  Flame,
  ArrowRight,
  Clock,
  Heart
} from 'lucide-react';

export default function FunBreakHub() {
  const { triggerConfetti } = useApp();

  const [activeTab, setActiveTab] = useState<'eye' | 'stretch' | 'quiz' | 'math' | 'timer'>('eye');

  // Recess Timer State
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Eye Exercise Animation State
  const [isEyeAnimating, setIsEyeAnimating] = useState(false);
  const [eyeStep, setEyeStep] = useState(0);
  const [eyeSecondsLeft, setEyeSecondsLeft] = useState(60);

  // Stretch Exercise Active Routine State
  const [selectedExercise, setSelectedExercise] = useState(FUN_BREAK_EXERCISES[0]);
  const [exerciseTimer, setExerciseTimer] = useState(60);
  const [isExerciseRunning, setIsExerciseRunning] = useState(false);

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Speed Math Game State
  const [mathState, setMathState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [mathTimeLeft, setMathTimeLeft] = useState(45);
  const [mathProblem, setMathProblem] = useState({ num1: 5, num2: 7, op: '+', answer: 12 });
  const [mathScore, setMathScore] = useState(0);
  const [mathStreak, setMathStreak] = useState(0);
  const [mathUserAnswer, setMathUserAnswer] = useState('');

  // Web Audio Chime Synthesizer
  const playSoundEffect = (type: 'bell' | 'correct' | 'wrong' | 'tick') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'bell') {
        // Melodic school chime
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.18);
          gain.gain.setValueAtTime(0.3, ctx.currentTime + idx * 0.18);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.18 + 0.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.18);
          osc.stop(ctx.currentTime + idx * 0.18 + 0.9);
        });
      } else if (type === 'correct') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'wrong') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      // AudioContext unavailable
    }
  };

  // Recess Timer countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      playSoundEffect('bell');
      triggerConfetti();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Eye Exercise Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isEyeAnimating && eyeSecondsLeft > 0) {
      interval = setInterval(() => {
        setEyeSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsEyeAnimating(false);
            playSoundEffect('bell');
            triggerConfetti();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isEyeAnimating, eyeSecondsLeft]);

  // Stretch Exercise Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isExerciseRunning && exerciseTimer > 0) {
      interval = setInterval(() => {
        setExerciseTimer((prev) => {
          if (prev <= 1) {
            setIsExerciseRunning(false);
            playSoundEffect('bell');
            triggerConfetti();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExerciseRunning, exerciseTimer]);

  // Math game timer
  useEffect(() => {
    let interval: any = null;
    if (mathState === 'playing' && mathTimeLeft > 0) {
      interval = setInterval(() => {
        setMathTimeLeft((prev) => {
          if (prev <= 1) {
            setMathState('gameover');
            playSoundEffect('bell');
            triggerConfetti();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mathState, mathTimeLeft]);

  // Format seconds to MM:SS
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Math Game: Generate Next Problem
  const generateMathProblem = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let n1 = Math.floor(Math.random() * 20) + 1;
    let n2 = Math.floor(Math.random() * 20) + 1;
    let ans = n1 + n2;

    if (op === '-') {
      if (n1 < n2) [n1, n2] = [n2, n1];
      ans = n1 - n2;
    } else if (op === '*') {
      n1 = Math.floor(Math.random() * 12) + 2;
      n2 = Math.floor(Math.random() * 9) + 2;
      ans = n1 * n2;
    }

    setMathProblem({ num1: n1, num2: n2, op, answer: ans });
    setMathUserAnswer('');
  };

  const handleStartMathGame = () => {
    setMathScore(0);
    setMathStreak(0);
    setMathTimeLeft(45);
    setMathState('playing');
    generateMathProblem();
  };

  const handleMathAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mathUserAnswer) return;

    if (parseInt(mathUserAnswer, 10) === mathProblem.answer) {
      playSoundEffect('correct');
      setMathScore((prev) => prev + 10 + mathStreak * 2);
      setMathStreak((prev) => prev + 1);
      generateMathProblem();
    } else {
      playSoundEffect('wrong');
      setMathStreak(0);
      setMathUserAnswer('');
    }
  };

  // Quiz handler
  const handleQuizAnswer = (optionIndex: number) => {
    if (selectedQuizOption !== null) return;
    setSelectedQuizOption(optionIndex);

    const isCorrect = optionIndex === FUN_QUIZ_QUESTIONS[currentQuizIndex].correctIndex;
    if (isCorrect) {
      playSoundEffect('correct');
      setQuizScore((prev) => prev + 1);
      triggerConfetti();
    } else {
      playSoundEffect('wrong');
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex + 1 < FUN_QUIZ_QUESTIONS.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedQuizOption(null);
    } else {
      setShowQuizResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedQuizOption(null);
    setQuizScore(0);
    setShowQuizResult(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-orange-500/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider text-yellow-100 flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-yellow-200" /> Үзілісті тиімді өткіз
              </span>
              <span className="px-2.5 py-1 bg-white/30 text-white rounded-full text-xs font-bold">
                10-15 минуттық сергіту
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              «Көңілді үзіліс» – Сергіту және ойлау жаттығулары
            </h1>

            <p className="text-white/90 text-sm max-w-2xl font-medium">
              Сабақ арасындағы үзілісте көзді демалту, денені сергіту, логикалық жұмбақтар шешу және мидың белсенділігін арттыруға арналған интерактивті кеңістік.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-white/20">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition text-white"
              title={soundEnabled ? 'Дыбысты өшіру' : 'Дыбысты қосу'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <div className="text-xs">
              <div className="font-bold">Мектеп қоңырауы</div>
              <div className="text-[11px] text-white/80">{soundEnabled ? 'Дыбыс қосулы' : 'Үнсіз режим'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('eye')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'eye' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Eye className="w-4 h-4 text-blue-600" />
          <span>Көз жаттығулары (Қыран көз)</span>
        </button>

        <button
          onClick={() => setActiveTab('stretch')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'stretch' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>Сынып сергіту жаттығулары</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'quiz' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Brain className="w-4 h-4 text-purple-600" />
          <span>Ми сергіту жұмбақтары</span>
        </button>

        <button
          onClick={() => setActiveTab('math')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'math' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Flame className="w-4 h-4 text-orange-600" />
          <span>«Жылдам есептеу» ойыны</span>
        </button>

        <button
          onClick={() => setActiveTab('timer')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'timer' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4 text-rose-600" />
          <span>Үзіліс таймері (10 мин)</span>
        </button>
      </div>

      {/* Main Interactive Tab Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        
        {/* 1. Eye Gymnastics («Қыран көз») */}
        {activeTab === 'eye' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-blue-600" />
                  <span>«Қыран көз» – Көзді демалту және көруді жақсарту</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Партада кітап оқу мен экраннан шаршаған көз бұлшықеттерін босаңсыту
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-2xl border border-blue-200">
                  {formatTime(eyeSecondsLeft)}
                </span>
                <button
                  onClick={() => {
                    if (isEyeAnimating) {
                      setIsEyeAnimating(false);
                    } else {
                      if (eyeSecondsLeft === 0) setEyeSecondsLeft(60);
                      setIsEyeAnimating(true);
                    }
                  }}
                  className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition ${
                    isEyeAnimating
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                  }`}
                >
                  {isEyeAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isEyeAnimating ? 'Тоқтату' : 'Жаттығуды бастау'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Eye Tracking Canvas/Box */}
            <div className="relative w-full h-72 sm:h-80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-6 border-2 border-slate-800 shadow-inner">
              
              {/* Animated Target Dot */}
              {isEyeAnimating ? (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-cyan-400 shadow-[0_0_40px_15px_rgba(6,182,212,0.8)] animate-bounce flex items-center justify-center text-slate-950 font-black text-xs transition-transform duration-1000">
                    👀
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3 z-10 max-w-md">
                  <div className="w-16 h-16 rounded-3xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-3xl mx-auto border border-blue-400/30">
                    👁️
                  </div>
                  <h4 className="text-white font-bold text-base">Көз жаттығуын бастауға дайынсыз ба?</h4>
                  <p className="text-xs text-blue-200">
                    «Бастау» түймесін басқан соң, экрандағы қозғалмалы нүктеге басыңызды бұрмай, тек көзбен қараңыз!
                  </p>
                </div>
              )}

              {/* Progress info at bottom */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-blue-300 border-t border-white/10 pt-3">
                <span>Ұзақтығы: 1 минут</span>
                <span>Қалған уақыт: {eyeSecondsLeft} сек</span>
              </div>
            </div>

            {/* 4 Steps info */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { title: '1. Жоғары-Төмен', desc: 'Көзді баяу жоғары көтеріп, сосын төмен қаратыңыз (5 рет)' },
                { title: '2. Оңға-Солға', desc: 'Басты бұрмай, тек көз жанарын оңға-солға бағыттаңыз' },
                { title: '3. Шеңбер сызу', desc: 'Көзбен сағат тілі бағытында шеңбер жасаңыз' },
                { title: '4. Терезеге қарау', desc: 'Алыстағы затқа 10 сек, кейін саусақ ұшына қараңыз' },
              ].map((step, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs">
                  <div className="font-bold text-blue-900 mb-1">{step.title}</div>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Stretch & Physical Exercises */}
        {activeTab === 'stretch' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-emerald-600" />
                  <span>Сынып сергіту жаттығулары мен созылу</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Қан айналымын жақсартып, дене қарысуын шешетін пайдалы қимылдар
                </p>
              </div>
            </div>

            {/* Exercise Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {FUN_BREAK_EXERCISES.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    setSelectedExercise(ex);
                    setExerciseTimer(ex.durationSeconds);
                    setIsExerciseRunning(false);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedExercise.id === ex.id
                      ? 'border-emerald-500 bg-emerald-50/70 shadow-md ring-2 ring-emerald-400/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="text-2xl mb-2">🧘‍♂️</div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">{ex.title}</h4>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                    ⏱️ {ex.durationSeconds} секунд
                  </div>
                </button>
              ))}
            </div>

            {/* Active Selected Exercise Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-2 border-emerald-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-black text-emerald-950">{selectedExercise.title}</h4>
                  <p className="text-xs text-emerald-800 mt-0.5">{selectedExercise.description}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-emerald-700 bg-white px-4 py-2 rounded-2xl border border-emerald-200 shadow-sm">
                    {formatTime(exerciseTimer)}
                  </span>
                  <button
                    onClick={() => {
                      if (isExerciseRunning) {
                        setIsExerciseRunning(false);
                      } else {
                        if (exerciseTimer === 0) setExerciseTimer(selectedExercise.durationSeconds);
                        setIsExerciseRunning(true);
                      }
                    }}
                    className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition ${
                      isExerciseRunning
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                    }`}
                  >
                    {isExerciseRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isExerciseRunning ? 'Тоқтату' : 'Жаттығуды орындау'}</span>
                  </button>
                </div>
              </div>

              {/* Steps list */}
              <div className="space-y-2 pt-3 border-t border-emerald-200/60">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                  Орындалу қадамдары:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedExercise.steps.map((st, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-emerald-100 text-xs text-slate-700 font-medium">
                      {st}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-emerald-100/60 rounded-xl text-xs text-emerald-900 font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <span><strong>Пайдасы:</strong> {selectedExercise.benefits}</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. Brain Teaser Quiz (Ми сергіту жұмбақтары) */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {!showQuizResult ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                    Сұрақ {currentQuizIndex + 1} / {FUN_QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    Ұпай: <strong className="text-purple-600">{quizScore}</strong>
                  </span>
                </div>

                {/* Question */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 text-center space-y-2">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                    {FUN_QUIZ_QUESTIONS[currentQuizIndex].category}
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-purple-950">
                    {FUN_QUIZ_QUESTIONS[currentQuizIndex].question}
                  </h4>
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {FUN_QUIZ_QUESTIONS[currentQuizIndex].options.map((option, idx) => {
                    const isSelected = selectedQuizOption === idx;
                    const isCorrect = idx === FUN_QUIZ_QUESTIONS[currentQuizIndex].correctIndex;
                    const hasAnswered = selectedQuizOption !== null;

                    let btnStyle = 'border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 bg-white text-slate-800';
                    if (hasAnswered) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={hasAnswered}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {hasAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        {hasAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {selectedQuizOption !== null && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2 animate-fadeIn">
                    <p className="font-medium">{FUN_QUIZ_QUESTIONS[currentQuizIndex].explanation}</p>
                    <button
                      onClick={handleNextQuiz}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition"
                    >
                      {currentQuizIndex + 1 < FUN_QUIZ_QUESTIONS.length ? 'Келесі сұраққа көшу' : 'Нәтижені көру'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz Result screen */
              <div className="text-center py-8 space-y-4">
                <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-4xl mx-auto">
                  🏆
                </div>
                <h3 className="text-2xl font-black text-slate-900">Викторина аяқталды!</h3>
                <p className="text-sm text-slate-600">
                  Сіз <strong>{FUN_QUIZ_QUESTIONS.length}</strong> сұрақтың <strong>{quizScore}</strong> сұрағына дұрыс жауап бердіңіз!
                </p>
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md"
                >
                  Қайтадан ойнау
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. Speed Math Blitz («Жылдам есептеу») */}
        {activeTab === 'math' && (
          <div className="max-w-xl mx-auto space-y-6">
            {mathState === 'idle' && (
              <div className="text-center py-8 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-orange-100 text-orange-600 flex items-center justify-center text-4xl mx-auto">
                  ⚡
                </div>
                <h3 className="text-2xl font-black text-slate-900">«Жылдам есептеу» сайысы</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  45 секунд ішінде мүмкіндігінше көп математикалық есептерді жылдам шығарып, рекорд орнатыңыз!
                </p>
                <button
                  onClick={handleStartMathGame}
                  className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-orange-500/20 transform active:scale-95 transition"
                >
                  Ойынды бастау (45 сек)
                </button>
              </div>
            )}

            {mathState === 'playing' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Қалған уақыт:</span>
                    <span className="text-lg font-black text-rose-600">{mathTimeLeft} сек</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                      🔥 Серия: {mathStreak}
                    </span>
                    <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">
                      Ұпай: {mathScore}
                    </span>
                  </div>
                </div>

                {/* Problem display */}
                <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-2 shadow-xl">
                  <span className="text-xs font-semibold text-amber-400">Есепті шығарыңыз:</span>
                  <div className="text-4xl sm:text-5xl font-black tracking-wider">
                    {mathProblem.num1} {mathProblem.op} {mathProblem.num2} = ?
                  </div>
                </div>

                {/* Answer form */}
                <form onSubmit={handleMathAnswerSubmit} className="flex gap-2">
                  <input
                    type="number"
                    autoFocus
                    required
                    value={mathUserAnswer}
                    onChange={(e) => setMathUserAnswer(e.target.value)}
                    placeholder="Жауабыңыз..."
                    className="flex-1 px-5 py-3 text-lg font-bold bg-slate-50 border-2 border-slate-300 rounded-2xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500 text-center"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-black text-sm rounded-2xl shadow-md transition"
                  >
                    Жауап
                  </button>
                </form>
              </div>
            )}

            {mathState === 'gameover' && (
              <div className="text-center py-8 space-y-4">
                <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-4xl mx-auto">
                  🎉
                </div>
                <h3 className="text-2xl font-black text-slate-900">Уақыт аяқталды!</h3>
                <div className="text-4xl font-black text-orange-600">{mathScore} Ұпай</div>
                <p className="text-xs text-slate-500">Өте жақсы нәтиже! Миыңыз сергіп қалды.</p>
                <button
                  onClick={handleStartMathGame}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md"
                >
                  Қайтадан ойнау
                </button>
              </div>
            )}
          </div>
        )}

        {/* 5. Recess Timer (Үзіліс таймері) */}
        {activeTab === 'timer' && (
          <div className="max-w-md mx-auto text-center space-y-6">
            <h3 className="text-xl font-black text-slate-900">Сынып үзіліс таймері</h3>
            <p className="text-xs text-slate-500">
              Үзіліс біткен кезде мектеп қоңырауы соғылады
            </p>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-rose-50 to-orange-50 border-2 border-rose-200">
              <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                {formatTime(timerSeconds)}
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex justify-center gap-2">
              {[
                { mins: 5, label: '5 мин' },
                { mins: 10, label: '10 мин' },
                { mins: 15, label: '15 мин' },
                { mins: 20, label: '20 мин (Үлкен үзіліс)' },
              ].map((p) => (
                <button
                  key={p.mins}
                  onClick={() => {
                    setTimerSeconds(p.mins * 60);
                    setIsTimerRunning(false);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 text-white shadow-md transition ${
                  isTimerRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? 'Тоқтата тұру' : 'Таймерді бастау'}</span>
              </button>

              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(600);
                }}
                className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                title="Қайта қосу"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
