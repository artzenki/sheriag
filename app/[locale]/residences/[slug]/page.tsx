import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  ArrowUpDown,
  Baby,
  Building2,
  Calendar,
  Car,
  CheckCircle2,
  ChevronRight,
  Footprints,
  GraduationCap,
  HeartPulse,
  Images,
  Layers,
  Lock,
  MapPin,
  Maximize2,
  Package,
  Phone,
  Shield,
  ShoppingBag,
  Sparkles,
  Store,
  Sun,
  Thermometer,
  Trees,
} from 'lucide-react';
import { Link, routing, type Locale } from '@/i18n/routing';
import {
  getResidenceBySlug,
  residences,
  type AmenityKey,
  type GalleryCategory,
  type NearbyPlaceType,
} from '@/data/residences';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, ResidenceCard } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ConstructionTimeline } from '@/components/ui/Timeline';
import { Gallery, type GalleryPhoto } from '@/components/ui/Gallery';
import { MapView } from '@/components/ui/MapView';
import { ContactForm } from '@/components/forms/ContactForm';
import { buildPageMetadata, getResidenceJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of routing.locales) {
    for (const res of residences) {
      params.push({ locale, slug: res.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as Locale;
  const residence = getResidenceBySlug(params.slug);

  if (!residence) {
    return {};
  }

  return buildPageMetadata({
    locale,
    path: `/residences/${residence.slug}`,
    title: `${residence.name[locale]} | SHERIAG Gostivar`,
    description: residence.tagline[locale],
    image: residence.heroImage,
  });
}

const amenityIconMap: Record<AmenityKey, React.ComponentType<{ className?: string }>> = {
  parking: Car,
  park: Trees,
  playground: Baby,
  elevator: ArrowUpDown,
  security: Lock,
  storage: Package,
  insulation: Shield,
  heating: Thermometer,
  balcony: Sun,
  commercial: Store,
};

const nearbyIconMap: Record<NearbyPlaceType, React.ComponentType<{ className?: string }>> = {
  center: Building2,
  school: GraduationCap,
  market: ShoppingBag,
  park: Trees,
  health: HeartPulse,
  transport: MapPin,
};

export default async function ResidenceDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as Locale;
  const residence = getResidenceBySlug(params.slug);

  if (!residence) {
    notFound();
  }

  setRequestLocale(locale);

  const tDetail = await getTranslations({ locale, namespace: 'residenceDetail' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tAmenities = await getTranslations({ locale, namespace: 'amenities' });
  const tNearby = await getTranslations({ locale, namespace: 'nearbyTypes' });
  const tStages = await getTranslations({ locale, namespace: 'stages' });
  const tGalleryCats = await getTranslations({ locale, namespace: 'galleryCategories' });
  const tLightbox = await getTranslations({ locale, namespace: 'lightbox' });

  const isUnderConstruction = residence.status === 'under-construction';

  const galleryPhotos: GalleryPhoto[] = residence.gallery.map((item) => ({
    src: item.src,
    alt: item.alt[locale],
    category: item.category,
    residenceName: residence.name[locale],
  }));

  const categoryLabels: Record<'all' | GalleryCategory, string> = {
    all: tGalleryCats('all'),
    exterior: tGalleryCats('exterior'),
    interior: tGalleryCats('interior'),
    surroundings: tGalleryCats('surroundings'),
    render: tGalleryCats('render'),
    construction: tGalleryCats('construction'),
  };

  const otherResidences = residences
    .filter((r) => r.slug !== residence.slug)
    .slice(0, 2);

  const cardLabels = {
    completed: tCommon('completed'),
    underConstruction: tCommon('underConstruction'),
    floors: tCommon('floors'),
    apartments: tCommon('apartments'),
    parkingSpaces: tCommon('parkingSpaces'),
    viewResidence: tCommon('viewResidence'),
  };

  const jsonLd = getResidenceJsonLd(residence, locale);

  return (
    <div className="pb-20 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Spaciaz Hero + 5 Liquid Glass Quick Facts Cards */}
      <section className="relative overflow-hidden bg-surface-dark pt-36 pb-24 lg:pt-44 lg:pb-32">
        <Image
          src={residence.heroImage}
          alt={residence.name[locale]}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-surface-dark/95 via-surface-dark/65 to-surface-dark/50"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          {/* Liquid Glass Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="spaciaz-glass mb-7 inline-flex flex-wrap items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-surface/85"
          >
            <Link
              href="/"
              className="transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
            >
              {tDetail('breadcrumbHome')}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            <Link
              href="/residences"
              className="transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
            >
              {tDetail('breadcrumbResidences')}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            <span className="text-surface" aria-current="page">
              {residence.name[locale]}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={isUnderConstruction ? 'brand' : 'glass'}>
              <span
                className={
                  isUnderConstruction
                    ? 'h-2 w-2 rounded-full bg-surface'
                    : 'h-2 w-2 rounded-full bg-brand'
                }
                aria-hidden="true"
              />
              {isUnderConstruction
                ? tCommon('underConstruction')
                : tCommon('completed')}
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-surface/90">
              <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
              {residence.location.address[locale]}
            </span>
          </div>

          <div className="mt-5 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h1 className="font-heading text-[42px] font-bold leading-[1.05] tracking-[-0.03em] text-surface sm:text-[58px] lg:text-[72px]">
                {residence.name[locale]}
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-surface/80 sm:text-xl">
                {residence.tagline[locale]}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <Button
                href={`/quote?residence=${residence.slug}`}
                variant="primary"
                size="lg"
              >
                {tDetail('requestQuoteBtn')}
              </Button>
              <Button href="#gallery" variant="outline-white" size="lg">
                <Images className="h-4 w-4" aria-hidden="true" />
                <span>{tDetail('viewGalleryBtn')}</span>
              </Button>
            </div>
          </div>

          {/* 2. Spaciaz Liquid Glass Quick Facts Bar (5 Glass Cards inside Hero) */}
          <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5">
            <div className="spaciaz-glass rounded-[20px] p-5 sm:p-6">
              <dt className="flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-wider text-surface/70">
                <Layers className="h-4 w-4 text-brand" aria-hidden="true" />
                <span>{tCommon('floors')}</span>
              </dt>
              <dd className="mt-3 font-heading text-3xl font-bold tracking-[-0.03em] text-surface sm:text-4xl">
                {residence.facts.floors}
              </dd>
            </div>

            <div className="spaciaz-glass rounded-[20px] p-5 sm:p-6">
              <dt className="flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-wider text-surface/70">
                <Building2 className="h-4 w-4 text-brand" aria-hidden="true" />
                <span>{tCommon('apartments')}</span>
              </dt>
              <dd className="mt-3 font-heading text-3xl font-bold tracking-[-0.03em] text-surface sm:text-4xl">
                {residence.facts.apartments}
              </dd>
            </div>

            <div className="spaciaz-glass rounded-[20px] p-5 sm:p-6">
              <dt className="flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-wider text-surface/70">
                <Car className="h-4 w-4 text-brand" aria-hidden="true" />
                <span>{tCommon('parkingSpaces')}</span>
              </dt>
              <dd className="mt-3 font-heading text-3xl font-bold tracking-[-0.03em] text-surface sm:text-4xl">
                {residence.facts.parkingSpaces}
              </dd>
            </div>

            <div className="spaciaz-glass rounded-[20px] p-5 sm:p-6">
              <dt className="flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-wider text-surface/70">
                <Maximize2 className="h-4 w-4 text-brand" aria-hidden="true" />
                <span>{tCommon('apartmentSizeRange')}</span>
              </dt>
              <dd className="mt-3 font-heading text-2xl font-bold tracking-[-0.03em] text-surface sm:text-3xl">
                {residence.facts.apartmentSizeRange}
              </dd>
            </div>

            <div className="spaciaz-glass col-span-2 rounded-[20px] p-5 sm:col-span-1 sm:p-6">
              <dt className="flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-wider text-surface/70">
                <Calendar className="h-4 w-4 text-brand" aria-hidden="true" />
                <span>
                  {residence.facts.yearCompleted
                    ? tCommon('yearCompleted')
                    : tCommon('expectedCompletion')}
                </span>
              </dt>
              <dd className="mt-3 font-heading text-2xl font-bold tracking-[-0.03em] text-brand sm:text-3xl">
                {residence.facts.yearCompleted || residence.facts.expectedCompletion}
              </dd>
            </div>
          </dl>
        </Container>

        <div
          className="absolute inset-x-0 bottom-0 z-10 h-7 rounded-t-[40px] bg-surface sm:h-10 sm:rounded-t-[50px]"
          aria-hidden="true"
        />
      </section>

      {/* 3. Overview: Description Left, Key Highlights Right */}
      <Section variant="default" spacing="lg" className="pt-12 sm:pt-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow={tDetail('overviewEyebrow')}
                title={tDetail('overviewTitle')}
                className="mb-6"
              />
              <div className="space-y-4 text-base leading-relaxed text-ink-body sm:text-lg">
                {residence.description[locale].map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[30px] border border-border bg-surface-alt p-7 sm:p-9">
                <div className="flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-brand">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  <span>{tDetail('highlightsTitle')}</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {residence.highlights[locale].map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3.5 border-b border-border/70 pb-4 last:border-0 last:pb-0 text-sm font-semibold text-ink"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Amenities Grid with Icons */}
      <Section variant="alt" spacing="lg" className="mx-3 rounded-[40px] sm:mx-6">
        <Container>
          <SectionHeader
            eyebrow={tDetail('amenitiesEyebrow')}
            title={tDetail('amenitiesTitle')}
            subtitle={tDetail('amenitiesSubtitle')}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {residence.amenities.map((amenityKey) => {
              const Icon = amenityIconMap[amenityKey] || Building2;
              return (
                <div
                  key={amenityKey}
                  className="group flex items-center gap-4 rounded-[22px] border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:border-brand/50 hover:shadow-card"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-tint text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-surface">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-heading text-base font-bold text-ink">
                    {tAmenities(amenityKey)}
                  </span>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 5. Apartment Types */}
      <Section variant="default" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow={tDetail('apartmentsEyebrow')}
            title={tDetail('apartmentsTitle')}
            subtitle={tDetail('apartmentsSubtitle')}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {residence.apartmentTypes.map((apt, idx) => (
              <Card
                key={apt.key}
                hoverable
                className="flex flex-col justify-between bg-surface-alt p-7 sm:p-9"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="tint">{apt.sizeRange}</Badge>
                    <span
                      aria-hidden="true"
                      className="font-heading text-4xl font-bold spaciaz-outline-dark"
                    >
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold tracking-[-0.02em] text-ink">
                    {apt.name[locale]}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-body">
                    {apt.description[locale]}
                  </p>
                </div>

                <div className="mt-8 border-t border-border pt-6">
                  <Button
                    href={`/quote?residence=${residence.slug}&type=${apt.key}`}
                    variant="outline"
                    size="md"
                    className="w-full"
                  >
                    {tDetail('askAvailabilityBtn')}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Construction Progress (ONLY if status is under-construction) */}
      {isUnderConstruction && residence.construction && (
        <section className="px-3 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1680px] overflow-hidden rounded-[32px] bg-surface-dark py-20 text-surface sm:rounded-[50px] sm:py-28">
            <Container>
              <SectionHeader
                eyebrow={tDetail('constructionEyebrow')}
                title={tDetail('constructionTitle')}
                subtitle={tDetail('constructionSubtitle')}
                light
              />

              <div className="spaciaz-glass mb-12 rounded-[28px] p-6 sm:p-10">
                <ProgressBar
                  percent={residence.construction.progressPercent}
                  label={tDetail('overallProgress')}
                  currentStageText={`${tDetail('currentPhase')}: ${tStages(
                    residence.construction.currentStage
                  )}`}
                  className="[&_span]:text-surface [&_.text-brand]:!text-brand [&_p]:text-surface/80"
                />

                <div className="mt-8">
                  <ConstructionTimeline
                    steps={residence.construction.stages.map((st) => ({
                      key: st.key,
                      label: tStages(st.key),
                      status: st.status,
                      statusLabel:
                        st.status === 'completed'
                          ? tDetail('stageDone')
                          : st.status === 'current'
                            ? tDetail('stageCurrent')
                            : tDetail('stageUpcoming'),
                    }))}
                  />
                </div>
              </div>

              {/* Monthly Site Updates */}
              {residence.construction.updates.length > 0 && (
                <div>
                  <h3 className="mb-6 font-heading text-2xl font-bold text-surface">
                    {tDetail('recentUpdatesTitle')}
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {residence.construction.updates.map((upd, idx) => (
                      <div
                        key={idx}
                        className="spaciaz-glass overflow-hidden rounded-[25px]"
                      >
                        {upd.images[0] && (
                          <div className="relative aspect-[16/9] w-full bg-surface-dark">
                            <Image
                              src={upd.images[0]}
                              alt={upd.title[locale]}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6 sm:p-8">
                          <Badge variant="brand">{upd.date}</Badge>
                          <h4 className="mt-4 font-heading text-xl font-bold text-surface">
                            {upd.title[locale]}
                          </h4>
                          <p className="mt-2.5 text-sm leading-relaxed text-surface/75">
                            {upd.text[locale]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Container>
          </div>
        </section>
      )}

      {/* 7. Gallery with Category Tabs and Lightbox */}
      <Section id="gallery" variant="default" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow={tDetail('galleryEyebrow')}
            title={tDetail('galleryTitle')}
          />

          <Gallery
            items={galleryPhotos}
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

      {/* 8. Location & Area: Leaflet Map + Walking Times */}
      <Section variant="alt" spacing="lg" className="mx-3 rounded-[40px] sm:mx-6">
        <Container>
          <SectionHeader
            eyebrow={tDetail('locationEyebrow')}
            title={tDetail('locationTitle')}
            subtitle={tDetail('locationSubtitle')}
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <MapView
                center={{ lat: residence.location.lat, lng: residence.location.lng }}
                zoom={16}
                className="rounded-[25px]"
                markers={[
                  {
                    id: residence.slug,
                    lat: residence.location.lat,
                    lng: residence.location.lng,
                    title: residence.name[locale],
                    subtitle: residence.location.address[locale],
                    badgeText: isUnderConstruction
                      ? tCommon('underConstruction')
                      : tCommon('completed'),
                    isUnderConstruction,
                  },
                ]}
              />
            </div>

            <div className="lg:col-span-5">
              <Card className="h-full p-7 sm:p-8">
                <div className="flex items-center gap-2.5 border-b border-border pb-4">
                  <Footprints className="h-5 w-5 text-brand" aria-hidden="true" />
                  <h3 className="font-heading text-xl font-bold text-ink">
                    {tDetail('nearbyHeading')}
                  </h3>
                </div>
                <ul className="mt-4 divide-y divide-border">
                  {residence.nearby.map((place, idx) => {
                    const Icon = nearbyIconMap[place.type] || MapPin;
                    return (
                      <li
                        key={idx}
                        className="flex items-center justify-between gap-4 py-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <div>
                            <div className="font-heading text-sm font-bold text-ink">
                              {place.name[locale]}
                            </div>
                            <div className="text-xs text-muted">
                              {tNearby(place.type)}
                            </div>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full bg-surface-alt px-3.5 py-1 font-heading text-xs font-bold text-ink">
                          {tCommon('walkingMinutes', { minutes: place.walkingMinutes })}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* 9. Inline Interest Form */}
      <Section variant="default" spacing="lg">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[30px] border border-border bg-surface-alt p-7 shadow-card sm:p-12">
            <SectionHeader
              eyebrow={tDetail('interestEyebrow')}
              title={tDetail('interestTitle', { name: residence.name[locale] })}
              subtitle={tDetail('interestSubtitle')}
              className="mb-8"
            />
            <ContactForm
              residenceSlug={residence.slug}
              residenceName={residence.name[locale]}
            />
          </div>
        </Container>
      </Section>

      {/* 10. Other Residences */}
      <Section variant="default" spacing="md" className="border-t border-border">
        <Container>
          <SectionHeader
            eyebrow={tDetail('otherResidencesEyebrow')}
            title={tDetail('otherResidencesTitle')}
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {otherResidences.map((other, idx) => (
              <ResidenceCard
                key={other.slug}
                residence={other}
                locale={locale}
                index={idx}
                labels={cardLabels}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-border bg-surface/95 backdrop-blur-xl p-3 shadow-header lg:hidden">
        <a
          href="tel:+38942000000"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-surface-alt py-3 font-heading text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
          <span>{tDetail('mobileCall')}</span>
        </a>
        <Button
          href={`/quote?residence=${residence.slug}`}
          variant="primary"
          size="md"
          className="flex-1"
        >
          {tDetail('mobileQuote')}
        </Button>
      </div>
    </div>
  );
}
