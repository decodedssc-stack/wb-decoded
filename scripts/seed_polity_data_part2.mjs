import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ SEEDING POLITY CHAPTERS 5 TO 8...');

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
// CHAPTER 05: UNION AND ITS TERRITORY
// ==============================================================================
const ch5_content = `# Chapter 05 — Part I: Union & Its Territory (Articles 1 to 4)

## 1. Introduction
[FROM PLAYLIST]
**Part I** of the Constitution of India comprises **Articles 1 to 4**, dealing with the territory of India, admission or establishment of new states, and formation/alteration of boundaries and names of existing states.

---

## 2. Core Constitutional Articles

### Article 1: Name and Territory of the Union
* **"India, that is Bharat, shall be a Union of States."**
* Notice two things:
  1. **Name of the country**: India and Bharat (adopted unanimously to balance traditional and modern nomenclature).
  2. **Type of polity**: "Union of States" rather than "Federation of States".
* **Why "Union of States"? (Dr. B.R. Ambedkar's rationale)**:
  1. The Indian federation is **not the result of an agreement** among the states (unlike the American Federation).
  2. The states have **no right to secede** from the federation. The federation is an indestructible Union.
* **"Territory of India" vs "Union of India"**:
  * **Union of India**: Includes only the **States** (which share federal power with Centre).
  * **Territory of India**: A much wider expression that includes:
    1. Territories of the States.
    2. Union Territories.
    3. Territories that may be acquired by the Government of India in the future.

### Article 2: Admission or Establishment of New States
* Empowers Parliament to admit into the Union of India, or establish, new states on such terms and conditions as it thinks fit.
* Applies to the admission or establishment of states that were **not part of India** (e.g. Sikkim via 35th & 36th Amendments 1974–75, Goa, Pondicherry).

### Article 3: Formation of New States & Alteration of Areas, Boundaries or Names
* Empowers Parliament to reorganize internal states by law:
  * Form a new state by separation of territory from any state or by uniting two or more states.
  * Increase the area of any state.
  * Diminish the area of any state.
  * Alter the boundaries of any state.
  * Alter the name of any state (e.g., Uttaranchal $\rightarrow$ Uttarakhand, Orissa $\rightarrow$ Odisha).
* **Two Mandatory Conditions under Article 3**:
  1. A bill under Article 3 can be introduced in Parliament **only with the prior recommendation of the President**.
  2. Before recommending, the President must refer the bill to the **concerned State Legislature** for expressing its views within a specified period.
  3. **President/Parliament is NOT bound** by the views of the State Legislature (it can accept or reject them).
* **Conclusion**: India is an **"Indestructible Union of Destructible States"** (in contrast, USA is an *"Indestructible Union of Indestructible States"*).

### Article 4: Laws under Articles 2 and 3
* Declares that laws made for admission/establishment of new states (under Article 2) and formation/alteration of states (under Article 3) **are NOT to be considered as amendments of the Constitution under Article 368**.
* Therefore, such laws can be passed by a **Simple Majority** and by the ordinary legislative process!

---

## 3. Cession of Indian Territory (The Berubari Union Case 1960)
[FROM PLAYLIST]
* **Question Before SC**: Does the power of Parliament to diminish the area of a state (under Article 3) include the power to cede Indian territory to a foreign country?
* **Supreme Court Verdict (1960)**:
  * **NO**. Article 3 does not cover cession of territory to a foreign state.
  * Indian territory can be ceded to a foreign state **only by amending the Constitution under Article 368** (by special majority).
  * Consequently, the **9th Constitutional Amendment Act 1960** was enacted to transfer the Berubari Union (West Bengal) to Pakistan.
* **100th Amendment Act 2015**: Land Boundary Agreement (LBA) with Bangladesh transferring enclaves was enacted under Article 368.

---

## 4. Committees on Linguistic Reorganisation of States
[FROM PLAYLIST]

| Committee / Commission | Year | Members | Recommendation |
| :--- | :--- | :--- | :--- |
| **Dhar Commission** (SK Dhar) | 1948 | Justice S.K. Dhar (Chairman) | **Rejected** language as the basis for state reorganisation; recommended administrative convenience. |
| **JVP Committee** | 1948 | **J**awaharlal Nehru, **V**allabhbhai Patel, **P**attabhi Sitaramayya | **Rejected** linguistic basis; advised postponing reorganisation. |
| **Fazl Ali Commission** (States Reorganisation Commission) | 1953 | **Justice Fazl Ali** (Chairman), **H.N. Kunzru**, **K.M. Panikkar** | **Accepted language** as the basis of reorganisation, but **rejected "One Language, One State"** theory. |

---

## 5. Timeline of Creation of New States Post-1950
* **Andhra State (1953)**: First linguistic state created (Telugu speakers from Madras State) following the 56-day hunger strike and death of **Potti Sreeramulu**.
* **States Reorganisation Act 1956 (7th Amendment 1956)**: Abolished the 4-fold classification of states (Part A, B, C, D) and created **14 States and 6 Union Territories**.
* **1960**: Bombay bifurcated into **Maharashtra** (Marathi) and **Gujarat** (Gujarati, 15th state).
* **1961**: **Dadra & Nagar Haveli** (10th Amendment) and **Goa, Daman & Diu** (12th Amendment) acquired from Portuguese via *Operation Vijay*.
* **1963**: **Nagaland** (16th state) created from Assam.
* **1966**: **Haryana** (17th state) and Chandigarh (UT) carved out of Punjab (Shah Commission).
* **1971**: **Himachal Pradesh** elevated to 18th State.
* **1972**: **Manipur (19th), Tripura (20th), Meghalaya (21st)** created.
* **1975**: **Sikkim** became 22nd Full State (36th Amendment 1975; 35th Amendment made it an "Associate State" with Art 2A).
* **1987**: **Mizoram (23rd), Arunachal Pradesh (24th), Goa (25th)**.
* **2000**: **Chhattisgarh (26th from MP), Uttarakhand (27th from UP), Jharkhand (28th from Bihar)**.
* **2014**: **Telangana (29th state)** carved out of Andhra Pradesh.
* **2019**: **Jammu & Kashmir Reorganisation Act 2019** bifurcated J&K into 2 Union Territories: **J&K (with legislature)** and **Ladakh (without legislature)**.
* **2020**: Merger of **Dadra & Nagar Haveli and Daman & Diu** into a single UT.
* **Current Status (2026)**: **28 States and 8 Union Territories**.

---

## 6. Important Facts & Traps
* ⚠️ **"Article 2 vs Article 3 Trap"**: Article 2 deals with admission of territories **outside India**. Article 3 deals with internal reorganization of territories **already within India**.
* ⚠️ **"Simple Majority Rule"**: A bill to change state boundaries, reduce area, or change name under Article 3 requires only a **Simple Majority** in Parliament, even if the state legislature strongly objects!

---

## 7. Lecture Sources & Attribution
* **Lecture Source**: \`Lec 12: Part I, Article 1 to 4 Union & Its Territory\` (Video ID: \`Z1OO709k8S0\`, 64m 25s)
* **Attribution**: Complete statutory extraction covering Fazl Ali Commission, Dhar Commission, JVP Committee, and modern state reorganisation history.
`;

