'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import StudentSideDrawer from '@/components/layout/StudentSideDrawer';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Search,
  Award,
  Filter,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  Menu,
  FileCheck,
  Zap,
  TrendingUp,
  Percent
} from 'lucide-react';

export default function AttemptedMocksPage() {
  const [attempts, setAttempts] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/test-attempts?user_id=usr-1')
      .then(res => res.json())
      .then(data => {
        if (data?.attempts) {
          setAttempts(data.attempts);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading attempted mocks:', err);
        setLoading(false);
      });
  }, []);

  const filteredAttempts = useMemo(() => {
    return attempts.filter(att => {
      const matchesType = selectedType === 'all' || 
        (selectedType === 'full' && (att.mock_type === 'Full-Length' || !att.mock_type)) ||
        (selectedType === 'pyq' && (att.mock_type === 'Previous-Year' || att.mock_id?.includes('pyq'))) ||
        (selectedType === 'chapter' && (att.mock_type === 'Chapter-Test' || att.mock_id?.includes('chap')));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        att.mock_title?.toLowerCase().includes(q) || 
        att.exam_name?.toLowerCase().includes(q);

      return matchesType && matchesSearch;
    });
  }, [attempts, selectedType, searchQuery]);

  const totalAttempted = attempts.length;
  const avgAccuracy = attempts.length > 0 
    ? Math.round(attempts.reduce((acc, curr) => acc + (curr.accuracy || 0), 0) / attempts.length) 
    : 0;
  const bestScore = attempts.length > 0
    ? Math.max(...attempts.map(a => a.score || 0))
    : 0;

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
            <span className="font-extrabold text-sm text-white">Attempted Tests</span>
          </div>
          <Link href="/exams" className="text-xs text-teal-400 font-bold">
            All Mocks &rarr;
          </Link>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
          
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center">
                  <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block mr-3"></span>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    My Attempted Tests &amp; Analysis History
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium ml-4.5 mt-1">
                  Review all your past CBT mock test attempts, track score progression, and inspect granular question solutions and weakness breakdowns.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/exams"
                  className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-extrabold shadow-xs transition-colors"
                >
                  + Take New Mock Test
                </Link>
              </div>
            </div>

            {/* Quick Analytics Summary Strip */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center">
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Attempted</span>
                <span className="text-lg sm:text-xl font-black text-slate-900">{totalAttempted} Tests</span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Accuracy</span>
                <span className="text-lg sm:text-xl font-black text-emerald-600">{avgAccuracy}%</span>
              </div>
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Best Score</span>
                <span className="text-lg sm:text-xl font-black text-amber-600">{bestScore} Marks</span>
              </div>
            </div>
          </div>

          {/* Search & Filter Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by test name or exam..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors ${
                  selectedType === 'all'
                    ? 'bg-[#121820] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                All Attempts ({attempts.length})
              </button>
              <button
                onClick={() => setSelectedType('full')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors ${
                  selectedType === 'full'
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Full Mocks
              </button>
              <button
                onClick={() => setSelectedType('pyq')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors ${
                  selectedType === 'pyq'
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                PYQ Papers
              </button>
              <button
                onClick={() => setSelectedType('chapter')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors ${
                  selectedType === 'chapter'
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Chapter Tests
              </button>
            </div>
          </div>

          {/* Attempts List */}
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs font-bold text-slate-500">Loading attempted test history...</p>
            </div>
          ) : filteredAttempts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <FileCheck className="w-12 h-12 text-slate-300 mx-auto" />
              <div>
                <h4 className="font-black text-base text-slate-800">No Attempted Tests Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Start your exam preparation by taking a full-length mock test or chapter test.
                </p>
              </div>
              <Link
                href="/exams"
                className="inline-block px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-black shadow-xs transition-colors"
              >
                Explore Test Series
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAttempts.map((att) => {
                const dateStr = att.completed_at || att.started_at || att.created_at;
                const formattedDate = dateStr 
                  ? new Date(dateStr).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'Recent Attempt';

                return (
                  <div
                    key={att.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 hover:border-[#2563EB] hover:shadow-md transition-all space-y-4"
                  >
                    {/* Top Row: Badge & Date */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          COMPLETED
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {att.exam_name || 'West Bengal Exam'}
                        </span>
                      </div>

                      <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formattedDate}
                      </span>
                    </div>

                    {/* Test Title */}
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                        {att.mock_title}
                      </h3>
                    </div>

                    {/* 4 Score Metrics Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Score</span>
                        <span className="text-sm sm:text-base font-black text-slate-900">{att.score || 0} Marks</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Accuracy</span>
                        <span className="text-sm sm:text-base font-black text-emerald-600">{att.accuracy || 0}%</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">State Rank</span>
                        <span className="text-sm sm:text-base font-black text-[#2563EB]">#{att.rank || 1}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Percentile</span>
                        <span className="text-sm sm:text-base font-black text-purple-600">{att.percentile || 90}%</span>
                      </div>
                    </div>

                    {/* Correct / Wrong / Skipped Pill Indicators */}
                    <div className="flex items-center gap-3 text-xs font-bold pt-1">
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {att.total_correct || 0} Correct
                      </span>
                      <span className="text-rose-600 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" />
                        {att.total_wrong || 0} Incorrect
                      </span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {att.total_skipped || 0} Skipped
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href={`/test/${att.mock_id}`}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-attempt Test</span>
                      </Link>

                      <Link
                        href={`/test/${att.mock_id}/result?attemptId=${att.id}`}
                        className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>View Analysis &amp; Solutions &rarr;</span>
                      </Link>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
