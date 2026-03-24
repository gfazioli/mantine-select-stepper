import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { Flex, Group, Stack, TextInput } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { Flex, Group, Stack, TextInput } from '@mantine/core';
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  return (
    <Stack>
      <TextInput placeholder="Server application" label="Name" />

      <Group grow>
        <Flex>
          <SelectStepper
            viewWidth={100}
            leftIcon={<IconMinus />}
            rightIcon={<IconPlus />}
            data={['16GB', '32GB', '64GB']}
            label="Ram"
          />
        </Flex>
        <TextInput label="Location" placeholder="Region" />
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
        <Flex>
          <SelectStepper
            viewWidth={100}
            leftIcon={<IconMinus />}
            rightIcon={<IconPlus />}
            data={['16GB', '32GB', '64GB']}
            label="Ram"
          />
        </Flex>
        <TextInput label="Location" placeholder="Region" />
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
