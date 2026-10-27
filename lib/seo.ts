import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/routing';
import { SITE_URL } from './utils';
import type { Residence } from '@/data/residences';

interface PageMetadataOptions {
  locale: Locale;
  path: string; // e.g. '', '/residences', '/about'
  title: string;
  description: string;
  image?: string;
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  image = '/images/hero/gostivar-hero.jpg',
}: PageMetadataOptions): Metadata {
  const cleanPath = path === '/' ? '' : path;
  const canonicalUrl = `${SITE_URL}/${locale}${cleanPath}`;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${SITE_URL}/${loc}${cleanPath}`;
  }
  languages['x-default'] = `${SITE_URL}/sq${cleanPath}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'SHERIAG',
      locale,
      type: 'website',
      images: [
        {
          url: image,
          width: 1600,
          height: 1000,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function getOrganizationJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'SHERIAG',
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/images/hero/gostivar-hero.jpg`,
    description:
      'SHERIAG is a residential construction and real-estate development company in Gostivar, North Macedonia.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Blvd. Braќa Gjinoski (Placeholder TODO)',
      addressLocality: 'Gostivar',
      postalCode: '1230',
      addressCountry: 'MK',
    },
    areaServed: {
      '@type': 'City',
      name: 'Gostivar',
    },
    telephone: '+389-42-000-000',
    email: 'info@sheriag.mk',
  };
}

export function getResidenceJsonLd(residence: Residence, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: residence.name[locale],
    description: residence.tagline[locale],
    url: `${SITE_URL}/${locale}/residences/${residence.slug}`,
    image: `${SITE_URL}${residence.heroImage}`,
    numberOfAccommodationUnits: residence.facts.apartments,
    address: {
      '@type': 'PostalAddress',
      streetAddress: residence.location.address[locale],
      addressLocality: 'Gostivar',
      postalCode: '1230',
      addressCountry: 'MK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: residence.location.lat,
      longitude: residence.location.lng,
    },
    amenityFeature: residence.amenities.map((am) => ({
      '@type': 'LocationFeatureSpecification',
      name: am,
      value: true,
    })),
  };
}
