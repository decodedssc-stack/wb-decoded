import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const mockId = params.id;

    // Find mock by ID or Slug
    const mock: any = db.prepare(`
      SELECT m.*, COALESCE(e.name, 'Universal Mock') as exam_name, COALESCE(e.authority, 'West Bengal') as authority, e.slug as exam_slug
      FROM mock_tests m
      LEFT JOIN exams e ON m.exam_id = e.id
      WHERE m.id = ? OR m.slug = ?
    `).get(mockId, mockId);

    if (!mock) {
      return NextResponse.json({ error: 'Mock test not found' }, { status: 404 });
    }

    // Fetch associated questions in order
    const questions = db.prepare(`
      SELECT q.*, 
        mq.order_index, 
        mq.section_name, 
        mq.marks as question_marks, 
        mq.negative_marks as question_negative_marks,
        s.name as subject_name,
        s.color as subject_color,
        c.name as chapter_name,
        t.name as topic_name,
        p.exam_year as pyq_year,
        p.paper_name as pyq_paper,
        p.source_name as pyq_source
      FROM mock_questions mq
      JOIN questions q ON mq.question_id = q.id
      LEFT JOIN subjects s ON q.subject_id = s.id
      LEFT JOIN chapters c ON q.chapter_id = c.id
      LEFT JOIN topics t ON q.topic_id = t.id
      LEFT JOIN pyq_metadata p ON q.id = p.question_id
      WHERE mq.mock_id = ?
      ORDER BY mq.order_index ASC
    `).all(mock.id);

    return NextResponse.json({
      mock: {
        ...mock,
        questions
      }
    });
  } catch (error: any) {
    console.error('Error fetching mock details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const mockId = params.id;
    const body = await request.json();

    const existing: any = db.prepare('SELECT * FROM mock_tests WHERE id = ?').get(mockId);
    if (!existing) {
      return NextResponse.json({ error: 'Mock test not found' }, { status: 404 });
    }

    const {
      title = existing.title,
      title_bn = existing.title_bn,
      exam_id = existing.exam_id,
      mock_type = existing.mock_type,
      duration_mins = existing.duration_mins,
      total_marks = existing.total_marks,
      marks_per_correct = existing.marks_per_correct,
      negative_marking = existing.negative_marking,
      pass_marks = existing.pass_marks,
      difficulty = existing.difficulty,
      is_published = existing.is_published,
      is_featured = existing.is_featured,
      is_premium = existing.is_premium,
      question_ids
    } = body;

    db.transaction(() => {
      const qCount = Array.isArray(question_ids) ? question_ids.length : existing.total_questions;

      db.prepare(`
        UPDATE mock_tests
        SET title = ?,
            title_bn = ?,
            exam_id = ?,
            mock_type = ?,
            duration_mins = ?,
            total_marks = ?,
            total_questions = ?,
            marks_per_correct = ?,
            negative_marking = ?,
            pass_marks = ?,
            difficulty = ?,
            is_published = ?,
            is_featured = ?,
            is_premium = ?
        WHERE id = ?
      `).run(
        title,
        title_bn || null,
        exam_id,
        mock_type,
        duration_mins,
        total_marks,
        qCount,
        marks_per_correct,
        negative_marking,
        pass_marks,
        difficulty,
        is_published ? 1 : 0,
        is_featured ? 1 : 0,
        is_premium ? 1 : 0,
        mockId
      );

      // If question_ids array was provided, update mock_questions mapping
      if (Array.isArray(question_ids)) {
        db.prepare('DELETE FROM mock_questions WHERE mock_id = ?').run(mockId);

        const insertMQ = db.prepare(`
          INSERT INTO mock_questions (id, mock_id, question_id, order_index, section_name, marks, negative_marks)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        for (let i = 0; i < question_ids.length; i++) {
          const qId = typeof question_ids[i] === 'string' ? question_ids[i] : question_ids[i].id;
          const secName = typeof question_ids[i] === 'object' && question_ids[i].section_name ? question_ids[i].section_name : 'General Section';
          insertMQ.run(
            `mq-${mockId}-${i + 1}`,
            mockId,
            qId,
            i + 1,
            secName,
            marks_per_correct,
            negative_marking
          );
        }
      }

      // Audit log
      db.prepare(`
        INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
        VALUES (?, 'Super Admin', 'Super Admin', 'MOCK_TEST_UPDATE', 'mock_tests', ?, ?)
      `).run(`aud-${Date.now()}`, mockId, `Updated mock test: ${title} (${mockId})`);
    })();

    return NextResponse.json({ success: true, message: 'Mock test updated successfully.' });
  } catch (error: any) {
    console.error('Error updating mock test:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const mockId = params.id;

    const existing: any = db.prepare('SELECT title FROM mock_tests WHERE id = ?').get(mockId);
    if (!existing) {
      return NextResponse.json({ error: 'Mock test not found' }, { status: 404 });
    }

    db.transaction(() => {
      // 1. Delete mappings
      db.prepare('DELETE FROM mock_questions WHERE mock_id = ?').run(mockId);

      // 2. Delete test attempts linked to this mock
      const attempts: any[] = db.prepare('SELECT id FROM test_attempts WHERE mock_id = ?').all(mockId);
      for (const att of attempts) {
        db.prepare('DELETE FROM attempt_answers WHERE attempt_id = ?').run(att.id);
      }
      db.prepare('DELETE FROM test_attempts WHERE mock_id = ?').run(mockId);

      // 3. Delete mock test
      db.prepare('DELETE FROM mock_tests WHERE id = ?').run(mockId);

      // Audit log
      db.prepare(`
        INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
        VALUES (?, 'Super Admin', 'Super Admin', 'MOCK_TEST_DELETE', 'mock_tests', ?, ?)
      `).run(`aud-${Date.now()}`, mockId, `Deleted mock test: ${existing.title} (${mockId})`);
    })();

    return NextResponse.json({ success: true, message: 'Mock test and associated mappings deleted successfully.' });
  } catch (error: any) {
    console.error('Error deleting mock test:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
