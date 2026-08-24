import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

export const dynamic = 'force-dynamic';

function getDb() {
  const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
  return new Database(dbPath);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params;
    const db = getDb();

    const book = db.prepare('SELECT * FROM ncert_books WHERE id = ?').get(bookId) as any;

    if (!book) {
      return NextResponse.json(
        { success: false, error: 'NCERT Book not found' },
        { status: 404 }
      );
    }

    const chapters = db.prepare(`
      SELECT id, book_id, chapter_num, chapter_title, chapter_title_bn, summary, pdf_url, read_time_mins
      FROM ncert_chapters
      WHERE book_id = ?
      ORDER BY chapter_num ASC
    `).all(bookId);

    return NextResponse.json({
      success: true,
      book,
      chapters
    });
  } catch (error: any) {
    console.error('Error fetching NCERT book details:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch book details' },
      { status: 500 }
    );
  }
}
