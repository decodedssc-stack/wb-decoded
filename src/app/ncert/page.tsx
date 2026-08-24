'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import StudentSideDrawer from '@/components/layout/StudentSideDrawer';
import {
  BookOpen,
  Search,
  ChevronRight,
  Layers,
  Sparkles,
  Download,
  Menu,
  GraduationCap,
  Landmark,
  MapPin,
  Scale,
  Atom,
  Coins,
  ArrowRight,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function NcertLibraryPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/ncert')
      .then(res => res.json())
      .then(data => {
        if (data?.books) setBooks(data.books);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load NCERT library:', err);
        setLoading(false);
      });
  }, []);

  const classList = [
    { id: 'all', name: '📚 All NCERT Books' },
    { id: '11', name: '⭐ Class 11 Master Notes (Polity, Geo, Econ, History)' },
    { id: '12', name: '⭐ Class 12 Master Notes (History, Macroeconomics, Politics)' },
    { id: '10', name: 'Class 10' },
    { id: '9', name: 'Class 9' },
    { id: '8', name: 'Class 8' },
    { id: '7', name: 'Class 7' },
    { id: '6', name: 'Class 6' }
  ];

  const subjectList = [
    { id: 'all', name: 'All Subjects', icon: 'BookOpen' },
    { id: 'history', name: 'History', icon: 'Landmark', color: '#B45309' },
    { id: 'geography', name: 'Geography', icon: 'MapPin', color: '#047857' },
    { id: 'polity', name: 'Polity / Civics', icon: 'Scale', color: '#1D4ED8' },
    { id: 'science', name: 'Science', icon: 'Atom', color: '#0284C7' },
    { id: 'economics', name: 'Economics', icon: 'Coins', color: '#7C3AED' }
  ];

  const filteredBooks = useMemo(() => {
    return books.filter(b => {
      const matchClass = selectedClass === 'all' || b.class_num.toString() === selectedClass;
      const matchSubject = selectedSubject === 'all' || b.subject.toLowerCase() === selectedSubject.toLowerCase();
      const matchQuery = !searchQuery ||
        b.book_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchClass && matchSubject && matchQuery;
    });
  }, [books, selectedClass, selectedSubject, searchQuery]);

  const getSubjectIcon = (subName: string) => {
    switch (subName?.toLowerCase()) {
      case 'history': return <Landmark className="w-5 h-5 text-white" />;
      case 'geography': return <MapPin className="w-5 h-5 text-white" />;
      case 'polity': return <Scale className="w-5 h-5 text-white" />;
      case 'science': return <Atom className="w-5 h-5 text-white" />;
      case 'economics': return <Coins className="w-5 h-5 text-white" />;
      default: return <BookOpen className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-[calc(100vh-4rem)] w-full overflow-x-hidden select-none font-sans">
      
      <StudentSidebar />
      <StudentSideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="flex-1 w-full pb-28 lg:pb-12">
        
        {/* Top Mobile Black Header */}
        <header className="lg:hidden bg-[#121820] text-white px-4 py-3 sticky top-0 z-30 shadow-md flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsDrawerOpen(true)} className="p-1 text-white">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-extrabold text-sm text-white">NCERT Books Library</span>
          </div>
          <Link href="/study-notes" className="text-xs text-teal-400 font-bold">
            Notes Hub &rarr;
          </Link>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
          
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center">
                  <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block mr-3"></span>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Complete NCERT Textbooks Repository (Class 6 to 12)
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium ml-4.5 mt-1">
                  Complete chapter-wise textbooks for History, Geography, Polity, Science, and Economics with chapter summaries and direct PDF downloads.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-black">
                  📚 {books.length} Official NCERT Books
                </span>
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="relative pt-2">
              <Search className="w-5 h-5 text-slate-400 absolute left-4.5 top-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search NCERT books (e.g. Our Pasts, Indian Constitution at Work, Physical Geography)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Class Filter Tabs */}
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-1.5 h-4 bg-[#2563EB] rounded-full inline-block mr-2"></span>
              <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
                Filter by Class
              </h2>
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2 pt-0.5">
              {classList.map(cls => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                    selectedClass === cls.id
                      ? 'bg-[#121820] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {cls.name}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter Pills */}
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-1.5 h-4 bg-[#2563EB] rounded-full inline-block mr-2"></span>
              <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
                Filter by Subject
              </h2>
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2 pt-0.5">
              {subjectList.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedSubject === sub.id
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Books Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-1.5 h-4.5 bg-[#2563EB] rounded-full inline-block mr-2.5"></span>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  Available NCERT Books ({filteredBooks.length})
                </h3>
              </div>
            </div>

            {loading ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs font-bold text-slate-500">Loading NCERT books...</p>
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-black text-base text-slate-800">No NCERT books match your filter</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try switching the class or subject filters above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.map((book) => (
                  <Link
                    key={book.id}
                    href={`/ncert/${book.id}`}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-[#2563EB] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div 
                          className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs"
                          style={{ backgroundColor: book.color || '#2563EB' }}
                        >
                          {getSubjectIcon(book.subject)}
                        </div>

                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                          Class {book.class_num}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          {book.subject}
                        </span>
                        <h4 className="font-black text-sm sm:text-base text-slate-900 group-hover:text-[#2563EB] transition-colors leading-snug mt-0.5">
                          {book.book_title}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {book.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-400">
                        {book.total_chapters} Chapters
                      </span>

                      <span className="font-black text-[#2563EB] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Chapters &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </main>

      </div>

    </div>
  );
}
