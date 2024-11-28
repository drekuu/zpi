import { describe, test } from 'vitest';
import mockRouter from 'next-router-mock';
import { render } from '@testing-library/react';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { renderWithNextIntl } from './utils';

describe('Breadcrumbs', () => {
  test('renders only the first crumb if additionalNames is not provided', async () => {
    await mockRouter.push('/new/nature/5/10');
    const component = await renderWithNextIntl(<Breadcrumbs />);

    const links = component.findAllByRole('link');
    console.log(links);
  });
});
