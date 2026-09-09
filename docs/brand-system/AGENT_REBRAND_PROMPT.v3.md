# Agent Rebrand Prompt v0.3

Read these files first:
- BRAND_GUIDE.v3.generic.md
- COMPONENT_SPEC.v3.md
- MOTION_SPEC.v3.md
- design-tokens.v3.generic.json

Then rebrand the target application according to this generic branding system.

Requirements:
1. This is a visual and UX/UI rebrand, not a business-logic rewrite.
2. Preserve all existing functionality and routes.
3. Preserve information architecture unless explicitly told to redesign it.
4. Implement both light and dark themes.
5. Introduce semantic tokens globally.
6. Rebrand primitives before individual pages.
7. Remove hard-coded colors, radii, spacing, and shadows where tokens exist.
8. Keep charts restrained and readable.
9. Support accessibility and prefers-reduced-motion.
10. Return a summary of changes, token mapping, components migrated, and remaining visual debt.

Suggested implementation order:
1. Theme and tokens
2. Typography / spacing / radius
3. Buttons, inputs, cards
4. Navigation, tabs, modals, tables
5. Charts and data surfaces
6. App shell
7. High-traffic pages
8. Remaining cleanup

Visual target:
- premium
- minimal
- technical
- calm
- soft rounded geometry
- whitespace-driven layouts
- subtle borders
- dark showcase surfaces
- blue functional accent
- spectral decorative accents only when appropriate
