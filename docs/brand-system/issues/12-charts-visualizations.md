# Migrate charts and visualizations

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Apply the restrained brand chart palette and semantic surface treatment while preserving financial meaning, data, and interactions.

## Dependencies

- Branding issues [#1](https://github.com/LuisUmina/Spendly/issues/1), [#2](https://github.com/LuisUmina/Spendly/issues/2), [#3](https://github.com/LuisUmina/Spendly/issues/3), and [#4](https://github.com/LuisUmina/Spendly/issues/4).

## Scope

- Map default ECharts series, grid, axis, label, legend, tooltip, focus, and chart-surface colors to semantic tokens.
- Migrate desktop axis, trends, pie, radar, heat-map, calendar, hierarchy, and Sankey components plus mobile chart wrappers.
- Replace theme-dependent tooltip literals with semantic helpers.
- Apply reduced-motion behavior to ECharts and chart skeleton animations.
- Preserve user-configurable chart palettes and income/expense color preferences.

## Files and components likely affected

- `src/core/color.ts`
- `src/consts/color.ts`
- `src/components/base/*ChartBase.ts`
- `src/components/desktop/*Chart.vue`
- `src/components/mobile/*Chart.vue`
- Chart-related overview/statistics views and tests

## Explicit non-goals

- Do not change chart queries, calculations, aggregation, types, legends, dimensions, click targets, or export behavior.
- Do not replace ECharts or vue-echarts.
- Do not override user-selected or semantically meaningful financial colors.

## Light mode requirements

Use the canonical light series palette, subtle grid, strong readable labels, and accessible tooltips.

## Dark mode requirements

Use the canonical dark series palette, muted grid, clear labels, and raised readable tooltips.

## Accessibility requirements

- Retain labels, titles, keyboard/pointer interactions, and non-color context already exposed by each chart.
- Verify series distinguishability beyond hue where the chart supports symbols/labels.
- Disable or shorten nonessential chart motion for reduced-motion users.

## Acceptance criteria

- Default chart presentation references semantic chart tokens.
- Direct light/dark tooltip separator literals are removed from touched chart components.
- User-selected palettes and income/expense preferences produce the same meaning as before.
- All chart interactions, drill-down links, legends, exports, and calculations are unchanged.
- Skeletons and animations respect reduced motion.

## Screenshots and visual verification

- Capture each chart family represented in the affected code in light and dark modes.
- Verify tooltip, legend, empty, skeleton, hover/focus, and selected states.
- Verify desktop and mobile chart layouts at representative widths.

## Tests and checks

- Run existing chart/unit tests and `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Compare representative chart data and exported output before/after.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
