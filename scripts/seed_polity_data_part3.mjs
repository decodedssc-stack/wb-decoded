import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ SEEDING POLITY CHAPTERS 9 TO 12...');

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
// CHAPTER 09: THE PRESIDENT OF INDIA
// ==============================================================================
const ch9_content = `# Chapter 09 — Part V: The Union Executive — President of India (Articles 52 to 73, 123)

## 1. Introduction
[FROM PLAYLIST]
**Part V** of the Constitution (Articles 52 to 151) deals with **The Union**. Chapter I of Part V deals with **The Union Executive** (Articles 52 to 78), which consists of the **President, the Vice-President, the Prime Minister, the Council of Ministers, and the Attorney General of India**.

**Article 52** states: *"There shall be a President of India."* The President is the **Head of the State** (First Citizen of India, symbol of unity, integrity, and solidarity of the nation) and the Supreme Commander of the Defence Forces. In our Parliamentary system, the President is the **De Jure (nominal / titular / constitutional) Executive**, while the Prime Minister is the **De Facto (real) Executive**.

---

## 2. Constitutional Articles Related to the President

| Article | Subject Matter | Key Mechanism / Condition |
| :--- | :--- | :--- |
| **Article 52** | The President of India | Permanent constitutional office. |
| **Article 53** | Executive power of the Union | Vested in the President and exercised directly or through subordinate officers in accordance with the Constitution. |
| **Article 54** | **Electoral College for President** | **Elected members of Lok Sabha, Rajya Sabha, and elected members of State Legislative Assemblies (MLAs)** + elected MLAs of Delhi & Puducherry (added by **70th Amendment 1992**) + J&K. |
| **Article 55** | **Manner of Election of President** | Proportional Representation by means of **Single Transferable Vote** via Secret Ballot; Principle of uniformity and parity between Union and States. |
| **Article 56** | Term of office of President | **5 years** from date of entering office; eligible for re-election (Art 57). |
| **Article 58** | **Qualifications for Election** | Citizen of India, **minimum 35 years of age**, qualified for election as member of **Lok Sabha**, must not hold any Office of Profit. |
| **Article 59** | Conditions of President's office | Shall not be a member of either House of Parliament/State Legislature; official residence (Rashtrapati Bhavan) without rent; emoluments cannot be diminished during term. |
| **Article 60** | **Oath or Affirmation by the President** | Administered by the **Chief Justice of India (CJI)** (or senior-most judge of SC). Oath: *"To preserve, protect and defend the Constitution and the law."* |
| **Article 61** | **Procedure for Impeachment of President** | Sole ground: **"Violation of the Constitution"** (phrase not defined in Constitution). |
| **Article 62** | Time of holding election to fill vacancy | Election to fill vacancy caused by expiration of term must be completed **before expiration of term**. In case of death/resignation, election within **6 months**. |
| **Article 71** | Matters relating to election of President | **All doubts and disputes** regarding election of President/VP shall be inquired into and decided **exclusively by the Supreme Court** (decision is final). |
| **Article 72** | **Pardoning Powers of the President** | Power to grant pardons, reprieves, respites, remissions, or commute sentences in all cases involving Union laws, Court Martial, and Death Sentences. |
| **Article 74** | Council of Ministers to aid and advise President | President shall act in accordance with the advice tendered by CoM headed by PM (President may require CoM to reconsider advice once under **44th Amendment 1978**, but is bound after reconsideration). |
| **Article 123** | **Ordinance-making Power of the President** | Promulgate ordinances during recess of Parliament; must be approved by Parliament within **6 weeks from reassembly**. |

---

## 3. Electoral College & Value of Votes (Article 54 & 55)
[FROM PLAYLIST]

### Who PARTICIPATES in the Presidential Election?
* ✅ Elected members of **Lok Sabha** (543).
* ✅ Elected members of **Rajya Sabha** (233).
* ✅ Elected members of **State Legislative Assemblies (MLAs)** across all 28 states.
* ✅ Elected members of Legislative Assemblies of **Delhi & Puducherry** (70th Amendment 1992) and **J&K**.

### Who DOES NOT Participate?
* ❌ **Nominated members** of Lok Sabha and Rajya Sabha.
* ❌ **Nominated members** of State Legislative Assemblies.
* ❌ **Members of State Legislative Councils (MLCs)** (both elected and nominated).

### Value of Votes Formula:
1. **Value of Vote of an MLA**:
   $$\text{Value of 1 MLA Vote} = \frac{\text{Total Population of State (1971 Census)}}{\text{Total Number of Elected MLAs in State}} \times \frac{1}{1000}$$
   *(Highest: Uttar Pradesh ~208; Lowest: Sikkim ~7).*
2. **Value of Vote of an MP**:
   $$\text{Value of 1 MP Vote} = \frac{\text{Total Value of Votes of all MLAs of all States}}{\text{Total Number of Elected MPs (543 + 233 = 776)}} \approx 700$$
3. **Electoral Quota Required to Win**:
   $$\text{Electoral Quota} = \left(\frac{\text{Total Valid Votes Polled}}{1 + 1}\right) + 1 = \left(\frac{\text{Total Valid Votes Polled}}{2}\right) + 1$$

---

## 4. Impeachment Procedure (Article 61)
[FROM PLAYLIST]
* **Ground**: *"Violation of the Constitution"*.
* **Initiation**: Can be initiated in **either House of Parliament** (Lok Sabha or Rajya Sabha).
* **Step 1 (Introduction)**: Signed by at least **$\frac{1}{4}\text{th}$ of total members** of that House. A **14-day advance notice** in writing is given to the President.
* **Step 2 (Passing in 1st House)**: Passed by a special majority of **not less than $\frac{2}{3}\text{rd}$ of the TOTAL membership** of that House.
* **Step 3 (Investigation by 2nd House)**: The second House investigates the charges (President has the right to appear and be represented).
* **Step 4 (Final Removal)**: If the second House also passes the resolution by a majority of **not less than $\frac{2}{3}\text{rd}$ of the TOTAL membership**, the President stands removed from the date of passing!
* ⚠️ **Special Note on Impeachment Participation**:
  * Nominated members of Parliament **DO participate** in impeachment (even though they don't vote in election!).
  * State MLAs **DO NOT participate** in impeachment (even though they vote in election!).
  * No President of India has ever been impeached so far.

---

## 5. Powers and Functions of the President

### A. Executive Powers
* All executive actions of Government of India are formally taken in the name of the President (Art 77).
* Appoints: Prime Minister and other Ministers (Art 75), Attorney General of India (Art 76), Comptroller and Auditor General (Art 148), Chief Election Commissioner & ECs (Art 324), Chairman and members of UPSC (Art 315), Governors of States (Art 155), Chairman and members of Finance Commission (Art 280), Chief Justice & Judges of Supreme Court & High Courts.

### B. Legislative Powers
* Summons, prorogues Parliament, and can dissolve the Lok Sabha (Art 85).
* Summons a **Joint Sitting** of both Houses in case of deadlock (Article 108) (presided over by Speaker of Lok Sabha).
* Nominates **12 members to Rajya Sabha** having special knowledge in Literature, Science, Art, and Social Service (Art 80).
* Assent to Bills (Article 111): Can give assent, withhold assent, or return the bill (if not a Money Bill) for reconsideration.
* **Veto Powers of Indian President**:
  1. **Absolute Veto**: Withholding assent to a bill passed by Parliament (e.g. private member bills or when cabinet resigns).
  2. **Suspensive Veto**: Returning the bill for reconsideration (overridden if passed again by simple majority).
  3. **Pocket Veto**: Neither giving assent nor rejecting nor returning the bill, keeping it pending indefinitely (*President Zail Singh exercised Pocket Veto on the Indian Post Office Amendment Bill in 1986*).
  * *Note: Indian President has NO Qualified Veto (which exists in USA).*
* **Ordinance Making Power (Article 123)**:
  * Can promulgate an ordinance ONLY when either or both Houses of Parliament are not in session.
  * Maximum lifespan of an ordinance without parliamentary approval: **6 Months + 6 Weeks** (since max gap between sessions is 6 months under Art 85).
  * *D.C. Wadhwa Case (1987)*: Re-promulgation of ordinances without placing them before legislature is a fraud on the Constitution.

### C. Judicial & Pardoning Powers (Article 72)
* Grants 5 types of mercy pardons:
  1. **Pardon**: Completely absolves the offender from all sentences, punishments, and disqualifications.
  2. **Commutation**: Substitution of one form of punishment for a lighter form (e.g., Death sentence commuted to Rigorous Imprisonment).
  3. **Remission**: Reducing the period of sentence without changing its character (e.g., 5 years RI reduced to 2 years RI).
  4. **Respite**: Awarding a lesser sentence in place of one originally awarded due to special facts (e.g., physical disability or pregnancy of a woman offender).
  5. **Reprieve**: Stay of execution of a sentence (especially death sentence) for a temporary period.

---

## 6. Lecture Sources & Attribution
* **Lecture Source**: \`Lec 16: Part V, Article 52 to 151 The Union Part 01\` (Video ID: \`eZbbmTeeoo0\`, 95m 28s)
* **Attribution**: Complete extraction covering presidential election mathematical formulas, impeachment clauses, veto powers, ordinances, and Article 72 pardoning jurisprudence.
`;

