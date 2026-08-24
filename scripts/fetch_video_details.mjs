import fs from 'fs';

const videoIds = JSON.parse(fs.readFileSync('scripts/video_ids.json', 'utf8'));

async function fetchVideoDetails() {
  const results = [];
  console.log(`Fetching details for ${videoIds.length} videos via oEmbed...`);

  for (let i = 0; i < videoIds.length; i++) {
    const id = videoIds[i];
    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
      if (res.ok) {
        const data = await res.json();
        results.push({
          index: i + 1,
          videoId: id,
          title: data.title,
          author: data.author_name,
          authorUrl: data.author_url,
          thumbnailUrl: data.thumbnail_url
        });
        console.log(`[${i + 1}/${videoIds.length}] ${data.title}`);
      } else {
        console.log(`[${i + 1}/${videoIds.length}] Failed to fetch metadata for ${id} (Status: ${res.status})`);
        results.push({
          index: i + 1,
          videoId: id,
          title: `Indian Polity Lecture ${i + 1}`,
          author: 'Indian Polity Special GS Classes',
          thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
        });
      }
    } catch (err) {
      console.log(`[${i + 1}/${videoIds.length}] Error for ${id}:`, err.message);
      results.push({
        index: i + 1,
        videoId: id,
        title: `Indian Polity Lecture ${i + 1}`,
        author: 'Indian Polity Special GS Classes',
        thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
      });
    }
    // Small delay to be polite
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync('scripts/playlist_videos_full.json', JSON.stringify(results, null, 2));
  console.log('Finished fetching all video details!');
}

fetchVideoDetails();
