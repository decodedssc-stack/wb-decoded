import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🧹 Cleaning all giveaway brackets, explanatory hints, and annotations from question options...');

function cleanOptionText(text) {
  if (!text || typeof text !== 'string') return text;
  let cleaned = text.trim();

  // 1. Remove obvious hint annotations in brackets
  // e.g. "NVNCBJ (+1 to each letter)" -> "NVNCBJ"
  // e.g. "Careless (Negligent / Sloppy)" -> "Careless"
  // e.g. "Can (Modal auxiliary)" -> "Can"
  // e.g. "Lord Dufferin (1884–1888)" -> "Lord Dufferin"
  // e.g. "Uttar Dinajpur (59.07%)" -> "Uttar Dinajpur"
  // e.g. "Sandakphu (3,636 metres)" -> "Sandakphu"
  // e.g. "1862 (1st July)" -> "1862"
  // e.g. "1939 (3rd May, Unnao / Makur)" -> "1939"
  // e.g. "2017 (at The Hague, Netherlands)" -> "2017"
  // e.g. "San Francisco, USA (Yugantar Ashram)" -> "San Francisco, USA"
  // e.g. "1780 (29 January)" -> "1780"
  // e.g. "Fishing Cat (Prionailurus viverrinus / Mechho Biral / Baghrol)" -> "Fishing Cat"
  // e.g. "were (Subjunctive mood)" -> "were"
  // e.g. "cut down (reduce intake)" -> "cut down"
  // e.g. "Wreath (Memorial arrangement)" -> "Wreath"
  // e.g. "Apostate (Renouncer of faith)" -> "Apostate"
  // e.g. "Frugal (Thrifty / Economical)" -> "Frugal"
  // e.g. "Infertile (Unproductive / Desolate)" -> "Infertile"
  // e.g. "shoal (or school)" -> "shoal"

  // Check if option ends with parenthesis (...)
  const match = cleaned.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
  if (match) {
    const mainPart = match[1].trim();
    const bracketContent = match[2].trim();

    // If mainPart exists, check if bracket content is an annotation/hint
    if (mainPart.length > 0) {
      // Don't strip if main part is empty or just 1 letter like "(A)"
      // Strip dates, explanations, synonyms, percentages, translations, hints
      cleaned = mainPart;
    }
  }

  // Remove any remaining trailing / multiple bracket tails
  cleaned = cleaned.replace(/\s*\([^()]*\)\s*$/, '').trim();

  return cleaned;
}

function cleanBengaliOptionText(text) {
  if (!text || typeof text !== 'string') return text;
  let cleaned = text.trim();

  // Bengali options often had English translations in brackets like "অসাবধান / যত্নহীন (Careless)"
  // or "উইনস্টন চার্চিল (১৯৩১)" -> clean to "অসাবধান" or keep clean Bengali term
  const match = cleaned.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
  if (match) {
    const mainPart = match[1].trim();
    if (mainPart.length > 0) {
      cleaned = mainPart;
    }
  }

  return cleaned.trim();
}

const allQuestions = db.prepare('SELECT id, option_a, option_b, option_c, option_d, option_a_bn, option_b_bn, option_c_bn, option_d_bn FROM questions').all();

console.log(`Auditing ${allQuestions.length} questions...`);

const updateStmt = db.prepare(`
  UPDATE questions
  SET 
    option_a = @option_a,
    option_b = @option_b,
    option_c = @option_c,
    option_d = @option_d,
    option_a_bn = @option_a_bn,
    option_b_bn = @option_b_bn,
    option_c_bn = @option_c_bn,
    option_d_bn = @option_d_bn
  WHERE id = @id
`);

let cleanedCount = 0;

const cleanTrans = db.transaction(() => {
  for (const q of allQuestions) {
    const newA = cleanOptionText(q.option_a);
    const newB = cleanOptionText(q.option_b);
    const newC = cleanOptionText(q.option_c);
    const newD = cleanOptionText(q.option_d);

    const newABn = cleanBengaliOptionText(q.option_a_bn || q.option_a);
    const newBBn = cleanBengaliOptionText(q.option_b_bn || q.option_b);
    const newCBn = cleanBengaliOptionText(q.option_c_bn || q.option_c);
    const newDBn = cleanBengaliOptionText(q.option_d_bn || q.option_d);

    if (
      newA !== q.option_a || newB !== q.option_b || newC !== q.option_c || newD !== q.option_d ||
      newABn !== q.option_a_bn || newBBn !== q.option_b_bn || newCBn !== q.option_c_bn || newDBn !== q.option_d_bn
    ) {
      updateStmt.run({
        id: q.id,
        option_a: newA,
        option_b: newB,
        option_c: newC,
        option_d: newD,
        option_a_bn: newABn,
        option_b_bn: newBBn,
        option_c_bn: newCBn,
        option_d_bn: newDBn
      });
      cleanedCount++;
    }
  }
});

cleanTrans();

console.log(`✅ Successfully cleaned ${cleanedCount} questions with bracketed annotations!`);

// Verify sample WBCS 2023 questions
const sample = db.prepare("SELECT id, option_a, option_b, option_c, option_d FROM questions WHERE id LIKE 'pyq-wbcs2023%' LIMIT 10").all();
console.log('\nSample Verified Cleaned Options:');
console.table(sample);
