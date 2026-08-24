import Database from 'better-sqlite3';
const db = new Database('data/wb_decoded.sqlite');

const mockId = 'mock-pyq-wbcs-exam-2025';
const mock = db.prepare(`
  SELECT m.*, e.name as exam_name, e.authority as authority, e.slug as exam_slug
  FROM mock_tests m
  JOIN exams e ON m.exam_id = e.id
  WHERE m.id = ? OR m.slug = ?
`).get(mockId, mockId);

console.log('Mock Details:', mock);

const questions = db.prepare(`
  SELECT q.id, q.question_text, q.correct_answer, mq.order_index, mq.section_name
  FROM mock_questions mq
  JOIN questions q ON mq.question_id = q.id
  WHERE mq.mock_id = ?
  ORDER BY mq.order_index ASC
  LIMIT 5
`).all(mock.id);

console.log(`\nSample Questions from ${mockId} (Total: ${mock.total_questions}):`);
console.table(questions);
