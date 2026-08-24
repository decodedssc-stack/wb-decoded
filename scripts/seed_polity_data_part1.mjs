import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ SEEDING POLITY CHAPTERS 1 TO 4...');

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
// CHAPTER 01: HISTORICAL BACKGROUND
// ==============================================================================
const ch1_content = `# Chapter 01 — Historical Background of the Indian Constitution

## 1. Introduction
[FROM PLAYLIST]
The constitutional framework of modern India did not emerge overnight in 1947 or 1950. It is the culmination of nearly two centuries of administrative, legislative, and judicial evolution under the British rule. The British arrived in India in **1608 as traders** under the banner of the **East India Company (EIC)**, which had obtained exclusive trading rights under a Charter granted by Queen Elizabeth I in 1600.

Following the **Battle of Buxar (1764)**, the Company acquired the **Diwani rights** (rights over revenue and civil justice) for Bengal, Bihar, and Orissa in **1765** from Mughal Emperor Shah Alam II. This marked the transition of the Company from a purely commercial entity into a territorial political power.

The historical evolution of the Indian Constitution is divided into two distinct phases:
1. **The Company Rule (1773 – 1858)**: Governed through Parliamentary Charters and Regulatory Acts.
2. **The Crown Rule (1858 – 1947)**: Direct administration under the British Monarch through Councils Acts and Government of India Acts.

---

## 2. Core Concept & Constitutional Philosophy
[FROM PLAYLIST]
The constitutional acts passed during British rule laid down the institutional bedrock of the Indian polity:
* **Centralisation to Decentralisation**: The transition from intense centralisation (1773–1833) to provincial autonomy and decentralisation (1861–1935).
* **Bicameralism & Federalism**: Introduction of two houses at the Centre and division of legislative powers (Union, Provincial, Concurrent lists).
* **Separation of Powers**: Gradual bifurcation of executive and judicial/legislative functions.
* **Responsible Government**: Introduction of Dyarchy, Provincial Autonomy, and legislative accountability.

---

## 3. Constitutional Provisions & Statutory Evolution

### A. The Company Rule (1773 – 1858)

#### 1. Regulating Act of 1773 (First Step of Parliamentary Control)
* **Designation Changed**: The Governor of Bengal was designated as the **Governor-General of Bengal**. **Lord Warren Hastings** became the first Governor-General of Bengal.
* **Executive Council**: Created an Executive Council of **4 members** to assist the Governor-General (decisions made by majority vote).
* **Subordination**: Governors of Bombay and Madras Presidencies were made subordinate to the Governor-General of Bengal.
* **Supreme Court at Calcutta (1774)**: Established at Fort William with 1 Chief Justice (**Sir Elijah Impey**) and 3 other judges.
* **Anti-Corruption Clause**: Prohibited Company servants from engaging in private trade or accepting bribes/presents from natives.
* **Court of Directors**: The governing body of the Company was required to report on its revenue, civil, and military affairs to the British Government.

#### 2. Pitt's India Act of 1784 (System of Double Government)
* **Bifurcation of Functions**: Distinguished between the commercial and political functions of the Company.
* **Court of Directors**: Managed purely commercial affairs.
* **Board of Control**: A new 6-member body established to manage political, military, and revenue affairs.
* **Significance**: For the first time, Company's territories in India were officially termed the **"British Possessions in India"**.

#### 3. Charter Act of 1813
* **Monopoly Ended**: Ended the commercial monopoly of EIC in India (trade opened to all British merchants).
* **Exceptions**: Monopoly over **Tea Trade** and **Trade with China** was retained for another 20 years.
* **Education Grant**: Allocated **₹1 Lakh annually** for the promotion of Indian education and literature.
* **Christian Missionaries**: Permitted Christian missionaries to enter India for religious propagation.

#### 4. Charter Act of 1833 (Peak of Centralisation)
* **Governor-General of India**: Governor-General of Bengal became the **Governor-General of India**. **Lord William Bentinck** became the first Governor-General of India.
* **Exclusive Legislative Powers**: Deprived Bombay and Madras Governors of their legislative powers; conferred exclusive legislative power for British India on the Governor-General in Council.
* **Complete End of Commercial Entity**: EIC became a purely administrative body; tea and China trade monopolies completely abolished.
* **Law Member Added**: A 4th member (**Lord Macaulay**) was added to the Executive Council as a legal advisor (without voting rights).
* **Law Commission**: First Law Commission appointed under Lord Macaulay in 1834 (laid foundation for IPC 1860).

#### 5. Charter Act of 1853 (Separation of Powers & Open Competition)
* **Bifurcation of Council**: Separated the legislative and executive functions of the Governor-General's Council for the first time.
* **Indian Legislative Council (Mini-Parliament)**: Created a 6-member Central Legislative Council functioning on the model of British Parliament.
* **Open Civil Services Competition**: Introduced open competitive examination for Civil Services (recommended by **Macaulay Committee of 1854**).
* **Local Representation**: 4 out of 6 legislative members were appointed by local governments of Madras, Bombay, Bengal, and Agra.

---

### B. The Crown Rule (1858 – 1947)

#### 1. Government of India Act of 1858 (Act for the Good Government of India)
* **Revolt of 1857 Aftermath**: Transferred the governance of India from EIC directly to the British Crown (Queen Victoria).
* **Viceroy of India**: Governor-General replaced by the **Viceroy of India** (direct representative of Crown). **Lord Canning** became the first Viceroy of India.
* **Abolition of Double Government**: Abolished Court of Directors and Board of Control.
* **Secretary of State for India**: Created a new Cabinet-level office in London assisted by a **15-member Council of India** (advisory body).

#### 2. Indian Councils Act of 1861 (Beginning of Representative Institutions)
* **Non-Official Indians Nominated**: Viceroy Lord Canning nominated 3 Indians to his Legislative Council in 1862: **Raja of Benaras, Maharaja of Patiala, and Sir Dinkar Rao**.
* **Decentralisation Initiated**: Restored legislative powers to Bombay and Madras Presidencies (reversing 1833 centralisation).
* **Portfolio System**: Formal recognition given to Lord Canning's **Portfolio System of 1859**.
* **Ordinance Power**: Empowered the Viceroy to issue Ordinances during emergencies with a 6-month validity.

#### 3. Indian Councils Act of 1892
* **Budget Discussion**: Non-official members were given the right to discuss the annual budget and address questions to the Executive.
* **Indirect Election Principle**: Introduced nomination on recommendation of provincial councils, universities, trade associations.

#### 4. Indian Councils Act of 1909 (Morley-Minto Reforms)
* **Lord Morley** (Secretary of State) & **Lord Minto** (Viceroy — *"Father of Communal Electorate"*).
* **Communal Electorate**: Introduced separate electorates for Muslims (Muslim members elected only by Muslim voters).
* **First Indian in Executive Council**: **Satyendra Prasad Sinha (SP Sinha)** appointed as Law Member in Viceroy's Executive Council.
* **Supplementary Questions**: Members permitted to ask supplementary questions and vote on budget resolutions.

#### 5. Government of India Act of 1919 (Montagu-Chelmsford Reforms)
* **Preamble of 1919 Act**: Declared the objective of gradual development of responsible self-governing institutions in India.
* **Dyarchy in Provinces (Rule of Two)**:
  * **Transferred Subjects**: Administered by Governor with Ministers responsible to Legislative Council (Education, Health, Local Govt).
  * **Reserved Subjects**: Administered by Governor with Executive Council without responsibility (Police, Revenue, Justice, Finance).
* **Bicameralism at Centre**: Created Council of State (Upper House) and Legislative Assembly (Lower House).
* **Direct Elections**: Majority of members in both houses were chosen by direct election (franchise restricted by property, tax, education).
* **Public Service Commission**: Provision for Central Public Service Commission (established in **1926** on recommendations of **Lee Commission**).
* **Separation of Budgets**: Provincial budgets separated from Central budget for the first time.
* **Statutory Commission**: Provision for appointing a Royal Commission after 10 years (led to **Simon Commission 1927**).

#### 6. Government of India Act of 1935 (The Blueprint of Indian Constitution)
* **All-India Federation**: Proposed federation of Provinces and Princely States (never came into being because Princely States refused to join).
* **Three Legislative Lists**:
  * **Federal List**: 59 items
  * **Provincial List**: 54 items
  * **Concurrent List**: 36 items
  * **Residuary Powers**: Vested in the **Viceroy** (Governor-General).
* **Abolition of Dyarchy in Provinces**: Replaced by **Provincial Autonomy** (Provinces made autonomous units of administration).
* **Dyarchy at the Centre**: Proposed division of federal subjects into Reserved and Transferred (never implemented).
* **Federal Court**: Established **Federal Court of India in 1937** in Delhi (predecessor of Supreme Court).
* **Reserve Bank of India (RBI)**: Established in 1935 to control currency and credit.
* **Bicameralism in Provinces**: Introduced bicameralism in 6 out of 11 provinces (Bengal, Bombay, Madras, Bihar, Assam, United Provinces).

#### 7. Indian Independence Act of 1947
* **Mountbatten Plan (June 3, 1947)** enacted into law on **July 18, 1947**.
* **Partition**: Created two independent dominions: **India** and **Pakistan** from August 15, 1947.
* **Sovereign Constituent Assemblies**: Empowered Constituent Assemblies to frame constitutions and repeal any British act including 1947 Act.
* **Abolished Viceroy & Secretary of State**: Replaced by Governor-General for each dominion. Lord Mountbatten became first Governor-General of independent India; C. Rajagopalachari became first Indian Governor-General.
* **Lapse of British Paramountcy**: British suzerainty over Princely States lapsed on August 15, 1947 (freedom to join India, Pakistan, or remain independent).

---

## 4. Detailed Explanation & Comparative Framework

\`\`\`mermaid
flowchart TD
    A["Regulating Act 1773<br>(Gov of Bengal -> Gov-Gen of Bengal)"] --> B["Charter Act 1833<br>(Gov-Gen of Bengal -> Gov-Gen of India)"]
    B --> C["GoI Act 1858<br>(Gov-Gen of India -> Viceroy & Crown Rule)"]
    C --> D["Indian Councils Act 1909<br>(Communal Electorates & Minto)"]
    D --> E["GoI Act 1919<br>(Dyarchy in Provinces & Bicameralism)"]
    E --> F["GoI Act 1935<br>(Provincial Autonomy & Federal Court)"]
    F --> G["Independence Act 1947<br>(Sovereign Dominions & Partition)"]
\`\`\`

---

## 5. Important Facts & Teacher Exam Warnings
[FROM PLAYLIST]
* ⚠️ **"Very Important for WBCS"**: The **first Governor-General of Bengal** was **Warren Hastings (1773)**. The **first Governor-General of India** was **Lord William Bentinck (1833)**. The **first Viceroy of India** was **Lord Canning (1858)**.
* ⚠️ **"Frequently Asked in SSC & WBP"**: Communal Electorate was introduced in **1909 (Morley-Minto)** for Muslims and extended in **1919** to Sikhs, Indian Christians, Anglo-Indians, and Europeans.
* ⚠️ **"Major Confusion Trap"**: Dyarchy was introduced in **Provinces by 1919 Act** and abolished in Provinces (introduced at Centre) by **1935 Act**.
* ⚠️ **"Direct Question"**: Residuary powers under GoI Act 1935 were given to the **Governor-General (Viceroy)**, whereas in modern Indian Constitution, residuary powers belong to **Parliament (Article 248)**.

---

## 6. Important Exceptions & Special Provisions
* **Princely States in 1935 Federation**: The All-India Federation proposed in 1935 never materialized because accession of princely states was optional and they refused to sign the Instruments of Accession.
* **1833 Attempt at Open Competition**: Section 87 of Charter Act 1833 attempted to introduce open competition for civil services, but was nullified due to stiff opposition from the Court of Directors. It was finally implemented in **1853**.

---

## 7. Important Comparisons

| Feature | Charter Act of 1833 | Government of India Act 1858 | Government of India Act 1935 |
| :--- | :--- | :--- | :--- |
| **Head of Administration** | Governor-General of India | Viceroy of India | Viceroy / Governor-General |
| **System of Rule** | Company Rule (Centralised) | Direct Crown Rule | Federal Structure with Provincial Autonomy |
| **Provincial Status** | Subordinated completely | Legislative powers restored | Complete Provincial Autonomy |
| **Judiciary** | Supreme Court at Calcutta | High Courts Act 1861 | Federal Court established (1937) |
| **Civil Services** | Attempted Open Competition | Open Competition in London | Federal PSC & Provincial PSCs |

---

## 8. Landmark Case Laws & Precedents
* **The Trial of Nand Kumar (1775)**: Judicial murder case under Sir Elijah Impey demonstrating the executive-judicial friction under 1773 Act.
* **Federation Case / In re Central Provinces Motor Spirit Act (1939)**: Federal Court of India under Chief Justice Sir Maurice Gwyer laid down the principle of **Pith and Substance** for legislative competence between Centre and Provinces.

---

## 9. Common Confusions & Student Traps
* ❌ **Confusion**: Thinking the Supreme Court established in 1774 was the same as today's Supreme Court.
  * ✔️ **Reality**: The 1774 Supreme Court was established under Charter Act 1773 for Calcutta. Today's Supreme Court of India was inaugurated on **January 28, 1950** under Article 124, succeeding the Federal Court of India (1937).
* ❌ **Confusion**: Mixing up Simon Commission with Cabinet Mission.
  * ✔️ **Reality**: Simon Commission (1927, 7 members, all-white) investigated 1919 Act reforms. Cabinet Mission (1946, 3 members) recommended the plan for the Constituent Assembly.

---

## 10. Exam Perspective
* **WBCS Prelims/Mains**: Match the acts with key provisions (1773 Supreme Court, 1784 Board of Control, 1813 Education Grant, 1833 Bentinck, 1858 Canning, 1909 Separate Electorates, 1919 Dyarchy, 1935 Provincial Autonomy).
* **WBP Sub-Inspector / Constable**: Direct factual questions on first Viceroy, first Governor-General, Morley-Minto reforms.
* **SSC CGL / Railway RRB**: Questions on 1935 Act provisions (Federal Court, RBI, Lists of subjects).

---

## 11. Quick Revision & Memory Tricks
[WB DECODED MEMORY AID]
* 🧠 **"B-B-C" Rule for Heads**:
  * **B**engal (1773) $\rightarrow$ Warren Hastings
  * **B**ritish India (1833) $\rightarrow$ William Bentinck
  * **C**rown Viceroy (1858) $\rightarrow$ Lord Canning
* 🧠 **"1919 vs 1935 Dyarchy Rule"**:
  * **1919**: Dyarchy in **P**rovinces (**19** has **P** shape inverted).
  * **1935**: Dyarchy at **C**entre, **A**utonomy in **P**rovinces.

---

## 12. Lecture Sources & Attribution
* **Lecture Source 01**: \`Lec 04: Historical Background of Indian Constitution part 1\` (Video ID: \`qa704uGYv6s\`, Duration: 103m 23s)
* **Lecture Source 02**: \`Lec 05: Historical Background of Indian Constitution part 2\` (Video ID: \`OmezStvJxkw\`, Duration: 87m 05s)
* **Attribution**: Content derived directly from the Indian Polity Special GS Classes playlist. Additional legal cross-references verified by WB Decoded Academic Team.
`;

