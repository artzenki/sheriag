import type { Locale } from '@/i18n/routing';

export type ResidenceStatus = 'completed' | 'under-construction';

export type LocalizedString = Record<Locale, string>;
export type LocalizedParagraphs = Record<Locale, string[]>;

export type AmenityKey =
  | 'parking'
  | 'park'
  | 'playground'
  | 'elevator'
  | 'security'
  | 'storage'
  | 'insulation'
  | 'heating'
  | 'balcony'
  | 'commercial';

export type GalleryCategory =
  | 'exterior'
  | 'interior'
  | 'surroundings'
  | 'render'
  | 'construction';

export type NearbyPlaceType =
  | 'center'
  | 'school'
  | 'market'
  | 'park'
  | 'health'
  | 'transport';

export type ConstructionStageKey =
  | 'foundation'
  | 'structure'
  | 'facade'
  | 'interior'
  | 'handover';

export type StageStatus = 'completed' | 'current' | 'upcoming';

export interface ResidenceLocation {
  address: LocalizedString;
  lat: number;
  lng: number;
}

export interface ResidenceFacts {
  floors: number;
  apartments: number;
  parkingSpaces: number;
  apartmentSizeRange: string;
  yearCompleted?: string;
  expectedCompletion?: string;
}

export interface ApartmentTypeItem {
  key: '1br' | '2br' | '3br' | 'penthouse';
  name: LocalizedString;
  sizeRange: string;
  description: LocalizedString;
}

export interface GalleryItem {
  src: string;
  alt: LocalizedString;
  category: GalleryCategory;
}

export interface NearbyPlace {
  type: NearbyPlaceType;
  name: LocalizedString;
  walkingMinutes: number;
}

export interface ConstructionStageItem {
  key: ConstructionStageKey;
  status: StageStatus;
}

export interface ConstructionUpdateItem {
  date: string;
  title: LocalizedString;
  text: LocalizedString;
  images: string[];
}

export interface ConstructionInfo {
  progressPercent: number;
  currentStage: ConstructionStageKey;
  stages: ConstructionStageItem[];
  updates: ConstructionUpdateItem[];
}

export interface Residence {
  slug: string;
  status: ResidenceStatus;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedParagraphs;
  highlights: LocalizedParagraphs;
  heroImage: string;
  location: ResidenceLocation;
  facts: ResidenceFacts;
  amenities: AmenityKey[];
  apartmentTypes: ApartmentTypeItem[];
  gallery: GalleryItem[];
  nearby: NearbyPlace[];
  construction?: ConstructionInfo;
  featured: boolean;
}

