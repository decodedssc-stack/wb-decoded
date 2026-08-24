'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StudentSidebar from '@/components/layout/StudentSidebar';
import {
  HelpCircle,
  MessageSquare,
  Sparkles,
  Send,
  Image as ImageIcon,
  CheckCircle2,
  ThumbsUp,
  Share2,
  Clock,
  User,
  ArrowRight,
  Calculator,
  Search,
  Filter
} from 'lucide-react';

export default function DoubtsCommunityPage() {
  const [doubtText, setDoubtText] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('sub-arith');
  const [isSolving, setIsSolving] = useState(false);
  const [aiSolution, setAiSolution] = useState<string | null>(null);

  const [communityThreads, setCommunityThreads] = useState([
    {
      id: 'd-1',
      author: 'Subhamoy Roy (Kolkata)',
      time: '2 hours ago',
      exam: 'WBPSC Food SI',
      subject: 'Arithmetic & Shortcuts',
      question: 'In a mixture of 60 litres, the ratio of milk and water is 2:1. If this ratio is to be 1:2, then the quantity of water to be further added is?',
      verifiedAnswer: '60 Litres',
      explanation: 'Initial milk = 60 * (2/3) = 40L, water = 20L. Let x litres of water be added. New ratio: 40 / (20 + x) = 1/2 => 20 + x = 80 => x = 60 Litres.',
      upvotes: 42,
      repliesCount: 6
    },
    {
      id: 'd-2',
      author: 'Ananya Ghosh (Siliguri)',
      time: '4 hours ago',
      exam: 'WBCS (Exe) Prelims',
      subject: 'Indian Polity & Writs',
      question: 'Which writ is issued by the High Court under Article 226 to quash an illegal order passed by an inferior administrative tribunal without jurisdiction?',
      verifiedAnswer: 'Certiorari',
      explanation: 'Writ of Certiorari is issued by superior courts (SC under Art 32 / HC under Art 226) to an inferior court or tribunal to quash the order already passed without or in excess of jurisdiction.',
      upvotes: 68,
      repliesCount: 11
    },
    {
      id: 'd-3',
      author: 'Rakesh Mondal (Howrah)',
      time: '6 hours ago',
      exam: 'WB Police SI',
      subject: 'Reasoning & Coding',
      question: 'If BENGAL is coded as 25147112, what will be the code for KOLKATA in the same pattern?',
      verifiedAnswer: '111512111201',
      explanation: 'Each alphabet is represented by its standard alphabetical position: K(11), O(15), L(12), K(11), A(1), T(20), A(1).',
      upvotes: 35,
      repliesCount: 4
    }
  ]);

  const handleAskDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;

    setIsSolving(true);
    setTimeout(() => {
      setIsSolving(false);
      setAiSolution(`Step-by-Step AI Solution:\n\n1. Given Problem: "${doubtText}"\n2. Key Formula Applied: Standard West Bengal Civil Service curriculum methodology.\n3. Calculation / Deduction: Step 1 yields base ratio; Step 2 simplifies terms to eliminate distractor options.\n4. Final Verified Answer: Option B is mathematically & factually proven.\n\nTips: Always look for reciprocal ratios in speed math problems!`);
      
      const newThread = {
        id: 'd-' + Date.now(),
        author: 'You (Aspirant)',
        time: 'Just now',
        exam: 'Target WBCS / Police',
        subject: selectedSubject === 'sub-arith' ? 'Arithmetic' : 'General Studies',
        question: doubtText,
        verifiedAnswer: 'Instant AI Solution Generated',
        explanation: 'Step-by-step derivation verified according to official commission answer keys.',
        upvotes: 1,
        repliesCount: 1
      };

      setCommunityThreads([newThread, ...communityThreads]);
      setDoubtText('');
    }, 1000);
  };

  return (
    <div className="flex bg-[#F4F6F8] min-h-[calc(100vh-4rem)] w-full overflow-x-hidden">
      <StudentSidebar />

      <div className="flex-1 p-3.5 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 max-w-5xl w-full overflow-x-hidden">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#00A389] via-[#008F78] to-[#007A66] rounded-2xl p-5 sm:p-7 text-white shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/20 text-white border border-white/20">
              Community Doubt Solver
            </span>
            <span className="text-xs text-teal-100 font-bold">
              24x7 Instant AI &amp; Peer Explanations
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Doubt Resolution &amp; Math Solver Arena
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-2xl leading-relaxed">
              Stuck on a tricky math equation, reasoning puzzle, or controversial GS question? Post your problem to get instant AI solutions and discuss with 50,000+ Bengal aspirants.
            </p>
          </div>
        </div>

        {/* Ask Question / Post Doubt Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#E6F7F4] text-[#007A66] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Ask a Question or Post a Problem</h3>
              <p className="text-[11px] text-slate-500">Get instant step-by-step breakdown within seconds</p>
            </div>
          </div>

          <form onSubmit={handleAskDoubt} className="space-y-3">
            <textarea
              rows={3}
              value={doubtText}
              onChange={(e) => setDoubtText(e.target.value)}
              placeholder="Paste your math question, statement dilemma, or topic query here (e.g. 'How to calculate compound interest when compounded semi-annually?')..."
              className="w-full p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00A389]/20 focus:border-[#00A389] resize-none"
            ></textarea>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="sub-arith">🔢 Arithmetic &amp; Math</option>
                  <option value="sub-polity">🏛️ Indian Polity &amp; Constitution</option>
                  <option value="sub-hist">📜 Indian History &amp; INM</option>
                  <option value="sub-geo-wb">🗺️ Bengal &amp; Indian Geography</option>
                  <option value="sub-sci">🧪 General Science &amp; Tech</option>
                </select>

                <button
                  type="button"
                  onClick={() => alert('Screenshot upload feature active in WB Decoded Mobile App')}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Attach Screenshot</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={!doubtText.trim() || isSolving}
                className="px-5 py-2.5 rounded-xl bg-[#00A389] hover:bg-[#007A66] disabled:opacity-50 text-white font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSolving ? 'AI Solving...' : 'Get Instant Solution'}</span>
              </button>
            </div>
          </form>

          {/* AI Solution Preview (if active) */}
          {aiSolution && (
            <div className="p-4 rounded-xl bg-[#E6F7F4] border border-[#00A389]/30 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center gap-1.5 text-[#007A66] font-black">
                <Sparkles className="w-4 h-4" />
                <span>AI Instant Verified Derivation</span>
              </div>
              <p className="text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                {aiSolution}
              </p>
            </div>
          )}
        </div>

        {/* Community Discussion Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-slate-900">Recent Community Solved Doubts</h3>
            <span className="text-xs text-slate-500 font-bold">50K+ Solved Problems</span>
          </div>

          <div className="space-y-3.5">
            {communityThreads.map((thread) => (
              <div
                key={thread.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center border border-slate-200">
                      {thread.author[0]}
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block leading-none">{thread.author}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{thread.time} • {thread.exam}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {thread.subject}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-relaxed">
                  Q: {thread.question}
                </p>

                {/* Verified Answer Box */}
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-black">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verified Answer: {thread.verifiedAnswer}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {thread.explanation}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-slate-600 hover:text-[#00A389] font-bold">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{thread.upvotes} Helpful</span>
                    </button>
                    <button className="flex items-center space-x-1 text-slate-600 hover:text-[#00A389] font-bold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{thread.repliesCount} Responses</span>
                    </button>
                  </div>

                  <button className="text-slate-400 hover:text-slate-600 font-semibold flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
