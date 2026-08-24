import fs from 'fs';

const contentPath = 'C:\\Users\\garai\\.gemini\\antigravity\\brain\\f776a8b2-e018-49fe-8835-6afd352097c1\\.system_generated\\steps\\5198\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

const videoIdRegex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
const videoIds = [];
const seen = new Set();
let m;

while ((m = videoIdRegex.exec(content)) !== null) {
  const id = m[1];
  if (!seen.has(id)) {
    seen.add(id);
    videoIds.push(id);
  }
}

console.log(`Found ${videoIds.length} video IDs.`);
fs.writeFileSync('scripts/video_ids.json', JSON.stringify(videoIds, null, 2));
