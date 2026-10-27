'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  residenceSlug?: string;
  residenceName?: string;
}

export function ContactForm({ residenceSlug, residenceName }: ContactFormProps) {
  const t = useTranslations('forms');
  const tFooter = useTranslations('footer');
  const locale = useLocale();

  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error' | 'rate-limit'>(
    'idle'
  );

  const schema = z.object({
    fullName: z.string().trim().min(2, { message: t('validation.nameMin') }),
    phone: z.string().trim().min(6, { message: t('validation.phoneMin') }),
    email: z.string().trim().email({ message: t('validation.emailInvalid') }),
    message: z.string().trim().min(10, { message: t('validation.messageMin') }),
    privacyConsent: z.boolean().refine((val) => val === true, {
      message: t('validation.privacyRequired'),
    }),
    websiteUrl: z.string().optional(),
  });

  type FormInputs = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      message: residenceName ? `${residenceName} — ` : '',
      privacyConsent: false,
      websiteUrl: '',
    },
  });

  const onSubmit = async (data: FormInputs) => {
    setSubmitState('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          residenceSlug,
          locale,
        }),
      });

      if (res.status === 429) {
        setSubmitState('rate-limit');
        return;
      }

      if (!res.ok) {
        setSubmitState('error');
        return;
      }

      setSubmitState('success');
      reset();
    } catch {
      setSubmitState('error');
    }
  };

  if (submitState === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[25px] border border-brand/40 bg-brand-tint/60 p-8 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-surface">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-heading text-2xl font-bold text-ink">
          {t('successContactTitle')}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-body">
          {t('successContactText')}
        </p>
        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setSubmitState('idle')}
            className="bg-surface"
          >
            {t('sendAnother')}
          </Button>
        </div>
      </div>
    );
  }

  const inputBaseClass =
    'w-full rounded-[16px] border bg-surface px-4 py-3.5 text-sm text-ink placeholder:text-muted transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot field (hidden from assistive tech and visual users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website-url">Website</label>
        <input
          id="contact-website-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('websiteUrl')}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-fullName"
            className="mb-2 block text-sm font-semibold text-ink"
          >
            {t('fullName')} <span className="text-brand">*</span>
          </label>
          <input
            id="contact-fullName"
            type="text"
            autoComplete="name"
            placeholder={t('fullNamePlaceholder')}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'contact-fullName-error' : undefined}
            className={cn(inputBaseClass, errors.fullName ? 'border-brand' : 'border-border')}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p
              id="contact-fullName-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-brand-dark"
            >
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-2 block text-sm font-semibold text-ink">
            {t('phone')} <span className="text-brand">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder={t('phonePlaceholder')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            className={cn(inputBaseClass, errors.phone ? 'border-brand' : 'border-border')}
            {...register('phone')}
          />
          {errors.phone && (
            <p
              id="contact-phone-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-brand-dark"
            >
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-ink">
          {t('email')} <span className="text-brand">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder={t('emailPlaceholder')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={cn(inputBaseClass, errors.email ? 'border-brand' : 'border-border')}
          {...register('email')}
        />
        {errors.email && (
          <p
            id="contact-email-error"
            role="alert"
            className="mt-1.5 text-xs font-semibold text-brand-dark"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-ink">
          {t('message')} <span className="text-brand">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder={t('messagePlaceholder')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={cn(inputBaseClass, errors.message ? 'border-brand' : 'border-border')}
          {...register('message')}
        />
        {errors.message && (
          <p
            id="contact-message-error"
            role="alert"
            className="mt-1.5 text-xs font-semibold text-brand-dark"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-start gap-2.5">
          <input
            id="contact-privacyConsent"
            type="checkbox"
            aria-invalid={Boolean(errors.privacyConsent)}
            aria-describedby={
              errors.privacyConsent ? 'contact-privacyConsent-error' : undefined
            }
            className="mt-1 h-4 w-4 rounded border-border text-brand focus:ring-brand"
            {...register('privacyConsent')}
          />
          <label htmlFor="contact-privacyConsent" className="text-xs leading-relaxed text-ink-body">
            {t('privacyConsent')}{' '}
            <Link href="/privacy" className="font-semibold text-brand underline">
              ({tFooter('privacyPolicy')})
            </Link>
          </label>
        </div>
        {errors.privacyConsent && (
          <p
            id="contact-privacyConsent-error"
            role="alert"
            className="mt-1.5 text-xs font-semibold text-brand-dark"
          >
            {errors.privacyConsent.message}
          </p>
        )}
      </div>

      {(submitState === 'error' || submitState === 'rate-limit') && (
        <div
          role="alert"
          className="flex items-center gap-2.5 rounded-[16px] border border-brand bg-brand-tint p-4 text-xs font-semibold text-ink"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <span>
            {submitState === 'rate-limit' ? t('errorRateLimit') : t('errorGeneric')}
          </span>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        showArrow={!isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>{t('submitting')}</span>
          </>
        ) : (
          <span>{t('submitContact')}</span>
        )}
      </Button>
    </form>
  );
}
