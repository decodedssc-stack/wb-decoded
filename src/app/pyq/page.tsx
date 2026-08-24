'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import StudentSideDrawer from '@/components/layout/StudentSideDrawer';
import {
  Clock,
  BookOpen,
  Award,
  Filter,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Search,
  Sparkles,
  Eye,
  Play,
  Calendar,
  Layers,
  ShieldCheck,
  Zap,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Landmark,
  Shield,
  GraduationCap,
  Building2,
  Check,
  Menu
} from 'lucide-react';
import { getDetailedEnglishAnalysis, getStructuredGSExplanation } from '@/lib/detailedExplanationEngine';

interface WBExam {
  id: string;
  name: string;
  name_bn?: string;
  slug: string;
  authority: string;
  icon: string;
  category: string;
  total_questions: number;
  duration_mins: number;
  negative_marking: number;
}

const WB_EXAMS_LIST: WBExam[] = [
  {
    id: 'exam-wbcs',
    name: 'WBCS (Exe) Examination',
    name_bn: 'পশ্চিমবঙ্গ সিভিল সার্ভিস (কার্যনির্বাহী) পরীক্ষা',
    slug: 'wbcs-exam',
    authority: 'West Bengal Public Service Commission (WBPSC)',
    icon: '🏛️',
    category: 'WBPSC Civil Services',
    total_questions: 200,
    duration_mins: 150,
    negative_marking: 0.33
  },
  {
    id: 'exam-food-si',
    name: 'WBPSC Food SI (Grade-III)',
    name_bn: 'খাদ্য ও সরবরাহ দপ্তর সাব-ইন্সপেক্টর পরীক্ষা',
    slug: 'wbpsc-food-si',
    authority: 'West Bengal Public Service Commission (WBPSC)',
    icon: '🌾',
    category: 'WBPSC Grade-III',
    total_questions: 100,
    duration_mins: 90,
    negative_marking: 0.33
  },
  {
    id: 'exam-clerkship',
    name: 'WBPSC Clerkship Examination',
    name_bn: 'পশ্চিমবঙ্গ ক্লার্কশিপ (পার্ট-১) পরীক্ষা',
    slug: 'wbpsc-clerkship',
    authority: 'West Bengal Public Service Commission (WBPSC)',
    icon: '📋',
    category: 'WBPSC Ministerial',
    total_questions: 100,
    duration_mins: 90,
    negative_marking: 0.25
  },
  {
    id: 'exam-wb-misc',
    name: 'WBPSC Miscellaneous Services',
    name_bn: 'পশ্চিমবঙ্গ মিসলেনিয়াস সার্ভিসেস রিক্রুটমেন্ট',
    slug: 'wbpsc-miscellaneous',
    authority: 'West Bengal Public Service Commission (WBPSC)',
    icon: '⚖️',
    category: 'WBPSC Executive',
    total_questions: 100,
    duration_mins: 90,
    negative_marking: 0.33
  },
  {
    id: 'exam-wbp-si',
    name: 'WB Police Sub-Inspector (SI)',
    name_bn: 'পশ্চিমবঙ্গ পুলিশ সাব-ইন্সপেক্টর ও সার্জেন্ট',
    slug: 'wb-police-si',
    authority: 'West Bengal Police Recruitment Board (WBPRB)',
    icon: '👮',
    category: 'West Bengal Police',
    total_questions: 100,
    duration_mins: 90,
    negative_marking: 0.25
  },
  {
    id: 'exam-wbp-constable',
    name: 'WB Police Constable & Lady Constable',
    name_bn: 'পশ্চিমবঙ্গ পুলিশ কনস্টেবল ও লেডি কনস্টেবল',
    slug: 'wb-police-constable',
    authority: 'West Bengal Police Recruitment Board (WBPRB)',
    icon: '🚓',
    category: 'West Bengal Police',
    total_questions: 85,
    duration_mins: 60,
    negative_marking: 0.25
  },
  {
    id: 'exam-kp-si',
    name: 'Kolkata Police SI & Sergeant',
    name_bn: 'কলকাতা পুলিশ সাব-ইন্সপেক্টর ও সার্জেন্ট পরীক্ষা',
    slug: 'kolkata-police-si',
    authority: 'West Bengal Police Recruitment Board (WBPRB)',
    icon: '🚔',
    category: 'Kolkata Police',
    total_questions: 100,
    duration_mins: 90,
    negative_marking: 0.25
  },
  {
    id: 'exam-wb-tet',
    name: 'West Bengal Primary TET',
    name_bn: 'পশ্চিমবঙ্গ প্রাথমিক শিক্ষক যোগ্যতা পরীক্ষা (TET)',
    slug: 'wb-primary-tet',
    authority: 'West Bengal Board of Primary Education (WBBPE)',
    icon: '🎓',
    category: 'Teaching & Education',
    total_questions: 150,
    duration_mins: 150,
    negative_marking: 0.0
  },
  {
    id: 'exam-mscwb',
    name: 'MSCWB Sub-Assistant Engineer / Officer',
    name_bn: 'মিউনিসিপ্যাল সার্ভিস কমিশন পশ্চিমবঙ্গ পরীক্ষা',
    slug: 'mscwb-exam',
    authority: 'Municipal Service Commission of West Bengal (MSCWB)',
    icon: '🏗️',
    category: 'Municipal & Civic',
    total_questions: 100,
    duration_mins: 120,
    negative_marking: 0.33
  }
];

