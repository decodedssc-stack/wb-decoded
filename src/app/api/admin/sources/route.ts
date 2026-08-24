import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    const sources = db.prepare('SELECT * FROM source_registry ORDER BY tier ASC, reliability_score DESC').all();
    const examUpdates = db.prepare(`
      SELECT u.*, e.name as exam_name
      FROM exam_updates u
      LEFT JOIN exams e ON u.exam_id = e.id
      ORDER BY u.detected_at DESC
    `).all();

    return NextResponse.json({ sources, examUpdates });
  } catch (error: any) {
    console.error('Error fetching sources:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { action = 'create_source', ...data } = body;

    if (action === 'acknowledge_update') {
      db.prepare('UPDATE exam_updates SET is_acknowledged = 1, status = "Acknowledged" WHERE id = ?').run(data.update_id);
      return NextResponse.json({ success: true, message: 'Update acknowledged' });
    }

    if (action === 'create_source') {
      const { name, website, url, authority, source_type = 'Official Portal', tier = 'Tier 1', license_status = 'Public Official' } = data;
      const id = `src-${Date.now()}`;

      db.prepare(`
        INSERT INTO source_registry (id, name, website, url, authority, source_type, tier, license_status, reliability_score, is_enabled)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 98.0, 1)
      `).run(id, name, website, url, authority, source_type, tier, license_status);

      return NextResponse.json({ success: true, sourceId: id });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    console.error('Error modifying source registry:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
