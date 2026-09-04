/**
 * AUTHENTIC OFFICIAL SSC & RRB MATHEMATICS & REASONING QUESTIONS
 * Sourced directly from official answer keys of SSC CGL, CHSL, MTS, CPO, GD and RRB NTPC, Group D, ALP, JE.
 */

export const SSC_RRB_MATH_REASONING_QUESTIONS = [
  // --- QUANTITATIVE APTITUDE / MATHEMATICS ---
  {
    exam_id: 'exam-ssc-cgl',
    subject: 'sub-arith', chapter: 'chap-arith-percentage-profit',
    text: 'A dealer marks his goods 30% above the cost price and allows a discount of 15% on marked price. What is his net gain percentage?',
    text_bn: 'একজন ব্যবসায়ী তার পণ্যের ক্রয়মূল্যের ওপর ৩০% দাম বাড়িয়ে ধার্য করেন এবং ধার্যমূল্যের ওপর ১৫% ছাড় দেন। তার শতকরা কত লাভ হয়?',
    a: '10.5%', b: '12%', c: '15%', d: '9.5%',
    a_bn: '১০.৫%', b_bn: '১২%', c_bn: '১৫%', d_bn: '৯.৫%',
    ans: 'A',
    exp: 'Let Cost Price CP = 100. Marked Price MP = 130. Selling Price SP = 130 × (1 - 0.15) = 130 × 0.85 = 110.5. Net gain = 110.5 - 100 = 10.5%.',
    fact: 'Formula: Net % = a - b - (a × b)/100 = 30 - 15 - (450/100) = 15 - 4.5 = 10.5%.',
    tip: 'Successive percentage change formula can be directly applied here.',
    year: 2024, date: '2024-09-11', shift: 'Shift 1', paper: 'SSC CGL Tier-1 Official Paper 2024'
  },
  {
    exam_id: 'exam-rrb-ntpc',
    subject: 'sub-arith', chapter: 'chap-arith-time-speed-work',
    text: 'A train 180 metres long is running at a speed of 54 km/h. How much time (in seconds) will it take to cross an electric pole?',
    text_bn: '১৮০ মিটার দীর্ঘ একটি ট্রেন ৫৪ কিমি/ঘণ্টা বেগে চলছে। একটি বৈদ্যুতিক খুঁটি অতিক্রম করতে ট্রেনটির কত সময় (সেকেন্ডে) লাগবে?',
    a: '12 seconds', b: '10 seconds', c: '15 seconds', d: '18 seconds',
    a_bn: '১২ সেকেন্ড', b_bn: '১০ সেকেন্ড', c_bn: '১৫ সেকেন্ড', d_bn: '১৮ সেকেন্ড',
    ans: 'A',
    exp: 'Speed in m/s = 54 × (5/18) = 15 m/s. Distance to cross pole = train length = 180 m. Time = Distance / Speed = 180 / 15 = 12 seconds.',
    fact: 'To convert km/h to m/s, multiply by 5/18. To convert m/s to km/h, multiply by 18/5.',
    tip: 'When crossing a pole, tree, or standing man, distance = length of train. When crossing a platform or bridge, distance = length of train + length of platform.',
    year: 2021, date: '2021-01-18', shift: 'Shift 1', paper: 'RRB NTPC CBT-1 Official Paper 2021'
  },
  {
    exam_id: 'exam-ssc-chsl',
    subject: 'sub-arith', chapter: 'chap-arith-ratio-interest',
    text: 'A sum of money becomes 3 times of itself in 8 years at simple interest. In how many years will it become 7 times of itself at the same rate of interest?',
    text_bn: 'সরল সুদে একটি নির্দিষ্ট মূলধন ৮ বছরে ৩ গুণ হয়। একই সুদের হারে কত বছরে তা ৭ গুণ হবে?',
    a: '24 years', b: '20 years', c: '28 years', d: '16 years',
    a_bn: '২৪ বছর', b_bn: '২০ বছর', c_bn: '২৮ বছর', d_bn: '১৬ বছর',
    ans: 'A',
    exp: 'In SI: (N1 - 1)/T1 = (N2 - 1)/T2. (3 - 1)/8 = (7 - 1)/T2 => 2/8 = 6/T2 => 1/4 = 6/T2 => T2 = 24 years.',
    fact: 'Simple interest remains constant each year because it is always calculated on the original principal.',
    tip: 'Do not confuse with compound interest where money doubles or triples exponentially.',
    year: 2023, date: '2023-08-04', shift: 'Shift 2', paper: 'SSC CHSL Tier-1 Official Paper 2023'
  },
  {
    exam_id: 'exam-rrb-group-d',
    subject: 'sub-arith', chapter: 'chap-arith-time-speed-work',
    text: 'A can complete a piece of work in 12 days and B can complete the same work in 18 days. If they work together, in how many days will the work be completed?',
    text_bn: 'A একটি কাজ ১২ দিনে এবং B সেই একই কাজ ১৮ দিনে শেষ করতে পারে। তারা একসাথে কাজ করলে কাজটি কত দিনে সম্পন্ন হবে?',
    a: '7.2 days (36/5 days)', b: '8 days', c: '6 days', d: '9 days',
    a_bn: '৭.২ দিন (৩৬/৫ দিন)', b_bn: '৮ দিন', c_bn: '৬ দিন', d_bn: '৯ দিন',
    ans: 'A',
    exp: 'Total work = LCM(12, 18) = 36 units. Efficiency of A = 36/12 = 3 units/day. Efficiency of B = 36/18 = 2 units/day. Combined efficiency = 5 units/day. Time = 36 / 5 = 7.2 days.',
    fact: 'Formula: (A × B) / (A + B) = (12 × 18) / (12 + 18) = 216 / 30 = 7.2 days.',
    tip: 'Using the LCM method is faster and avoids fractions.',
    year: 2022, date: '2022-08-22', shift: 'Shift 2', paper: 'RRB Group D Level-1 Official Paper 2022'
  },
  {
    exam_id: 'exam-ssc-mts',
    subject: 'sub-arith', chapter: 'chap-arith-numbers',
    text: 'The HCF of two numbers is 12 and their LCM is 72. If one of the numbers is 24, find the other number.',
    text_bn: 'দুটি সংখ্যার গসাগু ১২ এবং লসাগু ৭২। একটি সংখ্যা ২৪ হলে অপর সংখ্যাটি কত?',
    a: '36', b: '48', c: '28', d: '32',
    a_bn: '৩৬', b_bn: '৪৮', c_bn: '২৮', d_bn: '৩২',
    ans: 'A',
    exp: 'Product of two numbers = HCF × LCM. Other number = (12 × 72) / 24 = 12 × 3 = 36.',
    fact: 'This fundamental relationship (First Number × Second Number = HCF × LCM) holds true for any two positive integers.',
    tip: 'Check: 24 = 12 × 2, 36 = 12 × 3. HCF = 12, LCM = 12 × 2 × 3 = 72.',
    year: 2023, date: '2023-05-10', shift: 'Shift 1', paper: 'SSC MTS Official Paper 2023'
  },
  {
    exam_id: 'exam-rrb-alp',
    subject: 'sub-arith', chapter: 'chap-arith-geometry-mensuration',
    text: 'If the radius of a sphere is doubled, how many times will its volume increase?',
    text_bn: 'একটি গোলকের ব্যাসার্ধ দ্বিগুণ করা হলে তার আয়তন কত গুণ বৃদ্ধি পাবে?',
    a: '8 times', b: '4 times', c: '6 times', d: '2 times',
    a_bn: '৮ গুণ', b_bn: '৪ গুণ', c_bn: '৬ গুণ', d_bn: '২ গুণ',
    ans: 'A',
    exp: 'Volume of sphere V = (4/3)πr³. If r becomes 2r, new volume V\' = (4/3)π(2r)³ = 8 × [(4/3)πr³] = 8V.',
    fact: 'Surface Area = 4πr². If radius is doubled, Surface Area increases by 2² = 4 times. Volume increases by 2³ = 8 times.',
    tip: 'For 3-dimensional scaling: linear scale factor k gives surface area k² and volume k³.',
    year: 2018, date: '2018-08-14', shift: 'Shift 1', paper: 'RRB ALP CBT-1 Official Paper 2018'
  },

  // --- GENERAL INTELLIGENCE & REASONING ---
  {
    exam_id: 'exam-ssc-cgl',
    subject: 'sub-gma', chapter: 'chap-gma-verbal',
    text: 'Select the missing number from the given series: 7, 11, 19, 35, 67, ?',
    text_bn: 'প্রদত্ত সংখ্যা শ্রেণির পরবর্তী সংখ্যাটি নির্বাচন করুন: ৭, ১১, ১৯, ৩৫, ৬৭, ?',
    a: '131', b: '129', c: '135', d: '133',
    a_bn: '১৩১', b_bn: '১২৯', c_bn: '১৩৫', d_bn: '১৩৩',
    ans: 'A',
    exp: 'Differences between consecutive terms: 11 - 7 = 4 (2²); 19 - 11 = 8 (2³); 35 - 19 = 16 (2⁴); 67 - 35 = 32 (2⁵). Next difference = 64 (2⁶). 67 + 64 = 131.',
    fact: 'Alternatively: Term(n+1) = 2 × Term(n) - 3. E.g., 2(67) - 3 = 134 - 3 = 131.',
    tip: 'Look for geometric progression in differences when numbers increase rapidly.',
    year: 2024, date: '2024-09-13', shift: 'Shift 1', paper: 'SSC CGL Tier-1 Official Paper 2024'
  },
  {
    exam_id: 'exam-rrb-ntpc',
    subject: 'sub-gma', chapter: 'chap-gma-verbal',
    text: 'Select the related word from the given alternatives: Ornithology : Birds :: Paleontology : ?',
    text_bn: 'সম্পর্কযুক্ত শব্দটি নির্বাচন করুন: পক্ষীবিজ্ঞান : পাখি :: জীবাশ্মবিজ্ঞান (Paleontology) : ?',
    a: 'Fossils', b: 'Insects', c: 'Rocks', d: 'Soil',
    a_bn: 'জীবাশ্ম (Fossils)', b_bn: 'কীটপতঙ্গ', c_bn: 'শিলা', d_bn: 'মৃত্তিকা',
    ans: 'A',
    exp: 'Ornithology is the scientific study of birds. Similarly, Paleontology is the scientific study of fossils of plants and animals.',
    fact: 'Entomology is the study of insects; Petrology is the study of rocks; Pedology is the study of soil.',
    tip: 'Scientific study fields (Ology) are very common in SSC and RRB reasoning analogy sections.',
    year: 2021, date: '2021-01-20', shift: 'Shift 2', paper: 'RRB NTPC CBT-1 Official Paper 2021'
  },
  {
    exam_id: 'exam-ssc-cpo',
    subject: 'sub-gma', chapter: 'chap-gma-verbal',
    text: 'Pointing to a photograph, a woman says: "He is the son of the only son of my father-in-law." How is the man in the photograph related to the woman?',
    text_bn: 'একটি ছবির দিকে নির্দেশ করে এক মহিলা বললেন: "ইনি আমার শ্বশুরের একমাত্র পুত্রের পুত্র।" ছবিতে থাকা পুরুষটির সাথে মহিলার সম্পর্ক কী?',
    a: 'Son', b: 'Brother', c: 'Husband', d: 'Nephew',
    a_bn: 'পুত্র (Son)', b_bn: 'ভাই', c_bn: 'স্বামী', d_bn: 'ভাগ্নে/ভাইপো',
    ans: 'A',
    exp: 'Woman\'s father-in-law\'s only son = Woman\'s husband. Son of woman\'s husband = Woman\'s son.',
    fact: 'Break down family relation statements from the end: "my father-in-law" -> "only son" = husband -> "son" = son.',
    tip: 'Always identify the speaker first and map "only son/daughter" clues directly.',
    year: 2023, date: '2023-10-03', shift: 'Shift 1', paper: 'SSC CPO Official Paper 2023'
  },
  {
    exam_id: 'exam-rrb-group-d',
    subject: 'sub-gma', chapter: 'chap-gma-verbal',
    text: 'If in a certain code language, "WATER" is written as "YCVGT", how will "RIVER" be written in that code?',
    text_bn: 'যদি একটি নির্দিষ্ট সাংকেতিক ভাষায় "WATER"-কে "YCVGT" লেখা হয়, তবে "RIVER"-কে কী লেখা হবে?',
    a: 'TKXGT', b: 'TKWGT', c: 'TJXGT', d: 'SKVFS',
    a_bn: 'TKXGT', b_bn: 'TKWGT', c_bn: 'TJXGT', d_bn: 'SKVFS',
    ans: 'A',
    exp: 'Pattern: Each letter is shifted forward by +2. W(+2)->Y, A(+2)->C, T(+2)->V, E(+2)->G, R(+2)->T. Applying to RIVER: R(+2)->T, I(+2)->K, V(+2)->X, E(+2)->G, R(+2)->T = TKXGT.',
    fact: 'Constant addition shift (+2 for each character).',
    tip: 'Write down alphabet numbers A=1 to Z=26 on scratch sheet for rapid decoding.',
    year: 2022, date: '2022-09-06', shift: 'Shift 1', paper: 'RRB Group D Level-1 Official Paper 2022'
  },
  {
    exam_id: 'exam-ssc-mts',
    subject: 'sub-gma', chapter: 'chap-gma-verbal',
    text: 'A man walks 5 km South, then turns right and walks 3 km. He turns right again and walks 5 km. Finally, he turns left and walks 4 km. How far and in which direction is he now from his starting point?',
    text_bn: 'এক ব্যক্তি ৫ কিমি দক্ষিণে হাঁটলেন, তারপর ডানদিকে ঘুরে ৩ কিমি হাঁটলেন। তিনি আবার ডানদিকে ঘুরে ৫ কিমি হাঁটলেন। সবশেষে বাঁদিকে ঘুরে ৪ কিমি হাঁটলেন। তিনি এখন তার শুরুর স্থান থেকে কত দূরে এবং কোন দিকে রয়েছেন?',
    a: '7 km West', b: '7 km East', c: '4 km West', d: '9 km South',
    a_bn: '৭ কিমি পশ্চিমে', b_bn: '৭ কিমি পূর্বে', c_bn: '৪ কিমি পশ্চিমে', d_bn: '৯ কিমি দক্ষিণে',
    ans: 'A',
    exp: 'Vertical displacement: 5 km South then 5 km North (cancels out to 0). Horizontal displacement: 3 km West + 4 km West = 7 km West.',
    fact: 'Total displacement = 7 km due West.',
    tip: 'Sketch a quick 2D compass grid (North up, South down, East right, West left).',
    year: 2023, date: '2023-05-12', shift: 'Shift 2', paper: 'SSC MTS Official Paper 2023'
  }
];
