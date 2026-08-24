import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 CHECKING DUPLICATE QUESTION TEXTS IN `questions` TABLE...');

const dupTexts = db.prepare(`
  SELECT subject_id, question_text, COUNT(*) as cnt 
  FROM questions 
  GROUP BY question_text 
  HAVING COUNT(*) > 1
  ORDER BY cnt DESC
`).all();

console.log(`Total duplicated question texts in table: ${dupTexts.length}`);
dupTexts.forEach((d, i) => {
  console.log(`${i + 1}. [${d.subject_id}] (${d.cnt}x): "${d.question_text.substring(0, 80)}..."`);
});
