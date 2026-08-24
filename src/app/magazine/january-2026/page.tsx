'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import { JANUARY_100_EVENTS, MagazineEvent } from '@/data/januaryMegaCompendium';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Award, 
  Globe, 
  Shield, 
  Coins, 
  Cpu, 
  Trophy, 
  Calendar, 
  Printer, 
  Bookmark, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  Flame, 
  Landmark, 
  HelpCircle,
  Share2,
  FileText,
  Sun,
  Trees,
  Crosshair,
  Filter,
  Check,
  UserCheck
} from 'lucide-react';

export default function JanuaryMagazinePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bilingualMode, setBilingualMode] = useState<boolean>(true);
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: `All 100+ Events (${JANUARY_100_EVENTS.length} Modules)` },
    { id: 'wb', label: '🏛️ West Bengal & East India Special' },
    { id: 'schemes', label: '☀️ National & State Schemes' },
    { id: 'national', label: '🇮🇳 National Affairs, Law & Judiciary' },
    { id: 'international', label: '🌍 International & Summits' },
    { id: 'economy_banking', label: '💰 Economy, Banking (RBI/SEBI)' },
    { id: 'defense_navy', label: '⚓ Defense & Naval Operations' },
    { id: 'space_science', label: '🚀 Space & Science (ISRO/JAXA)' },
    { id: 'appointments', label: '👤 National & Global Appointments' },
    { id: 'awards_persons', label: '🏆 Awards & Honours' },
    { id: 'books', label: '📚 Books & Authors' },
    { id: 'sports', label: '⚽ Sports, Records & Tournaments' },
    { id: 'environment_wildlife', label: '🌿 Environment, Wildlife & Ramsar' },
    { id: 'days', label: '📅 Important Days & Themes' }
  ];

  const filteredEvents = JANUARY_100_EVENTS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleBn.includes(searchQuery) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyPoints.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.staticGk.points.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

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
            <span>Official Magazine Cover • WB Decoded</span>
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
                January 2026 Current Affairs Encyclopedia
              </h1>
              <p className="text-sm sm:text-base font-bold text-teal-100">
                {JANUARY_100_EVENTS.length} Comprehensive Modules • Zero Duplication • Zero Omissions • Deep Static GK Boxes
              </p>
              <p className="text-xs text-teal-100/90 max-w-2xl leading-relaxed">
                Synthesized across all 22 premier authority sources (including <strong>Indologus, Current Affairs Updated, StudyIQ, Drishti, Adda247, WB Decoded, AffairsCloud, GKToday, Utkarsh Classes, RWA &amp; Careerwill</strong>). Every event has complete context, official dates, bilingual translation, and an in-depth <strong>[STATIC GK CORNER]</strong>.
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
                <span>Take January Mock Test</span>
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
              </button>
            ))}
          </div>

          {/* Search Bar & Language Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search any event, appointment, scheme, book, GI tag, missile, or static fact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#00A389]/20 focus:border-[#00A389]"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
              <button
                onClick={() => setBilingualMode(!bilingualMode)}
                className={`px-3 py-1.5 rounded-xl font-black transition-colors ${
                  bilingualMode 
                    ? 'bg-[#E6F7F4] text-[#007A66] border border-[#00A389]/30' 
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {bilingualMode ? '🌐 Bilingual (English + বাংলা) Active' : 'English Only Mode'}
              </button>

              <span className="text-slate-400 font-bold">
                {filteredEvents.length} Events Listed
              </span>
            </div>
          </div>
        </div>

        {/* EVENTS LIST WITH EMBEDDED STATIC GK FACT BOXES */}
        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 font-semibold space-y-2">
              <p className="text-base">No events found matching &quot;{searchQuery}&quot;.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="text-xs text-[#00A389] underline font-bold">
                Clear Filters
              </button>
            </div>
          ) : (
            filteredEvents.map((item, idx) => {
              const isBookmarked = bookmarkedEvents.includes(item.id);

              return (
                <article
                  key={item.id}
                  className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4 hover:border-slate-300 transition-all relative group"
                >
                  {/* Top Meta Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#E6F7F4] text-[#007A66] font-black text-[11px]">
                        {item.categoryLabel}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {item.dateStr}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isBookmarked 
                            ? 'bg-amber-50 text-amber-600 border-amber-300' 
                            : 'bg-slate-50 text-slate-400 hover:text-slate-600 border-slate-200'
                        }`}
                        title="Bookmark for Revision"
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Title & Bengali Translation */}
                  <div className="space-y-1">
                    <h2 className="text-base sm:text-xl font-black text-slate-900 leading-snug">
                      {item.title}
                    </h2>
                    {bilingualMode && (
                      <p className="text-xs sm:text-sm font-bold text-slate-600">
                        {item.titleBn}
                      </p>
                    )}
                  </div>

                  {/* Context & Core Highlights */}
                  <div className="space-y-2.5">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {item.summary}
                    </p>

                    <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-200/80 space-y-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00A389]" />
                        <span>Key Exam Takeaways:</span>
                      </h4>
                      <ul className="space-y-1.5 pl-1">
                        {item.keyPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00A389] mt-1.5 shrink-0"></span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* EMBEDDED STATIC GK FACT BOX (CRUCIAL USER DIRECTIVE) */}
                  <div className="bg-gradient-to-br from-amber-50/70 via-amber-50/40 to-white rounded-2xl p-4 sm:p-5 border border-amber-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black tracking-wide text-amber-950 flex items-center gap-1.5">
                        <Landmark className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>{item.staticGk.title}</span>
                      </h3>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-200 text-amber-900 uppercase">
                        Must Know Facts
                      </span>
                    </div>

                    <ul className="space-y-1.5 pl-1">
                      {item.staticGk.points.map((stPt, sIdx) => (
                        <li key={sIdx} className="text-xs text-amber-950 font-medium flex items-start gap-2 leading-relaxed">
                          <span className="text-amber-600 font-black shrink-0">•</span>
                          <span>{stPt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exam Relevancy Tag */}
                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400 font-semibold">
                    <span className="text-[#007A66] font-bold">
                      🎯 Target Exams: {item.examRelevance}
                    </span>
                    <span className="text-slate-400">
                      Module #{idx + 1}
                    </span>
                  </div>

                </article>
              );
            })
          )}
        </div>

        {/* 100-Question Practice CTA Footer Card */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Ready to Test Your January 2026 Mastery?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Attempt the <strong>100-Question January Live Speed Mock Test</strong> with commission-standard negative marking, All-Bengal percentile ranking, and instant explanations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/magazine/february-2026"
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs shadow-xs transition-all whitespace-nowrap"
            >
              Read February 2026 ➔
            </Link>
            <Link
              href="/daily-challenge"
              className="px-6 py-3.5 rounded-2xl bg-[#00A389] hover:bg-[#008F78] text-white font-black text-sm shadow-md transition-all whitespace-nowrap"
            >
              Start Monthly Mock Test ➔
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
