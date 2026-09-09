# Map the mobile Framework7 theme to semantic tokens

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Bridge Framework7's mobile theme variables to the shared semantic brand system without changing mobile navigation or gestures.

## Dependencies

- [Branding issue #1](https://github.com/LuisUmina/Spendly/issues/1).

## Scope

- Map Framework7 primary, page, surface, list, text, border, navbar, toolbar, control, sheet, popup, dialog, chip, notification, and skeleton roles.
- Replace the direct Framework7 primary color in `src/MobileApp.vue` with generated theme data.
- Map runtime browser `theme-color` values to semantic theme roles.
- Preserve separate LTR/RTL builds, safe-area variables, swipe-back, and the user animation setting.
- Provide temporary aliases for mobile `--ebk-*` consumers.

## Files and components likely affected

- `src/MobileApp.vue`
- `src/styles/mobile/_variable.scss`
- `src/styles/mobile/override/_framework7.scss`
- Generated/dedicated files under `src/themes/`
- `src/mobile-ltr.scss`, `src/mobile-rtl.scss` only if an import is required

## Explicit non-goals

- Do not redesign individual mobile pages, sheets, lists, or authentication flows.
- Do not change route behavior, gestures, product naming, icons, or manifest metadata.
- Do not replace Framework7's iOS theme.

## Light mode requirements

Use the canonical canvas, panel, text, border, and functional blue roles throughout Framework7 variables.

## Dark mode requirements

Use the canonical dark canvas and raised surfaces while preserving readable separators, controls, and system bars.

## Accessibility requirements

- Keep escape-to-close and swipe/dismiss behavior.
- Maintain visible control states and sufficient hit targets.
- Ensure theme-color changes do not cause unreadable browser chrome.

## Acceptance criteria

- No raw brand accent remains in the Framework7 runtime configuration.
- Light, dark, and auto modes work without a reload regression.
- LTR and RTL bundles compile and retain logical spacing.
- Safe-area, swipe-back, dialogs, sheets, and popovers behave as before.
- No mobile route or business-logic change.

## Screenshots and visual verification

- Capture mobile home/list and an open sheet in light and dark modes.
- Verify at 320px and a modern phone width, plus an RTL sample.
- Review browser/PWA chrome where the environment exposes it.

## Tests and checks

- Run `npm run test`.
- Run token stale-output verification.
- Run TypeScript checking and ESLint.
- Build both mobile CSS directions and the frontend.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
