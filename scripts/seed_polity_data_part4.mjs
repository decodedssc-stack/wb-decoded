import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ SEEDING POLITY CHAPTERS 13 TO 16...');

const insertChapter = db.prepare(`
  INSERT INTO polity_chapters (
    id, slug, chapter_number, title, subtitle, part_reference, articles_range, reading_time_mins, concepts_count, mcqs_count, quality_score, source_videos, content_markdown, is_published
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1
  )
  ON CONFLICT(slug) DO UPDATE SET
    title = excluded.title,
    subtitle = excluded.subtitle,
    part_reference = excluded.part_reference,
    articles_range = excluded.articles_range,
    reading_time_mins = excluded.reading_time_mins,
    concepts_count = excluded.concepts_count,
    mcqs_count = excluded.mcqs_count,
    quality_score = excluded.quality_score,
    source_videos = excluded.source_videos,
    content_markdown = excluded.content_markdown,
    is_published = 1
`);

// ==============================================================================
// CHAPTER 13: THE PARLIAMENT OF INDIA
// ==============================================================================
const ch13_content = `# Chapter 13 — Part V: The Parliament of India: Structure, Bills & Procedures (Articles 79 to 122)

## 1. Introduction
[FROM PLAYLIST]
**Article 79** provides: *"There shall be a Parliament for the Union which shall consist of the **President and two Houses** to be known respectively as the **Council of States (Rajya Sabha)** and the **House of the People (Lok Sabha)**."*

Although the President is not a member of either House, he is an **integral part of Parliament** because no bill passed by both Houses can become law without the President's assent (Article 111).

---

## 2. Composition of the Two Houses

### A. Rajya Sabha (Council of States / Upper House / House of Elders) — Article 80
* **Maximum Strength**: **250** (238 elected from States & UTs + 12 nominated by President).
* **Current Strength**: **245** (225 from States + 8 from UTs [Delhi 3, Puducherry 1, J&K 4] + 12 Nominated).
* **Permanent Body**: Rajya Sabha is **NOT subject to dissolution** (Article 83(1)).
* **Term of Members**: **6 years** (one-third of its members retire every second year).
* **Minimum Age**: **30 years** (Article 84).
* **Presiding Officers**: **Chairman** (Vice-President of India, ex-officio) and **Deputy Chairman** (elected from among its members).

### B. Lok Sabha (House of the People / Lower House / Popular House) — Article 81
* **Maximum Strength**: **550** (530 from States + 20 from UTs).
  * *(Note: Anglo-Indian nominated quota of 2 members was discontinued by **104th Amendment Act 2019**).*
* **Current Strength**: **543** elected members.
* **Duration**: **5 years** from the date of its first meeting (can be dissolved earlier by the President on PM's advice). Can be extended during National Emergency for 1 year at a time.
* **Minimum Age**: **25 years** (Article 84).
* **Presiding Officers**: **Speaker** and **Deputy Speaker** (elected by Lok Sabha from among its members — Article 93).

---

## 3. Special Powers of Rajya Sabha (Federal Safeguards)
[FROM PLAYLIST]
1. **Article 249**: Authorise Parliament to make a law on a subject in the **State List** in the national interest (requires $\frac{2}{3}\text{rd}$ majority of members present and voting; valid for 1 year).
2. **Article 312**: Authorise Parliament to create one or more **All-India Services** common to the Union and the States (e.g. IAS, IPS, IFS).
3. **Article 67(b)**: A resolution for removal of the Vice-President can be originated **ONLY in the Rajya Sabha**.

---

## 4. Types of Bills in Parliament

| Type of Bill | Governed By | Prior Presidential Recommendation? | Introduced In | Rajya Sabha Powers | Joint Sitting (Art 108)? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ordinary Bill** | Articles 107 & 108 | No (except Art 3 bills) | Either House | Can amend or delay for **max 6 months** | **YES** |
| **Money Bill** | Articles 109 & 110 | **YES (Mandatory)** | **Lok Sabha ONLY** | Restricted: Can only make recommendations within **14 days** | **NO** |
| **Financial Bill (I)** | Article 117(1) | **YES** | **Lok Sabha ONLY** | Equal powers once introduced | **YES** |
| **Financial Bill (II)** | Article 117(3) | Required for consideration | Either House | Equal powers | **YES** |
| **Constitution Amendment Bill** | Article 368 | **NO** | Either House | **Equal Powers** (must pass by special majority in each house separately) | **NO** |

### Money Bill (Article 110):
* A bill is deemed to be a Money Bill if it contains ONLY provisions dealing with: imposition/abolition of taxes, borrowing of money, custody of Consolidated Fund/Contingency Fund of India.
* **Speaker's Decision Final (Art 110(3))**: The decision of the Speaker of Lok Sabha whether a bill is a Money Bill is **final and cannot be questioned** in any court, House, or by the President.
* If Rajya Sabha does not return the Money Bill within **14 days**, it is deemed to have been passed by both Houses in the form passed by Lok Sabha.

---

## 5. Joint Sitting of Both Houses (Article 108)
[FROM PLAYLIST]
* **Summoned by**: **President of India** in case of deadlock between the two Houses on an Ordinary Bill or Financial Bill after 6 months.
* **Deadlock Situations**:
  1. If the bill is rejected by the other House.
  2. If the Houses have finally disagreed as to the amendments.
  3. If more than 6 months elapse from the date of receipt without passing.
* **Presided Over By**:
  1. **Speaker of Lok Sabha**.
  2. If Speaker is absent: **Deputy Speaker of Lok Sabha**.
  3. If Deputy Speaker is absent: **Deputy Chairman of Rajya Sabha**.
  4. *Note: The Chairman of Rajya Sabha (Vice-President) NEVER presides over a Joint Sitting because he is not a member of either House!*
* **Voting**: Decided by a **Simple Majority** of the total number of members of both Houses present and voting (Lok Sabha invariably wins due to numerical superiority).
* **Joint Sittings in History**: Held only 3 times so far:
  1. Dowry Prohibition Bill, 1961
  2. Banking Service Commission (Repeal) Bill, 1978
  3. Prevention of Terrorism Bill (POTA), 2002

---

## 6. Parliamentary Devices & Sessions
* **Article 85 (Sessions)**: The maximum gap between two sessions of Parliament **cannot exceed 6 months**. Typically 3 sessions per year:
  1. **Budget Session** (Feb–May) — Longest
  2. **Monsoon Session** (July–Aug)
  3. **Winter Session** (Nov–Dec) — Shortest
* **Question Hour**: First hour of every parliamentary sitting (Starred questions [oral, supplementary allowed], Unstarred [written, no supplementaries], Short notice).
* **Zero Hour (Indian Innovation since 1962)**: Starts immediately after Question Hour (12:00 noon) without prior notice to raise matters of urgent public importance.
* **Quorum (Article 100)**: Minimum $\frac{1}{10}\text{th}$ of total members (55 in Lok Sabha, 25 in Rajya Sabha).

---

## 7. Lecture Sources & Attribution
* **Lecture Sources**:
  * \`Lec 21: Indian Polity Facts About Parliament Part 1\` (Video ID: \`7JXZ866evcM\`, 50m)
  * \`Lec 22: Indian Polity Facts About Parliament Part 2\` (Video ID: \`DiRb3iNQBro\`, 96m 33s)
* **Attribution**: Complete extraction of parliamentary composition, legislative procedures, money bills, Article 108 joint sitting rules, and parliamentary committees.
`;

