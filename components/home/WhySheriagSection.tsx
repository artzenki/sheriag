'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Handshake, Trees, MapPin, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface WhyFeatureItem {
  id: string;
  num: string;
  iconName: 'ShieldCheck' | 'Handshake' | 'Trees' | 'MapPin';
  title: string;
  description: string;
  details: {
    lead: string;
    points: string[];
    commitment: string;
  };
}

interface WhySheriagSectionProps {
  items: WhyFeatureItem[];
  closeLabel: string;
  learnMoreLabel: string;
  contactBtnLabel: string;
}

const iconMap = {
  ShieldCheck,
  Handshake,
  Trees,
  MapPin,
};

export function WhySheriagSection({
  items,
  closeLabel,
  learnMoreLabel,
  contactBtnLabel,
}: WhySheriagSectionProps) {
  const [selectedItem, setSelectedItem] = useState<WhyFeatureItem | null>(null);

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedItem]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, idx) => {
          const Icon = iconMap[item.iconName];
          const isDarkCard = idx === 1;
          const isBrandTintCard = idx === 2;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item)}
              className={cn(
                'group relative flex min-h-[280px] sm:min-h-[300px] flex-col justify-between overflow-hidden rounded-[24px] p-6 sm:p-7 text-left shadow-card transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand hover:-translate-y-1',
                isDarkCard
                  ? 'bg-surface-dark text-surface hover:shadow-card-hover'
                  : isBrandTintCard
                    ? 'border border-brand/30 bg-brand-tint text-ink hover:shadow-card-hover'
                    : 'border border-border bg-surface-alt text-ink hover:border-brand/50 hover:shadow-card-hover'
              )}
            >
              <div className="flex w-full items-center justify-between">
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
                    isDarkCard
                      ? 'spaciaz-glass text-brand'
                      : 'bg-surface text-brand shadow-sm'
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span
                  aria-hidden="true"
                  className={cn(
                    'font-heading text-4xl sm:text-5xl font-bold',
                    isDarkCard ? 'spaciaz-outline-light' : 'spaciaz-outline-dark'
                  )}
                >
                  {item.num}
                </span>
              </div>

              <div className="mt-5 sm:mt-6">
                <h3
                  className={cn(
                    'font-heading text-xl sm:text-2xl font-bold tracking-[-0.02em]',
                    isDarkCard ? 'text-surface' : 'text-ink'
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    'mt-2.5 text-sm leading-relaxed',
                    isDarkCard ? 'text-surface/75' : 'text-ink-body'
                  )}
                >
                  {item.description}
                </p>
              </div>

              {/* Corner Circular Arrow Action */}
              <div className="mt-5 flex w-full items-center justify-between">
                <span
                  className={cn(
                    'text-xs font-semibold uppercase tracking-wider transition-colors',
                    isDarkCard
                      ? 'text-surface/60 group-hover:text-brand'
                      : 'text-muted group-hover:text-brand'
                  )}
                >
                  {learnMoreLabel}
                </span>
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand text-surface transition-transform duration-300 group-hover:rotate-45"
                  aria-hidden="true"
                >
                  <ArrowRight className="h-5 w-5 -rotate-45" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal Dialog */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="why-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-surface-dark/80 p-4 backdrop-blur-md sm:p-6"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-border bg-surface p-6 shadow-2xl transition-all sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {(() => {
                  const ModalIcon = iconMap[selectedItem.iconName];
                  return (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-tint text-brand">
                      <ModalIcon className="h-7 w-7" aria-hidden="true" />
                    </div>
                  );
                })()}
                <div>
                  <span className="font-heading text-xs font-bold uppercase tracking-wider text-brand">
                    SHERIAG • {selectedItem.num}
                  </span>
                  <h3
                    id="why-modal-title"
                    className="mt-1 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl"
                  >
                    {selectedItem.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label={closeLabel}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="mt-6 space-y-5 text-ink-body">
              <p className="text-base font-medium leading-relaxed text-ink sm:text-lg">
                {selectedItem.details.lead}
              </p>

              <div className="rounded-2xl border border-border bg-surface-alt/70 p-5 sm:p-6">
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-ink">
                  {selectedItem.title}
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {selectedItem.details.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink-body">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm leading-relaxed italic text-muted">
                {selectedItem.details.commitment}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
              <Link
                href="/about"
                onClick={() => setSelectedItem(null)}
                className="text-sm font-bold text-ink underline-offset-4 hover:text-brand hover:underline"
              >
                {learnMoreLabel} &rarr;
              </Link>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedItem(null)}
                >
                  {closeLabel}
                </Button>
                <Button
                  href="/contact"
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedItem(null)}
                >
                  {contactBtnLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
