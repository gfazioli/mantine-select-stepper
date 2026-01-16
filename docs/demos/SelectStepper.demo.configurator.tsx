import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo(props: any) {
  return <SelectStepper{{props}}
    data={['React', 'Angular', 'Vue', 'Svelte', 'Ember']} />;
}
`;

function Demo(props: any) {
  return <SelectStepper data={['React', 'Angular', 'Vue', 'Svelte', 'Ember']} {...props} />;
}

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: [
    {
      type: 'string',
      prop: 'label',
      initialValue: 'Select framework',
      libraryValue: '',
    },
    {
      type: 'string',
      prop: 'description',
      initialValue: 'This is a description',
      libraryValue: '',
    },
    {
      type: 'string',
      prop: 'error',
      initialValue: '',
      libraryValue: '',
    },
    {
      type: 'boolean',
      prop: 'loop',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'boolean',
      prop: 'disabled',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'boolean',
      prop: 'withBorder',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'boolean',
      prop: 'animate',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'number',
      prop: 'animationDuration',
      initialValue: 300,
      libraryValue: 300,
      min: 100,
      max: 1000,
      step: 50,
    },
    {
      type: 'select',
      prop: 'animationTimingFunction',
      initialValue: 'ease-in-out',
      libraryValue: 'ease-in-out',
      data: [
        { value: 'linear', label: 'Linear' },
        { value: 'ease', label: 'Ease' },
        { value: 'ease-in', label: 'Ease In' },
        { value: 'ease-out', label: 'Ease Out' },
        { value: 'ease-in-out', label: 'Ease In Out' },
      ],
    },
    {
      type: 'number',
      prop: 'viewWidth',
      initialValue: 200,
      libraryValue: 200,
      min: 100,
      max: 400,
      step: 20,
    },
    {
      type: 'size',
      prop: 'radius',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
  ],
};
