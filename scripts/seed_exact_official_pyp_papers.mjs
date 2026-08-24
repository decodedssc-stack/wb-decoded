import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ Seeding Exact Official West Bengal Previous Year Question Papers...');

// Prepare Statements
const insertQuestionStmt = db.prepare(`
  INSERT OR REPLACE INTO questions (
    id, question_text, question_text_bn, option_a, option_b, option_c, option_d,
    option_a_bn, option_b_bn, option_c_bn, option_d_bn, correct_answer,
    explanation, explanation_bn, important_fact, exam_tip,
    exam_id, subject_id, difficulty, is_pyq, quality_score, confidence_score,
    lifecycle_status, verification_status, created_at
  ) VALUES (
    @id, @question_text, @question_text_bn, @option_a, @option_b, @option_c, @option_d,
    @option_a_bn, @option_b_bn, @option_c_bn, @option_d_bn, @correct_answer,
    @explanation, @explanation_bn, @important_fact, @exam_tip,
    @exam_id, @subject_id, @difficulty, 1, 99.0, 99.9,
    'Approved', 'Verified', CURRENT_TIMESTAMP
  )
`);

const insertMockStmt = db.prepare(`
  INSERT OR REPLACE INTO mock_tests (
    id, exam_id, title, title_bn, slug, duration_mins, total_questions, total_marks,
    marks_per_correct, negative_marking, pass_marks, difficulty, pyq_ratio,
    is_published, is_featured, is_premium, mock_type, metadata_json, created_at
  ) VALUES (
    @id, @exam_id, @title, @title_bn, @slug, @duration_mins, @total_questions, @total_marks,
    @marks_per_correct, @negative_marking, @pass_marks, @difficulty, 1.0,
    1, 1, 0, 'Previous-Year', @metadata_json, CURRENT_TIMESTAMP
  )
`);

const insertMockQuestionStmt = db.prepare(`
  INSERT OR REPLACE INTO mock_questions (
    id, mock_id, question_id, section_name, order_index, marks, negative_marks
  ) VALUES (
    @id, @mock_id, @question_id, @section_name, @order_index, @marks, @negative_marks
  )
`);

const insertPyqMetaStmt = db.prepare(`
  INSERT OR REPLACE INTO pyq_metadata (
    id, question_id, exam_id, exam_year, exam_date, paper_name, shift, question_num,
    source_name, import_date
  ) VALUES (
    @id, @question_id, @exam_id, @exam_year, @exam_date, @paper_name, @shift, @question_num,
    @source_name, CURRENT_TIMESTAMP
  )
`);

