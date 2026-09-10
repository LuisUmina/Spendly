# Brand Token Runtime Layer

`design-tokens.v3.generic.json` is the only hand-edited source for brand values. The runtime files derived from it are committed so the CSS and framework theme setup use the same versioned values without adding a token dependency.

## Commands

- `npm run brand:tokens` regenerates the runtime artifacts.
- `npm run brand:tokens:check` compares the committed artifacts with the canonical JSON and exits with an error when they are missing or stale.

Run both commands from the repository root. Generated files include their source path and source version; do not edit them directly.

## Generated artifacts

- `src/styles/brand/tokens.generated.css` exposes CSS custom properties for light and dark colors and shadows, plus shared typography, spacing, radius, layout, motion, and component values.
- `src/themes/brand-tokens.generated.ts` exposes structured theme and shared values for framework configuration that runs before application CSS is available.

The CSS defines shared values on `:root`. Light values are available on `:root` and `.v-theme--light`; dark values override them on `:root.dark` and `.v-theme--dark`. Issue #1 does not import the CSS or TypeScript artifact, so it does not change the rendered application.

## Naming

Names describe purpose and retain the hierarchy of the canonical JSON:

- Colors: `--brand-color-<group>-<role>`
- Typography: `--brand-font-family-<role>` and `--brand-type-<role>-<property>`
- Spacing and geometry: `--brand-space-<step>` and `--brand-radius-<role>`
- Shadows and layout: `--brand-shadow-<role>` and `--brand-layout-<role>`
- Motion: `--brand-motion-duration-<role>`, `--brand-motion-easing-<role>`, and `--brand-motion-pattern-<role>`
- Components: `--brand-component-<component>-<property>`

Camel-case source keys become kebab-case CSS segments. The TypeScript exports retain the source structure and key casing.

## Theme and accessibility validation

Generation fails when the light and dark theme paths differ or when their shadow roles do not match. It also checks primary text on canvas and default surfaces, inverse text on its intended background, and the focus color on canvas and default surfaces. Text pairs must meet a 4.5:1 contrast ratio and focus pairs must meet 3:1.

## Compatibility aliases

Existing `--ebk-*` variables remain unchanged until the desktop and mobile theme migration issues map them to semantic brand tokens. A compatibility alias should reference a `--brand-*` token instead of copying its raw value. Keep an alias while any current consumer needs it and remove it only in a later focused issue after usage reaches zero.
