import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 FULL AUDIT OF mock_tests AND mock_questions...');

const allMocks = db.prepare('SELECT id, title, exam_id, total_questions, total_marks FROM mock_tests').all();
console.log(`Total Mock Tests: ${allMocks.length}`);

let duplicateFoundCount = 0;

for (const m of allMocks) {
  const questions = db.prepare(`
    SELECT q.id, q.question_text, q.correct_answer, q.option_a, q.option_b, q.option_c, q.option_d, mq.order_index, mq.section_name
    FROM mock_questions mq
    JOIN questions q ON mq.question_id = q.id
    WHERE mq.mock_id = ?
    ORDER BY mq.order_index ASC
  `).all(m.id);

  const seenIds = new Set();
  const seenTexts = new Map();
  const duplicateIds = [];
  const duplicateTexts = [];

  for (const q of questions) {
    if (seenIds.has(q.id)) {
      duplicateIds.push(q.id);
    }
    seenIds.add(q.id);

    const normText = (q.question_text || '').toLowerCase().trim();
    if (seenTexts.has(normText)) {
      duplicateTexts.push({ id: q.id, text: q.question_text, firstId: seenTexts.get(normText) });
    } else {
      seenTexts.set(normText, q.id);
    }
  }

  if (duplicateIds.length > 0 || duplicateTexts.length > 0) {
    duplicateFoundCount++;
    console.log(`\n❌ DUPLICATE FOUND IN MOCK [${m.id}] "${m.title}":`);
    console.log(`   Total assigned: ${questions.length} | Unique IDs: ${seenIds.size} | Unique Texts: ${seenTexts.size}`);
    if (duplicateIds.length > 0) {
      console.log(`   Repeated Question IDs (${duplicateIds.length}):`, duplicateIds.slice(0, 5));
    }
    if (duplicateTexts.length > 0) {
      console.log(`   Repeated Question Texts (${duplicateTexts.length}):`);
      duplicateTexts.slice(0, 5).forEach(d => console.log(`     - [${d.id} vs ${d.firstId}] "${d.text}"`));
    }
  } else {
    // console.log(`✅ Mock [${m.id}] is 100% clean (${questions.length} questions).`);
  }
}

console.log(`\n==============================================`);
console.log(`AUDIT SUMMARY: ${duplicateFoundCount} out of ${allMocks.length} mocks contain duplicates!`);
console.log(`==============================================`);
