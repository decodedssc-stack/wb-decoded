'use client';

import React, { useState } from 'react';
import StudentSidebar from '@/components/layout/StudentSidebar';
import StudentSideDrawer from '@/components/layout/StudentSideDrawer';
import {
  Crown,
  CheckCircle2,
  Zap,
  Sparkles,
  ShieldCheck,
  Check,
  Tag,
  ArrowRight,
  Clock,
  Award,
  BookOpen,
  RotateCcw,
  HelpCircle,
  X,
  Menu
} from 'lucide-react';

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | 'lifetime'>('yearly');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState<{ text: string; isSuccess: boolean } | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const plans = {
    monthly: {
      id: 'monthly',
      name: 'Monthly Pass Pro',
      price: 99,
      originalPrice: 299,
      duration: '30 Days Access',
      popular: false
    },
    yearly: {
      id: 'yearly',
      name: '1-Year Full Pass Pro',
      price: 299,
      originalPrice: 999,
      duration: '365 Days Access (Best Value)',
      popular: true
    },
    lifetime: {
      id: 'lifetime',
      name: 'Lifetime Pass Pro',
      price: 499,
      originalPrice: 1999,
      duration: 'Lifetime Validity + Free Updates',
      popular: false
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'WBPSC10') {
      setAppliedDiscount(10);
      setCouponMsg({ text: 'Coupon WBPSC10 Applied! 10% Extra Discount', isSuccess: true });
    } else if (code === 'SUCCESS50') {
      setAppliedDiscount(50);
      setCouponMsg({ text: 'Coupon SUCCESS50 Applied! 50% Huge Discount', isSuccess: true });
    } else if (code === 'WBDECODED') {
      setAppliedDiscount(20);
      setCouponMsg({ text: 'Coupon WBDECODED Applied! 20% Special Discount', isSuccess: true });
    } else {
      setAppliedDiscount(0);
      setCouponMsg({ text: 'Invalid coupon code. Try "WBPSC10" or "SUCCESS50"', isSuccess: false });
    }
  };

  const currentPrice = plans[selectedPlan].price;
  const finalPrice = Math.max(1, Math.round(currentPrice * (1 - appliedDiscount / 100)));

  const handleSimulatePayment = () => {
    setTimeout(() => {
      setCheckoutSuccess(true);
      setTimeout(() => {
        setShowCheckoutModal(false);
        setCheckoutSuccess(false);
        alert('🎉 Payment Successful! WB Pass Pro is now active on your account.');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-[calc(100vh-4rem)] w-full overflow-x-hidden select-none font-sans">
      <StudentSidebar />
      <StudentSideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <div className="flex-1 w-full pb-28 lg:pb-12">
        {/* Top Mobile Black Header */}
        <header className="lg:hidden bg-[#121820] text-white px-4 py-3 sticky top-0 z-30 shadow-md flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsDrawerOpen(true)} className="p-1 text-white">
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-extrabold text-sm text-white">Pass Pro Subscription</span>
          </div>
          <span className="text-xs text-amber-400 font-black">
            👑 PASS PRO
          </span>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto w-full overflow-x-hidden">
          {/* Hero Header */}
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 inline-flex items-center gap-1.5 shadow-xs">
              <Crown className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
              UNIFIED WB Pass Pro
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Unlock 900+ Full Mocks &amp; 1,200 Chapter Tests
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              One single subscription designed exclusively for West Bengal Civil Service, Police SI &amp; Constable, Food SI, Clerkship, Primary TET, and State examinations.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {Object.values(plans).map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id as any)}
                  className={`relative bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                    isSelected 
                      ? 'border-[#2563EB] shadow-lg ring-4 ring-[#2563EB]/10' 
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#2563EB] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                      MOST POPULAR &bull; BEST VALUE
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-base text-slate-900">{plan.name}</h3>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#2563EB] bg-[#2563EB] text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-slate-900">₹{plan.price}</span>
                        <span className="text-sm font-semibold text-slate-400 line-through">₹{plan.originalPrice}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 mt-1">{plan.duration}</p>
                    </div>

                    <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>All 900 Full-Length Mocks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>20-Year PYQ CBT Papers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>State Rank &amp; AI Analytics</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(plan.id as any);
                      setShowCheckoutModal(true);
                    }}
                    className={`w-full py-3 rounded-2xl font-black text-xs transition-all shadow-xs ${
                      isSelected
                        ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    SELECT PLAN
                  </button>
                </div>
              );
            })}
          </div>

          {/* Coupon Code Section */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs max-w-xl mx-auto space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#2563EB]" />
              <span>Apply Discount Coupon</span>
            </h4>

            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter code (e.g. WBPSC10, SUCCESS50, WBDECODED)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs uppercase font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#121820] hover:bg-slate-800 text-white font-black text-xs transition-colors"
              >
                APPLY
              </button>
            </form>

            {couponMsg && (
              <p className={`text-xs font-bold ${couponMsg.isSuccess ? 'text-emerald-600' : 'text-rose-600'}`}>
                {couponMsg.text}
              </p>
            )}
          </div>
        </div>

        {/* Checkout Modal */}
        {showCheckoutModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <span>Confirm WB Pass Pro</span>
                </h3>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {checkoutSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-black text-lg text-slate-900">Payment Verified!</h4>
                  <p className="text-xs text-slate-500">Redirecting to your unlocked mock arena...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-xs">
                    <div className="flex justify-between font-semibold text-slate-600">
                      <span>Selected Plan:</span>
                      <span className="text-slate-900 font-bold">{plans[selectedPlan].name}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-600">
                      <span>Base Price:</span>
                      <span className="line-through text-slate-400">₹{plans[selectedPlan].originalPrice}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-600">
                      <span>Offer Price:</span>
                      <span className="font-bold text-slate-900">₹{plans[selectedPlan].price}</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between font-bold text-emerald-600">
                        <span>Coupon Discount ({appliedDiscount}%):</span>
                        <span>- ₹{Math.round(currentPrice * (appliedDiscount / 100))}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                      <span>Final Amount:</span>
                      <span className="text-[#2563EB] text-lg">₹{finalPrice}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Select Payment Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        className="p-3 rounded-xl border-2 border-[#2563EB] bg-blue-50 text-xs font-black text-[#2563EB] text-center"
                      >
                        ⚡ Instant UPI / QR
                      </button>
                      <button
                        type="button"
                        className="p-3 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 text-center hover:bg-slate-50"
                      >
                        💳 Card / NetBanking
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Pay ₹{finalPrice} &amp; Unlock All 900 Mocks &rarr;</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
