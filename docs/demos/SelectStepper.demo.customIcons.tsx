import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  return (
    <SelectStepper 
      data={['React', 'Vue', 'Angular', 'Svelte', 'Solid']} 
      leftIcon={<IconChevronLeft size={16} />} 
      rightIcon={<IconChevronRight size={16} />} 
    />
  );
}
`;

function Demo() {
  return (
    <SelectStepper data={['React', 'Vue', 'Angular', 'Svelte', 'Solid']} leftIcon={<IconChevronLeft size={16} />} rightIcon={<IconChevronRight size={16} />} />
  );
}

export const customIcons: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
