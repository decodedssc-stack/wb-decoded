import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🧹 CLEANING ALL CHAPTERS: REMOVING SOURCE, LECTURE & TEACHER REFERENCES...');

const chapters = db.prepare('SELECT id, slug, content_markdown, title, subtitle FROM polity_chapters').all();

const updateChapter = db.prepare(`
  UPDATE polity_chapters 
  SET content_markdown = ?, subtitle = ?
  WHERE id = ?
`);

for (const ch of chapters) {
  let content = ch.content_markdown;

  // 1. Remove [FROM PLAYLIST] and [WB DECODED ADDITION] tags
  content = content.replace(/\[FROM PLAYLIST\]/g, '');
  content = content.replace(/\[WB DECODED ADDITION\]/g, '');
  content = content.replace(/\[WB DECODED MEMORY AID\]/g, '### 💡 Memory Mnemonics & Key Fast Recall:');

  // 2. Remove "Lecture Sources & Attribution" or "## 12. Lecture Sources" or "## 16. Lecture Sources" sections at the end
  content = content.replace(/## \d+\. Lecture Sources[\s\S]*$/, '');
  content = content.replace(/## Lecture Sources[\s\S]*$/, '');

  // 3. Clean up teacher terms to neutral authoritative textbook terms
  content = content.replace(/Teacher Warnings/g, 'High-Yield Exam Alerts');
  content = content.replace(/Teacher Exam Warnings/g, 'High-Yield Exam Alerts');
  content = content.replace(/Teacher Exam Traps/g, 'Common Exam Traps');
  content = content.replace(/Teacher Traps/g, 'Common Exam Traps');
  content = content.replace(/Teacher/g, 'Faculty');
  content = content.replace(/teacher/g, 'expert');

  // 4. Clean up subtitle if it mentions lectures
  let subtitle = ch.subtitle || '';
  subtitle = subtitle.replace(/Lec \d+/g, '').replace(/Lectures/g, 'Course').trim();

  updateChapter.run(content.trim(), subtitle, ch.id);
  console.log(`✅ Cleaned Chapter: ${ch.title}`);
}

// Also clean up MCQ trap warnings
const mcqs = db.prepare('SELECT id, trap_warning, explanation FROM polity_mcqs').all();
const updateMcq = db.prepare('UPDATE polity_mcqs SET trap_warning = ?, explanation = ? WHERE id = ?');

for (const m of mcqs) {
  let trap = m.trap_warning || '';
  trap = trap.replace(/Teacher/gi, 'Exam').replace(/lecture/gi, 'notes');
  let exp = m.explanation || '';
  exp = exp.replace(/Teacher/gi, 'Expert').replace(/lecture/gi, 'topic');
  updateMcq.run(trap, exp, m.id);
}

console.log(`✅ Cleaned all MCQs (${mcqs.length} questions updated).`);
console.log('🎉 Database completely cleaned of all source, lecture, and teacher references!');
