# Brand settings, profile, and data-management workflows

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Migrate settings, user profile/security, integrations, exchange rates, custom icons, and data-management surfaces.

## Dependencies

- Branding issues [#7](https://github.com/LuisUmina/Spendly/issues/7), [#10](https://github.com/LuisUmina/Spendly/issues/10), and [#11](https://github.com/LuisUmina/Spendly/issues/11).

## Scope

- Migrate desktop and mobile application settings, user profile/security/2FA, sessions/tokens, data import/export/clear actions, exchange rates, custom icons, and cloud-sync settings.
- Use semantic tokens and migrated forms, data surfaces, overlays, and feedback states.
- Preserve grouping and current information architecture unless a separate UX issue is approved.

## Files and components likely affected

- `src/views/desktop/app/`
- `src/views/desktop/user/`
- `src/views/mobile/settings/`
- `src/views/mobile/users/`
- Data-management, exchange-rate, custom-icon, and session views

## Explicit non-goals

- Do not change setting defaults, persistence, security behavior, token handling, data deletion, exchange-rate logic, cloud-sync protocols, or import/export formats.
- Do not merge or regroup settings pages in this issue.
- Do not modify backend configuration.

## Light mode requirements

Settings use clear hierarchy, calm grouping, readable help text, and restrained destructive emphasis.

## Dark mode requirements

Settings use layered dark surfaces, readable help text, and clear security/destructive states.

## Accessibility requirements

- Preserve labels, descriptions, keyboard flow, confirmation requirements, copy/download controls, and non-color status communication.
- Ensure destructive data actions remain explicit and separated from routine actions.
- Keep long technical values readable and selectable where currently allowed.

## Acceptance criteria

- Scoped settings and management surfaces use semantic tokens and migrated primitives.
- All settings, security, session, token, exchange-rate, icon, cloud, import/export, and clear-data behaviors remain unchanged.
- Destructive actions retain existing confirmations.
- Desktop/mobile, light/dark, large-text, and RTL layouts remain usable.
- No backend or business-logic changes.

## Screenshots and visual verification

- Capture routine settings, profile/security, technical data, loading/error, and destructive confirmation states in both themes.
- Verify desktop, 320px mobile, large text, and RTL.
- Compare action hierarchy before/after.

## Tests and checks

- Run relevant settings/user/data-management tests and `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Exercise representative save/cancel, token/session, export, and confirmation flows with test data.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
