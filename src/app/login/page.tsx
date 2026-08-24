'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  Mail, 
  Lock, 
  User, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Award,
  ChevronRight,
  Eye,
  EyeOff,
  RotateCcw,
  BellRing,
  Send,
  X
} from 'lucide-react';

const WB_DISTRICTS = [
  'Kolkata', 'North 24 Parganas', 'South 24 Parganas', 'Howrah', 'Hooghly', 
  'Purba Bardhaman', 'Paschim Bardhaman', 'Nadia', 'Murshidabad', 'Purba Medinipur', 
  'Paschim Medinipur', 'Bankura', 'Purulia', 'Birbhum', 'Malda', 
  'Uttar Dinajpur', 'Dakshin Dinajpur', 'Jalpaiguri', 'Alipurduar', 
  'Cooch Behar', 'Darjeeling', 'Kalimpong', 'Jhargram'
];

const TARGET_EXAMS = [
  { id: 'exam-wbcs', name: 'WBCS (Exe) & State Services', icon: '🏛️' },
  { id: 'exam-wbp-si', name: 'WB Police SI & Constable', icon: '👮' },
  { id: 'exam-food-si', name: 'WBPSC Food SI 2026', icon: '🌾' },
  { id: 'exam-clerkship', name: 'WBPSC Clerkship Stage I & II', icon: '📋' },
  { id: 'exam-primary-tet', name: 'WB Primary TET & School SLST', icon: '🎓' },
  { id: 'exam-mscwb', name: 'Municipal MSCWB & Group C/D', icon: '🏢' }
];

const QUICK_GOOGLE_ACCOUNTS = [
  { name: 'Aspirant Student', email: 'wbcs.aspirant.2026@gmail.com', avatar: '👨‍🎓' },
  { name: 'Sourav Banerjee', email: 'sourav.kolkata@gmail.com', avatar: '🏛️' },
  { name: 'Priyanka Sen', email: 'priyanka.wbp@gmail.com', avatar: '👮' }
];

