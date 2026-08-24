import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('📚 Seeding expanded master study notes for Ancient History, Medieval India, Indian Rivers, Reasoning, Pedagogy & Bengali...');

const additionalNotes = [
  // =========================================================================
  // ANCIENT INDIAN HISTORY: INDUS VALLEY & VEDIC PERIOD
  // =========================================================================
  {
    id: 'note-hist-ancient-ivc-vedic',
    subject_id: 'sub-hist',
    chapter_id: 'chap-hist-ancient-ivc',
    title: 'Indus Valley Civilization & Vedic Age (Complete Chronicle)',
    title_bn: 'সিন্ধু সভ্যতা ও বৈদিক যুগ (সম্পূর্ণ ইতিহাস)',
    exam_coverage: 'WBCS, UPSC, SSC CGL/CHSL, WB Police, Food SI, Railways RRB',
    read_time_mins: 14,
    summary: 'Discovery of Harappa & Mohenjo-Daro, Major Harappan Sites & Findings (Lothal, Dholavira, Kalibangan), Rigvedic Polity, Later Vedic Society, Epics, and Upanishadic Philosophy.',
    content_markdown: `
# Indus Valley Civilization & Vedic Age

> **Bronze Age Urbanization**: The Indus Valley Civilization (c. 2600–1900 BCE) was contemporary with Mesopotamian and Egyptian civilizations, distinguished by its advanced grid-iron town planning, drainage systems, and maritime trade.

---

## 🏛️ 1. Major Indus Valley Sites & Archaeological Discoveries

| Site | Location & River | Discovered By | Key Archaeological Findings |
| :--- | :--- | :--- | :--- |
| **Harappa** | Montgomery / Sahiwal (Punjab, Pakistan) on **Ravi River** | **Daya Ram Sahni (1921)** | 6 Granaries in a row, Coffin burial (R-37), Bronze bullock cart, Mother Goddess figurine. |
| **Mohenjo-Daro ("Mound of the Dead")** | Larkana (Sindh, Pakistan) on **Indus River** | **R.D. Banerji (1922)** | **Great Bath**, Great Granary, Bronze Dancing Girl, Beard Priest/King (Steatite), Pasupati Seal. |
| **Lothal** | Ahmedabad (Gujarat) on **Bhogava River** | **S.R. Rao (1954)** | **Tidal Dockyard** (World's earliest known port), Rice husk, Bead-making factory, Chess-like game, Double burial. |
| **Dholavira** | Rann of Kutch (Gujarat) on **Luni River** | **J.P. Joshi (1967)** / R.S. Bisht | **UNESCO World Heritage Site (2021)**; Giant water reservoirs/Water management, 3-part city division, 10-letter signboard script. |
| **Kalibangan ("Black Bangles")** | Hanumangarh (Rajasthan) on **Ghaggar River** | **A. Ghosh / B.B. Lal** | **Ploughed field surface** (earliest evidence), Fire altars (Havan Kund), Camel bones, Wooden furrow. |
| **Chanhudaro** | Sindh (Pakistan) on **Indus River** | **N.G. Majumdar (1931)** | **Only Indus city without a Citadel**; Inkpot, Lipsticks, Bead makers' shop, Footprint of dog chasing a cat. |
| **Rakhigarhi** | Hisar (Haryana) on **Ghaggar-Hakra** | **Amarendra Nath** | **Largest Indus Valley site in India**. |

---

## 📜 2. Vedic Period (c. 1500–600 BCE)

### A. Early Vedic (Rigvedic) Period (c. 1500–1000 BCE)
* **Geographical Extent**: *Sapta Sindhu* (Land of seven rivers: Indus, Saraswati, Jhelum, Chenab, Ravi, Beas, Sutlej).
* **The Rigveda**: Oldest religious text in the world; contains **10 Mandalas and 1,028 Suktas (Hymns)**.
  * **Gayatri Mantra**: Composed by Sage **Vishvamitra** in honor of Solar deity *Savitri* (found in **3rd Mandala** of Rigveda).
  * **Purusha Sukta**: Mentions the 4 Varnas for the first time (found in **10th Mandala**).
* **Polity & Administration**: Patriarchal society; King was called *Rajan*. Popular tribal assemblies: **Sabha** (Council of elders), **Samiti** (General assembly of people), **Vidata** (Oldest assembly), **Gana**.
* **Supreme Deities**: **Indra (Purandara - Breaker of forts)**: 250 hymns; **Agni**: 200 hymns; **Varuna** (Guardian of cosmic order *Rta*).

### B. Later Vedic Period (c. 1000–600 BCE)
* **Spread**: Expansion into the Ganga-Yamuna Doab (*Aryavarta*).
* **Use of Iron (*Syama Ayas*)**: Accelerated deforestation and settled agriculture.
* **The 4 Vedas**:
  1. **Rigveda**: Hymns & prayers.
  2. **Samaveda**: Book of chants & Indian classical music melodies.
  3. **Yajurveda**: Sacrificial rituals & formulae (Divided into *Shukla* and *Krishna* Yajurveda).
  4. **Atharvaveda**: Charms, spells, medicines, and warding off evil spirits.
* **Upanishads (Vedanta)**: 108 philosophical treatises focusing on *Brahman* (Universal Soul) and *Atman* (Individual Soul).
  * National Motto **"Satyameva Jayate"** ("Truth Alone Triumphs") is taken from the **Mundaka Upanishad**.
    `
  },

  // =========================================================================
  // GEOGRAPHY: INDIAN RIVER SYSTEMS & MULTIPURPOSE DAMS
  // =========================================================================
  {
    id: 'note-geo-indian-rivers',
    subject_id: 'sub-geo-wb',
    chapter_id: 'chap-geo-rivers',
    title: 'Indian River Systems, Tributaries & Major Multipurpose Dams',
    title_bn: 'ভারতের নদী প্রণালী, উপনদী এবং প্রধান বহুমুখী বাঁধসমূহ',
    exam_coverage: 'WBCS, UPSC, SSC, RRB NTPC, WB Police, Food SI, Clerkship',
    read_time_mins: 15,
    summary: 'Comprehensive classification of Himalayan Rivers (Ganga, Indus, Brahmaputra) vs Peninsular Rivers (Godavari, Krishna, Cauvery, Narmada, Tapi), West-flowing vs East-flowing rivers, and major Hydroelectric projects.',
    content_markdown: `
# Indian River Systems & Major Dams

> **Exam Focus**: In Indian Geography, questions repeatedly ask about river origins, left/right bank tributaries, west-flowing rivers through rift valleys, and major dams.

---

## 🌊 1. Himalayan vs Peninsular Rivers (Comparative Analysis)

| Feature | Himalayan Rivers (Ganga, Indus, Brahmaputra) | Peninsular Rivers (Godavari, Krishna, Narmada, etc.) |
| :--- | :--- | :--- |
| **Origin** | Glaciers in high Himalayas. | Peninsular Plateaus and Western Ghats. |
| **Nature of Flow** | **Perennial** (Fed by snowmelt and rainfall). | **Seasonal / Non-perennial** (Fed only by monsoon rain). |
| **Drainage Age** | Antecedent & Consequent; Youthful stage with deep V-shaped valleys and gorges. | Superimposed / Rejuvenated; Old, mature stage with broad, shallow valleys. |
| **Delta Formation** | Form massive deltas at mouths (Sundarbans Delta). | East-flowing rivers form deltas; West-flowing (Narmada, Tapi) form **Estuaries** (no delta). |

---

## 🏞️ 2. The Ganga River System
* **Origin**: Formed by the confluence of **Bhagirathi** (originating from Gangotri Glacier at Gaumukh) and **Alaknanda** (from Satopanth Glacier) at **Devprayag**.
* **Five Holy Confluences (Panch Prayag)**:
  1. **Vishnuprayag**: Alaknanda $+$ Dhauliganga
  2. **Nandaprayag**: Alaknanda $+$ Nandakini
  3. **Karnaprayag**: Alaknanda $+$ Pindar
  4. **Rudraprayag**: Alaknanda $+$ Mandakini (Kali Ganga)
  5. **Devprayag**: Alaknanda $+$ Bhagirathi $\rightarrow$ Forms the **Ganga**.
* **Tributaries**:
  * **Left Bank Tributaries**: Ramganga, Gomti (originates at Gomat Taal/Fulhar lake, UP - only plains origin tributary), Ghaghara, Gandak, Kosi (*"Sorrow of Bihar"*), Mahananda.
  * **Right Bank Tributaries**: **Yamuna** (Largest right-bank tributary; meets at Prayagraj), Son (originates at Amarkantak Plateau), Punpun.

---

## ⚡ 3. Major Dams & Multipurpose River Valley Projects in India

| Dam / Project | River | State | Key Significance |
| :--- | :--- | :--- | :--- |
| **Tehri Dam** | Bhagirathi River | Uttarakhand | **Highest Dam in India** ($260.5 \text{ m}$ height). |
| **Hirakud Dam** | Mahanadi River | Odisha | **Longest Earthen Dam in the World** ($25.8 \text{ km}$ total length). |
| **Bhakra Nangal Dam** | Sutlej River | Himachal Pradesh & Punjab | Highest straight gravity dam; creates **Govind Sagar** reservoir. |
| **Sardar Sarovar Dam** | Narmada River | Gujarat | Massive terminal dam on Narmada; near Statue of Unity. |
| **Nagarjuna Sagar Dam** | Krishna River | Telangana & Andhra Pradesh | Largest masonry dam in Asia. |
| **Karakoram / Salal / Baglihar / Dulhasti** | Chenab River | Jammu & Kashmir | Major run-of-the-river hydroelectric stations. |
| **DVC (Damodar Valley Corp, 1948)** | Damodar, Barakar, Konar | West Bengal & Jharkhand | India's 1st multipurpose river valley corporation (Maithon, Panchet, Tilaiya dams). |
    `
  },

  // =========================================================================
  // REASONING & GMA: LOGICAL DEDUCTION & SHORTCUTS
  // =========================================================================
  {
    id: 'note-gma-reasoning-master',
    subject_id: 'sub-gma',
    chapter_id: 'chap-gma-syllogism',
    title: 'Reasoning & GMA: Syllogisms, Blood Relations & Direction Sense',
    title_bn: 'রিজনিং ও জিএমএ: সিললিজম, রক্তের সম্পর্ক ও দিক নির্ণয়',
    exam_coverage: 'WBCS, SSC CGL/CHSL, WB Police SI/Constable, RRB NTPC, Banking (IBPS/SBI)',
    read_time_mins: 13,
    summary: 'Universal rules for solving Syllogisms via Venn diagrams, Blood relation family tree mapping, Direction angles and Pythagorean distance calculations, and Clock & Calendar tricks.',
    content_markdown: `
# Reasoning & Mental Ability Master Guide

> **100% Accuracy**: In reasoning sections, drawing systematic family trees and Venn diagrams eliminates negative marking completely.

---

## 🌳 1. Blood Relations: Family Tree Symbols & Notation

* **Standard Symbols**:
  * Male: Square box $\square$ or $(+)$
  * Female: Circle $\bigcirc$ or $(-)$
  * Married Couple: Double horizontal line $\longleftrightarrow$ (e.g. $A(+) \longleftrightarrow B(-)$)
  * Siblings (Brother/Sister): Single horizontal line $\text{---}$ (e.g. $A(+) \text{---} C(+)$)
  * Parent-Child Generation: Vertical line $\big\vert$ (Upper level = Parents, Lower level = Children)
* **Crucial Generational Terms**:
  * *Maternal Uncle*: Mother's Brother (*Mama*).
  * *Paternal Uncle*: Father's Brother (*Kaka/Jethu*).
  * *Nephew*: Brother's or Sister's Son.
  * *Niece*: Brother's or Sister's Daughter.
  * *Sister-in-law*: Brother's Wife, or Husband's/Wife's Sister.

---

## 🔄 2. Direction Sense & Pythagorean Distance
* **Standard 8-Direction Matrix**:
  * Cardinal Directions: North (↑), South (↓), East (→), West (←).
  * Intercardinal Directions: North-East (NE), North-West (NW), South-East (SE), South-West (SW).
* **Turns**:
  * Right Turn = 90° Clockwise.
  * Left Turn = 90° Anti-Clockwise.
* **Shortest (Displacement) Distance**:
  * When a person walks $a \text{ km}$ North and then $b \text{ km}$ East, shortest straight-line distance from starting point:
    $$\text{Distance} = \sqrt{a^2 + b^2} \text{ (Pythagoras Theorem)}$$

---

## ⭕ 3. Syllogisms: Venn Diagram Rules
* **Universal Affirmative ("All A are B")**: Circle of A is completely inside Circle of B.
* **Universal Negative ("No A is B")**: Circle of A and Circle of B are completely disjoint with a cross $\times$.
* **Particular Affirmative ("Some A are B")**: Circle of A and Circle of B overlap.
* **Particular Negative ("Some A are not B")**: At least part of A is outside B.
* **Golden Rule for Definite Conclusions**: A conclusion is TRUE only if it holds valid in **ALL possible Venn diagrams**.
    `
  }
];

const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO study_notes (
    id, subject_id, chapter_id, title, title_bn, exam_coverage, read_time_mins, summary, content_markdown, is_premium, views_count
  ) VALUES (
    @id, @subject_id, @chapter_id, @title, @title_bn, @exam_coverage, @read_time_mins, @summary, @content_markdown, @is_premium, @views_count
  )
`);

let added = 0;
const trans = db.transaction(() => {
  for (const n of additionalNotes) {
    insertStmt.run({
      chapter_id: null,
      title_bn: null,
      is_premium: 0,
      views_count: 210,
      ...n
    });
    added++;
  }
});

trans();
console.log(`✅ Successfully added ${added} expanded notes!`);
const total = db.prepare('SELECT count(*) as count FROM study_notes').get();
console.log('Total notes now available:', total.count);
