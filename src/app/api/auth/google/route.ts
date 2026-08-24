import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { name, email, googleId, avatar, district, targetExamId } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'A valid Google email is required.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const userName = name || cleanEmail.split('@')[0];
    const gid = googleId || 'g_' + Buffer.from(cleanEmail).toString('hex').slice(0, 16);
    const userAvatar = avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userName)}`;

    // Check if user exists by email or google_id
    let user: any = db.prepare('SELECT * FROM users WHERE email = ? OR google_id = ?').get(cleanEmail, gid);

    if (!user) {
      // Create new user via Google
      const userId = 'usr_g_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      const userDistrict = district || 'Kolkata';
      const userTarget = targetExamId || 'exam-wbcs';

      db.prepare(`
        INSERT INTO users (
          id, name, email, google_id, avatar, district, target_exam_id, preferred_lang, role, streak_days, xp_points, created_at, last_login_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, 'bilingual', 'student', 1, 200, datetime('now'), datetime('now')
        )
      `).run(
        userId,
        userName,
        cleanEmail,
        gid,
        userAvatar,
        userDistrict,
        userTarget
      );

      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    } else {
      // Update existing user with google_id and last_login_at
      db.prepare(`
        UPDATE users 
        SET google_id = ?, avatar = COALESCE(avatar, ?), last_login_at = datetime('now'), streak_days = streak_days + 1 
        WHERE id = ?
      `).run(gid, userAvatar, user.id);
    }

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone ? '+91 ' + user.phone : '',
      avatar: user.avatar || userAvatar,
      district: user.district || 'Kolkata',
      targetExamId: user.target_exam_id || 'exam-wbcs',
      preferredLang: user.preferred_lang || 'bilingual',
      role: user.role || 'student',
      streak_days: (user.streak_days || 1),
      xp_points: user.xp_points || 200,
      authProvider: 'google'
    };

    const response = NextResponse.json({
      success: true,
      message: 'Google Sign-In successful.',
      user: userPayload
    });

    response.cookies.set('wb_session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 90,
      path: '/'
    });

    return response;
  } catch (error: any) {
    console.error('Google Auth Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to authenticate with Google.' }, { status: 500 });
  }
}
