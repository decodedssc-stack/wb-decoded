import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('📚 Upgrading All Questions to Comprehensive Textbook-Grade Explanations...');

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('temp_store = MEMORY');

// Subject-Wise Encyclopedic Theory Capsules
const subjectTheoryCapsules = {
  'sub-inm': {
    theoryEn: '📖 [TEXTBOOK REFERENCE: INDIAN NATIONAL MOVEMENT]\nThe Indian Freedom Struggle developed across distinct phases: 1. Early Resistance & Peasant/Tribal Uprisings (1763–1857); 2. Moderate Phase (1885–1905, constitutional agitation by W.C. Bonnerjee, Dadabhai Naoroji); 3. Extremist & Swadeshi Phase (1905–1919, Lal-Bal-Pal, Anushilan Samiti, Aurobindo Ghosh); 4. Gandhian Mass Movements (1920–1942, Non-Cooperation, Civil Disobedience, Quit India); 5. Armed Resistance & Independence (Netaji Subhas Chandra Bose, INA, RIN Mutiny, Transfer of Power 1947).',
    theoryBn: '📖 [পাঠ্যপুস্তক সহায়িকা: ভারতের জাতীয় আন্দোলন]\nভারতের স্বাধীনতা সংগ্রাম মূলত পাঁচটি প্রধান পর্যায়ে বিকশিত হয়েছিল: ১. প্রাথমিক কৃষক ও উপজাতি বিদ্রোহ (১৭৬৩–১৮৫৭); ২. নরমপন্থী পর্যায় (১৮৮৫–১৯০৫, উমেশচন্দ্র বন্দ্যোপাধ্যায়, দাদাভাই নওরোজি); ৩. চরমপন্থী ও স্বদেশী আন্দোলন (১৯০৫–১৯১৯, লাল-বাল-পাল, অনুশীলন সমিতি); ৪. গান্ধীবাদী গণআন্দোলন (১৯২০–১৯৪২, অসহযোগ, আইন অমান্য, ভারত ছাড়ো); ৫. সশস্ত্র বিপ্লব ও ক্ষমতা হস্তান্তর (নেতাজি সুভাষচন্দ্র বসু, আজাদ হিন্দ ফৌজ, নৌবিদ্রোহ ১৯৪৭)।',
    eliminationTip: '🔍 Option Elimination Strategy: Always check whether the event belongs to the Pre-Gandhian or Gandhian phase. Pay strict attention to Viceroy tenures (Curzon 1899-1905, Hardinge II 1910-1916, Chelmsford 1916-1921, Irwin 1926-1931, Linlithgow 1936-1943, Mountbatten 1947).'
  },
  'sub-hist': {
    theoryEn: '📖 [TEXTBOOK REFERENCE: HISTORY OF INDIA & BENGAL]\nIndian History spans: 1. Ancient Urbanism (Indus Valley 2500–1750 BCE); 2. Vedic Culture & Mahajanapadas (600 BCE, Rise of Magadha, Buddhism & Jainism); 3. Classical Empires (Mauryas under Ashoka, Guptas under Samudragupta & Chandragupta II); 4. Ancient Bengal (Sasanka of Gauda, Pala Dynasty under Gopala/Dharmapala, Sena Dynasty under Vijayasena/Ballalasena); 5. Medieval Sultanate & Mughals (Ilyas Shahi & Hussain Shahi Bengal Sultanates, Akbar to Aurangzeb, Nawabs of Bengal from Murshid Quli to Siraj-ud-Daulah); 6. British Rule (Plassey 1757, Buxar 1764, Permanent Settlement 1793, Bengal Renaissance).',
    theoryBn: '📖 [পাঠ্যপুস্তক সহায়িকা: ভারত ও বাংলার ইতিহাস]\nইতিহাসের প্রধান মাইলফলকসমূহ: ১. সিন্ধু সভ্যতা ও নগর পরিকল্পনা; ২. বৈদিক যুগ ও মহাজনপদ (মগধের উত্থান, বৌদ্ধ ও জৈন ধর্ম); ৩. মৌর্য ও গুপ্ত সাম্রাজ্য; ৪. প্রাচীন বাংলা (শশাঙ্ক, পাল বংশ, সেন বংশ); ৫. মধ্যযুগীয় বাংলা সালতানাত ও মুঘল সুবাহ (ইলিয়াস শাহী, হোসেন শাহী, মুর্শিদকুলি খাঁ থেকে সিরাজউদ্দৌলা); ৬. ব্রিটিশ ইস্ট ইন্ডিয়া কোম্পানি শাসন (পলাশীর যুদ্ধ ১৭৫৭, বক্সার ১৭৬৪, চিরস্থায়ী বন্দোবস্ত ১৭৯৩, বাংলার নবজাগরণ)।',
    eliminationTip: '🔍 Option Elimination Strategy: Distinguish between architectural monuments built by Delhi Sultans vs Mughal Emperors. Check whether ancient inscriptions were in Brahmi, Kharosthi, or Prakrit.'
  },
  'sub-geo-wb': {
    theoryEn: '📖 [TEXTBOOK REFERENCE: GEOGRAPHY OF WEST BENGAL & INDIA]\nWest Bengal Physical Geography Highlights:\n• Boundaries: 3 International (Bangladesh 2,217 km, Nepal, Bhutan) and 5 Inter-State (Jharkhand, Bihar, Odisha, Sikkim, Assam).\n• Physiographic Divisions: 1. Northern Mountain Region (Singalila Ridge, Sandakphu 3,636 m highest peak, Phalut); 2. Sub-Himalayan Terai (West of Teesta) & Duars (East of Teesta); 3. Western Plateau Fringe (Rarh plain, Susunia, Gorgaburu, Biharinath); 4. Gangetic Deltaic Plain & Active Sundarbans Mangroves (UNESCO Heritage Site 1987).\n• River Systems: Himalayan Rivers (Teesta, Torsa, Jaldhaka, Sankosh), Gangetic (Bhagirathi-Hooghly, Jalangi, Churni), Western Plateau Rivers (Damodar DVC project, Rupnarayan, Subarnarekha, Mayurakshi).\n• Tropic of Cancer (23°30\' N) passes through 5 districts: Purulia, Bankura, Paschim Bardhaman, Purba Bardhaman, Nadia.',
    theoryBn: '📖 [পাঠ্যপুস্তক সহায়িকা: পশ্চিমবঙ্গ ও ভারতের ভূগোল]\nপশ্চিমবঙ্গের ভূগোলের গুরুত্বপূর্ণ তথ্যাবলি:\n• সীমানা: ৩টি আন্তর্জাতিক (বাংলাদেশ, নেপাল, ভুটান) ও ৫টি আন্তঃরাজ্য (ঝাড়খণ্ড, বিহার, ওড়িশা, সিকিম, আসাম)।\n• ভূপ্রকৃতি: উত্তরের পার্বত্য অঞ্চল (সান্দাকফু ৩,৬৩৬ মিটার সর্বোচ্চ শৃঙ্গ), তরাই ও ডুয়ার্স, পশ্চিমের রাঢ় মালভূমি (গোরগাবুরু, সুশুনিয়া), গাঙ্গেয় বদ্বীপ ও সুন্দরবন ম্যানগ্রোভ।\n• নদীপ্রণালী: উত্তরবঙ্গের নদী (তিস্তা, তোর্সা, জলঢাকা, সঙ্কোশ), দক্ষিণবঙ্গের নদী (ভাগীরথী-হুগলি, দামোদর, রূপনারায়ণ, সুবর্ণরেখা)।\n• কর্কটক্রান্তি রেখা ৫টি জেলার ওপর দিয়ে গেছে: পুরুলিয়া, বাঁকুড়া, পশ্চিম বর্ধমান, পূর্ব বর্ধমান, নদীয়া।',
    eliminationTip: '🔍 Option Elimination Strategy: Remember that Teesta separates North Bengal into Terai (West) and Duars (East). Sankosh forms the natural boundary between West Bengal and Assam.'
  },
  'sub-polity': {
    theoryEn: '📖 [TEXTBOOK REFERENCE: INDIAN CONSTITUTION & POLITY]\nCore Constitutional Architecture:\n• Preamble: Sovereign, Socialist, Secular, Democratic, Republic (Justice, Liberty, Equality, Fraternity; amended once in 1976 by 42nd Amendment).\n• Fundamental Rights (Part III, Arts 12–35): Right to Equality (Arts 14–18), Freedom (Art 19), Protection of Life & Personal Liberty (Art 21), Right to Constitutional Remedies (Art 32 Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto).\n• Directive Principles of State Policy (Part IV, Arts 36–51, Irish origin) & Fundamental Duties (Part IVA, Art 51A, Swaran Singh Committee).\n• Constitutional Bodies: Election Commission (Art 324), Finance Commission (Art 280), UPSC & State PSC (Art 315), CAG (Art 148).\n• Local Governance: 73rd Amendment (1992, 3-Tier Panchayati Raj: Gram Panchayat, Panchayat Samiti, Zilla Parishad) & 74th Amendment (Municipalities).',
    theoryBn: '📖 [পাঠ্যপুস্তক সহায়িকা: ভারতীয় সংবিধান ও রাষ্ট্রনীতি]\nসংবিধানের মূল কাঠামো:\n• প্রস্তাবনা: সার্বভৌম, সমাজতান্ত্রিক, ধর্মনিরপেক্ষ, গণতান্ত্রিক, সাধারণতন্ত্র (৪২তম সংশোধনী ১৯৭৬)।\n• মৌলিক অধিকার (অংশ ৩, অনুচ্ছেদ ১২–৩৫): সাম্যের অধিকার (১৪–১৮), স্বাধীনতার অধিকার (১৯), জীবনের অধিকার (২১), সাংবিধানিক প্রতিবিধানের অধিকার (৩২ ও ২২৬ নম্বর রিট)।\n• নির্দেশমূলক নীতি (অংশ ৪, অনুচ্ছেদ ৩৬–৫১, আয়ারল্যান্ড থেকে গৃহীত) এবং মৌলিক কর্তব্য (অনুচ্ছেদ ৫১A)।\n• সাংবিধানিক সংস্থা: নির্বাচন কমিশন (অনুচ্ছেদ ৩২৪), অর্থ কমিশন (অনুচ্ছেদ ২৮০), পিএসসি (অনুচ্ছেদ ৩১৫), সিএজি (অনুচ্ছেদ ১৪৮)।\n• পঞ্চায়েতি রাজ: ৭৩তম সংবিধান সংশোধনী অনুযায়ী ত্রিস্তরীয় পঞ্চায়েত ব্যবস্থা (গ্রাম পঞ্চায়েত, পঞ্চায়েত সমিতি, জেলা পরিষদ)।',
    eliminationTip: '🔍 Option Elimination Strategy: Memorize that Writs can be issued by Supreme Court under Art 32 and by High Courts under Art 226 (High Court writ jurisdiction is wider as it covers legal rights too).'
  },
  'sub-econ': {
    theoryEn: '📖 [TEXTBOOK REFERENCE: INDIAN ECONOMY & WB SCHEMES]\nEconomic Framework & State Schemes:\n• Planning: 1st FYP (1951–56, Harrod-Domar Agricultural Model); 2nd FYP (1956–61, P.C. Mahalanobis Heavy Industrialization Model); NITI Aayog (established 1 January 2015).\n• Monetary Policy: RBI (established 1935, nationalized 1949). Policy tools: Repo Rate, Reverse Repo, CRR (Cash Reserve Ratio), SLR (Statutory Liquidity Ratio).\n• West Bengal Welfare Architecture:\n  - Kanyashree Prakalpa (2013): UN Public Service Award 1st Prize 2017.\n  - Swasthya Sathi (2016): Universal cashless smart card coverage up to ₹5 Lakhs.\n  - Lakshmir Bhandar (2021): Monthly financial assistance of ₹1,000 (General) and ₹1,200 (SC/ST) for female heads of family.\n  - Sabooj Sathi (2015): Free bicycles to secondary school students.\n  - Student Credit Card: Up to ₹10 Lakhs education loan at 4% simple interest.',
    theoryBn: '📖 [পাঠ্যপুস্তক সহায়িকা: ভারতীয় অর্থনীতি ও রাজ্য সরকারি প্রকল্প]\nঅর্থনীতি ও সমাজকল্যাণমূলক রূপরেখা:\n• পঞ্চবার্ষিকী পরিকল্পনা: প্রথম পরিকল্পনা (হ্যারড-ডোমার মডেল), দ্বিতীয় পরিকল্পনা (মহলানবীশ মডেল), নীতি আয়োগ (১লা জানুয়ারি ২০১৫)।\n• মুদ্রানীতি ও ব্যাংকিং: রিজার্ভ ব্যাংক (১৯৩৫ সালে প্রতিষ্ঠা, ১৯৪৯ সালে জাতীয়করণ), রেপো রেট, সিআরআর, এসএলআর।\n• পশ্চিমবঙ্গের প্রধান প্রকল্পসমূহ:\n  - কন্যাশ্রী প্রকল্প (২০১৩): ২০১৭ সালে রাষ্ট্রসংঘের প্রথম পুরস্কার প্রাপ্ত।\n  - স্বাস্থ্য সাথী (২০১৬): পরিবার পিছু বার্ষিক ৫ লক্ষ টাকা পর্যন্ত ক্যাশলেস স্বাস্থ্যবীমা।\n  - লক্ষ্মীর ভাণ্ডার (২০২১): সাধারণ মহিলাদের ১,০০০ টাকা ও তপশিলি মহিলাদের ১,২০০ টাকা মাসিক আর্থিক অনুদান।\n  - সবুজ সাথী (২০১৫): ছাত্রছাত্রীদের বিনামূল্যে সাইকেল প্রদান।\n  - স্টুডেন্ট ক্রেডিট কার্ড: ৪% সরল সুদে ১০ লক্ষ টাকা পর্যন্ত শিক্ষা ঋণ।',
    eliminationTip: '🔍 Option Elimination Strategy: Differentiate between qualitative (margin requirements, moral suasion) and quantitative (Repo rate, CRR, SLR) monetary policy tools.'
  },
  'sub-arith': {
    theoryEn: '📖 [TEXTBOOK REFERENCE: QUANTITATIVE APTITUDE & ARITHMETIC]\nEssential Mathematical Formulas & Shortcuts:\n• Percentage & Successive Discounts: Net $D\\% = d_1 + d_2 - \\frac{d_1 d_2}{100}$. Net Change = $a + b + \\frac{ab}{100}$.\n• Profit & Loss: Profit % = $\\frac{\\text{SP} - \\text{CP}}{\\text{CP}} \\times 100$. $\\text{SP} = \\text{MP} \\times \\left(1 - \\frac{D\\%}{100}\\right)$.\n• Simple & Compound Interest: $SI = \\frac{PTR}{100}$. 2-Year $CI - SI = P \\left(\\frac{R}{100}\\right)^2$. 3-Year $CI - SI = P \\left(\\frac{R}{100}\\right)^2 \\left(\\frac{300 + R}{100}\\right)$.\n• Time & Work: Total Work = LCM of individual days. Days required = $\\frac{\\text{Total LCM Units}}{\\text{Combined Daily Units}}$.\n• Speed, Time & Distance: $1\\text{ km/h} = \\frac{5}{18}\\text{ m/s}$, $1\\text{ m/s} = \\frac{18}{5}\\text{ km/h}$. Relative speed (same direction) = $S_1 - S_2$, (opposite direction) = $S_1 + S_2$.',
    theoryBn: '📖 [পাঠ্যপুস্তক সহায়িকা: পাটিগণিত ও শর্টকাট সূত্র]\nঅঙ্কের আবশ্যক সূত্রাবলি:\n• লাভ ও ক্ষতি: লাভ% = [(বিক্রয়মূল্য - ক্রয়মূল্য) / ক্রয়মূল্য] × ১০০। ধার্যমূল্য থেকে বিক্রয়মূল্য: $\\text{SP} = \\text{MP} \\times (1 - D/100)$।\n• সরল ও চক্রবৃদ্ধি সুদ: $SI = \\frac{PTR}{100}$। ২ বছরের চক্রবৃদ্ধি ও সরল সুদের পার্থক্য = $P (R/100)^2$।\n• সময় ও কার্য: মোট কাজ = দিন সংখ্যাগুলোর লসাগু। প্রয়োজনীয় সময় = মোট লসাগু ইউনিট / দৈনিক যৌথ ক্ষমতা।\n• সময়, গতি ও দূরত্ব: কিমি/ঘণ্টা থেকে মিটার/সেকেন্ডে রূপান্তর = (৫/১৮) দিয়ে গুণ; মিটার/সেকেন্ড থেকে কিমি/ঘণ্টায় রূপান্তর = (১৮/৫) দিয়ে গুণ।',
    eliminationTip: '🔍 Shortcut Technique: Use LCM unit method for work/pipes and effective percentage tables for 2-year and 3-year compound interest.'
  },
  'sub-sci': {
    theoryEn: '📖 [TEXTBOOK REFERENCE: GENERAL SCIENCE & EVERYDAY TECHNOLOGY]\n• Physics: Newton\'s Laws of Motion; Optics: Total Internal Reflection ($i > \\theta_c$, Optical fibres, Diamonds, Mirages); Sound: Longitudinal mechanical waves (speed maximum in solids, 0 in vacuum); Heat: 0 Kelvin = -273.15°C.\n• Chemistry: Chemical names: Baking Soda ($NaHCO_3$), Washing Soda ($Na_2CO_3 \\cdot 10H_2O$), Bleaching Powder ($CaOCl_2$), Plaster of Paris ($CaSO_4 \\cdot \\frac{1}{2}H_2O$), Quicklime ($CaO$), Slaked Lime ($Ca(OH)_2$).\n• Biology: Vitamins: Water-soluble (B, C), Fat-soluble (A, D, E, K). Deficiencies: Vit A -> Night Blindness; Vit B1 -> Beriberi; Vit C -> Scurvy; Vit D -> Rickets; Vit K -> Impaired blood clotting. Circulatory system: Blood group O = Universal Donor; Blood group AB = Universal Recipient.',
    theoryBn: '📖 [পাঠ্যপুস্তক সহায়িকা: সাধারণ বিজ্ঞান ও পরিবেশ]\n• পদার্থবিদ্যা: নিউটনের গতিসূত্র; আলোকবিজ্ঞান: অভ্যন্তরীণ পূর্ণ প্রতিফলন (অপটিক্যাল ফাইবার, হীরক); শব্দ: অনুদৈর্ঘ্য তরঙ্গ (কঠিনে গতিবেগ সর্বাধিক, শূন্যমাধ্যমে শূন্য)।\n• রসায়ন: গুরুত্বপূর্ণ রাসায়নিক সংকেত: বেকিং সোডা ($NaHCO_3$), কাপড় কাচার সোডা ($Na_2CO_3 \\cdot 10H_2O$), ব্লিচিং পাউডার ($CaOCl_2$), প্লাস্টার অফ প্যারিস ($CaSO_4 \\cdot \\frac{1}{2}H_2O$), কলিচুন ($CaO$), পোড়াচুন ($Ca(OH)_2$)।\n• জীববিজ্ঞান: ভিটামিন: জলে দ্রবণীয় (বি, সি), স্নেহে দ্রবণীয় (এ, ডি, ই, কে)। অভাবজনিত রোগ: ভিটামিন এ -> রাতকানা; ভিটামিন বি১ -> বেরিবেরি; ভিটামিন সি -> স্কার্ভি; ভিটামিন ডি -> রিকেট। সার্বজনীন দাতা রক্তের গ্রুপ = O, সার্বজনীন গ্রহীতা = AB।',
    eliminationTip: '🔍 Option Elimination Strategy: Remember that sound waves cannot travel through vacuum, whereas light/electromagnetic waves travel fastest in vacuum ($3 \\times 10^8\\text{ m/s}$).'
  },
  'sub-eng': {
    theoryEn: '📖 [TEXTBOOK REFERENCE: ENGLISH COMPOSITION & GRAMMAR]\n• Subject-Verb Agreement: When two subjects are connected by "either... or", "neither... nor", "not only... but also", the verb agrees with the closer subject.\n• Preposition Collocations: "Abide by", "Adhere to", "Abstain from", "Comply with", "Dispose of" (single f), "Cope with" (not cope up with), "Congratulate on", "Prevent from".\n• High-Yield Vocabulary & Roots: Bene- (Good: Benevolent, Benefactor); Male- (Bad: Malevolent, Malefactor); Phil- (Love: Philanthropist); Omni- (All: Omniscient, Omnipotent, Omnipresent).',
    theoryBn: '📖 [পাঠ্যপুস্তক সহায়িকা: ইংরেজি ব্যাকরণ ও শব্দভাণ্ডার]\n• Subject-Verb Agreement: "Neither... nor" বা "Either... or" দ্বারা যুক্ত বাক্যে Verb সর্বদা নিকটতম Subject অনুযায়ী নির্ধারিত হয়।\n• Appropriate Prepositions: "Adhere to", "Abide by", "Compliant with", "Dispose of", "Cope with" (কখনোই cope up with নয়)।\n• Root Words: Bene (উত্তম), Male (মন্দ), Phil (প্রেম/ভালোবাসা), Omni (সর্ব)।',
    eliminationTip: '🔍 Option Elimination Strategy: Look for double prepositions or incorrect redundant words like "cope up with" -> correct is "cope with".'
  },
  'sub-gma': {
    theoryEn: '📖 [TEXTBOOK REFERENCE: GENERAL INTELLIGENCE & REASONING]\n• Series & Coding: Alphabet position mappings ($A=1, B=2, \\dots, Z=26$). Mnemonic EJOTY (5, 10, 15, 20, 25). Opposite letter pairs ($A-Z, B-Y, C-X, D-W, E-V, F-U, G-T, H-S, I-R, J-Q, K-P, L-O, M-N$). Sum of opposite pairs = 27.\n• Blood Relations: Construct generational family trees. $+ = \\text{Male}$, $- = \\text{Female}$, $= = \\text{Married Couple}$, $| = \\text{Parent-Child}$.\n• Directions: 8 Standard cardinal & ordinal directions (N, S, E, W, NE, NW, SE, SW). Right turn = $90^\\circ$ clockwise; Left turn = $90^\\circ$ counter-clockwise.',
    theoryBn: '📖 [পাঠ্যপুস্তক সহায়িকা: সাধারণ বুদ্ধিমত্তা ও যুক্তি বিশ্লেষণ]\n• বর্ণমালা ও কোডিং: A থেকে Z এর সংখ্যাগত মান (A=১, Z=২৬)। EJOTY নিয়ম (৫, ১০, ১৫, ২০, ২৫)। বিপরীত বর্ণের জোড়া (A-Z, B-Y, C-X... যোগফল সর্বদা ২৭)।\n• রক্তের সম্পর্ক: পারিবারিক বংশলতিকা তৈরি করুন (+ পুরুষ, - মহিলা, = স্বামী-স্ত্রী, | পিতা/মাতা-সন্তান)।\n• দিক নির্ণয়: ডানাবর্তে ঘোরা = ৯০° ক্লকওয়াইজ; বাঁদিকে ঘোরা = ৯০° অ্যান্টি-ক্লকওয়াইজ।',
    eliminationTip: '🔍 Shortcut Technique: In coding-decoding, check if letter positions are shifted or directly substituted before applying complex arithmetic operations.'
  },
  'sub-cdp': {
    theoryEn: '📖 [TEXTBOOK REFERENCE: CHILD DEVELOPMENT & PEDAGOGY]\n• Cognitive Development (Jean Piaget): 4 Stages: 1. Sensorimotor (0–2 yrs, Object Permanence); 2. Pre-Operational (2–7 yrs, Egocentrism, Animism); 3. Concrete Operational (7–11 yrs, Conservation, Classification); 4. Formal Operational (11+ yrs, Abstract Thinking).\n• Socio-Cultural Theory (Lev Vygotsky): Zone of Proximal Development (ZPD), Scaffolding (More Knowledgeable Other - MKO), Private Speech.\n• Moral Development (Lawrence Kohlberg): Pre-Conventional, Conventional, Post-Conventional levels (Heinz Dilemma).',
    theoryBn: '📖 [পাঠ্যপুস্তক সহায়িকা: শিশু বিকাশ ও শিক্ষণবিজ্ঞান]\n• জ্ঞানীয় বিকাশ (জ্যাঁ পিঁয়াজে): ৪টি স্তর: ১. সংবেদন-সঞ্চালনমূলক (০-২ বছর, বস্তু স্থায়িত্ব); ২. প্রাক-সক্রিয়তামূলক (২-৭ বছর); ৩. মূর্ত-সক্রিয়তামূলক (৭-১১ বছর, সংরক্ষণ ক্ষমতা); ৪. নিয়মতান্ত্রিক সক্রিয়তামূলক (১১+ বছর, বিমূর্ত চিন্তা)।\n• সমাজ-সংস্কৃতি তত্ত্ব (ভাইগটস্কি): Zone of Proximal Development (ZPD), Scaffolding (সহযোগিতামূলক শিখন)।\n• নৈতিক বিকাশ (কোহলবার্গ): প্রাক-প্রথাগত, প্রথাগত ও উত্তর-প্রথাগত স্তর (হাইঞ্জের দ্বিধা)।',
    eliminationTip: '🔍 Option Elimination Strategy: Reject any option advocating rote learning, strict punishment, or teacher-centric passive lecturing.'
  },
  'sub-ben': {
    theoryEn: '📖 [TEXTBOOK REFERENCE: BENGALI GRAMMAR & LITERATURE]\n• Sandhi & Samas: Swarasandhi ($a + a = \\bar{a}$), Byanjansandhi, Bisargasandhi. Samas 6 types: Dwandwa, Tatpurush, Karmadharay, Dwigu, Bahubrihi, Abyayibhab.\n• Karak: 6 types: Kartri, Karma, Karan, Sampradan/Nimitta, Apadan, Adhikaran.\n• Literary Luminaries: Rabindranath Tagore (Nobel 1913 Gitanjali); Kazi Nazrul Islam (Bidrohi Kobi); Bankim Chandra Chattopadhyay (Anandamath, Vande Mataram); Michael Madhusudan Dutt (Meghnadbadh Kavya); Sarat Chandra Chattopadhyay.',
    theoryBn: '📖 [পাঠ্যপুস্তক সহায়িকা: বাংলা ব্যাকরণ ও সাহিত্য]\n• সন্ধি ও সমাস: স্বরসন্ধি, ব্যঞ্জনসন্ধি ও বিসর্গসন্ধি। সমাসের প্রধান ৬টি শ্রেণি: দ্বন্দ্ব, তৎপুরুষ, কর্মধারয়, দ্বিগু, বহুব্রীহি, অব্যয়ীভাব।\n• কারক ও বিভক্তি: কর্তৃকারক, কর্মকারক, করণকারক, অপাদানকারক, অধিকরণকারক, নিমিত্ত কারক।\n• বিশিষ্ট সাহিত্যিক: রবীন্দ্রনাথ ঠাকুর (১৯১৩ সালে নোবেল), কাজী নজরুল ইসলাম, বঙ্কিমচন্দ্র চট্টোপাধ্যায় (বন্দে মাতরম্), মাইকেল মধুসূদন দত্ত (মেঘনাদবধ কাব্য), শরৎচন্দ্র চট্টোপাধ্যায়।',
    eliminationTip: '🔍 Option Elimination Strategy: In Karak identification, ask \'কে\' for Kartri, \'কী/কাকে\' for Karma, \'কী দিয়ে\' for Karan, \'কোথা হতে\' for Apadan, and \'কোথায়/কখন\' for Adhikaran.'
  }
};

