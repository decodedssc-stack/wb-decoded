import fs from 'fs';
import path from 'path';

// Complete January 2026 specific master events
const all2026Events = [
  // 1. WEST BENGAL & EAST INDIA SPECIAL (JANUARY 2026)
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

  // 2. NATIONAL CELEBRATIONS, GOVERNANCE & LAW (JANUARY 2026)
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
    id: 'nat-2026-06-sampoornata-2026',
    day: 15,
    dateStr: 'January 2026',
    category: 'national',
    categoryLabel: '🇮🇳 Governance Campaigns',
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
    id: 'nat-2026-07-finance-commission-16',
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
    id: 'nat-2026-08-sc-diamond-jubilee-year',
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
    id: 'nat-2026-09-icmr-kyasanur-vaccine',
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
    id: 'nat-2026-10-bharat-rang-mahotsav-25',
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

  // 3. AWARDS, HONORS & CIVILIAN RECOGNITIONS (JANUARY 2026)
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

  // 4. INTERNATIONAL AFFAIRS & SUMMITS (JANUARY 2026)
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

  // 5. SPORTS & ATHLETIC RECORDS (JANUARY 2026)
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

  // 6. CHRONOLOGICAL CALENDAR OF JANUARY 2026 DAYS & THEMES
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

const fileContent = fileHeader + JSON.stringify(all2026Events, null, 2) + ';\n';
fs.writeFileSync(path.resolve('src/data/januaryMegaCompendium.ts'), fileContent, 'utf-8');
console.log('Successfully written pure January 2026 compendium! Count:', all2026Events.length);
