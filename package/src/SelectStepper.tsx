import React from 'react';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  BoxProps,
  createVarsResolver,
  Group,
  PolymorphicFactory,
  polymorphicFactory,
  StylesApiProps,
  Text,
  useProps,
  useStyles,
  type ComboboxItem,
} from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import classes from './SelectStepper.module.css';

export type SelectStepperVariant = 'flat' | '3d';

export type SelectStepperAnimationType = 'pulse' | 'flash' | 'breathe' | 'blink' | 'glow' | 'none';

export type SelectStepperStylesNames = 'root' | 'leftSection' | 'rightSection' | 'label';

export type SelectStepperCssVariables = {
  root: never;
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
  onChange?: (value: string | null) => void;

  /** Left icon element */
  leftIcon?: React.ReactNode;

  /** Right icon element */
  rightIcon?: React.ReactNode;

  /** Callback when the left icon is clicked */
  onLeftIconClick?: () => void;

  /** Callback when the right icon is clicked */
  onRightIconClick?: () => void;

  /** If true, value will loop when reaching the end or beginning */
  loop?: boolean;

  /** If true, the stepper will be disabled */
  disabled?: boolean;
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
};

const varsResolver = createVarsResolver<SelectStepperFactory>((_, {}) => {
  return {
    root: {},
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

  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue: initialValue,
    onChange,
  });

  const currentIndex = items.findIndex((item) => item.value === _value);
  const currentItem = currentIndex !== -1 ? items[currentIndex] : null;

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
    // Logic for handling left click
    const nextIndex = findNextValidIndex(currentIndex, -1);
    if (nextIndex !== currentIndex) {
      handleChange(items[nextIndex].value);
    }
  };
  const handleRightClick = () => {
    if (disabled || !canGoNext) {
      return;
    }
    // Logic for handling right click
    const nextIndex = findNextValidIndex(currentIndex, 1);
    if (nextIndex !== currentIndex) {
      handleChange(items[nextIndex].value);
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
    <Box ref={ref} {...getStyles('root')} {...others}>
      <Group onKeyDown={handleKeyDown}>
        <ActionIcon {...getStyles('leftSection')} disabled={disabled || !canGoPrev} onClick={handleLeftClick}>
          {leftIcon}
        </ActionIcon>
        <Text {...getStyles('label')}>{currentItem ? currentItem.label : emptyValue}</Text>
        <ActionIcon {...getStyles('rightSection')} disabled={disabled || !canGoNext} onClick={handleRightClick}>
          {rightIcon}
        </ActionIcon>
      </Group>
    </Box>
  );
});

SelectStepper.classes = classes;
SelectStepper.displayName = 'SelectStepper';
