import React from 'react';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  Building2,
  Handshake,
  HardHat,
  ShieldCheck,
  Trees,
  UserCheck,
} from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { getPortfolioStats, residences } from '@/data/residences';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader, SpaciazEyebrow } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCounter } from '@/components/ui/StatCounter';
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
    path: '/about',
    title: tMeta('aboutTitle'),
    description: tMeta('aboutDescription'),
  });
}

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const tAbout = await getTranslations({ locale, namespace: 'aboutPage' });
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const stats = getPortfolioStats();

  const timelineResidences = [...residences].sort((a, b) => {
    if (a.status === 'under-construction') return 1;
    if (b.status === 'under-construction') return -1;
    return (a.facts.yearCompleted || '').localeCompare(b.facts.yearCompleted || '');
  });

  const values = [
    {
      num: '01',
      icon: ShieldCheck,
      title: tAbout('values.quality.title'),
      text: tAbout('values.quality.text'),
    },
    {
      num: '02',
      icon: Trees,
      title: tAbout('values.community.title'),
      text: tAbout('values.community.text'),
    },
    {
      num: '03',
      icon: Handshake,
      title: tAbout('values.transparency.title'),
      text: tAbout('values.transparency.text'),
    },
  ];

  const teamMembers = [
    {
      num: '01',
      name: tAbout('team.member1.name'),
      role: tAbout('team.member1.role'),
      bio: tAbout('team.member1.bio'),
    },
    {
      num: '02',
      name: tAbout('team.member2.name'),
      role: tAbout('team.member2.role'),
      bio: tAbout('team.member2.bio'),
    },
    {
      num: '03',
      name: tAbout('team.member3.name'),
      role: tAbout('team.member3.role'),
      bio: tAbout('team.member3.bio'),
    },
    {
      num: '04',
      name: tAbout('team.member4.name'),
      role: tAbout('team.member4.role'),
      bio: tAbout('team.member4.bio'),
    },
  ];

  return (
    <>
      {/* 1. Spaciaz Hero Banner with 50px White Arch */}
      <section className="relative overflow-hidden bg-surface-dark pt-36 pb-24 text-surface lg:pt-44 lg:pb-28">
        <Image
          src="/images/about/company-architecture.jpg"
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
          <SpaciazEyebrow text={tAbout('eyebrow')} light />
          <h1 className="max-w-4xl font-heading text-[40px] font-bold leading-[1.06] tracking-[-0.03em] text-surface sm:text-[56px] lg:text-[68px]">
            {tAbout('title')}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-surface/75">
            {tAbout('subtitle')}
          </p>
        </Container>

        <div
          className="absolute inset-x-0 bottom-0 z-10 h-7 rounded-t-[40px] bg-surface sm:h-10 sm:rounded-t-[50px]"
          aria-hidden="true"
        />
      </section>

      {/* 2. Company Story + Architectural Illustration */}
      <Section variant="default" spacing="lg" className="pt-12 sm:pt-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeader
                eyebrow={tAbout('storyEyebrow')}
                title={tAbout('storyTitle')}
                className="mb-6"
              />
              <div className="space-y-5 text-base leading-relaxed text-ink-body sm:text-lg">
                <p>{tAbout('storyP1')}</p>
                <p className="rounded-[20px] border border-brand/35 bg-brand-tint/60 p-6 font-heading text-base font-bold text-ink">
                  {tAbout('storyP2')}
                </p>
                <p>{tAbout('storyP3')}</p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[30px] bg-surface-dark shadow-card">
                <Image
                  src="/images/about/company-architecture.jpg"
                  alt="SHERIAG Development & Construction in Gostivar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="spaciaz-glass absolute bottom-5 left-5 right-5 rounded-[20px] p-5 text-surface">
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-brand">
                    SHERIAG • Gostivar
                  </span>
                  <p className="mt-1 font-heading text-base font-bold">
                    {tAbout('storyTitle')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Spaciaz Tall Stat Cards */}
          <div className="mt-10 grid grid-cols-1 gap-3.5 sm:gap-4 lg:grid-cols-4">
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
        </Container>
      </Section>

      {/* 3. Mission & Values (Spaciaz Numbered Cards) */}
      <Section variant="alt" spacing="lg" className="mx-3 rounded-[40px] sm:mx-6">
        <Container>
          <SectionHeader
            eyebrow={tAbout('valuesEyebrow')}
            title={tAbout('valuesTitle')}
          />

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <Card
                  key={val.num}
                  hoverable
                  className="flex min-h-[250px] flex-col justify-between p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-tint text-brand">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span
                      aria-hidden="true"
                      className="font-heading text-4xl sm:text-5xl font-bold spaciaz-outline-dark"
                    >
                      {val.num}
                    </span>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-heading text-2xl font-bold tracking-[-0.02em] text-ink">
                      {val.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-body">
                      {val.text}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. Dark Architectural Timeline of Delivered & Active Buildings (.elementor-careersshowcase-item style) */}
      <section className="px-3 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1680px] overflow-hidden rounded-[32px] bg-surface-dark py-20 text-surface sm:rounded-[50px] sm:py-28">
          <Container>
            <SectionHeader
              eyebrow={tAbout('timelineEyebrow')}
              title={tAbout('timelineTitle')}
              subtitle={tAbout('timelineSubtitle')}
              light
            />

            <div className="divide-y divide-surface/15 border-y border-surface/15">
              {timelineResidences.map((res, idx) => {
                const isUnderConstruction = res.status === 'under-construction';
                return (
                  <div
                    key={res.slug}
                    className="group flex flex-col items-start justify-between gap-6 py-8 transition-colors hover:bg-surface/5 sm:px-6 lg:flex-row lg:items-center"
                  >
                    <div className="flex flex-wrap items-center gap-5">
                      <span className="font-heading text-4xl font-bold spaciaz-outline-light group-hover:text-brand sm:text-5xl">
                        0{idx + 1}
                      </span>
                      <Badge variant={isUnderConstruction ? 'brand' : 'glass'}>
                        {isUnderConstruction ? (
                          <>
                            <HardHat className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{tCommon('underConstruction')}</span>
                          </>
                        ) : (
                          <>
                            <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{res.facts.yearCompleted}</span>
                          </>
                        )}
                      </Badge>
                      <div>
                        <h3 className="font-heading text-2xl font-bold text-surface group-hover:text-brand sm:text-3xl">
                          {res.name[locale]}
                        </h3>
                        <p className="mt-1 max-w-xl text-sm text-surface/70">
                          {res.tagline[locale]}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <span className="rounded-full border border-surface/15 px-4 py-2 text-xs font-semibold text-surface/80">
                        {res.facts.floors} {tCommon('floors')} • {res.facts.apartments}{' '}
                        {tCommon('apartments')} • {res.facts.parkingSpaces}{' '}
                        {tCommon('parkingSpaces')}
                      </span>
                      <Button
                        href={`/residences/${res.slug}`}
                        variant="outline-white"
                        size="sm"
                      >
                        {tCommon('viewResidence')}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
      </section>

      {/* 5. Team Section (4 Placeholder Cards Marked TODO) */}
      <Section variant="default" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow={tAbout('teamEyebrow')}
            title={tAbout('teamTitle')}
            subtitle={tAbout('teamSubtitle')}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <Card
                key={member.num}
                hoverable
                className="flex flex-col justify-between bg-surface-alt p-5 sm:p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand/30 bg-brand-tint text-brand">
                      <UserCheck className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span
                      aria-hidden="true"
                      className="font-heading text-4xl font-bold spaciaz-outline-dark"
                    >
                      {member.num}
                    </span>
                  </div>
                  <div className="mt-6">
                    <span className="font-heading text-xs font-bold uppercase tracking-wider text-brand">
                      {member.role}
                    </span>
                    <h3 className="mt-1.5 font-heading text-xl font-bold text-ink">
                      {member.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-body">
                      {member.bio}
                    </p>
                  </div>
                </div>
                <div className="mt-6 border-t border-border pt-3 text-[11px] font-medium text-muted">
                  {tCommon('todoPlaceholderNote')}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
