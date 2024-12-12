import { describe, expect, test, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import InputField from '@/components/Form/InputField';

describe('InputField', () => {
  test('handles onChange', () => {
    const handleOnChange = vi.fn();
    const component = render(
      <InputField type='text' value='' onChange={handleOnChange} label='' />,
    );

    const input = component.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleOnChange).toHaveBeenCalledOnce();
  });
});
