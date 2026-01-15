import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  return (
    <SelectStepper 
      data={['React', 'Vue', 'Angular']} 
      defaultValue="Vue"
      disabled 
    />
  );
}
`;

function Demo() {
  return <SelectStepper data={['React', 'Vue', 'Angular']} defaultValue="Vue" disabled />;
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