// Batch update questions with rich textbook notes
console.log('Enriching question explanations with deep textbook theory notes...');

const updateExplStmt = db.prepare(`
  UPDATE questions
  SET explanation = ?,
      explanation_bn = ?,
      important_fact = ?,
      exam_tip = ?
  WHERE subject_id = ?
`);

const startTime = Date.now();

db.transaction(() => {
  for (const [subId, cap] of Object.entries(subjectTheoryCapsules)) {
    const questionsForSub = db.prepare('SELECT id, explanation, explanation_bn, important_fact, exam_tip FROM questions WHERE subject_id = ?').all(subId);
    
    const updateSingleQ = db.prepare(`
      UPDATE questions
      SET explanation = ?,
          explanation_bn = ?,
          important_fact = ?,
          exam_tip = ?
      WHERE id = ?
    `);

    for (const q of questionsForSub) {
      const richEn = `${q.explanation}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${cap.theoryEn}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${cap.eliminationTip}`;
      const richBn = `${q.explanation_bn || ''}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${cap.theoryBn}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
      const richFact = q.important_fact || 'Comprehensive high-yield factual reference for competitive examinations.';
      const richTip = q.exam_tip || cap.eliminationTip;

      updateSingleQ.run(richEn, richBn, richFact, richTip, q.id);
    }
  }
})();

const elapsedSecs = ((Date.now() - startTime) / 1000).toFixed(2);
console.log(`\n🎉 Successfully enriched all questions with Textbook-Grade Explanations in ${elapsedSecs}s!`);

const sample = db.prepare("SELECT id, question_text, explanation FROM questions WHERE subject_id = 'sub-inm' LIMIT 1").get();
console.log('\n🔍 Sample Enriched Explanation in DB:');
console.log('Question:', sample.question_text.slice(0, 80));
console.log('Enriched Explanation Preview:\n', sample.explanation.slice(0, 300) + '...\n');
