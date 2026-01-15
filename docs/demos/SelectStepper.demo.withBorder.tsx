import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      {/* With border */}
      <SelectStepper 
        data={['React', 'Vue', 'Angular']} 
        withBorder 
      />
      
      {/* Without border (default) */}
      <SelectStepper 
        data={['React', 'Vue', 'Angular']} 
        withBorder={false} 
      />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <SelectStepper data={['React', 'Vue', 'Angular']} withBorder />
      <SelectStepper data={['React', 'Vue', 'Angular']} withBorder={false} />
    </Stack>
  );
}

export const withBorder: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
