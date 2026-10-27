import { z } from 'zod';

export const quoteFormSchema = z.object({
  fullName: z.string().trim().min(2),
  phone: z.string().trim().min(6),
  email: z.string().trim().email(),
  residence: z.string().trim().min(1),
  apartmentType: z.string().trim().min(1),
  budgetRange: z.string().trim().min(1),
  preferredContact: z.enum(['phone', 'email', 'whatsapp']),
  message: z.string().trim().min(10),
  privacyConsent: z.boolean().refine((val) => val === true),
  // Honeypot anti-spam field (must remain empty)
  websiteUrl: z.string().max(0).optional(),
  locale: z.string().optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2),
  phone: z.string().trim().min(6),
  email: z.string().trim().email(),
  message: z.string().trim().min(10),
  residenceSlug: z.string().optional(),
  privacyConsent: z.boolean().refine((val) => val === true),
  // Honeypot anti-spam field (must remain empty)
  websiteUrl: z.string().max(0).optional(),
  locale: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
