'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StudentSidebar from '@/components/layout/StudentSidebar';
import { Crosshair, Award, ArrowRight, Zap, Play, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function WeakAreasPage() {
  const router = useRouter();
  const [weakAreas, setWeakAreas] = useState<any[]>([]);
  const [generating, setGenerating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/student/weak-areas')
      .then(res => res.json())
      .then(data => {
        if (data?.weakAreas) setWeakAreas(data.weakAreas);
        setLoading(false);
      })
      .catch(err => console.error('Error fetching weak areas:', err));
  }, []);

  const handleLaunchWeakDrill = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/student/weak-areas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 'usr-1' })
      });
      const data = await res.json();
      if (data?.mockId) {
        router.push(`/test/${data.mockId}`);
      }
    } catch (e) {
      console.error('Failed to generate weak area drill:', e);
      setGenerating(false);
    }
  };

  return (
    <div className="flex">
      <StudentSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-royal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-navy-800 space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/30">
            AI Adaptive Diagnostic Engine
          </span>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Personalized Weak Areas
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Our AI engine continuously tracks your question accuracy, time bottlenecks, and repeated errors across all tests to pinpoint syllabus gaps.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleLaunchWeakDrill}
              disabled={generating}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-extrabold text-sm shadow-xl flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-navy-950" />
              <span>{generating ? 'Generating Drill...' : 'PRACTICE MY WEAK AREAS (15 Qs)'}</span>
            </button>
          </div>
        </div>

        {/* Diagnostics List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500 px-1">
            <span className="font-bold text-navy-950 text-sm">Detected Knowledge Gaps ({weakAreas.length})</span>
            <span>Sorted by Lowest Accuracy</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {weakAreas.map((w) => (
              <div key={w.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-royal-700 uppercase tracking-wider block">
                      {w.subject_name}
                    </span>
                    <h3 className="text-base font-extrabold text-navy-950 mt-0.5">{w.topic_name}</h3>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-red-50 border border-red-200 text-red-700 font-extrabold text-xs">
                    {Math.round(w.accuracy_pct)}% Accuracy
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full transition-all"
                    style={{ width: `${Math.max(15, w.accuracy_pct)}%` }}
                  ></div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 gap-2">
                  <span>Recommendation: <strong>{w.recommendation_note || 'Practice 15 targeted topic MCQs'}</strong></span>
                  <span className="font-semibold text-slate-600">{w.total_attempted} Attempts Logged</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
