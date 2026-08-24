'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudentSidebar from '@/components/layout/StudentSidebar';
import {
  BookmarkCheck,
  Play,
  CheckCircle2,
  RotateCcw,
  Tag,
  BookOpen,
  ChevronDown,
  Sparkles,
  Award,
  Zap,
  Clock,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Brain
} from 'lucide-react';

export default function MistakeBookPage() {
  const router = useRouter();
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [activeStage, setActiveStage] = useState<'stage1' | 'stage2' | 'mastered' | 'all'>('stage1');
  const [activeType, setActiveType] = useState<string>('all');
  const [generating, setGenerating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMistakes = () => {
    fetch(`/api/student/mistakes`)
      .then(res => res.json())
      .then(data => {
        if (data?.mistakes) setMistakes(data.mistakes);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching mistakes:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMistakes();
  }, []);

  const handleAdvanceMastery = async (item: any) => {
    const nextStatus = item.status === 'Need Revision' ? 'Understood' : 'Need Revision';
    try {
      await fetch('/api/student/mistakes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, status: nextStatus })
      });
      fetchMistakes();
    } catch (e) {
      console.error('Failed to update mistake status:', e);
    }
  };

  const handleLaunchRevisionTest = async (stage: string = 'all') => {
    setGenerating(true);
    try {
      const res = await fetch('/api/student/mistakes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 'usr-1', stage })
      });
      const data = await res.json();
      if (data?.mockId) {
        router.push(`/test/${data.mockId}`);
      } else {
        alert(data?.error || 'No questions available for this revision stage.');
        setGenerating(false);
      }
    } catch (e) {
      console.error('Failed to generate revision test:', e);
      setGenerating(false);
    }
  };

  // Group mistakes into Spaced Repetition Stages
  const stage1Mistakes = mistakes.filter(m => m.status === 'Need Revision' && (m.review_count === 0 || !m.review_count));
  const stage2Mistakes = mistakes.filter(m => m.status === 'Need Revision' && m.review_count >= 1);
  const masteredMistakes = mistakes.filter(m => m.status === 'Understood');

  const filteredMistakes = mistakes.filter(m => {
    if (activeStage === 'stage1') return m.status === 'Need Revision' && (m.review_count === 0 || !m.review_count);
    if (activeStage === 'stage2') return m.status === 'Need Revision' && m.review_count >= 1;
    if (activeStage === 'mastered') return m.status === 'Understood';
    return true;
  }).filter(m => {
    if (activeType === 'all') return true;
    return m.mistake_type === activeType;
  });

  const totalMistakes = mistakes.length;
  const masteryPercentage = totalMistakes > 0 ? Math.round((masteredMistakes.length / totalMistakes) * 100) : 100;

  return (
    <div className="flex bg-cream-50 min-h-[calc(100vh-4rem)] w-full overflow-x-hidden">
      <StudentSidebar />

      <div className="flex-1 p-3.5 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 max-w-5xl w-full overflow-x-hidden">
        
        {/* ========================================================================= */}
        {/* SPACED REPETITION HERO BANNER                                             */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 rounded-3xl p-5 sm:p-8 text-white shadow-xl border border-navy-850 space-y-5 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-full bg-radial-gradient from-gold-500/10 to-transparent pointer-events-none"></div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/30 flex items-center gap-1.5 shadow-inner">
              <Brain className="w-3.5 h-3.5 text-amber-400" />
              <span>3-STAGE SPACED REPETITION VAULT</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {masteryPercentage}% Error Elimination Score
            </span>
          </div>

          <div className="space-y-1 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Mistake Mastery &amp; Retention Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Never repeat an exam error. Our algorithmic memory cycle schedules your incorrect questions across 3 intervals until concepts are 100% retained.
            </p>
          </div>

          {/* Action Trigger */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleLaunchRevisionTest('stage1')}
              disabled={generating || (stage1Mistakes.length === 0 && stage2Mistakes.length === 0)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-navy-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-navy-950" />
              <span>{generating ? 'Compiling Drill...' : 'LAUNCH ACTIVE MISTAKE DRILL'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3 SPACED-REPETITION INTERVAL TIERS                                        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          
          <button
            onClick={() => setActiveStage('stage1')}
            className={`text-left p-5 rounded-3xl border transition-all ${
              activeStage === 'stage1'
                ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-400/20'
                : 'bg-white/80 border-slate-200 hover:border-amber-300 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                LEVEL 1: DAY 1
              </span>
              <span className="text-lg font-black text-navy-950">{stage1Mistakes.length}</span>
            </div>
            <h4 className="font-extrabold text-sm text-navy-950 mt-2">Immediate Recall</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Fresh errors requiring immediate 24h review</p>
          </button>

          <button
            onClick={() => setActiveStage('stage2')}
            className={`text-left p-5 rounded-3xl border transition-all ${
              activeStage === 'stage2'
                ? 'bg-white border-royal-400 shadow-md ring-2 ring-royal-400/20'
                : 'bg-white/80 border-slate-200 hover:border-royal-300 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-royal-700 bg-royal-50 px-2 py-0.5 rounded-md border border-royal-200">
                LEVEL 2: DAY 4
              </span>
              <span className="text-lg font-black text-navy-950">{stage2Mistakes.length}</span>
            </div>
            <h4 className="font-extrabold text-sm text-navy-950 mt-2">Consolidation Test</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Medium-term retention drill after 3 days</p>
          </button>

          <button
            onClick={() => setActiveStage('mastered')}
            className={`text-left p-5 rounded-3xl border transition-all ${
              activeStage === 'mastered'
                ? 'bg-white border-emerald-400 shadow-md ring-2 ring-emerald-400/20'
                : 'bg-white/80 border-slate-200 hover:border-emerald-300 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                LEVEL 3: MASTERED
              </span>
              <span className="text-lg font-black text-emerald-700">{masteredMistakes.length}</span>
            </div>
            <h4 className="font-extrabold text-sm text-navy-950 mt-2">100% Retained</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Concepts permanently mastered and archived</p>
          </button>

        </div>

        {/* ========================================================================= */}
        {/* ERROR STREAM & EXPANDABLE SOLUTIONS                                       */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
            <div>
              <h3 className="font-black text-lg text-navy-950">
                Questions in {activeStage === 'stage1' ? 'Level 1 (Day 1)' : activeStage === 'stage2' ? 'Level 2 (Day 4)' : activeStage === 'mastered' ? 'Mastered Archive' : 'All Vault'}
              </h3>
              <p className="text-xs text-slate-500">Showing {filteredMistakes.length} questions</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Filter Error Type:</span>
              <select
                value={activeType}
                onChange={(e) => setActiveType(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-xs"
              >
                <option value="all">All Error Types</option>
                <option value="Concept Gap">Concept Gap</option>
                <option value="Silly Mistake">Silly Mistake</option>
                <option value="Time Pressure">Time Pressure</option>
                <option value="Guesswork">Guesswork</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-400 font-bold bg-white rounded-3xl border border-slate-200">
              Loading Mistake Vault...
            </div>
          ) : filteredMistakes.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-black text-base text-navy-950">No Errors in this Stage!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You have completely cleared this revision interval. Attempt more mock tests to test your knowledge.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMistakes.map((m, idx) => (
                <div
                  key={m.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 hover:border-slate-300 shadow-xs space-y-4 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-navy-950 text-amber-400 font-black text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-extrabold text-xs text-navy-950">{m.subject_name || 'General Studies'}</span>
                      {m.topic_name && (
                        <span className="text-xs text-slate-400 font-medium">• {m.topic_name}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {m.mistake_type || 'Concept Gap'}
                      </span>

                      <button
                        onClick={() => handleAdvanceMastery(m)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          m.status === 'Understood'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{m.status === 'Understood' ? 'Mastered ✓' : 'Mark as Mastered'}</span>
                      </button>
                    </div>
                  </div>

                  <p className="font-bold text-navy-950 text-sm sm:text-base leading-snug">
                    {m.question_text}
                  </p>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {(['A', 'B', 'C', 'D'] as const).map((key) => {
                      const optText = m[`option_${key.toLowerCase()}`];
                      const isCorrect = m.correct_answer === key;

                      return (
                        <div
                          key={key}
                          className={`p-3 rounded-xl border flex items-center gap-2 ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-950'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] ${
                              isCorrect ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-300 text-slate-600'
                            }`}
                          >
                            {key}
                          </span>
                          <span>{optText}</span>
                          {isCorrect && (
                            <span className="ml-auto text-[10px] font-black uppercase text-emerald-700">Correct Key</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Solution and Elimination Guide */}
                  <div className="p-4 rounded-2xl bg-royal-50/70 border border-royal-200/80 text-xs space-y-2">
                    <div className="flex items-center gap-1.5 text-royal-950 font-bold">
                      <BookOpen className="w-4 h-4 text-royal-700" />
                      <span>Conceptual Solution &amp; Fix:</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {m.explanation}
                    </p>
                    {m.important_fact && (
                      <div className="pt-1.5 text-[11px] text-amber-900 font-semibold">
                        💡 <strong>Memory Booster:</strong> {m.important_fact}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