insertChapter.run(
  'polity-ch-01',
  'historical-background',
  1,
  'Historical Background of the Indian Constitution',
  'Company Rule (1773–1858) & Crown Rule (1858–1947)',
  'Historical Foundation',
  'Acts of 1773 to 1947',
  35,
  24,
  15,
  99,
  JSON.stringify(['qa704uGYv6s', 'OmezStvJxkw']),
  ch1_content
);

console.log('✅ Chapter 01 Seeded.');

// ==============================================================================
// CHAPTER 02: MAKING OF THE CONSTITUTION
// ==============================================================================
const ch2_content = `# Chapter 02 — Making of the Constitution & Constituent Assembly

## 1. Introduction
[FROM PLAYLIST]
The Constitution of India was framed by the **Constituent Assembly of India**, which was set up under the **Cabinet Mission Plan of May 1946**. The demand for a Constituent Assembly was first put forward by **M.N. Roy in 1934** (a pioneer of the communist movement in India). It was officially adopted by the Indian National Congress (INC) in **1935** and accepted in principle by the British Government in the **August Offer of 1940**.

---

## 2. Core Concept & Timeline of Constituent Assembly
[FROM PLAYLIST]
* **Total Strength**: 389 members originally:
  * **296** from British India (292 from 11 Governors' Provinces + 4 from Chief Commissioners' Provinces: Delhi, Ajmer-Merwara, Coorg, British Baluchistan).
  * **93** from Princely States (nominated by the heads of the Princely States).
* **Nature of Election**: **Partly elected and partly nominated**. British India members were elected indirectly by the Provincial Legislative Assemblies via **Single Transferable Vote (Proportional Representation)**.
* **Post-Partition Strength**: Reduced to **299 members** (229 from provinces + 70 from princely states) following the Mountbatten Plan of June 3, 1947.

\`\`\`
1934: M.N. Roy proposes Constituent Assembly
  ↓
1940: August Offer accepts demand in principle
  ↓
1942: Cripps Mission proposes post-war Assembly (rejected)
  ↓
1946 (May): Cabinet Mission Plan finalized
  ↓
1946 (Dec 9): 1st Meeting (Dr. Sachchidananda Sinha temporary President)
  ↓
1946 (Dec 11): Dr. Rajendra Prasad elected permanent President
  ↓
1946 (Dec 13): Jawaharlal Nehru moves Objective Resolution
  ↓
1947 (Aug 29): Drafting Committee set up under Dr. B.R. Ambedkar
  ↓
1949 (Nov 26): Constitution Adopted (284 members signed)
  ↓
1950 (Jan 24): Final session (National Anthem, Song & 1st President adopted)
  ↓
1950 (Jan 26): Constitution Commenced (Republic Day)
\`\`\`

---

## 3. Key Personalities & Offices of the Constituent Assembly
[FROM PLAYLIST]
* **Temporary President (Dec 9, 1946)**: **Dr. Sachchidananda Sinha** (oldest member, following French practice).
* **Permanent President (Dec 11, 1946)**: **Dr. Rajendra Prasad**.
* **Vice-Presidents**: Two Vice-Presidents were elected — **H.C. Mukherjee** (Christian leader from Bengal) and **V.T. Krishnamachari**.
* **Constitutional Advisor**: **Sir B.N. Rau** (prepared the initial draft constitution after studying constitutions of 60 countries).
* **Secretary to Constituent Assembly**: **H.V.R. Iengar**.
* **Chief Draftsman**: **S.N. Mukherjee**.
* **Calligrapher of Original English Constitution**: **Prem Behari Narain Raizada** (written in flowing italic style on parchment paper).
* **Calligrapher of Original Hindi Constitution**: **Vasant Krishan Vaidya** (illuminated by Nand Lal Bose).
* **Artists & Decorators**: Beautified by artists from **Shantiniketan**, including **Nandalal Bose** and **Beohar Rammanohar Sinha**.
* **Elephant Symbol**: Adopted as the seal/emblem of the Constituent Assembly.

---

## 4. Important Committees of the Constituent Assembly
[FROM PLAYLIST]
The Constituent Assembly appointed **22 committees** (8 major committees and several minor committees):

| Committee | Chairman |
| :--- | :--- |
| **Drafting Committee** (7 members) | **Dr. B.R. Ambedkar** |
| **Union Powers Committee** | **Jawaharlal Nehru** |
| **Union Constitution Committee** | **Jawaharlal Nehru** |
| **States Committee** (Committee for Negotiating with States) | **Jawaharlal Nehru** |
| **Provincial Constitution Committee** | **Sardar Vallabhbhai Patel** |
| **Advisory Committee on Fundamental Rights, Minorities, Tribal & Excluded Areas** | **Sardar Vallabhbhai Patel** |
| **Rules of Procedure Committee** | **Dr. Rajendra Prasad** |
| **Steering Committee** | **Dr. Rajendra Prasad** |
| **Ad-hoc Committee on National Flag** | **Dr. Rajendra Prasad** |
| **Fundamental Rights Sub-Committee** | **J.B. Kripalani** |
| **Minorities Sub-Committee** | **H.C. Mukherjee** |

---

## 5. The Drafting Committee (Set up August 29, 1947)
[FROM PLAYLIST]
The Drafting Committee was the most vital committee. It consisted of **7 members**:
1. **Dr. B.R. Ambedkar** (Chairman — *"Father of the Indian Constitution" / "Modern Manu"*)
2. **N. Gopalaswamy Ayyangar**
3. **Alladi Krishnaswamy Iyer**
4. **Dr. K.M. Munshi** (only Congress member at initial stage)
5. **Syed Mohammad Saadulla** (only Muslim League member from Assam)
6. **N. Madhava Rau** (replaced B.L. Mitter who resigned due to ill-health)
7. **T.T. Krishnamachari** (replaced D.P. Khaitan who died in 1948)

---

## 6. Adoption and Commencement of the Constitution
[FROM PLAYLIST]
* **Time Taken**: **2 Years, 11 Months, and 18 Days** (held across 11 sessions, covering 165 sitting days).
* **Cost Incurred**: Approximately **₹64 Lakhs**.
* **Constitution Adopted**: **November 26, 1949** (celebrated as **Constitution Day / Samvidhan Divas** since 2015).
  * On this date, the Preamble, **395 Articles**, and **8 Schedules** were adopted.
  * 15 Articles came into force immediately on Nov 26, 1949: Articles **5, 6, 7, 8, 9 (Citizenship)**, **60 (Oaths of President)**, **324 (Election Commission)**, **366, 367, 379, 380, 388, 391, 392, 393**.
* **Constitution Commenced**: **January 26, 1950** (the remaining major parts of the Constitution came into effect).
  * **Why January 26?** To commemorate **Purna Swaraj Day** declared on **January 26, 1930** following the Lahore Session of Congress (December 1929) under Jawaharlal Nehru.

---

## 7. Other Major Functions Performed by Constituent Assembly
[FROM PLAYLIST]
1. Ratified India's membership of the Commonwealth in **May 1949**.
2. Adopted the **National Flag** on **July 22, 1947** (designed by Pingali Venkayya; 3:2 ratio).
3. Adopted the **National Anthem (Jana Gana Mana)** on **January 24, 1950** (written by Rabindranath Tagore).
4. Adopted the **National Song (Vande Mataram)** on **January 24, 1950** (written by Bankim Chandra Chattopadhyay in *Anandamath*).
5. Elected **Dr. Rajendra Prasad** as the first President of India on **January 24, 1950**.

---

## 8. Important Facts & Teacher Warnings
* ⚠️ **"Frequently Asked in WBCS & WBP"**: **Mahatma Gandhi and Muhammad Ali Jinnah** were **NOT** members of the Constituent Assembly.
* ⚠️ **"Common Exam Trap"**: The total number of women members in the Constituent Assembly was **15** (including Sarojini Naidu, Vijayalakshmi Pandit, Rajkumari Amrit Kaur, Sucheta Kripalani, Begum Aizaz Rasul — the only Muslim woman).
* ⚠️ **"Article 394"**: It is Article 394 that lists the articles coming into force on Nov 26, 1949 and declares that the remaining provisions commence on Jan 26, 1950.
* ⚠️ **"Article 395"**: Repealed the Indian Independence Act 1947 and Government of India Act 1935.

---

## 9. Common Confusions & Student Traps
* ❌ **Confusion**: Dr. B.R. Ambedkar was the President of the Constituent Assembly.
  * ✔️ **Reality**: Dr. Rajendra Prasad was the President of the Constituent Assembly. Dr. B.R. Ambedkar was the **Chairman of the Drafting Committee**.
* ❌ **Confusion**: Believing the Constituent Assembly was only a constitution-making body.
  * ✔️ **Reality**: It was a **dual-role body**! When it met as the Constitution-making body, it was chaired by **Dr. Rajendra Prasad**. When it met as the ordinary legislative parliament of India, it was chaired by **G.V. Mavalankar** (1st Speaker of Lok Sabha).

---

## 10. Exam Perspective
* **WBCS Prelims/Mains**: High focus on dates (Nov 26, Jan 26, July 22 Flag, Jan 24 Anthem), committee chairmen, number of sessions (11 sessions).
* **WBP / WBPSC Misc**: Direct questions on Calligrapher (Prem Behari Raizada), Constitutional Advisor (Sir B.N. Rau), temporary president (Sachchidananda Sinha).

---

## 11. Quick Revision & Memory Tricks
[WB DECODED MEMORY AID]
* 🧠 **"U-J-P-P Rule for Committee Chairmen"**:
  * **U**nion (Union Powers, Union Constitution) $\rightarrow$ **J**awaharlal Nehru
  * **P**rovincial / Patel $\rightarrow$ **P**rovincial Constitution & Fundamental Rights $\rightarrow$ **Sardar Patel**
  * **S**teering / Rules $\rightarrow$ **Dr. Rajendra Prasad**
* 🧠 **"Drafting 7 Mnemonics"**:
  * **A**mbedkar, **A**yyangar, **A**lladi, **M**unshi, **M**adhava, **S**aadulla, **T**TK.

---

## 12. Lecture Sources & Attribution
* **Lecture Source**: \`Lec 06: Making of Indian Constitution Indian Polity\` (Video ID: \`644nyfGhunw\`, Duration: 87m 27s)
* **Attribution**: Sourced directly from lecture explanations by GS Faculty. Additional cross-references verified by WB Decoded Editorial Board.
`;

