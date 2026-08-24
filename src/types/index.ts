export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
  phone?: string;
  is_anonymous: number;
  target_exam_id?: string;
  streak_days: number;
  xp_points: number;
  created_at: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Content Manager' | 'Reviewer' | 'Analyst' | 'Support';
  status: 'active' | 'inactive';
  last_login_at?: string;
  created_at: string;
}

export interface ExamCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order_index: number;
  exams_count?: number;
}

export interface Exam {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  authority: string;
  description: string;
  syllabus: string;
  official_website: string;
  notification_url: string;
  icon: string;
  banner: string;
  color_theme: string;
  is_active: number;
  created_at: string;
  category_name?: string;
  mocks_count?: number;
  pyqs_count?: number;
  questions_count?: number;
}

export interface Stage {
  id: string;
  exam_id: string;
  name: string;
  order_index: number;
}

export interface Paper {
  id: string;
  stage_id: string;
  name: string;
  code: string;
  order_index: number;
}

export interface Subject {
  id: string;
  paper_id?: string;
  name: string;
  code: string;
  icon: string;
  color: string;
  order_index: number;
  questions_count?: number;
}

export interface Chapter {
  id: string;
  subject_id: string;
  name: string;
  order_index: number;
  topics_count?: number;
}

export interface Topic {
  id: string;
  chapter_id: string;
  name: string;
  order_index: number;
  questions_count?: number;
}

export interface Subtopic {
  id: string;
  topic_id: string;
  name: string;
  order_index: number;
}

export interface SubjectDistributionItem {
  subject: string;
  count: number;
  marks: number;
}

export interface ExamPattern {
  id: string;
  exam_id: string;
  stage_id?: string;
  paper_id?: string;
  year_effective: number;
  total_questions: number;
  total_marks: number;
  duration_mins: number;
  marks_per_correct: number;
  negative_marking: number;
  passing_marks: number;
  section_timing_enabled: number;
  pyq_allowed: number;
  current_affairs_allowed: number;
  subject_distribution_json?: string;
  difficulty_distribution_json?: string;
  duplicate_policy: string;
  is_active: number;
}

export interface Question {
  id: string;
  question_text: string;
  question_text_bn?: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_a_bn?: string;
  option_b_bn?: string;
  option_c_bn?: string;
  option_d_bn?: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  explanation_bn?: string;
  short_explanation?: string;
  important_fact?: string;
  exam_tip?: string;
  exam_id?: string;
  stage_id?: string;
  paper_id?: string;
  subject_id?: string;
  chapter_id?: string;
  topic_id?: string;
  subtopic_id?: string;
  question_type: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  language: string;
  tags?: string;
  is_pyq: number;
  quality_score: number;
  confidence_score: number;
  duplicate_score: number;
  report_count: number;
  attempt_count: number;
  correct_count: number;
  avg_time_secs: number;
  lifecycle_status: 'Draft' | 'Processing' | 'Verification pending' | 'Approved' | 'Published' | 'Archived' | 'Rejected';
  verification_status: 'Unverified' | 'AI Verified' | 'Verified' | 'Flagged';
  last_verified_at?: string;
  created_at: string;
  exam_name?: string;
  subject_name?: string;
  topic_name?: string;
  pyq_year?: number;
  pyq_source?: string;
  source_doc?: string;
}

export interface PYQMetadata {
  id: string;
  question_id: string;
  exam_id: string;
  exam_year: number;
  exam_date?: string;
  paper_name?: string;
  shift?: string;
  question_num?: number;
  source_name?: string;
  source_url?: string;
  source_doc?: string;
  import_date: string;
}

