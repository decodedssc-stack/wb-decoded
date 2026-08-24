import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('📚 Populating exhaustive, line-by-line complete study notes for all Class 11 & 12 NCERT chapters...');

const chaptersData = [
  // --------------------------------------------------------------------------
  // CLASS 11 GEOGRAPHY: INDIA — PHYSICAL ENVIRONMENT (CLIMATE & MONSOON)
  // --------------------------------------------------------------------------
  {
    id: 'ncert-geo-class-11-ind-ch04',
    book_id: 'ncert-geo-class-11-ind',
    chapter_num: 4,
    chapter_title: 'Climate of India & The Mechanism of the Monsoon',
    chapter_title_bn: 'ভারতের জলবায়ু ও মৌসুমি বায়ুর গতিপ্রকৃতি',
    read_time_mins: 34,
    summary: 'The ultimate meteorological guide to India’s climate: Tropical monsoon classification, Jet Streams (STWJ & TEJ), ITCZ migration, Tibetan plateau heating, El Niño (ENSO) & Indian Ocean Dipole (IOD), Western Disturbances, and Koeppen’s climatic zones.',
    content_markdown: `
# NCERT Class 11 Geography: Chapter 4 — Climate of India & The Monsoon Mechanism

> **Monsoon Rhythm**: India's climate belongs to the **'Tropical Monsoon'** type ($Amw$ in Koeppen's scheme), characterized by seasonal reversal of wind direction, sharp regional temperature-rainfall variations, and agricultural dependence on summer monsoon precipitation.

---

## 🌡️ Section 1: Factors Influencing India's Climate

India's climate is shaped by two sets of factors:

### 1. Factors Related to Location and Relief:
1. **Latitude**: The **Tropic of Cancer ($23^\circ 30' \text{N}$)** passes through the middle of India (from Rann of Kachchh in the west to Mizoram in the east across 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram).
   * Southern half: Lies in the **Tropical Zone** (high temperatures year-round, low daily/annual range).
   * Northern half: Lies in the **Sub-Tropical and Temperate Zone** (extreme continental climate with hot summers and cold winters).
2. **The Himalayan Mountain Wall**:
   * Acts as an invincible **climatic divide** trapping monsoon winds within the subcontinent causing widespread relief rain.
   * Shields northern India from the bitter, sub-zero continental air masses blowing from Central Asia and Siberia during winter.
3. **Distribution of Land and Water**:
   * Differential heating and cooling of the Indian landmass compared to the surrounding Indian Ocean, Arabian Sea, and Bay of Bengal creates distinct seasonal pressure gradients.
4. **Altitude**: Temperature decreases with altitude at the Normal Lapse Rate ($6.5^\circ\text{C}$ per $1,000 \text{ m}$ elevation). E.g. Agra and Darjeeling are on the same latitude ($27^\circ \text{N}$), but temperature in January is $16^\circ\text{C}$ in Agra and only $4^\circ\text{C}$ in Darjeeling.
5. **Relief**: The Western Ghats force moisture-laden Arabian Sea winds to rise, delivering $250\text{--}400\text{ cm}$ rainfall on the windward coast while the Deccan plateau on the leeward side receives $< 60\text{ cm}$ (Rain-shadow area).

---

### 2. Factors Related to Air Pressure & Wind Circulation:
* **Inter-Tropical Convergence Zone (ITCZ)**: Low-pressure trough at the equator where trade winds converge.
* **Sub-Tropical Westerly Jet Stream (STWJ)**: Blows south of the Himalayas in winter at altitude of $9\text{--}13\text{ km}$ ($300\text{ mb}$ level).
* **Tropical Easterly Jet Stream (TEJ)**: Established over peninsular India ($14^\circ \text{N}$) in summer following heating of the Tibetan plateau.

---

## 🌊 Section 2: The Mechanism of the Indian Summer Monsoon

The onset and withdrawal of the South-West Monsoon is governed by complex dynamic and thermal interactions:

### 1. Shift of ITCZ in Summer (Thermal Factor):
* In summer (July), the sun shines vertically over the Tropic of Cancer.
* The ITCZ shifts northward to the Indo-Gangetic plain ($20^\circ\text{--}25^\circ \text{N}$ latitude), creating the **Monsoon Trough**.
* Trade winds of the Southern Hemisphere (South-East Trades) cross the Equator, get deflected to the right by the **Coriolis Force** (Ferrel's Law), and enter the subcontinent as the **South-West Monsoon**.

### 2. Role of the Tibetan Plateau & Tropical Easterly Jet (TEJ):
* The high altitude Tibetan Plateau ($> 4,500 \text{ m}$) receives intense solar radiation during summer, acting as an **elevated heat source**.
* Rising air columns from Tibet form an upper-tropospheric anticyclone from which the **Tropical Easterly Jet Stream (TEJ)** originates.
* The TEJ flows westward across Peninsular India and descends over the western Indian Ocean / Mascarene Islands, intensifying the **Mascarene High (High Pressure cell)** which pushes forceful South-West Monsoon winds toward India.

### 3. Withdrawal of Westerly Jet Stream:
* The sudden northward jump of the Sub-Tropical Westerly Jet Stream to the north of the Tibetan Plateau in June triggers the **"Monsoon Burst"** along the Malabar Coast of Kerala.

---

### 4. Teleconnections & Ocean-Atmospheric Phenomema:

| Phenomenon | Geographic Location | Nature & Mechanism | Impact on Indian Monsoon |
| :--- | :--- | :--- | :--- |
| **El Niño (ENSO)** | Central & Eastern Equatorial Pacific Ocean (Peruvian Coast) | Warming of ocean surface water replaces the cold Peru (Humboldt) Current every 2 to 7 years. Weakens the Pacific Walker circulation. | Strongly associated with **Droughts / Deficient Monsoon** in India (e.g. 2002, 2009, 2014, 2015, 2023). |
| **La Niña** | Central & Eastern Pacific Ocean | Abnormal cooling of sea surface temperatures in eastern equatorial Pacific; strengthens Walker Circulation. | Associated with **Abundant / Above-Normal Monsoon Rainfall** and flooding in India. |
| **Indian Ocean Dipole (IOD)** | Tropical Indian Ocean | Difference in Sea Surface Temperature (SST) between western Indian Ocean (Arabian Sea) and eastern Indian Ocean (south of Indonesia). | • **Positive IOD**: Warmer Arabian Sea -> **Brings heavy rainfall** and neutralizes El Niño impact.<br>• **Negative IOD**: Cooler Arabian Sea -> **Suppresses rainfall**. |

---

## 🌧️ Section 3: The 4 Distinct Seasons of India (IMD Classification)

1. **Cold Weather Season (Winter: December to February)**:
   * **Temperature**: Average temperature $< 21^\circ\text{C}$ in northern plains, dipping to $2.5^\circ\text{C}$ in Punjab/Rajasthan; pleasant $25^\circ\text{C}$ in south.
   * **Western Disturbances**: Shallow cyclonic depressions originating over the **Mediterranean Sea** brought to north-west India by the Sub-Tropical Westerly Jet Stream. Brings highly beneficial winter rainfall ($Mahawat$) essential for **Rabi crops (Wheat, Mustard)**.
2. **Hot Weather Season (Pre-Monsoon Summer: March to May)**:
   * Sun migrates northward; highest temperature recorded in interior Deccan (March $38^\circ\text{C}$), MP/Gujarat (April $42^\circ\text{C}$), and Rajasthan (May $48^\circ\text{C}$).
   * **Loo**: Hot, dry, dust-laden daytime winds blowing across the Northern Plains (Punjab to Bihar).
   * **Local Pre-Monsoon Thunderstorms**:
     * **Kalbaishakhi / Nor'westers** (Bengal & Assam): Evening violent thunderstorms with torrential rain and hail. Beneficial for *Aus* paddy, jute, and tea in Assam (called *Bordoisila*).
     * **Mango Showers** (Kerala & Coastal Karnataka): Help in early ripening of mangoes.
     * **Cherry Blossom / Blossom Showers** (Karnataka & Kerala): Help coffee flowers blossom.
3. **South-West Monsoon Season (Rainy Season: June to September)**:
   * Delivers **75% to 80% of India's annual rainfall**.
   * Enters as two distinct branches:
     * **Arabian Sea Branch**: Strikes Western Ghats (delivers $> 300\text{ cm}$ on windward coast), then enters via Narmada-Tapi troughs and Gujarat/Rajasthan (Aravalis run parallel to winds, hence no rain in Rajasthan).
     * **Bay of Bengal Branch**: Strikes Myanmar's Arakan coast and Meghalaya Plateau (delivers world's highest rainfall at **Mawsynram $1,187\text{ cm}$** and Cherrapunji), then deflects westward along the Himalayas towards Punjab.
   * **Monsoon Break**: Period of several dry days without rain during peak monsoon when the Monsoon Trough shifts north to the Himalayan foothills.
4. **Season of Retreating Monsoon (Autumn: October to November)**:
   * Monsoon withdraws from North India by September end as sun moves southward.
   * Clear skies and high daytime temperatures with high humidity create oppressive weather known as **"October Heat"**.
   * **North-East Monsoon**: Winds blowing from land to sea pick up moisture over the Bay of Bengal and deliver heavy winter rainfall to the **Coromandel Coast (Tamil Nadu)** in November–December.
   * Frequent, destructive **Tropical Cyclones** hit Andhra Pradesh, Odisha, and West Bengal coasts.

---

## 🗺️ Section 4: Koeppen's Climatic Classification of India

Wladimir Koeppen (1918) divided India into **8 major climatic zones** based on monthly temperature and precipitation values:

| Climatic Code | Type of Climate | Geographic Region in India |
| :--- | :--- | :--- |
| **Amw** | Monsoon with short dry winter | Western Coastal Plains south of Goa (Malabar Coast), Tripura, Southern Assam. |
| **As** | Monsoon with dry summer | **Coromandel Coast of Tamil Nadu** (Receives winter rain from retreating NE monsoon). |
| **Aw** | Tropical Savannah | Most of the Peninsular Plateau south of Tropic of Cancer (except Coromandel). |
| **BShw** | Semi-arid Steppe climate | Rain-shadow belt of Western Ghats, parts of Rajasthan, Haryana, and Gujarat. |
| **BWhw** | Hot Desert climate | Extreme western Rajasthan (Thar Desert - Jaisalmer, Bikaner). |
| **Cwg** | Monsoon with dry winter & Gangetic warm summer | **Entire Northern Plains** (Ganga Plain, East Rajasthan, UP, Bihar, WB, Assam). |
| **Dfc** | Cold humid winter with short summer | Sikkim and **Arunachal Pradesh** Himalayas. |
| **E / ET** | Polar / Tundra mountain climate | High altitude zones of Jammu & Kashmir, Ladakh, Himachal Pradesh, Uttarakhand. |
    `
  },

  // --------------------------------------------------------------------------
  // CLASS 12 POLITICS IN INDIA SINCE INDEPENDENCE (CH 1: NATION BUILDING)
  // --------------------------------------------------------------------------
  {
    id: 'ncert-pol-class-12-india-ch01',
    book_id: 'ncert-pol-class-12-india',
    chapter_num: 1,
    chapter_title: 'Challenges of Nation Building: Partition, Princely States & Linguistic States',
    chapter_title_bn: 'জাতি গঠনের চ্যালেঞ্জ: দেশভাগ, দেশীয় রাজ্য অন্তর্ভুক্তি ও রাজ্য পুনর্গঠন',
    read_time_mins: 32,
    summary: 'The critical post-independence statecraft: Nehru’s "Tryst with Destiny", 3 core challenges, Partition trauma and refugee rehabilitation, Sardar Patel & V.P. Menon’s integration of 565 Princely States (Junagadh, Hyderabad, Kashmir, Manipur), and States Reorganisation Commission (1953–56).',
    content_markdown: `
# NCERT Class 12 Political Science: Chapter 1 — Challenges of Nation Building

> **Tryst with Destiny**: At the stroke of midnight on **14–15 August 1947**, as India attained freedom from British colonial rule, Prime Minister Pt. Jawaharlal Nehru delivered his historic speech to the Constituent Assembly: *"Long years ago we made a tryst with destiny, and now the time comes when we shall redeem our pledge..."*

---

## 🎯 Section 1: The Three Immediate Challenges of Independent India

| Nation-Building Challenge | Primary Objective | Key Obstacle to Overcome |
| :--- | :--- | :--- |
| **1. Shaping a United Nation** | Accommodate continental diversity & prevent Balkanization. | Deep religious, linguistic, and cultural divides post-partition. |
| **2. Establishing Democracy** | Universal Adult Franchise & representative parliamentary system. | High illiteracy and lack of prior democratic experience among masses. |
| **3. Socio-Economic Development** | Eradicate poverty and ensure welfare for all disadvantaged groups. | Stagnant colonial economy, famine vulnerability, and deep inequality. |

1. **First & Most Immediate Challenge: To Shape a United Nation**:
   * India was a land of continental size and immense diversity (hundreds of languages, religions, cultures).
   * **Existential Question**: Could a country of such diversity remain together without splintering into dozens of warring nation-states?
2. **Second Challenge: To Establish Democratic Politics**:
   * The Constitution granted **Universal Adult Franchise** (voting rights to all adults regardless of property or education) and established a parliamentary form of government.
   * **Challenge**: To make democratic competition inclusive, peaceful, and meaningful in an impoverished, largely illiterate society.
3. **Third Challenge: To Ensure the Development and Well-Being of the Entire Society**:
   * The Constitution clearly laid down the principle of equality and special protection for socially disadvantaged groups (SCs, STs, OBCs, minorities) in the **Directive Principles of State Policy**.
   * **Challenge**: To evolve effective economic policies for poverty eradication, industrialization, and agricultural growth.

---

## 💔 Section 2: Partition: Displacement, Trauma & Consequences

* **The Two-Nation Theory**: Advanced by the **Muslim League** (led by Muhammad Ali Jinnah), asserting that India consisted of two separate nations — Hindus and Muslims — and demanding a separate homeland (**Pakistan**).
* **The Process of Partition**:
  * Decided on the principle of **Religious Majorities**: Districts with Muslim majorities were to constitute Pakistan.
  * **Two Distinct Centers**: Since there was no single continuous Muslim-majority belt, Pakistan was created with two disjointed wings separated by over $1,500 \text{ km}$ of Indian territory — **West Pakistan** and **East Pakistan** (now Bangladesh).
  * **Partition of Punjab and Bengal**: Both large provinces had roughly equal populations of Hindus and Muslims. They were bifurcated at district/tehsil levels based on the **Radcliffe Line** drawn by **Sir Cyril Radcliffe** (Chairman of the Boundary Commission).
* **The Human Cost & Tragedy**:
  * Unprecedented, sudden, unplanned, and tragic mass transfer of populations in human history.
  * An estimated **80 Lakh (8 million) people** were forced to migrate across new borders.
  * Between **5 Lakh to 10 Lakh people were killed** in communal slaughter and riots.
  * Millions of women were abducted, raped, and forcibly converted.
  * Partition was not merely a division of properties, liabilities, and territory; it was a traumatic **"Division of Hearts"** (poignantly depicted in literature by Saadat Hasan Manto, Amrita Pritam, and Ritwik Ghatak's cinema).

---

## 👑 Section 3: Integration of 565 Princely States

### Key Stages of Princely State Integration:
1. **Lapse of Paramountcy (15 August 1947)**: 565 States legally independent.
2. **Diplomatic Masterplan**: Sardar Vallabhbhai Patel (States Minister) & V.P. Menon.
3. **Instrument of Accession (IoA)**: Surrender of Defense, External Affairs, and Communications to Union of India.
4. **Integration of Difficult States**: Junagadh (Plebiscite), Hyderabad (Operation Polo), Kashmir (Instrument of Accession), and Manipur (Merger Agreement).

* **The Constitutional Crisis of Paramountcy**:
  * British India was divided into **British Indian Provinces** (directly governed) and **565 Princely States** (ruled by native princes under British *Paramountcy*).
  * The *Indian Independence Act, 1947* declared that with the end of British rule, Paramountcy would lapse, leaving all 565 states free to **join India, join Pakistan, or remain independent sovereign states**.
  * Rulers of Travancore, Hyderabad, and Bhopal immediately announced their intention to remain independent, threatening to **balkanize India** into hundreds of small kingdoms.
* **The Iron Man: Sardar Vallabhbhai Patel**:
  * Deputy Prime Minister and Minister for States, assisted by brilliant civil servant **V.P. Menon**.
  * Used statesmanship, persuasion, patriotism, and when necessary, firm coercive diplomacy to integrate almost all states before 15 August 1947 through the **Instrument of Accession (IoA)**.

---

### Integration of Four Complicated States:

| State | Ruler vs Population Profile | Crisis & Resistance | Resolution & Integration Method |
| :--- | :--- | :--- | :--- |
| **1. Junagadh** (Saurashtra, Gujarat) | Muslim Nawab (Mohammad Mahabat Khan III); Overwhelmingly **Hindu population (82%)**. | Nawab announced accession to Pakistan on 15 August 1947 despite no geographical contiguity. People revolted; formed *Arzi Hukumat* (Provisional Govt) under Samaldas Gandhi. | Indian troops entered Junagadh; Nawab fled to Karachi. A **Plebiscite held in February 1948** voted 99.9% in favor of joining India. |
| **2. Hyderabad** (Largest Princely State) | Muslim Nizam (**Mir Osman Ali Khan**, one of the richest men in the world); Majority **Hindu population (85%)**. | Nizam refused accession; signed a 1-year Standstill Agreement (Nov 1947). Unleashed a brutal paramilitary force called **Razakars** (led by Kasim Razvi) who terrorized Hindu peasants. Peasant revolt erupted in Telangana. | In **September 1948**, Indian Army launched **Operation Polo** (Police Action). Nizam surrendered; signed Instrument of Accession; Hyderabad merged with India. |
| **3. Jammu & Kashmir** | Hindu Maharaja (**Hari Singh**); Majority **Muslim population**. | Maharaja wished to remain independent; signed Standstill Agreement. In **October 1947**, Pakistan launched tribal armed raiders (*Afridis & Pashtuns*) backed by Pakistani Army. | Maharaja Hari Singh appealed to India for military aid; signed the **Instrument of Accession on 26 October 1947**. Indian troops airlifted to Srinagar, repelling invaders. (Article 370 granted special autonomous status). |
| **4. Manipur** | Maharaja **Bodhachandra Singh**. | Signed IoA before independence on assurance of internal autonomy. Under public pressure, held elections in **June 1948** based on Universal Adult Franchise (**First part of India to hold elections under adult franchise**); became a constitutional monarchy. | Under pressure from the Government of India, Maharaja signed Merger Agreement in **September 1949** without consulting the elected Legislative Assembly, merging Manipur into India. |

---

## 🗺️ Section 4: States Reorganisation & Linguistic Principle

* **Historical Promise**: During the freedom struggle, the Congress had committed (at **1920 Nagpur Session**) that post-independence, states would be reorganized on a **Linguistic Basis**.
* **Post-Partition Apprehension**: Following the trauma of Partition, national leaders (Nehru, Patel) feared linguistic states might encourage regional chauvinism and disintegrate national unity.
* **Early Commissions**:
  1. **Dhar Commission (SK Dhar, June 1948)**: Recommended reorganization on administrative convenience rather than language.
  2. **JVP Committee (December 1948)**: Jawaharlal Nehru, Vallabhbhai Patel, Pattabhi Sitaramayya. Formally rejected language as the basis for reorganization for the time being.
* **The Andhra Movement & Potti Sreeramulu**:
  * Telugu-speaking people of Madras Presidency demanded a separate **Andhra State**.
  * Veteran Gandhian leader **Potti Sreeramulu** went on a fast unto death.
  * After **56 days of hunger strike, Potti Sreeramulu died on 15 December 1952**, triggering widespread mass unrest and violence.
  * Government immediately yielded; on **1 October 1953**, **Andhra State** was formed as the **FIRST linguistic state in independent India** (Kurnool as capital, High Court at Guntur).
* **States Reorganisation Commission (SRC, 1953)**:
  * Headed by retired Supreme Court judge **Fazal Ali**, with members **K.M. Panikkar** and **H.N. Kunzru** (Fazal Ali Commission).
  * Report submitted in 1955 accepting that state boundaries should reflect linguistic boundaries.
* **States Reorganisation Act, 1956 (7th Constitutional Amendment Act, 1956)**:
  * Abolished the complex classification of states into Part A, B, C, and D states.
  * Created **14 States and 6 Union Territories** on **1 November 1956**.
  * *Outcome*: Far from breaking up the country, linguistic states strengthened Indian national unity and deepened democratic participation.
    `
  }
];

const insertStmt2 = db.prepare(`
  INSERT OR REPLACE INTO ncert_chapters (
    id, book_id, chapter_num, chapter_title, chapter_title_bn, summary, content_markdown, pdf_url, read_time_mins
  ) VALUES (
    @id, @book_id, @chapter_num, @chapter_title, @chapter_title_bn, @summary, @content_markdown, @pdf_url, @read_time_mins
  )
`);

let c2 = 0;
const trans2 = db.transaction(() => {
  for (const ch of chaptersData) {
    insertStmt2.run({
      pdf_url: 'https://ncert.nic.in/textbook.php',
      ...ch
    });
    c2++;
  }
});

trans2();
console.log(`✅ Successfully seeded ${c2} additional masterclass chapters!`);
