# Mantine SelectStepper: A Modern Alternative to Traditional Dropdowns

## Navigate Through Options with Style and Simplicity

In the world of modern web development, choosing the right UI component can make or break the user experience. Today, we're excited to introduce you to **Mantine SelectStepper**, a React component that revolutionizes how users interact with predefined option lists. Built on top of the powerful [Mantine UI](https://mantine.dev/) library, this component offers an elegant, intuitive alternative to traditional dropdown selects.

## What is Mantine SelectStepper?

The [Mantine SelectStepper](https://gfazioli.github.io/mantine-select-stepper/) is a Mantine-based React component that allows users to navigate through a list of options using increment and decrement buttons. Instead of clicking to open a dropdown menu, users can simply click left or right arrows to cycle through predefined values. This approach is particularly effective for:

- Configuration panels with sequential options
- Forms where users need to select from an ordered list
- Mobile interfaces where dropdowns can be cumbersome
- Applications requiring keyboard-friendly navigation

## Getting Started: Incredibly Simple

One of the most impressive aspects of SelectStepper is its simplicity. Getting started requires just a few lines of code:

```bash
yarn add @gfazioli/mantine-select-stepper
# or
npm install @gfazioli/mantine-select-stepper
```

After installation, import the styles at the root of your application:

```tsx
import '@gfazioli/mantine-select-stepper/styles.css';
```

And you're ready to use it:

```tsx
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  return <SelectStepper data={['React', 'Vue', 'Angular']} />;
}
```

That's it! With just three lines of code, you have a fully functional, beautifully styled stepper component.

## Key Features That Set It Apart

### 1. **Infinite Loop Navigation**

Enable seamless cycling through options with the `loop` prop. When users reach the end of the list, they automatically wrap back to the beginning—perfect for circular selections like months, days, or priority levels.

```tsx
<SelectStepper data={['January', 'February', 'March']} loop />
```

### 2. **Controlled Component Pattern**

SelectStepper supports both controlled and uncontrolled modes, giving you complete flexibility in state management:

```tsx
import { useState } from 'react';
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  const [value, setValue] = useState('react');

  return (
    <SelectStepper
      data={['React', 'Vue', 'Angular']}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
}
```

### 3. **Disabled Items Support**

Need to restrict certain options? Simply mark them as disabled in your data array:

```tsx
const data = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue', disabled: true },
  { value: 'angular', label: 'Angular' },
];

<SelectStepper data={data} />
```

The stepper will intelligently skip disabled items during navigation.

### 4. **Custom Icons**

Personalize your stepper with custom icons using the `leftIcon` and `rightIcon` props:

```tsx
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

<SelectStepper
  data={['Small', 'Medium', 'Large']}
  leftIcon={<IconChevronLeft />}
  rightIcon={<IconChevronRight />}
/>
```

### 5. **Custom Rendering**

Take full control over how options are displayed with the `renderOption` prop:

```tsx
<SelectStepper
  data={frameworks}
  renderOption={(item) => (
    <Group gap="xs">
      <Badge color={item.color}>{item.label}</Badge>
      <span>v{item.version}</span>
    </Group>
  )}
/>
```

### 6. **Extended Data Properties**

Need to store additional metadata with your options? Simply extend the `ComboboxItem` interface:

```tsx
interface ComplexItem extends ComboboxItem {
  version?: string;
  color?: string;
}

const data: ComplexItem[] = [
  { value: 'react', label: 'React', version: '18.2.0', color: 'blue' },
  { value: 'vue', label: 'Vue.js', version: '3.2.37', color: 'green' },
];

function Demo() {
  const [value, setValue] = useState<ComplexItem | null>(null);

  return (
    <SelectStepper
      data={data}
      value={value?.value}
      onChange={(_val, option) => setValue(option as ComplexItem)}
    />
  );
}
```

The `onChange` handler provides the complete option object with all your custom properties.

### 7. **Smooth Animations**

Control animation behavior with dedicated props:

```tsx
<SelectStepper
  data={['Option 1', 'Option 2', 'Option 3']}
  animate={true}
  animationDuration={300}
  animationTimingFunction="ease-in-out"
/>
```

Or disable animations entirely for a snappier feel.

### 8. **Keyboard Navigation**

Built-in keyboard support makes the component accessible and efficient:

- `ArrowLeft` or `ArrowDown` - Move to previous item
- `ArrowRight` or `ArrowUp` - Move to next item

### 9. **Mantine Styles API Integration**

Fully integrated with Mantine's Styles API, SelectStepper allows you to customize every inner element:

```tsx
<SelectStepper
  data={['React', 'Vue', 'Angular']}
  classNames={{
    root: 'custom-root',
    view: 'custom-view',
    action: 'custom-action',
  }}
/>
```

### 10. **Perfect for Forms**

SelectStepper integrates seamlessly with other Mantine form components:

```tsx
<Stack>
  <TextInput label="Name" placeholder="Your name" />
  
  <SelectStepper 
    data={['React', 'Vue', 'Angular']} 
    withBorder 
    placeholder="Select framework"
  />
  
  <Group grow>
    <SelectStepper 
      data={['Junior', 'Mid', 'Senior']} 
      withBorder 
      placeholder="Experience level"
    />
    <TextInput label="Years of experience" />
  </Group>
</Stack>
```

## Creative Use Cases

### Boolean Stepper Pattern

One clever pattern is using SelectStepper as an enhanced boolean toggle:

```tsx
const [enabled, setEnabled] = useState(false);

<SelectStepper
  data={[
    { value: 'false', label: 'Disabled' },
    { value: 'true', label: 'Enabled' },
  ]}
  value={enabled ? 'true' : 'false'}
  onChange={(val) => setEnabled(val === 'true')}
  leftIcon={enabled ? <IconToggleRight /> : <IconToggleLeft />}
  renderOption={(item) => (
    <Badge color={item.value === 'true' ? 'green' : 'red'}>
      {item.label}
    </Badge>
  )}
/>
```

## Why Choose SelectStepper?

1. **Simplicity**: Minimal setup, maximum functionality
2. **TypeScript**: Full type safety with TypeScript support
3. **Accessibility**: Built-in keyboard navigation
4. **Customization**: Extensive styling options through Mantine's Styles API
5. **Performance**: Smooth animations and optimized rendering
6. **Flexibility**: Works in controlled and uncontrolled modes
7. **Modern**: Built on React 18/19 with modern best practices

## Part of the Mantine Extensions Ecosystem

SelectStepper is part of a growing collection of high-quality Mantine components. If you're looking for more extensions to enhance your [Mantine UI](https://mantine.dev/) applications, check out [Mantine Extensions](https://mantine-extensions.vercel.app/) for additional components that integrate seamlessly with your existing Mantine setup.

## Documentation and Demos

For comprehensive documentation, live demos, and interactive examples, visit the [official SelectStepper documentation](https://gfazioli.github.io/mantine-select-stepper/). The documentation includes:

- Interactive configurator to experiment with all props
- Complete API reference
- Real-world usage examples
- Styles API documentation
- TypeScript type definitions

## Conclusion

Mantine SelectStepper proves that sometimes the best solutions are the simplest ones. By rethinking how users interact with option lists, it provides a refreshing alternative to traditional dropdowns that's both elegant and highly functional. Whether you're building a configuration panel, a multi-step form, or any interface requiring option selection, SelectStepper offers the perfect blend of simplicity, flexibility, and user experience.

Give it a try in your next project, and experience how a thoughtfully designed component can elevate your user interface!

---

**Resources:**
- 📦 [npm package](https://www.npmjs.com/package/@gfazioli/mantine-select-stepper)
- 📖 [Documentation & Demos](https://gfazioli.github.io/mantine-select-stepper/)
- 🐛 [GitHub Repository](https://github.com/gfazioli/mantine-select-stepper)
- 🎨 [Mantine UI](https://mantine.dev/)
- 🔌 [More Mantine Extensions](https://mantine-extensions.vercel.app/)
