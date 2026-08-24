import Database from 'better-sqlite3';
const db = new Database('data/wb_decoded.sqlite');

console.log('=== EXAMS ===');
console.table(db.prepare('SELECT id, name, slug, authority FROM exams').all());

console.log('\n=== PYQ METADATA SUMMARY ===');
const pyqMeta = db.prepare(`
  SELECT exam_id, exam_year, count(*) as count 
  FROM pyq_metadata 
  GROUP BY exam_id, exam_year 
  ORDER BY exam_id, exam_year DESC
`).all();
console.table(pyqMeta);

console.log('\n=== MOCK TESTS SUMMARY BY TYPE ===');
console.table(db.prepare('SELECT mock_type, count(*) as count FROM mock_tests GROUP BY mock_type').all());

console.log('\n=== SAMPLE PYQ MOCK TESTS ===');
const pyqMocks = db.prepare("SELECT id, exam_id, title, mock_type, total_questions, duration_mins FROM mock_tests WHERE mock_type = 'pyq' OR title LIKE '%PYQ%' OR title LIKE '%20%' LIMIT 20").all();
console.table(pyqMocks);
