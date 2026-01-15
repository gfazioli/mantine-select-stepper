import React, { useEffect } from 'react';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  BoxProps,
  createVarsResolver,
  getRadius,
  Group,
  PolymorphicFactory,
  polymorphicFactory,
  StylesApiProps,
  Text,
  useProps,
  useStyles,
  type ActionIconProps,
  type ComboboxItem,
  type MantineRadius,
} from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import classes from './SelectStepper.module.css';

export type SelectStepperVariant = 'flat' | '3d';

export type SelectStepperAnimationType = 'pulse' | 'flash' | 'breathe' | 'blink' | 'glow' | 'none';

export type SelectStepperStylesNames = 'root' | 'leftSection' | 'rightSection' | 'view' | 'scrollArea' | 'label';

export type SelectStepperCssVariables = {
  root: '--select-stepper-view-width' | '--select-stepper-animation-duration' | '--select-stepper-animation-timing-function' | '--select-stepper-radius';
};

export type SelectStepperItem = string | ComboboxItem;

function normalizeData(data: SelectStepperItem[]): { value: string; label: string; disabled?: boolean }[] {
  return data.map((item) => (typeof item === 'string' ? { value: item, label: item } : item));
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

  /** Width of the view area (viewport) */
  viewWidth?: React.CSSProperties['width'];

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
}

export interface SelectStepperProps extends BoxProps, SelectStepperBaseProps, StylesApiProps<SelectStepperFactory> {}

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
  defaultValue: null,
  leftIcon: <IconMinus />,
  rightIcon: <IconPlus />,
  onLeftIconClick: undefined,
  onRightIconClick: undefined,
  viewWidth: 200,
  animate: true,
  animationDuration: 300,
  animationTimingFunction: 'ease-in-out',
  withBorder: true,
};

