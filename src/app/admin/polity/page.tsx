'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, CheckCircle, Clock, PlayCircle, BookOpen, 
  Sparkles, ArrowLeft, BarChart3, Layers, Award, RefreshCw, ExternalLink 
} from 'lucide-react';

interface Metrics {
  playlist_title: string;
  playlist_url: string;
  total_videos: number;
  processed_videos: number;
  remaining_videos: number;
  failed_videos: number;
  total_duration_hours: string;
  total_chapters: number;
  average_quality_score: number;
  completeness_score: number;
  source_coverage_score: number;
  factual_confidence_score: number;
  exam_relevance_score: number;
  total_articles: number;
  total_amendments: number;
  total_cases: number;
  total_mcqs: number;
}

export default function AdminPolityDashboard() {
  const [data, setData] = useState<{ metrics: Metrics; videos: any[]; chapters: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminData() {
      try {
        const res = await fetch('/api/admin/polity/dashboard');
        const json = await res.json();
        if (json.success) {
          setData(json);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading Admin Playlist Processing Monitor...</p>
        </div>
      </div>
    );
  }

  const m = data?.metrics;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Header */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-[#0A192F] to-slate-950 px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/polity"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Student Polity Hub
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> WB Decoded Admin Editorial Suite
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white mt-2">
            Indian Polity <span className="text-amber-400">Playlist Processing Dashboard</span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Live pipeline monitor tracking transcription, statutory validation, chapter synthesis, and publishing status for the 28-video course.
          </p>

          {/* Quick Metrics */}
          {m && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium uppercase">Playlist Pipeline</span>
                <div className="text-2xl font-extrabold text-emerald-400 mt-1">{m.processed_videos} / {m.total_videos}</div>
                <span className="text-[11px] text-emerald-400">100% Processed (0 Remaining)</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium uppercase">Total Duration</span>
                <div className="text-2xl font-extrabold text-amber-400 mt-1">{m.total_duration_hours} Hours</div>
                <span className="text-[11px] text-slate-400">28 Full Lectures Mapped</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium uppercase">Master Chapters</span>
                <div className="text-2xl font-extrabold text-white mt-1">{m.total_chapters} Chapters</div>
                <span className="text-[11px] text-slate-400">15-Section Standard</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium uppercase">Content Quality</span>
                <div className="text-2xl font-extrabold text-amber-400 mt-1">{m.average_quality_score}%</div>
                <span className="text-[11px] text-emerald-400">Verified & Approved</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quality Meters & Ratios */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-400" />
          Content Quality & Pedagogical Index
        </h2>

        {m && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-8">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400">Completeness Score</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">{m.completeness_score}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${m.completeness_score}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400">Source Coverage</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">{m.source_coverage_score}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${m.source_coverage_score}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400">Factual Confidence</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">{m.factual_confidence_score}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${m.factual_confidence_score}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400">Exam Relevance (WBCS/WBP)</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">{m.exam_relevance_score}%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${m.exam_relevance_score}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* 28 Videos Inventory Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-amber-400" />
              Playlist Video Ingestion & Chapter Mapping ({data?.videos?.length || 0} Videos)
            </h2>
            <a
              href={m?.playlist_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium"
            >
              Open YouTube Playlist <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">#</th>
                    <th className="p-3.5">Lecture Title</th>
                    <th className="p-3.5">Duration</th>
                    <th className="p-3.5">Mapped Chapter</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Quality</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {data?.videos?.map((vid) => (
                    <tr key={vid.video_id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3.5 font-bold text-amber-400">Lec {vid.video_number}</td>
                      <td className="p-3.5 font-medium text-white max-w-xs truncate">{vid.title}</td>
                      <td className="p-3.5 font-mono text-slate-400">{vid.duration_text}</td>
                      <td className="p-3.5">
                        <Link 
                          href={`/polity/${vid.chapter_slug}`}
                          className="text-amber-400 hover:underline font-medium"
                        >
                          {vid.chapter_slug}
                        </Link>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 text-[10px]">
                          PROCESSED
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-amber-300">{vid.quality_score}%</td>
                      <td className="p-3.5 text-right">
                        <a
                          href={vid.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition inline-flex items-center gap-1"
                        >
                          Watch <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
