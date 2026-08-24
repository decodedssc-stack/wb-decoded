import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const examId = searchParams.get('exam_id');

    if (!examId) {
      const patterns = db.prepare(`
        SELECT p.*, e.name as exam_name
        FROM exam_patterns p
        JOIN exams e ON p.exam_id = e.id
        ORDER BY p.year_effective DESC
      `).all();
      return NextResponse.json({ patterns });
    }

    const pattern = db.prepare(`
      SELECT p.*, e.name as exam_name
      FROM exam_patterns p
      JOIN exams e ON p.exam_id = e.id
      WHERE p.exam_id = ?
      ORDER BY p.year_effective DESC
      LIMIT 1
    `).get(examId);

    return NextResponse.json({ pattern });
  } catch (error: any) {
    console.error('Error fetching pattern:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const {
      id,
      exam_id,
      stage_id,
      paper_id,
      year_effective = 2024,
      total_questions = 100,
      total_marks = 100,
      duration_mins = 90,
      marks_per_correct = 1.0,
      negative_marking = 0.33,
      passing_marks = 40.0,
      section_timing_enabled = 0,
      pyq_allowed = 1,
      current_affairs_allowed = 1,
      subject_distribution,
      difficulty_distribution,
      duplicate_policy = 'no_repeat',
    } = body;

    if (!exam_id) {
      return NextResponse.json({ error: 'Exam ID is required.' }, { status: 400 });
    }

    const patternId = id || `pattern-${exam_id}-${year_effective}-${Date.now()}`;
    const subjDistJson = typeof subject_distribution === 'string' ? subject_distribution : JSON.stringify(subject_distribution || []);
    const diffDistJson = typeof difficulty_distribution === 'string' ? difficulty_distribution : JSON.stringify(difficulty_distribution || { Easy: 30, Moderate: 50, Hard: 20 });

    const upsert = db.prepare(`
      INSERT INTO exam_patterns (
        id, exam_id, stage_id, paper_id, year_effective,
        total_questions, total_marks, duration_mins, marks_per_correct, negative_marking,
        passing_marks, section_timing_enabled, pyq_allowed, current_affairs_allowed,
        subject_distribution_json, difficulty_distribution_json, duplicate_policy, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
      ON CONFLICT(id) DO UPDATE SET
        total_questions=excluded.total_questions,
        total_marks=excluded.total_marks,
        duration_mins=excluded.duration_mins,
        marks_per_correct=excluded.marks_per_correct,
        negative_marking=excluded.negative_marking,
        passing_marks=excluded.passing_marks,
        section_timing_enabled=excluded.section_timing_enabled,
        pyq_allowed=excluded.pyq_allowed,
        current_affairs_allowed=excluded.current_affairs_allowed,
        subject_distribution_json=excluded.subject_distribution_json,
        difficulty_distribution_json=excluded.difficulty_distribution_json,
        duplicate_policy=excluded.duplicate_policy
    `);

    upsert.run(
      patternId,
      exam_id,
      stage_id || null,
      paper_id || null,
      year_effective,
      total_questions,
      total_marks,
      duration_mins,
      marks_per_correct,
      negative_marking,
      passing_marks,
      section_timing_enabled ? 1 : 0,
      pyq_allowed ? 1 : 0,
      current_affairs_allowed ? 1 : 0,
      subjDistJson,
      diffDistJson,
      duplicate_policy
    );

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(`aud-${Date.now()}`, 'Super Admin', 'Super Admin', 'SAVE_PATTERN', 'exam_patterns', patternId, `Saved exam pattern for ${exam_id}`);

    return NextResponse.json({ success: true, patternId });
  } catch (error: any) {
    console.error('Error saving pattern:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
