'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import StudentSidebar from '@/components/layout/StudentSidebar';
import {
  Award,
  BookOpen,
  Clock,
  ExternalLink,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  ShieldCheck,
  Layers,
  ArrowRight,
  Play,
  FileText,
  Lock,
  Crown,
  Sparkles,
  Search,
  Filter,
  Check
} from 'lucide-react';

export default function ExamDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [examData, setExamData] = useState<any>(null);
  const [hierarchy, setHierarchy] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'full_mocks' | 'pyq' | 'chapter_tests' | 'sectional' | 'syllabus'>('full_mocks');
  const [selectedTier, setSelectedTier] = useState<'all' | 'free' | 'pro'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProModal, setShowProModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Chapter Test Drilldown States
  const [examSubjectId, setExamSubjectId] = useState<string | null>(null);
  const [examChapterId, setExamChapterId] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetch(`/api/exams/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data?.exam) setExamData(data);
          setLoading(false);
        })
        .catch(err => console.error('Error fetching exam detail:', err));

      fetch('/api/hierarchy')
        .then(res => res.json())
        .then(hier => {
          if (hier?.subjects) setHierarchy(hier);
        })
        .catch(err => console.error('Error fetching hierarchy:', err));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex bg-[#F4F6F8] min-h-[calc(100vh-4rem)]">
        <StudentSidebar />
        <div className="flex-1 p-8 text-center text-slate-500 font-bold text-sm">
          Loading official examination blueprint and test series...
        </div>
      </div>
    );
  }

  if (!examData?.exam) {
    return (
      <div className="flex bg-[#F4F6F8] min-h-[calc(100vh-4rem)]">
        <StudentSidebar />
        <div className="flex-1 p-8 text-center text-slate-700">
          <h2 className="text-xl font-bold">Exam Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">The requested examination could not be loaded.</p>
          <Link href="/exams" className="mt-4 inline-block px-4 py-2 rounded-xl bg-[#00A389] text-white text-xs font-bold">
            Browse All Exams
          </Link>
        </div>
      </div>
    );
  }

  const { exam, pattern, stages, mocks = [], pyqMocks = [], pyqYears = [] } = examData;
  const subjectDistribution = pattern?.subject_distribution_json ? JSON.parse(pattern.subject_distribution_json) : [];

  const filteredMocks = mocks.filter((m: any, index: number) => {
    const isFree = index < 2;
    if (selectedTier === 'free' && !isFree) return false;
    if (selectedTier === 'pro' && isFree) return false;
    if (searchQuery) {
      return m.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="flex bg-[#F4F6F8] min-h-[calc(100vh-4rem)] w-full overflow-x-hidden">
      <StudentSidebar />

      <div className="flex-1 p-3.5 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 max-w-5xl w-full overflow-x-hidden">
        
        {/* Exam Hero Banner */}
        <div className="bg-gradient-to-r from-[#002D3A] via-[#004856] to-[#00A389] rounded-2xl p-5 sm:p-7 text-white shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white border border-white/20">
              {exam.category_name || 'West Bengal Examination'}
            </span>
            <div className="flex items-center gap-3 text-xs font-bold">
              {exam.official_website && (
                <a
                  href={exam.official_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-teal-200 hover:text-white underline"
                >
                  Official Commission Portal <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {exam.name}
            </h1>
            <p className="text-xs sm:text-sm font-bold text-amber-300 mt-1">
              Authority: {exam.authority}
            </p>
            <p className="text-xs text-slate-200 mt-2 max-w-3xl leading-relaxed">
              {exam.description}
            </p>
          </div>

          {/* 4-Tab Navigation Strip */}
          <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab('full_mocks')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'full_mocks' ? 'bg-white text-slate-900 shadow-sm' : 'bg-black/20 text-white hover:bg-black/30'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#00A389]" />
              <span>Full-Length Mocks ({mocks.length || 100})</span>
            </button>

            <button
              onClick={() => setActiveTab('pyq')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'pyq' ? 'bg-white text-slate-900 shadow-sm' : 'bg-black/20 text-white hover:bg-black/30'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>Previous Year Papers (10+ Yrs)</span>
            </button>

            <button
              onClick={() => setActiveTab('chapter_tests')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'chapter_tests' ? 'bg-white text-slate-900 shadow-sm' : 'bg-black/20 text-white hover:bg-black/30'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Chapter-Wise Tests (1,200)</span>
            </button>

            <button
              onClick={() => setActiveTab('sectional')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'sectional' ? 'bg-white text-slate-900 shadow-sm' : 'bg-black/20 text-white hover:bg-black/30'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-orange-400" />
              <span>Sectional Speed Tests</span>
            </button>

            <button
              onClick={() => setActiveTab('syllabus')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'syllabus' ? 'bg-white text-slate-900 shadow-sm' : 'bg-black/20 text-white hover:bg-black/30'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Syllabus Blueprint</span>
            </button>
          </div>
        </div>

        {/* Pattern Summary Strip */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Questions</span>
            <span className="text-xl font-black text-slate-900">{pattern?.total_questions || 200} Qs</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Time Duration</span>
            <span className="text-xl font-black text-slate-900">{pattern?.duration_mins || 150} Minutes</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Marks</span>
            <span className="text-xl font-black text-slate-900">{pattern?.total_marks || 200} Marks</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Negative Marking</span>
            <span className="text-xl font-black text-red-600">-{pattern?.negative_marking || 0.33} Marks</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: FULL-LENGTH MOCKS (WITH UNLOCK MODEL)                              */}
        {/* ========================================================================= */}
        {activeTab === 'full_mocks' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Filter mocks by number or tier..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00A389]/20 focus:border-[#00A389]"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedTier('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors ${
                    selectedTier === 'all' ? 'bg-[#00A389] text-white' : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  All ({mocks.length})
                </button>
                <button
                  onClick={() => setSelectedTier('free')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors ${
                    selectedTier === 'free' ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  Free Mocks (2)
                </button>
                <button
                  onClick={() => setSelectedTier('pro')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors ${
                    selectedTier === 'pro' ? 'bg-amber-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  Pro Pass Mocks (98)
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredMocks.map((m: any, index: number) => {
                const isFree = index < 2;
                return (
                  <div
                    key={m.id}
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-[#00A389] hover:shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        {isFree ? (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            FREE TEST
                          </span>
                        ) : (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-300 flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-600" />
                            PRO PASS
                          </span>
                        )}
                        <span className="text-xs text-slate-500 font-bold">{m.difficulty} Tier</span>
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#00A389] transition-colors">
                        {m.title}
                      </h4>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold">
                        <span>📝 {m.total_questions} Questions</span>
                        <span>⏱️ {m.duration_mins} Minutes</span>
                        <span>🎯 {m.total_marks} Marks</span>
                        <span>🌐 Bilingual (Eng/বাংলা)</span>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto">
                      {isFree ? (
                        <Link
                          href={`/test/${m.slug || m.id}`}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00A389] hover:bg-[#007A66] text-white font-extrabold text-xs shadow-xs transition-all text-center block"
                        >
                          START FREE TEST NOW &rarr;
                        </Link>
                      ) : (
                        <button
                          onClick={() => setShowProModal(true)}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>UNLOCK WITH PASS PRO</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PREVIOUS YEAR PAPERS (PYQ) — 20-YEAR ARCHIVE                       */}
        {/* ========================================================================= */}
        {activeTab === 'pyq' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-black text-base text-slate-900">
                  Official 20-Year Previous Question Papers ({pyqMocks.length > 0 ? `${pyqMocks[pyqMocks.length - 1]?.title.match(/\d{4}/)?.[0] || '2005'}–2025` : '2005–2025'})
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Authentic papers compiled from official commission gazettes with exact timed test simulations.
                </p>
              </div>
              <Link href="/pyq" className="text-xs font-extrabold text-[#00A389] hover:underline shrink-0">
                Explore All 770+ Exams PYQ &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {pyqMocks.map((pm: any) => {
                const yearMatch = pm.title.match(/\((\d{4})\)/) || pm.title.match(/(\d{4})/);
                const yearStr = yearMatch ? yearMatch[1] : 'Official';

                return (
                  <div
                    key={pm.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#00A389] shadow-xs flex flex-col justify-between gap-3 group transition-all"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {yearStr} Official Paper
                        </span>
                        <span className="text-[11px] text-slate-400 font-bold">
                          {pm.duration_mins} Mins • {pm.total_marks} Marks
                        </span>
                      </div>

                      <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-[#00A389] transition-colors">
                        {pm.title}
                      </h4>
                      {pm.title_bn && (
                        <p className="text-xs text-slate-500 font-bengali">
                          {pm.title_bn}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold pt-1">
                        <span>📝 {pm.total_questions} Questions</span>
                        <span>⏱️ {pm.duration_mins} Mins</span>
                        <span>🎯 Neg: -{pm.negative_marking}</span>
                        <span>🌐 Bilingual</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <Link
                        href={`/test/${pm.slug || pm.id}`}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-[#00A389] text-white font-extrabold text-xs transition-colors text-center shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-white text-white" />
                        <span>Start Official {yearStr} Paper &rarr;</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CHAPTER-WISE TESTS (3-STEP DRILLDOWN)                              */}
        {/* ========================================================================= */}
        {activeTab === 'chapter_tests' && (
          <div className="space-y-4">
            
            {/* Step Progress Bar */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center justify-between gap-2 text-xs font-black">
              <button
                onClick={() => {
                  setExamSubjectId(null);
                  setExamChapterId(null);
                }}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  !examSubjectId ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>1. Select Subject</span>
                {examSubjectId && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

              <button
                onClick={() => {
                  if (examSubjectId) setExamChapterId(null);
                }}
                disabled={!examSubjectId}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  examSubjectId && !examChapterId ? 'bg-slate-900 text-white' : examChapterId ? 'bg-slate-100 text-slate-700' : 'bg-slate-50 text-slate-400 opacity-60'
                }`}
              >
                <span>2. Select Chapter</span>
                {examChapterId && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

              <div
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  examChapterId ? 'bg-[#00A389] text-white' : 'bg-slate-50 text-slate-400 opacity-60'
                }`}
              >
                <span>3. Take Mock</span>
              </div>
            </div>

            {/* STEP 1: Select Subject */}
            {!examSubjectId && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900">
                    Step 1: Choose Subject for {exam.name}
                  </h4>
                  <Link href="/practice" className="text-xs font-bold text-[#00A389] hover:underline">
                    Universal Practice Arena &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {(hierarchy?.subjects || []).map((sub: any) => (
                    <div
                      key={sub.id}
                      onClick={() => {
                        setExamSubjectId(sub.id);
                        setExamChapterId(null);
                      }}
                      className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#00A389] hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {sub.chapters_count || 10} Chapters
                        </span>
                        <h5 className="font-black text-sm text-slate-900 group-hover:text-[#00A389] transition-colors">
                          {sub.name}
                        </h5>
                      </div>
                      <span className="text-xs font-bold text-[#00A389] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Select Subject &rarr;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Select Chapter */}
            {examSubjectId && !examChapterId && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setExamSubjectId(null);
                        setExamChapterId(null);
                      }}
                      className="text-xs font-bold text-[#00A389] hover:underline flex items-center gap-1"
                    >
                      &larr; Back to Subjects
                    </button>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-extrabold text-slate-900">
                      {(hierarchy?.subjects || []).find((s: any) => s.id === examSubjectId)?.name}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {(hierarchy?.chapters || [])
                    .filter((c: any) => c.subject_id === examSubjectId)
                    .map((chap: any, idx: number) => (
                      <div
                        key={chap.id}
                        onClick={() => setExamChapterId(chap.id)}
                        className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#00A389] hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            Chapter {idx + 1}
                          </span>
                          <h5 className="font-black text-sm text-slate-900 group-hover:text-[#00A389] transition-colors">
                            {chap.name}
                          </h5>
                          <p className="text-xs text-slate-500">30 Progressive Tests (750 MCQs)</p>
                        </div>
                        <span className="text-xs font-bold text-[#00A389] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Select Chapter &rarr;
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* STEP 3: Chapter Mock Tests */}
            {examChapterId && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExamChapterId(null)}
                      className="text-xs font-bold text-[#00A389] hover:underline flex items-center gap-1"
                    >
                      &larr; Back to Chapters
                    </button>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-extrabold text-slate-900">
                      {(hierarchy?.chapters || []).find((c: any) => c.id === examChapterId)?.name}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {Array.from({ length: 30 }, (_, i) => {
                    const tNum = i + 1;
                    const testId = `mock-${examChapterId}-t${String(tNum).padStart(2, '0')}`;
                    const isFree = tNum <= 2;

                    return (
                      <div
                        key={testId}
                        className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-[#00A389] hover:shadow-xs transition-all flex flex-col justify-between gap-3 group"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-900 text-white">
                              TEST #{String(tNum).padStart(2, '0')}
                            </span>
                            {isFree ? (
                              <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                FREE
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                                Pass Pro
                              </span>
                            )}
                          </div>
                          <h6 className="font-extrabold text-xs text-slate-900 pt-1">
                            {tNum <= 10 ? 'Foundation Drill' : tNum <= 20 ? 'Exam Standard' : 'Topper Challenger'} #{tNum}
                          </h6>
                          <p className="text-[11px] text-slate-500">25 MCQs • 20 Mins • 25 Marks</p>
                        </div>

                        <Link
                          href={`/test/${testId}`}
                          className="w-full py-2 rounded-xl bg-[#00A389] hover:bg-[#007A66] text-white font-black text-xs transition-colors text-center shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <Play className="w-3 h-3 fill-white text-white" />
                          <span>Start Test &rarr;</span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: SECTIONAL SPEED TESTS                                              */}
        {/* ========================================================================= */}
        {activeTab === 'sectional' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                English Sectional
              </span>
              <h4 className="font-extrabold text-sm text-slate-900">Grammar, Synonyms &amp; Idioms</h4>
              <p className="text-xs text-slate-500">25 Questions • 20 Mins</p>
              <Link href="/test/mock-wbcs-full-001" className="block text-center py-2 rounded-xl bg-slate-100 font-bold text-xs hover:bg-slate-200">
                Start Sectional Test
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                General Studies Sectional
              </span>
              <h4 className="font-extrabold text-sm text-slate-900">History, Polity &amp; Geography</h4>
              <p className="text-xs text-slate-500">50 Questions • 40 Mins</p>
              <Link href="/test/mock-wbcs-full-001" className="block text-center py-2 rounded-xl bg-slate-100 font-bold text-xs hover:bg-slate-200">
                Start Sectional Test
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                Quantitative Sectional
              </span>
              <h4 className="font-extrabold text-sm text-slate-900">Arithmetic &amp; Mental Ability</h4>
              <p className="text-xs text-slate-500">25 Questions • 25 Mins</p>
              <Link href="/test/mock-food-si-full-001" className="block text-center py-2 rounded-xl bg-slate-100 font-bold text-xs hover:bg-slate-200">
                Start Sectional Test
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SYLLABUS & PATTERN                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'syllabus' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-black text-base text-slate-900">Official Syllabus Blueprint Breakdown</h3>
              <div className="space-y-3">
                {subjectDistribution.map((sec: any, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <h5 className="font-extrabold text-slate-900">{sec.section_name || sec.subject_name}</h5>
                      <span className="text-slate-500">{sec.topics || 'Complete syllabus module'}</span>
                    </div>
                    <span className="font-black text-[#00A389] px-2.5 py-1 rounded bg-white border border-slate-200">
                      {sec.questions_count || 25} MCQs
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* WB PRO PASS UNLOCK MODAL */}
      {showProModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Crown className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">Unlock 900+ Full Mocks with Pass Pro</h3>
              <p className="text-xs text-slate-500">
                Get unlimited access to all 100 WBCS, Police SI, Food SI &amp; TET mock series with instant All-Bengal rankings.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>900 Official Full-Length Exam Mock Tests</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1,200 Chapter Practice Tests (60 Chapters)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>10+ Years Official Solved PYQs with Cutoffs</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setShowProModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Maybe Later
              </button>
              <Link
                href="/plans"
                className="flex-1 py-2.5 rounded-xl bg-[#00A389] hover:bg-[#007A66] text-white font-black text-xs shadow-xs text-center"
              >
                View Plans (₹99/mo) &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
