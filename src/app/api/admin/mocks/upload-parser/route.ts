import { NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { getStructuredGSExplanation, getDetailedEnglishAnalysis } from '@/lib/detailedExplanationEngine';

export const dynamic = 'force-dynamic';

interface ParsedQuestion {
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
  correct_answer: string;
  explanation?: string;
  explanation_bn?: string;
  important_fact?: string;
  exam_tip?: string;
  subject_id?: string;
  difficulty?: string;
}

// Helper to determine subject from text
function detectSubject(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('article') || t.includes('constitution') || t.includes('president') || t.includes('parliament') || t.includes('amendment') || t.includes('fundamental right') || t.includes('governor') || t.includes('panchayat') || t.includes('supreme court') || t.includes('সংবিধান') || t.includes('অনুচ্ছেদ')) {
    return 'sub-polity';
  }
  if (t.includes('gandhi') || t.includes('congress') || t.includes('swadeshi') || t.includes('movement') || t.includes('revolt') || t.includes('british') || t.includes('viceroy') || t.includes('satyagraha') || t.includes('নেহরু') || t.includes('আন্দোলন')) {
    return 'sub-inm';
  }
  if (t.includes('mughal') || t.includes('maurya') || t.includes('gupta') || t.includes('sultanate') || t.includes('harappa') || t.includes('ancient') || t.includes('battle of') || t.includes('হরপ্পা') || t.includes('মৌর্য')) {
    return 'sub-hist';
  }
  if (t.includes('river') || t.includes('plateau') || t.includes('soil') || t.includes('climate') || t.includes('monsoon') || t.includes('peak') || t.includes('district') || t.includes('himalaya') || t.includes('sundarban') || t.includes('নদী') || t.includes('পাহাড়')) {
    return 'sub-geo-wb';
  }
  if (t.includes('rbi') || t.includes('inflation') || t.includes('gdp') || t.includes('fiscal') || t.includes('budget') || t.includes('five year plan') || t.includes('niti aayog') || t.includes('ব্যাংক') || t.includes('অর্থনীতি')) {
    return 'sub-econ';
  }
  if (t.includes('photosynthesis') || t.includes('cell') || t.includes('acid') || t.includes('velocity') || t.includes('vitamin') || t.includes('hormone') || t.includes('gravity') || t.includes('protein') || t.includes('রসায়ন') || t.includes('পদার্থ')) {
    return 'sub-sci';
  }
  if (t.includes('find the ratio') || t.includes('average of') || t.includes('simple interest') || t.includes('compound interest') || t.includes('speed of train') || t.includes('work in') || t.includes('শতকরা') || t.includes('অনুপাত') || t.includes('লাভ ও ক্ষতি')) {
    return 'sub-arith';
  }
  if (t.includes('synonym') || t.includes('antonym') || t.includes('idiom') || t.includes('preposition') || t.includes('fill in the blank') || t.includes('spelling') || t.includes('one word substitution') || t.includes('voice change')) {
    return 'sub-eng';
  }
  if (t.includes('সমাস') || t.includes('সন্ধি') || t.includes('বাগধারা') || t.includes('কারক') || t.includes('বিপরীত শব্দ')) {
    return 'sub-ben';
  }
  return 'sub-polity';
}

// Robust text parser for multiple question formats
function parseQuestionsFromRawText(rawText: string): ParsedQuestion[] {
  const questions: ParsedQuestion[] = [];
  const normalized = rawText.replace(/\r\n/g, '\n');

  // Split by Question markers (e.g., "1.", "Q1.", "Q.1", "Question 1:", "[1]")
  const qBlocks = normalized.split(/\n(?=(?:Q(?:uestion)?[\s.]*\d+[\s.:)]|\d+[\s.:)]))/i);

  for (const block of qBlocks) {
    const trimmed = block.trim();
    if (!trimmed || trimmed.length < 15) continue;

    // Extract Question Number and Statement
    const qMatch = trimmed.match(/^(?:Q(?:uestion)?[\s.]*\d+[\s.:)]|\d+[\s.:)])\s*([\s\S]+?)(?=(?:\([A-Da-d]\)|[A-Da-d][.)]|Answer|Ans|উত্তর|$))/i);
    const statement = qMatch ? qMatch[1].trim() : trimmed.split('\n')[0];

    // Extract Options A, B, C, D
    const optAMatch = trimmed.match(/(?:\(A\)|A[.)])\s*([\s\S]+?)(?=(?:\(B\)|B[.)]|Answer|Ans|উত্তর|$))/i);
    const optBMatch = trimmed.match(/(?:\(B\)|B[.)])\s*([\s\S]+?)(?=(?:\(C\)|C[.)]|Answer|Ans|উত্তর|$))/i);
    const optCMatch = trimmed.match(/(?:\(C\)|C[.)])\s*([\s\S]+?)(?=(?:\(D\)|D[.)]|Answer|Ans|উত্তর|$))/i);
    const optDMatch = trimmed.match(/(?:\(D\)|D[.)])\s*([\s\S]+?)(?=(?:Answer|Ans|উত্তর|Explanation|Exp|$))/i);

    const optA = optAMatch ? optAMatch[1].trim() : 'Option A';
    const optB = optBMatch ? optBMatch[1].trim() : 'Option B';
    const optC = optCMatch ? optCMatch[1].trim() : 'Option C';
    const optD = optDMatch ? optDMatch[1].trim() : 'Option D';

    // Extract Answer if present (e.g., "Ans: B", "Answer: (C)", "উত্তর: A")
    const ansMatch = trimmed.match(/(?:Answer|Ans|উত্তর|Correct Key)[\s.:]*\(?([A-Da-d])\)?/i);
    const correctKey = ansMatch ? ansMatch[1].toUpperCase() : 'A';

    // Extract custom explanation if present
    const expMatch = trimmed.match(/(?:Explanation|Exp|ব্যাখ্যা)[\s.:]*([\s\S]+)$/i);
    const customExp = expMatch ? expMatch[1].trim() : undefined;

    if (statement && optA && optB) {
      questions.push({
        question_text: statement,
        option_a: optA,
        option_b: optB,
        option_c: optC,
        option_d: optD,
        correct_answer: correctKey,
        explanation: customExp,
        subject_id: detectSubject(statement),
        difficulty: 'Moderate'
      });
    }
  }

  return questions;
}

