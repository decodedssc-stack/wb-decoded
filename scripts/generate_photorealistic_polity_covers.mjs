import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'images', 'polity');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('🎨 GENERATING 16 ULTRA-PREMIUM CHAPTER COVERS MATCHING THE USER REFERENCE STYLE...');

const chapters = [
  {
    num: '01',
    filename: 'chapter-01-historical-background.svg',
    headerPart: 'PART 01 • CONSTITUTIONAL GENESIS',
    titleLine1: 'HISTORICAL',
    titleLine2: 'BACKGROUND',
    tagline: 'COMPANY RULE (1773–1858) • CROWN RULE (1858–1947)',
    pill: 'FOR ALL WBPSC & STATE EXAMS',
    book1: 'REGULATING ACT, 1773',
    book2: 'GOVT OF INDIA ACT, 1935',
    book3: 'INDEPENDENCE ACT, 1947',
    colorTheme: '#1E3A8A'
  },
  {
    num: '02',
    filename: 'chapter-02-making-of-the-constitution.svg',
    headerPart: 'PART 02 • SAMVIDHAN SABHA',
    titleLine1: 'MAKING OF THE',
    titleLine2: 'CONSTITUTION',
    tagline: 'CONSTITUENT ASSEMBLY • DRAFTING COMMITTEE • ENACTMENT',
    pill: '2 YRS 11 MOS 18 DAYS DRAFTING',
    book1: 'OBJECTIVES RESOLUTION',
    book2: 'DRAFT CONSTITUTION',
    book3: 'ENACTED NOV 26, 1949',
    colorTheme: '#0F766E'
  },
  {
    num: '03',
    filename: 'chapter-03-salient-features-and-schedules.svg',
    headerPart: 'PART 03 • FRAMEWORK & STRUCTURE',
    titleLine1: 'FEATURES &',
    titleLine2: 'SCHEDULES',
    tagline: '12 SCHEDULES • CONSTITUTIONAL BORROWINGS • FEDERAL SYSTEM',
    pill: 'TEARS OF OLD PM FORMULA',
    book1: '12 SCHEDULES OF INDIA',
    book2: 'GLOBAL BORROWINGS',
    book3: 'FEDERAL & UNITARY BIAS',
    colorTheme: '#4338CA'
  },
  {
    num: '04',
    filename: 'chapter-04-preamble-of-the-constitution.svg',
    headerPart: 'PART 04 • SOUL OF CONSTITUTION',
    titleLine1: 'THE',
    titleLine2: 'PREAMBLE',
    tagline: 'PHILOSOPHY • BASIC STRUCTURE • SO-SO-SE-DE-RE',
    pill: '42ND AMENDMENT 1976',
    book1: 'IDENTITY CARD OF INDIA',
    book2: 'KESAVANANDA BHARATI',
    book3: 'JUSTICE • LIBERTY • EQUALITY',
    colorTheme: '#B45309'
  },
  {
    num: '05',
    filename: 'chapter-05-union-and-its-territory.svg',
    headerPart: 'PART I • ARTICLES 1 TO 4',
    titleLine1: 'UNION & ITS',
    titleLine2: 'TERRITORY',
    tagline: 'ARTICLE 1 TO 4 • STATE REORGANISATION • INTEGRATION',
    pill: '28 STATES & 8 UTs',
    book1: 'FAZL ALI COMMISSION',
    book2: 'DHAR COMMISSION 1948',
    book3: '7TH AMENDMENT ACT 1956',
    colorTheme: '#0369A1'
  },
  {
    num: '06',
    filename: 'chapter-06-citizenship.svg',
    headerPart: 'PART II • ARTICLES 5 TO 11',
    titleLine1: 'CITIZENSHIP',
    titleLine2: 'IN INDIA',
    tagline: 'CITIZENSHIP ACT 1955 • CAA 2019 • NRC • ASSAM ACCORD',
    pill: 'SINGLE CITIZENSHIP MODEL',
    book1: 'ACQUISITION BY BRAND',
    book2: 'CITIZENSHIP ACT 1955',
    book3: 'CAA 2019 & NRC PROVISIONS',
    colorTheme: '#047857'
  },
  {
    num: '07',
    filename: 'chapter-07-fundamental-rights.svg',
    headerPart: 'PART III • ARTICLES 12 TO 35',
    titleLine1: 'FUNDAMENTAL',
    titleLine2: 'RIGHTS',
    tagline: 'MAGNA CARTA OF INDIA • 6 RIGHTS • 5 WRITS (ARTICLE 32)',
    pill: 'HEART & SOUL OF CONSTITUTION',
    book1: 'ARTICLE 21 & DUE PROCESS',
    book2: '5 CONSTITUTIONAL WRITS',
    book3: 'MAGNA CARTA OF INDIA',
    colorTheme: '#1E1B4B'
  },
  {
    num: '08',
    filename: 'chapter-08-directive-principles-and-duties.svg',
    headerPart: 'PART IV & IVA • ARTS 36 TO 51A',
    titleLine1: 'DPSP &',
    titleLine2: 'DUTIES',
    tagline: 'WELFARE STATE • IRISH BORROWING • 11 FUNDAMENTAL DUTIES',
    pill: 'SWARAN SINGH COMMITTEE',
    book1: 'GANDHIAN & SOCIALIST DPSP',
    book2: 'ARTICLE 51A (11 DUTIES)',
    book3: 'MINERVA MILLS HARMONY',
    colorTheme: '#854D0E'
  },
  {
    num: '09',
    filename: 'chapter-09-the-president-of-india.svg',
    headerPart: 'PART V • UNION EXECUTIVE',
    titleLine1: 'PRESIDENT',
    titleLine2: 'OF INDIA',
    tagline: 'ARTICLES 52 TO 73 • ORDINANCES (ART 123) • PARDONS (ART 72)',
    pill: 'FIRST CITIZEN & SUPREME COMMANDER',
    book1: 'ELECTORAL COLLEGE (ART 54)',
    book2: 'ORDINANCE POWER (ART 123)',
    book3: 'PARDONING POWERS (ART 72)',
    colorTheme: '#991B1B'
  },
  {
    num: '10',
    filename: 'chapter-10-vice-president-and-prime-minister.svg',
    headerPart: 'PART V • REAL EXECUTIVE',
    titleLine1: 'VP, PM &',
    titleLine2: 'CABINET',
    tagline: 'ARTICLES 63 TO 78 • COUNCIL OF MINISTERS • PMO',
    pill: 'COLLECTIVE RESPONSIBILITY (ART 75)',
    book1: 'PRIME MINISTER & PMO',
    book2: 'COUNCIL OF MINISTERS',
    book3: 'VICE-PRESIDENT (ART 63)',
    colorTheme: '#1F2937'
  },
  {
    num: '11',
    filename: 'chapter-11-law-officers-ag-and-advocate-general.svg',
    headerPart: 'LAW OFFICERS • ARTS 76 & 165',
    titleLine1: 'LAW OFFICERS',
    titleLine2: 'OF INDIA',
    tagline: 'ATTORNEY GENERAL (ART 76) • ADVOCATE GENERAL (ART 165)',
    pill: 'CHIEF LEGAL ADVISORS',
    book1: 'ATTORNEY GENERAL (ART 76)',
    book2: 'SOLICITOR GENERAL',
    book3: 'ADVOCATE GENERAL (ART 165)',
    colorTheme: '#3730A3'
  },
  {
    num: '12',
    filename: 'chapter-12-state-executive-and-governor.svg',
    headerPart: 'PART VI • STATE EXECUTIVE',
    titleLine1: 'THE STATE',
    titleLine2: 'EXECUTIVE',
    tagline: 'GOVERNOR (ARTS 153–161) • CHIEF MINISTER • STATE CABINET',
    pill: 'CONSTITUTIONAL HEAD OF STATE',
    book1: 'GOVERNOR DISCRETION',
    book2: 'CHIEF MINISTER & CABINET',
    book3: 'STATE ORDINANCE (ART 213)',
    colorTheme: '#065F46'
  },
  {
    num: '13',
    filename: 'chapter-13-the-parliament-of-india.svg',
    headerPart: 'PART V • UNION LEGISLATURE',
    titleLine1: 'PARLIAMENT',
    titleLine2: 'OF INDIA',
    tagline: 'LOK SABHA • RAJYA SABHA • MONEY BILLS (ART 110) • MOTIONS',
    pill: 'SANSAD BHAVAN ARCHITECTURE',
    book1: 'LOK SABHA & RAJYA SABHA',
    book2: 'MONEY BILLS (ART 110)',
    book3: 'PARLIAMENTARY MOTIONS',
    colorTheme: '#1E3A8A'
  },
  {
    num: '14',
    filename: 'chapter-14-supreme-court-of-india.svg',
    headerPart: 'PART V • UNION JUDICIARY',
    titleLine1: 'SUPREME',
    titleLine2: 'COURT',
    tagline: 'ARTICLES 124 TO 147 • COLLEGIUM SYSTEM • JUDICIAL REVIEW',
    pill: 'YATO DHARMASTATO JAYAH',
    book1: 'COLLEGIUM SYSTEM (NJAC)',
    book2: 'ADVISORY JURISDICTION',
    book3: 'ARTICLE 142 COMPLETE JUSTICE',
    colorTheme: '#581C87'
  },
  {
    num: '15',
    filename: 'chapter-15-state-judiciary-high-courts.svg',
    headerPart: 'PART VI • STATE JUDICIARY',
    titleLine1: 'HIGH COURTS &',
    titleLine2: 'TRIBUNALS',
    tagline: 'HIGH COURTS (ART 214–231) • ARTICLE 226 • SUBORDINATE COURTS',
    pill: 'WIDER WRIT SCOPE (ART 226)',
    book1: 'CALCUTTA HIGH COURT 1862',
    book2: 'ARTICLE 226 WRIT POWERS',
    book3: 'ADMINISTRATIVE TRIBUNALS',
    colorTheme: '#1E293B'
  },
  {
    num: '16',
    filename: 'chapter-16-panchayati-raj-and-local-government.svg',
    headerPart: 'PART IX & IX-A • LOCAL GOV',
    titleLine1: 'PANCHAYATI',
    titleLine2: 'RAJ',
    tagline: '73RD & 74TH AMENDMENTS • GRAM SABHA • 3-TIER SYSTEM',
    pill: 'BALWANT RAI MEHTA COMMITTEE',
    book1: '73RD AMENDMENT ACT 1992',
    book2: '11TH SCHEDULE (29 ITEMS)',
    book3: 'MUNICIPALITIES (PART IXA)',
    colorTheme: '#15803D'
  }
];

