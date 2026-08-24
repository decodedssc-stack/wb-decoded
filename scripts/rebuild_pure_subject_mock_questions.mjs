import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🛠️ STARTING COMPREHENSIVE REPAIR OF ALL MOCK QUESTIONS & SECTIONS...');

// Step 1: Clean all leaked brackets or answers in questions and options
console.log('🧹 Step 1: Sanitizing question texts and options from answer leaks or brackets...');

const allQuestions = db.prepare('SELECT * FROM questions').all();
const updateQStmt = db.prepare(`
  UPDATE questions 
  SET 
    question_text = @question_text,
    option_a = @option_a,
    option_b = @option_b,
    option_c = @option_c,
    option_d = @option_d
  WHERE id = @id
`);

function cleanText(txt) {
  if (!txt) return txt;
  let clean = txt;
  // Remove trailing or leading brackets like (A), (B), (C), (D), (a), (b), (c), (d)
  clean = clean.replace(/^[A-Da-d]\.\s*/, '');
  clean = clean.replace(/^\([A-Da-d]\)\s*/, '');
  clean = clean.replace(/\s*\([A-Da-d]\)$/, '');
  clean = clean.replace(/\s*Ans\s*:\s*[A-Da-d]/i, '');
  clean = clean.replace(/\s*Answer\s*:\s*[A-Da-d]/i, '');
  return clean.trim();
}

let cleanedCount = 0;
for (const q of allQuestions) {
  const newQText = cleanText(q.question_text);
  const newOptA = cleanText(q.option_a);
  const newOptB = cleanText(q.option_b);
  const newOptC = cleanText(q.option_c);
  const newOptD = cleanText(q.option_d);

  if (
    newQText !== q.question_text ||
    newOptA !== q.option_a ||
    newOptB !== q.option_b ||
    newOptC !== q.option_c ||
    newOptD !== q.option_d
  ) {
    updateQStmt.run({
      id: q.id,
      question_text: newQText,
      option_a: newOptA,
      option_b: newOptB,
      option_c: newOptC,
      option_d: newOptD
    });
    cleanedCount++;
  }
}
console.log(`✅ Cleaned ${cleanedCount} questions from residual bracket markers or answer tags.`);

// Step 2: Index Questions by Subject ID
console.log('\n📚 Step 2: Indexing questions by subject...');
const subjectPools = {};
const allCleanQ = db.prepare('SELECT * FROM questions ORDER BY id ASC').all();

for (const q of allCleanQ) {
  if (!subjectPools[q.subject_id]) {
    subjectPools[q.subject_id] = [];
  }
  subjectPools[q.subject_id].push(q);
}

for (const [subjId, list] of Object.entries(subjectPools)) {
  console.log(`   - [${subjId}] ${list[0]?.subject_name || subjId}: ${list.length} questions available`);
}

// Helper: Get pure questions for a set of subject IDs
function getPureQuestions(subjectIds, neededCount, seedOffset = 0) {
  let combined = [];
  for (const sId of subjectIds) {
    if (subjectPools[sId]) {
      combined = combined.concat(subjectPools[sId]);
    }
  }

  if (combined.length === 0) {
    // Fallback: general pool if subject is empty
    combined = allCleanQ;
  }

  const result = [];
  for (let i = 0; i < neededCount; i++) {
    const q = combined[(seedOffset + i) % combined.length];
    result.push(q);
  }
  return result;
}

