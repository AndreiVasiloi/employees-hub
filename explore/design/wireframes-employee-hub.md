---
version: 1.0
created: 2026-09-01
last_updated: 2026-09-01
status: stakeholder-approved low-fidelity blueprint
product_context: Employee Hub leave-management learning project
fidelity: low
screen_inventory: 26 P0, 6 P1, 0 P2
---

# Wireframe Blueprint: Employee Hub

**Project**: Employee Hub  
**Created**: 2026-09-01  
**Last Updated**: 2026-09-01  
**Status**: Stakeholder-approved low-fidelity blueprint; representative-user and HLD validation pending

---

## 1. Snapshot

### Objective

Define low-fidelity, responsive screen structure for a secure, auditable Employee Hub leave-management experience. The blueprint translates the approved information architecture and user flows into layout, content hierarchy, interaction intent, states, and accessibility notes before visual design or implementation.

### Inputs

- [Context baseline](../explore-employee-hub/context.md)
- [PRD](../prds/employee-hub-prd.md)
- [Information Architecture](information-architecture-employee-hub.md)
- [Personas](../domain/personas-employee-hub.md)
- [Journey map](../domain/journey-employee-hub.md)
- [User flows](../domain/flows-employee-hub.md)
- [Regulatory learning baseline](../explore-employee-hub/regulatory-compliance.md)

### Output

This document is the canonical low-fidelity wireframe blueprint. It has no Figma or PNG output yet.

### Fidelity Rules

- Layout, hierarchy, labels, component purpose, and behaviour only; no colour, typography, imagery, shadow, or final spacing choices.
- Use semantic component names and fictional, realistic copy only when meaning must be evaluated.
- Use representative frames at 1440 px, 768 px, and 390 px; these are review sizes, not CSS breakpoint contracts.
- Explain loading, empty, validation, denied, stale/conflict, error, success, and offline behaviour in notes rather than polished visual treatment.

### Assumptions

- Desktop/laptop browser is primary; phone-sized browser support is required for the three highest-frequency flows and remains available for all authorized destinations.
- A shared App Shell supplies the persistent navbar, expanded/collapsed sidebar, mobile drawer, user menu, and fictional-data notice.
- The API is authoritative for organization scope, authorization, balances, dates, eligibility, audit evidence, and committed command results.
- Personas, device preferences, and detailed rules remain assumption-heavy until tested with two to three representative participants.

---

## 2. Users and Top Tasks

### Primary Users

| User | Goals | Constraints and context |
|---|---|---|
| Employee | Request leave, view profile/balance, track status, cancel eligible requests. | Uses a work browser, sometimes a phone-sized browser; sees only own leave data. |
| Manager | Complete Employee tasks and decide assigned Pending requests using safe team context. | Sees direct-report scope only; needs a clear final decision without sensitive leave detail. |
| HR Administrator | Complete Employee tasks; maintain Employees, rules, holidays, balances, and business evidence. | Works with fictional organizational data and controlled, auditable changes. |
| Organization Administrator | Access approved features; manage Accounts/roles and investigate security activity. | Broad access is still server-authorized and protected by safeguards. |

### Top Tasks

1. Plan and submit a Leave Request.
2. Track and cancel an eligible Leave Request.
3. Review and decide an assigned Pending request.
4. Make leave configuration ready and maintain workforce/balance data.
5. Investigate business or security-sensitive activity safely.

---

## 3. Scope and Constraints

### In Scope

- Shared responsive application shell, including visible icons and accessible names for every collapsed-sidebar destination.
- P0 low-fidelity screens for flows F1-F9, their main states, and desktop/phone behaviour.
- Role-aware navigation, server-authoritative feedback, calculation explanation, audit/evidence paths, and accessibility notes.

### Out of Scope

- Visual brand, exact icons, design tokens, animation, final Angular component API, and high-fidelity mockups.
- Native mobile application, public sharing, unrestricted global search, payroll, recruitment, performance management, HRIS integrations, and configurable workflows.
- Provider-specific sign-in screens, legal certification, and formal compliance claims.

### Constraints

**Technical**: Angular web UI; NestJS API; PostgreSQL; fixed roles; one Manager approval step; date-only leave rules; server-owned calculations and authorization; concurrency/idempotency recovery states; Rancher is a later target environment.

**Content**: fictional employee data only; minimize sensitive data; labels follow the controlled IA vocabulary; no leave reason is shown unless later validated and authorized.

**Accessibility**: WCAG 2.2 AA is a non-binding learning target. Keyboard, focus, labels, text-based state meaning, and screen-reader announcements are designed from the start.

**Business**: initial 10-Employee learning scale; no unsupported legal, operational, availability, or provider claim; all material changes must be auditable.

---

## 4. Information Architecture Alignment

### Navigation Model

**Selected model**: Responsive side navigation with persistent top navbar and contextual local navigation.

**Rationale**: Goal-based navigation separates personal work, team responsibility, and administration while scaling from Employee-only access to Administrator breadth. Desktop collapse preserves space; phone-sized layouts use a navigation drawer.

### Primary Sections

| Section | Purpose |
|---|---|
| Home | Role-aware overview, shortcuts, balances, and outstanding responsibilities. |
| Request leave / My leave | Create, understand, track, cancel, and review own leave. |
| Team | Assigned approvals, Team Availability, and Direct Reports. |
| Administration | People, Leave Setup, Balances, Audit, and Access & Settings. |
| Current-user menu | My Profile and Sign Out. |

### Key Entities

- **Employee**: fictional worker profile linked to Team, optional Manager, and Account.
- **Leave Request**: one Employee's request for one Leave Type and inclusive date range; appears in preview, receipt, review, and history.
- **Leave Balance / Balance Transaction**: reconciled projection and immutable change history.
- **Leave Type / Policy / Work Schedule / Public Holiday**: effective configuration inputs to working-day calculation.
- **Audit Event / User Account / Role Assignment**: immutable evidence and controlled access identity.

### Labeling Assumptions

Preferred labels are Home, Request leave, My leave, Team, Administration, Pending approvals, Leave readiness, Employee balances, Business activity, Accounts and roles, Security activity, Notifications, and My profile. Use “Pending”, “Approved”, “Rejected”, and “Cancelled” as canonical Leave Request statuses.

### IA Risks

- Manager visibility and Administrator-all-features boundaries need HLD and representative-user validation.
- Effective configuration and calendar rules may change detailed fields or state wording.
- Navigation labels and phone findability remain untested with representative users.

---

## 5. Key Flows

### F1: Plan and Submit Leave

**Purpose**: Create one valid Leave Request after understanding a server-produced calculation and balance effect.

