import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  return (
    <SelectStepper 
      data={['Short', 'Medium Width', 'Very Long Item Name']} 
      viewWidth={300} 
    />
  );
}
`;

function Demo() {
  return <SelectStepper data={['Short', 'Medium Width', 'Very Long Item Name']} viewWidth={300} />;
}

export const customWidth: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
