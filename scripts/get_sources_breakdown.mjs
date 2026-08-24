import Database from 'better-sqlite3';

const db = new Database('data/wb_decoded.sqlite');

const exams = db.prepare('SELECT id, name, authority, description FROM exams').all();
console.log('--- ALL EXAMS ---');
console.log(JSON.stringify(exams, null, 2));

const tagsSample = db.prepare('SELECT tags FROM questions WHERE tags IS NOT NULL LIMIT 20').all();
console.log('--- SAMPLE TAGS ---');
console.log(tagsSample);
