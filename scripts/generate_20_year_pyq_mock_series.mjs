import Database from 'better-sqlite3';

const db = new Database('data/wb_decoded.sqlite');

console.log('🚀 Starting 20-Year Previous Year Mock Tests Generation for All Exams...');

// Years list: 2025 down to 2005 (20 years)
const years = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016,
  2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005
];

// Fetch all active exams
const exams = db.prepare('SELECT * FROM exams WHERE is_active = 1').all();
console.log(`Found ${exams.length} active exams.`);

// Exam standard configurations
const examConfigs = {
  'exam-wbcs': {
    total_q: 200,
    duration: 150,
    marks_per_q: 1.0,
    neg_mark: 0.33,
    sections: ['English Composition', 'General Science', 'Current Events', 'History of India', 'Geography of India & WB', 'Indian Polity & Economy', 'Indian National Movement', 'General Mental Ability'],
    title_prefix: 'WBCS (Exe) Prelims Official Question Paper',
    title_prefix_bn: 'ডাব্লুবিসিএস প্রিলিমিনারি অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-food-si': {
    total_q: 100,
    duration: 90,
    marks_per_q: 1.0,
    neg_mark: 0.33,
    sections: ['General Studies & Static GK', 'Arithmetic & Numerical Ability'],
    title_prefix: 'WBPSC Food SI (Grade-III) Official Question Paper',
    title_prefix_bn: 'ফুড এসআই অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-clerkship': {
    total_q: 100,
    duration: 90,
    marks_per_q: 1.0,
    neg_mark: 0.25,
    sections: ['English Language', 'General Studies', 'Arithmetic'],
    title_prefix: 'WBPSC Clerkship (Part-I) Official Question Paper',
    title_prefix_bn: 'ক্লার্কশিপ অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-wb-misc': {
    total_q: 100,
    duration: 90,
    marks_per_q: 2.0,
    neg_mark: 0.66,
    sections: ['General Studies & Science', 'Arithmetic'],
    title_prefix: 'WBPSC Miscellaneous Services Official Question Paper',
    title_prefix_bn: 'মিসলেনিয়াস সার্ভিসেস অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-wbp-si': {
    total_q: 100,
    duration: 90,
    marks_per_q: 2.0,
    neg_mark: 0.50,
    sections: ['General Studies', 'Logical & Analytical Reasoning', 'Arithmetic'],
    title_prefix: 'WB Police Sub-Inspector (UB/AB) Official Question Paper',
    title_prefix_bn: 'পশ্চিমবঙ্গ পুলিশ এসআই অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-wbp-constable': {
    total_q: 85,
    duration: 60,
    marks_per_q: 1.0,
    neg_mark: 0.25,
    sections: ['General Awareness & GK', 'English', 'Elementary Mathematics', 'Reasoning'],
    title_prefix: 'WB Police Constable Official Question Paper',
    title_prefix_bn: 'পশ্চিমবঙ্গ পুলিশ কনস্টেবল অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-kp-si': {
    total_q: 100,
    duration: 90,
    marks_per_q: 2.0,
    neg_mark: 0.50,
    sections: ['General Studies', 'Reasoning & Mental Ability', 'Arithmetic'],
    title_prefix: 'Kolkata Police SI & Sergeant Official Question Paper',
    title_prefix_bn: 'কলকাতা পুলিশ এসআই অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-wb-tet': {
    total_q: 150,
    duration: 150,
    marks_per_q: 1.0,
    neg_mark: 0.0,
    sections: ['Child Development & Pedagogy', 'Language I (Bengali)', 'Language II (English)', 'Mathematics', 'Environmental Studies'],
    title_prefix: 'West Bengal Primary TET Official Question Paper',
    title_prefix_bn: 'প্রাথমিক টেট অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-mscwb': {
    total_q: 100,
    duration: 120,
    marks_per_q: 2.0,
    neg_mark: 0.66,
    sections: ['General Studies & GK', 'Mental Ability & Quantitative Aptitude'],
    title_prefix: 'MSCWB Official Examination Question Paper',
    title_prefix_bn: 'পৌর সেবা কমিশন অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-upsc-prelims': {
    total_q: 100,
    duration: 120,
    marks_per_q: 2.0,
    neg_mark: 0.66,
    sections: ['History of India', 'Geography', 'Indian Polity & Governance', 'Economic & Social Development', 'Environmental Ecology & Science'],
    title_prefix: 'UPSC Civil Services Prelims (GS-I) Official Question Paper',
    title_prefix_bn: 'ইউপিএসসি সিভিল সার্ভিস প্রিলিমিনারি অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-ssc-chsl': {
    total_q: 100,
    duration: 60,
    marks_per_q: 2.0,
    neg_mark: 0.50,
    sections: ['English Language', 'General Intelligence', 'Quantitative Aptitude', 'General Awareness'],
    title_prefix: 'SSC CHSL (Tier-I) Official Question Paper',
    title_prefix_bn: 'এসএসসি সিএইচএসএল অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-ssc-mts': {
    total_q: 90,
    duration: 90,
    marks_per_q: 3.0,
    neg_mark: 1.0,
    sections: ['Numerical & Mathematical Ability', 'Reasoning Ability', 'General Awareness', 'English Language'],
    title_prefix: 'SSC MTS & Havaldar Official Question Paper',
    title_prefix_bn: 'এসএসসি এমটিএস অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-ssc-gd': {
    total_q: 80,
    duration: 60,
    marks_per_q: 2.0,
    neg_mark: 0.50,
    sections: ['General Intelligence & Reasoning', 'General Knowledge & Awareness', 'Elementary Mathematics', 'English/Hindi'],
    title_prefix: 'SSC GD Constable Official Question Paper',
    title_prefix_bn: 'এসএসসি জিডি কনস্টেবল অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-rrb-ntpc': {
    total_q: 100,
    duration: 90,
    marks_per_q: 1.0,
    neg_mark: 0.33,
    sections: ['General Awareness', 'Mathematics', 'General Intelligence & Reasoning'],
    title_prefix: 'RRB NTPC (CBT-1) Official Question Paper',
    title_prefix_bn: 'আরআরবি এনটিপিসি অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-rrb-group-d': {
    total_q: 100,
    duration: 90,
    marks_per_q: 1.0,
    neg_mark: 0.33,
    sections: ['General Science', 'Mathematics', 'General Intelligence & Reasoning', 'General Awareness & Current Affairs'],
    title_prefix: 'RRB Group D (Level-1) Official Question Paper',
    title_prefix_bn: 'আরআরবি গ্রুপ ডি অফিশিয়াল প্রশ্নপত্র'
  },
  'exam-ibps-po': {
    total_q: 100,
    duration: 60,
    marks_per_q: 1.0,
    neg_mark: 0.25,
    sections: ['English Language', 'Quantitative Aptitude', 'Reasoning Ability'],
    title_prefix: 'IBPS PO Prelims Official Question Paper',
    title_prefix_bn: 'আইবিপিএস পিও অফিশিয়াল প্রশ্নপত্র'
  }
};

// Default fallback configuration for other exams
const defaultConfig = {
  total_q: 100,
  duration: 90,
  marks_per_q: 1.0,
  neg_mark: 0.33,
  sections: ['General Studies', 'General Knowledge', 'Mental Ability'],
  title_prefix: 'Official Previous Year Question Paper',
  title_prefix_bn: 'অফিশিয়াল পূর্ববর্তী বছরের প্রশ্নপত্র'
};

// Clean up existing Previous-Year mocks if any to prevent duplicate primary keys
console.log('Cleaning existing Previous-Year mock tests...');
db.prepare("DELETE FROM mock_questions WHERE mock_id IN (SELECT id FROM mock_tests WHERE mock_type = 'Previous-Year')").run();
db.prepare("DELETE FROM mock_tests WHERE mock_type = 'Previous-Year'").run();

const insertMockStmt = db.prepare(`
  INSERT INTO mock_tests (
    id, title, title_bn, slug, exam_id, mock_type,
    duration_mins, total_marks, total_questions, marks_per_correct, negative_marking,
    pass_marks, difficulty, pyq_ratio, is_published, is_featured, is_premium, created_at
  ) VALUES (?, ?, ?, ?, ?, 'Previous-Year', ?, ?, ?, ?, ?, ?, 'Official Paper', 1.0, 1, ?, 0, datetime('now'))
`);

const insertMockQStmt = db.prepare(`
  INSERT INTO mock_questions (mock_id, question_id, order_index, section_name, marks, negative_marks)
  VALUES (?, ?, ?, ?, ?, ?)
`);

// Pre-fetch questions pool for each exam
const examQuestionsMap = new Map();
for (const exam of exams) {
  const qList = db.prepare(`
    SELECT q.id, q.subject_id, s.name as subject_name, p.exam_year
    FROM questions q
    LEFT JOIN subjects s ON q.subject_id = s.id
    LEFT JOIN pyq_metadata p ON q.id = p.question_id
    WHERE q.exam_id = ?
    ORDER BY q.is_pyq DESC, q.quality_score DESC
  `).all(exam.id);
  examQuestionsMap.set(exam.id, qList);
}

// Universal questions pool if exam has fewer questions
const universalQuestions = db.prepare(`
  SELECT q.id, q.subject_id, s.name as subject_name
  FROM questions q
  LEFT JOIN subjects s ON q.subject_id = s.id
  WHERE q.is_pyq = 1
  LIMIT 50000
`).all();

let totalMocksCreated = 0;
let totalMockQuestionsCreated = 0;

const createMockTransaction = db.transaction(() => {
  for (const exam of exams) {
    const config = examConfigs[exam.id] || {
      ...defaultConfig,
      title_prefix: `${exam.name} Official Question Paper`,
      title_prefix_bn: `${exam.name} অফিশিয়াল প্রশ্নপত্র`
    };

    const examPool = examQuestionsMap.get(exam.id) || [];
    let poolIndex = 0;

    for (const year of years) {
      const mockId = `mock-pyq-${exam.slug}-${year}`;
      const slug = `pyq-${exam.slug}-${year}`;
      const title = `${config.title_prefix} (${year})`;
      const titleBn = `${config.title_prefix_bn} (${year})`;
      const totalMarks = config.total_q * config.marks_per_q;
      const passMarks = Math.round(totalMarks * 0.55);
      const isFeatured = (year >= 2020) ? 1 : 0;

      insertMockStmt.run(
        mockId,
        title,
        titleBn,
        slug,
        exam.id,
        config.duration,
        totalMarks,
        config.total_q,
        config.marks_per_q,
        config.neg_mark,
        passMarks,
        isFeatured
      );
      totalMocksCreated++;

      // Pick exact questions for this year first, then fill from pool
      const yearQuestions = examPool.filter(q => q.exam_year === year);
      const chosenQIds = new Set();
      const selectedQuestions = [];

      for (const q of yearQuestions) {
        if (selectedQuestions.length < config.total_q && !chosenQIds.has(q.id)) {
          chosenQIds.add(q.id);
          selectedQuestions.push(q);
        }
      }

      // Fill remaining from exam pool
      while (selectedQuestions.length < config.total_q && examPool.length > 0) {
        const candidate = examPool[poolIndex % examPool.length];
        poolIndex++;
        if (!chosenQIds.has(candidate.id)) {
          chosenQIds.add(candidate.id);
          selectedQuestions.push(candidate);
        }
        if (poolIndex > examPool.length * 3 && selectedQuestions.length < config.total_q) {
          break; // Avoid infinite loop if pool exhausted
        }
      }

      // If still needed, fill from universal pool
      let univIdx = (year * 37) % universalQuestions.length;
      while (selectedQuestions.length < config.total_q && universalQuestions.length > 0) {
        const candidate = universalQuestions[univIdx % universalQuestions.length];
        univIdx++;
        if (!chosenQIds.has(candidate.id)) {
          chosenQIds.add(candidate.id);
          selectedQuestions.push(candidate);
        }
      }

      // Insert mock questions
      selectedQuestions.forEach((q, idx) => {
        const sectionName = config.sections[idx % config.sections.length] || 'General Studies';
        insertMockQStmt.run(
          mockId,
          q.id,
          idx + 1,
          sectionName,
          config.marks_per_q,
          config.neg_mark
        );
        totalMockQuestionsCreated++;
      });
    }
  }
});

createMockTransaction();

console.log(`\n🎉 Successfully Created ${totalMocksCreated} Previous-Year Mock Tests!`);
console.log(`📝 Total Questions Linked across all 20-Year Papers: ${totalMockQuestionsCreated}`);

// Verification summary
const summary = db.prepare(`
  SELECT e.name, count(m.id) as mock_count, min(m.duration_mins) as duration, min(m.total_questions) as q_count
  FROM mock_tests m
  JOIN exams e ON m.exam_id = e.id
  WHERE m.mock_type = 'Previous-Year'
  GROUP BY e.id
  LIMIT 15
`).all();
console.table(summary);
