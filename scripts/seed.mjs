import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDirectory = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

const dbPath = path.join(dbDirectory, 'wb_decoded.sqlite');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

console.log('🌱 Starting DB Seeding...');

// Load schema
const { initSchema } = await import('../src/lib/db.ts');
initSchema(db);

// Clean up existing tables to ensure clean seed
db.transaction(() => {
  db.exec(`
    DELETE FROM attempt_answers;
    DELETE FROM test_attempts;
    DELETE FROM mistake_book;
    DELETE FROM weak_areas;
    DELETE FROM mock_questions;
    DELETE FROM mock_tests;
    DELETE FROM pyq_metadata;
    DELETE FROM question_reports;
    DELETE FROM questions;
    DELETE FROM exam_patterns;
    DELETE FROM subtopics;
    DELETE FROM topics;
    DELETE FROM chapters;
    DELETE FROM subjects;
    DELETE FROM papers;
    DELETE FROM stages;
    DELETE FROM exams;
    DELETE FROM exam_categories;
    DELETE FROM admins;
    DELETE FROM users;
    DELETE FROM source_registry;
    DELETE FROM automation_runs;
    DELETE FROM exam_updates;
    DELETE FROM daily_challenges;
    DELETE FROM current_affairs_items;
    DELETE FROM audit_logs;
  `);

  // 1. Admins & Users
  const insertAdmin = db.prepare(`
    INSERT INTO admins (id, name, email, role, status, last_login_at)
    VALUES (?, ?, ?, ?, ?, datetime('now', '-2 hours'))
  `);
  insertAdmin.run('adm-1', 'Sourav Mukherjee (Super Admin)', 'admin@wbdecoded.com', 'Super Admin', 'active');
  insertAdmin.run('adm-2', 'Priya Sen (Chief Reviewer)', 'priya@wbdecoded.com', 'Reviewer', 'active');
  insertAdmin.run('adm-3', 'Anirban Ghosh (Content Manager)', 'anirban@wbdecoded.com', 'Content Manager', 'active');
  insertAdmin.run('adm-4', 'Rituja Roy (Data Analyst)', 'rituja@wbdecoded.com', 'Analyst', 'active');

  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, role, avatar, phone, is_anonymous, target_exam_id, streak_days, xp_points)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertUser.run('usr-1', 'Debjit Roy', 'debjit@example.com', 'student', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', '9876543210', 0, 'exam-wbcs', 14, 1420);
  insertUser.run('usr-2', 'Sneha Banerjee', 'sneha@example.com', 'student', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', '9876543211', 0, 'exam-wbcs', 28, 2890);
  insertUser.run('usr-3', 'Rahul Chatterjee', 'rahul@example.com', 'student', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', '9876543212', 0, 'exam-wbp-si', 7, 950);
  insertUser.run('usr-4', 'Puja Das', 'puja@example.com', 'student', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', '9876543213', 0, 'exam-food-si', 19, 1840);
  insertUser.run('usr-5', 'Subhajit Paul', 'subhajit@example.com', 'student', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', '9876543214', 0, 'exam-clerkship', 3, 420);

  // 2. Exam Categories (100% West Bengal State Exam Authorities)
  const insertCat = db.prepare(`
    INSERT INTO exam_categories (id, name, slug, description, icon, order_index)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertCat.run('cat-wbpsc', 'West Bengal PSC & Civil Services', 'wbpsc', 'Flagship West Bengal administrative, executive and clerical exams conducted by WBPSC', 'Landmark', 1);
  insertCat.run('cat-police', 'West Bengal Police Recruitment (WBPRB)', 'police', 'Sub-Inspector, Constable, and Kolkata Police uniformed forces recruitment', 'Shield', 2);
  insertCat.run('cat-teaching', 'West Bengal School Education (WBBPE / WBSSC)', 'teaching', 'Primary TET, Upper Primary, and SLST teacher recruitment in West Bengal', 'GraduationCap', 3);
  insertCat.run('cat-municipal', 'West Bengal Municipal & Local Bodies (MSCWB)', 'municipal', 'Kolkata Municipal Corporation and state municipal services recruitment', 'Building2', 4);

  // 3. Exams (Exclusive to West Bengal State)
  const insertExam = db.prepare(`
    INSERT INTO exams (id, category_id, name, slug, authority, description, syllabus, official_website, notification_url, icon, banner, color_theme, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertExam.run(
    'exam-wbcs',
    'cat-wbpsc',
    'WBCS (Exe) Examination',
    'wbcs-exam',
    'West Bengal Public Service Commission (WBPSC)',
    'The premier civil service examination in West Bengal for Group A (Executive), B (WBP SI), C, and D administrative posts.',
    'Prelims covers 8 subjects (English, General Science, History, National Movement, Geography of India & WB, Indian Polity & Economy, General Mental Ability, Current Affairs) of 25 marks each.',
    'https://psc.wb.gov.in',
    'https://psc.wb.gov.in/notices',
    'Award',
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800',
    '#1E3A8A',
    1
  );

  insertExam.run(
    'exam-food-si',
    'cat-wbpsc',
    'WBPSC Food SI (Grade-III)',
    'wbpsc-food-si',
    'West Bengal Public Service Commission (WBPSC)',
    'Sub-Inspector in the Subordinate Food & Supplies Service, Grade-III under Food & Supplies Department, Govt of WB.',
    'Single written examination comprising 100 MCQs: 50 General Studies questions + 50 Arithmetic & Numeracy questions (90 minutes duration).',
    'https://psc.wb.gov.in',
    'https://psc.wb.gov.in/notices',
    'Utensils',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800',
    '#D97706',
    1
  );

  insertExam.run(
    'exam-clerkship',
    'cat-wbpsc',
    'WBPSC Clerkship Examination',
    'wbpsc-clerkship',
    'West Bengal Public Service Commission (WBPSC)',
    'Statewide recruitment for Lower Division Clerk (LDC) and allied office assistant posts across WB Govt secretariats and directorates.',
    'Part-I Objective: English (30 Marks), General Studies (40 Marks), Arithmetic (30 Marks). Part-II: Conventional written test in English and Bengali/Hindi/Urdu.',
    'https://psc.wb.gov.in',
    'https://psc.wb.gov.in/notices',
    'FileText',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800',
    '#4338CA',
    1
  );

  insertExam.run(
    'exam-wb-misc',
    'cat-wbpsc',
    'WBPSC Miscellaneous Services',
    'wbpsc-miscellaneous',
    'West Bengal Public Service Commission (WBPSC)',
    'Statewide competitive exam for recruitment to various executive and inspectorate posts in West Bengal.',
    'Preliminary Examination: 100 MCQs (General Studies 150 Marks + Arithmetic 50 Marks = 200 Marks).',
    'https://psc.wb.gov.in',
    'https://psc.wb.gov.in/notices',
    'Briefcase',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    '#059669',
    1
  );

  insertExam.run(
    'exam-wbp-si',
    'cat-police',
    'WB Police Sub-Inspector (SI)',
    'wb-police-si',
    'West Bengal Police Recruitment Board (WBPRB)',
    'Recruitment for Sub-Inspector (Unarmed Branch) & Sub-Inspector (Armed Branch) in West Bengal Police.',
    'Preliminary Exam consists of 100 MCQs (General Studies 50 Qs, Logical & Analytical Reasoning 25 Qs, Arithmetic 25 Qs) for 200 Marks.',
    'https://prb.wb.gov.in',
    'https://prb.wb.gov.in/notifications',
    'ShieldCheck',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    '#0F766E',
    1
  );

  insertExam.run(
    'exam-wbp-constable',
    'cat-police',
    'WB Police Constable & Lady Constable',
    'wb-police-constable',
    'West Bengal Police Recruitment Board (WBPRB)',
    'Recruitment for Constable and Lady Constable posts in West Bengal Police.',
    'Written Examination: 85 MCQs covering General Awareness (25), English (10), Elementary Math (25), Reasoning (25) for 85 Marks (60 Mins).',
    'https://prb.wb.gov.in',
    'https://prb.wb.gov.in/notifications',
    'Shield',
    'https://images.unsplash.com/photo-1579208575657-c595a053b9b7?w=800',
    '#0284C7',
    1
  );

  insertExam.run(
    'exam-kp-si',
    'cat-police',
    'Kolkata Police SI & Sergeant',
    'kolkata-police-si',
    'West Bengal Police Recruitment Board (WBPRB)',
    'Recruitment of Sub-Inspector / Sub-Inspectress (UB) and Sergeant in Kolkata Police.',
    'Preliminary Screening: 100 MCQs (General Studies 50 Qs, Logical Reasoning 25 Qs, Arithmetic 25 Qs) for 200 Marks (90 Mins).',
    'https://prb.wb.gov.in',
    'https://prb.wb.gov.in/notifications',
    'BadgeCheck',
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800',
    '#1E40AF',
    1
  );

  insertExam.run(
    'exam-wb-tet',
    'cat-teaching',
    'West Bengal Primary TET',
    'wb-primary-tet',
    'West Bengal Board of Primary Education (WBBPE)',
    'Eligibility test for primary school teacher recruitment (Classes I to V) across West Bengal government-aided and sponsored schools.',
    '150 MCQs across Child Development & Pedagogy, Language I (Bengali), Language II (English), Mathematics, and Environmental Studies (150 Marks, No Negative Marking).',
    'https://wbbpe.org',
    'https://wbbpe.org/notices',
    'GraduationCap',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
    '#059669',
    1
  );

  insertExam.run(
    'exam-mscwb',
    'cat-municipal',
    'MSCWB Sub-Assistant Engineer / Officer',
    'mscwb-exam',
    'Municipal Service Commission of West Bengal (MSCWB)',
    'Recruitment for Kolkata Municipal Corporation (KMC) and municipal bodies across West Bengal for Sub-Assistant Engineer, Assistant Engineer, and Administrative posts.',
    'Written Examination: 100 MCQs covering Domain / General Studies & Numerical Ability (200 Marks).',
    'https://mscwb.org',
    'https://mscwb.org/notices',
    'Building2',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    '#7C3AED',
    1
  );
  // 4. Stages & Papers for WBCS & Food SI
  const insertStage = db.prepare(`
    INSERT INTO stages (id, exam_id, name, order_index)
    VALUES (?, ?, ?, ?)
  `);
  insertStage.run('stage-wbcs-prelims', 'exam-wbcs', 'Preliminary Examination', 1);
  insertStage.run('stage-wbcs-mains', 'exam-wbcs', 'Main Examination', 2);
  insertStage.run('stage-foodsi-written', 'exam-food-si', 'Written Examination', 1);
  insertStage.run('stage-wbp-prelims', 'exam-wbp-si', 'Preliminary Written Test', 1);
  insertStage.run('stage-clerkship-p1', 'exam-clerkship', 'Part-I (Objective MCQ)', 1);

  const insertPaper = db.prepare(`
    INSERT INTO papers (id, stage_id, name, code, order_index)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertPaper.run('paper-wbcs-prelims-gs', 'stage-wbcs-prelims', 'General Studies (Composite Paper)', 'GS-PRE', 1);
  insertPaper.run('paper-foodsi-composite', 'stage-foodsi-written', 'GS & Arithmetic', 'FSI-100', 1);
  insertPaper.run('paper-wbpsi-prelims', 'stage-wbp-prelims', 'General Studies, Reasoning & Arithmetic', 'WBP-PRE', 1);

  // 5. Subjects
  const insertSubject = db.prepare(`
    INSERT INTO subjects (id, paper_id, name, code, icon, color, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  insertSubject.run('sub-inm', 'paper-wbcs-prelims-gs', 'Indian National Movement', 'INM', 'Flag', '#DC2626', 1);
  insertSubject.run('sub-hist', 'paper-wbcs-prelims-gs', 'History of India', 'HIST', 'Landmark', '#B45309', 2);
  insertSubject.run('sub-geo-wb', 'paper-wbcs-prelims-gs', 'Geography of India & West Bengal', 'GEO-WB', 'Compass', '#059669', 3);
  insertSubject.run('sub-polity', 'paper-wbcs-prelims-gs', 'Indian Polity & Economy', 'POL-ECO', 'Scale', '#2563EB', 4);
  insertSubject.run('sub-sci', 'paper-wbcs-prelims-gs', 'General Science', 'SCI', 'Atom', '#7C3AED', 5);
  insertSubject.run('sub-eng', 'paper-wbcs-prelims-gs', 'English Composition', 'ENG', 'BookOpen', '#475569', 6);
  insertSubject.run('sub-gma', 'paper-wbcs-prelims-gs', 'General Mental Ability', 'GMA', 'Brain', '#0891B2', 7);
  insertSubject.run('sub-ca', 'paper-wbcs-prelims-gs', 'Current Affairs & WB Schemes', 'CA-WB', 'Zap', '#D97706', 8);
  insertSubject.run('sub-arith', 'paper-foodsi-composite', 'Arithmetic & Numerical Ability', 'ARITH', 'Calculator', '#EA580C', 9);

  // 6. Chapters & Topics
  const insertChapter = db.prepare(`
    INSERT INTO chapters (id, subject_id, name, order_index)
    VALUES (?, ?, ?, ?)
  `);
  insertChapter.run('chap-inm-gandhi', 'sub-inm', 'Gandhian Era & Mass Movements (1917-1947)', 1);
  insertChapter.run('chap-inm-rev', 'sub-inm', 'Revolutionary Nationalism & Bengal Movement', 2);
  insertChapter.run('chap-inm-1857', 'sub-inm', 'Revolt of 1857 & Early Resistance', 3);
  insertChapter.run('chap-geo-physio', 'sub-geo-wb', 'Physiography & Rivers of West Bengal', 1);
  insertChapter.run('chap-geo-districts', 'sub-geo-wb', 'Districts, Demography & Resources of WB', 2);
  insertChapter.run('chap-polity-fr', 'sub-polity', 'Preamble, Fundamental Rights & DPSP', 1);
  insertChapter.run('chap-polity-panchayat', 'sub-polity', 'Panchayati Raj & State Administration', 2);
  insertChapter.run('chap-eco-wb-schemes', 'sub-polity', 'West Bengal Government Welfare Schemes', 3);
  insertChapter.run('chap-sci-physics', 'sub-sci', 'Applied Physics & Everyday Mechanics', 1);
  insertChapter.run('chap-sci-bio', 'sub-sci', 'Human Physiology, Vitamins & Diseases', 2);
  insertChapter.run('chap-arith-pct', 'sub-arith', 'Percentage, Profit & Loss', 1);
  insertChapter.run('chap-arith-tw', 'sub-arith', 'Time, Work & Pipes and Cisterns', 2);

  const insertTopic = db.prepare(`
    INSERT INTO topics (id, chapter_id, name, order_index)
    VALUES (?, ?, ?, ?)
  `);
  insertTopic.run('top-inm-noncoop', 'chap-inm-gandhi', 'Non-Cooperation & Khilafat Movement', 1);
  insertTopic.run('top-inm-quitindia', 'chap-inm-gandhi', 'Quit India Movement 1942 & Tamralipta Jatiya Sarkar', 2);
  insertTopic.run('top-inm-ina', 'chap-inm-rev', 'Subhas Chandra Bose, Forward Bloc & INA', 1);
  insertTopic.run('top-inm-anushilan', 'chap-inm-rev', 'Anushilan Samiti & Jugantar Group', 2);
  insertTopic.run('top-geo-terai', 'chap-geo-physio', 'Terai, Dooars & Northern Hill Tracts', 1);
  insertTopic.run('top-geo-sundarbans', 'chap-geo-physio', 'Sundarbans & Coastal Mangrove Ecosystem', 2);
  insertTopic.run('top-geo-rivers', 'chap-geo-physio', 'River Systems: Teesta, Torsa, Damodar, Bhagirathi-Hooghly', 3);
  insertTopic.run('top-polity-fr-arts', 'chap-polity-fr', 'Fundamental Rights (Articles 12 to 35) & Writs', 1);
  insertTopic.run('top-polity-73amend', 'chap-polity-panchayat', '73rd & 74th Constitutional Amendment Acts & 3-Tier Panchayat', 1);
  insertTopic.run('top-eco-kanyashree', 'chap-eco-wb-schemes', 'Lakshmir Bhandar, Kanyashree, Rupashree & Duare Sarkar', 1);
  insertTopic.run('top-sci-vitamins', 'chap-sci-bio', 'Vitamins, Deficiency Diseases & Balanced Diet', 1);
  insertTopic.run('top-arith-profit', 'chap-arith-pct', 'Profit, Loss, Discount & Successive Percentages', 1);

  // 7. Exam Patterns
  const insertPattern = db.prepare(`
    INSERT INTO exam_patterns (id, exam_id, stage_id, paper_id, year_effective, total_questions, total_marks, duration_mins, marks_per_correct, negative_marking, passing_marks, section_timing_enabled, pyq_allowed, current_affairs_allowed, subject_distribution_json, difficulty_distribution_json, duplicate_policy, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertPattern.run(
    'pattern-wbcs-prelims-2024',
    'exam-wbcs',
    'stage-wbcs-prelims',
    'paper-wbcs-prelims-gs',
    2024,
    200,
    200,
    150,
    1.0,
    0.33,
    125.0,
    0,
    1,
    1,
    JSON.stringify([
      { subject: 'English Composition', count: 25, marks: 25 },
      { subject: 'General Science', count: 25, marks: 25 },
      { subject: 'Current Events of National & International Importance', count: 25, marks: 25 },
      { subject: 'History of India', count: 25, marks: 25 },
      { subject: 'Geography of India with special reference to West Bengal', count: 25, marks: 25 },
      { subject: 'Indian Polity and Economy', count: 25, marks: 25 },
      { subject: 'Indian National Movement', count: 25, marks: 25 },
      { subject: 'General Mental Ability', count: 25, marks: 25 },
    ]),
    JSON.stringify({ Easy: 30, Moderate: 50, Hard: 20 }),
    'no_repeat',
    1
  );

  insertPattern.run(
    'pattern-foodsi-2024',
    'exam-food-si',
    'stage-foodsi-written',
    'paper-foodsi-composite',
    2024,
    100,
    100,
    90,
    1.0,
    0.33,
    75.0,
    0,
    1,
    1,
    JSON.stringify([
      { subject: 'General Studies & Current Affairs', count: 50, marks: 50 },
      { subject: 'Arithmetic & Numerical Ability', count: 50, marks: 50 },
    ]),
    JSON.stringify({ Easy: 40, Moderate: 45, Hard: 15 }),
    'no_repeat',
    1
  );

  insertPattern.run(
    'pattern-wbpsi-2024',
    'exam-wbp-si',
    'stage-wbp-prelims',
    'paper-wbpsi-prelims',
    2024,
    100,
    200,
    90,
    2.0,
    0.50,
    130.0,
    0,
    1,
    1,
    JSON.stringify([
      { subject: 'General Studies', count: 50, marks: 100 },
      { subject: 'Logical & Analytical Reasoning', count: 25, marks: 50 },
      { subject: 'Arithmetic', count: 25, marks: 50 },
    ]),
    JSON.stringify({ Easy: 35, Moderate: 45, Hard: 20 }),
    'no_repeat',
    1
  );

  // 8. Authentic Question Bank (Curated WBCS, WB Police SI, Food SI, Geography of WB, History, Polity, Science)
  const insertQuestion = db.prepare(`
    INSERT INTO questions (
      id, question_text, question_text_bn,
      option_a, option_b, option_c, option_d,
      option_a_bn, option_b_bn, option_c_bn, option_d_bn,
      correct_answer, explanation, explanation_bn,
      short_explanation, important_fact, exam_tip,
      exam_id, stage_id, paper_id, subject_id, chapter_id, topic_id,
      question_type, difficulty, language, tags, is_pyq,
      quality_score, confidence_score, duplicate_score, attempt_count, correct_count, avg_time_secs,
      lifecycle_status, verification_status, last_verified_at
    ) VALUES (
      ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, datetime('now', '-1 days')
    )
  `);

  const insertPYQ = db.prepare(`
    INSERT INTO pyq_metadata (id, question_id, exam_id, exam_year, exam_date, paper_name, shift, question_num, source_name, source_url, source_doc)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const sampleQuestions = [
    {
      id: 'q-wbcs-inm-001',
      text: 'Who was the founder of the "Tamralipta Jatiya Sarkar" formed during the Quit India Movement in Bengal in 1942?',
      text_bn: '১৯৪২ সালের ভারত ছাড়ো আন্দোলনের সময় বাংলায় গঠিত "তাম্রলিপ্ত জাতীয় সরকার"-এর সর্বাধিনায়ক কে ছিলেন?',
      optA: 'Ajoy Mukherjee',
      optB: 'Satish Chandra Samanta',
      optC: 'Matangini Hazra',
      optD: 'Sushil Kumar Dhara',
      optA_bn: 'অজয় মুখোপাধ্যায়',
      optB_bn: 'সতীশচন্দ্র সামন্ত',
      optC_bn: 'মাতঙ্গিনী হাজরা',
      optD_bn: 'সুশীল কুমার ধারা',
      ans: 'B',
      exp: 'Tamralipta Jatiya Sarkar was an independent parallel government established on 17 December 1942 in Tamluk subdivision of Midnapore district, West Bengal, under the leadership of Satish Chandra Samanta. Matangini Hazra was martyred during this agitation on 29 September 1942 while holding the tricolor.',
      exp_bn: '১৯৪২ সালের ১৭ ডিসেম্বর মেদিনীপুরের তমলুক মহকুমায় সতীশচন্দ্র সামন্তর নেতৃত্বে তাম্রলিপ্ত জাতীয় সরকার প্রতিষ্ঠিত হয়। এই আন্দোলনের সময়ই ২৯ সেপ্টেম্বর মাতঙ্গিনী হাজরা জাতীয় পতাকা হাতে শহীদ হন।',
      short_exp: 'Satish Chandra Samanta was the Sarbadhinayaka of Tamralipta Jatiya Sarkar.',
      fact: 'Tamralipta Jatiya Sarkar functioned until September 1944 and had its own police, judiciary, and armed force called "Vidyut Vahini".',
      tip: 'Remember the role of "Vidyut Vahini" commander Sushil Kumar Dhara vs Supreme Dictator Satish Chandra Samanta.',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-inm',
      chapter_id: 'chap-inm-gandhi',
      topic_id: 'top-inm-quitindia',
      type: 'MCQ',
      diff: 'Moderate',
      is_pyq: 1,
      pyq_year: 2022,
      pyq_num: 43,
      attempts: 842,
      correct: 572,
      time: 38.5,
      tags: 'WBCS, INM, Bengal Modern History, Quit India, Tamluk',
    },
    {
      id: 'q-wbcs-geo-002',
      text: 'Which district of West Bengal has the lowest literacy rate according to the 2011 Census?',
      text_bn: '২০১১ সালের আদমশুমারি অনুযায়ী পশ্চিমবঙ্গের কোন জেলায় সাক্ষরতার হার সর্বনিম্ন?',
      optA: 'Purulia',
      optB: 'Uttar Dinajpur',
      optC: 'Maldah',
      optD: 'Bankura',
      optA_bn: 'পুরুলিয়া',
      optB_bn: 'উত্তর দিনাজপুর',
      optC_bn: 'মালদহ',
      optD_bn: 'বাঁকুড়া',
      ans: 'B',
      exp: 'According to Census 2011, Uttar Dinajpur has the lowest literacy rate in West Bengal at 59.07%. Purba Medinipur recorded the highest literacy rate at 87.02%, followed by Kolkata (86.31%).',
      exp_bn: '২০১১ সালের জনগণনা অনুযায়ী উত্তর দিনাজপুর জেলায় সাক্ষরতার হার রাজ্যে সর্বনিম্ন (৫৯.০৭%)। পূর্ব মেদিনীপুর জেলায় সাক্ষরতার হার সর্বোচ্চ (৮৭.০২%)।',
      short_exp: 'Uttar Dinajpur (59.07%) is lowest, Purba Medinipur (87.02%) is highest.',
      fact: 'West Bengal overall literacy rate in Census 2011 stands at 76.26% (Male: 81.69%, Female: 70.54%).',
      tip: 'Memorize top 2 (Purba Medinipur, Kolkata) and bottom 2 (Uttar Dinajpur, Maldah) literacy districts for WBPSC exams.',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-geo-wb',
      chapter_id: 'chap-geo-districts',
      topic_id: 'top-geo-terai',
      type: 'MCQ',
      diff: 'Moderate',
      is_pyq: 1,
      pyq_year: 2021,
      pyq_num: 88,
      attempts: 1120,
      correct: 728,
      time: 29.0,
      tags: 'Census 2011, West Bengal Geography, Literacy, Demography',
    },
    {
      id: 'q-wbcs-polity-003',
      text: 'Which Article of the Indian Constitution empowers the High Court to issue writs for the enforcement of Fundamental Rights and other legal rights?',
      text_bn: 'ভারতীয় সংবিধানের কোন অনুচ্ছেদ অনুযায়ী হাইকোর্ট মৌলিক অধিকার ও অন্যান্য আইনি অধিকার বলবৎ করার জন্য রিট জারি করতে পারে?',
      optA: 'Article 32',
      optB: 'Article 131',
      optC: 'Article 226',
      optD: 'Article 143',
      optA_bn: 'অনুচ্ছেদ ৩২',
      optB_bn: 'অনুচ্ছেদ ১৩১',
      optC_bn: 'অনুচ্ছেদ ২২৬',
      optD_bn: 'অনুচ্ছেদ ১৪৩',
      ans: 'C',
      exp: 'Article 226 of the Constitution of India empowers High Courts to issue writs (Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, Certiorari) not only for Fundamental Rights but also for any other legal purpose. Article 32 gives similar powers to the Supreme Court strictly for Fundamental Rights.',
      exp_bn: 'অনুচ্ছেদ ২২৬ অনুযায়ী হাইকোর্ট মৌলিক অধিকার এবং সাধারণ আইনি অধিকার উভয়ের জন্যই রিট জারি করতে পারে। সুপ্রিম কোর্ট অনুচ্ছেদ ৩২ অনুযায়ী কেবল মৌলিক অধিকারের জন্য রিট জারি করে।',
      short_exp: 'Article 226 applies to High Courts; Article 32 applies to Supreme Court.',
      fact: 'The writ jurisdiction of the High Court under Article 226 is wider than that of the Supreme Court under Article 32.',
      tip: 'Frequent trick question: High Court writ scope is broader than Supreme Court because it covers ordinary legal rights as well.',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-polity',
      chapter_id: 'chap-polity-fr',
      topic_id: 'top-polity-fr-arts',
      type: 'MCQ',
      diff: 'Easy',
      is_pyq: 1,
      pyq_year: 2023,
      pyq_num: 12,
      attempts: 1450,
      correct: 1230,
      time: 22.0,
      tags: 'Indian Polity, Writs, Judiciary, Article 226, Article 32',
    },
    {
      id: 'q-wbcs-geo-004',
      text: 'The Rammam Hydroelectric Power Project is located in which district of West Bengal?',
      text_bn: 'পশ্চিমবঙ্গের কোন জেলায় রাম্মাম জলবিদ্যুৎ প্রকল্প অবস্থিত?',
      optA: 'Jalpaiguri',
      optB: 'Darjeeling',
      optC: 'Kalimpong',
      optD: 'Alipurduar',
      optA_bn: 'জলপাইগুড়ি',
      optB_bn: 'দার্জিলিং',
      optC_bn: 'কালিম্পং',
      optD_bn: 'আলিপুরদুয়ার',
      ans: 'B',
      exp: 'Rammam Hydroelectric Project (Stage II, 51 MW) is located on the Rammam and Lodhama rivers in the Darjeeling district of West Bengal. It is operated by WBSEDCL / NTPC.',
      exp_bn: 'রাম্মাম জলবিদ্যুৎ প্রকল্পটি পশ্চিমবঙ্গের দার্জিলিং জেলায় রাম্মাম এবং লোধামা নদীর উপর অবস্থিত।',
      short_exp: 'Rammam Hydel Project is situated in Darjeeling.',
      fact: 'Sidrapong (near Darjeeling) was India\'s first hydroelectric power plant, commissioned in 1897.',
      tip: 'Do not confuse Rammam (Darjeeling) with Jaldhaka Hydel Project (Kalimpong/Jalpaiguri border).',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-geo-wb',
      chapter_id: 'chap-geo-physio',
      topic_id: 'top-geo-terai',
      type: 'MCQ',
      diff: 'Moderate',
      is_pyq: 1,
      pyq_year: 2020,
      pyq_num: 71,
      attempts: 920,
      correct: 580,
      time: 31.0,
      tags: 'WB Geography, Power Projects, Darjeeling, Hydel Energy',
    },
    {
      id: 'q-wbcs-inm-005',
      text: 'In which year did the historic "Chittagong Armoury Raid" take place under the leadership of Masterda Surya Sen?',
      text_bn: 'মাস্টারদা সূর্য সেনের নেতৃত্বে ঐতিহাসিক "চট্টগ্রাম অস্ত্রাগার লুণ্ঠন" কোন সালে সংঘটিত হয়েছিল?',
      optA: '1928',
      optB: '1930',
      optC: '1932',
      optD: '1934',
      optA_bn: '১৯২৮',
      optB_bn: '১৯৩০',
      optC_bn: '১৯৩২',
      optD_bn: '১৯৩৪',
      ans: 'B',
      exp: 'On the night of 18 April 1930, revolutionary group Indian Republican Army (Chittagong Branch) led by Surya Sen raided the police and auxiliary force armouries in Chittagong. Following the raid, they fought the Battle of Jalalabad Hill on 22 April 1930.',
      exp_bn: '১৯৩০ সালের ১৮ এপ্রিল রাতে মাস্টারদা সূর্য সেনের নেতৃত্বে বিপ্লবীরা চট্টগ্রাম অস্ত্রাগার লুণ্ঠন করেন এবং ২২ এপ্রিল ঐতিহাসিক জালালাবাদ পাহাড়ের রক্তক্ষয়ী যুদ্ধ সংঘটিত হয়।',
      short_exp: '18 April 1930 - Chittagong Armoury Raid.',
      fact: 'Pritilata Waddedar and Kalpana Datta were key women freedom fighters associated with Surya Sen in the Chittagong group.',
      tip: 'Associated dates to remember: Jalalabad Battle (22 April 1930), Surya Sen martyrdom (12 Jan 1934).',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-inm',
      chapter_id: 'chap-inm-rev',
      topic_id: 'top-inm-anushilan',
      type: 'MCQ',
      diff: 'Easy',
      is_pyq: 1,
      pyq_year: 2019,
      pyq_num: 94,
      attempts: 1600,
      correct: 1380,
      time: 19.5,
      tags: 'Surya Sen, Chittagong Armoury Raid, Bengal Revolutionaries, INM',
    },
    {
      id: 'q-wbcs-polity-006',
      text: 'The 73rd Constitutional Amendment Act, 1992 added which Schedule to the Constitution of India?',
      text_bn: '১৯৯২ সালের ৭৩তম সংবিধান সংশোধন আইনের মাধ্যমে ভারতীয় সংবিধানে কোন তফসিল যুক্ত করা হয়েছিল?',
      optA: '9th Schedule',
      optB: '10th Schedule',
      optC: '11th Schedule',
      optD: '12th Schedule',
      optA_bn: 'নবম তফসিল',
      optB_bn: 'দশম তফসিল',
      optC_bn: 'একাদশ তফসিল',
      optD_bn: 'দ্বাদশ তফসিল',
      ans: 'C',
      exp: 'The 73rd Constitutional Amendment Act added Part IX (Articles 243 to 243O) and the 11th Schedule containing 29 functional items for Panchayati Raj Institutions. The 74th Amendment added the 12th Schedule (18 items for Municipalities).',
      exp_bn: '৭৩তম সংবিধান সংশোধনের মাধ্যমে সংবিধানে একাদশ তফসিল (২৯টি কার্যকরী বিষয়) এবং নবম অংশ যুক্ত করা হয়। ৭৪তম সংশোধনের মাধ্যমে দ্বাদশ তফসিল যুক্ত হয়।',
      short_exp: '11th Schedule relates to Panchayats (73rd Amendment, 29 subjects).',
      fact: 'West Bengal was the first major state in India to hold regular 5-year Panchayat elections after 1978 under the West Bengal Panchayat Act, 1973.',
      tip: '73rd = 11th Schedule (29 matters); 74th = 12th Schedule (18 matters).',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-polity',
      chapter_id: 'chap-polity-panchayat',
      topic_id: 'top-polity-73amend',
      type: 'MCQ',
      diff: 'Easy',
      is_pyq: 1,
      pyq_year: 2022,
      pyq_num: 154,
      attempts: 1250,
      correct: 1040,
      time: 21.0,
      tags: 'Panchayati Raj, 73rd Amendment, 11th Schedule, Polity',
    },
    {
      id: 'q-wbcs-sci-007',
      text: 'Which vitamin is essential for blood clotting in the human body?',
      text_bn: 'মানবদেহে রক্ত জমাট বাঁধার (Blood Clotting) জন্য কোন ভিটামিন অপরিহার্য?',
      optA: 'Vitamin A',
      optB: 'Vitamin C',
      optC: 'Vitamin K',
      optD: 'Vitamin E',
      optA_bn: 'ভিটামিন A',
      optB_bn: 'ভিটামিন C',
      optC_bn: 'ভিটামিন K',
      optD_bn: 'ভিটামিন E',
      ans: 'C',
      exp: 'Vitamin K (Phylloquinone) is a fat-soluble vitamin essential for the synthesis of prothrombin and factors VII, IX, and X in the liver, which are crucial for blood coagulation.',
      exp_bn: 'ভিটামিন K (ফাইলোকুইনোন) যকৃতে প্রোথ্রম্বিন সংশ্লেষণে সাহায্য করে, যা রক্ত জমাট বাঁধতে অপরিহার্য।',
      short_exp: 'Vitamin K is required for synthesis of prothrombin for blood coagulation.',
      fact: 'Newborn infants are often given a prophylactic injection of Vitamin K to prevent hemorrhagic disease.',
      tip: 'Fat soluble vitamins: A, D, E, K. Water soluble: B-complex, C.',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-sci',
      chapter_id: 'chap-sci-bio',
      topic_id: 'top-sci-vitamins',
      type: 'MCQ',
      diff: 'Easy',
      is_pyq: 1,
      pyq_year: 2021,
      pyq_num: 33,
      attempts: 1800,
      correct: 1610,
      time: 16.0,
      tags: 'General Science, Biology, Vitamins, Blood Clotting',
    },
    {
      id: 'q-foodsi-arith-008',
      text: 'A shopkeeper marks an article at 25% above the cost price and allows a discount of 10% on the marked price. What is his profit percentage?',
      text_bn: 'একজন দোকানদার একটি পণ্যের ক্রয়মূল্যের চেয়ে ২৫% বেশি ধার্যমূল্য নির্ধারণ করলেন এবং ধার্যমূল্যের উপর ১০% ছাড় দিলেন। তার শতকরা লাভের পরিমাণ কত?',
      optA: '12.5%',
      optB: '15%',
      optC: '17.5%',
      optD: '20%',
      optA_bn: '১২.৫%',
      optB_bn: '১৫%',
      optC_bn: '১৭.৫%',
      optD_bn: '২০%',
      ans: 'A',
      exp: 'Let Cost Price (CP) = 100. Marked Price (MP) = 100 + 25 = 125. Selling Price (SP) = MP × (1 - 10/100) = 125 × 0.9 = 112.5. Profit = SP - CP = 112.5 - 100 = 12.5. Therefore, Profit % = 12.5%.',
      exp_bn: 'ধরি ক্রয়মূল্য = ১০০ টাকা। ধার্যমূল্য = ১২৫ টাকা। বিক্রয়মূল্য = ১২৫ × ০.৯ = ১১২.৫ টাকা। লাভ = ১১২.৫ - ১০০ = ১২.৫%।',
      short_exp: 'Effective formula: +25 - 10 - (25×10)/100 = 15 - 2.5 = 12.5%.',
      fact: 'Successive percentage formula: a + b + (ab)/100 where discount b is negative.',
      tip: 'Use Net % change formula = x - y - (xy/100) = 25 - 10 - 2.5 = 12.5% in under 10 seconds.',
      exam_id: 'exam-food-si',
      stage_id: 'stage-foodsi-written',
      paper_id: 'paper-foodsi-composite',
      subject_id: 'sub-arith',
      chapter_id: 'chap-arith-pct',
      topic_id: 'top-arith-profit',
      type: 'MCQ',
      diff: 'Moderate',
      is_pyq: 1,
      pyq_year: 2019,
      pyq_num: 62,
      attempts: 980,
      correct: 620,
      time: 42.0,
      tags: 'Food SI, Arithmetic, Profit & Loss, Percentage',
    },
    {
      id: 'q-wbcs-ca-009',
      text: 'Under the "Lakshmir Bhandar" scheme in West Bengal, what is the revised monthly financial assistance provided to women from General/OBC categories from April 2024?',
      text_bn: 'পশ্চিমবঙ্গের "লক্ষ্মীর ভাণ্ডার" প্রকল্পে ২০২৪ সালের এপ্রিল মাস থেকে সাধারণ/ওবিসি শ্রেণির নারীদের মাসিক আর্থিক সহায়তার পরিমাণ বাড়িয়ে কত করা হয়েছে?',
      optA: '₹500',
      optB: '₹1,000',
      optC: '₹1,200',
      optD: '₹1,500',
      optA_bn: '৫০০ টাকা',
      optB_bn: '১,০০০ টাকা',
      optC_bn: '১,২০০ টাকা',
      optD_bn: '১,৫০০ টাকা',
      ans: 'B',
      exp: 'In the West Bengal State Budget 2024-25 presented in February 2024, the monthly allowance under Lakshmir Bhandar was enhanced by ₹500: General/OBC category women now receive ₹1,000 per month (up from ₹500), and SC/ST women receive ₹1,200 per month (up from ₹1,000), effective April 2024.',
      exp_bn: '২০২৪-২৫ রাজ্য বাজেটে লক্ষ্মীর ভাণ্ডারের ভাতা ৫০০ টাকা বাড়ানো হয়। সাধারণ/ওবিসি নারীদের জন্য মাসিক ১,০০০ টাকা এবং এসসি/এসটি নারীদের জন্য ১,২০০ টাকা করা হয়েছে।',
      short_exp: 'General/OBC category received ₹1,000/month (increased from ₹500 in 2024).',
      fact: 'Lakshmir Bhandar was launched in August 2021 for female heads of household aged between 25 and 60 years.',
      tip: 'Remember SC/ST get ₹1,200 and General/OBC get ₹1,000. Very high probability in upcoming WBPSC exams.',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-ca',
      chapter_id: 'chap-eco-wb-schemes',
      topic_id: 'top-eco-kanyashree',
      type: 'MCQ',
      diff: 'Easy',
      is_pyq: 0,
      pyq_year: 2024,
      pyq_num: 1,
      attempts: 1400,
      correct: 1210,
      time: 18.0,
      tags: 'Current Affairs, West Bengal Schemes, Budget 2024, Lakshmir Bhandar',
    },
    {
      id: 'q-wbcs-geo-010',
      text: 'Which is the highest peak in West Bengal?',
      text_bn: 'পশ্চিমবঙ্গের সর্বোচ্চ পর্বতশৃঙ্গ কোনটি?',
      optA: 'Tiger Hill',
      optB: 'Sandakphu',
      optC: 'Phalut',
      optD: 'Tonglu',
      optA_bn: 'টাইগার হিল',
      optB_bn: 'সান্দাকফু',
      optC_bn: 'ফালুট',
      optD_bn: 'টংলু',
      ans: 'B',
      exp: 'Sandakphu is the highest peak of West Bengal located on the Singalila Ridge at an altitude of 3,636 metres (11,930 ft) on the India-Nepal border in Darjeeling district.',
      exp_bn: 'সান্দাকফু পশ্চিমবঙ্গের সর্বোচ্চ শৃঙ্গ (উচ্চতা ৩,৬৩৬ মিটার বা ১১,৯৩০ ফুট), যা দার্জিলিং জেলার সিঙ্গালীলা পর্বতশ্রেণীতে ভারত-নেপাল সীমান্তে অবস্থিত।',
      short_exp: 'Sandakphu (3,636 m) is the highest peak in West Bengal.',
      fact: 'From Sandakphu, four of the five highest peaks in the world (Everest, Kanchenjunga, Lhotse, Makalu) are clearly visible in a panorama called "Sleeping Buddha".',
      tip: 'Phalut (3,595 m) is the second highest peak of West Bengal.',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-geo-wb',
      chapter_id: 'chap-geo-physio',
      topic_id: 'top-geo-terai',
      type: 'MCQ',
      diff: 'Easy',
      is_pyq: 1,
      pyq_year: 2018,
      pyq_num: 5,
      attempts: 2100,
      correct: 1950,
      time: 14.0,
      tags: 'WB Geography, Peaks, Sandakphu, Singalila',
    },
    {
      id: 'q-wbcs-hist-011',
      text: 'During whose reign did the Chinese pilgrim Hiuen Tsang (Xuanzang) visit Bengal and study at Nalanda/Pundravardhana?',
      text_bn: 'কার রাজত্বকালে চিনা পরিব্রাজক হিউয়েন সাং বাংলায় আসেন এবং পুণ্ড্রবর্ধন ও নালন্দায় অবস্থান করেন?',
      optA: 'Sasanka',
      optB: 'Harshavardhana',
      optC: 'Dharmapala',
      optD: 'Devapala',
      optA_bn: 'শশাঙ্ক',
      optB_bn: 'হর্ষবর্ধন',
      optC_bn: 'ধর্মপাল',
      optD_bn: 'দেবপাল',
      ans: 'B',
      exp: 'Xuanzang visited India during the reign of King Harshavardhana (606-647 CE). In Bengal, he visited Pundravardhana (North Bengal), Samatata, Karnasuvarna (capital of Sasanka\'s Gauda kingdom), and Tamralipta.',
      exp_bn: 'হিউয়েন সাং রাজা হর্ষবর্ধনের রাজত্বকালে (৬০৬-৬৪৭ খ্রিষ্টাব্দ) ভারতে আসেন এবং বাংলায় কর্ণসুবর্ণ, পুণ্ড্রবর্ধন ও তাম্রলিপ্ত পরিদর্শন করেন।',
      short_exp: 'Hiuen Tsang visited during King Harshavardhana\'s reign.',
      fact: 'Fa-Hien visited during Chandragupta II (Vikramaditya), Hiuen Tsang during Harshavardhana, and I-Tsing in the late 7th century.',
      tip: 'Do not confuse Sasanka (who ruled Gauda slightly earlier and was Harsha\'s rival) with the sovereign visiting period of Harsha.',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-hist',
      chapter_id: 'chap-inm-rev',
      topic_id: 'top-inm-anushilan',
      type: 'MCQ',
      diff: 'Moderate',
      is_pyq: 1,
      pyq_year: 2020,
      pyq_num: 118,
      attempts: 990,
      correct: 680,
      time: 27.0,
      tags: 'Ancient Bengal, Foreign Travelers, Harshavardhana, Sasanka',
    },
    {
      id: 'q-wbcs-inm-012',
      text: 'Who presided over the historic Belgaum session of the Indian National Congress in 1924?',
      text_bn: '১৯২৪ সালের ভারতীয় জাতীয় কংগ্রেসের ঐতিহাসিক বেলগাঁও অধিবেশনে কে সভাপতিত্ব করেছিলেন?',
      optA: 'Jawaharlal Nehru',
      optB: 'Mahatma Gandhi',
      optC: 'Subhash Chandra Bose',
      optD: 'Sardar Vallabhbhai Patel',
      optA_bn: 'জওহরলাল নেহেরু',
      optB_bn: 'মহাত্মা গান্ধী',
      optC_bn: 'সুভাষচন্দ্র বসু',
      optD_bn: 'সরদার বল্লভভাই প্যাটেল',
      ans: 'B',
      exp: 'Mahatma Gandhi presided over the Indian National Congress only once in his lifetime, which was at the 39th session held at Belgaum (Karnataka) in December 1924.',
      exp_bn: 'মহাত্মা গান্ধী তাঁর জীবনে কেবল একবারই কংগ্রেসের অধিবেশনে সভাপতিত্ব করেছিলেন — ১৯২৪ সালের ৩৯তম বেলগাঁও (কর্ণাটক) অধিবেশনে।',
      short_exp: 'Mahatma Gandhi presided over INC only once: Belgaum 1924.',
      fact: 'Subhas Chandra Bose presided twice: Haripura (1938) and Tripuri (1939, after defeating Pattabhi Sitaramayya).',
      tip: 'WBCS favorite: Gandhi presided once (Belgaum 1924), Sarojini Naidu first Indian woman (Kanpur 1925), Annie Besant first woman (Calcutta 1917).',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-inm',
      chapter_id: 'chap-inm-gandhi',
      topic_id: 'top-inm-noncoop',
      type: 'MCQ',
      diff: 'Easy',
      is_pyq: 1,
      pyq_year: 2023,
      pyq_num: 165,
      attempts: 1720,
      correct: 1540,
      time: 17.0,
      tags: 'INC Sessions, Mahatma Gandhi, Belgaum 1924, INM',
    },
    {
      id: 'q-wbpsi-reasoning-013',
      text: 'Find the missing number in the sequence: 4, 9, 25, 49, 121, 169, ?',
      text_bn: 'নিচের সংখ্যা শ্রেণির পরবর্তী লুপ্ত সংখ্যাটি নির্ণয় করুন: 4, 9, 25, 49, 121, 169, ?',
      optA: '225',
      optB: '256',
      optC: '289',
      optD: '361',
      optA_bn: '২২৫',
      optB_bn: '২৫৬',
      optC_bn: '২৮৯',
      optD_bn: '৩৬১',
      ans: 'C',
      exp: 'The series consists of squares of consecutive prime numbers: 2^2 = 4, 3^2 = 9, 5^2 = 25, 7^2 = 49, 11^2 = 121, 13^2 = 169. The next prime number after 13 is 17. Therefore, 17^2 = 289.',
      exp_bn: 'এটি ক্রমিক মৌলিক সংখ্যাগুলির বর্গের শ্রেণী: ২²=৪, ৩²=৯, ৫²=২৫, ৭²=৪৯, ১১²=১২১, ১৩²=১৬৯। ১৩-এর পরবর্তী মৌলিক সংখ্যা ১৭, তাই ১৭² = ২৮৯।',
      short_exp: 'Series of prime numbers squared: 2², 3², 5², 7², 11², 13², 17² = 289.',
      fact: '15 is not prime, so 15² (225) is an intentional distractor trap.',
      tip: 'Always check if square series skips composite numbers like 4, 6, 8, 9, 10, 12, 14, 15.',
      exam_id: 'exam-wbp-si',
      stage_id: 'stage-wbp-prelims',
      paper_id: 'paper-wbpsi-prelims',
      subject_id: 'sub-gma',
      chapter_id: 'chap-arith-pct',
      topic_id: 'top-arith-profit',
      type: 'MCQ',
      diff: 'Moderate',
      is_pyq: 1,
      pyq_year: 2021,
      pyq_num: 54,
      attempts: 1100,
      correct: 690,
      time: 35.0,
      tags: 'WBP SI, Reasoning, Number Series, Prime Numbers',
    },
    {
      id: 'q-wbcs-polity-014',
      text: 'Which amendment to the Constitution of India lowered the voting age from 21 years to 18 years for Lok Sabha and Legislative Assembly elections?',
      text_bn: 'ভারতীয় সংবিধানের কোন সংশোধনীর মাধ্যমে লোকসভা ও বিধানসভা নির্বাচনে ভোটাধিকারের বয়স ২১ থেকে কমিয়ে ১৮ বছর করা হয়েছিল?',
      optA: '42nd Amendment Act',
      optB: '44th Amendment Act',
      optC: '61st Amendment Act',
      optD: '86th Amendment Act',
      optA_bn: '৪২তম সংশোধনী আইন',
      optB_bn: '৪৪তম সংশোধনী আইন',
      optC_bn: '৬১তম সংশোধনী আইন',
      optD_bn: '৮৬তম সংশোধনী আইন',
      ans: 'C',
      exp: 'The 61st Constitutional Amendment Act, 1988 (which came into force in March 1989 under Rajiv Gandhi Government) amended Article 326 of the Constitution to reduce the voting age from 21 to 18 years.',
      exp_bn: '১৯৮৮ সালের ৬১তম সংবিধান সংশোধনীর মাধ্যমে (কার্যকর ১৯৮৯) সংবিধানের অনুচ্ছেদ ৩২৬ সংশোধন করে ভোটাধিকারের বয়স ২১ থেকে কমিয়ে ১৮ বছর করা হয়।',
      short_exp: '61st Amendment (1988) lowered voting age from 21 to 18 (Article 326).',
      fact: 'Universal Adult Suffrage is provided under Article 326 of the Constitution.',
      tip: 'Common amendment codes: 42nd (Mini-Constitution), 44th (Right to Property removed from FR), 61st (Voting age 18), 86th (RTE Article 21A).',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-polity',
      chapter_id: 'chap-polity-fr',
      topic_id: 'top-polity-fr-arts',
      type: 'MCQ',
      diff: 'Easy',
      is_pyq: 1,
      pyq_year: 2022,
      pyq_num: 181,
      attempts: 1530,
      correct: 1390,
      time: 15.5,
      tags: 'Polity, 61st Amendment, Voting Age, Article 326',
    },
    {
      id: 'q-wbcs-inm-015',
      text: 'Who authored the famous Bengali revolutionary drama "Neel Darpan" (The Indigo Mirror), depicting the plight of indigo ryots?',
      text_bn: 'নীলকর সাহেবদের অত্যাচারের কাহিনী তুলে ধরা বিখ্যাত বিপ্লবী নাটক "নীলদর্পণ"-এর রচয়িতা কে?',
      optA: 'Michael Madhusudan Dutt',
      optB: 'Dinabandhu Mitra',
      optC: 'Harish Chandra Mukherjee',
      optD: 'Bankim Chandra Chattopadhyay',
      optA_bn: 'মাইকেল মধুসূদন দত্ত',
      optB_bn: 'দীনবন্ধু মিত্র',
      optC_bn: 'হরিশচন্দ্র মুখোপাধ্যায়',
      optD_bn: 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়',
      ans: 'B',
      exp: 'Dinabandhu Mitra wrote the landmark play "Neel Darpan" in 1858-59 (published in Dhaka in 1860). Michael Madhusudan Dutt translated it into English, and Rev. James Long published it (for which Rev. Long was fined and jailed for a month).',
      exp_bn: '১৮৬০ সালে দীনবন্ধু মিত্র "নীলদর্পণ" নাটক রচনা করেন। মাইকেল মধুসূদন দত্ত এটি ইংরেজিতে অনুবাদ করেন এবং রেভারেন্ড জেমস লং এটি প্রকাশ করেন।',
      short_exp: 'Dinabandhu Mitra wrote Neel Darpan; Michael Madhusudan translated it into English.',
      fact: 'Harish Chandra Mukherjee highlighted the Indigo Revolt through his newspaper "The Hindoo Patriot".',
      tip: 'Key trio to distinguish: Writer = Dinabandhu Mitra; Translator = Michael Madhusudan; English Publisher jailed = Rev. James Long; Journalist = Harish Chandra Mukherjee.',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-inm',
      chapter_id: 'chap-inm-1857',
      topic_id: 'top-inm-anushilan',
      type: 'MCQ',
      diff: 'Easy',
      is_pyq: 1,
      pyq_year: 2019,
      pyq_num: 28,
      attempts: 1950,
      correct: 1810,
      time: 16.0,
      tags: 'Indigo Revolt, Neel Darpan, Dinabandhu Mitra, INM',
    },
    {
      id: 'q-wbcs-geo-016',
      text: 'Which river of West Bengal is known as the "Sorrow of Bengal" due to its historically devastating floods?',
      text_bn: 'ঐতিহাসিক বিধ্বংসী বন্যার কারণে পশ্চিমবঙ্গের কোন নদীকে "বাংলার দুঃখ" (Sorrow of Bengal) বলা হতো?',
      optA: 'Teesta',
      optB: 'Damodar',
      optC: 'Mayurakshi',
      optD: 'Kangsabati',
      optA_bn: 'তিস্তা',
      optB_bn: 'দামোদর',
      optC_bn: 'ময়ূরাক্ষী',
      optD_bn: 'কংসাবতী',
      ans: 'B',
      exp: 'The Damodar River was historically known as the "Sorrow of Bengal" due to catastrophic floods in Burdwan, Hooghly, and Howrah. In 1948, the Damodar Valley Corporation (DVC) was established as India\'s first multipurpose river valley project (modeled on the US Tennessee Valley Authority) to tame it.',
      exp_bn: 'ঘন ঘন বিধ্বংসী বন্যার কারণে দামোদর নদীকে "বাংলার দুঃখ" বলা হতো। ১৯৪৮ সালে ভারতের প্রথম বহুমুখী নদী উপত্যকা পরিকল্পনা হিসেবে DVC (Damodar Valley Corporation) গঠিত হয়।',
      short_exp: 'Damodar is the Sorrow of Bengal (tamed by DVC in 1948).',
      fact: 'Teesta is called the "Lifeline of North Bengal" (and sometimes "Trashing River of North Bengal").',
      tip: 'DVC was formed in 1948 on model of TVA (Tennessee Valley Authority, USA).',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-geo-wb',
      chapter_id: 'chap-geo-physio',
      topic_id: 'top-geo-rivers',
      type: 'MCQ',
      diff: 'Easy',
      is_pyq: 1,
      pyq_year: 2017,
      pyq_num: 15,
      attempts: 2300,
      correct: 2210,
      time: 12.0,
      tags: 'Damodar, Rivers of Bengal, DVC, Geography',
    },
    {
      id: 'q-wbcs-polity-017',
      text: 'Money Bill can be introduced in the State Legislative Assembly only with the prior recommendation of whom?',
      text_bn: 'রাজ্য বিধানসভায় অর্থবিল (Money Bill) উত্থাপন করার জন্য কার পূর্বানুমোদনের প্রয়োজন হয়?',
      optA: 'Chief Minister',
      optB: 'Speaker of Legislative Assembly',
      optC: 'Governor',
      optD: 'State Finance Minister',
      optA_bn: 'মুখ্যমন্ত্রী',
      optB_bn: 'বিধানসভার অধ্যক্ষ (স্পিকার)',
      optC_bn: 'রাজ্যপাল',
      optD_bn: 'রাজ্যের অর্থমন্ত্রী',
      ans: 'C',
      exp: 'Under Article 199 and Article 207 of the Constitution of India, a Money Bill cannot be introduced in the State Legislative Assembly without the prior recommendation of the Governor. (At the Union level, prior recommendation of the President is required under Article 110/117).',
      exp_bn: 'সংবিধানের অনুচ্ছেদ ১৯৭/২০৭ অনুযায়ী রাজ্যপালের পূর্বানুমতি ছাড়া রাজ্য বিধানসভায় অর্থবিল পেশ করা যায় না। তবে কোনো বিল অর্থবিল কিনা তা চূড়ান্ত নির্ধারণ করেন বিধানসভার স্পিকার।',
      short_exp: 'Money Bill requires prior recommendation of Governor (introduced only in Assembly).',
      fact: 'Whether a bill is a Money Bill or not is finally certified by the Speaker of the Legislative Assembly.',
      tip: 'Introduction recommendation = Governor; Final Decision/Certification = Speaker.',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-polity',
      chapter_id: 'chap-polity-panchayat',
      topic_id: 'top-polity-73amend',
      type: 'MCQ',
      diff: 'Moderate',
      is_pyq: 1,
      pyq_year: 2021,
      pyq_num: 140,
      attempts: 1180,
      correct: 740,
      time: 26.0,
      tags: 'State Legislature, Governor, Money Bill, Indian Polity',
    },
    {
      id: 'q-wbcs-sci-018',
      text: 'Which gas is responsible for the characteristic pungent smell in onion while slicing?',
      text_bn: 'পেঁয়াজ কাটার সময় ঝাঁঝালো গন্ধ এবং চোখে জল আসার জন্য কোন রাসায়নিক যৌগটি দায়ী?',
      optA: 'Acetic acid',
      optB: 'Syn-propanethial-S-oxide (Sulfur compound)',
      optC: 'Formic acid',
      optD: 'Nitrous oxide',
      optA_bn: 'অ্যাসিটিক অ্যাসিড',
      optB_bn: 'সিন-প্রোপেনথিয়াল-এস-অক্সাইড (সালফার যৌগ)',
      optC_bn: 'ফর্মিক অ্যাসিড',
      optD_bn: 'নাইট্রাস অক্সাইড',
      ans: 'B',
      exp: 'When an onion is cut, enzymes called alliinases react with amino acid sulfoxides to produce syn-propanethial-S-oxide, a volatile sulfur compound that stimulates the lachrymal glands of the eyes to produce tears.',
      exp_bn: 'পেঁয়াজ কাটার সময় নিঃসৃত সালফার যৌগ সিন-প্রোপেনথিয়াল-এস-অক্সাইড চোখের ল্যাক্রিমাল গ্রন্থিকে উদ্দীপিত করে জল বের করে দেয়।',
      short_exp: 'Volatile sulfur compound syn-propanethial-S-oxide causes tears and onion smell.',
      fact: 'Garlic contains a related sulfur compound called allicin, which gives its pungent aroma and antibacterial properties.',
      tip: 'WBPSC often asks which element is responsible for onion/garlic smell: Answer is Sulfur.',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-sci',
      chapter_id: 'chap-sci-physics',
      topic_id: 'top-sci-vitamins',
      type: 'MCQ',
      diff: 'Moderate',
      is_pyq: 1,
      pyq_year: 2023,
      pyq_num: 49,
      attempts: 1040,
      correct: 680,
      time: 28.0,
      tags: 'General Science, Chemistry, Everyday Science, Sulfur',
    },
    {
      id: 'q-wbcs-inm-019',
      text: 'In which session of the Indian National Congress was the historic "Poorna Swaraj" (Complete Independence) resolution adopted?',
      text_bn: 'ভারতীয় জাতীয় কংগ্রেসের কোন অধিবেশনে ঐতিহাসিক "পূর্ণ স্বরাজ" (Complete Independence) প্রস্তাব গৃহীত হয়েছিল?',
      optA: 'Calcutta Session, 1928',
      optB: 'Lahore Session, 1929',
      optC: 'Karachi Session, 1931',
      optD: 'Lucknow Session, 1916',
      optA_bn: 'কলকাতা অধিবেশন, ১৯২৮',
      optB_bn: 'লাহোর অধিবেশন, ১৯২৯',
      optC_bn: 'করাচি অধিবেশন, ১৯৩১',
      optD_bn: 'লখনউ অধিবেশন, ১৯১৬',
      ans: 'B',
      exp: 'The historic Lahore Session of the Indian National Congress in December 1929 was presided over by Jawaharlal Nehru. The resolution of "Poorna Swaraj" was passed, and 26 January 1930 was declared as Independence Day, unfurling the tricolor on the banks of River Ravi.',
      exp_bn: '১৯২৯ সালের ডিসেম্বরে জওহরলাল নেহেরুর সভাপতিত্বে লাহোর অধিবেশনে ঐতিহাসিক "পূর্ণ স্বরাজ" প্রস্তাব গৃহীত হয় এবং ২৬ জানুয়ারি ১৯৩০ প্রথম স্বাধীনতা দিবস পালনের সিদ্ধান্ত হয়।',
      short_exp: 'Lahore Session 1929 presided by Jawaharlal Nehru adopted Poorna Swaraj.',
      fact: 'To commemorate the 26 January 1930 declaration of Poorna Swaraj, 26 January 1950 was chosen as Republic Day when the Constitution of India came into effect.',
      tip: 'Lahore 1929 = Poorna Swaraj; Karachi 1931 = Fundamental Rights & National Economic Program (Patel).',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-inm',
      chapter_id: 'chap-inm-gandhi',
      topic_id: 'top-inm-noncoop',
      type: 'MCQ',
      diff: 'Easy',
      is_pyq: 1,
      pyq_year: 2020,
      pyq_num: 2,
      attempts: 2050,
      correct: 1890,
      time: 14.0,
      tags: 'Poorna Swaraj, Lahore Session 1929, Nehru, INM',
    },
    {
      id: 'q-wbcs-ca-020',
      text: 'Which district of West Bengal received the prestigious United Nations Public Service Award for the successful implementation of the "Kanyashree Prakalpa"?',
      text_bn: 'পশ্চিমবঙ্গ সরকারের কোন প্রকল্প ২০১৭ সালে জাতিসংঘের সর্বোচ্চ জনসেবা পুরস্কার (UN Public Service Award) লাভ করে?',
      optA: 'Kanyashree Prakalpa',
      optB: 'Yuvashree Scheme',
      optC: 'Sabuj Sathi',
      optD: 'Swasthya Sathi',
      optA_bn: 'কন্যাশ্রী প্রকল্প',
      optB_bn: 'যুবশ্রী প্রকল্প',
      optC_bn: 'সবুজ সাথী',
      optD_bn: 'স্বাস্থ্য সাথী',
      ans: 'A',
      exp: 'In June 2017 at The Hague, Netherlands, the West Bengal Government was awarded the first prize in the United Nations Public Service Award for its flagship girl-child empowerment initiative "Kanyashree Prakalpa" among 552 nominated public service initiatives from 62 countries.',
      exp_bn: '২০১৭ সালের ২৩ জুন নেদারল্যান্ডসের দ্য হেগ-এ জাতিসংঘ পশ্চিমবঙ্গ সরকারের "কন্যাশ্রী প্রকল্প"-কে সর্বোচ্চ আন্তর্জাতিক জনসেবা পুরস্কারে প্রথম স্থান প্রদান করে।',
      short_exp: 'Kanyashree Prakalpa won the 1st prize at UN Public Service Awards 2017.',
      fact: 'Kanyashree K1 provides an annual scholarship of ₹1,000 to unmarried girls aged 13-18 (Classes 8-12), and K2 provides a one-time grant of ₹25,000 on reaching 18 years.',
      tip: 'Launch year: 2013 (8 March launch / 1 October official rollout). State Kanyashree Day is celebrated on 14 August.',
      exam_id: 'exam-wbcs',
      stage_id: 'stage-wbcs-prelims',
      paper_id: 'paper-wbcs-prelims-gs',
      subject_id: 'sub-ca',
      chapter_id: 'chap-eco-wb-schemes',
      topic_id: 'top-eco-kanyashree',
      type: 'MCQ',
      diff: 'Easy',
      is_pyq: 1,
      pyq_year: 2018,
      pyq_num: 104,
      attempts: 1850,
      correct: 1720,
      time: 16.0,
      tags: 'Kanyashree, UN Award, West Bengal Schemes, Current Affairs',
    }
  ];

  for (const q of sampleQuestions) {
    insertQuestion.run(
      q.id, q.text, q.text_bn,
      q.optA, q.optB, q.optC, q.optD,
      q.optA_bn, q.optB_bn, q.optC_bn, q.optD_bn,
      q.ans, q.exp, q.exp_bn,
      q.short_exp, q.fact, q.tip,
      q.exam_id, q.stage_id, q.paper_id, q.subject_id, q.chapter_id, q.topic_id,
      q.type, q.diff, 'Bilingual', q.tags, q.is_pyq,
      94.0, 98.0, 0.0, q.attempts, q.correct, q.time,
      'Approved', 'Verified'
    );

    if (q.is_pyq) {
      insertPYQ.run(
        `pyq-${q.id}`,
        q.id,
        q.exam_id,
        q.pyq_year,
        `${q.pyq_year}-06-18`,
        'Prelims Question Paper',
        'Shift 1 (10:30 AM - 1:00 PM)',
        q.pyq_num,
        'WBPSC Official Archive',
        'https://psc.wb.gov.in/previous-papers',
        `WBCS_Prelims_${q.pyq_year}_Official.pdf`
      );
    }
  }

  // 9. Mock Tests
  const insertMock = db.prepare(`
    INSERT INTO mock_tests (
      id, title, title_bn, slug, exam_id, stage_id, paper_id, mock_type,
      duration_mins, total_marks, total_questions, marks_per_correct, negative_marking,
      pass_marks, difficulty, pyq_ratio, is_published, is_featured, is_premium,
      attempt_count, avg_score, metadata_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertMock.run(
    'mock-wbcs-prelims-01',
    'WBCS Prelims 2024 Master Mock 01 (High Yield)',
    'ডব্লিউবিসিএস প্রিলিমস ২০২৪ মাস্টার মক ০১',
    'wbcs-prelims-master-mock-01',
    'exam-wbcs',
    'stage-wbcs-prelims',
    'paper-wbcs-prelims-gs',
    'Full Length',
    150,
    200,
    20,
    1.0,
    0.33,
    125.0,
    'Mixed',
    0.65,
    1,
    1,
    0,
    1480,
    128.4,
    JSON.stringify({ created_by: 'Super Admin', curated_edition: '2024 Ultimate' })
  );

  insertMock.run(
    'mock-wbcs-pyq-2023',
    'WBCS Prelims 2023 Official PYQ Full Paper',
    'ডব্লিউবিসিএস প্রিলিমস ২০২৩ অফিসিয়াল প্রশ্নপত্র',
    'wbcs-prelims-2023-official-pyq',
    'exam-wbcs',
    'stage-wbcs-prelims',
    'paper-wbcs-prelims-gs',
    'PYQ',
    150,
    200,
    15,
    1.0,
    0.33,
    120.0,
    'Mixed',
    1.0,
    1,
    1,
    0,
    3240,
    132.8,
    JSON.stringify({ is_official_archive: true, source_year: 2023 })
  );

  insertMock.run(
    'mock-foodsi-speed-01',
    'WBPSC Food SI 2024 High-Speed Mock 01',
    'ফুড এসআই ২০২৪ হাই-স্পিড মক ০১',
    'wbpsc-food-si-speed-mock-01',
    'exam-food-si',
    'stage-foodsi-written',
    'paper-foodsi-composite',
    'Full Length',
    90,
    100,
    15,
    1.0,
    0.33,
    78.0,
    'Moderate',
    0.50,
    1,
    1,
    0,
    2150,
    68.2,
    JSON.stringify({ time_management_focus: true })
  );

  insertMock.run(
    'mock-wbp-si-grand-01',
    'WB Police SI 2024 Grand Prelims Mock 01',
    'ডব্লিউবি পুলিশ এসআই ২০২৪ গ্র্যান্ড প্রিলিমস মক ০১',
    'wb-police-si-grand-mock-01',
    'exam-wbp-si',
    'stage-wbp-prelims',
    'paper-wbpsi-prelims',
    'Full Length',
    90,
    200,
    15,
    2.0,
    0.50,
    134.0,
    'Moderate',
    0.40,
    1,
    1,
    0,
    980,
    142.5,
    JSON.stringify({ pattern: 'WBP SI 2024' })
  );

  // Link questions to mock tests
  const insertMockQ = db.prepare(`
    INSERT INTO mock_questions (id, mock_id, question_id, order_index, section_name, marks, negative_marks)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const mock1Questions = sampleQuestions.map((q, idx) => ({
    id: `mq-1-${idx + 1}`,
    mock_id: 'mock-wbcs-prelims-01',
    question_id: q.id,
    order_index: idx + 1,
    section_name: q.subject_id === 'sub-inm' ? 'Indian National Movement' : q.subject_id === 'sub-geo-wb' ? 'Geography of WB & India' : q.subject_id === 'sub-polity' ? 'Indian Polity & Economy' : 'General Studies',
    marks: 1.0,
    negative_marks: 0.33,
  }));

  for (const mq of mock1Questions) {
    insertMockQ.run(mq.id, mq.mock_id, mq.question_id, mq.order_index, mq.section_name, mq.marks, mq.negative_marks);
  }

  // Also link for PYQ 2023 mock
  const pyqMockQuestions = sampleQuestions.filter(q => q.is_pyq).map((q, idx) => ({
    id: `mq-pyq-${idx + 1}`,
    mock_id: 'mock-wbcs-pyq-2023',
    question_id: q.id,
    order_index: idx + 1,
    section_name: 'General Studies',
    marks: 1.0,
    negative_marks: 0.33,
  }));

  for (const mq of pyqMockQuestions) {
    insertMockQ.run(mq.id, mq.mock_id, mq.question_id, mq.order_index, mq.section_name, mq.marks, mq.negative_marks);
  }

  // 10. Sample Test Attempts & Performance
  const insertAttempt = db.prepare(`
    INSERT INTO test_attempts (
      id, user_id, mock_id, exam_id, started_at, completed_at,
      score, accuracy, total_correct, total_wrong, total_skipped, total_marked,
      time_spent_secs, rank, percentile, status, subject_breakdown_json
    ) VALUES (?, ?, ?, ?, datetime('now', '-3 days'), datetime('now', '-3 days', '+45 minutes'), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertAttempt.run(
    'att-debjit-1',
    'usr-1',
    'mock-wbcs-prelims-01',
    'exam-wbcs',
    14.67,
    80.0,
    16,
    4,
    0,
    2,
    2700,
    24,
    94.5,
    'completed',
    JSON.stringify([
      { subject: 'Geography of India & WB', correct: 3, total: 3, accuracy: 100 },
      { subject: 'Indian National Movement', correct: 4, total: 5, accuracy: 80 },
      { subject: 'Indian Polity & Economy', correct: 3, total: 4, accuracy: 75 },
      { subject: 'General Science', correct: 2, total: 3, accuracy: 66.7 },
      { subject: 'Current Affairs & WB Schemes', correct: 2, total: 2, accuracy: 100 },
    ])
  );

  const insertAns = db.prepare(`
    INSERT INTO attempt_answers (id, attempt_id, question_id, selected_option, correct_answer, is_correct, time_spent_secs, is_marked_for_review)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertAns.run('ans-1', 'att-debjit-1', 'q-wbcs-inm-001', 'B', 'B', 1, 42, 0);
  insertAns.run('ans-2', 'att-debjit-1', 'q-wbcs-geo-002', 'B', 'B', 1, 28, 0);
  insertAns.run('ans-3', 'att-debjit-1', 'q-wbcs-polity-003', 'C', 'C', 1, 21, 0);
  insertAns.run('ans-4', 'att-debjit-1', 'q-wbcs-geo-004', 'B', 'B', 1, 35, 0);
  insertAns.run('ans-5', 'att-debjit-1', 'q-wbcs-inm-005', 'B', 'B', 1, 18, 0);
  insertAns.run('ans-6', 'att-debjit-1', 'q-wbcs-polity-006', 'A', 'C', 0, 31, 0); // mistake
  insertAns.run('ans-7', 'att-debjit-1', 'q-wbcs-sci-007', 'C', 'C', 1, 15, 0);
  insertAns.run('ans-8', 'att-debjit-1', 'q-foodsi-arith-008', 'B', 'A', 0, 52, 0); // mistake
  insertAns.run('ans-9', 'att-debjit-1', 'q-wbcs-ca-009', 'B', 'B', 1, 19, 0);
  insertAns.run('ans-10', 'att-debjit-1', 'q-wbcs-geo-010', 'B', 'B', 1, 12, 0);

  // 11. Mistake Book Entries
  const insertMistake = db.prepare(`
    INSERT INTO mistake_book (id, user_id, question_id, mistake_type, status, notes, review_count, last_reviewed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', '-1 days'))
  `);
  insertMistake.run('mb-1', 'usr-1', 'q-wbcs-polity-006', 'Concept gap', 'Need Revision', 'Confused 11th Schedule (Panchayat) with 9th Schedule (Land reforms). Need to memorize 73rd vs 74th schedules.', 1);
  insertMistake.run('mb-2', 'usr-1', 'q-foodsi-arith-008', 'Silly mistake', 'Need Revision', 'Subtracted discount incorrectly. Remember net percentage change formula: 25 - 10 - 2.5 = 12.5%.', 2);

  // 12. Weak Areas
  const insertWeak = db.prepare(`
    INSERT INTO weak_areas (id, user_id, exam_id, subject_id, topic_id, total_attempted, correct_count, accuracy_pct, avg_speed_secs, recommendation_note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertWeak.run('wa-1', 'usr-1', 'exam-wbcs', 'sub-polity', 'top-polity-73amend', 12, 5, 41.6, 52.0, 'Low accuracy in Constitutional Amendments & Local Self Government. Practice 20 target questions.');
  insertWeak.run('wa-2', 'usr-1', 'exam-wbcs', 'sub-arith', 'top-arith-profit', 15, 7, 46.7, 58.0, 'Speed bottleneck on successive profit/discount problems. Recommended formula drill.');
  insertWeak.run('wa-3', 'usr-1', 'exam-wbcs', 'sub-sci', 'top-sci-vitamins', 8, 4, 50.0, 41.0, 'Deficiency diseases and chemical names need revision.');

  // 13. Source Registry
  const insertSource = db.prepare(`
    INSERT INTO source_registry (id, name, website, url, authority, source_type, tier, license_status, reliability_score, last_checked, last_successful_import, is_enabled)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '-4 hours'), datetime('now', '-1 days'), 1)
  `);
  insertSource.run('src-wbpsc', 'WBPSC Official Portal', 'https://psc.wb.gov.in', 'https://psc.wb.gov.in/previous-papers', 'West Bengal Public Service Commission', 'Official Portal', 'Tier 1', 'Public Domain / Official Candidate Notice', 99.5);
  insertSource.run('src-wbprb', 'WBPRB Official Portal', 'https://prb.wb.gov.in', 'https://prb.wb.gov.in/notifications', 'West Bengal Police Recruitment Board', 'Official Portal', 'Tier 1', 'Official Recruitment Document', 99.0);
  insertSource.run('src-wbbpe', 'WBBPE Primary Board', 'https://wbbprimaryeducation.org', 'https://wbbprimaryeducation.org/notices', 'West Bengal Board of Primary Education', 'Official Portal', 'Tier 1', 'Public Candidate Notice', 98.0);
  insertSource.run('src-wb-gazette', 'Kolkata Gazette', 'https://kolkatagazette.gov.in', 'https://kolkatagazette.gov.in', 'Govt of West Bengal Official Gazette', 'Government Gazette', 'Tier 1', 'Official Gazette Publication', 99.8);
  insertSource.run('src-pib-bengal', 'PIB Kolkata (Bengal Bureau)', 'https://pib.gov.in', 'https://pib.gov.in/rsubengal', 'Press Information Bureau, Govt of India', 'Govt Press Release', 'Tier 2', 'Government Information Archive', 96.0);

  // 14. Automation Runs & Logs
  const insertAuto = db.prepare(`
    INSERT INTO automation_runs (id, job_name, job_type, started_at, completed_at, duration_secs, status, items_found, items_processed, items_failed, items_requiring_review, log_summary, error_details)
    VALUES (?, ?, ?, datetime('now', '-5 hours'), datetime('now', '-5 hours', '+42 seconds'), ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertAuto.run('run-pyq-1', 'PYQ Discovery Agent', 'discovery', 42.4, 'Success', 6, 6, 0, 2, 'Scanned 5 official sources. Extracted 42 new candidate questions from WBPSC Food SI 2023 Shift 2. 40 auto-classified, 2 queued for ambiguous options.', null);
  insertAuto.run('run-dup-1', 'Duplicate Detection Agent', 'deduplication', 18.2, 'Success', 120, 120, 0, 1, 'Indexed 120 questions against embedding and trigram vectors. Found 1 near-duplicate (94% similarity) flagged for review.', null);
  insertAuto.run('run-ca-1', 'Daily Current Affairs Engine', 'current_affairs', 25.6, 'Success', 15, 15, 0, 0, 'Synthesized 15 West Bengal & National high-yield MCQs for Daily Challenge. 100% verified with PIB Kolkata and Gazette.', null);
  insertAuto.run('run-verify-1', 'AI Verification & Explanation Agent', 'verification', 34.1, 'Success', 28, 28, 0, 3, 'Evaluated fact claims against NCERT/Official Gazette. Confidence scores computed. 3 items tagged with Low Confidence (<85%).', null);

  // 15. Exam Updates Monitor
  const insertUpdate = db.prepare(`
    INSERT INTO exam_updates (id, exam_id, title, source_url, authority, update_type, description, detected_at, is_acknowledged, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', '-6 hours'), ?, ?)
  `);
  insertUpdate.run('upd-1', 'exam-wbcs', 'WBCS 2024 Preliminary Examination Tentative Date Announced', 'https://psc.wb.gov.in/notices/wbcs-2024-schedule', 'WBPSC', 'Exam Date Notice', 'WBPSC has issued an official advisory regarding the tentative schedule for WBCS Prelims 2024 and venue allotment across 26 sub-centers.', 0, 'New');
  insertUpdate.run('upd-2', 'exam-food-si', 'WBPSC Food SI Answer Key Challenge Window Closed', 'https://psc.wb.gov.in/notices/food-si-key', 'WBPSC', 'Answer Key Notice', 'Final answer keys under compilation by expert panel. System alert: Verify revised answer keys against question database.', 1, 'Acknowledged');
  insertUpdate.run('upd-3', 'exam-wbp-si', 'WBP SI Physical Measurement & Efficiency Test (PMT & PET) Schedule Released', 'https://prb.wb.gov.in/wbpsi-pmt-pet', 'WBPRB', 'Recruitment Notice', 'Admit cards for PMT/PET will be available on the board portal starting next Monday.', 0, 'New');

  // 16. Daily Challenge
  const todayStr = new Date().toISOString().split('T')[0];
  const insertDaily = db.prepare(`
    INSERT INTO daily_challenges (id, date_str, title, exam_id, question_count, duration_mins, questions_json, total_participants, avg_score, is_published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);
  insertDaily.run(
    `dc-${todayStr}`,
    todayStr,
    `West Bengal Aspirants Daily Booster (${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })})`,
    'exam-wbcs',
    10,
    10,
    JSON.stringify(sampleQuestions.slice(0, 10).map(q => q.id)),
    648,
    7.8
  );

  // 17. Current Affairs Items
  const insertCA = db.prepare(`
    INSERT INTO current_affairs_items (id, headline, category, event_date, summary, key_facts, question_id, source_name, source_url, is_processed)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);
  insertCA.run(
    'ca-1',
    'West Bengal Budget 2024 Enhances Lakshmir Bhandar Financial Assistance',
    'West Bengal',
    '2024-02-08',
    'Finance Minister of West Bengal announced an increase in Lakshmir Bhandar monthly allowance to ₹1,000 for General and ₹1,200 for SC/ST beneficiaries.',
    'Effective April 2024; Over 2.11 crore women covered statewide.',
    'q-wbcs-ca-009',
    'Govt of West Bengal Budget Document',
    'https://wbfin.wb.gov.in'
  );
  insertCA.run(
    'ca-2',
    'Kolkata Underwater Metro (East-West Corridor) Inaugurated Across Hooghly River',
    'Infrastructure',
    '2024-03-06',
    'India\'s first underwater metro tunnel section connecting Howrah Maidan to Esplanade under the Hooghly River became operational.',
    'Howrah Metro Station is India\'s deepest metro station (33m below ground); underwater section spans 520 metres.',
    null,
    'PIB Kolkata',
    'https://pib.gov.in'
  );

  // 18. Audit Logs
  const insertAudit = db.prepare(`
    INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details, old_value, new_value, ip_address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertAudit.run('aud-1', 'Sourav Mukherjee', 'Super Admin', 'CREATE_MOCK', 'mock_tests', 'mock-wbcs-prelims-01', 'Created WBCS Prelims Master Mock 01 with 20 curated questions.', null, 'mock-wbcs-prelims-01', '192.168.1.10');
  insertAudit.run('aud-2', 'Priya Sen', 'Reviewer', 'APPROVE_QUESTION', 'questions', 'q-wbcs-inm-001', 'Verified Tamralipta Jatiya Sarkar answer against official gazette.', 'Verification Pending', 'Verified', '192.168.1.12');
  insertAudit.run('aud-3', 'Anirban Ghosh', 'Content Manager', 'UPDATE_PATTERN', 'exam_patterns', 'pattern-wbcs-prelims-2024', 'Updated WBCS Prelims negative marking rule to 0.33.', '0.25', '0.33', '192.168.1.15');

  // 19. Question Reports
  const insertReport = db.prepare(`
    INSERT INTO question_reports (id, question_id, user_id, reason, comment, status, admin_notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  insertReport.run('rep-1', 'q-wbcs-geo-002', 'usr-3', 'Typing error in Bengali option', 'Bengali spelling of Purulia was written with different vowel marker in previous version.', 'Resolved', 'Corrected Bengali unicode characters in Option A.');
  insertReport.run('rep-2', 'q-foodsi-arith-008', 'usr-5', 'Ambiguous explanation', 'Please provide shortcut trick alongside step-by-step method.', 'Pending', null);
})();

console.log('✅ Seed completed successfully with authentic WB Exam data!');
db.close();
