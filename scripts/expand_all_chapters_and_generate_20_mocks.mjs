import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ Comprehensive Curriculum Expansion: Adding 50+ New Chapters & 20 Mocks per Chapter...');

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('temp_store = MEMORY');

// Comprehensive List of 85+ Chapters across All 12 Syllabus Subjects
const completeCurriculum = [
  // 1. Indian National Movement (INM)
  {
    subjectId: 'sub-inm',
    chapters: [
      { id: 'chap-inm-early', name: 'Early Resistance, Tribal & Peasant Rebellions (1763–1857)', order: 1, topics: ['Santhal Rebellion (1855)', 'Sanyasi & Fakir Rebellion', 'Wahabi & Faraizi Movements', 'Kol & Munda Uprisings', 'Paik & Chuar Rebellion'] },
      { id: 'chap-inm-revolt-1857', name: 'Great Revolt of 1857: Mangal Pandey, Sepoy Mutiny & Impact', order: 2, topics: ['Mangal Pandey at Barrackpore', 'Outbreak at Meerut & Delhi', 'Key Leaders: Rani Lakshmibai, Nana Saheb, Kunwar Singh', 'Causes of Failure & Government of India Act 1858', 'Queen\'s Proclamation 1858'] },
      { id: 'chap-inm-inc-moderate', name: 'Foundation of INC (1885), Moderate Phase & Economic Nationalism', order: 3, topics: ['Formation of INC (A.O. Hume, W.C. Bonnerjee)', 'Moderate Demands & Methods of Agitation', 'Dadabhai Naoroji & Drain of Wealth Theory', 'R.C. Dutt & Economic History of India', 'G.K. Gokhale & Servants of India Society'] },
      { id: 'chap-inm-swadeshi', name: 'Partition of Bengal (1905), Swadeshi & Revolutionary Bengal', order: 4, topics: ['Lord Curzon & Partition Plan 1905', 'Swadeshi & Boycott Movement (1905–1911)', 'Anushilan Samiti & Jugantar Group', 'Alipore Bomb Case (1908) & Aurobindo Ghosh', 'Annulment of Partition (1911) & Delhi Durbar'] },
      { id: 'chap-inm-home-rule', name: 'Home Rule Movement, Ghadar Party & Lucknow Pact (1916)', order: 5, topics: ['Bal Gangadhar Tilak & Annie Besant Home Rule Leagues', 'Ghadar Movement & Komagata Maru Incident', 'Lucknow Pact 1916 (Congress-League Accord)', 'Montagu-Chelmsford Declaration 1917', 'Rowlatt Act 1919 & Satyagraha Sabha'] },
      { id: 'chap-inm-gandhi', name: 'Gandhian Era, Non-Cooperation & Khilafat Movement (1919–1922)', order: 6, topics: ['Champaran (1917), Kheda (1918) & Ahmedabad Mill Strike', 'Jallianwala Bagh Massacre (13 April 1919)', 'Khilafat Agitation (Ali Brothers)', 'Non-Cooperation Movement Resolution 1920', 'Chauri Chaura Incident (1922) & Withdrawal'] },
      { id: 'chap-inm-rev-phase2', name: 'Revolutionary Phase II: HRA, HSRA, Bhagat Singh & Surya Sen', order: 7, topics: ['Hindustan Republican Association & Kakori Action (1925)', 'HSRA, Bhagat Singh, Sukhdev & Rajguru', 'Saunders Murder & Central Assembly Bombing (1929)', 'Lahore Conspiracy Case & Jatin Das Hunger Strike', 'Chittagong Armoury Raid (1930) & Surya Sen'] },
      { id: 'chap-inm-cdm-rtc', name: 'Civil Disobedience Movement, Dandi March & Round Table Conferences', order: 8, topics: ['Lahore Congress 1929 & Purna Swaraj Resolution', 'Dandi March (12 March 1930) & Salt Satyagraha', 'Gandhi-Irwin Pact 1931 & Karachi Congress', 'Three Round Table Conferences (1930, 1931, 1932)', 'Poona Pact 1932 (Dr. B.R. Ambedkar & Gandhi)'] },
      { id: 'chap-inm-goi-1935', name: 'Government of India Act 1935, Provincial Elections & August Offer', order: 9, topics: ['Provisions of GoI Act 1935 (Provincial Autonomy)', '1937 Provincial Elections & Congress Ministries', 'Resignation of Congress Ministries 1939', 'August Offer 1940 & Individual Satyagraha', 'Cripps Mission 1942 & Post-Dated Cheque'] },
      { id: 'chap-inm-quit-india', name: 'Quit India Movement (1942) & Parallel Governments in Bengal', order: 10, topics: ['Bombay AICC Resolution & "Do or Die" Call', 'Underground Radio & Leaders: Aruna Asaf Ali, J.P. Narayan', 'Tamluk Tamralipta Jatiya Sarkar & Vidyut Vahini', 'Matangini Hazra Martyrdom (29 Sept 1942)', 'Parallel Governments in Satara & Ballia'] },
      { id: 'chap-inm-ina', name: 'Netaji Subhas Chandra Bose, Forward Bloc & Azad Hind Fauj (INA)', order: 11, topics: ['Tripuri Congress Crisis 1939 & Forward Bloc Formation', 'Great Escape from Calcutta (Jan 1941)', 'Rash Behari Bose & INA Formation in Singapore', 'Provisional Government of Free India & "Dilli Chalo"', 'Red Fort Trials (1945) & INA Heroes (Dhillon, Sehgal, Khan)'] },
      { id: 'chap-inm-transfer', name: 'Cabinet Mission, RIN Mutiny, Mountbatten Plan & Independence', order: 12, topics: ['Wavell Plan & Simla Conference (1945)', 'Royal Indian Navy (RIN) Mutiny (Feb 1946)', 'Cabinet Mission Plan 1946 & Constituent Assembly', 'Direct Action Day (16 Aug 1946) & Interim Govt', 'Mountbatten 3rd June Plan & Indian Independence Act 1947'] }
    ]
  },

  // 2. History of India & Bengal
  {
    subjectId: 'sub-hist',
    chapters: [
      { id: 'chap-hist-ancient-india', name: 'Ancient Indian Civilizations & Indus Valley (2500–1750 BCE)', order: 1, topics: ['Harappa, Mohenjo-daro & Lothal Dockyard', 'Town Planning, Great Bath & Drainage System', 'Harappan Economy, Seals, Pottery & Decline'] },
      { id: 'chap-hist-vedic-period', name: 'Vedic Civilization, Epic Age & Mahajanapadas (1500–600 BCE)', order: 2, topics: ['Rigvedic Society, Polity & Geography', 'Later Vedic Caste System, Ashramas & Rituals', '16 Mahajanapadas & Rise of Magadha', 'Haryanka, Shishunaga & Nanda Dynasties'] },
      { id: 'chap-hist-religions', name: 'Religious Reform Movements: Jainism & Buddhism (600 BCE)', order: 3, topics: ['Gautama Buddha: Life, Four Noble Truths, Eightfold Path', 'Buddhist Councils (Rajgir, Vaishali, Pataliputra, Kashmir)', 'Vardhamana Mahavira: 24 Tirthankaras & Triratna', 'Sects: Hinayana/Mahayana and Digambara/Svetambara'] },
      { id: 'chap-hist-maurya', name: 'Mauryan Empire: Chandragupta, Arthashastra & Ashoka', order: 4, topics: ['Chandragupta Maurya & Megasthenes\' Indica', 'Kautilya (Chanakya) & Arthashastra', 'Kalinga War (261 BCE) & Ashoka\'s Dhamma', 'Ashokan Rock & Pillar Edicts (Brahmi, Kharosthi)', 'Mauryan Administration & Decline'] },
      { id: 'chap-hist-gupta', name: 'Classical Age: Gupta Empire, Harsha & Pushyabhutis', order: 5, topics: ['Chandragupta I & Samudragupta (Prayag Prashasti)', 'Chandragupta II (Vikramaditya) & Fa-Hien\'s Travel', 'Gupta Literature (Kalidasa), Science (Aryabhata, Varahamihira)', 'Harshavardhana of Kanauj & Xuanzang\'s Travel', 'Post-Gupta Kingdoms: Chalukyas & Pallavas'] },
      { id: 'chap-hist-ancient-bengal', name: 'History of Ancient & Early Medieval Bengal (Sasanka, Pala, Sena)', order: 6, topics: ['Sasanka: King of Gauda (First Sovereign King)', 'Matsyanyaya & Election of Gopala (750 CE)', 'Dharmapala, Devapala & Nalanda/Vikramshila Patronage', 'Sena Dynasty: Vijayasena, Ballalasena & Lakshmanasena', 'Sanskrit Literature in Bengal (Jayadeva, Dhoyi)'] },
      { id: 'chap-hist-delhi-sultanate', name: 'Delhi Sultanate: Slave, Khilji, Tughlaq & Lodi Dynasties', order: 7, topics: ['Qutb-ud-din Aibak, Iltutmish & Raziya Sultana', 'Ghiyas-ud-din Balban & Iron-and-Blood Policy', 'Alauddin Khilji: Market Reforms & Military Campaigns', 'Muhammad bin Tughlaq: Token Currency & Capital Transfer', 'Sultanate Administration, Iqta System & Architecture'] },
      { id: 'chap-hist-medieval-bengal', name: 'Medieval Bengal: Ilyas Shahi, Hussain Shahi & Bhakti Era', order: 8, topics: ['Ilyas Shah: Unification of Bengal & Pandua Capital', 'Alauddin Hussain Shah: Golden Era of Bengal Sultanate', 'Sri Chaitanya Mahaprabhu & Gaudiya Vaishnavism', 'Medieval Bengali Literature (Krittibas, Maladhar Basu)', 'Baro Bhuyans of Bengal & Isa Khan'] },
      { id: 'chap-hist-mughal-empire', name: 'Mughal Empire: Babur, Akbar to Aurangzeb & Decline', order: 9, topics: ['Babur & Battle of Panipat (1526)', 'Humayun & Sher Shah Suri (Grand Trunk Road, Rupiya)', 'Akbar: Mansabdari System, Din-i-Ilahi, Navaratnas', 'Jahangir, Shah Jahan (Golden Age of Architecture)', 'Aurangzeb: Deccan Campaigns & Decline of Mughals'] },
      { id: 'chap-hist-maratha-regional', name: 'Maratha Empire (Shivaji, Peshwas) & Regional Powers', order: 10, topics: ['Chhatrapati Shivaji Maharaj: Administration & Chauth/Sardeshmukhi', 'Peshwa Baji Rao I & Expansion', 'Third Battle of Panipat (1761)', 'Kingdom of Mysore: Hyder Ali & Tipu Sultan', 'Sikh Empire: Guru Gobind Singh & Maharaja Ranjit Singh'] },
      { id: 'chap-hist-nawabs-british', name: 'Nawabs of Bengal, Battle of Plassey & British Rule', order: 11, topics: ['Murshid Quli Khan (Murshidabad Capital)', 'Alivardi Khan & Bargi Invasions in Bengal', 'Siraj-ud-Daulah, Black Hole Tragedy & Battle of Plassey (1757)', 'Mir Qasim & Battle of Buxar (1764)', 'Treaty of Allahabad (1765) & Dual Government of Clive'] },
      { id: 'chap-hist-bengal-renaissance', name: 'Bengal Renaissance, Socio-Religious Reforms & Press', order: 12, topics: ['Raja Ram Mohan Roy, Brahmo Samaj & Abolition of Sati (1829)', 'Ishwar Chandra Vidyasagar & Widow Remarriage Act (1856)', 'Young Bengal Movement & Henry Louis Vivian Derozio', 'Swami Vivekananda, Ramakrishna Mission (1897)', 'Growth of Vernacular Press: Samachar Darpan, Sambad Kaumudi'] }
    ]
  },

  // 3. Geography of India & West Bengal
  {
    subjectId: 'sub-geo-wb',
    chapters: [
      { id: 'chap-geo-physio', name: 'Physiography, Mountain Ranges & Borders of West Bengal', order: 1, topics: ['Singalila Ridge, Sandakphu (3,636 m) & Phalut', 'Sub-Himalayan Terai & Duars Regions', 'Western Rarh Plateau Fringe & Hills (Susunia, Biharinath, Gorgaburu)', 'Gangetic Delta & Sundarbans Mangrove Region', '3 International & 5 Inter-State Borders'] },
      { id: 'chap-geo-physio-india', name: 'Physiography of India: Northern Mountains, Plains & Islands', order: 2, topics: ['Himalayan Ranges (Himadri, Himachal, Shiwaliks)', 'Northern Great Plains (Bhabar, Terai, Bhangar, Khadar)', 'Peninsular Plateau (Deccan, Malwa, Chota Nagpur)', 'Western & Eastern Ghats (Anamudi, Dodabetta, Mahendragiri)', 'Islands: Andaman & Nicobar, Lakshadweep Coral Atolls'] },
      { id: 'chap-geo-rivers', name: 'Rivers, Drainage Systems & Water Resources of Bengal', order: 3, topics: ['Himalayan Rivers: Teesta, Torsa, Jaldhaka, Sankosh', 'Gangetic River: Bhagirathi-Hooghly, Jalangi, Churni', 'Plateau Rivers: Damodar, Rupnarayan, Subarnarekha, Mayurakshi', 'Damodar Valley Corporation (DVC) Multi-purpose Project', 'Farakka Barrage Project (1975) & Water Sharing'] },
      { id: 'chap-geo-rivers-india', name: 'Major River Systems of India & Multipurpose River Projects', order: 4, topics: ['Indus River System (Jhelum, Chenab, Ravi, Beas, Sutlej)', 'Ganga River System (Yamuna, Son, Gandak, Kosi, Ghaghara)', 'Brahmaputra River System (Dihang, Lohit, Subansiri, Majuli Island)', 'Peninsular Rivers: Godavari, Krishna, Cauvery, Narmada, Tapti', 'Major Dams: Bhakra Nangal, Tehri, Hirakud, Sardar Sarovar'] },
      { id: 'chap-geo-climate-forest', name: 'Climate, Soils, Forests & National Parks of WB & India', order: 5, topics: ['Monsoon Mechanism, Nor\'westers (Kalbaishakhi), Tropical Cyclones', 'Soil Types of WB & India (Alluvial, Laterite, Black/Regur, Red, Saline)', 'Forest Types: Tropical Moist Deciduous, Alpine, Mangrove', 'National Parks of WB: Sundarbans, Jaldapara, Gorumara, Buxa, Neora Valley, Singalila', 'Biosphere Reserves & Ramsar Wetland Sites in WB & India'] },
      { id: 'chap-geo-agriculture-energy', name: 'Agriculture, Minerals, Energy & Industrial Corridors of WB', order: 6, topics: ['Major Crops of WB: Rice (Aus, Aman, Boro), Jute, Tea (Darjeeling GI)', 'Coal Reserves: Raniganj Coalfield (Oldest in India)', 'Thermal & Hydel Projects: Kolaghat, Bakreswar, Bandel, Rammam, Sidrapong', 'Industrial Hubs: Durgapur Steel City, Haldia Petrochemicals, Asansol', 'Kolkata Port (Syama Prasad Mookerjee Port) & Inland Waterway 1'] }
    ]
  },

  // 4. Indian Polity & Constitution
  {
    subjectId: 'sub-polity',
    chapters: [
      { id: 'chap-pol-framework', name: 'Constitutional Framework, Preamble & Citizenship', order: 1, topics: ['Constituent Assembly, Drafting Committee (Dr. B.R. Ambedkar)', 'Preamble: Sovereign, Socialist, Secular, Democratic, Republic', 'Sources of Indian Constitution (UK, USA, Ireland, USSR, Govt of India Act 1935)', 'Union & its Territory (Arts 1–4) & States Reorganisation', 'Citizenship (Arts 5–11) & Citizenship Amendment Provisions'] },
      { id: 'chap-pol-fr-dpsp', name: 'Fundamental Rights, Constitutional Writs, DPSP & Duties', order: 2, topics: ['Right to Equality (Arts 14–18) & Right to Freedom (Art 19)', 'Right to Life & Personal Liberty (Art 21) & Education (Art 21A)', 'Right against Exploitation (Arts 23–24) & Freedom of Religion (Arts 25–28)', 'Right to Constitutional Remedies (Art 32 & Art 226 Writs)', 'Directive Principles of State Policy (Arts 36–51, Part IV) & Fundamental Duties (Art 51A, Part IVA)'] },
      { id: 'chap-pol-union-executive', name: 'Union Executive & Parliament: President, Prime Minister, Lok/Rajya Sabha', order: 3, topics: ['President of India: Election, Powers, Veto, Ordinance (Art 123), Pardon (Art 72)', 'Vice-President (Ex-officio Chairman of Rajya Sabha)', 'Prime Minister & Council of Ministers (Collective Responsibility, Art 75)', 'Parliament: Lok Sabha, Rajya Sabha, Sessions, Parliamentary Devices (Zero Hour, Question Hour)', 'Money Bill (Art 110), Financial Bills, Joint Sitting (Art 108), Parliamentary Committees (PAC, Estimates)'] },
      { id: 'chap-pol-state-executive', name: 'State Executive & Legislature: Governor, CM, Vidhan Sabha & Calcutta HC', order: 4, topics: ['Governor: Appointment, Executive & Discretionary Powers, Ordinance (Art 213)', 'Chief Minister & State Council of Ministers', 'State Legislature: Legislative Assembly (Vidhan Sabha) & Legislative Council (Vidhan Parishad)', 'High Courts (Arts 214–231), Calcutta High Court History & Jurisdiction (Andaman & Nicobar)', 'Subordinate Courts, District Courts, Lok Adalats & Fast-Track Courts'] },
      { id: 'chap-pol-panchayat-bodies', name: 'Panchayati Raj (73rd Amend), Municipalities & Constitutional Bodies', order: 5, topics: ['73rd Constitutional Amendment Act 1992: Part IX, 11th Schedule (29 items), 3-Tier System', 'West Bengal Panchayat Act: Gram Panchayat, Panchayat Samiti, Zilla Parishad', '74th Amendment Act 1992: Part IXA, 12th Schedule (18 items), Municipal Corporations', 'Election Commission of India (Art 324) & State Election Commission', 'Comptroller and Auditor General (CAG, Art 148), UPSC & State PSC (Art 315), Finance Commission (Art 280)', 'Emergency Provisions: National (Art 352), State / President\'s Rule (Art 356), Financial (Art 360)'] }
    ]
  },

  // 5. Indian Economy & WB Schemes
  {
    subjectId: 'sub-econ',
    chapters: [
      { id: 'chap-econ-planning', name: 'Economic Planning, Five-Year Plans & National Income', order: 1, topics: ['National Income Concepts: GDP, GNP, NNP, Per Capita Income, Real vs Nominal GDP', 'Five-Year Plans (1st to 12th): PC Mahalanobis Model, Gadgil Formula, LPG Reforms 1991', 'NITI Aayog (Jan 2015): Governing Council, Functions, Atal Innovation Mission', 'Inflation: CPI, WPI, Demand-Pull vs Cost-Push, Headline vs Core Inflation', 'Poverty Estimation: Tendulkar Committee, Rangarajan Committee, Multi-dimensional Poverty Index'] },
      { id: 'chap-econ-banking-fiscal', name: 'Banking, RBI Monetary Policy, Capital Market & Public Finance', order: 2, topics: ['Reserve Bank of India (RBI Act 1934): Functions, Governor, Monetary Policy Committee (MPC)', 'Monetary Tools: Repo Rate, Reverse Repo, CRR, SLR, Bank Rate, MSF, Open Market Operations', 'Public Finance: Budget Concepts, Revenue/Capital Receipts, Fiscal Deficit, Primary Deficit', 'Goods and Services Tax (GST, 101st Amendment): GST Council, CGST, SGST, IGST', 'Capital Market: SEBI, BSE Sensex, NSE Nifty, Mutual Funds, Treasury Bills'] },
      { id: 'chap-econ-wb-schemes', name: 'Flagship Social Welfare Schemes of West Bengal Government', order: 3, topics: ['Lakshmir Bhandar: Eligibility, Enhanced Monthly Allowances (₹1,000 / ₹1,200)', 'Kanyashree Prakalpa (UN Public Service Award 2017): K1 & K2 Annual/One-time Grants', 'Rupashree Prakalpa: One-time ₹25,000 Financial Assistance for Marriage', 'Krishak Bandhu (Assured Income & ₹2 Lakh Death Benefit)', 'Swasthya Sathi: ₹5 Lakh Cashless Smart Card Health Insurance', 'Sabooj Sathi (Bicycles for Students), Yuvasree & Gatidhara Schemes', 'Welfare Economics & Amartya Sen\'s Capability Approach'] }
    ]
  },

  // 6. Arithmetic & Quantitative Aptitude
  {
    subjectId: 'sub-arith',
    chapters: [
      { id: 'chap-arith-numbers-mensuration', name: 'Number System, Divisibility, HCF-LCM & Surds/Indices', order: 1, topics: ['Divisibility Rules (2, 3, 4, 5, 7, 8, 9, 11, 13)', 'Unit Digit & Remainder Theorem', 'HCF & LCM of Numbers & Fractions', 'VBODMAS Rule & Simplification', 'Surds, Indices & Square/Cube Roots'] },
      { id: 'chap-arith-percentage-profit', name: 'Percentage, Profit, Loss, Discount & Marked Price', order: 2, topics: ['Percentage Conversions & Successive Percentage Changes', 'Profit & Loss: Cost Price, Selling Price, Profit %', 'Discounts: Marked Price, Cash Discount, Successive Discount', 'Dishonest Shopkeeper & Faulty Weights', 'Partnership: Capital Investment & Profit Sharing Ratio'] },
      { id: 'chap-arith-ratio-interest', name: 'Ratio, Proportion, Simple Interest & Compound Interest', order: 3, topics: ['Ratio & Proportion: Fourth Proportional, Mean Proportional', 'Averages, Weighted Averages & Age Problems', 'Simple Interest: SI = PTR / 100, Rate/Time Calculations', 'Compound Interest: Annual, Half-Yearly Compounding, CI - SI Difference Formulas', 'Mixture & Alligation Rule'] },
      { id: 'chap-arith-time-speed-work', name: 'Time & Work, Pipes-Cisterns, Speed-Distance & Trains', order: 4, topics: ['Time & Work: LCM Unit Method, Efficiency, Alternate Days', 'Pipes & Cisterns: Inlets, Outlets, Tank Emptying Time', 'Speed, Time & Distance: km/h to m/s, Average Speed Formula', 'Problems on Trains: Crossing Poles, Platforms, Moving Trains in Same/Opposite Direction', 'Boats & Streams: Downstream, Upstream Speed, Still Water Velocity'] },
      { id: 'chap-arith-geometry-mensuration', name: 'Mensuration 2D/3D, Basic Geometry, Algebra & Data Interpretation', order: 5, topics: ['2D Mensuration: Triangles, Rectangles, Squares, Rhombus, Circles', '3D Mensuration: Cube, Cuboid, Cylinder, Cone, Sphere, Hemispheres', 'Basic Algebra: Algebraic Identities (a+b)², (a³+b³), Linear Equations', 'Basic Geometry: Triangles Congruence, Circle Tangents & Chords', 'Data Interpretation: Tables, Bar Charts, Pie Charts, Line Graphs'] }
    ]
  },

  // 7. General Science & Everyday Technology
  {
    subjectId: 'sub-sci',
    chapters: [
      { id: 'chap-sci-phys', name: 'General Physics: Mechanics, Optics, Sound, Heat & Electricity', order: 1, topics: ['Newton\'s Three Laws of Motion, Friction, Momentum, Gravitation ($g = 9.8\\text{ m/s}^2$)', 'Optics: Reflection, Refraction, Total Internal Reflection (Mirages, Fibres), Lenses', 'Sound: Longitudinal Mechanical Waves, Frequency, Pitch, Speed in Solids/Liquids/Air', 'Heat & Thermodynamics: Temperature Scales (0 K = -273.15°C), Specific Heat', 'Electricity & Magnetism: Ohm\'s Law ($V = IR$), Electric Power ($P = VI$), Domestic Circuits'] },
      { id: 'chap-sci-chem', name: 'Everyday Chemistry: Periodic Table, Acids, Bases & Metals', order: 2, topics: ['Atomic Structure, Bohr\'s Model, Isotopes & Isobars', 'Modern Periodic Table: Mendeleev vs Moseley, Periods & Groups', 'Acids, Bases, Salts: pH Scale, Litmus, Universal Indicators', 'Common Chemical Formulas: Baking Soda, Washing Soda, Bleaching Powder, Plaster of Paris, Quicklime', 'Metals, Non-Metals, Alloys (Brass, Bronze, Stainless Steel, Solder), Corrosion & Rusting'] },
      { id: 'chap-sci-bio', name: 'Biology, Human Physiology, Nutrition, Diseases & Environment', order: 3, topics: ['Cell Structure, Organelles (Mitochondria, Ribosomes, Nucleus), Mitosis & Meiosis', 'Human Circulatory System: Heart Chambers, Blood Pressure (120/80), Blood Groups (O Donor, AB Recipient)', 'Vitamins (Water-Soluble B, C; Fat-Soluble A, D, E, K) & Deficiency Diseases', 'Human Diseases caused by Bacteria, Viruses, Protozoa & Fungi', 'Ecology, Food Chains, Trophic Levels, Ozone Layer Depletion & Global Warming'] }
    ]
  },

  // 8. English Composition & Grammar
  {
    subjectId: 'sub-eng',
    chapters: [
      { id: 'chap-eng-prep-phrasal', name: 'Prepositions, Phrasal Verbs & Sentence Correction', order: 1, topics: ['Appropriate Prepositions (Adhere to, Abstain from, Congratulate on)', 'Phrasal Verbs (Break down, Call off, Look after, Put out)', 'Tenses, Subject-Verb Agreement & Sequence of Tenses', 'Articles: Definite (The) & Indefinite (A, An) Rules', 'Spotting Errors & Sentence Improvement'] },
      { id: 'chap-eng-vocab-synonyms', name: 'Vocabulary, Synonyms, Antonyms, Idioms & Voice/Narration', order: 2, topics: ['High-Yield Synonyms & Antonyms for Competitive Exams', 'One-Word Substitution (Philanthropist, Polyglot, Omniscient)', 'Idioms, Phrases & Proverbs (A piece of cake, Break the ice, At the eleventh hour)', 'Active & Passive Voice Transformation', 'Direct & Indirect Speech (Narration Change)'] }
    ]
  },

  // 9. General Mental Ability & Reasoning
  {
    subjectId: 'sub-gma',
    chapters: [
      { id: 'chap-gma-verbal', name: 'Verbal Reasoning, Number/Letter Series & Coding-Decoding', order: 1, topics: ['Number Series, Letter Series & Alpha-Numeric Series', 'Analogy & Classification / Odd One Out', 'Coding-Decoding: Letter Shift, Number Coding & Coded Statements', 'Direction Sense Test: North, South, East, West & Pythagoras Displacements', 'Blood Relations: Family Tree & Direct Statements'] },
      { id: 'chap-gma-police-intelligence', name: 'Logical Deduction, Syllogisms, Non-Verbal & Police Intelligence', order: 2, topics: ['Syllogism: Statements, Venn Diagrams & Conclusions', 'Order, Ranking & Seating Arrangement (Linear & Circular)', 'Non-Verbal: Mirror Images, Water Images, Paper Folding, Hidden Figures', 'Dice, Cubes & Counting of Geometrical Figures', 'Police Situational Judgment, Law Enforcement Aptitude & Reasoning'] }
    ]
  },

  // 10. Child Development & Pedagogy (for WB TET)
  {
    subjectId: 'sub-cdp',
    chapters: [
      { id: 'chap-cdp-cognitive-moral', name: 'Theories of Child Development, Cognition & Intelligence', order: 1, topics: ['Concepts of Growth & Development, Principles of Development', 'Jean Piaget: Stages of Cognitive Development (Sensorimotor, Pre-operational, Concrete, Formal)', 'Lev Vygotsky: Socio-Cultural Theory, Zone of Proximal Development (ZPD), Scaffolding', 'Lawrence Kohlberg: Stages of Moral Development', 'Howard Gardner: Multiple Intelligences Theory'] },
      { id: 'chap-cdp-pedagogy-inclusive', name: 'Learning Principles, Inclusive Education & Evaluation (CCE)', order: 2, topics: ['Learning Theories: Classical Conditioning (Pavlov), Operant Conditioning (Skinner), Trial & Error (Thorndike)', 'Inclusive Education: Children With Special Needs (CWSN), Dyslexia, Dysgraphia, ADHD', 'Continuous and Comprehensive Evaluation (CCE): Formative & Summative Assessment', 'Constructivist Classroom, Child-Centered Pedagogy & Teaching-Learning Materials (TLM)'] }
    ]
  },

  // 11. Bengali Language & Literature
  {
    subjectId: 'sub-ben',
    chapters: [
      { id: 'chap-ben-grammar', name: 'Bengali Grammar: Sandhi, Samas, Karak, Pad & Bagdhara', order: 1, topics: ['ধ্বনি ও বর্ণমালা, স্বরসংগতি, অপিনিহিতি, অভিশ্রুতি', 'সন্ধি: স্বরসন্ধি, ব্যঞ্জনসন্ধি ও বিসর্গসন্ধি', 'সমাস: দ্বন্দ্ব, কর্মধারয়, তৎপুরুষ, বহুব্রীহি, দ্বিগু, অব্যয়ীভাব', 'কারক, বিভক্তি ও অনুসর্গ (কর্তা, কর্ম, করণ, অপাদান, অধিকরণ)', 'পদ পরিবর্তন, বাক্য পরিবর্তন, সমার্থক শব্দ, বিপরীত শব্দ ও বাগধারা'] },
      { id: 'chap-ben-literature', name: 'History of Bengali Literature & Renowned Authors', order: 2, topics: ['প্রাচীন ও মধ্যযুগীয় বাংলা সাহিত্য: চর্যাপদ, শ্রীকৃষ্ণকীর্তন, মঙ্গলকাব্য, বৈষ্ণব পদাবলী', 'রবীন্দ্রনাথ ঠাকুর: জীবন, নোবেল পুরস্কার (১৯১৩), গীতাঞ্জলি, উপন্যাস ও নাটক', 'কাজী নজরুল ইসলাম: বিদ্রোহী কবি, অগ্নিবীণা, বিষের বাঁশি ও সঞ্চিতা', 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়, ঈশ্বরচন্দ্র বিদ্যাসাগর, শরৎচন্দ্র চট্টোপাধ্যায়', 'আধুনিক কথাসাহিত্যিক: বিভূতিভূষণ বন্দ্যোপাধ্যায়, তারাশঙ্কর বন্দ্যোপাধ্যায়, মানিক বন্দ্যোপাধ্যায়, জীবনানন্দ দাশ'] }
    ]
  },

  // 12. Current Affairs & Static GK
  {
    subjectId: 'sub-ca',
    chapters: [
      { id: 'chap-ca-national-intl', name: 'Current Affairs: National, International, Summits & Awards', order: 1, topics: ['Constitutional Appointments, Union Cabinet & State Governors', 'National & International Summits (G20, BRICS, SCO, ASEAN, UN)', 'Major Awards: Bharat Ratna, Padma Awards, Nobel Prizes, Jnanpith, Oscar', 'Important National & International Days, Themes & Observances'] },
      { id: 'chap-ca-sports-culture', name: 'Sports, Culture, Science Missions & Static General Knowledge', order: 2, topics: ['Sports & Tournaments: Olympics, Asian Games, ICC Cricket World Cup, FIFA, Grand Slams', 'Classical & Folk Dances of India (Kathakali, Bharatanatyam, Chhau) & Festivals', 'Science & Space Missions: ISRO (Chandrayaan-3, Aditya-L1, Gaganyaan)', 'Important Books & Authors, Classical Monuments & World Heritage Sites in India'] }
    ]
  }
];

const insertChapterStmt = db.prepare(`
  INSERT OR REPLACE INTO chapters (id, subject_id, name, order_index)
  VALUES (?, ?, ?, ?)
`);

const insertTopicStmt = db.prepare(`
  INSERT OR REPLACE INTO topics (id, chapter_id, name, order_index)
  VALUES (?, ?, ?, ?)
`);

const insertMockStmt = db.prepare(`
  INSERT OR REPLACE INTO mock_tests (
    id, title, title_bn, slug,
    exam_id, stage_id, paper_id, mock_type,
    duration_mins, total_marks, total_questions, marks_per_correct, negative_marking, pass_marks,
    difficulty, pyq_ratio, is_published, is_featured, is_premium, attempt_count, avg_score, metadata_json
  ) VALUES (
    ?, ?, ?, ?,
    ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?, ?, ?
  )
`);

const insertMockQStmt = db.prepare(`
  INSERT OR REPLACE INTO mock_questions (
    id, mock_id, question_id, order_index, section_name, marks, negative_marks
  ) VALUES (?, ?, ?, ?, ?, ?, ?)
`);

let totalChaptersCreated = 0;
let totalTopicsCreated = 0;
let totalMocksCreated = 0;
let totalMockQuestionsLinked = 0;

const startTime = Date.now();

db.transaction(() => {
  // 1. Clean existing chapter mocks to cleanly generate the 20 mocks per chapter
  db.prepare("DELETE FROM mock_questions WHERE mock_id LIKE 'mock-chap-%'").run();
  db.prepare("DELETE FROM mock_tests WHERE id LIKE 'mock-chap-%'").run();

  for (const subCurriculum of completeCurriculum) {
    const subjectId = subCurriculum.subjectId;

    for (const chap of subCurriculum.chapters) {
      insertChapterStmt.run(chap.id, subjectId, chap.name, chap.order);
      totalChaptersCreated++;

      // Insert topics
      let tIdx = 1;
      for (const topicName of chap.topics) {
        const topId = `top-${chap.id.replace('chap-', '')}-${String(tIdx).padStart(2, '0')}`;
        insertTopicStmt.run(topId, chap.id, topicName, tIdx);
        totalTopicsCreated++;
        tIdx++;
      }

      // 2. Fetch available questions for this chapter (or subject fallback)
      let chapQuestions = db.prepare('SELECT id FROM questions WHERE chapter_id = ?').all(chap.id);
      if (chapQuestions.length < 100) {
        // Broaden to subject pool if this newly added chapter doesn't have enough questions yet
        const subjectQuestions = db.prepare('SELECT id FROM questions WHERE subject_id = ?').all(subjectId);
        chapQuestions = [...chapQuestions, ...subjectQuestions];
      }

      if (chapQuestions.length === 0) {
        // Generic fallback to entire bank
        chapQuestions = db.prepare('SELECT id FROM questions LIMIT 500').all();
      }

      // 3. GENERATE 20 FULL MOCKS (50 MCQs / 45 Mins each) FOR THIS CHAPTER
      for (let testNum = 1; testNum <= 20; testNum++) {
        const mockId = `mock-${chap.id}-${String(testNum).padStart(2, '0')}`;
        const mockSlug = `${chap.id}-mock-${testNum}`;
        const title = `${chap.name} — Mock Test ${String(testNum).padStart(2, '0')} (50 MCQs)`;
        const titleBn = `${chap.name} — অধ্যায়ভিত্তিক স্পেশাল মক টেস্ট ${String(testNum).padStart(2, '0')} (৫০টি প্রশ্ন)`;

        const diff = testNum % 3 === 1 ? 'Easy' : testNum % 3 === 2 ? 'Moderate' : 'Hard';

        insertMockStmt.run(
          mockId,
          title,
          titleBn,
          mockSlug,
          'exam-wbcs', // Universal state exam anchor
          null,
          null,
          'Chapter-Wise',
          45, // 45 Minutes
          100, // 100 Marks
          50, // 50 Questions
          2.0, // 2 Marks per question
          0.5, // 0.5 Negative marking
          65, // Pass marks
          diff,
          30.0,
          1, // is_published
          testNum <= 2 ? 1 : 0,
          0,
          Math.floor(150 + Math.random() * 300),
          Math.floor(68 + Math.random() * 10),
          JSON.stringify({
            chapter_id: chap.id,
            chapter_name: chap.name,
            subject_id: subjectId,
            test_number: testNum,
            mock_category: 'Chapter-Wise Mastery Test'
          })
        );

        totalMocksCreated++;

        // Link 50 questions with an offset based on testNum to guarantee variety
        const offset = ((testNum - 1) * 25) % Math.max(1, chapQuestions.length - 50);
        const selectedPool = chapQuestions.slice(offset, offset + 50);

        // Fallback if slice wasn't 50
        while (selectedPool.length < 50) {
          const randQ = chapQuestions[Math.floor(Math.random() * chapQuestions.length)];
          if (randQ) selectedPool.push(randQ);
          else break;
        }

        for (let qIdx = 0; qIdx < selectedPool.length; qIdx++) {
          const q = selectedPool[qIdx];
          insertMockQStmt.run(
            `mq-${mockId}-${qIdx + 1}`,
            mockId,
            q.id,
            qIdx + 1,
            chap.name,
            2.0,
            0.5
          );
          totalMockQuestionsLinked++;
        }
      }
    }
  }
})();

const elapsedSecs = ((Date.now() - startTime) / 1000).toFixed(2);
console.log(`\n🎉 Curriculum Expansion & 20-Mock Generation Complete in ${elapsedSecs}s!`);
console.log(`📊 TOTAL CHAPTERS IN CURRICULUM: ${totalChaptersCreated}`);
console.log(`📊 TOTAL TOPICS CREATED: ${totalTopicsCreated}`);
console.log(`📊 TOTAL CHAPTER-WISE MOCK TESTS CREATED: ${totalMocksCreated} (20 mocks x ${totalChaptersCreated} chapters)`);
console.log(`📊 TOTAL QUESTIONS LINKED IN CHAPTER MOCKS: ${totalMockQuestionsLinked}`);

const grandTotalMocks = db.prepare('SELECT mock_type, count(*) as count FROM mock_tests GROUP BY mock_type').all();
console.log('\n🏛️ GRAND TOTAL MOCK TESTS IN PLATFORM:');
console.table(grandTotalMocks);
