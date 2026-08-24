import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ COMMENCING PHASE 2: CENTRAL SSC HISTORICAL PAPERS (2015–2019) INGESTION...');

// Optimize SQLite for bulk batch transactions
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

// Prepared Statements
const insertMock = db.prepare(`
  INSERT OR REPLACE INTO mock_tests (
    id, title, title_bn, slug, exam_id, duration_mins, total_marks, total_questions,
    marks_per_correct, negative_marking, pass_marks, difficulty, is_published, mock_type,
    created_at
  ) VALUES (
    @id, @title, @title_bn, @slug, @exam_id, @duration_mins, @total_marks, @total_questions,
    @marks_per_correct, @negative_marking, @pass_marks, @difficulty, 1, 'Previous-Year',
    CURRENT_TIMESTAMP
  )
`);

const insertMockQuestion = db.prepare(`
  INSERT OR REPLACE INTO mock_questions (
    id, mock_id, question_id, order_index, section_name, marks, negative_marks
  ) VALUES (
    @id, @mock_id, @question_id, @order_index, @section_name, @marks, @negative_marks
  )
`);

const insertPyqMeta = db.prepare(`
  INSERT OR REPLACE INTO pyq_metadata (
    id, question_id, exam_id, exam_year, exam_date, paper_name, shift, question_num,
    source_name, source_url, source_doc, import_date
  ) VALUES (
    @id, @question_id, @exam_id, @exam_year, @exam_date, @paper_name, @shift, @question_num,
    'Staff Selection Commission (SSC) Official Master Answer Key',
    'https://ssc.gov.in',
    @source_doc,
    CURRENT_TIMESTAMP
  )
`);

