'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { locales, Locale, usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  variant?: 'header-transparent' | 'header-solid' | 'footer';
  ariaLabel?: string;
}

const localeNames: Record<Locale, string> = {
  sq: 'SQ',
  mk: 'MK',
  en: 'EN',
};

const localeFullLabels: Record<Locale, string> = {
  sq: 'Shqip (SQ)',
  mk: 'Македонски (MK)',
  en: 'English (EN)',
};

export function LanguageSwitcher({
  variant = 'header-solid',
  ariaLabel = 'Select language',
}: LanguageSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const handleSelect = (nextLocale: Locale) => {
    if (nextLocale === currentLocale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center rounded-full border p-1 font-heading text-[11px] font-bold',
        variant === 'footer'
          ? 'spaciaz-glass text-surface'
          : 'border-border bg-surface-alt/80 text-ink'
      )}
    >
      {locales.map((loc) => {
        const isActive = loc === currentLocale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => handleSelect(loc)}
            aria-label={localeFullLabels[loc]}
            aria-current={isActive ? 'true' : undefined}
            className={cn(
              'rounded-full px-2.5 py-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
              isActive
                ? 'bg-brand text-surface shadow-sm'
                : variant === 'footer'
                  ? 'text-surface/75 hover:text-surface'
                  : 'text-ink-body hover:text-ink'
            )}
          >
            {localeNames[loc]}
          </button>
        );
      })}
    </div>
  );
}