**Entry points**: Home, Request leave navigation, My leave, or a safe subsequent-request action.

**Steps**: S02 Request Leave -> valid preview -> S03 Review Request -> submit -> S04 Request Submitted -> S07 Leave Request Detail. Invalid/readiness states remain on S02; stale preview or uncertain results return to S02/S03 or S06 safely.

**Success outcome**: One visible Pending request with durable reference, receipt, balance effect, and next actions.

**Edge cases**: no Leave Type/readiness routes to support; field/eligibility errors preserve input; denied access is generic; known failures claim no commitment; uncertain results require status check or safe same-command retry.

### F2: Track and Cancel Eligible Leave

**Purpose**: Find one own request, understand current status, and cancel it when eligible.

**Entry points**: Home, My leave, My Requests, notification, or authorized deep link.

**Steps**: S06 My Requests -> S07 Leave Request Detail -> eligibility check -> confirmation -> committed Cancelled state or refreshed current state.

**Success outcome**: Cancelled receipt with released/restored balance effect and replacement-request or history action.

**Edge cases**: empty/no-match lists distinguish their messages; ineligible cancellation explains the rule; stale/uncertain result refreshes authoritative status; denied access reveals nothing; offline disables mutation.

### F3: Review and Decide a Request

**Purpose**: Let an assigned Manager commit exactly one informed approval or rejection.

**Entry points**: Home, Pending Approvals, notification, or authorized deep link.

**Steps**: S08 Pending Approvals -> S09 Review Leave Request -> optional S10 Team Availability -> decision/rejection reason -> confirmation -> final decision or current-state recovery.

**Success outcome**: One recorded Approved/Rejected decision with balance effect, Employee outcome, and next queue action.

**Edge cases**: no queue is neutral; rejection requires a reason; assignment/status changes remove controls; competing decisions refresh to one committed outcome; denied/offline states prevent mutation.

### F4: Add or Maintain an Employee

**Purpose**: Create or update one fictional Employee and valid workforce relationships.

**Entry points**: Employees, Employee Detail, Home/readiness shortcut, or authorized deep link.

**Steps**: S11 Employees -> S12 create/edit -> validate fields/relationships -> review -> save -> S13 Employee Detail. Authorized Team/Account setup returns to S12; stale changes require reconciliation.

**Success outcome**: One committed Employee/workforce change with readiness effect and audit acknowledgement.

**Edge cases**: no Employees offers Add Employee; validation preserves input; inactive relationship consequences are explained; no permission is generic; failed save never claims change.

### F5: Configure Leave Rules and Readiness

**Purpose**: Resolve failed prerequisites until a selected Leave Type/scope can accept requests.

**Entry points**: Home/readiness alert, Administration, blocked request, or related warning.

**Steps**: S14 Leave Readiness -> owning configuration screen S15-S18/S12/S20/S30 -> Draft/version edit -> validate -> activate -> S14 recheck -> Ready or next failure.

**Success outcome**: Readiness passes with a safe return to blocked context or Home.

**Edge cases**: absent configuration provides authorized setup; drafts remain not ready; date/version conflicts preserve active configuration; indeterminate checks never report Ready; denied/offline states hide restricted action.

### F6: Review and Adjust a Balance

**Purpose**: Inspect one Balance and append one controlled adjustment when permitted.

**Entry points**: Employee Balances, Employee Detail, readiness issue, Audit Event Detail, or authorized deep link.

**Steps**: S19 Employee Balances -> S20 Balance Detail -> adjustment form -> review -> confirmation -> updated projection/transaction or stale refresh.

**Success outcome**: One immutable Balance Transaction, reconciled projection, and Audit acknowledgement.

**Edge cases**: missing/unreconciled balances are not treated as zero; policy errors explain blocked amount/period; stale command refreshes; denied/offline states prevent adjustment.

### F7: Investigate Business Activity

**Purpose**: Explain one permitted business change and follow a corrective or escalation path.

**Entry points**: Home, Employee/Balance Detail, Administration, or authorized deep link.

**Steps**: S21 Business Activity -> S22 Audit Event Detail -> evidence/correlation review -> permitted owning correction or external follow-up -> return and verify related event.

**Success outcome**: Evidence explains the change, or a traceable correction/escalation route exists.

**Edge cases**: no-match and retention states are distinct; inaccessible subject links are omitted; evidence gaps refine search; no raw sensitive payloads; offline disables new queries/correction.

### F8: Manage Accounts and Roles

**Purpose**: Create or safely change one Account's Employee link, fixed roles, or status.

**Entry points**: Home, Accounts and Roles, Security Activity, or authorized deep link.

**Steps**: S23 Accounts and Roles -> S24 Account Detail/Editor -> validate and safeguard -> review -> confirmation -> committed detail/audit or reconciliation.

**Success outcome**: One committed access change with role/status impact and audit evidence.

**Edge cases**: duplicate links/invalid roles are corrected; last-Administrator/self-lockout is blocked; stale command refreshes; no secrets are displayed; denied/offline states block mutation.

### F9: Investigate Security Activity

**Purpose**: Understand one security-sensitive event and safely respond or escalate.

**Entry points**: Home alert, Account Detail, Security Activity, or authorized deep link.

**Steps**: S25 Security Activity -> S26 Security Event Detail -> evidence/correlation/classification -> safeguarded S24 response or external escalation -> follow-up -> close/return or continue investigation.

**Success outcome**: Permitted classification and follow-up evidence, or a traceable external escalation route.

**Edge cases**: no activity is neutral, not a safety claim; inaccessible links are omitted; unsafe containment is blocked; unresolved follow-up remains open; no raw secrets are displayed.

---

## 6. Screen Inventory

### P0 — Critical Path

S01 Home; S02 Request Leave; S03 Review Request; S04 Request Submitted; S05 My Leave; S06 My Requests; S07 Leave Request Detail; S08 Pending Approvals; S09 Review Leave Request; S10 Team Availability; S11 Employees; S12 Employee Editor; S13 Employee Details; S14 Leave Readiness; S15 Leave Types; S16 Policies; S17 Work Schedule; S18 Public Holidays; S19 Employee Balances; S20 Balance Detail and Adjustment; S21 Business Activity; S22 Audit Event Detail; S23 Accounts and Roles; S24 Account Detail and Editor; S25 Security Activity; S26 Security Event Detail.

### P1 — Important but Not Blocking

S27 Balance History; S28 Direct Reports; S29 Teams; S30 Organization Settings; S31 Notifications; S32 My Profile.

### P2 — Later

None. Advanced reports, exports, saved audit views, configurable workflows, and wider HR capabilities are outside approved scope.

