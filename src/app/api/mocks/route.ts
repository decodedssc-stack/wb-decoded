import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);

    const examId = searchParams.get('exam_id');
    const mockType = searchParams.get('mock_type');
    const difficulty = searchParams.get('difficulty');
    const isPublished = searchParams.get('is_published');
    const limit = parseInt(searchParams.get('limit') || '50');

    const year = searchParams.get('year');

    let where = ['1=1'];
    let params: any[] = [];

    if (examId) {
      where.push('m.exam_id = ?');
      params.push(examId);
    }

    if (year) {
      where.push('(m.title LIKE ? OR m.id LIKE ?)');
      params.push(`%${year}%`, `%${year}%`);
    }

    if (mockType) {
      where.push('m.mock_type = ?');
      params.push(mockType);
    }

    if (difficulty) {
      where.push('m.difficulty = ?');
      params.push(difficulty);
    }

    if (isPublished !== null && isPublished !== undefined && isPublished !== '') {
      where.push('m.is_published = ?');
      params.push(isPublished === '1' || isPublished === 'true' ? 1 : 0);
    }

    const mocks = db.prepare(`
      SELECT m.*, COALESCE(e.name, 'Universal Chapter Mock') as exam_name, COALESCE(e.authority, 'West Bengal Curriculum') as authority,
        COALESCE(m.total_questions, 50) as question_count
      FROM mock_tests m
      LEFT JOIN exams e ON m.exam_id = e.id
      WHERE ${where.join(' AND ')}
      ORDER BY m.is_featured DESC, m.created_at DESC
      LIMIT ?
    `).all(...params, limit);

    return NextResponse.json({ mocks });
  } catch (error: any) {
    console.error('Error fetching mocks:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const {
      title,
      title_bn,
      exam_id,
      mock_type = 'Full Length',
      duration_mins = 120,
      total_marks = 200,
      marks_per_correct = 1.0,
      negative_marking = 0.33,
      pass_marks = 120.0,
      difficulty = 'Mixed',
      pyq_ratio = 0.3,
      is_published = 1,
      is_featured = 0,
      is_premium = 0,
      question_ids = []
    } = body;

    if (!title || !exam_id) {
      return NextResponse.json({ error: 'Title and Exam ID are required.' }, { status: 400 });
    }

    const mockId = `mock-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;
    const slug = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString(36)}`;

    db.transaction(() => {
      db.prepare(`
        INSERT INTO mock_tests (
          id, title, title_bn, slug, exam_id, mock_type,
          duration_mins, total_marks, total_questions, marks_per_correct, negative_marking,
          pass_marks, difficulty, pyq_ratio, is_published, is_featured, is_premium
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        mockId,
        title,
        title_bn || null,
        slug,
        exam_id,
        mock_type,
        duration_mins,
        total_marks,
        question_ids.length || 0,
        marks_per_correct,
        negative_marking,
        pass_marks,
        difficulty,
        pyq_ratio,
        is_published ? 1 : 0,
        is_featured ? 1 : 0,
        is_premium ? 1 : 0
      );

      const insertMQ = db.prepare(`
        INSERT INTO mock_questions (id, mock_id, question_id, order_index, section_name, marks, negative_marks)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      for (let i = 0; i < question_ids.length; i++) {
        insertMQ.run(`mq-${mockId}-${i + 1}`, mockId, question_ids[i], i + 1, 'General Section', marks_per_correct, negative_marking);
      }
    })();

    return NextResponse.json({ success: true, mockId, slug });
  } catch (error: any) {
    console.error('Error creating mock:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
