import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 SCANNING FOR ANY OTHER QUESTIONS WITH QUOTED CHAPTER NAMES OR SYNTHETIC PHRASING...');

const allQs = db.prepare('SELECT id, subject_id, question_text, option_a, option_b, option_c, option_d, correct_answer FROM questions').all();

const flagged = [];

allQs.forEach(q => {
  const text = q.question_text || '';
  // Check if question text has quotes with ':' or '&' or 'Regarding the historic significance'
  if (
    (text.includes('"') && (text.includes(':') || text.includes('&') || text.includes('('))) ||
    text.includes('Regarding the historic significance') ||
    text.includes('Under the Indian Constitutional framework, what is the significance') ||
    text.includes('Under the Constitution of India, which institutional mandate') ||
    text.includes('Which Constitutional Article, Schedule, or Supreme Court doctrine is directly related') ||
    text.includes('Which important session, leader, or movement during the Freedom Struggle is commemorated') ||
    text.includes('Which significant event or movement in Bengal') ||
    text.includes('Who among the following leaders played a pioneering role in the historic events surrounding')
  ) {
    flagged.push(q);
  }
});

console.log(`Found ${flagged.length} questions matching synthetic template patterns.`);
flagged.forEach(f => console.log(`[${f.id}] (${f.subject_id}): ${f.question_text}\n`));