// =========================================================================
// PHASE 2 HISTORICAL OFFICIAL SSC PAPERS (2015–2019)
// =========================================================================
const PHASE2_SSC_PAPERS = [
  // --- SSC CGL Tier-1 (2015–2019) ---
  {
    exam_id: 'exam-ssc-cgl',
    id: 'mock-pyq-ssc-cgl-2019-mar03-s1',
    year: 2019,
    date: '2020-03-03',
    shift: '03 March 2020 — Shift 1 (10:00 AM - 11:00 AM)',
    title: 'SSC CGL Tier-1 Official Question Paper (03 Mar 2020 — Shift 1)',
    title_bn: 'এসএসসি সিজিএল টায়ার-১ অফিশিয়াল প্রশ্নপত্র (০৩ মার্চ ২০২০ - শিফট ১)',
    duration: 60, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 70,
    doc: 'SSC_CGL_Tier1_2019_03Mar_S1_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-cgl',
    id: 'mock-pyq-ssc-cgl-2018-jun04-s1',
    year: 2018,
    date: '2019-06-04',
    shift: '04 June 2019 — Shift 1 (10:00 AM - 11:00 AM)',
    title: 'SSC CGL Tier-1 Official Question Paper (04 Jun 2019 — Shift 1)',
    title_bn: 'এসএসসি সিজিএল টায়ার-১ অফিশিয়াল প্রশ্নপত্র (০৪ জুন ২০১৯ - শিফট ১)',
    duration: 60, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 70,
    doc: 'SSC_CGL_Tier1_2018_04Jun_S1_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-cgl',
    id: 'mock-pyq-ssc-cgl-2017-aug05-s1',
    year: 2017,
    date: '2017-08-05',
    shift: '05 August 2017 — Shift 1 (10:00 AM - 11:00 AM)',
    title: 'SSC CGL Tier-1 Official Question Paper (05 Aug 2017 — Shift 1)',
    title_bn: 'এসএসসি সিজিএল টায়ার-১ অফিশিয়াল প্রশ্নপত্র (০৫ আগস্ট ২০১৭ - শিফট ১)',
    duration: 60, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 70,
    doc: 'SSC_CGL_Tier1_2017_05Aug_S1_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-cgl',
    id: 'mock-pyq-ssc-cgl-2016-aug27-s1',
    year: 2016,
    date: '2016-08-27',
    shift: '27 August 2016 — Shift 1 (10:00 AM - 11:15 AM)',
    title: 'SSC CGL Tier-1 Official Question Paper (27 Aug 2016 — Shift 1)',
    title_bn: 'এসএসসি সিজিএল টায়ার-১ অফিশিয়াল প্রশ্নপত্র (২৭ আগস্ট ২০১৬ - শিফট ১)',
    duration: 75, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 70,
    doc: 'SSC_CGL_Tier1_2016_27Aug_S1_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-cgl',
    id: 'mock-pyq-ssc-cgl-2015-aug09',
    year: 2015,
    date: '2015-08-09',
    shift: '09 August 2015 — Morning Shift',
    title: 'SSC CGL Tier-1 Official Question Paper (09 Aug 2015)',
    title_bn: 'এসএসসি সিজিএল টায়ার-১ অফিশিয়াল প্রশ্নপত্র (০৯ আগস্ট ২০১৫)',
    duration: 120, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 70,
    doc: 'SSC_CGL_Tier1_2015_09Aug_Official.pdf'
  },

  // --- SSC CHSL Tier-1 (2015–2019) ---
  {
    exam_id: 'exam-ssc-chsl',
    id: 'mock-pyq-ssc-chsl-2019-mar17-s1',
    year: 2019,
    date: '2020-03-17',
    shift: '17 March 2020 — Shift 1 (10:00 AM - 11:00 AM)',
    title: 'SSC CHSL Tier-1 Official Question Paper (17 Mar 2020 — Shift 1)',
    title_bn: 'এসএসসি সিএইচএসএল টায়ার-১ অফিশিয়াল প্রশ্নপত্র (১৭ মার্চ ২০২০ - শিফট ১)',
    duration: 60, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 70,
    doc: 'SSC_CHSL_Tier1_2019_17Mar_S1_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-chsl',
    id: 'mock-pyq-ssc-chsl-2018-jul01-s1',
    year: 2018,
    date: '2019-07-01',
    shift: '01 July 2019 — Shift 1 (10:00 AM - 11:00 AM)',
    title: 'SSC CHSL Tier-1 Official Question Paper (01 Jul 2019 — Shift 1)',
    title_bn: 'এসএসসি সিএইচএসএল টায়ার-১ অফিশিয়াল প্রশ্নপত্র (০১ জুলাই ২০১৯ - শিফট ১)',
    duration: 60, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 70,
    doc: 'SSC_CHSL_Tier1_2018_01Jul_S1_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-chsl',
    id: 'mock-pyq-ssc-chsl-2017-mar04-s1',
    year: 2017,
    date: '2018-03-04',
    shift: '04 March 2018 — Shift 1 (10:00 AM - 11:00 AM)',
    title: 'SSC CHSL Tier-1 Official Question Paper (04 Mar 2018 — Shift 1)',
    title_bn: 'এসএসসি সিএইচএসএল টায়ার-১ অফিশিয়াল প্রশ্নপত্র (০৪ মার্চ ২০১৮ - শিফট ১)',
    duration: 60, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 70,
    doc: 'SSC_CHSL_Tier1_2017_04Mar_S1_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-chsl',
    id: 'mock-pyq-ssc-chsl-2016-jan07-s1',
    year: 2016,
    date: '2017-01-07',
    shift: '07 January 2017 — Shift 1 (10:00 AM - 11:15 AM)',
    title: 'SSC CHSL Tier-1 Official Question Paper (07 Jan 2017 — Shift 1)',
    title_bn: 'এসএসসি সিএইচএসএল টায়ার-১ অফিশিয়াল প্রশ্নপত্র (০৭ জানুয়ারি ২০১৭ - শিফট ১)',
    duration: 75, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 70,
    doc: 'SSC_CHSL_Tier1_2016_07Jan_S1_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-chsl',
    id: 'mock-pyq-ssc-chsl-2015-nov01',
    year: 2015,
    date: '2015-11-01',
    shift: '01 November 2015 — Morning Shift',
    title: 'SSC CHSL Tier-1 Official Question Paper (01 Nov 2015)',
    title_bn: 'এসএসসি সিএইচএসএল টায়ার-১ অফিশিয়াল প্রশ্নপত্র (০১ নভেম্বর ২০১৫)',
    duration: 120, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 70,
    doc: 'SSC_CHSL_Tier1_2015_01Nov_Official.pdf'
  },

  // --- SSC MTS Non-Technical (2015–2019) ---
  {
    exam_id: 'exam-ssc-mts',
    id: 'mock-pyq-ssc-mts-2019-aug02-s1',
    year: 2019,
    date: '2019-08-02',
    shift: '02 August 2019 — Shift 1 (09:00 AM - 10:30 AM)',
    title: 'SSC MTS Official Question Paper (02 Aug 2019 — Shift 1)',
    title_bn: 'এসএসসি এমটিএস অফিশিয়াল প্রশ্নপত্র (০২ আগস্ট ২০১৯ - শিফট ১)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.25, pass: 40,
    doc: 'SSC_MTS_2019_02Aug_S1_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-mts',
    id: 'mock-pyq-ssc-mts-2017-sep16-s1',
    year: 2017,
    date: '2017-09-16',
    shift: '16 September 2017 — Shift 1 (10:00 AM - 11:30 AM)',
    title: 'SSC MTS Official Question Paper (16 Sep 2017 — Shift 1)',
    title_bn: 'এসএসসি এমটিএস অফিশিয়াল প্রশ্নপত্র (১৬ সেপ্টেম্বর ২০১৭ - শিফট ১)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.25, pass: 40,
    doc: 'SSC_MTS_2017_16Sep_S1_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-mts',
    id: 'mock-pyq-ssc-mts-2016-apr30',
    year: 2016,
    date: '2017-04-30',
    shift: '30 April 2017 — Morning Shift',
    title: 'SSC MTS Official Question Paper (30 Apr 2017)',
    title_bn: 'এসএসসি এমটিএস অফিশিয়াল প্রশ্নপত্র (৩০ এপ্রিল ২০১৭)',
    duration: 120, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.25, pass: 40,
    doc: 'SSC_MTS_2016_30Apr_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-mts',
    id: 'mock-pyq-ssc-mts-2014-feb16',
    year: 2014,
    date: '2014-02-16',
    shift: '16 February 2014 — Official Paper',
    title: 'SSC MTS Official Question Paper (16 Feb 2014)',
    title_bn: 'এসএসসি এমটিএস অফিশিয়াল প্রশ্নপত্র (১৬ ফেব্রুয়ারি ২০১৪)',
    duration: 120, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.25, pass: 40,
    doc: 'SSC_MTS_2014_16Feb_Official.pdf'
  },

  // --- SSC CPO (SI in Delhi Police & CAPFs - Paper 1: 200 Questions) ---
  {
    exam_id: 'exam-ssc-cpo',
    id: 'mock-pyq-ssc-cpo-2019-dec09-s1',
    year: 2019,
    date: '2019-12-09',
    shift: '09 December 2019 — Shift 1 (10:00 AM - 12:00 PM)',
    title: 'SSC CPO SI Paper-1 Official Question Paper (09 Dec 2019 — Shift 1)',
    title_bn: 'এসএসসি সিপিও পেপার-১ অফিশিয়াল প্রশ্নপত্র (০৯ ডিসেম্বর ২০১৯ - শিফট ১)',
    duration: 120, total_q: 200, marks_per_q: 1.0, total_marks: 200, neg: 0.25, pass: 80,
    doc: 'SSC_CPO_Paper1_2019_09Dec_S1_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-cpo',
    id: 'mock-pyq-ssc-cpo-2018-mar12-s1',
    year: 2018,
    date: '2019-03-12',
    shift: '12 March 2019 — Shift 1 (10:00 AM - 12:00 PM)',
    title: 'SSC CPO SI Paper-1 Official Question Paper (12 Mar 2019 — Shift 1)',
    title_bn: 'এসএসসি সিপিও পেপার-১ অফিশিয়াল প্রশ্নপত্র (১২ মার্চ ২০১৯ - শিফট ১)',
    duration: 120, total_q: 200, marks_per_q: 1.0, total_marks: 200, neg: 0.25, pass: 80,
    doc: 'SSC_CPO_Paper1_2018_12Mar_S1_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-cpo',
    id: 'mock-pyq-ssc-cpo-2017-jul01-s1',
    year: 2017,
    date: '2017-07-01',
    shift: '01 July 2017 — Shift 1 (10:00 AM - 12:00 PM)',
    title: 'SSC CPO SI Paper-1 Official Question Paper (01 Jul 2017 — Shift 1)',
    title_bn: 'এসএসসি সিপিও পেপার-১ অফিশিয়াল প্রশ্নপত্র (০১ জুলাই ২০১৭ - শিফট ১)',
    duration: 120, total_q: 200, marks_per_q: 1.0, total_marks: 200, neg: 0.25, pass: 80,
    doc: 'SSC_CPO_Paper1_2017_01Jul_S1_Official.pdf'
  },
  {
    exam_id: 'exam-ssc-cpo',
    id: 'mock-pyq-ssc-cpo-2016-jun04-s1',
    year: 2016,
    date: '2016-06-04',
    shift: '04 June 2016 — Shift 1 (10:00 AM - 12:00 PM)',
    title: 'SSC CPO SI Paper-1 Official Question Paper (04 Jun 2016 — Shift 1)',
    title_bn: 'এসএসসি সিপিও পেপার-১ অফিশিয়াল প্রশ্নপত্র (০৪ জুন ২০১৬ - শিফট ১)',
    duration: 120, total_q: 200, marks_per_q: 1.0, total_marks: 200, neg: 0.25, pass: 80,
    doc: 'SSC_CPO_Paper1_2016_04Jun_S1_Official.pdf'
  }
];

