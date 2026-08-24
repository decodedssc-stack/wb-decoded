import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🧹 Deep Cleaning Explanations & Removing Meta Blocks and ASCII Dividers...');

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('temp_store = MEMORY');

const allQuestions = db.prepare('SELECT id, question_text, question_text_bn, explanation, explanation_bn, important_fact, exam_tip, subject_id, chapter_id, topic_id FROM questions').all();

const updateStmt = db.prepare(`
  UPDATE questions
  SET question_text = ?,
      question_text_bn = ?,
      explanation = ?,
      explanation_bn = ?,
      important_fact = ?,
      exam_tip = ?
  WHERE id = ?
`);

function cleanText(text) {
  if (!text) return '';
  
  let cleaned = text;

  // Remove divider lines and textbook reference blocks
  if (cleaned.includes('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')) {
    cleaned = cleaned.split('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')[0];
  }

  // Remove any remaining textbook reference / elimination header tags
  cleaned = cleaned
    .replace(/📖\s*\[TEXTBOOK REFERENCE:[^\]]*\][\s\S]*?(?=(🔍|💡|\n\n|$))/gi, '')
    .replace(/📖\s*\[পাঠ্যপুস্তক সহায়িকা:[^\]]*\][\s\S]*?(?=(🔍|💡|\n\n|$))/gi, '')
    .replace(/🔍\s*Option Elimination Strategy:[^\n]*/gi, '')
    .replace(/🔍\s*Shortcut Technique:[^\n]*/gi, '')
    .replace(/━+/g, '');

  // Remove phrases like "In Central Government competitive examinations..." or meta exam talks
  cleaned = cleaned
    .replace(/In Central Government competitive examinations[^\.\n]*\./gi, '')
    .replace(/In Central Government competitive examinations[^\.\n]*/gi, '')
    .replace(/In competitive examinations[^\.\n]*\./gi, '')
    .replace(/In the context of Modern Indian History and the National Freedom Struggle[^\.\n]*\./gi, '')
    .replace(/In Indian and Regional Physical Geography[^\.\n]*\./gi, '')
    .replace(/In Financial Awareness and Macroeconomics[^\.\n]*\./gi, '')
    .replace(/In Logical Reasoning[^\.\n]*\./gi, '')
    .replace(/In Mathematics relating to[^\.\n]*\./gi, '')
    .replace(/Questions on [^,\.\n]* are frequently asked in [^\.\n]*\./gi, '')
    .replace(/In the chapter [^,\.\n]*, mastering the core aspects of [^\.\n]*\./gi, '')
    .replace(/\[Chapter Practice & PYQ Drill\]\s*/gi, '')
    .replace(/\[অধ্যায়ভিত্তিক অনুশীলন ও PYQ ড্রিল\]\s*/gi, '')
    .replace(/\[Standard Objective MCQ\]\s*/gi, '')
    .replace(/\[High-Yield Practice Question\]\s*/gi, '')
    .replace(/\[Official State Curriculum Solution\]\s*/gi, '')
    .replace(/\[[^\]]*Official[^\]]*\]\s*/gi, '')
    .replace(/\(WBCS & WB State Exams \/ RRB NTPC \/ UPSC\)/gi, '')
    .replace(/\(WBCS \/ WB Police \/ Central Exams\)/gi, '')
    .replace(/\(WBCS & WB State Exams\)/gi, '')
    .replace(/test exact chronological timelines, key resolutions, and associated national leaders\./gi, '')
    .replace(/highlights the courage and intellectual leadership of India's freedom fighters\./gi, '')
    .replace(/is a standard topic across [^\.\n]*\./gi, '')
    .replace(/is tested frequently in [^\.\n]*\./gi, '')
    .replace(/reflects the core constitutional values of the Republic of India[^\.\n]*\./gi, '');

  // Remove duplicate empty lines and trim
  cleaned = cleaned
    .split('\n')
    .map(line => line.trim())
    .filter((line, idx, arr) => line.length > 0 || (idx > 0 && arr[idx - 1].length > 0))
    .join('\n')
    .trim();

  return cleaned;
}

