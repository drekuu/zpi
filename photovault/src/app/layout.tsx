import type { Metadata } from 'next';
import React from 'react';
import { Inter, DM_Sans, Rammetto_One, Afacad } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Header from '@/components/Header/Header';
import clsx from 'clsx';
import './globals.css';

// Fonts
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
});
const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-dm-sans',
});
const rammettoOne = Rammetto_One({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-rammetto-one',
});
const afacad = Afacad({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-afacad',
});

export const metadata: Metadata = {
  title: 'PhotoVault',
  description:
    'Responsywna aplikacja webowa do prezentowania i sprzedawania fotografii',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
          'antialiased',
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
