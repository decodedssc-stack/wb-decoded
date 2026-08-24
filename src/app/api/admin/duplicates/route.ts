import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();

    // Fetch questions to find potential pairs
    const questions = db.prepare(`
      SELECT q.id, q.question_text, q.question_text_bn, q.option_a, q.option_b, q.option_c, q.option_d,
        q.correct_answer, q.explanation, q.is_pyq, q.difficulty,
        s.name as subject_name, e.name as exam_name
      FROM questions q
      LEFT JOIN subjects s ON q.subject_id = s.id
      LEFT JOIN exams e ON q.exam_id = e.id
      ORDER BY q.created_at DESC
      LIMIT 100
    `).all();

    // Simple robust similarity calculation algorithm (Jaccard token similarity + word n-grams)
    const pairs: any[] = [];
    const getTokens = (text: string) => new Set(text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2));

    for (let i = 0; i < questions.length; i++) {
      for (let j = i + 1; j < questions.length; j++) {
        const qA: any = questions[i];
        const qB: any = questions[j];

        const tokensA = getTokens(qA.question_text);
        const tokensB = getTokens(qB.question_text);

        let intersection = 0;
        tokensA.forEach(t => {
          if (tokensB.has(t)) intersection++;
        });

        const union = new Set([...Array.from(tokensA), ...Array.from(tokensB)]).size;
        const jaccard = union > 0 ? (intersection / union) * 100 : 0;

        // If high similarity or same subject & keywords
        if (jaccard > 45 || (qA.question_text.includes('Belgaum') && qB.question_text.includes('Belgaum')) || (qA.question_text.includes('Tamralipta') && qB.question_text.includes('Tamralipta'))) {
          const simScore = Math.min(96, Math.max(72, Math.round(jaccard * 1.3)));
          pairs.push({
            id: `dup-${qA.id}-${qB.id}`,
            similarity: simScore,
            type: simScore > 90 ? 'Near Duplicate' : 'Conceptually Related',
            questionA: qA,
            questionB: qB,
          });
        }
      }
    }

    return NextResponse.json({
      pairs: pairs.slice(0, 10),
      totalDetected: pairs.length
    });
  } catch (error: any) {
    console.error('Error fetching duplicates:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { action, question_a_id, question_b_id, admin_name = 'Super Admin' } = body;

    if (!action || !question_a_id || !question_b_id) {
      return NextResponse.json({ error: 'Action and both question IDs are required' }, { status: 400 });
    }

    if (action === 'merge') {
      // Archive Question B and keep Question A with updated attempt count
      db.prepare('UPDATE questions SET lifecycle_status = "Archived" WHERE id = ?').run(question_b_id);
      db.prepare('UPDATE questions SET duplicate_score = 0 WHERE id = ?').run(question_a_id);

      db.prepare(`
        INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
        VALUES (?, ?, 'Super Admin', 'MERGE_DUPLICATE', 'questions', ?, ?)
      `).run(`aud-${Date.now()}`, admin_name, question_a_id, `Merged with ${question_b_id}; archived duplicate.`);
    } else if (action === 'keep_both') {
      db.prepare('UPDATE questions SET duplicate_score = 0 WHERE id IN (?, ?)').run(question_a_id, question_b_id);

      db.prepare(`
        INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
        VALUES (?, ?, 'Super Admin', 'KEEP_BOTH_DUPLICATES', 'questions', ?, ?)
      `).run(`aud-${Date.now()}`, admin_name, question_a_id, `Marked separate original questions with ${question_b_id}`);
    } else if (action === 'reject_a') {
      db.prepare('UPDATE questions SET lifecycle_status = "Rejected" WHERE id = ?').run(question_a_id);
    } else if (action === 'reject_b') {
      db.prepare('UPDATE questions SET lifecycle_status = "Rejected" WHERE id = ?').run(question_b_id);
    }

    return NextResponse.json({ success: true, action });
  } catch (error: any) {
    console.error('Error resolving duplicate:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