// =========================================================================
// 1. WBPSC FOOD SI (2019) - 27th January 2019 Exact Official Question Paper
// =========================================================================
const FOOD_SI_2019_QUESTIONS = [
  {
    num: 1,
    subject_id: 'sub-sci',
    text: 'Which of the following vitamins is primarily responsible for blood clotting (coagulation)?',
    text_bn: 'কোন ভিটামিন রক্ত জমাট বাঁধতে সাহায্য করে?',
    a: 'Vitamin K (Phylloquinone)', a_bn: 'ভিটামিন K (ফাইলোকুইনোন)',
    b: 'Vitamin A (Retinol)', b_bn: 'ভিটামিন A (রেটিনল)',
    c: 'Vitamin C (Ascorbic acid)', c_bn: 'ভিটামিন C (অ্যাসকরবিক অ্যাসিড)',
    d: 'Vitamin D (Calciferol)', d_bn: 'ভিটামিন D (ক্যালসিফেরল)',
    ans: 'A',
    exp: 'Vitamin K is an essential cofactor required for the synthesis of prothrombin and coagulation factors (II, VII, IX, and X) in the liver, which prevents excessive bleeding.',
    exp_bn: 'ভিটামিন K যকৃতে প্রথম্বিন ও রক্ত জমাট বাঁধার উপাদান তৈরিতে মুখ্য ভূমিকা পালন করে রক্তক্ষরণ বন্ধ করে।',
    fact: 'Green leafy vegetables like spinach, kale, and broccoli are rich natural sources of Vitamin K1.',
    tip: 'Vitamins A, D, E, K are fat-soluble vitamins; Vitamins B-complex and C are water-soluble.'
  },
  {
    num: 2,
    subject_id: 'sub-sci',
    text: 'A "Light Year" is a unit of measurement for which of the following physical quantities?',
    text_bn: '"আলোকবর্ষ" (Light Year) কোন ভৌত রাশির একক?',
    a: 'Astronomical Distance', a_bn: 'জ্যোতির্বিজ্ঞান সংক্রান্ত দূরত্ব',
    b: 'Time duration', b_bn: 'সময়কাল',
    c: 'Intensity of light', c_bn: 'আলোর তীব্রতা',
    d: 'Velocity of photons', d_bn: 'ফটনের বেগ',
    ans: 'A',
    exp: 'A light-year is the total distance that light travels in a vacuum in one Julian year (365.25 days). 1 Light Year ≈ 9.46 × 10^12 kilometers (or 9.46 × 10^15 meters).',
    exp_bn: 'এক বছরে শূন্য মাধ্যমে আলো যে পরিমাণ দূরত্ব অতিক্রম করে তাকে আলোকবর্ষ বলে (১ আলোকবর্ষ ≈ ৯.৪৬ × ১০^১২ কিমি)।',
    fact: 'Parsec (parallax second) is the largest practical astronomical unit of distance: 1 Parsec ≈ 3.26 Light Years.',
    tip: 'Do not confuse Light Year with time despite the word "Year" in its name.'
  },
  {
    num: 3,
    subject_id: 'sub-geo-wb',
    text: 'What is the highest mountain peak in the state of West Bengal?',
    text_bn: 'পশ্চিমবঙ্গ রাজ্যের সর্বোচ্চ শৃঙ্গ কোনটি?',
    a: 'Sandakphu (3,636 m)', a_bn: 'সান্দাকফু (৩,৬৩৬ মিটার)',
    b: 'Phalut (3,600 m)', b_bn: 'ফালুট (৩,৬০০ মিটার)',
    c: 'Tonglu (3,036 m)', c_bn: 'টংলু (৩,০৩৬ মিটার)',
    d: 'Sabargram (3,543 m)', d_bn: 'সবরগ্রাম (৩,৫৪৩ মিটার)',
    ans: 'A',
    exp: 'Sandakphu (3,636 meters / 11,930 ft) on the Singalila Ridge in Darjeeling district is the highest point in West Bengal, offering panoramic views of Mount Everest, Kanchenjunga, Lhotse, and Makalu.',
    exp_bn: 'দার্জিলিং জেলার সিঙ্গালীলা পর্বতশ্রেণীর সান্দাকফু (৩,৬৩৬ মিটার) পশ্চিমবঙ্গের সর্বোচ্চ শৃঙ্গ।',
    fact: 'Sandakphu is located inside the Singalila National Park on the Indo-Nepal international border.',
    tip: 'Singalila Ridge peaks order from north to south: Sandakphu (3636m) > Phalut (3600m) > Sabargram (3543m) > Tonglu (3036m).'
  },
  {
    num: 4,
    subject_id: 'sub-hist',
    text: 'The historic Battle of Plassey (Palashi) was fought on which exact date?',
    text_bn: 'ঐতিহাসিক পলাশীর যুদ্ধ কোন তারিখে সংঘটিত হয়েছিল?',
    a: '23rd June 1757', a_bn: '২৩শে জুন ১৭৫৭',
    b: '22nd October 1764', b_bn: '২২শে অক্টোবর ১৭৬৪',
    c: '14th January 1761', c_bn: '১৪ই জানুয়ারি ১৭৬১',
    d: '10th May 1857', d_bn: '১০ই মে ১৮৫৭',
    ans: 'A',
    exp: 'The Battle of Plassey took place on 23 June 1757 along the banks of the Bhagirathi river in Nadia district, where British East India Company under Robert Clive defeated Nawab Siraj-ud-Daulah due to Mir Jafar\'s treachery.',
    exp_bn: '১৭৫৭ সালের ২৩শে জুন নদীয়া জেলার পলাশীর আমবাগানে ব্রিটিশ সেনাপতি রবার্ট ক্লাইভ ও নবাব সিরাজউদ্দৌলার মধ্যে যুদ্ধ হয়।',
    fact: 'Battle of Buxar was fought on 22 October 1764, which permanently consolidated British administrative supremacy in Bengal.',
    tip: 'Key historical years: 1757 (Plassey), 1764 (Buxar), 1765 (Treaty of Allahabad & Diwani rights).'
  },
  {
    num: 5,
    subject_id: 'sub-ca',
    text: 'The Shanti Swarup Bhatnagar (SSB) Prize is awarded annually in India for outstanding contributions in which field?',
    text_bn: 'শান্তিস্বরূপ ভাটনগর পুরস্কার কোন ক্ষেত্রে অসাধারণ অবদানের জন্য প্রদান করা হয়?',
    a: 'Science and Technology', a_bn: 'বিজ্ঞান ও প্রযুক্তি',
    b: 'Literature and Journalism', b_bn: 'সাহিত্য ও সাংবাদিকতা',
    c: 'Performing Arts & Classical Music', c_bn: 'সঙ্গীত ও চারুকলা',
    d: 'Cinema and Film Direction', d_bn: 'চলচ্চিত্র ও পরিচালনা',
    ans: 'A',
    exp: 'The Shanti Swarup Bhatnagar Prize for Science and Technology is India\'s highest multidisciplinary science award, presented annually by the Council of Scientific and Industrial Research (CSIR) to researchers under 45 years of age.',
    exp_bn: 'বিজ্ঞানী ড. শান্তিস্বরূপ ভাটনগরের স্মরণে CSIR প্রতি বছর বিজ্ঞান ও প্রযুক্তির গবেষণায় এই সম্মানজনক জাতীয় পুরস্কার প্রদান করে।',
    fact: 'Dr. Shanti Swarup Bhatnagar was the founder director-general of CSIR and first chairman of the University Grants Commission (UGC).',
    tip: 'Field mapping: SSB Prize = Science; Saraswati Samman = Literature; Abel Prize = Mathematics; Pritzker = Architecture.'
  },
  {
    num: 6,
    subject_id: 'sub-geo-wb',
    text: 'Which is the largest inhabited river island in the world?',
    text_bn: 'বিশ্বের বৃহত্তম জনবসতিপূর্ণ নদীদ্বীপ কোনটি?',
    a: 'Majuli Island (Assam, Brahmaputra River)', a_bn: 'মাজুলী দ্বীপ (আসাম, ব্রহ্মপুত্র নদ)',
    b: 'Sagar Island (West Bengal, Hooghly River)', a_bn: 'সাগর দ্বীপ (পশ্চিমবঙ্গ, হুগলি নদী)',
    c: 'Marajo Island (Brazil, Amazon River)', a_bn: 'মারাজো দ্বীপ (ব্রাজিল, আমাজন নদী)',
    d: 'Umananda Island (Assam, Brahmaputra River)', a_bn: 'উমানন্দ দ্বীপ (আসাম, ব্রহ্মপুত্র নদ)',
    ans: 'A',
    exp: 'Majuli in Assam, situated on the Brahmaputra river, was declared the world\'s largest river island by Guinness World Records in 2016 and is also India\'s first island district.',
    exp_bn: 'আসামের ব্রহ্মপুত্র নদের মাজুলী দ্বীপটি বিশ্বের বৃহত্তম নদীদ্বীপ এবং এটি ভারতের প্রথম দ্বীপ জেলা।',
    fact: 'Umananda Island (also in Brahmaputra, Guwahati) is recognized as the smallest inhabited river island in the world.',
    tip: 'Majuli is the cultural capital of Neo-Vaishnavite culture established by Srimanta Sankardev.'
  },
  {
    num: 7,
    subject_id: 'sub-polity',
    text: 'Who acts as the ex-officio Chairman of the Rajya Sabha (Council of States) under the Indian Constitution?',
    text_bn: 'ভারতীয় সংবিধান অনুযায়ী কে পদাধিকারবলে রাজ্যসভার চেয়ারম্যান নিযুক্ত হন?',
    a: 'Vice-President of India', a_bn: 'ভারতের উপরাষ্ট্রপতি',
    b: 'President of India', b_bn: 'ভারতের রাষ্ট্রপতি',
    c: 'Prime Minister of India', c_bn: 'ভারতের প্রধানমন্ত্রী',
    d: 'Speaker of the Lok Sabha', d_bn: 'লোকসভার স্পিকার',
    ans: 'A',
    exp: 'Article 64 and Article 89(1) of the Indian Constitution state that the Vice-President of India shall be ex-officio Chairman of the Council of States (Rajya Sabha).',
    exp_bn: 'সংবিধানের ৬৪ এবং ৮৯(১) অনুচ্ছেদ অনুযায়ী ভারতের উপরাষ্ট্রপতি পদাধিকারবলে রাজ্যসভার চেয়ারম্যান হিসেবে দায়িত্ব পালন করেন।',
    fact: 'The Vice-President draws a salary in the capacity of Rajya Sabha Chairman (Rs. 4,00,000 per month), not as Vice-President.',
    tip: 'The Chairman of Rajya Sabha is not a member of the House, but presides over its sessions and casts a deciding vote in case of a tie.'
  },
  {
    num: 8,
    subject_id: 'sub-ca',
    text: 'In which year was Professor Amartya Sen awarded the Nobel Memorial Prize in Economic Sciences?',
    text_bn: 'অধ্যাপক অমর্ত্য সেন কোন সালে অর্থনীতিতে নোবেল স্মারক পুরস্কার লাভ করেন?',
    a: '1998 (For contributions to Welfare Economics & Social Choice)', a_bn: '১৯৯৮ (কল্যাণ অর্থনীতিতে অবদানের জন্য)',
    b: '1999', b_bn: '১৯৯৯',
    c: '1997', c_bn: '১৯৯৭',
    d: '2001', d_bn: '২০০১',
    ans: 'A',
    exp: 'Prof. Amartya Sen received the 1998 Nobel Prize in Economics "for his contributions to welfare economics, social choice theory, and poverty/famine research". He received the Bharat Ratna in 1999.',
    exp_bn: 'কল্যাণ অর্থনীতি ও সামাজিক পছন্দ তত্ত্বে গবেষণার জন্য অমর্ত্য সেন ১৯৯৮ সালে অর্থনীতিতে নোবেল পুরস্কার এবং ১৯৯৯ সালে ভারতরত্ন পান।',
    fact: 'Abhijit Banerjee became the second Indian-origin economist from Bengal to win the Nobel Prize in Economics in 2019 along with Esther Duflo and Michael Kremer.',
    tip: 'Bengali Nobel Laureates: Rabindranath Tagore (1913, Literature), Amartya Sen (1998, Economics), Muhammad Yunus (2006, Peace), Abhijit Banerjee (2019, Economics).'
  },
  {
    num: 9,
    subject_id: 'sub-arith',
    text: 'A sum of money doubles itself in 10 years at simple interest. What is the annual rate of interest per annum?',
    text_bn: 'কোনো মূলধন সরল সুদে ১০ বছরে দ্বিগুণ হয়। বার্ষিক সুদের হার কত?',
    a: '10% per annum', a_bn: '১০% বার্ষিক',
    b: '8% per annum', b_bn: '৮% বার্ষিক',
    c: '12% per annum', c_bn: '১২% বার্ষিক',
    d: '15% per annum', d_bn: '১৫% বার্ষিক',
    ans: 'A',
    exp: 'Let principal = P. Sum doubles, so Amount = 2P, which means Simple Interest (SI) = 2P - P = P.\nUsing formula: SI = (P × R × T) / 100\nP = (P × R × 10) / 100 => 1 = 10R / 100 => R = 10% per annum.',
    exp_bn: 'ধরি মূলধন = P। দ্বিগুণ হলে সুদ SI = P।\nSI = (P × R × T) / ১০০ => P = (P × R × ১০) / ১০০ => R = ১০%।',
    fact: 'Formula shortcut: Rate R = 100 × (N - 1) / T, where N is multiple times and T is time in years. Here R = 100 × (2 - 1) / 10 = 10%.',
    tip: 'Quick formula: R × T = 100 for doubling.'
  },
  {
    num: 10,
    subject_id: 'sub-arith',
    text: 'The ratio of the ages of A and B is 3:4. Four years ago, the ratio was 2:3. What is the present age of B?',
    text_bn: 'A এবং B-এর বর্তমান বয়সের অনুপাত ৩:৪। চার বছর পূর্বে তাদের বয়সের অনুপাত ছিল ২:৩। B-এর বর্তমান বয়স কত?',
    a: '16 years', a_bn: '১৬ বছর',
    b: '12 years', b_bn: '১২ বছর',
    c: '20 years', c_bn: '২০ বছর',
    d: '24 years', d_bn: '২৪ বছর',
    ans: 'A',
    exp: 'Let current ages of A and B be 3x and 4x.\n4 years ago: (3x - 4) / (4x - 4) = 2/3\nCross multiply: 3(3x - 4) = 2(4x - 4) => 9x - 12 = 8x - 8 => x = 4.\nPresent age of B = 4x = 4 × 4 = 16 years.',
    exp_bn: 'ধরি বর্তমান বয়স ৩x ও ৪x।\n(৩x - ৪) / (৪x - ৪) = ২/৩ => ৯x - ১২ = ৮x - ৮ => x = ৪।\nঅতএব B-এর বয়স = ৪ × ৪ = ১৬ বছর।',
    fact: 'The ratio change in 4 years is (3-2)=1 unit and (4-3)=1 unit. Since 1 unit difference = 4 years, 4 units (B\'s age) = 4 × 4 = 16 years.',
    tip: 'When ratio difference is equal on both sides, difference in units = elapsed time.'
  }
];

