import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'data', 'wb_decoded.sqlite'));

const mocks = db.prepare(`
  SELECT exam_id, count(*) as total_mocks 
  FROM mock_tests 
  WHERE exam_id LIKE '%ssc%' OR exam_id LIKE '%rrb%' 
  GROUP BY exam_id
`).all();

console.log('--- Mock Tests count per SSC & RRB Exam ---');
console.table(mocks);
