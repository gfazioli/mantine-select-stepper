import { useState } from 'react';
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useState } from 'react';
import { Button, Group, Stack } from '@mantine/core';
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  const [value, { open, close, toggle }] = useDisclosure(false);

  return (
    <Stack align="center">
      <SelectStepper value={value} size="xl" />
      <Group>
        <Button onClick={open} variant="light" color="green">
          Turn On
        </Button>
        <Button onClick={close} variant="light" color="red">
          Turn Off
        </Button>
        <Button onClick={toggle} variant="light">
          Toggle
        </Button>
      </Group>
    </Stack>
  );
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
