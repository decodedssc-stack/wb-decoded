import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🚀 Initializing comprehensive Study Notes database table & seeding notes...');

// 1. Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS study_notes (
    id TEXT PRIMARY KEY,
    subject_id TEXT NOT NULL,
    chapter_id TEXT,
    title TEXT NOT NULL,
    title_bn TEXT,
    exam_coverage TEXT NOT NULL,
    read_time_mins INTEGER DEFAULT 10,
    summary TEXT NOT NULL,
    content_markdown TEXT NOT NULL,
    is_premium INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
  );

  CREATE INDEX IF NOT EXISTS idx_study_notes_subject ON study_notes(subject_id);
  CREATE INDEX IF NOT EXISTS idx_study_notes_chapter ON study_notes(chapter_id);
`);

// 2. Comprehensive Study Notes Data across All Core Subjects
const studyNotesList = [
  // =========================================================================
  // 1. INDIAN POLITY & CONSTITUTION
  // =========================================================================
  {
    id: 'note-polity-fundamental-rights',
    subject_id: 'sub-polity',
    chapter_id: 'chap-polity-fr',
    title: 'Fundamental Rights (Articles 12 to 35) & Constitutional Remedies',
    title_bn: 'মৌলিক অধিকার (অনুচ্ছেদ ১২ থেকে ৩৫) এবং সাংবিধানিক প্রতিকার',
    exam_coverage: 'WBCS (Exe), UPSC CSE, SSC CGL/CHSL, WB Police SI/Constable, WBPSC Miscellaneous, Clerkship, Food SI',
    read_time_mins: 12,
    summary: 'Exhaustive coverage of 6 Fundamental Rights, Article 13 Judicial Review, Article 19 6 Freedoms, Article 21 Right to Life, Article 32 Writs vs Article 226, and Landmark Supreme Court Judgments (Kesavananda Bharati, Maneka Gandhi, Puttaswamy).',
    content_markdown: `
# Fundamental Rights (Part III, Articles 12–35)

> **Magna Carta of India**: Part III of the Indian Constitution is described as the *Magna Carta of India*. Fundamental rights are justiciable and guaranteed by the Constitution against state encroachment.

---

## 🏛️ 1. Concept, Origin & Nature
* **Inspiration**: Drawn from the **Bill of Rights** of the US Constitution.
* **Justiciable Nature**: Enforceable by courts under **Article 32** (Supreme Court) and **Article 226** (High Courts).
* **Not Absolute, but Qualified**: Subject to reasonable restrictions on grounds of public order, morality, sovereignty, and integrity of India.
* **Suspension during Emergency**:
  * All Fundamental Rights can be suspended during National Emergency (Article 352) **EXCEPT Articles 20 and 21** (44th Amendment Act, 1978).
  * Article 19 is automatically suspended *only* on grounds of War or External Aggression (External Emergency), **not** on grounds of Armed Rebellion.

---

## 📊 2. Six Broad Categories of Fundamental Rights

| Category | Articles | Core Guarantee & Scope |
| :--- | :--- | :--- |
| **Right to Equality** | **Arts. 14–18** | Equality before law (Art 14), prohibition of discrimination (Art 15), equal opportunity in public employment (Art 16), abolition of Untouchability (Art 17), abolition of Titles (Art 18). |
| **Right to Freedom** | **Arts. 19–22** | 6 democratic freedoms (Art 19), protection in respect of conviction for offences (Art 20), Right to Life & Personal Liberty (Art 21), Right to Education (Art 21A), protection against arbitrary arrest (Art 22). |
| **Right against Exploitation** | **Arts. 23–24** | Prohibition of human trafficking & forced labor/Begar (Art 23), prohibition of employment of children below 14 in hazardous factories (Art 24). |
| **Right to Freedom of Religion** | **Arts. 25–28** | Freedom of conscience & propagation of religion (Art 25), manage religious affairs (Art 26), freedom from religious taxation (Art 27), religious instruction in state institutions (Art 28). |
| **Cultural & Educational Rights** | **Arts. 29–30** | Protection of language, script & culture of minorities (Art 29), right of religious & linguistic minorities to establish educational institutions (Art 30). |
| **Right to Constitutional Remedies** | **Art. 32** | Right to move Supreme Court for enforcement of Fundamental Rights. Termed **"Heart and Soul of the Constitution"** by Dr. B. R. Ambedkar. |

> **Note on Right to Property**: Originally under Article 19(1)(f) and Article 31, it was deleted from Part III by the **44th Constitutional Amendment Act, 1978** and made a legal/constitutional right under **Article 300A** in Part XII.

---

## ⚖️ 3. Article 32 vs Article 226 (Writs Jurisdiction)

The Supreme Court (Art 32) and High Courts (Art 226) issue **5 types of Prerogative Writs**:

1. **Habeas Corpus ("To have the body of")**:
   * Order to produce an illegally detained person before the court.
   * Can be issued against both **Public authorities** and **Private individuals**.
2. **Mandamus ("We Command")**:
   * Directs a public official, corporation, or inferior court to perform a mandatory statutory duty.
   * *Cannot* be issued against the President, Governor, or a private individual.
3. **Prohibition ("To forbid")**:
   * Issued by a higher court to a lower judicial or quasi-judicial body to prevent it from exceeding its jurisdiction.
   * Only preventive in nature.
4. **Certiorari ("To be certified")**:
   * Issued by a higher court to quash an order already passed by an inferior court/tribunal without jurisdiction.
   * Both **preventive** and **curative**.
