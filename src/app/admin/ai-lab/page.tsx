'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Sparkles, Bot, Wand2, CheckCircle2, ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function AdminAiQuestionLabPage() {
  const [mode, setMode] = useState<'topic' | 'pyq_to_practice'>('topic');
  const [topicName, setTopicName] = useState<string>('Fundamental Rights (Articles 12-35)');
  const [difficulty, setDifficulty] = useState<string>('Moderate');
  const [count, setCount] = useState<number>(3);
  const [generating, setGenerating] = useState<boolean>(false);
  const [generatedList, setGeneratedList] = useState<any[]>([]);

  // PYQ to practice state
  const [pyqs, setPyqs] = useState<any[]>([]);
  const [selectedPyqId, setSelectedPyqId] = useState<string>('');

  useEffect(() => {
    fetch('/api/questions?is_pyq=1&limit=20')
      .then(res => res.json())
      .then(data => {
        if (data?.questions) {
          setPyqs(data.questions);
          if (data.questions.length > 0) setSelectedPyqId(data.questions[0].id);
        }
      });
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const res = await fetch('/api/admin/ai-lab/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          topic_name: topicName,
          difficulty,
          count,
          source_pyq_id: selectedPyqId,
        })
      });
      const data = await res.json();
      if (data?.questions) {
        setGeneratedList(data.questions);
      }
      setGenerating(false);
    } catch (e) {
      console.error('Failed to generate in AI Lab:', e);
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
              SYNTHETIC QUESTION CREATION &amp; PYQ ADAPTATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI Question Lab
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Synthesize exam-grade questions with verified facts. All questions auto-route to the Verification Queue.
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs max-w-md">
          <button
            onClick={() => setMode('topic')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
              mode === 'topic' ? 'bg-navy-950 text-amber-400 shadow-xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Topic-Based Generation
          </button>
          <button
            onClick={() => setMode('pyq_to_practice')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
              mode === 'pyq_to_practice' ? 'bg-navy-950 text-amber-400 shadow-xs' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            PYQ-to-Practice Generator
          </button>
        </div>

        {/* 2-Column: Generator Form vs Generated Queue Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left (6 Cols): Input Form */}
          <form onSubmit={handleGenerate} className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-navy-950 pb-2 border-b border-slate-100">
              {mode === 'topic' ? 'Topic & Scope Configuration' : 'Select Source PYQ for Variant Generation'}
            </h3>

            {mode === 'topic' ? (
              <>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Topic / Prompt</label>
                  <input
                    type="text"
                    required
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Difficulty Level</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                    >
                      <option value="Easy">Easy (Conceptual)</option>
                      <option value="Moderate">Moderate (Exam Grade)</option>
                      <option value="Hard">Hard (Statement/Assertion)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Question Count</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={count}
                      onChange={(e) => setCount(parseInt(e.target.value) || 3)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <label className="font-bold text-slate-700 block">Select Official PYQ Question:</label>
                <select
                  value={selectedPyqId}
                  onChange={(e) => setSelectedPyqId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                >
                  {pyqs.map((q) => (
                    <option key={q.id} value={q.id}>
                      [{q.exam_name} {q.pyq_year}] {q.question_text.slice(0, 70)}...
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500">
                  AI will generate 3 original variants: Conceptual Variant, Statement Analysis, and Application Drill.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={generating}
              className="w-full py-3 rounded-2xl bg-navy-950 hover:bg-navy-900 text-amber-400 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{generating ? 'Synthesizing with AI Agents...' : 'RUN AI GENERATION AGENT'}</span>
            </button>
          </form>

          {/* Right (6 Cols): Output Queue Preview */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-navy-950">Generated Output Preview</h3>
              <span className="text-xs text-slate-400">Routes to Verification Queue</span>
            </div>

            {generatedList.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <Bot className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs">
                  Generated questions will appear here and automatically enter the Admin Review Queue with quality scores.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {generatedList.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-royal-700">Question {idx + 1} ({item.difficulty})</span>
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                        {item.status}
                      </span>
                    </div>
                    <p className="font-bold text-navy-950">{item.question_text}</p>
                    <span className="text-[11px] text-emerald-700 font-bold block">
                      Answer: Option {item.correct_answer}
                    </span>
                  </div>
                ))}

                <Link
                  href="/admin/verification"
                  className="block w-full text-center py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-extrabold text-xs shadow-xs transition-colors"
                >
                  Open in Verification Queue &rarr;
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
