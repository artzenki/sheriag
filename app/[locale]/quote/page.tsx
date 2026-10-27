import React, { Suspense } from 'react';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  CheckCircle2,
  Clock,
  Handshake,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Section, SpaciazEyebrow } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { QuoteForm } from '@/components/forms/QuoteForm';
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
    path: '/quote',
    title: tMeta('quoteTitle'),
    description: tMeta('quoteDescription'),
  });
}

export default async function QuotePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const tQuote = await getTranslations({ locale, namespace: 'quotePage' });
  const tContact = await getTranslations({ locale, namespace: 'contactPage' });

  const reassurancePoints = [
    {
      icon: Clock,
      title: tQuote('reassurance1Title'),
      text: tQuote('reassurance1Text'),
    },
    {
      icon: ShieldCheck,
      title: tQuote('reassurance2Title'),
      text: tQuote('reassurance2Text'),
    },
    {
      icon: Handshake,
      title: tQuote('reassurance3Title'),
      text: tQuote('reassurance3Text'),
    },
  ];

  return (
    <>
      {/* Spaciaz Hero Banner with 50px Bottom White Arch */}
      <section className="relative overflow-hidden bg-surface-dark pt-36 pb-24 text-surface lg:pt-44 lg:pb-28">
        <Image
          src="/images/residences/sheriag-new-residence/render-main.jpg"
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
          <SpaciazEyebrow text={tQuote('eyebrow')} light />
          <h1 className="max-w-4xl font-heading text-[40px] font-bold leading-[1.06] tracking-[-0.03em] text-surface sm:text-[56px] lg:text-[68px]">
            {tQuote('title')}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-surface/75">
            {tQuote('subtitle')}
          </p>
        </Container>

        <div
          className="absolute inset-x-0 bottom-0 z-10 h-7 rounded-t-[40px] bg-surface sm:h-10 sm:rounded-t-[50px]"
          aria-hidden="true"
        />
      </section>

      {/* Two-Column Spaciaz Layout */}
      <Section variant="default" spacing="lg" className="pt-10 sm:pt-14">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <Card className="bg-surface-alt p-5 sm:p-8">
                <Suspense
                  fallback={
                    <div className="py-12 text-center text-sm text-muted">
                      Loading quote form…
                    </div>
                  }
                >
                  <QuoteForm />
                </Suspense>
              </Card>
            </div>

            {/* Right Column: Reassurance Points & Direct Contact Liquid Glass Card */}
            <div className="space-y-6 lg:col-span-5">
              <Card className="bg-surface-alt p-5 sm:p-7">
                <h2 className="font-heading text-2xl font-bold text-ink">
                  {tQuote('reassuranceTitle')}
                </h2>
                <ul className="mt-6 space-y-6">
                  {reassurancePoints.map((pt, idx) => {
                    const Icon = pt.icon || CheckCircle2;
                    return (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-tint text-brand">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-bold text-ink">
                            {pt.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-ink-body">
                            {pt.text}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Card>

              {/* Spaciaz Dark Architectural Direct Contact Card with Liquid Glass */}
              <div className="relative overflow-hidden rounded-[24px] bg-surface-dark p-5 text-surface sm:p-7">
                <div className="spaciaz-glass rounded-[18px] p-4 sm:p-5">
                  <h2 className="font-heading text-xl font-bold text-surface">
                    {tQuote('directContactTitle')}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-surface/75">
                    {tQuote('directContactText')}
                  </p>

                  <ul className="mt-6 space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                      <Phone
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      <div>
                        <span className="block font-heading text-[11px] font-semibold uppercase tracking-wider text-surface/65">
                          {tContact('phoneCardTitle')}
                        </span>
                        <a
                          href="tel:+38942000000"
                          className="font-heading text-base font-bold text-surface hover:text-brand"
                        >
                          {tContact('phoneValue')}
                        </a>
                        <span className="block text-xs text-surface/75">
                          WhatsApp: {tContact('whatsappValue')}
                        </span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <Mail
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      <div>
                        <span className="block font-heading text-[11px] font-semibold uppercase tracking-wider text-surface/65">
                          {tContact('emailCardTitle')}
                        </span>
                        <a
                          href="mailto:sales@sheriag.mk"
                          className="font-heading text-base font-bold text-surface hover:text-brand"
                        >
                          {tContact('salesEmailValue')}
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      <div>
                        <span className="block font-heading text-[11px] font-semibold uppercase tracking-wider text-surface/65">
                          {tContact('addressCardTitle')}
                        </span>
                        <span className="font-medium text-surface/90">
                          {tContact('addressValue')}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
