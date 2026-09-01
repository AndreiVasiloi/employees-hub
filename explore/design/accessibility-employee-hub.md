# Accessibility Specifications: Employee Hub

**Project**: Employee Hub  
**Created**: 2026-09-01  
**Last Updated**: 2026-09-01  
**Status**: In Review

---

## 1. Snapshot

### Objective

This specification turns the approved Employee Hub flows and wireframes into implementation and test requirements. It is a learning-project baseline, not a legal compliance claim.

### Scope

**In scope**:

- Responsive-web requirements for all P0 Employee Hub screens and flows F1–F9.
- Shared navigation, data, form, status, and administration components described in the approved wireframes.
- Automated and manual accessibility evidence for implementation increments.

**Out of scope**:

- Native mobile applications and dedicated mobile screen-reader testing until devices become available.
- A formal legal compliance assessment, certification, or conformance claim.
- P1/P2 functionality not yet implemented.

### References

- [Regulatory and compliance focus](../explore-employee-hub/regulatory-compliance.md)
- [Wireframe blueprint](wireframes-employee-hub.md)
- [User flows](../domain/flows-employee-hub.md)
- [Information architecture](information-architecture-employee-hub.md)
- [Usability test plan](usability-test-plan-employee-hub.md)
- [Product requirements document](../prds/employee-hub-prd.md)

## 2. Conformance Target and Test Baseline

- **Target:** WCAG 2.2 AA, used as a non-binding engineering reference.
- **Platforms:** responsive web only.
- **Required input/support:** keyboard, touch, and screen reader operation.
- **Critical assistive-technology coverage:** keyboard-only in Chrome; NVDA with Chrome on Windows; VoiceOver with Safari on iOS; and TalkBack with Chrome on Android when a suitable device is available. Any unavailable coverage is recorded as a gap.
- **Critical flows:** F1–F9 all meet the baseline; detailed verification focuses first on request and review (F1–F3), people/configuration/balances (F4–F6), and audit/account/security investigation (F7–F9).
- **Testing approach:** automated checks supplement manual keyboard and screen-reader testing; exact browser and assistive-technology versions are recorded at execution time.

## 3. Cross-Cutting Requirements

### Structure and navigation

- Every route has one descriptive `h1`, followed by a logical heading hierarchy.
- Provide a skip link as the first focusable element. Use named `header`, `nav`, `main`, and, where applicable, `aside`/`complementary` landmarks.
- Use native links, buttons, inputs, labels, tables, and dialogs where they fit; do not replace them with generic clickable elements.
- Icons, including every collapsed-sidebar item, have an accessible name. Hover/focus tooltips supplement rather than replace the name; the current destination exposes `aria-current="page"`.
- Route changes move focus to the new page `h1`. In-page updates keep focus on the initiating control unless an error summary or dialog needs focus.

### Keyboard, focus, and responsive behavior

- All actions work by keyboard in a logical visual order; no keyboard trap is permitted.
- Focus is visibly distinguishable and must not be hidden by the sticky header, sidebar, drawer, dialog, toast, or other overlay.
- Drawers and dialogs trap focus while open, close with Escape where appropriate, and return focus to their trigger.
- Hover-only information and actions have keyboard and touch equivalents.
- At 320 CSS pixels, content reflows without lost information or functionality. Data tables have an equivalent responsive card/list representation.
- Final visual design meets 4.5:1 contrast for normal text, 3:1 for large text, and 3:1 for applicable non-text UI indicators. Do not convey meaning by colour alone.
- Respect `prefers-reduced-motion`; motion must not be required to understand a result.

### Forms, content, and messaging

- Each field has a persistent visible label, programmatic name, required/optional state, and relevant instructions.
- Validate progressively after meaningful interaction; display the specific error directly beneath the field before submit when possible (for example, an invalid email). On submit/review, expose a focused error summary linking to each invalid field.
- Preserve valid values after errors. Placeholders, colour, and sensory directions alone never carry essential meaning.
- Dynamic updates announce the outcome without unexpectedly taking focus. A critical outcome always states whether it committed, failed, or remains uncertain; uncertainty is never presented as success.
- Use controlled leave-management terminology and generic authorization-denied wording that does not reveal protected record details.

## 4. Component Specifications

### Navigation: app header, sidebar, breadcrumbs, and contextual navigation

**Keyboard interaction:** Tab reaches the skip link, logo/home link, sidebar toggle, navigation links, breadcrumbs, and user-menu trigger. Enter activates links and buttons; Space activates buttons. A collapsed sidebar keeps each destination icon focusable and named.

