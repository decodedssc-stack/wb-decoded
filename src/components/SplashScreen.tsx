'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only show splash screen once per browser session
    const hasSeenSplash = sessionStorage.getItem('wb_decoded_splash_shown');
    if (!hasSeenSplash) {
      setIsVisible(true);
      sessionStorage.setItem('wb_decoded_splash_shown', 'true');

      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 500); // 500ms fade transition
      }, 1800); // 1.8s duration

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-8 select-none transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top subtle badge */}
      <div className="pt-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[11px] font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
          <span>Govt Exam CBT Platform</span>
        </div>
      </div>

      {/* Center Branding & Logo */}
      <div className="flex flex-col items-center text-center space-y-4 my-auto animate-in zoom-in-95 duration-700">
        {/* Glowing Logo Icon */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-2xl shadow-blue-500/30 border border-blue-400/30">
            <span className="text-4xl font-black text-white font-bengali drop-shadow-md">
              অ
            </span>
          </div>
          {/* Animated pulse ring */}
          <div className="absolute -inset-2 rounded-3xl bg-blue-500/20 blur-lg animate-pulse -z-10"></div>
        </div>

        {/* Title & Slogan */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            WB <span className="text-blue-400">DECODED</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-300 max-w-xs font-bengali">
            পশ্চিমবঙ্গের শীর্ষস্থানীয় সরকারি চাকরি প্রস্তুতি মঞ্চ
          </p>
        </div>

        {/* Pulsing Loading Indicator */}
        <div className="pt-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-[11px] text-slate-400 font-semibold tracking-wide">
            Loading 4,574+ CBT Mock Tests &amp; PYQ Bank...
          </span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pb-4 text-center space-y-1 text-slate-500 text-[11px] font-semibold animate-in fade-in slide-in-from-bottom-2 duration-700">
        <div className="flex items-center justify-center gap-2 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Authentic Syllabus &amp; PYQ Standards</span>
        </div>
        <p>Version 2.4.0 • Made for West Bengal Aspirants</p>
      </div>
    </div>
  );
}
