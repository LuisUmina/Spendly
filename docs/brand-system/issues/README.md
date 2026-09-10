# Branding Issues

These documents are the repository copies of the published, dependency-aware GitHub issues. Keep each issue limited to one focused pull request and preserve the scope and dependency sections when implementation begins.

| Issue | Repository draft | Dependencies |
| ---: | --- | --- |
| [#1](https://github.com/LuisUmina/Spendly/issues/1) | [Generate shared semantic brand tokens](01-semantic-brand-tokens.md) | None |
| [#2](https://github.com/LuisUmina/Spendly/issues/2) | [Map the desktop Vuetify theme to semantic tokens](02-desktop-vuetify-theme.md) | #1 |
| [#3](https://github.com/LuisUmina/Spendly/issues/3) | [Map the mobile Framework7 theme to semantic tokens](03-mobile-framework7-theme.md) | #1 |
| [#4](https://github.com/LuisUmina/Spendly/issues/4) | [Align global typography, focus, and reduced-motion foundations](04-typography-focus-motion.md) | #1-#3 |
| [#5](https://github.com/LuisUmina/Spendly/issues/5) | [Migrate desktop form and control primitives](05-desktop-controls.md) | #2, #4 |
| [#6](https://github.com/LuisUmina/Spendly/issues/6) | [Migrate mobile form and control primitives](06-mobile-controls.md) | #3, #4 |
| [#7](https://github.com/LuisUmina/Spendly/issues/7) | [Migrate overlays and notifications](07-overlays-notifications.md) | #5, #6 |
| [#8](https://github.com/LuisUmina/Spendly/issues/8) | [Brand the desktop app shell and navigation](08-desktop-app-shell.md) | #2, #4, #5 |
| [#9](https://github.com/LuisUmina/Spendly/issues/9) | [Brand the mobile app shell and navigation](09-mobile-app-shell.md) | #3, #4, #6 |
| [#10](https://github.com/LuisUmina/Spendly/issues/10) | [Migrate tables, lists, and data surfaces](10-data-surfaces.md) | #5, #6, #8, #9 |
| [#11](https://github.com/LuisUmina/Spendly/issues/11) | [Standardize loading, empty, error, and disabled states](11-feedback-states.md) | #7, #10 |
| [#12](https://github.com/LuisUmina/Spendly/issues/12) | [Migrate charts and visualizations](12-charts-visualizations.md) | #1-#4 |
| [#13](https://github.com/LuisUmina/Spendly/issues/13) | [Brand authentication and unlock flows](13-authentication-surfaces.md) | #5-#7 |
| [#14](https://github.com/LuisUmina/Spendly/issues/14) | [Brand overview dashboards and widgets](14-overview-dashboards.md) | #8-#12 |
| [#15](https://github.com/LuisUmina/Spendly/issues/15) | [Brand transaction workflows](15-transaction-workflows.md) | #7, #10-#12 |
| [#16](https://github.com/LuisUmina/Spendly/issues/16) | [Brand account, category, tag, and template workflows](16-account-taxonomy-workflows.md) | #7, #10, #11 |
| [#17](https://github.com/LuisUmina/Spendly/issues/17) | [Brand settings, profile, and data-management workflows](17-settings-profile-data-management.md) | #7, #10, #11 |
| [#18](https://github.com/LuisUmina/Spendly/issues/18) | [Align PWA metadata, browser chrome, and visible Spendly identity](18-pwa-browser-identity.md) | #1, #3 |
| [#19](https://github.com/LuisUmina/Spendly/issues/19) | [Complete cross-theme visual regression and debt review](19-final-visual-regression-review.md) | #13-#18 |

## Dependency flow

```text
#1 Tokens
|-- #2 Desktop theme -- #5 Desktop controls -- #7 Overlays
|                                           |-- #8 Desktop shell
|                                           `-- #10 Data surfaces
|-- #3 Mobile theme ---- #6 Mobile controls --- #7 Overlays
|                                           |-- #9 Mobile shell
|                                           `-- #10 Data surfaces
`-- #4 Type, focus, motion (after #2 and #3) -- #12 Charts

#7 + #10       -> #11 Feedback states
#8-#12         -> #14 Overview
#7 + #10-#12   -> #15 Transactions
#7 + #10-#11   -> #16 Accounts/categories/tags/templates
#7 + #10-#11   -> #17 Settings/profile/data management
#1 + #3        -> #18 PWA and visible Spendly identity
#13-#18        -> #19 Final visual regression review
```

The recommended first implementation issue is [#1: Generate shared semantic brand tokens](https://github.com/LuisUmina/Spendly/issues/1).
