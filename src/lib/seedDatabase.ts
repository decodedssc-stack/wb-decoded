import Database from 'better-sqlite3';

export function seedDatabase(db: Database.Database) {
  // Clear any central govt entries to ensure strict West Bengal exclusivity
  db.prepare("DELETE FROM exams WHERE id = 'exam-ssc-cgl'").run();
  db.prepare("DELETE FROM exam_categories WHERE id = 'cat-central'").run();
  db.prepare("DELETE FROM stages WHERE id = 'stage-ssc-tier1'").run();

  db.transaction(() => {
    // 1. Admins & Users
    const insertAdmin = db.prepare(`
      INSERT OR IGNORE INTO admins (id, name, email, role, status, last_login_at)
      VALUES (?, ?, ?, ?, ?, datetime('now', '-2 hours'))
    `);
    insertAdmin.run('adm-1', 'Sourav Mukherjee (Super Admin)', 'admin@wbdecoded.com', 'Super Admin', 'active');
    insertAdmin.run('adm-2', 'Priya Sen (Chief Reviewer)', 'priya@wbdecoded.com', 'Reviewer', 'active');
    insertAdmin.run('adm-3', 'Anirban Ghosh (Content Manager)', 'anirban@wbdecoded.com', 'Content Manager', 'active');
    insertAdmin.run('adm-4', 'Rituja Roy (Data Analyst)', 'rituja@wbdecoded.com', 'Analyst', 'active');

    const insertUser = db.prepare(`
      INSERT OR IGNORE INTO users (id, name, email, role, avatar, phone, is_anonymous, target_exam_id, streak_days, xp_points)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertUser.run('usr-1', 'Debjit Roy', 'debjit@example.com', 'student', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', '9876543210', 0, 'exam-wbcs', 14, 1420);
    insertUser.run('usr-2', 'Sneha Banerjee', 'sneha@example.com', 'student', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', '9876543211', 0, 'exam-wbcs', 28, 2890);
    insertUser.run('usr-3', 'Rahul Chatterjee', 'rahul@example.com', 'student', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', '9876543212', 0, 'exam-wbp-si', 7, 950);
    insertUser.run('usr-4', 'Puja Das', 'puja@example.com', 'student', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', '9876543213', 0, 'exam-food-si', 19, 1840);
    insertUser.run('usr-5', 'Subhajit Paul', 'subhajit@example.com', 'student', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', '9876543214', 0, 'exam-clerkship', 3, 420);

    // 2. Exam Categories (100% West Bengal State Exam Authorities)
    const insertCat = db.prepare(`
      INSERT OR REPLACE INTO exam_categories (id, name, slug, description, icon, order_index)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    insertCat.run('cat-wbpsc', 'West Bengal PSC & Civil Services', 'wbpsc', 'Flagship West Bengal administrative, executive and clerical exams conducted by WBPSC', 'Landmark', 1);
    insertCat.run('cat-police', 'West Bengal Police Recruitment (WBPRB)', 'police', 'Sub-Inspector, Constable, and Kolkata Police uniformed forces recruitment', 'Shield', 2);
    insertCat.run('cat-teaching', 'West Bengal School Education (WBBPE / WBSSC)', 'teaching', 'Primary TET, Upper Primary, and SLST teacher recruitment in West Bengal', 'GraduationCap', 3);
    insertCat.run('cat-municipal', 'West Bengal Municipal & Local Bodies (MSCWB)', 'municipal', 'Kolkata Municipal Corporation and state municipal services recruitment', 'Building2', 4);

    // 3. Exams (Exclusive to West Bengal State)
    const insertExam = db.prepare(`
      INSERT OR REPLACE INTO exams (id, category_id, name, slug, authority, description, syllabus, official_website, notification_url, icon, banner, color_theme, is_active)
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
      'Sub-Inspector in the Subordinate Food & Supplies Service, Grade-III under Food & Supplies Department, Govt of West Bengal.',
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
      'Statewide recruitment for Lower Division Clerk (LDC) and allied office assistant posts across West Bengal Government secretariats and directorates.',
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
      'Statewide competitive exam for recruitment to various executive and inspectorate posts (Assistant Agricultural Marketing Officer, Revenue Inspector, Extension Officer).',
      'Preliminary Examination: 100 MCQs (General Studies 150 Marks + Arithmetic 50 Marks = 200 Marks). Duration: 90 Minutes.',
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
      'Written Examination: 85 MCQs covering General Awareness & GK (25), English (10), Elementary Mathematics (25), Reasoning (25) for 85 Marks (60 Mins).',
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

    // 4. Stages
    const insertStage = db.prepare(`
      INSERT OR IGNORE INTO stages (id, exam_id, name, order_index, is_mandatory)
      VALUES (?, ?, ?, ?, ?)
    `);
    insertStage.run('stage-wbcs-prelims', 'exam-wbcs', 'Preliminary Examination (Screening)', 1, 1);
    insertStage.run('stage-wbcs-mains', 'exam-wbcs', 'Main Written Examination', 2, 1);
    insertStage.run('stage-wbcs-interview', 'exam-wbcs', 'Personality Test / Interview', 3, 1);
    insertStage.run('stage-wbp-prelims', 'exam-wbp-si', 'Preliminary Screening Test', 1, 1);
    insertStage.run('stage-wbp-const-written', 'exam-wbp-constable', 'Written Test (85 Marks)', 1, 1);
    insertStage.run('stage-kp-prelims', 'exam-kp-si', 'KP Preliminary Screening Test', 1, 1);
    insertStage.run('stage-food-written', 'exam-food-si', 'Written Competitive Examination', 1, 1);
    insertStage.run('stage-clerk-part1', 'exam-clerkship', 'Part-I (Objective Type)', 1, 1);
    insertStage.run('stage-misc-prelims', 'exam-wb-misc', 'Preliminary Examination (200 Marks)', 1, 1);
    insertStage.run('stage-tet-written', 'exam-wb-tet', 'TET Written Examination', 1, 1);
    insertStage.run('stage-mscwb-written', 'exam-mscwb', 'MSCWB Written Test', 1, 1);

    // 5. Subjects
    const insertSubject = db.prepare(`
      INSERT OR IGNORE INTO subjects (id, name, code, icon, color, order_index)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    insertSubject.run('sub-inm', 'Indian National Movement', 'INM', 'Flag', '#DC2626', 1);
    insertSubject.run('sub-history', 'History of India', 'HIST', 'Landmark', '#B45309', 2);
    insertSubject.run('sub-geo-wb', 'Geography of India & West Bengal', 'GEO-WB', 'MapPin', '#047857', 3);
    insertSubject.run('sub-polity', 'Indian Polity & Constitution', 'POLITY', 'Scale', '#1D4ED8', 4);
    insertSubject.run('sub-economy', 'Indian Economy & WB Schemes', 'ECON', 'Coins', '#7C3AED', 5);
    insertSubject.run('sub-science', 'General Science & Technology', 'SCI', 'Atom', '#0284C7', 6);
    insertSubject.run('sub-english', 'English Composition', 'ENG', 'BookOpen', '#4338CA', 7);
    insertSubject.run('sub-reasoning', 'General Mental Ability & Reasoning', 'REAS', 'Brain', '#9333EA', 8);
    insertSubject.run('sub-arithmetic', 'Arithmetic & Numerical Ability', 'ARITH', 'Calculator', '#D97706', 9);
    insertSubject.run('sub-ca', 'Current Affairs & WB Govt Schemes', 'CA', 'Newspaper', '#059669', 10);
    insertSubject.run('sub-cdp', 'Child Development & Pedagogy', 'CDP', 'Smile', '#E11D48', 11);
    insertSubject.run('sub-bengali', 'Bengali Language & Grammar', 'BEN', 'Feather', '#C026D3', 12);

    // 6. Chapters & Topics
    const insertChapter = db.prepare(`
      INSERT OR IGNORE INTO chapters (id, subject_id, name, order_index)
      VALUES (?, ?, ?, ?)
    `);
    insertChapter.run('chap-inm-revolt', 'sub-inm', 'Early Uprisings & Revolt of 1857 in Bengal', 1);
    insertChapter.run('chap-inm-swadeshi', 'sub-inm', 'Swadeshi Movement & Revolutionary Bengal', 2);
    insertChapter.run('chap-inm-quit-india', 'sub-inm', 'Quit India & Subhas Chandra Bose (INA)', 3);
    insertChapter.run('chap-geo-physio', 'sub-geo-wb', 'Physiography & Rivers of West Bengal', 1);
    insertChapter.run('chap-geo-resources', 'sub-geo-wb', 'Districts, Demography & Mineral Resources of WB', 2);
    insertChapter.run('chap-pol-preamble', 'sub-polity', 'Constituent Assembly, Preamble & Key Articles', 1);
    insertChapter.run('chap-pol-fr', 'sub-polity', 'Fundamental Rights & Directive Principles (DPSP)', 2);
    insertChapter.run('chap-pol-judiciary', 'sub-polity', 'Supreme Court & Calcutta High Court Jurisdiction', 3);
    insertChapter.run('chap-arith-percentage', 'sub-arithmetic', 'Percentage, Profit & Loss, Simple Interest', 1);
    insertChapter.run('chap-arith-ratio', 'sub-arithmetic', 'Ratio & Proportion, Partnership & Mixtures', 2);
    insertChapter.run('chap-arith-speed', 'sub-arithmetic', 'Time, Speed, Distance & Trains', 3);

    const insertTopic = db.prepare(`
      INSERT OR IGNORE INTO topics (id, chapter_id, name, order_index)
      VALUES (?, ?, ?, ?)
    `);
    insertTopic.run('top-tamralipta', 'chap-inm-quit-india', 'Tamralipta Jatiya Sarkar & Matangini Hazra', 1);
    insertTopic.run('top-anushilan', 'chap-inm-swadeshi', 'Anushilan Samiti & Jugantar Party', 2);
    insertTopic.run('top-santhal', 'chap-inm-revolt', 'Santhal Rebellion (1855) & Indigo Revolt (1859)', 3);
    insertTopic.run('top-sandakphu', 'chap-geo-physio', 'Singalila Ridge, Sandakphu & Himalayan Rivers', 1);
    insertTopic.run('top-sunderbans', 'chap-geo-physio', 'Sundarbans Delta, Estuaries & Mangrove Ecology', 2);
    insertTopic.run('top-art32', 'chap-pol-fr', 'Writs under Article 32 & Article 226', 1);
    insertTopic.run('top-highcourt', 'chap-pol-judiciary', 'Calcutta High Court (Oldest HC) Jurisdiction & Circuit Benches', 2);
    insertTopic.run('top-profit-loss', 'chap-arith-percentage', 'Successive Discounts & Marked Price Formulas', 1);

    // 7. Exam Patterns
    const insertPattern = db.prepare(`
      INSERT OR REPLACE INTO exam_patterns (
        id, exam_id, name, total_questions, total_marks, duration_mins,
        marks_per_correct, negative_marking, passing_marks, section_timing_enabled,
        subject_distribution_json, difficulty_distribution_json, duplicate_policy, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertPattern.run(
      'pattern-wbcs-prelims-2024',
      'exam-wbcs',
      'WBCS Preliminary Examination Pattern (Standard 200 MCQs)',
      200, 200.0, 150, 1.0, 0.33, 128.5, 0,
      JSON.stringify([
        { subject: 'English Composition', count: 25, marks: 25 },
        { subject: 'General Science', count: 25, marks: 25 },
        { subject: 'Current Affairs & WB Schemes', count: 25, marks: 25 },
        { subject: 'History of India', count: 25, marks: 25 },
        { subject: 'Geography of India & West Bengal', count: 25, marks: 25 },
        { subject: 'Indian Polity & Economy', count: 25, marks: 25 },
        { subject: 'Indian National Movement', count: 25, marks: 25 },
        { subject: 'General Mental Ability', count: 25, marks: 25 },
      ]),
      JSON.stringify({ Easy: 30, Moderate: 50, Hard: 20 }),
      'no_repeat',
      1
    );

    insertPattern.run(
      'pattern-food-si-written',
      'exam-food-si',
      'WBPSC Food SI Written Exam Pattern (100 MCQs / 100 Marks)',
      100, 100.0, 90, 1.0, 0.33, 82.0, 0,
      JSON.stringify([
        { subject: 'General Studies & Everyday Science', count: 50, marks: 50 },
        { subject: 'Arithmetic & Mental Ability (Madhyamik Standard)', count: 50, marks: 50 },
      ]),
      JSON.stringify({ Easy: 40, Moderate: 45, Hard: 15 }),
      'no_repeat',
      1
    );

    insertPattern.run(
      'pattern-wbp-si-prelims',
      'exam-wbp-si',
      'WB Police SI Preliminary Pattern (100 MCQs / 200 Marks)',
      100, 200.0, 90, 2.0, 0.50, 135.0, 0,
      JSON.stringify([
        { subject: 'General Studies (including WB GK)', count: 50, marks: 100 },
        { subject: 'Logical & Analytical Reasoning', count: 25, marks: 50 },
        { subject: 'Arithmetic', count: 25, marks: 50 },
      ]),
      JSON.stringify({ Easy: 35, Moderate: 45, Hard: 20 }),
      'no_repeat',
      1
    );

    insertPattern.run(
      'pattern-wbp-constable-written',
      'exam-wbp-constable',
      'WB Police Constable Written Exam Pattern (85 MCQs / 85 Marks)',
      85, 85.0, 60, 1.0, 0.25, 62.0, 0,
      JSON.stringify([
        { subject: 'General Awareness & General Knowledge', count: 25, marks: 25 },
        { subject: 'English', count: 10, marks: 10 },
        { subject: 'Elementary Mathematics (Madhyamik Standard)', count: 25, marks: 25 },
        { subject: 'Reasoning & Logical Analysis', count: 25, marks: 25 },
      ]),
      JSON.stringify({ Easy: 50, Moderate: 40, Hard: 10 }),
      'no_repeat',
      1
    );

    insertPattern.run(
      'pattern-wb-misc-prelims',
      'exam-wb-misc',
      'WBPSC Miscellaneous Services Preliminary Pattern (100 MCQs / 200 Marks)',
      100, 200.0, 90, 2.0, 0.66, 120.0, 0,
      JSON.stringify([
        { subject: 'General Studies (including West Bengal Affairs)', count: 75, marks: 150 },
        { subject: 'Arithmetic (Madhyamik Standard)', count: 25, marks: 50 },
      ]),
      JSON.stringify({ Easy: 35, Moderate: 45, Hard: 20 }),
      'no_repeat',
      1
    );

    // 8. Questions (Authentic WB State Exam Questions)
    const insertQ = db.prepare(`
      INSERT OR REPLACE INTO questions (
        id, exam_id, stage_id, subject_id, chapter_id, topic_id,
        question_text, question_text_bn,
        option_a, option_a_bn,
        option_b, option_b_bn,
        option_c, option_c_bn,
        option_d, option_d_bn,
        correct_answer, explanation, explanation_bn,
        important_fact, exam_tip, difficulty, question_type,
        is_pyq, pyq_year, pyq_exam, pyq_source,
        verification_status, lifecycle_status, confidence_score, quality_score, language
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?,
        ?, ?,
        ?, ?,
        ?, ?,
        ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?
      )
    `);

    // Q1 - WBCS INM
    insertQ.run(
      'q-wbcs-inm-001',
      'exam-wbcs',
      'stage-wbcs-prelims',
      'sub-inm',
      'chap-inm-quit-india',
      'top-tamralipta',
      'During the Quit India Movement of 1942, a parallel government named "Tamralipta Jatiya Sarkar" was established in which district of Bengal?',
      '১৯৪২ সালের ভারত ছাড়ো আন্দোলনের সময় বাংলার কোন জেলায় "তাম্রলিপ্ত জাতীয় সরকার" নামক সমান্তরাল সরকার প্রতিষ্ঠিত হয়েছিল?',
      'Midnapore (Purba Medinipur)', 'মেদিনীপুর (পূর্ব মেদিনীপুর)',
      'Birbhum', 'বীরভূম',
      'Bankura', 'বাঁকুড়া',
      'Hooghly', 'হুগলি',
      'A',
      'The Tamralipta Jatiya Sarkar was an independent parallel government established by Ajoy Mukherjee, Satish Chandra Samanta, and Sushil Kumar Dhara in Tamluk subdivision of Midnapore district during the Quit India Movement. It functioned from December 17, 1942, to September 8, 1944, and maintained its own police, judiciary, and relief departments (Vidyut Vahini).',
      '১৯৪২ সালের ১৭ই ডিসেম্বর মেদিনীপুর জেলার তমলুক মহকুমায় সতীশচন্দ্র সামন্ত, অজয় মুখোপাধ্যায় ও সুশীলকুমার ধারার নেতৃত্বে তাম্রলিপ্ত জাতীয় সরকার গঠিত হয়। এটি ১৯৪৪ সালের সেপ্টেম্বর পর্যন্ত সক্রিয় ছিল।',
      '73-year-old Matangini Hazra was martyred on 29 September 1942 while leading a procession to capture the Tamluk police station.',
      'WBPSC frequently asks about parallel governments in 1942: Tamralipta (Bengal), Ballia (Chittu Pandey, UP), and Satara (Nana Patil, Maharashtra).',
      'Moderate', 'Single Choice',
      1, 2022, 'WBCS Prelims', 'WBPSC WBCS Official Prelims 2022 Question Paper',
      'Verified', 'Approved', 99.4, 96.0, 'Bilingual'
    );

    // Q2 - WBCS Geography
    insertQ.run(
      'q-wbcs-geo-002',
      'exam-wbcs',
      'stage-wbcs-prelims',
      'sub-geo-wb',
      'chap-geo-physio',
      'top-sandakphu',
      'Which is the highest peak in the state of West Bengal?',
      'পশ্চিমবঙ্গ রাজ্যের সর্বোচ্চ শৃঙ্গ কোনটি?',
      'Sandakphu (3,636 m)', 'সান্দাকফু (৩,৬৩৬ মিটার)',
      'Phalut (3,600 m)', 'ফালুট (৩,৬০০ মিটার)',
      'Tonglu (3,036 m)', 'টংলু (৩,০৩৬ মিটার)',
      'Sabargram (3,543 m)', 'সবরগ্রাম (৩,৫৪৩ মিটার)',
      'A',
      'Sandakphu (3,636 m / 11,930 ft) located on the Singalila Ridge along the West Bengal-Nepal border in Darjeeling district is the highest point of West Bengal. From its peak, four of the five highest peaks in the world (Everest, Kanchenjunga, Lhotse, and Makalu) can be viewed.',
      'সান্দাকফু (৩,৬৩৬ মিটার) দার্জিলিং জেলায় সিঙ্গালীলা পর্বতশ্রেণীতে অবস্থিত এবং এটি পশ্চিমবঙ্গের সর্বোচ্চ পর্বতশৃঙ্গ। এখান থেকে কাঞ্চনজঙ্ঘা ও এভারেস্ট স্পষ্ট দেখা যায়।',
      'Singalila National Park surrounds Sandakphu and is home to the endangered Red Panda.',
      'Remember the height order on Singalila ridge: Sandakphu (3636 m) > Phalut (3600 m) > Sabargram (3543 m) > Tonglu (3036 m).',
      'Easy', 'Single Choice',
      1, 2023, 'WBCS Prelims', 'WBPSC WBCS Official Prelims 2023 Question Paper',
      'Verified', 'Approved', 99.8, 98.0, 'Bilingual'
    );

    // Q3 - WBCS Polity
    insertQ.run(
      'q-wbcs-polity-003',
      'exam-wbcs',
      'stage-wbcs-prelims',
      'sub-polity',
      'chap-pol-fr',
      'top-art32',
      'Which writ is issued by the High Court under Article 226 or Supreme Court under Article 32 to quash an order passed by a lower court in excess of its jurisdiction?',
      'অধস্তন আদালত তার এক্তিয়ার বহির্ভূত কোনো রায় দিলে তা বাতিল করতে উচ্চ আদালত কোন রিট জারি করে?',
      'Certiorari', 'সার্টিওরারি (Certiorari / উৎপেষণ)',
      'Mandamus', 'ম্যান্ডামাস (Mandamus / পরমাদেশ)',
      'Habeas Corpus', 'হেবিয়াস কর্পাস (Habeas Corpus / বন্দি প্রত্যক্ষীকরণ)',
      'Quo-Warranto', 'কো-ওয়ারেন্টো (Quo-Warranto / অধিকার পৃচ্ছা)',
      'A',
      'Certiorari is a curative writ issued by a higher court (Supreme Court under Article 32, High Court under Article 226) to quash the order of a lower court or tribunal that acted without jurisdiction or in excess of jurisdiction, or violated principles of natural justice.',
      'সার্টিওরারি (Certiorari) রিটটি কোনো অধস্তন আদালত বা ট্রাইব্যুনালের এখতিয়ার বহির্ভূত রায় বা সিদ্ধান্তের বিরুদ্ধে জারি করে সেই রায় বাতিল করা হয়।',
      'While Prohibition is preventive (issued before final order), Certiorari is both preventive and curative (quashes after order).',
      'Article 32 is a Fundamental Right itself, whereas Article 226 is a constitutional remedy with wider discretionary scope.',
      'Hard', 'Single Choice',
      1, 2021, 'WBCS Prelims', 'WBPSC WBCS Official Prelims 2021 Question Paper',
      'Verified', 'Approved', 98.5, 94.0, 'Bilingual'
    );

    // Q4 - Food SI Arithmetic
    insertQ.run(
      'q-foodsi-arith-008',
      'exam-food-si',
      'stage-food-written',
      'sub-arithmetic',
      'chap-arith-percentage',
      'top-profit-loss',
      'A shopkeeper marks an article 40% above the cost price and allows a discount of 20% on the marked price. What is his net profit percentage?',
      'একজন দোকানদার একটি দ্রব্যের ক্রয়মূল্যের ওপর ৪০% বাড়িয়ে ধার্যমূল্য স্থির করলেন এবং বিক্রির সময় ২০% ছাড় দিলেন। তাঁর শতকরা কত লাভ হলো?',
      '12%', '১২%',
      '20%', '২০%',
      '15%', '১৫%',
      '18%', '১৮%',
      'A',
      'Let Cost Price (CP) = ₹100. Marked Price (MP) = 100 + 40% of 100 = ₹140. Selling Price (SP) = 140 - 20% of 140 = 140 - 28 = ₹112. Profit = SP - CP = 112 - 100 = ₹12. Profit Percentage = (12/100) * 100 = 12%. Shortcut formula: Net % = a - b - (ab/100) = 40 - 20 - (40*20/100) = 20 - 8 = 12%.',
      'ধরি ক্রয়মূল্য ১০০ টাকা। ধার্যমূল্য = ১৪০ টাকা। বিক্রয়মূল্য = ১৪০ - (১৪০ এর ২০%) = ১১২ টাকা। নিট লাভ = ১২%।',
      'Formula: Net Profit% = Mark-up% - Discount% - (Mark-up * Discount)/100.',
      'In WBPSC Food SI and Clerkship arithmetic, using the base 100 substitution saves over 40 seconds per question.',
      'Easy', 'Single Choice',
      1, 2019, 'WBPSC Food SI', 'WBPSC Official Food SI 2019 Question Paper',
      'Verified', 'Approved', 100.0, 99.0, 'Bilingual'
    );

    // Q5 - WB Police SI Reasoning & GK
    insertQ.run(
      'q-wbpsi-gk-009',
      'exam-wbp-si',
      'stage-wbp-prelims',
      'sub-history',
      'chap-inm-swadeshi',
      'top-anushilan',
      'Who founded the "Anushilan Samiti" in Calcutta in 1902 as a secret revolutionary society in Bengal?',
      '১৯০২ সালে কলকাতায় বাংলায় গুপ্ত বিপ্লবী সমিতি "অনুশীলন সমিতি" কে প্রতিষ্ঠা করেছিলেন?',
      'Pramathanath Mitra (P. Mitra)', 'প্রমথনাথ মিত্র (পি. মিত্র)',
      'Barindra Kumar Ghosh', 'বারীন্দ্রকুমার ঘোষ',
      'Rash Behari Bose', 'রাসবিহারী বসু',
      'Jatindranath Mukherjee (Bagha Jatin)', 'যতীন্দ্রনাথ মুখোপাধ্যায় (বাঘা যতীন)',
      'A',
      'Anushilan Samiti was founded on 24 March 1902 by Pramathanath Mitra (Bar-at-Law) along with Jatindranath Banerjee (Niralamba Swami) and Barindra Kumar Ghosh, patronized by Miss Sarala Devi and Sister Nivedita. It advocated revolutionary nationalist methods against British colonial rule in Bengal.',
      '১৯০২ সালের ২৪শে মার্চ ব্যারিস্টার প্রমথনাথ মিত্রের উদ্যোগে যতীন্দ্রনাথ বন্দ্যোপাধ্যায় ও বারীন্দ্রকুমার ঘোষের সহযোগিতায় অনুশীলন সমিতি প্রতিষ্ঠিত হয়। ভগিনী নিবেদিতা ও সরলা দেবী এই সমিতিকে সক্রিয়ভাবে উৎসাহিত করেন।',
      'The Dacca Anushilan Samiti was later established by Pulin Behari Das in November 1905 with over 500 branches.',
      'WB Police SI frequently asks about revolutionary organizations in Bengal: Anushilan Samiti (1902), Jugantar (1906), and Bengal Volunteers (1928, Hemchandra Ghosh).',
      'Moderate', 'Single Choice',
      1, 2019, 'WB Police SI Prelims', 'WBPRB Official 2019 Preliminary Question Paper',
      'Verified', 'Approved', 99.1, 95.0, 'Bilingual'
    );

    // Q6 - WBPSC Miscellaneous GK & Schemes
    insertQ.run(
      'q-misc-gk-010',
      'exam-wb-misc',
      'stage-misc-prelims',
      'sub-economy',
      'chap-geo-resources',
      'top-sunderbans',
      'The flagship welfare scheme of the Government of West Bengal for universal health coverage up to ₹5 Lakhs per family per annum is known as:',
      'পশ্চিমবঙ্গ সরকারের প্রতি বছর পরিবার পিছু ৫ লক্ষ টাকা পর্যন্ত বিনামূল্যে চিকিৎসার সার্বজনীন স্বাস্থ্য বিমা প্রকল্পের নাম কী?',
      'Swasthya Sathi Scheme', 'স্বাস্থ্য সাথী প্রকল্প',
      'Kanyashree Prakalpa', 'কন্যাশ্রী প্রকল্প',
      'Rupashree Prakalpa', 'রূপশ্রী প্রকল্প',
      'Gatidhara Scheme', 'গতিধারা প্রকল্প',
      'A',
      'Swasthya Sathi was officially launched by the Government of West Bengal on 30th December 2016. It provides comprehensive cashless secondary and tertiary healthcare coverage of up to ₹5,00,000 per family per year, issued in the name of the eldest female member of the family as the cardholder.',
      'স্বাস্থ্য সাথী প্রকল্পটি ২০১৬ সালের ৩০শে ডিসেম্বর পশ্চিমবঙ্গ সরকার কর্তৃক চালু হয়। এই প্রকল্পে পরিবারের প্রবীণতম মহিলার নামে স্মার্ট কার্ড দেওয়া হয় এবং পরিবার পিছু বছরে ৫ লক্ষ টাকা পর্যন্ত বিনামূল্যে ক্যাশলেস চিকিৎসার সুবিধা দেওয়া হয়।',
      'Smart Cards are issued in the name of the female head of the family, empowering women in healthcare decisions.',
      'West Bengal State Government schemes (Kanyashree, Rupashree, Lakshmir Bhandar, Swasthya Sathi, Sabooj Sathi, Krishak Bandhu) carry 10–15% weightage in WBPSC Miscellaneous & Clerkship exams.',
      'Easy', 'Single Choice',
      1, 2020, 'WBPSC Miscellaneous Prelims', 'WBPSC Miscellaneous Official 2020 Question Paper',
      'Verified', 'Approved', 100.0, 99.0, 'Bilingual'
    );

    // 9. Mock Tests
    const insertMock = db.prepare(`
      INSERT OR REPLACE INTO mock_tests (
        id, exam_id, pattern_id, title, slug, description, mock_type,
        duration_mins, total_marks, total_questions, marks_per_correct, negative_marking,
        pass_marks, difficulty, pyq_ratio, is_published, is_featured, is_premium
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?
      )
    `);

    insertMock.run(
      'mock-wbcs-prelims-01',
      'exam-wbcs',
      'pattern-wbcs-prelims-2024',
      'WBCS Prelims Full Mock Test 01 (Official WBPSC Standard)',
      'wbcs-prelims-mock-01',
      'Full-length simulation modeled on the exact WBPSC syllabus with balanced subject weightages and comprehensive explanations.',
      'Full Length',
      120, 200.0, 20, 1.0, 0.33, 125.0, 'Mixed', 0.6, 1, 1, 0
    );

    insertMock.run(
      'mock-wbp-si-01',
      'exam-wbp-si',
      'pattern-wbp-si-prelims',
      'WB Police SI Prelims Full Mock Test 01',
      'wbp-si-prelims-mock-01',
      'Targeted preliminary mock for WB Police Sub-Inspector with GS, Reasoning, and Arithmetic.',
      'Full Length',
      90, 200.0, 15, 2.0, 0.50, 130.0, 'Moderate', 0.5, 1, 1, 0
    );

    insertMock.run(
      'mock-food-si-01',
      'exam-food-si',
      'pattern-food-si-written',
      'WBPSC Food SI Written Practice Mock 01',
      'food-si-written-mock-01',
      'High-yield 50 GS + 50 Arithmetic speed mock designed for the WBPSC Sub-Inspector recruitment.',
      'Full Length',
      90, 100.0, 15, 1.0, 0.33, 80.0, 'Moderate', 0.7, 1, 1, 0
    );

    insertMock.run(
      'mock-wb-misc-01',
      'exam-wb-misc',
      'pattern-wb-misc-prelims',
      'WBPSC Miscellaneous Services Prelims Mock 01',
      'wb-misc-prelims-mock-01',
      'Comprehensive 75 GS + 25 Arithmetic simulation for WBPSC Miscellaneous Services Examination.',
      'Full Length',
      90, 200.0, 15, 2.0, 0.66, 120.0, 'Moderate', 0.6, 1, 1, 0
    );

    // 10. Mock Questions mapping
    const insertMQ = db.prepare(`
      INSERT OR REPLACE INTO mock_questions (id, mock_id, question_id, order_index, section_name, marks, negative_marks)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    insertMQ.run('mq-1', 'mock-wbcs-prelims-01', 'q-wbcs-inm-001', 1, 'Indian National Movement', 1.0, 0.33);
    insertMQ.run('mq-2', 'mock-wbcs-prelims-01', 'q-wbcs-geo-002', 2, 'Geography of India & WB', 1.0, 0.33);
    insertMQ.run('mq-3', 'mock-wbcs-prelims-01', 'q-wbcs-polity-003', 3, 'Indian Polity & Economy', 1.0, 0.33);
    insertMQ.run('mq-4', 'mock-wbcs-prelims-01', 'q-foodsi-arith-008', 4, 'General Mental Ability', 1.0, 0.33);

    // 11. PYQ Metadata
    const insertPYQ = db.prepare(`
      INSERT OR REPLACE INTO pyq_metadata (id, question_id, exam_id, exam_year, exam_session, official_paper_code, source_document_url, is_verified_with_official_key)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertPYQ.run('pyq-1', 'q-wbcs-inm-001', 'exam-wbcs', 2022, 'Prelims Morning', 'WBCS-PRE-2022-SET-A', 'https://psc.wb.gov.in/pdf/wbcs-2022.pdf', 1);
    insertPYQ.run('pyq-2', 'q-wbcs-geo-002', 'exam-wbcs', 2023, 'Prelims Morning', 'WBCS-PRE-2023-SET-B', 'https://psc.wb.gov.in/pdf/wbcs-2023.pdf', 1);
    insertPYQ.run('pyq-3', 'q-wbcs-polity-003', 'exam-wbcs', 2021, 'Prelims Morning', 'WBCS-PRE-2021-SET-A', 'https://psc.wb.gov.in/pdf/wbcs-2021.pdf', 1);
    insertPYQ.run('pyq-4', 'q-foodsi-arith-008', 'exam-food-si', 2019, 'Shift 1', 'FOODSI-2019-SET-A', 'https://psc.wb.gov.in/pdf/foodsi-2019.pdf', 1);
    insertPYQ.run('pyq-5', 'q-wbpsi-gk-009', 'exam-wbp-si', 2019, 'Prelims', 'WBPSI-2019-SET-A', 'https://prb.wb.gov.in/pdf/wbpsi-2019.pdf', 1);
    insertPYQ.run('pyq-6', 'q-misc-gk-010', 'exam-wb-misc', 2020, 'Prelims', 'MISC-2020-SET-A', 'https://psc.wb.gov.in/pdf/misc-2020.pdf', 1);

    // 12. Source Registry
    const insertSource = db.prepare(`
      INSERT OR REPLACE INTO source_registry (id, name, authority, url, tier, license_status, is_active, reliability_score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertSource.run('src-wbpsc', 'WBPSC Official Portal', 'West Bengal Public Service Commission', 'https://psc.wb.gov.in', 'Tier 1 Official', 'Public Official Notices & Papers', 1, 99.8);
    insertSource.run('src-wbprb', 'WBPRB Police Portal', 'West Bengal Police Recruitment Board', 'https://prb.wb.gov.in', 'Tier 1 Official', 'Public Police Recruitment Keys', 1, 99.5);
    insertSource.run('src-wbbpe', 'WBBPE Primary Board', 'West Bengal Board of Primary Education', 'https://wbbpe.org', 'Tier 1 Official', 'TET Question Papers & Keys', 1, 98.9);
    insertSource.run('src-mscwb', 'MSCWB Municipal Portal', 'Municipal Service Commission of West Bengal', 'https://mscwb.org', 'Tier 1 Official', 'Municipal Recruitment Notices', 1, 98.5);

    // 13. Automation Runs
    const insertRun = db.prepare(`
      INSERT OR REPLACE INTO automation_runs (id, job_name, status, started_at, completed_at, duration_secs, items_found, items_processed, items_failed, items_requiring_review, log_summary)
      VALUES (?, ?, ?, datetime('now', '-2 hours'), datetime('now', '-2 hours', '+32 seconds'), ?, ?, ?, ?, ?, ?)
    `);
    insertRun.run('run-1', 'WB State PYQ Discovery Agent', 'Success', 32, 14, 14, 0, 0, 'Checked WBPSC and WBPRB official portals. Successfully indexed 14 verified answer keys.');
    insertRun.run('run-2', 'WB Syllabus Verification Agent', 'Success', 18, 20, 20, 0, 0, 'Cross-referenced factual claims against West Bengal Gazette & State Syllabus.');

    // 14. Exam Updates
    const insertUpdate = db.prepare(`
      INSERT OR REPLACE INTO exam_updates (id, authority, title, update_type, description, source_url, is_acknowledged)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    insertUpdate.run('upd-1', 'WBPSC', 'WBCS 2024 Preliminary Examination Notification Schedule Released', 'Notification', 'WBPSC released the tentative schedule and online registration guidelines for WBCS 2024.', 'https://psc.wb.gov.in/notices', 0);
    insertUpdate.run('upd-2', 'WBPRB', 'WB Police Sub-Inspector (UB/AB) Physical Measurement Dates Announced', 'Dates', 'WBPRB announced PMT/PET center allocation for qualified candidates.', 'https://prb.wb.gov.in', 1);

    // 15. Daily Challenges
    const insertChallenge = db.prepare(`
      INSERT OR REPLACE INTO daily_challenges (id, date, title, questions_count, duration_mins, xp_reward, is_active)
      VALUES (?, date('now'), ?, ?, ?, ?, ?)
    `);
    insertChallenge.run('dc-today', 'West Bengal State Exams Daily Booster Drill', 15, 15, 150, 1);

    // 16. Current Affairs Items
    const insertCA = db.prepare(`
      INSERT OR REPLACE INTO current_affairs_items (id, headline, category, event_date, summary, key_facts, question_id, is_active)
      VALUES (?, ?, ?, date('now', '-1 day'), ?, ?, ?, ?)
    `);
    insertCA.run('ca-1', 'West Bengal Budget 2024 Enhances Lakshmir Bhandar Allowance', 'West Bengal Schemes', 'West Bengal government announced an increment of monthly financial assistance under Lakshmir Bhandar scheme to ₹1,000 for general category and ₹1,200 for SC/ST women.', 'Beneficiaries: ~2.11 Crore women; Effective from April 1, 2024; Administered by Dept of Women & Child Development.', 'q-wbcs-ca-001', 1);

    // 17. Audit Logs
    const insertAudit = db.prepare(`
      INSERT OR REPLACE INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details, old_value, new_value, ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertAudit.run('aud-1', 'Sourav Mukherjee', 'Super Admin', 'CREATE_MOCK', 'mock_tests', 'mock-wbcs-prelims-01', 'Created WBCS Prelims Master Mock 01 with 20 curated questions.', null, 'mock-wbcs-prelims-01', '192.168.1.10');
    insertAudit.run('aud-2', 'Priya Sen', 'Reviewer', 'APPROVE_QUESTION', 'questions', 'q-wbcs-inm-001', 'Verified Tamralipta Jatiya Sarkar answer against official gazette.', 'Verification Pending', 'Verified', '192.168.1.12');
  })();
}
