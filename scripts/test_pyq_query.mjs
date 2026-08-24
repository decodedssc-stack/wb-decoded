import Database from 'better-sqlite3';
const db = new Database('data/wb_decoded.sqlite');

const mocks = db.prepare(`
  SELECT m.*, COALESCE(e.name, 'Universal Chapter Mock') as exam_name, COALESCE(e.authority, 'West Bengal Curriculum') as authority,
    COALESCE(m.total_questions, 50) as question_count
  FROM mock_tests m
  LEFT JOIN exams e ON m.exam_id = e.id
  WHERE m.mock_type = 'Previous-Year'
  ORDER BY m.id DESC
`).all();

console.log(`Found ${mocks.length} Previous-Year mock tests!`);
console.log('Sample mock:', mocks[0]);

// Group by year
const yearGroups = {};
for (const m of mocks) {
  const match = m.title.match(/\((\d{4})\)/);
  const year = match ? match[1] : 'Other';
  if (!yearGroups[year]) yearGroups[year] = 0;
  yearGroups[year]++;
}
console.log('Year distribution:', yearGroups);
