'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Zap, CheckCircle2, Bookmark, FileText, ChevronRight, Scale, Shield, Lightbulb } from 'lucide-react';

export default function FastRevisionHub() {
  const [activeCard, setActiveCard] = useState<number>(1);

  const REVISION_TOPICS = [
    {
      id: 1,
      title: '⚡ 1-Page Master Cheat Sheet: All 25 Parts & 12 Schedules',
      summary: 'Complete architectural map of the Indian Constitution at a single glance.',
      content: [
        { label: 'Part I (Art 1–4)', text: 'Union & its Territory (Indestructible Union of Destructible States)' },
        { label: 'Part II (Art 5–11)', text: 'Citizenship (Acquisition by BRAND, Loss by RTD, Assam Accord, CAA 2019)' },
        { label: 'Part III (Art 12–35)', text: 'Fundamental Rights (Magna Carta; Arts 20 & 21 non-suspendable)' },
        { label: 'Part IV (Art 36–51)', text: 'Directive Principles of State Policy (Welfare State; Non-justiciable)' },
        { label: 'Part IVA (Art 51A)', text: 'Fundamental Duties (11 duties; 42nd & 86th Amendments)' },
        { label: 'Part V (Art 52–151)', text: 'The Union (President, VP, PM, Council of Ministers, Parliament, SC, CAG)' },
        { label: 'Part VI (Art 152–237)', text: 'The States (Governor, CM, Council of Ministers, High Courts, Subordinate Courts)' },
        { label: 'Part VIII (Art 239–242)', text: 'The Union Territories (Administered by President via LG/Administrator)' },
        { label: 'Part IX (Art 243–243O)', text: 'The Panchayats (73rd Amendment 1992; 29 items in 11th Schedule)' },
        { label: 'Part IXA (Art 243P–243ZG)', text: 'The Municipalities (74th Amendment 1992; 18 items in 12th Schedule)' },
        { label: 'Part XIV-A (Art 323A–323B)', text: 'Tribunals (CAT & SAT for service matters; 42nd Amendment)' },
        { label: 'Part XV (Art 324–329)', text: 'Elections (Independent Election Commission; Universal Adult Suffrage Art 326)' },
        { label: 'Part XVIII (Art 352–360)', text: 'Emergency Provisions (National: 352, President Rule: 356, Financial: 360)' },
        { label: 'Part XX (Art 368)', text: 'Amendment of the Constitution (Special Majority; Basic Structure Doctrine)' }
      ]
    },
    {
      id: 2,
      title: '🎯 Top 20 Most Repeated Articles in WBCS & WBP',
      summary: 'Hand-picked constitutional articles that appear in 90% of state competitive exams.',
      content: [
        { label: 'Article 14', text: 'Equality before law & Equal protection of laws (No arbitrariness)' },
        { label: 'Article 17', text: 'Abolition of Untouchability (Absolute right with ZERO exceptions)' },
        { label: 'Article 21', text: 'Protection of Life and Personal Liberty (Includes Right to Privacy)' },
        { label: 'Article 21A', text: 'Right to Education (6–14 years, 86th Amendment 2002)' },
        { label: 'Article 32', text: 'Right to Constitutional Remedies (Heart & Soul per Dr. Ambedkar; 5 Writs)' },
        { label: 'Article 40', text: 'Organisation of Village Panchayats (Gandhian Principle)' },
        { label: 'Article 44', text: 'Uniform Civil Code (UCC) for all citizens' },
        { label: 'Article 50', text: 'Separation of Judiciary from Executive' },
        { label: 'Article 51A', text: 'Fundamental Duties (Swaran Singh Committee, 42nd Amendment)' },
        { label: 'Article 61', text: 'Procedure for Impeachment of President (Violation of Constitution)' },
        { label: 'Article 72', text: 'Pardoning Powers of President (Pardons death sentence & court-martial)' },
        { label: 'Article 76', text: 'Attorney General for India (Qualified to be SC Judge; No voting in Parliament)' },
        { label: 'Article 108', text: 'Joint Sitting of Parliament (Summoned by President, Presided by Speaker)' },
        { label: 'Article 110', text: 'Definition of Money Bill (Speaker decision final; RS max 14 days delay)' },
        { label: 'Article 123', text: 'Ordinance-making power of President (Max lifespan 6 months + 6 weeks)' },
        { label: 'Article 143', text: 'Advisory Jurisdiction of Supreme Court (Presidential Reference)' },
        { label: 'Article 213', text: 'Ordinance-making power of Governor' },
        { label: 'Article 226', text: 'Writ Jurisdiction of High Courts (Wider scope than Article 32)' },
        { label: 'Article 280', text: 'Finance Commission of India (Constituted every 5 years by President)' },
        { label: 'Article 324', text: 'Superintendence, direction & control of elections in Election Commission' },
        { label: 'Article 352', text: 'National Emergency (Requires written advice of Union Cabinet)' },
        { label: 'Article 368', text: 'Power of Parliament to amend Constitution (Subject to Basic Structure)' }
      ]
    },
    {
      id: 3,
      title: '🧠 Proprietary Memory Tricks & Mnemonics',
      summary: 'Secret formulas to memorize Schedules, Preamble keywords, Writs & Citizenships.',
      content: [
        { label: 'TEARS OF OLD PM', text: '12 Schedules: Territories, Emoluments, Affirmations, Rajya Sabha, Scheduled areas, Other tribal areas, Federal lists, Official languages, Land reforms, Defection, Panchayats, Municipalities.' },
        { label: 'SO-SO-SE-DE-RE', text: 'Preamble 5 Key Adjectives in exact sequence: Sovereign, Socialist, Secular, Democratic, Republic.' },
        { label: 'BRAND', text: '5 Ways to Acquire Indian Citizenship: Birth, Registration, Acquisition of territory, Naturalisation, Descent.' },
        { label: 'U-J-P-P', text: 'President of India Election Formula: Union MPs + Judicial (none) + Pradeshiyak (State MLAs) + Puducherry & Delhi.' },
        { label: 'CPR-MD-Q', text: '5 Constitutional Writs: Certiorari, Prohibition, Quo-Warranto, Mandamus, Habeas Corpus.' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-24 select-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#1D4ED8] text-white px-4 py-10 shadow-md">
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/polity"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition mb-4 border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Polity Hub
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" /> High-Speed Memory Vault
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            1-Page Master <span className="text-amber-300">Revision Center</span>
          </h1>
          <p className="mt-2 text-xs md:text-sm text-blue-100 max-w-2xl font-medium">
            Ultra-condensed master cheat-sheets, high-frequency article lists, and memory mnemonics for rapid recall before exams.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Topic Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {REVISION_TOPICS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveCard(t.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition flex items-center gap-2 shadow-2xs ${
                activeCard === t.id
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {t.title.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Active Revision Card */}
        {REVISION_TOPICS.filter(t => t.id === activeCard).map((topic) => (
          <div 
            key={topic.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-sm"
          >
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-lg md:text-xl font-black text-slate-900">
                {topic.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                {topic.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {topic.content.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-[#2563EB]/40 hover:bg-blue-50/20 transition flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    <span className="font-extrabold text-xs text-[#1E3A8A]">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
