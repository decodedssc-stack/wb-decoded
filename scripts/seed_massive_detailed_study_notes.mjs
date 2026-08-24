import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('📖 Generating Massive, Encyclopedic, Ultra-Detailed Study Notes across all subjects...');

// Ensure table exists
db.exec(`
  CREATE TABLE IF NOT EXISTS study_notes (
    id TEXT PRIMARY KEY,
    subject_id TEXT NOT NULL,
    chapter_id TEXT,
    title TEXT NOT NULL,
    title_bn TEXT,
    exam_coverage TEXT NOT NULL,
    read_time_mins INTEGER DEFAULT 25,
    summary TEXT NOT NULL,
    content_markdown TEXT NOT NULL,
    is_premium INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
  );
`);

const masterDetailedNotes = [
  // =========================================================================
  // 1. INDIAN POLITY: FUNDAMENTAL RIGHTS (ARTICLES 12 TO 35) & WRITS
  // =========================================================================
  {
    id: 'note-polity-fundamental-rights',
    subject_id: 'sub-polity',
    chapter_id: 'chap-polity-fr',
    title: 'Fundamental Rights (Articles 12 to 35): Exhaustive Legal Commentary & Case Laws',
    title_bn: 'মৌলিক অধিকার (অনুচ্ছেদ ১২ থেকে ৩৫): সম্পূর্ণ আইনগত বিশ্লেষণ ও সুপ্রিম কোর্টের রায়',
    exam_coverage: 'UPSC Civil Services (Prelims & Mains), WBCS (Exe) Prelims & Mains (Paper V), SSC CGL, WB Police SI/Constable, WBPSC Miscellaneous, Judicial Services',
    read_time_mins: 28,
    summary: 'The definitive handbook on Part III of the Constitution: Philosophical evolution, Article 12 (Definition of State & Judicial inclusions), Article 13 (Doctrines of Severability, Eclipse, Waiver & Basic Structure), Articles 14–18 (Equality & EWS 103rd AA), Articles 19–22 (Freedoms, Article 21 Due Process & Puttaswamy), Articles 23–28 (Exploitation & Religion), Articles 29–30 (Minorities), and Article 32 Writs vs Article 226.',
    content_markdown: `
# Master Guide to Fundamental Rights (Part III, Articles 12–35)

> **Magna Carta of the Indian Republic**: Part III of the Constitution is described as the *Magna Carta of India*. Fundamental rights are justiciable, negative obligations upon the State (with certain positive entitlements), and the bedrock of constitutional democracy.

---

## 🏛️ Section 1: Historical Evolution & Philosophical Foundations

The inclusion of Fundamental Rights in the Indian Constitution was the culmination of over five decades of political struggle and constitutional drafting:

1. **Constitution of India Bill, 1895 (Home Rule Bill)**: First documented articulation of fundamental freedoms (freedom of speech, right to privacy, right to property, equality before law) envisioned under Lokmanya Bal Gangadhar Tilak.
2. **Nehru Report (1928)**: Drafted by a committee headed by Motilal Nehru. Stated that the primary concern of Indians was to secure Fundamental Rights that could not be withdrawn under any circumstances. Proposed 19 fundamental rights, 10 of which were incorporated into the 1950 Constitution.
3. **Karachi Session of INC (1931)**: Presided over by **Sardar Vallabhbhai Patel**. Passed the historic *Resolution on Fundamental Rights and Economic Programme*, drafted by Pt. Jawaharlal Nehru.
4. **Sapru Committee Report (1945)**: Formally recommended dividing fundamental rights into two distinct categories:
   * **Justiciable Rights**: Enforceable by courts of law (became **Part III: Fundamental Rights**).
   * **Non-Justiciable Rights**: Directives to the State (became **Part IV: Directive Principles of State Policy**).
5. **Constituent Assembly Drafting**:
   * **Advisory Committee on Fundamental Rights, Minorities, and Tribal and Excluded Areas**: Chaired by **Sardar Vallabhbhai Patel**.
   * **Fundamental Rights Sub-Committee**: Chaired by **J.B. Kripalani**. Members included B.R. Ambedkar, K.M. Munshi, Alladi Krishnaswamy Ayyar, K.T. Shah, Maulana Azad, Rajkumari Amrit Kaur, and Hansa Mehta.

---

## ⚖️ Section 2: General Provisions — Article 12 & Article 13

### 📌 1. Article 12: Definition of 'The State'
For the purposes of Part III, the term **"State"** includes:
1. **The Government and Parliament of India** (Executive and Legislative organs of the Union).
2. **The Government and the Legislature of each of the States** (Executive and Legislative organs of States).
3. **All Local Authorities** within the territory of India or under the control of the Government of India (Municipalities, Panchayats, District Boards, Improvement Trusts, Port Trusts — governed under the *General Clauses Act, 1897*).
4. **All Other Authorities**: This term has been extensively expanded by judicial interpretation.

#### Landmark Tests for "Other Authorities":
* **Electricity Board, Rajasthan v. Mohan Lal (1967)**: Held that authorities created by a statute on which powers are conferred by law come under Article 12.
* **Sukhdev Singh v. Bhagatram (1975)**: Statutory corporations like **LIC, ONGC, and IFC** are "State".
* **R.D. Shetty v. International Airport Authority of India (IAA) (1979)**: Justice P.N. Bhagwati laid down 5 decisive tests to determine an *Agency or Instrumentality of the State*:
  * Entire share capital held by the Government.
  * Deep and pervasive State control.
  * State financial assistance meeting almost entire expenditure.
  * Monopolistic status conferred or protected by the State.
  * Functions of the corporation are of public importance and closely related to governmental functions.
* **Pradeep Kumar Biswas v. Indian Institute of Chemical Biology (2002)**: Overruled *Sabhajit Tewary (1975)*; held that **CSIR** is an instrumentality of State under Art 12.
* **Is the Judiciary a 'State'?**:
  * *Administrative side*: YES, the actions of the judiciary in administrative matters (e.g. appointments) are subject to Fundamental Rights.
  * *Judicial side*: NO, a judicial order passed by a competent court cannot be challenged as violating Fundamental Rights under Article 32 (*Naresh Shridhar Mirajkar v. State of Maharashtra 1967*, *A.R. Antulay v. R.S. Nayak 1988*).

---

### 📌 2. Article 13: Laws Inconsistent with Fundamental Rights (Judicial Review)

Article 13 provides the express constitutional basis for the power of **Judicial Review** vested in the Supreme Court (Art 32) and High Courts (Art 226).

* **Article 13(1) (Pre-Constitutional Laws)**: All laws in force in India immediately before 26 January 1950, in so far as they are inconsistent with Part III, shall be void to the extent of such inconsistency.
  * **Doctrine of Severability**: If a statute contains valid and invalid provisions, only the invalid parts are struck down if they can be separated from the valid parts (*A.K. Gopalan v. State of Madras 1950*, *State of Bombay v. F.N. Balsara 1951*).
  * **Doctrine of Eclipse**: Pre-constitutional laws violating FRs do not become dead completely; they remain in a dormant/moribund condition overshadowed by the Fundamental Right. If the FR is amended, the law becomes active again (*Bhikaji Narain Dhakras v. State of M.P. 1955*).
* **Article 13(2) (Post-Constitutional Laws)**: The State shall not make any law which takes away or abridges the rights conferred by Part III. Any law made in contravention shall be *void ab initio* (void from the beginning).
  * **Doctrine of Waiver**: An Indian citizen **cannot waive** his/her Fundamental Rights (*Basheshar Nath v. CIT 1959*).
* **Article 13(3) (Definition of 'Law')**:
  * Statutory laws enacted by Parliament or State Legislatures.
  * Delegated legislation: Ordinances, Orders, Bye-laws, Rules, Regulations, Notifications.
  * Non-legislative sources: Customs or Usages having the force of law.
  * *Administrative circulars/executive instructions* having no statutory force do not qualify as law under Article 13.
* **Article 13(4) & Constitutional Amendments (The Great Judicial-Parliamentary Struggle)**:
  * *Shankari Prasad v. Union of India (1951)*: Supreme Court held that constitutional amendment under Article 368 is NOT "law" within the meaning of Article 13(2).
  * *Sajjan Singh v. State of Rajasthan (1965)*: Reaffirmed Shankari Prasad.
  * *Golaknath v. State of Punjab (1967)*: 11-judge bench (6:5) reversed earlier judgments. Held that Parliament CANNOT amend Part III to take away fundamental rights.
  * *24th Constitutional Amendment Act (1971)*: Parliament inserted Article 13(4) and Article 368(3) declaring that Article 13 shall not apply to any amendment made under Article 368.
  * *Kesavananda Bharati v. State of Kerala (1973)*: Historic 13-judge bench (7:6). Upheld 24th Amendment but propounded the **Basic Structure Doctrine** — Parliament can amend any part of the Constitution, including Part III, but cannot destroy or alter its basic structure.
  * *Minerva Mills v. Union of India (1980)*: Struck down clauses (4) and (5) of Article 368 added by the 42nd Amendment; held that judicial review and balance between Part III and Part IV are part of the Basic Structure.

---

## 🌟 Section 3: Right to Equality (Articles 14 to 18)

### Overview of Right to Equality (Articles 14 to 18)
* **Article 14**: Equality Before Law & Equal Protection of Laws (General Principle).
* **Article 15**: Prohibition of Discrimination on 5 Specific Grounds.
* **Article 16**: Equality of Opportunity in Public Employment.
* **Article 17**: Abolition of Untouchability (Absolute Right).
* **Article 18**: Abolition of Titles (Prevention of Artificial Aristocracy).

### 📌 Article 14: Equality Before Law & Equal Protection of Laws
"The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India."
* Applies to **all persons** (citizens, foreigners, legal persons, companies, statutory corporations).
* **Two Sub-Concepts**:
  1. **Equality Before Law (British Origin)**: Negative concept. Absence of any special privileges; all persons subject to ordinary law administered by ordinary courts. Derived from **A.V. Dicey's Rule of Law** (3 elements: Supremacy of law, Equality before law, Predominance of legal spirit).
  2. **Equal Protection of the Laws (American 14th Amendment Origin)**: Positive concept. Equality of treatment under equal circumstances ("Like should be treated alike").
* **Doctrine of Reasonable Classification**:
  * Classification must be founded on an **Intelligible Differentia** (distinguishing persons grouped together from others).
  * The differentia must have a **Rational Nexus** to the object sought to be achieved by the statute (*State of West Bengal v. Anwar Ali Sarkar 1952*).
* **New Dimension (Non-Arbitrariness Doctrine)**:
  * In *E.P. Royappa v. State of Tamil Nadu (1974)*, Justice P.N. Bhagwati propounded: *"Equality is a dynamic concept with many aspects and dimensions and it cannot be 'cribbed, cabined and confined' within traditional and doctrinaire limits. Equality and arbitrariness are sworn enemies."* Reaffirmed in *Maneka Gandhi (1978)* and *Shayara Bano (Triple Talaq case 2017)*.

---

### 📌 Article 15: Prohibition of Discrimination on Specified Grounds
* **Article 15(1)**: State shall not discriminate against any citizen on grounds **ONLY** of:
  * **Religion, Race, Caste, Sex, Place of birth**, or any of them.
* **Article 15(2)**: No citizen shall be subject to disability/restriction regarding:
  * Access to shops, public restaurants, hotels, places of public entertainment.
  * Use of wells, tanks, bathing ghats, roads, places of public resort maintained wholly or partly out of State funds or dedicated to the use of general public (enforceable against private individuals too).
* **Exceptions to Article 15**:
  * **Article 15(3)**: Special provisions for **Women and Children** (e.g. reservation of seats for women in local bodies, free education for children).
  * **Article 15(4)**: Added by **1st Amendment Act, 1951** following *State of Madras v. Champakam Dorairajan (1951)*. Allows special provisions for Socially and Educationally Backward Classes (SEBC) or SC/ST.
  * **Article 15(5)**: Added by **93rd Amendment Act, 2005**. Allows reservation in admission to educational institutions (including private aided or unaided, EXCEPT minority institutions under Art 30(1)). Upheld in *Ashoka Kumar Thakur v. Union of India (2008)*.
  * **Article 15(6)**: Added by **103rd Amendment Act, 2019**. Allows up to **10% reservation for Economically Weaker Sections (EWS)** of citizens (other than SC/ST/OBC) in educational institutions. Upheld by 5-judge bench (3:2) in *Janhit Abhiyan v. Union of India (2022)*.

---

### 📌 Article 16: Equality of Opportunity in Public Employment
* **Article 16(1) & 16(2)**: Equality of opportunity for all citizens in matters of employment or appointment to any office under the State. 7 prohibited grounds: **Religion, Race, Caste, Sex, Descent, Place of birth, Residence**.
* **Exceptions**:
  * **Article 16(3)**: Parliament (not State legislatures) can prescribe **Residence** as a qualification for certain appointments in a State/UT (*Public Employment (Requirement as to Residence) Act, 1957*).
  * **Article 16(4)**: State may reserve appointments/posts in favor of any backward class of citizens which, in the opinion of the State, is **not adequately represented** in the services under the State.
  * **Article 16(4A)**: Inserted by **77th Amendment Act, 1995** (overriding Mandal case restriction on promotions) and amended by **85th Amendment Act, 2001** (Consequential Seniority) — allows reservation in promotions for SCs and STs.
  * **Article 16(4B)**: Inserted by **81st Amendment Act, 2000** — Carry forward rule for unfilled vacancies of a year; they shall not be combined with current vacancies to exceed the 50% ceiling limit.
  * **Article 16(5)**: Office in connection with the affairs of any religious or denominational institution may be reserved for adherents of that religion.
  * **Article 16(6)**: Inserted by **103rd Amendment Act, 2019** — Up to **10% EWS reservation in civil posts and services**.

#### Landmark Case: Indra Sawhney v. Union of India (Mandal Case, 1992)
* 9-judge bench ruled:
  1. 27% quota for OBCs upheld.
  2. Backward classes under Art 16(4) can be identified on the basis of caste (Caste can be a starting point).
  3. Total reservation quota **must not exceed 50%** in ordinary circumstances.
  4. **Creamy Layer** must be excluded from backward classes.
  5. Reservation should be confined to initial appointments only and **not in promotions**.
  6. No reservation in certain technical and super-specialty posts.

---

### 📌 Article 17: Abolition of Untouchability
* Untouchability is abolished and its practice in any form is forbidden. Enforceable against both **State and Private individuals**.
* "Untouchability" is **not defined** in the Constitution or the Act. In *J. Devarajah v. Padmanna (Mysore HC 1958)*, held that it refers to the historical social disability imposed on certain classes by reason of birth.
* Legislation enacted: *Untouchability (Offences) Act, 1955*, comprehensively amended and renamed the **Protection of Civil Rights Act, 1955**; and the **Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989**.
* **Article 17 is absolute** — no exceptions or reasonable restrictions.

---

### 📌 Article 18: Abolition of Titles
* **Article 18(1)**: No title, not being a military or academic distinction, shall be conferred by the State.
* **Article 18(2)**: No citizen of India shall accept any title from any foreign State.
* **Article 18(3) & 18(4)**: Non-citizens holding office of profit under the State cannot accept any title, present, or emolument from a foreign State without the consent of the President.
* **National Awards (Bharat Ratna, Padma Vibhushan, Padma Bhushan, Padma Shri)**:
  * In *Balaji Raghavan v. Union of India (1996)*, the Supreme Court upheld the constitutional validity of National Awards. Held that they are **decorations/honors** for merit and public service and do NOT violate Article 18, provided they are **not used as prefixes or suffixes** to the names of the awardees.

---

## 🕊️ Section 4: Right to Freedom (Articles 19 to 22)

### 📌 1. Article 19: Protection of 6 Democratic Freedoms
Available **ONLY to Citizens of India** (and not to foreigners, companies, or artificial persons).

| Freedom (Article 19(1)) | Scope & Judicial Inclusions | Reasonable Restrictions (Article Clause) |
| :--- | :--- | :--- |
| **19(1)(a): Freedom of Speech & Expression** | • Freedom of the Press (*Romesh Thappar 1950*, *Indian Express 1985*).<br>• Right to Know & Information (*State of UP v. Raj Narain 1975*, *PUCL 2003*).<br>• Right to remain Silent (*Bijoe Emmanuel v. State of Kerala 1986* - National Anthem case).<br>• Right against phone tapping (*PUCL 1997*).<br>• Commercial speech/advertising (*Tata Press 1995*). | **Article 19(2)**: 8 grounds:<br>1. Sovereignty and integrity of India.<br>2. Security of the State.<br>3. Friendly relations with foreign States.<br>4. Public order.<br>5. Decency or morality.<br>6. Contempt of court.<br>7. Defamation.<br>8. Incitement to an offence. |
| **19(1)(b): Freedom to Assemble Peacefully** | Right to hold peaceful public meetings and processions without arms. Does NOT include the right to strike (*Kameshwar Singh 1962*). | **Article 19(3)**: Sovereignty and integrity of India, Public order. (Sec 144 CrPC, Sec 141 IPC). |
| **19(1)(c): Freedom to Form Associations/Unions** | Right to form political parties, clubs, trade unions, societies. **Co-operative Societies** added by **97th Amendment Act, 2011**. | **Article 19(4)**: Sovereignty and integrity of India, Public order, Morality. |
| **19(1)(d): Freedom of Movement** | Right to move freely throughout the territory of India (internal dimension). | **Article 19(5)**: Interests of the general public, Protection of interests of any Scheduled Tribe. |
| **19(1)(e): Freedom of Residence & Settlement** | Right to reside and settle in any part of India. | **Article 19(5)**: Interests of the general public, Protection of interests of Scheduled Tribes. |
| **19(1)(f): Right to Property** | *(Deleted by 44th Constitutional Amendment Act, 1978; moved to Article 300A).* | — |
| **19(1)(g): Freedom of Trade, Profession & Business** | Right to practice any profession, trade, or occupation. Does NOT include carrying on immoral/dangerous trades (trafficking, illicit liquor). | **Article 19(6)**: Professional/technical qualifications, State monopoly creation. |

---

### 📌 2. Article 20: Protection in Respect of Conviction for Offences
Applies to **both Citizens and Foreigners**. Cannot be suspended even during a National Emergency (44th AA 1978).

1. **Article 20(1): Protection against Ex-Post Facto Laws**:
   * No person shall be convicted of any offence except for violation of a law in force at the time of the commission of the act.
   * No person shall be subjected to a penalty greater than that which might have been inflicted under the law in force at the time of commission.
   * **Limitation**: Applies **only to criminal laws**, NOT to civil liabilities or tax laws (*Kedar Nath v. State of West Bengal 1953*).
2. **Article 20(2): Protection against Double Jeopardy**:
   * *"Nemo debet bis vexari pro una et eadem causa"* — No person shall be prosecuted and punished for the same offence more than once.
   * **Limitation**: Available only before a **Court of Law or Judicial Tribunal**. Does not bar departmental or administrative disciplinary proceedings following a court trial (*Maqbool Hussain v. State of Bombay 1953*).
3. **Article 20(3): Protection against Self-Incrimination**:
   * No person accused of any offence shall be compelled to be a witness against himself.
   * In *Selvi v. State of Karnataka (2010)*, the Supreme Court held that involuntary administration of **Narco-analysis, Polygraph (Lie Detector) tests, and Brain Electrical Activation Profile (BEAP)** violates Article 20(3) and Article 21.

---

#### The Great Judicial Transformation: Gopalan to Maneka

| Parameter | 1950: A.K. Gopalan Case | 1978: Maneka Gandhi Case |
| :--- | :--- | :--- |
| **Interpretation** | Narrow & literal interpretation. | Expansive, holistic & dynamic interpretation. |
| **Procedure Clause** | "Procedure Established by Law" strictly literal: Any validly enacted legislative law suffices. | Introduced American "Due Process of Law" — Procedure must be **Just, Fair & Reasonable**. |
| **Article Interconnection** | Disconnected Articles 14, 19, and 21 into isolated silos. | Interconnected the **"Golden Triangle" (Articles 14, 19, 21)**. |

#### Rights Derived under Article 21 by Judicial Verdicts:
1. **Right to live with Human Dignity** (*Francis Coralie Mullin 1981*).
2. **Right to Clean Environment, Pollution-Free Water & Air** (*Subhash Kumar v. State of Bihar 1991*, *M.C. Mehta cases*).
3. **Right to Livelihood** (*Olga Tellis v. Bombay Municipal Corporation 1985*).
4. **Right to Privacy** (*Justice K.S. Puttaswamy (Retd.) v. Union of India 2017* — 9-judge bench unanimous).
5. **Right to Free Legal Aid** (*Hussainara Khatoon 1979*, *M.H. Hoskot 1978*).
6. **Right to Speedy Trial** (*Hussainara Khatoon 1979*).
7. **Right against Handcuffing & Solitary Confinement** (*Prem Shankar Shukla 1980*, *Sunil Batra 1980*).
8. **Right to Emergency Medical Care** (*Parmanand Katara 1989*).
9. **Right to Die with Dignity (Passive Euthanasia & Living Will)** (*Common Cause v. Union of India 2018*).
10. **Right to Marry Person of One's Choice** (*Shafin Jahan / Hadiya Case 2018*, *Shakti Vahini 2018*).
11. **Decriminalization of Consensual Homosexuality** (*Navtej Singh Johar v. Union of India 2018* — reading down Sec 377 IPC).
12. **Right to Shelter / Adequate Housing** (*Chameli Singh 1996*).

---

### 📌 4. Article 21A: Right to Education
* Inserted by the **86th Constitutional Amendment Act, 2002**.
* The State shall provide **free and compulsory education** to all children of the age of **6 to 14 years** in such manner as the State may determine.
* Precedent cases: *Mohini Jain v. State of Karnataka (1992)* (Right to education is inherent in Art 21) and *Unni Krishnan v. State of A.P. (1993)* (Right to education is fundamental up to age 14).
* Parliament enacted the **Right of Children to Free and Compulsory Education (RTE) Act, 2009**, which came into force on **1 April 2010**.

---

### 📌 5. Article 22: Protection Against Arrest and Detention

* **Punitive Detention** (Detention after trial and conviction by court):
  * **Article 22(1)**: Right to be informed, as soon as may be, of the grounds of arrest.
  * **Article 22(1)**: Right to consult and be defended by a legal practitioner of one's choice.
  * **Article 22(2)**: Right to be produced before the nearest **Magistrate within 24 hours** of arrest (excluding journey time).
  * **Article 22(2)**: No person shall be detained in custody beyond 24 hours without the authority of a Magistrate.
  * *Exceptions*: Not available to **Enemy Aliens** or persons detained under **Preventive Detention laws**.
  * **D.K. Basu v. State of West Bengal (1997)**: Supreme Court laid down 11 mandatory guidelines to prevent custodial violence and arbitrary arrests (Memo of arrest, medical examination every 48 hours, informing relatives).
* **Preventive Detention** (Detention without trial on suspicion of future unlawful acts):
  * Maximum initial detention period is **3 months** without reference to an **Advisory Board** (consisting of persons who are, or have been, or are qualified to be appointed as Judges of a High Court).
  * Ground of detention must be communicated to the detenue (except facts State considers against public interest to disclose).
  * Earliest opportunity of making a representation against the order.
  * *Notable Preventive Detention Laws*: MISA (1971), COFEPOSA (1974), NSA (1980), TADA (1985), POTA (2002), UAPA (1967 as amended).

---

## 🛡️ Section 5: Right Against Exploitation (Articles 23 & 24)

### 📌 Article 23: Prohibition of Traffic in Human Beings & Forced Labor
* Prohibits **Traffic in human beings**, **Begar** (unpaid forced labor), and other similar forms of forced labor.
* Applies against both **State and Private persons**.
* *Exception (Article 23(2))*: State can impose **compulsory service for public purposes** (e.g. military conscription, social service), provided no discrimination is made on grounds only of religion, race, caste or class.
* Landmark Case: *People's Union for Democratic Rights (PUDR) v. Union of India (Asiad Workers Case, 1982)* — Supreme Court held that paying less than minimum wages constitutes "forced labor" under Article 23.

### 📌 Article 24: Prohibition of Child Labor
* No child below the age of **14 years** shall be employed to work in any factory or mine or engaged in any other **hazardous employment**.
* In *M.C. Mehta v. State of Tamil Nadu (1996)* (Sivakasi fireworks case), Supreme Court ordered creation of the *Child Labour Rehabilitation-cum-Welfare Fund*.
* The *Child and Adolescent Labour (Prohibition and Regulation) Act, 1986* (amended in 2016) completely prohibits employment of children below 14 in **all occupations and processes**, and prohibits adolescents (14–18 years) in hazardous occupations.

---

## 🕌 Section 6: Right to Freedom of Religion (Articles 25 to 28)

| Article | Nature of Right Guaranteed | Constitutional Scope & Restrictions |
| :--- | :--- | :--- |
| **Article 25** | **Individual Freedom**: Freedom of Conscience, and free Profession, Practice and Propagation of religion. | Subject to **Public Order, Morality, Health, and other provisions of Part III**.<br>• Right to propagate does NOT include right to forcibly convert (*Rev. Stanislaus 1977*).<br>• Wearing and carrying of *Kirpans* is included in Sikh religion.<br>• Hindu institutions include Sikh, Jain, and Buddhist institutions. |
| **Article 26** | **Group / Denominational Freedom**: Right to establish and maintain institutions for religious and charitable purposes; manage own religious affairs; own and acquire property. | Subject to **Public Order, Morality, and Health** (NOT subject to other FRs).<br>• **Essential Religious Practices (ERP) Doctrine** (*Shirur Mutt Case 1954*).<br>• *Sabarimala Case (Indian Young Lawyers Assn 2018)*: ERP must align with constitutional morality. |
| **Article 27** | **Freedom from Taxation**: No person shall be compelled to pay any taxes for the promotion or maintenance of any particular religion. | • State funds cannot be used to patronize one religion.<br>• **Taxes are prohibited, but Fees are allowed** (Fee can be levied for regulatory services, safety, sanitation at pilgrimages). |
| **Article 28** | **Religious Instruction in Educational Institutions**: Regulation of religious teaching in 4 categories of schools. | 1. *Wholly maintained by State*: Completely Prohibited.<br>2. *Administered by State but established under Trust*: Permitted.<br>3. *Recognized by State*: Voluntary (Requires consent).<br>4. *Receiving Aid from State*: Voluntary. |

---

## 📚 Section 7: Cultural & Educational Rights of Minorities (Articles 29 & 30)

### 📌 Article 29: Protection of Interests of Minorities
* **Article 29(1)**: Any section of citizens residing in India having a distinct **Language, Script, or Culture** of its own shall have the right to conserve the same. (Available to ANY group of citizens, not just religious minorities).
* **Article 29(2)**: No citizen shall be denied admission into any educational institution maintained by the State or receiving aid out of State funds on grounds ONLY of religion, race, caste, language or any of them.

### 📌 Article 30: Right of Minorities to Establish & Administer Educational Institutions
* Available **ONLY to Religious and Linguistic Minorities** (Minority status determined State-wise, not nationally — *T.M.A. Pai Foundation 2002*).
* **Article 30(1)**: All minorities, whether based on religion or language, shall have the right to establish and administer educational institutions of their choice.
* **Article 30(1A)**: Inserted by 44th AA 1978 — If State acquires property of a minority educational institution, compensation amount fixed must not abridge the right guaranteed under 30(1).
* **Article 30(2)**: State shall not discriminate in granting aid to educational institutions on ground that it is under the management of a minority.

---

## 📜 Section 8: Right to Constitutional Remedies — Article 32 & The 5 Writs

> Dr. B.R. Ambedkar: *"If I was asked to name any particular article in this Constitution as the most important — an article without which this Constitution would be a nullity — I could not refer to any other article except this one. It is the very soul of the Constitution and the very heart of it."*

* **Article 32 is itself a Fundamental Right**: A citizen can directly approach the Supreme Court without going through lower courts.

### Detailed Comparison: 5 Prerogative Writs

| Writ Name | Literal Meaning | Against Whom Issued | When Issued & Purpose | When CANNOT be Issued |
| :--- | :--- | :--- | :--- | :--- |
| **1. Habeas Corpus** | *"To have the body of"* | Both **Public Authorities** & **Private Individuals** | To release a person detained unlawfully or without legal justification. | • Detention is lawful.<br>• Proceeding is for contempt of legislature/court.<br>• Jurisdiction is outside the court. |
| **2. Mandamus** | *"We Command"* | **Public Officials, Lower Courts, Tribunals, Corporations** | Directs performance of a public/statutory duty that the authority has failed to perform. | • Private individuals.<br>• Discretionary duty (non-statutory).<br>• Against President or Governor.<br>• To enforce contractual obligations. |
| **3. Prohibition** | *"To Forbid"* | **Judicial & Quasi-Judicial Authorities only** | Issued by higher court to prevent lower court/tribunal from exceeding its jurisdiction (Preventive). | • Administrative authorities.<br>• Legislative bodies.<br>• Private individuals. |
| **4. Certiorari** | *"To be Certified"* | **Judicial, Quasi-Judicial, and Administrative Authorities** (*since 1991*) | Quashes an order already passed in excess of jurisdiction or violation of Natural Justice (Curative & Preventive). | • Purely legislative acts.<br>• Private individuals. |
| **5. Quo-Warranto** | *"By what Authority"* | **Person holding Public Office** | Prevents illegal usurpation of a public substantive constitutional office. Can be sought by ANY citizen (no Locus Standi required). | • Private office.<br>• Ministerial office. |

### Comparative Analysis: Article 32 vs Article 226

| Parameter | Article 32 (Supreme Court) | Article 226 (High Court) |
| :--- | :--- | :--- |
| **Nature of Right** | Article 32 is **itself a Fundamental Right**. SC cannot refuse to exercise writ jurisdiction. | Article 226 is a **Constitutional / Discretionary Remedy**. High Court may refuse relief if alternative remedy exists. |
| **Scope of Enforcement** | Enforces **ONLY Fundamental Rights** (Part III). | Enforces **Fundamental Rights AND Ordinary Legal Rights** (*"for any other purpose"*). |
| **Territorial Jurisdiction** | Throughout the entire territory of India. | Within the territorial jurisdiction of the State, or where cause of action arises (*Art 226(2)*). |
| **Jurisdictional Width** | **Narrower scope** than High Court (restricted to FRs only). | **Wider scope** than Supreme Court (covers both FRs and legal rights). |

---

## 🎯 Section 9: Articles 33, 34 & 35 (Armed Forces, Martial Law & Legislation)

* **Article 33**: Empowers **Parliament** (by law) to restrict or abrogate the application of Fundamental Rights to members of the Armed Forces, Paramilitary forces, Police forces, and Intelligence agencies to ensure proper discharge of duties and maintenance of discipline (e.g. *Army Act 1950*, *Navy Act 1950*, *Air Force Act 1950*).
* **Article 34**: Restriction on rights while **Martial Law** (military rule) is in force in any area. Allows Parliament to indemnify any person in service of the Union or State for acts done during martial law.
* **Article 35**: Power to make laws to give effect to certain specified fundamental rights (Arts 16(3), 32(3), 33, 34, and prescribing punishments for untouchability Art 17 and forced labor Art 23) **vests SOLELY in Parliament**, and NOT in State Legislatures, ensuring uniformity throughout India.

---

## 💡 Section 10: Master Revision Matrix & Examiner's Traps

| Parameter / Question Pattern | Exact Constitutional Rule & Articles |
| :--- | :--- |
| **Rights Available ONLY to Citizens of India** | **Articles 15, 16, 19, 29, and 30** |
| **Rights Available to BOTH Citizens & Foreigners** | **Articles 14, 20, 21, 21A, 22, 23, 24, 25, 26, 27, 28** |
| **Rights that CANNOT be Suspended during Emergency** | **Articles 20 and 21** (44th Amendment Act, 1978) |
| **Rights with ABSOLUTE Protection (No Exceptions)** | **Article 17 (Untouchability)** |
| **Article 19 Automatic Suspension Grounds** | **War & External Aggression ONLY** (NOT Armed Rebellion) |
| **Writs Available Against Private Individuals** | **Habeas Corpus** |
| **Writ Where 'Locus Standi' is NOT Required** | **Quo-Warranto** |
    `
  }
];

// Update database
const updateNoteStmt = db.prepare(`
  INSERT OR REPLACE INTO study_notes (
    id, subject_id, chapter_id, title, title_bn, exam_coverage, read_time_mins, summary, content_markdown, is_premium, views_count
  ) VALUES (
    @id, @subject_id, @chapter_id, @title, @title_bn, @exam_coverage, @read_time_mins, @summary, @content_markdown, @is_premium, @views_count
  )
`);

let updated = 0;
const trans = db.transaction(() => {
  for (const n of masterDetailedNotes) {
    updateNoteStmt.run({
      chapter_id: null,
      title_bn: null,
      is_premium: 0,
      views_count: 512,
      ...n
    });
    updated++;
  }
});

trans();
console.log(`✅ Successfully seeded ${updated} encyclopedic master notes!`);
