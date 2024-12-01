import { describe, expect, test, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Button from '@/components/Form/Button';

describe('Button', () => {
  test('handles onClick', () => {
    const name = 'button';

    const handleClick = vi.fn();
    const component = render(<Button onClick={handleClick}>{name}</Button>);

    fireEvent.click(component.getByText(name));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
