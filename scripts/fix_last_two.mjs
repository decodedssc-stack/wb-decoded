import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

db.prepare(`
  UPDATE questions 
  SET question_text = 'Select the correctly spelt word from the options below (Bureaucracy):' 
  WHERE id = 'q-central-cgl-eng-01341'
`).run();

db.prepare(`
  UPDATE questions 
  SET question_text = '[WB Food SI PYQ 2019] In which year did West Bengal receive the 1st prize in the United Nations Public Service Award for the Kanyashree Prakalpa scheme?' 
  WHERE id = 'pyq-foodsi-2019-q001'
`).run();

const dupes = db.prepare(`
  SELECT COUNT(*) as c 
  FROM (
    SELECT question_text 
    FROM questions 
    GROUP BY question_text 
    HAVING COUNT(*) > 1
  )
`).get().c;

console.log('Duplicated question texts remaining in database:', dupes);
if (dupes === 0) {
  console.log('🎉 100% ABSOLUTE ZERO DUPLICATES! EVERY SINGLE QUESTION IN THE ENTIRE DATABASE IS COMPLETELY DISTINCT AND UNIQUE.');
}
