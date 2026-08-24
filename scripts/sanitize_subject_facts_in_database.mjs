import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🧹 SANITIZING IMPORTANT_FACT & EXAM_TIP FOR MATH, ENGLISH & REASONING IN DATABASE...');

// 1. Math / Arithmetic (sub-arith): Set exact formula and calculation trick
db.prepare(`
  UPDATE questions 
  SET 
    important_fact = '⚡ Key Formula: Apply standard shortcuts (SP = CP × (100+P)/100, SI = PTR/100, Time = (A×B)/(A+B), Speed = km/h × 5/18).',
    exam_tip = '⏱️ Speed Strategy: Use unit digit elimination and cancellation to compute in under 30 seconds.'
  WHERE subject_id = 'sub-arith'
`).run();

// 2. English Composition & Grammar (sub-eng): Set exact grammar rules and collocations
db.prepare(`
  UPDATE questions 
  SET 
    important_fact = '📌 Grammar Rule: Fixed Prepositions, Subject-Verb Agreement, and Tense consistency govern official test options.',
    exam_tip = '💡 Vocabulary Tip: Identify root words, prefixes/suffixes, and eliminate contextually incongruent distractors.'
  WHERE subject_id = 'sub-eng'
`).run();

// 3. General Mental Ability & Reasoning (sub-gma): Set exact logic pattern strategies
db.prepare(`
  UPDATE questions 
  SET 
    important_fact = '🧠 Logic Pattern: Analyze step differences (+4, +8, +12), square/cube relations, or reverse alphabet pairs (A-Z, B-Y).',
    exam_tip = '🎯 Solving Shortcut: Draw quick family tree branch diagrams or 4-direction cardinal grids.'
  WHERE subject_id = 'sub-gma'
`).run();

// 4. Bengali Language (sub-ben): Set Bengali grammar rules
db.prepare(`
  UPDATE questions 
  SET 
    important_fact = '📚 ব্যাকরণ সূত্র: প্রমিত স্বরসন্ধি, সমাস (দ্বিগু/দ্বন্দ্ব/বহুব্রীহি) ও কারক-বিভক্তির প্রামাণ্য বিশ্লেষণ।',
    exam_tip = '📝 পরীক্ষার টিপস: ব্যাসবাক্য ভেঙে মূল অর্থের প্রাধান্য ও বিভক্তি চিহ্ন লক্ষ্য করুন।'
  WHERE subject_id = 'sub-ben'
`).run();

// 5. Child Development & Pedagogy (sub-cdp): Set pedagogical principles
db.prepare(`
  UPDATE questions 
  SET 
    important_fact = '🎓 Pedagogical Principle: Child-centered developmental stages (Piaget), ZPD & Scaffolding (Vygotsky), and RTE 2009 PTR 30:1.',
    exam_tip = '🧠 TET Strategy: Focus on constructive active learning and eliminate punitive or passive teacher-centric options.'
  WHERE subject_id = 'sub-cdp'
`).run();

console.log('✅ Successfully sanitized facts across all non-GS subjects in the SQLite database!');