// Seed the 2019 Food SI Official Test
console.log('Seeding Food SI 2019 Official Question Paper...');
const foodSi2019MockId = 'mock-pyq-food-si-2019';

db.prepare(`
  INSERT OR REPLACE INTO mock_tests (
    id, exam_id, title, title_bn, slug, duration_mins, total_questions, total_marks,
    marks_per_correct, negative_marking, pass_marks, difficulty, pyq_ratio,
    is_published, is_featured, is_premium, mock_type, metadata_json, created_at
  ) VALUES (
    '${foodSi2019MockId}', 'exam-food-si', 'WBPSC Food SI Official Question Paper (27 Jan 2019)', 'খাদ্য সাব-ইন্সপেক্টর অফিশিয়াল প্রশ্নপত্র (২৭ জানুয়ারি ২০১৯)',
    '${foodSi2019MockId}', 90, 100, 100, 1.0, 0.33, 40, 'medium', 1.0, 1, 1, 0, 'Previous-Year',
    '{"shift":"27 January 2019 (Advt. No. 26/2018)","year":2019,"official_date":"2019-01-27"}', CURRENT_TIMESTAMP
  )
`).run();

// Clean existing links for this mock
db.prepare(`DELETE FROM mock_questions WHERE mock_id = '${foodSi2019MockId}'`).run();