**Focus management:** Opening the mobile sidebar moves focus into it; closing it returns focus to the toggle. Navigation changes move focus to the route `h1`.

**Semantics:** Use `header`, named `nav` landmarks (for example, `aria-label="Primary"` and `aria-label="Breadcrumb"`), a real list of links, and `aria-current="page"` for the active location. The toggle exposes `aria-expanded` and `aria-controls`.

**Announcements and states:** The toggle announces expanded/collapsed. The visible current page, not colour alone, indicates selection. Collapsed-item tooltips are available on both focus and hover.

### Dialogs, confirmation patterns, and drawers

**Keyboard interaction:** Tab and Shift+Tab cycle inside; Escape closes a dismissible dialog/drawer. Enter/Space activate its controls. Destructive choices are not the default focused action.

**Focus management:** On open, move focus to the dialog title, explanatory text, or first required field—whichever best orients the user. Make background content inert; on close return focus to the opener. An irreversible, time-sensitive confirmation may use `alertdialog`; ordinary confirmation uses `dialog`.

**Semantics:** Use native `<dialog>` where practical, otherwise `role="dialog"`/`role="alertdialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby` when explanatory content exists.

**Announcements and states:** State the affected request, employee, balance, or setting and the consequence (for example, cancellation or balance adjustment). Announce failures inline within the dialog; do not close a failed dialog.

### Menus and dropdowns

**Keyboard interaction:** The user dropdown and action menus open with Enter, Space, ArrowDown, or ArrowUp. Within a true menu, Arrow keys move items, Home/End jump, Escape closes and returns focus, and Enter/Space activates. Tab leaves and closes a non-modal menu.

**Focus management:** Focus moves to the first/last appropriate item on open and returns to the trigger on close. Avoid menu semantics for a simple group of page links; use standard links/buttons instead.

**Semantics:** A true menu trigger uses `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls`; the popup uses `role="menu"` and actionable entries use `role="menuitem"`.

**Announcements and states:** Expose disabled actions programmatically with a clear reason in nearby text or help, not only a disabled appearance.

### Tables, lists, responsive data cards, and availability grid

**Keyboard interaction:** Tab reaches filters, sort controls, row links, and row-action buttons. Tables themselves do not require arrow-key grid behavior unless an editable data grid is intentionally introduced. In the availability view, arrow-key cell navigation is only required if it is implemented as an interactive grid; otherwise provide an accessible list/table alternative.

**Focus management:** Filtering/sorting retains focus on the initiating control. Opening a row/detail view follows the route focus rule. Responsive cards preserve all row information and actions in a meaningful reading order.

**Semantics:** Use `<table>`, `caption` or an equivalent visible heading, `thead`, `tbody`, `th`, and `td`; column headers use `scope="col"` and row labels use `scope="row"`. Sortable headers are buttons and expose `aria-sort`. Availability cells identify the person and date; any availability meaning includes text, not colour alone.

**Announcements and states:** Announce loading completion, result count, active filters, sort order, and empty-state recovery actions through a concise polite live region. Clearly identify status badges in accessible text.

### Search, filters, sort, pagination, and bulk selection

**Keyboard interaction:** Search is operable with standard input keys; Enter submits where a submission model is used. Filter controls follow their native patterns. Pagination uses links/buttons with clear labels; checkbox selection supports Space.

**Focus management:** Results refresh without moving focus unless the user requested a route-changing search. Keep focus on the changed filter or sort; focus the empty-result message only when it is necessary to recover from a submitted search.

**Semantics:** Wrap search in `role="search"`, label every control, group related filters with `fieldset`/`legend` where applicable, and expose selected-filter counts and current page. Use `aria-current="page"` for pagination.

**Announcements and states:** A polite live region reports the new result count and no-results guidance. Filter chips expose their active state and a named remove action.

### Forms, progressive validation, date-range picker, and review screens

**Keyboard interaction:** Standard Tab/Shift+Tab navigation applies. Native date inputs are preferred where they satisfy requirements. A custom date-range picker must support keyboard selection, visible focus, Escape to close, and an explicit typed-input alternative; it cannot rely on pointer drag alone.

**Focus management:** Field-level errors appear after meaningful interaction without moving focus. Failed submit/review sends focus to the error summary, whose links move to the invalid fields. Successful submit moves focus to the confirmation `h1`; a review screen retains an edit path for each data group.