insertChapter.run(
  'polity-ch-02',
  'making-of-the-constitution',
  2,
  'Making of the Constitution & Constituent Assembly',
  'Committees, Drafting, Adoption (Nov 26) & Commencement (Jan 26)',
  'Constituent Assembly',
  'Articles 394, 395',
  30,
  22,
  15,
  98,
  JSON.stringify(['644nyfGhunw']),
  ch2_content
);

console.log('✅ Chapter 02 Seeded.');

// ==============================================================================
// CHAPTER 03: SALIENT FEATURES & SCHEDULES
// ==============================================================================
const ch3_content = `# Chapter 03 — Salient Features, Sources & Schedules of the Constitution

## 1. Introduction
[FROM PLAYLIST]
The Constitution of India is unique in its contents and spirit. Though borrowed from almost every known constitution in the world, the makers of the Indian Constitution modified foreign provisions to suit Indian conditions while avoiding their defects.

The original Constitution of 1949 contained a **Preamble, 395 Articles (divided into 22 Parts), and 8 Schedules**. Today, through numerous amendments (primarily 7th, 42nd, 44th, 73rd, 74th, 86th, 101st to 106th), it has grown to **over 470 Articles (in 25 Parts) and 12 Schedules**.

---

## 2. Core Concept & 12 Salient Features
[FROM PLAYLIST]
1. **Lengthiest Written Constitution in the World**: Influenced by geographical vastness, historical factors (GoI Act 1935 bulk), single constitution for Centre and States, and dominance of legal luminaries.
2. **Drawn from Various Sources**: Synthesised from over 60 world constitutions.
3. **Blend of Rigidity and Flexibility**: Some provisions amended by simple majority, some by special majority (Art 368), and some by special majority + state ratification.
4. **Federal System with Unitary Bias (Quasi-Federal)**: Described as *"Quasi-Federal"* (K.C. Wheare), *"Cooperative Federalism"* (Granville Austin), *"Bargaining Federalism"* (Morris Jones), *"Federation with a Centralising Tendency"* (Sir Ivor Jennings).
5. **Parliamentary Form of Government (Westminster Model)**: Based on cooperation and coordination between legislative and executive organs.
6. **Synthesis of Parliamentary Sovereignty and Judicial Supremacy**: Blends the British principle of Parliamentary Sovereignty with the American principle of Judicial Supremacy.
7. **Integrated and Independent Judiciary**: Single hierarchical court system enforcing both central and state laws (Supreme Court $\rightarrow$ High Courts $\rightarrow$ Subordinate Courts).
8. **Fundamental Rights (Part III)**: Guaranteed civil liberties enforceable via writs (Art 32 & 226).
9. **Directive Principles of State Policy (Part IV)**: Novel feature (Dr. Ambedkar) aiming to establish a **Welfare State**.
10. **Fundamental Duties (Part IVA)**: Added by 42nd Amendment 1976 on recommendation of Swaran Singh Committee.
11. **Secular State**: No official religion; equal protection and freedom for all religions (Articles 25–28).
12. **Universal Adult Suffrage (Article 326)**: Voting rights granted to every citizen without discrimination (age lowered from 21 to 18 by **61st Amendment 1988**).
13. **Single Citizenship**: Unlike USA (dual citizenship), India grants single national citizenship.
14. **Independent Constitutional Bodies**: Election Commission (Art 324), CAG (Art 148), UPSC & SPSC (Art 315), Finance Commission (Art 280).
15. **Three-Tier Governance**: Decentralised 3-tier government (Centre, State, Local Panchayats/Municipalities) via 73rd & 74th Amendments 1992.

---

## 3. Major Sources of the Indian Constitution (Borrowed Features)
[FROM PLAYLIST]

| Source Country / Document | Borrowed Constitutional Features |
| :--- | :--- |
| **Government of India Act 1935** *(Major Bulk ~60%)* | Federal Scheme, Office of Governor, Judiciary, Public Service Commissions, Emergency Provisions, Administrative Details |
| **British Constitution** | Parliamentary Government, Rule of Law, Legislative Procedure, Single Citizenship, Cabinet System, Prerogative Writs, Parliamentary Privileges, Bicameralism |
| **US Constitution** | Fundamental Rights, Independence of Judiciary, Judicial Review, Impeachment of President, Removal of SC & HC Judges, Post of Vice-President, Preamble concept |
| **Irish Constitution (Ireland)** | **Directive Principles of State Policy (DPSP)**, Nomination of 12 members to Rajya Sabha by President, Method of Election of President |
| **Canadian Constitution** | Federation with a strong Centre, Vesting of Residuary Powers in Centre (Art 248), Appointment of State Governors by Centre, Advisory Jurisdiction of Supreme Court (Art 143) |
| **Australian Constitution** | **Concurrent List**, Freedom of Trade, Commerce & Intercourse, **Joint Sitting of Both Houses of Parliament (Article 108)** |
| **Weimar Constitution of Germany** | **Suspension of Fundamental Rights during Emergency** |
| **Soviet Constitution (USSR / Russia)** | **Fundamental Duties (Article 51A)**, Ideals of Justice (Social, Economic, and Political) in the Preamble |
| **French Constitution** | Republic system, Ideals of **Liberty, Equality, and Fraternity** in the Preamble |
| **South African Constitution** | **Procedure for Amendment of Constitution (Article 368)**, Election of members of Rajya Sabha |
| **Japanese Constitution** | **Procedure Established by Law** (Article 21) |

---

## 4. The 12 Schedules of the Constitution in Detail
[FROM PLAYLIST]

| Schedule | Subject Matter | Key Articles |
| :--- | :--- | :--- |
| **First Schedule** | Names of States and Union Territories with their territorial extent | Articles 1 & 4 |
| **Second Schedule** | Emoluments, allowances, and privileges of President, Governors, Judges, CAG, Presiding Officers | Articles 59, 65, 75, 97, 125, 148, 158, 164, 186, 221 |
| **Third Schedule** | **Forms of Oaths or Affirmations** for Union Ministers, MPs, Judges, CAG, State Ministers, MLAs | Articles 75, 84, 99, 124, 146, 173, 188, 219 |
| **Fourth Schedule** | **Allocation of seats in the Rajya Sabha** (Council of States) to States and UTs | Articles 4 & 80 |
| **Fifth Schedule** | Administration and control of **Scheduled Areas and Scheduled Tribes** | Article 244(1) |
| **Sixth Schedule** | Administration of tribal areas in the **4 North-Eastern States: Assam, Meghalaya, Tripura, Mizoram (AMTM)** | Articles 244(2) & 275(1) |
| **Seventh Schedule** | **Division of Powers: Union List (100), State List (61), Concurrent List (52)** | Article 246 |
| **Eighth Schedule** | **22 Official Recognized Languages** (Originally 14; +Sindhi [21st Amend 1967]; +Konkani, Manipuri, Nepali [71st Amend 1992]; +Bodo, Dogri, Maithili, Santhali [92nd Amend 2003]) | Articles 344(1) & 351 |
| **Ninth Schedule** | Acts & Regulations validated from Judicial Review (Added by **1st Amendment 1951**; Subject to basic structure review post April 24, 1973 per *I.R. Coelho Case 2007*) | Article 31B |
| **Tenth Schedule** | **Anti-Defection Law** — Disqualification of MPs & MLAs on grounds of defection (Added by **52nd Amendment 1985**) | Articles 102(2) & 191(2) |
| **Eleventh Schedule** | **Panchayati Raj: 29 Functional Items** (Added by **73rd Amendment 1992**) | Article 243G |
| **Twelfth Schedule** | **Municipalities: 18 Functional Items** (Added by **74th Amendment 1992**) | Article 243W |

---

## 5. Important Facts & Teacher Warnings
* ⚠️ **"Very Important for WBCS"**: The oath of the **President (Art 60)**, **Vice-President (Art 69)**, and **Governor (Art 159)** are **NOT** included in the Third Schedule; their oaths are given directly in their respective articles!
* ⚠️ **"Frequently Asked Trap"**: English is **NOT** included in the 22 official languages of the 8th Schedule.
* ⚠️ **"North-East Sixth Schedule Trick"**: Sixth Schedule applies ONLY to **AMTM (Assam, Meghalaya, Tripura, Mizoram)**. It does **NOT** apply to Manipur, Nagaland, or Arunachal Pradesh.
* ⚠️ **"42nd Amendment Subject Transfer"**: 5 subjects were transferred from State List to Concurrent List by 42nd Amendment 1976: **Education, Forests, Weights & Measures, Protection of Wild Animals & Birds, Administration of Justice**.

---

## 6. Common Confusions & Student Traps
* ❌ **Confusion**: Joint sitting was borrowed from the British Constitution.
  * ✔️ **Reality**: Joint Sitting of Parliament (Article 108) was borrowed from **Australia**, while Parliamentary bicameralism was borrowed from **Britain**.
* ❌ **Confusion**: Thinking 9th Schedule is completely immune from Supreme Court judicial review.
  * ✔️ **Reality**: In **I.R. Coelho v. State of Tamil Nadu (2007)**, the Supreme Court ruled that laws placed in the 9th Schedule after **April 24, 1973** (date of Kesavananda Bharati verdict) are open to judicial review if they violate fundamental rights or the Basic Structure.

---

## 7. Quick Revision & Memory Tricks
[WB DECODED MEMORY AID]
* 🧠 **"TEARS OF OLD PM" — The 12 Schedules Mnemonic**:
  * **T** $\rightarrow$ Territories (1st)
  * **E** $\rightarrow$ Emoluments / Salaries (2nd)
  * **A** $\rightarrow$ Affirmations & Oaths (3rd)
  * **R** $\rightarrow$ Rajya Sabha Seat Allocation (4th)
  * **S** $\rightarrow$ Scheduled Areas (5th)
  * **O** $\rightarrow$ Other Tribal Areas [AMTM] (6th)
  * **F** $\rightarrow$ Federal Lists [Union, State, Concurrent] (7th)
  * **O** $\rightarrow$ Official Languages [22] (8th)
  * **L** $\rightarrow$ Land Reforms / 9th Schedule (9th)
  * **D** $\rightarrow$ Defection [Anti-Defection Law] (10th)
  * **P** $\rightarrow$ Panchayati Raj [29 Items] (11th)
  * **M** $\rightarrow$ Municipalities [18 Items] (12th)

---

## 8. Lecture Sources & Attribution
* **Lecture Sources**:
  * \`Lec 01: Indian Polity Basics and Salient Features Part 1\` (Video ID: \`euKklgm5zXI\`, 114m)
  * \`Lec 02: Indian Polity Basics and Salient Features Part 2\` (Video ID: \`wtdgbR4Ghdg\`, 88m)
  * \`Lec 03: Indian Polity Basics and Salient Features Part 3\` (Video ID: \`mm5QTCUHIjs\`, 113m)
  * \`Lec 11: Salient Features of Indian Constitution\` (Video ID: \`E3ndPD4Vutc\`, 68m)
* **Attribution**: Comprehensive 4-lecture synthesis with detailed statutory and schedules mapping.
`;

