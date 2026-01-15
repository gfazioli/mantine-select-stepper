import React from 'react';
import { render } from '@mantine-tests/core';
import { SelectStepper } from './SelectStepper';

describe('SelectStepper', () => {
  it('renders without crashing', () => {
    const { container } = render(<SelectStepper />);
    expect(container).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SelectStepper ref={ref} />);
    expect(ref.current).toBeTruthy();
  });
});
