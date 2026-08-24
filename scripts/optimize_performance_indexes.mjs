import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('⚡ Accelerating Database Performance with Composite Indexes & Caching Optimizations...');

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('temp_store = MEMORY');
db.pragma('cache_size = -128000'); // 128MB In-Memory Cache
db.pragma('mmap_size = 536870912'); // 512MB Memory-Mapped I/O

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(t => t.name);
console.log('Existing Tables:', tables.join(', '));

const indexes = [
  { table: 'questions', sql: 'CREATE INDEX IF NOT EXISTS idx_questions_exam_pyq ON questions (exam_id, is_pyq)' },
  { table: 'questions', sql: 'CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions (subject_id)' },
  { table: 'questions', sql: 'CREATE INDEX IF NOT EXISTS idx_questions_chapter ON questions (chapter_id)' },
  { table: 'questions', sql: 'CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions (topic_id)' },
  { table: 'questions', sql: 'CREATE INDEX IF NOT EXISTS idx_questions_lifecycle ON questions (lifecycle_status)' },
  { table: 'questions', sql: 'CREATE INDEX IF NOT EXISTS idx_questions_type_diff ON questions (question_type, difficulty)' },
  { table: 'mock_questions', sql: 'CREATE INDEX IF NOT EXISTS idx_mock_questions_mock_id ON mock_questions (mock_id)' },
  { table: 'mock_questions', sql: 'CREATE INDEX IF NOT EXISTS idx_mock_questions_question_id ON mock_questions (question_id)' },
  { table: 'mock_tests', sql: 'CREATE INDEX IF NOT EXISTS idx_mock_tests_exam_pub ON mock_tests (exam_id, is_published)' },
  { table: 'mock_tests', sql: 'CREATE INDEX IF NOT EXISTS idx_mock_tests_type_pub ON mock_tests (mock_type, is_published)' },
  { table: 'mock_tests', sql: 'CREATE INDEX IF NOT EXISTS idx_mock_tests_featured ON mock_tests (is_featured, created_at)' },
  { table: 'pyq_metadata', sql: 'CREATE INDEX IF NOT EXISTS idx_pyq_metadata_exam ON pyq_metadata (exam_id, exam_year)' },
  { table: 'weak_areas', sql: 'CREATE INDEX IF NOT EXISTS idx_weak_areas_user ON weak_areas (user_id, accuracy_pct)' },
  { table: 'exam_categories', sql: 'CREATE INDEX IF NOT EXISTS idx_exam_categories_order ON exam_categories (order_index)' },
  { table: 'exams', sql: 'CREATE INDEX IF NOT EXISTS idx_exams_category_active ON exams (category_id, is_active)' }
];

for (const idx of indexes) {
  if (tables.includes(idx.table)) {
    db.exec(idx.sql);
    console.log(`   ✓ ${idx.sql.split(' ')[5]} on ${idx.table}`);
  }
}

console.log('⚡ Running SQLite ANALYZE for query planner optimization...');
db.exec('ANALYZE');

console.log('✅ Performance Indexes successfully built and analyzed!');
