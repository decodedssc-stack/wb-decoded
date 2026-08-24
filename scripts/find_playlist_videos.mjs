import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/ytInitialData.json', 'utf8'));

function findKey(obj, targetKey, results = []) {
  if (!obj || typeof obj !== 'object') return results;
  if (Array.isArray(obj)) {
    for (const item of obj) findKey(item, targetKey, results);
    return results;
  }
  for (const [key, value] of Object.entries(obj)) {
    if (key === targetKey) {
      results.push(value);
    } else {
      findKey(value, targetKey, results);
    }
  }
  return results;
}

const renderers = findKey(data, 'playlistVideoRenderer');
console.log('Found playlistVideoRenderers:', renderers.length);

const videos = renderers.map((v, i) => ({
  index: i + 1,
  videoId: v.videoId,
  title: v.title?.runs?.[0]?.text || v.title?.simpleText || 'Untitled',
  duration: v.lengthText?.simpleText || '00:00',
  author: v.shortBylineText?.runs?.[0]?.text || 'Teacher'
}));

console.table(videos);
fs.writeFileSync('scripts/playlist_videos.json', JSON.stringify(videos, null, 2));
