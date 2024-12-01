import { describe, expect, test } from 'vitest';
import Checkbox from '@/components/Checkbox/Checkbox';
import { render } from '@testing-library/react';

describe('Checkbox', () => {
  test('is controllable', () => {
    const component = render(<Checkbox id='' checked={false} />);
    const checkbox = component.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    component.rerender(<Checkbox id='' checked={true} />);
    expect(checkbox).toBeChecked();
  });
});
