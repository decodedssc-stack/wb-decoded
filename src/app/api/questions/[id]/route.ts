import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const qId = params.id;

    const question = db.prepare(`
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
      WHERE q.id = ?
    `).get(qId);

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    return NextResponse.json({ question });
  } catch (error: any) {
    console.error('Error fetching question:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const qId = params.id;
    const body = await request.json();

    const allowedFields = [
      'question_text', 'question_text_bn',
      'option_a', 'option_b', 'option_c', 'option_d',
      'option_a_bn', 'option_b_bn', 'option_c_bn', 'option_d_bn',
      'correct_answer', 'explanation', 'explanation_bn',
      'short_explanation', 'important_fact', 'exam_tip',
      'exam_id', 'subject_id', 'chapter_id', 'topic_id',
      'difficulty', 'lifecycle_status', 'verification_status',
      'quality_score', 'confidence_score'
    ];

    const updates: string[] = [];
    const values: any[] = [];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(body[field]);
      }
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No valid update fields provided' }, { status: 400 });
    }

    values.push(qId);
    db.prepare(`UPDATE questions SET ${updates.join(', ')} WHERE id = ?`).run(...values);

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(`aud-${Date.now()}`, 'Super Admin', 'Super Admin', 'UPDATE_QUESTION', 'questions', qId, `Updated question ${qId}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating question:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const qId = params.id;

    db.prepare('DELETE FROM questions WHERE id = ?').run(qId);

    db.prepare(`
      INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(`aud-${Date.now()}`, 'Super Admin', 'Super Admin', 'DELETE_QUESTION', 'questions', qId, `Deleted question ${qId}`);

    return NextResponse.json({ success: true, message: 'Question deleted' });
  } catch (error: any) {
    console.error('Error deleting question:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
