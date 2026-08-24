import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🔧 REPAIRING SQLITE INDEX DEFINITIONS...');

db.prepare("DROP INDEX IF EXISTS idx_users_phone").run();
db.prepare("DROP INDEX IF EXISTS idx_users_email").run();

db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone ON users(phone) WHERE phone IS NOT NULL AND phone != ''").run();
db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL AND email != ''").run();

console.log('✅ SQLite index definitions successfully repaired!');
