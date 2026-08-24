import Database from 'better-sqlite3';
const db = new Database('data/wb_decoded.sqlite');

console.log('=== EXAMS ===');
console.table(db.prepare('SELECT id, name, slug, total_mocks, total_questions FROM exams').all());

console.log('\n=== PYQ QUESTIONS COUNT BY EXAM & YEAR ===');
const pyqCounts = db.prepare('SELECT exam_id, pyq_year, count(*) as count FROM questions WHERE is_pyq = 1 GROUP BY exam_id, pyq_year ORDER BY exam_id, pyq_year DESC').all();
console.table(pyqCounts);

console.log('\n=== TOTAL QUESTIONS WITH IS_PYQ = 1 ===');
const totalPyq = db.prepare('SELECT count(*) as count FROM questions WHERE is_pyq = 1').get();
console.log(totalPyq);

console.log('\n=== TOTAL QUESTIONS IN DB ===');
const totalQ = db.prepare('SELECT count(*) as count FROM questions').get();
console.log(totalQ);

console.log('\n=== MOCK TESTS COUNT BY TYPE ===');
console.table(db.prepare('SELECT type, count(*) as count FROM mock_tests GROUP BY type').all());

console.log('\n=== EXISTING PYQ MOCKS IN mock_tests ===');
const pyqMocks = db.prepare("SELECT id, exam_id, title, year, total_questions, duration_mins FROM mock_tests WHERE type = 'pyq' OR title LIKE '%PYQ%' OR title LIKE '%Previous%' LIMIT 30").all();
console.table(pyqMocks);
