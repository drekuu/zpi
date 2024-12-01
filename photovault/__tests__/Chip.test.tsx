import { describe, expect, test, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Chip from '@/components/Chip/Chip';

describe('Chip', () => {
  test('handles onClick', () => {
    const name = 'chip';

    const handleClick = vi.fn();
    const component = render(<Chip onClick={handleClick}>{name}</Chip>);

    fireEvent.click(component.getByText(name));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
