import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('📼 SEEDING PLAYLIST VIDEOS TRACKING REPOSITORY...');

const PLAYLIST_VIDEOS = [
  {
    video_number: 1,
    video_id: 'euKklgm5zXI',
    title: 'Lec - 01. Indian Polity Basics and Salient Features of the Constitution Part-1',
    duration_text: '114:11',
    length_seconds: 6851,
    chapter_slug: 'salient-features-and-sources',
    quality_score: 98,
    url: 'https://www.youtube.com/watch?v=euKklgm5zXI'
  },
  {
    video_number: 2,
    video_id: 'wtdgbR4Ghdg',
    title: 'Lec: 02. Indian Polity Basics and Salient Features of the Constitution Part-2',
    duration_text: '87:58',
    length_seconds: 5278,
    chapter_slug: 'salient-features-and-sources',
    quality_score: 97,
    url: 'https://www.youtube.com/watch?v=wtdgbR4Ghdg'
  },
  {
    video_number: 3,
    video_id: 'mm5QTCUHIjs',
    title: 'Lec:03  Indian Polity Basics and Salient Features of the Constitution Part 3',
    duration_text: '113:22',
    length_seconds: 6802,
    chapter_slug: 'salient-features-and-sources',
    quality_score: 96,
    url: 'https://www.youtube.com/watch?v=mm5QTCUHIjs'
  },
  {
    video_number: 4,
    video_id: 'qa704uGYv6s',
    title: 'Lec   04  Historical Background of Indian Constitution part 1',
    duration_text: '103:23',
    length_seconds: 6203,
    chapter_slug: 'historical-background',
    quality_score: 99,
    url: 'https://www.youtube.com/watch?v=qa704uGYv6s'
  },
  {
    video_number: 5,
    video_id: 'OmezStvJxkw',
    title: 'Lec   05  Historical Background of Indian Constitution part 2',
    duration_text: '87:05',
    length_seconds: 5225,
    chapter_slug: 'historical-background',
    quality_score: 98,
    url: 'https://www.youtube.com/watch?v=OmezStvJxkw'
  },
  {
    video_number: 6,
    video_id: '644nyfGhunw',
    title: 'Lec   06  Making of Indian Constitution  Indian Polity',
    duration_text: '87:27',
    length_seconds: 5247,
    chapter_slug: 'making-of-the-constitution',
    quality_score: 98,
    url: 'https://www.youtube.com/watch?v=644nyfGhunw'
  },
  {
    video_number: 7,
    video_id: 'cTlPZgu4T4w',
    title: 'Lec   07  The Preamble of the Constitution Part 1',
    duration_text: '79:57',
    length_seconds: 4797,
    chapter_slug: 'preamble-of-the-constitution',
    quality_score: 97,
    url: 'https://www.youtube.com/watch?v=cTlPZgu4T4w'
  },
  {
    video_number: 8,
    video_id: 'r4UrbUcddLs',
    title: 'Lec   08  The Preamble of the Constitution Part 2',
    duration_text: '84:24',
    length_seconds: 5064,
    chapter_slug: 'preamble-of-the-constitution',
    quality_score: 97,
    url: 'https://www.youtube.com/watch?v=r4UrbUcddLs'
  },
  {
    video_number: 9,
    video_id: 'PtISwP927sE',
    title: 'Lec   09  The Preamble of the Constitution Part 3',
    duration_text: '79:47',
    length_seconds: 4787,
    chapter_slug: 'preamble-of-the-constitution',
    quality_score: 98,
    url: 'https://www.youtube.com/watch?v=PtISwP927sE'
  },
  {
    video_number: 10,
    video_id: 'aKswWAz7cBs',
    title: 'Lec   10  The Preamble of the Constitution Part 4',
    duration_text: '77:29',
    length_seconds: 4649,
    chapter_slug: 'preamble-of-the-constitution',
    quality_score: 99,
    url: 'https://www.youtube.com/watch?v=aKswWAz7cBs'
  },
  {
    video_number: 11,
    video_id: 'E3ndPD4Vutc',
    title: 'Lec   11  Salient Features of Indian Constitution',
    duration_text: '67:39',
    length_seconds: 4059,
    chapter_slug: 'salient-features-and-sources',
    quality_score: 96,
    url: 'https://www.youtube.com/watch?v=E3ndPD4Vutc'
  },
  {
    video_number: 12,
    video_id: 'Z1OO709k8S0',
    title: 'Lec   12  Part I, Article 1 to 4  Union $ Its Territory',
    duration_text: '64:25',
    length_seconds: 3865,
    chapter_slug: 'union-and-its-territory',
    quality_score: 98,
    url: 'https://www.youtube.com/watch?v=Z1OO709k8S0'
  },
  {
    video_number: 13,
    video_id: '4SlNrFBzT0o',
    title: 'Lec-13  Part II, Article 5 to 11  Citizenship',
    duration_text: '47:42',
    length_seconds: 2862,
    chapter_slug: 'citizenship',
    quality_score: 97,
    url: 'https://www.youtube.com/watch?v=4SlNrFBzT0o'
  },
  {
    video_number: 14,
    video_id: 'h3zBsHfwZAY',
    title: 'L3: Citizenship Issues in India: A Historical Background of CAA 2019. Part 1. WBCS GUIDE',
    duration_text: '91:09',
    length_seconds: 5469,
    chapter_slug: 'citizenship',
    quality_score: 99,
    url: 'https://www.youtube.com/watch?v=h3zBsHfwZAY'
  },
  {
    video_number: 15,
    video_id: 'PV7Cpi6j7rQ',
    title: 'L4: Citizenship Issues in India. A Historical Background of CAA 2019. Part 2. WBCS GUIDE.',
    duration_text: '99:43',
    length_seconds: 5983,
    chapter_slug: 'citizenship',
    quality_score: 99,
    url: 'https://www.youtube.com/watch?v=PV7Cpi6j7rQ'
  },
  {
    video_number: 16,
    video_id: 'hP0iB_70JZ8',
    title: 'Lec   14  Part III, Article 12 to 35  Fundamental Rights',
    duration_text: '110:34',
    length_seconds: 6634,
    chapter_slug: 'fundamental-rights',
    quality_score: 100,
    url: 'https://www.youtube.com/watch?v=hP0iB_70JZ8'
  },
  {
    video_number: 17,
    video_id: 'ZxIFhUxa54o',
    title: 'Lec   15  Part IV, Article 36 to 51  Directive Principles of State Policies',
    duration_text: '76:50',
    length_seconds: 4610,
    chapter_slug: 'dpsp-and-fundamental-duties',
    quality_score: 98,
    url: 'https://www.youtube.com/watch?v=ZxIFhUxa54o'
  },
  {
    video_number: 18,
    video_id: 'eZbbmTeeoo0',
    title: 'Lec   16  Part V, Article 52 to 151  The Union Part 01',
    duration_text: '95:28',
    length_seconds: 5728,
    chapter_slug: 'the-president-of-india',
    quality_score: 99,
    url: 'https://www.youtube.com/watch?v=eZbbmTeeoo0'
  },
  {
    video_number: 19,
    video_id: 'g9F_pgZ93bQ',
    title: 'Lec   17  Part V, Article 52 to 151  The Union Part 02',
    duration_text: '112:49',
    length_seconds: 6769,
    chapter_slug: 'prime-minister-and-council-of-ministers',
    quality_score: 99,
    url: 'https://www.youtube.com/watch?v=g9F_pgZ93bQ'
  },
  {
    video_number: 20,
    video_id: '2O_rdRHtFa4',
    title: 'Lec   18  Part V, Article 52 to 151  The Union Part 03',
    duration_text: '79:15',
    length_seconds: 4755,
    chapter_slug: 'attorney-general-and-advocate-general',
    quality_score: 97,
    url: 'https://www.youtube.com/watch?v=2O_rdRHtFa4'
  },
  {
    video_number: 21,
    video_id: '84DyN6em6Dw',
    title: 'Lec   19  The Executive Part 1',
    duration_text: '96:28',
    length_seconds: 5788,
    chapter_slug: 'governor-and-state-executive',
    quality_score: 98,
    url: 'https://www.youtube.com/watch?v=84DyN6em6Dw'
  },
  {
    video_number: 22,
    video_id: 'RI_NLdF4wDs',
    title: 'Lec   20  The Executive Part 2',
    duration_text: '61:29',
    length_seconds: 3689,
    chapter_slug: 'governor-and-state-executive',
    quality_score: 97,
    url: 'https://www.youtube.com/watch?v=RI_NLdF4wDs'
  },
  {
    video_number: 23,
    video_id: '7JXZ866evcM',
    title: 'Lec   21  Indian Polity  Facts About Parliament Part 1',
    duration_text: '50:00',
    length_seconds: 3000,
    chapter_slug: 'the-parliament-of-india',
    quality_score: 97,
    url: 'https://www.youtube.com/watch?v=7JXZ866evcM'
  },
  {
    video_number: 24,
    video_id: 'DiRb3iNQBro',
    title: 'Lec   22  Indian Polity  Facts About Parliament Part 2',
    duration_text: '96:33',
    length_seconds: 5793,
    chapter_slug: 'the-parliament-of-india',
    quality_score: 99,
    url: 'https://www.youtube.com/watch?v=DiRb3iNQBro'
  },
  {
    video_number: 25,
    video_id: 'UZSeK0Cg1LE',
    title: 'Lec   23  Indian Polity  Indian Judiciary System Part 01',
    duration_text: '113:39',
    length_seconds: 6819,
    chapter_slug: 'supreme-court-of-india',
    quality_score: 100,
    url: 'https://www.youtube.com/watch?v=UZSeK0Cg1LE'
  },
  {
    video_number: 26,
    video_id: '4l4E-7KnAgg',
    title: 'Lec   24  Indian Polity  Indian Judiciary System Part 02',
    duration_text: '86:19',
    length_seconds: 5179,
    chapter_slug: 'supreme-court-of-india',
    quality_score: 99,
    url: 'https://www.youtube.com/watch?v=4l4E-7KnAgg'
  },
  {
    video_number: 27,
    video_id: 'YDX-ZQh2OV8',
    title: 'Lec   26  Indian Polity  Indian Judiciary System  Part 03',
    duration_text: '75:15',
    length_seconds: 4515,
    chapter_slug: 'high-courts-and-subordinate-judiciary',
    quality_score: 98,
    url: 'https://www.youtube.com/watch?v=YDX-ZQh2OV8'
  },
  {
    video_number: 28,
    video_id: 'JPQ9OpyW-yw',
    title: 'Lec   27  Indian Polity  Panchayat Raj System',
    duration_text: '90:22',
    length_seconds: 5422,
    chapter_slug: 'panchayati-raj-and-local-government',
    quality_score: 99,
    url: 'https://www.youtube.com/watch?v=JPQ9OpyW-yw'
  }
];

const insertVideo = db.prepare(`
  INSERT INTO polity_playlist_videos (
    id, video_number, video_id, title, duration_text, length_seconds, chapter_slug, processing_status, quality_score, url
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, 'PROCESSED', ?, ?
  )
  ON CONFLICT(video_id) DO UPDATE SET
    title = excluded.title,
    duration_text = excluded.duration_text,
    length_seconds = excluded.length_seconds,
    chapter_slug = excluded.chapter_slug,
    processing_status = 'PROCESSED',
    quality_score = excluded.quality_score
`);

let totalSeconds = 0;
for (const v of PLAYLIST_VIDEOS) {
  insertVideo.run(
    'vid_' + v.video_number,
    v.video_number,
    v.video_id,
    v.title,
    v.duration_text,
    v.length_seconds,
    v.chapter_slug,
    v.quality_score,
    v.url
  );
  totalSeconds += v.length_seconds;
}

const totalHours = (totalSeconds / 3600).toFixed(1);
console.log(`✅ Successfully seeded all 28 videos into database! (Total duration: ${totalHours} Hours)`);
