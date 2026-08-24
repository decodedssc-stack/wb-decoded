import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'images', 'polity');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('🎨 GENERATING 16 PREMIUM EDITORIAL CHAPTER COVER ARTWORKS...');

const covers = [
  {
    filename: 'chapter-01-historical-background.svg',
    title: 'Historical Background',
    subtitle: 'From Regulating Act 1773 to Indian Independence Act 1947',
    part: 'CONSTITUTIONAL GENESIS',
    tag: '1773 – 1947',
    gradient: ['#1E3A8A', '#1D4ED8', '#2563EB'],
    accent: '#F59E0B',
    icon: '🏛️',
    bgIcon: 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.6 4.8 8 12 4.8zM4 9.6l7 3.5v6.5l-7-3.5V9.6zm9 10v-6.5l7-3.5v6.5l-7 3.5z'
  },
  {
    filename: 'chapter-02-making-of-the-constitution.svg',
    title: 'Making of the Constitution',
    subtitle: 'Constituent Assembly, Drafting Committee & Enactment',
    part: 'SAMVIDHAN SABHA',
    tag: '2 Yrs 11 Mos 18 Days',
    gradient: ['#0F766E', '#0D9488', '#14B8A6'],
    accent: '#FCD34D',
    icon: '📜',
    bgIcon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'
  },
  {
    filename: 'chapter-03-salient-features-and-schedules.svg',
    title: 'Salient Features & Schedules',
    subtitle: 'Constitutional Borrowings, 12 Schedules & Federal Structure',
    part: 'FRAMEWORK & SOURCES',
    tag: '12 Schedules • 25 Parts',
    gradient: ['#4338CA', '#4F46E5', '#6366F1'],
    accent: '#FBBF24',
    icon: '📑',
    bgIcon: 'M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z'
  },
  {
    filename: 'chapter-04-preamble-of-the-constitution.svg',
    title: 'The Preamble',
    subtitle: 'Identity Card, Philosophy & Basic Structure Doctrine',
    part: 'SOUL OF CONSTITUTION',
    tag: '42nd Amendment 1976',
    gradient: ['#B45309', '#D97706', '#F59E0B'],
    accent: '#FEF08A',
    icon: '✨',
    bgIcon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
  },
  {
    filename: 'chapter-05-union-and-its-territory.svg',
    title: 'Union & Its Territory',
    subtitle: 'Articles 1 to 4 • State Reorganisation & Integration',
    part: 'PART I',
    tag: '28 States • 8 UTs',
    gradient: ['#0369A1', '#0284C7', '#38BDF8'],
    accent: '#FDE047',
    icon: '🗺️',
    bgIcon: 'M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z'
  },
  {
    filename: 'chapter-06-citizenship.svg',
    title: 'Citizenship in India',
    subtitle: 'Articles 5 to 11 • Citizenship Act 1955 & Amendments',
    part: 'PART II',
    tag: 'Single Citizenship',
    gradient: ['#047857', '#059669', '#10B981'],
    accent: '#FDE68A',
    icon: '🛡️',
    bgIcon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z'
  },
  {
    filename: 'chapter-07-fundamental-rights.svg',
    title: 'Fundamental Rights & Writs',
    subtitle: 'Articles 12 to 35 • Magna Carta of India & Article 32',
    part: 'PART III',
    tag: '6 Fundamental Rights',
    gradient: ['#1E1B4B', '#312E81', '#4338CA'],
    accent: '#F59E0B',
    icon: '⚖️',
    bgIcon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  },
  {
    filename: 'chapter-08-directive-principles-and-duties.svg',
    title: 'DPSP & Fundamental Duties',
    subtitle: 'Articles 36 to 51 (Part IV) & Article 51A (Part IVA)',
    part: 'PART IV & IVA',
    tag: 'Socio-Economic Justice',
    gradient: ['#854D0E', '#A16207', '#CA8A04'],
    accent: '#FEF08A',
    icon: '🌟',
    bgIcon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
  },
  {
    filename: 'chapter-09-the-president-of-india.svg',
    title: 'The President of India',
    subtitle: 'Articles 52 to 73 • Executive Powers, Pardoning & Ordinances',
    part: 'PART V : UNION EXECUTIVE',
    tag: 'First Citizen of India',
    gradient: ['#991B1B', '#B91C1C', '#DC2626'],
    accent: '#FDE047',
    icon: '🏛️',
    bgIcon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z'
  },
  {
    filename: 'chapter-10-vice-president-and-prime-minister.svg',
    title: 'VP, PM & Council of Ministers',
    subtitle: 'Articles 63 to 78 • Real Executive & Cabinet Government',
    part: 'PART V : UNION EXECUTIVE',
    tag: 'Cabinet Leadership',
    gradient: ['#1F2937', '#374151', '#4B5563'],
    accent: '#38BDF8',
    icon: '👔',
    bgIcon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'
  },
  {
    filename: 'chapter-11-law-officers-ag-and-advocate-general.svg',
    title: 'Law Officers of the Nation',
    subtitle: 'Attorney General (Art 76) & Advocate General (Art 165)',
    part: 'CONSTITUTIONAL LAW OFFICERS',
    tag: 'Chief Legal Advisors',
    gradient: ['#3730A3', '#4338CA', '#4F46E5'],
    accent: '#FCD34D',
    icon: '⚖️',
    bgIcon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'
  },
  {
    filename: 'chapter-12-state-executive-and-governor.svg',
    title: 'The State Executive',
    subtitle: 'Governor, Chief Minister & State Council of Ministers',
    part: 'PART VI : STATE EXECUTIVE',
    tag: 'Articles 152 to 167',
    gradient: ['#065F46', '#047857', '#059669'],
    accent: '#FDE68A',
    icon: '🏰',
    bgIcon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z'
  },
  {
    filename: 'chapter-13-the-parliament-of-india.svg',
    title: 'The Parliament of India',
    subtitle: 'Lok Sabha, Rajya Sabha, Parliamentary Bills & Motions',
    part: 'PART V : UNION LEGISLATURE',
    tag: 'Articles 79 to 122',
    gradient: ['#1E3A8A', '#2563EB', '#3B82F6'],
    accent: '#F59E0B',
    icon: '🏛️',
    bgIcon: 'M12 1L2 6v2h20V6L12 1zM4 19h16v2H4v-2zm2-9h3v7H6v-7zm5 0h3v7h-3v-7zm5 0h3v7h-3v-7z'
  },
  {
    filename: 'chapter-14-supreme-court-of-india.svg',
    title: 'Supreme Court of India',
    subtitle: 'Apex Court, Collegium System & Judicial Review',
    part: 'PART V : UNION JUDICIARY',
    tag: 'Articles 124 to 147',
    gradient: ['#581C87', '#6B21A8', '#7E22CE'],
    accent: '#FDE047',
    icon: '⚖️',
    bgIcon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z'
  },
  {
    filename: 'chapter-15-state-judiciary-high-courts.svg',
    title: 'State Judiciary & High Courts',
    subtitle: 'High Courts, Subordinate Courts & Article 226 Writs',
    part: 'PART VI : STATE JUDICIARY',
    tag: 'Articles 214 to 237',
    gradient: ['#1E293B', '#334155', '#475569'],
    accent: '#38BDF8',
    icon: '🏛️',
    bgIcon: 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 5.28 5.18 9 12 12.72 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z'
  },
  {
    filename: 'chapter-16-panchayati-raj-and-local-government.svg',
    title: 'Local Self-Government',
    subtitle: 'Panchayati Raj (73rd Amend) & Municipalities (74th Amend)',
    part: 'PART IX & IX-A',
    tag: 'Democratic Decentralisation',
    gradient: ['#15803D', '#16A34A', '#22C55E'],
    accent: '#FEF08A',
    icon: '🌳',
    bgIcon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
  }
];