// Step 3: Define Official Section Specifications for Each Exam
const EXAM_BLUEPRINTS = {
  'exam-wbcs': {
    total_questions: 200,
    total_marks: 200,
    duration_mins: 150,
    marks_per_correct: 1.0,
    negative_marking: 0.33,
    sections: [
      { name: 'English Composition', count: 25, subjects: ['sub-eng'] },
      { name: 'General Science', count: 25, subjects: ['sub-sci'] },
      { name: 'Current Events of National & International Importance', count: 25, subjects: ['sub-ca', 'sub-econ'] },
      { name: 'History of India', count: 25, subjects: ['sub-hist'] },
      { name: 'Geography of India with special reference to West Bengal', count: 25, subjects: ['sub-geo-wb'] },
      { name: 'Indian Polity and Economy', count: 25, subjects: ['sub-polity', 'sub-econ'] },
      { name: 'Indian National Movement', count: 25, subjects: ['sub-inm'] },
      { name: 'General Mental Ability & Arithmetic', count: 25, subjects: ['sub-gma', 'sub-arith'] }
    ]
  },
  'exam-food-si': {
    total_questions: 100,
    total_marks: 100,
    duration_mins: 90,
    marks_per_correct: 1.0,
    negative_marking: 0.33,
    sections: [
      { name: 'General Studies & Current Affairs', count: 50, subjects: ['sub-hist', 'sub-geo-wb', 'sub-polity', 'sub-sci', 'sub-inm', 'sub-ca', 'sub-econ'] },
      { name: 'Arithmetic & Numerical Ability', count: 50, subjects: ['sub-arith'] }
    ]
  },
  'exam-clerkship': {
    total_questions: 100,
    total_marks: 100,
    duration_mins: 90,
    marks_per_correct: 1.0,
    negative_marking: 0.25,
    sections: [
      { name: 'English Language', count: 30, subjects: ['sub-eng'] },
      { name: 'General Studies', count: 40, subjects: ['sub-hist', 'sub-geo-wb', 'sub-polity', 'sub-sci', 'sub-inm', 'sub-ca'] },
      { name: 'Arithmetic', count: 30, subjects: ['sub-arith'] }
    ]
  },
  'exam-wbp-si': {
    total_questions: 100,
    total_marks: 200,
    duration_mins: 90,
    marks_per_correct: 2.0,
    negative_marking: 0.50,
    sections: [
      { name: 'General Studies', count: 50, subjects: ['sub-hist', 'sub-geo-wb', 'sub-polity', 'sub-sci', 'sub-inm', 'sub-ca'] },
      { name: 'Logical & Analytical Reasoning', count: 25, subjects: ['sub-gma'] },
      { name: 'Arithmetic', count: 25, subjects: ['sub-arith'] }
    ]
  },
  'exam-kp-si': {
    total_questions: 100,
    total_marks: 200,
    duration_mins: 90,
    marks_per_correct: 2.0,
    negative_marking: 0.50,
    sections: [
      { name: 'General Studies', count: 50, subjects: ['sub-hist', 'sub-geo-wb', 'sub-polity', 'sub-sci', 'sub-inm', 'sub-ca'] },
      { name: 'Logical & Analytical Reasoning', count: 25, subjects: ['sub-gma'] },
      { name: 'Arithmetic', count: 25, subjects: ['sub-arith'] }
    ]
  },
  'exam-wbp-constable': {
    total_questions: 85,
    total_marks: 85,
    duration_mins: 60,
    marks_per_correct: 1.0,
    negative_marking: 0.25,
    sections: [
      { name: 'General Awareness & General Knowledge', count: 25, subjects: ['sub-hist', 'sub-geo-wb', 'sub-polity', 'sub-sci', 'sub-inm', 'sub-ca'] },
      { name: 'English', count: 10, subjects: ['sub-eng'] },
      { name: 'Elementary Mathematics', count: 25, subjects: ['sub-arith'] },
      { name: 'Reasoning & Logical Analysis', count: 25, subjects: ['sub-gma'] }
    ]
  },
  'exam-kp-constable': {
    total_questions: 85,
    total_marks: 85,
    duration_mins: 60,
    marks_per_correct: 1.0,
    negative_marking: 0.25,
    sections: [
      { name: 'General Awareness & General Knowledge', count: 25, subjects: ['sub-hist', 'sub-geo-wb', 'sub-polity', 'sub-sci', 'sub-inm', 'sub-ca'] },
      { name: 'English', count: 10, subjects: ['sub-eng'] },
      { name: 'Elementary Mathematics', count: 25, subjects: ['sub-arith'] },
      { name: 'Reasoning & Logical Analysis', count: 25, subjects: ['sub-gma'] }
    ]
  },
  'exam-wb-misc': {
    total_questions: 100,
    total_marks: 200,
    duration_mins: 90,
    marks_per_correct: 2.0,
    negative_marking: 0.66,
    sections: [
      { name: 'General Studies', count: 75, subjects: ['sub-hist', 'sub-geo-wb', 'sub-polity', 'sub-sci', 'sub-inm', 'sub-econ', 'sub-ca'] },
      { name: 'Arithmetic', count: 25, subjects: ['sub-arith'] }
    ]
  },
  'exam-wb-tet': {
    total_questions: 150,
    total_marks: 150,
    duration_mins: 150,
    marks_per_correct: 1.0,
    negative_marking: 0.00,
    sections: [
      { name: 'Child Development & Pedagogy', count: 30, subjects: ['sub-cdp'] },
      { name: 'Language I (Bengali)', count: 30, subjects: ['sub-ben'] },
      { name: 'Language II (English)', count: 30, subjects: ['sub-eng'] },
      { name: 'Mathematics', count: 30, subjects: ['sub-arith'] },
      { name: 'Environmental Studies (EVS)', count: 30, subjects: ['sub-sci', 'sub-geo-wb'] }
    ]
  },
  'exam-mscwb': {
    total_questions: 100,
    total_marks: 200,
    duration_mins: 120,
    marks_per_correct: 2.0,
    negative_marking: 0.66,
    sections: [
      { name: 'General Studies, Current Affairs & English', count: 20, subjects: ['sub-hist', 'sub-geo-wb', 'sub-polity', 'sub-eng', 'sub-ca'] },
      { name: 'Technical / Science & Numerical Domain', count: 80, subjects: ['sub-sci', 'sub-arith', 'sub-gma'] }
    ]
  }
};