insertChapter.run(
  'polity-ch-05',
  'union-and-its-territory',
  5,
  'Part I: Union & Its Territory (Articles 1 to 4)',
  'Indestructible Union of Destructible States, Dhar & Fazl Ali Commissions, Berubari Case',
  'Part I',
  'Articles 1 to 4',
  25,
  18,
  12,
  98,
  JSON.stringify(['Z1OO709k8S0']),
  ch5_content
);

console.log('✅ Chapter 05 Seeded.');

// ==============================================================================
// CHAPTER 06: CITIZENSHIP & CAA/NRC
// ==============================================================================
const ch6_content = `# Chapter 06 — Part II: Citizenship & Constitutional Issues (Articles 5 to 11, CAA & NRC)

## 1. Introduction
[FROM PLAYLIST]
**Part II** of the Constitution comprises **Articles 5 to 11**. The Constitution does not lay down a permanent or detailed law relating to citizenship in India. It only identifies the persons who became citizens of India at its commencement (**January 26, 1950**).

For all subsequent matters regarding acquisition and loss of citizenship, **Article 11** empowered the Parliament of India to enact legislation. In exercise of this power, Parliament enacted the **Citizenship Act of 1955** (amended in 1986, 1992, 2003, 2005, 2015, and 2019).

---

## 2. Constitutional Provisions (Articles 5 to 11 at Commencement)

| Article | Constitutional Provision | Key Condition |
| :--- | :--- | :--- |
| **Article 5** | Citizenship by **Domicile** | Domiciled in India AND (Born in India OR Either parent born in India OR Resident for 5 years before Jan 26, 1950). |
| **Article 6** | Rights of citizenship of persons who migrated to India from **Pakistan** | Migrated before **July 19, 1948** (ordinary resident) OR after July 19, 1948 (registered after 6 months residence). |
| **Article 7** | Rights of citizenship of migrants to Pakistan who returned | Migrated to Pakistan after March 1, 1947, but returned to India under a permit for resettlement. |
| **Article 8** | Rights of citizenship of persons of **Indian origin residing outside India** | Registered as a citizen of India by diplomatic/consular representative of India in that country. |
| **Article 9** | **Termination of Citizenship on voluntary acquisition of foreign citizenship** | Single citizenship principle: If a person voluntarily acquires foreign citizenship, Indian citizenship ceases automatically. |
| **Article 10** | **Continuance of the rights of citizenship** | Every citizen continues to be a citizen subject to any law made by Parliament. |
| **Article 11** | **Parliament to regulate the right of citizenship by law** | Full plenary power given to Parliament to enact, amend, or repeal citizenship laws. |

---

## 3. The Citizenship Act of 1955 (5 Ways to Acquire, 3 Ways to Lose)
[FROM PLAYLIST]

### A. 5 Modes of Acquisition (Mnemonic: "BRAND")
1. **B — By Birth (Jus Soli)**:
   * Born in India on or after Jan 26, 1950 but before July 1, 1987: citizen irrespective of parents' nationality.
   * Born between July 1, 1987 and Dec 3, 2004: either parent must be an Indian citizen.
   * Born on or after Dec 3, 2004: both parents must be citizens, or one parent citizen and other not an illegal migrant.
2. **R — By Registration**:
   * Person of Indian Origin (PIO) ordinarily resident in India for **7 years**.
   * Person married to an Indian citizen and resident for 7 years.
3. **A — By Acquisition / Incorporation of Territory**:
   * If any foreign territory becomes part of India (e.g. Pondicherry 1962, Sikkim 1975), GoI specifies the persons who become citizens.
4. **N — By Naturalisation**:
   * Resident in India for 12 months immediately preceding application + 11 years out of the preceding 14 years (total 12 years).
   * Good character, knowledge of an 8th Schedule language.
5. **D — By Descent (Jus Sanguinis)**:
   * Born outside India to an Indian parent (birth must be registered at Indian consulate within 1 year).

### B. 3 Modes of Loss of Citizenship (Mnemonic: "R-T-D")
1. **Renunciation**: Voluntary declaration by a citizen of full age and capacity.
2. **Termination**: By operation of law when a citizen voluntarily acquires citizenship of another country (Art 9).
3. **Deprivation**: Compulsory termination by Central Government for fraud, disloyalty to Constitution, unlawful trading with enemy during war, or imprisonment for 2 years in any country within 5 years of naturalisation.

---

## 4. Citizenship Amendment Act (CAA) 2019 & NRC Background
[FROM PLAYLIST - Special Lectures 3 & 4]

### Background of Assam Accord (1985) & Section 6A
* **1979–1985**: Assam Agitation led by All Assam Students Union (AASU) against illegal influx of migrants from Bangladesh.
* **Assam Accord (Aug 15, 1985)** signed under Rajiv Gandhi government:
  * **Base Cut-off Date**: **March 24, 1971** (midnight).
  * Section 6A inserted into Citizenship Act 1955: Foreigners who entered Assam after March 24, 1971 were to be detected and deported.
* **Supreme Court Constitution Bench (2024)**: Upheld constitutional validity of Section 6A of Citizenship Act.

### Key Provisions of CAA 2019
* **Eligible Groups**: Persecuted religious minorities: **Hindus, Sikhs, Buddhists, Jains, Parsis, and Christians** (6 communities).
* **Eligible Countries**: **Afghanistan, Bangladesh, and Pakistan** (3 countries).
* **Cut-off Date**: Entered India on or before **December 31, 2014**.
* **Relaxation**: Residence requirement for naturalisation reduced from 11 years to **5 years**.
* **Exempted Areas**:
  1. Tribal areas of Assam, Meghalaya, Tripura, and Mizoram under the **Sixth Schedule**.
  2. Areas covered under the **Inner Line Permit (ILP)** under Bengal Eastern Frontier Regulation 1873 (Arunachal Pradesh, Nagaland, Mizoram, Manipur).

---

## 5. Rights Exclusive to Indian Citizens vs Non-Citizens

| Rights Available to Citizens ONLY | Rights Available to BOTH Citizens & Foreigners (except Enemy Aliens) |
| :--- | :--- |
| **Article 15**: No discrimination on grounds of religion, race, caste, sex, place of birth | **Article 14**: Equality before law & equal protection of laws |
| **Article 16**: Equality of opportunity in public employment | **Article 20**: Protection in respect of conviction for offences |
| **Article 19**: 6 Fundamental Freedoms | **Article 21**: Right to Life and Personal Liberty |
| **Article 29 & 30**: Cultural and Educational Rights of Minorities | **Article 21A**: Right to Elementary Education |
| **Article 326**: Right to Vote in Lok Sabha & Legislative Assembly elections | **Article 22**: Protection against arrest and detention |
| Right to hold constitutional offices (President, VP, Judges, Governor, AG) | **Articles 25–28**: Freedom of Religion |

---

## 6. Lecture Sources & Attribution
* **Lecture Sources**:
  * \`Lec 13: Part II, Article 5 to 11 Citizenship\` (Video ID: \`4SlNrFBzT0o\`, 47m 42s)
  * \`L3: Citizenship Issues in India: Historical Background of CAA 2019 Part 1\` (Video ID: \`h3zBsHfwZAY\`, 91m 09s)
  * \`L4: Citizenship Issues in India: Historical Background of CAA 2019 Part 2\` (Video ID: \`PV7Cpi6j7rQ\`, 99m 43s)
* **Attribution**: Synthesized from the 3 in-depth lectures on constitutional citizenship and the statutory analysis of CAA 2019 & Assam Accord.
`;

