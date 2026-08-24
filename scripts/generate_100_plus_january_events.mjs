import fs from 'fs';
import path from 'path';

// Master data array with full 100+ events
const events = [
  // 1. WEST BENGAL & EAST INDIA SPECIAL (10 Events)
  {
    id: 'wb-01-gangasagar',
    day: 14,
    dateStr: '10–17 January',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal Special',
    title: 'Ganga Sagar Mela: Eco-Friendly "Green Mela", AI Surveillance & ₹5 Lakh Insurance',
    titleBn: 'গঙ্গাসাগর মেলা: পরিবেশ-বান্ধব "গ্রিন মেলা", এআই নজরদারি ও ₹৫ লক্ষের জীবন বীমা',
    summary: 'Millions of pilgrims gathered at Sagar Island at the confluence of River Hooghly and Bay of Bengal for the sacred Makar Sankranti holy dip.',
    summaryBn: 'দক্ষিণ ২৪ পরগনার সাগরদ্বীপে গঙ্গা ও বঙ্গোপসাগরের সঙ্গমে অনুষ্ঠিত হলো ঐতিহ্যবাহী গঙ্গাসাগর মেলা। রাজ্য সরকার তীর্থযাত্রীদের জন্য বিশেষ সুবিধা প্রদান করে।',
    keyPoints: [
      'Organized as a "Green & Plastic-Free Mela" with 12,000 bio-toilets and 1,300 AI surveillance cameras.',
      'West Bengal Government provided ₹5 Lakh accidental insurance coverage for every visiting pilgrim.',
      'Special "e-Snan" (sacred water delivered via India Post) and "e-Darshan" live-streamed across 20+ countries.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Sagar Island & Bengal Hydrology',
      points: [
        'Geographical Location: Sagar Island is in South 24 Parganas in Sundarban delta, separated from mainland Kakdwip by Muriganga River.',
        'Kapil Muni Temple: Built originally in 437 AD by King of Jaipur and rebuilt in 1973.',
        'Proverb Origin: "সব তীর্থ বারবার, গঙ্গাসাগর একবার" reflects historical maritime voyages.',
        'River Hydrology: Hooghly is western distributary of Ganges, bifurcating at Farakka Barrage.'
      ]
    },
    examRelevance: 'WBCS Prelims (Geography), WB Police SI, Food SI.'
  },
  {
    id: 'wb-02-tangail-saree',
    day: 3,
    dateStr: '03 January',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal GI Tags',
    title: 'Tangail Saree of Nadia & Purba Bardhaman Awarded Official GI Tag',
    titleBn: 'নদিয়া ও পূর্ব বর্ধমানের ঐতিহ্যবাহী টাঙ্গাইল শাড়ি পেল জিআই ট্যাগ',
    summary: 'The GI Registry granted Geographical Indication status to Tangail Saree, woven by master weavers of Phulia, Santipur, and Samudragarh.',
    summaryBn: 'পশ্চিমবঙ্গের ঐতিহ্যবাহী তাঁতশিল্পের অন্যতম প্রতীক টাঙ্গাইল শাড়িকে ভারত সরকার জিআই স্বীকৃতি প্রদান করেছে।',
    keyPoints: [
      'Originates from Tangail district of undivided Bengal; master weavers migrated to Nadia post-1947.',
      'Characterized by fine count cotton/mulberry silk, extra-weft jacquard designs, and soft texture.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Handloom Industry of West Bengal',
      points: [
        'Santipur & Phulia: Famous weaving clusters in Nadia along the Bhagirathi River.',
        'Handloom Centers of Bengal: Dhaniakhali (Hooghly), Begampur (Hooghly), Bishnupur (Bankura Baluchari).'
      ]
    },
    examRelevance: 'WBCS Art & Culture, WBPSC Clerkship.'
  },
  {
    id: 'wb-03-garad-korial',
    day: 3,
    dateStr: '03 January',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal GI Tags',
    title: 'Murshidabad Garad & Korial Silk Sarees Conferred Official GI Tags',
    titleBn: 'মুর্শিদাবাদের গরদ ও কোড়িয়াল সিল্ক শাড়ির ঐতিহাসিক জিআই ট্যাগ লাভ',
    summary: 'Two iconic silk varieties of Murshidabad — Garad (pure silk with red border) and Korial (crisp white raw silk) — received official GI certification.',
    summaryBn: 'মুর্শিদাবাদের ঐতিহ্যবাহী গরদ ও কোড়িয়াল শাড়ি ভৌগোলিক নির্দেশক (GI) স্বীকৃতি লাভ করেছে।',
    keyPoints: [
      'Garad (Mirzapur, Murshidabad): Un-dyed natural mulberry silk fabric symbolizing purity in religious ceremonies.',
      'Korial: Heavy white silk saree woven with finest mulberry filaments, worn during Durga Puja Sindoor Khela.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Sericulture & Silk Industry in West Bengal',
      points: [
        'Types of Commercial Silk in India: Mulberry, Tasar, Eri, and Muga (India produces all 4).',
        'Murshidabad & Malda: Hubs of mulberry sericulture in West Bengal (Resham Shilpa).',
        'CSRTI: Central Sericultural Research and Training Institute in Berhampore, Murshidabad.'
      ]
    },
    examRelevance: 'WBCS Bengal Geography, WBPSC Miscellaneous.'
  },
  {
    id: 'wb-04-sundarban-honey',
    day: 3,
    dateStr: '03 January',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal GI Tags',
    title: 'Sundarban Mouban Honey Hand-Collected by "Mauli" Community Receives GI Tag',
    titleBn: 'সুন্দরবনের মৌলিদের সংগৃহীত "মৌবন মধু" পেল মর্যাদাপূর্ণ জিআই ট্যাগ',
    summary: 'Natural wild mangrove honey harvested by indigenous honey gatherers (Maulis) from the mangrove core forests of Sundarbans received GI tag.',
    summaryBn: 'সুন্দরবনের গভীর ম্যানগ্রোভ অরণ্য থেকে মৌলিদের সংগৃহীত প্রাকৃতিক মধু জিআই স্বীকৃতি অর্জন করেছে।',
    keyPoints: [
      'Harvested from wild hives of giant rock bee (Apis dorsata) in Khalisha, Bain, and Goran mangrove florets.',
      'Processed and bottled under the brand name "Sundarban Mouban" by West Bengal Forest Development Corporation (WBFDCL).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Sundarbans Ecology & Mangrove Flora',
      points: [
        'UNESCO World Heritage Site: Inscribed in 1987; Ramsar Wetland Site in 2019 (largest in India - 4,230 sq km).',
        'Dominant Mangrove Species: Sundari (Heritiera fomes), Goran, Geon, Bain, Golpata, Hental.',
        'Royal Bengal Tiger: Sole mangrove tiger habitat in the world.'
      ]
    },
    examRelevance: 'WBCS Prelims Environment, WBP Constable.'
  },
  {
    id: 'wb-05-kalonunia-rice',
    day: 3,
    dateStr: '03 January',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal GI Tags',
    title: 'North Bengal\'s Aromatic "Kalonunia Rice" (Prince of Rice) Conferred GI Tag',
    titleBn: 'উত্তরবঙ্গের সুগন্ধী কালোশুয়ো চাল "কালোমুনিয়া ধান" পেল জিআই স্বীকৃতি',
    summary: 'Kalonunia rice, indigenous black-husked aromatic fine paddy cultivated in North Bengal (Jalpaiguri, Cooch Behar, Alipurduar), was awarded GI status.',
    summaryBn: 'উত্তরবঙ্গের জলপাইগুড়ি ও কোচবিহারের দেশীয় সুগন্ধী ধান কালোমুনিয়া "ছোট এলাচ ধান" হিসেবে জিআই ট্যাগ পেল।',
    keyPoints: [
      'Known locally as the "Prince of Rice" ("ছোট এলাচ চাল") due to its fine grain, subtle fragrance, and soft texture for Payesh/Pulao.',
      'Grown organically in Terai-Dooars alluvial tracts nourished by Himalayan glacier-fed rivers Teesta, Torsa, and Jaldhaka.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: GI Tagged Rice Varieties of India & West Bengal',
      points: [
        'Other GI Rice of Bengal: Gobindobhog Rice (Burdwan, 2017) and Tulaipanji Rice (Uttar Dinajpur, 2017).',
        'Other Notable Indian GI Rice: Kalanamak (UP - "Buddha Rice"), Black Rice / Chak-Hao (Manipur), Basmati, Pokkali (Kerala).'
      ]
    },
    examRelevance: 'WBCS Agriculture & Geography, WBPSC Food SI.'
  },
  {
    id: 'wb-06-kolkata-bookfair',
    day: 28,
    dateStr: 'January',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal Special',
    title: '48th International Kolkata Book Fair (IKBF) at Boi Mela Prangan, Salt Lake',
    titleBn: '৪৮তম আন্তর্জাতিক কলকাতা বইমেলা (বইমেলা প্রাঙ্গণ, সল্টলেক)',
    summary: 'World\'s largest non-trade book fair held at Boi Mela Prangan, Salt Lake, organized by the Publishers & Booksellers Guild.',
    summaryBn: 'সল্টলেকের বইমেলা প্রাঙ্গণে ৪৮তম আন্তর্জাতিক কলকাতা বইমেলা মহাসমারোহে অনুষ্ঠিত হয়।',
    keyPoints: [
      'Over 1,000 stalls featuring international publishers from 25+ countries.',
      'Special pavilions dedicated to Little Magazines and Kolkata Literary Meet (KLM).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: History of Kolkata Book Fair',
      points: [
        'Inception: 1976 (inaugurated opposite Kolkata Academy of Fine Arts).',
        'Publishers & Booksellers Guild: Established in 1975 by Sushil Mukherjee, Jayant Manaktala.',
        'World Ranking: 2nd largest book fair globally in footfall after Frankfurt.'
      ]
    },
    examRelevance: 'WBCS GS Paper IV & WBPSC Miscellaneous.'
  },
  {
    id: 'wb-07-ustad-rashid-khan',
    day: 9,
    dateStr: '09 January',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal Special',
    title: 'Classical Music Maestro Ustad Rashid Khan Passes Away in Kolkata at 55',
    titleBn: 'প্রখ্যাত ভারতীয় শাস্ত্রীয় সঙ্গীতশিল্পী ওস্তাদ রশিদ খানের প্রয়াণ (কলকাতা)',
    summary: 'Padma Bhushan awardee Ustad Rashid Khan, legendary exponent of the Rampur-Sahaswan Gharana, passed away in Kolkata.',
    summaryBn: 'রামপুর-সহসওয়ান ঘরানার প্রবাদপ্রতিম সঙ্গীতশিল্পী ওস্তাদ রশিদ খান কলকাতায় শেষ নিঃশ্বাস ত্যাগ করেন।',
    keyPoints: [
      'Trained under his grand-uncle Ustad Nissar Hussain Khan at ITC Sangeet Research Academy (SRA), Kolkata.',
      'Honoured with Padma Shri (2006), Banga Bibhushan (2012), and Padma Bhushan (2022).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Classical Music Gharanas & Bengal SRA',
      points: [
        'Rampur-Sahaswan Gharana: Founded by Ustad Inayat Hussain Khan in Rampur, UP.',
        'ITC SRA Kolkata: Established in 1977 in Tollygunge to preserve guru-shishya parampara.',
        'Banga Bibhushan: Highest state civilian award instituted by Govt of West Bengal in 2011.'
      ]
    },
    examRelevance: 'WBCS Art & Culture & WBPSC Miscellaneous.'
  },
  {
    id: 'wb-08-joydev-kenduli',
    day: 14,
    dateStr: '14–16 January',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal Special',
    title: 'Historic Joydev Kenduli Mela Celebrated on the Banks of Ajoy River, Birbhum',
    titleBn: 'বীরভূমের অজয় নদের তীরে ঐতিহাসিক জয়দেব কেঁদুলি মেলা ও বাউল সম্মেলন',
    summary: 'Annual gathering of Bauls, Fakirs, and Kirtaniyas celebrated at Kenduli village in Birbhum district.',
    summaryBn: 'কবি জয়দেবের স্মৃতিধন্য কেঁদুলিতে অজয় নদের তীরে বাউল সম্মেলন অনুষ্ঠিত হয়।',
    keyPoints: [
      'Celebrates the birthplace of 12th-century Sanskrit poet Jayadeva, author of Gita Govinda.',
      'Terracotta Radharaman Temple built in 1683 by the Queen of Bardhaman.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Medieval Bengal History & Baul Tradition',
      points: [
        'Poet Jayadeva: Court poet of King Lakshmana Sena (Sena Dynasty, 12th Century AD).',
        'River Ajoy: Originates in Deoghar (Jharkhand) and joins Bhagirathi River at Katwa.',
        'Baul Songs: Inscribed on UNESCO Intangible Cultural Heritage list in 2008.'
      ]
    },
    examRelevance: 'WBCS Bengal History & Literature.'
  },
  {
    id: 'wb-09-kai-chutney-odisha',
    day: 2,
    dateStr: '02 January',
    category: 'wb',
    categoryLabel: '🏛️ East India GI Tags',
    title: 'Mayurbhanj Similipal Kai Chutney (Red Weaver Ant) & Kapdaganda Shawl Conferred GI Tags',
    titleBn: 'ময়ূরভঞ্জের লাল পিঁপড়ের কাই চাটনি ও কাপড়াগণ্ডা শাল পেল জিআই ট্যাগ',
    summary: 'GI tag granted to Mayurbhanj\'s indigenous red weaver ant chutney and Dongria Kondh embroidered shawl.',
    summaryBn: 'ওড়িশার ময়ূরভঞ্জের সিমলিপালের লাল পিঁপড়ের চাটনি ও কাপড়াগণ্ডা শাল জিআই ট্যাগ অর্জন করেছে।',
    keyPoints: [
      'Kai Chutney (Oecophylla smaragdina) is rich in zinc, calcium, vitamin B12, and proteins.',
      'Kapdaganda Shawl: Hand-embroidered by Dongria Kondh women of Niyamgiri hills.',
      'Lanjia Saura Paintings (Idital) also received GI tag.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Similipal & PVTGs of India',
      points: [
        'Similipal NP: In Mayurbhanj, Odisha; UNESCO Biosphere Reserve (2009).',
        '75 PVTGs in India: Odisha has the highest count (13 PVTGs).'
      ]
    },
    examRelevance: 'WBCS Geography & Environment.'
  },
  {
    id: 'wb-10-arunachal-gi-tags',
    day: 3,
    dateStr: '03 January',
    category: 'wb',
    categoryLabel: '🏛️ Northeast GI Tags',
    title: '3 Indigenous Products from Arunachal Pradesh Awarded GI Tags',
    titleBn: 'অরুণাচল প্রদেশের ৩টি ঐতিহ্যবাহী সামগ্রী পেল জিআই ট্যাগ',
    summary: 'Arunachal Pradesh secured GI tags for Adi Kekir (ginger), Wancho Wooden Craft, and Tibetan Handmade Carpets.',
    summaryBn: 'অরুণাচল প্রদেশের আদি কেকির আদা, ওয়ানচো কাঠের শিল্প ও তিব্বতি কার্পেট জিআই স্বীকৃতি লাভ করেছে।',
    keyPoints: [
      'Adi Kekir: Highly pungent indigenous ginger grown by Adi tribe in East Siang.',
      'Wancho Wooden Craft: Traditional wood carvings by Wancho tribe of Longding district.',
      'Tibetan Handmade Carpets: Handcrafted by Tibetan refugees in Changlang district.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Arunachal Pradesh Geography & Tribes',
      points: [
        'Major Tribes: Nyishi, Apatani, Adi, Mishmi, Wancho, Monpa, Tagin.',
        'Namdapha National Park: In Changlang district (4 big cat species: tiger, leopard, snow leopard, clouded leopard).',
        'Pakhui (Pakke) Tiger Reserve: Located in East Kameng district.'
      ]
    },
    examRelevance: 'WBCS Northeast Geography & SSC CGL.'
  },

  // 2. NATIONAL SCHEMES & PUBLIC WELFARE (10 Events)
  {
    id: 'sch-01-suryodaya',
    day: 22,
    dateStr: '22 January',
    category: 'schemes',
    categoryLabel: '☀️ National Schemes',
    title: 'PM Announces "Pradhan Mantri Suryodaya Yojana" (Rooftop Solar for 1 Crore Households)',
    titleBn: 'প্রধানমন্ত্রী সূর্যোদয় যোজনা: ১ কোটি পরিবারে ছাদ-সৌরবিদ্যুৎ প্রকল্প ঘোষণা',
    summary: 'Flagship renewable energy initiative to install rooftop solar power systems on 1 crore households, providing up to 300 units free power/month.',
    summaryBn: 'দেশের ১ কোটি দরিদ্র ও মধ্যবিত্ত পরিবারে সৌরবিদ্যুৎ পৌঁছে দিতে সূর্যোদয় যোজনা চালু হলো।',
    keyPoints: [
      'REC Limited designated as the National Programme Implementation Agency.',
      'Central financial assistance covering up to 60% subsidy for 2 kW systems.',
      'Aims to accelerate India\'s 500 GW non-fossil capacity target by 2030.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Solar Energy in India & ISA',
      points: [
        'International Solar Alliance (ISA): Formed 2015 at COP21 Paris | HQ: Gurugram, Haryana.',
        'India\'s Largest Solar Park: Bhadla Solar Park (2,245 MW, Jodhpur, Rajasthan).',
        'Modhera (Gujarat): India\'s first 24x7 solar-powered village.'
      ]
    },
    examRelevance: 'WBCS Economy, SSC CGL, Banking Exams.'
  },
  {
    id: 'sch-02-yuva-nidhi',
    day: 12,
    dateStr: '12 January',
    category: 'schemes',
    categoryLabel: '☀️ State Schemes',
    title: 'Karnataka Government Formally Launches "Yuva Nidhi" Guarantee Scheme',
    titleBn: 'কর্ণাটক সরকারের যুব নিধি বেকার ভাতা প্রকল্প চালু',
    summary: 'Karnataka Chief Minister launched Yuva Nidhi in Shivamogga on National Youth Day, providing monthly allowances to unemployed youth.',
    summaryBn: 'শিক্ষিত বেকার যুবক-যুবতীদের জন্য কর্ণাটক সরকার মাসিক বেকার ভাতা প্রকল্প চালু করল।',
    keyPoints: [
      '₹3,000/month for unemployed graduates and ₹1,500/month for diploma holders for up to 2 years.',
      'Disbursed directly via DBT (Direct Benefit Transfer).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Karnataka Guarantees & Unemployment Surveys',
      points: [
        'Karnataka 5 Guarantees: Gruha Jyothi, Gruha Lakshmi, Anna Bhagya, Shakti, Yuva Nidhi.',
        'Periodic Labour Force Survey (PLFS): Conducted by NSO (MoSPI) for employment metrics.'
      ]
    },
    examRelevance: 'WBCS Economy & Banking GA.'
  },
  {
    id: 'sch-03-mahtari-vandan',
    day: 10,
    dateStr: 'January',
    category: 'schemes',
    categoryLabel: '☀️ State Schemes',
    title: 'Chhattisgarh Launches "Mahtari Vandan Yojana" for Married Women',
    titleBn: 'ছত্তীসগঢ়ে বিবাহিত মহিলাদের জন্য "মাহতারি বন্দন যোজনা" চালু',
    summary: 'Chhattisgarh Government approved Mahtari Vandan Yojana providing direct financial aid of ₹1,000 per month (₹12,000 annually) to married women.',
    summaryBn: 'ছত্তীসগঢ়ের বিবাহিত মহিলাদের বার্ষিক ১২,০০০ টাকা সরাসরি আর্থিক সহায়তা প্রদানের প্রকল্প শুরু।',
    keyPoints: [
      'Beneficiaries: Married, widowed, and abandoned women aged 21 and above.',
      'Transferred on the 1st of every month via Aadhaar-linked DBT accounts.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Women Welfare Schemes Across States',
      points: [
        'Lakshmir Bhandar: West Bengal flagship scheme (₹1,000/₹1,200 monthly for women).',
        'Ladli Behna Yojana: Madhya Pradesh (₹1,250 monthly).',
        'Maha Lakshmi Scheme: Telangana (₹2,500 monthly + free bus travel).'
      ]
    },
    examRelevance: 'WBCS Social Schemes & State Exams.'
  },
  {
    id: 'sch-04-operation-amrit',
    day: 17,
    dateStr: '17 January',
    category: 'schemes',
    categoryLabel: '☀️ Public Health',
    title: 'Kerala Launches "Operation AMRIT" Against Over-the-Counter Antibiotic Sales',
    titleBn: 'কেরালা সরকারের প্রেসক্রিপশনহীন অ্যান্টিবায়োটিক বন্ধে "অপারেশন অমৃত" চালু',
    summary: 'Kerala Drugs Control Department launched AMRIT (Antimicrobial Resistance Intervention For Total Health) to stop retail pharmacy OTC antibiotic sales.',
    summaryBn: 'অ্যান্টিমাইক্রোবিয়াল রেজিস্ট্যান্স রোধে কেরালা সরকার কঠোর নজরদারি অভিযান শুরু করেছে।',
    keyPoints: [
      'Pharmacies mandated to maintain prescription records for all Class H and H1 antibiotic drugs.',
      'Public helpline set up to report pharmacies selling antibiotics without doctor prescriptions.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Antimicrobial Resistance (AMR) & WHO Guidelines',
      points: [
        'AMR Definition: Microorganisms (bacteria, viruses, fungi, parasites) resist antimicrobial medicines.',
        'AWaRe Classification: WHO categorized antibiotics into Access, Watch, and Reserve groups in 2017.',
        'Kerala: First state in India to release a State Action Plan on AMR (KARSAP).'
      ]
    },
    examRelevance: 'WBCS Biology & Public Health, UPSC Prelims.'
  },
  {
    id: 'sch-05-mahila-udyamita-assam',
    day: 22,
    dateStr: '22 January',
    category: 'schemes',
    categoryLabel: '☀️ State Schemes',
    title: 'Assam Launches "Mukhyamantri Mahila Udyamita Abhiyan" for Rural Women SHGs',
    titleBn: 'আসামে গ্রামীণ স্বনির্ভর গোষ্ঠীর নারীদের জন্য "মহিলা উদ্যমিতা অভিযান"',
    summary: 'Financial support scheme providing ₹35,000 total grant to 39 lakh rural self-help group (SHG) women micro-entrepreneurs.',
    summaryBn: 'গ্রামীণ মহিলাদের স্বনির্ভর উদ্যোক্তা হিসেবে গড়ে তুলতে আসাম সরকার এই বিশেষ প্রকল্প ঘোষণা করেছে।',
    keyPoints: [
      'Phased financial assistance: ₹10,000 seed grant + ₹25,000 bank loan-subsidy linkage.',
      'Conditional criteria: Adherence to population policy guidelines (maximum child norms).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Self-Help Groups (SHGs) & DAY-NRLM',
      points: [
        'SHG-Bank Linkage Programme: Launched by NABARD in 1992 on recommendations of S.K. Kalia Committee.',
        'Deendayal Antyodaya Yojana-NRLM: Launched in 2011 by Ministry of Rural Development.',
        'Lakhpati Didi Initiative: Central target to empower 3 Crore rural women SHG members with annual income > ₹1 Lakh.'
      ]
    },
    examRelevance: 'WBCS Economy, Banking GA, SSC.'
  },
  {
    id: 'sch-06-sampoornata-abhiyan',
    day: 15,
    dateStr: 'January',
    category: 'schemes',
    categoryLabel: '☀️ National Governance',
    title: 'NITI Aayog Launches "Sampoornata Abhiyan 2.0" for Aspirational Districts & Blocks',
    titleBn: 'নীতি আয়োগ দ্বারা উচ্চাকাঙ্ক্ষী জেলা ও ব্লকের জন্য "সম্পূর্ণতা অভিযান ২.০" চালু',
    summary: 'A 3-month saturation campaign across 112 Aspirational Districts and 500 Aspirational Blocks targeting 100% saturation in key health, nutrition, and farming KPIs.',
    summaryBn: 'নীতি আয়োগ দেশের আকাঙ্ক্ষিত জেলা এবং ব্লকে ৬টি মূল সূচকের শতভাগ লক্ষ্যপূরণে এই অভিযান শুরু করেছে।',
    keyPoints: [
      'KPIs: Antenatal care, supplementary nutrition, diabetes/hypertension screening, Soil Health Cards, and SHG credit linkage.',
      'West Bengal Aspirational Districts: Birbhum, Dakshin Dinajpur, Malda, Murshidabad, and Nadia.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: NITI Aayog Structure & Reports',
      points: [
        'Established: 1 January 2015 via Cabinet Resolution (replacing Planning Commission).',
        'Chairperson: Prime Minister (Ex-officio) | Vice-Chairman: Appointed by PM (Cabinet rank).',
        'Key Reports: SDG India Index, Multidimensional Poverty Index (MPI), State Health Index.'
      ]
    },
    examRelevance: 'WBCS Prelims Economy & Mains Paper V.'
  },
  {
    id: 'sch-07-prerana-program',
    day: 5,
    dateStr: '05 January',
    category: 'schemes',
    categoryLabel: '☀️ Education Initiatives',
    title: 'Ministry of Education Launches "PRERANA: An Experiential Learning Program"',
    titleBn: 'শিক্ষা মন্ত্রক কর্তৃক "প্রেরণা: অভিজ্ঞতাভিত্তিক শিখন কর্মসূচি" চালু',
    summary: 'Weekly residential experiential learning programme for Classes 9 to 12 launched from the historic Vernacular School (est. 1888) in Vadnagar, Gujarat.',
    summaryBn: 'গুজরাটের ভাদনগরে নবম থেকে দ্বাদশ শ্রেণির ছাত্র-ছাত্রীদের জন্য এক সপ্তাহের আবাসিক নেতৃত্বের পাঠ্যক্রম চালু হলো।',
    keyPoints: [
      'Selects 20 students (10 boys, 10 girls) from across India every week.',
      'Curriculum based on 9 core value themes inspired by Indian Knowledge System (IKS) and NEP 2020.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: National Education Policy (NEP 2020)',
      points: [
        'NEP 2020 Drafting Committee Head: Dr. K. Kasturirangan (Former ISRO Chairman).',
        'Replaced: 1986 National Policy on Education.',
        'Curricular Framework: 5+3+3+4 structure (replacing 10+2 system).'
      ]
    },
    examRelevance: 'Primary TET, WBCS Polity & Education.'
  },
  {
    id: 'sch-08-smart-ayurveda',
    day: 5,
    dateStr: '05 January',
    category: 'schemes',
    categoryLabel: '☀️ AYUSH & Healthcare',
    title: 'CCRAS Launches "SMART 2.0" to Mainstream Clinical Research in Ayurveda Colleges',
    titleBn: 'আয়ুর্বেদ গবেষণায় সিসিআরএএস দ্বারা "স্মার্ট ২.০" প্রকল্প চালু',
    summary: 'Central Council for Research in Ayurvedic Sciences (CCRAS) launched SMART 2.0 (Scope for Mainstreaming Ayurveda Research in Teaching Professionals).',
    summaryBn: 'আয়ুর্বেদ শিক্ষকদের মাধ্যমে ক্লিনিক্যাল গবেষণার মানোন্নয়নে কেন্দ্রীয় গবেষণা পরিষদ স্মার্ট ২.০ চালু করেছে।',
    keyPoints: [
      'Targets clinical studies in Balakshara (pediatrics), anemia, diabetes, osteoarthritis, and neurological disorders.',
      'Implemented in collaboration with National Commission for Indian System of Medicine (NCISM).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Ministry of AYUSH & Research Councils',
      points: [
        'AYUSH Acronym: Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homoeopathy (Ministry formed Nov 2014).',
        'NIH: National Institute of Homoeopathy in Salt Lake, Kolkata, West Bengal.'
      ]
    },
    examRelevance: 'WBPSC Miscellaneous & General Science.'
  },
  {
    id: 'sch-09-sukanya-samriddhi-hike',
    day: 2,
    dateStr: '02 January',
    category: 'schemes',
    categoryLabel: '☀️ Small Savings',
    title: 'Sukanya Samriddhi Yojana (SSY) Interest Rate Hiked to 8.2% for Q4',
    titleBn: 'সুকন্যা সমৃদ্ধি যোজনায় সুদের হার বাড়িয়ে ৮.২% করা হলো',
    summary: 'Ministry of Finance raised interest rate on Sukanya Samriddhi Account by 20 bps from 8.0% to 8.2% for Q4.',
    summaryBn: 'কন্যা সন্তানদের সঞ্চয় প্রকল্পে সুদের হার বৃদ্ধি করেছে কেন্দ্রীয় অর্থ মন্ত্রক।',
    keyPoints: [
      'Account can be opened for girl child below 10 years of age (max 2 accounts/family).',
      'Exempt-Exempt-Exempt (EEE) tax status under Section 80C.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Beti Bachao Beti Padhao',
      points: [
        'BBBP: Launched 22 January 2015 from Panipat, Haryana.',
        'Administered by: WCD, Education, Health ministries.'
      ]
    },
    examRelevance: 'Banking GA, WBCS Economy.'
  },
  {
    id: 'sch-10-pli-green-hydrogen',
    day: 15,
    dateStr: 'January',
    category: 'schemes',
    categoryLabel: '☀️ Green Energy',
    title: 'SECI Awards 1.5 GW Electrolyser Manufacturing Under SIGHT Scheme',
    titleBn: 'সবুজ হাইড্রোজেন মিশনে ১.৫ গিগাওয়াট ইলেক্ট্রোলাইজার উৎপাদনের বরাদ্দ',
    summary: 'Solar Energy Corporation of India (SECI) finalized winners for financial incentives under Strategic Interventions for Green Hydrogen Transition (SIGHT).',
    summaryBn: 'জাতীয় গ্রিন হাইড্রোজেন মিশনের অধীনে ইলেক্ট্রোলাইজার উৎপাদনে কেন্দ্রীয় প্রণোদনা প্রদান করা হয়েছে।',
    keyPoints: [
      'Part of ₹19,744 Crore National Green Hydrogen Mission (NGHM) launched Jan 2023.',
      'Target: 5 MMT green hydrogen production per annum by 2030.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Hydrogen Fuel Classifications',
      points: [
        'Green Hydrogen: Produced via water electrolysis with renewable solar/wind power.',
        'Blue Hydrogen: Produced from natural gas with Carbon Capture and Storage (CCS).',
        'Grey Hydrogen: Produced from fossil fuels with CO2 emissions.'
      ]
    },
    examRelevance: 'WBCS Science & Environment, UPSC Prelims.'
  },

  // 3. NATIONAL AFFAIRS, GOVERNANCE & LAW (10 Events)
  {
    id: 'nat-01-republic-day-77',
    day: 26,
    dateStr: '26 January',
    category: 'national',
    categoryLabel: '🇮🇳 National Celebrations',
    title: '77th Republic Day: 150th Anniversary of "Vande Mataram" & Kartavya Path Parade',
    titleBn: '৭৭তম প্রজাতন্ত্র দিবস: "বন্দে মাতরম"-এর ১৫০তম বর্ষপূর্তি ও কর্তব্য পথে কুচকাওয়াজ',
    summary: 'India celebrated its 77th Republic Day at Kartavya Path highlighting the 150th anniversary of Vande Mataram, military indigenization, and Nari Shakti.',
    summaryBn: 'নতুন দিল্লির কর্তব্য পথে বর্ণাঢ্য কুচকাওয়াজের মধ্য দিয়ে ৭৭তম প্রজাতন্ত্র দিবস উদযাপিত হলো।',
    keyPoints: [
      'Central Theme: 150th Anniversary of Bankim Chandra Chattopadhyay\'s National Song "Vande Mataram" (1875).',
      'Tri-Services all-women contingent marched representing women officers across Army, Navy, and Air Force.',
      'Showcased indigenous Long-Range Anti-Ship Hypersonic Missile (LR-AShM) and Ramjet 155mm shells.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Constitutional & Historical Background of Republic Day',
      points: [
        'Why January 26? Commemorates 1929 Lahore Congress Purna Swaraj Declaration presided by Jawaharlal Nehru.',
        'Constitution Adoption: 26 Nov 1949 | Commencement: 26 Jan 1950.',
        'Vande Mataram: Composed 7 Nov 1875 by Bankim Chandra Chattopadhyay in Anandamath (1882); 1st sung at 1896 Calcutta Congress by Rabindranath Tagore; adopted as National Song on 24 Jan 1950.'
      ]
    },
    examRelevance: 'WBCS Prelims & Mains (Polity & INM) and WBP SI.'
  },
  {
    id: 'nat-02-sc-article21-menstrual',
    day: 18,
    dateStr: 'January',
    category: 'national',
    categoryLabel: '🇮🇳 Judiciary & Law',
    title: 'Supreme Court Invokes Article 21: Menstrual Hygiene Declared a Fundamental Right',
    titleBn: 'সুপ্রিম কোর্টের ঐতিহাসিক রায়: সংবিধানের ২১ অনুচ্ছেদ অনুযায়ী ঋতুস্রাবকালীন স্বাস্থ্য মৌলিক অধিকার',
    summary: 'Supreme Court ruled that access to sanitary napkins and separate functional toilets in all schools is an integral part of Right to Life with Dignity under Article 21.',
    summaryBn: 'সুপ্রিম কোর্ট জানিয়েছে স্কুলে ছাত্রীদের জন্য স্যানিটারি ন্যাপকিন ও পরিচ্ছন্ন শৌচাগারের ব্যবস্থা ২১ অনুচ্ছেদের অধীনে মৌলিক অধিকার।',
    keyPoints: [
      'All States & UTs ordered to mandate free sanitary napkin distribution for Classes 6 to 12.',
      'Mandatory functional toilets with incinerators in all government and aided schools.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Landmark Article 21 Expansions',
      points: [
        'Article 21: Right to Life and Personal Liberty.',
        'Right to Privacy: K.S. Puttaswamy (2017) (9-Judge Bench).',
        'Right to Education: Unni Krishnan (1993) -> 86th Amendment 2002 (Article 21A).',
        'Right to Clean Environment: Subhash Kumar v. State of Bihar (1991).'
      ]
    },
    examRelevance: 'Core topic for WBCS Mains Paper V (Polity & Constitution).'
  },
  {
    id: 'nat-03-finance-commission-16',
    day: 5,
    dateStr: 'January Notification',
    category: 'national',
    categoryLabel: '🇮🇳 Constitutional Bodies',
    title: '16th Finance Commission Formally Constituted: Dr. Arvind Panagariya Appointed Chairman',
    titleBn: '১৬তম অর্থ কমিশন গঠিত: ডঃ অরবিন্দ পানাগাড়িয়া চেয়ারম্যান নিযুক্ত',
    summary: 'Government formally constituted the 16th Finance Commission under Article 280 with former NITI Aayog Vice-Chairman Dr. Arvind Panagariya as Chairman.',
    summaryBn: 'সংবিধানের ২৮০ অনুচ্ছেদ অনুযায়ী ভারত সরকার ১৬তম অর্থ কমিশন গঠন করেছে।',
    keyPoints: [
      'Award Period: 5 years from 1 April 2026 to 31 March 2031 (Report submission by 31 Oct 2025).',
      'ToR: Tax devolution between Union and States and disaster management financing review.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Finance Commission (Article 280)',
      points: [
        'Article 280: President constitutes Finance Commission every 5th year.',
        '1st Finance Commission: 1951 (K.C. Neogy).',
        '15th Finance Commission: N.K. Singh (recommended 41% vertical devolution to states).'
      ]
    },
    examRelevance: 'WBCS Polity, Economy & UPSC GS II/III.'
  },
  {
    id: 'nat-04-sc-diamond-jubilee',
    day: 28,
    dateStr: '28 January',
    category: 'national',
    categoryLabel: '🇮🇳 Judiciary',
    title: 'Supreme Court of India Celebrates 75 Years (Diamond Jubilee Inauguration)',
    titleBn: 'ভারতের সুপ্রিম কোর্টের ৭৫ বছর পূর্তি (হীরক জয়ন্তী বর্ষ) উদযাপন',
    summary: 'Supreme Court celebrated its 75th Anniversary of inauguration (inaugurated 28 January 1950 under 1st CJI H.J. Kania).',
    summaryBn: '১৯৫০ সালের ২৮ জানুয়ারি প্রতিষ্ঠিত সুপ্রিম কোর্টের ৭৫তম হীরক জয়ন্তী অনুষ্ঠান অনুষ্ঠিত হলো।',
    keyPoints: [
      'PM Modi launched Digital Supreme Court Reports (Digi-SCR), Digital Courts 2.0, and bilingual website.',
      'Digi-SCR provides free access to 36,000+ judgments since 1950.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Supreme Court of India (Articles 124–147)',
      points: [
        'Sanctioned Strength: 34 Judges (1 CJI + 33 Judges).',
        '1st Chief Justice of India: Justice H.J. Kania (1950–1951).',
        '1st Woman Judge: Justice Fathima Beevi (1989).',
        'Retirement Age: 65 years for Supreme Court Judges (62 years for High Court Judges).'
      ]
    },
    examRelevance: 'WBCS Indian Polity & Constitution.'
  },
  {
    id: 'nat-05-swachh-survekshan',
    day: 11,
    dateStr: '11 January',
    category: 'national',
    categoryLabel: '🇮🇳 Urban Governance',
    title: 'Swachh Survekshan Awards: Indore (8th Streak) & Surat Joint Cleanest Cities',
    titleBn: 'স্বচ্ছ সর্বেক্ষণ পুরস্কার: ইন্দোর ও সুরাট দেশের পরিচ্ছন্নতম শহর',
    summary: 'MoHUA announced national sanitation awards with Indore maintaining its #1 streak for 8th year, sharing rank with Surat.',
    summaryBn: 'আবাসন মন্ত্রকের স্বচ্ছ সর্বেক্ষণে ইন্দোর ও সুরাট যৌথভাবে শীর্ষস্থান অধিকার করেছে।',
    keyPoints: [
      'Cleanest Cities (>1 Lakh Pop): 1. Indore & Surat, 3. Navi Mumbai.',
      'Cleanest State: Maharashtra | Cleanest Ganga Town: Varanasi.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Swachh Bharat Mission (SBM)',
      points: [
        'Launched: 2 October 2014 by PM Modi on Gandhi Jayanti.',
        '1st Swachh Survekshan: 2016 (Mysuru won 1st edition).'
      ]
    },
    examRelevance: 'WBPSC Food SI, Clerkship, WBCS.'
  },
  {
    id: 'nat-06-atal-setu',
    day: 12,
    dateStr: '12 January',
    category: 'national',
    categoryLabel: '🇮🇳 Infrastructure',
    title: 'PM Dedicates Atal Setu (MTHL) — India\'s Longest Sea Bridge (21.8 km)',
    titleBn: 'ভারতের দীর্ঘতম সমুদ্র সেতু "অটল সেতু" (২১.৮ কিমি) উদ্বোধন',
    summary: 'Inauguration of Mumbai Trans Harbour Link (MTHL) connecting Sewri to Nhava Sheva, built at over ₹17,840 Crore.',
    summaryBn: 'মুম্বাইয়ের সেউরি থেকে নবি মুম্বাইয়ের নাভা শেভা পর্যন্ত ২১.৮ কিমি দীর্ঘ সমুদ্র সেতুর উদ্বোধন হলো।',
    keyPoints: [
      '16.5 km over sea and 5.5 km on land, cutting travel time from 2 hours to 20 minutes.',
      'First bridge in India to use Orthotropic Steel Deck (OSD) and Open Road Tolling (ORT).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Longest Bridges in India',
      points: [
        'Longest Sea Bridge: Atal Setu (21.8 km, Maharashtra).',
        'Longest River Bridge: Bhupen Hazarika Setu / Dhola-Sadiya (9.15 km, Lohit River, Assam).',
        'Longest Rail-cum-Road Bridge: Bogibeel Bridge (4.94 km, Brahmaputra River).'
      ]
    },
    examRelevance: 'WBCS Geography & Infrastructure, WBP SI.'
  },
  {
    id: 'nat-07-lakshadweep-cable',
    day: 3,
    dateStr: '03 January',
    category: 'national',
    categoryLabel: '🇮🇳 Telecom & Islands',
    title: 'PM Inaugurates Kochi-Lakshadweep Submarine Optical Fibre Cable (KLI-SOFC)',
    titleBn: 'কোচি-লাক্ষাদ্বীপ সাবমেরিন অপটিক্যাল ফাইবার কেবলের উদ্বোধন',
    summary: '1,868 km high-speed undersea submarine cable dedicated to connect 11 Lakshadweep islands with 100 Gbps internet.',
    summaryBn: 'কোচি থেকে লাক্ষাদ্বীপের ১১টি দ্বীপে সাবমেরিন অপটিক্যাল ফাইবার কেবল প্রকল্পের উদ্বোধন হলো।',
    keyPoints: [
      'Funded by Universal Service Obligation Fund (USOF) / Digital Bharat Nidhi.',
      'Connects Kavaratti, Agatti, Amini, Kadmat, Chetlat, Kalpeni, Minicoy, Andrott, Kiltan, Bitra, Bangaram.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Lakshadweep Islands & Marine Channels',
      points: [
        'Capital: Kavaratti | 36 coral atolls/islands.',
        '8 Degree Channel: Minicoy from Maldives.',
        '9 Degree Channel: Minicoy from main Lakshadweep.',
        '10 Degree Channel: Andaman from Nicobar.'
      ]
    },
    examRelevance: 'WBCS Indian Geography, SSC CGL.'
  },
  {
    id: 'nat-08-wings-india',
    day: 17,
    dateStr: '17 January',
    category: 'national',
    categoryLabel: '🇮🇳 Civil Aviation',
    title: 'Wings India 2024 (Asia\'s Largest Civil Aviation Event) at Begumpet Airport, Hyderabad',
    titleBn: 'হায়দরাবাদের বেগমপেট বিমানবন্দরে এশিয়ার বৃহত্তম বিমান চলাচল প্রদর্শনী "উইংস ইন্ডিয়া"',
    summary: 'Organized by Ministry of Civil Aviation and FICCI under theme "Connecting India to the World in Amrit Kaal".',
    summaryBn: 'বেগমপেট বিমানবন্দরে এয়ারবাস এ৩৫০ ও বোয়িং ৭৭এক্স বিমানের প্রদর্শনী সহ উইংস ইন্ডিয়া অনুষ্ঠিত হয়।',
    keyPoints: [
      'Air India and Akasa Air announced major aircraft fleet deals.',
      'Bangalore (KIA) and Delhi (IGIA) airports jointly won Best Airport of the Year.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Civil Aviation & UDAN Scheme',
      points: [
        '1st Commercial Flight in India: 18 Feb 1911 from Allahabad to Naini (6 miles) carrying airmail.',
        'UDAN (Ude Desh ka Aam Naagrik): Regional connectivity scheme launched April 2017.'
      ]
    },
    examRelevance: 'WBCS Economy, SSC CGL.'
  },
  {
    id: 'nat-09-ram-mandir-pran-pratishtha',
    day: 22,
    dateStr: '22 January',
    category: 'national',
    categoryLabel: '🇮🇳 Cultural Heritage & Architecture',
    title: 'Pran Pratishtha of Shri Ram Lalla at Newly Constructed Ayodhya Ram Mandir',
    titleBn: 'অযোধ্যা রাম মন্দিরে শ্রী রাম লালার প্রাণ প্রতিষ্ঠা অনুষ্ঠান সম্পন্ন',
    summary: 'The consecration ceremony (Pran Pratishtha) of Ram Lalla was performed in the sanctum sanctorum (Garbhagriha) of the newly built temple in Ayodhya, UP.',
    summaryBn: 'অযোধ্যার নবনির্মিত রাম মন্দিরের গর্ভগৃহে শ্রী রামলালার বিগ্রহে প্রাণ প্রতিষ্ঠা সম্পন্ন হয়।',
    keyPoints: [
      'Temple Architecture: Traditional Nagara style architecture constructed without iron or steel by Larsen & Toubro and Tata Consulting Engineers.',
      'Chief Architect: Chandrakant Sompura and his sons (architects of Akshardham and Somnath).',
      'Idol Sculptor: Arun Yogiraj (Mysuru, Karnataka) sculpted the 51-inch black Krishna Shila granite idol.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Indian Temple Architecture Styles',
      points: [
        'Nagara Style: Northern Indian temple style characterized by curvilinear shikhara, garbha griha, and amalaka (e.g., Khajuraho, Konark, Modhera).',
        'Dravidian Style: Southern Indian style with pyramidal vimana, gopuram, and water tank (e.g., Brihadisvara, Meenakshi).',
        'Vesara Style: Hybrid style developed under Chalukyas and Rashtrakutas (e.g., Belur, Halebidu, Pattadakal).'
      ]
    },
    examRelevance: 'WBCS GS Paper IV (Art & Architecture), SSC CGL.'
  },
  {
    id: 'nat-10-bharat-mobility-expo',
    day: 31,
    dateStr: 'January',
    category: 'national',
    categoryLabel: '🇮🇳 Automotive & EV',
    title: 'Bharat Mobility Global Expo Held at Bharat Mandapam, New Delhi',
    titleBn: 'নতুন দিল্লির ভারত মণ্ডপমে "ভারত মোবিলিটি গ্লোবাল এক্সপো" অনুষ্ঠিত',
    summary: 'India\'s first-ever integrated commercial and clean mobility exhibition bringing together EV manufacturers, battery technology, and automotive components.',
    summaryBn: 'ভারত মণ্ডপমে বৈদ্যুতিক যানবাহন ও আধুনিক অটোমোবাইল প্রযুক্তির মেগা এক্সপো অনুষ্ঠিত হয়।',
    keyPoints: [
      'Showcased advanced EV platforms, flex-fuel engines, green hydrogen trucks, and ADAS components.',
      'Organized by EEPC India with SIAM, ACMA, and ATMA.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: FAME India Scheme & EV Targets',
      points: [
        'FAME Scheme: Faster Adoption and Manufacturing of (Hybrid &) Electric Vehicles launched in 2015 by Ministry of Heavy Industries.',
        'EV30@30 Target: 30% of new vehicle sales to be electric by 2030.'
      ]
    },
    examRelevance: 'WBCS Economy & Science.'
  },

  // 4. INTERNATIONAL AFFAIRS & SUMMITS (10 Events)
  {
    id: 'intl-01-india-uae-defence',
    day: 10,
    dateStr: 'January',
    category: 'international',
    categoryLabel: '🌍 International Alliances',
    title: 'India-UAE Strategic Defence Partnership & $200B Bilateral Trade Accord',
    titleBn: 'ভারত ও সংযুক্ত আরব আমিরশাহীর কৌশলগত প্রতিরক্ষা অংশীদারিত্ব ও $২০০ বিলিয়ন বাণিজ্য চুক্তি',
    summary: 'UAE President visited New Delhi resulting in a Letter of Intent for defence co-production and doubling non-oil bilateral trade to $200B by 2032 under CEPA.',
    summaryBn: 'ভারত ও সংযুক্ত আরব আমিরশাহী প্রতিরক্ষা সরঞ্জাম যৌথ উৎপাদন ও স্থানীয় মুদ্রায় বাণিজ্যের চুক্তি স্বাক্ষর করেছে।',
    keyPoints: [
      'Joint development of aerospace components, cyber defense, and maritime surveillance.',
      'Local Currency Settlement (LCS): Deepening direct INR-AED settlement for crude and merchandise.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: UAE & Middle East Groupings',
      points: [
        'Capital: Abu Dhabi | Currency: UAE Dirham (AED).',
        '7 Emirates: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al-Quwain, Ras Al Khaimah, Fujairah.',
        'Groupings: I2U2 (India, Israel, UAE, USA), IMEC Corridor, BRICS+ (UAE joined 1 Jan 2024).'
      ]
    },
    examRelevance: 'WBCS Mains Paper III (International Relations).'
  },
  {
    id: 'intl-02-wef-davos',
    day: 19,
    dateStr: '19–23 January',
    category: 'international',
    categoryLabel: '🌍 Global Summits',
    title: 'World Economic Forum (WEF) 56th Annual Meeting Concludes in Davos, Switzerland',
    titleBn: 'দাভোসে বিশ্ব অর্থনৈতিক ফোরামের (WEF) ৫৬তম বার্ষিক সম্মেলন',
    summary: 'Held in Davos under theme "Rebuilding Trust in an Era of Polycrisis & Technological Transformation".',
    summaryBn: 'ওয়ার্ল্ড ইকোনমিক ফোরামের বার্ষিক সম্মেলন সুইজারল্যান্ডের দাভোসে অনুষ্ঠিত হয়।',
    keyPoints: [
      'Global Risks Report: Identified AI Misinformation as #1 short-term risk and Extreme Weather as #1 long-term risk.',
      'India highlighted as fastest growing major economy and leader in Digital Public Infrastructure (UPI, India Stack).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: World Economic Forum (WEF)',
      points: [
        'HQ: Cologny, Geneva, Switzerland | Founded: 1971 by Klaus Schwab.',
        'Key Reports: Global Competitiveness Report, Global Gender Gap Report, Energy Transition Index.'
      ]
    },
    examRelevance: 'WBPSC Food SI, WBCS Economy.'
  },
  {
    id: 'intl-03-brics-expansion',
    day: 1,
    dateStr: '01 January',
    category: 'international',
    categoryLabel: '🌍 Global Alliances',
    title: 'BRICS Formally Doubles Membership: 5 New Permanent Members Inducted',
    titleBn: 'ব্রিকস জোটে ৫টি নতুন দেশের আনুষ্ঠানিক স্থায়ী সদস্যপদ লাভ',
    summary: 'Saudi Arabia, UAE, Egypt, Iran, and Ethiopia officially joined BRICS as full permanent members.',
    summaryBn: 'সৌদি আরব, ইউএই, মিশর, ইরান ও ইথিওপিয়া আনুষ্ঠানিকভাবে ব্রিকসের স্থায়ী সদস্যপদ লাভ করল।',
    keyPoints: [
      'Finalized at 15th BRICS Summit in Johannesburg, South Africa.',
      'Russia assumed BRICS Chairmanship for 2024.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: BRICS & New Development Bank',
      points: [
        'Term BRIC: Coined 2001 by Jim O\'Neill | 1st Summit: 2009 (Yekaterinburg).',
        'New Development Bank (NDB): HQ in Shanghai, China | Est. 2014 Fortaleza.'
      ]
    },
    examRelevance: 'WBCS Mains Paper III, UPSC GS II.'
  },
  {
    id: 'intl-04-nam-summit',
    day: 15,
    dateStr: '15–20 January',
    category: 'international',
    categoryLabel: '🌍 Global Summits',
    title: '19th Non-Aligned Movement (NAM) Summit Held in Kampala, Uganda',
    titleBn: 'উগান্ডার কাম্পালায় ১৯তম জোট-নিরপেক্ষ আন্দোলন (NAM) শীর্ষ সম্মেলন',
    summary: 'Uganda assumed NAM Chairmanship for 2024–2027 from Azerbaijan; EAM Dr. S. Jaishankar represented India.',
    summaryBn: 'উগান্ডার রাজধানী কাম্পালায় ১৯তম নাম শীর্ষ সম্মেলন অনুষ্ঠিত হয়।',
    keyPoints: [
      'Theme: "Deepening Cooperation for Shared Global Affluence".',
      'Kampala Declaration reaffirmed Global South solidarity and UNSC reforms.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: NAM Foundation & Principles',
      points: [
        '1st Summit: 1961 in Belgrade, Yugoslavia.',
        '5 Founding Leaders: Nehru (India), Tito (Yugoslavia), Nasser (Egypt), Nkrumah (Ghana), Sukarno (Indonesia).',
        'Precursor: Bandung Conference (1955) | 120 Member Nations.'
      ]
    },
    examRelevance: 'WBCS International Relations & Modern History.'
  },
  {
    id: 'intl-05-denmark-frederik',
    day: 14,
    dateStr: '14 January',
    category: 'international',
    categoryLabel: '🌍 World Royalty',
    title: 'Historic Royal Succession in Denmark: King Frederik X Ascends the Throne',
    titleBn: 'ডেনমার্কে সিংহাসন হস্তান্তর: রাজা দশম ফ্রেডেরিকের সিংহাসন আরোহণ',
    summary: 'Queen Margrethe II abdicated after 52 years on throne; King Frederik X proclaimed King at Christiansborg Palace.',
    summaryBn: 'ডেনমার্কের রানী দ্বিতীয় মার্গারেট ৫২ বছর শাসনের পর সিংহাসন ত্যাগ করেন।',
    keyPoints: [
      'Queen Margrethe II was Europe\'s longest-serving monarch following Queen Elizabeth II.',
      'Queen Mary became first Australian-born Queen Consort in Europe.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Denmark & Nordic Profile',
      points: [
        'Capital: Copenhagen | Currency: Danish Krone (DKK).',
        'Parliament: Folketing | Autonomous territory: Greenland.'
      ]
    },
    examRelevance: 'WBPSC Miscellaneous, SSC CGL.'
  },
  {
    id: 'intl-06-gabriel-attal',
    day: 9,
    dateStr: '09 January',
    category: 'international',
    categoryLabel: '🌍 World Leaders',
    title: 'Gabriel Attal Appointed as France\'s Youngest Prime Minister at Age 34',
    titleBn: 'ফ্রান্সের সর্বকনিষ্ঠ প্রধানমন্ত্রী হিসেবে গ্যাব্রিয়েল আতালের নিয়োগ',
    summary: 'President Emmanuel Macron appointed 34-year-old Gabriel Attal as Prime Minister of France.',
    summaryBn: '৩৪ বছর বয়সী গ্যাব্রিয়েল আতাল ফ্রান্সের নতুন প্রধানমন্ত্রী হিসেবে দায়িত্ব নিলেন।',
    keyPoints: [
      'Youngest PM in French history, breaking record of Laurent Fabius (age 37 in 1984).',
      'First openly gay French Prime Minister.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: French 5th Republic System',
      points: [
        '5th Republic: Founded 1958 by Charles de Gaulle.',
        'Palaces: Élysée Palace (President) & Hôtel de Matignon (Prime Minister).'
      ]
    },
    examRelevance: 'WBPSC Miscellaneous & Banking.'
  },
  {
    id: 'intl-07-bangladesh-elections',
    day: 7,
    dateStr: '07 January',
    category: 'international',
    categoryLabel: '🌍 Neighborhood Affairs',
    title: 'Sheikh Hasina\'s Awami League Wins Bangladesh 12th General Elections (4th Straight Term)',
    titleBn: 'বাংলাদেশের নির্বাচনে শেখ হাসিনার আওয়ামী লীগের নিরঙ্কুশ বিজয়',
    summary: 'Awami League won 222 out of 300 seats in Jatiya Sangsad, making Sheikh Hasina world\'s longest-serving female head of govt.',
    summaryBn: 'বাংলাদেশের দ্বাদশ জাতীয় সংসদ নির্বাচনে আওয়ামী লীগ পুনরায় সরকার গঠন করল।',
    keyPoints: [
      'Connectivity projects: Akhaura-Agartala Rail Link, Maitree Power Plant, Khulna-Mongla Port line.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: India-Bangladesh Boundary',
      points: [
        'Border Length: 4,096.7 km (longest with India; West Bengal shares 2,217 km).',
        '100th Constitutional Amendment (2015): Land Boundary Agreement (LBA).'
      ]
    },
    examRelevance: 'WBCS Geography & Neighborhood Policy.'
  },
  {
    id: 'intl-08-taiwan-election',
    day: 13,
    dateStr: '13 January',
    category: 'international',
    categoryLabel: '🌍 East Asian Geopolitics',
    title: 'Lai Ching-te (William Lai) Elected President of Taiwan (DPP Victory)',
    titleBn: 'তাইওয়ানের প্রেসিডেন্ট নির্বাচনে ডেমোক্রেটিক প্রগ্রেসিভ পার্টির লাই চিং-তে জয়ী',
    summary: 'Ruling Democratic Progressive Party (DPP) candidate Lai Ching-te won Taiwan\'s presidential election.',
    summaryBn: 'তাইওয়ানের সাধারণ নির্বাচনে লাই চিং-তে নতুন প্রেসিডেন্ট নির্বাচিত হলেন।',
    keyPoints: [
      'Defeated opposition Kuomintang (KMT) candidate Hou Yu-ih.',
      'Reaffirmed Taiwan\'s democratic sovereignty amidst cross-strait tensions.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Taiwan Geography & Semiconductor Industry',
      points: [
        'Capital: Taipei | Currency: New Taiwan Dollar (NTD).',
        'Taiwan Strait: 160 km wide strait separating Taiwan from mainland China (Fujian province).',
        'TSMC: Produces >60% of world\'s microchips and >90% of advanced chips.'
      ]
    },
    examRelevance: 'WBCS International Relations, SSC CGL.'
  },
  {
    id: 'intl-09-bhutan-election',
    day: 11,
    dateStr: '11 January',
    category: 'international',
    categoryLabel: '🌍 Neighborhood Affairs',
    title: 'Tshering Tobgay Elected Prime Minister of Bhutan for 2nd Term (PDP Victory)',
    titleBn: 'ভুটানের সাধারণ নির্বাচনে পিপলস ডেমোক্রেটিক পার্টি জয়ী: শেরিং তোবগে নতুন প্রধানমন্ত্রী',
    summary: 'People\'s Democratic Party (PDP) won 30 out of 47 seats in Bhutan\'s National Assembly elections.',
    summaryBn: 'ভুটানের নির্বাচনে জয়লাভ করে শেরিং তোবগে দ্বিতীয়বারের জন্য প্রধানমন্ত্রী হলেন।',
    keyPoints: [
      'Tshering Tobgay previously served as PM from 2013 to 2018.',
      'Focus on Gelephu Mindfulness City Special Administrative Region.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: India-Bhutan Border & Hydropower Projects',
      points: [
        'Border: India shares 699 km border with Bhutan (Assam, West Bengal, Arunachal, Sikkim).',
        'Hydropower Projects: Tala, Chukha, Kurichhu, and Mangdechhu developed with Indian assistance.',
        'Gross National Happiness (GNH): Conceived by 4th King Jigme Singye Wangchuck in 1972.'
      ]
    },
    examRelevance: 'WBCS Bengal Geography & International Relations.'
  },
  {
    id: 'intl-10-henley-index',
    day: 13,
    dateStr: '13 January',
    category: 'international',
    categoryLabel: '🌍 Reports & Global Indices',
    title: 'Henley Passport Index: Singapore World #1 Spot, India Ranked 80th',
    titleBn: 'হেনলি পাসপোর্ট সূচক: সিঙ্গাপুর বিশ্বের ১ নম্বর, ভারত ৮০তম স্থানে',
    summary: 'Singapore passport ranked #1 with 192 visa-free destinations; India ranked 80th with access to 57 countries.',
    summaryBn: 'হেনলি পাসপোর্ট সূচকে সিঙ্গাপুর বিশ্বের শীর্ষে অবস্থান করছে এবং ভারত ৮০তম স্থানে রয়েছে।',
    keyPoints: [
      'Top Rank: Singapore (192 destinations), followed by France, Germany, Italy, Japan, Spain.',
      'Lowest Rank: Afghanistan (101st with 26 destinations).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Global Indexes & Organisations',
      points: [
        'Henley Index: Published with IATA (HQ: Montreal, Canada).',
        'Human Development Index (HDI): UNDP (New York) | World Press Freedom Index: RSF (Paris).'
      ]
    },
    examRelevance: 'Direct question in WBPSC Clerkship, Food SI, WBCS.'
  },

  // 5. ECONOMY, BANKING, RBI & REGULATORY (10 Events)
  {
    id: 'econ-01-gdp-4th',
    day: 20,
    dateStr: 'January Milestone',
    category: 'economy_banking',
    categoryLabel: '💰 Economy & Macroeconomics',
    title: 'India Surpasses Japan to Become World\'s 4th Largest Economy ($4.18 Trillion GDP)',
    titleBn: 'জাপানকে অতিক্রম করে ভারত বিশ্বের চতুর্থ বৃহত্তম অর্থনীতিতে পরিণত হলো ($৪.১৮ ট্রিলিয়ন জিডিপি)',
    summary: 'Official international economic reports confirmed India\'s nominal GDP crossed USD 4.18 Trillion, officially overtaking Japan.',
    summaryBn: 'ভারত আনুষ্ঠানিকভাবে জাপানকে পিছনে ফেলে বিশ্বের ৪র্থ বৃহত্তম অর্থনীতিতে উন্নীত হয়েছে।',
    keyPoints: [
      'Top 5 Global Economies: 1. USA (~$28T), 2. China (~$19T), 3. Germany (~$4.6T), 4. India (~$4.18T), 5. Japan (~$4.15T).',
      'By Purchasing Power Parity (PPP): India is the 3rd largest economy in the world.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: National Income Concepts',
      points: [
        'Nominal vs Real GDP: Real GDP adjusted for inflation (Base Year 2011-12).',
        'Agency: National Statistical Office (NSO), MoSPI.',
        '1st Estimation: Dadabhai Naoroji in 1867-68 (₹20 per capita).'
      ]
    },
    examRelevance: 'WBCS Economy, WBPSC Clerkship.'
  },
  {
    id: 'econ-02-rbi-mpc',
    day: 8,
    dateStr: 'January',
    category: 'economy_banking',
    categoryLabel: '💰 Banking & RBI',
    title: 'RBI Monetary Policy Committee (MPC) Stance & Key Policy Rates',
    titleBn: 'ভারতীয় রিজার্ভ ব্যাঙ্কের মুদ্রা নীতি কমিটি (MPC) এবং রেপো রেট পর্যালোচনা',
    summary: 'RBI maintained repo rate at 6.50% to align headline CPI inflation with 4.0% statutory target.',
    summaryBn: 'রিজার্ভ ব্যাঙ্ক রেপো রেট ৬.৫০% অপরিবর্তিত রেখেছে।',
    keyPoints: [
      'Policy Repo Rate: 6.50% | SDF: 6.25% | MSF: 6.75% | CRR: 4.50% | SLR: 18.00%.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Reserve Bank of India (RBI)',
      points: [
        'Established: 1 April 1935 (Hilton Young Commission) | Nationalized: 1 Jan 1949.',
        '1st Governor: Sir Osborne Smith | 1st Indian Governor: C.D. Deshmukh.',
        'MPC: 6 Members (3 RBI + 3 Govt) under Section 45ZB of RBI Act, 1934.'
      ]
    },
    examRelevance: 'WBCS Mains Paper V, Banking GA, SSC.'
  },
  {
    id: 'econ-03-sebi-t0-settlement',
    day: 24,
    dateStr: 'January Guidelines',
    category: 'economy_banking',
    categoryLabel: '💰 Capital Markets',
    title: 'SEBI Introduces Same-Day (T+0) Optional Settlement Framework for Stock Markets',
    titleBn: 'সেবি (SEBI) কর্তৃক ভারতীয় শেয়ার বাজারে টি+০ (T+0) নিষ্পত্তির নির্দেশিকা জারি',
    summary: 'SEBI issued guidelines for introducing optional T+0 same-day settlement alongside T+1 cycle.',
    summaryBn: 'শেয়ার লেনদেনের একই দিনে অর্থ ও শেয়ার নিষ্পত্তির জন্য টি+০ ফ্রেমওয়ার্ক ঘোষণা করেছে সেবি।',
    keyPoints: [
      'India was 2nd country globally after China to transition to T+1 settlement in Jan 2023.',
      'T+0 allows instant funds/securities payout, mitigating clearing default risk.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: SEBI & Stock Exchanges',
      points: [
        'SEBI: Established 12 April 1988; Statutory status on 30 Jan 1992 via SEBI Act, 1992.',
        'HQ: Mumbai | 1st Woman Chairperson: Madhabi Puri Buch.',
        'Oldest Stock Exchange in Asia: Bombay Stock Exchange (BSE, 1875 by Premchand Roychand).'
      ]
    },
    examRelevance: 'Banking Awareness, RBI Grade B, SEBI Grade A, WBCS Economy.'
  },
  {
    id: 'econ-04-vibrant-gujarat',
    day: 10,
    dateStr: '10 January',
    category: 'economy_banking',
    categoryLabel: '💰 Business & Investment',
    title: '10th Vibrant Gujarat Global Summit (VGGS) Inaugurated in Gandhinagar',
    titleBn: 'গান্ধীনগরে ১০ম ভাইব্র্যান্ট গুজরাট গ্লোবাল সামিটের উদ্বোধন',
    summary: 'Biennial global investment summit inaugurated by PM Modi under theme "Gateway to the Future".',
    summaryBn: 'গান্ধীনগরে ১০ম ভাইব্র্যান্ট গুজরাট সম্মেলনে ইউএই-র প্রেসিডেন্ট মুখ্য অতিথি হিসেবে উপস্থিত ছিলেন।',
    keyPoints: [
      'Chief Guest: Sheikh Mohamed bin Zayed Al Nahyan (UAE President).',
      'Over 34 partner countries and massive semiconductor/EV investment MoUs signed.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: GIFT City & IFSCA',
      points: [
        'GIFT City: India\'s 1st operational smart city and IFSC in Gandhinagar.',
        'IFSCA: Unified statutory regulator established under IFSCA Act, 2019.'
      ]
    },
    examRelevance: 'WBCS Economy, Banking Exams.'
  },
  {
    id: 'econ-05-direct-tax-collection',
    day: 15,
    dateStr: 'January',
    category: 'economy_banking',
    categoryLabel: '💰 Fiscal & Tax Revenue',
    title: 'Gross Direct Tax Collections Surge 17% to Cross ₹17.18 Lakh Crore',
    titleBn: 'প্রত্যক্ষ কর সংগ্রহ ১৭% বৃদ্ধি পেয়ে ₹১৭.১৮ লক্ষ কোটি ছাড়াল',
    summary: 'Central Board of Direct Taxes (CBDT) reported robust growth in corporate tax and personal income tax collections.',
    summaryBn: 'ভারতে আয়কর ও কর্পোরেট কর সংগ্রহের ক্ষেত্রে রেকর্ড প্রবৃদ্ধি নথিভুক্ত হয়েছে।',
    keyPoints: [
      'Gross Direct Tax collections reached 80.6% of full-year Budget Estimates.',
      'Personal Income Tax (PIT) growth outpaced Corporate Income Tax (CIT).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Direct Taxes & CBDT',
      points: [
        'CBDT: Statutory body under Central Board of Revenue Act, 1963 (Department of Revenue, MoF).',
        'Direct Taxes: Income Tax, Corporate Tax, Securities Transaction Tax (STT).',
        'Indirect Taxes (CBIC): GST, Customs Duty, Central Excise.'
      ]
    },
    examRelevance: 'WBCS Mains Paper V (Fiscal Policy).'
  },
  {
    id: 'econ-06-world-bank-wesp',
    day: 8,
    dateStr: 'January',
    category: 'economy_banking',
    categoryLabel: '💰 Global Economic Reports',
    title: 'World Bank Projects India as Fastest Growing Major Global Economy (6.4%–6.6%)',
    titleBn: 'বিশ্বব্যাংকের প্রতিবেদনে ভারত বিশ্বের দ্রুততম বর্ধনশীল প্রধান অর্থনীতি (৬.৬%)',
    summary: 'World Bank Global Economic Prospects report highlighted India\'s resilient domestic demand and infrastructure spending.',
    summaryBn: 'বিশ্বব্যাংক পূর্বাভাস দিয়েছে ভারত বিশ্বের প্রধান অর্থনীতিগুলির মধ্যে সর্বোচ্চ হারে বৃদ্ধি পাবে।',
    keyPoints: [
      'Projected global economic growth slowing to 2.4% in 2024.',
      'India remaining the bright spot driven by government Capex and manufacturing PLI.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: World Bank Group & Bretton Woods',
      points: [
        'Bretton Woods Conference (1944): Formed World Bank (IBRD) and IMF | HQ: Washington D.C.',
        'World Bank President: Ajay Banga (14th President).'
      ]
    },
    examRelevance: 'WBCS Economy & Banking GA.'
  },
  {
    id: 'econ-07-upi-monthly-record',
    day: 1,
    dateStr: '01 January',
    category: 'economy_banking',
    categoryLabel: '💰 Digital Payments',
    title: 'UPI Records Historic High: 12.02 Billion Transactions Worth ₹18.23 Lakh Crore',
    titleBn: 'ইউপিআই (UPI) লেনদেনে সর্বকালীন রেকর্ড: মাসে ১২০২ কোটি লেনদেন',
    summary: 'National Payments Corporation of India (NPCI) reported Unified Payments Interface (UPI) achieved all-time high monthly volume.',
    summaryBn: 'ভারতে ডিজিটাল লেনদেনে ইউপিআই এক মাসে ১৮.২৩ লক্ষ কোটি টাকার রেকর্ড অতিক্রম করেছে।',
    keyPoints: [
      'Year-on-year transaction volume surged by 54% and transaction value surged by 42%.',
      'Cross-border UPI active in Singapore (PayNow), UAE, Mauritius, Sri Lanka, and France.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: NPCI & Digital Public Infrastructure',
      points: [
        'NPCI: Formed in 2008 by RBI and Indian Banks\' Association (IBA) under Payment and Settlement Systems Act, 2007.',
        'UPI: Launched on 11 April 2016 by Raghuram Rajan (former RBI Governor).',
        'Other NPCI Products: RuPay, IMPS, FASTag, AePS, NACH, BBPS.'
      ]
    },
    examRelevance: 'Banking Exams (IBPS/SBI), WBCS Economy.'
  },
  {
    id: 'econ-08-nse-world-derivatives',
    day: 18,
    dateStr: 'January',
    category: 'economy_banking',
    categoryLabel: '💰 Capital Markets',
    title: 'NSE Emerges as World\'s Largest Derivative Exchange for 5th Consecutive Year',
    titleBn: 'ন্যাশনাল স্টক এক্সচেঞ্জ (NSE) টানা ৫ম বছর বিশ্বের বৃহত্তম ডেরিভেটিভ এক্সচেঞ্জ',
    summary: 'Futures Industry Association (FIA) confirmed National Stock Exchange of India (NSE) retained #1 global position in contracts traded.',
    summaryBn: 'বিশ্বের বৃহত্তম ডেরিভেটিভ এক্সচেঞ্জ হিসেবে শীর্ষস্থান ধরে রেখেছে ভারতের এনএসই।',
    keyPoints: [
      'NSE ranked 3rd globally in equity segment by number of trades in 2023.',
      'Nifty 50 and Bank Nifty index options drove maximum trading volumes.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: National Stock Exchange (NSE)',
      points: [
        'NSE: Incorporated in 1992 on recommendations of Pherwani Committee; commenced trading in 1994.',
        'Benchmark Index: NIFTY 50 (launched in April 1996 with base year 1995 = 1000).',
        'MD & CEO: Ashishkumar Chauhan.'
      ]
    },
    examRelevance: 'Banking GA & WBCS Economy.'
  },
  {
    id: 'econ-09-fintech-sro-framework',
    day: 16,
    dateStr: 'January Guidelines',
    category: 'economy_banking',
    categoryLabel: '💰 Banking Regulation',
    title: 'RBI Releases Draft Framework for Self-Regulatory Organisations in Fintech (SRO-FT)',
    titleBn: 'রিজার্ভ ব্যাঙ্ক ফিনটেক সংস্থাগুলির জন্য স্ব-নিয়ন্ত্রক সংস্থার খসড়া প্রকাশ করেছে',
    summary: 'RBI issued draft norms setting standards, governance, and consumer protection frameworks for Fintech Self-Regulatory Organisations.',
    summaryBn: 'ফিনটেক খাতের সুরক্ষা ও শৃঙ্খলায় আরবিআই স্ব-নিয়ন্ত্রক নির্দেশিকা জারি করেছে।',
    keyPoints: [
      'SRO-FT will act as a bridge between the fintech industry and the Reserve Bank of India.',
      'Mandatory adherence to fair lending practices, data privacy, and cybersecurity standards.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: RBI Regulatory Sandbox & Fintech',
      points: [
        'Regulatory Sandbox: Live testing of innovative fintech products in a controlled environment (introduced by RBI in 2019).',
        'Digital Lending Guidelines: Mandates direct loan disbursal to borrower bank accounts without third-party pass-through.'
      ]
    },
    examRelevance: 'RBI Grade B, SEBI Grade A, Banking.'
  },
  {
    id: 'econ-10-narcl-appointment',
    day: 4,
    dateStr: '04 January',
    category: 'economy_banking',
    categoryLabel: '💰 Bad Bank & NPA',
    title: 'P. Santosh Appointed as Managing Director & CEO of National Asset Reconstruction Company (NARCL)',
    titleBn: 'পি. সন্তোষ ন্যাশনাল অ্যাসেট রিকনস্ট্রাকশন কোম্পানি (NARCL)-এর এমডি ও সিইও নিযুক্ত',
    summary: 'Canara Bank Chief General Manager P. Santosh took charge as MD & CEO of India\'s "Bad Bank" NARCL.',
    summaryBn: 'ভারতের ব্যাড ব্যাঙ্ক ন্যারক্লের নতুন প্রধান হিসেবে পি. সন্তোষ দায়িত্ব গ্রহণ করেছেন।',
    keyPoints: [
      'Succeeded Natarajan Sundar who resigned.',
      'NARCL acquires stressed assets (>₹500 Cr) from banks and resolves non-performing assets (NPAs).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Bad Bank Concept & NARCL / IDRCL Structure',
      points: [
        'NARCL (Asset Reconstruction Company): Incorporated in July 2021; majority-owned by Public Sector Banks (51%).',
        'IDRCL (Asset Management Company): India Debt Resolution Company Ltd (private sector majority).',
        'Government Guarantee: Central Govt provides ₹30,600 Crore backstop guarantee for Security Receipts (SRs) issued by NARCL.'
      ]
    },
    examRelevance: 'Banking Awareness (IBPS/SBI/RBI).'
  },

  // 6. DEFENSE, NAVY & MILITARY EXERCISES (12 Events)
  {
    id: 'def-01-marcos-norfolk',
    day: 5,
    dateStr: '05 January',
    category: 'defense_navy',
    categoryLabel: '⚓ Naval Operations',
    title: 'Indian Navy MARCOS Storm Hijacked Vessel MV Lila Norfolk in Arabian Sea',
    titleBn: 'আরব সাগরে ভারতীয় নৌবাহিনীর মার্কোস কম্যান্ডোদের জলদস্যু দমন ও জাহাজ উদ্ধার অভিযান',
    summary: 'INS Chennai and MARCOS intercepted hijacked bulk carrier MV Lila Norfolk, rescuing all 21 crew members (including 15 Indians).',
    summaryBn: 'আইএনএস চেন্নাই ও মার্কোস কম্যান্ডোরা ছিনতাই হওয়া জাহাজ থেকে সব নাবিককে অক্ষত উদ্ধার করে।',
    keyPoints: [
      'P-8I patrol aircraft and MQ-9B SeaGuardian drones provided continuous real-time surveillance.',
      'MARCOS sanitized the vessel, forcing pirates to abandon the ship.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: MARCOS & Anti-Piracy Law',
      points: [
        'MARCOS: Formed 1987 (Marine Commandos); Motto: "The Few, The Fearless".',
        'Maritime Anti-Piracy Act, 2022: Provides domestic legal framework to punish piracy on high seas.'
      ]
    },
    examRelevance: 'WBP SI, CDS/NDA, WBCS.'
  },
  {
    id: 'def-02-ins-sumitra-rescue',
    day: 29,
    dateStr: '29 January',
    category: 'defense_navy',
    categoryLabel: '⚓ Naval Operations',
    title: 'INS Sumitra Rescues 19 Pakistani Crew from Somali Pirates in Arabian Sea',
    titleBn: 'আইএনএস সুমিত্রা কর্তৃক সোমালি জলদস্যুদের থেকে ১৯ জন পাকিস্তানি নাবিক উদ্ধার',
    summary: 'Indian Navy patrol vessel INS Sumitra intercepted hijacked Iranian vessel FV Al Naeemi, freeing 19 Pakistani crew members from 11 armed pirates.',
    summaryBn: 'ভারতীয় যুদ্ধজাহাজ আরব সাগরে দ্রুত অভিযান চালিয়ে জলদস্যুদের আত্মসমর্পণ করিয়ে সব নাবিককে উদ্ধার করে।',
    keyPoints: [
      'Second rescue in 36 hours after rescuing 17 crew on FV Iman.',
      'Reiterated Indian Navy as First Responder in Indian Ocean Region.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Indian Navy Structure',
      points: [
        'Navy Day: 4 December (Operation Trident 1971).',
        'Commands: Western (Mumbai), Eastern (Visakhapatnam), Southern (Kochi).',
        'Andaman & Nicobar Command: Only Tri-Services command (Port Blair, est. 2001).'
      ]
    },
    examRelevance: 'WBP SI, Kolkata Police, CDS.'
  },
  {
    id: 'def-03-desert-cyclone',
    day: 15,
    dateStr: '02–15 January',
    category: 'defense_navy',
    categoryLabel: '⚓ Joint Military Drills',
    title: 'Exercise "Desert Cyclone": 1st Edition of India-UAE Joint Military Exercise in Rajasthan',
    titleBn: 'ভারত ও সংযুক্ত আরব আমিরশাহীর প্রথম যৌথ সেনা মহড়া "ডেজার্ট সাইক্লোন"',
    summary: 'Inaugural joint military drill between Indian Army and UAE Land Forces held at Mahajan Field Firing Ranges, Rajasthan.',
    summaryBn: 'রাজস্থানের মহাজনে ভারত ও ইউএই-র যৌথ সেনা মহড়া সম্পন্ন হলো।',
    keyPoints: [
      'Trained in urban counter-terrorism, cordon-and-search operations in semi-desert terrain.',
      'Indian contingent represented by Mechanised Infantry Regiment.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: India-UAE Military Engagements',
      points: [
        'Other Exercises: Zayed Talwar (Navy), Desert Flag (Air Force).',
        'Mahajan Field Firing Range: Located in Bikaner district, Rajasthan (largest firing range of Indian Army).'
      ]
    },
    examRelevance: 'WBP SI, Constable, WBCS.'
  },
  {
    id: 'def-04-sada-tanseeq',
    day: 29,
    dateStr: '29 Jan – 09 Feb',
    category: 'defense_navy',
    categoryLabel: '⚓ Joint Military Drills',
    title: 'Exercise "Sada Tanseeq": 1st Joint Military Drill between India & Saudi Arabia in Rajasthan',
    titleBn: 'ভারত ও সৌদি আরবের প্রথম যৌথ সেনা মহড়া "সদা তানসিক" শুরু',
    summary: 'Inaugural edition of joint military exercise between Indian Army and Royal Saudi Land Forces at Mahajan, Rajasthan.',
    summaryBn: 'রাজস্থানের মহাজনে ভারত ও সৌদি আরবের প্রথম যৌথ সেনা মহড়া অনুষ্ঠিত হয়।',
    keyPoints: [
      'Focused on joint tactical drills under UN Chapter VII counter-terrorism mandate.',
      'Indian contingent represented by Brigade of The Guards (Mechanised).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: India-Saudi Arabia Strategic Ties',
      points: [
        'Naval Exercise: Al-Mohed Al-Hindi (Bilateral naval exercise).',
        'Saudi Arabia: Capital Riyadh | Currency: Saudi Riyal.'
      ]
    },
    examRelevance: 'WBP SI, WBCS, CDS/NDA.'
  },
  {
    id: 'def-05-sahyog-kaijin',
    day: 12,
    dateStr: '08–12 January',
    category: 'defense_navy',
    categoryLabel: '⚓ Coast Guard Drills',
    title: 'Joint Exercise "Sahyog Kaijin" Conducted by Indian and Japanese Coast Guards off Chennai',
    titleBn: 'ভারত ও জাপানের উপকূলরক্ষী বাহিনীর যৌথ মহড়া "সহযোগ কাইজিন" (চেন্নাই)',
    summary: 'Joint maritime exercise between Indian Coast Guard (ICG) and Japan Coast Guard (JCG) off Chennai coast.',
    summaryBn: 'চেন্নাই উপকূলে ভারত ও জাপানের উপকূলরক্ষী বাহিনীর মধ্যে সমুদ্র নিরাপত্তা মহড়া অনুষ্ঠিত হলো।',
    keyPoints: [
      'Japanese Coast Guard ship Yashima and ICG ship Shaurya participated.',
      'Drills included search and rescue (SAR), anti-piracy boarding, and pollution response.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Indian Coast Guard (ICG)',
      points: [
        'ICG Established: 1 February 1977 (Interim); Statutory status on 18 August 1978 under Coast Guard Act, 1978 on recommendations of Rustamji Committee.',
        'Motto: "Vayam Rakshamah" (We Protect) | DG: Rakesh Pal.'
      ]
    },
    examRelevance: 'WBP SI, Kolkata Police, SSC.'
  },
  {
    id: 'def-06-exercise-ayutthaya',
    day: 15,
    dateStr: 'January',
    category: 'defense_navy',
    categoryLabel: '⚓ Bilateral Naval Drills',
    title: 'India and Thailand Conduct Maiden Bilateral Maritime Exercise "Ex-Ayutthaya"',
    titleBn: 'ভারত ও থাইল্যান্ডের নৌবাহিনীর প্রথম দ্বিপাক্ষিক মহড়া "এক্স-অয়ুথ্য"',
    summary: 'Indian Navy and Royal Thai Navy conducted their first maiden bilateral naval exercise named "Ex-Ayutthaya" (Invincible City).',
    summaryBn: 'ভারত ও থাইল্যান্ডের প্রাচীন ঐতিহাসিক সম্পর্কের প্রতীক হিসেবে এক্স-অয়ুথ্য নৌ মহড়া অনুষ্ঠিত হলো।',
    keyPoints: [
      'Symbolizes historic connection between Ayodhya (India) and Ayutthaya (Thailand).',
      'Indigenously built missile corvette INS Kulish and IN LCU 56 participated alongside 36th Indo-Thai CORPAT.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: India-Thailand Maritime Links & CORPAT',
      points: [
        'Indo-Thai CORPAT: Coordinated Patrol conducted bi-annually since 2005.',
        'Army Exercise: Exercise MAITREE (Bilateral army exercise).'
      ]
    },
    examRelevance: 'WBCS GS Paper IV, CDS, SSC.'
  },
  {
    id: 'def-07-exercise-cyclone-egypt',
    day: 22,
    dateStr: '22 Jan – 01 Feb',
    category: 'defense_navy',
    categoryLabel: '⚓ Special Forces Drills',
    title: 'Exercise "Cyclone": 2nd Edition of India-Egypt Joint Special Forces Drill in Anshas',
    titleBn: 'ভারত ও মিশরের স্পেশাল ফোর্সের যৌথ সামরিক মহড়া "সাইক্লোন" (মিশর)',
    summary: 'Indian Army (Parachute Regiment - Special Forces) and Egyptian Commandos conducted Exercise Cyclone in Anshas, Egypt.',
    summaryBn: 'মিশরের আনশাসে ভারত ও মিশরের বিশেষ বাহিনীর যৌথ কমান্ডো মহড়া অনুষ্ঠিত হয়।',
    keyPoints: [
      'Trained in asymmetric warfare, sniper operations, and counter-hijacking drills.',
      '1st edition held in Jaisalmer, Rajasthan in 2023.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Egypt & Suez Canal Geography',
      points: [
        'Capital: Cairo | Currency: Egyptian Pound | President: Abdel Fattah el-Sisi.',
        'Suez Canal: 193 km artificial sea-level waterway connecting Mediterranean Sea to Red Sea (opened Nov 1869; nationalized by Gamal Abdel Nasser in 1956).'
      ]
    },
    examRelevance: 'WBCS International Relations, WBP SI.'
  },
  {
    id: 'def-08-steadfast-defender',
    day: 24,
    dateStr: 'January',
    category: 'defense_navy',
    categoryLabel: '⚓ Multilateral NATO Drills',
    title: 'NATO Launches "Steadfast Defender 2024" — Largest Military Exercise Since Cold War',
    titleBn: 'ন্যাটো কর্তৃক কোল্ড ওয়ারের পর বৃহত্তম সামরিক মহড়া "স্টেডফাস্ট ডিফেন্ডার" শুরু',
    summary: 'North Atlantic Treaty Organization (NATO) mobilized 90,000 troops across Europe in Steadfast Defender 2024.',
    summaryBn: 'ন্যাটো জোটের ৩১টি দেশ ও সুইডেনের ৯০ হাজার সেনা নিয়ে মেগা সামরিক মহড়া শুরু হয়েছে।',
    keyPoints: [
      'Involved 50+ naval combat vessels, 80+ fighter jets, and 1,100+ combat vehicles.',
      'Tested NATO\'s regional defense plans under Article 5 (collective defense clause).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: NATO (North Atlantic Treaty Organization)',
      points: [
        'Formed: 4 April 1949 via North Atlantic Treaty (Washington Treaty) | HQ: Brussels, Belgium.',
        'Secretary General: Jens Stoltenberg (succeeded by Mark Rutte).',
        'Newest Members: Finland (31st member, April 2023) and Sweden (32nd member, March 2024).'
      ]
    },
    examRelevance: 'WBCS International Relations & SSC CGL.'
  },
  {
    id: 'def-09-drdo-scramjet-lrashm',
    day: 21,
    dateStr: 'January',
    category: 'defense_navy',
    categoryLabel: '⚓ Missile Technology',
    title: 'DRDO Achieves Critical Milestone in Hypersonic Scramjet Propulsion & LR-AShM Missile',
    titleBn: 'ডিআরডিও-র হাইপারসনিক স্ক্র্যামজেট প্রপালশন টেস্ট ও দূরপাল্লার অ্যান্টি-শিপ মিসাইল',
    summary: 'DRDO ground-tested regenerative cooled Scramjet combustor and showcased Long Range Anti-Ship Hypersonic Missile (LR-AShM).',
    summaryBn: 'প্রতিরক্ষা গবেষণা সংস্থা ডিআরডিও হাইপারসনিক ইঞ্জিনের সফল পরীক্ষা সম্পন্ন করেছে।',
    keyPoints: [
      'Hypersonic Speed: Capable of sustaining Mach 6+ (~7,400 km/h) with mid-course maneuvers.',
      'Ramjet vs Scramjet: Scramjet sustains supersonic airflow throughout combustion chamber.',
      'Ramjet Artillery: 155mm ramjet precision artillery shells with 60km+ range.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: DRDO & IGMDP Missiles',
      points: [
        'DRDO: Formed 1958 | Motto: "Balasya Mulam Vigyanam".',
        'IGMDP (1983 - Dr. APJ Abdul Kalam): PATNA (Prithvi, Agni, Trishul, Nag, Akash).'
      ]
    },
    examRelevance: 'WBP SI, Kolkata Police SI, WBCS.'
  },
  {
    id: 'def-10-akash-ng-flight-test',
    day: 12,
    dateStr: '12 January',
    category: 'defense_navy',
    categoryLabel: '⚓ Air Defense',
    title: 'DRDO Conducts Successful Flight-Test of New Generation AKASH (Akash-NG) Missile',
    titleBn: 'ডিআরডিও কর্তৃক নতুন প্রজন্মের আকাশ (Akash-NG) ক্ষেপণাস্ত্রের সফল পরীক্ষা',
    summary: 'DRDO successfully flight-tested Akash-NG surface-to-air missile system against high-speed unmanned aerial target at ITR Chandipur, Odisha.',
    summaryBn: 'ওড়িশার চাঁদিপুরে ভূমি থেকে আকাশে উৎক্ষেপণযোগ্য আকাশ-এনজি ক্ষেপণাস্ত্রের সফল পরীক্ষা সম্পন্ন হলো।',
    keyPoints: [
      'Multi-function Radar, dual-pulse solid rocket motor, and Active Radio Frequency (RF) seeker.',
      'Intercepts agile maneuvering aerial threats at ranges up to 70 km.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Integrated Test Range (ITR) Chandipur',
      points: [
        'ITR Chandipur: Located on Bay of Bengal in Balasore district, Odisha (Abdul Kalam Island / Wheeler Island located nearby).',
        'Akash Prime: Upgraded version of indigenous Akash missile equipped with indigenous active RF seeker.'
      ]
    },
    examRelevance: 'WBCS Science & Technology, WBP SI.'
  },
  {
    id: 'def-11-ins-imphal-commissioned',
    day: 1,
    dateStr: 'January',
    category: 'defense_navy',
    categoryLabel: '⚓ Naval Warships',
    title: 'INS Imphal: First Warship Named After a City in Northeast India Joins Western Fleet',
    titleBn: 'আইএনএস ইম্ফল: উত্তর-পূর্ব ভারতের শহরের নামে নামাঙ্কিত প্রথম যুদ্ধজাহাজ',
    summary: 'Stealth guided missile destroyer INS Imphal (Pennant D68), 3rd ship of Project 15B Visakhapatnam class, joined active naval operations.',
    summaryBn: 'প্রজেক্ট ১৫বি-র তৃতীয় রণতরী আইএনএস ইম্ফল নৌবাহিনীতে যুক্ত হলো।',
    keyPoints: [
      'Equipped with BrahMos supersonic cruise missiles and Barak-8 Long Range Surface-to-Air Missiles (LRSAM).',
      'Built by Mazagon Dock Shipbuilders Limited (MDL), Mumbai with 75% indigenous content.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Project 15B Destroyers & MDL',
      points: [
        '4 Project 15B Destroyers: 1. INS Visakhapatnam, 2. INS Mormugao, 3. INS Imphal, 4. INS Surat.',
        'Mazagon Dock Shipbuilders Limited (MDL): Premier defense shipyard in Mumbai (est. 1934).'
      ]
    },
    examRelevance: 'WBCS Defense, WBP SI, CDS.'
  },
  {
    id: 'def-12-operation-sarvashakti',
    day: 14,
    dateStr: '14 January',
    category: 'defense_navy',
    categoryLabel: '⚓ Counter-Terrorism',
    title: 'Indian Army Launches "Operation Sarvashakti" in Jammu & Kashmir (Pir Panjal Ranges)',
    titleBn: 'জম্মু ও কাশ্মীরের পীর পাঞ্জাল অঞ্চলে ভারতীয় সেনাবাহিনীর "অপারেশন সর্বশক্তি" শুরু',
    summary: 'Indian Army launched Operation Sarvashakti to neutralize terrorist hideouts across Rajouri and Poonch sectors on both sides of Pir Panjal.',
    summaryBn: 'পীর পাঞ্জাল পর্বতের উভয় পাশে সন্ত্রাসবাদীদের নির্মূল করতে সেনা সর্বশক্তি অভিযান শুরু করেছে।',
    keyPoints: [
      'Joint operation by 15 Corps (Chinar Corps, Srinagar) and 16 Corps (White Knight Corps, Nagrota).',
      'Modelled on Operation Sarp Vinash carried out in Hilkaka in 2003.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Pir Panjal Range & Passes',
      points: [
        'Pir Panjal: Longest range of Middle Himalayas (Lesser Himalayas).',
        'Important Passes: Banihal Pass (Jawaharlal Tunnel) & Pir Panjal Pass.',
        'Atal Tunnel (Rohtang Tunnel): 9.02 km long tunnel built through Pir Panjal range in Himachal Pradesh.'
      ]
    },
    examRelevance: 'WBCS Geography, WBP SI.'
  },

  // 7. SPACE & FRONTIER SCIENCE (10 Events)
  {
    id: 'space-01-xposat',
    day: 1,
    dateStr: '01 January',
    category: 'space_science',
    categoryLabel: '🚀 Space Observatories',
    title: 'ISRO Successfully Launches XPoSat (X-ray Polarimeter Satellite) on PSLV-C58',
    titleBn: 'ইসরো পিএসএলভি-সি৫৮ রকেটে এক্সপোস্যাট উপগ্রহ সফলভাবে উৎক্ষেপণ করল',
    summary: 'India\'s first dedicated polarimetry observatory launched to study X-ray emissions from black holes and neutron stars.',
    summaryBn: 'মহাকাশে কৃষ্ণগহ্বর ও নিউট্রন নক্ষত্রের গবেষণায় ভারত এক্সপোস্যাট মহাকাশ পর্যবেক্ষণ কেন্দ্র পাঠাল।',
    keyPoints: [
      'POLIX payload (Raman Research Institute) and XSPECT payload (URSC Bangalore).',
      'India is 2nd country after USA (NASA IXPE, 2021) with an orbital X-ray polarimeter.',
      'POEM-3: Spent 4th stage of PSLV hosted 10 non-space agency experiments in microgravity.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Raman Research Institute & ISRO',
      points: [
        'RRI: Founded 1948 by Sir C.V. Raman in Bengaluru.',
        'AstroSat: India\'s 1st dedicated multi-wavelength space observatory (2015).',
        'PSLV: 4-stage launch vehicle using solid (1st/3rd) and liquid (2nd/4th - Vikas engine) propellants.'
      ]
    },
    examRelevance: 'WBCS Science & Tech, UPSC Prelims.'
  },
  {
    id: 'space-02-aditya-l1-halo',
    day: 6,
    dateStr: '06 January',
    category: 'space_science',
    categoryLabel: '🚀 Solar Physics',
    title: 'ISRO Inserts Aditya-L1 into Halo Orbit Around Sun-Earth Lagrange Point 1 (L1)',
    titleBn: 'ইসরোর আদিত্য-এল১ সফলভাবে সূর্য-পৃথিবী ল্যাগ্রাঞ্জ পয়েন্ট ১ (L1) কক্ষপথে প্রবেশ করল',
    summary: 'India\'s first solar observatory reached its final halo orbit 1.5 million km from Earth for continuous uninterrupted solar viewing.',
    summaryBn: 'আদিত্য-এল১ সফলভাবে সূর্য-পৃথিবীর ল্যাগ্রাঞ্জিয়ান পয়েন্ট ১-এর কক্ষপথে স্থাপিত হলো।',
    keyPoints: [
      'Carries 7 payloads including VELC (Visible Emission Line Coronagraph) and SUIT (Solar Ultraviolet Imaging Telescope).',
      'Studies solar corona, chromospheric dynamics, coronal mass ejections (CMEs), and space weather.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Lagrange Points Physics',
      points: [
        'Lagrange Points: Gravitational equilibrium points discovered by Joseph-Louis Lagrange (1772).',
        'Sun-Earth Distance to L1: ~1.5 million km (~1% of total Sun-Earth distance).',
        'JWST: Positioned at Sun-Earth L2 (1.5M km behind Earth).'
      ]
    },
    examRelevance: 'WBCS Science & Tech, UPSC Prelims.'
  },
  {
    id: 'space-03-japan-slim',
    day: 19,
    dateStr: '19 January',
    category: 'space_science',
    categoryLabel: '🚀 Lunar Exploration',
    title: 'Japan Becomes 5th Nation to Soft-Land on Moon with JAXA SLIM "Moon Sniper"',
    titleBn: 'জাপানের স্মার্ট ল্যান্ডার (SLIM) চাঁদে সফল অবতরণ: বিশ্বমঞ্চে ৫ম দেশ',
    summary: 'JAXA\'s Smart Lander for Investigating Moon achieved pinpoint soft landing within 55 meters of target inside Shioli Crater.',
    summaryBn: 'জাপান চাঁদের মাটিতে পিন-পয়েন্ট ল্যান্ডিং করে চাঁদে অবতরণকারী বিশ্বের ৫ম দেশ হলো।',
    keyPoints: [
      '5 Moon Landing Nations: Soviet Union (1966), USA (1966), China (2013), India (2023), Japan (2024).',
      'Deployed mini-rovers LEV-1 and SORA-Q (transformable ball robot).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: JAXA & Indo-Japan LUPEX Mission',
      points: [
        'JAXA HQ: Tokyo, Japan (formed 2003).',
        'LUPEX Mission: Joint ISRO-JAXA lunar polar exploration rover mission targeting Moon\'s South Pole.',
        'National Space Day of India: 23 August (Vikram lander touchdown at Shiv Shakti Point).'
      ]
    },
    examRelevance: 'WBCS Science & Tech, WB Police SI.'
  },
  {
    id: 'space-04-peregrine-lunar-lander',
    day: 8,
    dateStr: '08 January',
    category: 'space_science',
    categoryLabel: '🚀 Commercial Space',
    title: 'Peregrine-1 Commercial Lunar Lander Launched on ULA Vulcan Centaur Rocket',
    titleBn: 'ভলকান সেন্টর রকেটে প্রথম বাণিজ্যিক চন্দ্র ল্যান্ডার পেরেগ্রিন-১ উৎক্ষেপণ',
    summary: 'Astrobotic\'s Peregrine Mission One launched under NASA\'s Commercial Lunar Payload Services (CLPS) program.',
    summaryBn: 'নাসার বাণিজ্যিক চন্দ্র কর্মসূচির আওতায় পেরেগ্রিন-১ চাঁদের উদ্দেশ্যে পাড়ি দিয়েছিল।',
    keyPoints: [
      'First flight of United Launch Alliance (ULA) Vulcan Centaur heavy-lift rocket.',
      'Suffered propulsion anomaly preventing lunar soft landing; burned up safely over South Pacific.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: NASA Artemis Programme',
      points: [
        'Artemis Program: NASA\'s mission to land "the first woman and next man" on the Moon.',
        'Artemis Accords: Non-binding multilateral principles for peaceful civil space exploration (India signed in June 2023 as 27th member).'
      ]
    },
    examRelevance: 'WBCS Science & Technology.'
  },
  {
    id: 'space-05-einstein-probe-china',
    day: 9,
    dateStr: '09 January',
    category: 'space_science',
    categoryLabel: '🚀 Astrophysics',
    title: 'China Launches "Einstein Probe" Satellite with Lotus-Shaped Lobster-Eye X-ray Optics',
    titleBn: 'চীন কর্তৃক "আইনস্টাইন প্রোব" এক্স-রে জ্যোতির্বিজ্ঞান উপগ্রহ উৎক্ষেপণ',
    summary: 'Chinese Academy of Sciences (CAS) launched Einstein Probe (EP) satellite on Long March-2C rocket from Xichang Satellite Launch Center.',
    summaryBn: 'মহাকাশের ক্ষণস্থায়ী মহাজাগতিক বিস্ফোরণ পর্যবেক্ষণে চীন আইনস্টাইন প্রোব পাঠাল।',
    keyPoints: [
      'Uses bionic lobster-eye Micro-Pore Optics (MPO) technology offering wide field of view.',
      'Detects X-ray flares from black holes swallowing stars, supernova shockwaves, and neutron star mergers.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Space Observatories & X-ray Astronomy',
      points: [
        'Chandra X-ray Observatory: Flagship NASA space telescope launched in 1999 (named after Nobel Laureate Subrahmanyan Chandrasekhar).',
        'Chandrasekhar Limit: Maximum mass of a stable white dwarf star (~1.4 solar masses).'
      ]
    },
    examRelevance: 'WBCS Science & Tech, UPSC.'
  },
  {
    id: 'space-06-iit-madras-sri-lanka',
    day: 18,
    dateStr: '18 January',
    category: 'space_science',
    categoryLabel: '🚀 Higher Education',
    title: 'IIT Madras to Open Second International Campus in Kandy, Sri Lanka',
    titleBn: 'শ্রীলঙ্কার ক্যান্ডিতে আইআইটি মাদ্রাজের দ্বিতীয় আন্তর্জাতিক ক্যাম্পাস স্থাপন',
    summary: 'Following its first campus in Zanzibar (Tanzania), IIT Madras announced opening a campus in Kandy, Sri Lanka.',
    summaryBn: 'জাঞ্জিবারের পর শ্রীলঙ্কার ক্যান্ডিতে দ্বিতীয় ক্যাম্পাস খুলছে আইআইটি মাদ্রাজ।',
    keyPoints: [
      'Offers undergraduate and postgraduate engineering programs in Data Science, AI, and Cyber-Physical Systems.',
      'IIT Delhi also operationalized campus in Abu Dhabi, UAE.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Indian Institutes of Technology (IITs)',
      points: [
        '1st IIT: IIT Kharagpur in West Bengal (established May 1950 at Hijli Detention Camp; inaugurated by Maulana Abul Kalam Azad).',
        'NIRF Rankings: IIT Madras ranked #1 overall institution for 5+ consecutive years.'
      ]
    },
    examRelevance: 'WBCS Education & General Awareness.'
  },
  {
    id: 'space-07-neuralink-human-implant',
    day: 29,
    dateStr: '29 January',
    category: 'space_science',
    categoryLabel: '🚀 Biotech & BCI',
    title: 'Neuralink Successfully Implants First Wireless Brain Chip in Human Patient',
    titleBn: 'নিউরালিঙ্ক কর্তৃক প্রথম মানব মস্তিষ্কে ওয়্যারলেস চিপ সফলভাবে প্রতিস্থাপন',
    summary: 'Elon Musk\'s neurotechnology company Neuralink implanted its wireless Brain-Computer Interface (BCI) "Telepathy" in a human.',
    summaryBn: 'পক্ষাঘাতগ্রস্ত রোগীকে চিন্তা দ্বারা কম্পিউটার নিয়ন্ত্রণের সুযোগ দিতে ব্রেন চিপ প্রতিস্থাপন করল নিউরালিঙ্ক।',
    keyPoints: [
      'Uses 1,024 electrodes distributed across 64 ultra-fine flexible threads implanted by surgical robot.',
      'Enables patients with quadriplegia to control cursor, keyboard, and robotic limbs via thoughts.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Neurobiology & Brain Waves',
      points: [
        'Neurons: Fundamental units of the brain and nervous system transmitting electrical action potentials.',
        'EEG (Electroencephalogram): Test that detects electrical brainwave activity (Alpha, Beta, Theta, Delta).'
      ]
    },
    examRelevance: 'WBCS Biology & Emerging Tech.'
  },
  {
    id: 'space-08-isro-kulasekarapattinam',
    day: 15,
    dateStr: 'January',
    category: 'space_science',
    categoryLabel: '🚀 Space Infrastructure',
    title: 'Land Handover Completed for ISRO\'s 2nd Spaceport at Kulasekarapattinam, Tamil Nadu',
    titleBn: 'তামিলনাড়ুর কুলাশেখরপট্টনমে ইসরোর দ্বিতীয় রকেট উৎক্ষেপণ কেন্দ্রের জমি অধিগ্রহণ সম্পন্ন',
    summary: 'Tamil Nadu Government completed handover of 2,233 acres for ISRO\'s second space launch complex dedicated to Small Satellite Launch Vehicles (SSLVs).',
    summaryBn: 'ছোট উপগ্রহ উৎক্ষেপণের সুবিধার্থে ইসরোর দ্বিতীয় মহাকাশ বন্দর তৈরি হচ্ছে তামিলনাড়ুতে।',
    keyPoints: [
      'Advantage: Direct southward launch trajectory over Indian Ocean without dogleg maneuver around Sri Lanka, saving fuel.',
      'Complements Satish Dhawan Space Centre (SDSC SHAR) in Sriharikota, Andhra Pradesh.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: ISRO Launch Centers & SSLV',
      points: [
        'SSLV (Small Satellite Launch Vehicle): 3-stage all-solid rocket carrying up to 500 kg payload to Low Earth Orbit (LEO).',
        'SDSC Sriharikota: Located in Tirupati district, Andhra Pradesh on Pulicat Lake barrier island.'
      ]
    },
    examRelevance: 'WBCS Geography & Space Tech.'
  },
  {
    id: 'space-09-nisar-satellite-prep',
    day: 10,
    dateStr: 'January',
    category: 'space_science',
    categoryLabel: '🚀 Earth Observation',
    title: 'NASA-ISRO SAR (NISAR) Satellite Enters Final Integration Phase in Bengaluru',
    titleBn: 'নাসা-ইসরো যৌথ রাডার উপগ্রহ নিসার (NISAR)-এর চূড়ান্ত প্রস্তুতি সম্পন্ন',
    summary: 'Joint dual-frequency (L-band and S-band) Synthetic Aperture Radar observatory being readied for GSLV launch from Sriharikota.',
    summaryBn: 'পৃথিবীর ভূত্বকের সূক্ষ্ম পরিবর্তন ও হিমবাহ পর্যবেক্ষণে নাসা ও ইসরোর যৌথ উপগ্রহ নিসার।',
    keyPoints: [
      'NASA provides L-band SAR, radar reflector antenna, and high-rate downlink.',
      'ISRO provides S-band SAR, spacecraft bus, and GSLV launch vehicle.',
      'Maps entire globe every 12 days to monitor tectonic deformation, glaciers, and forest biomass.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Synthetic Aperture Radar (SAR) Principles',
      points: [
        'SAR: Active microwave remote sensing technology operating in all-weather, day-and-night conditions.',
        'L-band (1–2 GHz, wavelength ~24 cm) penetrates dense forest canopy; S-band (2–4 GHz, ~10 cm) monitors surface vegetation.'
      ]
    },
    examRelevance: 'WBCS Science & Technology, UPSC.'
  },
  {
    id: 'space-10-spacex-starship-ift3',
    day: 20,
    dateStr: 'January',
    category: 'space_science',
    categoryLabel: '🚀 Heavy Rockets',
    title: 'SpaceX Prepares Starship Super Heavy for Integrated Flight Test 3 (IFT-3)',
    titleBn: 'বিশ্বের বৃহত্তম রকেট স্টারশিপের তৃতীয় পরীক্ষামূলক উৎক্ষেপণের প্রস্তুতি',
    summary: 'SpaceX completed static fire tests of 33 Raptor engines on Super Heavy booster at Starbase, Boca Chica, Texas.',
    summaryBn: 'মঙ্গল ও চাঁদে মানব অভিযানের লক্ষ্যে নির্মিত বিশ্বের সবচেয়ে শক্তিশালী রকেটের পরীক্ষা।',
    keyPoints: [
      'Height: 121 meters (tallest and most powerful launch vehicle in human history).',
      'Produces 16.7 million pounds of thrust using liquid methane and liquid oxygen (Methalox).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Cryogenic Propellants Comparison',
      points: [
        'Methalox: Liquid Methane (-161°C) + Liquid Oxygen (-183°C) (used in Starship & ISRO SCE-200 R&D).',
        'Hydrolox: Liquid Hydrogen (-253°C) + Liquid Oxygen (used in ISRO C25 cryogenic stage of LVM3).'
      ]
    },
    examRelevance: 'WBCS Science & Tech.'
  },

  // 8. NATIONAL & INTERNATIONAL APPOINTMENTS (10 Events)
  {
    id: 'appt-01-dinesh-tripathi',
    day: 4,
    dateStr: '04 January',
    category: 'appointments',
    categoryLabel: '👤 Defense Appointments',
    title: 'Vice Admiral Dinesh K. Tripathi Appointed as Vice Chief of the Naval Staff (VCNS)',
    titleBn: 'ভাইস অ্যাডমিরাল দীনেশ কে. ত্রিপাঠী নৌবাহিনীর উপ-প্রধান নিযুক্ত',
    summary: 'Vice Admiral Dinesh K. Tripathi took charge as Vice Chief of Naval Staff at South Block, New Delhi.',
    summaryBn: 'ভারতীয় নৌবাহিনীর নতুন ভাইস চিফ হিসেবে দায়িত্ব গ্রহণ করেছেন দীনেশ ত্রিপাঠী।',
    keyPoints: [
      'Communication and Electronic Warfare specialist who previously served as Flag Officer Commanding-in-Chief (FOC-in-C) Western Naval Command.',
      'Later elevated as the Chief of the Naval Staff (CNS).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Indian Navy Hierarchy',
      points: [
        'Chief of the Naval Staff (CNS): 4-Star Admiral.',
        '1st Indian CNS: Vice Admiral R.D. Katari (1958).'
      ]
    },
    examRelevance: 'WBP SI, Kolkata Police, SSC CGL.'
  },
  {
    id: 'appt-02-indra-mani-pandey-bimstec',
    day: 4,
    dateStr: '04 January',
    category: 'appointments',
    categoryLabel: '👤 International Bodies',
    title: 'Ambassador Indra Mani Pandey Assumes Charge as Secretary General of BIMSTEC',
    titleBn: 'ইন্দ্র মণি পাণ্ডে বিমস্টেক (BIMSTEC)-এর নতুন মহাসচিব হিসেবে দায়িত্ব গ্রহণ করলেন',
    summary: 'Senior diplomat Indra Mani Pandey became the first Indian to hold the post of Secretary General of BIMSTEC in Dhaka.',
    summaryBn: 'প্রথম ভারতীয় হিসেবে বিমস্টেকের মহাসচিব পদে নিযুক্ত হলেন রাষ্ট্রদূত ইন্দ্র মণি পাণ্ডে।',
    keyPoints: [
      'Succeeded Tenzin Lekphell of Bhutan for a 3-year tenure.',
      'Prior to this, served as India\'s Permanent Representative to UN in Geneva.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: BIMSTEC Structure & Member States',
      points: [
        'BIMSTEC: Bay of Bengal Initiative for Multi-Sectoral Technical and Economic Cooperation.',
        'Formed: 6 June 1997 via Bangkok Declaration | Secretariat HQ: Dhaka, Bangladesh.',
        '7 Member Countries: 5 South Asian (Bangladesh, Bhutan, India, Nepal, Sri Lanka) + 2 Southeast Asian (Myanmar, Thailand).'
      ]
    },
    examRelevance: 'WBCS International Relations, WBPSC Clerkship.'
  },
  {
    id: 'appt-03-arindam-bagchi-geneva',
    day: 3,
    dateStr: '03 January',
    category: 'appointments',
    categoryLabel: '👤 Diplomatic Appointments',
    title: 'Arindam Bagchi Takes Charge as India\'s Permanent Representative to UN in Geneva',
    titleBn: 'অরিন্দম বাগচী জেনেভায় রাষ্ট্রসংঘে ভারতের স্থায়ী প্রতিনিধি হিসেবে দায়িত্ব গ্রহণ করলেন',
    summary: 'Former Ministry of External Affairs (MEA) official spokesperson Arindam Bagchi assumed charge as Ambassador/Permanent Representative to UN and other International Organisations in Geneva.',
    summaryBn: 'সুইজারল্যান্ডের জেনেভায় রাষ্ট্রসংঘের মিশন প্রধান হিসেবে যোগ দিলেন অভিজ্ঞ কূটনীতিবিদ অরিন্দম বাগচী।',
    keyPoints: [
      'Succeeded Indra Mani Pandey in Geneva.',
      'Randhir Jaiswal succeeded Arindam Bagchi as the MEA Official Spokesperson.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: UN Bodies Headquartered in Geneva, Switzerland',
      points: [
        'Geneva UN Bodies: WHO, ILO, UNHCR, UNHRC, WIPO, WMO, ITU, WTO, UNCTAD.',
        'UN Permanent Mission in New York: Headed by India\'s Permanent Representative to UN HQ.'
      ]
    },
    examRelevance: 'WBCS GS Paper IV, SSC CGL.'
  },
  {
    id: 'appt-04-senthil-pandian-wto',
    day: 5,
    dateStr: '05 January',
    category: 'appointments',
    categoryLabel: '👤 Diplomatic Appointments',
    title: 'Senthil Pandian C Appointed as India\'s Ambassador to World Trade Organization (WTO)',
    titleBn: 'বিশ্ব বাণিজ্য সংস্থায় (WTO) ভারতের রাষ্ট্রদূত হিসেবে সেন্থিল পান্ডিয়ান সি নিযুক্ত',
    summary: 'Senior IAS officer Senthil Pandian C appointed as Ambassador and Permanent Representative of India to WTO in Geneva.',
    summaryBn: 'জেনেভায় বিশ্ব বাণিজ্য সংস্থায় ভারতের নতুন রাষ্ট্রদূত হলেন সেন্থিল পান্ডিয়ান।',
    keyPoints: [
      'Succeeded Brajendra Navnit upon completion of his tenure.',
      'Leads negotiations on food security public stockholding and fisheries subsidies.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: World Trade Organization (WTO)',
      points: [
        'Established: 1 January 1995 via Marrakesh Agreement (replacing GATT 1947).',
        'HQ: Geneva, Switzerland | Members: 164 countries.',
        'Director-General: Ngozi Okonjo-Iweala (Nigeria - 1st woman and 1st African DG).'
      ]
    },
    examRelevance: 'WBCS Economy & Trade.'
  },
  {
    id: 'appt-05-daljit-chaudhary-ssb',
    day: 19,
    dateStr: '19 January',
    category: 'appointments',
    categoryLabel: '👤 Paramilitary Heads',
    title: 'IPS Daljit Singh Chaudhary Appointed as Director General of Sashastra Seema Bal (SSB)',
    titleBn: 'দলজিৎ সিং চৌধুরী সশস্ত্র সীমা বল (SSB)-এর নতুন ডিরেক্টর জেনারেল নিযুক্ত',
    summary: 'Senior 1990-batch IPS officer Daljit Singh Chaudhary appointed as Director General of border guarding force SSB.',
    summaryBn: 'ভারত-নেপাল ও ভারত-ভুটান সীমান্ত পাহারার দায়িত্বে থাকা এসএসবি-র প্রধান হলেন দলজিৎ সিং।',
    keyPoints: [
      'SSB guards India\'s open international borders with Nepal (1,751 km) and Bhutan (699 km).',
      'Works under the Ministry of Home Affairs (MHA).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Central Armed Police Forces (CAPF) in India',
      points: [
        '7 CAPFs under MHA: AR (Assam Rifles), BSF (Pakistan/Bangladesh), CISF (Industrial/Airports), CRPF (Internal Security), ITBP (China border), NSG (Counter-terrorism), SSB (Nepal/Bhutan).',
        'SSB Motto: "Service, Security and Brotherhood" (formed 1963 post-Sino-Indian war).'
      ]
    },
    examRelevance: 'WBP SI, Kolkata Police, Food SI.'
  },
  {
    id: 'appt-06-nina-singh-cisf',
    day: 1,
    dateStr: '01 January',
    category: 'appointments',
    categoryLabel: '👤 First Women in Defense',
    title: 'Nina Singh Becomes First Woman Director General of Central Industrial Security Force (CISF)',
    titleBn: 'নীনা সিং সিআইএসএফ (CISF)-এর প্রথম মহিলা ডিরেক্টর জেনারেল হিসেবে দায়িত্ব গ্রহণ করলেন',
    summary: '1989-batch IPS officer Nina Singh scripted history by taking charge as the first woman DG of CISF.',
    summaryBn: 'প্রথম মহিলা হিসেবে কেন্দ্রীয় শিল্প নিরাপত্তা বাহিনীর সর্বোচ্চ পদে বসলেন নীনা সিং।',
    keyPoints: [
      'CISF guards 68 civil airports, Delhi Metro, nuclear power stations, and space installations.',
      'Anish Dayal Singh simultaneously appointed as DG of CRPF.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: CISF & Women IPS Pioneers',
      points: [
        'CISF: Formed on 10 March 1969 under CISF Act, 1968 | HQ: New Delhi.',
        'Kiran Bedi: First woman IPS officer in India (1972 batch).',
        'Kanchan Chaudhary Bhattacharya: First woman Director General of Police (DGP of Uttarakhand, 2004).'
      ]
    },
    examRelevance: 'WBCS GS Paper IV, WBP SI, SSC CGL.'
  },
  {
    id: 'appt-07-justice-prasanna-varale',
    day: 24,
    dateStr: '24 January',
    category: 'appointments',
    categoryLabel: '👤 Judicial Appointments',
    title: 'Justice Prasanna B. Varale Sworn In as Judge of Supreme Court of India',
    titleBn: 'বিচারপতি প্রসন্ন বি. ভারালে সুপ্রিম কোর্টের বিচারপতি হিসেবে শপথ নিলেন',
    summary: 'Chief Justice of India D.Y. Chandrachud administered oath of office to Justice Prasanna Bhalachandra Varale, bringing Supreme Court to full sanctioned strength of 34 judges.',
    summaryBn: 'কর্ণাটক হাইকোর্টের প্রধান বিচারপতি প্রসন্ন ভারালে সুপ্রিম কোর্টে শপথ গ্রহণ করেন।',
    keyPoints: [
      'Previously served as Chief Justice of Karnataka High Court.',
      'Became the 3rd sitting Dalit judge in the Supreme Court (alongside Justice B.R. Gavai and Justice C.T. Ravikumar).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Supreme Court Collegium System',
      points: [
        'Supreme Court Collegium: Headed by CJI + 4 senior-most Supreme Court Judges.',
        'Origin: Evolved through Three Judges Cases (1981, 1993, 1998); 2nd Judges Case (1993) introduced primacy of CJI.',
        'NJAC: National Judicial Appointments Commission (99th Amendment 2014) struck down as unconstitutional by SC in 2015 (4th Judges Case).'
      ]
    },
    examRelevance: 'WBCS Indian Polity Paper V, UPSC GS II.'
  },
  {
    id: 'appt-08-justice-br-gavai-nalsa',
    day: 3,
    dateStr: '03 January',
    category: 'appointments',
    categoryLabel: '👤 Legal Aid Bodies',
    title: 'Justice B.R. Gavai Appointed Executive Chairman of National Legal Services Authority (NALSA)',
    titleBn: 'বিচারপতি বি.আর. গাভাই নালসা (NALSA)-এর কার্যকরী চেয়ারম্যান নিযুক্ত',
    summary: 'President of India nominated Supreme Court Judge Justice B.R. Gavai as Executive Chairman of NALSA.',
    summaryBn: 'আইনি পরিষেবা কর্তৃপক্ষের কার্যনির্বাহী চেয়ারম্যান হিসেবে বিচারপতি গাভাই দায়িত্ব নিলেন।',
    keyPoints: [
      'NALSA provides free and competent legal services to the weaker sections of society.',
      'Organizes National Lok Adalats for amicable pre-litigation and pending dispute resolution.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: NALSA & Article 39A',
      points: [
        'Constitutional Mandate: Article 39A (added by 42nd Amendment 1976) mandates State to provide free legal aid to ensure justice.',
        'Legal Services Authorities Act, 1987: Came into force on 9 November 1995 (National Legal Services Day observed on 9 Nov).',
        'Patron-in-Chief: Chief Justice of India (Ex-officio).'
      ]
    },
    examRelevance: 'WBCS Polity, Judiciary Exams.'
  },
  {
    id: 'appt-09-bernardo-arevalo',
    day: 15,
    dateStr: '15 January',
    category: 'appointments',
    categoryLabel: '👤 World Presidents',
    title: 'Anti-Corruption Crusader Bernardo Arevalo Sworn In as President of Guatemala',
    titleBn: 'দুর্নীতি-বিরোধী আন্দোলনের নেতা বার্নার্দো আরেভালো গুয়াতেমালার প্রেসিডেন্ট হিসেবে শপথ নিলেন',
    summary: 'Bernardo Arevalo of the Semilla (Seed) party officially sworn in as President of Guatemala in Guatemala City.',
    summaryBn: 'মধ্য আমেরিকার দেশ গুয়াতেমালার নতুন প্রেসিডেন্ট হিসেবে দায়িত্ব গ্রহণ করলেন আরেভালো।',
    keyPoints: [
      'Son of Guatemala\'s first democratically elected president Juan Jose Arevalo.',
      'Pledged to dismantle systemic judicial corruption and restore rule of law.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Guatemala & Central America Profile',
      points: [
        'Capital: Guatemala City | Currency: Guatemalan Quetzal (GTQ).',
        'Mayan Civilization: Ancient Mesoamerican civilization centered in Guatemala (famous UNESCO site Tikal).'
      ]
    },
    examRelevance: 'WBPSC Miscellaneous, SSC CGL.'
  },
  {
    id: 'appt-10-nadia-calvino-eib',
    day: 1,
    dateStr: '01 January',
    category: 'appointments',
    categoryLabel: '👤 Global Financial Bodies',
    title: 'Nadia Calvino Takes Charge as First Woman President of European Investment Bank (EIB)',
    titleBn: 'নাদিয়া ক্যালভিনো ইউরোপিয়ান ইনভেস্টমেন্ট ব্যাঙ্কের (EIB) প্রথম মহিলা প্রেসিডেন্ট হলেন',
    summary: 'Former Deputy Prime Minister and Economy Minister of Spain Nadia Calvino took office as President of EIB.',
    summaryBn: 'ইউরোপিয়ান ইউনিয়নের আর্থিক প্রতিষ্ঠান ইআইবি-র প্রথম নারী প্রধান হিসেবে দায়িত্ব নিলেন নাদিয়া ক্যালভিনো।',
    keyPoints: [
      'Succeeded Werner Hoyer of Germany.',
      'EIB is the world\'s largest multilateral financial institution by assets.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: European Investment Bank (EIB)',
      points: [
        'Established: 1958 under the Treaty of Rome | HQ: Kirchberg, Luxembourg.',
        'Shareholders: 27 European Union (EU) Member States.'
      ]
    },
    examRelevance: 'Banking GA, WBCS Economy.'
  },

  // 9. AWARDS, HONORS & CIVILIAN RECOGNITIONS (12 Events)
  {
    id: 'award-01-bharat-ratna-karpoori',
    day: 23,
    dateStr: '23 January',
    category: 'awards_persons',
    categoryLabel: '🏆 National Civilian Honors',
    title: 'Bharat Ratna Posthumously Awarded to "Jan Nayak" Karpoori Thakur',
    titleBn: 'বিহারের প্রাক্তন মুখ্যমন্ত্রী "জননায়ক" কর্পূরী ঠাকুরকে মরণোত্তর ভারতরত্ন প্রদান',
    summary: 'Government of India conferred nation\'s highest civilian honor Bharat Ratna on veteran socialist leader Karpoori Thakur on his centenary birth anniversary.',
    summaryBn: 'সামাজিক ন্যায়বিচারের পথিকৃৎ কর্পূরী ঠাকুরকে দেশের সর্বোচ্চ বেসামরিক সম্মান ভারতরত্ন প্রদান করা হলো।',
    keyPoints: [
      'Pioneered 1978 "Karpoori Formula" in Bihar introducing layered 26% reservation quota for EBCs, OBCs, women, and economically poor.',
      'Became the 49th recipient of Bharat Ratna.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Bharat Ratna History & Records',
      points: [
        'Instituted: 2 January 1954 by President Dr. Rajendra Prasad.',
        '1st 3 Awardees (1954): Dr. S. Radhakrishnan, C. Rajagopalachari, Dr. C.V. Raman.',
        '1st Posthumous: Lal Bahadur Shastri (1966) | 1st Woman: Indira Gandhi (1971).',
        'Foreign Awardees: Khan Abdul Ghaffar Khan (1987) & Nelson Mandela (1990).'
      ]
    },
    examRelevance: 'WBCS Indian Polity, Modern History, All WB Exams.'
  },
  {
    id: 'award-02-padma-awards-2026',
    day: 25,
    dateStr: '25 January',
    category: 'awards_persons',
    categoryLabel: '🏆 National Civilian Honors',
    title: 'Padma Awards Announced: 131 Total Conferments (5 Vibhushan, 13 Bhushan, 113 Shri)',
    titleBn: 'পদ্ম পুরস্কার ঘোষণা: মোট ১৩১ জন বিশিষ্ট ব্যক্তিত্বকে রাষ্ট্রীয় সম্মাননা',
    summary: 'President approved conferment of 131 Padma Awards honoring distinguished service across arts, public affairs, and social service.',
    summaryBn: 'রাষ্ট্রপতি ভবনের তরফ থেকে ৫টি পদ্মবিভূষণ ও ১৩টি পদ্মভূষণ সহ মোট ১৩১টি পদ্ম পুরস্কার ঘোষণা করা হয়েছে।',
    keyPoints: [
      '5 Padma Vibhushan: Dharmendra Deol (Posthumous), Justice K.T. Thomas, Prof. N. Rajam, P. Narayanan, V.S. Achuthanandan (Posthumous).',
      'Notable Padma Bhushan: Alka Yagnik, Mammootty, Bhagat Singh Koshyari.',
      'Multiple grassroots folk artists and craftspersons from West Bengal awarded Padma Shri.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Padma Awards Hierarchy & Legal Status',
      points: [
        'Instituted: 1954 | Hierarchy: Bharat Ratna -> Padma Vibhushan -> Padma Bhushan -> Padma Shri.',
        'Article 18(1): Supreme Court in Balaji Raghavan (1995) ruled National Awards do not violate abolition of titles.',
        'Annual Ceiling: Max 120 awards per year (excluding posthumous and foreigners).'
      ]
    },
    examRelevance: 'Guaranteed 2-3 questions in all 2026 WBPSC & Police exams.'
  },
  {
    id: 'award-03-subhas-bose-aapda',
    day: 23,
    dateStr: '23 January',
    category: 'awards_persons',
    categoryLabel: '🏆 Disaster Relief Honors',
    title: 'Subhas Chandra Bose Aapda Prabandhan Puraskar Conferred on 60 Parachute Field Hospital, UP',
    titleBn: 'সুভাষচন্দ্র বসু আপদা প্রবন্ধন পুরস্কার: ৬০ প্যারাশুট ফিল্ড হাসপাতাল',
    summary: '60 Parachute Field Hospital selected for institutional disaster management excellence during Operation Dost in Turkey.',
    summaryBn: 'তুরস্কের বিধ্বংসী ভূমিকম্পে অপারেশন দোস্তে অসামান্য সেবার জন্য ৬০ প্যারাশুট ফিল্ড হাসপাতাল এই পুরস্কার পেল।',
    keyPoints: [
      'Set up a 30-bed emergency hospital in Hatay province, Turkey, treating 3,600+ patients.',
      'Institutional prize carries ₹51 Lakh cash and certificate (Individual gets ₹5 Lakh).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Disaster Management Act 2005 & NDMA',
      points: [
        'DM Act 2005: Enacted post-2004 Indian Ocean Tsunami.',
        'NDMA: Chaired by Prime Minister | SDMA: Chaired by State Chief Minister.',
        'NDRF: Constituted under Section 44 of DM Act, 2005.'
      ]
    },
    examRelevance: 'WBP SI, Kolkata Police, Food SI.'
  },
  {
    id: 'award-04-khel-ratna-satwik-chirag',
    day: 9,
    dateStr: '09 January',
    category: 'awards_persons',
    categoryLabel: '🏆 National Sports Awards',
    title: 'Major Dhyan Chand Khel Ratna Award Presented to Badminton Stars Satwik & Chirag',
    titleBn: 'মেজর ধ্যানচাঁদ খেলরত্ন পুরস্কারে ভূষিত ব্যাডমিন্টন জুটি সাত্বিকসাইরাজ ও চিরাগ শেট্টি',
    summary: 'President Droupadi Murmu presented Khel Ratna, India\'s highest sporting honor, to world #1 badminton men\'s doubles duo Satwiksairaj Rankireddy and Chirag Shetty.',
    summaryBn: 'রাষ্ট্রপতি ভবনে জাতীয় ক্রীড়া পুরস্কারে খেলরত্ন সম্মান গ্রহণ করলেন সাত্বিক-চিরাগ জুটি।',
    keyPoints: [
      'Won Asian Games Gold (Hangzhou 2023), Asian Badminton Championship Gold, and Indonesia Open Super 1000.',
      '26 athletes conferred Arjuna Award including Mohammed Shami (Cricket) and Sheetal Devi (Para Archery).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: National Sports Awards History',
      points: [
        'Khel Ratna: Instituted 1991-92 (1st recipient Viswanathan Anand) | Prize money: ₹25 Lakh.',
        'Arjuna Award: Instituted 1961 | Prize money: ₹15 Lakh.',
        'Dronacharya Award: Instituted 1985 for coaches (1st recipients: Bhalchandra Bhaskar Bhagwat, O.M. Nambiar, Om Prakash Bhardwaj).'
      ]
    },
    examRelevance: 'WBCS Sports, WBPSC Clerkship, WBP Constable.'
  },
  {
    id: 'award-05-ms-swaminathan-award',
    day: 3,
    dateStr: '03 January',
    category: 'awards_persons',
    categoryLabel: '🏆 Agricultural Awards',
    title: 'Prof. B.R. Kamboj Honoured with 14th M.S. Swaminathan Award for Agronomy',
    titleBn: '১৪তম এম.এস. স্বামীনাথন পুরস্কারে সম্মানিত হলেন অধ্যাপক বি.আর. কম্বোজ',
    summary: 'Vice-Chancellor of Chaudhary Charan Singh Haryana Agricultural University (CCSHAU) Prof. B.R. Kamboj conferred M.S. Swaminathan Award.',
    summaryBn: 'কৃষি বিজ্ঞান ও গবেষণায় অবদানের জন্য অধ্যাপক কম্বোজ এই সম্মাননা লাভ করেন।',
    keyPoints: [
      'Presented by Karnataka Governor Thawar Chand Gehlot at Gwalior.',
      'Recognized for developing resource conservation technologies in crop rotation.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Dr. M.S. Swaminathan & Green Revolution',
      points: [
        'Dr. M.S. Swaminathan: Father of Green Revolution in India (introduced semi-dwarf wheat varieties with Norman Borlaug in 1960s).',
        'National Commission on Farmers (2004): Recommended MSP at C2 + 50% formula.',
        '1st World Food Prize (1987): Won by Dr. M.S. Swaminathan.'
      ]
    },
    examRelevance: 'WBCS Agriculture, WBPSC Food SI.'
  },
  {
    id: 'award-06-golden-globes-81',
    day: 7,
    dateStr: '07 January',
    category: 'awards_persons',
    categoryLabel: '🏆 International Cinema',
    title: '81st Golden Globe Awards: Christopher Nolan\'s "Oppenheimer" Wins 5 Top Honors',
    titleBn: '৮১তম গোল্ডেন গ্লোব পুরস্কার: ক্রিস্টোফার নোলানের "ওপেনহাইমার" সেরা চলচ্চিত্র সহ ৫টি পুরস্কার জয়ী',
    summary: 'Biographical drama Oppenheimer dominated the 81st Golden Globe Awards in Beverly Hills, California.',
    summaryBn: 'লস অ্যাঞ্জেলেসে অনুষ্ঠিত গোল্ডেন গ্লোব পুরস্কারে ওপেনহাইমার সেরা চলচ্চিত্র নির্বাচিত হয়েছে।',
    keyPoints: [
      'Best Motion Picture (Drama): Oppenheimer; Best Director: Christopher Nolan; Best Actor: Cillian Murphy; Best Supporting Actor: Robert Downey Jr.',
      'Best Motion Picture (Musical/Comedy): Poor Things; Best Actress (Drama): Lily Gladstone (Killers of the Flower Moon).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Golden Globes & J. Robert Oppenheimer',
      points: [
        'Golden Globe Awards: First presented in January 1944 by Hollywood Foreign Press Association (HFPA).',
        'Manhattan Project: Secret US WWII project (1942–1946) directed by J. Robert Oppenheimer that developed 1st atomic bombs (Trinity Test, 16 July 1945).'
      ]
    },
    examRelevance: 'WBPSC Miscellaneous, SSC CGL.'
  },
  {
    id: 'award-07-filmfare-awards-69',
    day: 28,
    dateStr: '28 January',
    category: 'awards_persons',
    categoryLabel: '🏆 National Cinema',
    title: '69th Filmfare Awards in Gandhinagar: "12th Fail" Wins Best Film & Best Director',
    titleBn: '৬৯তম ফিল্মফেয়ার পুরস্কার: সেরা চলচ্চিত্র ও সেরা পরিচালক "১২থ ফেল"',
    summary: '69th Hyundai Filmfare Awards held at GIFT City, Gandhinagar, Gujarat with Vidhu Vinod Chopra\'s 12th Fail taking top honors.',
    summaryBn: 'গান্ধীনগরে অনুষ্ঠিত ফিল্মফেয়ারে বিধু বিনোদ চোপড়ার "১২থ ফেল" সেরা চলচ্চিত্রের পুরস্কার জিতল।',
    keyPoints: [
      'Best Film & Best Director: Vidhu Vinod Chopra (12th Fail).',
      'Best Actor (Male): Ranbir Kapoor (Animal); Best Actress (Female): Alia Bhatt (Rocky Aur Rani Kii Prem Kahaani).',
      'Best Actor (Critics): Vikrant Massey (12th Fail); Lifetime Achievement Award: David Dhawan.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Filmfare Awards History',
      points: [
        '1st Filmfare Awards: Held on 21 March 1954 at Metro Cinema, Bombay (then called "Clare Awards").',
        '1st Best Film: Do Bigha Zamin (1953, directed by Bengali legend Bimal Roy).'
      ]
    },
    examRelevance: 'WBPSC Miscellaneous, Police Exams.'
  },
  {
    id: 'award-08-icc-awards-2023',
    day: 25,
    dateStr: '25 January',
    category: 'awards_persons',
    categoryLabel: '🏆 Cricket Awards',
    title: 'ICC Awards: Suryakumar Yadav Named T20I Player of the Year, Virat Kohli ODI Player',
    titleBn: 'আইসিসি পুরস্কার: সূর্যকুমার যাদব বর্ষসেরা টি-টোয়েন্টি এবং বিরাট কোহলি বর্ষসেরা ওয়ানডে ক্রিকেটার',
    summary: 'International Cricket Council (ICC) announced annual individual performance awards for the year.',
    summaryBn: 'আন্তর্জাতিক ক্রিকেট কাউন্সিল ভারতীয় তারকা সূর্যকুমার যাদব ও বিরাট কোহলিকে বর্ষসেরা সম্মাননা দিল।',
    keyPoints: [
      'ICC Men\'s T20I Cricketer of the Year: Suryakumar Yadav (won for 2nd straight year).',
      'ICC Men\'s ODI Cricketer of the Year: Virat Kohli (record 4th time).',
      'Sir Garfield Sobers Trophy (Men\'s Cricketer of the Year): Pat Cummins (Australia captain).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: International Cricket Council (ICC)',
      points: [
        'Established: 15 June 1909 as Imperial Cricket Conference | HQ: Dubai, UAE (moved from Lord\'s, London in 2005).',
        'Chairman: Greg Barclay (New Zealand).'
      ]
    },
    examRelevance: 'WBP Constable, SI, SSC.'
  },
  {
    id: 'award-09-rashtriya-khel-protsahan',
    day: 9,
    dateStr: '09 January',
    category: 'awards_persons',
    categoryLabel: '🏆 Sports Promotion',
    title: 'Rashtriya Khel Protsahan Puruskar Conferred on Odisha Mining Corporation (OMC)',
    titleBn: 'রাষ্ট্রীয় খেল প্রোৎসাহন পুরস্কার পেল ওড়িশা মাইনিং কর্পোরেশন',
    summary: 'Odisha Mining Corporation Ltd (OMC) and Jain University (Bengaluru) awarded Rashtriya Khel Protsahan Puruskar for corporate sports promotion.',
    summaryBn: 'ক্রীড়ার প্রসারে বিশেষ অবদানের জন্য ওড়িশা মাইনিং কর্পোরেশন এই জাতীয় পুরস্কারে সম্মানিত হলো।',
    keyPoints: [
      'OMC recognized for sponsorship of Indian Men\'s and Women\'s Hockey teams and Kalinga Stadium sports high-performance centers.',
      'Jain University recognized for identifying and nurturing grassroots athletic talent.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Corporate Sports Promotion Schemes',
      points: [
        'Instituted: 2009 by Ministry of Youth Affairs and Sports.',
        'Odisha: Known as the "Sports Capital of India" for hosting back-to-back Men\'s FIH Hockey World Cups (2018 & 2023).'
      ]
    },
    examRelevance: 'WBCS Sports & State GK.'
  },
  {
    id: 'award-10-tenzing-norgay-adventure',
    day: 9,
    dateStr: '09 January',
    category: 'awards_persons',
    categoryLabel: '🏆 Adventure Awards',
    title: 'Tenzing Norgay National Adventure Award Posthumously Presented to Savita Kanswal',
    titleBn: 'তেনজিং নরগে জাতীয় অ্যাডভেঞ্চার পুরস্কারে মরণোত্তর সম্মানিত পর্বতারোহী সবিতা কনসওয়াল',
    summary: 'President Droupadi Murmu conferred the Tenzing Norgay National Adventure Award (Land Adventure) posthumously on mountaineer Savita Kanswal.',
    summaryBn: '১৬ দিনে এভারেস্ট ও মাকালু জয়ী প্রয়াত সবিতা কনসওয়ালকে তেনজিং নরগে সম্মান প্রদান করা হলো।',
    keyPoints: [
      'First Indian woman mountaineer to scale Mount Everest (8,848m) and Mount Makalu (8,485m) in a span of just 16 days.',
      'Tragically died in an avalanche at Draupadi Ka Danda II peak in Uttarakhand.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Tenzing Norgay & Indian Mountaineering Milestones',
      points: [
        'Tenzing Norgay & Sir Edmund Hillary: 1st people to summit Mt. Everest on 29 May 1953.',
        'Bachendri Pal: 1st Indian woman to summit Mt. Everest (23 May 1984).',
        'HMI (Himalayan Mountaineering Institute): Located in Darjeeling, West Bengal (founded Nov 1954; Tenzing Norgay was 1st Director of Field Training).'
      ]
    },
    examRelevance: 'WBCS Geography & Art/Culture, WBP SI.'
  },
  {
    id: 'award-11-divyakriti-singh-arjuna',
    day: 9,
    dateStr: '09 January',
    category: 'awards_persons',
    categoryLabel: '🏆 First Women in Sports',
    title: 'Divyakriti Singh Becomes First Indian Woman to Receive Arjuna Award for Equestrian',
    titleBn: 'দিব্যকৃতি সিং প্রথম ভারতীয় মহিলা হিসেবে অশ্বারোহণে অর্জুন পুরস্কারে ভূষিত',
    summary: '24-year-old equestrian dressage athlete Divyakriti Singh from Rajasthan became the first Indian female to win the Arjuna Award for Equestrian.',
    summaryBn: 'এশিয়ান গেমসে সোনাজয়ী দিব্যকৃতি সিং অশ্বারোহণ খেলায় প্রথম মহিলা অর্জুন প্রাপক হলেন।',
    keyPoints: [
      'Part of the Indian Dressage team that won historic Gold medal at Hangzhou Asian Games 2023 (India\'s 1st equestrian gold in 41 years).',
      'Trained in Hagen, Germany.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Equestrian in Asian Games History',
      points: [
        'Equestrian introduced in Asian Games in 1982 (New Delhi) where India won 3 Gold medals (Raghubir Singh, Rupinder Singh Brar).',
        'Hangzhou 2023 Team Gold: Divyakriti Singh, Hriday Chheda, Anush Agarwalla, Sudipti Hajela.'
      ]
    },
    examRelevance: 'WBCS Sports, WBPSC Miscellaneous.'
  },
  {
    id: 'award-12-odop-awards-2023',
    day: 5,
    dateStr: '05 January',
    category: 'awards_persons',
    categoryLabel: '🏆 Commerce & Artisans',
    title: 'One District One Product (ODOP) Awards Presented at Bharat Mandapam',
    titleBn: 'ভারত মণ্ডপমে ওয়ান ডিস্ট্রিক্ট ওয়ান প্রোডাক্ট (ODOP) জাতীয় পুরস্কার প্রদান',
    summary: 'Ministry of Commerce and Industry presented national ODOP awards celebrating indigenous regional handicrafts and agricultural produce.',
    summaryBn: 'বাণিজ্য মন্ত্রক স্থানীয় ঐতিহ্যবাহী পণ্যের প্রচার ও বাণিজ্যের জন্য জাতীয় পুরস্কার দিল।',
    keyPoints: [
      'Top Performing States: Gujarat (Gold in State Category A), Jammu & Kashmir (Gold in Category B).',
      'Encourages District as Export Hubs initiative under Foreign Trade Policy (FTP 2023).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: One District One Product (ODOP) Initiative',
      points: [
        'Origin: 1st launched by Uttar Pradesh Government in January 2018; adopted nationally by DPIIT in 2020.',
        'Objective: Identify, brand, and promote one unique product from each of the 760+ districts in India.'
      ]
    },
    examRelevance: 'WBCS Economy & Trade.'
  },

  // 10. BOOKS & AUTHORS (8 Events)
  {
    id: 'book-01-pranab-my-father',
    day: 11,
    dateStr: 'January',
    category: 'books',
    categoryLabel: '📚 Books & Authors',
    title: '"Pranab, My Father: A Daughter Remembers" Authored by Sharmistha Mukherjee',
    titleBn: '"প্রণব, মাই ফাদার: আ ডটার রিমেম্বারস" গ্রন্থ প্রকাশ (শর্মিষ্ঠা মুখোপাধ্যায়)',
    summary: 'Biographical memoir of India\'s 13th President Bharat Ratna Pranab Mukherjee authored by his daughter Sharmistha Mukherjee.',
    summaryBn: 'ভারতের প্রাক্তন রাষ্ট্রপতি প্রণব মুখোপাধ্যায়ের কন্যা শর্মিষ্ঠা মুখোপাধ্যায়ের রচিত আত্মজৈবনিক বই প্রকাশিত হলো।',
    keyPoints: [
      'Draws from Pranab Mukherjee\'s personal diary entries spanning 5 decades of Indian political history.',
      'Reveals his candid perspectives on 1984 post-Indira Gandhi succession, coalition governments, and 2004/2012 prime ministerial nominations.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Pranab Mukherjee (1935–2020) Profile',
      points: [
        'Birthplace: Mirati village, Birbhum district, West Bengal.',
        '13th President of India (2012–2017) | Conferred Bharat Ratna in 2019.',
        'Key Books Authored by Pranab Mukherjee: The Coalition Years, The Turbulent Years, The Presidential Years.'
      ]
    },
    examRelevance: 'WBCS GS Paper IV (Books & Authors), WBPSC Clerkship.'
  },
  {
    id: 'book-02-modi-green-future',
    day: 10,
    dateStr: 'January',
    category: 'books',
    categoryLabel: '📚 Books & Authors',
    title: '"Modi: Energising a Green Future" Released by Union Minister Bhupender Yadav',
    titleBn: '"মোদী: এনার্জাইজিং আ গ্রিন ফিউচার" বইয়ের আনুষ্ঠানিক প্রকাশ',
    summary: 'A book detailing India\'s environmental leadership and clean energy transition under PM Narendra Modi was released in New Delhi.',
    summaryBn: 'ভারতের পরিবেশবান্ধব উন্নয়ন ও সৌরশক্তি রূপান্তরের ওপর সংকলিত বই প্রকাশ পেল।',
    keyPoints: [
      'Published by Pentagon Press in association with Dr. Shyama Prasad Mookerjee Research Foundation.',
      'Foreword contributed by International Solar Alliance (ISA) and UNEP experts.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Mission LiFE & Panchamrit Climate Targets',
      points: [
        'Mission LiFE (Lifestyle for Environment): Launched by PM Modi in Oct 2022 at Kevadia, Gujarat with UN Secretary-General António Guterres.',
        'Panchamrit Targets (COP26 Glasgow): 500 GW non-fossil capacity by 2030; Net Zero emissions by 2070.'
      ]
    },
    examRelevance: 'WBCS Environment & Economy.'
  },
  {
    id: 'book-03-four-stars-destiny',
    day: 2,
    dateStr: 'January',
    category: 'books',
    categoryLabel: '📚 Books & Authors',
    title: '"Four Stars of Destiny: An Autobiography" by Former Army Chief Gen. M.M. Naravane',
    titleBn: '"ফোর স্টারস অব ডেসটিনি: অ্যান অটোবায়োগ্রাফি" (জেনারেল এম.এম. নারাভানে)',
    summary: 'Autobiographical memoir of India\'s 28th Chief of Army Staff General Manoj Mukund Naravane.',
    summaryBn: 'ভারতের ২৮তম সেনাপ্রধান জেনারেল মনোজ মুকুন্দ নারাভানের আত্মজীবনী প্রকাশ পেল।',
    keyPoints: [
      'Details his 42-year military service, the 2020 Galwan Valley clash with China, and CDS restructuring.',
      'Published by Penguin Random House India.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Chiefs of Defence Staff (CDS) of India',
      points: [
        '1st CDS of India: General Bipin Rawat (appointed 1 Jan 2020; died in Mi-17V5 helicopter crash in Coonoor, Dec 2021).',
        '2nd CDS of India: Lt. General Anil Chauhan (appointed Sept 2022).'
      ]
    },
    examRelevance: 'WBP SI, WBCS Current Affairs, SSC.'
  },
  {
    id: 'book-04-gandhi-three-campaigns',
    day: 15,
    dateStr: 'January',
    category: 'books',
    categoryLabel: '📚 Books & Authors',
    title: '"Gandhi: A Life in Three Campaigns" Authored by M.J. Akbar & K. Natwar Singh',
    titleBn: '"গান্ধী: আ লাইফ ইন থ্রি ক্যাম্পেনস" (এম.জে. আকবর ও কে. নটবর সিং)',
    summary: 'Historical analysis focusing on the 3 decisive mass campaigns led by Mahatma Gandhi against British colonial rule.',
    summaryBn: 'মহাত্মা গান্ধীর ৩টি ঐতিহাসিক গণ-আন্দোলনের ওপর নতুন বই প্রকাশ পেল।',
    keyPoints: [
      'Analyzes 1. Non-Cooperation Movement (1920), 2. Salt Satyagraha / Dandi March (1930), and 3. Quit India Movement (1942).',
      'Explores the interplay of non-violence, mass communication, and moral authority.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Mahatma Gandhi Seminal Books',
      points: [
        'Autobiography: The Story of My Experiments with Truth (written in Gujarati in Yerwada Jail; translated by Mahadev Desai).',
        'Hind Swaraj: Written in 1909 aboard ship SS Kildonan Castle diagnosing modern industrial civilization.'
      ]
    },
    examRelevance: 'WBCS Modern Indian History & Books.'
  },
  {
    id: 'book-05-ek-samandar-mere-andar',
    day: 29,
    dateStr: '29 January',
    category: 'books',
    categoryLabel: '📚 Books & Authors',
    title: '"Ek Samandar, Mere Andar" (Poetry Collection) Authored by Sanjeev Joshi',
    titleBn: '"এক সমন্দর, মেরে অন্দর" কাব্যগ্রন্থ প্রকাশ (সঞ্জীব যোশী)',
    summary: 'A compilation of 75 Hindi poems authored by Sanjeev Joshi, Senior Advisor to Defence Minister Rajnath Singh, was unveiled in New Delhi.',
    summaryBn: 'প্রতিরক্ষা মন্ত্রীর সিনিয়র উপদেষ্টা সঞ্জীব যোশীর রচিত ৭৫টি কবিতার সংকলন প্রকাশিত হলো।',
    keyPoints: [
      'Released in presence of NSA Ajit Doval, CDS Gen. Anil Chauhan, and MoS Defence.',
      'Reflects philosophical musings on patriotism, human resilience, and life\'s inner journeys.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: National Security Advisor (NSA) of India',
      points: [
        'Post Created: 1998 under Atal Bihari Vajpayee ministry.',
        '1st NSA of India: Brajesh Mishra (1998–2004).',
        'Current NSA: Ajit Doval (serving since 2014).'
      ]
    },
    examRelevance: 'WBPSC Miscellaneous, SSC CGL.'
  },
  {
    id: 'book-06-lachit-barphukan-book',
    day: 18,
    dateStr: 'January',
    category: 'books',
    categoryLabel: '📚 Books & Authors',
    title: '"Assam\'s Braveheart Lachit Barphukan" Authored by Arup Kumar Dutta',
    titleBn: '"আসামস ব্রেভহার্ট লাচিত বরফুকন" গ্রন্থ প্রকাশ (অরূপ কুমার দত্ত)',
    summary: 'Union Home Minister Amit Shah released the English book detailing the heroic leadership of 17th-century Ahom General Lachit Barphukan in Guwahati.',
    summaryBn: 'মোগলদের বিরুদ্ধে সরাইঘাটের যুদ্ধে ঐতিহাসিক বিজয়ী সেনাপতি লাচিত বরফুকনের ওপর নতুন বই প্রকাশ পেল।',
    keyPoints: [
      'Translated into 23 official scheduled languages by the Assam Government.',
      'Commemorates the 400th birth anniversary celebration of Lachit Barphukan.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Battle of Saraighat (1671) & Ahom Dynasty',
      points: [
        'Battle of Saraighat (1671): Fought on the Brahmaputra River near Guwahati between Ahom Kingdom (led by Lachit Barphukan) and Mughal Empire (led by Raja Ram Singh I); Ahoms achieved decisive victory.',
        'Ahom Dynasty: Founded in 1228 AD by Sukaphaa; ruled Assam for nearly 600 years until Treaty of Yandabo (1826).'
      ]
    },
    examRelevance: 'WBCS Medieval History, SSC CGL.'
  },
  {
    id: 'book-07-fertilising-the-future',
    day: 13,
    dateStr: 'January',
    category: 'books',
    categoryLabel: '📚 Books & Authors',
    title: '"Fertilising the Future: Bharat\'s March Towards Fertilizer Self-Sufficiency" by Dr. Mansukh Mandaviya',
    titleBn: '"ফার্টিলাইজিং দ্য ফিউচার: ভারতের সার আত্মনির্ভরতা" (ডঃ মনসুখ মাণ্ডব্য)',
    summary: 'Book documenting India\'s journey to revive closed urea fertilizer plants and introduce indigenous Nano Urea and Nano DAP.',
    summaryBn: 'ভারতের ন্যানো ইউরিয়া ও সার উৎপাদনে স্বাবলম্বী হওয়ার যাত্রাপথ নিয়ে কেন্দ্রীয় মন্ত্রীর বই।',
    keyPoints: [
      'Released by Vice-President Jagdeep Dhankhar in New Delhi.',
      'Details revival of 5 major fertilizer units at Gorakhpur, Ramagundam, Sindri, Barauni, and Talcher.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Nano Fertilizer & IFFCO Innovation',
      points: [
        'Nano Urea (Liquid): World\'s 1st nano urea developed indigenously by Indian Farmers Fertiliser Cooperative (IFFCO) at Kalol, Gujarat (2021).',
        'PM-PRANAM Scheme: Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth (promotes alternative fertilizers).'
      ]
    },
    examRelevance: 'WBCS Agriculture & Economy.'
  },
  {
    id: 'book-08-uncommon-love-sudha-murty',
    day: 20,
    dateStr: 'January',
    category: 'books',
    categoryLabel: '📚 Books & Authors',
    title: '"An Uncommon Love: The Early Life of Sudha and Narayana Murthy" by Chitra Banerjee Divakaruni',
    titleBn: '"অ্যান আনকমন লাভ: সুধা ও নারায়ণ মূর্তির প্রারম্ভিক জীবন" (চিত্রা বন্দ্যোপাধ্যায় দিবাকরুনী)',
    summary: 'Biographical account tracing the courtship, struggles, and early founding years of Infosys by Sudha and Narayana Murthy.',
    summaryBn: 'ইনফোসিসের প্রতিষ্ঠাতা নারায়ণ মূর্তি ও সুধা মূর্তির প্রারম্ভিক জীবনের ওপর রচিত জনপ্রিয় জীবনীগ্রন্থ।',
    keyPoints: [
      'Authored by bestselling Indian-American novelist Chitra Banerjee Divakaruni (The Palace of Illusions).',
      'Sudha Murty later nominated to Rajya Sabha by the President of India in March 2024.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Chitra Banerjee Divakaruni Literary Works',
      points: [
        'Famous Novels: The Palace of Illusions (Mahabharata from Draupadi\'s perspective), The Forest of Enchantments (Ramayana from Sita\'s perspective), The Mistress of Spices.'
      ]
    },
    examRelevance: 'WBCS GS Paper IV & WBPSC Miscellaneous.'
  },

  // 11. SPORTS, TOURNAMENTS & ATHLETIC RECORDS (12 Events)
  {
    id: 'sport-01-australian-open-singles',
    day: 27,
    dateStr: '18 Jan – 01 Feb',
    category: 'sports',
    categoryLabel: '⚽ Grand Slam Tennis',
    title: 'Australian Open 2026: Carlos Alcaraz & Elena Rybakina Crowned Singles Champions',
    titleBn: 'অস্ট্রেলিয়ান ওপেন ২০২৬: কার্লোস আলকারাজ ও এলেনা রিবাকিনা চ্যাম্পিয়ন',
    summary: '114th Australian Open concluded at Melbourne Park. Spain\'s Carlos Alcaraz defeated Novak Djokovic; Elena Rybakina won Women\'s Singles.',
    summaryBn: 'মেলবোর্নে পুরুষদের সিঙ্গলসে কার্লোস আলকারাজ এবং মহিলাদের সিঙ্গলসে এলেনা রিবাকিনা ট্রফি জিতলেন।',
    keyPoints: [
      'Carlos Alcaraz (Spain) completed his Surface Grand Slam (Hard, Clay, Grass) at age 22.',
      'Elena Rybakina (Kazakhstan) defeated Aryna Sabalenka in straight sets in the final.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Grand Slam Tennis Calendar & Surfaces',
      points: [
        'Chronological Order: 1. Australian Open (Hard, 1905) -> 2. French Open (Clay, 1891) -> 3. Wimbledon (Grass, 1877) -> 4. US Open (Hard, 1881).',
        'Most Grand Slam Singles: Novak Djokovic (24), Rafael Nadal (22), Roger Federer (20).'
      ]
    },
    examRelevance: 'WBCS Prelims, WBP SI, WBPSC Food SI.'
  },
  {
    id: 'sport-02-bopanna-world-no1',
    day: 24,
    dateStr: '24 January',
    category: 'sports',
    categoryLabel: '⚽ Tennis Milestones',
    title: 'Rohan Bopanna Becomes Oldest World No. 1 in ATP Doubles at Age 43 (Wins Australian Open)',
    titleBn: '৪৩ বছর বয়সে বিশ্বরেকর্ড গড়ে ডাবলসে বিশ্বসেরা ১ নম্বর রোহন বোপান্না',
    summary: 'India\'s Rohan Bopanna paired with Australia\'s Matthew Ebden to win the Australian Open Men\'s Doubles title and claim World #1 ranking.',
    summaryBn: 'অস্ট্রেলিয়ান ওপেনে চ্যাম্পিয়ন হয়ে এটিপি ডাবলসে বিশ্বের সবচেয়ে বয়স্ক ১ নম্বর খেলোয়াড় হলেন রোহন বোপান্না।',
    keyPoints: [
      'Defeated Italian duo Simone Bolelli & Andrea Vavassori in straight sets in the final.',
      'Broke the record of USA\'s Mike Bryan who became #1 at age 41 in 2019.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Indian Grand Slam Legends',
      points: [
        '1st Indian to win Grand Slam: Mahesh Bhupathi (1997 French Open Mixed Doubles).',
        'Leander Paes: 18 Grand Slam doubles titles + 1996 Atlanta Olympic Bronze medal in singles.',
        'Sania Mirza: 6 Grand Slam titles (3 Doubles + 3 Mixed Doubles).'
      ]
    },
    examRelevance: 'WBCS Sports, WBPSC Clerkship, SSC CGL.'
  },
  {
    id: 'sport-03-khelo-india-youth-6th',
    day: 18,
    dateStr: '19–31 January',
    category: 'sports',
    categoryLabel: '⚽ National Games',
    title: '6th Khelo India Youth Games Held Across 4 Cities in Tamil Nadu (Maharashtra Champions)',
    titleBn: 'তামিলনাড়ুতে ৬ষ্ঠ খেলো ইন্ডিয়া যুব গেমস অনুষ্ঠিত (মহারাষ্ট্র চ্যাম্পিয়ন)',
    summary: 'Hosted across Chennai, Madurai, Trichy, and Coimbatore with over 5,600 athletes competing in 26 disciplines.',
    summaryBn: 'তামিলনাড়ুতে অনুষ্ঠিত যুব গেমসে ১৫৮টি পদক নিয়ে মহারাষ্ট্র পদকতালিকায় শীর্ষস্থান অধিকার করল।',
    keyPoints: [
      'Official Mascot: "Veera Mangai" Velu Nachiyar (Sivagangai queen who fought British).',
      'Demonstration Sport: "Silambam" (traditional martial art of Tamil Nadu).',
      'Medal Tally: 1. Maharashtra (158 medals, 57 Gold), 2. Tamil Nadu, 3. Haryana.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Khelo India & Indigenous Martial Arts',
      points: [
        'Khelo India Programme: Introduced 2017–18 by Ministry of Youth Affairs and Sports.',
        'Indigenous Martial Arts: Kalaripayattu (Kerala), Mallakhamb (Maharashtra/MP), Thang-Ta (Manipur), Gatka (Punjab), Silambam (Tamil Nadu).'
      ]
    },
    examRelevance: 'WBP Constable, SI, WBPSC Clerkship.'
  },
  {
    id: 'sport-04-tata-steel-chess-88',
    day: 28,
    dateStr: 'January',
    category: 'sports',
    categoryLabel: '⚽ Chess Championships',
    title: '88th Tata Steel Chess Tournament: GM Nodirbek Abdusattorov Wins Masters Title',
    titleBn: 'টাটা স্টিল চেস ২০২৬: নোদিরবেক আব্দুসাত্তোরভ মাস্টার্স শিরোপা জয়ী',
    summary: 'Uzbekistan\'s Grandmaster Nodirbek Abdusattorov won the prestigious Masters title in Wijk aan Zee, Netherlands.',
    summaryBn: 'দাবার উইম্বলডন খ্যাত ৮৮তম টাটা স্টিল দাবা প্রতিযোগিতায় উজবেকিস্তানের গ্র্যান্ডমাস্টার চ্যাম্পিয়ন হয়েছেন।',
    keyPoints: [
      'Scored 9.0/13 points finishing clear first ahead of international super-GMs.',
      'Challengers winner: Andy Woodward (USA).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: FIDE & Chess History',
      points: [
        'Origin of Chess: Originated in ancient India during Gupta Empire as "Chaturanga".',
        'FIDE: Founded 20 July 1924 (Paris) | HQ: Lausanne, Switzerland.',
        '1st Indian GM: Viswanathan Anand (1988, 5-time World Champion; 1st Khel Ratna awardee).'
      ]
    },
    examRelevance: 'WBPSC Miscellaneous & SSC.'
  },
  {
    id: 'sport-05-rohit-sharma-5-centuries',
    day: 16,
    dateStr: '16 January',
    category: 'sports',
    categoryLabel: '⚽ Cricket Records',
    title: 'Rohit Sharma Becomes First Batter to Score 5 T20I Centuries (vs Afghanistan)',
    titleBn: 'রোহিত শর্মা আন্তর্জাতিক টি-টোয়েন্টি ক্রিকেটে প্রথম ব্যাটার হিসেবে ৫টি শতরানের রেকর্ড গড়লেন',
    summary: 'Indian captain Rohit Sharma scored 121* off 69 balls in Bengaluru, becoming the first player in world cricket with 5 T20I hundreds.',
    summaryBn: 'আফগানিস্তানের বিরুদ্ধে বেঙ্গালুরুতে দুটি সুপার ওভারের রোমাঞ্চকর ম্যাচে রোহিত ৫টি টি-টোয়েন্টি শতরানের বিশ্বরেকর্ড গড়েন।',
    keyPoints: [
      'First international match requiring two Super Overs to decide the outcome.',
      'Surpassed Suryakumar Yadav and Glenn Maxwell (4 centuries each).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: T20 International Records',
      points: [
        'Highest Individual Score in T20Is: Aaron Finch (172 off 76 balls vs Zimbabwe, 2018).',
        'Highest Team Total in T20Is: Nepal (314/3 vs Mongolia in Asian Games 2023).'
      ]
    },
    examRelevance: 'WBP Constable, Food SI, SSC.'
  },
  {
    id: 'sport-06-shortest-test-match',
    day: 4,
    dateStr: '04 January',
    category: 'sports',
    categoryLabel: '⚽ Cricket Records',
    title: 'India and South Africa Play Shortest Test Match in History (642 Balls, Cape Town)',
    titleBn: 'ভারত ও দক্ষিণ আফ্রিকার মধ্যে টেস্ট ইতিহাসের সবচেয়ে সংক্ষিপ্ততম টেস্ট ম্যাচ (কেপ টাউন)',
    summary: '2nd Test at Newlands, Cape Town concluded in just 642 balls (107 overs / 2 days) with India winning by 7 wickets.',
    summaryBn: 'কেপ টাউনে মাত্র ৬৪২ বলের মধ্যে ম্যাচ শেষ করে ভারত ৭ উইকেটে জয়লাভ করে ইতিহাস গড়ে।',
    keyPoints: [
      'Broke 92-year-old record of Australia vs South Africa (656 balls at Melbourne in 1932).',
      'Mohammed Siraj awarded Player of the Match for his 6/15 in 1st innings.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Test Cricket History',
      points: [
        '1st Official Test Match: March 1877 (England vs Australia at MCG).',
        'India\'s 1st Test: June 1932 (vs England at Lord\'s under C.K. Nayudu).',
        'India\'s 1st Test Win: February 1952 (vs England at Madras under Vijay Hazare).'
      ]
    },
    examRelevance: 'WBP SI, Kolkata Police, SSC CGL.'
  },
  {
    id: 'sport-07-beach-games-diu',
    day: 11,
    dateStr: '04–11 January',
    category: 'sports',
    categoryLabel: '⚽ Multi-Sport Events',
    title: 'Madhya Pradesh Crowned Overall Champions at 1st Beach Games Held in Diu',
    titleBn: 'দিউয়ের ঘোঘলা বিচে অনুষ্ঠিত প্রথম বিচ গেমসে মধ্যপ্রদেশ সামগ্রিক চ্যাম্পিয়ন',
    summary: 'India\'s first multi-sport Beach Games 2024 held at blue-flag certified Ghoghla Beach in Union Territory of Dadra & Nagar Haveli and Daman & Diu.',
    summaryBn: 'ভারতের প্রথম জাতীয় বিচ গেমসে ১৮টি পদক জিতে শীর্ষস্থান পেল মধ্যপ্রদেশ।',
    keyPoints: [
      'Over 1,400 athletes from 28 States and UTs competed across 8 sports (Beach Soccer, Beach Volleyball, Pencak Silat, Tug of War, etc.).',
      'Madhya Pradesh won 18 medals (7 Gold) to top the medal tally; Maharashtra finished second.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Blue Flag Beaches of India',
      points: [
        'Blue Flag Certification: Eco-label awarded by Foundation for Environmental Education (FEE, Denmark).',
        '12 Blue Flag Beaches in India: Ghoghla (Diu), Shivrajpur (Gujarat), Kasarkod & Padubidri (Karnataka), Kappad (Kerala), Rushikonda (AP), Golden Beach (Puri, Odisha), Radhanagar (Andaman), Eden (Puducherry), Kovalam (TN), Minicoy Thundi & Kadmat (Lakshadweep).'
      ]
    },
    examRelevance: 'WBCS Geography & Sports.'
  },
  {
    id: 'sport-08-fih-hockey-qualifiers',
    day: 19,
    dateStr: '13–19 January',
    category: 'sports',
    categoryLabel: '⚽ International Hockey',
    title: 'FIH Women\'s Hockey Olympic Qualifiers Held at Marang Gomke Jaipal Singh Stadium, Ranchi',
    titleBn: 'রাঁচির মারাং গোমকে জয়পাল সিং স্টেডিয়ামে এফআইএইচ মহিলা হকি অলিম্পিক কোয়ালিফায়ার',
    summary: 'Germany, USA, and Japan qualified for Paris 2024 Olympic Games from the Ranchi Olympic qualifying tournament.',
    summaryBn: 'ঝাড়খণ্ডের রাঁচিতে অনুষ্ঠিত অলিম্পিক হকি বাছাইপর্বে জার্মানি চ্যাম্পিয়ন হলো।',
    keyPoints: [
      'Germany defeated USA in the final to win the tournament.',
      'India narrowly missed Olympic qualification after losing the 3rd-place match to Japan (0–1).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Jaipal Singh Munda & Olympic Hockey',
      points: [
        'Jaipal Singh Munda: Captain of Indian Hockey Team that won India\'s 1st Olympic Gold medal at 1928 Amsterdam Olympics; later prominent Adivasi leader and Constituent Assembly member.',
        'Indian Men\'s Hockey: Won 8 Olympic Gold medals (1928, 1932, 1936, 1948, 1952, 1956, 1964, 1980).'
      ]
    },
    examRelevance: 'WBCS Sports, History & WBP SI.'
  },
  {
    id: 'sport-09-anahat-singh-squash',
    day: 2,
    dateStr: '02 January',
    category: 'sports',
    categoryLabel: '⚽ Squash Milestones',
    title: '15-Year-Old Anahat Singh Clinches Girls\' U-19 Scottish Junior Open Squash Title',
    titleBn: 'স্কটিশ জুনিয়র ওপেন স্কোয়াশে অনূর্ধ্ব-১৯ বালিকা বিভাগে চ্যাম্পিয়ন অনাহত সিং',
    summary: 'Indian squash prodigy Anahat Singh defeated Robyn McAlpine in Edinburgh to win the Girls\' Under-19 Scottish Junior Open crown.',
    summaryBn: 'এডিনবার্গে ভারতীয় তরুণ স্কোয়াশ তারকা অনাহত সিং স্কটিশ জুনিয়র ওপেন ট্রফি জয় করলেন।',
    keyPoints: [
      'Youngest Indian athlete at Birmingham Commonwealth Games 2022 at age 14.',
      'Won two Bronze medals at Hangzhou Asian Games 2023 in Women\'s Team and Mixed Doubles.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Squash in India & Asian Games',
      points: [
        'Prominent Indian Squash Players: Saurav Ghosal (Kolkata), Dipika Pallikal Karthik, Joshna Chinappa, Mahesh Mangaonkar.',
        'Saurav Ghosal: Won India\'s 1st individual Asian Games squash medal (Bronze at Doha 2006).'
      ]
    },
    examRelevance: 'WBCS Sports, WBPSC Miscellaneous.'
  },
  {
    id: 'sport-10-malaysia-open-badminton',
    day: 14,
    dateStr: '09–14 January',
    category: 'sports',
    categoryLabel: '⚽ BWF Badminton',
    title: 'Satwiksairaj Rankireddy and Chirag Shetty Finish Runners-Up at Malaysia Open Super 1000',
    titleBn: 'মালয়েশিয়া ওপেন সুপার ১০০০ ব্যাডমিন্টনে রানার্স-আপ সাত্বিক-চিরাগ জুটি',
    summary: 'Satwik and Chirag finished runners-up in Kuala Lumpur after a thrilling 3-set final against world #1 Liang Wei Keng and Wang Chang of China.',
    summaryBn: 'কুয়ালালামপুরে মালয়েশিয়া ওপেনের ফাইনালে হাড্ডাহাড্ডি লড়াইয়ে রৌপ্য পদক জিতলেন সাত্বিক ও চিরাগ।',
    keyPoints: [
      'First BWF World Tour Super 1000 event of the 2024 international calendar.',
      'Men\'s Singles title won by Anders Antonsen (Denmark); Women\'s Singles by An Se-young (South Korea).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: BWF Tournament Hierarchy & Scoring',
      points: [
        'BWF World Tour Structure: World Tour Finals -> Super 1000 (All England, China Open, Indonesia Open, Malaysia Open) -> Super 750 -> Super 500 -> Super 300.',
        'BWF HQ: Kuala Lumpur, Malaysia (formed 1934).'
      ]
    },
    examRelevance: 'WBPSC Miscellaneous & SSC.'
  },
  {
    id: 'sport-11-u19-cricket-world-cup',
    day: 19,
    dateStr: '19 January',
    category: 'sports',
    categoryLabel: '⚽ Junior Cricket',
    title: '15th ICC Under-19 Men\'s Cricket World Cup Kicks Off in South Africa',
    titleBn: 'দক্ষিণ আফ্রিকায় ১৫তম আইসিসি অনূর্ধ্ব-১৯ পুরুষ ক্রিকেট বিশ্বকাপ শুরু',
    summary: '16-nation youth cricket tournament commenced in South Africa with Uday Saharan captaining the Indian Under-19 team.',
    summaryBn: 'দক্ষিণ আফ্রিকার ৫টি ভেন্যুতে অনূর্ধ্ব-১৯ বিশ্বকাপ শুরু হলো। ভারতের অধিনায়ক উদয় সাহারান।',
    keyPoints: [
      'India is the most successful team in tournament history (5 titles: 2000, 2008, 2012, 2018, 2022).',
      'Tournament shifted to South Africa from Sri Lanka following ICC suspension of Sri Lanka Cricket board.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: India U-19 World Cup Winning Captains',
      points: [
        '2000: Mohammad Kaif | 2008: Virat Kohli | 2012: Unmukt Chand | 2018: Prithvi Shaw | 2022: Yash Dhull.'
      ]
    },
    examRelevance: 'WBP Constable, SI, SSC.'
  },
  {
    id: 'sport-12-afc-asian-cup-qatar',
    day: 12,
    dateStr: '12 January',
    category: 'sports',
    categoryLabel: '⚽ International Football',
    title: '18th AFC Asian Cup Commences at Lusail Stadium, Qatar',
    titleBn: 'কাতারের লুসাইল স্টেডিয়ামে ১৮তম এএফসি এশিয়ান কাপ ফুটবল প্রতিযোগিতা শুরু',
    summary: 'Asia\'s premier international football championship kicked off in Qatar with 24 national teams including Sunil Chhetri-led India.',
    summaryBn: 'কাতারে এশিয়ান কাপ ফুটবল শুরু হলো। সুনীল ছেত্রীর নেতৃত্বে ভারত অংশগ্রহণ করে।',
    keyPoints: [
      'Opening match played at Lusail Iconic Stadium (venue of 2022 FIFA World Cup final).',
      'Official Mascot: "Sabooq" and the Jerboa family (mascots from 2011 Asian Cup).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: AFC & Indian Football History',
      points: [
        'Asian Football Confederation (AFC): Founded 8 May 1954 in Manila | HQ: Kuala Lumpur, Malaysia.',
        'India in Asian Cup: Best finish was Runners-up in 1964 in Israel.',
        'Sunil Chhetri: 4th highest international goal-scorer of all time in world football history (after Ronaldo, Ali Daei, Messi).'
      ]
    },
    examRelevance: 'WBCS Sports & Football GK, WBP SI.'
  },

  // 12. ENVIRONMENT, WILDLIFE & HEALTH (8 Events)
  {
    id: 'env-01-5-new-ramsar-sites',
    day: 31,
    dateStr: '31 January',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Ramsar Wetlands',
    title: 'India Adds 5 New Ramsar Wetland Sites, Taking National Tally to 80 Sites',
    titleBn: 'ভারতে আরও ৫টি নতুন রামসার জলাভূমি অন্তর্ভুক্ত: মোট সংখ্যা বেড়ে দাঁড়াল ৮০',
    summary: 'On World Wetlands Day eve, India designated 5 new wetlands to Ramsar List (3 in Karnataka, 2 in Tamil Nadu).',
    summaryBn: 'কর্ণাটকের ৩টি এবং তামিলনাড়ুর ২টি নতুন জলাভূমিকে রামসার তকমা দেওয়া হলো।',
    keyPoints: [
      'Karnataka: Magadi Kere Conservation Reserve, Ankasamudra Bird Conservation Reserve, Aghanashini Estuary.',
      'Tamil Nadu: Karaivetti Bird Sanctuary, Longwood Shola Reserve Forest.',
      'Tamil Nadu leads India with 16 Ramsar sites, followed by Uttar Pradesh (10).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Ramsar Convention on Wetlands (1971)',
      points: [
        'Signed: 2 February 1971 in Ramsar, Iran (World Wetlands Day: 2 Feb).',
        'India joined: 1 Feb 1982 | 1st Sites (1981): Chilika Lake & Keoladeo NP.',
        'Largest Ramsar Site in India: Sundarban Wetland (West Bengal, 4,230 sq km, designated 2019).',
        'Ramsar Sites in West Bengal (2): 1. East Kolkata Wetlands (2002) & 2. Sundarban (2019).'
      ]
    },
    examRelevance: 'Top priority for WBCS Geography, Environment & Police Exams.'
  },
  {
    id: 'env-02-pench-dark-sky',
    day: 13,
    dateStr: '13 January',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Wildlife & Astronomy',
    title: 'Pench Tiger Reserve Designated as India\'s 1st International Dark Sky Park',
    titleBn: 'পেঞ্চ ব্যাঘ্র প্রকল্প ভারতের প্রথম আন্তর্জাতিক "ডার্ক স্কাই পার্ক" হিসেবে ঘোষিত',
    summary: 'Pench Tiger Reserve (Maharashtra) certified as India\'s 1st and Asia\'s 5th International Dark Sky Park by IDA.',
    summaryBn: 'নৈশ আকাশ ও নক্ষত্র পর্যটন সুরক্ষায় পেঞ্চ টাইগার রিজার্ভ এশিয়ার ৫ম ডার্ক স্কাই পার্ক হলো।',
    keyPoints: [
      'Protects nocturnal ecosystem from artificial light pollution and promotes astro-tourism.',
      'Rudyard Kipling\'s The Jungle Book was inspired by the forests of Pench.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Project Tiger & Tiger Census',
      points: [
        'Project Tiger: Launched 1 April 1973 (Jim Corbett NP, Uttarakhand).',
        'Tiger Population in India: ~3,682 tigers (75% of world total) as per 2022 Census.',
        'Tiger Reserves in West Bengal (2): Sundarban TR and Buxa TR.'
      ]
    },
    examRelevance: 'WBCS Geography & Environment, WBP SI.'
  },
  {
    id: 'env-03-cabo-verde-malaria-free',
    day: 20,
    dateStr: '20 January',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Global Public Health',
    title: 'WHO Certifies Cabo Verde (Cape Verde) as Malaria-Free (3rd African Nation)',
    titleBn: 'বিশ্ব স্বাস্থ্য সংস্থা কর্তৃক কাবো ভার্দেকে ম্যালেরিয়া-মুক্ত ঘোষণা',
    summary: 'WHO certified Atlantic archipelago nation of Cabo Verde as malaria-free, interrupting transmission for 3+ years.',
    summaryBn: 'আফ্রিকা মহাদেশে মরিশাস ও আলজেরিয়ার পর কাবো ভার্দে ম্যালেরিয়ামুক্ত স্বীকৃতি পেল।',
    keyPoints: [
      '3rd African country certified after Mauritius (1973) and Algeria (2019).',
      'Total 43 countries and 1 territory certified malaria-free globally.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Malaria Parasitology & Ronald Ross in Kolkata',
      points: [
        'Cabo Verde Capital: Praia | Currency: Escudo (CVE).',
        'Sir Ronald Ross Discovery: 20 August 1897 at SSKM Hospital, Kolkata, proved mosquito transmission of malaria (Nobel Prize 1902).',
        'Causative Parasite: Plasmodium | Vector: Female Anopheles mosquito.'
      ]
    },
    examRelevance: 'WBCS Biology & General Science.'
  },
  {
    id: 'env-04-punganur-dwarf-cow',
    day: 8,
    dateStr: '08 January',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Animal Husbandry',
    title: 'Endangered Punganur Dwarf Cow Breed of Andhra Pradesh in Conservation Spotlight',
    titleBn: 'অন্ধ্রপ্রদেশের ক্ষুদ্রতম দেশীয় গবাদি পশুর প্রজাতি "পুঙ্গানুর গরু" আলোচনায়',
    summary: 'World\'s shortest humped cattle breed originating from Chittoor, Andhra Pradesh featured in national breeding efforts.',
    summaryBn: 'অন্ধ্রপ্রদেশের চিত্তুর জেলার পুঙ্গানুর জাতের বামন গরু জাতীয় স্তরে সংরক্ষণের জন্য বিশেষ গুরুত্ব পায়।',
    keyPoints: [
      'Height ranges between 70–90 cm; milk contains 8% fat with A2 beta-casein protein.',
      'Conserved under National Punganur Cattle Breeding Centre under Rashtriya Gokul Mission.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Indigenous Cattle Breeds & NBAGR',
      points: [
        'ICAR-NBAGR: Located in Karnal, Haryana (registers livestock breeds).',
        'Indigenous Cattle Breeds: Gir, Sahiwal, Kankrej, Red Sindhi, Ongole, Hallikar.'
      ]
    },
    examRelevance: 'WBCS Biology, WBPSC Food SI.'
  },
  {
    id: 'env-05-wetland-cities-nomination',
    day: 10,
    dateStr: '10 January',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Urban Wetlands',
    title: 'MoEFCC Nominates 3 Indian Cities (Indore, Bhopal, Udaipur) for Wetland City Accreditation',
    titleBn: 'ভারতের ৩টি শহর (ইন্দোর, ভোপাল, উদয়পুর) রামসার ওয়েটল্যান্ড সিটি স্বীকৃতির জন্য মনোনীত',
    summary: 'Ministry of Environment nominated Indore, Bhopal (MP), and Udaipur (Rajasthan) for Wetland City Accreditation (WCA) under Ramsar Convention.',
    summaryBn: 'ভারতের প্রথম শহর হিসেবে রামসার ওয়েটল্যান্ড সিটির তালিকায় ৩টি শহরকে পাঠানো হয়েছে।',
    keyPoints: [
      'Sirpur Lake & Yashwant Sagar in Indore, Bhoj Wetland in Bhopal, and 5 iconic lakes in Udaipur (Pichola, Fateh Sagar, Rang Sagar, Swaroop Sagar, Doodh Talai).',
      'Recognizes urban cities safeguarding municipal lake ecosystems.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Bhoj Wetland & Lakes of Udaipur',
      points: [
        'Bhoj Wetland (Bhopal): Designated Ramsar site in 2002 (Bada Talab built by Raja Bhoj of Paramara Dynasty in 11th century).',
        'Lake Pichola (Udaipur): Built in 1362 AD by a Banjara tribesman during Maharana Lakha\'s reign.'
      ]
    },
    examRelevance: 'WBCS Geography & Environment.'
  },
  {
    id: 'env-06-golden-tiger-kaziranga',
    day: 21,
    dateStr: '21 January',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Rare Wildlife',
    title: 'Rare "Golden Tabby Tiger" (Kazi 106F) Photographed in Kaziranga National Park, Assam',
    titleBn: 'আসামের কাজিরাঙ্গা জাতীয় উদ্যানে বিরল প্রজাতির "গোল্ডেন টাইগার" প্রত্যক্ষ',
    summary: 'Wildlife photographers captured images of a rare golden tabby tiger (female morph named Kazi 106F) in Kaziranga.',
    summaryBn: 'কাজিরাঙ্গায় জিনগত বৈশিষ্ট্যের কারণে সোনালী রঙের বিরল বাঘের ছবি ধরা পড়ল।',
    keyPoints: [
      'Golden color caused by a rare recessive gene mutation (wideband gene) affecting melanin production.',
      'Kaziranga has world\'s highest density of Royal Bengal Tigers in protected habitats.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Kaziranga National Park (Assam)',
      points: [
        'UNESCO World Heritage Site: Inscribed 1985 | Declared Tiger Reserve in 2006.',
        'Fauna: Home to world\'s largest population of Great One-horned Rhinoceros (Rhinoceros unicornis), wild water buffalo, and swamp deer.'
      ]
    },
    examRelevance: 'WBCS Environment, WB Police SI.'
  },
  {
    id: 'env-07-asian-waterbird-census',
    day: 15,
    dateStr: 'January',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Avian Surveys',
    title: 'Asian Waterbird Census (AWC) Conducted Across Chilika Lake and Sundarbans',
    titleBn: 'চিল্কা হ্রদ ও সুন্দরবনে এশিয়ান ওয়াটারবার্ড সেন্সাস সম্পন্ন',
    summary: 'Annual citizen-science waterbird count conducted by Wetlands International and Bombay Natural History Society (BNHS).',
    summaryBn: 'পরিযায়ী পাখিদের সংখ্যা ও স্বাস্থ্য নির্ণয়ে সুন্দরবন ও চিল্কায় বার্ষিক গণনা সম্পন্ন হলো।',
    keyPoints: [
      'Over 11 lakh migratory birds recorded in Chilika Lake across Nalabana Bird Sanctuary.',
      'Recorded northern pintails, bar-headed geese, godwits, and Eurasian wigeons from Siberia and Central Asia.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Central Asian Flyway (CAF) & BNHS',
      points: [
        'Central Asian Flyway (CAF): Covers 30 countries from Arctic Ocean to Indian Ocean used by 279 migratory waterbird populations.',
        'BNHS (Bombay Natural History Society): Premier NGO formed 1883 | HQ: Hornbill House, Mumbai.'
      ]
    },
    examRelevance: 'WBCS Environment & Ecology.'
  },
  {
    id: 'env-08-steel-slag-road-nh66',
    day: 14,
    dateStr: '14 January',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Circular Economy',
    title: 'India\'s 1st National Highway Steel Slag Road Section Inaugurated on NH-66 (Mumbai-Goa)',
    titleBn: 'মুম্বাই-গোয়া জাতীয় মহাসড়কে (NH-66) ভারতের প্রথম স্টিল স্ল্যাগ রোডের উদ্বোধন',
    summary: 'CSIR-Central Road Research Institute (CRRI) constructed a 1 km 4-lane stretch using 100% processed steel manufacturing slag.',
    summaryBn: 'ইস্পাত কারখানার বর্জ্য দিয়ে টেকসই জাতীয় সড়ক নির্মাণের যুগান্তকারী প্রযুক্তি প্রদর্শিত হলো।',
    keyPoints: [
      'Eliminates need for natural stone aggregates, reducing road construction costs by 30%.',
      'Higher durability against heavy monsoons compared to traditional bitumen-aggregate roads.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: CSIR-CRRI & Steel Slag Technology',
      points: [
        'CSIR-CRRI (Central Road Research Institute): Established 1952 in New Delhi.',
        'India\'s 1st Steel Slag Road (City): Built in Hazira, Surat, Gujarat in 2022.'
      ]
    },
    examRelevance: 'WBCS Science & Infrastructure.'
  },

  // 13. CHRONOLOGICAL IMPORTANT DAYS & OFFICIAL THEMES (10 Events)
  {
    id: 'day-01-drdo-family-day',
    day: 1,
    dateStr: '01 January',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'Global Family Day & 66th Foundation Day of DRDO',
    titleBn: 'বিশ্ব পরিবার দিবস ও ডিআরডিও-র ৬৬তম প্রতিষ্ঠা দিবস',
    summary: 'Observed to promote peace, family bonding, and self-reliance in defense technology.',
    summaryBn: 'বিশ্বজুড়ে পরিবার দিবস এবং ভারতে ডিআরডিও-র প্রতিষ্ঠা দিবস পালিত হয়।',
    keyPoints: [
      'DRDO formed on 1 Jan 1958 under Ministry of Defence.',
      'Theme of Global Family Day emphasizes international solidarity.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: DRDO Foundation',
      points: ['DRDO Chairman: Dr. Samir V. Kamat | HQ: New Delhi.']
    },
    examRelevance: 'WBPSC Food SI, Clerkship.'
  },
  {
    id: 'day-04-world-braille-day',
    day: 4,
    dateStr: '04 January',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'World Braille Day Observed on Louis Braille\'s Birth Anniversary',
    titleBn: 'বিশ্ব ব্রেইল দিবস: লুই ব্রেইলের জন্মবার্ষিকী উদযাপন',
    summary: 'Commemorates Louis Braille (born 1809, France) who invented the 6-dot tactile reading and writing code.',
    summaryBn: 'দৃষ্টিহীনদের স্পর্শভিত্তিক বর্ণমালার আবিষ্কারক লুই ব্রেইলের স্মরণে এই দিবস পালিত হয়।',
    keyPoints: [
      'Designated by UNGA in 2018; promotes inclusion under UN CRPD.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: RPwD Act 2016',
      points: ['Recognizes 21 disabilities; 4% reservation in government jobs.']
    },
    examRelevance: 'Primary TET, WBCS.'
  },
  {
    id: 'day-09-pravasi-bharatiya-divas',
    day: 9,
    dateStr: '09 January',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'Pravasi Bharatiya Divas (Non-Resident Indian Day)',
    titleBn: 'প্রবাসী ভারতীয় দিবস (এনআরআই দিবস)',
    summary: 'Commemorates Mahatma Gandhi\'s return from South Africa to Mumbai on 9 January 1915 aboard SS Arabia.',
    summaryBn: '১৯১৫ সালের ৯ জানুয়ারি মহাত্মা গান্ধীর স্বদেশ প্রত্যাবর্তনের স্মরণে এই দিবস পালিত হয়।',
    keyPoints: [
      'Instituted in 2003 by Atal Bihari Vajpayee Government on recommendation of L.M. Singhvi Committee.',
      'Celebrated biennially with Pravasi Bharatiya Samman awards.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Mahatma Gandhi in South Africa',
      points: [
        'Stayed in South Africa: 1893–1915 (21 years).',
        'Founded Natal Indian Congress (1894) and Tolstoy Farm (1910).'
      ]
    },
    examRelevance: 'WBCS Modern History & Polity.'
  },
  {
    id: 'day-10-world-hindi-day',
    day: 10,
    dateStr: '10 January',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'World Hindi Day (Vishwa Hindi Diwas) Observed Globally',
    titleBn: 'বিশ্ব হিন্দি দিবস উদযাপন',
    summary: 'Commemorates the 1st World Hindi Conference held in Nagpur on 10 January 1975 under Indira Gandhi.',
    summaryBn: '১৯৭৫ সালের ১০ জানুয়ারি নাগপুরে প্রথম বিশ্ব হিন্দি সম্মেলনের স্মরণে এই দিবস পালিত হয়।',
    keyPoints: [
      'Celebrated globally by Indian embassies since 2006 (declared by Manmohan Singh).',
      'Note: National Hindi Diwas is observed on 14 September (Constituent Assembly adopted Hindi as official language in 1949).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Constitutional Status of Hindi (Part XVII)',
      points: [
        'Article 343(1): Official language of the Union shall be Hindi in Devanagari script.',
        'Article 351: Directive for development and promotion of Hindi language.',
        '8th Schedule: Lists 22 official scheduled languages.'
      ]
    },
    examRelevance: 'WBCS Polity, SSC CGL.'
  },
  {
    id: 'day-12-national-youth-day',
    day: 12,
    dateStr: '12 January',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'National Youth Day (Rashtriya Yuva Diwas) on Swami Vivekananda\'s Birthday',
    titleBn: 'জাতীয় যুব দিবস: স্বামী বিবেকানন্দের জন্মজয়ন্তী উদযাপন',
    summary: 'Celebrates the birth anniversary of Swami Vivekananda (born 12 January 1863 in Kolkata).',
    summaryBn: 'স্বামী বিবেকানন্দের জন্মদিবসটিকে ১৯৮৪ সাল থেকে জাতীয় যুব দিবস হিসেবে পালন করা হয়।',
    keyPoints: [
      '27th National Youth Festival held in Nashik, Maharashtra (Theme: "MY Bharat-Viksit Bharat@2047").',
      'Declared by Government of India in 1984.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Swami Vivekananda (1863–1902) Milestones',
      points: [
        'Chicago Parliament of Religions: Addressed on 11 September 1893 ("Sisters and Brothers of America").',
        'Founded: Ramakrishna Mission (1 May 1897) & Belur Math (1899) on banks of Hooghly River, Howrah.',
        'Famous Books: Karma Yoga, Jnana Yoga, Bhakti Yoga, Raja Yoga.'
      ]
    },
    examRelevance: 'WBCS Modern Bengal History, All Police Exams.'
  },
  {
    id: 'day-15-indian-army-day',
    day: 15,
    dateStr: '15 January',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: '78th / 76th Indian Army Day Celebrated in Lucknow',
    titleBn: '৭৮তম ভারতীয় সেনা দিবস উদযাপন',
    summary: 'Commemorates Field Marshal K.M. Cariappa taking over as 1st Indian Commander-in-Chief from Gen Sir Francis Roy Butcher in 1949.',
    summaryBn: '১৯৪৯ সালে প্রথম ভারতীয় সেনাপ্রধান হিসেবে দায়িত্বভার গ্রহণের স্মরণে সেনা দিবস পালিত হয়।',
    keyPoints: ['Annual central parade held outside Delhi in Lucknow, UP.'],
    staticGk: {
      title: '🏛️ STATIC GK: Indian Army Structure',
      points: [
        'Field Marshal: Highest 5-star rank (conferred only on Sam Manekshaw and K.M. Cariappa).',
        'Indian Army HQ: New Delhi.'
      ]
    },
    examRelevance: 'WBP SI, Constable.'
  },
  {
    id: 'day-16-national-startup-day',
    day: 16,
    dateStr: '16 January',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'National Startup Day Celebrated Across India',
    titleBn: 'জাতীয় স্টার্টআপ দিবস পালন',
    summary: 'Marks the launch of Startup India initiative on 16 January 2016 by DPIIT.',
    summaryBn: 'ভারতে স্টার্টআপ সংস্কৃতির প্রসারে এই দিবস পালিত হয়।',
    keyPoints: ['India is 3rd largest startup ecosystem globally with 115+ Unicorns.'],
    staticGk: {
      title: '🏛️ STATIC GK: Startup India & Unicorns',
      points: [
        'Unicorn Definition: Privately held startup company with valuation over $1 Billion.',
        'Administered by: DPIIT (Ministry of Commerce and Industry).'
      ]
    },
    examRelevance: 'WBCS Economy & Trade.'
  },
  {
    id: 'day-23-parakram-diwas',
    day: 23,
    dateStr: '23 January',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'Parakram Diwas Observed on Netaji Subhas Chandra Bose\'s Birth Anniversary',
    titleBn: 'পরাক্রম দিবস: নেতাজি সুভাষচন্দ্র বসুর জন্মজয়ন্তী পালন',
    summary: 'Celebrates birth anniversary of Netaji Subhas Chandra Bose (born 23 January 1897 in Cuttack, Odisha).',
    summaryBn: 'নেতাজি সুভাষচন্দ্র বসুর জন্মদিবস উপলক্ষে দেশজুড়ে পরাক্রম দিবস উদযাপিত হলো।',
    keyPoints: [
      'Subhas Chandra Bose Aapda Prabandhan Puraskar presented.',
      'Bharat Parv organized at Red Fort, New Delhi.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Netaji Subhas Chandra Bose Milestones',
      points: [
        'Congress Presidency: Haripura Session (1938) & Tripuri Session (1939 - resigned).',
        'Formed: Forward Bloc in May 1939 at Unnao, UP.',
        'INA (Azad Hind Fauj): Took leadership from Rash Behari Bose in Singapore in 1943; proclaimed Provisional Govt of Free India (Azad Hind) on 21 Oct 1943 in Singapore.',
        'Slogans: "Give me blood and I will give you freedom!", "Jai Hind", "Delhi Chalo".'
      ]
    },
    examRelevance: 'WBCS INM & Bengal History, All Police Exams.'
  },
  {
    id: 'day-24-girl-child-education',
    day: 24,
    dateStr: '24 January',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'National Girl Child Day & International Day of Education',
    titleBn: 'জাতীয় কন্যা শিশু দিবস ও আন্তর্জাতিক শিক্ষা দিবস',
    summary: 'Instituted by Ministry of Women and Child Development in 2008 to address female feticide and promote girls\' rights.',
    summaryBn: 'কন্যা শিশুদের অধিকার ও শিক্ষার সুরক্ষায় ২৪ জানুয়ারি এই দিবস পালিত হয়।',
    keyPoints: ['Also observed as the 75th Foundation Day of Uttar Pradesh (renamed UP on 24 Jan 1950).'],
    staticGk: {
      title: '🏛️ STATIC GK: Girl Child Welfare in India',
      points: [
        'PC-PNDT Act: Pre-Conception and Pre-Natal Diagnostic Techniques Act, 1994.',
        'Beti Bachao Beti Padhao: Launched 22 Jan 2015.'
      ]
    },
    examRelevance: 'Primary TET, WBCS.'
  },
  {
    id: 'day-25-national-voters-day',
    day: 25,
    dateStr: '25 January',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: '16th National Voters\' Day (ECI Foundation Day, Established 25 Jan 1950)',
    titleBn: '১৬তম জাতীয় ভোটার দিবস (নির্বাচন কমিশনের প্রতিষ্ঠা দিবস)',
    summary: 'Celebrated across India under theme "Nothing Like Voting, I Vote for Sure" to encourage youth democratic participation.',
    summaryBn: 'গণতান্ত্রিক ভোটাধিকারের গুরুত্ব প্রসারে জাতীয় ভোটার দিবস পালিত হয়।',
    keyPoints: [
      'Commemorates establishment of Election Commission of India on 25 January 1950.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Election Commission of India (ECI)',
      points: [
        'Part XV of Constitution (Articles 324 to 329).',
        '61st Amendment Act, 1988: Lowered voting age from 21 to 18 years (amended Article 326), effective 28 March 1989.',
        '1st CEC of India: Sukumar Sen.'
      ]
    },
    examRelevance: 'WBCS Indian Polity, WBPSC Clerkship.'
  },
  {
    id: 'day-30-martyrs-day',
    day: 30,
    dateStr: '30 January',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'Martyrs\' Day (Shaheed Diwas) Observed on Mahatma Gandhi\'s Death Anniversary',
    titleBn: 'শহিদ দিবস: মহাত্মা গান্ধীর প্রয়াণ দিবসে দেশজুড়ে শ্রদ্ধা নিবেদন',
    summary: 'Commemorates the martyrdom of Mahatma Gandhi who was assassinated on 30 January 1948 at Birla House, New Delhi.',
    summaryBn: '১৯৪৮ সালের ৩০ জানুয়ারি মহাত্মা গান্ধীর প্রয়াণ দিবসটিকে শহিদ দিবস হিসেবে পালন করা হয়।',
    keyPoints: [
      'Two minutes of silence observed across the nation at 11:00 AM.',
      'Also observed as World Neglected Tropical Diseases (NTD) Day.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Mahatma Gandhi\'s Historical Movements',
      points: [
        'Champaran Satyagraha (1917, 1st Civil Disobedience against Tinkathia system).',
        'Kheda Satyagraha (1918, 1st Non-Cooperation) & Ahmedabad Mill Strike (1918, 1st Hunger Strike).',
        'Dandi March (12 March – 6 April 1930) from Sabarmati to Dandi (240 miles).'
      ]
    },
    examRelevance: 'WBCS Modern History & INM.'
  }
];

const fileHeader = `export interface MagazineEvent {
  id: string;
  day: number;
  dateStr: string;
  category: 'wb' | 'national' | 'schemes' | 'international' | 'economy_banking' | 'defense_navy' | 'space_science' | 'appointments' | 'awards_persons' | 'books' | 'sports' | 'environment_wildlife' | 'days';
  categoryLabel: string;
  title: string;
  titleBn: string;
  summary: string;
  summaryBn: string;
  keyPoints: string[];
  staticGk: {
    title: string;
    points: string[];
  };
  examRelevance: string;
}

export const JANUARY_100_EVENTS: MagazineEvent[] = `;

const fileContent = fileHeader + JSON.stringify(events, null, 2) + ';\n';
fs.writeFileSync(path.resolve('src/data/januaryMegaCompendium.ts'), fileContent, 'utf-8');
console.log('Successfully written src/data/januaryMegaCompendium.ts with JSON serialization! Count:', events.length);
