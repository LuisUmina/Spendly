# Migrate tables, lists, and data surfaces

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Create consistent, readable desktop tables and mobile financial data lists using semantic brand tokens.

## Dependencies

- Branding issues [#5](https://github.com/LuisUmina/Spendly/issues/5), [#6](https://github.com/LuisUmina/Spendly/issues/6), [#8](https://github.com/LuisUmina/Spendly/issues/8), and [#9](https://github.com/LuisUmina/Spendly/issues/9).

## Scope

- Theme desktop data tables, headers, rows, separators, hover/selected states, pagination, and compact density.
- Theme mobile grouped lists, inset cards, accordions, swipe-action boundaries, galleries, and selected rows.
- Align numeric content, muted metadata, tags, and row actions without changing information hierarchy.
- Preserve virtualization, sorting, filtering, pagination, swipe actions, and loading placeholders.

## Files and components likely affected

- `src/styles/desktop/override/_vuetify.scss`
- `src/styles/mobile/override/_framework7.scss`
- `src/styles/mobile/components/_combination-list.scss`
- `src/styles/mobile/components/_nested-list.scss`
- `src/components/desktop/PaginationButtons.vue`
- Representative transaction/account/category list views

## Explicit non-goals

- Do not change columns, sorting rules, filters, pagination behavior, swipe actions, or data queries.
- Do not migrate charts or page-specific workflows.
- Do not add zebra striping unless a measured density need is documented.

## Light mode requirements

Use subtle separators, calm hover/selection, readable headers, and clear numeric alignment on light surfaces.

## Dark mode requirements

Use muted grid/separator contrast and distinct hover/selection without over-bright rows.

## Accessibility requirements

- Preserve table semantics, headers, row actions, selection semantics, keyboard navigation, and non-color selection cues.
- Keep numeric and status content understandable at zoom and large text.
- Maintain touch targets for swipe and row actions.

## Acceptance criteria

- Shared table/list data surfaces use semantic tokens.
- Desktop density and mobile scanability are preserved.
- Sorting, filtering, pagination, accordion, gallery, and swipe behaviors are unchanged.
- Empty/loading states remain present for issue 11 to standardize.
- Representative long labels and large amounts do not clip.

## Screenshots and visual verification

- Capture populated/selected/hovered desktop tables and populated/selected mobile lists in both themes.
- Verify wide desktop, narrow desktop, 320px mobile, large text, and RTL.
- Capture swipe actions and compact pagination.

## Tests and checks

- Run `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Exercise sort, filter, pagination, selection, accordion, and swipe actions.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
