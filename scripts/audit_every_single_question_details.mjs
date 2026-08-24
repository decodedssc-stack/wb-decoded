import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 EXAMINING ALL 1,267 QUESTIONS FOR FACTUAL, STRUCTURAL & ANSWER-KEY CONFLICTS...');

const allQuestions = db.prepare('SELECT * FROM questions').all();

const mismatchedQuestions = [];

allQuestions.forEach(q => {
  const ansKey = q.correct_answer; // 'A', 'B', 'C', 'D'
  const ansText = (q[`option_${ansKey.toLowerCase()}`] || '').toLowerCase().trim();
  const exp = (q.explanation || '').toLowerCase();
  const expBn = (q.explanation_bn || '').toLowerCase();

  // 1. Check if explanation explicitly names a different option letter (e.g., "option d is correct" when ansKey is 'A')
  const optionMatches = exp.match(/option\s+([a-d])\b/gi) || [];
  for (const m of optionMatches) {
    const letter = m.split(/\s+/)[1].toUpperCase();
    if (letter !== ansKey) {
      mismatchedQuestions.push({
        id: q.id,
        issue: `Explanation refers to Option ${letter}, but correct_answer is set to [${ansKey}] ("${ansText}")`,
        q,
        exp: q.explanation
      });
      break;
    }
  }

  // 2. Check if explanation mentions "correct answer is (A)" or similar
  const correctIsMatches = exp.match(/correct\s+(?:answer|option)\s+(?:is|:)\s*\(?([a-d])\)?/gi) || [];
  for (const m of correctIsMatches) {
    const letterMatch = m.match(/[a-d]/i);
    if (letterMatch) {
      const letter = letterMatch[0].toUpperCase();
      if (letter !== ansKey) {
        mismatchedQuestions.push({
          id: q.id,
          issue: `Explanation says correct is (${letter}), but correct_answer is [${ansKey}]`,
          q,
          exp: q.explanation
        });
        break;
      }
    }
  }
});

console.log(`\nFound ${mismatchedQuestions.length} explicit explanation/key conflicts!`);
mismatchedQuestions.slice(0, 30).forEach((m, i) => {
  console.log(`\n${i + 1}. [${m.id}] (${m.q.subject_id}) - ${m.issue}`);
  console.log(`   Q: ${m.q.question_text}`);
  console.log(`   A: ${m.q.option_a}`);
  console.log(`   B: ${m.q.option_b}`);
  console.log(`   C: ${m.q.option_c}`);
  console.log(`   D: ${m.q.option_d}`);
  console.log(`   Correct: [${m.q.correct_answer}] -> "${m.q['option_' + m.q.correct_answer.toLowerCase()]}"`);
  console.log(`   Exp: ${m.exp}`);
});
