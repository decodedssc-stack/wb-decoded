'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Download,
  Clock,
  Bookmark,
  Share2,
  ListOrdered,
  FileText
} from 'lucide-react';

export default function NcertChapterReadingPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.bookId as string;
  const chapterId = params.chapterId as string;

  const [book, setBook] = useState<any>(null);
  const [chapter, setChapter] = useState<any>(null);
  const [navigation, setNavigation] = useState<any>({ prev: null, next: null });
  const [loading, setLoading] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  useEffect(() => {
    fetch(`/api/ncert/${bookId}/${chapterId}`)
      .then(res => res.json())
      .then(data => {
        if (data?.book) setBook(data.book);
        if (data?.chapter) setChapter(data.chapter);
        if (data?.navigation) setNavigation(data.navigation);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load chapter:', err);
        setLoading(false);
      });
  }, [bookId, chapterId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-slate-600">Loading NCERT Chapter Notes...</p>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-xl font-black text-slate-900">NCERT Chapter Not Found</h2>
        <Link href={`/ncert/${bookId}`} className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs">
          Back to Book
        </Link>
      </div>
    );
  }

  const renderContent = (content: string) => {
    if (!content) return null;
    return content.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-xl sm:text-2xl font-black text-slate-900 mt-6 mb-3 tracking-tight">
            {trimmed.replace('# ', '')}
          </h1>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-lg sm:text-xl font-black text-slate-900 mt-8 mb-3 pt-3 border-t border-slate-200 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#2563EB] rounded-full inline-block"></span>
            <span>{trimmed.replace('## ', '')}</span>
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base font-extrabold text-slate-800 mt-5 mb-2">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('> ')) {
        return (
          <div key={idx} className="p-4 rounded-2xl bg-blue-50/80 border-l-4 border-[#2563EB] text-slate-800 text-xs sm:text-sm font-semibold my-4 leading-relaxed">
            {trimmed.replace('> ', '')}
          </div>
        );
      }
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        return (
          <li key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed ml-5 list-disc my-1">
            <span dangerouslySetInnerHTML={{ __html: trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </li>
        );
      }
      if (trimmed.match(/^\d+\.\s+/)) {
        return (
          <li key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed ml-5 list-decimal my-1.5 font-medium">
            <span dangerouslySetInnerHTML={{ __html: trimmed.replace(/^\d+\.\s+/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </li>
        );
      }

      return (
        <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed my-2">
          <span dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        </p>
      );
    });
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-[calc(100vh-4rem)] w-full overflow-x-hidden font-sans select-none">
      
      <StudentSidebar />

      <div className="flex-1 w-full pb-20 lg:pb-12">
        
        <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 sticky top-0 z-30 shadow-2xs flex items-center justify-between">
          <div className="flex items-center space-x-3 truncate">
            <Link
              href={`/ncert/${bookId}`}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
              title="Back to Book"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="truncate">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {book?.book_title}
              </span>
              <h2 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                Chapter {chapter.chapter_num}: {chapter.chapter_title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="https://ncert.nic.in/textbook.php"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="hidden sm:inline">PDF</span>
            </a>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-4">
            
            <div className="space-y-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-black uppercase bg-blue-50 text-[#2563EB] border border-blue-200">
                  NCERT Class {book?.class_num} • {book?.subject}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  ⏱️ {chapter.read_time_mins} mins read
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                Chapter {chapter.chapter_num}: {chapter.chapter_title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {chapter.summary}
              </p>
            </div>

            <div className="pt-2 text-slate-800 leading-relaxed">
              {renderContent(chapter.content_markdown)}
            </div>

          </article>

          {/* Navigation Footers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {navigation.prev ? (
              <Link
                href={`/ncert/${bookId}/${navigation.prev.id}`}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#2563EB] shadow-2xs transition-all space-y-1 block"
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  &larr; Previous Chapter
                </span>
                <span className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-1">
                  Ch {navigation.prev.chapter_num}: {navigation.prev.chapter_title}
                </span>
              </Link>
            ) : <div></div>}

            {navigation.next ? (
              <Link
                href={`/ncert/${bookId}/${navigation.next.id}`}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#2563EB] shadow-2xs transition-all space-y-1 text-right block"
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Next Chapter &rarr;
                </span>
                <span className="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-1">
                  Ch {navigation.next.chapter_num}: {navigation.next.chapter_title}
                </span>
              </Link>
            ) : <div></div>}
          </div>

        </main>

      </div>

    </div>
  );
}
