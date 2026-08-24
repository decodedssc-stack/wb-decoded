import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 SCANNING FOR SYNTHETIC TEMPLATE QUESTIONS IN DATABASE...');

const templateQs = db.prepare(`
  SELECT id, subject_id, question_text, option_a, option_b, option_c, option_d, correct_answer
  FROM questions 
  WHERE question_text LIKE '%most directly linked to%' 
     OR option_a LIKE '%is governed by standard%'
     OR option_a LIKE '%It is governed by%'
     OR question_text LIKE '%From a general science%'
     OR question_text LIKE '%From an Indian%'
     OR question_text LIKE '%From a geographical%'
     OR question_text LIKE '%From a historical%'
     OR question_text LIKE '%From an economic%'
     OR question_text LIKE '%From a constitutional%'
`).all();

console.log(`Found ${templateQs.length} synthetic placeholder questions!`);
console.log('Sample:');
templateQs.slice(0, 10).forEach(q => {
  console.log(`[${q.id}] (${q.subject_id})`);
  console.log(`   Q: ${q.question_text}`);
  console.log(`   A: ${q.option_a}`);
  console.log(`   B: ${q.option_b}`);
  console.log(`   Correct: ${q.correct_answer}\n`);
});
