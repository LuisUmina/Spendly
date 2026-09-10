# Migrate desktop form and control primitives

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Apply the brand system to commonly reused desktop controls before migrating screens.

## Dependencies

- Branding issues [#2](https://github.com/LuisUmina/Spendly/issues/2) and [#4](https://github.com/LuisUmina/Spendly/issues/4).

## Scope

- Theme Vuetify buttons, icon buttons, text fields, textareas, selects, autocompletes, switches, checkboxes, radios, chips, and tabs.
- Migrate reusable application inputs such as amount, number, currency, date, icon, color, and tag controls.
- Use the 44-48px control rhythm where density permits and retain explicit compact modes.
- Define hover, active, focus-visible, disabled, loading, invalid, and selected states.

## Files and components likely affected

- `src/styles/desktop/settings.scss`
- `src/styles/desktop/override/_vuetify.scss`
- `src/components/desktop/AmountInput.vue`
- `src/components/desktop/NumberInput.vue`
- `src/components/desktop/CurrencySelect.vue`
- `src/components/desktop/Date*Select.vue`
- `src/components/desktop/IconSelect.vue`
- `src/components/desktop/ColorSelect.vue`
- `src/components/desktop/TransactionTagAutoComplete.vue`

## Explicit non-goals

- Do not redesign forms or change validation/business rules.
- Do not migrate dialogs, tables, navigation, or whole pages.
- Do not remove compact density used by data-heavy workflows.

## Light mode requirements

Controls use subtle borders, calm surfaces, readable placeholders, and visible blue focus/selected states.

## Dark mode requirements

Controls use raised charcoal surfaces, clear borders, readable placeholders, and the brighter dark-theme accent.

## Accessibility requirements

- Preserve labels, descriptions, native/library semantics, Enter behavior, and tab order.
- Keep icon-only controls named and focusable.
- Validation and disabled states must not rely on color alone.

## Acceptance criteria

- Shared desktop controls use semantic tokens for touched colors, radii, shadows, spacing, and motion.
- All documented states are visually distinct in light and dark modes.
- Complex amount/date/icon/color inputs retain keyboard and pointer behavior.
- Compact variants remain usable in dense screens.
- No validation, formatting, calculation, or submission logic changes.

## Screenshots and visual verification

- Create a desktop control-state matrix in light and dark modes.
- Capture default, hover, focus, disabled, loading, and invalid examples.
- Verify a narrow desktop/tablet viewport.

## Tests and checks

- Run `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Exercise amount formulas, selects, date controls, and keyboard submission.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