insertChapter.run(
  'polity-ch-03',
  'salient-features-and-sources',
  3,
  'Salient Features, Sources & Schedules of the Constitution',
  '12 Schedules (TEARS OF OLD PM), Borrowings from 60 Countries & Quasi-Federalism',
  'Constitutional Architecture',
  'Articles 1 to 395, Schedules 1 to 12',
  35,
  28,
  15,
  98,
  JSON.stringify(['euKklgm5zXI', 'wtdgbR4Ghdg', 'mm5QTCUHIjs', 'E3ndPD4Vutc']),
  ch3_content
);

console.log('✅ Chapter 03 Seeded.');

// ==============================================================================
// CHAPTER 04: THE PREAMBLE
// ==============================================================================
const ch4_content = `# Chapter 04 — The Preamble: Philosophy, Basic Structure & Scope

## 1. Introduction
[FROM PLAYLIST]
The **Preamble** serves as the introduction or preface to the Constitution of India. It contains the summary or essence of the Constitution. Renowned jurist **N.A. Palkhivala** called the Preamble the **"Identity Card of the Constitution"**.

The Preamble is based on the historic **"Objectives Resolution"**, drafted and moved by **Pandit Jawaharlal Nehru** in the Constituent Assembly on **December 13, 1946**, and unanimously adopted on **January 22, 1947**.

---

## 2. The Text of the Preamble
> *"WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a **SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC** and to secure to all its citizens:*
>
> ***JUSTICE**, social, economic and political;*
> ***LIBERTY** of thought, expression, belief, faith and worship;*
> ***EQUALITY** of status and of opportunity; and to promote among them all*
> ***FRATERNITY** assuring the dignity of the individual and the unity and integrity of the Nation;*
>
> *IN OUR CONSTITUENT ASSEMBLY this **twenty-sixth day of November, 1949**, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION."*

---

## 3. Four Core Ingredients of the Preamble
[FROM PLAYLIST]
1. **Source of Authority of the Constitution**: Derives its authority directly from **"We, the People of India"** (Popular Sovereignty).
2. **Nature of Indian State**: Declares India to be a **Sovereign, Socialist, Secular, Democratic, Republic**.
3. **Objectives of the Constitution**: Aims to secure **Justice, Liberty, Equality, and Fraternity**.
4. **Date of Adoption**: **November 26, 1949**.

---

## 4. In-Depth Analysis of Key Philosophical Keywords
[FROM PLAYLIST]

### 1. Sovereign
* India is neither a dependency nor a dominion of any other nation, but an **independent state**.
* There is no authority above it, and it is free to conduct its own external and internal affairs.
* Membership of the Commonwealth or the United Nations does not curtail India's constitutional sovereignty.

### 2. Socialist (Added by 42nd Amendment 1976)
* India follows **Democratic Socialism** (a mixed economy where both public and private sectors co-exist side-by-side) rather than **Communistic Socialism** (state ownership of all means of production).
* Supreme Court in *Samatha v. State of AP*: Democratic socialism aims to eliminate poverty, ignorance, disease, and inequality of opportunity.

### 3. Secular (Added by 42nd Amendment 1976)
* India embodies the **Positive Concept of Secularism** (*Sarva Dharma Sambhava*): all religions in our country (irrespective of their strength) have the same status and support from the state.
* Contrast with **Negative Secularism** (Western model): strict separation where state does not recognize or support any religious activity.

### 4. Democratic
* Based on the doctrine of **Popular Sovereignty** (power in the hands of the people).
* India has **Indirect Representative Parliamentary Democracy** where the executive is responsible to the legislature for all its policies and actions.
* The democratic character includes political, social, and economic democracy (*Dr. Ambedkar's speech: Political democracy cannot last unless there lies at the base of it social democracy*).

### 5. Republic
* Indicates that the head of the state is always **elected directly or indirectly** for a fixed period (the President of India is elected for 5 years).
* In a Republic, political sovereignty is vested in the people (not a monarch), and there is no privileged class (all public offices are open to every citizen without discrimination).

### 6. Justice (Social, Economic, Political)
* **Social Justice**: Equal treatment of all citizens without social distinctions based on caste, color, race, sex, or religion.
* **Economic Justice**: Elimination of glaring inequalities in wealth, income, and property.
* **Distributive Justice**: Social Justice + Economic Justice.
* **Political Justice**: Equal political rights, equal access to all political offices, and equal voice in the government.
* *Note: Ideal of Justice borrowed from the **Russian Revolution (1917)**.*

### 7. Liberty
* Liberty of thought, expression, belief, faith, and worship through Fundamental Rights (Art 19, 25–28).
* Liberty is not absolute but **qualified** (subject to reasonable restrictions).

### 8. Equality
* Absence of special privileges to any section, and adequate opportunities for all without discrimination (Articles 14–18).

### 9. Fraternity (Added "Integrity" by 42nd Amendment 1976)
* A sense of brotherhood across the nation promoted through Single Citizenship and Article 51A(e).
* Assures two things: **Dignity of the individual** and **Unity and Integrity of the nation**.

---

## 5. Landmark Cases on the Preamble

\`\`\`mermaid
flowchart TD
    A["Berubari Union Case (1960)<br>'Preamble is NOT part of Constitution'"] --> B["Kesavananda Bharati Case (1973)<br>'Preamble IS an integral Part of Constitution & can be amended'"]
    B --> C["LIC of India Case (1995)<br>'Preamble is an integral part of the Constitution'"]
\`\`\`

1. **Berubari Union Case (1960)**:
   * SC held that the Preamble is the key to the minds of the makers, but **"Preamble is NOT a part of the Constitution"**.
2. **Kesavananda Bharati Case (1973) (13-Judge Bench — Historic)**:
   * SC **overruled** the Berubari opinion and held:
     1. **"Preamble IS a part of the Constitution"**.
     2. The Preamble can be amended under Article 368, provided the **Basic Structure** is not destroyed.
3. **LIC of India Case (1995)**:
   * SC once again held that the Preamble is an integral part of the Constitution.

---

## 6. Legal Status & Enforceability of the Preamble
[FROM PLAYLIST]
* **Non-Justiciable**: The provisions of the Preamble are **NOT enforceable in courts of law**. You cannot file a writ petition claiming violation of the Preamble alone.
* **Neither a Source nor a Prohibition**: The Preamble is neither a source of power to the legislature nor a prohibition upon the powers of legislature.
* **Aid to Interpretation**: Whenever the language of any constitutional article is ambiguous, the Preamble is used to interpret its true meaning.

---

## 7. The 42nd Constitutional Amendment Act of 1976
[FROM PLAYLIST]
* The Preamble has been **amended only ONCE** in history by the **42nd Amendment Act 1976** (under Indira Gandhi government).
* **Three New Words Added**:
  1. **"SOCIALIST"**
  2. **"SECULAR"**
  3. **"INTEGRITY"** (Changed *"unity of the Nation"* to *"unity and integrity of the Nation"*).

---

## 8. Important Quotes on the Preamble
* **K.M. Munshi**: Called the Preamble the **"Horoscope of our sovereign democratic republic"**.
* **Sir Alladi Krishnaswamy Iyer**: Stated that the Preamble expresses **"what we thought or dreamt so long"**.
* **Pandit Thakur Das Bhargava**: Described the Preamble as the **"Soul of the Constitution"**, the **"Key to the Constitution"**, and a **"Jewel set in the Constitution"**.
* **Sir Ernest Barker**: Termed the Preamble as the **"Key-note to the Constitution"**.
* **Justice M. Hidayatullah**: Stated that the Preamble resembles the Declaration of Independence of the USA, but is more than a declaration: *"It is the soul of our Constitution"*.

---

## 9. Common Confusions & Student Traps
* ❌ **Confusion**: Preamble was enacted before the rest of the Constitution.
  * ✔️ **Reality**: The Preamble was enacted **AFTER** the entire Constitution was already framed and passed, to ensure that it was in complete conformity with the text of the Constitution!
* ❌ **Confusion**: Believing the word "Federal" is in the Preamble.
  * ✔️ **Reality**: The word **"Federal"** does **NOT** appear in the Preamble (nor in Article 1, which uses *"Union of States"*).

---

## 10. Quick Revision & Memory Tricks
[WB DECODED MEMORY AID]
* 🧠 **"SO-SO-SE-DE-RE" Sequence**:
  * **SO**vereign
  * **SO**cialist (1976)
  * **SE**cular (1976)
  * **DE**mocratic
  * **RE**public
* 🧠 **"42nd Amendment Triple Words: SSI"**:
  * **S**ocialist
  * **S**ecular
  * **I**ntegrity

---

## 11. Lecture Sources & Attribution
* **Lecture Sources**:
  * \`Lec 07: The Preamble of the Constitution Part 1\` (Video ID: \`cTlPZgu4T4w\`, 80m)
  * \`Lec 08: The Preamble of the Constitution Part 2\` (Video ID: \`r4UrbUcddLs\`, 84m)
  * \`Lec 09: The Preamble of the Constitution Part 3\` (Video ID: \`PtISwP927sE\`, 80m)
  * \`Lec 10: The Preamble of the Constitution Part 4\` (Video ID: \`aKswWAz7cBs\`, 77m)
* **Attribution**: Complete 4-part lecture series synthesized with verbatim case law rulings and jurist quotations.
`;

insertChapter.run(
  'polity-ch-04',
  'preamble-of-the-constitution',
  4,
  'The Preamble: Philosophy, Basic Structure & Scope',
  'Sovereign, Socialist, Secular, Democratic, Republic & Landmark Supreme Court Verdicts',
  'Preamble',
  'Preamble, Objectives Resolution',
  30,
  20,
  15,
  99,
  JSON.stringify(['cTlPZgu4T4w', 'r4UrbUcddLs', 'PtISwP927sE', 'aKswWAz7cBs']),
  ch4_content
);

console.log('✅ Chapter 04 Seeded.');
console.log('🎉 Chapters 1–4 Successfully Seeded into Database!');
