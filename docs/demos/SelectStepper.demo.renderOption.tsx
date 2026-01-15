import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Badge, Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Badge, Group } from '@mantine/core';

function Demo() {
  return (
    <SelectStepper
      data={['React', 'Vue', 'Angular', 'Svelte', 'Solid']}
      renderOption={(item) => (
        <Group gap="xs">
          <Badge variant="light">{item.label}</Badge>
          <span style={{ fontSize: 12, color: '#888' }}>({item.value.length} chars)</span>
        </Group>
      )}
    />
  );
}
`;

function Demo() {
  return (
    <SelectStepper
      data={['React', 'Vue', 'Angular', 'Svelte', 'Solid']}
      renderOption={(item) => (
        <Group gap="xs">
          <Badge variant="light">{item.label}</Badge>
          <span style={{ fontSize: 12, color: '#888' }}>({item.value.length} chars)</span>
        </Group>
      )}
    />
  );
}

export const renderOption: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
