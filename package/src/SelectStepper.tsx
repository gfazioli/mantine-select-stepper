import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  BoxProps,
  createVarsResolver,
  getRadius,
  Group,
  Input,
  MantineSize,
  PolymorphicFactory,
  polymorphicFactory,
  Stack,
  StylesApiProps,
  Text,
  useMatches,
  useProps,
  useRandomClassName,
  useStyles,
  type __InputWrapperProps,
  type ActionIconProps,
  type ComboboxItem,
  type MantineGradient,
  type MantineRadius,
  type StyleProp,
} from '@mantine/core';
import { useId, useUncontrolled } from '@mantine/hooks';
import { getInputOffsets } from './get-input-offsets/get-input-offsets';
import { SelectStepperMediaVariables } from './SelectStepperMediaVariables';
import classes from './SelectStepper.module.css';

export type SelectStepperVariant =
  | 'filled'
  | 'light'
  | 'outline'
  | 'transparent'
  | 'white'
  | 'subtle'
  | 'default'
  | 'gradient';

export type SelectStepperStylesNames =
  | 'root'
  | 'wrapper'
  | 'leftSection'
  | 'rightSection'
  | 'view'
  | 'scrollArea'
  | 'content'
  | 'label'
  | 'description'
  | 'error';

export type SelectStepperCssVariables = {
  root:
    | '--select-stepper-view-width'
    | '--select-stepper-view-height'
    | '--select-stepper-animation-duration'
    | '--select-stepper-animation-timing-function'
    | '--select-stepper-radius';
  wrapper: '--select-stepper-margin-top' | '--select-stepper-margin-bottom';
};

export type SelectStepperItem = string | ComboboxItem;

export type SelectStepperOrientation = 'horizontal' | 'vertical';

function normalizeData(
  data: SelectStepperItem[]
): { value: string; label: string; disabled?: boolean }[] {
  return data.map((item) => (typeof item === 'string' ? { value: item, label: item } : item));
}

/** Methods available via the imperative controlRef handle */
export interface SelectStepperRef {
  /** Navigate to the next item */
  next: () => void;
  /** Navigate to the previous item */
  prev: () => void;
  /** Reset to the initial/default value */
  reset: () => void;
  /** Navigate to a specific value */
  navigateTo: (value: string) => void;
}

export interface SelectStepperBaseProps {
  data?: SelectStepperItem[];

  /** Current value for controlled component */
  value?: string | null;

  /** Default value for uncontrolled component */
  defaultValue?: string | null;

  /** Value to use when there is no value selected */
  emptyValue?: React.ReactNode;

  /** Callback when the value changes */
  onChange?: (value: string | null, option: ComboboxItem) => void;

  /** Left icon element */
  leftIcon?: React.ReactNode;

  /** Right icon element */
  rightIcon?: React.ReactNode;

  /** Props spread to left icon wrapper */
  leftSectionProps?: ActionIconProps;

  /** Props spread to right icon wrapper */
  rightSectionProps?: ActionIconProps;

  /** Callback when the left icon is clicked */
  onLeftIconClick?: () => void;

  /** Callback when the right icon is clicked */
  onRightIconClick?: () => void;

  /** If true, value will loop when reaching the end or beginning */
  loop?: boolean;

  /** If true, the stepper will be disabled */
  disabled?: boolean;

  /** Width of the view area (viewport). Supports responsive values, e.g. `{ base: 120, md: 200 }` */
  viewWidth?: StyleProp<React.CSSProperties['width']>;

  /** Height of the view area in vertical orientation. Supports responsive values @default 36 */
  viewHeight?: StyleProp<React.CSSProperties['height']>;

  /** Enable or disable scroll animation */
  animate?: boolean;

  /** Animation duration in milliseconds or CSS time value */
  animationDuration?: number | string;

  /** Animation timing function (ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier, etc.) */
  animationTimingFunction?: React.CSSProperties['transitionTimingFunction'];

  /** Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem @default `theme.defaultRadius` */
  radius?: MantineRadius;

  /** Adds border to the root element */
  withBorder?: boolean;

  /** A function to render content of the option, replaces the default content of the option */
  renderOption?: (item: ComboboxItem) => React.ReactNode;

  /** Input element id */
  id?: string;

