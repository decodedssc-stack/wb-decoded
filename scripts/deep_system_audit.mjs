import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 COMMENCING EXHAUSTIVE DEEP AUDIT OF ALL ENTITIES IN DATABASE...\n');

const issues = {
  questions: [],
  mock_tests: [],
  mock_questions: [],
  exams: [],
  subjects: [],
  polity: [],
  ncert: []
};

// =========================================================================
// 1. AUDIT QUESTIONS TABLE
// =========================================================================
console.log('1. Auditing questions table...');
const questions = db.prepare('SELECT * FROM questions').all();
console.log(`Total questions: ${questions.length}`);

const validAns = new Set(['A', 'B', 'C', 'D']);
const seenQTexts = new Map();

for (const q of questions) {
  // Check text
  if (!q.question_text || q.question_text.trim().length === 0) {
    issues.questions.push({ id: q.id, issue: 'Empty question_text' });
  }

  // Check valid answer
  if (!validAns.has(q.correct_answer)) {
    issues.questions.push({ id: q.id, issue: `Invalid correct_answer: "${q.correct_answer}"` });
  }

  // Check 4 options
  if (!q.option_a || !q.option_b || !q.option_c || !q.option_d) {
    issues.questions.push({ id: q.id, issue: 'Missing one or more of option_a/b/c/d' });
  }

  // Check duplicate options within same question
  const opts = [q.option_a, q.option_b, q.option_c, q.option_d].map(o => (o || '').trim().toLowerCase());
  const uniqueOpts = new Set(opts);
  if (uniqueOpts.size < 4) {
    issues.questions.push({ id: q.id, issue: `Duplicate options within same question: ${uniqueOpts.size} distinct` });
  }

  // Check for broken HTML or leftover template tags
  if (q.question_text && (q.question_text.includes('{{') || q.question_text.includes('undefined') || q.question_text.includes('null'))) {
    issues.questions.push({ id: q.id, issue: `Template artifact in question text: ${q.question_text}` });
  }
}
console.log(`Questions issues found: ${issues.questions.length}`);

// =========================================================================
// 2. AUDIT MOCKS AND MOCK_QUESTIONS
// =========================================================================
console.log('\n2. Auditing mock_tests and mock_questions...');
const mocks = db.prepare('SELECT * FROM mock_tests').all();
console.log(`Total mock_tests: ${mocks.length}`);

const validExamIds = new Set(db.prepare('SELECT id FROM exams').all().map(e => e.id));

for (const m of mocks) {
  // Check exam foreign key
  if (!validExamIds.has(m.exam_id)) {
    issues.mock_tests.push({ id: m.id, issue: `Invalid exam_id: ${m.exam_id}` });
  }

  // Check total_questions > 0
  if (!m.total_questions || m.total_questions <= 0) {
    issues.mock_tests.push({ id: m.id, issue: `Invalid total_questions: ${m.total_questions}` });
  }

  // Check assigned questions in mock_questions
  const assigned = db.prepare(`
    SELECT mq.id, mq.question_id, mq.order_index, q.question_text
    FROM mock_questions mq
    JOIN questions q ON mq.question_id = q.id
    WHERE mq.mock_id = ?
    ORDER BY mq.order_index ASC
  `).all(m.id);

  if (assigned.length === 0) {
    issues.mock_tests.push({ id: m.id, issue: 'No questions assigned in mock_questions' });
  }

  // Check for duplicates inside mock
  const seenIds = new Set();
  const seenTexts = new Set();
  for (const a of assigned) {
    if (seenIds.has(a.question_id)) {
      issues.mock_questions.push({ mockId: m.id, questionId: a.question_id, issue: 'Duplicate question_id in mock' });
    }
    seenIds.add(a.question_id);

    const normText = (a.question_text || '').trim().toLowerCase();
    if (seenTexts.has(normText)) {
      issues.mock_questions.push({ mockId: m.id, questionId: a.question_id, issue: 'Duplicate question_text in mock' });
    }
    seenTexts.add(normText);
  }
}
console.log(`Mock tests issues found: ${issues.mock_tests.length}`);
console.log(`Mock questions duplicate issues found: ${issues.mock_questions.length}`);

// =========================================================================
// 3. AUDIT EXAM CATEGORIES & EXAMS
// =========================================================================
console.log('\n3. Auditing categories, exams, and stages...');
const categories = db.prepare('SELECT * FROM exam_categories').all();
const exams = db.prepare('SELECT * FROM exams').all();
const stages = db.prepare('SELECT * FROM stages').all();
const papers = db.prepare('SELECT * FROM papers').all();
const subjects = db.prepare('SELECT * FROM subjects').all();

console.log(`Categories: ${categories.length}, Exams: ${exams.length}, Stages: ${stages.length}, Papers: ${papers.length}, Subjects: ${subjects.length}`);

// Check categories fk
const catIds = new Set(categories.map(c => c.id));
for (const e of exams) {
  if (!catIds.has(e.category_id)) {
    issues.exams.push({ id: e.id, issue: `Invalid category_id: ${e.category_id}` });
  }
}

// =========================================================================
// 4. AUDIT POLITY MASTER BOOK TABLES
// =========================================================================
console.log('\n4. Auditing polity tables...');
const pChapters = db.prepare('SELECT * FROM polity_chapters').all();
const pArticles = db.prepare('SELECT * FROM polity_articles').all();
const pAmendments = db.prepare('SELECT * FROM polity_amendments').all();
const pCases = db.prepare('SELECT * FROM polity_cases').all();
const pMcqs = db.prepare('SELECT * FROM polity_mcqs').all();

console.log(`Polity Chapters: ${pChapters.length}, Articles: ${pArticles.length}, Amendments: ${pAmendments.length}, Cases: ${pCases.length}, MCQs: ${pMcqs.length}`);

for (const ch of pChapters) {
  if (!ch.content_markdown || ch.content_markdown.length < 500) {
    issues.polity.push({ chapter: ch.chapter_number, issue: 'Short or missing content_markdown' });
  }
  if (!ch.cover_image) {
    issues.polity.push({ chapter: ch.chapter_number, issue: 'Missing cover_image' });
  }
}

// =========================================================================
// SUMMARY OUTPUT
// =========================================================================
console.log('\n======================================================');
console.log('AUDIT RESULTS SUMMARY:');
console.log(`- Questions Issues: ${issues.questions.length}`);
console.log(`- Mock Tests Issues: ${issues.mock_tests.length}`);
console.log(`- Mock Questions Duplicate Issues: ${issues.mock_questions.length}`);
console.log(`- Exams Issues: ${issues.exams.length}`);
console.log(`- Polity Issues: ${issues.polity.length}`);
console.log('======================================================');

if (issues.questions.length > 0) {
  console.log('\nSample Question Issues (First 10):');
  console.log(JSON.stringify(issues.questions.slice(0, 10), null, 2));
}

if (issues.mock_tests.length > 0) {
  console.log('\nSample Mock Test Issues (First 10):');
  console.log(JSON.stringify(issues.mock_tests.slice(0, 10), null, 2));
}

if (issues.polity.length > 0) {
  console.log('\nPolity Issues:');
  console.log(JSON.stringify(issues.polity, null, 2));
}
