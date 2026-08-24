'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderTree,
  Sliders,
  Database,
  CheckCircle2,
  Copy,
  Wand2,
  Sparkles,
  Bot,
  Globe,
  AlertTriangle,
  BarChart3,
  History,
  Newspaper,
  BookOpen
} from 'lucide-react';

interface SidebarItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
  highlight?: boolean;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export default function AdminSidebar() {
  const pathname = usePathname();

  const sections: SidebarSection[] = [
    {
      title: 'Operations Overview',
      items: [
        { name: 'Ops Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Verification Queue', href: '/admin/verification', icon: CheckCircle2, badge: 'Needs Review', badgeColor: 'bg-amber-500/20 text-amber-300' },
        { name: 'Reported Questions', href: '/admin/reports', icon: AlertTriangle, badge: '1 Dispute', badgeColor: 'bg-red-500/20 text-red-300' },
      ]
    },
    {
      title: 'Exam & Question Architecture',
      items: [
        { name: 'Exam & Hierarchy', href: '/admin/exams', icon: FolderTree },
        { name: 'Pattern Builder', href: '/admin/patterns', icon: Sliders },
        { name: 'Question Bank', href: '/admin/questions', icon: Database },
        { name: 'Duplicate Center', href: '/admin/duplicates', icon: Copy },
      ]
    },
    {
      title: 'Mock Generation Engines',
      items: [
        { name: 'Master Mock Builder', href: '/admin/mock-generator', icon: Wand2, highlight: true },
        { name: 'Mock Library', href: '/admin/mocks', icon: BookOpen },
        { name: 'AI Question Lab', href: '/admin/ai-lab', icon: Sparkles },
        { name: 'Current Affairs Engine', href: '/admin/current-affairs', icon: Newspaper },
      ]
    },
    {
      title: 'Automation & Health',
      items: [
        { name: 'Automation Center', href: '/admin/automation', icon: Bot, badge: '6 Active', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
        { name: 'Source Registry & Feeds', href: '/admin/sources', icon: Globe },
        { name: 'Quality Analytics', href: '/admin/analytics', icon: BarChart3 },
        { name: 'System Audit Logs', href: '/admin/audit', icon: History },
      ]
    }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 border-r border-navy-800 bg-navy-950 text-slate-300 min-h-[calc(100vh-4rem)] p-4 select-none">
      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              {section.title}
            </div>

            {section.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-royal-600 text-white font-bold shadow-md shadow-royal-900/30'
                      : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                        item.badgeColor || 'bg-navy-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {item.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Admin Operations Status Badge */}
      <div className="mt-auto pt-6 border-t border-navy-900">
        <div className="px-3 py-2 rounded-xl bg-navy-900/90 border border-navy-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-white">System Engine Live</span>
              <span className="text-[10px] text-slate-400">SQLite DB Connected</span>
            </div>
          </div>
          <span className="text-[10px] text-amber-400 font-mono font-semibold">v2.4</span>
        </div>
      </div>
    </aside>
  );
}
