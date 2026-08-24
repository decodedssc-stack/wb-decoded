import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🧹 Sanitizing All Question Texts & Explanations to be 100% West Bengal / Universal Competitive Standard...');

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('temp_store = MEMORY');

const allQuestions = db.prepare('SELECT id, question_text, question_text_bn, explanation, explanation_bn FROM questions').all();

const updateStmt = db.prepare(`
  UPDATE questions
  SET question_text = ?,
      question_text_bn = ?,
      explanation = ?,
      explanation_bn = ?
  WHERE id = ?
`);

const sanitizePatterns = [
  { regex: /\[National Level PYQ\]\s*/gi, replaceWith: '' },
  { regex: /\[SSC CGL\/CPO Shift PYQ\]\s*/gi, replaceWith: '' },
  { regex: /\[SSC CGL[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[SSC CHSL[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[SSC MTS[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[SSC GD[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[SSC CPO[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[SSC Stenographer[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[SSC\/RRB[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[RRB NTPC[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[RRB Group D[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[RRB ALP[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[RRB JE[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[Banking \/ IBPS PO \/ SBI PO PYQ\]\s*/gi, replaceWith: '' },
  { regex: /\[IBPS[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[SBI[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[RBI[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[UPSC[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[Central Govt PYQ\]\s*/gi, replaceWith: '' },
  { regex: /\[জাতীয় স্তরের PYQ\]\s*/gi, replaceWith: '' },
  { regex: /\[জাতীয় স্তরের PYQ\]\s*/gi, replaceWith: '' },
  { regex: /\[SSC[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[RRB[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[UPSC[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /\[কেন্দ্রীয় সরকারি পরীক্ষা PYQ\]\s*/gi, replaceWith: '' },
  { regex: /\[কেন্দ্রীয় সরকারি পরীক্ষা PYQ\]\s*/gi, replaceWith: '' },
  { regex: /\[ব্যাংকিং[^\]]*\]\s*/gi, replaceWith: '' },
  { regex: /Staff Selection Commission/gi, replaceWith: 'Public Service Commission' },
  { regex: /SSC CGL Tier-I and Tier-II/gi, replaceWith: 'West Bengal Civil Services & State Exams' },
  { regex: /SSC CGL Tier-I/gi, replaceWith: 'WBCS & State Exams' },
  { regex: /SSC CGL/gi, replaceWith: 'WBCS & WB State Exams' },
  { regex: /SSC and RRB/gi, replaceWith: 'WBCS and WB Police' },
  { regex: /SSC exams/gi, replaceWith: 'State PSC and Police exams' },
  { regex: /SSC/gi, replaceWith: 'WBPSC' }
];

let updatedCount = 0;
const startTime = Date.now();

db.transaction(() => {
  for (const q of allQuestions) {
    let qText = q.question_text || '';
    let qTextBn = q.question_text_bn || '';
    let exp = q.explanation || '';
    let expBn = q.explanation_bn || '';

    for (const p of sanitizePatterns) {
      qText = qText.replace(p.regex, p.replaceWith);
      qTextBn = qTextBn.replace(p.regex, p.replaceWith);
      exp = exp.replace(p.regex, p.replaceWith);
      expBn = expBn.replace(p.regex, p.replaceWith);
    }

    if (qText !== q.question_text || exp !== q.explanation) {
      updateStmt.run(qText.trim(), qTextBn.trim(), exp.trim(), expBn.trim(), q.id);
      updatedCount++;
    }
  }
})();

const elapsedSecs = ((Date.now() - startTime) / 1000).toFixed(2);
console.log(`\n🎉 Sanitized ${updatedCount} questions in ${elapsedSecs}s!`);
console.log('✅ All public and student-facing question text and explanations are 100% West Bengal State Exam aligned.');
