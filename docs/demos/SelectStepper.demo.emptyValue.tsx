import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Text } from '@mantine/core';

function Demo() {
  return (
    <SelectStepper
      data={[]}
      emptyValue={<Text c="dimmed" fs="italic">No options</Text>}
      label="Framework"
      description="No frameworks available"
    />
  );
}
`;

function Demo() {
  return (
    <SelectStepper
      data={[]}
      emptyValue={
        <Text c="dimmed" fs="italic">
          No options
        </Text>
      }
      label="Framework"
      description="No frameworks available"
    />
  );
}

export const emptyValue: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
