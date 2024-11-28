import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

export async function renderWithNextIntl(component: ReactNode) {
  const messages = (await import(`../messages/en.json`)).default;

  return render(
    <NextIntlClientProvider messages={messages} locale='en'>
      {component}
    </NextIntlClientProvider>,
  );
}
