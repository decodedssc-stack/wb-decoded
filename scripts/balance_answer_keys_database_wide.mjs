import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('⚖️ BALANCING ANSWER KEY DISTRIBUTION ACROSS ALL 1,267 QUESTIONS...');

const allQuestions = db.prepare('SELECT * FROM questions').all();
console.log(`Total questions: ${allQuestions.length}`);

const updateQ = db.prepare(`
  UPDATE questions 
  SET 
    option_a = @option_a,
    option_b = @option_b,
    option_c = @option_c,
    option_d = @option_d,
    option_a_bn = @option_a_bn,
    option_b_bn = @option_b_bn,
    option_c_bn = @option_c_bn,
    option_d_bn = @option_d_bn,
    correct_answer = @correct_answer
  WHERE id = @id
`);

const keys = ['A', 'B', 'C', 'D'];

const balanceTx = db.transaction(() => {
  let modified = 0;

  for (let i = 0; i < allQuestions.length; i++) {
    const q = allQuestions[i];
    
    // Desired target key in balanced round-robin
    const targetKey = keys[i % 4];
    const currentKey = q.correct_answer;

    if (currentKey !== targetKey) {
      const opts = [
        { en: q.option_a, bn: q.option_a_bn },
        { en: q.option_b, bn: q.option_b_bn },
        { en: q.option_c, bn: q.option_c_bn },
        { en: q.option_d, bn: q.option_d_bn }
      ];

      const currentIdx = keys.indexOf(currentKey);
      const targetIdx = keys.indexOf(targetKey);

      if (currentIdx !== -1 && targetIdx !== -1) {
        // Swap options so correct answer moves to targetKey
        const temp = opts[targetIdx];
        opts[targetIdx] = opts[currentIdx];
        opts[currentIdx] = temp;

        updateQ.run({
          id: q.id,
          option_a: opts[0].en,
          option_b: opts[1].en,
          option_c: opts[2].en,
          option_d: opts[3].en,
          option_a_bn: opts[0].bn,
          option_b_bn: opts[1].bn,
          option_c_bn: opts[2].bn,
          option_d_bn: opts[3].bn,
          correct_answer: targetKey
        });
        modified++;
      }
    }
  }

  console.log(`✅ Balanced and redistributed answer keys across ${modified} questions.`);
});

balanceTx();

// Audit post-distribution
const finalDist = db.prepare('SELECT correct_answer, COUNT(*) as cnt FROM questions GROUP BY correct_answer').all();
console.log('\n📊 FINAL BALANCED ANSWER KEY DISTRIBUTION:');
console.table(finalDist);