insertChapter.run(
  'polity-ch-13',
  'the-parliament-of-india',
  13,
  'Part V: The Parliament of India: Structure, Bills & Procedures',
  'Lok Sabha vs Rajya Sabha, Money Bills (Art 110), Joint Sitting (Art 108) & Parliamentary Devices',
  'Part V, Chapter II',
  'Articles 79 to 122',
  40,
  30,
  15,
  99,
  JSON.stringify(['7JXZ866evcM', 'DiRb3iNQBro']),
  ch13_content
);

console.log('✅ Chapter 13 Seeded.');

// ==============================================================================
// CHAPTER 14: SUPREME COURT OF INDIA
// ==============================================================================
const ch14_content = `# Chapter 14 — The Union Judiciary: Supreme Court of India & Collegium (Articles 124 to 147)

## 1. Introduction
[FROM PLAYLIST]
The Indian Constitution established an **Integrated and Independent Judicial System**. Unlike the American federal judicial system (where federal courts enforce federal laws and state courts enforce state laws), the Supreme Court of India stands at the apex of a single integrated judicial hierarchy that enforces both Central and State laws.

The Supreme Court was inaugurated on **January 28, 1950**, succeeding the Federal Court of India (1937) and the Privy Council.

---

## 2. Organization & Composition (Article 124)
* **Original Strength (1950)**: 1 Chief Justice + 7 other judges = **8 Judges**.
* **Current Strength (2026)**: **1 Chief Justice of India + 33 other judges = 34 Judges** (enhanced by the *Supreme Court (Number of Judges) Amendment Act 2019*).
* **Appointment**: Every Judge of the Supreme Court is **appointed by the President** by warrant under his hand and seal after consultation with such Judges of SC and HCs as the President deems necessary.

---

## 3. The Collegium System & The Three Judges Cases
[FROM PLAYLIST]

\`\`\`
1. First Judges Case (SP Gupta 1981): "Consultation" does NOT mean "Concurrence"; Executive has primacy.
   ↓
2. Second Judges Case (1993): "Consultation" MEANS "Concurrence"; Collegium born (CJI + 2 Senior-most Judges).
   ↓
3. Third Judges Case (1998 Presidential Reference): Collegium expanded to CJI + 4 Senior-most Judges of SC!
   ↓
4. 99th Amendment & NJAC Act (2014): Replaced Collegium with 6-member National Judicial Appointments Commission.
   ↓
5. Fourth Judges Case (2015): SC struck down 99th Amendment & NJAC as UNCONSTITUTIONAL (Judicial independence is basic structure)!
\`\`\`

* **Current System**: **5-Member Collegium (CJI + 4 Senior-most SC Judges)** recommends names for SC appointments.

---

## 4. Qualifications, Tenure and Removal of Supreme Court Judges
* **Qualifications (Article 124(3))**:
  1. Citizen of India.
  2. Has been for at least **5 years a Judge of a High Court**; OR
  3. Has been for at least **10 years an Advocate of a High Court**; OR
  4. Is, in the opinion of the President, a **distinguished jurist**. *(Note: Distinguished jurist applies ONLY to SC, not to High Court!)*
* **Tenure**: Holds office until completing the age of **65 years**.
* **Removal of Supreme Court Judge (Article 124(4) & Judges Enquiry Act 1968)**:
  * **Grounds (2 Only)**: **"Proved Misbehaviour"** or **"Incapacity"**.
  * **Motion**: Signed by 100 members in Lok Sabha or 50 members in Rajya Sabha.
  * **3-Member Inquiry Committee**: 1 SC Judge, 1 HC Chief Justice, 1 Distinguished Jurist.
  * **Special Majority Required**: Passed in each House by:
    1. Majority of the **TOTAL membership** of that House; AND
    2. Majority of **not less than $\frac{2}{3}\text{rd}$ of members present and voting**.
  * *Note: No Supreme Court judge has been removed through impeachment so far (Justice V. Ramaswami in 1993 and Justice Soumitra Sen in 2011 faced proceedings).*

---

## 5. Jurisdictions and Powers of the Supreme Court

### A. Original Jurisdiction (Article 131)
* Exclusive power to hear federal disputes in the first instance:
  1. Between the Centre and one or more States.
  2. Between the Centre and any State(s) on one side and other State(s) on the other.
  3. Between two or more States.
* *Exceptions: Inter-state water disputes (Art 262), Finance Commission matters (Art 280).*

### B. Writ Jurisdiction (Article 32)
* Enforcement of Fundamental Rights (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto).

### C. Appellate Jurisdiction (Articles 132 to 136)
* Constitutional Matters (Art 132), Civil Matters (Art 133), Criminal Matters (Art 134).
* **Special Leave Petition / SLP (Article 136)**: Plenary discretionary power of SC to grant special leave to appeal from any judgment, decree, sentence or order in any cause/matter passed by any court or tribunal in India (except military tribunal).

### D. Advisory Jurisdiction (Article 143)
* President can seek advice of Supreme Court on:
  1. Question of law or fact of public importance (SC may give or refuse advice — *Babri Masjid Reference 1993*).
  2. Dispute arising out of pre-constitutional treaties/agreements (SC is bound to give advice).
  * *Note: The opinion of SC under Art 143 is only advisory and NOT binding on the President.*

### E. Court of Record & Contempt of Court (Article 129)
* Judgments have evidentiary value and cannot be questioned in lower courts. Power to punish for contempt of itself (civil and criminal contempt).

### F. Power of Judicial Review & Complete Justice (Article 142)
* **Article 142**: Power to pass any decree or make any order necessary for doing **"Complete Justice"** in any cause or matter pending before it (*Ayodhya verdict, Bhopal Gas Tragedy, Article 370 case*).

---

## 6. Lecture Sources & Attribution
* **Lecture Sources**:
  * \`Lec 23: Indian Polity Indian Judiciary System Part 01\` (Video ID: \`UZSeK0Cg1LE\`, 113m 39s)
  * \`Lec 24: Indian Polity Indian Judiciary System Part 02\` (Video ID: \`4l4E-7KnAgg\`, 86m 19s)
* **Attribution**: Comprehensive 2-lecture extraction covering Collegium System, NJAC verdict, Article 131 original jurisdiction, Article 136 SLP, and Article 142 complete justice power.
`;

