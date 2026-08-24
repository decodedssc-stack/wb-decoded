import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const db = getDb();

    const chapter = db.prepare(`
      SELECT * FROM polity_chapters WHERE slug = ?
    `).get(slug) as any;

    if (!chapter) {
      return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 });
    }

    // Parse source videos
    const videoIds = JSON.parse(chapter.source_videos || '[]');
    let sourceVideos: any[] = [];
    if (videoIds.length > 0) {
      const placeholders = videoIds.map(() => '?').join(',');
      sourceVideos = db.prepare(`
        SELECT * FROM polity_playlist_videos WHERE video_id IN (${placeholders}) ORDER BY video_number ASC
      `).all(...videoIds);
    }

    // Fetch MCQs for this chapter
    const mcqs = db.prepare(`
      SELECT * FROM polity_mcqs WHERE chapter_slug = ? ORDER BY id ASC
    `).all(slug);

    // Fetch related articles
    const relatedArticles = db.prepare(`
      SELECT * FROM polity_articles WHERE related_chapter_slug = ? ORDER BY id ASC
    `).all(slug);

    // Fetch previous and next chapter slugs
    const prevChapter = db.prepare(`
      SELECT slug, title, chapter_number FROM polity_chapters WHERE chapter_number = ?
    `).get(chapter.chapter_number - 1) as any;

    const nextChapter = db.prepare(`
      SELECT slug, title, chapter_number FROM polity_chapters WHERE chapter_number = ?
    `).get(chapter.chapter_number + 1) as any;

    return NextResponse.json({
      success: true,
      chapter: {
        ...chapter,
        source_videos: videoIds,
        source_video_details: sourceVideos,
        mcqs,
        related_articles: relatedArticles,
        prev_chapter: prevChapter || null,
        next_chapter: nextChapter || null
      }
    });
  } catch (error: any) {
    console.error('Error fetching polity chapter:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