5. **Quo-Warranto ("By what authority/warrant")**:
   * Inquires into the legality of a person's claim to a public substantive constitutional office.
   * Prevents illegal usurpation of public office.

---

## 🎯 4. Landmark Supreme Court Judgments (High-Yield for Exams)

* **A.K. Gopalan Case (1950)**: Narrow interpretation of Article 21 ("Procedure established by law").
* **Maneka Gandhi Case (1978)**: Overruled Gopalan; introduced **"Due Process of Law"** and held that procedure must be *just, fair, and reasonable*. Expanded Art. 21 to include right to travel abroad, right to clean environment, and right to speedy trial.
* **Kesavananda Bharati Case (1973)**: Established the **"Basic Structure Doctrine"** — Parliament can amend any part of the Constitution (including Part III) under Art 368, but cannot alter its Basic Structure.
* **K.S. Puttaswamy Case (2017)**: 9-judge bench unanimously declared **Right to Privacy** as an intrinsic part of Article 21.

---

## 💡 5. Examiner's Trap & One-Liner Key Facts
* ⚠️ **Rights available ONLY to Citizens of India**: Articles **15, 16, 19, 29, and 30**.
* ⚠️ **Rights available to Both Citizens & Foreigners (except enemy aliens)**: Articles **14, 20, 21, 21A, 22, 23, 24, 25, 26, 27, and 28**.
* 🎯 **Article 17 (Untouchability)** is absolute and has no exceptions.
* 🎯 **Article 21A** was inserted by the **86th Amendment Act, 2002** (Free and compulsory education for children aged 6 to 14 years).
    `
  },

  // =========================================================================
  // 2. INDIAN HISTORY: MODERN & BENGAL FREEDOM STRUGGLE
  // =========================================================================
  {
    id: 'note-hist-modern-inm',
    subject_id: 'sub-inm',
    chapter_id: 'chap-inm-swadeshi',
    title: 'Indian National Movement (1885–1947) & Bengal Renaissance',
    title_bn: 'ভারতের জাতীয় আন্দোলন (১৮৮৫–১৯৪৭) এবং বাংলার নবজাগরণ',
    exam_coverage: 'WBCS (Exe) Prelims/Mains, UPSC, WB Police SI, Clerkship, Food SI, SSC CGL/CHSL',
    read_time_mins: 15,
    summary: 'Chronological roadmap of INC Foundation (1885), Partition of Bengal (1905), Swadeshi Movement, Gandhian Era (1915–1947), Revolutionary Nationalism in Bengal (Anushilan, Jugantar, Chittagong Armory Raid), Netaji & INA, and Transfer of Power.',
    content_markdown: `
# Indian National Movement (1885–1947) & Bengal

> **Epicenter of Nationalism**: Bengal was the cradle of Indian national consciousness, giving birth to socio-religious renaissance, cultural revivalism, and revolutionary armed struggle.

---

## 🏛️ 1. Indian National Congress (1885) & Early Phase
* **Foundation**: **28 December 1885** at Gokuldas Tejpal Sanskrit College, Bombay.
* **Founder**: Retired British civil servant **Allan Octavian Hume (A.O. Hume)**.
* **First President**: **Womesh Chandra Bonnerjee (W.C. Bonnerjee)**; attended by 72 delegates.
* **Viceroy at Foundation**: **Lord Dufferin** (who dismissed INC as a "microscopic minority").
* **Drain of Wealth Theory**: Propounded by **Dadabhai Naoroji** in his book *"Poverty and Un-British Rule in India"* (1901) and R.C. Dutt in *"Economic History of India"*.

---

## 🔥 2. Partition of Bengal (1905) & Swadeshi Movement
* **Proclaimed by**: **Lord Curzon** on 19 July 1905; came into effect on **16 October 1905**.
* **Real Motive**: Divide and weaken the nerve center of Indian nationalism by dividing Bengali speaking population on religious lines (East Bengal & Assam vs West Bengal, Bihar & Orissa).
* **Anti-Partition & Swadeshi Movement**:
  * **Rakhi Bandhan Day**: Observed on **16 October 1905** at the call of **Rabindranath Tagore** as a symbol of Hindu-Muslim unity.
  * **Sanjivani Newspaper**: **Krishna Kumar Mitra** first gave the call for boycott of foreign goods in his journal *Sanjivani* (6 July 1905).
  * **Swadeshi Enterprises**: Acharya P.C. Ray founded *Bengal Chemicals & Pharmaceuticals Ltd.* (1901).
  * **National Council of Education**: Set up on 15 August 1906; led to the establishment of Bengal National College with **Aurobindo Ghosh** as its first Principal.
* **Annulment of Partition**: Partition of Bengal was annulled by **Lord Hardinge II** at the **Delhi Durbar in 1911**, and the capital of British India was shifted from Calcutta to Delhi.

---

## ⚔️ 3. Revolutionary Organizations in Bengal

