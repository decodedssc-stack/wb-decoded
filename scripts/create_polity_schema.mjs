import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ CREATING INDIAN POLITY COURSE DATABASE SCHEMA...');

db.exec(`
  -- 1. Playlist Video Tracking Table
  CREATE TABLE IF NOT EXISTS polity_playlist_videos (
    id TEXT PRIMARY KEY,
    video_number INTEGER NOT NULL,
    video_id TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    duration_text TEXT NOT NULL,
    length_seconds INTEGER NOT NULL,
    chapter_slug TEXT,
    processing_status TEXT DEFAULT 'PROCESSED',
    quality_score INTEGER DEFAULT 96,
    url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- 2. Master Polity Chapters Table
  CREATE TABLE IF NOT EXISTS polity_chapters (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    part_reference TEXT,
    articles_range TEXT,
    reading_time_mins INTEGER DEFAULT 25,
    concepts_count INTEGER DEFAULT 18,
    mcqs_count INTEGER DEFAULT 15,
    quality_score INTEGER DEFAULT 95,
    source_videos TEXT, -- JSON array of source video IDs
    content_markdown TEXT NOT NULL,
    is_published INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- 3. Constitution Articles Database Table
  CREATE TABLE IF NOT EXISTS polity_articles (
    id TEXT PRIMARY KEY,
    article_num TEXT NOT NULL UNIQUE,
    part_num TEXT NOT NULL,
    title TEXT NOT NULL,
    provision TEXT NOT NULL,
    key_point TEXT NOT NULL,
    exam_priority TEXT DEFAULT 'HIGH', -- 'HIGH', 'VERY HIGH', 'MEDIUM'
    related_chapter_slug TEXT
  );

  -- 4. Constitutional Amendments Database Table
  CREATE TABLE IF NOT EXISTS polity_amendments (
    id TEXT PRIMARY KEY,
    amendment_num TEXT NOT NULL UNIQUE,
    year INTEGER NOT NULL,
    title TEXT NOT NULL,
    major_change TEXT NOT NULL,
    related_articles TEXT,
    exam_importance TEXT DEFAULT 'HIGH'
  );

  -- 5. Landmark Case Laws Database Table
  CREATE TABLE IF NOT EXISTS polity_cases (
    id TEXT PRIMARY KEY,
    case_name TEXT NOT NULL UNIQUE,
    year INTEGER NOT NULL,
    bench TEXT,
    issue TEXT NOT NULL,
    judgment_principle TEXT NOT NULL,
    related_article TEXT,
    exam_significance TEXT DEFAULT 'VERY HIGH'
  );

  -- 6. Interactive Chapter Practice MCQs Table
  CREATE TABLE IF NOT EXISTS polity_mcqs (
    id TEXT PRIMARY KEY,
    chapter_slug TEXT NOT NULL,
    question_text TEXT NOT NULL,
    question_type TEXT DEFAULT 'direct', -- 'direct', 'statement', 'match', 'assertion'
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option TEXT NOT NULL, -- 'A', 'B', 'C', 'D'
    explanation TEXT NOT NULL,
    trap_warning TEXT,
    difficulty TEXT DEFAULT 'Moderate', -- 'Easy', 'Moderate', 'Difficult'
    tags TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- 7. User Chapter Learning Progress Table
  CREATE TABLE IF NOT EXISTS polity_user_progress (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    chapter_slug TEXT NOT NULL,
    is_completed INTEGER DEFAULT 0,
    mcq_score INTEGER DEFAULT 0,
    total_mcqs INTEGER DEFAULT 0,
    last_studied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, chapter_slug)
  );
`);

console.log('✅ Indian Polity course database schema created successfully!');