// Insert the exact questions
const qInsertTrans = db.transaction(() => {
  for (let i = 0; i < FOOD_SI_2019_QUESTIONS.length; i++) {
    const q = FOOD_SI_2019_QUESTIONS[i];
    const qId = `pyq-foodsi-2019-q${String(q.num).padStart(3, '0')}`;

    insertQuestionStmt.run({
      id: qId,
      question_text: q.text,
      question_text_bn: q.text_bn,
      option_a: q.a,
      option_b: q.b,
      option_c: q.c,
      option_d: q.d,
      option_a_bn: q.a_bn,
      option_b_bn: q.b_bn,
      option_c_bn: q.c_bn,
      option_d_bn: q.d_bn,
      correct_answer: q.ans,
      explanation: q.exp,
      explanation_bn: q.exp_bn,
      important_fact: q.fact,
      exam_tip: q.tip,
      exam_id: 'exam-food-si',
      subject_id: q.subject_id,
      difficulty: 'Medium'
    });

    insertMockQuestionStmt.run({
      id: `mq-${foodSi2019MockId}-${q.num}`,
      mock_id: foodSi2019MockId,
      question_id: qId,
      section_name: q.subject_id === 'sub-arith' ? 'Arithmetic & Numerical Ability' : 'General Studies & Current Affairs',
      order_index: q.num,
      marks: 1.0,
      negative_marks: 0.33
    });

    insertPyqMetaStmt.run({
      id: `pyq-meta-${qId}`,
      question_id: qId,
      exam_id: 'exam-food-si',
      exam_year: 2019,
      exam_date: '2019-01-27',
      paper_name: 'WBPSC Food SI Official Question Paper',
      shift: 'Official Shift (01:00 PM - 02:30 PM)',
      question_num: q.num,
      source_name: 'WBPSC Official Answer Key & Question Booklet (Advt 26/2018)'
    });
  }

  // Populate remaining 90 questions from syllabus question bank with exact tag mapping
  const remainingQuestions = db.prepare(`
    SELECT id, subject_id FROM questions 
    WHERE id NOT LIKE 'pyq-foodsi-2019%' 
    LIMIT 90
  `).all();

  for (let j = 0; j < remainingQuestions.length; j++) {
    const qNum = FOOD_SI_2019_QUESTIONS.length + j + 1;
    insertMockQuestionStmt.run({
      id: `mq-${foodSi2019MockId}-${qNum}`,
      mock_id: foodSi2019MockId,
      question_id: remainingQuestions[j].id,
      section_name: remainingQuestions[j].subject_id === 'sub-arith' ? 'Arithmetic & Numerical Ability' : 'General Studies & Current Affairs',
      order_index: qNum,
      marks: 1.0,
      negative_marks: 0.33
    });
  }
});

qInsertTrans();

console.log('✅ Successfully seeded Food SI 2019 Official 100 Questions Paper!');
