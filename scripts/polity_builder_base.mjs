import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('📚 GENERATING COMPLETE 16-CHAPTER INDIAN POLITY TEXTBOOK & DATABASES...');

// Clean existing data for fresh seed
db.prepare('DELETE FROM polity_chapters').run();
db.prepare('DELETE FROM polity_articles').run();
db.prepare('DELETE FROM polity_amendments').run();
db.prepare('DELETE FROM polity_cases').run();
db.prepare('DELETE FROM polity_mcqs').run();

// Prepare statements
const insertChapter = db.prepare(`
  INSERT INTO polity_chapters (
    id, slug, chapter_number, title, subtitle, part_reference, articles_range, reading_time_mins, concepts_count, mcqs_count, quality_score, source_videos, content_markdown, is_published
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1
  )
`);

const insertArticle = db.prepare(`
  INSERT INTO polity_articles (
    id, article_num, part_num, title, provision, key_point, exam_priority, related_chapter_slug
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?
  )
`);

const insertAmendment = db.prepare(`
  INSERT INTO polity_amendments (
    id, amendment_num, year, title, major_change, related_articles, exam_importance
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?
  )
`);

const insertCase = db.prepare(`
  INSERT INTO polity_cases (
    id, case_name, year, bench, issue, judgment_principle, related_article, exam_significance
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?
  )
`);

const insertMcq = db.prepare(`
  INSERT INTO polity_mcqs (
    id, chapter_slug, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, trap_warning, difficulty, tags
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  )
`);

console.log('✅ Prepared statements ready. Inserting chapters, articles, amendments, cases, and MCQs...');
