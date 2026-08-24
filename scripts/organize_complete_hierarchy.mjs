import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ Organizing complete Exam -> Subject -> Chapter -> Topic Hierarchy...');

db.transaction(() => {
  // 1. Standardized Subjects
  const insertSub = db.prepare(`
    INSERT OR REPLACE INTO subjects (id, name, code, icon, color, order_index)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertSub.run('sub-inm', 'Indian National Movement', 'INM', 'Flag', '#DC2626', 1);
  insertSub.run('sub-hist', 'History of India & Bengal', 'HIST', 'Landmark', '#B45309', 2);
  insertSub.run('sub-geo-wb', 'Geography of India & West Bengal', 'GEO-WB', 'MapPin', '#047857', 3);
  insertSub.run('sub-polity', 'Indian Polity & Constitution', 'POLITY', 'Scale', '#1D4ED8', 4);
  insertSub.run('sub-econ', 'Indian Economy & WB Schemes', 'ECON', 'Coins', '#7C3AED', 5);
  insertSub.run('sub-sci', 'General Science & Environment', 'SCI', 'Atom', '#0284C7', 6);
  insertSub.run('sub-arith', 'Arithmetic & Numerical Ability', 'ARITH', 'Calculator', '#D97706', 7);
  insertSub.run('sub-eng', 'English Composition & Grammar', 'ENG', 'BookOpen', '#4338CA', 8);
  insertSub.run('sub-gma', 'General Mental Ability & Reasoning', 'GMA', 'Brain', '#9333EA', 9);
  insertSub.run('sub-cdp', 'Child Development & Pedagogy', 'CDP', 'Smile', '#E11D48', 10);
  insertSub.run('sub-ben', 'Bengali Language & Literature', 'BEN', 'Feather', '#C026D3', 11);

  // 2. Chapters per Subject
  const insertChap = db.prepare(`
    INSERT OR REPLACE INTO chapters (id, subject_id, name, order_index)
    VALUES (?, ?, ?, ?)
  `);

  // INM Chapters
  insertChap.run('chap-inm-early', 'sub-inm', 'Early Resistance, Tribal & Peasant Uprisings (1857 & Santhal)', 1);
  insertChap.run('chap-inm-swadeshi', 'sub-inm', 'Partition of Bengal (1905), Swadeshi & Revolutionary Bengal', 2);
  insertChap.run('chap-inm-gandhi', 'sub-inm', 'Gandhian Mass Movements (Non-Cooperation, Civil Disobedience, Quit India)', 3);
  insertChap.run('chap-inm-ina', 'sub-inm', 'Subhas Chandra Bose, Forward Bloc & Azad Hind Fauj (INA)', 4);
  insertChap.run('chap-inm-transfer', 'sub-inm', 'Cabinet Mission, Indian Independence Act & Partition (1947)', 5);

  // History of India Chapters
  insertChap.run('chap-hist-ancient', 'sub-hist', 'Ancient India & Bengal (Indus Valley, Vedic, Mauryas, Guptas, Palas & Senas)', 1);
  insertChap.run('chap-hist-medieval', 'sub-hist', 'Delhi Sultanate, Mughal Empire & Nawabs of Bengal', 2);
  insertChap.run('chap-hist-british', 'sub-hist', 'British Expansion, Governor Generals & Socio-Religious Reforms', 3);
  insertChap.run('chap-hist-culture', 'sub-hist', 'Bengal Renaissance, Literature & Press History (Tagore, Hicky, Vidyasagar)', 4);

  // Geography of WB Chapters
  insertChap.run('chap-geo-physio', 'sub-geo-wb', 'Physiography, Mountain Peaks & Borders of West Bengal (Singalila, Sandakphu)', 1);
  insertChap.run('chap-geo-rivers', 'sub-geo-wb', 'Rivers & Drainage Systems of Bengal (Teesta, Torsa, Bhagirathi, Farakka)', 2);
  insertChap.run('chap-geo-climate', 'sub-geo-wb', 'Climate, Soils, Forest Cover & National Parks of WB (Jaldapara, Sundarbans)', 3);
  insertChap.run('chap-geo-districts', 'sub-geo-wb', 'Districts Demography, Tropic of Cancer & Economic Geography', 4);

  // Polity Chapters
  insertChap.run('chap-pol-framework', 'sub-polity', 'Constituent Assembly, Preamble & Salient Features of the Constitution', 1);
  insertChap.run('chap-pol-fr-dpsp', 'sub-polity', 'Fundamental Rights (Writs Art 32/226), Fundamental Duties & DPSP', 2);
  insertChap.run('chap-pol-judiciary', 'sub-polity', 'Judiciary: Supreme Court of India & Calcutta High Court Jurisdiction', 3);
  insertChap.run('chap-pol-panchayat', 'sub-polity', 'Local Self Government: 3-Tier Panchayati Raj & Municipalities in WB', 4);
  insertChap.run('chap-pol-bodies', 'sub-polity', 'Constitutional & Statutory Bodies (ECI Art 324, Finance Commission Art 280)', 5);

  // Economy & Schemes Chapters
  insertChap.run('chap-econ-planning', 'sub-econ', 'Five Year Plans, Harrod-Domar & Mahalanobis Growth Models', 1);
  insertChap.run('chap-econ-schemes', 'sub-econ', 'West Bengal State Welfare Schemes (Kanyashree, Rupashree, Swasthya Sathi)', 2);
  insertChap.run('chap-econ-welfare', 'sub-econ', 'Welfare Economics, Poverty Analysis & Amartya Sen Conceptions', 3);

  // General Science Chapters
  insertChap.run('chap-sci-bio', 'sub-sci', 'Human Physiology, Diseases & Nutrition (Vitamins, Enzymes, Scurvy)', 1);
  insertChap.run('chap-sci-chem', 'sub-sci', 'Everyday Chemistry, Chemical Compounds & Environmental Science', 2);
  insertChap.run('chap-sci-phys', 'sub-sci', 'General Physics: Mechanics, Optics, Sound & Electricity', 3);

  // Arithmetic Chapters
  insertChap.run('chap-arith-percentage', 'sub-arith', 'Percentage, Profit, Loss & Successive Discounts', 1);
  insertChap.run('chap-arith-ratio', 'sub-arith', 'Ratio, Proportion, Partnership & Mixtures', 2);
  insertChap.run('chap-arith-work', 'sub-arith', 'Time, Work & Pipes/Cisterns', 3);
  insertChap.run('chap-arith-speed', 'sub-arith', 'Time, Speed, Distance, Trains & Boats/Streams', 4);

  // English Chapters
  insertChap.run('chap-eng-prep', 'sub-eng', 'Prepositions, Phrasal Verbs & Sentence Correction', 1);
  insertChap.run('chap-eng-vocab', 'sub-eng', 'Vocabulary, Synonyms, Antonyms & One-Word Substitution', 2);
  insertChap.run('chap-eng-idioms', 'sub-eng', 'Idioms, Phrases & Clauses', 3);

  // General Mental Ability Chapters
  insertChap.run('chap-gma-reasoning', 'sub-gma', 'Logical, Verbal & Non-Verbal Reasoning', 1);
  insertChap.run('chap-gma-police', 'sub-gma', 'Police & Uniformed Service Analytical Ability', 2);

  // Child Development & Pedagogy Chapters
  insertChap.run('chap-cdp-theories', 'sub-cdp', 'Cognitive & Moral Development Theories (Piaget, Vygotsky, Kohlberg)', 1);
  insertChap.run('chap-cdp-learning', 'sub-cdp', 'Learning Principles & Child-Centred Classroom Pedagogy', 2);

  // 3. Granular Topics
  const insertTop = db.prepare(`
    INSERT OR REPLACE INTO topics (id, chapter_id, name, order_index)
    VALUES (?, ?, ?, ?)
  `);

  insertTop.run('top-inm-santhal', 'chap-inm-early', 'Santhal Rebellion (1855) & Sidho-Kanho Murmu', 1);
  insertTop.run('top-inm-1857', 'chap-inm-early', 'Revolt of 1857 & Early Resistance in Bengal', 2);
  insertTop.run('top-inm-partition1905', 'chap-inm-swadeshi', 'Partition of Bengal (1905) & Lord Curzon', 1);
  insertTop.run('top-inm-anushilan', 'chap-inm-swadeshi', 'Anushilan Samiti & Alipore Bomb Case (1908)', 2);
  insertTop.run('top-inm-ghadar', 'chap-inm-swadeshi', 'Ghadar Party (1913, San Francisco) & Lala Har Dayal', 3);
  insertTop.run('top-inm-tilak', 'chap-inm-swadeshi', 'Lokmanya Tilak & Swaraj is My Birthright', 4);
  insertTop.run('top-inm-noncoop', 'chap-inm-gandhi', 'Non-Cooperation Movement & Chauri Chaura (1922)', 1);
  insertTop.run('top-inm-civildis', 'chap-inm-gandhi', 'Civil Disobedience Movement & Gandhi-Irwin Pact (1931)', 2);
  insertTop.run('top-inm-poona', 'chap-inm-gandhi', 'Poona Pact (1932) & Communal Award', 3);
  insertTop.run('top-inm-quitindia', 'chap-inm-gandhi', 'Quit India (1942) & Tamralipta Jatiya Sarkar', 4);
  insertTop.run('top-inm-chittagong', 'chap-inm-swadeshi', 'Chittagong Armoury Raid (1930) & Surya Sen', 5);
  insertTop.run('top-inm-forwardbloc', 'chap-inm-ina', 'Forward Bloc (1939) & Netaji Subhas Chandra Bose', 1);
  insertTop.run('top-inm-indepact', 'chap-inm-transfer', 'Indian Independence Act (18 July 1947) & Mountbatten Plan', 1);

  insertTop.run('top-hist-inc1885', 'chap-hist-british', 'First Session of INC (1885) & W. C. Bonnerjee', 1);
  insertTop.run('top-hist-press-vernacular', 'chap-hist-culture', 'Vernacular Press Act (1878) & Lord Ripon (1881)', 1);
  insertTop.run('top-hist-hicky-gazette', 'chap-hist-culture', 'Hicky\'s Bengal Gazette (1780) & Printing Press in India', 2);
  insertTop.run('top-hist-asiatic-society', 'chap-hist-culture', 'Asiatic Society of Bengal (1784) & Sir William Jones', 3);
  insertTop.run('top-hist-tagore-nobel', 'chap-hist-culture', 'Rabindranath Tagore Nobel Prize (1913) & Gitanjali', 4);
  insertTop.run('top-hist-tebhaga', 'chap-hist-british', 'Tebhaga Peasant Movement (1946) & Kisan Sabha', 5);

  insertTop.run('top-geo-sandakphu', 'chap-geo-physio', 'Singalila Ridge, Sandakphu Peak (3,636m) & Physiography', 1);
  insertTop.run('top-geo-tropic', 'chap-geo-districts', 'Tropic of Cancer passing through Purulia, Bankura, Burdwan, Nadia', 1);
  insertTop.run('top-geo-farakka', 'chap-geo-rivers', 'Farakka Barrage & Bhagirathi-Hooghly Port Preservation', 1);
  insertTop.run('top-geo-teesta-duars', 'chap-geo-rivers', 'Teesta River, Terai & Duars Divisions in North Bengal', 2);
  insertTop.run('top-geo-sankosh', 'chap-geo-rivers', 'Sankosh River (West Bengal - Assam Boundary)', 3);
  insertTop.run('top-geo-jaldapara', 'chap-geo-climate', 'Jaldapara National Park & Great Indian One-horned Rhinoceros', 1);
  insertTop.run('top-geo-state-symbols', 'chap-geo-climate', 'Official State Symbols of West Bengal (Fishing Cat, Kingfisher, Chatim)', 2);

  insertTop.run('top-pol-writs', 'chap-pol-fr-dpsp', 'Article 32 & 226: Writs (Certiorari, Mandamus, Habeas Corpus)', 1);
  insertTop.run('top-pol-art21', 'chap-pol-fr-dpsp', 'Article 21: Right to Life and Personal Liberty', 2);
  insertTop.run('top-pol-calcutta-hc', 'chap-pol-judiciary', 'Calcutta High Court (1862) Jurisdiction & Circuit Benches', 1);
  insertTop.run('top-pol-panchayat-wb', 'chap-pol-panchayat', '3-Tier Panchayati Raj in WB & Sabhadhipati Role', 1);
  insertTop.run('top-pol-art280', 'chap-pol-bodies', 'Article 280: Finance Commission of India', 1);
  insertTop.run('top-pol-art324', 'chap-pol-bodies', 'Article 324: Election Commission of India', 2);

  insertTop.run('top-econ-harroddomar', 'chap-econ-planning', 'First Five Year Plan & Harrod-Domar Growth Model', 1);
  insertTop.run('top-econ-kanyashree', 'chap-econ-schemes', 'Kanyashree Prakalpa & UN Public Service Award 2017', 1);
  insertTop.run('top-econ-swasthya', 'chap-econ-schemes', 'Swasthya Sathi & Universal Health Coverage in WB', 2);
  insertTop.run('top-econ-amartyasen', 'chap-econ-welfare', 'Amartya Sen: Welfare Economics & Poverty Measurement (Nobel 1998)', 1);

  insertTop.run('top-sci-vitamins', 'chap-sci-bio', 'Vitamins, Ascorbic Acid (Vit C) & Deficiency Scurvy', 1);
  insertTop.run('top-sci-chemistry', 'chap-sci-chem', 'Sodium Hydrogen Carbonate (Baking Soda NaHCO3)', 1);

  insertTop.run('top-arith-successive', 'chap-arith-percentage', 'Successive Discounts & Marked Price Problems', 1);
  insertTop.run('top-arith-profitloss', 'chap-arith-percentage', 'Cost Price, Selling Price & Net Profit Percentage', 2);
  insertTop.run('top-arith-timework', 'chap-arith-work', 'Time & Work Efficiency & LCM Calculation', 1);

  insertTop.run('top-eng-phrasal', 'chap-eng-prep', 'Appropriate Prepositions & Phrasal Verbs (dispose of)', 1);
  insertTop.run('top-eng-antonyms', 'chap-eng-vocab', 'Synonyms & Antonyms (Benevolent vs Malevolent)', 1);

  insertTop.run('top-gma-police-gk', 'chap-gma-police', 'Kolkata Police Headquarters (Lalbazar) & Police GK', 1);

  insertTop.run('top-cdp-piaget', 'chap-cdp-theories', 'Jean Piaget Sensory-Motor Stage & Object Permanence', 1);

  // 4. Update ALL existing questions with exact subject_id, chapter_id, topic_id
  const updateMap = [
    { idPattern: '%tilak%', sub: 'sub-inm', chap: 'chap-inm-swadeshi', top: 'top-inm-tilak' },
    { idPattern: '%tropic%', sub: 'sub-geo-wb', chap: 'chap-geo-districts', top: 'top-geo-tropic' },
    { idPattern: '%forwardbloc%', sub: 'sub-inm', chap: 'chap-inm-ina', top: 'top-inm-forwardbloc' },
    { idPattern: '%asiatic%', sub: 'sub-hist', chap: 'chap-hist-culture', top: 'top-hist-asiatic-society' },
    { idPattern: '%poonapact%', sub: 'sub-inm', chap: 'chap-inm-gandhi', top: 'top-inm-poona' },
    { idPattern: '%tebhaga%', sub: 'sub-hist', chap: 'chap-hist-british', top: 'top-hist-tebhaga' },
    { idPattern: '%chaurichaura%', sub: 'sub-inm', chap: 'chap-inm-gandhi', top: 'top-inm-noncoop' },
    { idPattern: '%calcutta-hc%', sub: 'sub-polity', chap: 'chap-pol-judiciary', top: 'top-pol-calcutta-hc' },
    { idPattern: '%inc-first%', sub: 'sub-hist', chap: 'chap-hist-british', top: 'top-hist-inc1885' },
    { idPattern: '%art280%', sub: 'sub-polity', chap: 'chap-pol-bodies', top: 'top-pol-art280' },
    { idPattern: '%ghadar%', sub: 'sub-inm', chap: 'chap-inm-swadeshi', top: 'top-inm-ghadar' },
    { idPattern: '%harroddomar%', sub: 'sub-econ', chap: 'chap-econ-planning', top: 'top-econ-harroddomar' },
    { idPattern: '%gandhi-irwin%', sub: 'sub-inm', chap: 'chap-inm-gandhi', top: 'top-inm-civildis' },
    { idPattern: '%hicky%', sub: 'sub-hist', chap: 'chap-hist-culture', top: 'top-hist-hicky-gazette' },
    { idPattern: '%independence-act%', sub: 'sub-inm', chap: 'chap-inm-transfer', top: 'top-inm-indepact' },
    { idPattern: '%state-animal%', sub: 'sub-geo-wb', chap: 'chap-geo-climate', top: 'top-geo-state-symbols' },
    { idPattern: '%vernacular-press%', sub: 'sub-hist', chap: 'chap-hist-culture', top: 'top-hist-press-vernacular' },
    { idPattern: '%profit-discount%', sub: 'sub-arith', chap: 'chap-arith-percentage', top: 'top-arith-successive' },
    { idPattern: '%antonym%', sub: 'sub-eng', chap: 'chap-eng-vocab', top: 'top-eng-antonyms' },
    { idPattern: '%panchayat%', sub: 'sub-polity', chap: 'chap-pol-panchayat', top: 'top-pol-panchayat-wb' },
    { idPattern: '%tagore-nobel%', sub: 'sub-hist', chap: 'chap-hist-culture', top: 'top-hist-tagore-nobel' },
    { idPattern: '%amartya-sen%', sub: 'sub-econ', chap: 'chap-econ-welfare', top: 'top-econ-amartyasen' },
    { idPattern: '%lalbazar%', sub: 'sub-gma', chap: 'chap-gma-police', top: 'top-gma-police-gk' },
    { idPattern: '%sci-vitc%', sub: 'sub-sci', chap: 'chap-sci-bio', top: 'top-sci-vitamins' },
    { idPattern: '%part1905%', sub: 'sub-inm', chap: 'chap-inm-swadeshi', top: 'top-inm-partition1905' },
    { idPattern: '%alipore1908%', sub: 'sub-inm', chap: 'chap-inm-swadeshi', top: 'top-inm-anushilan' },
    { idPattern: '%chittagong1930%', sub: 'sub-inm', chap: 'chap-inm-swadeshi', top: 'top-inm-chittagong' },
    { idPattern: '%farakka%', sub: 'sub-geo-wb', chap: 'chap-geo-rivers', top: 'top-geo-farakka' },
    { idPattern: '%teesta%', sub: 'sub-geo-wb', chap: 'chap-geo-rivers', top: 'top-geo-teesta-duars' },
    { idPattern: '%sankosh%', sub: 'sub-geo-wb', chap: 'chap-geo-rivers', top: 'top-geo-sankosh' },
    { idPattern: '%jaldapara%', sub: 'sub-geo-wb', chap: 'chap-geo-climate', top: 'top-geo-jaldapara' },
    { idPattern: '%arith-work%', sub: 'sub-arith', chap: 'chap-arith-work', top: 'top-arith-timework' },
    { idPattern: '%eng-prep%', sub: 'sub-eng', chap: 'chap-eng-prep', top: 'top-eng-phrasal' },
    { idPattern: '%santhal%', sub: 'sub-inm', chap: 'chap-inm-early', top: 'top-inm-santhal' },
    { idPattern: '%policing%', sub: 'sub-inm', chap: 'chap-inm-early', top: 'top-inm-santhal' },
    { idPattern: '%cdp-piaget%', sub: 'sub-cdp', chap: 'chap-cdp-theories', top: 'top-cdp-piaget' },
    { idPattern: '%kanyashree%', sub: 'sub-econ', chap: 'chap-econ-schemes', top: 'top-econ-kanyashree' },
    { idPattern: '%sandakphu%', sub: 'sub-geo-wb', chap: 'chap-geo-physio', top: 'top-geo-sandakphu' },
    { idPattern: '%tamralipta%', sub: 'sub-inm', chap: 'chap-inm-gandhi', top: 'top-inm-quitindia' },
    { idPattern: '%writs%', sub: 'sub-polity', chap: 'chap-pol-fr-dpsp', top: 'top-pol-writs' },
    { idPattern: '%foodsi-arith%', sub: 'sub-arith', chap: 'chap-arith-percentage', top: 'top-arith-profitloss' },
    { idPattern: '%swasthya%', sub: 'sub-econ', chap: 'chap-econ-schemes', top: 'top-econ-swasthya' }
  ];

  const updateStmt = db.prepare(`
    UPDATE questions
    SET subject_id = ?, chapter_id = ?, topic_id = ?
    WHERE id LIKE ?
  `);

  for (const m of updateMap) {
    updateStmt.run(m.sub, m.chap, m.top, m.idPattern);
  }

  // Fallback for any remaining questions without a chapter
  db.prepare(`
    UPDATE questions
    SET subject_id = 'sub-inm', chapter_id = 'chap-inm-swadeshi', topic_id = 'top-inm-anushilan'
    WHERE chapter_id IS NULL AND subject_id = 'sub-inm'
  `).run();

  db.prepare(`
    UPDATE questions
    SET subject_id = 'sub-geo-wb', chapter_id = 'chap-geo-physio', topic_id = 'top-geo-sandakphu'
    WHERE chapter_id IS NULL AND (subject_id = 'sub-geo-wb' OR subject_id = 'sub-geo')
  `).run();

  db.prepare(`
    UPDATE questions
    SET subject_id = 'sub-polity', chapter_id = 'chap-pol-fr-dpsp', topic_id = 'top-pol-writs'
    WHERE chapter_id IS NULL AND subject_id = 'sub-polity'
  `).run();

  db.prepare(`
    UPDATE questions
    SET subject_id = 'sub-arith', chapter_id = 'chap-arith-percentage', topic_id = 'top-arith-profitloss'
    WHERE chapter_id IS NULL AND subject_id = 'sub-arith'
  `).run();

  db.prepare(`
    UPDATE questions
    SET subject_id = 'sub-hist', chapter_id = 'chap-hist-culture', topic_id = 'top-hist-tagore-nobel'
    WHERE chapter_id IS NULL
  `).run();
})();

console.log('✅ Exam, Subject, Chapter & Topic Hierarchy structured successfully!');
const unmapped = db.prepare('SELECT count(*) as c FROM questions WHERE chapter_id IS NULL').get().c;
console.log(`Unmapped questions count: ${unmapped}`);

const breakdown = db.prepare(`
  SELECT s.name as subject, count(q.id) as question_count, count(DISTINCT q.chapter_id) as chapters_covered
  FROM questions q
  JOIN subjects s ON q.subject_id = s.id
  GROUP BY s.id
  ORDER BY question_count DESC
`).all();
console.log('Subject & Chapter Breakdown:', breakdown);
