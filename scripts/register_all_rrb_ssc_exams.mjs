import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'data', 'wb_decoded.sqlite'));

// Ensure Categories exist
db.prepare(`
  INSERT OR IGNORE INTO exam_categories (id, name, slug, description, order_index)
  VALUES 
    ('cat-central-ssc', 'Central SSC Examinations', 'central-ssc', 'Staff Selection Commission Exams (CGL, CHSL, MTS, CPO, GD, Steno, JE)', 2),
    ('cat-central-rrb', 'Railway Recruitment Board (RRB)', 'railway-rrb', 'Indian Railways Recruitment Exams (NTPC, Group D, ALP, JE, RPF)', 3)
`).run();

// Ensure all SSC and RRB exams exist
const examsToEnsure = [
  // --- SSC ---
  {
    id: 'exam-ssc-cgl',
    cat: 'cat-central-ssc',
    name: 'SSC CGL (Combined Graduate Level Examination)',
    slug: 'ssc-cgl',
    auth: 'Staff Selection Commission (SSC)',
    web: 'https://ssc.gov.in',
    desc: 'Premier competitive examination for Group B and Group C Gazetted/Non-Gazetted posts in Central Ministries.'
  },
  {
    id: 'exam-ssc-chsl',
    cat: 'cat-central-ssc',
    name: 'SSC CHSL (10+2 Level Examination)',
    slug: 'ssc-chsl',
    auth: 'Staff Selection Commission (SSC)',
    web: 'https://ssc.gov.in',
    desc: 'Combined Higher Secondary Level examination for LDC, JSA, DEO, and Postal/Sorting Assistants.'
  },
  {
    id: 'exam-ssc-mts',
    cat: 'cat-central-ssc',
    name: 'SSC MTS & Havaldar',
    slug: 'ssc-mts',
    auth: 'Staff Selection Commission (SSC)',
    web: 'https://ssc.gov.in',
    desc: 'Multi-Tasking (Non-Technical) Staff and Havaldar in CBIC and CBN examination.'
  },
  {
    id: 'exam-ssc-cpo',
    cat: 'cat-central-ssc',
    name: 'SSC CPO (Sub-Inspector in Delhi Police & CAPFs)',
    slug: 'ssc-cpo',
    auth: 'Staff Selection Commission (SSC)',
    web: 'https://ssc.gov.in',
    desc: 'Recruitment for Sub-Inspectors in Delhi Police, BSF, CISF, CRPF, ITBP, and SSB.'
  },
  {
    id: 'exam-ssc-gd',
    cat: 'cat-central-ssc',
    name: 'SSC GD Constable (CAPFs & SSF)',
    slug: 'ssc-gd',
    auth: 'Staff Selection Commission (SSC)',
    web: 'https://ssc.gov.in',
    desc: 'Recruitment for Constables (General Duty) in Central Armed Police Forces, SSF, and Rifleman in Assam Rifles.'
  },
  {
    id: 'exam-ssc-steno',
    cat: 'cat-central-ssc',
    name: 'SSC Stenographer (Grade C & D)',
    slug: 'ssc-steno',
    auth: 'Staff Selection Commission (SSC)',
    web: 'https://ssc.gov.in',
    desc: 'Recruitment for Stenographers Grade C and Grade D across Ministries and Departments.'
  },
  {
    id: 'exam-ssc-je',
    cat: 'cat-central-ssc',
    name: 'SSC JE (Junior Engineer - Paper-I)',
    slug: 'ssc-je',
    auth: 'Staff Selection Commission (SSC)',
    web: 'https://ssc.gov.in',
    desc: 'Recruitment for Junior Engineers (Civil, Mechanical, Electrical) in CPWD, MES, CWC, BRO.'
  },

  // --- RRB ---
  {
    id: 'exam-rrb-ntpc',
    cat: 'cat-central-rrb',
    name: 'RRB NTPC (Graduate & Under-Graduate)',
    slug: 'rrb-ntpc',
    auth: 'Railway Recruitment Control Board (RRCB)',
    web: 'https://rrbcdg.gov.in',
    desc: 'Non-Technical Popular Categories (Station Master, Goods Guard, Commercial Apprentice, Junior Clerk).'
  },
  {
    id: 'exam-rrb-group-d',
    cat: 'cat-central-rrb',
    name: 'RRB Group D (RRC Level-1 Posts)',
    slug: 'rrb-group-d',
    auth: 'Railway Recruitment Cell (RRC / RRB)',
    web: 'https://rrbcdg.gov.in',
    desc: 'Level-1 recruitment for Track Maintainer, Pointsman, Helper, Hospital Assistant in Indian Railways.'
  },
  {
    id: 'exam-rrb-alp',
    cat: 'cat-central-rrb',
    name: 'RRB Assistant Loco Pilot (ALP) & Technician',
    slug: 'rrb-alp',
    auth: 'Railway Recruitment Control Board (RRCB)',
    web: 'https://rrbcdg.gov.in',
    desc: 'Recruitment for Assistant Loco Pilot and Technicians Grade-I & Grade-III in Indian Railways.'
  },
  {
    id: 'exam-rrb-je',
    cat: 'cat-central-rrb',
    name: 'RRB Junior Engineer (JE)',
    slug: 'rrb-je',
    auth: 'Railway Recruitment Control Board (RRCB)',
    web: 'https://rrbcdg.gov.in',
    desc: 'Recruitment for Junior Engineer, Depot Material Superintendent, and Chemical & Metallurgical Assistant.'
  },
  {
    id: 'exam-rrb-rpf',
    cat: 'cat-central-rrb',
    name: 'RRB RPF SI & Constable (Railway Protection Force)',
    slug: 'rrb-rpf',
    auth: 'Ministry of Railways / RPF',
    web: 'https://rrbcdg.gov.in',
    desc: 'Recruitment for Sub-Inspectors and Constables in Railway Protection Force & RPSF.'
  }
];

const insertExam = db.prepare(`
  INSERT INTO exams (id, category_id, name, slug, authority, official_website, description, is_active)
  VALUES (@id, @cat, @name, @slug, @auth, @web, @desc, 1)
  ON CONFLICT(id) DO UPDATE SET
    category_id = excluded.category_id,
    name = excluded.name,
    authority = excluded.authority,
    official_website = excluded.official_website,
    description = excluded.description,
    is_active = 1
`);

for (const ex of examsToEnsure) {
  insertExam.run(ex);
}

console.log('✅ Successfully verified and updated all 12 SSC and RRB official exams in the database.');
