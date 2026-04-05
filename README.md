# Mantine SelectStepper Component

<img alt="Mantine SelectStepper" src="https://github.com/gfazioli/mantine-select-stepper/blob/master/logo.jpeg" />

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-select-stepper?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-select-stepper)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-select-stepper?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-select-stepper)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-select-stepper?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-select-stepper)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-select-stepper?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.
It requires **Mantine 9.x** and **React 19**.

The [Mantine SelectStepper](https://gfazioli.github.io/mantine-select-stepper/) is a Mantine-based React component that provides an elegant way to select from a list of options through a stepper interface. Users can navigate forward and backward through items using action buttons, with support for keyboard navigation, infinite looping, disabled items, and smooth animations. Built with TypeScript and fully integrated with Mantine's Styles API, it offers extensive customization options including custom icons, animation timing, viewport width, and border styling.

> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/mantine-select-stepper/) → [Youtube Video](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4) → [More Mantine Components](https://mantine-extensions.vercel.app/)

## Key Features

- **Swipe/Touch gestures** — native pointer events for mobile navigation
- **Vertical orientation** — render as a vertical stepper with up/down arrows
- **Imperative API** — `controlRef` with `next()`, `prev()`, `reset()`, `navigateTo()` methods
- **Size prop** — control ActionIcon size (`xs` through `xl`)
- **Animation callbacks** — `onStepStart` and `onStepEnd` for transition synchronization
- **Gradient variant** — gradient-styled navigation buttons
- **Full keyboard navigation** — Arrow keys with automatic disabled item skipping
- **Loop mode** — infinite cycling through options
- **Styles API** — full Mantine Styles API integration with 10 style targets
- **Responsive props** — `viewWidth`, `viewHeight`, `size`, `orientation` adapt to breakpoints via Mantine's `StyleProp`
- **Accessible** — ARIA `spinbutton` role, live regions, labeled buttons

## Installation

```sh
npm install @gfazioli/mantine-select-stepper
```
or

```sh
yarn add @gfazioli/mantine-select-stepper
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-select-stepper/styles.css';
```

You can also import styles within a CSS layer:

```tsx
import '@gfazioli/mantine-select-stepper/styles.layer.css';
```

## Usage

```tsx
import { SelectStepper } from '@gfazioli/mantine-select-stepper';

function Demo() {
  return <SelectStepper data={['React', 'Vue', 'Angular']} />;
}
```

## Imperative API

```tsx
import { useRef } from 'react';
import { SelectStepper, type SelectStepperRef } from '@gfazioli/mantine-select-stepper';

function Demo() {
  const controlRef = useRef<SelectStepperRef>(null);

  return (
    <>
      <SelectStepper
        controlRef={controlRef}
        data={['React', 'Vue', 'Angular']}
      />
      <button onClick={() => controlRef.current?.next()}>Next</button>
      <button onClick={() => controlRef.current?.reset()}>Reset</button>
    </>
  );
}
```

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates
- Add new features, improve performance, and refine the developer experience
- Expand test coverage and documentation for smoother adoption
- Ensure long‑term sustainability without relying on ad hoc free time
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up‑to‑date, and growing for everyone.

---

[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-select-stepper&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-select-stepper&Timeline)

---

https://github.com/user-attachments/assets/d430dd46-2da5-46e3-8dcd-73f666f8c6fe
