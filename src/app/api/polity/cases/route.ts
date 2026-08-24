import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('q') || '';

    let query = 'SELECT * FROM polity_cases WHERE 1=1';
    const params: any[] = [];

    if (search) {
      query += ' AND (case_name LIKE ? OR issue LIKE ? OR judgment_principle LIKE ? OR related_article LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    query += ' ORDER BY year ASC';

    const cases = db.prepare(query).all(...params);

    return NextResponse.json({
      success: true,
      total: cases.length,
      cases
    });
  } catch (error: any) {
    console.error('Error fetching landmark cases:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
