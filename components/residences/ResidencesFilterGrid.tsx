'use client';

import React, { useState, useMemo } from 'react';
import { HardHat } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import type { Residence, ResidenceStatus } from '@/data/residences';
import { ResidenceCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ResidencesFilterGridProps {
  residences: Residence[];
  locale: Locale;
  labels: {
    filterAll: string;
    filterCompleted: string;
    filterUnderConstruction: string;
    spotlightBanner: string;
    requestQuote: string;
    cardLabels: {
      completed: string;
      underConstruction: string;
      floors: string;
      apartments: string;
      parkingSpaces: string;
      viewResidence: string;
    };
  };
}

export function ResidencesFilterGrid({
  residences,
  locale,
  labels,
}: ResidencesFilterGridProps) {
  const [filter, setFilter] = useState<'all' | ResidenceStatus>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return residences;
    return residences.filter((r) => r.status === filter);
  }, [residences, filter]);

  const tabs: Array<{ key: 'all' | ResidenceStatus; label: string }> = [
    { key: 'all', label: labels.filterAll },
    { key: 'completed', label: labels.filterCompleted },
    { key: 'under-construction', label: labels.filterUnderConstruction },
  ];

  const newRes = residences.find((r) => r.status === 'under-construction');

  return (
    <div>
      {/* Spaciaz Pill Filter Tabs (.navigation-post-filter) + Spotlight Strip */}
      <div className="mb-12 flex flex-col items-start justify-between gap-5 border-b border-border pb-8 lg:flex-row lg:items-center">
        <div
          role="tablist"
          aria-label="Filter residential areas"
          className="flex flex-wrap gap-2.5"
        >
          {tabs.map((tab) => {
            const active = filter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab.key)}
                className={cn(
                  'rounded-full border px-6 py-3 font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                  active
                    ? 'border-brand bg-brand text-surface shadow-sm'
                    : 'border-border bg-surface text-ink hover:border-brand hover:bg-brand hover:text-surface'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {newRes && (
          <div className="flex flex-wrap items-center gap-3 rounded-full border border-brand/30 bg-brand-tint py-2 pl-5 pr-2 text-xs font-semibold text-ink">
            <HardHat className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <span>{labels.spotlightBanner}</span>
            <Button
              href={`/quote?residence=${newRes.slug}`}
              variant="primary"
              size="sm"
            >
              {labels.requestQuote}
            </Button>
          </div>
        )}
      </div>

      {/* Residences Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {filtered.map((residence, idx) => (
          <ResidenceCard
            key={residence.slug}
            residence={residence}
            locale={locale}
            index={idx}
            labels={labels.cardLabels}
          />
        ))}
      </div>
    </div>
  );
}
