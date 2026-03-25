import React from 'react';
import {
  filterProps,
  getBaseValue,
  getSortedBreakpoints,
  InlineStyles,
  keys,
  MantineBreakpoint,
  MantineSize,
  useMantineTheme,
  type StyleProp,
} from '@mantine/core';

function toCssValue(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  return typeof value === 'number' ? `${value}px` : value;
}

// ActionIcon size values from Mantine 8.x ActionIcon.module.css
// Cannot use var(--ai-size-sm) because those vars are scoped to ActionIcon's own element
const AI_SIZE_VALUES: Record<string, string> = {
  xs: '18px',
  sm: '22px',
  md: '28px',
  lg: '34px',
  xl: '44px',
};

function toAiSize(value: MantineSize | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  return AI_SIZE_VALUES[value] ?? AI_SIZE_VALUES.sm;
}

interface SelectStepperMediaVariablesProps {
  viewWidth?: StyleProp<React.CSSProperties['width']>;
  viewHeight?: StyleProp<React.CSSProperties['height']>;
  size?: StyleProp<MantineSize>;
  selector: string;
}

export function SelectStepperMediaVariables({
  viewWidth,
  viewHeight,
  size,
  selector,
}: SelectStepperMediaVariablesProps) {
  const theme = useMantineTheme();

  const baseStyles: Record<string, string | undefined> = filterProps({
    '--select-stepper-view-width': toCssValue(getBaseValue(viewWidth)),
    '--select-stepper-view-height': toCssValue(getBaseValue(viewHeight)),
    '--select-stepper-action-size': toAiSize(getBaseValue(size) as MantineSize | undefined),
  });

  const queries = keys(theme.breakpoints).reduce<Record<string, Record<string, string>>>(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }

      if (typeof viewWidth === 'object' && viewWidth[breakpoint] !== undefined) {
        acc[breakpoint]['--select-stepper-view-width'] = toCssValue(viewWidth[breakpoint])!;
      }

      if (typeof viewHeight === 'object' && viewHeight[breakpoint] !== undefined) {
        acc[breakpoint]['--select-stepper-view-height'] = toCssValue(viewHeight[breakpoint])!;
      }

      if (typeof size === 'object' && size[breakpoint] !== undefined) {
        acc[breakpoint]['--select-stepper-action-size'] = toAiSize(
          size[breakpoint] as MantineSize
        )!;
      }

      return acc;
    },
    {}
  );

  const sortedBreakpoints = getSortedBreakpoints(keys(queries), theme.breakpoints).filter(
    (breakpoint) => keys(queries[breakpoint.value]).length > 0
  );

  const media = sortedBreakpoints.map((breakpoint) => ({
    query: `(min-width: ${theme.breakpoints[breakpoint.value as MantineBreakpoint]})`,
    styles: queries[breakpoint.value],
  }));

  return <InlineStyles styles={baseStyles} media={media} selector={selector} />;
}
