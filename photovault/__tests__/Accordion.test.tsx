import { describe, expect, test } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Accordion from '@/components/Accordion/Accordion';

describe('Accordion', () => {
  test('renders name', () => {
    const testName = 'Accordion test';

    const component = render(
      <Accordion name={testName}>
        <div />
      </Accordion>,
    );

    const name = component.getByText(testName);
    expect(name).toBeDefined();
  });

  test('renders children properly [snapshot]', () => {
    const component = render(
      <Accordion name=''>
        <div>
          <p>hello from child</p>
        </div>

        <div>hello from second child</div>
      </Accordion>,
    );

    const children = component.getByTestId('children-test');
    expect(children.children).toMatchSnapshot();
  });

  test('can be opened', () => {
    const testName = 'click test';

    const component = render(
      <Accordion name={testName}>
        <div />
      </Accordion>,
    );

    const name = component.getByText(testName);
    fireEvent.click(name);

    const children = component.getByTestId('children-test');
    expect(children.style.getPropertyValue('height')).not.toBe('0');
  });
});
