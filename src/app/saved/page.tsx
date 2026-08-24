'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import {
  BookmarkCheck,
  Search,
  Filter,
  Trash2,
  Play,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Layers,
  Award
} from 'lucide-react';

export default function SavedQuestionsVaultPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load from database questions sample as saved bookmarks + local bookmarks
    fetch('/api/questions?limit=15')
      .then(res => res.json())
      .then(data => {
        if (data?.questions) {
          setBookmarks(data.questions);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load saved questions:', err);
        setLoading(false);
      });
  }, []);

  const toggleReveal = (id: string) => {
    setRevealedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const filteredBookmarks = bookmarks.filter(b => {
    const matchesSub = selectedSubject === 'all' || b.subject_id === selectedSubject;
    const matchesSearch = !searchQuery || 
      b.question_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.question_text_bn && b.question_text_bn.includes(searchQuery));
    return matchesSub && matchesSearch;
  });

  return (
    <div className="flex bg-[#F4F6F8] min-h-[calc(100vh-4rem)] w-full overflow-x-hidden">
      <StudentSidebar />

      <div className="flex-1 p-3.5 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 max-w-5xl w-full overflow-x-hidden">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#00A389] via-[#008F78] to-[#007A66] rounded-2xl p-5 sm:p-7 text-white shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/20 text-white border border-white/20">
              Personal Revision Suite
            </span>
            <span className="text-xs text-teal-100 font-bold">
              {bookmarks.length} Bookmarked Questions
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Saved Questions &amp; Bookmarks Vault
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-2xl leading-relaxed">
              Review tricky concepts, confusing options, and high-yield questions flagged during your full-length mock tests and chapter drills.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search saved questions by keyword or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00A389]/20 focus:border-[#00A389]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors whitespace-nowrap ${
                selectedSubject === 'all' ? 'bg-[#00A389] text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Subjects ({bookmarks.length})
            </button>
            <button
              onClick={() => setSelectedSubject('sub-polity')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors whitespace-nowrap ${
                selectedSubject === 'sub-polity' ? 'bg-[#00A389] text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Polity
            </button>
            <button
              onClick={() => setSelectedSubject('sub-hist')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors whitespace-nowrap ${
                selectedSubject === 'sub-hist' ? 'bg-[#00A389] text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              History
            </button>
            <button
              onClick={() => setSelectedSubject('sub-geo-wb')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors whitespace-nowrap ${
                selectedSubject === 'sub-geo-wb' ? 'bg-[#00A389] text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Geography
            </button>
          </div>
        </div>

        {/* Questions Cards List */}
        <div className="space-y-4">
          {filteredBookmarks.length > 0 ? (
            filteredBookmarks.map((q, idx) => {
              const isRevealed = revealedIds[q.id];
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#E6F7F4] text-[#007A66] text-xs font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {q.subject_name || 'General Studies'} • {q.difficulty || 'Exam Standard'}
                      </span>
                    </div>

                    <button
                      onClick={() => removeBookmark(q.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove from bookmarks"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Question Content */}
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-relaxed whitespace-pre-line">
                      {q.question_text}
                    </p>
                    {q.question_text_bn && (
                      <p className="text-xs font-semibold text-slate-600 font-bengali leading-relaxed border-t border-slate-100 pt-1.5">
                        {q.question_text_bn}
                      </p>
                    )}
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {[
                      { key: 'A', text: q.option_a, text_bn: q.option_a_bn },
                      { key: 'B', text: q.option_b, text_bn: q.option_b_bn },
                      { key: 'C', text: q.option_c, text_bn: q.option_c_bn },
                      { key: 'D', text: q.option_d, text_bn: q.option_d_bn }
                    ].map((opt) => {
                      const isCorrect = q.correct_answer === opt.key;
                      return (
                        <div
                          key={opt.key}
                          className={`p-2.5 rounded-xl border text-xs flex items-start space-x-2 ${
                            isRevealed && isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black shrink-0">
                            {opt.key}
                          </span>
                          <div>
                            <div>{opt.text}</div>
                            {opt.text_bn && <div className="text-[11px] text-slate-500 font-bengali">{opt.text_bn}</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reveal / Solution Toggle */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={() => toggleReveal(q.id)}
                      className="text-xs font-bold text-[#00A389] hover:underline flex items-center gap-1"
                    >
                      {isRevealed ? 'Hide Explanation' : 'View Correct Answer & Explanation &rarr;'}
                    </button>

                    <span className="text-[11px] font-semibold text-slate-400">
                      Saved from Full Mock
                    </span>
                  </div>

                  {/* Detailed Explanation */}
                  {isRevealed && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 animate-in fade-in">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Official Correct Answer: Option ({q.correct_answer})</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                        {q.explanation}
                      </p>
                      {q.explanation_bn && (
                        <p className="text-slate-600 font-bengali leading-relaxed pt-1 border-t border-slate-200">
                          {q.explanation_bn}
                        </p>
                      )}
                    </div>
                  )}

                </div>
              );
            })
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
              <BookmarkCheck className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-extrabold text-sm text-slate-900">No Saved Questions Found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Flag difficult questions during active mock tests using the bookmark icon to review them here anytime.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