insertChapter.run(
  'polity-ch-06',
  'citizenship',
  6,
  'Part II: Citizenship & Constitutional Issues (Articles 5 to 11, CAA & NRC)',
  'Modes of Acquisition (BRAND), Loss (RTD), Assam Accord, Section 6A & CAA 2019',
  'Part II',
  'Articles 5 to 11',
  30,
  22,
  15,
  99,
  JSON.stringify(['4SlNrFBzT0o', 'h3zBsHfwZAY', 'PV7Cpi6j7rQ']),
  ch6_content
);

console.log('✅ Chapter 06 Seeded.');

// ==============================================================================
// CHAPTER 07: FUNDAMENTAL RIGHTS
// ==============================================================================
const ch7_content = `# Chapter 07 — Part III: Fundamental Rights & Judicial Review (Articles 12 to 35)

## 1. Introduction
[FROM PLAYLIST]
**Part III** of the Constitution of India (Articles 12 to 35) is rightfully described as the **"Magna Carta of India"**. Borrowed from the **Bill of Rights** of the US Constitution, Fundamental Rights are guaranteed by the Constitution to all persons without discrimination to uphold the ideals of political democracy.

Originally, the Constitution provided for **7 Fundamental Rights**:
1. Right to Equality (Articles 14–18)
2. Right to Freedom (Articles 19–22)
3. Right against Exploitation (Articles 23–24)
4. Right to Freedom of Religion (Articles 25–28)
5. Cultural and Educational Rights (Articles 29–30)
6. *Right to Property (Article 31)* — **Deleted by 44th Amendment Act 1978**; made a legal/constitutional right under **Article 300A** in Part XII.
7. Right to Constitutional Remedies (Article 32)

Today, there are **6 Fundamental Rights**.

---

## 2. Fundamental Conceptual Articles: Article 12 & Article 13

### Article 12: Definition of "State"
* Fundamental Rights are primarily claims against the "State". Article 12 defines "State" for Part III to include:
  1. Government and Parliament of India (Executive & Legislature of the Union).
  2. Government and Legislature of each of the States.
  3. All local authorities (Panchayats, Municipalities, Port Trusts, District Boards).
  4. All other statutory or non-statutory authorities (e.g. LIC, ONGC, SAIL, UGC, State Electricity Boards).
* **Judiciary**: SC in *Rupa Ashok Hurra Case* held that judicial orders of courts cannot be challenged as violation of Fundamental Rights under Article 32, though administrative actions of courts fall under "State".

### Article 13: Laws Inconsistent with Fundamental Rights (Judicial Review)
* Declares that all laws in force in the territory of India immediately before commencement of the Constitution, and any law made by the State thereafter, which is inconsistent with Fundamental Rights, shall be **VOID to the extent of inconsistency**.
* Article 13 provides the constitutional basis for **Judicial Review (Article 32 and Article 226)**.
* **Doctrines under Article 13**:
  1. **Doctrine of Severability**: If only a part of a statute violates FRs, only that offending part is declared void, while the rest remains valid (if separable).
  2. **Doctrine of Eclipse**: Pre-constitutional laws violating FRs are not dead, but remain in a dormant/shadowed state (eclipsed) until an amendment removes the shadow.
  3. **Doctrine of Waiver**: An Indian citizen **CANNOT waive** his Fundamental Rights (*Basheshar Nath v. CIT 1959*).

---

## 3. Detailed Breakdown of the 6 Fundamental Rights

### 1. Right to Equality (Articles 14 to 18)
* **Article 14**: Equality before Law (British origin — negative concept) and Equal Protection of the Laws (US origin — positive concept).
  * Permits **Reasonable Classification** based on intelligible differentia and rational nexus (*State of West Bengal v. Anwar Ali Sarkar 1952*).
  * Prohibits Arbitrariness: E.P. Royappa (1974) and Maneka Gandhi (1978) established that Equality is antithetical to arbitrariness.
* **Article 15**: Prohibition of discrimination on grounds ONLY of **Religion, Race, Caste, Sex, or Place of Birth**.
  * Exceptions: Special provisions for women and children (15(3)), Socially & Educationally Backward Classes / SCs / STs (15(4), 15(5)), Economically Weaker Sections / EWS (15(6) by **103rd Amendment 2019**).
* **Article 16**: Equality of opportunity in matters of public employment.
  * Exceptions: Residence requirement in certain UTs/States (16(3)), Reservation for backward classes not adequately represented (16(4) — *Indira Sawhney Mandal Case 1992*), EWS 10% reservation (16(6)).
* **Article 17**: **Abolition of Untouchability**. Untouchability is abolished and its practice in any form is forbidden (enforced via *Protection of Civil Rights Act 1955*). It is an **absolute right** with no exceptions!
* **Article 18**: **Abolition of Titles**. Prohibits State from conferring titles (except military and academic distinctions like Bharat Ratna/Padma awards per *Balaji Raghavan Case 1996*).

### 2. Right to Freedom (Articles 19 to 22)
* **Article 19(1)**: Guarantees **6 Democratic Freedoms** to citizens only:
  * **19(1)(a)**: Freedom of speech and expression (includes freedom of press, right to silence, right to information). Subject to 8 reasonable restrictions under 19(2).
  * **19(1)(b)**: Freedom to assemble peaceably and without arms.
  * **19(1)(c)**: Freedom to form associations or unions or **co-operative societies** (co-operatives added by **97th Amendment 2011**).
  * **19(1)(d)**: Freedom to move freely throughout the territory of India.
  * **19(1)(e)**: Freedom to reside and settle in any part of the territory of India.
  * *(19(1)(f) Right to acquire property — Deleted by 44th Amendment 1978).*
  * **19(1)(g)**: Freedom to practice any profession, or to carry on any occupation, trade or business.
* **Article 20**: Protection in respect of conviction for offences:
  1. **No Ex-post-facto Law** (20(1)): No person convicted except for violation of law in force at the time of commission (applies to criminal laws only, not civil/tax laws).
  2. **No Double Jeopardy** (20(2)): No person shall be prosecuted and punished for the same offence more than once.
  3. **No Self-Incrimination** (20(3)): No person accused of any offence shall be compelled to be a witness against himself (*Selvi Case 2010* — narco-analysis without consent violates 20(3)).
* **Article 21**: **Protection of Life and Personal Liberty**:
  * *"No person shall be deprived of his life or personal liberty except according to **procedure established by law**."*
  * **A.K. Gopalan Case (1950)**: Narrow interpretation (procedure established by law applied strictly).
  * **Maneka Gandhi Case (1978)**: Widened Article 21 to incorporate **"Due Process of Law"** — procedure must be **"just, fair, and reasonable"**.
  * **Expansions of Article 21**: Right to Privacy (*K.S. Puttaswamy Case 2017*), Right to Clean Environment (*MC Mehta*), Right to Livelihood (*Olga Tellis*), Right to Speedy Trial, Right to Free Legal Aid.
* **Article 21A**: **Right to Education** (Added by **86th Amendment Act 2002**): Free and compulsory education to all children of the age of **6 to 14 years** (Enforced via RTE Act 2009).
* **Article 22**: Protection against arrest and detention:
  * **Punitive Detention**: Right to be informed of grounds, right to consult lawyer, right to be produced before magistrate within **24 hours**.
  * **Preventive Detention**: Detention without trial up to **3 months** without Advisory Board approval.

### 3. Right against Exploitation (Articles 23 & 24)
* **Article 23**: Prohibition of traffic in human beings, *begar* (forced labor), and similar forms of forced labor.
* **Article 24**: Prohibition of employment of children below the age of **14 years** in any factory, mine, or hazardous employment.

### 4. Right to Freedom of Religion (Articles 25 to 28)
* **Article 25**: Freedom of conscience and free profession, practice, and propagation of religion (subject to public order, morality, and health).
* **Article 26**: Freedom of religious denominations to manage religious affairs.
* **Article 27**: Freedom from payment of taxes for promotion of any particular religion (taxes cannot be levied; fees for services can be charged).
* **Article 28**: Freedom from attending religious instruction in certain educational institutions.

### 5. Cultural and Educational Rights (Articles 29 & 30)
* **Article 29**: Protection of language, script, or culture of minorities (and any section of citizens).
* **Article 30**: Right of minorities (based on **religion or language**) to establish and administer educational institutions. *Note: The term "minority" is NOT defined in the Constitution.*

### 6. Right to Constitutional Remedies (Article 32)
* Dr. B.R. Ambedkar called Article 32 the **"Heart and Soul of the Constitution"** and its very foundation.
* Empowers the Supreme Court to issue **5 Types of Writs** for enforcement of Fundamental Rights:
  1. **Habeas Corpus** (*"To have the body of"*): Protects against unlawful detention. Issued against both public authorities and private individuals.
  2. **Mandamus** (*"We Command"*): Compels a public official/body to perform a statutory public duty. Cannot be issued against private individuals, President, or Governors.
  3. **Prohibition** (*"To Forbid"*): Issued by a higher court to an inferior court/tribunal to prevent it from exceeding its jurisdiction (preventive in nature).
  4. **Certiorari** (*"To be Certified"*): Issued by a higher court to quash the order of an inferior court/tribunal (both preventive and curative).
  5. **Quo-Warranto** (*"By what authority?"*): Inquires into the legality of a claim of a person to a public office.

---

## 4. Comparison: Article 32 (Supreme Court) vs Article 226 (High Court)

| Parameter | Article 32 (Supreme Court) | Article 226 (High Court) |
| :--- | :--- | :--- |
| **Jurisdiction Scope** | Fundamental Rights ONLY | Fundamental Rights **AND any other legal rights** (Wider Scope) |
| **Territorial Jurisdiction** | All over India | Within its State territory (or where cause of action arises) |
| **Nature of Right** | Article 32 is **itself a Fundamental Right** (SC cannot refuse remedy) | Article 226 is **discretionary** (HC may refuse if alternative remedy exists) |

---

## 5. Landmark Case Laws on Fundamental Rights
* **A.K. Gopalan v. State of Madras (1950)**: Narrow interpretation of Article 21.
* **Golaknath v. State of Punjab (1967) (11-Judge Bench)**: Parliament cannot take away or abridge any Fundamental Right through constitutional amendments.
* **Kesavananda Bharati v. State of Kerala (1973) (13-Judge Bench)**: Overruled Golaknath; Parliament can amend any part of the Constitution including FRs, but cannot alter the **Basic Structure**.
* **Maneka Gandhi v. Union of India (1978)**: Golden Triangle of Articles 14, 19, and 21; introduced substantive due process.
* **Minerva Mills v. Union of India (1980)**: Fundamental Rights and Directive Principles are two wheels of a chariot; harmony and balance between Part III and Part IV is basic structure.
* **Indira Sawhney v. Union of India (1992)**: 50% cap on reservations; creamy layer concept in OBC reservation.
* **K.S. Puttaswamy v. Union of India (2017) (9-Judge Bench)**: Declared **Right to Privacy** a Fundamental Right under Article 21.

---

## 6. Important Facts & Teacher Warnings
* ⚠️ **"Non-Suspendable Rights"**: Under **44th Amendment Act 1978**, **Articles 20 and 21 CANNOT be suspended even during a National Emergency (Article 352)**!
* ⚠️ **"Article 19 Suspension Rule"**: Article 19 is automatically suspended under **Article 358** ONLY when National Emergency is declared on grounds of **War or External Aggression**, NOT on grounds of Armed Rebellion!
* ⚠️ **"Writs Open to Non-Aggrieved Persons"**: *Quo-Warranto* can be sought by any interested person, not necessarily by the aggrieved person!

---

## 7. Lecture Sources & Attribution
* **Lecture Source**: \`Lec 14: Part III, Article 12 to 35 Fundamental Rights\` (Video ID: \`hP0iB_70JZ8\`, 110m 34s)
* **Attribution**: Complete verbatim extraction of all 6 Fundamental Rights, Writs, and 7 Landmark Supreme Court judgments.
`;

