import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const examId = params.id;

    // Find exam by id or slug
    const exam: any = db.prepare(`
      SELECT e.*, c.name as category_name, c.slug as category_slug
      FROM exams e
      JOIN exam_categories c ON e.category_id = c.id
      WHERE e.id = ? OR e.slug = ?
    `).get(examId, examId);

    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }

    // Fetch active exam pattern
    const pattern = db.prepare(`
      SELECT * FROM exam_patterns WHERE exam_id = ? AND is_active = 1 LIMIT 1
    `).get(exam.id);

    // Fetch stages, papers, and subjects
    const stages = db.prepare(`
      SELECT s.*,
        (SELECT json_group_array(
          json_object(
            'id', p.id,
            'name', p.name,
            'code', p.code,
            'subjects', (
              SELECT json_group_array(
                json_object(
                  'id', sub.id,
                  'name', sub.name,
                  'code', sub.code,
                  'icon', sub.icon,
                  'color', sub.color,
                  'questions_count', (SELECT COUNT(*) FROM questions q WHERE q.subject_id = sub.id)
                )
              )
              FROM subjects sub WHERE sub.paper_id = p.id
            )
          )
        )
        FROM papers p WHERE p.stage_id = s.id
        ) as papers_json
      FROM stages s
      WHERE s.exam_id = ?
      ORDER BY s.order_index ASC
    `).all(exam.id);

    // Fetch available full-length mock tests for this exam
    const mocks = db.prepare(`
      SELECT m.*, 
        (SELECT COUNT(*) FROM mock_questions mq WHERE mq.mock_id = m.id) as question_count
      FROM mock_tests m
      WHERE m.exam_id = ? AND m.mock_type = 'Full-Length' AND m.is_published = 1
      ORDER BY m.id ASC
    `).all(exam.id);

    // Fetch available PYQ papers grouped by year
    const pyqYears = db.prepare(`
      SELECT p.exam_year, COUNT(p.id) as question_count, p.paper_name, p.source_name
      FROM pyq_metadata p
      WHERE p.exam_id = ?
      GROUP BY p.exam_year, p.paper_name
      ORDER BY p.exam_year DESC
    `).all(exam.id);

    // Fetch available 20-Year Official PYQ Mock Tests
    const pyqMocks = db.prepare(`
      SELECT m.*, 
        (SELECT COUNT(*) FROM mock_questions mq WHERE mq.mock_id = m.id) as question_count
      FROM mock_tests m
      WHERE m.exam_id = ? AND m.mock_type = 'Previous-Year' AND m.is_published = 1
      ORDER BY m.id DESC
    `).all(exam.id);

    return NextResponse.json({
      exam,
      pattern,
      stages: stages.map((s: any) => ({
        ...s,
        papers: s.papers_json ? JSON.parse(s.papers_json) : []
      })),
      mocks,
      pyqMocks,
      pyqYears,
    });
  } catch (error: any) {
    console.error('Error fetching exam details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const examId = params.id;
    const body = await request.json();

    const allowedFields = ['name', 'authority', 'description', 'syllabus', 'official_website', 'notification_url', 'icon', 'color_theme', 'is_active'];
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

    values.push(examId);
    db.prepare(`UPDATE exams SET ${updates.join(', ')} WHERE id = ?`).run(...values);

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(`aud-${Date.now()}`, 'Super Admin', 'Super Admin', 'UPDATE_EXAM', 'exams', examId, `Updated fields: ${updates.join(', ')}`);

    return NextResponse.json({ success: true, message: 'Exam updated successfully' });
  } catch (error: any) {
    console.error('Error updating exam:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