**Total screens**: 26 P0, 6 P1, 0 P2.

---

## 7. Wireframe Conventions

### Layout Regions

- **Header**: persistent Top Navbar; left logo and menu control, right current-user menu; accessible expanded state.
- **Sidebar**: authorized destinations only; expanded labels or icon-only collapsed state; phone-sized modal drawer.
- **Main**: breadcrumb when depth warrants it, Page Header, task content, and primary action.
- **Context panel**: optional balance effect, calculation evidence, filters, or related evidence; moves below main content on narrow screens.
- **Footer**: no persistent footer; contextual support/return links live with owning content.

### Component Naming

App Shell, Top Navbar, Sidebar, Navigation Drawer, User Menu, Page Header, Breadcrumbs, Tabs, Summary Card, Action Card, Status Badge, Filter Bar, Search Field, Data Table, Result List, Pagination, Form, Field Group, Text Field, Select Field, Date Range Field, Calculation Breakdown, Balance Summary, Request Receipt, Timeline, Audit Evidence Panel, Readiness Checklist, Inline Alert, Banner, Empty State, Error Summary, Confirmation Dialog, Context Drawer, Toast.

### Annotation Style

- Numbered interaction notes use `[1]`, `[2]`, and so on.
- `ROLE`, `DATA`, `A11Y`, `RWD`, and `Q` identify visibility, authority, accessibility, responsive, and unresolved notes.
- Every P0 screen declares its own empty, loading, error, no-permission, and offline behaviour; additional states appear where relevant.

### Fidelity Rules

Use boxes, labels, and component names only. Icons are semantic placeholders such as `[icon: calendar]`; every collapsed navigation icon requires an accessible name and tooltip. Behaviour belongs in notes, and important empty/error/conflict states receive compact variants rather than high-fidelity visuals.

---

## 8. Screen Specs

### S01 — Home

**Purpose and actions**: Role-aware starting point. `[1]` Request leave; `[2]` open recent request; `[3]` open authorized approval, readiness, administration, or security responsibility; `[4]` open My Leave.

**Layout and components**: App Shell; Page Header; persistent fictional-data Banner; Balance Summary; Request Leave Action Card; Recent Requests list; role responsibility cards. Desktop uses main plus optional responsibility column; phone is a single ordered column.

**Content and data**: Current Account/roles/Employee, own balance summaries, recent own requests, assigned Pending count, authorized readiness/security attention counts, unread notification count. `DATA`: every aggregate is organization-scoped and server-authorized; cards are omitted when unauthorized.

**Interactions and states**: `[1]` Request Leave opens S02; `[2]` a recent request opens S07; `[3]` a responsibility card opens only its authorized destination; `[4]` phone drawer restores focus to its menu control. Empty explains no request history and offers Request Leave. Loading uses regional skeletons with shell usable. Partial error keeps successful regions with local Retry; full error offers Retry/Home. No permission omits cards and uses a safe deep-link result. Offline marks data unrefreshed and suppresses mutations.

**Accessibility**: Skip link -> navbar -> authorized navigation -> h1 -> banner -> content. One h1; card groups have headings; status/counts use text; refresh/errors use restrained live announcements. `RWD`: collapsed-sidebar icons retain name, tooltip, and active indication; phone drawer restores focus to menu control.

**Open questions**: `Q`: default Leave Type/period in Balance Summary; Home-alert thresholds; combined versus switched role responsibility area.

### S02 — Request Leave

**Purpose and actions**: Capture a Leave Type and inclusive dates. `[1]` Review Request; `[2]` cancel/return; `[3]` use date picker or keyboard entry; `[4]` follow permitted readiness/support route.

**Layout and components**: App Shell, Page Header, Leave Type Select, Start/End Date Fields, Balance Summary, calculation guidance, Error Summary, inline field errors, Review Request and Cancel actions. Desktop may place balance/context beside the Form; phone stacks fields, context, and actions.

**Content and data**: Active requestable Leave Types, own balance by type/period, organization date context, server validation for ordering, overlap, eligibility, readiness, and balance. `DATA`: frontend may validate structure only; server creates the preview.

**Interactions and states**: Type change refreshes balance; valid review opens S03. Progressive validation appears below a meaningful interacted field (for example required, format, date order) and Error Summary is used on review/submit attempts. Empty Leave Types offers readiness/support. Loading labels placeholders. Eligibility conflict stays on S02 with correction. Error preserves input and Retry. Denied is generic; offline disables preview.

**Accessibility**: Persistent labels, date-format instruction, keyboard date entry, associated inline errors, and Error Summary focus. Balance update is announced without focus movement. `Q`: MVP Leave Types, overlap/partial-day/notice rules, and draft persistence.

### S03 — Review Request

**Purpose and actions**: Explain authoritative preview before commitment. `[1]` Submit Request; `[2]` Edit Request; `[3]` expand date breakdown; `[4]` use safe stale/uncertain recovery.

**Layout and components**: App Shell; Page Header stating “not submitted”; Request Summary; Balance Effect; Calculation Breakdown; Approval Route; Inline Alert; Edit and Submit actions. Phone order is summary, balance, expandable breakdown, route, actions.

**Content and data**: Preview identity/version/expiry, Leave Type/dates, per-date included/excluded evidence, counted amount, current/projected balance, privacy-safe approval route, command identity. `DATA`: values originate only from server preview.

**Interactions and states**: Submit is guarded and opens S04 only after committed response. Edit returns to S02 and requires a new preview. Stale/validation conflict explains change and recalculates or returns to S02. Submitting shows progress without success claim. Known failure offers safe retry/edit; uncertain result offers S06 status check or permitted same-command retry. Denied/offline prevent submit.

**Accessibility**: Summary precedes details; date evidence is accessible table/labelled records; disclosure exposes state; submit progress/result announces once; stale Error Summary receives focus. `Q`: explanation depth, Manager identity detail, preview validity, balance unit, uncertain-result wording.

### S04 — Request Submitted

**Purpose and actions**: Confirm exactly one committed request. `[1]` View Request; `[2]` open My Requests; `[3]` start distinct request; `[4]` inspect notification status; `[5]` copy reference.

**Layout and components**: App Shell, committed-status Page Header, Status Badge, durable Request Reference, Request Receipt, Balance Effect, Approval Route, Notification Status, Next Actions.

**Content and data**: Committed request/version/reference/status, dates/type/count, submission time, resulting balance, allowed Manager information, notification intent/delivery, audit correlation. `DATA`: response or fresh query only, never preview state.

