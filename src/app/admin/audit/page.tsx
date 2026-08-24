'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { History, ShieldCheck, Search, Filter } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/admin/audit-logs')
      .then(res => res.json())
      .then(data => {
        if (data?.logs) setLogs(data?.logs);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching audit logs:', err);
        setLoading(false);
      });
  }, []);

  const filteredLogs = logs.filter(log => {
    return log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
           log.admin_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           (log.details && log.details.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy-950 rounded-3xl p-6 sm:p-8 text-white border border-navy-800 shadow-xl">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              IMMUTABLE ACTIVITY AUDIT TRAIL
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              System Audit Logs
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Complete chronological ledger of administrative interventions, answer key changes, and pattern modifications.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <input
            type="text"
            placeholder="Filter audit entries by admin name, action (e.g. APPROVE_QUESTION, CREATE_MOCK), or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-royal-500/20"
          />
        </div>

        {/* Audit Log Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 grid grid-cols-12 gap-2">
            <span className="col-span-2">Timestamp</span>
            <span className="col-span-2">Operator</span>
            <span className="col-span-3">Action Code</span>
            <span className="col-span-5">Details &amp; Diff</span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 grid grid-cols-12 gap-2 items-center text-xs hover:bg-slate-50/60 transition-colors">
                <span className="col-span-2 text-[11px] text-slate-400 font-mono">
                  {log.created_at}
                </span>

                <div className="col-span-2 space-y-0.5">
                  <span className="font-extrabold text-navy-950 block">{log.admin_name}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">{log.admin_role}</span>
                </div>

                <div className="col-span-3">
                  <span className="px-2 py-0.5 rounded-md bg-royal-100 text-royal-800 font-mono text-[10px] font-bold">
                    {log.action}
                  </span>
                </div>

                <div className="col-span-5 text-slate-700 leading-snug">
                  <p>{log.details}</p>
                  {(log.old_value || log.new_value) && (
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                      Diff: &quot;{log.old_value}&quot; &rarr; &quot;{log.new_value}&quot;
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
