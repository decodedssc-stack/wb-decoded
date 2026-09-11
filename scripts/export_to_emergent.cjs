const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');

const workspaceRequire = createRequire(path.resolve(__dirname, '../package.json'));
const Database = workspaceRequire('better-sqlite3');

const dbPath = path.resolve(__dirname, '../data/wb_decoded.sqlite');
const outDir = path.resolve(__dirname, '../export_for_emergent');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('🔄 Exporting complete WB Decoded database to Emergent format...');
console.log('Database Path:', dbPath);
console.log('Output Directory:', outDir);

const db = new Database(dbPath);

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all().map(r => r.name);

const manifest = {
  exportedAt: new Date().toISOString(),
  sourceDatabase: 'wb_decoded.sqlite',
  totalQuestions: 0,
  totalMocks: 0,
  tables: {}
};

// Stream export each table to JSON
for (const tableName of tables) {
  try {
    const countRow = db.prepare(`SELECT count(*) as count FROM "${tableName}"`).get();
    const count = countRow.count;
    manifest.tables[tableName] = count;
    if (tableName === 'questions') manifest.totalQuestions = count;
    if (tableName === 'mock_tests') manifest.totalMocks = count;

    const jsonPath = path.join(outDir, `${tableName}.json`);
    const writeStream = fs.createWriteStream(jsonPath, { encoding: 'utf8' });
    writeStream.write('[\n');

    const stmt = db.prepare(`SELECT * FROM "${tableName}"`);
    let isFirst = true;

    for (const row of stmt.iterate()) {
      if (!isFirst) {
        writeStream.write(',\n');
      }
      writeStream.write('  ' + JSON.stringify(row));
      isFirst = false;
    }

    writeStream.write('\n]');
    writeStream.end();
    console.log(`  ✓ ${tableName}: ${count} rows exported`);
  } catch (err) {
    console.error(`  ✗ Error exporting ${tableName}:`, err.message);
  }
}

// Generate SQL Dump
console.log('\n📄 Generating updated SQL dump (wb_decoded_dump.sql)...');
const outSqlPath = path.join(outDir, 'wb_decoded_dump.sql');
const writeSqlStream = fs.createWriteStream(outSqlPath, { encoding: 'utf8' });

writeSqlStream.write('-- WB Decoded Full Database Dump for Emergent\n');
writeSqlStream.write(`-- Exported at: ${new Date().toISOString()}\n`);
writeSqlStream.write('PRAGMA foreign_keys=OFF;\nBEGIN TRANSACTION;\n\n');

const schemaRows = db.prepare("SELECT sql FROM sqlite_master WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite_%' ORDER BY type = 'table' DESC").all();
for (const row of schemaRows) {
  writeSqlStream.write(`${row.sql};\n\n`);
}

for (const tableName of tables) {
  const stmt = db.prepare(`SELECT * FROM "${tableName}"`);
  for (const row of stmt.iterate()) {
    const cols = Object.keys(row);
    const colList = cols.map(c => `"${c}"`).join(', ');
    const vals = cols.map(c => {
      const v = row[c];
      if (v === null || v === undefined) return 'NULL';
      if (typeof v === 'number') return v;
      return `'${String(v).replace(/'/g, "''")}'`;
    }).join(', ');
    writeSqlStream.write(`INSERT INTO "${tableName}" (${colList}) VALUES (${vals});\n`);
  }
}

writeSqlStream.write('\nCOMMIT;\n');
writeSqlStream.end(() => {
  // Copy compressed sqlite db into export directory as well
  const gzSrc = path.resolve(__dirname, '../data/wb_decoded.sqlite.gz');
  if (fs.existsSync(gzSrc)) {
    fs.copyFileSync(gzSrc, path.join(outDir, 'wb_decoded.sqlite.gz'));
    console.log(`  ✓ Copied compressed database wb_decoded.sqlite.gz (${(fs.statSync(gzSrc).size / (1024*1024)).toFixed(2)} MB)`);
  }

  // Write manifest.json
  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  // Create EMERGENT_SETUP.md
  const readmeContent = `# WB Decoded — Emergent Deployment & Setup Guide

This package contains the complete WB Decoded platform data, schema, and application suite ready for Emergent.

## 📊 Package Contents
- **Total Questions**: ${manifest.totalQuestions}
- **Total Mock Tests**: ${manifest.totalMocks} (Including 1,950 Chapter-Wise Mocks: 10 per chapter × 30 MCQs × 25 Mins)
- **Tables Exported**: ${Object.keys(manifest.tables).length} tables in individual JSON format
- **SQL Schema & Data Dump**: \`wb_decoded_dump.sql\`
- **Pre-compressed SQLite Database**: \`wb_decoded.sqlite.gz\`

## 🚀 Running on Emergent

### Option 1: Automatic (Zero Config)
The repository automatically detects \`data/wb_decoded.sqlite.gz\` and decompresses it on first launch:
\`\`\`bash
npm install
npm run dev
\`\`\`
Visit http://localhost:3005.

### Option 2: Restore from SQL Dump
\`\`\`bash
sqlite3 data/wb_decoded.sqlite < export_for_emergent/wb_decoded_dump.sql
\`\`\`

### Option 3: Manual Decompress
\`\`\`bash
node -e "const fs = require('fs'), zlib = require('zlib'); fs.writeFileSync('data/wb_decoded.sqlite', zlib.gunzipSync(fs.readFileSync('data/wb_decoded.sqlite.gz'))); console.log('Ready!');"
\`\`\`
`;

  fs.writeFileSync(path.join(outDir, 'README.md'), readmeContent, 'utf8');

  console.log(`\n🎉 SUCCESS! Full Emergent export complete!`);
  console.log(`Total Questions: ${manifest.totalQuestions}`);
  console.log(`Total Mocks: ${manifest.totalMocks}`);
  console.log(`Output Directory: ${outDir}\n`);
  db.close();
});
