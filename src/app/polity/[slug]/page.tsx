'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  BookOpen, Sparkles, CheckCircle, Clock, ArrowLeft, ArrowRight, 
  HelpCircle, Check, X, AlertTriangle, 
  Scale, Lightbulb, Landmark, ListOrdered, 
  FileText, BarChart3, ShieldCheck, Zap, Share2, Award
} from 'lucide-react';

interface MCQ {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
  trap_warning?: string;
  difficulty: string;
  tags?: string;
}

interface ChapterData {
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
  content_markdown: string;
  mcqs: MCQ[];
  related_articles: any[];
  prev_chapter: { slug: string; title: string; chapter_number: number } | null;
  next_chapter: { slug: string; title: string; chapter_number: number } | null;
}

export default function PolityChapterReader() {
  const params = useParams();
  const slug = params?.slug as string;

  const [chapter, setChapter] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<'textbook' | 'mcqs'>('textbook');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [scrollProgress, setScrollProgress] = useState(0);

  // MCQ State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function loadChapter() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/polity/chapters/${slug}`);
        const data = await res.json();
        if (data.success) {
          setChapter(data.chapter);
        }
      } catch (err) {
        console.error('Error fetching chapter:', err);
      } finally {
        setLoading(false);
      }
    }
    loadChapter();
  }, [slug]);

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = Math.round((totalScroll / windowHeight) * 100);
        setScrollProgress(scroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectOption = (qIdx: number, opt: string) => {
    if (showExplanation[qIdx]) return;
    const isCorrect = opt === chapter?.mcqs?.[qIdx]?.correct_option;
    if (isCorrect) setScore(prev => prev + 1);
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: opt }));
    setShowExplanation(prev => ({ ...prev, [qIdx]: true }));
  };

  const handleMarkComplete = async () => {
    setIsCompleted(true);
    try {
      await fetch('/api/polity/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapter_slug: slug,
          is_completed: 1,
          mcq_score: score,
          total_mcqs: chapter?.mcqs?.length || 0
        })
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Extract Table of Contents from Markdown
  const tocItems = useMemo(() => {
    if (!chapter?.content_markdown) return [];
    const lines = chapter.content_markdown.split('\n');
    const items: { text: string; id: string; level: number }[] = [];
    lines.forEach(line => {
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        items.push({ text, id, level: 2 });
      }
    });
    return items;
  }, [chapter?.content_markdown]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center p-4 select-none">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 border-4 border-blue-200 border-t-[#2563EB] rounded-full animate-spin mx-auto shadow-sm" />
          <p className="text-[#2563EB] text-sm font-extrabold tracking-wide">Loading Chapter Notes...</p>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex items-center justify-center p-4 select-none">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <BookOpen className="w-12 h-12 text-[#2563EB] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900">Chapter Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">The requested chapter could not be found.</p>
          <Link 
            href="/polity"
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-sm shadow-sm hover:bg-blue-700 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Course Hub
          </Link>
        </div>
      </div>
    );
  }

  const coverImg = chapter.cover_image || `/images/polity/chapter-${chapter.chapter_number.toString().padStart(2, '0')}-historical-background.svg`;

  // Custom Markdown Component Renderers matching App White/Slate/Royal Blue Design
  const customRenderers = {
    h1: ({ children }: any) => (
      <div className="my-6 pb-3 border-b-2 border-slate-200">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
          {children}
        </h1>
      </div>
    ),
    h2: ({ children }: any) => {
      const textStr = String(children);
      const id = textStr.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      let icon = <BookOpen className="w-5 h-5 text-[#2563EB] shrink-0" />;
      if (textStr.includes('Introduction')) icon = <Landmark className="w-5 h-5 text-[#2563EB] shrink-0" />;
      if (textStr.includes('Core Concept')) icon = <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />;
      if (textStr.includes('Provisions')) icon = <Scale className="w-5 h-5 text-[#2563EB] shrink-0" />;
      if (textStr.includes('Facts') || textStr.includes('Alerts') || textStr.includes('Warnings')) icon = <Zap className="w-5 h-5 text-amber-500 shrink-0" />;
      if (textStr.includes('Exceptions')) icon = <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />;
      if (textStr.includes('Comparisons')) icon = <BarChart3 className="w-5 h-5 text-emerald-600 shrink-0" />;
      if (textStr.includes('Cases') || textStr.includes('Judgments')) icon = <Scale className="w-5 h-5 text-indigo-600 shrink-0" />;
      if (textStr.includes('Memory') || textStr.includes('Revision')) icon = <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />;

      return (
        <div id={id} className="mt-10 mb-4 pt-4 scroll-mt-24">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-blue-50/80 border-l-4 border-[#2563EB]">
            {icon}
            <h2 className="text-base md:text-lg font-extrabold tracking-tight text-[#1E3A8A]">
              {children}
            </h2>
          </div>
        </div>
      );
    },
    h3: ({ children }: any) => (
      <h3 className="text-sm md:text-base font-extrabold mt-6 mb-2 flex items-center gap-2 text-slate-900">
        <span className="w-2 h-2 rounded-full bg-[#2563EB] inline-block" />
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xs md:text-sm font-bold mt-4 mb-1.5 text-slate-800">
        {children}
      </h4>
    ),
    p: ({ children }: any) => {
      const text = String(children);
      
      // High-Yield Traps / Exam Alerts Card
      if (text.includes('⚠️') || text.includes('Very Important') || text.includes('Frequently Asked')) {
        return (
          <div className="my-4 p-4 rounded-2xl bg-amber-50 border-l-4 border-amber-500 shadow-2xs">
            <div className="flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm font-semibold leading-relaxed text-amber-950">
                {children}
              </p>
            </div>
          </div>
        );
      }

      return (
        <p className="my-3 text-xs md:text-sm leading-relaxed text-slate-700">
          {children}
        </p>
      );
    },
    blockquote: ({ children }: any) => (
      <div className="my-5 p-4 md:p-5 rounded-2xl bg-slate-50 border-l-4 border-[#2563EB] shadow-2xs text-slate-800">
        <div className="flex items-start gap-2.5 italic text-xs md:text-sm leading-relaxed font-serif">
          <span className="text-2xl text-[#2563EB] leading-none font-bold select-none">&ldquo;</span>
          <div className="flex-1 text-slate-800">{children}</div>
        </div>
      </div>
    ),
    table: ({ children }: any) => (
      <div className="my-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            {children}
          </table>
        </div>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white font-extrabold uppercase tracking-wider text-[11px]">
        {children}
      </thead>
    ),
    th: ({ children }: any) => (
      <th className="p-3.5 md:p-4 text-white border-r border-blue-600/40 last:border-r-0">
        {children}
      </th>
    ),
    tr: ({ children }: any) => (
      <tr className="border-b border-slate-100 hover:bg-blue-50/40 transition-colors odd:bg-slate-50/50">
        {children}
      </tr>
    ),
    td: ({ children }: any) => (
      <td className="p-3.5 md:p-4 text-xs leading-relaxed border-r border-slate-100 last:border-r-0 text-slate-700">
        {children}
      </td>
    ),
    ul: ({ children }: any) => (
      <ul className="my-3 space-y-2 list-none pl-1">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="my-3 space-y-2 list-decimal pl-5">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="text-xs md:text-sm leading-relaxed flex items-start gap-2 text-slate-700">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0 mt-1.5" />
        <div className="flex-1">{children}</div>
      </li>
    ),
    strong: ({ children }: any) => (
      <strong className="font-extrabold text-slate-900">
        {children}
      </strong>
    )
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-32 select-none">
      
      {/* Top Floating Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200">
        <div 
          className="h-full bg-gradient-to-r from-[#2563EB] to-blue-400 shadow-sm transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Reader Navigation Header matching App Navbar */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-slate-200/90 px-4 py-2.5 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/polity"
              className="text-xs font-bold text-slate-600 hover:text-[#2563EB] flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Polity Hub
            </Link>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 hidden sm:inline">
              Chapter {chapter.chapter_number.toString().padStart(2, '0')} of 16
            </span>
          </div>

          {/* Reader Controls */}
          <div className="flex items-center gap-2">
            {/* Font Size Adjuster */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100/80 p-0.5">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition ${fontSize === 'sm' ? 'bg-white text-[#2563EB] shadow-2xs' : 'text-slate-500'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition ${fontSize === 'base' ? 'bg-white text-[#2563EB] shadow-2xs' : 'text-slate-500'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition ${fontSize === 'lg' ? 'bg-white text-[#2563EB] shadow-2xs' : 'text-slate-500'}`}
              >
                A+
              </button>
            </div>

            {/* Mark Complete Button */}
            <button
              onClick={handleMarkComplete}
              className={`text-xs font-extrabold px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-2xs ${
                isCompleted 
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#2563EB] hover:bg-blue-700 text-white'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              {isCompleted ? 'Completed' : 'Mark as Read'}
            </button>
          </div>
        </div>
      </div>

      {/* Visual Chapter Cover Banner */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-sm">
          <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full overflow-hidden bg-slate-900">
            <img 
              src={coverImg}
              alt={chapter.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-[#2563EB]" />
                {chapter.part_reference}
              </span>
              <span className="text-xs text-slate-600 font-bold px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
                {chapter.articles_range}
              </span>
              <span className="text-xs text-emerald-700 font-bold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 ml-auto flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Quality: {chapter.quality_score}%
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {chapter.title}
            </h1>
            
            <p className="text-xs md:text-base mt-2 max-w-3xl leading-relaxed font-medium text-slate-600">
              {chapter.subtitle}
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#2563EB] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-extrabold block">Study Time</span>
                  <span className="text-xs md:text-sm font-extrabold text-slate-900">{chapter.reading_time_mins} Mins</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-extrabold block">Core Concepts</span>
                  <span className="text-xs md:text-sm font-extrabold text-slate-900">{chapter.concepts_count} Topics</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#2563EB] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-extrabold block">Chapter Test</span>
                  <span className="text-xs md:text-sm font-extrabold text-slate-900">{chapter.mcqs?.length || 0} MCQs</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#2563EB] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-extrabold block">Articles Scope</span>
                  <span className="text-xs md:text-sm font-extrabold text-slate-900 truncate max-w-[130px] block">{chapter.articles_range || 'Arts 1–395'}</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 mt-6 border-b border-slate-200">
              <button
                onClick={() => setActiveTab('textbook')}
                className={`pb-3 text-xs md:text-sm font-extrabold border-b-2 transition flex items-center gap-2 ${
                  activeTab === 'textbook'
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" /> Comprehensive Notes
              </button>
              <button
                onClick={() => setActiveTab('mcqs')}
                className={`pb-3 text-xs md:text-sm font-extrabold border-b-2 transition flex items-center gap-2 ${
                  activeTab === 'mcqs'
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-4 h-4" /> Practice Assessment ({chapter.mcqs?.length || 0})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Reading Column (3/4 Width) */}
          <div className="lg:col-span-3">
            {activeTab === 'textbook' && (
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm">
                <div className={`space-y-6 ${
                  fontSize === 'sm' ? 'text-xs' : fontSize === 'lg' ? 'text-base' : 'text-sm'
                }`}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={customRenderers}
                  >
                    {chapter.content_markdown}
                  </ReactMarkdown>

                  {/* Chapter Completion Card */}
                  <div className="mt-14 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-slate-50 to-blue-50 border border-blue-200 text-center shadow-xs">
                    <Sparkles className="w-10 h-10 text-[#2563EB] mx-auto mb-3" />
                    <h3 className="text-lg md:text-xl font-black text-slate-900">Mastered Chapter {chapter.chapter_number}?</h3>
                    <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                      Test your memory recall on Articles, Amendments, and Landmark Judgments with real WBCS/WBP exam questions.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                      <button
                        onClick={() => {
                          setActiveTab('mcqs');
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs md:text-sm transition flex items-center gap-2 shadow-sm"
                      >
                        <HelpCircle className="w-4 h-4" /> Start Chapter Test ({chapter.mcqs?.length || 0} Questions)
                      </button>
                      <button
                        onClick={handleMarkComplete}
                        className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 font-bold text-xs md:text-sm transition flex items-center gap-2 shadow-2xs"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        {isCompleted ? 'Chapter Completed' : 'Mark as Read'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Practice MCQs Tab */}
            {activeTab === 'mcqs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Chapter {chapter.chapter_number} Assessment Arena</h3>
                    <p className="text-xs text-slate-500 mt-0.5">High-Yield Questions with Detailed Explanations</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-bold">Score:</span>
                    <div className="text-xl font-black text-[#2563EB]">
                      {score} / {chapter.mcqs?.length || 0}
                    </div>
                  </div>
                </div>

                {chapter.mcqs && chapter.mcqs.length > 0 ? (
                  <div className="space-y-4">
                    {chapter.mcqs.map((mcq, idx) => {
                      const selected = selectedAnswers[idx];
                      const isAnswered = showExplanation[idx];
                      const isCorrect = selected === mcq.correct_option;

                      return (
                        <div 
                          key={mcq.id || idx}
                          className="bg-white border border-slate-200 rounded-3xl p-6 transition shadow-xs"
                        >
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[#2563EB] font-black text-xs">
                              Question {idx + 1}
                            </span>
                            <span className="text-[11px] font-bold text-slate-600 px-2.5 py-0.5 bg-slate-100 rounded-md">
                              {mcq.difficulty || 'Moderate'}
                            </span>
                          </div>

                          <h4 className="text-sm md:text-base font-extrabold text-slate-900 leading-relaxed">
                            {mcq.question_text}
                          </h4>

                          {/* Options */}
                          <div className="grid grid-cols-1 gap-2.5 mt-4">
                            {[
                              { opt: 'A', text: mcq.option_a },
                              { opt: 'B', text: mcq.option_b },
                              { opt: 'C', text: mcq.option_c },
                              { opt: 'D', text: mcq.option_d }
                            ].map(({ opt, text }) => {
                              let optStyle = 'border-slate-200 bg-slate-50/70 text-slate-800 hover:border-[#2563EB] hover:bg-blue-50/20';

                              if (isAnswered) {
                                if (opt === mcq.correct_option) {
                                  optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                                } else if (selected === opt) {
                                  optStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                                } else {
                                  optStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                                }
                              }

                              return (
                                <button
                                  key={opt}
                                  disabled={isAnswered}
                                  onClick={() => handleSelectOption(idx, opt)}
                                  className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition flex items-center gap-3 ${optStyle}`}
                                >
                                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                                    isAnswered && opt === mcq.correct_option
                                      ? 'bg-emerald-600 text-white'
                                      : isAnswered && selected === opt
                                      ? 'bg-rose-600 text-white'
                                      : 'bg-white border border-slate-300 text-slate-700'
                                  }`}>
                                    {opt}
                                  </span>
                                  <span className="flex-1">{text}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation Card */}
                          {isAnswered && (
                            <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                              <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                                isCorrect ? 'bg-emerald-50 border border-emerald-200 text-emerald-950' : 'bg-rose-50 border border-rose-200 text-rose-950'
                              }`}>
                                <div className="font-black flex items-center gap-1.5 mb-1.5 text-xs uppercase tracking-wider">
                                  {isCorrect ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-rose-600" />}
                                  {isCorrect ? 'Correct Answer!' : `Incorrect (Correct Option: ${mcq.correct_option})`}
                                </div>
                                <p className="text-slate-700 text-xs md:text-sm">{mcq.explanation}</p>
                              </div>

                              {mcq.trap_warning && (
                                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-2.5">
                                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-black uppercase tracking-wider text-[11px] block text-amber-800">High-Yield Exam Trap:</span>
                                    {mcq.trap_warning}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 shadow-xs">
                    <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Practice questions loaded.</p>
                  </div>
                )}
              </div>
            )}

            {/* Chapter Footer Navigation */}
            <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
              {chapter.prev_chapter ? (
                <Link
                  href={`/polity/${chapter.prev_chapter.slug}`}
                  className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-600 hover:text-[#2563EB] transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">Previous Chapter</span>
                    Ch {chapter.prev_chapter.chapter_number}: {chapter.prev_chapter.title}
                  </div>
                </Link>
              ) : <div />}

              {chapter.next_chapter && (
                <Link
                  href={`/polity/${chapter.next_chapter.slug}`}
                  className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-600 hover:text-[#2563EB] transition text-right"
                >
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">Next Chapter</span>
                    Ch {chapter.next_chapter.chapter_number}: {chapter.next_chapter.title}
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Right Sticky Table of Contents (1/4 Width on Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black text-[#2563EB] uppercase tracking-wider mb-3">
                  <ListOrdered className="w-4 h-4" />
                  Table of Contents
                </div>

                <div className="space-y-1 max-h-[calc(100vh-14rem)] overflow-y-auto scrollbar-thin text-xs">
                  {tocItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      className="block px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[#2563EB] hover:bg-blue-50/70 transition line-clamp-1 font-semibold"
                    >
                      {item.text}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Jump to Assessment */}
              <button
                onClick={() => {
                  setActiveTab('mcqs');
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="w-full p-4 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:border-[#2563EB] text-left transition group shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs font-extrabold text-[#2563EB] mb-1">
                  <span>Take Chapter Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{chapter.mcqs?.length || 0} Questions Ready</p>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
