'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface LightboxSlide {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxProps {
  slides: LightboxSlide[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (newIndex: number) => void;
  labels: {
    close: string;
    previous: string;
    next: string;
    imageCountTemplate: string;
  };
}

export function Lightbox({
  slides,
  activeIndex,
  onClose,
  onChangeIndex,
  labels,
}: LightboxProps) {
  const isOpen = activeIndex !== null && slides[activeIndex] !== undefined;

  const handlePrev = useCallback(() => {
    if (activeIndex === null) return;
    onChangeIndex((activeIndex - 1 + slides.length) % slides.length);
  }, [activeIndex, slides.length, onChangeIndex]);

  const handleNext = useCallback(() => {
    if (activeIndex === null) return;
    onChangeIndex((activeIndex + 1) % slides.length);
  }, [activeIndex, slides.length, onChangeIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || activeIndex === null) return null;

  const slide = slides[activeIndex];
  const counterText = labels.imageCountTemplate
    .replace('{current}', String(activeIndex + 1))
    .replace('{total}', String(slides.length));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={slide.alt}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface-dark/95 p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="mb-4 flex w-full max-w-5xl items-center justify-between text-surface">
        <span className="text-xs font-semibold uppercase tracking-widest text-surface/80">
          {counterText}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="inline-flex items-center justify-center rounded-md border border-surface/20 bg-surface/10 p-2 text-surface transition-colors hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative flex w-full max-w-5xl items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {slides.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label={labels.previous}
            className="absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink shadow-md transition-colors hover:bg-brand hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:-left-5"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-surface/15 bg-surface">
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="90vw"
            className="object-contain"
          />
        </div>

        {slides.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label={labels.next}
            className="absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink shadow-md transition-colors hover:bg-brand hover:text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:-right-5"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      <p className="mt-4 max-w-3xl text-center text-sm font-medium text-surface/90">
        {slide.caption || slide.alt}
      </p>
    </div>
  );
}
