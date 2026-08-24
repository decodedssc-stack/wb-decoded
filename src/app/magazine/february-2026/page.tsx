'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  Printer, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck, 
  Globe, 
  Share2, 
  Layers, 
  HelpCircle,
  Flame,
  ArrowRight,
  Filter
} from 'lucide-react';
import StudentSidebar from '@/components/layout/StudentSidebar';
import { FEBRUARY_100_EVENTS, MagazineEvent } from '@/data/februaryMegaCompendium';

export default function FebruaryMagazinePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [languageMode, setLanguageMode] = useState<'bilingual' | 'english' | 'bengali'>('bilingual');
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Modules (সমস্ত বিষয়)', count: FEBRUARY_100_EVENTS.length },
    { id: 'wb', label: '🏛️ West Bengal Special', count: FEBRUARY_100_EVENTS.filter(e => e.category === 'wb').length },
    { id: 'schemes', label: '☀️ Budget & Schemes', count: FEBRUARY_100_EVENTS.filter(e => e.category === 'schemes').length },
    { id: 'national', label: '🇮🇳 National Affairs & Law', count: FEBRUARY_100_EVENTS.filter(e => e.category === 'national').length },
    { id: 'international', label: '🌍 International & Summits', count: FEBRUARY_100_EVENTS.filter(e => e.category === 'international').length },
    { id: 'economy_banking', label: '💰 Economy & Banking', count: FEBRUARY_100_EVENTS.filter(e => e.category === 'economy_banking').length },
    { id: 'defense_navy', label: '⚓ Defense & MILAN 2026', count: FEBRUARY_100_EVENTS.filter(e => e.category === 'defense_navy').length },
    { id: 'space_science', label: '🚀 Space & Science (INSAT-3DS)', count: FEBRUARY_100_EVENTS.filter(e => e.category === 'space_science').length },
    { id: 'appointments', label: '👤 Appointments', count: FEBRUARY_100_EVENTS.filter(e => e.category === 'appointments').length },
    { id: 'awards_persons', label: '🏆 Awards (Jnanpith/Grammy)', count: FEBRUARY_100_EVENTS.filter(e => e.category === 'awards_persons').length },
    { id: 'books', label: '📚 Books & Authors', count: FEBRUARY_100_EVENTS.filter(e => e.category === 'books').length },
    { id: 'sports', label: '⚽ Sports & Records', count: FEBRUARY_100_EVENTS.filter(e => e.category === 'sports').length },
    { id: 'environment_wildlife', label: '🌿 Environment & Wetlands', count: FEBRUARY_100_EVENTS.filter(e => e.category === 'environment_wildlife').length },
    { id: 'days', label: '📅 Important Days & Themes', count: FEBRUARY_100_EVENTS.filter(e => e.category === 'days').length },
  ];

  const filteredEvents = useMemo(() => {
    return FEBRUARY_100_EVENTS.filter(item => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.titleBn.includes(searchQuery) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keyPoints.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.staticGk.points.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleBookmark = (id: string) => {
    setBookmarkedEvents(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex bg-[#F4F6F8] min-h-[calc(100vh-4rem)] w-full overflow-x-hidden">
      <StudentSidebar />

      <div className="flex-1 p-3.5 sm:p-6 lg:p-8 space-y-6 max-w-5xl w-full overflow-x-hidden">
        
        {/* Official Magazine Cover Page */}
        <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200/80 bg-slate-950 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/magazine-cover.jpg" 
            alt="WB Decoded Current Affairs Monthly Magazine Official Cover Page"
            className="w-full h-auto object-cover object-center max-h-[480px] sm:max-h-[560px] rounded-3xl"
          />
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-black shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Official Magazine Cover • February 2026 Edition</span>
          </div>
        </div>

        {/* Magazine Info Banner */}
        <div className="bg-gradient-to-r from-[#00A389] via-[#008F78] to-[#007A66] rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-white border border-white/20 text-[11px] sm:text-xs font-black">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>WB Decoded Official Monthly Compendium • 134 Master Modules Edition</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                February 2026 Current Affairs Encyclopedia
              </h1>
              <p className="text-sm sm:text-base font-bold text-teal-100">
                {FEBRUARY_100_EVENTS.length} Comprehensive Modules • Union Budget 2026 Special • Zero Omissions • Deep Static GK Boxes
              </p>
              <p className="text-xs text-teal-100/90 max-w-2xl leading-relaxed">
                Synthesized across all 22 premier authority sources (including <strong>Indologus, Current Affairs Updated, StudyIQ, Drishti, Adda247, WB Decoded, AffairsCloud, GKToday, Utkarsh Classes, RWA &amp; Careerwill</strong>). Includes Union Budget 2026–27, WB State Budget, INSAT-3DS, Gaganyaan Astronauts, 58th Jnanpith, and MILAN 2026.
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-2.5 shrink-0">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-2xl bg-white text-[#007A66] hover:bg-slate-50 font-black text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>

              <Link
                href="/daily-challenge"
                className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-sm transition-all flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
                <span>Take February Mock Test</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Toolbar: Category Scroll, Search & Bilingual Switcher */}
        <div className="space-y-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-[#00A389] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-[#00A389]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar & Language Toggle */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search Budget, INSAT-3DS, Gaganyaan, Jnanpith, GK..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00A389] focus:ring-1 focus:ring-[#00A389]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 self-end sm:self-auto shrink-0">
              <button
                onClick={() => setLanguageMode('bilingual')}
                className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  languageMode === 'bilingual' ? 'bg-[#00A389] text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bilingual (দ্বিভাষিক)
              </button>
              <button
                onClick={() => setLanguageMode('english')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  languageMode === 'english' ? 'bg-[#00A389] text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English Only
              </button>
              <button
                onClick={() => setLanguageMode('bengali')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  languageMode === 'bengali' ? 'bg-[#00A389] text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>

        {/* Events Feed Container */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
            <span>Showing {filteredEvents.length} Verified Modules for February 2026</span>
            <span>WB Decoded Current Affairs Cell</span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No events match your criteria</h3>
              <p className="text-xs text-slate-500">Try changing your search term or select another category tab above.</p>
            </div>
          ) : (
            filteredEvents.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-[#00A389]/50 transition-all space-y-4"
              >
                {/* Event Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-[#00A389] text-[11px] font-black tracking-wide border border-teal-100">
                      Module #{index + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">
                      {item.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.dateStr}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className="text-slate-400 hover:text-amber-500 transition-colors p-1"
                    title={bookmarkedEvents.includes(item.id) ? "Remove Bookmark" : "Save Module"}
                  >
                    {bookmarkedEvents.includes(item.id) ? (
                      <BookmarkCheck className="w-5 h-5 text-amber-500 fill-amber-500" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Event Titles */}
                <div className="space-y-1.5">
                  {(languageMode === 'bilingual' || languageMode === 'english') && (
                    <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                      {item.title}
                    </h2>
                  )}
                  {(languageMode === 'bilingual' || languageMode === 'bengali') && (
                    <h3 className="text-sm sm:text-base font-bold text-teal-800 leading-relaxed font-bengali">
                      {item.titleBn}
                    </h3>
                  )}
                </div>

                {/* Summary */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 space-y-1.5 leading-relaxed">
                  {(languageMode === 'bilingual' || languageMode === 'english') && (
                    <p>{item.summary}</p>
                  )}
                  {(languageMode === 'bilingual' || languageMode === 'bengali') && (
                    <p className="text-slate-600 font-bengali font-medium pt-1 border-t border-slate-200/60">
                      {item.summaryBn}
                    </p>
                  )}
                </div>

                {/* Key Points */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    Key Exam Insights:
                  </span>
                  <ul className="grid grid-cols-1 gap-2">
                    {item.keyPoints.map((kp, kIdx) => (
                      <li key={kIdx} className="text-xs sm:text-[13px] text-slate-700 flex items-start gap-2 bg-teal-50/30 p-2.5 rounded-lg border border-teal-100/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00A389] mt-1.5 shrink-0" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Static GK Box */}
                <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-3.5 sm:p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-900">
                    <GraduationCap className="w-4 h-4 text-amber-700" />
                    <span>{item.staticGk.title}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-amber-950/90">
                    {item.staticGk.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-amber-600 font-black">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exam Relevance Tag */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span className="font-semibold">
                    🎯 Target Exams: <span className="text-slate-700 font-bold">{item.examRelevance}</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Navigation */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">Mastered February 2026 Current Affairs?</h4>
            <p className="text-xs text-slate-500">Test your knowledge with real exam-pattern timed practice tests.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/magazine/january-2026"
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all"
            >
              ← Read January 2026
            </Link>
            <Link
              href="/daily-challenge"
              className="px-5 py-2.5 rounded-xl bg-[#00A389] hover:bg-[#008F78] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2"
            >
              <span>Practice Mock Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
