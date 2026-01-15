import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      {/* Custom animation duration and timing */}
      <SelectStepper 
        data={['Fast', 'Normal', 'Slow', 'Bouncy']} 
        animationDuration={800} 
        animationTimingFunction="cubic-bezier(0.68, -0.55, 0.265, 1.55)" 
      />
      
      {/* No animation */}
      <SelectStepper 
        data={['Instant', 'Switch', 'No Animation']} 
        animate={false} 
      />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <SelectStepper data={['Fast', 'Normal', 'Slow', 'Bouncy']} animationDuration={800} animationTimingFunction="cubic-bezier(0.68, -0.55, 0.265, 1.55)" />
      <SelectStepper data={['Instant', 'Switch', 'No Animation']} animate={false} />
    </Stack>
  );
}

export const animation: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
