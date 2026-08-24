import Database from 'better-sqlite3';
const db = new Database('data/wb_decoded.sqlite');

const wbExams = db.prepare(`
  SELECT id, name, slug, authority 
  FROM exams 
  WHERE id LIKE 'exam-wb%' OR id LIKE 'exam-food%' OR id LIKE 'exam-clerk%' OR id LIKE 'exam-kp%' OR id LIKE 'exam-mscwb%'
`).all();

console.log('West Bengal Exams list:');
console.table(wbExams);

const wbMocks = db.prepare(`
  SELECT m.id, m.title, m.exam_id, m.duration_mins, m.total_questions, m.total_marks
  FROM mock_tests m
  WHERE m.mock_type = 'Previous-Year' 
    AND (m.exam_id LIKE 'exam-wb%' OR m.exam_id LIKE 'exam-food%' OR m.exam_id LIKE 'exam-clerk%' OR m.exam_id LIKE 'exam-kp%' OR m.exam_id LIKE 'exam-mscwb%')
  ORDER BY m.exam_id, m.title DESC
`).all();

console.log(`\nTotal WB Previous-Year Mocks: ${wbMocks.length}`);
console.log('Sample WB Mocks:', wbMocks.slice(0, 5));
