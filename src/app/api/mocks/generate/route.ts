import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();

    const {
      exam_id,
      mock_type = 'Full Length',
      title_prefix = 'WBCS Master Mock',
      total_questions = 20,
      duration_mins = 120,
      difficulty = 'Mixed',
      pyq_ratio = 0.5,
      year_start = 2016,
      year_end = 2026,
      subject_distribution = [],
      bulk_count = 1,
      duplicate_policy = 'no_repeat',
      auto_publish = false,
    } = body;

    if (!exam_id) {
      return NextResponse.json({ error: 'Exam ID is required.' }, { status: 400 });
    }

    const exam: any = db.prepare('SELECT * FROM exams WHERE id = ?').get(exam_id);
    if (!exam) {
      return NextResponse.json({ error: 'Selected exam does not exist.' }, { status: 404 });
    }

    // Pattern defaults
    const pattern: any = db.prepare('SELECT * FROM exam_patterns WHERE exam_id = ? AND is_active = 1 LIMIT 1').get(exam_id);
    const marksPerCorrect = pattern?.marks_per_correct || 1.0;
    const negativeMarking = pattern?.negative_marking || 0.33;

    // Fetch candidate questions matching criteria
    let candidateQuery = `
      SELECT q.id, q.subject_id, q.topic_id, q.difficulty, q.is_pyq, s.name as subject_name
      FROM questions q
      LEFT JOIN subjects s ON q.subject_id = s.id
      LEFT JOIN pyq_metadata p ON q.id = p.question_id
      WHERE (q.exam_id = ? OR q.exam_id IS NULL)
        AND q.lifecycle_status IN ('Approved', 'Published')
    `;
    const params: any[] = [exam_id];

    if (pyq_ratio >= 0.99) {
      candidateQuery += ' AND q.is_pyq = 1';
    }

    const candidateQuestions: any[] = db.prepare(candidateQuery).all(...params);

    if (candidateQuestions.length === 0) {
      return NextResponse.json({ error: 'No approved questions available for this exam configuration.' }, { status: 400 });
    }

    const generatedMocks: any[] = [];
    const usedQuestionIds = new Set<string>();

    for (let m = 0; m < bulk_count; m++) {
      const mockNumber = m + 1;
      const formattedMockNum = mockNumber < 10 ? `0${mockNumber}` : `${mockNumber}`;
      const mockTitle = bulk_count > 1 
        ? `${title_prefix} ${formattedMockNum}` 
        : `${title_prefix} ${formattedMockNum}`;
      const mockSlug = `${mockTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString(36)}-${m}`;
      const mockId = `mock-gen-${Date.now()}-${m}`;

      // Pick questions based on target count and diversity
      let shuffled: any[] = [...candidateQuestions].sort(() => 0.5 - Math.random());
      
      // If duplicate_policy is no_repeat, prioritize questions not yet used across this batch
      if (duplicate_policy === 'no_repeat') {
        const unused = shuffled.filter((q: any) => !usedQuestionIds.has(q.id));
        if (unused.length >= total_questions) {
          shuffled = unused;
        }
      }

      const selectedQuestions: any[] = shuffled.slice(0, Math.min(total_questions, shuffled.length));
      selectedQuestions.forEach((q: any) => usedQuestionIds.add(q.id));

      const totalMarks = selectedQuestions.length * marksPerCorrect;

      // Persist generated mock
      db.transaction(() => {
        db.prepare(`
          INSERT INTO mock_tests (
            id, title, slug, exam_id, mock_type,
            duration_mins, total_marks, total_questions, marks_per_correct, negative_marking,
            pass_marks, difficulty, pyq_ratio, is_published, is_featured, is_premium
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          mockId,
          mockTitle,
          mockSlug,
          exam_id,
          mock_type,
          duration_mins,
          totalMarks,
          selectedQuestions.length,
          marksPerCorrect,
          negativeMarking,
          totalMarks * 0.6,
          difficulty,
          pyq_ratio,
          auto_publish ? 1 : 0,
          0,
          0
        );

        const insertMQ = db.prepare(`
          INSERT INTO mock_questions (id, mock_id, question_id, order_index, section_name, marks, negative_marks)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        selectedQuestions.forEach((q, idx) => {
          insertMQ.run(
            `mq-${mockId}-${idx + 1}`,
            mockId,
            q.id,
            idx + 1,
            q.subject_name || 'General Section',
            marksPerCorrect,
            negativeMarking
          );
        });
      })();

      generatedMocks.push({
        id: mockId,
        title: mockTitle,
        slug: mockSlug,
        questions_count: selectedQuestions.length,
        duration_mins,
        total_marks: totalMarks,
        is_published: auto_publish ? 1 : 0
      });
    }

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      `aud-${Date.now()}`,
      'Super Admin',
      'Super Admin',
      'GENERATE_MOCKS',
      'mock_tests',
      `${bulk_count} mocks`,
      `Generated ${bulk_count} mocks for ${exam.name} with ${total_questions} questions each`
    );

    return NextResponse.json({
      success: true,
      count: generatedMocks.length,
      mocks: generatedMocks
    });
  } catch (error: any) {
    console.error('Error generating mock:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
