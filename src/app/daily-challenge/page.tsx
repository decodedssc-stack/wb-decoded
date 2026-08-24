'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import { Zap, Clock, Award, CheckCircle2, Play, Users, Flame } from 'lucide-react';

export default function DailyChallengePage() {
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/student/daily-challenge')
      .then(res => res.json())
      .then(data => {
        if (data?.challenge) setChallenge(data.challenge);
        setLoading(false);
      })
      .catch(err => console.error('Error fetching daily challenge:', err));
  }, []);

  return (
    <div className="flex">
      <StudentSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-navy-950 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-navy-950 text-amber-400">
              DAILY POWER BOOSTER
            </span>
            <span className="text-xs font-bold text-navy-900 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-current" />
              Maintains 14-Day Streak
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
              {challenge?.title || "Today's Daily Challenge (20 Aug 2026)"}
            </h1>
            <p className="text-xs sm:text-sm text-navy-900 mt-1 max-w-2xl font-medium">
              15 high-yield mixed questions covering West Bengal Current Affairs, Indian National Movement, Polity, and Applied Science.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href={`/test/${challenge?.id || 'mock-wbcs-full-001'}`}
              className="px-6 py-3 rounded-2xl bg-navy-950 hover:bg-navy-900 text-amber-400 font-extrabold text-sm shadow-xl flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-amber-400" />
              <span>START DAILY TEST NOW</span>
            </Link>
          </div>
        </div>

        {/* Challenge Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold text-navy-950">15 Minutes</span>
              <span className="text-xs text-slate-500 block">Strict Test Timer</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold text-navy-950">15 Questions</span>
              <span className="text-xs text-slate-500 block">15 Marks Total</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold text-navy-950">648 Aspirants</span>
              <span className="text-xs text-slate-500 block">Attempted Today</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
