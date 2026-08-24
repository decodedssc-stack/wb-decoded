'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import {
  Bot,
  Play,
  Pause,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';

export default function AdminAutomationCenterPage() {
  const [runs, setRuns] = useState<any[]>([]);
  const [runningJob, setRunningJob] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRuns = () => {
    fetch('/api/admin/automation/run')
      .then(res => res.json())
      .then(data => {
        if (data?.runs) setRuns(data.runs);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching runs:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRuns();
  }, []);

  const handleRunJob = async (jobType: string) => {
    setRunningJob(jobType);
    try {
      await fetch('/api/admin/automation/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_type: jobType })
      });
      fetchRuns();
      setRunningJob(null);
    } catch (e) {
      console.error('Failed to run job:', e);
      setRunningJob(null);
    }
  };

  const agents = [
    { id: 'pyq_discovery', name: 'PYQ DISCOVERY AGENT', status: 'Active', desc: 'Checks official sources for new past papers & answer keys', lastRun: '4 hours ago', success: '99.2%' },
    { id: 'verification', name: 'ANSWER & FACT VERIFIER', status: 'Active', desc: 'Validates factual claims against official govt gazette and syllabus', lastRun: '1 hour ago', success: '98.5%' },
    { id: 'deduplication', name: 'DUPLICATE VECTOR AGENT', status: 'Active', desc: 'Indexes questions against embedding & trigram similarity matrices', lastRun: '5 hours ago', success: '100%' },
    { id: 'current_affairs', name: 'CURRENT AFFAIRS ENGINE', status: 'Active', desc: 'Collects state & national events; auto-synthesizes daily MCQs', lastRun: '2 hours ago', success: '97.8%' },
    { id: 'exam_update_monitor', name: 'EXAM UPDATE MONITOR', status: 'Active', desc: 'Monitors WBPSC & Police board portals for notification changes', lastRun: '30 mins ago', success: '100%' },
    { id: 'daily_mock_generator', name: 'DAILY BOOSTER GENERATOR', status: 'Active', desc: 'Creates balanced 15-question daily challenge tests', lastRun: '6 hours ago', success: '100%' },
  ];

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-950 rounded-3xl p-6 sm:p-8 text-white border border-navy-800 shadow-xl">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              BACKGROUND MULTI-AGENT WORKERS
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Automation Operations Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Schedule, monitor, and manually trigger intelligent scraping, deduplication, and verification agents.
            </p>
          </div>
        </div>

        {/* SECTION 55: Automation Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => {
            const isRunning = runningJob === agent.id;

            return (
              <div key={agent.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {agent.status}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Success: {agent.success}</span>
                  </div>

                  <h3 className="font-extrabold text-sm text-navy-950">{agent.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{agent.desc}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400">Last: {agent.lastRun}</span>

                  <button
                    onClick={() => handleRunJob(agent.id)}
                    disabled={isRunning}
                    className="px-3.5 py-1.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-amber-400 font-bold text-xs shadow-xs transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isRunning ? 'Running...' : 'Run Now'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION 56: Automation Execution Logs */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="font-extrabold text-base text-navy-950">Granular Execution Logs</h3>
            <span className="text-xs text-slate-400">Idempotent Background Jobs</span>
          </div>

          <div className="space-y-3">
            {runs.map((run) => (
              <div key={run.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-navy-950">{run.job_name}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {run.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{run.started_at} • {run.duration_secs}s duration</span>
                </div>

                <p className="text-slate-600 leading-relaxed">{run.log_summary}</p>

                <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1 font-semibold">
                  <span>Found: <strong>{run.items_found}</strong></span>
                  <span>Processed: <strong>{run.items_processed}</strong></span>
                  <span>Failed: <strong>{run.items_failed}</strong></span>
                  <span className="text-amber-700">Review Queue: <strong>{run.items_requiring_review}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
