import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 ANALYZING ALL QUESTIONS FOR SUBJECT/CHAPTER LABELS & BOILERPLATE...');

const questions = db.prepare('SELECT id, question_text, question_text_bn FROM questions').all();
console.log(`Total questions in questions table: ${questions.length}`);

let dirtyCount = 0;
const sampleBefore = [];

for (const q of questions) {
  const text = q.question_text || '';
  if (text.startsWith('[') || text.includes('regarding "') || text.includes('regarding \'') || text.includes('Set #') || text.includes('Drill #') || text.includes('Module #')) {
    dirtyCount++;
    if (sampleBefore.length < 10) {
      sampleBefore.push({ id: q.id, en: text, bn: q.question_text_bn });
    }
  }
}

console.log(`Found ${dirtyCount} questions with subject/chapter tags or synthetic boilerplate prefixes.`);
console.log('Sample Before:');
console.log(JSON.stringify(sampleBefore, null, 2));

// Also check polity_mcqs
const polityMcqs = db.prepare('SELECT id, question_text FROM polity_mcqs').all();
console.log(`\nChecking polity_mcqs table (${polityMcqs.length} MCQs)...`);
const samplePolity = polityMcqs.slice(0, 5);
console.log(JSON.stringify(samplePolity, null, 2));
