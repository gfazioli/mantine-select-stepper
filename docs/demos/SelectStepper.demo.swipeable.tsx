import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  return (
    <SelectStepper
      data={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']}
      swipeable
      swipeThreshold={30}
      loop
      label="Day of the week"
      description="Swipe left/right or use buttons"
    />
  );
}
`;

function Demo() {
  return (
    <SelectStepper
      data={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']}
      swipeable
      swipeThreshold={30}
      loop
      label="Day of the week"
      description="Swipe left/right or use buttons"
    />
  );
}

export const swipeable: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
