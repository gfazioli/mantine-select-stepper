import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Group, Stack, TextInput } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { Group, Select, Stack, TextInput } from '@mantine/core';
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  return (
    <Stack>
      <SelectStepper 
        data={['React', 'Vue', 'Angular']} 
        withBorder 
        placeholder="Select framework"
      />
      <TextInput placeholder="Your name" label="Name" />
      <Select 
        data={['React', 'Vue', 'Angular']} 
        placeholder="Select your favorite framework"
        label="Favorite framework"
      />

      <Group grow>
        <SelectStepper 
          data={['Junior', 'Mid', 'Senior']} 
          withBorder 
          placeholder="Experience level"
        />
        <TextInput placeholder="Years" label="Years of experience" />
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <TextInput placeholder="Server application" label="Name" />

      <Group grow>
        <SelectStepper data={['Junior', 'Mid', 'Senior']} />
        <TextInput placeholder="Years" />
      </Group>
    </Stack>
  );
}

export const inForm: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
