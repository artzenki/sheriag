import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SpaciazEyebrow } from '@/components/ui/Section';

interface CtaBandProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryBtnText: string;
  primaryHref?: string;
  secondaryBtnText?: string;
  secondaryHref?: string;
}

export function CtaBand({
  eyebrow,
  title,
  subtitle,
  primaryBtnText,
  primaryHref = '/quote',
  secondaryBtnText,
  secondaryHref = '/contact',
}: CtaBandProps) {
  return (
    <section className="px-3 py-8 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-[1680px] overflow-hidden rounded-[30px] bg-surface-dark py-16 text-surface sm:py-24">
        <Image
          src="/images/hero/gostivar-hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-surface-dark/95 via-surface-dark/80 to-surface-dark/50"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SpaciazEyebrow text={eyebrow} light />
              <h2 className="font-heading text-[36px] font-bold leading-[1.06] tracking-[-0.03em] text-surface sm:text-[50px] lg:text-[60px]">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-surface/75 sm:text-lg">
                {subtitle}
              </p>
            </div>

            {/* Spaciaz Liquid Glass CTA Card (.elementor-element-08d9ade) */}
            <div className="lg:col-span-5">
              <div className="spaciaz-glass rounded-[24px] p-7 sm:p-9">
                <p className="font-heading text-lg font-bold text-surface sm:text-xl">
                  SHERIAG — Gostivar
                </p>
                <p className="mt-2 text-sm leading-relaxed text-surface/75">
                  {subtitle}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3.5">
                  <Button href={primaryHref} variant="primary" size="lg">
                    {primaryBtnText}
                  </Button>
                  {secondaryBtnText && (
                    <Button href={secondaryHref} variant="outline-white" size="lg">
                      {secondaryBtnText}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
