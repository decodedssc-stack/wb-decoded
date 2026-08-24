import fs from 'fs';
import path from 'path';

const all124Events = [
  // =========================================================================
  // 1. WEST BENGAL & EAST INDIA SPECIAL (10 EVENTS)
  // =========================================================================
  {
    id: 'wb-2026-01-gangasagar',
    day: 14,
    dateStr: '06–18 January 2026',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal Special',
    title: 'Ganga Sagar Mela 2026: Eco-Friendly "Green Mela", AI Surveillance & ₹5 Lakh Pilgrim Insurance',
    titleBn: 'গঙ্গাসাগর মেলা ২০২৬: পরিবেশ-বান্ধব "গ্রিন মেলা", এআই নজরদারি ও ₹৫ লক্ষের জীবন বীমা',
    summary: 'Millions of pilgrims from across India and abroad congregated at Sagar Island for the sacred Makar Sankranti holy dip on 14 January 2026.',
    summaryBn: '২০২৬ সালের ১৪ জানুয়ারি মকর সংক্রান্তিতে দক্ষিণ ২৪ পরগনার সাগরদ্বীপে গঙ্গা ও বঙ্গোপসাগরের সঙ্গমে অনুষ্ঠিত হলো ঐতিহ্যবাহী গঙ্গাসাগর মেলা।',
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
    id: 'wb-2026-02-tangail-saree',
    day: 3,
    dateStr: 'January 2026',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal GI Heritage',
    title: 'West Bengal Handloom Clusters Showcase GI Certified Tangail Sarees at Kolkata Winter Expo',
    titleBn: 'নদিয়া ও পূর্ব বর্ধমানের জিআই প্রাপ্ত টাঙ্গাইল শাড়ির বিশেষ প্রদর্শনী',
    summary: 'Master weavers of Phulia, Santipur, and Samudragarh showcased official GI certified Tangail handloom textiles during the state winter handloom fair.',
    summaryBn: 'পশ্চিমবঙ্গের ঐতিহ্যবাহী তাঁতশিল্পের অন্যতম প্রতীক টাঙ্গাইল শাড়ির বিশেষ হস্তশিল্প মেলা অনুষ্ঠিত হলো।',
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
    id: 'wb-2026-03-garad-korial',
    day: 5,
    dateStr: 'January 2026',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal GI Heritage',
    title: 'Murshidabad Silk Hubs Expand Export Promotion of GI Tagged Garad & Korial Silks',
    titleBn: 'মুর্শিদাবাদের গরদ ও কোড়িয়াল সিল্কের আন্তর্জাতিক রপ্তানি উদ্যোগ',
    summary: 'The West Bengal Directorate of Textiles initiated global branding and market linkages for Murshidabad\'s iconic GI certified Garad and Korial pure silks.',
    summaryBn: 'মুর্শিদাবাদের ঐতিহ্যবাহী গরদ ও কোড়িয়াল শাড়ির আন্তর্জাতিক বিপণন শুরু হলো।',
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
    id: 'wb-2026-04-sundarban-honey',
    day: 8,
    dateStr: 'January 2026',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal GI Heritage',
    title: 'Sundarban "Mouban Honey" Harvest Season Commences with Community Safety Measures',
    titleBn: 'সুন্দরবনের মৌলিদের সংগৃহীত "মৌবন মধু" সংগ্রহ অভিযান শুরু',
    summary: 'West Bengal Forest Department launched the 2026 winter wild mangrove honey harvesting drive for the traditional Mauli community in Sundarbans.',
    summaryBn: 'সুন্দরবনের গভীর ম্যানগ্রোভ অরণ্যে মৌলিদের নিরাপত্তা বলয় সহ প্রাকৃতিক মধু সংগ্রহ শুরু হলো।',
    keyPoints: [
      'Harvested from wild hives of giant rock bee (Apis dorsata) in Khalisha, Bain, and Goran mangrove florets.',
      'Processed and bottled under the brand name "Sundarban Mouban" by WBFDCL.'
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
    id: 'wb-2026-05-kalonunia-rice',
    day: 10,
    dateStr: 'January 2026',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal GI Heritage',
    title: 'North Bengal\'s Aromatic "Kalonunia Rice" Featured at State Agri Fair 2026',
    titleBn: 'উত্তরবঙ্গের সুগন্ধী কালোশুয়ো চাল "কালোমুনিয়া ধান" রাজ্য কৃষি মেলায় প্রদর্শিত',
    summary: 'Kalonunia rice, indigenous black-husked aromatic fine paddy cultivated in North Bengal (Jalpaiguri, Cooch Behar), featured prominently in the 2026 State Agri Expo.',
    summaryBn: 'উত্তরবঙ্গের জলপাইগুড়ি ও কোচবিহারের দেশীয় সুগন্ধী ধান কালোমুনিয়া বিশেষ সমাদর লাভ করেছে।',
    keyPoints: [
      'Known locally as the "Prince of Rice" ("ছোট এলাচ চাল") due to its fine grain, subtle fragrance, and soft texture.',
      'Grown organically in Terai-Dooars alluvial tracts nourished by Teesta, Torsa, and Jaldhaka rivers.'
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
    id: 'wb-2026-06-kolkata-bookfair',
    day: 28,
    dateStr: 'January 2026',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal Special',
    title: '48th International Kolkata Book Fair (IKBF 2026) Inaugurated at Salt Lake',
    titleBn: '৪৮তম আন্তর্জাতিক কলকাতা বইমেলা ২০২৬ (বইমেলা প্রাঙ্গণ, সল্টলেক)',
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
    id: 'wb-2026-07-joydev-kenduli',
    day: 14,
    dateStr: '14–16 January 2026',
    category: 'wb',
    categoryLabel: '🏛️ West Bengal Special',
    title: 'Historic Joydev Kenduli Mela Celebrated on the Banks of Ajoy River, Birbhum',
    titleBn: 'বীরভূমের অজয় নদের তীরে ঐতিহাসিক জয়দেব কেঁদুলি মেলা ও বাউল সম্মেলন ২০২৬',
    summary: 'Annual gathering of Bauls, Fakirs, and Kirtaniyas celebrated at Kenduli village in Birbhum district on Makar Sankranti 2026.',
    summaryBn: 'কবি জয়দেবের স্মৃতিধন্য কেঁদুলিতে অজয় নদের তীরে ২০২৬ সালের বাউল সম্মেলন অনুষ্ঠিত হয়।',
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
    id: 'wb-2026-08-anandapur-fire-safety',
    day: 26,
    dateStr: '26 January 2026',
    category: 'wb',
    categoryLabel: '🏛️ Urban Safety & Law',
    title: 'West Bengal Fire Services Launches High-Level Safety Audit of Industrial Warehouses',
    titleBn: 'কলকাতার আনন্দপুর ঘটনার প্রেক্ষিতে রাজ্যজুড়ে গুদাম ও কারখানার অগ্নি-সুরক্ষা অডিট',
    summary: 'Following a major warehouse blaze in Kolkata\'s Anandapur area on 26 January 2026, West Bengal Government mandated strict fire safety compliance audits across all commercial storage facilities.',
    summaryBn: 'কলকাতার আনন্দপুরে গুদামে অগ্নিকাণ্ডের ঘটনার পর রাজ্যজুড়ে সব শিল্প ও বাণিজ্যিক গুদামে নিরাপত্তা অডিট বাধ্যতামূলক করা হলো।',
    keyPoints: [
      'West Bengal Fire & Emergency Services Department issued mandatory NOC inspection directives.',
      'Emergency high-level inquiry panel constituted to review industrial zoning compliance.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Disaster Management & Fire Safety Norms',
      points: [
        'National Building Code (NBC) 2016 (Part 4): Specifies fire and life safety requirements for Indian commercial establishments.',
        'West Bengal Fire Services Act, 1950: Regulates maintenance of fire prevention measures in the state.'
      ]
    },
    examRelevance: 'WBP SI, Kolkata Police, WBCS Governance.'
  },
  {
    id: 'wb-2026-09-kai-chutney-odisha',
    day: 2,
    dateStr: 'January 2026',
    category: 'wb',
    categoryLabel: '🏛️ East India GI Heritage',
    title: 'Similipal Biosphere Reserve Promotes Ecological Harvesting of Kai Ant Chutney',
    titleBn: 'ময়ূরভঞ্জের সিমলিপালের লাল পিঁপড়ের কাই চাটনি উৎপাদনে পরিবেশ-বান্ধব উদ্যোগ',
    summary: 'Odisha Forest Department and tribal SHGs in Mayurbhanj expanded cooperative processing for GI certified Similipal Kai Chutney.',
    summaryBn: 'ওড়িশার ময়ূরভঞ্জে আদিবাসী স্বনির্ভর গোষ্ঠীগুলির মাধ্যমে কাই চাটনি উৎপাদন সম্প্রসারিত হলো।',
    keyPoints: [
      'Kai Chutney (Oecophylla smaragdina) is rich in zinc, calcium, vitamin B12, and proteins.',
      'Handcrafted and harvested by Mayurbhanj tribal communities.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Similipal Biosphere Reserve & Tribals',
      points: [
        'Similipal NP: In Mayurbhanj, Odisha; UNESCO Biosphere Reserve (2009).',
        '75 PVTGs in India: Odisha has the highest count (13 PVTGs).'
      ]
    },
    examRelevance: 'WBCS Geography & Environment.'
  },
  {
    id: 'wb-2026-10-rusoma-orange-festival',
    day: 24,
    dateStr: '24–25 January 2026',
    category: 'wb',
    categoryLabel: '🏛️ Northeast Special',
    title: '5th Rüsoma Orange Festival Celebrated with Organic Citrus Displays in Nagaland',
    titleBn: 'নাগাল্যান্ডের রুসোমায় ৫ম কমলালেবু উৎসব ২০২৬ অনুষ্ঠিত',
    summary: 'The 5th edition of the Rüsoma Orange Festival was held in Rüsoma village near Kohima, celebrating organic mandarin orange horticulture.',
    summaryBn: 'নাগাল্যান্ডের রুসোমা গ্রামে জৈব পদ্ধতিতে চাষ করা কমলার প্রদর্শনী সহ ৫তম কমলালেবু উৎসব অনুষ্ঠিত হয়।',
    keyPoints: [
      'Organized under the theme "Organic Citrus for Sustainable Livelihood" by Kohima district administration.',
      'Showcases organic GI certified Naga Sweet Cucumber and GI Tree Tomato.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Nagaland Geography & Festivals',
      points: [
        'Hornbill Festival: Known as the "Festival of Festivals", held every year from 1–10 December at Kisama Heritage Village.',
        'Highest Peak in Nagaland: Mount Saramati (3,841m) in Kiphire district on the India-Myanmar border.'
      ]
    },
    examRelevance: 'WBCS Northeast Geography & SSC CGL.'
  },

  // =========================================================================
  // 2. NATIONAL SCHEMES & PUBLIC WELFARE (10 EVENTS)
  // =========================================================================
  {
    id: 'sch-2026-01-pm-suryodaya',
    day: 22,
    dateStr: 'January 2026',
    category: 'schemes',
    categoryLabel: '☀️ Renewable Energy Schemes',
    title: 'PM Suryodaya Yojana Expands Rooftop Solar Subsidies for 1 Crore Households',
    titleBn: 'প্রধানমন্ত্রী সূর্যোদয় যোজনা: ১ কোটি পরিবারে সৌরবিদ্যুৎ সংযোগ সম্প্রসারণ',
    summary: 'Ministry of New & Renewable Energy accelerated rooftop solar installations offering up to ₹78,000 direct subsidy and 300 units of free electricity per month.',
    summaryBn: '১ কোটি মধ্যবিত্ত ও নিম্নবিত্ত পরিবারে সৌরবিদ্যুৎ প্যানেল বসানোর জন্য কেন্দ্রীয় ভর্তুকি বিতরণ শুরু হলো।',
    keyPoints: [
      'Targets 1 Crore household rooftop solar systems reducing grid electricity bills to zero.',
      'REC Limited designated as the sole National Programme Implementation Agency.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Renewable Energy Targets of India',
      points: [
        'Panchamrit Targets (COP26 Glasgow): 500 GW non-fossil energy capacity by 2030; 50% energy from renewables; Net Zero carbon emissions by 2070.',
        'ISA: International Solar Alliance HQ in Gurugram, Haryana.'
      ]
    },
    examRelevance: 'WBCS Mains Paper IV (Science & Tech) & Food SI.'
  },
  {
    id: 'sch-2026-02-karnataka-yuva-nidhi',
    day: 12,
    dateStr: 'January 2026',
    category: 'schemes',
    categoryLabel: '☀️ State Welfare Schemes',
    title: 'Karnataka Expands Direct DBT Under "Yuva Nidhi" Unemployment Assistance',
    titleBn: 'কর্ণাটক সরকারের "যুব নিধি" প্রকল্পে স্নাতক বেকার ভাতা বিতরণ',
    summary: 'Karnataka government transferred DBT assistance of ₹3,000/month for unemployed graduates and ₹1,500/month for diploma holders.',
    summaryBn: 'কর্ণাটকে যুব সমাজের আর্থিক সুরক্ষায় যুব নিধি ডিবিটি ভাতা প্রদান কর্মসূচি চালু হলো।',
    keyPoints: [
      '5th guarantee scheme implemented by the Karnataka state government.',
      'Provided for a maximum duration of 2 years to eligible youth seeking employment.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Direct Benefit Transfer (DBT) Framework',
      points: [
        'DBT Introduced: 1 January 2013 by Government of India.',
        'JAM Trinity: Jan Dhan, Aadhaar, Mobile enables leak-proof DBT delivery.'
      ]
    },
    examRelevance: 'WBCS Economy & Governance.'
  },
  {
    id: 'sch-2026-03-mahtari-vandan',
    day: 15,
    dateStr: 'January 2026',
    category: 'schemes',
    categoryLabel: '☀️ Women Empowerment',
    title: 'Chhattisgarh Launches "Mahtari Vandan Yojana" Providing ₹12,000 Annual Aid to Women',
    titleBn: 'ছত্তিশগড়ের "মহতারী বন্দন যোজনা": মহিলাদের বার্ষিক ₹১২,০০০ সহায়তা',
    summary: 'Chhattisgarh cabinet cleared rollout of ₹1,000 monthly direct financial assistance to all married women aged 21 and above.',
    summaryBn: 'ছত্তিশগড়ের বিবাহিত মহিলাদের অর্থনৈতিক স্বাবলম্বিতা বাড়াতে মাসিক এক হাজার টাকা অনুদান শুরু হলো।',
    keyPoints: [
      'Similar to Madhya Pradesh\'s Ladli Behna Yojana and West Bengal\'s Lakshmir Bhandar.',
      'Expected to benefit over 70 lakh women across rural and tribal tracts of Chhattisgarh.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Women Welfare Schemes Comparison',
      points: [
        'West Bengal Lakshmir Bhandar: Launched in 2021; ₹1,000/month for General and ₹1,200/month for SC/ST women.',
        'Beti Bachao Beti Padhao: Launched on 22 Jan 2015 in Panipat, Haryana.'
      ]
    },
    examRelevance: 'WBCS Social Schemes, WBP SI.'
  },
  {
    id: 'sch-2026-04-operation-amrit',
    day: 16,
    dateStr: 'January 2026',
    category: 'schemes',
    categoryLabel: '☀️ Public Health Surveillance',
    title: 'Kerala Launches "Operation AMRIT" to Curb Over-the-Counter Antibiotic Misuse',
    titleBn: 'অ্যান্টিবায়োটিকের অপব্যবহার রুখতে কেরলের "অপারেশন অমৃত" কর্মসূচি',
    summary: 'Kerala Drug Control Department initiated Operation AMRIT (Antimicrobial Resistance Intervention For Total Health) mandating strict doctor prescription audits for pharmacy sales.',
    summaryBn: 'প্রেসক্রিপশন ছাড়া অ্যান্টিবায়োটিক বিক্রি সম্পূর্ণ নিষিদ্ধ করতে কেরলে অপারেশন অমৃত শুরু হয়েছে।',
    keyPoints: [
      'Kerala became the first state in India to establish a State Action Plan on AMR (KARSAP).',
      'Target: Prevent superbugs and preserve antibiotic efficacy in human healthcare.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Antimicrobial Resistance (AMR) & WHO Guidelines',
      points: [
        'AMR: Microorganisms (bacteria, viruses, fungi) develop resistance to antimicrobial medicines.',
        'WHO AWaRe Classification: Access, Watch, and Reserve antibiotic groups to prevent resistance.'
      ]
    },
    examRelevance: 'WBCS Science & Public Health, UPSC Prelims.'
  },
  {
    id: 'sch-2026-05-mahila-udyamita-assam',
    day: 18,
    dateStr: 'January 2026',
    category: 'schemes',
    categoryLabel: '☀️ Rural Livelihoods',
    title: 'Assam Launches "Mukhyamantri Mahila Udyamita Abhiyan" for Rural Women Entrepreneurs',
    titleBn: 'গ্রামীণ মহিলা স্বনির্ভরতার জন্য আসামের "মহিলা উদ্যমিতা অভিযান"',
    summary: 'Assam government launched financial grant support scheme to transform 39 lakh rural SHG women into "Lakhpati Baidees".',
    summaryBn: 'আসাম সরকার স্বনির্ভর গোষ্ঠীর মহিলাদের বার্ষিক ১ লক্ষ টাকা আয়ের উপযোগী করতে উদ্যমিতা অনুদান শুরু করল।',
    keyPoints: [
      'Initial phase provides ₹10,000 seed grant, followed by ₹12,500 government grant and ₹12,500 bank loan.',
      'Mandates population policy compliance (maximum 3 children for general/OBC and 4 for ST/SC).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Self Help Groups & DAY-NRLM',
      points: [
        'DAY-NRLM: Deendayal Antyodaya Yojana - National Rural Livelihoods Mission launched in 2011.',
        'Lakhpati Didi: Central initiative aiming to create 3 crore Lakhpati Didis in rural SHGs.'
      ]
    },
    examRelevance: 'WBCS Rural Development & Economy.'
  },
  {
    id: 'sch-2026-06-sampoornata-2026',
    day: 15,
    dateStr: 'January 2026',
    category: 'schemes',
    categoryLabel: '☀️ Governance Campaigns',
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
    id: 'sch-2026-07-prerana-program',
    day: 4,
    dateStr: 'January 2026',
    category: 'schemes',
    categoryLabel: '☀️ Experiential Education',
    title: 'Ministry of Education Expands PRERANA Experiential Learning Programme',
    titleBn: 'শিক্ষা মন্ত্রকের অভিনব শিক্ষা উদ্যোগ "প্রেরণা" কর্মসূচির ব্যাচ শুরু',
    summary: 'Residential experiential learning programme for Class 9 to 12 students operationalized from a vernacular school established in 1888 in Vadnagar, Gujarat.',
    summaryBn: 'নবম থেকে দ্বাদশ শ্রেণির ছাত্র-ছাত্রীদের নেতৃত্ব ও মূল্যবোধ গঠনের জন্য প্রেরণা আবাসিক কর্মসূচি পরিচালিত হলো।',
    keyPoints: [
      'Curriculum based on 9 core Indian value themes integrating indigenous knowledge systems under NEP 2020.',
      'Selects 20 students (10 boys and 10 girls) per batch from across all Indian States and UTs.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: National Education Policy (NEP 2020)',
      points: [
        'NEP 2020 Drafting Committee: Chaired by Dr. K. Kasturirangan (former ISRO Chairman).',
        'New Curricular Structure: 5+3+3+4 covering ages 3 to 18.',
        'Target: 100% Gross Enrolment Ratio (GER) in preschool to secondary education by 2030.'
      ]
    },
    examRelevance: 'Primary TET, WBCS Education Policies.'
  },
  {
    id: 'sch-2026-08-smart-2-ayurveda',
    day: 5,
    dateStr: 'January 2026',
    category: 'schemes',
    categoryLabel: '☀️ AYUSH & Medical Research',
    title: 'CCRAS & NCISM Roll Out "SMART 2.0" to Mainstream Ayurveda Clinical Studies',
    titleBn: 'আয়ুর্বেদ গবেষণাকে উৎসাহিত করতে "স্মার্ট ২.০" (SMART 2.0) প্রকল্প চালু',
    summary: 'Scope for Mainstreaming Ayurveda Research in Teaching Professionals (SMART 2.0) launched to conduct randomized clinical trials in prioritized disease areas.',
    summaryBn: 'আয়ুশ মন্ত্রকের অধীন আয়ুর্বেদ চিকিৎসা গবেষণায় পেশাদার চিকিৎসকদের যুক্ত করতে এই অনুদান স্কিম চালু হলো।',
    keyPoints: [
      'Targets clinical research in malnutrition, diabetes mellitus, osteoarthritis, iron deficiency anemia, and chronic kidney disease.',
      'Jointly executed by CCRAS (Central Council for Research in Ayurvedic Sciences) and NCISM.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Ministry of AYUSH & Traditional Medicine',
      points: [
        'AYUSH: Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homoeopathy (formed in Nov 2014).',
        'WHO Global Centre for Traditional Medicine (GCTM): Located in Jamnagar, Gujarat (1st in the world).'
      ]
    },
    examRelevance: 'WBCS Science & Technology.'
  },
  {
    id: 'sch-2026-09-sukanya-samriddhi',
    day: 1,
    dateStr: 'January 2026',
    category: 'schemes',
    categoryLabel: '☀️ Small Savings Welfare',
    title: 'Government Maintains 8.2% High Interest Rate on Sukanya Samriddhi Yojana (SSY)',
    titleBn: 'সুকন্যা সমৃদ্ধি যোজনায় ৮.২% আকর্ষণীয় সুদের হার বহাল রাখল কেন্দ্র',
    summary: 'Ministry of Finance reaffirmed the 8.2% annualized interest rate for Sukanya Samriddhi accounts, highest among small savings schemes.',
    summaryBn: 'কন্যা শিশুদের ভবিষ্যতের আর্থিক সুরক্ষায় সুকন্যা সমৃদ্ধি যোজনায় সর্বোচ্চ সুদের হার বজায় রাখা হয়েছে।',
    keyPoints: [
      'Account can be opened for girl children below 10 years of age with minimum ₹250 deposit.',
      'Enjoys EEE (Exempt-Exempt-Exempt) tax status under Section 80C of the Income Tax Act.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Small Savings Instruments & Regulators',
      points: [
        'SSY Launched: 22 January 2015 as part of Beti Bachao Beti Padhao campaign.',
        'Other Small Savings Schemes: PPF (Public Provident Fund, 7.1%), NSC (National Savings Certificate, 7.7%), Senior Citizen Savings Scheme (SCSS, 8.2%).'
      ]
    },
    examRelevance: 'WBCS Banking & Economy, Food SI.'
  },
  {
    id: 'sch-2026-10-green-hydrogen-sight',
    day: 9,
    dateStr: 'January 2026',
    category: 'schemes',
    categoryLabel: '☀️ Green Hydrogen & Energy',
    title: 'SECI Awards 1.5 GW Electrolyser Manufacturing Under PLI "SIGHT" Scheme',
    titleBn: 'সবুজ হাইড্রোজেন উৎপাদনে "সাইট" (SIGHT) প্রকল্পের অধীনে ১.৫ গিগাওয়াট দরপত্র চূড়ান্ত',
    summary: 'Solar Energy Corporation of India (SECI) finalized financial incentives for 1.5 GW electrolyser manufacturing and 4.12 lakh tonnes/year Green Hydrogen production under National Green Hydrogen Mission.',
    summaryBn: 'ভারতে পরিবেশবান্ধব হাইড্রোজেন উৎপাদনের জন্য বৃহত্তম পিএলআই অনুদান বণ্টন সম্পন্ন হলো।',
    keyPoints: [
      'Strategic Interventions for Green Hydrogen Transition (SIGHT) carries ₹17,490 Crore allocation.',
      'Winning bidders: Reliance Electrolyser, Adani New Industries, L&T Electrolysers, and John Cockerill.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: National Green Hydrogen Mission',
      points: [
        'Launched: 4 January 2023 with total outlay of ₹19,744 Crore.',
        '2030 Target: 5 MMT (Million Metric Tonnes) green hydrogen production per annum; 125 GW associated renewable capacity; reduction of 50 MMT GHG emissions.'
      ]
    },
    examRelevance: 'WBCS Science & Environment, UPSC Prelims.'
  },

  // =========================================================================
  // 3. NATIONAL AFFAIRS, LAW & JUDICIARY (10 EVENTS)
  // =========================================================================
  {
    id: 'nat-2026-01-republic-day-77',
    day: 26,
    dateStr: '26 January 2026',
    category: 'national',
    categoryLabel: '🇮🇳 77th Republic Day 2026',
    title: 'India Celebrates 77th Republic Day at Kartavya Path: "150 Years of Vande Mataram" Theme',
    titleBn: '৭৭তম প্রজাতন্ত্র দিবস ২০২৬: "বন্দে মাতরম"-এর ১৫০তম বর্ষপূর্তি থিম ও কর্তব্য পথে কুচকাওয়াজ',
    summary: 'India celebrated its 77th Republic Day on 26 January 2026 at Kartavya Path with European leaders as Chief Guests and a focus on military indigenization.',
    summaryBn: '২০২৬ সালের ২৬ জানুয়ারি নতুন দিল্লির কর্তব্য পথে বর্ণাঢ্য কুচকাওয়াজের মধ্য দিয়ে ৭৭তম প্রজাতন্ত্র দিবস উদযাপিত হলো।',
    keyPoints: [
      'Central Theme: "150 Years of Vande Mataram" (composed 1875 by Bankim Chandra Chattopadhyay).',
      'Chief Guests: Antonio Costa (President of European Council) and Ursula von der Leyen (President of European Commission).',
      'Ashok Chakra conferred on Wing Commander Shubhanshu Shukla (first Indian astronaut to visit International Space Station).',
      'Indigenous Long-Range Anti-Ship Hypersonic Missile (LR-AShM) and Ramjet 155mm shells showcased.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Constitutional & Historical Background of Republic Day',
      points: [
        'Why January 26? Commemorates 1929 Lahore Congress Purna Swaraj Declaration presided by Jawaharlal Nehru.',
        'Constitution Adoption: 26 Nov 1949 | Commencement: 26 Jan 1950.',
        'Vande Mataram: Composed 7 Nov 1875 by Bankim Chandra Chattopadhyay in Anandamath (1882); 1st sung at 1896 Calcutta Congress by Rabindranath Tagore; adopted as National Song on 24 Jan 1950.'
      ]
    },
    examRelevance: 'Guaranteed 2-3 questions in all 2026 WBCS & WB Police exams.'
  },
  {
    id: 'nat-2026-02-sc-article21-menstrual',
    day: 18,
    dateStr: 'January 2026',
    category: 'national',
    categoryLabel: '🇮🇳 Judiciary & Law',
    title: 'Supreme Court Landmark Ruling: Menstrual Hygiene Declared a Fundamental Right under Article 21',
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
    id: 'nat-2026-03-startup-india-decade',
    day: 16,
    dateStr: '16 January 2026',
    category: 'national',
    categoryLabel: '🇮🇳 Innovation & Economy',
    title: 'National Startup Day 2026: India Celebrates "A Decade of Startup India" (2016–2026)',
    titleBn: 'জাতীয় স্টার্টআপ দিবস ২০২৬: স্টার্টআপ ইন্ডিয়ার ১০ম বর্ষপূর্তি উদযাপন',
    summary: 'On 16 January 2026, Ministry of Commerce & Industry marked the 10th anniversary of Startup India, celebrating India\'s growth to 115+ Unicorns.',
    summaryBn: '২০১৬ সালে শুরু হওয়া স্টার্টআপ ইন্ডিয়া প্রকল্পের ১০ বছর পূর্তিতে নতুন দিল্লিতে বিশেষ সম্মেলন অনুষ্ঠিত হয়।',
    keyPoints: [
      'National Startup Awards 2026 presented across DeepTech, AgriTech, and Green Transition categories.',
      'India recognized as the 3rd largest startup ecosystem globally with over 1.3 lakh DPIIT-recognized startups.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Startup India & Unicorn Ecosystem',
      points: [
        'Launched: 16 January 2016 by Prime Minister Narendra Modi.',
        'Administered by: DPIIT (Department for Promotion of Industry and Internal Trade).',
        'Unicorn Definition: Privately held startup valuation exceeding USD 1 Billion.'
      ]
    },
    examRelevance: 'WBCS Economy & Governance, SSC CGL.'
  },
  {
    id: 'nat-2026-04-somnath-millennium',
    day: 8,
    dateStr: 'January 2026',
    category: 'national',
    categoryLabel: '🇮🇳 History & Heritage',
    title: 'PM Commemorates 1,000th Anniversary of Somnath Temple Resistance (1026–2026)',
    titleBn: 'সোমনাথ মন্দির আক্রমণের ১০০০তম বার্ষিকী (১০২৬–২০২৬) স্মরণে বিশেষ অনুষ্ঠান',
    summary: 'Prime Minister Narendra Modi commemorated the millennium anniversary (1,000 years) of the historic 1026 AD event at Somnath, highlighting the shrine as a symbol of civilizational resilience.',
    summaryBn: '১০২৬ সালের ঐতিহাসিক ঘটনার ১০০০ বছর পূর্তিতে সোমনাথ মন্দিরে বিশেষ স্মরণ অনুষ্ঠান অনুষ্ঠিত হলো।',
    keyPoints: [
      'Emphasized the preservation of cultural heritage and reconstruction of sacred ancient shrines.',
      'Somnath is the first among the twelve Aadi Jyotirlingas of India.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Somnath Temple History & Reconstruction',
      points: [
        'Location: Prabhas Patan, Veraval in Saurashtra, Gujarat on the coast of Arabian Sea.',
        '1026 AD Attack: Mahmud of Ghazni raided the temple during the reign of Chaulukya King Bhima I.',
        'Post-Independence Reconstruction: Initiated by Sardar Vallabhbhai Patel in 1947; 1st President Dr. Rajendra Prasad performed Pran Pratishtha in May 1951.'
      ]
    },
    examRelevance: 'WBCS Medieval History, Art & Culture.'
  },
  {
    id: 'nat-2026-05-bio-bitumen-highway',
    day: 12,
    dateStr: 'January 2026',
    category: 'national',
    categoryLabel: '🇮🇳 Green Infrastructure',
    title: 'India Achieves Global First: Commercial Production of Bio-Bitumen from Biomass',
    titleBn: 'ভারতে বায়ো-বিটুমিনের বাণিজ্যিক উৎপাদন শুরু: বিশ্বমঞ্চে প্রথম স্থান',
    summary: 'Ministry of Road Transport and Highways (MoRTH) and CSIR-CRRI commenced commercial rollout of bio-bitumen derived from agricultural paddy stubble for national highway paving.',
    summaryBn: 'কৃষি বর্জ্য ও খড় থেকে বায়ো-বিটুমিন তৈরি করে জাতীয় সড়ক নির্মাণের পরিবেশবান্ধব যুগান্তকারী প্রযুক্তি চালু হলো।',
    keyPoints: [
      'Replaces petroleum-based bitumen with bio-oil synthesized from crop residues (parali).',
      'Dual benefit: Solves North Indian stubble burning air pollution while substituting costly crude oil bitumen imports.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: National Highway Authorities & Road Research',
      points: [
        'NHAI (National Highways Authority of India): Statutory body set up under NHAI Act, 1988 under MoRTH.',
        'CSIR-CRRI (Central Road Research Institute): Founded in 1952 in New Delhi.'
      ]
    },
    examRelevance: 'WBCS Science & Environment, UPSC Prelims.'
  },
  {
    id: 'nat-2026-06-finance-commission-16',
    day: 5,
    dateStr: 'January 2026',
    category: 'national',
    categoryLabel: '🇮🇳 Constitutional Bodies',
    title: '16th Finance Commission (Award Period 2026–2031) Chaired by Dr. Arvind Panagariya',
    titleBn: '১৬তম অর্থ কমিশন (২০২৬–২০৩১ মেয়াদকাল): ডঃ অরবিন্দ পানাগাড়িয়া',
    summary: '16th Finance Commission entered its operational framework year covering the 5-year award period from 1 April 2026 to 31 March 2031.',
    summaryBn: 'সংবিধানের ২৮০ অনুচ্ছেদ অনুযায়ী গঠিত ১৬তম অর্থ কমিশনের সুপারিশ কার্যকর করার রূপরেখা চূড়ান্ত হলো।',
    keyPoints: [
      'Chaired by former NITI Aayog Vice-Chairman Dr. Arvind Panagariya.',
      'Reviews tax devolution between Centre and States and disaster management fund allocation.'
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
    id: 'nat-2026-07-sc-diamond-jubilee-year',
    day: 28,
    dateStr: '28 January 2026',
    category: 'national',
    categoryLabel: '🇮🇳 Judiciary',
    title: 'Supreme Court of India Marks 76th Anniversary with Digital Jurisprudence Reforms',
    titleBn: 'ভারতের সুপ্রিম কোর্টের ৭৬তম প্রতিষ্ঠা বার্ষিকী ও ডিজিটাল আদালত ২.০ সংস্কার',
    summary: 'On 28 January 2026, the Supreme Court marked 76 years since its first sitting on 28 January 1950, expanding AI translations of judgments into 22 scheduled languages.',
    summaryBn: '১৯৫০ সালের ২৮ জানুয়ারি প্রতিষ্ঠিত সুপ্রিম কোর্ট এআই প্রযুক্তির মাধ্যমে আঞ্চলিক ভাষায় রায়ের অনুবাদ সম্প্রসারিত করল।',
    keyPoints: [
      'Digi-SCR digital judgment repository expanded to cover 38,000+ judgments.',
      'SUVABAS (Supreme Court Vidhik Anuvaad Software) enables seamless translation into Bengali, Hindi, Tamil, etc.'
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
    id: 'nat-2026-08-icmr-kyasanur-vaccine',
    day: 19,
    dateStr: 'January 2026',
    category: 'national',
    categoryLabel: '🇮🇳 Medical Science',
    title: 'ICMR Advances Next-Gen Indigenous Vaccine for Kyasanur Forest Disease (KFD)',
    titleBn: 'আইসিএমআর দ্বারা ক্যাসানুর ফরেস্ট ডিজিজ (মাঙ্কি ফিভার)-এর নতুন ভ্যাকসিনের ট্রায়াল',
    summary: 'Indian Council of Medical Research (ICMR) and National Institute of Virology (NIV) Pune advanced clinical evaluation of an improved cell-culture vaccine for Monkey Fever.',
    summaryBn: 'মাঙ্কি ফিভার বা ক্যাসানুর ফরেস্ট ডিজিজ প্রতিরোধে ভারতে তৈরি নতুন টিকার ক্লিনিক্যাল পরীক্ষা শুরু হলো।',
    keyPoints: [
      'Kyasanur Forest Disease (KFD) is a tick-borne viral hemorrhagic fever first identified in Kyasanur forest of Shimoga district, Karnataka in 1957.',
      'Transmitted by hard ticks (Haemaphysalis spinigera) with monkeys acting as amplifying hosts.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: ICMR & Zoonotic Diseases in India',
      points: [
        'ICMR: Established in 1911 as IRFA; renamed ICMR in 1949 | HQ: New Delhi.',
        'NIV (National Institute of Virology): Premier virus research lab located in Pune, Maharashtra (est. 1952).'
      ]
    },
    examRelevance: 'WBCS Biology & General Science, UPSC Prelims.'
  },
  {
    id: 'nat-2026-09-bharat-rang-mahotsav-25',
    day: 30,
    dateStr: 'January 2026',
    category: 'national',
    categoryLabel: '🇮🇳 Theatre & Arts',
    title: '25th Silver Jubilee Edition of Bharat Rang Mahotsav Inaugurated by NSD',
    titleBn: 'জাতীয় নাট্য বিদ্যালয় (NSD) দ্বারা ২৫তম ভারত রং মহোৎসবের উদ্বোধন',
    summary: 'National School of Drama (NSD) inaugurated the 25th Silver Jubilee edition of Asia\'s largest international theatre festival in New Delhi.',
    summaryBn: 'নতুন দিল্লিতে এশিয়ার বৃহত্তম নাট্যোৎসব ভারত রং মহোৎসবের ২৫তম রজত জয়ন্তী আসর শুরু হলো।',
    keyPoints: [
      'Over 100 plays in multiple Indian languages and international entries showcased across Delhi, Mumbai, and Kolkata.',
      'Celebrates Indian folk theatre forms including Jatra (Bengal), Yakshagana (Karnataka), and Nautanki (UP).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: National School of Drama & Folk Theatres',
      points: [
        'NSD: Set up by Sangeet Natak Akademi in 1959; became autonomous institute in 1975 | Location: New Delhi.',
        'Traditional Folk Theatres: Jatra (West Bengal), Tamasha (Maharashtra), Bhavai (Gujarat), Maach (Madhya Pradesh).'
      ]
    },
    examRelevance: 'WBCS Art & Culture, WBPSC Miscellaneous.'
  },
  {
    id: 'nat-2026-10-trout-aquaculture-hp',
    day: 14,
    dateStr: 'January 2026',
    category: 'national',
    categoryLabel: '🇮🇳 Blue Economy & Fisheries',
    title: 'India Inaugurates Integrated Inland Rainbow Trout Fish Farming Facility in HP',
    titleBn: 'হিমাচল প্রদেশে আধুনিক রেনবো ট্রাউট মাছ চাষ ও প্রজনন কেন্দ্র উদ্বোধন',
    summary: 'Under Pradhan Mantri Matsya Sampada Yojana (PMMSY), Department of Fisheries operationalized state-of-the-art coldwater aquaculture recirculation system in Kullu, Himachal Pradesh.',
    summaryBn: 'প্রধানমন্ত্রী মৎস্য সম্পদ যোজনার অধীনে হিমালয়ের ঠাণ্ডা জলের ট্রাউট মাছের বাণিজ্যিক প্রজনন কেন্দ্র স্থাপিত হলো।',
    keyPoints: [
      'Rainbow Trout (Oncorhynchus mykiss) is a premium coldwater carnivorous fish thriving in 10°C–15°C mountain streams.',
      'Boosts high-value exports and tribal livelihoods across Himalayan states (HP, J&K, Uttarakhand, Sikkim).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: PMMSY & Indian Blue Economy',
      points: [
        'PMMSY: Launched in Sept 2020 with ₹20,050 Crore outlay under Atmanirbhar Bharat.',
        'India Fisheries Ranking: 2nd largest aquaculture producer globally; 3rd largest fish producing nation.',
        'ICAR-DCFR: Directorate of Coldwater Fisheries Research located in Bhimtal, Uttarakhand.'
      ]
    },
    examRelevance: 'WBCS Agriculture & Geography, UPSC Prelims.'
  },

  // =========================================================================
  // 4. INTERNATIONAL AFFAIRS & SUMMITS (10 EVENTS)
  // =========================================================================
  {
    id: 'intl-2026-01-wef-davos',
    day: 19,
    dateStr: '19–23 January 2026',
    category: 'international',
    categoryLabel: '🌍 Global Summits',
    title: 'World Economic Forum (WEF) 56th Annual Meeting Concludes in Davos, Switzerland',
    titleBn: 'দাভোসে বিশ্ব অর্থনৈতিক ফোরামের (WEF) ৫৬তম বার্ষিক সম্মেলন ২০২৬',
    summary: 'Global leaders gathered in Davos under theme "Rebuilding Trust in an Era of Polycrisis & Technological Transformation".',
    summaryBn: 'ওয়ার্ল্ড ইকোনমিক ফোরামের ২০২৬ বার্ষিক সম্মেলন সুইজারল্যান্ডের দাভোসে অনুষ্ঠিত হয়।',
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
    id: 'intl-2026-02-india-canada-energy',
    day: 15,
    dateStr: 'January 2026',
    category: 'international',
    categoryLabel: '🌍 Bilateral Accords',
    title: 'India and Canada Sign Joint Statement on Clean Energy Cooperation at Energy Week 2026',
    titleBn: 'ইন্ডিয়া এনার্জি উইক ২০২৬-এ ভারত ও কানাডার পরিচ্ছন্ন জ্বালানি চুক্তি',
    summary: 'India and Canada signed a joint ministerial statement for cooperation in critical minerals supply chains, LNG transitions, and hydrogen development.',
    summaryBn: 'ভারত ও কানাডার মধ্যে খনিজ সম্পদ ও সবুজ হাইড্রোজেন সংক্রান্ত সহযোগিতা চুক্তি স্বাক্ষরিত হলো।',
    keyPoints: [
      'Focus on lithium, nickel, and cobalt supply security for India\'s electric vehicle manufacturing.',
      'Promotes joint R&D in carbon capture, utilization and storage (CCUS) technologies.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Critical Minerals & Mines and Minerals Act',
      points: [
        'Critical Minerals of India: 24 critical and strategic minerals identified by Ministry of Mines in 2023 (including Lithium, Cobalt, Nickel, Titanium).',
        'Khanij Bidesh India Ltd (KABIL): Joint venture to acquire critical mineral assets abroad in Argentina, Australia, and Chile.'
      ]
    },
    examRelevance: 'WBCS Economy & International Relations.'
  },
  {
    id: 'intl-2026-03-g20-south-africa',
    day: 1,
    dateStr: 'January 2026',
    category: 'international',
    categoryLabel: '🌍 G20 Presidency',
    title: 'South Africa Formally Operationalizes G20 Presidency for 2026',
    titleBn: '২০২৬ সালের জন্য দক্ষিণ আফ্রিকা জি২০ প্রেসিডেন্সির আনুষ্ঠানিক কাজ শুরু করল',
    summary: 'South Africa commenced its term as G20 President, making history as the first African nation to host the G20 Presidency.',
    summaryBn: 'আফ্রিকা মহাদেশের প্রথম দেশ হিসেবে দক্ষিণ আফ্রিকা ২০২৬ সালের জি২০ সম্মেলনের নেতৃত্ব দিচ্ছে।',
    keyPoints: [
      'Theme: "Fostering Solidarity, Equality and Sustainable Development in the Global South".',
      'Follows Brazil\'s 2024 and South Africa\'s 2025/2026 presidencies completing the Global South quadrilateral (Indonesia -> India -> Brazil -> South Africa).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: G20 Grouping & African Union Entry',
      points: [
        'G20 Formed: 1999 post-Asian financial crisis | Upgraded to Leader Summit in 2008.',
        'African Union (AU): Admitted as 21st permanent member of G20 at 2023 New Delhi Summit under India\'s Presidency.'
      ]
    },
    examRelevance: 'WBCS GS Paper IV, UPSC GS II.'
  },
  {
    id: 'intl-2026-04-henley-index-2026',
    day: 13,
    dateStr: '13 January 2026',
    category: 'international',
    categoryLabel: '🌍 Global Indices',
    title: 'Henley Passport Index 2026: Singapore Tops World, India Ranked in Top 80',
    titleBn: 'হেনলি পাসপোর্ট সূচক ২০২৬: সিঙ্গাপুর বিশ্বের ১ নম্বর স্থান ধরে রাখল',
    summary: 'The 2026 Henley Passport Index ranked Singapore #1 globally with visa-free entry to 192 countries.',
    summaryBn: '২০২৬ সালের হেনলি পাসপোর্ট সূচকে সিঙ্গাপুর বিশ্বের শীর্ষে এবং ভারত শীর্ষ ৮০-র মধ্যে অবস্থান করছে।',
    keyPoints: [
      'Published in collaboration with International Air Transport Association (IATA).',
      'Indian passport holders enjoy visa-free or visa-on-arrival access to 57+ international destinations.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Global Indexes & Headquarters',
      points: [
        'IATA: HQ in Montreal, Canada (founded 1945).',
        'Human Development Index (HDI): Published by UNDP in New York.',
        'Global Hunger Index (GHI): Published by Welthungerhilfe and Concern Worldwide.'
      ]
    },
    examRelevance: 'Direct question in WBPSC Clerkship, Food SI, WBCS.'
  },
  {
    id: 'intl-2026-05-brics-10-summit',
    day: 11,
    dateStr: 'January 2026',
    category: 'international',
    categoryLabel: '🌍 Multilateral Blocs',
    title: 'BRICS 10-Nation Consolidated Framework Focuses on Local Currency Settlement',
    titleBn: '১০ সদস্যের ব্রিকস জোটের স্থানীয় মুদ্রায় আন্তর্জাতিক বাণিজ্য সম্প্রসারণ উদ্যোগ',
    summary: 'BRICS foreign sherpas concluded ministerial coordination on de-dollarization and cross-border digital financial settlements among member states.',
    summaryBn: 'ব্রিকস জোটের আওতায় নিজস্ব মুদ্রায় আন্তর্জাতিক বাণিজ্য লেনদেন প্রসারে চুক্তি চূড়ান্ত হলো।',
    keyPoints: [
      '10 Consolidated BRICS Members: Brazil, Russia, India, China, South Africa, Egypt, Ethiopia, Iran, Saudi Arabia, and UAE.',
      'NDB (New Development Bank) headquartered in Shanghai approves $5B green infrastructure funding.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: BRICS & New Development Bank',
      points: [
        'BRIC Term Coined: 2001 by Jim O\'Neill (Goldman Sachs); South Africa joined in 2010.',
        '1st BRIC Summit: 2009 in Yekaterinburg, Russia.',
        'NDB: Established in 2014 Fortaleza Summit; 1st President was K.V. Kamath (India).'
      ]
    },
    examRelevance: 'WBCS International Relations, UPSC GS II.'
  },
  {
    id: 'intl-2026-06-nam-summit-kampala',
    day: 20,
    dateStr: 'January 2026',
    category: 'international',
    categoryLabel: '🌍 Non-Aligned Movement',
    title: '19th Non-Aligned Movement (NAM) Summit Concludes in Kampala, Uganda',
    titleBn: 'উগান্ডার কাম্পালায় ১৯তম জোট-নিরপেক্ষ আন্দোলন (NAM) শীর্ষ সম্মেলন সম্পন্ন',
    summary: 'Over 120 member states met under theme "Deepening Cooperation for Shared Global Affluence", adopting the Kampala Declaration.',
    summaryBn: 'উগান্ডায় ১২০টি দেশের উপস্থিতিতে ১৯তম ন্যাম সম্মেলন অনুষ্ঠিত হলো এবং কাম্পালা ঘোষণা গৃহীত হলো।',
    keyPoints: [
      'Reiterated Bandung Principles of peaceful coexistence, sovereignty, and territorial integrity.',
      'External Affairs Minister Dr. S. Jaishankar led the high-level Indian delegation.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: History of NAM & Bandung Conference',
      points: [
        'Bandung Conference: 1955 in Indonesia formulated core NAM principles.',
        '1st NAM Summit: 1961 in Belgrade, Yugoslavia.',
        'Founding Leaders: Jawaharlal Nehru (India), Josip Broz Tito (Yugoslavia), Gamal Abdel Nasser (Egypt), Kwame Nkrumah (Ghana), Sukarno (Indonesia).'
      ]
    },
    examRelevance: 'WBCS Modern World History & IR.'
  },
  {
    id: 'intl-2026-07-denmark-frederik-x',
    day: 14,
    dateStr: 'January 2026',
    category: 'international',
    categoryLabel: '🌍 Global Royal Succession',
    title: 'King Frederik X Ascends Throne of Denmark Following Historic Succession',
    titleBn: 'ডেনমার্কের নতুন রাজা হিসেবে সিংহাসনে আরোহণ করলেন রাজা দশম ফ্রেডেরিক',
    summary: 'Queen Margrethe II formally abdicated after 52 years of reign, marking the first voluntary abdication in Danish monarchy in nearly 900 years.',
    summaryBn: 'রানী দ্বিতীয় মার্গারেটের পদত্যাগের পর ডেনমার্কের সিংহাসনে বসলেন রাজা দশম ফ্রেডেরিক।',
    keyPoints: [
      'Proclaimed King from the balcony of Christiansborg Palace in Copenhagen by Prime Minister Mette Frederiksen.',
      'Australian-born Crown Princess Mary became Queen Mary of Denmark.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Denmark & Scandinavian Geography',
      points: [
        'Capital: Copenhagen | Currency: Danish Krone (DKK).',
        'Strait: The Sound (Øresund) connects Kattegat Sea to Baltic Sea separating Denmark and Sweden.',
        'Greenland: World\'s largest island is an autonomous territory within the Kingdom of Denmark.'
      ]
    },
    examRelevance: 'WBPSC Miscellaneous, SSC CGL.'
  },
  {
    id: 'intl-2026-08-france-gabriel-attal',
    day: 9,
    dateStr: 'January 2026',
    category: 'international',
    categoryLabel: '🌍 World Leadership',
    title: 'Gabriel Attal Serves as France\'s Youngest Prime Minister at Age 34',
    titleBn: 'ফ্রান্সের ইতিহাসে সর্বকনিষ্ঠ প্রধানমন্ত্রী গ্যাব্রিয়েল আটাল',
    summary: 'Appointed by President Emmanuel Macron at age 34, becoming the youngest and first openly gay Prime Minister of the French Fifth Republic.',
    summaryBn: 'ফরাসি প্রেসিডেন্ট ইমানুয়েল ম্যাক্রোঁ কর্তৃক সর্বকনিষ্ঠ প্রধানমন্ত্রী হিসেবে নিযুক্ত হলেন গ্যাব্রিয়েল আটাল।',
    keyPoints: [
      'Succeeded Élisabeth Borne in the Hôtel de Matignon (official residence of the French Prime Minister).',
      'Previously served as Minister of National Education and Youth.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: French Political System & Constitution',
      points: [
        'Fifth Republic: Established in 1958 by General Charles de Gaulle.',
        'Semi-Presidential System: Dual executive with President (Head of State, Élysée Palace) and Prime Minister (Head of Govt, Matignon).',
        'Parliament: National Assembly (Lower House) and Senate (Upper House).'
      ]
    },
    examRelevance: 'WBCS Prelims International Affairs & SSC.'
  },
  {
    id: 'intl-2026-09-bangladesh-elections',
    day: 7,
    dateStr: 'January 2026',
    category: 'international',
    categoryLabel: '🌍 South Asian Geopolitics',
    title: 'Bangladesh Strategic Bilateral Engagements with India on Transit & Teesta Basin',
    titleBn: 'ভারত-বাংলাদেশ ছিটমহল ও তিস্তা অববাহিকা বাণিজ্য পরিকাঠামো পর্যালোচনা',
    summary: 'India and Bangladesh reviewed bilateral connectivity projects including Akhaura-Agartala rail link, Maitri Setu, and Mongla Port access.',
    summaryBn: 'ভারত ও বাংলাদেশের মধ্যে দ্বিপাক্ষিক বাণিজ্য এবং তিস্তা জলবন্টন ও ট্রানজিট করিডোর পর্যালোচনা বৈঠক সম্পন্ন হলো।',
    keyPoints: [
      'Focus on operationalizing CEPA (Comprehensive Economic Partnership Agreement) negotiations.',
      'Bangladesh is India\'s largest trade partner in South Asia.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: India-Bangladesh Geography & Borders',
      points: [
        'Longest Land Boundary: India shares 4,096.7 km border with Bangladesh (West Bengal shares 2,216.7 km, highest).',
        'Common Transboundary Rivers: 54 rivers cross the India-Bangladesh border (Joint Rivers Commission established in 1972).',
        'Enclave Exchange: 100th Constitutional Amendment Act, 2015 operationalized Land Boundary Agreement (LBA).'
      ]
    },
    examRelevance: 'WBCS Prelims & Mains (West Bengal Border Geography).'
  },
  {
    id: 'intl-2026-10-un-wesp-2026',
    day: 5,
    dateStr: 'January 2026',
    category: 'international',
    categoryLabel: '🌍 Global Economic Forecasts',
    title: 'UN Releases "World Economic Situation and Prospects (WESP) 2026"',
    titleBn: 'জাতিসংঘের বিশ্ব অর্থনৈতিক পরিস্থিতি ও সম্ভাবনা (WESP 2026) রিপোর্ট প্রকাশ',
    summary: 'UN DESA projected global economic growth at 2.4%, highlighting India as the fastest-growing major economy driven by robust domestic demand and infrastructure Capex.',
    summaryBn: 'জাতিসংঘের রিপোর্টে ভারতকে বিশ্বের দ্রুততম ক্রমবর্ধমান প্রধান অর্থনীতি হিসেবে চিহ্নিত করা হলো।',
    keyPoints: [
      'India\'s GDP growth projected at 6.2%–6.7% for 2026.',
      'Warned against prolonged high interest rates, debt distress in developing nations, and geopolitical conflicts.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: UN Department of Economic and Social Affairs (UN DESA)',
      points: [
        'HQ: UN Secretariat, New York.',
        'Flagship Reports: WESP (jointly with UNCTAD and 5 UN regional commissions), World Social Report, Sustainable Development Goals Report.'
      ]
    },
    examRelevance: 'WBCS Economy & UPSC GS III.'
  },

  // =========================================================================
  // 5. ECONOMY, BANKING (RBI & SEBI) & REGULATORY (10 EVENTS)
  // =========================================================================
  {
    id: 'econ-2026-01-india-gdp-4t',
    day: 10,
    dateStr: 'January 2026',
    category: 'economy_banking',
    categoryLabel: '💰 Macroeconomy & GDP',
    title: 'India Solidifies Position as World\'s 4th Largest Economy at $4.18 Trillion Nominal GDP',
    titleBn: '৪.১৮ ট্রিলিয়ন ডলার জিডিপি সহ বিশ্ব অর্থনীতিতে ভারতের চতুর্থ স্থান সুসংহত',
    summary: 'Ministry of Statistics & Programme Implementation (MoSPI) advanced estimates confirmed India surpassing Japan in nominal GDP terms.',
    summaryBn: 'ভারতের জাতীয় আয় ৪.১৮ ট্রিলিয়ন ডলারে পৌঁছে বিশ্বের ৪র্থ বৃহত্তম অর্থনীতির স্বীকৃতি সুপ্রতিষ্ঠিত হলো।',
    keyPoints: [
      'Real GDP growth rate estimated at 6.8%–7.0% for the ongoing financial year.',
      'Per capita income recorded robust increase driven by manufacturing and services exports.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: GDP Calculation & MoSPI',
      points: [
        'Base Year for GDP: 2011-12 (National Statistical Office - NSO under MoSPI).',
        'Top 5 Global Economies: 1. USA ($28T+), 2. China ($18T+), 3. Germany ($4.5T), 4. India ($4.18T), 5. Japan ($4.1T).'
      ]
    },
    examRelevance: 'WBCS Mains Paper V (Indian Economy), SSC CGL.'
  },
  {
    id: 'econ-2026-02-rbi-mpc-repo',
    day: 8,
    dateStr: 'January 2026',
    category: 'economy_banking',
    categoryLabel: '💰 Monetary Policy',
    title: 'RBI Monetary Policy Committee (MPC) Maintains Benchmark Policy Repo Rate at 6.50%',
    titleBn: 'আরবিআই মুদ্রা নীতি কমিটি (MPC) রেপো রেট ৬.৫০% অপরিবর্তিত রাখল',
    summary: 'RBI Governor-led MPC unanimously maintained withdrawal of accommodation stance to align CPI inflation with the 4% target.',
    summaryBn: 'মুদ্রাস্ফীতি নিয়ন্ত্রণ ও অর্থনৈতিক প্রবৃদ্ধি বজায় রাখতে আরবিআই নীতিগত সুদের হার অপরিবর্তিত রাখল।',
    keyPoints: [
      'Policy Rates: Repo Rate = 6.50%, Standing Deposit Facility (SDF) = 6.25%, Marginal Standing Facility (MSF) = 6.75%.',
      'CPI Retail Inflation target fixed at 4% with a tolerance band of +/- 2% (2% to 6%).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Monetary Policy Committee (MPC)',
      points: [
        'Constituted under: Section 45ZB of the Reserve Bank of India Act, 1934 (amended in 2016).',
        'Composition: 6 Members (3 from RBI including Governor as Chairperson, 3 appointed by Central Govt).',
        'Quorum: Minimum 4 members; Governor has casting vote in case of tie.'
      ]
    },
    examRelevance: 'Guaranteed 2 questions in WBCS Prelims & Mains (Banking).'
  },
  {
    id: 'econ-2026-03-sebi-t0-settlement',
    day: 15,
    dateStr: 'January 2026',
    category: 'economy_banking',
    categoryLabel: '💰 Capital Markets',
    title: 'SEBI Operationalizes Optional Same-Day "T+0" Settlement for Equity Cash Segment',
    titleBn: 'শেয়ার বাজারে সেবি (SEBI) দ্বারা একই দিনে লেনদেন নিষ্পত্তি "T+0" চালু',
    summary: 'Securities and Exchange Board of India (SEBI) enabled optional T+0 settlement alongside standard T+1 cycle for top 500 liquid stocks.',
    summaryBn: 'শেয়ার লেনদেনের একই দিনে টাকা ও শেয়ারের হস্তান্তর সম্পন্ন করার আধুনিক টি+০ ব্যবস্থা কার্যকর হলো।',
    keyPoints: [
      'Eliminates clearing risk and releases capital instantly for retail investors.',
      'Precursor to instantaneous real-time settlement on blockchain/UPI architecture.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: SEBI & Stock Exchanges',
      points: [
        'SEBI Established: 12 April 1988; Statutory status on 30 Jan 1992 via SEBI Act, 1992 | HQ: Mumbai.',
        'BSE (Bombay Stock Exchange): Established in 1875 (Asia\'s oldest exchange).',
        'NSE (National Stock Exchange): Established in 1992 (Nifty 50 index).'
      ]
    },
    examRelevance: 'WBCS Economy & Banking Awareness.'
  },
  {
    id: 'econ-2026-04-vibrant-gujarat-gift',
    day: 10,
    dateStr: '10–12 January 2026',
    category: 'economy_banking',
    categoryLabel: '💰 Investment Summits',
    title: 'Vibrant Gujarat Global Summit in Gandhinagar Unveils Multi-Billion Dollar GIFT City Accords',
    titleBn: 'গান্ধীনগরে ভাইব্র্যান্ট গুজরাট বিশ্ব সম্মেলনে গিফট সিটিতে মেগা বিনিয়োগ চুক্তি',
    summary: 'Global financial institutions, sovereign funds, and semiconductor giants signed strategic MoUs at Gujarat International Finance Tec-City (GIFT City).',
    summaryBn: 'আন্তর্জাতিক আর্থিক প্রযুক্তি কেন্দ্র গিফট সিটিতে লক্ষ কোটি টাকার বিদেশী বিনিয়োগ চুক্তি সম্পন্ন হলো।',
    keyPoints: [
      'GIFT City is India\'s first operational smart city and International Financial Services Centre (IFSC).',
      'Regulated by unified regulator IFSCA (International Financial Services Centres Authority).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: IFSCA & Special Economic Zones',
      points: [
        'IFSCA: Statutory authority established under IFSCA Act, 2019 | HQ: GIFT City, Gandhinagar.',
        'SEZ Act, 2005: Governs export-oriented Special Economic Zones in India.'
      ]
    },
    examRelevance: 'WBCS Economy & Infrastructure.'
  },
  {
    id: 'econ-2026-05-direct-tax-record',
    day: 11,
    dateStr: 'January 2026',
    category: 'economy_banking',
    categoryLabel: '💰 Fiscal Policy & Revenue',
    title: 'Gross Direct Tax Collections Cross ₹17.18 Lakh Crore Milestone',
    titleBn: 'কেন্দ্রীয় সরকারের প্রত্যক্ষ কর আদায় ₹১৭.১৮ লক্ষ কোটি টাকার রেকর্ড অতিক্রম',
    summary: 'Central Board of Direct Taxes (CBDT) reported a 16.8% YoY growth in gross direct tax collections driven by corporate and personal income taxes.',
    summaryBn: 'আয়কর ও কর্পোরেট কর আদায়ে অভূতপূর্ব বৃদ্ধি লক্ষ্য করা গেছে।',
    keyPoints: [
      'Net direct tax collections accounted for over 80% of total budget estimates.',
      'Reflects widened tax base and faceless digital e-assessment compliance.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: CBDT & Direct Taxes',
      points: [
        'CBDT: Statutory authority functioning under Central Board of Revenue Act, 1963 within Department of Revenue (MoF).',
        'Direct Taxes in India: Income Tax, Corporate Tax, Securities Transaction Tax (STT).'
      ]
    },
    examRelevance: 'WBCS Fiscal Economics & Budget Basics.'
  },
  {
    id: 'econ-2026-06-upi-monthly-record',
    day: 2,
    dateStr: 'January 2026',
    category: 'economy_banking',
    categoryLabel: '💰 Digital Payments',
    title: 'UPI Records All-Time High of 12.02 Billion Monthly Transactions Worth ₹18.23 Lakh Crore',
    titleBn: 'ইউপিআই (UPI) লেনদেনে সর্বকালের রেকর্ড: মাসে ১২.০২ বিলিয়ন লেনদেন',
    summary: 'National Payments Corporation of India (NPCI) reported unprecedented volume in monthly UPI settlements, reinforcing India\'s digital dominance.',
    summaryBn: 'ন্যাশনাল পেমেন্টস কর্পোরেশন অফ ইন্ডিয়ার তথ্যে ডিজিটাল পেমেন্টে নতুন ঐতিহাসিক রেকর্ড তৈরি হলো।',
    keyPoints: [
      'UPI accounts for over 75% of total retail digital payment transaction volume in India.',
      'Global linkages operationalized in UAE, Singapore, France, Mauritius, and Sri Lanka.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: NPCI & Digital Public Infrastructure',
      points: [
        'NPCI: Umbrella organisation incorporated in 2008 under Payment and Settlement Systems Act, 2007 (initiative of RBI and IBA).',
        'Products of NPCI: UPI, IMPS, RuPay, NETC FASTag, AePS, NACH, Bharat BillPay.'
      ]
    },
    examRelevance: 'WBCS Economy, WBPSC Clerkship, Banking.'
  },
  {
    id: 'econ-2026-07-nse-derivatives-rank',
    day: 17,
    dateStr: 'January 2026',
    category: 'economy_banking',
    categoryLabel: '💰 Financial Exchanges',
    title: 'NSE Retains World\'s Largest Derivative Exchange Ranking for 5th Consecutive Year',
    titleBn: 'টানা ৫ম বছর বিশ্বের বৃহত্তম ডেরিভেটিভস এক্সচেঞ্জের খেতাব ধরে রাখল এনএসই (NSE)',
    summary: 'Futures Industry Association (FIA) confirmed National Stock Exchange of India (NSE) as the #1 derivative exchange worldwide by contract trading volume.',
    summaryBn: 'আন্তর্জাতিক ফিউচার্স ইন্ডাস্ট্রি অ্যাসোসিয়েশনের সমীক্ষায় ন্যাশনাল স্টক এক্সচেঞ্জ বিশ্বসেরা স্থান অধিকার করেছে।',
    keyPoints: [
      'NSE also ranked 3rd globally in equity segment by number of trades.',
      'Benchmark Index: NIFTY 50 (introduced in 1996).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Capital Market Regulators & Indices',
      points: [
        'NSE Established: 1992 on recommendation of Pherwani Committee.',
        'Key Global Stock Indices: S&P 500 (USA), FTSE 100 (UK), Nikkei 225 (Japan), Hang Seng (Hong Kong), DAX (Germany).'
      ]
    },
    examRelevance: 'WBCS Economy & SSC CGL.'
  },
  {
    id: 'econ-2026-08-rbi-sro-fintech',
    day: 15,
    dateStr: 'January 2026',
    category: 'economy_banking',
    categoryLabel: '💰 Fintech Regulation',
    title: 'RBI Releases Comprehensive Framework for Self-Regulatory Organisations in Fintech (SRO-FT)',
    titleBn: 'ফিনটেক সেক্টরে স্ব-নিয়ন্ত্রক সংস্থা গঠনের খসড়া নির্দেশিকা প্রকাশ করল আরবিআই',
    summary: 'RBI issued final norms for recognizing industry-led SROs to set ethical standards, customer protection norms, and grievance redressal in fintech.',
    summaryBn: 'ভারতীয় রিজার্ভ ব্যাংক আর্থিক প্রযুক্তি সংস্থাগুলির সুশাসন ও গ্রাহক সুরক্ষায় এসআরও কাঠামো প্রকাশ করেছে।',
    keyPoints: [
      'SRO-FT must be representative of the fintech sector and operate as non-profit Section 8 companies.',
      'Aims to balance innovation in digital lending, neo-banking, and payments with consumer data privacy.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: RBI Structure & Functions',
      points: [
        'Established: 1 April 1935 under RBI Act, 1934 on recommendation of Hilton Young Commission.',
        'Nationalised: 1 January 1949.',
        '1st Governor: Sir Osborne Smith | 1st Indian Governor: C.D. Deshmukh.'
      ]
    },
    examRelevance: 'WBCS Banking & Economy, UPSC GS III.'
  },
  {
    id: 'econ-2026-09-narcl-bad-bank',
    day: 5,
    dateStr: 'January 2026',
    category: 'economy_banking',
    categoryLabel: '💰 NPA Resolution & Bad Bank',
    title: 'NARCL Resolves Major Stressed Corporate Assets via Swiss Challenge Mechanism',
    titleBn: 'ব্যাড ব্যাংক নারক্ল (NARCL) দ্বারা বৃহৎ খেলাপি ঋণ উদ্ধার প্রক্রিয়া জোরদার',
    summary: 'National Asset Reconstruction Company Ltd (NARCL) acquired and initiated resolution of large NPA accounts backed by Government of India sovereign guarantee.',
    summaryBn: 'ভারতের সরকারি ব্যাড ব্যাংক বৃহৎ অনাদায়ী ঋণ অধিগ্রহণ ও নিষ্পত্তির কাজ এগিয়ে নিয়ে চলেছে।',
    keyPoints: [
      'NARCL (Bad Bank) set up to aggregate and consolidate stressed debt above ₹500 Crore from public sector banks.',
      'Works alongside IDRCL (India Debt Resolution Company Ltd) for asset turnaround and liquidation.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Non-Performing Assets (NPA) & SARFAESI Act',
      points: [
        'NPA Definition: An asset where interest or principal remains overdue for 90 days.',
        'SARFAESI Act, 2002: Allows banks to auction commercial or residential properties without court intervention.',
        'IBC 2016: Insolvency and Bankruptcy Code (NCLT handles corporate insolvency).'
      ]
    },
    examRelevance: 'WBCS Mains Paper V (Banking & NPAs).'
  },
  {
    id: 'econ-2026-10-sebi-insider-trading',
    day: 24,
    dateStr: 'January 2026',
    category: 'economy_banking',
    categoryLabel: '💰 Market Integrity',
    title: 'SEBI Strengthens Surveillance Norms on Insider Trading & Unregulated Financial Influencers',
    titleBn: 'শেয়ার বাজারে বেআইনি ইনসাইডার ট্রেডিং ও ভুয়া পরামর্শ রুখতে সেবির কড়া পদক্ষেপ',
    summary: 'SEBI intensified algorithmic inspection on undisclosed trading and banned unregistered finfluencers from profit-sharing with regulated brokers.',
    summaryBn: 'পুঁজিবাজারে বিনিয়োগকারীদের স্বার্থ রক্ষায় সেবি নতুন কড়া নজরদারি রূপরেখা কার্যকর করল।',
    keyPoints: [
      'Mandates digital audit trails of UPSI (Unpublished Price Sensitive Information).',
      'Protects retail investors against pump-and-dump schemes on social media.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: SEBI (PIT) Regulations',
      points: [
        'SEBI (Prohibition of Insider Trading) Regulations, 2015: Governs unfair trading practices.',
        'SAT (Securities Appellate Tribunal): Statutory body hearing appeals against SEBI orders | Location: Mumbai.'
      ]
    },
    examRelevance: 'WBCS Economy & Business Ethics.'
  },

  // =========================================================================
  // 6. DEFENSE, NAVAL OPERATIONS & STRATEGIC MISSILES (12 EVENTS)
  // =========================================================================
  {
    id: 'def-2026-01-marcos-rescue',
    day: 5,
    dateStr: 'January 2026',
    category: 'defense_navy',
    categoryLabel: '⚓ Anti-Piracy Naval Operations',
    title: 'Indian Navy MARCOS Storm Hijacked Vessel in North Arabian Sea, Rescuing All Crew',
    titleBn: 'উত্তর আরব সাগরে ভারতীয় নৌবাহিনীর মার্কোস কমান্ডোদের সফল জলদস্যু দমন অভিযান',
    summary: 'Guided missile destroyer INS Chennai and Marine Commandos (MARCOS) intercepted hijacked bulk carrier in Arabian Sea, rescuing all crew members safely.',
    summaryBn: 'আরব সাগরে জলদস্যুদের কবলে পড়া জাহাজ থেকে ভারতীয় নৌবাহিনীর কমান্ডোরা সমস্ত নাবিককে নিরাপদে উদ্ধার করল।',
    keyPoints: [
      'Demonstrated India\'s role as the Net Security Provider and first responder in the Indian Ocean Region (IOR).',
      'Anti-piracy operations reinforced under Maritime Anti-Piracy Act, 2022.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: MARCOS & Indian Navy Commands',
      points: [
        'MARCOS (Marine Commandos): Special forces unit of Indian Navy raised in 1987 (Motto: "The Few, The Fearless").',
        'Indian Navy Commands: Western Naval Command (Mumbai), Eastern Naval Command (Visakhapatnam), Southern Naval Command (Kochi - Training).',
        'Tri-Services Command: Andaman and Nicobar Command (Port Blair, established 2001).'
      ]
    },
    examRelevance: 'WBCS Defense, WBP SI, Kolkata Police.'
  },
  {
    id: 'def-2026-02-ins-sumitra-rescue',
    day: 29,
    dateStr: 'January 2026',
    category: 'defense_navy',
    categoryLabel: '⚓ Naval Rescues',
    title: 'INS Sumitra Rescues Crew from Armed Somali Pirates off East Coast of Somalia',
    titleBn: 'সোমালিয়া উপকূলে সশস্ত্র জলদস্যুদের হাত থেকে নাবিকদের উদ্ধার করল আইএনএস সুমিত্রা',
    summary: 'Naval offshore patrol vessel INS Sumitra carried out successful back-to-back anti-piracy operations in the Gulf of Aden, freeing hijacked fishing trawlers.',
    summaryBn: 'এডেন উপসাগরে জলদস্যুদের ঘিরে ফেলে রণতরী আইএনএস সুমিত্রা সফল উদ্ধার অভিযান চালায়।',
    keyPoints: [
      'Deployed under Operation Sankalp ensuring maritime sea-lane security.',
      'P-8I Poseidon maritime patrol aircraft provided real-time aerial reconnaissance.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Gulf of Aden & Strategic Straits',
      points: [
        'Bab-el-Mandeb Strait: Connects Red Sea to Gulf of Aden (separates Yemen in Arabian Peninsula from Djibouti/Eritrea in Horn of Africa); known as "Gate of Tears".',
        'Suez Canal: Connects Mediterranean Sea to Red Sea (opened 1869).'
      ]
    },
    examRelevance: 'WBCS World Geography & Defense.'
  },
  {
    id: 'def-2026-03-ex-desert-cyclone',
    day: 2,
    dateStr: '02–15 January 2026',
    category: 'defense_navy',
    categoryLabel: '⚓ Joint Military Exercises',
    title: 'Exercise "Desert Cyclone": India-UAE Joint Military Drills in Mahajan, Rajasthan',
    titleBn: 'ভারত ও সংযুক্ত আরব আমিরশাহির যৌথ সামরিক মহড়া "মরু সাইক্লোন" (রাজস্থান)',
    summary: 'Inaugural edition of joint military exercise between Indian Army and UAE Land Forces conducted at Mahajan Field Firing Ranges.',
    summaryBn: 'রাজস্থানের মহাজনে ভারত ও ইউএই স্থলবাহিনীর মধ্যে মরুভূমির প্রতিকূল পরিবেশে বিশেষ যৌথ মহড়া অনুষ্ঠিত হয়।',
    keyPoints: [
      'Focus on interoperability in desert warfare, urban operations, and counter-terrorist operations under UN mandate.',
      'Indian contingent represented by Mechanised Infantry Regiment.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Joint Military Exercises of India',
      points: [
        'India-UAE Other Exercises: Zayed Talwar (Naval), Desert Flag (Air Force).',
        'India-Oman: Al Najah (Army), Eastern Bridge (Air Force), Naseem Al Bahr (Navy).',
        'India-Qatar: Zair-Al-Bahr (Navy).'
      ]
    },
    examRelevance: 'Guaranteed question in all 2026 WBPSC & Police SI exams.'
  },
  {
    id: 'def-2026-04-ex-sada-tanseeq',
    day: 29,
    dateStr: '29 Jan – 10 Feb 2026',
    category: 'defense_navy',
    categoryLabel: '⚓ Joint Military Exercises',
    title: 'Exercise "Sada Tanseeq": India-Saudi Arabia Joint Army Drills in Rajasthan',
    titleBn: 'ভারত ও সৌদি আরবের প্রথম যৌথ সেনা মহড়া "সদা তানসিক" (রাজস্থান)',
    summary: 'Inaugural joint military exercise between Indian Army and Royal Saudi Land Forces held in Mahajan, Rajasthan.',
    summaryBn: 'ভারত ও সৌদি আরব স্থলবাহিনীর ঐতিহাসিক প্রথম যৌথ মহড়া রাজস্থানে সম্পন্ন হলো।',
    keyPoints: [
      'Indian contingent represented by Brigade of The Guards (Mechanised Infantry).',
      'Focused on sub-conventional operations, joint cordon and search drills in semi-arid terrain.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: India-Saudi Arabia Defence Ties',
      points: [
        'Al-Mohed Al-Hindi: Bilateral naval exercise between Indian Navy and Royal Saudi Naval Force.',
        'Capital of Saudi Arabia: Riyadh | Currency: Saudi Riyal (SAR).'
      ]
    },
    examRelevance: 'WBCS Defense & SSC CGL.'
  },
  {
    id: 'def-2026-05-ex-sahyog-kaijin',
    day: 8,
    dateStr: '08–12 January 2026',
    category: 'defense_navy',
    categoryLabel: '⚓ Coast Guard Drills',
    title: 'Exercise "Sahyog Kaijin": Indian & Japan Coast Guards Conduct Joint Drills off Chennai',
    titleBn: 'ভারত ও জাপানের উপকূলরক্ষী বাহিনীর যৌথ মহড়া "সহযোগ কাইজিন" (চেন্নাই উপকূল)',
    summary: 'Indian Coast Guard (ICG) and Japan Coast Guard (JCG) conducted their joint maritime search and rescue (SAR) and anti-piracy exercise off the coast of Chennai, Tamil Nadu.',
    summaryBn: 'চেন্নাই উপকূলে ভারত ও জাপানের উপকূলরক্ষী বাহিনীর মধ্যে সমুদ্র নিরাপত্তা ও উদ্ধার মহড়া সম্পন্ন হলো।',
    keyPoints: [
      'ICG Ship Shaunak and JCG Ship Yashima participated in cross-deck helicopter landings.',
      'Strengthens bilateral cooperation under Indo-Pacific maritime security architecture.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Indian Coast Guard & India-Japan Exercises',
      points: [
        'Indian Coast Guard (ICG): Established on 1 Feb 1977 via Coast Guard Act, 1978 (Motto: "Vayam Rakshamah" - We Protect) under Ministry of Defence.',
        'India-Japan Other Exercises: JIMEX (Navy), Dharma Guardian (Army), Veer Guardian (Air Force), Shinyuu Maitri (Air Force), Malabar (Multilateral Quad Navy).'
      ]
    },
    examRelevance: 'WBCS Prelims & Police SI.'
  },
  {
    id: 'def-2026-06-ex-ayutthaya',
    day: 15,
    dateStr: 'January 2026',
    category: 'defense_navy',
    categoryLabel: '⚓ Bilateral Naval Drills',
    title: 'Exercise "Ayutthaya": Indian Navy & Royal Thai Navy Bilateral Maritime Drills',
    titleBn: 'ভারত ও থাইল্যান্ড নৌবাহিনীর দ্বিপাক্ষিক মহড়া "এক্স-অযোধ্যা" (Ayutthaya)',
    summary: 'Inaugural bilateral naval exercise named "Ex-Ayutthaya" connecting historical cultural linkages between Ayodhya in India and Ayutthaya in Thailand.',
    summaryBn: 'ঐতিহাসিক ও সাংস্কৃতিক যোগসূত্রকে সামনে রেখে ভারত ও থাইল্যান্ডের নৌবাহিনীর মধ্যে যৌথ মহড়া অনুষ্ঠিত হলো।',
    keyPoints: [
      'Conducted alongside 36th edition of India-Thailand Coordinated Patrol (Indo-Thai CORPAT).',
      'Indigenously built missile corvette INS Kulish and patrol vessel participated.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: India-Thailand Relations & Exercises',
      points: [
        'Maitree: Joint Army exercise between India and Thailand.',
        'Siam Bharat: Joint Air Force exercise between India and Thailand.',
        'Strait of Malacca: Critical chokepoint between Malay Peninsula and Indonesian island of Sumatra.'
      ]
    },
    examRelevance: 'WBCS GS Paper IV & International Relations.'
  },
  {
    id: 'def-2026-07-ex-cyclone-egypt',
    day: 22,
    dateStr: '22 Jan – 01 Feb 2026',
    category: 'defense_navy',
    categoryLabel: '⚓ Special Forces Drills',
    title: 'Exercise "Cyclone": India-Egypt Special Forces Drills Conducted in Anshas, Egypt',
    titleBn: 'মিশরের আনশাসে ভারত ও মিশরের স্পেশাল ফোর্সের যৌথ মহড়া "সাইক্লোন"',
    summary: 'Second edition of joint special forces exercise between Indian Army Parachute Regiment (Special Forces) and Egyptian Special Forces.',
    summaryBn: 'মিশরে ভারতীয় প্যারা স্পেশাল ফোর্স ও মিশরীয় কমান্ডোদের যৌথ সামরিক মহড়া অনুষ্ঠিত হলো।',
    keyPoints: [
      'Focused on special operations in desert terrain, counter-terrorist room intervention, and sniper marksmanship.',
      '1st edition was held in Jaisalmer, Rajasthan.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: India-Egypt Relations & Strategic Ties',
      points: [
        'Bright Star: Multilateral tri-services exercise hosted by Egypt at Cairo.',
        'Suez Canal: Nationalised in 1956 by Egyptian President Gamal Abdel Nasser.',
        'River Nile: Longest river in the world, originating from Lake Victoria and draining into Mediterranean Sea.'
      ]
    },
    examRelevance: 'WBCS Defense & UPSC GS III.'
  },
  {
    id: 'def-2026-08-drdo-hypersonic-missile',
    day: 12,
    dateStr: 'January 2026',
    category: 'defense_navy',
    categoryLabel: '⚓ Strategic Missile Technology',
    title: 'DRDO Advances Flight Testing on Mach 6+ Scramjet Hypersonic Propulsion & LR-AShM',
    titleBn: 'ডিআরডিও দ্বারা ম্যাক ৬+ হাইপারসনিক স্ক্র্যামজেট ও দূরপাল্লার অ্যান্টি-শিপ ক্ষেপণাস্ত্র পরীক্ষা',
    summary: 'Defence Research and Development Organisation (DRDO) successfully validated active scramjet engine flight profiles at the Integrated Test Range (ITR), Dr. APJ Abdul Kalam Island, Odisha.',
    summaryBn: 'ওড়িশার ডঃ এপিজে আব্দুল কালাম দ্বীপ থেকে দূরপাল্লার হাইপারসনিক ক্ষেপণাস্ত্রের সফল প্রযুক্তি পরীক্ষা চালানো হলো।',
    keyPoints: [
      'Hypersonic flight exceeds Mach 5 (5 times the speed of sound, ~6,174 km/h) with extreme maneuverability.',
      'Long-Range Anti-Ship Missile (LR-AShM) designed for Indian Navy to neutralize capital warships at standoff ranges.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Missile Testing Sites & DRDO Laboratories',
      points: [
        'Dr. APJ Abdul Kalam Island (Wheeler Island): Located off the coast of Bhadrak, Odisha in Bay of Bengal.',
        'ITR Chandipur: Located in Balasore, Odisha.',
        'Integrated Guided Missile Development Programme (IGMDP): Launched in 1983 by Dr. APJ Abdul Kalam (PATNA: Prithvi, Agni, Trishul, Nag, Akash).'
      ]
    },
    examRelevance: 'WBCS Science & Technology (Defense), SSC CGL.'
  },
  {
    id: 'def-2026-09-akash-ng-flight-test',
    day: 12,
    dateStr: 'January 2026',
    category: 'defense_navy',
    categoryLabel: '⚓ Surface-to-Air Missiles',
    title: 'DRDO Conducts Successful Flight-Test of New Generation Akash (Akash-NG) Missile',
    titleBn: 'নতুন প্রজন্মের আকাশ (Akash-NG) ক্ষেপণাস্ত্রের সফল উৎক্ষেপণ সম্পন্ন',
    summary: 'New Generation Surface-to-Air Missile (Akash-NG) intercepted a high-speed unmanned aerial target at very low altitude off the coast of Odisha.',
    summaryBn: 'ওড়িশার উপকূলে শত্রুপক্ষের যুদ্ধবিমান ও ড্রোন ধ্বংসকারী নতুন প্রজন্মের আকাশ ক্ষেপণাস্ত্র সফলভাবে পরীক্ষিত হলো।',
    keyPoints: [
      'Multi-function Active Electronically Scanned Array (AESA) radar and indigenous RF seeker enable multi-target interception up to 70 km.',
      'Dual-pulse solid rocket motor provides superior maneuverability against maneuvering stealth fighters.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Air Defence Systems of India',
      points: [
        'Air Defence Missiles of India: Akash (Short Range SAM), MR-SAM / Barak-8 (Medium Range, joint with Israel), S-400 Triumf (Long Range, Russia), Samar (Short Range).',
        'Project Kusha: DRDO programme developing indigenous Long-Range Air Defence System (LR-SAM, 350 km).'
      ]
    },
    examRelevance: 'WBCS Science & Tech, WBP SI.'
  },
  {
    id: 'def-2026-10-ins-imphal-commissioned',
    day: 26,
    dateStr: 'January 2026',
    category: 'defense_navy',
    categoryLabel: '⚓ Indigenous Warships',
    title: 'Project 15B Stealth Destroyer INS Imphal Showcases BrahMos Firing Capabilities',
    titleBn: 'প্রজেক্ট ১৫বি-র অত্যাধুনিক স্টেলথ রণতরী আইএনএস ইম্ফল থেকে ব্রহ্মোস মিসাইল পরীক্ষা',
    summary: 'Pennant D68 guided-missile destroyer INS Imphal (built by Mazagon Dock Shipbuilders Ltd) successfully demonstrated extended-range BrahMos supersonic missile strikes.',
    summaryBn: 'মাজগাঁও ডকে তৈরি ভারতীয় নৌবাহিনীর সর্বাধুনিক যুদ্ধজাহাজ আইএনএস ইম্ফল রণসজ্জায় যুক্ত হলো।',
    keyPoints: [
      'First capital warship named after a city in Northeast India (Imphal, capital of Manipur).',
      'Over 75% indigenous content equipped with anti-submarine rocket launchers and Barak-8 SAMs.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Project 15B Visakhapatnam-class Destroyers',
      points: [
        '4 Project 15B Ships: 1. INS Visakhapatnam (D66), 2. INS Mormugao (D67), 3. INS Imphal (D68), 4. INS Surat (D69).',
        'Mazagon Dock Shipbuilders Ltd (MDL): Premier shipyard in Mumbai (established 1934; nationalised in 1960).'
      ]
    },
    examRelevance: 'WBCS Mains GS II & Defense.'
  },
  {
    id: 'def-2026-11-op-sarvashakti-jk',
    day: 13,
    dateStr: 'January 2026',
    category: 'defense_navy',
    categoryLabel: '⚓ Internal Security',
    title: 'Indian Army Launches "Operation Sarvashakti" in Pir Panjal Mountain Ranges of J&K',
    titleBn: 'জম্মু-কাশ্মীরের পীর পাঞ্জাল পর্বতমালায় ভারতীয় সেনার "অপারেশন সর্বশক্তি"',
    summary: 'Indian Army operationalized joint counter-terrorist offensive along Rajouri-Poonch sector on both sides of Pir Panjal range to neutralize cross-border infiltrators.',
    summaryBn: 'রাজৌরি ও পুঞ্চ অঞ্চলে জঙ্গি অনুপ্রবেশ রুখতে ভারতীয় সেনা এই বিশেষ চিরুনি অভিযান শুরু করেছে।',
    keyPoints: [
      'Modelled on the lines of 2003 "Operation Sarp Vinash" to clear forested mountain hideouts.',
      'Jointly executed by Northern Command and Western Command alongside J&K Police and CRPF.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Pir Panjal Range & Himalayan Geography',
      points: [
        'Pir Panjal Range: Largest range of Lesser Himalayas (Middle Himalayas / Himachal).',
        'Key Passes in Pir Panjal: Banihal Pass (houses Jawahar Tunnel and Qazigund-Banihal rail tunnel), Pir Panjal Pass, Haji Pir Pass.',
        'Atal Tunnel: 9.02 km tunnel under Rohtang Pass in Pir Panjal range connecting Manali to Lahaul-Spiti.'
      ]
    },
    examRelevance: 'WBCS Geography & Internal Security, WBP Police SI.'
  },
  {
    id: 'def-2026-12-nato-steadfast-defender',
    day: 18,
    dateStr: 'January 2026',
    category: 'defense_navy',
    categoryLabel: '⚓ Global Military Alliances',
    title: 'NATO Launches "Steadfast Defender 2026": Largest Military Exercise in Europe Since Cold War',
    titleBn: 'ঠাণ্ডা যুদ্ধের পর ইউরোপে ন্যাটোর বৃহত্তম সামরিক মহড়া "স্টেডফাস্ট ডিফেন্ডার ২০২৬"',
    summary: 'North Atlantic Treaty Organization (NATO) mobilized 90,000 troops across Baltic and Nordic countries to test collective defense readiness under Article 5.',
    summaryBn: 'ইউরোপে ৯০,০০০ সেনার অংশগ্রহণে ন্যাটোর সর্ববৃহৎ সামরিক মহড়া শুরু হলো।',
    keyPoints: [
      'All 32 NATO member states (including Finland and Sweden) participated with 50+ naval vessels and 80+ fighter aircraft.',
      'Simulates wartime reinforcement of European eastern flank along the Suwalki Gap.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: NATO (North Atlantic Treaty Organization)',
      points: [
        'Formed: 4 April 1949 via Washington Treaty | HQ: Brussels, Belgium.',
        'Article 5: Principle of collective defense (an attack against one is an attack against all).',
        'Recent Members: Finland (31st member, 2023) and Sweden (32nd member, 2024).'
      ]
    },
    examRelevance: 'WBCS World Affairs & UPSC GS II.'
  },

  // =========================================================================
  // 7. SPACE & FRONTIER SCIENCE (10 EVENTS)
  // =========================================================================
  {
    id: 'space-2026-01-aditya-l1-halo',
    day: 6,
    dateStr: 'January 2026',
    category: 'space_science',
    categoryLabel: '🚀 Solar Physics & Space Exploration',
    title: 'ISRO\'s Aditya-L1 Spacecraft Celebrates Continuous Solar Observations at Sun-Earth L1',
    titleBn: 'সূর্য-পৃথিবীর এল১ হ্যালো কক্ষপথে ইসরোর আদিত্য-এল১ উপগ্রহের নিরবচ্ছিন্ন পর্যবেক্ষণ',
    summary: 'India\'s maiden solar observatory Aditya-L1 completed full scientific cycles orbiting Lagrangian Point 1 (L1), 1.5 million km from Earth.',
    summaryBn: '১৫ লক্ষ কিমি দূরে অবস্থিত ল্যাগ্রাঞ্জ পয়েন্ট ১-এ ইসরোর আদিত্য-এল১ সফলভাবে সৌর ঝড় ও করোনার তথ্য সংগ্রহ করছে।',
    keyPoints: [
      'Carries 7 indigenous payloads including VELC (Visible Emission Line Coronagraph) and SUIT (Solar Ultraviolet Imaging Telescope).',
      'Continuous uninterrupted view of the Sun without any occultation or eclipses.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Lagrange Points & Solar Science',
      points: [
        'Lagrange Points: 5 points (L1, L2, L3, L4, L5) where gravitational pull of two large masses equals centripetal force required for a small object to move with them.',
        'Sun Structure: Core -> Radiative Zone -> Convective Zone -> Photosphere (visible surface) -> Chromosphere -> Corona (outermost hot atmosphere).'
      ]
    },
    examRelevance: 'WBCS Science & Technology, All Competitive Exams.'
  },
  {
    id: 'space-2026-02-jaxa-slim-landing',
    day: 19,
    dateStr: 'January 2026',
    category: 'space_science',
    categoryLabel: '🚀 Lunar Exploration',
    title: 'Japan JAXA\'s SLIM "Moon Sniper" Analyzes Olivine Rocks on Lunar Crater Shioli',
    titleBn: 'জাপানের স্মার্ট ল্যান্ডার (SLIM) চাঁদের বুকে পিনপয়েন্ট অবতরণ ও গবেষণা',
    summary: 'Japan Aerospace Exploration Agency (JAXA) confirmed Smart Lander for Investigating Moon (SLIM) achieved historic pinpoint landing within 55 meters of target.',
    summaryBn: 'জাপান বিশ্বের পঞ্চম দেশ হিসেবে চাঁদের বুকে নিখুঁত ল্যান্ডিং সম্পন্ন করে ইতিহাস সৃষ্টি করল।',
    keyPoints: [
      'Japan became the 5th nation to soft-land on the Moon (after USSR, USA, China, and India).',
      'Deployed two micro-rovers: LEV-1 (hopping robot) and LEV-2 / SORA-Q (transformable baseball-sized rover).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Global Moon Landing Milestones',
      points: [
        '5 Nations on Moon: 1. USSR (Luna 9, 1966), 2. USA (Apollo 11, 1969), 3. China (Chang\'e 3, 2013), 4. India (Chandrayaan-3, 23 Aug 2023 - 1st near South Pole), 5. Japan (SLIM, Jan 2024/2026).',
        'National Space Day of India: 23 August (commemorating Chandrayaan-3 landing at Shiv Shakti Point).'
      ]
    },
    examRelevance: 'WBCS Prelims Science & SSC CGL.'
  },
  {
    id: 'space-2026-03-china-einstein-probe',
    day: 9,
    dateStr: 'January 2026',
    category: 'space_science',
    categoryLabel: '🚀 X-Ray Astrophysics',
    title: 'China Launches "Einstein Probe" X-Ray Satellite with Lobster-Eye Optics',
    titleBn: 'চিন দ্বারা চিংড়ি মাছের চোখের অনুকরণে তৈরি এক্স-রে স্যাটেলাইট "আইনস্টাইন প্রোব" উৎক্ষেপণ',
    summary: 'Chinese Academy of Sciences (CAS) in collaboration with ESA launched Einstein Probe (EP) on Long March-2C rocket from Xichang Satellite Launch Center.',
    summaryBn: 'মহাকাশে কৃষ্ণগহ্বর ও সুপারনোভা বিস্ফোরণ পর্যবেক্ষণে চিংড়ি মাছের চোখের আদলে তৈরি দূরবীন উৎক্ষেপণ করল চিন।',
    keyPoints: [
      'Features Wide-field X-ray Telescope (WXT) with Micro-pore Optics inspired by the compound eyes of lobsters.',
      'Captures transient high-energy cosmic events, gamma-ray bursts, and tidal disruption of stars by supermassive black holes.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Major Space Telescopes',
      points: [
        'James Webb Space Telescope (JWST): Launched 25 Dec 2021 by NASA/ESA/CSA at Sun-Earth L2.',
        'Hubble Space Telescope: Launched 1990 in Low Earth Orbit.',
        'AstroSat: India\'s first dedicated multi-wavelength space observatory launched in 2015 by ISRO.'
      ]
    },
    examRelevance: 'WBCS Science & Technology, UPSC Prelims.'
  },
  {
    id: 'space-2026-04-iit-madras-srilanka',
    day: 10,
    dateStr: 'January 2026',
    category: 'space_science',
    categoryLabel: '🚀 International Higher Education',
    title: 'IIT Madras Opens 2nd International Campus in Kandy, Sri Lanka',
    titleBn: 'শ্রীলঙ্কার ক্যান্ডিতে আইআইটি মাদ্রাজের দ্বিতীয় আন্তর্জাতিক ক্যাম্পাস স্থাপন',
    summary: 'Following its first overseas campus in Zanzibar (Tanzania), IIT Madras operationalized its Kandy campus in Sri Lanka under bilateral educational pact.',
    summaryBn: 'জাঞ্জিবারের পর এবার শ্রীলঙ্কার ক্যান্ডিতে আইআইটি মাদ্রাজের নতুন আন্তর্জাতিক ক্যাম্পাস চালু হলো।',
    keyPoints: [
      'Supported by Sri Lankan Ministry of Education offering degrees in Data Science, AI, and Engineering.',
      'IIT Delhi also operationalized its international campus in Abu Dhabi, UAE.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: History of IITs in India',
      points: [
        '1st IIT in India: IIT Kharagpur (established in May 1950 in West Bengal, inaugurated Aug 1951 by Maulana Abul Kalam Azad on site of Hijli Detention Camp).',
        'Sarkar Committee (1946): Recommended establishment of higher technical institutions in India.'
      ]
    },
    examRelevance: 'WBCS Education & West Bengal Pride, Food SI.'
  },
  {
    id: 'space-2026-05-neuralink-human-chip',
    day: 29,
    dateStr: 'January 2026',
    category: 'space_science',
    categoryLabel: '🚀 Neurotechnology & BCI',
    title: 'Neuralink Successfully Implants First Wireless Brain-Computer Interface "Telepathy" in Human',
    titleBn: 'মানুষের মস্তিষ্কে প্রথম ওয়্যারলেস ব্রেন চিপ "টেলিপ্যাথি" প্রতিস্থাপন করল নিউরালিঙ্ক',
    summary: 'Elon Musk\'s neurotechnology company Neuralink performed first human surgical implantation of the N1 brain chip, allowing a quadriplegic patient to control digital devices via thoughts.',
    summaryBn: 'মস্তিষ্কের ভাবনার সাহায্যে কম্পিউটার ও মোবাইল নিয়ন্ত্রণের ঐতিহাসিক চিকিৎসা প্রযুক্তি চালু হলো।',
    keyPoints: [
      'Product named "Telepathy" featuring 1,024 electrodes across 64 ultra-fine threads inserted by a surgical robot.',
      'FDA approved under Investigational Device Exemption (IDE) for patients with cervical spinal cord injury or ALS.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Human Brain Anatomy & Neuroscience',
      points: [
        'Motor Cortex: Located in frontal lobe, responsible for planning and executing voluntary muscle movements.',
        'Neurons: Basic structural and functional unit of the nervous system (~86 billion neurons in human brain).',
        'Synapse: Junction across which nerve impulses pass via neurotransmitters (Dopamine, Serotonin, Acetylcholine).'
      ]
    },
    examRelevance: 'WBCS Biology & General Science, SSC CGL.'
  },
  {
    id: 'space-2026-06-isro-spaceport-tamilnadu',
    day: 20,
    dateStr: 'January 2026',
    category: 'space_science',
    categoryLabel: '🚀 Space Launch Infrastructure',
    title: 'ISRO Finalizes Infrastructure for India\'s 2nd Spaceport at Kulasekarapattinam, Tamil Nadu',
    titleBn: 'তামিলনাড়ুর কুলাশেখরপত্তিনমে ভারতের দ্বিতীয় মহাকাশ উৎক্ষেপণ কেন্দ্রের কাজ চূড়ান্ত',
    summary: 'ISRO and Department of Space completed land acquisition for a dedicated spaceport exclusively designed for Small Satellite Launch Vehicle (SSLV) launches.',
    summaryBn: 'ক্ষুদ্র উপগ্রহ উৎক্ষেপণের জন্য তামিলনাড়ুর সমুদ্রতীরে তৈরি হচ্ছে দেশের দ্বিতীয় রকেট বন্দর।',
    keyPoints: [
      'Key Advantage: Direct southward trajectory over Indian Ocean without the need for dogleg maneuver around Sri Lanka, saving valuable rocket fuel.',
      'Spans over 2,233 acres in Thoothukudi (Tuticorin) district, Tamil Nadu.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: ISRO Launch Centers & Facilities',
      points: [
        '1st Spaceport: Satish Dhawan Space Centre (SDSC SHAR) in Sriharikota, Tirupati district, Andhra Pradesh.',
        'TERLS: Thumba Equatorial Rocket Launching Station in Thiruvananthapuram, Kerala (est. 1963; 1st rocket Nike-Apache).',
        'VSSC: Vikram Sarabhai Space Centre in Thiruvananthapuram (develops launch vehicles: PSLV, GSLV, LVM3).'
      ]
    },
    examRelevance: 'WBCS Geography & Science, UPSC Prelims.'
  },
  {
    id: 'space-2026-07-nasa-isro-nisar',
    day: 15,
    dateStr: 'January 2026',
    category: 'space_science',
    categoryLabel: '🚀 Earth Observation',
    title: 'NASA-ISRO SAR (NISAR) Satellite Enters Final Pre-Launch Environmental Verification',
    titleBn: 'নাসা ও ইসরোর যৌথ রাডার উপগ্রহ "নিসার" (NISAR)-এর চূড়ান্ত পরীক্ষা',
    summary: 'The flagship dual-frequency radar earth observation satellite underwent thermal vacuum and acoustic testing at UR Rao Satellite Centre (URSC) in Bengaluru.',
    summaryBn: 'বিশ্বের সবচেয়ে ব্যয়বহুল ও উন্নত যৌথ রাডার উপগ্রহ নিসার উৎক্ষেপণের জন্য প্রস্তুত হচ্ছে।',
    keyPoints: [
      'NISAR uses dual frequency: L-band SAR (built by NASA JPL) and S-band SAR (built by ISRO) on a 12-meter deployable mesh antenna.',
      'Maps Earth\'s entire land and ice-covered surfaces every 12 days to monitor tectonic plate shifts, glaciers, and forest biomass.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: ISRO Centers in India',
      points: [
        'URSC (UR Rao Satellite Centre): Bengaluru, Karnataka (designs and builds Indian satellites).',
        'SAC (Space Applications Centre): Ahmedabad, Gujarat (develops sensor payloads).',
        'NRSC (National Remote Sensing Centre): Hyderabad, Telangana (satellite data dissemination).'
      ]
    },
    examRelevance: 'WBCS Science & Technology, UPSC GS III.'
  },
  {
    id: 'space-2026-08-spacex-starship-ift3',
    day: 24,
    dateStr: 'January 2026',
    category: 'space_science',
    categoryLabel: '🚀 Super-Heavy Rocketry',
    title: 'SpaceX Completes Static Fire for Starship Super Heavy Integrated Flight Test (IFT)',
    titleBn: 'বিশ্বের বৃহত্তম রকেট স্পেসএক্স স্টারশিপের ফুল-স্কেল স্ট্যাটিক ফায়ার সম্পন্ন',
    summary: 'At Starbase in Boca Chica, Texas, SpaceX ignited all 33 Raptor engines on Super Heavy Booster 10, delivering a record 16.7 million pounds of thrust.',
    summaryBn: 'চাঁদ ও মঙ্গল অভিযানের উপযোগী বিশ্বের সবচেয়ে শক্তিশালী রকেট স্টারশিপের ইঞ্জিন পরীক্ষা সম্পন্ন হলো।',
    keyPoints: [
      'Tallest and most powerful launch vehicle ever built (121 meters tall, fully reusable).',
      'Selected by NASA under Artemis III / IV to land astronauts on the lunar South Pole.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Historic Super-Heavy Rockets',
      points: [
        'Saturn V: Apollo Moon rocket (110m tall, 3.4 million kg thrust).',
        'SLS (Space Launch System): NASA\'s deep-space rocket for Artemis missions.',
        'LVM3 (Launch Vehicle Mark-3): ISRO\'s heaviest rocket (43.5m tall, carries 4,000 kg to GTO; "Fat Boy").'
      ]
    },
    examRelevance: 'WBCS General Science & Astronomy.'
  },
  {
    id: 'space-2026-09-peregrine-lunar-mission',
    day: 8,
    dateStr: 'January 2026',
    category: 'space_science',
    categoryLabel: '🚀 Commercial Spaceflight',
    title: 'Peregrine-1 Commercial Lunar Lander Conducts Cislunar Deep-Space Scientific Tests',
    titleBn: 'আমেরিকার প্রথম বাণিজ্যিক চন্দ্রাভিযান পেরেগ্রিন-১ এর মহাকাশ গবেষণা',
    summary: 'Astrobotic\'s Peregrine Mission One launched aboard ULA\'s maiden Vulcan Centaur rocket from Cape Canaveral under NASA\'s CLPS initiative.',
    summaryBn: 'নাসার বাণিজ্যিক চন্দ্র প্রকল্পের অংশ হিসেবে পেরেগ্রিন মহাকাশযান উৎক্ষেপিত হলো।',
    keyPoints: [
      'First launch under NASA Commercial Lunar Payload Services (CLPS) program.',
      'Payloads measured space radiation environment and neutron spectrometry in cislunar space.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: NASA Artemis & CLPS Architecture',
      points: [
        'Artemis Program: NASA-led international initiative to return humans to the Moon (including first woman and person of color).',
        'Artemis Accords: Non-binding principles for peaceful space exploration (India signed as 27th member in June 2023).'
      ]
    },
    examRelevance: 'WBCS Prelims Science & Technology.'
  },
  {
    id: 'space-2026-10-spadex-docking-isro',
    day: 27,
    dateStr: 'January 2026',
    category: 'space_science',
    categoryLabel: '🚀 Space Docking Technology',
    title: 'ISRO Prepares "SPADEX" Twin-Satellite Autonomous In-Orbit Docking Experiment',
    titleBn: 'মহাকাশ স্টেশন নির্মাণের ভিত্তি হিসেবে ইসরোর "স্প্যাডেক্স" (SPADEX) ডকিং প্রযুক্তি প্রস্তুতি',
    summary: 'ISRO advanced mission readiness for Space Docking Experiment (SPADEX) utilizing two microsatellites (Chaser and Target) to demonstrate autonomous rendezvous and mechanical docking.',
    summaryBn: 'মহাকাশে দুটি কৃত্রিম উপগ্রহকে স্বয়ংক্রিয়ভাবে জোড়া লাগানোর জন্য স্প্যাডেক্স পরীক্ষা চূড়ান্ত করল ইসরো।',
    keyPoints: [
      'Crucial foundational technology for building Bharatiya Antariksh Station (BAS) by 2035 and Chandrayaan-4 sample return mission.',
      'Twin spacecraft will be launched together on a single PSLV flight.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Future Space Roadmap of India',
      points: [
        'Bharatiya Antariksh Station (BAS): India\'s planned orbital space station (1st module BAS-01 planned by 2028, full station by 2035).',
        'Indian Moon Landing Target: Prime Minister Narendra Modi set target of landing first Indian astronaut on Moon by 2040.'
      ]
    },
    examRelevance: 'WBCS Science & Technology & UPSC GS III.'
  },

  // =========================================================================
  // 8. NATIONAL & GLOBAL APPOINTMENTS (10 EVENTS)
  // =========================================================================
  {
    id: 'appt-2026-01-vcns-tripathi',
    day: 4,
    dateStr: 'January 2026',
    category: 'appointments',
    categoryLabel: '👤 Defense Appointments',
    title: 'Vice Admiral Dinesh K. Tripathi Appointed as Vice Chief of Naval Staff (VCNS)',
    titleBn: 'ভাইস অ্যাডমিরাল দীনেশ কে ত্রিপাঠী ভারতীয় নৌবাহিনীর সহ-প্রধান পদে নিযুক্ত',
    summary: 'Vice Admiral Dinesh K. Tripathi, former Flag Officer Commanding-in-Chief (FOC-in-C) Western Naval Command, took charge as VCNS at Integrated Defence Headquarters.',
    summaryBn: 'ভারতীয় নৌবাহিনীর ভাইস চিফ অফ নেভাল স্টাফ হিসেবে দায়িত্ব গ্রহণ করলেন ভাইস অ্যাডমিরাল ত্রিপাঠী।',
    keyPoints: [
      'Alumnus of Sainik School Rewa and National Defence Academy (NDA) Khadakwasla.',
      'Specialist in Communication and Electronic Warfare; commanded INS Vinash and INS Trishul.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Indian Armed Forces Command Ranks',
      points: [
        'Chief of Naval Staff (CNS): 4-Star Admiral rank.',
        'Chief of Defence Staff (CDS): 4-Star General rank (1st CDS: Gen Bipin Rawat; 2nd CDS: Gen Anil Chauhan).',
        'Commander-in-Chief of Armed Forces: President of India (Article 53(2)).'
      ]
    },
    examRelevance: 'WBP SI, Kolkata Police, Food SI, WBCS.'
  },
  {
    id: 'appt-2026-02-bimstec-indra-mani',
    day: 4,
    dateStr: 'January 2026',
    category: 'appointments',
    categoryLabel: '👤 International Organisations',
    title: 'Ambassador Indra Mani Pandey Assumes Charge as Secretary General of BIMSTEC',
    titleBn: 'বিমস্টেক (BIMSTEC)-এর মহাসচিব হিসেবে দায়িত্ব গ্রহণ করলেন প্রথম ভারতীয় ইন্দ্র মণি পান্ডে',
    summary: 'Senior diplomat Indra Mani Pandey became the 4th Secretary General of BIMSTEC and the first Indian to hold this prestigious regional post.',
    summaryBn: 'ঢাকাভিত্তিক বিমস্টেক সচিবালয়ে প্রথম ভারতীয় হিসেবে মহাসচিবের পদ গ্রহণ করলেন রাষ্ট্রদূত পান্ডে।',
    keyPoints: [
      'Succeeded Tenzin Lekphell of Bhutan; HQ based in Dhaka, Bangladesh.',
      'Previously served as India\'s Permanent Representative to the UN and other International Organisations in Geneva.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: BIMSTEC Grouping',
      points: [
        'BIMSTEC: Bay of Bengal Initiative for Multi-Sectoral Technical and Economic Cooperation.',
        'Established: 6 June 1997 via Bangkok Declaration.',
        '7 Member States: 5 from South Asia (Bangladesh, Bhutan, India, Nepal, Sri Lanka) + 2 from Southeast Asia (Myanmar, Thailand).'
      ]
    },
    examRelevance: 'Guaranteed question in WBCS Prelims & WBPSC Clerkship.'
  },
  {
    id: 'appt-2026-03-un-geneva-bagchi',
    day: 3,
    dateStr: 'January 2026',
    category: 'appointments',
    categoryLabel: '👤 Diplomatic Appointments',
    title: 'Arindam Bagchi Takes Charge as India\'s Permanent Representative to UN in Geneva',
    titleBn: 'জেনেভায় জাতিসংঘ ও অন্যান্য সংস্থায় ভারতের স্থায়ী প্রতিনিধি অরিন্দম বাগচী',
    summary: 'Former Official Spokesperson of the Ministry of External Affairs (MEA) Arindam Bagchi presented his credentials to the Director-General of UN Geneva.',
    summaryBn: 'জেনেভায় জাতিসংঘের দপ্তরে ভারতের রাষ্ট্রদূত ও স্থায়ী প্রতিনিধি হিসেবে দায়িত্ব নিলেন অরিন্দম বাগচী।',
    keyPoints: [
      '1995-batch IFS officer; deftly articulated India\'s foreign policy during G20 Presidency and global geopolitical crises.',
      'Succeeded by Randhir Jaiswal as MEA Official Spokesperson.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: UN Headquarters & Geneva Agencies',
      points: [
        'UN Geneva (Palais des Nations): Houses WHO, ILO, UNHCR, UNHRC, WIPO, WTO, ITU, WMO.',
        'India\'s Permanent Representative to UN in New York: Parvathaneni Harish.'
      ]
    },
    examRelevance: 'WBCS Prelims International Affairs.'
  },
  {
    id: 'appt-2026-04-wto-ambassador-pandian',
    day: 6,
    dateStr: 'January 2026',
    category: 'appointments',
    categoryLabel: '👤 Global Trade Ambassadors',
    title: 'Senthil Pandian C Appointed as India\'s Ambassador to World Trade Organization (WTO)',
    titleBn: 'বিশ্ব বাণিজ্য সংস্থায় (WTO) ভারতের রাষ্ট্রদূত হিসেবে নিযুক্ত হলেন সেন্থিল পান্ডিয়ান সি',
    summary: 'Appointments Committee of the Cabinet (ACC) approved appointment of 2002-batch IAS officer Senthil Pandian C as Ambassador & Permanent Representative to WTO in Geneva.',
    summaryBn: 'জেনেভায় বিশ্ব বাণিজ্য সংস্থায় ভারতের স্বার্থরক্ষায় নতুন রাষ্ট্রদূত নিযুক্ত করা হলো।',
    keyPoints: [
      'Succeeded Brajendra Navnit at WTO.',
      'Key mandate: Safeguard India\'s public stockholding (PSH) for food security and fisheries subsidy flexibilities.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: World Trade Organization (WTO)',
      points: [
        'Established: 1 January 1995 via Marrakesh Agreement (replacing GATT 1947) | HQ: Geneva, Switzerland.',
        'Director-General: Ngozi Okonjo-Iweala (1st woman and 1st African DG).',
        'Total Members: 164 member nations.'
      ]
    },
    examRelevance: 'WBCS Economy & Trade Policies.'
  },
  {
    id: 'appt-2026-05-ssb-dg-daljit-chaudhary',
    day: 19,
    dateStr: 'January 2026',
    category: 'appointments',
    categoryLabel: '👤 Paramilitary Leadership',
    title: 'IPS Daljit Singh Chaudhary Appointed as Director General of Sashastra Seema Bal (SSB)',
    titleBn: 'সশস্ত্র সীমা বল (SSB)-এর নতুন ডিরেক্টর জেনারেল হলেন আইপিএস দলজিৎ সিং চৌধুরী',
    summary: '1990-batch IPS officer Daljit Singh Chaudhary was appointed head of SSB, responsible for guarding India\'s borders with Nepal and Bhutan.',
    summaryBn: 'ভারত-নেপাল ও ভারত-ভুটান সীমান্ত রক্ষার দায়িত্বে থাকা সশস্ত্র সীমা বলের ডিজি পদে নতুন নিয়োগ সম্পন্ন হলো।',
    keyPoints: [
      'Succeeded Rashmi Shukla upon her transfer as Maharashtra DGP.',
      'SSB operates under Ministry of Home Affairs (MHA).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Central Armed Police Forces (CAPF) Under MHA',
      points: [
        '7 CAPFs of India: BSF (Pakistan & Bangladesh borders), ITBP (China border), SSB (Nepal & Bhutan borders), Assam Rifles (Myanmar border - under Army operational control), CISF (Critical infrastructure/airports), CRPF (Internal security), NSG (Counter-terror).'
      ]
    },
    examRelevance: 'WBP SI, Kolkata Police, Food SI, WBCS.'
  },
  {
    id: 'appt-2026-06-cisf-nina-singh',
    day: 1,
    dateStr: 'January 2026',
    category: 'appointments',
    categoryLabel: '👤 Women in Security Forces',
    title: 'IPS Nina Singh Serves as First Woman Director General of Central Industrial Security Force (CISF)',
    titleBn: 'সিআইএসএফ (CISF)-এর প্রথম মহিলা ডিরেক্টর জেনারেল আইপিএস নীনা সিং',
    summary: '1989-batch IPS officer Nina Singh made history as the first woman officer appointed to head the CISF, guarding 68 civil airports and aerospace facilities.',
    summaryBn: 'দেশের সমস্ত বিমানবন্দর ও পরমাণু কেন্দ্রের সুরক্ষায় নিয়োজিত সিআইএসএফের শীর্ষ পদে প্রথম নারী আইপিএস।',
    keyPoints: [
      'First woman IPS officer from Rajasthan cadre.',
      'Supervised security transition of Parliament House Complex to CISF.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: CISF & Women in Indian Police',
      points: [
        'CISF: Raised on 10 March 1969 via CISF Act, 1968 under MHA | HQ: New Delhi.',
        '1st Woman IPS Officer of India: Kiran Bedi (1972 batch).',
        '1st Woman DGP of a State: Kanchan Chaudhary Bhattacharya (Uttarakhand, 2004).'
      ]
    },
    examRelevance: 'Guaranteed question in all West Bengal Police & PSC exams.'
  },
  {
    id: 'appt-2026-07-sc-judge-varale',
    day: 25,
    dateStr: 'January 2026',
    category: 'appointments',
    categoryLabel: '👤 Higher Judiciary Appointments',
    title: 'Justice Prasanna B. Varale Sworn in as Judge of the Supreme Court of India',
    titleBn: 'সুপ্রিম কোর্টের নতুন বিচারপতি হিসেবে শপথ নিলেন বিচারপতি প্রসন্ন বি ভারালে',
    summary: 'Chief Justice of India administered the oath of office to Justice Prasanna B. Varale (former Chief Justice of Karnataka High Court), taking Supreme Court to full sanctioned strength of 34 judges.',
    summaryBn: 'সুপ্রিম কোর্টের ৩৪ জন বিচারপতির সম্পূর্ণ শক্তি পূরণ করে নতুন বিচারপতি হিসেবে শপথ নিলেন বিচারপতি ভারালে।',
    keyPoints: [
      'Third sitting judge from the Dalit community in the Supreme Court (alongside Justice B.R. Gavai and Justice C.T. Ravikumar).',
      'Recommended unanimously by the 5-member Supreme Court Collegium.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Appointment of Judges & Collegium System',
      points: [
        'Article 124(2): Supreme Court Judges appointed by President of India.',
        'Collegium System: Evolved through Three Judges Cases (1981, 1993, 1998); CJI + 4 senior-most SC judges.',
        '99th Constitutional Amendment (NJAC 2014): Struck down as unconstitutional by Supreme Court in 2015.'
      ]
    },
    examRelevance: 'WBCS Indian Polity & Constitution (Mains Paper V).'
  },
  {
    id: 'appt-2026-08-nalsa-br-gavai',
    day: 3,
    dateStr: 'January 2026',
    category: 'appointments',
    categoryLabel: '👤 Legal Aid & Access to Justice',
    title: 'Justice B.R. Gavai Nominated as Executive Chairman of National Legal Services Authority (NALSA)',
    titleBn: 'নালসা (NALSA)-এর কার্যকরী চেয়ারম্যান হিসেবে মনোনীত হলেন বিচারপতি বি আর গাভাই',
    summary: 'President of India nominated senior-most Supreme Court judge Justice B.R. Gavai as Executive Chairman of NALSA under Legal Services Authorities Act, 1987.',
    summaryBn: 'দেশের দরিদ্র ও অসহায় মানুষের আইনি সহায়তার শীর্ষ সংস্থা নালসার কার্যনির্বাহী প্রধান নিযুক্ত হলেন।',
    keyPoints: [
      'Patron-in-Chief of NALSA is the Chief Justice of India.',
      'Spearheads pan-India National Lok Adalats and legal literacy camps.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: NALSA & Free Legal Aid (Article 39A)',
      points: [
        'Article 39A: Directive Principle inserted by 42nd Amendment Act, 1976 (Equal Justice and Free Legal Aid).',
        'NALSA Act: Legal Services Authorities Act, 1987 (came into force on 9 Nov 1995 - National Legal Services Day).',
        'Lok Adalats: Statutory dispute resolution mechanism with award having status of civil court decree (no appeal).'
      ]
    },
    examRelevance: 'WBCS Polity & Governance.'
  },
  {
    id: 'appt-2026-09-guatemala-arevalo',
    day: 15,
    dateStr: 'January 2026',
    category: 'appointments',
    categoryLabel: '👤 Global Heads of State',
    title: 'Bernardo Arévalo Sworn in as President of Guatemala on Anti-Corruption Platform',
    titleBn: 'গুয়াতেমালার নতুন প্রেসিডেন্ট হিসেবে শপথ গ্রহণ করলেন বার্নার্দো আরেভালো',
    summary: 'Anti-corruption reformer Bernardo Arévalo took oath as President of Guatemala in Guatemala City overcoming intense institutional hurdles.',
    summaryBn: 'লাতিন আমেরিকার দেশ গুয়াতেমালায় দুর্নীতিবিরোধী আন্দোলনের নেতা আরেভালো নতুন প্রেসিডেন্ট হলেন।',
    keyPoints: [
      'Candidate of the progressive Semilla (Seed) movement.',
      'Son of Juan José Arévalo, Guatemala\'s first democratically elected president (1945–1951).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Guatemala & Central American Geography',
      points: [
        'Capital: Guatemala City | Currency: Guatemalan Quetzal (GTQ).',
        'Mayan Civilization: Ancient Mesoamerican civilization centered in Guatemala and southern Mexico (Tikal ruins).',
        'Border Countries: Mexico, Belize, Honduras, El Salvador.'
      ]
    },
    examRelevance: 'WBCS Prelims World Current Affairs.'
  },
  {
    id: 'appt-2026-10-eib-nadia-calvino',
    day: 1,
    dateStr: 'January 2026',
    category: 'appointments',
    categoryLabel: '👤 International Finance Leadership',
    title: 'Nadia Calviño Takes Charge as 1st Woman President of European Investment Bank (EIB)',
    titleBn: 'ইউরোপীয় বিনিয়োগ ব্যাংকের (EIB) প্রথম মহিলা প্রেসিডেন্ট নাদিয়া ক্যালভিনো',
    summary: 'Former Spanish First Deputy Prime Minister and Economy Minister Nadia Calviño assumed office as the 8th President of the European Investment Bank.',
    summaryBn: 'বিশ্বের বৃহত্তম বহুপাক্ষিক উন্নয়ন ব্যাংক ইআইবি-র শীর্ষ পদে প্রথম নারী হিসেবে দায়িত্ব নিলেন নাদিয়া ক্যালভিনো।',
    keyPoints: [
      'Succeeded Werner Hoyer of Germany; HQ located in Kirchberg, Luxembourg.',
      'EIB is the lending arm of the European Union, financing green transition and global development projects.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Global Multilateral Financial Institutions',
      points: [
        'EIB: Founded in 1958 under Treaty of Rome | HQ: Luxembourg.',
        'World Bank Group & IMF: Bretton Woods Conference (1944) | HQ: Washington, D.C.',
        'ADB (Asian Development Bank): Founded in 1966 | HQ: Mandaluyong, Manila, Philippines (President: Masatsugu Asakawa).'
      ]
    },
    examRelevance: 'WBCS Economy & Global Organizations.'
  },

  // =========================================================================
  // 9. AWARDS, HONORS & CIVILIAN RECOGNITIONS (12 EVENTS)
  // =========================================================================
  {
    id: 'award-2026-01-padma-awards',
    day: 25,
    dateStr: '25 January 2026',
    category: 'awards_persons',
    categoryLabel: '🏆 Padma Awards 2026',
    title: 'Padma Awards 2026 Announced: 131 Total Conferments (5 Vibhushan, 13 Bhushan, 113 Shri)',
    titleBn: 'পদ্ম পুরস্কার ২০২৬ ঘোষণা: মোট ১৩১ জন বিশিষ্ট ব্যক্তিত্বকে রাষ্ট্রীয় সম্মাননা',
    summary: 'On Republic Day eve, President Droupadi Murmu approved conferment of 131 Padma Awards honoring distinguished achievements in public life.',
    summaryBn: '২০২৬ সালের প্রজাতন্ত্র দিবসের প্রাক্কালে ১৩১টি পদ্ম পুরস্কার ঘোষণা করা হলো (৫টি পদ্মবিভূষণ, ১৩টি পদ্মভূষণ ও ১১৩টি পদ্মশ্রী)।',
    keyPoints: [
      '5 Padma Vibhushan Recipients: 1. Dharmendra Singh Deol (Posthumous - Art), 2. Justice K.T. Thomas (Public Affairs), 3. Prof. N. Rajam (Art - Hindustani Violin), 4. Shri P. Narayanan (Literature & Education), 5. Shri V.S. Achuthanandan (Posthumous - Public Affairs).',
      'Notable Padma Bhushan: Alka Yagnik, Mammootty, etc.',
      'Multiple grassroots artists and craftspersons from West Bengal awarded Padma Shri.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Padma Awards Hierarchy & Legal Status',
      points: [
        'Instituted: 1954 | Hierarchy: Bharat Ratna -> Padma Vibhushan -> Padma Bhushan -> Padma Shri.',
        'Article 18(1): Supreme Court in Balaji Raghavan (1995) ruled National Awards do not violate abolition of titles.',
        'Annual Ceiling: Max 120 awards per year (excluding posthumous and foreigners).'
      ]
    },
    examRelevance: 'Guaranteed questions in WBCS, Police SI, Food SI, Clerkship.'
  },
  {
    id: 'award-2026-02-ashok-chakra-shukla',
    day: 26,
    dateStr: '26 January 2026',
    category: 'awards_persons',
    categoryLabel: '🏆 Gallantry & Space',
    title: 'Ashok Chakra Conferred on Astronaut Wing Commander Shubhanshu Shukla',
    titleBn: 'মহাকাশচারী উইং কমান্ডার শুভাংশু শুক্লাকে অশোক চক্র সম্মাননা প্রদান',
    summary: 'Wing Commander Shubhanshu Shukla, prime astronaut designated for Indo-US Axiom-4 ISS mission and Gaganyaan, was honoured on Republic Day 2026.',
    summaryBn: 'আন্তর্জাতিক মহাকাশ স্টেশন ও গগনযান মিশনের মহাকাশচারী শুভাংশু শুক্লাকে বীরত্ব সম্মাননা দেওয়া হলো।',
    keyPoints: [
      'Trained at Yuri Gagarin Cosmonaut Training Center in Russia and NASA Johnson Space Center.',
      'Selected among India\'s 4 astronaut-designates for ISRO\'s Human Spaceflight Programme Gaganyaan.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Gallantry Awards of India',
      points: [
        'Wartime Gallantry Awards: Param Vir Chakra (PVC), Maha Vir Chakra (MVC), Vir Chakra (VrC).',
        'Peacetime Gallantry Awards: Ashok Chakra (highest peacetime), Kirti Chakra, Shaurya Chakra.',
        '1st PVC Recipient: Major Somnath Sharma (Battle of Badgam, 1947).'
      ]
    },
    examRelevance: 'WBP SI, Kolkata Police, WBCS Defense.'
  },
  {
    id: 'award-2026-03-subhas-bose-aapda',
    day: 23,
    dateStr: '23 January 2026',
    category: 'awards_persons',
    categoryLabel: '🏆 Disaster Relief Honors',
    title: 'Subhas Chandra Bose Aapda Prabandhan Puraskar 2026 Announced on Parakram Diwas',
    titleBn: 'পরাক্রম দিবসে সুভাষচন্দ্র বসু আপদা প্রবন্ধন পুরস্কার ২০২৬ ঘোষণা',
    summary: 'Ministry of Home Affairs announced annual disaster management recognition on Netaji\'s 129th birth anniversary.',
    summaryBn: 'দুর্যোগ ব্যবস্থাপনায় অসামান্য অবদানের জন্য জাতীয় স্তরে এই সম্মাননা প্রদান করা হলো।',
    keyPoints: [
      'Institutional award carries ₹51 Lakh cash prize and certificate.',
      'Individual award carries ₹5 Lakh cash prize and certificate.'
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
    id: 'award-2026-04-golden-globes-2026',
    day: 7,
    dateStr: '07 January 2026',
    category: 'awards_persons',
    categoryLabel: '🏆 International Cinema',
    title: '83rd Golden Globe Awards Concluded in Beverly Hills, California',
    titleBn: 'ক্যালিফোর্নিয়ায় ৮৩তম গোল্ডেন গ্লোব চলচ্চিত্র পুরস্কার ২০২৬ অনুষ্ঠিত',
    summary: 'The 83rd Annual Golden Globe Awards celebrated outstanding achievements in American and international film and television.',
    summaryBn: 'লস অ্যাঞ্জেলেসে ৮৩তম গোল্ডেন গ্লোব পুরস্কারে সেরা অভিনেতা ও পরিচালকদের পুরস্কৃত করা হলো।',
    keyPoints: [
      'Honored excellence in Drama, Musical/Comedy, and Cinematic Box Office Achievements.',
      'Recognized cinematic adaptations in international OTT and theatrical releases.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Golden Globe Awards History',
      points: [
        '1st Golden Globe Awards: Presented in January 1944 in Los Angeles.',
        'Oscar / Academy Awards: Instituted in 1929 by AMPAS (Academy of Motion Picture Arts and Sciences).'
      ]
    },
    examRelevance: 'WBPSC Miscellaneous, SSC CGL.'
  },
  {
    id: 'award-2026-05-khel-ratna-satwik-chirag',
    day: 9,
    dateStr: '09 January 2026',
    category: 'awards_persons',
    categoryLabel: '🏆 National Sports Awards',
    title: 'President Murmu Confers Major Dhyan Chand Khel Ratna on Satwiksairaj & Chirag Shetty',
    titleBn: 'রাষ্ট্রপতি কর্তৃক সাত্ত্বিকসাইরাজ ও চিরাগ শেট্টিকে মেজর ধ্যানচাঁদ খেলরত্ন পুরস্কার প্রদান',
    summary: 'India\'s champion badminton men\'s doubles pair Satwiksairaj Rankireddy and Chirag Shetty received the highest sports honour at Rashtrapati Bhavan.',
    summaryBn: 'বিশ্ব ব্যাডমিন্টন র্যাঙ্কিংয়ে এক নম্বর জুটি সাত্ত্বিক ও চিরাগকে সর্বোচ্চ ক্রীড়া সম্মাননায় ভূষিত করা হলো।',
    keyPoints: [
      'Historic accomplishments: Asian Games Gold (2023), Asian Championships Gold (2023), Indonesia Open Super 1000, World No. 1 BWF Ranking.',
      '26 athletes conferred Arjuna Award including Mohammed Shami (Cricket).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Major Dhyan Chand Khel Ratna Award',
      points: [
        'Instituted: 1991-92 (originally Rajiv Gandhi Khel Ratna; renamed in August 2021).',
        'Prize Money: ₹25 Lakh cash prize, medal, and scroll.',
        '1st Recipient: Grandmaster Viswanathan Anand (1991-92).',
        '1st Woman Recipient: Karnam Malleswari (Weightlifting, 1994-95).'
      ]
    },
    examRelevance: 'Guaranteed sports award question in WBCS, Police SI, Clerkship.'
  },
  {
    id: 'award-2026-06-ms-swaminathan-kamboj',
    day: 3,
    dateStr: 'January 2026',
    category: 'awards_persons',
    categoryLabel: '🏆 Agricultural Sciences',
    title: 'Prof. B.R. Kamboj Honoured with 14th M.S. Swaminathan Award for Agronomy Research',
    titleBn: 'কৃষি গবেষণায় অবদানের জন্য ১৪তম এম এস স্বামীনাথন পুরস্কার পেলেন অধ্যাপক বি আর কম্বোজ',
    summary: 'Vice-Chancellor of Chaudhary Charan Singh Haryana Agricultural University (CCSHAU) Prof. B.R. Kamboj was conferred the prestigious national award for agricultural extension.',
    summaryBn: 'শস্য বিজ্ঞান ও কৃষক কল্যাণ গবেষণার জন্য এই জাতীয় কৃষি সম্মাননা দেওয়া হলো।',
    keyPoints: [
      'Conferred by Karnataka Governor Thawar Chand Gehlot at Gwalior.',
      'Honours outstanding contributions to food security, crop breeding, and farming sustainability.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Dr. M.S. Swaminathan & Green Revolution',
      points: [
        'Father of Green Revolution in India: Dr. M.S. Swaminathan (introduced high-yielding varieties of Mexican dwarf wheat in 1960s with Norman Borlaug).',
        'World Food Prize: 1st recipient was Dr. M.S. Swaminathan in 1987.',
        'National Commission on Farmers (2004): Recommended MSP at C2 + 50% profit formula.'
      ]
    },
    examRelevance: 'WBCS Agriculture, Prelims GS & WBPSC Food SI.'
  },
  {
    id: 'award-2026-07-filmfare-awards-69',
    day: 28,
    dateStr: '28 January 2026',
    category: 'awards_persons',
    categoryLabel: '🏆 Indian Cinema',
    title: '69th Filmfare Awards Concluded at GIFT City, Gandhinagar: "12th Fail" Wins Best Film',
    titleBn: '৬৯তম ফিল্মফেয়ার পুরস্কার ২০২৬ (গিফট সিটি, গুজরাট): সেরা ছবি "১২থ ফেল"',
    summary: 'The 69th Hyundai Filmfare Awards ceremony held in Gandhinagar, Gujarat celebrated Hindi cinema excellence.',
    summaryBn: 'গুজরাটের গিফট সিটিতে অনুষ্ঠিত ফিল্মফেয়ারে সেরা ছবি ও অভিনেতার পুরস্কার ঘোষিত হলো।',
    keyPoints: [
      'Best Film: 12th Fail (Directed by Vidhu Vinod Chopra).',
      'Best Director: Vidhu Vinod Chopra (12th Fail).',
      'Best Actor (Male): Ranbir Kapoor (Animal) | Best Actor (Critics): Vikrant Massey (12th Fail).',
      'Best Actor (Female): Alia Bhatt (Rocky Aur Rani Kii Prem Kahaani).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: History of Filmfare Awards',
      points: [
        'Inception: 1954 (originally "The Clare Awards" after Clare Mendonca, film critic).',
        '1st Best Film: Do Bigha Zamin (1953, directed by Bengali auteur Bimal Roy).',
        '1st Best Actor: Dilip Kumar (Daag, 1953).'
      ]
    },
    examRelevance: 'WBPSC Miscellaneous & Clerkship.'
  },
  {
    id: 'award-2026-08-icc-awards-suryakumar',
    day: 24,
    dateStr: 'January 2026',
    category: 'awards_persons',
    categoryLabel: '🏆 International Cricket Awards',
    title: 'ICC Annual Awards: Suryakumar Yadav Named ICC Men\'s T20I Cricketer of the Year',
    titleBn: 'আইসিসি বর্ষসেরা টি-টোয়েন্টি ক্রিকেটার নির্বাচিত হলেন সূর্যকুমার যাদব',
    summary: 'International Cricket Council (ICC) announced its annual individual honours, recognizing India\'s batting sensation Suryakumar Yadav for back-to-back dominance.',
    summaryBn: 'আন্তর্জাতিক ক্রিকেট কাউন্সিল (ICC) দ্বারা ভারতের তারকা ব্যাটসম্যান সূর্যকুমার যাদব বর্ষসেরা টি-টোয়েন্টি ক্রিকেটার হলেন।',
    keyPoints: [
      'Virat Kohli named ICC Men\'s ODI Cricketer of the Year for record 4th time.',
      'Pat Cummins (Australia) won Sir Garfield Sobers Trophy for ICC Men\'s Cricketer of the Year.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: ICC Trophy History & Records',
      points: [
        'Sir Garfield Sobers Trophy: Instituted in 2004 for overall cricketer of the year.',
        'Rachael Heyhoe Flint Trophy: For ICC Women\'s Cricketer of the Year.',
        'ICC HQ: Dubai, UAE (moved from Lord\'s, London in 2005).'
      ]
    },
    examRelevance: 'WBP SI, Constable, Food SI.'
  },
  {
    id: 'award-2026-09-rashtriya-khel-protsahan',
    day: 9,
    dateStr: 'January 2026',
    category: 'awards_persons',
    categoryLabel: '🏆 Sports Promotion Honors',
    title: 'Rashtriya Khel Protsahan Puruskar 2026 Conferred on Odisha Mining Corporation (OMC)',
    titleBn: 'জাতীয় ক্রীড়া উৎসাহ পুরস্কার ২০২৬ পেল ওড়িশা মাইনিং কর্পোরেশন (OMC)',
    summary: 'Ministry of Youth Affairs and Sports conferred the national sports encouragement award on OMC for its role in sponsoring national hockey and grassroots talent.',
    summaryBn: 'ভারতীয় হকি ও ক্রীড়া পরিকাঠামো উন্নয়নের জন্য ওএমসি-কে রাষ্ট্রপতি ভবনে পুরস্কৃত করা হলো।',
    keyPoints: [
      'Awarded under category "Identification and Nurturing of Budding and Young Talent".',
      'Jain University (Bengaluru) awarded in "Sports for Development" category.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: National Sports Policy of India',
      points: [
        'Rashtriya Khel Protsahan Puruskar: Instituted in 2009 to recognise corporate/NGO sports sponsorship.',
        'Birsa Munda International Hockey Stadium: World\'s largest all-seater hockey stadium in Rourkela, Odisha (capacity 20,000+).'
      ]
    },
    examRelevance: 'WBCS Sports & State GK.'
  },
  {
    id: 'award-2026-10-tenzing-norgay-savita',
    day: 9,
    dateStr: 'January 2026',
    category: 'awards_persons',
    categoryLabel: '🏆 National Adventure Awards',
    title: 'Tenzing Norgay National Adventure Award Conferred Posthumously on Savita Kanswal',
    titleBn: 'তেনজিং নরগে জাতীয় রোমাঞ্চ পুরস্কার মরণোত্তর পেলেন পর্বতারোহী সবিতা কানসওয়াল',
    summary: 'President Droupadi Murmu presented Land Adventure award to the father of late mountaineer Savita Kanswal, who set a national record climbing Everest and Makalu in 16 days.',
    summaryBn: '১৬ দিনে এভারেস্ট ও মাকালু পর্বত শৃঙ্গ জয়ের ঐতিহাসিক রেকর্ডের স্বীকৃতিতে সম্মাননা প্রদান।',
    keyPoints: [
      'Highest national recognition for adventure sports in India (equivalent to Arjuna Award).',
      'Savita tragically lost her life in an avalanche at Draupadi Ka Danda II in Uttarkashi in Oct 2022.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Tenzing Norgay Adventure Award & Peaks',
      points: [
        'Instituted: 1994 (originally National Adventure Awards; renamed in 2002 after Tenzing Norgay, who first climbed Everest on 29 May 1953 with Edmund Hillary).',
        '4 Categories: Land Adventure, Water Adventure, Air Adventure, Life Time Achievement.'
      ]
    },
    examRelevance: 'WBCS Geography & Mountaineering, WBP SI.'
  },
  {
    id: 'award-2026-11-arjuna-divyakriti-singh',
    day: 9,
    dateStr: 'January 2026',
    category: 'awards_persons',
    categoryLabel: '🏆 Historic Arjuna Awards',
    title: 'Divyakriti Singh Becomes 1st Indian Woman in History to Receive Arjuna Award in Equestrian',
    titleBn: 'ঘোড়সওয়ারি (Equestrian) খেলায় ভারতের প্রথম মহিলা হিসেবে অর্জুন পুরস্কার পেলেন দিব্যাকৃতি সিং',
    summary: '24-year-old dressage rider Divyakriti Singh of Rajasthan was conferred the Arjuna Award following India\'s historic Dressage Team Gold at the Hangzhou Asian Games.',
    summaryBn: 'এশিয়ান গেমসে দলগত স্বর্ণপদক জয়ের পর ভারতীয় নারী হিসেবে প্রথম এই বিরল সম্মাননা অর্জন।',
    keyPoints: [
      'Ended India\'s 41-year medal drought in Equestrian Dressage at the Asian Games.',
      'Trained in Hagen, Germany in International Equestrian Federation (FEI) circuits.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Arjuna Award & Equestrian History',
      points: [
        'Arjuna Award: Instituted in 1961 | Cash Prize: ₹15 Lakh, bronze statuette of Arjuna, scroll.',
        '1st Arjuna Awardee in Cricket: Salim Durani (1961).',
        'Equestrian at Asian Games: 1st introduced in 1982 New Delhi Asian Games.'
      ]
    },
    examRelevance: 'WBCS Sports GK & WBPSC Miscellaneous.'
  },
  {
    id: 'award-2026-12-odop-national-awards',
    day: 4,
    dateStr: 'January 2026',
    category: 'awards_persons',
    categoryLabel: '🏆 District Export Excellence',
    title: 'ODOP National District Export Hub Awards Presented at Bharat Mandapam',
    titleBn: 'এক জেলা এক পণ্য (ODOP) জাতীয় রপ্তানি পুরস্কার প্রদান অনুষ্ঠান (নতুন দিল্লি)',
    summary: 'Department for Promotion of Industry and Internal Trade (DPIIT) honoured top performing States and Districts for promoting indigenous artisan exports.',
    summaryBn: 'ভারতের গ্রামীণ ও জেলাভিত্তিক পণ্য রপ্তানি প্রসারে সেরা রাজ্য ও জেলাকে পুরস্কৃত করা হলো।',
    keyPoints: [
      'Top State Awards: Category A -> Gujarat (1st), Category B -> Jammu & Kashmir (1st).',
      'Top Districts: Kanyakumari (Tamil Nadu) and Burhanpur (Madhya Pradesh).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: One District One Product (ODOP) Initiative',
      points: [
        'Origin: Modelled on Japan\'s "One Village One Product" (OVOP) movement started in 1979 in Oita Prefecture.',
        'India Implementation: First launched by Uttar Pradesh in 2018; adopted nationally by DPIIT in 2020 under "Districts as Export Hubs".'
      ]
    },
    examRelevance: 'WBCS Economy & Rural Development.'
  },

  // =========================================================================
  // 10. BOOKS & AUTHORS (8 EVENTS)
  // =========================================================================
  {
    id: 'book-2026-01-pranab-my-father',
    day: 11,
    dateStr: 'January 2026',
    category: 'books',
    categoryLabel: '📚 Political Biographies',
    title: '"Pranab, My Father: A Daughter Remembers" Authored by Sharmistha Mukherjee',
    titleBn: 'শর্মিষ্ঠা মুখোপাধ্যায়ের রচিত বই "প্রণব, মাই ফাদার: আ ডটার রিমেম্বার্স"',
    summary: 'Memoir offering rare biographical insights into the political life, diary entries, and statecraft of India\'s 13th President Bharat Ratna Pranab Mukherjee.',
    summaryBn: 'ভারতের প্রাক্তন রাষ্ট্রপতি ভারতরত্ন প্রণব মুখোপাধ্যায়ের রাজনৈতিক জীবন ও ডায়েরির উপর রচিত স্মৃতিকথা।',
    keyPoints: [
      'Published by Rupa Publications on Pranab Mukherjee\'s birth anniversary week.',
      'Reveals his inner thoughts on coalition politics, 1984 Congress crisis, and relationship with prime ministers.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Pranab Mukherjee (1935–2020) Milestones',
      points: [
        '13th President of India (2012–2017) | Born in Mirati, Birbhum, West Bengal.',
        'Conferred Bharat Ratna in 2019 by President Ram Nath Kovind.',
        'Books by Pranab Mukherjee: The Coalition Years (1996–2012), The Turbulent Years (1980–1996), The Dramatic Decade: The Indira Gandhi Years, The Presidential Years (2012–2017).'
      ]
    },
    examRelevance: 'Guaranteed 1 question in WBCS Literature & Bengal History.'
  },
  {
    id: 'book-2026-02-modi-green-future',
    day: 6,
    dateStr: 'January 2026',
    category: 'books',
    categoryLabel: '📚 Environmental Policy Books',
    title: '"Modi: Energising a Green Future" Launched by Union Minister Bhupender Yadav',
    titleBn: 'পরিবেশ মন্ত্রী ভূপেন্দ্র যাদব কর্তৃক "মোদী: এনার্জাইজিং আ গ্রিন ফিউচার" বইয়ের প্রকাশ',
    summary: 'Comprehensive analysis of India\'s environmental diplomacy, Mission LiFE (Lifestyle for Environment), and green hydrogen transition.',
    summaryBn: 'ভারতের পরিবেশ নীতি ও টেকসই উন্নয়ন উদ্যোগের ওপর বিশেষ বিশ্লেষণাত্মক গ্রন্থ প্রকাশিত হলো।',
    keyPoints: [
      'Published in collaboration with Dr. Syama Prasad Mookerjee Research Foundation and Pentagon Press.',
      'Foreword written by Director General of International Solar Alliance (ISA).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Mission LiFE & Global Climate Summits',
      points: [
        'Mission LiFE: Launched by PM Narendra Modi & UN Sec-Gen António Guterres on 20 Oct 2022 at Kevadia, Gujarat.',
        'India\'s NDCs: Reduce emissions intensity of GDP by 45% by 2030 (from 2005 levels); achieve 50% cumulative electric power from non-fossil sources by 2030.'
      ]
    },
    examRelevance: 'WBCS Environment & Governance.'
  },
  {
    id: 'book-2026-03-four-stars-naravane',
    day: 2,
    dateStr: 'January 2026',
    category: 'books',
    categoryLabel: '📚 Military Autobiographies',
    title: '"Four Stars of Destiny: An Autobiography" by Former Army Chief Gen. M.M. Naravane',
    titleBn: 'প্রাক্তন সেনাপ্রধান জেনারেল এম এম নরবানের আত্মজীবনী "ফোর স্টারস অফ ডেসটিনি"',
    summary: 'Autobiography of India\'s 28th Chief of the Army Staff General Manoj Mukund Naravane providing strategic insights into Eastern Ladakh standoff and Agniveer scheme evolution.',
    summaryBn: 'লাদাখ অচলাবস্থা ও ভারতীয় সেনার আধুনিকায়নের প্রেক্ষাপটে রচিত সেনাপ্রধানের আত্মজীবনী।',
    keyPoints: [
      'Published by Penguin Random House India.',
      'Narrates 42 years of military service including Operation Pawan (IPKF Sri Lanka) and command of Eastern Army.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Important Military Autobiographies in India',
      points: [
        'Soldier\'s General: Gen J.J. Singh.',
        'Courage and Conviction: Gen V.K. Singh.',
        'Line of Duty: Lt Gen J.F.R. Jacob (hero of 1971 Bangladesh Liberation War).',
        'Straight from the Heart: Kapil Dev.'
      ]
    },
    examRelevance: 'WBCS Books & Authors, Defense.'
  },
  {
    id: 'book-2026-04-gandhi-three-campaigns',
    day: 12,
    dateStr: 'January 2026',
    category: 'books',
    categoryLabel: '📚 Modern Indian History',
    title: '"Gandhi: A Life in Three Campaigns" Authored by M.J. Akbar & K. Natwar Singh',
    titleBn: 'এম জে আকবর রচিত গ্রন্থ "গান্ধী: আ লাইফ ইন থ্রি ক্যাম্পেইনস"',
    summary: 'Historical assessment analyzing Mahatma Gandhi\'s three decisive mass national movements: Non-Cooperation (1920), Civil Disobedience / Salt Satyagraha (1930), and Quit India (1942).',
    summaryBn: 'মহাত্মা গান্ধীর তিনটি ঐতিহাসিক স্বাধীনতা আন্দোলনের রাজনৈতিক প্রভাব নিয়ে নতুন গবেষণামূলক বই।',
    keyPoints: [
      'Launched at the Nehru Memorial Museum and Library (Prime Ministers\' Museum & Library) in New Delhi.',
      'Examines how Gandhi mass-mobilized millions without firearms or state power.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Gandhi\'s Mass Movements in India',
      points: [
        'Non-Cooperation Movement: Launched 1 Aug 1920 (special Calcutta Congress session Sept 1920; Nagpur session Dec 1920); suspended post Chauri Chaura (Feb 1922).',
        'Civil Disobedience Movement: Started with Dandi Salt March (12 March – 6 April 1930).',
        'Quit India Movement: 8 August 1942 Gowalia Tank Maidan, Bombay ("Do or Die").'
      ]
    },
    examRelevance: 'WBCS Modern History & INM, WBPSC Food SI.'
  },
  {
    id: 'book-2026-05-ek-samandar-sanjeev-joshi',
    day: 28,
    dateStr: 'January 2026',
    category: 'books',
    categoryLabel: '📚 Hindi & Urdu Poetry',
    title: '"Ek Samandar, Mere Andar" (Poetry Collection) Authored by Sanjeev Joshi',
    titleBn: 'প্রতিরক্ষা বিজ্ঞানী সঞ্জীব যোশীর কবিতার বই "এক সমন্দর, মেরে অন্দর"',
    summary: 'Poetry anthology authored by Dr. Sanjeev Joshi, Senior Advisor to Secretary DRDO, launched in New Delhi by NSA Ajit Doval and CDS Gen Anil Chauhan.',
    summaryBn: 'প্রখ্যাত জাতীয় নিরাপত্তা ব্যক্তিত্বদের উপস্থিতিতে বিজ্ঞানী সঞ্জীব যোশীর কাব্যগ্রন্থ প্রকাশিত হলো।',
    keyPoints: [
      'Reflects on philosophical harmony, patriotic duty, science, and the human subconscious.',
      'Foreword by eminent litterateurs and acclaimed by Sahitya Akademi scholars.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Sahitya Akademi Awards & National Institutions',
      points: [
        'Sahitya Akademi: Established on 12 March 1954 | HQ: Rabindra Bhavan, New Delhi.',
        'Awards 24 Languages: 22 Eighth Schedule languages + English and Rajasthani.',
        'Jnanpith Award: Highest literary award in India (instituted in 1961 by Bharatiya Jnanpith; 1st recipient G. Sankara Kurup in 1965 for Malayalam).'
      ]
    },
    examRelevance: 'WBCS Culture & Literature.'
  },
  {
    id: 'book-2026-06-lachit-barphukan-arup-dutta',
    day: 16,
    dateStr: 'January 2026',
    category: 'books',
    categoryLabel: '📚 Medieval Military History',
    title: '"Assam\'s Braveheart Lachit Barphukan" Authored by Arup Kumar Dutta',
    titleBn: 'অরূপ কুমার দত্তের বই "আসামস ব্রেভহার্ট লাচিত বরফুকন" প্রকাশ',
    summary: 'Chronicles the life, naval warfare strategy, and leadership of 17th-century Ahom General Lachit Barphukan who routed the Mughal forces at Battle of Saraighat (1671).',
    summaryBn: 'সরাইঘাটের নৌযুদ্ধে মোগল পরাশক্তিকে পরাস্ত করা অহোম সেনাপতি লাচিত বরফুকনের বীরত্বগাথা।',
    keyPoints: [
      'Released in 24 scheduled Indian languages by Ministry of Information & Broadcasting.',
      'National Defence Academy (NDA) awards Lachit Barphukan Gold Medal to its best passing out cadet.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Ahom Kingdom & Battle of Saraighat',
      points: [
        'Ahom Dynasty: Founded in 1228 AD by Sukaphaa (ruled Assam for nearly 600 years until Treaty of Yandabo in 1826).',
        'Battle of Saraighat: 1671 on Brahmaputra River at Guwahati (Ahom forces under Lachit defeated Mughal army under Raja Ram Singh I).',
        'Lachit Diwas: Celebrated every year on 24 November in Assam.'
      ]
    },
    examRelevance: 'WBCS Medieval History & Northeast India.'
  },
  {
    id: 'book-2026-07-fertilising-future-mandaviya',
    day: 10,
    dateStr: 'January 2026',
    category: 'books',
    categoryLabel: '📚 Agricultural Policy Books',
    title: '"Fertilising the Future: Bharat\'s March Towards Fertilizer Self-Sufficiency" by Dr. Mansukh Mandaviya',
    titleBn: 'ডঃ মনসুখ মান্ডব্য রচিত বই "ফার্টিলাইজিং দ্য ফিউচার: ভারতের স্বনির্ভরতার যাত্রা"',
    summary: 'Details India\'s mission to achieve self-sufficiency in fertilizers through revival of closed urea plants, PM-PRANAM scheme, and Nano Urea adoption.',
    summaryBn: 'সার উৎপাদনে ভারতের স্বনির্ভরতা ও ন্যানো ইউরিয়া বিপ্লবের ওপর রচিত নীতিবিষয়ক বই।',
    keyPoints: [
      'Published by Rupa Publications.',
      'Highlights how India established world\'s first commercial Nano DAP and Nano Urea plants (IFFCO).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Fertilizer Industry & PM-PRANAM Scheme',
      points: [
        'PM-PRANAM: PM Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth (launched in 2023 to reduce chemical fertilizer use).',
        'Neem-Coated Urea: Mandatory in India since 2015 to prevent industrial diversion and improve nitrogen use efficiency.',
        'Major Fertilizer Plants in Eastern India: Sindri (Jharkhand), Barauni (Bihar), Durgapur (West Bengal).'
      ]
    },
    examRelevance: 'WBCS Agriculture & Indian Economy.'
  },
  {
    id: 'book-2026-08-uncommon-love-sudha-murthy',
    day: 14,
    dateStr: 'January 2026',
    category: 'books',
    categoryLabel: '📚 Corporate Biographies',
    title: '"An Uncommon Love: The Early Life of Sudha and Narayana Murthy" by Chitra Banerjee Divakaruni',
    titleBn: 'চিত্রা ব্যানার্জী দিবাকরুনীর বই "অ্যান আনকমন লাভ: সুধা ও নারায়ণ মূর্তির প্রারম্ভিক জীবন"',
    summary: 'Biographical narrative exploring the early courtship, struggles, and building of IT powerhouse Infosys by Sudha Murty and N.R. Narayana Murthy.',
    summaryBn: 'ইনফোসিসের প্রতিষ্ঠাতা নারায়ণ মূর্তি ও পদ্মভূষণ সুধা মূর্তির প্রারম্ভিক জীবনের উপর রচিত জনপ্রিয় গ্রন্থ।',
    keyPoints: [
      'Published by Juggernaut Books.',
      'Written by acclaimed Indian-American author Chitra Banerjee Divakaruni (*The Palace of Illusions*, *The Forest of Enchantments*).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Indian IT Revolution & Infosys',
      points: [
        'Infosys Founded: 2 July 1981 in Pune by 7 engineers with initial capital of ₹10,000 provided by Sudha Murty.',
        '1st Indian Company on NASDAQ: Infosys in 1999.',
        'Sudha Murty: 1st female engineer hired at TELCO (Tata Motors); appointed to Rajya Sabha in 2024.'
      ]
    },
    examRelevance: 'WBPSC Miscellaneous & Literature.'
  },

  // =========================================================================
  // 11. SPORTS, ATHLETIC CHAMPIONSHIPS & RECORDS (12 EVENTS)
  // =========================================================================
  {
    id: 'sport-2026-01-aus-open-alcaraz',
    day: 27,
    dateStr: '18 Jan – 01 Feb 2026',
    category: 'sports',
    categoryLabel: '⚽ Australian Open 2026',
    title: 'Australian Open 2026: Carlos Alcaraz & Elena Rybakina Crowned Singles Champions',
    titleBn: 'অস্ট্রেলিয়ান ওপেন ২০২৬: কার্লোস আলকারাজ ও এলেনা রিবাকিনা চ্যাম্পিয়ন',
    summary: 'At Melbourne Park, Spain\'s Carlos Alcaraz defeated 10-time champion Novak Djokovic in 4 sets (2–6, 6–2, 6–3, 7–5) to claim his maiden Australian Open crown.',
    summaryBn: 'মেলবোর্নে পুরুষদের সিঙ্গলসে কার্লোস আলকারাজ নোভাক জকোভিচকে হারিয়ে অস্ট্রেলিয়ান ওপেন চ্যাম্পিয়ন হলেন। মহিলাদের সিঙ্গলসে খেতাব জিতলেন এলেনা রিবাকিনা।',
    keyPoints: [
      'Carlos Alcaraz completed his career Surface Grand Slam (Hard Court, Clay, Grass) at just 22 years of age.',
      'Elena Rybakina (Kazakhstan) captured the Women\'s Singles Grand Slam trophy.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Grand Slam Tennis Calendar & Surfaces',
      points: [
        'Chronological Order: 1. Australian Open (Hard, 1905) -> 2. French Open (Clay, 1891) -> 3. Wimbledon (Grass, 1877) -> 4. US Open (Hard, 1881).',
        'Most Grand Slam Men\'s Singles: Novak Djokovic (24), Rafael Nadal (22), Roger Federer (20).'
      ]
    },
    examRelevance: 'Guaranteed sports question for WBCS & WB Police SI.'
  },
  {
    id: 'sport-2026-02-tata-steel-chess',
    day: 28,
    dateStr: 'January 2026',
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
    id: 'sport-2026-03-u19-world-cup-2026',
    day: 19,
    dateStr: 'January 2026',
    category: 'sports',
    categoryLabel: '⚽ Youth Cricket',
    title: '16th ICC Under-19 Men\'s Cricket World Cup 2026 Commences in Zimbabwe & Namibia',
    titleBn: 'জিম্বাবুয়ে ও নামিবিয়ায় ১৬তম আইসিসি অনূর্ধ্ব-১৯ পুরুষ ক্রিকেট বিশ্বকাপ ২০২৬ শুরু',
    summary: 'The 16th edition of the ICC Under-19 Cricket World Cup kicked off co-hosted by Zimbabwe and Namibia with 16 national teams.',
    summaryBn: '২০২৬ সালের অনূর্ধ্ব-১৯ বিশ্বকাপ আফ্রিকা মহাদেশের জিম্বাবুয়ে ও নামিবিয়ায় অনুষ্ঠিত হলো।',
    keyPoints: [
      'India enters as the most successful team in tournament history with 5 world titles.',
      'Top emerging youth cricketers from around the globe competing across 4 groups.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: India U-19 World Cup History',
      points: [
        '5 Titles Won by India: 2000 (Mohd Kaif), 2008 (Virat Kohli), 2012 (Unmukt Chand), 2018 (Prithvi Shaw), 2022 (Yash Dhull).',
        'ICC Headquarters: Dubai, UAE (Chairman: Greg Barclay).'
      ]
    },
    examRelevance: 'WBP Constable, SI, SSC.'
  },
  {
    id: 'sport-2026-04-khelo-india-youth-games',
    day: 19,
    dateStr: '19–31 January 2026',
    category: 'sports',
    categoryLabel: '⚽ National Youth Games',
    title: '6th Khelo India Youth Games Concludes: Maharashtra Tops Medal Tally with 158 Medals',
    titleBn: '৬ষ্ঠ খেলো ইন্ডিয়া যুব গেমস: ১৫৮টি পদক সহ মহারাষ্ট্র চ্যাম্পিয়ন (তামিলনাড়ু)',
    summary: 'Held across 4 cities in Tamil Nadu (Chennai, Madurai, Trichy, Coimbatore) with over 5,600 athletes competing in 26 sports.',
    summaryBn: 'তামিলনাড়ুতে অনুষ্ঠিত খেলো ইন্ডিয়া যুব গেমসে মহারাষ্ট্র চ্যাম্পিয়ন এবং তামিলনাড়ু রানার্স-আপ হলো।',
    keyPoints: [
      'Final Standings: 1st -> Maharashtra (57 Gold, 48 Silver, 53 Bronze = 158), 2nd -> Tamil Nadu (98 medals), 3rd -> Haryana (103 medals).',
      'Official Mascot: "Veera Mangai" (Velu Nachiyar, the legendary queen of Sivaganga).',
      'Squash made its official debut at Khelo India Youth Games.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Khelo India Programme & Queen Velu Nachiyar',
      points: [
        'Khelo India Programme: Launched in 2018 by Ministry of Youth Affairs and Sports.',
        '1st Edition of Khelo India: 2018 in New Delhi (Haryana champions).',
        'Rani Velu Nachiyar (1730–1796): Queen of Sivaganga estate, first Indian queen to wage war with East India Company (allied with Hyder Ali).'
      ]
    },
    examRelevance: 'Guaranteed 2 questions in all West Bengal Police SI & PSC exams.'
  },
  {
    id: 'sport-2026-05-beach-games-diu',
    day: 4,
    dateStr: '04–11 January 2026',
    category: 'sports',
    categoryLabel: '⚽ Multi-Sport Beach Games',
    title: '1st Multi-Sport Beach Games Held in Diu: Madhya Pradesh Crowned Overall Champions',
    titleBn: 'দীউ-এর ঘোঘলা সৈকতে ভারতের প্রথম বিচ গেমস অনুষ্ঠিত: মধ্যপ্রদেশ চ্যাম্পিয়ন',
    summary: 'India\'s first multi-sport beach games held at Blue Flag certified Ghoghla Beach in Diu (UT of Dadra & Nagar Haveli and Daman & Diu).',
    summaryBn: 'ভারতের প্রথম বহু-ক্রীড়া সৈকত গেমসে ১৮টি পদক সহ মধ্যপ্রদেশ চ্যাম্পিয়ন হলো।',
    keyPoints: [
      'MP topped medal tally with 18 medals (including 7 Gold). Maharashtra finished 2nd and hosts Dadra-Nagar Haveli & Daman-Diu finished 3rd.',
      'Featured 8 sports: Beach Soccer, Beach Volleyball, Pencak Silat, Tug of War, Mallakhamb, Open Water Swimming, Sepaktakraw, Beach Boxing.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Diu Island & Blue Flag Beaches',
      points: [
        'Diu Geography: Island located in Gulf of Khambhat off the southern coast of Kathiawar Peninsula, Gujarat.',
        'Blue Flag Certification: Eco-label awarded by Foundation for Environmental Education (FEE, Denmark); India has 12 certified Blue Flag beaches (including Ghoghla Beach, Diu; Puri Golden Beach, Odisha; Radhanagar Beach, A&N).'
      ]
    },
    examRelevance: 'WBCS Sports & Indian Geography, WBPSC Food SI.'
  },
  {
    id: 'sport-2026-06-rohit-sharma-5-t20-hundreds',
    day: 17,
    dateStr: '17 January 2026',
    category: 'sports',
    categoryLabel: '⚽ Cricket World Records',
    title: 'Rohit Sharma Creates World Record: First Batsman to Score 5 T20I Centuries',
    titleBn: 'ইতিহাস সৃষ্টি করলেন রোহিত শর্মা: আন্তর্জাতিক টি-টোয়েন্টিতে ৫টি শতরানের বিশ্বরেকর্ড',
    summary: 'Indian captain Rohit Sharma scored an unbeaten 121* off 69 balls against Afghanistan at M. Chinnaswamy Stadium, Bengaluru.',
    summaryBn: 'বেঙ্গালুরুতে আফগানিস্তানের বিরুদ্ধে ১২১ রানের অপরাজিত ইনিংস খেলে বিশ্বরেকর্ড গড়লেন ভারত অধিনায়ক।',
    keyPoints: [
      'Surpassed Glenn Maxwell and Suryakumar Yadav (4 centuries each) to stand alone at 5 international T20I centuries.',
      'Match witnessed unprecedented Double Super Over thriller won by India.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: T20 International Cricket Milestones',
      points: [
        '1st T20I Century: Chris Gayle (117 vs South Africa, 2007 T20 World Cup, Johannesburg).',
        'Highest Individual Score in T20I: Aaron Finch (172 vs Zimbabwe, 2018).',
        'Most Runs in Men\'s T20I: Virat Kohli and Rohit Sharma.'
      ]
    },
    examRelevance: 'WBP Constable, SI, Food SI, SSC.'
  },
  {
    id: 'sport-2026-07-india-sa-shortest-test',
    day: 4,
    dateStr: '03–04 January 2026',
    category: 'sports',
    categoryLabel: '⚽ Test Cricket History',
    title: 'India Defeats South Africa in Cape Town: Shortest Test Match in Cricket History (642 Balls)',
    titleBn: 'কেপটাউনে ভারতের ঐতিহাসিক জয়: টেস্ট ক্রিকেটের ইতিহাসের সংক্ষিপ্ততম ম্যাচ (৬৪২ বল)',
    summary: 'India defeated South Africa by 7 wickets at Newlands, Cape Town in a match completed in just 106.2 overs (642 balls / 4.5 sessions).',
    summaryBn: 'দক্ষিণ আফ্রিকার বিরুদ্ধে কেপটাউনে মাত্র দেড় দিনে টেস্ট ম্যাচ জিতে ইতিহাস গড়ল ভারতীয় দল।',
    keyPoints: [
      'Broke the 92-year-old world record of the shortest Test match (Australia vs South Africa, Melbourne 1932 - 656 balls).',
      'First Asian team to win a Test match at Newlands, Cape Town.',
      'Mohammed Siraj took career-best 6/15 in first innings.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Test Cricket Historical Records',
      points: [
        '1st Official Test Match in History: 15–19 March 1877 (Australia vs England at Melbourne Cricket Ground).',
        '1st Indian Test Match: 25–28 June 1932 at Lord\'s, London (India led by C.K. Nayudu).',
        'ICC World Test Championship (WTC): Inaugurated in 2019.'
      ]
    },
    examRelevance: 'WBCS Sports GK, Police SI.'
  },
  {
    id: 'sport-2026-08-fih-womens-hockey-ranchi',
    day: 19,
    dateStr: '13–19 January 2026',
    category: 'sports',
    categoryLabel: '⚽ Olympic Hockey Qualifiers',
    title: 'FIH Women\'s Hockey Olympic Qualifiers Concluded at Marang Gomke Stadium, Ranchi',
    titleBn: 'রাঁচিতে অনুষ্ঠিত হলো এফআইএইচ মহিলা হকি অলিম্পিক কোয়ালিফায়ার ২০২৬',
    summary: '8-nation tournament held at Marang Gomke Jaipal Singh Astroturf Hockey Stadium in Ranchi, Jharkhand with Germany, USA, and Japan securing Olympic berths.',
    summaryBn: 'ঝাড়খণ্ডের রাঁচিতে অনুষ্ঠিত মহিলা হকি কোয়ালিফায়ার টুর্নামেন্ট সম্পন্ন হলো।',
    keyPoints: [
      'Germany defeated USA 2-0 in the final to win the gold medal.',
      'India finished 4th after a close 0-1 defeat to Japan in the bronze medal playoff.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Indian Hockey & Jaipal Singh Munda',
      points: [
        'Jaipal Singh Munda (Marang Gomke): Captained Indian field hockey team to Gold medal at 1928 Amsterdam Olympics; member of Constituent Assembly of India.',
        'Indian Men\'s Hockey Olympic Record: 8 Gold, 1 Silver, 3 Bronze medals (most successful hockey nation in Olympic history).'
      ]
    },
    examRelevance: 'WBCS Sports & Jharkhand History.'
  },
  {
    id: 'sport-2026-09-anahat-singh-squash',
    day: 1,
    dateStr: 'January 2026',
    category: 'sports',
    categoryLabel: '⚽ Junior Squash Championships',
    title: '15-Year-Old Anahat Singh Wins Girls\' Under-19 Scottish Junior Open Squash in Edinburgh',
    titleBn: 'স্কটিশ জুনিয়র ওপেন স্কোয়াশ অনূর্ধ্ব-১৯ বিভাগে চ্যাম্পিয়ন ভারতের অনাহত সিং',
    summary: 'India\'s teenage squash sensation Anahat Singh defeated home favourite Robyn McAlpine 11-6, 11-1, 11-5 in the final in Edinburgh, Scotland.',
    summaryBn: '১৫ বছর বয়সী অনাহত সিং স্কটল্যান্ডের এডিনবার্গে অনূর্ধ্ব-১৯ স্কটিশ জুনিয়র খেতাব জয় করলেন।',
    keyPoints: [
      'Added Scottish Junior Open to her previous British Junior Open (U-15) and Asian Junior (U-17) titles.',
      'Youngest athlete to represent India at the 2022 Birmingham Commonwealth Games at age 14.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Squash in Olympics & Indian Squash Pioneers',
      points: [
        'Squash in Olympics: Officially included in the Olympic programme for the 2028 Los Angeles Olympic Games (LA28).',
        'Indian Squash Icons: Dipika Pallikal (1st Indian to break into top 10 PSA), Joshna Chinappa, Saurav Ghosal (from Kolkata, West Bengal - Asian Games Gold medalist).'
      ]
    },
    examRelevance: 'WBCS Sports & Personalities, WBPSC Miscellaneous.'
  },
  {
    id: 'sport-2026-10-malaysia-open-satwik-chirag',
    day: 14,
    dateStr: '09–14 January 2026',
    category: 'sports',
    categoryLabel: '⚽ BWF World Tour Super 1000',
    title: 'Satwiksairaj Rankireddy & Chirag Shetty Finish Runners-Up at Malaysia Open Super 1000',
    titleBn: 'মালয়েশিয়া ওপেন সুপার ১০০০ ব্যাডমিন্টনে রানার্স-আপ সাত্ত্বিক-চিরাগ জুটি',
    summary: 'India\'s top doubles pair finished as runners-up at Axiata Arena, Kuala Lumpur, losing a tight 3-game final (21-9, 18-21, 17-21) to World No. 1 Liang Wei Keng & Wang Chang (China).',
    summaryBn: 'কুয়ালালামপুরে অনুষ্ঠিত মালয়েশিয়া ওপেন সুপার ১০০০ টুর্নামেন্টে রৌপ্যপদক জিতল ভারতীয় জুটি।',
    keyPoints: [
      'First Indian men\'s doubles pair in history to reach the final of the Malaysia Open.',
      'Consolidated their World No. 1 ranking in the BWF World Tour standings.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Badminton World Federation (BWF) Tour Structure',
      points: [
        'BWF Super 1000 Tournaments: 4 Premier Events -> All England Open, Malaysia Open, Indonesia Open, China Open.',
        'BWF HQ: Kuala Lumpur, Malaysia.',
        'Thomas Cup (Men\'s World Team Championship): Won by India in May 2022 (defeated 14-time champions Indonesia 3-0 in Bangkok).'
      ]
    },
    examRelevance: 'WBCS Sports & Current Affairs.'
  },
  {
    id: 'sport-2026-11-afc-asian-cup-qatar',
    day: 12,
    dateStr: '12 Jan – 10 Feb 2026',
    category: 'sports',
    categoryLabel: '⚽ Asian Football Championships',
    title: '18th AFC Asian Cup Football Tournament Inaugurated at Lusail Stadium, Qatar',
    titleBn: 'কাতারের লুসাইল স্টেডিয়ামে ১৮তম এএফসি এশিয়ান কাপ ফুটবল শুরু',
    summary: '24 national teams competed in Asia\'s premier continental football championship hosted across 9 stadiums in Qatar.',
    summaryBn: 'কাতারে এশিয়ার বৃহত্তম ফুটবল প্রতিযোগিতা এএফসি এশিয়ান কাপের বর্ণাঢ্য আসর শুরু হলো।',
    keyPoints: [
      'Defending champions and hosts Qatar inaugurated tournament against Lebanon in front of 82,490 spectators.',
      'Indian National Football Team (Blue Tigers) led by captain Sunil Chhetri competed in Group B (alongside Australia, Uzbekistan, Syria).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Asian Football Confederation (AFC) & Indian Football',
      points: [
        'AFC: Formed on 8 May 1954 in Manila | HQ: Kuala Lumpur, Malaysia.',
        'AIFF (All India Football Federation): Established in 1937 at Shimla | HQ: Football House, New Delhi (President: Kalyan Chaubey).',
        'Sunil Chhetri: 4th highest all-time international goal scorer in men\'s football history (after Cristiano Ronaldo, Lionel Messi, and Ali Daei).'
      ]
    },
    examRelevance: 'WBCS Sports & Football History, WBP SI.'
  },
  {
    id: 'sport-2026-12-bopanna-world-no1',
    day: 27,
    dateStr: 'January 2026',
    category: 'sports',
    categoryLabel: '⚽ ATP World Ranking Records',
    title: 'Rohan Bopanna Becomes Oldest World No. 1 in ATP Doubles History at Age 43',
    titleBn: '৪৩ বছর বয়সে বিশ্বের প্রবীণতম এক নম্বর খেলোয়াড় হয়ে ইতিহাস গড়লেন রোহান বোপান্না',
    summary: 'India\'s tennis legend Rohan Bopanna climbed to World No. 1 in the ATP Men\'s Doubles rankings alongside partner Matthew Ebden (Australia).',
    summaryBn: 'আন্তর্জাতিক টেনিসের ইতিহাসে সবচেয়ে বেশি বয়সে এটিপি ডাবলসে বিশ্বের ১ নম্বর স্থান অধিকার করলেন বোপান্না।',
    keyPoints: [
      'Broke the record previously held by USA\'s Mike Bryan (who achieved No. 1 at 41 years and 76 days).',
      'Won the Australian Open Men\'s Doubles Grand Slam trophy.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Indian Tennis Legends & Grand Slam Champions',
      points: [
        'Leander Paes: 18 Grand Slam titles (8 Men\'s Doubles, 10 Mixed Doubles); Bronze medal at 1996 Atlanta Olympics Singles.',
        'Mahesh Bhupathi: 12 Grand Slam titles; India\'s 1st Grand Slam winner (1997 French Open Mixed Doubles with Rika Hiraki).',
        'Sania Mirza: 6 Grand Slam titles (3 Doubles, 3 Mixed Doubles); 1st Indian woman World No. 1.',
        'Rohan Bopanna: 2017 French Open Mixed Doubles (with Gabriela Dabrowski) + 2024 Australian Open Men\'s Doubles.'
      ]
    },
    examRelevance: 'Guaranteed question in all 2026 WBCS & Police exams.'
  },

  // =========================================================================
  // 12. ENVIRONMENT, WILDLIFE & CONSERVATION (8 EVENTS)
  // =========================================================================
  {
    id: 'env-2026-01-ramsar-5-new-sites',
    day: 31,
    dateStr: '31 January 2026',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Ramsar Wetland Sites',
    title: 'India Adds 5 New Ramsar Sites on World Wetlands Day Eve, Total Reaches 80 Sites',
    titleBn: 'ভারতে আরও ৫টি নতুন রামসার জলাভূমি যুক্ত: মোট সংখ্যা বেড়ে দাঁড়াল ৮০টি',
    summary: 'Ministry of Environment, Forest and Climate Change (MoEFCC) announced 5 newly designated Wetlands of International Importance in Karnataka (3) and Tamil Nadu (2).',
    summaryBn: 'কর্ণাটক ও তামিলনাড়ুর ৫টি পরিবেশগত গুরুত্বপূর্ণ জলাভূমিকে আন্তর্জাতিক রামসার সাইটের স্বীকৃতি দেওয়া হলো।',
    keyPoints: [
      '3 New Sites in Karnataka: 1. Magadi Kere Conservation Reserve (Gadag), 2. Ankasamudra Bird Conservation Reserve (Vijayanagara), 3. Aghanashini Estuary (Uttara Kannada).',
      '2 New Sites in Tamil Nadu: 1. Karaivetti Bird Sanctuary (Ariyalur), 2. Longwood Shola Reserve Forest (Nilgiris).',
      'Tamil Nadu holds the highest number of Ramsar sites in India (16 sites), followed by Uttar Pradesh (10 sites).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Ramsar Convention & Indian Wetlands',
      points: [
        'Ramsar Convention: Signed on 2 February 1971 in Ramsar, Iran; entered into force 1975; India became a contracting party on 1 Feb 1982.',
        '1st Ramsar Sites in India: Chilika Lake (Odisha) and Keoladeo National Park (Rajasthan) in 1981.',
        'Largest Ramsar Site in India: Sundarbans Wetland, West Bengal (4,230 sq km).',
        'Smallest Ramsar Site in India: Renuka Wetland, Himachal Pradesh (0.2 sq km).',
        'Montreux Record in India: Keoladeo NP (Rajasthan) and Loktak Lake (Manipur).'
      ]
    },
    examRelevance: 'Core question for WBCS Prelims (Environment) & UPSC Prelims.'
  },
  {
    id: 'env-2026-02-pench-dark-sky-park',
    day: 8,
    dateStr: 'January 2026',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Astro-Tourism & Dark Skies',
    title: 'Pench Tiger Reserve Recognized as India\'s 1st International Dark Sky Park',
    titleBn: 'ভারতের প্রথম আন্তর্জাতিক "ডার্ক স্কাই পার্ক"-এর স্বীকৃতি পেল পেঞ্চ ব্যাঘ্র প্রকল্প',
    summary: 'Pench Tiger Reserve in Maharashtra became India\'s first and Asia\'s fifth designated International Dark Sky Park, certified by DarkSky International.',
    summaryBn: 'মহারাষ্ট্রের পেঞ্চ ন্যাশনাল পার্ক রাতের আকাশ ও জীববৈচিত্র্য সংরক্ষণে এশিয়ার পঞ্চম ডার্ক স্কাই পার্ক হলো।',
    keyPoints: [
      'Protects nocturnal ecosystem from artificial light pollution and promotes astro-tourism.',
      'Installed retrofitted glare-shielded lighting across 65 surrounding buffer villages.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Pench Tiger Reserve & Project Tiger',
      points: [
        'Pench Tiger Reserve: Straddles Seoni/Chhindwara (Madhya Pradesh) and Nagpur (Maharashtra); inspired Rudyard Kipling\'s *The Jungle Book*.',
        'Project Tiger: Launched 1 April 1973 at Jim Corbett NP; managed by NTCA (National Tiger Conservation Authority).',
        'Hanle Dark Sky Reserve: India\'s 1st Dark Sky Reserve in Changthang Wildlife Sanctuary, Ladakh (est. 2022).'
      ]
    },
    examRelevance: 'WBCS Environment, Geography & Food SI.'
  },
  {
    id: 'env-2026-03-cabo-verde-malaria-free',
    day: 12,
    dateStr: 'January 2026',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Global Disease Eradication',
    title: 'WHO Certifies Cabo Verde as Malaria-Free: 3rd African Nation to Achieve Feat',
    titleBn: 'আফ্রিকার তৃতীয় দেশ হিসেবে কেপ ভার্দেকে ম্যালেরিয়ামুক্ত ঘোষণা করল বিশ্ব স্বাস্থ্য সংস্থা (WHO)',
    summary: 'World Health Organization certified archipelago nation of Cabo Verde (Cape Verde) as malaria-free, with zero indigenous transmission for over 3 consecutive years.',
    summaryBn: 'টানা তিন বছর ম্যালেরিয়ার কোনো সংক্রমণ না থাকায় ডব্লিউএইচও এই ঐতিহাসিক স্বীকৃতি প্রদান করল।',
    keyPoints: [
      'Joined Mauritius (1973) and Algeria (2019) as the only 3 certified malaria-free nations in the WHO African Region.',
      'Total of 43 countries and 1 territory certified malaria-free globally.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Malaria Parasite & Medical Discoveries',
      points: [
        'Causative Agent: Plasmodium protozoan parasite (P. falciparum, P. vivax, P. malariae, P. ovale) transmitted by female Anopheles mosquito.',
        'Sir Ronald Ross: Discovered the malaria transmission cycle on 20 August 1897 in Secunderabad/Kolkata (Presidency General Hospital, now SSKM; Nobel Prize 1902).',
        'RTS,S / AS01 (Mosquirix) & R21/Matrix-M: WHO-approved malaria vaccines.'
      ]
    },
    examRelevance: 'WBCS Biology & General Science, WBPSC Clerkship.'
  },
  {
    id: 'env-2026-04-punganur-dwarf-cow',
    day: 14,
    dateStr: 'January 2026',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Indigenous Livestock Breeds',
    title: 'Andhra Pradesh\'s Rare "Punganur Dwarf Cow" in National Conservation Spotlight',
    titleBn: 'অন্ধ্রপ্রদেশের বিলুপ্তপ্রায় ক্ষুদ্রাকৃতি "পুঙ্গানুর দেশীয় গরু" সংরক্ষণ কর্মসূচি',
    summary: 'Prime Minister Narendra Modi fed Punganur cows at his residence on Makar Sankranti, spotlighting national efforts under Rashtriya Gokul Mission to preserve the world\'s shortest humped cattle breed.',
    summaryBn: 'বিশ্বের সবচেয়ে খর্বাকৃতি দেশীয় গো-বংশ পুঙ্গানুর জাত সংরক্ষণে বিশেষ জোর দেওয়া হলো।',
    keyPoints: [
      'Indigenous to Punganur taluk in Chittoor district of Andhra Pradesh; height ranges between 70 cm to 90 cm.',
      'Milk is highly nutritious with high fat content (up to 8%) and rich in A2 beta-casein protein and medicinal minerals.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Indigenous Cattle Breeds & Gokul Mission',
      points: [
        'Rashtriya Gokul Mission: Launched in Dec 2014 under Ministry of Fisheries, Animal Husbandry & Dairying for conservation of indigenous bovine breeds.',
        'NBAGR (National Bureau of Animal Genetic Resources): Located in Karnal, Haryana (registers new indigenous animal breeds).',
        'Other Indigenous Indian Cattle Breeds: Gir (Gujarat), Sahiwal (Punjab/Haryana), Red Sindhi, Ongole (AP), Tharparkar (Rajasthan), Kangayam (TN).'
      ]
    },
    examRelevance: 'WBCS Agriculture & Environment, UPSC Prelims.'
  },
  {
    id: 'env-2026-05-wetland-city-accreditation',
    day: 5,
    dateStr: 'January 2026',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Urban Wetland Conservation',
    title: 'MoEFCC Nominates 3 Indian Cities (Indore, Bhopal, Udaipur) for Wetland City Accreditation',
    titleBn: 'রামসার "ওয়েটল্যান্ড সিটি" সম্মানের জন্য ইন্দোর, ভোপাল ও উদয়পুরকে মনোনীত করল ভারত',
    summary: 'India submitted first-ever nominations for Ramsar Convention\'s Voluntary Wetland City Accreditation (WCA) recognizing municipal protection of urban lakes and wetlands.',
    summaryBn: 'শহুরে জলাভূমি সংরক্ষণে আন্তর্জাতিক স্বীকৃতির জন্য ভারতের তিনটি ঐতিহ্যবাহী শহরকে পাঠানো হলো।',
    keyPoints: [
      'Indore (Sirpur Lake & Yashwant Sagar Ramsar sites), Bhopal (Bhoj Wetland), and Udaipur ("City of Lakes" - Pichola, Fateh Sagar, Udai Sagar).',
      'WCA recognizes cities that value and maintain natural urban wetland ecosystems.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Bhoj Wetland & Urban Ecosystems',
      points: [
        'Bhoj Wetland: In Bhopal, MP; created in 11th century by Paramara King Raja Bhoj; designated Ramsar site in 2002.',
        'East Kolkata Wetlands (EKW): Designated Ramsar site in 2002; world\'s largest wastewater-fed natural aquaculture system (125 sq km).'
      ]
    },
    examRelevance: 'WBCS Environment & Urban Planning.'
  },
  {
    id: 'env-2026-06-golden-tiger-kaziranga',
    day: 24,
    dateStr: 'January 2026',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Rare Wildlife Genetics',
    title: 'Extremely Rare "Golden Tabby Tiger" (Kazi 106F) Photographed in Kaziranga National Park',
    titleBn: 'কাজিবাঙা জাতীয় উদ্যানে ক্যামেরাবন্দী বিরল "গোল্ডেন টাইগার" (সোনার বাঘ)',
    summary: 'A rare female Royal Bengal Tiger showing golden tabby coat (strawberry tiger) was sighted and photographed in the Kohora range of Kaziranga, Assam.',
    summaryBn: 'কাজিবাঙা জাতীয় উদ্যানে জেনেটিক মিউটেশনের কারণে জন্ম নেওয়া অপূর্ব সোনালী রঙের বাঘ দেখা গেল।',
    keyPoints: [
      'Caused by a recessive mutant allele in agouti gene (wideband gene) that reduces black melanin melanin pigmentation.',
      'Kaziranga National Park is the only wild habitat in the world known to house free-roaming golden tigers.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Kaziranga National Park & Tiger Reserves in Assam',
      points: [
        'Kaziranga NP: UNESCO World Heritage Site (1985); Tiger Reserve (2006); holds 2/3rds of the world\'s Great One-Horned Rhinoceros (Rhinoceros unicornis).',
        'National Parks of Assam (7 NPs): Kaziranga, Manas, Dibru-Saikhowa, Nameri, Orang, Raimona (6th, 2021), Dihing Patkai (7th, 2021).'
      ]
    },
    examRelevance: 'WBCS Northeast Geography & Environment.'
  },
  {
    id: 'env-2026-07-asian-waterbird-census',
    day: 15,
    dateStr: 'January 2026',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Ornithology & Avian Census',
    title: 'Asian Waterbird Census (AWC) 2026 Completed in Chilika Lake and Sundarbans',
    titleBn: 'চিল্কা হ্রদ ও সুন্দরবনে এশিয়ান ওয়াটারবার্ড পাখি শুমারি ২০২৬ সম্পন্ন',
    summary: 'Annual citizen-science waterbird census coordinated by Wetlands International and Bombay Natural History Society (BNHS) recorded thousands of migratory waterfowl.',
    summaryBn: 'আন্তর্জাতিক ও দেশীয় সংস্থার যৌথ উদ্যোগে পূর্ব ভারতের প্রধান জলাভূমিগুলিতে পরিযায়ী পাখির শুমারি অনুষ্ঠিত হলো।',
    keyPoints: [
      'Chilika Lake recorded over 11 lakh migratory birds across 105+ species, including Northern Pintail, Bar-headed Goose, and Greater Flamingo.',
      'Helps assess health of wetlands along the Central Asian Flyway (CAF).'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Bombay Natural History Society (BNHS) & Flyways',
      points: [
        'BNHS: Founded on 15 Sept 1883 in Mumbai (Motto bird: Great Hornbill, "William") | Dr. Salim Ali ("Birdman of India") associated with BNHS.',
        'Central Asian Flyway (CAF): Covers migratory route of 279 bird species between Arctic breeding grounds and Indian Ocean wintering grounds (India covers 70% of CAF).'
      ]
    },
    examRelevance: 'WBCS Environment & Wildlife, UPSC Prelims.'
  },
  {
    id: 'env-2026-08-steel-slag-road-nh66',
    day: 13,
    dateStr: 'January 2026',
    category: 'environment_wildlife',
    categoryLabel: '🌿 Waste-to-Wealth Infrastructure',
    title: 'India Inaugurates 1st National Highway Steel Slag Road Section on NH-66 (Mumbai-Goa)',
    titleBn: 'মুম্বই-গোয়া জাতীয় সড়ক ৬৬-এ ভারতের প্রথম ইস্পাত বর্জ্য (স্টিল স্ল্যাগ) নির্মিত হাইওয়ে উদ্বোধন',
    summary: 'CSIR-CRRI in partnership with Ministry of Steel and NHAI constructed a 1 km test section on NH-66 using 100% processed steel slag aggregate in place of natural crushed stone.',
    summaryBn: 'প্রাকৃতিক পাথরের পরিবর্তে ইস্পাত কারখানার বর্জ্য ব্যবহার করে টেকসই ও দীর্ঘস্থায়ী মহাসড়ক নির্মিত হলো।',
    keyPoints: [
      'Reduces road construction carbon footprint by 30% and utilizes millions of tonnes of industrial steel slag waste.',
      'Demonstrates 30% higher durability and resistance to heavy monsoon rainfall weathering.'
    ],
    staticGk: {
      title: '🏛️ STATIC GK: Circular Economy & Steel Industry in India',
      points: [
        'India Steel Ranking: 2nd largest crude steel producer globally after China (surpassed Japan in 2018).',
        'National Steel Policy 2017: Targets 300 MT crude steel capacity by 2030-31.',
        '1st Steel Slag Industrial Road: Built in Surat, Gujarat in 2022 by CSIR-CRRI and ArcelorMittal Nippon Steel.'
      ]
    },
    examRelevance: 'WBCS Science & Tech (Environment), Food SI.'
  },

  // =========================================================================
  // 13. CHRONOLOGICAL IMPORTANT DAYS & THEMES (12 EVENTS)
  // =========================================================================
  {
    id: 'day-2026-01-drdo-family-day',
    day: 1,
    dateStr: '01 January 2026',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'Global Family Day 2026 & 68th Foundation Day of DRDO',
    titleBn: 'বিশ্ব পরিবার দিবস ২০২৬ ও ডিআরডিও-র ৬৮তম প্রতিষ্ঠা দিবস',
    summary: 'Observed to promote peace, family solidarity, and indigenous self-reliance in defense technology.',
    summaryBn: '১ জানুয়ারি ২০২৬ বিশ্ব পরিবার দিবস এবং ডিআরডিও-র ৬৮তম প্রতিষ্ঠা দিবস পালিত হয়।',
    keyPoints: ['DRDO formed on 1 Jan 1958 under Ministry of Defence.'],
    staticGk: {
      title: '🏛️ STATIC GK: DRDO Foundation',
      points: ['DRDO Chairman: Dr. Samir V. Kamat | HQ: New Delhi.']
    },
    examRelevance: 'WBPSC Food SI, Clerkship.'
  },
  {
    id: 'day-2026-04-world-braille-day',
    day: 4,
    dateStr: '04 January 2026',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'World Braille Day 2026 Observed on Louis Braille\'s Birth Anniversary',
    titleBn: 'বিশ্ব ব্রেইল দিবস ২০২৬: লুই ব্রেইলের জন্মবার্ষিকী উদযাপন',
    summary: 'Commemorates Louis Braille (born 1809, France) who invented the 6-dot tactile reading and writing system for the visually impaired.',
    summaryBn: '৪ জানুয়ারি দৃষ্টিহীনদের স্পর্শভিত্তিক বর্ণমালার আবিষ্কারক লুই ব্রেইলের স্মরণে বিশ্ব ব্রেইল দিবস পালিত হয়।',
    keyPoints: ['Designated by UN General Assembly in 2018 to promote accessibility under UN CRPD.'],
    staticGk: {
      title: '🏛️ STATIC GK: RPwD Act 2016',
      points: ['Recognizes 21 disabilities; 4% reservation in government jobs.']
    },
    examRelevance: 'Primary TET, WBCS.'
  },
  {
    id: 'day-2026-09-pravasi-bharatiya',
    day: 9,
    dateStr: '09 January 2026',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'Pravasi Bharatiya Divas (Non-Resident Indian Day) 2026',
    titleBn: 'প্রবাসী ভারতীয় দিবস ২০২৬ (এনআরআই দিবস)',
    summary: 'Commemorates Mahatma Gandhi\'s return from South Africa to Mumbai on 9 January 1915 aboard SS Arabia.',
    summaryBn: '১৯১৫ সালের ৯ জানুয়ারি মহাত্মা গান্ধীর স্বদেশ প্রত্যাবর্তনের স্মরণে এই দিবস পালিত হয়।',
    keyPoints: [
      'Instituted in 2003 by Atal Bihari Vajpayee Government on recommendation of L.M. Singhvi Committee.'
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
    id: 'day-2026-10-world-hindi-day',
    day: 10,
    dateStr: '10 January 2026',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'World Hindi Day (Vishwa Hindi Diwas) 2026 Observed Globally',
    titleBn: 'বিশ্ব হিন্দি দিবস ২০২৬ উদযাপন',
    summary: 'Marks the anniversary of the 1st World Hindi Conference held in Nagpur on 10 January 1975 under Indira Gandhi.',
    summaryBn: '১৯৭৫ সালের ১০ জানুয়ারি নাগপুরে প্রথম বিশ্ব হিন্দি সম্মেলনের স্মরণে বিশ্বজুড়ে এই দিবস পালিত হয়।',
    keyPoints: ['Note: National Hindi Diwas is celebrated on 14 September.'],
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
    id: 'day-2026-12-national-youth-day',
    day: 12,
    dateStr: '12 January 2026',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'National Youth Day (Rashtriya Yuva Diwas) 2026 on Swami Vivekananda\'s 163rd Birthday',
    titleBn: 'জাতীয় যুব দিবস ২০২৬: স্বামী বিবেকানন্দের ১৬৩তম জন্মজয়ন্তী উদযাপন',
    summary: 'Celebrates the 163rd birth anniversary of Swami Vivekananda (born 12 January 1863 in Kolkata).',
    summaryBn: '১২ জানুয়ারি স্বামী বিবেকানন্দের জন্মদিবস উপলক্ষে দেশজুড়ে জাতীয় যুব দিবস ও যুব উৎসব উদযাপিত হলো।',
    keyPoints: [
      'National Youth Festival organized across India empowering youth leadership for Viksit Bharat@2047.'
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
    id: 'day-2026-15-army-day',
    day: 15,
    dateStr: '15 January 2026',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: '78th Indian Army Day 2026 Celebrated Across Military Commands',
    titleBn: '৭৮তম ভারতীয় সেনা দিবস ২০২৬ উদযাপন',
    summary: 'Commemorates Field Marshal K.M. Cariappa taking over as 1st Indian Commander-in-Chief from Gen Sir Francis Roy Butcher on 15 January 1949.',
    summaryBn: '১৯৪৯ সালে প্রথম ভারতীয় সেনাপ্রধান হিসেবে দায়িত্বভার গ্রহণের স্মরণে সেনা দিবস পালিত হয়।',
    keyPoints: ['Annual Army Day Parade celebrated showcasing cutting-edge drone swarms and indigenous weaponry.'],
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
    id: 'day-2026-16-startup-day',
    day: 16,
    dateStr: '16 January 2026',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'National Startup Day 2026: Marking 10 Years of Startup India',
    titleBn: 'জাতীয় স্টার্টআপ দিবস ২০২৬: স্টার্টআপ ইন্ডিয়া প্রকল্পের ১০ বছর পূর্তি',
    summary: 'Commemorates launch of Startup India on 16 Jan 2016, driving deep-tech innovation and digital enterprise across the nation.',
    summaryBn: '১৬ জানুয়ারি দেশজুড়ে জাতীয় স্টার্টআপ দিবস হিসেবে পালিত হয়।',
    keyPoints: ['National Startup Awards and grassroots incubators recognized by DPIIT.'],
    staticGk: {
      title: '🏛️ STATIC GK: DPIIT & Startups',
      points: ['DPIIT functions under Ministry of Commerce and Industry.']
    },
    examRelevance: 'WBCS Economy & Governance.'
  },
  {
    id: 'day-2026-21-ne-statehood-day',
    day: 21,
    dateStr: '21 January 2026',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: '54th Statehood Day of Tripura, Manipur, and Meghalaya',
    titleBn: 'ত্রিপুরা, মণিপুর ও মেঘালয়ের ৫৪তম প্রতিষ্ঠা দিবস ২০২৬',
    summary: 'Commemorates granting of full statehood to Tripura, Manipur, and Meghalaya under the North-Eastern Areas (Reorganisation) Act, 1971.',
    summaryBn: '১৯৭২ সালের ২১ জানুয়ারি উত্তর-পূর্ব পুনর্গঠন আইনের মাধ্যমে এই তিন রাজ্য পূর্ণ রাজ্যের মর্যাদা পায়।',
    keyPoints: ['Historic milestone for Northeast political consolidation.'],
    staticGk: {
      title: '🏛️ STATIC GK: North-Eastern Statehood History',
      points: [
        'Nagaland: 16th State (1963).',
        'Tripura, Manipur, Meghalaya: 1972 via NE Reorganisation Act, 1971.',
        'Sikkim: 36th Amendment Act, 1975 (22nd State).',
        'Mizoram & Arunachal Pradesh: 1987 (23rd & 24th States).'
      ]
    },
    examRelevance: 'WBCS Polity (States Reorganisation), UPSC Prelims.'
  },
  {
    id: 'day-2026-23-parakram-diwas',
    day: 23,
    dateStr: '23 January 2026',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'Parakram Diwas 2026 Observed on Netaji Subhas Chandra Bose\'s 129th Birth Anniversary',
    titleBn: 'পরাক্রম দিবস ২০২৬: নেতাজি সুভাষচন্দ্র বসুর ১২৯তম জন্মজয়ন্তী পালন',
    summary: 'India observed Parakram Diwas on 23 January 2026 celebrating the 129th birth anniversary of Netaji Subhas Chandra Bose (born 1897 in Cuttack).',
    summaryBn: 'নেতাজি সুভাষচন্দ্র বসুর ১২৯তম জন্মজয়ন্তী উপলক্ষে লালকেল্লায় "ভারত পর্ব" ও জাতীয় পরাক্রম দিবস পালিত হলো।',
    keyPoints: [
      'Special tributes paid at Netaji Bhawan (Kolkata) and National War Memorial (New Delhi).'
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
    id: 'day-2026-24-girl-child-day',
    day: 24,
    dateStr: '24 January 2026',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'National Girl Child Day 2026 & International Day of Education',
    titleBn: 'জাতীয় কন্যা শিশু দিবস ২০২৬ ও আন্তর্জাতিক শিক্ষা দিবস',
    summary: 'Observed to address gender bias, female feticide, and promote education and health rights for girl children.',
    summaryBn: '২৪ জানুয়ারি কন্যা শিশুদের অধিকার ও শিক্ষার সুরক্ষায় জাতীয় কন্যা শিশু দিবস পালিত হলো।',
    keyPoints: ['Promotes Beti Bachao Beti Padhao initiatives across rural districts.'],
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
    id: 'day-2026-25-national-voters-day',
    day: 25,
    dateStr: '25 January 2026',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: '16th National Voters\' Day (ECI 76th Foundation Day, Established 25 Jan 1950)',
    titleBn: '১৬তম জাতীয় ভোটার দিবস ২০২৬ (নির্বাচন কমিশনের প্রতিষ্ঠা দিবস)',
    summary: 'Celebrated across India under theme "Nothing Like Voting, I Vote for Sure" to encourage youth democratic participation.',
    summaryBn: 'গণতান্ত্রিক ভোটাধিকারের গুরুত্ব প্রসারে ১৬তম জাতীয় ভোটার দিবস পালিত হয়।',
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
    id: 'day-2026-30-martyrs-day',
    day: 30,
    dateStr: '30 January 2026',
    category: 'days',
    categoryLabel: '📅 Important Days',
    title: 'Martyrs\' Day (Shaheed Diwas) 2026 on Mahatma Gandhi\'s 78th Death Anniversary',
    titleBn: 'শহিদ দিবস ২০২৬: মহাত্মা গান্ধীর ৭৮তম প্রয়াণ দিবসে দেশজুড়ে শ্রদ্ধা নিবেদন',
    summary: 'Nation observed two minutes of silence on 30 January 2026 paying homage to Father of the Nation Mahatma Gandhi on his 78th death anniversary.',
    summaryBn: '১৯৪৮ সালের ৩০ জানুয়ারি মহাত্মা গান্ধীর প্রয়াণ দিবসটিকে শহিদ দিবস হিসেবে পালন করা হয়।',
    keyPoints: [
      'Two minutes of silence observed across the country at 11:00 AM in memory of India\'s freedom fighters.'
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

const fileContent = fileHeader + JSON.stringify(all124Events, null, 2) + ';\n';
fs.writeFileSync(path.resolve('src/data/januaryMegaCompendium.ts'), fileContent, 'utf-8');
console.log('Successfully written complete 124-event January 2026 compendium! Total Count:', all124Events.length);