**Interactions and states**: Refresh reloads receipt; Back cannot resubmit. Resolving state says it is checking commitment. Notification pending/failed remains separate from Pending request status. Status change reloads latest state. Retrieval error offers Retry/My Requests; denied is generic; offline marks content unrefreshed.

**Accessibility**: Focus h1 on confirmed route; success says both submitted and Pending; reference copy has explicit name; receipt uses term/value structure; next links are distinct. `Q`: receipt fields, download/print need, Manager detail, notification states, retention.

### S05 — My Leave

**Purpose and actions**: Private overview of own balances, upcoming leave, and recent requests. `[1]` Request Leave; `[2]` open My Requests; `[3]` open a receipt; `[4]` open Balance History; `[5]` change permitted period.

**Layout and components**: App Shell, Page Header, local Overview/Requests/Balance History navigation, Balance Summary collection, Upcoming Leave panel, Recent Requests list, View All links. Phone stacks the same information.

**Content and data**: Current Employee, balances by Leave Type/period, upcoming Approved leave, recent own requests, eligibility indicators. `DATA`: personal scope remains personal even for multi-role users.

**Interactions and states**: Tabs link to S06/S27; request link opens S07; period change refreshes balance regions only. Empty history recommends Request Leave; no upcoming is neutral; missing readiness explains support route; partial errors retry by region; denied is safe; offline marks stale and suppresses mutation.

**Accessibility**: One h1, labelled sections, programmatic local-nav current item, explicit balance context, text statuses, semantic narrow records. `Q`: default types/periods, zero/inactive type visibility, definition of upcoming, list length, future projection.

### S06 — My Requests

**Purpose and actions**: Find one committed own Leave Request. `[1]` Open request; `[2]` Request Leave; `[3]` search reference; `[4]` filter status/type/date; `[5]` clear filters; `[6]` paginate.

**Layout and components**: App Shell, Page Header, local navigation, Filter Bar, Applied Filter Summary, desktop Data Table/phone Result Cards, result count, Pagination.

**Content and data**: Own request reference/type/dates/count/status/timestamps, permitted filter values, server sort/page metadata. `DATA`: authorization is applied before lookup, matching, and count.

**Interactions and states**: Open loads S07; filter changes reset page; safe URL retains list context; Back restores list. No history differs from no-match; query error preserves filters; stale selected result refreshes in S07; denied is generic; offline disables new queries.

**Accessibility**: Persistent filter labels, polite result-count announcement, semantic headers/equivalent cards, explicit Open links, named applied-filter removal, current-page information. `Q`: date-filter model, default sort, history period, pagination versus incremental loading, future export.

### S07 — Leave Request Detail

**Purpose and actions**: Show authoritative receipt and enable eligible self-cancellation. `[1]` Begin cancellation; `[2]` confirm/cancel dialog; `[3]` return to list; `[4]` expand calculation; `[5]` copy reference; `[6]` start replacement request.

**Layout and components**: App Shell, Breadcrumbs, Page Header/Status Badge, Request Receipt, Balance Effect, Calculation Breakdown, status/decision Timeline, Notification Status, Cancellation explanation/action, Confirmation Dialog.

**Content and data**: Current authorized request/version, per-date evidence, decision and Employee-safe reason, balance effect, cancellation eligibility/reason, notification and permitted audit evidence. `DATA`: server rechecks ownership and cancellation on every command.

**Interactions and states**: Eligible cancel opens dialog with consequence; committed cancel refreshes this screen as Cancelled; ineligible state offers only allowed support; stale change refreshes committed state. Pending/Approved/Rejected/Cancelled each has explicit text state. Retrieval error retries; denied/not found is one safe state; offline disables cancellation.

**Accessibility**: Receipt is labelled terms/values; timeline preserves order; disclosure is keyboard operable; dialog traps/restores focus; result/error announces once. `Q`: cancellation rules/window/reason, decision-history depth, balance release timing.

### S08 — Pending Approvals

**Purpose and actions**: Find assigned Pending requests. `[1]` Review request; `[2]` open Team Availability; `[3]` search/filter; `[4]` clear; `[5]` paginate.

**Layout and components**: App Shell, Page Header with assigned count, Team Availability shortcut, Filter Bar, Applied Filter Summary, desktop approval Data Table/phone cards, result count and Pagination.

**Content and data**: Assigned Pending requests only: minimum-necessary Employee identity, type/dates/count/reference/submission/waiting time, permitted Team filters, server page metadata. `DATA`: Manager/organization scope applies before count and matching.

**Interactions and states**: Review opens S09 with queue context; Team Availability opens S10 and returns. Filter changes refresh only assigned scope. No bulk decisions. A competing decision removes/relabels result on refresh. Empty queue is neutral; no-match offers Clear Filters; missing Manager assignment gives support; denied/offline states prevent review.

**Accessibility**: Count is text; filters labelled; table/phone cards equivalent; Review link names Employee/date context; waiting time has precise timestamp; result update is polite. `Q`: default sort, single-Manager rule, one-Team filter visibility, waiting-time usefulness, delegation exclusion.

### S09 — Review Leave Request

**Purpose and actions**: Commit exactly one Manager decision. `[1]` choose Approve/Reject; `[2]` provide rejection reason; `[3]` review/confirm; `[4]` open S10; `[5]` return to queue; `[6]` refresh.

**Layout and components**: App Shell, Breadcrumbs, request/status Page Header, minimum-necessary Employee/Request Summary, request-specific Balance Effect, Calculation Breakdown, Team Availability link, labelled Decision Field Group, conditional Rejection Reason, Confirmation Dialog, final result state.

**Content and data**: Assigned Pending request/version, safe Employee identity, type/dates/count/breakdown, request effect, permitted coverage context, reason rules, command identity. `DATA`: server revalidates assignment, Pending state, scope, and decision uniqueness.

**Interactions and states**: Neither decision is preselected. Reject requires concise Employee-safe reason. S10 preserves request context. Confirm is guarded; one result refreshes to Approved/Rejected with next queue action. Assignment change removes controls. Loading, invalid reason, confirming, submitting, committed, stale/already-decided, denied, error, and offline states are explicit.

**Accessibility**: Request context precedes controls; choice is one radio/equivalent group; conditional reason announcement is predictable; dialog names request/outcome/consequence; Error Summary links field; status uses text. `Q`: exact decision fields, full versus request-only balance, Team context, reason guidance, decision immutability.

### S10 — Team Availability

**Purpose and actions**: Show privacy-safe coverage for a selected Team/period. `[1]` return to request; `[2]` select Team; `[3]` change period; `[4]` move period; `[5]` switch grid/list.

**Layout and components**: App Shell, Page Header, Team/Date controls, desktop Availability Grid, equivalent date-grouped list, text Legend, request-context Banner, return action. Phone defaults to list.

