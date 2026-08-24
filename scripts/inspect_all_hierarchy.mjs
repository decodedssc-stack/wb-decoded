import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

const subjects = db.prepare('SELECT id, name, order_index FROM subjects ORDER BY order_index').all();
console.log(`Current Subjects (${subjects.length} total):`);

subjects.forEach(s => {
  const chaps = db.prepare('SELECT id, name FROM chapters WHERE subject_id = ? ORDER BY order_index').all(s.id);
  console.log(`\n📌 ${s.name} (${s.id}) - ${chaps.length} Chapters:`);
  chaps.forEach(c => console.log(`   • ${c.id} | ${c.name}`));
});
