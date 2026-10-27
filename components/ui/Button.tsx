import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'outline-white' | 'ghost' | 'white';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  'aria-label'?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-surface hover:bg-ink hover:text-surface border border-transparent',
  secondary:
    'bg-ink text-surface hover:bg-brand hover:text-surface border border-transparent',
  white:
    'bg-surface text-ink hover:bg-brand hover:text-surface border border-transparent shadow-sm',
  outline:
    'bg-surface text-ink border border-border hover:border-brand hover:bg-brand hover:text-surface',
  'outline-white':
    'spaciaz-glass text-surface hover:bg-surface hover:text-ink',
  ghost:
    'bg-transparent text-ink hover:bg-surface-alt hover:text-brand',
};

const iconBadgeStyles: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-surface group-hover/btn:bg-brand group-hover/btn:text-surface',
  secondary: 'bg-brand text-surface group-hover/btn:bg-surface group-hover/btn:text-ink',
  white: 'bg-brand text-surface group-hover/btn:bg-ink group-hover/btn:text-surface',
  outline: 'bg-brand text-surface group-hover/btn:bg-ink group-hover/btn:text-surface',
  'outline-white': 'bg-brand text-surface group-hover/btn:bg-ink group-hover/btn:text-surface',
  ghost: 'bg-brand/15 text-brand group-hover/btn:bg-brand group-hover/btn:text-surface',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'pl-5 pr-1.5 py-1.5 text-xs',
  md: 'pl-6 pr-1.5 py-1.5 text-sm',
  lg: 'pl-7 pr-2 py-2 text-sm sm:text-base',
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'h-7 w-7',
  md: 'h-9 w-9',
  lg: 'h-10 w-10',
};

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    showArrow = true,
    className,
    children,
  } = props;

  const classes = cn(
    'group/btn inline-flex items-center justify-between gap-3.5 rounded-full font-heading font-bold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
    variantStyles[variant],
    showArrow ? sizeStyles[size] : 'px-6 py-3 text-sm',
    className
  );

  const innerContent = (
    <>
      <span className="inline-flex items-center gap-2">{children}</span>
      {showArrow && (
        <span
          className={cn(
            'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors duration-300',
            iconBadgeStyles[variant],
            iconSizeStyles[size]
          )}
          aria-hidden="true"
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4 group-hover/btn:scale-50" />
          <ArrowUpRight className="absolute h-4 w-4 -translate-x-4 translate-y-4 scale-50 transition-transform duration-300 ease-out group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 group-hover/btn:scale-100" />
        </span>
      )}
    </>
  );

  if (typeof props.href === 'string') {
    const { href, target, rel, onClick, 'aria-label': ariaLabel } = props;
    if (
      href.startsWith('#') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('http')
    ) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          aria-label={ariaLabel}
          className={classes}
        >
          {innerContent}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} aria-label={ariaLabel} className={classes}>
        {innerContent}
      </Link>
    );
  }

  const buttonProps = { ...props };
  delete buttonProps.variant;
  delete buttonProps.size;
  delete buttonProps.showArrow;
  delete buttonProps.className;

  return (
    <button type={props.type || 'button'} className={classes} {...buttonProps}>
      {innerContent}
    </button>
  );
}