**Content and data**: Permitted Team/direct reports, work schedule/holiday context, approved absence and policy-permitted tentative intervals, selected request dates. `DATA`: no Leave Type, reason, balance, or unrelated request detail.

**Interactions and states**: Entry from S09 defaults to reviewed dates and returns focus there. Team/period refresh authorized coverage. Person selection does not open leave detail. No members, no absence, missing calendar, partial error, changed scope, denied, and offline states explain condition safely.

**Accessibility**: Grid has caption/row/column headers and text cells; list alternative always exists; date navigation names destination period; all availability meaning is textual. `Q`: Pending visibility, Employee identity, default period, overlap warning, organization-wide access.

### S11 — Employees

**Purpose and actions**: Find fictional Employees and enter maintenance. `[1]` Add Employee; `[2]` open detail; `[3]` search; `[4]` filter; `[5]` clear; `[6]` paginate.

**Layout and components**: App Shell, Administration Breadcrumbs, Page Header, fictional-data Banner, Filter Bar, Applied Filter Summary, desktop Employee Data Table/phone cards, count/Pagination.

**Content and data**: Organization-scoped display name/work identifier, Team, Manager, safe Account link state, active status, filter values/page metadata. `DATA`: no secrets; access scope precedes search/count.

**Interactions and states**: Add opens empty S12; Open loads S13; filters/Back retain context; inactive remains discoverable when permitted; no hard delete; account link enters S24 only when permitted. No Employees recommends Add; partial relationships label unavailable; stale opens fresh S13; denied/offline safe.

**Accessibility**: labelled filters; semantic table/equivalent cards; text status; explicit Open; named filter removal; direct Add after heading. `Q`: required/searchable fields, unique work identifier, inactive default, HR Account-link scope, valid Team/Manager combinations.

### S12 — Employee Editor

**Purpose and actions**: Create/update one fictional Employee. `[1]` review changes; `[2]` confirm save; `[3]` cancel; `[4]` correct fields; `[5]` permitted Team/Account setup; `[6]` reconcile.

**Layout and components**: App Shell, Breadcrumbs, create/edit Page Header, fictional-data Banner, Work Identity Field Group, Workforce Relationships group, Account Link, Status selector, readiness panel, Error Summary, before/after Review, confirmation.

**Content and data**: Latest record/version, work identity fields, Teams, eligible Managers (no self/cycle), eligible Account link, status rules, uniqueness/relationship validation, audit context. `DATA`: server owns scope/uniqueness/lifecycle checks.

**Interactions and states**: Team changes Manager options. Review validates all. Draft input returns after permitted setup. Deactivation explains request/balance/Manager/Account impact. Saving is guarded; success opens S13; stale update does not overwrite. Loading, field/relationship error, review, saving, concurrent, denied, and offline states preserve safe data.

**Accessibility**: semantic fieldsets, labels/required semantics, announced dynamic options, Error Summary focus, explicit old/new review, text consequences, restore focus after dialogs. `Q`: exact fields, Account-link authority, Team/Manager optionality, inactive effects, inline Team creation.

### S13 — Employee Details

**Purpose and actions**: Show latest Employee profile and safe maintenance/investigation routes. `[1]` edit; `[2]` open Balance; `[3]` open permitted leave context; `[4]` open Account; `[5]` open Business Activity; `[6]` return list.

**Layout and components**: App Shell, Breadcrumbs, Page Header/status/Edit, Work Identity definition list, Workforce Relationships, Account Link, Leave Operations, Recent Changes, readiness warning, fictional-data Banner.

**Content and data**: Employee/version, approved identity fields, Team/Manager, lifecycle, safe Account state, permitted balance/request summaries, audit summaries, readiness issues. `DATA`: field-filtered responses; relation access is independent.

**Interactions and states**: Edit opens S12; related links carry safe subject context; incomplete relationships route to owners; inactive remains historically viewable; Back restores S11. Loading, active-ready, active-incomplete, inactive, partial related error, concurrent, denied, and offline states are explicit.

**Accessibility**: heading includes fictional name; status text; terms/values; descriptive related links; warning headings; responsive order preserves sections. `Q`: viewable fields, request-summary depth, audit-summary amount, Account-link access, visible readiness issues.

### S14 — Leave Readiness

**Purpose and actions**: Explain selected Leave Type/scope readiness. `[1]` open failed prerequisite; `[2]` rerun checks; `[3]` select scope; `[4]` return blocked context; `[5]` inspect permitted evidence.

**Layout and components**: App Shell, Breadcrumbs, Page Header, Leave Type/scope selectors, Run Checks, Overall Status, grouped Readiness Checklist, return-context Banner.

**Content and data**: Effective type/policy, schedule/holidays/time zone, workforce/balance readiness, check status/impact/owner/last-run/evidence version. `DATA`: server produces one authoritative readiness snapshot.

**Interactions and states**: Failed check routes to S15-S18/S12/S20/S30; passed checks remain visible; Draft does not satisfy Ready; check refresh/return context is safe. Loading, Ready, Not Ready, indeterminate, absent types, running, partial error, denied, and offline states never overclaim readiness.

**Accessibility**: overall result is text; semantic grouped checklist; each item names impact/action; completion announces failed count; focus reaches result after explicit run. `Q`: exact checks, scope, blocking levels, freshness, proactive invalidation, evidence visible to HR.

### S15 — Leave Types

**Purpose and actions**: Maintain effective Leave Types. `[1]` Add Leave Type; `[2]` edit Draft/create version; `[3]` filter; `[4]` inspect history; `[5]` save Draft; `[6]` review/activate; `[7]` return readiness.

**Layout and components**: App Shell, Breadcrumbs, Page Header, status/period Filter Bar, Leave Type list, selected Detail/Editor, Version History, Readiness Impact, review/Activation Dialog. Phone uses list then detail view.

**Content and data**: Type identifiers, employee-facing name/label, request unit/status, effective ranges, related Policy, lifecycle, historical references, version/e-tag, readiness/audit evidence. `DATA`: server validates uniqueness, range, history, activation.

**Interactions and states**: Add makes Draft; Active is never in-place edited; Draft save does not satisfy readiness; activation reviews boundary; retire preserves history; stale edit reconciles; returning S14 rechecks. Loading, none, no-match, editing, validation/date conflict, review, success, concurrent, denied, offline states are explicit.

**Accessibility**: list/detail headings, text lifecycle/effective dates, labelled form/history, old/new comparison, named activation consequence, Error Summary links field. `Q`: required types/fields, type versus policy fields, units, retirement with future requests, label versioning, read authority.

### S16 — Policies

