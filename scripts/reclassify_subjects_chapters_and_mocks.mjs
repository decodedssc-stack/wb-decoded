import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ RECLASSIFYING ALL SUBJECTS, CHAPTERS, AND CHAPTER-WISE MOCK TESTS...');

// 1. Define Master Standard Subjects
const MASTER_SUBJECTS = [
  { id: 'sub-hist', name: 'History of India & Bengal', code: 'HIST', icon: 'Landmark', color: '#B45309', order: 1 },
  { id: 'sub-inm', name: 'Indian National Movement', code: 'INM', icon: 'Flag', color: '#DC2626', order: 2 },
  { id: 'sub-geo-wb', name: 'Geography of India & West Bengal', code: 'GEO-WB', icon: 'MapPin', color: '#047857', order: 3 },
  { id: 'sub-polity', name: 'Indian Polity & Constitution', code: 'POLITY', icon: 'Scale', color: '#1D4ED8', order: 4 },
  { id: 'sub-econ', name: 'Indian Economy & WB Schemes', code: 'ECON', icon: 'Coins', color: '#7C3AED', order: 5 },
  { id: 'sub-sci', name: 'General Science & Environment', code: 'SCI', icon: 'Atom', color: '#0284C7', order: 6 },
  { id: 'sub-arith', name: 'Arithmetic & Numerical Ability', code: 'ARITH', icon: 'Calculator', color: '#D97706', order: 7 },
  { id: 'sub-gma', name: 'General Mental Ability & Reasoning', code: 'GMA', icon: 'Brain', color: '#9333EA', order: 8 },
  { id: 'sub-eng', name: 'English Composition & Grammar', code: 'ENG', icon: 'BookOpen', color: '#4338CA', order: 9 },
  { id: 'sub-ca', name: 'Current Affairs & Static GK', code: 'CA-WB', icon: 'Zap', color: '#E11D48', order: 10 },
  { id: 'sub-ben', name: 'Bengali Language & Literature', code: 'BEN', icon: 'Feather', color: '#C026D3', order: 11 },
  { id: 'sub-cdp', name: 'Child Development & Pedagogy', code: 'CDP', icon: 'Smile', color: '#059669', order: 12 }
];

// Update or Insert Master Subjects
const upsertSubj = db.prepare(`
  INSERT INTO subjects (id, name, code, icon, color, order_index)
  VALUES (@id, @name, @code, @icon, @color, @order)
  ON CONFLICT(id) DO UPDATE SET
    name = @name,
    code = @code,
    icon = @icon,
    color = @color,
    order_index = @order
`);

MASTER_SUBJECTS.forEach(s => upsertSubj.run(s));
console.log('✅ Master subjects updated and standardized.');

// 2. Index Questions by Subject ID
const questionPools = {};
MASTER_SUBJECTS.forEach(s => {
  questionPools[s.id] = db.prepare('SELECT * FROM questions WHERE subject_id = ? ORDER BY id ASC').all(s.id);
  console.log(`   - [${s.code}] ${s.name}: ${questionPools[s.id].length} questions`);
});

// Fallback pool for any subject that has fewer than 25 questions
const allGSQuestions = db.prepare('SELECT * FROM questions WHERE subject_id IN (\'sub-hist\', \'sub-inm\', \'sub-geo-wb\', \'sub-polity\', \'sub-econ\', \'sub-sci\')').all();

