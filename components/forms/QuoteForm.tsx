'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { Link, type Locale } from '@/i18n/routing';
import { residences } from '@/data/residences';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function QuoteForm() {
  const t = useTranslations('forms');
  const tCommon = useTranslations('common');
  const tFooter = useTranslations('footer');
  const locale = useLocale() as Locale;
  const searchParams = useSearchParams();

  const prefilledResidence = searchParams.get('residence') || '';
  const prefilledType = searchParams.get('type') || '';

  const [submitState, setSubmitState] = useState<
    'idle' | 'success' | 'error' | 'rate-limit'
  >('idle');

  const schema = z.object({
    fullName: z.string().trim().min(2, { message: t('validation.nameMin') }),
    phone: z.string().trim().min(6, { message: t('validation.phoneMin') }),
    email: z.string().trim().email({ message: t('validation.emailInvalid') }),
    residence: z.string().trim().min(1, { message: t('validation.residenceRequired') }),
    apartmentType: z
      .string()
      .trim()
      .min(1, { message: t('validation.apartmentTypeRequired') }),
    budgetRange: z.string().trim().min(1, { message: t('validation.budgetRequired') }),
    preferredContact: z.enum(['phone', 'email', 'whatsapp'], {
      errorMap: () => ({ message: t('validation.contactMethodRequired') }),
    }),
    message: z.string().trim().min(10, { message: t('validation.messageMin') }),
    privacyConsent: z.boolean().refine((val) => val === true, {
      message: t('validation.privacyRequired'),
    }),
    websiteUrl: z.string().optional(),
  });

  type QuoteInputs = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      residence: prefilledResidence || 'sheriag-new-residence',
      apartmentType: prefilledType || '2br',
      budgetRange: 'flexible',
      preferredContact: 'phone',
      message: '',
      privacyConsent: false,
      websiteUrl: '',
    },
  });

  const selectedContact = watch('preferredContact');

  useEffect(() => {
    if (prefilledResidence) {
      const exists = residences.some((r) => r.slug === prefilledResidence);
      if (exists) {
        setValue('residence', prefilledResidence);
      }
    }
    if (prefilledType && ['1br', '2br', '3br', 'penthouse', 'any'].includes(prefilledType)) {
      setValue('apartmentType', prefilledType);
    }
  }, [prefilledResidence, prefilledType, setValue]);

  const onSubmit = async (data: QuoteInputs) => {
    setSubmitState('idle');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
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
        className="rounded-[25px] border border-brand/40 bg-brand-tint/60 p-8 text-center sm:p-12"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-surface">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2 className="mt-5 font-heading text-2xl font-bold text-ink sm:text-3xl">
          {t('successQuoteTitle')}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-ink-body">
          {t('successQuoteText')}
        </p>
        <div className="mt-8">
          <Button
            type="button"
            variant="outline"
            size="md"
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="quote-website-url">Website</label>
        <input
          id="quote-website-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('websiteUrl')}
        />
      </div>

      {/* Row 1: Full Name + Phone */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-fullName" className="mb-2 block text-sm font-semibold text-ink">
            {t('fullName')} <span className="text-brand">*</span>
          </label>
          <input
            id="quote-fullName"
            type="text"
            autoComplete="name"
            placeholder={t('fullNamePlaceholder')}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'quote-fullName-error' : undefined}
            className={cn(inputBaseClass, errors.fullName ? 'border-brand' : 'border-border')}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p
              id="quote-fullName-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-brand-dark"
            >
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-phone" className="mb-2 block text-sm font-semibold text-ink">
            {t('phone')} <span className="text-brand">*</span>
          </label>
          <input
            id="quote-phone"
            type="tel"
            autoComplete="tel"
            placeholder={t('phonePlaceholder')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'quote-phone-error' : undefined}
            className={cn(inputBaseClass, errors.phone ? 'border-brand' : 'border-border')}
            {...register('phone')}
          />
          {errors.phone && (
            <p
              id="quote-phone-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-brand-dark"
            >
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Email + Residence Select */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-email" className="mb-2 block text-sm font-semibold text-ink">
            {t('email')} <span className="text-brand">*</span>
          </label>
          <input
            id="quote-email"
            type="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'quote-email-error' : undefined}
            className={cn(inputBaseClass, errors.email ? 'border-brand' : 'border-border')}
            {...register('email')}
          />
          {errors.email && (
            <p
              id="quote-email-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-brand-dark"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-residence" className="mb-2 block text-sm font-semibold text-ink">
            {t('residence')} <span className="text-brand">*</span>
          </label>
          <select
            id="quote-residence"
            aria-invalid={Boolean(errors.residence)}
            aria-describedby={errors.residence ? 'quote-residence-error' : undefined}
            className={cn(inputBaseClass, errors.residence ? 'border-brand' : 'border-border')}
            {...register('residence')}
          >
            {residences.map((res) => (
              <option key={res.slug} value={res.slug}>
                {res.name[locale]} —{' '}
                {res.status === 'under-construction'
                  ? tCommon('underConstruction')
                  : tCommon('completed')}
              </option>
            ))}
            <option value="any">{t('residenceAny')}</option>
          </select>
          {errors.residence && (
            <p
              id="quote-residence-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-brand-dark"
            >
              {errors.residence.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Apartment Type + Budget Range */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="quote-apartmentType"
            className="mb-2 block text-sm font-semibold text-ink"
          >
            {t('apartmentType')} <span className="text-brand">*</span>
          </label>
          <select
            id="quote-apartmentType"
            aria-invalid={Boolean(errors.apartmentType)}
            aria-describedby={
              errors.apartmentType ? 'quote-apartmentType-error' : undefined
            }
            className={cn(
              inputBaseClass,
              errors.apartmentType ? 'border-brand' : 'border-border'
            )}
            {...register('apartmentType')}
          >
            <option value="1br">{t('apartmentTypes.1br')}</option>
            <option value="2br">{t('apartmentTypes.2br')}</option>
            <option value="3br">{t('apartmentTypes.3br')}</option>
            <option value="penthouse">{t('apartmentTypes.penthouse')}</option>
            <option value="any">{t('apartmentTypeAny')}</option>
          </select>
          {errors.apartmentType && (
            <p
              id="quote-apartmentType-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-brand-dark"
            >
              {errors.apartmentType.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="quote-budgetRange"
            className="mb-2 block text-sm font-semibold text-ink"
          >
            {t('budgetRange')} <span className="text-brand">*</span>
          </label>
          <select
            id="quote-budgetRange"
            aria-invalid={Boolean(errors.budgetRange)}
            aria-describedby={errors.budgetRange ? 'quote-budgetRange-error' : undefined}
            className={cn(inputBaseClass, errors.budgetRange ? 'border-brand' : 'border-border')}
            {...register('budgetRange')}
          >
            <option value="under60k">{t('budgetRanges.under60k')}</option>
            <option value="60kTo90k">{t('budgetRanges.60kTo90k')}</option>
            <option value="90kTo120k">{t('budgetRanges.90kTo120k')}</option>
            <option value="above120k">{t('budgetRanges.above120k')}</option>
            <option value="flexible">{t('budgetRanges.flexible')}</option>
          </select>
          {errors.budgetRange && (
            <p
              id="quote-budgetRange-error"
              role="alert"
              className="mt-1.5 text-xs font-semibold text-brand-dark"
            >
              {errors.budgetRange.message}
            </p>
          )}
        </div>
      </div>

      {/* Preferred Contact Method (Phone / Email / WhatsApp) */}
      <fieldset>
        <legend className="mb-2.5 block text-sm font-semibold text-ink">
          {t('preferredContact')} <span className="text-brand">*</span>
        </legend>
        <div className="grid grid-cols-3 gap-3">
          {(['phone', 'whatsapp', 'email'] as const).map((method) => {
            const isChecked = selectedContact === method;
            return (
              <label
                key={method}
                className={cn(
                  'flex cursor-pointer items-center justify-center rounded-full border px-4 py-3 text-center text-xs font-semibold transition-all sm:text-sm',
                  isChecked
                    ? 'border-ink bg-ink text-surface shadow-sm'
                    : 'border-border bg-surface text-ink-body hover:border-brand'
                )}
              >
                <input
                  type="radio"
                  value={method}
                  className="sr-only"
                  {...register('preferredContact')}
                />
                <span>{t(`contactMethods.${method}`)}</span>
              </label>
            );
          })}
        </div>
        {errors.preferredContact && (
          <p role="alert" className="mt-1.5 text-xs font-semibold text-brand-dark">
            {errors.preferredContact.message}
          </p>
        )}
      </fieldset>

      {/* Message */}
      <div>
        <label htmlFor="quote-message" className="mb-2 block text-sm font-semibold text-ink">
          {t('message')} <span className="text-brand">*</span>
        </label>
        <textarea
          id="quote-message"
          rows={4}
          placeholder={t('messagePlaceholder')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'quote-message-error' : undefined}
          className={cn(inputBaseClass, errors.message ? 'border-brand' : 'border-border')}
          {...register('message')}
        />
        {errors.message && (
          <p
            id="quote-message-error"
            role="alert"
            className="mt-1.5 text-xs font-semibold text-brand-dark"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Privacy Consent */}
      <div>
        <div className="flex items-start gap-2.5">
          <input
            id="quote-privacyConsent"
            type="checkbox"
            aria-invalid={Boolean(errors.privacyConsent)}
            aria-describedby={
              errors.privacyConsent ? 'quote-privacyConsent-error' : undefined
            }
            className="mt-1 h-4 w-4 rounded border-border text-brand focus:ring-brand"
            {...register('privacyConsent')}
          />
          <label
            htmlFor="quote-privacyConsent"
            className="text-xs leading-relaxed text-ink-body"
          >
            {t('privacyConsent')}{' '}
            <Link href="/privacy" className="font-semibold text-brand underline">
              ({tFooter('privacyPolicy')})
            </Link>
          </label>
        </div>
        {errors.privacyConsent && (
          <p
            id="quote-privacyConsent-error"
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
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            <span>{t('submitting')}</span>
          </>
        ) : (
          <span>{t('submitQuote')}</span>
        )}
      </Button>
    </form>
  );
}