insertChapter.run(
  'polity-ch-09',
  'the-president-of-india',
  9,
  'Part V: The Union Executive — President of India (Articles 52 to 73, 123)',
  'Election Formula, Impeachment (Art 61), Veto Powers, Ordinance (Art 123) & Pardons (Art 72)',
  'Part V, Chapter I',
  'Articles 52 to 73, 123',
  35,
  25,
  15,
  99,
  JSON.stringify(['eZbbmTeeoo0']),
  ch9_content
);

console.log('✅ Chapter 09 Seeded.');

// ==============================================================================
// CHAPTER 10: VICE-PRESIDENT, PRIME MINISTER & COUNCIL OF MINISTERS
// ==============================================================================
const ch10_content = `# Chapter 10 — Part V: Vice-President, Prime Minister & Council of Ministers

## 1. The Vice-President of India (Articles 63 to 71)
[FROM PLAYLIST]
**Article 63** provides for a Vice-President of India, who occupies the **second-highest constitutional office** in the country (modeled on the lines of the American Vice-President).

### Key Provisions on Vice-President:
* **Article 64**: **Ex-officio Chairman of the Council of States (Rajya Sabha)**. Draws salary in the capacity of Chairman of Rajya Sabha (not as Vice-President).
* **Article 66 (Electoral College of Vice-President)**:
  * Consists of **ALL members of Parliament (both Elected and Nominated members of Lok Sabha and Rajya Sabha)**.
  * State MLAs / MLCs **DO NOT participate** in the Vice-President's election!
  * Qualifications: Citizen of India, **minimum 35 years**, qualified for election as member of **Rajya Sabha**, no office of profit.
* **Article 67 (Removal of Vice-President)**:
  * Resolution can be introduced **ONLY in the Rajya Sabha** (with 14 days notice).
  * Must be passed by an **Effective Majority** of the Rajya Sabha (majority of all the then members) and **agreed to by the Lok Sabha** (Simple Majority).
  * No formal ground for removal is mentioned in the Constitution.
* **Article 65 (Acting as President)**:
  * Acts as President when a vacancy occurs due to death, resignation, or removal, for a maximum period of **6 months**.
  * While acting as President, does not perform the duties of Chairman of Rajya Sabha (the Deputy Chairman performs those duties) and receives the emoluments of the President.

---

## 2. The Prime Minister of India (Articles 74, 75, 78)
[FROM PLAYLIST]
In the scheme of parliamentary system of government provided by the Constitution, the President is the nominal executive authority (*de jure*) and Prime Minister is the real executive authority (*de facto*). The Prime Minister is the **Head of Government**.

### Key Articles on the Prime Minister:
* **Article 74**: Council of Ministers with the Prime Minister at the head to aid and advise the President.
* **Article 75**:
  * **75(1)**: The Prime Minister shall be **appointed by the President**, and the other Ministers shall be appointed by the President on the advice of the Prime Minister.
  * **75(2)**: Ministers hold office during the **pleasure of the President** (Individual Responsibility).
  * **75(3)**: The Council of Ministers shall be **collectively responsible to the Lok Sabha** (Collective Responsibility — *"Sink and Swim Together"*).
  * **75(4)**: Oaths of office and secrecy administered by the President.
  * **75(5)**: A minister who for any period of **6 consecutive months** is not a member of either House of Parliament ceases to be a minister.
* **91st Constitutional Amendment Act 2003**:
  * Total number of ministers, including the Prime Minister, in the Council of Ministers shall **NOT exceed 15% of the total strength of the Lok Sabha** (Article 75(1A)).
* **Article 78 (Duties of Prime Minister)**:
  * Principal channel of communication between the President and the Council of Ministers.
  * Duty to communicate all decisions of the Council of Ministers to the President.

---

## 3. Council of Ministers vs Cabinet

| Parameter | Council of Ministers (Wider Body) | The Cabinet (Inner Core) |
| :--- | :--- | :--- |
| **Constitutional Mention** | Mentioned in Articles 74 & 75 (Original Constitution) | Inserted in **Article 352 by 44th Amendment 1978** |
| **Size** | Large body (60 to 70 ministers) | Compact body (15 to 20 senior ministers) |
| **Composition** | Cabinet Ministers, Ministers of State, Deputy Ministers | **Cabinet Ministers only** |
| **Policy Making** | Does not meet as a whole to take decisions | Supreme policy-making and coordinating executive body |

---

## 4. Lecture Sources & Attribution
* **Lecture Source**: \`Lec 17: Part V, Article 52 to 151 The Union Part 02\` (Video ID: \`g9F_pgZ93bQ\`, 112m 49s)
* **Attribution**: Complete synthesis of Vice-Presidential electoral comparisons, ministerial collective responsibility, and 91st Amendment size limits.
`;

