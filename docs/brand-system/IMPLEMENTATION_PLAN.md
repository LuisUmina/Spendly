# Brand System Implementation Plan

Status: planning only

Audit date: 2026-09-09

Target branch: `personal`

## Purpose and scope

The six files in this directory are the canonical visual and UX reference for this fork. This plan translates that project-agnostic direction into an incremental migration for the current ezBookkeeping frontend. It does not authorize a technical-identifier rename, information-architecture redesign, business-logic change, dependency replacement, or broad one-shot rebrand. The visible product name on `personal` will become Spendly in issue 18 while upstream-facing technical identifiers remain unchanged.

The migration should preserve the fork's upstream compatibility. Prefer new token and adapter files, small changes at existing framework extension points, and focused pull requests. Every implementation issue must support light and dark modes, desktop and mobile where relevant, keyboard access, responsive behavior, internationalization, RTL layouts, and reduced-motion preferences.

## 1. Current UI architecture

### Application structure

| Area | Current implementation | Primary files | Audit notes |
| --- | --- | --- | --- |
| Framework | Vue 3 with TypeScript and Pinia | `src/desktop-main.ts`, `src/mobile-main.ts`, `src/stores/` | Business and view state are shared through stores and base composables. |
| Build | Vite with three HTML entry points | `src/index.html`, `src/desktop.html`, `src/mobile.html`, `vite.config.ts` | The root entry selects the desktop or mobile application. This is not a single responsive component tree. |
| Desktop UI | Vuetify 4 and Material Design Icons | `src/desktop-main.ts`, `src/components/desktop/`, `src/views/desktop/` | Theme values are declared directly in the Vuetify setup, with additional Sass overrides. |
| Mobile UI | Framework7 9 with the iOS theme | `src/mobile-main.ts`, `src/MobileApp.vue`, `src/components/mobile/`, `src/views/mobile/` | LTR and RTL Framework7 bundles are built separately. Framework7 CSS variables provide most primitive styling. |
| Shared UI logic | Base TypeScript modules and a small common component set | `src/components/base/`, `src/views/base/`, `src/components/common/` | Logic reuse is strong; rendered primitives remain platform-specific. |
| Routing | Vue Router on desktop and Framework7 routes on mobile | `src/router/desktop.ts`, `src/router/mobile.ts` | Routes and navigation behavior must remain unchanged during visual migration. |
| Localization | vue-i18n with JSON locale files and RTL support | `src/locales/` | New user-facing text must use existing locale conventions. |
| Charts | ECharts 6 through vue-echarts plus shared chart logic | `src/components/desktop/*Chart.vue`, `src/components/mobile/*Chart.vue`, `src/components/base/*ChartBase.ts` | Chart colors mix theme values, user preferences, and local literals. |
| Other visual libraries | Vue Datepicker, Leaflet, Swiper, Framework7 Skeleton | `src/components/common/`, `src/lib/map/`, style overrides | Third-party internals should be themed through documented variables or narrow overrides. |

### Theme implementation

The application already supports `light`, `dark`, and `auto` preferences through `ThemeType` and the settings store.

- Desktop uses Vuetify's `light` and `dark` themes and responds to `prefers-color-scheme` changes in `src/DesktopApp.vue`.
- Mobile initializes Framework7 `darkMode` from the same preference, listens for `darkModeChange`, and updates browser `theme-color` metadata in `src/MobileApp.vue`.
- The desktop dark selector is `.v-theme--dark`; the mobile dark selector is `:root.dark` / `.dark`.
- Theme preference and the mobile animation preference are stored in local storage. These behaviors are reusable and should not be rewritten.

### Styling implementation

The styling layer is Sass plus framework theme APIs and component-scoped styles.

- Desktop global styles: `src/styles/desktop/`.
- Mobile global styles: `src/styles/mobile/`.
- Vuetify compile-time settings: `src/styles/desktop/settings.scss`.
- Runtime Vuetify colors: `src/desktop-main.ts`.
- Framework7 variables and overrides: `src/styles/mobile/_variable.scss` and `src/styles/mobile/override/_framework7.scss`.
- Component-specific styles: scoped `<style>` blocks throughout Vue files.

There is a useful partial `--ebk-*` layer for desktop spacing, radii, surfaces, shadows, focus, and timing. It is not a complete semantic brand system and its values do not match the new reference. Mobile has fewer `--ebk-*` values and relies more heavily on `--f7-*` variables.

### Shared primitives and component-library use

The codebase uses library primitives directly across many screens, so changing global adapters has wide impact. A static scan found:

