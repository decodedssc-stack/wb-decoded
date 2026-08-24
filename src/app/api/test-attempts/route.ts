import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function GET(request: Request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id') || 'usr-1';

    const attempts = db.prepare(`
      SELECT a.*, m.title as mock_title, m.mock_type, m.total_questions, e.name as exam_name
      FROM test_attempts a
      JOIN mock_tests m ON a.mock_id = m.id
      LEFT JOIN exams e ON a.exam_id = e.id
      WHERE a.user_id = ?
      ORDER BY a.started_at DESC
    `).all(userId);

    return NextResponse.json({ attempts });
  } catch (error: any) {
    console.error('Error fetching attempts:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const {
      mock_id,
      user_id = 'usr-1',
      answers = [], // Array of { question_id, selected_option, is_marked_for_review, time_spent_secs }
      time_spent_secs = 0,
      started_at = new Date(Date.now() - (time_spent_secs || 60) * 1000).toISOString(),
    } = body;

    if (!mock_id) {
      return NextResponse.json({ error: 'mock_id is required' }, { status: 400 });
    }

    const mock: any = db.prepare('SELECT * FROM mock_tests WHERE id = ?').get(mock_id);
    if (!mock) {
      return NextResponse.json({ error: 'Mock test not found' }, { status: 404 });
    }

    const mockQuestions = db.prepare(`
      SELECT q.*, mq.marks, mq.negative_marks, mq.order_index, s.name as subject_name, s.id as subject_id, t.id as topic_id, t.name as topic_name
      FROM mock_questions mq
      JOIN questions q ON mq.question_id = q.id
      LEFT JOIN subjects s ON q.subject_id = s.id
      LEFT JOIN topics t ON q.topic_id = t.id
      WHERE mq.mock_id = ?
      ORDER BY mq.order_index ASC
    `).all(mock_id);

    const qMap = new Map(mockQuestions.map((q: any) => [q.id, q]));
    const answerMap = new Map(answers.map((a: any) => [a.question_id, a]));

    let totalCorrect = 0;
    let totalWrong = 0;
    let totalSkipped = 0;
    let totalMarked = 0;
    let totalScore = 0;

    const processedAnswers: any[] = [];
    const subjectStats: Record<string, { total: number; correct: number; wrong: number; name: string }> = {};
    const topicMistakes: { question_id: string; subject_id: string; topic_id: string }[] = [];

    for (const q of mockQuestions as any[]) {
      const userAns: any = answerMap.get(q.id);
      const selected = userAns?.selected_option ? userAns.selected_option.toUpperCase() : null;
      const isMarked = userAns?.is_marked_for_review ? 1 : 0;
      const qTime = userAns?.time_spent_secs || 30;

      if (isMarked) totalMarked++;

      const sName = q.subject_name || 'General';
      if (!subjectStats[sName]) {
        subjectStats[sName] = { total: 0, correct: 0, wrong: 0, name: sName };
      }
      subjectStats[sName].total++;

      let isCorrect = 0;
      if (!selected) {
        totalSkipped++;
      } else if (selected === q.correct_answer) {
        totalCorrect++;
        isCorrect = 1;
        totalScore += q.marks || mock.marks_per_correct || 1.0;
        subjectStats[sName].correct++;
      } else {
        totalWrong++;
        isCorrect = 0;
        totalScore -= q.negative_marks !== undefined ? q.negative_marks : (mock.negative_marking || 0.33);
        subjectStats[sName].wrong++;
        topicMistakes.push({
          question_id: q.id,
          subject_id: q.subject_id,
          topic_id: q.topic_id
        });
      }

      processedAnswers.push({
        question_id: q.id,
        selected_option: selected,
        correct_answer: q.correct_answer,
        is_correct: isCorrect,
        time_spent_secs: qTime,
        is_marked_for_review: isMarked
      });
    }

    const accuracy = (totalCorrect + totalWrong) > 0 
      ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 1000) / 10 
      : 0;

    // Percentile calculation
    const calculatedPercentile = Math.min(99.4, Math.max(15.0, Math.round((accuracy * 0.85 + (totalScore / (mock.total_marks || 100)) * 25) * 10) / 10));
    const calculatedRank = Math.max(1, Math.round(1500 * (1 - (calculatedPercentile / 100))));

    const subjectBreakdown = Object.values(subjectStats).map(s => ({
      subject: s.name,
      total: s.total,
      correct: s.correct,
      wrong: s.wrong,
      accuracy: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
    }));

    const attemptId = `att-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    // Database transaction to record attempt, answers, mistakes, and weak areas
    db.transaction(() => {
      // 1. Insert Attempt
      db.prepare(`
        INSERT INTO test_attempts (
          id, user_id, mock_id, exam_id, started_at, completed_at,
          score, accuracy, total_correct, total_wrong, total_skipped, total_marked,
          time_spent_secs, rank, percentile, status, subject_breakdown_json
        ) VALUES (?, ?, ?, ?, ?, datetime('now'), ?, ?, ?, ?, ?, ?, ?, ?, ?, 'completed', ?)
      `).run(
        attemptId,
        user_id,
        mock_id,
        mock.exam_id,
        started_at,
        Math.max(0, Math.round(totalScore * 100) / 100),
        accuracy,
        totalCorrect,
        totalWrong,
        totalSkipped,
        totalMarked,
        time_spent_secs,
        calculatedRank,
        calculatedPercentile,
        JSON.stringify(subjectBreakdown)
      );

      // 2. Insert Attempt Answers
      const insertAns = db.prepare(`
        INSERT INTO attempt_answers (
          id, attempt_id, question_id, selected_option, correct_answer, is_correct, time_spent_secs, is_marked_for_review
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      processedAnswers.forEach((ans, idx) => {
        insertAns.run(
          `ans-${attemptId}-${idx + 1}`,
          attemptId,
          ans.question_id,
          ans.selected_option,
          ans.correct_answer,
          ans.is_correct,
          ans.time_spent_secs,
          ans.is_marked_for_review
        );

        // Update question attempt & correct statistics
        db.prepare(`
          UPDATE questions 
          SET attempt_count = attempt_count + 1,
              correct_count = correct_count + ?
          WHERE id = ?
        `).run(ans.is_correct, ans.question_id);
      });

      // 3. Increment mock attempt count
      db.prepare('UPDATE mock_tests SET attempt_count = attempt_count + 1 WHERE id = ?').run(mock_id);

      // 4. Update User Streak & XP
      db.prepare(`
        UPDATE users 
        SET xp_points = xp_points + ?,
            streak_days = streak_days + 1
        WHERE id = ?
      `).run(Math.round(totalScore * 5) + 20, user_id);

      // 5. Populate Mistake Book for wrong answers
      const insertMistake = db.prepare(`
        INSERT INTO mistake_book (id, user_id, question_id, mistake_type, status, notes, review_count)
        VALUES (?, ?, ?, 'Concept gap', 'Need Revision', 'Added automatically from test attempt.', 0)
        ON CONFLICT(id) DO NOTHING
      `);

      for (const m of topicMistakes) {
        const mistakeId = `mb-${user_id}-${m.question_id}`;
        insertMistake.run(mistakeId, user_id, m.question_id);

        // Update weak areas if topic exists
        if (m.topic_id && m.subject_id) {
          const weakId = `wa-${user_id}-${m.topic_id}`;
          db.prepare(`
            INSERT INTO weak_areas (
              id, user_id, exam_id, subject_id, topic_id, total_attempted, correct_count, accuracy_pct, last_updated_at
            ) VALUES (?, ?, ?, ?, ?, 1, 0, 0.0, datetime('now'))
            ON CONFLICT(id) DO UPDATE SET
              total_attempted = total_attempted + 1,
              accuracy_pct = (correct_count * 100.0) / (total_attempted + 1),
              last_updated_at = datetime('now')
          `).run(weakId, user_id, mock.exam_id, m.subject_id, m.topic_id);
        }
      }
    })();

    return NextResponse.json({
      success: true,
      attemptId,
      result: {
        score: Math.max(0, Math.round(totalScore * 100) / 100),
        totalMarks: mock.total_marks,
        accuracy,
        totalCorrect,
        totalWrong,
        totalSkipped,
        totalMarked,
        timeSpentSecs: time_spent_secs,
        rank: calculatedRank,
        percentile: calculatedPercentile,
        subjectBreakdown,
      }
    });
  } catch (error: any) {
    console.error('Error submitting test attempt:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
