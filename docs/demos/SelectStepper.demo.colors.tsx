import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group } from '@mantine/core';
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  return (
    <Group>
      <SelectStepper color="red" />
      <SelectStepper color="green" />
      <SelectStepper color="blue" />
      <SelectStepper color="yellow" />
      <SelectStepper color="orange" />
      <SelectStepper color="cyan" />
      <SelectStepper color="pink" />
      <SelectStepper color="violet" />
    </Group>
  );
}
`;

export const colors: MantineDemo = {
  type: 'code',
  component: () => (
    <Group>
      <SelectStepper color="red" />
      <SelectStepper color="green" />
      <SelectStepper color="blue" />
      <SelectStepper color="yellow" />
      <SelectStepper color="orange" />
      <SelectStepper color="cyan" />
      <SelectStepper color="pink" />
      <SelectStepper color="violet" />
    </Group>
  ),
  code,
  defaultExpanded: false,
};
