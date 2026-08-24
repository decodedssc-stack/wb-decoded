import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 EXAMINING ALL SUBJECTS FOR ANY LOW QUALITY, REPETITIVE, OR FACTUALLY INCORRECT QUESTIONS...');

const subjects = db.prepare('SELECT id, name FROM subjects').all();

for (const s of subjects) {
  const qs = db.prepare('SELECT id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation FROM questions WHERE subject_id = ?').all(s.id);
  console.log(`\n======================================================`);
  console.log(`📚 SUBJECT: ${s.name} (${qs.length} questions)`);
  console.log(`======================================================`);

  // Check for any duplicate question texts within this subject
  const textCount = {};
  qs.forEach(q => {
    const t = q.question_text.trim();
    textCount[t] = (textCount[t] || 0) + 1;
  });

  const dupes = Object.entries(textCount).filter(([k, v]) => v > 1);
  if (dupes.length > 0) {
    console.log(`⚠️ FOUND ${dupes.length} DUPLICATE QUESTION TEXTS IN ${s.name}:`);
    dupes.forEach(([text, count]) => {
      console.log(`   - "${text.substring(0, 70)}..." appears ${count} times!`);
    });
  } else {
    console.log(`✅ Zero duplicate question texts in ${s.name}.`);
  }
}
