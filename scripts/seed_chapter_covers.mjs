import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔄 UPDATING POLITY CHAPTERS WITH COVER IMAGES...');

try {
  db.exec('ALTER TABLE polity_chapters ADD COLUMN cover_image TEXT');
} catch (e) {
  // Column might already exist
}

const coverMapping = {
  1: '/images/polity/chapter-01-historical-background.svg',
  2: '/images/polity/chapter-02-making-of-the-constitution.svg',
  3: '/images/polity/chapter-03-salient-features-and-schedules.svg',
  4: '/images/polity/chapter-04-preamble-of-the-constitution.svg',
  5: '/images/polity/chapter-05-union-and-its-territory.svg',
  6: '/images/polity/chapter-06-citizenship.svg',
  7: '/images/polity/chapter-07-fundamental-rights.svg',
  8: '/images/polity/chapter-08-directive-principles-and-duties.svg',
  9: '/images/polity/chapter-09-the-president-of-india.svg',
  10: '/images/polity/chapter-10-vice-president-and-prime-minister.svg',
  11: '/images/polity/chapter-11-law-officers-ag-and-advocate-general.svg',
  12: '/images/polity/chapter-12-state-executive-and-governor.svg',
  13: '/images/polity/chapter-13-the-parliament-of-india.svg',
  14: '/images/polity/chapter-14-supreme-court-of-india.svg',
  15: '/images/polity/chapter-15-state-judiciary-high-courts.svg',
  16: '/images/polity/chapter-16-panchayati-raj-and-local-government.svg'
};

const updateCover = db.prepare('UPDATE polity_chapters SET cover_image = ? WHERE chapter_number = ?');

for (const [num, imgPath] of Object.entries(coverMapping)) {
  updateCover.run(imgPath, Number(num));
  console.log(`Updated Chapter ${num} cover -> ${imgPath}`);
}

console.log('✅ All 16 chapters updated with cover images in SQLite database.');
