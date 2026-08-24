'use client';

import React, { useState } from 'react';
import StudentSidebar from '@/components/layout/StudentSidebar';
import {
  Trophy,
  Medal,
  Flame,
  Sparkles,
  Shield,
  User,
  EyeOff,
  MapPin,
  TrendingUp,
  Award,
  Filter,
  CheckCircle2
} from 'lucide-react';

const WB_DISTRICTS = [
  'All West Bengal',
  'Kolkata',
  'North 24 Parganas',
  'South 24 Parganas',
  'Howrah',
  'Hooghly',
  'Purba Medinipur',
  'Paschim Medinipur',
  'Bankura',
  'Purulia',
  'Paschim Bardhaman',
  'Purba Bardhaman',
  'Birbhum',
  'Nadia',
  'Murshidabad',
  'Malda',
  'Uttar Dinajpur',
  'Dakshin Dinajpur',
  'Jalpaiguri',
  'Alipurduar',
  'Cooch Behar',
  'Darjeeling',
  'Kalimpong',
  'Jhargram'
];

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All West Bengal');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  const mockLeaderboard = [
    { rank: 1, name: 'Subhasish Roy', district: 'Kolkata', target: 'WBCS (Exe) Group A', score: 188.5, tests: 24, accuracy: 94.2, streak: 32, isUser: false },
    { rank: 2, name: 'Priyanka Sen', district: 'Howrah', target: 'WBCS (Exe) Group A', score: 184.0, tests: 21, accuracy: 91.8, streak: 26, isUser: false },
    { rank: 3, name: 'Anirban Das', district: 'Purba Bardhaman', target: 'WBCS Prelims', score: 179.5, tests: 19, accuracy: 89.4, streak: 18, isUser: false },
    { rank: 4, name: 'Sneha Banerjee', district: 'North 24 Parganas', target: 'WBCS Group A', score: 175.5, tests: 18, accuracy: 88.0, streak: 22, isUser: false },
    { rank: 5, name: 'Puja Das', district: 'North 24 Parganas', target: 'WBPSC Food SI', score: 171.0, tests: 16, accuracy: 86.5, streak: 19, isUser: false },
    { rank: 6, name: isAnonymous ? 'Aspirant #8492' : 'Debjit Roy (You)', district: 'North 24 Parganas', target: 'WBCS Prelims', score: 168.0, tests: 14, accuracy: 84.5, streak: 14, isUser: true },
    { rank: 7, name: 'Rahul Chatterjee', district: 'Hooghly', target: 'WB Police SI', score: 164.5, tests: 13, accuracy: 83.2, streak: 9, isUser: false },
    { rank: 8, name: 'Subhajit Paul', district: 'Nadia', target: 'WBPSC Clerkship', score: 160.0, tests: 11, accuracy: 81.0, streak: 5, isUser: false },
    { rank: 9, name: 'Ananya Mukherjee', district: 'South 24 Parganas', target: 'Primary TET', score: 156.5, tests: 10, accuracy: 79.5, streak: 12, isUser: false },
    { rank: 10, name: 'Sourav Mondal', district: 'Bankura', target: 'WBCS Prelims', score: 151.0, tests: 9, accuracy: 77.4, streak: 7, isUser: false },
  ];

  const filteredAspirants = mockLeaderboard.filter(a => {
    if (selectedDistrict === 'All West Bengal') return true;
    return a.district === selectedDistrict;
  });

  return (
    <div className="flex bg-cream-50 min-h-[calc(100vh-4rem)] w-full overflow-x-hidden">
      <StudentSidebar />

      <div className="flex-1 p-3.5 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 max-w-5xl w-full overflow-x-hidden">
        
        {/* ========================================================================= */}
        {/* DISTRICT & STATE MERIT HERO BANNER                                        */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-5 sm:p-8 text-white shadow-xl border border-navy-850 space-y-5 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-radial-gradient from-gold-500/15 to-transparent pointer-events-none"></div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 flex items-center gap-1.5 shadow-inner">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>WEST BENGAL MERIT RANKING ARENA</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              15,480 Active Bengal Aspirants
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                State &amp; District Leaderboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Benchmark your speed, accuracy, and mock test percentiles against serious competitors across all 23 districts of West Bengal.
              </p>
            </div>

            {/* Privacy toggle */}
            <button
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors flex items-center gap-2 border self-start lg:self-auto ${
                isAnonymous ? 'bg-amber-500 text-navy-950 border-amber-500 font-black' : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
              }`}
            >
              <EyeOff className="w-4 h-4" />
              <span>{isAnonymous ? 'Incognito Mode Active' : 'Hide Public Name'}</span>
            </button>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center gap-2 pt-1">
            {['daily', 'weekly', 'monthly'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t as any)}
                className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  timeframe === t ? 'bg-amber-500 text-navy-950 shadow-md' : 'bg-navy-900/90 text-slate-300 hover:bg-navy-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CANDIDATE MERIT STANDING CARDS                                            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">West Bengal State Rank</span>
              <span className="text-xl font-black text-navy-950 mt-0.5 block">#24 <span className="text-xs font-normal text-slate-400">/ 15.4K</span></span>
              <span className="text-[10px] text-emerald-600 font-bold">Top 2.8% Merit Standing 🟢</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-royal-50 text-royal-600 flex items-center justify-center border border-royal-200 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">District Standing</span>
              <span className="text-xl font-black text-navy-950 mt-0.5 block">#3 <span className="text-xs font-normal text-slate-400">in North 24 Pgs</span></span>
              <span className="text-[10px] text-royal-700 font-bold">District Podium Zone 🥈</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average Accuracy</span>
              <span className="text-xl font-black text-navy-950 mt-0.5 block">84.5%</span>
              <span className="text-[10px] text-purple-600 font-bold">+3.2% vs Bengal Average</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DISTRICT FILTER & RANK TABLE                                              */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5 sm:p-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-black text-base sm:text-lg text-navy-950 flex items-center gap-2">
                <Medal className="w-5 h-5 text-amber-500" />
                <span>{selectedDistrict} Merit Standings</span>
              </h3>
              <p className="text-xs text-slate-500">Live updated scores from recent mock test attempts</p>
            </div>

            {/* 23 Bengal District Selector Dropdown */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 font-bold text-xs text-navy-950 shadow-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {WB_DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold text-[10px]">
                  <th className="pb-3 text-center">Rank</th>
                  <th className="pb-3">Aspirant Name</th>
                  <th className="pb-3">District</th>
                  <th className="pb-3 text-center">Tests</th>
                  <th className="pb-3 text-center">Accuracy</th>
                  <th className="pb-3 text-center">Streak</th>
                  <th className="pb-3 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAspirants.map((user, idx) => (
                  <tr
                    key={user.rank}
                    className={`transition-colors ${
                      user.isUser
                        ? 'bg-amber-50/80 font-bold border-l-4 border-l-amber-500'
                        : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <td className="py-3.5 text-center font-black text-xs text-navy-950">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                    </td>

                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-navy-950 text-amber-400 font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                          {user.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-extrabold text-navy-950 text-xs sm:text-sm flex items-center gap-1.5">
                            <span>{user.name}</span>
                            {user.isUser && (
                              <span className="text-[9px] bg-amber-500 text-navy-950 px-1.5 py-0.2 rounded font-black">YOU</span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500">{user.target}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        📍 {user.district}
                      </span>
                    </td>

                    <td className="py-3.5 text-center font-bold text-slate-700">
                      {user.tests}
                    </td>

                    <td className="py-3.5 text-center font-black text-emerald-700">
                      {user.accuracy}%
                    </td>

                    <td className="py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 text-amber-600 font-black">
                        <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{user.streak}d</span>
                      </span>
                    </td>

                    <td className="py-3.5 text-right font-black text-navy-950 text-sm">
                      {user.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}
