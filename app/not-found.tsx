import React from 'react';
import Link from 'next/link';
import { LogoIcon, LogoWordmark } from '@/components/ui/Logo';

export default function RootNotFound() {
  return (
    <html lang="sq">
      <body className="flex min-h-screen items-center justify-center bg-surface p-6 font-sans text-ink">
        <div className="max-w-md rounded-2xl border border-border bg-surface-alt p-8 text-center shadow-card">
          <div className="mb-6 flex justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-surface shadow-sm">
              <LogoIcon className="h-7 w-7 text-surface" />
            </span>
          </div>
          <div className="font-heading text-5xl font-extrabold text-brand">404</div>
          <h1 className="mt-3 font-heading text-2xl font-extrabold text-ink">
            Faqja nuk u gjet / Page Not Found
          </h1>
          <div className="mt-3 flex justify-center">
            <LogoWordmark className="h-5 w-auto text-ink/75" />
          </div>
          <Link
            href="/sq"
            className="mt-6 inline-block rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-surface hover:bg-ink transition-colors"
          >
            Kthehu në Ballinë / Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
