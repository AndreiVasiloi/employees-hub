+++
template_name = "Accessibility Specifications Template"
version = "1.0"
output_format = "explore/design/accessibility-[slug].md"
validation_required = true
+++

# Accessibility Specifications: {Project Name}

**Project**: {project-name}  
**Created**: {YYYY-MM-DD}  
**Last Updated**: {YYYY-MM-DD}  
**Status**: Draft | In Review | Approved

---

## 1. Snapshot

### Objective
{Why this spec exists and what it will be used for - e.g., "Define accessibility requirements for the core user flows to ensure WCAG 2.2 AA compliance before development begins"}

### Scope

**In scope**:
- {Feature/flow/screen 1}
- {Feature/flow/screen 2}
- {Feature/flow/screen 3}

**Out of scope**:
- {Feature/flow/screen 1 - explicitly excluded}
- {Feature/flow/screen 2 - explicitly excluded}

### References
- **Wireframes**: {Link or location - e.g., `explore/design/wireframes-[slug].md`}
- **Interaction spec** (if any): {Link or location}
- **Design system**: {Link or location}
- **Context**: {Link to `explore/explore-[slug]/context.md`}

---

## 2. Conformance Target and Test Baseline

### Standard
**Target**: WCAG {2.1 / 2.2} {A / AA / AAA}

**Default if not specified**: WCAG 2.2 AA

**Rationale**: {Why this level was chosen - e.g., "WCAG 2.2 AA is the industry standard and meets legal requirements in most jurisdictions"}

### Platforms
- {Web (responsive)}
- {iOS}
- {Android}
- {Desktop application}

### Supported Input Methods
- **Keyboard**: {Yes / No}
- **Touch**: {Yes / No}
- **Screen reader**: {Yes / No}
- **Voice control**: {Yes / No}
- **Switch control**: {Yes / No}

### Assistive Technology Baseline (Minimum)

**Web**:
- Keyboard-only navigation
- Screen reader: {e.g., "NVDA on Chrome (Windows) or VoiceOver on Safari (macOS)"}
- Browser: {e.g., "Latest versions of Chrome, Firefox, Safari, Edge"}

**Mobile** (if applicable):
- iOS: {e.g., "VoiceOver on iOS 16+"}
- Android: {e.g., "TalkBack on Android 12+"}

**Testing approach**:
- Automated: {Tools - e.g., "axe DevTools, Lighthouse, WAVE"}
- Manual keyboard: {Who tests, when}
- Screen reader: {Which screen reader, who tests, when}

---

## 3. Cross-Cutting Requirements

These requirements apply to all screens and components unless explicitly noted.

### 3.1 Structure and Semantics

**Headings**:
- Pages use meaningful headings in hierarchical order (H1, then H2, then H3, etc.)
- Each page has exactly one H1 that describes the page purpose
- Headings are not skipped (e.g., H1 to H3 without H2)

**Landmarks**:
- Primary landmarks exist where applicable:
  - `<header>` or `role="banner"` for site header
  - `<main>` or `role="main"` for primary content
  - `<nav>` or `role="navigation"` for navigation
  - `<footer>` or `role="contentinfo"` for site footer
  - `<aside>` or `role="complementary"` for related content

**Interactive controls**:
- Use native HTML elements where possible (`<button>`, `<a>`, `<input>`, etc.)
- Custom controls include appropriate ARIA roles and properties
- Links have descriptive text that makes sense out of context (avoid "click here", "read more")

**Images and icons**:
- Decorative images have empty alt text (`alt=""`)
- Informative images have descriptive alt text
- Icons used for actions have accessible labels

### 3.2 Keyboard and Focus

**Keyboard access**:
- All functionality is reachable and operable by keyboard alone
- No keyboard traps (user can always navigate away)
- Keyboard shortcuts (if any) are documented and don't conflict with assistive tech

**Focus order**:
- Focus order follows visual order and logical task flow
- Tab order matches reading order (left-to-right, top-to-bottom in LTR languages)

**Focus visibility**:
- Focus indicator is always visible (minimum 2px outline or equivalent)
- Focus indicator has sufficient contrast (3:1 against background)
- Focus indicator is not removed with CSS (`outline: none` only if custom indicator provided)

