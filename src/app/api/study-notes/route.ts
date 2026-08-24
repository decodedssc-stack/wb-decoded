import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

export const dynamic = 'force-dynamic';

function getDb() {
  const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
  return new Database(dbPath);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get('subject_id');
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const db = getDb();

    let sql = `
      SELECT 
        sn.id,
        sn.subject_id,
        sn.chapter_id,
        sn.title,
        sn.title_bn,
        sn.exam_coverage,
        sn.read_time_mins,
        sn.summary,
        sn.is_premium,
        sn.views_count,
        sn.created_at,
        s.name as subject_name,
        s.color as subject_color,
        s.icon as subject_icon
      FROM study_notes sn
      LEFT JOIN subjects s ON sn.subject_id = s.id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (subjectId && subjectId !== 'all') {
      sql += ` AND sn.subject_id = ?`;
      params.push(subjectId);
    }

    if (query && query.trim()) {
      sql += ` AND (sn.title LIKE ? OR sn.summary LIKE ? OR sn.exam_coverage LIKE ?)`;
      const term = `%${query.trim()}%`;
      params.push(term, term, term);
    }

    sql += ` ORDER BY sn.created_at ASC LIMIT ?`;
    params.push(limit);

    const notes = db.prepare(sql).all(...params);

    // Fetch subjects with note counts
    const subjects = db.prepare(`
      SELECT 
        s.id,
        s.name,
        s.color,
        s.icon,
        COUNT(sn.id) as notes_count
      FROM subjects s
      LEFT JOIN study_notes sn ON s.id = sn.subject_id
      GROUP BY s.id
      ORDER BY s.order_index ASC
    `).all();

    return NextResponse.json({
      success: true,
      total: notes.length,
      notes,
      subjects
    });
  } catch (error: any) {
    console.error('Error fetching study notes:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch study notes' },
      { status: 500 }
    );
  }
}
