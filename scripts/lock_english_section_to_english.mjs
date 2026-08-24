import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔒 Locking all English Section questions to English language permanently...');

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('temp_store = MEMORY');

// Find all English questions by subject_id or chapter_id
const updateEngStmt = db.prepare(`
  UPDATE questions
  SET question_text_bn = question_text,
      option_a_bn = option_a,
      option_b_bn = option_b,
      option_c_bn = option_c,
      option_d_bn = option_d
  WHERE subject_id = 'sub-eng' 
     OR chapter_id LIKE 'chap-eng%' 
     OR id LIKE '%-eng-%'
`);

const result = updateEngStmt.run();
console.log(`✅ Successfully updated and locked ${result.changes.toLocaleString()} English section questions strictly to English!`);

// Verify sample English question in DB
const sampleEng = db.prepare(`
  SELECT id, question_text, question_text_bn, option_a, option_a_bn, correct_answer, explanation
  FROM questions
  WHERE subject_id = 'sub-eng'
  LIMIT 3
`).all();

console.log('\n🔍 SAMPLE ENGLISH QUESTIONS IN DATABASE:');
for (const sq of sampleEng) {
  console.log(`\nID: ${sq.id}`);
  console.log(`Question (EN): ${sq.question_text}`);
  console.log(`Question (BN field): ${sq.question_text_bn}`);
  console.log(`Option A (EN): ${sq.option_a}`);
  console.log(`Option A (BN field): ${sq.option_a_bn}`);
  console.log(`Key: ${sq.correct_answer}`);
}
