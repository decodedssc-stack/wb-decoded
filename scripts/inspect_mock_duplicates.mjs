import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 CHECKING FOR DUPLICATE QUESTIONS WITHIN INDIVIDUAL MOCK TESTS...');

const mocksWithDupes = db.prepare(`
  SELECT mock_id, COUNT(*) as total_questions, COUNT(DISTINCT question_id) as unique_questions
  FROM mock_questions
  GROUP BY mock_id
  HAVING COUNT(*) > COUNT(DISTINCT question_id)
`).all();

console.log(`Total mock tests with duplicate questions inside the same test: ${mocksWithDupes.length}`);

if (mocksWithDupes.length > 0) {
  console.log('\nSample 10 mocks with duplicates:');
  mocksWithDupes.slice(0, 10).forEach(m => {
    console.log(`- [${m.mock_id}]: Total = ${m.total_questions}, Unique = ${m.unique_questions} (Repeats: ${m.total_questions - m.unique_questions})`);
  });
} else {
  console.log('🎉 0 MOCKS WITH DUPLICATES! EVERY MOCK TEST HAS 100% DISTINCT QUESTIONS.');
}
