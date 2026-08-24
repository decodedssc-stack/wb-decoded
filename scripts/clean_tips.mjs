import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('Scrubbing remaining exam names from tips and facts...');

const allQ = db.prepare('SELECT id, important_fact, exam_tip FROM questions').all();
const update = db.prepare('UPDATE questions SET important_fact = ?, exam_tip = ? WHERE id = ?');

db.transaction(() => {
  for (const q of allQ) {
    let fact = q.important_fact || '';
    let tip = q.exam_tip || '';

    const scrub = (str) => {
      return str
        .replace(/SSC and RRB exams/gi, 'Competitive examinations')
        .replace(/SSC and RRB/gi, 'WBCS and WB Police exams')
        .replace(/SSC CGL/gi, 'State level exams')
        .replace(/SSC exams/gi, 'State civil service exams')
        .replace(/RRB NTPC/gi, 'General competitive exams')
        .replace(/RRB ALP/gi, 'Technical & General exams')
        .replace(/RRB/gi, 'State')
        .replace(/SSC/gi, 'WBPSC')
        .replace(/UPSC Prelims/gi, 'WBCS Prelims')
        .replace(/UPSC/gi, 'Civil Services')
        .replace(/IBPS PO/gi, 'State Banking')
        .replace(/IBPS/gi, 'Banking')
        .replace(/Central Government/gi, 'West Bengal State')
        .replace(/Central exams/gi, 'State exams')
        .replace(/Central/gi, 'State');
    };

    const newFact = scrub(fact);
    const newTip = scrub(tip);

    if (newFact !== fact || newTip !== tip) {
      update.run(newFact, newTip, q.id);
    }
  }
})();

console.log('✅ All facts and tips completely scrubbed and sanitized.');
