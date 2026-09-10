# Migrate overlays and notifications

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Create a coherent visual treatment for dialogs, drawers/sheets, popovers, menus, snackbars, notifications, toasts, and alerts.

## Dependencies

- Branding issues [#5](https://github.com/LuisUmina/Spendly/issues/5) and [#6](https://github.com/LuisUmina/Spendly/issues/6).

## Scope

- Theme reusable desktop dialog layouts, confirm/rename/import/export dialogs, menus, and snackbar surfaces.
- Theme Framework7 sheets, popovers, action sheets, dialogs, popups, notifications, toasts, backdrops, and swipe handlers.
- Apply semantic surface, border, shadow, radius, spacing, state, and motion tokens.
- Standardize title/action hierarchy without changing available actions or order.

## Files and components likely affected

- `src/components/desktop/OneColumnDialogLayout.vue`
- `src/components/desktop/TwoColumnDialogLayout.vue`
- `src/components/desktop/ConfirmDialog.vue`
- `src/components/desktop/SnackBar.vue`
- `src/styles/desktop/override/_vuetify.scss`
- `src/styles/mobile/override/_framework7.scss`
- Reusable mobile sheet components

## Explicit non-goals

- Do not change modal triggers, validation, destructive confirmations, routes, or business actions.
- Do not rewrite every page-specific dialog in this issue.
- Do not add new notifications or marketing content.

## Light mode requirements

Use raised white surfaces, subtle boundaries, restrained shadows, and clear primary/secondary/danger actions.

## Dark mode requirements

Use raised charcoal surfaces separated from the canvas by border and shadow, with readable backdrops and actions.

## Accessibility requirements

- Preserve focus trapping, initial focus, Escape dismissal, backdrop behavior, and return focus.
- Keep accessible titles and action names.
- Reduced motion must remove transform-heavy entry without hiding state changes.

## Acceptance criteria

- Shared overlay primitives use semantic tokens in both frameworks.
- Nested/scrolling body content remains usable.
- Focus and dismissal behavior is unchanged.
- Destructive actions remain clearly identified and require the same confirmation.
- No underlying action or data-flow changes.

## Screenshots and visual verification

- Capture desktop dialog/menu/snackbar and mobile sheet/action-sheet/toast in light and dark.
- Verify long content, scrolling content, keyboard focus, and a narrow viewport.
- Inspect backdrop contrast and reduced-motion entry.

## Tests and checks

- Run `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Keyboard-test open, traverse, confirm/cancel, Escape, backdrop, and return focus.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
