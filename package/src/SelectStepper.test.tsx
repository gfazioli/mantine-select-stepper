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

  // ─── Basic rendering ───────────────────────────────────────────────

  it('renders without crashing', () => {
    const { container } = render(<SelectStepper data={testData} />);
    expect(container).toBeTruthy();
  });

  it('renders with empty data and string emptyValue', () => {
    render(<SelectStepper data={[]} emptyValue="No options" />);
    expect(screen.getByText('No options')).toBeTruthy();
  });

  it('renders with empty data and ReactNode emptyValue', () => {
    render(
      <SelectStepper data={[]} emptyValue={<span data-testid="custom-empty">Nothing</span>} />
    );
    expect(screen.getByTestId('custom-empty')).toBeTruthy();
  });

  it('renders all items', () => {
    render(<SelectStepper data={testData} />);
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1);
  });

  // ─── Uncontrolled mode ─────────────────────────────────────────────

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

  // ─── Controlled mode ──────────────────────────────────────────────

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

  it('updates when parent changes value externally during transition', async () => {
    const { rerender } = render(<SelectStepper data={testData} value="React" />);

    // Click to start a transition
    const nextButton = screen.getAllByRole('button')[1];
    await act(async () => {
      fireEvent.click(nextButton);
    });

    // Parent forces a different value during transition
    rerender(<SelectStepper data={testData} value="Angular" />);

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('Angular');
  });

  // ─── Navigation ───────────────────────────────────────────────────

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

  it('does not navigate before the start without loop', async () => {
    render(<SelectStepper data={testData} defaultValue="React" />);
    const prevButton = screen.getAllByRole('button')[0];

    await act(async () => {
      fireEvent.click(prevButton);
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('React');
  });

  // ─── Loop ─────────────────────────────────────────────────────────

  it('wraps forward with loop enabled (last → first)', async () => {
    render(<SelectStepper data={testData} defaultValue="Angular" loop />);
    const nextButton = screen.getAllByRole('button')[1];

    await act(async () => {
      fireEvent.click(nextButton);
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('React');
  });

  it('wraps backward with loop enabled (first → last)', async () => {
    render(<SelectStepper data={testData} defaultValue="React" loop />);
    const prevButton = screen.getAllByRole('button')[0];

    await act(async () => {
      fireEvent.click(prevButton);
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('Angular');
  });

  it('loop skips disabled items when wrapping', async () => {
    const data = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
      { value: 'c', label: 'C', disabled: true },
    ];
    render(<SelectStepper data={data} defaultValue="b" loop />);
    const nextButton = screen.getAllByRole('button')[1];

    // B → next should skip C (disabled) and wrap to A
    await act(async () => {
      fireEvent.click(nextButton);
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('a');
  });

  // ─── Disabled ─────────────────────────────────────────────────────

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

  it('does not navigate when all items are disabled', async () => {
    const allDisabled = [
      { value: 'a', label: 'A', disabled: true },
      { value: 'b', label: 'B', disabled: true },
    ];
    render(<SelectStepper data={allDisabled} />);
    const nextButton = screen.getAllByRole('button')[1];

    await act(async () => {
      fireEvent.click(nextButton);
    });

    // Value should remain unchanged (first item or empty)
    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('');
  });

  // ─── Data change ──────────────────────────────────────────────────

  it('resets value when current value disappears from data (FIX 1.6)', async () => {
    const { rerender } = render(<SelectStepper data={testData} defaultValue="Vue" />);

    // Change data so "Vue" no longer exists
    await act(async () => {
      rerender(<SelectStepper data={['Svelte', 'Solid']} />);
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(['Svelte', 'Solid']).toContain(hiddenInput.value);
  });

  // ─── Keyboard navigation ──────────────────────────────────────────

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

  it('navigates with ArrowUp/ArrowDown in vertical mode', async () => {
    render(<SelectStepper data={testData} defaultValue="React" orientation="vertical" />);
    const wrapper = screen.getByRole('spinbutton');

    // ArrowDown = next in vertical
    await act(async () => {
      fireEvent.keyDown(wrapper, { key: 'ArrowDown' });
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('Vue');

    // ArrowUp = prev in vertical
    await act(async () => {
      fireEvent.keyDown(wrapper, { key: 'ArrowUp' });
    });
    expect(hiddenInput.value).toBe('React');
  });

  it('ignores unrelated keys', async () => {
    render(<SelectStepper data={testData} defaultValue="React" />);
    const wrapper = screen.getByRole('spinbutton');

    await act(async () => {
      fireEvent.keyDown(wrapper, { key: 'Enter' });
      fireEvent.keyDown(wrapper, { key: 'Space' });
      fireEvent.keyDown(wrapper, { key: 'Tab' });
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('React');
  });

  // ─── ARIA attributes ─────────────────────────────────────────────

  it('has correct ARIA attributes', () => {
    render(<SelectStepper data={testData} defaultValue="Vue" label="Framework" />);
    const wrapper = screen.getByRole('spinbutton');

    expect(wrapper).toHaveAttribute('aria-valuemin', '0');
    expect(wrapper).toHaveAttribute('aria-valuemax', '2');
    expect(wrapper).toHaveAttribute('aria-valuenow', '1');
    expect(wrapper).toHaveAttribute('aria-valuetext', 'Vue');
    expect(wrapper).toHaveAttribute('aria-label', 'Framework');
  });

  it('sets aria-disabled when disabled', () => {
    render(<SelectStepper data={testData} disabled />);
    const wrapper = screen.getByRole('spinbutton');
    expect(wrapper).toHaveAttribute('aria-disabled', 'true');
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

  // ─── Timeout cleanup ─────────────────────────────────────────────

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

  // ─── Animation callbacks ──────────────────────────────────────────

  it('calls onStepStart on navigation', async () => {
    const onStart = jest.fn();

    render(<SelectStepper data={testData} defaultValue="React" onStepStart={onStart} />);

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[1];

    await act(async () => {
      fireEvent.click(nextButton);
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    if (hiddenInput.value === 'Vue') {
      expect(onStart).toHaveBeenCalledTimes(1);
    } else {
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

  // ─── Imperative handle ────────────────────────────────────────────

  it('exposes imperative methods via controlRef', () => {
    const controlRef = React.createRef<SelectStepperRef>();
    render(<SelectStepper controlRef={controlRef} data={testData} defaultValue="React" />);

    expect(controlRef.current).toBeTruthy();
    expect(controlRef.current?.next).toBeInstanceOf(Function);
    expect(controlRef.current?.prev).toBeInstanceOf(Function);
    expect(controlRef.current?.reset).toBeInstanceOf(Function);
    expect(controlRef.current?.navigateTo).toBeInstanceOf(Function);
  });

  it('next() and prev() navigate correctly', async () => {
    const controlRef = React.createRef<SelectStepperRef>();
    render(<SelectStepper controlRef={controlRef} data={testData} defaultValue="React" />);

    await act(async () => {
      controlRef.current?.next();
    });
    let hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('Vue');

    await act(async () => {
      controlRef.current?.prev();
    });
    hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('React');
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

  it('navigateTo does nothing for disabled items', async () => {
    const controlRef = React.createRef<SelectStepperRef>();
    render(
      <SelectStepper controlRef={controlRef} data={testDataWithDisabled} defaultValue="react" />
    );

    await act(async () => {
      controlRef.current?.navigateTo('vue'); // vue is disabled
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('react');
  });

  it('navigateTo does nothing for non-existent value', async () => {
    const controlRef = React.createRef<SelectStepperRef>();
    render(<SelectStepper controlRef={controlRef} data={testData} defaultValue="React" />);

    await act(async () => {
      controlRef.current?.navigateTo('NonExistent');
    });

    const hiddenInput = document.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hiddenInput.value).toBe('React');
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

  // ─── Orientation ──────────────────────────────────────────────────

  it('renders in vertical mode with correct attributes', () => {
    render(<SelectStepper data={testData} orientation="vertical" />);
    const wrapper = screen.getByRole('spinbutton');
    expect(wrapper).toHaveAttribute('data-orientation', 'vertical');
  });

  // ─── Visual props ─────────────────────────────────────────────────

  it('applies withBorder attribute', () => {
    render(<SelectStepper data={testData} withBorder />);
    const wrapper = screen.getByRole('spinbutton');
    expect(wrapper).toHaveAttribute('data-with-border', 'true');
  });

  it('applies withBorder={false}', () => {
    render(<SelectStepper data={testData} withBorder={false} />);
    const wrapper = screen.getByRole('spinbutton');
    expect(wrapper).not.toHaveAttribute('data-with-border');
  });

  it('renders with renderOption', () => {
    render(
      <SelectStepper
        data={testData}
        defaultValue="React"
        renderOption={(item) => <span data-testid="custom-option">{item.label}!</span>}
      />
    );
    expect(screen.getAllByTestId('custom-option').length).toBeGreaterThanOrEqual(1);
  });

  it('renders with gradient variant', () => {
    const { container } = render(
      <SelectStepper data={testData} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} />
    );
    expect(container).toBeTruthy();
  });
});
