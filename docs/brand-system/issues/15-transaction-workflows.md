# Brand transaction workflows

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Migrate transaction list, calendar/gallery, edit, import, filters, and related dialogs using established primitives.

## Dependencies

- Branding issues [#7](https://github.com/LuisUmina/Spendly/issues/7), [#10](https://github.com/LuisUmina/Spendly/issues/10), [#11](https://github.com/LuisUmina/Spendly/issues/11), and [#12](https://github.com/LuisUmina/Spendly/issues/12).

## Scope

- Migrate desktop and mobile transaction lists, grouped months, calendar/gallery views, filter controls, edit/create forms, batch actions, import steps, and related dialogs/sheets.
- Use semantic tokens and previously migrated primitives.
- Preserve transaction type, amount, category, account, tag, picture, timezone, schedule, import, and batch-operation behavior.

## Files and components likely affected

- `src/views/desktop/transactions/`
- `src/views/mobile/transactions/`
- Transaction-related reusable dialogs/sheets
- Presentation-only transaction styles

## Explicit non-goals

- Do not change transaction calculations, filtering, query parameters, API contracts, import parsing, schedules, or batch behavior.
- Do not change columns, fields, routes, or page information architecture.
- Do not replace calendar/date libraries.

## Light mode requirements

Dense transaction content remains clear on calm light surfaces with restrained selection and semantic financial colors.

## Dark mode requirements

Dense transaction content remains clear on layered dark surfaces with readable separators, pictures, filters, and amounts.

## Accessibility requirements

- Preserve form labels, keyboard submission, table/list semantics, swipe alternatives, icon names, and non-color transaction-type cues.
- Keep destructive actions explicitly confirmed.
- Verify focus across import steps and dialogs.

## Acceptance criteria

- Transaction surfaces use migrated primitives and semantic tokens.
- All list modes, filters, pagination/loading, create/edit, batch, import, picture, and schedule interactions remain functional.
- Income/expense and user-selected colors retain meaning.
- Desktop/mobile routes and query parameters are unchanged.
- No transaction business logic changes.

## Screenshots and visual verification

- Capture list, calendar or gallery, filters, edit form, import, loading, empty, and error states in both themes.
- Verify desktop, narrow desktop, 320px mobile, long data, pictures, and RTL.
- Compare information density before/after.

## Tests and checks

- Run transaction/import frontend tests and `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Exercise representative create/edit/filter/import/batch flows with non-production test data.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
