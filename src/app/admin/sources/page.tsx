'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Globe2, ShieldCheck, AlertCircle, ExternalLink, Plus, CheckCircle2, RefreshCw } from 'lucide-react';

export default function AdminSourcesPage() {
  const [sources, setSources] = useState<any[]>([]);
  const [examUpdates, setExamUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSources = () => {
    setLoading(true);
    fetch('/api/admin/sources')
      .then(res => res.json())
      .then(data => {
        if (data?.sources) setSources(data.sources);
        if (data?.examUpdates) setExamUpdates(data.examUpdates);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching sources:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const handleAcknowledge = async (updateId: string) => {
    try {
      await fetch('/api/admin/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'acknowledge_update', update_id: updateId })
      });
      fetchSources();
    } catch (e) {
      console.error('Failed to acknowledge update:', e);
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
              PROVENANCE &amp; CRAWL REGISTRY
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Source Registry &amp; Exam Monitor
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Manage licensed and public domain exam authorities (WBPSC, WBPRB, WBBPE) and monitor official notices.
            </p>
          </div>
        </div>

        {/* SECTION 22: Official Exam Update Monitor Alerts */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-royal-700" />
              <h3 className="font-extrabold text-base text-navy-950">Detected Official Exam Updates</h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">Real-time Portal Scans</span>
          </div>

          <div className="space-y-3">
            {examUpdates.map((upd) => (
              <div key={upd.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold px-2 py-0.5 rounded bg-royal-100 text-royal-800 text-[10px]">
                      {upd.authority} • {upd.update_type}
                    </span>
                    <span className="text-slate-400">{upd.detected_at}</span>
                  </div>

                  <h4 className="font-bold text-navy-950 text-sm">{upd.title}</h4>
                  <p className="text-slate-600">{upd.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={upd.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center gap-1"
                  >
                    <span>View Notice</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {upd.is_acknowledged === 0 && (
                    <button
                      onClick={() => handleAcknowledge(upd.id)}
                      className="px-3 py-1.5 rounded-xl bg-navy-950 text-amber-400 font-extrabold shadow-xs"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 11: Source Registry Table */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-base text-navy-950">Configured Authoritative Sources</h3>
            <span className="text-xs text-slate-400">{sources.length} Sources Connected</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((src) => (
              <div key={src.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-royal-700 uppercase">{src.tier}</span>
                    <h4 className="font-extrabold text-navy-950 text-sm">{src.name}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {src.reliability_score}% Reliability
                  </span>
                </div>

                <div className="text-slate-600 space-y-0.5">
                  <p>Authority: <strong>{src.authority}</strong></p>
                  <p className="truncate">Crawl URL: <a href={src.url} target="_blank" rel="noreferrer" className="text-royal-600 hover:underline">{src.url}</a></p>
                  <p className="text-[11px] text-slate-400">License: {src.license_status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
