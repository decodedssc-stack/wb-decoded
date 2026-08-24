'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/layout/AdminSidebar';
import {
  BookMarked,
  Plus,
  CheckCircle2,
  Play,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
  Edit3,
  Trash2,
  Upload,
  Sparkles,
  Layers,
  Clock,
  Award,
  AlertTriangle,
  X,
  Check,
  FileText,
  HelpCircle,
  Eye,
  Sliders,
  ChevronRight,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface MockTest {
  id: string;
  title: string;
  title_bn?: string;
  slug: string;
  exam_id: string;
  exam_name?: string;
  mock_type: string;
  duration_mins: number;
  total_marks: number;
  total_questions: number;
  marks_per_correct: number;
  negative_marking: number;
  pass_marks: number;
  difficulty: string;
  is_published: number;
  created_at: string;
}

export default function AdminMockLibraryPage() {
  const [mocks, setMocks] = useState<MockTest[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamFilter, setSelectedExamFilter] = useState('ALL');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('ALL');
  const [selectedDiffFilter, setSelectedDiffFilter] = useState('ALL');

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeMock, setActiveMock] = useState<MockTest | null>(null);

  // Create / Edit Form State
  const [formTitle, setFormTitle] = useState('');
  const [formTitleBn, setFormTitleBn] = useState('');
  const [formExamId, setFormExamId] = useState('exam-wbcs');
  const [formMockType, setFormMockType] = useState('Full Length');
  const [formDuration, setFormDuration] = useState(90);
  const [formTotalMarks, setFormTotalMarks] = useState(100);
  const [formMarksPerCorrect, setFormMarksPerCorrect] = useState(1.0);
  const [formNegativeMarking, setFormNegativeMarking] = useState(0.25);
  const [formPassMarks, setFormPassMarks] = useState(50);
  const [formDifficulty, setFormDifficulty] = useState('Moderate');
  const [formPublished, setFormPublished] = useState(true);

  // Question Selector in Modal
  const [availableQuestions, setAvailableQuestions] = useState<any[]>([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [qSubjectFilter, setQSubjectFilter] = useState('ALL');
  const [qSearch, setQSearch] = useState('');
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Custom Question inside Modal with AI Explanation
  const [showCustomQForm, setShowCustomQForm] = useState(false);
  const [customQText, setCustomQText] = useState('');
  const [customQTextBn, setCustomQTextBn] = useState('');
  const [customOptA, setCustomOptA] = useState('');
  const [customOptB, setCustomOptB] = useState('');
  const [customOptC, setCustomOptC] = useState('');
  const [customOptD, setCustomOptD] = useState('');
  const [customOptABn, setCustomOptABn] = useState('');
  const [customOptBBn, setCustomOptBBn] = useState('');
  const [customOptCBn, setCustomOptCBn] = useState('');
  const [customOptDBn, setCustomOptDBn] = useState('');
  const [customAns, setCustomAns] = useState('A');
  const [customSubject, setCustomSubject] = useState('sub-polity');
  const [customExplanation, setCustomExplanation] = useState('');
  const [customExplanationBn, setCustomExplanationBn] = useState('');
  const [generatingAiExp, setGeneratingAiExp] = useState(false);

  // File / Text Upload Modal State
  const [uploadText, setUploadText] = useState('');
  const [uploadExamId, setUploadExamId] = useState('exam-wbcs');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDuration, setUploadDuration] = useState(90);
  const [uploadTotalMarks, setUploadTotalMarks] = useState(100);
  const [uploadMarksPerCorrect, setUploadMarksPerCorrect] = useState(1.0);
  const [uploadNegativeMarking, setUploadNegativeMarking] = useState(0.25);
  const [uploadPassMarks, setUploadPassMarks] = useState(50);
  const [uploadDifficulty, setUploadDifficulty] = useState('Moderate');
  const [uploadIsPyq, setUploadIsPyq] = useState(false);
  const [uploadPyqYear, setUploadPyqYear] = useState('2024');
  const [uploadProcessing, setUploadProcessing] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');

  const fetchMocks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/mocks?limit=500');
      const data = await res.json();
      if (data?.mocks) setMocks(data.mocks);
    } catch (err) {
      console.error('Error fetching mocks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMocks();
    fetch('/api/exams').then(r => r.json()).then(d => d?.exams && setExams(d.exams));
    fetch('/api/hierarchy').then(r => r.json()).then(d => d?.subjects && setSubjects(d.subjects));
  }, []);

  // Fetch questions for question picker
  const loadQuestionsForPicker = async (examId: string, subId: string) => {
    setLoadingQuestions(true);
    try {
      let url = `/api/questions?limit=150`;
      if (examId && examId !== 'ALL') url += `&exam_id=${examId}`;
      if (subId && subId !== 'ALL') url += `&subject_id=${subId}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data?.questions) setAvailableQuestions(data.questions);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    if (isCreateModalOpen || isEditModalOpen) {
      loadQuestionsForPicker(formExamId, qSubjectFilter);
    }
  }, [isCreateModalOpen, isEditModalOpen, formExamId, qSubjectFilter]);

  // Open Create Modal
  const openCreateModal = () => {
    setFormTitle('');
    setFormTitleBn('');
    setFormExamId(exams[0]?.id || 'exam-wbcs');
    setFormMockType('Full Length');
    setFormDuration(90);
    setFormTotalMarks(100);
    setFormMarksPerCorrect(1.0);
    setFormNegativeMarking(0.25);
    setFormPassMarks(50);
    setFormDifficulty('Moderate');
    setFormPublished(true);
    setSelectedQuestionIds([]);
    setShowCustomQForm(false);
    setIsCreateModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = async (mock: MockTest) => {
    setActiveMock(mock);
    setFormTitle(mock.title);
    setFormTitleBn(mock.title_bn || '');
    setFormExamId(mock.exam_id);
    setFormMockType(mock.mock_type);
    setFormDuration(mock.duration_mins);
    setFormTotalMarks(mock.total_marks);
    setFormMarksPerCorrect(mock.marks_per_correct);
    setFormNegativeMarking(mock.negative_marking);
    setFormPassMarks(mock.pass_marks);
    setFormDifficulty(mock.difficulty);
    setFormPublished(mock.is_published === 1);

    // Fetch existing question IDs
    try {
      const res = await fetch(`/api/mocks/${mock.id}`);
      const data = await res.json();
      if (data?.mock?.questions) {
        setSelectedQuestionIds(data.mock.questions.map((q: any) => q.id));
      }
    } catch (e) {
      console.error(e);
    }

    setIsEditModalOpen(true);
  };

  // Handle Save (Create or Update)
  const handleSaveMock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please provide a mock test title.');
      return;
    }

    const payload = {
      title: formTitle,
      title_bn: formTitleBn,
      exam_id: formExamId,
      mock_type: formMockType,
      duration_mins: formDuration,
      total_marks: formTotalMarks,
      marks_per_correct: formMarksPerCorrect,
      negative_marking: formNegativeMarking,
      pass_marks: formPassMarks,
      difficulty: formDifficulty,
      is_published: formPublished ? 1 : 0,
      question_ids: selectedQuestionIds
    };

    try {
      if (activeMock && isEditModalOpen) {
        // Update
        const res = await fetch(`/api/mocks/${activeMock.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          alert('Mock test updated successfully!');
          setIsEditModalOpen(false);
          fetchMocks();
        } else {
          alert(data.error || 'Failed to update mock test.');
        }
      } else {
        // Create
        const res = await fetch('/api/mocks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          alert('Mock test created successfully!');
          setIsCreateModalOpen(false);
          fetchMocks();
        } else {
          alert(data.error || 'Failed to create mock test.');
        }
      }
    } catch (err: any) {
      alert(err.message || 'An error occurred while saving.');
    }
  };

  // Handle Delete
  const handleDeleteMock = async () => {
    if (!activeMock) return;
    try {
      const res = await fetch(`/api/mocks/${activeMock.id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        alert('Mock test deleted successfully!');
        setIsDeleteModalOpen(false);
        setActiveMock(null);
        fetchMocks();
      } else {
        alert(data.error || 'Failed to delete mock test.');
      }
    } catch (err: any) {
      alert(err.message || 'Error deleting mock.');
    }
  };

  // Generate AI Explanation for Custom Question
  const handleGenerateAiExplanation = async () => {
    if (!customQText.trim() || !customOptA.trim() || !customOptB.trim()) {
      alert('Please fill in the question statement and options first.');
      return;
    }
    setGeneratingAiExp(true);
    try {
      const res = await fetch('/api/admin/questions/ai-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_text: customQText,
          question_text_bn: customQTextBn,
          option_a: customOptA,
          option_b: customOptB,
          option_c: customOptC,
          option_d: customOptD,
          option_a_bn: customOptABn,
          option_b_bn: customOptBBn,
          option_c_bn: customOptCBn,
          option_d_bn: customOptDBn,
          correct_answer: customAns,
          subject_id: customSubject
        })
      });
      const data = await res.json();
      if (data.success) {
        setCustomExplanation(data.explanation);
        setCustomExplanationBn(data.explanation_bn);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to generate AI explanation.');
    } finally {
      setGeneratingAiExp(false);
    }
  };

  // Add Custom Question to Bank & Mock
  const handleAddCustomQuestion = async () => {
    if (!customQText.trim()) {
      alert('Please enter question text.');
      return;
    }
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_text: customQText,
          question_text_bn: customQTextBn,
          option_a: customOptA,
          option_b: customOptB,
          option_c: customOptC,
          option_d: customOptD,
          option_a_bn: customOptABn,
          option_b_bn: customOptBBn,
          option_c_bn: customOptCBn,
          option_d_bn: customOptDBn,
          correct_answer: customAns,
          explanation: customExplanation,
          explanation_bn: customExplanationBn,
          subject_id: customSubject,
          exam_id: formExamId,
          difficulty: formDifficulty,
          verification_status: 'Verified',
          lifecycle_status: 'Approved'
        })
      });
      const data = await res.json();
      if (data.success && data.question?.id) {
        setSelectedQuestionIds(prev => [data.question.id, ...prev]);
        setAvailableQuestions(prev => [data.question, ...prev]);
        // Reset custom q form
        setCustomQText('');
        setCustomQTextBn('');
        setCustomOptA('');
        setCustomOptB('');
        setCustomOptC('');
        setCustomOptD('');
        setCustomExplanation('');
        setCustomExplanationBn('');
        setShowCustomQForm(false);
        alert('Question added and selected for this mock test!');
      }
    } catch (e: any) {
      alert(e.message || 'Failed to save question.');
    }
  };

  // Handle File / Text Upload & Auto-Create
  const handleUploadAndCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadText.trim()) {
      alert('Please enter mock title and question text/file content.');
      return;
    }
    setUploadProcessing(true);
    setUploadSuccessMsg('');

    try {
      const res = await fetch('/api/admin/mocks/upload-parser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          raw_text: uploadText,
          exam_id: uploadExamId,
          mock_title: uploadTitle,
          duration_mins: uploadDuration,
          total_marks: uploadTotalMarks,
          marks_per_correct: uploadMarksPerCorrect,
          negative_marking: uploadNegativeMarking,
          pass_marks: uploadPassMarks,
          difficulty: uploadDifficulty,
          is_pyq: uploadIsPyq,
          pyq_year: uploadPyqYear,
          auto_publish: true
        })
      });
      const data = await res.json();
      if (data.success) {
        setUploadSuccessMsg(`🎉 ${data.message}`);
        fetchMocks();
        setTimeout(() => {
          setIsUploadModalOpen(false);
          setUploadText('');
          setUploadTitle('');
          setUploadSuccessMsg('');
        }, 2000);
      } else {
        alert(data.error || 'Failed to parse and create mock test.');
      }
    } catch (err: any) {
      alert(err.message || 'Error processing upload.');
    } finally {
      setUploadProcessing(false);
    }
  };

  // Filtered Mocks List
  const filteredMocks = useMemo(() => {
    return mocks.filter(m => {
      const matchesSearch = searchQuery === '' ||
        m.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.exam_name?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesExam = selectedExamFilter === 'ALL' || m.exam_id === selectedExamFilter;
      const matchesType = selectedTypeFilter === 'ALL' || m.mock_type === selectedTypeFilter;
      const matchesDiff = selectedDiffFilter === 'ALL' || m.difficulty === selectedDiffFilter;

      return matchesSearch && matchesExam && matchesType && matchesDiff;
    });
  }, [mocks, searchQuery, selectedExamFilter, selectedTypeFilter, selectedDiffFilter]);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-navy-950 rounded-3xl p-6 sm:p-8 text-white border border-navy-800 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                MASTER TEST MANAGEMENT STUDIO
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                Full Manual Access &amp; AI Explain Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Mock Tests Studio &amp; Archive ({mocks.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Create and manage any mock test manually, edit parameters, reorder questions, enrich answers with AI bilingual explanations, or upload PDFs/files to auto-create mocks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setUploadTitle('Official Uploaded Mock Test ' + new Date().getFullYear());
                setUploadExamId(exams[0]?.id || 'exam-wbcs');
                setIsUploadModalOpen(true);
              }}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-900/30 transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload PDF / File (Auto Mock)</span>
            </button>

            <button
              onClick={openCreateModal}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Mock Test (Manual)</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[300px]">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search mock title, exam name, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>

            <select
              value={selectedExamFilter}
              onChange={(e) => setSelectedExamFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
            >
              <option value="ALL">All Exams ({exams.length})</option>
              {exams.map(e => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>

            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
            >
              <option value="ALL">All Types</option>
              <option value="Full Length">Full Length</option>
              <option value="Previous-Year">Official PYQ Paper</option>
              <option value="Chapter-wise">Chapter-wise</option>
              <option value="Topic-wise">Topic-wise</option>
            </select>

            <select
              value={selectedDiffFilter}
              onChange={(e) => setSelectedDiffFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
            >
              <option value="ALL">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>

          <button
            onClick={fetchMocks}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Mocks Grid / Table */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <RefreshCw className="w-8 h-8 text-royal-600 animate-spin mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-600">Loading mock tests studio...</p>
            </div>
          ) : filteredMocks.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-extrabold text-navy-950 text-base">No mock tests found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No mock tests match your active filter criteria. Clear filters or create a new mock test above.
              </p>
            </div>
          ) : (
            filteredMocks.slice(0, 100).map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-royal-300 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                      m.mock_type === 'Previous-Year'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-royal-100 text-royal-900 border border-royal-200'
                    }`}>
                      {m.mock_type}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {m.exam_name || m.exam_id}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      • {m.difficulty}
                    </span>
                    {m.is_published === 1 ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        Published
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Draft
                      </span>
                    )}
                  </div>

                  <h4 className="font-black text-navy-950 text-base">{m.title}</h4>
                  {m.title_bn && <p className="text-xs font-semibold text-slate-500">{m.title_bn}</p>}

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 font-medium">
                    <span className="flex items-center gap-1 font-bold text-navy-900">
                      <HelpCircle className="w-3.5 h-3.5 text-royal-600" />
                      {m.total_questions} Questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {m.duration_mins} Mins
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-slate-400" />
                      {m.total_marks} Marks (+{m.marks_per_correct}, -{m.negative_marking})
                    </span>
                    <span>Pass: {m.pass_marks} Marks</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 self-end lg:self-center">
                  <a
                    href={`/test/${m.slug || m.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-navy-950 hover:bg-navy-900 text-amber-400 font-bold text-xs shadow-xs flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </a>

                  <button
                    onClick={() => openEditModal(m)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-royal-50 hover:text-royal-700 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveMock(m);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
                    title="Delete Mock Test"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ========================================================================= */}
        {/* MODAL 1: CREATE / EDIT MOCK TEST (MANUAL BUILDER)                         */}
        {/* ========================================================================= */}
        {(isCreateModalOpen || isEditModalOpen) && (
          <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col text-xs">
              
              {/* Modal Header */}
              <div className="sticky top-0 bg-navy-950 text-white p-6 rounded-t-3xl flex items-center justify-between border-b border-navy-800 z-10">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                    {isEditModalOpen ? 'EDIT MOCK TEST BLUEPRINT' : 'MANUAL MOCK TEST CREATOR'}
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {isEditModalOpen ? `Edit: ${formTitle}` : 'Create Custom Mock Test'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setIsEditModalOpen(false);
                  }}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSaveMock} className="p-6 space-y-6 flex-1">
                
                {/* 1. Basic Metadata */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-sm text-navy-950 pb-1 border-b border-slate-100 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-royal-600" />
                    1. Test Configuration &amp; Marking Rules
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Mock Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. WBCS Prelims High-Yield Full Mock #1"
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Mock Title (Bengali)</label>
                      <input
                        type="text"
                        value={formTitleBn}
                        onChange={(e) => setFormTitleBn(e.target.value)}
                        placeholder="e.g. ডাব্লুবিসিএস প্রিলিমস স্পেশাল মক টেস্ট"
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Target Examination</label>
                      <select
                        value={formExamId}
                        onChange={(e) => setFormExamId(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                      >
                        {exams.map(ex => (
                          <option key={ex.id} value={ex.id}>{ex.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Mock Type</label>
                      <select
                        value={formMockType}
                        onChange={(e) => setFormMockType(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                      >
                        <option value="Full Length">Full Length</option>
                        <option value="Previous-Year">Official PYQ Paper</option>
                        <option value="Chapter-wise">Chapter-wise Drill</option>
                        <option value="Topic-wise">Topic-wise Drill</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Difficulty</label>
                      <select
                        value={formDifficulty}
                        onChange={(e) => setFormDifficulty(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                      >
                        <option value="Moderate">Moderate (Standard)</option>
                        <option value="Easy">Easy (Foundation)</option>
                        <option value="Hard">Hard (Advanced)</option>
                        <option value="Mixed">Mixed (Exam Level)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Duration (Mins)</label>
                      <input
                        type="number"
                        value={formDuration}
                        onChange={(e) => setFormDuration(parseInt(e.target.value) || 60)}
                        className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Total Marks</label>
                      <input
                        type="number"
                        value={formTotalMarks}
                        onChange={(e) => setFormTotalMarks(parseFloat(e.target.value) || 100)}
                        className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Marks / Correct</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formMarksPerCorrect}
                        onChange={(e) => setFormMarksPerCorrect(parseFloat(e.target.value) || 1.0)}
                        className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Negative Mark</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formNegativeMarking}
                        onChange={(e) => setFormNegativeMarking(parseFloat(e.target.value) || 0.25)}
                        className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Pass Marks</label>
                      <input
                        type="number"
                        value={formPassMarks}
                        onChange={(e) => setFormPassMarks(parseFloat(e.target.value) || 50)}
                        className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="formPub"
                      checked={formPublished}
                      onChange={(e) => setFormPublished(e.target.checked)}
                      className="w-4 h-4 rounded text-royal-600"
                    />
                    <label htmlFor="formPub" className="font-bold text-slate-800 cursor-pointer">
                      Publish Mock Test immediately for students
                    </label>
                  </div>
                </div>

                {/* 2. Questions Picker & Custom Question Form */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-extrabold text-sm text-navy-950 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-royal-600" />
                        2. Question Selection ({selectedQuestionIds.length} Selected)
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Pick questions from the database or write new custom questions with AI explanation.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowCustomQForm(!showCustomQForm)}
                      className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs transition-colors flex items-center gap-1.5 self-start"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                      <span>{showCustomQForm ? 'Hide Question Form' : '+ Add Custom Question (AI Explain)'}</span>
                    </button>
                  </div>

                  {/* Inline Custom Question Form with AI Explanation */}
                  {showCustomQForm && (
                    <div className="p-4 rounded-2xl bg-purple-50/50 border-2 border-purple-200 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          Write Custom Question &amp; AI Detailed Explanation
                        </span>
                        <select
                          value={customSubject}
                          onChange={(e) => setCustomSubject(e.target.value)}
                          className="px-2.5 py-1 bg-white border border-purple-200 rounded-lg text-xs font-bold text-purple-950"
                        >
                          {subjects.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Question Statement (English) *</label>
                          <textarea
                            rows={2}
                            value={customQText}
                            onChange={(e) => setCustomQText(e.target.value)}
                            placeholder="Enter question statement in English..."
                            className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Question Statement (Bengali)</label>
                          <textarea
                            rows={2}
                            value={customQTextBn}
                            onChange={(e) => setCustomQTextBn(e.target.value)}
                            placeholder="বাংলায় প্রশ্নের বিবরণ লিখুন..."
                            className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium"
                          />
                        </div>
                      </div>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                          <span className="font-bold text-royal-700 block text-[11px]">Option A</span>
                          <input
                            type="text"
                            placeholder="Option A (English)"
                            value={customOptA}
                            onChange={(e) => setCustomOptA(e.target.value)}
                            className="w-full p-1.5 rounded border border-slate-200 text-xs"
                          />
                          <input
                            type="text"
                            placeholder="বিকল্প ক (বাংলা)"
                            value={customOptABn}
                            onChange={(e) => setCustomOptABn(e.target.value)}
                            className="w-full p-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>

                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                          <span className="font-bold text-royal-700 block text-[11px]">Option B</span>
                          <input
                            type="text"
                            placeholder="Option B (English)"
                            value={customOptB}
                            onChange={(e) => setCustomOptB(e.target.value)}
                            className="w-full p-1.5 rounded border border-slate-200 text-xs"
                          />
                          <input
                            type="text"
                            placeholder="বিকল্প খ (বাংলা)"
                            value={customOptBBn}
                            onChange={(e) => setCustomOptBBn(e.target.value)}
                            className="w-full p-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>

                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                          <span className="font-bold text-royal-700 block text-[11px]">Option C</span>
                          <input
                            type="text"
                            placeholder="Option C (English)"
                            value={customOptC}
                            onChange={(e) => setCustomOptC(e.target.value)}
                            className="w-full p-1.5 rounded border border-slate-200 text-xs"
                          />
                          <input
                            type="text"
                            placeholder="বিকল্প গ (বাংলা)"
                            value={customOptCBn}
                            onChange={(e) => setCustomOptCBn(e.target.value)}
                            className="w-full p-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>

                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                          <span className="font-bold text-royal-700 block text-[11px]">Option D</span>
                          <input
                            type="text"
                            placeholder="Option D (English)"
                            value={customOptD}
                            onChange={(e) => setCustomOptD(e.target.value)}
                            className="w-full p-1.5 rounded border border-slate-200 text-xs"
                          />
                          <input
                            type="text"
                            placeholder="বিকল্প ঘ (বাংলা)"
                            value={customOptDBn}
                            onChange={(e) => setCustomOptDBn(e.target.value)}
                            className="w-full p-1.5 rounded border border-slate-200 text-xs"
                          />
                        </div>
                      </div>

                      {/* Correct Option & AI Enrich Button */}
                      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-purple-200">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-700">Correct Answer:</span>
                          {['A', 'B', 'C', 'D'].map(key => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setCustomAns(key)}
                              className={`w-8 h-8 rounded-lg font-black text-xs transition-all ${
                                customAns === key
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {key}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={handleGenerateAiExplanation}
                          disabled={generatingAiExp}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5 hover:opacity-90 disabled:opacity-50"
                        >
                          <Sparkles className={`w-3.5 h-3.5 ${generatingAiExp ? 'animate-spin' : ''}`} />
                          <span>{generatingAiExp ? 'Enriching...' : '✨ AI Generate Detailed Explanation'}</span>
                        </button>
                      </div>

                      {/* Explanation Fields */}
                      {(customExplanation || customExplanationBn) && (
                        <div className="space-y-2 p-3 bg-white rounded-xl border border-purple-200">
                          <div>
                            <span className="font-bold text-purple-900 block mb-1">AI Enriched Explanation (English):</span>
                            <textarea
                              rows={3}
                              value={customExplanation}
                              onChange={(e) => setCustomExplanation(e.target.value)}
                              className="w-full p-2 rounded border border-slate-200 font-medium text-xs"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-purple-900 block mb-1">AI Enriched Explanation (Bengali):</span>
                            <textarea
                              rows={2}
                              value={customExplanationBn}
                              onChange={(e) => setCustomExplanationBn(e.target.value)}
                              className="w-full p-2 rounded border border-slate-200 font-medium text-xs"
                            />
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleAddCustomQuestion}
                        className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs shadow-xs"
                      >
                        ✓ Save &amp; Select Question for this Mock Test
                      </button>
                    </div>
                  )}

                  {/* Question Picker Filters */}
                  <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search question bank..."
                        value={qSearch}
                        onChange={(e) => setQSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                      />
                    </div>

                    <select
                      value={qSubjectFilter}
                      onChange={(e) => setQSubjectFilter(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700"
                    >
                      <option value="ALL">All Subjects</option>
                      {subjects.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => {
                        const allIds = availableQuestions.map(q => q.id);
                        setSelectedQuestionIds(prev => Array.from(new Set([...prev, ...allIds])));
                      }}
                      className="px-3 py-1.5 rounded-lg bg-royal-50 text-royal-700 font-bold text-xs hover:bg-royal-100"
                    >
                      Select All Displayed
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedQuestionIds([])}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300"
                    >
                      Deselect All
                    </button>
                  </div>

                  {/* Questions List Picker */}
                  <div className="max-h-60 overflow-y-auto space-y-2 border border-slate-200 rounded-2xl p-3 bg-white">
                    {loadingQuestions ? (
                      <p className="text-center py-6 text-slate-400 font-medium">Loading questions pool...</p>
                    ) : availableQuestions.length === 0 ? (
                      <p className="text-center py-6 text-slate-400 font-medium">No questions found in this category.</p>
                    ) : (
                      availableQuestions
                        .filter(q => qSearch === '' || q.question_text?.toLowerCase().includes(qSearch.toLowerCase()))
                        .map(q => {
                          const isSelected = selectedQuestionIds.includes(q.id);
                          return (
                            <div
                              key={q.id}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedQuestionIds(prev => prev.filter(id => id !== q.id));
                                } else {
                                  setSelectedQuestionIds(prev => [...prev, q.id]);
                                }
                              }}
                              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                                isSelected
                                  ? 'bg-royal-50/70 border-royal-400 shadow-xs'
                                  : 'bg-white border-slate-100 hover:border-slate-300'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}}
                                className="w-4 h-4 rounded text-royal-600 mt-0.5"
                              />
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                    {q.subject_id}
                                  </span>
                                  <span className="text-[9px] font-bold text-emerald-700">
                                    Ans: ({q.correct_answer})
                                  </span>
                                  {q.is_pyq === 1 && (
                                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 rounded">
                                      PYQ
                                    </span>
                                  )}
                                </div>
                                <p className="font-bold text-navy-950">{q.question_text}</p>
                              </div>
                            </div>
                          );
                        })
                    )}
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setIsEditModalOpen(false);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-600/20"
                  >
                    {isEditModalOpen ? '✓ Save Changes' : '✓ Create Mock Test'}
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 2: UPLOAD FILE / PDF / IMAGE & AUTO CREATE WITH AI EXPLANATION       */}
        {/* ========================================================================= */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 flex flex-col text-xs">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 rounded-t-3xl flex items-center justify-between border-b border-purple-800">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI-POWERED QUESTION EXTRACTOR &amp; AUTO MOCK GENERATOR
                  </span>
                  <h3 className="text-xl font-black text-white">
                    Upload PDF / Image / Text Question Paper
                  </h3>
                  <p className="text-xs text-purple-200">
                    Paste raw text or upload exam question papers. The engine extracts questions, options, detects answers, and enriches every question with detailed bilingual step-by-step explanations automatically.
                  </p>
                </div>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleUploadAndCreate} className="p-6 space-y-4 flex-1">
                
                {uploadSuccessMsg && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{uploadSuccessMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Target Examination *</label>
                    <select
                      value={uploadExamId}
                      onChange={(e) => setUploadExamId(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                    >
                      {exams.map(ex => (
                        <option key={ex.id} value={ex.id}>{ex.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Mock Test Title *</label>
                    <input
                      type="text"
                      required
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="e.g. WBCS Official Exam Shift 1"
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Duration (Mins)</label>
                    <input
                      type="number"
                      value={uploadDuration}
                      onChange={(e) => setUploadDuration(parseInt(e.target.value) || 90)}
                      className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Total Marks</label>
                    <input
                      type="number"
                      value={uploadTotalMarks}
                      onChange={(e) => setUploadTotalMarks(parseFloat(e.target.value) || 100)}
                      className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Mark / Correct</label>
                    <input
                      type="number"
                      step="0.1"
                      value={uploadMarksPerCorrect}
                      onChange={(e) => setUploadMarksPerCorrect(parseFloat(e.target.value) || 1.0)}
                      className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Negative Mark</label>
                    <input
                      type="number"
                      step="0.01"
                      value={uploadNegativeMarking}
                      onChange={(e) => setUploadNegativeMarking(parseFloat(e.target.value) || 0.25)}
                      className="w-full p-2 rounded-lg border border-slate-200 font-bold bg-white"
                    />
                  </div>
                </div>

                {/* Paste / Upload Box */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold text-slate-800 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-purple-600" />
                      Paste Question Text or Extracted Document Content *
                    </label>
                    <span className="text-[10px] text-slate-400">Format: 1. Question... (A)... (B)... Ans: C</span>
                  </div>
                  <textarea
                    rows={8}
                    required
                    value={uploadText}
                    onChange={(e) => setUploadText(e.target.value)}
                    placeholder={`1. In which year was the Indian Constitution adopted?\n(A) 1947\n(B) 1949\n(C) 1950\n(D) 1952\nAns: B\n\n2. Which river is known as the "Sorrow of Bengal"?\n(A) Hooghly\n(B) Damodar\n(C) Teesta\n(D) Rupnarayan\nAns: B`}
                    className="w-full p-3 rounded-2xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-purple-500 bg-slate-50/50"
                  />
                </div>

                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="font-semibold text-purple-900 text-[11px]">
                    Automatic AI Explanation: Every parsed question will receive a structured bilingual explanation (Concept + Facts + Trap Notes) generated in real-time.
                  </span>
                </div>

                {/* Submit */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={uploadProcessing}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-md shadow-purple-900/30 flex items-center gap-2 disabled:opacity-50"
                  >
                    <Sparkles className={`w-4 h-4 ${uploadProcessing ? 'animate-spin' : ''}`} />
                    <span>{uploadProcessing ? 'Extracting & Enriching...' : '🚀 Auto-Create Mock Test'}</span>
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 3: DELETE CONFIRMATION                                              */}
        {/* ========================================================================= */}
        {isDeleteModalOpen && activeMock && (
          <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-base font-black text-navy-950">Delete Mock Test?</h3>
                <p className="text-slate-500 text-xs">
                  Are you sure you want to delete <span className="font-bold text-navy-900">"{activeMock.title}"</span>? All student attempts and question mappings for this mock test will be removed. Questions in the bank will be preserved.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteMock}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black shadow-md shadow-red-600/20"
                >
                  Yes, Delete Mock
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
