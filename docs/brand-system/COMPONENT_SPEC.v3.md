# Generic Component Specification v0.3

## Goal
This file defines how common components should look and behave so a coding agent can rebrand any product consistently.

## 1. App shell
### Desktop
- Optional top bar or left sidebar
- Main content on a calm surface
- Sidebar width around 240–280px
- Do not create unnecessary multiple nested background panels

### Mobile
- Simplify hierarchy
- Reduce columns to single-column layouts
- Keep primary action reachable
- Move secondary navigation into bottom nav, sheet, or compact menu when needed

## 2. Buttons
### Variants
- primary
- secondary
- ghost
- blue
- danger

### States
- default
- hover
- active
- focus-visible
- disabled
- loading

### Rules
- Button labels should be short
- Maintain consistent height
- Keep icon spacing tight and clean

## 3. Input family
Includes:
- text input
- textarea
- select
- combobox
- search
- number input

Rules:
- 48px control height as default
- 14–16px radius
- subtle border
- visible focus ring
- no aggressive inset shadows

## 4. Badges and chips
Use for:
- state
- filters
- categories
- counts
- tags

Rules:
- pill radius
- compact sizing
- color should be meaningful, not random

## 5. Cards
Use only when a real grouping exists.

Variants:
- summary card
- content card
- data card
- media card
- utility card

Rules:
- consistent radius
- soft boundary
- large enough padding
- avoid stacking too many nested cards

## 6. Tables
Required behavior:
- readable headers
- subtle separators
- hover state
- row selection state if applicable
- compact but readable density
- good empty state

## 7. Charts
Required behavior:
- titles and labels clear
- legend only when needed
- tooltips readable in both themes
- highlight the main insight
- avoid rainbow palettes

## 8. Navigation
### Sidebar
- clear active state
- subtle section grouping
- minimal icons
- optional collapse behavior

### Top navigation
- light chrome
- low noise
- clear action grouping

## 9. Modals and drawers
- clear purpose
- single primary action
- dismiss behavior clear
- body content scrolls if needed
- preserve accessibility

## 10. Notifications
### Toasts
- short
- temporary
- semantic but not alarming by default

### Alerts
- more persistent
- used when the user must be informed clearly

## 11. Empty states
Structure:
- title
- short message
- CTA
- optional simple illustration or abstract graphic

## 12. Loading states
Preferred:
- skeletons
- subtle shimmer
- progress bar when meaningful
- calm spinner only when necessary

## 13. AI / code / technical surfaces
Use dark surfaces for:
- logs
- terminals
- code generation previews
- agent run traces
- technical status panes

Traits:
- minimal chrome
- monospace
- strong contrast
- restrained color accents

## 14. Forms
- group fields meaningfully
- keep labels visible
- helper text subtle
- validation messages clear
- do not overwhelm with too many columns on smaller screens

## 15. Responsive behavior
- Desktop may use grids
- Tablet should simplify grouping
- Mobile should collapse to linear flow
- Do not merely shrink desktop; rethink density and hierarchy
