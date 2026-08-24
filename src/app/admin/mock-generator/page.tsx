'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import {
  Wand2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Play,
  Award,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export default function AdminMockGeneratorPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>('exam-wbcs');
  const [mockType, setMockType] = useState<string>('Full Length');
  const [titlePrefix, setTitlePrefix] = useState<string>('WBCS Prelims High-Yield Mock');
  const [totalQuestions, setTotalQuestions] = useState<number>(20);
  const [durationMins, setDurationMins] = useState<number>(120);
  const [difficulty, setDifficulty] = useState<string>('Mixed');
  const [pyqRatio, setPyqRatio] = useState<number>(0.5);
  const [bulkCount, setBulkCount] = useState<number>(1);
  const [duplicatePolicy, setDuplicatePolicy] = useState<string>('no_repeat');

  const [generating, setGenerating] = useState<boolean>(false);
  const [generatedMocks, setGeneratedMocks] = useState<any[]>([]);
  const [validationReport, setValidationReport] = useState<any>(null);

  useEffect(() => {
    fetch('/api/exams')
      .then(res => res.json())
      .then(data => {
        if (data?.exams) setExams(data.exams);
      });
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setValidationReport(null);

    try {
      const res = await fetch('/api/mocks/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam_id: selectedExam,
          mock_type: mockType,
          title_prefix: titlePrefix,
          total_questions: totalQuestions,
          duration_mins: durationMins,
          difficulty,
          pyq_ratio: pyqRatio,
          bulk_count: bulkCount,
          duplicate_policy: duplicatePolicy,
          auto_publish: false,
        })
      });
      const data = await res.json();
      if (data?.mocks) {
        setGeneratedMocks(data.mocks);

        // Run validation on first generated mock
        if (data.mocks.length > 0) {
          const valRes = await fetch('/api/mocks/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mock_id: data.mocks[0].id })
          });
          const valData = await valRes.json();
          setValidationReport(valData);
        }
      }
      setGenerating(false);
    } catch (e) {
      console.error('Error generating mock:', e);
      setGenerating(false);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-950 rounded-3xl p-6 sm:p-8 text-white border border-navy-800 shadow-xl">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              PATTERN-AWARE GENERATION &amp; BULK ENGINE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Master Mock Test Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Generate single or bulk sets with controlled overlap, calibrated difficulties, and automatic 12-point validation.
            </p>
          </div>
        </div>

        {/* 2-Column Generator Form & Validation Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left (7 Cols): Mock Generator Configuration Form */}
          <form onSubmit={handleGenerate} className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-navy-950 pb-2 border-b border-slate-100">
              Mock Parameters &amp; Distribution Blueprint
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Examination</label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                >
                  {exams.map((exam) => (
                    <option key={exam.id} value={exam.id}>{exam.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mock Type</label>
                <select
                  value={mockType}
                  onChange={(e) => setMockType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                >
                  <option value="Full Length">Full Length (Pattern Calibrated)</option>
                  <option value="PYQ">Official PYQ Composite Paper</option>
                  <option value="PYQ + Original">PYQ + Original Mix</option>
                  <option value="Chapter-wise">Chapter-wise Practice Mock</option>
                  <option value="Topic-wise">Topic-wise Speed Drill</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Mock Title Prefix</label>
              <input
                type="text"
                required
                value={titlePrefix}
                onChange={(e) => setTitlePrefix(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Questions Count</label>
                <input
                  type="number"
                  value={totalQuestions}
                  onChange={(e) => setTotalQuestions(parseInt(e.target.value) || 20)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Duration (Mins)</label>
                <input
                  type="number"
                  value={durationMins}
                  onChange={(e) => setDurationMins(parseInt(e.target.value) || 120)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                >
                  <option value="Mixed">Mixed (Exam Pattern)</option>
                  <option value="Easy">Easy (Foundation)</option>
                  <option value="Moderate">Moderate (Standard)</option>
                  <option value="Hard">Hard (Advanced Drill)</option>
                </select>
              </div>
            </div>

            {/* Bulk Generator & Overlap Settings */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="font-bold text-navy-950 block">Bulk Generation &amp; Overlap Policy</span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Bulk Sets to Generate</label>
                  <select
                    value={bulkCount}
                    onChange={(e) => setBulkCount(parseInt(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-300 bg-white font-bold"
                  >
                    <option value={1}>Generate 1 Mock Test</option>
                    <option value={5}>Generate 5 Mocks (Mock 01-05)</option>
                    <option value={10}>Generate 10 Mocks (Controlled Overlap)</option>
                    <option value={20}>Generate 20 Mocks (Full Series)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Question Repeat Policy</label>
                  <select
                    value={duplicatePolicy}
                    onChange={(e) => setDuplicatePolicy(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-300 bg-white font-bold"
                  >
                    <option value="no_repeat">Strict: Zero repeats across batch</option>
                    <option value="repeat_after_5_mocks">Controlled: Repeat after 5 sets</option>
                    <option value="allow_repeats">Randomized: Standard probability</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full py-3.5 rounded-2xl bg-navy-950 hover:bg-navy-900 text-amber-400 font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Wand2 className="w-4 h-4" />
              <span>{generating ? 'Synthesizing Mocks & Validating...' : `GENERATE ${bulkCount > 1 ? `${bulkCount} MOCKS` : 'MOCK TEST'}`}</span>
            </button>
          </form>

          {/* Right (5 Cols): SECTION 16 Automated Mock Validation Engine Report */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-navy-950">12-Point Validation Engine</h3>
              {validationReport && (
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  validationReport.isValid ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {validationReport.status}
                </span>
              )}
            </div>

            {!validationReport ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs">
                  Generate a mock to automatically run the 12-point integrity and balance checker before publishing.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className={`p-3 rounded-xl border text-xs font-semibold ${
                  validationReport.isValid ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'
                }`}>
                  {validationReport.summary}
                </div>

                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {validationReport.checks?.map((c: any, idx: number) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                      {c.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-bold text-navy-950 block">{c.rule}</span>
                        <span className="text-[11px] text-slate-600">{c.message}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {generatedMocks.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-emerald-700 font-bold block mb-2">
                      ✅ {generatedMocks.length} mock test(s) created and registered in database.
                    </span>
                    <a
                      href={`/test/${generatedMocks[0]?.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full py-2.5 text-center rounded-xl bg-royal-600 hover:bg-royal-500 text-white font-bold text-xs shadow-xs"
                    >
                      Preview Generated Mock &rarr;
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
