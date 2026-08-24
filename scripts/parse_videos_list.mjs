import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/ytInitialData.json', 'utf8'));

// Navigate to playlist contents
const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs;
const playlistSection = tabs?.[0]?.tabRenderer?.content?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents?.[0]?.playlistVideoListRenderer?.contents;

const videos = [];
if (playlistSection) {
  playlistSection.forEach((item, idx) => {
    const v = item.playlistVideoRenderer;
    if (v) {
      videos.push({
        index: idx + 1,
        videoId: v.videoId,
        title: v.title?.runs?.[0]?.text || v.title?.simpleText || 'Untitled',
        duration: v.lengthText?.simpleText || '00:00',
        author: v.shortBylineText?.runs?.[0]?.text || 'Teacher',
        thumbnail: v.thumbnail?.thumbnails?.[0]?.url || ''
      });
    }
  });
}

console.log(`Total Videos in Playlist: ${videos.length}`);
console.table(videos.map(v => ({ '#': v.index, Title: v.title, Duration: v.duration, ID: v.videoId })));
fs.writeFileSync('scripts/playlist_videos.json', JSON.stringify(videos, null, 2));
