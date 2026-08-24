'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Share2,
  Bookmark,
  CheckCircle2,
  Check,
  ChevronRight,
  ListOrdered,
  Eye,
  Award,
  Sparkles,
  Printer,
  ChevronDown,
  Layers,
  FileText,
  RotateCcw,
  Languages
} from 'lucide-react';

export default function StudyNoteReaderPage() {
  const params = useParams();
  const router = useRouter();
  const noteId = params.id as string;

  const [note, setNote] = useState<any>(null);
  const [relatedQuestions, setRelatedQuestions] = useState<any[]>([]);
  const [navigation, setNavigation] = useState<any>({ prev: null, next: null });
  const [loading, setLoading] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [saved, setSaved] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`/api/study-notes/${noteId}`)
      .then(res => res.json())
      .then(data => {
        if (data?.note) {
          setNote(data.note);
          setRelatedQuestions(data.relatedQuestions || []);
          setNavigation(data.navigation || { prev: null, next: null });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading study note:', err);
        setLoading(false);
      });
  }, [noteId]);

  // Parse Table of Contents from Markdown headings
  const tableOfContents = useMemo(() => {
    if (!note?.content_markdown) return [];
    const lines = note.content_markdown.split('\n');
    const toc: { id: string; text: string; level: number }[] = [];

    lines.forEach((line: string) => {
      const matchH2 = line.match(/^##\s+(.+)$/);
      const matchH3 = line.match(/^###\s+(.+)$/);

      if (matchH2) {
        const text = matchH2[1].replace(/[*_~`]/g, '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        toc.push({ id, text, level: 2 });
      } else if (matchH3) {
        const text = matchH3[1].replace(/[*_~`]/g, '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        toc.push({ id, text, level: 3 });
      }
    });

    return toc;
  }, [note]);

  // Markdown rendering helper
  const renderFormattedContent = (markdown: string) => {
    if (!markdown) return null;
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let isHeaderRow = true;

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Table parsing
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        inTable = true;
        const cells = trimmed.split('|').slice(1, -1).map(c => c.trim());
        if (cells.every(c => c.match(/^:?-+:?$/))) {
          // Separator row
          isHeaderRow = false;
          return;
        }
        tableRows.push(cells);
        return;
      } else if (inTable) {
        // End of table
        elements.push(
          <div key={`table-${idx}`} className="overflow-x-auto my-5 rounded-2xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/90 text-slate-900 font-extrabold border-b border-slate-200">
                <tr>
                  {tableRows[0]?.map((th, thIdx) => (
                    <th key={thIdx} className="p-3 sm:p-3.5 whitespace-normal">
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {tableRows.slice(1).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 sm:p-3.5 text-slate-700 font-medium">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableRows = [];
        isHeaderRow = true;
      }

      if (!trimmed) {
        return;
      }

      // Headings
      if (trimmed.startsWith('# ')) {
        elements.push(
          <h1 key={idx} className="text-xl sm:text-2xl font-black text-slate-900 mt-6 mb-3 tracking-tight">
            {trimmed.replace('# ', '')}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        const text = trimmed.replace('## ', '');
        const id = text.replace(/[*_~`]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h2 key={idx} id={id} className="text-lg sm:text-xl font-black text-slate-900 mt-8 mb-3 pt-3 border-t border-slate-200/80 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#2563EB] rounded-full inline-block"></span>
            <span>{text}</span>
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        const text = trimmed.replace('### ', '');
        const id = text.replace(/[*_~`]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        elements.push(
          <h3 key={idx} id={id} className="text-base font-extrabold text-slate-800 mt-5 mb-2">
            {text}
          </h3>
        );
      }
      // Blockquotes / Callout Boxes
      else if (trimmed.startsWith('> ')) {
        elements.push(
          <div key={idx} className="p-4 rounded-2xl bg-blue-50/80 border-l-4 border-[#2563EB] text-slate-800 text-xs sm:text-sm font-semibold my-4 leading-relaxed shadow-2xs">
            {trimmed.replace('> ', '')}
          </div>
        );
      }
      // Bullet items
      else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        elements.push(
          <li key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed ml-5 list-disc my-1">
            <span dangerouslySetInnerHTML={{ __html: trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </li>
        );
      }
      // Numbered items
      else if (trimmed.match(/^\d+\.\s+/)) {
        elements.push(
          <li key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed ml-5 list-decimal my-1.5 font-medium">
            <span dangerouslySetInnerHTML={{ __html: trimmed.replace(/^\d+\.\s+/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </li>
        );
      }
      // Standard Paragraph
      else {
        elements.push(
          <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed my-2 font-normal">
            <span dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </p>
        );
      }
    });

    return elements;
  };

  const handleSelectOption = (qId: string, opt: string) => {
    setUserAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const handleRevealAnswer = (qId: string) => {
    setRevealedAnswers(prev => ({ ...prev, [qId]: true }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-slate-600">Loading Master Study Note...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-xl font-black text-slate-900">Study Note Not Found</h2>
        <Link href="/study-notes" className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs">
          Return to Study Notes Library
        </Link>
      </div>
    );
  }

  return (
    <div className="flex bg-[#F8FAFC] min-h-[calc(100vh-4rem)] w-full overflow-x-hidden font-sans select-none">
      
      <StudentSidebar />

      <div className="flex-1 w-full pb-20 lg:pb-12">
        
        {/* Sticky Top Reading Control Bar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 sticky top-0 z-30 shadow-2xs flex items-center justify-between">
          <div className="flex items-center space-x-3 truncate">
            <Link
              href="/study-notes"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
              title="Back to Notes Library"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="truncate">
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>{note.subject_name}</span>
                <span>•</span>
                <span>{note.read_time_mins} Mins Read</span>
              </div>
              <h2 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                {note.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Font Size Adjuster */}
            <div className="hidden sm:flex items-center space-x-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
              <button 
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded-lg ${fontSize === 'normal' ? 'bg-white shadow-2xs text-[#2563EB]' : ''}`}
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded-lg text-sm ${fontSize === 'large' ? 'bg-white shadow-2xs text-[#2563EB]' : ''}`}
              >
                A+
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => setSaved(!saved)}
              className={`p-2 rounded-xl border transition-colors ${
                saved ? 'bg-blue-50 border-blue-300 text-[#2563EB]' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Bookmark Note"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dual-Pane Canvas (Left: Table of Contents | Right: Content Body) */}
        <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Table of Contents Sticky Sidebar (Desktop 4 Cols) */}
          <div className="hidden lg:block lg:col-span-4 space-y-4">
            <div className="sticky top-20 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <ListOrdered className="w-4 h-4 text-[#2563EB]" />
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                  Table of Contents
                </h3>
              </div>

              <div className="space-y-1.5 max-h-[65vh] overflow-y-auto pr-1 text-xs">
                {tableOfContents.map((item, idx) => (
                  <a
                    key={idx}
                    href={`#${item.id}`}
                    className={`block py-1.5 px-2 rounded-lg transition-colors leading-snug ${
                      item.level === 2 
                        ? 'font-bold text-slate-800 hover:bg-slate-100 hover:text-[#2563EB]' 
                        : 'font-medium text-slate-500 pl-4 hover:text-[#2563EB]'
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </div>

              {/* Related Chapter Practice Box */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Quick Action
                </span>
                <Link
                  href={`/practice`}
                  className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-xs text-center flex items-center justify-center gap-1.5"
                >
                  <span>Practice Chapter MCQs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Main Reading Body (8 Cols on Desktop) */}
          <div className="lg:col-span-8 space-y-6">
            
            <article className={`bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-4 ${
              fontSize === 'large' ? 'text-base' : fontSize === 'xlarge' ? 'text-lg' : 'text-sm'
            }`}>
              
              {/* Note Header */}
              <div className="space-y-3 pb-4 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span 
                    className="px-3 py-1 rounded-lg text-xs font-black uppercase text-white shadow-2xs"
                    style={{ backgroundColor: note.subject_color || '#2563EB' }}
                  >
                    {note.subject_name}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    ⏱️ {note.read_time_mins} mins read
                  </span>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                    Official Master Note
                  </span>
                </div>

                <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  {note.title}
                </h1>

                {note.title_bn && (
                  <p className="text-sm sm:text-base text-slate-600 font-bengali">
                    {note.title_bn}
                  </p>
                )}

                {/* Exam Target Strip */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-500 block mb-1">Target Examination Coverage:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {note.exam_coverage.split(',').map((ex: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-bold">
                        {ex.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Render Markdown Content */}
              <div className="pt-2 text-slate-800 leading-relaxed font-sans">
                {renderFormattedContent(note.content_markdown)}
              </div>

            </article>

            {/* Bottom Next / Previous Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {navigation.prev ? (
                <Link
                  href={`/study-notes/${navigation.prev.id}`}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#2563EB] shadow-2xs transition-all space-y-1 block"
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    &larr; Previous Note
                  </span>
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-1">
                    {navigation.prev.title}
                  </span>
                </Link>
              ) : <div></div>}

              {navigation.next ? (
                <Link
                  href={`/study-notes/${navigation.next.id}`}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#2563EB] shadow-2xs transition-all space-y-1 text-right block"
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Next Note &rarr;
                  </span>
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-1">
                    {navigation.next.title}
                  </span>
                </Link>
              ) : <div></div>}
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}
