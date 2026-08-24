import { NextResponse } from 'next/server';
import { getDetailedEnglishAnalysis, getStructuredGSExplanation } from '@/lib/detailedExplanationEngine';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      question_text = '',
      question_text_bn = '',
      option_a = '',
      option_b = '',
      option_c = '',
      option_d = '',
      option_a_bn = '',
      option_b_bn = '',
      option_c_bn = '',
      option_d_bn = '',
      correct_answer = 'A',
      subject_id = 'sub-polity',
      subject_name = ''
    } = body;

    const correctKey = (correct_answer || 'A').toUpperCase();
    const correctOptionText =
      correctKey === 'A' ? option_a :
      correctKey === 'B' ? option_b :
      correctKey === 'C' ? option_c : option_d;

    const correctOptionBn =
      correctKey === 'A' ? option_a_bn :
      correctKey === 'B' ? option_b_bn :
      correctKey === 'C' ? option_c_bn : option_d_bn;

    let explanationEn = '';
    let explanationBn = '';
    let importantFact = '';
    let examTip = '';

    if (subject_id === 'sub-eng' || subject_name?.toLowerCase().includes('english')) {
      const engAnalysis = getDetailedEnglishAnalysis({
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer: correctKey,
      });

      explanationEn = `Option (${correctKey}) "${correctOptionText}" is the grammatically and semantically correct choice.\n\n` +
        `• Core Grammar Rule: ${engAnalysis.grammarRule}\n` +
        `• Detailed Breakdown:\n` +
        engAnalysis.optionsBreakdown.map(o => `  - Option [${o.key}] "${o.text}": ${o.meaning} (${o.grammaticalAnalysis})`).join('\n');

      explanationBn = `সঠিক উত্তর হলো অপশন (${correctKey}) "${correctOptionBn || correctOptionText}"।\n` +
        `গ্রামারের নিয়মানুযায়ী এই বিকল্পটি বাক্যের অর্থের সাথে যথাযথভাবে সঙ্গতিপূর্ণ।`;

      importantFact = engAnalysis.vocabularyBlueprint?.rootWord
        ? `Etymology / Root Word: ${engAnalysis.vocabularyBlueprint.rootWord} (${engAnalysis.vocabularyBlueprint.origin || 'Latin/Greek'})`
        : `Standard British & Indian English syllabus guideline rule.`;

      examTip = engAnalysis.examTip || 'Carefully eliminate options violating subject-verb agreement or prepositional collocations.';
    } else {
      // General Studies / Science / Math / History / Polity / Geography
      const gsAnalysis = getStructuredGSExplanation({
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer: correctKey,
        explanation: `Detailed analysis for "${question_text}". The correct answer is Option (${correctKey}) "${correctOptionText}".`,
        explanation_bn: question_text_bn ? `প্রশ্ন: ${question_text_bn}` : undefined,
        subject_name: subject_name || subject_id
      });

      explanationEn = `Option (${correctKey}) "${correctOptionText}" is the correct answer.\n\n` +
        `📌 Core Concept: ${gsAnalysis.coreConcept}\n\n` +
        `🔑 Key Facts:\n` +
        gsAnalysis.keyPoints.map(p => `• ${p}`).join('\n') + `\n\n` +
        `📚 ${gsAnalysis.subjectFactTitle}\n` +
        gsAnalysis.subjectFacts.map(f => `• ${f}`).join('\n');

      explanationBn = `সঠিক উত্তর হলো অপশন (${correctKey}) "${correctOptionBn || correctOptionText}"।\n\n` +
        `📌 মূল বিষয়বস্তু: ${gsAnalysis.bengaliTranslation || 'পরীক্ষার সিলেবাসের গুরুত্বপূর্ণ অংশ।'}\n` +
        `🔑 প্রয়োজনীয় তথ্যসমূহ:\n` +
        gsAnalysis.keyPoints.map(p => `• ${p}`).join('\n');

      importantFact = gsAnalysis.subjectFacts[0] || `High-yield official examination fact for state & central civil services.`;
      examTip = gsAnalysis.examTrapNote || `Examine dates, keywords, and eliminator cues in multiple choice options.`;
    }

    return NextResponse.json({
      success: true,
      explanation: explanationEn,
      explanation_bn: explanationBn,
      important_fact: importantFact,
      exam_tip: examTip
    });
  } catch (error: any) {
    console.error('Error generating AI explanation:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
