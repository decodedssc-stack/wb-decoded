async function test() {
  // 1. Test AI Explain Endpoint
  const expRes = await fetch('http://localhost:3000/api/admin/questions/ai-explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question_text: 'Which Article of the Indian Constitution empowers the High Courts to issue writs for the enforcement of Fundamental Rights?',
      question_text_bn: 'ভারতীয় সংবিধানের কোন অনুচ্ছেদ অনুযায়ী হাইকোর্ট মৌলিক অধিকার বলবৎ করার জন্য রিট জারি করতে পারে?',
      option_a: 'Article 32',
      option_b: 'Article 226',
      option_c: 'Article 136',
      option_d: 'Article 143',
      correct_answer: 'B',
      subject_id: 'sub-polity'
    })
  });
  const expData = await expRes.json();
  console.log('✅ 1. AI EXPLAIN TEST RESULT:');
  console.log('- Success:', expData.success);
  console.log('- Explanation English:\n', expData.explanation);
  console.log('- Explanation Bengali:\n', expData.explanation_bn);

  // 2. Test File / Text Upload Auto Mock Generator
  const sampleRawText = `1. Who founded the Brahmo Sabha in 1828?
(A) Swami Vivekananda
(B) Raja Ram Mohan Roy
(C) Ishwar Chandra Vidyasagar
(D) Keshab Chandra Sen
Ans: B

2. Which Indian state has the largest mangrove forest area in India?
(A) Gujarat
(B) West Bengal
(C) Odisha
(D) Andhra Pradesh
Ans: B`;

  const upRes = await fetch('http://localhost:3000/api/admin/mocks/upload-parser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      raw_text: sampleRawText,
      exam_id: 'exam-wbcs',
      mock_title: 'Admin Verification Custom Upload Mock',
      duration_mins: 30,
      total_marks: 50,
      marks_per_correct: 2.0,
      negative_marking: 0.50,
      pass_marks: 25,
      difficulty: 'Moderate',
      auto_publish: true
    })
  });
  const upData = await upRes.json();
  console.log('\n✅ 2. UPLOAD AUTO-PARSER & MOCK GENERATOR TEST RESULT:');
  console.log('- Success:', upData.success);
  console.log('- Created Mock ID:', upData.mock?.id);
  console.log('- Total Questions Parsed & AI Enriched:', upData.questions?.length);
  console.log('- Sample Enriched Question 1 Explanation:\n', upData.questions?.[0]?.explanation);
  console.log('- Sample Enriched Question 2 Explanation:\n', upData.questions?.[1]?.explanation);
}

test();
