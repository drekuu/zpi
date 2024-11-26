import type { Metadata } from 'next';
import React from 'react';
import { Inter, DM_Sans, Rammetto_One, Afacad } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Header from '@/components/Header/Header';
import Providers from './providers';
import clsx from 'clsx';
import { TunnelExit, TunnelProvider } from '@mittwald/react-tunnel';
import './globals.css';

// Fonts
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});
const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-dm-sans',
});
const rammettoOne = Rammetto_One({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-rammetto-one',
});
const afacad = Afacad({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-afacad',
});

export const metadata: Metadata = {
  title: 'PhotoVault',
  description:
    'Responsywna aplikacja webowa do prezentowania i sprzedawania fotografii',
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={clsx(
          inter.variable,
          dmSans.variable,
          rammettoOne.variable,
          afacad.variable,
          'antialiased mx-auto w-content',
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            <main className='max-w-[var(--page-max-width)] mx-auto'>
              {/* @see https://github.com/vercel/next.js/discussions/49749 */}
              <TunnelProvider>
                {modal}
                {children}
                <TunnelExit />
              </TunnelProvider>
            </main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
