'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowLeft, Scale, Sparkles, Award, ExternalLink } from 'lucide-react';

interface CaseLaw {
  id: string;
  case_name: string;
  year: number;
  bench: string;
  issue: string;
  judgment_principle: string;
  related_article: string;
  exam_significance: string;
}

export default function LandmarkCasesExplorer() {
  const [cases, setCases] = useState<CaseLaw[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadCases() {
      try {
        const res = await fetch(`/api/polity/cases?q=${encodeURIComponent(search)}`);
        const data = await res.json();
        if (data.success) {
          setCases(data.cases);
        }
      } catch (err) {
        console.error('Error fetching landmark cases:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCases();
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
            <Sparkles className="w-3.5 h-3.5" /> Landmark Jurisprudence
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Supreme Court: <span className="text-amber-300">Landmark Judgments</span>
          </h1>
          <p className="mt-2 text-xs md:text-sm text-blue-100 max-w-2xl font-medium">
            Core legal principles, bench compositions, and constitutional doctrines (Kesavananda, Maneka Gandhi, Berubari, Minerva Mills, Puttaswamy).
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-sm flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
          <input 
            type="text"
            placeholder="Search landmark cases (e.g. Kesavananda, Basic Structure, Privacy, Minerva Mills)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-0 focus:outline-none text-xs md:text-sm text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-2 mt-4 mb-3">
          <span>Displaying {cases.length} landmark rulings</span>
        </div>

        {/* Cases List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-36 rounded-3xl bg-white border border-slate-200 animate-pulse shadow-xs" />
            ))}
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <Scale className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <h3 className="text-base font-bold text-slate-800">No landmark cases found</h3>
            <p className="text-xs text-slate-500 mt-1">Try searching for a different case name or topic.</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {cases.map((c) => (
              <div 
                key={c.id}
                className="bg-white border border-slate-200/90 hover:border-[#2563EB]/40 rounded-3xl p-5 md:p-6 transition shadow-xs hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-blue-50 text-[#2563EB] font-black text-xs border border-blue-200">
                      {c.year}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      Bench: {c.bench}
                    </span>
                  </div>

                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    {c.exam_significance}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 mb-1.5">
                  {c.case_name}
                </h3>

                <div className="space-y-2 mt-2">
                  <div className="text-xs md:text-sm text-slate-600">
                    <strong className="text-slate-800 font-extrabold">Issue at Hand:</strong> {c.issue}
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border-l-4 border-[#2563EB] text-xs md:text-sm text-slate-800 font-medium">
                    <span className="font-extrabold text-[#1E3A8A] block text-[11px] uppercase tracking-wider mb-0.5">Ratio Decidendi / Judgment Principle:</span>
                    {c.judgment_principle}
                  </div>
                </div>

                {c.related_article && (
                  <div className="mt-3.5 flex items-center gap-2 text-xs text-slate-500 font-bold">
                    <span className="text-[11px] uppercase tracking-wider text-[#2563EB]">Constitutional Anchor:</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {c.related_article}
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
