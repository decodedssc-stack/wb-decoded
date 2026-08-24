import fs from 'fs';
import path from 'path';

console.log('🧹 Purging all occurrences of "testbook" / "Testbook" across the codebase...');

function replaceInDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!entry.name.includes('node_modules') && !entry.name.includes('.next') && !entry.name.includes('.git')) {
        replaceInDir(fullPath);
      }
    } else if (/\.(tsx|ts|js|mjs|json|css|md)$/.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      // Replace Testbook Pass -> WB Decoded Pass / Pass Pro
      content = content.replace(/Testbook Pass Pro/gi, 'WB Pass Pro');
      content = content.replace(/Testbook Pass/gi, 'WB Pass');
      content = content.replace(/Testbook/gi, 'WB Decoded');
      content = content.replace(/testbook/gi, 'wbdecoded');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Cleaned: ${path.relative(process.cwd(), fullPath)}`);
      }
    }
  }
}

replaceInDir(path.join(process.cwd(), 'src'));
console.log('✅ All "testbook" references completely eradicated.');
