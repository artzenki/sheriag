import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';
import { residences } from '@/data/residences';
import { SITE_URL } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/residences', '/about', '/quote', '/contact', '/privacy'];
  const residencePaths = residences.map((r) => `/residences/${r.slug}`);
  const allPaths = [...staticPaths, ...residencePaths];

  const entries: MetadataRoute.Sitemap = [];

  for (const path of allPaths) {
    const languages: Record<string, string> = {};
    for (const loc of locales) {
      languages[loc] = `${SITE_URL}/${loc}${path}`;
    }

    for (const loc of locales) {
      entries.push({
        url: `${SITE_URL}/${loc}${path}`,
        lastModified: new Date(),
        changeFrequency: path.includes('/residences/') ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : path.startsWith('/residences') ? 0.9 : 0.7,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
