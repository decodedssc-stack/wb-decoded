import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('q') || '';
    const part = searchParams.get('part') || '';
    const priority = searchParams.get('priority') || '';

    let query = 'SELECT * FROM polity_articles WHERE 1=1';
    const params: any[] = [];

    if (search) {
      query += ' AND (article_num LIKE ? OR title LIKE ? OR provision LIKE ? OR key_point LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    if (part) {
      query += ' AND part_num = ?';
      params.push(part);
    }

    if (priority) {
      query += ' AND exam_priority = ?';
      params.push(priority);
    }

    query += ' ORDER BY id ASC';

    const articles = db.prepare(query).all(...params);

    // Get list of distinct parts for filter dropdown
    const parts = db.prepare('SELECT DISTINCT part_num FROM polity_articles ORDER BY part_num ASC').all().map((p: any) => p.part_num);

    return NextResponse.json({
      success: true,
      total: articles.length,
      parts,
      articles
    });
  } catch (error: any) {
    console.error('Error fetching polity articles:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
