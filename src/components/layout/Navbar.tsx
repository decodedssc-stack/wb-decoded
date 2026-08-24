'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Award, 
  Flame, 
  Sparkles, 
  ShieldAlert, 
  Search, 
  ChevronDown, 
  Bell, 
  Layers, 
  Sliders, 
  CheckCircle2, 
  ExternalLink,
  BookOpen,
  User,
  GraduationCap,
  Zap,
  Globe
} from 'lucide-react';
import AuthOnboardingModal from '@/components/auth/AuthOnboardingModal';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname?.startsWith('/admin');
  const isTestEngine = pathname?.startsWith('/test/');

  if (isTestEngine) {
    return null;
  }

  const [selectedExam, setSelectedExam] = useState({
    id: 'exam-wbcs',
    name: 'WBCS (Exe) Prelims',
    slug: 'wbcs-exam'
  });
  const [showExamDropdown, setShowExamDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/exams')
      .then(res => res.json())
      .then(data => {
        if (data?.exams) {
          setExams(data.exams);
        }
      })
      .catch(err => console.error('Failed to load exams list:', err));
  }, []);

  return (
    <header className="hidden lg:block sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Exact WB Decoded Logo & Platform Title */}
          <div className="flex items-center space-x-3">
            <Link href={isAdmin ? "/admin" : "/"} className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-sm text-white font-black group-hover:scale-105 transition-transform">
                <span className="text-sm font-black tracking-tight">WB</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight text-slate-900 flex items-center gap-1.5 leading-tight">
                  <span>WB DECODED</span>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200">
                    {isAdmin ? 'OPS' : 'PASS PRO'}
                  </span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
                  West Bengal&apos;s #1 Exam Prep Platform
                </span>
              </div>
            </Link>
          </div>

          {/* Center Target Exam Selector (Exact WB Decoded Pill) */}
          {!isAdmin ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowExamDropdown(!showExamDropdown)}
                className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-colors shadow-xs"
              >
                <div className="w-2 h-2 rounded-full bg-[#00A389] animate-pulse"></div>
                <span className="text-slate-500 font-normal">Target Exam:</span>
                <span className="font-bold text-slate-900">{selectedExam.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showExamDropdown && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Target Examination
                  </div>
                  {exams.map((exam) => (
                    <button
                      key={exam.id}
                      onClick={() => {
                        setSelectedExam({ id: exam.id, name: exam.name, slug: exam.slug });
                        setShowExamDropdown(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        selectedExam.id === exam.id ? 'bg-[#E6F7F4] font-bold text-[#007A66]' : 'text-slate-700'
                      }`}
                    >
                      <span>{exam.name}</span>
                      {selectedExam.id === exam.id && <CheckCircle2 className="w-4 h-4 text-[#00A389]" />}
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1 px-3 py-1">
                    <Link
                      href="/exams"
                      onClick={() => setShowExamDropdown(false)}
                      className="text-xs text-[#00A389] font-bold hover:underline flex items-center gap-1"
                    >
                      Browse All 900 WB Mocks &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>All 6 Automation Services Online</span>
            </div>
          )}

          {/* Right Action Icons & Mode Switcher */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            
            {/* Streak & XP (Student) */}
            {!isAdmin && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 text-xs font-black" title="Daily Practice Streak">
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                  <span>14d</span>
                </div>
                <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold" title="Pass Pro Status">
                  <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                  <span>PASS PRO</span>
                </div>
              </div>
            )}

            {/* Admin Switcher CTA */}
            {isAdmin ? (
              <Link
                href="/"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#00A389] hover:bg-[#007A66] text-white text-xs font-bold shadow-xs transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5 text-white" />
                <span>Student Portal</span>
              </Link>
            ) : (
              <Link
                href="/admin"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Sliders className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden sm:inline">Admin</span> Ops
              </Link>
            )}

            {/* Notifications Button */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-sm text-slate-900">Notifications</span>
                    <span className="text-[11px] text-[#00A389] font-bold cursor-pointer">Mark all read</span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs">
                      <p className="font-bold text-teal-900">⚡ 100 WBCS Prelims Mocks Live</p>
                      <p className="text-slate-600 mt-0.5">Complete full-length series updated with 2024-2025 standard.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Just now</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-xs">
                      <p className="font-bold text-amber-900">📌 WBPSC Food SI &amp; Clerkship Series Active</p>
                      <p className="text-slate-600 mt-0.5">100 Full-length simulation tests open for practice.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">2 hours ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Login/Goals Trigger */}
            <button
              onClick={() => setShowOnboarding(true)}
              className="flex items-center space-x-1.5 p-1 pl-2 pr-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 text-xs font-bold text-slate-800"
              title="Personalize Goals & Language"
            >
              <div className="w-6 h-6 rounded-lg bg-[#00A389] text-white font-black text-[11px] flex items-center justify-center">
                DR
              </div>
              <span className="hidden sm:inline">Goals &amp; Lang</span>
            </button>

          </div>
        </div>
      </div>

      {/* Onboarding & Goal Personalization Modal */}
      <AuthOnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onSuccess={(user) => {
          console.log('User preferences saved:', user);
        }}
      />
    </header>
  );
}
