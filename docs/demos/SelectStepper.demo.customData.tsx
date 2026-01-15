import { useState } from 'react';
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Badge, Code, Group, Stack, type ComboboxItem } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { useState } from 'react';
import { SelectStepper, type ComboboxItem } from '@gfazioli/mantine-select-stepper';
import { Badge, Code, Group, Stack } from '@mantine/core';

interface ComplexItem extends ComboboxItem {
  version?: string;
  color?: string;
}

function Demo() {
  const [value, setValue] = useState<ComplexItem | null>({ 
    value: 'vue', 
    label: 'Vue.js', 
    version: '3.2.37',
    color: 'green'
  });

  const data: ComplexItem[] = [
    { value: 'react', label: 'React', version: '18.2.0', color: 'blue' },
    { value: 'vue', label: 'Vue.js', version: '3.2.37', color: 'green' },
    { value: 'angular', label: 'Angular', version: '13.3.0', color: 'red' },
  ];

  return (
    <Stack>
      <Code block>{JSON.stringify(value, null, 2)}</Code>
      
      <SelectStepper
        data={data}
        value={value ? value.value : null}
        onChange={(_value, option) => setValue(option as ComplexItem)}
        renderOption={(item) => {
          const complexItem = item as ComplexItem;
          return (
            <Group gap="xs">
              <Badge color={complexItem.color || 'gray'}>
                {complexItem.label}
              </Badge>
              <span style={{ fontSize: 11, color: '#888' }}>
                v{complexItem.version}
              </span>
            </Group>
          );
        }}
        viewWidth={280}
      />
    </Stack>
  );
}
`;

interface ComplexItem extends ComboboxItem {
  version?: string;
  color?: string;
}

function Demo() {
  const [value, setValue] = useState<ComplexItem | null>({
    value: 'vue',
    label: 'Vue.js',
    version: '3.2.37',
    color: 'green',
  });

  const data: ComplexItem[] = [
    { value: 'react', label: 'React', version: '18.2.0', color: 'blue' },
    { value: 'vue', label: 'Vue.js', version: '3.2.37', color: 'green' },
    { value: 'angular', label: 'Angular', version: '13.3.0', color: 'red' },
  ];

  return (
    <Stack>
      <Code block>{JSON.stringify(value, null, 2)}</Code>

      <SelectStepper
        data={data}
        value={value ? value.value : null}
        onChange={(_value, option) => setValue(option as ComplexItem)}
        renderOption={(item) => {
          const complexItem = item as ComplexItem;
          return (
            <Group gap="xs">
              <Badge color={complexItem.color || 'gray'}>{complexItem.label}</Badge>
              <span style={{ fontSize: 11, color: '#888' }}>v{complexItem.version}</span>
            </Group>
          );
        }}
        viewWidth={280}
      />
    </Stack>
  );
}

export const customData: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  defaultExpanded: false,
};