  /** `Input.Label` root element, `'label'` by default */
  labelElement?: 'label' | 'div';

  /** Gradient values used with `variant="gradient"`. @default `theme.defaultGradient`. */
  gradient?: MantineGradient;

  /** Enable swipe/touch gesture navigation @default true */
  swipeable?: boolean;

  /** Minimum swipe distance in pixels to trigger navigation @default 30 */
  swipeThreshold?: number;

  /** Callback fired when navigation animation starts */
  onStepStart?: () => void;

  /** Callback fired when navigation animation ends */
  onStepEnd?: () => void;

  /** Component size, controls ActionIcon size and font size. Supports responsive values @default 'sm' */
  size?: StyleProp<MantineSize>;

  /** Orientation of the stepper. Supports responsive values @default 'horizontal' */
  orientation?: StyleProp<SelectStepperOrientation>;

  /** Accessible label for the previous button @default 'Previous item' */
  previousLabel?: string;

  /** Accessible label for the next button @default 'Next item' */
  nextLabel?: string;

  /** Ref for imperative control methods (next, prev, reset, navigateTo) */
  controlRef?: React.RefObject<SelectStepperRef | null>;
}

export interface SelectStepperProps
  extends
    BoxProps,
    __InputWrapperProps,
    SelectStepperBaseProps,
    StylesApiProps<SelectStepperFactory> {}

export type SelectStepperFactory = PolymorphicFactory<{
  props: SelectStepperProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: SelectStepperStylesNames;
  variant: SelectStepperVariant;
  vars: SelectStepperCssVariables;
}>;

const defaultProps: Partial<SelectStepperProps> = {
  data: [],
  leftIcon: undefined,
  rightIcon: undefined,
  onLeftIconClick: undefined,
  onRightIconClick: undefined,
  viewWidth: 160,
  animate: true,
  animationDuration: 300,
  animationTimingFunction: 'ease-in-out',
  withBorder: true,
  required: false,
  withAsterisk: false,
  labelElement: 'label',
  inputWrapperOrder: ['label', 'description', 'input', 'error'],
  viewHeight: 36,
  swipeable: true,
  swipeThreshold: 30,
  size: 'sm',
  orientation: 'horizontal',
  previousLabel: 'Previous item',
  nextLabel: 'Next item',
};

const varsResolver = createVarsResolver<SelectStepperFactory>(
  (
    _,
    { animationDuration, animationTimingFunction, radius, description, error, inputWrapperOrder }
  ) => {
    const hasError = !!error && typeof error !== 'boolean';
    const hasDescription = !!description;
    const { offsetBottom, offsetTop } = getInputOffsets(inputWrapperOrder, {
      hasDescription,
      hasError,
    });
    return {
      root: {
        '--select-stepper-radius': radius === undefined ? undefined : getRadius(radius),
        // viewWidth and viewHeight are resolved via useResponsiveValue in the component body
        '--select-stepper-view-width': undefined,
        '--select-stepper-view-height': undefined,
        '--select-stepper-animation-duration':
          typeof animationDuration === 'number' ? `${animationDuration}ms` : animationDuration,
        '--select-stepper-animation-timing-function': animationTimingFunction,
      },
      wrapper: {
        '--select-stepper-margin-top': offsetTop
          ? 'calc(var(--mantine-spacing-xs) / 2)'
          : undefined,
        '--select-stepper-margin-bottom': offsetBottom
          ? 'calc(var(--mantine-spacing-xs) / 2)'
          : undefined,
      },
    };
  }
);

