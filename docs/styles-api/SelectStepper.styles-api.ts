import { SelectStepperFactory } from '@gfazioli/mantine-select-stepper';
import type { StylesApiData } from '../components/styles-api.types';

export const SelectStepperStylesApi: StylesApiData<SelectStepperFactory> = {
  selectors: {
    root: 'Root element',
    leftSection: 'Left action icon wrapper (decrement button)',
    rightSection: 'Right action icon wrapper (increment button)',
    view: 'Viewport container that shows the current value',
    scrollArea: 'Scrollable area containing all labels',
    label: 'Individual label element for each item',
  },

  vars: {
    root: {
      '--select-stepper-view-width': 'Controls the width of the view area',
      '--select-stepper-animation-duration': 'Controls the duration of scroll animations',
      '--select-stepper-animation-timing-function':
        'Controls the timing function for scroll animations',
      '--select-stepper-radius': 'Controls the border radius',
    },
  },

  modifiers: [
    {
      modifier: 'data-with-border',
      selector: 'root',
      condition: '`withBorder` prop is set to true',
    },
    {
      modifier: 'data-animate',
      selector: 'scrollArea',
      condition: 'Animation is enabled and transition is active',
    },
    {
      modifier: 'data-active',
      selector: 'label',
      condition: 'Label represents the currently selected value',
    },
  ],
};
