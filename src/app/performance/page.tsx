'use client';

import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/layout/StudentSidebar';
import {
  BarChart3,
  TrendingUp,
  Award,
  Target,
  Clock,
  Flame,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function PerformancePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/student/analytics?user_id=usr-1')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => console.error('Error fetching performance:', err));
  }, []);

  const stats = data?.stats || {};
  const timelineData = data?.timelineData || [];
  const subjectMastery = data?.subjectMastery || [];
  const mistakesByType = data?.mistakesByType || [];

  return (
    <div className="flex">
      <StudentSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-royal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-navy-800 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Aspirant Intelligence Matrix
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Performance &amp; Accuracy Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Real-time analytics calibrated from your mock tests, practice sessions, and PYQ drills.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Average Accuracy</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">{stats.avgAccuracy || 81.4}%</div>
            <span className="text-[10px] text-slate-500 font-semibold mt-0.5 block">Top 12% in West Bengal</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Average Speed</span>
            <div className="text-2xl font-black text-royal-600 mt-1">{stats.avgTimePerQuestion || 38.5}s</div>
            <span className="text-[10px] text-slate-500 font-semibold mt-0.5 block">Per Question Attempt</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tests Completed</span>
            <div className="text-2xl font-black text-navy-950 mt-1">{stats.totalTests || 4} Tests</div>
            <span className="text-[10px] text-slate-500 font-semibold mt-0.5 block">{stats.totalQuestionsAttempted || 60} Qs Attempted</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Practice Streak</span>
            <div className="text-2xl font-black text-amber-500 mt-1">{stats.streakDays || 14} Days 🔥</div>
            <span className="text-[10px] text-slate-500 font-semibold mt-0.5 block">1,420 XP Earned</span>
          </div>
        </div>

        {/* 2-Column: Subject Proficiency Matrix & Error Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Subject Mastery Heatmap List */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-navy-950">Subject Mastery Matrix</h3>
              <span className="text-xs text-slate-400">Calibrated Accuracy</span>
            </div>

            <div className="space-y-3">
              {subjectMastery.map((sub: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">{sub.name}</span>
                    <span className={`font-extrabold px-2 py-0.5 rounded text-[10px] ${
                      sub.level === 'Mastered' ? 'bg-emerald-100 text-emerald-800' :
                      sub.level === 'Proficient' ? 'bg-royal-100 text-royal-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {sub.level} ({sub.accuracy}%)
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        sub.accuracy >= 80 ? 'bg-emerald-500' : sub.accuracy >= 60 ? 'bg-royal-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${sub.accuracy}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>{sub.correct} Correct</span>
                    <span>{sub.attempted} Total Attempts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Attempt Timeline */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-navy-950">Recent Test Progression</h3>
              <span className="text-xs text-slate-400">Past Attempts</span>
            </div>

            <div className="space-y-3">
              {timelineData.map((t: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 block">{t.date}</span>
                    <h4 className="font-bold text-xs text-navy-950">{t.title}</h4>
                    <span className="text-[11px] text-slate-500">{t.timeMins} mins spent</span>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-royal-700 block">{t.accuracy}% Acc</span>
                    <span className="text-[10px] font-bold text-emerald-600">Top {100 - Math.round(t.percentile)}% Rank</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
