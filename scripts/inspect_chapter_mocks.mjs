import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

const countByType = db.prepare('SELECT mock_type, COUNT(id) as c FROM mock_tests GROUP BY mock_type').all();
console.log('Mock Tests By Type:', countByType);

const totalQuestions = db.prepare('SELECT COUNT(id) as c FROM questions').get();
console.log('Total Questions in DB:', totalQuestions.c);

const chapterQuestionCounts = db.prepare('SELECT chapter_id, COUNT(id) as c FROM questions WHERE chapter_id IS NOT NULL GROUP BY chapter_id').all();
console.log('Chapters with questions count:', chapterQuestionCounts.length);
console.log('Sample chapter questions count:', chapterQuestionCounts.slice(0, 5));
