import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔧 FIXING DUPLICATE OPTIONS ACROSS ALL QUESTIONS...');

const allQuestions = db.prepare('SELECT id, option_a, option_b, option_c, option_d, correct_answer FROM questions').all();
const updateOpts = db.prepare(`
  UPDATE questions 
  SET option_a = ?, option_b = ?, option_c = ?, option_d = ?,
      option_a_bn = ?, option_b_bn = ?, option_c_bn = ?, option_d_bn = ?
  WHERE id = ?
`);

let fixedCount = 0;

for (const q of allQuestions) {
  let [a, b, c, d] = [q.option_a, q.option_b, q.option_c, q.option_d];
  const set = new Set([a, b, c, d]);

  if (set.size < 4) {
    console.log(`Fixing question [${q.id}]:`, { a, b, c, d, ans: q.correct_answer });

    // Ensure D is distinct if it matches A
    if (d === a) {
      if (d.startsWith('₹')) {
        const num = parseInt(d.replace(/[^0-9]/g, ''), 10) || 100;
        d = `₹${num + 45}`;
      } else {
        d = `${d} (Alt)`;
      }
    }
    // Ensure B is distinct
    if (b === a || b === c || b === d) {
      if (b.startsWith('₹')) {
        const num = parseInt(b.replace(/[^0-9]/g, ''), 10) || 50;
        b = `₹${num + 15}`;
      }
    }

    updateOpts.run(a, b, c, d, a, b, c, d, q.id);
    fixedCount++;
  }
}

console.log(`✅ Fixed ${fixedCount} questions with duplicate options!`);
