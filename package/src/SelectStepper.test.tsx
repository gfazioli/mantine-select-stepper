import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import { render } from '@mantine-tests/core';
import { SelectStepper, type SelectStepperRef } from './SelectStepper';

const testData = ['React', 'Vue', 'Angular'];
const testDataWithDisabled = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue', disabled: true },
  { value: 'angular', label: 'Angular' },
];

describe('SelectStepper', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // --- Basic rendering ---
  it('renders without crashing', () => {
    const { container } = render(<SelectStepper data={testData} />);
    expect(container).toBeTruthy();
  });

  it('renders with empty data', () => {
    const { container } = render(<SelectStepper data={[]} emptyValue="No options" />);
    expect(container).toBeTruthy();
    expect(screen.getByText('No options')).toBeTruthy();
  });

  it('renders all items', () => {
    render(<SelectStepper data={testData} />);
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1);
  });

  // --- Uncontrolled mode ---
  it('selects first item by default in uncontrolled mode', () => {
    render(<SelectStepper data={testData} />);
    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('React');
  });

  it('respects defaultValue', () => {
    render(<SelectStepper data={testData} defaultValue="Vue" />);
    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('Vue');
  });

  it('defaultValue={null} starts with no selection (FIX 1.4)', () => {
    render(<SelectStepper data={testData} defaultValue={null} />);
    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('');
  });

  // --- Controlled mode ---
  it('respects value prop in controlled mode', () => {
    render(<SelectStepper data={testData} value="Angular" />);
    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('Angular');
  });

  it('calls onChange when navigating', async () => {
    const onChange = jest.fn();
    render(<SelectStepper data={testData} defaultValue="React" onChange={onChange} />);

    const nextButton = screen.getAllByRole('button')[1];
    await act(async () => {
      fireEvent.click(nextButton);
    });

    expect(onChange).toHaveBeenCalledWith(
      'Vue',
      expect.objectContaining({ value: 'Vue', label: 'Vue' })
    );
  });

  // --- Navigation ---
  it('navigates to next item on right button click', async () => {
    render(<SelectStepper data={testData} defaultValue="React" />);
    const nextButton = screen.getAllByRole('button')[1];

    await act(async () => {
      fireEvent.click(nextButton);
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('Vue');
  });

  it('navigates to previous item on left button click', async () => {
    render(<SelectStepper data={testData} defaultValue="Vue" />);
    const prevButton = screen.getAllByRole('button')[0];

    await act(async () => {
      fireEvent.click(prevButton);
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('React');
  });

  it('does not navigate past the end without loop', async () => {
    render(<SelectStepper data={testData} defaultValue="Angular" />);
    const nextButton = screen.getAllByRole('button')[1];

    await act(async () => {
      fireEvent.click(nextButton);
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('Angular');
  });

  // --- Loop ---
  it('wraps around with loop enabled', async () => {
    render(<SelectStepper data={testData} defaultValue="Angular" loop />);
    const nextButton = screen.getAllByRole('button')[1];

    await act(async () => {
      fireEvent.click(nextButton);
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('React');
  });

  // --- Disabled ---
  it('does not navigate when disabled', async () => {
    render(<SelectStepper data={testData} defaultValue="React" disabled />);
    const nextButton = screen.getAllByRole('button')[1];

    await act(async () => {
      fireEvent.click(nextButton);
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('React');
  });

  it('skips disabled items', async () => {
    render(<SelectStepper data={testDataWithDisabled} defaultValue="react" />);
    const nextButton = screen.getAllByRole('button')[1];

    await act(async () => {
      fireEvent.click(nextButton);
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('angular');
  });

  // --- Keyboard navigation ---
  it('navigates with ArrowRight key', async () => {
    render(<SelectStepper data={testData} defaultValue="React" />);
    const wrapper = screen.getByRole('spinbutton');

    await act(async () => {
      fireEvent.keyDown(wrapper, { key: 'ArrowRight' });
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('Vue');
  });

  it('navigates with ArrowLeft key', async () => {
    render(<SelectStepper data={testData} defaultValue="Vue" />);
    const wrapper = screen.getByRole('spinbutton');

    await act(async () => {
      fireEvent.keyDown(wrapper, { key: 'ArrowLeft' });
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('React');
  });

  // --- ARIA attributes ---
  it('has correct ARIA attributes', () => {
    render(<SelectStepper data={testData} defaultValue="Vue" label="Framework" />);
    const wrapper = screen.getByRole('spinbutton');

    expect(wrapper).toHaveAttribute('aria-valuemin', '0');
    expect(wrapper).toHaveAttribute('aria-valuemax', '2');
    expect(wrapper).toHaveAttribute('aria-valuenow', '1');
    expect(wrapper).toHaveAttribute('aria-valuetext', 'Vue');
    expect(wrapper).toHaveAttribute('aria-label', 'Framework');
  });

  it('has aria-labels on navigation buttons', () => {
    render(<SelectStepper data={testData} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-label', 'Previous item');
    expect(buttons[1]).toHaveAttribute('aria-label', 'Next item');
  });

  it('supports custom aria labels', () => {
    render(
      <SelectStepper
        data={testData}
        previousLabel="Elemento precedente"
        nextLabel="Elemento successivo"
      />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-label', 'Elemento precedente');
    expect(buttons[1]).toHaveAttribute('aria-label', 'Elemento successivo');
  });

  // --- Timeout cleanup ---
  it('cleans up timeout on unmount (FIX 1.2)', async () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const { unmount } = render(<SelectStepper data={testData} defaultValue="React" />);

    const nextButton = screen.getAllByRole('button')[1];
    await act(async () => {
      fireEvent.click(nextButton);
    });

    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  // --- Animation callbacks ---
  it('calls onStepStart on navigation', async () => {
    const onStart = jest.fn();

    render(<SelectStepper data={testData} defaultValue="React" onStepStart={onStart} />);

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[1];

    await act(async () => {
      fireEvent.click(nextButton);
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    // If value changed, the click worked; then onStepStart should have been called
    if (hiddenInput.value === 'Vue') {
      expect(onStart).toHaveBeenCalledTimes(1);
    } else {
      // Click didn't work, skip the callback assertion
      expect(hiddenInput.value).toBe('Vue');
    }
  });

  it('calls onStepEnd after animation completes', async () => {
    const onEnd = jest.fn();

    render(
      <SelectStepper
        data={testData}
        defaultValue="React"
        onStepEnd={onEnd}
        animationDuration={100}
      />
    );

    const buttons = screen.getAllByRole('button');
    await act(async () => {
      fireEvent.click(buttons[1]);
    });

    await act(async () => {
      jest.advanceTimersByTime(150);
    });

    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  // --- Imperative handle ---
  it('exposes imperative methods via controlRef', async () => {
    const controlRef = React.createRef<SelectStepperRef>();
    render(<SelectStepper controlRef={controlRef} data={testData} defaultValue="React" />);

    expect(controlRef.current).toBeTruthy();
    expect(controlRef.current?.next).toBeInstanceOf(Function);
    expect(controlRef.current?.prev).toBeInstanceOf(Function);
    expect(controlRef.current?.reset).toBeInstanceOf(Function);
    expect(controlRef.current?.navigateTo).toBeInstanceOf(Function);
  });

  it('navigateTo changes value', async () => {
    const controlRef = React.createRef<SelectStepperRef>();
    render(<SelectStepper controlRef={controlRef} data={testData} defaultValue="React" />);

    await act(async () => {
      controlRef.current?.navigateTo('Angular');
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('Angular');
  });

  it('reset returns to initial value', async () => {
    const controlRef = React.createRef<SelectStepperRef>();
    render(<SelectStepper controlRef={controlRef} data={testData} defaultValue="React" />);

    await act(async () => {
      controlRef.current?.navigateTo('Angular');
    });

    await act(async () => {
      controlRef.current?.reset();
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('React');
  });

  // --- Orientation ---
  it('renders in vertical mode', () => {
    render(<SelectStepper data={testData} orientation="vertical" />);
    const wrapper = screen.getByRole('spinbutton');
    expect(wrapper).toHaveAttribute('data-orientation', 'vertical');
  });
});
