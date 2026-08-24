'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import StudentSideDrawer from '@/components/layout/StudentSideDrawer';
import { getDetailedEnglishAnalysis, getStructuredGSExplanation } from '@/lib/detailedExplanationEngine';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Crosshair,
  Award,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Eye,
  Flag,
  Share2,
  ChevronDown,
  ChevronUp,
  Menu,
  Languages,
  Filter,
  Check,
  Zap,
  Flame,
  Medal,
  Users
} from 'lucide-react';

function getOptionEliminationRationale(
  optionKey: string,
  optionText: string,
  correctKey: string,
  correctText: string,
  subjectName?: string,
  questionText?: string,
  explanation?: string
): string {
  const opt = optionText || '';
  const optLower = opt.toLowerCase();
  const subjLower = (subjectName || '').toLowerCase();
  const qLower = (questionText || '').toLowerCase();

  // English Section Grammatical Trap Detection
  if (subjLower.includes('english') || qLower.includes('preposition') || qLower.includes('grammat') || qLower.includes('idiom') || qLower.includes('phrasal') || qLower.includes('fill in the blank')) {
    if (optLower.includes('disposed off')) return "Grammar Trap: 'Dispose of' takes single 'f'. 'Dispose off' is an incorrect double-f spelling error.";
    if (optLower.includes('coped up with')) return "Redundant Preposition Trap: The standard idiom is strictly 'cope with'. 'Coped up with' is a common colloquial error.";
    if (optLower.includes('adhering on')) return "Preposition Error: 'Adhere' strictly takes the preposition 'to' (adhere to rules), not 'on'.";
    if (optLower.includes('abstain of') || optLower.includes('abstain to')) return "Preposition Error: 'Abstain' and 'refrain' strictly govern the preposition 'from'.";
    if (optLower.includes('comprised of')) return "Redundancy Error: 'Comprise' means 'consist of'; hence 'comprised of' is grammatically improper in active voice.";
    if (optLower.includes('lacking of')) return "Usage Error: 'Lack' as a verb or participle takes a direct object without 'of'.";
    if (optLower.includes('call on') || optLower.includes('called on')) return "Phrasal Mismatch: 'Call on' means to visit or request; to cancel or withdraw requires 'call off'.";
    if (optLower.includes('put up with')) return "Phrasal Mismatch: 'Put up with' means tolerate; extinguishing a flame requires 'put out'.";
    if (optLower.includes('look after')) return "Phrasal Mismatch: 'Look after' means to care for; investigating a crime requires 'look into'.";
    if (optLower.includes('between')) return "Grammar Rule: 'Between' applies to exactly two entities; three or more entities require 'among'.";
    if (optLower.includes('fewer')) return "Grammar Rule: 'Fewer' modifies countable nouns; uncountable mass nouns require 'less'.";
    return `Grammatical Distractor: Violates standard English syntax when contrasted with correct answer ("${correctText}").`;
  }

  // Quantitative Aptitude
  if (subjLower.includes('math') || subjLower.includes('arithmetic') || subjLower.includes('quantitative') || subjLower.includes('reasoning') || /^\d+(\.\d+)?%?$/.test(opt.trim())) {
    return `Calculation Distractor: Does not satisfy the equation. The verified calculation yields ${correctText}.`;
  }

  // Polity
  if (subjLower.includes('polity') || qLower.includes('article') || qLower.includes('amendment') || qLower.includes('constitution')) {
    if (optLower.includes('article 32') && (qLower.includes('high court') || qLower.includes('state'))) {
      return "Jurisdiction Trap: Article 32 empowers the Supreme Court only; High Court writ jurisdiction is under Article 226.";
    }
    if (optLower.includes('article 226') && qLower.includes('supreme court')) {
      return "Jurisdiction Trap: Article 226 applies to High Courts; Supreme Court writ jurisdiction is under Article 32.";
    }
    return `Constitutional Distractor: Fails to match the specific statutory clause or constitutional mandate (${correctText}).`;
  }

  // History
  if (subjLower.includes('history') || qLower.includes('revolt') || qLower.includes('movement') || qLower.includes('viceroy')) {
    return `Historical Inaccuracy: Does not match the historical timeline or primary sources established for "${correctText}".`;
  }

  return `Distractor: Factual inconsistency when evaluated against the verified official key (${correctText}).`;
}

