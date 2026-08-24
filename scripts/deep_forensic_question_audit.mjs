import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 FORENSIC AUDIT OF ALL 1,267 QUESTIONS IN DATABASE...');

const allQuestions = db.prepare(`
  SELECT q.*, s.name as subject_name 
  FROM questions q
  LEFT JOIN subjects s ON q.subject_id = s.id
`).all();

console.log(`Total questions analyzed: ${allQuestions.length}`);

// 1. Answer distribution check
const ansCounts = { A: 0, B: 0, C: 0, D: 0, other: 0 };
allQuestions.forEach(q => {
  if (ansCounts[q.correct_answer] !== undefined) {
    ansCounts[q.correct_answer]++;
  } else {
    ansCounts.other++;
  }
});
console.log('\n📊 Answer Key Distribution:', ansCounts);

// 2. Questions where explanation explicitly names an option or entity that differs from correct_answer
const keyMismatches = [];
const weirdQuestions = [];

allQuestions.forEach(q => {
  const correctOptText = q[`option_${q.correct_answer?.toLowerCase()}`] || '';
  const exp = (q.explanation || '').toLowerCase();
  const qText = (q.question_text || '').toLowerCase();

  // Check if correct option is empty
  if (!correctOptText || correctOptText.trim() === '') {
    weirdQuestions.push({ id: q.id, issue: 'Empty correct option text', q });
  }

  // Check for placeholder artifacts
  if (correctOptText.includes('Alternative') || qText.includes('Alternative')) {
    weirdQuestions.push({ id: q.id, issue: 'Contains placeholder "Alternative"', q });
  }

  // Check for repeated words or broken syntax
  if (q.option_a === q.option_b || q.option_a === q.option_c || q.option_a === q.option_d || q.option_b === q.option_c || q.option_b === q.option_d || q.option_c === q.option_d) {
    weirdQuestions.push({ id: q.id, issue: 'Duplicate options in question', q });
  }

  // Check if question text is too short or broken
  if ((q.question_text || '').length < 20) {
    weirdQuestions.push({ id: q.id, issue: 'Question text too short / truncated', q });
  }
});

console.log(`\nFound ${weirdQuestions.length} structurally flawed questions.`);
weirdQuestions.forEach((w, i) => {
  console.log(`${i + 1}. [${w.id}] - ${w.issue}`);
  console.log(`   Q: ${w.q.question_text}`);
  console.log(`   A: ${w.q.option_a} | B: ${w.q.option_b} | C: ${w.q.option_c} | D: ${w.q.option_d}`);
  console.log(`   Ans: ${w.q.correct_answer}`);
});
