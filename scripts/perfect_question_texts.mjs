import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🧹 PERFECTING BENGALI & ALL LANGUAGE QUESTION TEXTS...');

function cleanString(str) {
  if (!str) return '';
  let s = str.trim();

  // Strip prefixes
  s = s.replace(/^\[[^\]]+\]\s*/, '');
  s = s.replace(/^বাংলা ভাষা ও সাহিত্যে\s*/, '');
  s = s.replace(/^পশ্চিমবঙ্গ ও ভারতের ভূগোলে\s*/, '');
  s = s.replace(/^ভারতের জাতীয় স্বাধীনতা সংগ্রামে\s*/, '');
  s = s.replace(/^ভারতীয় সংবিধানে\s*/, '');
  s = s.replace(/^ভারত ও বাংলার ইতিহাসে\s*/, '');
  s = s.replace(/^সাধারণ বিজ্ঞানে\s*/, '');

  // Fix quote patterns
  // e.g. ""শ্রীকৃষ্ণকীর্তন" কাব্যের রচয়িতা কে" কোনটি? -> "শ্রীকৃষ্ণকীর্তন" কাব্যের রচয়িতা কে?
  s = s.replace(/^""([^"]+)""\s*কোনটি\??/i, '"$1"?');
  s = s.replace(/^""([^"]+)""/i, '"$1"');
  s = s.replace(/"\s*কোনটি\?$/i, '?');
  s = s.replace(/"\s*কোনটি"$/i, '?');
  s = s.replace(/""/g, '"');

  s = s.trim();
  if (!s.endsWith('?') && !s.endsWith('।') && !s.endsWith('.')) {
    s += '?';
  }
  return s;
}

const allQs = db.prepare('SELECT id, question_text, question_text_bn FROM questions').all();
const updateStmt = db.prepare('UPDATE questions SET question_text = ?, question_text_bn = ? WHERE id = ?');

let count = 0;
db.transaction(() => {
  for (const q of allQs) {
    const cleanEn = cleanString(q.question_text);
    const cleanBn = cleanString(q.question_text_bn);
    updateStmt.run(cleanEn, cleanBn, q.id);
    count++;
  }
})();

console.log(`✅ Perfected all ${count} questions in the database!`);
