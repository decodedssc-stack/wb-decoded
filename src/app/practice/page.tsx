'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import StudentSideDrawer from '@/components/layout/StudentSideDrawer';
import { 
  BookOpen, 
  Award, 
  Layers, 
  ChevronRight, 
  Play, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Flame, 
  Filter, 
  BarChart3, 
  ListChecks, 
  ChevronDown,
  Search,
  Check,
  Target,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Bookmark,
  TrendingUp,
  Brain,
  Scale,
  Landmark,
  MapPin,
  Coins,
  Calculator,
  Atom,
  Feather,
  Smile,
  Flag,
  Menu
} from 'lucide-react';

export default function ChapterPracticePage() {
  const [hierarchy, setHierarchy] = useState<any>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [selectedTierFilter, setSelectedTierFilter] = useState<'all' | 'foundation' | 'standard' | 'topper'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/hierarchy')
      .then(res => res.json())
      .then(hierData => {
        if (hierData?.subjects) {
          setHierarchy(hierData);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading practice hierarchy:', err);
        setLoading(false);
      });
  }, []);

  const subjects = hierarchy?.subjects || [];
  const allChapters = hierarchy?.chapters || [];

  // Active Subject & Chapters
  const activeSubject = useMemo(() => {
    if (!selectedSubjectId) return null;
    return subjects.find((s: any) => s.id === selectedSubjectId) || null;
  }, [subjects, selectedSubjectId]);

  const chaptersForActiveSubject = useMemo(() => {
    if (!selectedSubjectId) return [];
    return allChapters.filter((c: any) => c.subject_id === selectedSubjectId);
  }, [allChapters, selectedSubjectId]);

  // Active Chapter
  const activeChapter = useMemo(() => {
    if (!selectedChapterId) return null;
    return chaptersForActiveSubject.find((c: any) => c.id === selectedChapterId) || null;
  }, [chaptersForActiveSubject, selectedChapterId]);

  // Filtered Chapters for Step 2 Search
  const filteredChapters = useMemo(() => {
    if (!searchQuery) return chaptersForActiveSubject;
    return chaptersForActiveSubject.filter((chap: any) =>
      chap.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chaptersForActiveSubject, searchQuery]);

  // Subject icon helper
  const getSubjectIcon = (iconName: string, color: string) => {
    const props = { className: 'w-6 h-6', style: { color: color || '#2563EB' } };
    switch (iconName?.toLowerCase()) {
      case 'flag': return <Flag {...props} />;
      case 'landmark': return <Landmark {...props} />;
      case 'mappin': return <MapPin {...props} />;
      case 'scale': return <Scale {...props} />;
      case 'coins': return <Coins {...props} />;
      case 'calculator': return <Calculator {...props} />;
      case 'atom': return <Atom {...props} />;
      case 'zap': return <Zap {...props} />;
      case 'bookopen': return <BookOpen {...props} />;
      case 'brain': return <Brain {...props} />;
      case 'smile': return <Smile {...props} />;
      case 'feather': return <Feather {...props} />;
      default: return <BookOpen {...props} />;
    }
  };

  // Generate 10 tests metadata for the selected chapter (WB Decoded Master Standard)
  const chapterTests = useMemo(() => {
    if (!activeChapter) return [];
    return Array.from({ length: 10 }, (_, i) => {
      const testNum = i + 1;
      const testId = `mock-${activeChapter.id}-m${String(testNum).padStart(2, '0')}`;
      let tier: 'foundation' | 'standard' | 'topper' = 'foundation';
      let tierLabel = 'Foundation Drill';
      let tierColor = 'emerald';

      if (testNum > 7) {
        tier = 'topper';
        tierLabel = 'Topper Challenger';
        tierColor = 'purple';
      } else if (testNum > 3) {
        tier = 'standard';
        tierLabel = 'Exam Standard';
        tierColor = 'amber';
      }

      return {
        testNum,
        testId,
        tier,
        tierLabel,
        tierColor,
        isFree: testNum <= 2,
        questionsCount: 30,
        durationMins: 25,
        totalMarks: 30,
        negativeMark: 0.33
      };
    });
  }, [activeChapter]);

  // Filtered 30 tests for Step 3
  const filteredChapterTests = useMemo(() => {
    if (selectedTierFilter === 'all') return chapterTests;
    return chapterTests.filter(t => t.tier === selectedTierFilter);
  }, [chapterTests, selectedTierFilter]);

  return (
    <div className="flex bg-[#F8FAFC] min-h-[calc(100vh-4rem)] w-full overflow-x-hidden select-none font-sans">
      <StudentSidebar />
      <StudentSideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="flex-1 w-full pb-28 lg:pb-12">
        
        {/* Top Mobile Black Header */}
        <header 
          className="lg:hidden bg-[#121820] text-white px-4 py-3 sticky top-0 z-40 shadow-md flex items-center justify-between"
          style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)' }}
        >
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsDrawerOpen(true)} className="p-1 text-white">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-extrabold text-sm text-white">Chapter Tests Arena</span>
          </div>
          <Link href="/exams" className="text-xs text-teal-400 font-bold">
            Full Mocks &rarr;
          </Link>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
          
          {/* Header Hero Banner with Left Blue Accent */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center">
              <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block mr-3"></span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Subject &amp; Chapter-Wise Mock Test Arena
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium ml-4.5">
              Select a subject and chapter to practice 25-question timed mock drills with instant evaluation, negative marking, and complete textbook explanations.
            </p>
          </div>

          {/* ========================================================================= */}
          {/* 3-STEP PROGRESSION WIZARD BAR                                             */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs flex items-center justify-between gap-2 text-xs font-black">
            
            {/* Step 1 Pill */}
            <button
              onClick={() => {
                setSelectedSubjectId(null);
                setSelectedChapterId(null);
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                !selectedSubjectId
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${
                !selectedSubjectId ? 'bg-[#2563EB] text-white' : 'bg-slate-300 text-slate-800'
              }`}>
                1
              </span>
              <span className="truncate">1. Select Subject</span>
              {selectedSubjectId && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
            </button>

            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />

            {/* Step 2 Pill */}
            <button
              onClick={() => {
                if (selectedSubjectId) {
                  setSelectedChapterId(null);
                }
              }}
              disabled={!selectedSubjectId}
              className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                selectedSubjectId && !selectedChapterId
                  ? 'bg-slate-900 text-white shadow-xs'
                  : selectedChapterId
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed'
              }`}
            >
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${
                selectedSubjectId && !selectedChapterId ? 'bg-[#2563EB] text-white' : 'bg-slate-300 text-slate-800'
              }`}>
                2
              </span>
              <span className="truncate">2. Select Chapter</span>
              {selectedChapterId && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
            </button>

            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />

            {/* Step 3 Pill */}
            <div
              className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                selectedChapterId
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-400 opacity-60'
              }`}
            >
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${
                selectedChapterId ? 'bg-white text-slate-900' : 'bg-slate-300 text-slate-800'
              }`}>
                3
              </span>
              <span className="truncate">3. Take Chapter Mock</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STEP 1: SELECT SUBJECT (Appears when no subject is chosen)                */}
          {/* ========================================================================= */}
          {!selectedSubjectId && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    Step 1: Choose Your Subject ({subjects.length} Subjects Available)
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Click on any subject to explore its chapters and launch chapter tests.
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 font-bold text-sm">
                  Loading competitive examination subjects...
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((sub: any) => {
                    const chapCount = sub.chapters_count || 10;

                    return (
                      <div
                        key={sub.id}
                        onClick={() => {
                          setSelectedSubjectId(sub.id);
                          setSelectedChapterId(null);
                          setSearchQuery('');
                        }}
                        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 hover:border-[#2563EB] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                              {getSubjectIcon(sub.icon, sub.color || '#2563EB')}
                            </div>
                            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                              {chapCount} Chapters
                            </span>
                          </div>

                          <div>
                            <h3 className="font-black text-base text-slate-900 group-hover:text-[#2563EB] transition-colors">
                              {sub.name}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mt-1">
                              Comprehensive chapter-wise mock drills covering syllabus from basic to advanced.
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2563EB]">
                          <span>Explore Chapters</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: SELECT CHAPTER (Appears when subject chosen, chapter not chosen)   */}
          {/* ========================================================================= */}
          {selectedSubjectId && !selectedChapterId && activeSubject && (
            <div className="space-y-4 animate-in fade-in">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedSubjectId(null)}
                    className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Change Subject</span>
                  </button>
                  <span className="font-extrabold text-sm text-slate-900">
                    Subject: {activeSubject.name}
                  </span>
                </div>

                <div className="relative max-w-xs w-full">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Filter chapters..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredChapters.map((chap: any, idx: number) => (
                  <div
                    key={chap.id}
                    onClick={() => setSelectedChapterId(chap.id)}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#2563EB] hover:shadow-xs transition-all cursor-pointer group flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center space-x-3.5">
                      <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-black text-sm text-slate-900 group-hover:text-[#2563EB] transition-colors leading-snug">
                          {chap.name}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-bold">
                          10 Progressive Mock Tests (300 MCQs)
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: TAKE CHAPTER MOCK (Appears when chapter is chosen)                */}
          {/* ========================================================================= */}
          {activeChapter && (
            <div className="space-y-5 animate-in fade-in">
              
              {/* Back to Chapters button & Chapter Banner */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3">
                <button
                  onClick={() => setSelectedChapterId(null)}
                  className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>&larr; Back to Chapters in {activeSubject?.name}</span>
                </button>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200">
                    {activeSubject?.name}
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    {activeChapter.name}
                  </h2>
                </div>

                {/* Specs strip */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-bold pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-slate-900">
                    <Layers className="w-4 h-4 text-[#2563EB]" />
                    10 Progressive Mock Tests
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-900">
                    <Clock className="w-4 h-4 text-[#2563EB]" />
                    25 Minutes / Test
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-900">
                    <Target className="w-4 h-4 text-[#2563EB]" />
                    30 MCQs (30 Marks)
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                    Neg Marking: -0.33
                  </span>
                </div>
              </div>

              {/* Difficulty Tier Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setSelectedTierFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    selectedTierFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  All 10 Tests
                </button>

                <button
                  onClick={() => setSelectedTierFilter('foundation')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    selectedTierFilter === 'foundation'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Foundation Drills (01–03)</span>
                </button>

                <button
                  onClick={() => setSelectedTierFilter('standard')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    selectedTierFilter === 'standard'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-amber-900 hover:bg-amber-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>Exam Standard (04–07)</span>
                </button>

                <button
                  onClick={() => setSelectedTierFilter('topper')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    selectedTierFilter === 'topper'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-purple-900 hover:bg-purple-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span>Topper Challenger (08–10)</span>
                </button>
              </div>

              {/* 30 TESTS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredChapterTests.map((t) => (
                  <div
                    key={t.testId}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-[#2563EB] hover:shadow-xs transition-all flex flex-col justify-between gap-3 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-slate-900 text-white">
                          TEST #{String(t.testNum).padStart(2, '0')}
                        </span>

                        {t.isFree ? (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                            FREE TEST
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200">
                            Pass Pro
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-black text-sm text-slate-900 group-hover:text-[#2563EB] transition-colors leading-snug">
                          {t.tierLabel} #{t.testNum}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                          {activeChapter.name}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold pt-1 border-t border-slate-100">
                        <span>📝 {t.questionsCount} MCQs</span>
                        <span>⏱️ {t.durationMins} Mins</span>
                        <span>🎯 {t.totalMarks} Marks</span>
                      </div>
                    </div>

                    <Link
                      href={`/test/${t.testId}`}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs transition-colors text-center shadow-xs flex items-center justify-center gap-2 mt-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-white text-white" />
                      <span>Start Mock #{String(t.testNum).padStart(2, '0')} &rarr;</span>
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          )}

        </main>

      </div>
    </div>
  );
}
