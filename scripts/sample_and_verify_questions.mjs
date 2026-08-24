import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 SAMPLING 30 QUESTIONS FROM DATABASE...');

const sample = db.prepare(`
  SELECT id, subject_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation 
  FROM questions 
  ORDER BY RANDOM() 
  LIMIT 30
`).all();

sample.forEach((q, i) => {
  console.log(`\n[${i+1}] (${q.subject_id}) [${q.id}]`);
  console.log(`Q: ${q.question_text}`);
  console.log(`A: ${q.option_a}`);
  console.log(`B: ${q.option_b}`);
  console.log(`C: ${q.option_c}`);
  console.log(`D: ${q.option_d}`);
  const ansKey = q.correct_answer;
  const ansText = q[`option_${ansKey.toLowerCase()}`];
  console.log(`Ans: [${ansKey}] -> "${ansText}"`);
  console.log(`Exp: ${q.explanation}`);
});
