import { useRef } from 'react';
import { SelectStepper, type SelectStepperRef } from '@gfazioli/mantine-select-stepper';
import { Button, Group, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useRef } from 'react';
import { SelectStepper, type SelectStepperRef } from '@gfazioli/mantine-select-stepper';
import { Button, Group, Stack } from '@mantine/core';

function Demo() {
  const controlRef = useRef<SelectStepperRef>(null);

  return (
    <Stack>
      <SelectStepper
        controlRef={controlRef}
        data={['React', 'Vue', 'Angular', 'Svelte', 'Ember']}
        label="Framework"
      />
      <Group>
        <Button size="xs" variant="light" onClick={() => controlRef.current?.prev()}>
          Prev
        </Button>
        <Button size="xs" variant="light" onClick={() => controlRef.current?.next()}>
          Next
        </Button>
        <Button size="xs" variant="light" onClick={() => controlRef.current?.navigateTo('Svelte')}>
          Go to Svelte
        </Button>
        <Button size="xs" variant="subtle" onClick={() => controlRef.current?.reset()}>
          Reset
        </Button>
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  const controlRef = useRef<SelectStepperRef>(null);

  return (
    <Stack>
      <SelectStepper
        controlRef={controlRef}
        data={['React', 'Vue', 'Angular', 'Svelte', 'Ember']}
        label="Framework"
      />
      <Group>
        <Button size="xs" variant="light" onClick={() => controlRef.current?.prev()}>
          Prev
        </Button>
        <Button size="xs" variant="light" onClick={() => controlRef.current?.next()}>
          Next
        </Button>
        <Button size="xs" variant="light" onClick={() => controlRef.current?.navigateTo('Svelte')}>
          Go to Svelte
        </Button>
        <Button size="xs" variant="subtle" onClick={() => controlRef.current?.reset()}>
          Reset
        </Button>
      </Group>
    </Stack>
  );
}

export const imperative: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
