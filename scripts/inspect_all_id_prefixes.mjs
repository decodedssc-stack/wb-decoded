import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 ANALYZING ALL QUESTION ID PATTERNS & QUALITY METRICS...');

const all = db.prepare('SELECT id, question_text, option_a, correct_answer FROM questions').all();

const prefixMap = {};
all.forEach(q => {
  const parts = q.id.split('-');
  const prefix = parts.slice(0, 2).join('-');
  prefixMap[prefix] = (prefixMap[prefix] || 0) + 1;
});

console.log('Question counts by 2-part prefix:');
console.table(prefixMap);

// Also look at sample questions from each prefix
console.log('\nSample question from each prefix:');
const seenPrefixes = new Set();
all.forEach(q => {
  const parts = q.id.split('-');
  const prefix = parts.slice(0, 2).join('-');
  if (!seenPrefixes.has(prefix)) {
    seenPrefixes.add(prefix);
    console.log(`\nPrefix [${prefix}] (Sample: ${q.id}):`);
    console.log(`   Q: ${q.question_text}`);
    console.log(`   A: ${q.option_a}`);
  }
});
