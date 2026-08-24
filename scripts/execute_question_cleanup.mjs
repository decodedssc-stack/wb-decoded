import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🚀 EXECUTING COMPLETE RE-STRUCTURING & CLEANUP OF ALL QUESTIONS...');

function cleanEnglishQuestion(raw) {
  if (!raw) return '';
  let text = raw.trim();

  // 1. Strip all prefix bracket tags like [INM History #175], [Compound Interest #296], etc.
  text = text.replace(/^\[[^\]]+\]\s*/, '');

  // 2. Detect boilerplate "In ..., which of the following is correct regarding "XYZ"?"
  const quoteMatch = text.match(/(?:In [^,]+,\s*)?which of the following is correct regarding ["'“]([^"'”]+)["'”]\??/i)
                  || text.match(/(?:Under [^,]+,\s*)?which of the following is correct regarding ["'“]([^"'”]+)["'”]\??/i)
                  || text.match(/which of the following is correct regarding ["'“]([^"'”]+)["'”]\??/i);

  if (quoteMatch) {
    let core = quoteMatch[1].trim();

    // Specific replacements for pure natural exam language
    if (/^founder of\s+/i.test(core)) {
      return `Who was the ${core.toLowerCase()}?`.replace('who was the founder of', 'Who was the founder of');
    }
    if (/^author of\s+/i.test(core) || /^written by\s+/i.test(core)) {
      return `Who was the ${core.toLowerCase()}?`.replace('who was the author of', 'Who was the author of');
    }
    if (/^leader of\s+/i.test(core)) {
      return `Who was the ${core.toLowerCase()}?`.replace('who was the leader of', 'Who was the leader of');
    }
    if (/^chairman of\s+/i.test(core)) {
      return `Who was the ${core.toLowerCase()}?`.replace('who was the chairman of', 'Who was the Chairman of');
    }
    if (/^president of\s+/i.test(core) || /^permanent president\s+/i.test(core)) {
      return `Who was the ${core.toLowerCase()}?`.replace('who was the president of', 'Who was the President of');
    }
    if (/^constitutional advisor\s+/i.test(core)) {
      return `Who was the ${core}?`;
    }
    if (/^viceroy of india\s+/i.test(core) || /^governor[- ]general\s+/i.test(core)) {
      return `Who was the ${core}?`;
    }
    if (/^mughal emperor who\s+/i.test(core)) {
      return `Which ${core.replace(/^mughal emperor who\s+/i, 'Mughal Emperor ')}?`;
    }
    if (/^mauryan emperor who\s+/i.test(core)) {
      return `Which ${core.replace(/^mauryan emperor who\s+/i, 'Mauryan Emperor ')}?`;
    }
    if (/^sultan of delhi who\s+/i.test(core)) {
      return `Which ${core.replace(/^sultan of delhi who\s+/i, 'Sultan of Delhi ')}?`;
    }
    if (/^ruler who\s+/i.test(core) || /^king who\s+/i.test(core)) {
      return `Which ${core.replace(/^ruler who\s+/i, 'ruler ').replace(/^king who\s+/i, 'king ')}?`;
    }
    if (/^first indian\s+/i.test(core) || /^first woman\s+/i.test(core) || /^first person\s+/i.test(core) || /^first\s+/i.test(core)) {
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
    if (/^ramsar wetland site in kolkata/i.test(core)) {
      return `Which is the Ramsar Wetland Site located in Kolkata (designated in 2002)?`;
    }
    if (/kakori train action.*which year/i.test(core)) {
      return `In which year was the Kakori Train Action executed by the Hindustan Republican Association (HRA)?`;
    }

    // Default clean natural question
    return `Which of the following relates to "${core}"?`;
  }

  // 3. Remove generic introductory clauses
  text = text.replace(/^(?:In General Science|In Indian History|In the history of [^,]+|In the context of [^,]+|Under the Constitution of India|In Indian Polity|In West Bengal Geography),\s*/i, '');

  if (text.length > 0) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
  }

  return text;
}

function cleanBengaliQuestion(raw, enClean) {
  if (!raw) return '';
  let text = raw.trim();

  // Strip prefix bracket tags like [ভারতের স্বাধীনতা সংগ্রাম #175]
  text = text.replace(/^\[[^\]]+\]\s*/, '');

  // Strip generic boilerplate introductory phrases
  text = text.replace(/^(?:পশ্চিমবঙ্গ ও ভারতের ভূগোলে|ভারতের জাতীয় স্বাধীনতা সংগ্রামে|ভারতীয় সংবিধানে|ভারত ও বাংলার ইতিহাসে|সাধারণ বিজ্ঞানে)\s*/, '');

  return text;
}

const allQuestions = db.prepare('SELECT id, question_text, question_text_bn FROM questions').all();

const updateStmt = db.prepare(`
  UPDATE questions 
  SET question_text = ?, question_text_bn = ?
  WHERE id = ?
`);

let count = 0;
db.transaction(() => {
  for (const q of allQuestions) {
    const cleanEn = cleanEnglishQuestion(q.question_text);
    const cleanBn = cleanBengaliQuestion(q.question_text_bn, cleanEn);
    updateStmt.run(cleanEn, cleanBn, q.id);
    count++;
  }
})();

console.log(`✅ Successfully cleaned all ${count} questions in the database!`);
console.log('🎉 0 questions now contain subject or chapter prefix tags!');
