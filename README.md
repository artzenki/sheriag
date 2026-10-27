# SHERIAG — Residential Development & Construction Website (Gostivar)

Production marketing website for **SHERIAG**, a residential construction and real-estate development company in Gostivar, North Macedonia. SHERIAG develops and builds exclusively its own residential complexes.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router), TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom architectural daylight theme tokens (`brand`, `brand-dark`, `brand-tint`, `ink`, `ink-body`, `muted`, `surface`, `surface-alt`, `surface-dark`, `border`)
- **Typography**: `Manrope` (700/800) for headings, `Inter` (400/500/600/700) for body copy (`next/font/google`, Latin & Cyrillic subsets)
- **Internationalization (`next-intl`)**:
  - `sq` — Albanian (Default: `/sq`)
  - `mk` — Macedonian (`/mk`)
  - `en` — English (`/en`)
- **Forms & Validation**: `react-hook-form` + `zod` (client & server validation), honeypot anti-spam field, IP rate limiting, and **Resend** email delivery with graceful development logging fallback
- **Maps**: Leaflet + OpenStreetMap tiles (zero API key required), centered on Gostivar, North Macedonia

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in the environment variables:

| Variable | Description | Required in Dev? |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (e.g. `https://sheriag.mk`) | Optional (defaults to `https://sheriag.mk`) |
| `RESEND_API_KEY` | Resend API key for sending quote & contact emails | Optional (logs to server console if omitted) |
| `QUOTE_TO_EMAIL` | Recipient email for quote & contact notifications | Optional (logs to server console if omitted) |
| `FROM_EMAIL` | Verified sender address in Resend | Optional |

### 3. Available Scripts

```bash
npm run dev        # Start development server at http://localhost:3000
npm run build      # Create optimized production build
npm run start      # Start production server
npm run lint       # Run Next.js ESLint checks
npm run typecheck  # Run strict TypeScript compiler check
```

---

## Adding or Updating a Residential Complex (`data/residences.ts`)

`data/residences.ts` is the **single source of truth**. Adding a new building requires **only** adding an object to the `residences` array and dropping its images into `/public/images/residences/<slug>/` — no new route or page code is needed.

Automatically updated from `data/residences.ts`:
- Home page stats counter, completed residences grid, "Now Building" spotlight, gallery, and multi-pin map
- `/[locale]/residences` listing & status filter tabs
- `/[locale]/residences/[slug]` static pages (`generateStaticParams`, `generateMetadata`, JSON-LD)
- `/[locale]/about` building timeline
- `/[locale]/quote` residence selector dropdown
- Footer residences list and `/sitemap.xml`

---

## Image Replacement Checklist (`/public/images/`)

All current images are on-brand architectural SVG placeholders. Replace them with real architectural renders and photographs (`.jpg`, `.webp`, or `.png`) and update the paths in `data/residences.ts` if file extensions change:

| Current File Path | Usage | Recommended Dimensions |
| --- | --- | --- |
| `/public/images/hero/gostivar-hero.svg` | Home Page Full-Viewport Hero | `2400 × 1500 px` (16:10, WebP/JPG) |
| `/public/images/about/company-architecture.svg` | About Us Story Section | `1600 × 1000 px` (16:10, WebP/JPG) |
| `/public/images/residences/sheriag-new-residence/render-main.svg` | Under-Construction Complex Main Render | `1600 × 1000 px` (16:10, WebP/JPG) |
| `/public/images/residences/sheriag-new-residence/render-courtyard.svg` | Under-Construction Courtyard & Park Render | `1600 × 1000 px` (16:10, WebP/JPG) |
| `/public/images/residences/sheriag-new-residence/interior-living.svg` | Under-Construction Interior Render | `1600 × 1000 px` (16:10, WebP/JPG) |
| `/public/images/residences/sheriag-new-residence/construction-site.svg` | Under-Construction Site Update Photo | `1600 × 1000 px` (16:10, WebP/JPG) |
| `/public/images/residences/residence-one/exterior-main.svg` | Residence One Main Exterior Photo | `1600 × 1000 px` (16:10, WebP/JPG) |
| `/public/images/residences/residence-one/surroundings-park.svg` | Residence One Park & Parking Photo | `1600 × 1000 px` (16:10, WebP/JPG) |
| `/public/images/residences/residence-two/exterior-main.svg` | Residence Two Main Exterior Photo | `1600 × 1000 px` (16:10, WebP/JPG) |
| `/public/images/residences/residence-two/interior-sample.svg` | Residence Two Interior Photo | `1600 × 1000 px` (16:10, WebP/JPG) |
| `/public/images/residences/residence-three/exterior-main.svg` | Residence Three Main Exterior Photo | `1600 × 1000 px` (16:10, WebP/JPG) |
| `/public/images/residences/residence-three/surroundings-park.svg` | Residence Three Park & Playground Photo | `1600 × 1000 px` (16:10, WebP/JPG) |
| `/public/images/residences/residence-four/exterior-main.svg` | Residence Four Main Exterior Photo | `1600 × 1000 px` (16:10, WebP/JPG) |
| `/public/images/residences/residence-four/interior-sample.svg` | Residence Four Interior Photo | `1600 × 1000 px` (16:10, WebP/JPG) |

---

## Client TODO Checklist Before Launch

Search the codebase for `TODO` to locate every placeholder requiring client confirmation:
1. **`data/residences.ts`**:
   - Official building names (`Residence One` – `Residence Four`, `SHERIAG New Residence`)
   - Exact street addresses and GPS coordinates (`lat`, `lng`) in Gostivar
   - Exact floor counts, apartment counts, parking space counts, m² ranges, and completion years
   - Real construction progress percentage (`progressPercent`) and dated monthly construction site updates
   - `OFFICE_LOCATION` coordinates and `yearsOfExperience` in `getPortfolioStats()`
2. **`messages/sq.json`, `messages/mk.json`, `messages/en.json`**:
   - Office street address (`contactPage.addressValue`)
   - Phone and WhatsApp numbers (`contactPage.phoneValue`, `contactPage.whatsappValue`)
   - Official email addresses (`info@sheriag.mk`, `sales@sheriag.mk`)
   - 4 Leadership / Engineering team profiles (`aboutPage.team.member1` – `member4`)
   - Final legal review of the Privacy Policy (`privacyPage`)
3. **Social Links (`components/layout/Footer.tsx` & `app/[locale]/contact/page.tsx`)**:
   - Official Facebook, Instagram, and LinkedIn profile URLs

---

## Deploying to Vercel

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, and `FROM_EMAIL` in **Project Settings → Environment Variables**.
4. Click **Deploy**. Next.js App Router, `next-intl` middleware, and API routes work out of the box on Vercel.
