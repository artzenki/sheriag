import React from 'react';
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="sq">
      <body className="flex min-h-screen items-center justify-center bg-surface p-6 font-sans text-ink">
        <div className="max-w-md rounded-lg border border-border bg-surface-alt p-8 text-center shadow-card">
          <div className="font-heading text-5xl font-extrabold text-brand">404</div>
          <h1 className="mt-3 font-heading text-2xl font-extrabold text-ink">
            Faqja nuk u gjet / Page Not Found
          </h1>
          <p className="mt-2 text-sm text-ink-body">
            SHERIAG — Gostivar, North Macedonia
          </p>
          <Link
            href="/sq"
            className="mt-6 inline-block rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-surface hover:bg-brand-dark"
          >
            Kthehu në Ballinë / Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
