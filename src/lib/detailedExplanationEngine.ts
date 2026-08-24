/**
 * Detailed Explanation Engine
 * Provides comprehensive, exam-grade structured explanations for:
 * 1. All General Studies (GS) Subjects (History, Geography, Polity, Economy, Science, Current Affairs, Math)
 * 2. English Composition with granular 4-option breakdown (Option A, B, C, D)
 */

export interface EnglishOptionDetail {
  key: string;
  text: string;
  isCorrect: boolean;
  meaning: string;
  meaningBn?: string;
  partOfSpeech: string;
  exampleSentence: string;
  grammaticalAnalysis: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface StructuredGSExplanation {
  coreConcept: string;
  keyPoints: string[];
  staticGkFacts: string[];
  examTrapNote: string;
  bengaliTranslation?: string;
}

/**
 * Parses or generates detailed option-by-option English breakdown
 */
export function getDetailedEnglishAnalysis(q: {
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_a_bn?: string;
  option_b_bn?: string;
  option_c_bn?: string;
  option_d_bn?: string;
  correct_answer: string;
  explanation?: string;
  explanation_bn?: string;
  important_fact?: string;
  exam_tip?: string;
}): {
  grammarRule: string;
  optionsBreakdown: EnglishOptionDetail[];
  vocabularyBlueprint?: { rootWord?: string; origin?: string };
  examTip: string;
} {
  const correctKey = q.correct_answer || 'A';
  const qText = q.question_text || '';
  const qLower = qText.toLowerCase();

  const options = ['A', 'B', 'C', 'D'].map(key => {
    const isCorrect = key === correctKey;
    const text = (q as any)[`option_${key.toLowerCase()}`] || '';
    const textBn = (q as any)[`option_${key.toLowerCase()}_bn`] || '';
    const tLower = text.toLowerCase().trim();

    let partOfSpeech = 'Noun / Phrase';
    let meaning = '';
    let meaningBn = textBn || '';
    let exampleSentence = '';
    let grammaticalAnalysis = '';
    let synonyms: string[] = [];
    let antonyms: string[] = [];

    // Analyze specific word types
    if (tLower.endsWith('ly')) partOfSpeech = 'Adverb';
    else if (tLower.endsWith('tion') || tLower.endsWith('ment') || tLower.endsWith('ness') || tLower.endsWith('ity')) partOfSpeech = 'Noun';
    else if (tLower.endsWith('able') || tLower.endsWith('ive') || tLower.endsWith('ous') || tLower.endsWith('ic') || tLower.endsWith('al')) partOfSpeech = 'Adjective';
    else if (tLower.startsWith('to ') || tLower.endsWith('ed') || tLower.endsWith('ing')) partOfSpeech = 'Verb / Participle';
    else if (['in', 'on', 'at', 'into', 'onto', 'with', 'from', 'for', 'of', 'off', 'between', 'among', 'through', 'under', 'over', 'by'].includes(tLower)) partOfSpeech = 'Preposition';

    // Detailed contextual meanings and grammatical analysis
    if (isCorrect) {
      meaning = `Accurately fulfills the syntactic, semantic, and contextual requirement of the sentence.`;
      grammaticalAnalysis = `Correct Choice: Conforms strictly to standard British/Indian English grammar rules, correct collocation, and semantic agreement.`;
      exampleSentence = `Example: The candidate demonstrated mastery by using "${text}" in the examination.`;
    } else {
      meaning = `Distractor option that violates grammatical agreement, idiomatic usage, or context.`;
      if (tLower.includes('off') && qLower.includes('dispose')) {
        grammaticalAnalysis = `Incorrect: 'Dispose off' with double 'f' is a standard spelling/usage error. The correct phrase is 'dispose of'.`;
        meaningBn = `ভুল বানান/প্রয়োগ`;
      } else if (tLower.includes('coped up with')) {
        grammaticalAnalysis = `Incorrect: 'Coped up with' is a redundant phrase error. Standard English strictly uses 'cope with'.`;
        meaningBn = `অতিরিক্ত শব্দ প্রয়োগের ত্রুটি`;
      } else if (tLower.includes('between') && (qLower.includes('three') || qLower.includes('several') || qLower.includes('many'))) {
        grammaticalAnalysis = `Incorrect: 'Between' is strictly used for two entities. Three or more entities require 'among'.`;
        meaningBn = `দুইয়ের অধিকের ক্ষেত্রে 'among' প্রযোজ্য`;
      } else if (tLower.includes('among') && qLower.includes('two')) {
        grammaticalAnalysis = `Incorrect: 'Among' applies to three or more entities. Two entities strictly require 'between'.`;
        meaningBn = `দুজনের ক্ষেত্রে 'between' প্রযোজ্য`;
      } else if (tLower.includes('fewer') && (qLower.includes('water') || qLower.includes('sugar') || qLower.includes('money') || qLower.includes('time'))) {
        grammaticalAnalysis = `Incorrect: 'Fewer' modifies countable nouns; uncountable mass nouns require 'less'.`;
      } else if (tLower.includes('less') && (qLower.includes('books') || qLower.includes('students') || qLower.includes('people'))) {
        grammaticalAnalysis = `Incorrect: 'Less' modifies uncountable nouns; countable plural nouns require 'fewer'.`;
      } else {
        grammaticalAnalysis = `Incorrect: Fails contextual congruence or grammatical tense/preposition agreement when compared with "${(q as any)[`option_${correctKey.toLowerCase()}`]}".`;
      }
      exampleSentence = `Caution: Avoid using "${text}" in this grammatical structure.`;
    }

    return {
      key,
      text,
      isCorrect,
      meaning: meaning || `Vocabulary term: "${text}"`,
      meaningBn: meaningBn || `${text}-এর অর্থ ও প্রয়োগ`,
      partOfSpeech,
      exampleSentence,
      grammaticalAnalysis,
      synonyms,
      antonyms
    };
  });

  // Formulate grammar rule
  let grammarRule = q.explanation || 'Apply standard grammatical agreements of tense, prepositional collocations, and idiomatic phrasing.';
  if (qLower.includes('preposition')) {
    grammarRule = 'Fixed Preposition Rule: Certain verbs and adjectives govern specific prepositions (e.g., abstain from, adhere to, dispose of, devoid of, cope with).';
  } else if (qLower.includes('subject') || qLower.includes('verb') || qLower.includes('agreement')) {
    grammarRule = 'Subject-Verb Agreement Rule: Singular subjects take singular verbs; nouns joined by "neither...nor" take the verb agreeing with the nearer subject.';
  } else if (qLower.includes('voice') || qLower.includes('passive')) {
    grammarRule = 'Voice Transformation Rule: Active voice subject becomes passive agent (by + object), with appropriate form of verb "to be" + Past Participle (V3).';
  } else if (qLower.includes('narration') || qLower.includes('reported')) {
    grammarRule = 'Direct to Indirect Speech Rule: Backshift tenses appropriately when reporting verb is in past tense; convert pronouns and time/place adverbs.';
  }

  return {
    grammarRule,
    optionsBreakdown: options,
    examTip: q.exam_tip || 'Look for prepositional collocations and eliminate distractors with incorrect prepositions or redundant adverbs.'
  };
}

/**
 * Parses or generates structured deep GS explanation
 */
export interface StructuredExplanationData {
  coreConcept: string;
  keyPoints: string[];
  subjectFactTitle: string;
  subjectFacts: string[];
  examTrapNote: string;
  bengaliTranslation?: string;
  badgeType: 'math' | 'english' | 'reasoning' | 'pedagogy' | 'bengali' | 'gk';
}

/**
 * Parses or generates subject-pure structured deep explanation
 */
export function getStructuredGSExplanation(q: {
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation?: string;
  explanation_bn?: string;
  important_fact?: string;
  exam_tip?: string;
  subject_name?: string;
  chapter_name?: string;
}): StructuredExplanationData {
  const correctKey = q.correct_answer || 'A';
  const correctText = (q as any)[`option_${correctKey.toLowerCase()}`] || '';
  const subj = (q.subject_name || '').toLowerCase();
  const qText = q.question_text || '';

  const coreConcept = q.explanation || `The correct answer is Option ${correctKey}: "${correctText}".`;

  const keyPoints: string[] = [];
  const subjectFacts: string[] = [];
  let subjectFactTitle = '🏛️ STATIC GK & EXAM FACT:';
  let badgeType: 'math' | 'english' | 'reasoning' | 'pedagogy' | 'bengali' | 'gk' = 'gk';

  // Extract key bullet points
  if (q.explanation && q.explanation.includes('.')) {
    const sentences = q.explanation.split('. ').filter(s => s.trim().length > 15);
    sentences.slice(0, 3).forEach(s => {
      keyPoints.push(s.trim().endsWith('.') ? s.trim() : `${s.trim()}.`);
    });
  }

  // Pure Subject-Specific Categorization
  if (subj.includes('arith') || subj.includes('math') || qText.includes('₹') || qText.includes('Selling Price') || qText.includes('Simple Interest') || qText.includes('train')) {
    badgeType = 'math';
    subjectFactTitle = '⚡ SHORTCUT TRICK & CORE FORMULA:';
    if (q.important_fact && !q.important_fact.toLowerCase().includes('historical') && !q.important_fact.toLowerCase().includes('gk')) {
      subjectFacts.push(q.important_fact);
    } else {
      subjectFacts.push('⚡ Formula / Shortcut: Apply unit cancellation, ratio scaling, and mental approximation to solve within 30 seconds.');
    }
  } else if (subj.includes('eng') || subj.includes('grammar') || qText.includes('preposition') || qText.includes('spelt') || qText.includes('antonym') || qText.includes('synonym') || qText.includes('idiom')) {
    badgeType = 'english';
    subjectFactTitle = '📌 GRAMMAR RULE & USAGE NOTE:';
    if (q.important_fact && !q.important_fact.toLowerCase().includes('historical') && !q.important_fact.toLowerCase().includes('gk')) {
      subjectFacts.push(q.important_fact);
    } else {
      subjectFacts.push('📌 Rule: Follow standard British/Indian grammatical collocations, subject-verb agreement, and fixed preposition rules.');
    }
  } else if (subj.includes('gma') || subj.includes('reason') || qText.includes('sequence') || qText.includes('series') || qText.includes('photograph')) {
    badgeType = 'reasoning';
    subjectFactTitle = '🧠 LOGICAL PATTERN & SOLVING STRATEGY:';
    if (q.important_fact && !q.important_fact.toLowerCase().includes('historical') && !q.important_fact.toLowerCase().includes('gk')) {
      subjectFacts.push(q.important_fact);
    } else {
      subjectFacts.push('🧠 Strategy: Check step differences, square/cube patterns, reverse alphabet pairing, or family bloodline hierarchy.');
    }
  } else if (subj.includes('cdp') || subj.includes('pedagogy') || qText.includes('Piaget') || qText.includes('Vygotsky') || qText.includes('RTE')) {
    badgeType = 'pedagogy';
    subjectFactTitle = '🎓 PEDAGOGICAL PRINCIPLE & THEORY:';
    if (q.important_fact) subjectFacts.push(q.important_fact);
    subjectFacts.push('🎓 Teaching Guideline: Emphasizes child-centered learning, diagnostic evaluation, and constructive developmental stages.');
  } else if (subj.includes('ben') || subj.includes('বাংলা') || qText.includes('সন্ধি') || qText.includes('সমাস') || qText.includes('কারক')) {
    badgeType = 'bengali';
    subjectFactTitle = '📚 বাংলা ব্যাকরণ ও প্রয়োগবিধি:';
    if (q.important_fact) subjectFacts.push(q.important_fact);
    subjectFacts.push('📚 ব্যাকরণ সূত্র: প্রমিত বাংলা ব্যাকরণের স্বরসন্ধি, সমাস ও কারক-বিভক্তি নিয়মের প্রামাণ্য প্রয়োগ।');
  } else {
    // General Studies (Polity, History, Geography, Economy, Science, Current Affairs)
    badgeType = 'gk';
    subjectFactTitle = '🏛️ STATIC GK & EXAM FACT:';
    if (q.important_fact) {
      subjectFacts.push(q.important_fact);
    } else if (subj.includes('polity') || qText.includes('Article')) {
      subjectFacts.push('Constitutional Status: Governed under the Constitution of India.');
    } else if (subj.includes('inm') || subj.includes('history')) {
      subjectFacts.push('Historical Milestone: Landmark event during Indian History & National Movement.');
    } else if (subj.includes('geo')) {
      subjectFacts.push('Geographical Parameter: Key physical/economic geography concept for West Bengal exams.');
    } else if (subj.includes('sci')) {
      subjectFacts.push('Scientific Law & Mechanism: Verified by standard general science syllabus.');
    } else if (subj.includes('econ')) {
      subjectFacts.push('Economic Framework: Standard macroeconomic and state welfare policy guidelines.');
    }
  }

  const examTrapNote = q.exam_tip || `Exam Elimination Strategy: Option ${correctKey} ("${correctText}") precisely aligns with the official syllabus.`;

  return {
    coreConcept,
    keyPoints,
    subjectFactTitle,
    subjectFacts,
    examTrapNote,
    bengaliTranslation: q.explanation_bn,
    badgeType
  };
}