**Purpose and actions**: Maintain simple effective-dated leave rules. `[1]` Add/create version; `[2]` edit Draft; `[3]` filter; `[4]` history; `[5]` save Draft; `[6]` review/activate; `[7]` return readiness.

**Layout and components**: App Shell, Breadcrumbs, Page Header, type/status/period filters, Policy list/detail, simple rule Field Groups, related Type, Version History, Readiness Impact, review/Activation Dialog.

**Content and data**: Policy/version, related Leave Type, entitlement basis, request/overlap/cancellation constraints, effective lifecycle/range, historical references, version, audit/readiness evidence. `DATA`: server validates rule combinations and historical immutability.

**Interactions and states**: Active rules create new version; conditional fields show plain-language consequence; Draft remains inactive; activation leaves prior Active unchanged on failure; stale edits reconcile. Loading, none, no-match, Draft, rule/date error, historical warning, review, success, concurrent, denied, offline states are explicit.

**Accessibility**: fieldsets/legends, numeric unit/date guidance, conditional-field announcement, text lifecycle, comparison labels, Error Summary links. `Q`: exact simple rule model, overlap, cancellation, negative balance, entitlement/period, future Approved impact, policy cardinality.

### S17 — Work Schedule

**Purpose and actions**: Define effective weekly working pattern. `[1]` create/edit Draft version; `[2]` review/activate; `[3]` select scope/version/period; `[4]` preview calendar; `[5]` save Draft; `[6]` history; `[7]` return readiness.

**Layout and components**: App Shell, Breadcrumbs, Page Header, scope/version selectors, weekly-pattern editor, effective-date fields, Calendar Preview/list, Version History, Readiness Impact, activation review.

**Content and data**: Scope, effective schedules, weekday working state/approved amounts, date ranges/lifecycle, organization date context, holiday preview, references/version/readiness/audit evidence. `DATA`: date-only calculation inputs; server validates activation.

**Interactions and states**: Draft copy/edit; all weekdays visible; preview is illustrative only; active not edited in place; invalid/no working day/date conflict blocks activation; success offers S14. Loading, none, Draft, invalid pattern, conflict, unavailable preview, review, success, concurrent, denied, offline states are explicit.

**Accessibility**: labelled weekday group, text working state, persistent date labels, equivalent chronological preview, text draft/active state, keyboard weekday order. `Q`: organization-wide schedule, multiple scopes, partial days, governing time zone, future Approved impact, representative examples.

### S18 — Public Holidays

**Purpose and actions**: Maintain fictional Holiday calendar for calculation. `[1]` add; `[2]` edit/retire; `[3]` select calendar/year/status; `[4]` view calendar; `[5]` review impact; `[6]` return readiness.

**Layout and components**: App Shell, Breadcrumbs, Page Header, calendar/year/status filters, chronological Holiday list, optional Calendar Preview, Holiday editor drawer/detail, conflict/historical warning, readiness panel.

**Content and data**: Calendar/scope, holiday id/name/date-only/status, duplicate/scope rules, schedule preview, historical/future references, version/readiness/audit evidence. `DATA`: server preserves historical request evidence and validates change.

**Interactions and states**: Add carries selected scope/year; duplicate is explicit; referenced change reviews impact; retire replaces delete; success refreshes year/S14. Loading, none, no-match, editing, duplicate/conflict, historical warning, review, success, concurrent, denied, offline states are explicit.

**Accessibility**: chronological list always available; explicit year/date format; accessible calendar cells; labels/errors/dialog context; text status/conflict; focus returns to edited holiday. `Q`: calendar scope, weekend/substitute rule, referenced correction boundary, manual entry sufficiency, local seed data.

### S19 — Employee Balances

**Purpose and actions**: Find one Employee Balance. `[1]` open Balance Detail; `[2]` search; `[3]` filter; `[4]` clear; `[5]` paginate; `[6]` open readiness route.

**Layout and components**: App Shell, Breadcrumbs, Page Header, Filter Bar, Applied Filter Summary, desktop Balance Data Table/phone cards, count/Pagination, readiness warning.

**Content and data**: scoped Employee, type/period, available/reserved/used/projected fields, Team, reconciliation status/time, filter/page metadata. `DATA`: authorization precedes aggregation/search/count.

**Interactions and states**: Open S20; filter resets page; Back restores; missing Balance is readiness not zero; no bulk mutation; stale opens fresh S20. Loading, no initialized balance, no-match, unreconciled, partial error, query error, stale, denied, offline states are explicit.

**Accessibility**: values carry unit/type/period; semantic table/equivalent cards; text reconciliation status; labels/result announcement/explicit Open. `Q`: primary balance fields, period, opening initialization, reconciliation statuses, negative display, export.

### S20 — Balance Detail and Adjustment

**Purpose and actions**: Explain Balance and append one controlled adjustment. `[1]` Adjust; `[2]` review/confirm; `[3]` select type/period; `[4]` inspect transaction; `[5]` Business Activity; `[6]` cancel; `[7]` refresh.

**Layout and components**: App Shell, Breadcrumbs, Page Header, Balance Summary, Reconciliation Status, immutable Transaction History, adjustment form, before/change/after Review, Confirmation Dialog, audit link.

**Content and data**: Employee/type/period, projection/version, immutable transactions with amount/reason/result, valid adjustment choices, policy/closed/negative rules, command identity/audit evidence. `DATA`: server validates and commits ledger/projection atomically.

**Interactions and states**: Detail is read-only until adjustment. Signed type/amount is unambiguous. Review shows exact impact; confirm guarded; success appends/refetches; stale blocks overwrite. Loading, reconciled, no history, unreconciled, editing, validation, review, submitting, success, concurrent, denied, offline states are explicit.

**Accessibility**: labelled values/units/periods; semantic history; text sign; form guidance; Error Summary; named consequence dialog; one completion announcement. `Q`: authoritative projection fields, types, negative/closed rules, reason guidance, second review, reconciliation.

### S21 — Business Activity

**Purpose and actions**: Find safe business audit evidence. `[1]` open event; `[2]` filter; `[3]` clear; `[4]` permitted subject link; `[5]` paginate; `[6]` return context.

**Layout and components**: App Shell, Breadcrumbs, Page Header, scoped Filter Bar, Applied Filter Summary, chronological Audit Event table/phone records, count/Pagination, context/privacy Banner.

**Content and data**: allowed event action/time/subject/reference/actor role/outcome/correlation, permitted links, stable filtering/page metadata. `DATA`: field filtering and authorization precede matching/count; no raw payload/secrets.

