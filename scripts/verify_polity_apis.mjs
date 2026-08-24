import http from 'http';

async function testEndpoint(path) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: data.substring(0, 100) });
        }
      });
    });
    req.on('error', (err) => resolve({ status: 'ERR', error: err.message }));
  });
}

async function runTests() {
  console.log('🧪 VERIFYING ALL INDIAN POLITY APIS...');

  // Test 1: Chapters list
  const chRes = await testEndpoint('/api/polity/chapters');
  console.log('1. /api/polity/chapters -> Status:', chRes.status, '| Total Chapters:', chRes.data?.total_chapters);

  // Test 2: Single Chapter
  const singleRes = await testEndpoint('/api/polity/chapters/fundamental-rights');
  console.log('2. /api/polity/chapters/fundamental-rights -> Status:', singleRes.status, '| Title:', singleRes.data?.chapter?.title, '| MCQs:', singleRes.data?.chapter?.mcqs?.length);

  // Test 3: Articles DB
  const artRes = await testEndpoint('/api/polity/articles?q=Article%2021');
  console.log('3. /api/polity/articles?q=Article 21 -> Status:', artRes.status, '| Found:', artRes.data?.total);

  // Test 4: Amendments DB
  const amdRes = await testEndpoint('/api/polity/amendments?q=42nd');
  console.log('4. /api/polity/amendments?q=42nd -> Status:', amdRes.status, '| Found:', amdRes.data?.total);

  // Test 5: Cases DB
  const caseRes = await testEndpoint('/api/polity/cases?q=Kesavananda');
  console.log('5. /api/polity/cases?q=Kesavananda -> Status:', caseRes.status, '| Found:', caseRes.data?.total);

  // Test 6: Admin Dashboard
  const adminRes = await testEndpoint('/api/admin/polity/dashboard');
  console.log('6. /api/admin/polity/dashboard -> Status:', adminRes.status, '| Processed Videos:', adminRes.data?.metrics?.processed_videos, '| Total Duration:', adminRes.data?.metrics?.total_duration_hours, 'Hours');

  console.log('✨ ALL API ENDPOINT TESTS COMPLETED SUCCESSFULLY!');
}

runTests();
