import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 RUNNING DEEP INTEGRITY AUDIT & VERIFICATION ON QUESTION BANK...');

// 1. Check table structure and counts
const totalQ = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
console.log(`Total questions in database: ${totalQ}`);

// 2. Check for missing or invalid correct_answer
const invalidAnswers = db.prepare(`
  SELECT id, question_text, correct_answer 
  FROM questions 
  WHERE correct_answer NOT IN ('A', 'B', 'C', 'D') OR correct_answer IS NULL
`).all();
console.log(`Questions with invalid correct_answer: ${invalidAnswers.length}`);

// 3. Check for empty or missing options
const missingOptions = db.prepare(`
  SELECT id, question_text, option_a, option_b, option_c, option_d 
  FROM questions 
  WHERE option_a IS NULL OR option_a = ''
     OR option_b IS NULL OR option_b = ''
     OR option_c IS NULL OR option_c = ''
     OR option_d IS NULL OR option_d = ''
`).all();
console.log(`Questions with missing options: ${missingOptions.length}`);

// 4. Check for duplicate options within the same question (e.g. Option A == Option B)
const duplicateOptions = db.prepare(`
  SELECT id, question_text, option_a, option_b, option_c, option_d 
  FROM questions 
  WHERE option_a = option_b OR option_a = option_c OR option_a = option_d
     OR option_b = option_c OR option_b = option_d
     OR option_c = option_d
`).all();
console.log(`Questions with duplicate options within the question: ${duplicateOptions.length}`);

// 5. Check for questions with bracket leaks or answers in question text
const bracketLeaks = db.prepare(`
  SELECT id, question_text, option_a, option_b, option_c, option_d 
  FROM questions 
  WHERE question_text LIKE '%(A)%' OR question_text LIKE '%(B)%' OR question_text LIKE '%(C)%' OR question_text LIKE '%(D)%'
     OR question_text LIKE '%Ans:%' OR question_text LIKE '%Answer:%'
     OR option_a LIKE '%(A)%' OR option_b LIKE '%(B)%' OR option_c LIKE '%(C)%' OR option_d LIKE '%(D)%'
`).all();
console.log(`Questions with answer leaks or brackets: ${bracketLeaks.length}`);

// 6. Check for unlinked subjects or topics
const unlinkedSubjects = db.prepare(`
  SELECT id, question_text 
  FROM questions 
  WHERE subject_id IS NULL OR subject_id = ''
`).all();
console.log(`Questions with unlinked subject_id: ${unlinkedSubjects.length}`);

// 7. Check explanations coverage
const emptyExplanations = db.prepare(`
  SELECT id, question_text 
  FROM questions 
  WHERE (explanation IS NULL OR explanation = '') AND (short_explanation IS NULL OR short_explanation = '')
`).all();
console.log(`Questions without explanation: ${emptyExplanations.length}`);

// 8. Quality score & verification distribution
const qualityDist = db.prepare(`
  SELECT 
    COUNT(CASE WHEN is_verified = 1 THEN 1 END) as verified_count,
    COUNT(CASE WHEN is_verified = 0 OR is_verified IS NULL THEN 1 END) as unverified_count,
    AVG(quality_score) as avg_quality,
    COUNT(CASE WHEN is_pyq = 1 THEN 1 END) as pyq_count
  FROM questions
`).get();
console.log('Quality & Verification summary:', qualityDist);

// 9. PYQ metadata audit
const pyqTable = db.prepare('SELECT COUNT(*) as cnt FROM pyq_metadata').get().cnt;
console.log(`PYQ Metadata records: ${pyqTable}`);
