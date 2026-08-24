const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../data/wb_decoded.sqlite'));

console.log('=== 1. ALL MOCK TESTS ===');
const mocks = db.prepare('SELECT id, exam_id, title, total_questions FROM mock_tests').all();
console.log(`Total Mocks: ${mocks.length}`);
mocks.forEach(m => {
  const actualCount = db.prepare('SELECT COUNT(*) as count FROM mock_questions WHERE mock_id = ?').get(m.id).count;
  console.log(`- [${m.id}] (${m.exam_id}) ${m.title} -> target: ${m.total_questions}, actual in mock_questions: ${actualCount}`);
});

console.log('\n=== 2. CHECKING QUESTIONS FOR COMMON DATA CORRUPTIONS ===');
const corrupted1 = db.prepare(`
  SELECT id, question_text, option_a, option_b, option_c, option_d, correct_answer 
  FROM questions 
  WHERE question_text LIKE '%(a)%' OR question_text LIKE '%(b)%' OR question_text LIKE '%(c)%' OR question_text LIKE '%(d)%'
     OR question_text LIKE '%Ans%' OR question_text LIKE '%Answer%'
`).all();
console.log(`Questions with answer leaks or brackets: ${corrupted1.length}`);
if (corrupted1.length > 0) {
  console.log('Sample corrupted:', corrupted1.slice(0, 3));
}

console.log('\n=== 3. CHECKING MOCK SECTIONS / SUBJECT DISTRIBUTION PER MOCK ===');
for (const m of mocks) {
  const dist = db.prepare(`
    SELECT s.name as subject_name, COUNT(*) as cnt
    FROM mock_questions mq
    JOIN questions q ON mq.question_id = q.id
    LEFT JOIN subjects s ON q.subject_id = s.id
    WHERE mq.mock_id = ?
    GROUP BY s.name
    ORDER BY cnt DESC
  `).all(m.id);

  console.log(`\nMock: ${m.title} (${m.id})`);
  dist.forEach(d => console.log(`   * ${d.subject_name || 'NO SUBJECT'}: ${d.cnt} questions`));
}

console.log('\n=== 4. CHECKING EXAM BLUEPRINTS & PATTERNS IN DB ===');
const patterns = db.prepare('SELECT * FROM exam_patterns').all();
console.log('Exam patterns:', patterns.map(p => ({ exam_id: p.exam_id, pattern_name: p.pattern_name, total_marks: p.total_marks })));

const sections = db.prepare('SELECT * FROM pattern_sections').all();
console.log('Pattern sections count:', sections.length);
sections.forEach(s => console.log(`   - Pattern [${s.pattern_id}] Section: ${s.section_name} -> ${s.question_count} Qs`));
