import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <SelectStepper data={['React', 'Vue', 'Angular']} size="xs" label="Extra small" />
      <SelectStepper data={['React', 'Vue', 'Angular']} size="sm" label="Small" />
      <SelectStepper data={['React', 'Vue', 'Angular']} size="md" label="Medium" />
      <SelectStepper data={['React', 'Vue', 'Angular']} size="lg" label="Large" />
      <SelectStepper data={['React', 'Vue', 'Angular']} size="xl" label="Extra large" />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <SelectStepper data={['React', 'Vue', 'Angular']} size="xs" label="Extra small" />
      <SelectStepper data={['React', 'Vue', 'Angular']} size="sm" label="Small" />
      <SelectStepper data={['React', 'Vue', 'Angular']} size="md" label="Medium" />
      <SelectStepper data={['React', 'Vue', 'Angular']} size="lg" label="Large" />
      <SelectStepper data={['React', 'Vue', 'Angular']} size="xl" label="Extra large" />
    </Stack>
  );
}

export const sizes: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
