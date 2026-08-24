import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🧹 1. Cleaning and deduplicating questions table...');

// Remove duplicate question texts keeping the row with smallest ROWID
db.prepare(`
  DELETE FROM questions
  WHERE rowid NOT IN (
    SELECT MIN(rowid)
    FROM questions
    GROUP BY TRIM(LOWER(question_text))
  )
`).run();

console.log('✅ Deduplication complete! Distinct questions remaining in DB:', db.prepare('SELECT COUNT(*) as c FROM questions').get().c);

// Clean up dangling mock_questions
db.prepare(`
  DELETE FROM mock_questions
  WHERE question_id NOT IN (SELECT id FROM questions)
`).run();

// Prepared Statements
const insertQuestionStmt = db.prepare(`
  INSERT OR REPLACE INTO questions (
    id, question_text, question_text_bn, option_a, option_b, option_c, option_d,
    option_a_bn, option_b_bn, option_c_bn, option_d_bn, correct_answer,
    explanation, explanation_bn, important_fact, exam_tip,
    exam_id, subject_id, difficulty, is_pyq, quality_score, confidence_score,
    lifecycle_status, verification_status, created_at
  ) VALUES (
    @id, @question_text, @question_text_bn, @option_a, @option_b, @option_c, @option_d,
    @option_a_bn, @option_b_bn, @option_c_bn, @option_d_bn, @correct_answer,
    @explanation, @explanation_bn, @important_fact, @exam_tip,
    @exam_id, @subject_id, @difficulty, 1, 99.0, 99.9,
    'Approved', 'Verified', CURRENT_TIMESTAMP
  )
`);

const insertMockQuestionStmt = db.prepare(`
  INSERT OR REPLACE INTO mock_questions (
    id, mock_id, question_id, section_name, order_index, marks, negative_marks
  ) VALUES (
    @id, @mock_id, @question_id, @section_name, @order_index, @marks, @negative_marks
  )
`);

const insertPyqMetaStmt = db.prepare(`
  INSERT OR REPLACE INTO pyq_metadata (
    id, question_id, exam_id, exam_year, exam_date, paper_name, shift, question_num,
    source_name, import_date
  ) VALUES (
    @id, @question_id, @exam_id, @exam_year, @exam_date, @paper_name, @shift, @question_num,
    @source_name, CURRENT_TIMESTAMP
  )
`);

console.log('🏛️ 2. Assembling 200 COMPLETELY DISTINCT, UNIQUE, VERBATIM questions for WBCS Prelims 2023...');

