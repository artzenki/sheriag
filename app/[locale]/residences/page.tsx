import React from 'react';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ChevronRight } from 'lucide-react';
import { Link, type Locale } from '@/i18n/routing';
import { residences } from '@/data/residences';
import { Container } from '@/components/ui/Container';
import { Section, SpaciazEyebrow } from '@/components/ui/Section';
import { ResidencesFilterGrid } from '@/components/residences/ResidencesFilterGrid';
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
    path: '/residences',
    title: tMeta('residencesTitle'),
    description: tMeta('residencesDescription'),
  });
}

export default async function ResidencesPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const tPage = await getTranslations({ locale, namespace: 'residencesPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const totalCount = residences.length;
  const completedCount = residences.filter((r) => r.status === 'completed').length;
  const underConstructionCount = residences.filter(
    (r) => r.status === 'under-construction'
  ).length;

  return (
    <>
      {/* Spaciaz Architectural Hero Header with Liquid Glass Breadcrumb & 50px Bottom White Arch */}
      <section className="relative overflow-hidden bg-surface-dark pt-36 pb-24 text-surface lg:pt-44 lg:pb-28">
        <Image
          src="/images/hero/gostivar-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-surface-dark/80 via-surface-dark/70 to-surface-dark/90"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <nav
            aria-label="Breadcrumb"
            className="spaciaz-glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-surface/85"
          >
            <Link
              href="/"
              className="transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
            >
              {tNav('home')}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            <span className="text-surface" aria-current="page">
              {tNav('residences')}
            </span>
          </nav>

          <div>
            <SpaciazEyebrow text={tPage('eyebrow')} light />
          </div>

          <h1 className="max-w-4xl font-heading text-[40px] font-bold leading-[1.06] tracking-[-0.03em] text-surface sm:text-[56px] lg:text-[68px]">
            {tPage('title')}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-surface/75">
            {tPage('intro')}
          </p>
        </Container>

        <div
          className="absolute inset-x-0 bottom-0 z-10 h-7 rounded-t-[40px] bg-surface sm:h-10 sm:rounded-t-[50px]"
          aria-hidden="true"
        />
      </section>

      {/* Filter Tabs & Residences Grid */}
      <Section variant="default" spacing="lg" className="pt-10 sm:pt-14">
        <Container>
          <ResidencesFilterGrid
            residences={residences}
            locale={locale}
            labels={{
              filterAll: tPage('filterAll', { count: totalCount }),
              filterCompleted: tPage('filterCompleted', { count: completedCount }),
              filterUnderConstruction: tPage('filterUnderConstruction', {
                count: underConstructionCount,
              }),
              spotlightBanner: tPage('spotlightBanner'),
              requestQuote: tCommon('requestQuote'),
              cardLabels: {
                completed: tCommon('completed'),
                underConstruction: tCommon('underConstruction'),
                floors: tCommon('floors'),
                apartments: tCommon('apartments'),
                parkingSpaces: tCommon('parkingSpaces'),
                viewResidence: tCommon('viewResidence'),
              },
            }}
          />
        </Container>
      </Section>
    </>
  );
}
