import React from 'react';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  Calendar,
  Handshake,
  HardHat,
  Layers,
  MapPin,
  ShieldCheck,
  Trees,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { Link, routing, type Locale } from '@/i18n/routing';
import {
  getCompletedResidences,
  getPortfolioStats,
  getUnderConstructionResidence,
  OFFICE_LOCATION,
  residences,
  type GalleryCategory,
} from '@/data/residences';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader, SpaciazEyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ResidenceCard } from '@/components/ui/Card';
import { StatCounter } from '@/components/ui/StatCounter';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Gallery, type GalleryPhoto } from '@/components/ui/Gallery';
import { MapView } from '@/components/ui/MapView';
import { FadeIn } from '@/components/ui/FadeIn';
import { WhySheriagSection, type WhyFeatureItem } from '@/components/home/WhySheriagSection';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  return buildPageMetadata({
    locale,
    path: '/',
    title: tMeta('homeTitle'),
    description: tMeta('homeDescription'),
  });
}

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const tHome = await getTranslations({ locale, namespace: 'home' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tStages = await getTranslations({ locale, namespace: 'stages' });
  const tGalleryCats = await getTranslations({ locale, namespace: 'galleryCategories' });
  const tLightbox = await getTranslations({ locale, namespace: 'lightbox' });

  const stats = getPortfolioStats();
  const completedResidences = getCompletedResidences();
  const newResidence = getUnderConstructionResidence();

  const cardLabels = {
    completed: tCommon('completed'),
    underConstruction: tCommon('underConstruction'),
    floors: tCommon('floors'),
    apartments: tCommon('apartments'),
    parkingSpaces: tCommon('parkingSpaces'),
    viewResidence: tCommon('viewResidence'),
  };

  const homeGalleryItems: GalleryPhoto[] = residences.flatMap((res) =>
    res.gallery.map((item) => ({
      src: item.src,
      alt: item.alt[locale],
      category: item.category,
      residenceName: res.name[locale],
    }))
  );

  const categoryLabels: Record<'all' | GalleryCategory, string> = {
    all: tGalleryCats('all'),
    exterior: tGalleryCats('exterior'),
    interior: tGalleryCats('interior'),
    surroundings: tGalleryCats('surroundings'),
    render: tGalleryCats('render'),
    construction: tGalleryCats('construction'),
  };

  const mapMarkers = residences.map((res) => ({
    id: res.slug,
    lat: res.location.lat,
    lng: res.location.lng,
    title: res.name[locale],
    subtitle: res.location.address[locale],
    badgeText:
      res.status === 'under-construction'
        ? tCommon('underConstruction')
        : tCommon('completed'),
    isUnderConstruction: res.status === 'under-construction',
    href: `/${locale}/residences/${res.slug}`,
    ctaLabel: tHome('mapSection.openResidence'),
  }));

  // 3 Hero Liquid Glass Cards (.elementor-element-beded08, .8c6c9db, .223e355)
  const heroGlassPillars = [
    {
      icon: ShieldCheck,
      title: tHome('whySheriag.items.ownProjects.title'),
      description: tHome('whySheriag.items.ownProjects.description'),
    },
    {
      icon: Handshake,
      title: tHome('whySheriag.items.directBuy.title'),
      description: tHome('whySheriag.items.directBuy.description'),
    },
    {
      icon: Trees,
      title: tHome('whySheriag.items.parkingAndParks.title'),
      description: tHome('whySheriag.items.parkingAndParks.description'),
    },
  ];

  const whyItems: WhyFeatureItem[] = [
    {
      id: 'own-projects',
      iconName: 'ShieldCheck',
      num: '01',
      title: tHome('whySheriag.items.ownProjects.title'),
      description: tHome('whySheriag.items.ownProjects.description'),
      details: {
        lead: tHome('whySheriag.modal.items.ownProjects.lead'),
        points: [
          tHome('whySheriag.modal.items.ownProjects.points.0'),
          tHome('whySheriag.modal.items.ownProjects.points.1'),
          tHome('whySheriag.modal.items.ownProjects.points.2'),
        ],
        commitment: tHome('whySheriag.modal.items.ownProjects.commitment'),
      },
    },
    {
      id: 'direct-buy',
      iconName: 'Handshake',
      num: '02',
      title: tHome('whySheriag.items.directBuy.title'),
      description: tHome('whySheriag.items.directBuy.description'),
      details: {
        lead: tHome('whySheriag.modal.items.directBuy.lead'),
        points: [
          tHome('whySheriag.modal.items.directBuy.points.0'),
          tHome('whySheriag.modal.items.directBuy.points.1'),
          tHome('whySheriag.modal.items.directBuy.points.2'),
        ],
        commitment: tHome('whySheriag.modal.items.directBuy.commitment'),
      },
    },
    {
      id: 'parking-and-parks',
      iconName: 'Trees',
      num: '03',
      title: tHome('whySheriag.items.parkingAndParks.title'),
      description: tHome('whySheriag.items.parkingAndParks.description'),
      details: {
        lead: tHome('whySheriag.modal.items.parkingAndParks.lead'),
        points: [
          tHome('whySheriag.modal.items.parkingAndParks.points.0'),
          tHome('whySheriag.modal.items.parkingAndParks.points.1'),
          tHome('whySheriag.modal.items.parkingAndParks.points.2'),
        ],
        commitment: tHome('whySheriag.modal.items.parkingAndParks.commitment'),
      },
    },
    {
      id: 'local-rooted',
      iconName: 'MapPin',
      num: '04',
      title: tHome('whySheriag.items.localRooted.title'),
      description: tHome('whySheriag.items.localRooted.description'),
      details: {
        lead: tHome('whySheriag.modal.items.localRooted.lead'),
        points: [
          tHome('whySheriag.modal.items.localRooted.points.0'),
          tHome('whySheriag.modal.items.localRooted.points.1'),
          tHome('whySheriag.modal.items.localRooted.points.2'),
        ],
        commitment: tHome('whySheriag.modal.items.localRooted.commitment'),
      },
    },
  ];

  return (
    <>
      {/* =====================================================================
          1. SPACIAZ HERO SECTION (.elementor-element-7ee5e2d)
          Centered 70px Display Title + Middle Action Bar + 3 Liquid Glass Cards
          + 50px Bottom White Arch (.elementor-element-e899ff8)
      ====================================================================== */}
      <section className="relative overflow-hidden bg-surface-dark pt-36 pb-24 lg:pt-44 lg:pb-32">
        <Image
          src="/images/hero/gostivar-hero.jpg"
          alt="SHERIAG Residential Architecture in Gostivar"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Spaciaz Dark Architectural Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-surface-dark/75 via-surface-dark/60 to-surface-dark/85"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          {/* Top Centered Hero Heading (.elementor-element-54d816a & .5a53898) */}
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center">
              <SpaciazEyebrow text={tHome('heroEyebrow')} light />
            </div>

            <h1 className="font-heading text-[42px] font-bold leading-[1.05] tracking-[-0.03em] text-surface sm:text-[58px] lg:text-[72px]">
              {tHome('heroTitle')}
            </h1>

            <p className="mx-auto mt-6 max-w-[770px] text-lg font-semibold leading-relaxed text-surface/75 sm:text-[21px]">
              {tHome('heroSubtitle')}
            </p>
          </div>

          {/* Middle Hero Bar (.elementor-element-2487665: Left H4 + Right White Pill Button) */}
          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-surface/15 pt-8 md:flex-row md:items-center lg:mt-16">
            <h2 className="max-w-xl font-heading text-xl font-bold leading-snug tracking-[-0.02em] text-surface sm:text-2xl">
              {tHome('whySheriag.subtitle')}
            </h2>

            <div className="flex flex-wrap items-center gap-3.5">
              <Button href="/residences" variant="white" size="lg">
                {tHome('heroPrimaryCta')}
              </Button>
              <Button href="/quote" variant="outline-white" size="lg">
                {tHome('heroSecondaryCta')}
              </Button>
            </div>
          </div>

          {/* Bottom 3 Liquid Glass Cards (.elementor-element-e70e6fa -> .beded08, .8c6c9db, .223e355) */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-10">
            {heroGlassPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <FadeIn key={pillar.title} delay={idx * 0.08}>
                  <div className="group spaciaz-glass flex h-full flex-col justify-between rounded-[20px] p-5 transition-all duration-300 hover:border-brand/60 sm:p-6">
                    <div>
                      {/* Icon + Spaciaz Horizontal Divider Line (.show-divider-yes) */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/20 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-surface">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div
                          className="h-[1px] flex-1 bg-surface/20 transition-colors duration-300 group-hover:bg-brand"
                          aria-hidden="true"
                        />
                      </div>

                      <h3 className="mt-6 font-heading text-xl font-bold tracking-[-0.02em] text-surface sm:text-[22px]">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-surface/70">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>

        {/* Spaciaz Bottom 50px White Arch (.elementor-element-e899ff8: border-radius: 50px 50px 0 0) */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 h-7 rounded-t-[40px] bg-surface sm:h-10 sm:rounded-t-[50px]"
          aria-hidden="true"
        />
      </section>

      {/* =====================================================================
          2. SPACIAZ EDITORIAL ABOUT & IMPACT STATS (.elementor-element-f6a9814)
          1/3 Left Eyebrow Column + 2/3 Right Statement & Tall Rounded Stat Cards
      ====================================================================== */}
      <Section variant="default" spacing="lg" className="pt-12 sm:pt-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left 1/3 Column */}
            <div className="flex flex-col justify-between lg:col-span-4">
              <div>
                <SpaciazEyebrow text={tHome('whySheriag.eyebrow')} />
                <div className="mt-4 rounded-[22px] border border-border bg-surface-alt p-5 sm:p-6">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-brand">
                    SHERIAG • Gostivar
                  </span>
                  <p className="mt-3 font-heading text-xl font-bold leading-snug text-ink">
                    {tHome('whySheriag.items.localRooted.title')}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-body">
                    {tHome('whySheriag.items.localRooted.description')}
                  </p>
                  <div className="mt-6">
                    <Button href="/about" variant="outline" size="sm">
                      {tCommon('learnMore')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 2/3 Column (.elementor-element-a504b11) */}
            <div className="lg:col-span-8">
              <h2 className="font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[44px] lg:text-[50px]">
                {tHome('whySheriag.title')}
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-6 text-base leading-relaxed text-ink-body sm:grid-cols-2">
                <p>{tHome('whySheriag.subtitle')}</p>
                <p>{tHome('residencesSection.subtitle')}</p>
              </div>

              {/* 4 Spaciaz Tall Stat Cards (.elementor-element-e9f7002, .53d1454, .a083507) */}
              <div className="mt-8 grid grid-cols-1 gap-3.5 sm:gap-4 xl:grid-cols-4">
                <StatCounter
                  value={stats.completedCount}
                  label={tHome('stats.deliveredLabel')}
                  note={tHome('stats.deliveredNote')}
                />
                <StatCounter
                  value={stats.totalApartments}
                  suffix="+"
                  label={tHome('stats.apartmentsLabel')}
                  note={tHome('stats.apartmentsNote')}
                />
                <StatCounter
                  value={stats.yearsOfExperience}
                  suffix="+"
                  label={tHome('stats.experienceLabel')}
                  note={tHome('stats.experienceNote')}
                />
                <StatCounter
                  value={stats.underConstructionCount}
                  label={tHome('stats.underConstructionLabel')}
                  note={tHome('stats.underConstructionNote')}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================================
          3. SPACIAZ DARK ARCHITECTURAL PORTFOLIO SHOWCASE (.elementor-element-1bd2156)
          Includes "Now Building" Liquid Glass Spotlight + Numbered 01–04 Residences
      ====================================================================== */}
      <section className="px-3 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1680px] overflow-hidden rounded-[32px] bg-surface-dark py-20 text-surface sm:rounded-[50px] sm:py-28">
          <Container>
            {/* Part A: "Now Building" Flagship Complex with Liquid Glass Progress Card */}
            {newResidence && (
              <div className="mb-24 border-b border-surface/15 pb-20 sm:mb-28 sm:pb-24">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
                  {/* Left: Large Rounded Render with Floating Glass Badges */}
                  <div className="lg:col-span-7">
                    <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-[30px] border border-surface/15 bg-surface-dark shadow-glass">
                      <Image
                        src={newResidence.heroImage}
                        alt={newResidence.name[locale]}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 via-transparent to-surface-dark/30" />
                      <div className="absolute left-6 top-6 flex flex-wrap gap-2.5">
                        <Badge variant="brand">
                          <HardHat className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{tCommon('underConstruction')}</span>
                        </Badge>
                        <Badge variant="glass">{tHome('nowBuilding.badge')}</Badge>
                      </div>
                      <div className="spaciaz-glass absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-4 rounded-[20px] px-6 py-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-surface">
                          <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
                          <span>{newResidence.location.address[locale]}</span>
                        </div>
                        <span className="font-heading text-xs font-bold uppercase tracking-wider text-brand">
                          {newResidence.facts.apartmentSizeRange}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Liquid Glass Project Tracker (.spaciaz-glass) */}
                  <div className="lg:col-span-5">
                    <SpaciazEyebrow text={tHome('nowBuilding.eyebrow')} light />

                    <h2 className="font-heading text-[36px] font-bold leading-[1.06] tracking-[-0.03em] text-surface sm:text-[48px]">
                      {newResidence.name[locale]}
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-surface/75">
                      {newResidence.description[locale][0]}
                    </p>

                    {newResidence.construction && (
                      <div className="spaciaz-glass mt-5 rounded-[22px] p-4 sm:p-5">
                        <ProgressBar
                          percent={newResidence.construction.progressPercent}
                          label={tHome('nowBuilding.progressLabel')}
                          className="[&_span]:text-surface [&_.text-brand]:!text-brand"
                        />
                        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-surface/15 pt-3.5 text-xs">
                          <div>
                            <span className="block text-surface/60">
                              {tHome('nowBuilding.currentStageLabel')}
                            </span>
                            <span className="mt-1.5 inline-flex items-center gap-2 font-heading text-sm font-bold text-surface">
                              <span
                                className="h-2 w-2 rounded-full bg-brand"
                                aria-hidden="true"
                              />
                              {tStages(newResidence.construction.currentStage)}
                            </span>
                          </div>
                          <div>
                            <span className="block text-surface/60">
                              {tHome('nowBuilding.completionLabel')}
                            </span>
                            <span className="mt-1.5 inline-flex items-center gap-1.5 font-heading text-sm font-bold text-surface">
                              <Calendar
                                className="h-3.5 w-3.5 text-brand"
                                aria-hidden="true"
                              />
                              {newResidence.facts.expectedCompletion}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Glass Metrics */}
                    <dl className="mt-4 grid grid-cols-3 gap-2.5 text-center sm:gap-3">
                      <div className="spaciaz-glass rounded-[16px] p-2.5 sm:p-3">
                        <dt className="text-[11px] text-surface/65">{tCommon('floors')}</dt>
                        <dd className="mt-1 font-heading text-xl font-bold text-surface">
                          {newResidence.facts.floors}
                        </dd>
                      </div>
                      <div className="spaciaz-glass rounded-[16px] p-2.5 sm:p-3">
                        <dt className="text-[11px] text-surface/65">
                          {tCommon('apartments')}
                        </dt>
                        <dd className="mt-1 font-heading text-xl font-bold text-surface">
                          {newResidence.facts.apartments}
                        </dd>
                      </div>
                      <div className="spaciaz-glass rounded-[16px] p-2.5 sm:p-3">
                        <dt className="text-[11px] text-surface/65">
                          {tCommon('parkingSpaces')}
                        </dt>
                        <dd className="mt-1 font-heading text-xl font-bold text-surface">
                          {newResidence.facts.parkingSpaces}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-8 flex flex-wrap items-center gap-3.5">
                      <Button
                        href={`/residences/${newResidence.slug}`}
                        variant="primary"
                        size="lg"
                      >
                        {tHome('nowBuilding.ctaBtn')}
                      </Button>
                      <Button
                        href={`/quote?residence=${newResidence.slug}`}
                        variant="outline-white"
                        size="lg"
                      >
                        {tHome('nowBuilding.quoteBtn')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Part B: Delivered Residences (01, 02, 03, 04) */}
            <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <SectionHeader
                eyebrow={tHome('residencesSection.eyebrow')}
                title={tHome('residencesSection.title')}
                subtitle={tHome('residencesSection.subtitle')}
                light
                className="mb-0"
              />
              <Button href="/residences" variant="white" size="lg" className="shrink-0">
                {tHome('residencesSection.viewAllBtn')}
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {completedResidences.map((residence, idx) => (
                <FadeIn key={residence.slug} delay={idx * 0.08}>
                  <ResidenceCard
                    residence={residence}
                    locale={locale}
                    index={idx}
                    variant="glass-dark"
                    labels={cardLabels}
                  />
                </FadeIn>
              ))}
            </div>
          </Container>
        </div>
      </section>

      {/* =====================================================================
          4. SPACIAZ "WHY SHERIAG" BENTO GRID WITH CUTOUT CORNERS (.elementor-element-06cb890)
      ====================================================================== */}
      <Section variant="default" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow={tHome('whySheriag.eyebrow')}
            title={tHome('whySheriag.title')}
            subtitle={tHome('whySheriag.subtitle')}
          />

          <WhySheriagSection
            items={whyItems}
            closeLabel={tHome('whySheriag.modal.close')}
            learnMoreLabel={tCommon('learnMore')}
            contactBtnLabel={tHome('whySheriag.items.directBuy.title')}
          />
        </Container>
      </Section>

      {/* =====================================================================
          5. SPACIAZ GALLERY STRIP / GRID WITH LIGHTBOX
      ====================================================================== */}
      <Section variant="alt" spacing="lg" className="rounded-[40px] mx-3 sm:mx-6">
        <Container>
          <SectionHeader
            eyebrow={tHome('gallerySection.eyebrow')}
            title={tHome('gallerySection.title')}
            subtitle={tHome('gallerySection.subtitle')}
          />

          <Gallery
            items={homeGalleryItems}
            showFilterTabs={true}
            categoryLabels={categoryLabels}
            lightboxLabels={{
              close: tLightbox('close'),
              previous: tLightbox('previous'),
              next: tLightbox('next'),
              imageCountTemplate: tLightbox('imageCount', {
                current: '{current}',
                total: '{total}',
              }),
            }}
          />
        </Container>
      </Section>

      {/* =====================================================================
          6. SPACIAZ LOCATION & INTERACTIVE GOSTIVAR MAP SECTION (.elementor-element-7f9b39a)
      ====================================================================== */}
      <Section variant="default" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow={tHome('mapSection.eyebrow')}
            title={tHome('mapSection.title')}
            subtitle={tHome('mapSection.subtitle')}
          />

          <div className="overflow-hidden rounded-[30px] border border-border bg-surface-alt p-3 shadow-card sm:p-5">
            <MapView
              center={OFFICE_LOCATION}
              zoom={15}
              markers={mapMarkers}
              className="rounded-[22px] border-0"
            />

            {/* Spaciaz Pill Selector Strip below Map */}
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
              {residences.map((res, idx) => (
                <Link
                  key={res.slug}
                  href={`/residences/${res.slug}`}
                  className="group flex items-center justify-between rounded-full border border-border bg-surface px-4 py-3 text-left transition-all duration-200 hover:border-brand hover:bg-brand hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <span className="font-heading text-xs font-bold text-brand group-hover:text-surface">
                      0{idx + 1}
                    </span>
                    <span className="truncate font-heading text-xs font-bold text-ink group-hover:text-surface">
                      {res.name[locale]}
                    </span>
                  </span>
                  <Layers
                    className="h-3.5 w-3.5 shrink-0 text-muted group-hover:text-surface"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
