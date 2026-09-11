const Database = require('better-sqlite3');
const path = require('path');

const dbPath = 'C:/Users/garai/Downloads/antigravity/WB Decoded/data/wb_decoded.sqlite';
const db = new Database(dbPath);

console.log("=== WB DECODED — CHAPTER-WISE MOCK TEST GENERATOR ===");
console.log("Requirement: 10 Mocks × 30 Questions = 300 Question Instances per chapter (25 Mins)");

// 1. Fetch all chapters
const chapters = db.prepare(`
  SELECT c.id, c.subject_id, c.name, s.name as subject_name
  FROM chapters c
  JOIN subjects s ON c.subject_id = s.id
  ORDER BY c.subject_id, c.order_index, c.id
`).all();

console.log(`Found ${chapters.length} chapters.`);

// Pre-fetch questions by chapter and by subject
const chapterQuestionsMap = new Map();
const subjectQuestionsMap = new Map();

const allQuestions = db.prepare(`
  SELECT id, subject_id, chapter_id, correct_answer, difficulty, question_text
  FROM questions
`).all();

console.log(`Loaded ${allQuestions.length} total questions from database.`);

allQuestions.forEach(q => {
  if (!chapterQuestionsMap.has(q.chapter_id)) {
    chapterQuestionsMap.set(q.chapter_id, []);
  }
  chapterQuestionsMap.get(q.chapter_id).push(q);

  if (!subjectQuestionsMap.has(q.subject_id)) {
    subjectQuestionsMap.set(q.subject_id, []);
  }
  subjectQuestionsMap.get(q.subject_id).push(q);
});

// Prepared statements for insertion
const deleteOldMocksStmt = db.prepare(`
  DELETE FROM mock_questions WHERE mock_id IN (
    SELECT id FROM mock_tests WHERE mock_type = 'Chapter-Wise'
  )
`);
const deleteOldMockTestsStmt = db.prepare(`
  DELETE FROM mock_tests WHERE mock_type = 'Chapter-Wise'
`);

const insertMockStmt = db.prepare(`
  INSERT OR REPLACE INTO mock_tests (
    id, title, title_bn, slug, exam_id,
    mock_type, duration_mins, total_marks, total_questions,
    marks_per_correct, negative_marking, pass_marks,
    difficulty, pyq_ratio, is_published, is_featured, is_premium,
    attempt_count, avg_score, metadata_json, created_at
  ) VALUES (
    @id, @title, @title_bn, @slug, @exam_id,
    'Chapter-Wise', 25, 30, 30,
    1.0, 0.33, 18.0,
    @difficulty, 0.2, 1, @is_featured, @is_premium,
    0, 0, @metadata_json, CURRENT_TIMESTAMP
  )
`);

const insertMockQuestionStmt = db.prepare(`
  INSERT OR REPLACE INTO mock_questions (
    id, mock_id, question_id, order_index, section_name, marks, negative_marks
  ) VALUES (
    @id, @mock_id, @question_id, @order_index, @section_name, 1.0, 0.33
  )
`);

// Clean old chapter mocks
console.log("Clearing existing Chapter-Wise mock entries...");
db.transaction(() => {
  deleteOldMocksStmt.run();
  deleteOldMockTestsStmt.run();
})();

let totalMocksCreated = 0;
let totalMockQuestionsCreated = 0;
const chapterReport = [];

