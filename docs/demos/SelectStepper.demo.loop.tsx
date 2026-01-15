import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  return (
    <SelectStepper 
      data={['React', 'Vue', 'Angular', 'Svelte', 'Solid']} 
      loop 
    />
  );
}
`;

function Demo() {
  return <SelectStepper data={['React', 'Vue', 'Angular', 'Svelte', 'Solid']} loop />;
}

export const loop: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