**Semantics:** Associate labels, descriptions, and errors using native relationships or `aria-describedby`; use `aria-invalid="true"` only when invalid. Group related controls with `fieldset` and `legend`. Mark required fields programmatically. Review data uses a semantic definition list or labelled summary sections.

**Announcements and states:** State the invalid rule and recovery action below each field. Use `role="alert"` only for newly introduced urgent errors; otherwise use a polite/status approach. Date availability, excluded holidays/weekends, calculated working days, and remaining balance must be exposed as text, not only visual calendar marks.

### Toasts, banners, inline messaging, and live status

**Keyboard interaction:** Dismissible messages have a labelled close button. Toasts never steal focus except when a user must immediately address a blocking error.

**Focus management:** Keep focus on the originating control after a non-blocking update. Persistent errors and failed submissions also appear near the relevant action/field, not solely as an auto-dismissed toast.

**Semantics:** Informational/success updates use `role="status"` or `aria-live="polite"`; urgent errors use `role="alert"`/assertive announcements sparingly. Page-wide warnings use a labelled banner region.

**Announcements and states:** Announce one concise result: what changed and its status. Messages that auto-dismiss remain available in page context/history when the information matters.

### Leave balance summary, status badges, and calculation breakdown

**Keyboard interaction:** Summary cards are not focusable unless they act as links/buttons. Expandable calculation detail uses a button with Enter/Space.

**Focus management:** Expanding detail retains focus on the control. A related detail-page navigation follows the route focus rule.

**Semantics:** Use headings and labelled summary values; associate labels such as "Annual leave remaining" with their values. Status badges include visible text such as Pending, Approved, Rejected, or Cancelled. Disclosure controls expose `aria-expanded` and `aria-controls`.

**Announcements and states:** When an approval or adjustment changes a balance, announce the new balance, affected leave type, and whether the update committed. Never make a balance dependent on colour or an icon alone.

### Audit timeline, security-event panels, readiness checklist, and role/access matrix

**Keyboard interaction:** Event/detail links, filters, expanders, and remediation actions are reachable in order. Checklist items use native checkboxes only when user-editable; informational completion state is not presented as an editable control.

**Focus management:** Opening an event detail moves focus to its `h1`; expanded event metadata retains focus on its expander. Do not auto-focus a periodically refreshed activity feed.

**Semantics:** Use ordered lists for chronological timelines; expose timestamps in machine-readable `<time datetime>` plus local readable text. Use headings/lists for readiness items and a semantic table for the access matrix. Security severity has text labels in addition to visual treatment.

**Announcements and states:** New user-triggered filters announce count/state. A live, auto-refreshing audit/security panel offers pause/refresh control and only announces new critical events when enabled by the user or required by the active task.

## 5. State Specifications

### Empty states

- Explain what is absent in plain language and retain the page heading and relevant navigation.
- Provide the next relevant action when the user has permission, such as **Request leave**, **Add employee**, **Clear filters**, or **Refresh**.
- When the user lacks permission to create content, explain the available read-only state and provide the appropriate contact route instead of showing an inert primary action.
- Illustrations or icons are decorative unless they convey unique information; they cannot be the only explanation.

### Loading and refreshing states

- Preserve the existing accessible page structure while content loads. Skeletons are decorative and must not be exposed as a sequence of meaningless controls.
- Initially loading a region exposes visible text such as "Loading leave requests" through `role="status"` or `aria-live="polite"`; avoid repeated announcements for routine background refreshes.
- Keep available navigation and unaffected controls usable. Disable only an action that would create a conflicting request, and communicate why.
- A user-triggered refresh announces completion, the result count or updated timestamp, and any failure.

### Error and recovery states

- State what failed, its effect, and a recovery action in user language. Provide retry, refresh, edit, or contact guidance as appropriate.
- Field errors remain directly beneath their field and are associated with it; failed form submissions additionally provide the focused error summary defined in Section 3.
- Server/network errors are visible in the affected region and announced once. Do not expose technical identifiers, internal authorization rules, or protected employee details.
- Preserve entered form values and the intended action whenever safely possible. A retry must be explicit; never silently resubmit a sensitive update.

### Permission and authentication states

- Use generic wording such as "You do not have access to this page" or "You cannot perform this action"; do not confirm the existence or details of a protected record.
- Explain the safe next step: return to an accessible page, contact an administrator, or sign in again. Do not show controls that imply access is possible when it is not.
- When a session expires, announce the sign-in requirement, preserve non-sensitive entered form data where feasible, and return the user to a meaningful location after re-authentication.

