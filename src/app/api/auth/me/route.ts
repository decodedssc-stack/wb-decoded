import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const sessionCookie = req.cookies.get('wb_session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const user: any = db.prepare(`
      SELECT 
        id, name, email, phone, district, preferred_lang, 
        target_exam_id, role, streak_days, xp_points, created_at, last_login_at
      FROM users 
      WHERE id = ?
    `).get(sessionCookie);

    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    // Get user attempt count & stats
    const stats: any = db.prepare(`
      SELECT 
        COUNT(*) as total_attempts,
        ROUND(AVG(score), 1) as avg_score,
        ROUND(AVG(accuracy_percentage), 1) as avg_accuracy
      FROM test_attempts
      WHERE user_id = ?
    `).get(user.id);

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone ? '+91 ' + user.phone : '',
        email: user.email,
        district: user.district || 'Kolkata',
        targetExamId: user.target_exam_id || 'exam-wbcs',
        preferredLang: user.preferred_lang || 'bilingual',
        role: user.role || 'student',
        streak_days: user.streak_days || 1,
        xp_points: user.xp_points || 150,
        stats: {
          totalAttempts: stats?.total_attempts || 0,
          avgScore: stats?.avg_score || 0,
          avgAccuracy: stats?.avg_accuracy || 0
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ authenticated: false, error: error.message });
  }
}
