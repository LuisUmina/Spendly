# Align PWA metadata, browser chrome, and visible Spendly identity

Suggested labels: `branding`, `frontend`, `ux`

## Objective

Apply semantic theme colors to install/browser surfaces and change the visible user-facing identity on `personal` to Spendly while preserving upstream-facing technical identifiers.

## Dependencies

- Branding issues [#1](https://github.com/LuisUmina/Spendly/issues/1) and [#3](https://github.com/LuisUmina/Spendly/issues/3).

## Scope

- Map manifest theme/background colors and HTML theme-color metadata to the approved brand roles.
- Audit favicon, touch icon, PWA icons, splash images, logo paths, application titles, and notification logos.
- Update visible UI titles, metadata, and install names to Spendly on `personal`.
- Retain current artwork and document it as visual debt until a separate Spendly asset brief is approved.
- Preserve upstream module, package, binary, configuration, and Docker paths unless separately and explicitly authorized.

## Files and components likely affected

- `vite.config.ts`
- `src/index.html`, `src/desktop.html`, `src/mobile.html`
- `src/MobileApp.vue`
- `src/consts/asset.ts`
- Approved assets under `public/`

## Explicit non-goals

- Do not rename the Go module, binary, `package.json`, configuration file, Docker paths, or internal identifiers.
- Do not create, recolor, or replace logo artwork without an approved Spendly asset brief.
- Do not change routing, service-worker strategy, share target, or install behavior.

## Light mode requirements

Installed/browser chrome uses the canonical light canvas and approved accent without flashes of legacy color.

## Dark mode requirements

Runtime browser chrome uses the canonical dark canvas and approved accent where platform APIs support it.

## Accessibility requirements

- Provide meaningful image alternatives where logos convey identity and hide decorative duplicates.
- Maintain readable splash/browser chrome contrast.
- Do not remove zoom, install, or service-worker behavior in this issue.

## Acceptance criteria

- Manifest and runtime theme colors use the semantic brand mapping.
- User-facing titles and install metadata use Spendly while protected technical identifiers remain ezBookkeeping.
- Existing artwork remains functional and its planned replacement is recorded as visual debt.
- PWA install, launch, share target, service worker, notifications, and icons remain functional.
- No protected internal identifier changes occur without explicit authorization.
- No stale legacy theme color remains in the touched metadata paths.

## Screenshots and visual verification

- Capture browser chrome and installed/standalone launch in light and dark where supported.
- Verify desktop favicon/title and mobile home-screen/install surfaces.
- Document platform limitations for dynamic manifest colors and splash screens.

## Tests and checks

- Run `npm run test`.
- Run TypeScript checking and ESLint.
- Build the frontend and inspect the generated manifest.
- Run a PWA audit and smoke-test installation/service-worker registration where tooling permits.

## Business-logic confirmation

The pull request must state that no business logic was intentionally changed and identify any unavoidable non-visual change before review.