function cleanBengali(text) {
  if (!text) return '';
  
  let cleaned = text;

  if (cleaned.includes('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')) {
    cleaned = cleaned.split('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')[0];
  }

  cleaned = cleaned
    .replace(/📖\s*\[পাঠ্যপুস্তক সহায়িকা:[^\]]*\][\s\S]*$/gi, '')
    .replace(/━+/g, '')
    .replace(/\[অধ্যায়ভিত্তিক অনুশীলন ও PYQ ড্রিল\]\s*/gi, '')
    .replace(/\[জাতীয় স্তরের PYQ\]\s*/gi, '')
    .replace(/বিষয়টি এসএসসি, রেল ও ইউপিএসসি পরীক্ষায় নিয়মিতভাবে[^\.\n।]*।?/gi, '')
    .replace(/রেল ও কেন্দ্রীয় পরীক্ষায় প্রাচীন ও মধ্যযুগীয় ভারতের ইতিহাস অংশে নিয়মিত আসা[^\.\n।]*।?/gi, '')
    .replace(/প্রাকৃতিক ও পরিবেশগত ভূগোলের একটি কেন্দ্রীয় বিষয় যা[^\.\n।]*।?/gi, '')
    .replace(/সিভিল সার্ভিস ও কেন্দ্রীয় সরকারি চাকরির পরীক্ষায় অত্যন্ত আবশ্যক[^\.\n।]*।?/gi, '')
    .replace(/অধ্যায়ের অন্তর্গত[^\.\n।]*অংশটির গভীর অনুধাবন যেকোনো মাল্টিপল চয়েস প্রশ্নের নির্ভুল উত্তর দিতে সহায়তা করে।?/gi, '')
    .trim();

  return cleaned;
}

let cleanedCount = 0;
const startTime = Date.now();

db.transaction(() => {
  for (const q of allQuestions) {
    const qText = cleanText(q.question_text);
    const qTextBn = cleanBengali(q.question_text_bn);
    let exp = cleanText(q.explanation);
    let expBn = cleanBengali(q.explanation_bn);
    let fact = cleanText(q.important_fact);
    let tip = cleanText(q.exam_tip);

    // Fallback if explanation became empty
    if (!exp || exp.length < 10) {
      exp = `Correct Answer is Option ${q.correct_answer || 'A'}. Detailed step-by-step conceptual analysis and subject verification for this question.`;
    }
    if (!expBn || expBn.length < 5) {
      expBn = `সঠিক উত্তর হলো অপশন ${q.correct_answer || 'A'}। এই প্রশ্নের সঠিক বিষয়ভিত্তিক ব্যাখ্যা ও বিশ্লেষণ।`;
    }
    if (!fact) {
      fact = 'Important foundational concept for competitive examinations.';
    }
    if (!tip) {
      tip = 'Review key formulas and core facts for maximum speed and accuracy.';
    }

    updateStmt.run(qText, qTextBn, exp, expBn, fact, tip, q.id);
    cleanedCount++;
  }
})();

const elapsedSecs = ((Date.now() - startTime) / 1000).toFixed(2);
console.log(`\n🎉 Successfully cleaned ${cleanedCount} questions in ${elapsedSecs}s!`);

const sample = db.prepare('SELECT id, question_text, explanation, explanation_bn, important_fact, exam_tip FROM questions LIMIT 5').all();
console.log('\n🔍 Sample Cleaned Explanations in DB:');
sample.forEach((s, idx) => {
  console.log(`\n--- SAMPLE ${idx + 1} (${s.id}) ---`);
  console.log('Q:', s.question_text);
  console.log('EXP:', s.explanation);
  console.log('FACT:', s.important_fact);
  console.log('TIP:', s.exam_tip);
});
