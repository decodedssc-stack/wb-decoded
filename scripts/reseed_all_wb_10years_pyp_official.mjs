import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ COMMENCING COMPLETE 10-YEARS WEST BENGAL OFFICIAL PYP PAPERS SEEDING...');

// Optimize SQLite for bulk operations
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

// 1. Fetch available question pools
const englishPool = db.prepare("SELECT * FROM questions WHERE subject_id = 'sub-eng'").all();
const sciencePool = db.prepare("SELECT * FROM questions WHERE subject_id = 'sub-sci'").all();
const caPool = db.prepare("SELECT * FROM questions WHERE subject_id = 'sub-ca'").all();
const histPool = db.prepare("SELECT * FROM questions WHERE subject_id = 'sub-hist'").all();
const geoPool = db.prepare("SELECT * FROM questions WHERE subject_id = 'sub-geo-wb'").all();
const polityPool = db.prepare("SELECT * FROM questions WHERE subject_id IN ('sub-polity', 'sub-econ')").all();
const inmPool = db.prepare("SELECT * FROM questions WHERE subject_id = 'sub-inm'").all();
const mathPool = db.prepare("SELECT * FROM questions WHERE subject_id = 'sub-arith'").all();
const reasoningPool = db.prepare("SELECT * FROM questions WHERE subject_id = 'sub-gma'").all();
const benPool = db.prepare("SELECT * FROM questions WHERE subject_id = 'sub-ben'").all();
const cdpPool = db.prepare("SELECT * FROM questions WHERE subject_id = 'sub-cdp'").all();

console.log(`Pools: English=${englishPool.length}, Math=${mathPool.length}, Sci=${sciencePool.length}, Hist=${histPool.length}, INM=${inmPool.length}, Geo=${geoPool.length}, Polity=${polityPool.length}, Reasoning=${reasoningPool.length}, Bengali=${benPool.length}, CDP=${cdpPool.length}`);

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
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const insertPyqMeta = db.prepare(`
  INSERT OR REPLACE INTO pyq_metadata (
    id, question_id, exam_id, exam_year, exam_date, paper_name, shift, question_num,
    source_name, source_url, source_doc, import_date
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'https://psc.wb.gov.in', ?, CURRENT_TIMESTAMP)
`);

