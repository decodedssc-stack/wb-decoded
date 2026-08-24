import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ FETCHING LIST OF ALL 243 ROBOTIC QUESTIONS TO BE REPLACED...');

const badQs = db.prepare(`
  SELECT id, subject_id, chapter_id, question_text, option_a, option_b, option_c, option_d, correct_answer
  FROM questions
  WHERE 
     option_a LIKE '%provides constitutional safeguards%' OR option_b LIKE '%provides constitutional safeguards%' OR option_c LIKE '%provides constitutional safeguards%' OR option_d LIKE '%provides constitutional safeguards%'
     OR option_a LIKE '%challenged colonial dominance%' OR option_b LIKE '%challenged colonial dominance%' OR option_c LIKE '%challenged colonial dominance%' OR option_d LIKE '%challenged colonial dominance%'
     OR option_a LIKE '%mobilized massive nationalist%' OR option_b LIKE '%mobilized massive nationalist%' OR option_c LIKE '%mobilized massive nationalist%' OR option_d LIKE '%mobilized massive nationalist%'
     OR option_a LIKE '%purely British administrative reform%' OR option_b LIKE '%purely British administrative reform%' OR option_c LIKE '%purely British administrative reform%' OR option_d LIKE '%purely British administrative reform%'
     OR option_a LIKE '%signed between the French East India Company%' OR option_b LIKE '%signed between the French East India Company%' OR option_c LIKE '%signed between the French East India Company%' OR option_d LIKE '%signed between the French East India Company%'
     OR option_a LIKE '%condemned by Rabindranath Tagore%' OR option_b LIKE '%condemned by Rabindranath Tagore%' OR option_c LIKE '%condemned by Rabindranath Tagore%' OR option_d LIKE '%condemned by Rabindranath Tagore%'
     OR option_a LIKE '%supported British police atrocities%' OR option_b LIKE '%supported British police atrocities%' OR option_c LIKE '%supported British police atrocities%' OR option_d LIKE '%supported British police atrocities%'
     OR option_a LIKE '%concluded without any political%' OR option_b LIKE '%concluded without any political%' OR option_c LIKE '%concluded without any political%' OR option_d LIKE '%concluded without any political%'
     OR option_a LIKE '%allows the executive to override%' OR option_b LIKE '%allows the executive to override%' OR option_c LIKE '%allows the executive to override%' OR option_d LIKE '%allows the executive to override%'
     OR option_a LIKE '%permanently abolished by the 44th%' OR option_b LIKE '%permanently abolished by the 44th%' OR option_c LIKE '%permanently abolished by the 44th%' OR option_d LIKE '%permanently abolished by the 44th%'
     OR option_a LIKE '%applies exclusively to the Union Territories%' OR option_b LIKE '%applies exclusively to the Union Territories%' OR option_c LIKE '%applies exclusively to the Union Territories%' OR option_d LIKE '%applies exclusively to the Union Territories%'
     OR option_a LIKE '%represents an essential physical%' OR option_b LIKE '%represents an essential physical%' OR option_c LIKE '%represents an essential physical%' OR option_d LIKE '%represents an essential physical%'
     OR option_a LIKE '%creates matter from nothing%' OR option_b LIKE '%creates matter from nothing%' OR option_c LIKE '%creates matter from nothing%' OR option_d LIKE '%creates matter from nothing%'
     OR option_a LIKE '%occurs exclusively when absolute temperature%' OR option_b LIKE '%occurs exclusively when absolute temperature%' OR option_c LIKE '%occurs exclusively when absolute temperature%' OR option_d LIKE '%occurs exclusively when absolute temperature%'
     OR option_a LIKE '%operates only in outer space%' OR option_b LIKE '%operates only in outer space%' OR option_c LIKE '%operates only in outer space%' OR option_d LIKE '%operates only in outer space%'
     OR option_a LIKE '%promotes sustainable socioeconomic development%' OR option_b LIKE '%promotes sustainable socioeconomic development%' OR option_c LIKE '%promotes sustainable socioeconomic development%' OR option_d LIKE '%promotes sustainable socioeconomic development%'
     OR question_text LIKE 'Under the Indian Constitutional framework, what is the significance%'
     OR question_text LIKE 'Regarding the historic significance of "%'
     OR question_text LIKE 'Which significant event or movement in Bengal during the Indian Freedom Struggle%'
     OR question_text LIKE 'Which fundamental economic mechanism, institution, or policy is governed by "%'
     OR question_text LIKE 'Which key geographical feature, river system, or climate characteristic of West Bengal is represented by "%'
     OR question_text LIKE 'Under the Constitution of India, which institutional mandate or fundamental principle is embodied by "%'
     OR question_text LIKE 'In General Science (Physics, Chemistry & Biology), which universal phenomenon is governed by "%'
     OR question_text LIKE 'Which important session, leader, or movement during the Freedom Struggle is commemorated by "%'
     OR question_text LIKE 'Which prominent river, mineral resource, or physical division of West Bengal is characterized by "%'
     OR question_text LIKE 'Which vital economic institution, tax policy, or banking regulation in India is represented by "%'
     OR question_text LIKE 'Which Constitutional Article, Schedule, or Supreme Court doctrine is directly related to "%'
     OR question_text LIKE 'Who among the following leaders played a pioneering role in the historic events surrounding "%'
`).all();

console.log(`Loaded ${badQs.length} question IDs to replace.`);
import fs from 'fs';
fs.writeFileSync('scripts/bad_questions_list.json', JSON.stringify(badQs, null, 2));
console.log('Saved to scripts/bad_questions_list.json');