| Primitive | Approximate usage |
| --- | ---: |
| Desktop `v-btn` | 289 occurrences in 81 files |
| Desktop `v-card` | 204 occurrences in 45 files |
| Desktop dialogs | 45 occurrences in 43 files |
| Desktop text/select/autocomplete controls | 205 occurrences across the control types scanned |
| Desktop skeleton/progress components | 167 occurrences across the types scanned |
| Mobile Framework7 lists | 694 occurrences in 57 files |
| Mobile action-sheet elements | 264 occurrences in 22 files |
| Mobile buttons | 52 occurrences in 24 files |
| Mobile sheets | 26 occurrences in 25 files |

Reusable application-level primitives include `MainPageLayout`, one- and two-column dialog layouts, `ConfirmDialog`, `SnackBar`, amount and number inputs, selection controls, date/month pickers, item icons, mobile selection sheets, and shared chart base modules. Migration should style these extension points before editing individual screens.

### App shell and navigation

Desktop uses a fixed side navigation, top toolbar, content wrapper, and overlay navigation below a 1145px breakpoint in `MainPageLayout.vue` and `src/styles/desktop/layout/_layout.scss`. The current sidebar width is 16rem, which already fits the brand guide's 240-280px range.

Mobile uses Framework7 pages, navbars, toolbars, action sheets, popovers, and swipe-back navigation. The root application is separate from desktop and is selected by the entry document. The migration must preserve both shells and the existing option to switch experiences.

### Forms, overlays, and data surfaces

- Desktop forms primarily use Vuetify fields directly, with application wrappers for complex financial, date, icon, and color inputs.
- Mobile forms are mostly Framework7 inset lists and list inputs, with application wrappers for numeric and selection workflows.
- Desktop overlays use Vuetify dialogs and menus plus reusable dialog layouts.
- Mobile overlays use Framework7 sheets, popovers, action sheets, dialogs, and popups; escape-to-close is already configured where supported.
- Desktop transaction and management screens use Vuetify data tables.
- Mobile presents the same information as grouped lists, cards, accordions, swipe actions, and galleries.

### Loading, empty, error, and notification states

Loading states use Vuetify skeleton/progress components on desktop and Framework7 skeleton/preloader utilities on mobile. Empty states are usually page-local rows or list items containing a short message. Errors are generally surfaced through desktop snackbars/dialogs and mobile toasts/alerts. There is no unified application-level empty-state or error-state visual primitive.

### Motion

There is no separate animation library. Motion comes from Vuetify, Framework7, ECharts, Vue/CSS transitions, Swiper, and a user-controlled mobile `animate` setting. Durations are inconsistent across local styles, including 120ms, 150ms, 160ms, 180ms, 200ms, 480ms, and two-second chart skeleton fades. Only one explicit `prefers-reduced-motion` rule was found, around the desktop authentication illustration.

### Responsive strategy

Responsiveness has two layers:

1. The entry page selects a dedicated desktop or mobile application.
2. Each application has internal breakpoints and adaptive behavior.

Desktop uses Vuetify breakpoint utilities and Sass media queries; the main navigation becomes an overlay below 1145px. Mobile uses Framework7's fluid layout, safe-area variables, height-based rules, and dedicated compact patterns. The code also supports RTL and multiple user-selected font sizes. Brand changes must be tested in both application entry points rather than assuming one responsive DOM.

## 2. Main inconsistencies with the new brand system

1. **Color direction:** the current functional accent is warm brown/orange (`#c67e48`), while the new system specifies functional blue and cool neutral surfaces.
2. **Two token authorities:** Vuetify theme objects and Framework7 variables define similar concepts independently. The desktop `--ebk-*` variables add a third partial layer.
3. **Incomplete semantics:** existing variables use implementation-oriented names and do not cover the complete canvas, surface, text, border, accent, chart, gradient, type, radius, shadow, spacing, and motion model.
4. **Raw visual values:** a static scan found roughly 307 hex colors, 298 `rgb`/`rgba` uses, 76 direct radius declarations, 23 direct shadows, 31 direct transition/animation declarations, and 651 font-size declarations. Some are legitimate data colors or library configuration, so each occurrence must be classified rather than mechanically replaced.
5. **Geometry mismatch:** current desktop radii are mostly 6-16px, while the new system uses 8/12/18px controls and 28-36px panels. Framework7 supplies another radius family on mobile.
6. **Typography drift:** desktop sets an Inter-first stack but globally forces normal letter spacing; mobile relies mostly on Framework7/system typography. Component-level size declarations are widespread.
7. **Motion coverage:** durations and easing are inconsistent, and reduced-motion behavior is not global.
8. **State inconsistency:** focus, hover, selected, disabled, loading, empty, and error treatments depend on the underlying framework or page-specific CSS.
9. **Chart literals:** several ECharts tooltips and series configurations use direct theme-dependent colors, while other colors are user-configurable or encode income/expense meaning.
10. **Browser/PWA chrome:** manifest and HTML metadata contain the existing orange and warm-background values; mobile updates additional hard-coded colors at runtime.

