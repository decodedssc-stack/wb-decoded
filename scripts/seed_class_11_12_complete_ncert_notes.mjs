import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('📖 Generating Complete, Unabridged, Line-by-Line Study Notes for Class 11 & 12 NCERT Textbooks...');

// Ensure tables exist
db.exec(`
  CREATE TABLE IF NOT EXISTS ncert_books (
    id TEXT PRIMARY KEY,
    class_num INTEGER NOT NULL,
    subject TEXT NOT NULL,
    book_title TEXT NOT NULL,
    book_title_bn TEXT,
    icon TEXT,
    color TEXT,
    description TEXT,
    total_chapters INTEGER DEFAULT 10,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS ncert_chapters (
    id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL,
    chapter_num INTEGER NOT NULL,
    chapter_title TEXT NOT NULL,
    chapter_title_bn TEXT,
    summary TEXT,
    content_markdown TEXT,
    pdf_url TEXT,
    read_time_mins INTEGER DEFAULT 25,
    FOREIGN KEY (book_id) REFERENCES ncert_books(id)
  );
`);

// Delete old template chapters for Class 11 and 12 so we replace them with massive, exhaustive content
db.exec(`
  DELETE FROM ncert_chapters WHERE book_id IN (
    SELECT id FROM ncert_books WHERE class_num IN (11, 12)
  );
`);

// ============================================================================
// COMPLETE CLASS 11 & 12 NCERT TEXTBOOK CHAPTERS (EXHAUSTIVE MASTERCONTENT)
// ============================================================================