export async function POST(request: Request) {
  try {
    const db = getDb();
    const contentType = request.headers.get('content-type') || '';
    let body: any = {};

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      let fileText = '';

      if (file) {
        const buffer = await file.arrayBuffer();
        const textDecoder = new TextDecoder('utf-8');
        fileText = textDecoder.decode(buffer);
      }

      body = {
        raw_text: formData.get('raw_text') || fileText,
        exam_id: formData.get('exam_id') || 'exam-wbcs',
        mock_title: formData.get('mock_title') || 'Uploaded Custom Mock Test',
        mock_type: formData.get('mock_type') || 'Full Length',
        duration_mins: parseInt(formData.get('duration_mins') as string) || 90,
        total_marks: parseFloat(formData.get('total_marks') as string) || 100,
        marks_per_correct: parseFloat(formData.get('marks_per_correct') as string) || 1.0,
        negative_marking: parseFloat(formData.get('negative_marking') as string) || 0.25,
        pass_marks: parseFloat(formData.get('pass_marks') as string) || 50,
        difficulty: formData.get('difficulty') || 'Moderate',
        is_pyq: formData.get('is_pyq') === 'true' || formData.get('is_pyq') === '1',
        pyq_year: formData.get('pyq_year') || '2024',
        pyq_paper: formData.get('pyq_paper') || 'Official Paper'
      };
    } else {
      body = await request.json();
    }

    const {
      raw_text = '',
      questions_list,
      exam_id = 'exam-wbcs',
      mock_title = 'Uploaded Custom Mock Test',
      mock_title_bn,
      mock_type = 'Full Length',
      duration_mins = 90,
      total_marks = 100,
      marks_per_correct = 1.0,
      negative_marking = 0.25,
      pass_marks = 50,
      difficulty = 'Moderate',
      is_pyq = false,
      pyq_year = 2024,
      pyq_paper = 'Uploaded Official Paper',
      auto_publish = true
    } = body;

    // Parse questions from raw text or use pre-parsed list
    let parsedQuestions: ParsedQuestion[] = [];
    if (Array.isArray(questions_list) && questions_list.length > 0) {
      parsedQuestions = questions_list;
    } else if (raw_text && raw_text.trim().length > 0) {
      parsedQuestions = parseQuestionsFromRawText(raw_text);
    }

    if (parsedQuestions.length === 0) {
      return NextResponse.json({
        error: 'No questions could be parsed from the provided file or text. Please ensure questions have numbers (e.g. 1.) and options (A, B, C, D).'
      }, { status: 400 });
    }

    // AI Enrichment of every question
    const enrichedQuestions: any[] = [];
    const mockId = `mock-upload-${Date.now()}`;
    const slug = `mock-upload-${Date.now().toString(36)}`;

    db.transaction(() => {
      // 1. Insert Mock Test
      db.prepare(`
        INSERT INTO mock_tests (
          id, title, title_bn, slug, exam_id, mock_type,
          duration_mins, total_marks, total_questions, marks_per_correct, negative_marking,
          pass_marks, difficulty, is_published, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).run(
        mockId,
        mock_title,
        mock_title_bn || null,
        slug,
        exam_id,
        is_pyq ? 'Previous-Year' : mock_type,
        duration_mins,
        total_marks,
        parsedQuestions.length,
        marks_per_correct,
        negative_marking,
        pass_marks,
        difficulty,
        auto_publish ? 1 : 0
      );

      const insertQuestion = db.prepare(`
        INSERT INTO questions (
          id, question_text, question_text_bn,
          option_a, option_b, option_c, option_d,
          option_a_bn, option_b_bn, option_c_bn, option_d_bn,
          correct_answer, explanation, explanation_bn, important_fact, exam_tip,
          exam_id, subject_id, question_type, difficulty, language, tags, is_pyq,
          quality_score, confidence_score, lifecycle_status, verification_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'MCQ', ?, 'Bilingual', ?, ?, 98.0, 99.0, 'Approved', 'Verified')
      `);

      const insertMQ = db.prepare(`
        INSERT INTO mock_questions (id, mock_id, question_id, order_index, section_name, marks, negative_marks)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      const insertPyq = db.prepare(`
        INSERT INTO pyq_metadata (
          id, question_id, exam_id, exam_year, exam_date, paper_name, shift, question_num,
          source_name, source_url, source_doc, import_date
        ) VALUES (?, ?, ?, ?, ?, ?, 'Standard Session', ?, 'Uploaded Document Source', 'https://wb-decoded.local', ?, CURRENT_TIMESTAMP)
      `);

      let order = 1;
      for (const q of parsedQuestions) {
        const qId = `q-up-${Date.now()}-${order}`;
        const correctKey = (q.correct_answer || 'A').toUpperCase();
        const subId = q.subject_id || detectSubject(q.question_text);

        // Generate AI-enriched explanation
        let explanationEn = q.explanation;
        let explanationBn = q.explanation_bn;
        let fact = q.important_fact;
        let tip = q.exam_tip;

        if (!explanationEn) {
          const gsAnalysis = getStructuredGSExplanation({
            question_text: q.question_text,
            option_a: q.option_a,
            option_b: q.option_b,
            option_c: q.option_c,
            option_d: q.option_d,
            correct_answer: correctKey,
            explanation: `Official answer is Option (${correctKey}). Analysis of core concepts in ${q.question_text}`,
            explanation_bn: q.question_text_bn ? `প্রশ্ন: ${q.question_text_bn}` : undefined,
            subject_name: subId
          });

          explanationEn = `Option (${correctKey}) is the correct answer.\n\n` +
            `📌 Core Concept: ${gsAnalysis.coreConcept}\n` +
            `🔑 Key Facts:\n` +
            gsAnalysis.keyPoints.map(p => `• ${p}`).join('\n');

          explanationBn = `সঠিক উত্তর হলো অপশন (${correctKey})।\n` +
            `📌 মূল তথ্য: ${gsAnalysis.bengaliTranslation || 'পরীক্ষার সিলেবাস ভিত্তিক বিশ্লেষণ।'}`;

          fact = gsAnalysis.subjectFacts[0] || 'Essential revision point for competitive examinations.';
          tip = gsAnalysis.examTrapNote || 'Carefully verify key terminology in the multiple choice options.';
        }

        insertQuestion.run(
          qId,
          q.question_text,
          q.question_text_bn || null,
          q.option_a,
          q.option_b,
          q.option_c,
          q.option_d,
          q.option_a_bn || null,
          q.option_b_bn || null,
          q.option_c_bn || null,
          q.option_d_bn || null,
          correctKey,
          explanationEn,
          explanationBn,
          fact,
          tip,
          exam_id,
          subId,
          q.difficulty || difficulty,
          `Uploaded Mock Test, ${mock_title}`,
          is_pyq ? 1 : 0
        );

        insertMQ.run(
          `mq-${mockId}-${order}`,
          mockId,
          qId,
          order,
          'General Section',
          marks_per_correct,
          negative_marking
        );

        if (is_pyq) {
          insertPyq.run(
            `pyq-${mockId}-${qId}`,
            qId,
            exam_id,
            pyq_year,
            `${pyq_year}-01-01`,
            pyq_paper,
            order,
            `${mock_title.replace(/[^a-zA-Z0-9]/g, '_')}_Uploaded.pdf`
          );
        }

        enrichedQuestions.push({
          id: qId,
          question_text: q.question_text,
          option_a: q.option_a,
          option_b: q.option_b,
          option_c: q.option_c,
          option_d: q.option_d,
          correct_answer: correctKey,
          explanation: explanationEn,
          explanation_bn: explanationBn,
          subject_id: subId
        });

        order++;
      }

      // Audit log
      db.prepare(`
        INSERT INTO audit_logs (id, admin_name, admin_role, action, target_entity, target_id, details)
        VALUES (?, 'Super Admin', 'Super Admin', 'FILE_UPLOAD_MOCK_CREATE', 'mock_tests', ?, ?)
      `).run(`aud-${Date.now()}`, mockId, `Uploaded and created mock test: ${mock_title} with ${parsedQuestions.length} questions.`);
    })();

    return NextResponse.json({
      success: true,
      message: `Successfully parsed, enriched with AI explanations, and created mock test with ${parsedQuestions.length} questions!`,
      mock: {
        id: mockId,
        slug,
        title: mock_title,
        exam_id,
        total_questions: parsedQuestions.length,
        duration_mins,
        total_marks
      },
      questions: enrichedQuestions
    });
  } catch (error: any) {
    console.error('Error in upload-parser route:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
