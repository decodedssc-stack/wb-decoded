import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('📐 Enforcing Strict Official Exam Patterns Across ALL Mock Tests in WB Decoded...');

const OFFICIAL_EXAM_SPECS = {
  'exam-wbcs': {
    name: 'WBCS (Exe) Preliminary Examination',
    total_questions: 200,
    total_marks: 200,
    duration_mins: 150,
    marks_per_correct: 1.0,
    negative_marking: 0.33,
    pass_marks: 125.0,
    sections: [
      { name: 'English Composition', count: 25, subject: 'sub-eng' },
      { name: 'General Science', count: 25, subject: 'sub-sci' },
      { name: 'Current Events of National & International Importance', count: 25, subject: 'sub-ca' },
      { name: 'History of India', count: 25, subject: 'sub-hist' },
      { name: 'Geography of India with special reference to West Bengal', count: 25, subject: 'sub-geo-wb' },
      { name: 'Indian Polity and Economy', count: 25, subject: 'sub-polity' },
      { name: 'Indian National Movement', count: 25, subject: 'sub-inm' },
      { name: 'General Mental Ability', count: 25, subject: 'sub-gma' }
    ]
  },
  'exam-food-si': {
    name: 'WBPSC Food SI (Grade-III)',
    total_questions: 100,
    total_marks: 100,
    duration_mins: 90,
    marks_per_correct: 1.0,
    negative_marking: 0.33,
    pass_marks: 75.0,
    sections: [
      { name: 'General Studies & Current Affairs', count: 50, subject: 'sub-gs' },
      { name: 'Arithmetic & Numerical Ability', count: 50, subject: 'sub-math' }
    ]
  },
  'exam-clerkship': {
    name: 'WBPSC Clerkship Examination (Part-I)',
    total_questions: 100,
    total_marks: 100,
    duration_mins: 90,
    marks_per_correct: 1.0,
    negative_marking: 0.25,
    pass_marks: 65.0,
    sections: [
      { name: 'English Language', count: 30, subject: 'sub-eng' },
      { name: 'General Studies', count: 40, subject: 'sub-gs' },
      { name: 'Arithmetic', count: 30, subject: 'sub-math' }
    ]
  },
  'exam-wb-misc': {
    name: 'WBPSC Miscellaneous Services Recruitment Exam',
    total_questions: 100,
    total_marks: 200,
    duration_mins: 90,
    marks_per_correct: 2.0,
    negative_marking: 0.66,
    pass_marks: 110.0,
    sections: [
      { name: 'General Studies', count: 75, subject: 'sub-gs' },
      { name: 'Arithmetic', count: 25, subject: 'sub-math' }
    ]
  },
  'exam-wbp-si': {
    name: 'WB Police Sub-Inspector (UB/AB) Prelims',
    total_questions: 100,
    total_marks: 200,
    duration_mins: 90,
    marks_per_correct: 2.0,
    negative_marking: 0.50,
    pass_marks: 120.0,
    sections: [
      { name: 'General Studies', count: 50, subject: 'sub-gs' },
      { name: 'Logical & Analytical Reasoning', count: 25, subject: 'sub-gma' },
      { name: 'Arithmetic', count: 25, subject: 'sub-math' }
    ]
  },
  'exam-kp-si': {
    name: 'Kolkata Police SI & Sergeant Prelims',
    total_questions: 100,
    total_marks: 200,
    duration_mins: 90,
    marks_per_correct: 2.0,
    negative_marking: 0.50,
    pass_marks: 125.0,
    sections: [
      { name: 'General Studies', count: 50, subject: 'sub-gs' },
      { name: 'Logical & Analytical Reasoning', count: 25, subject: 'sub-gma' },
      { name: 'Arithmetic', count: 25, subject: 'sub-math' }
    ]
  },
  'exam-wbp-constable': {
    name: 'WB Police Constable Preliminary Exam',
    total_questions: 85,
    total_marks: 85,
    duration_mins: 60,
    marks_per_correct: 1.0,
    negative_marking: 0.25,
    pass_marks: 50.0,
    sections: [
      { name: 'General Awareness & General Knowledge', count: 25, subject: 'sub-gs' },
      { name: 'English', count: 10, subject: 'sub-eng' },
      { name: 'Elementary Mathematics', count: 25, subject: 'sub-math' },
      { name: 'Reasoning & Logical Analysis', count: 25, subject: 'sub-gma' }
    ]
  },
  'exam-wb-tet': {
    name: 'West Bengal Primary Teachers Eligibility Test',
    total_questions: 150,
    total_marks: 150,
    duration_mins: 150,
    marks_per_correct: 1.0,
    negative_marking: 0.00,
    pass_marks: 90.0,
    sections: [
      { name: 'Child Development & Pedagogy', count: 30, subject: 'sub-cdp' },
      { name: 'Language I (Bengali)', count: 30, subject: 'sub-bengali' },
      { name: 'Language II (English)', count: 30, subject: 'sub-eng' },
      { name: 'Mathematics', count: 30, subject: 'sub-math' },
      { name: 'Environmental Studies (EVS)', count: 30, subject: 'sub-evs' }
    ]
  },
  'exam-mscwb': {
    name: 'MSCWB Sub-Assistant Engineer / Officer Exam',
    total_questions: 100,
    total_marks: 200,
    duration_mins: 120,
    marks_per_correct: 2.0,
    negative_marking: 0.66,
    pass_marks: 100.0,
    sections: [
      { name: 'General Studies, Current Affairs & English', count: 20, subject: 'sub-gs' },
      { name: 'Technical / Engineering Domain', count: 80, subject: 'sub-tech' }
    ]
  }
};

