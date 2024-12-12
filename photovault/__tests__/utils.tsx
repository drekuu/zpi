import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

export async function withMockNextIntl(component: ReactNode) {
  const messages = (await import(`../messages/en.json`)).default;

  return (
    <NextIntlClientProvider messages={messages} locale='en'>
      {component}
    </NextIntlClientProvider>
  );
}