// Helper to shuffle an array deterministically with a seed
function seededShuffle(arr, seed) {
  const copy = [...arr];
  let s = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const runBatchTx = db.transaction(() => {
  for (let cIdx = 0; cIdx < chapters.length; cIdx++) {
    const chapter = chapters[cIdx];
    const chapQuestions = chapterQuestionsMap.get(chapter.id) || [];
    const subjQuestions = subjectQuestionsMap.get(chapter.subject_id) || [];

    // Form question pool: primary chapter questions first, supplemented by subject if needed
    let pool = [...chapQuestions];
    if (pool.length < 30) {
      const extra = subjQuestions.filter(q => q.chapter_id !== chapter.id);
      pool = [...pool, ...extra];
    }
    // Fallback if subject has very few questions
    if (pool.length < 30) {
      pool = [...allQuestions];
    }

    // Separate pool by answer key to enable key balancing (A, B, C, D)
    const byKey = { A: [], B: [], C: [], D: [] };
    pool.forEach(q => {
      const key = (q.correct_answer || 'A').trim().toUpperCase();
      if (byKey[key]) byKey[key].push(q);
      else byKey.A.push(q);
    });

    // Track usage count per question across the 10 mocks
    const usageCount = new Map();
    pool.forEach(q => usageCount.set(q.id, 0));

    let repeatedInstances = 0;
    const uniqueQuestionsInChapter = new Set();

    // Generate exactly 10 mocks
    for (let m = 1; m <= 10; m++) {
      const mockNumStr = String(m).padStart(2, '0');
      const mockId = `mock-${chapter.id}-m${mockNumStr}`;
      // Slug supports both m01 and t01 patterns
      const mockSlug = `mock-${chapter.id}-t${mockNumStr}`;

      const title = `${chapter.name} — Mock Test ${mockNumStr}`;
      const title_bn = `${chapter.name} — অধ্যায়ভিত্তিক মক টেস্ট ${mockNumStr}`;
      const diff = m <= 3 ? 'Foundation' : m <= 7 ? 'Standard' : 'Challenger';

      // Pick 30 questions for this mock:
      // Target: 7-8 A, 7-8 B, 7-8 C, 7-8 D
      const selectedForMock = [];
      const keys = ['A', 'B', 'C', 'D'];
      const targetPerKey = [8, 8, 7, 7]; // sums to 30

      keys.forEach((key, kIdx) => {
        const target = targetPerKey[kIdx];
        const keyPool = byKey[key].length > 0 ? byKey[key] : pool;
        
        // Sort by usage count ascending (least used first)
        const sorted = [...keyPool].sort((a, b) => (usageCount.get(a.id) || 0) - (usageCount.get(b.id) || 0));
        
        let addedForKey = 0;
        for (let i = 0; i < sorted.length && addedForKey < target; i++) {
          const cand = sorted[i];
          if (!selectedForMock.some(x => x.id === cand.id)) {
            selectedForMock.push(cand);
            const currentUsage = usageCount.get(cand.id) || 0;
            if (currentUsage > 0) {
              repeatedInstances++;
            }
            usageCount.set(cand.id, currentUsage + 1);
            uniqueQuestionsInChapter.add(cand.id);
            addedForKey++;
          }
        }
      });

      // If selected < 30 due to key scarcity, fill remainder from least-used
      if (selectedForMock.length < 30) {
        const sortedAll = [...pool].sort((a, b) => (usageCount.get(a.id) || 0) - (usageCount.get(b.id) || 0));
        for (let i = 0; i < sortedAll.length && selectedForMock.length < 30; i++) {
          const cand = sortedAll[i];
          if (!selectedForMock.some(x => x.id === cand.id)) {
            selectedForMock.push(cand);
            const currentUsage = usageCount.get(cand.id) || 0;
            if (currentUsage > 0) {
              repeatedInstances++;
            }
            usageCount.set(cand.id, currentUsage + 1);
            uniqueQuestionsInChapter.add(cand.id);
          }
        }
      }

      // Shuffle the selected questions for the active mock
      const finalMockQuestions = seededShuffle(selectedForMock, cIdx * 100 + m);

      // Insert Mock Test Record
      insertMockStmt.run({
        id: mockId,
        title,
        title_bn,
        slug: mockSlug,
        exam_id: 'exam-wbcs',
        difficulty: diff,
        is_featured: m === 1 ? 1 : 0,
        is_premium: m <= 2 ? 0 : 1, // Free for first 2 mocks
        metadata_json: JSON.stringify({
          chapter_id: chapter.id,
          chapter_name: chapter.name,
          subject_id: chapter.subject_id,
          subject_name: chapter.subject_name,
          mock_number: m,
          tier: diff,
          duration_minutes: 25,
          total_questions: 30,
          total_marks: 30
        })
      });

      // Insert Mock Questions
      finalMockQuestions.forEach((q, qIdx) => {
        insertMockQuestionStmt.run({
          id: `mq-${mockId}-${String(qIdx + 1).padStart(3, '0')}`,
          mock_id: mockId,
          question_id: q.id,
          order_index: qIdx + 1,
          section_name: chapter.name
        });
        totalMockQuestionsCreated++;
      });

      totalMocksCreated++;
    }

    const repPct = ((repeatedInstances / 300) * 100).toFixed(1);
    chapterReport.push({
      chapter: chapter.name,
      uniqueQuestions: uniqueQuestionsInChapter.size,
      repeatedInstances,
      repetitionPct: `${repPct}%`
    });
  }
});

runBatchTx();

console.log("\n=== COMPLETED SUCCESSFULLY ===");
console.log(`Total Chapters Processed: ${chapters.length}`);
console.log(`Total Mock Tests Created: ${totalMocksCreated} (10 per chapter, exactly 30 questions & 25 mins)`);
console.log(`Total Mock Question Links Created: ${totalMockQuestionsCreated}`);
console.log(`Sample Chapter Quality Verification:`);
console.log(chapterReport.slice(0, 5));
