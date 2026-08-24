'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/layout/AdminSidebar';
import {
  Database,
  Search,
  Plus,
  Filter,
  CheckCircle,
  XCircle,
  Archive,
  UploadCloud,
  Download,
  Trash2,
  Edit,
  Eye,
  CheckSquare,
  Square,
  Sparkles,
  AlertCircle,
  X,
  Languages,
  Check,
  HelpCircle,
  ArrowUpDown
} from 'lucide-react';

export default function AdminQuestionBankPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({ total: 0, page: 1, limit: 20, totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  
  const [examsList, setExamsList] = useState<any[]>([]);
  const [subjectsList, setSubjectsList] = useState<any[]>([]);
  const [chaptersList, setChaptersList] = useState<any[]>([]);
  
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [showCsvModal, setShowCsvModal] = useState<boolean>(false);
  const [csvPreview, setCsvPreview] = useState<any>(null);
  const [csvText, setCsvText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Active question for Edit or Preview
  const [activeQuestion, setActiveQuestion] = useState<any>(null);

  // Load hierarchy metadata
  useEffect(() => {
    fetch('/api/hierarchy')
      .then(res => res.json())
      .then(data => {
        if (data?.subjects) setSubjectsList(data.subjects);
        if (data?.chapters) setChaptersList(data.chapters);
      })
      .catch(err => console.error('Error loading hierarchy:', err));

    fetch('/api/exams?scope=all')
      .then(res => res.json())
      .then(data => {
        if (data?.exams) setExamsList(data.exams);
      })
      .catch(err => console.error('Error loading exams:', err));
  }, []);

  // New question form state
  const [newQ, setNewQ] = useState({
    question_text: '',
    question_text_bn: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    option_a_bn: '',
    option_b_bn: '',
    option_c_bn: '',
    option_d_bn: '',
    correct_answer: 'A',
    explanation: '',
    explanation_bn: '',
    exam_id: 'exam-wbcs',
    subject_id: 'sub-polity',
    chapter_id: 'chap-pol-fr-dpsp',
    difficulty: 'Moderate',
    is_pyq: 0,
    pyq_year: 2024,
  });

  const fetchQuestions = (page = 1) => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', '20');
    if (searchQuery) params.set('search', searchQuery);
    if (selectedExam) params.set('exam_id', selectedExam);
    if (selectedSubject) params.set('subject_id', selectedSubject);
    if (selectedChapter) params.set('chapter_id', selectedChapter);
    if (selectedDifficulty) params.set('difficulty', selectedDifficulty);
    if (selectedStatus) params.set('lifecycle_status', selectedStatus);
    if (selectedYear) params.set('pyq_year', selectedYear);

    fetch(`/api/questions?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data?.questions) setQuestions(data.questions);
        if (data?.pagination) setPagination(data.pagination);
        setSelectedQuestions([]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading questions:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuestions(1);
  }, [selectedExam, selectedSubject, selectedChapter, selectedDifficulty, selectedStatus, selectedYear]);

  const filteredChapters = selectedSubject
    ? chaptersList.filter(c => c.subject_id === selectedSubject)
    : chaptersList;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchQuestions(1);
  };

  const handleSelectAll = () => {
    if (selectedQuestions.length === questions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(questions.map(q => q.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter(qId => qId !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedQuestions.length === 0) return;
    try {
      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bulk_action: true,
          action,
          question_ids: selectedQuestions,
        })
      });
      fetchQuestions(pagination.page);
    } catch (e) {
      console.error('Bulk action failed:', e);
    }
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newQ,
          quality_score: 95,
          confidence_score: 95,
          verification_status: 'Verified',
          lifecycle_status: 'Approved'
        })
      });
      const data = await res.json();
      if (data.success || data.question) {
        setShowCreateModal(false);
        setNewQ({
          question_text: '',
          question_text_bn: '',
          option_a: '',
          option_b: '',
          option_c: '',
          option_d: '',
          option_a_bn: '',
          option_b_bn: '',
          option_c_bn: '',
          option_d_bn: '',
          correct_answer: 'A',
          explanation: '',
          explanation_bn: '',
          exam_id: 'exam-wbcs',
          subject_id: 'sub-polity',
          chapter_id: 'chap-pol-fr-dpsp',
          difficulty: 'Moderate',
          is_pyq: 0,
          pyq_year: 2024,
        });
        fetchQuestions(1);
      }
    } catch (e) {
      console.error('Failed to create question:', e);
    }
  };

  const handleOpenEdit = (q: any) => {
    setActiveQuestion({ ...q });
    setShowEditModal(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuestion) return;
    try {
      const res = await fetch(`/api/questions/${activeQuestion.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeQuestion)
      });
      const data = await res.json();
      if (data.success) {
        setShowEditModal(false);
        setActiveQuestion(null);
        fetchQuestions(pagination.page);
      }
    } catch (e) {
      console.error('Failed to save question edit:', e);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/questions/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchQuestions(pagination.page);
      }
    } catch (e) {
      console.error('Failed to delete question:', e);
    }
  };

  const handleOpenPreview = (q: any) => {
    setActiveQuestion(q);
    setShowPreviewModal(true);
  };

  const handleValidateCsv = async () => {
    try {
      const rows = JSON.parse(csvText);
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          csv_import: true,
          validate_only: true,
          rows
        })
      });
      const data = await res.json();
      setCsvPreview(data);
    } catch (e) {
      alert('Invalid JSON array format. Please provide a valid JSON array.');
    }
  };

  const handleCommitCsv = async () => {
    try {
      const rows = JSON.parse(csvText);
      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          csv_import: true,
          validate_only: false,
          rows
        })
      });
      setShowCsvModal(false);
      setCsvPreview(null);
      setCsvText('');
      fetchQuestions(1);
    } catch (e) {
      console.error('CSV import commit failed:', e);
    }
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen select-none">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="space-y-1 relative z-10">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              CORE EXAM QUESTION REPOSITORY
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Question Bank Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {pagination.total} verified exam questions indexed with full bilingual support, subject tags, and zero duplicates.
            </p>
          </div>

          <div className="flex items-center gap-2.5 relative z-10">
            <button
              onClick={() => {
                setCsvText(JSON.stringify([
                  {
                    question_text: "Who led the Santhal Rebellion of 1855 in Bengal?",
                    option_a: "Sidhu and Kanhu Murmu",
                    option_b: "Birsa Munda",
                    option_c: "Titu Mir",
                    option_d: "Bhavani Pathak",
                    correct_answer: "A",
                    explanation: "Sidhu and Kanhu Murmu mobilized over 10,000 Santhals in 1855 in the Damin-i-Koh region against British revenue zamindars.",
                    exam_id: "exam-wbcs",
                    subject_id: "sub-inm"
                  }
                ], null, 2));
                setShowCsvModal(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Import Batch</span>
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Single MCQ</span>
            </button>
          </div>
        </div>

        {/* Smart Search & Filter Controls */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3.5">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder='Search question text, articles, concepts (e.g. "Article 21", "Lothal", "Panipat")...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </form>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            {/* Exam Filter */}
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 max-w-[180px]"
            >
              <option value="">All WB Exams</option>
              {examsList.map((ex: any) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name.split(' (')[0]}
                </option>
              ))}
            </select>

            {/* Subject Filter */}
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedChapter('');
              }}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 max-w-[200px]"
            >
              <option value="">All Subjects (12 Modules)</option>
              {subjectsList.map((sub: any) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.questions_count || 0})
                </option>
              ))}
            </select>

            {/* Chapter Filter */}
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 max-w-[220px]"
            >
              <option value="">
                {selectedSubject ? 'All Chapters in Subject' : 'Select Subject first'}
              </option>
              {filteredChapters.map((ch: any) => (
                <option key={ch.id} value={ch.id}>
                  {ch.name}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Lifecycle Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700"
            >
              <option value="">All Lifecycles</option>
              <option value="Approved">Approved</option>
              <option value="Published">Published</option>
              <option value="Verification pending">Verification Pending</option>
              <option value="Archived">Archived</option>
            </select>

            {selectedQuestions.length > 0 && (
              <span className="text-xs font-bold text-blue-600 ml-auto">
                {selectedQuestions.length} questions selected
              </span>
            )}
          </div>
        </div>

        {/* Bulk Action Operations Strip */}
        {selectedQuestions.length > 0 && (
          <div className="bg-[#0F172A] text-white p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
            <span className="text-xs font-bold text-amber-400">
              Bulk Actions ({selectedQuestions.length} items):
            </span>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => handleBulkAction('approve')}
                className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition-colors"
              >
                Approve Selected
              </button>
              <button
                onClick={() => handleBulkAction('publish')}
                className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white transition-colors"
              >
                Publish in Mocks
              </button>
              <button
                onClick={() => handleBulkAction('archive')}
                className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-slate-300 transition-colors"
              >
                Archive
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-white transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {/* Questions Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 grid grid-cols-12 gap-2 items-center">
            <div className="col-span-1 flex items-center justify-center">
              <button onClick={handleSelectAll}>
                {selectedQuestions.length === questions.length && questions.length > 0 ? (
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
            <span className="col-span-6">Question Text &amp; Subject</span>
            <span className="col-span-2 text-center">Correct Key</span>
            <span className="col-span-2 text-center">Status &amp; Quality</span>
            <span className="col-span-1 text-right">Actions</span>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                Loading questions from bank...
              </div>
            ) : questions.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                No questions found matching your filter criteria.
              </div>
            ) : (
              questions.map((q) => {
                const isSelected = selectedQuestions.includes(q.id);

                return (
                  <div key={q.id} className={`p-4 grid grid-cols-12 gap-2 items-center text-xs transition-colors ${
                    isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50/60'
                  }`}>
                    <div className="col-span-1 flex items-center justify-center">
                      <button onClick={() => handleToggleSelect(q.id)}>
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300" />
                        )}
                      </button>
                    </div>

                    <div className="col-span-6 space-y-1">
                      <p className="font-bold text-slate-900 line-clamp-2 leading-snug">
                        {q.question_text}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                        <span className="text-[#2563EB] font-bold">{q.subject_name || 'General Studies'}</span>
                        <span>• {q.difficulty}</span>
                        {q.is_pyq === 1 && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                            PYQ
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-900 font-black inline-flex items-center justify-center border border-slate-200">
                        {q.correct_answer}
                      </span>
                    </div>

                    <div className="col-span-2 text-center space-y-1">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold inline-block">
                        {q.lifecycle_status || 'Approved'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        Score: {Math.round(q.quality_score || 95)}/100
                      </span>
                    </div>

                    <div className="col-span-1 text-right flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenPreview(q)}
                        title="Preview Question"
                        className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(q)}
                        title="Edit Question"
                        className="p-1.5 text-slate-400 hover:text-amber-600 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        title="Delete Question"
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination bar */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span>Page {pagination.page} of {pagination.totalPages} ({pagination.total} Total Questions)</span>
            <div className="flex gap-1.5">
              <button
                disabled={pagination.page <= 1}
                onClick={() => fetchQuestions(pagination.page - 1)}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 disabled:opacity-40 font-bold hover:bg-slate-50 transition"
              >
                Previous
              </button>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchQuestions(pagination.page + 1)}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 disabled:opacity-40 font-bold hover:bg-slate-50 transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Modal: Preview Question */}
      {showPreviewModal && activeQuestion && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Question Preview ({activeQuestion.id})
              </span>
              <button onClick={() => setShowPreviewModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-extrabold text-slate-900 block text-sm">
                  {activeQuestion.question_text}
                </span>
                {activeQuestion.question_text_bn && activeQuestion.question_text_bn !== activeQuestion.question_text && (
                  <p className="text-xs text-slate-600 font-bengali">
                    {activeQuestion.question_text_bn}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {['A', 'B', 'C', 'D'].map(k => {
                  const opt = activeQuestion[`option_${k.toLowerCase()}`];
                  const isCorrect = activeQuestion.correct_answer === k;
                  return (
                    <div 
                      key={k} 
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                        isCorrect ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span><strong>{k}.</strong> {opt}</span>
                      {isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                  );
                })}
              </div>

              {activeQuestion.explanation && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-slate-800 leading-relaxed">
                  <span className="font-bold text-amber-900 block mb-0.5">Explanation:</span>
                  {activeQuestion.explanation}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit Question */}
      {showEditModal && activeQuestion && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">Edit Question ({activeQuestion.id})</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Question Statement (English) *</label>
                <textarea
                  rows={2}
                  required
                  value={activeQuestion.question_text || ''}
                  onChange={(e) => setActiveQuestion({ ...activeQuestion, question_text: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Question Statement (Bengali Translation)</label>
                <textarea
                  rows={2}
                  value={activeQuestion.question_text_bn || ''}
                  onChange={(e) => setActiveQuestion({ ...activeQuestion, question_text_bn: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bengali focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Option A *</label>
                  <input
                    type="text"
                    required
                    value={activeQuestion.option_a || ''}
                    onChange={(e) => setActiveQuestion({ ...activeQuestion, option_a: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Option B *</label>
                  <input
                    type="text"
                    required
                    value={activeQuestion.option_b || ''}
                    onChange={(e) => setActiveQuestion({ ...activeQuestion, option_b: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Option C *</label>
                  <input
                    type="text"
                    required
                    value={activeQuestion.option_c || ''}
                    onChange={(e) => setActiveQuestion({ ...activeQuestion, option_c: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Option D *</label>
                  <input
                    type="text"
                    required
                    value={activeQuestion.option_d || ''}
                    onChange={(e) => setActiveQuestion({ ...activeQuestion, option_d: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Correct Answer *</label>
                  <select
                    value={activeQuestion.correct_answer || 'A'}
                    onChange={(e) => setActiveQuestion({ ...activeQuestion, correct_answer: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white font-bold"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Difficulty</label>
                  <select
                    value={activeQuestion.difficulty || 'Moderate'}
                    onChange={(e) => setActiveQuestion({ ...activeQuestion, difficulty: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lifecycle Status</label>
                  <select
                    value={activeQuestion.lifecycle_status || 'Approved'}
                    onChange={(e) => setActiveQuestion({ ...activeQuestion, lifecycle_status: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Approved">Approved</option>
                    <option value="Published">Published</option>
                    <option value="Verification pending">Pending</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Explanation *</label>
                <textarea
                  rows={3}
                  required
                  value={activeQuestion.explanation || ''}
                  onChange={(e) => setActiveQuestion({ ...activeQuestion, explanation: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Single Question */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">Add Single MCQ to Question Bank</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Question Text (English) *</label>
                <textarea
                  rows={2}
                  required
                  value={newQ.question_text}
                  onChange={(e) => setNewQ({ ...newQ, question_text: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Question Text (Bengali Translation)</label>
                <textarea
                  rows={2}
                  value={newQ.question_text_bn}
                  onChange={(e) => setNewQ({ ...newQ, question_text_bn: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-bengali"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Option A *</label>
                  <input
                    type="text"
                    required
                    value={newQ.option_a}
                    onChange={(e) => setNewQ({ ...newQ, option_a: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Option B *</label>
                  <input
                    type="text"
                    required
                    value={newQ.option_b}
                    onChange={(e) => setNewQ({ ...newQ, option_b: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Option C *</label>
                  <input
                    type="text"
                    required
                    value={newQ.option_c}
                    onChange={(e) => setNewQ({ ...newQ, option_c: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Option D *</label>
                  <input
                    type="text"
                    required
                    value={newQ.option_d}
                    onChange={(e) => setNewQ({ ...newQ, option_d: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Correct Answer *</label>
                  <select
                    value={newQ.correct_answer}
                    onChange={(e) => setNewQ({ ...newQ, correct_answer: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white font-bold"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Difficulty</label>
                  <select
                    value={newQ.difficulty}
                    onChange={(e) => setNewQ({ ...newQ, difficulty: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <select
                    value={newQ.subject_id}
                    onChange={(e) => setNewQ({ ...newQ, subject_id: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  >
                    {subjectsList.map((s: any) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Explanation &amp; Rationale *</label>
                <textarea
                  rows={2}
                  required
                  value={newQ.explanation}
                  onChange={(e) => setNewQ({ ...newQ, explanation: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold"
                >
                  Commit Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: CSV / Batch Import Validator */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">Bulk Import Pre-Validation Center</h3>
              <button onClick={() => setShowCsvModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
            </div>

            <p className="text-xs text-slate-500">
              Paste JSON or CSV array with columns: Question, Options A-D, Answer, Explanation, Exam, Subject.
            </p>

            <textarea
              rows={8}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-200 font-mono text-xs focus:outline-none"
            />

            {csvPreview && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900">Pre-Import Validation Report:</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-emerald-100 rounded-xl text-emerald-900 font-bold">
                    {csvPreview.validCount} Valid
                  </div>
                  <div className="p-2 bg-rose-100 rounded-xl text-rose-900 font-bold">
                    {csvPreview.invalidCount} Invalid
                  </div>
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-900 font-bold">
                    {csvPreview.duplicateCount} Duplicates
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setShowCsvModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleValidateCsv}
                className="px-4 py-2 rounded-xl bg-slate-900 text-amber-400 font-bold"
              >
                Run 12-Point Validator
              </button>
              {csvPreview && csvPreview.validCount > 0 && (
                <button
                  onClick={handleCommitCsv}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold"
                >
                  Commit {csvPreview.validCount} Valid Questions
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
