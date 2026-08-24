import Database from 'better-sqlite3';
const db = new Database('data/wb_decoded.sqlite');

const subjects = db.prepare(`
  SELECT s.id, s.name, s.color, s.icon,
    (SELECT count(*) FROM chapters c WHERE c.subject_id = s.id) as chapter_count,
    (SELECT count(*) FROM mock_tests m WHERE m.mock_type = 'Chapter-Test' AND m.id LIKE 'mock-' || s.id || '%') as test_count
  FROM subjects s
  ORDER BY s.order_index ASC
`).all();

console.log('Subjects summary:');
console.table(subjects);

const sampleChapters = db.prepare(`
  SELECT c.id, c.subject_id, c.name,
    (SELECT count(*) FROM mock_tests m WHERE m.mock_type = 'Chapter-Test' AND m.id LIKE 'mock-' || c.id || '%') as test_count
  FROM chapters c
  LIMIT 15
`).all();

console.log('\nSample Chapters summary:');
console.table(sampleChapters);
