import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('q') || '';

    let query = 'SELECT * FROM polity_amendments WHERE 1=1';
    const params: any[] = [];

    if (search) {
      query += ' AND (amendment_num LIKE ? OR title LIKE ? OR major_change LIKE ? OR related_articles LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    query += ' ORDER BY year ASC';

    const amendments = db.prepare(query).all(...params);

    return NextResponse.json({
      success: true,
      total: amendments.length,
      amendments
    });
  } catch (error: any) {
    console.error('Error fetching polity amendments:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
