import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 Benchmarking Database Queries with Optimization Indexes...');

const measure = (name, fn) => {
  const start = performance.now();
  const res = fn();
  const end = performance.now();
  const time = (end - start).toFixed(2);
  console.log(`⏱️ ${name}: ${time}ms (Rows: ${Array.isArray(res) ? res.length : (res ? 1 : 0)})`);
};

measure('1. Fetch Active WB Categories', () => {
  return db.prepare("SELECT * FROM exam_categories WHERE id IN ('cat-wbpsc', 'cat-police', 'cat-teaching', 'cat-municipal') ORDER BY order_index ASC").all();
});

measure('2. Fetch Active WB Exams', () => {
  return db.prepare("SELECT e.*, c.name as category_name, c.slug as category_slug FROM exams e JOIN exam_categories c ON e.category_id = c.id WHERE e.is_active = 1 AND e.category_id IN ('cat-wbpsc', 'cat-police', 'cat-teaching', 'cat-municipal') ORDER BY c.order_index ASC").all();
});

measure('3. Fetch 6 Featured Full Mocks', () => {
  return db.prepare("SELECT * FROM mock_tests WHERE mock_type = 'Full-Length' AND is_published = 1 ORDER BY is_featured DESC, created_at DESC LIMIT 6").all();
});

measure('4. Fetch Daily Challenge Mock', () => {
  return db.prepare("SELECT * FROM mock_tests WHERE is_published = 1 LIMIT 1").get();
});

measure('5. Fetch Full Hierarchy (Subjects, Chapters, Topics)', () => {
  const subjects = db.prepare('SELECT * FROM subjects ORDER BY order_index ASC').all();
  const chapters = db.prepare('SELECT * FROM chapters ORDER BY order_index ASC').all();
  const topics = db.prepare('SELECT * FROM topics ORDER BY order_index ASC').all();
  return { subjects, chapters, topics };
});

measure('6. Sample 15 Questions for Daily Challenge (Indexed Range Sampling)', () => {
  const countObj = db.prepare('SELECT COUNT(*) as c FROM questions').get();
  const randomOffset = Math.floor(Math.random() * Math.max(1, countObj.c - 20));
  return db.prepare('SELECT id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation FROM questions LIMIT 15 OFFSET ?').all(randomOffset);
});
