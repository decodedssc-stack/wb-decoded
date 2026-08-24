import fs from 'fs';

const contentPath = 'C:\\Users\\garai\\.gemini\\antigravity\\brain\\f776a8b2-e018-49fe-8835-6afd352097c1\\.system_generated\\steps\\5198\\content.md';
const content = fs.readFileSync(contentPath, 'utf8');

const jsonMatch = content.match(/var ytInitialData = ({.*?});<\/script>/s);
if (jsonMatch) {
  const data = JSON.parse(jsonMatch[1]);
  fs.writeFileSync('scripts/ytInitialData.json', JSON.stringify(data, null, 2));
  console.log('ytInitialData extracted successfully!');
} else {
  console.log('Searching for playlist video items manually...');
  // Extract with regex
  const videoRegex = /"playlistVideoRenderer":\s*({.*?}(?=,"playlistVideoRenderer"|}],"trackingParams"))/g;
  let matches = [];
  let m;
  
  // Alternative regex to get video info
  const regex2 = /"videoId":"(.*?)".*?"title":{"runs":\[{"text":"(.*?)"}\].*?"lengthText":{"accessibility":{"accessibilityData":{"label":"(.*?)"}},"simpleText":"(.*?)"}/g;
  while ((m = regex2.exec(content)) !== null) {
    matches.push({
      videoId: m[1],
      title: m[2],
      durationText: m[4]
    });
  }
  console.log('Found video items:', matches.length);
  console.log(matches);
}
