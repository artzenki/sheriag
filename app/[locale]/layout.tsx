import React from 'react';
import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getOrganizationJsonLd } from '@/lib/seo';

const involveFont = localFont({
  src: [
    {
      path: '../../public/fonts/Involve-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/URWGothicL-Demi.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/URWGothicL-Demi.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-manrope',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const switzerFont = localFont({
  src: [
    {
      path: '../../public/fonts/Switzer-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Switzer-Regular.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Switzer-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Switzer-Semibold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tFooter = await getTranslations({ locale, namespace: 'footer' });
  const tContact = await getTranslations({ locale, namespace: 'contactPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tHome = await getTranslations({ locale, namespace: 'home' });

  const headerLabels = {
    home: tNav('home'),
    residences: tNav('residences'),
    about: tNav('about'),
    quote: tNav('quote'),
    contact: tNav('contact'),
    getQuoteBtn: tNav('getQuoteBtn'),
    openMenu: tNav('openMenu'),
    closeMenu: tNav('closeMenu'),
    language: tNav('language'),
    callUs: tNav('callUs'),
  };

  const footerLabels = {
    description: tFooter('description'),
    quickLinks: tFooter('quickLinks'),
    ourResidences: tFooter('ourResidences'),
    contactUs: tFooter('contactUs'),
    privacyPolicy: tFooter('privacyPolicy'),
    rightsReserved: tFooter('rightsReserved', { year: new Date().getFullYear() }),
    developerNote: tFooter('developerNote'),
    ctaTitle: tHome('ctaBand.title'),
    ctaSubtitle: tHome('ctaBand.subtitle'),
    ctaButton: tNav('getQuoteBtn'),
    nav: {
      home: tNav('home'),
      residences: tNav('residences'),
      about: tNav('about'),
      quote: tNav('quote'),
      contact: tNav('contact'),
      language: tNav('language'),
    },
    contact: {
      addressValue: tContact('addressValue'),
      phoneValue: tContact('phoneValue'),
      emailValue: tContact('emailValue'),
    },
    underConstructionBadge: tCommon('underConstruction'),
  };

  const orgJsonLd = getOrganizationJsonLd(locale as Locale);

  return (
    <html lang={locale} className={`${involveFont.variable} ${switzerFont.variable} font-sans`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-surface font-sans text-base leading-[1.65] text-ink-body antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header labels={headerLabels} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer locale={locale as Locale} labels={footerLabels} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
