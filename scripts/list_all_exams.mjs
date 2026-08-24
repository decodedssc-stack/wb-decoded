import Database from 'better-sqlite3';
const db = new Database('data/wb_decoded.sqlite');

const exams = db.prepare('SELECT id, name, slug, authority FROM exams').all();
console.table(exams);
