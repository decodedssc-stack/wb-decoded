import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const search = searchParams.get('search')?.trim() || '';
    const examId = searchParams.get('exam_id');
    const subjectId = searchParams.get('subject_id');
    const chapterId = searchParams.get('chapter_id');
    const topicId = searchParams.get('topic_id');
    const difficulty = searchParams.get('difficulty');
    const lifecycleStatus = searchParams.get('lifecycle_status');
    const verificationStatus = searchParams.get('verification_status');
    const isPyq = searchParams.get('is_pyq');
    const pyqYear = searchParams.get('pyq_year');

    let whereClauses: string[] = ['1=1'];
    let params: any[] = [];

    // Natural Language and Full Text Search handling
    if (search) {
      const lowerSearch = search.toLowerCase();
      // Smart parsing of common exam keywords
      if (lowerSearch.includes('easy') || lowerSearch.includes('moderate') || lowerSearch.includes('hard')) {
        const diffMatch = lowerSearch.match(/\b(easy|moderate|hard)\b/i);
        if (diffMatch) {
          whereClauses.push('q.difficulty = ?');
          params.push(diffMatch[1].charAt(0).toUpperCase() + diffMatch[1].slice(1).toLowerCase());
        }
      }

      if (lowerSearch.includes('pyq') || lowerSearch.includes('previous year')) {
        whereClauses.push('q.is_pyq = 1');
      }

      // Year match e.g. 2018, 2021, 2023
      const yearMatch = lowerSearch.match(/\b(20[12][0-9])\b/);
      if (yearMatch) {
        whereClauses.push('EXISTS (SELECT 1 FROM pyq_metadata p WHERE p.question_id = q.id AND p.exam_year = ?)');
        params.push(parseInt(yearMatch[1]));
      }

      // Main text search on question text, explanation, tags, options
      whereClauses.push(`(
        q.question_text LIKE ? OR 
        q.question_text_bn LIKE ? OR 
        q.explanation LIKE ? OR 
        q.tags LIKE ? OR 
        q.option_a LIKE ? OR 
        q.option_b LIKE ?
      )`);
      const wildSearch = `%${search}%`;
      params.push(wildSearch, wildSearch, wildSearch, wildSearch, wildSearch, wildSearch);
    }

    if (examId) {
      whereClauses.push('q.exam_id = ?');
      params.push(examId);
    }

    if (subjectId) {
      whereClauses.push('q.subject_id = ?');
      params.push(subjectId);
    }

    if (chapterId) {
      whereClauses.push('q.chapter_id = ?');
      params.push(chapterId);
    }

    if (topicId) {
      whereClauses.push('q.topic_id = ?');
      params.push(topicId);
    }

    if (difficulty) {
      whereClauses.push('q.difficulty = ?');
      params.push(difficulty);
    }

    if (lifecycleStatus) {
      whereClauses.push('q.lifecycle_status = ?');
      params.push(lifecycleStatus);
    }

    if (verificationStatus) {
      whereClauses.push('q.verification_status = ?');
      params.push(verificationStatus);
    }

    if (isPyq !== null && isPyq !== undefined && isPyq !== '') {
      whereClauses.push('q.is_pyq = ?');
      params.push(isPyq === '1' || isPyq === 'true' ? 1 : 0);
    }

    if (pyqYear) {
      whereClauses.push('EXISTS (SELECT 1 FROM pyq_metadata p WHERE p.question_id = q.id AND p.exam_year = ?)');
      params.push(parseInt(pyqYear));
    }

    const whereSql = whereClauses.join(' AND ');

    // Total count
    const totalRow: any = db.prepare(`
      SELECT COUNT(*) as count 
      FROM questions q 
      WHERE ${whereSql}
    `).get(...params);
    const total = totalRow.count;

    // Fetch items with subject name, exam name, and pyq metadata
    const questions = db.prepare(`
      SELECT q.*,
        e.name as exam_name,
        s.name as subject_name,
        t.name as topic_name,
        p.exam_year as pyq_year,
        p.paper_name as pyq_paper,
        p.source_name as pyq_source,
        p.source_doc as source_doc
      FROM questions q
      LEFT JOIN exams e ON q.exam_id = e.id
      LEFT JOIN subjects s ON q.subject_id = s.id
      LEFT JOIN topics t ON q.topic_id = t.id
      LEFT JOIN pyq_metadata p ON q.id = p.question_id
      WHERE ${whereSql}
      ORDER BY q.created_at DESC
      LIMIT ? OFFSET ?
    `).all(...params, limit, offset);

    return NextResponse.json({
      questions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error querying questions:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();

    // Bulk Action Handler
    if (body.bulk_action) {
      const { action, question_ids, payload } = body;
      if (!Array.isArray(question_ids) || question_ids.length === 0) {
        return NextResponse.json({ error: 'question_ids array is required.' }, { status: 400 });
      }

      const placeholders = question_ids.map(() => '?').join(',');

      if (action === 'approve') {
        db.prepare(`
          UPDATE questions 
          SET lifecycle_status = 'Approved', verification_status = 'Verified', last_verified_at = datetime('now')
          WHERE id IN (${placeholders})
        `).run(...question_ids);
      } else if (action === 'reject') {
        db.prepare(`
          UPDATE questions 
          SET lifecycle_status = 'Rejected', verification_status = 'Flagged'
          WHERE id IN (${placeholders})
        `).run(...question_ids);
      } else if (action === 'publish') {
        db.prepare(`
          UPDATE questions 
          SET lifecycle_status = 'Published'
          WHERE id IN (${placeholders})
        `).run(...question_ids);
      } else if (action === 'archive') {
        db.prepare(`
          UPDATE questions 
          SET lifecycle_status = 'Archived'
          WHERE id IN (${placeholders})
        `).run(...question_ids);
      } else if (action === 'change_difficulty') {
        db.prepare(`
          UPDATE questions 
          SET difficulty = ?
          WHERE id IN (${placeholders})
        `).run(payload.difficulty, ...question_ids);
      } else if (action === 'change_subject') {
        db.prepare(`
          UPDATE questions 
          SET subject_id = ?
          WHERE id IN (${placeholders})
        `).run(payload.subject_id, ...question_ids);
      }

      // Audit log
      db.prepare(`
        INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(`aud-${Date.now()}`, 'Super Admin', 'Super Admin', `BULK_${action.toUpperCase()}`, 'questions', `${question_ids.length} items`, `Performed bulk ${action} on ${question_ids.length} questions`);

      return NextResponse.json({ success: true, count: question_ids.length });
    }

    // CSV Bulk Import with Pre-Validation
    if (body.csv_import) {
      const { rows, validate_only } = body;
      if (!Array.isArray(rows) || rows.length === 0) {
        return NextResponse.json({ error: 'No rows provided in CSV data' }, { status: 400 });
      }

      let validCount = 0;
      let invalidCount = 0;
      let duplicateCount = 0;
      const issues: any[] = [];
      const validRows: any[] = [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!row.question_text || !row.option_a || !row.option_b || !row.option_c || !row.option_d || !row.correct_answer) {
          invalidCount++;
          issues.push({ row: i + 1, error: 'Missing mandatory fields (Question text, all 4 options, or Correct Answer)' });
          continue;
        }

        const validAnswer = ['A', 'B', 'C', 'D'].includes(row.correct_answer.toUpperCase());
        if (!validAnswer) {
          invalidCount++;
          issues.push({ row: i + 1, error: `Invalid correct answer: "${row.correct_answer}". Must be A, B, C, or D.` });
          continue;
        }

        // Check for duplicates
        const existing = db.prepare('SELECT id FROM questions WHERE question_text = ?').get(row.question_text);
        if (existing) {
          duplicateCount++;
          issues.push({ row: i + 1, error: 'Exact duplicate question already exists in bank.' });
          continue;
        }

        validCount++;
        validRows.push(row);
      }

      if (validate_only) {
        return NextResponse.json({
          preview: true,
          total: rows.length,
          validCount,
          invalidCount,
          duplicateCount,
          issues: issues.slice(0, 15),
        });
      }

      // Commit valid rows
      const insertQ = db.prepare(`
        INSERT INTO questions (
          id, question_text, question_text_bn, option_a, option_b, option_c, option_d,
          option_a_bn, option_b_bn, option_c_bn, option_d_bn,
          correct_answer, explanation, short_explanation, important_fact, exam_tip,
          exam_id, subject_id, chapter_id, topic_id, difficulty, tags, is_pyq,
          quality_score, confidence_score, lifecycle_status, verification_status
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?,
          ?, ?, 'Approved', 'Verified'
        )
      `);

      db.transaction(() => {
        for (const r of validRows) {
          const qId = `q-imp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
          insertQ.run(
            qId,
            r.question_text,
            r.question_text_bn || null,
            r.option_a,
            r.option_b,
            r.option_c,
            r.option_d,
            r.option_a_bn || null,
            r.option_b_bn || null,
            r.option_c_bn || null,
            r.option_d_bn || null,
            r.correct_answer.toUpperCase(),
            r.explanation || 'Detailed explanation will be updated shortly.',
            r.short_explanation || null,
            r.important_fact || null,
            r.exam_tip || null,
            r.exam_id || 'exam-wbcs',
            r.subject_id || 'sub-inm',
            r.chapter_id || null,
            r.topic_id || null,
            r.difficulty || 'Moderate',
            r.tags || 'Imported, WB Exam',
            r.is_pyq ? 1 : 0,
            90.0,
            95.0
          );
        }
      })();

      return NextResponse.json({
        success: true,
        importedCount: validRows.length,
        invalidCount,
        duplicateCount,
      });
    }

    // Single Question Creation
    const {
      question_text,
      question_text_bn,
      option_a,
      option_b,
      option_c,
      option_d,
      option_a_bn,
      option_b_bn,
      option_c_bn,
      option_d_bn,
      correct_answer,
      explanation,
      explanation_bn,
      short_explanation,
      important_fact,
      exam_tip,
      exam_id,
      stage_id,
      paper_id,
      subject_id,
      chapter_id,
      topic_id,
      difficulty = 'Moderate',
      tags,
      is_pyq = 0,
      pyq_year,
      pyq_source,
      source_doc,
    } = body;

    if (!question_text || !option_a || !option_b || !option_c || !option_d || !correct_answer) {
      return NextResponse.json({ error: 'Question text, all 4 options, and correct answer are required.' }, { status: 400 });
    }

    const qId = `q-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    db.transaction(() => {
      db.prepare(`
        INSERT INTO questions (
          id, question_text, question_text_bn,
          option_a, option_b, option_c, option_d,
          option_a_bn, option_b_bn, option_c_bn, option_d_bn,
          correct_answer, explanation, explanation_bn,
          short_explanation, important_fact, exam_tip,
          exam_id, stage_id, paper_id, subject_id, chapter_id, topic_id,
          question_type, difficulty, language, tags, is_pyq,
          quality_score, confidence_score, lifecycle_status, verification_status
        ) VALUES (
          ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          'MCQ', ?, 'Bilingual', ?, ?,
          92.0, 96.0, 'Approved', 'Verified'
        )
      `).run(
        qId,
        question_text,
        question_text_bn || null,
        option_a,
        option_b,
        option_c,
        option_d,
        option_a_bn || null,
        option_b_bn || null,
        option_c_bn || null,
        option_d_bn || null,
        correct_answer.toUpperCase(),
        explanation || 'Verified with official West Bengal syllabus source.',
        explanation_bn || null,
        short_explanation || null,
        important_fact || null,
        exam_tip || null,
        exam_id || null,
        stage_id || null,
        paper_id || null,
        subject_id || null,
        chapter_id || null,
        topic_id || null,
        difficulty,
        tags || 'WBPSC, Mock Bank',
        is_pyq ? 1 : 0
      );

      if (is_pyq && pyq_year) {
        db.prepare(`
          INSERT INTO pyq_metadata (id, question_id, exam_id, exam_year, paper_name, source_name, source_doc)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(
          `pyq-${qId}`,
          qId,
          exam_id || 'exam-wbcs',
          pyq_year,
          'Prelims Composite Paper',
          pyq_source || 'WBPSC Archive',
          source_doc || 'Official Paper'
        );
      }
    })();

    return NextResponse.json({ success: true, questionId: qId });
  } catch (error: any) {
    console.error('Error creating question:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
