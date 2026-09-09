# Map the desktop Vuetify theme to semantic tokens

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Replace the desktop theme's direct visual values with the generated semantic brand mapping while preserving Vuetify behavior.

## Dependencies

- [Branding issue #1](https://github.com/LuisUmina/Spendly/issues/1).

## Scope

- Move Vuetify theme assembly out of `src/desktop-main.ts` into the generated or dedicated theme adapter.
- Map canvas, surfaces, text, borders, functional accent, semantic states, overlays, tooltips, tables, and shadows.
- Retain the existing `light`, `dark`, and `auto` theme names and switching behavior.
- Add temporary `--ebk-*` compatibility aliases where current desktop styles still depend on them.

## Files and components likely affected

- `src/desktop-main.ts`
- Generated/dedicated files under `src/themes/`
- `src/styles/desktop/_variable.scss`
- Narrow theme-related tests

## Explicit non-goals

- Do not restyle individual Vuetify primitives or pages.
- Do not change routing, settings persistence, chart palettes, or product identity.
- Do not remove compatibility aliases still used elsewhere.

## Light mode requirements

Use the canonical white/soft-gray canvas, cool neutral text, subtle borders, and functional blue roles.

## Dark mode requirements

Use the canonical near-black canvas, charcoal raised surfaces, soft high-contrast text, subtle borders, and brighter blue accent.

## Accessibility requirements

- Keep Vuetify state layers and disabled states perceivable.
- Verify primary, secondary, inverse, tooltip, and semantic-state contrast.
- Preserve system-theme switching and keyboard behavior.

## Acceptance criteria

- `src/desktop-main.ts` no longer owns raw brand color values.
- Desktop theme switching works for explicit light, explicit dark, and auto modes.
- Existing semantic success, warning, and danger behavior remains recognizable.
- Representative desktop screens render without missing Vuetify variables or console errors.
- No page-specific redesign or business-logic change.

## Screenshots and visual verification

- Capture the same desktop shell, form, dialog, and table state before and after.
- Provide light and dark screenshots at a desktop viewport.
- Review hover, selected, disabled, tooltip, and overlay states.

## Tests and checks

- Run `npm run test`.
- Run token stale-output verification.
- Run TypeScript checking and ESLint.
- Build the frontend.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
