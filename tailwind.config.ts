import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E46800',
          dark: '#C85A00',
          tint: '#FFF1E5',
        },
        ink: {
          DEFAULT: '#16191F',
          body: '#4B4B4B',
        },
        muted: '#8A8A8A',
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F6F3EC',
          dark: '#0F1217',
        },
        border: '#E0E0E0',
      },
      fontFamily: {
        heading: [
          '"Involve"',
          'var(--font-manrope, system-ui)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        sans: [
          '"Switzer"',
          'var(--font-inter, system-ui)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 10px 30px -5px rgba(15, 18, 23, 0.05)',
        'card-hover': '0 20px 45px -10px rgba(15, 18, 23, 0.12)',
        header: '0 12px 36px -4px rgba(15, 18, 23, 0.08)',
        glass: '0 24px 60px rgba(0, 0, 0, 0.22)',
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '8px',
        md: '16px',
        lg: '20px',
        xl: '25px',
        '2xl': '30px',
        '3xl': '50px',
        pill: '80px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 14s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