function generateCoverSvg(c, index) {
  const chNum = (index + 1).toString().padStart(2, '0');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="450" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="800" y2="450" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${c.gradient[0]}" />
      <stop offset="50%" stop-color="${c.gradient[1]}" />
      <stop offset="100%" stop-color="${c.gradient[2]}" />
    </linearGradient>

    <!-- Overlay Gradient for Depth -->
    <linearGradient id="overlayGrad" x1="0" y1="0" x2="800" y2="450" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.6" />
    </linearGradient>

    <!-- Gold Accent Gradient -->
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="100%" stop-color="#F59E0B" />
    </linearGradient>

    <filter id="cardShadow" x="-10" y="-10" width="820" height="470" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.3" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="800" height="450" fill="url(#bgGrad)" />
  <rect width="800" height="450" fill="url(#overlayGrad)" />

  <!-- Subtle Geometric Guilloche / Grid Pattern -->
  <g opacity="0.08" stroke="#FFFFFF" stroke-width="1.5">
    <circle cx="700" cy="100" r="180" />
    <circle cx="700" cy="100" r="260" />
    <circle cx="700" cy="100" r="340" />
    <circle cx="100" cy="400" r="220" />
    <circle cx="100" cy="400" r="300" />
    <line x1="0" y1="225" x2="800" y2="225" stroke-dasharray="8 8" />
  </g>

  <!-- Large Faded Background Watermark Icon -->
  <g opacity="0.12" fill="#FFFFFF" transform="translate(520, 60) scale(12)">
    <path d="${c.bgIcon}" />
  </g>

  <!-- Top Pill / Part Reference Header -->
  <g transform="translate(60, 50)">
    <rect width="180" height="34" rx="17" fill="#FFFFFF" fill-opacity="0.15" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="1.5" />
    <text x="90" y="22" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" letter-spacing="1.5" text-anchor="middle">
      ${c.part}
    </text>
  </g>

  <!-- Chapter Number Gold Badge (Right Top) -->
  <g transform="translate(630, 45)">
    <rect width="110" height="44" rx="14" fill="url(#goldGrad)" />
    <text x="55" y="28" fill="#0F172A" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="900" text-anchor="middle" letter-spacing="0.5">
      CH ${chNum}
    </text>
  </g>

  <!-- Main Title Area -->
  <g transform="translate(60, 150)">
    <!-- Chapter Main Title -->
    <text x="0" y="70" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" letter-spacing="-0.5">
      ${c.title}
    </text>

    <!-- Subtitle / Scope -->
    <text x="0" y="115" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="500" opacity="0.95">
      ${c.subtitle}
    </text>
  </g>

  <!-- Bottom Details Bar -->
  <g transform="translate(60, 350)">
    <!-- Scope Tag Pill -->
    <rect x="0" y="0" width="220" height="38" rx="10" fill="#000000" fill-opacity="0.3" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="1" />
    <text x="110" y="24" fill="${c.accent}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" text-anchor="middle">
      ★ ${c.tag}
    </text>

    <!-- WB Decoded Official Branding Badge (Bottom Right) -->
    <g transform="translate(560, 0)">
      <rect width="120" height="38" rx="10" fill="#FFFFFF" fill-opacity="0.12" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="1" />
      <text x="60" y="24" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="1">
        WB DECODED
      </text>
    </g>
  </g>

  <!-- Golden Bottom Accent Line -->
  <rect x="0" y="444" width="800" height="6" fill="url(#goldGrad)" />
</svg>`;
}

covers.forEach((c, idx) => {
  const svgContent = generateCoverSvg(c, idx);
  const filePath = path.join(outDir, c.filename);
  fs.writeFileSync(filePath, svgContent, 'utf8');
  console.log(`✅ Generated Cover: ${c.filename}`);
});

console.log('🎉 All 16 Chapter Cover Artworks generated successfully in public/images/polity/!');
