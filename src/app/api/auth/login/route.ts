import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + '_wb_decoded_salt_2026').digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !identifier.trim()) {
      return NextResponse.json({ success: false, error: 'Please enter your mobile number or email.' }, { status: 400 });
    }

    if (!password || !password.trim()) {
      return NextResponse.json({ success: false, error: 'Please enter your password.' }, { status: 400 });
    }

    const cleanInput = identifier.trim();
    const cleanPhone = cleanInput.replace(/\D/g, '').slice(-10);
    const passwordHash = hashPassword(password);

    // Find user by phone, email, or id
    const user: any = db.prepare(`
      SELECT 
        id, name, email, phone, password_hash, district, preferred_lang, 
        target_exam_id, role, streak_days, xp_points
      FROM users 
      WHERE phone = ? OR email = ? OR id = ?
    `).get(cleanPhone || cleanInput, cleanInput.toLowerCase(), cleanInput);

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'No account found with these credentials. Please check your number or create a new account.' 
      }, { status: 404 });
    }

    // If user has a password set, verify hash
    if (user.password_hash && user.password_hash !== '' && user.password_hash !== passwordHash) {
      return NextResponse.json({ 
        success: false, 
        error: 'Incorrect password. Please try again or reset your password.' 
      }, { status: 401 });
    }

    // If user didn't have password set yet, set this password now
    if (!user.password_hash || user.password_hash === '') {
      db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(passwordHash, user.id);
    }

    // Update last login timestamp and streak
    db.prepare("UPDATE users SET last_login_at = datetime('now'), streak_days = streak_days + 1 WHERE id = ?").run(user.id);

    const userPayload = {
      id: user.id,
      name: user.name,
      phone: user.phone ? '+91 ' + user.phone : '',
      email: user.email,
      district: user.district || 'Kolkata',
      targetExamId: user.target_exam_id || 'exam-wbcs',
      preferredLang: user.preferred_lang || 'bilingual',
      role: user.role || 'student',
      streak_days: (user.streak_days || 1) + 1,
      xp_points: user.xp_points || 150
    };

    const response = NextResponse.json({
      success: true,
      message: 'Sign in successful.',
      user: userPayload
    });

    // Set secure HTTP-only session cookie
    response.cookies.set('wb_session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: '/'
    });

    return response;
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error during sign in.' }, { status: 500 });
  }
}
