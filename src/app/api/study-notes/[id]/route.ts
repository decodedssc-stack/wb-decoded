import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

function getDb() {
  const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
  return new Database(dbPath);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const db = getDb();

    // Increment views
    db.prepare('UPDATE study_notes SET views_count = views_count + 1 WHERE id = ?').run(id);

    const note = db.prepare(`
      SELECT 
        sn.*,
        s.name as subject_name,
        s.color as subject_color,
        s.icon as subject_icon,
        c.name as chapter_name
      FROM study_notes sn
      LEFT JOIN subjects s ON sn.subject_id = s.id
      LEFT JOIN chapters c ON sn.chapter_id = c.id
      WHERE sn.id = ?
    `).get(id) as any;

    if (!note) {
      return NextResponse.json(
        { success: false, error: 'Study note not found' },
        { status: 404 }
      );
    }

    // Fetch related questions for practice
    let relatedQuestions: any[] = [];
    if (note.chapter_id) {
      relatedQuestions = db.prepare(`
        SELECT id, question_text, option_a, option_b, option_c, option_d, correct_answer, difficulty
        FROM questions
        WHERE chapter_id = ?
        LIMIT 5
      `).all(note.chapter_id);
    }

    if (relatedQuestions.length === 0 && note.subject_id) {
      relatedQuestions = db.prepare(`
        SELECT id, question_text, option_a, option_b, option_c, option_d, correct_answer, difficulty
        FROM questions
        WHERE subject_id = ?
        LIMIT 5
      `).all(note.subject_id);
    }

    // Next and previous notes in same subject or overall
    const allNotes = db.prepare('SELECT id, title, subject_id FROM study_notes ORDER BY created_at ASC').all();
    const curIdx = allNotes.findIndex((n: any) => n.id === id);
    const prevNote = curIdx > 0 ? allNotes[curIdx - 1] : null;
    const nextNote = curIdx < allNotes.length - 1 ? allNotes[curIdx + 1] : null;

    return NextResponse.json({
      success: true,
      note,
      relatedQuestions,
      navigation: {
        prev: prevNote,
        next: nextNote
      }
    });
  } catch (error: any) {
    console.error('Error fetching single study note:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch note' },
      { status: 500 }
    );
  }
}