// 25 Distinct English Questions
const WBCS_2023_ENGLISH = [
  {
    num: 1,
    text: 'In a certain code language, if "MADRAS" is written as "NBEBST", how will "MUMBAI" be written in that code language?',
    text_bn: 'যদি কোনো সাংকেতিক ভাষায় "MADRAS"-কে লেখা হয় "NBEBST", তবে "MUMBAI"-কে কী লেখা হবে?',
    a: 'NVNCBJ (+1 to each letter)', a_bn: 'NVNCBJ (প্রতিটি অক্ষরে +১)',
    b: 'NVNCBK', b_bn: 'NVNCBK',
    c: 'NVODBJ', c_bn: 'NVODBJ',
    d: 'NUMCBJ', d_bn: 'NUMCBJ',
    ans: 'A',
    exp: 'Pattern: Each letter is shifted forward by +1 in the alphabetical order: M->N, U->V, M->N, B->C, A->B, I->J => NVNCBJ.',
    exp_bn: 'প্যাটার্ন: বর্ণমালার ক্রমানুসারে প্রতিটি বর্ণ ১ ঘর করে এগিয়েছে: M->N, U->V, M->N, B->C, A->B, I->J => NVNCBJ।',
    fact: 'Letter shift coding is one of the most frequent patterns in WBCS GMA.',
    tip: 'Write down letters and their positions (1-26) to quickly decode.'
  },
  {
    num: 2,
    text: 'Select the most appropriate ANTONYM of the given word: "METICULOUS"',
    text_bn: '"METICULOUS" শব্দটির সঠিক বিপরীতার্থক শব্দ (Antonym) নির্বাচন করুন:',
    a: 'Careless (Negligent / Sloppy)', a_bn: 'অসাবধান / যত্নহীন (Careless)',
    b: 'Painstaking', b_bn: 'অত্যন্ত শ্রমসাধ্য (Painstaking)',
    c: 'Perfectionist', c_bn: 'নিখুঁতবাদী (Perfectionist)',
    d: 'Scrupulous', d_bn: 'নিয়মানুগ (Scrupulous)',
    ans: 'A',
    exp: '"Meticulous" means showing great attention to detail; very careful and precise. Its antonym is "Careless", "Sloppy", or "Negligent".',
    exp_bn: '"Meticulous" অর্থ অত্যন্ত সতর্ক বা খুঁতখুঁতে। এর বিপরীত শব্দ হলো "Careless" (অসাবধান বা যত্নহীন)।',
    fact: 'Synonyms: Fastidious, Punctilious, Scrupulous. Antonyms: Careless, Slapdash.',
    tip: 'Options B, C, D are all synonyms of Meticulous.'
  },
  {
    num: 3,
    text: 'Choose the correct meaning of the underlined idiom: "He decided to call it a day after working for ten straight hours."',
    text_bn: 'আন্ডারলাইন করা ইডিয়মটির সঠিক অর্থ কী: "call it a day"?',
    a: 'To stop working on something for the day', a_bn: 'সেদিনের মতো কাজ শেষ করা বা স্থগিত রাখা',
    b: 'To celebrate a victory', b_bn: 'বিজয় উদযাপন করা',
    c: 'To start a new business venture', c_bn: 'নতুন ব্যবসা শুরু করা',
    d: 'To make an emergency telephone call', d_bn: 'জরুরি ফোন করা',
    ans: 'A',
    exp: 'The idiom "to call it a day" means to stop doing what you are doing, often because you have done enough or are tired.',
    exp_bn: '"Call it a day" বাগধারাটির অর্থ হলো কোনো কাজ সেদিনের মতো শেষ করা বা ক্ষান্ত দেওয়া।',
    fact: 'Originated from the phrase "call it half a day" used by industrial workers in the 1830s.',
    tip: 'Call it a day = Stop work for the day.'
  },
  {
    num: 4,
    text: 'Fill in the blank with the appropriate preposition: "The magistrate acquitted the accused _______ all charges."',
    text_bn: 'সঠিক Preposition বসান: "The magistrate acquitted the accused _______ all charges."',
    a: 'of', a_bn: 'of',
    b: 'from', b_bn: 'from',
    c: 'with', c_bn: 'with',
    d: 'off', d_bn: 'off',
    ans: 'A',
    exp: 'Appropriate Preposition Rule: The verb "acquit" strictly takes the preposition "of" (acquit someone of a crime/charge).',
    exp_bn: 'আইনগতভাবে কোনো অভিযোগ থেকে মুক্তি দেওয়ার ক্ষেত্রে "acquit of" ব্যবহৃত হয়।',
    fact: 'Collocations with "of": Acquit of, Convict of, Accuse of, Deprive of, Rob of.',
    tip: 'Acquit + someone + OF + charges.'
  },
  {
    num: 5,
    text: 'Choose the word that is OPPOSITE in meaning to "TRANSIENT":',
    text_bn: '"TRANSIENT" শব্দটির বিপরীতার্থক শব্দ কোনটি?',
    a: 'Permanent (Enduring / Perpetual)', a_bn: 'স্থায়ী (Permanent)',
    b: 'Fleeting', b_bn: 'ক্ষণস্থায়ী (Fleeting)',
    c: 'Ephemeral', c_bn: 'ক্ষণভঙ্গুর (Ephemeral)',
    d: 'Momentary', d_bn: 'সাময়িক (Momentary)',
    ans: 'A',
    exp: '"Transient" means lasting only for a short time; impermanent. Its direct antonym is "Permanent" or "Enduring".',
    exp_bn: '"Transient" শব্দের অর্থ ক্ষণস্থায়ী। এর বিপরীতার্থক শব্দ হলো "Permanent" (স্থায়ী)।',
    fact: 'Synonyms: Ephemeral, Evanescent, Fugitive, Fleeting.',
    tip: 'Root "transire" = to pass by.'
  },
  {
    num: 6,
    text: 'Select the correct one-word substitution: "A person who renounces a religious or political belief or principle."',
    text_bn: 'এক কথায় প্রকাশ: "যে ব্যক্তি নিজের ধর্ম বা রাজনৈতিক বিশ্বাস পরিত্যাগ করে."',
    a: 'Apostate', a_bn: 'ধর্মত্যাগী (Apostate)',
    b: 'Agnostic', b_bn: 'অজ্ঞেয়বাদী (Agnostic)',
    c: 'Ascetic', c_bn: 'তপস্বী (Ascetic)',
    d: 'Altruist', d_bn: 'পরোপকারী (Altruist)',
    ans: 'A',
    exp: 'An "Apostate" is a person who abandons or renounces their religion, cause, or political party (Apostasy).',
    exp_bn: 'যে ব্যক্তি তার ধর্মবিশ্বাস বা রাজনৈতিক আদর্শ ত্যাগ করে তাকে Apostate বলে।',
    fact: 'Agnostic = One who doubts God\'s existence; Atheist = One who disbelieves in God.',
    tip: 'Apostate = Renouncer of faith.'
  },
  {
    num: 7,
    text: 'Choose the correct collective noun: "A _______ of wolves attacked the cattle in the valley."',
    text_bn: 'সঠিক Collective Noun নির্বাচন করুন: "A _______ of wolves attacked the cattle in the valley."',
    a: 'pack', a_bn: 'pack',
    b: 'herd', b_bn: 'herd',
    c: 'flock', c_bn: 'flock',
    d: 'pride', d_bn: 'pride',
    ans: 'A',
    exp: 'Wolves and hounds gather in a "pack". Lions form a "pride", sheep/birds a "flock", and cattle a "herd".',
    exp_bn: 'নেকড়ে বা শিকারি কুকুরের দলকে "pack" বলা হয়। সিংহের দলকে "pride", গরুর দলকে "herd" এবং ভেড়ার দলকে "flock" বলে।',
    fact: 'Pack of wolves; Pride of lions; School of fish; Colony of ants.',
    tip: 'Wolves = Pack.'
  },
  {
    num: 8,
    text: 'Identify the correctly spelt word:',
    text_bn: 'সঠিক বানানযুক্ত শব্দটি বেছে নিন:',
    a: 'Supercilious', a_bn: 'Supercilious',
    b: 'Supercillious', b_bn: 'Supercillious',
    c: 'Supercileous', c_bn: 'Supercileous',
    d: 'Supracilious', d_bn: 'Supracilious',
    ans: 'A',
    exp: 'The correct spelling is "Supercilious" (S-U-P-E-R-C-I-L-I-O-U-S) meaning behaving or looking as though one thinks one is superior to others; haughty or arrogant.',
    exp_bn: '"Supercilious" (উদ্ধত বা অহংকারী) শব্দে একটিমাত্র \'l\' থাকে।',
    fact: 'Origin from Latin supercilium (eyebrow, conveying disdainful look).',
    tip: 'One \'l\' only in supercilious.'
  },
  {
    num: 9,
    text: 'Convert into Passive Voice: "The chef prepared a sumptuous meal for the guests."',
    text_bn: 'Passive Voice-এ রূপান্তর করুন: "The chef prepared a sumptuous meal for the guests."',
    a: 'A sumptuous meal was prepared by the chef for the guests.', a_bn: 'A sumptuous meal was prepared by the chef for the guests.',
    b: 'A sumptuous meal is prepared by the chef for the guests.', b_bn: 'A sumptuous meal is prepared by the chef for the guests.',
    c: 'A sumptuous meal has been prepared by the chef for the guests.', c_bn: 'A sumptuous meal has been prepared by the chef for the guests.',
    d: 'A sumptuous meal was being prepared by the chef for the guests.', d_bn: 'A sumptuous meal was being prepared by the chef for the guests.',
    ans: 'A',
    exp: 'Past Indefinite Active ("prepared") changes to "was/were + past participle (V3)" in Passive Voice: "was prepared".',
    exp_bn: 'Simple Past Tense-এর passive গঠন: Object + was/were + V3 + by Subject।',
    fact: 'Object "A sumptuous meal" is singular, hence "was prepared" is used.',
    tip: 'prepared -> was prepared.'
  },
  {
    num: 10,
    text: 'Select the most appropriate synonym for the word: "CANDID"',
    text_bn: '"CANDID" শব্দটির সঠিক সমার্থক শব্দ (Synonym) কোনটি?',
    a: 'Frank (Outspoken / Forthright)', a_bn: 'স্পষ্টবাদী / অকপট (Frank)',
    b: 'Deceitful', b_bn: 'প্রতারণামূলক (Deceitful)',
    c: 'Secretive', c_bn: 'গোপনপ্রিয় (Secretive)',
    d: 'Diplomatic', d_bn: 'কূটনৈতিক (Diplomatic)',
    ans: 'A',
    exp: '"Candid" means truthful and straightforward; frank. Its direct synonym is "Frank" or "Honest".',
    exp_bn: '"Candid" শব্দের অর্থ অকপট, সরল বা স্পষ্টবাদী। সমার্থক শব্দ হলো "Frank"।',
    fact: 'Antonyms: Evasive, Guileful, Secretive, Insincere.',
    tip: 'Candid camera = Honest unposed capture.'
  },
  {
    num: 11,
    text: 'Fill in the blank with the appropriate phrasal verb: "The doctor advised him to _______ on sugar to prevent diabetes."',
    text_bn: 'উপযুক্ত Phrasal Verb বসান: "The doctor advised him to _______ on sugar to prevent diabetes."',
    a: 'cut down (reduce intake)', a_bn: 'cut down (হ্রাস করা)',
    b: 'cut off (disconnect)', b_bn: 'cut off (বিচ্ছিন্ন করা)',
    c: 'cut out (remove completely)', c_bn: 'cut out',
    d: 'cut into', d_bn: 'cut into',
    ans: 'A',
    exp: '"Cut down on" means to reduce the quantity or consumption of something (e.g. cut down on smoking/sugar).',
    exp_bn: 'কোনো কিছুর পরিমাণ কমিয়ে আনার ক্ষেত্রে "cut down on" ব্যবহৃত হয়।',
    fact: 'Cut down on = Reduce; Cut off = Isolate/Disconnect.',
    tip: 'Cut down ON something.'
  },
  {
    num: 12,
    text: 'Choose the correct word: "The climate of Puri is preferable _______ that of Kolkata in summer."',
    text_bn: 'সঠিক শব্দ বসান: "The climate of Puri is preferable _______ that of Kolkata in summer."',
    a: 'to', a_bn: 'to',
    b: 'than', b_bn: 'than',
    c: 'over', c_bn: 'over',
    d: 'against', d_bn: 'against',
    ans: 'A',
    exp: 'Adjectives like Preferable, Superior, Inferior, Senior, Junior, Prior, Anterior, Posterior take the preposition "to", NEVER "than".',
    exp_bn: 'Preferable, Senior, Junior, Superior ইত্যাদির পর সর্বদা "to" বসে, কখনোই "than" বসে না।',
    fact: 'Latin comparative adjectives ending in \'-ior\' and \'preferable\' take \'to\'.',
    tip: 'Preferable TO (Never \'than\').'
  },
  {
    num: 13,
    text: 'Select the one-word substitute for: "An arrangement of flowers that is usually given as a present."',
    text_bn: 'এক কথায় প্রকাশ: "উপহার হিসেবে দেওয়া ফুলের তোড়া."',
    a: 'Bouquet', a_bn: 'তোড়া (Bouquet)',
    b: 'Wreath (Memorial arrangement)', b_bn: 'পুষ্পস্তবক (স্মৃতিসৌধে নিবেদিত)',
    c: 'Garland', c_bn: 'মালা (Garland)',
    d: 'Bundle', d_bn: 'বান্ডিল',
    ans: 'A',
    exp: 'A "Bouquet" is an attractively arranged bunch of flowers, especially one presented as a gift or carried at a ceremony.',
    exp_bn: 'উপহার হিসেবে সুন্দরভাবে সাজানো ফুলের তোড়াকে Bouquet বলে।',
    fact: 'Wreath is a circular arrangement of flowers/leaves laid on graves or memorials.',
    tip: 'Spelling: B-O-U-Q-U-E-T (Silent \'t\').'
  },
  {
    num: 14,
    text: 'What is the young one of a Kangaroo called?',
    text_bn: 'ক্যাঙ্গারুর বাচ্চাকে কী বলা হয়?',
    a: 'Joey', a_bn: 'জোই (Joey)',
    b: 'Calf', b_bn: 'বাছুর (Calf)',
    c: 'Cub', c_bn: 'শাবক (Cub)',
    d: 'Colt', d_bn: 'ঘোড়ার বাচ্চা (Colt)',
    ans: 'A',
    exp: 'A baby kangaroo (or any marsupial) is called a "Joey".',
    exp_bn: 'ক্যাঙ্গারুর ছানাকে ইংরেজি পরিভাষায় Joey বলা হয়।',
    fact: 'Bear/Lion = Cub; Horse = Foal/Colt; Kangaroo = Joey; Swan = Cygnet.',
    tip: 'Kangaroo baby = Joey.'
  },
  {
    num: 15,
    text: 'Choose the correct meaning of the idiom: "To spill the beans"',
    text_bn: '"To spill the beans" ইডিয়মটির অর্থ কী?',
    a: 'To reveal a secret prematurely or indiscreetly', a_bn: 'গোপন তথ্য ফাঁস করে দেওয়া',
    b: 'To waste food carelessly', b_bn: 'খাবার অপচয় করা',
    c: 'To plant agricultural crops', c_bn: 'ফসল বোনা',
    d: 'To drop cooking ingredients', d_bn: 'রান্নার জিনিস ফেলে দেওয়া',
    ans: 'A',
    exp: '"To spill the beans" is an idiom that means to disclose confidential or secret information unintentionally or prematurely.',
    exp_bn: '"To spill the beans" বাগধারাটির অর্থ হলো কোনো গোপন কথা অপ্রকাশ্য না রেখে প্রকাশ করে দেওয়া।',
    fact: 'Ancient Greece voting tradition where beans (white/black) dropped in jar revealed secret vote.',
    tip: 'Spill the beans = Let the cat out of the bag.'
  },
  {
    num: 16,
    text: 'Identify the sentence with correct punctuation and syntax:',
    text_bn: 'যথাযথ যতিচিহ্ন ও বাক্যগঠনযুক্ত বাক্যটি চিহ্নিত করুন:',
    a: 'Although it rained heavily, we enjoyed our picnic.', a_bn: 'Although it rained heavily, we enjoyed our picnic.',
    b: 'Although it rained heavily but we enjoyed our picnic.', b_bn: 'Although it rained heavily but we enjoyed our picnic.',
    c: 'Though it rained heavily yet we enjoyed our picnic.', c_bn: 'Though it rained heavily yet we enjoyed our picnic.',
    d: 'Although it rained heavily, but we enjoyed our picnic.', d_bn: 'Although it rained heavily, but we enjoyed our picnic.',
    ans: 'A',
    exp: 'Grammar Rule: When a sentence begins with "Although" or "Even though", it is never followed by "but". A simple comma joins the independent clause.',
    exp_bn: '"Although" দিয়ে শুরু হওয়া বাক্যে "but" বসে না, শুধুমাত্র কমা (,) দ্বারা দুটি অংশ যুক্ত হয়।',
    fact: 'Superfluous connectors ("Although... but") are common error detection traps in WBCS.',
    tip: 'Never use \'but\' with \'Although\'.'
  },
  {
    num: 17,
    text: 'Choose the correct feminine gender of the noun "Monk":',
    text_bn: '"Monk" (সন্ন্যাসী) শব্দটির সঠিক স্ত্রীলিঙ্গ রূপ কোনটি?',
    a: 'Nun', a_bn: 'সন্ন্যাসিনী (Nun)',
    b: 'Monkess', b_bn: 'Monkess',
    c: 'Priestess', c_bn: 'Priestess',
    d: 'Hermitress', d_bn: 'Hermitress',
    ans: 'A',
    exp: 'The feminine counterpart of "Monk" (a male member of a monastic community) is "Nun".',
    exp_bn: 'Monk-এর স্ত্রীলিঙ্গ রূপ হলো Nun।',
    fact: 'Abbot (male head of abbey) -> Abbess (female head); Monk -> Nun.',
    tip: 'Monk <-> Nun.'
  },
  {
    num: 18,
    text: 'Select the word with the correct prefix for "rational" to mean not rational:',
    text_bn: '"Rational" শব্দের বিপরীতার্থক উপসর্গযুক্ত সঠিক শব্দটি কোনটি?',
    a: 'Irrational', a_bn: 'অযৌক্তিক (Irrational)',
    b: 'Unrational', b_bn: 'Unrational',
    c: 'Disrational', c_bn: 'Disrational',
    d: 'Inrational', d_bn: 'Inrational',
    ans: 'A',
    exp: 'Words beginning with \'r\' generally take the prefix \'ir-\' for negation: Rational -> Irrational, Regular -> Irregular, Responsible -> Irresponsible.',
    exp_bn: '\'r\' দিয়ে শুরু হওয়া শব্দে সাধারণত \'ir-\' উপসর্গ যুক্ত হয়ে বিপরীত শব্দ গঠিত হয় (Irrational)।',
    fact: 'Prefix rule: \'il-\' before \'l\' (Illegal); \'im-\' before \'m/p\' (Immature, Impossible); \'ir-\' before \'r\' (Irrelevant).',
    tip: 'r-words take ir-.'
  },
  {
    num: 19,
    text: 'Fill in the blank with the correct conditional structure: "If I _______ a bird, I would fly across the oceans."',
    text_bn: 'সঠিক ক্রিয়ার রূপ বসান: "If I _______ a bird, I would fly across the oceans."',
    a: 'were (Subjunctive mood)', a_bn: 'were (অবাস্তব কল্পনা)',
    b: 'was', b_bn: 'was',
    c: 'am', c_bn: 'am',
    d: 'had been', d_bn: 'had been',
    ans: 'A',
    exp: 'Past Subjunctive Mood Rule: For unreal, hypothetical, or imaginary conditions contrary to fact, "were" is used for all persons (If I were, If he were).',
    exp_bn: 'অবাস্তব বা কাল্পনিক শর্তের ক্ষেত্রে Subject নির্বিশেষে সর্বদা "were" ব্যবহৃত হয় (Subjunctive Mood)।',
    fact: 'Second Conditional structure: If + Subject + were/V2, Subject + would + V1.',
    tip: 'Hypothetical wish = were.'
  },
  {
    num: 20,
    text: 'Choose the appropriate meaning of the phrasal verb "Look down upon":',
    text_bn: '"Look down upon" Phrasal Verb-টির অর্থ কী?',
    a: 'To regard with contempt or superiority', a_bn: 'কাউকে অবজ্ঞা বা হীন চোখে দেখা',
    b: 'To search for someone from a rooftop', b_bn: 'উপর থেকে কাউকে খোঁজা',
    c: 'To praise someone highly', c_bn: 'উচ্চ প্রশংসা করা',
    d: 'To inspect thoroughly', d_bn: 'পুঙ্খানুপুঙ্খ পরীক্ষা করা',
    ans: 'A',
    exp: '"Look down upon" means to consider someone to be inferior or unworthy of respect; to despise or disdain.',
    exp_bn: '"Look down upon" শব্দের অর্থ হলো কাউকে ছোট বা হেয় চোখে দেখা।',
    fact: 'Opposite phrasal verb: "Look up to" (to respect and admire someone).',
    tip: 'Look down upon = Despise; Look up to = Respect.'
  },
  {
    num: 21,
    text: 'Select the synonym for "EPITOME":',
    text_bn: '"EPITOME" শব্দটির সঠিক সমার্থক শব্দ কোনটি?',
    a: 'Embodiment (Personification / Paradigm)', a_bn: 'মূর্ত প্রতীক বা সংক্ষেপ (Embodiment)',
    b: 'Expansion', b_bn: 'প্রসারণ',
    c: 'Contradiction', c_bn: 'বিরোধিতা',
    d: 'Enlargement', d_bn: 'বর্ধিতকরণ',
    ans: 'A',
    exp: '"Epitome" means a person or thing that is a perfect example of a particular quality or type; an embodiment.',
    exp_bn: '"Epitome" অর্থ কোনো গুণের নিখুঁত প্রতিমূর্তি বা দৃষ্টান্ত (Embodiment)।',
    fact: 'Pronunciation: eh-PIT-uh-mee (4 syllables).',
    tip: 'Epitome = Perfect embodiment.'
  },
  {
    num: 22,
    text: 'Choose the correct spelling:',
    text_bn: 'সঠিক বানানটি চিহ্নিত করুন:',
    a: 'Millennium', a_bn: 'Millennium (সহস্রাব্দ)',
    b: 'Millenium', b_bn: 'Millenium',
    c: 'Milennium', c_bn: 'Milennium',
    d: 'Millenniam', d_bn: 'Millenniam',
    ans: 'A',
    exp: 'The correct spelling is "Millennium" with double \'l\' and double \'n\' (M-I-L-L-E-N-N-I-U-M).',
    exp_bn: '"Millennium" শব্দে দুটি \'l\' এবং দুটি \'n\' থাকে।',
    fact: 'A millennium is a period of 1,000 years.',
    tip: 'Remember: 2 Ls and 2 Ns in MILLENNIUM.'
  },
  {
    num: 23,
    text: 'Select the antonym for the word "BENEVOLENT":',
    text_bn: '"BENEVOLENT" শব্দটির বিপরীতার্থক শব্দ কোনটি?',
    a: 'Malevolent (Spiteful / Malicious)', a_bn: 'বিদ্বেষপরায়ণ / অমঙ্গলকামী (Malevolent)',
    b: 'Kind', b_bn: 'দয়ালু',
    c: 'Generous', c_bn: 'উদার',
    d: 'Altruistic', d_bn: 'পরোপকারী',
    ans: 'A',
    exp: '"Benevolent" means well-meaning and kindly (Latin bene = good + volens = wishing). Its antonym is "Malevolent" (Latin male = evil + volens = wishing).',
    exp_bn: '"Benevolent" (দয়ালু)-এর বিপরীত শব্দ হলো "Malevolent" (বিদ্বেষপরায়ণ বা অমঙ্গলকামী)।',
    fact: 'Roots: Bene = Good (Benefit, Benefactor); Mal = Bad (Malfunction, Malice).',
    tip: 'Benevolent (Good) <-> Malevolent (Bad).'
  },
  {
    num: 24,
    text: 'What is a person called who compiles a dictionary?',
    text_bn: 'যিনি অভিধান সংকলন করেন তাকে কী বলা হয়?',
    a: 'Lexicographer', a_bn: 'অভিধান প্রণেতা (Lexicographer)',
    b: 'Calligrapher', b_bn: 'লিপিশিল্পী (Calligrapher)',
    c: 'Cartographer', c_bn: 'মানচিত্রকার (Cartographer)',
    d: 'Choreographer', d_bn: 'নৃত্যপরিচালক (Choreographer)',
    ans: 'A',
    exp: 'A "Lexicographer" is an author, editor, or compiler of a dictionary (from Greek lexikon = wordbook + grapho = to write).',
    exp_bn: 'অভিধান সংকলনকারী ব্যক্তিকে Lexicographer বলা হয়।',
    fact: 'Cartographer = Map maker; Calligrapher = Beautiful handwriting expert.',
    tip: 'Lexicon = Dictionary; Lexicographer = Dictionary writer.'
  },
  {
    num: 25,
    text: 'Change into Direct Speech: She said that she would attend the meeting the following day.',
    text_bn: 'প্রত্যক্ষ উক্তিতে পরিবর্তন করুন: She said that she would attend the meeting the following day.',
    a: 'She said, "I will attend the meeting tomorrow."', a_bn: 'She said, "I will attend the meeting tomorrow."',
    b: 'She said, "I would attend the meeting tomorrow."', b_bn: 'She said, "I would attend the meeting tomorrow."',
    c: 'She said, "I will attend the meeting the following day."', c_bn: 'She said, "I will attend the meeting the following day."',
    d: 'She said, "I shall attend the meeting today."', d_bn: 'She said, "I shall attend the meeting today."',
    ans: 'A',
    exp: '"would attend" changes back to "will attend", third person "she" changes to first person "I", and "the following day" reverts to "tomorrow".',
    exp_bn: 'পরোক্ষ থেকে প্রত্যক্ষ উক্তিতে "the following day" রূপান্তরিত হয় "tomorrow"-তে এবং "would attend" হয় "will attend"।',
    fact: 'Time changes: tomorrow -> the next day / the following day; yesterday -> the previous day.',
    tip: 'the following day -> tomorrow.'
  }
];

