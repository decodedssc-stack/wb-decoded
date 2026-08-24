import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { uid, email, phone, displayName, photoURL, providerId, district, targetExamId } = body;

    if (!uid) {
      return NextResponse.json({ success: false, error: 'Firebase UID is required.' }, { status: 400 });
    }

    const cleanPhone = phone ? phone.replace(/\D/g, '').slice(-10) : '';
    const cleanEmail = email && email.includes('@') ? email.trim().toLowerCase() : '';
    const candidateName = displayName && displayName.trim() ? displayName.trim() : (cleanPhone ? `Aspirant ${cleanPhone.slice(-4)}` : 'WB Aspirant');
    const userAvatar = photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(candidateName)}`;
    const userDistrict = district || 'Kolkata';
    const userTarget = targetExamId || 'exam-wbcs';

    // Find existing user by google_id / uid, email, or phone
    let user: any = db.prepare(`
      SELECT * FROM users 
      WHERE google_id = ? 
         OR (email != '' AND email = ?) 
         OR (phone != '' AND phone = ?)
    `).get(uid, cleanEmail || 'NO_MATCH', cleanPhone || 'NO_MATCH');

    if (!user) {
      const newUserId = 'usr_fb_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      db.prepare(`
        INSERT INTO users (
          id, name, email, phone, google_id, avatar, district, target_exam_id, preferred_lang, role, streak_days, xp_points, created_at, last_login_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, 'bilingual', 'student', 1, 200, datetime('now'), datetime('now')
        )
      `).run(
        newUserId,
        candidateName,
        cleanEmail || (cleanPhone ? `${cleanPhone}@aspirant.wbdecoded.in` : ''),
        cleanPhone,
        uid,
        userAvatar,
        userDistrict,
        userTarget
      );

      user = db.prepare('SELECT * FROM users WHERE id = ?').get(newUserId);
    } else {
      // Update existing user
      db.prepare(`
        UPDATE users 
        SET google_id = COALESCE(google_id, ?),
            avatar = COALESCE(avatar, ?),
            last_login_at = datetime('now'),
            streak_days = streak_days + 1
        WHERE id = ?
      `).run(uid, userAvatar, user.id);
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
      streak_days: user.streak_days || 1,
      xp_points: user.xp_points || 200,
      authProvider: providerId || 'firebase'
    };

    const response = NextResponse.json({
      success: true,
      message: 'Firebase authentication verified successfully.',
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
    console.error('Firebase Auth Backend Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Firebase authentication failed.' }, { status: 500 });
  }
}
