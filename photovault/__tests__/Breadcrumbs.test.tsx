import { describe, expect, test } from 'vitest';
import mockRouter from 'next-router-mock';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { renderWithNextIntl } from './utils';

describe('Breadcrumbs', () => {
  test('renders only the first crumb if additionalNames is not provided', async () => {
    await mockRouter.push('/new/nature/5/10');
    const component = await renderWithNextIntl(<Breadcrumbs />);

    const links = await component.findAllByRole('link');
    const linksData = links.map((link) => ({
      href: link.getAttribute('href'),
      text: link.firstChild?.textContent,
    }));

    expect(linksData).toStrictEqual([
      {
        href: '/home',
        text: 'Home',
      },
      {
        href: '/new',
        text: 'New',
      },
    ]);
  });

  test('renders additionalNames when provided', async () => {
    await mockRouter.push('/new/nature/5/10');
    const component = await renderWithNextIntl(
      <Breadcrumbs additionalNames={['Nature', 'Test', 'Test2']} />,
    );

    const links = await component.findAllByRole('link');
    const linksData = links.map((link) => ({
      href: link.getAttribute('href'),
      text: link.firstChild?.textContent,
    }));

    expect(linksData).toStrictEqual([
      {
        href: '/home',
        text: 'Home',
      },
      {
        href: '/new',
        text: 'New',
      },
      {
        href: '/new/nature',
        text: 'Nature',
      },
      {
        href: '/new/nature/5',
        text: 'Test',
      },
      {
        href: '/new/nature/5/10',
        text: 'Test2',
      },
    ]);
  });
});
