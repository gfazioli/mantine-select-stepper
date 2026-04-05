# CLAUDE.md

## Project
`@gfazioli/mantine-select-stepper` — a Mantine-based React component that lets users cycle through a list of options via stepper buttons, with forward/backward navigation, keyboard support, infinite looping, disabled items, swipe gestures, vertical orientation, and animations.

## Commands
| Command | Purpose |
|---------|---------|
| `yarn build` | Build the npm package via Rollup |
| `yarn dev` | Start the Next.js docs dev server (port 9281) |
| `yarn test` | Full test suite (syncpack + oxfmt + typecheck + lint + jest) |
| `yarn jest` | Run only Jest unit tests |
| `yarn docgen` | Generate component API docs (docgen.json) |
| `yarn docs:build` | Build the Next.js docs site for production |
| `yarn docs:deploy` | Build and deploy docs to GitHub Pages |
| `yarn lint` | Run oxlint |
| `yarn format:write` | Format all files with oxfmt |
| `yarn storybook` | Start Storybook dev server |
| `yarn clean` | Remove build artifacts |
| `yarn release:patch` | Bump patch version and deploy docs |
| `diny yolo` | AI-assisted commit (stage all, generate message, commit + push) |

> **Important**: After changing the public API, always run `yarn clean && yarn build` before `yarn test`.

## Architecture

### Workspace Layout
Yarn workspaces monorepo with two workspaces: `package/` (npm package) and `docs/` (Next.js 15 documentation site).

### Package Source (`package/src/`)
Single component library with a flat structure:

- `SelectStepper.tsx` — main component, built with `polymorphicFactory` from Mantine
- `SelectStepper.module.css` — CSS Modules styles
- `SelectStepper.test.tsx` — Jest tests covering navigation, keyboard, a11y, imperative API, callbacks, swipe, responsive
- `SelectStepper.story.tsx` — Storybook stories
- `SelectStepperMediaVariables.tsx` — CSS media queries for responsive props (InlineStyles pattern)
- `get-input-offsets/` — utility for calculating input wrapper margin offsets
- `index.ts` — public exports (component + all types + `ComboboxItem` + `StyleProp` re-export)

Exported types: `SelectStepper`, `SelectStepperBaseProps`, `SelectStepperProps`, `SelectStepperFactory`, `SelectStepperCssVariables`, `SelectStepperStylesNames`, `SelectStepperVariant`, `SelectStepperItem`, `SelectStepperOrientation`, `SelectStepperRef`, `ComboboxItem`, `StyleProp`.

### Build Pipeline
Rollup bundles to dual ESM/CJS with `'use client'` banner. CSS modules hashed with `hash-css-selector` (prefix `me`). TypeScript declarations via `rollup-plugin-dts`. CSS split into `styles.css` and `styles.layer.css`.

## Component Details

### Mantine Patterns Used
- `polymorphicFactory` for component creation (supports `component` prop)
- `useProps` with `defaultProps` for prop resolution
- `createVarsResolver` for CSS variable mapping (non-responsive props only)
- `useStyles` for Styles API integration
- `useUncontrolled` for controlled/uncontrolled value state (with `onChange` passed through)
- `useImperativeHandle` for imperative API via `controlRef` prop
- `Input.Wrapper` for label, description, error support
- `InlineStyles` + `useRandomClassName` for responsive CSS media queries (`viewWidth`, `viewHeight`, `size`)
- `useMatches` for JS-consumed responsive props (`orientation`)

### Responsive Props (CSS-native)
`SelectStepperMediaVariables` generates `<style>` with `@media` queries for `viewWidth`, `viewHeight`, `size` — zero React re-renders on resize. Uses concrete pixel values for `--ai-size` (NOT `var(--ai-size-sm)` references which are scoped to ActionIcon's CSS module). Override passed via `getStyles('leftSection', { style: actionSizeStyle })` to merge with computed styles.

### Responsive Orientation (JS)
`useMatches` resolves `orientation` because it controls React component structure (Stack/Group), keyboard keys, and icon direction — cannot be expressed as CSS.

### Internal vs External Navigation
`isInternalNavRef` distinguishes navigation-triggered value changes from external controlled mode changes, preventing the sync `useEffect` from canceling the animation timeout.

### Pointer Events for Swipe
Uses `PointerDown/PointerUp` with threshold detection, no external dependencies.

### Vertical Mode
Switches `Group` to `Stack`, `translateX` to `translateY`, and remaps keyboard arrow keys.

### Narrow Container Handling
`.view` uses `min-width: 0` to allow flex shrinking; `.content` uses `width: 100%` (not fixed CSS var) so items match the actual view width and `translateX(-100%)` stays aligned.

## Testing
Jest with `jsdom`, `esbuild-jest` transform, CSS mocked via `identity-obj-proxy`. Tests use `@mantine-tests/core` render helper.

## Ecosystem
This repo is part of the Mantine Extensions ecosystem, derived from the `mantine-base-component` template. See the workspace `CLAUDE.md` (in the parent directory) for:
- Development checklist (code -> test -> build -> docs -> release)
- Cross-cutting patterns (compound components, responsive CSS, GitHub sync)
- Update packages workflow
- Release process