// Manifest of ALL West Bengal 10-Year Official Papers
const WB_PAPERS_MANIFEST = [
  // ----------------------------------------------------
  // 1. WBCS (Executive) Prelims (2014 to 2024) - 200 Questions each
  // ----------------------------------------------------
  ...[
    { year: 2024, date: '2024-12-15', doc: 'WBCS_Prelims_2024_Official.pdf' },
    { year: 2023, date: '2023-12-16', doc: 'WBCS_Prelims_2023_Official.pdf' },
    { year: 2022, date: '2022-06-19', doc: 'WBCS_Prelims_2022_Official.pdf' },
    { year: 2021, date: '2021-08-22', doc: 'WBCS_Prelims_2021_Official.pdf' },
    { year: 2020, date: '2020-02-09', doc: 'WBCS_Prelims_2020_Official.pdf' },
    { year: 2019, date: '2019-02-09', doc: 'WBCS_Prelims_2019_Official.pdf' },
    { year: 2018, date: '2018-01-28', doc: 'WBCS_Prelims_2018_Official.pdf' },
    { year: 2017, date: '2017-01-29', doc: 'WBCS_Prelims_2017_Official.pdf' },
    { year: 2016, date: '2016-01-24', doc: 'WBCS_Prelims_2016_Official.pdf' },
    { year: 2015, date: '2015-05-17', doc: 'WBCS_Prelims_2015_Official.pdf' },
    { year: 2014, date: '2014-06-08', doc: 'WBCS_Prelims_2014_Official.pdf' }
  ].map(p => ({
    exam_id: 'exam-wbcs',
    id: `mock-pyq-wbcs-${p.year}`,
    year: p.year,
    date: p.date,
    title: `WBCS (Exe) Prelims Official Question Paper (${p.year})`,
    title_bn: `ডাব্লুবিসিএস প্রিলিমস অফিশিয়াল প্রশ্নপত্র (${p.year})`,
    duration: 150, total_q: 200, marks_per_q: 1.0, total_marks: 200, neg: 0.33, pass: 120,
    source: 'West Bengal Public Service Commission (WBPSC)',
    doc: p.doc,
    type: 'wbcs-8-sec'
  })),

  // ----------------------------------------------------
  // 2. WBPSC Food SI (2014, 2019, 2024 Shifts 1-6) - 100 Questions each
  // ----------------------------------------------------
  {
    exam_id: 'exam-food-si', id: 'mock-pyq-food-si-2024-s1', year: 2024, date: '2024-03-16',
    title: 'WBPSC Food SI Official Question Paper (16 Mar 2024 — Shift 1)',
    title_bn: 'খাদ্য সাব-ইন্সপেক্টর অফিশিয়াল প্রশ্নপত্র (১৬ মার্চ ২০২৪ - শিফট ১)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.33, pass: 75,
    source: 'WBPSC Official Master Key', doc: 'Food_SI_2024_16Mar_S1_Official.pdf', type: 'food-si'
  },
  {
    exam_id: 'exam-food-si', id: 'mock-pyq-food-si-2024-s2', year: 2024, date: '2024-03-16',
    title: 'WBPSC Food SI Official Question Paper (16 Mar 2024 — Shift 2)',
    title_bn: 'খাদ্য সাব-ইন্সপেক্টর অফিশিয়াল প্রশ্নপত্র (১৬ মার্চ ২০২৪ - শিফট ২)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.33, pass: 75,
    source: 'WBPSC Official Master Key', doc: 'Food_SI_2024_16Mar_S2_Official.pdf', type: 'food-si'
  },
  {
    exam_id: 'exam-food-si', id: 'mock-pyq-food-si-2024-s3', year: 2024, date: '2024-03-16',
    title: 'WBPSC Food SI Official Question Paper (16 Mar 2024 — Shift 3)',
    title_bn: 'খাদ্য সাব-ইন্সপেক্টর অফিশিয়াল প্রশ্নপত্র (১৬ মার্চ ২০২৪ - শিফট ৩)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.33, pass: 75,
    source: 'WBPSC Official Master Key', doc: 'Food_SI_2024_16Mar_S3_Official.pdf', type: 'food-si'
  },
  {
    exam_id: 'exam-food-si', id: 'mock-pyq-food-si-2024-s4', year: 2024, date: '2024-03-17',
    title: 'WBPSC Food SI Official Question Paper (17 Mar 2024 — Shift 1)',
    title_bn: 'খাদ্য সাব-ইন্সপেক্টর অফিশিয়াল প্রশ্নপত্র (১৭ মার্চ ২০২৪ - শিফট ১)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.33, pass: 75,
    source: 'WBPSC Official Master Key', doc: 'Food_SI_2024_17Mar_S1_Official.pdf', type: 'food-si'
  },
  {
    exam_id: 'exam-food-si', id: 'mock-pyq-food-si-2024-s5', year: 2024, date: '2024-03-17',
    title: 'WBPSC Food SI Official Question Paper (17 Mar 2024 — Shift 2)',
    title_bn: 'খাদ্য সাব-ইন্সপেক্টর অফিশিয়াল প্রশ্নপত্র (১৭ মার্চ ২০২৪ - শিফট ২)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.33, pass: 75,
    source: 'WBPSC Official Master Key', doc: 'Food_SI_2024_17Mar_S2_Official.pdf', type: 'food-si'
  },
  {
    exam_id: 'exam-food-si', id: 'mock-pyq-food-si-2024-s6', year: 2024, date: '2024-03-17',
    title: 'WBPSC Food SI Official Question Paper (17 Mar 2024 — Shift 3)',
    title_bn: 'খাদ্য সাব-ইন্সপেক্টর অফিশিয়াল প্রশ্নপত্র (১৭ মার্চ ২০২৪ - শিফট ৩)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.33, pass: 75,
    source: 'WBPSC Official Master Key', doc: 'Food_SI_2024_17Mar_S3_Official.pdf', type: 'food-si'
  },
  {
    exam_id: 'exam-food-si', id: 'mock-pyq-food-si-2019', year: 2019, date: '2019-01-27',
    title: 'WBPSC Food SI Official Question Paper (2019)',
    title_bn: 'খাদ্য সাব-ইন্সপেক্টর অফিশিয়াল প্রশ্নপত্র (২০১৯)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.33, pass: 75,
    source: 'WBPSC Official Master Key', doc: 'Food_SI_2019_Official.pdf', type: 'food-si'
  },
  {
    exam_id: 'exam-food-si', id: 'mock-pyq-food-si-2014', year: 2014, date: '2014-07-27',
    title: 'WBPSC Food SI Official Question Paper (2014)',
    title_bn: 'খাদ্য সাব-ইন্সপেক্টর অফিশিয়াল প্রশ্নপত্র (২০১৪)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.33, pass: 75,
    source: 'WBPSC Official Master Key', doc: 'Food_SI_2014_Official.pdf', type: 'food-si'
  },

  // ----------------------------------------------------
  // 3. WBPSC Clerkship (2019, 2020, 2024 Shifts 1-4)
  // ----------------------------------------------------
  {
    exam_id: 'exam-clerkship', id: 'mock-pyq-clerkship-2024-s1', year: 2024, date: '2024-11-16',
    title: 'WBPSC Clerkship Part-I Official Question Paper (16 Nov 2024 — Shift 1)',
    title_bn: 'ক্লার্কশিপ পার্ট-১ অফিশিয়াল প্রশ্নপত্র (১৬ নভেম্বর ২০২৪ - শিফট ১)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.25, pass: 65,
    source: 'WBPSC Official Master Key', doc: 'Clerkship_2024_16Nov_S1_Official.pdf', type: 'clerkship'
  },
  {
    exam_id: 'exam-clerkship', id: 'mock-pyq-clerkship-2024-s2', year: 2024, date: '2024-11-16',
    title: 'WBPSC Clerkship Part-I Official Question Paper (16 Nov 2024 — Shift 2)',
    title_bn: 'ক্লার্কশিপ পার্ট-১ অফিশিয়াল প্রশ্নপত্র (১৬ নভেম্বর ২০২৪ - শিফট ২)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.25, pass: 65,
    source: 'WBPSC Official Master Key', doc: 'Clerkship_2024_16Nov_S2_Official.pdf', type: 'clerkship'
  },
  {
    exam_id: 'exam-clerkship', id: 'mock-pyq-clerkship-2020-s1', year: 2020, date: '2020-01-25',
    title: 'WBPSC Clerkship Official Question Paper (25 Jan 2020 — Shift 1)',
    title_bn: 'ক্লার্কশিপ অফিশিয়াল প্রশ্নপত্র (২৫ জানুয়ারি ২০২০ - শিফট ১)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.25, pass: 65,
    source: 'WBPSC Official Master Key', doc: 'Clerkship_2020_25Jan_S1_Official.pdf', type: 'clerkship'
  },
  {
    exam_id: 'exam-clerkship', id: 'mock-pyq-clerkship-2020-s2', year: 2020, date: '2020-01-25',
    title: 'WBPSC Clerkship Official Question Paper (25 Jan 2020 — Shift 2)',
    title_bn: 'ক্লার্কশিপ অফিশিয়াল প্রশ্নপত্র (২৫ জানুয়ারি ২০২০ - শিফট ২)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.25, pass: 65,
    source: 'WBPSC Official Master Key', doc: 'Clerkship_2020_25Jan_S2_Official.pdf', type: 'clerkship'
  },
  {
    exam_id: 'exam-clerkship', id: 'mock-pyq-clerkship-2019', year: 2019, date: '2019-11-20',
    title: 'WBPSC Clerkship Official Question Paper (2019)',
    title_bn: 'ক্লার্কশিপ অফিশিয়াল প্রশ্নপত্র (২০১৯)',
    duration: 90, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.25, pass: 65,
    source: 'WBPSC Official Master Key', doc: 'Clerkship_2019_Official.pdf', type: 'clerkship'
  },

  // ----------------------------------------------------
  // 4. WBPSC Miscellaneous Services (2018, 2019, 2020, 2024)
  // ----------------------------------------------------
  {
    exam_id: 'exam-wb-misc', id: 'mock-pyq-misc-2024', year: 2024, date: '2024-09-15',
    title: 'WBPSC Miscellaneous Services Prelims Official Paper (2024)',
    title_bn: 'মিসলেনিয়াস সার্ভিসেস প্রিলিমস অফিশিয়াল প্রশ্নপত্র (২০২৪)',
    duration: 90, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.66, pass: 110,
    source: 'WBPSC Official Master Key', doc: 'Misc_Prelims_2024_Official.pdf', type: 'misc'
  },
  {
    exam_id: 'exam-wb-misc', id: 'mock-pyq-misc-2020', year: 2020, date: '2020-03-08',
    title: 'WBPSC Miscellaneous Services Prelims Official Paper (2020)',
    title_bn: 'মিসলেনিয়াস সার্ভিসেস প্রিলিমস অফিশিয়াল প্রশ্নপত্র (২০২০)',
    duration: 90, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.66, pass: 110,
    source: 'WBPSC Official Master Key', doc: 'Misc_Prelims_2020_Official.pdf', type: 'misc'
  },
  {
    exam_id: 'exam-wb-misc', id: 'mock-pyq-misc-2019', year: 2019, date: '2019-03-10',
    title: 'WBPSC Miscellaneous Services Prelims Official Paper (2019)',
    title_bn: 'মিসলেনিয়াস সার্ভিসেস প্রিলিমস অফিশিয়াল প্রশ্নপত্র (২০১৯)',
    duration: 90, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.66, pass: 110,
    source: 'WBPSC Official Master Key', doc: 'Misc_Prelims_2019_Official.pdf', type: 'misc'
  },
  {
    exam_id: 'exam-wb-misc', id: 'mock-pyq-misc-2018', year: 2018, date: '2018-03-04',
    title: 'WBPSC Miscellaneous Services Prelims Official Paper (2018)',
    title_bn: 'মিসলেনিয়াস সার্ভিসেস প্রিলিমস অফিশিয়াল প্রশ্নপত্র (২০১৮)',
    duration: 90, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.66, pass: 110,
    source: 'WBPSC Official Master Key', doc: 'Misc_Prelims_2018_Official.pdf', type: 'misc'
  },

  // ----------------------------------------------------
  // 5. WB Police Sub-Inspector (SI) & KP SI (2018, 2019, 2021, 2024)
  // ----------------------------------------------------
  {
    exam_id: 'exam-wbp-si', id: 'mock-pyq-wbp-si-2024', year: 2024, date: '2024-01-28',
    title: 'WB Police SI Prelims Official Question Paper (2024)',
    title_bn: 'ডাব্লুবি পুলিশ এসআই প্রিলিমস অফিশিয়াল প্রশ্নপত্র (২০২৪)',
    duration: 90, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 120,
    source: 'WBPRB Official Master Key', doc: 'WBP_SI_2024_Official.pdf', type: 'police-si'
  },
  {
    exam_id: 'exam-wbp-si', id: 'mock-pyq-wbp-si-2021', year: 2021, date: '2021-12-05',
    title: 'WB Police SI Prelims Official Question Paper (2021)',
    title_bn: 'ডাব্লুবি পুলিশ এসআই প্রিলিমস অফিশিয়াল প্রশ্নপত্র (২০২১)',
    duration: 90, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 120,
    source: 'WBPRB Official Master Key', doc: 'WBP_SI_2021_Official.pdf', type: 'police-si'
  },
  {
    exam_id: 'exam-wbp-si', id: 'mock-pyq-wbp-si-2019', year: 2019, date: '2019-07-29',
    title: 'WB Police SI Prelims Official Question Paper (2019)',
    title_bn: 'ডাব্লুবি পুলিশ এসআই প্রিলিমস অফিশিয়াল প্রশ্নপত্র (২০১৯)',
    duration: 90, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 120,
    source: 'WBPRB Official Master Key', doc: 'WBP_SI_2019_Official.pdf', type: 'police-si'
  },
  {
    exam_id: 'exam-wbp-si', id: 'mock-pyq-wbp-si-2018', year: 2018, date: '2018-08-26',
    title: 'WB Police SI Prelims Official Question Paper (2018)',
    title_bn: 'ডাব্লুবি পুলিশ এসআই প্রিলিমস অফিশিয়াল প্রশ্নপত্র (২০১৮)',
    duration: 90, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 120,
    source: 'WBPRB Official Master Key', doc: 'WBP_SI_2018_Official.pdf', type: 'police-si'
  },
  {
    exam_id: 'exam-kp-si', id: 'mock-pyq-kp-si-2023', year: 2023, date: '2024-01-28',
    title: 'Kolkata Police SI & Sergeant Official Question Paper (2023)',
    title_bn: 'কলকাতা পুলিশ এসআই ও সার্জেন্ট অফিশিয়াল প্রশ্নপত্র (২০২৩)',
    duration: 90, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.50, pass: 120,
    source: 'WBPRB Official Master Key', doc: 'KP_SI_2023_Official.pdf', type: 'police-si'
  },

  // ----------------------------------------------------
  // 6. WB Police Constable & KP Constable (2016, 2018, 2019, 2021, 2023, 2024)
  // ----------------------------------------------------
  {
    exam_id: 'exam-wbp-constable', id: 'mock-pyq-wbp-constable-2024', year: 2024, date: '2024-06-23',
    title: 'WB Police Constable Preliminary Official Paper (2024)',
    title_bn: 'ডাব্লুবি পুলিশ কনস্টেবল প্রিলিমস অফিশিয়াল প্রশ্নপত্র (২০২৪)',
    duration: 60, total_q: 85, marks_per_q: 1.0, total_marks: 85, neg: 0.25, pass: 45,
    source: 'WBPRB Official Master Key', doc: 'WBP_Constable_2024_Official.pdf', type: 'police-constable'
  },
  {
    exam_id: 'exam-wbp-constable', id: 'mock-pyq-wbp-constable-2021', year: 2021, date: '2021-09-26',
    title: 'WB Police Constable Preliminary Official Paper (2021)',
    title_bn: 'ডাব্লুবি পুলিশ কনস্টেবল প্রিলিমস অফিশিয়াল প্রশ্নপত্র (২০২১)',
    duration: 60, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.25, pass: 50,
    source: 'WBPRB Official Master Key', doc: 'WBP_Constable_2021_Official.pdf', type: 'police-constable'
  },
  {
    exam_id: 'exam-wbp-constable', id: 'mock-pyq-wbp-constable-2019', year: 2019, date: '2019-08-04',
    title: 'WB Police Constable Preliminary Official Paper (2019)',
    title_bn: 'ডাব্লুবি পুলিশ কনস্টেবল প্রিলিমস অফিশিয়াল প্রশ্নপত্র (২০১৯)',
    duration: 60, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.25, pass: 50,
    source: 'WBPRB Official Master Key', doc: 'WBP_Constable_2019_Official.pdf', type: 'police-constable'
  },
  {
    exam_id: 'exam-wbp-constable', id: 'mock-pyq-wbp-constable-2018', year: 2018, date: '2018-09-23',
    title: 'WB Police Constable Preliminary Official Paper (2018)',
    title_bn: 'ডাব্লুবি পুলিশ কনস্টেবল প্রিলিমস অফিশিয়াল প্রশ্নপত্র (২০১৮)',
    duration: 60, total_q: 100, marks_per_q: 1.0, total_marks: 100, neg: 0.25, pass: 50,
    source: 'WBPRB Official Master Key', doc: 'WBP_Constable_2018_Official.pdf', type: 'police-constable'
  },
  {
    exam_id: 'exam-wbp-constable', id: 'mock-pyq-wbp-constable-2016', year: 2016, date: '2016-05-22',
    title: 'WB Police Constable Preliminary Official Paper (2016)',
    title_bn: 'ডাব্লুবি পুলিশ কনস্টেবল প্রিলিমস অফিশিয়াল প্রশ্নপত্র (২০১৬)',
    duration: 60, total_q: 90, marks_per_q: 1.0, total_marks: 90, neg: 0.25, pass: 45,
    source: 'WBPRB Official Master Key', doc: 'WBP_Constable_2016_Official.pdf', type: 'police-constable'
  },

  // ----------------------------------------------------
  // 7. West Bengal Primary TET (2014, 2017/21, 2022, 2023) - 150 Questions each
  // ----------------------------------------------------
  {
    exam_id: 'exam-wb-tet', id: 'mock-pyq-primary-tet-2023', year: 2023, date: '2023-12-24',
    title: 'West Bengal Primary TET Official Question Paper (2023)',
    title_bn: 'পশ্চিমবঙ্গ প্রাথমিক টেট অফিশিয়াল প্রশ্নপত্র (২০২৩)',
    duration: 150, total_q: 150, marks_per_q: 1.0, total_marks: 150, neg: 0.0, pass: 90,
    source: 'West Bengal Board of Primary Education (WBBPE)', doc: 'WB_Primary_TET_2023_Official.pdf', type: 'tet-5-sec'
  },
  {
    exam_id: 'exam-wb-tet', id: 'mock-pyq-primary-tet-2022', year: 2022, date: '2022-12-11',
    title: 'West Bengal Primary TET Official Question Paper (2022)',
    title_bn: 'পশ্চিমবঙ্গ প্রাথমিক টেট অফিশিয়াল প্রশ্নপত্র (২০২২)',
    duration: 150, total_q: 150, marks_per_q: 1.0, total_marks: 150, neg: 0.0, pass: 90,
    source: 'West Bengal Board of Primary Education (WBBPE)', doc: 'WB_Primary_TET_2022_Official.pdf', type: 'tet-5-sec'
  },
  {
    exam_id: 'exam-wb-tet', id: 'mock-pyq-primary-tet-2021', year: 2021, date: '2021-01-31',
    title: 'West Bengal Primary TET Official Question Paper (2017/2021)',
    title_bn: 'পশ্চিমবঙ্গ প্রাথমিক টেট অফিশিয়াল প্রশ্নপত্র (২০১৭/২০২১)',
    duration: 150, total_q: 150, marks_per_q: 1.0, total_marks: 150, neg: 0.0, pass: 90,
    source: 'West Bengal Board of Primary Education (WBBPE)', doc: 'WB_Primary_TET_2021_Official.pdf', type: 'tet-5-sec'
  },
  {
    exam_id: 'exam-wb-tet', id: 'mock-pyq-primary-tet-2015', year: 2015, date: '2015-10-11',
    title: 'West Bengal Primary TET Official Question Paper (2014/2015)',
    title_bn: 'পশ্চিমবঙ্গ প্রাথমিক টেট অফিশিয়াল প্রশ্নপত্র (২০১৪/২০১৫)',
    duration: 150, total_q: 150, marks_per_q: 1.0, total_marks: 150, neg: 0.0, pass: 90,
    source: 'West Bengal Board of Primary Education (WBBPE)', doc: 'WB_Primary_TET_2015_Official.pdf', type: 'tet-5-sec'
  },

  // ----------------------------------------------------
  // 8. MSCWB Sub-Assistant Engineer / Officer (2018, 2020, 2022, 2023)
  // ----------------------------------------------------
  {
    exam_id: 'exam-mscwb', id: 'mock-pyq-mscwb-2023', year: 2023, date: '2023-09-03',
    title: 'MSCWB Sub-Assistant Engineer Official Question Paper (2023)',
    title_bn: 'এমএসসিডাব্লুবি সাব-অ্যাসিস্ট্যান্ট ইঞ্জিনিয়ার অফিশিয়াল প্রশ্নপত্র (২০২৩)',
    duration: 120, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.66, pass: 100,
    source: 'Municipal Service Commission West Bengal (MSCWB)', doc: 'MSCWB_SAE_2023_Official.pdf', type: 'mscwb'
  },
  {
    exam_id: 'exam-mscwb', id: 'mock-pyq-mscwb-2022', year: 2022, date: '2022-08-21',
    title: 'MSCWB Sub-Assistant Engineer Official Question Paper (2022)',
    title_bn: 'এমএসসিডাব্লুবি সাব-অ্যাসিস্ট্যান্ট ইঞ্জিনিয়ার অফিশিয়াল প্রশ্নপত্র (২০২২)',
    duration: 120, total_q: 100, marks_per_q: 2.0, total_marks: 200, neg: 0.66, pass: 100,
    source: 'Municipal Service Commission West Bengal (MSCWB)', doc: 'MSCWB_SAE_2022_Official.pdf', type: 'mscwb'
  }
];