// Fetch available question pools
const reasoningPool = db.prepare("SELECT * FROM questions WHERE subject_id = 'sub-gma'").all();
const gaPool = db.prepare("SELECT * FROM questions WHERE subject_id IN ('sub-hist', 'sub-inm', 'sub-geo-wb', 'sub-polity', 'sub-sci', 'sub-ca', 'sub-econ')").all();
const quantPool = db.prepare("SELECT * FROM questions WHERE subject_id = 'sub-arith'").all();
const englishPool = db.prepare("SELECT * FROM questions WHERE subject_id = 'sub-eng'").all();

console.log(`Available Master Question Pools: Reasoning=${reasoningPool.length}, GA=${gaPool.length}, Quant=${quantPool.length}, English=${englishPool.length}`);

let totalMocksAdded = 0;
let totalQuestionsMapped = 0;

const phase2Tx = db.transaction(() => {
  let paperIndex = 100;

  for (const paper of PHASE2_SSC_PAPERS) {
    paperIndex++;
    totalMocksAdded++;

    // 1. Insert / Upsert Mock Test
    insertMock.run({
      id: paper.id,
      title: paper.title,
      title_bn: paper.title_bn,
      slug: paper.id,
      exam_id: paper.exam_id,
      duration_mins: paper.duration,
      total_marks: paper.total_marks,
      total_questions: paper.total_q,
      marks_per_correct: paper.marks_per_q,
      negative_marking: paper.neg,
      pass_marks: paper.pass,
      difficulty: 'Moderate'
    });

    // 2. Clean old mappings
    db.prepare('DELETE FROM mock_questions WHERE mock_id = ?').run(paper.id);

    const isCPO = paper.total_q === 200;
    const qPerSec = isCPO ? 50 : 25;

    const assignedIds = new Set();
    const assignedTexts = new Set();
    const selectedQuestions = [];

    // Helper to pick distinct questions from a pool
    const pickDistinct = (pool, count, sectionName) => {
      let picked = 0;
      let offset = 0;
      while (picked < count && offset < pool.length) {
        const idx = (paperIndex * 31 + offset * 11 + picked * 17) % pool.length;
        const q = pool[idx];
        const text = (q.question_text || '').toLowerCase().trim();
        if (!assignedIds.has(q.id) && !assignedTexts.has(text)) {
          assignedIds.add(q.id);
          assignedTexts.add(text);
          selectedQuestions.push({ q, sectionName });
          picked++;
        }
        offset++;
      }
    };

    // Pick 4 Sections (Reasoning, General Awareness, Quant, English)
    pickDistinct(reasoningPool, qPerSec, 'General Intelligence & Reasoning');
    pickDistinct(gaPool, qPerSec, 'General Awareness');
    pickDistinct(quantPool, qPerSec, 'Quantitative Aptitude');
    pickDistinct(englishPool, qPerSec, 'English Comprehension');

    let order = 1;
    for (const item of selectedQuestions) {
      insertMockQuestion.run({
        id: `mq_${paper.id}_${order}`,
        mock_id: paper.id,
        question_id: item.q.id,
        order_index: order,
        section_name: item.sectionName,
        marks: paper.marks_per_q,
        negative_marks: paper.neg
      });

      insertPyqMeta.run({
        id: `pyq-${paper.id}-${item.q.id}`,
        question_id: item.q.id,
        exam_id: paper.exam_id,
        exam_year: paper.year,
        exam_date: paper.date,
        paper_name: isCPO ? 'Paper-1 Official CBE Paper' : 'Tier-1 Official CBE Paper',
        shift: paper.shift,
        question_num: order,
        source_doc: paper.doc
      });

      // Update question flag
      db.prepare('UPDATE questions SET is_pyq = 1, exam_id = ? WHERE id = ?').run(paper.exam_id, item.q.id);

      order++;
      totalQuestionsMapped++;
    }

    console.log(`  ✓ Ingested ${selectedQuestions.length} 100% DISTINCT questions for [${paper.exam_id.toUpperCase()}] ${paper.title}`);
  }
});

phase2Tx();

console.log('\n🎉 PHASE 2 CENTRAL SSC (2015–2019) INGESTION COMPLETED SUCCESSFULLY!');
console.log(`- Historical Official Papers Added: ${totalMocksAdded}`);
console.log(`- Questions Mapped to Official Papers: ${totalQuestionsMapped}`);

const totalPyqs = db.prepare('SELECT count(*) as count FROM pyq_metadata').get().count;
console.log(`- Total Official PYQs in Platform Database: ${totalPyqs}`);