// TODO: Replace all placeholder building names, dates, unit counts, sizes, addresses, and coordinates
// with final verified SHERIAG project records before launch.
export const residences: Residence[] = [
  {
    slug: 'sheriag-new-residence',
    status: 'under-construction',
    featured: true,
    // Keep building name untranslated across locales per specification
    name: {
      sq: 'SHERIAG New Residence', // TODO: Replace with official complex name
      mk: 'SHERIAG New Residence',
      en: 'SHERIAG New Residence',
    },
    tagline: {
      sq: 'Kompleksi ynë më i ri rezidencial me park privat dhe parking nëntokësor në Gostivar.',
      mk: 'Нашиот најнов станбен комплекс со приватен парк и подземен паркинг во Гостивар.',
      en: 'Our newest residential complex featuring a private courtyard park and underground parking in Gostivar.',
    },
    description: {
      sq: [
        'SHERIAG New Residence përfaqëson gjeneratën e re të banimit bashkëkohor në Gostivar. I konceptuar dhe në ndërtim e sipër ekskluzivisht nga ekipi i SHERIAG, ky kompleks bashkon arkitekturën e ndritshme me funksionalitetin familjar afatgjatë.',
        'Objekti përfshin planimetri të studiuara me kujdes për ndriçim natyror gjatë gjithë ditës, izolim termik dhe akustik të gjeneratës së fundit, si dhe dy nivele parkimi të dedikuar për banorët.',
        'Në qendër të kompleksit shtrihet hapësira e gjelbër private dhe këndi i sigurt për fëmijë, larg zhurmës së trafikut, duke krijuar një mjedis të qetë për familjet vendore dhe blerësit nga diaspora.'
      ],
      mk: [
        'SHERIAG New Residence ја претставува новата генерација на современо домување во Гостивар. Конципиран и во фаза на изградба исклучиво од тимот на SHERIAG, овој комплекс ја спојува светлата архитектура со долгорочната семејна функционалност.',
        'Објектот вклучува внимателно проектирани основи за природна светлина во текот на целиот ден, термичка и звучна изолација од најнова генерација, како и организиран паркинг за станарите.',
        'Во срцето на комплексот се наоѓа уредениот зелен двор и безбедното игралиште за деца, заштитени од сообраќајот — идеална средина за локалните семејства и купувачите од дијаспората.'
      ],
      en: [
        'SHERIAG New Residence represents the next chapter of contemporary residential living in Gostivar. Conceived, engineered, and currently being built exclusively by SHERIAG, the complex pairs clean architectural lines with practical family layouts.',
        'Every floor is planned for abundant natural daylight, high-performance thermal and acoustic insulation, and direct elevator access from the dedicated resident parking levels.',
        'At the heart of the complex sits a landscaped residential park and children’s play area sheltered from street traffic, offering a calm daily environment for local residents and diaspora homeowners alike.'
      ],
    },
    highlights: {
      sq: [
        'Shitje direkte nga investitori SHERIAG — 0% provizion ndërmjetësimi',
        'Parking nëntokësor dhe i jashtëm i planifikuar për çdo njësi banimi (TODO)',
        'Park i brendshëm i gjelbëruar dhe kënd lojërash për fëmijë',
        'Fasadë termike me efikasitet të lartë energjetik dhe dritare me xham trefish',
        'Mundësi pagese me këste sipas fazave të ndërtimit'
      ],
      mk: [
        'Директна продажба од инвеститорот SHERIAG — 0% агенциска провизија',
        'Планиран подземен и надворешен паркинг за станарите (TODO)',
        'Внатрешен хортикултурно уреден парк и детско игралиште',
        'Енергетски ефикасна термичка фасада и прозорци со трослојно стакло',
        'Можност за етапно плаќање според фазите на изградба'
      ],
      en: [
        'Direct purchase from developer SHERIAG — 0% agency commission',
        'Underground and surface parking planned for resident households (TODO)',
        'Landscaped private courtyard park and children’s play zone',
        'High-efficiency thermal facade and triple-glazed window systems',
        'Staged payment schedules aligned with construction milestones'
      ],
    },
    heroImage: '/images/residences/sheriag-new-residence/render-main.jpg',
    location: {
      // TODO: Replace with exact street address and GPS coordinates in Gostivar
      address: {
        sq: 'Zona Rezidenciale Qendër–Jug (Placeholder TODO), Gostivar',
        mk: 'Станбена зона Центар–Југ (Placeholder TODO), Гостивар',
        en: 'Central–South Residential Zone (Placeholder TODO), Gostivar',
      },
      lat: 41.7952, // TODO: Verify exact latitude
      lng: 20.9124, // TODO: Verify exact longitude
    },
    facts: {
      floors: 8, // TODO: Replace with exact floor count
      apartments: 56, // TODO: Replace with exact apartment count
      parkingSpaces: 68, // TODO: Replace with exact parking count
      apartmentSizeRange: '54 – 138 m²', // TODO: Replace with exact m² range
      expectedCompletion: '2027 (TODO)', // TODO: Replace with exact completion target
    },
    amenities: [
      'parking',
      'park',
      'playground',
      'elevator',
      'security',
      'storage',
      'insulation',
      'heating',
      'balcony',
    ],
    apartmentTypes: [
      {
        key: '1br',
        name: {
          sq: 'Banesë me 1 Dhomë Gjumi',
          mk: 'Стан со 1 Спална Соба',
          en: '1-Bedroom Apartment',
        },
        sizeRange: '54 – 62 m² (TODO)',
        description: {
          sq: 'Sallon i ndritshëm me kuzhinë dhe tryezari të hapur, një dhomë gjumi komode, banjo dhe ballkon.',
          mk: 'Светол дневен престој со кујна и трпезарија, комфорна спална соба, бања и балкон.',
          en: 'Daylit open-plan living and dining room, comfortable bedroom, bathroom, and private balcony.',
        },
      },
      {
        key: '2br',
        name: {
          sq: 'Banesë Familjare me 2 Dhoma Gjumi',
          mk: 'Семеен Стан со 2 Спални Соби',
          en: '2-Bedroom Family Apartment',
        },
        sizeRange: '76 – 89 m² (TODO)',
        description: {
          sq: 'Planimetri ideale familjare me dy dhoma gjumi, qëndrim ditor të gjerë, dy nyje sanitare dhe tarracë.',
          mk: 'Идеален семеен распоред со две спални соби, пространа дневна соба, два тоалети и тераса.',
          en: 'Balanced family layout featuring two bedrooms, generous living area, bathroom + guest WC, and terrace.',
        },
      },
      {
        key: '3br',
        name: {
          sq: 'Banesë e Gjerë me 3 Dhoma Gjumi',
          mk: 'Пространен Стан со 3 Спални Соби',
          en: '3-Bedroom Spacious Apartment',
        },
        sizeRange: '102 – 138 m² (TODO)',
        description: {
          sq: 'Hapësirë maksimale me orientim të dyfishtë, tri dhoma gjumi, dy banjo, depo dhe ballkon panoramik.',
          mk: 'Максимален простор со двојна ориентација, три спални соби, две бањи, остава и панорамски балкон.',
          en: 'Dual-aspect corner layout with three bedrooms, two full bathrooms, utility storage, and panoramic balcony.',
        },
      },
    ],
    gallery: [
      {
        src: '/images/residences/sheriag-new-residence/render-main.jpg',
        alt: {
          sq: 'SHERIAG New Residence — Render kryesor i fasadës (Placeholder TODO)',
          mk: 'SHERIAG New Residence — Главен рендер на фасадата (Placeholder TODO)',
          en: 'SHERIAG New Residence — Main architectural facade render (Placeholder TODO)',
        },
        category: 'render',
      },
      {
        src: '/images/residences/sheriag-new-residence/render-courtyard.jpg',
        alt: {
          sq: 'SHERIAG New Residence — Render i parkut dhe oborrit të brendshëm (Placeholder TODO)',
          mk: 'SHERIAG New Residence — Рендер од внатрешниот парк и двор (Placeholder TODO)',
          en: 'SHERIAG New Residence — Courtyard park and pedestrian promenade render (Placeholder TODO)',
        },
        category: 'surroundings',
      },
      {
        src: '/images/residences/sheriag-new-residence/interior-living.jpg',
        alt: {
          sq: 'SHERIAG New Residence — Vizualizim i enterierit të qëndrimit ditor (Placeholder TODO)',
          mk: 'SHERIAG New Residence — Визуелизација на ентериер од дневна соба (Placeholder TODO)',
          en: 'SHERIAG New Residence — Interior living room visualization (Placeholder TODO)',
        },
        category: 'interior',
      },
      {
        src: '/images/residences/sheriag-new-residence/construction-site.jpg',
        alt: {
          sq: 'SHERIAG New Residence — Pamje nga kantieri i ndërtimit (Placeholder TODO)',
          mk: 'SHERIAG New Residence — Фотографија од градилиштето (Placeholder TODO)',
          en: 'SHERIAG New Residence — Active construction site progress photo (Placeholder TODO)',
        },
        category: 'construction',
      },
    ],
    nearby: [
      {
        type: 'center',
        name: {
          sq: 'Qendra e Gostivarit (TODO)',
          mk: 'Центар на Гостивар (TODO)',
          en: 'Gostivar City Center (TODO)',
        },
        walkingMinutes: 7,
      },
      {
        type: 'school',
        name: {
          sq: 'Shkolla Fillore dhe Çerdhja e Lagjes (TODO)',
          mk: 'Основно училиште и градинка (TODO)',
          en: 'Primary School & Kindergarten (TODO)',
        },
        walkingMinutes: 4,
      },
      {
        type: 'market',
        name: {
          sq: 'Supermarket dhe Tregti Ditore (TODO)',
          mk: 'Супермаркет и дневни продавници (TODO)',
          en: 'Supermarket & Daily Groceries (TODO)',
        },
        walkingMinutes: 3,
      },
      {
        type: 'park',
        name: {
          sq: 'Shëtitorja e lumit Vardar dhe Parku (TODO)',
          mk: 'Кеј на Вардар и Градски парк (TODO)',
          en: 'Vardar River Walk & Public Park (TODO)',
        },
        walkingMinutes: 6,
      },
    ],
    construction: {
      // TODO: Update progressPercent and stage statuses as construction advances
      progressPercent: 35,
      currentStage: 'structure',
      stages: [
        { key: 'foundation', status: 'completed' },
        { key: 'structure', status: 'current' },
        { key: 'facade', status: 'upcoming' },
        { key: 'interior', status: 'upcoming' },
        { key: 'handover', status: 'upcoming' },
      ],
      updates: [
        {
          date: '2026-10', // TODO: Replace with real site log date
          title: {
            sq: 'Punimet në konstruksionin beton-arme të kateve të para (TODO)',
            mk: 'Армирано-бетонски работи на првите катови (TODO)',
            en: 'Reinforced concrete structure progressing on lower floors (TODO)',
          },
          text: {
            sq: 'Pas përfundimit të pllakës së themelit dhe niveleve nëntokësore të parkingut, ekipi ynë po vazhdon me ngritjen e konstruksionit beton-arme sipas planit dinamik.',
            mk: 'По завршувањето на темелната плоча и подземните нивоа за паркирање, нашиот инженерски тим продолжува со изведба на армирано-бетонската конструкција.',
            en: 'Following completion of the foundation slab and underground parking levels, our site team is advancing the reinforced concrete superstructure on schedule.',
          },
          images: ['/images/residences/sheriag-new-residence/construction-site.jpg'],
        },
        {
          date: '2026-08', // TODO: Replace with real site log date
          title: {
            sq: 'Përfundimi i gërmimeve dhe hidroizolimit të themeleve (TODO)',
            mk: 'Завршен ископ и хидроизолација на темелите (TODO)',
            en: 'Excavation and foundation waterproofing completed (TODO)',
          },
          text: {
            sq: 'Gërmimi i parcelës, sigurimi i gropës së ndërtimit dhe shtrimi i betonit me hidroizolim të plotë u realizuan me kontroll të plotë gjeomekanik.',
            mk: 'Ископот на парцелата, обезбедувањето на градежната јама и поставувањето на хидроизолацијата беа комплетирани со целосна геомеханичка контрола.',
            en: 'Site excavation, shoring, and multi-layer foundation waterproofing were completed under full geotechnical supervision.',
          },
          images: ['/images/residences/sheriag-new-residence/render-main.jpg'],
        },
      ],
    },
  },
  {
    slug: 'residence-one',
    status: 'completed',
    featured: true,
    name: {
      sq: 'Residence One', // TODO: Replace with real building name
      mk: 'Residence One',
      en: 'Residence One',
    },
    tagline: {
      sq: 'Objekti i parë rezidencial i SHERIAG që vendosi standardin tonë për cilësi dhe parking familjar në Gostivar.',
      mk: 'Првиот станбен објект на SHERIAG кој го постави нашиот стандард за квалитет и семеен паркинг во Гостивар.',
      en: 'SHERIAG’s inaugural residential building that established our benchmark for construction quality and resident parking in Gostivar.',
    },
    description: {
      sq: [
        'Residence One është objekti me të cilin SHERIAG nisi misionin për të ndërtuar banesa me standarde të larta në Gostivar. Çdo detaj u projektua për t’u dhënë familjeve hapësirë praktike dhe qetësi.',
        'Ndërtesa karakterizohet nga struktura e fortë beton-arme, korridoret e ndritshme dhe vendparkimet e organizuara për banorët, së bashku me hapësirën e gjelbëruar përreth hyrjes.'
      ],
      mk: [
        'Residence One е објектот со кој SHERIAG ја започна својата мисија за градење квалитетни домови во Гостивар. Секој детаљ беше проектиран за да им обезбеди на семејствата практичен простор и мир.',
        'Зградата се одликува со цврста конструкција, светли заеднички простории и организиран паркинг за станарите, заедно со хортикултурно уреден влез.'
      ],
      en: [
        'Residence One marks the beginning of SHERIAG’s residential portfolio in Gostivar. Designed from the ground up for long-term family living, it prioritized generous room proportions and durable materials.',
        'The building features a solid reinforced-concrete frame, well-lit common areas, dedicated resident parking spaces, and landscaped green borders around the entrance.'
      ],
    },
    highlights: {
      sq: [
        '100% i përfunduar dhe i banuar me komunitet të rregullt familjar',
        'Parking i dedikuar dhe oborr i mirëmbajtur',
        'Planimetri funksionale me ndriçim natyror në çdo dhomë'
      ],
      mk: [
        '100% завршен и вселен објект со мирна семејна заедница',
        'Обезбеден паркинг простор и одржуван двор',
        'Функционални распореди со природна светлина во секоја соба'
      ],
      en: [
        '100% completed and occupied by an established residential community',
        'Dedicated resident parking and well-maintained courtyard',
        'Practical layouts with natural daylight in every room'
      ],
    },
    heroImage: '/images/residences/residence-one/exterior-main.jpg',
    location: {
      address: {
        sq: 'Lagjja Rezidenciale 1 (Placeholder TODO), Gostivar',
        mk: 'Станбена населба 1 (Placeholder TODO), Гостивар',
        en: 'Residential District 1 (Placeholder TODO), Gostivar',
      },
      lat: 41.7978, // TODO: Replace with exact coordinates
      lng: 20.9052,
    },
    facts: {
      floors: 6, // TODO: Verify floor count
      apartments: 36, // TODO: Verify apartment count
      parkingSpaces: 40, // TODO: Verify parking spaces
      apartmentSizeRange: '58 – 112 m²', // TODO: Verify m² range
      yearCompleted: '2018 (TODO)', // TODO: Verify year completed
    },
    amenities: ['parking', 'park', 'elevator', 'security', 'insulation', 'balcony'],
    apartmentTypes: [
      {
        key: '1br',
        name: {
          sq: 'Banesë me 1 Dhomë Gjumi',
          mk: 'Стан со 1 Спална Соба',
          en: '1-Bedroom Apartment',
        },
        sizeRange: '58 – 64 m² (TODO)',
        description: {
          sq: 'Planimetri kompakte me dhomë dite, kuzhinë, dhomë gjumi dhe ballkon.',
          mk: 'Компактен распоред со дневна соба, кујна, спална соба и балкон.',
          en: 'Compact layout with living area, kitchen, bedroom, and balcony.',
        },
      },
      {
        key: '2br',
        name: {
          sq: 'Banesë me 2 Dhoma Gjumi',
          mk: 'Стан со 2 Спални Соби',
          en: '2-Bedroom Apartment',
        },
        sizeRange: '78 – 92 m² (TODO)',
        description: {
          sq: 'Banesë familjare me dy dhoma gjumi të ndara dhe qëndrim ditor të bollshëm.',
          mk: 'Семеен стан со две одделни спални соби и пространа дневна соба.',
          en: 'Family apartment featuring two separate bedrooms and a spacious living room.',
        },
      },
    ],
    gallery: [
      {
        src: '/images/residences/residence-one/exterior-main.jpg',
        alt: {
          sq: 'Residence One — Pamja e jashtme e objektit (Placeholder TODO)',
          mk: 'Residence One — Надворешен изглед на објектот (Placeholder TODO)',
          en: 'Residence One — Completed exterior facade (Placeholder TODO)',
        },
        category: 'exterior',
      },
      {
        src: '/images/residences/residence-one/surroundings-park.jpg',
        alt: {
          sq: 'Residence One — Parku dhe vendparkimi (Placeholder TODO)',
          mk: 'Residence One — Парк и паркинг простор (Placeholder TODO)',
          en: 'Residence One — Courtyard park and resident parking (Placeholder TODO)',
        },
        category: 'surroundings',
      },
    ],
    nearby: [
      {
        type: 'center',
        name: {
          sq: 'Qendra e Qytetit (TODO)',
          mk: 'Центар на градот (TODO)',
          en: 'City Center (TODO)',
        },
        walkingMinutes: 8,
      },
      {
        type: 'school',
        name: {
          sq: 'Shkolla e Lagjes (TODO)',
          mk: 'Локално училиште (TODO)',
          en: 'Neighborhood School (TODO)',
        },
        walkingMinutes: 5,
      },
      {
        type: 'market',
        name: {
          sq: 'Market & Furrë Buke (TODO)',
          mk: 'Маркет и пекара (TODO)',
          en: 'Supermarket & Bakery (TODO)',
        },
        walkingMinutes: 2,
      },
    ],
  },
  {
    slug: 'residence-two',
    status: 'completed',
    featured: true,
    name: {
      sq: 'Residence Two', // TODO: Replace with real building name
      mk: 'Residence Two',
      en: 'Residence Two',
    },
    tagline: {
      sq: 'Arkitekturë urbane e qetë me kënd të gjelbër familjar dhe parking të dedikuar.',
      mk: 'Мирна урбана архитектура со зелено семејно катче и сопствен паркинг.',
      en: 'Calm urban architecture with a landscaped family green zone and dedicated parking.',
    },
    description: {
      sq: [
        'Residence Two solli një hap të mëtejshëm në organizimin e hapësirave të përbashkëta dhe oborrit të gjelbër për banorët e Gostivarit.',
        'Me fasadë bashkëkohore me ngjyra të ngrohta tokësore dhe izolim të përforcuar, objekti ofron komoditet të lartë në çdo stinë të vitit.'
      ],
      mk: [
        'Residence Two донесе чекор напред во организацијата на заедничките простори и зелениот двор за станарите во Гостивар.',
        'Со современа фасада во топли тонови и засилена изолација, објектот нуди висок комфор во секое годишно време.'
      ],
      en: [
        'Residence Two expanded SHERIAG’s focus on communal outdoor spaces, integrating a sheltered green courtyard alongside organized resident parking.',
        'Finished in warm earth-toned facade materials with upgraded thermal insulation, the building delivers year-round indoor comfort and low energy demand.'
      ],
    },
    highlights: {
      sq: [
        'Oborr i gjelbër privat dhe kënd pushimi për banorët',
        'Ashensor i qetë dhe hyrje me qasje të kontrolluar',
        'Depo individuale në bodrum për secilën banesë'
      ],
      mk: [
        'Приватен зелен двор и место за одмор на станарите',
        'Тивок лифт и влез со контролиран пристап',
        'Индивидуални подрумски остави за секој стан'
      ],
      en: [
        'Private landscaped courtyard and seating area for residents',
        'Quiet passenger elevator and secure controlled entry',
        'Individual basement storage rooms for every unit'
      ],
    },
    heroImage: '/images/residences/residence-two/exterior-main.jpg',
    location: {
      address: {
        sq: 'Lagjja Rezidenciale 2 (Placeholder TODO), Gostivar',
        mk: 'Станбена населба 2 (Placeholder TODO), Гостивар',
        en: 'Residential District 2 (Placeholder TODO), Gostivar',
      },
      lat: 41.7991, // TODO: Replace with exact coordinates
      lng: 20.9108,
    },
    facts: {
      floors: 7, // TODO: Verify floor count
      apartments: 42, // TODO: Verify apartment count
      parkingSpaces: 46, // TODO: Verify parking count
      apartmentSizeRange: '60 – 118 m²', // TODO: Verify m² range
      yearCompleted: '2020 (TODO)', // TODO: Verify year completed
    },
    amenities: ['parking', 'park', 'playground', 'elevator', 'security', 'storage', 'insulation'],
    apartmentTypes: [
      {
        key: '2br',
        name: {
          sq: 'Banesë me 2 Dhoma Gjumi',
          mk: 'Стан со 2 Спални Соби',
          en: '2-Bedroom Apartment',
        },
        sizeRange: '74 – 86 m² (TODO)',
        description: {
          sq: 'Planimetri e hapur me ballkon drejt parkut të brendshëm.',
          mk: 'Отворен распоред со балкон кон внатрешниот парк.',
          en: 'Open living layout with a balcony overlooking the courtyard park.',
        },
      },
      {
        key: '3br',
        name: {
          sq: 'Banesë me 3 Dhoma Gjumi',
          mk: 'Стан со 3 Спални Соби',
          en: '3-Bedroom Apartment',
        },
        sizeRange: '98 – 118 m² (TODO)',
        description: {
          sq: 'Banesë këndore me tri dhoma gjumi dhe dy banjo.',
          mk: 'Аголен стан со три спални соби и две бањи.',
          en: 'Corner unit with three bedrooms and two bathrooms.',
        },
      },
    ],
    gallery: [
      {
        src: '/images/residences/residence-two/exterior-main.jpg',
        alt: {
          sq: 'Residence Two — Fasada kryesore (Placeholder TODO)',
          mk: 'Residence Two — Главна фасада (Placeholder TODO)',
          en: 'Residence Two — Main building facade (Placeholder TODO)',
        },
        category: 'exterior',
      },
      {
        src: '/images/residences/residence-two/interior-sample.jpg',
        alt: {
          sq: 'Residence Two — Pamje e brendshme e banesës (Placeholder TODO)',
          mk: 'Residence Two — Внатрешен изглед на стан (Placeholder TODO)',
          en: 'Residence Two — Apartment interior finish (Placeholder TODO)',
        },
        category: 'interior',
      },
    ],
    nearby: [
      {
        type: 'center',
        name: {
          sq: 'Sheshi i Qytetit (TODO)',
          mk: 'Градски плоштад (TODO)',
          en: 'Town Square (TODO)',
        },
        walkingMinutes: 6,
      },
      {
        type: 'health',
        name: {
          sq: 'Barnatore dhe Poliklinikë (TODO)',
          mk: 'Аптека и поликлиника (TODO)',
          en: 'Pharmacy & Clinic (TODO)',
        },
        walkingMinutes: 3,
      },
      {
        type: 'market',
        name: {
          sq: 'Qendër Tregtare dhe Market (TODO)',
          mk: 'Трговски центар и маркет (TODO)',
          en: 'Shopping & Supermarket (TODO)',
        },
        walkingMinutes: 4,
      },
    ],
  },
  {
    slug: 'residence-three',
    status: 'completed',
    featured: true,
    name: {
      sq: 'Residence Three', // TODO: Replace with real building name
      mk: 'Residence Three',
      en: 'Residence Three',
    },
    tagline: {
      sq: 'Kompleks rezidencial modern me tarraca të gjera, park për fëmijë dhe parking nëntokësor.',
      mk: 'Современ станбен комплекс со пространи тераси, детски парк и подземен паркинг.',
      en: 'Modern residential complex featuring wide terraces, children’s park, and underground parking.',
    },
    description: {
      sq: [
        'Residence Three u projektua për familjet që kërkojnë hapësira më të mëdha ditore dhe ballkone të gjera me pamje të hapur në Gostivar.',
        'Me parking nëntokësor dhe të jashtëm si dhe kënd lojërash të rrethuar me gjelbërim, objekti siguron lëvizje të lirë dhe të sigurt për fëmijët.'
      ],
      mk: [
        'Residence Three беше проектиран за семејства кои бараат поголем дневен простор и широки балкони со отворен поглед во Гостивар.',
        'Со подземен и надворешен паркинг како и детско игралиште опкружено со зеленило, објектот овозможува безбедно движење за најмладите.'
      ],
      en: [
        'Residence Three was designed for families seeking larger daylit living rooms and deep terraces with open views across Gostivar.',
        'Combining underground parking with a pedestrian-first green courtyard and play area, the complex keeps vehicles out of the family recreation zone.'
      ],
    },
    highlights: {
      sq: [
        'Parking nëntokësor me qasje direkte me ashensor',
        'Dritare panoramike me izolim akustik të lartë',
        'Kënd lojërash dhe park i brendshëm për banorët'
      ],
      mk: [
        'Подземен паркинг со директен пристап преку лифт',
        'Панорамски прозорци со висока звучна изолација',
        'Детско игралиште и внатрешен парк за станарите'
      ],
      en: [
        'Underground parking with direct elevator access to all floors',
        'Large-format windows with high acoustic insulation',
        'Children’s playground and landscaped resident park'
      ],
    },
    heroImage: '/images/residences/residence-three/exterior-main.jpg',
    location: {
      address: {
        sq: 'Lagjja Rezidenciale 3 (Placeholder TODO), Gostivar',
        mk: 'Станбена населба 3 (Placeholder TODO), Гостивар',
        en: 'Residential District 3 (Placeholder TODO), Gostivar',
      },
      lat: 41.7938, // TODO: Replace with exact coordinates
      lng: 20.9035,
    },
    facts: {
      floors: 7, // TODO: Verify floor count
      apartments: 48, // TODO: Verify apartment count
      parkingSpaces: 54, // TODO: Verify parking count
      apartmentSizeRange: '55 – 126 m²', // TODO: Verify m² range
      yearCompleted: '2022 (TODO)', // TODO: Verify year completed
    },
    amenities: [
      'parking',
      'park',
      'playground',
      'elevator',
      'security',
      'storage',
      'insulation',
      'balcony',
    ],
    apartmentTypes: [
      {
        key: '1br',
        name: {
          sq: 'Banesë me 1 Dhomë Gjumi',
          mk: 'Стан со 1 Спална Соба',
          en: '1-Bedroom Apartment',
        },
        sizeRange: '55 – 60 m² (TODO)',
        description: {
          sq: 'E përshtatshme për çifte të reja ose investim afatgjatë.',
          mk: 'Погоден за млади парови или долгорочна инвестиција.',
          en: 'Ideal for young couples or long-term rental investment.',
        },
      },
      {
        key: '2br',
        name: {
          sq: 'Banesë me 2 Dhoma Gjumi',
          mk: 'Стан со 2 Спални Соби',
          en: '2-Bedroom Apartment',
        },
        sizeRange: '78 – 90 m² (TODO)',
        description: {
          sq: 'Planimetri e balancuar me tarracë të gjerë familjare.',
          mk: 'Балансиран распоред со широка семејна тераса.',
          en: 'Balanced layout with a wide family terrace.',
        },
      },
      {
        key: '3br',
        name: {
          sq: 'Banesë me 3 Dhoma Gjumi',
          mk: 'Стан со 3 Спални Соби',
          en: '3-Bedroom Apartment',
        },
        sizeRange: '104 – 126 m² (TODO)',
        description: {
          sq: 'Hapësirë e bollshme për familje të mëdha me dy banjo dhe depo.',
          mk: 'Голем простор за поголеми семејства со две бањи и остава.',
          en: 'Generous space for larger families with two bathrooms and utility room.',
        },
      },
    ],
    gallery: [
      {
        src: '/images/residences/residence-three/exterior-main.jpg',
        alt: {
          sq: 'Residence Three — Pamje e jashtme arkitektonike (Placeholder TODO)',
          mk: 'Residence Three — Архитектонски надворешен изглед (Placeholder TODO)',
          en: 'Residence Three — Architectural exterior view (Placeholder TODO)',
        },
        category: 'exterior',
      },
      {
        src: '/images/residences/residence-three/surroundings-park.jpg',
        alt: {
          sq: 'Residence Three — Parku për fëmijë dhe gjelbërimi (Placeholder TODO)',
          mk: 'Residence Three — Детски парк и зеленило (Placeholder TODO)',
          en: 'Residence Three — Playground and green courtyard (Placeholder TODO)',
        },
        category: 'surroundings',
      },
    ],
    nearby: [
      {
        type: 'park',
        name: {
          sq: 'Parku i Qytetit (TODO)',
          mk: 'Градски парк (TODO)',
          en: 'City Park (TODO)',
        },
        walkingMinutes: 5,
      },
      {
        type: 'school',
        name: {
          sq: 'Shkolla e Mesme dhe Fillore (TODO)',
          mk: 'Средно и основно училиште (TODO)',
          en: 'Primary & Secondary Schools (TODO)',
        },
        walkingMinutes: 6,
      },
      {
        type: 'transport',
        name: {
          sq: 'Qasje në Bulevardin Kryesor (TODO)',
          mk: 'Пристап до главен булевар (TODO)',
          en: 'Main Boulevard Access (TODO)',
        },
        walkingMinutes: 2,
      },
    ],
  },
  {
    slug: 'residence-four',
    status: 'completed',
    featured: true,
    name: {
      sq: 'Residence Four', // TODO: Replace with real building name
      mk: 'Residence Four',
      en: 'Residence Four',
    },
    tagline: {
      sq: 'Objekti ynë i katërt i përfunduar — ndërtim bashkëkohor me park të gjelbër dhe parking të bollshëm.',
      mk: 'Нашиот четврти завршен објект — современа градба со зелен парк и простран паркинг.',
      en: 'Our fourth completed building — contemporary construction with a green park and ample resident parking.',
    },
    description: {
      sq: [
        'Residence Four është objekti ynë më i fundit i dorëzuar para fillimit të kompleksit të ri. Ai pasqyron përvojën e akumuluar të SHERIAG në çdo detaj teknik dhe estetik.',
        'Banorët gëzojnë hyrje reprezentative, dy ashensorë modernë, parking të organizuar nëntokësor e të jashtëm, si dhe parkun e gjelbër të rregulluar posaçërisht për komunitetin e ndërtesës.'
      ],
      mk: [
        'Residence Four е нашиот последен предаден објект пред почетокот на новиот комплекс. Го отсликува акумулираното искуство на SHERIAG во секој технички и естетски детаљ.',
        'Станарите уживаат во репрезентативен влез, два современи лифтови, организиран подземен и надворешен паркинг, како и зелен парк уреден специјално за зградата.'
      ],
      en: [
        'Residence Four is our most recently delivered building prior to breaking ground on our newest complex. It reflects SHERIAG’s refined construction standards across every technical and architectural detail.',
        'Residents benefit from a welcoming lobby, dual high-speed elevators, structured underground and surface parking, and a dedicated neighborhood park.'
      ],
    },
    highlights: {
      sq: [
        'Dorëzuar në afat me standardet më të larta të izolimit termik dhe akustik',
        'Dy ashensorë modernë dhe parking i zgjeruar për banorët',
        'Hapësirë e gjelbër private me ndriçim ambiental dhe stola pushimi'
      ],
      mk: [
        'Предаден во рок со највисоки стандарди за термичка и звучна изолација',
        'Два современи лифтови и проширен паркинг за станарите',
        'Приватна зелена површина со амбиентално осветлување и клупи'
      ],
      en: [
        'Delivered on schedule with superior thermal and acoustic insulation',
        'Dual modern elevators and expanded resident parking capacity',
        'Private green park with pathway lighting and courtyard seating'
      ],
    },
    heroImage: '/images/residences/residence-four/exterior-main.jpg',
    location: {
      address: {
        sq: 'Lagjja Rezidenciale 4 (Placeholder TODO), Gostivar',
        mk: 'Станбена населба 4 (Placeholder TODO), Гостивар',
        en: 'Residential District 4 (Placeholder TODO), Gostivar',
      },
      lat: 41.7966, // TODO: Replace with exact coordinates
      lng: 20.9151,
    },
    facts: {
      floors: 8, // TODO: Verify floor count
      apartments: 52, // TODO: Verify apartment count
      parkingSpaces: 60, // TODO: Verify parking count
      apartmentSizeRange: '56 – 130 m²', // TODO: Verify m² range
      yearCompleted: '2024 (TODO)', // TODO: Verify year completed
    },
    amenities: [
      'parking',
      'park',
      'playground',
      'elevator',
      'security',
      'storage',
      'insulation',
      'heating',
      'balcony',
    ],
    apartmentTypes: [
      {
        key: '1br',
        name: {
          sq: 'Banesë me 1 Dhomë Gjumi',
          mk: 'Стан со 1 Спална Соба',
          en: '1-Bedroom Apartment',
        },
        sizeRange: '56 – 62 m² (TODO)',
        description: {
          sq: 'Planimetri moderne me dritë natyrore dhe ballkon të rehatshëm.',
          mk: 'Модерен распоред со природна светлина и удобен балкон.',
          en: 'Modern layout with abundant natural light and comfortable balcony.',
        },
      },
      {
        key: '2br',
        name: {
          sq: 'Banesë me 2 Dhoma Gjumi',
          mk: 'Стан со 2 Спални Соби',
          en: '2-Bedroom Apartment',
        },
        sizeRange: '76 – 88 m² (TODO)',
        description: {
          sq: 'Dy dhoma gjumi, sallon i madh me kuzhinë dhe dy nyje sanitare.',
          mk: 'Две спални соби, голема дневна со кујна и два тоалети.',
          en: 'Two bedrooms, spacious living-dining area, and two bathrooms.',
        },
      },
      {
        key: '3br',
        name: {
          sq: 'Banesë me 3 Dhoma Gjumi',
          mk: 'Стан со 3 Спални Соби',
          en: '3-Bedroom Apartment',
        },
        sizeRange: '105 – 130 m² (TODO)',
        description: {
          sq: 'Rezidencë familjare me tri dhoma gjumi, depo dhe tarracë panoramike.',
          mk: 'Семејна резиденција со три спални соби, остава и панорамска тераса.',
          en: 'Family residence with three bedrooms, storage room, and panoramic terrace.',
        },
      },
    ],
    gallery: [
      {
        src: '/images/residences/residence-four/exterior-main.jpg',
        alt: {
          sq: 'Residence Four — Pamja e jashtme e ndërtesës (Placeholder TODO)',
          mk: 'Residence Four — Надворешен изглед на зградата (Placeholder TODO)',
          en: 'Residence Four — Completed building exterior (Placeholder TODO)',
        },
        category: 'exterior',
      },
      {
        src: '/images/residences/residence-four/interior-sample.jpg',
        alt: {
          sq: 'Residence Four — Detaje të enterierit (Placeholder TODO)',
          mk: 'Residence Four — Детали од ентериерот (Placeholder TODO)',
          en: 'Residence Four — Interior apartment finishes (Placeholder TODO)',
        },
        category: 'interior',
      },
    ],
    nearby: [
      {
        type: 'center',
        name: {
          sq: 'Qendra e Gostivarit (TODO)',
          mk: 'Центар на Гостивар (TODO)',
          en: 'Gostivar Center (TODO)',
        },
        walkingMinutes: 7,
      },
      {
        type: 'market',
        name: {
          sq: 'Supermarket dhe Farmaci (TODO)',
          mk: 'Супермаркет и аптека (TODO)',
          en: 'Supermarket & Pharmacy (TODO)',
        },
        walkingMinutes: 2,
      },
      {
        type: 'school',
        name: {
          sq: 'Shkolla dhe Çerdhja (TODO)',
          mk: 'Училиште и градинка (TODO)',
          en: 'School & Kindergarten (TODO)',
        },
        walkingMinutes: 5,
      },
    ],
  },
];

// Office coordinates in Gostivar, North Macedonia (TODO: Replace with exact office pin)
export const OFFICE_LOCATION = {
  lat: 41.7963,
  lng: 20.9089,
};

export function getResidenceBySlug(slug: string): Residence | undefined {
  return residences.find((r) => r.slug === slug);
}

export function getCompletedResidences(): Residence[] {
  return residences.filter((r) => r.status === 'completed');
}

export function getUnderConstructionResidence(): Residence | undefined {
  return residences.find((r) => r.status === 'under-construction');
}

export function getPortfolioStats() {
  const completedCount = residences.filter((r) => r.status === 'completed').length;
  const underConstructionCount = residences.filter((r) => r.status === 'under-construction').length;
  const totalApartments = residences.reduce((sum, r) => sum + r.facts.apartments, 0);
  const completedApartments = residences
    .filter((r) => r.status === 'completed')
    .reduce((sum, r) => sum + r.facts.apartments, 0);

  return {
    completedCount,
    underConstructionCount,
    totalApartments,
    completedApartments,
    yearsOfExperience: 10, // TODO: Replace with exact years since SHERIAG founding
  };
}
