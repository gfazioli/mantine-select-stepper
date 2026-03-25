import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const code = `
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { Stack, Text } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <div>
        <Text size="sm" fw={500}>Responsive viewport width</Text>
        <SelectStepper
          data={['React', 'Vue', 'Angular', 'Svelte']}
          viewWidth={{ base: 120, sm: 180, md: 260 }}
          size={{ base: 'xs', sm: 'sm', md: 'md' }}
          label="Framework"
          description="The viewport and buttons grow with the screen"
        />
      </div>

      <div>
        <Text size="sm" fw={500}>Responsive orientation</Text>
        <SelectStepper
          data={['XS', 'S', 'M', 'L', 'XL']}
          orientation={{ base: 'vertical', sm: 'horizontal' }}
          label="Size"
          description="Vertical on mobile, horizontal on tablet+"
          loop
        />
      </div>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <div>
        <Text size="sm" fw={500}>
          Responsive viewport width
        </Text>
        <SelectStepper
          data={['React', 'Vue', 'Angular', 'Svelte']}
          viewWidth={{ base: 120, sm: 180, md: 260 }}
          size={{ base: 'xs', sm: 'sm', md: 'md' }}
          label="Framework"
          description="The viewport and buttons grow with the screen"
        />
      </div>

      <div>
        <Text size="sm" fw={500}>
          Responsive orientation
        </Text>
        <SelectStepper
          data={['XS', 'S', 'M', 'L', 'XL']}
          orientation={{ base: 'vertical', sm: 'horizontal' }}
          label="Size"
          description="Vertical on mobile, horizontal on tablet+"
          loop
        />
      </div>
    </Stack>
  );
}

export const responsive: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
