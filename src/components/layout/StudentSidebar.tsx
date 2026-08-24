'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Award,
  BookOpen,
  FileCheck,
  Target,
  Zap,
  Crosshair,
  BookmarkCheck,
  BarChart3,
  Trophy,
  Crown,
  HelpCircle,
  Clock,
  FileText,
  RotateCcw,
  GraduationCap,
  Landmark
} from 'lucide-react';

export default function StudentSidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/', icon: LayoutDashboard },
    { name: 'Indian Polity Master Book', href: '/polity', icon: Landmark, badge: 'Full Book', highlight: true },
    { name: 'Test Series (Full Mocks)', href: '/exams', icon: Award, badge: '900 Tests' },
    { name: 'Attempted Mocks History', href: '/attempted-mocks', icon: FileCheck, badge: 'My Tests', highlight: true },
    { name: 'Chapter Tests Arena', href: '/practice', icon: BookOpen, badge: '3.6K Tests' },
    { name: 'Previous Year Papers', href: '/pyq', icon: FileText, badge: '10+ Yrs' },
    { name: 'Study Notes Master Library', href: '/study-notes', icon: BookOpen, badge: 'High Yield' },
    { name: 'NCERT Books (Class 6–12)', href: '/ncert', icon: GraduationCap, badge: 'All NCERT' },
    { name: 'Daily Live Quiz', href: '/daily-challenge', icon: Zap },
    { name: 'Jan 2026 CA Magazine', href: '/magazine/january-2026', icon: FileText, badge: 'Jan 2026' },
    { name: 'Feb 2026 CA Magazine', href: '/magazine/february-2026', icon: FileText, badge: 'Feb 2026' },
    { name: 'Saved Questions Vault', href: '/saved', icon: BookmarkCheck, badge: 'Bookmarks' },
    { name: 'Doubt & Math Solver', href: '/doubts', icon: HelpCircle, badge: 'AI Solve' },
    { name: 'Mistake Revision Vault', href: '/mistakes', icon: RotateCcw, badge: '2 Due' },
    { name: 'AI Weak Areas', href: '/weak-areas', icon: Crosshair },
    { name: 'Performance Analytics', href: '/performance', icon: BarChart3 },
    { name: 'State Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Pass Pro Plans', href: '/plans', icon: Crown, pro: true },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)] p-4 select-none">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
          WB Decoded WB Portal
        </div>

        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white' : item.highlight ? 'text-orange-500' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {item.pro && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-extrabold border border-amber-300">
                  PRO
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* WB Pass Pro Card in Sidebar Bottom */}
      <div className="mt-auto pt-4 border-t border-slate-100">
        <div className="rounded-2xl p-4 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black tracking-wider bg-black/20 px-2 py-0.5 rounded">
              PASS PRO
            </span>
            <Crown className="w-4 h-4 text-amber-200" />
          </div>
          <h4 className="font-extrabold text-sm leading-tight">
            Unlock 900+ Full Mocks &amp; 10+ Yrs PYQs
          </h4>
          <p className="text-[10px] text-amber-100 font-medium">
            Join 50,000+ Bengal aspirants cracking exams with WB Decoded style mocks.
          </p>
          <Link
            href="/plans"
            className="block text-center w-full py-2 rounded-xl bg-white text-slate-900 font-black text-xs shadow-xs hover:bg-slate-100 transition-colors"
          >
            Explore Pass Pro
          </Link>
        </div>
      </div>
    </aside>
  );
}
