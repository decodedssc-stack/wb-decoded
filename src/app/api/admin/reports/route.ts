import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    const reports = db.prepare(`
      SELECT r.*, 
        q.question_text, q.question_text_bn, q.option_a, q.option_b, q.option_c, q.option_d,
        q.correct_answer, q.explanation, q.exam_id, q.difficulty,
        u.name as user_name, u.email as user_email
      FROM question_reports r
      JOIN questions q ON r.question_id = q.id
      LEFT JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
    `).all();

    return NextResponse.json({ reports });
  } catch (error: any) {
    console.error('Error fetching question reports:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { report_id, status = 'Resolved', admin_notes = '', corrected_answer } = body;

    if (!report_id) {
      return NextResponse.json({ error: 'report_id is required' }, { status: 400 });
    }

    const report: any = db.prepare('SELECT * FROM question_reports WHERE id = ?').get(report_id);
    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    db.transaction(() => {
      db.prepare(`
        UPDATE question_reports
        SET status = ?,
            admin_notes = ?,
            resolved_by = 'Super Admin',
            resolved_at = datetime('now')
        WHERE id = ?
      `).run(status, admin_notes, report_id);

      if (corrected_answer) {
        db.prepare('UPDATE questions SET correct_answer = ?, verification_status = "Verified" WHERE id = ?')
          .run(corrected_answer.toUpperCase(), report.question_id);
      }

      db.prepare(`
        INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
        VALUES (?, 'Super Admin', 'Super Admin', 'RESOLVE_REPORT', 'question_reports', ?, ?)
      `).run(`aud-${Date.now()}`, report_id, `Resolved report on question ${report.question_id}: ${admin_notes}`);
    })();

    return NextResponse.json({ success: true, message: 'Report resolved successfully.' });
  } catch (error: any) {
    console.error('Error updating report status:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
