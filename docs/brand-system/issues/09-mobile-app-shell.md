# Brand the mobile app shell and navigation

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Apply the shared brand language to mobile pages, navbars, toolbars, and primary navigation without changing Framework7 routing.

## Dependencies

- Branding issues [#3](https://github.com/LuisUmina/Spendly/issues/3), [#4](https://github.com/LuisUmina/Spendly/issues/4), and [#6](https://github.com/LuisUmina/Spendly/issues/6).

## Scope

- Theme page canvas, navbars, toolbars, primary action placement, active states, separators, and safe-area surfaces.
- Migrate the mobile home shell and shared navbar/toolbar classes.
- Use semantic layout, surface, border, type, focus, and motion tokens.
- Preserve swipe-back, browser history, page transitions, route order, and LTR/RTL bundles.

## Files and components likely affected

- `src/views/mobile/HomePage.vue`
- `src/styles/mobile/override/_framework7.scss`
- `src/styles/mobile/base/_global.scss`
- Shared mobile navbar/toolbar helper styles

## Explicit non-goals

- Do not regroup settings or navigation destinations.
- Do not migrate individual page content, lists, charts, or forms.
- Do not change swipe-back or browser-history behavior.

## Light mode requirements

Use a calm light canvas and low-noise navigation chrome with a clear functional-blue active state.

## Dark mode requirements

Use the canonical dark canvas and elevated navigation surfaces with controlled border contrast.

## Accessibility requirements

- Retain accessible link/button semantics, back behavior, Escape support, and touch targets.
- Verify visible focus when a hardware keyboard is used.
- Preserve safe-area padding and long translated labels.

## Acceptance criteria

- Shared mobile shell surfaces use semantic tokens.
- Navigation and back behavior remain unchanged.
- Safe areas, standalone PWA mode, 320px width, and RTL remain functional.
- Light/dark/auto switching updates shell surfaces without stale colors.
- No page content or business logic is redesigned.

## Screenshots and visual verification

- Capture home/navigation at 320px and a modern phone width in both themes.
- Verify safe-area and RTL states.
- Capture hardware-keyboard focus where supported.

## Tests and checks

- Run `npm run test`.
- Run TypeScript checking and ESLint.
- Build both mobile CSS directions and the frontend.
- Exercise forward/back/swipe navigation and theme switching.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