const varsResolver = createVarsResolver<SelectStepperFactory>((_, { viewWidth, animationDuration, animationTimingFunction, radius }) => {
  return {
    root: {
      '--select-stepper-radius': radius === undefined ? undefined : getRadius(radius),
      '--select-stepper-view-width': typeof viewWidth === 'number' ? `${viewWidth}px` : viewWidth,
      '--select-stepper-animation-duration': typeof animationDuration === 'number' ? `${animationDuration}ms` : animationDuration,
      '--select-stepper-animation-timing-function': animationTimingFunction,
    },
  };
});

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
    animate,
    animationDuration,
    animationTimingFunction,
    withBorder,
    radius,
    leftSectionProps,
    rightSectionProps,

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

  const items = normalizeData(data);

  // If neither value nor defaultValue are set, use the first non-disabled item
  const firstNonDisabledItem = items.find((item) => !item.disabled);
  const initialValue = defaultValue !== null && defaultValue !== undefined ? defaultValue : firstNonDisabledItem?.value || null;

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue: initialValue,
    onChange: undefined,
  });

  const handleChange = (newValue: string | null) => {
    setValue(newValue);
    const option = items.find((item) => item.value === newValue) || { value: newValue || '', label: newValue || '' };
    onChange?.(newValue, option);
  };

  const currentIndex = items.findIndex((item) => item.value === _value);

  // Track continuous scroll position for infinite loop
  const [continuousIndex, setContinuousIndex] = React.useState(currentIndex !== -1 ? currentIndex : 0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  // Sync continuousIndex when value changes externally (controlled mode)
  useEffect(() => {
    if (currentIndex !== -1 && !isTransitioning) {
      const validIndex = currentIndex !== -1 ? currentIndex : 0;
      setContinuousIndex(validIndex + (loop ? items.length : 0));
    }
  }, [_value, items.length, loop, isTransitioning, currentIndex]);

  // Calculate scroll offset based on continuous index
  const scrollOffset = loop ? -continuousIndex * 100 : -currentIndex * 100;

  const canGoPrev = loop ? items.length > 1 : currentIndex > 0;
  const canGoNext = loop ? items.length > 1 : currentIndex < items.length - 1;

  const findNextValidIndex = (startIndex: number, direction: 1 | -1): number => {
    const len = items.length;
    let index = startIndex;

    for (let i = 0; i < len; i++) {
      index = loop ? (index + direction + len) % len : Math.max(0, Math.min(len - 1, index + direction));

      if (!items[index]?.disabled) {
        return index;
      }
      if (!loop && (index === 0 || index === len - 1)) break;
    }

    return currentIndex;
  };

  const handleLeftClick = () => {
    if (disabled || !canGoPrev) {
      return;
    }

    setIsTransitioning(true);
    const nextIndex = findNextValidIndex(currentIndex, -1);

    if (nextIndex !== currentIndex) {
      if (loop) {
        // Move continuous index backward
        setContinuousIndex((prev) => prev - 1);
      }
      handleChange(items[nextIndex].value);

      // Reset transition flag after animation
      const duration = typeof animationDuration === 'number' ? animationDuration : 300;
      setTimeout(() => {
        setIsTransitioning(false);
        // Reset to center group if needed
        if (loop) {
          const moduloIndex = nextIndex;
          setContinuousIndex(items.length + moduloIndex);
        }
      }, duration);
    } else {
      setIsTransitioning(false);
    }
  };

  const handleRightClick = () => {
    if (disabled || !canGoNext) {
      return;
    }

    setIsTransitioning(true);
    const nextIndex = findNextValidIndex(currentIndex, 1);

    if (nextIndex !== currentIndex) {
      if (loop) {
        // Move continuous index forward
        setContinuousIndex((prev) => prev + 1);
      }
      handleChange(items[nextIndex].value);

      // Reset transition flag after animation
      const duration = typeof animationDuration === 'number' ? animationDuration : 300;
      setTimeout(() => {
        setIsTransitioning(false);
        // Reset to center group if needed
        if (loop) {
          const moduloIndex = nextIndex;
          setContinuousIndex(items.length + moduloIndex);
        }
      }, duration);
    } else {
      setIsTransitioning(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        handleLeftClick();
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        handleRightClick();
        break;
      default:
        return;
    }
  };

  return (
    <Box
      ref={ref}
      {...getStyles('root', { style: { '--select-stepper-scroll-offset': `${scrollOffset}%` } as React.CSSProperties })}
      {...others}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="spinbutton"
      mod={[{ 'data-with-border': withBorder }, mod]}
    >
      <Group>
        <ActionIcon {...getStyles('leftSection')} disabled={disabled || !canGoPrev} onClick={handleLeftClick} {...leftSectionProps}>
          {leftIcon}
        </ActionIcon>
        <Box {...getStyles('view')}>
          <Box {...getStyles('scrollArea')} mod={{ animate: animate && isTransitioning }}>
            {loop && items.length > 0 ? (
              // Render 3 sets of items for infinite loop effect: [prev][current][next]
              <>
                {items.map((item, index) => (
                  <Text key={`prev-${item.value}-${index}`} {...getStyles('label')}>
                    {item.label}
                  </Text>
                ))}
                {items.map((item, index) => (
                  <Text key={`current-${item.value}-${index}`} {...getStyles('label')} data-active={index === currentIndex || undefined}>
                    {item.label}
                  </Text>
                ))}
                {items.map((item, index) => (
                  <Text key={`next-${item.value}-${index}`} {...getStyles('label')}>
                    {item.label}
                  </Text>
                ))}
              </>
            ) : (
              // Normal rendering without loop
              <>
                {items.map((item, index) => (
                  <Text key={item.value} {...getStyles('label')} data-active={index === currentIndex || undefined}>
                    {item.label}
                  </Text>
                ))}
                {items.length === 0 && <Text {...getStyles('label')}>{emptyValue}</Text>}
              </>
            )}
          </Box>
        </Box>
        <ActionIcon {...getStyles('rightSection')} disabled={disabled || !canGoNext} onClick={handleRightClick} {...rightSectionProps}>
          {rightIcon}
        </ActionIcon>
      </Group>
    </Box>
  );
});

SelectStepper.classes = classes;
SelectStepper.displayName = 'SelectStepper';