## 3. Existing components and behavior to reuse

- `ThemeType`, the saved `auto/light/dark` preference, and system-theme listeners.
- Vuetify and Framework7 theme mechanisms rather than replacing either library.
- Existing `--ebk-*` variables as temporary compatibility aliases during migration.
- `MainPageLayout` and the current desktop overlay-navigation behavior.
- Framework7 navbars, toolbars, lists, sheets, action sheets, and safe-area behavior.
- Shared base modules under `src/components/base/` and `src/views/base/`.
- Existing complex input components, dialog layouts, and selection sheets.
- ECharts component structure and chart base modules.
- User-selectable chart colors and income/expense color preferences.
- Existing i18n, RTL, keyboard event handling, escape-to-close behavior, and mobile animation preference.
- Skeleton loaders and progress indicators supplied by the component libraries.

## 4. Components that need visual refactoring

Refactoring should mean token mapping and styling changes, not rewriting component logic.

1. Theme definitions in `src/desktop-main.ts` and `src/MobileApp.vue`.
2. Desktop and mobile variable files and framework override files.
3. Global typography, focus, selection, surfaces, borders, shadows, and motion rules.
4. Buttons, fields, selects, textareas, chips, tabs, cards, and list controls.
5. Dialog layouts, dialogs, sheets, popovers, menus, snackbars, notifications, and toasts.
6. Desktop side navigation/top toolbar and mobile navbar/toolbar/tab surfaces.
7. Data tables, grouped mobile lists, cards, filters, and pagination.
8. Loading, empty, error, validation, and disabled states.
9. Chart frames, grids, tooltips, legends, skeletons, and default series palettes.
10. Authentication and unlock surfaces.
11. High-traffic overview, transaction, account, and settings screens after their primitives are stable.
12. PWA/browser metadata and visible Spendly identity after the token foundations are available.

## 5. Theme and token migration strategy

### Canonical source and generated runtime artifacts

`design-tokens.v3.generic.json` remains the canonical value source. The first implementation issue should add a small dependency-free generator that produces committed runtime artifacts:

- a CSS custom-property file for semantic color, type, spacing, radius, shadow, layout, and motion tokens;
- a TypeScript theme artifact for the Vuetify and Framework7 values that must exist before CSS is evaluated;
- a verification mode that fails when generated artifacts are stale.

Raw values should appear in the source JSON and generated artifacts only. Components and framework adapters should reference semantic names.

### Token naming and compatibility

Use stable semantic names such as:

- `--brand-color-bg-canvas`
- `--brand-color-surface-default`
- `--brand-color-text-primary`
- `--brand-color-border-subtle`
- `--brand-color-accent-primary`
- `--brand-radius-control`
- `--brand-radius-card`
- `--brand-shadow-surface`
- `--brand-space-4`
- `--brand-motion-duration-base`
- `--brand-motion-easing-standard`

During migration, map existing `--ebk-*`, Vuetify, and Framework7 variables to semantic brand tokens. Remove aliases only after all consumers have moved. Do not mass-replace raw values without checking whether they represent user data, chart semantics, map tiles, browser requirements, or third-party APIs.

### Framework adapters

- Vuetify: move theme assembly out of `desktop-main.ts` and map Vuetify color roles, state opacities, fields, buttons, cards, tabs, tables, dialogs, and tooltips to generated semantic values.
- Framework7: map theme, page, list, control, navbar, toolbar, sheet, popup, dialog, chip, notification, and skeleton variables to the shared semantic layer.
- Vue Datepicker and other third-party components: use their documented variables first and keep overrides narrow.

## 6. Light and dark mode strategy

Both themes must remain complete first-class modes.

1. Preserve `auto`, `light`, and `dark` settings and the current system listeners.
2. Emit all semantic color tokens for light and dark from the same canonical JSON.
3. Apply dark tokens through both `.v-theme--dark` and `:root.dark` without requiring component-specific color branching.
4. Use theme-aware browser metadata where technically possible.
5. Verify contrast for text, focus, borders, disabled states, feedback colors, and chart tooltips in both themes.
6. Avoid simple inversion; use the defined dark canvas, raised surfaces, borders, and brighter accents.
7. Keep user-selected transaction, category, widget, and chart colors functional, with contrast helpers where already provided.

## 7. Motion strategy

