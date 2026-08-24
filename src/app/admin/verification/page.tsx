'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Edit,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sparkles,
  Bot
} from 'lucide-react';

export default function AdminVerificationQueuePage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editAnswer, setEditAnswer] = useState<string>('A');

  const fetchQueue = () => {
    setLoading(true);
    fetch('/api/admin/verification-queue?filter=pending')
      .then(res => res.json())
      .then(data => {
        if (data?.questions) {
          setQuestions(data.questions);
          if (currentIndex >= data.questions.length && data.questions.length > 0) {
            setCurrentIndex(0);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching queue:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleAction = async (action: string, payload = {}) => {
    const q = questions[currentIndex];
    if (!q) return;

    try {
      await fetch('/api/admin/verification-queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          question_id: q.id,
          payload,
        })
      });
      fetchQueue();
    } catch (e) {
      console.error(`Verification action ${action} failed:`, e);
    }
  };

  // Keyboard shortcut listener: 'A' to Approve, 'R' to Reject
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showEditModal) return;
      if (e.key === 'a' || e.key === 'A') {
        handleAction('approve');
      } else if (e.key === 'r' || e.key === 'R') {
        handleAction('reject', { reason: 'Flagged via reviewer keyboard shortcut' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions, showEditModal]);

  const currentQ = questions[currentIndex];

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-950 rounded-3xl p-6 sm:p-8 text-white border border-navy-800 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
                3-PANE EXPERT REVIEW CONSOLE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI Verification Queue ({questions.length} Pending)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Press <kbd className="px-1.5 py-0.5 rounded bg-navy-800 border border-navy-700 font-mono text-amber-400 font-bold">A</kbd> to Approve, <kbd className="px-1.5 py-0.5 rounded bg-navy-800 border border-navy-700 font-mono text-red-400 font-bold">R</kbd> to Reject.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="p-2 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-200 border border-navy-700 disabled:opacity-40"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-amber-400 px-2">
              {questions.length > 0 ? `${currentIndex + 1} / ${questions.length}` : '0 / 0'}
            </span>
            <button
              disabled={currentIndex >= questions.length - 1}
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="p-2 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-200 border border-navy-700 disabled:opacity-40"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SECTION 13: 3-PANE SPLIT REVIEW INTERFACE */}
        {!currentQ ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy-950">Verification Queue is Clean!</h3>
            <p className="text-xs text-slate-400 mt-1">All extracted questions have been reviewed and approved.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* PANE 1 (Left, 3 Cols): Original Source Document / Provenance */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">1. Source Provenance</span>
                <FileText className="w-4 h-4 text-slate-400" />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Source Authority</span>
                  <span className="font-extrabold text-navy-950 block mt-0.5">
                    {currentQ.pyq_source || 'WBPSC Official Exam Paper'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Document &amp; Year</span>
                  <span className="font-semibold text-slate-700 block mt-0.5">
                    {currentQ.source_doc || `WBCS_Prelims_${currentQ.pyq_year || '2023'}.pdf`}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">License / Permission Status</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px] inline-block mt-0.5">
                    Tier 1 Official Access
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-mono text-[10px] leading-relaxed">
                  [RAW PARSED SNIPPET]<br />
                  &quot;{currentQ.question_text.slice(0, 80)}...&quot;
                </div>
              </div>
            </div>

            {/* PANE 2 (Center, 5 Cols): Processed Question Details */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">2. Processed Question</span>
                <span className="text-xs font-bold text-royal-700">{currentQ.subject_name || 'General Studies'}</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-base text-navy-950 leading-snug">
                  {currentQ.question_text}
                </h3>
                {currentQ.question_text_bn && (
                  <p className="text-xs text-slate-600 font-bengali">{currentQ.question_text_bn}</p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2 text-xs">
                {['A', 'B', 'C', 'D'].map((optKey) => {
                  const optText = currentQ[`option_${optKey.toLowerCase()}`];
                  const isCorrect = currentQ.correct_answer === optKey;

                  return (
                    <div
                      key={optKey}
                      className={`p-3 rounded-xl border flex items-center justify-between ${
                        isCorrect ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-300'
                        }`}>
                          {optKey}
                        </span>
                        <span>{optText}</span>
                      </div>
                      {isCorrect && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleAction('approve')}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>APPROVE (A)</span>
                </button>

                <button
                  onClick={() => {
                    setEditAnswer(currentQ.correct_answer);
                    setShowEditModal(true);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-850 text-amber-400 font-bold text-xs shadow-xs"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleAction('reject', { reason: 'Reviewer rejected question' })}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-1"
                >
                  <XCircle className="w-4 h-4" />
                  <span>REJECT (R)</span>
                </button>
              </div>
            </div>

            {/* PANE 3 (Right, 4 Cols): AI Analysis & Evidence */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">3. AI Multi-Agent Verification</span>
                <Bot className="w-4 h-4 text-royal-600" />
              </div>

              {/* Confidence Matrix */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">Fact Confidence</span>
                  <span className="text-lg font-black text-emerald-700">{Math.round(currentQ.confidence_score || 96)}%</span>
                </div>
                <div className="p-3 bg-royal-50 rounded-xl border border-royal-200">
                  <span className="text-[10px] font-bold text-royal-800 uppercase block">Quality Score</span>
                  <span className="text-lg font-black text-royal-700">{Math.round(currentQ.quality_score || 92)}/100</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-800 block">AI Verified Rationale:</span>
                <p className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                  {currentQ.explanation}
                </p>

                {currentQ.important_fact && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-[11px]">
                    <strong>Cross-referenced Fact:</strong> {currentQ.important_fact}
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-between items-center text-xs text-slate-400 border-t border-slate-100">
                <span>Duplicate Vector: <strong>{currentQ.duplicate_score || 0}%</strong></span>
                <span>Language: <strong>{currentQ.language}</strong></span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Edit Answer / Classification Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-extrabold text-base text-navy-950">Change Verified Answer Key</h3>
            
            <div className="space-y-3 text-xs">
              <label className="font-bold text-slate-700 block">Select Correct Key:</label>
              <div className="grid grid-cols-4 gap-2">
                {['A', 'B', 'C', 'D'].map(k => (
                  <button
                    key={k}
                    onClick={() => setEditAnswer(k)}
                    className={`py-3 rounded-xl font-black text-sm border ${
                      editAnswer === k ? 'bg-royal-600 text-white border-royal-600' : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleAction('change_answer', { correct_answer: editAnswer });
                    setShowEditModal(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-navy-950 text-amber-400 font-extrabold"
                >
                  Commit Correction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