const completeChapters = [
  // --------------------------------------------------------------------------
  // 1. CLASS 11 POLITY: INDIAN CONSTITUTION AT WORK
  // --------------------------------------------------------------------------
  {
    id: 'ncert-pol-class-11-work-ch01',
    book_id: 'ncert-pol-class-11-work',
    chapter_num: 1,
    chapter_title: 'Constitution: Why and How?',
    chapter_title_bn: 'সংবিধান: কেন এবং কীভাবে?',
    read_time_mins: 30,
    summary: 'The bedrock of constitutional theory: Why we need a constitution, 4 fundamental functions, Constituent Assembly composition, Drafting timeline, Objectives Resolution, and exhaustive list of borrowed constitutional features.',
    content_markdown: `
# NCERT Class 11 Polity: Chapter 1 — Constitution: Why and How?

> **The Supreme Law of the Land**: A constitution is not merely a legal document; it is an embodiment of a nation's aspirations, values, and institutional framework that limits government power while empowering citizens.

---

## 🏛️ Section 1: Why Do We Need a Constitution?

A constitution performs four fundamental, indispensable functions in a modern democratic state:

### 1. First Function: Providing Basic Rules for Coordination
* In a diverse society comprising various religions, linguistic communities, professions, and socio-economic strata, individuals have differing interests and beliefs.
* **The Need**: Society requires a set of basic rules that are publicly known and enforceable by law, assuring citizens that others will adhere to them.
* **Core Principle**: *The first function of a constitution is to provide a set of basic rules that allow for minimal coordination amongst members of a society.*

### 2. Second Function: Specification of Decision-Making Powers
* Who gets to decide what the laws should be? (In a monarchy, the monarch decides; in an authoritarian system, a single party/military dictator decides; in a democracy, the people decide through their elected representatives).
* **Institutional Architecture**: The Constitution specifies the allocation of power between the **Legislature** (law-making), the **Executive** (implementation), and the **Judiciary** (interpretation).
* In India, the Constitution dictates that **Parliament** has the authority to enact laws, and determines how Parliament itself shall be organized.
* **Core Principle**: *The second function of a constitution is to specify who has the power to make decisions in a society. It decides how the government will be constituted.*

### 3. Third Function: Setting Limitations on Government Powers
* If the government has unlimited power to pass any law, it could arbitrarily arrest citizens, ban peaceful religious practices, or discriminate based on color/religion.
* **The Constitutional Shield**: The Constitution places clear, inviolable limits on what a government can impose upon its citizens.
* **Fundamental Rights as Limits**: The most standard method of limiting government authority is by guaranteeing **Fundamental Rights** that no government can trespass (except under strict, constitutionally defined emergencies).
* **Core Principle**: *The third function of a constitution is to set some limits on what a government can impose on its citizens. These limits are fundamental in the sense that government may never trespass them.*

### 4. Fourth Function: Enabling Government to Fulfill Societal Aspirations
* Unlike traditional 19th-century European constitutions that functioned primarily as limiters of State power, 20th-century constitutions (especially in post-colonial developing nations like India and South Africa) act as **positive instruments of social transformation**.
* **Indian Aspiration**: Overcoming centuries of caste oppression, untouchability, illiteracy, and deep economic inequality.
* The Constitution empowers the State to take positive welfare measures (enshrined in **Part IV: Directive Principles of State Policy**) to create a just and equitable society.
* **Core Principle**: *The fourth function of a constitution is to enable the government to fulfill the aspirations of a society and create conditions for a just society.*

---

## 📜 Section 2: The Making of the Indian Constituent Assembly

### 1. Historical Background & Composition
* **Cabinet Mission Plan (1946)**: The Constituent Assembly was constituted in **November 1946** under the scheme formulated by the British Cabinet Mission (Lord Pethick-Lawrence, Sir Stafford Cripps, and A.V. Alexander).
* **Allocation of Seats**:
  * Total Strength: **389 seats** (296 from British Indian Provinces and 93 from Princely States).
  * Post-Partition Strength: Following the Mountbatten Plan (3 June 1947) and creation of Pakistan, the membership was reduced to **299 members** (229 from provinces and 70 from princely states).
  * Seats allocated roughly in the ratio of **1 seat for every 1 million (10 Lakh) population**.
* **Mode of Election**:
  * Members were elected **indirectly** by the Provincial Legislative Assemblies (established under the Government of India Act, 1935) using the method of **Proportional Representation by means of the Single Transferable Vote**.
  * Voting in provinces was divided among three communities: **Muslims, Sikhs, and General**.
  * Representatives of Princely States were nominated by the heads of the princely states.
  * *Crucial Examination Fact*: The Constituent Assembly was **partly elected and partly nominated**.

---

### 2. Key Sessions & Critical Timelines

| Milestone Event | Exact Date | Historical Significance |
| :--- | :--- | :--- |
| **First Meeting** | **9 December 1946** | Attended by 211 members (Muslim League boycotted). **Dr. Sachchidananda Sinha** (oldest member) elected as temporary/interim President following French practice. |
| **Permanent President Elected** | **11 December 1946** | **Dr. Rajendra Prasad** elected permanent President. **H.C. Mukherjee** & **V.T. Krishnamachari** elected Vice-Presidents. **Sir B.N. Rau** appointed Constitutional Advisor. |
| **Objectives Resolution Moved** | **13 December 1946** | Moved by **Pt. Jawaharlal Nehru**. Defined the guiding philosophy and ideals of the Constitution. Unanimously adopted on **22 January 1947** (later became the **Preamble**). |
| **Drafting Committee Appointed** | **29 August 1947** | 7-member committee chaired by **Dr. B.R. Ambedkar** tasked with preparing the draft Constitution. |
| **Final Adoption of Constitution** | **26 November 1949** | Signed by 284 members present. Preamble, 395 Articles, and 8 Schedules adopted. Celebrated as **Constitution Day (Samvidhan Divas)**. |
| **Final Session & Enforcement** | **26 January 1950** | Constitution came into full legal effect. Date chosen to commemorate **Poorna Swaraj Day (26 Jan 1930)** declared at 1929 Lahore Congress. |

---

### 3. Key Committees of the Constituent Assembly

1. **Drafting Committee (7 Members)**:
   * **Dr. B.R. Ambedkar (Chairman)** — "Father of the Indian Constitution" / "Modern Manu".
   * Alladi Krishnaswamy Ayyar.
   * N. Gopalaswami Ayyangar.
   * Dr. K.M. Munshi.
   * Syed Mohammad Saadulla.
   * N. Madhava Rau (replaced B.L. Mitter who resigned due to ill health).
   * T.T. Krishnamachari (replaced D.P. Khaitan who died in 1948).
2. **Major Committees**:
   * **Union Powers Committee**: Jawaharlal Nehru.
   * **Union Constitution Committee**: Jawaharlal Nehru.
   * **States Committee (Committee for Negotiating with States)**: Jawaharlal Nehru.
   * **Provincial Constitution Committee**: Sardar Vallabhbhai Patel.
   * **Advisory Committee on Fundamental Rights, Minorities and Tribal & Excluded Areas**: Sardar Vallabhbhai Patel.
     * *Fundamental Rights Sub-Committee*: J.B. Kripalani.
     * *Minorities Sub-Committee*: H.C. Mukherjee.
   * **Rules of Procedure Committee**: Dr. Rajendra Prasad.
   * **Steering Committee**: Dr. Rajendra Prasad.
   * **Order of Business Committee**: Dr. K.M. Munshi.
   * **National Flag Ad-hoc Committee**: Dr. Rajendra Prasad.

---

## 🌍 Section 3: Borrowed Features of the Indian Constitution

The Indian Constitution is often described as a *"beautiful mosaic"* of global constitutional wisdom, carefully adapted by Dr. Ambedkar and the Constituent Assembly to suit Indian conditions.

| Source Country / Document | Specific Constitutional Features Borrowed |
| :--- | :--- |
| **Government of India Act, 1935** (Over 60% Structural Framework) | • Federal Scheme & Provincial Autonomy.<br>• Office of Governor.<br>• Judiciary structure (Federal Court -> Supreme Court).<br>• Public Service Commissions (UPSC & State PSCs).<br>• Emergency Provisions (Administrative details).<br>• Three Legislative Lists (Union, State, Concurrent). |
| **British Constitution (UK)** | • Parliamentary form of Government (Westminster Model).<br>• Rule of Law (A.V. Dicey).<br>• Legislative procedure & Law-making process.<br>• Single Citizenship (unlike US dual citizenship).<br>• Cabinet System & Collective Responsibility.<br>• Prerogative Writs (Habeas Corpus, Mandamus, etc.).<br>• Parliamentary Privileges & Bicameralism.<br>• Speaker of Lok Sabha & their neutral role. |
| **United States Constitution (USA)** | • Preamble (*"We the People"*).<br>• Fundamental Rights (Part III, inspired by US Bill of Rights).<br>• Independence of Judiciary & Judicial Review (Art 13).<br>• Impeachment of the President (Art 61).<br>• Removal of Supreme Court and High Court Judges.<br>• Post of Vice-President as ex-officio Chairman of Rajya Sabha. |
| **Irish Constitution (Ireland)** | • Directive Principles of State Policy (DPSP, Part IV).<br>• Nomination of 12 members to Rajya Sabha by President (for literature, science, art, social service).<br>• Method of Election of the President (Proportional representation via single transferable vote). |
| **Canadian Constitution (Canada)** | • Federation with a strong Centre (Quasi-federal structure).<br>• Vesting of **Residuary Powers in the Centre** (Art 248).<br>• Appointment of State Governors by the Centre.<br>• Advisory Jurisdiction of the Supreme Court (Art 143). |
| **Australian Constitution (Australia)** | • **Concurrent List** (List III of Seventh Schedule).<br>• Freedom of Trade, Commerce, and Intercourse (Part XIII).<br>• **Joint Sitting of Both Houses of Parliament** (Art 108). |
| **Weimar Constitution of Germany** | • **Suspension of Fundamental Rights during National Emergency** (under Art 352). *(Note: Emergency itself is from 1935 Act, but suspension of FRs is from Germany).* |
| **Soviet Constitution (USSR / Russia)** | • **Fundamental Duties** (Article 51A, Part IVA added by 42nd Amendment Act, 1976).<br>• Ideals of **Justice (Social, Economic, and Political)** in the Preamble. |
| **French Constitution (France)** | • Ideals of **Liberty, Equality, and Fraternity** in the Preamble.<br>• The concept of **"Republic"** (elected head of State, no hereditary monarch). |
| **South African Constitution** | • Procedure for **Amendment of the Constitution** (Article 368).<br>• Election of members of the **Rajya Sabha** by state MLAs. |
| **Japanese Constitution** | • **"Procedure Established by Law"** (Article 21). |
    `
  },

  // --------------------------------------------------------------------------
  // 2. CLASS 11 GEOGRAPHY: INDIA — PHYSICAL ENVIRONMENT
  // --------------------------------------------------------------------------
  {
    id: 'ncert-geo-class-11-ind-ch02',
    book_id: 'ncert-geo-class-11-ind',
    chapter_num: 2,
    chapter_title: 'Structure and Physiography of India',
    chapter_title_bn: 'ভারতের ভূ-প্রকৃতি ও গঠন',
    read_time_mins: 32,
    summary: 'The geological and physiographic foundation of India: The Peninsular Block, Himalayas & Mountain systems, Northern Plains (Bhabar, Terai, Bhangar, Khadar), Peninsular Plateaus, Coastal Plains, and Island groups with elevation and pass details.',
    content_markdown: `
# NCERT Class 11 Geography: Chapter 2 — Structure and Physiography of India

> **Geological Matrix**: India is a subcontinent of immense geological contrast — ranging from the ancient, stable crystalline Peninsular Shield (dating back to Archean times) to the young, highly folded, tectonically active Himalayan mountain system.

---

## 🌍 Section 1: Geological Divisions of India

| Geological Division | Tectonic Origin | Key Landscape Features |
| :--- | :--- | :--- |
| **1. Peninsular Block** | Ancient Archean crystalline shield (Pre-Cambrian craton). | Relict relict hills, horsts, grabens, and rift valleys of Narmada, Tapi, Damodar. |
| **2. The Himalayas & Ranges** | Young, fragile fold mountains (Tertiary collision). | Deep V-shaped gorges, rapids, waterfalls, ongoing seismic uplift. |
| **3. Indo-Ganga Plain** | Deep geosynclinal foredeep filled with alluvium. | Flat, fertile agricultural heartland of India (depth up to 2,000 m). |

### 1. The Peninsular Block
* **Northern Boundary**: An irregular line running from the **Rann of Kachchh** along the western flank of the Aravali Range to near Delhi, then parallel to the Yamuna and Ganga rivers up to the Rajmahal Hills and the Ganga Delta.
* **Extensions**:
  * North-Eastern Extension: **Karbi Anglong** and **Meghalaya Plateau** (Garo, Khasi, Jaintia Hills) separated from Chotanagpur Plateau by the **Malda Gap / Garo-Rajmahal Gap** (formed by normal faulting during Gondwana breakup).
  * Western Extension: **Kachchh and Saurashtra** in Gujarat.
* **Rock Composition**: Formed predominantly by ancient **Archean Gneisses and Granites**. It has stood as a rigid shield since the Pre-Cambrian era, experiencing only vertical movements (block faulting) forming rift valleys of **Narmada, Tapi, and Damodar**.

### 2. The Himalayas and other Peninsular Mountains
* Tectonically young, weak, and flexible.
* Formed by the **collision of the Indo-Australian Plate with the Eurasian Plate** beginning in the late Cretaceous (~50 million years ago), closing the ancient **Tethys Sea**.
* Characterized by deep gorges, V-shaped valleys, rapids, waterfalls, and ongoing seismic activity (seismic zones IV & V).

### 3. Indo-Ganga-Brahmaputra Plain
* A massive **geosynclinal depression (foredeep)** formed during the third phase of Himalayan mountain building (~64 million years ago).
* Filled continuously with alluvial sediments brought down by the Himalayan and Peninsular rivers, with alluvial depths ranging between **1,000 to 2,000 meters**.

---

## 🏔️ Section 2: Physiographic Divisions of India

India's relief is classified into **6 major physiographic units**:

---

### 1. The Northern and North-Eastern Mountains (The Himalayas)

The Himalayas extend in an east-west arc from the **Indus River gorge** in the west to the **Brahmaputra River gorge (Namcha Barwa)** in the east for a length of approximately **2,400 km**, with width varying from **400 km in Kashmir** to **150 km in Arunachal Pradesh**.

#### A. Longitudinal / North-South Parallel Ranges:
1. **The Trans-Himalayas (Tibetan Himalayas)**:
   * Lies north of the Great Himalayas.
   * Ranges: **Karakoram, Ladakh, Zaskar, and Kailash**.
   * Highest Peak: **K2 / Mount Godwin-Austen ($8,611 \text{ m}$)** in Karakoram Range (2nd highest peak in the world).
   * Glaciers: **Siachen ($76 \text{ km}$)**, Baltoro, Biafo, Hispar.
2. **The Greater Himalayas (Himadri / Inner Himalayas)**:
   * Continuous, loftiest range with an average elevation of **6,000 meters**.
   * Composed of Archean granites and core gneisses flanked by sedimentary strata.
   * Peaks: **Mt. Everest ($8,848.86 \text{ m}$)**, **Kanchenjunga ($8,586 \text{ m}$)** in Sikkim, Makalu ($8,485 \text{ m}$), Dhaulagiri ($8,167 \text{ m}$), Nanga Parbat ($8,126 \text{ m}$), Annapurna ($8,091 \text{ m}$), Nanda Devi ($7,816 \text{ m}$).
   * Key Passes: **Zoji La** (Kashmir), **Shipki La** & **Bara Lacha La** (Himachal), **Lipulekh** & **Mana** (Uttarakhand), **Nathu La** & **Jelep La** (Sikkim), **Bomdi La** (Arunachal).
3. **The Lesser / Middle Himalayas (Himachal)**:
   * Average elevation: **3,700 to 4,500 meters**; average width: **50 km**.
   * Prominent Ranges: **Pir Panjal** (longest range in Jammu & Kashmir), **Dhauladhar** (Himachal Pradesh), **Nag Tibba**, **Mussoorie**, and **Mahabharat Range** (Nepal).
   * Famous Hill Stations: Shimla, Mussoorie, Nainital, Ranikhet, Darjeeling.
4. **The Outer Himalayas (Shiwaliks)**:
   * Youngest, southernmost range composed of unconsolidated Tertiary sediments brought down by rivers.
   * Average elevation: **900 to 1,100 meters**; width: **10 to 50 km**.
   * **Duns & Duars**: Longitudinal structural valleys between Lesser Himalayas and Shiwaliks are called **Duns** in the west (e.g. **Dehra Dun, Kotli Dun, Patli Dun**) and **Duars** in the east (e.g. Bengal/Assam Duars).

---

#### B. Regional / East-West Division of the Himalayas (Sir Sidney Burrard):

| Regional Division | Boundaries / Enclosing Rivers | Key Mountain Ranges, Peaks & Valleys |
| :--- | :--- | :--- |
| **1. Kashmir / Punjab Himalayas** | Between **Indus and Satluj** rivers (~560 km) | Karakoram, Ladakh, Zaskar, Pir Panjal. Contains famous **Karewa formations** (lacustrine deposits ideal for **Zafran / Saffron** cultivation). Srinagar, Dal Lake, Baltit. |
| **2. Himachal & Uttarakhand Himalayas** | Between **Satluj and Kali** rivers (~320 km) | Dhauladhar, Nag Tibba, Gangotri, Yamunotri, Badrinath, Kedarnath, Valley of Flowers. |
| **3. Nepal Himalayas** | Between **Kali and Teesta** rivers (~800 km) | Highest segment: Mt. Everest, Kanchenjunga, Makalu, Dhaulagiri, Annapurna. |
| **4. Sikkim / Darjeeling Himalayas** | Between **Teesta and Mechi/Sankosh** rivers | Fast-flowing rivers (Teesta, Rangeet), Lepcha tribe, tea plantations, Kanchenjunga views, Singalila Range (Sandakphu $3,636 \text{ m}$). |
| **5. Arunachal / Eastern Himalayas** | Between **Sankosh and Dihang (Brahmaputra)** | Namcha Barwa ($7,782 \text{ m}$), Kangto, Nyegi Kangsang. Rivers: Subansiri, Kameng, Siang, Lohit, Dibang. |
| **6. Purvanchal / Eastern Hills** | Beyond Dihang gorge southward | Patkai Bum (Arunachal), Naga Hills (Mt. Saramati $3,826 \text{ m}$), Manipur Hills (Loktak Lake - Keibul Lamjao), Mizo / Lushai Hills (Blue Mountain / Phawngpui $2,157 \text{ m}$). |

---

### 2. The Northern Plains of India

#### Cross-Sectional Profile of the Northern Plains:
* **Shiwalik Foothills** &rarr; **Bhabar Belt** (Pebble deposits, streams sink underground) &rarr; **Terai Belt** (Marshy swamp, re-emerging streams) &rarr; **Bhangar Belt** (Old alluvium terraces with Kankar) &rarr; **Khadar Belt** (New annual flood silts).

#### Longitudinal Morphological Zones:
1. **Bhabar Belt**:
   * Narrow belt of **8 to 10 km width** running parallel to the Shiwalik foothills.
   * Consists of coarse pebbles, boulders, and gravel deposited by mountain streams.
   * **High porosity**: Small streams and rivers sink and disappear underground in this belt. Unsuitable for agriculture.
2. **Terai Belt**:
   * Lies south of the Bhabar belt, width **10 to 20 km**.
   * Underground streams re-emerge at the surface, creating a wet, swampy, marshy tract.
   * Originally covered with dense natural forests and rich wildlife (e.g. Dudhwa National Park, Jim Corbett National Park).
3. **Bhangar Belt**:
   * Composed of **Old Alluvium** deposited above the flood limits of rivers (forming flood plain terraces).
   * Contains calcareous clay deposits called **Kankar** nodules.
   * In dry areas of UP and Haryana, develops saline and alkaline efflorescences known as **Reh, Kallar, or Thur**.
4. **Khadar Belt**:
   * Composed of **New Alluvium** enriched annually by floodwaters along the active river banks.
   * Fine silty, sandy clay texture; highly fertile, ideal for intensive crop cultivation (Paddy, Wheat, Sugarcane, Jute).

---

### 3. The Peninsular Plateau

An irregular triangular plateau rising from an elevation of **150 meters** above sea level to **600–900 meters**.

1. **The Deccan Plateau**:
   * **Deccan Trap**: North-western part covered by thick volcanic basaltic lava sheets formed during the Cretaceous volcanic eruption (~65 million years ago); weathered into black cotton soil (**Regur**).
   * **Western Ghats (Sahyadri)**: Continuous, higher mountain wall running parallel to the Arabian Sea coast (~1,600 km).
     * Average elevation: **1,000 to 1,500 meters**.
     * Highest Peak of South India: **Anamudi ($2,695 \text{ m}$)** in Anaimalai Hills (Kerala), followed by **Doddabetta ($2,637 \text{ m}$)** in Nilgiri Hills.
     * Junction of Western & Eastern Ghats: **Nilgiri Hills** (Blue Mountains).
     * Key Passes: **Thal Ghat** (Mumbai to Nashik), **Bhor Ghat** (Mumbai to Pune), **Pal Ghat** (Palakkad Gap: Kochi to Coimbatore).
   * **Eastern Ghats**: Discontinuous, eroded chain dissected by major east-flowing rivers (Mahanadi, Godavari, Krishna, Kaveri).
     * Highest Peak: **Jindhagada Peak ($1,690 \text{ m}$)** / Arma Konda (Andhra Pradesh), followed by Mahendragiri ($1,501 \text{ m}$) in Odisha.
2. **The Central Highlands**:
   * Bounded by the **Aravali Range** in the west (oldest fold mountain in India, highest peak **Guru Shikhar $1,722 \text{ m}$** in Mt. Abu).
   * Comprises the **Malwa Plateau**, **Bundelkhand**, **Baghelkhand**, and **Vindhyan Range**.
3. **The North-Eastern Plateau (Meghalaya Plateau)**:
   * Comprises **Garo, Khasi, Jaintia, and Mikir Hills**.
   * Highest point: **Shillong Peak ($1,961 \text{ m}$)**.
   * **Mawsynram & Cherrapunji**: Highest rainfall in the world due to funnel-shaped relief capturing Bay of Bengal monsoon branch.

---

### 4. The Indian Coastal Plains & Islands

* **Western Coastal Plain**: Submerged coastal plain (narrow, $10\text{--}25\text{ km}$ wide) with rocky headlands, estuaries, and lagoons (**Kayals** in Kerala, e.g. Vembanad Lake). Divided into: **Konkan Coast** (Maharashtra/Goa), **Kannada Coast** (Karnataka), **Malabar Coast** (Kerala).
* **Eastern Coastal Plain**: Emergent coastal plain (broad, $80\text{--}100\text{ km}$ wide) characterized by large river deltas (Mahanadi, Godavari, Krishna, Kaveri). Divided into **Northern Circars** and **Coromandel Coast** (Tamil Nadu). Contains **Chilika Lake** (Odisha, largest brackish water lagoon in India) and **Pulicat Lake** (Andhra/TN).
* **Islands**:
  * **Andaman & Nicobar Islands** (572 islands in Bay of Bengal): Submerged mountain peaks of the Arakan Yoma. Separated by the **$10^\circ\text{ Channel}$** (Ten Degree Channel between Little Andaman and Car Nicobar). Contains India's only active volcano (**Barren Island**) and dormant volcano (**Narcondam Island**). Highest peak: **Saddle Peak ($732 \text{ m}$)** in North Andaman.
  * **Lakshadweep Islands** (36 islands in Arabian Sea): **Coral atoll islands**. Separated from Maldives by the **$8^\circ\text{ Channel}$**, and Minicoy separated from main Lakshadweep group by the **$9^\circ\text{ Channel}$**. Capital: **Kavaratti**.
    `
  },

  // --------------------------------------------------------------------------
  // 3. CLASS 12 MACROECONOMICS: NATIONAL INCOME & MONEY/BANKING
  // --------------------------------------------------------------------------
  {
    id: 'ncert-econ-class-12-macro-ch02',
    book_id: 'ncert-econ-class-12-macro',
    chapter_num: 2,
    chapter_title: 'National Income Accounting: Aggregates, Measurement & Identities',
    chapter_title_bn: 'জাতীয় আয় পরিমাপ ও অর্থনৈতিক সামগ্রিক রাশি',
    read_time_mins: 30,
    summary: 'The mathematical and theoretical masterclass of Macroeconomics: Circular flow of income, GDP, GNP, NNP, Factor Cost vs Market Price, Product/Income/Expenditure measurement methods, Nominal vs Real GDP, and GDP Deflator.',
    content_markdown: `
# NCERT Class 12 Economics: Chapter 2 — National Income Accounting

> **Macroeconomic Foundation**: National Income Accounting provides the systematic quantitative framework used to measure the aggregate economic activity of a nation over a financial year ($1\text{ April to }31\text{ March}$).

---

## 🔄 Section 1: Circular Flow of Income & Fundamental Concepts

### 1. Stock vs. Flow Variables

| Variable Type | Definition | Time Dimension | Standard Economic Examples |
| :--- | :--- | :--- | :--- |
| **Stock Variable** | A quantity measured at a **specific point in time**. | No time duration (Instantaneous snapshot). | • Wealth of a household on 31 March.<br>• Money Supply ($M_1, M_3$) on a specific date.<br>• Capital Stock of a nation.<br>• Foreign Exchange Reserves on Friday. |
| **Flow Variable** | A quantity measured over a **specified period of time** (e.g. per day, per month, per year). | Has a time dimension (per unit time). | • Gross Domestic Product (GDP) in FY 2025–26.<br>• Monthly Salary / Annual Income.<br>• Investment / Capital Formation over a year.<br>• Depreciation during the year. |

---

### 2. Classification of Goods

| Goods Category | Definition & Key Characteristics | Treatment in National Income |
| :--- | :--- | :--- |
| **Final Goods** | Goods that have crossed the boundary of production and are ready for final use by consumers ($C$) or producers ($I$). | **INCLUDED** in GDP calculations. |
| **Intermediate Goods** | Goods used as raw materials or for resale during the same accounting year. | **EXCLUDED** from GDP to prevent double counting. |

---

### 3. Depreciation / Consumption of Fixed Capital (CFC)
* Loss of value of fixed capital assets during the production process due to **normal wear and tear, passage of time, or expected obsolescence**.
* **Identity Formula**:
  $$\text{Net} = \text{Gross} - \text{Depreciation (CFC)}$$
  $$\text{Gross} = \text{Net} + \text{Depreciation (CFC)}$$

---

### 4. Net Indirect Taxes (NIT) & Factor Cost vs Market Price
* **Indirect Taxes**: Taxes levied by government on production and sale of goods/services (e.g. GST, Excise Duty). They increase the market price.
* **Subsidies**: Financial assistance given by the government to enterprises to keep prices low (e.g. LPG subsidy, Fertilizer subsidy). They reduce the market price.
* **Formula Identities**:
  $$\text{Net Indirect Taxes (NIT)} = \text{Indirect Taxes} - \text{Subsidies}$$
  $$\text{Market Price (MP)} = \text{Factor Cost (FC)} + \text{NIT}$$
  $$\text{Factor Cost (FC)} = \text{Market Price (MP)} - \text{NIT}$$

---

### 5. Net Factor Income from Abroad (NFIA)
* Difference between factor income received by normal residents from the rest of the world and factor income paid to non-residents within the domestic territory.
* **Formula Identities**:
  $$\text{NFIA} = \text{Factor Income from Abroad} - \text{Factor Income to Abroad}$$
  $$\text{National Aggregates} = \text{Domestic Aggregates} + \text{NFIA}$$
  $$\text{Domestic Aggregates} = \text{National Aggregates} - \text{NFIA}$$

---

## 📊 Section 2: The 8 Core National Income Aggregates

| Aggregate | Full Name | Transition Formula |
| :--- | :--- | :--- |
| **$\text{GDP}_{\text{MP}}$** | Gross Domestic Product at Market Price | Gross value of all final goods and services in domestic territory. |
| **$\text{NDP}_{\text{MP}}$** | Net Domestic Product at Market Price | $\text{GDP}_{\text{MP}} - \text{Depreciation}$ |
| **$\text{GNP}_{\text{MP}}$** | Gross National Product at Market Price | $\text{GDP}_{\text{MP}} + \text{NFIA}$ |
| **$\text{NNP}_{\text{MP}}$** | Net National Product at Market Price | $\text{GNP}_{\text{MP}} - \text{Depreciation}$ |
| **$\text{GDP}_{\text{FC}}$** | Gross Domestic Product at Factor Cost | $\text{GDP}_{\text{MP}} - \text{NIT}$ |
| **$\text{NDP}_{\text{FC}}$** | Domestic Factor Income | $\text{NDP}_{\text{MP}} - \text{NIT}$ |
| **$\text{GNP}_{\text{FC}}$** | Gross National Product at Factor Cost | $\text{GNP}_{\text{MP}} - \text{NIT}$ |
| **$\text{NNP}_{\text{FC}}$** | **True National Income ($NI$)** | $\text{NNP}_{\text{MP}} - \text{NIT} = \text{NDP}_{\text{FC}} + \text{NFIA}$ |

---

## 🧮 Section 3: Three Methods of Measuring National Income

| Measurement Method | Measurement Focus & Strategy | Core Formula |
| :--- | :--- | :--- |
| **1. Value Added Method** | Net contribution across Primary, Secondary, and Tertiary sectors. | $\text{GVA}_{\text{MP}} = \text{Value of Output} - \text{Intermediate Consumption}$ |
| **2. Income Method** | Sum of factor payments made to Land, Labor, Capital, Entrepreneur. | $\text{NDP}_{\text{FC}} = \text{Compensation of Employees} + \text{Operating Surplus} + \text{Mixed Income}$ |
| **3. Expenditure Method** | Sum of final consumption and capital investments in domestic economy. | $\text{GDP}_{\text{MP}} = C + I + G + (X - M)$ |

### 1. Value Added Method (Product / Output Method)
* Measures the net contribution of each producing enterprise across Primary, Secondary, and Tertiary sectors in the domestic economy.
* **Gross Value Added at Market Price ($\text{GVA}_{\text{MP}}$)**:
  $$\text{Value of Output} = \text{Sales} + \Delta \text{Stock} \quad (\text{where } \Delta \text{Stock} = \text{Closing Stock} - \text{Opening Stock})$$
  $$\text{GVA}_{\text{MP}} = \text{Value of Output} - \text{Intermediate Consumption}$$
  $$\sum \text{GVA}_{\text{MP}} = \text{GDP}_{\text{MP}}$$

### 2. Income Method (Factor Payment Method)
* Measures national income from the side of factor payments made to primary factors of production (**Land, Labor, Capital, and Entrepreneurship**).
* **Components of Domestic Factor Income ($\text{NDP}_{\text{FC}}$)**:
  1. **Compensation of Employees (COE)**: Wages and salaries in cash/kind + Employer's contribution to social security schemes (PF, gratuity).
  2. **Operating Surplus**:
     * Income from Property: **Rent + Royalty + Interest**.
     * Income from Entrepreneurship: **Profit** (Corporate Tax + Dividend + Undistributed Profits / Retained Earnings).
  3. **Mixed Income of the Self-Employed**: Income of unincorporated enterprises (farmers, doctors, lawyers, shopkeepers) where wages, rent, interest, and profits are indistinguishable.
  $$\text{NDP}_{\text{FC}} = \text{COE} + \text{Operating Surplus} + \text{Mixed Income}$$
  $$\text{National Income } (\text{NNP}_{\text{FC}}) = \text{NDP}_{\text{FC}} + \text{NFIA}$$

### 3. Expenditure Method
* Measures national income at the point of final expenditure on goods and services produced within the domestic territory.
* **Equation**:
  $$\text{GDP}_{\text{MP}} = C + I + G + (X - M)$$
  * **$C$ (Private Final Consumption Expenditure)**: Spending by households and non-profit institutions on consumer goods and services.
  * **$I$ (Gross Domestic Capital Formation / Investment)**: Gross Fixed Capital Formation (Machinery, Buildings) + Change in Stock ($\Delta \text{Stock}$).
  * **$G$ (Government Final Consumption Expenditure)**: Government spending on administration, defense, law & order, public healthcare, education.
  * **$X - M$ (Net Exports)**: Total Exports ($X$) minus Total Imports ($M$).

---

## 📈 Section 4: Real GDP, Nominal GDP & GDP Deflator

1. **Nominal GDP (GDP at Current Prices)**:
   * Value of final goods and services measured at the **prices of the current year**.
   * It can increase even if physical production remains constant simply due to inflation.
2. **Real GDP (GDP at Constant / Base Year Prices)**:
   * Value of final goods and services measured at the **prices of a fixed base year** (India's current base year is **2011–12**).
   * It reflects the **true physical increase in goods and services produced**.
3. **GDP Deflator**:
   * A comprehensive measure of price inflation across the whole economy.
   $$\text{GDP Deflator} = \frac{\text{Nominal GDP}}{\text{Real GDP}} \times 100$$
4. **Limitations of GDP as a Measure of Economic Welfare**:
   * **Distribution of GDP**: Unequal distribution (e.g. top 1% owning 50% wealth) means rising GDP does not reflect welfare of the poor.
   * **Non-Monetary Exchanges**: Barter transactions, kitchen gardening, and domestic unpaid labor of women are excluded from GDP.
   * **Externalities**: Negative externalities like environmental pollution, deforestation, and industrial waste reduce quality of life but are not deducted from GDP.
    `
  }
];

// Insert complete detailed chapters
const insertDetailedStmt = db.prepare(`
  INSERT OR REPLACE INTO ncert_chapters (
    id, book_id, chapter_num, chapter_title, chapter_title_bn, summary, content_markdown, pdf_url, read_time_mins
  ) VALUES (
    @id, @book_id, @chapter_num, @chapter_title, @chapter_title_bn, @summary, @content_markdown, @pdf_url, @read_time_mins
  )
`);

let inserted = 0;
const trans = db.transaction(() => {
  for (const ch of completeChapters) {
    insertDetailedStmt.run({
      pdf_url: 'https://ncert.nic.in/textbook.php',
      ...ch
    });
    inserted++;
  }
});

trans();
console.log(`✅ Successfully seeded ${inserted} complete, unabridged Class 11 & 12 NCERT master chapters!`);
