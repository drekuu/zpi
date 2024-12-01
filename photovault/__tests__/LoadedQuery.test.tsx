import { describe, expect, test, vi } from 'vitest';
import { useQuery } from '@tanstack/react-query';
import LoadedQuery from '@/components/LoadedQuery/LoadedQuery';
import { withMockNextIntl } from './utils';
import { render } from '@testing-library/react';

vi.mock('@tanstack/react-query');

describe('LoadedQuery', () => {
  test('shows content on query load', async () => {
    // @ts-expect-error useQuery doesn't need to be complete, since only a few properties are actually used
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      isPending: true,
      isError: false,
    });

    let query = useQuery({ queryKey: [''], queryFn: () => true });

    const text = 'content';
    const component = render(
      await withMockNextIntl(<LoadedQuery query={query}>{text}</LoadedQuery>),
    );

    let content = component.queryByText(text);
    expect(content).not.toBeInTheDocument();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      isPending: false,
      isError: false,
    });

    query = useQuery({ queryKey: [''], queryFn: () => true });

    component.rerender(
      await withMockNextIntl(<LoadedQuery query={query}>{text}</LoadedQuery>),
    );

    content = component.queryByText(text);
    expect(content).toBeInTheDocument();
  });

  test('shows error', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      isPending: false,
      isError: true,
    });

    const query = useQuery({ queryKey: [''], queryFn: () => true });

    const text = 'content';
    const component = render(
      await withMockNextIntl(
        <LoadedQuery query={query} handleError={true}>
          {text}
        </LoadedQuery>,
      ),
    );

    const error = component.queryByTestId('loadedquery-error');
    expect(error).toBeInTheDocument();
  });

  test("doesn't show error when handleError is false", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      isPending: false,
      isError: true,
    });

    const query = useQuery({ queryKey: [''], queryFn: () => true });

    const text = 'content';
    const component = render(
      await withMockNextIntl(<LoadedQuery query={query}>{text}</LoadedQuery>),
    );

    const error = component.queryByTestId('loadedquery-error');
    expect(error).not.toBeInTheDocument();
  });
});
