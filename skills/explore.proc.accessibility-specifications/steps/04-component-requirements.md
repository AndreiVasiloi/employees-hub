# Step 4: Define Component-Level Requirements

## Objective

For each component type used in the wireframes, specify accessibility behavior including keyboard interaction, focus management, ARIA semantics, and screen reader announcements.

## Entry Criteria

- [ ] Step 3 (Cross-Cutting Requirements) complete with confirmed requirements
- [ ] Components identified from wireframes

## Actions

### 4.1 Identify Components

Present the component list for confirmation:

```
Component-Level Accessibility Requirements

I'll specify requirements for each component type used in the wireframes:

**Components identified**:
- [Navigation (global/contextual)]
- [Dialogs and drawers]
- [Tabs]
- [Menus and dropdowns]
- [Tables and data grids]
- [Search, filters, and sort]
- [Toasts, banners, and inline messaging]
- [Forms with validation]
- [Custom components - specify]

For each component, I'll document:
- Keyboard interaction patterns
- Focus management rules
- ARIA roles and properties
- Screen reader announcements
- State changes and updates

Should I proceed with all identified components, or focus on specific ones?
```

**STOP**: Wait for human to confirm component list.

### 4.2 Document Each Component

For each component, document:

```
Component: [Name]

**Keyboard interaction**:
- [Key bindings and behavior]

**Focus management**:
- [Where focus goes, when it moves]

**Semantics**:
- [ARIA roles, labels, states]

**Screen reader announcements**:
- [What is announced and when]

**States**:
- [How states are communicated]
```

### Component Reference Patterns

#### Navigation (Global and Contextual)
- Tab moves between navigation items
- Enter or Space activates links
- Arrow keys for mega menus or complex navigation
- Current location indicated with `aria-current="page"`
- Skip to main content link provided as first focusable element
- Wrapped in `<nav>` with `aria-label` if multiple navs exist

#### Dialogs and Drawers
- Tab cycles through interactive elements (focus trap)
- Escape closes dialog
- On open: focus moves to first interactive element
- On close: focus returns to triggering element
- Background content is inert
- Uses `role="dialog"` or `role="alertdialog"` with `aria-labelledby`

#### Tabs
- Arrow keys navigate between tabs
- Enter or Space activates selected tab
- Home/End move to first/last tab
- Only active tab is in tab order
- Tab list: `role="tablist"`, tabs: `role="tab"`, panels: `role="tabpanel"`

#### Menus and Dropdowns
- Trigger is a button with `aria-haspopup="menu"` and `aria-expanded`
- Arrow keys navigate menu items
- Escape closes menu and returns focus to trigger
- Menu: `role="menu"`, items: `role="menuitem"`

#### Tables and Data Grids
- Tab moves between interactive elements (row actions, sort buttons)
- Use `<table>` with proper `<thead>`, `<tbody>`, `<th>`, `<td>`
- Sortable columns indicate sort state via `aria-sort`
- Column headers have `scope="col"`, row headers have `scope="row"`

#### Search, Filters, and Sort
- Search input within `role="search"` landmark
- Filter changes don't move focus unless user-initiated
- Filter state changes announced via live region
- No-results message announced with recovery actions

#### Toasts, Banners, and Inline Messaging
- Toasts do not steal focus unless critical
- Status messages: `role="status"` or `aria-live="polite"`
- Errors: `role="alert"` or `aria-live="assertive"` (use sparingly)
- Toasts are dismissible (auto-dismiss or manual)

## Exit Criteria

- [ ] All component types identified and confirmed
- [ ] Keyboard interaction documented for each component
- [ ] Focus management rules defined for each component
- [ ] ARIA semantics specified for each component
- [ ] Screen reader announcements defined for each component

## Next Step

→ [05-state-and-messaging.md](./05-state-and-messaging.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.accessibility-specifications:0.1.2:2026-09-01T07:59:41Z -->
