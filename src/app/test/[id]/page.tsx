'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Send,
  RotateCcw,
  LayoutGrid,
  AlertTriangle,
  X,
  Volume2,
  Maximize2,
  FileText,
  ShieldCheck,
  Globe,
  Award,
  BookOpen,
  ArrowRight,
  Info,
  Check,
  User,
  HelpCircle,
  Eye,
  Star,
  Pause,
  Menu,
  Languages,
  BookA
} from 'lucide-react';

interface QuestionItem {
  id: string;
  question_text: string;
  question_text_bn?: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_a_bn?: string;
  option_b_bn?: string;
  option_c_bn?: string;
  option_d_bn?: string;
  correct_answer: string;
  subject_name?: string;
  marks?: number;
  negative_marks?: number;
  section_name?: string;
}

export default function TestEnginePage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;

  const [mock, setMock] = useState<any>(null);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [visitedQuestions, setVisitedQuestions] = useState<Record<string, boolean>>({ '0': true });
  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>({});
  const [timeLeftSecs, setTimeLeftSecs] = useState<number>(120 * 60);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showPalette, setShowPalette] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState<boolean>(false);
  const [showPaperModal, setShowPaperModal] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [loading, setLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('');

  // Pre-Test Declaration
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [declarationAgreed, setDeclarationAgreed] = useState<boolean>(false);
  const [selectedDefaultLang, setSelectedDefaultLang] = useState<'en' | 'bn'>('en');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const qStartTimeRef = useRef<number>(Date.now());
  const storageKey = `wb_test_state_${testId}`;

  // 1. Fetch Mock & Questions
  useEffect(() => {
    fetch(`/api/mocks/${testId}`)
      .then(res => res.json())
      .then(data => {
        if (data?.mock) {
          const m = data.mock;
          setMock(m);
          const qs = m.questions || [];
          setQuestions(qs);

          if (qs.length > 0) {
            setActiveSection(qs[0].section_name || 'General Studies');
          }

          const saved = localStorage.getItem(storageKey);
          if (saved) {
            try {
              const parsed = JSON.parse(saved);
              setUserAnswers(parsed.answers || {});
              setMarkedForReview(parsed.marked || {});
              setVisitedQuestions(parsed.visited || { '0': true });
              setTimeLeftSecs(parsed.timeLeft || (m.duration_mins * 60));
              setCurrentIndex(parsed.index || 0);
              if (parsed.language) setLanguage(parsed.language);
              setHasStarted(true);
            } catch (e) {
              console.error('Failed to parse saved test state', e);
            }
          } else {
            setTimeLeftSecs(m.duration_mins * 60);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading test:', err);
        setLoading(false);
      });
  }, [testId, storageKey]);

  // 2. Countdown Timer
  useEffect(() => {
    if (loading || !mock || !hasStarted || isPaused) return;

    timerRef.current = setInterval(() => {
      setTimeLeftSecs(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAutoSubmit();
          return 0;
        }

        if (prev % 5 === 0) {
          localStorage.setItem(storageKey, JSON.stringify({
            answers: userAnswers,
            marked: markedForReview,
            visited: visitedQuestions,
            timeLeft: prev - 1,
            index: currentIndex,
            language: language
          }));
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading, mock, hasStarted, isPaused, userAnswers, markedForReview, visitedQuestions, currentIndex, language, storageKey]);

  // 3. Track question time spent
  useEffect(() => {
    if (!hasStarted) return;
    const now = Date.now();
    const elapsed = Math.round((now - qStartTimeRef.current) / 1000);
    const prevQ = questions[currentIndex];
    if (prevQ) {
      setQuestionTimes(prev => ({
        ...prev,
        [prevQ.id]: (prev[prevQ.id] || 0) + elapsed
      }));
    }
    qStartTimeRef.current = now;
    setVisitedQuestions(prev => ({ ...prev, [currentIndex.toString()]: true }));

    if (questions[currentIndex]?.section_name) {
      setActiveSection(questions[currentIndex].section_name || '');
    }
  }, [currentIndex, questions, hasStarted]);

  // Distinct Sections List
  const sectionsList = useMemo(() => {
    const set = new Set<string>();
    questions.forEach(q => {
      if (q.section_name) set.add(q.section_name);
    });
    return Array.from(set);
  }, [questions]);

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQuestion) return;
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: optionKey }));
  };

  const handleClearSelection = () => {
    if (!currentQuestion) return;
    setUserAnswers(prev => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  };

  const handleMarkReviewAndNext = () => {
    if (!currentQuestion) return;
    setMarkedForReview(prev => ({
      ...prev,
      [currentQuestion.id]: true
    }));
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
    setShowPalette(false);
  };

  const handleSectionTabClick = (secName: string) => {
    const targetIdx = questions.findIndex(q => q.section_name === secName);
    if (targetIdx !== -1) {
      setCurrentIndex(targetIdx);
      setActiveSection(secName);
    }
  };

  const handleAutoSubmit = () => {
    handleSubmitConfirmed();
  };

  const handleSubmitConfirmed = async () => {
    setSubmitting(true);
    const answersPayload = questions.map(q => ({
      question_id: q.id,
      selected_option: userAnswers[q.id] || null,
      is_marked_for_review: markedForReview[q.id] ? 1 : 0,
      time_spent_secs: questionTimes[q.id] || 25,
    }));

    const totalDurationSecs = (mock?.duration_mins || 120) * 60;
    const timeSpent = Math.max(10, totalDurationSecs - timeLeftSecs);

    try {
      const res = await fetch('/api/test-attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mock_id: mock.id,
          user_id: 'usr-1',
          time_spent_secs: timeSpent,
          answers: answersPayload
        })
      });

      const data = await res.json();
      if (data?.attempt?.id) {
        localStorage.removeItem(storageKey);
        router.push(`/test/${testId}/result?attemptId=${data.attempt.id}`);
      } else {
        router.push(`/test/${testId}/result`);
      }
    } catch (err) {
      console.error('Submission error:', err);
      router.push(`/test/${testId}/result`);
    }
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getQuestionState = (idx: number, qId: string) => {
    const isAnswered = !!userAnswers[qId];
    const isMarked = !!markedForReview[qId];
    const isVisited = !!visitedQuestions[idx.toString()];

    if (isAnswered && isMarked) return 'answered-marked';
    if (isMarked) return 'marked';
    if (isAnswered) return 'answered';
    if (isVisited) return 'not-answered';
    return 'not-visited';
  };

  // Status Counts
  const answeredCount = Object.keys(userAnswers).length;
  const markedCount = Object.values(markedForReview).filter(Boolean).length;
  const visitedCount = Object.keys(visitedQuestions).length;
  const notAnsweredCount = Math.max(0, visitedCount - answeredCount);
  const notVisitedCount = Math.max(0, questions.length - visitedCount);

  if (loading) {
    return (
      <div className="h-[100dvh] bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#2563EB] animate-spin flex items-center justify-center text-white font-black text-xl shadow-lg">
          WB
        </div>
        <p className="text-slate-600 font-bold text-sm tracking-wide animate-pulse">
          Loading WB Decoded Examination Engine...
        </p>
      </div>
    );
  }

  if (!mock || questions.length === 0) {
    return (
      <div className="h-[100dvh] bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-xl font-black text-slate-900">Question Paper Not Found</h2>
        <Link href="/exams" className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow-md">
          Return to Test Hub
        </Link>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: PRE-TEST INSTRUCTIONS (Single-Window Fixed Screen)
  // =========================================================================
  if (!hasStarted) {
    return (
      <div className="h-[100dvh] max-h-[100dvh] bg-[#F8FAFC] flex flex-col justify-between select-none overflow-hidden font-sans">
        
        {/* Fixed Top Dark Header */}
        <header 
          className="shrink-0 bg-[#121820] text-white px-4 sm:px-6 py-3 shadow-md flex items-center justify-between z-30"
          style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)' }}
        >
          <div className="flex items-center space-x-3 truncate">
            <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white font-black flex items-center justify-center text-xs shrink-0">
              WB
            </div>
            <div className="truncate">
              <h1 className="font-extrabold text-xs sm:text-sm text-white leading-tight truncate max-w-xs sm:max-w-md">
                {mock.title}
              </h1>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                Official Examination Test Series • CBT Mode
              </span>
            </div>
          </div>

          <Link href="/exams" className="text-xs text-slate-400 hover:text-white font-bold shrink-0">
            Exit &times;
          </Link>
        </header>

        {/* Scrollable Middle Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-w-3xl mx-auto w-full">
          
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#2563EB] rounded-full inline-block"></span>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Examination Overview &amp; Instructions
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Questions</span>
                <span className="text-lg font-black text-slate-900 block">{mock.total_questions} MCQs</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Duration</span>
                <span className="text-lg font-black text-[#2563EB] block">{mock.duration_mins} Mins</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Total Marks</span>
                <span className="text-lg font-black text-emerald-600 block">{mock.total_marks} Marks</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Negative Mark</span>
                <span className="text-lg font-black text-rose-600 block">-{mock.negative_marking || 0.33}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-xs text-slate-700 leading-relaxed border-t border-slate-100">
              <p>• The countdown timer at top left shows your remaining time.</p>
              <p>• Each correct answer carries <strong>+{mock.marks_per_correct || 1.0} Marks</strong>. Each incorrect answer deducts <strong>-{mock.negative_marking || 0.33} Marks</strong>.</p>
              <p>• You can navigate between sections and jump to any question using the palette menu at any time.</p>
              <p>• Answers can be changed or cleared anytime before submitting the test.</p>
            </div>

            {/* Language Selector */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-extrabold text-xs text-slate-900 block">Choose Default Language:</span>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedDefaultLang('en')}
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                    selectedDefaultLang === 'en'
                      ? 'bg-[#121820] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  English {selectedDefaultLang === 'en' && <Check className="w-3.5 h-3.5 text-teal-400" />}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDefaultLang('bn')}
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                    selectedDefaultLang === 'bn'
                      ? 'bg-[#121820] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  বাংলা (Bengali) {selectedDefaultLang === 'bn' && <Check className="w-3.5 h-3.5 text-teal-400" />}
                </button>
              </div>
            </div>

            {/* Declaration Checkbox */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={declarationAgreed}
                  onChange={(e) => setDeclarationAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-xs font-semibold text-slate-900 leading-snug">
                  I have read and understood all the instructions above and agree to abide by the examination rules.
                </span>
              </label>
            </div>

          </div>

        </main>

        {/* Fixed Bottom Action Bar */}
        <footer 
          className="shrink-0 bg-white border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-3 max-w-3xl mx-auto w-full z-30 shadow-lg"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)' }}
        >
          <Link
            href="/exams"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-colors"
          >
            &larr; Back
          </Link>

          <button
            onClick={() => {
              if (!declarationAgreed) return;
              setLanguage(selectedDefaultLang);
              setHasStarted(true);
            }}
            disabled={!declarationAgreed}
            className={`flex-1 sm:flex-initial px-6 sm:px-8 py-3 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
              declarationAgreed
                ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-blue-500/20 active:scale-95 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
            }`}
          >
            <span>I AM READY TO BEGIN (START TEST)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </footer>

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: EXACT WB Decoded CBT MOCK TEST ENGINE (Single Window Fixed View)
  // =========================================================================
  const isCurrentAnswered = !!userAnswers[currentQuestion.id];
  const isCurrentMarked = !!markedForReview[currentQuestion.id];
  const qTimeSpent = questionTimes[currentQuestion.id] || 0;
  const qTimeStr = `${Math.floor(qTimeSpent / 60).toString().padStart(2, '0')}:${(qTimeSpent % 60).toString().padStart(2, '0')}`;

  return (
    <div className="h-[100dvh] max-h-[100dvh] bg-white flex flex-col justify-between select-none overflow-hidden font-sans">
      
      {/* 1. FIXED TOP BLACK HEADER */}
      <header 
        className="shrink-0 bg-[#121820] text-white px-3 sm:px-6 py-2.5 border-b border-slate-800 shadow-md z-30 flex items-center justify-between"
        style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 8px)' }}
      >
        
        {/* Left: Pause Button + Timer + Exam Name */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 truncate">
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume Test' : 'Pause Test'}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/80 flex items-center justify-center text-white hover:bg-white/10 shrink-0 transition-colors"
          >
            <Pause className="w-3.5 h-3.5 fill-white text-white" />
          </button>

          <div className="truncate">
            <div className="font-mono text-sm sm:text-base font-black text-white leading-none flex items-center gap-1.5">
              <span>{formatTime(timeLeftSecs)}</span>
              {isPaused && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-sans font-extrabold uppercase">
                  Paused
                </span>
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate block max-w-[140px] sm:max-w-md mt-0.5">
              {mock?.title}
            </span>
          </div>
        </div>

        {/* Right: Language Icon + Palette Hamburger Menu + Submit */}
        <div className="flex items-center space-x-2">
          
          {/* E / অ Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
            title="Toggle Language"
          >
            <span className="text-[11px] font-black">{language === 'en' ? 'E/অ' : 'অ/E'}</span>
          </button>

          {/* Question Palette Menu Toggle Button */}
          <button
            onClick={() => setShowPalette(!showPalette)}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            title="Question Palette"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Submit Test Button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs shadow-xs transition-colors"
          >
            Submit
          </button>

        </div>
      </header>

      {/* 2. FIXED SECTION HORIZONTAL TAB BAR */}
      {sectionsList.length > 1 && (
        <div className="shrink-0 bg-[#1A222D] text-slate-300 px-3 py-1.5 border-b border-slate-800 flex items-center space-x-2 overflow-x-auto scrollbar-none z-20">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            SECTIONS:
          </span>
          {sectionsList.map((secName) => {
            const isActive = activeSection === secName;
            const secQs = questions.filter(q => q.section_name === secName);
            const secAnsCount = secQs.filter(q => !!userAnswers[q.id]).length;

            return (
              <button
                key={secName}
                onClick={() => handleSectionTabClick(secName)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span>{secName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  isActive ? 'bg-white text-[#2563EB]' : 'bg-slate-700 text-slate-300'
                }`}>
                  {secAnsCount}/{secQs.length}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 3. MIDDLE SCROLLABLE QUESTION & OPTIONS AREA */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 w-full max-w-4xl mx-auto space-y-4">
        
        {/* Top Question Meta Strip */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
          <div className="flex items-center space-x-2.5">
            <span className="font-black text-sm text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
              Q. {currentIndex + 1} <span className="text-slate-400 font-normal">/ {questions.length}</span>
            </span>

            {/* Time spent */}
            <div className="flex items-center space-x-1 text-slate-500 font-medium text-xs px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{qTimeStr}</span>
            </div>

            {/* Marks */}
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-xs">
              +{currentQuestion.marks || mock?.marks_per_correct || 1.0}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold text-xs">
              -{currentQuestion.negative_marks || mock?.negative_marking || 0.33}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-slate-400">
            <button
              onClick={handleMarkReviewAndNext}
              title="Bookmark / Mark for review"
              className={`p-1 rounded transition-colors ${isCurrentMarked ? 'text-purple-600 bg-purple-50' : 'hover:text-purple-600'}`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Statement */}
        <div className="py-1">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
            {(language === 'bn' && currentQuestion.question_text_bn) ? (
              <span className="font-bengali">{currentQuestion.question_text_bn}</span>
            ) : (
              <span>{currentQuestion.question_text}</span>
            )}
          </h3>
        </div>

        {/* 4 MCQ Option Choices */}
        <div className="space-y-2.5 pt-1">
          {(['A', 'B', 'C', 'D'] as const).map((optKey, idx) => {
            const optTextEn = currentQuestion[`option_${optKey.toLowerCase()}` as keyof QuestionItem] as string;
            const optTextBn = currentQuestion[`option_${optKey.toLowerCase()}_bn` as keyof QuestionItem] as string;
            const optText = (language === 'bn' && optTextBn) ? optTextBn : optTextEn;
            const isSelected = userAnswers[currentQuestion.id] === optKey;

            if (!optText) return null;

            return (
              <button
                key={optKey}
                onClick={() => handleSelectOption(optKey)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'border-[#2563EB] bg-[#EFF6FF] text-[#1E3A8A] font-bold shadow-xs ring-1 ring-[#2563EB]'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-slate-400">
                    {optKey}.
                  </span>
                  <span className={language === 'bn' ? 'font-bengali' : ''}>
                    {optText}
                  </span>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

      </main>

      {/* 4. FIXED BOTTOM ACTION TOOLBAR (Always visible on mobile phone screen) */}
      <footer 
        className="shrink-0 bg-white border-t border-slate-200 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 z-30 shadow-lg"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 10px)' }}
      >
        <div className="flex items-center space-x-2">
          {/* Mark & Next */}
          <button
            onClick={handleMarkReviewAndNext}
            className="px-3 sm:px-4 py-2 rounded-xl border border-slate-800 text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow-2xs"
          >
            Mark &amp; Next
          </button>

          {/* Clear Button */}
          <button
            onClick={handleClearSelection}
            disabled={!isCurrentAnswered}
            className="px-3 sm:px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 disabled:opacity-30 transition-colors"
          >
            Clear
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 disabled:opacity-30 transition-colors"
          >
            Previous
          </button>

          {/* Save & Next (Solid Blue Button) */}
          <button
            onClick={handleNext}
            className="px-5 sm:px-8 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs shadow-md transition-all active:scale-95"
          >
            {currentIndex === questions.length - 1 ? 'Save & Finish' : 'Save & Next \u2192'}
          </button>
        </div>
      </footer>

      {/* Slide-out Question Palette Modal */}
      {showPalette && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in">
          <div className="bg-white w-full max-w-sm h-full flex flex-col justify-between shadow-2xl p-5 overflow-y-auto animate-in slide-in-from-right duration-200">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-black text-sm text-slate-900">Question Palette</h4>
                <button
                  onClick={() => setShowPalette(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span>Not Answered ({notAnsweredCount})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                  <span>Marked Review ({markedCount})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                  <span>Not Visited ({notVisitedCount})</span>
                </div>
              </div>

              {/* Question Number Badges Grid */}
              <div className="grid grid-cols-5 gap-2 max-h-[50vh] overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const state = getQuestionState(idx, q.id);
                  const isCurrent = idx === currentIndex;

                  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
                  if (state === 'answered') badgeStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                  else if (state === 'not-answered') badgeStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                  else if (state === 'marked' || state === 'answered-marked') badgeStyle = 'bg-purple-600 text-white border-purple-700 font-bold';

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpToQuestion(idx)}
                      className={`h-9 rounded-xl text-xs font-bold border transition-all flex items-center justify-center ${badgeStyle} ${
                        isCurrent ? 'ring-2 ring-[#2563EB] ring-offset-2' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setShowPalette(false);
                  setShowSubmitModal(true);
                }}
                className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs shadow-md transition-all text-center"
              >
                Submit Test Session
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <h3 className="font-black text-base text-slate-900">Are you sure you want to submit?</h3>

            <div className="grid grid-cols-2 gap-2.5 text-center text-xs font-bold bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Total Questions</span>
                <span className="text-slate-900 text-sm font-black">{questions.length}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Answered</span>
                <span className="text-emerald-600 text-sm font-black">{answeredCount}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Marked for Review</span>
                <span className="text-purple-600 text-sm font-black">{markedCount}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase block">Unattempted</span>
                <span className="text-rose-600 text-sm font-black">{questions.length - answeredCount}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                disabled={submitting}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Resume Test
              </button>

              <button
                onClick={handleSubmitConfirmed}
                disabled={submitting}
                className="px-6 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                {submitting ? 'Submitting...' : 'Yes, Submit Test'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