### Success, conflict, and uncertain-result states

- Confirm the completed action with the affected object and final status, for example: "Leave request submitted. Status: Pending approval." 
- After route-changing success, focus the confirmation page `h1`; after an in-place success, retain focus on the initiating control and announce the result through a polite status message.
- For approvals, cancellations, and balance adjustments, report the new status/balance only after the operation is committed.
- If a concurrent change, timeout, or unknown delivery result prevents confirmation, explicitly state that the outcome is **not confirmed**. Offer a safe **Refresh status** or **Retry** action and never present it as successful.

### Offline and unavailable-service states

- Indicate offline or service-unavailable status visibly and through a status message when it changes.
- Preserve unsent, non-sensitive input locally only when that behavior is intentionally designed and disclosed; otherwise keep the data in the active form for retry.
- Clearly distinguish locally retained input from a request accepted by the service.

## 6. Flow-Level Accessibility Checks

Apply the following checks to each implementation increment. Every flow must be completable keyboard-only, expose an accessible name for each control, provide recoverable/announced errors, move focus predictably, and announce a confirmed outcome.

### F1 — Plan and Submit Leave

- [ ] The leave type, dates, reason, calculated working days, excluded dates, and remaining balance are available in text.
- [ ] Date-range selection has a keyboard-operable and typed-input route; no pointer-only interaction is required.
- [ ] Field errors appear progressively, are connected to their fields, and failed review/submission presents a focusable error summary.
- [ ] Review content is semantic and editable; submission focuses the confirmation `h1` and announces Pending status.

### F2 — Track and Cancel Eligible Leave

- [ ] Status, eligibility, and cancellation constraints are clear without colour alone.
- [ ] The cancellation confirmation identifies the request and consequence, traps focus safely, and restores focus when dismissed.
- [ ] The final cancelled/failed/uncertain state is announced and reflected in the request detail/list.

### F3 — Review and Decide a Request

- [ ] Request context, dates, leave type, employee, and balance effect are available to screen readers in a sensible order.
- [ ] Approve/reject controls and any required decision reason are keyboard operable and labelled with their consequence.
- [ ] Approval, rejection, conflict, and unknown-result outcomes announce the committed status or explicitly state uncertainty.

### F4 — Add or Maintain an Employee

- [ ] Required fields and progressive validation—including email validation—are visible, programmatically associated, and recoverable.
- [ ] Employee fields, manager/team selection, and save/cancel actions have clear accessible names and instructions.
- [ ] Duplicate/conflicting save results preserve input and give an accessible resolution path.

### F5 — Configure Leave Rules and Readiness

- [ ] Readiness state, incomplete requirements, and policy effects are understandable without relying on colour or icon alone.
- [ ] Leave type, policy, schedule, and holiday editing controls meet form and dialog requirements.
- [ ] Saving, failed validation, and policy-conflict outcomes expose the final committed state and recovery path.

### F6 — Review and Adjust a Balance

- [ ] Balance values, leave type, calculation/history, and adjustment reason are semantically structured and understandable in text.
- [ ] Adjustment confirmation states the affected person, value, reason, and consequence before commit.
- [ ] A concurrent update, timeout, or conflict is never reported as success; refresh/retry is accessible.

### F7 — Investigate Business Activity

- [ ] Search, filters, sort, result count, timeline, timestamps, and detail navigation work by keyboard and screen reader.
- [ ] Audit data is a semantic list/table and does not depend on visual timeline placement alone.
- [ ] User-triggered updates announce the resulting count/state without interrupting navigation.

### F8 — Manage Accounts and Roles

- [ ] Account, role, and access meanings are presented in text and in semantic tables/lists where applicable.
- [ ] Account changes and protected actions explain their consequence in accessible confirmation and error states.
- [ ] Denied access or unavailable account details use generic wording and do not leak protected information.

### F9 — Investigate Security Activity

- [ ] Security severity, status, timestamp, filters, and event details have textual equivalents and semantic structure.
- [ ] Filter and event-detail controls operate by keyboard and preserve predictable focus.
- [ ] Auto-refresh does not steal focus or generate disruptive announcements; critical changes are announced only under the defined live-update behavior.

## 7. Acceptance Criteria

### Definition of done

