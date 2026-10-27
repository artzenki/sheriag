import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'brand' | 'tint' | 'neutral' | 'dark' | 'glass';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = 'tint', className, children, ...props }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    brand: 'bg-brand text-surface font-bold',
    tint: 'bg-brand-tint text-ink border border-brand/35 font-semibold',
    neutral: 'bg-surface text-ink border border-border font-semibold',
    dark: 'bg-surface-dark/85 text-surface backdrop-blur-md border border-surface/15 font-semibold',
    glass: 'spaciaz-glass text-surface font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-heading text-[11px] uppercase tracking-[0.08em]',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