insertChapter.run(
  'polity-ch-14',
  'supreme-court-of-india',
  14,
  'The Union Judiciary: Supreme Court of India & Collegium',
  'Collegium System (1st to 4th Judges Cases), Jurisdictions (Arts 131, 136, 142, 143) & Impeachment',
  'Part V, Chapter IV',
  'Articles 124 to 147',
  40,
  28,
  15,
  100,
  JSON.stringify(['UZSeK0Cg1LE', '4l4E-7KnAgg']),
  ch14_content
);

console.log('✅ Chapter 14 Seeded.');

// ==============================================================================
// CHAPTER 15: HIGH COURTS & SUBORDINATE JUDICIARY
// ==============================================================================
const ch15_content = `# Chapter 15 — The State Judiciary: High Courts, Subordinate Courts & Tribunals

## 1. High Courts of India (Articles 214 to 231)
[FROM PLAYLIST]
**Article 214** provides: *"There shall be a High Court for each State."* However, the **7th Constitutional Amendment Act 1956** authorized Parliament to establish a **Common High Court for two or more States and a Union Territory** (Article 231).

* **Historical Evolution**: High Courts in India originated in **1862** when the High Courts of **Calcutta, Bombay, and Madras** were set up under the *Indian High Courts Act 1861*. **Calcutta High Court (July 1, 1862)** is the oldest High Court in India.
* **Total High Courts in India**: Currently **25 High Courts** (25th High Court: Andhra Pradesh High Court at Amaravati established on January 1, 2019).
* **Common High Courts Examples**:
  * **Calcutta High Court**: Jurisdiction over West Bengal and **Andaman and Nicobar Islands** (Port Blair Circuit Bench).
  * **Bombay High Court**: Maharashtra, Goa, Dadra & Nagar Haveli and Daman & Diu.
  * **Guwahati High Court**: Assam, Nagaland, Mizoram, and Arunachal Pradesh.
  * **Punjab & Haryana High Court**: Punjab, Haryana, and Chandigarh.
  * **Kerala High Court**: Kerala and Lakshadweep.
  * **Madras High Court**: Tamil Nadu and Puducherry.

---

## 2. Appointment, Qualifications & Removal of High Court Judges
* **Appointment (Article 217)**: Appointed by the **President** after consultation with the Chief Justice of India (CJI), the Governor of the state, and the Chief Justice of the High Court.
* **Qualifications (Article 217(2))**:
  1. Citizen of India.
  2. Held a **judicial office in India for at least 10 years**; OR
  3. Been an **advocate of a High Court for at least 10 years**.
  * *Note: Unlike the Supreme Court, a "distinguished jurist" CANNOT be appointed as a High Court judge!*
* **Tenure**: Retires at the age of **62 years** (raised from 60 to 62 by 15th Amendment 1963).
* **Removal**: Removed by the President in the **same manner and on the same grounds as a Supreme Court Judge** (Article 217(1)(b) referring to Article 124(4)).
* **Salaries & Pensions**: Salaries charged on the **Consolidated Fund of the State**; Pensions charged on the **Consolidated Fund of India**!

---

## 3. Writs and Jurisdictions: High Court vs Supreme Court
* **Article 226 vs Article 32**: High Court's writ jurisdiction under Article 226 is **broader** than Supreme Court's Article 32 because High Courts can issue writs not only for Fundamental Rights, but also for **"any other ordinary legal right"**.
* **Superintendence Power (Article 227)**: High Court has administrative and judicial superintendence over all courts and tribunals throughout the territories in relation to which it exercises jurisdiction (except military tribunals).
* **Control over Subordinate Courts (Article 235)**: Posting, promotion, and leave of persons belonging to judicial service of a state are vested in the High Court.

---

## 4. Subordinate Courts (Articles 233 to 237) & Tribunals (Part XIV-A)
* **District Judges Appointment (Article 233)**: Appointed by the **Governor** of the State in consultation with the High Court.
* **Tribunals (Part XIV-A, Articles 323A & 323B)**: Added by **42nd Amendment Act 1976** on Swaran Singh Committee recommendation:
  * **Article 323A**: **Administrative Tribunals** (Central Administrative Tribunal / CAT & State Administrative Tribunals / SAT) for public service disputes.
  * **Article 323B**: Tribunals for other matters (taxation, foreign exchange, industrial disputes, land reforms).
  * *L. Chandra Kumar Case (1997)*: SC ruled that decisions of Tribunals are subject to judicial review before a Division Bench of the High Court under Article 226.

---

## 5. Lecture Sources & Attribution
* **Lecture Source**: \`Lec 26: Indian Polity Indian Judiciary System Part 03\` (Video ID: \`YDX-ZQh2OV8\`, 75m 15s)
* **Attribution**: Comprehensive state judiciary and tribunal jurisprudence extraction.
`;

