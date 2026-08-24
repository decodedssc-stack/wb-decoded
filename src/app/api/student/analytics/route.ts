import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id') || 'usr-1';

    const user: any = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);

    // Aggregate attempts
    const attempts = db.prepare(`
      SELECT a.*, m.title as mock_title, m.total_questions, e.name as exam_name
      FROM test_attempts a
      JOIN mock_tests m ON a.mock_id = m.id
      LEFT JOIN exams e ON a.exam_id = e.id
      WHERE a.user_id = ?
      ORDER BY a.started_at ASC
    `).all(userId);

    const totalTests = attempts.length;
    let totalQuestionsAttempted = 0;
    let totalCorrectAnswers = 0;
    let totalTimeSpent = 0;
    let bestScore = 0;
    let scoreSum = 0;

    const timelineData = attempts.map((att: any, idx: number) => {
      totalQuestionsAttempted += (att.total_correct + att.total_wrong);
      totalCorrectAnswers += att.total_correct;
      totalTimeSpent += att.time_spent_secs;
      if (att.score > bestScore) bestScore = att.score;
      scoreSum += att.score;

      return {
        testNum: idx + 1,
        title: att.mock_title,
        date: new Date(att.started_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        score: att.score,
        accuracy: att.accuracy,
        percentile: att.percentile,
        timeMins: Math.round(att.time_spent_secs / 60),
      };
    });

    const avgAccuracy = totalQuestionsAttempted > 0 ? Math.round((totalCorrectAnswers / totalQuestionsAttempted) * 1000) / 10 : 0;
    const avgScore = totalTests > 0 ? Math.round((scoreSum / totalTests) * 10) / 10 : 0;
    const avgTimePerQuestion = totalQuestionsAttempted > 0 ? Math.round((totalTimeSpent / totalQuestionsAttempted) * 10) / 10 : 35;

    // Subject mastery matrix
    const subjects = db.prepare(`
      SELECT s.name, s.color,
        COALESCE(SUM(ans.is_correct), 0) as correct_count,
        COALESCE(COUNT(ans.id), 0) as total_count
      FROM subjects s
      LEFT JOIN questions q ON q.subject_id = s.id
      LEFT JOIN attempt_answers ans ON ans.question_id = q.id 
        AND ans.attempt_id IN (SELECT id FROM test_attempts WHERE user_id = ?)
      GROUP BY s.id
      HAVING total_count > 0
    `).all(userId);

    const subjectMastery = (subjects as any[]).map(s => {
      const acc = s.total_count > 0 ? Math.round((s.correct_count / s.total_count) * 100) : 0;
      let level = 'Beginner';
      if (acc >= 80) level = 'Mastered';
      else if (acc >= 60) level = 'Proficient';
      else if (acc >= 40) level = 'Developing';

      return {
        name: s.name,
        color: s.color,
        accuracy: acc,
        attempted: s.total_count,
        correct: s.correct_count,
        level,
      };
    });

    // Mistake breakdown
    const mistakesByType = db.prepare(`
      SELECT mistake_type, COUNT(*) as count
      FROM mistake_book
      WHERE user_id = ?
      GROUP BY mistake_type
    `).all(userId);

    // Weak vs Strong Topics
    const weakAreas = db.prepare(`
      SELECT wa.*, s.name as subject_name, t.name as topic_name
      FROM weak_areas wa
      JOIN subjects s ON wa.subject_id = s.id
      JOIN topics t ON wa.topic_id = t.id
      WHERE wa.user_id = ?
      ORDER BY wa.accuracy_pct ASC
      LIMIT 5
    `).all(userId);

    return NextResponse.json({
      user,
      stats: {
        totalTests,
        totalQuestionsAttempted,
        totalCorrectAnswers,
        avgAccuracy,
        avgScore,
        bestScore,
        avgTimePerQuestion,
        streakDays: user?.streak_days || 1,
        xpPoints: user?.xp_points || 150,
      },
      timelineData,
      subjectMastery,
      mistakesByType,
      weakAreas,
    });
  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