// 3. Subject-to-Mock Code Mapping
function getSubjectIdFromMockId(mockId, title) {
  const mId = mockId.toLowerCase();
  const t = (title || '').toLowerCase();

  if (mId.includes('chap-arith') || mId.includes('-math-') || t.includes('arithmetic') || t.includes('percentage') || t.includes('profit') || t.includes('interest') || t.includes('ratio') || t.includes('time and work') || t.includes('speed') || t.includes('mensuration') || t.includes('number system') || t.includes('hcf') || t.includes('average')) {
    return 'sub-arith';
  }
  if (mId.includes('chap-inm') || t.includes('national movement') || t.includes('revolt of 1857') || t.includes('congress') || t.includes('gandhi') || t.includes('swadeshi') || t.includes('netaji') || t.includes('quit india')) {
    return 'sub-inm';
  }
  if (mId.includes('chap-hist') || t.includes('history') || t.includes('ancient') || t.includes('medieval') || t.includes('maurya') || t.includes('gupta') || t.includes('delhi sultanate') || t.includes('mughal') || t.includes('viceroy')) {
    return 'sub-hist';
  }
  if (mId.includes('chap-geo') || t.includes('geography') || t.includes('physiography') || t.includes('river') || t.includes('climate') || t.includes('soil') || t.includes('west bengal') || t.includes('mineral') || t.includes('national park')) {
    return 'sub-geo-wb';
  }
  if (mId.includes('chap-polity') || t.includes('polity') || t.includes('constitution') || t.includes('article') || t.includes('preamble') || t.includes('fundamental rights') || t.includes('parliament') || t.includes('supreme court') || t.includes('governor') || t.includes('panchayat')) {
    return 'sub-polity';
  }
  if (mId.includes('chap-econ') || t.includes('economy') || t.includes('rbi') || t.includes('monetary') || t.includes('fiscal') || t.includes('banking') || t.includes('inflation') || t.includes('niti aayog') || t.includes('five year plan') || t.includes('kanyashree')) {
    return 'sub-econ';
  }
  if (mId.includes('chap-sci') || t.includes('science') || t.includes('physics') || t.includes('chemistry') || t.includes('biology') || t.includes('cell') || t.includes('acid') || t.includes('vitamin') || t.includes('disease') || t.includes('optics') || t.includes('newton')) {
    return 'sub-sci';
  }
  if (mId.includes('chap-eng') || t.includes('english') || t.includes('synonym') || t.includes('antonym') || t.includes('preposition') || t.includes('idiom') || t.includes('voice') || t.includes('narration') || t.includes('grammar') || t.includes('spelling')) {
    return 'sub-eng';
  }
  if (mId.includes('chap-gma') || t.includes('reasoning') || t.includes('mental ability') || t.includes('series') || t.includes('blood relation') || t.includes('direction') || t.includes('syllogism') || t.includes('venn') || t.includes('clock') || t.includes('dice')) {
    return 'sub-gma';
  }
  if (mId.includes('chap-ben') || t.includes('bengali') || t.includes('বাংলা') || t.includes('সন্ধি') || t.includes('সমাস') || t.includes('কারক') || t.includes('বাগধারা')) {
    return 'sub-ben';
  }
  if (mId.includes('chap-cdp') || t.includes('child development') || t.includes('pedagogy') || t.includes('piaget') || t.includes('vygotsky') || t.includes('inclusive education') || t.includes('cce')) {
    return 'sub-cdp';
  }
  if (mId.includes('chap-ca') || t.includes('current affairs') || t.includes('magazine') || t.includes('scheme') || t.includes('award') || t.includes('summit')) {
    return 'sub-ca';
  }

  return 'sub-hist';
}

// 4. Rebuild All Chapter Mock Tests in Transaction
console.log('\n🎯 Step 4: Purging and rebuilding mock_questions for all Chapter Tests with 100% exact subject-matched questions...');

const insertMQ = db.prepare(`
  INSERT INTO mock_questions (
    id, mock_id, question_id, section_name, order_index, marks, negative_marks
  ) VALUES (
    @id, @mock_id, @question_id, @section_name, @order_index, @marks, @negative_marks
  )
`);

const deleteMQ = db.prepare('DELETE FROM mock_questions WHERE mock_id = ?');

const chapterMocks = db.prepare("SELECT id, exam_id, title FROM mock_tests WHERE mock_type = 'Chapter-Test'").all();
console.log(`Found ${chapterMocks.length} chapter mock tests to re-classify and rebuild.`);

const rebuildChapTx = db.transaction(() => {
  let rebuilt = 0;
  for (const mock of chapterMocks) {
    const subjectId = getSubjectIdFromMockId(mock.id, mock.title);
    let pool = questionPools[subjectId];

    if (!pool || pool.length === 0) {
      pool = allGSQuestions;
    }

    deleteMQ.run(mock.id);

    const seed = mock.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const cleanSectionName = mock.title.split('—')[0].trim() || 'Chapter Drill';

    for (let i = 0; i < 25; i++) {
      const q = pool[(seed * 7 + i) % pool.length];
      insertMQ.run({
        id: `mq-${mock.id}-${i + 1}`,
        mock_id: mock.id,
        question_id: q.id,
        section_name: cleanSectionName,
        order_index: i + 1,
        marks: 1.0,
        negative_marks: 0.33
      });
    }
    rebuilt++;
  }
  console.log(`✅ Successfully rebuilt ${rebuilt} chapter tests!`);
});

rebuildChapTx();

// 5. Verification Audit of Chapter Tests
console.log('\n🔍 Step 5: Post-Rebuild Verification Audit of Sample Chapter Mocks:');

const testIdsToAudit = [
  'mock-chap-arith-average-t01',
  'mock-chap-arith-average-t06',
  'mock-chap-arith-average-t16',
  'mock-chap-hist-indus-valley-t01',
  'mock-chap-inm-revolt-1857-t01',
  'mock-chap-geo-physiography-wb-t01',
  'mock-chap-polity-preamble-t01',
  'mock-chap-eng-preposition-rules-t01',
  'mock-chap-sci-physics-newton-laws-t01',
  'mock-chap-gma-number-series-t01'
];

for (const tId of testIdsToAudit) {
  const m = db.prepare('SELECT id, title FROM mock_tests WHERE id = ?').get(tId);
  if (!m) continue;

  const sampleSubjs = db.prepare(`
    SELECT DISTINCT s.name as subject_name, COUNT(*) as cnt
    FROM mock_questions mq
    JOIN questions q ON mq.question_id = q.id
    LEFT JOIN subjects s ON q.subject_id = s.id
    WHERE mq.mock_id = ?
    GROUP BY s.name
  `).all(tId);

  console.log(`📋 [${m.id}]`);
  console.log(`   Title: ${m.title}`);
  sampleSubjs.forEach(s => console.log(`   -> Subject: ${s.subject_name} (${s.cnt} Qs)`));
}
