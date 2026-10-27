import React from 'react';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { OFFICE_LOCATION } from '@/data/residences';
import { Container } from '@/components/ui/Container';
import { Section, SectionHeader, SpaciazEyebrow } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { MapView } from '@/components/ui/MapView';
import { ContactForm } from '@/components/forms/ContactForm';
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
    path: '/contact',
    title: tMeta('contactTitle'),
    description: tMeta('contactDescription'),
  });
}

export default async function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  setRequestLocale(locale);

  const tContact = await getTranslations({ locale, namespace: 'contactPage' });

  return (
    <>
      {/* Spaciaz Hero Banner with 50px Bottom White Arch */}
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
          <SpaciazEyebrow text={tContact('eyebrow')} light />
          <h1 className="max-w-4xl font-heading text-[40px] font-bold leading-[1.06] tracking-[-0.03em] text-surface sm:text-[56px] lg:text-[68px]">
            {tContact('title')}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-surface/75">
            {tContact('subtitle')}
          </p>

          {/* 3 Spaciaz Liquid Glass Contact Cards Right Inside Hero */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="spaciaz-glass rounded-[20px] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/20 text-brand">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="font-heading text-3xl font-bold spaciaz-outline-light">
                  01
                </span>
              </div>
              <h2 className="mt-4 sm:mt-5 font-heading text-xl font-bold text-surface">
                {tContact('addressCardTitle')}
              </h2>
              <p className="mt-2 text-sm font-semibold text-surface/90">
                {tContact('addressValue')}
              </p>
              <p className="mt-2 text-xs text-surface/65">{tContact('addressNote')}</p>
            </div>

            <div className="spaciaz-glass rounded-[20px] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/20 text-brand">
                  <Phone className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="font-heading text-3xl font-bold spaciaz-outline-light">
                  02
                </span>
              </div>
              <h2 className="mt-4 sm:mt-5 font-heading text-xl font-bold text-surface">
                {tContact('phoneCardTitle')}
              </h2>
              <div className="mt-2 space-y-1 text-sm font-semibold text-surface/90">
                <a href="tel:+38942000000" className="block hover:text-brand">
                  Tel: {tContact('phoneValue')}
                </a>
                <a
                  href="https://wa.me/38970000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-brand"
                >
                  WhatsApp: {tContact('whatsappValue')}
                </a>
              </div>
              <p className="mt-2 text-xs text-surface/65">{tContact('phoneNote')}</p>
            </div>

            <div className="spaciaz-glass rounded-[20px] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/20 text-brand">
                  <Mail className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="font-heading text-3xl font-bold spaciaz-outline-light">
                  03
                </span>
              </div>
              <h2 className="mt-4 sm:mt-5 font-heading text-xl font-bold text-surface">
                {tContact('emailCardTitle')}
              </h2>
              <div className="mt-2 space-y-1 text-sm font-semibold text-surface/90">
                <a href="mailto:info@sheriag.mk" className="block hover:text-brand">
                  {tContact('emailValue')}
                </a>
                <a href="mailto:sales@sheriag.mk" className="block hover:text-brand">
                  {tContact('salesEmailValue')}
                </a>
              </div>
              <p className="mt-2 text-xs text-surface/65">{tContact('emailNote')}</p>
            </div>
          </div>
        </Container>

        <div
          className="absolute inset-x-0 bottom-0 z-10 h-7 rounded-t-[40px] bg-surface sm:h-10 sm:rounded-t-[50px]"
          aria-hidden="true"
        />
      </section>

      {/* Contact Form + Working Hours */}
      <Section variant="default" spacing="lg" className="pt-10 sm:pt-14">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Card className="bg-surface-alt p-5 sm:p-8">
                <h2 className="font-heading text-3xl font-bold tracking-[-0.03em] text-ink">
                  {tContact('formSectionTitle')}
                </h2>
                <p className="mt-2 mb-8 text-sm leading-relaxed text-ink-body">
                  {tContact('formSectionSubtitle')}
                </p>
                <ContactForm />
              </Card>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <Card className="bg-surface-alt p-5 sm:p-7">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-5 w-5 text-brand" aria-hidden="true" />
                  <h2 className="font-heading text-2xl font-bold text-ink">
                    {tContact('hoursTitle')}
                  </h2>
                </div>
                <ul className="mt-6 space-y-4 text-sm text-ink-body">
                  <li className="border-b border-border pb-4 font-heading font-semibold text-ink">
                    {tContact('hoursWeekdays')}
                  </li>
                  <li className="border-b border-border pb-4 font-heading font-semibold text-ink">
                    {tContact('hoursSaturday')}
                  </li>
                  <li className="text-xs text-muted">{tContact('hoursSunday')}</li>
                </ul>

                <div className="mt-8 border-t border-border pt-6">
                  <div className="flex items-center gap-3">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="SHERIAG on Facebook (TODO)"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-brand hover:bg-brand hover:text-surface"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="SHERIAG on Instagram (TODO)"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-brand hover:bg-brand hover:text-surface"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="SHERIAG on LinkedIn (TODO)"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-brand hover:bg-brand hover:text-surface"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Large Leaflet Map with Office Pin */}
      <Section variant="alt" spacing="lg" className="mx-3 rounded-[40px] sm:mx-6 mb-8">
        <Container>
          <SectionHeader
            eyebrow={tContact('eyebrow')}
            title={tContact('mapTitle')}
            subtitle={tContact('addressValue')}
          />

          <MapView
            center={OFFICE_LOCATION}
            zoom={15}
            className="rounded-[25px]"
            markers={[
              {
                id: 'sheriag-office',
                lat: OFFICE_LOCATION.lat,
                lng: OFFICE_LOCATION.lng,
                title: 'SHERIAG — Sales & Development Office',
                subtitle: tContact('addressValue'),
                badgeText: 'Gostivar',
                isUnderConstruction: true,
              },
            ]}
          />
        </Container>
      </Section>
    </>
  );
}
