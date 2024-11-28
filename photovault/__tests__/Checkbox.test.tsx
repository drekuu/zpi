import { describe, expect, test } from 'vitest';
import Checkbox from '@/components/Checkbox/Checkbox';
import { render, within } from '@testing-library/react';

describe('Checkbox', () => {
  test('is controllable', () => {
    let checked = false;

    const component = render(<Checkbox id='' checked={checked} />);
    const checkbox = component.getByRole('checkbox');
    expect(checkbox);
  });
});
