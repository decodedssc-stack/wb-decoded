'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import {
  FolderTree,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Layers,
  Award,
  BookOpen,
  Sliders
} from 'lucide-react';

export default function AdminExamsManagerPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [hierarchy, setHierarchy] = useState<any>(null);
  const [showExamModal, setShowExamModal] = useState<boolean>(false);
  const [showNodeModal, setShowNodeModal] = useState<boolean>(false);
  const [nodeType, setNodeType] = useState<'subject' | 'chapter' | 'topic'>('subject');
  const [nodeName, setNodeName] = useState<string>('');
  const [nodeParentId, setNodeParentId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // New exam form state
  const [examForm, setExamForm] = useState({
    name: '',
    category_id: 'cat-wbpsc',
    authority: 'West Bengal Public Service Commission (WBPSC)',
    description: '',
    syllabus: '',
    official_website: 'https://psc.wb.gov.in',
    notification_url: 'https://psc.wb.gov.in/notices',
    color_theme: '#1E3A8A'
  });

  const fetchData = () => {
    Promise.all([
      fetch('/api/exams?scope=all').then(res => res.json()),
      fetch('/api/hierarchy').then(res => res.json())
    ]).then(([examData, hierData]) => {
      if (examData?.exams) setExams(examData.exams);
      if (examData?.categories) setCategories(examData.categories);
      if (hierData) setHierarchy(hierData);
      setLoading(false);
    }).catch(err => console.error('Error fetching exams manager data:', err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateExam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examForm)
      });
      setShowExamModal(false);
      fetchData();
    } catch (e) {
      console.error('Failed to create exam:', e);
    }
  };

  const handleCreateNode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/hierarchy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: nodeType,
          name: nodeName,
          parent_id: nodeParentId,
        })
      });
      setShowNodeModal(false);
      setNodeName('');
      fetchData();
    } catch (e) {
      console.error('Failed to create hierarchy node:', e);
    }
  };

  const subjects = hierarchy?.subjects || [];
  const chapters = hierarchy?.chapters || [];
  const topics = hierarchy?.topics || [];

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-950 rounded-3xl p-6 sm:p-8 text-white border border-navy-800 shadow-xl">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              DATABASE-DRIVEN HIERARCHY
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Exam &amp; Syllabus Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Configure exam categories, stages, papers, subjects, chapters, and topics. Never hardcoded into logic.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setNodeType('subject');
                setShowNodeModal(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-200 border border-navy-700 text-xs font-bold transition-colors"
            >
              + Add Hierarchy Node
            </button>

            <button
              onClick={() => setShowExamModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-extrabold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Exam</span>
            </button>
          </div>
        </div>

        {/* Exams List */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-base text-navy-950">Active Competitive Exams ({exams.length})</h3>
            <span className="text-xs text-slate-400">Full Relational Authority Matrix</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams.map((exam) => (
              <div key={exam.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-royal-700 uppercase">{exam.category_name}</span>
                    <h4 className="font-black text-navy-950 text-base">{exam.name}</h4>
                    <p className="text-xs font-medium text-slate-600">{exam.authority}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Active
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2">{exam.description}</p>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-200 text-slate-600">
                  <span>{exam.mocks_count || 0} Mocks • {exam.questions_count || 0} Questions</span>
                  <a
                    href={exam.official_website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-royal-700 hover:underline flex items-center gap-1 font-semibold"
                  >
                    Portal <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Syllabus Tree: Subjects -> Chapters -> Topics */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-base text-navy-950">Subject &amp; Chapter Hierarchy Tree</h3>
              <p className="text-xs text-slate-500">Subject &rarr; Chapter &rarr; Topic &rarr; Subtopic</p>
            </div>
          </div>

          <div className="space-y-4">
            {subjects.map((sub: any) => {
              const subChapters = chapters.filter((c: any) => c.subject_id === sub.id);

              return (
                <div key={sub.id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: sub.color || '#3B82F6' }}></span>
                      <h4 className="font-extrabold text-sm text-navy-950">{sub.name}</h4>
                      <span className="text-[11px] text-slate-400 font-mono">({sub.code})</span>
                    </div>

                    <span className="text-xs text-slate-500 font-semibold">
                      {sub.questions_count || 0} Questions Total
                    </span>
                  </div>

                  {/* Chapters */}
                  <div className="pl-4 space-y-2 border-l-2 border-slate-200 ml-1.5">
                    {subChapters.map((chap: any) => {
                      const chapTopics = topics.filter((t: any) => t.chapter_id === chap.id);

                      return (
                        <div key={chap.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-2">
                          <div className="flex justify-between items-center font-bold text-slate-800">
                            <span>📖 Chapter: {chap.name}</span>
                            <span className="text-[10px] text-slate-400">{chapTopics.length} Topics</span>
                          </div>

                          {/* Topics pills */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {chapTopics.map((top: any) => (
                              <span key={top.id} className="px-2.5 py-1 rounded-lg bg-royal-50 text-royal-800 border border-royal-100 text-[11px] font-semibold">
                                📌 {top.name} ({top.questions_count || 0})
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Modal: Create Exam */}
      {showExamModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-navy-950">Create New Competitive Exam</h3>
              <button onClick={() => setShowExamModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
            </div>

            <form onSubmit={handleCreateExam} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Exam Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WBPSC Miscellaneous Services Examination"
                  value={examForm.name}
                  onChange={(e) => setExamForm({ ...examForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={examForm.category_id}
                  onChange={(e) => setExamForm({ ...examForm, category_id: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Exam Authority *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. West Bengal Public Service Commission (WBPSC)"
                  value={examForm.authority}
                  onChange={(e) => setExamForm({ ...examForm, authority: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Recruitment for administrative and technical posts..."
                  value={examForm.description}
                  onChange={(e) => setExamForm({ ...examForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Official Website URL</label>
                <input
                  type="url"
                  placeholder="https://psc.wb.gov.in"
                  value={examForm.official_website}
                  onChange={(e) => setExamForm({ ...examForm, official_website: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowExamModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy-950 text-amber-400 font-extrabold"
                >
                  Save Exam Entity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Hierarchy Node */}
      {showNodeModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-navy-950">Add Syllabus Hierarchy Node</h3>
              <button onClick={() => setShowNodeModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
            </div>

            <form onSubmit={handleCreateNode} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Hierarchy Level</label>
                <select
                  value={nodeType}
                  onChange={(e) => setNodeType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="subject">Subject</option>
                  <option value="chapter">Chapter (under Subject)</option>
                  <option value="topic">Topic (under Chapter)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Indian History / Indus Valley..."
                  value={nodeName}
                  onChange={(e) => setNodeName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              {nodeType === 'chapter' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Parent Subject</label>
                  <select
                    value={nodeParentId}
                    onChange={(e) => setNodeParentId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="">Select Parent Subject</option>
                    {subjects.map((s: any) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {nodeType === 'topic' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Parent Chapter</label>
                  <select
                    value={nodeParentId}
                    onChange={(e) => setNodeParentId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="">Select Parent Chapter</option>
                    {chapters.map((c: any) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNodeModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy-950 text-amber-400 font-extrabold"
                >
                  Save Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
