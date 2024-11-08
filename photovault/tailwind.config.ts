import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /**
       * Inversed default Tailwind screen breakpoints.
       */
      screens: {
        '-2xl': { max: '1535px' },
        // => @media (max-width: 1535px) { ... }

        '-xl': { max: '1279px' },
        // => @media (max-width: 1279px) { ... }

        '-lg': { max: '1023px' },
        // => @media (max-width: 1023px) { ... }

        '-md': { max: '767px' },
        // => @media (max-width: 767px) { ... }

        '-sm': { max: '639px' },
        // => @media (max-width: 639px) { ... }
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        'dm-sans': ['var(--font-dm-sans)'],
        'rammetto-one': ['var(--font-rammetto-one)'],
        afacad: ['var(--font-afacad)'],
      },
      fontSize: {},
      colors: {
        gray: '#f0f0f0',
        'dark-grey': '#909090',
        slate: '#334155',
        'slate-light': '#f1f5f9',
      },
      width: {
        content: 'var(--page-content-width)',
      },
      borderRadius: {
        '2xxl': '1.25rem',
        '4xl': '3.875rem',
      },
      boxShadow: {
        light: '0px 4px 6px 0px rgba(0, 0, 0, 0.09)',
      },
    },
  },
  plugins: [require('tailwind-gradient-mask-image')],
};

export default config;
