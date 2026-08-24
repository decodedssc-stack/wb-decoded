'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowLeft, FileText, Sparkles, Filter, Bookmark, ExternalLink, ShieldCheck } from 'lucide-react';

interface Article {
  id: string;
  article_num: string;
  part_num: string;
  title: string;
  provision: string;
  key_point: string;
  exam_priority: string;
  related_chapter_slug: string;
}

export default function ConstitutionArticleExplorer() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPart, setSelectedPart] = useState('');
  const [parts, setParts] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState('');

  useEffect(() => {
    async function loadArticles() {
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.set('q', search);
        if (selectedPart) queryParams.set('part', selectedPart);
        if (selectedPriority) queryParams.set('priority', selectedPriority);

        const res = await fetch(`/api/polity/articles?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success) {
          setArticles(data.articles);
          if (data.parts && parts.length === 0) {
            setParts(data.parts);
          }
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, [search, selectedPart, selectedPriority]);

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
            <Sparkles className="w-3.5 h-3.5" /> High-Yield Constitutional Bank
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Constitution Articles <span className="text-amber-300">1 to 395 Explorer</span>
          </h1>
          <p className="mt-2 text-xs md:text-sm text-blue-100 max-w-2xl font-medium">
            Searchable constitutional provisions, key exam takeaways, and Part-wise breakdowns for civil service aspirants.
          </p>
        </div>
      </div>

      {/* Search and Filters Strip */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white p-4 md:p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by article number, subject, or keywords (e.g. Article 21, President, Writs)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#2563EB] focus:outline-none text-xs md:text-sm text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedPart}
              onChange={(e) => setSelectedPart(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#2563EB]"
            >
              <option value="">All Constitutional Parts</option>
              {parts.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#2563EB]"
            >
              <option value="">All Priorities</option>
              <option value="VERY HIGH">🔥 Very High Priority</option>
              <option value="HIGH">⭐ High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-2 mt-4 mb-3">
          <span>Found {articles.length} constitutional articles</span>
          {search && <span>Query: &ldquo;{search}&rdquo;</span>}
        </div>

        {/* Articles List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-white border border-slate-200 animate-pulse shadow-xs" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <FileText className="w-12 h-12 mx-auto text-slate-300 mb-2" />
            <h3 className="text-base font-bold text-slate-800">No articles matched your criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try refining your search query.</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {articles.map((art) => (
              <div 
                key={art.id}
                className="bg-white border border-slate-200/90 hover:border-[#2563EB]/40 rounded-3xl p-5 md:p-6 transition shadow-xs hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-blue-50 text-[#2563EB] font-black text-xs border border-blue-200">
                      {art.article_num}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {art.part_num}
                    </span>
                  </div>

                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                    art.exam_priority === 'VERY HIGH'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : art.exam_priority === 'HIGH'
                      ? 'bg-blue-50 text-blue-800 border border-blue-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {art.exam_priority} PRIORITY
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 mb-1.5">
                  {art.title}
                </h3>

                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
                  {art.provision}
                </p>

                {art.key_point && (
                  <div className="mt-3.5 p-3 rounded-2xl bg-amber-50/80 border-l-4 border-amber-500 text-xs text-amber-950 font-semibold leading-relaxed">
                    <span className="font-extrabold uppercase text-[10px] text-amber-800 block">Exam Takeaway:</span>
                    {art.key_point}
                  </div>
                )}

                {art.related_chapter_slug && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/polity/${art.related_chapter_slug}`}
                      className="text-xs font-extrabold text-[#2563EB] hover:underline flex items-center gap-1"
                    >
                      Read full chapter context &rarr;
                    </Link>
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
