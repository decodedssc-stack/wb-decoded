'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Ticket,
  FileCheck,
  Award,
  BookOpen,
  Crown,
  Book,
  Clock,
  Bell,
  Bookmark,
  CheckCircle2,
  X,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentSideDrawer({ isOpen, onClose }: DrawerProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex animate-in fade-in select-none">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Body matching media_1787395673914.jpg */}
      <div className="relative w-full max-w-[320px] bg-white h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200 overflow-y-auto">
        
        <div className="space-y-0">
          
          {/* Top Profile Header with subtle blue/lavender gradient */}
          <div className="bg-gradient-to-b from-[#DBEAFE]/70 via-[#EFF6FF] to-white p-5 pt-8 space-y-4 border-b border-slate-100 relative">
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/80 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3.5">
              {/* Square avatar with pass tag */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-black text-white font-black text-2xl flex items-center justify-center shadow-md">
                  AI
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-md shadow-xs border border-slate-200">
                  <span className="text-[9px] font-black px-1 py-0.2 rounded bg-sky-500 text-white block">PASS</span>
                </div>
              </div>

              <div className="truncate">
                <h3 className="font-extrabold text-base text-slate-900 leading-tight truncate">
                  Amazing Info
                </h3>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  garai.bubai.38@gmail.com
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold mt-1">
                  <span>917098254259</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                </div>
                <Link href="/performance" onClick={onClose} className="text-xs text-[#2563EB] font-bold hover:underline block mt-1">
                  User Settings
                </Link>
              </div>
            </div>
          </div>

          {/* Drawer Menu Navigation */}
          <div className="p-3 space-y-1 text-sm font-semibold text-slate-700">
            
            {/* Home */}
            <Link
              href="/"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                pathname === '/' ? 'bg-[#F0F7FF] text-[#2563EB] font-bold' : 'hover:bg-slate-50 text-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </div>
            </Link>

            {/* Pass */}
            <Link
              href="/plans"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Ticket className="w-5 h-5 text-slate-600" />
                <span>Pass</span>
              </div>
              <span className="text-xs text-slate-500 font-bold">427 Days left</span>
            </Link>

            {/* Previous Year Papers */}
            <Link
              href="/pyq"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FileCheck className="w-5 h-5 text-slate-600" />
                <span>Previous Year Papers</span>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
                Active
              </span>
            </Link>

            {/* Test Series */}
            <Link
              href="/exams"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-slate-600" />
                <span>Test Series</span>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
                Active
              </span>
            </Link>

            {/* Attempted Tests */}
            <Link
              href="/attempted-mocks"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                pathname === '/attempted-mocks' ? 'bg-[#F0F7FF] text-[#2563EB] font-bold' : 'hover:bg-slate-50 text-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
                <span className="font-bold">Attempted Tests</span>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200">
                History
              </span>
            </Link>

            {/* Study Notes */}
            <Link
              href="/study-notes"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-slate-600" />
                <span>Study Notes</span>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200">
                Active
              </span>
            </Link>

            {/* Super Pass */}
            <Link
              href="/plans"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Crown className="w-5 h-5 text-amber-500" />
                <span>Super Pass</span>
              </div>
            </Link>

            {/* Books */}
            <Link
              href="/ncert"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl bg-orange-50/60 text-slate-900 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Book className="w-5 h-5 text-orange-600" />
                <span className="font-bold">NCERT Books (6–12)</span>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-orange-500 text-white shadow-xs">
                NEW
              </span>
            </Link>

            {/* Your Exams */}
            <Link
              href="/exams"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-slate-600" />
                <span>Your Exams</span>
              </div>
            </Link>

            {/* Notification */}
            <Link
              href="/daily-challenge"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-800 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-slate-600" />
                <span>Notification</span>
              </div>
            </Link>

            {/* Login / Switch Account */}
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl bg-blue-50 text-blue-900 hover:bg-blue-100 transition-colors font-bold"
            >
              <div className="flex items-center space-x-3">
                <span className="text-base">🔐</span>
                <span>Sign In / Switch Account</span>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </Link>

          </div>

        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-400 font-semibold text-center">
          WB Decoded v2.6 • West Bengal Examination Platform
        </div>

      </div>
    </div>
  );
}
