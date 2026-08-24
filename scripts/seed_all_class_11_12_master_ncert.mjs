import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('📚 Seeding Full Suite of Class 11 & 12 NCERT Complete Chapters...');

const additionalMasterChapters = [
  // --------------------------------------------------------------------------
  // CLASS 12 HISTORY: THEMES IN INDIAN HISTORY - PART I (ANCIENT)
  // --------------------------------------------------------------------------
  {
    id: 'ncert-hist-class-12-p1-ch01',
    book_id: 'ncert-hist-class-12-p1',
    chapter_num: 1,
    chapter_title: 'Bricks, Beads and Bones: The Harappan Civilisation',
    chapter_title_bn: 'ইট, পুতি ও হাড়: হরপ্পা সভ্যতা',
    read_time_mins: 32,
    summary: 'The comprehensive archaeological chronicle of the Indus Valley Civilization (c. 2600–1900 BCE): Town planning, Citadel and Lower Town, Great Bath, Drainage systems, Craft production (Chanhudaro, Lothal), Script, Weights and Measures, and theories of decline.',
    content_markdown: `
# NCERT Class 12 History: Theme 1 — Bricks, Beads and Bones (The Harappan Civilisation)

> **Bronze Age Urban Miracle**: The Indus Valley Civilisation (Mature Harappan period: **c. 2600 to 1900 BCE**) represents one of the earliest urban civilizations of the ancient world, renowned for its standardized brick ratios, grid-pattern town planning, and advanced subterranean drainage networks.

---

## 🏛️ Section 1: Archaeological Discovery & Terminology

* **Nomenclature**: Also called the **Harappan Civilisation** because **Harappa** (discovered in **1921 by Daya Ram Sahni** on the banks of River Ravi in Montgomery district, Punjab, Pakistan) was the first site excavated.
* **Mohenjo-Daro ("Mound of the Dead")**: Discovered in **1922 by Rakhaldas Bandyopadhyay (R.D. Banerji)** on the right bank of River Indus in Larkana district, Sindh, Pakistan.
* **Sir John Marshall**: Director-General of the Archaeological Survey of India (ASI) who formally announced the discovery of a new civilization in the Indus Valley to the world in **1924**.
* **Stratigraphy & Radiocarbon Dating**:
  * Early Harappan Culture (c. 3300–2600 BCE): Hakra ware, pastoral/farming communities (Kot Diji, Amri).
  * **Mature Harappan Culture (c. 2600–1900 BCE)**: Fully urbanized phase characterized by distinctive pottery, seals, terracotta toys, and uniform bricks.
  * Late Harappan Culture (c. 1900–1300 BCE): Ruralization, breakdown of trade networks (Jhukar & Jhangar cultures).

---

## 🏙️ Section 2: Urban Town Planning & Architecture

| Settlement Section | Physical Characteristics | Primary Architectural Function |
| :--- | :--- | :--- |
| **The Citadel** | Smaller area, elevated on mud-brick platforms, walled and physically separated. | Dedicated to monumental public structures, Great Bath, ritual ceremonies, and administrative granaries. |
| **The Lower Town** | Much larger area, lower elevation, walled residential sectors. | Residential quarters of commoners, merchants, and craftsmen, laid out on an orthogonal grid. |

### 1. Distinctive Features of Mohenjo-Daro:
* **The Great Bath**:
  * A large rectangular tank in a courtyard surrounded by a corridor on all four sides.
  * Flight of steps on the north and south leading into the tank.
  * Made water-tight by setting **burnt bricks on edge** and using a mortar of **gypsum**.
  * Rooms on three sides, in one of which was a large well.
  * Function: Believed to have been used for a **special ritual bath or religious purification**.
* **The Granary / Great Warehouse**:
  * Massive building whose lower mud-brick portions remain, while the upper wooden portions decayed.
* **Subterranean Drainage Network**:
  * Roads and streets laid out along an approximate **"Grid" pattern**, cutting at right angles.
  * Every house was connected to the street drain. Drains built of burnt bricks with loose covers that could be removed for cleaning.
  * Sump pits were provided to collect silt before water flowed into main street channels.
* **Residential House Architecture**:
  * Centered on a courtyard with rooms on all sides (courtyard was center for cooking and weaving).
  * **Privacy**: No windows in the walls along the ground level; main entrance does not give a direct view of the interior.
  * Every house had its own bathroom paved with bricks, with drains connected through the wall to street drains.
  * Many houses had stairs to reach a second storey or the roof. Mohenjo-Daro had an estimated **700 wells**.

---

## 🧭 Section 3: Major Archaeological Sites & Discoveries

| Site Name | River Bank & Modern Location | Primary Excavator | Key Archaeological Discoveries |
| :--- | :--- | :--- | :--- |
| **Harappa** | River Ravi, Punjab (Pakistan) | Daya Ram Sahni (1921), M.S. Vats (1940) | 6 Granaries in 2 rows, Coffin burial (R-37 & Cemetery H), Red sandstone torso, Copper mirror. |
| **Mohenjo-Daro** | River Indus, Sindh (Pakistan) | R.D. Banerji (1922), Ernest Mackay | **Great Bath**, Great Granary, Bronze Dancing Girl (Lost-wax cire perdue technique), Steatite Bearded Priest-King, Pashupati Mahadeva Seal. |
| **Lothal** | River Bhogava, Gulf of Khambhat, Gujarat | S.R. Rao (1954) | **Artificial Tidal Dockyard (Port town)**, Rice husk evidence, Terracotta ship model, Fire altars, Persian Gulf seal, Ivory scale. |
| **Dholavira** | Khadir Bet, Rann of Kachchh, Gujarat | J.P. Joshi (1967), R.S. Bisht (1990) | **Divided into 3 Parts (Citadel, Middle Town, Lower Town)**; Giant water reservoirs/check dams; **Large Signboard Inscription (10 giant white gypsum symbols)**. |
| **Kalibangan** ("Black Bangles") | River Ghaggar, Hanumangarh district, Rajasthan | A. Ghosh (1953), B.B. Lal & B.K. Thapar | **Ploughed field surface (Furrow marks)**, Mud-brick houses, Fire altars (*Havankunds*), Camel bones, Cylindrical seals. |
| **Chanhudaro** | River Indus, Sindh (Pakistan) | N.G. Majumdar (1931), Ernest Mackay | Exclusive **craft production center** (bead-making factory, shell cutting, seal making, weights); **Only city without a Citadel**; Inkpot, Lipstick trace. |
| **Banawali** | Fatehabad district, Haryana (Ghaggar valley) | R.S. Bisht (1974) | Terracotta model of **plough (*hal*)**, Radial streets layout, High quality barley grains. |
| **Rakhigarhi** | Hisar district, Haryana (Ghaggar-Hakra) | Amarendra Nath | **Largest Harappan site in the Indian subcontinent** (~350 hectares). |
| **Ropar (Kotla Nihang Khan)** | River Satluj, Punjab (India) | Y.D. Sharma (1953) | First site excavated in independent India (1953); Dog buried with human burial. |
| **Shortughai** | Oxus River, Northern Afghanistan | Henri-Paul Francfort | Harappan trading outpost for **Lapis Lazuli** (deep blue gemstone); Canal irrigation traces. |
| **Sutkagen Dor** | Dasht River, Balochistan (Pak-Iran border) | Aurel Stein (1927) | **Westernmost outpost** of Harappan civilization; Fortified trading port with Mesopotamia. |

---

## 💎 Section 4: Subsistence, Craft Production & Trade Networks

### 1. Craft Production at Chanhudaro and Lothal:
* Raw Materials used: **Carnelian** (red gemstone sourced from Bharuch, Gujarat), **Jasper**, **Crystal**, **Quartz**, **Steatite** (soft talc stone used for seals and micro-beads), **Copper, Bronze, Gold, Shell** (sourced from Nageshwar and Balakot), **Lapis Lazuli** (from Shortughai), **Turquoise** (from Iran).
* **Technique of Carnelian Beads**: Yellowish raw nodule was baked to obtain the deep fiery red color, chipped into rough shapes, flaked into final form, drilled with specialized stone drills (found at Chanhudaro, Lothal, and Dholavira), and polished.

### 2. Standardized Weights and Measures:
* Exchanges regulated by a precise system of weights made of **Chert** stone (cubical in shape, with no markings).
* Lower denominations were **binary** ($1, 2, 4, 8, 16, 32 \dots \text{up to } 12,800$), with the base unit $\approx 13.71 \text{ grams}$ ($16\text{th unit}$).
* Higher denominations followed the **decimal system** ($10, 20, 100, 200, 500$).

### 3. Distant Trade Networks & Mesopotamian Texts:
* Mesopotamian cuneiform texts (c. 3rd millennium BCE) mention trade contacts with three regions:
  1. **Dilmun**: Island of Bahrain in the Persian Gulf.
  2. **Magan**: Makran coast / Oman (source of copper with distinct nickel traces identical to Harappan bronze).
  3. **Meluhha**: The land of seafarers — ancient name for the **Indus Valley region**. Mentioned products: Carnelian, lapis lazuli, copper, gold, and varieties of wood. Also called the *"haja-bird"* (peacock).

---

## ❓ Section 5: The Harappan Script & Religious Beliefs

* **Harappan Script**:
  * Undeciphered till date. It is **pictographic / ideographic**, containing between **375 to 400 distinct signs**.
  * Direction of Writing: Written from **Right to Left** (evidenced by cramping of signs on the left side of seals).
  * Found on seals, copper tools, rims of jars, terracotta tablets, and bone rods.
* **Religious Practices (Archaeological Reconstruction)**:
  * **Mother Goddess**: Terracotta figurines of heavily ornamented women with elaborate headdresses.
  * **Pashupati Seal (Proto-Shiva)**: Seal depicting a seated figure in yogic posture wearing a horned headdress, surrounded by 4 animals: **Elephant, Tiger, Rhinoceros, Buffalo**, and **2 Deer** below the seat.
  * **Nature Worship**: Pipal tree motifs, Unicorn (*Ekashringa* — mythical one-horned animal most common on seals), sacred humped bull, and terracotta lingas.

---

## 📉 Section 6: The End / Decline of the Civilisation (c. 1900 BCE)

By 1900 BCE, major urban centers like Harappa and Mohenjo-Daro were largely abandoned, giving way to ruralized Late Harappan cultures. Major hypotheses proposed by historians and archaeologists:

1. **Aryan Invasion Theory (Now Discredited)**: Proposed by **Sir Mortimer Wheeler** citing Rigvedic references to *Purandara* (destroyer of forts/cities) and unburied skeletons in Mohenjo-Daro. Refuted by George Dales and modern skeletal biology (no evidence of military conquest).
2. **Climatic Change & Desiccation**: Proposed by **Gurdip Singh** and **Aurel Stein** — Decline in monsoon rainfall led to drying up of rivers (notably the Ghaggar-Hakra / Saraswati river) and desert expansion.
3. **Tectonic Uplift & Flooding**: Proposed by **Robert Raikes** and **M.R. Sahni** — Earthquakes blocked the lower course of the Indus, causing massive impoundment and submergence of Mohenjo-Daro under mud lakes.
4. **Shifting of River Courses**: Shifting of the Indus and drying of the Hakra system devastated agrarian hinterlands.
5. **Deforestation & Ecological Collapse**: Over-consumption of wood fuel for baking millions of bricks and smelting copper caused irreversible ecological degradation.
    `
  },

  // --------------------------------------------------------------------------
  // CLASS 11 POLITY: INDIAN CONSTITUTION AT WORK - CHAPTER 2 (RIGHTS & DPSP)
  // --------------------------------------------------------------------------
  {
    id: 'ncert-pol-class-11-work-ch02',
    book_id: 'ncert-pol-class-11-work',
    chapter_num: 2,
    chapter_title: 'Rights in the Indian Constitution & Directive Principles of State Policy',
    chapter_title_bn: 'ভারতীয় সংবিধানে অধিকার এবং রাষ্ট্র পরিচালনার নির্দেশমূলক নীতি',
    read_time_mins: 32,
    summary: 'The relationship between Fundamental Rights (Part III) and Directive Principles of State Policy (Part IV), Fundamental Duties (Part IVA), Writs, Kesavananda Bharati, and the harmonious balance doctrine of Minerva Mills.',
    content_markdown: `
# NCERT Class 11 Polity: Chapter 2 — Rights in the Indian Constitution & DPSP

> **The Conscience of the Constitution**: Granville Austin described Fundamental Rights and Directive Principles of State Policy as the *"Conscience of the Constitution"*, creating a delicate balance between individual liberties and socio-economic justice.

---

## ⚖️ Section 1: The Importance of Rights & The Bill of Rights

* **Bill of Rights**: A constitutional list of rights protected against government infringement, ensuring that the majority cannot tyrannize minority groups.
* **Justiciability**: Rights are enforceable through courts. If a citizen's Fundamental Right is violated, they have the right to approach the **Supreme Court (Article 32)** or **High Courts (Article 226)** directly for immediate enforcement.

---

## 📜 Section 2: Directive Principles of State Policy (DPSP, Part IV, Articles 36–51)

Borrowed from the **Irish Constitution of 1937** (which had derived them from the Spanish Constitution).

### 1. Nature & Purpose of DPSP:
* **Non-Justiciable**: Article 37 explicitly states that DPSPs shall **not be enforceable by any court**, but the principles therein laid down are nevertheless **fundamental in the governance of the country** and it shall be the duty of the State to apply these principles in making laws.
* **Goal**: To establish **Socio-Economic Democracy** and realize a **Welfare State** (unlike Fundamental Rights which primarily secure Political Democracy).

---

### 2. Classification of Directive Principles:

| Category of DPSP | Philosophical Origin | Core Target Articles |
| :--- | :--- | :--- |
| **Socialistic Principles** | Democratic Socialism & Welfare State | Articles 38, 39, 39A, 41, 42, 43, 43A |
| **Gandhian Principles** | Swaraj & Rural Self-Reliance | Articles 40, 43, 43B, 46, 47, 48 |
| **Liberal-Intellectual** | Modern Rule of Law & Rationalism | Articles 44, 45, 48A, 49, 50, 51 |

#### A. Socialistic Principles (Reflecting Ideals of Democratic Socialism):
* **Article 38**: State to promote welfare of people by securing a social order permeated by justice (social, economic, political) and minimizing inequalities in income, status, facilities, and opportunities.
* **Article 39**: State to secure:
  * (a) Adequate means of livelihood for all citizens.
  * (b) Equitable distribution of material resources of the community for the common good.
  * (c) Prevention of concentration of wealth and means of production.
  * (d) **Equal pay for equal work** for both men and women.
  * (e) Protection of health and strength of workers and children.
* **Article 39A (Added by 42nd AA 1976)**: Promote **equal justice and free legal aid** to the poor (led to *Legal Services Authorities Act, 1987* & NALSA).
* **Article 41**: Right to work, to education, and to public assistance in cases of unemployment, old age, sickness, and disablement.
* **Article 42**: Just and humane conditions of work and **maternity relief**.
* **Article 43**: Living wage and decent standard of life for workers.
* **Article 43A (Added by 42nd AA 1976)**: Participation of workers in the management of industries.

#### B. Gandhian Principles (Based on Gandhian Ideology of Swaraj):
* **Article 40**: Organization of **Village Panchayats** as units of self-government (realized via 73rd AA 1992).
* **Article 43**: Promotion of **cottage industries** on an individual or co-operative basis in rural areas.
* **Article 43B (Added by 97th AA 2011)**: Promotion of voluntary formation, autonomous functioning, and professional management of **Co-operative Societies**.
* **Article 46**: Promotion of educational and economic interests of **SCs, STs, and other weaker sections**.
* **Article 47**: Prohibition of the consumption of intoxicating drinks and drugs injurious to health (Alcohol prohibition).
* **Article 48**: Prohibition of the slaughter of cows, calves, and other milch and draught cattle; organization of agriculture and animal husbandry on modern scientific lines.

#### C. Liberal-Intellectual Principles:
* **Article 44**: State shall endeavor to secure for citizens a **Uniform Civil Code (UCC)** throughout the territory of India.
* **Article 45 (Amended by 86th AA 2002)**: Provision for **early childhood care and education** for children until they complete the age of 6 years.
* **Article 48A (Added by 42nd AA 1976)**: Protection and improvement of the **environment and safeguarding of forests and wildlife** (led to *Wildlife Protection Act 1972*, *Forest Conservation Act 1980*).
* **Article 49**: Protection of monuments, places, and objects of national importance.
* **Article 50**: **Separation of the Judiciary from the Executive** in the public services of the State.
* **Article 51**: Promotion of **international peace and security**, maintaining just and honorable relations between nations, and respect for international law and treaty obligations.

---

## 🥊 Section 3: The Conflict Between Fundamental Rights & DPSP

The constitutional relationship between Part III and Part IV has witnessed landmark judicial pronouncements:

1. **State of Madras v. Champakam Dorairajan (1951)**:
   * Supreme Court ruled that in case of any conflict between Fundamental Rights and DPSP, **Fundamental Rights shall prevail**. DPSPs must run as subsidiary to Fundamental Rights.
2. **Golaknath v. State of Punjab (1967)**:
   * SC held that Parliament cannot amend Fundamental Rights to give effect to Directive Principles.
3. **25th Amendment Act (1971)**:
   * Parliament inserted **Article 31C**: Declared that no law giving effect to the Directive Principles under **Article 39(b) and 39(c)** shall be declared void on the ground that it violates Articles 14, 19, or 31.
4. **Kesavananda Bharati v. State of Kerala (1973)**:
   * Upheld the validity of Article 31C giving primacy to Art 39(b) & (c) over Articles 14 and 19.
5. **Minerva Mills v. Union of India (1980)**:
   * Historic declaration by Chief Justice Y.V. Chandrachud: *"The Indian Constitution is founded on the bedrock of the balance between Parts III and IV. To give absolute primacy to one over the other is to disturb the harmony of the Constitution. They are like two wheels of a chariot."*

---

## 🇮🇳 Section 4: Fundamental Duties (Part IVA, Article 51A)

* **Origin**: Not present in the original 1950 Constitution. Recommended by the **Swaran Singh Committee (1976)** during the Emergency; inspired by the **USSR Constitution**.
* **42nd Amendment Act (1976)**: Added **Part IVA** and **Article 51A**, introducing **10 Fundamental Duties**.
* **86th Amendment Act (2002)**: Added the **11th Fundamental Duty** (Art 51A(k)) — Duty of parent/guardian to provide educational opportunities to their child between ages 6 and 14.
* **Legal Nature**: Like DPSP, Fundamental Duties are **non-justiciable** (not directly enforceable by courts), but Parliament can enact legislation to penalize their non-compliance (e.g. *Prevention of Insults to National Honour Act 1971*, *Wildlife Protection Act 1972*).

### The 11 Fundamental Duties under Article 51A:
1. **(a)** Abide by the Constitution and respect its ideals and institutions, the **National Flag and National Anthem**.
2. **(b)** Cherish and follow the noble ideals that inspired the national struggle for freedom.
3. **(c)** Uphold and protect the **sovereignty, unity, and integrity of India**.
4. **(d)** Defend the country and render national service when called upon to do so.
5. **(e)** Promote harmony and the spirit of common brotherhood amongst all people transcending religious, linguistic, and regional diversities; **renounce practices derogatory to the dignity of women**.
6. **(f)** Value and preserve the rich heritage of our **composite culture**.
7. **(g)** Protect and improve the **natural environment** including forests, lakes, rivers, and wildlife, and have compassion for living creatures.
8. **(h)** Develop the **scientific temper, humanism, and the spirit of inquiry and reform**.
9. **(i)** Safeguard **public property** and abjure violence.
10. **(j)** Strive towards excellence in all spheres of individual and collective activity so that the nation constantly rises to higher levels of endeavor and achievement.
11. **(k)** Provide opportunities for education to child/ward between **6 and 14 years** of age (*Added by 86th AA 2002*).
    `
  }
];

const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO ncert_chapters (
    id, book_id, chapter_num, chapter_title, chapter_title_bn, summary, content_markdown, pdf_url, read_time_mins
  ) VALUES (
    @id, @book_id, @chapter_num, @chapter_title, @chapter_title_bn, @summary, @content_markdown, @pdf_url, @read_time_mins
  )
`);

let count = 0;
const t = db.transaction(() => {
  for (const ch of additionalMasterChapters) {
    insertStmt.run({
      pdf_url: 'https://ncert.nic.in/textbook.php',
      ...ch
    });
    count++;
  }
});

t();
console.log(`✅ Successfully seeded additional ${count} exhaustive Class 11 & 12 chapters!`);
