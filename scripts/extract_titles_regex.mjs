import fs from 'fs';

const contentPath = 'C:\\Users\\garai\\.gemini\\antigravity\\brain\\f776a8b2-e018-49fe-8835-6afd352097c1\\.system_generated\\steps\\5198\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

// Regex search for video title patterns
const regex = /"videoRenderer":\s*({.*?})|"playlistVideoRenderer":\s*({.*?})|"compactVideoRenderer":\s*({.*?})|"videoOwnerRenderer":\s*({.*?})|"videoId":"([a-zA-Z0-9_-]{11})".*?"title":{"runs":\[{"text":"(.*?)"}\]/g;

// Simple regex to match video title and videoId
const simpleRegex = /"videoId":"([a-zA-Z0-9_-]{11})"[^}]+?"title":\{"runs":\[\{"text":"([^"]+)"\}\]/g;

let matches = [];
let m;
while ((m = simpleRegex.exec(content)) !== null) {
  matches.push({ id: m[1], title: m[2] });
}

console.log('Total matches found:', matches.length);
// Deduplicate by videoId
const unique = [];
const seen = new Set();
for (const item of matches) {
  if (!seen.has(item.id)) {
    seen.add(item.id);
    unique.push({ index: unique.length + 1, ...item });
  }
}

console.log('Unique videos:', unique.length);
console.table(unique);
fs.writeFileSync('scripts/playlist_videos.json', JSON.stringify(unique, null, 2));
