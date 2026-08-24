import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('⚡ CREATING COMPACT OPTIMIZED STANDALONE ASSETS...');

const outputDir = path.join(process.cwd(), 'android_app', 'app', 'src', 'main', 'assets', 'www');
fs.mkdirSync(outputDir, { recursive: true });

// 1. Export exams
const exams = db.prepare('SELECT id, name, slug, authority, description, icon, banner, color_theme FROM exams WHERE is_active = 1').all();

// 2. Export subjects
const subjects = db.prepare('SELECT id, name, code, icon, color FROM subjects ORDER BY order_index').all();

// 3. Export chapters
const chapters = db.prepare('SELECT id, subject_id, name FROM chapters ORDER BY subject_id, order_index').all();

// 4. Export questions (clean compact format)
const questions = db.prepare(`
  SELECT 
    id, subject_id, chapter_id, 
    question_text, question_text_bn,
    option_a, option_b, option_c, option_d,
    option_a_bn, option_b_bn, option_c_bn, option_d_bn,
    correct_answer, explanation, explanation_bn,
    important_fact, exam_tip
  FROM questions
`).all();

// 5. Build lookup map of mock tests with compact question IDs
const allMockQuestions = db.prepare('SELECT mock_id, question_id, order_index FROM mock_questions ORDER BY mock_id, order_index').all();
const mockToQMap = {};
allMockQuestions.forEach(mq => {
  if (!mockToQMap[mq.mock_id]) mockToQMap[mq.mock_id] = [];
  mockToQMap[mq.mock_id].push(mq.question_id);
});

const mockTests = db.prepare(`
  SELECT 
    id, exam_id, title, title_bn, slug,
    mock_type, duration_mins, total_marks, total_questions, negative_marking
  FROM mock_tests 
  WHERE is_published = 1
`).all().map(m => ({
  ...m,
  q_ids: mockToQMap[m.id] || []
}));

const bundle = {
  exams,
  subjects,
  chapters,
  questions,
  mockTests
};

const jsonStr = JSON.stringify(bundle);
fs.writeFileSync(path.join(outputDir, 'app_data.json'), jsonStr);
console.log(`✅ Highly compressed app_data.json created! Size: ${(jsonStr.length / 1024 / 1024).toFixed(2)} MB`);
