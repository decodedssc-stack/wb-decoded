import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('📚 Upgrading all remaining study notes to exhaustive, textbook-depth master handbooks...');

const expandedNotes = [
  // =========================================================================
  // 2. MODERN HISTORY: INDIAN NATIONAL MOVEMENT & BENGAL RENAISSANCE
  // =========================================================================
  {
    id: 'note-hist-modern-inm',
    subject_id: 'sub-inm',
    chapter_id: 'chap-inm-swadeshi',
    title: 'Indian National Movement (1885–1947) & Bengal Renaissance: Comprehensive Master Chronicle',
    title_bn: 'ভারতের জাতীয় আন্দোলন (১৮৮৫–১৯৪৭) এবং বাংলার নবজাগরণ: পূর্ণাঙ্গ ইতিহাস',
    exam_coverage: 'UPSC CSE (Modern India), WBCS (Exe) Prelims & Mains Paper IV (INM 50 Marks), WB Police SI, WBPSC Clerkship, Food SI',
    read_time_mins: 32,
    summary: 'Exhaustive historical chronicle from 19th Century Bengal Renaissance, Foundation of INC (1885), Moderate-Extremist split, 1905 Partition of Bengal, Revolutionary secret societies (Anushilan, Jugantar, Chittagong Raid), Gandhian Mass Satyagraha, Subhas Chandra Bose & INA, to Mountbatten Plan and Independence.',
    content_markdown: `
# Indian National Movement (1885–1947) & Bengal Renaissance

> **The Nerve Center of Indian Nationalism**: As Gopal Krishna Gokhale famously proclaimed, *"What Bengal thinks today, India thinks tomorrow."* Bengal was the intellectual cradle, social reform laboratory, and revolutionary vanguard of the Indian freedom struggle.

---

## 🏛️ Section 1: The 19th Century Bengal Renaissance & Socio-Religious Reforms

The Bengal Renaissance originated in the early 19th century under the intellectual impact of Western education, scientific rationalism, and humanitarian reformism.

### 1. Raja Ram Mohan Roy (1772–1833) — "Father of Modern India"
* **Titles**: *"Father of Indian Renaissance"*, *"Herald of a New Age"*, *"First Modern Man of India"*. Title of **'Raja'** conferred by Mughal Emperor **Akbar II** (sent to England to advocate for emperor's pension).
* **Literary & Philosophical Works**:
  * *Tuhfat-ul-Muwahhiddin* ("A Gift to Monotheists", 1803) in Persian.
  * Bengali translation of the Vedas and 5 major Upanishads (Kena, Katha, Isa, Mundaka, Mandukya).
  * *Precepts of Jesus* (1820) — separating ethical teachings of Christ from miraculous stories.
* **Newspapers & Periodicals**:
  * **Sambad Kaumudi** (1821) in Bengali (advocated abolition of Sati, widow remarriage, freedom of press).
  * **Mirat-ul-Akbar** (1822) — First weekly newspaper in Persian.
  * **Brahminical Magazine** (1821) in English.
* **Societies Founded**:
  * **Atmiya Sabha (1815)**: Society of Friends for philosophical and religious discussions.
  * **Calcutta Unitarian Committee (1821)** with William Adam and Dwarkanath Tagore.
  * **Brahmo Sabha (20 August 1828)**, later renamed **Brahmo Samaj (1830)** at Chitpur Road, Calcutta — dedicated to the worship of one formless Supreme God (Brahman) without idols, sacrifices, or caste barriers.
* **Educational Reforms**: Supported David Hare in establishing **Hindu College (1817)**; founded **Anglo-Hindu School (1822)** and **Vedanta College (1825)**.
* **Crusade against Sati**: Led a relentless social and shastric campaign that compelled Governor-General **Lord William Bentinck** to enact **Regulation XVII on 4 December 1829**, declaring the practice of Sati illegal and punishable as culpable homicide in the Bengal Presidency.

---

### 2. Evolution of Brahmo Samaj
* **Debendranath Tagore (1817–1905)**:
  * Founded **Tattwabodhini Sabha (1839)** to study India's past and propagate Ram Mohan's ideas; published *Tattwabodhini Patrika* (edited by Akshay Kumar Datta). Joined Brahmo Samaj in 1842.
* **Keshab Chandra Sen (1838–1884)**:
  * Joined Brahmo Samaj in 1857; made Acharya in 1862. Radicalized the movement with universalist and Christian-inspired devotionalism.
  * **First Schism (1866)**: Keshab founded the **Brahmo Samaj of India**; Debendranath's orthodox wing became the **Adi Brahmo Samaj**.
  * **Second Schism (1878)**: Keshab married his minor 13-year-old daughter to the Maharaja of Cooch Behar violating the *Native Marriage Act (Brahmo Marriage Act, 1872)* which he himself had championed. Disillusioned progressives (Ananda Mohan Bose, Sivanath Sastri, Dwarkanath Ganguly) broke away and formed the **Sadharan Brahmo Samaj (1878)**.

---

### 3. Young Bengal Movement & Henry Louis Vivian Derozio (1809–1831)
* Anglo-Indian teacher of English literature and history at Hindu College (1826–1831).
* Inspired radical free-thinking youth (**"Derozians"**) to question all orthodox traditions, caste taboos, and idol worship, drawing inspiration from the French Revolution.
* Founded the **Academic Association (1828)** and published *Hesperus* and *The Parthenon*.
* Prominent Derozians: Radhanath Sikdar (mathematician who first calculated the height of Mount Everest), Peary Chand Mitra, Ramgopal Ghosh, Dakshinaranjan Mukherjee, Krishnamohan Banerjee.

---

### 4. Pandit Ishwar Chandra Vidyasagar (1820–1891) — "Ocean of Compassion"
* Principal of Sanskrit College (1851); threw open the college to non-Brahmin students.
* **Widow Remarriage Movement**: Published exhaustive shastric treatise citing the *Parashara Samhita* proving widow remarriage was permissible in Hinduism.
* Submitted mass petition to the government that led to the enactment of the **Hindu Widows' Remarriage Act (Act XV of 1856)** on **26 July 1856** by Governor-General **Lord Canning** (drafted by Lord Dalhousie).
* First legal widow remarriage in Calcutta celebrated on **7 December 1856** between Srish Chandra Vidyaratna and Kalimati Devi.
* **Female Education**: Established over 35 model girls' schools across Bengal; Secretary of **Bethune School (founded 1849 by J.E.D. Bethune)**.
* Standardized the Bengali alphabet in **Barnaparichay (1855)**.

---

### 5. Sri Ramakrishna Paramahamsa (1836–1886) & Swami Vivekananda (1863–1902)
* **Ramakrishna**: Priest of Dakshineswar Kali Temple; preached the oneness of all religions (*"Joto Mat, Toto Path"* — As many faiths, so many ways).
* **Swami Vivekananda (Narendranath Datta)**:
  * Historic address at the **World's Parliament of Religions in Chicago (11 September 1893)**: *"Sisters and Brothers of America"*.
  * Founded **Ramakrishna Mission on 1 May 1897** at Belur Math (Howrah) with the motto *"Atmano Mokshartham Jagat Hitaya Cha"* (For one's own liberation and for the welfare of the world).
  * Synthesized ancient Advaita Vedanta with modern social action (**Practical Vedanta / Neo-Vedanta**).
  * Inspired revolutionary freedom fighters: *"Arise, awake, and stop not till the goal is reached."* Subhas Chandra Bose described Vivekananda as the *"Spiritual Father of Modern Indian Nationalism"*.

---

## 🚩 Section 2: Early Political Associations & Foundation of INC (1885)

### Pre-Congress Political Associations:
1. **Bangabhasha Prakasika Sabha (1836)**: First political association formed in Bengal by associates of Ram Mohan Roy.
2. **Landholders' Society / Zamindari Association (1838)**: Founded by Dwarkanath Tagore, Radhakanta Deb, and Prasanna Kumar Tagore to safeguard zamindari interests (First organized political body in India using constitutional agitation).
3. **British Indian Association (1851)**: Amalgamation of Landholders' Society and Bengal British India Society (Radhakanta Deb as President, Debendranath Tagore as Secretary).
4. **Indian Association (Bharat Sabha, 26 July 1876)**:
   * Founded at Albert Hall, Calcutta by **Surendranath Banerjee** and **Ananda Mohan Bose**.
   * Represented the middle-class intelligentsia; campaigned against the reduction of Civil Service age limit from 21 to 19 by Lord Lytton (1877), the Vernacular Press Act (1878), and in favor of the Ilbert Bill (1883).
   * Organized the **All-India National Conference** in Calcutta in **1883** and **1885** (precursor to INC).

---

### Foundation of the Indian National Congress (1885)
* **Founding Date**: **28 December 1885**.
* **Venue**: Gokuldas Tejpal Sanskrit College, Bombay (originally planned at Pune, but shifted due to cholera outbreak).
* **Founder & General Secretary**: **Allan Octavian Hume (A.O. Hume)**, retired British ICS officer.
* **First President**: **Womesh Chandra Bonnerjee (W.C. Bonnerjee)**.
* **Attendance**: 72 delegates from all over India (prominent attendees: Dadabhai Naoroji, Dinshaw Wacha, Pherozeshah Mehta, K.T. Telang, Badruddin Tyabji, N.G. Chandavarkar, S. Subramania Iyer). *Note: Surendranath Banerjee could not attend as he was presiding over the 2nd National Conference in Calcutta.*
* **Viceroy at Foundation**: **Lord Dufferin** (1884–1888), who initially tolerated INC but later dismissed it as representing a *"microscopic minority of the people"*.
* **Safety Valve Theory**: Put forward by Lala Lajpat Rai (*Young India*, 1916) and later R.P. Dutt (*India Today*) arguing that Hume founded the Congress as a safety valve for releasing mounting Indian discontent. Modern historians (Bipan Chandra) view Congress as the natural product of the political awakening of the Indian intelligentsia, using Hume as a "lightning conductor".

---

## ⚡ Section 3: Partition of Bengal (1905) & Swadeshi Movement

```
                              PARTITION OF BENGAL ROADMAP
  ┌───────────────────────────────────────────────────────────────────────────────────────┐
  │ 1903 (Dec) : Risley Scheme published -> Widespread public outrage across Bengal.       │
  │ 1905 (19 Jul): Lord Curzon issues formal Government Resolution for Partition of Bengal.│
  │ 1905 (7 Aug) : Historic Swadeshi & Boycott Resolution passed at Calcutta Town Hall.   │
  │ 1905 (16 Oct): Partition takes effect -> Day of Mourning, Rakhi Bandhan, Arandhan.   │
  │ 1911 (Dec)   : Partition Annulled at Delhi Durbar by Lord Hardinge II. Capital -> Delhi│
  └───────────────────────────────────────────────────────────────────────────────────────┘
```

### 1. Curzon's Administrative Subterfuge & Genuine Motive
* **Official Pretext**: Bengal Presidency ($189,000 \text{ sq. miles}$, population 78.5 million) was too unwieldy to administer efficiently by a single Lieutenant Governor.
* **Real Political Motive**: Home Secretary **H.H. Risley** noted in an official minute (1904): *"Bengal united is a power; Bengal divided will pull in different ways... One of our main objects is to split up and thereby weaken a solid body of opponents to our rule."*
* **The Division**:
  * **Eastern Bengal and Assam** (Capital: Dhaka): Included East Bengal divisions (Dhaka, Chittagong, Rajshahi), Assam, and Hill Tippera. Population: 31 million (18 million Muslims, 12 million Hindus). First Lt. Governor: **Sir Bampfylde Fuller**.
  * **Western Bengal** (Capital: Calcutta): Included West Bengal, Bihar, and Orissa. Population: 54 million (42 million Hindus, 9 million Muslims). Reduced Bengalis to a linguistic minority in their own home province (17 million Bengali speakers vs 37 million Hindi & Oriya speakers).

---

### 2. Boycott & Swadeshi Agitation
* **7 August 1905**: Mass meeting at **Calcutta Town Hall** formally passed the **Boycott Resolution**, inaugurating the Swadeshi Movement.
* **16 October 1905 (Day of Partition)**:
  * Observed as **Day of Mourning (Jatiya Shok Dibas)**.
  * **Arandhan** (no hearth was lit) observed across Bengal at the call of Ramendrasundar Trivedi.
  * **Rakhi Bandhan**: Rabindranath Tagore composed patriotic songs (including *"Banglar Mati Banglar Jol"*, *"Amar Sonar Bangla"*) and led processions tying Rakhis on wrists as a pledge of eternal brotherhood between communities.
  * Foundation of **Federation Hall (Milan Mandir)** laid by veteran leader Ananda Mohan Bose.
* **Fourfold Program**: Boycott of foreign cloth/salt, promotion of indigenous (Swadeshi) goods, National Education, and setting up Arbitration Courts (Samitis).
* **Swadeshi Enterprises**:
  * Acharya Prafulla Chandra Ray founded **Bengal Chemicals & Pharmaceuticals Works** (1901).
  * V.O. Chidambaram Pillai founded **Swadeshi Steam Navigation Company** in Tuticorin (Tamil Nadu).
  * Banga Lakshmi Cotton Mill established in Serampore (1906).
* **National Education Movement**:
  * **Dawn Society (1902)**: Founded by **Satish Chandra Mukherjee**; played a central role in promoting nationalist education.
  * **National Council of Education (NCE)** established on **15 August 1906**. Set up the **Bengal National College** with **Aurobindo Ghosh** as its first Principal. (Later evolved into Jadavpur University).
  * **Bengal Technical Institute** established (1906) funded by Taraknath Palit.

---

### 3. Spread of the Movement Outside Bengal
* **Punjab**: Lala Lajpat Rai and Sardar Ajit Singh (founded *Anjuman-i-Mohisban-i-Watan* and journal *Bharat Mata*).
* **Maharashtra / Bombay**: Bal Gangadhar Tilak (propagated movement through Ganapati and Shivaji Festivals; coined *"Swaraj is my birthright and I shall have it"*).
* **Delhi**: Syed Haider Raza.
* **Madras**: V.O. Chidambaram Pillai and Subramania Bharati.

---

## 💣 Section 4: Revolutionary Terrorism & Armed Resistance in Bengal

When constitutional agitation and passive resistance faced brutal British police repression (Carlyle Circular, ban on slogans, lathi charges at Barisal Conference 1906), the youth turned to secret revolutionary societies and armed struggle.

### 1. Anushilan Samiti & Jugantar
* **Anushilan Samiti (Calcutta, 24 March 1902)**:
  * Founded on Dolyatra day by **Pramathanath Mitra (P. Mitra)**, Jatindranath Banerjee (Niralamba Swami), and **Barindra Kumar Ghosh**.
  * Patronized by Sister Nivedita, Chittaranjan Das, and Surendranath Tagore.
  * Headquarters at 49 Cornwallis Street, Calcutta.
* **Dhaka Anushilan Samiti (November 1905)**:
  * Founded by **Pulin Behari Das**; established over 500 branches throughout East Bengal.
* **Jugantar (1906)**:
  * Inner revolutionary circle of Anushilan Samiti led by **Barindra Kumar Ghosh**, **Bhupendranath Datta** (brother of Swami Vivekananda), and **Abinash Bhattacharya**.
  * Published the fiery weekly newspaper *Jugantar* (*"Force must be stopped by force"*).

---

### 2. Major Revolutionary Events & Martyrdoms

| Event / Conspiracy Case | Year & Date | Key Revolutionaries Involved | Full Historical Details & Outcome |
| :--- | :--- | :--- | :--- |
| **Muzaffarpur Bomb Outrage** | **30 April 1908** | **Khudiram Bose** (aged 18) & **Prafulla Chaki** | Bomb thrown at carriage carrying Mrs. & Miss Kennedy (mistaken for notorious Magistrate Douglas Kingsford). Prafulla Chaki shot himself at Mokama Ghat railway station; **Khudiram Bose was hanged on 11 August 1908** at Muzaffarpur Jail. |
| **Alipore Bomb Conspiracy Case** | **May 1908 – May 1909** | **Aurobindo Ghosh**, Barindra Ghosh, Ullaskar Dutta, Satyendranath Bose, Kanailal Dutta | Police raided Muraripukur garden house in Manicktala. **Narendra Nath Goswami** turned approver (crown witness); shot dead inside Presidency Jail hospital by **Kanailal Dutta & Satyendranath Bose** (both hanged). **Chittaranjan Das** defended Aurobindo Ghosh brilliantly, leading to his honorable acquittal. (Aurobindo subsequently retired to Pondicherry for spiritual pursuit). |
| **Howrah-Sibpur Conspiracy Case** | **1910** | **Bagha Jatin (Jatindranath Mukherjee)** | Assassination of DSP Shamsul Alam outside Calcutta High Court. |
| **Battle of Buribalam** | **9 September 1915** | **Bagha Jatin**, Chittapriya Ray Chaudhuri, Manoranjan Sengupta, Niren Dasgupta, Jyotish Pal | Part of the **German Plot (Hindu-German Conspiracy / Zimmermann Plan)** during WWI to smuggle arms on ship *SS Maverick* to Balasore coast (Odisha). Trench gunfight against heavily armed British force on the banks of Buribalam river. Bagha Jatin martyred on **10 September 1915** at Balasore Hospital. |
| **Chittagong Armoury Raid** | **18 April 1930** | **Masterda Surya Sen**, Ananta Singh, Ganesh Ghosh, Lokenath Bal, Ambika Chakraborty, Nirmal Sen, **Pritilata Waddedar**, Kalpana Datta | Raided British Police Armoury, Auxiliary Force Armoury, and telegraph office; declared the **Provisional Revolutionary Government of Free India**. **Battle of Jalalabad Hill (22 April 1930)**: 12 revolutionaries martyred. Attack on Pahartali European Club (24 Sept 1932) led by **Pritilata Waddedar** (consumed cyanide to avoid capture). **Surya Sen and Tarakeswar Dastidar hanged on 12 January 1934** in Chittagong Jail after horrific torture. |
| **Writers' Building Operation (Corridor Warfare)** | **8 December 1930** | **Benoy Basu**, **Badal Gupta**, **Dinesh Gupta** (Benoy-Badal-Dinesh / B.B.D.) | Dressed in European attire, entered Writers' Building (Calcutta) and shot dead **Col. N.S. Simpson** (IG of Prisons, notorious for brutalizing political prisoners). Badal consumed Potassium Cyanide on spot; Benoy and Dinesh shot themselves. Benoy died in hospital on 13 Dec 1930; **Dinesh Gupta was hanged on 7 July 1931** at Alipore Jail. (Dalhousie Square renamed **B.B.D. Bagh**). |

---

## 🕊️ Section 5: The Gandhian Era (1915–1947)

```
                              GANDHIAN MASS MOVEMENTS ROADMAP
  ┌───────────────────────────────────────────────────────────────────────────────────────┐
  │ 1917: Champaran Satyagraha (1st Civil Disobedience) -> Indigo Tinkathia abolished.    │
  │ 1918: Ahmedabad Mill Strike (1st Hunger Strike) -> 35% wage hike.                    │
  │ 1918: Kheda Satyagraha (1st Non-Cooperation) -> Remission of land revenue.            │
  │ 1919: Rowlatt Satyagraha & Jallianwala Bagh Massacre (13 April 1919).                 │
  │ 1920–1922: Non-Cooperation Movement -> Suspended post Chauri Chaura (Feb 1922).       │
  │ 1930–1934: Civil Disobedience Movement -> Dandi March (12 Mar - 6 Apr 1930).          │
  │ 1942: Quit India Movement ("Do or Die") -> Historic mass uprising across India.      │
  └───────────────────────────────────────────────────────────────────────────────────────┘
```

### 1. Gandhi's Early Satyagrahas in India
* Returned from South Africa on **9 January 1915** (*Pravasi Bharatiya Divas*). Political Guru: **Gopal Krishna Gokhale**.
* **Champaran Satyagraha (1917, Bihar)**:
  * First Civil Disobedience in India. Invited by **Rajkumar Shukla** to investigate atrocities of European indigo planters under the **Tinkathia system** ($\frac{3}{20}\text{th}$ of land compulsory indigo cultivation).
  * Government appointed an inquiry committee with Gandhi as member; Tinkathia system abolished and planters refunded 25% of illegally extorted money.
  * Rabindranath Tagore conferred the title **"Mahatma"** upon Gandhi during this movement.
* **Ahmedabad Mill Strike (March 1918, Gujarat)**:
  * First **Hunger Strike** by Gandhi. Dispute over discontinuation of **Plague Bonus**. Mill owners offered 20%; workers demanded 50%. Gandhi intervened; workers awarded **35% wage increase**.
* **Kheda Satyagraha (March 1918, Gujarat)**:
  * First **Non-Cooperation**. Crops failed due to drought; revenue code stated if yield was $< \frac{1}{4}\text{th}$ of normal, farmers were entitled to full remission. British authorities refused. Gandhi and **Sardar Vallabhbhai Patel** organized peasant non-cooperation; government issued secret instructions to collect revenue only from those who could pay.

---

### 2. The Non-Cooperation Movement (1920–1922)
* **Causes**: Rowlatt Act (1919) ("No Dalil, No Vakil, No Appeal"), Jallianwala Bagh Massacre (13 April 1919, General Dyer), Hunter Committee whitewash, Khilafat Movement (All Brothers: Shaukat Ali & Mohammad Ali).
* **Launch**: Formal launch on **1 August 1920** (tragically the day **Lokmanya Bal Gangadhar Tilak passed away**). Gandhi surrendered his *Kaisar-i-Hind* medal.
* **Calcutta Special Session (September 1920)**: Presided over by Lala Lajpat Rai; approved NCM program.
* **Nagpur Session (December 1920)**: Presided over by C. Vijayaraghavachariar; ratified NCM resolution and reorganized Congress on linguistic basis with working committee of 15 members.
* **Chauri Chaura Incident & Suspension**:
  * On **4 February 1922** (Chauri Chaura, Gorakhpur, UP), an agitated crowd of peasants clashed with police and set the police station on fire, killing 22 policemen.
  * Gandhi immediately called off the movement on **12 February 1922** at the Congress Working Committee meeting in **Bardoli (Gujarat)**, stating the country was not yet ready for non-violent mass struggle.

---

### 3. Civil Disobedience Movement & Round Table Conferences (1930–1934)
* **Lahore Congress (December 1929)**:
  * Presided over by **Jawaharlal Nehru**. Passed the historic **Poorna Swaraj (Complete Independence)** resolution.
  * Tricolor flag unfurled on the banks of River Ravi on midnight of 31 December 1929.
  * **26 January 1930** observed as the first **Independence Day** of India.
* **The Dandi March (Salt Satyagraha)**:
  * Gandhi presented his **11-point ultimatum** to Viceroy Lord Irwin. Irwin ignored it.
  * On **12 March 1930**, Gandhi along with 78 chosen ashramites began the historic 240-mile march from **Sabarmati Ashram to Dandi** coast.
  * Reached Dandi on **5 April 1930**; picked up a handful of salt on morning of **6 April 1930**, formally breaking the Salt Law and launching the Civil Disobedience Movement.
  * **Dharasana Salt Works Raid (May 1930)**: Led by Sarojini Naidu, Imam Saheb, and Manilal Gandhi; peaceful satyagrahis faced brutal lathi charges reported worldwide by American journalist Webb Miller.
* **Gandhi-Irwin Pact (Delhi Pact, 5 March 1931)**:
  * Signed between Mahatma Gandhi and Viceroy Lord Irwin.
  * Congress agreed to suspend CDM and participate in the **2nd Round Table Conference** in London.
  * Government agreed to release all political prisoners not convicted of violence. (Controversy: Failure to secure commutation of death sentences of Bhagat Singh, Rajguru, and Sukhdev, who were executed on 23 March 1931).
* **Poona Pact (24 September 1932)**:
  * British PM Ramsay MacDonald announced the **Communal Award (16 August 1932)** granting separate electorates for Depressed Classes (Dalits).
  * Gandhi began a fast unto death in **Yerwada Central Jail (Poona)**.
  * Historic agreement negotiated between **Dr. B.R. Ambedkar** and **Pandit Madan Mohan Malaviya** (on behalf of Gandhi).
  * **Terms**: Abandoned separate electorates; increased reserved seats for Depressed Classes in provincial legislatures from 71 to **147 seats**, and 18% in the Central Legislature.

---

## ⚡ Section 6: Netaji Subhas Chandra Bose & The Indian National Army (INA)

```
                            NETAJI & INA CHRONOLOGY
  ┌───────────────────────────────────────────────────────────────────────────────────────┐
  │ 1938: President of Haripura Congress -> National Planning Committee established.     │
  │ 1939: Re-elected President at Tripuri -> Resigned & formed All India Forward Bloc.   │
  │ 1941 (17 Jan): The Great Escape (Mahanishkraman) from Elgin Road house to Berlin.     │
  │ 1943 (21 Oct): Supreme Commander of INA & proclaimed Azad Hind Sarkar in Singapore. │
  │ 1944 (Apr): INA unfurls Tricolor on Indian soil at Moirang (Manipur).                │
  └───────────────────────────────────────────────────────────────────────────────────────┘
```

### 1. Subhas Chandra Bose in Congress & The Forward Bloc
* Ranked 4th in the prestigious ICS Examination in London (1920); resigned in 1921 to join the freedom movement. Political Mentor: **Deshbandhu Chittaranjan Das (C.R. Das)**.
* **Haripura Session (1938, Gujarat)**: Elected Congress President unanimously. Set up the **National Planning Committee** with Jawaharlal Nehru as Chairman.
* **Tripuri Session (1939, MP)**: Contested presidential election against Gandhi's nominee **Dr. Pattabhi Sitaramayya**; defeated him by 1580 to 1377 votes. Gandhi declared: *"Pattabhi's defeat is my defeat."*
* Due to internal obstruction by the Old Guard over the Govind Ballabh Pant resolution, Netaji resigned on **29 April 1939** (Dr. Rajendra Prasad elected interim President).
* Founded the **All India Forward Bloc** on **3 May 1939** at Unnao (UP) / Makur (Bengal) as a radical socialist wing within the anti-imperialist struggle.

---

### 2. The Great Escape (Mahanishkraman, 17 January 1941)
* Put under house arrest by British police at his 38/2 Elgin Road residence in Calcutta.
* Disguised as an insurance agent named **"Ziauddin"**, escaped at midnight in a Wanderer car (driven by his nephew Sisir Kumar Bose) to Gomoh railway station (Bihar/Jharkhand).
* Traveled via Peshawar, Kabul, Moscow (under Italian passport as *Count Orlando Mazzotta*) and reached **Berlin (Germany)** in April 1941.
* In Germany: Formed the **Free India Centre**; established the **Indian Legion (Azad Hind Fauj)**; started regular broadcasts on **Azad Hind Radio**. The title **"Netaji"** and greeting **"Jai Hind"** were first coined by Indian soldiers and expatriates in Germany.

---

### 3. Indian National Army (Azad Hind Fauj) & Azad Hind Sarkar
* **Origin**: INA was first conceived by **Captain Mohan Singh** (officer of British Indian Army) in Malaya in 1942 with Japanese Major Iwaichi Fujiwara and **Rash Behari Bose** (President of Indian Independence League).
* **Netaji Takes Command**: Arrived in Singapore on a 90-day perilous submarine journey (German U-180 to Japanese I-29). On **4 July 1943**, Rash Behari Bose handed over leadership of the Indian Independence League and INA to Netaji.
* **Provisional Government of Free India (Azad Hind Sarkar)**:
  * Proclaimed on **21 October 1943** in Singapore. Recognized by 9 sovereign nations (including Japan, Germany, Italy, Burma, Thailand, Philippines, Croatia, Manchuria, National Government of China).
  * **Headquarters**: Singapore; shifted to Rangoon (Burma) in January 1944.
  * **National Anthem**: *"Sab Sukh Chain Ki Barkha Barse"* (composed by Mumtaz Hussain, melody by Capt. Ram Singh Thakuri).
  * **Regiments**: Gandhi Brigade, Nehru Brigade, Azad Brigade, Subhas Brigade, and the pioneering all-women **Rani of Jhansi Regiment** (commanded by **Captain Lakshmi Swaminathan / Sahgal**).
* **Andaman & Nicobar Islands**: Handed over to Azad Hind Sarkar by Japan in Nov 1943; renamed **Shaheed Dweep (Andaman)** and **Swaraj Dweep (Nicobar)**.
* **Imphal & Kohima Campaign (1944)**: INA crossed the Indo-Burma border. On **14 April 1944**, Colonel Shaukat Malik hoisted the INA Tricolor on Indian soil at **Moirang (Manipur)**.
* **Historic Red Fort Trials (November 1945)**:
  * British military court-martialed INA officers **Col. Prem Kumar Sahgal, Col. Gurbaksh Singh Dhillon, and Major General Shah Nawaz Khan** together at the Red Fort (Delhi).
  * Defense committee led by **Bhulabhai Desai**, Tej Bahadur Sapru, Kailash Nath Katju, Asaf Ali, and Jawaharlal Nehru.
  * Massive countrywide public protests forced Commander-in-Chief Claude Auchinleck to remit their prison sentences.
* **Royal Indian Navy (RIN) Mutiny (18 February 1946)**: Ratings of *HMIS Talwar* went on strike in Bombay, raising Congress, Muslim League, and Communist flags. Final blow to the military foundations of British rule in India.
    `
  }
];

// Insert updated notes
const insertExpStmt = db.prepare(`
  INSERT OR REPLACE INTO study_notes (
    id, subject_id, chapter_id, title, title_bn, exam_coverage, read_time_mins, summary, content_markdown, is_premium, views_count
  ) VALUES (
    @id, @subject_id, @chapter_id, @title, @title_bn, @exam_coverage, @read_time_mins, @summary, @content_markdown, @is_premium, @views_count
  )
`);

let expCount = 0;
const expTrans = db.transaction(() => {
  for (const n of expandedNotes) {
    insertExpStmt.run({
      chapter_id: null,
      title_bn: null,
      is_premium: 0,
      views_count: 640,
      ...n
    });
    expCount++;
  }
});

expTrans();
console.log(`✅ Successfully updated ${expCount} exhaustive notes!`);