insertChapter.run(
  'polity-ch-15',
  'high-courts-and-subordinate-judiciary',
  15,
  'The State Judiciary: High Courts, Subordinate Courts & Tribunals',
  '25 High Courts, Common HCs, Art 226 vs Art 32, CAT (Art 323A) & Chandra Kumar Case',
  'Part VI, Chapter V & Part XIV-A',
  'Articles 214 to 237, 323A, 323B',
  35,
  22,
  15,
  98,
  JSON.stringify(['YDX-ZQh2OV8']),
  ch15_content
);

console.log('✅ Chapter 15 Seeded.');

// ==============================================================================
// CHAPTER 16: PANCHAYATI RAJ & LOCAL GOVERNMENT
// ==============================================================================
const ch16_content = `# Chapter 16 — Local Self-Government: Panchayati Raj & Municipalities (73rd & 74th Amendments)

## 1. Introduction & Historical Evolution
[FROM PLAYLIST]
Local Self-Government is the third tier of Indian federal democracy. **Lord Ripon's Resolution of 1882** is hailed as the **"Magna Carta of Local Self-Government in India"** (Lord Ripon is called the *"Father of Local Self-Government in India"*).

**Article 40** in the DPSP directed the state to organize village panchayats. In October 1952, Government launched the **Community Development Programme (CDP)** and National Extension Service (1953) to promote rural development.

---

## 2. Milestone Committees on Panchayati Raj

| Committee | Year | Key Recommendations |
| :--- | :--- | :--- |
| **Balwant Rai Mehta Committee** | 1957 | Recommended **3-Tier Panchayati Raj System**: Gram Panchayat (Village), Panchayat Samiti (Block), Zilla Parishad (District). Introduced the term **"Democratic Decentralisation"**. |
| **Ashok Mehta Committee** | 1977 | Recommended **2-Tier System**: Mandal Panchayat (15,000–20,000 population) and Zilla Parishad (District). Recommended official participation of political parties. |
| **G.V.K. Rao Committee** | 1985 | Appointed by Planning Commission; described bureaucracy as *"Grass without roots"*; recommended district as the basic unit of planning. |
| **L.M. Singhvi Committee** | 1986 | **Recommended Constitutional Recognition** for Panchayati Raj bodies; recommended constitutional protection for regular elections. |
| **P.K. Thungon Committee** | 1988 | Recommended constitutional recognition, 5-year fixed tenure, and 3-tier structure. |

* **First State to Adopt Panchayati Raj**: **Rajasthan** (inaugurated by Jawaharlal Nehru at **Nagaur district on October 2, 1959**), followed by Andhra Pradesh.

---

## 3. The 73rd Constitutional Amendment Act of 1992 (Panchayati Raj)
[FROM PLAYLIST]
* Added **Part IX** (Articles 243 to 243-O) titled *"The Panchayats"*.
* Added the **Eleventh Schedule** containing **29 Functional Items** (Article 243G).
* Came into force on **April 24, 1993** (Celebrated as **National Panchayati Raj Day**).

### Key Provisions of Part IX:
* **Article 243A (Gram Sabha)**: Village assembly consisting of all registered voters in the panchayat area (direct democracy foundation).
* **Article 243B (Three-Tier System)**:
  1. **Gram Panchayat** at village level.
  2. **Panchayat Samiti** at intermediate/block level.
  3. **Zilla Parishad** at district level.
  * *Exception: States having a population not exceeding 20 Lakhs may not constitute the intermediate tier.*
* **Article 243D (Reservations)**:
  * Reservation for SCs and STs in proportion to their population.
  * **Not less than $\frac{1}{3}\text{rd}$ (33.3%) of total seats reserved for WOMEN** (including SC/ST women). *(Many states like West Bengal, Bihar, MP have increased women reservation to 50%).*
* **Article 243E (Duration)**: Fixed term of **5 years**. If dissolved prematurely, elections must be held within **6 months**.
* **Article 243K (State Election Commission)**: Independent body headed by State Election Commissioner appointed by Governor for superintendence, direction, and control of panchayat elections.
* **Article 243-I (State Finance Commission)**: Constituted by Governor every **5 years** to review financial position and recommend revenue distribution between State and Panchayats.

---

## 4. The 74th Constitutional Amendment Act of 1992 (Municipalities)
[FROM PLAYLIST]
* Added **Part IX-A** (Articles 243P to 243ZG) titled *"The Municipalities"*.
* Added the **Twelfth Schedule** containing **18 Functional Items** (Article 243W).
* Came into force on **June 1, 1993**.
* **Three Types of Municipalities (Article 243Q)**:
  1. **Nagar Panchayat**: For transitional areas (rural to urban).
  2. **Municipal Council (Municipality)**: For smaller urban areas.
  3. **Municipal Corporation**: For larger urban areas (e.g. Kolkata Municipal Corporation).
* **First Municipal Corporation in India**: **Madras Municipal Corporation (1688)**.

---

## 5. PESA Act of 1996 (Panchayats Extension to Scheduled Areas)
* Enacted on the recommendations of the **Bhuria Committee (1995)**.
* Extends the provisions of Part IX to the **Fifth Schedule Scheduled Areas** across 10 states (Andhra, Telangana, Chhattisgarh, Gujarat, Himachal, Jharkhand, MP, Maharashtra, Odisha, Rajasthan).
* Empowers the **Gram Sabha** to safeguard tribal traditions, control minor forest produce (MFP), approve developmental plans, and prevent land alienation.

---

## 6. Lecture Sources & Attribution
* **Lecture Source**: \`Lec 27: Indian Polity Panchayat Raj System\` (Video ID: \`JPQ9OpyW-yw\`, 90m 22s)
* **Attribution**: Complete extraction of Balwant Rai & Ashok Mehta committees, 73rd & 74th Amendments, 11th & 12th Schedules, and PESA Act 1996.
`;

insertChapter.run(
  'polity-ch-16',
  'panchayati-raj-and-local-government',
  16,
  'Local Self-Government: Panchayati Raj & Municipalities',
  '73rd & 74th Amendments, 11th & 12th Schedules, 3-Tier System, Balwant Rai Committee & PESA 1996',
  'Part IX & Part IX-A',
  'Articles 243 to 243ZG',
  35,
  24,
  15,
  99,
  JSON.stringify(['JPQ9OpyW-yw']),
  ch16_content
);

console.log('✅ Chapter 16 Seeded.');
console.log('🎉 Chapters 13–16 Successfully Seeded into Database!');
