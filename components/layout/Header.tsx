'use client';

import React, { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { LogoIcon, LogoWordmark } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

interface HeaderProps {
  labels: {
    home: string;
    residences: string;
    about: string;
    quote: string;
    contact: string;
    getQuoteBtn: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    callUs: string;
  };
}

export function Header({ labels }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { href: '/', label: labels.home, exact: true },
    { href: '/residences', label: labels.residences, exact: false },
    { href: '/about', label: labels.about, exact: true },
    { href: '/quote', label: labels.quote, exact: true },
    { href: '/contact', label: labels.contact, exact: true },
  ];

  const isActiveLink = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 px-4 transition-all duration-300 sm:px-6 lg:px-10',
        isScrolled ? 'pt-3' : 'pt-4 lg:pt-6'
      )}
    >
      {/* Spaciaz Full-Rounded Floating Capsule Navbar (border-radius: 9999px) */}
      <div
        style={{ borderRadius: '9999px' }}
        className={cn(
          'mx-auto flex max-w-[1380px] items-center justify-between rounded-full pl-3 pr-2.5 py-2 transition-all duration-300 sm:pl-4 sm:pr-3 sm:py-2.5',
          isScrolled
            ? 'spaciaz-glass-light shadow-header'
            : 'bg-surface shadow-header border border-border/70'
        )}
      >
        {/* Left: Brand Wordmark + Spaciaz Vertical Divider */}
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="SHERIAG Construction"
            className="group inline-flex items-center gap-3 rounded-full border-r border-border pr-4 sm:pr-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-surface shadow-sm transition-transform duration-300 group-hover:scale-105"
              aria-hidden="true"
            >
              <LogoIcon className="h-6 w-6 text-surface" />
            </span>
            <LogoWordmark className="h-6 w-auto text-ink transition-colors group-hover:text-brand sm:h-7" />
          </Link>

          {/* Center-Left Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden pl-4 lg:flex lg:items-center lg:gap-1 xl:pl-6 xl:gap-1.5"
          >
            {navItems.map((item) => {
              const active = isActiveLink(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-[15px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                    active
                      ? 'bg-surface-alt text-ink font-bold'
                      : 'text-ink-body hover:bg-surface-alt/60 hover:text-ink'
                  )}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {active && (
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-brand"
                        aria-hidden="true"
                      />
                    )}
                    <span>{item.label}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: Call Us + Language Switcher + Spaciaz Pill CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-4 xl:gap-5">
          <div className="hidden xl:flex xl:items-center xl:gap-2 text-sm">
            <span className="text-muted">{labels.callUs}:</span>
            <a
              href="tel:+38942000000"
              className="spaciaz-line-link font-heading font-bold text-ink hover:text-brand"
            >
              +389 42 000 000
            </a>
          </div>

          <LanguageSwitcher variant="header-solid" ariaLabel={labels.language} />

          <Button href="/quote" variant="primary" size="md">
            {labels.getQuoteBtn}
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher variant="header-solid" ariaLabel={labels.language} />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? labels.closeMenu : labels.openMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-surface transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Full-Screen Spaciaz Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-x-4 top-24 bottom-4 z-50 flex flex-col justify-between overflow-y-auto rounded-[32px] border border-border bg-surface p-6 shadow-glass lg:hidden"
        >
          <nav className="flex flex-col space-y-1.5">
            {navItems.map((item) => {
              const active = isActiveLink(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-between rounded-full px-5 py-3.5 font-heading text-xl font-bold transition-colors',
                    active
                      ? 'bg-brand-tint text-brand'
                      : 'text-ink hover:bg-surface-alt'
                  )}
                >
                  <span>{item.label}</span>
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full',
                      active ? 'bg-brand' : 'bg-border'
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 space-y-3 border-t border-border pt-5">
            <Button
              href="/quote"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              {labels.getQuoteBtn}
            </Button>
            <a
              href="tel:+38942000000"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface-alt py-3 font-heading text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
              <span>{labels.callUs}: +389 42 000 000 (TODO)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
