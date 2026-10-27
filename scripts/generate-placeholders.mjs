import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(rootDir, 'public', 'images');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function createArchitecturalSvg({
  title,
  category,
  floors = 7,
  variant = 'exterior',
}) {
  const isHero = variant === 'hero';
  const isInterior = variant === 'interior';
  const isPark = variant === 'park';
  const isConstruction = variant === 'construction';

  let sceneMarkup = '';

  if (isInterior) {
    sceneMarkup = `
      <defs>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F6F3EC"/>
          <stop offset="50%" stop-color="#EAE3D5"/>
          <stop offset="100%" stop-color="#D9CEBC"/>
        </linearGradient>
        <linearGradient id="skyView" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8AB0C9"/>
          <stop offset="65%" stop-color="#D7E4EC"/>
          <stop offset="100%" stop-color="#F4E3C9"/>
        </linearGradient>
        <linearGradient id="sunGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#E46800" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="#E46800" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#wallGrad)"/>
      <!-- Ceiling & Warm Oak Floor -->
      <polygon points="0,0 1600,0 1340,160 260,160" fill="#FAF8F4"/>
      <polygon points="260,730 1340,730 1600,1000 0,1000" fill="#C9B296"/>
      <!-- Floorboard perspective lines -->
      <line x1="500" y1="730" x2="300" y2="1000" stroke="#B69D7F" stroke-width="2"/>
      <line x1="800" y1="730" x2="800" y2="1000" stroke="#B69D7F" stroke-width="2"/>
      <line x1="1100" y1="730" x2="1300" y2="1000" stroke="#B69D7F" stroke-width="2"/>
      <!-- Floor-to-ceiling panoramic window -->
      <rect x="340" y="160" width="920" height="570" fill="url(#skyView)" stroke="#16191F" stroke-width="10"/>
      <!-- Distant mountains & cityscape -->
      <polygon points="340,560 560,410 780,500 1040,360 1260,480 1260,730 340,730" fill="#5D7466" opacity="0.6"/>
      <polygon points="340,620 640,510 920,580 1260,490 1260,730 340,730" fill="#3B4D43" opacity="0.75"/>
      <!-- Window mullions -->
      <line x1="646" y1="160" x2="646" y2="730" stroke="#16191F" stroke-width="8"/>
      <line x1="952" y1="160" x2="952" y2="730" stroke="#16191F" stroke-width="8"/>
      <line x1="340" y1="580" x2="1260" y2="580" stroke="#16191F" stroke-width="5"/>
      <!-- Sunlight cast across room -->
      <polygon points="340,160 1260,160 1550,1000 100,1000" fill="url(#sunGlow)"/>
      <!-- Designer Lounge Sofa -->
      <rect x="440" y="640" width="720" height="105" rx="16" fill="#F8F6F1" stroke="#D5CEC2" stroke-width="3"/>
      <rect x="410" y="685" width="780" height="65" rx="12" fill="#EAE4D8"/>
      <rect x="640" y="780" width="320" height="32" rx="8" fill="#16191F"/>
      <rect x="740" y="762" width="120" height="18" rx="4" fill="#E46800"/>
    `;
  } else if (isPark) {
    sceneMarkup = `
      <defs>
        <linearGradient id="parkSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3C586E"/>
          <stop offset="55%" stop-color="#8FAEC2"/>
          <stop offset="100%" stop-color="#EAD8C0"/>
        </linearGradient>
        <linearGradient id="winGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFE3B8"/>
          <stop offset="100%" stop-color="#E48A30"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#parkSky)"/>
      <!-- Landscaped lawn & stone courtyard -->
      <rect x="0" y="650" width="1600" height="350" fill="#465E47"/>
      <polygon points="580,650 1020,650 1360,1000 240,1000" fill="#DCD5C7"/>
      <!-- Modern residential building backdrop -->
      <rect x="240" y="130" width="1120" height="520" rx="8" fill="#F4F1EA" stroke="#16191F" stroke-width="4"/>
      <rect x="230" y="116" width="1140" height="18" fill="#16191F"/>
      <rect x="240" y="555" width="1120" height="10" fill="#E46800"/>
      <!-- Illuminated apartment windows -->
      ${Array.from({ length: 4 })
        .map((_, r) =>
          Array.from({ length: 8 })
            .map((__, c) => {
              const warm = (r + c) % 3 === 0;
              return `<rect x="${290 + c * 130}" y="${175 + r * 92}" width="92" height="62" rx="4" fill="${
                warm ? 'url(#winGlow)' : '#6C879A'
              }" stroke="#16191F" stroke-width="3"/>`;
            })
            .join('')
        )
        .join('')}
      <!-- Lush courtyard trees -->
      <circle cx="330" cy="580" r="105" fill="#5D7B58"/>
      <circle cx="360" cy="560" r="85" fill="#77966F"/>
      <rect x="322" y="640" width="16" height="90" fill="#3D312A"/>
      <circle cx="1270" cy="570" r="115" fill="#557350"/>
      <circle cx="1240" cy="550" r="88" fill="#77966F"/>
      <rect x="1262" y="635" width="16" height="95" fill="#3D312A"/>
      <!-- Architectural bollards & benches -->
      <rect x="460" y="775" width="160" height="22" rx="6" fill="#E46800"/>
      <rect x="980" y="775" width="160" height="22" rx="6" fill="#E46800"/>
    `;
  } else if (isConstruction) {
    sceneMarkup = `
      <defs>
        <linearGradient id="siteSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1E2936"/>
          <stop offset="60%" stop-color="#4B6378"/>
          <stop offset="100%" stop-color="#D9A875"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#siteSky)"/>
      <rect x="0" y="750" width="1600" height="250" fill="#2A2E35"/>
      <!-- Tower Cranes -->
      <rect x="1180" y="100" width="24" height="650" fill="#E46800"/>
      <rect x="620" y="115" width="720" height="20" fill="#E46800"/>
      <line x1="1192" y1="60" x2="780" y2="115" stroke="#E46800" stroke-width="5"/>
      <line x1="1192" y1="60" x2="1320" y2="115" stroke="#E46800" stroke-width="5"/>
      <line x1="820" y1="135" x2="820" y2="300" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="10 6"/>
      <!-- Rising Concrete Superstructure -->
      <rect x="340" y="300" width="720" height="450" fill="#E6E3DC" fill-opacity="0.15" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="3"/>
      ${Array.from({ length: 5 })
        .map(
          (_, i) =>
            `<rect x="320" y="${300 + i * 95}" width="760" height="18" fill="#D5D1C8"/>`
        )
        .join('')}
      ${Array.from({ length: 6 })
        .map(
          (_, i) =>
            `<rect x="${360 + i * 130}" y="270" width="18" height="480" fill="#C4C0B7"/>`
        )
        .join('')}
    `;
  } else {
    // Exterior / Hero architectural elevation with golden-hour reflections & dramatic depth
    const bldgHeight = Math.min(600, floors * 72);
    const bldgTop = 770 - bldgHeight;
    sceneMarkup = `
      <defs>
        <linearGradient id="heroSky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${isHero ? '#1B2530' : '#2C3E50'}"/>
          <stop offset="55%" stop-color="${isHero ? '#3A5068' : '#58748C'}"/>
          <stop offset="100%" stop-color="#D49B6A"/>
        </linearGradient>
        <linearGradient id="glassRef" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#8FB3C9"/>
          <stop offset="60%" stop-color="#436076"/>
          <stop offset="100%" stop-color="#273947"/>
        </linearGradient>
        <linearGradient id="warmRoom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFE6BA"/>
          <stop offset="100%" stop-color="#E47A18"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#heroSky)"/>
      <!-- Shar Mountain range silhouette -->
      <polygon points="0,770 280,490 610,620 980,430 1320,580 1600,460 1600,770" fill="#1E2933" opacity="0.55"/>
      <!-- Ground Plaza -->
      <rect x="0" y="770" width="1600" height="230" fill="#23272E"/>
      <polygon points="450,770 1150,770 1480,1000 120,1000" fill="#323740"/>
      <!-- Left Architectural Wing -->
      <rect x="210" y="${bldgTop + 60}" width="400" height="${bldgHeight - 60}" rx="4" fill="#EAE6DD" stroke="#16191F" stroke-width="4"/>
      <!-- Right Architectural Wing -->
      <rect x="1040" y="${bldgTop + 80}" width="340" height="${bldgHeight - 80}" rx="4" fill="#DFDBD0" stroke="#16191F" stroke-width="4"/>
      <!-- Main Central Tower Volume -->
      <rect x="540" y="${bldgTop}" width="550" height="${bldgHeight}" rx="4" fill="#F8F6F1" stroke="#16191F" stroke-width="5"/>
      <!-- Cantilevered Roof Cornice & Brand Fin -->
      <rect x="520" y="${bldgTop - 14}" width="590" height="16" fill="#16191F"/>
      <rect x="540" y="${bldgTop + 14}" width="550" height="10" fill="#E46800"/>
      <rect x="588" y="${bldgTop + 24}" width="14" height="${bldgHeight - 95}" fill="#E46800"/>
      <!-- Main Tower Recessed Balconies & Warm Lit Windows -->
      ${Array.from({ length: Math.min(floors, 7) })
        .map((_, r) => {
          const y = bldgTop + 44 + r * 68;
          const isLit1 = (r + 1) % 2 === 0;
          const isLit2 = r % 3 === 0;
          return `
            <line x1="540" y1="${y + 54}" x2="1090" y2="${y + 54}" stroke="#CFC9BC" stroke-width="4"/>
            <rect x="630" y="${y}" width="120" height="46" rx="2" fill="${isLit1 ? 'url(#warmRoom)' : 'url(#glassRef)'}" stroke="#16191F" stroke-width="2.5"/>
            <rect x="775" y="${y}" width="140" height="46" rx="2" fill="${isLit2 ? 'url(#warmRoom)' : 'url(#glassRef)'}" stroke="#16191F" stroke-width="2.5"/>
            <rect x="940" y="${y}" width="120" height="46" rx="2" fill="${!isLit1 ? 'url(#warmRoom)' : 'url(#glassRef)'}" stroke="#16191F" stroke-width="2.5"/>
            <rect x="768" y="${y + 30}" width="154" height="18" fill="#FFFFFF" fill-opacity="0.55" stroke="#16191F" stroke-width="1.5"/>
          `;
        })
        .join('')}
      <!-- Left Wing Windows -->
      ${Array.from({ length: Math.max(3, Math.min(floors - 1, 6)) })
        .map((_, r) => {
          const y = bldgTop + 92 + r * 68;
          return `
            <rect x="255" y="${y}" width="110" height="42" rx="2" fill="url(#glassRef)" stroke="#16191F" stroke-width="2"/>
            <rect x="390" y="${y}" width="110" height="42" rx="2" fill="${r % 2 === 0 ? 'url(#warmRoom)' : 'url(#glassRef)'}" stroke="#16191F" stroke-width="2"/>
          `;
        })
        .join('')}
      <!-- Right Wing Windows -->
      ${Array.from({ length: Math.max(3, Math.min(floors - 2, 5)) })
        .map((_, r) => {
          const y = bldgTop + 115 + r * 68;
          return `
            <rect x="1115" y="${y}" width="100" height="42" rx="2" fill="${r % 2 === 1 ? 'url(#warmRoom)' : 'url(#glassRef)'}" stroke="#16191F" stroke-width="2"/>
            <rect x="1235" y="${y}" width="100" height="42" rx="2" fill="url(#glassRef)" stroke="#16191F" stroke-width="2"/>
          `;
        })
        .join('')}
      <!-- Double-Height Glazed Lobby -->
      <rect x="540" y="695" width="550" height="75" fill="#16191F"/>
      <rect x="630" y="707" width="370" height="63" fill="url(#warmRoom)" opacity="0.9"/>
      <!-- Trees & Landscape -->
      <circle cx="160" cy="705" r="68" fill="#4E6B4A"/>
      <rect x="154" y="740" width="12" height="35" fill="#2D2520"/>
      <circle cx="1440" cy="700" r="74" fill="#4E6B4A"/>
      <rect x="1434" y="735" width="12" height="38" fill="#2D2520"/>
    `;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000" role="img" aria-label="${title}">
  ${sceneMarkup}
  <!-- Subtle architectural watermark pill top-right -->
  <g transform="translate(1180, 40)" opacity="0.85">
    <rect x="0" y="0" width="370" height="44" rx="22" fill="#0F1217" fill-opacity="0.55" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="1"/>
    <circle cx="24" cy="22" r="5" fill="#E46800"/>
    <text x="40" y="27" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" letter-spacing="1.5">SHERIAG • ${category.toUpperCase()}</text>
  </g>
</svg>`;
}

