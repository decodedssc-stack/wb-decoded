import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    const items = db.prepare('SELECT * FROM current_affairs_items ORDER BY event_date DESC, created_at DESC').all();
    return NextResponse.json({ items });
  } catch (error: any) {
    console.error('Error fetching current affairs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { headline, category, event_date, summary, key_facts, source_name, source_url, generate_mcq = true } = body;

    if (!headline || !category) {
      return NextResponse.json({ error: 'Headline and Category are required.' }, { status: 400 });
    }

    const itemId = `ca-${Date.now()}`;
    let questionId: string | null = null;

    if (generate_mcq) {
      questionId = `q-ca-${Date.now()}`;
      db.prepare(`
        INSERT INTO questions (
          id, question_text, option_a, option_b, option_c, option_d,
          correct_answer, explanation, short_explanation, important_fact,
          exam_id, subject_id, question_type, difficulty, language, tags, is_pyq,
          quality_score, confidence_score, lifecycle_status, verification_status
        ) VALUES (
          ?, ?, 'West Bengal', 'Maharashtra', 'Karnataka', 'Tamil Nadu',
          'A', ?, ?, ?,
          'exam-wbcs', 'sub-ca', 'MCQ', 'Moderate', 'Bilingual', 'Current Affairs, WB Schemes, 2024', 0,
          95.0, 99.0, 'Approved', 'Verified'
        )
      `).run(
        questionId,
        `Regarding recent developments: ${headline}, which state/entity is directly associated with this milestone?`,
        summary || 'Official current affairs development.',
        headline,
        key_facts || 'Crucial fact for competitive exams in West Bengal.'
      );
    }

    db.prepare(`
      INSERT INTO current_affairs_items (
        id, headline, category, event_date, summary, key_facts, question_id, source_name, source_url, is_processed
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `).run(
      itemId,
      headline,
      category,
      event_date || new Date().toISOString().split('T')[0],
      summary || '',
      key_facts || '',
      questionId,
      source_name || 'Government Bureau',
      source_url || 'https://wb.gov.in'
    );

    return NextResponse.json({ success: true, itemId, questionId });
  } catch (error: any) {
    console.error('Error creating current affairs item:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
