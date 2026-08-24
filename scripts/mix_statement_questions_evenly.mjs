import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔄 BALANCING & INTERLEAVING STATEMENT-BASED QUESTIONS ACROSS ALL MOCK TESTS...');

function isStatementQuestion(text) {
  if (!text) return false;
  const t = text.toLowerCase();
  return (
    t.includes('consider the following') ||
    t.includes('which of the above') ||
    t.includes('which of the following statement') ||
    t.includes('match list-i with list-ii') ||
    t.includes('assertion (a)') ||
    t.includes('1.') && (t.includes('2.') || t.includes('1 only') || t.includes('1 and 2')) ||
    t.includes('statement 1') ||
    t.includes('statement i')
  );
}

const allMocks = db.prepare('SELECT id, title FROM mock_tests').all();
console.log(`Processing ${allMocks.length} mock tests...`);

const updateOrderStmt = db.prepare(`
  UPDATE mock_questions 
  SET order_index = @order_index, question_id = @question_id
  WHERE id = @id
`);

const mixTransaction = db.transaction(() => {
  let totalReordered = 0;

  for (const mock of allMocks) {
    const mockQs = db.prepare(`
      SELECT mq.id as mq_id, mq.section_name, mq.order_index, q.id as question_id, q.question_text
      FROM mock_questions mq
      JOIN questions q ON mq.question_id = q.id
      WHERE mq.mock_id = ?
      ORDER BY mq.order_index ASC
    `).all(mock.id);

    if (mockQs.length === 0) continue;

    // Group by section
    const sectionGroups = new Map();
    mockQs.forEach(row => {
      const sName = row.section_name || 'General';
      if (!sectionGroups.has(sName)) {
        sectionGroups.set(sName, []);
      }
      sectionGroups.get(sName).push(row);
    });

    let globalOrder = 1;

    for (const [secName, rows] of sectionGroups.entries()) {
      const statements = [];
      const directs = [];

      rows.forEach(r => {
        if (isStatementQuestion(r.question_text)) {
          statements.push(r);
        } else {
          directs.push(r);
        }
      });

      // Interleave statements with directs
      const mixed = [];
      let sIdx = 0;
      let dIdx = 0;

      // Ratio calculation (e.g. 1 statement every 2-3 directs)
      const ratio = statements.length > 0 ? Math.max(1, Math.floor(directs.length / statements.length)) : 3;

      while (dIdx < directs.length || sIdx < statements.length) {
        // Add direct questions up to ratio
        for (let k = 0; k < ratio && dIdx < directs.length; k++) {
          mixed.push(directs[dIdx++]);
        }
        // Add 1 statement question
        if (sIdx < statements.length) {
          mixed.push(statements[sIdx++]);
        }
      }

      // Update mock_questions with new smooth sequence
      for (let i = 0; i < mixed.length; i++) {
        const item = mixed[i];
        const origRow = rows[i]; // keep same mq_id slot

        updateOrderStmt.run({
          id: origRow.mq_id,
          question_id: item.question_id,
          order_index: globalOrder
        });
        globalOrder++;
      }
    }

    totalReordered++;
  }

  console.log(`✅ Successfully balanced and interleaved statement questions across ${totalReordered} mock tests!`);
});

mixTransaction();

// Audit verification on sample WBCS mock test
console.log('\n🔍 AUDITING SAMPLE WBCS MOCK QUESTION SEQUENCE:');
const sampleQs = db.prepare(`
  SELECT mq.order_index, mq.section_name, q.question_text
  FROM mock_questions mq
  JOIN questions q ON mq.question_id = q.id
  WHERE mq.mock_id = 'mock-wbcs-full-001'
  ORDER BY mq.order_index ASC
  LIMIT 25
`).all();

sampleQs.forEach(q => {
  const isStmt = isStatementQuestion(q.question_text);
  const typeTag = isStmt ? '📌 [STATEMENT-BASED]' : '🔹 [DIRECT MCQ]';
  const preview = q.question_text.length > 70 ? q.question_text.substring(0, 70) + '...' : q.question_text;
  console.log(`Q${String(q.order_index).padStart(2, '0')}: ${typeTag} ${preview}`);
});