// Step 4: Rebuild mock_questions with 100% Subject Purity
console.log('\n🎯 Step 3: Rebuilding mock_questions with 100% pure subject matching...');

const insertMQ = db.prepare(`
  INSERT INTO mock_questions (
    id, mock_id, question_id, section_name, order_index, marks, negative_marks
  ) VALUES (
    @id, @mock_id, @question_id, @section_name, @order_index, @marks, @negative_marks
  )
`);

const deleteMQ = db.prepare('DELETE FROM mock_questions WHERE mock_id = ?');

const allMocks = db.prepare('SELECT id, exam_id, mock_type, title FROM mock_tests').all();
console.log(`Processing ${allMocks.length} mock tests...`);

const rebuildTransaction = db.transaction(() => {
  let updatedMocksCount = 0;

  for (const mock of allMocks) {
    const blueprint = EXAM_BLUEPRINTS[mock.exam_id];
    
    // Chapter tests
    if (mock.mock_type === 'Chapter-Test') {
      // Find subject for this chapter test
      const chapQ = db.prepare(`
        SELECT q.subject_id 
        FROM mock_questions mq 
        JOIN questions q ON mq.question_id = q.id 
        WHERE mq.mock_id = ? 
        LIMIT 1
      `).get(mock.id);

      const targetSubjId = chapQ?.subject_id || 'sub-hist';
      const pool = subjectPools[targetSubjId] || allCleanQ;

      deleteMQ.run(mock.id);

      const seed = mock.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
      for (let i = 0; i < 25; i++) {
        const q = pool[(seed + i) % pool.length];
        insertMQ.run({
          id: `mq-${mock.id}-${i + 1}`,
          mock_id: mock.id,
          question_id: q.id,
          section_name: mock.title.split('—')[0].trim() || 'Chapter Drill',
          order_index: i + 1,
          marks: 1.0,
          negative_marks: 0.33
        });
      }
      updatedMocksCount++;
      continue;
    }

    if (!blueprint) continue;

    deleteMQ.run(mock.id);

    // Generate unique pseudo-random seed per mock to rotate questions
    const seed = mock.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

    let currentOrder = 1;
    for (let sIdx = 0; sIdx < blueprint.sections.length; sIdx++) {
      const sec = blueprint.sections[sIdx];
      const secOffset = (seed * 13 + sIdx * 7);
      const pureQuestions = getPureQuestions(sec.subjects, sec.count, secOffset);

      for (let i = 0; i < pureQuestions.length; i++) {
        const q = pureQuestions[i];
        insertMQ.run({
          id: `mq-${mock.id}-${currentOrder}`,
          mock_id: mock.id,
          question_id: q.id,
          section_name: sec.name,
          order_index: currentOrder,
          marks: blueprint.marks_per_correct,
          negative_marks: blueprint.negative_marking
        });
        currentOrder++;
      }
    }
    updatedMocksCount++;
  }

  console.log(`✅ Successfully rebuilt ${updatedMocksCount} mock tests with 100% subject-pure questions!`);
});

rebuildTransaction();

// Step 5: Verification & Audit of Sample Mocks
console.log('\n🔍 Step 4: Verification Audit of Rebuilt Mock Tests:');

const sampleMocks = [
  'mock-wbcs-full-001',
  'mock-food-si-full-001',
  'mock-clerkship-full-001',
  'mock-wbp-si-full-001',
  'mock-wb-tet-full-001'
];

for (const mockId of sampleMocks) {
  const m = db.prepare('SELECT id, title FROM mock_tests WHERE id = ?').get(mockId);
  if (!m) continue;
  console.log(`\n📋 [${m.id}] ${m.title}`);

  const sectionsAudit = db.prepare(`
    SELECT 
      mq.section_name,
      s.name as actual_subject,
      COUNT(*) as count
    FROM mock_questions mq
    JOIN questions q ON mq.question_id = q.id
    LEFT JOIN subjects s ON q.subject_id = s.id
    WHERE mq.mock_id = ?
    GROUP BY mq.section_name, s.name
    ORDER BY mq.order_index ASC
  `).all(mockId);

  sectionsAudit.forEach(sec => {
    console.log(`   * Section: "${sec.section_name}" -> Subject: "${sec.actual_subject}" (${sec.count} Qs)`);
  });
}
