import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id') || 'usr-1';
    const status = searchParams.get('status'); // 'Need Revision' | 'Understood'

    let where = 'mb.user_id = ?';
    const params: any[] = [userId];

    if (status) {
      where += ' AND mb.status = ?';
      params.push(status);
    }

    const mistakes = db.prepare(`
      SELECT mb.*,
        q.question_text, q.question_text_bn,
        q.option_a, q.option_b, q.option_c, q.option_d,
        q.option_a_bn, q.option_b_bn, q.option_c_bn, q.option_d_bn,
        q.correct_answer, q.explanation, q.short_explanation, q.important_fact, q.exam_tip,
        q.difficulty, q.is_pyq,
        s.name as subject_name,
        t.name as topic_name,
        p.exam_year as pyq_year
      FROM mistake_book mb
      JOIN questions q ON mb.question_id = q.id
      LEFT JOIN subjects s ON q.subject_id = s.id
      LEFT JOIN topics t ON q.topic_id = t.id
      LEFT JOIN pyq_metadata p ON q.id = p.question_id
      WHERE ${where}
      ORDER BY mb.last_reviewed_at DESC, mb.created_at DESC
    `).all(...params);

    return NextResponse.json({ mistakes });
  } catch (error: any) {
    console.error('Error fetching mistake book:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { id, status, mistake_type, notes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Mistake item ID is required' }, { status: 400 });
    }

    const updates: string[] = ['last_reviewed_at = datetime("now")', 'review_count = review_count + 1'];
    const values: any[] = [];

    if (status) {
      updates.push('status = ?');
      values.push(status);
    }
    if (mistake_type) {
      updates.push('mistake_type = ?');
      values.push(mistake_type);
    }
    if (notes !== undefined) {
      updates.push('notes = ?');
      values.push(notes);
    }

    values.push(id);
    db.prepare(`UPDATE mistake_book SET ${updates.join(', ')} WHERE id = ?`).run(...values);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating mistake item:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { user_id = 'usr-1', stage = 'all' } = body;

    let whereSql = `mb.user_id = ? AND mb.status = 'Need Revision'`;
    if (stage === 'stage1') {
      whereSql += ` AND (mb.review_count = 0 OR mb.review_count IS NULL)`;
    } else if (stage === 'stage2') {
      whereSql += ` AND mb.review_count >= 1`;
    }

    // Fetch all unsolved mistakes needing revision based on stage
    const unrevisedMistakes = db.prepare(`
      SELECT mb.question_id, s.name as subject_name
      FROM mistake_book mb
      JOIN questions q ON mb.question_id = q.id
      LEFT JOIN subjects s ON q.subject_id = s.id
      WHERE ${whereSql}
      LIMIT 25
    `).all(user_id);

    if (unrevisedMistakes.length === 0) {
      return NextResponse.json({ error: 'No unrevised mistakes found in your Mistake Book! Great job!' }, { status: 400 });
    }

    const mockId = `mock-mistake-rev-${Date.now()}`;
    const slug = `mistake-revision-test-${Date.now().toString(36)}`;
    const count = unrevisedMistakes.length;

    db.transaction(() => {
      db.prepare(`
        INSERT INTO mock_tests (
          id, title, slug, exam_id, mock_type,
          duration_mins, total_marks, total_questions, marks_per_correct, negative_marking,
          pass_marks, difficulty, pyq_ratio, is_published, is_featured, is_premium
        ) VALUES (?, ?, ?, 'exam-wbcs', 'Revision', ?, ?, ?, 1.0, 0.33, ?, 'Mixed', 0.5, 1, 0, 0)
      `).run(
        mockId,
        `Mistake Book Revision Test (${count} Questions)`,
        slug,
        Math.max(10, count * 1.2),
        count,
        count,
        count * 0.7
      );

      const insertMQ = db.prepare(`
        INSERT INTO mock_questions (id, mock_id, question_id, order_index, section_name, marks, negative_marks)
        VALUES (?, ?, ?, ?, ?, 1.0, 0.33)
      `);

      unrevisedMistakes.forEach((m: any, idx: number) => {
        insertMQ.run(`mq-${mockId}-${idx + 1}`, mockId, m.question_id, idx + 1, m.subject_name || 'Mistake Drill');
      });
    })();

    return NextResponse.json({
      success: true,
      mockId,
      slug,
      questionCount: count,
    });
  } catch (error: any) {
    console.error('Error generating mistake revision test:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
