import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { MantineDemo } from '@mantinex/demo';
import { SelectStepperStylesApi } from '../styles-api/SelectStepper.styles-api';

const code = `
import { SelectStepper } from "@gfazioli/mantine-json-tree";
import { data } from './data';

function Demo() {
  return (
    <SelectStepper{{props}} variant="3d" label="Example Label" size="xl" />
  );
}
`;

function Demo(props: any) {
  return <SelectStepper {...props} variant="3d" label="Example Label" size="xl" />;
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: SelectStepperStylesApi,
  component: Demo,
  code,
  centered: true,
};
