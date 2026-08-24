'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Sparkles, Award, CheckCircle, Clock, 
  HelpCircle, Shield, ArrowRight, Search, FileText, 
  Layers, Scale, Landmark, ChevronRight, BarChart3,
  CheckCircle2, Flame, Bookmark, ArrowLeft
} from 'lucide-react';

interface Chapter {
  id: string;
  slug: string;
  chapter_number: number;
  title: string;
  subtitle: string;
  part_reference: string;
  articles_range: string;
  reading_time_mins: number;
  concepts_count: number;
  mcqs_count: number;
  quality_score: number;
  cover_image?: string;
}

export default function IndianPolityCourseHub() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [userProgress, setUserProgress] = useState<Record<string, { is_completed: boolean; score: number }>>({});
  const [activeTab, setActiveTab] = useState<'all' | 'high_yield' | 'executive' | 'judiciary' | 'local'>('all');

  useEffect(() => {
    async function loadData() {
      try {
        const [chRes, progRes] = await Promise.all([
          fetch('/api/polity/chapters'),
          fetch('/api/polity/progress')
        ]);
        
        const chData = await chRes.json();
        const progData = await progRes.json();

        if (chData.success) {
          setChapters(chData.chapters);
        }

        if (progData.success && progData.progress) {
          const map: Record<string, { is_completed: boolean; score: number }> = {};
          progData.progress.forEach((p: any) => {
            map[p.chapter_slug] = {
              is_completed: p.is_completed === 1,
              score: p.mcq_score
            };
          });
          setUserProgress(map);
        }
      } catch (err) {
        console.error('Failed to load polity chapters:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const completedCount = Object.values(userProgress).filter(p => p.is_completed).length;
  const progressPercent = chapters.length > 0 ? Math.round((completedCount / chapters.length) * 100) : 0;

  const filteredChapters = chapters.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.articles_range.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeTab === 'high_yield') {
      return [1, 4, 7, 8, 9, 13, 14, 16].includes(c.chapter_number);
    }
    if (activeTab === 'executive') {
      return [9, 10, 11, 12].includes(c.chapter_number);
    }
    if (activeTab === 'judiciary') {
      return [14, 15].includes(c.chapter_number);
    }
    if (activeTab === 'local') {
      return [16].includes(c.chapter_number);
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-24 select-none">
      
      {/* 1. Top Header Hero Showcase Card */}
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-[#07152B] relative">
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden">
            <img 
              src="/images/polity/main-cover.jpg" 
              alt="Indian Polity Complete Notes" 
              className="w-full h-full object-cover"
            />
            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07152B] via-transparent to-transparent opacity-80 pointer-events-none" />
            
            {/* Top Bar inside Flagship Hero */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
              <Link 
                href="/"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-bold transition border border-white/20 backdrop-blur-md"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Home Feed
              </Link>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
                <Sparkles className="w-3.5 h-3.5" /> Complete Standard Study Book
              </div>
            </div>

            {/* Bottom Status Inside Hero */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-white pointer-events-none">
              <div>
                <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
                  Indian Polity <span className="text-amber-300">Master Notes</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 font-medium drop-shadow-sm">
                  16 Master Chapters • 395+ Articles • 106 Amendments • Supreme Court Case Laws
                </p>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                <Link
                  href="/polity/historical-background"
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition shadow-md flex items-center gap-1.5"
                >
                  Start Reading <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics & Progress Strip */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Syllabus Scope</div>
            <div className="text-xl md:text-2xl font-black text-[#2563EB] mt-0.5">100% Full</div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5">Parts, Schedules & Articles</div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Master Chapters</div>
            <div className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">16 Chapters</div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5">380+ Core Concepts</div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Constitution Bank</div>
            <div className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">395+ Articles</div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5">106 Amendments & Cases</div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Chapter Tests</div>
            <div className="text-xl md:text-2xl font-black text-amber-500 mt-0.5">240+ MCQs</div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5">WBCS / WBP standard</div>
          </div>
        </div>

        {/* User Learning Tracker Card */}
        <div className="mt-4 bg-white rounded-2xl p-4 md:p-5 border border-slate-200/90 shadow-2xs text-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-extrabold text-[#2563EB] uppercase tracking-wider">Candidate Progress</span>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                Your Reading Status: <span className="text-[#2563EB]">{completedCount} of {chapters.length} Chapters Mastered</span>
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xl md:text-2xl font-black text-[#2563EB]">{progressPercent}%</span>
            </div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 mt-2.5 overflow-hidden border border-slate-200">
            <div 
              className="bg-gradient-to-r from-[#2563EB] to-blue-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Quick Access Action Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Link 
            href="/polity/articles"
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
            Articles 1–395 Database
          </Link>
          <Link 
            href="/polity/amendments"
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition shadow-2xs"
          >
            <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
            Landmark Amendments (1st–106th)
          </Link>
          <Link 
            href="/polity/cases"
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition shadow-2xs"
          >
            <Scale className="w-3.5 h-3.5 text-[#2563EB]" />
            Landmark SC Judgments
          </Link>
          <Link 
            href="/polity/revision"
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 transition shadow-2xs"
          >
            <BarChart3 className="w-3.5 h-3.5 text-slate-950" />
            1-Page Fast Revision
          </Link>
        </div>
      </div>

      {/* 3. Main Content Area & Chapters Grid */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        
        {/* Search & Topic Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search chapters, articles (e.g. Preamble, Art 21, DPSP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-[#2563EB] focus:outline-none text-xs md:text-sm text-slate-800 placeholder-slate-400 shadow-2xs"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All 16 Chapters' },
              { id: 'high_yield', label: '🔥 High-Yield Core' },
              { id: 'executive', label: 'Executive (Union & State)' },
              { id: 'judiciary', label: 'Judiciary (SC & HC)' },
              { id: 'local', label: 'Panchayati Raj' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Chapters Grid with Premium Cover Artworks */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-3xl bg-white border border-slate-200 animate-pulse shadow-xs" />
            ))}
          </div>
        ) : filteredChapters.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800">No chapters found</h3>
            <p className="text-xs text-slate-500 mt-1">Try refining your search query or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-6">
            {filteredChapters.map((ch) => {
              const isCompleted = userProgress[ch.slug]?.is_completed;
              const coverImg = ch.cover_image || `/images/polity/chapter-${ch.chapter_number.toString().padStart(2, '0')}-historical-background.svg`;

              return (
                <Link 
                  key={ch.id}
                  href={`/polity/${ch.slug}`}
                  className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#2563EB]/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Chapter Cover Artwork */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                      <img 
                        src={coverImg}
                        alt={ch.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Status Badges Overlay */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-extrabold uppercase tracking-wider">
                          {ch.part_reference}
                        </span>

                        {isCompleted ? (
                          <span className="flex items-center gap-1 text-[11px] font-black text-slate-950 bg-emerald-400 px-2.5 py-1 rounded-lg shadow-sm">
                            <CheckCircle className="w-3.5 h-3.5" /> Completed
                          </span>
                        ) : (
                          <span className="text-[11px] text-white font-bold bg-black/60 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-400" /> {ch.reading_time_mins} mins
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content Area */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#2563EB] font-black text-[11px] border border-blue-200">
                          Chapter {ch.chapter_number.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[11px] text-slate-500 font-bold">
                          {ch.articles_range}
                        </span>
                      </div>

                      <h2 className="text-base md:text-lg font-black text-slate-900 group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-1">
                        {ch.title}
                      </h2>
                      
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                        {ch.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Meta Strip */}
                  <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-600 font-bold text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> {ch.concepts_count} Topics
                      </span>
                      <span className="flex items-center gap-1 text-slate-600 font-bold text-[11px]">
                        <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" /> {ch.mcqs_count} MCQs
                      </span>
                    </div>

                    <span className="text-[#2563EB] font-extrabold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Notes &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