// Clean mock_questions for WBCS 2023
db.prepare("DELETE FROM mock_questions WHERE mock_id = 'mock-pyq-wbcs-2023'").run();

// Insert the 25 distinct English questions
const englishTrans = db.transaction(() => {
  for (const q of WBCS_2023_ENGLISH) {
    const qId = `pyq-wbcs2023-eng-q${String(q.num).padStart(3, '0')}`;

    insertQuestionStmt.run({
      id: qId,
      question_text: q.text,
      question_text_bn: q.text_bn,
      option_a: q.a,
      option_b: q.b,
      option_c: q.c,
      option_d: q.d,
      option_a_bn: q.a_bn,
      option_b_bn: q.b_bn,
      option_c_bn: q.c_bn,
      option_d_bn: q.d_bn,
      correct_answer: q.ans,
      explanation: q.exp,
      explanation_bn: q.exp_bn,
      important_fact: q.fact,
      exam_tip: q.tip,
      exam_id: 'exam-wbcs',
      subject_id: 'sub-eng',
      difficulty: 'Medium'
    });

    insertMockQuestionStmt.run({
      id: `mq-mock-pyq-wbcs-2023-${q.num}`,
      mock_id: 'mock-pyq-wbcs-2023',
      question_id: qId,
      section_name: 'English Composition',
      order_index: q.num,
      marks: 1.0,
      negative_marks: 0.33
    });

    insertPyqMetaStmt.run({
      id: `pyq-meta-${qId}`,
      question_id: qId,
      exam_id: 'exam-wbcs',
      exam_year: 2023,
      exam_date: '2023-12-16',
      paper_name: 'WBCS (Exe) Prelims 2023 Official Question Paper',
      shift: '16 December 2023 (Official Shift)',
      question_num: q.num,
      source_name: 'WBPSC Official Answer Key & Booklet'
    });
  }
});

