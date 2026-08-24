import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('Fixing mock test exam_ids for perfect structural separation...');

// 1. Chapter-Wise tests are subject-specific and universal, so exam_id should be NULL
db.prepare("UPDATE mock_tests SET exam_id = NULL WHERE mock_type = 'Chapter-Wise'").run();

// 2. Query breakdown
const breakdown = db.prepare(`
  SELECT 
    m.mock_type,
    COALESCE(e.name, 'Subject / Chapter Arena (Universal)') as exam_name,
    COUNT(m.id) as total_mocks,
    AVG(m.total_questions) as avg_questions,
    AVG(m.duration_mins) as avg_duration_mins
  FROM mock_tests m
  LEFT JOIN exams e ON m.exam_id = e.id
  GROUP BY m.mock_type, m.exam_id
  ORDER BY m.mock_type DESC, total_mocks DESC
`).all();

console.table(breakdown);