export interface MockTest {
  id: string;
  title: string;
  title_bn?: string;
  slug: string;
  exam_id: string;
  stage_id?: string;
  paper_id?: string;
  mock_type: 'Full Length' | 'PYQ' | 'PYQ-only' | 'PYQ + Original' | 'Chapter-wise' | 'Topic-wise' | 'Mixed' | 'Custom' | 'Weak-area' | 'Revision';
  duration_mins: number;
  total_marks: number;
  total_questions: number;
  marks_per_correct: number;
  negative_marking: number;
  pass_marks?: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Mixed';
  pyq_ratio: number;
  is_published: number;
  is_featured: number;
  is_premium: number;
  attempt_count: number;
  avg_score: number;
  metadata_json?: string;
  created_at: string;
  exam_name?: string;
  authority?: string;
  questions?: (Question & { order_index?: number; marks?: number; negative_marks?: number; section_name?: string })[];
}

export interface TestAttempt {
  id: string;
  user_id: string;
  mock_id: string;
  exam_id?: string;
  started_at: string;
  completed_at?: string;
  score: number;
  accuracy: number;
  total_correct: number;
  total_wrong: number;
  total_skipped: number;
  total_marked: number;
  time_spent_secs: number;
  rank: number;
  percentile: number;
  status: 'in_progress' | 'completed';
  subject_breakdown_json?: string;
  created_at: string;
  mock_title?: string;
  exam_name?: string;
}

export interface AttemptAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_option?: 'A' | 'B' | 'C' | 'D' | null;
  correct_answer: string;
  is_correct: number;
  time_spent_secs: number;
  is_marked_for_review: number;
}

export interface MistakeItem {
  id: string;
  user_id: string;
  question_id: string;
  mistake_type: 'Wrong answer' | 'Silly mistake' | 'Time pressure' | 'Concept gap' | 'Guessing';
  status: 'Need Revision' | 'Understood';
  notes?: string;
  review_count: number;
  last_reviewed_at?: string;
  created_at: string;
  question?: Question;
}

export interface WeakArea {
  id: string;
  user_id: string;
  exam_id: string;
  subject_id: string;
  topic_id: string;
  total_attempted: number;
  correct_count: number;
  accuracy_pct: number;
  avg_speed_secs: number;
  recommendation_note?: string;
  last_updated_at: string;
  subject_name?: string;
  topic_name?: string;
  exam_name?: string;
}

export interface SourceRegistryItem {
  id: string;
  name: string;
  website: string;
  url: string;
  authority: string;
  source_type: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4';
  license_status: string;
  reliability_score: number;
  last_checked?: string;
  last_successful_import?: string;
  is_enabled: number;
}

export interface AutomationRun {
  id: string;
  job_name: string;
  job_type: string;
  started_at: string;
  completed_at?: string;
  duration_secs?: number;
  status: 'Running' | 'Success' | 'Failed' | 'Paused';
  items_found: number;
  items_processed: number;
  items_failed: number;
  items_requiring_review: number;
  log_summary?: string;
  error_details?: string;
}

export interface QuestionReport {
  id: string;
  question_id: string;
  user_id?: string;
  reason: string;
  comment?: string;
  status: 'Pending' | 'Resolved' | 'Rejected';
  admin_notes?: string;
  resolved_by?: string;
  resolved_at?: string;
  created_at: string;
  question_text?: string;
}

export interface AuditLog {
  id: string;
  admin_name: string;
  admin_role: string;
  action: string;
  target_entity?: string;
  target_id?: string;
  details?: string;
  old_value?: string;
  new_value?: string;
  ip_address?: string;
  created_at: string;
}

export interface ExamUpdate {
  id: string;
  exam_id?: string;
  title: string;
  source_url?: string;
  authority?: string;
  update_type: string;
  description?: string;
  detected_at: string;
  is_acknowledged: number;
  status: string;
  exam_name?: string;
}

export interface DailyChallenge {
  id: string;
  date_str: string;
  title: string;
  exam_id?: string;
  question_count: number;
  duration_mins: number;
  questions_json: string;
  total_participants: number;
  avg_score: number;
  is_published: number;
}

export interface CurrentAffairsItem {
  id: string;
  headline: string;
  category: string;
  event_date: string;
  summary: string;
  key_facts: string;
  question_id?: string;
  source_name?: string;
  source_url?: string;
  is_processed: number;
}