- [ ] Every applicable F1–F9 P0 flow checklist in Section 5 passes with keyboard-only operation.
- [ ] Automated accessibility checks run in CI for implemented components/screens (for example, axe-core); Lighthouse is used as a supplementary audit, not as conformance proof.
- [ ] Screen-reader verification covers labels, errors, dialogs, menu behavior, and dynamic-status announcements on the high-risk screens.
- [ ] Manual browser coverage includes current Chrome, Edge, and Firefox on desktop, plus Chrome on Android and Safari on iOS when devices are available; record exact versions at execution time.
- [ ] No known critical or serious issue against the WCAG 2.2 AA learning target remains for released P0 functionality.
- [ ] Each known coverage gap, accepted limitation, or exception has a documented impact, rationale, owner, and mitigation.

### Review and acceptance

- Accessibility checks occur during implementation and pull-request review, then again before a delivery increment is accepted.
- The Lead Engineer/Sponsor approves the final evidence; Andrei reviews product-experience and architecture implications as Product Manager and Architect.
- Automated results, manual keyboard notes, screen-reader notes, browser/device versions, defects, and accepted exceptions are linked from the implementation task or release evidence.

## 8. Open Questions and Risks

### Resolved decisions

| Topic | Decision | Follow-up evidence |
| --- | --- | --- |
| Mobile assistive technology | No Android or iOS device is available initially. Mobile screen-reader coverage is a documented gap, not a claim of validation. | Record the gap in each relevant increment; test when devices become available. |
| UI component library | Use Angular Material initially, including its date-picker and CDK accessibility utilities. | Assess the selected version/components before adoption; test actual behavior against this specification. |
| Date entry | Prefer typed date entry/native date inputs where suitable. If a custom Material range picker is used, it must have typed entry, complete keyboard operation, and manual NVDA testing. | Test F1 and any policy/date editing flow before acceptance. |
| Dense data on small screens | A scrollbar may supplement an overflowing desktop/table view, but mobile must provide an equivalent card/list layout. | Test at 320 CSS pixels with every data value and row action retained. |
| Activity updates | The MVP uses explicit **Refresh** and a visible last-updated time; it does not auto-refresh feeds. | Verify refresh announcements and focus retention. |
| Conformance language | Describe the result as tested against a WCAG 2.2 AA learning target, never as certified/conformant. | Review release copy and evidence. |

### Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| A Material component or its configuration does not meet the required interaction pattern. | Users may encounter inaccessible menus, overlays, date selection, or error handling. | Use native controls where possible; test the actual component, version, and configuration; fix or replace it before P0 acceptance. |
| Custom date-range behavior excludes keyboard or screen-reader users. | F1 and date-based administration flows cannot be completed. | Require typed input and explicit calendar keyboard behavior; manually test date selection and calculated-result announcements. |
| Data-rich tables/availability lose meaning on narrow screens. | Users may miss columns, statuses, or actions. | Retain a labelled responsive card/list alternative; use a scrollbar only as supplemental overflow. |
| Background activity updates interrupt assistive technology. | Focus loss and repeated announcements make investigations difficult. | Use manual refresh in MVP; any future live update must be opt-in/non-disruptive and pauseable. |
| Mobile screen-reader coverage is unavailable. | iOS/Android defects can remain undiscovered. | Maintain the coverage gap, use responsive/manual keyboard checks, and schedule device testing when hardware is available. |
| Limited learning-project capacity produces incomplete manual coverage. | Automated checks may miss usability defects. | Prioritize F1–F9 and high-risk screens; record actual evidence and unresolved findings before each acceptance. |

### Known limitations and workaround

- Initial accessibility testing does not include VoiceOver on iOS or TalkBack on Android because no devices are available. The workaround is documented desktop keyboard/NVDA coverage plus responsive checks; this does not replace future device testing.
- Automated auditing cannot verify all interaction, reading order, or announcement quality. Manual evidence remains required for P0 flows.

## Implementation and Test Evidence

- Record browser and assistive-technology versions at execution time.
- Manually test keyboard order, visible focus, screen-reader name/role/value, responsive reflow, error recovery, dialogs, and dynamic messages for the high-risk screens and all F1–F9 flows.
- Use automated checks to catch regressions, but do not treat them as proof of accessibility.
- Log defects, unavailable device coverage, and accepted exceptions with their affected flow/screen and remediation decision.

## Related Artifacts

- [Information architecture](information-architecture-employee-hub.md)
- [Wireframe blueprint](wireframes-employee-hub.md)
- [Usability test plan](usability-test-plan-employee-hub.md)
- [User flows](../domain/flows-employee-hub.md)
- [Regulatory and compliance focus](../explore-employee-hub/regulatory-compliance.md)