| Organization | Year & Founders | Key Activities & Significance |
| :--- | :--- | :--- |
| **Anushilan Samiti (Calcutta)** | 1902 (Pramathanath Mitra, Jatindranath Banerjee, Barindra Ghosh) | Secret revolutionary society for physical & moral training of youth. |
| **Dhaka Anushilan Samiti** | 1905 (Pulin Behari Das) | Spread network across East Bengal with over 500 branches. |
| **Jugantar Group** | 1906 (Barindra Kumar Ghosh, Bhupendranath Datta) | Revolutionary newspaper *Jugantar*; planned armed uprisings. |
| **Alipore Bomb Conspiracy** | 1908 (Khudiram Bose & Prafulla Chaki) | Attempt to assassinate Magistrate Kingsford at Muzaffarpur (30 April 1908). Prafulla Chaki shot himself; Khudiram Bose was hanged on 11 August 1908 (aged 18). Aurobindo Ghosh defended by C.R. Das and acquitted. |
| **Chittagong Armoury Raid** | 18 April 1930 (**Surya Sen / Masterda**) | Seizure of British police and auxiliary armories; declaration of Provisional Independent Government. Martyrs: Pritilata Waddedar, Kalpana Datta, Tarakeswar Dastidar. |

---

## 🕊️ 4. Major Mass Movements led by Mahatma Gandhi

1. **Non-Cooperation Movement (1920–1922)**:
   * Launched following the **Rowlatt Act (1919)**, **Jallianwala Bagh Massacre (13 April 1919)**, and **Khilafat Movement**.
   * Special Session of INC at Calcutta (Sept 1920) approved NCM; ratified at Nagpur (Dec 1920).
   * **Suspended**: On **12 February 1922** (Bardoli Resolution) following the **Chauri Chaura incident** (Gorakhpur, UP on 4 Feb 1922).
2. **Civil Disobedience Movement (1930–1934)**:
   * Inaugurated with the historic **Dandi March** (12 March to 6 April 1930) from Sabarmati Ashram to Dandi coast (240 miles) breaking Salt Laws.
   * **Gandhi-Irwin Pact** (5 March 1931): Gandhi agreed to suspend CDM and attend 2nd Round Table Conference in London.
3. **Quit India Movement ("August Kranti", 1942)**:
   * Passed at Bombay Gowalia Tank Maidan on **8 August 1942** with the slogan **"Do or Die" (Karenge ya Marenge)**.
   * All top leaders arrested overnight under *Operation Zero Hour*.
   * **Parallel Governments (Prati Sarkar)**:
     * **Tamluk (Midnapore, WB)**: *Tamralipta Jatiya Sarkar* headed by **Satish Chandra Samanta** (Matangini Hazra martyred here on 29 Sept 1942).
     * **Satara (Maharashtra)**: Nana Patil.
     * **Ballia (UP)**: Chittu Pandey.

---

## 🇮🇳 5. Netaji Subhas Chandra Bose & Forward Bloc
* **Haripura Congress (1938)**: Netaji elected President; constituted National Planning Committee under Jawaharlal Nehru.
* **Tripuri Congress (1939)**: Netaji re-elected defeating Gandhi's candidate Pattabhi Sitaramayya ("Pattabhi's defeat is my defeat" - Gandhi). Resigned due to working committee deadlock and formed **All India Forward Bloc** (3 May 1939).
* **Indian National Army (INA / Azad Hind Fauj)**:
  * Originally conceived by **Captain Mohan Singh** in Malaya (1942).
  * Netaji took supreme command in Singapore on **21 October 1943**; formed the *Provisional Government of Free India (Azad Hind Sarkar)*.
  * Famous Slogans: *"Give me blood, and I will give you freedom!"*, *"Jai Hind"*, *"Dilli Chalo"*.
    `
  },

  // =========================================================================
  // 3. GEOGRAPHY OF INDIA & WEST BENGAL
  // =========================================================================
  {
    id: 'note-geo-west-bengal',
    subject_id: 'sub-geo-wb',
    chapter_id: 'chap-geo-wb-physio',
    title: 'Geography of West Bengal & Indian Physiography (Complete Atlas)',
    title_bn: 'পশ্চিমবঙ্গের ভূগোল ও ভারতীয় ভূপ্রকৃতি (সম্পূর্ণ গাইড)',
    exam_coverage: 'WBCS (Exe), WBPSC Misc, WB Police SI/Constable, Food SI, Clerkship, Primary TET, SSC, Railways',
    read_time_mins: 14,
    summary: 'Detailed physical, climatic, riverine, and demographic profile of West Bengal (Darjeeling Himalayas, Western Rarh, Sundarbans, Teesta-Torsa-Damodar basins, Census 2011 stats, National Parks, and Minerals).',
    content_markdown: `
# Comprehensive Geography of West Bengal

> **Key Exam Fact**: West Bengal is the **only state in India** that extends all the way from the Himalayas in the north to the Bay of Bengal in the south.

---

