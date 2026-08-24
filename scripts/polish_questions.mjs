import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('⚡ REFINING ALL QUESTIONS INTO DIRECT NATURAL EXAM QUESTIONS...');

function polishQuestionText(text) {
  if (!text) return '';
  let q = text.trim();

  // Match: Which of the following relates to "..."?
  const relMatch = q.match(/Which of the following relates to ["'“]([^"'”]+)["'”]\??/i);
  if (relMatch) {
    let core = relMatch[1].trim();

    if (/^minimum age required/i.test(core)) {
      return `What is the ${core}?`;
    }
    if (/^maximum age/i.test(core)) {
      return `What is the ${core}?`;
    }
    if (/^who presides over/i.test(core)) {
      return `${core}?`;
    }
    if (/^who was/i.test(core) || /^who is/i.test(core) || /^who appointed/i.test(core) || /^who established/i.test(core)) {
      return `${core}?`;
    }
    if (/money bill is defined under which article/i.test(core)) {
      return `Under which Article of the Constitution of India is a 'Money Bill' defined?`;
    }
    if (/annual financial statement.*presented under/i.test(core)) {
      return `Under which Article of the Constitution is the Annual Financial Statement (Budget) presented?`;
    }
    if (/^tenure of/i.test(core) || /^term of/i.test(core)) {
      return `What is the ${core}?`;
    }
    if (/^quorom of/i.test(core) || /^quorum/i.test(core)) {
      return `What is the ${core}?`;
    }
    if (/^total number of/i.test(core) || /^number of/i.test(core)) {
      return `What is the ${core}?`;
    }
    if (/^headquarters of/i.test(core)) {
      return `Where is the ${core} located?`;
    }
    if (/^location of/i.test(core)) {
      return `Where is the ${core}?`;
    }
    if (/^highest peak/i.test(core) || /^longest river/i.test(core) || /^largest lake/i.test(core)) {
      return `Which is the ${core}?`;
    }
    if (/^battle of/i.test(core) || /^treaty of/i.test(core)) {
      return `When was the ${core} signed/fought?`;
    }
    if (/^si unit of/i.test(core) || /^unit of/i.test(core)) {
      return `What is the ${core}?`;
    }

    // Default clean
    return `${core}?`;
  }

  return q;
}

const allQs = db.prepare('SELECT id, question_text FROM questions').all();
const updateStmt = db.prepare('UPDATE questions SET question_text = ? WHERE id = ?');

let refinedCount = 0;
db.transaction(() => {
  for (const q of allQs) {
    const polished = polishQuestionText(q.question_text);
    if (polished !== q.question_text) {
      updateStmt.run(polished, q.id);
      refinedCount++;
    }
  }
})();

console.log(`✅ Refined ${refinedCount} questions to direct natural exam format!`);
