import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  return (
    <SelectStepper
      data={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue', disabled: true },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte', disabled: true },
        { value: 'solid', label: 'Solid' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <SelectStepper
      data={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue', disabled: true },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte', disabled: true },
        { value: 'solid', label: 'Solid' },
      ]}
    />
  );
}

export const disabledItems: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