insertChapter.run(
  'polity-ch-07',
  'fundamental-rights',
  7,
  'Part III: Fundamental Rights & Judicial Review (Articles 12 to 35)',
  'Equality, 6 Freedoms, Art 21 Expansion, 5 Writs & Landmark SC Judgments',
  'Part III',
  'Articles 12 to 35',
  40,
  32,
  15,
  100,
  JSON.stringify(['hP0iB_70JZ8']),
  ch7_content
);

console.log('✅ Chapter 07 Seeded.');

// ==============================================================================
// CHAPTER 08: DPSP & FUNDAMENTAL DUTIES
// ==============================================================================
const ch8_content = `# Chapter 08 — Part IV & IVA: Directive Principles & Fundamental Duties

## 1. Introduction
[FROM PLAYLIST]
**Part IV** of the Constitution (Articles 36 to 51) contains the **Directive Principles of State Policy (DPSP)**, borrowed from the **Irish Constitution of 1937** (which had copied it from Spanish Constitution). Dr. B.R. Ambedkar described DPSP as the **"Novel Features"** of the Indian Constitution, aiming to establish an **Economic and Social Democracy** and a **Welfare State** (rather than a Police State).

**Part IVA** (Article 51A) contains the **Fundamental Duties**, incorporated by the **42nd Amendment Act 1976** on the recommendation of the **Swaran Singh Committee**, inspired by the **USSR Constitution**.

---

## 2. Core Concepts: DPSP Characteristics & Article 37
* **Article 37**: Declares that Directive Principles are **NON-JUSTICIABLE** (not enforceable by any court). However, it explicitly states that these principles are **"Fundamental in the governance of the country"** and it shall be the duty of the State to apply these principles in making laws.
* Granvile Austin called Fundamental Rights and Directive Principles the **"Conscience of the Constitution"**.

---

## 3. Classification of Directive Principles (Socialistic, Gandhian, Liberal-Intellectual)
[FROM PLAYLIST]
While the Constitution does not formally classify DPSPs, on the basis of their ideological content and direction, they are classified into 3 broad categories:

### A. Socialistic Principles (Reflecting ideology of Socialism)
* **Article 38**: Promote the welfare of people by securing a social order permeated by justice (social, economic, political) and minimize inequalities in income, status, facilities.
* **Article 39**: Secure:
  * 39(a): Adequate means of livelihood for all citizens.
  * 39(b): Equitable distribution of material resources of the community for common good.
  * 39(c): Prevention of concentration of wealth and means of production.
  * 39(d): **Equal pay for equal work for both men and women**.
  * 39(e): Protection of health and strength of workers and children.
  * 39(f): Healthy development opportunities for children (added by 42nd Amendment 1976).
* **Article 39A**: **Equal justice and Free Legal Aid to the poor** (Added by 42nd Amendment 1976; led to Legal Services Authorities Act 1987 & NALSA).
* **Article 41**: Right to work, education, and public assistance in cases of unemployment, old age, sickness, disablement.
* **Article 42**: Just and humane conditions of work and **Maternity Relief** (led to Maternity Benefit Act 1961).
* **Article 43**: Living wage, decent standard of life, and social and cultural opportunities for all workers.
* **Article 43A**: **Participation of workers in the management of industries** (Added by 42nd Amendment 1976).
* **Article 47**: Raise the level of nutrition and the standard of living of people and improve public health.

### B. Gandhian Principles (Based on Gandhian Ideology of Reconstruction)
* **Article 40**: **Organisation of Village Panchayats** as units of self-government (fulfilled by 73rd Amendment 1992).
* **Article 43**: Promote cottage industries on an individual or co-operative basis in rural areas.
* **Article 43B**: Promote voluntary formation, autonomous functioning, democratic control of **Co-operative Societies** (Added by **97th Amendment 2011**).
* **Article 46**: Promote educational and economic interests of SCs, STs, and other weaker sections.
* **Article 47**: **Prohibition of the consumption of intoxicating drinks and drugs** injurious to health.
* **Article 48**: **Prohibit slaughter of cows, calves, and other milch and draught cattle** and improve their breeds.

### C. Liberal-Intellectual Principles (Reflecting ideology of Liberalism)
* **Article 44**: **Uniform Civil Code (UCC)** for all citizens throughout the territory of India (Goa was the first state; Uttarakhand passed UCC Act in 2024).
* **Article 45**: **Early childhood care and education for all children until they complete 6 years** (Amended by **86th Amendment 2002** when Art 21A was added).
* **Article 48**: Organise agriculture and animal husbandry on modern and scientific lines.
* **Article 48A**: **Protection and improvement of environment and safeguarding of forests and wildlife** (Added by **42nd Amendment 1976**; led to Wildlife Protection Act 1972 & Forest Conservation Act 1980).
* **Article 49**: Protection of monuments, places, and objects of historic interest and national importance.
* **Article 50**: **Separation of Judiciary from the Executive** in the public services of the State.
* **Article 51**: **Promotion of International Peace and Security**, maintain just relations between nations, and foster respect for international law.

---

## 4. Conflict between Fundamental Rights and DPSP (The Constitutional Tug-of-War)
[FROM PLAYLIST]

\`\`\`
1. Champakam Dorairajan (1951): FRs prevail over DPSP; DPSP are subsidiary.
   ↓
2. Golaknath Case (1967): Parliament cannot dilute FRs to implement DPSP.
   ↓
3. 25th Amendment (1971): Inserted Art 31C (Articles 39(b) & 39(c) prevail over Articles 14 & 19).
   ↓
4. Kesavananda Bharati (1973): Upheld Art 31C's first part giving primacy to 39(b) & (c).
   ↓
5. Minerva Mills (1980): Struck down blanket primacy of all DPSPs; established balance between Part III and Part IV as Basic Structure!
\`\`\`

---

## 5. Part IVA: Fundamental Duties (Article 51A)
[FROM PLAYLIST]
* **Swaran Singh Committee (1976)**: Recommended inclusion of 8 Fundamental Duties.
* **42nd Amendment Act 1976**: Added **Part IVA and Article 51A** containing **10 Fundamental Duties**.
* **86th Amendment Act 2002**: Added the **11th Fundamental Duty** (51A(k)) — Duty of parent/guardian to provide education opportunities to child between **6 and 14 years**.

### The 11 Fundamental Duties (Article 51A):
1. **(a)**: Abide by the Constitution and respect its ideals and institutions, the **National Flag and the National Anthem**.
2. **(b)**: Cherish and follow the noble ideals that inspired the national struggle for freedom.
3. **(c)**: Uphold and protect the **sovereignty, unity, and integrity of India**.
4. **(d)**: Defend the country and render national service when called upon to do so.
5. **(e)**: Promote harmony and common brotherhood among all people of India; renounce practices derogatory to the dignity of women.
6. **(f)**: Value and preserve the rich heritage of our **composite culture**.
7. **(g)**: Protect and improve the **natural environment including forests, lakes, rivers, and wildlife**, and have compassion for living creatures.
8. **(h)**: Develop **scientific temper, humanism, and the spirit of inquiry and reform**.
9. **(i)**: Safeguard public property and abjure violence.
10. **(j)**: Strive towards excellence in all spheres of individual and collective activity.
11. **(k)**: Provide educational opportunities to child/ward between **6 and 14 years** (*86th Amendment 2002*).

---

## 6. Important Facts & Traps
* ⚠️ **"Non-Enforceability"**: Fundamental Duties are **non-justiciable** (like DPSPs). There is no direct legal penalty for their violation unless Parliament enacts a specific law (e.g. *Prevention of Insults to National Honour Act 1971*, *Wildlife Protection Act 1972*).
* ⚠️ **"Swaran Singh Rejected Recommendations"**: The Swaran Singh Committee recommended: (1) Duty to pay taxes, (2) Penalty/punishment for non-performance of duties. Both were **rejected** by the Congress government in 1976!
* ⚠️ **"National Anthem vs National Song"**: Article 51A(a) explicitly mandates respect for the **National Flag and National Anthem**. It does **NOT** mention the National Song.

---

## 7. Lecture Sources & Attribution
* **Lecture Source**: \`Lec 15: Part IV, Article 36 to 51 Directive Principles of State Policies\` (Video ID: \`ZxIFhUxa54o\`, 76m 50s)
* **Attribution**: Synthesized with complete categorization (Socialistic, Gandhian, Liberal-Intellectual) and historical conflict jurisprudence.
`;

insertChapter.run(
  'polity-ch-08',
  'dpsp-and-fundamental-duties',
  8,
  'Part IV & IVA: Directive Principles & Fundamental Duties',
  'Socialistic, Gandhian & Liberal Principles, Article 31C, Swaran Singh Committee & 11 Duties',
  'Part IV & IVA',
  'Articles 36 to 51, 51A',
  35,
  24,
  15,
  98,
  JSON.stringify(['ZxIFhUxa54o']),
  ch8_content
);

console.log('✅ Chapter 08 Seeded.');
console.log('🎉 Chapters 5–8 Successfully Seeded into Database!');
