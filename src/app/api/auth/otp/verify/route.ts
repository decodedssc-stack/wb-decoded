import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { phone, otp, name, district, targetExamId, preferredLang } = body;

    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
    const cleanOtp = (otp || '').trim();

    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json({ success: false, error: 'Valid 10-digit mobile number required.' }, { status: 400 });
    }

    if (!cleanOtp || cleanOtp.length !== 6) {
      return NextResponse.json({ success: false, error: 'Please enter the 6-digit OTP received.' }, { status: 400 });
    }

    // Verify against otp_codes table
    const record: any = db.prepare(`
      SELECT otp_code, expires_at, attempts 
      FROM otp_codes 
      WHERE phone = ?
    `).get(cleanPhone);

    if (!record) {
      return NextResponse.json({ success: false, error: 'No OTP requested for this number. Please request a new OTP.' }, { status: 404 });
    }

    // Check expiry
    const isExpired = db.prepare("SELECT datetime('now') > ? as expired").get(record.expires_at) as { expired: number };
    if (isExpired && isExpired.expired === 1) {
      return NextResponse.json({ success: false, error: 'OTP has expired. Please request a new OTP code.' }, { status: 400 });
    }

    // Verify OTP code
    if (record.otp_code !== cleanOtp) {
      db.prepare('UPDATE otp_codes SET attempts = attempts + 1 WHERE phone = ?').run(cleanPhone);
      return NextResponse.json({ success: false, error: 'Invalid OTP entered. Please check and try again.' }, { status: 401 });
    }

    // OTP is valid -> delete from otp_codes
    db.prepare('DELETE FROM otp_codes WHERE phone = ?').run(cleanPhone);

    // Find or create user
    let user: any = db.prepare('SELECT * FROM users WHERE phone = ?').get(cleanPhone);

    if (!user) {
      const userId = 'usr_m_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
      const candidateName = name && name.trim() ? name.trim() : 'Aspirant ' + cleanPhone.slice(-4);
      const userDistrict = district || 'Kolkata';
      const userTarget = targetExamId || 'exam-wbcs';
      const userLang = preferredLang || 'bilingual';

      db.prepare(`
        INSERT INTO users (
          id, name, email, phone, district, target_exam_id, preferred_lang, role, streak_days, xp_points, created_at, last_login_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, 'student', 1, 150, datetime('now'), datetime('now')
        )
      `).run(
        userId,
        candidateName,
        `${cleanPhone}@aspirant.wbdecoded.in`,
        cleanPhone,
        userDistrict,
        userTarget,
        userLang
      );

      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    } else {
      // Existing user -> update login timestamp & streak
      db.prepare("UPDATE users SET last_login_at = datetime('now'), streak_days = streak_days + 1 WHERE id = ?").run(user.id);
    }

    const userPayload = {
      id: user.id,
      name: user.name,
      phone: '+91 ' + user.phone,
      email: user.email,
      district: user.district || 'Kolkata',
      targetExamId: user.target_exam_id || 'exam-wbcs',
      preferredLang: user.preferred_lang || 'bilingual',
      role: user.role || 'student',
      streak_days: user.streak_days || 1,
      xp_points: user.xp_points || 150,
      authProvider: 'mobile_otp'
    };

    const response = NextResponse.json({
      success: true,
      message: 'Mobile verification successful.',
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
    console.error('OTP Verification Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to verify OTP.' }, { status: 500 });
  }
}
