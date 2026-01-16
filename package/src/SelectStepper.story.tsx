import React, { useState } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Badge, Code, Group, Select, Stack, TextInput, type ComboboxItem } from '@mantine/core';
import { SelectStepper } from './SelectStepper';

export default {
  title: 'Components/SelectStepper',
  component: SelectStepper,
  args: {
    data: ['React', 'Vue', 'Angular', 'Svelte', 'Solid'],
    defaultValue: 'React',
    loop: false,
    disabled: false,
    viewWidth: 200,
    animate: true,
    animationDuration: 300,
    animationTimingFunction: 'ease-in-out',
    emptyValue: 'No selection',
    withBorder: true,
    radius: undefined,
    label: 'Select your favorite framework',
    description: 'Use the stepper to choose one of the options',
    error: '',
    required: false,
    withAsterisk: false,
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of items to display',
    },
    value: {
      control: 'text',
      description: 'Controlled value',
    },
    defaultValue: {
      control: 'text',
      description: 'Default value for uncontrolled component',
    },
    emptyValue: {
      control: 'text',
      description: 'Value to display when nothing is selected',
    },
    loop: {
      control: 'boolean',
      description: 'Enable looping at the beginning/end',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the stepper',
    },
    withBorder: {
      control: 'boolean',
      description: 'Add border to the stepper',
    },
    radius: {
      control: { type: 'range', min: 0, max: 256, step: 1 },
      description: 'Border radius of the stepper',
    },
    viewWidth: {
      control: { type: 'range', min: 16, max: 1024, step: 10 },
      description: 'Width of the viewport',
    },
    animate: {
      control: 'boolean',
      description: 'Enable or disable scroll animation',
    },
    animationDuration: {
      control: { type: 'range', min: 0, max: 2000, step: 50 },
      description: 'Animation duration in milliseconds',
    },
    animationTimingFunction: {
      control: 'select',
      options: [
        'linear',
        'ease',
        'ease-in',
        'ease-out',
        'ease-in-out',
        'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      ],
      description: 'Animation timing function',
    },
    label: {
      control: 'text',
      description: 'Label for the stepper',
    },
    description: {
      control: 'text',
      description: 'Description for the stepper',
    },
    error: {
      control: 'text',
      description: 'Error message for the stepper',
    },
    required: {
      control: 'boolean',
      description: 'Marks the stepper as required',
    },
    withAsterisk: {
      control: 'boolean',
      description: 'Adds an asterisk to the label',
    },
    // onChange: {
    //   action: 'changed',
    //   description: 'Callback when value changes',
    // },
  },
};

export function Usage() {
  return <SelectStepper data={['React', 'Vue', 'Angular']} />;
}

export function InputWrapper() {
  return (
    <SelectStepper
      label="Select your favorite framework"
      description="Use the stepper to choose one of the options"
      inputWrapperOrder={['description', 'input', 'label', 'error']}
      data={['React', 'Vue', 'Angular']}
    />
  );
}

export function Uncontrolled() {
  const [value, setValue] = useState<string | null>('Vue');

  return (
    <Stack>
      <div>Selected value: {value}</div>
      <SelectStepper data={['React', 'Vue', 'Angular']} defaultValue="Vue" onChange={setValue} />
    </Stack>
  );
}

export function Controlled() {
  const [value, setValue] = useState<string | null>('Vue');

  return <SelectStepper data={['React', 'Vue', 'Angular']} value={value} onChange={setValue} />;
}

export function ControlledObject() {
  const [value, setValue] = useState<ComboboxItem | null>({
    value: 'vue',
    label: 'Vue.js Framework',
  });

  const data = [
    { value: 'react', label: 'React JS' },
    { value: 'vue', label: 'Vue.js Framework' },
    { value: 'angular', label: 'Angular Platform' },
  ];

  return (
    <SelectStepper
      data={data}
      value={value ? value.value : null}
      onChange={(_value, option) => setValue(option)}
    />
  );
}

interface ComplexItem extends ComboboxItem {
  version?: string;
}