**Focus management rules**:
- **On navigation**: Move focus to page title (H1) or main landmark
- **On opening dialog/drawer**: Move focus into the container (typically to close button or first interactive element)
- **On closing dialog/drawer**: Return focus to the triggering element
- **On error**: Move focus to error summary or first invalid field
- **On dynamic content update**: Announce change via live region (don't move focus unless user-initiated)

### 3.3 Forms and Validation

**Labels and instructions**:
- Every input has an accessible name (via `<label>`, `aria-label`, or `aria-labelledby`)
- Labels are visible and persistent (not placeholder-only)
- Instructions are provided before the form field, not after
- Helper text is associated with the input via `aria-describedby`

**Required fields**:
- Required fields are indicated in text (e.g., "Required" or asterisk with legend)
- Required state is programmatically indicated (`required` attribute or `aria-required="true"`)
- Do not rely on color alone to indicate required fields

**Validation and errors**:
- Errors are specific and actionable (e.g., "Email address must include @" not "Invalid input")
- Errors are programmatically associated with fields (`aria-describedby` or `aria-errormessage`)
- Error messages use appropriate color contrast (4.5:1 for text)
- On submit failure:
  - Provide an error summary at the top of the form (recommended for multi-field forms)
  - Move focus to the error summary or first invalid field
  - Error summary lists all errors with links to fields
- Inline validation (on blur) is preferred over submit-only validation
- Success states are also announced (e.g., "Form submitted successfully")

### 3.4 Visual and Non-Text Cues

**Color**:
- Information is not conveyed by color alone (use text, icons, or patterns as well)
- Links are distinguishable from surrounding text (underline or 3:1 contrast difference)
- Error states use both color and text/icons

**Interactive targets**:
- Touch targets are at least 44x44 CSS pixels (mobile)
- Click targets are at least 24x24 CSS pixels (desktop)
- Adequate spacing between adjacent interactive elements

**Hover and focus**:
- Hover-only interactions have keyboard equivalents
- Tooltips are accessible via keyboard (appear on focus, dismissible with Escape)
- Hover content does not obscure other content unless dismissible

**Motion and animation**:
- Motion does not block understanding of content
- Respect `prefers-reduced-motion` media query for non-essential animations
- Auto-playing animations can be paused, stopped, or hidden

### 3.5 Content Readability

**Language and instructions**:
- Instructions avoid references to shape, position, or color alone (e.g., "Click the green button on the right" should be "Click the Submit button")
- Plain language for key actions and error messages
- Avoid jargon and technical terms where possible

**Terminology**:
- Consistent terminology across navigation and UI (e.g., don't use "Delete" in one place and "Remove" in another for the same action)
- Consistent labeling for repeated elements (e.g., all "Close" buttons labeled "Close")

**Reading level**:
- {Specify if there's a target reading level - e.g., "8th grade level for general content"}

---

## 4. Component Specifications

Add only components used in your wireframes. Each component includes keyboard interaction, focus management, ARIA roles/properties, and screen reader announcements.

### 4.1 Navigation (Global and Contextual)

**Purpose**: {e.g., "Primary site navigation in header"}

**Keyboard interaction**:
- Tab moves between navigation items
- Enter or Space activates links
- Arrow keys {optional - for mega menus or complex navigation}

**Focus management**:
- Current location is programmatically determinable (`aria-current="page"` or equivalent)
- Skip to main content link provided (web) as first focusable element

**Semantics**:
- Wrapped in `<nav>` element or `role="navigation"`
- Navigation labeled with `aria-label` if multiple navs exist (e.g., "Primary navigation", "Footer navigation")

**Screen reader announcements**:
- Current page announced as "Current page" or similar
- Number of items announced (e.g., "5 items")

---

### 4.2 Dialogs and Drawers

**Purpose**: {e.g., "Modal dialogs for confirmations and forms"}

**Keyboard interaction**:
- Tab cycles through interactive elements within dialog (focus trap)
- Escape closes dialog (unless destructive action requires confirmation)
- Enter on close button closes dialog

**Focus management**:
- On open: Focus moves to first interactive element (typically close button or primary action)
- On close: Focus returns to triggering element
- Background content is inert (not focusable or clickable)

**Semantics**:
- Uses `role="dialog"` or `role="alertdialog"` (for urgent messages)
- Dialog has accessible name via `aria-labelledby` (points to dialog title)
- Dialog has description via `aria-describedby` if needed

**Screen reader announcements**:
- Dialog title announced on open
- Dialog role announced (e.g., "Dialog, [Title]")

**Visual requirements**:
- Close button is clearly visible and labeled
- Backdrop dims background content

---

### 4.3 Tabs

**Purpose**: {e.g., "Organize content into sections"}

**Keyboard interaction**:
- Tab moves focus into tab list, then to active tab panel
- Arrow keys (Left/Right or Up/Down) navigate between tabs
- Enter or Space activates selected tab (if not auto-activated)
- Home/End move to first/last tab (optional but recommended)

**Focus management**:
- Only active tab is in tab order (other tabs are `tabindex="-1"`)
- When tab is activated, associated panel is shown and focus moves to panel (or stays on tab, depending on pattern)

**Semantics**:
- Tab list: `role="tablist"`
- Each tab: `role="tab"`, `aria-selected="true/false"`, `aria-controls="[panel-id]"`
- Each panel: `role="tabpanel"`, `aria-labelledby="[tab-id]"`

**Screen reader announcements**:
- Tab role and state announced (e.g., "Tab, [Label], selected, 1 of 3")
- Panel content announced when activated

---

### 4.4 Menus and Dropdowns

**Purpose**: {e.g., "Dropdown menus for actions"}

**Keyboard interaction**:
- Trigger is a button (not a link)
- Enter or Space opens menu
- Arrow keys navigate menu items
- Escape closes menu and returns focus to trigger
- Enter or Space activates menu item

**Focus management**:
- On open: Focus moves to first menu item (or stays on trigger, depending on pattern)
- On close: Focus returns to trigger

**Semantics**:
- Trigger: `<button>` with `aria-haspopup="menu"` and `aria-expanded="true/false"`
- Menu: `role="menu"`
- Menu items: `role="menuitem"` (or `menuitemcheckbox`, `menuitemradio`)

**Screen reader announcements**:
- Menu state announced (e.g., "Menu, expanded")
- Menu items announced with position (e.g., "Menu item, [Label], 1 of 5")

**Note**: For simple select dropdowns, use native `<select>` element instead.

---

### 4.5 Tables and Data Grids (If Applicable)

**Purpose**: {e.g., "Display project list with sortable columns"}

**Keyboard interaction**:
- Tab moves between interactive elements (row actions, sort buttons)
- Arrow keys navigate cells (for data grids with cell-level interaction)
- Enter or Space activates row actions

**Focus management**:
- Focus indicator visible on current cell or row
- Sorting controls are keyboard accessible

**Semantics**:
- Use `<table>` element with proper structure (`<thead>`, `<tbody>`, `<th>`, `<td>`)
- Column headers have `scope="col"`, row headers have `scope="row"`
- Sortable columns indicate sort state via `aria-sort="ascending/descending/none"`
- For data grids with complex interaction, use `role="grid"`, `role="row"`, `role="gridcell"`

**Screen reader announcements**:
- Table caption or summary announced
- Column headers announced with each cell
- Sort state announced (e.g., "Sorted ascending")
- Row count announced (e.g., "10 rows")

---

### 4.6 Search, Filters, and Sort

**Purpose**: {e.g., "Search and filter project list"}

**Keyboard interaction**:
- Tab moves between search input, filter controls, and sort controls
- Enter submits search
- Arrow keys navigate filter options (if using custom controls)

**Focus management**:
- Focus remains in search input after submit (unless results are on new page)
- Filter changes don't move focus unless user-initiated

**Semantics**:
- Search input has `role="search"` landmark or is within `<form role="search">`
- Search input has accessible label
- Clear button (if present) is a `<button>` with accessible label (e.g., "Clear search")
- Filter controls have accessible labels and states

**Screen reader announcements**:
- Filter state changes announced via live region (e.g., "Showing 5 results")
- No-results message announced (e.g., "No results found for '[query]'")
- Sort state changes announced (e.g., "Sorted by date, newest first")

**No-results behavior**:
- Provide meaningful message with recovery actions (e.g., "Try different keywords" or "Clear filters")

---

### 4.7 Toasts, Banners, and Inline Messaging

**Purpose**: {e.g., "Display status messages and notifications"}

**Keyboard interaction**:
- Toasts do not steal focus (unless critical)
- Dismiss button (if present) is keyboard accessible

**Focus management**:
- Focus does not move to toast unless it contains interactive elements and requires user action
- For critical alerts, focus may move to toast

**Semantics**:
- Status messages: `role="status"` or `aria-live="polite"`
- Errors: `role="alert"` or `aria-live="assertive"` (use sparingly)
- Banners: `role="banner"` (if site-wide) or `role="region"` with label

**Screen reader announcements**:
- Status messages announced automatically (polite)
- Errors announced immediately (assertive) only when blocking
- Toast content is concise and meaningful

**Visual requirements**:
- Toasts have sufficient color contrast
- Toasts do not obscure critical content
- Toasts are dismissible (auto-dismiss after 5-7 seconds or manual dismiss button)

---

### 4.8 {Custom Component Name}

{Repeat the above structure for any custom components specific to your product}

**Purpose**: {What this component does}

**Keyboard interaction**:
- {Key bindings and behavior}

**Focus management**:
- {Where focus goes, when it moves}

**Semantics**:
- {ARIA roles, labels, states, properties}

**Screen reader announcements**:
- {What is announced and when}

---

## 5. State Specifications

### Empty States

**Purpose**: {e.g., "When user has no projects yet"}

**Requirements**:
- Provide context explaining why the state is empty
- Provide a clear next action (e.g., "Create your first project")
- Do not rely on imagery alone to explain the state
- Empty state message is announced by screen readers

**Example**: "You don't have any projects yet. Create your first project to get started."

---

### Loading States

**Purpose**: {e.g., "While data is being fetched"}

**Requirements**:
- Loading is communicated via text or ARIA status (`aria-live="polite"` or `role="status"`)
- Loading indicators have accessible labels (e.g., "Loading projects")
- Skeletons or spinners do not prevent navigation to other usable content
- Loading state is announced by screen readers (e.g., "Loading")

**Behavior**:
- If loading takes >2 seconds, provide feedback
- If loading fails, provide error message with recovery action

---

### Error States

**Purpose**: {e.g., "When an operation fails"}

**Requirements**:
- Errors explain what happened in plain language
- Errors explain what to do next (recovery path)
- Recovery paths are provided (e.g., "Retry", "Contact support", "Go back")
- Error messages are announced via `role="alert"` or `aria-live="assertive"`
- Error messages are programmatically associated with relevant controls

**Examples**:
- "Unable to load projects. Please try again or contact support if the problem persists."
- "Your session has expired. Please log in again."

**Visual requirements**:
- Error messages have sufficient color contrast (4.5:1 for text)
- Error icon or indicator supplements color

---

### No Permission States

**Purpose**: {e.g., "When user lacks access to a resource"}

**Requirements**:
- Explain why access is blocked in user-friendly terms (avoid technical jargon)
- Provide next step (e.g., "Request access", "Switch account", "Contact admin")
- Do not expose sensitive information in error messages
- No permission message is announced by screen readers

**Example**: "You don't have permission to view this project. Request access from the project owner or contact your administrator."

---

### Success States

**Purpose**: {e.g., "When an operation completes successfully"}

**Requirements**:
- Confirmation message is clear and specific (e.g., "Project created successfully" not just "Success")
- Confirmation is announced via `role="status"` or `aria-live="polite"`
- Focus moves to appropriate next step (e.g., newly created item)

**Example**: "Project 'Q4 Launch' created successfully."

---

## 6. Flow-Level Accessibility Checks

For each P0 flow, provide a checklist of accessibility requirements that must be met.

### Flow: {Flow Name 1}

**Description**: {Brief description of the flow - e.g., "User signs up and creates first project"}

**Accessibility checklist**:
- [ ] Keyboard-only completion possible end-to-end (no mouse required)
- [ ] All controls have accessible names (labels, ARIA labels)
- [ ] Errors are announced and recoverable without sighted assistance
- [ ] Focus moves predictably between steps (follows logical order)
- [ ] Confirmation/success is announced at completion
- [ ] {Flow-specific check 1}
- [ ] {Flow-specific check 2}

**Critical checkpoints**:
- {Checkpoint 1 - e.g., "Form validation errors are announced and associated with fields"}
- {Checkpoint 2 - e.g., "Multi-step form progress is communicated"}

---

### Flow: {Flow Name 2}

**Description**: {Brief description}

**Accessibility checklist**:
- [ ] Keyboard-only completion possible end-to-end
- [ ] All controls have accessible names
- [ ] Errors are announced and recoverable
- [ ] Focus moves predictably between steps
- [ ] Confirmation/success is announced
- [ ] {Flow-specific check 1}
- [ ] {Flow-specific check 2}

**Critical checkpoints**:
- {Checkpoint 1}
- {Checkpoint 2}

---

### Flow: {Flow Name 3}

{Repeat for each P0 flow}

---

## 7. Acceptance Criteria

### Definition of Done (Minimum)

- [ ] P0 flows pass keyboard-only testing (no mouse required)
- [ ] Screen reader announces labels, errors, and status changes correctly
- [ ] Dialogs, menus, and tabs meet expected keyboard patterns (per ARIA Authoring Practices)
- [ ] No critical issues against the conformance target (WCAG 2.2 AA)
- [ ] All form inputs have accessible labels
- [ ] All interactive elements are keyboard accessible
- [ ] Focus is always visible and follows logical order
- [ ] Color is not the only means of conveying information
- [ ] Known limitations are documented with rationale and mitigation plan

### Testing Approach

**Automated testing**:
- Tools: {e.g., "axe DevTools, Lighthouse, WAVE"}
- Frequency: {e.g., "Run on every PR"}
- Responsibility: {e.g., "Developers"}

**Manual keyboard testing**:
- Who: {e.g., "QA team"}
- When: {e.g., "Before each release"}
- Scope: {e.g., "All P0 flows"}

**Screen reader testing**:
- Screen reader: {e.g., "NVDA on Chrome (Windows)"}
- Who: {e.g., "Accessibility specialist or trained QA"}
- When: {e.g., "Before each major release"}
- Scope: {e.g., "P0 flows and high-risk components"}

### Acceptance Process

**Review and approval**:
- Reviewed by: {e.g., "UX lead, Accessibility specialist"}
- Approved by: {e.g., "Product owner"}
- Timing: {e.g., "Before development begins"}

**Testing gates**:
- Design review: {e.g., "Accessibility spec reviewed and approved"}
- Dev handoff: {e.g., "Accessibility requirements included in tickets"}
- QA: {e.g., "Accessibility checklist completed for each feature"}
- Release: {e.g., "No critical accessibility issues"}

---

## 8. Open Questions and Risks

### Open Questions (Prioritized)

**1. {Question}**
- **Why it matters**: {Impact on accessibility or compliance}
- **How to resolve**: {Method - e.g., "User testing with assistive tech users", "Consult accessibility specialist"}
- **Decision owner**: {Who decides}
- **Deadline**: {When decision is needed}

**2. {Question}**
- **Why it matters**: {Impact}
- **How to resolve**: {Method}
- **Decision owner**: {Who decides}
- **Deadline**: {When needed}

### Risks

**Risk 1**: {Risk - e.g., "Custom date picker may not meet WCAG 2.2 requirements"}
- **Impact**: {e.g., "High - blocks form completion for keyboard users"}
- **Mitigation**: {e.g., "Use native date input with progressive enhancement, or use proven accessible date picker library"}
- **Owner**: {Who is responsible for mitigation}

**Risk 2**: {Risk - e.g., "Third-party component library has known accessibility issues"}
- **Impact**: {e.g., "Medium - affects multiple components"}
- **Mitigation**: {e.g., "Audit library, file issues with vendor, consider alternative library"}
- **Owner**: {Who is responsible}

### Known Limitations

**Limitation 1**: {Limitation - e.g., "Drag-and-drop file upload not fully keyboard accessible"}
- **Rationale**: {Why this limitation exists}
- **Workaround**: {Alternative method - e.g., "Provide 'Browse files' button as keyboard-accessible alternative"}
- **Future plan**: {e.g., "Implement keyboard-accessible drag-and-drop in v2"}

**Limitation 2**: {Limitation}
- **Rationale**: {Why}
- **Workaround**: {Alternative}
- **Future plan**: {When/how to address}

---

## Related Artifacts

- **Wireframes**: `explore/design/wireframes-[slug].md`
- **Information Architecture**: `explore/design/information-architecture-[slug].md`
- **User Flows**: `explore/domain/flows-[slug].md`
- **Usability Test Plan**: `explore/design/usability-test-plan-[slug].md`
- **Context**: `explore/explore-[slug]/context.md`
- **PRD**: `explore/prds/[slug]-prd.md`

---

**Last Updated**: {YYYY-MM-DD}  
**Status**: {Draft | In Review | Approved}

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.accessibility-specifications:0.1.2:2026-09-01T07:59:41Z -->
