import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const { phone } = body;

    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json({ success: false, error: 'Please enter a valid 10-digit mobile number.' }, { status: 400 });
    }

    // Generate real 6-digit numeric OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in otp_codes table with 10 minutes expiry
    db.prepare(`
      INSERT INTO otp_codes (phone, otp_code, expires_at, attempts, created_at)
      VALUES (?, ?, datetime('now', '+10 minutes'), 0, datetime('now'))
      ON CONFLICT(phone) DO UPDATE SET
        otp_code = excluded.otp_code,
        expires_at = datetime('now', '+10 minutes'),
        attempts = 0,
        created_at = datetime('now')
    `).run(cleanPhone, otpCode);

    // If Fast2SMS or Twilio API key is configured in env, send real carrier SMS
    const fast2smsKey = process.env.FAST2SMS_API_KEY;
    if (fast2smsKey) {
      try {
        await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            'authorization': fast2smsKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            variables_values: otpCode,
            route: 'otp',
            numbers: cleanPhone
          })
        });
      } catch (smsErr) {
        console.warn('Carrier SMS Gateway Notice:', smsErr);
      }
    }

    // Check if user already exists
    const user = db.prepare('SELECT id, name FROM users WHERE phone = ?').get(cleanPhone);

    return NextResponse.json({
      success: true,
      message: `Verification code generated for +91 ${cleanPhone}.`,
      isExistingUser: !!user,
      otpCode: otpCode // Returned for instant on-screen verification & auto-fill
    });
  } catch (error: any) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to send OTP.' }, { status: 500 });
  }
}
