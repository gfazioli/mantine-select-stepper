<!-- package: @gfazioli/mantine-select-stepper | version: 2.0.0 | date: 2026-03-25 -->

# Mantine SelectStepper 2.0.0 — Swipe, Scroll, Resize, Repeat

> Vertical orientation, touch gestures, responsive props, imperative API, and 9 bug fixes — all in one major release.

## Introduction

This release started with a one-line CSS fix from a community contributor: `wrap="nowrap"`. That PR from [@kruschid](https://github.com/kruschid) — just a single prop addition — exposed a deeper truth: SelectStepper v1 wasn't ready for the real world. Narrow containers broke it. Touch devices couldn't use it. Vertical layouts weren't possible. And the animation engine had a race condition hiding in plain sight. So instead of patching, we rebuilt — keeping the same API surface but rearchitecting the internals to handle every scenario we'd been ignoring. The result is v2.0.0: the same component, but now it actually works everywhere.

## ✨ What's New

### Vertical Orientation

Flip the stepper on its side. Navigation buttons switch to up/down arrows, keyboard keys remap automatically, and swipe gestures respond to vertical movement.

```tsx
<SelectStepper
  data={['XS', 'S', 'M', 'L', 'XL']}
  orientation="vertical"
  label="Size"
/>
```

The `orientation` prop is also responsive — vertical on mobile, horizontal on desktop:

```tsx
<SelectStepper
  orientation={{ base: 'vertical', sm: 'horizontal' }}
  data={['XS', 'S', 'M', 'L', 'XL']}
/>
```

### Swipe & Touch Gestures

Native Pointer Events — no external dependencies. Swipe left/right in horizontal mode, up/down in vertical. Enabled by default with a configurable threshold.

```tsx
<SelectStepper
  data={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']}
  swipeable            // true by default
  swipeThreshold={30}  // pixels
  loop
/>
```

### Imperative API

Control the stepper programmatically via `controlRef`. Navigate, reset, or jump to any value from parent code.

```tsx
const controlRef = useRef<SelectStepperRef | null>(null);

<SelectStepper
  controlRef={controlRef}
  data={['React', 'Vue', 'Angular', 'Svelte']}
/>

// From anywhere in the parent:
controlRef.current?.next();
controlRef.current?.prev();
controlRef.current?.reset();
controlRef.current?.navigateTo('Svelte');
```

### Responsive Props (CSS-Native)

`viewWidth`, `viewHeight`, and `size` accept Mantine breakpoint objects. Under the hood, responsive values are resolved via `InlineStyles` with real CSS `@media` queries — the same pattern Mantine core uses in SimpleGrid and Grid. **Zero React re-renders on resize.**

```tsx
<SelectStepper
  data={['React', 'Vue', 'Angular']}
  viewWidth={{ base: 120, sm: 180, md: 260 }}
  size={{ base: 'xs', sm: 'sm', md: 'md' }}
/>
```

### Size Prop

Control the ActionIcon button size independently from `xs` to `xl`. Supports responsive breakpoint objects.

```tsx
<SelectStepper data={data} size="lg" />
<SelectStepper data={data} size={{ base: 'xs', md: 'md' }} />
```

### Animation Callbacks

Synchronize external logic with navigation transitions using `onStepStart` and `onStepEnd`.

```tsx
<SelectStepper
  data={data}
  onStepStart={() => setAnimating(true)}
  onStepEnd={() => setAnimating(false)}
/>
```

### Gradient Variant

Full gradient support for navigation buttons, consistent with Mantine's variant system.

```tsx
<SelectStepper
  data={['Low', 'Medium', 'High', 'Ultra']}
  variant="gradient"
  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
/>
```

### Accessible Button Labels

Localize navigation button labels for screen readers.

```tsx
<SelectStepper
  previousLabel="Vorheriges Element"
  nextLabel="Nächstes Element"
/>
```

### New Props Summary

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `StyleProp<'horizontal' \| 'vertical'>` | `'horizontal'` | Stepper layout direction |
| `viewHeight` | `StyleProp<CSSProperties['height']>` | `36` | Viewport height in vertical mode |
| `size` | `StyleProp<MantineSize>` | `'sm'` | ActionIcon button size |
| `swipeable` | `boolean` | `true` | Enable touch/swipe navigation |
| `swipeThreshold` | `number` | `30` | Min swipe distance in pixels |
| `onStepStart` | `() => void` | — | Fired when animation starts |
| `onStepEnd` | `() => void` | — | Fired when animation ends |
| `controlRef` | `RefObject<SelectStepperRef \| null>` | — | Imperative control handle |
| `previousLabel` | `string` | `'Previous item'` | Aria label for prev button |
| `nextLabel` | `string` | `'Next item'` | Aria label for next button |
| `gradient` | `MantineGradient` | — | Gradient config for `variant="gradient"` |

## 💥 Breaking Changes

### `defaultValue={null}` no longer auto-selects

**Before (v1):** Passing `defaultValue={null}` auto-selected the first non-disabled item.
**After (v2):** `defaultValue={null}` means "no selection" — the component starts empty.

```tsx
// If you relied on null to auto-select, just omit the prop:
<SelectStepper data={data} />  // ← auto-selects first item
```

### `viewWidth` type changed to `StyleProp`

The prop now accepts responsive objects. TypeScript users who explicitly type `viewWidth` as `CSSProperties['width']` will need to update to `StyleProp<CSSProperties['width']>`. Runtime behavior is backward compatible.

### `onChange` timing changed

The callback is now properly wired through Mantine's `useUncontrolled` hook. If you had workarounds for stale-state issues in v1, they may no longer be needed.

## 🐛 Bug Fixes

- **Timeout race condition** — Rapid clicks no longer orphan timers or cause setState on unmounted components
- **Controlled mode sync** — External `value` changes during animation no longer cause visual glitches
- **Loop animation** — Infinite scroll now consistently moves forward instead of reversing at the boundary
- **Narrow container wrapping** — Navigation buttons no longer wrap to a new line (thanks [@kruschid](https://github.com/gfazioli/mantine-select-stepper/pull/5))
- **View shrinking misalignment** — Resizing below `viewWidth` no longer misaligns the scroll offset
- **Stale data handling** — Changing `data` while `value` references a removed item now auto-resets
- **Callback consistency** — `onStepStart` only fires when navigation actually occurs; `onLeftIconClick`/`onRightIconClick` respect `canGoPrev`/`canGoNext`
- **Demo import typo** — Styles API demo no longer references the wrong package

## 🔧 Improvements

### Full ARIA Accessibility

The component now implements `role="spinbutton"` with complete attributes: `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`, `aria-disabled`, `aria-label`, and `aria-labelledby`. A hidden `aria-live="polite"` region announces value changes to screen readers.

### Orientation-Aware Keyboard Navigation

Arrow keys are now direction-specific: `ArrowLeft`/`ArrowRight` in horizontal, `ArrowUp`/`ArrowDown` in vertical. No more confusing cross-axis navigation.

### 66 Tests (up from 2)

Comprehensive coverage across: navigation, keyboard, controlled/uncontrolled mode, loop, disabled items, empty data, swipe gestures (with PointerEvent polyfill), imperative API, responsive props, ARIA attributes, and animation callbacks.

### Documentation Reorganized

Docs follow the Mantine standard: Installation → Usage → Core → Behavior → Visual → Advanced → Reference. Eight new interactive demos added.

## 📦 Installation

```bash
yarn add @gfazioli/mantine-select-stepper
```

Import styles at your app root:

```tsx
import '@gfazioli/mantine-select-stepper/styles.css';
```

Or with CSS layers:

```tsx
import '@gfazioli/mantine-select-stepper/styles.layer.css';
```

**Compatibility:** Mantine 8.x · React 18/19 · TypeScript 5.x · MIT License

## 🔗 Links

- 📦 [npm](https://www.npmjs.com/package/@gfazioli/mantine-select-stepper)
- 📖 [Documentation & Demos](https://gfazioli.github.io/mantine-select-stepper/)
- 🐙 [GitHub](https://github.com/gfazioli/mantine-select-stepper)
- 🎬 [YouTube Playlist](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4)
- 🧩 [All Mantine Extensions](https://mantine-extensions.vercel.app/)

---

## Discord Summary

<!-- Copy-paste the block below into Discord -->

**@gfazioli/mantine-select-stepper v2.0.0** 🎉

Major release: vertical orientation, swipe gestures, imperative API, responsive CSS props, and 9 bug fixes.

**New Features**
- `orientation` prop with responsive support (`vertical` / `horizontal`)
- Swipe/touch navigation via `swipeable`, `swipeThreshold`
- Imperative API via `controlRef` (`next`, `prev`, `reset`, `navigateTo`)
- Responsive `viewWidth`, `viewHeight`, `size` via CSS `@media` queries (zero re-renders)
- `onStepStart`, `onStepEnd` animation callbacks
- `variant="gradient"` with `gradient` prop
- `previousLabel`, `nextLabel` for accessible button labels
- `viewHeight` prop for vertical mode

**Bug Fixes**
- Timeout race condition on rapid clicks
- Controlled mode sync during transitions
- Loop animation reverse scroll
- Controls wrapping in narrow containers (thanks @kruschid)
- View shrinking misalignment on resize
- Data change without value reset

**Breaking Changes**
- `defaultValue={null}` now means "no selection" (omit prop for auto-select)
- `viewWidth` type changed to `StyleProp` (responsive objects accepted)
- `onChange` timing changed via `useUncontrolled`

📦 `yarn add @gfazioli/mantine-select-stepper@2`
📖 Docs: https://gfazioli.github.io/mantine-select-stepper/
🔗 GitHub: https://github.com/gfazioli/mantine-select-stepper
