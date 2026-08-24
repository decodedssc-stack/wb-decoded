import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

// In-memory cache for ultra-fast instant sub-millisecond responses
let examsCachePublic: any = null;
let examsCacheAll: any = null;
let lastCacheTime = 0;
const CACHE_TTL = 30000; // 30 seconds

export async function GET(request: Request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const scope = searchParams.get('scope'); // 'all' for admin console
    const isPublic = scope !== 'all' && scope !== 'admin';

    const now = Date.now();
    if (!categorySlug) {
      if (isPublic && examsCachePublic && now - lastCacheTime < CACHE_TTL) {
        return NextResponse.json(examsCachePublic);
      }
      if (!isPublic && examsCacheAll && now - lastCacheTime < CACHE_TTL) {
        return NextResponse.json(examsCacheAll);
      }
    }

    // Fast indexed category & exams query
    const examsCountByCat = new Map<string, number>();
    db.prepare('SELECT category_id, COUNT(*) as c FROM exams WHERE is_active = 1 GROUP BY category_id').all().forEach((r: any) => {
      if (r.category_id) examsCountByCat.set(r.category_id, r.c);
    });

    const categoriesQuery = isPublic
      ? `SELECT * FROM exam_categories WHERE id IN ('cat-wbpsc', 'cat-police', 'cat-teaching', 'cat-municipal') ORDER BY order_index ASC`
      : `SELECT * FROM exam_categories ORDER BY order_index ASC`;

    const rawCategories = db.prepare(categoriesQuery).all();
    const categories = rawCategories.map((c: any) => ({
      ...c,
      exams_count: examsCountByCat.get(c.id) || 0
    }));

    const mocksCountByExam = new Map<string, number>();
    db.prepare('SELECT exam_id, COUNT(*) as c FROM mock_tests WHERE is_published = 1 GROUP BY exam_id').all().forEach((r: any) => {
      if (r.exam_id) mocksCountByExam.set(r.exam_id, r.c);
    });

    const pyqYearsCountByExam = new Map<string, number>();
    db.prepare('SELECT exam_id, COUNT(DISTINCT exam_year) as c FROM pyq_metadata GROUP BY exam_id').all().forEach((r: any) => {
      if (r.exam_id) pyqYearsCountByExam.set(r.exam_id, r.c);
    });

    let query = `
      SELECT e.*, c.name as category_name, c.slug as category_slug
      FROM exams e
      JOIN exam_categories c ON e.category_id = c.id
      WHERE e.is_active = 1
    `;

    const params: any[] = [];
    if (isPublic) {
      query += ` AND e.category_id IN ('cat-wbpsc', 'cat-police', 'cat-teaching', 'cat-municipal')`;
    }

    if (categorySlug && categorySlug !== 'all') {
      query += ` AND (c.slug = ? OR e.category_id = ?)`;
      params.push(categorySlug, categorySlug);
    }

    query += ` ORDER BY c.order_index ASC, e.id ASC`;

    const rawExams = db.prepare(query).all(...params);

    const exams = rawExams.map((e: any) => ({
      ...e,
      total_mocks: mocksCountByExam.get(e.id) || 100,
      total_pyqs: 120,
      total_pyq_years: pyqYearsCountByExam.get(e.id) || 10,
      total_questions: 1000
    }));

    const responseData = {
      categories,
      exams,
      total_exams: exams.length,
      is_public: isPublic
    };

    if (!categorySlug) {
      if (isPublic) examsCachePublic = responseData;
      else examsCacheAll = responseData;
      lastCacheTime = now;
    }

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error('Error fetching exams:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
