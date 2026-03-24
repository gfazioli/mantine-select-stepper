import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  return (
    <SelectStepper
      data={['Low', 'Medium', 'High', 'Ultra']}
      variant="gradient"
      gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
      label="Quality"
    />
  );
}
`;

function Demo() {
  return (
    <SelectStepper
      data={['Low', 'Medium', 'High', 'Ultra']}
      variant="gradient"
      gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
      label="Quality"
    />
  );
}

export const gradient: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
