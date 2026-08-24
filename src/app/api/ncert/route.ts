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
    const classNum = searchParams.get('class');
    const subject = searchParams.get('subject');
    const query = searchParams.get('q');

    const db = getDb();

    let sql = 'SELECT * FROM ncert_books WHERE 1=1';
    const params: any[] = [];

    if (classNum && classNum !== 'all') {
      sql += ' AND class_num = ?';
      params.push(parseInt(classNum, 10));
    }

    if (subject && subject !== 'all') {
      sql += ' AND LOWER(subject) = LOWER(?)';
      params.push(subject);
    }

    if (query && query.trim()) {
      sql += ' AND (book_title LIKE ? OR description LIKE ?)';
      const term = `%${query.trim()}%`;
      params.push(term, term);
    }

    sql += ' ORDER BY class_num ASC, subject ASC';

    const books = db.prepare(sql).all(...params);

    return NextResponse.json({
      success: true,
      total: books.length,
      books
    });
  } catch (error: any) {
    console.error('Error fetching NCERT books:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch NCERT books' },
      { status: 500 }
    );
  }
}
