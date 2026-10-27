import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'alt' | 'dark' | 'tint';
  spacing?: 'sm' | 'md' | 'lg';
}

export function Section({
  variant = 'default',
  spacing = 'lg',
  className,
  children,
  ...props
}: SectionProps) {
  const variantClasses = {
    default: 'bg-surface text-ink-body',
    alt: 'bg-surface-alt text-ink-body',
    dark: 'bg-surface-dark text-surface',
    tint: 'bg-brand-tint text-ink-body',
  };

  const spacingClasses = {
    sm: 'py-14 md:py-20',
    md: 'py-20 md:py-24',
    lg: 'py-24 md:py-32',
  };

  return (
    <section
      className={cn(variantClasses[variant], spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SpaciazEyebrow({
  text,
  light = false,
  className,
}: {
  text: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-5 inline-flex items-center rounded-full border border-brand px-4 py-1.5',
        light ? 'bg-surface/5 text-surface' : 'bg-surface text-ink',
        className
      )}
    >
      <span className="inline-flex items-center font-heading text-[12px] font-semibold uppercase leading-[1.167] tracking-[0.06em]">
        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
        <span>{text}</span>
      </span>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
        className
      )}
    >
      {eyebrow && (
        <div className={cn(align === 'center' && 'flex justify-center')}>
          <SpaciazEyebrow text={eyebrow} light={light} />
        </div>
      )}
      <h2
        className={cn(
          'font-heading text-[38px] font-bold leading-[1.06] tracking-[-0.03em] sm:text-[52px] lg:text-[62px]',
          light ? 'text-surface' : 'text-ink'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed sm:text-lg',
            light ? 'text-surface/75' : 'text-ink-body'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
