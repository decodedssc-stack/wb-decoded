'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import StudentSideDrawer from '@/components/layout/StudentSideDrawer';
import {
  Menu,
  Search,
  ChevronDown,
  Sparkles,
  Award,
  BookOpen,
  FileCheck,
  Zap,
  Trophy,
  ArrowRight,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Flame,
  Target,
  Play,
  FileText,
  Star,
  Users,
  Compass,
  Check
} from 'lucide-react';

export default function StudentHomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [featuredMocks, setFeaturedMocks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('enrolled');
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetch('/api/mocks?mock_type=Full-Length&is_published=1&limit=10')
      .then(res => res.json())
      .then(data => {
        if (data?.mocks) setFeaturedMocks(data.mocks);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const enrolledSeries = [
    {
      id: 'wbcs-2025-26',
      title: 'WBCS (Exe) Prelims Mock Test Series 2025-26 (New)',
      total: 200,
      solved: 2,
      icon: '🏛️',
      color: 'from-[#F5F3FF] to-[#EDE9FE]',
      href: '/exams/exam-wbcs'
    },
    {
      id: 'wbp-si-constable',
      title: 'WB Police SI & Constable Practice Series (CBT 1 + CBT 2)',
      total: 150,
      solved: 0,
      icon: '👮',
      color: 'from-[#EFF6FF] to-[#DBEAFE]',
      href: '/exams/exam-wbp-si'
    },
    {
      id: 'wb-food-si',
      title: 'WBPSC Food SI Official Test Series 2025-26 (Full Mocks)',
      total: 100,
      solved: 1,
      icon: '🌾',
      color: 'from-[#ECFDF5] to-[#D1FAE5]',
      href: '/exams/exam-food-si'
    },
    {
      id: 'wb-clerkship',
      title: 'WBPSC Clerkship Stage-I (Prelims) Complete Mock Series',
      total: 100,
      solved: 0,
      icon: '📋',
      color: 'from-[#FFFBEB] to-[#FEF3C7]',
      href: '/exams/exam-clerkship'
    }
  ];

  return (
    <div className="flex bg-[#F8FAFC] min-h-[calc(100vh-4rem)] w-full overflow-x-hidden select-none">
      
      {/* Desktop Sidebar (hidden on mobile) */}
      <StudentSidebar />

      {/* Mobile Slide-out Drawer matching Screenshot 1 */}
      <StudentSideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="flex-1 w-full pb-28 lg:pb-12">
        
        {/* ========================================================================= */}
        {/* 1. TOP MOBILE BLACK HEADER BAR (media_1787396337223.jpg)                  */}
        {/* ========================================================================= */}
        <header 
          className="bg-[#121820] text-white px-4 py-3 sticky top-0 z-30 shadow-md flex items-center justify-between"
          style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)' }}
        >
          
          <div className="flex items-center space-x-3">
            {/* Hamburger Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-1 rounded-lg hover:bg-slate-800 text-white transition-colors"
              title="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* My Exams Selector Pill */}
            <Link 
              href="/exams"
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <span className="font-bold text-xs sm:text-sm text-white">My Exams</span>
              <span className="w-4 h-4 rounded-full bg-[#2563EB] text-white text-[10px] font-black flex items-center justify-center">
                3
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>

          {/* Right: Search & Candidate Avatar with online status */}
          <div className="flex items-center space-x-3">
            <Link
              href="/pyq"
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="relative focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563EB] to-teal-400 text-white font-bold text-xs flex items-center justify-center border border-slate-700 shadow-xs">
                AI
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5 border-2 border-[#121820]"></span>
            </button>
          </div>

        </header>

        {/* ========================================================================= */}
        {/* 2. MAIN MOBILE-FIRST CONTENT CANVAS                                      */}
        {/* ========================================================================= */}
        <main className="p-3.5 sm:p-6 max-w-6xl mx-auto space-y-6">
          
          {/* Hero Promo Banner Slider matching Screenshot 4 */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#1E3A8A] text-white p-5 sm:p-7 shadow-lg border border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              
              <div className="sm:col-span-8 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-500/30 border border-blue-400/40 text-blue-300 font-extrabold text-[10px] tracking-wider uppercase">
                    WB DECODED • OFFICIAL
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-amber-300 tracking-tight leading-tight uppercase drop-shadow-xs">
                  MISSION OFFICER 2026
                </h2>
                
                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed max-w-md">
                  Your Complete Journey to West Bengal Government Services Starts Here. Official Pattern Mock Series &amp; 20-Year Archive.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <div className="p-2 px-3 rounded-xl bg-black/40 border border-white/10 backdrop-blur-xs flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">YEARLY PASS PRO</span>
                    <span className="text-sm sm:text-base font-black text-amber-400">₹499</span>
                    <span className="text-[10px] text-slate-500 line-through">₹1999</span>
                  </div>

                  <Link
                    href="/plans"
                    className="px-5 py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <span>Explore Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Banner Right Metric Box */}
              <div className="sm:col-span-4 hidden sm:flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
                <span className="text-2xl font-black text-teal-300">900+ Exams</span>
                <span className="text-xs text-slate-300 font-semibold">1,000+ Full Mocks</span>
                <span className="text-[11px] text-amber-400 font-bold">74 Official PYPs</span>
              </div>

            </div>

            {/* Carousel Indicator Dots */}
            <div className="flex items-center justify-center space-x-1.5 pt-4">
              <span className="w-6 h-1.5 rounded-full bg-[#2563EB]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* SPECIAL: INDIAN POLITY COMPLETE CHAPTER-WISE COURSE BANNER               */}
          {/* ======================================================================= */}
          <Link
            href="/polity"
            className="block p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#1D4ED8] text-white border border-blue-300/30 shadow-md hover:shadow-xl transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-2xs">
                  <Sparkles className="w-3 h-3" /> Complete Standard Study Book
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-200 transition-colors flex items-center gap-2">
                  <span>🏛️ Indian Polity Master Study Book</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/20 text-white font-extrabold border border-white/30">16 CHAPTERS</span>
                </h3>
                <p className="text-xs text-blue-100 max-w-xl line-clamp-2 font-medium">
                  16 Master Chapters, 395+ Articles, 106 Amendments, Landmark Case Laws & 240+ Practice MCQs designed for WBCS, WBP, and SSC exams.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition flex items-center gap-1.5 shadow-sm">
                  Open Book <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          {/* ======================================================================= */}
          {/* 3. ENROLLED TEST SERIES (Horizontal Scroll with Blue Left Line Accent)   */}
          {/* ======================================================================= */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-1.5 h-4.5 bg-[#2563EB] rounded-full inline-block mr-2.5"></span>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Enrolled Test Series
                </h3>
              </div>

              <Link href="/exams" className="text-xs text-[#2563EB] font-bold hover:underline">
                View All
              </Link>
            </div>

            {/* Horizontal Scroll Test Series Cards */}
            <div className="flex space-x-3.5 overflow-x-auto scrollbar-none pb-2 pt-0.5">
              {enrolledSeries.map((series) => (
                <Link
                  key={series.id}
                  href={series.href}
                  className={`min-w-[240px] sm:min-w-[280px] max-w-[280px] p-4 rounded-2xl bg-gradient-to-br ${series.color} border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 shrink-0 group`}
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-lg shadow-2xs">
                      {series.icon}
                    </div>

                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug group-hover:text-[#2563EB] transition-colors line-clamp-2">
                      {series.title}
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>{series.solved}/{series.total}</span>
                    <span className="text-[#2563EB] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      Resume &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ======================================================================= */}
          {/* 4. CIRCLE ACTION ROW (Study Notes, Live Test, Quizzes, Rankers, PYPs)  */}
          {/* ======================================================================= */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="grid grid-cols-5 gap-2 sm:gap-4 text-center">
              
              {/* 1. Study Notes */}
              <Link href="/study-notes" className="flex flex-col items-center space-y-1.5 group">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-pink-50 border border-pink-200 text-pink-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[8px] font-black px-1 rounded bg-rose-500 text-white absolute -top-1 -right-1 shadow-xs">
                    NEW
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-700 leading-tight">
                  Study Notes
                </span>
              </Link>

              {/* 2. Live Test */}
              <Link href="/exams" className="flex flex-col items-center space-y-1.5 group">
                <div className="w-12 h-12 rounded-full bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  <FileCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 leading-tight">
                  Live Test
                </span>
              </Link>

              {/* 3. Live Quizzes */}
              <Link href="/daily-challenge" className="flex flex-col items-center space-y-1.5 group">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-[8px] font-black px-1 rounded bg-emerald-500 text-white absolute -top-1 -right-1 shadow-xs">
                    FREE
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-700 leading-tight">
                  Live Quizzes
                </span>
              </Link>

              {/* 4. Rankers Tests */}
              <Link href="/leaderboard" className="flex flex-col items-center space-y-1.5 group">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <span className="text-[8px] font-black px-1 rounded bg-rose-500 text-white absolute -top-1 -right-1 shadow-xs">
                    NEW
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-700 leading-tight">
                  Rankers Tests
                </span>
              </Link>

              {/* 5. Prev. Papers */}
              <Link href="/pyq" className="flex flex-col items-center space-y-1.5 group">
                <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 leading-tight">
                  Prev. Papers
                </span>
              </Link>

            </div>
          </div>

          {/* ======================================================================= */}
          {/* DEDICATED ATTEMPTED TESTS QUICK ACCESS                                 */}
          {/* ======================================================================= */}
          <div className="bg-gradient-to-r from-[#121820] to-[#1E293B] rounded-2xl p-4 sm:p-5 text-white shadow-md flex items-center justify-between border border-slate-800">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                <FileCheck className="w-6 h-6 text-[#60A5FA]" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-white flex items-center gap-1.5">
                  <span>My Attempted Tests &amp; Analysis</span>
                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-500 text-white">HISTORY</span>
                </h4>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Review your scores, solution explanations &amp; weak areas
                </p>
              </div>
            </div>

            <Link
              href="/attempted-mocks"
              className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-black shrink-0 transition-colors shadow-xs"
            >
              View &rarr;
            </Link>
          </div>

          {/* ======================================================================= */}
          {/* 5. SUGGESTED NEXT TEST (Matching Screenshot 3)                          */}
          {/* ======================================================================= */}
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="w-1.5 h-4.5 bg-[#2563EB] rounded-full inline-block mr-2.5"></span>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                Suggested Next Test
              </h3>
            </div>

            {featuredMocks.length > 0 ? (
              featuredMocks.slice(0, 3).map((mock) => (
                <div key={mock.id} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3 hover:border-[#2563EB] transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                      {mock.is_free ? 'FREE' : 'PRO'}
                    </span>
                    <Link
                      href={`/test/${mock.id}`}
                      className="text-xs font-bold text-[#2563EB] hover:underline"
                    >
                      Start Test
                    </Link>
                  </div>

                  <div>
                    <h4 className="font-black text-sm sm:text-base text-slate-900">
                      {mock.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      {mock.total_questions || 200} Qs • {mock.duration_minutes || 150} Mins • {mock.total_marks || 200.0} Marks
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Official CBT Pattern • Bilingual</span>
                    <Link href={`/test/${mock.id}`} className="text-[#2563EB] font-bold flex items-center gap-1">
                      <span>Enter CBT Exam</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-2">
                <p className="text-xs font-bold text-slate-500">Loading recommended CBT mock tests...</p>
              </div>
            )}
          </div>

        </main>

        {/* ======================================================================= */}
        {/* 6. FLOATING AI ASSISTANT FAB BUTTON (Screenshot 4)                      */}
        {/* ======================================================================= */}
        <Link
          href="/doubts"
          title="Ask AI Doubt Solver"
          className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-40 w-13 h-13 rounded-full bg-gradient-to-tr from-[#2563EB] to-teal-400 text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all ring-4 ring-blue-100"
        >
          <Sparkles className="w-7 h-7 text-white fill-white" />
        </Link>

      </div>

    </div>
  );
}
