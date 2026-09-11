import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { seedDatabase } from './seedDatabase';

// Database file stored in project data directory
const dbDirectory = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

const dbPath = path.join(dbDirectory, 'wb_decoded.sqlite');
const dbGzPath = path.join(dbDirectory, 'wb_decoded.sqlite.gz');

// Auto-restore database from compressed bundle on Emergent or cloud environments
if ((!fs.existsSync(dbPath) || fs.statSync(dbPath).size === 0) && fs.existsSync(dbGzPath)) {
  try {
    console.log('📦 Restoring complete WB Decoded database from wb_decoded.sqlite.gz...');
    const compressed = fs.readFileSync(dbGzPath);
    const decompressed = zlib.gunzipSync(compressed);
    fs.writeFileSync(dbPath, decompressed);
    console.log(`✅ Database restored successfully (${(decompressed.length / (1024 * 1024)).toFixed(2)} MB).`);
  } catch (err) {
    console.error('⚠️ Failed to restore database from compressed bundle:', err);
  }
}

let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database(dbPath);
    // Extreme Performance Optimizations
    dbInstance.pragma('journal_mode = WAL');
    dbInstance.pragma('foreign_keys = ON');
    dbInstance.pragma('synchronous = NORMAL');
    dbInstance.pragma('cache_size = -64000'); // 64MB In-Memory Cache
    dbInstance.pragma('temp_store = MEMORY');
    dbInstance.pragma('mmap_size = 268435456'); // 256MB Memory-Mapped I/O

    const tableCount = dbInstance.prepare("SELECT count(*) as c FROM sqlite_master WHERE type='table' AND name='questions'").get() as { c: number };
    if (!tableCount || tableCount.c === 0) {
      initSchema(dbInstance);
      seedDatabase(dbInstance);
    }
  }
  return dbInstance;
}