function generateDetailedArtwork(c) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Rich Cinematic Navy Background Gradient -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#051329" />
      <stop offset="40%" stop-color="#0A1E3F" />
      <stop offset="80%" stop-color="#081833" />
      <stop offset="100%" stop-color="#030B17" />
    </linearGradient>

    <!-- Warm Golden Parchment Overlay Gradient on the Right Side -->
    <radialGradient id="parchmentGlow" cx="85%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#EAB308" stop-opacity="0.35" />
      <stop offset="35%" stop-color="#B45309" stop-opacity="0.2" />
      <stop offset="70%" stop-color="#78350F" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#051329" stop-opacity="0" />
    </radialGradient>

    <!-- Golden Foil Metallic Text Gradient -->
    <linearGradient id="goldTextGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFBEB" />
      <stop offset="25%" stop-color="#FDE047" />
      <stop offset="60%" stop-color="#F59E0B" />
      <stop offset="90%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#92400E" />
    </linearGradient>

    <!-- Premium Golden Ribbon Gradient -->
    <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B45309" />
      <stop offset="20%" stop-color="#F59E0B" />
      <stop offset="50%" stop-color="#FDE68A" />
      <stop offset="80%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>

    <!-- Book Spine Gradient (Blue) -->
    <linearGradient id="bookSpine1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="50%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>

    <!-- Book Spine Gradient (Brown Leather) -->
    <linearGradient id="bookSpine2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#451A03" />
      <stop offset="50%" stop-color="#78350F" />
      <stop offset="100%" stop-color="#451A03" />
    </linearGradient>

    <!-- Book Spine Gradient (Dark Navy) -->
    <linearGradient id="bookSpine3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#082F49" />
      <stop offset="50%" stop-color="#0369A1" />
      <stop offset="100%" stop-color="#082F49" />
    </linearGradient>

    <!-- Soft Drop Shadow Filter -->
    <filter id="shadowHeavy" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#000000" flood-opacity="0.6" />
    </filter>
    
    <filter id="textGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.8" />
    </filter>
  </defs>

  <!-- 1. BASE BACKGROUND & PARCHMENT TEXTURE -->
  <rect width="1280" height="720" fill="url(#bgGrad)" />
  <rect width="1280" height="720" fill="url(#parchmentGlow)" />

  <!-- Background Vintage Map & Script Linework Overlay -->
  <g opacity="0.06" stroke="#FFFFFF" stroke-width="1.2">
    <circle cx="1060" cy="300" r="160" />
    <circle cx="1060" cy="300" r="240" />
    <circle cx="1060" cy="300" r="320" />
    <line x1="0" y1="360" x2="1280" y2="360" stroke-dasharray="10 10" />
    <line x1="640" y1="0" x2="640" y2="720" stroke-dasharray="10 10" />
  </g>

  <!-- 2. ASHOKA CHAKRA 24-SPOKE WATERMARK (RIGHT SIDE) -->
  <g transform="translate(1060, 300)" opacity="0.14" stroke="#FDE047" stroke-width="2.5" fill="none">
    <circle cx="0" cy="0" r="150" />
    <circle cx="0" cy="0" r="142" />
    <circle cx="0" cy="0" r="30" fill="#FDE047" />
    <!-- 24 Spokes -->
    ${[...Array(24)].map((_, i) => `<line x1="0" y1="0" x2="${Math.cos(i * 15 * Math.PI / 180) * 142}" y2="${Math.sin(i * 15 * Math.PI / 180) * 142}" stroke-width="2" />`).join('')}
  </g>

  <!-- 3. LEFT SIDE: INDIAN PARLIAMENT / SAN SAD COLONNADE ILLUSION -->
  <g transform="translate(30, 360)" opacity="0.25">
    <path d="M0 320 L0 100 Q180 50 360 80 L360 320 Z" fill="#1E293B" />
    <!-- Pillars -->
    ${[...Array(10)].map((_, i) => `<rect x="${20 + i * 32}" y="110" width="16" height="200" rx="3" fill="#334155" />`).join('')}
    <rect x="10" y="85" width="340" height="25" rx="4" fill="#475569" />
  </g>

  <!-- 4. LEFT SIDE: INDIAN NATIONAL TRICOLOUR FLAG WAVING -->
  <g transform="translate(30, 40)" filter="url(#shadowHeavy)">
    <!-- Flagpole -->
    <rect x="0" y="0" width="8" height="340" rx="4" fill="#D1D5DB" />
    <circle cx="4" cy="0" r="9" fill="#F59E0B" />
    <!-- Waving Flag Cloth -->
    <path d="M8 10 C80 -5, 140 25, 230 10 C270 2, 290 8, 320 2 L320 65 C290 71, 270 65, 230 73 C140 88, 80 58, 8 73 Z" fill="#FF9933" />
    <path d="M8 73 C80 58, 140 88, 230 73 C270 65, 290 71, 320 65 L320 128 C290 134, 270 128, 230 136 C140 151, 80 121, 8 136 Z" fill="#FFFFFF" />
    <path d="M8 136 C80 121, 140 151, 230 136 C270 128, 290 134, 320 128 L320 191 C290 197, 270 191, 230 199 C140 214, 80 184, 8 199 Z" fill="#138808" />
    <!-- Flag Chakra -->
    <g transform="translate(164, 104)">
      <circle cx="0" cy="0" r="18" stroke="#000080" stroke-width="2.5" fill="none" />
      <circle cx="0" cy="0" r="4" fill="#000080" />
      ${[...Array(12)].map((_, i) => `<line x1="0" y1="0" x2="${Math.cos(i * 30 * Math.PI / 180) * 18}" y2="${Math.sin(i * 30 * Math.PI / 180) * 18}" stroke="#000080" stroke-width="1.2" />`).join('')}
    </g>
  </g>

  <!-- 5. LEFT BOTTOM: GOLDEN ASHOKA LION CAPITAL STATUE (EMBLEM) -->
  <g transform="translate(50, 410)" filter="url(#shadowHeavy)">
    <!-- Base Circular Pillar -->
    <ellipse cx="65" cy="220" rx="60" ry="18" fill="#78350F" />
    <rect x="15" y="150" width="100" height="70" fill="#B45309" rx="6" />
    <ellipse cx="65" cy="150" rx="52" ry="14" fill="#D97706" />
    <!-- Lion Silhouette & Sculpted Golden Figure -->
    <path d="M40 145 C35 110, 45 80, 50 60 C52 45, 60 30, 65 20 C70 30, 78 45, 80 60 C85 80, 95 110, 90 145 Z" fill="#F59E0B" />
    <path d="M25 140 C20 110, 30 85, 38 65 C45 90, 50 115, 52 140 Z" fill="#D97706" />
    <path d="M105 140 C110 110, 100 85, 92 65 C85 90, 80 115, 78 140 Z" fill="#D97706" />
    <!-- Chakra in Base -->
    <circle cx="65" cy="185" r="14" stroke="#FEF08A" stroke-width="2.5" fill="none" />
  </g>

  <!-- 6. RIGHT BOTTOM: VINTAGE LEATHER LAW BOOKS WITH GOLD LETTERING -->
  <g transform="translate(860, 440)" filter="url(#shadowHeavy)">
    <!-- Book 1 (Bottom Dark Blue) -->
    <g transform="translate(0, 140)">
      <rect x="0" y="0" width="370" height="60" rx="8" fill="url(#bookSpine1)" stroke="#475569" stroke-width="1.5" />
      <rect x="355" y="6" width="12" height="48" fill="#F8FAFC" rx="2" />
      <line x1="30" y1="0" x2="30" y2="60" stroke="#FDE047" stroke-width="2" />
      <line x1="34" y1="0" x2="34" y2="60" stroke="#FDE047" stroke-width="1" />
      <text x="50" y="38" fill="#FEF08A" font-family="-apple-system, BlinkMacSystemFont, 'Times New Roman', serif" font-size="16" font-weight="900" letter-spacing="2">
        ${c.book3}
      </text>
    </g>

    <!-- Book 2 (Middle Maroon/Brown) -->
    <g transform="translate(15, 70)">
      <rect x="0" y="0" width="360" height="60" rx="8" fill="url(#bookSpine2)" stroke="#92400E" stroke-width="1.5" />
      <rect x="345" y="6" width="12" height="48" fill="#F8FAFC" rx="2" />
      <line x1="30" y1="0" x2="30" y2="60" stroke="#FDE047" stroke-width="2" />
      <line x1="34" y1="0" x2="34" y2="60" stroke="#FDE047" stroke-width="1" />
      <text x="50" y="38" fill="#FEF08A" font-family="-apple-system, BlinkMacSystemFont, 'Times New Roman', serif" font-size="16" font-weight="900" letter-spacing="2">
        ${c.book2}
      </text>
    </g>

    <!-- Book 3 (Top Deep Navy) -->
    <g transform="translate(30, 0)">
      <rect x="0" y="0" width="350" height="60" rx="8" fill="url(#bookSpine3)" stroke="#0284C7" stroke-width="1.5" />
      <rect x="335" y="6" width="12" height="48" fill="#F8FAFC" rx="2" />
      <line x1="30" y1="0" x2="30" y2="60" stroke="#FDE047" stroke-width="2" />
      <line x1="34" y1="0" x2="34" y2="60" stroke="#FDE047" stroke-width="1" />
      <text x="50" y="38" fill="#FEF08A" font-family="-apple-system, BlinkMacSystemFont, 'Times New Roman', serif" font-size="16" font-weight="900" letter-spacing="2">
        ${c.book1}
      </text>
    </g>

    <!-- Vintage Golden Spectacles on top of books -->
    <g transform="translate(130, -35)" stroke="#FDE047" stroke-width="3" fill="none" opacity="0.95">
      <circle cx="40" cy="20" r="22" stroke-width="3.5" fill="#FFFFFF" fill-opacity="0.1" />
      <circle cx="110" cy="20" r="22" stroke-width="3.5" fill="#FFFFFF" fill-opacity="0.1" />
      <path d="M62 20 Q75 12 88 20" stroke-width="3" />
      <path d="M18 18 L-5 14" stroke-width="3" />
      <path d="M132 18 L155 14" stroke-width="3" />
    </g>

    <!-- Gold Luxury Fountain Pen -->
    <g transform="translate(20, 210) rotate(-12)" filter="url(#shadowHeavy)">
      <rect x="0" y="0" width="180" height="12" rx="6" fill="#0F172A" stroke="#FDE047" stroke-width="2" />
      <polygon points="180,0 205,6 180,12" fill="#F59E0B" />
      <rect x="50" y="0" width="8" height="12" fill="#FDE047" />
    </g>
  </g>

  <!-- 7. CENTER TOP: DOME ICON & COMPLETE NOTES SUBHEADER -->
  <g transform="translate(640, 75)" text-anchor="middle">
    <!-- Parliament Dome Icon -->
    <g transform="translate(-18, -42) scale(1.5)" fill="#FFFFFF">
      <path d="M12 2C8 2 5 5 5 8v2h14V8c0-3-3-6-7-6zm-8 10h16v2H4zm2 4h12v4H6z" />
    </g>
    <!-- Lines flanking COMPLETE NOTES -->
    <line x1="-280" y1="2" x2="-140" y2="2" stroke="#64748B" stroke-width="2" />
    <line x1="140" y1="2" x2="280" y2="2" stroke="#64748B" stroke-width="2" />
    <text x="0" y="8" fill="#CBD5E1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" letter-spacing="5">
      ${c.headerPart}
    </text>
  </g>

  <!-- 8. CENTER MAIN TITLE: 2-TONE LUXURY TYPOGRAPHY -->
  <g transform="translate(640, 185)" text-anchor="middle" filter="url(#textGlow)">
    <!-- Line 1 (White Serif) -->
    <text x="0" y="0" fill="#FFFFFF" font-family="'Times New Roman', Georgia, serif" font-size="76" font-weight="900" letter-spacing="3">
      ${c.titleLine1}
    </text>

    <!-- Line 2 (Golden Serif) -->
    <text x="0" y="82" fill="url(#goldTextGrad)" font-family="'Times New Roman', Georgia, serif" font-size="86" font-weight="900" letter-spacing="4">
      ${c.titleLine2}
    </text>
  </g>

  <!-- 9. CENTER: TAGLINE & RIBBON PILL -->
  <g transform="translate(640, 310)" text-anchor="middle">
    <!-- Tagline (CONSTITUTION • GOVERNANCE • DEMOCRACY style) -->
    <text x="0" y="0" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" letter-spacing="3.5">
      ${c.tagline}
    </text>

    <!-- Golden Ribbon Pill -->
    <g transform="translate(-210, 22)">
      <polygon points="0,20 15,0 405,0 420,20 405,40 15,40" fill="url(#ribbonGrad)" filter="url(#shadowHeavy)" />
      <text x="210" y="26" fill="#0F172A" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" letter-spacing="2" text-anchor="middle">
        📖 ${c.pill}
      </text>
    </g>
  </g>

  <!-- 10. CENTER BOTTOM: 4 CIRCULAR FEATURE BADGES -->
  <g transform="translate(640, 425)" text-anchor="middle">
    <!-- Badge 1: Clear Concepts -->
    <g transform="translate(-210, 0)">
      <circle cx="0" cy="0" r="28" fill="#0F172A" stroke="#38BDF8" stroke-width="2.5" />
      <text x="0" y="8" font-size="20">📖</text>
      <text x="0" y="44" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" font-weight="700">Clear</text>
      <text x="0" y="58" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="600">Concepts</text>
    </g>

    <!-- Badge 2: Articles & Amendments -->
    <g transform="translate(-70, 0)">
      <circle cx="0" cy="0" r="28" fill="#0F172A" stroke="#F59E0B" stroke-width="2.5" />
      <text x="0" y="8" font-size="20">⚖️</text>
      <text x="0" y="44" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" font-weight="700">Articles &amp;</text>
      <text x="0" y="58" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="600">Amendments</text>
    </g>

    <!-- Badge 3: Institutions & Functions -->
    <g transform="translate(70, 0)">
      <circle cx="0" cy="0" r="28" fill="#0F172A" stroke="#10B981" stroke-width="2.5" />
      <text x="0" y="8" font-size="20">🏛️</text>
      <text x="0" y="44" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" font-weight="700">Institutions &amp;</text>
      <text x="0" y="58" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="600">Functions</text>
    </g>

    <!-- Badge 4: Practice MCQs -->
    <g transform="translate(210, 0)">
      <circle cx="0" cy="0" r="28" fill="#0F172A" stroke="#A855F7" stroke-width="2.5" />
      <text x="0" y="8" font-size="20">🎯</text>
      <text x="0" y="44" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" font-weight="700">Chapter</text>
      <text x="0" y="58" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="600">Assessment</text>
    </g>
  </g>

  <!-- 11. BOTTOM GOLD EMBOSSED STRIP & SEAL -->
  <g transform="translate(640, 670)">
    <line x1="-640" y1="0" x2="640" y2="0" stroke="url(#goldTextGrad)" stroke-width="3" />
    <circle cx="0" cy="0" r="22" fill="#0F172A" stroke="url(#goldTextGrad)" stroke-width="3" />
    <text x="0" y="6" font-size="16" text-anchor="middle">📖</text>
  </g>
</svg>`;
}

chapters.forEach((c) => {
  const svgContent = generateDetailedArtwork(c);
  const filePath = path.join(outDir, c.filename);
  fs.writeFileSync(filePath, svgContent, 'utf8');
  console.log(`✅ Generated Cover Art matching user reference: ${c.filename}`);
});

console.log('🎉 All 16 Chapter Covers regenerated with exact reference aesthetics!');