export default function PYQArenaPage() {
  const [selectedExam, setSelectedExam] = useState<WBExam | null>(null);
  const [activeMode, setActiveMode] = useState<'papers' | 'questions'>('papers');
  const [mocks, setMocks] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // 20-Year list: 2025 down to 2005
  const allYears = [
    2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016,
    2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005
  ];

  useEffect(() => {
    // Fetch all West Bengal Previous-Year mock tests
    fetch('/api/mocks?mock_type=Previous-Year&limit=1000')
      .then(res => res.json())
      .then(data => {
        if (data?.mocks) {
          // Keep only West Bengal exams
          const wbOnly = data.mocks.filter((m: any) => 
            WB_EXAMS_LIST.some(e => e.id === m.exam_id)
          );
          setMocks(wbOnly);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching PYQ mocks:', err);
        setLoading(false);
      });

    // Also fetch initial questions pool for study tab
    fetch('/api/questions?is_pyq=1&limit=150')
      .then(res => res.json())
      .then(data => {
        if (data?.questions) {
          const wbQOnly = data.questions.filter((q: any) =>
            WB_EXAMS_LIST.some(e => e.id === q.exam_id || (q.exam_name && e.name.toLowerCase().includes(q.exam_name.toLowerCase())))
          );
          setQuestions(wbQOnly.length > 0 ? wbQOnly : data.questions);
        }
      })
      .catch(err => console.error('Error fetching PYQ questions:', err));
  }, []);

  const toggleReveal = (qId: string) => {
    setRevealedAnswers(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Filtered mock tests for the selected exam
  const filteredMocks = useMemo(() => {
    if (!selectedExam) return [];

    return mocks.filter(m => {
      if (m.exam_id !== selectedExam.id) return false;

      const yearMatch = m.title.match(/\((\d{4})\)/) || m.title.match(/(\d{4})/);
      const mYear = yearMatch ? yearMatch[1] : '';
      const matchesYear = selectedYear === 'all' || mYear === selectedYear;

      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        m.title.toLowerCase().includes(q) || 
        (m.title_bn && m.title_bn.toLowerCase().includes(q));

      return matchesYear && matchesSearch;
    });
  }, [mocks, selectedExam, selectedYear, searchQuery]);

  // Dynamic authentic years for the selected exam
  const availableYearsForSelectedExam = useMemo(() => {
    if (!selectedExam) return [];
    const yearsSet = new Set<number>();
    mocks
      .filter(m => m.exam_id === selectedExam.id)
      .forEach(m => {
        const yearMatch = m.title.match(/\((\d{4})\)/) || m.title.match(/(\d{4})/);
        if (yearMatch) {
          yearsSet.add(parseInt(yearMatch[1], 10));
        }
      });
    return Array.from(yearsSet).sort((a, b) => b - a);
  }, [mocks, selectedExam]);

  // Group filtered mocks by Year
  const mocksByYear = useMemo(() => {
    const groups: Record<number, any[]> = {};
    availableYearsForSelectedExam.forEach(y => { groups[y] = []; });

    filteredMocks.forEach(m => {
      const yearMatch = m.title.match(/\((\d{4})\)/) || m.title.match(/(\d{4})/);
      const y = yearMatch ? parseInt(yearMatch[1], 10) : 0;
      if (groups[y]) {
        groups[y].push(m);
      }
    });

    return groups;
  }, [filteredMocks, availableYearsForSelectedExam]);

  // Filtered Questions for Study mode
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      if (selectedExam) {
        const matchesExam = q.exam_id === selectedExam.id || 
                           (q.exam_name && selectedExam.name.toLowerCase().includes(q.exam_name.toLowerCase()));
        if (!matchesExam) return false;
      }

      if (selectedYear !== 'all' && String(q.pyq_year) !== selectedYear) {
        return false;
      }

      if (searchQuery) {
        const sq = searchQuery.toLowerCase();
        return (
          q.question_text?.toLowerCase().includes(sq) ||
          q.explanation?.toLowerCase().includes(sq) ||
          q.subject_name?.toLowerCase().includes(sq)
        );
      }

      return true;
    });
  }, [questions, selectedExam, selectedYear, searchQuery]);

  return (
    <div className="flex bg-[#F8FAFC] min-h-[calc(100vh-4rem)] w-full overflow-x-hidden select-none font-sans">
      <StudentSidebar />
      <StudentSideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="flex-1 w-full pb-28 lg:pb-12">
        
        {/* Top Mobile Black Header */}
        <header className="lg:hidden bg-[#121820] text-white px-4 py-3 sticky top-0 z-30 shadow-md flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsDrawerOpen(true)} className="p-1 text-white">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-extrabold text-sm text-white">Previous Year Papers</span>
          </div>
          <span className="text-xs text-teal-400 font-bold">
            2005–2025
          </span>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto w-full overflow-x-hidden">
          
          {/* Header Hero Banner */}
          <div className="bg-gradient-to-r from-[#002D3A] via-[#004856] to-[#00A389] rounded-3xl p-6 sm:p-8 text-white shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/20 text-white border border-white/25 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                West Bengal Official 20-Year PYQ Archive (2005–2025)
              </span>
              <span className="text-xs text-teal-100 font-bold">
                WBPSC • WBPRB • WBBPE • MSCWB
              </span>
            </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              West Bengal Previous Year Papers
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-2xl font-medium leading-relaxed">
              Step 1: Select your West Bengal Exam &rarr; Step 2: Choose Year (2005–2025) &rarr; Take official authentic timed CBT mock tests with bilingual answer keys.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2-STEP WORKFLOW PROGRESS BAR                                              */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs flex items-center justify-between gap-3 text-xs font-black">
          
          {/* Step 1 Pill */}
          <button
            onClick={() => setSelectedExam(null)}
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              !selectedExam
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${
              !selectedExam ? 'bg-[#00A389] text-white' : 'bg-slate-300 text-slate-800'
            }`}>
              1
            </span>
            <span className="truncate">1. Select West Bengal Exam</span>
            {selectedExam && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
          </button>

          <span className="text-slate-300 font-bold">&rarr;</span>

          {/* Step 2 Pill */}
          <div
            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
              selectedExam
                ? 'bg-[#00A389] text-white shadow-xs'
                : 'bg-slate-50 text-slate-400 opacity-60'
            }`}
          >
            <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${
              selectedExam ? 'bg-white text-slate-900' : 'bg-slate-300 text-slate-800'
            }`}>
              2
            </span>
            <span className="truncate">
              2. {selectedExam ? `${selectedExam.name} (2005–2025)` : 'Year-Wise Papers'}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: SELECT WEST BENGAL EXAM (When no exam is selected)                */}
        {/* ========================================================================= */}
        {!selectedExam && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center">
                  <span className="w-1.5 h-4.5 bg-[#2563EB] rounded-full inline-block mr-2.5"></span>
                  Step 1: Choose Your West Bengal Examination ({WB_EXAMS_LIST.length} Exams Available)
                </h2>
                <p className="text-xs text-slate-500 font-medium ml-4">
                  Select an exam below to access its official 20-year papers from 2005 to 2025.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WB_EXAMS_LIST.map((exam) => (
                <div
                  key={exam.id}
                  onClick={() => {
                    setSelectedExam(exam);
                    setSelectedYear('all');
                    setSearchQuery('');
                  }}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 hover:border-[#00A389] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                        {exam.icon}
                      </div>
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        21 Years (2005–2025)
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {exam.authority}
                      </span>
                      <h3 className="font-black text-base text-slate-900 group-hover:text-[#00A389] transition-colors leading-snug mt-0.5">
                        {exam.name}
                      </h3>
                      {exam.name_bn && (
                        <p className="text-xs text-slate-500 font-bengali mt-0.5">
                          {exam.name_bn}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-semibold pt-1 border-t border-slate-100">
                      <span>📝 {exam.total_questions} Questions</span>
                      <span>⏱️ {exam.duration_mins} Mins</span>
                      <span>🎯 Neg: -{exam.negative_marking}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <span className="text-[11px] font-bold text-slate-400">
                      Official Gazette Papers
                    </span>
                    <span className="font-black text-[#00A389] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View 20-Year Papers &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: YEAR-WISE PAPERS FOR SELECTED WEST BENGAL EXAM                    */}
        {/* ========================================================================= */}
        {selectedExam && (
          <div className="space-y-5">
            
            {/* Selected Exam Header Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <button
                    onClick={() => setSelectedExam(null)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
                    title="Back to All West Bengal Exams"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-teal-50 text-[#007A66] border border-teal-200">
                        {selectedExam.authority}
                      </span>
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        21 Official Papers (2005–2025)
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                      {selectedExam.name}
                    </h2>
                    {selectedExam.name_bn && (
                      <p className="text-xs text-slate-500 font-bengali">
                        {selectedExam.name_bn}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedExam(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-colors self-start sm:self-auto shrink-0 flex items-center gap-1.5"
                >
                  <span>&larr; Change WB Exam</span>
                </button>
              </div>

              {/* Exam Specs Strip */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-bold pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-900">
                  <Layers className="w-4 h-4 text-[#00A389]" />
                  21 Years: 2005 to 2025
                </span>
                <span className="flex items-center gap-1.5 text-slate-900">
                  <Clock className="w-4 h-4 text-[#00A389]" />
                  {selectedExam.duration_mins} Minutes
                </span>
                <span className="flex items-center gap-1.5 text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-[#00A389]" />
                  {selectedExam.total_questions} Questions (Neg: -{selectedExam.negative_marking})
                </span>
                <span className="flex items-center gap-1.5 text-slate-900">
                  <BookOpen className="w-4 h-4 text-[#00A389]" />
                  100% Bilingual (English &amp; বাংলা)
                </span>
              </div>
            </div>

            {/* Mode Selector & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs w-full sm:w-auto">
                <button
                  onClick={() => setActiveMode('papers')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 ${
                    activeMode === 'papers'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Full Mock Tests (CBT Mode)</span>
                </button>

                <button
                  onClick={() => setActiveMode('questions')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 ${
                    activeMode === 'questions'
                      ? 'bg-[#00A389] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Study Explorer (With Solutions)</span>
                </button>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search year or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00A389]/20 focus:border-[#00A389] bg-white"
                />
              </div>
            </div>

            {/* Fast Year Selector Pill Strip */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 text-xs font-black">
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedYear === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                All Papers ({mocks.filter(m => m.exam_id === selectedExam.id).length})
              </button>

              {availableYearsForSelectedExam.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(String(y))}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    selectedYear === String(y)
                      ? 'bg-[#00A389] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {y} ({mocksByYear[y]?.length || 1} {mocksByYear[y]?.length > 1 ? 'Shifts' : 'Paper'})
                </button>
              ))}
            </div>

            {/* ========================================================================= */}
            {/* VIEW 1: YEAR-WISE HEADINGS OF FULL MOCK PAPERS                            */}
            {/* ========================================================================= */}
            {activeMode === 'papers' && (
              <div className="space-y-6">
                {availableYearsForSelectedExam.map((year) => {
                  if (selectedYear !== 'all' && selectedYear !== String(year)) {
                    return null;
                  }

                  const yearMocks = mocksByYear[year] || [];
                  if (yearMocks.length === 0) return null;

                  return (
                    <div key={year} className="space-y-3">
                      {/* Year-Wise Heading */}
                      <div className="flex items-center gap-3 pt-2">
                        <div className="flex items-center gap-2 bg-slate-900 text-white px-3.5 py-1 rounded-xl shadow-xs">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span className="font-black text-xs sm:text-sm tracking-wide">
                            {year} OFFICIAL QUESTION PAPER
                          </span>
                        </div>
                        <div className="h-px bg-slate-200 flex-1"></div>
                        <span className="text-xs text-slate-500 font-bold">
                          {selectedExam.authority}
                        </span>
                      </div>

                      {/* Paper Cards */}
                      <div className="grid grid-cols-1 gap-3.5">
                        {yearMocks.map((m) => (
                          <div
                            key={m.id}
                            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#00A389] hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                          >
                            <div className="space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  {year} Official Paper
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">
                                  {selectedExam.category}
                                </span>
                              </div>

                              <h3 className="font-black text-base text-slate-900 group-hover:text-[#00A389] transition-colors leading-snug">
                                {m.title}
                              </h3>
                              {m.title_bn && (
                                <p className="text-xs text-slate-500 font-bengali">
                                  {m.title_bn}
                                </p>
                              )}

                              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold pt-1">
                                <span>📝 {m.total_questions} Questions</span>
                                <span>⏱️ {m.duration_mins} Mins</span>
                                <span>🎯 Neg: -{m.negative_marking}</span>
                                <span>🌐 Bilingual</span>
                              </div>
                            </div>

                            <div className="pt-2 sm:pt-0 shrink-0">
                              <Link
                                href={`/test/${m.slug || m.id}`}
                                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#00A389] hover:bg-[#007A66] text-white font-black text-xs transition-colors text-center shadow-xs flex items-center justify-center gap-2"
                              >
                                <Play className="w-3.5 h-3.5 fill-white text-white" />
                                <span>Take {year} Mock Test &rarr;</span>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ========================================================================= */}
            {/* VIEW 2: SINGLE QUESTION STUDY & REVEAL EXPLORER                           */}
            {/* ========================================================================= */}
            {activeMode === 'questions' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-500 px-1">
                  <span>Showing <strong className="text-slate-900">{filteredQuestions.length}</strong> past questions for {selectedExam.name}</span>
                  <span>Click &ldquo;Reveal Solution&rdquo; to study explanations</span>
                </div>

                {filteredQuestions.map((q, idx) => {
                  const isRevealed = revealedAnswers[q.id];

                  return (
                    <div key={q.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 transition-all">
                      
                      {/* Meta header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-black px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                            {selectedExam.name} {q.pyq_year} (Q.{q.pyq_num || idx + 1})
                          </span>
                          <span className="text-slate-400">• Official Question</span>
                        </div>

                        <span className="text-[11px] text-slate-400">
                          Authority: {selectedExam.authority}
                        </span>
                      </div>

                      {/* Question Text */}
                      <div className="space-y-1">
                        <p className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                          {q.question_text}
                        </p>
                        {q.question_text_bn && q.question_text_bn !== q.question_text && (
                          <p className="text-xs text-slate-600 font-bengali">{q.question_text_bn}</p>
                        )}
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {['A', 'B', 'C', 'D'].map((optKey) => {
                          const optText = q[`option_${optKey.toLowerCase()}`];
                          const optTextBn = q[`option_${optKey.toLowerCase()}_bn`];
                          const isCorrect = q.correct_answer === optKey;

                          let cardClass = 'bg-slate-50 border-slate-200 text-slate-800';
                          if (isRevealed && isCorrect) {
                            cardClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                          }

                          return (
                            <div key={optKey} className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${cardClass}`}>
                              <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] shrink-0 ${
                                isRevealed && isCorrect ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-300 text-slate-600'
                              }`}>
                                {optKey}
                              </span>
                              <div>
                                <span>{optText}</span>
                                {optTextBn && <span className="block text-[11px] text-slate-500 font-bengali">{optTextBn}</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Bottom Bar */}
                      <div className="pt-2 flex flex-col gap-3 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => toggleReveal(q.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{isRevealed ? 'Hide Solution' : 'Reveal Solution & Facts'}</span>
                          </button>

                          <span className="text-[11px] text-slate-400 font-medium">
                            Official Paper Question
                          </span>
                        </div>

                        {isRevealed && (
                          <div className="animate-in fade-in slide-in-from-top-1">
                            {(() => {
                              const isEnglish = (q.subject_name || '').toLowerCase().includes('english') || 
                                               (q.question_text || '').toLowerCase().includes('preposition') ||
                                               (q.question_text || '').toLowerCase().includes('idiom');

                              if (isEnglish) {
                                const engAnalysis = getDetailedEnglishAnalysis(q);
                                return (
                                  <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-white to-slate-50 border border-indigo-200 text-xs space-y-3.5 shadow-xs">
                                    <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
                                      <span className="font-extrabold text-indigo-950 flex items-center gap-1.5">
                                        <BookOpen className="w-4 h-4 text-indigo-700" />
                                        <span>English Composition: Granular 4-Option Analysis</span>
                                      </span>
                                      <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full">
                                        Grammar Rule
                                      </span>
                                    </div>

                                    <div className="p-3 rounded-xl bg-indigo-900 text-white text-xs leading-relaxed">
                                      <strong className="text-amber-400 block mb-0.5">Linguistic Principle:</strong>
                                      {engAnalysis.grammarRule}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {engAnalysis.optionsBreakdown.map((opt) => (
                                        <div
                                          key={opt.key}
                                          className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                                            opt.isCorrect
                                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium'
                                              : 'bg-white border-slate-200 text-slate-700'
                                          }`}
                                        >
                                          <div className="flex items-center justify-between">
                                            <span className="font-bold">Option {opt.key}: &ldquo;{opt.text}&rdquo;</span>
                                            <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                                              opt.isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                              {opt.isCorrect ? 'Correct' : 'Incorrect'}
                                            </span>
                                          </div>
                                          <p className="text-[11px] text-slate-600">{opt.grammaticalAnalysis}</p>
                                          {opt.meaningBn && <p className="text-[10px] text-slate-500 font-bengali">({opt.meaningBn})</p>}
                                        </div>
                                      ))}
                                    </div>

                                    {q.explanation_bn && (
                                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-slate-800 font-bengali text-xs">
                                        <strong>বাংলা ব্যাখ্যা:</strong> {q.explanation_bn}
                                      </div>
                                    )}
                                  </div>
                                );
                              }

                              const gsData = getStructuredGSExplanation(q);
                              return (
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50/80 via-white to-slate-50 border border-teal-200 text-xs space-y-3 shadow-xs">
                                  <div className="flex items-center justify-between pb-2 border-b border-teal-100">
                                    <span className="font-extrabold text-teal-950 flex items-center gap-1.5">
                                      <BookOpen className="w-4 h-4 text-[#00A389]" />
                                      <span>Detailed GS Conceptual Rationale &amp; Context</span>
                                    </span>
                                    <span className="text-[10px] font-bold text-[#007A66] bg-teal-100 px-2 py-0.5 rounded-full">
                                      Verified Solution
                                    </span>
                                  </div>

                                  <p className="text-slate-800 leading-relaxed text-xs sm:text-[13px]">
                                    {gsData.coreConcept}
                                  </p>

                                  {gsData.subjectFacts && gsData.subjectFacts.length > 0 && (
                                    <div className={`p-3 rounded-xl border space-y-1 ${
                                      gsData.badgeType === 'math' ? 'bg-blue-50 border-blue-200 text-blue-950' :
                                      gsData.badgeType === 'reasoning' ? 'bg-indigo-50 border-indigo-200 text-indigo-950' :
                                      gsData.badgeType === 'pedagogy' ? 'bg-teal-50 border-teal-200 text-teal-950' :
                                      gsData.badgeType === 'bengali' ? 'bg-emerald-50 border-emerald-200 text-emerald-950' :
                                      'bg-amber-50 border-amber-200 text-amber-950'
                                    }`}>
                                      <strong className="block text-xs">{gsData.subjectFactTitle}</strong>
                                      <ul className="pl-4 list-disc space-y-0.5 text-xs font-medium">
                                        {gsData.subjectFacts.map((f, fIdx) => (
                                          <li key={fIdx}>{f}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {q.explanation_bn && (
                                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bengali text-xs">
                                      <strong className="text-slate-900 block mb-0.5">📌 বাংলা বিস্তারিত ব্যাখ্যা:</strong>
                                      {q.explanation_bn}
                                    </div>
                                  )}

                                  {gsData.examTrapNote && (
                                    <div className="p-2 rounded-lg bg-slate-100 text-slate-700 text-xs">
                                      💡 <strong>Exam Tip:</strong> {gsData.examTrapNote}
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        </div>
      </div>
    </div>
  );
}
