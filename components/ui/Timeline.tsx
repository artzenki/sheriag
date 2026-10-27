import React from 'react';
import { Check, Clock, Hammer } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StageStatus } from '@/data/residences';

export interface StageStep {
  key: string;
  label: string;
  status: StageStatus;
  statusLabel: string;
}

interface ConstructionTimelineProps {
  steps: StageStep[];
}

export function ConstructionTimeline({ steps }: ConstructionTimelineProps) {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, index) => {
        const isCompleted = step.status === 'completed';
        const isCurrent = step.status === 'current';

        return (
          <li
            key={step.key}
            className={cn(
              'relative flex flex-col justify-between rounded-[20px] p-5 transition-all',
              isCurrent
                ? 'border-2 border-brand bg-brand/15 shadow-lg backdrop-blur-md'
                : isCompleted
                  ? 'spaciaz-glass border-surface/25 bg-surface/10'
                  : 'spaciaz-glass opacity-65'
            )}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full font-heading text-xs font-bold',
                    isCurrent
                      ? 'bg-brand text-surface shadow-sm'
                      : isCompleted
                        ? 'bg-surface text-ink'
                        : 'border border-surface/20 bg-surface/10 text-surface/70'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : isCurrent ? (
                    <Hammer className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <span>0{index + 1}</span>
                  )}
                </span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider',
                    isCurrent
                      ? 'bg-brand text-surface'
                      : isCompleted
                        ? 'bg-surface/15 text-surface'
                        : 'text-surface/60'
                  )}
                >
                  {!isCompleted && !isCurrent && (
                    <Clock className="h-3 w-3" aria-hidden="true" />
                  )}
                  {step.statusLabel}
                </span>
              </div>
              <h4 className="mt-5 font-heading text-base font-bold text-surface">{step.label}</h4>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
