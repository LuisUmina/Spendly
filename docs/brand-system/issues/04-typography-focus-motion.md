# Align global typography, focus, and reduced-motion foundations

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Apply the brand type scale, focus language, and motion tokens globally before component or page migration.

## Dependencies

- Branding issues [#1](https://github.com/LuisUmina/Spendly/issues/1), [#2](https://github.com/LuisUmina/Spendly/issues/2), and [#3](https://github.com/LuisUmina/Spendly/issues/3).

## Scope

- Map the Inter-first/system fallback stack consistently across desktop and mobile.
- Introduce semantic type roles without mechanically replacing every page-specific size.
- Replace global focus suppression with a visible `:focus-visible` system for custom and library controls.
- Map shared transition durations/easing to brand motion tokens.
- Add global `prefers-reduced-motion: reduce` behavior and preserve the mobile animation preference.
- Keep RTL and user-selected application font sizes working.

## Files and components likely affected

- `src/styles/desktop/base/_global.scss`
- `src/styles/mobile/base/_global.scss`
- `src/styles/desktop/_variable.scss`
- `src/styles/mobile/_variable.scss`
- Focused framework override files
- `src/styles/desktop/components/_auth.scss` for existing motion

## Explicit non-goals

- Do not restyle all buttons, fields, cards, pages, or charts.
- Do not introduce decorative animation.
- Do not change locale strings, content hierarchy, or application font-size options.

## Light mode requirements

Typography and focus indicators must remain clear on all canonical light surfaces.

## Dark mode requirements

Typography hierarchy and focus indicators must remain clear without harsh pure-white overuse.

## Accessibility requirements

- All keyboard-focusable custom controls show a visible focus indicator.
- Reduced motion removes spatial movement and continuous/decorative animation while preserving state feedback.
- Text remains readable at all supported font-size settings and at 200% browser zoom where allowed.

## Acceptance criteria

- Global typography references semantic tokens.
- No blanket rule leaves custom controls without visible keyboard focus.
- Motion durations/easing use semantic tokens in the touched global rules.
- `prefers-reduced-motion` is covered for global motion and the existing auth reveal.
- Desktop/mobile, light/dark, LTR/RTL, and user font-size behavior remain functional.

## Screenshots and visual verification

- Capture typography hierarchy and keyboard focus in both themes on desktop and mobile.
- Record or inspect one normal-motion and one reduced-motion interaction.
- Verify long translated labels do not clip.

## Tests and checks

- Run `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Perform keyboard-only smoke tests for navigation and a representative form.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
