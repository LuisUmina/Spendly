# Generic Technical Branding System v0.3

## Purpose
This guide is intentionally **project-agnostic**.

It is designed to be reused across future products, forks, dashboards, consumer apps, developer tools, internal tools, AI apps, and self-hosted applications.

It should help both:
- **humans** making branding and product decisions
- **coding agents** executing a visual rebrand consistently

## Core concept
**Quiet interfaces. Bold moments.**

The system has two layers:

1. **Default interface layer**
   - clean
   - calm
   - minimal
   - structured
   - highly readable

2. **Brand moment layer**
   - halos
   - dark showcase surfaces
   - subtle spectral accents
   - polished motion
   - visual emphasis at intentional moments only

## What this system is not
- It is **not** tied to any single product.
- It is **not** a clone of Apple or any modern AI product.
- It is **not** a decorative style guide built only for marketing pages.
- It is **not** only about colors; it defines spacing, component form, motion, layout behavior, and implementation rules.

## Brand personality
- Premium
- Minimal
- Technical
- Calm
- Confident
- Polished
- Slightly futuristic

## Design principles
1. Use whitespace before ornament.
2. Use scale and hierarchy before saturation.
3. Use semantic tokens before raw hex values.
4. Make light and dark mode equally intentional.
5. Make motion meaningful and restrained.
6. Make components feel soft and premium, not playful.
7. Treat accessibility as a design requirement.
8. Keep visual noise low.
9. Use one dominant focal point per screen.
10. Favor clarity over novelty.

## Themes
### Light theme
The default theme for most products.

Best for:
- productivity apps
- forms
- dashboards
- content-heavy interfaces
- tables
- analytics
- documentation-like workflows

Characteristics:
- white or near-white canvas
- soft gray support surfaces
- near-black typography
- subtle borders
- very restrained shadows

### Dark theme
A first-class theme, not just inversion.

Best for:
- focused work surfaces
- AI tools
- code views
- command centers
- immersive dashboards
- media or showcase sections

Characteristics:
- near-black or charcoal backgrounds
- soft contrast, not overly harsh white
- elevated surfaces separated by subtle borders
- slightly brighter accents for clarity
- carefully controlled chart colors

## Color system
### Neutral foundation
Use the UI mostly in:
- white
- soft gray
- near-black
- cool neutral text tones

### Functional accent
Blue is the main interaction color.

Use it for:
- links
- active states
- selected states
- focus indicators
- important controls
- progress or live states where appropriate

### Decorative spectrum
A secondary decorative palette exists:
- cyan
- violet
- magenta
- orange

Use these for:
- gradients
- halos
- particles
- hero accents
- visualizations
- rare emphasis moments

Do not use them as the default fill for everything.

### Semantic colors
Use semantic colors carefully:
- success
- warning
- danger

These should signal state, not brand identity.

## Typography
### Primary font
Use Inter or a similar modern sans-serif with good readability.

Fallback stack should include:
- system sans-serif
- Apple system stack
- Segoe UI equivalents

### Monospace
Use monospace only for:
- code
- logs
- terminal surfaces
- shortcuts
- metadata

### Hierarchy
- Display text should feel large and premium.
- Headings should use medium/semibold feeling, not ultra-heavy black.
- Body copy should remain extremely readable.
- Avoid long blocks of low-contrast text.
- Avoid all caps except tiny labels.

## Shape language
The visual geometry should feel:
- soft
- precise
- modern
- expensive
- restrained

Recommended radius ranges:
- tiny controls: 8px
- standard controls: 12–18px
- cards/panels: 24–32px
- showcase blocks: 28–40px
- buttons: pill or near-pill

Do not mix too many radius families.

## Spacing system
Use a clear spacing rhythm:
- 4
- 8
- 12
- 16
- 20
- 24
- 32
- 40
- 48
- 64
- 80
- 96
- 128

Spacing should create hierarchy.
Do not depend on lines, dividers, or shadows to compensate for cramped layouts.

## Layout system
### Containers
- Max canvas width: ~1440px
- Main content width: ~1180px
- Responsive gutter: 20–64px

### Navigation
Use:
- top nav for sites, simple apps, or marketing pages
- side nav for dashboard or app shells

### Screen composition
Default structure:
- one clear page title
- one short supporting paragraph if needed
- one obvious primary action
- one primary content region
- secondary content grouped below or beside it

