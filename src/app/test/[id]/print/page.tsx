'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Printer, ArrowLeft, Download, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function PrintableMockPaperPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.id as string;

  const [mock, setMock] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSolutions, setShowSolutions] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/mocks/${testId}`)
      .then(res => res.json())
      .then(data => {
        if (data?.mock) setMock(data.mock);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load mock for printing:', err);
        setLoading(false);
      });
  }, [testId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-bold text-sm">Compiling Official A4 Printable Question Booklet...</p>
        </div>
      </div>
    );
  }

  if (!mock) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <p className="font-bold text-navy-950">Mock Test Not Found</p>
          <button onClick={() => router.back()} className="mt-4 px-4 py-2 bg-navy-950 text-white rounded-xl text-xs font-bold">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const questions = mock.questions || [];

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white text-slate-900 font-sans">
      
      {/* Floating Action Controls (Hidden on Print) */}
      <div className="sticky top-0 z-50 bg-navy-950 text-white px-4 sm:px-8 py-3 shadow-lg flex items-center justify-between print:hidden">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-bold text-sm text-white truncate max-w-sm sm:max-w-md">
              {mock.title}
            </h2>
            <span className="text-[10px] text-amber-400 font-semibold">
              Official A4 Printable Question Paper &amp; Solution Booklet
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <label className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showSolutions}
              onChange={(e) => setShowSolutions(e.target.checked)}
              className="rounded text-amber-500 focus:ring-amber-400"
            />
            <span>Include Solutions Appendix</span>
          </label>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-black text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / SAVE AS PDF (A4)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* A4 PRINT CANVAS                                                           */}
      {/* ========================================================================= */}
      <div className="max-w-[210mm] mx-auto bg-white p-6 sm:p-12 my-6 sm:my-8 shadow-xl print:shadow-none print:my-0 print:p-8 rounded-2xl print:rounded-none border border-slate-200 print:border-none">
        
        {/* Examination Seal & Header */}
        <div className="border-b-2 border-navy-950 pb-4 mb-6 text-center space-y-1">
          <div className="inline-block px-3 py-0.5 rounded bg-slate-900 text-amber-400 text-[10px] font-black uppercase tracking-widest mb-1">
            WB DECODED • OFFICIAL MOCK SERIES
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-navy-950 uppercase tracking-tight">
            {mock.title}
          </h1>
          <p className="text-xs text-slate-600 font-semibold">
            WEST BENGAL COMPETITIVE EXAMINATIONS TEST SYSTEM
          </p>

          {/* Blueprint Specs Box */}
          <div className="grid grid-cols-4 gap-2 pt-3 mt-3 border-t border-slate-200 text-xs font-bold">
            <div className="p-2 bg-slate-50 border border-slate-200 rounded">
              <span className="text-[10px] text-slate-500 block uppercase">Time Allowed</span>
              <span className="text-navy-950 font-black">{mock.duration_mins} Minutes</span>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded">
              <span className="text-[10px] text-slate-500 block uppercase">Total Questions</span>
              <span className="text-navy-950 font-black">{mock.total_questions} MCQs</span>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded">
              <span className="text-[10px] text-slate-500 block uppercase">Maximum Marks</span>
              <span className="text-navy-950 font-black">{mock.total_marks} Marks</span>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded">
              <span className="text-[10px] text-slate-500 block uppercase">Negative Marking</span>
              <span className="text-rose-600 font-black">-{mock.negative_marking || 0.5} Mark</span>
            </div>
          </div>

          {/* Candidate Signature Grid */}
          <div className="grid grid-cols-2 gap-4 pt-3 text-left text-[11px] text-slate-700">
            <div className="border-b border-dotted border-slate-400 pb-1">
              <strong>Candidate Name:</strong> ___________________________
            </div>
            <div className="border-b border-dotted border-slate-400 pb-1">
              <strong>Roll Number:</strong> ___________________________
            </div>
          </div>
        </div>

        {/* Section 1: Question Paper Body */}
        <div className="space-y-6">
          <div className="bg-slate-100 p-2 text-center text-xs font-black text-slate-800 uppercase tracking-wider rounded">
            Part A: Multiple Choice Questions (Answer All Questions)
          </div>

          <div className="space-y-6">
            {questions.map((q: any, idx: number) => {
              const isEng = q.subject_name?.toLowerCase().includes('english') || q.subject_id === 'sub-eng' || q.chapter_id?.startsWith('chap-eng');

              return (
                <div key={q.id || idx} className="space-y-2 border-b border-slate-100 pb-4 break-inside-avoid">
                  <div className="flex items-start gap-2">
                    <span className="font-black text-xs text-navy-950 shrink-0">
                      Q.{idx + 1}
                    </span>
                    <div className="space-y-0.5 flex-1">
                      <p className="text-xs sm:text-[13px] font-bold text-navy-950 leading-snug">
                        {q.question_text}
                      </p>
                      {!isEng && q.question_text_bn && q.question_text_bn !== q.question_text && (
                        <p className="text-xs text-slate-600 font-bengali leading-snug">
                          {q.question_text_bn}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 pl-6">
                    {(['A', 'B', 'C', 'D'] as const).map((key) => {
                      const optEn = q[`option_${key.toLowerCase()}`];
                      const optBn = q[`option_${key.toLowerCase()}_bn`];

                      return (
                        <div key={key} className="flex items-start gap-1.5 leading-snug">
                          <span className="font-bold text-navy-950">({key})</span>
                          <div>
                            <span className="text-slate-800 font-medium">{optEn}</span>
                            {!isEng && optBn && optBn !== optEn && (
                              <span className="block text-[11px] text-slate-500 font-bengali">{optBn}</span>
                            )}
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

        {/* Section 2: Solutions Appendix (Optional on Print) */}
        {showSolutions && (
          <div className="mt-12 pt-8 border-t-2 border-navy-950 break-before-page space-y-6">
            <div className="bg-navy-950 text-white p-3 text-center text-xs font-black uppercase tracking-wider rounded">
              Part B: Official Answer Key &amp; Comprehensive Step-by-Step Solutions
            </div>

            {/* Answer Key Grid */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h4 className="font-black text-xs uppercase text-slate-700 tracking-wider">
                Official Answer Key
              </h4>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 text-xs font-bold text-center">
                {questions.map((q: any, idx: number) => (
                  <div key={q.id || idx} className="p-1.5 bg-white border border-slate-200 rounded">
                    <span className="text-[10px] text-slate-400 block">{idx + 1}</span>
                    <span className="text-navy-950 font-black">{q.correct_answer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Explanations Stream */}
            <div className="space-y-4 pt-2">
              {questions.map((q: any, idx: number) => (
                <div key={q.id || idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5 break-inside-avoid">
                  <div className="flex items-center justify-between font-extrabold text-navy-950">
                    <span>Q.{idx + 1} Solution — Correct Key: Option ({q.correct_answer})</span>
                    <span className="text-[10px] text-slate-500">{q.subject_name || 'General'}</span>
                  </div>

                  <p className="text-slate-700 leading-relaxed font-medium">
                    {q.explanation}
                  </p>

                  {q.important_fact && (
                    <p className="text-[11px] text-amber-900 font-semibold pt-1 border-t border-slate-200">
                      💡 <strong>Key Fact:</strong> {q.important_fact}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