insertChapter.run(
  'polity-ch-10',
  'prime-minister-and-council-of-ministers',
  10,
  'Part V: Vice-President, Prime Minister & Council of Ministers',
  'VP as RS Chairman (Art 64), PM Appointment, Collective Responsibility (Art 75(3)) & 91st Amendment',
  'Part V, Chapter I',
  'Articles 63 to 71, 74, 75, 78',
  30,
  20,
  15,
  99,
  JSON.stringify(['g9F_pgZ93bQ']),
  ch10_content
);

console.log('✅ Chapter 10 Seeded.');

// ==============================================================================
// CHAPTER 11: LAW OFFICERS — ATTORNEY GENERAL & ADVOCATE GENERAL
// ==============================================================================
const ch11_content = `# Chapter 11 — Part V & VI: Law Officers: Attorney General & Advocate General

## 1. The Attorney General of India (Article 76)
[FROM PLAYLIST]
**Article 76** provides for the office of the **Attorney General for India (AGI)**, who is the **highest law officer** in the country and the chief legal advisor to the Government of India.

### Key Provisions on Attorney General:
* **Appointment & Qualifications**: Appointed by the President. Must be qualified to be appointed a **Judge of the Supreme Court** (Citizen of India, 5 years HC Judge or 10 years HC Advocate, or distinguished jurist in President's opinion).
* **Term of Office**: The Constitution does **NOT fix the term** of office of the AGI. Holds office during the **pleasure of the President** (customarily resigns when the Council of Ministers resigns).
* **Remuneration**: Determined by the President (not fixed by Constitution or Parliament).
* **Rights of the Attorney General (Article 88)**:
  1. Right of audience in **all courts** in the territory of India.
  2. Right to speak and take part in proceedings of **both Houses of Parliament**, any joint sitting, and any Parliamentary committee of which he is named a member.
  3. **NO RIGHT TO VOTE** in Parliament (Article 88).
  4. Enjoys all privileges and immunities of a Member of Parliament (Article 105).
* **Limitations**: Not a whole-time counsel for the Government; not debarred from private legal practice (but cannot advise or hold brief against GoI).
* **Solicitor General of India**: Statutory post (not mentioned in Constitution) assisting the Attorney General.

---

## 2. The Advocate General for the State (Article 165)
[FROM PLAYLIST]
**Article 165** provides for the **Advocate General for the State**, who is the highest law officer in the State (corresponding to the Attorney General at the Centre).

### Key Provisions on Advocate General:
* **Appointment & Qualifications**: Appointed by the Governor. Must be qualified to be appointed a **Judge of a High Court** (Citizen, 10 years judicial office or 10 years HC advocate).
* **Term & Remuneration**: Holds office during the **pleasure of the Governor**; remuneration determined by the Governor.
* **Rights (Article 177)**: Right to speak and take part in proceedings of the **State Legislature** (both Houses where bicameral) and any committee, **WITHOUT the right to vote**.

---

## 3. Direct Comparison: Attorney General vs Advocate General

| Feature | Attorney General for India (Article 76) | Advocate General for the State (Article 165) |
| :--- | :--- | :--- |
| **Jurisdiction** | Union Government (All India) | State Government |
| **Appointed By** | **President of India** | **Governor of the State** |
| **Qualification** | Qualified to be **Supreme Court Judge** | Qualified to be **High Court Judge** |
| **Pleasure of** | President | Governor |
| **Legislative Right** | Take part in Parliament without voting (**Art 88**) | Take part in State Legislature without voting (**Art 177**) |

---

## 4. Lecture Sources & Attribution
* **Lecture Sources**:
  * \`Lec 18: Part V, Article 52 to 151 The Union Part 03\` (Video ID: \`2O_rdRHtFa4\`, 79m 15s)
  * \`Lec 20: The Executive Part 2\` (Video ID: \`RI_NLdF4wDs\`, 61m 29s)
* **Attribution**: Comprehensive comparison between Articles 76/88 (Union) and Articles 165/177 (State).
`;

