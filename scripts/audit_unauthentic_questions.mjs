import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 DEEP AUDIT FOR ALL UNAUTHENTIC, SYNTHETIC, OR BOILERPLATE QUESTIONS...');

const allQuestions = db.prepare('SELECT id, subject_id, chapter_id, question_text, option_a, option_b, option_c, option_d, correct_answer FROM questions').all();

console.log(`Total questions in database: ${allQuestions.length}`);

const suspicious = [];

allQuestions.forEach(q => {
  const t = (q.question_text || '').toLowerCase();
  const a = (q.option_a || '').toLowerCase();
  const b = (q.option_b || '').toLowerCase();
  const c = (q.option_c || '').toLowerCase();
  const d = (q.option_d || '').toLowerCase();

  let reason = null;

  if (t.includes('perspective') || t.includes('directly linked to') || t.includes('is governed by')) {
    reason = 'Generic perspective template';
  } else if (a.includes('alternative') || b.includes('alternative') || c.includes('alternative') || d.includes('alternative')) {
    reason = 'Placeholder alternative options';
  } else if (a.includes('governed by standard') || b.includes('governed by standard') || c.includes('governed by standard') || d.includes('governed by standard')) {
    reason = 'Boilerplate options template';
  } else if (a.includes('violates the universal') || b.includes('violates the universal') || c.includes('violates the universal') || d.includes('violates the universal')) {
    reason = 'Boilerplate physics/science option';
  } else if (a.includes('absence of gravitational') || b.includes('absence of gravitational') || c.includes('absence of gravitational') || d.includes('absence of gravitational')) {
    reason = 'Boilerplate gravity option';
  } else if (a.includes('no application in medical') || b.includes('no application in medical') || c.includes('no application in medical') || d.includes('no application in medical')) {
    reason = 'Boilerplate application option';
  } else if (t.includes('essential concept tested frequently') || t.includes('core concept of')) {
    reason = 'Generic meta text';
  } else if (t.length < 15) {
    reason = 'Too short / truncated';
  } else if (a === b || a === c || a === d || b === c || b === d || c === d) {
    reason = 'Duplicate option texts';
  } else if (a.length < 1 || b.length < 1 || c.length < 1 || d.length < 1) {
    reason = 'Empty options';
  }

  if (reason) {
    suspicious.push({ id: q.id, subject_id: q.subject_id, text: q.question_text, reason, a: q.option_a, b: q.option_b, c: q.option_c, d: q.option_d });
  }
});

console.log(`\nFound ${suspicious.length} suspicious/unauthentic questions!`);
suspicious.forEach((s, idx) => {
  console.log(`\n${idx + 1}. [${s.id}] (${s.subject_id}) - Reason: ${s.reason}`);
  console.log(`   Q: ${s.text}`);
  console.log(`   A: ${s.a}`);
  console.log(`   B: ${s.b}`);
  console.log(`   C: ${s.c}`);
  console.log(`   D: ${s.d}`);
});
