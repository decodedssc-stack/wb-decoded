import Database from 'better-sqlite3';
const db = new Database('data/wb_decoded.sqlite');

const mockSamples = db.prepare("SELECT id, title, exam_id, total_questions, duration_mins FROM mock_tests WHERE mock_type = 'Chapter-Test' LIMIT 20").all();
console.table(mockSamples);

const allChapterTestsCount = db.prepare("SELECT count(*) as count FROM mock_tests WHERE mock_type = 'Chapter-Test'").get();
console.log('Total Chapter Tests in DB:', allChapterTestsCount);
