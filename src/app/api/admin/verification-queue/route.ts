import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'pending'; // 'pending' | 'flagged' | 'all'

    let where = '1=1';
    if (filter === 'pending') {
      where = "q.verification_status IN ('Unverified', 'AI Verified') OR q.lifecycle_status = 'Verification pending'";
    } else if (filter === 'flagged') {
      where = "q.verification_status = 'Flagged' OR q.report_count > 0";
    }

    const questions = db.prepare(`
      SELECT q.*,
        e.name as exam_name,
        s.name as subject_name,
        c.name as chapter_name,
        t.name as topic_name,
        p.exam_year as pyq_year,
        p.paper_name as pyq_paper,
        p.source_name as pyq_source,
        p.source_url as pyq_source_url,
        p.source_doc as pyq_source_doc
      FROM questions q
      LEFT JOIN exams e ON q.exam_id = e.id
      LEFT JOIN subjects s ON q.subject_id = s.id
      LEFT JOIN chapters c ON q.chapter_id = c.id
      LEFT JOIN topics t ON q.topic_id = t.id
      LEFT JOIN pyq_metadata p ON q.id = p.question_id
      WHERE ${where}
      ORDER BY q.created_at DESC
      LIMIT 50
    `).all();

    return NextResponse.json({ questions });
  } catch (error: any) {
    console.error('Error fetching verification queue:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { action, question_id, payload = {}, admin_name = 'Super Admin' } = body;

    if (!action || !question_id) {
      return NextResponse.json({ error: 'Action and question_id are required' }, { status: 400 });
    }

    const question: any = db.prepare('SELECT * FROM questions WHERE id = ?').get(question_id);
    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    if (action === 'approve') {
      db.prepare(`
        UPDATE questions
        SET verification_status = 'Verified',
            lifecycle_status = 'Approved',
            confidence_score = 98.0,
            last_verified_at = datetime('now')
        WHERE id = ?
      `).run(question_id);

      db.prepare(`
        INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
        VALUES (?, ?, 'Super Admin', 'APPROVE_QUESTION', 'questions', ?, 'Approved and verified question content and answer key.')
      `).run(`aud-${Date.now()}`, admin_name, question_id);
    } else if (action === 'reject') {
      db.prepare(`
        UPDATE questions
        SET verification_status = 'Flagged',
            lifecycle_status = 'Rejected'
        WHERE id = ?
      `).run(question_id);

      db.prepare(`
        INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
        VALUES (?, ?, 'Super Admin', 'REJECT_QUESTION', 'questions', ?, ?)
      `).run(`aud-${Date.now()}`, admin_name, question_id, payload.reason || 'Rejected by reviewer');
    } else if (action === 'change_answer') {
      const oldAns = question.correct_answer;
      const newAns = payload.correct_answer?.toUpperCase();

      db.prepare(`
        UPDATE questions
        SET correct_answer = ?,
            verification_status = 'Verified',
            lifecycle_status = 'Approved',
            last_verified_at = datetime('now')
        WHERE id = ?
      `).run(newAns, question_id);

      db.prepare(`
        INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details, old_value, new_value)
        VALUES (?, ?, 'Super Admin', 'CHANGE_ANSWER', 'questions', ?, 'Manually corrected answer key', ?, ?)
      `).run(`aud-${Date.now()}`, admin_name, question_id, oldAns, newAns);
    } else if (action === 'change_classification') {
      db.prepare(`
        UPDATE questions
        SET exam_id = COALESCE(?, exam_id),
            subject_id = COALESCE(?, subject_id),
            topic_id = COALESCE(?, topic_id),
            difficulty = COALESCE(?, difficulty)
        WHERE id = ?
      `).run(payload.exam_id || null, payload.subject_id || null, payload.topic_id || null, payload.difficulty || null, question_id);

      db.prepare(`
        INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
        VALUES (?, ?, 'Super Admin', 'CHANGE_CLASSIFICATION', 'questions', ?, 'Updated subject/exam classification')
      `).run(`aud-${Date.now()}`, admin_name, question_id);
    } else if (action === 'request_recheck') {
      db.prepare(`
        UPDATE questions
        SET verification_status = 'AI Verified',
            lifecycle_status = 'Verification pending'
        WHERE id = ?
      `).run(question_id);
    }

    return NextResponse.json({ success: true, action, question_id });
  } catch (error: any) {
    console.error('Error processing verification action:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
