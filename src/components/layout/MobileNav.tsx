'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  FileText, 
  Layers, 
  Ticket, 
  Crown, 
  Newspaper,
  Sliders
} from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (pathname?.startsWith('/test/')) {
    // Hide mobile nav during active test taking
    return null;
  }

  const isHome = pathname === '/';
  const isTests = pathname?.startsWith('/exams') || pathname?.startsWith('/pyq') || pathname?.startsWith('/practice');
  const isSuper = pathname?.startsWith('/daily-challenge') || pathname?.startsWith('/doubts');
  const isPass = pathname === '/plans';
  const isSuperPass = pathname === '/plans?tier=super';
  const isNews = pathname?.startsWith('/magazine') || pathname?.startsWith('/admin/current-affairs');
  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-t border-slate-200 px-2 pt-2 shadow-2xl select-none"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 14px)' }}
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {!isAdmin ? (
          <>
            {/* 1. Home */}
            <Link
              href="/"
              className={`flex flex-col items-center py-1 px-2.5 text-[10px] font-bold transition-all relative ${
                isHome ? 'text-[#2563EB]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isHome && (
                <span className="w-5 h-1 bg-[#2563EB] rounded-full absolute -top-2"></span>
              )}
              <Home className={`w-5 h-5 mb-0.5 ${isHome ? 'text-[#2563EB]' : 'text-slate-400'}`} />
              <span>Home</span>
            </Link>

            {/* 2. Tests */}
            <Link
              href="/exams"
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold transition-all relative ${
                isTests ? 'text-[#2563EB]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isTests && (
                <span className="w-4 h-1 bg-[#2563EB] rounded-full absolute -top-1.5"></span>
              )}
              <FileText className={`w-5 h-5 mb-0.5 ${isTests ? 'text-[#2563EB]' : 'text-slate-400'}`} />
              <span>Tests</span>
            </Link>

            {/* 3. Super */}
            <Link
              href="/daily-challenge"
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold transition-all relative ${
                isSuper ? 'text-[#2563EB]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isSuper && (
                <span className="w-4 h-1 bg-[#2563EB] rounded-full absolute -top-1.5"></span>
              )}
              <Layers className={`w-5 h-5 mb-0.5 ${isSuper ? 'text-[#2563EB]' : 'text-slate-400'}`} />
              <span>Super</span>
            </Link>

            {/* 4. Pass */}
            <Link
              href="/plans"
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold transition-all relative ${
                isPass ? 'text-[#2563EB]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isPass && (
                <span className="w-4 h-1 bg-[#2563EB] rounded-full absolute -top-1.5"></span>
              )}
              <Ticket className={`w-5 h-5 mb-0.5 ${isPass ? 'text-[#2563EB]' : 'text-slate-400'}`} />
              <span>Pass</span>
            </Link>

            {/* 5. Super Pass */}
            <Link
              href="/plans"
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold transition-all relative ${
                isSuperPass ? 'text-[#2563EB]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isSuperPass && (
                <span className="w-4 h-1 bg-[#2563EB] rounded-full absolute -top-1.5"></span>
              )}
              <Crown className={`w-5 h-5 mb-0.5 ${isSuperPass ? 'text-[#2563EB]' : 'text-slate-400'}`} />
              <span>Super Pass</span>
            </Link>

            {/* 6. News */}
            <Link
              href="/magazine/february-2026"
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold transition-all relative ${
                isNews ? 'text-[#2563EB]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isNews && (
                <span className="w-4 h-1 bg-[#2563EB] rounded-full absolute -top-1.5"></span>
              )}
              <Newspaper className={`w-5 h-5 mb-0.5 ${isNews ? 'text-[#2563EB]' : 'text-slate-400'}`} />
              <span>News</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/admin"
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold transition-colors ${
                pathname === '/admin' ? 'text-[#2563EB]' : 'text-slate-500'
              }`}
            >
              <Sliders className="w-5 h-5 mb-0.5 text-slate-400" />
              <span>Admin Hub</span>
            </Link>
            <Link
              href="/"
              className="flex flex-col items-center py-1 px-2 text-[10px] font-bold text-slate-500"
            >
              <Home className="w-5 h-5 mb-0.5 text-slate-400" />
              <span>Student App</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
