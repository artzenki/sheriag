import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { quoteFormSchema } from '@/lib/validations';
import { checkRateLimit, sanitizeString } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again shortly.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check: silently return 200 if spam bot filled in websiteUrl
    if (body && typeof body.websiteUrl === 'string' && body.websiteUrl.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const parsed = quoteFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Invalid quote form data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const clean = {
      fullName: sanitizeString(parsed.data.fullName),
      phone: sanitizeString(parsed.data.phone),
      email: sanitizeString(parsed.data.email),
      residence: sanitizeString(parsed.data.residence),
      apartmentType: sanitizeString(parsed.data.apartmentType),
      budgetRange: sanitizeString(parsed.data.budgetRange),
      preferredContact: sanitizeString(parsed.data.preferredContact),
      message: sanitizeString(parsed.data.message),
      locale: sanitizeString(parsed.data.locale || 'sq'),
    };

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.QUOTE_TO_EMAIL;
    const fromEmail = process.env.FROM_EMAIL || 'SHERIAG Website <onboarding@resend.dev>';

    if (!apiKey || !toEmail) {
      console.info('[SHERIAG Quote Submission — Dev Mode Fallback]', {
        submittedAt: new Date().toISOString(),
        ...clean,
      });
      return NextResponse.json({ ok: true, mode: 'logged' });
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: clean.email,
      subject: `[SHERIAG Quote Request] ${clean.fullName} — ${clean.residence}`,
      html: `
        <div style="font-family: sans-serif; color: #16191F; line-height: 1.6;">
          <h2 style="color: #E46800;">New Apartment Quote Request — SHERIAG</h2>
          <p><strong>Full Name:</strong> ${clean.fullName}</p>
          <p><strong>Phone / WhatsApp:</strong> ${clean.phone}</p>
          <p><strong>Email:</strong> ${clean.email}</p>
          <p><strong>Residence of Interest:</strong> ${clean.residence}</p>
          <p><strong>Apartment Type:</strong> ${clean.apartmentType}</p>
          <p><strong>Estimated Budget:</strong> ${clean.budgetRange}</p>
          <p><strong>Preferred Contact Method:</strong> ${clean.preferredContact}</p>
          <p><strong>Language / Locale:</strong> ${clean.locale.toUpperCase()}</p>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 16px 0;" />
          <p><strong>Message:</strong></p>
          <p>${clean.message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[SHERIAG Quote API Error]', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}