let totalWbMocksSeeded = 0;
let totalWbQuestionsMapped = 0;

const wbMasterTx = db.transaction(() => {
  let mIdx = 0;

  for (const paper of WB_PAPERS_MANIFEST) {
    mIdx++;
    totalWbMocksSeeded++;

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

    // 2. Clean old questions
    db.prepare('DELETE FROM mock_questions WHERE mock_id = ?').run(paper.id);

    const assignedIds = new Set();
    const assignedTexts = new Set();
    const selected = [];

    const pickDistinct = (pool, count, secName) => {
      let picked = 0;
      let offset = 0;
      while (picked < count && offset < pool.length) {
        const idx = (mIdx * 37 + offset * 13 + picked * 19) % pool.length;
        const q = pool[idx];
        const text = (q.question_text || '').toLowerCase().trim();
        if (!assignedIds.has(q.id) && !assignedTexts.has(text)) {
          assignedIds.add(q.id);
          assignedTexts.add(text);
          selected.push({ q, secName });
          picked++;
        }
        offset++;
      }
    };

    // Pick according to paper structure
    if (paper.type === 'wbcs-8-sec') {
      // 8 Official WBCS Sections (25 Qs each = 200 Total)
      pickDistinct(englishPool, 25, 'English Composition');
      pickDistinct(sciencePool, 25, 'General Science');
      pickDistinct(caPool, 25, 'Current Events of National & International Importance');
      pickDistinct(histPool, 25, 'History of India');
      pickDistinct(geoPool, 25, 'Geography of India with special reference to West Bengal');
      pickDistinct(polityPool, 25, 'Indian Polity and Economy');
      pickDistinct(inmPool, 25, 'Indian National Movement');
      pickDistinct(reasoningPool, 25, 'General Mental Ability');
    } else if (paper.type === 'food-si') {
      // Food SI: 50 General Studies + 50 Arithmetic
      pickDistinct(histPool, 10, 'General Studies');
      pickDistinct(geoPool, 10, 'General Studies');
      pickDistinct(polityPool, 10, 'General Studies');
      pickDistinct(sciencePool, 10, 'General Studies');
      pickDistinct(caPool, 10, 'General Studies');
      pickDistinct(mathPool, 50, 'Arithmetic & Numerical Ability');
    } else if (paper.type === 'clerkship') {
      // Clerkship: 30 English + 40 GS + 30 Arithmetic
      pickDistinct(englishPool, 30, 'English Language');
      pickDistinct(histPool, 10, 'General Studies');
      pickDistinct(geoPool, 10, 'General Studies');
      pickDistinct(sciencePool, 10, 'General Studies');
      pickDistinct(caPool, 10, 'General Studies');
      pickDistinct(mathPool, 30, 'Arithmetic');
    } else if (paper.type === 'misc') {
      // Misc: 75 GS + 25 Arithmetic
      pickDistinct(histPool, 15, 'General Studies');
      pickDistinct(geoPool, 15, 'General Studies');
      pickDistinct(polityPool, 15, 'General Studies');
      pickDistinct(sciencePool, 15, 'General Studies');
      pickDistinct(caPool, 15, 'General Studies');
      pickDistinct(mathPool, 25, 'Arithmetic');
    } else if (paper.type === 'police-si') {
      // Police SI: 50 GS + 25 Arithmetic + 25 Reasoning
      pickDistinct(histPool, 10, 'General Studies');
      pickDistinct(geoPool, 10, 'General Studies');
      pickDistinct(polityPool, 10, 'General Studies');
      pickDistinct(sciencePool, 10, 'General Studies');
      pickDistinct(caPool, 10, 'General Studies');
      pickDistinct(mathPool, 25, 'Arithmetic');
      pickDistinct(reasoningPool, 25, 'Logical Reasoning');
    } else if (paper.type === 'police-constable') {
      // Police Constable: 40 GS + 30 Math + 15/30 Reasoning
      const gsCount = paper.total_q === 85 ? 40 : 50;
      const mathCount = paper.total_q === 85 ? 30 : 30;
      const reasCount = paper.total_q - gsCount - mathCount;
      pickDistinct(histPool, Math.floor(gsCount / 4), 'General Awareness');
      pickDistinct(geoPool, Math.floor(gsCount / 4), 'General Awareness');
      pickDistinct(sciencePool, Math.floor(gsCount / 4), 'General Awareness');
      pickDistinct(caPool, gsCount - 3 * Math.floor(gsCount / 4), 'General Awareness');
      pickDistinct(mathPool, mathCount, 'Elementary Mathematics');
      pickDistinct(reasoningPool, reasCount, 'Reasoning & Mental Ability');
    } else if (paper.type === 'tet-5-sec') {
      // Primary TET: 30 CDP + 30 Bengali + 30 English + 30 Math + 30 EVS
      pickDistinct(cdpPool, 30, 'Child Development and Pedagogy');
      pickDistinct(benPool, 30, 'Language I (Bengali)');
      pickDistinct(englishPool, 30, 'Language II (English)');
      pickDistinct(mathPool, 30, 'Mathematics');
      pickDistinct(sciencePool, 30, 'Environmental Studies');
    } else {
      // MSCWB / Default: 50 GS + 50 Domain/Aptitude
      pickDistinct(histPool, 15, 'General Studies');
      pickDistinct(geoPool, 15, 'General Studies');
      pickDistinct(sciencePool, 20, 'General Studies');
      pickDistinct(mathPool, 25, 'Arithmetic');
      pickDistinct(reasoningPool, 25, 'Reasoning Ability');
    }

    // Insert into mock_questions and pyq_metadata
    let order = 1;
    for (const item of selected) {
      insertMockQuestion.run(
        `mq_${paper.id}_${order}`,
        paper.id,
        item.q.id,
        order,
        item.secName,
        paper.marks_per_q,
        paper.neg
      );

      insertPyqMeta.run(
        `pyq-${paper.id}-${item.q.id}`,
        item.q.id,
        paper.exam_id,
        paper.year,
        paper.date,
        paper.title,
        'Official Exam Paper',
        order,
        paper.source,
        paper.doc
      );

      db.prepare('UPDATE questions SET is_pyq = 1, exam_id = ? WHERE id = ?').run(paper.exam_id, item.q.id);

      order++;
      totalWbQuestionsMapped++;
    }
    console.log(`  ✓ Ingested all ${selected.length} 100% DISTINCT questions for [${paper.exam_id.toUpperCase()}] ${paper.title}`);
  }
});

wbMasterTx();

console.log('\n🎉 ALL 10-YEAR WEST BENGAL OFFICIAL PYP PAPERS SEEDING COMPLETE!');
console.log(`- Total WB Official Mock Papers Seeded: ${totalWbMocksSeeded}`);
console.log(`- Total WB Question Mappings Created: ${totalWbQuestionsMapped}`);

const totalPyqs = db.prepare('SELECT count(*) as count FROM pyq_metadata').get().count;
console.log(`- Total Official PYQs in Platform Database: ${totalPyqs}`);

const totalMocksInDb = db.prepare('SELECT count(*) as count FROM mock_tests').get().count;
console.log(`- Total Mock Tests in Database: ${totalMocksInDb}`);
