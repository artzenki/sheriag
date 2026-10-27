import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function LocaleNotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <Section variant="default" spacing="lg" className="pt-36">
      <Container className="text-center">
        <div className="mx-auto max-w-xl rounded-[30px] border border-border bg-surface-alt p-10 shadow-card sm:p-14">
          <span className="spaciaz-outline-dark font-heading text-8xl font-bold leading-none sm:text-9xl">
            {t('code')}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-body">
            {t('description')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/" variant="primary" size="md">
              {t('backHome')}
            </Button>
            <Button href="/residences" variant="outline" size="md" className="bg-surface">
              {t('viewResidences')}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
