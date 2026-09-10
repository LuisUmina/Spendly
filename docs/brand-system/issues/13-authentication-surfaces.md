# Brand authentication and unlock flows

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Apply the new calm, premium visual system to login, signup, recovery, verification, OAuth, 2FA, and unlock surfaces.

## Dependencies

- Branding issues [#5](https://github.com/LuisUmina/Spendly/issues/5), [#6](https://github.com/LuisUmina/Spendly/issues/6), and [#7](https://github.com/LuisUmina/Spendly/issues/7).

## Scope

- Migrate desktop and mobile authentication layouts, cards, illustrations, forms, links, notices, and action hierarchy.
- Use semantic canvas, surface, type, border, focus, shadow, radius, gradient, and motion tokens.
- Keep the existing abstract illustration structure and only use decorative spectral accents where restrained.
- Cover application lock, PIN/passcode, password reset, verification, OAuth callback, and 2FA states.

## Files and components likely affected

- `src/styles/desktop/components/_auth.scss`
- `src/styles/mobile/components/_auth.scss`
- `src/components/desktop/AuthIllustration.vue`
- Desktop/mobile login, signup, verification, recovery, OAuth, 2FA, and unlock views

## Explicit non-goals

- Do not change authentication, registration, OAuth, 2FA, password, token, or application-lock logic.
- Do not rename the product or replace logo assets.
- Do not change available login methods or user-facing security requirements.

## Light mode requirements

Use clean canvas, restrained halo/illustration accents, readable form grouping, and clear actions.

## Dark mode requirements

Use deliberate dark surfaces with controlled contrast, subtle halos, and readable security/validation content.

## Accessibility requirements

- Preserve labels, autocomplete behavior, Enter submission, password visibility controls, error messaging, focus order, and 2FA/PIN keyboard behavior.
- Decorative illustrations remain hidden from assistive technology.
- All reveal motion respects reduced motion.

## Acceptance criteria

- All authentication and unlock surfaces use semantic tokens in both platform variants.
- Authentication methods, routes, requests, validation, and success/error behavior remain unchanged.
- Focus, keyboard submission, password managers, 2FA, and PIN entry remain functional.
- Small-height and narrow mobile layouts remain usable.
- No product identity decision is embedded in this issue.

## Screenshots and visual verification

- Capture login, signup/recovery, 2FA or unlock, validation error, and loading states in both themes.
- Verify desktop, 320px mobile, short-height mobile, large text, and RTL.
- Review normal and reduced motion.

## Tests and checks

- Run authentication-related frontend tests and `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Exercise keyboard-only login/recovery and representative error/success paths without using production credentials.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