export default function TestResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const testId = params.id as string;
  const attemptId = searchParams.get('attemptId');

  const [resultData, setResultData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'analysis' | 'solutions' | 'leaderboard'>('analysis');
  const [activeFilter, setActiveFilter] = useState<'all' | 'correct' | 'wrong' | 'skipped'>('all');
  const [weaknessFilter, setWeaknessFilter] = useState<'all' | 'weak' | 'strong'>('weak');
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [reportModalQ, setReportModalQ] = useState<any>(null);
  const [reportReason, setReportReason] = useState<string>('Wrong answer');
  const [reportComment, setReportComment] = useState<string>('');
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    if (attemptId) {
      fetch(`/api/test-attempts/${attemptId}`)
        .then(res => res.json())
        .then(data => {
          if (data?.attempt) setResultData(data.attempt);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching result:', err);
          setLoading(false);
        });
    } else {
      fetch('/api/test-attempts?user_id=usr-1')
        .then(res => res.json())
        .then(data => {
          if (data?.attempts && data.attempts.length > 0) {
            const latest = data.attempts[0];
            fetch(`/api/test-attempts/${latest.id}`)
              .then(res => res.json())
              .then(d => {
                if (d?.attempt) setResultData(d.attempt);
                setLoading(false);
              });
          } else {
            setLoading(false);
          }
        })
        .catch(() => setLoading(false));
    }
  }, [attemptId]);

  const handleReportSubmit = async () => {
    if (!reportModalQ) return;
    try {
      await fetch(`/api/questions/${reportModalQ.question_id}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'usr-1',
          reason: reportReason,
          comment: reportComment,
        })
      });
      setReportSubmitted(true);
      setTimeout(() => {
        setReportModalQ(null);
        setReportSubmitted(false);
        setReportComment('');
      }, 1500);
    } catch (e) {
      console.error('Failed to submit question report:', e);
    }
  };

  const {
    score = 0,
    max_marks = 200,
    accuracy = 0,
    total_correct = 0,
    total_wrong = 0,
    total_skipped = 0,
    time_spent_secs = 0,
    rank = 1,
    percentile = 90,
    mock_title = 'Official CBT Mock Test',
    answers = [],
    weakAreas = []
  } = resultData || {};

  // Compute live subject stats from answers
  const subjectList = useMemo(() => {
    if (!answers || answers.length === 0) {
      return [
        { name: 'General Knowledge', total: 40, correct: 0, accuracy_pct: 0, status: 'weak' },
        { name: 'Current Affairs', total: 25, correct: 0, accuracy_pct: 0, status: 'weak' },
        { name: 'General Science', total: 30, correct: 0, accuracy_pct: 0, status: 'weak' },
        { name: 'Quantitative Aptitude', total: 25, correct: 0, accuracy_pct: 0, status: 'weak' },
        { name: 'Logical Reasoning', total: 25, correct: 2, accuracy_pct: 8, status: 'weak' }
      ];
    }

    const map = new Map<string, { total: number; correct: number; wrong: number; skipped: number }>();
    answers.forEach((ans: any) => {
      const sName = ans.subject_name || 'General Studies';
      if (!map.has(sName)) {
        map.set(sName, { total: 0, correct: 0, wrong: 0, skipped: 0 });
      }
      const item = map.get(sName)!;
      item.total++;
      if (ans.is_correct === 1) item.correct++;
      else if (ans.selected_option !== null) item.wrong++;
      else item.skipped++;
    });

    return Array.from(map.entries()).map(([name, stat]) => {
      const acc = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
      return {
        name,
        total: stat.total,
        correct: stat.correct,
        accuracy_pct: acc,
        status: acc < 50 ? 'weak' : 'strong'
      };
    });
  }, [answers]);

  const filteredSubjects = useMemo(() => {
    if (weaknessFilter === 'weak') return subjectList.filter(s => s.status === 'weak' || s.accuracy_pct < 60);
    if (weaknessFilter === 'strong') return subjectList.filter(s => s.status === 'strong' || s.accuracy_pct >= 60);
    return subjectList;
  }, [subjectList, weaknessFilter]);

  const filteredAnswers = useMemo(() => {
    return answers.filter((ans: any) => {
      if (activeFilter === 'correct') return ans.is_correct === 1;
      if (activeFilter === 'wrong') return ans.is_correct === 0 && ans.selected_option !== null;
      if (activeFilter === 'skipped') return ans.selected_option === null;
      return true;
    });
  }, [answers, activeFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold text-slate-500">Compiling official CBT analytics &amp; scorecards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans select-none flex flex-col w-full overflow-x-hidden">
      
      {/* Slide-out Menu Drawer */}
      <StudentSideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* ========================================================================= */}
      {/* 1. TOP PITCH BLACK HEADER (Matching media_1787401727243.jpg)             */}
      {/* ========================================================================= */}
      <header 
        className="bg-[#121820] text-white px-4 py-3 sticky top-0 z-40 shadow-md flex items-center justify-between"
        style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)' }}
      >
        <div className="flex items-center space-x-3 overflow-hidden">
          {/* Back Arrow */}
          <Link
            href="/exams"
            className="p-1 rounded-lg hover:bg-slate-800 text-white transition-colors"
            title="Back to Exams"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          {/* Test Title with Ellipsis */}
          <h1 className="font-bold text-sm sm:text-base text-white truncate max-w-[220px] sm:max-w-md">
            {mock_title}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Toggle Icon [E/अ] */}
          <button
            onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
            title="Toggle Language"
          >
            <span className="text-[11px] font-black">{lang === 'en' ? 'E/অ' : 'অ/E'}</span>
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-white transition-colors"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. SECONDARY THREE-TAB NAVIGATION BAR                                     */}
      {/* ========================================================================= */}
      <nav className="bg-white border-b border-slate-200 sticky top-[52px] z-30 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-around text-center">
          
          {/* Tab 1: Analysis */}
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === 'analysis'
                ? 'text-slate-900 font-extrabold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Analysis</span>
            {activeTab === 'analysis' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></span>
            )}
          </button>

          {/* Tab 2: Solutions */}
          <button
            onClick={() => setActiveTab('solutions')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === 'solutions'
                ? 'text-slate-900 font-extrabold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Solutions</span>
            {activeTab === 'solutions' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></span>
            )}
          </button>

          {/* Tab 3: Leaderboard */}
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === 'leaderboard'
                ? 'text-slate-900 font-extrabold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Leaderboard</span>
            {activeTab === 'leaderboard' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></span>
            )}
          </button>

        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 3. MAIN TAB CONTENT AREA                                                  */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6 pb-28">

        {/* ----------------------------------------------------------------------- */}
        {/* TAB 1: ANALYSIS (Exact match to media_1787401727243.jpg)                */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === 'analysis' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Top Score Summary Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200">
                    TEST SUMMARY
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                    Your Performance Overview
                  </h2>
                </div>

                <Link
                  href={`/test/${testId}`}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </Link>
              </div>

              {/* 4 Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Score</span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    {score} <span className="text-xs text-slate-400 font-semibold">/ {max_marks}</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Accuracy</span>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">
                    {accuracy}%
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">State Rank</span>
                  <div className="text-xl sm:text-2xl font-black text-[#2563EB] mt-0.5">
                    #{rank} <span className="text-xs text-slate-400 font-semibold">/ 1,500</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Percentile</span>
                  <div className="text-xl sm:text-2xl font-black text-purple-600 mt-0.5">
                    {percentile}%
                  </div>
                </div>
              </div>

              {/* Correct / Incorrect / Skipped Strip */}
              <div className="grid grid-cols-3 gap-2 text-center bg-slate-100/70 p-2.5 rounded-2xl text-xs font-bold">
                <div className="text-emerald-700 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{total_correct} Correct</span>
                </div>
                <div className="text-rose-700 flex items-center justify-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>{total_wrong} Wrong</span>
                </div>
                <div className="text-slate-600 flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{total_skipped} Skipped</span>
                </div>
              </div>
            </div>

            {/* Section Header: STRENGTHS AND WEAKNESSES */}
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider">
                STRENGTHS AND WEAKNESSES
              </h3>

              {/* Exact Card matching media_1787401727243.jpg */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
                
                {/* Centered Weak Pill Badge */}
                <div className="flex justify-center">
                  <div className="inline-flex rounded-full p-1 bg-slate-100 gap-1 border border-slate-200">
                    <button
                      onClick={() => setWeaknessFilter('weak')}
                      className={`px-4 py-1 rounded-full text-xs font-black transition-all ${
                        weaknessFilter === 'weak'
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Weak
                    </button>
                    <button
                      onClick={() => setWeaknessFilter('strong')}
                      className={`px-4 py-1 rounded-full text-xs font-black transition-all ${
                        weaknessFilter === 'strong'
                          ? 'bg-[#2563EB] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Strong
                    </button>
                    <button
                      onClick={() => setWeaknessFilter('all')}
                      className={`px-4 py-1 rounded-full text-xs font-black transition-all ${
                        weaknessFilter === 'all'
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      All Subjects
                    </button>
                  </div>
                </div>

                {/* Subject List */}
                <div className="divide-y divide-slate-100">
                  {filteredSubjects.map((subj, idx) => {
                    const isExpanded = expandedSubject === subj.name;
                    return (
                      <div key={idx} className="py-4 first:pt-2 last:pb-2 space-y-2">
                        {/* Subject Title & Chevron */}
                        <div 
                          onClick={() => setExpandedSubject(isExpanded ? null : subj.name)}
                          className="flex items-center justify-between cursor-pointer group"
                        >
                          <span className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#2563EB] transition-colors">
                            {subj.name}
                          </span>
                          <button className="text-slate-400 group-hover:text-slate-700 p-1">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Correct % and Progress Bar */}
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-semibold text-slate-500 w-16 flex-shrink-0">
                            Correct %
                          </span>
                          
                          {/* Progress Line */}
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                            <div
                              className={`h-full rounded-full transition-all ${
                                subj.accuracy_pct >= 60
                                  ? 'bg-emerald-500'
                                  : subj.accuracy_pct > 0
                                  ? 'bg-[#2563EB]'
                                  : 'bg-slate-200'
                              }`}
                              style={{ width: `${Math.max(subj.accuracy_pct, 0)}%` }}
                            ></div>
                          </div>

                          {/* Percentage Number */}
                          <span className="text-xs font-bold text-slate-700 w-8 text-right flex-shrink-0">
                            {subj.accuracy_pct}%
                          </span>
                        </div>

                        {/* Collapsible Subject Drilldown */}
                        {isExpanded && (
                          <div className="pt-2 pl-2 text-xs text-slate-500 space-y-1 animate-in fade-in">
                            <p>• Total Questions: <strong>{subj.total}</strong> | Correct: <strong>{subj.correct}</strong></p>
                            <p className="text-[#2563EB] font-bold">
                              💡 Recommended Focus: Practice 20 chapter tests in {subj.name} to boost score.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* Quick Action: Jump to Solutions */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setActiveTab('solutions')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Detailed Solutions &amp; Explanations &rarr;</span>
              </button>
            </div>

          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* TAB 2: SOLUTIONS                                                        */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === 'solutions' && (
          <div className="space-y-5 animate-in fade-in">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  activeFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                All Questions ({answers.length})
              </button>
              <button
                onClick={() => setActiveFilter('correct')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  activeFilter === 'correct'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Correct ({total_correct})
              </button>
              <button
                onClick={() => setActiveFilter('wrong')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  activeFilter === 'wrong'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Incorrect ({total_wrong})
              </button>
              <button
                onClick={() => setActiveFilter('skipped')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  activeFilter === 'skipped'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Skipped ({total_skipped})
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredAnswers.map((q: any, idx: number) => {
                const isCorrect = q.is_correct === 1;
                const isSkipped = q.selected_option === null;
                const correctOpt = q.correct_option?.toUpperCase();
                const studentOpt = q.selected_option?.toUpperCase();

                const optionsList = [
                  { key: 'A', text: q.option_a, text_bn: q.option_a_bn },
                  { key: 'B', text: q.option_b, text_bn: q.option_b_bn },
                  { key: 'C', text: q.option_c, text_bn: q.option_c_bn },
                  { key: 'D', text: q.option_d, text_bn: q.option_d_bn },
                ].filter(o => o.text);

                const gsData = getStructuredGSExplanation({
                  question_text: q.question_text || '',
                  option_a: q.option_a || '',
                  option_b: q.option_b || '',
                  option_c: q.option_c || '',
                  option_d: q.option_d || '',
                  correct_answer: q.correct_option || 'A',
                  explanation: q.explanation || q.short_explanation || '',
                  explanation_bn: q.explanation_bn || '',
                  important_fact: q.important_fact || '',
                  exam_tip: q.exam_tip || '',
                  subject_name: q.subject_name || '',
                  chapter_name: q.topic_name || ''
                });

                return (
                  <div
                    key={q.id || idx}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4"
                  >
                    {/* Header: Q Num & Status */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {q.subject_name || 'General Studies'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            +1.0 Marks
                          </span>
                        ) : isSkipped ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                            Unattempted
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-black flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" />
                            -0.33 Marks
                          </span>
                        )}

                        <button
                          onClick={() => setReportModalQ(q)}
                          className="text-slate-400 hover:text-rose-500 p-1 text-xs font-semibold"
                          title="Report Error"
                        >
                          <Flag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Question Text */}
                    <div className="font-semibold text-sm sm:text-base text-slate-900 leading-relaxed">
                      {lang === 'bn' && q.question_text_bn ? q.question_text_bn : q.question_text}
                    </div>

                    {/* Options */}
                    <div className="space-y-2">
                      {optionsList.map((opt) => {
                        const isThisCorrect = opt.key === correctOpt;
                        const isThisStudentChoice = opt.key === studentOpt;

                        let cardStyle = 'border-slate-200 bg-white text-slate-800';
                        if (isThisCorrect) {
                          cardStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold';
                        } else if (isThisStudentChoice && !isCorrect) {
                          cardStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                        }

                        return (
                          <div
                            key={opt.key}
                            className={`p-3 rounded-2xl border text-xs sm:text-sm flex items-center justify-between ${cardStyle}`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <span className="font-bold text-slate-500">{opt.key}.</span>
                              <span>{lang === 'bn' && opt.text_bn ? opt.text_bn : opt.text}</span>
                            </div>

                            {isThisCorrect && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-600 text-white">
                                CORRECT ANSWER
                              </span>
                            )}
                            {isThisStudentChoice && !isThisCorrect && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-600 text-white">
                                YOUR ANSWER
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Full Explanation Box */}
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                        <strong className="text-slate-900 font-extrabold block">
                          📖 Detailed Explanation &amp; Core Concept:
                        </strong>
                        <p className="text-slate-700 leading-relaxed">
                          {q.explanation || q.short_explanation || 'Comprehensive official key and explanation derived from standard textbooks.'}
                        </p>

                        {/* Bengali Explanation if present */}
                        {q.explanation_bn && (
                          <div className="pt-2 border-t border-slate-200 text-slate-800 font-bengali">
                            <strong>📌 বাংলা ব্যাখ্যা:</strong> {q.explanation_bn}
                          </div>
                        )}

                        {/* Subject Specific Fact / Formula / Grammar Corner */}
                        {gsData.subjectFacts && gsData.subjectFacts.length > 0 && (
                          <div className={`mt-2 p-2.5 rounded-xl border ${
                            gsData.badgeType === 'math' ? 'bg-blue-50/80 border-blue-200 text-blue-950' :
                            gsData.badgeType === 'english' ? 'bg-purple-50/80 border-purple-200 text-purple-950' :
                            gsData.badgeType === 'reasoning' ? 'bg-indigo-50/80 border-indigo-200 text-indigo-950' :
                            gsData.badgeType === 'pedagogy' ? 'bg-teal-50/80 border-teal-200 text-teal-950' :
                            gsData.badgeType === 'bengali' ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' :
                            'bg-amber-50 border border-amber-200 text-amber-950'
                          }`}>
                            <strong>{gsData.subjectFactTitle}</strong>
                            <ul className="pl-4 list-disc mt-1 space-y-0.5 font-medium">
                              {gsData.subjectFacts.map((f: string, fIdx: number) => (
                                <li key={fIdx}>{f}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* TAB 3: LEADERBOARD                                                      */}
        {/* ----------------------------------------------------------------------- */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">State Merit Leaderboard</h3>
                  <p className="text-xs text-slate-500">Live ranks among 1,500+ active candidates</p>
                </div>
              </div>

              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                Your Rank: #{rank}
              </span>
            </div>

            {/* Top 5 Mock Rankers */}
            <div className="space-y-3">
              {[
                { rank: 1, name: 'Debrup Mukherjee', score: 188.5, acc: '96%', district: 'Kolkata' },
                { rank: 2, name: 'Ankita Banerjee', score: 184.0, acc: '94%', district: 'North 24 Pgs' },
                { rank: 3, name: 'Sourav Ganguly', score: 179.5, acc: '92%', district: 'Howrah' },
                { rank: 4, name: 'Priyanka Sen', score: 176.0, acc: '90%', district: 'Hooghly' },
                { rank: 5, name: 'Rohan Ghosh', score: 172.5, acc: '89%', district: 'Burdwan' },
              ].map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 text-xs font-bold"
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-black ${
                      user.rank === 1 ? 'bg-amber-400 text-slate-950 shadow-xs' :
                      user.rank === 2 ? 'bg-slate-300 text-slate-950' :
                      user.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      #{user.rank}
                    </span>
                    <div>
                      <p className="font-extrabold text-slate-900">{user.name}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{user.district}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-slate-900 font-black text-sm">{user.score} M</p>
                    <p className="text-[10px] text-emerald-600">{user.acc} Accuracy</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Question Error Report Modal */}
      {reportModalQ && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="font-black text-base text-slate-900">Report Question Discrepancy</h3>
            <p className="text-xs text-slate-500">
              Found an ambiguous translation or alternative official answer key? Our subject-matter experts will audit it immediately.
            </p>

            {reportSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-sm text-slate-800">Feedback Logged for Expert Audit</h4>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Issue Type</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full mt-1 p-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  >
                    <option value="Wrong answer">Incorrect Answer Key</option>
                    <option value="Translation mistake">Bengali Translation Mismatch</option>
                    <option value="Typo in Question">Typo in Question Statement</option>
                    <option value="Ambiguous explanation">Needs clearer explanation</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Comment (Optional)</label>
                  <textarea
                    rows={3}
                    value={reportComment}
                    onChange={(e) => setReportComment(e.target.value)}
                    placeholder="Provide additional details or textbook reference..."
                    className="w-full mt-1 p-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalQ(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleReportSubmit}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