1. Generate fast (120ms), base (220ms), and slow (420ms) duration tokens plus standard/enter/exit easing tokens.
2. Map local hover, navigation, modal, drawer, and reveal transitions to those tokens.
3. Preserve Framework7/Vuetify dismissal and navigation behavior.
4. Keep ECharts animation functional but disable or shorten it when reduced motion is requested.
5. Add a global `prefers-reduced-motion: reduce` layer that removes spatial transforms, continuous animation, and smooth scrolling while retaining necessary state feedback.
6. Continue honoring the existing mobile animation setting; reduced motion must take precedence.
7. Avoid adding decorative animation until functional state transitions are consistent.

## 8. Responsive considerations

- Test both `desktop.html` and `mobile.html`; they are separate applications.
- Preserve the 1145px desktop navigation breakpoint unless a dedicated shell issue demonstrates a concrete reason to change it.
- Preserve Framework7 safe-area handling, swipe-back behavior, height-based login adjustments, and RTL bundles.
- Keep hit targets at least as large as the existing controls and target the brand system's 44-48px defaults where density permits.
- Ensure large card radii and padding do not reduce usable space on narrow screens.
- Verify all supported application font-size settings, text wrapping, long translations, and 320px minimum width.
- Keep dense financial tables on desktop and task-appropriate list/card representations on mobile.

## 9. Accessibility considerations

1. Preserve native/library keyboard behavior and current `Enter`, `Escape`, focus, and swipe/dismiss flows.
2. Replace the global removal of visible focus with a consistent semantic `:focus-visible` treatment for custom and library controls.
3. Require accessible names for icon-only controls and decorative graphics to remain hidden from assistive technology.
4. Do not communicate financial or validation state through color alone.
5. Validate light/dark contrast for text, controls, focus rings, borders, charts, and disabled states.
6. Respect `prefers-reduced-motion` and the explicit animation preference.
7. Preserve logical properties and RTL behavior when changing spacing, borders, or transforms.
8. Avoid removing labels or replacing them with placeholder-only controls.
9. Treat the entry document's zoom restrictions and the mobile `user-select` policy as explicit later accessibility debt; changing them needs behavioral testing beyond a token PR.

The current branch contains relatively few explicit ARIA/role declarations compared with its number of icon controls. Upstream also has pending accessibility changes. Synchronize upstream before a broad accessibility pass so work is not duplicated or lost.

## 10. Recommended migration order

The published GitHub issues and their repository copies under `issues/` define the reviewable units and dependencies.

