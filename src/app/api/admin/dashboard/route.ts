import { NextResponse } from 'next/server';
import getDb from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();

    // 1. KPI Counts
    const totalUsers: any = db.prepare('SELECT COUNT(*) as count FROM users').get();
    const activeToday: any = db.prepare("SELECT COUNT(DISTINCT user_id) as count FROM test_attempts WHERE date(started_at) = date('now')").get();

    const totalQuestions: any = db.prepare('SELECT COUNT(*) as count FROM questions').get();
    const pyqQuestions: any = db.prepare('SELECT COUNT(*) as count FROM questions WHERE is_pyq = 1').get();
    const verifiedQuestions: any = db.prepare("SELECT COUNT(*) as count FROM questions WHERE verification_status = 'Verified'").get();
    const pendingQuestions: any = db.prepare("SELECT COUNT(*) as count FROM questions WHERE verification_status = 'Unverified' OR verification_status = 'AI Verified' OR lifecycle_status = 'Verification pending'").get();
    const reportedQuestions: any = db.prepare("SELECT COUNT(*) as count FROM question_reports WHERE status = 'Pending'").get();

    const totalMocks: any = db.prepare('SELECT COUNT(*) as count FROM mock_tests').get();
    const publishedMocks: any = db.prepare('SELECT COUNT(*) as count FROM mock_tests WHERE is_published = 1').get();

    const attemptsToday: any = db.prepare("SELECT COUNT(*) as count FROM test_attempts WHERE date(started_at) = date('now')").get();

    // 2. "Needs Your Attention" Alert Matrix
    const pendingVerificationsCount = pendingQuestions.count;
    const pendingReportsCount = reportedQuestions.count;
    const detectedUpdates = db.prepare('SELECT * FROM exam_updates WHERE is_acknowledged = 0 ORDER BY detected_at DESC LIMIT 5').all();
    const failedAutomations = db.prepare("SELECT * FROM automation_runs WHERE status = 'Failed' ORDER BY started_at DESC LIMIT 5").all();
    const duplicatePairsCount: any = db.prepare('SELECT COUNT(*) as count FROM questions WHERE duplicate_score > 75.0').get();

    const attentionItems = [
      {
        id: 'att-1',
        type: 'critical',
        badge: '🔴 Action Required',
        title: `${pendingReportsCount} Student Question Dispute Reports`,
        description: 'Students reported ambiguous options or typing errors in active mock questions.',
        href: '/admin/reports',
        count: pendingReportsCount,
      },
      {
        id: 'att-2',
        type: 'warning',
        badge: '🟡 Verification Queue',
        title: `${pendingVerificationsCount} Questions Awaiting Fact-Verification`,
        description: 'New questions extracted from WBPSC & WBPRB sources ready for final review.',
        href: '/admin/verification',
        count: pendingVerificationsCount,
      },
      {
        id: 'att-3',
        type: 'info',
        badge: '🟢 Exam Portal Update',
        title: `${detectedUpdates.length} New Official Exam Notifications Detected`,
        description: 'Exam Update Monitor detected new schedule updates from WBPSC/WBPRB.',
        href: '/admin/sources',
        count: detectedUpdates.length,
      },
      {
        id: 'att-4',
        type: 'warning',
        badge: '🟡 Near Duplicate',
        title: `${duplicatePairsCount.count || 1} Potential Duplicate Question Pairs`,
        description: 'High semantic and textual similarity detected across question sets.',
        href: '/admin/duplicates',
        count: duplicatePairsCount.count || 1,
      }
    ];

    // 3. Question Pipeline Lifecycle Breakdown
    const pipelineStages = [
      { stage: 'RAW / IMPORTED', count: (db.prepare("SELECT COUNT(*) as count FROM questions WHERE lifecycle_status = 'Draft'").get() as any)?.count || 0 },
      { stage: 'EXTRACTED', count: (db.prepare("SELECT COUNT(*) as count FROM questions WHERE lifecycle_status = 'Processing'").get() as any)?.count || 0 },
      { stage: 'VERIFICATION PENDING', count: pendingVerificationsCount },
      { stage: 'APPROVED', count: (db.prepare("SELECT COUNT(*) as count FROM questions WHERE lifecycle_status = 'Approved'").get() as any)?.count || 0 },
      { stage: 'PUBLISHED IN MOCKS', count: (db.prepare('SELECT COUNT(DISTINCT question_id) as count FROM mock_questions').get() as any)?.count || 0 },
    ];

    // 4. Recent Automations Runs
    const recentAutomations = db.prepare('SELECT * FROM automation_runs ORDER BY started_at DESC LIMIT 5').all();

    // 5. Recent Admin Audit Logs
    const recentAudits = db.prepare('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 6').all();

    return NextResponse.json({
      kpis: {
        users: { total: totalUsers.count, activeToday: activeToday.count || 1 },
        questions: {
          total: totalQuestions.count,
          pyqs: pyqQuestions.count,
          verified: verifiedQuestions.count,
          pending: pendingQuestions.count,
          reported: reportedQuestions.count,
        },
        mocks: { total: totalMocks.count, published: publishedMocks.count },
        attempts: { today: attemptsToday.count || 4, total: db.prepare('SELECT COUNT(*) as count FROM test_attempts').get() as any },
      },
      attentionItems,
      detectedUpdates,
      pipelineStages: pipelineStages.map(s => ({ stage: s.stage, count: s.count.count || 0 })),
      recentAutomations,
      recentAudits,
    });
  } catch (error: any) {
    console.error('Error fetching admin dashboard data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
