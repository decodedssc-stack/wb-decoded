'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Award, 
  Check,
  Zap,
  Target
} from 'lucide-react';

interface AuthOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: any) => void;
}

export default function AuthOnboardingModal({ isOpen, onClose, onSuccess }: AuthOnboardingModalProps) {
  const [step, setStep] = useState<'phone' | 'otp' | 'goals' | 'language' | 'complete'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['goal-wbpsc']);
  const [selectedLanguage, setSelectedLanguage] = useState<'bilingual' | 'bengali' | 'english'>('bilingual');
  const [loading, setLoading] = useState(false);

  const goalsList = [
    {
      id: 'goal-wbpsc',
      name: 'WBPSC Examinations',
      desc: 'WBCS (Exe), Food SI, Clerkship, Miscellaneous Services',
      icon: '🏛️',
      badge: 'Most Popular'
    },
    {
      id: 'goal-police',
      name: 'Police Recruitment',
      desc: 'WB Police SI, Constable, Kolkata Police SI & Sergeant',
      icon: '👮',
      badge: 'High Vacancy'
    },
    {
      id: 'goal-teaching',
      name: 'School Teaching (TET)',
      desc: 'West Bengal Primary TET, Upper Primary, WBSSC SLST',
      icon: '🎓',
      badge: 'Updated Pattern'
    },
    {
      id: 'goal-other-state',
      name: 'State Group C/D & Panchayat',
      desc: 'Panchayat Secretary, Nirman Sahayak, Municipal MSCWB',
      icon: '🏢',
      badge: 'State Govt'
    }
  ];

  useEffect(() => {
    // Check if user already completed onboarding
    const savedUser = localStorage.getItem('wb_decoded_user');
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        if (u.goals) setSelectedGoals(u.goals);
        if (u.language) setSelectedLanguage(u.language);
      } catch (e) {}
    }
  }, []);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleAutoFillDemoOtp = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('goals');
    }, 500);
  };

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      if (selectedGoals.length > 1) {
        setSelectedGoals(selectedGoals.filter(g => g !== goalId));
      }
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleSavePreferences = () => {
    setLoading(true);
    const userData = {
      id: 'usr-' + phone,
      phone: '+91 ' + phone,
      name: 'Aspirant ' + phone.slice(6),
      goals: selectedGoals,
      language: selectedLanguage,
      streak_days: 14,
      xp_points: 1420,
      pass_status: 'Pro Active',
      created_at: new Date().toISOString()
    };

    localStorage.setItem('wb_decoded_user', JSON.stringify(userData));
    localStorage.setItem('wb_decoded_pref_lang', selectedLanguage);

    setTimeout(() => {
      setLoading(false);
      setStep('complete');
      setTimeout(() => {
        if (onSuccess) onSuccess(userData);
        onClose();
      }, 1200);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header Bar with Step Progress */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#00A389] flex items-center justify-center text-white font-black text-sm">
              tb
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                {step === 'phone' && 'Login to WB Decoded'}
                {step === 'otp' && 'Verify Mobile OTP'}
                {step === 'goals' && 'Select Target Exams'}
                {step === 'language' && 'Language Preference'}
                {step === 'complete' && 'Welcome Aboard! 🎉'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {step === 'phone' && 'Access 900+ Full Mocks & All-Bengal Ranks'}
                {step === 'otp' && `OTP sent to +91 ${phone}`}
                {step === 'goals' && 'Personalize your mock feed'}
                {step === 'language' && 'Default test paper language'}
                {step === 'complete' && 'Your personalized feed is ready!'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6">
          
          {/* STEP 1: MOBILE NUMBER */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Enter Mobile Number</label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 focus-within:border-[#00A389] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00A389]/20 transition-all overflow-hidden">
                  <span className="px-3.5 py-3 text-xs font-black text-slate-600 border-r border-slate-200 bg-slate-100">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit number"
                    className="flex-1 px-3 py-3 text-sm font-semibold bg-transparent focus:outline-none text-slate-900"
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-slate-400">We will send an SMS with a 6-digit OTP.</p>
              </div>

              {/* Quick Demo Pre-fill */}
              <button
                type="button"
                onClick={() => setPhone('9876543210')}
                className="w-full py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-[#007A66] text-xs font-bold hover:bg-teal-100 transition-colors text-center"
              >
                ✨ Click to pre-fill Demo Number (9876543210)
              </button>

              <button
                type="submit"
                disabled={phone.length !== 10 || loading}
                className="w-full py-3 rounded-xl bg-[#00A389] hover:bg-[#007A66] disabled:opacity-50 text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Sending OTP...' : 'Get OTP &rarr;'}</span>
              </button>

              <div className="text-center pt-1">
                <span className="text-[10px] text-slate-400">
                  By continuing, you agree to WB Decoded&apos;s Terms &amp; Privacy Policy.
                </span>
              </div>
            </form>
          )}

          {/* STEP 2: ENTER OTP */}
          {step === 'otp' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Enter 6-Digit OTP</label>
                <div className="flex items-center justify-between gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-11 h-12 text-center text-lg font-black rounded-xl border border-slate-200 bg-slate-50 focus:border-[#00A389] focus:bg-white focus:ring-2 focus:ring-[#00A389]/20 focus:outline-none"
                    />
                  ))}
                </div>
              </div>

              {/* Auto-fill Helper */}
              <button
                type="button"
                onClick={handleAutoFillDemoOtp}
                className="w-full py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors text-center"
              >
                ⚡ Auto-Fill Demo OTP (123456)
              </button>

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={otp.some(d => !d) || loading}
                className="w-full py-3 rounded-xl bg-[#00A389] hover:bg-[#007A66] disabled:opacity-50 text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Verifying...' : 'Verify & Continue &rarr;'}</span>
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-slate-500 hover:text-slate-800 font-semibold"
                >
                  Change Number
                </button>
                <button
                  type="button"
                  className="text-[#00A389] font-bold hover:underline"
                >
                  Resend OTP in 25s
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: GOAL SELECTION */}
          {step === 'goals' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 font-medium">
                Choose one or more target examination domains to customize your test feed:
              </div>

              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {goalsList.map((g) => {
                  const isSelected = selectedGoals.includes(g.id);
                  return (
                    <div
                      key={g.id}
                      onClick={() => toggleGoal(g.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-[#00A389] bg-[#E6F7F4] shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{g.icon}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-extrabold text-xs text-slate-900">{g.name}</h4>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white border border-slate-200 text-slate-600">
                              {g.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{g.desc}</p>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                        isSelected ? 'bg-[#00A389] border-[#00A389] text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setStep('language')}
                className="w-full py-3 rounded-xl bg-[#00A389] hover:bg-[#007A66] text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Next: Language Preference &rarr;</span>
              </button>
            </div>
          )}

          {/* STEP 4: LANGUAGE PREFERENCE */}
          {step === 'language' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 font-medium">
                Select your default language for questions &amp; mock tests (you can still toggle in test):
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                <div
                  onClick={() => setSelectedLanguage('bilingual')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedLanguage === 'bilingual'
                      ? 'border-[#00A389] bg-[#E6F7F4]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌐</span>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">Bilingual (English + বাংলা)</h4>
                      <p className="text-[11px] text-slate-500">Recommended • Instant toggle inside any mock</p>
                    </div>
                  </div>
                  {selectedLanguage === 'bilingual' && <CheckCircle2 className="w-5 h-5 text-[#00A389]" />}
                </div>

                <div
                  onClick={() => setSelectedLanguage('bengali')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedLanguage === 'bengali'
                      ? 'border-[#00A389] bg-[#E6F7F4]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#2563EB] font-black text-sm flex items-center justify-center font-bengali">অ</span>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">বাংলা (Bengali Medium)</h4>
                      <p className="text-[11px] text-slate-500">All questions load in Bengali by default</p>
                    </div>
                  </div>
                  {selectedLanguage === 'bengali' && <CheckCircle2 className="w-5 h-5 text-[#00A389]" />}
                </div>

                <div
                  onClick={() => setSelectedLanguage('english')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedLanguage === 'english'
                      ? 'border-[#00A389] bg-[#E6F7F4]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🇬🇧</span>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">English Medium</h4>
                      <p className="text-[11px] text-slate-500">All questions load in English by default</p>
                    </div>
                  </div>
                  {selectedLanguage === 'english' && <CheckCircle2 className="w-5 h-5 text-[#00A389]" />}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSavePreferences}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#00A389] hover:bg-[#007A66] text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Saving Preferences...' : 'Complete Setup & Enter Dashboard 🎉'}</span>
              </button>
            </div>
          )}

          {/* STEP 5: SETUP COMPLETE */}
          {step === 'complete' && (
            <div className="py-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00A389] flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Setup Complete!</h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Your goals and language preferences have been customized. Enjoy 900+ Full Mocks and 1,200 Chapter Tests!
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
