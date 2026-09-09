# Complete cross-theme visual regression and debt review

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Validate the completed incremental migration across themes, platforms, responsive states, accessibility, and upstream compatibility, fixing only scoped token/style regressions.

## Dependencies

- Branding issues [#13](https://github.com/LuisUmina/Spendly/issues/13), [#14](https://github.com/LuisUmina/Spendly/issues/14), [#15](https://github.com/LuisUmina/Spendly/issues/15), [#16](https://github.com/LuisUmina/Spendly/issues/16), [#17](https://github.com/LuisUmina/Spendly/issues/17), and [#18](https://github.com/LuisUmina/Spendly/issues/18), plus all of their prerequisites.

## Scope

- Run a documented visual regression matrix across representative routes and component states.
- Fix residual legacy values only when the equivalent semantic token and intended behavior are unambiguous.
- Verify light/dark/auto, desktop/mobile, responsive widths, large text, reduced motion, LTR/RTL, keyboard navigation, loading/error/empty states, and PWA chrome.
- Update the visual-debt register with deferred items and owners/future issue suggestions.

## Files and components likely affected

- Token/style adapters and only the components with verified regressions
- `docs/brand-system/IMPLEMENTATION_PLAN.md` debt section
- A final visual verification report under `docs/brand-system/`

## Explicit non-goals

- Do not redesign screens, change information architecture, start new features, or perform broad cleanup.
- Do not hide unresolved debt with arbitrary one-off values.
- Do not modify business logic to make screenshots easier.

## Light mode requirements

Verify every representative surface and state against the canonical light theme.

## Dark mode requirements

Verify every representative surface and state against the canonical dark theme, including overlays and charts.

## Accessibility requirements

- Run keyboard-only smoke tests, focus visibility checks, contrast checks, reduced-motion checks, and representative screen-reader inspection.
- Confirm state is not conveyed by color alone and hit targets remain usable.
- Record unresolved accessibility debt as separate work rather than silently broadening the PR.

## Acceptance criteria

- All required validation matrices are completed and linked in the pull request.
- No known legacy brand literal remains in migrated scope unless documented with a reason.
- Business flows, routes, API behavior, persistence, and user-configurable data remain unchanged.
- Any fixes are limited to regressions proven by the review.
- Remaining visual debt is explicit and actionable.

## Screenshots and visual verification

- Provide a curated before/after gallery covering light, dark, desktop, mobile, narrow, large-text, RTL, loading, empty, error, overlay, chart, and reduced-motion states.
- Use consistent data and viewports for comparisons.
- Record intentional differences and unresolved debt.

## Tests and checks

- Run the full frontend test suite.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Run available accessibility and PWA audits.
- Review `git status`, full diff, generated-token freshness, and secrets before completion.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
