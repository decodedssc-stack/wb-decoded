import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id') || 'usr-1';

    const weakAreas = db.prepare(`
      SELECT wa.*, s.name as subject_name, s.color as subject_color, t.name as topic_name, e.name as exam_name
      FROM weak_areas wa
      JOIN subjects s ON wa.subject_id = s.id
      JOIN topics t ON wa.topic_id = t.id
      LEFT JOIN exams e ON wa.exam_id = e.id
      WHERE wa.user_id = ?
      ORDER BY wa.accuracy_pct ASC, wa.total_attempted DESC
    `).all(userId);

    return NextResponse.json({ weakAreas });
  } catch (error: any) {
    console.error('Error fetching weak areas:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { user_id = 'usr-1', target_topic_ids = [] } = body;

    // Get user's weakest topics if none specified
    let topicIds = target_topic_ids;
    if (topicIds.length === 0) {
      const topWeak = db.prepare(`
        SELECT topic_id FROM weak_areas WHERE user_id = ? ORDER BY accuracy_pct ASC LIMIT 3
      `).all(user_id);
      topicIds = topWeak.map((w: any) => w.topic_id);
    }

    let questionsQuery = `
      SELECT q.id, q.subject_id, s.name as subject_name
      FROM questions q
      LEFT JOIN subjects s ON q.subject_id = s.id
      WHERE q.lifecycle_status IN ('Approved', 'Published')
    `;

    if (topicIds.length > 0) {
      const placeholders = topicIds.map(() => '?').join(',');
      questionsQuery += ` AND q.topic_id IN (${placeholders})`;
    }

    const candidateQuestions = db.prepare(questionsQuery).all(...(topicIds.length > 0 ? topicIds : []));
    
    // Fallback if not enough topic specific questions
    let finalQuestions = candidateQuestions;
    if (finalQuestions.length < 5) {
      finalQuestions = db.prepare(`
        SELECT q.id, q.subject_id, s.name as subject_name
        FROM questions q
        LEFT JOIN subjects s ON q.subject_id = s.id
        WHERE q.lifecycle_status IN ('Approved', 'Published')
        ORDER BY RANDOM() LIMIT 15
      `).all();
    }

    const mockId = `mock-weak-drill-${Date.now()}`;
    const slug = `weak-areas-drill-${Date.now().toString(36)}`;
    const count = Math.min(15, finalQuestions.length);
    const selected = finalQuestions.slice(0, count);

    db.transaction(() => {
      db.prepare(`
        INSERT INTO mock_tests (
          id, title, slug, exam_id, mock_type,
          duration_mins, total_marks, total_questions, marks_per_correct, negative_marking,
          pass_marks, difficulty, pyq_ratio, is_published, is_featured, is_premium
        ) VALUES (?, ?, ?, 'exam-wbcs', 'Weak-area', 20, ?, ?, 1.0, 0.33, ?, 'Mixed', 0.4, 1, 0, 0)
      `).run(
        mockId,
        `Personalized Weak Area Drill (${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })})`,
        slug,
        count,
        count,
        count * 0.6
      );

      const insertMQ = db.prepare(`
        INSERT INTO mock_questions (id, mock_id, question_id, order_index, section_name, marks, negative_marks)
        VALUES (?, ?, ?, ?, ?, 1.0, 0.33)
      `);

      selected.forEach((q: any, idx: number) => {
        insertMQ.run(`mq-${mockId}-${idx + 1}`, mockId, q.id, idx + 1, q.subject_name || 'Weak Area Focus');
      });
    })();

    return NextResponse.json({
      success: true,
      mockId,
      slug,
      questionCount: selected.length,
    });
  } catch (error: any) {
    console.error('Error generating weak area practice:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
