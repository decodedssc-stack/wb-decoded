import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🧹 TESTING QUESTION CLEANER ON ALL 1282 QUESTIONS...');

function cleanEnglishQuestion(raw) {
  if (!raw) return '';
  let text = raw.trim();

  // 1. Remove all leading [Subject/Topic/Set #XYZ] tags
  text = text.replace(/^\[[^\]]+\]\s*/, '');

  // 2. Detect boilerplate "In ..., which of the following is correct regarding "XYZ"?"
  const quoteMatch = text.match(/(?:In [^,]+,\s*)?which of the following is correct regarding ["'“]([^"'”]+)["'”]\??/i)
                  || text.match(/(?:Under [^,]+,\s*)?which of the following is correct regarding ["'“]([^"'”]+)["'”]\??/i)
                  || text.match(/which of the following is correct regarding ["'“]([^"'”]+)["'”]\??/i);

  if (quoteMatch) {
    let core = quoteMatch[1].trim();

    // Transform specific core phrases into direct natural exam questions
    if (/^founder of\s+/i.test(core)) {
      return `Who was the ${core}?`;
    }
    if (/^author of\s+/i.test(core)) {
      return `Who was the ${core}?`;
    }
    if (/^leader of\s+/i.test(core)) {
      return `Who was the ${core}?`;
    }
    if (/^chairman of\s+/i.test(core)) {
      return `Who was the ${core}?`;
    }
    if (/^president of\s+/i.test(core) || /^permanent president\s+/i.test(core)) {
      return `Who was the ${core}?`;
    }
    if (/^viceroy of india\s+/i.test(core) || /^governor[- ]general\s+/i.test(core)) {
      return `Who was the ${core}?`;
    }
    if (/^mughal emperor who\s+/i.test(core)) {
      return `Which ${core}?`;
    }
    if (/^ruler who\s+/i.test(core) || /^king who\s+/i.test(core)) {
      return `Which ${core}?`;
    }
    if (/^first\s+/i.test(core)) {
      return `Which was the ${core}?`;
    }
    if (/^oldest\s+/i.test(core) || /^highest\s+/i.test(core) || /^longest\s+/i.test(core) || /^largest\s+/i.test(core) || /^smallest\s+/i.test(core) || /^deepest\s+/i.test(core)) {
      return `Which is the ${core}?`;
    }
    if (/^suicidal bags of the cell$/i.test(core)) {
      return `Which cell organelle is known as the 'Suicidal bags of the cell'?`;
    }
    if (/^powerhouse of the cell$/i.test(core)) {
      return `Which cell organelle is known as the 'Powerhouse of the cell'?`;
    }
    if (/^chemical formula of\s+/i.test(core) || /^chemical name of\s+/i.test(core)) {
      return `What is the ${core}?`;
    }
    if (/^capital of\s+/i.test(core) || /^currency of\s+/i.test(core) || /^headquarters of\s+/i.test(core)) {
      return `What is the ${core}?`;
    }
    if (/^article\s+\d+/i.test(core)) {
      return `Which provision is dealt with under ${core}?`;
    }

    // Default natural question
    return `Which of the following is associated with "${core}"?`;
  }

  // 3. Remove generic introductory clauses like "In General Science, " or "In Indian History, "
  text = text.replace(/^(?:In General Science|In Indian History|In the history of [^,]+|In the context of [^,]+|Under the Constitution of India|In Indian Polity|In West Bengal Geography),\s*/i, '');

  // Capitalize first letter
  if (text.length > 0) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
  }

  return text;
}

function cleanBengaliQuestion(raw) {
  if (!raw) return '';
  let text = raw.trim();

  // 1. Remove all leading [বিষয়/অধ্যায় #XYZ] tags
  text = text.replace(/^\[[^\]]+\]\s*/, '');

  // 2. Remove generic boilerplate phrases
  text = text.replace(/^(?:পশ্চিমবঙ্গ ও ভারতের ভূগোলে|ভারতের জাতীয় স্বাধীনতা সংগ্রামে|ভারতীয় সংবিধানে|ভারত ও বাংলার ইতিহাসে|সাধারণ বিজ্ঞানে)\s*/, '');

  return text;
}

const questions = db.prepare('SELECT id, question_text, question_text_bn FROM questions').all();

console.log('Sample 15 Cleaned Questions:');
for (let i = 0; i < 15; i++) {
  const q = questions[i];
  console.log(`\n[ID: ${q.id}]`);
  console.log('BEFORE (EN):', q.question_text);
  console.log('AFTER  (EN):', cleanEnglishQuestion(q.question_text));
  console.log('BEFORE (BN):', q.question_text_bn);
  console.log('AFTER  (BN):', cleanBengaliQuestion(q.question_text_bn));
}
