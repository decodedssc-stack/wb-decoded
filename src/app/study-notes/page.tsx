'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import StudentSideDrawer from '@/components/layout/StudentSideDrawer';
import {
  BookOpen,
  Search,
  Clock,
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  Bookmark,
  Share2,
  Menu,
  FileText,
  HelpCircle,
  Eye,
  Filter,
  ArrowRight,
  Zap,
  Scale,
  Landmark,
  MapPin,
  Coins,
  Calculator,
  Atom,
  Feather,
  Smile,
  Flag,
  Brain
} from 'lucide-react';

export default function StudyNotesLibraryPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/study-notes')
      .then(res => res.json())
      .then(data => {
        if (data?.notes) setNotes(data.notes);
        if (data?.subjects) setSubjects(data.subjects);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load study notes:', err);
        setLoading(false);
      });
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter(n => {
      const matchSubject = selectedSubject === 'all' || n.subject_id === selectedSubject;
      const matchQuery = !searchQuery || 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.exam_coverage.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubject && matchQuery;
    });
  }, [notes, selectedSubject, searchQuery]);

  const getSubjectIcon = (iconName: string) => {
    const props = { className: 'w-5 h-5 text-white' };
    switch (iconName?.toLowerCase()) {
      case 'flag': return <Flag {...props} />;
      case 'landmark': return <Landmark {...props} />;
      case 'mappin': return <MapPin {...props} />;
      case 'scale': return <Scale {...props} />;
      case 'coins': return <Coins {...props} />;
      case 'calculator': return <Calculator {...props} />;
      case 'atom': return <Atom {...props} />;
      case 'feather': return <Feather {...props} />;
      case 'smile': return <Smile {...props} />;
      case 'brain': return <Brain {...props} />;
      case 'zap': return <Zap {...props} />;
      default: return <BookOpen {...props} />;
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
            <span className="font-extrabold text-sm text-white">Study Notes Library</span>
          </div>
          <Link href="/pyq" className="text-xs text-teal-400 font-bold">
            20-Yr PYP &rarr;
          </Link>
        </header>

        {/* Main Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
          
          {/* Header Banner with Left Blue Accent Line */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center">
                  <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block mr-3"></span>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Subject-Wise &amp; Chapter-Wise Master Study Notes
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium ml-4.5 mt-1">
                  Exhaustive, deeply researched handbook notes curated for WBCS, UPSC, SSC CGL/CHSL, Railways RRB, WB Police SI/Constable, Food SI &amp; Clerkship.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-black">
                  📖 {notes.length} Master Notes Available
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
                placeholder="Search topics (e.g. Fundamental Rights, Bengal Partition, RBI Monetary Policy, Rivers, Vitamins)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Subject Filter Pills (Horizontal Scroll) */}
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-1.5 h-4 bg-[#2563EB] rounded-full inline-block mr-2"></span>
              <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
                Select Subject
              </h2>
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2 pt-0.5">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  selectedSubject === 'all'
                    ? 'bg-[#121820] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                🔥 All Subjects ({notes.length})
              </button>

              {subjects.filter(s => s.notes_count > 0).map((sub) => (
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
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    selectedSubject === sub.id ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {sub.notes_count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-1.5 h-4.5 bg-[#2563EB] rounded-full inline-block mr-2.5"></span>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {selectedSubject === 'all' ? 'All Handbooks & Notes' : 'Subject Handbooks'} ({filteredNotes.length})
                </h3>
              </div>
            </div>

            {loading ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs font-bold text-slate-500">Loading comprehensive study notes...</p>
              </div>
            ) : filteredNotes.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-black text-base text-slate-800">No matching study notes found</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try searching for another keyword or switch subject filters above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNotes.map((note) => (
                  <Link
                    key={note.id}
                    href={`/study-notes/${note.id}`}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-[#2563EB] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      {/* Top Tag Strip */}
                      <div className="flex items-center justify-between gap-2">
                        <span 
                          className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase text-white shadow-2xs"
                          style={{ backgroundColor: note.subject_color || '#2563EB' }}
                        >
                          {note.subject_name}
                        </span>

                        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {note.read_time_mins} mins
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <div>
                        <h4 className="font-black text-base text-slate-900 group-hover:text-[#2563EB] transition-colors leading-snug">
                          {note.title}
                        </h4>
                        {note.title_bn && (
                          <p className="text-xs text-slate-500 font-bengali mt-1">
                            {note.title_bn}
                          </p>
                        )}
                      </div>

                      {/* Summary */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {note.summary}
                      </p>

                      {/* Exam Coverage Badge Strip */}
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Covered In Exams:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {note.exam_coverage.split(',').slice(0, 4).map((ex: string, i: number) => (
                            <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {ex.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-semibold flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {note.views_count} reads
                      </span>

                      <span className="font-black text-[#2563EB] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Full Note &rarr;
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
