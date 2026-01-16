import { SelectStepperFactory } from '@gfazioli/mantine-select-stepper';
import type { StylesApiData } from '../components/styles-api.types';

export const SelectStepperStylesApi: StylesApiData<SelectStepperFactory> = {
  selectors: {
    root: 'Root element',
    wrapper: 'Wrapper element containing the stepper controls',
    leftSection: 'Left action icon wrapper (decrement button)',
    rightSection: 'Right action icon wrapper (increment button)',
    view: 'Viewport container that shows the current value',
    scrollArea: 'Scrollable area containing all labels',
    content: 'Individual label element for each item',
    label: 'Label element',
    description: 'Description displayed below the label',
    error: 'Error message displayed below the label',
  },

  vars: {
    root: {
      '--select-stepper-view-width': 'Controls the width of the view area',
      '--select-stepper-animation-duration': 'Controls the duration of scroll animations',
      '--select-stepper-animation-timing-function':
        'Controls the timing function for scroll animations',
      '--select-stepper-radius': 'Controls the border radius',
    },
    wrapper: {
      '--select-stepper-margin-top': 'Controls the top margin of the wrapper',
      '--select-stepper-margin-bottom': 'Controls the bottom margin of the wrapper',
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