const updateMockTestStmt = db.prepare(`
  UPDATE mock_tests
  SET 
    total_questions = @total_questions,
    total_marks = @total_marks,
    duration_mins = @duration_mins,
    marks_per_correct = @marks_per_correct,
    negative_marking = @negative_marking,
    pass_marks = @pass_marks
  WHERE id = @id
`);

const insertMockQuestionStmt = db.prepare(`
  INSERT OR REPLACE INTO mock_questions (
    id, mock_id, question_id, section_name, order_index, marks, negative_marks
  ) VALUES (
    @id, @mock_id, @question_id, @section_name, @order_index, @marks, @negative_marks
  )
`);

const allCleanQuestions = db.prepare('SELECT id, subject_id, question_text FROM questions ORDER BY id ASC').all();
console.log(`Database has ${allCleanQuestions.length} distinct questions.`);

const masterCalibration = db.transaction(() => {
  const allMocks = db.prepare('SELECT id, exam_id, mock_type, title FROM mock_tests').all();

  for (const mock of allMocks) {
    const spec = OFFICIAL_EXAM_SPECS[mock.exam_id];
    if (!spec) continue;

    // For chapter tests, keep 25 questions / 20 mins / standard pattern
    if (mock.mock_type === 'Chapter-Test') {
      updateMockTestStmt.run({
        id: mock.id,
        total_questions: 25,
        total_marks: 25,
        duration_mins: 20,
        marks_per_correct: 1.0,
        negative_marking: spec.negative_marking,
        pass_marks: 15.0
      });
      continue;
    }

    // For Full-Length and Previous-Year mocks, enforce strict official specs
    updateMockTestStmt.run({
      id: mock.id,
      total_questions: spec.total_questions,
      total_marks: spec.total_marks,
      duration_mins: spec.duration_mins,
      marks_per_correct: spec.marks_per_correct,
      negative_marking: spec.negative_marking,
      pass_marks: spec.pass_marks
    });

    // If it's Food SI 2019 or WBCS 2023, preserve the 100% authentic seeded questions
    if (mock.id === 'mock-pyq-food-si-2019' || mock.id === 'mock-pyq-wbcs-2023') {
      // Just update marks and section headers in mock_questions
      db.prepare(`
        UPDATE mock_questions 
        SET marks = ?, negative_marks = ? 
        WHERE mock_id = ?
      `).run(spec.marks_per_correct, spec.negative_marking, mock.id);
      continue;
    }

    // Rebuild mock_questions with strict section distribution
    db.prepare('DELETE FROM mock_questions WHERE mock_id = ?').run(mock.id);

    const seed = mock.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const startIdx = (seed * 19) % (allCleanQuestions.length - spec.total_questions - 5);

    let currentOrder = 1;
    let poolOffset = startIdx;

    for (const sec of spec.sections) {
      for (let i = 0; i < sec.count; i++) {
        const q = allCleanQuestions[(poolOffset + i) % allCleanQuestions.length];
        insertMockQuestionStmt.run({
          id: `mq-${mock.id}-${currentOrder}`,
          mock_id: mock.id,
          question_id: q.id,
          section_name: sec.name,
          order_index: currentOrder,
          marks: spec.marks_per_correct,
          negative_marks: spec.negative_marking
        });
        currentOrder++;
      }
      poolOffset += sec.count;
    }
  }
});

masterCalibration();

console.log('✅ Successfully enforced official pattern on ALL mock tests and sections!');

// Summary Audit
const postSummary = db.prepare(`
  SELECT 
    exam_id, 
    mock_type, 
    COUNT(*) as mocks_count,
    AVG(total_questions) as q_count,
    AVG(total_marks) as marks_count,
    AVG(duration_mins) as duration,
    AVG(marks_per_correct) as mark_per_q,
    AVG(negative_marking) as neg_mark
  FROM mock_tests
  WHERE mock_type != 'Chapter-Test'
  GROUP BY exam_id, mock_type
  ORDER BY exam_id, mock_type
`).all();

console.log('\n📊 AUDIT SUMMARY ACROSS ALL EXAM PATTERNS:');
console.table(postSummary);