**Interactions and states**: Open S22; originating filters persist; correlation includes visible events only; links reauthorize; immutable events cannot mutate. Loading, no activity/no-match, partial subject unavailable, query error, retention boundary, denied, offline states are explicit.

**Accessibility**: precise time, semantic headers/equivalent records, text action/outcome, labelled filters, explicit Open/context return, named pagination. `Q`: useful event types/fields, actor detail, retention, before/after scope, export, correlation explanation.

### S22 — Audit Event Detail

**Purpose and actions**: Explain one permitted business event. `[1]` open corrective route; `[2]` correlated event; `[3]` permitted subject; `[4]` return activity; `[5]` copy safe reference; `[6]` external follow-up.

**Layout and components**: App Shell, Breadcrumbs, event/outcome Page Header, Event Summary, Actor/Context panel, allow-listed Change Evidence, Correlated Events, subject link, Corrective Action panel, privacy notice.

**Content and data**: immutable id/action/time/outcome/actor role/subject/correlation, allowed before/after fields, visible correlations, subject permission, corrective mapping/return context/retention. `DATA`: raw secrets, broad payloads, sensitive reasons, and unnecessary personal data are excluded.

**Interactions and states**: Event/fields reauthorize; corrective action enters owning screen rather than mutating audit; return verifies resultant event; external follow-up retains safe reference only. Loading, limited evidence, unavailable subject/correlations, correction-not-permitted, retention, error, denied, offline states are explicit.

**Accessibility**: heading names event/outcome; term/value evidence; explicit Previous/Resulting labels; descriptive correlated links; omitted data explained; copy control names reference. `Q`: safe before/after per type, actor visibility, corrective mapping, escalation ownership, retention, reference audience.

### S23 — Accounts and Roles

**Purpose and actions**: Find or create organization Accounts. `[1]` Add Account; `[2]` open Account; `[3]` search; `[4]` filter; `[5]` clear; `[6]` paginate; `[7]` related Security Activity.

**Layout and components**: App Shell, Breadcrumbs, Page Header, Filter Bar, Applied Filter Summary, Account Data Table/phone cards, count/Pagination, safeguard warning.

**Content and data**: safe identity reference, linked Employee summary, explicit role list, active/disabled state, safeguard indicator, permitted security relation, page metadata. `DATA`: organization authorization before search/count; no credentials/tokens/claims payloads.

**Interactions and states**: Add/open S24; role filter matches explicit assignment; disabled history remains authorized; no list mutation; stale reloads S24. Loading, no Accounts/no-match, safeguard risk, partial link error, query error, stale, denied, offline states are explicit.

**Accessibility**: roles/status are text; table/cards equivalent; labelled filters; explicit Account Open; semantic role list; named warnings/filter removal. `Q`: identity provider/fields, Account-without-Employee, link cardinality, multi-role, safe search fields, administration safeguard.

### S24 — Account Detail and Editor

**Purpose and actions**: Safely create/change one Account. `[1]` edit; `[2]` review/confirm; `[3]` link/unlink Employee; `[4]` cancel; `[5]` Security Activity; `[6]` reconcile; `[7]` return list.

**Layout and components**: App Shell, Breadcrumbs, Account/status Page Header, Identity panel, Employee Link, explicit Fixed Roles group, Access Summary, lifecycle Status, safeguard warning, before/after review, Confirmation Dialog, security link.

**Content and data**: latest Account/version, safe identity reference, eligible Employee, role assignments, status, role-to-navigation summary, active Administrator count/self context, command/audit/security evidence. `DATA`: server owns uniqueness/link/scope/safeguard validation.

**Interactions and states**: create starts unselected unless approved default; Access Summary is preview only; review shows impact; self-disable/self-role-removal/last-Administrator safeguard blocks; confirm guarded; success refreshes/audits; stale reconciles. Loading, read-only, edit, validation/link error, blocked safeguard, review, submitting, success, concurrent, denied, offline states are explicit.

**Accessibility**: semantic identity/link/role/status groups; labelled multi-select roles; structured Access Summary; blocking warning focus; explicit old/new; dialog names Account/consequence; focus returns heading. `Q`: role multiplicity, Administrator inheritance, self-change, recovery, identity attributes, link owner, Account/Employee lifecycle relationship.

### S25 — Security Activity

**Purpose and actions**: Find safe security-sensitive event evidence. `[1]` open event; `[2]` filter; `[3]` clear; `[4]` Account link; `[5]` paginate; `[6]` return alert context.

**Layout and components**: App Shell, Breadcrumbs, Page Header, security Filter Bar, Applied Filter Summary, chronological Security Event table/phone records, count/Pagination, security-data notice.

**Content and data**: allowed type/time/subject/outcome/classification/source/correlation, permitted Account links, later-approved alert state, page metadata. `DATA`: no passwords/tokens/sessions/raw headers/unrestricted claims; projection before matching/count.

**Interactions and states**: Open S26; correlation returns visible events only; Account link reauthorizes; classification is evidence not accusation; no mutation from list. Loading, neutral no-activity/no-match, unclassified, partial account unavailable, query error, retention, denied, offline states are explicit.

**Accessibility**: text time/type/subject/outcome/classification; semantic table/cards; labelled filters/count; explicit Open; named filter removal/pagination; notices are informative not disruptive. `Q`: qualifying events, vocabulary, severity/assignment, safe identity, retention/alerting, failed-event aggregation.

### S26 — Security Event Detail

**Purpose and actions**: Classify/investigate one event and safely respond or escalate. `[1]` classify; `[2]` choose response; `[3]` safeguarded S24 Account action or external escalation; `[4]` inspect correlations; `[5]` open permitted subject; `[6]` follow-up; `[7]` close; `[8]` copy safe reference.

**Layout and components**: App Shell, Breadcrumbs, event/outcome Page Header, Event Summary, Account/Context panel, allow-listed Evidence, Correlated Events, Classification control, Response Decision, in-product/external route, Follow-up Evidence, closure action, data notice.

**Content and data**: immutable event/time/source/outcome/subject/correlation, safe evidence, permitted Account/roles, correlations, classification/review metadata if supported, response mapping, follow-up/escalation/audit evidence. `DATA`: source event remains immutable; no secrets or sensitive platform payload.

**Interactions and states**: classification records judgment separately; no-response retains review evidence; S24 response applies safeguards; escalation only copies safe reference; return refreshes follow-up; closure needs sufficient evidence/escalation. Loading, unclassified, insufficient evidence, no-response, response available, escalation, follow-up confirmed/unresolved, unavailable subject, error, denied, offline states are explicit.

