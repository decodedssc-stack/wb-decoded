import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔒 CREATING OTP_CODES & GOOGLE AUTH SCHEMA...');

// 1. Create otp_codes table
db.exec(`
  CREATE TABLE IF NOT EXISTS otp_codes (
    phone TEXT PRIMARY KEY,
    otp_code TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    attempts INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// 2. Add google_id and avatar columns to users if missing
const cols = db.prepare('PRAGMA table_info(users)').all().map(c => c.name);

if (!cols.includes('google_id')) {
  db.prepare("ALTER TABLE users ADD COLUMN google_id TEXT DEFAULT NULL").run();
  console.log('+ Added column: google_id');
}
if (!cols.includes('avatar')) {
  db.prepare("ALTER TABLE users ADD COLUMN avatar TEXT DEFAULT NULL").run();
  console.log('+ Added column: avatar');
}

console.log('✅ OTP & Google Auth database schema ready!');
