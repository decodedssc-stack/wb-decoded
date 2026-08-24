'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { AlertTriangle, CheckCircle2, XCircle, Flag, Edit, ShieldCheck } from 'lucide-react';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState<string>('');
  const [correctedAns, setCorrectedAns] = useState<string>('A');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReports = () => {
    setLoading(true);
    fetch('/api/admin/reports')
      .then(res => res.json())
      .then(data => {
        if (data?.reports) setReports(data.reports);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching reports:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleResolve = async (reportId: string, status: string) => {
    try {
      await fetch('/api/admin/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report_id: reportId,
          status,
          admin_notes: resolutionNotes || 'Reviewed and corrected in database',
          corrected_answer: correctedAns,
        })
      });
      setResolvingId(null);
      setResolutionNotes('');
      fetchReports();
    } catch (e) {
      console.error('Failed to resolve report:', e);
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
              COMMUNITY DISPUTE MODERATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Reported Questions ({reports.filter(r => r.status === 'Pending').length} Pending)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Review and audit candidate reports regarding ambiguous keys, typo errors, or outdated syllabus items.
            </p>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {reports.map((rep) => (
            <div key={rep.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                    rep.status === 'Pending' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {rep.status}
                  </span>
                  <span className="font-extrabold text-navy-950 text-xs">{rep.reason}</span>
                  <span className="text-xs text-slate-400">• By {rep.user_name || 'Aspirant'}</span>
                </div>

                <span className="text-[11px] text-slate-400">{rep.created_at}</span>
              </div>

              {/* Question Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <p className="font-bold text-navy-950 text-sm">{rep.question_text}</p>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>A) {rep.option_a}</div>
                  <div>B) {rep.option_b}</div>
                  <div>C) {rep.option_c}</div>
                  <div>D) {rep.option_d}</div>
                </div>
                <span className="font-extrabold text-emerald-700 block">
                  Current Answer Key: Option {rep.correct_answer}
                </span>
              </div>

              {rep.comment && (
                <div className="p-3 bg-amber-50 rounded-xl text-amber-950 border border-amber-200 text-xs">
                  <strong>Student Comment:</strong> {rep.comment}
                </div>
              )}

              {rep.status === 'Pending' && (
                <div className="pt-2 flex flex-wrap items-center justify-end gap-2 text-xs">
                  <button
                    onClick={() => handleResolve(rep.id, 'Rejected')}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50"
                  >
                    Reject Report (Key is Correct)
                  </button>
                  <button
                    onClick={() => setResolvingId(rep.id)}
                    className="px-4 py-2 rounded-xl bg-navy-950 hover:bg-navy-900 text-amber-400 font-extrabold"
                  >
                    Apply Correction &amp; Resolve
                  </button>
                </div>
              )}

              {/* Inline resolve modal/drawer */}
              {resolvingId === rep.id && (
                <div className="p-4 rounded-2xl bg-royal-50/70 border border-royal-200 text-xs space-y-3 animate-in fade-in">
                  <span className="font-bold text-navy-950 block">Resolve &amp; Update Question:</span>
                  
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-700">Corrected Answer Key:</span>
                    <select
                      value={correctedAns}
                      onChange={(e) => setCorrectedAns(e.target.value)}
                      className="p-1.5 rounded-lg border border-slate-300 bg-white font-bold"
                    >
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    placeholder="Audit Resolution Note (e.g. Corrected Bengali option unicode)..."
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setResolvingId(null)}
                      className="px-3 py-1.5 rounded-lg text-slate-600 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleResolve(rep.id, 'Resolved')}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-bold"
                    >
                      Commit Fix
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