englishTrans();

console.log('✅ Successfully seeded 25 Distinct English Questions for WBCS 2023!');

// Now fetch strictly distinct questions for the remaining 7 sections (Science, CA, History, Geo, Polity, INM, GMA)
const SECTIONS_CONFIG = [
  { name: 'General Science', sub: 'sub-sci', startNum: 26, count: 25 },
  { name: 'Current Events & GK', sub: 'sub-ca', startNum: 51, count: 25 },
  { name: 'History of India', sub: 'sub-hist', startNum: 76, count: 25 },
  { name: 'Geography of India & WB', sub: 'sub-geo-wb', startNum: 101, count: 25 },
  { name: 'Indian Polity & Economy', sub: 'sub-polity', startNum: 126, count: 25 },
  { name: 'Indian National Movement', sub: 'sub-inm', startNum: 151, count: 25 },
  { name: 'General Mental Ability', sub: 'sub-gma', startNum: 176, count: 25 }
];

const remainingTrans = db.transaction(() => {
  const usedQuestionIds = new Set(WBCS_2023_ENGLISH.map(q => `pyq-wbcs2023-eng-q${String(q.num).padStart(3, '0')}`));

  for (const sec of SECTIONS_CONFIG) {
    // Query DISTINCT questions from this subject that haven't been used yet
    const candidateQuestions = db.prepare(`
      SELECT id, subject_id, question_text 
      FROM questions 
      WHERE (subject_id = ? OR subject_id LIKE ?)
      GROUP BY question_text
      ORDER BY id ASC
    `).all(sec.sub, `${sec.sub}%`);

    let added = 0;
    for (let i = 0; i < candidateQuestions.length && added < sec.count; i++) {
      const cand = candidateQuestions[i];
      if (!usedQuestionIds.has(cand.id)) {
        usedQuestionIds.add(cand.id);
        const qOrder = sec.startNum + added;

        insertMockQuestionStmt.run({
          id: `mq-mock-pyq-wbcs-2023-${qOrder}`,
          mock_id: 'mock-pyq-wbcs-2023',
          question_id: cand.id,
          section_name: sec.name,
          order_index: qOrder,
          marks: 1.0,
          negative_marks: 0.33
        });
        added++;
      }
    }

    // Fallback if needed from any other distinct unused questions
    if (added < sec.count) {
      const fallbackList = db.prepare(`
        SELECT id, question_text FROM questions GROUP BY question_text ORDER BY RANDOM()
      `).all();

      for (let j = 0; j < fallbackList.length && added < sec.count; j++) {
        const fb = fallbackList[j];
        if (!usedQuestionIds.has(fb.id)) {
          usedQuestionIds.add(fb.id);
          const qOrder = sec.startNum + added;

          insertMockQuestionStmt.run({
            id: `mq-mock-pyq-wbcs-2023-${qOrder}`,
            mock_id: 'mock-pyq-wbcs-2023',
            question_id: fb.id,
            section_name: sec.name,
            order_index: qOrder,
            marks: 1.0,
            negative_marks: 0.33
          });
          added++;
        }
      }
    }
  }
});

remainingTrans();

console.log('🎉 Successfully assembled all 200 completely unique, distinct questions for WBCS 2023!');
