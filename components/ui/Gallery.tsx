'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Expand } from 'lucide-react';
import type { GalleryCategory } from '@/data/residences';
import { Lightbox } from './Lightbox';
import { cn } from '@/lib/utils';

export interface GalleryPhoto {
  src: string;
  alt: string;
  category: GalleryCategory;
  residenceName?: string;
}

interface GalleryProps {
  items: GalleryPhoto[];
  showFilterTabs?: boolean;
  categoryLabels: Record<'all' | GalleryCategory, string>;
  lightboxLabels: {
    close: string;
    previous: string;
    next: string;
    imageCountTemplate: string;
  };
}

export function Gallery({
  items,
  showFilterTabs = true,
  categoryLabels,
  lightboxLabels,
}: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const availableCategories = useMemo(() => {
    const cats = new Set<GalleryCategory>();
    items.forEach((item) => cats.add(item.category));
    return ['all', ...Array.from(cats)] as Array<'all' | GalleryCategory>;
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <div>
      {showFilterTabs && availableCategories.length > 2 && (
        <div
          role="tablist"
          aria-label="Gallery categories"
          className="mb-10 flex flex-wrap gap-2.5"
        >
          {availableCategories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={cn(
                  'rounded-full border px-6 py-2.5 font-heading text-xs font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                  isSelected
                    ? 'border-brand bg-brand text-surface shadow-sm'
                    : 'border-border bg-surface text-ink hover:border-brand hover:bg-brand hover:text-surface'
                )}
              >
                {categoryLabels[cat]}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, idx) => (
          <button
            key={`${item.src}-${idx}`}
            type="button"
            onClick={() => setLightboxIndex(idx)}
            className="group relative aspect-[16/11] w-full overflow-hidden rounded-[25px] bg-surface-dark text-left shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 via-transparent to-transparent opacity-85 transition-opacity group-hover:opacity-95" />
            <div className="spaciaz-glass absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-surface transition-colors group-hover:border-brand group-hover:bg-brand">
              <Expand className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="spaciaz-glass absolute bottom-3.5 left-3.5 right-3.5 rounded-[16px] px-4 py-3">
              {item.residenceName && (
                <span className="block font-heading text-[10px] font-bold uppercase tracking-wider text-brand">
                  {item.residenceName}
                </span>
              )}
              <span className="mt-0.5 line-clamp-1 block text-xs font-semibold text-surface">
                {item.alt}
              </span>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        slides={filteredItems.map((item) => ({
          src: item.src,
          alt: item.alt,
          caption: item.residenceName ? `${item.residenceName} — ${item.alt}` : item.alt,
        }))}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
        labels={lightboxLabels}
      />
    </div>
  );
}