| Order | Issue | Depends on |
| ---: | --- | --- |
| 1 | [Generate shared semantic brand tokens](https://github.com/LuisUmina/Spendly/issues/1) | None |
| 2 | [Map the desktop Vuetify theme](https://github.com/LuisUmina/Spendly/issues/2) | 1 |
| 3 | [Map the mobile Framework7 theme](https://github.com/LuisUmina/Spendly/issues/3) | 1 |
| 4 | [Align typography, focus, and reduced-motion foundations](https://github.com/LuisUmina/Spendly/issues/4) | 1-3 |
| 5 | [Migrate desktop form and control primitives](https://github.com/LuisUmina/Spendly/issues/5) | 2, 4 |
| 6 | [Migrate mobile form and control primitives](https://github.com/LuisUmina/Spendly/issues/6) | 3, 4 |
| 7 | [Migrate overlays and notifications](https://github.com/LuisUmina/Spendly/issues/7) | 5, 6 |
| 8 | [Brand the desktop app shell and navigation](https://github.com/LuisUmina/Spendly/issues/8) | 2, 4, 5 |
| 9 | [Brand the mobile app shell and navigation](https://github.com/LuisUmina/Spendly/issues/9) | 3, 4, 6 |
| 10 | [Migrate tables, lists, and data surfaces](https://github.com/LuisUmina/Spendly/issues/10) | 5, 6, 8, 9 |
| 11 | [Standardize loading, empty, error, and disabled states](https://github.com/LuisUmina/Spendly/issues/11) | 7, 10 |
| 12 | [Migrate charts and visualizations](https://github.com/LuisUmina/Spendly/issues/12) | 1-4 |
| 13 | [Brand authentication and unlock flows](https://github.com/LuisUmina/Spendly/issues/13) | 5-7 |
| 14 | [Brand overview dashboards and widgets](https://github.com/LuisUmina/Spendly/issues/14) | 8-12 |
| 15 | [Brand transaction workflows](https://github.com/LuisUmina/Spendly/issues/15) | 7, 10-12 |
| 16 | [Brand account, category, tag, and template workflows](https://github.com/LuisUmina/Spendly/issues/16) | 7, 10, 11 |
| 17 | [Brand settings, profile, and data-management workflows](https://github.com/LuisUmina/Spendly/issues/17) | 7, 10, 11 |
| 18 | [Align PWA metadata, browser chrome, and visible Spendly identity](https://github.com/LuisUmina/Spendly/issues/18) | 1, 3 |
| 19 | [Complete cross-theme visual regression and debt review](https://github.com/LuisUmina/Spendly/issues/19) | 13-18 |

Issues 2 and 3 may proceed in parallel after issue 1. Issues 5 and 6 may proceed in parallel after issue 4. Screen issues should not begin until the relevant primitives and shells are stable.

## 11. Risks

### Upstream drift

At audit time, `personal` contains fork-specific deployment/documentation commits on top of upstream commit `4ac3b726`, while `upstream/main` is 51 commits ahead and changes 224 files, mostly frontend files. The fork-specific files do not overlap those changes, but a brand implementation against the old UI would create avoidable conflicts. The adopted branch policy is that `main` mirrors `upstream/main` exactly and all fork work lives on `personal`. Before issue 1, fast-forward `main` to upstream, then integrate that exact mainline into `personal` and complete verification before any push that would deploy it.

### Broad framework blast radius

Vuetify and Framework7 primitives are used directly in many screens. Small global changes can affect hundreds of components. Each foundation PR needs representative screenshots and targeted page coverage.

### Dual application parity

Desktop and mobile are separate rendered applications. A successful change in one does not imply parity in the other.

### Token duplication

Hand-maintained CSS and TypeScript copies would drift. Generated committed artifacts plus a stale-output check reduce this risk.

### Data and user-configurable colors

Category, account, chart, widget, expense, and income colors can carry user meaning. Mechanical replacement would be a functional regression.

### Contrast and density

The target's softer borders and large radii can reduce clarity or space in dense financial workflows. Accessibility and data density take priority over decorative fidelity.

### Third-party overrides

Deep Vuetify, Framework7, Vue Datepicker, ECharts, or Leaflet selectors can break after upstream dependency updates. Prefer documented theme APIs and variables.

### Product identity boundary

The visible product name on `personal` will become Spendly in issue 18. The Go module, package name, binary, configuration file, Docker paths, and other upstream-facing technical identifiers will remain ezBookkeeping to protect upstream compatibility. No new logo artwork should be invented during the UI migration; existing artwork remains until a separate asset brief is approved.

## 12. Visual debt intentionally left for later

The following should remain until their dependent issue or an explicit separate decision:

- Replacement logo, favicon, touch-icon, splash-screen, and application-store artwork until a dedicated Spendly asset brief is approved. Issue 18 may update visible text, metadata, and semantic theme colors while documenting retained legacy artwork.
- User-selected account/category/tag colors and overview-widget backgrounds.
- User-configurable chart palettes and income/expense color preferences.
- Map provider tiles and third-party map attribution styling.
- Low-traffic import/export format previews and document iframe content until their shared primitives migrate.
- Exact styling of third-party internals that have no supported theme variable.
- A change to viewport zoom restrictions or mobile text-selection behavior.
- Broad information-architecture changes, navigation regrouping, or new product copy.
- Removal of compatibility aliases before every consumer has migrated.
- Full WCAG certification; each issue still must meet its scoped accessibility criteria.

## Validation required for every implementation issue

- Run `npm run test`.
- Run type checking and linting. Because the existing `npm run lint` applies fixes, inspect the diff immediately afterward and remove unrelated formatting changes.
- Verify the affected surfaces in light and dark modes.
- Verify the affected desktop and mobile/responsive states.
- Verify keyboard focus and dismissal behavior where applicable.
- Verify `prefers-reduced-motion` where motion is present.
- Review screenshots against the canonical visual style guide.
- Confirm that no business logic, routes, API contracts, or persistence behavior changed intentionally.
- Review `git status` and `git diff` for unrelated changes and secrets before committing.

## Decisions adopted before implementation

1. **Branch and upstream policy:** `main` is an exact mirror of `upstream/main`; `personal` is the working and deployed fork branch. Synchronize `main` first, integrate it into `personal`, verify, and only then push the deployed branch.
2. **Product identity:** visible user-facing identity on `personal` will become Spendly in issue 18. Preserve the Go module, package name, binary, configuration file, Docker paths, and other upstream-facing identifiers as ezBookkeeping. Keep current artwork until a separate Spendly asset brief is approved.
3. **Token artifacts:** use a dependency-free generator with committed CSS and TypeScript outputs plus a stale-output verification command. The canonical values remain `design-tokens.v3.generic.json`.
