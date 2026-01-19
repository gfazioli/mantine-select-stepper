# SelectStepper — A Lightweight Sequential Select for Mantine

A simple, keyboard-friendly stepper-style select that makes choosing from small, ordered lists effortless.

You can find this component and its demo at: https://gfazioli.github.io/mantine-select-stepper/

Also check out other extensions at the Mantine Extensions gallery: https://mantine-extensions.vercel.app/
This component is built for Mantine UI: https://mantine.dev/

## Why SelectStepper

SelectStepper offers a compact, accessible alternative to dropdowns when the set of choices is small and has a natural order. It shines when you want a clear, prominent current value and quick keyboard or button navigation. The component is easy to use, lightweight, and integrates smoothly with Mantine styles and form flows.

## Installation

Install the package and import styles at the root of your app:

```bash
yarn add @gfazioli/mantine-select-stepper
# or
npm install @gfazioli/mantine-select-stepper
```

Then import the CSS once:

```tsx
import '@gfazioli/mantine-select-stepper/styles.css';
```

You can also import the `styles.layer.css` file inside a CSS layer: `@layer mantine-select-stepper`.

## Quick usage

```tsx
import { useState } from 'react';
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

const data = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export function Example() {
  const [value, setValue] = useState<string | null>(data[0].value);

  return (
    <SelectStepper
      data={data}
      value={value}
      onChange={(val) => setValue(val)}
    />
  );
}
```

Simplicity: only `data`, `value`, and `onChange` are required for a controlled component.

## Controlled mode & full option object

`onChange` receives two arguments: the selected `value` and the full `option` object. This makes it trivial to keep richer state (for example, an object with metadata):

```tsx
<SelectStepper
  data={data}
  value={value}
  onChange={(val, option) => {
    // val is string, option is the full item object
    // store the full option in state if needed
  }}
/>
```

## Key features (from the docs)

- Loop navigation with `loop` — enable infinite wrap-around.
- Skip disabled items by marking entries as `disabled`.
- Global `disabled` prop to disable the entire control.
- `leftIcon` and `rightIcon` props for custom icons or dynamic icon states.
- `viewWidth` to adjust the visible label area.
- `withBorder` to toggle a border around the control.
- Animation control via `animate`, `animationDuration`, and `animationTimingFunction`.
- Keyboard navigation (`ArrowLeft`/`ArrowDown` for previous, `ArrowRight`/`ArrowUp` for next).
- `renderOption` prop for custom rendering of options, and support for extended custom data on items.
- Full Styles API support via `classNames` for targeting inner elements.

## Examples of patterns

- Boolean toggle pattern: create an on/off control by using two options and combining `leftIcon`/`rightIcon`, `loop`, and `renderOption`.
- Use it in forms alongside other Mantine inputs — it composes naturally with Mantine form logic.

## Advanced example — custom rendering & icons

```tsx
import { SelectStepper } from '@gfazioli/mantine-select-stepper';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

<SelectStepper
  data={[
    { value: 'react', label: 'React JS' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
  ]}
  leftIcon={<IconChevronLeft size={16} />}
  rightIcon={<IconChevronRight size={16} />}
  renderOption={(item) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span>{item.label}</span>
    </div>
  )}
/>
```

## Why you'll like it

- Consistent with Mantine design language and Styles API.
- Minimal API surface — easy to adopt and reason about.
- Keyboard-first interactions and accessibility-minded controls.
- Built-in animation and customization options for polished UI behavior.

## Where to see it

- Component homepage / demo: https://gfazioli.github.io/mantine-select-stepper/
- Mantine Extensions gallery: https://mantine-extensions.vercel.app/
- Mantine framework: https://mantine.dev/

## Notes

- Peer dependencies require Mantine Core and Hooks; ensure your project uses compatible Mantine versions.
- The component is ideal for small sets of ordered options (3–10 items).

---

This is a brief post ready for a blog or documentation site. If you'd like, I can:

- Generate a longer tutorial with screenshots or animated GIFs.
- Create a ready-to-publish HTML/MDX variant for your docs site.
- Add a minimal demo app showing all props in action.

File created: POST.md
