export interface MagazineEvent {
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

export const FEBRUARY_100_EVENTS: MagazineEvent[] = [
  {
    "id": "wb-feb-01-state-budget-2026",
    "day": 8,
    "dateStr": "08 February 2026",
    "category": "wb",
    "categoryLabel": "🏛️ West Bengal Special",
    "title": "West Bengal Presents ₹4.06 Lakh Crore State Budget 2026–27: \"Banglar Yuva Sathi\" & Welfare Scale-Up",
    "titleBn": "পশ্চিমবঙ্গ বিধানসভায় ₹৪.০৬ লক্ষ কোটি টাকার বাজেট: \"বাংলার যুব সাথী\" ও লক্ষ্মীর ভাণ্ডার অনুদান বৃদ্ধি",
    "summary": "Finance Minister Chandrima Bhattacharya presented the WB State Budget featuring the new \"Banglar Yuva Sathi\" unemployment allowance of ₹1,500/month for youth aged 21–40, ₹500 hike in Lakshmir Bhandar, and a 4% DA hike for state employees.",
    "summaryBn": "রাজ্য বাজেটে বেকার যুবকদের জন্য মাসিক ₹১,৫০০ টাকার বাংলার যুব সাথী প্রকল্প, লক্ষ্মীর ভাণ্ডারে ₹৫০০ বৃদ্ধি ও ৪% মহার্ঘ ভাতা (DA) ঘোষণা করা হলো।",
    "keyPoints": [
      "Banglar Yuva Sathi: ₹1,500 monthly financial stipend for unemployed youth aged 21 to 40 years enrolled in employment exchanges.",
      "Lakshmir Bhandar: Monthly entitlement enhanced by ₹500 across General and SC/ST women categories.",
      "4% additional Dearness Allowance (DA) for state government employees, teachers, and pensioners.",
      "Enhanced honorarium for grassroots ASHA workers and Anganwadi auxiliary staff."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Constitutional Budgetary Provisions for States",
      "points": [
        "Article 202: Annual Financial Statement of the State Legislature (State Budget).",
        "Article 203: Procedure in Legislature with respect to Estimates and Demands for Grants.",
        "Article 204: Appropriation Bills of the State.",
        "West Bengal Legislative Assembly: 294 directly elected members (Single chamber / Unicameral legislature since abolition of Legislative Council in 1969 via Article 169)."
      ]
    },
    "examRelevance": "Guaranteed 2-3 questions in WBCS Mains Paper V (WB Economy), WBPSC Clerkship, and Food SI."
  },
  {
    "id": "wb-feb-02-kolkata-bookfair-closing-2026",
    "day": 3,
    "dateStr": "03 February 2026",
    "category": "wb",
    "categoryLabel": "🏛️ West Bengal Cultural Heritage",
    "title": "49th International Kolkata Book Fair Concludes: Argentina as Focal Theme Country",
    "titleBn": "৪৯তম আন্তর্জাতিক কলকাতা বইমেলার সফল সমাপ্তি: আর্জেন্টিনার বিশেষ সাহিত্য প্যাভিলিয়ন",
    "summary": "The 49th International Kolkata Book Fair concluded at Boi Mela Prangan in Salt Lake with record footfall of 27+ lakh readers and over ₹25 Crore in total book transactions.",
    "summaryBn": "সল্টলেকের সেন্ট্রাল পার্কে আর্জেন্টিনার সাহিত্য ও রবীন্দ্রনাথ ঠাকুরের ১৯২৪ সালের বুয়েনস আইরেস সফরের স্মৃতি নিয়ে বইমেলা সম্পন্ন হলো।",
    "keyPoints": [
      "Focal Theme Country Argentina commemorated the 102nd anniversary of Rabindranath Tagore's historic 1924 visit to Buenos Aires and his friendship with Victoria Ocampo.",
      "Organized by the Publishers & Booksellers Guild (est. 1975).",
      "Over 1,000 publishers and international stalls participated from 20+ countries."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Tagore & Argentina Connections",
      "points": [
        "Victoria Ocampo: Renowned Argentine writer and intellectual who hosted Rabindranath Tagore at Villa Ocampo in San Isidro, Buenos Aires (1924).",
        "Tagore dedicated his poetry collection *Purabi* (বিজয়া) to Victoria Ocampo.",
        "Kolkata Book Fair: 1st held in 1976 opposite Academy of Fine Arts; world's largest non-trade book fair by public footfall."
      ]
    },
    "examRelevance": "WBCS Bengal History, Literature & WBPSC Miscellaneous."
  },
  {
    "id": "wb-feb-03-kolkata-metro-orange-line-2026",
    "day": 15,
    "dateStr": "February 2026",
    "category": "wb",
    "categoryLabel": "🏛️ Urban Rail Infrastructure",
    "title": "Kolkata Metro Advances Orange Line Extension: Chingrighata Viaduct Gap Cleared Toward Sector V",
    "titleBn": "কলকাতা মেট্রোর অরেঞ্জ লাইন সম্প্রসারণ: চিংড়িঘাটা ভায়াডাক্টের জটিলতা দূর করে সেক্টর ফাইভের দিকে অগ্রগতি",
    "summary": "Kolkata Metro (Line 6 / Orange Line) completed structural deck placements resolving the long-standing Chingrighata bottleneck, advancing the corridor from Beleghata toward Salt Lake Sector V.",
    "summaryBn": "কবি সুভাষ (নিউ গড়িয়া) থেকে বিমানবন্দরগামী অরেঞ্জ লাইনের চিংড়িঘাটা অংশের নির্মাণ জট কাটিয়ে সেক্টর ফাইভের দিকে কাজের দ্রুত অগ্রগতি।",
    "keyPoints": [
      "Orange Line connects Kavi Subhash (New Garia) to Netaji Subhash Chandra Bose International Airport via EM Bypass and Rajarhat (29.87 km).",
      "Operational stretch from Kavi Subhash to Beleghata (Hemanta Mukhopadhyay to Beleghata) being extended to IT Centre (Sector V).",
      "Enables high-speed direct transit between South Kolkata and the Salt Lake IT hub in ~30 minutes."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Kolkata Metro Corridor Lines (Line 1 to Line 6)",
      "points": [
        "Line 1 (Blue Line): Dakshineswar ⇄ Kavi Subhash (New Garia) - 32.25 km (India's 1st operational metro line, 1984).",
        "Line 2 (Green Line / East-West Metro): Howrah Maidan ⇄ Sector V - 16.6 km (India's 1st underwater tunnel under Hooghly; fully unified in Aug 2025).",
        "Line 3 (Purple Line): Joka ⇄ Esplanade via Majerhat.",
        "Line 4 (Yellow Line): Noapara ⇄ Airport ⇄ Barasat.",
        "Line 6 (Orange Line): Kavi Subhash ⇄ NSCBI Airport via EM Bypass & Rajarhat."
      ]
    },
    "examRelevance": "Core infrastructure question in WBCS Prelims, WB Police SI, and Kolkata Police SI."
  },
  {
    "id": "wb-feb-04-sundarbans-ai-tiger-census-2026",
    "day": 18,
    "dateStr": "February 2026",
    "category": "wb",
    "categoryLabel": "🏛️ Wildlife & Ecology",
    "title": "Sundarban Biosphere Reserve Deploys AI Camera Traps for 2026 All-India Tiger Estimation Cycle",
    "titleBn": "সুন্দরবন ব্যাঘ্র প্রকল্পে ২০২৬ সালের সর্বভারতীয় ব্যাঘ্র শুমারির অংশ হিসেবে এআই ক্যামেরা ট্র্যাপ মোতায়েন",
    "summary": "West Bengal Forest Department completed camera trapping grid setups across Sundarbans Tiger Reserve, integrating AI facial and stripe recognition with M-STrIPES.",
    "summaryBn": "ম্যানগ্রোভ অরণ্যে বাঘের সংখ্যা ও গতিবিধি নির্ধারণে সর্বাধুনিক কৃত্রিম বুদ্ধিমত্তা ক্যামেরা প্রযুক্তি ব্যবহৃত হলো।",
    "keyPoints": [
      "Sundarbans Tiger Reserve covers 2,585 sq km hosting over 100 Royal Bengal Tigers adapted to tidal saline mangrove habitats.",
      "M-STrIPES: Monitoring System for Tigers - Intensive Protection and Ecological Status."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Protected Areas in West Bengal",
      "points": [
        "2 Tiger Reserves in West Bengal: 1. Sundarbans Tiger Reserve (South 24 Parganas, 1973), 2. Buxa Tiger Reserve (Alipurduar, 1983).",
        "6 National Parks in West Bengal: Sundarbans, Buxa, Gorumara, Jaldapara, Singalila, Neora Valley.",
        "Highest Peak of West Bengal: Sandakphu (3,636 meters) in Singalila National Park, Darjeeling."
      ]
    },
    "examRelevance": "WBCS Geography & Environment, WBP Constable & SI."
  },
  {
    "id": "wb-feb-05-statehood-arunachal-mizoram-2026",
    "day": 20,
    "dateStr": "20 February 2026",
    "category": "wb",
    "categoryLabel": "🏛️ Northeast Special",
    "title": "39th Statehood Day of Arunachal Pradesh and Mizoram Celebrated on 20 February 2026",
    "titleBn": "অরুণাচল প্রদেশ ও মিজোরামের ৩৯তম রাজ্য প্রতিষ্ঠা দিবস (২০ ফেব্রুয়ারি ২০২৬)",
    "summary": "Both northeastern states celebrated their 39th statehood day, having attained statehood on 20 February 1987 under the 53rd and 55th Constitutional Amendment Acts.",
    "summaryBn": "১৯৮৭ সালের ২০ ফেব্রুয়ারি ভারতের ২৩তম রাজ্য হিসেবে মিজোরাম এবং ২৪তম রাজ্য হিসেবে অরুণাচল প্রদেশ পূর্ণ রাজ্যের মর্যাদা পায়।",
    "keyPoints": [
      "Mizoram became the 23rd State of India following the historic 1986 Mizo Peace Accord.",
      "Arunachal Pradesh (\"Land of Dawn-Lit Mountains\", formerly NEFA) became the 24th State of India."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Northeast States Constitutional Amendments",
      "points": [
        "53rd Amendment Act, 1986: Special provision for Mizoram under Article 371G.",
        "55th Amendment Act, 1986: Special provision for Arunachal Pradesh under Article 371H.",
        "NEFA: North-East Frontier Agency was renamed Arunachal Pradesh as a UT in 1972."
      ]
    },
    "examRelevance": "WBCS Indian Polity (States Reorganisation), UPSC Prelims."
  },
  {
    "id": "wb-feb-06-similipal-tiger-census-2026",
    "day": 12,
    "dateStr": "February 2026",
    "category": "wb",
    "categoryLabel": "🏛️ East India Wildlife",
    "title": "Odisha Releases 2026 Tiger Census: Similipal Confirmed as World's Sole Melanistic Tiger Habitat",
    "titleBn": "ওড়িশা ব্যাঘ্র শুমারি ২০২৬: বিশ্বের একমাত্র ব্ল্যাক টাইগার বা মেলানিস্টিক বাঘের আবাসস্থল সিমলিপাল",
    "summary": "Odisha PCCF Wildlife documented over 30 Royal Bengal Tigers in Similipal Tiger Reserve, with exclusive genetic confirmation of wild pseudo-melanistic (black) tigers.",
    "summaryBn": "ওড়িশার ময়ূরভঞ্জে সিমলিপাল জাতীয় উদ্যানে জিনগত রূপান্তরের বিরল কালো বাঘের অস্তিত্ব নথিভুক্ত হলো।",
    "keyPoints": [
      "Pseudo-melanism is caused by a recessive mutation in the Transmembrane Aminopeptidase Q (Taqpep) gene resulting in merged dark stripes.",
      "Similipal Tiger Reserve in Mayurbhanj district is the world's only wild habitat for these unique melanistic tigers."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Similipal & Protected Areas in Odisha",
      "points": [
        "National Parks in Odisha: 1. Similipal NP (Mayurbhanj, 1980), 2. Bhitarkanika NP (Kendrapara, 1998 - Saltwater Crocodiles & Mangroves).",
        "Gahirmatha Marine Sanctuary: World's largest mass nesting (Arribada) rookery for Olive Ridley sea turtles (*Lepidochelys olivacea*)."
      ]
    },
    "examRelevance": "WBCS Prelims Geography & Environment."
  },
  {
    "id": "wb-feb-07-dooars-tea-tourism-2026",
    "day": 16,
    "dateStr": "February 2026",
    "category": "wb",
    "categoryLabel": "🏛️ North Bengal Special",
    "title": "North Bengal Dooars Eco-Tourism Circuit Integrates Heritage Tea Gardens & Tribal Homestays",
    "titleBn": "উত্তরবঙ্গের ডুয়ার্সে চা-বাগান হেরিটেজ হোমস্টে ও পরিবেশ পর্যটন সার্কিট সম্প্রসারণ",
    "summary": "West Bengal Tourism Development Corporation (WBTDCL) operationalized a connected tea tourism corridor across Jalpaiguri, Alipurduar, and Kalimpong.",
    "summaryBn": "উত্তরবঙ্গের চা বাগান ও বনাঞ্চলকে কেন্দ্র করে পরিবেশবান্ধব পর্যটন প্রকল্প গতি পেল।",
    "keyPoints": [
      "Integrates Jaldapara National Park (Greater One-Horned Rhino habitat) with colonial tea estates.",
      "Direct livelihood support for Rajbanshi, Toto, and Gorkha community youth."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Tea Industry & Tribes of North Bengal",
      "points": [
        "Darjeeling Tea: India's 1st Geographical Indication (GI) tag in 2004-05 (\"Champagne of Teas\").",
        "Tea Board of India: Statutory body under Ministry of Commerce & Industry | HQ: Kolkata (est. 1954).",
        "Toto Tribe: Primitive tribal group residing exclusively in Totopara village, Alipurduar district."
      ]
    },
    "examRelevance": "WBCS Bengal Geography & Anthropology."
  },
  {
    "id": "wb-feb-08-shillong-tourism-mart-2026",
    "day": 24,
    "dateStr": "February 2026",
    "category": "wb",
    "categoryLabel": "🏛️ Northeast Special",
    "title": "12th International Tourism Mart Held in Shillong, Meghalaya to Promote Regional Travel",
    "titleBn": "মেঘালয়ের শিলংয়ে ১২তম আন্তর্জাতিক পর্যটন মেলা ২০২৬ অনুষ্ঠিত",
    "summary": "Ministry of Tourism organized the annual trade mart in Shillong bringing together international tour operators and Northeast state stakeholders.",
    "summaryBn": "উত্তর-পূর্ব ভারতের পর্যটন সম্ভাবনা ও সংস্কৃতি তুলে ধরতে আন্তর্জাতিক প্রদর্শনী অনুষ্ঠিত হলো।",
    "keyPoints": [
      "Promoted Living Root Bridges (Jingkieng Jri - on UNESCO tentative list) and Mawlynnong (cleanest village in Asia).",
      "Focus on community homestays, adventure sports, and border tourism."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Meghalaya Geography & Natural Wonders",
      "points": [
        "Mawsynram & Cherrapunji (Sohra): Highest rainfall regions in the world located in East Khasi Hills.",
        "3 Major Hill Ranges: Garo Hills (Nokrek Peak), Khasi Hills (Shillong Peak - 1,965m), Jaintia Hills.",
        "Krem Liat Prah: Longest natural cave in South Asia (34+ km in Jaintia Hills)."
      ]
    },
    "examRelevance": "WBCS Northeast Geography & SSC."
  },
  {
    "id": "wb-feb-09-ramsar-patna-chhari-2026",
    "day": 2,
    "dateStr": "02 February 2026",
    "category": "wb",
    "categoryLabel": "🏛️ Ramsar Wetlands Network",
    "title": "World Wetlands Day 2026: Patna Bird Sanctuary (UP) & Chhari-Dhand (Gujarat) Designated as Ramsar Sites",
    "titleBn": "বিশ্ব জলাভূমি দিবসে উত্তরপ্রদেশের পাটনা পক্ষী অভয়ারণ্য ও গুজরাটের ছারি-ধাঁধকে নতুন রামসার সাইটের স্বীকৃতি",
    "summary": "MoEFCC announced the addition of Patna Bird Sanctuary (Etah, UP) and Chhari-Dhand Wetland Reserve (Kutch, Gujarat) to the Ramsar Convention list on World Wetlands Day.",
    "summaryBn": "ভারতে রামসার জলাভূমির সংখ্যা বেড়ে নতুন মাইলফলক স্পর্শ করল।",
    "keyPoints": [
      "Patna Bird Sanctuary (Etah, UP): A haven for over 200,000 migratory waterfowl including Bar-headed Goose and Northern Shoveler.",
      "Chhari-Dhand (Kutch, Gujarat): Arid-zone saline wetland hosting Common Cranes and Greater Flamingos."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Ramsar Wetlands in India & West Bengal",
      "points": [
        "Ramsar Convention: Signed 2 Feb 1971 in Ramsar, Iran | India joined on 1 Feb 1982.",
        "2 Ramsar Sites in West Bengal: 1. East Kolkata Wetlands (2002), 2. Sundarban Wetland (2019 - largest in India at 4,230 sq km).",
        "State with Most Ramsar Sites: Tamil Nadu (16 sites)."
      ]
    },
    "examRelevance": "Guaranteed Environment question in WBCS Prelims & Mains."
  },
  {
    "id": "wb-feb-10-new-delhi-world-bookfair-2026",
    "day": 5,
    "dateStr": "01–09 February 2026",
    "category": "wb",
    "categoryLabel": "🏛️ National Literary Forums",
    "title": "New Delhi World Book Fair 2026 Inaugurated at Bharat Mandapam",
    "titleBn": "নতুন দিল্লির ভারত মণ্ডপমে নতুন দিল্লি বিশ্ব গ্রন্থমেলা ২০২৬ অনুষ্ঠিত",
    "summary": "National Book Trust (NBT) organized the mega book exhibition under the theme \"Multilingual India: A Living Tradition\" at Pragati Maidan, New Delhi.",
    "summaryBn": "বহুভাষিক ভারতের সমৃদ্ধ সাহিত্য ঐতিহ্যকে তুলে ধরতে নতুন দিল্লির ভারত মণ্ডপমে বইমেলা সম্পন্ন হলো।",
    "keyPoints": [
      "Showcased translations in all 22 Eighth Schedule languages of India.",
      "Organized by NBT (Ministry of Education) in collaboration with ITPO."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: National Book Trust (NBT)",
      "points": [
        "NBT Established: 1 August 1957 by 1st Prime Minister Jawaharlal Nehru under Ministry of Education | HQ: New Delhi.",
        "Eighth Schedule Languages: 22 languages recognized under Articles 344(1) and 351 of Constitution of India."
      ]
    },
    "examRelevance": "WBCS Art & Culture, WBPSC Miscellaneous."
  },
  {
    "id": "sch-feb-01-union-budget-2026-core",
    "day": 1,
    "dateStr": "01 February 2026",
    "category": "schemes",
    "categoryLabel": "☀️ Union Budget 2026–27",
    "title": "Union Budget 2026–27: FM Nirmala Sitharaman Presents ₹53.5 Lakh Crore \"Viksit Bharat\" Budget",
    "titleBn": "কেন্দ্রীয় বাজেট ২০২৬–২৭: অর্থমন্ত্রী নির্মলা সীতারামন কর্তৃক ₹৫৩.৫ লক্ষ কোটি টাকার বাজেট পেশ",
    "summary": "Finance Minister Nirmala Sitharaman presented the Union Budget for FY 2026–27 with Capital Expenditure (Capex) exceeding ₹11.11 Lakh Crore and Fiscal Deficit targeted at 4.3% of GDP.",
    "summaryBn": "সংসদে ২০২৬–২৭ অর্থবর্ষের কেন্দ্রীয় বাজেট পেশ করলেন অর্থমন্ত্রী। রাজকোষ ঘাটতির লক্ষ্যমাত্রা ৪.৩% নির্ধারণ।",
    "keyPoints": [
      "Fiscal Deficit Target: 4.3% of GDP (advancing FRBM glide path to sub-4.5% fiscal discipline).",
      "Capital Expenditure (Capex): Scaled to ₹11.11+ Lakh Crore (3.4% of GDP) for high-speed rail, multi-modal logistics, and green ports.",
      "Share buybacks to be taxed as capital gains rather than dividend income.",
      "Minimum Alternate Tax (MAT) for domestic companies reduced from 15% to 14%.",
      "New simplified Income Tax Act to take effect from April 2026."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Constitutional Provisions of Union Budget",
      "points": [
        "Article 112: Annual Financial Statement (the word \"Budget\" does not appear in Constitution).",
        "Article 110: Definition of Money Bill (solely certified by Lok Sabha Speaker; Rajya Sabha has no amendment power).",
        "Article 114: Appropriation Bill (no expenditure can be incurred from Consolidated Fund without it).",
        "1st Budget of Independent India: Presented on 26 Nov 1947 by R.K. Shanmukham Chetty."
      ]
    },
    "examRelevance": "Guaranteed 3-4 questions in WBCS Prelims & Mains (Paper V Economy)."
  },
  {
    "id": "sch-feb-02-meerut-metro-namo-bharat-2026",
    "day": 22,
    "dateStr": "22 February 2026",
    "category": "schemes",
    "categoryLabel": "☀️ Rapid Transit Infrastructure",
    "title": "PM Narendra Modi Inaugurates Meerut Metro and Extended Namo Bharat RRTS Corridor",
    "titleBn": "প্রধানমন্ত্রী কর্তৃক মিরাট মেট্রো ও সম্প্রসারিত \"নমো ভারত\" র্যাপিড রেল করিডোরের উদ্বোধন",
    "summary": "Prime Minister Narendra Modi inaugurated the newly completed sections of Delhi-Ghaziabad-Meerut Regional Rapid Transit System (RRTS) and local Meerut Metro on 22 February 2026.",
    "summaryBn": "দিল্লি-মিরাট দ্রুতগামী আরআরটিএস ও মিরাট মেট্রো পরিষেবার আনুষ্ঠানিক উদ্বোধন সম্পন্ন হলো।",
    "keyPoints": [
      "Namo Bharat: India's first high-speed semi-high-speed regional rail operating at design speeds of 180 kmph.",
      "First transit system in India where local metro and regional rapid rail share the same track infrastructure."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: NCRTC & Regional Rapid Transit System",
      "points": [
        "NCRTC (National Capital Region Transport Corporation): Joint venture of GoI and Delhi, Haryana, Rajasthan, UP governments under MoHUA.",
        "Delhi-Meerut RRTS: 82.15 km corridor connecting Sarai Kale Khan (Delhi) to Modipuram (Meerut)."
      ]
    },
    "examRelevance": "WBCS Infrastructure & Indian Railways."
  },
  {
    "id": "sch-feb-03-pm-surya-ghar-2026",
    "day": 13,
    "dateStr": "13 February 2026",
    "category": "schemes",
    "categoryLabel": "☀️ Clean Energy Schemes",
    "title": "Cabinet Formally Rolls Out ₹75,021 Crore \"PM-Surya Ghar: Muft Bijli Yojana\" for 1 Crore Homes",
    "titleBn": "১ কোটি পরিবারের জন্য ₹৭৫,০২১ কোটি টাকার \"প্রধানমন্ত্রী সূর্য ঘর: মুফ্ত বিজলি যোজনা\" রূপায়ণ",
    "summary": "Government implemented national rooftop solar portal providing up to ₹78,000 in DBT subsidies to deliver 300 units of free clean electricity per month to households.",
    "summaryBn": "সাধারণ পরিবারকে সৌরবিদ্যুতে স্বনির্ভর করতে ছাদভিত্তিক সৌর প্যানেল স্থাপনে সরাসরি সরকারি ভর্তুকি চালু।",
    "keyPoints": [
      "DBT Subsidies: ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for systems 3 kW or higher.",
      "Aims to add 30 GW of residential rooftop solar capacity, reducing $CO_2$ emissions by 720 million tonnes."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Solar Power in India",
      "points": [
        "Bhadla Solar Park: World's largest solar park located in Jodhpur, Rajasthan (2,245 MW).",
        "International Solar Alliance (ISA): HQ in Gurugram, Haryana (founded 2015 at COP21 Paris by India & France).",
        "India Solar Capacity Rank: 3rd largest solar generator globally."
      ]
    },
    "examRelevance": "WBCS Environment & Economy, Food SI."
  },
  {
    "id": "sch-feb-04-pmmksy-fisheries-2026",
    "day": 8,
    "dateStr": "February 2026",
    "category": "schemes",
    "categoryLabel": "☀️ Blue Economy & Fisheries",
    "title": "Cabinet Approves ₹6,000 Crore \"Pradhan Mantri Matsya Kisan Samridhi Sah-Yojana\" (PMMKSSY)",
    "titleBn": "মৎস্যচাষীদের জন্য ₹৬,০০০ কোটি টাকার \"প্রধানমন্ত্রী মৎস্য কিষাণ সমৃদ্ধি সহ-যোজনা\" অনুমোদন",
    "summary": "Sub-scheme under PMMSY to formalize the unorganized fisheries sector, provide National Fisheries Digital Platform (NFDP) work IDs, and institutional credit insurance.",
    "summaryBn": "অসংগঠিত মৎস্যজীবীদের ডিজিটাল স্বীকৃতি ও আর্থিক সুরক্ষা প্রদানে কেন্দ্রীয় ক্যাবিনেট অনুমোদন দিল।",
    "keyPoints": [
      "50% funded through external project loans from World Bank (IBRD) and Agence Française de Développement (AFD).",
      "Provides aquaculture performance grants to micro-enterprises and women fish vendor collectives."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Blue Revolution in India",
      "points": [
        "Fathers of Blue Revolution in India: Dr. Hiralal Chaudhuri and Dr. Arun Krishnan.",
        "NFDB (National Fisheries Development Board): Located in Hyderabad, Telangana (est. 2006).",
        "CIFA: Central Institute of Freshwater Aquaculture located in Bhubaneswar, Odisha."
      ]
    },
    "examRelevance": "WBCS Economy & Agriculture."
  },
  {
    "id": "sch-feb-05-swati-portal-2026",
    "day": 11,
    "dateStr": "11 February 2026",
    "category": "schemes",
    "categoryLabel": "☀️ Women in STEM",
    "title": "Principal Scientific Advisor Launches \"SWATI\" (Science for Women-A Technology & Innovation) Portal",
    "titleBn": "মহিলা বিজ্ঞানীদের একক জাতীয় ডেটাবেস পোর্টাল \"স্বাতী\" (SWATI) উদ্বোধন",
    "summary": "Launched on International Day of Women and Girls in Science by PSA Prof. Ajay Kumar Sood at INSA New Delhi, creating a dynamic database of all Indian women researchers in STEMM.",
    "summaryBn": "বিজ্ঞান ও চিকিৎসায় ভারতীয় নারী গবেষকদের অগ্রগতি ও ক্ষমতায়নে একক পোর্টাল চালু হলো।",
    "keyPoints": [
      "Maintained by National Institute of Plant Genome Research (NIPGR), New Delhi.",
      "Aims to bridge gender policy decisions and celebrate Indian women scientists globally."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Pioneer Indian Women Scientists",
      "points": [
        "Asima Chatterjee: 1st Indian woman Doctor of Science (Calcutta University, 1944); developed anti-epileptic Ayush-56.",
        "Janaki Ammal: Renowned botanist; 1st Indian woman Ph.D. in Botany (sugarcane cytogenetics).",
        "Tessy Thomas: \"Missile Woman of India\" (former Project Director for Agni-IV/V)."
      ]
    },
    "examRelevance": "WBCS Science & Technology, WBPSC Miscellaneous."
  },
  {
    "id": "sch-feb-06-cheetah-botswana-2026",
    "day": 14,
    "dateStr": "February 2026",
    "category": "schemes",
    "categoryLabel": "☀️ Project Cheetah & Translocation",
    "title": "Project Cheetah Milestone: 9 New Wild Cheetahs Translocated to India from Botswana",
    "titleBn": "প্রজেক্ট চিতার নতুন সাফল্য: বতসোয়ানা থেকে আরও ৯টি বুনো চিতা ভারতে নিয়ে আসা হলো",
    "summary": "Ministry of Environment, Forest & Climate Change translocated 9 wild cheetahs from Botswana to bolster genetic diversity under the Cheetah Action Plan.",
    "summaryBn": "ভারতে লুপ্ত হওয়া চিতার পুনরুজ্জীবনে আফ্রিকার বতসোয়ানা থেকে নতুন দল ভারতে পৌঁছাল।",
    "keyPoints": [
      "Cheetahs quarantined and introduced to Kuno National Park (Madhya Pradesh) and Gandhi Sagar Sanctuary.",
      "Project Cheetah aims to establish a self-sustaining metapopulation of 50+ cheetahs across Indian scrub forests."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Cheetah Extinction & Reintroduction in India",
      "points": [
        "Declared Extinct in India: 1952 (last 3 Asiatic cheetahs shot in 1947 in Koriya, Chhattisgarh).",
        "Kuno National Park: Located in Sheopur and Morena districts, Madhya Pradesh (Vindhyan hills).",
        "Botswana: Capital Gaborone | Currency Pula | World's largest diamond producing country by value."
      ]
    },
    "examRelevance": "WBCS Environment & Wildlife Conservation."
  },
  {
    "id": "sch-feb-07-ahidf-extension-2026",
    "day": 1,
    "dateStr": "February 2026",
    "category": "schemes",
    "categoryLabel": "☀️ Dairy & Animal Husbandry",
    "title": "Cabinet Approves Extension of Animal Husbandry Infrastructure Development Fund (AHIDF)",
    "titleBn": "প্রাণিসম্পদ পরিকাঠামো উন্নয়ন তহবিলের মেয়াদ ₹২৯,৬১০ কোটি বরাদ্দে সম্প্রসারিত",
    "summary": "Cabinet approved extension of AHIDF under Infrastructure Development Fund with total outlay of ₹29,610 Crore providing 3% interest subvention for dairy and meat processing.",
    "summaryBn": "দুগ্ধ ও মাংস প্রক্রিয়াকরণ পরিকাঠামো গড়ে তুলতে আর্থিক প্রণোদনা প্রকল্প সম্প্রসারিত হলো।",
    "keyPoints": [
      "Offers 3% interest subvention for 8 years and credit guarantee up to 25% for MSMEs and FPOs.",
      "Aims to double dairy processing infrastructure across rural clusters."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Operation Flood & Dairy Sector in India",
      "points": [
        "Operation Flood (White Revolution): Launched on 13 January 1970 by NDDB under Dr. Verghese Kurien.",
        "India Milk Production: #1 in the world (~24% of global milk output).",
        "National Milk Day: 26 November (birth anniversary of Dr. Verghese Kurien)."
      ]
    },
    "examRelevance": "WBCS Economy & Agriculture."
  },
  {
    "id": "sch-feb-08-pmay-g-2crore-2026",
    "day": 15,
    "dateStr": "February 2026",
    "category": "schemes",
    "categoryLabel": "☀️ Rural Housing Schemes",
    "title": "Pradhan Mantri Awas Yojana - Gramin (PMAY-G) Target Scaled Up by 2 Crore Houses",
    "titleBn": "প্রধানমন্ত্রী আবাস যোজনা - গ্রামীণে আরও ২ কোটি নতুন পাকা বাড়ি নির্মাণের লক্ষ্যমাত্রা",
    "summary": "Ministry of Rural Development notified the revised outlay to construct 2 Crore additional pucca rural houses with basic sanitation and electricity amenities.",
    "summaryBn": "গ্রামীণ গৃহহীনদের জন্য আরও দুই কোটি পাকা বাড়ি তৈরির কাজ পুরোদমে শুরু হলো।",
    "keyPoints": [
      "Unit assistance: ₹1.20 Lakh in plain areas and ₹1.30 Lakh in hilly/difficult/North Eastern states.",
      "Uses Awaas+ digital geo-tagging for direct beneficiary account transfers."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: PMAY-G & Rural Welfare",
      "points": [
        "PMAY-G Launched: 20 November 2016 (restructured from former Indira Awas Yojana).",
        "Beneficiary Selection: Socio-Economic and Caste Census (SECC 2011) and Awaas+ survey.",
        "Minimum Floor Area: 25 sq meters (including dedicated hygienic cooking space)."
      ]
    },
    "examRelevance": "WBCS Rural Development & Social Welfare."
  },
  {
    "id": "sch-feb-09-jal-jeevan-75pct-2026",
    "day": 22,
    "dateStr": "February 2026",
    "category": "schemes",
    "categoryLabel": "☀️ Drinking Water Sanitation",
    "title": "Jal Jeevan Mission (JJM) Crosses Milestone of Providing Tap Water to 75% Rural Homes",
    "titleBn": "জল জীবন মিশন: দেশের ৭৫ শতাংশেরও বেশি গ্রামীণ পরিবারে নলবাহিত বিশুদ্ধ পানীয় জল সংযোগ",
    "summary": "Department of Drinking Water and Sanitation reported over 14.5 Crore rural households have functional household tap connections (FHTC) delivering 55 lpcd potable water.",
    "summaryBn": "দেশের ১৪.৫ কোটিরও বেশি গ্রামীণ পরিবারে নিয়মিত বিশুদ্ধ পানীয় জল সংযোগ সম্পন্ন হলো।",
    "keyPoints": [
      "100% Har Ghar Jal certified states: Goa, Telangana, Haryana, Gujarat, Punjab, Himachal Pradesh.",
      "Women-led village Pani Samitis test water purity using Field Test Kits (FTKs)."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Jal Jeevan Mission & SDG 6",
      "points": [
        "Launched: 15 August 2019 by PM Narendra Modi from Red Fort.",
        "Target: Functional Household Tap Connection (FHTC) to every rural home.",
        "SDG 6: Ensure availability and sustainable management of water and sanitation for all by 2030."
      ]
    },
    "examRelevance": "WBCS Governance & Public Health."
  },
  {
    "id": "sch-feb-10-green-hydrogen-maritime-2026",
    "day": 27,
    "dateStr": "February 2026",
    "category": "schemes",
    "categoryLabel": "☀️ Green Maritime & Steel",
    "title": "Ministry of New & Renewable Energy Releases Pilot Guidelines for Green Hydrogen in Shipping & Steel",
    "titleBn": "জাহাজ চলাচল ও ইস্পাত শিল্পে সবুজ হাইড্রোজেন ব্যবহারের জাতীয় রূপরেখা প্রকাশ",
    "summary": "MNRE allocated ₹115 Crore for pilot projects in maritime shipping and ₹455 Crore for green steel manufacturing under the National Green Hydrogen Mission.",
    "summaryBn": "পরিবেশবান্ধব সবুজ ইস্পাত ও গ্রিন হাইড্রোজেন চালিত জাহাজ তৈরির পাইলট প্রকল্প চূড়ান্ত হলো।",
    "keyPoints": [
      "Supports retrofitting ships to run on Green Hydrogen and Green Ammonia.",
      "Paradip, Deendayal (Kandla), and V.O. Chidambaranar (Tuticorin) ports designated as Green Hydrogen Bunkering Hubs."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Major Ports of India",
      "points": [
        "12 Major Ports of India: Syama Prasad Mookerjee (Kolkata/Haldia - riverine), Paradip (Odisha), Visakhapatnam (deepest natural), Kamarajar (Ennore - corporate), Chennai, V.O. Chidambaranar (Tuticorin), Cochin, New Mangalore, Mormugao, Mumbai, JNPA (Nhava Sheva - largest container port), Deendayal (Kandla - tidal).",
        "Harit Sagar: Green Port Guidelines launched in 2023 by Ministry of Ports, Shipping and Waterways."
      ]
    },
    "examRelevance": "WBCS Geography & Infrastructure."
  },
  {
    "id": "nat-feb-01-ai-impact-summit-2026",
    "day": 19,
    "dateStr": "19–20 February 2026",
    "category": "national",
    "categoryLabel": "🇮🇳 Artificial Intelligence & Governance",
    "title": "India AI Impact Summit 2026 Inaugurated at Bharat Mandapam, New Delhi",
    "titleBn": "নতুন দিল্লির ভারত মণ্ডপমে ভারত এআই ইমপ্যাক্ট সামিট ২০২৬ উদ্বোধন",
    "summary": "Prime Minister Narendra Modi inaugurated the global AI conference focused on inclusive, human-centric AI governance, sovereign AI compute, and digital public intelligence.",
    "summaryBn": "মানবকল্যাণকামী, নিরাপদ ও অন্তর্ভুক্তিমূলক কৃত্রিম বুদ্ধিমত্তা নীতি প্রণয়নে আন্তর্জাতিক শীর্ষ সম্মেলন সম্পন্ন।",
    "keyPoints": [
      "Attended by tech pioneers, UN dignitaries, and delegations from 45+ countries.",
      "Unveiled the Delhi Framework on Ethical Multimodal AI for Global South development."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: IndiaAI Mission & Bharat Mandapam",
      "points": [
        "IndiaAI Mission: Approved with ₹10,372 Crore outlay to establish 10,000+ GPU sovereign compute infrastructure and indigenous foundation models.",
        "Bharat Mandapam: International Exhibition-cum-Convention Centre (IECC) at Pragati Maidan, New Delhi (hosted G20 Leaders Summit 2023)."
      ]
    },
    "examRelevance": "WBCS Science & Technology, UPSC GS III."
  },
  {
    "id": "nat-feb-02-sc-menstrual-health-2026",
    "day": 10,
    "dateStr": "February 2026",
    "category": "national",
    "categoryLabel": "🇮🇳 Constitutional Law & Fundamental Rights",
    "title": "Supreme Court Recognizes Menstrual Health as a Fundamental Right Under Article 21",
    "titleBn": "ঋতুস্রাবকালীন স্বাস্থ্য ও পরিচ্ছন্নতাকে অনুচ্ছেদ ২১-এর অধীনে মৌলিক অধিকারের স্বীকৃতি দিল সুপ্রিম কোর্ট",
    "summary": "Supreme Court bench ruled that access to clean sanitary facilities, free sanitary pads, and hygienic disposal systems for female students in classes 6–12 is protected under Article 21 (Right to Dignity & Education).",
    "summaryBn": "দেশের সমস্ত সরকারি ও অনুদানপ্রাপ্ত বিদ্যালয়ে ছাত্রীদের জন্য বিনামূল্যে স্যানিটারি ন্যাপকিন ও পরিচ্ছন্ন শৌচাগার বাধ্যতামূলক করল সুপ্রিম কোর্ট।",
    "keyPoints": [
      "Directed all State Governments and UTs to implement a uniform National Menstrual Hygiene Policy in schools.",
      "Mandates a 1:1 ratio for female toilet cubicles and functional incinerator disposal mechanisms in schools."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Article 21 & Expanded Dimensions of Life and Liberty",
      "points": [
        "Article 21: \"No person shall be deprived of his life or personal liberty except according to procedure established by law\".",
        "Landmark Article 21 Cases: Maneka Gandhi Case (1978 - Due Process), Mohini Jain & Unni Krishnan (1992/1993 - Right to Education), K.S. Puttaswamy (2017 - Right to Privacy).",
        "Article 21A: Right to Free and Compulsory Education (inserted via 86th Constitutional Amendment Act, 2002)."
      ]
    },
    "examRelevance": "Core question in WBCS Mains Paper V (Polity) & UPSC GS II."
  },
  {
    "id": "nat-feb-03-sc-mobocracy-ruling-2026",
    "day": 23,
    "dateStr": "23 February 2026",
    "category": "national",
    "categoryLabel": "🇮🇳 Criminal Jurisprudence",
    "title": "CJI Surya Kant Emphasizes Decentralized Judicial Adjudication in Mob Violence Cases",
    "titleBn": "গণহিংসা ও মব ভায়োলেন্স মামলায় সুপ্রিম কোর্টের প্রধান বিচারপতির পর্যবেক্ষণ",
    "summary": "Chief Justice of India Surya Kant observed that a rigid, centralized template for handling mob violence cases is unmanageable, upholding case-by-case evidentiary rigor.",
    "summaryBn": "মব লিঞ্চিং ও গণবিক্ষোভজনিত অপরাধে পরিস্থিতির সুনির্দিষ্ট তথ্যের ভিত্তিতে বিচারিক সিদ্ধান্তের ওপর জোর দিল শীর্ষ আদালত।",
    "keyPoints": [
      "Reinforced law enforcement accountability under the landmark *Tehseen S. Poonawalla v. Union of India (2018)* guidelines.",
      "Emphasized that State police forces must register prompt FIRs against mob vigilantes."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Chief Justice of India & Supreme Court Architecture",
      "points": [
        "Article 124: Establishment and Constitution of Supreme Court of India.",
        "Sanctioned Strength of Supreme Court: 34 Judges (1 CJI + 33 Judges).",
        "Retirement Age of Supreme Court Judges: 65 years (High Court Judges: 62 years)."
      ]
    },
    "examRelevance": "WBCS Indian Polity (Judiciary)."
  },
  {
    "id": "nat-feb-04-drdo-cbrn-conclave-2026",
    "day": 26,
    "dateStr": "26–27 February 2026",
    "category": "national",
    "categoryLabel": "🇮🇳 Strategic Defense Tech",
    "title": "DRDO Organizes National CBRN Conclave in New Delhi: CDS Gen. Anil Chauhan Inaugurates",
    "titleBn": "নতুন দিল্লিতে ডিআরডিও-র জাতীয় রাসায়নিক, জৈব, তেজস্ক্রিয় ও পারমাণবিক (CBRN) প্রতিরক্ষা সম্মেলন",
    "summary": "Chief of Defence Staff Gen. Anil Chauhan inaugurated the conclave focusing on indigenous countermeasures, sensors, and protective gear against non-conventional chemical and biological threats.",
    "summaryBn": "অপ্রচলিত অস্ত্র ও জীবাণুযুদ্ধের ঝুঁকি মোকাবিলায় দেশীয় প্রযুক্তির সক্ষমতা বৃদ্ধিতে ডিআরডিওর সম্মেলন।",
    "keyPoints": [
      "Organized by Defence Research and Development Establishment (DRDE), Gwalior.",
      "Showcased NBC reconnaissance vehicles, decontamination systems, and advanced gas masks."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Chief of Defence Staff (CDS) & DRDE",
      "points": [
        "Chief of Defence Staff (CDS): Permanent Chairman of Chiefs of Staff Committee and Head of Department of Military Affairs (DMA) under MoD.",
        "1st CDS of India: General Bipin Rawat (Jan 2020 – Dec 2021) | 2nd CDS: General Anil Chauhan.",
        "DRDE Gwalior: Premier DRDO lab for Chemical and Biological Defense research."
      ]
    },
    "examRelevance": "WBCS Defense & Science & Technology."
  },
  {
    "id": "nat-feb-05-isro-nsss-meghalaya-2026",
    "day": 23,
    "dateStr": "23–27 February 2026",
    "category": "national",
    "categoryLabel": "🇮🇳 Space Research Symposiums",
    "title": "ISRO Hosts 23rd National Space Science Symposium (NSSS-2026) at NESAC, Meghalaya",
    "titleBn": "মেঘালয়ের উমিয়ামে নেসাক (NESAC)-এ ইসরোর ২৩তম জাতীয় মহাকাশ বিজ্ঞান সম্মেলন",
    "summary": "Held at North East Space Applications Centre in Umiam, bringing together over 600 space scientists to deliberate on planetary exploration, space weather, and astronomy.",
    "summaryBn": "উত্তর-পূর্ব ভারতের মেঘালয়ে ইসরোর বার্ষিক মহাকাশ বিজ্ঞান সম্মেলন সফলভাবে সম্পন্ন হলো।",
    "keyPoints": [
      "Focused on payload discoveries from Aditya-L1, Chandrayaan-3, and upcoming Gaganyaan / SPADEX missions.",
      "Special sessions on drone-based disaster monitoring in the Eastern Himalayas."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: NESAC & ISRO Autonomous Centres",
      "points": [
        "NESAC (North East Space Applications Centre): Joint initiative of Dept of Space (ISRO) and North Eastern Council (NEC) established in 2000 | Located: Umiam (Barapani), Meghalaya.",
        "ISRO Formed: 15 August 1969 | HQ: Antariksh Bhavan, Bengaluru, Karnataka."
      ]
    },
    "examRelevance": "WBCS Science & Technology & Northeast GK."
  },
  {
    "id": "nat-feb-06-surajkund-mela-2026",
    "day": 2,
    "dateStr": "02–18 February 2026",
    "category": "national",
    "categoryLabel": "🇮🇳 Arts & Handicrafts",
    "title": "37th Surajkund International Crafts Mela Celebrates Heritage in Faridabad, Haryana",
    "titleBn": "হরিয়ানার ফরিদাবাদে ৩৭তম সুরজকুন্ড আন্তর্জাতিক হস্তশিল্প মেলা ২০২৬ অনুষ্ঠিত",
    "summary": "Showcased master craftspersons from across India and over 40 partner countries celebrating indigenous textile weaves, pottery, and folk performances.",
    "summaryBn": "বিশ্বের বৃহত্তম কারুশিল্প মেলায় থিম স্টেট গুজরাট ও পার্টনার দেশ তানজানিয়ার বিশেষ প্রদর্শনী।",
    "keyPoints": [
      "Theme State: Gujarat (showcased Patola, Rogan art, and Kutchi embroidery).",
      "Partner Nation: Tanzania (showcased East African Tingatinga paintings and ebony carvings)."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Surajkund Lake & Tomar Dynasty",
      "points": [
        "Surajkund Reservoir: Built in 10th century AD by Tomar King Suraj Pal in Aravalli hills.",
        "1st Surajkund Crafts Mela: Held in 1987; upgraded to International Mela in 2013.",
        "Tanzania: Capital Dodoma | Currency Tanzanian Shilling | Highest Peak: Mount Kilimanjaro (5,895m)."
      ]
    },
    "examRelevance": "WBCS Art & Culture, WBPSC Miscellaneous, SSC CGL."
  },
  {
    "id": "nat-feb-07-filmfare-south-70th-2026",
    "day": 21,
    "dateStr": "21 February 2026",
    "category": "national",
    "categoryLabel": "🇮🇳 Cinema & Cultural Honors",
    "title": "70th Filmfare Awards South Held in Kochi: \"Amaran\" Sweeps 8 Awards",
    "titleBn": "কোচিতে ৭০তম ফিল্মফেয়ার অ্যাওয়ার্ডস সাউথ: ৮টি পুরস্কার জিতে শীর্ষে \"অমরন\"",
    "summary": "Conducted at Kochi, Kerala honouring cinematic excellence across Tamil, Telugu, Malayalam, and Kannada cinema.",
    "summaryBn": "দক্ষিণ ভারতীয় চলচ্চিত্রের মর্যাদাপূর্ণ ফিল্মফেয়ার আসরে সেরা ছবির স্বীকৃতি পেল অমরন।",
    "keyPoints": [
      "Biographical war film *Amaran* (based on Major Mukund Varadarajan AC) won 8 major honors.",
      "Blockbusters *Pushpa 2: The Rule* and *Manjummel Boys* won technical and acting laurels."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Ashok Chakra & Military Gallantry Awards",
      "points": [
        "Ashok Chakra: India's highest peacetime military decoration (equivalent to Param Vir Chakra during wartime).",
        "1st Recipient of Ashok Chakra: Havildar Bachittar Singh and Naik Narbahadur Thapa (1952).",
        "1st Woman Recipient of Ashok Chakra: Neerja Bhanot (1987 posthumous)."
      ]
    },
    "examRelevance": "WBPSC Miscellaneous, WBP SI, SSC."
  },
  {
    "id": "nat-feb-08-acm-india-2026",
    "day": 14,
    "dateStr": "14 February 2026",
    "category": "national",
    "categoryLabel": "🇮🇳 Computer Science & Computing",
    "title": "ACM India Annual Event 2026 Hosted at IIT Hyderabad: Computing Excellence Celebrated",
    "titleBn": "আইআইটি হায়দ্রাবাদে এসিএম ইন্ডিয়া বার্ষিক সম্মেলন ২০২৬ অনুষ্ঠিত",
    "summary": "Association for Computing Machinery (ACM) India held its flagship symposium discussing quantum algorithms, ethical AI, and high-performance computing in Indian languages.",
    "summaryBn": "ভারতের কম্পিউটার বিজ্ঞান গবেষণা ও কোয়ান্টাম কম্পিউটিংয়ের অগ্রগতি নিয়ে আইআইটি হায়দ্রাবাদে সম্মেলন।",
    "keyPoints": [
      "Conferred ACM India Early Career Researcher Award and Doctoral Dissertation Awards.",
      "Announced open-access benchmarks for Indic language natural language processing (NLP)."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Supercomputing in India (NSM)",
      "points": [
        "National Supercomputing Mission (NSM): Launched in 2015, jointly steered by DST and MeitY, implemented by C-DAC and IISc.",
        "PARAM 8000: India's 1st indigenous supercomputer built in 1991 by C-DAC Pune under Dr. Vijay Bhatkar.",
        "AIRAWAT: AI supercomputer at C-DAC Pune ranked among world's top green supercomputers."
      ]
    },
    "examRelevance": "WBCS Science & Technology (IT)."
  },
  {
    "id": "nat-feb-09-missile-testing-bay-of-bengal-2026",
    "day": 11,
    "dateStr": "February 2026",
    "category": "national",
    "categoryLabel": "🇮🇳 Strategic Missile Testing",
    "title": "India Issues 3,190 km NOTAM for Long-Range Strategic Missile Trials in Bay of Bengal",
    "titleBn": "বঙ্গোপসাগরে ৩,১৯০ কিমি দীর্ঘ ক্ষেপণাস্ত্র পরীক্ষার জন্য ভারত কর্তৃক নোটিশ জারি",
    "summary": "DRDO issued maritime hazard notifications across the Bay of Bengal into the Southern Indian Ocean for advanced testing of long-range ballistic/cruise missile systems.",
    "summaryBn": "ইন্টিগ্রেটেড টেস্ট রেঞ্জ চাঁদিপুর ও এপিজে আব্দুল কালাম দ্বীপ থেকে দূরপাল্লার ক্ষেপণাস্ত্র পরীক্ষার প্রস্তুতি।",
    "keyPoints": [
      "Demonstrates reliability of solid-propellant propulsion stages and re-entry heat shields.",
      "Monitored by Indian Navy dedicated missile tracking vessel INS Dhruv."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Integrated Test Range (ITR) & Missile Tracking",
      "points": [
        "Dr. APJ Abdul Kalam Island (formerly Wheeler Island): Located off Odisha coast in Bay of Bengal (India's premier missile testing facility).",
        "INS Dhruv: India's 1st nuclear missile tracking ship built by Hindustan Shipyard Limited (HSL) with NTRO and DRDO.",
        "Father of Indian Missile Programme: Dr. A.P.J. Abdul Kalam (led Integrated Guided Missile Development Programme - IGMDP in 1983: Prithvi, Agni, Trishul, Nag, Akash)."
      ]
    },
    "examRelevance": "WBCS Defense & Strategic Affairs."
  },
  {
    "id": "nat-feb-10-alwar-tiger-marathon-2026",
    "day": 8,
    "dateStr": "08 February 2026",
    "category": "national",
    "categoryLabel": "🇮🇳 Wildlife Conservation Awareness",
    "title": "Alwar Tiger International Half Marathon 2026 Promotes Sariska Tiger Reserve Conservation",
    "titleBn": "সারিস্কা ব্যাঘ্র প্রকল্প সংরক্ষণের সচেতনতায় আলওয়ার টাইগার আন্তর্জাতিক হাফ ম্যারাথন ২০২৬",
    "summary": "Thousands of national and international athletes ran to promote tiger corridor connectivity and ecological protection around Sariska Tiger Reserve in Rajasthan.",
    "summaryBn": "সারিস্কা অভয়ারণ্যে বাঘ সংরক্ষণে জনসচেতনতা বাড়াতে আন্তর্জাতিক হাফ ম্যারাথন অনুষ্ঠিত হলো।",
    "keyPoints": [
      "Sariska made history as India's 1st successful tiger reintroduction reserve (airlifting tigers from Ranthambore in 2008).",
      "Highlights the importance of peaceful coexistence between pastoral Gujjar communities and wildlife."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Tiger Reserves in Rajasthan",
      "points": [
        "5 Tiger Reserves in Rajasthan: 1. Ranthambore (Sawai Madhopur), 2. Sariska (Alwar), 3. Mukundra Hills (Kota), 4. Ramgarh Vishdhari (Bundi - 52nd in India), 5. Dholpur-Karauli (53rd/54th in India).",
        "Project Tiger: Launched on 1 April 1973 from Jim Corbett National Park, Uttarakhand."
      ]
    },
    "examRelevance": "WBCS Environment & Wildlife."
  },
  {
    "id": "intl-feb-01-winter-olympics-2026",
    "day": 6,
    "dateStr": "06–22 February 2026",
    "category": "international",
    "categoryLabel": "🌍 Global Olympic Games",
    "title": "XXV Olympic Winter Games \"Milano Cortina 2026\" Held in Italy",
    "titleBn": "ইতালির মিলান ও কর্টিনায় ২৫তম শীতকালীন অলিম্পিক গেমস ২০২৬ অনুষ্ঠিত",
    "summary": "Italy hosted the XXV Olympic Winter Games across Milan and Cortina d'Ampezzo, featuring 116 medal events across 16 winter disciplines.",
    "summaryBn": "বিশ্বের বৃহত্তম শীতকালীন ক্রীড়া আসর অলিম্পিক গেমস ইতালিতে জাঁকজমকপূর্ণভাবে সম্পন্ন হলো।",
    "keyPoints": [
      "Ski mountaineering made its historic Olympic debut as an official medal sport.",
      "Mottos and sustainability frameworks emphasized 100% renewable energy venues across the Italian Alps."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Winter Olympic Games History",
      "points": [
        "1st Winter Olympic Games: 1924 in Chamonix, France.",
        "International Olympic Committee (IOC): Founded in 1894 by Pierre de Coubertin | HQ: Lausanne, Switzerland.",
        "Cortina d'Ampezzo previously hosted the 1956 Winter Olympics; Milan hosted for the first time."
      ]
    },
    "examRelevance": "WBCS Sports, International Affairs & WBPSC Miscellaneous."
  },
  {
    "id": "intl-feb-02-grammy-awards-68th-2026",
    "day": 1,
    "dateStr": "01 February 2026",
    "category": "international",
    "categoryLabel": "🌍 International Music Awards",
    "title": "68th Annual Grammy Awards Held at Crypto.com Arena in Los Angeles",
    "titleBn": "লস অ্যাঞ্জেলেসে ৬৮তম বার্ষিক গ্র্যামি পুরস্কার ২০২৬ অনুষ্ঠান সম্পন্ন",
    "summary": "The Recording Academy presented the 68th Grammy Awards in Los Angeles, hosted by Trevor Noah, honoring global musical excellence across all contemporary genres.",
    "summaryBn": "বিশ্ব সংগীতের সর্বোচ্চ সম্মাননা গ্র্যামি পুরস্কার আসর লস অ্যাঞ্জেলেসে অনুষ্ঠিত হলো।",
    "keyPoints": [
      "Recognized standout achievements in Album of the Year, Record of the Year, Song of the Year, and Best Global Music Performance.",
      "Celebrated diversity in cross-cultural international fusion collaborations."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Grammy Awards & Indian Legacy",
      "points": [
        "1st Grammy Awards: Held on 4 May 1959 by National Academy of Recording Arts and Sciences (USA).",
        "1st Indian Grammy Winner: Pandit Ravi Shankar (1968 for *West Meets East* with Yehudi Menuhin; won 5 lifetime Grammys).",
        "Other Multiple Indian Winners: A.R. Rahman (2 Grammys), Ricky Kej (3 Grammys), Ustad Zakir Hussain (multiple Grammys)."
      ]
    },
    "examRelevance": "WBCS Art & Culture, WBPSC Miscellaneous."
  },
  {
    "id": "intl-feb-03-bafta-79th-2026",
    "day": 22,
    "dateStr": "22 February 2026",
    "category": "international",
    "categoryLabel": "🌍 International Cinema",
    "title": "79th British Academy Film Awards (BAFTA 2026) Celebrated at Royal Festival Hall, London",
    "titleBn": "লন্ডনের রয়্যাল ফেস্টিভ্যাল হলে ৭৯তম বাফটা (BAFTA) চলচ্চিত্র পুরস্কার ২০২৬ অনুষ্ঠিত",
    "summary": "The British Academy of Film and Television Arts presented awards celebrating world cinema, independent filmmaking, and outstanding documentary storytelling.",
    "summaryBn": "ব্রিটিশ চলচ্চিত্র অ্যাকাডেমির বার্ষিক আন্তর্জাতিক পুরস্কার অনুষ্ঠান লন্ডনে সম্পন্ন হলো।",
    "keyPoints": [
      "Attended by global cinematic luminaries, directors, and international festival winners.",
      "Honoured Best Film, Best Director, Leading Actor/Actress, and Outstanding British Film."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: BAFTA Awards History",
      "points": [
        "BAFTA Founded: 1947 in London (British Academy of Film and Television Arts).",
        "Trophy Design: Bronze theatrical mask sculpted by American artist Mitzi Cunliffe (1955).",
        "Oscar Awards (98th Academy Awards): Administered by AMPAS in Hollywood, Los Angeles."
      ]
    },
    "examRelevance": "WBPSC Miscellaneous, SSC CGL."
  },
  {
    "id": "intl-feb-04-icc-t20-world-cup-2026",
    "day": 7,
    "dateStr": "07 February 2026",
    "category": "international",
    "categoryLabel": "🌍 World Cup Cricket",
    "title": "2026 ICC Men's T20 World Cup Kicks Off: Co-Hosted by India and Sri Lanka",
    "titleBn": "ভারত ও শ্রীলঙ্কার যৌথ আয়োজনে ২০২৬ আইসিসি পুরুষ টি-টোয়েন্টি বিশ্বকাপের সূচনা",
    "summary": "The 10th edition of the ICC Men's T20 World Cup commenced with 20 national teams competing across premier stadiums in India (Kolkata, Mumbai, Ahmedabad, Chennai) and Sri Lanka (Colombo, Kandy).",
    "summaryBn": "কলকাতার ইডেন গার্ডেন্স সহ বিভিন্ন ভেন্যুতে বিশ্ব টি-টোয়েন্টি ক্রিকেটের মেগা আসর শুরু হলো।",
    "keyPoints": [
      "20 Teams participating in 55 matches spanning 4 groups, Super 8s, semi-finals, and final.",
      "Eden Gardens (Kolkata) and Wankhede Stadium (Mumbai) hosted marquee group clashes."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: ICC Men's T20 World Cup History",
      "points": [
        "1st T20 World Cup: 2007 in South Africa (India defeated Pakistan in final at Johannesburg under MS Dhoni).",
        "Most T20 World Cup Titles: West Indies (2 titles - 2012, 2016), England (2 titles - 2010, 2022), India (2 titles - 2007, 2024).",
        "ICC HQ: Dubai, UAE (est. 1909 as Imperial Cricket Conference)."
      ]
    },
    "examRelevance": "Guaranteed questions in all 2026 WBPSC & Police exams."
  },
  {
    "id": "intl-feb-05-davis-cup-qualifiers-2026",
    "day": 7,
    "dateStr": "07–08 February 2026",
    "category": "international",
    "categoryLabel": "🌍 World Tennis",
    "title": "Davis Cup Qualifiers 2026: Top Tennis Nations Clash for Finals Group Stage Berths",
    "titleBn": "ডেভিস কাপ কোয়ালিফায়ার্স ২০২৬: বিশ্ব টেনিসের মর্যাদাপূর্ণ দলের লড়াই",
    "summary": "National tennis teams competed in home-and-away knockout ties to secure qualification for the 2026 Davis Cup Finals.",
    "summaryBn": "আন্তর্জাতিক টেনিস ফেডারেশন (ITF) পরিচালিত মর্যাদাপূর্ণ পুরুষ দলীয় টেনিস প্রতিযোগিতা সম্পন্ন হলো।",
    "keyPoints": [
      "Matches played in best-of-three sets across 4 singles and 1 doubles match.",
      "India competed in World Group playoffs."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Davis Cup & Tennis Grand Slams",
      "points": [
        "Davis Cup: \"World Cup of Tennis\" established in 1900 by Dwight F. Davis.",
        "4 Grand Slams in Chronological Order: 1. Australian Open (Hard court, Jan), 2. French Open / Roland Garros (Clay court, May-Jun), 3. Wimbledon (Grass court, Jun-Jul - oldest, est. 1877), 4. US Open (Hard court, Aug-Sep)."
      ]
    },
    "examRelevance": "WBCS Sports & World Tennis."
  },
  {
    "id": "intl-feb-06-asian-shooting-champ-2026",
    "day": 2,
    "dateStr": "02–14 February 2026",
    "category": "international",
    "categoryLabel": "🌍 Asian Sports Championships",
    "title": "Asian Championship for Rifle/Pistol 2026: Indian Shooters Dominate Medal Tally",
    "titleBn": "এশিয়ান রাইফেল/পিস্তল শ্যুটিং চ্যাম্পিয়নশিপ ২০২৬: ভারতীয় শুটারদের দুর্দান্ত পদক জয়",
    "summary": "Indian national shooting contingent delivered stellar performances across 10m Air Rifle, 50m Rifle 3 Positions, and 25m Rapid Fire Pistol events.",
    "summaryBn": "এশিয়ান শ্যুটিং প্রতিযোগিতায় ভারত সোনা, রূপো ও ব্রোঞ্জ জিতে শীর্ষস্থান অধিকার করল।",
    "keyPoints": [
      "Junior and senior shooters secured vital international ranking points and podium sweeps.",
      "Showcased depth in mixed team air rifle disciplines."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: India in Olympic Shooting",
      "points": [
        "1st Individual Olympic Gold for India: Abhinav Bindra (10m Air Rifle at 2008 Beijing Olympics).",
        "Major Dhyan Chand Khel Ratna Shooters: Abhinav Bindra, Rajyavardhan Singh Rathore (Silver at 2004 Athens), Vijay Kumar (Silver at 2012 London), Gagan Narang (Bronze at 2012 London), Manu Bhaker (2 Bronze at 2024 Paris)."
      ]
    },
    "examRelevance": "WBCS Sports & Olympic GK."
  },
  {
    "id": "intl-feb-07-rbi-city-union-bank-2026",
    "day": 20,
    "dateStr": "February 2026",
    "category": "international",
    "categoryLabel": "🌍 Banking Leadership",
    "title": "RBI Approves Appointment of R. Vijay Anandh as MD & CEO of City Union Bank",
    "titleBn": "সিটি ইউনিয়ন ব্যাংকের নতুন এমডি ও সিইও হিসেবে আর বিজয় আনন্দের নিয়োগে আরবিআই-এর সম্মতি",
    "summary": "Reserve Bank of India formally approved the succession of R. Vijay Anandh to head one of India's oldest private sector scheduled commercial banks, effective May 1, 2026.",
    "summaryBn": "ভারতের প্রাচীনতম বেসরকারি তফসিলি ব্যাংকের শীর্ষ পদে নতুন ব্যবস্থাপনা পরিচালকের নিয়োগ অনুমোদিত হলো।",
    "keyPoints": [
      "Succeeded veteran banker Dr. N. Kamakodi following his long tenure.",
      "City Union Bank specializes in SME trade finance and agricultural advances in Southern India."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: City Union Bank & Private Banking in India",
      "points": [
        "City Union Bank: Founded on 31 October 1904 as The Kumbakonam Bank Limited | HQ: Kumbakonam, Tamil Nadu.",
        "Section 35B of Banking Regulation Act, 1949: Requires prior RBI approval for appointment and remuneration of MD/CEO of commercial banks."
      ]
    },
    "examRelevance": "WBCS Banking & Economy."
  },
  {
    "id": "intl-feb-08-ions-conclave-vizag-2026",
    "day": 24,
    "dateStr": "24 February 2026",
    "category": "international",
    "categoryLabel": "🌍 Maritime Geopolitics",
    "title": "Indian Ocean Naval Symposium (IONS) Conclave of Chiefs Held in Visakhapatnam",
    "titleBn": "বিশাখাপত্তনমে ভারত মহাসাগরীয় নৌ সিম্পোজিয়াম (IONS) নৌবাহিনী প্রধানদের সম্মেলন",
    "summary": "Naval chiefs and delegates from 25 Indian Ocean littoral member nations met to coordinate maritime humanitarian assistance, disaster relief (HADR), and maritime domain safety.",
    "summaryBn": "ভারত মহাসাগরের উপকূলবর্তী ২৫টি দেশের নৌপ্রধানদের নিয়ে কৌশলগত নিরাপত্তা সম্মেলন সম্পন্ন হলো।",
    "keyPoints": [
      "Held concurrently with International Fleet Review (IFR 2026) and Exercise MILAN 2026.",
      "Adopted standardized Search & Rescue (SAR) protocols across regional maritime rescue coordination centres."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Indian Ocean Naval Symposium (IONS)",
      "points": [
        "Inception: Launched by Indian Navy in February 2008 in New Delhi to enhance maritime cooperation among Indian Ocean littoral states.",
        "Members: 25 Member States and 8 Observer States grouped into 4 sub-regions: South Asian, West Asian, East African, and South East Asian littorals."
      ]
    },
    "examRelevance": "WBCS International Relations & Maritime Security."
  },
  {
    "id": "intl-feb-09-who-cancer-report-2026",
    "day": 4,
    "dateStr": "04 February 2026",
    "category": "international",
    "categoryLabel": "🌍 Global Public Health",
    "title": "World Cancer Day 2026: WHO & IARC Release Global Cancer Burden Projections",
    "titleBn": "বিশ্ব ক্যান্সার দিবসে বিশ্ব স্বাস্থ্য সংস্থা (WHO) ও আইএআরসি-র বৈশ্বিক ক্যান্সার রিপোর্ট প্রকাশ",
    "summary": "On World Cancer Day, International Agency for Research on Cancer (IARC) published data warning that global cancer diagnoses will rise to 35+ million by 2050 without preventive lifestyle and vaccination interventions.",
    "summaryBn": "৪ ফেব্রুয়ারি বিশ্ব ক্যান্সার দিবসে ক্যান্সার প্রতিরোধ ও প্রাথমিক শনাক্তকরণের উপর বিশেষ প্রতিবেদন প্রকাশিত হলো।",
    "keyPoints": [
      "Theme: \"Close the Care Gap\" focusing on health equity and universal HPV vaccination against cervical cancer.",
      "Identified tobacco, alcohol, ultra-processed obesity, and air pollution as leading modifiable risk factors."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: IARC & Oncology",
      "points": [
        "IARC (International Agency for Research on Cancer): Specialized cancer agency of WHO established in May 1965 | HQ: Lyon, France.",
        "National Cancer Awareness Day in India: 7 November (birth anniversary of Nobel laureate Madame Marie Curie)."
      ]
    },
    "examRelevance": "WBCS Public Health & Biology."
  },
  {
    "id": "intl-feb-10-munich-security-2026",
    "day": 16,
    "dateStr": "16–18 February 2026",
    "category": "international",
    "categoryLabel": "🌍 Global Security Forums",
    "title": "62nd Munich Security Conference (MSC 2026) Concludes in Munich, Germany",
    "titleBn": "জার্মানিতে ৬২তম মিউনিখ নিরাপত্তা সম্মেলন ২০২৬ সম্পন্ন",
    "summary": "Global heads of state, foreign ministers, and strategic thinkers met at Hotel Bayerischer Hof addressing transatlantic defense, Indo-Pacific deterrence, and supply chain security.",
    "summaryBn": "বিশ্ব নিরাপত্তা ও ভূ-রাজনৈতিক কৌশল সংক্রান্ত শীর্ষ সম্মেলন জার্মানিতে অনুষ্ঠিত হলো।",
    "keyPoints": [
      "High-level discussions on maritime security in the Red Sea, AI weaponization, and critical mineral supply chains.",
      "Indian delegation articulated the \"Vishwa Mitra\" doctrine of multi-aligned strategic autonomy."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Munich Security Conference History",
      "points": [
        "Founded: 1963 by Ewald-von Kleist as *Internationale Wehrkunde-Begegnung*.",
        "Known as the \"Davos of Defense\".",
        "Munich Security Report: Flagship annual assessment on global conflict and security trends."
      ]
    },
    "examRelevance": "WBCS International Relations & UPSC GS II."
  },
  {
    "id": "econ-feb-01-rbi-repo-rate-2026",
    "day": 8,
    "dateStr": "08 February 2026",
    "category": "economy_banking",
    "categoryLabel": "💰 Monetary Policy",
    "title": "RBI Monetary Policy Committee (MPC) Holds Benchmark Repo Rate at 6.50%",
    "titleBn": "আরবিআই মুদ্রা নীতি কমিটি (MPC) রেপো রেট ৬.৫০% অপরিবর্তিত রাখল",
    "summary": "Reserve Bank of India Governor announced the MPC's decision to keep policy repo rate steady at 6.50% to ensure durable alignment of headline inflation with the 4% target.",
    "summaryBn": "মুদ্রাস্ফীতি নিয়ন্ত্রণে ভারতীয় রিজার্ভ ব্যাংক রেপো রেট অপরিবর্তিত রাখার সিদ্ধান্ত নিল।",
    "keyPoints": [
      "Projected FY27 Real GDP growth at 7.0% with stable macroeconomic fundamentals.",
      "Standing Deposit Facility (SDF) rate maintained at 6.25% and Marginal Standing Facility (MSF) at 6.75%."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Monetary Policy Committee (MPC) Structure",
      "points": [
        "Section 45ZB of RBI Act, 1934: Constitutes 6-member MPC (3 RBI officials + 3 external experts appointed by Central Government).",
        "Chairman of MPC: Governor of RBI (has a casting vote in case of a tie).",
        "Inflation Target (Section 45ZA): 4% (+/- 2% tolerance band: 2% to 6%) measured by CPI headline inflation."
      ]
    },
    "examRelevance": "WBCS Prelims & Mains (Banking Awareness)."
  },
  {
    "id": "econ-feb-02-forex-reserves-620b-2026",
    "day": 16,
    "dateStr": "February 2026",
    "category": "economy_banking",
    "categoryLabel": "💰 External Sector & Forex",
    "title": "India's Foreign Exchange Reserves Cross $620+ Billion Mark",
    "titleBn": "ভারতের বৈদেশিক মুদ্রার সঞ্চয় (Forex Reserves) ৬২০ বিলিয়ন ডলার অতিক্রম করল",
    "summary": "RBI statistical data confirmed India's total forex reserves rose past $620.4 Billion, driven by strong foreign institutional inflows and expansion in foreign currency assets.",
    "summaryBn": "ভারতের বিদেশি মুদ্রার সঞ্চয় আন্তর্জাতিক বাণিজ্যে শক্তিশালী সুরক্ষা প্রদান করছে।",
    "keyPoints": [
      "Provides over 11 months of projected import cover for the Indian economy.",
      "India maintains the 4th largest foreign exchange reserves in the world (after China, Japan, and Switzerland)."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: 4 Components of India's Forex Reserves",
      "points": [
        "1. Foreign Currency Assets (FCA - largest component: USD, Euro, GBP, Yen).",
        "2. Gold Reserves held by RBI.",
        "3. Special Drawing Rights (SDR) with International Monetary Fund.",
        "4. Reserve Tranche Position (RTP) in the IMF."
      ]
    },
    "examRelevance": "WBCS Economy & Foreign Trade."
  },
  {
    "id": "econ-feb-03-epfo-interest-8-25-2026",
    "day": 10,
    "dateStr": "10 February 2026",
    "category": "economy_banking",
    "categoryLabel": "💰 Social Security & Provident Fund",
    "title": "EPFO Central Board of Trustees Approves 8.25% Interest Rate on EPF for FY 2025–26",
    "titleBn": "ইপিএফও (EPFO) দ্বারা প্রভিডেন্ট ফান্ডে সুদের হার ৮.২৫% অনুমোদন",
    "summary": "Central Board of Trustees of Employees' Provident Fund Organisation recommended an 8.25% annual interest rate payout to over 6 crore formal sector subscribers.",
    "summaryBn": "চাকরিজীবীদের ভবিষ্যনিধি তহবিলে সুদের হার ৮.২৫ শতাংশে অক্ষুণ্ণ রাখা হলো।",
    "keyPoints": [
      "Chaired by Union Minister for Labour & Employment.",
      "Distributes over ₹1.07 Lakh Crore earnings generated through government debt securities and equity ETFs."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: EPFO & Social Security Acts",
      "points": [
        "EPFO: Statutory body established under Employees' Provident Funds and Miscellaneous Provisions Act, 1952 | HQ: New Delhi.",
        "3 Schemes Managed: EPF Scheme 1952, EPS (Employees' Pension Scheme 1995), EDLI (Employees' Deposit Linked Insurance 1976)."
      ]
    },
    "examRelevance": "WBCS Economy & Labor Welfare."
  },
  {
    "id": "econ-feb-04-cpi-inflation-5-1-2026",
    "day": 12,
    "dateStr": "12 February 2026",
    "category": "economy_banking",
    "categoryLabel": "💰 Price Indices & Inflation",
    "title": "India's Retail Inflation (CPI) Moderates to 5.10% on Stable Food Supply Chains",
    "titleBn": "খাদ্যপণ্যের দাম নিয়ন্ত্রণে আসায় খুচরা মুদ্রাস্ফীতি কমে ৫.১০ শতাংশে নামল",
    "summary": "National Statistical Office (NSO) reported Consumer Price Index (CPI) combined headline inflation dropped to 5.10%, remaining well within RBI's mandated tolerance zone.",
    "summaryBn": "জাতীয় পরিসংখ্যান দপ্তরের তথ্যে মূল্যবৃদ্ধি নিয়ন্ত্রণে স্বস্তিদায়ক প্রবণতা লক্ষ্য করা গেল।",
    "keyPoints": [
      "Consumer Food Price Index (CFPI) cooled across pulses, edible oils, and vegetables.",
      "Core inflation (excluding food and fuel) settled at a multi-year low of 3.6%."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: CPI vs WPI in India",
      "points": [
        "CPI (Consumer Price Index): Base Year 2012; published monthly by NSO (MoSPI); headline CPI is the nominal anchor for RBI monetary policy.",
        "WPI (Wholesale Price Index): Base Year 2011-12; published monthly by Office of the Economic Adviser (DPIIT, Ministry of Commerce & Industry)."
      ]
    },
    "examRelevance": "WBCS Economy (Inflation Concepts)."
  },
  {
    "id": "econ-feb-05-oecd-india-gdp-6-7-2026",
    "day": 5,
    "dateStr": "February 2026",
    "category": "economy_banking",
    "categoryLabel": "💰 Global Economic Forecasts",
    "title": "OECD Upgrades India's GDP Growth Projection to 6.7% for FY 2026–27",
    "titleBn": "ওইসিডি (OECD) রিপোর্টে ভারতের অর্থনৈতিক প্রবৃদ্ধির পূর্বাভাস বাড়িয়ে ৬.৭% করা হলো",
    "summary": "Organisation for Economic Co-operation and Development highlighted India as the fastest-growing major economy, driven by massive public capital expenditure.",
    "summaryBn": "প্যারিসভিত্তিক আন্তর্জাতিক সংস্থার সমীক্ষায় ভারত বিশ্বের দ্রুততম ক্রমবর্ধমান প্রধান অর্থনীতি হিসেবে স্বীকৃতি পেল।",
    "keyPoints": [
      "India projected to comfortably outpace China (4.7%) and USA (2.1%).",
      "Praised structural reforms in semiconductor fabrication and logistics efficiency under PM GatiShakti."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: OECD (Organisation for Economic Co-operation and Development)",
      "points": [
        "Established: 1961 (succeeding OEEC formed in 1948 for Marshall Plan) | HQ: Paris, France.",
        "38 Member Countries (India is a Key Partner nation alongside Brazil, China, Indonesia, South Africa)."
      ]
    },
    "examRelevance": "WBCS Economy & Global Ratings."
  },
  {
    "id": "econ-feb-06-sidbi-gcf-100m-2026",
    "day": 20,
    "dateStr": "February 2026",
    "category": "economy_banking",
    "categoryLabel": "💰 MSME & Climate Finance",
    "title": "SIDBI Secures $100 Million Anchor Funding from Green Climate Fund (GCF) for MSMEs",
    "titleBn": "ক্ষুদ্র ও মাঝারি শিল্পের সবুজ রূপান্তরে গ্রিন ক্লাইমেট ফান্ড থেকে ১০০ মিলিয়ন ডলার পেল সিডবি",
    "summary": "Small Industries Development Bank of India (SIDBI) operationalized the $120M \"Avaana Climate and Energy Transition Fund\" backed by GCF to finance clean-tech MSMEs.",
    "summaryBn": "ভারতে ক্ষুদ্র ও মাঝারি শিল্পে সৌরশক্তি ও সবুজ প্রযুক্তির প্রসারে আন্তর্জাতিক জলবায়ু তহবিল সহায়তা দিল।",
    "keyPoints": [
      "First project approved for an Indian direct access entity by GCF board.",
      "Supports energy-efficient electric mobility, agritech supply chains, and industrial circularity."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: SIDBI & Green Climate Fund (GCF)",
      "points": [
        "SIDBI: Statutory financial institution established on 2 April 1990 under SIDBI Act, 1989 | HQ: Lucknow, Uttar Pradesh.",
        "Green Climate Fund (GCF): Created under UNFCCC in 2010 at COP16 Cancun | HQ: Incheon, South Korea."
      ]
    },
    "examRelevance": "WBCS Economy & Climate Finance."
  },
  {
    "id": "econ-feb-07-sebi-t1-settlement-bonds-2026",
    "day": 24,
    "dateStr": "February 2026",
    "category": "economy_banking",
    "categoryLabel": "💰 Capital Markets & Bonds",
    "title": "SEBI Streamlines T+1 Settlement for Corporate Bonds & Sovereign Gold Bonds",
    "titleBn": "কর্পোরেট বন্ড ও গোল্ড বন্ডের জন্য টি+১ লেনদেন নিষ্পত্তি কার্যকর করল সেবি",
    "summary": "Securities and Exchange Board of India transitioned secondary market bond trades to a mandatory T+1 (Trade + 1 Day) settlement cycle, matching equities.",
    "summaryBn": "বন্ড মার্কেটে বিনিয়োগকারীদের তারল্য ও নিরাপত্তা বাড়াতে সেবির নতুন নিষ্পত্তি নিয়ম কার্যকর হলো।",
    "keyPoints": [
      "Shortens the trade settlement timeframe, mitigating counterparty risks.",
      "Applies to corporate debentures, municipal bonds, and commercial papers."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: SEBI & Capital Market Regulations",
      "points": [
        "SEBI: Established on 12 April 1988; given statutory powers on 30 January 1992 via SEBI Act, 1992 | HQ: BKC, Mumbai.",
        "1st Woman Chairperson of SEBI: Madhabi Puri Buch (appointed March 2022)."
      ]
    },
    "examRelevance": "WBCS Banking & Capital Markets."
  },
  {
    "id": "econ-feb-08-gem-4lakh-cr-2026",
    "day": 28,
    "dateStr": "February 2026",
    "category": "economy_banking",
    "categoryLabel": "💰 Public Procurement",
    "title": "Government e-Marketplace (GeM) Cumulative Annual GMV Crosses ₹4 Lakh Crore",
    "titleBn": "সরকারি ই-মার্কেটপ্লেস (GeM) পোর্টালে কেনাবেচা ₹৪ লক্ষ কোটি টাকা স্পর্শ করল",
    "summary": "Ministry of Commerce & Industry reported that annual public buying on the GeM portal surpassed ₹4 Lakh Crore, with over 50% orders awarded to MSMEs and women-led enterprises.",
    "summaryBn": "স্বচ্ছতার সাথে সরকারি কেনাকাটায় ডিজিটাল প্ল্যাটফর্ম GeM নতুন মাইলফলক স্পর্শ করল।",
    "keyPoints": [
      "Eliminated intermediaries across central ministries, states, and PSUs.",
      "Features dedicated 'Womaniya' and 'Tribal India' artisan storefronts."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Government e-Marketplace (GeM)",
      "points": [
        "GeM Launched: 9 August 2016 by Ministry of Commerce and Industry under National Public Procurement Policy.",
        "General Financial Rules (GFR 2017 - Rule 149): Mandates government departments to procure through GeM."
      ]
    },
    "examRelevance": "WBCS Governance & Economy."
  },
  {
    "id": "econ-feb-09-central-excise-day-2026",
    "day": 24,
    "dateStr": "24 February 2026",
    "category": "economy_banking",
    "categoryLabel": "💰 Taxation & Customs",
    "title": "Central Board of Indirect Taxes & Customs (CBIC) Observes Central Excise Day 2026",
    "titleBn": "কেন্দ্রীয় পরোক্ষ কর ও শুল্ক বোর্ড (CBIC) দ্বারা জাতীয় আবগারি দিবস উদযাপন",
    "summary": "Celebrated across all customs and GST zones commemorating the Central Excise and Salt Act, 1944, highlighting AI-enabled faceless cargo inspections at ports.",
    "summaryBn": "২৪ ফেব্রুয়ারি দেশজুড়ে সেন্ট্রাল এক্সাইজ ডে পালিত হলো; স্মার্ট কাস্টমস ক্লিয়ারেন্স ব্যবস্থা জোরদার।",
    "keyPoints": [
      "Faceless digital cargo clearance reduced average container dwell time by 40%.",
      "Electronic cargo tracking system (ECTS) operationalized across international trade borders."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: CBIC & GST Architecture",
      "points": [
        "CBIC: Statutory board under Department of Revenue (Ministry of Finance); administers GST, Customs, and Central Excise.",
        "GST Council (Article 279A): Constitutional body chaired by Union Finance Minister (101st Amendment Act, 2016)."
      ]
    },
    "examRelevance": "WBCS Fiscal Economy & Taxation."
  },
  {
    "id": "econ-feb-10-direct-tax-growth-2026",
    "day": 18,
    "dateStr": "February 2026",
    "category": "economy_banking",
    "categoryLabel": "💰 Direct Taxes & CBDT",
    "title": "Gross Direct Tax Collections Cross ₹18.5 Lakh Crore for FY 2025–26",
    "titleBn": "চলতি অর্থবর্ষে ভারতের মোট প্রত্যক্ষ কর আদায় ১৮.৫ লক্ষ কোটি টাকা অতিক্রম করল",
    "summary": "Central Board of Direct Taxes (CBDT) reported corporate income tax and personal income tax grew over 17% year-on-year, driven by digitization and AIS compliance.",
    "summaryBn": "আয়কর ও কর্পোরেট কর আদায়ে রেকর্ড প্রবৃদ্ধি ভারতের রাজস্ব স্থিতিশীলতাকে শক্তিশালী করল।",
    "keyPoints": [
      "Annual Information Statement (AIS) and pre-filled ITR forms reduced non-filing compliance gaps.",
      "Personal Income Tax collections surpassed Corporate Tax collections for the third consecutive year."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: CBDT & Direct Taxes",
      "points": [
        "CBDT (Central Board of Direct Taxes): Statutory authority functioning under Central Board of Revenue Act, 1963 | Head: Chairman CBDT.",
        "Direct Taxes in India: Income Tax, Corporate Tax, Securities Transaction Tax (STT)."
      ]
    },
    "examRelevance": "WBCS Fiscal Economy & Public Finance."
  },
  {
    "id": "def-feb-01-ex-milan-2026-vizag",
    "day": 15,
    "dateStr": "15–25 February 2026",
    "category": "defense_navy",
    "categoryLabel": "⚓ Multilateral Naval Exercises",
    "title": "Exercise MILAN 2026 Hosted by Indian Navy in Visakhapatnam: 71 Warships from 50+ Navies",
    "titleBn": "বিশাখাপত্তনমে ভারতীয় নৌবাহিনীর মেগা মহড়া \"মিলন ২০২৬\": ৫০টিরও বেশি দেশের ৭১টি যুদ্ধজাহাজের অংশগ্রহণ",
    "summary": "Indian Navy hosted its flagship multilateral maritime exercise MILAN 2026 off the coast of Visakhapatnam with 71 warships (45 Indian Navy capital ships alongside US, Russia, Japan, Australia, South Africa, UAE navies).",
    "summaryBn": "বঙ্গোপসাগরে বিশ্ব নৌবহরের অংশগ্রহণে মিলন ২০২৬ মহড়া সফলভাবে সম্পন্ন হলো; সমাপ্তি অনুষ্ঠান বিমানবাহী রণতরী আইএনএস বিক্রান্তে অনুষ্ঠিত হয়।",
    "keyPoints": [
      "Closing ceremony held aboard India's indigenous aircraft carrier INS Vikrant.",
      "Concurrently hosted the International Fleet Review (IFR 2026) and IONS Conclave of Chiefs (first time all three held simultaneously).",
      "Included complex anti-submarine warfare, air defense live firings, and maritime interdiction operations."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: MILAN Exercise & Aircraft Carriers of India",
      "points": [
        "MILAN Origin: Started in 1995 at Andaman & Nicobar Command with 4 navies (Indonesia, Singapore, Sri Lanka, Thailand).",
        "INS Vikrant (IAC-1): India's 1st indigenous aircraft carrier built by Cochin Shipyard Ltd (commissioned Sept 2022; Motto: \"Jayema Sam Yudhi Spradhah\").",
        "INS Vikramaditya: Modified Kiev-class aircraft carrier acquired from Russia (commissioned Nov 2013)."
      ]
    },
    "examRelevance": "Guaranteed 2 questions in WBCS Prelims, WBP SI, and Kolkata Police."
  },
  {
    "id": "def-feb-02-ex-vayu-shakti-2026-pokhran",
    "day": 27,
    "dateStr": "27 February 2026",
    "category": "defense_navy",
    "categoryLabel": "⚓ Air Force Firepower Demonstrations",
    "title": "Indian Air Force Conducts Mega Firepower Exercise \"Vayu Shakti-2026\" at Pokhran",
    "titleBn": "পোখরানে ভারতীয় বিমানবাহিনীর মেগা যুদ্ধাস্ত্র মহড়া \"বায়ু শক্তি-২০২৬\" সম্পন্ন",
    "summary": "IAF demonstrated full-spectrum precision strike capabilities at Pokhran Field Firing Range in Rajasthan, deploying over 120 aircraft and helicopters dropping precision munitions day and night.",
    "summaryBn": "মরুশহরে রাফাল, সুখোই-৩০, তেজস ও মিরাজ যুদ্ধবিমানের চোখধাঁধানো ক্ষেপণাস্ত্র প্রদর্শন সম্পন্ন হলো।",
    "keyPoints": [
      "Featured indigenous LCA Tejas, Rafale, Su-30MKI, Apache-64E, and Prachand Light Combat Helicopter (LCH).",
      "Live firing of indigenous Astra Beyond Visual Range (BVR) missile and Akash surface-to-air missile systems."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: IAF Triennial Exercises & Pokhran Tests",
      "points": [
        "3 Triennial IAF Exercises: Vayu Shakti (Firepower at Pokhran), Gagan Shakti (Pan-India readiness), Iron Fist.",
        "Pokhran Nuclear Tests: Pokhran-I (Operation Smiling Buddha, 18 May 1974) and Pokhran-II (Operation Shakti, 11 & 13 May 1998 - National Technology Day)."
      ]
    },
    "examRelevance": "WBCS Defense, WBP SI, SSC CGL."
  },
  {
    "id": "def-feb-03-ex-khanjar-2026-assam",
    "day": 3,
    "dateStr": "February 2026",
    "category": "defense_navy",
    "categoryLabel": "⚓ Special Forces Bilateral Drills",
    "title": "India-Kyrgyzstan Joint Special Forces Exercise \"Khanjar 2026\" Conducted in Missamari, Assam",
    "titleBn": "আসামের মিসামারিতে ভারত ও কিরগিজস্তানের যৌথ স্পেশাল ফোর্সেস মহড়া \"খঞ্জর ২০২৬\" অনুষ্ঠিত",
    "summary": "Indian Army Parachute Regiment (Special Forces) and Kyrgyz Scorpion Brigade conducted specialized mountain counter-terrorism and tactical room-clearing drills.",
    "summaryBn": "পাহাড়ি ও জঙ্গলাকীর্ণ পরিবেশে সন্ত্রাসদমন অভিযানে ভারতীয় প্যারা এসএফ ও কিরগিজ কমান্ডোদের যৌথ মহড়া।",
    "keyPoints": [
      "Focus on sniper marksmanship, combat freefall insertion, and neutralising hostile threats in built-up areas.",
      "Conducted under UN Chapter VII mandate."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Kyrgyzstan & Central Asian Republics",
      "points": [
        "Capital: Bishkek | Currency: Kyrgyzstani Som (KGS).",
        "Lake Issyk-Kul: Second-largest mountain lake in the world (after Lake Titicaca) in Tian Shan mountains of Kyrgyzstan.",
        "Kazind: India-Kazakhstan joint military exercise | Dustlik: India-Uzbekistan joint military exercise."
      ]
    },
    "examRelevance": "WBCS Defense & Geography, WBPSC Food SI."
  },
  {
    "id": "def-feb-04-ins-jatayu-minicoy-2026",
    "day": 28,
    "dateStr": "February 2026",
    "category": "defense_navy",
    "categoryLabel": "⚓ Strategic Island Naval Bases",
    "title": "Indian Navy Commissions New Forward Naval Base \"INS Jatayu\" on Minicoy Island, Lakshadweep",
    "titleBn": "লাক্ষাদ্বীপের মিনিকয় দ্বীপে ভারতীয় নৌবাহিনীর নতুন অগ্রবর্তী ঘাঁটি \"আইএনএস জটায়ু\" কমিশন",
    "summary": "Naval detachment upgraded into a fully commissioned operational naval base (INS Jatayu) to enhance maritime domain awareness and counter piracy in the Arabian Sea.",
    "summaryBn": "আরব সাগরে আন্তর্জাতিক বাণিজ্য জলপথের সুরক্ষায় ভারতের দ্বিতীয় লাক্ষাদ্বীপ নৌঘাঁটি স্থাপিত হলো।",
    "keyPoints": [
      "Second naval base in Lakshadweep after INS Dweeprakshak in Kavaratti.",
      "Directly overlooks the crucial Nine Degree Channel carrying heavy international merchant traffic."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Lakshadweep Archipelago & Strategic Channels",
      "points": [
        "Eight Degree Channel (8° N): Separates Indian island of Minicoy (Lakshadweep) from Maldives.",
        "Nine Degree Channel (9° N): Separates Minicoy island from main Lakshadweep archipelago.",
        "Ten Degree Channel (10° N): Separates Andaman Islands from Nicobar Islands in Bay of Bengal."
      ]
    },
    "examRelevance": "Guaranteed Straits/Channels question in WBCS & Police exams."
  },
  {
    "id": "def-feb-05-c295-aircraft-navy-2026",
    "day": 16,
    "dateStr": "February 2026",
    "category": "defense_navy",
    "categoryLabel": "⚓ Transport Aviation & Make in India",
    "title": "Cabinet Approves 15 Indigenous C-295 Medium Transport Aircraft for Navy & Coast Guard",
    "titleBn": "নৌবাহিনী ও উপকূলরক্ষী বাহিনীর জন্য ১৫টি নতুন সি-২৯৫ পরিবহন বিমান কেনার সরকারি অনুমোদন",
    "summary": "Cabinet Committee on Security (CCS) approved procurement of 9 C-295 maritime surveillance aircraft for Indian Navy and 6 for Coast Guard manufactured at Tata-Airbus Vadodara facility.",
    "summaryBn": "ভারতীয় নৌবহর ও উপকূলের নজরদারি বাড়াতে টাটা-এয়ারবাস কারখানায় তৈরি বিমান যুক্ত হচ্ছে।",
    "keyPoints": [
      "Manufactured under Make in India by Tata Advanced Systems Limited (TASL) in Vadodara, Gujarat.",
      "Replaces legacy Avro-748 transport fleets across defense wings."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: India's Private Defense Aviation",
      "points": [
        "C-295 Final Assembly Line: India's 1st private sector aircraft manufacturing plant in Vadodara (2022).",
        "HAL (Hindustan Aeronautics Limited): Established in 1940 as Hindustan Aircraft by Walchand Hirachand in Bengaluru; nationalised 1964 | Navratna PSU."
      ]
    },
    "examRelevance": "WBCS Defense & Industrial Economy."
  },
  {
    "id": "def-feb-06-drdo-abhyas-heat-2026",
    "day": 5,
    "dateStr": "February 2026",
    "category": "defense_navy",
    "categoryLabel": "⚓ Target Drones & Missile Testing",
    "title": "DRDO Successfully Tests High-Speed Expendable Aerial Target (HEAT) \"ABHYAS\" at Chandipur",
    "titleBn": "ডিআরডিও দ্বারা হাই-স্পিড এক্সপেন্ডেবল এরিয়াল টার্গেট \"অভ্যাস\" (ABHYAS)-এর সফল উড়ান পরীক্ষা",
    "summary": "Aeronautical Development Establishment (ADE) Bengaluru successfully flight-tested indigenous ABHYAS target drones from ITR Chandipur, Odisha.",
    "summaryBn": "ক্ষেপণাস্ত্র পরীক্ষার জন্য কৃত্রিম লক্ষ্যবস্তু হিসেবে ব্যবহারযোগ্য ড্রোন অভ্যাসের সফল পরীক্ষা সম্পন্ন।",
    "keyPoints": [
      "Equipped with MEMS-based inertial navigation, telemetry system, and radar cross-section (RCS) augmenters.",
      "Provides realistic aerial threat simulation for testing surface-to-air and air-to-air missile radars."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: DRDO Aeronautical Labs",
      "points": [
        "ADE (Aeronautical Development Establishment): Bengaluru (develops UAVs: Nishant, Rustom, Tapas, Abhyas).",
        "ADA (Aeronautical Development Agency): Bengaluru (designed LCA Tejas).",
        "GTRE (Gas Turbine Research Establishment): Bengaluru (developed Kaveri jet engine)."
      ]
    },
    "examRelevance": "WBCS Science & Technology (Defense)."
  },
  {
    "id": "def-feb-07-d4-anti-drone-army-2026",
    "day": 20,
    "dateStr": "February 2026",
    "category": "defense_navy",
    "categoryLabel": "⚓ Counter-Drone Directed Energy",
    "title": "Indian Army Inducts Indigenous D4 Anti-Drone Laser Weapon Systems on Western Borders",
    "titleBn": "ভারতীয় সেনায় যুক্ত হলো দেশীয় প্রযুক্তির ড্রোন শনাক্ত ও লেজারে ধ্বংসকারী \"D4\" সিস্টেম",
    "summary": "DRDO and BEL delivered truck-mounted D4 (Drone Detect, Deter and Destroy) counter-drone systems equipped with RF jamming and directed energy lasers to counter cross-border narco-drones.",
    "summaryBn": "সীমান্তে শত্রুপক্ষের ড্রোন নিষ্ক্রিয় করতে লেজার নিয়ন্ত্রিত অ্যান্টি-ড্রোন সিস্টেম মোতায়েন করা হলো।",
    "keyPoints": [
      "Detects micro-drones up to 4 km range and destroys them using high-energy laser beam within 1.5 km.",
      "Deployed along Western borders in Punjab and J&K."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: BEL & Directed Energy Weapons",
      "points": [
        "BEL (Bharat Electronics Limited): Founded in 1954 in Bengaluru under MoD (Navratna PSU).",
        "Directed Energy Weapons (DEW): High-energy lasers and high-power microwaves (DURGA-II project by DRDO)."
      ]
    },
    "examRelevance": "WBCS Science & Technology (Defense)."
  },
  {
    "id": "def-feb-08-bel-shakti-contract-2026",
    "day": 13,
    "dateStr": "February 2026",
    "category": "defense_navy",
    "categoryLabel": "⚓ Electronic Warfare Systems",
    "title": "MoD Inks ₹2,269 Crore Contract with BEL for Indigenous \"Shakti\" Electronic Warfare Systems",
    "titleBn": "ভারতীয় নৌবাহিনীর জন্য ₹২,২৬৯ কোটি টাকার দেশীয় \"শক্তি\" ইলেকট্রনিক যুদ্ধ ব্যবস্থার চুক্তি",
    "summary": "Contract signed for 11 Advanced Electronic Warfare (EW) Shakti systems designed by DLRL Hyderabad for installation on frontline Indian Navy destroyers and frigates.",
    "summaryBn": "রণতরীর শত্রুপক্ষের রাডার ও মিসাইল জ্যামিং ক্ষমতা বাড়াতে ডিআরডিও ও বেলের মেগা চুক্তি স্বাক্ষরিত হলো।",
    "keyPoints": [
      "Shakti EW system intercepts and jams modern electronic radars and anti-ship missile seekers.",
      "Installed on Visakhapatnam-class destroyers and Nilgiri-class frigates."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: DLRL Hyderabad & Electronic Warfare",
      "points": [
        "DLRL (Defence Electronics Research Laboratory): Hyderabad, Telangana (premier DRDO lab for electronic warfare: Samyukta, Sangraha, Shakti).",
        "Atmanirbhar Bharat in Defense: DAP 2020 mandates over 60% indigenous content in Buy (Indian-IDDM) category."
      ]
    },
    "examRelevance": "WBCS Defense & Economy."
  },
  {
    "id": "def-feb-09-dharma-guardian-2026",
    "day": 25,
    "dateStr": "25 Feb – 09 Mar 2026",
    "category": "defense_navy",
    "categoryLabel": "⚓ Bilateral Army Exercises",
    "title": "Exercise \"Dharma Guardian 2026\": 5th Edition of India-Japan Army Drills in Rajasthan",
    "titleBn": "ভারত ও জাপানের যৌথ স্থলসেনা মহড়া \"ধর্ম গার্ডিয়ান ২০২৬\" (মহাজন ফিল্ড ফায়ারিং রেঞ্জ)",
    "summary": "Indian Army (Rajputana Rifles) and Japan Ground Self-Defense Force (JGSDF) conducted joint tactical exercises at Mahajan Field Firing Ranges in Rajasthan.",
    "summaryBn": "মরুভূমিতে সন্ত্রাসদমন ও ড্রোন যুদ্ধের কৌশল বিনিময়ে ভারত ও জাপানের সেনার যৌথ মহড়া অনুষ্ঠিত হলো।",
    "keyPoints": [
      "Focus on counter-terrorism in urban/semi-urban environments under UN Chapter VII mandate.",
      "Included employment of unmanned aerial platforms (UAVs) and joint tactical command posts."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: India-Japan Bilateral Defense Architecture",
      "points": [
        "2+2 Ministerial Dialogue: Foreign and Defense Ministers of India and Japan meet periodically.",
        "QUAD (Quadrilateral Security Dialogue): India, USA, Japan, Australia (originated 2007 by Shinzo Abe).",
        "Malabar Exercise: Annual naval exercise originally started in 1992 as bilateral India-US drill; Japan joined as permanent member in 2015."
      ]
    },
    "examRelevance": "WBCS Defense & SSC CGL."
  },
  {
    "id": "def-feb-10-ex-dosti-16-maldives-2026",
    "day": 22,
    "dateStr": "22–25 February 2026",
    "category": "defense_navy",
    "categoryLabel": "⚓ Trilateral Coast Guard Drills",
    "title": "Exercise \"Dosti-16\": Trilateral Coast Guard Exercise Between India, Maldives, and Sri Lanka",
    "titleBn": "ভারত, মালদ্বীপ ও শ্রীলঙ্কার ত্রিপাক্ষিক উপকূলরক্ষী মহড়া \"দোস্তি-১৬\" (মালে)",
    "summary": "16th edition of biennial trilateral coast guard exercise conducted off Male, Maldives with Bangladesh observing for the first time.",
    "summaryBn": "ভারত মহাসাগরে তেল নিঃসরণ রোধ ও উদ্ধার অভিযানে তিন বন্ধু দেশের উপকূলরক্ষী বাহিনীর মহড়া।",
    "keyPoints": [
      "ICG Ships Samarth, Abhinav, and ICG Dornier aircraft participated.",
      "Focus on maritime search and rescue (M-SAR), marine pollution response, and anti-smuggling."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Indian Coast Guard & SAGAR Policy",
      "points": [
        "Indian Coast Guard Formed: 1 February 1977 (statutory status on 18 Aug 1978 under Coast Guard Act, 1978) | Motto: \"वयम् रक्षामঃ\" (We Protect).",
        "SAGAR: Security and Growth for All in the Region (India's maritime outreach policy initiated in 2015)."
      ]
    },
    "examRelevance": "WBCS Defense & International Relations."
  },
  {
    "id": "def-feb-11-ins-trikand-red-sea-2026",
    "day": 14,
    "dateStr": "February 2026",
    "category": "defense_navy",
    "categoryLabel": "⚓ International Maritime Security",
    "title": "INS Trikand Operates with Combined Maritime Forces (CMF) for Red Sea Anti-Piracy Patrols",
    "titleBn": "লোহিত সাগর ও ওমান উপসাগরে যৌথ টহলদারিতে নিযুক্ত হলো ভারতীয় রণতরী আইএনএস ত্রিকণ্ড",
    "summary": "Stealth frigate INS Trikand operated under Combined Task Force 150 (CTF 150) countering illicit maritime narcotics and arms trafficking across the Gulf of Oman.",
    "summaryBn": "আন্তর্জাতিক নৌ টাস্ক ফোর্সের সাথে আরব সাগর ও লোহিত সাগরে নিরাপত্তা অভিযান চালাল ভারতীয় নৌবাহিনী।",
    "keyPoints": [
      "India is a full member of Combined Maritime Forces (CMF) headquartered in Bahrain.",
      "Guarantees safe passage for merchant shipping through the Bab-el-Mandeb and Gulf of Aden."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Strategic Chokepoints in Middle East",
      "points": [
        "Bab-el-Mandeb Strait: Connects Red Sea to Gulf of Aden / Arabian Sea (\"Gate of Tears\").",
        "Strait of Hormuz: Connects Persian Gulf to Gulf of Oman (chokepoint for 20% of global oil shipments).",
        "Suez Canal: 193 km artificial sea-level waterway in Egypt connecting Mediterranean Sea to Red Sea (opened Nov 1869)."
      ]
    },
    "examRelevance": "WBCS World Geography & Defense."
  },
  {
    "id": "def-feb-12-ex-dustlik-tashkent-2026",
    "day": 20,
    "dateStr": "February 2026",
    "category": "defense_navy",
    "categoryLabel": "⚓ Central Asian Military Ties",
    "title": "Exercise \"DUSTLIK 2026\" Advanced Planning Finalized in Tashkent, Uzbekistan",
    "titleBn": "ভারত ও উজবেকিস্তানের যৌথ সামরিক মহড়া \"দস্তলিক\" (DUSTLIK)-এর রূপরেখা চূড়ান্ত",
    "summary": "Indian Army and Armed Forces of Uzbekistan finalized the operational roadmap for the 5th edition of joint military drills focusing on semi-urban counter-terror operations.",
    "summaryBn": "মধ্য এশিয়ার দেশ উজবেকিস্তানের সাথে যৌথ সেনা মহড়ার প্রস্তুতি সম্পন্ন হলো।",
    "keyPoints": [
      "Garhwal Rifles regiment represents the Indian Army contingent.",
      "1st edition of DUSTLIK was held in Tashkent in November 2019."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Uzbekistan & Central Asian Geography",
      "points": [
        "Double Landlocked Nation: Uzbekistan is one of only two doubly landlocked countries in the world (the other is Liechtenstein).",
        "Aral Sea: Shrinking lake fed by Amu Darya and Syr Darya rivers.",
        "Capital: Tashkent | Currency: Uzbekistani Som (UZS)."
      ]
    },
    "examRelevance": "WBCS Geography & Defense."
  },
  {
    "id": "space-feb-01-nsss-2026-meghalaya",
    "day": 23,
    "dateStr": "23–27 February 2026",
    "category": "space_science",
    "categoryLabel": "🚀 National Space Science Symposium",
    "title": "ISRO 23rd National Space Science Symposium (NSSS-2026) Concludes in Umiam, Meghalaya",
    "titleBn": "মেঘালয়ের উমিয়ামে ইসরোর ২৩তম জাতীয় মহাকাশ বিজ্ঞান সম্মেলন (NSSS-2026) সম্পন্ন",
    "summary": "ISRO and NESAC brought together top astrophysicists and planetary researchers to evaluate scientific datasets from Aditya-L1, Chandrayaan-3, and XPoSat missions.",
    "summaryBn": "আদিত্য-এল১ ও চন্দ্রযান-৩ থেকে প্রাপ্ত তথ্য বিশ্লেষণ ও ভবিষ্যতের মহাকাশ অভিযান নিয়ে বিজ্ঞানীদের সম্মেলন সম্পন্ন।",
    "keyPoints": [
      "Deliberated on upcoming Gaganyaan uncrewed human spaceflight test flights and Shukrayaan Venus orbiter design.",
      "Special focus on space weather modeling and solar flare impacts on satellite constellations."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: ISRO Solar & Astronomy Missions",
      "points": [
        "Aditya-L1: India's 1st dedicated solar observatory placed in Halo orbit around Sun-Earth L1 Lagrangian point (1.5 million km from Earth).",
        "XPoSat (X-ray Polarimeter Satellite): India's 1st dedicated polarimetry mission (launched 1 Jan 2024; 2nd in world after NASA IXPE).",
        "AstroSat: India's 1st multi-wavelength space telescope launched in Sept 2015."
      ]
    },
    "examRelevance": "WBCS Science & Technology, UPSC GS III."
  },
  {
    "id": "space-feb-02-national-science-day-2026",
    "day": 28,
    "dateStr": "28 February 2026",
    "category": "space_science",
    "categoryLabel": "🚀 National Science Day",
    "title": "National Science Day 2026 Celebrated Across India: Theme \"Indigenous Technologies for Viksit Bharat\"",
    "titleBn": "জাতীয় বিজ্ঞান দিবস ২০২৬: \"বিকশিত ভারতের জন্য দেশীয় প্রযুক্তি\" থিমে দেশজুড়ে পালন",
    "summary": "Celebrated across Indian scientific research laboratories, universities, and schools commemorating Sir C.V. Raman's historic discovery of the Raman Effect on 28 February 1928.",
    "summaryBn": "২৮ ফেব্রুয়ারি স্যার সি ভি রামনের ঐতিহাসিক রামন এফেক্ট আবিষ্কারের স্মরণে জাতীয় বিজ্ঞান দিবস পালিত হলো।",
    "keyPoints": [
      "Focus on indigenous semiconductor chips, biotech healthcare, quantum communication, and clean hydrogen.",
      "Conferred National Science Popularization Awards by Department of Science & Technology (DST)."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Sir C.V. Raman & Raman Effect",
      "points": [
        "Raman Effect: Inelastic scattering of photons by molecules causing a shift in light frequency/wavelength.",
        "Nobel Prize in Physics: Awarded to Sir Chandrasekhara Venkata Raman in 1930 (1st Asian to win a science Nobel).",
        "1st Bharat Ratna Awardee: 1954 (alongside C. Rajagopalachari and Dr. S. Radhakrishnan).",
        "IACS Kolkata: Historic laboratory in Bowbazar/Jadavpur, Kolkata where Raman conducted his discovery."
      ]
    },
    "examRelevance": "Guaranteed question in all 2026 WBPSC & Police exams."
  },
  {
    "id": "space-feb-03-iisc-synthetic-antivenom-2026",
    "day": 22,
    "dateStr": "February 2026",
    "category": "space_science",
    "categoryLabel": "🚀 Biotechnology & Venom Research",
    "title": "IISc Bengaluru Scientists Develop Universal Synthetic Human Antibody Against Snake Venom",
    "titleBn": "আইআইএসসি বেঙ্গালুরুর বিজ্ঞানীদের দ্বারা সাপের বিষের বিরুদ্ধে সার্বজনীন সিন্থেটিক অ্যান্টিবডি উদ্ভাবন",
    "summary": "Researchers at the Indian Institute of Science developed an engineered human antibody that neutralizes lethal neurotoxins across Elapid snakes (Cobra, Krait, Black Mamba).",
    "summaryBn": "সাপের কামড়ে বিষের ক্ষতি রুখতে ল্যাবরেটরিতে তৈরি যুগান্তকারী অ্যান্টিবডি আবিষ্কার করল আইআইএসসি।",
    "keyPoints": [
      "Targets the conserved core of three-finger toxins (3FTx) in snake venom, preventing respiratory paralysis.",
      "Replaces traditional horse-derived antivenom which often causes severe serum sickness and allergic anaphylaxis."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: \"Big Four\" Venomous Snakes of India",
      "points": [
        "India's Big Four: 1. Spectacled Cobra (*Naja naja*), 2. Common Krait (*Bungarus caeruleus*), 3. Russell's Viper (*Daboia russelii*), 4. Saw-scaled Viper (*Echis carinatus*).",
        "IISc Bengaluru: Founded in 1909 by visionary industrialist Jamsetji Nusserwanji Tata and Swami Vivekananda (with land donated by Maharaja of Mysore Krishnaraja Wadiyar IV)."
      ]
    },
    "examRelevance": "WBCS Biology & General Science, UPSC GS III."
  },
  {
    "id": "space-feb-04-cart-cancer-therapy-2026",
    "day": 9,
    "dateStr": "February 2026",
    "category": "space_science",
    "categoryLabel": "🚀 Cancer Immunotherapy",
    "title": "India Scales Indigenous CAR-T Cell Therapy \"NexCAR19\" for Pediatric & Adult Leukemia",
    "titleBn": "ভারতের প্রথম নিজস্ব প্রযুক্তির রক্তের ক্যান্সারের জিন থেরাপি \"NexCAR19\" চিকিৎসায় সম্প্রসারিত",
    "summary": "Developed jointly by IIT Bombay and Tata Memorial Centre (TMC) Mumbai, indigenous CAR-T therapy reduced treatment costs by 90% compared to Western clinical alternatives.",
    "summaryBn": "আইআইটি বোম্বে ও টাটা মেমোরিয়াল সেন্টারের যৌথ আবিষ্কারে সাশ্রয়ী মূল্যে ক্যান্সারের জিন থেরাপি ব্যাপক আকারে শুরু হলো।",
    "keyPoints": [
      "CAR-T (Chimeric Antigen Receptor T-cell) genetically re-engineers a patient's own T-lymphocytes to target CD19 proteins on B-cell cancer.",
      "Approved by Central Drugs Standard Control Organisation (CDSCO)."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Immune System & T-Cells",
      "points": [
        "T-Lymphocytes: White blood cells originating in bone marrow and maturing in the Thymus gland (cell-mediated immunity).",
        "B-Lymphocytes: Responsible for humoral immunity (produce antibodies).",
        "CDSCO: National regulatory body for pharmaceuticals | Head: DCGI (Drugs Controller General of India)."
      ]
    },
    "examRelevance": "WBCS Biology & Biotechnology, UPSC GS III."
  },
  {
    "id": "space-feb-05-iit-guwahati-3d-bone-2026",
    "day": 14,
    "dateStr": "February 2026",
    "category": "space_science",
    "categoryLabel": "🚀 Biomaterials & 3D Printing",
    "title": "IIT Guwahati Develops Bioactive 3D-Printed Scaffolds for Pediatric Bone Regeneration",
    "titleBn": "আইআইটি গুয়াহাটির গবেষকদের দ্বারা শিশুদের হাড় পুনর্গঠনে বায়োঅ্যাক্টিভ থ্রি-ডি প্রিন্টেড স্ক্যাফোল্ড উদ্ভাবন",
    "summary": "Researchers at IIT Guwahati engineered biodegradable silk-composite bone implants for children with congenital bone defects.",
    "summaryBn": "রেশম ও প্রাকৃতিক উপাদান দিয়ে কৃত্রিম হাড়ের কাঠামো তৈরির নতুন চিকিৎসা প্রযুক্তি আবিষ্কৃত হলো।",
    "keyPoints": [
      "Blends North East Indian Eri and Muga silk fibroin polymers with calcium phosphate nanoparticles.",
      "Gradually resorbs in the body as natural bone tissue grows, avoiding second removal surgeries."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Human Skeletal System",
      "points": [
        "Total Bones in Adult Human Body: 206 bones (infants have ~270 to 300 bones).",
        "Longest & Strongest Bone: Femur (Thigh bone) | Smallest Bone: Stapes (in Middle Ear).",
        "Bone Composition: Collagen protein matrix hardened with Calcium Hydroxyapatite crystals."
      ]
    },
    "examRelevance": "WBCS Biology & Human Physiology."
  },
  {
    "id": "space-feb-06-who-gtmc-portal-2026",
    "day": 19,
    "dateStr": "February 2026",
    "category": "space_science",
    "categoryLabel": "🚀 Global Traditional Medicine",
    "title": "WHO & Ministry of AYUSH Operationalize Global Traditional Medicine Evidence Repository",
    "titleBn": "হু (WHO) ও আয়ুশ মন্ত্রকের যৌথ উদ্যোগে বিশ্ব ঐতিহ্যবাহী চিকিৎসা গবেষণা পোর্টাল কার্যকর",
    "summary": "World Health Organization operationalized the digital evidence platform connected to the WHO Global Centre for Traditional Medicine (GCTM) in Jamnagar, Gujarat.",
    "summaryBn": "আয়ুর্বেদ ও ভেষজ চিকিৎসার বৈজ্ঞানিক গবেষণাপত্র এক ছাতার তলায় আনতে আন্তর্জাতিক পোর্টাল কার্যকর হলো।",
    "keyPoints": [
      "Aggregates over 1.2 million peer-reviewed clinical studies from 194 WHO member states.",
      "Focuses on evidence-based standardization of global phytomedicines."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: WHO GCTM Jamnagar",
      "points": [
        "WHO GCTM: World's 1st and only global outposted centre for traditional medicine, established in April 2022 in Jamnagar, Gujarat.",
        "WHO Director-General: Dr. Tedros Adhanom Ghebreyesus | HQ: Geneva, Switzerland."
      ]
    },
    "examRelevance": "WBCS Public Health & Medicine."
  },
  {
    "id": "space-feb-07-saf-biofuel-ncl-2026",
    "day": 26,
    "dateStr": "February 2026",
    "category": "space_science",
    "categoryLabel": "🚀 Green Aviation Biofuels",
    "title": "CSIR-NCL Pune Patents Single-Step Catalyst for Sustainable Aviation Fuel (SAF)",
    "titleBn": "সিএসআইআর-এনসিএল পুনের বিজ্ঞানীদের দ্বারা পরিবেশবান্ধব বিমান জ্বালানির নয়া অনুঘটক উদ্ভাবন",
    "summary": "National Chemical Laboratory (NCL) Pune developed a patented solid zeolite catalyst to convert used cooking oils and agricultural biomass into commercial aviation-grade jet biofuel.",
    "summaryBn": "রান্নার পোড়া তেল ও উদ্ভিজ্জ বর্জ্য থেকে বিমান চালানোর সবুজ জ্বালানি তৈরির প্রযুক্তি তৈরি হলো।",
    "keyPoints": [
      "Reduces aviation lifecycle greenhouse emissions by up to 80% compared to fossil aviation turbine fuel (ATF).",
      "Supports DGCA's mandate for 1% SAF blending in international flights under ICAO CORSIA."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Biofuel Generations & CSIR",
      "points": [
        "Biofuel Generations: 1st Gen (Edible food crops), 2nd Gen (Non-edible biomass/agricultural residue), 3rd Gen (Algae), 4th Gen (Genetically engineered microbes).",
        "National Policy on Biofuels 2018: Advanced target of 20% ethanol blending in petrol (E20) to 2025-26.",
        "CSIR (Council of Scientific and Industrial Research): Established 26 Sept 1942 | President: Prime Minister of India."
      ]
    },
    "examRelevance": "WBCS Science & Environment, UPSC Prelims."
  },
  {
    "id": "space-feb-08-semiconductor-atmp-2026",
    "day": 21,
    "dateStr": "February 2026",
    "category": "space_science",
    "categoryLabel": "🚀 Semiconductor Manufacturing",
    "title": "India Semiconductor Mission (ISM) Approves Advanced ATMP Packaging Facilities in Gujarat & Assam",
    "titleBn": "ভারত সেমিকন্ডাক্টর মিশনের অধীনে গুজরাট ও আসামে অত্যাধুনিক চিপ প্যাকেজিং কারখানা অনুমোদন",
    "summary": "Union Cabinet approved commercial semiconductor assembly, testing, and packaging (ATMP) units in Dholera and Sanand (Gujarat) and Morigaon (Assam) with total investment exceeding ₹1.25 Lakh Crore.",
    "summaryBn": "ভারতে বাণিজ্যিক মাইক্রোচিপ ও সেমিকন্ডাক্টর তৈরিতে মেগা বিনিয়োগ প্রকল্প অনুমোদন পেল।",
    "keyPoints": [
      "Tata Electronics partnering with Taiwan's Powerchip (PSMC) to build India's first commercial semiconductor fab in Dholera.",
      "Generates over 20,000 direct high-tech engineering jobs."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: India Semiconductor Mission (ISM)",
      "points": [
        "ISM Launched: Dec 2021 with ₹76,000 Crore incentive outlay under Digital India Corporation (MeitY).",
        "Silicon Valley of India: Bengaluru, Karnataka (hub of global semiconductor design houses)."
      ]
    },
    "examRelevance": "WBCS Industrial Economy & Electronics."
  },
  {
    "id": "space-feb-09-deep-ocean-mission-2026",
    "day": 17,
    "dateStr": "February 2026",
    "category": "space_science",
    "categoryLabel": "🚀 Oceanography & Blue Economy",
    "title": "Deep Ocean Mission: \"Matsya 6000\" Human Submersible Completes Shallow Water Harbor Trials",
    "titleBn": "ডিপ ওশান মিশন: ভারতের মানববাহী সাবমার্সিবল \"মৎস্য ৬০০০\"-এর সফল প্রাথমিক পরীক্ষা",
    "summary": "National Institute of Ocean Technology (NIOT) Chennai completed wet harbor trials for the 3-person submersible Matsya 6000 designed to dive 6,000 meters into the Indian Ocean.",
    "summaryBn": "ভারত মহাসাগরের ৬,০০০ মিটার গভীরে খনিজ ও জীববৈচিত্র্য গবেষণায় মানববাহী সাবমার্সিবলের প্রস্তুতি।",
    "keyPoints": [
      "Explores Polymetallic Nodules (containing Nickel, Cobalt, Copper, Manganese) in Central Indian Ocean Basin.",
      "Funded under Ministry of Earth Sciences (MoES) Deep Ocean Mission (outlay: ₹4,077 Crore)."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Deep Ocean Mission & NIOT",
      "points": [
        "NIOT (National Institute of Ocean Technology): Established in Nov 1993 in Chennai, Tamil Nadu under MoES.",
        "International Seabed Authority (ISA): HQ in Kingston, Jamaica (allocated 75,000 sq km area in Central Indian Ocean Basin to India for nodule exploration)."
      ]
    },
    "examRelevance": "WBCS Geography & Science (Oceanography)."
  },
  {
    "id": "space-feb-10-quantum-computing-sim-2026",
    "day": 25,
    "dateStr": "February 2026",
    "category": "space_science",
    "categoryLabel": "🚀 National Quantum Mission",
    "title": "National Quantum Mission (NQM) Deploys First Quantum Key Distribution (QKD) Testbed",
    "titleBn": "জাতীয় কোয়ান্টাম মিশনের অধীনে প্রথম কোয়ান্টাম ক্রিপ্টোগ্রাফি টেস্টবেড চালু",
    "summary": "Department of Science and Technology operationalized a 100-km quantum optical fiber link between DRDO and academic institutions, ensuring unbreakable quantum cryptographic security.",
    "summaryBn": "হ্যাকিং-মুক্ত ডেটা আদান-প্রদানে কোয়ান্টাম কি ডিস্ট্রিবিউশন প্রযুক্তির সফল বাস্তবায়ন।",
    "keyPoints": [
      "National Quantum Mission (NQM) approved with ₹6,003 Crore outlay (2023–2031).",
      "Aims to develop intermediate-scale 50–1000 physical qubit quantum computers."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Quantum Physics & National Quantum Mission",
      "points": [
        "Qubit (Quantum Bit): Basic unit of quantum information capable of existing in superposition states ($|0\\rangle$ and $|1\\rangle$).",
        "Quantum Entanglement: Phenomenon where quantum states of two particles remain interconnected regardless of distance (Nobel Prize in Physics 2022 to Aspect, Clauser, Zeilinger)."
      ]
    },
    "examRelevance": "WBCS Science & Technology (Quantum Computing)."
  },
  {
    "id": "appt-feb-01-city-union-bank-ceo-2026",
    "day": 20,
    "dateStr": "February 2026",
    "category": "appointments",
    "categoryLabel": "👤 Banking Appointments",
    "title": "R. Vijay Anandh Appointed as MD & CEO of City Union Bank with RBI Approval",
    "titleBn": "সিটি ইউনিয়ন ব্যাংকের নতুন এমডি ও সিইও হিসেবে আর বিজয় আনন্দের নিয়োগ অনুমোদিত",
    "summary": "Reserve Bank of India approved the appointment of R. Vijay Anandh to head City Union Bank effective from May 1, 2026.",
    "summaryBn": "শীর্ষ বেসরকারি ব্যাংকের নেতৃত্বে নতুন ব্যবস্থাপনা পরিচালক হিসেবে দায়িত্ব নিচ্ছেন আর বিজয় আনন্দ।",
    "keyPoints": [
      "Has over 3 decades of banking leadership experience in corporate treasury, risk management, and SME lending.",
      "Headquartered in Kumbakonam, Tamil Nadu."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Banking Regulation Act & Private Banks",
      "points": [
        "Banking Regulation Act, 1949: Passed on 10 March 1949 (Section 35B governs top bank appointments).",
        "Old Private Sector Banks: Banks established prior to 1968 nationalization (e.g., Federal Bank, City Union Bank, South Indian Bank, Karur Vysya Bank)."
      ]
    },
    "examRelevance": "WBCS Banking & Economy."
  },
  {
    "id": "appt-feb-02-aai-hr-director-2026",
    "day": 12,
    "dateStr": "February 2026",
    "category": "appointments",
    "categoryLabel": "👤 Civil Aviation PSUs",
    "title": "Nivedita Dubey Appointed as Director (Human Resources) of Airports Authority of India",
    "titleBn": "এয়ারপোর্টস অথরিটি অফ ইন্ডিয়া (AAI)-এর নতুন ডিরেক্টর (এইচআর) পদে নিবেদিতা দুবে",
    "summary": "Appointments Committee of the Cabinet (ACC) approved Nivedita Dubey as Director (HR) of AAI, managing national civil airport personnel and Air Traffic Management training.",
    "summaryBn": "বিমানবন্দর কর্তৃপক্ষের শীর্ষ মানবসম্পদ উন্নয়ন পদে নতুন নিয়োগ সম্পন্ন হলো।",
    "keyPoints": [
      "AAI operates 137 civil airports across India managing airspace navigation and radar surveillance.",
      "Oversees the Indian Aviation Academy (IAA) in New Delhi."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Airports Authority of India (AAI)",
      "points": [
        "Established: 1 April 1995 via AAI Act, 1994 (merged International Airports Authority and National Airports Authority) under Ministry of Civil Aviation | HQ: New Delhi.",
        "UDAN Scheme: Ude Desh ka Aam Naagrik (Regional Connectivity Scheme launched in 2016)."
      ]
    },
    "examRelevance": "WBPSC Miscellaneous & SSC CGL."
  },
  {
    "id": "appt-feb-03-cbic-reforms-2026",
    "day": 1,
    "dateStr": "February 2026",
    "category": "appointments",
    "categoryLabel": "👤 Revenue Leadership",
    "title": "Sanjay Kumar Agarwal Leads CBIC Nationwide Digital Customs & GST Analytics Drive",
    "titleBn": "সিবিআইসি (CBIC) চেয়ারম্যান সঞ্জয় কুমার আগরওয়ালের নেতৃত্বে দেশব্যাপী ডিজিটাল শুল্ক সংস্কার",
    "summary": "Chairman of Central Board of Indirect Taxes and Customs (CBIC) guided nationwide AI-based GST anti-evasion analytics and faceless customs clearance.",
    "summaryBn": "জিএসটি রাজস্ব বৃদ্ধি ও কর ফাঁকি রুখতে সিবিআইসি চেয়ারম্যানের নেতৃত্বে ডিজিটালাইজেশন জোরদার।",
    "keyPoints": [
      "Oversees gross monthly indirect tax collections averaging ₹1.75+ Lakh Crore.",
      "Supervises national risk management systems across sea and air ports."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Department of Revenue & Statutory Boards",
      "points": [
        "2 Statutory Revenue Boards under MoF: 1. CBDT (Direct Taxes), 2. CBIC (Indirect Taxes).",
        "Revenue Secretary: Administrative head of Department of Revenue in Ministry of Finance."
      ]
    },
    "examRelevance": "WBCS Fiscal Economy & Governance."
  },
  {
    "id": "appt-feb-04-csk-brand-ambassador-2026",
    "day": 8,
    "dateStr": "February 2026",
    "category": "appointments",
    "categoryLabel": "👤 Sports Ambassadorships",
    "title": "Katrina Kaif Appointed as Official Brand Ambassador of Chennai Super Kings (CSK)",
    "titleBn": "আইপিএল ফ্র্যাঞ্চাইজি চেন্নাই সুপার কিংসের ব্র্যান্ড অ্যাম্বাসেডর হলেন ক্যাটরিনা কাইফ",
    "summary": "5-time IPL champions Chennai Super Kings signed actor Katrina Kaif as official brand ambassador ahead of the 2026 T20 season.",
    "summaryBn": "চেন্নাই সুপার কিংসের প্রচার দূত হিসেবে ক্যাটরিনা কাইফের নাম ঘোষণা করা হলো।",
    "keyPoints": [
      "Partnership signed alongside Etihad Airways, principal sponsor of CSK.",
      "Aims to promote youth fitness and grassroots cricket fan engagement."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Indian Premier League (IPL) Milestones",
      "points": [
        "1st IPL Season: 2008 (won by Rajasthan Royals led by Shane Warne).",
        "Most IPL Titles: Chennai Super Kings (5 titles) and Mumbai Indians (5 titles).",
        "BCCI Established: December 1928 | HQ: Wankhede Stadium, Mumbai."
      ]
    },
    "examRelevance": "WBPSC Miscellaneous & Sports."
  },
  {
    "id": "appt-feb-05-un-human-rights-envoy-2026",
    "day": 15,
    "dateStr": "February 2026",
    "category": "appointments",
    "categoryLabel": "👤 Global Diplomatic Appointments",
    "title": "UN Human Rights Council Appoints New Independent Special Rapporteurs in Geneva",
    "titleBn": "জাতিসংঘ মানবাধিকার কাউন্সিলে নতুন স্বাধীন স্পেশাল র‍্যাপোর্টিয়ার নিয়োগ",
    "summary": "UNHRC confirmed mandates for global monitors examining climate displacement, digital privacy rights, and the right to food across Global South nations.",
    "summaryBn": "জেনেভায় অবস্থিত জাতিসংঘ মানবাধিকার কাউন্সিলে নতুন বিশেষ দূত নিয়োগ সম্পন্ন হলো।",
    "keyPoints": [
      "Special Rapporteurs serve in an independent, honorary capacity reporting to UN General Assembly.",
      "Focus on international humanitarian law in conflict zones."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: United Nations Human Rights Council (UNHRC)",
      "points": [
        "UNHRC Established: 15 March 2006 by UNGA Resolution 60/251 (replacing former Commission on Human Rights) | HQ: Geneva, Switzerland.",
        "Composition: 47 Member States elected by UNGA for 3-year staggered terms.",
        "Universal Declaration of Human Rights (UDHR): Adopted on 10 December 1948 in Paris (Human Rights Day)."
      ]
    },
    "examRelevance": "WBCS International Organizations, UPSC GS II."
  },
  {
    "id": "appt-feb-06-national-security-advisory-2026",
    "day": 18,
    "dateStr": "February 2026",
    "category": "appointments",
    "categoryLabel": "👤 National Strategic Defense",
    "title": "National Security Advisory Board (NSAB) Reconstituted with Domain Experts",
    "titleBn": "জাতীয় নিরাপত্তা উপদেষ্টা বোর্ড (NSAB) পুনর্গঠন সম্পন্ন",
    "summary": "Prime Minister's Office reconstituted the NSAB comprising retired diplomats, military commanders, and cyber-intelligence specialists to advise the National Security Council (NSC).",
    "summaryBn": "ভারতের জাতীয় নিরাপত্তা উপদেষ্টা বোর্ডে শীর্ষ সামরিক ও সাইবার বিশেষজ্ঞদের অন্তর্ভুক্ত করা হলো।",
    "keyPoints": [
      "Provides multi-disciplinary strategic inputs to National Security Advisor (NSA).",
      "Focus on maritime domain security, quantum cyber-defense, and semiconductor supply chains."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: National Security Council (NSC) of India",
      "points": [
        "NSC Established: 19 November 1998 by Atal Bihari Vajpayee government (following Pokhran-II tests).",
        "National Security Advisor (NSA): Principal advisor to Prime Minister on national security (1st NSA: Brajesh Mishra | Current NSA: Ajit Doval)."
      ]
    },
    "examRelevance": "WBCS Polity & National Security."
  },
  {
    "id": "appt-feb-07-dgca-safety-chief-2026",
    "day": 14,
    "dateStr": "February 2026",
    "category": "appointments",
    "categoryLabel": "👤 Civil Aviation Safety",
    "title": "DGCA Appoints Senior Flight Operations Inspectors for Commercial Fleet Expansion",
    "titleBn": "অসামরিক বিমান চলাচল নিয়ন্ত্রক সংস্থা (DGCA) দ্বারা নিরাপত্তা আধিকারিক নিয়োগ",
    "summary": "Directorate General of Civil Aviation strengthened oversight over 1,500+ commercial aircraft on order by Indian carriers (Air India and IndiGo).",
    "summaryBn": "ভারতের বিমান পরিবহন ক্ষেত্রের দ্রুত বৃদ্ধির সাথে সামঞ্জস্য রেখে নিরাপত্তা তদারকি জোরদার।",
    "keyPoints": [
      "Enforces strict airworthiness safety audits and pilot fatigue risk management systems.",
      "India represents the 3rd largest domestic aviation market in the world."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: DGCA & Civil Aviation Ministry",
      "points": [
        "DGCA: Statutory regulatory body under Aircraft (Amendment) Act, 2020 | HQ: New Delhi.",
        "BCAS (Bureau of Civil Aviation Security): Regulates civil aviation security in India (founded 1978 after Entebbe hijack)."
      ]
    },
    "examRelevance": "WBCS Governance & Aviation."
  },
  {
    "id": "appt-feb-08-wto-dispute-settlement-2026",
    "day": 26,
    "dateStr": "February 2026",
    "category": "appointments",
    "categoryLabel": "👤 Global Trade Bodies",
    "title": "WTO Appoints New Arbitrators Ahead of 14th Ministerial Conference (MC14)",
    "titleBn": "বিশ্ব বাণিজ্য সংস্থার (WTO) বিরোধ নিষ্পত্তি ট্রাইব্যুনালে নতুন বিচারক নিয়োগ",
    "summary": "World Trade Organization General Council in Geneva filled key arbitration panels to resolve cross-border subsidy and agricultural disputes.",
    "summaryBn": "বিশ্ব বাণিজ্য সংস্থায় আন্তর্জাতিক বাণিজ্য বিরোধ মেটাতে নতুন প্যানেল গঠিত হলো।",
    "keyPoints": [
      "India champions the permanent solution for public stockholding (PSH) for food security under Agreement on Agriculture (AoA).",
      "Led by WTO Director-General Dr. Ngozi Okonjo-Iweala."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: World Trade Organization (WTO)",
      "points": [
        "Established: 1 January 1995 under Marrakesh Agreement (replacing GATT 1947) | HQ: Geneva, Switzerland.",
        "164 Member Countries | Director-General: Dr. Ngozi Okonjo-Iweala (1st woman and 1st African DG)."
      ]
    },
    "examRelevance": "WBCS International Trade & Economy."
  },
  {
    "id": "appt-feb-09-fifa-referee-panel-2026",
    "day": 10,
    "dateStr": "February 2026",
    "category": "appointments",
    "categoryLabel": "👤 Sports Officiating",
    "title": "Indian Football Referees Inducted into FIFA International Panel for 2026",
    "titleBn": "২০২৬ সালের জন্য ফিফা আন্তর্জাতিক রেফারি প্যানেলে ভারতীয় রেফারিদের অন্তর্ভুক্তি",
    "summary": "All India Football Federation (AIFF) confirmed the selection of Indian referees and assistant referees on the FIFA International List for World Cup qualifying fixtures.",
    "summaryBn": "আন্তর্জাতিক ফুটবল ম্যাচে ম্যাচ পরিচালনার দায়িত্ব পেলেন ভারতীয় রেফারিরা।",
    "keyPoints": [
      "Includes Indian women referees accredited for AFC Women's Asian Cup matches.",
      "Reflects growing standards of Indian sports officiating."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: AIFF & Indian Football",
      "points": [
        "AIFF (All India Football Federation): Formed in 1937 at Darbhanga, Bihar; affiliated to FIFA in 1948 | HQ: Football House, Dwarka, New Delhi.",
        "Oldest Football Tournament in Asia: Durand Cup (1st held in 1888 in Shimla; 3rd oldest in the world; currently held in Kolkata)."
      ]
    },
    "examRelevance": "WBCS Sports & Football GK."
  },
  {
    "id": "appt-feb-10-unesco-heritage-panel-2026",
    "day": 23,
    "dateStr": "February 2026",
    "category": "appointments",
    "categoryLabel": "👤 World Heritage Committees",
    "title": "Indian Cultural Heritage Experts Nominated to UNESCO World Heritage Advisory Bureau",
    "titleBn": "ইউনেস্কো বিশ্ব ঐতিহ্য উপদেষ্টা প্যানেলে ভারতীয় সাংস্কৃতিক বিশেষজ্ঞদের অন্তর্ভুক্তি",
    "summary": "Archaeological Survey of India (ASI) scholars were appointed to evaluate tentative list dossiers for upcoming 2026 World Heritage Committee sessions.",
    "summaryBn": "বিশ্ব ঐতিহ্যের তালিকা প্রণয়নে ভারতীয় পুরাতত্ত্ব বিশেষজ্ঞদের দায়িত্ব প্রদান করা হলো।",
    "keyPoints": [
      "India currently has 42 UNESCO World Heritage Sites (34 Cultural, 7 Natural, 1 Mixed: Khangchendzonga).",
      "Recent additions from Bengal include Santiniketan (2023)."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: UNESCO World Heritage Sites in West Bengal",
      "points": [
        "2 World Heritage Sites in West Bengal: 1. Sundarbans National Park (Natural, 1987), 2. Santiniketan (Cultural, 2023 - Rabindranath Tagore's university town).",
        "UNESCO Intangible Cultural Heritage: Durga Puja in Kolkata (inscribed in Dec 2021)."
      ]
    },
    "examRelevance": "WBCS Art & Culture, WBPSC Miscellaneous."
  },
  {
    "id": "award-feb-01-filmfare-south-70-amaran",
    "day": 21,
    "dateStr": "21 February 2026",
    "category": "awards_persons",
    "categoryLabel": "🏆 Cinematic Honors",
    "title": "70th Filmfare Awards South: \"Amaran\" Wins 8 Major Trophies in Kochi",
    "titleBn": "৭০তম ফিল্মফেয়ার অ্যাওয়ার্ডস সাউথ: ৮টি পুরস্কার জিতে শীর্ষে \"অমরন\"",
    "summary": "The 70th edition celebrated cinematic excellence across South Indian cinema with biopic *Amaran* winning Best Film, Best Director, and acting honours.",
    "summaryBn": "কোচিতে অনুষ্ঠিত ফিল্মফেয়ার অনুষ্ঠানে দক্ষিণী সিনেমার শ্রেষ্ঠ সম্মাননা প্রদান করা হলো।",
    "keyPoints": [
      "Based on the life of Ashok Chakra awardee Major Mukund Varadarajan.",
      "Sivakarthikeyan and Sai Pallavi won top acting accolades."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Filmfare & National Film Awards",
      "points": [
        "1st Filmfare Awards: 1954 (originally named 'Clare Awards' after film critic Clare Mendonca).",
        "Dadasaheb Phalke Award: India's highest award in cinema (instituted in 1969; 1st recipient: Devika Rani)."
      ]
    },
    "examRelevance": "WBPSC Miscellaneous & Cinema GK."
  },
  {
    "id": "award-feb-02-prani-mitra-awards-2026",
    "day": 16,
    "dateStr": "February 2026",
    "category": "awards_persons",
    "categoryLabel": "🏆 Animal Welfare Honors",
    "title": "Animal Welfare Board of India (AWBI) Confers \"Prani Mitra\" & \"Jeev Daya\" Awards 2026",
    "titleBn": "ভারতীয় প্রাণী কল্যাণ বোর্ড দ্বারা \"প্রাণী মিত্র\" ও \"জীব দয়া\" জাতীয় পুরস্কার প্রদান",
    "summary": "Conferred in New Delhi recognizing exemplary humanitarian service in stray animal rescue, wildlife rehabilitation, and anti-cruelty shelters.",
    "summaryBn": "পশুপ্রেম ও বন্যপ্রাণী সুরক্ষায় নিঃস্বার্থ সেবার স্বীকৃতি হিসেবে জাতীয় সম্মাননা প্রদান।",
    "keyPoints": [
      "Presented under Prevention of Cruelty to Animals (PCA) Act, 1960.",
      "Awarded across individual, organizational, and veterinary science categories."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Animal Welfare Board of India (AWBI)",
      "points": [
        "AWBI Established: 1962 under Section 4 of PCA Act, 1960 (pioneered by humanitarian Rukmini Devi Arundale) | HQ: Ballabhgarh, Faridabad, Haryana (originally Chennai).",
        "Article 51A(g): Fundamental Duty to have compassion for living creatures."
      ]
    },
    "examRelevance": "WBCS Environment & Polity."
  },
  {
    "id": "award-feb-03-acm-india-awards-2026",
    "day": 14,
    "dateStr": "14 February 2026",
    "category": "awards_persons",
    "categoryLabel": "🏆 Computing Research Honors",
    "title": "ACM India Conferred Early Career Research & Doctoral Dissertation Awards at IIT Hyderabad",
    "titleBn": "আইআইটি হায়দ্রাবাদে এসিএম ইন্ডিয়া কম্পিউটার বিজ্ঞান গবেষণা পুরস্কার প্রদান",
    "summary": "Honoured young Indian computer scientists making breakthrough contributions in machine learning theory, distributed algorithms, and secure hardware architecture.",
    "summaryBn": "ভারতের তরুণ কম্পিউটার বিজ্ঞানীদের আন্তর্জাতিক মানের গবেষণার স্বীকৃতি প্রদান করা হলো।",
    "keyPoints": [
      "Carries cash prize of ₹15 Lakh and international conference travel grants.",
      "Promotes deep-tech entrepreneurship within Indian academia."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Turing Award & ACM",
      "points": [
        "Turing Award: \"Nobel Prize of Computing\" awarded annually by ACM since 1966 (named after Alan Turing).",
        "Only Indian-origin Turing Award Winner: Dr. Raj Reddy (1994 for pioneer work in Artificial Intelligence)."
      ]
    },
    "examRelevance": "WBCS Science & Technology."
  },
  {
    "id": "award-feb-04-republic-day-awards-2026",
    "day": 1,
    "dateStr": "01 February 2026",
    "category": "awards_persons",
    "categoryLabel": "🏆 Republic Day Parade Accolades",
    "title": "Ministry of Defence Declares Best Marching Contingents of Republic Day Parade 2026",
    "titleBn": "প্রজাতন্ত্র দিবস কুচকাওয়াজ ২০২৬: সেরা মার্চিং দল ও সেরা ট্যাবলো পুরস্কার ঘোষিত",
    "summary": "Official panel declared the Sikh Regiment as Best Tri-Services Marching Contingent and Delhi Police All-Women Contingent as Best CAPF Marching Contingent.",
    "summaryBn": "কর্তব্য পথে অনুষ্ঠিত প্রজাতন্ত্র দিবসের কুচকাওয়াজে সেরা দলগুলির তালিকা প্রকাশ করল প্রতিরক্ষা মন্ত্রক।",
    "keyPoints": [
      "Odisha Tableaux won 1st prize among states for depicting Raghurajpur heritage crafts and women artisans.",
      "Gujarat and Tamil Nadu secured 2nd and 3rd state positions."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Republic Day Parade Architecture",
      "points": [
        "Kartavya Path: Formerly Rajpath (Kingsway), inaugurated after redevelopment in Sept 2022.",
        "1st Republic Day Parade at Rajpath: 1955 (earlier held at Irwin Amphitheatre, Red Fort, Ramlila Maidan).",
        "Beating Retreat Ceremony: 29 January at Vijay Chowk."
      ]
    },
    "examRelevance": "WBCS Current Affairs & Police Exams."
  },
  {
    "id": "award-feb-05-grammy-2026-winners",
    "day": 1,
    "dateStr": "01 February 2026",
    "category": "awards_persons",
    "categoryLabel": "🏆 Global Music Accolades",
    "title": "68th Grammy Awards Honors Trailblazing Artists in Los Angeles",
    "titleBn": "৬৮তম গ্র্যামি পুরস্কার আসরে বিশ্বসেরা সংগীতশিল্পীদের সম্মাননা প্রদান",
    "summary": "The Recording Academy conferred gramophone trophies celebrating musical innovation, songwriting craftsmanship, and cultural fusion.",
    "summaryBn": "লস অ্যাঞ্জেলেসে বিশ্বসংগীতের মহারথীদের হাতে গ্র্যামি সম্মান তুলে দেওয়া হলো।",
    "keyPoints": [
      "Global Music category featured diverse international folk and fusion nominees.",
      "Recognized technical excellence in immersive spatial audio engineering."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Indian Grammy Winners in History",
      "points": [
        "Pandit Ravi Shankar: 5 Grammys (including Lifetime Achievement Grammy in 2013).",
        "A.R. Rahman: 2 Grammys in 2010 (*Jai Ho* & *Slumdog Millionaire*).",
        "Ricky Kej: 3 Grammys (2015, 2022, 2023 - *Winds of Samsara*, *Divine Tides*)."
      ]
    },
    "examRelevance": "WBCS Art & Culture, WBPSC Miscellaneous."
  },
  {
    "id": "award-feb-06-bafta-2026-winners",
    "day": 22,
    "dateStr": "22 February 2026",
    "category": "awards_persons",
    "categoryLabel": "🏆 British Film Honors",
    "title": "79th BAFTA Film Awards Honors Best in Global Cinematography & Storytelling",
    "titleBn": "৭৯তম বাফটা চলচ্চিত্র উৎসবে বিশ্ব সিনেমার শ্রেষ্ঠত্ব উদযাপন",
    "summary": "The British Academy honoured remarkable achievements across drama, direction, costume design, and original screenplay at Royal Festival Hall, London.",
    "summaryBn": "লন্ডনে আয়োজিত বাফটা অনুষ্ঠানে সেরা পরিচালক ও অভিনয়শিল্পীদের পুরস্কৃত করা হলো।",
    "keyPoints": [
      "Celebrated independent filmmakers from across the Commonwealth and Europe.",
      "Featured honorary fellowship presentation to iconic cinematic pioneers."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: BAFTA Awards",
      "points": [
        "Formed: 1947 in London.",
        "Mask Trophy: Designed by Mitzi Cunliffe."
      ]
    },
    "examRelevance": "WBPSC Miscellaneous."
  },
  {
    "id": "award-feb-07-national-science-awards-2026",
    "day": 28,
    "dateStr": "28 February 2026",
    "category": "awards_persons",
    "categoryLabel": "🏆 National Science Accolades",
    "title": "Rashtriya Vigyan Puraskar 2026 Citations Announced on National Science Day",
    "titleBn": "জাতীয় বিজ্ঞান দিবসে রাষ্ট্রীয় বিজ্ঞান পুরস্কার ২০২৬-এর তালিকা ঘোষণা",
    "summary": "Government announced the prestigious Vigyan Ratna, Vigyan Shri, Vigyan Yuva, and Vigyan Team awards honoring transformative contributions across physics, biotech, and engineering.",
    "summaryBn": "ভারতের বিজ্ঞানীদের সর্বোচ্চ রাষ্ট্রীয় স্বীকৃতি রাষ্ট্রীয় বিজ্ঞান পুরস্কারের প্রাপকদের নাম ঘোষিত হলো।",
    "keyPoints": [
      "Vigyan Ratna recognizes lifetime achievement in science and technology.",
      "Vigyan Yuva (Shanti Swarup Bhatnagar) recognizes exceptional young scientists under 45 years of age."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Rashtriya Vigyan Puraskar Architecture",
      "points": [
        "Instituted in 2023 by GoI to rationalize all national science awards into 4 unified categories.",
        "4 Categories: Vigyan Ratna (Lifetime), Vigyan Shri (Distinguished), Vigyan Yuva (Young Scientist), Vigyan Team (Group innovation)."
      ]
    },
    "examRelevance": "WBCS Science & Technology, UPSC GS III."
  },
  {
    "id": "award-feb-08-swachh-somnath-2026",
    "day": 25,
    "dateStr": "February 2026",
    "category": "awards_persons",
    "categoryLabel": "🏆 Cleanliness & Heritage Honors",
    "title": "Somnath Temple Wins National Swachh Iconic Place Cleanliness Award 2026",
    "titleBn": "সোমনাথ মন্দির জাতীয় স্বচ্ছ আইকনিক স্থান পরিচ্ছন্নতা পুরস্কার ২০২৬ লাভ করল",
    "summary": "Ministry of Jal Shakti honoured Somnath Temple Trust under Swachh Bharat Mission (Gramin) for zero-waste management, solar cooking, and green pilgrimage corridors.",
    "summaryBn": "পরিচ্ছন্নতা ও বর্জ্য ব্যবস্থাপনায় দেশের শ্রেষ্ঠ তীর্থক্ষেত্রের মর্যাদা পেল সোমনাথ মন্দির।",
    "keyPoints": [
      "Swachh Iconic Places is a joint initiative of Ministry of Jal Shakti, MoHUA, and Ministry of Tourism.",
      "Achieved 100% wastewater recycling and plastic-free prasad packaging."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Swachh Iconic Places of India",
      "points": [
        "Swachh Bharat Mission: Launched 2 October 2014.",
        "Other Swachh Iconic Places: Golden Temple (Amritsar), Meenakshi Temple (Madurai), Jagannath Temple (Puri), Belur Math (West Bengal), Kamakhya Temple (Guwahati)."
      ]
    },
    "examRelevance": "WBCS Environment & Governance."
  },
  {
    "id": "award-feb-09-sports-awards-bengal-2026",
    "day": 19,
    "dateStr": "February 2026",
    "category": "awards_persons",
    "categoryLabel": "🏆 Bengal Sports Recognitions",
    "title": "West Bengal Government Confers Annual \"Khel Samman\" & \"Kriraguru\" Awards 2026",
    "titleBn": "পশ্চিমবঙ্গ সরকার দ্বারা বার্ষিক \"খেল সম্মান\" ও \"ক্রীড়াগুরু\" পুরস্কার ২০২৬ প্রদান",
    "summary": "Department of Youth Services and Sports honoured veteran coaches, national medalists, and para-athletes from Bengal with cash grants and lifetime pensions.",
    "summaryBn": "কলকাতার নেতাজি ইন্ডোর স্টেডিয়ামে বাংলার কৃতী ক্রীড়াবিদ ও প্রবীণ কোচদের সম্মানিত করা হলো।",
    "keyPoints": [
      "Banglar Gourav and Kriraguru awards conferred on archers, gymnasts, and table tennis prodigies.",
      "Special felicitation for Santosh Trophy and National Games medal winners."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Sports Infrastructure in West Bengal",
      "points": [
        "Salt Lake Stadium (Vivekananda Yuba Bharati Krirangan): Kolkata (capacity: 68,000; 2nd largest stadium in India after Narendra Modi Stadium, Ahmedabad).",
        "Eden Gardens: Kolkata (established 1864; \"Mecca of Indian Cricket\")."
      ]
    },
    "examRelevance": "WBCS Bengal Sports & WBPSC Clerkship."
  },
  {
    "id": "award-feb-10-rotary-literacy-awards-2026",
    "day": 23,
    "dateStr": "February 2026",
    "category": "awards_persons",
    "categoryLabel": "🏆 Educational Philanthropy",
    "title": "National Literacy Mission Recognizes Grassroots Adult Literacy Volunteers",
    "titleBn": "জাতীয় সাক্ষরতা মিশনে নিরক্ষরতা দূরীকরণে বিশিষ্ট শিক্ষক ও স্বেচ্ছাসেবকদের সম্মাননা",
    "summary": "Ministry of Education presented awards under ULLAS (Understanding Lifelong Learning for All in Society) for achieving 100% foundational literacy in tribal gram panchayats.",
    "summaryBn": "সারাদেশে বয়স্ক শিক্ষা ও সাক্ষরতা প্রসারে নিবেদিতপ্রাণ শিক্ষকদের পুরস্কৃত করা হলো।",
    "keyPoints": [
      "ULLAS Nav Bharat Saksharta Karyakram aims to empower non-literates aged 15 and above with foundational literacy and numeracy (FLN).",
      "Uses DIKSHA portal and volunteer mobile applications."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Literacy in India (Census 2011)",
      "points": [
        "Overall Literacy Rate of India (2011): 74.04% (Male: 82.14%, Female: 65.46%).",
        "State with Highest Literacy: Kerala (94.00%) | Lowest Literacy: Bihar (61.80%).",
        "Literacy Rate of West Bengal (2011): 76.26% (above national average)."
      ]
    },
    "examRelevance": "WBCS Census & Demography (Mains Paper IV)."
  },
  {
    "id": "award-feb-11-cbrn-innovator-award-2026",
    "day": 27,
    "dateStr": "27 February 2026",
    "category": "awards_persons",
    "categoryLabel": "🏆 Defense Science Innovators",
    "title": "DRDO Confers CBRN Defense Innovation Citations to DRDE Gwalior Scientists",
    "titleBn": "ডিআরডিও দ্বারা সিবিআরএন প্রতিরক্ষা উদ্ভাবনী পুরস্কার প্রদান",
    "summary": "Presented at the conclusion of CBRN Conclave in New Delhi for indigenous development of advanced nerve agent detectors and high-efficiency chemical filters.",
    "summaryBn": "রাসায়নিক ও জৈব সুরক্ষা যন্ত্র উদ্ভাবনে ডিআরডিও বিজ্ঞানীদের পুরস্কৃত করা হলো।",
    "keyPoints": [
      "Recognized patented microfluidic bio-sensor chips that identify pathogens in under 15 minutes.",
      "Exported protective suits to friendly foreign nations."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Chemical & Biological Weapons Conventions",
      "points": [
        "CWC (Chemical Weapons Convention): Signed 1993; entered into force 1997 | Administered by OPCW in The Hague (Nobel Peace Prize 2013).",
        "BWC (Biological Weapons Convention): Opened for signature 1972; entered into force 1975."
      ]
    },
    "examRelevance": "WBCS Defense & International Treaties."
  },
  {
    "id": "award-feb-12-ieee-jc-bose-milestone-2026",
    "day": 28,
    "dateStr": "February 2026",
    "category": "awards_persons",
    "categoryLabel": "🏆 Historical Science Milestones",
    "title": "IEEE Milestone Plaque Installed at Presidency University Kolkata for Acharya J.C. Bose",
    "titleBn": "বিজ্ঞানী আচার্য জগদীশ চন্দ্র বসুর গবেষণার স্মরণে প্রেসিডেন্সি বিশ্ববিদ্যালয়ে আইইইই ঐতিহাসিক ফলক উন্মোচন",
    "summary": "Institute of Electrical and Electronics Engineers unveiled its prestigious global IEEE Milestone citation in Kolkata honoring J.C. Bose's pioneer 1895 millimetre-wave wireless experiments.",
    "summaryBn": "কলকাতায় জগদীশ চন্দ্র বসুর তারবিহীন মাইক্রোওয়েভ তরঙ্গের ঐতিহাসিক পরীক্ষার আন্তর্জাতিক স্বীকৃতি।",
    "keyPoints": [
      "Recognizes Bose's historic demonstration of 60 GHz millimetre waves to ring a bell remotely without wires at Kolkata Town Hall (1895).",
      "Foundational to modern Wi-Fi, radar horns, and 5G/6G millimeter wireless systems."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Acharya Jagadish Chandra Bose (1858–1937)",
      "points": [
        "Born: 30 Nov 1858 in Munshiganj (Bengal Presidency) | Educated: St. Xavier's College, Kolkata & Cambridge University.",
        "Crescograph: Invented by J.C. Bose to measure microscopic responses in plants, demonstrating plant irritability.",
        "Bose Institute (বসু বিজ্ঞান মন্দির): Founded on 30 Nov 1917 in Kolkata."
      ]
    },
    "examRelevance": "WBCS Bengal Scientific Heritage & Modern History."
  },
  {
    "id": "book-feb-01-viksit-bharat-strategy",
    "day": 10,
    "dateStr": "February 2026",
    "category": "books",
    "categoryLabel": "📚 Economic Strategy & Development",
    "title": "\"Viksit Bharat 2047: Strategic Roadmap for a Developed Nation\" by NITI Aayog Economists",
    "titleBn": "নীতি আয়োগের গবেষক দল রচিত গ্রন্থ \"বিকশিত ভারত ২০৪৭: রূপরেখা ও কর্মপরিকল্পনা\"",
    "summary": "Comprehensive economic policy treatise outlining the structural transition pathways for India to achieve a $30 Trillion GDP with high human development indices by 2047.",
    "summaryBn": "ভারতের শতবর্ষে উন্নত দেশ হিসেবে আত্মপ্রকাশের অর্থনৈতিক রূপরেখা নিয়ে নীতি আয়োগের নতুন বই।",
    "keyPoints": [
      "Analyzes demographic dividends, industrial automation, green hydrogen export hubs, and female labor force participation.",
      "Foreword by NITI Aayog Vice-Chairman Suman Bery."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: NITI Aayog & 2047 Goals",
      "points": [
        "NITI Aayog (National Institution for Transforming India): Formed on 1 January 2015 via Cabinet Resolution (replacing Planning Commission).",
        "Chairperson: Prime Minister of India | Current CEO: B.V.R. Subrahmanyam."
      ]
    },
    "examRelevance": "WBCS Economy & Books."
  },
  {
    "id": "book-feb-02-dabur-140-years-2026",
    "day": 14,
    "dateStr": "February 2026",
    "category": "books",
    "categoryLabel": "📚 Corporate History of Bengal",
    "title": "\"Dabur: 140 Years of Natural Care\" Authored by Rajiv Agarwal",
    "titleBn": "রাজীব আগরওয়ালের বই \"ডাবর: ১৪০ ইয়ার্স অফ ন্যাচারাল কেয়ার\"",
    "summary": "Business history documenting how Dr. S.K. Burman started Dabur in 1884 from a small apothecary clinic in Kolkata to become a global ayurvedic FMCG titan.",
    "summaryBn": "কলকাতার মাটি থেকে ১৮৮৪ সালে ডঃ এস কে বর্মনের হাত ধরে শুরু হওয়া ডাবরের বিশ্বজয়ের ইতিহাস।",
    "keyPoints": [
      "Published by Penguin Random House India.",
      "Explores the transition of traditional Ayurvedic remedies (Chyawanprash, Pudin Hara) into modern clinical FMCG products."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Swadeshi Enterprises in Bengal",
      "points": [
        "Bengal Chemical & Pharmaceutical Works: Founded in 1892 in Kolkata by Acharya Prafulla Chandra Ray (father of Indian chemistry).",
        "Bengal Immunity: Founded in 1919 by Dr. Bidhan Chandra Roy (legendary BC Roy).",
        "Dabur Inception: 1884 in Calcutta (Daktar Burman -> Dabur)."
      ]
    },
    "examRelevance": "WBCS Bengal History & Industrial Heritage."
  },
  {
    "id": "book-feb-03-art-of-bitfulness-2026",
    "day": 18,
    "dateStr": "February 2026",
    "category": "books",
    "categoryLabel": "📚 Digital Technology & Mindfulness",
    "title": "\"The Art of Bitfulness: Keeping Sane in the Digital World\" by Nandan Nilekani & Tanuj Bhojwani",
    "titleBn": "নন্দন নিলেকানি ও তনুজ ভোজওয়ানির বই \"দ্য আর্ট অফ বিটফুলনেস\"",
    "summary": "Strategic guide on maintaining cognitive agency, privacy, and focus in an era of hyper-connected algorithms, social media addiction, and smartphone fatigue.",
    "summaryBn": "ডিজিটাল যুগে মানসিক স্থৈর্য ও প্রযুক্তির সঠিক ব্যবহার নিয়ে ইনফোসিস সহ-প্রতিষ্ঠাতার বিশ্লেষণ।",
    "keyPoints": [
      "Published by Penguin Portfolio.",
      "Proposes architectural balance between public digital infrastructure and personal cognitive wellbeing."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Nandan Nilekani & Aadhaar (UIDAI)",
      "points": [
        "UIDAI (Unique Identification Authority of India): Founded in Jan 2009 under Planning Commission; statutory status via Aadhaar Act, 2016.",
        "1st Chairman of UIDAI: Nandan Nilekani (2009–2014).",
        "1st Aadhaar Card Issued: 29 Sept 2010 to Ranjana Sonawane of Tembhli village, Nandurbar, Maharashtra."
      ]
    },
    "examRelevance": "WBCS Digital Governance & Books."
  },
  {
    "id": "book-feb-04-swallowing-the-sun-2026",
    "day": 8,
    "dateStr": "February 2026",
    "category": "books",
    "categoryLabel": "📚 Historical Fiction & Partition",
    "title": "\"Swallowing the Sun\" Authored by Ambassador Lakshmi Murdeshwar Puri",
    "titleBn": "প্রাক্তন সহকারী জাতিসংঘ মহাসচিব লক্ষ্মী পুরীর উপন্যাস \"সোয়ালোয়িং দ্য সান\"",
    "summary": "Debut novel by former UN Assistant Secretary-General Lakshmi Puri exploring women's agency, Gandhian freedom struggle, and cultural renaissance in Maharashtra.",
    "summaryBn": "ভারতের স্বাধীনতা সংগ্রাম ও নারী জাগরণের পটভূমিতে রচিত উচ্চ প্রশংসিত উপন্যাস।",
    "keyPoints": [
      "Launched in New Delhi in the presence of Union Ministers and literary luminaries.",
      "Inspired by the life of the author's mother and pioneer female educators."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Pioneer Women in India's Freedom Movement",
      "points": [
        "Matangini Hazra (Gandhi Buri): 72-year-old freedom fighter martyred during Quit India movement on 29 Sept 1942 at Tamluk, West Bengal.",
        "Pritilata Waddedar: Revolutionary who led the attack on Pahartali European Club in Chittagong (1932) with Masterda Surya Sen.",
        "Aruna Asaf Ali: \"Grand Old Lady of the Independence Movement\" (hoisted Indian flag at Gowalia Tank Maidan on 9 Aug 1942)."
      ]
    },
    "examRelevance": "WBCS INM & Books and Authors."
  },
  {
    "id": "book-feb-05-ai-future-work-2026",
    "day": 22,
    "dateStr": "February 2026",
    "category": "books",
    "categoryLabel": "📚 Economic Policy & Automation",
    "title": "\"AI and the Future of Work in India\" Authored by Dr. Rajiv Kumar",
    "titleBn": "নীতি আয়োগের প্রাক্তন ভাইস চেয়ারম্যান ডঃ রাজীব কুমারের বই \"এআই অ্যান্ড দ্য ফিউচার অফ ওয়ার্ক ইন ইন্ডিয়া\"",
    "summary": "Former Vice Chairman of NITI Aayog analyzes how artificial intelligence, robotics, and cloud compute will transform India's 500-million strong workforce.",
    "summaryBn": "ভারতে কর্মসংস্থান ও প্রযুক্তি বিপ্লবের ভারসাম্য রক্ষার নীতি নির্ধারণ নিয়ে বিশদ সমীক্ষা।",
    "keyPoints": [
      "Outlines transition strategies for upskilling youth in deep tech while safeguarding labor-intensive manufacturing.",
      "Published by Oxford University Press."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: NITI Aayog Leadership Chronology",
      "points": [
        "Vice-Chairmen of NITI Aayog: 1. Dr. Arvind Panagariya (2015–2017), 2. Dr. Rajiv Kumar (2017–2022), 3. Suman Bery (2022–present).",
        "Current CEO of NITI Aayog: B.V.R. Subrahmanyam."
      ]
    },
    "examRelevance": "WBCS Economy & Books."
  },
  {
    "id": "book-feb-06-basic-structure-2026",
    "day": 12,
    "dateStr": "February 2026",
    "category": "books",
    "categoryLabel": "📚 Constitutional Jurisprudence",
    "title": "\"Basic Structure and Republic\" Authored by Goa Governor P.S. Sreedharan Pillai",
    "titleBn": "গোয়ার রাজ্যপাল পি এস শ্রীধরন পিল্লাই রচিত গ্রন্থ \"বেসিক স্ট্রাকচার অ্যান্ড রিপাবলিক\"",
    "summary": "Legal analysis examining the historic 1973 Kesavananda Bharati verdict, constitutional supremacy, and checks and balances in Indian democracy.",
    "summaryBn": "সংবিধানের মৌলিক কাঠামো তত্ত্বের প্রেক্ষাপটে রচিত সাংবিধানিক গ্রন্থ।",
    "keyPoints": [
      "Released by Cardinal Baselios Cleemis and High Court judges at Panaji.",
      "Discusses the evolution of judicial review under Article 32 and Article 226."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Kesavananda Bharati Case (1973)",
      "points": [
        "Kesavananda Bharati v. State of Kerala (24 April 1973): Largest Constitution Bench in Supreme Court history (13 Judges; 7-6 verdict).",
        "Basic Structure Doctrine: Parliament can amend any part of the Constitution under Article 368 including Fundamental Rights, but cannot alter its \"Basic Structure\".",
        "Elements: Supremacy of Constitution, Republican & Democratic form, Secularism, Separation of Powers, Judicial Review, Rule of Law."
      ]
    },
    "examRelevance": "WBCS Mains Paper V (Constitution Core Topic)."
  },
  {
    "id": "book-feb-07-kashmir-travels-2026",
    "day": 19,
    "dateStr": "February 2026",
    "category": "books",
    "categoryLabel": "📚 Himalayan Geography & Travel",
    "title": "\"Kashmir: Travels in Paradise on Earth\" by Romesh Bhattacharji",
    "titleBn": "রমেশ ভট্টাচার্জির বই \"কাশ্মীর: ট্রাভেলস ইন প্যারাডাইস অন আর্থ\"",
    "summary": "Illustrated travelogue detailing six decades of mountaineering, trekking remote high-altitude passes, and exploring pastoral valleys of Kashmir and Ladakh.",
    "summaryBn": "কাশ্মীর ও লাদাখের দুর্গম গিরিপথ ও উপত্যকা নিয়ে প্রবীণ পর্বতারোহীর বিবরণ।",
    "keyPoints": [
      "Published by HarperCollins India.",
      "Features maps and archival photographs of Gurez, Zanskar, Warwan, and Kishtwar valleys."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Kashmir Physical Geography",
      "points": [
        "Vale of Kashmir: Structural basin situated between Great Himalayas and Pir Panjal Range, drained by Jhelum River.",
        "Karewas (কাজেওয়া): Lacustrine deposits in Kashmir Valley famous for Zafran (Saffron - GI Tag) cultivation.",
        "Major Lakes: Dal Lake, Wular Lake (largest freshwater lake in India on Jhelum River), Manasbal Lake (deepest lake in India)."
      ]
    },
    "examRelevance": "WBCS Geography (Himalayas & Landforms)."
  },
  {
    "id": "book-feb-08-between-hope-history-2026",
    "day": 25,
    "dateStr": "February 2026",
    "category": "books",
    "categoryLabel": "📚 Governance & Public Audit",
    "title": "\"Between Hope and History: The Making of Contemporary India\" by Former CAG Vinod Rai",
    "titleBn": "ভারতের প্রাক্তন সিএজি (CAG) বিনোদ রায়ের গ্রন্থ \"বিটুইন হোপ অ্যান্ড হিস্ট্রি\"",
    "summary": "Reflective memoirs by former Comptroller and Auditor General Vinod Rai detailing constitutional accountability, civil service integrity, and statecraft.",
    "summaryBn": "প্রশাসনিক সততা ও স্বাধীন অডিট ব্যবস্থার উপর রচিত প্রাক্তন সিএজি-র নতুন বই।",
    "keyPoints": [
      "Published by Rupa Publications.",
      "Chronicles landmark public audits, banking governance reforms, and public service ethics."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Comptroller and Auditor General of India (CAG)",
      "points": [
        "Article 148: CAG appointed by President of India (\"Guardian of the Public Purse\").",
        "Article 149: Duties and Powers of CAG | Article 151: Audit reports submitted to President/Governor.",
        "1st CAG of Independent India: V. Narahari Rao (1948–1954).",
        "Tenure: 6 years or up to 65 years of age (whichever is earlier)."
      ]
    },
    "examRelevance": "WBCS Indian Polity (Constitutional Bodies)."
  },
  {
    "id": "sport-feb-01-winter-olympics-milano-2026",
    "day": 6,
    "dateStr": "06–22 February 2026",
    "category": "sports",
    "categoryLabel": "⚽ Winter Olympic Games",
    "title": "Milano Cortina 2026 Winter Olympics Concludes: Norway & Germany Lead Medal Table",
    "titleBn": "মিলান কর্টিনা ২০২৬ শীতকালীন অলিম্পিক সম্পন্ন: পদক তালিকায় শীর্ষস্থান দখল করল নরওয়ে",
    "summary": "The XXV Olympic Winter Games concluded across Milan and Cortina d'Ampezzo, Italy with 2,900+ athletes competing across 116 winter sports disciplines.",
    "summaryBn": "ইতালিতে আয়োজিত শীতকালীন অলিম্পিকসে বরফ ও স্কি প্রতিযোগিতায় বিশ্বরেকর্ড স্থাপিত হলো।",
    "keyPoints": [
      "Ski mountaineering debuted with individual sprint and mixed relay events.",
      "Closing ceremony held at the historic Roman amphitheater Arena di Verona."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Winter Olympics & Indian Olympians",
      "points": [
        "1st Indian to compete in Winter Olympics: Jeremy Bujakowski (1964 Innsbruck, Alpine Skiing).",
        "Shiva Keshavan: 6-time Winter Olympian representing India in Luge (1998 to 2018; Asian Champion).",
        "Next Winter Olympics (2030): French Alps."
      ]
    },
    "examRelevance": "WBCS Sports, International Events & WBPSC Miscellaneous."
  },
  {
    "id": "sport-feb-02-icc-t20-world-cup-opener-2026",
    "day": 7,
    "dateStr": "07 February 2026",
    "category": "sports",
    "categoryLabel": "⚽ T20 World Cup Cricket",
    "title": "2026 ICC Men's T20 World Cup Inaugurated: 20 Nations Clash Across India & Sri Lanka",
    "titleBn": "২০২৬ আইসিসি পুরুষ টি-টোয়েন্টি বিশ্বকাপের সূচনা: ভারত ও শ্রীলঙ্কায় ২০টি দলের মহারণ",
    "summary": "The 20-team international cricket extravaganza got underway with high-voltage fixtures in Kolkata, Mumbai, Colombo, and Kandy.",
    "summaryBn": "ইডেন গার্ডেন্স ও ওয়াংখেড়ে স্টেডিয়ামে বিশ্ব টি-টোয়েন্টি চ্যাম্পিয়নশিপের খেলা শুরু হলো।",
    "keyPoints": [
      "Defending champions India commenced title defense on home soil.",
      "Features 4 groups of 5 teams each progressing to Super 8 stage."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: T20 World Cup Venues & Records",
      "points": [
        "Eden Gardens Kolkata: Hosted 2016 T20 World Cup Final (West Indies champions vs England - Carlos Brathwaite 4 sixes).",
        "Narendra Modi Stadium Ahmedabad: World's largest cricket stadium (capacity: 132,000).",
        "Highest Team Total in Men's T20I: Nepal (314/3 vs Mongolia, 2023 Asian Games)."
      ]
    },
    "examRelevance": "WBP SI, Kolkata Police, Food SI, WBCS."
  },
  {
    "id": "sport-feb-03-asian-shooting-champ-2026",
    "day": 14,
    "dateStr": "02–14 February 2026",
    "category": "sports",
    "categoryLabel": "⚽ Asian Shooting Championships",
    "title": "Asian Rifle/Pistol Championship 2026: India Finishes on Top of the Medal Standings",
    "titleBn": "এশিয়ান রাইফেল ও পিস্তল চ্যাম্পিয়নশিপ ২০২৬: ভারত পদক তালিকায় প্রথম স্থান লাভ করল",
    "summary": "Indian shooters dominated the continental championships bagging multiple Gold and Silver medals across 10m Air Pistol, 10m Air Rifle, and 50m 3P events.",
    "summaryBn": "আন্তর্জাতিক শ্যুটিংয়ে ভারতীয় প্রতিভাদের চমকপ্রদ পারফরম্যান্স অব্যাহত।",
    "keyPoints": [
      "Clean sweeps recorded in junior women's 10m Air Pistol and mixed team air rifle.",
      "Secured maximum quota ranking points for international ISSF World Cup circuits."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: National Rifle Association of India (NRAI)",
      "points": [
        "NRAI Founded: 1951 by 1st Lok Sabha Speaker G.V. Mavalankar | HQ: New Delhi.",
        "Karni Singh Shooting Range: Premier international shooting range located in Tughlakabad, New Delhi."
      ]
    },
    "examRelevance": "WBCS Sports & Shooting GK."
  },
  {
    "id": "sport-feb-04-davis-cup-qualifiers-2026",
    "day": 8,
    "dateStr": "07–08 February 2026",
    "category": "sports",
    "categoryLabel": "⚽ International Tennis",
    "title": "Davis Cup Qualifiers 2026: High-Octane World Group Playoff Ties Conclude",
    "titleBn": "ডেভিস কাপ কোয়ালিফায়ার্স ২০২৬: বিশ্ব গ্রুপ প্লে-অফ ম্যাচ সম্পন্ন",
    "summary": "Top national men's tennis squads competed in best-of-five rubber ties across indoor hard and clay courts to secure final round berths.",
    "summaryBn": "বিশ্বকাপ অব টেনিস খ্যাত ডেভিস কাপের প্লে-অফ পর্ব সফলভাবে অনুষ্ঠিত হলো।",
    "keyPoints": [
      "Matches featured high-stakes doubles rubbers deciding knockout progressions.",
      "Showcased emerging next-gen ATP tour stars."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Indian Tennis Legends in Davis Cup",
      "points": [
        "India in Davis Cup Finals: India reached Davis Cup Final 3 times (1966 vs Australia, 1974 forfeited against South Africa in anti-apartheid protest, 1987 vs Sweden).",
        "Leander Paes: Holds world record for most Davis Cup doubles wins (45 wins) | 18 Grand Slam titles (8 Doubles, 10 Mixed)."
      ]
    },
    "examRelevance": "WBCS Sports & Tennis Milestones."
  },
  {
    "id": "sport-feb-05-super-bowl-2026",
    "day": 8,
    "dateStr": "08 February 2026",
    "category": "sports",
    "categoryLabel": "⚽ American Football",
    "title": "Super Bowl LX Concludes: Global Viewership Sets New Broadcast Records",
    "titleBn": "সুপার বোল ৬০: বিশ্বজুড়ে কোটি কোটি দর্শকের উপস্থিতিতে মেগা ফাইনাল অনুষ্ঠিত",
    "summary": "The National Football League (NFL) championship game delivered thrilling gridiron action and high-tech entertainment spectacle.",
    "summaryBn": "আমেরিকান ফুটবলের সবচেয়ে বড় ক্রীড়া আসর সুপার বোল সম্পন্ন হলো।",
    "keyPoints": [
      "Broadcast live in over 180 countries with innovative ultra-low-latency streaming.",
      "Vince Lombardi Trophy awarded to championship winners."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Super Bowl & NFL",
      "points": [
        "Vince Lombardi Trophy: Awarded annually to Super Bowl champion (handcrafted by Tiffany & Co. in sterling silver).",
        "Most Super Bowl Titles: Pittsburgh Steelers (6 titles) and New England Patriots (6 titles)."
      ]
    },
    "examRelevance": "WBPSC Miscellaneous."
  },
  {
    "id": "sport-feb-06-khelo-india-winter-2026",
    "day": 25,
    "dateStr": "February 2026",
    "category": "sports",
    "categoryLabel": "⚽ National Winter Sports",
    "title": "Khelo India Winter Games Concludes: Indian Army & Services Dominate in Gulmarg",
    "titleBn": "খেলো ইন্ডিয়া উইন্টার গেমস ২০২৬: গুলমার্গে ভারতীয় সেনা দলের পদক আধিপত্য",
    "summary": "Organized in Leh (Ladakh) for ice skating and ice hockey, and Gulmarg (J&K) for alpine skiing and snowboarding with Indian Army winning top honors.",
    "summaryBn": "লাদাখ ও কাশ্মীরের বরফে অনুষ্ঠিত শীতকালীন খেলো ইন্ডিয়া গেমসে ভারতীয় সেনা দল চ্যাম্পিয়ন হলো।",
    "keyPoints": [
      "Official Mascot: \"Sheen-e-Shi\" (Snow Leopard).",
      "Over 800 athletes participated across 6 winter sports disciplines."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Gulmarg & High-Altitude Warfare School",
      "points": [
        "High Altitude Warfare School (HAWS): Premier winter warfare training institute of Indian Army located in Gulmarg, J&K (est. 1948).",
        "Gulmarg Gondola: One of the highest cable cars in the world reaching 3,980 meters at Kongdoori-Apharwat peak."
      ]
    },
    "examRelevance": "WBCS Sports, Police SI, Food SI."
  },
  {
    "id": "sport-feb-07-alwar-half-marathon-2026",
    "day": 8,
    "dateStr": "08 February 2026",
    "category": "sports",
    "categoryLabel": "⚽ Road Running & Conservation",
    "title": "Alwar Tiger International Half Marathon 2026: Elite Kenyan & Indian Runners Triumph",
    "titleBn": "আলওয়ার টাইগার আন্তর্জাতিক হাফ ম্যারাথনে কেনিয়া ও ভারতীয় দৌড়বিদদের সাফল্য",
    "summary": "21.1 km international half-marathon organized along the scenic periphery of Sariska Tiger Reserve to champion tiger conservation.",
    "summaryBn": "সারিস্কা অরণ্যের কোল ঘেঁষে অনুষ্ঠিত আন্তর্জাতিক দূরপাল্লার দৌড়ে দেশি-বিদেশি অ্যাথলেটদের অংশগ্রহণ।",
    "keyPoints": [
      "Winner completed course in 1 hour 03 minutes.",
      "Featured mass citizen runs for wildlife corridor protection."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Marathon Standard Distances",
      "points": [
        "Full Marathon Distance: 42.195 km (26 miles 385 yards - standardized at 1908 London Olympics).",
        "Half Marathon Distance: 21.0975 km (13.1 miles).",
        "Historic Origin: Pheidippides running from Marathon to Athens in 490 BC."
      ]
    },
    "examRelevance": "WBPSC Miscellaneous & Sports."
  },
  {
    "id": "sport-feb-08-santosh-trophy-2026",
    "day": 20,
    "dateStr": "February 2026",
    "category": "sports",
    "categoryLabel": "⚽ National Football Championship",
    "title": "79th National Football Championship for Santosh Trophy Final Rounds Kick Off",
    "titleBn": "৭৯তম জাতীয় ফুটবল প্রতিযোগিতা সন্তোষ ট্রফির চূড়ান্ত পর্বের সূচনা",
    "summary": "Premier state teams including 32-time champions West Bengal, Kerala, Services, and Goa battled in the final group stage for the prestigious Santosh Trophy.",
    "summaryBn": "ভারতীয় ফুটবলের ঐতিহ্যবাহী সন্তোষ ট্রফির মূল পর্বে বাংলার দলের খেতাব দখলের অভিযান।",
    "keyPoints": [
      "West Bengal is the most successful team in Santosh Trophy history (32 titles).",
      "Format features 12 teams divided into two groups of six."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Santosh Trophy History",
      "points": [
        "Instituted: 1941 by Indian Football Association (IFA) Bengal, named after Maharaja Sir Manmatha Nath Roy Chowdhury of Santosh (now in Bangladesh).",
        "Runners-up Trophy: Kamla Gupta Trophy (donated by Dr. S.K. Gupta).",
        "Most Titles: West Bengal (32 times), 2nd: Punjab (8 times), 3rd: Services (7 times)."
      ]
    },
    "examRelevance": "WBCS Bengal Sports & Indian Football."
  },
  {
    "id": "sport-feb-09-fifa-world-cup-2026-schedule",
    "day": 4,
    "dateStr": "February 2026",
    "category": "sports",
    "categoryLabel": "⚽ FIFA World Cup 2026",
    "title": "FIFA Confirms Match Schedules for 48-Team FIFA World Cup 2026 in USA, Canada & Mexico",
    "titleBn": "২০২৬ ফিফা বিশ্বকাপের সম্পূর্ণ ম্যাচের সময়সূচি নিশ্চিত করল ফিফা",
    "summary": "FIFA finalized the historic 104-match schedule across 16 host cities, with the opening fixture at Estadio Azteca (Mexico City) and Final at MetLife Stadium (New Jersey).",
    "summaryBn": "উত্তর আমেরিকার তিন দেশে অনুষ্ঠিতব্য ৪৮ দলের বিশ্বকাপ ফুটবলের ক্রীড়াসূচি চূড়ান্ত।",
    "keyPoints": [
      "First World Cup featuring 48 national teams and 12 groups of 4.",
      "Final will be played on 19 July 2026."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: FIFA World Cup History",
      "points": [
        "1st FIFA World Cup: 1930 in Uruguay (Uruguay champions).",
        "Estadio Azteca: First stadium to host matches in 3 separate World Cups (1970, 1986, 2026).",
        "Most FIFA World Cup Titles: Brazil (5 titles - 1958, 1962, 1970, 1994, 2002)."
      ]
    },
    "examRelevance": "Guaranteed question in all 2026 WBPSC & Police exams."
  },
  {
    "id": "sport-feb-10-national-squash-ghosal-2026",
    "day": 12,
    "dateStr": "February 2026",
    "category": "sports",
    "categoryLabel": "⚽ National Squash Championships",
    "title": "Kolkata's Saurav Ghosal Extends Legacy with Record National Squash Performances",
    "titleBn": "জাতীয় স্কোয়াশ প্রতিযোগিতায় কলকাতার সৌরভ ঘোষালের অনবদ্য পারফরম্যান্স",
    "summary": "India's veteran squash champion Saurav Ghosal of West Bengal continued his historic run on the national and PSA world tour circuits.",
    "summaryBn": "জাতীয় ও আন্তর্জাতিক স্কোয়াশ সার্কিটে বাংলার গৌরব সৌরভ ঘোষালের সাফল্য অব্যাহত।",
    "keyPoints": [
      "Most decorated Indian squash athlete in Asian Games history (Gold in Team 2014 & 2023, Bronze in Singles 2022).",
      "Alumnus of St. Xavier's Collegiate School, Kolkata."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Squash in Olympics & SRFI",
      "points": [
        "Squash at Olympics: Officially included in the sports programme for the 2028 Los Angeles Olympic Games (LA28).",
        "SRFI: Squash Rackets Federation of India (founded 1953 | HQ: Chennai, Tamil Nadu)."
      ]
    },
    "examRelevance": "WBCS Sports & West Bengal Athletes."
  },
  {
    "id": "sport-feb-11-pro-kabaddi-season-2026",
    "day": 26,
    "dateStr": "February 2026",
    "category": "sports",
    "categoryLabel": "⚽ Indigenous Indian Sports",
    "title": "Pro Kabaddi League Playoffs Conclude: High-Scoring Super Raids Light Up Arenas",
    "titleBn": "প্রো কাবাডি লীগের প্লে-অফ পর্ব সম্পন্ন: সুপার রেইড ও ট্যাকেলে জমজমাট লড়াই",
    "summary": "Top franchises including Bengal Warriors, Puneri Paltan, and Jaipur Pink Panthers clashed in intense playoff encounters for the PKL championship trophy.",
    "summaryBn": "ভারতের মাটি থেকে উঠে আসা কাবাডি লিগের প্লে-অফ পর্ব সফলভাবে সম্পন্ন হলো।",
    "keyPoints": [
      "Showcased indigenous Kabaddi athleticism, do-or-die raids, and super tackles.",
      "Promoted grassroots rural sporting talent across India."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Kabaddi Origin & Asian Games",
      "points": [
        "Kabaddi Origin: Ancient India (Tamil Nadu/Vedic era - \"Kai-pidi\" meaning holding hands).",
        "Asian Games: Men's Kabaddi included as medal event in 1990 Beijing Asian Games (India won 8 Gold medals).",
        "National Game of Bangladesh: Kabaddi (Ha-du-du)."
      ]
    },
    "examRelevance": "WBCS Sports & Indigenous Games."
  },
  {
    "id": "sport-feb-12-asian-indoor-athletics-2026",
    "day": 18,
    "dateStr": "February 2026",
    "category": "sports",
    "categoryLabel": "⚽ Indoor Athletics Championships",
    "title": "Asian Indoor Athletics Championships: Indian Athletes Win Medals in Shot Put & Hurdles",
    "titleBn": "এশিয়ান ইনডোর অ্যাথলেটিক্স চ্যাম্পিয়নশিপে ভারতীয় অ্যাথলেটদের পদক সাফল্য",
    "summary": "Indian athletes secured podium finishes in men's shot put, 60m hurdles, and women's middle-distance events at the continental indoor championship.",
    "summaryBn": "আন্তর্জাতিক ইনডোর ট্র্যাকে ভারতীয় অ্যাথলেটরা সোনা ও রূপোর পদক অর্জন করল।",
    "keyPoints": [
      "Set new national indoor timing records in men's 60m hurdles.",
      "Showcased technical power in indoor throwing events."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Athletics Federation of India (AFI)",
      "points": [
        "AFI (Athletics Federation of India): Formed in 1946 (founded by Prof. G.D. Sondhi and Maharaja Yadvindra Singh) | HQ: New Delhi.",
        "National Javelin Day: 7 August (commemorating Neeraj Chopra's 87.58m Gold at Tokyo Olympics 2020)."
      ]
    },
    "examRelevance": "WBCS Sports & Athletics."
  },
  {
    "id": "env-feb-01-world-wetlands-day-2026",
    "day": 2,
    "dateStr": "02 February 2026",
    "category": "environment_wildlife",
    "categoryLabel": "🌿 Wetland Conservation",
    "title": "World Wetlands Day 2026: Theme \"Wetlands and Human Wellbeing\"",
    "titleBn": "বিশ্ব জলাভূমি দিবস ২০২৬: \"জলাভূমি ও মানব কল্যাণ\" থিমে পালিত",
    "summary": "Celebrated across Ramsar sites in India highlighting wetland restoration, natural flood prevention, groundwater replenishment, and eco-tourism livelihoods.",
    "summaryBn": "২ ফেব্রুয়ারি বিশ্ব জলাভূমি দিবসে দেশের সমস্ত রামসার সাইটে বিশেষ সংরক্ষণ কর্মসূচি পালিত হলো।",
    "keyPoints": [
      "Two new wetlands added to Ramsar list on this day: Patna Bird Sanctuary (UP) and Chhari-Dhand (Gujarat).",
      "Amrit Dharohar guidelines implemented across all wetland sites."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Ramsar Sites in India & Wetlands Rules",
      "points": [
        "Ramsar Convention: Signed 2 Feb 1971 in Ramsar, Iran | India ratified on 1 Feb 1982.",
        "Wetlands (Conservation and Management) Rules, 2017: Prohibits industrial expansion, dumping, and untreated effluent discharge in wetlands.",
        "Largest Ramsar Site in India: Sundarbans Wetland, West Bengal (4,230 sq km)."
      ]
    },
    "examRelevance": "Core question for WBCS Prelims (Environment) & Food SI."
  },
  {
    "id": "env-feb-02-aite-tiger-estimation-2026",
    "day": 1,
    "dateStr": "January–February 2026",
    "category": "environment_wildlife",
    "categoryLabel": "🌿 All-India Tiger Estimation",
    "title": "All-India Tiger Estimation (AITE 2026 Cycle): Phase 1 Sign Surveys Conducted Nationwide",
    "titleBn": "সর্বভারতীয় ব্যাঘ্র শুমারি ২০২৬: দেশজুড়ে প্রথম পর্বের ট্রেইল ও ক্যামেরা ট্র্যাপ সমীক্ষা শুরু",
    "summary": "National Tiger Conservation Authority (NTCA) and Wildlife Institute of India (WII) executed Phase 1 ground sign surveys, scat genetics, and camera trapping across 53+ tiger reserves.",
    "summaryBn": "ভারতে বাঘ ও বন্যপ্রাণীর সঠিক সংখ্যা নির্ধারণে ২০২৬ সালের চতুর্বার্ষিক শুমারি পুরোদমে শুরু হলো।",
    "keyPoints": [
      "Deploys Android-based M-STrIPES mobile application for real-time spatial geo-tagging.",
      "Covers 5 major tiger landscapes: Shivalik-Gangetic Plains, Central India & Eastern Ghats, Western Ghats, North-Eastern Hills & Brahmaputra Flood Plains, and Sundarbans."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: NTCA & Project Tiger",
      "points": [
        "NTCA (National Tiger Conservation Authority): Statutory body constituted under Section 38L of Wildlife (Protection) Act, 1972 (amended 2006) | Chair: Union Environment Minister.",
        "Project Tiger: Launched on 1 April 1973 under Prime Minister Indira Gandhi with 9 initial reserves (Corbett, Bandipur, Kanha, Manas, Melghat, Palamau, Ranthambore, Similipal, Sundarbans).",
        "International Tiger Day: 29 July (Saint Petersburg Tiger Summit 2010)."
      ]
    },
    "examRelevance": "WBCS Geography & Environment, UPSC Prelims."
  },
  {
    "id": "env-feb-03-cheetah-botswana-batch-2026",
    "day": 14,
    "dateStr": "February 2026",
    "category": "environment_wildlife",
    "categoryLabel": "🌿 Species Reintroduction",
    "title": "Botswana Cheetah Cohort Arrives in India: Expansion into Gandhi Sagar Wildlife Sanctuary",
    "titleBn": "বতসোয়ানা থেকে নতুন চিতার দল ভারতে আগমন: গান্ধী সাগর অভয়ারণ্যে আবাসন প্রস্তুতি",
    "summary": "The arrival of 9 wild cheetahs from Botswana marks the successful expansion of Project Cheetah beyond Kuno National Park into Gandhi Sagar Sanctuary in Madhya Pradesh.",
    "summaryBn": "ভারতে চিতার বংশবৃদ্ধি ও জিনগত বৈচিত্র্য নিশ্চিত করতে মধ্যপ্রদেশের গান্ধী সাগরে নতুন চিতা রাখা হচ্ছে।",
    "keyPoints": [
      "Gandhi Sagar Wildlife Sanctuary is located in Mandsaur and Neemuch districts of MP on the Chambal River.",
      "Enclosed prey base of Chital, Nilgai, and Chinkara prepared for soft-release bomas."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Cheetah Species & Sub-species",
      "points": [
        "African Cheetah (*Acinonyx jubatus jubatus*): IUCN Status: Vulnerable (found in Southern and Eastern Africa).",
        "Asiatic Cheetah (*Acinonyx jubatus venaticus*): IUCN Status: Critically Endangered (surviving only in Iran, ~12–20 individuals).",
        "Cheetah is the fastest land animal on Earth (capable of sprinting up to 110–120 km/h)."
      ]
    },
    "examRelevance": "WBCS Environment & Wildlife, Food SI."
  },
  {
    "id": "env-feb-04-world-pangolin-day-2026",
    "day": 21,
    "dateStr": "21 February 2026",
    "category": "environment_wildlife",
    "categoryLabel": "🌿 Anti-Trafficking Conservation",
    "title": "World Pangolin Day 2026: TRAFFIC & WCCB Launch Anti-Poaching Drive in Eastern India",
    "titleBn": "বিশ্ব প্যাঙ্গোলিন দিবস ২০২৬: বনরুই চোরাশিকার রোধে পূর্ব ভারতে বিশেষ নজরদারি",
    "summary": "Observed annually on the 3rd Saturday of February to raise global awareness for pangolins (scaly anteaters), the most heavily trafficked wild mammal in the world.",
    "summaryBn": "বিলুপ্তপ্রায় নিরীহ প্রাণী বনরুই সংরক্ষণে বন দপ্তর ও ওয়াইল্ডলাইফ ক্রাইম কন্ট্রোল ব্যুরোর অভিযান।",
    "keyPoints": [
      "Two species found in India: Indian Pangolin (*Manis crassicaudata* - Endangered) and Chinese Pangolin (*Manis pentadactyla* - Critically Endangered).",
      "Illegal trade driven by international demand for keratin scales and bushmeat."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Pangolins & Wildlife Crime Control Bureau (WCCB)",
      "points": [
        "Pangolin Scales: Made of Keratin (the same structural protein found in human hair and fingernails; possesses zero medicinal value).",
        "WCCB: Statutory body established in 2007 under Section 38Y of Wildlife (Protection) Act, 1972 under MoEFCC | HQ: New Delhi.",
        "Wildlife Protection Act, 1972: Amended in 2022 (rationalized into 4 Schedules; pangolins protected under Schedule I)."
      ]
    },
    "examRelevance": "WBCS Biology, Environment & WBP SI."
  },
  {
    "id": "env-feb-05-gib-desert-np-2026",
    "day": 21,
    "dateStr": "February 2026",
    "category": "environment_wildlife",
    "categoryLabel": "🌿 Critically Endangered Avifauna",
    "title": "Desert National Park Records Captive Hatching of Great Indian Bustard (GIB) Chicks",
    "titleBn": "মরু জাতীয় উদ্যানে কৃত্রিম প্রজননে বিরল গোডাবান (Great Indian Bustard) শাবকের জন্ম",
    "summary": "Wildlife Institute of India (WII) and Rajasthan Forest Department's captive breeding centre at Sam in Jaisalmer successfully hatched incubator chicks, taking captive flock past 35 birds.",
    "summaryBn": "বিলুপ্তপ্রায় গ্রেট ইন্ডিয়ান বাস্টার্ড পাখির কৃত্রিম প্রজননে বড় সাফল্য অর্জন করল ভারত।",
    "keyPoints": [
      "Great Indian Bustard (*Ardeotis nigriceps* - Godawan) is Critically Endangered on IUCN Red List with under 150 birds left in wild.",
      "Primary cause of wild mortality: Collision with overhead high-voltage solar transmission power lines in Thar desert."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Great Indian Bustard & Desert NP",
      "points": [
        "State Bird of Rajasthan: Great Indian Bustard (Godawan).",
        "Desert National Park: Located in Jaisalmer and Barmer districts, Rajasthan (spans 3,162 sq km in Thar desert).",
        "Supreme Court Directives: Ordered installation of bird diverters and undergrounding of power cables in GIB priority habitats."
      ]
    },
    "examRelevance": "WBCS Environment & Wildlife, UPSC Prelims."
  },
  {
    "id": "env-feb-06-fsi-carbon-sink-2026",
    "day": 24,
    "dateStr": "February 2026",
    "category": "environment_wildlife",
    "categoryLabel": "🌿 Forestry & Carbon Sinks",
    "title": "Forest Survey of India (FSI) Initiates Digital Satellite Forest Carbon Assessment",
    "titleBn": "ফরেস্ট সার্ভে অফ ইন্ডিয়া (FSI) দ্বারা জাতীয় বন কার্বন সিঙ্ক সমীক্ষা শুরু",
    "summary": "FSI Dehradun deployed synthetic aperture radar (SAR) and LiDAR high-resolution mapping to estimate total carbon stock across India's 7.13 lakh sq km forest cover.",
    "summaryBn": "ভারতের বনভূমিতে কার্বন শোষণের পরিমাণ নির্ধারণে কৃত্রিম উপগ্রহ ভিত্তিক ডিজিটাল শুমারি।",
    "keyPoints": [
      "India's total forest carbon stock is estimated at 7,204 million tonnes.",
      "Supports India's NDC target of creating an additional carbon sink of 2.5 to 3.0 billion tonnes of $CO_2$ equivalent by 2030."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Forest Survey of India & ISFR",
      "points": [
        "FSI: Established on 1 June 1981 | HQ: Dehradun, Uttarakhand.",
        "India State of Forest Report (ISFR): Published biennially (every 2 years) by FSI since 1987.",
        "State with Largest Forest Cover in Area: Madhya Pradesh (followed by Arunachal Pradesh, Chhattisgarh, Odisha, Maharashtra).",
        "State with Highest Forest Cover as % of Area: Mizoram (84.53%)."
      ]
    },
    "examRelevance": "WBCS Geography (Forests of India) & UPSC GS III."
  },
  {
    "id": "env-feb-07-zsi-dancing-frog-2026",
    "day": 18,
    "dateStr": "February 2026",
    "category": "environment_wildlife",
    "categoryLabel": "🌿 Amphibian Biodiversity",
    "title": "Zoological Survey of India (ZSI) Discovers New Endemic Dancing Frog Species in Western Ghats",
    "titleBn": "পশ্চিমঘাট পর্বতমালায় জুলজিক্যাল সার্ভে অফ ইন্ডিয়া (ZSI) দ্বারা নতুন প্রজাতির ড্যান্সিং ফ্রগ আবিষ্কার",
    "summary": "Scientists from ZSI Western Ghats Regional Centre identified a micro-endemic torrent frog (*Micrixalus*) exhibiting unique visual foot-flagging displays in Shola stream waterfalls.",
    "summaryBn": "কেরলের চিরহরিৎ অরণ্যে জলপ্রপাতের ধারে নাচের ভঙ্গিমায় পা নাড়ানো নতুন ব্যাঙের প্রজাতি আবিষ্কৃত হলো।",
    "keyPoints": [
      "Foot-flagging (dancing) is used by male frogs to signal territoriality and attract mates over the roar of rushing mountain streams.",
      "Western Ghats is one of the world's top 8 \"Hottest Biodiversity Hotspots\" hosting 80%+ endemic amphibians."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Zoological Survey of India (ZSI) & Hotspots",
      "points": [
        "ZSI: Founded on 1 July 1916 by MoEFCC | HQ: Prani Vigyan Bhawan, New Alipore, Kolkata, West Bengal.",
        "4 Biodiversity Hotspots in India: 1. Western Ghats & Sri Lanka, 2. Eastern Himalayas, 3. Indo-Burma, 4. Sundaland (Nicobar Islands).",
        "Concept of Biodiversity Hotspots: Coined in 1988 by British ecologist Norman Myers."
      ]
    },
    "examRelevance": "WBCS Biology & Environment, WBPSC Miscellaneous."
  },
  {
    "id": "env-feb-08-kaziranga-zero-poaching-2026",
    "day": 27,
    "dateStr": "February 2026",
    "category": "environment_wildlife",
    "categoryLabel": "🌿 Anti-Poaching Operations",
    "title": "Kaziranga National Park Marks Zero Rhino Poaching for 2nd Consecutive Year",
    "titleBn": "কাজিবাঙা জাতীয় উদ্যানে টানা দ্বিতীয় বছর গণ্ডার চোরাশিকার শূন্যে নামিয়ে আনার রেকর্ড",
    "summary": "Assam Forest Department and Special Rhino Protection Force (SRPF) reported zero poaching incidents of the Greater One-Horned Rhinoceros (*Rhinoceros unicornis*) across all ranges.",
    "summaryBn": "আধুনিক ড্রোন নজরদারি ও বিশেষ সুরক্ষা বাহিনীর তৎপরতায় একশৃঙ্গ গণ্ডারের চোরাশিকার সম্পূর্ণ বন্ধ হলো।",
    "keyPoints": [
      "Kaziranga houses over 2,613 Greater One-Horned Rhinoceroses (over 70% of world's total population).",
      "Assam established Fast Track Courts to expeditiously convict wildlife poachers under Wildlife Protection Act."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Greater One-Horned Rhinoceros & National Parks of Assam",
      "points": [
        "Greater One-Horned Rhino: IUCN Status: Vulnerable | Rhino Horn is made of Keratin (compacted hair).",
        "Rhino Sanctuaries in West Bengal: Jaldapara National Park (Alipurduar - 2nd largest population in India after Kaziranga) and Gorumara National Park (Jalpaiguri).",
        "World Rhino Day: 22 September."
      ]
    },
    "examRelevance": "WBCS Geography (West Bengal & Assam Wildlife), Food SI."
  },
  {
    "id": "day-feb-01-icg-day-2026",
    "day": 1,
    "dateStr": "01 February 2026",
    "category": "days",
    "categoryLabel": "📅 Important Days",
    "title": "49th Indian Coast Guard (ICG) Raising Day & Union Budget Day 2026",
    "titleBn": "৪৯তম ভারতীয় উপকূলরক্ষী বাহিনী প্রতিষ্ঠা দিবস ও কেন্দ্রীয় বাজেট দিবস ২০২৬",
    "summary": "Indian Coast Guard observed its 49th foundation day honoring maritime vigil across India's 7,516 km coastline and 2.01 million sq km Exclusive Economic Zone (EEZ).",
    "summaryBn": "১ ফেব্রুয়ারি ভারতীয় উপকূলরক্ষী বাহিনীর প্রতিষ্ঠা দিবস এবং সংসদে কেন্দ্রীয় বাজেট পেশ পালিত হয়।",
    "keyPoints": [
      "ICG is the 4th largest coast guard in the world (Motto: \"वयम् रक्षामः\" - Vayam Rakshamah / We Protect).",
      "Established under Coast Guard Act, 1978 under Ministry of Defence."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Coastline & Maritime Zones of India",
      "points": [
        "Total Coastline of India: 7,516.6 km (Mainland: 5,422.6 km; Island territories: 2,094 km).",
        "State with Longest Coastline: Gujarat (1,214 km) -> 2nd: Andhra Pradesh (974 km) -> 3rd: Tamil Nadu (906 km).",
        "Maritime Zones (UNCLOS): Territorial Sea (12 nautical miles), Contiguous Zone (24 NM), Exclusive Economic Zone (200 NM)."
      ]
    },
    "examRelevance": "WBCS Geography & Police Exams."
  },
  {
    "id": "day-feb-02-wetlands-day-2026",
    "day": 2,
    "dateStr": "02 February 2026",
    "category": "days",
    "categoryLabel": "📅 Important Days",
    "title": "World Wetlands Day 2026: \"Wetlands and Human Wellbeing\"",
    "titleBn": "বিশ্ব জলাভূমি দিবস ২০২৬: \"জলাভূমি ও মানব কল্যাণ\"",
    "summary": "Commemorates the adoption of the Ramsar Convention on Wetlands on 2 February 1971 in the Iranian city of Ramsar on the Caspian Sea.",
    "summaryBn": "২ ফেব্রুয়ারি বিশ্বজুড়ে জলাভূমি দিবস পালিত হয় প্রাকৃতিক জলাশয় সংরক্ষণের সচেতনতা বাড়াতে।",
    "keyPoints": [
      "India added Patna Bird Sanctuary (UP) and Chhari-Dhand (Gujarat) on this day."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Ramsar Convention",
      "points": [
        "India joined Ramsar Convention on 1 Feb 1982.",
        "Largest Ramsar Site in India: Sundarbans Wetland, West Bengal (4,230 sq km)."
      ]
    },
    "examRelevance": "WBCS Environment & Food SI."
  },
  {
    "id": "day-feb-04-world-cancer-day-2026",
    "day": 4,
    "dateStr": "04 February 2026",
    "category": "days",
    "categoryLabel": "📅 Important Days",
    "title": "World Cancer Day 2026 Observed Globally: Theme \"Close the Care Gap\"",
    "titleBn": "বিশ্ব ক্যান্সার দিবস ২০২৬: \"ক্লোজ দ্য কেয়ার গ্যাপ\"",
    "summary": "Led by Union for International Cancer Control (UICC) to raise awareness, reduce stigma, and promote early oncological screening.",
    "summaryBn": "৪ ফেব্রুয়ারি ক্যান্সার প্রতিরোধ ও প্রাথমিক চিকিৎসার গুরুত্ব তুলে ধরতে এই দিবস পালিত হয়।",
    "keyPoints": [
      "Promotes HPV vaccination for cervical cancer prevention and tobacco cessation."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Oncology & Cancer Biology",
      "points": [
        "Oncology: Branch of medicine dealing with the prevention, diagnosis, and treatment of cancer.",
        "Carcinogens: Cancer-causing agents (e.g., ionizing radiation, tobacco tar, asbestos, aflatoxin, HPV virus).",
        "National Cancer Awareness Day in India: 7 November (birth anniversary of Nobel laureate Madame Marie Curie)."
      ]
    },
    "examRelevance": "WBCS Biology & Public Health."
  },
  {
    "id": "day-feb-06-fgm-zero-tolerance-2026",
    "day": 6,
    "dateStr": "06 February 2026",
    "category": "days",
    "categoryLabel": "📅 Important Days",
    "title": "International Day of Zero Tolerance for Female Genital Mutilation 2026",
    "titleBn": "নারী অঙ্গহানি রোধে আন্তর্জাতিক শূন্য সহনশীলতা দিবস ২০২৬",
    "summary": "UN-sponsored annual awareness day to eradicate female genital mutilation (FGM) under SDG 5 (Gender Equality).",
    "summaryBn": "৬ ফেব্রুয়ারি কন্যা ও নারীদের শারীরিক অধিকার ও সুরক্ষায় জাতিসংঘ কর্তৃক এই দিবস পালিত হয়।",
    "keyPoints": [
      "Aims to achieve total eradication of FGM by 2030 in line with UN Sustainable Development Goals."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: SDG 5 & UN Women",
      "points": [
        "SDG 5: Achieve gender equality and empower all women and girls.",
        "UN Women: UN Entity for Gender Equality and the Empowerment of Women (formed July 2010 | HQ: New York)."
      ]
    },
    "examRelevance": "WBCS Polity & International Issues."
  },
  {
    "id": "day-feb-10-pulses-deworming-day-2026",
    "day": 10,
    "dateStr": "10 February 2026",
    "category": "days",
    "categoryLabel": "📅 Important Days",
    "title": "World Pulses Day 2026 & National Deworming Day in India",
    "titleBn": "বিশ্ব ডাল দিবস ২০২৬ ও জাতীয় কৃমি মুক্তকরণ দিবস",
    "summary": "World Pulses Day observed under theme \"Pulses: Nourishing Soils and People\", while MoHFW conducted biannual Albendazole deworming in schools.",
    "summaryBn": "১০ ফেব্রুয়ারি ডাল জাতীয় শস্যের পুষ্টিগুণ এবং শিশুদের কৃমিনাশক ওষুধ খাওয়ানোর কর্মসূচি পালিত হলো।",
    "keyPoints": [
      "India is the largest producer (25%), consumer (27%), and importer (14%) of pulses in the world.",
      "Albendazole (400 mg) tablets administered to children aged 1–19 years."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Leguminous Crops & Nitrogen Fixation",
      "points": [
        "Rhizobium Bacteria: Symbiotic nitrogen-fixing bacteria residing in root nodules of leguminous pulse crops (converts atmospheric $N_2$ into nitrates).",
        "Major Pulses of India: Gram (Chickpea - largest produced), Tur (Arhar/Pigeon pea), Urad (Black gram), Moong (Green gram), Masoor (Lentil).",
        "ICAR-IIPR: Indian Institute of Pulses Research located in Kanpur, Uttar Pradesh."
      ]
    },
    "examRelevance": "WBCS Agriculture, Biology & Food SI."
  },
  {
    "id": "day-feb-11-women-in-science-2026",
    "day": 11,
    "dateStr": "11 February 2026",
    "category": "days",
    "categoryLabel": "📅 Important Days",
    "title": "International Day of Women and Girls in Science & World Unani Day 2026",
    "titleBn": "বিজ্ঞানে নারী ও কন্যা শিশুদের আন্তর্জাতিক দিবস এবং বিশ্ব ইউনানী দিবস ২০২৬",
    "summary": "Observed by UNESCO and UN Women promoting gender equality in STEMM careers; World Unani Day marks birth anniversary of Hakim Ajmal Khan.",
    "summaryBn": "১১ ফেব্রুয়ারি বিজ্ঞান গবেষণায় নারীদের অংশগ্রহণ এবং বিশিষ্ট হাকিম আজমল খানের জন্মজয়ন্তীতে ইউনানী দিবস পালিত হয়।",
    "keyPoints": [
      "Promotes Vigyan Jyoti and GATI (Gender Advancement for Transforming Institutions) schemes by DST.",
      "Hakim Ajmal Khan (1868–1927) was a renowned Unani physician, freedom fighter, and one of the founders of Jamia Millia Islamia."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Unani Medicine & Central Institutes",
      "points": [
        "Unani System of Medicine: Originated in ancient Greece (Hippocrates and Galen); introduced in India by Arabs and Persians during Delhi Sultanate.",
        "CRIUM: Central Research Institute of Unani Medicine located in Hyderabad.",
        "NIUM: National Institute of Unani Medicine located in Bengaluru, Karnataka."
      ]
    },
    "examRelevance": "WBCS Science & AYUSH History."
  },
  {
    "id": "day-feb-12-productivity-darwin-2026",
    "day": 12,
    "dateStr": "12 February 2026",
    "category": "days",
    "categoryLabel": "📅 Important Days",
    "title": "National Productivity Day 2026 & International Darwin Day",
    "titleBn": "জাতীয় উৎপাদনশীলতা দিবস ২০২৬ ও আন্তর্জাতিক ডারউইন দিবস",
    "summary": "Marks the establishment of National Productivity Council (NPC) in India (1958); Darwin Day commemorates 217th birth anniversary of Charles Darwin (born 1809).",
    "summaryBn": "১২ ফেব্রুয়ারি জাতীয় উৎপাদনশীলতা দিবস এবং বিবর্তনবাদের জনক চার্লস ডারউইনের জন্মবার্ষিকী উদযাপিত হলো।",
    "keyPoints": [
      "National Productivity Council functions under DPIIT (Ministry of Commerce & Industry).",
      "Darwin Day celebrates scientific rationalism and natural selection theory."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Charles Darwin & Theory of Evolution",
      "points": [
        "HMS Beagle Voyage (1831–1836): Darwin visited Galápagos Islands studying finches (adaptive radiation).",
        "Landmark Book: *On the Origin of Species by Means of Natural Selection* (published 24 Nov 1859).",
        "*The Descent of Man* (1871): Applied evolutionary theory to human evolution."
      ]
    },
    "examRelevance": "WBCS Biology & Evolution, SSC CGL."
  },
  {
    "id": "day-feb-13-radio-womens-day-2026",
    "day": 13,
    "dateStr": "13 February 2026",
    "category": "days",
    "categoryLabel": "📅 Important Days",
    "title": "World Radio Day & National Women's Day 2026 on Sarojini Naidu's 147th Birth Anniversary",
    "titleBn": "বিশ্ব বেতার দিবস এবং সরোজিনী নাইডুর ১৪৭তম জন্মবার্ষিকীতে জাতীয় নারী দিবস",
    "summary": "UNESCO World Radio Day celebrates the democratic reach of radio; National Women's Day honours \"Nightingale of India\" (Bharat Kokila) Sarojini Naidu (born 13 Feb 1879).",
    "summaryBn": "১৩ ফেব্রুয়ারি বিশ্ব রেডিও দিবস এবং ভারতের কোকিলা সরোজিনী নাইডুর স্মরণে জাতীয় নারী দিবস পালিত হয়।",
    "keyPoints": [
      "UNESCO theme: \"Radio: A Century Informing, Entertaining and Educating\".",
      "Sarojini Naidu was the 1st Indian woman President of the Indian National Congress (1925 Kanpur Session)."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Sarojini Naidu (1879–1949) Milestones",
      "points": [
        "1st Woman Governor of an Indian State: United Provinces (Uttar Pradesh, 1947–1949).",
        "1st Indian Woman Congress President: 1925 Kanpur Session (Annie Besant was 1st overall woman Congress President in 1917 Calcutta Session).",
        "Poetry Collections: *The Golden Threshold* (1905), *The Bird of Time* (1912), *The Broken Wing* (1917).",
        "Participated in 1930 Salt Satyagraha and led Dharsana Salt Works raid."
      ]
    },
    "examRelevance": "Guaranteed Modern History question in WBCS, Police SI, Food SI."
  },
  {
    "id": "day-feb-20-social-justice-statehood-2026",
    "day": 20,
    "dateStr": "20 February 2026",
    "category": "days",
    "categoryLabel": "📅 Important Days",
    "title": "World Day of Social Justice 2026 & 39th Statehood Day of Arunachal Pradesh and Mizoram",
    "titleBn": "বিশ্ব সামাজিক ন্যায়বিচার দিবস ২০২৬ ও অরুণাচল প্রদেশ ও মিজোরামের প্রতিষ্ঠা দিবস",
    "summary": "UN observance promoting fair global labor standards, poverty eradication, and equal human rights; commemorates statehood of two border states (1987).",
    "summaryBn": "২০ ফেব্রুয়ারি আন্তর্জাতিক সামাজিক ন্যায়বিচার দিবস ও দুই উত্তর-পূর্ব রাজ্যের ৩৯তম প্রতিষ্ঠা দিবস।",
    "keyPoints": [
      "ILO spearheads the Global Coalition for Social Justice."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: International Labour Organization (ILO)",
      "points": [
        "Established: 1919 under Treaty of Versailles (oldest specialized agency of UN) | HQ: Geneva, Switzerland.",
        "Nobel Peace Prize: Awarded to ILO in 1969 on its 50th anniversary.",
        "Director-General: Gilbert Houngbo (Togo)."
      ]
    },
    "examRelevance": "WBCS Polity & International Bodies."
  },
  {
    "id": "day-feb-21-mother-language-day-2026",
    "day": 21,
    "dateStr": "21 February 2026",
    "category": "days",
    "categoryLabel": "📅 Important Days",
    "title": "International Mother Language Day (আন্তর্জাতিক মাতৃভাষা দিবস) 2026 Observed Globally",
    "titleBn": "আন্তর্জাতিক মাতৃভাষা দিবস ২০২৬: একুশে ফেব্রুয়ারি শহিদ স্মরণে বিশ্বব্যাপী পালন",
    "summary": "UNESCO-designated observance commemorating the 1952 Language Movement martyrs of Dhaka University who sacrificed their lives for the recognition of Bengali (বাংলা).",
    "summaryBn": "১৯৫২ সালের ২১ ফেব্রুয়ারি মাতৃভাষা বাংলার দাবিতে আত্মবলিদানকারী বরকত, সালাম, রফিক, জব্বারদের স্মরণে বিশ্বজুড়ে পালিত হয়।",
    "keyPoints": [
      "Proclaimed by UNESCO General Conference in November 1999 (on proposal of Bangladesh).",
      "Promotes linguistic diversity, multilingual education, and preservation of endangered tribal mother tongues."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Bengali Language Heritage & Eighth Schedule",
      "points": [
        "Classical Language Status: Bengali approved as a Classical Language of India in 2024.",
        "8th Schedule of Constitution: Originally had 14 languages; expanded to 22 languages (Sindhi added by 21st Amendment 1967; Konkani, Manipuri, Nepali by 71st Amendment 1992; Bodo, Dogri, Maithili, Santhali by 92nd Amendment 2003).",
        "Official Language of West Bengal: West Bengal Official Language Act, 1961."
      ]
    },
    "examRelevance": "Guaranteed 2 questions in WBCS Prelims, Bengali Compulsory, Clerkship."
  },
  {
    "id": "day-feb-24-central-excise-day-2026",
    "day": 24,
    "dateStr": "24 February 2026",
    "category": "days",
    "categoryLabel": "📅 Important Days",
    "title": "Central Excise Day 2026 Celebrated Across All Customs & Indirect Tax Formations",
    "titleBn": "কেন্দ্রীয় আবগারি দিবস ২০২৬ উদযাপিত",
    "summary": "Marks the enactment of the historic Central Excise and Salt Act on 24 February 1944, recognizing CBIC officers safeguarding fiscal borders.",
    "summaryBn": "২৪ ফেব্রুয়ারি কেন্দ্রীয় আবগারি আইন ১৯৪৪ প্রণয়নের স্মরণে এই দিবস পালিত হয়।",
    "keyPoints": [
      "Honours contribution of excise and customs revenue toward nation-building and border vigilance."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Central Excise & Union List Entries",
      "points": [
        "7th Schedule Union List Entry 84: Duties of excise on tobacco and other goods manufactured in India (except alcoholic liquors for human consumption and opium/narcotics).",
        "GST Implemented: 1 July 2017 subsuming Central Excise Duty, Service Tax, VAT, CST, Entry Tax."
      ]
    },
    "examRelevance": "WBCS Fiscal Economics & Polity."
  },
  {
    "id": "day-feb-28-national-science-day-2026",
    "day": 28,
    "dateStr": "28 February 2026",
    "category": "days",
    "categoryLabel": "📅 Important Days",
    "title": "National Science Day 2026: Commemorating Discovery of the Raman Effect (28 Feb 1928)",
    "titleBn": "জাতীয় বিজ্ঞান দিবস ২০২৬: নোবেলজয়ী স্যার সি ভি রামনের রামন এফেক্ট আবিষ্কারের স্মরণে পালন",
    "summary": "Observed nationwide celebrating scientific temperament and cutting-edge innovations under theme \"Indigenous Technologies for Viksit Bharat\".",
    "summaryBn": "২৮ ফেব্রুয়ারি ভারতীয় বিজ্ঞানের শ্রেষ্ঠত্বের প্রতীক হিসেবে জাতীয় বিজ্ঞান দিবস উদযাপিত হলো।",
    "keyPoints": [
      "National Science Day instituted by Government of India in 1986 upon recommendation of NCSTC.",
      "Sir C.V. Raman discovered the Raman Effect at IACS, Bowbazar/Jadavpur, Kolkata on 28 February 1928."
    ],
    "staticGk": {
      "title": "🏛️ STATIC GK: Scientific Inventions from Bengal & India",
      "points": [
        "Sir C.V. Raman: Nobel Prize in Physics (1930) for work on the scattering of light.",
        "Satyendra Nath Bose: Bose-Einstein Statistics and Boson subatomic particles (former Professor at Dhaka University & Calcutta University).",
        "Meghnad Saha: Saha Ionization Equation in astrophysics (1920).",
        "Prasanta Chandra Mahalanobis: Mahalanobis Distance and founder of Indian Statistical Institute (ISI) in Kolkata (1931 - National Statistics Day: 29 June)."
      ]
    },
    "examRelevance": "Guaranteed 2-3 questions in WBCS Science & Bengal Renaissance."
  }
];
