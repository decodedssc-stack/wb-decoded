import Database from 'better-sqlite3';
const db = new Database('data/wb_decoded.sqlite');

const totalQ = db.prepare('SELECT count(*) as count FROM questions').get();
console.log('Total questions in DB:', totalQ.count);

const pyqMetaCount = db.prepare('SELECT count(*) as count FROM pyq_metadata').get();
console.log('Total entries in pyq_metadata:', pyqMetaCount.count);

const pyqYears = db.prepare(`
  SELECT exam_year, count(*) as count 
  FROM pyq_metadata 
  GROUP BY exam_year 
  ORDER BY exam_year DESC
`).all();
console.log('\nPYQ counts by year in pyq_metadata:');
console.table(pyqYears);

const pyqByExam = db.prepare(`
  SELECT e.name, p.exam_id, count(DISTINCT p.exam_year) as years_count, count(*) as q_count
  FROM pyq_metadata p
  JOIN exams e ON p.exam_id = e.id
  GROUP BY p.exam_id
  ORDER BY q_count DESC
`).all();
console.log('\nPYQ counts by exam in pyq_metadata:');
console.table(pyqByExam);

// Check if any existing mock tests are type 'pyq' or 'Previous-Year'
const pyqMocks = db.prepare("SELECT id, exam_id, title, mock_type, total_questions FROM mock_tests WHERE mock_type LIKE '%pyq%' OR mock_type LIKE '%prev%' OR title LIKE '%20%'").all();
console.log('\nExisting PYQ mock tests:', pyqMocks.length);
