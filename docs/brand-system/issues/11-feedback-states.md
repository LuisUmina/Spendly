# Standardize loading, empty, error, and disabled states

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Provide consistent shared feedback patterns without changing when or why application states occur.

## Dependencies

- Branding issues [#7](https://github.com/LuisUmina/Spendly/issues/7) and [#10](https://github.com/LuisUmina/Spendly/issues/10).

## Scope

- Define shared visual patterns for skeletons, progress, empty results, recoverable errors, validation errors, disabled controls, and transient notifications.
- Reuse Vuetify and Framework7 primitives through semantic tokens.
- Introduce small shared empty/error wrappers only where they remove repeated visual markup without moving business logic.
- Keep current messages in i18n and preserve retry/action behavior.

## Files and components likely affected

- Desktop/mobile framework override files
- `src/components/desktop/SnackBar.vue`
- Potential new visual-only shared state components
- Representative list, dashboard, image, and document-loading views

## Explicit non-goals

- Do not change error handling, API retry logic, loading timing, validation rules, or copy beyond necessary accessible labels.
- Do not add celebratory/decorative animation.
- Do not migrate every page in one PR; cover primitives and representative consumers.

## Light mode requirements

Feedback states use calm surfaces, semantic status colors, readable muted text, and restrained skeleton contrast.

## Dark mode requirements

Feedback states use raised surfaces and status colors tuned for dark contrast without glowing or alarming by default.

## Accessibility requirements

- Use text/icon/state semantics in addition to color.
- Announce async status where existing architecture supports it and preserve live-region behavior.
- Disable continuous shimmer under reduced motion.

## Acceptance criteria

- Reusable loading, empty, error, and disabled styles use semantic tokens.
- At least one desktop and one mobile representative consumer use each applicable shared pattern.
- Existing actions and messages remain available.
- Reduced motion removes continuous loading decoration while preserving progress meaning.
- No request, retry, validation, or store logic changes.

## Screenshots and visual verification

- Capture loading, empty, recoverable error, disabled, and success feedback in both themes and platforms.
- Verify reduced motion and high/large text.
- Check that empty states do not create excessive nested cards.

## Tests and checks

- Run `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Exercise representative success, empty, loading, disabled, and error paths.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