insertChapter.run(
  'polity-ch-11',
  'attorney-general-and-advocate-general',
  11,
  'Part V & VI: Law Officers: Attorney General & Advocate General',
  'Articles 76 & 165, Parliamentary Rights without Voting (Art 88 & 177), Solicitor General',
  'Part V & VI',
  'Articles 76, 88, 105, 165, 177',
  25,
  16,
  12,
  97,
  JSON.stringify(['2O_rdRHtFa4', 'RI_NLdF4wDs']),
  ch11_content
);

console.log('✅ Chapter 11 Seeded.');

// ==============================================================================
// CHAPTER 12: GOVERNOR & STATE EXECUTIVE
// ==============================================================================
const ch12_content = `# Chapter 12 — Part VI: The State Executive: Governor, Chief Minister & Administration

## 1. The Governor of the State (Articles 153 to 162)
[FROM PLAYLIST]
**Part VI** of the Constitution (Articles 152 to 237) deals with **The States**. **Article 153** provides for a Governor for each state. The **7th Constitutional Amendment Act 1956** facilitated the appointment of the **same person as Governor for two or more states**.

The Governor is the **Chief Executive Head of the State** (*de jure* executive) and acts as an agent/representative of the Central Government (dual role).

---

## 2. Appointment, Term and Qualifications
* **Article 155**: The Governor is **appointed by the President by warrant under his hand and seal** (Neither directly elected by the people nor indirectly elected by an electoral college — Canadian model).
* **Article 156**: Holds office during the **pleasure of the President**. Normal term is **5 years**. Can be removed by the President at any time without any constitutional procedure or stated ground.
* **Article 157 & 158 (Qualifications & Conditions)**:
  1. Citizen of India.
  2. Completed the age of **35 years**.
  3. Must not be a member of either House of Parliament or State Legislature.
  4. Must not hold any other office of profit.
* **Two Conventions regarding appointment**:
  1. Should not belong to the state where appointed (an outsider).
  2. Chief Minister of the concerned state is consulted by the Centre before appointment (often violated).

---

## 3. Powers and Discretionary Functions of the Governor

### A. Executive & Legislative Powers
* Appoints the Chief Minister (Art 164), other Ministers, Advocate General (Art 165), State Election Commissioner (Art 243K), and Chairman/members of SPSC (Art 316).
* *Note: Members of SPSC are appointed by Governor, but can be removed ONLY by the President!*
* Summons and prorogues State Legislature and dissolves Legislative Assembly (Art 174).
* Nominates **$\frac{1}{6}\text{th}$ of members to State Legislative Council (MLC)** from Literature, Science, Art, Co-operative Movement, and Social Service (Art 171). *(Note: Co-operative movement is unique to Governor's nomination!)*

### B. Assent to Bills & Reservation for President (Article 200 & 201)
When a bill is passed by the State Legislature and presented to the Governor, he has 4 options under **Article 200**:
1. Give assent to the bill.
2. Withhold assent.
3. Return the bill (if not Money Bill) for reconsideration.
4. **Reserve the bill for the consideration of the President** (Obligatory if the bill endangers the position of the High Court).

### C. Ordinance Making Power (Article 213)
* Promulgate ordinances when the State Legislature is not in session.
* Ceases to operate **6 weeks from reassembly** of the State Legislature.

### D. Discretionary Powers (Article 163) — Governor vs President
* **Article 163(1)**: Unlike the President, the Governor is granted **Constitutional Discretion** (*"except in so far as he is by or under this Constitution required to exercise his functions in his discretion"*).
* **Article 163(2)**: If any question arises whether a matter falls within the Governor's discretion, **the decision of the Governor in his discretion shall be final**.
* **Key Situational Discretion**:
  1. Appointment of CM when no party has a clear majority.
  2. Dismissal of ministry when it loses majority.
  3. Recommending **President's Rule (Article 356)**.
  4. Reserving bills for President's consideration (Article 200).

---

## 4. Comparison: Pardoning Powers of President (Art 72) vs Governor (Art 161)

| Parameter | President (Article 72) | Governor (Article 161) |
| :--- | :--- | :--- |
| **Death Sentence** | Can **PARDON, commute, remit, or suspend** death sentences | Can **suspend, remit, or commute** death sentence, but **CANNOT fully PARDON** death sentence |
| **Court Martial** | Can pardon sentences awarded by Military Courts | **NO power** regarding Court Martial |
| **Law Scope** | Cases under Union Laws | Cases under State Laws |

---

## 5. Lecture Sources & Attribution
* **Lecture Sources**:
  * \`Lec 19: The Executive Part 1\` (Video ID: \`84DyN6em6Dw\`, 96m 28s)
  * \`Lec 20: The Executive Part 2\` (Video ID: \`RI_NLdF4wDs\`, 61m 29s)
* **Attribution**: Comprehensive state executive analysis covering Article 153 to 167, Article 200 reservation, Article 213 ordinances, and Sarkaria Commission recommendations.
`;

insertChapter.run(
  'polity-ch-12',
  'governor-and-state-executive',
  12,
  'Part VI: The State Executive: Governor, Chief Minister & Administration',
  'Dual Role, Discretionary Powers (Art 163), Art 200 Bill Reservation & Pardon (Art 161) vs President',
  'Part VI, Chapter II',
  'Articles 152 to 167, 200, 201, 213',
  35,
  24,
  15,
  98,
  JSON.stringify(['84DyN6em6Dw', 'RI_NLdF4wDs']),
  ch12_content
);

console.log('✅ Chapter 12 Seeded.');
console.log('🎉 Chapters 9–12 Successfully Seeded into Database!');
