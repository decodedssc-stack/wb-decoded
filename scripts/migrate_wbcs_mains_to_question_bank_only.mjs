import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ COMMENCING MIGRATION: RETAINING ALL WBCS MAINS QUESTIONS IN QUESTION BANK & REMOVING FROM MOCK TESTS PYP LIST...');

// Optimize SQLite for bulk operations
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

const migrationTx = db.transaction(() => {
  // 1. Find all WBCS Mains mock test IDs
  const mainsMocks = db.prepare("SELECT id FROM mock_tests WHERE id LIKE '%wbcs-mains%'").all();
  console.log(`Found ${mainsMocks.length} WBCS Mains mock tests to remove from mock_tests table.`);

  // 2. Remove mock questions mapping for these mocks
  for (const m of mainsMocks) {
    db.prepare('DELETE FROM mock_questions WHERE mock_id = ?').run(m.id);
  }
  console.log('✓ Cleaned up mock_questions mappings for WBCS Mains.');

  // 3. Remove the mock tests themselves from mock_tests
  db.prepare("DELETE FROM mock_tests WHERE id LIKE '%wbcs-mains%'").run();
  console.log('✓ Removed WBCS Mains mock tests from mock_tests table.');

  // 4. Ensure all questions that were associated with WBCS Mains are maintained in questions table
  // with is_pyq = 1, lifecycle_status = 'Approved', verification_status = 'Verified'
  const updateQuestions = db.prepare(`
    UPDATE questions
    SET is_pyq = 1,
        lifecycle_status = 'Approved',
        verification_status = 'Verified',
        exam_id = 'exam-wbcs'
    WHERE id IN (
      SELECT question_id FROM pyq_metadata WHERE paper_name LIKE '%WBCS Mains%' OR exam_id = 'exam-wbcs'
    )
  `);
  const updateRes = updateQuestions.run();
  console.log(`✓ Updated and verified ${updateRes.changes} questions in the central Question Bank.`);
});

migrationTx();

// Audit Counts
const totalQuestions = db.prepare('SELECT count(*) as count FROM questions').get().count;
const totalPyqs = db.prepare('SELECT count(*) as count FROM pyq_metadata').get().count;
const totalMocks = db.prepare('SELECT count(*) as count FROM mock_tests').get().count;
const totalWbcsMocks = db.prepare("SELECT count(*) as count FROM mock_tests WHERE exam_id = 'exam-wbcs'").get().count;

console.log('\n📊 POST-MIGRATION SYSTEM STATUS:');
console.log(`- Total Questions in Question Bank: ${totalQuestions}`);
console.log(`- Total Official PYQ Records in Database: ${totalPyqs}`);
console.log(`- Total Mock Tests in Database (Only Prelims & CBT Shifts): ${totalMocks}`);
console.log(`- WBCS Mock Tests (Only Prelims PYPs): ${totalWbcsMocks}`);