export function ControlledObjectComplex() {
  const [value, setValue] = useState<ComplexItem | null>({
    value: 'vue',
    label: 'Vue.js Framework',
    version: '3.2.37',
  });

  const data = [
    { value: 'react', label: 'React JS', version: '18.2.0' },
    { value: 'vue', label: 'Vue.js Framework', version: '3.2.37' },
    { value: 'angular', label: 'Angular Platform', version: '13.3.0' },
  ];

  return (
    <Stack>
      <div>
        Raw value:<Code>{value ? JSON.stringify(value) : 'None'}</Code>
      </div>
      <div>Selected value: {value ? value.label : 'None'}</div>
      <div>Selected label: {value ? value.label : 'None'}</div>
      <div>Extra data Version: {value && 'version' in value ? value.version : 'None'}</div>
      <SelectStepper
        data={data}
        value={value ? value.value : null}
        onChange={(_value, option) => setValue(option)}
      />
    </Stack>
  );
}

export function ControlledComplex() {
  const [value, setValue] = useState<string | null>('vue');

  const data = [
    { value: 'react', label: 'React JS' },
    { value: 'vue', label: 'Vue.js Framework' },
    { value: 'angular', label: 'Angular Platform' },
  ];

  return (
    <Stack>
      <div>Selected value: {value}</div>
      <SelectStepper data={data} value={value} onChange={setValue} />
    </Stack>
  );
}

export function WithProps(props: any) {
  return <SelectStepper {...props} />;
}

export function WithCustomIcons() {
  return (
    <SelectStepper
      data={['React', 'Vue', 'Angular', 'Svelte', 'Solid']}
      leftIcon={<IconChevronLeft size={16} />}
      rightIcon={<IconChevronRight size={16} />}
    />
  );
}

export function WithLoop() {
  return <SelectStepper data={['React', 'Vue', 'Angular']} loop />;
}

export function WithSectionProps() {
  return (
    <SelectStepper
      data={['React', 'Vue', 'Angular']}
      leftSectionProps={{
        variant: 'light',
      }}
    />
  );
}

export function WithDisabledItems() {
  return (
    <SelectStepper
      data={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue', disabled: true },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte', disabled: true },
        { value: 'solid', label: 'Solid' },
      ]}
    />
  );
}

export function WithCustomAnimation() {
  return (
    <SelectStepper
      data={['Fast', 'Normal', 'Slow', 'Bouncy']}
      animationDuration={800}
      animationTimingFunction="cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    />
  );
}

export function WithoutAnimation() {
  return <SelectStepper data={['Instant', 'Switch', 'No Animation']} animate={false} />;
}

export function RenderOption() {
  return (
    <SelectStepper
      data={['Instant', 'Switch', 'No Animation']}
      renderOption={(item) => (
        <Group>
          <span>{item.label}</span>
          <span style={{ fontSize: 12, color: '#888' }}>({item.value.length} chars)</span>
        </Group>
      )}
    />
  );
}

export function RenderOptionBadge() {
  return (
    <SelectStepper
      data={['Instant', 'Switch', 'No Animation']}
      renderOption={(item) => <Badge>{item.label}</Badge>}
    />
  );
}

export function WithCustomWidth() {
  return <SelectStepper data={['Short', 'Medium Width', 'Very Long Item Name']} viewWidth={300} />;
}

export function WithOnChange() {
  return (
    <SelectStepper
      data={['Short', 'Medium Width', 'Very Long Item Name']}
      viewWidth={300}
      onChange={(value) => {
        // eslint-disable-next-line no-console
        console.log('Selected:', value);
      }}
    />
  );
}

export function InForm(props: any) {
  return (
    <Stack>
      <SelectStepper data={['React', 'Vue', 'Angular']} {...props} />
      <TextInput placeholder="Your name" />
      <Select data={['React', 'Vue', 'Angular']} placeholder="Select your favorite framework" />

      <Group>
        <Select data={['React', 'Vue', 'Angular']} placeholder="Select your favorite framework" />
        <TextInput placeholder="Your name" />
      </Group>

      <Group>
        <SelectStepper data={['React', 'Vue', 'Angular']} {...props} />
        <Select
          data={['React', 'Vue', 'Angular']}
          placeholder="Select your favorite framework"
          label="Select your favorite framework"
        />
        <TextInput placeholder="Your name" label="Your name" />
      </Group>
      <Group>
        <SelectStepper data={['React', 'Vue', 'Angular']} {...props} description="Choose wisely" />
        <Select
          data={['React', 'Vue', 'Angular']}
          placeholder="Select your favorite framework"
          label="Select your favorite framework"
          description="Choose wisely"
        />
        <TextInput placeholder="Your name" label="Your name" description="Enter your full name" />
      </Group>
    </Stack>
  );
}
