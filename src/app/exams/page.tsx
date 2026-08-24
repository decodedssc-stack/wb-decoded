'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import StudentSideDrawer from '@/components/layout/StudentSideDrawer';
import {
  Award,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Layers,
  Clock,
  BookOpen,
  ArrowRight,
  Search,
  CheckCircle2,
  ChevronRight,
  Menu,
  Sparkles
} from 'lucide-react';

export default function ExamsCatalogPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/exams')
      .then(res => res.json())
      .then(data => {
        if (data?.categories) setCategories(data.categories);
        if (data?.exams) setExams(data.exams);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching exams:', err);
        setLoading(false);
      });
  }, []);

  const filteredExams = exams.filter(exam => {
    const matchesCategory = selectedCategory === 'all' || exam.category_id === selectedCategory || exam.category_slug === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      exam.name?.toLowerCase().includes(q) || 
      exam.authority?.toLowerCase().includes(q) ||
      exam.description?.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

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
            <span className="font-extrabold text-sm text-white">Test Series Hub</span>
          </div>
          <Link href="/pyq" className="text-xs text-teal-400 font-bold">
            PYP Papers &rarr;
          </Link>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
          
          {/* Header Title with Left Blue Accent Line */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center">
                  <span className="w-1.5 h-6 bg-[#2563EB] rounded-full inline-block mr-3"></span>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Full-Length Official Exam Mock Tests
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium ml-4.5 mt-1">
                  Choose your target West Bengal State Government examination to take full-length mock tests under real exam conditions.
                </p>
              </div>

              <Link
                href="/attempted-mocks"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>My Attempted Tests &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Search & Category Filter Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by exam name or authority (e.g. WBCS, Food SI, Police)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-colors whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-[#121820] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                All WB Exams ({exams.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-colors whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Exams Grid */}
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs font-bold text-slate-500">Loading exam test series...</p>
            </div>
          ) : filteredExams.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Award className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-black text-base text-slate-800">No matching exams found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for another keyword or select All WB Exams above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#2563EB] hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                        {exam.category_name || 'WB State Exam'}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Official Pattern
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-[#2563EB] transition-colors leading-snug">
                        {exam.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-400 mt-0.5">
                        {exam.authority}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {exam.description}
                    </p>

                    <div className="pt-2 flex items-center gap-4 text-xs text-slate-500 border-t border-slate-100">
                      <div className="flex items-center gap-1 text-slate-900 font-bold">
                        <Award className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>100 Full-Length Tests</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Live CBT Format</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      href={`/exams/${exam.slug}`}
                      className="text-xs font-bold text-slate-700 hover:text-[#2563EB] flex items-center gap-1 hover:underline"
                    >
                      Syllabus Blueprint &rarr;
                    </Link>

                    <Link
                      href={`/exams/${exam.slug}`}
                      className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs shadow-xs transition-colors"
                    >
                      Take Full Mocks &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
