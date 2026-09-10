# Migrate mobile form and control primitives

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Apply the brand system to reusable Framework7 controls and mobile financial inputs while preserving native-like behavior.

## Dependencies

- Branding issues [#3](https://github.com/LuisUmina/Spendly/issues/3) and [#4](https://github.com/LuisUmina/Spendly/issues/4).

## Scope

- Theme Framework7 buttons, list inputs, textareas, toggles, checkboxes, radios, chips, search, ranges, and list selection states.
- Migrate `ListNumberInput`, number pad, PIN/passcode/password inputs, date/month selectors, and selection-list primitives.
- Use semantic control, surface, border, focus, state, spacing, radius, and motion tokens.
- Preserve safe areas, touch behavior, tap-hold, keyboard entry, and compact list density.

## Files and components likely affected

- `src/styles/mobile/override/_framework7.scss`
- `src/components/mobile/ListNumberInput.vue`
- `src/components/mobile/NumberPadSheet.vue`
- `src/components/common/PinCodeInput.vue`
- Mobile date/month and selection components

## Explicit non-goals

- Do not redesign mobile pages, sheets, navigation, or transaction workflows.
- Do not change numeric parsing, validation, gestures, or haptics.
- Do not force desktop control geometry onto dense mobile lists.

## Light mode requirements

Controls use canonical light surfaces, subtle separators, functional blue selection/focus, and readable helper text.

## Dark mode requirements

Controls use canonical dark surfaces and borders with clear focus, selection, invalid, and disabled states.

## Accessibility requirements

- Maintain minimum hit targets, labels, keyboard entry, and screen-reader semantics supplied by Framework7.
- Ensure PIN/number controls retain logical focus movement.
- Do not use color as the only selected/invalid indicator.

## Acceptance criteria

- Reusable mobile controls reference semantic tokens in touched styles.
- Selection, focus, invalid, disabled, pressed, and loading states remain distinct.
- Number, PIN, date, month, and selection workflows preserve behavior.
- 320px, safe-area, and large-font layouts remain usable.
- LTR and RTL behavior remains correct.

## Screenshots and visual verification

- Capture a representative mobile form and selection control in both themes.
- Verify 320px, a modern phone width, large text, and RTL.
- Capture focused, invalid, selected, and disabled states.

## Tests and checks

- Run `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Exercise numeric keyboard, PIN movement, date/month selection, and list selection.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
