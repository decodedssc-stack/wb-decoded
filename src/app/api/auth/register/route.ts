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
    const { name, phone, email, password, district, targetExamId, preferredLang } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Full name must be at least 2 characters.' }, { status: 400 });
    }

    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json({ success: false, error: 'A valid 10-digit mobile number is required.' }, { status: 400 });
    }

    if (!password || password.length < 4) {
      return NextResponse.json({ success: false, error: 'Password must be at least 4 characters.' }, { status: 400 });
    }

    // Check if user with this phone or email already exists
    const cleanEmail = email && email.includes('@') ? email.trim().toLowerCase() : '';
    const existing = db.prepare("SELECT id, phone, email FROM users WHERE phone = ? OR (email != '' AND email = ?)").get(cleanPhone, cleanEmail || 'NO_MATCH');
    
    if (existing) {
      return NextResponse.json({ 
        success: false, 
        error: 'An account with this mobile number or email already exists. Please sign in.' 
      }, { status: 409 });
    }

    const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const passwordHash = hashPassword(password);
    const userEmail = cleanEmail || `${cleanPhone}@aspirant.wbdecoded.in`;
    const userDistrict = district || 'Kolkata';
    const userTargetExam = targetExamId || 'exam-wbcs';
    const userLang = preferredLang || 'bilingual';

    db.prepare(`
      INSERT INTO users (
        id, name, email, phone, password_hash, district, preferred_lang, target_exam_id, role, streak_days, xp_points, created_at, last_login_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, 'student', 1, 150, datetime('now'), datetime('now')
      )
    `).run(
      userId,
      name.trim(),
      userEmail,
      cleanPhone,
      passwordHash,
      userDistrict,
      userLang,
      userTargetExam
    );

    const userPayload = {
      id: userId,
      name: name.trim(),
      phone: '+91 ' + cleanPhone,
      email: userEmail,
      district: userDistrict,
      targetExamId: userTargetExam,
      preferredLang: userLang,
      role: 'student',
      streak_days: 1,
      xp_points: 150
    };

    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully.',
      user: userPayload
    });

    // Set secure HTTP-only session cookie
    response.cookies.set('wb_session', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: '/'
    });

    return response;
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error during registration.' }, { status: 500 });
  }
}
