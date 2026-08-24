import fs from 'fs';

const videoIds = JSON.parse(fs.readFileSync('scripts/video_ids.json', 'utf8'));

async function analyzeAllVideos() {
  const fullData = [];
  console.log('Fetching deep metadata for all 28 videos...');

  for (let i = 0; i < videoIds.length; i++) {
    const id = videoIds[i];
    try {
      const pageRes = await fetch(`https://www.youtube.com/watch?v=${id}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      const html = await pageRes.text();

      // Extract title
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      const cleanTitle = titleMatch ? titleMatch[1].replace(' - YouTube', '').trim() : `Lecture ${i+1}`;

      // Extract description
      const descMatch = html.match(/"shortDescription":"(.*?)"/s) || html.match(/<meta name="description" content="(.*?)">/);
      const description = descMatch ? descMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"') : '';

      // Extract duration seconds
      const durMatch = html.match(/"lengthSeconds":"(\d+)"/);
      const lengthSeconds = durMatch ? parseInt(durMatch[1], 10) : 0;
      const minutes = Math.floor(lengthSeconds / 60);
      const seconds = lengthSeconds % 60;
      const durationFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      // Extract keywords
      const keywordsMatch = html.match(/"keywords":\[(.*?)\]/);
      const keywords = keywordsMatch ? keywordsMatch[1].split(',').map(k => k.replace(/"/g, '').trim()) : [];

      fullData.push({
        index: i + 1,
        videoId: id,
        title: cleanTitle,
        duration: durationFormatted,
        lengthSeconds,
        description,
        keywords,
        url: `https://www.youtube.com/watch?v=${id}`
      });

      console.log(`[${i + 1}/${videoIds.length}] ${cleanTitle} (${durationFormatted})`);
    } catch (err) {
      console.log(`[${i + 1}/${videoIds.length}] Error on ${id}: ${err.message}`);
    }
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync('scripts/playlist_full_deep_data.json', JSON.stringify(fullData, null, 2));
  console.log('✅ Deep metadata successfully generated for all 28 videos!');
}

analyzeAllVideos();
