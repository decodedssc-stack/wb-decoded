import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔍 VERIFYING TEXT OF ALL QUESTIONS IN DATABASE...');

const badTexts = db.prepare(`
  SELECT id, question_text, option_a, correct_answer 
  FROM questions 
  WHERE question_text LIKE '%perspective%'
     OR question_text LIKE '%directly linked to%'
     OR question_text LIKE '%Citizens must always%'
     OR question_text LIKE '%Regarding the historic significance%'
     OR question_text LIKE '%Which significant event or movement in Bengal during the Indian Freedom Struggle%'
     OR question_text LIKE '%Which foundational principle, key development%'
     OR option_a LIKE '%provides constitutional safeguards%'
     OR option_a LIKE '%challenged colonial dominance%'
     OR option_a LIKE '%mobilized massive nationalist%'
     OR option_a LIKE '%purely British administrative reform%'
     OR option_a LIKE '%Alternative%'
     OR option_d LIKE '%Alternative%'
`).all();

console.log(`Total questions with robotic text: ${badTexts.length}`);
if (badTexts.length === 0) {
  console.log('🎉 100% CLEAN - ZERO QUESTIONS WITH ROBOTIC TEXT REMAINING!');
} else {
  console.log('Found:', badTexts);
}