export function initSchema(db: Database.Database) {
  db.exec(`
    -- 1. Users & Admins
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role TEXT DEFAULT 'student',
      avatar TEXT,
      phone TEXT,
      is_anonymous INTEGER DEFAULT 0,
      target_exam_id TEXT,
      streak_days INTEGER DEFAULT 1,
      xp_points INTEGER DEFAULT 150,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admins (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role TEXT DEFAULT 'Super Admin',
      status TEXT DEFAULT 'active',
      last_login_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 2. Exam Hierarchy
    CREATE TABLE IF NOT EXISTS exam_categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      icon TEXT,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS exams (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      authority TEXT NOT NULL,
      description TEXT,
      syllabus TEXT,
      official_website TEXT,
      notification_url TEXT,
      icon TEXT,
      banner TEXT,
      color_theme TEXT DEFAULT '#1E3A8A',
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(category_id) REFERENCES exam_categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS stages (
      id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL,
      name TEXT NOT NULL,
      order_index INTEGER DEFAULT 0,
      FOREIGN KEY(exam_id) REFERENCES exams(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS papers (
      id TEXT PRIMARY KEY,
      stage_id TEXT NOT NULL,
      name TEXT NOT NULL,
      code TEXT,
      order_index INTEGER DEFAULT 0,
      FOREIGN KEY(stage_id) REFERENCES stages(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS subjects (
      id TEXT PRIMARY KEY,
      paper_id TEXT,
      name TEXT NOT NULL,
      code TEXT,
      icon TEXT,
      color TEXT DEFAULT '#3B82F6',
      order_index INTEGER DEFAULT 0,
      FOREIGN KEY(paper_id) REFERENCES papers(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS chapters (
      id TEXT PRIMARY KEY,
      subject_id TEXT NOT NULL,
      name TEXT NOT NULL,
      order_index INTEGER DEFAULT 0,
      FOREIGN KEY(subject_id) REFERENCES subjects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS topics (
      id TEXT PRIMARY KEY,
      chapter_id TEXT NOT NULL,
      name TEXT NOT NULL,
      order_index INTEGER DEFAULT 0,
      FOREIGN KEY(chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS subtopics (
      id TEXT PRIMARY KEY,
      topic_id TEXT NOT NULL,
      name TEXT NOT NULL,
      order_index INTEGER DEFAULT 0,
      FOREIGN KEY(topic_id) REFERENCES topics(id) ON DELETE CASCADE
    );

    -- 3. Exam Pattern Builder
    CREATE TABLE IF NOT EXISTS exam_patterns (
      id TEXT PRIMARY KEY,
      exam_id TEXT NOT NULL,
      stage_id TEXT,
      paper_id TEXT,
      year_effective INTEGER DEFAULT 2024,
      total_questions INTEGER DEFAULT 100,
      total_marks REAL DEFAULT 100,
      duration_mins INTEGER DEFAULT 90,
      marks_per_correct REAL DEFAULT 1.0,
      negative_marking REAL DEFAULT 0.33,
      passing_marks REAL DEFAULT 40.0,
      section_timing_enabled INTEGER DEFAULT 0,
      pyq_allowed INTEGER DEFAULT 1,
      current_affairs_allowed INTEGER DEFAULT 1,
      subject_distribution_json TEXT,
      difficulty_distribution_json TEXT,
      duplicate_policy TEXT DEFAULT 'no_repeat',
      is_active INTEGER DEFAULT 1,
      FOREIGN KEY(exam_id) REFERENCES exams(id) ON DELETE CASCADE
    );

    -- 4. Question Bank
    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      question_text TEXT NOT NULL,
      question_text_bn TEXT,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      option_a_bn TEXT,
      option_b_bn TEXT,
      option_c_bn TEXT,
      option_d_bn TEXT,
      correct_answer TEXT NOT NULL,
      explanation TEXT NOT NULL,
      explanation_bn TEXT,
      short_explanation TEXT,
      important_fact TEXT,
      exam_tip TEXT,
      exam_id TEXT,
      stage_id TEXT,
      paper_id TEXT,
      subject_id TEXT,
      chapter_id TEXT,
      topic_id TEXT,
      subtopic_id TEXT,
      question_type TEXT DEFAULT 'MCQ',
      difficulty TEXT DEFAULT 'Moderate',
      language TEXT DEFAULT 'Bilingual',
      tags TEXT,
      is_pyq INTEGER DEFAULT 0,
      quality_score REAL DEFAULT 88.0,
      confidence_score REAL DEFAULT 92.0,
      duplicate_score REAL DEFAULT 0.0,
      report_count INTEGER DEFAULT 0,
      attempt_count INTEGER DEFAULT 0,
      correct_count INTEGER DEFAULT 0,
      avg_time_secs REAL DEFAULT 45.0,
      lifecycle_status TEXT DEFAULT 'Approved',
      verification_status TEXT DEFAULT 'Verified',
      last_verified_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(exam_id) REFERENCES exams(id) ON DELETE SET NULL,
      FOREIGN KEY(subject_id) REFERENCES subjects(id) ON DELETE SET NULL,
      FOREIGN KEY(topic_id) REFERENCES topics(id) ON DELETE SET NULL
    );

    -- 5. PYQ Metadata
    CREATE TABLE IF NOT EXISTS pyq_metadata (
      id TEXT PRIMARY KEY,
      question_id TEXT UNIQUE NOT NULL,
      exam_id TEXT NOT NULL,
      exam_year INTEGER NOT NULL,
      exam_date TEXT,
      paper_name TEXT,
      shift TEXT,
      question_num INTEGER,
      source_name TEXT,
      source_url TEXT,
      source_doc TEXT,
      import_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE,
      FOREIGN KEY(exam_id) REFERENCES exams(id) ON DELETE CASCADE
    );

    -- 6. Mock Tests & Sets
    CREATE TABLE IF NOT EXISTS mock_tests (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      title_bn TEXT,
      slug TEXT UNIQUE NOT NULL,
      exam_id TEXT NOT NULL,
      stage_id TEXT,
      paper_id TEXT,
      mock_type TEXT DEFAULT 'Full Length',
      duration_mins INTEGER DEFAULT 120,
      total_marks REAL DEFAULT 200,
      total_questions INTEGER DEFAULT 100,
      marks_per_correct REAL DEFAULT 1.0,
      negative_marking REAL DEFAULT 0.33,
      pass_marks REAL,
      difficulty TEXT DEFAULT 'Mixed',
      pyq_ratio REAL DEFAULT 0.3,
      is_published INTEGER DEFAULT 1,
      is_featured INTEGER DEFAULT 0,
      is_premium INTEGER DEFAULT 0,
      attempt_count INTEGER DEFAULT 0,
      avg_score REAL DEFAULT 0,
      metadata_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(exam_id) REFERENCES exams(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS mock_questions (
      id TEXT PRIMARY KEY,
      mock_id TEXT NOT NULL,
      question_id TEXT NOT NULL,
      order_index INTEGER NOT NULL,
      section_name TEXT DEFAULT 'General Studies',
      marks REAL DEFAULT 1.0,
      negative_marks REAL DEFAULT 0.33,
      FOREIGN KEY(mock_id) REFERENCES mock_tests(id) ON DELETE CASCADE,
      FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE
    );

    -- 7. Test Attempts & Results
    CREATE TABLE IF NOT EXISTS test_attempts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      mock_id TEXT NOT NULL,
      exam_id TEXT,
      started_at DATETIME NOT NULL,
      completed_at DATETIME,
      score REAL DEFAULT 0,
      accuracy REAL DEFAULT 0,
      total_correct INTEGER DEFAULT 0,
      total_wrong INTEGER DEFAULT 0,
      total_skipped INTEGER DEFAULT 0,
      total_marked INTEGER DEFAULT 0,
      time_spent_secs INTEGER DEFAULT 0,
      rank INTEGER DEFAULT 1,
      percentile REAL DEFAULT 50.0,
      status TEXT DEFAULT 'completed',
      subject_breakdown_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(mock_id) REFERENCES mock_tests(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS attempt_answers (
      id TEXT PRIMARY KEY,
      attempt_id TEXT NOT NULL,
      question_id TEXT NOT NULL,
      selected_option TEXT,
      correct_answer TEXT NOT NULL,
      is_correct INTEGER DEFAULT 0,
      time_spent_secs INTEGER DEFAULT 0,
      is_marked_for_review INTEGER DEFAULT 0,
      FOREIGN KEY(attempt_id) REFERENCES test_attempts(id) ON DELETE CASCADE,
      FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE
    );

    -- 8. Mistake Book & Weak Areas
    CREATE TABLE IF NOT EXISTS mistake_book (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      question_id TEXT NOT NULL,
      mistake_type TEXT DEFAULT 'Concept gap',
      status TEXT DEFAULT 'Need Revision',
      notes TEXT,
      review_count INTEGER DEFAULT 0,
      last_reviewed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS weak_areas (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      exam_id TEXT NOT NULL,
      subject_id TEXT NOT NULL,
      topic_id TEXT NOT NULL,
      total_attempted INTEGER DEFAULT 0,
      correct_count INTEGER DEFAULT 0,
      accuracy_pct REAL DEFAULT 0.0,
      avg_speed_secs REAL DEFAULT 0.0,
      recommendation_note TEXT,
      last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY(exam_id) REFERENCES exams(id) ON DELETE CASCADE,
      FOREIGN KEY(subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
      FOREIGN KEY(topic_id) REFERENCES topics(id) ON DELETE CASCADE
    );

    -- 9. Sources, Automations & Audits
    CREATE TABLE IF NOT EXISTS source_registry (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      website TEXT,
      url TEXT NOT NULL,
      authority TEXT NOT NULL,
      source_type TEXT DEFAULT 'Official Portal',
      tier TEXT DEFAULT 'Tier 1',
      license_status TEXT DEFAULT 'Public / Official Access',
      reliability_score REAL DEFAULT 95.0,
      last_checked DATETIME,
      last_successful_import DATETIME,
      is_enabled INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS automation_runs (
      id TEXT PRIMARY KEY,
      job_name TEXT NOT NULL,
      job_type TEXT NOT NULL,
      started_at DATETIME NOT NULL,
      completed_at DATETIME,
      duration_secs REAL,
      status TEXT DEFAULT 'Success',
      items_found INTEGER DEFAULT 0,
      items_processed INTEGER DEFAULT 0,
      items_failed INTEGER DEFAULT 0,
      items_requiring_review INTEGER DEFAULT 0,
      log_summary TEXT,
      error_details TEXT
    );

    CREATE TABLE IF NOT EXISTS question_reports (
      id TEXT PRIMARY KEY,
      question_id TEXT NOT NULL,
      user_id TEXT,
      reason TEXT NOT NULL,
      comment TEXT,
      status TEXT DEFAULT 'Pending',
      admin_notes TEXT,
      resolved_by TEXT,
      resolved_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      admin_name TEXT NOT NULL,
      admin_role TEXT DEFAULT 'Super Admin',
      action TEXT NOT NULL,
      target_entity TEXT,
      target_id TEXT,
      details TEXT,
      old_value TEXT,
      new_value TEXT,
      ip_address TEXT DEFAULT '127.0.0.1',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS exam_updates (
      id TEXT PRIMARY KEY,
      exam_id TEXT,
      title TEXT NOT NULL,
      source_url TEXT,
      authority TEXT,
      update_type TEXT DEFAULT 'Notification',
      description TEXT,
      detected_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_acknowledged INTEGER DEFAULT 0,
      status TEXT DEFAULT 'New',
      FOREIGN KEY(exam_id) REFERENCES exams(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS daily_challenges (
      id TEXT PRIMARY KEY,
      date_str TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      exam_id TEXT,
      question_count INTEGER DEFAULT 15,
      duration_mins INTEGER DEFAULT 15,
      questions_json TEXT,
      total_participants INTEGER DEFAULT 0,
      avg_score REAL DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS current_affairs_items (
      id TEXT PRIMARY KEY,
      headline TEXT NOT NULL,
      category TEXT NOT NULL,
      event_date TEXT,
      summary TEXT,
      key_facts TEXT,
      question_id TEXT,
      source_name TEXT,
      source_url TEXT,
      is_processed INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 10. Indexes for Fast Querying
    CREATE INDEX IF NOT EXISTS idx_questions_exam ON questions(exam_id);
    CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject_id);
    CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id);
    CREATE INDEX IF NOT EXISTS idx_questions_status ON questions(lifecycle_status, verification_status);
    CREATE INDEX IF NOT EXISTS idx_questions_pyq ON questions(is_pyq);
    CREATE INDEX IF NOT EXISTS idx_mock_exam ON mock_tests(exam_id, is_published);
    CREATE INDEX IF NOT EXISTS idx_attempts_user ON test_attempts(user_id);
    CREATE INDEX IF NOT EXISTS idx_mistakes_user ON mistake_book(user_id, status);
    CREATE INDEX IF NOT EXISTS idx_weak_areas_user ON weak_areas(user_id);
    CREATE INDEX IF NOT EXISTS idx_pyq_year ON pyq_metadata(exam_id, exam_year);
  `);
}

export default getDb;