### Density strategy
Keep most interfaces calm.
If a workflow is naturally dense, preserve clarity with:
- strong headings
- spacing
- sticky headers if needed
- subtle grouping
- short labels

## Graphics and visual language
### Recommended visual motifs
- radial halos
- sparse particles
- dot fields
- rings
- orbital compositions
- rounded product mockups
- gentle glows
- clean code/terminal windows
- simple charts with restrained color

### What to avoid
- noisy background graphics everywhere
- too many gradients
- glassmorphism on every surface
- over-decorated dashboards
- cartoonish icons
- giant shadows
- multi-color buttons as defaults

## Component guidance

## Buttons
Primary:
- near-black in light theme
- light/inverse in dark theme

Secondary:
- neutral, subtle border

Blue:
- use selectively when interactive emphasis is helpful

Danger:
- reserved for destructive actions

Rules:
- pill or near-pill
- comfortable height
- clear hover, focus, active, disabled states

## Inputs
- subtle border
- comfortable height
- very visible focus ring
- placeholder text lighter than actual input
- no heavy shadows

## Cards and panels
Use a card only when it creates meaningful grouping.
Do not wrap every small block in a separate card.

Card traits:
- large radius
- subtle boundary
- light padding
- minimal decoration

## Tables
- subtle row separators
- calm hover states
- sticky headers where appropriate
- avoid heavy zebra striping unless density requires it
- align numeric content clearly
- reserve semantic colors for meaningful values only

## Navigation components
- keep icons minimal
- use labels that are easy to scan
- active states should be visually clear
- do not overload the sidebar with unnecessary decoration

## Tabs
- pill or soft segmented style
- strong selected state
- clear keyboard focus

## Modals
- strong title
- concise content
- one primary action
- optional one secondary action
- avoid huge walls of text

## Empty states
Should include:
- a short title
- one short explanation
- one primary next step
- optional illustration or abstract visual

## Toasts and alerts
- concise
- semantic
- non-intrusive
- accessible
- easy to dismiss when needed

## Charts and data visualization
Charts must support decision-making, not just aesthetics.

### General chart rules
- use no more than 4–6 active series colors unless absolutely necessary
- keep grids subtle
- label clearly
- favor legibility over visual novelty
- do not use gradients as the main stroke/fill for analytical charts
- use semantic colors only when meaning depends on status

### Recommended chart types
- line chart
- area chart
- grouped bars
- stacked bars
- donut chart
- progress bars
- sparklines
- heatmaps

### Default chart behavior
- light theme: softer grid lines, strong labels
- dark theme: muted grid, clear lines, careful contrast
- legends only when necessary
- highlight one key insight instead of over-coloring all series

## Motion and animation
Motion should feel polished and fast.

### Durations
- hover: ~120ms
- standard UI change: ~220ms
- larger reveal: up to ~420ms

### Use motion for
- hover response
- content reveal
- modal entry
- drawer transitions
- loading state feedback
- progressive disclosure

### Avoid
- large parallax in product UIs
- excessive bouncing
- theatrical transitions
- motion that delays task completion

### Reduced motion
Always support `prefers-reduced-motion`.
If motion is reduced:
- remove spatial movement
- keep instant or fade-based transitions
- keep information hierarchy intact

## Accessibility
Every implementation must include:
- accessible text contrast
- visible keyboard focus
- meaningful hover/focus/disabled states
- sufficiently large hit targets
- readable type sizes
- non-color-dependent status communication

## Implementation rules for coding agents
1. Preserve existing functionality.
2. Preserve information architecture unless the task explicitly includes UX restructuring.
3. Add semantic tokens first.
4. Implement light and dark themes globally.
5. Rebrand shared primitives before rebranding individual pages.
6. Remove raw hard-coded colors when a token exists.
7. Use one radius family consistently.
8. Respect responsive layouts.
9. Respect reduced motion.
10. Produce a migration summary after applying the rebrand.

## Recommended implementation order
1. theme tokens
2. typography
3. spacing and radius
4. button
5. input / select / textarea
6. card / panel
7. nav / sidebar / tabs
8. modal / drawer / toast
9. table
10. charts
11. app shell
12. highest-traffic screens
13. remaining visual debt

## Acceptance checklist
A rebrand is successful if:
- it works for any future project
- it is not tied to a specific product name
- both light and dark theme exist
- semantic tokens are used consistently
- component shapes are consistent
- chart usage is restrained and readable
- motion is subtle and intentional
- accessibility is preserved
- the interface feels premium, technical, and calm
