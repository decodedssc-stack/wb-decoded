import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ REBUILDING ALL 4,574 MOCK TESTS WITH ZERO-DUPLICATE GUARANTEE...');

// Helper to determine subject ID for chapter mocks
function getSubjectIdFromMock(mockId, title) {
  const idLower = mockId.toLowerCase();
  const titleLower = title.toLowerCase();

  if (idLower.includes('arith') || idLower.includes('math') || titleLower.includes('arithmetic') || titleLower.includes('percentage') || titleLower.includes('profit') || titleLower.includes('average')) {
    return 'sub-arith';
  }
  if (idLower.includes('gma') || idLower.includes('reasoning') || titleLower.includes('reasoning') || titleLower.includes('series')) {
    return 'sub-gma';
  }
  if (idLower.includes('inm') || idLower.includes('national-movement') || titleLower.includes('revolt of 1857') || titleLower.includes('swadeshi') || titleLower.includes('gandhi') || titleLower.includes('netaji')) {
    return 'sub-inm';
  }
  if (idLower.includes('hist') || titleLower.includes('history') || titleLower.includes('indus') || titleLower.includes('vedic') || titleLower.includes('maurya') || titleLower.includes('gupta') || titleLower.includes('mughal') || titleLower.includes('sultanate')) {
    return 'sub-hist';
  }
  if (idLower.includes('geo') || titleLower.includes('geography') || titleLower.includes('physiography') || titleLower.includes('river') || titleLower.includes('climate') || titleLower.includes('soil')) {
    return 'sub-geo-wb';
  }
  if (idLower.includes('pol') || titleLower.includes('polity') || titleLower.includes('constitution') || titleLower.includes('article') || titleLower.includes('amendment') || titleLower.includes('preamble')) {
    return 'sub-polity';
  }
  if (idLower.includes('econ') || titleLower.includes('economy') || titleLower.includes('rbi') || titleLower.includes('banking') || titleLower.includes('scheme') || titleLower.includes('kanyashree')) {
    return 'sub-econ';
  }
  if (idLower.includes('sci') || titleLower.includes('physics') || titleLower.includes('chemistry') || titleLower.includes('biology') || titleLower.includes('vitamin') || titleLower.includes('science')) {
    return 'sub-sci';
  }
  if (idLower.includes('eng') || titleLower.includes('english') || titleLower.includes('preposition') || titleLower.includes('synonym') || titleLower.includes('idiom') || titleLower.includes('antonym')) {
    return 'sub-eng';
  }
  if (idLower.includes('ca') || titleLower.includes('current affairs') || titleLower.includes('static gk') || titleLower.includes('summit')) {
    return 'sub-ca';
  }
  if (idLower.includes('ben') || titleLower.includes('bengali') || titleLower.includes('বাংলা') || titleLower.includes('সন্ধি') || titleLower.includes('সমাস')) {
    return 'sub-ben';
  }
  if (idLower.includes('cdp') || titleLower.includes('pedagogy') || titleLower.includes('child development') || titleLower.includes('piaget') || titleLower.includes('vygotsky')) {
    return 'sub-cdp';
  }
  return 'sub-hist';
}

// 1. Preload question pools by subject
const subjects = db.prepare('SELECT id, name FROM subjects').all();
const questionPools = {};
subjects.forEach(s => {
  questionPools[s.id] = db.prepare('SELECT id FROM questions WHERE subject_id = ? ORDER BY id').all(s.id);
  console.log(`Pool [${s.id}] (${s.name}): ${questionPools[s.id].length} unique questions`);
});

const allQuestions = db.prepare('SELECT id, subject_id FROM questions ORDER BY id').all();

// 2. Prepare statements
const deleteMockQs = db.prepare('DELETE FROM mock_questions WHERE mock_id = ?');
const insertMockQ = db.prepare(`
  INSERT INTO mock_questions (id, mock_id, question_id, section_name, order_index, marks, negative_marks)
  VALUES (@id, @mock_id, @question_id, @section_name, @order_index, @marks, @negative_marks)
`);
const updateMockMeta = db.prepare('UPDATE mock_tests SET total_questions = @total_questions, total_marks = @total_marks WHERE id = @id');

// 3. Process all mock tests
const allMocks = db.prepare('SELECT id, title, mock_type, total_questions FROM mock_tests').all();
console.log(`Total mock tests to verify and rebuild: ${allMocks.length}`);

const rebuildAllTx = db.transaction(() => {
  let rebuiltCount = 0;

  for (const mock of allMocks) {
    deleteMockQs.run(mock.id);

    let chosenQIds = [];
    const cleanSectionName = (mock.title || 'General Awareness').split('—')[0].trim();

    if (mock.mock_type === 'Chapter-Test') {
      const subjId = getSubjectIdFromMock(mock.id, mock.title);
      let pool = questionPools[subjId];
      if (!pool || pool.length === 0) pool = allQuestions;

      // Seed based on mock.id
      let seed = 0;
      for (let i = 0; i < mock.id.length; i++) seed = (seed * 31 + mock.id.charCodeAt(i)) >>> 0;

      // Pick max 25 UNIQUE questions from the pool
      const maxCount = Math.min(25, pool.length);
      const startOffset = seed % pool.length;

      const chosenSet = new Set();
      for (let i = 0; i < pool.length && chosenSet.size < maxCount; i++) {
        const q = pool[(startOffset + i) % pool.length];
        chosenSet.add(q.id);
      }
      chosenQIds = Array.from(chosenSet);
    } else {
      // Full-length / PYQ / Sectional mock test
      // Distribute across all subjects
      const targetCount = mock.total_questions || 100;
      let seed = 0;
      for (let i = 0; i < mock.id.length; i++) seed = (seed * 31 + mock.id.charCodeAt(i)) >>> 0;

      const chosenSet = new Set();
      const startOffset = seed % allQuestions.length;

      for (let i = 0; i < allQuestions.length && chosenSet.size < targetCount; i++) {
        const q = allQuestions[(startOffset + i) % allQuestions.length];
        chosenSet.add(q.id);
      }
      chosenQIds = Array.from(chosenSet);
    }

    // Insert each distinct question
    chosenQIds.forEach((qId, idx) => {
      insertMockQ.run({
        id: `mq-${mock.id}-${idx + 1}`,
        mock_id: mock.id,
        question_id: qId,
        section_name: cleanSectionName,
        order_index: idx + 1,
        marks: 1.0,
        negative_marks: 0.33
      });
    });

    // Update total_questions in mock_tests table to match exact unique count
    updateMockMeta.run({
      id: mock.id,
      total_questions: chosenQIds.length,
      total_marks: chosenQIds.length * 1.0
    });

    rebuiltCount++;
  }

  console.log(`✅ Successfully rebuilt ${rebuiltCount} mock tests with 100% unique question guarantee!`);
});

rebuildAllTx();

// 4. Verification: Run database-wide duplicate check
console.log('\n🔍 VERIFYING ZERO DUPLICATES IN ALL MOCK TESTS:');
const dupCheck = db.prepare(`
  SELECT mock_id, COUNT(*) as total, COUNT(DISTINCT question_id) as uniq 
  FROM mock_questions 
  GROUP BY mock_id 
  HAVING COUNT(*) > COUNT(DISTINCT question_id)
`).all();

console.log(`Total mock tests with duplicate questions: ${dupCheck.length}`);
if (dupCheck.length === 0) {
  console.log('🎉 100% CERTIFIED ZERO DUPLICATES ACROSS ALL MOCK TESTS IN THE DATABASE!');
} else {
  console.error('⚠️ Duplicates found:', dupCheck);
}
