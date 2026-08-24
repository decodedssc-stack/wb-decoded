import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 ANALYZING ALL 233 SYNTHETIC TEMPLATE QUESTIONS...');

const syntheticQs = db.prepare(`
  SELECT id, subject_id, chapter_id, question_text, option_a, option_b, option_c, option_d, correct_answer 
  FROM questions 
  WHERE question_text LIKE '%perspective%' 
     OR question_text LIKE '%directly linked to%' 
     OR option_a LIKE '%governed by standard%'
     OR option_a LIKE '%Alternative%'
     OR option_d LIKE '%Alternative%'
     OR option_a LIKE '%violates the universal%'
     OR option_a LIKE '%absence of gravitational%'
     OR question_text LIKE '%Regarding the historic significance%'
     OR question_text LIKE '%Under the Indian Constitutional framework, what is the significance%'
     OR question_text LIKE '%Under the Constitution of India, which institutional mandate%'
     OR question_text LIKE '%Which Constitutional Article, Schedule, or Supreme Court doctrine is directly related%'
     OR question_text LIKE '%Which important session, leader, or movement during the Freedom Struggle is commemorated%'
     OR question_text LIKE '%Which significant event or movement in Bengal%'
     OR question_text LIKE '%Who among the following leaders played a pioneering role in the historic events surrounding%'
`).all();

console.log(`Total count: ${syntheticQs.length}`);

// Group by subject
const bySubject = {};
syntheticQs.forEach(q => {
  bySubject[q.subject_id] = (bySubject[q.subject_id] || 0) + 1;
});
console.log('Breakdown by Subject:', bySubject);

console.log('\nSample 15 questions:');
syntheticQs.slice(0, 15).forEach((q, i) => {
  console.log(`\n${i + 1}. [${q.id}] (${q.subject_id})`);
  console.log(`   Q: ${q.question_text}`);
  console.log(`   A: ${q.option_a}`);
  console.log(`   B: ${q.option_b}`);
  console.log(`   C: ${q.option_c}`);
  console.log(`   D: ${q.option_d}`);
  console.log(`   Correct: ${q.correct_answer}`);
});
