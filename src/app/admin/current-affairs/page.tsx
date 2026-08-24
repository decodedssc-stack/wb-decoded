'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { Newspaper, Plus, CheckCircle2, Sparkles, Globe, Calendar, Bot } from 'lucide-react';

export default function AdminCurrentAffairsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [headline, setHeadline] = useState<string>('');
  const [category, setCategory] = useState<string>('West Bengal Schemes');
  const [summary, setSummary] = useState<string>('');
  const [keyFacts, setKeyFacts] = useState<string>('');
  const [generating, setGenerating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchItems = () => {
    setLoading(true);
    fetch('/api/admin/current-affairs')
      .then(res => res.json())
      .then(data => {
        if (data?.items) setItems(data.items);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching current affairs:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    try {
      await fetch('/api/admin/current-affairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          headline,
          category,
          summary,
          key_facts: keyFacts,
          generate_mcq: true,
        })
      });
      setHeadline('');
      setSummary('');
      setKeyFacts('');
      setGenerating(false);
      fetchItems();
    } catch (e) {
      console.error('Error creating CA item:', e);
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
              STATE &amp; NATIONAL RECRUITMENT FEED
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Current Affairs Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Collect state government initiatives, national milestones, and auto-synthesize daily 10–20 high-yield MCQs.
            </p>
          </div>
        </div>

        {/* 2-Column: Event Ingestion Form & Feed List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left (5 Cols): Ingestion Form */}
          <form onSubmit={handleCreate} className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3.5 text-xs">
            <h3 className="font-extrabold text-base text-navy-950 pb-2 border-b border-slate-100">
              Ingest Event &amp; Auto-Generate MCQ
            </h3>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Headline / Milestone *</label>
              <input
                type="text"
                required
                placeholder="e.g. WB Budget 2024 Enhances Lakshmir Bhandar Allowance"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
              >
                <option value="West Bengal Schemes">West Bengal Schemes &amp; Policies</option>
                <option value="National Governance">National Governance &amp; Economy</option>
                <option value="Infrastructure">Infrastructure &amp; Transport</option>
                <option value="Awards & Honors">Awards &amp; Honours</option>
                <option value="Science & Environment">Science, Tech &amp; Environment</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Summary / Context</label>
              <textarea
                rows={2}
                placeholder="Details of the announcement..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Key Facts for Exam</label>
              <input
                type="text"
                placeholder="e.g. Effective April 2024; ₹1000 for Gen, ₹1200 for SC/ST"
                value={keyFacts}
                onChange={(e) => setKeyFacts(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-amber-400 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{generating ? 'Processing & Generating MCQ...' : 'Ingest & Generate Verified MCQ'}</span>
            </button>
          </form>

          {/* Right (7 Cols): Feed Stream */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-navy-950">Active Current Affairs Items</h3>
              <span className="text-xs text-slate-400">{items.length} Tracked</span>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-extrabold px-2 py-0.5 rounded bg-royal-100 text-royal-800">
                      {item.category}
                    </span>
                    <span className="text-slate-400">{item.event_date}</span>
                  </div>

                  <h4 className="font-extrabold text-navy-950 text-sm">{item.headline}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.summary}</p>

                  {item.key_facts && (
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-950 text-[11px] font-semibold border border-amber-200">
                      <strong>Exam Key Facts:</strong> {item.key_facts}
                    </div>
                  )}

                  {item.question_id && (
                    <span className="text-[10px] font-bold text-emerald-700 block">
                      ✅ MCQ Synthesized and Queued in Question Bank
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
