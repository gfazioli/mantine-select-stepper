import { useState } from 'react';
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { IconCheck, IconMinus, IconPlus } from '@tabler/icons-react';
import { Badge } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useState } from 'react';
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { IconCheck, IconMinus, IconPlus } from '@tabler/icons-react';
import { Badge } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string | null>('false');

  return (
    <SelectStepper
      viewWidth={200}
      animate={false}
      value={value}
      loop
      label={\`Boolean Stepper: \${value}\`}
      variant="subtle"
      leftIcon={value === 'true' ? <IconCheck size={16} /> : null}
      rightIcon={value === 'false' ? <IconPlus size={16} /> : <IconMinus color="red" size={16} />}
      onChange={setValue}
      data={[
        {
          value: 'false',
          label: 'Malware Protection',
        },
        {
          value: 'true',
          label: 'Malware Protection',
        },
      ]}
      renderOption={(item) => (
        <Badge color={item.value === 'true' ? 'green' : 'red'}>{item.label}</Badge>
      )}
    />
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>('false');

  return (
    <SelectStepper
      viewWidth={200}
      animate={false}
      value={value}
      loop
      label={`Boolean Stepper: ${value}`}
      variant="subtle"
      leftIcon={value === 'true' ? <IconCheck size={16} /> : null}
      rightIcon={value === 'false' ? <IconPlus size={16} /> : <IconMinus color="red" size={16} />}
      onChange={setValue}
      data={[
        {
          value: 'false',
          label: 'Malware Protection',
        },
        {
          value: 'true',
          label: 'Malware Protection',
        },
      ]}
      renderOption={(item) => (
        <Badge color={item.value === 'true' ? 'green' : 'red'}>{item.label}</Badge>
      )}
    />
  );
}

export const booleanStepper: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