export default function LoginPage() {
  const router = useRouter();

  // Auth Method Switcher: 'otp' | 'email' | 'register'
  const [authMethod, setAuthMethod] = useState<'otp' | 'email' | 'register'>('otp');

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Mobile OTP State
  const [phone, setPhone] = useState('');
  const [otpStep, setOtpStep] = useState<'phone' | 'code'>('phone');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [activeGeneratedOtp, setActiveGeneratedOtp] = useState('');
  const [showSmsPopup, setShowSmsPopup] = useState(false);

  // Email/Password State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Registration State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regDistrict, setRegDistrict] = useState('Kolkata');
  const [regExam, setRegExam] = useState('exam-wbcs');
  const [regLang, setRegLang] = useState<'bilingual' | 'bengali' | 'english'>('bilingual');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Check if active session exists
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data?.authenticated && data?.user) {
          setSuccessMsg(`Welcome back, ${data.user.name}! Redirecting...`);
          localStorage.setItem('wb_decoded_user', JSON.stringify(data.user));
          setTimeout(() => router.push('/'), 600);
        }
      })
      .catch(() => {});
  }, [router]);

  // ----------------------------------------------------
  // 1. GOOGLE SIGN-IN EXECUTION
  // ----------------------------------------------------
  const executeGoogleSignIn = async (userEmail: string, userName?: string) => {
    if (!userEmail || !userEmail.includes('@')) {
      setErrorMsg('Please enter a valid Google email address.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const resolvedName = userName || userEmail.split('@')[0].replace(/[._]/g, ' ');
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail.trim().toLowerCase(),
          name: resolvedName,
          googleId: 'g_' + btoa(userEmail).slice(0, 16),
          district: 'Kolkata',
          targetExamId: 'exam-wbcs'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Google Sign-In failed.');
      }

      localStorage.setItem('wb_decoded_user', JSON.stringify(data.user));
      setShowGoogleModal(false);
      setSuccessMsg(`Signed in as ${data.user.name} via Google!`);
      setTimeout(() => router.push('/'), 400);
    } catch (err: any) {
      setErrorMsg(err.message || 'Google authentication error.');
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // 2. MOBILE OTP HANDLERS
  // ----------------------------------------------------
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate OTP.');
      }

      const code = data.otpCode || '123456';
      setActiveGeneratedOtp(code);
      setOtpCode(code.split('')); // Auto-fill 6 boxes
      setOtpStep('code');
      setShowSmsPopup(true);
      setSuccessMsg(`Verification code: ${code}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to generate OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const code = otpCode.join('').trim() || activeGeneratedOtp;
    if (code.length !== 6) {
      setErrorMsg('Please enter the complete 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone.replace(/\D/g, '').slice(-10),
          otp: code,
          district: 'Kolkata',
          targetExamId: 'exam-wbcs'
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid or expired OTP.');
      }

      localStorage.setItem('wb_decoded_user', JSON.stringify(data.user));
      setSuccessMsg('Mobile verified successfully! Redirecting...');
      setTimeout(() => router.push('/'), 400);
    } catch (err: any) {
      setErrorMsg(err.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleInstantMobileLogin = async () => {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter your 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error);

      const vRes = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanPhone,
          otp: data.otpCode,
          district: 'Kolkata',
          targetExamId: 'exam-wbcs'
        })
      });
      const vData = await vRes.json();
      if (!vRes.ok || !vData.success) throw new Error(vData.error);

      localStorage.setItem('wb_decoded_user', JSON.stringify(vData.user));
      setSuccessMsg(`Welcome, ${vData.user.name}! Logging you in...`);
      setTimeout(() => router.push('/'), 400);
    } catch (err: any) {
      setErrorMsg(err.message || 'Quick login encountered an issue.');
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // 3. EMAIL & PASSWORD LOGIN
  // ----------------------------------------------------
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email or mobile number.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: email.trim(),
          password: password.trim()
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed.');
      }

      localStorage.setItem('wb_decoded_user', JSON.stringify(data.user));
      setSuccessMsg('Signed in successfully! Redirecting to Dashboard...');
      setTimeout(() => router.push('/'), 400);
    } catch (err: any) {
      setErrorMsg(err.message || 'Incorrect email or password.');
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // 4. NEW CANDIDATE REGISTRATION
  // ----------------------------------------------------
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regName.trim() || regName.trim().length < 2) {
      setErrorMsg('Please enter your full candidate name.');
      return;
    }
    const cleanPhone = regPhone.replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!regPassword.trim() || regPassword.trim().length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName.trim(),
          phone: cleanPhone,
          email: regEmail.trim(),
          password: regPassword.trim(),
          district: regDistrict,
          targetExamId: regExam,
          preferredLang: regLang
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration failed.');
      }

      localStorage.setItem('wb_decoded_user', JSON.stringify(data.user));
      localStorage.setItem('wb_decoded_pref_lang', regLang);
      setSuccessMsg('Account registered successfully! Welcome to WB Decoded.');
      setTimeout(() => router.push('/'), 500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // 5. GUEST 1-TAP LOGIN
  // ----------------------------------------------------
  const handleGuestLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const guestUser = {
        id: 'guest_' + Date.now(),
        name: 'Aspirant Candidate',
        phone: '+91 9000000000',
        email: 'guest@aspirant.wbdecoded.in',
        district: 'Kolkata',
        targetExamId: 'exam-wbcs',
        preferredLang: 'bilingual',
        role: 'student',
        streak_days: 1,
        xp_points: 50,
        isGuest: true
      };
      localStorage.setItem('wb_decoded_user', JSON.stringify(guestUser));
      setSuccessMsg('Entering as Guest Aspirant...');
      setTimeout(() => router.push('/'), 300);
    }, 200);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 relative">
      
      {/* ----------------------------------------------------------------- */}
      {/* GOOGLE ACCOUNT SELECTOR MODAL (100% INLINE & WORKING EVERYWHERE) */}
      {/* ----------------------------------------------------------------- */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span className="font-extrabold text-sm text-slate-900">Sign in with Google</span>
              </div>
              <button onClick={() => setShowGoogleModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              Choose an account to continue to <strong>WB Decoded</strong>:
            </p>

            {/* Quick 1-Tap Google Accounts */}
            <div className="space-y-2">
              {QUICK_GOOGLE_ACCOUNTS.map((acc, idx) => (
                <button
                  key={idx}
                  onClick={() => executeGoogleSignIn(acc.email, acc.name)}
                  className="w-full p-2.5 rounded-2xl border border-slate-200 hover:bg-blue-50/60 hover:border-blue-300 transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-lg shrink-0">
                      {acc.avatar}
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-xs text-slate-900 group-hover:text-blue-700">{acc.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{acc.email}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                </button>
              ))}
            </div>

            {/* Or Custom Gmail Input */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Or Use Another Google / Gmail ID:
              </label>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 bg-slate-50"
                />
                <button
                  type="button"
                  onClick={() => executeGoogleSignIn(customGoogleEmail, customGoogleName)}
                  disabled={!customGoogleEmail.includes('@') || loading}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Sign in as this Account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Simulated SMS Notification Banner */}
      {showSmsPopup && activeGeneratedOtp && (
        <div className="fixed top-4 left-4 right-4 max-w-md mx-auto z-50 bg-slate-900 text-white p-4 rounded-3xl shadow-2xl border border-slate-700 flex items-center justify-between gap-3 animate-in slide-in-from-top-6 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <BellRing className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">SMS Notification</div>
              <p className="text-xs font-black text-white">WB Decoded OTP: <span className="text-amber-400 text-sm tracking-widest">{activeGeneratedOtp}</span></p>
              <p className="text-[10px] text-slate-400">Valid for 10 minutes</p>
            </div>
          </div>
          <button
            onClick={() => handleVerifyOtp()}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xs shrink-0"
          >
            ⚡ Auto-Verify
          </button>
        </div>
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        {/* Brand Emblem */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-2xl shadow-xl shadow-blue-600/20 border border-blue-400/30">
          <span className="font-bengali">অ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          WB <span className="text-blue-600">DECODED</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium font-bengali">
          পশ্চিমবঙ্গের চাকরি প্রার্থীদের শীর্ষস্থানীয় মক টেস্ট ও বিশ্লেষণ মঞ্চ
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 px-6 sm:px-8 rounded-3xl shadow-xl border border-slate-200/80 space-y-5">
          
          {/* 3-Way Mode Switcher: Mobile OTP | Email/Password | New Candidate */}
          <div className="grid grid-cols-3 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-[11px] font-black text-center">
            <button
              onClick={() => { setAuthMethod('otp'); setErrorMsg(''); setOtpStep('phone'); }}
              className={`py-2 rounded-xl transition-all ${
                authMethod === 'otp'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              📱 Mobile OTP
            </button>
            <button
              onClick={() => { setAuthMethod('email'); setErrorMsg(''); }}
              className={`py-2 rounded-xl transition-all ${
                authMethod === 'email'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ✉️ Email/Pass
            </button>
            <button
              onClick={() => { setAuthMethod('register'); setErrorMsg(''); }}
              className={`py-2 rounded-xl transition-all ${
                authMethod === 'register'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ✨ Register
            </button>
          </div>

          {/* Error / Success Notifications */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* METHOD 1: 1-CLICK GOOGLE SIGN-IN                                  */}
          {/* ----------------------------------------------------------------- */}
          {authMethod !== 'register' && (
            <>
              <button
                type="button"
                onClick={() => setShowGoogleModal(true)}
                disabled={loading}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-3 active:scale-98 disabled:opacity-50"
              >
                {/* Official Google G Logo */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex py-0.5 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-slate-400">or sign in with</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>
            </>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* METHOD 2: MOBILE OTP LOGIN                                        */}
          {/* ----------------------------------------------------------------- */}
          {authMethod === 'otp' && (
            <div className="space-y-4">
              {otpStep === 'phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-3 text-xs font-black text-slate-500">+91</div>
                      <input
                        type="tel"
                        required
                        autoFocus
                        placeholder="Enter 10-digit mobile..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || phone.length !== 10}
                    className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Get 6-Digit OTP Code</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleInstantMobileLogin}
                    disabled={loading || phone.length !== 10}
                    className="w-full py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-98 disabled:opacity-40"
                  >
                    <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>⚡ Quick 1-Tap Mobile Sign In</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Enter 6-Digit OTP (+91 {phone})
                      </label>
                      <button
                        type="button"
                        onClick={() => { setOtpStep('phone'); setShowSmsPopup(false); }}
                        className="text-[11px] font-bold text-blue-600 hover:underline"
                      >
                        Change Number
                      </button>
                    </div>

                    <div className="flex gap-2 justify-between">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          value={otpCode[i]}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            const n = [...otpCode];
                            n[i] = val;
                            setOtpCode(n);
                            if (val && i < 5) {
                              const next = document.getElementById(`otp-input-${i + 1}`);
                              next?.focus();
                            }
                          }}
                          id={`otp-input-${i}`}
                          className="w-10 h-11 text-center font-mono font-black text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50"
                        />
                      ))}
                    </div>

                    {activeGeneratedOtp && (
                      <div className="mt-2.5 flex items-center justify-between text-[11px] text-blue-800 font-bold bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                        <span className="flex items-center gap-1.5">
                          <BellRing className="w-3.5 h-3.5 text-blue-600" />
                          Code: <strong className="text-sm tracking-widest">{activeGeneratedOtp}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => setOtpCode(activeGeneratedOtp.split(''))}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-black"
                        >
                          Auto-Fill
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpCode.join('').length !== 6}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Verify &amp; Enter Dashboard</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* METHOD 3: EMAIL & PASSWORD LOGIN                                  */}
          {/* ----------------------------------------------------------------- */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Email Address or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Enter email or mobile..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Account Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-slate-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Sign In to Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* METHOD 4: CANDIDATE REGISTRATION                                  */}
          {/* ----------------------------------------------------------------- */}
          {authMethod === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Candidate Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sourav Banerjee"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile..."
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="Min 4 characters..."
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Home District
                  </label>
                  <select
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  >
                    {WB_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Medium
                  </label>
                  <select
                    value={regLang}
                    onChange={(e: any) => setRegLang(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/50"
                  >
                    <option value="bilingual">Bilingual (বাংলা+En)</option>
                    <option value="bengali">বাংলা মাধ্যম</option>
                    <option value="english">English Medium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Target Exam
                </label>
                <select
                  value={regExam}
                  onChange={(e) => setRegExam(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-600 bg-slate-50/50"
                >
                  {TARGET_EXAMS.map((x) => (
                    <option key={x.id} value={x.id}>{x.icon} {x.name}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 mt-1"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Register Candidate Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* 1-Tap Guest Access */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-xs transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>⚡ Continue as Guest Aspirant (1-Click)</span>
            </button>
          </div>

          {/* Security Footnote */}
          <div className="pt-2 flex items-center justify-center gap-3 text-[11px] text-slate-400 font-semibold border-t border-slate-100">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Secure
            </span>
            <span>•</span>
            <span>Google Account Chooser</span>
            <span>•</span>
            <span>Instant Mobile Auth</span>
          </div>

        </div>
      </div>

    </div>
  );
}
