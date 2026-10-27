import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Building2, Car, Layers, MapPin } from 'lucide-react';
import { Link, Locale } from '@/i18n/routing';
import type { Residence } from '@/data/residences';
import { Badge } from './Badge';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ hoverable = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[25px] border border-border bg-surface shadow-card transition-all duration-300',
        hoverable && 'hover:border-brand/40 hover:shadow-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface ResidenceCardProps {
  residence: Residence;
  locale: Locale;
  index?: number;
  variant?: 'light' | 'glass-dark';
  labels: {
    completed: string;
    underConstruction: string;
    floors: string;
    apartments: string;
    parkingSpaces: string;
    viewResidence: string;
  };
}

export function ResidenceCard({
  residence,
  locale,
  index,
  variant = 'light',
  labels,
}: ResidenceCardProps) {
  const isUnderConstruction = residence.status === 'under-construction';
  const formattedIndex =
    typeof index === 'number' ? String(index + 1).padStart(2, '0') : null;

  return (
    <article
      className={cn(
        'group relative flex min-h-[500px] flex-col justify-between overflow-hidden rounded-[30px] bg-surface-dark shadow-card transition-all duration-500 hover:shadow-card-hover sm:min-h-[540px]',
        isUnderConstruction && 'ring-2 ring-brand'
      )}
    >
      {/* Full-bleed Architectural Photo/Render with Spaciaz Zoom */}
      <Link
        href={`/residences/${residence.slug}`}
        aria-label={residence.name[locale]}
        className="absolute inset-0 z-0 block overflow-hidden focus-visible:outline-none"
      >
        <Image
          src={residence.heroImage}
          alt={residence.name[locale]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-surface-dark/25 to-surface-dark/45 transition-opacity duration-500 group-hover:opacity-95"
          aria-hidden="true"
        />
      </Link>

      {/* Top Row: Floating Liquid Glass Status Badges + Outlined Spaciaz Index Number (01, 02...) */}
      <div className="relative z-10 flex items-start justify-between gap-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={isUnderConstruction ? 'brand' : 'glass'}>
            <span
              className={cn(
                'h-2 w-2 rounded-full',
                isUnderConstruction ? 'bg-surface' : 'bg-brand'
              )}
              aria-hidden="true"
            />
            {isUnderConstruction ? labels.underConstruction : labels.completed}
          </Badge>
          {(residence.facts.yearCompleted || residence.facts.expectedCompletion) && (
            <Badge variant="glass">
              {residence.facts.yearCompleted || residence.facts.expectedCompletion}
            </Badge>
          )}
        </div>

        {formattedIndex && (
          <span
            aria-hidden="true"
            className="font-heading text-5xl font-bold leading-none tracking-[-0.03em] spaciaz-outline-light transition-colors duration-300 group-hover:text-brand sm:text-6xl"
          >
            {formattedIndex}
          </span>
        )}
      </div>

      {/* Bottom Floating Card (.elementer-imagebox-inner / .spaciaz-glass) */}
      <div className="relative z-10 m-2.5 sm:m-3">
        <div
          className={cn(
            'rounded-[20px] p-4 transition-all duration-300 sm:p-5',
            variant === 'glass-dark'
              ? 'spaciaz-glass text-surface'
              : 'bg-surface/95 backdrop-blur-xl text-ink shadow-card'
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div
                className={cn(
                  'flex items-center gap-1.5 text-xs font-semibold',
                  variant === 'glass-dark' ? 'text-surface/75' : 'text-muted'
                )}
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                <span>{residence.location.address[locale]}</span>
              </div>

              <h3
                className={cn(
                  'mt-2 font-heading text-2xl font-bold tracking-[-0.03em] transition-colors group-hover:text-brand sm:text-[28px] sm:leading-[1.12]',
                  variant === 'glass-dark' ? 'text-surface' : 'text-ink'
                )}
              >
                <Link
                  href={`/residences/${residence.slug}`}
                  className="focus-visible:outline-none focus-visible:underline"
                >
                  {residence.name[locale]}
                </Link>
              </h3>
            </div>

            {/* Spaciaz Circular Diagonal Arrow Button */}
            <Link
              href={`/residences/${residence.slug}`}
              aria-label={`${labels.viewResidence}: ${residence.name[locale]}`}
              className="group/arrow relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand text-surface transition-colors duration-300 hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:scale-50" />
              <ArrowUpRight className="absolute h-5 w-5 -translate-x-4 translate-y-4 scale-50 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100" />
            </Link>
          </div>

          <p
            className={cn(
              'mt-2.5 line-clamp-2 text-sm leading-relaxed',
              variant === 'glass-dark' ? 'text-surface/80' : 'text-ink-body'
            )}
          >
            {residence.tagline[locale]}
          </p>

          <dl
            className={cn(
              'mt-4 grid grid-cols-3 gap-2 border-t pt-3 text-xs',
              variant === 'glass-dark' ? 'border-surface/15' : 'border-border'
            )}
          >
            <div>
              <dt
                className={cn(
                  'flex items-center gap-1',
                  variant === 'glass-dark' ? 'text-surface/65' : 'text-muted'
                )}
              >
                <Layers className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                <span>{labels.floors}</span>
              </dt>
              <dd
                className={cn(
                  'mt-1 font-heading text-base font-bold',
                  variant === 'glass-dark' ? 'text-surface' : 'text-ink'
                )}
              >
                {residence.facts.floors}
              </dd>
            </div>

            <div
              className={cn(
                'border-x px-3',
                variant === 'glass-dark' ? 'border-surface/15' : 'border-border'
              )}
            >
              <dt
                className={cn(
                  'flex items-center gap-1',
                  variant === 'glass-dark' ? 'text-surface/65' : 'text-muted'
                )}
              >
                <Building2 className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                <span>{labels.apartments}</span>
              </dt>
              <dd
                className={cn(
                  'mt-1 font-heading text-base font-bold',
                  variant === 'glass-dark' ? 'text-surface' : 'text-ink'
                )}
              >
                {residence.facts.apartments}
              </dd>
            </div>

            <div className="pl-1">
              <dt
                className={cn(
                  'flex items-center gap-1',
                  variant === 'glass-dark' ? 'text-surface/65' : 'text-muted'
                )}
              >
                <Car className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                <span>{labels.parkingSpaces}</span>
              </dt>
              <dd
                className={cn(
                  'mt-1 font-heading text-base font-bold',
                  variant === 'glass-dark' ? 'text-surface' : 'text-ink'
                )}
              >
                {residence.facts.parkingSpaces}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}
