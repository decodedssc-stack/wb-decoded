'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Copy, CheckCircle, XCircle, ArrowRight, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminDuplicateCenterPage() {
  const [pairs, setPairs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDuplicates = () => {
    setLoading(true);
    fetch('/api/admin/duplicates')
      .then(res => res.json())
      .then(data => {
        if (data?.pairs) setPairs(data.pairs);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching duplicates:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDuplicates();
  }, []);

  const handleResolve = async (pair: any, action: string) => {
    try {
      await fetch('/api/admin/duplicates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          question_a_id: pair.questionA.id,
          question_b_id: pair.questionB.id,
        })
      });
      fetchDuplicates();
    } catch (e) {
      console.error(`Duplicate resolution ${action} failed:`, e);
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
              VECTOR &amp; TRIGRAM DEDUPLICATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Question Duplicate Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Review and resolve near-duplicate or overlapping questions before they appear in student mocks.
            </p>
          </div>

          <button
            onClick={fetchDuplicates}
            className="p-2.5 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-300 hover:text-white border border-navy-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Duplicate Pairs Comparison */}
        {pairs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200 shadow-xs">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy-950">No Duplicate Questions Found</h3>
            <p className="text-xs text-slate-400 mt-1">All indexed questions have unique question stems and options.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pairs.map((pair) => (
              <div key={pair.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
                
                {/* Similarity Badge Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black">
                      Similarity: {pair.similarity}%
                    </span>
                    <span className="text-xs font-bold text-slate-600">{pair.type}</span>
                  </div>

                  <span className="text-xs text-slate-400 font-mono">
                    Pair: {pair.questionA.id} &harr; {pair.questionB.id}
                  </span>
                </div>

                {/* Side-by-side comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Question A */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-extrabold text-[10px] uppercase text-royal-700">Question A (Existing Bank)</span>
                    <p className="font-bold text-navy-950 text-sm">{pair.questionA.question_text}</p>
                    <div className="text-slate-600 space-y-1 pt-1">
                      <div>A) {pair.questionA.option_a}</div>
                      <div>B) {pair.questionA.option_b}</div>
                      <div>C) {pair.questionA.option_c}</div>
                      <div>D) {pair.questionA.option_d}</div>
                    </div>
                    <span className="font-extrabold text-emerald-700 block pt-1">
                      Correct Key: Option {pair.questionA.correct_answer}
                    </span>
                  </div>

                  {/* Question B */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="font-extrabold text-[10px] uppercase text-amber-700">Question B (Incoming Match)</span>
                    <p className="font-bold text-navy-950 text-sm">{pair.questionB.question_text}</p>
                    <div className="text-slate-600 space-y-1 pt-1">
                      <div>A) {pair.questionB.option_a}</div>
                      <div>B) {pair.questionB.option_b}</div>
                      <div>C) {pair.questionB.option_c}</div>
                      <div>D) {pair.questionB.option_d}</div>
                    </div>
                    <span className="font-extrabold text-emerald-700 block pt-1">
                      Correct Key: Option {pair.questionB.correct_answer}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-end gap-2 text-xs">
                  <button
                    onClick={() => handleResolve(pair, 'keep_both')}
                    className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 font-bold text-slate-700"
                  >
                    Keep Both Separate
                  </button>
                  <button
                    onClick={() => handleResolve(pair, 'reject_b')}
                    className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold"
                  >
                    Reject Question B
                  </button>
                  <button
                    onClick={() => handleResolve(pair, 'merge')}
                    className="px-5 py-2 rounded-xl bg-navy-950 hover:bg-navy-900 text-amber-400 font-extrabold shadow-xs"
                  >
                    Merge &amp; Archive Duplicate
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