const assets = [
  {
    file: 'hero/gostivar-hero.svg',
    title: 'SHERIAG Residential Architecture',
    category: 'Gostivar',
    floors: 8,
    variant: 'hero',
  },
  {
    file: 'about/company-architecture.svg',
    title: 'SHERIAG Engineering & Development',
    category: 'Developer & Builder',
    floors: 8,
    variant: 'exterior',
  },
  {
    file: 'residences/sheriag-new-residence/render-main.svg',
    title: 'SHERIAG New Residence — Exterior Render',
    category: 'Under Construction',
    floors: 8,
    variant: 'exterior',
  },
  {
    file: 'residences/sheriag-new-residence/render-courtyard.svg',
    title: 'SHERIAG New Residence — Private Park & Courtyard',
    category: 'Park & Surroundings',
    floors: 8,
    variant: 'park',
  },
  {
    file: 'residences/sheriag-new-residence/interior-living.svg',
    title: 'SHERIAG New Residence — Daylit Living Space',
    category: 'Interior Layout',
    floors: 8,
    variant: 'interior',
  },
  {
    file: 'residences/sheriag-new-residence/construction-site.svg',
    title: 'SHERIAG New Residence — Active Construction Site',
    category: 'Construction Update',
    floors: 8,
    variant: 'construction',
  },
  {
    file: 'residences/residence-one/exterior-main.svg',
    title: 'Residence One — Completed Building',
    category: 'Residence One',
    floors: 6,
    variant: 'exterior',
  },
  {
    file: 'residences/residence-one/surroundings-park.svg',
    title: 'Residence One — Parking & Green Area',
    category: 'Park & Parking',
    floors: 6,
    variant: 'park',
  },
  {
    file: 'residences/residence-two/exterior-main.svg',
    title: 'Residence Two — Completed Building',
    category: 'Residence Two',
    floors: 7,
    variant: 'exterior',
  },
  {
    file: 'residences/residence-two/interior-sample.svg',
    title: 'Residence Two — Apartment Interior',
    category: 'Interior',
    floors: 7,
    variant: 'interior',
  },
  {
    file: 'residences/residence-three/exterior-main.svg',
    title: 'Residence Three — Completed Building',
    category: 'Residence Three',
    floors: 7,
    variant: 'exterior',
  },
  {
    file: 'residences/residence-three/surroundings-park.svg',
    title: 'Residence Three — Family Park & Playground',
    category: 'Park & Playground',
    floors: 7,
    variant: 'park',
  },
  {
    file: 'residences/residence-four/exterior-main.svg',
    title: 'Residence Four — Completed Building',
    category: 'Residence Four',
    floors: 8,
    variant: 'exterior',
  },
  {
    file: 'residences/residence-four/interior-sample.svg',
    title: 'Residence Four — Interior Finishes',
    category: 'Interior',
    floors: 8,
    variant: 'interior',
  },
];

for (const asset of assets) {
  const fullPath = path.join(publicDir, asset.file);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, createArchitecturalSvg(asset), 'utf8');
}

console.log(`Generated ${assets.length} upgraded Spaciaz-style architectural renders.`);
