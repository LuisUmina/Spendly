# Brand overview dashboards and widgets

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Migrate the highest-traffic overview surfaces after shared shell, data, feedback, and chart foundations are stable.

## Dependencies

- Branding issues [#8](https://github.com/LuisUmina/Spendly/issues/8), [#9](https://github.com/LuisUmina/Spendly/issues/9), [#10](https://github.com/LuisUmina/Spendly/issues/10), [#11](https://github.com/LuisUmina/Spendly/issues/11), and [#12](https://github.com/LuisUmina/Spendly/issues/12).

## Scope

- Migrate desktop and mobile overview dashboard frames, widget cards, titles, controls, settings surfaces, layout editor, and built-in widget presentation.
- Use semantic card, surface, text, border, shadow, radius, spacing, focus, and motion tokens.
- Preserve widget sizing, dragging, resizing, ordering, filtering, click-through behavior, and per-widget settings.
- Respect user-configurable light/dark widget background colors.

## Files and components likely affected

- `src/styles/desktop/components/_overview.scss`
- `src/styles/desktop/components/_overview-widget.scss`
- Desktop/mobile overview views and widget components
- `src/views/base/overview/` only where presentation helpers are shared

## Explicit non-goals

- Do not add/remove widgets, change calculations, change default layouts, or redesign the layout editor workflow.
- Do not overwrite user-configured widget colors.
- Do not change dashboard persistence or drag/resize logic.

## Light mode requirements

Widgets use calm light surfaces and clear grouping; custom backgrounds retain readable foreground calculation.

## Dark mode requirements

Widgets use layered dark surfaces and controlled borders; custom backgrounds retain readable foreground calculation.

## Accessibility requirements

- Preserve accessible names and keyboard/pointer behavior for widget actions.
- Do not make drag/resize the only way to perform an essential action.
- Keep chart and status meaning independent of color.

## Acceptance criteria

- Overview surfaces use semantic tokens without changing widget data or layout behavior.
- Default and custom-background widgets remain readable in both themes.
- Edit, drag, resize, settings, and click-through actions remain functional.
- Desktop and mobile layouts retain current responsive behavior.
- No store schema or persisted layout format changes.

## Screenshots and visual verification

- Capture populated, loading, empty, and edit-mode dashboards in light and dark.
- Verify wide desktop, narrow desktop, 320px mobile, custom widget colors, and RTL.
- Compare widget dimensions and ordering before/after.

## Tests and checks

- Run overview layout/chart tests and `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Exercise edit, drag, resize, save, reset, and widget navigation.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
