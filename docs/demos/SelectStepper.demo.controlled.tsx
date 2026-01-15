import { useState } from 'react';
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useState } from 'react';
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  const [value, setValue] = useState<string | null>('Vue');

  return <SelectStepper data={['React', 'Vue', 'Angular']} value={value} onChange={setValue} />;
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>('Vue');

  return <SelectStepper data={['React', 'Vue', 'Angular']} value={value} onChange={setValue} />;
}

export const controlled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
