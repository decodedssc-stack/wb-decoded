import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'data', 'wb_decoded.sqlite'));

const sscRrbExams = db.prepare(`SELECT id, name, category_id, authority FROM exams WHERE id LIKE '%ssc%' OR id LIKE '%rrb%'`).all();
console.log('--- Current SSC & RRB Exams ---');
console.table(sscRrbExams);

const sscRrbCounts = db.prepare(`
  SELECT exam_id, count(*) as total_questions 
  FROM questions 
  WHERE exam_id LIKE '%ssc%' OR exam_id LIKE '%rrb%' 
  GROUP BY exam_id
`).all();
console.log('--- Current Questions per SSC & RRB Exam ---');
console.table(sscRrbCounts);
