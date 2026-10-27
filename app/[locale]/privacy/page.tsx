import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Section, SpaciazEyebrow } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
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
    path: '/privacy',
    title: tMeta('privacyTitle'),
    description: tMeta('privacyDescription'),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const tPrivacy = await getTranslations({ locale, namespace: 'privacyPage' });

  return (
    <>
      <section className="relative overflow-hidden bg-surface-dark pt-36 pb-20 text-surface lg:pt-44 lg:pb-24">
        <Container className="relative z-10">
          <SpaciazEyebrow text={tPrivacy('eyebrow')} light />
          <h1 className="font-heading text-[40px] font-bold leading-[1.06] tracking-[-0.03em] text-surface sm:text-[56px]">
            {tPrivacy('title')}
          </h1>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-surface/65">
            {tPrivacy('lastUpdated')}
          </p>
        </Container>
        <div
          className="absolute inset-x-0 bottom-0 z-10 h-7 rounded-t-[40px] bg-surface sm:h-10 sm:rounded-t-[50px]"
          aria-hidden="true"
        />
      </section>

      <Section variant="default" spacing="lg" className="pt-10">
        <Container>
          <Card className="mx-auto max-w-3xl space-y-8 bg-surface-alt p-7 sm:p-10">
            <p className="text-base leading-relaxed text-ink-body">{tPrivacy('intro')}</p>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink">
                {tPrivacy('section1Title')}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">
                {tPrivacy('section1Body')}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink">
                {tPrivacy('section2Title')}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">
                {tPrivacy('section2Body')}
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-ink">
                {tPrivacy('section3Title')}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">
                {tPrivacy('section3Body')}
              </p>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
