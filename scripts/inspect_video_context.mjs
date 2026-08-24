import fs from 'fs';

const contentPath = 'C:\\Users\\garai\\.gemini\\antigravity\\brain\\f776a8b2-e018-49fe-8835-6afd352097c1\\.system_generated\\steps\\5198\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

const sampleId = 'JPQ9OpyW-yw';
const idx = content.indexOf(sampleId);
console.log(`Index of ${sampleId}:`, idx);
if (idx !== -1) {
  console.log('Context around ID:\n', content.substring(Math.max(0, idx - 200), idx + 500));
}
