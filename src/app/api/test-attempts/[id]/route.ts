import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const attemptId = params.id;

    const attempt: any = db.prepare(`
      SELECT a.*, m.title as mock_title, m.duration_mins, m.total_marks as max_marks, m.total_questions, e.name as exam_name, e.slug as exam_slug
      FROM test_attempts a
      JOIN mock_tests m ON a.mock_id = m.id
      LEFT JOIN exams e ON a.exam_id = e.id
      WHERE a.id = ?
    `).get(attemptId);

    if (!attempt) {
      return NextResponse.json({ error: 'Attempt record not found' }, { status: 404 });
    }

    const answers = db.prepare(`
      SELECT ans.*,
        q.question_text, q.question_text_bn,
        q.option_a, q.option_b, q.option_c, q.option_d,
        q.option_a_bn, q.option_b_bn, q.option_c_bn, q.option_d_bn,
        q.explanation, q.explanation_bn, q.short_explanation, q.important_fact, q.exam_tip,
        q.difficulty, q.is_pyq,
        s.name as subject_name,
        t.name as topic_name,
        p.exam_year as pyq_year,
        p.paper_name as pyq_paper
      FROM attempt_answers ans
      JOIN questions q ON ans.question_id = q.id
      LEFT JOIN subjects s ON q.subject_id = s.id
      LEFT JOIN topics t ON q.topic_id = t.id
      LEFT JOIN pyq_metadata p ON q.id = p.question_id
      WHERE ans.attempt_id = ?
      ORDER BY ans.id ASC
    `).all(attemptId);

    // Identify weak areas generated from this attempt
    const weakAreas = db.prepare(`
      SELECT wa.*, s.name as subject_name, t.name as topic_name
      FROM weak_areas wa
      JOIN subjects s ON wa.subject_id = s.id
      JOIN topics t ON wa.topic_id = t.id
      WHERE wa.user_id = ? AND wa.accuracy_pct < 60.0
      ORDER BY wa.accuracy_pct ASC
      LIMIT 4
    `).all(attempt.user_id);

    return NextResponse.json({
      attempt: {
        ...attempt,
        subjectBreakdown: attempt.subject_breakdown_json ? JSON.parse(attempt.subject_breakdown_json) : [],
        answers,
        weakAreas,
      }
    });
  } catch (error: any) {
    console.error('Error fetching attempt result:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
