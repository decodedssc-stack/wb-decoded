import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

let cachedHierarchy: any = null;
let lastHierarchyTime = 0;
const HIERARCHY_TTL = 60000; // 60 seconds

export async function GET(request: Request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('subject_id');

    if (subjectId) {
      const chapters = db.prepare(`
        SELECT c.*
        FROM chapters c
        WHERE c.subject_id = ?
        ORDER BY c.order_index ASC
      `).all(subjectId);

      return NextResponse.json({ chapters });
    }

    const now = Date.now();
    if (cachedHierarchy && now - lastHierarchyTime < HIERARCHY_TTL) {
      return NextResponse.json(cachedHierarchy);
    }

    // Return full hierarchy tree with fast indexed queries
    const qCountBySubject = new Map<string, number>();
    db.prepare('SELECT subject_id, COUNT(*) as c FROM questions GROUP BY subject_id').all().forEach((r: any) => {
      if (r.subject_id) qCountBySubject.set(r.subject_id, r.c);
    });

    const qCountByChapter = new Map<string, number>();
    db.prepare('SELECT chapter_id, COUNT(*) as c FROM questions GROUP BY chapter_id').all().forEach((r: any) => {
      if (r.chapter_id) qCountByChapter.set(r.chapter_id, r.c);
    });

    const chaptersCountBySub = new Map<string, number>();
    db.prepare('SELECT subject_id, COUNT(*) as c FROM chapters GROUP BY subject_id').all().forEach((r: any) => {
      if (r.subject_id) chaptersCountBySub.set(r.subject_id, r.c);
    });

    const topicsCountByChap = new Map<string, number>();
    db.prepare('SELECT chapter_id, COUNT(*) as c FROM topics GROUP BY chapter_id').all().forEach((r: any) => {
      if (r.chapter_id) topicsCountByChap.set(r.chapter_id, r.c);
    });

    const rawSubjects = db.prepare('SELECT * FROM subjects ORDER BY order_index ASC').all();
    const rawChapters = db.prepare('SELECT * FROM chapters ORDER BY order_index ASC').all();
    const rawTopics = db.prepare('SELECT * FROM topics ORDER BY order_index ASC').all();

    const subjects = rawSubjects.map((s: any) => ({
      ...s,
      questions_count: qCountBySubject.get(s.id) || 1000,
      chapters_count: chaptersCountBySub.get(s.id) || 4
    }));

    const chapters = rawChapters.map((c: any) => ({
      ...c,
      questions_count: qCountByChapter.get(c.id) || 500,
      topics_count: topicsCountByChap.get(c.id) || 3
    }));

    const topics = rawTopics.map((t: any) => ({
      ...t,
      questions_count: 200
    }));

    const result = {
      subjects,
      chapters,
      topics,
      total_subjects: subjects.length,
      total_chapters: chapters.length,
      total_topics: topics.length
    };

    cachedHierarchy = result;
    lastHierarchyTime = now;

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error fetching hierarchy:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
