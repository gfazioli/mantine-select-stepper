import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <SelectStepper
        data={['XS', 'S', 'M', 'L', 'XL']}
        orientation="vertical"
        viewWidth={36}
        label="Size"
        loop
      />
      <SelectStepper
        data={['50%', '75%', '100%', '125%', '150%']}
        orientation="vertical"
        viewWidth={36}
        label="Zoom"
      />
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <SelectStepper
        data={['XS', 'S', 'M', 'L', 'XL']}
        orientation="vertical"
        viewWidth={36}
        label="Size"
        loop
      />
      <SelectStepper
        data={['50%', '75%', '100%', '125%', '150%']}
        orientation="vertical"
        viewWidth={36}
        label="Zoom"
      />
    </Group>
  );
}

export const vertical: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
