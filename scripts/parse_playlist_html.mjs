import fs from 'fs';
import path from 'path';

const contentPath = 'C:\\Users\\garai\\.gemini\\antigravity\\brain\\f776a8b2-e018-49fe-8835-6afd352097c1\\.system_generated\\steps\\5198\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

// Look for ytInitialData or playlist video renderers
const match = content.match(/var ytInitialData = ({.*?});<\/script>/s) || content.match(/window\["ytInitialData"\] = ({.*?});/s) || content.match(/"playlistVideoRenderer":\s*({.*?})/g);

console.log('Matches found:');
const videoIdRegex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
const titleRegex = /"title":{"runs":\[{"text":"(.*?)"}\]/g;

const videoIds = new Set();
let m;
while ((m = videoIdRegex.exec(content)) !== null) {
  videoIds.add(m[1]);
}

console.log('Total unique video IDs found in HTML:', videoIds.size);
console.log('Video IDs:', Array.from(videoIds));
