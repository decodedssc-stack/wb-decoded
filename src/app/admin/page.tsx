'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/layout/AdminSidebar';
import {
  AlertTriangle,
  CheckCircle,
  Database,
  Sliders,
  Users,
  Award,
  Flame,
  Wand2,
  Bot,
  Globe2,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Sparkles,
  Play
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDashboard = () => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(data => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch(err => console.error('Error fetching admin dashboard:', err));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const kpis = dashboardData?.kpis || {};
  const attentionItems = dashboardData?.attentionItems || [];
  const pipelineStages = dashboardData?.pipelineStages || [];
  const recentAutomations = dashboardData?.recentAutomations || [];
  const recentAudits = dashboardData?.recentAudits || [];

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-950 rounded-3xl p-6 sm:p-8 text-white border border-navy-800 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
                ADMIN OPERATIONS CONTROL CENTER
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Executive Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Manage question processing pipelines, exam patterns, AI verification queues, and automated scrapers.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchDashboard}
              className="p-2.5 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-300 hover:text-white border border-navy-700 transition-colors"
              title="Refresh Metrics"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <Link
              href="/admin/mock-generator"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-extrabold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <Wand2 className="w-4 h-4" />
              <span>Generate Mocks</span>
            </Link>
          </div>
        </div>

        {/* SECTION 58: "NEEDS YOUR ATTENTION" Alert Matrix */}
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-extrabold text-base text-navy-950">NEEDS YOUR ATTENTION</h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">Daily Operations Workspace</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {attentionItems.map((item: any) => (
              <Link
                key={item.id}
                href={item.href}
                className={`p-4 rounded-2xl border transition-all hover:shadow-md flex items-start justify-between group ${
                  item.type === 'critical' ? 'bg-red-50/70 border-red-200' :
                  item.type === 'warning' ? 'bg-amber-50/70 border-amber-200' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider">{item.badge}</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-navy-950 group-hover:text-royal-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600">{item.description}</p>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-navy-950 group-hover:translate-x-1 transition-all mt-1" />
              </Link>
            ))}
          </div>
        </div>

        {/* 4 Core KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Question Bank</span>
            <div className="text-2xl font-black text-navy-950">{kpis.questions?.total || 20} Qs</div>
            <span className="text-[11px] text-emerald-600 font-bold block">{kpis.questions?.verified || 20} Verified (100%)</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PYQ Archive</span>
            <div className="text-2xl font-black text-amber-600">{kpis.questions?.pyqs || 18} PYQs</div>
            <span className="text-[11px] text-slate-500 font-semibold block">Official 2016–2024</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Mocks</span>
            <div className="text-2xl font-black text-royal-700">{kpis.mocks?.published || 4} Tests</div>
            <span className="text-[11px] text-slate-500 font-semibold block">{kpis.attempts?.total?.count || 12} Total Submissions</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Students</span>
            <div className="text-2xl font-black text-purple-700">{kpis.users?.total || 5} Aspirants</div>
            <span className="text-[11px] text-slate-500 font-semibold block">{kpis.users?.activeToday || 2} Active Today</span>
          </div>
        </div>

        {/* SECTION 59: Content Question Lifecycle Pipeline */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-base text-navy-950">Content Processing Pipeline Status</h3>
              <p className="text-xs text-slate-500">Multi-agent intake: Raw &rarr; Extracted &rarr; Classified &rarr; Verified &rarr; Published</p>
            </div>
            <Link href="/admin/questions" className="text-xs font-bold text-royal-700 hover:underline">
              Manage Bank &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            {pipelineStages.map((stage: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  {stage.stage}
                </span>
                <div className="text-xl font-black text-navy-950">{stage.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column: Automation Runner & Audit Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Active Automations Center */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-navy-950">Agent Automations</h3>
                <span className="text-xs text-slate-500">Background workers status</span>
              </div>
              <Link href="/admin/automation" className="text-xs font-bold text-royal-700 hover:underline">
                Automation Center &rarr;
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentAutomations.map((run: any) => (
                <div key={run.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="font-bold text-slate-900">{run.job_name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate max-w-xs">{run.log_summary}</p>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 font-semibold">{run.duration_secs}s</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Audit Logs */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-navy-950">System Audit Trail</h3>
                <span className="text-xs text-slate-500">Immutable admin activity logs</span>
              </div>
              <Link href="/admin/audit" className="text-xs font-bold text-royal-700 hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentAudits.map((log: any) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-navy-950">{log.admin_name}</span>
                    <span className="font-mono text-slate-400">{log.action}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 truncate">{log.details}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
