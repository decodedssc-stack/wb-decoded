'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Clock,
  Download,
  FileText,
  CheckCircle2,
  Bookmark,
  Share2,
  Sparkles,
  Award
} from 'lucide-react';

export default function NcertBookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.bookId as string;

  const [book, setBook] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/ncert/${bookId}`)
      .then(res => res.json())
      .then(data => {
        if (data?.book) setBook(data.book);
        if (data?.chapters) setChapters(data.chapters);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load book:', err);
        setLoading(false);
      });
  }, [bookId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-slate-600">Loading NCERT Textbook Chapters...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-xl font-black text-slate-900">NCERT Book Not Found</h2>
        <Link href="/ncert" className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs">
          Return to NCERT Library
        </Link>
      </div>
    );
  }

  return (
    <div className="flex bg-[#F8FAFC] min-h-[calc(100vh-4rem)] w-full overflow-x-hidden font-sans select-none">
      
      <StudentSidebar />

      <div className="flex-1 w-full pb-20 lg:pb-12">
        
        <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 sticky top-0 z-30 shadow-2xs flex items-center justify-between">
          <div className="flex items-center space-x-3 truncate">
            <Link
              href="/ncert"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
              title="Back to NCERT Library"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="truncate">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Class {book.class_num} • {book.subject}
              </span>
              <h2 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                {book.book_title}
              </h2>
            </div>
          </div>

          <a
            href="https://ncert.nic.in/textbook.php"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Official NCERT PDF</span>
          </a>
        </header>

        <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Book Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-black uppercase bg-blue-50 text-[#2563EB] border border-blue-200">
                    NCERT Class {book.class_num}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {book.subject}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {book.book_title}
                </h1>
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                  {book.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center shrink-0 space-y-1">
                <span className="text-2xl font-black text-slate-900 block">{chapters.length}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Chapters</span>
              </div>
            </div>
          </div>

          {/* Chapter List */}
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="w-1.5 h-4.5 bg-[#2563EB] rounded-full inline-block mr-2.5"></span>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                All Chapters in this Textbook ({chapters.length})
              </h3>
            </div>

            <div className="space-y-2.5">
              {chapters.map((chap) => (
                <Link
                  key={chap.id}
                  href={`/ncert/${book.id}/${chap.id}`}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs hover:border-[#2563EB] hover:shadow-sm transition-all flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center space-x-4">
                    <span className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-colors shrink-0">
                      {chap.chapter_num}
                    </span>

                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-[#2563EB] transition-colors leading-snug">
                        {chap.chapter_title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {chap.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs shrink-0">
                    <span className="hidden sm:inline text-slate-400 font-semibold">
                      ⏱️ {chap.read_time_mins} mins
                    </span>
                    <span className="font-bold text-[#2563EB] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </main>

      </div>

    </div>
  );
}
