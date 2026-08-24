'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { BarChart4, AlertTriangle, TrendingDown, TrendingUp, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/questions?limit=100')
      .then(res => res.json())
      .then(data => {
        if (data?.questions) setQuestions(data.questions);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching questions for analytics:', err);
        setLoading(false);
      });
  }, []);

  const hardQuestions = questions.filter(q => q.attempt_count > 0 && (q.correct_count / q.attempt_count) < 0.45);
  const highAccuracyQuestions = questions.filter(q => q.attempt_count > 0 && (q.correct_count / q.attempt_count) > 0.85);

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-950 rounded-3xl p-6 sm:p-8 text-white border border-navy-800 shadow-xl">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              QUESTION QUALITY &amp; ACCURACY AUDIT
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Question Quality Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Automatically flag questions with outlier accuracy rates, high skip percentages, or dispute flags.
            </p>
          </div>
        </div>

        {/* 2-Column: Low Accuracy Outliers vs Mastery Questions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Low Accuracy / Tricky Questions */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <h3 className="font-extrabold text-base text-navy-950">Low Accuracy Traps (&lt; 45%)</h3>
              </div>
              <span className="text-xs text-slate-400">{hardQuestions.length} Items</span>
            </div>

            <div className="space-y-3">
              {hardQuestions.map((q) => {
                const acc = Math.round((q.correct_count / (q.attempt_count || 1)) * 100);

                return (
                  <div key={q.id} className="p-3.5 rounded-2xl bg-red-50/50 border border-red-100 text-xs space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-extrabold text-red-700">{acc}% Student Accuracy</span>
                      <span className="text-slate-500 font-semibold">{q.attempt_count} Attempts</span>
                    </div>
                    <p className="font-bold text-navy-950">{q.question_text}</p>
                    <span className="text-[10px] text-slate-500 block">
                      Subject: {q.subject_name} • Key: Option {q.correct_answer}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High Accuracy / Universal Questions */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-base text-navy-950">High Accuracy Questions (&gt; 85%)</h3>
              </div>
              <span className="text-xs text-slate-400">{highAccuracyQuestions.length} Items</span>
            </div>

            <div className="space-y-3">
              {highAccuracyQuestions.map((q) => {
                const acc = Math.round((q.correct_count / (q.attempt_count || 1)) * 100);

                return (
                  <div key={q.id} className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-extrabold text-emerald-700">{acc}% Student Accuracy</span>
                      <span className="text-slate-500 font-semibold">{q.attempt_count} Attempts</span>
                    </div>
                    <p className="font-bold text-navy-950">{q.question_text}</p>
                    <span className="text-[10px] text-slate-500 block">
                      Subject: {q.subject_name} • Key: Option {q.correct_answer}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
