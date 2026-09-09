# Brand account, category, tag, and template workflows

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Migrate financial structure-management screens using the established token and primitive layers.

## Dependencies

- Branding issues [#7](https://github.com/LuisUmina/Spendly/issues/7), [#10](https://github.com/LuisUmina/Spendly/issues/10), and [#11](https://github.com/LuisUmina/Spendly/issues/11).

## Scope

- Migrate account lists/forms/reconciliation, category trees/forms/presets, tag groups/tags, templates, selection surfaces, and reorder states on desktop and mobile.
- Use semantic surfaces, hierarchy, controls, data states, and motion.
- Preserve icons, user colors, parent/child structure, drag/reorder, reconciliation, balances, and hidden states.

## Files and components likely affected

- `src/views/desktop/accounts/`, `categories/`, `tags/`, and `templates/`
- `src/views/mobile/accounts/`, `categories/`, `tags/`, and `templates/`
- Related shared selection and item-icon components

## Explicit non-goals

- Do not change balances, hierarchy rules, reconciliation calculations, ordering logic, CRUD behavior, or API contracts.
- Do not normalize user-selected icon/color data.
- Do not regroup these product areas.

## Light mode requirements

Hierarchy and financial totals remain readable with subtle grouping and clear active/hidden states.

## Dark mode requirements

Hierarchy and totals remain readable with layered surfaces, controlled separators, and clear active/hidden states.

## Accessibility requirements

- Preserve tree/list semantics, labels, reorder alternatives where present, keyboard form flow, confirmations, and non-color hidden/selected indicators.
- Keep account amounts and hierarchy understandable at large text.

## Acceptance criteria

- Scoped screens use semantic tokens and migrated primitives.
- Create/edit/delete/hide/reorder/reconcile/select behaviors remain unchanged.
- User colors and icons retain their data meaning and adequate foreground contrast.
- Desktop/mobile, light/dark, large-text, and RTL layouts remain usable.
- No financial or persistence logic changes.

## Screenshots and visual verification

- Capture populated/empty lists, forms, hierarchy, hidden items, reorder mode, and reconciliation in both themes.
- Verify desktop, 320px mobile, large text, custom colors, and RTL.
- Compare hierarchy clarity and amounts before/after.

## Tests and checks

- Run relevant account/category/tag/template tests and `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Exercise representative CRUD, hide, reorder, select, and reconciliation flows.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
