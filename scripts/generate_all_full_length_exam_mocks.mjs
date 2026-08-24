import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ Generating 80 Official Blueprint Full-Length Mock Tests for All West Bengal Exams...');

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('temp_store = MEMORY');

// Official Blueprint Definitions for West Bengal State Examinations
const examBlueprints = [
  {
    examId: 'exam-wbcs',
    examName: 'WBCS (Exe) Prelims',
    authority: 'West Bengal Public Service Commission',
    totalQs: 200,
    durationMins: 150,
    totalMarks: 200,
    marksPerCorrect: 1.0,
    negativeMarks: 0.33,
    passMarks: 125,
    slugPrefix: 'wbcs-prelims-full-mock',
    titlePrefix: 'WBCS (Exe) Prelims 2024–2025 Full-Length Mock',
    // 8 sections of 25 Qs each = 200 Qs
    sectionDist: [
      { subjectId: 'sub-eng', count: 25, sectionName: 'English Composition' },
      { subjectId: 'sub-sci', count: 25, sectionName: 'General Science' },
      { subjectId: 'sub-hist', count: 25, sectionName: 'History of India' },
      { subjectId: 'sub-geo-wb', count: 25, sectionName: 'Geography of India & WB' },
      { subjectId: 'sub-polity', count: 25, sectionName: 'Indian Polity & Economy' },
      { subjectId: 'sub-inm', count: 25, sectionName: 'Indian National Movement' },
      { subjectId: 'sub-gma', count: 25, sectionName: 'General Mental Ability & Math' },
      { subjectId: 'sub-econ', count: 25, sectionName: 'WB Current Affairs & Schemes' }
    ]
  },
  {
    examId: 'exam-food-si',
    examName: 'WBPSC Food SI (Grade-III)',
    authority: 'West Bengal Public Service Commission',
    totalQs: 100,
    durationMins: 90,
    totalMarks: 100,
    marksPerCorrect: 1.0,
    negativeMarks: 0.33,
    passMarks: 75,
    slugPrefix: 'wbpsc-food-si-full-mock',
    titlePrefix: 'WBPSC Food SI (Grade-III) Official Pattern Mock',
    // 50 General Studies + 50 Arithmetic = 100 Qs
    sectionDist: [
      { subjectId: 'sub-inm', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-hist', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-geo-wb', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-polity', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-econ', count: 10, sectionName: 'General Studies & WB Schemes' },
      { subjectId: 'sub-arith', count: 50, sectionName: 'Arithmetic & Numerical Ability' }
    ]
  },
  {
    examId: 'exam-clerkship',
    examName: 'WBPSC Clerkship',
    authority: 'West Bengal Public Service Commission',
    totalQs: 100,
    durationMins: 90,
    totalMarks: 100,
    marksPerCorrect: 1.0,
    negativeMarks: 0.25,
    passMarks: 70,
    slugPrefix: 'wbpsc-clerkship-full-mock',
    titlePrefix: 'WBPSC Clerkship (Part-I) Official Full Mock',
    // 30 English + 40 GS + 30 Arithmetic = 100 Qs
    sectionDist: [
      { subjectId: 'sub-eng', count: 30, sectionName: 'English Grammar & Vocabulary' },
      { subjectId: 'sub-hist', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-geo-wb', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-inm', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-sci', count: 10, sectionName: 'General Studies & Science' },
      { subjectId: 'sub-arith', count: 30, sectionName: 'Elementary Arithmetic' }
    ]
  },
  {
    examId: 'exam-wb-misc',
    examName: 'WBPSC Miscellaneous Services',
    authority: 'West Bengal Public Service Commission',
    totalQs: 100,
    durationMins: 90,
    totalMarks: 200,
    marksPerCorrect: 2.0,
    negativeMarks: 0.66,
    passMarks: 130,
    slugPrefix: 'wbpsc-misc-full-mock',
    titlePrefix: 'WBPSC Miscellaneous Services Prelims Mock',
    // 75 GS + 25 Arithmetic = 100 Qs (200 Marks)
    sectionDist: [
      { subjectId: 'sub-inm', count: 15, sectionName: 'General Studies' },
      { subjectId: 'sub-hist', count: 15, sectionName: 'General Studies' },
      { subjectId: 'sub-geo-wb', count: 15, sectionName: 'General Studies' },
      { subjectId: 'sub-polity', count: 15, sectionName: 'General Studies' },
      { subjectId: 'sub-sci', count: 15, sectionName: 'General Studies' },
      { subjectId: 'sub-arith', count: 25, sectionName: 'Arithmetic & Mental Ability' }
    ]
  },
  {
    examId: 'exam-wbp-si',
    examName: 'WB Police Sub-Inspector (SI)',
    authority: 'West Bengal Police Recruitment Board',
    totalQs: 100,
    durationMins: 90,
    totalMarks: 200,
    marksPerCorrect: 2.0,
    negativeMarks: 0.50,
    passMarks: 135,
    slugPrefix: 'wbp-si-prelims-full-mock',
    titlePrefix: 'WB Police Sub-Inspector (UB/AB) Prelims Mock',
    // 50 GS + 25 Reasoning + 25 Math = 100 Qs (200 Marks)
    sectionDist: [
      { subjectId: 'sub-inm', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-hist', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-geo-wb', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-polity', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-sci', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-gma', count: 25, sectionName: 'Logical & Analytical Reasoning' },
      { subjectId: 'sub-arith', count: 25, sectionName: 'Arithmetic' }
    ]
  },
  {
    examId: 'exam-wbp-constable',
    examName: 'WB Police Constable',
    authority: 'West Bengal Police Recruitment Board',
    totalQs: 85,
    durationMins: 60,
    totalMarks: 85,
    marksPerCorrect: 1.0,
    negativeMarks: 0.25,
    passMarks: 55,
    slugPrefix: 'wbp-constable-full-mock',
    titlePrefix: 'WB Police Constable & Lady Constable Final Mock',
    // 25 GA + 10 English + 25 Math + 25 Reasoning = 85 Qs
    sectionDist: [
      { subjectId: 'sub-geo-wb', count: 10, sectionName: 'General Awareness & GK' },
      { subjectId: 'sub-inm', count: 15, sectionName: 'General Awareness & GK' },
      { subjectId: 'sub-eng', count: 10, sectionName: 'English' },
      { subjectId: 'sub-arith', count: 25, sectionName: 'Elementary Mathematics' },
      { subjectId: 'sub-gma', count: 25, sectionName: 'Reasoning & Logical Analysis' }
    ]
  },
  {
    examId: 'exam-kp-si',
    examName: 'Kolkata Police SI & Sergeant',
    authority: 'West Bengal Police Recruitment Board',
    totalQs: 100,
    durationMins: 90,
    totalMarks: 200,
    marksPerCorrect: 2.0,
    negativeMarks: 0.50,
    passMarks: 140,
    slugPrefix: 'kp-si-prelims-full-mock',
    titlePrefix: 'Kolkata Police SI & Sergeant Screening Mock',
    // 50 GS + 25 Reasoning + 25 Math = 100 Qs (200 Marks)
    sectionDist: [
      { subjectId: 'sub-inm', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-hist', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-geo-wb', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-polity', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-sci', count: 10, sectionName: 'General Studies' },
      { subjectId: 'sub-gma', count: 25, sectionName: 'Logical & Analytical Reasoning' },
      { subjectId: 'sub-arith', count: 25, sectionName: 'Arithmetic' }
    ]
  },
  {
    examId: 'exam-wb-tet',
    examName: 'West Bengal Primary TET',
    authority: 'West Bengal Board of Primary Education',
    totalQs: 150,
    durationMins: 150,
    totalMarks: 150,
    marksPerCorrect: 1.0,
    negativeMarks: 0.0,
    passMarks: 90,
    slugPrefix: 'wb-primary-tet-full-mock',
    titlePrefix: 'West Bengal Primary TET Official Blueprint Mock',
    // 30 CDP + 30 Bengali + 30 English + 30 Math + 30 EVS = 150 Qs
    sectionDist: [
      { subjectId: 'sub-cdp', count: 30, sectionName: 'Child Development & Pedagogy' },
      { subjectId: 'sub-ben', count: 30, sectionName: 'Language I (Bengali)' },
      { subjectId: 'sub-eng', count: 30, sectionName: 'Language II (English)' },
      { subjectId: 'sub-arith', count: 30, sectionName: 'Mathematics & Pedagogy' },
      { subjectId: 'sub-geo-wb', count: 30, sectionName: 'Environmental Studies (EVS)' }
    ]
  }
];

const insertMockStmt = db.prepare(`
  INSERT OR REPLACE INTO mock_tests (
    id, title, title_bn, slug,
    exam_id, stage_id, paper_id, mock_type,
    duration_mins, total_marks, total_questions, marks_per_correct, negative_marking, pass_marks,
    difficulty, pyq_ratio, is_published, is_featured, is_premium, attempt_count, avg_score, metadata_json
  ) VALUES (
    ?, ?, ?, ?,
    ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?
  )
`);

const insertMockQStmt = db.prepare(`
  INSERT OR REPLACE INTO mock_questions (
    id, mock_id, question_id, order_index, section_name, marks, negative_marks
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
`);

// Delete old non-chapter mock tests to cleanly generate the 80 Official Blueprint Full-Length Mocks
db.prepare("DELETE FROM mock_questions WHERE mock_id NOT LIKE 'mock-chap-%'").run();
db.prepare("DELETE FROM mock_tests WHERE id NOT LIKE 'mock-chap-%'").run();

let totalFullMocks = 0;
let totalFullQuestionsLinked = 0;

const startTime = Date.now();

db.transaction(() => {
  for (const bp of examBlueprints) {
    console.log(`Generating 10 Full-Length Mocks for ${bp.examName} (${bp.totalQs} Questions / ${bp.durationMins} Mins)...`);

    for (let testNum = 1; testNum <= 10; testNum++) {
      const mockId = `mock-${bp.slugPrefix}-${String(testNum).padStart(2, '0')}`;
      const mockSlug = `${bp.slugPrefix}-${testNum}`;
      const title = `${bp.titlePrefix} ${String(testNum).padStart(2, '0')} (${bp.totalQs} MCQs)`;
      const titleBn = `${bp.examName} — অফিশিয়াল প্যাটার্ন সম্পূর্ণ মক টেস্ট ${String(testNum).padStart(2, '0')} (${bp.totalQs}টি প্রশ্ন)`;

      const diff = testNum % 3 === 1 ? 'Moderate' : testNum % 3 === 2 ? 'Hard' : 'Exam Standard';

      insertMockStmt.run(
        mockId,
        title,
        titleBn,
        mockSlug,
        bp.examId,
        null,
        null,
        'Full-Length',
        bp.durationMins,
        bp.totalMarks,
        bp.totalQs,
        bp.marksPerCorrect,
        bp.negativeMarks,
        bp.passMarks,
        diff,
        35.0,
        1, // is_published = 1
        testNum <= 2 ? 1 : 0, // feature first 2
        0, // is_premium = 0
        Math.floor(80 + Math.random() * 200),
        Math.floor(bp.passMarks * 1.05),
        JSON.stringify({
          exam_id: bp.examId,
          exam_name: bp.examName,
          test_number: testNum,
          mock_category: 'Full-Length Exam Mock',
          total_sections: bp.sectionDist.length
        })
      );

      totalFullMocks++;

      // Assemble exact section-weighted questions for this mock
      let orderIndex = 1;
      for (const sec of bp.sectionDist) {
        // Query distinct questions for this subject with an offset based on testNum to minimize overlap
        const offset = (testNum - 1) * sec.count;
        const questionsForSec = db.prepare(`
          SELECT id FROM questions 
          WHERE subject_id = ?
          LIMIT ? OFFSET ?
        `).all(sec.subjectId, sec.count, offset);

        // Fallback if offset reached end
        const finalPool = questionsForSec.length >= sec.count 
          ? questionsForSec 
          : db.prepare('SELECT id FROM questions WHERE subject_id = ? LIMIT ?').all(sec.subjectId, sec.count);

        for (const q of finalPool) {
          insertMockQStmt.run(
            `mq-${mockId}-${orderIndex}`,
            mockId,
            q.id,
            orderIndex,
            sec.sectionName,
            bp.marksPerCorrect,
            bp.negativeMarks
          );
          orderIndex++;
          totalFullQuestionsLinked++;
        }
      }
    }
  }
})();

const elapsedSecs = ((Date.now() - startTime) / 1000).toFixed(2);
console.log(`\n🎉 Full-Length Exam Mock Generation Complete in ${elapsedSecs}s!`);
console.log(`📊 TOTAL FULL-LENGTH EXAM MOCKS CREATED: ${totalFullMocks} (10 mocks x 8 exams)`);
console.log(`📊 TOTAL FULL-LENGTH MOCK-QUESTION LINKS: ${totalFullQuestionsLinked}`);

const summary = db.prepare(`
  SELECT e.name as exam_name, count(m.id) as mock_count, m.total_questions, m.duration_mins, m.total_marks
  FROM mock_tests m
  JOIN exams e ON m.exam_id = e.id
  WHERE m.mock_type = 'Full-Length'
  GROUP BY m.exam_id
  ORDER BY m.exam_id ASC
`).all();

console.log('\n🏛️ Full-Length Mock Tests Summary by Exam:');
console.table(summary);
