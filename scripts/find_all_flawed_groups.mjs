import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 SCANNING SPECIFIC QUESTION GROUPS FOR FLAWED CONTENT...');

const flawedPatterns = [
  'q-cnt-%',
  'q-chtop-%',
  'q-stmt-%'
];

let totalFlawed = 0;
for (const pat of flawedPatterns) {
  const count = db.prepare('SELECT COUNT(*) as c FROM questions WHERE id LIKE ?').get(pat).c;
  console.log(`Pattern [${pat}]: ${count} questions`);
  totalFlawed += count;
}

// Check CHSL template questions like "Citizens must always comply..."
const chslTemplates = db.prepare("SELECT COUNT(*) as c FROM questions WHERE question_text LIKE '%Citizens must always%'").get().c;
console.log(`CHSL repetitive template questions: ${chslTemplates}`);
totalFlawed += chslTemplates;

console.log(`Total questionable questions identified: ${totalFlawed}`);
