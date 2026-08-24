import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('=== 1. ALL SUBJECTS IN DB ===');
const subjects = db.prepare('SELECT id, name, code, order_index FROM subjects ORDER BY order_index ASC').all();
console.table(subjects);

console.log('\n=== 2. ALL CHAPTERS GROUPED BY SUBJECT ===');
const chapters = db.prepare(`
  SELECT c.id as chapter_id, c.subject_id, s.name as subject_name, c.name as chapter_name, c.order_index
  FROM chapters c
  JOIN subjects s ON c.subject_id = s.id
  ORDER BY s.order_index ASC, c.order_index ASC
`).all();

console.log(`Total Chapters: ${chapters.length}`);
const subjMap = {};
chapters.forEach(c => {
  if (!subjMap[c.subject_name]) subjMap[c.subject_name] = [];
  subjMap[c.subject_name].push(c.chapter_name);
});

for (const [subj, chaps] of Object.entries(subjMap)) {
  console.log(`\n📘 ${subj} (${chaps.length} chapters):`);
  chaps.forEach((ch, i) => console.log(`   ${i + 1}. ${ch}`));
}

console.log('\n=== 3. CHAPTER MOCK TESTS AUDIT ===');
const chapterMocksCount = db.prepare("SELECT COUNT(*) as count FROM mock_tests WHERE mock_type = 'Chapter-Test'").get().count;
console.log(`Total Chapter Tests: ${chapterMocksCount}`);

const sampleChapMocks = db.prepare(`
  SELECT m.id, m.title, s.name as subject_name
  FROM mock_tests m
  LEFT JOIN mock_questions mq ON mq.mock_id = m.id
  LEFT JOIN questions q ON mq.question_id = q.id
  LEFT JOIN subjects s ON q.subject_id = s.id
  WHERE m.mock_type = 'Chapter-Test'
  GROUP BY m.id
  LIMIT 25
`).all();

console.log('\nSample Chapter Mocks with Detected Subject:');
console.table(sampleChapMocks);