**Accessibility**: term/value event evidence; labelled classification and response group; descriptive correlations; closure/response confirmation names consequence; one result announcement; text for omitted evidence/classification/outcome. `Q`: classification/rationale model, storage, safe response set, escalation owner/record, closure evidence, alert workflow, permitted security detail.

---

## 9. Cross-Screen Patterns

### Navigation

- App Shell persists on authenticated routes. The desktop sidebar expands/collapses; every collapsed destination keeps a recognizable semantic icon, accessible name, tooltip, and active state. Phone uses a focus-managed drawer.
- Breadcrumbs appear on Administration and detail pages. Browser Back restores safe list filters, pagination, and return context.
- Deep links are reauthorized server-side. Unauthorized routes produce a generic safe unavailable state.

### Forms and Validation

- Validate progressively where useful after meaningful interaction: required values, email format, date ordering, and plainly invalid ranges. Show the message directly below the owning field.
- Avoid premature errors while typing or for untouched optional fields. On review/submit, present Error Summary plus linked inline errors. Preserve valid input.
- Server validation is authoritative. Commands with significant effects use review and confirmation; no client optimistic claim substitutes for committed result.

### Feedback and Messaging

- Inline Alert: local fields/states. Banner: persistent fictional-data, readiness, offline, or broad context. Confirmation Dialog: consequential mutation. Toast: non-critical acknowledgement such as copied reference only.
- Never use a toast as the only confirmation of a committed request, decision, configuration, balance, or access command. Uncertain outcomes never claim success.

### Tables and Lists

- Server-scoped filters, stable sort, result count, and Pagination are consistent. Desktop uses semantic tables; narrow layouts provide labelled cards/records with equivalent data and explicit actions.
- First-use empty and no-filter-match states are distinct. Status, severity, and reconciliation use text, not colour alone.

### Search

- There is no global search. Requests, Employees, Balances, Business Activity, Security Activity, and Accounts each provide section-scoped search/filtering.
- Organization scope and authorization apply before matching or counts. Safe filter state can be retained in URLs; sensitive data is excluded.

### Permissions

- The UI omits unauthorized navigation/actions but never treats that as enforcement; every query and command is server-authorized.
- Personal views remain personal for multi-role users. Administrator breadth remains constrained by explicit safeguards and safe field projection.

---

## 10. Validation Checklist

### Coverage

- [x] All P0 flows F1-F9 have start-to-finish coverage.
- [x] Critical screen edge cases and owning states are defined.
- [x] Screen inventory matches approved scope: 26 P0, 6 P1, 0 P2.
- [x] All 26 P0 screens are documented.

### Clarity

- [x] Each screen has a primary task/action.
- [x] Labels match IA-controlled vocabulary.
- [x] Navigation is predictable, reversible, and role-aware.
- [x] Component naming is consistent.

### Feasibility and Test Readiness

- [x] Data needs, authority boundaries, and unresolved assumptions are explicit.
- [x] Permission, concurrency, offline, loading, empty, error, and accessibility needs are addressed.
- [x] Representative-user tasks can be derived from F1-F9.
- [x] HLD-sensitive decisions are carried forward.

---

## 11. Open Questions and Decisions Needed

| Priority | Question | Why it matters | Owner | Resolution / timing |
|---|---|---|---|---|
| Medium | MVP Leave Types, overlap, cancellation, partial-day, and notice rules | Changes eligibility labels and states. | Andrei — Product; Lead Engineer | Policy decision before Leave Workflow implementation. |
| Medium | Manager privacy boundary and Team Availability detail | Determines what S08-S10 may show. | Andrei — Product | Validate with representative Managers before manager epic planning. |
| Medium | Employee fields, relationship model, and Account linking | Determines S11-S13/S24 field contracts. | Andrei — Product/Architect | Finalize in HLD and workforce specification. |
| Medium | Administrator fixed-role model and lockout recovery | Determines access summaries and safeguards. | Andrei — Architect | Resolve before authorization implementation. |
| Medium | Calendar/time-zone/effective-version rules | Determines calculation/configuration behaviour. | Andrei — Architect; Lead Engineer | Resolve in HLD before calculation implementation. |
| Medium | Identity and notification provider choices | Determines provider adapter fields and delivery status. | Lead Engineer; Andrei — Architect | Resolve before integration work. |
| Medium | Representative-user evidence | Validates personas, labels, phone behaviour, and explanation depth. | Andrei — Product | Run 2–3 participant usability sessions before declaring UX validated. |

### Risks

- Persona and device assumptions are unvalidated; treat the blueprint as stakeholder-approved structure, not proof of usability.
- HLD changes can alter fields, error/recovery paths, or authorization; update this artifact traceably when that happens.
- UI visibility does not prove data isolation; negative authorization and field-projection tests remain required.
- This low-fidelity blueprint intentionally contains no visual design decision; later design-pipeline work must define tokens and components.

---

## 12. Next Steps

### Immediate

- Review these wireframes with two to three representative participants using F1-F3 task scenarios.
- Create an accessibility specification for the P0 screens and flows.
- Update the journey map with the approved future-state experience.
- Consolidate the risk register before Architecture, Strategy & Backlog.

### Near-term

- Create a clickable low-fidelity prototype if participant testing needs it.
- Use the approved blueprint to derive OOUX, design language, design system, component, and high-fidelity handoff work after their gates.
- Reconcile wireframes with HLD decisions and enrich the PRD if design reveals requirement changes.

### Future

- Replace assumption-labelled UX decisions with participant evidence.
- Build and test the approved screens through governed implementation work.

---

## 13. Acceptance Criteria

- [x] IA alignment and responsive side-navigation model are documented.
- [x] All nine approved end-to-end P0 flows and their edge cases are covered.
- [x] Every P0 screen has purpose, actions, layout/components, data, interaction notes, states, accessibility, and questions.
- [x] Assumptions, risks, and owners are explicit.
- [x] Empty, loading, error, no-permission, and offline states are documented for every P0 screen.
- [x] Cross-screen navigation, validation, feedback, tables, search, and permission patterns are consistent.
- [x] The blueprint is ready for usability planning, accessibility specification, OOUX, and later visual design without structural rework.

---

## Related Artifacts

- [Context](../explore-employee-hub/context.md)
- [Information Architecture](information-architecture-employee-hub.md)
- [Personas](../domain/personas-employee-hub.md)
- [Journey map](../domain/journey-employee-hub.md)
- [User flows](../domain/flows-employee-hub.md)
- [PRD](../prds/employee-hub-prd.md)
- [Regulatory learning baseline](../explore-employee-hub/regulatory-compliance.md)

**Last Updated**: 2026-09-01  
**Status**: Stakeholder-approved low-fidelity blueprint; representative-user and HLD validation pending
