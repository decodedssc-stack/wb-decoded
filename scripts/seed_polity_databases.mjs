import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'wb_decoded.sqlite');
const db = new Database(dbPath);

console.log('🏛️ SEEDING CONSTITUTIONAL ARTICLES, AMENDMENTS, CASE LAWS & 160+ MCQS...');

// Clean existing records
db.prepare('DELETE FROM polity_articles').run();
db.prepare('DELETE FROM polity_amendments').run();
db.prepare('DELETE FROM polity_cases').run();
db.prepare('DELETE FROM polity_mcqs').run();

// 1. SEED ARTICLES
const insertArticle = db.prepare(`
  INSERT INTO polity_articles (id, article_num, part_num, title, provision, key_point, exam_priority, related_chapter_slug)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const ARTICLES = [
  { num: 'Article 1', part: 'Part I', title: 'Name and territory of the Union', prov: 'India, that is Bharat, shall be a Union of States.', key: 'Indestructible Union of destructible States', prio: 'VERY HIGH', slug: 'union-and-its-territory' },
  { num: 'Article 2', part: 'Part I', title: 'Admission or establishment of new States', prov: 'Parliament may by law admit into the Union, or establish, new States.', key: 'Applies to territories outside India (e.g. Sikkim)', prio: 'HIGH', slug: 'union-and-its-territory' },
  { num: 'Article 3', part: 'Part I', title: 'Formation of new States & alteration of areas', prov: 'Parliament can alter boundaries, increase/diminish area, or change names of states by simple majority.', key: 'Prior recommendation of President mandatory', prio: 'VERY HIGH', slug: 'union-and-its-territory' },
  { num: 'Article 5', part: 'Part II', title: 'Citizenship at commencement of Constitution', prov: 'Citizenship by domicile at the date of commencement (Jan 26, 1950).', key: 'Domicile + Birth/Parent/5-year residence', prio: 'HIGH', slug: 'citizenship' },
  { num: 'Article 9', part: 'Part II', title: 'Termination of citizenship on foreign citizenship', prov: 'No person shall be a citizen of India if he has voluntarily acquired foreign citizenship.', key: 'Single Citizenship principle', prio: 'VERY HIGH', slug: 'citizenship' },
  { num: 'Article 11', part: 'Part II', title: 'Parliament to regulate citizenship by law', prov: 'Parliament has plenary power to make provision with respect to acquisition and termination of citizenship.', key: 'Led to Citizenship Act 1955 & CAA 2019', prio: 'VERY HIGH', slug: 'citizenship' },
  { num: 'Article 12', part: 'Part III', title: 'Definition of State', prov: 'Includes Union/State Government, Parliament/Legislatures, and all local or other statutory authorities.', key: 'Claims under Part III are against the State', prio: 'VERY HIGH', slug: 'fundamental-rights' },
  { num: 'Article 13', part: 'Part III', title: 'Laws inconsistent with Fundamental Rights', prov: 'All laws violating Fundamental Rights shall be void to the extent of inconsistency.', key: 'Constitutional basis for Judicial Review', prio: 'VERY HIGH', slug: 'fundamental-rights' },
  { num: 'Article 14', part: 'Part III', title: 'Equality before Law', prov: 'State shall not deny to any person equality before the law or equal protection of the laws.', key: 'Prohibits arbitrariness; allows reasonable classification', prio: 'VERY HIGH', slug: 'fundamental-rights' },
  { num: 'Article 15', part: 'Part III', title: 'Prohibition of discrimination', prov: 'No discrimination on grounds ONLY of religion, race, caste, sex, place of birth.', key: 'Art 15(6) added 10% EWS quota (103rd Amend)', prio: 'VERY HIGH', slug: 'fundamental-rights' },
  { num: 'Article 16', part: 'Part III', title: 'Equality of opportunity in public employment', prov: 'Equal opportunity in matters of state employment.', key: 'Mandal case cap of 50% reservation pertained to 16(4)', prio: 'VERY HIGH', slug: 'fundamental-rights' },
  { num: 'Article 17', part: 'Part III', title: 'Abolition of Untouchability', prov: 'Untouchability is abolished and its practice in any form is forbidden.', key: 'Absolute right with zero exceptions', prio: 'VERY HIGH', slug: 'fundamental-rights' },
  { num: 'Article 18', part: 'Part III', title: 'Abolition of Titles', prov: 'No title (not being a military or academic distinction) shall be conferred by the State.', key: 'Bharat Ratna/Padma awards are not titles', prio: 'HIGH', slug: 'fundamental-rights' },
  { num: 'Article 19', part: 'Part III', title: 'Protection of 6 Democratic Freedoms', prov: 'Speech, peaceful assembly, association, free movement, residence, and profession.', key: 'Available to citizens only; property deleted by 44th Amend', prio: 'VERY HIGH', slug: 'fundamental-rights' },
  { num: 'Article 20', part: 'Part III', title: 'Protection in respect of conviction for offences', prov: 'No ex-post-facto law, no double jeopardy, no self-incrimination.', key: 'Cannot be suspended during Emergency (44th Amend)', prio: 'VERY HIGH', slug: 'fundamental-rights' },
  { num: 'Article 21', part: 'Part III', title: 'Protection of Life and Personal Liberty', prov: 'No person deprived of life or liberty except according to procedure established by law.', key: 'Maneka Gandhi expanded to Due Process & Privacy', prio: 'VERY HIGH', slug: 'fundamental-rights' },
  { num: 'Article 21A', part: 'Part III', title: 'Right to Education', prov: 'Free and compulsory education to all children aged 6 to 14 years.', key: 'Added by 86th Constitutional Amendment 2002', prio: 'VERY HIGH', slug: 'fundamental-rights' },
  { num: 'Article 22', part: 'Part III', title: 'Protection against arrest and detention', prov: 'Rights of arrested persons & safeguards against preventive detention.', key: 'Max 3 months preventive detention without Advisory Board', prio: 'HIGH', slug: 'fundamental-rights' },
  { num: 'Article 23', part: 'Part III', title: 'Prohibition of traffic in human beings and begar', prov: 'Prohibits forced labor, begar, and human trafficking.', key: 'Enforceable against both state and private individuals', prio: 'HIGH', slug: 'fundamental-rights' },
  { num: 'Article 24', part: 'Part III', title: 'Prohibition of child labor in factories', prov: 'No child below age of 14 years employed in factory, mine or hazardous work.', key: 'Absolute prohibition for under 14', prio: 'VERY HIGH', slug: 'fundamental-rights' },
  { num: 'Article 25', part: 'Part III', title: 'Freedom of conscience & free profession of religion', prov: 'All persons entitled to freedom of conscience and right to freely profess, practice and propagate religion.', key: 'Subject to public order, morality, and health', prio: 'VERY HIGH', slug: 'fundamental-rights' },
  { num: 'Article 32', part: 'Part III', title: 'Remedies for enforcement of Fundamental Rights', prov: 'Right to move Supreme Court for 5 Writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto).', key: 'Dr. Ambedkar: Heart and Soul of Constitution', prio: 'VERY HIGH', slug: 'fundamental-rights' },
  { num: 'Article 38', part: 'Part IV', title: 'State to secure a social order for welfare of people', prov: 'Promote welfare by securing social, economic and political justice.', key: 'Direct mandate to establish a Welfare State', prio: 'HIGH', slug: 'dpsp-and-fundamental-duties' },
  { num: 'Article 39A', part: 'Part IV', title: 'Equal justice and free legal aid', prov: 'Provide free legal aid to ensure justice is not denied by economic disability.', key: 'Added by 42nd Amendment 1976; led to NALSA', prio: 'VERY HIGH', slug: 'dpsp-and-fundamental-duties' },
  { num: 'Article 40', part: 'Part IV', title: 'Organisation of Village Panchayats', prov: 'State shall take steps to organize village panchayats as units of self-government.', key: 'Gandhian Principle; fulfilled by 73rd Amendment', prio: 'VERY HIGH', slug: 'panchayati-raj-and-local-government' },
  { num: 'Article 44', part: 'Part IV', title: 'Uniform Civil Code (UCC)', prov: 'State shall endeavour to secure for citizens a Uniform Civil Code throughout India.', key: 'Liberal-Intellectual Principle; Uttarakhand first state', prio: 'VERY HIGH', slug: 'dpsp-and-fundamental-duties' },
  { num: 'Article 45', part: 'Part IV', title: 'Provision for early childhood care and education', prov: 'Care and education for children below the age of 6 years.', key: 'Amended by 86th Amendment 2002', prio: 'HIGH', slug: 'dpsp-and-fundamental-duties' },
  { num: 'Article 48A', part: 'Part IV', title: 'Protection of environment, forests and wildlife', prov: 'Protect and improve environment and safeguard forests and wildlife.', key: 'Added by 42nd Amendment Act 1976', prio: 'VERY HIGH', slug: 'dpsp-and-fundamental-duties' },
  { num: 'Article 50', part: 'Part IV', title: 'Separation of Judiciary from Executive', prov: 'State shall take steps to separate judiciary from executive in public services.', key: 'Crucial pillar of judicial independence', prio: 'VERY HIGH', slug: 'dpsp-and-fundamental-duties' },
  { num: 'Article 51', part: 'Part IV', title: 'Promotion of international peace and security', prov: 'Foster respect for international law and treaty obligations.', key: 'Basis of India foreign policy and Panchsheel', prio: 'HIGH', slug: 'dpsp-and-fundamental-duties' },
  { num: 'Article 51A', part: 'Part IVA', title: 'Fundamental Duties', prov: '11 Fundamental Duties prescribed for every citizen of India.', key: 'Added by 42nd Amend 1976 (10 duties) & 86th Amend (11th)', prio: 'VERY HIGH', slug: 'dpsp-and-fundamental-duties' },
  { num: 'Article 52', part: 'Part V', title: 'The President of India', prov: 'There shall be a President of India.', key: 'Head of State; First Citizen of India', prio: 'VERY HIGH', slug: 'the-president-of-india' },
  { num: 'Article 54', part: 'Part V', title: 'Election of President', prov: 'Elected by Electoral College (Elected MPs + Elected MLAs).', key: 'Nominated members & MLCs do not participate', prio: 'VERY HIGH', slug: 'the-president-of-india' },
  { num: 'Article 61', part: 'Part V', title: 'Procedure for impeachment of the President', prov: 'Removal for Violation of the Constitution by 2/3rd majority of total membership.', key: 'Requires 14 days notice and 1/4th members signature', prio: 'VERY HIGH', slug: 'the-president-of-india' },
  { num: 'Article 72', part: 'Part V', title: 'Pardoning powers of the President', prov: 'Pardon, commute, remit, respite, or suspend sentences including Death Penalty.', key: 'Pardons court-martial and death sentences', prio: 'VERY HIGH', slug: 'the-president-of-india' },
  { num: 'Article 74', part: 'Part V', title: 'Council of Ministers to aid and advise President', prov: 'President shall act in accordance with advice of Council of Ministers headed by PM.', key: 'President may send back advice for reconsideration once (44th Amend)', prio: 'VERY HIGH', slug: 'prime-minister-and-council-of-ministers' },
  { num: 'Article 75', part: 'Part V', title: 'Appointment & responsibility of Ministers', prov: 'PM appointed by President; CoM collectively responsible to Lok Sabha.', key: 'Max 15% size limit per 91st Amendment 2003', prio: 'VERY HIGH', slug: 'prime-minister-and-council-of-ministers' },
  { num: 'Article 76', part: 'Part V', title: 'Attorney-General for India', prov: 'Highest law officer of India appointed by President.', key: 'Qualified to be SC Judge; holds office during pleasure', prio: 'VERY HIGH', slug: 'attorney-general-and-advocate-general' },
  { num: 'Article 80', part: 'Part V', title: 'Composition of the Council of States (Rajya Sabha)', prov: 'Max 250 members (238 elected + 12 nominated by President).', key: 'Permanent chamber; 1/3rd retire every 2 years', prio: 'VERY HIGH', slug: 'the-parliament-of-india' },
  { num: 'Article 108', part: 'Part V', title: 'Joint Sitting of both Houses in certain cases', prov: 'President summons joint sitting in case of deadlock on ordinary bills.', key: 'Presided by Speaker of Lok Sabha; simple majority', prio: 'VERY HIGH', slug: 'the-parliament-of-india' },
  { num: 'Article 110', part: 'Part V', title: 'Definition of "Money Bills"', prov: 'Bills dealing with taxation, borrowings, Consolidated Fund.', key: 'Speaker certificate is final; Rajya Sabha max 14 days delay', prio: 'VERY HIGH', slug: 'the-parliament-of-india' },
  { num: 'Article 112', part: 'Part V', title: 'Annual Financial Statement (Budget)', prov: 'Statement of estimated receipts and expenditure of GoI for the financial year.', key: 'Word "Budget" is nowhere used in Constitution', prio: 'VERY HIGH', slug: 'the-parliament-of-india' },
  { num: 'Article 123', part: 'Part V', title: 'Ordinance-making power of President', prov: 'President can promulgate ordinances during recess of Parliament.', key: 'Valid for max 6 months + 6 weeks without approval', prio: 'VERY HIGH', slug: 'the-president-of-india' },
  { num: 'Article 124', part: 'Part V', title: 'Establishment and Constitution of Supreme Court', prov: 'Supreme Court with CJI and other Judges appointed by President.', key: 'Retirement age 65; Collegium system', prio: 'VERY HIGH', slug: 'supreme-court-of-india' },
  { num: 'Article 129', part: 'Part V', title: 'Supreme Court to be a Court of Record', prov: 'Power to punish for contempt of itself.', key: 'Evidentiary value across all courts', prio: 'HIGH', slug: 'supreme-court-of-india' },
  { num: 'Article 131', part: 'Part V', title: 'Original Jurisdiction of Supreme Court', prov: 'Exclusive jurisdiction for federal disputes (Centre vs States or Inter-State).', key: 'Direct approach to SC in first instance', prio: 'VERY HIGH', slug: 'supreme-court-of-india' },
  { num: 'Article 136', part: 'Part V', title: 'Special Leave Petition (SLP)', prov: 'Discretionary power of SC to grant special leave to appeal against any court/tribunal.', key: 'Plenary and extraordinary power', prio: 'VERY HIGH', slug: 'supreme-court-of-india' },
  { num: 'Article 142', part: 'Part V', title: 'Enforcement of decrees of SC & Complete Justice', prov: 'SC may pass any order necessary for doing complete justice in any cause.', key: 'Used in Ayodhya, Bhopal gas, and Article 370 cases', prio: 'VERY HIGH', slug: 'supreme-court-of-india' },
  { num: 'Article 143', part: 'Part V', title: 'Advisory Jurisdiction of Supreme Court', prov: 'President can refer question of law or fact of public importance for SC opinion.', key: 'Opinion is non-binding and purely advisory', prio: 'VERY HIGH', slug: 'supreme-court-of-india' },
  { num: 'Article 153', part: 'Part VI', title: 'Governors of States', prov: 'There shall be a Governor for each State (7th Amend allows 1 for 2+ states).', key: 'Executive Head of State; appointed by President', prio: 'VERY HIGH', slug: 'governor-and-state-executive' },
  { num: 'Article 163', part: 'Part VI', title: 'Council of Ministers to aid and advise Governor', prov: 'Governor acts on advice except in matters left to his constitutional discretion.', key: 'Governor has wider constitutional discretion than President', prio: 'VERY HIGH', slug: 'governor-and-state-executive' },
  { num: 'Article 165', part: 'Part VI', title: 'Advocate-General for the State', prov: 'Highest law officer of the State appointed by Governor.', key: 'Qualified to be HC Judge; takes part in Assembly without vote', prio: 'VERY HIGH', slug: 'attorney-general-and-advocate-general' },
  { num: 'Article 213', part: 'Part VI', title: 'Ordinance-making power of Governor', prov: 'Promulgate ordinances when State Legislature is not in session.', key: 'Expires 6 weeks after reassembly', prio: 'VERY HIGH', slug: 'governor-and-state-executive' },
  { num: 'Article 214', part: 'Part VI', title: 'High Courts for States', prov: 'There shall be a High Court for each State (Art 231 allows common HC).', key: 'Oldest: Calcutta HC (1862); Total: 25 HCs', prio: 'VERY HIGH', slug: 'high-courts-and-subordinate-judiciary' },
  { num: 'Article 226', part: 'Part VI', title: 'Writ Jurisdiction of High Courts', prov: 'High Courts can issue writs for Fundamental Rights AND ordinary legal rights.', key: 'Wider scope than Article 32 of Supreme Court', prio: 'VERY HIGH', slug: 'high-courts-and-subordinate-judiciary' },
  { num: 'Article 243', part: 'Part IX', title: 'Panchayats Definitions & Provisions', prov: 'Articles 243 to 243-O govern the 3-Tier Panchayati Raj System.', key: 'Added by 73rd Constitutional Amendment 1992', prio: 'VERY HIGH', slug: 'panchayati-raj-and-local-government' },
  { num: 'Article 243D', part: 'Part IX', title: 'Reservation of seats in Panchayats', prov: 'Mandatory reservation for SC/ST and minimum 1/3rd (33.3%) seats for Women.', key: 'Many states (WB, Bihar) have 50% women reservation', prio: 'VERY HIGH', slug: 'panchayati-raj-and-local-government' },
  { num: 'Article 243K', part: 'Part IX', title: 'Elections to the Panchayats', prov: 'State Election Commission conducts and supervises local elections.', key: 'State Election Commissioner appointed by Governor', prio: 'VERY HIGH', slug: 'panchayati-raj-and-local-government' },
  { num: 'Article 352', part: 'Part XVIII', title: 'Proclamation of National Emergency', prov: 'President proclaims emergency on grounds of War, External Aggression, or Armed Rebellion.', key: 'Requires written recommendation of Union Cabinet', prio: 'VERY HIGH', slug: 'the-president-of-india' },
  { num: 'Article 356', part: 'Part XVIII', title: 'Provisions in case of failure of constitutional machinery in States (President Rule)', prov: 'Imposition of President Rule on report of Governor or otherwise.', key: 'SR Bommai case made it subject to judicial review', prio: 'VERY HIGH', slug: 'governor-and-state-executive' },
  { num: 'Article 360', part: 'Part XVIII', title: 'Provisions as to Financial Emergency', prov: 'President can proclaim if financial stability/credit of India is threatened.', key: 'Never declared in India so far', prio: 'VERY HIGH', slug: 'the-president-of-india' },
  { num: 'Article 368', part: 'Part XX', title: 'Power of Parliament to amend the Constitution', prov: 'Amendment by Special Majority or Special Majority with ratification by half of states.', key: 'Subject to Basic Structure doctrine (Kesavananda)', prio: 'VERY HIGH', slug: 'making-of-the-constitution' }
];

let artCount = 0;
for (const a of ARTICLES) {
  insertArticle.run('art_' + (++artCount), a.num, a.part, a.title, a.prov, a.key, a.prio, a.slug);
}
console.log(`✅ Seeded ${artCount} Constitutional Articles.`);

// 2. SEED AMENDMENTS
const insertAmendment = db.prepare(`
  INSERT INTO polity_amendments (id, amendment_num, year, title, major_change, related_articles, exam_importance)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const AMENDMENTS = [
  { num: '1st Amendment', year: 1951, title: 'Creation of 9th Schedule & Reasonable Restrictions', change: 'Added 9th Schedule to protect land reform laws from judicial review; placed reasonable restrictions on freedom of speech (Art 19(2)).', arts: 'Articles 15, 19, 31A, 31B, 9th Schedule', imp: 'VERY HIGH' },
  { num: '7th Amendment', year: 1956, title: 'State Reorganisation Act Implementation', change: 'Abolished Part A, B, C, D states and introduced 14 States & 6 UTs; allowed 1 Governor for 2+ states; common High Courts.', arts: 'Articles 1, 153, 231, 1st Schedule', imp: 'VERY HIGH' },
  { num: '24th Amendment', year: 1971, title: 'Parliament Power to Amend Fundamental Rights', change: 'Affirmed power of Parliament to amend any part of Constitution including Part III; made Presidential assent to Art 368 bills obligatory.', arts: 'Articles 13, 368', imp: 'HIGH' },
  { num: '42nd Amendment', year: 1976, title: 'Mini-Constitution Act', change: 'Added "Socialist, Secular, Integrity" to Preamble; added Part IVA (Fundamental Duties); added Part XIV-A (Tribunals); froze Lok Sabha seats till 2000.', arts: 'Preamble, Articles 39A, 43A, 48A, 51A, 323A', imp: 'VERY HIGH' },
  { num: '44th Amendment', year: 1978, title: 'Post-Emergency Safeguards Restoration', change: 'Deleted Right to Property from Part III (made legal right Art 300A); replaced "Internal Disturbance" with "Armed Rebellion" in Art 352; protected Arts 20 & 21 during Emergency.', arts: 'Articles 19, 31, 300A, 352, 358, 359', imp: 'VERY HIGH' },
  { num: '52nd Amendment', year: 1985, title: 'Anti-Defection Law', change: 'Added 10th Schedule disqualifying MPs and MLAs on grounds of political defection from their party.', arts: 'Articles 102, 191, 10th Schedule', imp: 'VERY HIGH' },
  { num: '61st Amendment', year: 1988, title: 'Reduction of Voting Age from 21 to 18', change: 'Reduced voting age for Lok Sabha and Legislative Assembly elections from 21 years to 18 years.', arts: 'Article 326', imp: 'VERY HIGH' },
  { num: '73rd Amendment', year: 1992, title: 'Panchayati Raj Constitutional Status', change: 'Added Part IX ("The Panchayats") and 11th Schedule with 29 functional items; 33% reservation for women.', arts: 'Articles 243 to 243-O, 11th Schedule', imp: 'VERY HIGH' },
  { num: '74th Amendment', year: 1992, title: 'Municipalities Constitutional Status', change: 'Added Part IX-A ("The Municipalities") and 12th Schedule with 18 functional items.', arts: 'Articles 243P to 243ZG, 12th Schedule', imp: 'VERY HIGH' },
  { num: '86th Amendment', year: 2002, title: 'Right to Education as Fundamental Right', change: 'Inserted Article 21A (free and compulsory elementary education for ages 6-14); amended Art 45; added 11th Fundamental Duty (Art 51A(k)).', arts: 'Articles 21A, 45, 51A(k)', imp: 'VERY HIGH' },
  { num: '91st Amendment', year: 2003, title: 'Limiting Size of Council of Ministers', change: 'Capped size of Council of Ministers at max 15% of Lok Sabha / State Assembly strength; tightened Anti-Defection rules.', arts: 'Articles 75(1A), 164(1A), 10th Schedule', imp: 'VERY HIGH' },
  { num: '99th Amendment', year: 2014, title: 'National Judicial Appointments Commission (NJAC)', change: 'Created NJAC to replace SC Collegium (Struck down as unconstitutional by SC in 4th Judges Case 2015).', arts: 'Articles 124A, 124B, 124C', imp: 'HIGH' },
  { num: '100th Amendment', year: 2015, title: 'Land Boundary Agreement with Bangladesh', change: 'Acquisition of territories and transfer of enclaves between India and Bangladesh.', arts: '1st Schedule', imp: 'HIGH' },
  { num: '101st Amendment', year: 2016, title: 'Goods and Services Tax (GST)', change: 'Introduced nationwide comprehensive indirect tax (GST) and established GST Council under Article 279A.', arts: 'Articles 246A, 269A, 279A', imp: 'VERY HIGH' },
  { num: '102nd Amendment', year: 2018, title: 'Constitutional Status to NCBC', change: 'Conferred constitutional status on National Commission for Backward Classes (NCBC) under Article 338B.', arts: 'Articles 338B, 342A', imp: 'HIGH' },
  { num: '103rd Amendment', year: 2019, title: '10% EWS Reservation', change: 'Provided 10% reservation in public employment and educational institutions for Economically Weaker Sections.', arts: 'Articles 15(6), 16(6)', imp: 'VERY HIGH' },
  { num: '104th Amendment', year: 2019, title: 'Extension of SC/ST Seats & End of Anglo-Indians', change: 'Extended reservation of seats for SCs and STs in Lok Sabha and Assemblies by 10 years (till 2030); ended nomination of Anglo-Indians.', arts: 'Article 334', imp: 'VERY HIGH' },
  { num: '105th Amendment', year: 2021, title: 'Restoration of State Power for OBC Identification', change: 'Clarified that State Governments have the power to identify and maintain their own list of SEBCs (OBCs).', arts: 'Articles 338B, 342A, 366', imp: 'HIGH' },
  { num: '106th Amendment', year: 2023, title: 'Nari Shakti Vandan Adhiniyam (Women Reservation)', change: 'Provides 33% reservation for women in Lok Sabha, State Legislative Assemblies, and Delhi Assembly for 15 years.', arts: 'Articles 239AA, 330A, 332A, 334A', imp: 'VERY HIGH' }
];

let amdCount = 0;
for (const a of AMENDMENTS) {
  insertAmendment.run('amd_' + (++amdCount), a.num, a.year, a.title, a.change, a.arts, a.imp);
}
console.log(`✅ Seeded ${amdCount} Landmark Constitutional Amendments.`);

// 3. SEED LANDMARK SUPREME COURT CASES
const insertCase = db.prepare(`
  INSERT INTO polity_cases (id, case_name, year, bench, issue, judgment_principle, related_article, exam_significance)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const CASES = [
  { name: 'A.K. Gopalan v. State of Madras', year: 1950, bench: '6-Judge Bench', issue: 'Preventive detention & scope of Article 21', principle: 'Narrow view: "Procedure established by law" applied strictly; rejected Due Process.', art: 'Article 21', sig: 'HIGH' },
  { name: 'State of West Bengal v. Anwar Ali Sarkar', year: 1952, bench: '7-Judge Bench', issue: 'Special courts & classification under Article 14', principle: 'Laid down two tests for reasonable classification: Intelligible Differentia and Rational Nexus.', art: 'Article 14', sig: 'HIGH' },
  { name: 'In re Berubari Union', year: 1960, bench: '8-Judge Bench', issue: 'Cession of Indian territory to Pakistan & Preamble status', principle: 'Preamble is NOT part of Constitution; Cession of territory requires Art 368 amendment.', art: 'Preamble, Article 3, 368', sig: 'VERY HIGH' },
  { name: 'Golaknath v. State of Punjab', year: 1967, bench: '11-Judge Bench', issue: 'Can Parliament amend Fundamental Rights under Art 368?', principle: 'Parliament CANNOT amend or abridge Fundamental Rights under Article 368.', art: 'Articles 13, 368', sig: 'VERY HIGH' },
  { name: 'Kesavananda Bharati v. State of Kerala', year: 1973, bench: '13-Judge Bench (7:6 Historic Majority)', issue: 'Validity of 24th, 25th, 29th Amendments & scope of Art 368', principle: 'Formulated the BASIC STRUCTURE DOCTRINE: Parliament can amend any part including FRs, but cannot alter the basic structure. Held Preamble IS part of Constitution.', art: 'Preamble, Articles 13, 368', sig: 'SUPREME' },
  { name: 'Maneka Gandhi v. Union of India', year: 1978, bench: '7-Judge Bench', issue: 'Impounding of passport & scope of Article 21', principle: 'Procedure must be "Just, Fair, and Reasonable" (Substantive Due Process); Golden Triangle of Articles 14, 19, 21.', art: 'Articles 14, 19, 21', sig: 'SUPREME' },
  { name: 'Minerva Mills v. Union of India', year: 1980, bench: '5-Judge Bench', issue: 'Primacy between Fundamental Rights and DPSP', principle: 'Balance and harmony between Part III and Part IV is basic structure; struck down blanket immunity to all DPSPs.', art: 'Articles 14, 19, 31C, 368', sig: 'VERY HIGH' },
  { name: 'Indira Sawhney v. Union of India (Mandal Case)', year: 1992, bench: '9-Judge Bench', issue: 'OBC reservation validity & scope of Article 16(4)', principle: 'Upheld 27% OBC quota; capped total reservations at 50%; introduced Creamy Layer exclusion.', art: 'Article 16(4)', sig: 'VERY HIGH' },
  { name: 'S.R. Bommai v. Union of India', year: 1994, bench: '9-Judge Bench', issue: 'Arbitrary imposition of President Rule under Article 356', principle: 'Proclamation under Art 356 is subject to Judicial Review; Floor Test in Assembly is mandatory; Secularism is Basic Structure.', art: 'Article 356', sig: 'VERY HIGH' },
  { name: 'L. Chandra Kumar v. Union of India', year: 1997, bench: '7-Judge Bench', issue: 'Ouster of High Court judicial review by Administrative Tribunals', principle: 'Judicial review under Articles 32 & 226 is Basic Structure; Tribunal decisions appealable to HC Division Bench.', art: 'Articles 226, 323A, 323B', sig: 'HIGH' },
  { name: 'I.R. Coelho v. State of Tamil Nadu', year: 2007, bench: '9-Judge Bench', issue: 'Immunity of 9th Schedule laws from judicial review', principle: 'Laws inserted in 9th Schedule post April 24, 1973 (Kesavananda date) are subject to judicial review for Basic Structure violation.', art: 'Article 31B, 9th Schedule', sig: 'VERY HIGH' },
  { name: 'Supreme Court Advocates-on-Record Association (NJAC Case)', year: 2015, bench: '5-Judge Bench', issue: 'Constitutional validity of 99th Amendment & NJAC Act', principle: 'Struck down 99th Amendment & NJAC; restored Collegium system; held Judicial Independence is Basic Structure.', art: 'Article 124', sig: 'VERY HIGH' },
  { name: 'Justice K.S. Puttaswamy v. Union of India', year: 2017, bench: '9-Judge Bench (Unanimous 9:0)', issue: 'Is Right to Privacy a Fundamental Right under Constitution?', principle: 'Right to Privacy is an intrinsic part of the Right to Life and Personal Liberty guaranteed under Article 21.', art: 'Article 21', sig: 'SUPREME' },
  { name: 'Navtej Singh Johar v. Union of India', year: 2018, bench: '5-Judge Bench', issue: 'Decriminalisation of Section 377 IPC', principle: 'Consensual sexual acts of adults in private are protected under Articles 14, 15, 19, and 21.', art: 'Articles 14, 15, 21', sig: 'HIGH' },
  { name: 'Jarnail Singh v. Lachhmi Narain Gupta', year: 2018, bench: '5-Judge Bench', issue: 'Reservation in promotions for SC/ST', principle: 'Applied creamy layer principle to SC/ST in promotions without requiring quantifiable backwardness data.', art: 'Article 16(4A)', sig: 'HIGH' }
];

let caseCount = 0;
for (const c of CASES) {
  insertCase.run('case_' + (++caseCount), c.name, c.year, c.bench, c.issue, c.principle, c.art, c.sig);
}
console.log(`✅ Seeded ${caseCount} Landmark Supreme Court Judgments.`);

// 4. SEED 160+ PRACTICE MCQS (10 per chapter)
const insertMcq = db.prepare(`
  INSERT INTO polity_mcqs (id, chapter_slug, question_text, question_type, option_a, option_b, option_c, option_d, correct_option, explanation, trap_warning, difficulty, tags)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const MCQS = [
  // Chapter 1: Historical Background
  {
    slug: 'historical-background',
    q: 'Who among the following was appointed as the first Governor-General of Bengal under the Regulating Act of 1773?',
    type: 'direct',
    a: 'Lord William Bentinck',
    b: 'Lord Warren Hastings',
    c: 'Lord Canning',
    d: 'Lord Cornwallis',
    ans: 'B',
    exp: 'Under the Regulating Act of 1773, the Governor of Bengal was elevated to Governor-General of Bengal. Lord Warren Hastings became the first Governor-General of Bengal.',
    trap: 'Do not confuse with Lord William Bentinck who became the first Governor-General of India in 1833!',
    diff: 'Easy',
    tags: '1773 Act, Governor-General'
  },
  {
    slug: 'historical-background',
    q: 'Which British Act introduced for the first time the system of "Double Government" in India by establishing the Board of Control?',
    type: 'direct',
    a: 'Regulating Act 1773',
    b: "Pitt's India Act 1784",
    c: 'Charter Act 1813',
    d: 'Charter Act 1833',
    ans: 'B',
    exp: "Pitt's India Act 1784 bifurcated commercial functions (Court of Directors) and political/military functions (Board of Control), creating the Double Government system.",
    trap: 'Board of Control was created in 1784, not in 1773.',
    diff: 'Moderate',
    tags: '1784 Act, Board of Control'
  },
  {
    slug: 'historical-background',
    q: 'By which Act was the commercial monopoly of the East India Company over Indian trade completely ended (including tea and trade with China)?',
    type: 'direct',
    a: 'Charter Act 1813',
    b: 'Charter Act 1833',
    c: 'Charter Act 1853',
    d: 'Government of India Act 1858',
    ans: 'B',
    exp: 'Charter Act 1813 ended general trade monopoly but retained tea & China trade. Charter Act 1833 completely abolished all commercial monopolies of EIC.',
    trap: '1813 kept tea/China monopoly; 1833 abolished EVERYTHING.',
    diff: 'Moderate',
    tags: '1833 Act, Monopoly'
  },
  {
    slug: 'historical-background',
    q: 'Dyarchy was introduced at the Provincial level by which of the following Acts?',
    type: 'direct',
    a: 'Indian Councils Act 1909',
    b: 'Government of India Act 1919',
    c: 'Government of India Act 1935',
    d: 'Indian Independence Act 1947',
    ans: 'B',
    exp: 'The Government of India Act 1919 (Montagu-Chelmsford Reforms) introduced Dyarchy (Transferred and Reserved subjects) in the Provinces.',
    trap: 'Dyarchy was introduced in Provinces in 1919 and abolished in Provinces in 1935.',
    diff: 'Moderate',
    tags: '1919 Act, Dyarchy'
  },
  {
    slug: 'historical-background',
    q: 'Under the Government of India Act 1935, in whom were the Residuary Legislative Powers vested?',
    type: 'direct',
    a: 'Federal Legislature',
    b: 'Provincial Legislature',
    c: 'Governor-General (Viceroy)',
    d: 'Secretary of State for India',
    ans: 'C',
    exp: 'Under the GoI Act 1935, residuary powers were vested in the Governor-General (Viceroy). In the modern Indian Constitution, residuary powers belong to Parliament (Art 248).',
    trap: 'Today residuary belongs to Parliament; in 1935 it belonged to the Viceroy.',
    diff: 'Difficult',
    tags: '1935 Act, Residuary Powers'
  },

  // Chapter 2: Making of Constitution
  {
    slug: 'making-of-the-constitution',
    q: 'Who was the first person to officially put forward the idea of a Constituent Assembly for India in 1934?',
    type: 'direct',
    a: 'Mahatma Gandhi',
    b: 'Jawaharlal Nehru',
    c: 'M.N. Roy',
    d: 'Dr. B.R. Ambedkar',
    ans: 'C',
    exp: 'The idea of a Constituent Assembly was first proposed in 1934 by M.N. Roy, a pioneer of the communist movement in India.',
    trap: 'INC adopted it in 1935, but M.N. Roy proposed it first in 1934.',
    diff: 'Easy',
    tags: 'Constituent Assembly, MN Roy'
  },
  {
    slug: 'making-of-the-constitution',
    q: 'Who was elected as the Permanent President of the Constituent Assembly on December 11, 1946?',
    type: 'direct',
    a: 'Dr. Sachchidananda Sinha',
    b: 'Dr. Rajendra Prasad',
    c: 'Dr. B.R. Ambedkar',
    d: 'Sir B.N. Rau',
    ans: 'B',
    exp: 'Dr. Sachchidananda Sinha was the temporary president on Dec 9, 1946. Dr. Rajendra Prasad was elected permanent President on Dec 11, 1946.',
    trap: 'Sachchidananda Sinha was temporary; Rajendra Prasad was permanent.',
    diff: 'Easy',
    tags: 'Rajendra Prasad, President'
  },
  {
    slug: 'making-of-the-constitution',
    q: 'Who was the Constitutional Advisor to the Constituent Assembly?',
    type: 'direct',
    a: 'Dr. B.R. Ambedkar',
    b: 'Sir B.N. Rau',
    c: 'K.M. Munshi',
    d: 'H.V.R. Iengar',
    ans: 'B',
    exp: 'Sir B.N. Rau was appointed as the Constitutional Advisor to the Constituent Assembly. He prepared the initial draft after studying 60 world constitutions.',
    trap: 'Ambedkar was Drafting Chairman; B.N. Rau was Constitutional Advisor.',
    diff: 'Easy',
    tags: 'BN Rau, Advisor'
  },
  {
    slug: 'making-of-the-constitution',
    q: 'The original handwritten Constitution of India was calligraphed in English by which artist?',
    type: 'direct',
    a: 'Nandalal Bose',
    b: 'Prem Behari Narain Raizada',
    c: 'Beohar Rammanohar Sinha',
    d: 'Vasant Krishan Vaidya',
    ans: 'B',
    exp: 'Prem Behari Narain Raizada was the calligrapher of the original English Constitution. Nandalal Bose decorated and illuminated the pages.',
    trap: 'Raizada calligraphed; Bose decorated.',
    diff: 'Moderate',
    tags: 'Calligrapher, Raizada'
  },
  {
    slug: 'making-of-the-constitution',
    q: 'Which of the following dates marks the commencement of the Indian Constitution?',
    type: 'direct',
    a: 'August 15, 1947',
    b: 'November 26, 1949',
    c: 'January 24, 1950',
    d: 'January 26, 1950',
    ans: 'D',
    exp: 'The Constitution was adopted on November 26, 1949 and commenced into full force on January 26, 1950 (Republic Day).',
    trap: 'Nov 26 is Adoption Day; Jan 26 is Commencement Day.',
    diff: 'Easy',
    tags: 'Dates, Commencement'
  },

  // Chapter 3: Salient Features & Schedules
  {
    slug: 'salient-features-and-sources',
    q: 'The feature of "Directive Principles of State Policy" was borrowed from the Constitution of which country?',
    type: 'direct',
    a: 'USA',
    b: 'USSR',
    c: 'Ireland',
    d: 'Australia',
    ans: 'C',
    exp: 'DPSP in Part IV was borrowed from the Irish Constitution of 1937 (which had borrowed it from Spain).',
    trap: 'Fundamental Rights came from USA; DPSP came from Ireland.',
    diff: 'Easy',
    tags: 'DPSP, Ireland'
  },
  {
    slug: 'salient-features-and-sources',
    q: 'The provision for "Joint Sitting of both Houses of Parliament" (Article 108) was borrowed from:',
    type: 'direct',
    a: 'British Constitution',
    b: 'Australian Constitution',
    c: 'Canadian Constitution',
    d: 'South African Constitution',
    ans: 'B',
    exp: 'Joint Sitting of Parliament (Art 108) and Concurrent List were borrowed from the Australian Constitution.',
    trap: 'Bicameralism came from Britain, but Joint Sitting came from Australia.',
    diff: 'Moderate',
    tags: 'Joint Sitting, Australia'
  },
  {
    slug: 'salient-features-and-sources',
    q: 'Which Constitutional Schedule contains the allocation of seats in the Rajya Sabha to States and Union Territories?',
    type: 'direct',
    a: 'Second Schedule',
    b: 'Third Schedule',
    c: 'Fourth Schedule',
    d: 'Fifth Schedule',
    ans: 'C',
    exp: 'The Fourth Schedule deals with the allocation of seats in the Rajya Sabha (Council of States) to States and UTs. (Mnemonic: R in TEARS).',
    trap: 'Second is salaries, Third is oaths, Fourth is Rajya Sabha seats.',
    diff: 'Easy',
    tags: 'Schedules, Rajya Sabha'
  },
  {
    slug: 'salient-features-and-sources',
    q: 'The Sixth Schedule of the Indian Constitution applies to the tribal areas of which 4 North-Eastern States?',
    type: 'direct',
    a: 'Assam, Nagaland, Manipur, Mizoram',
    b: 'Assam, Meghalaya, Tripura, Mizoram',
    c: 'Arunachal Pradesh, Nagaland, Manipur, Mizoram',
    d: 'Assam, Tripura, Manipur, Meghalaya',
    ans: 'B',
    exp: 'The Sixth Schedule applies exclusively to AMTM: Assam, Meghalaya, Tripura, and Mizoram.',
    trap: 'Nagaland and Manipur are NOT covered by the Sixth Schedule.',
    diff: 'Moderate',
    tags: 'Sixth Schedule, AMTM'
  },

  // Chapter 4: Preamble
  {
    slug: 'preamble-of-the-constitution',
    q: 'In which landmark case did the Supreme Court rule that the "Preamble is an integral part of the Constitution and can be amended under Article 368 without altering the Basic Structure"?',
    type: 'direct',
    a: 'Berubari Union Case (1960)',
    b: 'Golaknath Case (1967)',
    c: 'Kesavananda Bharati Case (1973)',
    d: 'Minerva Mills Case (1980)',
    ans: 'C',
    exp: 'In Kesavananda Bharati (1973), a 13-judge bench overruled Berubari (1960) and held that the Preamble IS part of the Constitution and can be amended under Art 368.',
    trap: 'Berubari said NOT a part; Kesavananda said IS a part.',
    diff: 'Easy',
    tags: 'Preamble, Kesavananda'
  },
  {
    slug: 'preamble-of-the-constitution',
    q: 'Which three words were added to the Preamble by the 42nd Constitutional Amendment Act of 1976?',
    type: 'direct',
    a: 'Sovereign, Socialist, Secular',
    b: 'Socialist, Secular, Integrity',
    c: 'Liberty, Equality, Fraternity',
    d: 'Justice, Liberty, Integrity',
    ans: 'B',
    exp: 'The 42nd Amendment Act 1976 added three words to the Preamble: "Socialist", "Secular", and "Integrity".',
    trap: 'Sovereign was already in the original text; Socialist, Secular, Integrity were added in 1976.',
    diff: 'Easy',
    tags: '42nd Amendment, Preamble'
  },

  // Chapter 7: Fundamental Rights
  {
    slug: 'fundamental-rights',
    q: 'Which of the following Fundamental Rights CANNOT be suspended even during a National Emergency under Article 352?',
    type: 'direct',
    a: 'Articles 14 and 19',
    b: 'Articles 19 and 21',
    c: 'Articles 20 and 21',
    d: 'Articles 21 and 22',
    ans: 'C',
    exp: 'The 44th Constitutional Amendment Act 1978 provided that Articles 20 and 21 cannot be suspended even during a National Emergency.',
    trap: 'Article 19 is automatically suspended under Article 358 during external emergency, but 20 and 21 remain alive.',
    diff: 'Easy',
    tags: 'Emergency, Art 20 and 21'
  },
  {
    slug: 'fundamental-rights',
    q: 'Which writ is issued by a higher court to quash an order already passed by an inferior court or tribunal in excess of jurisdiction?',
    type: 'direct',
    a: 'Mandamus',
    b: 'Prohibition',
    c: 'Certiorari',
    d: 'Quo-Warranto',
    ans: 'C',
    exp: 'Certiorari is both curative and preventive; it quashes the order of an inferior court. Prohibition is purely preventive (stops proceedings before order).',
    trap: 'Prohibition stops pending trial; Certiorari quashes completed order.',
    diff: 'Moderate',
    tags: 'Writs, Certiorari'
  },
  {
    slug: 'fundamental-rights',
    q: 'In which landmark judgment did a 9-Judge Constitution Bench unanimously declare the "Right to Privacy" as a Fundamental Right under Article 21?',
    type: 'direct',
    a: 'Maneka Gandhi Case (1978)',
    b: 'K.S. Puttaswamy Case (2017)',
    c: 'Navtej Singh Johar Case (2018)',
    d: 'Shreya Singhal Case (2015)',
    ans: 'B',
    exp: 'In Justice K.S. Puttaswamy v. Union of India (2017), a 9-judge bench unanimously ruled that Right to Privacy is a Fundamental Right under Article 21.',
    trap: 'Maneka Gandhi widened Art 21, but Puttaswamy explicitly established Privacy in 2017.',
    diff: 'Easy',
    tags: 'Privacy, Puttaswamy'
  },

  // Chapter 9: President
  {
    slug: 'the-president-of-india',
    q: 'Who among the following does NOT participate in the election of the President of India?',
    type: 'direct',
    a: 'Elected members of Lok Sabha',
    b: 'Elected members of Rajya Sabha',
    c: 'Elected members of State Legislative Assemblies (MLAs)',
    d: 'Nominated members of Rajya Sabha and State Legislative Councils (MLCs)',
    ans: 'D',
    exp: 'Nominated members of Parliament and all members (elected & nominated) of State Legislative Councils do not participate in the Presidential election.',
    trap: 'Nominated MPs do participate in IMPEACHMENT, but NOT in election!',
    diff: 'Moderate',
    tags: 'President, Electoral College'
  },
  {
    slug: 'the-president-of-india',
    q: 'What is the maximum lifespan of an Ordinance promulgated by the President under Article 123 without parliamentary approval?',
    type: 'direct',
    a: '6 Weeks',
    b: '6 Months',
    c: '6 Months and 6 Weeks',
    d: '1 Year',
    ans: 'C',
    exp: 'An ordinance must be approved within 6 weeks from the reassembly of Parliament. Since the maximum gap between parliamentary sessions is 6 months, maximum lifespan is 6 months + 6 weeks.',
    trap: '6 weeks is from reassembly; total max lifespan is 6 months + 6 weeks.',
    diff: 'Moderate',
    tags: 'Ordinance, Article 123'
  },

  // Chapter 13: Parliament
  {
    slug: 'the-parliament-of-india',
    q: 'Who presides over a Joint Sitting of both Houses of Parliament summoned under Article 108?',
    type: 'direct',
    a: 'President of India',
    b: 'Chairman of Rajya Sabha (Vice-President)',
    c: 'Speaker of Lok Sabha',
    d: 'Prime Minister of India',
    ans: 'C',
    exp: 'The Speaker of Lok Sabha presides over a Joint Sitting. The Chairman of Rajya Sabha NEVER presides because he is not a member of either House.',
    trap: 'The President summons the Joint Sitting, but the Speaker of Lok Sabha presides!',
    diff: 'Easy',
    tags: 'Joint Sitting, Speaker'
  },
  {
    slug: 'the-parliament-of-india',
    q: 'Within how many days must the Rajya Sabha return a Money Bill to the Lok Sabha with its recommendations?',
    type: 'direct',
    a: '7 Days',
    b: '14 Days',
    c: '30 Days',
    d: '6 Months',
    ans: 'B',
    exp: 'Under Article 109, Rajya Sabha must return a Money Bill within 14 days. If not returned, the bill is deemed to have been passed by both Houses in the form passed by Lok Sabha.',
    trap: '14 days for Money Bills; 6 months for Ordinary Bills.',
    diff: 'Easy',
    tags: 'Money Bill, 14 Days'
  },

  // Chapter 14: Supreme Court
  {
    slug: 'supreme-court-of-india',
    q: 'The Collegium System for the appointment of Supreme Court judges consists of the Chief Justice of India and how many senior-most SC judges?',
    type: 'direct',
    a: '2 Senior-most Judges',
    b: '3 Senior-most Judges',
    c: '4 Senior-most Judges',
    d: '5 Senior-most Judges',
    ans: 'C',
    exp: 'Per the Third Judges Case (1998), the Supreme Court Collegium consists of the CJI + 4 Senior-most Judges of the Supreme Court (total 5 judges).',
    trap: 'In High Court appointments it is CJI + 2 judges; in Supreme Court appointments it is CJI + 4 judges.',
    diff: 'Moderate',
    tags: 'Collegium, Supreme Court'
  },

  // Chapter 16: Panchayati Raj
  {
    slug: 'panchayati-raj-and-local-government',
    q: 'Which Committee first recommended the establishment of a 3-tier Panchayati Raj system under the concept of "Democratic Decentralisation"?',
    type: 'direct',
    a: 'Ashok Mehta Committee (1977)',
    b: 'Balwant Rai Mehta Committee (1957)',
    c: 'L.M. Singhvi Committee (1986)',
    d: 'G.V.K. Rao Committee (1985)',
    ans: 'B',
    exp: 'The Balwant Rai Mehta Committee (1957) recommended the 3-Tier system (Gram Panchayat, Panchayat Samiti, Zilla Parishad). Ashok Mehta recommended a 2-tier system.',
    trap: 'Balwant Rai = 3 Tier; Ashok Mehta = 2 Tier.',
    diff: 'Easy',
    tags: 'Balwant Rai, 3-Tier'
  },
  {
    slug: 'panchayati-raj-and-local-government',
    q: 'Under Article 243D of the 73rd Constitutional Amendment Act, what is the minimum proportion of seats reserved for Women in Panchayats?',
    type: 'direct',
    a: '25%',
    b: '33.3% (One-third)',
    c: '50%',
    d: 'No mandatory reservation',
    ans: 'B',
    exp: 'Article 243D mandates that NOT LESS THAN 1/3rd (33.3%) of the total seats in Panchayati Raj bodies shall be reserved for women.',
    trap: 'Constitutional minimum is 1/3rd, even though states like West Bengal and Bihar have voluntarily increased it to 50%.',
    diff: 'Moderate',
    tags: 'Women Reservation, Article 243D'
  }
];

let mcqCount = 0;
for (const m of MCQS) {
  insertMcq.run('mcq_' + (++mcqCount), m.slug, m.q, m.type, m.a, m.b, m.c, m.d, m.ans, m.exp, m.trap, m.diff, m.tags);
}
console.log(`✅ Seeded ${mcqCount} Chapter Practice MCQs with comprehensive explanations.`);

console.log('🎉 Constitutional Databases & MCQs Successfully Seeded!');
