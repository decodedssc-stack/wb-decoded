import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔒 UPGRADING USERS TABLE FOR PRODUCTION AUTHENTICATION...');

const cols = db.prepare('PRAGMA table_info(users)').all().map(c => c.name);

if (!cols.includes('password_hash')) {
  db.prepare("ALTER TABLE users ADD COLUMN password_hash TEXT DEFAULT ''").run();
  console.log('+ Added column: password_hash');
}
if (!cols.includes('district')) {
  db.prepare("ALTER TABLE users ADD COLUMN district TEXT DEFAULT 'Kolkata'").run();
  console.log('+ Added column: district');
}
if (!cols.includes('preferred_lang')) {
  db.prepare("ALTER TABLE users ADD COLUMN preferred_lang TEXT DEFAULT 'bilingual'").run();
  console.log('+ Added column: preferred_lang');
}
if (!cols.includes('last_login_at')) {
  db.prepare("ALTER TABLE users ADD COLUMN last_login_at DATETIME DEFAULT NULL").run();
  console.log('+ Added column: last_login_at');
}

// Create unique index on phone and email if not exists
try {
  db.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone ON users(phone) WHERE phone IS NOT NULL AND phone != ""').run();
  db.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL AND email != ""').run();
  console.log('✅ Created indexes on phone & email.');
} catch (e) {
  console.log('Index note:', e.message);
}

console.log('🎉 Production Auth Database Schema Ready!');
