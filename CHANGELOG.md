Release 300 (2015-04-27)
------------------------

### New features

- T1455: Added a new customized menu for tablets
- T1475: Added sorting and a filter to `Variables` in the `Add/edit component` view
- T1464: Added a reload button for report components that have failed to load its data
- T1543: Implemented a new loading indicator to allow for a more responsive behavior
- T1478: Added the ability for super users to create new organizations
- T1417: Moved the `Edit variables` view into its own page
- T1497: Implemented logic to make `Cancel` (`Back`, `Done`) return to the previous known state/page
- T1517: Changed so that values are shown as a tooltip in the heatmap component
- T1442: Added support for manual variables with any, non system standard, resolution
- T1482: Improved components data consistency by clearing old data
- T1466: Improved the way we present values with a lot of decimals

### Performance improvements

- T1548: Improved performance of all common components using the `PureRenderMixin`
- T1463: Improved performance of the heatmap component

### Bug fixes

- T1513: Fixed the error message when no reports are found for the report filter
- T1471: Fixed a bug that prevented organizations with only one level to show up
- T1443: Fixed the placeholder visualization for tables
- T1484: Improved destinction between touch and mouse on different devices
- T1360: Improved login logic to adress a few edge case bugs
- T1432: Fixed a few bugs that causes tables to not align headers with data
- T1505: Fixed incorrect wrapping of buttons under Internet Explorer 11
- T1507: Fixed visual glitch in filter elements under Internet Explorer 11
- T1495: Fixed incorrect replacement in formula based variables
- T1400: Fixed a bug preventing correct deletion of parent group
- T1424: Fixed incorrect representation of report name while switching to another report
- T1483: Removed unnessecary scrollbars
- T1493: Fixed a bug that prevented saving of reports

### Refactoring

- T1539: Made the sidebar into a common component
- T1448: Optimized data structure sent to the API

### Related tasks

- T1119: Deployed the styleguide app
- T1556: Fixed build logic to make sure that static assets are loaded (styleguide app)
