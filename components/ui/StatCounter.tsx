'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  note?: string;
}

export function StatCounter({ value, suffix = '', label, note }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 1100;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, value, prefersReducedMotion]);

  // Exact Spaciaz Stat Card (.elementor-element-e9f7002: min-height: 310px, border-radius: 25px, background: #F6F3EC, top label with bottom border, bottom 70px counter)
  return (
    <div
      ref={ref}
      className="group flex min-h-[200px] flex-col justify-between rounded-[22px] border border-border/70 bg-surface-alt p-5 transition-all duration-300 hover:border-brand/50 hover:shadow-card sm:min-h-[230px] sm:p-6"
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="font-heading text-xs font-semibold uppercase leading-[1.167] tracking-[0.06em] text-ink">
          {label}
        </span>
        <span
          className="h-2 w-2 rounded-full bg-brand transition-transform duration-300 group-hover:scale-125"
          aria-hidden="true"
        />
      </div>

      <div className="pt-5">
        <div className="font-heading text-[44px] font-bold leading-none tracking-[-0.03em] text-ink sm:text-[52px] lg:text-[58px]">
          <span>{displayValue}</span>
          {suffix && <span className="text-brand">{suffix}</span>}
        </div>
        {note && (
          <p className="mt-2 text-sm font-medium text-ink-body">{note}</p>
        )}
      </div>
    </div>
  );
}