## 🗺️ 1. Location, Boundaries & Administrative Facts
* **Geographical Location**: $21^\circ 38' \text{ N}$ to $27^\circ 10' \text{ N}$ Latitude; $85^\circ 50' \text{ E}$ to $89^\circ 50' \text{ E}$ Longitude.
* **Total Area**: $88,752 \text{ sq. km}$ (2.7% of India's total area; 13th largest state by area).
* **International Borders (3 Countries)**:
  1. **Bangladesh**: Longest border ($2,217 \text{ km}$ — longest international border for any Indian state).
  2. **Nepal**: Border in Darjeeling district.
  3. **Bhutan**: Border in Kalimpong, Alipurduar, and Jalpaiguri.
* **Interstate Borders (5 States)**:
  * **Jharkhand** (Longest interstate border), **Bihar**, **Odisha**, **Sikkim** (Shortest interstate border), and **Assam**.
* **Total Districts**: 23 Districts (arranged in 5 Administrative Divisions: Presidency, Medinipur, Burdwan, Malda, Jalpaiguri).
* **Chicken's Neck (Siliguri Corridor)**: Narrow strip of land (width ~9 to 27 km) connecting North-East India to mainland India.

---

## ⛰️ 2. Physiographic Divisions of West Bengal

| Physiographic Region | Extent & Districts | Major Peaks / Features |
| :--- | :--- | :--- |
| **1. Northern Hill Region (Darjeeling Himalayas)** | Darjeeling & Kalimpong districts. Divided by deep gorge of **River Teesta** into West and East of Teesta. | **Singalila Ridge**: Contains highest peaks of WB — **Sandakphu ($3,636 \text{ m}$)** (Highest peak of WB), **Phalut ($3,595 \text{ m}$)**, Sabargram, Tonglu.<br>**Darjeeling Ridge**: Tiger Hill ($2,573 \text{ m}$), Senchal. |
| **2. Terai & Dooars Region** | Foothills of Himalayas. "Terai" = Moist land (West of Teesta); "Dooars" = Doors/Gateways to Bhutan (East of Teesta). | Jalpaiguri, Alipurduar, Cooch Behar, Siliguri subdivision. Dense subtropical forests, tea gardens. |
| **3. Western Rarh & Plateau Fringe** | Purulia, Paschim Medinipur, Jhargram, Bankura, Birbhum, Paschim Bardhaman. | **Gorgaburu ($677 \text{ m}$)** on Ayodhya Hills (Purulia) is the highest peak of South Bengal.<br>Biharinath ($451 \text{ m}$), Susunia ($440 \text{ m}$) in Bankura. Composed of hard crystalline Archean rocks & laterite soil. |
| **4. Coastal Plain & Sundarbans Delta** | South 24 Parganas, North 24 Parganas, Purba Medinipur. | World's largest active delta (Ganga-Brahmaputra delta). Mangrove forests (**Sundari trees**), tidal creeks, mudflats. Home to the **Royal Bengal Tiger**. |

---

## 🌊 3. Drainage System of West Bengal

### A. North Bengal Himalayan Rivers:
* **Teesta ("Trisrota" - River of three streams)**: Originates from **Pahunri glacier / Tso Lhamo lake** (Sikkim). Known as the *"Lifeline of North Bengal"*. Major tributaries: Rangpo, Great Rangit, Sevoke.
* **Torsa**: Originates from Chumbi Valley (Tibet). Known as *Machu* in Tibet and *Amo Chu* in Bhutan.
* **Jaldhaka**: Originates from Bidang lake (Sikkim-Bhutan border).
* **Mahananda**: Originates from Mahaldiram Hills (Darjeeling). Divides Malda district into **Tal** (lowland) and **Diara** (fertile silt plain).

### B. South Bengal / Plateau Rivers:
* **Bhagirathi-Hooghly**: Main distributary of Ganga in West Bengal, bifurcating at Farakka Barrage (Murshidabad).
* **Damodar ("Sorrow of Bengal")**: Originates from Khamarpat hill, Palamu/Chota Nagpur Plateau (Jharkhand). Multi-purpose river valley project: **DVC (Damodar Valley Corporation)** established in **1948** (India's 1st multipurpose project, modeled on US Tennessee Valley Authority).
* **Mayurakshi**: Originates from Trikut Hill (Jharkhand). **Massanjore Dam (Canada Dam)** built on it.
* **Kangsabati (Kasai) & Keleghai**: Join to form the **Haldi River** at Haldia.

---

## 🐅 4. National Parks & Wildlife Sanctuaries in West Bengal

1. **Sundarbans National Park (1984)**: Biosphere Reserve (1989), **UNESCO World Heritage Site (1987)**, **Ramsar Site (2019)**.
2. **Buxa National Park (1997)**: Tiger Reserve in Alipurduar; historic Buxa Fort.
3. **Gorumara National Park (1994)** & **Jaldapara National Park (2012)**: Famous for the **Great Indian One-horned Rhinoceros**.
4. **Singalila National Park (1992)**: High-altitude park in Darjeeling; sanctuary for **Red Panda**.
5. **Neora Valley National Park (1986)**: Kalimpong district; pristine virgin ecosystem.

---

## 📊 5. West Bengal Census 2011 Highlights (High-Yield)
* **Total Population**: $91.27 \text{ million}$ (7.54% of India; **4th most populous state** after UP, Maharashtra, Bihar).
* **Population Density**: **$1,028 \text{ persons/sq. km}$** (**2nd highest in India** after Bihar's 1,106).
* **Sex Ratio**: **950 females per 1,000 males** (higher than national average of 940).
* **Literacy Rate**: **$76.26\%$** (Males: $81.69\%$, Females: $70.54\%$).
  * **Highest Literacy District**: **Purba Medinipur ($87.02\%$)**.
  * **Lowest Literacy District**: **Uttar Dinajpur ($59.07\%$)**.
* **Most Populous District**: North 24 Parganas (2nd most populous district in India).
* **Least Populous District**: Dakshin Dinajpur (prior to Kalimpong creation).
    `
  },

  // =========================================================================
  // 4. GENERAL SCIENCE: PHYSICS, CHEMISTRY & BIOLOGY
  // =========================================================================
  {
    id: 'note-sci-general-science',
    subject_id: 'sub-sci',
    chapter_id: 'chap-sci-bio-cell',
    title: 'General Science Master Handbook: Physics, Chemistry & Biology',
    title_bn: 'সাধারণ বিজ্ঞান হ্যান্ডবুক: পদার্থবিজ্ঞান, রসায়ন ও জীববিজ্ঞান',
    exam_coverage: 'WBCS, SSC CGL/CHSL, RRB NTPC/Group D, WB Police, Food SI, Primary TET, CDS/NDA',
    read_time_mins: 16,
    summary: 'High-frequency concepts covering Newton’s laws, Optics, Sound, Periodic Table trends, pH scale, Common Chemical Names, Cell Organelles, Human Physiology, Vitamins & Diseases, and Hormones.',
    content_markdown: `
# General Science Master Handbook

> **Universal Exam Rule**: Science questions in competitive exams focus heavily on real-life applications, biological functions, and everyday chemical formulas.

---

## ⚡ 1. Physics: Mechanics, Optics & Waves

### A. Laws of Motion & Gravitation
* **Newton's 1st Law**: Defines **Inertia** and force qualitatively.
* **Newton's 2nd Law**: Defines force quantitatively: $F = ma = \frac{dp}{dt}$ (Rate of change of momentum).
* **Newton's 3rd Law**: Action and Reaction are equal and opposite (Rocket propulsion, recoil of gun).
* **Acceleration due to Gravity ($g = 9.8 \text{ m/s}^2$)**:
  * $g$ is **maximum at poles** and **minimum at equator** (due to Earth's elliptical shape and rotation).
  * $g$ is **zero at the center of the Earth**.
  * Value of $g$ on Moon $= \frac{1}{6}\text{th}$ of Earth's gravity.

### B. Optics & Light Phenomena

| Phenomenon | Physical Principle | Real-World Application / Exam Question |
| :--- | :--- | :--- |
| **Total Internal Reflection (TIR)** | Light travelling from denser to rarer medium at angle $> \text{Critical Angle}$. | Sparkle of diamond, Optical Fibres (Endoscopy/Internet), Mirage in desert, Shining of air bubble in water. |
| **Scattering of Light** | Rayleigh's Law ($I \propto \frac{1}{\lambda^4}$) | Blue color of clear sky, Reddish appearance of Sun at Sunrise/Sunset, Danger signals are red (least scattered). |
| **Refraction** | Bending of light due to speed change in different media. | Twinkling of stars, Lemon appearing bigger in water glass, Pool appearing shallower than actual depth. |
| **Dispersion** | Splitting of white light into 7 colors (VIBGYOR). | Formation of Rainbow (combination of Dispersion, Refraction & TIR). |

---

## 🧪 2. Chemistry: Everyday Compounds, Acids, Bases & Metals

### A. Common Chemical Formulas in Exams

| Common Name | Chemical Name | Chemical Formula | Key Usage |
| :--- | :--- | :--- | :--- |
| **Baking Soda** | Sodium Bicarbonate | $\text{NaHCO}_3$ | Baking, antacid, fire extinguishers. |
| **Washing Soda** | Sodium Carbonate Decahydrate | $\text{Na}_2\text{CO}_3 \cdot 10\text{H}_2\text{O}$ | Detergent, removing permanent hardness of water. |
| **Bleaching Powder** | Calcium Oxychloride | $\text{CaOCl}_2$ | Disinfectant for water, bleaching agent. |
| **Plaster of Paris (POP)** | Calcium Sulphate Hemihydrate | $\text{CaSO}_4 \cdot \frac{1}{2}\text{H}_2\text{O}$ | Bone fracture casts, statues (made by heating Gypsum at 373K). |
| **Gypsum** | Calcium Sulphate Dihydrate | $\text{CaSO}_4 \cdot 2\text{H}_2\text{O}$ | Retards setting time of cement. |
| **Laughing Gas** | Nitrous Oxide | $\text{N}_2\text{O}$ | Anaesthetic in dentistry. |
| **Quick Lime** | Calcium Oxide | $\text{CaO}$ | Glass making, white washing. |
| **Slaked Lime** | Calcium Hydroxide | $\text{Ca(OH)}_2$ | Testing $\text{CO}_2$ (turns lime water milky). |

### B. Acid-Base Indicators & pH Scale
* **pH Scale**: Invented by **S.P.L. Sørensen (1909)**. Scale: $0$ (Strong Acid) to $7$ (Neutral) to $14$ (Strong Base).
* **Human Blood pH**: **$7.35 - 7.45$** (Slightly alkaline).
* **Acid in Gastric Juice**: **Hydrochloric Acid ($\text{HCl}$)** ($pH \approx 1.5 - 2.0$).
* **Acid in Ant / Bee Sting**: **Methanoic Acid (Formic Acid)** — neutralized with calamine/baking soda.

---

## 🧬 3. Biology: Cell, Human Physiology & Health

### A. Cell Organelles & Nicknames
* **Mitochondria**: *"Powerhouse of the Cell"* (Site of cellular respiration & ATP synthesis; contains own circular DNA).
* **Ribosome**: *"Protein Factory of the Cell"* (Non-membrane bound organelle; synthesized by nucleolus).
* **Lysosome**: *"Suicidal Bag of the Cell"* (Contains hydrolytic digestive enzymes).
* **Golgi Apparatus**: *"Traffic Police / Packaging Center of the Cell"*.
* **Endoplasmic Reticulum (RER)**: Site of protein synthesis; SER: Site of lipid/steroid synthesis.

### B. Comprehensive Vitamin Chart (Repeated in Every Exam)

| Vitamin | Chemical Name | Deficiency Disease | Rich Dietary Source |
| :--- | :--- | :--- | :--- |
| **Vitamin A** | Retinol | **Night Blindness (Nyctalopia)**, Xerophthalmia | Carrots, Papaya, Milk, Fish liver oil |
| **Vitamin B1** | Thiamine | **Beri-Beri** | Polished rice lacks B1; unpolished cereals |
| **Vitamin B3** | Niacin / Nicotinic Acid | **Pellagra** (4D: Dermatitis, Diarrhea, Dementia, Death) | Yeast, Meat, Peanuts |
| **Vitamin B9** | Folic Acid | Megaloblastic Anemia, Neural tube defects | Green leafy vegetables |
| **Vitamin B12** | Cyanocobalamin (contains **Cobalt**) | **Pernicious Anemia** | Meat, Fish, Eggs (Absent in plant foods) |
| **Vitamin C** | Ascorbic Acid | **Scurvy** (bleeding gums, delayed wound healing) | Amla (highest), Citrus fruits, Guava |
| **Vitamin D** | Calciferol | **Rickets** (in children), **Osteomalacia** (in adults) | Sunlight synthesis in skin, Cod liver oil |
| **Vitamin E** | Tocopherol | Sterility, Muscle weakness (Beauty Vitamin) | Wheat germ oil, Almonds, Sunflower oil |
| **Vitamin K** | Phylloquinone | **Failure of blood clotting (Hemorrhage)** | Spinach, Cabbage (synthesized by gut bacteria) |
    `
  },

  // =========================================================================
  // 5. INDIAN ECONOMY & WEST BENGAL GOVERNMENT SCHEMES
  // =========================================================================
  {
    id: 'note-econ-rbi-schemes',
    subject_id: 'sub-econ',
    chapter_id: 'chap-econ-rbi',
    title: 'Indian Economy, Monetary Policy (RBI) & Flagship WB Schemes',
    title_bn: 'ভারতীয় অর্থনীতি, রিজার্ভ ব্যাংক (RBI) এবং পশ্চিমবঙ্গের সরকারি প্রকল্পসমূহ',
    exam_coverage: 'WBCS (Exe), WBPSC Misc, Food SI, Clerkship, WB Police, SSC CGL, Banking (IBPS/SBI)',
    read_time_mins: 13,
    summary: 'Complete breakdown of GDP/GNP, Monetary Policy Tools (Repo, Reverse Repo, CRR, SLR), Inflation indices (CPI vs WPI), Budget deficits, and all flagship West Bengal schemes (Kanyashree, Lakshmir Bhandar, Swasthya Sathi, Krishak Bandhu).',
    content_markdown: `
# Indian Economy & West Bengal Schemes

> **High-Scoring Section**: Economic questions in WB exams test RBI monetary policy mechanisms and social welfare schemes launched by the Government of West Bengal.

---

## 🏦 1. Reserve Bank of India (RBI) & Monetary Policy Tools
* **Establishment**: Set up on **1 April 1935** under the *RBI Act, 1934* on the recommendations of the **Hilton Young Commission (Royal Commission on Indian Currency & Finance)**.
* **Nationalization**: Nationalized on **1 January 1949**.
* **First Governor**: Sir Osborne Smith; **First Indian Governor**: C.D. Deshmukh.

### Monetary Policy Instruments:
1. **Quantitative Tools (Control volume of credit)**:
   * **Cash Reserve Ratio (CRR)**: Percentage of total deposits (NDTL) commercial banks must keep with RBI in cash. No interest is earned on CRR.
   * **Statutory Liquidity Ratio (SLR)**: Percentage of NDTL banks must maintain in liquid assets (Gold, Cash, Approved Govt Securities).
   * **Repo Rate (Repurchase Rate)**: Rate at which RBI lends short-term money to commercial banks against government collateral.
     * *To control Inflation*: RBI **increases** Repo Rate $\rightarrow$ Borrowing becomes expensive $\rightarrow$ Money supply decreases $\rightarrow$ Inflation falls.
   * **Reverse Repo Rate**: Rate at which RBI borrows money from commercial banks.
   * **Marginal Standing Facility (MSF)**: Overnight liquidity window for banks against SLR securities above the limit.
   * **Bank Rate**: Long-term lending rate without collateral.
2. **Qualitative Tools (Control direction of credit)**:
   * Margin requirements, moral suasion, selective credit control.

---

## 🏛️ 2. Flagship West Bengal Government Schemes (Must Know)

| Scheme Name | Launch Year | Objective & Financial Benefit | UN / Global Recognition |
| :--- | :--- | :--- | :--- |
| **Kanyashree Prakalpa** | **2013 (14 August - Kanyashree Day)** | Prevent child marriage & promote higher education among girls aged 13–18. Annual scholarship: ₹1,000 (K1); One-time grant at age 18: ₹25,000 (K2). | **1st Prize at UN Public Service Awards, The Hague (2017)** out of 552 projects. |
| **Lakshmir Bhandar** | **2021 (August)** | Direct financial support to female heads of families (aged 25–60). **₹1,000/month** for General category; **₹1,200/month** for SC/ST families. | India's largest universal basic income model for women. |
| **Swasthya Sathi** | **2016 (30 December)** | Universal health coverage card issued in the name of the female head of household. Cashless hospitalization up to **₹5 Lakh per family per year** across enrolled hospitals. | Smart card with bio-metric authentication. |
| **Krishak Bandhu** | **2019 (January)** | Financial assistance to farmers with 1 acre or more: **₹10,000/year** (in two installments: Kharif & Rabi). Death benefit of **₹2 Lakh** to family of farmer aged 18–60. | Covers both owners and recorded Bhagchasi (sharecroppers). |
| **Sabooj Sathi** | **2015** | Distribution of free bi-cycles to all students of Classes IX to XII in government and aided schools. | **WSIS Winner Prize at Geneva (2020)**. |
| **Rupashree Prakalpa** | **2018** | One-time grant of **₹25,000** to economically stressed families at the time of daughter's marriage (minimum age 18). | Annual family income cap: ₹1.5 Lakh. |
| **Student Credit Card** | **2021 (June)** | Collateral-free soft education loan up to **₹10 Lakh** at nominal simple interest (4%) with 15-year repayment window. | West Bengal higher education guarantee. |
    `
  },

  // =========================================================================
  // 6. QUANTITATIVE APTITUDE & FAST MATH SHORTCUTS
  // =========================================================================
  {
    id: 'note-math-speed-formulas',
    subject_id: 'sub-arith',
    chapter_id: 'chap-arith-pct',
    title: 'Quantitative Aptitude Master Formula Sheet & Short Tricks',
    title_bn: 'পাটিগণিত ও গণিতের সম্পূর্ণ সূত্র ও শর্টকাট টেকনিক',
    exam_coverage: 'WBPSC Food SI, Clerkship, WB Police SI/Constable, SSC CGL/CHSL, Railways RRB, WBCS Prelims Math',
    read_time_mins: 15,
    summary: 'High-speed shortcut formulas for Percentages, Profit & Loss, Compound vs Simple Interest, Time & Work, Time-Speed-Distance, Pipes & Cisterns, and 2D/3D Mensuration.',
    content_markdown: `
# Quantitative Aptitude Speed Formulas

> **Time Saver**: In competitive exams, solving arithmetic without lengthy variable algebra saves 30+ seconds per question.

---

## 📈 1. Percentage & Successive Percentage Changes
* **Fraction-to-Percentage Equivalence**:
  * $\frac{1}{2} = 50\%$, $\frac{1}{3} = 33\frac{1}{3}\%$, $\frac{1}{4} = 25\%$, $\frac{1}{5} = 20\%$, $\frac{1}{6} = 16\frac{2}{3}\%$, $\frac{1}{7} = 14\frac{2}{8}\%$, $\frac{1}{8} = 12.5\%$, $\frac{1}{9} = 11\frac{1}{9}\%$, $\frac{1}{11} = 9\frac{1}{11}\%$, $\frac{1}{12} = 8\frac{1}{3}\%$.
* **Successive Percentage Formula**:
  * If a value increases by $a\%$ and then increases/decreases by $b\%$, Net change:
    $$\text{Net Change} = a + b + \frac{a \times b}{100}$$
  * *(Use $+a$ for increase/profit and $-b$ for decrease/loss/discount).*
* **Price vs Consumption Inverse Formula**:
  * If price of commodity increases by $R\%$, reduction in consumption to keep expenditure constant:
    $$\text{Reduction \%} = \left( \frac{R}{100 + R} \right) \times 100$$

---

## 💰 2. Simple Interest (SI) vs Compound Interest (CI)
* **Simple Interest**: $SI = \frac{P \times R \times T}{100}$
* **Difference between CI and SI for 2 Years**:
  $$\text{Difference}_{2\text{ yrs}} = P \left( \frac{R}{100} \right)^2 = \frac{P \cdot R^2}{10000}$$
* **Difference between CI and SI for 3 Years**:
  $$\text{Difference}_{3\text{ yrs}} = P \left( \frac{R}{100} \right)^2 \left( \frac{300 + R}{100} \right)$$
* **Doubling Time in SI**: If money doubles in $N$ years, rate $R = \frac{100}{N}\%$.
* **Rule of 72 (CI)**: Money doubles in approximately $\approx \frac{72}{R}$ years.

---

## ⏱️ 3. Time & Work / Pipes & Cisterns
* **Unit Work Method**: If A does a work in $x$ days and B does in $y$ days, together they do it in:
  $$\text{Time taken together} = \frac{x \cdot y}{x + y} \text{ days}$$
* **$M_1 D_1 H_1 W_2 = M_2 D_2 H_2 W_1$ Formula**:
  $$\frac{M_1 \times D_1 \times H_1 \times E_1}{W_1} = \frac{M_2 \times D_2 \times H_2 \times E_2}{W_2}$$
  *(Where $M$ = Men, $D$ = Days, $H$ = Hours/day, $E$ = Efficiency, $W$ = Work/Wages).*

---

## 🚆 4. Time, Speed & Distance / Trains / Boats
* **Speed Conversion**:
  * $\text{km/h} \rightarrow \text{m/s}$: Multiply by $\frac{5}{18}$ (e.g. $72 \text{ km/h} = 72 \times \frac{5}{18} = 20 \text{ m/s}$).
  * $\text{m/s} \rightarrow \text{km/h}$: Multiply by $\frac{18}{5}$.
* **Average Speed**: If a person travels from A to B at speed $x$ and returns at speed $y$:
  $$\text{Avg Speed} = \frac{2xy}{x + y}$$
* **Trains Crossing**:
  * Crossing a pole/man: $\text{Distance} = \text{Length of train } (L_1)$.
  * Crossing a platform/bridge ($L_2$): $\text{Distance} = L_1 + L_2$.
* **Boats & Streams**:
  * Downstream Speed ($D$) $= u + v$ (Speed in still water $+$ Stream speed).
  * Upstream Speed ($U$) $= u - v$.
  * Speed of Boat in Still Water $u = \frac{D + U}{2}$; Speed of Stream $v = \frac{D - U}{2}$.
    `
  },

  // =========================================================================
  // 7. ENGLISH COMPOSITION & HIGH-FREQUENCY VOCABULARY
  // =========================================================================
  {
    id: 'note-eng-grammar-vocab',
    subject_id: 'sub-eng',
    chapter_id: 'chap-eng-prep',
    title: 'English Composition, High-Yield Prepositions & One-Word Substitutions',
    title_bn: 'ইংরেজি ব্যাকরণ, এপ্রোপ্রিয়েট প্রিপজিশন এবং ওয়ান ওয়ার্ড সাবস্টিটিউশন',
    exam_coverage: 'WBCS Prelims (25 Marks), WBPSC Clerkship (30 Marks), WB Police SI & Constable, SSC CGL/CHSL',
    read_time_mins: 14,
    summary: 'Official rules for Subject-Verb Agreement, Confusing Appropriate Prepositions (Abide by, Accused of, Congratulate on), High-frequency Phrasal Verbs, and 50+ Top Repeated One-Word Substitutions in West Bengal exams.',
    content_markdown: `
# English Grammar & Vocabulary Master Guide

> **WBCS/Clerkship Key**: English carries 25 Marks in WBCS Prelims and 30 Marks in WBPSC Clerkship. Precision in prepositions and idioms guarantees 20+ score.

---

## 📝 1. Golden Rules of Subject-Verb Agreement

1. **Neither...nor / Either...or / Not only...but also**:
   * The verb agrees with the **nearest subject**.
   * *Example*: Neither the teacher nor the **students were** present.
   * *Example*: Either the players or the **captain is** responsible.
2. **As well as / Along with / Together with / In addition to / Accompanied by**:
   * The verb agrees with the **FIRST subject**.
   * *Example*: The **captain**, along with all the players, **was** felicitated.
3. **Each / Every / Everyone / Someone / Somebody / Nobody / Either of / Neither of**:
   * Always takes a **Singular Verb**.
   * *Example*: **Neither of the two candidates is** eligible.
4. **Subjunctive Mood (Hypothetical / Wish)**:
   * Always use **were**, regardless of whether subject is singular.
   * *Example*: If I **were** a bird, I would fly to London.

---

## 🎯 2. Appropriate Prepositions (Most Repeated in WB Exams)

* **Abide by** (rules/decision) — You must *abide by* the law.
* **Accused of** (crime) — He was *accused of* murder (NOT with).
* **Afflicted with** (disease) — He is *afflicted with* arthritis.
* **Agree to** (proposal) vs **Agree with** (person).
* **Avail of** (opportunity) — You should *avail yourself of* this offer.
* **Congratulate on** (success) — I congratulated him *on* his grand victory (NOT for).
* **Die of** (disease) vs **Die from** (wound/overwork) vs **Die for** (country).
  * *Example*: He died *of* cholera. He died *from* blood loss.
* **Different from** (NOT different than).
* **Inferior to / Superior to / Senior to / Junior to / Prefer to** (Takes *to*, NEVER *than*).
  * *Example*: She is *senior to* me by two years.
* **Prevent from** / **Prohibit from** (doing something).
* **Rely on / Count on** (someone).

---

## 📖 3. High-Frequency One-Word Substitutions

| One-Word Term | Definition / Meaning | Exam Significance |
| :--- | :--- | :--- |
| **Psephologist** | One who specializes in the statistical study of voting patterns and elections. | **WBCS 2023 Q.3** |
| **Altruist / Philanthropist** | A person who unselfishly cares for and helps others. | Repeated in SSC & WBPSC |
| **Apostate** | One who abandons his religious faith or political allegiance. | Repeated |
| **Somnambulist** | A person who walks in sleep. | Frequent in Clerkship |
| **Incorrigible** | Something or someone that cannot be corrected or reformed. | Standard vocab |
| **Epitaph** | Words inscribed on a tomb or gravestone in memory of the deceased. | Frequent |
| **Polyglot / Multilingual** | A person who speaks or writes several languages. | Frequent |
| **Omniscient** | One who knows everything. | Frequent |
| **Omnipotent** | One who is all-powerful. | Frequent |
| **Omnipresent** | One who is present everywhere at the same time. | Frequent |
| **Stoic** | A person who is indifferent to pain or pleasure. | Frequent |
| **Extempore / Impromptu** | A speech delivered without prior preparation. | Frequent |
    `
  }
];

// Insert study notes
const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO study_notes (
    id, subject_id, chapter_id, title, title_bn, exam_coverage, read_time_mins, summary, content_markdown, is_premium, views_count
  ) VALUES (
    @id, @subject_id, @chapter_id, @title, @title_bn, @exam_coverage, @read_time_mins, @summary, @content_markdown, @is_premium, @views_count
  )
`);

let count = 0;
const seedTrans = db.transaction(() => {
  for (const note of studyNotesList) {
    insertStmt.run({
      chapter_id: null,
      title_bn: null,
      is_premium: 0,
      views_count: 142,
      ...note
    });
    count++;
  }
});

seedTrans();
console.log(`✅ Successfully seeded ${count} master study notes into database!`);

const total = db.prepare('SELECT count(*) as count FROM study_notes').get();
console.log('Total notes in study_notes table:', total.count);
