# Brand the desktop app shell and navigation

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Apply the calm technical brand language to the desktop side navigation, top toolbar, canvas, and content frame.

## Dependencies

- Branding issues [#2](https://github.com/LuisUmina/Spendly/issues/2), [#4](https://github.com/LuisUmina/Spendly/issues/4), and [#5](https://github.com/LuisUmina/Spendly/issues/5).

## Scope

- Migrate `MainPageLayout`, side navigation, top toolbar, active navigation state, overlay, page canvas, and content gutters.
- Use semantic layout, surface, border, shadow, radius, type, focus, and motion tokens.
- Preserve the current navigation model, routes, sidebar width range, toolbar actions, and overlay breakpoint.
- Keep LTR/RTL logical properties and scroll behavior.

## Files and components likely affected

- `src/components/desktop/MainPageLayout.vue`
- `src/styles/desktop/layout/_layout.scss`
- `src/styles/desktop/base/_global.scss`

## Explicit non-goals

- Do not regroup navigation or change labels/routes.
- Do not redesign page content, widgets, forms, or dialogs.
- Do not introduce decorative spectral effects throughout the shell.

## Light mode requirements

Use a white/soft-gray workspace, subtle borders, low-noise chrome, and clear blue active/focus states.

## Dark mode requirements

Use near-black canvas and charcoal navigation/toolbar surfaces with restrained separation and bright active/focus states.

## Accessibility requirements

- Preserve landmarks, router links, accessible icon-button names, focus order, and skip/scroll behavior.
- Keep the mobile-navigation overlay keyboard dismissible.
- Do not reduce hit targets.

## Acceptance criteria

- Desktop shell uses semantic tokens and the brand spacing/radius family.
- All existing navigation destinations and toolbar actions remain present.
- The overlay navigation still activates below the existing breakpoint.
- Active, hover, focus, and scrolled states are clear in both themes.
- RTL and long labels remain functional.

## Screenshots and visual verification

- Capture desktop at wide and below-1145px widths in light and dark.
- Capture sidebar active, hover/focus, scrolled toolbar, and open overlay states.
- Compare all current navigation items before/after.

## Tests and checks

- Run `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend.
- Keyboard-test navigation and overlay open/close.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
