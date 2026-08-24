import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

let cachedChallenge: any = null;
let lastChallengeDate = '';

export async function GET() {
  try {
    const db = getDb();
    const todayStr = new Date().toISOString().split('T')[0];

    if (cachedChallenge && lastChallengeDate === todayStr) {
      return NextResponse.json(cachedChallenge);
    }

    let challenge: any = db.prepare('SELECT * FROM daily_challenges WHERE date_str = ?').get(todayStr);

    if (!challenge) {
      // Instant Indexed Sampling (no slow ORDER BY RANDOM on 299K rows)
      const countObj = db.prepare('SELECT COUNT(*) as c FROM questions').get() as { c: number };
      const totalCount = countObj?.c || 1000;
      const randomOffset = Math.floor(Math.random() * Math.max(1, totalCount - 30));

      const sampleQuestions = db.prepare(`
        SELECT id FROM questions LIMIT 15 OFFSET ?
      `).all(randomOffset);

      const qIds = sampleQuestions.map((q: any) => q.id);
      const title = `West Bengal Daily Booster (${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })})`;

      db.prepare(`
        INSERT INTO daily_challenges (id, date_str, title, exam_id, question_count, duration_mins, questions_json, is_published)
        VALUES (?, ?, ?, 'exam-wbcs', ?, 15, ?, 1)
      `).run(`dc-${todayStr}`, todayStr, title, qIds.length, JSON.stringify(qIds));

      challenge = db.prepare('SELECT * FROM daily_challenges WHERE date_str = ?').get(todayStr);
    }

    const questionIds: string[] = challenge.questions_json ? JSON.parse(challenge.questions_json) : [];
    let questions: any[] = [];

    if (questionIds.length > 0) {
      const placeholders = questionIds.map(() => '?').join(',');
      questions = db.prepare(`
        SELECT q.*, s.name as subject_name, t.name as topic_name, p.exam_year as pyq_year
        FROM questions q
        LEFT JOIN subjects s ON q.subject_id = s.id
        LEFT JOIN topics t ON q.topic_id = t.id
        LEFT JOIN pyq_metadata p ON q.id = p.question_id
        WHERE q.id IN (${placeholders})
      `).all(...questionIds);
    }

    const result = {
      challenge: {
        ...challenge,
        questions
      }
    };

    cachedChallenge = result;
    lastChallengeDate = todayStr;

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error fetching daily challenge:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
