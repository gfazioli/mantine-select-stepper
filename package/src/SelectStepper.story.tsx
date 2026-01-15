import React from 'react';
import { SelectStepper } from './SelectStepper';

export default {
  title: 'Components/SelectStepper',
  args: {},
  argTypes: {},
};

export function Usage() {
  return <SelectStepper data={['React', 'Vue', 'Angular']} />;
}
