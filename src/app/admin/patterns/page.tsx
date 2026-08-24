'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Sliders, Save, CheckCircle2, ShieldCheck, Layers, Award, AlertCircle } from 'lucide-react';

export default function AdminPatternsPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string>('exam-wbcs');
  const [pattern, setPattern] = useState<any>({
    total_questions: 200,
    total_marks: 200,
    duration_mins: 150,
    marks_per_correct: 1.0,
    negative_marking: 0.33,
    passing_marks: 125.0,
    section_timing_enabled: 0,
    pyq_allowed: 1,
    current_affairs_allowed: 1,
    duplicate_policy: 'no_repeat',
    subject_distribution: [
      { subject: 'English Composition', count: 25, marks: 25 },
      { subject: 'General Science', count: 25, marks: 25 },
      { subject: 'Current Affairs & WB Schemes', count: 25, marks: 25 },
      { subject: 'History of India', count: 25, marks: 25 },
      { subject: 'Geography of India & West Bengal', count: 25, marks: 25 },
      { subject: 'Indian Polity & Economy', count: 25, marks: 25 },
      { subject: 'Indian National Movement', count: 25, marks: 25 },
      { subject: 'General Mental Ability', count: 25, marks: 25 },
    ],
    difficulty_distribution: { Easy: 30, Moderate: 50, Hard: 20 }
  });

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/exams')
      .then(res => res.json())
      .then(data => {
        if (data?.exams) {
          setExams(data.exams);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedExamId) {
      setLoading(true);
      fetch(`/api/patterns?exam_id=${selectedExamId}`)
        .then(res => res.json())
        .then(data => {
          if (data?.pattern) {
            const p = data.pattern;
            setPattern({
              ...p,
              subject_distribution: p.subject_distribution_json ? JSON.parse(p.subject_distribution_json) : pattern.subject_distribution,
              difficulty_distribution: p.difficulty_distribution_json ? JSON.parse(p.difficulty_distribution_json) : pattern.difficulty_distribution
            });
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching pattern:', err);
          setLoading(false);
        });
    }
  }, [selectedExamId]);

  const handleSavePattern = async () => {
    try {
      await fetch('/api/patterns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...pattern,
          exam_id: selectedExamId,
        })
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to save pattern:', e);
    }
  };

  const handleSubjectCountChange = (index: number, newCount: number) => {
    const updated = [...pattern.subject_distribution];
    updated[index].count = newCount;
    updated[index].marks = newCount * pattern.marks_per_correct;
    setPattern({ ...pattern, subject_distribution: updated });
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-950 rounded-3xl p-6 sm:p-8 text-white border border-navy-800 shadow-xl">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              CONFIGURABLE BLUEPRINT ENGINE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Exam Pattern Builder
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Define question count, duration, negative marking, and subject distribution without hardcoding.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/40">
                <CheckCircle2 className="w-3.5 h-3.5" /> Pattern Saved
              </span>
            )}

            <button
              onClick={handleSavePattern}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-extrabold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save &amp; Activate Pattern</span>
            </button>
          </div>
        </div>

        {/* Exam Picker Strip */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-slate-500">Configure Pattern For:</span>
            <select
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 font-extrabold text-xs bg-white text-navy-950 focus:outline-none focus:ring-2 focus:ring-royal-500/20"
            >
              {exams.map((exam) => (
                <option key={exam.id} value={exam.id}>{exam.name} ({exam.authority})</option>
              ))}
            </select>
          </div>
        </div>

        {/* 2-Column: Core Numeric Rules vs Distributions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left: Primary Exam Parameters */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-navy-950 pb-2 border-b border-slate-100">
              Core Exam Scoring &amp; Duration Rules
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Total Questions</label>
                <input
                  type="number"
                  value={pattern.total_questions}
                  onChange={(e) => setPattern({ ...pattern, total_questions: parseInt(e.target.value) || 100 })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  value={pattern.duration_mins}
                  onChange={(e) => setPattern({ ...pattern, duration_mins: parseInt(e.target.value) || 90 })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Marks per Correct (+)</label>
                <input
                  type="number"
                  step="0.1"
                  value={pattern.marks_per_correct}
                  onChange={(e) => setPattern({ ...pattern, marks_per_correct: parseFloat(e.target.value) || 1.0 })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Negative Marking (-)</label>
                <input
                  type="number"
                  step="0.01"
                  value={pattern.negative_marking}
                  onChange={(e) => setPattern({ ...pattern, negative_marking: parseFloat(e.target.value) || 0.33 })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold text-red-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Total Marks</label>
                <input
                  type="number"
                  value={pattern.total_marks}
                  onChange={(e) => setPattern({ ...pattern, total_marks: parseFloat(e.target.value) || 200 })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Passing Target Marks</label>
                <input
                  type="number"
                  value={pattern.passing_marks}
                  onChange={(e) => setPattern({ ...pattern, passing_marks: parseFloat(e.target.value) || 120 })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>
            </div>

            {/* Toggle Rules */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <span className="font-bold text-slate-800">Allow PYQs in Generated Mocks</span>
                <input
                  type="checkbox"
                  checked={!!pattern.pyq_allowed}
                  onChange={(e) => setPattern({ ...pattern, pyq_allowed: e.target.checked ? 1 : 0 })}
                  className="w-4 h-4 rounded text-royal-600"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <span className="font-bold text-slate-800">Allow Current Affairs Questions</span>
                <input
                  type="checkbox"
                  checked={!!pattern.current_affairs_allowed}
                  onChange={(e) => setPattern({ ...pattern, current_affairs_allowed: e.target.checked ? 1 : 0 })}
                  className="w-4 h-4 rounded text-royal-600"
                />
              </label>
            </div>
          </div>

          {/* Right: Subject Weights Distribution */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-navy-950 pb-2 border-b border-slate-100">
              Subject Distribution Blueprint
            </h3>

            <div className="space-y-2.5">
              {pattern.subject_distribution?.map((item: any, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs gap-3">
                  <span className="font-bold text-slate-800 flex-1 truncate">{item.subject}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={item.count}
                      onChange={(e) => handleSubjectCountChange(idx, parseInt(e.target.value) || 0)}
                      className="w-16 p-1 rounded-lg border border-slate-300 text-center font-bold"
                    />
                    <span className="text-slate-400 font-semibold">Qs</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Difficulty Calibration */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Difficulty Calibration Spread</span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 font-bold text-emerald-800">
                  Easy: {pattern.difficulty_distribution?.Easy || 30}%
                </div>
                <div className="p-2.5 rounded-xl bg-royal-50 border border-royal-200 font-bold text-royal-800">
                  Moderate: {pattern.difficulty_distribution?.Moderate || 50}%
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 font-bold text-amber-900">
                  Hard: {pattern.difficulty_distribution?.Hard || 20}%
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
