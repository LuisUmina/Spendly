# Generate shared semantic brand tokens

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Establish a single generated runtime token layer from the canonical brand JSON without changing the rendered application.

## Dependencies

- None. This is the foundation for every later branding issue.

## Scope

- Add a dependency-free generator that reads `docs/brand-system/design-tokens.v3.generic.json`.
- Generate committed CSS custom properties for colors, typography, spacing, radii, shadows, layout, and motion.
- Generate the TypeScript values required by framework theme setup before CSS is evaluated.
- Add a verification command that fails when generated artifacts are stale.
- Document token naming, generation, and the temporary compatibility-alias policy.

## Files and components likely affected

- `docs/brand-system/design-tokens.v3.generic.json`
- New generator under `scripts/`
- New generated files under `src/styles/brand/` and `src/themes/`
- `package.json` scripts only if needed to expose generation/verification

## Explicit non-goals

- Do not apply the new values to Vuetify, Framework7, components, pages, PWA metadata, or charts.
- Do not rename existing product identifiers or remove `--ebk-*` variables.
- Do not add a third-party token package.

## Light mode requirements

Generate every light-theme token defined in the canonical JSON, with stable semantic names and no missing fallbacks.

## Dark mode requirements

Generate every dark-theme token from the same source and prove that every light color role has a dark counterpart.

## Accessibility requirements

- Include focus, text, border, semantic-state, and reduced-motion tokens needed by later issues.
- Validate token pairs used for primary text, inverse text, and interactive focus against their intended surfaces.

## Acceptance criteria

- Generated files are deterministic and contain a source/version header.
- Running the generator twice produces no diff.
- The stale-output verification detects a changed source token file.
- Raw brand values exist only in the canonical JSON and generated outputs introduced by this issue.
- No current component consumes the new tokens, so the existing UI remains visually unchanged.
- No application behavior, route, API, store, or persistence code changes.

## Screenshots and visual verification

- Capture is optional because no consumer should change.
- Compare one existing desktop and mobile screen before/after or use an automated screenshot diff to confirm zero intended visual change.

## Tests and checks

- Run token generation and stale-output verification.
- Run `npm run test`.
- Run TypeScript checking and ESLint without retaining unrelated auto-fixes.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
