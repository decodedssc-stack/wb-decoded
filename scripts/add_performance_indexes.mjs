import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('⚡ Adding High-Performance Database Indexes & Speed Pragmas...');

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('cache_size = -64000'); // 64MB Cache
db.pragma('temp_store = MEMORY');
db.pragma('mmap_size = 268435456'); // 256MB Memory-Mapped I/O

const indexes = [
  // Questions table indexes
  'CREATE INDEX IF NOT EXISTS idx_q_topic_id ON questions(topic_id);',
  'CREATE INDEX IF NOT EXISTS idx_q_chapter_id ON questions(chapter_id);',
  'CREATE INDEX IF NOT EXISTS idx_q_subject_id ON questions(subject_id);',
  'CREATE INDEX IF NOT EXISTS idx_q_exam_id ON questions(exam_id);',
  'CREATE INDEX IF NOT EXISTS idx_q_exam_pyq ON questions(exam_id, is_pyq);',
  'CREATE INDEX IF NOT EXISTS idx_q_difficulty ON questions(difficulty);',
  'CREATE INDEX IF NOT EXISTS idx_q_lifecycle ON questions(lifecycle_status);',
  
  // PYQ Metadata indexes
  'CREATE INDEX IF NOT EXISTS idx_pyq_question_id ON pyq_metadata(question_id);',
  'CREATE INDEX IF NOT EXISTS idx_pyq_exam_id ON pyq_metadata(exam_id);',
  'CREATE INDEX IF NOT EXISTS idx_pyq_exam_year ON pyq_metadata(exam_year);',
  
  // Mock questions & tests indexes
  'CREATE INDEX IF NOT EXISTS idx_mq_mock_id ON mock_questions(mock_id);',
  'CREATE INDEX IF NOT EXISTS idx_mq_question_id ON mock_questions(question_id);',
  'CREATE INDEX IF NOT EXISTS idx_mt_exam_id ON mock_tests(exam_id);',
  'CREATE INDEX IF NOT EXISTS idx_mt_type ON mock_tests(mock_type);',
  'CREATE INDEX IF NOT EXISTS idx_mt_published ON mock_tests(is_published);',
  
  // Hierarchy tree indexes
  'CREATE INDEX IF NOT EXISTS idx_top_chapter_id ON topics(chapter_id);',
  'CREATE INDEX IF NOT EXISTS idx_chap_subject_id ON chapters(subject_id);',
  'CREATE INDEX IF NOT EXISTS idx_exams_category_id ON exams(category_id);'
];

db.transaction(() => {
  for (const idxSql of indexes) {
    db.exec(idxSql);
  }
})();

// Run ANALYZE so SQLite optimizer knows exact statistical distributions
db.exec('ANALYZE;');

console.log('✅ 16 High-Performance Indexes Created and Analyzed.');
