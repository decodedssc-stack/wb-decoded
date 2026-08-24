import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🧹 REFINING BENGALI QUESTIONS...');

const bnQs = db.prepare('SELECT id, question_text_bn, question_text FROM questions').all();
const updateBn = db.prepare('UPDATE questions SET question_text_bn = ? WHERE id = ?');

let fixedBnCount = 0;

db.transaction(() => {
  for (const q of bnQs) {
    let bn = q.question_text_bn || '';
    if (!bn) continue;

    let original = bn;

    // 1. Remove prefixes like বাংলা ভাষা ও সাহিত্যে, সাধারণ বিজ্ঞানে, etc.
    bn = bn.replace(/^\[[^\]]+\]\s*/, '');
    bn = bn.replace(/^(?:বাংলা ভাষা ও সাহিত্যে|পশ্চিমবঙ্গ ও ভারতের ভূগোলে|ভারতের জাতীয় স্বাধীনতা সংগ্রামে|ভারতীয় সংবিধানে|ভারত ও বাংলার ইতিহাসে|সাধারণ বিজ্ঞানে)\s*/, '');

    // 2. Fix double quotes or nested quotes with কোনটি
    // e.g. ""শ্রীকৃষ্ণকীর্তন" কাব্যের রচয়িতা কে" কোনটি? -> "শ্রীকৃষ্ণকীর্তন" কাব্যের রচয়িতা কে?
    bn = bn.replace(/^""([^"]+)""\s*কোনটি\??/i, '$1?');
    bn = bn.replace(/^"([^"]+)"\s*কোনটি\??/i, '$1?');
    bn = bn.replace(/""/g, '"');
    bn = bn.replace(/সম্পর্কিত সঠিক তথ্য কোনটি\??/g, '');

    // Clean trailing spaces and ensure clean question mark
    bn = bn.trim();
    if (!bn.endsWith('?') && !bn.endsWith('।')) {
      bn += '?';
    }

    if (bn !== original) {
      updateBn.run(bn, q.id);
      fixedBnCount++;
    }
  }
})();

console.log(`✅ Cleaned ${fixedBnCount} Bengali questions!`);
