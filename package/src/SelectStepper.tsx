import React, { useEffect, useMemo, useRef } from 'react';
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

  /** A function to render content of the option, replaces the default content of the option */
  renderOption?: (item: ComboboxItem) => React.ReactNode;
}

export interface SelectStepperProps extends BoxProps, SelectStepperBaseProps, StylesApiProps<SelectStepperFactory> {}

export type SelectStepperFactory = PolymorphicFactory<{
  props: SelectStepperProps;
  defaultComponent: 'div';
  defaultRef: HTMLDivElement;
  stylesNames: SelectStepperStylesNames;
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
    renderOption,

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
      setContinuousIndex(currentIndex + (loop ? items.length : 0));
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
      if (!loop && (index === 0 || index === len - 1)) {
        break;
      }
    }

    return currentIndex;
  };

  const timeoutRef = useRef<number | undefined>(undefined);

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

    setIsTransitioning(true);
    const nextIndex = findNextValidIndex(currentIndex, direction);

    if (nextIndex !== currentIndex) {
      if (loop) {
        setContinuousIndex((prev) => prev + direction);
      }
      handleChange(items[nextIndex].value);

      // Reset transition flag after animation
      const duration = typeof animationDuration === 'number' ? animationDuration : 300;
      timeoutRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
        // Reset to center group if needed
        if (loop) {
          setContinuousIndex(items.length + nextIndex);
        }
      }, duration);
    } else {
      setIsTransitioning(false);
    }
  };

  const handleLeftClick = () => handleNavigation(-1);
  const handleRightClick = () => handleNavigation(1);

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
    }
  };

  // Memoized function to render a single item
  const renderItem = useMemo(
    () => (item: ComboboxItem, keyPrefix: string, index: number, isActive?: boolean) => {
      const key = `${keyPrefix}-${item.value}-${index}`;
      const labelProps = getStyles('label');
      const activeProps = isActive ? { 'data-active': true } : {};

      if (typeof renderOption === 'function') {
        return (
          <Box key={key} {...labelProps} {...activeProps}>
            {renderOption(item)}
          </Box>
        );
      }

      return (
        <Text key={key} {...labelProps} {...activeProps}>
          {item.label}
        </Text>
      );
    },
    [renderOption, getStyles]
  );

  return (
    <Box
      ref={ref}
      {...getStyles('root', { style: { '--select-stepper-scroll-offset': `${scrollOffset}%` } as React.CSSProperties })}
      {...others}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="spinbutton"
      mod={[{ 'data-with-border': withBorder, disabled }, mod]}
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
                {items.map((item, index) => renderItem(item, 'prev', index))}
                {items.map((item, index) => renderItem(item, 'current', index, index === currentIndex))}
                {items.map((item, index) => renderItem(item, 'next', index))}
              </>
            ) : (
              // Normal rendering without loop
              <>
                {items.map((item, index) => renderItem(item, 'item', index, index === currentIndex))}
                {items.length === 0 &&
                  (typeof emptyValue === 'string' || typeof emptyValue === 'number' ? (
                    <Text {...getStyles('label')}>{emptyValue}</Text>
                  ) : (
                    <Box {...getStyles('label')}>{emptyValue}</Box>
                  ))}
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
