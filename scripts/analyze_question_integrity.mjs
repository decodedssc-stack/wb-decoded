import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 ANALYZING QUESTIONS TABLE INTEGRITY...');

const totalQ = db.prepare('SELECT count(*) as c FROM questions').get().c;
console.log(`Total questions in questions table: ${totalQ}`);

const allQuestions = db.prepare('SELECT id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, subject_id FROM questions').all();

const textMap = new Map();
const duplicates = [];
const truncated = [];

for (const q of allQuestions) {
  const norm = (q.question_text || '').toLowerCase().trim();
  if (textMap.has(norm)) {
    duplicates.push({ id: q.id, firstId: textMap.get(norm), text: q.question_text });
  } else {
    textMap.set(norm, q.id);
  }

  // Check truncated questions
  if (q.question_text.endsWith('as the?') || q.question_text.endsWith('slogan?') || q.question_text.length < 20) {
    truncated.push({ id: q.id, text: q.question_text, a: q.option_a, b: q.option_b, c: q.option_c, d: q.option_d, ans: q.correct_answer, exp: q.explanation });
  }
}

console.log(`Unique Question Texts: ${textMap.size}`);
console.log(`Duplicate Question Texts in table: ${duplicates.length}`);
console.log(`Truncated Questions found: ${truncated.length}`);

console.log('\nSample Truncated Questions:');
console.log(JSON.stringify(truncated.slice(0, 10), null, 2));

// Check subjects breakdown in questions
const subjectBreakdown = db.prepare(`
  SELECT subject_id, count(*) as count 
  FROM questions 
  GROUP BY subject_id
`).all();
console.log('\nSubject Breakdown in questions:');
console.log(JSON.stringify(subjectBreakdown, null, 2));
