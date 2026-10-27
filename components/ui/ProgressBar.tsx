import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  percent: number;
  label: string;
  currentStageText?: string;
  className?: string;
}

export function ProgressBar({
  percent,
  label,
  currentStageText,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-ink">{label}</span>
        <span className="font-heading text-xl font-extrabold text-brand">{clamped}%</span>
      </div>
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-surface-alt border border-border"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-brand transition-all duration-700 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {currentStageText && (
        <p className="mt-2 text-xs font-medium text-ink-body">{currentStageText}</p>
      )}
    </div>
  );
}
