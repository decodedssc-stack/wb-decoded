import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔄 Shuffling Options & Distributing Official Answer Keys Evenly (25% A, 25% B, 25% C, 25% D)...');

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('temp_store = MEMORY');

const rows = db.prepare(`
  SELECT id, option_a, option_b, option_c, option_d,
         option_a_bn, option_b_bn, option_c_bn, option_d_bn,
         correct_answer
  FROM questions
`).all();

console.log(`Fetched ${rows.length.toLocaleString()} questions to shuffle and balance keys...`);

const updateStmt = db.prepare(`
  UPDATE questions 
  SET option_a = ?, option_b = ?, option_c = ?, option_d = ?,
      option_a_bn = ?, option_b_bn = ?, option_c_bn = ?, option_d_bn = ?,
      correct_answer = ?
  WHERE id = ?
`);

// Simple deterministic hash for consistent distribution
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

let updated = 0;
const startTime = Date.now();

db.transaction(() => {
  for (const r of rows) {
    // 1. Identify current correct text
    let correctTextEn = r.option_a;
    let correctTextBn = r.option_a_bn || r.option_a;

    if (r.correct_answer === 'B') {
      correctTextEn = r.option_b;
      correctTextBn = r.option_b_bn || r.option_b;
    } else if (r.correct_answer === 'C') {
      correctTextEn = r.option_c;
      correctTextBn = r.option_c_bn || r.option_c;
    } else if (r.correct_answer === 'D') {
      correctTextEn = r.option_d;
      correctTextBn = r.option_d_bn || r.option_d;
    }

    // Pack all options as pairs
    const pairs = [
      { en: r.option_a, bn: r.option_a_bn || r.option_a, isCorrect: r.correct_answer === 'A' },
      { en: r.option_b, bn: r.option_b_bn || r.option_b, isCorrect: r.correct_answer === 'B' },
      { en: r.option_c, bn: r.option_c_bn || r.option_c, isCorrect: r.correct_answer === 'C' },
      { en: r.option_d, bn: r.option_d_bn || r.option_d, isCorrect: r.correct_answer === 'D' }
    ];

    // Deterministic shuffle using question ID
    const seed = hashString(r.id);
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = (seed + i * 17) % (i + 1);
      const temp = pairs[i];
      pairs[i] = pairs[j];
      pairs[j] = temp;
    }

    // Find new position of correct option
    const newCorrectIdx = pairs.findIndex(p => p.en === correctTextEn);
    const newKey = ['A', 'B', 'C', 'D'][newCorrectIdx >= 0 ? newCorrectIdx : 0];

    updateStmt.run(
      pairs[0].en,
      pairs[1].en,
      pairs[2].en,
      pairs[3].en,
      pairs[0].bn,
      pairs[1].bn,
      pairs[2].bn,
      pairs[3].bn,
      newKey,
      r.id
    );

    updated++;
  }
})();

const elapsedSecs = ((Date.now() - startTime) / 1000).toFixed(2);
console.log(`\n🎉 Successfully Shuffled and Re-indexed ${updated.toLocaleString()} Questions in ${elapsedSecs}s!`);

// Verify final distribution across A, B, C, D
const finalDist = db.prepare(`
  SELECT correct_answer, count(*) as count,
         ROUND(count(*) * 100.0 / (SELECT count(*) FROM questions), 2) as percentage
  FROM questions
  GROUP BY correct_answer
  ORDER BY correct_answer ASC
`).all();

console.log('\n📊 Balanced Official Answer Key Distribution across entire Master Bank:');
console.table(finalDist);
