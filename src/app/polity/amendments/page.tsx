'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowLeft, Layers, Sparkles, Calendar, ShieldCheck } from 'lucide-react';

interface Amendment {
  id: string;
  amendment_num: string;
  year: number;
  title: string;
  major_change: string;
  related_articles: string;
  exam_importance: string;
}

export default function LandmarkAmendmentsExplorer() {
  const [amendments, setAmendments] = useState<Amendment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadAmendments() {
      try {
        const res = await fetch(`/api/polity/amendments?q=${encodeURIComponent(search)}`);
        const data = await res.json();
        if (data.success) {
          setAmendments(data.amendments);
        }
      } catch (err) {
        console.error('Error fetching amendments:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAmendments();
  }, [search]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-24 select-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#1D4ED8] text-white px-4 py-10 shadow-md">
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/polity"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition mb-4 border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Polity Hub
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" /> 1st to 106th Amendment Acts
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Landmark Constitutional <span className="text-amber-300">Amendments</span>
          </h1>
          <p className="mt-2 text-xs md:text-sm text-blue-100 max-w-2xl font-medium">
            Chronological breakdown of key constitutional amendments, affected articles, and major judicial impacts for civil service exams.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
          <input 
            type="text"
            placeholder="Search amendments (e.g. 42nd, 44th, 73rd, 86th, 106th, GST, EWS)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-0 focus:outline-none text-xs md:text-sm text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-2 mt-4 mb-3">
          <span>Displaying {amendments.length} landmark amendments</span>
        </div>

        {/* Amendments List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 rounded-3xl bg-white border border-slate-200 animate-pulse shadow-xs" />
            ))}
          </div>
        ) : amendments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <Layers className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <h3 className="text-base font-bold text-slate-800">No amendments found</h3>
            <p className="text-xs text-slate-500 mt-1">Try searching for a different number or term.</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {amendments.map((amd) => (
              <div 
                key={amd.id}
                className="bg-white border border-slate-200/90 hover:border-[#2563EB]/40 rounded-3xl p-5 md:p-6 transition shadow-xs hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-blue-50 text-[#2563EB] font-black text-xs border border-blue-200">
                      {amd.amendment_num}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {amd.year}
                    </span>
                  </div>

                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    {amd.exam_importance}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 mb-1.5">
                  {amd.title}
                </h3>

                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
                  {amd.major_change}
                </p>

                {amd.related_articles && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 font-bold">
                    <span className="text-[11px] uppercase tracking-wider text-[#2563EB]">Affected Articles:</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {amd.related_articles}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
