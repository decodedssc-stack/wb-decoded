import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('wb_session');
    let userId = 'anonymous';

    if (sessionCookie) {
      try {
        const session = JSON.parse(sessionCookie.value);
        userId = session.id || session.userId || 'anonymous';
      } catch (e) {}
    }

    const progress = db.prepare(`
      SELECT chapter_slug, is_completed, mcq_score, total_mcqs, last_studied_at
      FROM polity_user_progress
      WHERE user_id = ?
    `).all(userId);

    return NextResponse.json({
      success: true,
      userId,
      progress
    });
  } catch (error: any) {
    console.error('Error fetching polity progress:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { chapter_slug, is_completed, mcq_score, total_mcqs } = body;

    if (!chapter_slug) {
      return NextResponse.json({ success: false, error: 'chapter_slug is required' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('wb_session');
    let userId = 'anonymous';

    if (sessionCookie) {
      try {
        const session = JSON.parse(sessionCookie.value);
        userId = session.id || session.userId || 'anonymous';
      } catch (e) {}
    }

    const id = `prog_${userId}_${chapter_slug}`;

    db.prepare(`
      INSERT INTO polity_user_progress (id, user_id, chapter_slug, is_completed, mcq_score, total_mcqs, last_studied_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(user_id, chapter_slug) DO UPDATE SET
        is_completed = CASE WHEN excluded.is_completed = 1 THEN 1 ELSE is_completed END,
        mcq_score = MAX(mcq_score, excluded.mcq_score),
        total_mcqs = excluded.total_mcqs,
        last_studied_at = CURRENT_TIMESTAMP
    `).run(id, userId, chapter_slug, is_completed ? 1 : 0, mcq_score || 0, total_mcqs || 0);

    return NextResponse.json({ success: true, message: 'Progress recorded successfully' });
  } catch (error: any) {
    console.error('Error updating polity progress:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
