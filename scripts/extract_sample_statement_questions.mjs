import Database from 'better-sqlite3';

const db = new Database('data/wb_decoded.sqlite');

const subjects = [
  { id: 'sub-polity', name: 'Indian Polity & Constitution' },
  { id: 'sub-hist', name: 'Indian History & National Movement' },
  { id: 'sub-geo-wb', name: 'Geography of India & West Bengal' },
  { id: 'sub-econ', name: 'Indian Economy & WB Schemes' },
  { id: 'sub-sci', name: 'General Science & Environment' },
  { id: 'sub-gma', name: 'Analytical Reasoning & Logic' }
];

const results = {};

for (const sub of subjects) {
  const rows = db.prepare(`
    SELECT id, question_text, question_text_bn,
           option_a, option_b, option_c, option_d,
           option_a_bn, option_b_bn, option_c_bn, option_d_bn,
           correct_answer, explanation, explanation_bn,
           difficulty
    FROM questions 
    WHERE subject_id = ? AND question_type = 'Statement-Based'
    LIMIT 5
  `).all(sub.id);
  results[sub.name] = rows;
}

console.log(JSON.stringify(results, null, 2));
