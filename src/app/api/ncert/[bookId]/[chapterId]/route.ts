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
  { params }: { params: { bookId: string; chapterId: string } }
) {
  try {
    const { bookId, chapterId } = params;
    const db = getDb();

    const book = db.prepare('SELECT * FROM ncert_books WHERE id = ?').get(bookId) as any;
    const chapter = db.prepare('SELECT * FROM ncert_chapters WHERE id = ? AND book_id = ?').get(chapterId, bookId) as any;

    if (!chapter) {
      return NextResponse.json(
        { success: false, error: 'NCERT Chapter not found' },
        { status: 404 }
      );
    }

    // Get sibling chapters for navigation
    const allChapters = db.prepare('SELECT id, chapter_num, chapter_title FROM ncert_chapters WHERE book_id = ? ORDER BY chapter_num ASC').all(bookId);
    const curIdx = allChapters.findIndex((c: any) => c.id === chapterId);
    const prevChap = curIdx > 0 ? allChapters[curIdx - 1] : null;
    const nextChap = curIdx < allChapters.length - 1 ? allChapters[curIdx + 1] : null;

    return NextResponse.json({
      success: true,
      book,
      chapter,
      navigation: {
        prev: prevChap,
        next: nextChap
      }
    });
  } catch (error: any) {
    console.error('Error fetching NCERT chapter:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch chapter' },
      { status: 500 }
    );
  }
}
