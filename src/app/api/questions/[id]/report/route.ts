import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const questionId = params.id;
    const body = await request.json();
    const { user_id, reason, comment } = body;

    if (!reason) {
      return NextResponse.json({ error: 'Reason is required' }, { status: 400 });
    }

    const reportId = `rep-${Date.now()}`;
    db.prepare(`
      INSERT INTO question_reports (id, question_id, user_id, reason, comment, status)
      VALUES (?, ?, ?, ?, ?, 'Pending')
    `).run(reportId, questionId, user_id || 'usr-1', reason, comment || '');

    // Increment question report_count
    db.prepare('UPDATE questions SET report_count = report_count + 1 WHERE id = ?').run(questionId);

    return NextResponse.json({ success: true, message: 'Question report submitted to review team.' });
  } catch (error: any) {
    console.error('Error reporting question:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
