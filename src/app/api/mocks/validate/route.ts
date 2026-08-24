import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export async function POST(request: Request) {
  try {
    const db = getDb();
    const body = await request.json();
    const { mock_id } = body;

    if (!mock_id) {
      return NextResponse.json({ error: 'mock_id is required' }, { status: 400 });
    }

    const mock: any = db.prepare(`
      SELECT m.*, e.name as exam_name
      FROM mock_tests m
      JOIN exams e ON m.exam_id = e.id
      WHERE m.id = ?
    `).get(mock_id);

    if (!mock) {
      return NextResponse.json({ error: 'Mock test not found' }, { status: 404 });
    }

    const questions = db.prepare(`
      SELECT q.*, mq.order_index, s.name as subject_name
      FROM mock_questions mq
      JOIN questions q ON mq.question_id = q.id
      LEFT JOIN subjects s ON q.subject_id = s.id
      WHERE mq.mock_id = ?
      ORDER BY mq.order_index ASC
    `).all(mock_id);

    const checks: { rule: string; passed: boolean; message: string; severity: 'error' | 'warning' | 'info' }[] = [];

    // Rule 1: Question Count
    const countPassed = questions.length === mock.total_questions && questions.length > 0;
    checks.push({
      rule: 'Question Count Integrity',
      passed: countPassed,
      message: countPassed ? `Accurately contains ${questions.length} questions.` : `Mismatch: expected ${mock.total_questions} questions, found ${questions.length}.`,
      severity: 'error',
    });

    // Rule 2: Duration Integrity
    const durationPassed = mock.duration_mins >= 10 && mock.duration_mins <= 300;
    checks.push({
      rule: 'Duration Parameter Check',
      passed: durationPassed,
      message: durationPassed ? `Test duration set to ${mock.duration_mins} minutes.` : 'Duration outside typical exam thresholds (10-300 mins).',
      severity: 'warning',
    });

    // Rule 3: Marking Scheme
    const marksPassed = mock.marks_per_correct > 0 && mock.negative_marking >= 0;
    checks.push({
      rule: 'Marking Scheme Validation',
      passed: marksPassed,
      message: `+${mock.marks_per_correct} correct, -${mock.negative_marking} negative marking.`,
      severity: 'error',
    });

    // Rule 4: Duplicate Questions within Mock
    const qIds = questions.map((q: any) => q.id);
    const uniqueQIds = new Set(qIds);
    const noDuplicates = qIds.length === uniqueQIds.size;
    checks.push({
      rule: 'Internal Question Duplication Check',
      passed: noDuplicates,
      message: noDuplicates ? 'Zero duplicate questions detected.' : `Found ${qIds.length - uniqueQIds.size} repeated questions inside this mock.`,
      severity: 'error',
    });

    // Rule 5: Missing Answers or Options
    const invalidQuestions = questions.filter((q: any) => !q.option_a || !q.option_b || !q.option_c || !q.option_d || !['A', 'B', 'C', 'D'].includes(q.correct_answer));
    const allValidOptions = invalidQuestions.length === 0;
    checks.push({
      rule: 'Options & Answer Completeness',
      passed: allValidOptions,
      message: allValidOptions ? 'All questions have complete 4-option cards and valid keys.' : `${invalidQuestions.length} questions contain missing options or empty answer keys.`,
      severity: 'error',
    });

    // Rule 6: Subject Diversity
    const subjectsMap: Record<string, number> = {};
    questions.forEach((q: any) => {
      const sName = q.subject_name || 'Unclassified';
      subjectsMap[sName] = (subjectsMap[sName] || 0) + 1;
    });
    const subjectCount = Object.keys(subjectsMap).length;
    const diversityPassed = subjectCount >= 2 || questions.length <= 10;
    checks.push({
      rule: 'Subject Distribution Balance',
      passed: diversityPassed,
      message: `Covers ${subjectCount} subjects (${Object.entries(subjectsMap).map(([s, c]) => `${s}: ${c}`).join(', ')}).`,
      severity: 'info',
    });

    // Rule 7: Difficulty Distribution
    const diffMap: Record<string, number> = { Easy: 0, Moderate: 0, Hard: 0 };
    questions.forEach((q: any) => {
      if (diffMap[q.difficulty] !== undefined) diffMap[q.difficulty]++;
    });
    checks.push({
      rule: 'Difficulty Calibration Balance',
      passed: true,
      message: `Spread: Easy ${diffMap.Easy}, Moderate ${diffMap.Moderate}, Hard ${diffMap.Hard}.`,
      severity: 'info',
    });

    // Rule 8: Verification Status of Questions
    const unverified = questions.filter((q: any) => q.verification_status === 'Unverified' || q.verification_status === 'Flagged');
    const allVerified = unverified.length === 0;
    checks.push({
      rule: 'Question Verification Status',
      passed: allVerified,
      message: allVerified ? 'All included questions are officially verified.' : `${unverified.length} questions are unverified or flagged.`,
      severity: 'warning',
    });

    // Rule 9: Explanation Presence
    const missingExplanations = questions.filter((q: any) => !q.explanation || q.explanation.length < 15);
    const hasExplanations = missingExplanations.length === 0;
    checks.push({
      rule: 'In-Depth Explanations Coverage',
      passed: hasExplanations,
      message: hasExplanations ? '100% of questions include rich explanations & exam tips.' : `${missingExplanations.length} questions lack detailed explanations.`,
      severity: 'warning',
    });

    // Rule 10: Reported Questions Check
    const reported = questions.filter((q: any) => q.report_count > 0);
    const noReports = reported.length === 0;
    checks.push({
      rule: 'Student Report Absence',
      passed: noReports,
      message: noReports ? 'No pending student dispute reports on these questions.' : `${reported.length} questions have active student issue reports.`,
      severity: 'warning',
    });

    // Rule 11: Bilingual Support Check
    const bengaliTextCount = questions.filter((q: any) => !!q.question_text_bn).length;
    checks.push({
      rule: 'Bilingual (Bengali/English) Content',
      passed: true,
      message: `${bengaliTextCount} of ${questions.length} questions feature authentic Bengali translations.`,
      severity: 'info',
    });

    // Rule 12: Quality Score Metric
    const avgQuality = questions.reduce((acc: number, q: any) => acc + (q.quality_score || 85), 0) / (questions.length || 1);
    const qualityPassed = avgQuality >= 80;
    checks.push({
      rule: 'Overall Question Bank Quality Score',
      passed: qualityPassed,
      message: `Average quality score is ${avgQuality.toFixed(1)} / 100.`,
      severity: 'info',
    });

    const hasCriticalErrors = checks.some(c => c.severity === 'error' && !c.passed);
    const isValid = !hasCriticalErrors;

    return NextResponse.json({
      isValid,
      status: isValid ? 'PASSED' : 'FAILED',
      summary: isValid ? 'Mock test successfully validated and ready for publish.' : 'Mock validation failed critical criteria. Please resolve errors before publishing.',
      checks,
      mock: {
        id: mock.id,
        title: mock.title,
        questions_count: questions.length,
        total_marks: mock.total_marks,
      }
    });
  } catch (error: any) {
    console.error('Error validating mock:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
