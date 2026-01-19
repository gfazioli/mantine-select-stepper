import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { IconMinus, IconPlus } from '@tabler/icons-react';

function Demo() {
  return (
    <SelectStepper
      data={['16GB', '32GB', '64GB', '128GB', '256GB']}
      leftIcon={<IconMinus size={16} />}
      rightIcon={<IconPlus size={16} />}
    />
  );
}
`;

function Demo() {
  return (
    <SelectStepper
      data={['16GB', '32GB', '64GB', '128GB', '256GB']}
      leftIcon={<IconMinus size={16} />}
      rightIcon={<IconPlus size={16} />}
    />
  );
}

export const customIcons: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
