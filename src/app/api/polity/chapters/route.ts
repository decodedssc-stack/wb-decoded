import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const chapters = db.prepare(`
      SELECT 
        id, slug, chapter_number, title, subtitle, part_reference, articles_range, 
        reading_time_mins, concepts_count, mcqs_count, quality_score, cover_image, is_published, created_at
      FROM polity_chapters 
      WHERE is_published = 1 
      ORDER BY chapter_number ASC
    `).all();

    return NextResponse.json({
      success: true,
      total_chapters: chapters.length,
      total_concepts: chapters.reduce((acc: number, c: any) => acc + (c.concepts_count || 0), 0),
      total_mcqs: chapters.reduce((acc: number, c: any) => acc + (c.mcqs_count || 0), 0),
      chapters
    });
  } catch (error: any) {
    console.error('Error fetching polity chapters:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