export const SelectStepper = polymorphicFactory<SelectStepperFactory>((_props, ref) => {
  const props = useProps('SelectStepper', defaultProps, _props);
  const {
    data,
    value,
    defaultValue,
    onChange,
    leftIcon,
    rightIcon,
    onLeftIconClick,
    onRightIconClick,
    loop,
    disabled,
    emptyValue,
    viewWidth,
    viewHeight,
    animate,
    animationDuration,
    animationTimingFunction,
    withBorder,
    radius,
    leftSectionProps,
    rightSectionProps,
    renderOption,
    label,
    description,
    required,
    withAsterisk,
    labelProps,
    descriptionProps,
    errorProps,
    id,
    labelElement,
    error,
    inputWrapperOrder,
    variant,
    gradient,
    swipeable,
    swipeThreshold,
    onStepStart,
    onStepEnd,
    size,
    orientation,
    previousLabel,
    nextLabel,
    controlRef,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,
    mod,
    ...others
  } = props;

  const getStyles = useStyles<SelectStepperFactory>({
    name: 'SelectStepper',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  // Scoped class name for InlineStyles responsive CSS
  const responsiveClassName = useRandomClassName();

  // Resolve orientation via useMatches (JS-consumed: controls layout, keyboard, icons)
  const resolvedOrientation = useMatches(
    typeof orientation === 'object' && orientation !== null
      ? (orientation as Record<string, SelectStepperOrientation>)
      : { base: orientation ?? 'horizontal' }
  ) as SelectStepperOrientation;

  // [PERF] Memoize normalized data
  const items = useMemo(() => normalizeData(data), [data]);

  const isVertical = resolvedOrientation === 'vertical';

  // [FIX 1.4] defaultValue={null} should mean "no selection", check !== undefined
  const firstNonDisabledItem = items.find((item) => !item.disabled);
  const initialValue =
    defaultValue !== undefined ? defaultValue : firstNonDisabledItem?.value || null;

  // Store initial value for reset
  const initialValueRef = useRef(initialValue);

  // [FIX 1.1] Pass onChange to useUncontrolled
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue: initialValue,
    onChange: (newValue) => {
      const option = items.find((item) => item.value === newValue) || {
        value: newValue || '',
        label: newValue || '',
      };
      onChange?.(newValue, option);
    },
  });

  const currentIndex = items.findIndex((item) => item.value === _value);

  // Track continuous scroll position for infinite loop
  const [continuousIndex, setContinuousIndex] = React.useState(
    currentIndex !== -1 ? currentIndex : 0
  );
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const mountedRef = useRef(true);
  const isInternalNavRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // [FIX 1.3] Sync continuousIndex when value changes externally — always accept external updates
  useEffect(() => {
    if (currentIndex !== -1) {
      if (isInternalNavRef.current) {
        // Internal navigation: handleNavigation manages continuousIndex directly
        isInternalNavRef.current = false;
        return;
      } else if (isTransitioning) {
        // External value change during transition: cancel ongoing transition
        setIsTransitioning(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = undefined;
        }
      }
      setContinuousIndex(currentIndex + (loop ? items.length : 0));
    }
  }, [_value, items.length, loop, currentIndex]);

  // [FIX 1.6] Reset value when data changes and current value is no longer present
  useEffect(() => {
    if (items.length > 0 && _value !== null && _value !== undefined) {
      const exists = items.some((item) => item.value === _value);
      if (!exists) {
        const firstValid = items.find((item) => !item.disabled);
        setValue(firstValid?.value || items[0].value);
      }
    }
  }, [items, _value]);

  // Calculate scroll offset based on continuous index
  const scrollOffset = loop
    ? -continuousIndex * 100
    : currentIndex === -1
      ? 0
      : -currentIndex * 100;

  const canGoPrev = loop ? items.length > 1 : currentIndex > 0;
  const canGoNext = loop ? items.length > 1 : currentIndex < items.length - 1;

  const findNextValidIndex = (startIndex: number, direction: 1 | -1): number => {
    const len = items.length;
    if (len === 0) {
      return -1;
    }

    let index = startIndex;

    for (let i = 0; i < len; i++) {
      index = loop
        ? (index + direction + len) % len
        : Math.max(0, Math.min(len - 1, index + direction));

      if (!items[index]?.disabled) {
        return index;
      }
      if (!loop && (index === 0 || index === len - 1)) {
        break;
      }
    }

    return currentIndex;
  };

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleNavigation = (direction: -1 | 1) => {
    const canNavigate = direction === -1 ? canGoPrev : canGoNext;
    if (disabled || !canNavigate) {
      return;
    }

    const nextIndex = findNextValidIndex(currentIndex, direction);

    // Only proceed if there's a real change
    if (nextIndex === currentIndex || nextIndex === -1) {
      return;
    }

    // [FIX 1.2] Always clear previous timeout before starting a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }

    setIsTransitioning(true);
    onStepStart?.();

    if (loop) {
      setContinuousIndex((prev) => prev + direction);
    }
    isInternalNavRef.current = true;
    setValue(items[nextIndex].value);

    // Reset transition flag after animation
    const duration = typeof animationDuration === 'number' ? animationDuration : 300;
    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) {
        return;
      }
      setIsTransitioning(false);
      onStepEnd?.();
      // Reset to center group if needed
      if (loop) {
        setContinuousIndex(items.length + nextIndex);
      }
    }, duration);
  };

  const handleLeftClick = () => {
    if (disabled || !canGoPrev) {
      return;
    }
    onLeftIconClick?.();
    handleNavigation(-1);
  };

  const handleRightClick = () => {
    if (disabled || !canGoNext) {
      return;
    }
    onRightIconClick?.();
    handleNavigation(1);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) {
      return;
    }

    const prevKeys = isVertical ? ['ArrowUp'] : ['ArrowLeft'];
    const nextKeys = isVertical ? ['ArrowDown'] : ['ArrowRight'];

    if (prevKeys.includes(event.key)) {
      event.preventDefault();
      handleLeftClick();
    } else if (nextKeys.includes(event.key)) {
      event.preventDefault();
      handleRightClick();
    }
  };

  // --- Swipe/Touch gesture support via Pointer Events ---
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (event: React.PointerEvent) => {
    if (!swipeable || disabled) {
      return;
    }
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    if (!swipeable || disabled || !pointerStartRef.current) {
      return;
    }
    const dx = event.clientX - pointerStartRef.current.x;
    const dy = event.clientY - pointerStartRef.current.y;
    const threshold = swipeThreshold ?? 30;

    if (isVertical) {
      if (Math.abs(dy) > threshold && Math.abs(dy) > Math.abs(dx)) {
        handleNavigation(dy < 0 ? 1 : -1);
      }
    } else if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
      handleNavigation(dx < 0 ? 1 : -1);
    }

    pointerStartRef.current = null;
  };

  const handlePointerCancel = () => {
    pointerStartRef.current = null;
  };

  // --- Imperative handle ---
  useImperativeHandle(controlRef, () => ({
    next: () => handleNavigation(1),
    prev: () => handleNavigation(-1),
    reset: () => {
      const initial = initialValueRef.current;
      // Validate initialValue still exists in current data
      if (initial !== null && initial !== undefined) {
        const exists = items.some((item) => item.value === initial);
        if (exists) {
          setValue(initial);
          return;
        }
      }
      // Fallback to first non-disabled item
      const firstValid = items.find((item) => !item.disabled);
      setValue(firstValid?.value ?? null);
    },
    navigateTo: (targetValue: string) => {
      if (disabled) {
        return;
      }
      const targetIndex = items.findIndex((item) => item.value === targetValue);
      if (targetIndex !== -1 && !items[targetIndex].disabled) {
        setValue(targetValue);
      }
    },
  }));

  // Memoized function to render a single item
  const renderItem = useMemo(
    () => (item: ComboboxItem, keyPrefix: string, index: number, isActive?: boolean) => {
      const key = `${keyPrefix}-${item.value}-${index}`;
      const contentStyleProps = getStyles('content');
      const activeProps = isActive ? { 'data-active': true } : {};

      if (typeof renderOption === 'function') {
        return (
          <Box key={key} {...contentStyleProps} {...activeProps}>
            {renderOption(item)}
          </Box>
        );
      }

      return (
        <Text key={key} {...contentStyleProps} {...activeProps}>
          {item.label}
        </Text>
      );
    },
    [renderOption, getStyles, items]
  );

  const uuid = useId(id);

  const wrapperProps = {
    id: uuid,
    label,
    description,
    required,
    withAsterisk,
    labelProps,
    descriptionProps,
    error,
    errorProps,
    labelElement,
    inputWrapperOrder,
    classNames: classNames as unknown,
    styles: styles as unknown,
    unstyled,
    style: style as unknown,
  };

  // Determine current label for aria-valuetext
  const currentLabel = currentIndex !== -1 ? items[currentIndex]?.label : undefined;

  // [FIX 1.5] Determine display index — show first item when all disabled or no match
  const displayIndex = currentIndex !== -1 ? currentIndex : items.length > 0 ? 0 : -1;

  // Resolve icons based on orientation
  const resolvedLeftIcon = leftIcon ?? (isVertical ? <IconChevronUp /> : <IconChevronLeft />);
  const resolvedRightIcon = rightIcon ?? (isVertical ? <IconChevronDown /> : <IconChevronRight />);

  const Container = isVertical ? Stack : Group;

  const scrollStyle = {
    '--select-stepper-scroll-offset': `${scrollOffset}%`,
  } as React.CSSProperties;

  const actionSizeStyle = {
    '--ai-size': 'var(--select-stepper-action-size)',
  } as React.CSSProperties;

  return (
    <>
      <SelectStepperMediaVariables
        viewWidth={viewWidth}
        viewHeight={viewHeight}
        size={size}
        selector={`.${responsiveClassName}`}
      />
      <Box ref={ref} {...getStyles('root', { className: responsiveClassName })}>
        <Input.Wrapper {...wrapperProps}>
          <input type="hidden" value={_value || ''} id={uuid} />
          <Box
            {...getStyles('wrapper', { style: scrollStyle })}
            {...others}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            tabIndex={disabled ? -1 : 0}
            role="spinbutton"
            aria-valuemin={0}
            aria-valuemax={items.length > 0 ? items.length - 1 : 0}
            aria-valuenow={currentIndex === -1 ? undefined : currentIndex}
            aria-valuetext={currentLabel}
            aria-disabled={disabled || undefined}
            aria-label={typeof label === 'string' ? label : undefined}
            aria-labelledby={typeof label !== 'string' && label ? `${uuid}-label` : undefined}
            mod={[
              {
                'data-with-border': withBorder,
                disabled,
                'data-orientation': resolvedOrientation,
              },
              mod,
            ]}
          >
            <Container gap={1} {...(!isVertical && { wrap: 'nowrap' })}>
              <ActionIcon
                variant={variant}
                gradient={gradient}
                radius={radius ?? undefined}
                {...getStyles('leftSection', { style: actionSizeStyle })}
                disabled={disabled || !canGoPrev}
                onClick={handleLeftClick}
                aria-label={previousLabel}
                {...leftSectionProps}
              >
                {resolvedLeftIcon}
              </ActionIcon>
              <Box {...getStyles('view')} mod={{ 'data-orientation': resolvedOrientation }}>
                <Box
                  {...getStyles('scrollArea')}
                  mod={{
                    animate: animate && isTransitioning,
                    'data-orientation': resolvedOrientation,
                  }}
                >
                  {loop && items.length > 0 ? (
                    // Render 3 sets of items for infinite loop effect: [prev][current][next]
                    <>
                      {items.map((item, index) => renderItem(item, 'prev', index))}
                      {items.map((item, index) =>
                        renderItem(item, 'current', index, index === currentIndex)
                      )}
                      {items.map((item, index) => renderItem(item, 'next', index))}
                    </>
                  ) : (
                    // Normal rendering without loop
                    <>
                      {items.map((item, index) =>
                        renderItem(item, 'item', index, index === displayIndex)
                      )}
                      {items.length === 0 &&
                        (typeof emptyValue === 'string' || typeof emptyValue === 'number' ? (
                          <Text {...getStyles('content')}>{emptyValue}</Text>
                        ) : (
                          <Box {...getStyles('content')}>{emptyValue}</Box>
                        ))}
                    </>
                  )}
                </Box>
              </Box>
              <ActionIcon
                variant={variant}
                gradient={gradient}
                radius={radius ?? undefined}
                {...getStyles('rightSection', { style: actionSizeStyle })}
                disabled={disabled || !canGoNext}
                onClick={handleRightClick}
                aria-label={nextLabel}
                {...rightSectionProps}
              >
                {resolvedRightIcon}
              </ActionIcon>
            </Container>
          </Box>
          {/* [A11Y] Screen reader live region for value announcements */}
          <Box
            aria-live="polite"
            aria-atomic="true"
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
            }}
          >
            {currentLabel ? `Selected: ${currentLabel}` : ''}
          </Box>
        </Input.Wrapper>
      </Box>
    </>
  );
});

SelectStepper.classes = classes;
SelectStepper.displayName = 'SelectStepper';
