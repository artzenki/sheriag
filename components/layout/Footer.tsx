import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link, Locale } from '@/i18n/routing';
import { residences } from '@/data/residences';
import { Container } from '@/components/ui/Container';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

interface FooterProps {
  locale: Locale;
  labels: {
    description: string;
    quickLinks: string;
    ourResidences: string;
    contactUs: string;
    privacyPolicy: string;
    rightsReserved: string;
    developerNote: string;
    ctaTitle?: string;
    ctaSubtitle?: string;
    ctaButton?: string;
    nav: {
      home: string;
      residences: string;
      about: string;
      quote: string;
      contact: string;
      language: string;
    };
    contact: {
      addressValue: string;
      phoneValue: string;
      emailValue: string;
    };
    underConstructionBadge: string;
  };
}

export function Footer({ locale, labels }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-surface-dark pb-8 text-surface">
      {/* Background Architectural Image + Dark Overlay (.elementor-264 .elementor-element-5a54819) */}
      <Image
        src="/images/hero/footer-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-surface-dark/90 via-surface-dark/85 to-surface-dark/95"
        aria-hidden="true"
      />

      {/* Spaciaz Top White Curved Arch (.elementor-element-9b61af5: border-radius: 0 0 80px 80px) */}
      <div
        className="relative z-10 h-8 w-full rounded-b-[40px] bg-surface sm:h-12 sm:rounded-b-[80px]"
        aria-hidden="true"
      />

      <Container className="relative z-10 pt-16 sm:pt-20">
        {/* Centered Top CTA + 160x160 Circular Liquid Glass Button (.elementor-element-5a95f09 & .elementor-element-a8b4b48) */}
        <div className="mx-auto flex max-w-[620px] flex-col items-center text-center">
          <h2 className="font-heading text-[38px] font-bold leading-[1.06] tracking-[-0.03em] text-surface sm:text-[56px] lg:text-[68px]">
            {labels.ctaTitle || labels.nav.quote}
          </h2>
          {labels.ctaSubtitle && (
            <p className="mt-4 max-w-[500px] text-base leading-relaxed text-surface/80 sm:text-lg">
              {labels.ctaSubtitle}
            </p>
          )}

          {/* Circular Liquid Glass Button Overlapping Giant Watermark */}
          <Link
            href="/quote"
            className="group relative z-20 mt-8 -mb-12 flex h-36 w-36 flex-col items-center justify-center rounded-full spaciaz-glass p-4 text-center font-heading text-sm font-bold leading-tight text-surface transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-brand sm:mt-10 sm:-mb-20 sm:h-40 sm:w-40 sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <ArrowUpRight className="mb-1.5 h-6 w-6 text-brand transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-surface" />
            <span>{labels.ctaButton || labels.nav.quote}</span>
          </Link>
        </div>

        {/* Giant Outlined Watermark Wordmark (.elementor-element-070acd4: "spaciaz" -> "sheriag") */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative z-0 select-none overflow-hidden text-center font-heading text-[72px] font-bold lowercase leading-[0.85] tracking-[-0.04em] spaciaz-outline-light sm:text-[135px] md:text-[175px] lg:text-[225px] -mb-6 sm:-mb-12"
        >
          sheriag
        </div>

        {/* Spaciaz Frosted Liquid Glass Footer Box (.elementor-element-c201cb5: backdrop-filter: blur(60px), border-radius: 30px) */}
        <div className="spaciaz-glass-heavy relative z-10 rounded-[30px] p-7 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
            {/* Col 1: Brand & Description */}
            <div className="lg:col-span-4">
              <Link
                href="/"
                className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-surface"
                  aria-hidden="true"
                >
                  <span className="h-3.5 w-3.5 border-2 border-surface" />
                </span>
                <span className="font-heading text-2xl font-bold lowercase tracking-[-0.04em] text-surface">
                  sheriag
                </span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-surface/75">
                {labels.description}
              </p>
              <p className="mt-3 font-heading text-xs font-semibold uppercase tracking-wider text-brand">
                {labels.developerNote}
              </p>

              {/* Social Icons */}
              <div className="mt-6 flex items-center gap-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SHERIAG on Facebook (TODO)"
                  className="spaciaz-glass inline-flex h-10 w-10 items-center justify-center rounded-full text-surface/85 transition-colors hover:border-brand hover:bg-brand hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SHERIAG on Instagram (TODO)"
                  className="spaciaz-glass inline-flex h-10 w-10 items-center justify-center rounded-full text-surface/85 transition-colors hover:border-brand hover:bg-brand hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SHERIAG on LinkedIn (TODO)"
                  className="spaciaz-glass inline-flex h-10 w-10 items-center justify-center rounded-full text-surface/85 transition-colors hover:border-brand hover:bg-brand hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-surface">
                {labels.quickLinks}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-surface/75 transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
                  >
                    {labels.nav.home}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/residences"
                    className="text-surface/75 transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
                  >
                    {labels.nav.residences}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-surface/75 transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
                  >
                    {labels.nav.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/quote"
                    className="text-surface/75 transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
                  >
                    {labels.nav.quote}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-surface/75 transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
                  >
                    {labels.nav.contact}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-surface/75 transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
                  >
                    {labels.privacyPolicy}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: List of Residences */}
            <div className="lg:col-span-3">
              <h3 className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-surface">
                {labels.ourResidences}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {residences.map((res) => (
                  <li key={res.slug} className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/residences/${res.slug}`}
                      className="text-surface/75 transition-colors hover:text-brand focus-visible:outline-none focus-visible:underline"
                    >
                      {res.name[locale]}
                    </Link>
                    {res.status === 'under-construction' && (
                      <span className="rounded-full bg-brand px-2.5 py-0.5 font-heading text-[10px] font-bold uppercase tracking-wider text-surface">
                        {labels.underConstructionBadge}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact Details */}
            <div className="lg:col-span-3">
              <h3 className="font-heading text-xs font-bold uppercase tracking-[0.12em] text-surface">
                {labels.contactUs}
              </h3>
              <ul className="mt-5 space-y-3.5 text-sm text-surface/75">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  <span>{labels.contact.addressValue}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  <a
                    href="tel:+38942000000"
                    className="spaciaz-line-link font-heading text-base font-bold text-surface hover:text-brand"
                  >
                    {labels.contact.phoneValue}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  <a
                    href="mailto:info@sheriag.mk"
                    className="spaciaz-line-link text-surface hover:text-brand"
                  >
                    {labels.contact.emailValue}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar inside Liquid Glass Footer */}
          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-surface/15 pt-7 sm:flex-row sm:items-center">
            <p className="text-xs text-surface/65">{labels.rightsReserved}</p>
            <LanguageSwitcher variant="footer" ariaLabel={labels.nav.language} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
