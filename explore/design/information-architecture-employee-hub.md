# Information Architecture: Employee Hub

**Project**: Employee Hub  
**Created**: 2026-08-31  
**Last Updated**: 2026-08-31  
**Status**: Stakeholder-approved; user validation planned

## 1. Snapshot

### Objective

Define a shallow, task-oriented information structure that helps Employees request and track leave, Managers decide requests, HR maintain leave operations, and Administrators control access and investigate activity.

### Scope

**In scope**:

- Responsive web navigation, hierarchy, labels, entry points, wayfinding, search/filter scope, and role visibility.
- The approved PRD scope from personal leave through team decisions and administration.
- Expanded and collapsed sidebar behaviour plus the persistent top navbar.
- IA states needed to inform detailed flows and wireframes.

**Out of scope**:

- Visual styling, exact icon artwork, component anatomy, animation, and detailed field layout.
- Interaction sequencing beyond navigation and wayfinding; these belong in formal user flows.
- Native mobile navigation, public sharing, global cross-entity search, and excluded PRD capabilities.

### Users and top tasks

| Priority | Top task | Personas |
|---:|---|---|
| 1 | Plan and request leave | P1 Employee; P2 Manager, P3 HR, and P4 Administrator when acting as Employees |
| 2 | Track and manage my leave | P1–P4 |
| 3 | Review and decide team leave | P2 Manager; P4 Administrator |
| 4 | Prepare and maintain leave operations | P3 HR; P4 Administrator |
| 5 | Control access and investigate changes | P4 Administrator; P3 HR for permitted business audit |

### Surfaces

- Responsive browser application.
- Desktop: persistent top navbar and collapsible left sidebar.
- Phone-sized layout: top navbar and menu button opening the navigation drawer.
- Expanded and collapsed navigation expose the same authorized destinations and functionality.

### Assumptions

- Goal-based labels match users' task mental models better than entity/system labels.
- A role-aware Home and shallow hierarchy reduce time to the next important action.
- Two to three representative participants can provide directional findability evidence.
- Section-scoped search and filters are sufficient at the initial 10-Employee scale.
- Distinct icons, accessible names, tooltips, and active state make collapsed navigation usable; this requires testing.

### Constraints

**Known**:

- Fixed Employee, Manager, HR, and Administrator roles; Administrator accesses every feature through explicit permissions.
- Server authorization—not navigation visibility—is authoritative.
- The IA covers one organization, a responsive Angular application, fictional data, and the approved PRD boundary.
- Hierarchy depth is limited to four levels.
- Plain language must follow the canonical domain glossary and PRD vocabulary.

**Unknown or awaiting validation**:

- Real user mental models, task frequency, device preferences, and icon recognition.
- Exact supported browser matrix, icon library, design system, and visual treatment.
- Whether larger datasets require broader search or saved views.
- Final Administrator permission composition, to be resolved in HLD before R-017 planning.

## 2. Organizing Principles

### Primary grouping strategy

**Selected strategy**: Goal-based, supported by responsibility-based visibility.

Users navigate by what they need to accomplish—Request leave, My leave, Team work, or Administration—rather than by database entities or internal departments. Role permissions adapt one coherent structure instead of creating separate applications.

### Supporting principles

- Keep the hierarchy at two to four levels and provide shortcuts to frequent tasks.
- Make Request leave directly accessible from persistent navigation and relevant Home states.
- Separate personal work, team responsibility, and administration.
- Use one plain-language label for each concept in navigation.
- Keep infrequent evidence and settings behind progressive disclosure rather than deep nesting.
- Preserve the same destination order and functionality in expanded, collapsed, and drawer navigation.
- Hide unauthorized destinations for clarity while rejecting unauthorized routes server-side.
- Keep the top navbar focused on product identity, navigation control, and current-user utilities.

### Trade-offs

**Optimizes for**:

- Fast access to the five approved top tasks.
- Clear personal/team/administrative boundaries.
- Predictable navigation across roles and viewport sizes.
- Safe section-scoped search and role-aware disclosure.

**May sacrifice**:

- One-place discoverability of every entity, because policies, balances, and requests appear in task context.
- Power-user speed from global search and broad shortcuts.
- Immediate exposure of rare configuration and historical evidence.

Canonical administration pages and consistent cross-links prevent task-oriented presentation from creating duplicate ownership.

## 3. Navigation Model

### Proposed model

**Selected model**: Responsive side navigation with a persistent top navbar and contextual local navigation.

### Rationale

- The side navigation accommodates five top-level task areas plus role-gated administration without crowding the header.
- It scales from Employee-only navigation to Administrator breadth while preserving order and labels.
- Collapse supports workspace efficiency on desktop; a drawer supports phone-sized layouts.
- The top navbar gives the sidebar control a stable location and keeps profile actions separate from task navigation.

### Behaviour rules

**Top navbar**:

- Left: Employee Hub logo followed by the sidebar menu button.
- Right: current user's display name and a dropdown containing My profile and Sign out.
- The menu button exposes an accessible name and expanded state; it collapses/expands the desktop sidebar and opens/closes the mobile drawer.
- The navbar remains available across authenticated pages.

**Persistent sidebar**:

- Authorized destinations retain a stable order.
- Every sidebar destination has a distinct icon.
- Expanded state shows icon and text label.
- Collapsed state keeps every destination icon visible, with accessible name, hover/focus tooltip, and clear active state.
- Nested authorized destinations open through an accessible icon-triggered flyout when collapsed.
- Collapsing navigation never removes a destination or action.

**Contextual navigation**:

- Request, Employee, configuration, balance, and audit details may use local tabs/links.
- Contextual links vary by role, entity state, and permitted action; they do not become a competing global navigation system.

**Breadcrumbs**:

- Used on Administration and detail routes deeper than two levels.
- Omitted from simple top-level pages.
- Format uses plain labels, for example `Administration > People > Employees > Employee details`.

**Search**:

- No unrestricted global search in MVP.
- Search is section-specific for Requests, Employees, Balances, Business activity, and Security activity.
- Authorization and organization scope are applied before matching/results.
- Results are grouped and sorted according to each section's facets rather than across entity types.

**Cross-links**:

- Request receipt → related Balance history.
- Pending approval → request review and permitted Team availability.
- Audit event → permitted subject detail.
- Readiness issue → responsible Administration destination.
- Links are rendered only when the destination is permitted; deep-link authorization remains server-side.

## 4. Sitemap or Screen Hierarchy

```text
Employee Hub
├── Global shell
│   ├── Top navbar
│   │   ├── Logo
│   │   ├── Sidebar menu button
│   │   └── Current-user menu
│   ├── Expanded/collapsed sidebar
│   └── Notifications
│
├── Home
├── Request leave
│   ├── Request form
│   ├── Calculation preview
│   └── Submission confirmation
│
├── My leave
│   ├── Overview and balances
│   ├── Requests
│   │   └── Request detail and receipt
│   └── Balance history
│
├── Team
│   ├── Pending approvals
│   │   └── Request review and decision
│   ├── Team availability
│   └── Direct reports
│
├── Administration
│   ├── People
│   │   ├── Employees
│   │   │   ├── Add employee
│   │   │   └── Employee details
│   │   └── Teams
│   ├── Leave setup
│   │   ├── Leave readiness
│   │   ├── Leave types
│   │   ├── Policies
│   │   ├── Work schedule
│   │   └── Public holidays
│   ├── Balances
│   │   ├── Employee balances
│   │   └── Balance detail and adjustment
│   ├── Audit
│   │   ├── Business activity
│   │   └── Audit event detail
│   └── Access & settings
│       ├── Accounts and roles
│       ├── Organization settings
│       └── Security activity
│
└── Current-user menu
    ├── My profile
    └── Sign out
```

### Notes

- **Maximum depth**: four navigable levels. The root product shell is not counted as a user choice.
- **Global when authorized**: Home, Request leave, My leave, Team, Administration, Notifications, and current-user menu.
- **Contextual**: previews, confirmations, details, receipts, decisions, adjustments, and event details.
- **Nouns** name sections/lists; verbs name commands such as Request leave, Add employee, Adjust balance, and Sign out.
- **Plural labels** name collections; singular/entity-specific titles name details.
- Screen states such as loading, empty, validation error, denied, stale/conflict, and success belong to each owning screen and do not create sitemap destinations.

## 5. Content Model Alignment

### Key entities and placement

| Entity | Definition | IA ownership | Primary views and navigation attributes |
|---|---|---|---|
| Employee | Fictional worker profile linked to an account, team, and optional Manager | My profile; Administration > People; Team > Direct reports | Own summary; Employee list/detail; active status, Team, Manager |
| Leave Request | One Employee's request for one Leave Type and inclusive date range | Request leave; My leave > Requests; Team > Pending approvals | Form/preview/confirmation; list/receipt; review/decision; reference, status, dates |
| Request Day Breakdown | Server-produced included/excluded date evidence | Contextual within preview and receipt | Progressive calculation details; date, counted amount, exclusion reason |
| Leave Balance / Balance Transaction | Reconciled balance projection and immutable changes | My leave; Administration > Balances | Summary, history, detail, adjustment; type, period, available/reserved/used |
| Approval Decision | Immutable Manager decision | Contextual within request review and receipt | Decision action/history; outcome, actor, time, concise reason |
| Team | Organizational grouping and Manager relationship | Team; Administration > People > Teams | Availability, direct reports, team maintenance |
| Leave Type / Policy | Effective leave category and simple rule set | Administration > Leave setup | Lists/details/configuration; active/effective state |
| Work Schedule / Public Holiday | Inputs to working-day calculation | Administration > Leave setup | Schedule and holiday maintenance; effective calendar evidence |
| Audit Event | Immutable business/security evidence | Administration > Audit or Access & settings > Security activity | Searchable list/detail; actor, action, subject, outcome, time |
| User Account / Role Assignment | Authentication link and explicit fixed-role access | Administration > Access & settings | Account/role list/detail; status, roles, Employee link |
| Notification | Delivery intent/outcome separate from business state | Notifications utility | List and link to permitted subject; read and delivery status |

### Relationships that influence navigation

- Employee has Leave Requests and Leave Balances: own links live in My leave; HR/Admin links live in permitted Employee details.
- Leave Request has breakdown, decision, balance effects, audit events, and notifications: receipt presents these progressively and cross-links to permitted history.
- Manager relates to direct-report Employees: Team navigation and approval search remain constrained to that relationship.
- Leave Policy, Work Schedule, and Public Holidays determine calculation: receipts show evidence but editing remains under Leave setup.
- Audit Event references a subject: subject links appear only when the reviewer can read that subject.
- Account/Role may link to Employee: access administration does not silently grant leave-data visibility outside the approved Administrator model.

### Governance and ownership

| Content | Create/change authority | Deletion/history rule | IA location |
|---|---|---|---|
| Own Leave Request | Employee capabilities; Manager decides assigned Pending requests | Cancel/compensate; terminal history retained | Request leave / My leave / Team |
| Employee and Team | HR and Administrator | Deactivate; preserve historical references | Administration > People |
| Leave configuration | HR and Administrator | Retire/version; do not overwrite historical meaning | Administration > Leave setup |
| Balance adjustment | HR and Administrator with explicit permission | Append-only transaction; no ledger deletion | Administration > Balances |
| Accounts and roles | Administrator | Disable/revoke; audit changes | Access & settings |
| Audit events | System appends; authorized reviewers read | Immutable through normal application workflows | Audit / Security activity |

## 6. Labeling and Taxonomy

### Section labels

| Label | Purpose |
|---|---|
| Home | Role-aware overview and outstanding actions |
| Request leave | Start one new leave request |
| My leave | Own balances, requests, receipts, cancellation, and history |
| Team | Manager approvals, availability, and direct reports |
| Administration | Workforce, leave setup, balances, audit, access, and settings |
| Notifications | Workflow responsibility and delivery outcomes |
| My profile | Own Employee/account-facing profile information |

Administration uses the stable subgroup labels People, Leave setup, Balances, Audit, and Access & settings.

### Screen labels

Approved titles include Home, Request leave, Review request, Request submitted, My leave, My requests, Leave request followed by its actual request reference, Balance history, Pending approvals, Review leave request, Team availability, Direct reports, Employees, Add employee, Employee details, Teams, Leave readiness, Leave types, Policies, Work schedule, Public holidays, Employee balances, Adjust balance, Business activity, Audit event, Accounts and roles, Organization settings, Security activity, Notifications, and My profile.

### Controlled vocabulary

| Preferred term | Definition |
|---|---|
| Leave request | One Employee's request for one Leave Type and date range |
| Working days | Requested dates counted against the balance |
| Available / Reserved / Used | User-facing balance amounts with distinct meanings |
| Pending / Approved / Rejected / Cancelled | Canonical Leave Request statuses |
| Request reference | Durable identifier displayed to users |
| Calculation details | Included/excluded dates and projected/committed balance effect |
| Direct reports | Employees currently assigned to a Manager |
| Leave readiness | Presence and validity of required Employee, Manager, policy, calendar, and balance inputs |
| Notification status | Delivery state, explicitly separate from Request status |

**Acceptable in explanatory content, not navigation**:

- Time off for leave.
- Request history for My requests.
- Team member for direct report when reporting responsibility is irrelevant.

**Do not use**:

- Dashboard: use Home.
- PTO or vacation: region/policy-specific; use leave or the configured Leave Type.
- Tenant: use organization.
- User: use Employee or Account according to meaning.
- Ledger: use Balance history.
- Workflow state: use Request status.
- Outbox, DTO, or transaction in user-facing content.
- Holiday without qualification: distinguish Leave from Public holiday.

### Facets and filters

| Area | Facets | Default |
|---|---|---|
| My requests | Status, Leave Type, date period | Newest activity first |
| Pending approvals | Employee, Team, Leave Type, leave dates | Pending only; nearest leave date first |
| Team availability | Date range, Team | Current month and permitted team |
| Employees | Name, status, Team, Manager | Active Employees |
| Balances | Employee, Leave Type, entitlement period | Current period |
| Business/Security activity | Date, actor, action, subject type, outcome | Newest first |
| Public holidays | Year | Organization's current year |
| Notifications | Read state, type, delivery status | Newest first |

## 7. Entry Points and Wayfinding

### Primary entry points

**Home**:

- Employee: balances, recent requests, and Request leave.
- Manager: Employee information plus pending approval count/action.
- HR: readiness issues and Administration shortcuts.
- Administrator: all authorized operational and security areas.

**Global navigation**:

- Authorized top-level destinations remain available from the sidebar/drawer.
- Current-user utilities remain available from the navbar.
- Primary actions are contextual: Request leave, Review request, Add employee, Adjust balance, or Resolve readiness.

**Search**:

- Available only in owning list areas.
- Search/filter state may be reflected in the URL where safe for return/navigation.
- Results never broaden the user's authorized scope.

### Secondary entry points

- Notifications open the exact permitted request, approval, or administration context.
- Future email/chat notifications use the same authenticated deep links; no public share route exists.
- Home cards and counts shortcut outstanding actions without owning duplicate content.
- Cross-links connect receipts, balance history, approvals, availability, audit subjects, and readiness corrections.

### Deep-linking rules

- Proposed route families: `/home`, `/leave/request`, `/leave/requests`, `/leave/requests/:id`, `/leave/balances`, `/team/approvals`, `/team/availability`, `/admin/people`, `/admin/leave-setup`, `/admin/balances`, `/admin/audit`, and `/admin/access`.
- An unauthenticated user authenticates first, then returns to the requested permitted route when safe.
- An authorized route resolves to the most specific permitted view.
- Unauthorized and cross-organization routes return a safe access outcome and Home action without confirming record existence.
- Missing/retired records use a neutral unavailable/not-found state and return to the owning list.
- A stale approval link shows the current committed state and refresh/return action.

### Location awareness

- The visible page heading names the current page or entity; the browser title follows `[Page or reference] | Employee Hub`.
- Expanded labels and collapsed icons expose the same active state.
- Administration/detail routes use breadcrumbs and explicit returns such as Back to My requests or Back to Pending approvals.
- After navigation, keyboard focus moves to the page heading; validation errors focus the summary or first invalid field.
- Opening/closing sidebar, drawer, flyout, and profile menu restores focus predictably to the invoking control.

## 8. Roles and Permissions Impact

### Roles

- **Employee**: uses personal leave and profile capabilities.
- **Manager**: has Employee capabilities plus assigned approval and direct-report availability responsibility.
- **HR**: has Employee capabilities plus workforce, configuration, balance, readiness, and business-audit responsibility.
- **Administrator**: accesses every feature through explicit server-enforced permissions, including access/settings and security activity.

### What changes by role

- Home changes its summaries and primary CTA without changing destination ownership.
- Team is visible to Manager and Administrator.
- Administration is visible to HR and Administrator; HR sees only People, Leave setup, Balances, and business Audit.
- Access & settings and Security activity are Administrator-only.
- Manager search is limited to direct reports/permitted team context; HR and Administrator searches remain organization- and permission-scoped.
- Multiple assignments produce the union of explicitly permitted destinations.
- Navigation visibility never grants access; the server checks every route, query, and command.

### Navigation visibility

| Area | Employee | Manager | HR | Administrator |
|---|:---:|:---:|:---:|:---:|
| Home | Yes | Yes | Yes | Yes |
| Request leave | Yes | Yes | Yes | Yes |
| My leave | Yes | Yes | Yes | Yes |
| Notifications / My profile | Yes | Yes | Yes | Yes |
| Team — Approvals | No | Yes | No | Yes |
| Team — Availability | No | Yes | No | Yes |
| Team — Direct reports | No | Yes | No | Yes |
| Administration — People | No | No | Yes | Yes |
| Administration — Leave setup | No | No | Yes | Yes |
| Administration — Balances | No | No | Yes | Yes |
| Administration — Business audit | No | No | Yes | Yes |
| Access & settings | No | No | No | Yes |
| Security activity | No | No | No | Yes |

## 9. Open Questions and Validation Plan

### Prioritized questions

| # | Question | Why it matters | Method | Participants | Timing |
|---|---|---|---|---|---|
| IA-Q1 | Can each role find its top task in expanded and collapsed navigation? | Validates the core model and icon-only state | Tree and first-click tests | Employee, Manager, HR/Admin perspectives | Before wireframe navigation acceptance |
| IA-Q2 | Do My leave, Team, and Administration match user mental grouping? | Affects every later screen and label | Lightweight open then closed card sort; tree retest | Prefer 3 representative users; 2 is directional | Before wireframing is finalized |
| IA-Q3 | Are collapsed-sidebar icons understandable and distinguishable? | Ambiguity can make collapsed navigation unusable | Icon recognition and first-click without initial tooltips; accessibility review | All available perspectives | Before sidebar component approval |
| IA-Q4 | Can users distinguish Request status, Notification status, and Balance history? | Protects the trust model | Label-comprehension and first-click scenarios | Employee and Manager | Before prototype acceptance |
| IA-Q5 | Can HR/Admin find readiness, setup, adjustment, business audit, and security activity without mixing responsibility? | Validates administration structure and permissions | Tree tasks plus stakeholder permission walkthrough | HR, Administrator/security, Architect | Before related wireframes/HLD are approved |
| IA-Q6 | Are section search and filters sufficient without global search? | Affects findability and privacy at scale | Employee/Request/Balance/Audit scenarios | Manager, HR, Administrator | Before changing the search model |

### Validation methods and success interpretation

- **Tree testing tasks**: request leave; find status/cancel action; review Pending request; add Employee; add Public holiday; adjust balance; assign role; investigate business/security event.
- **Card sorting**: 20–30 page/action cards using a lightweight hybrid sort. With 2–3 participants, results guide iteration but are not statistically conclusive.
- **First-click testing**: expanded sidebar, collapsed icon sidebar, Home shortcuts, notification deep link, and contextual return path.
- **Stakeholder walkthrough**: Andrei and Sponsor map every top task, PRD R-001–R-017, and role boundary to at least one route.
- **Directional threshold**: at least 2 of 3 participants choose the correct first destination for each top task; errors are analyzed before retaining the affected grouping/icon.
- Repeat primary first-click tasks on the clickable prototype before hi-fi work.
- If participants are unavailable, retain status as stakeholder-approved and user-unvalidated.

## 10. Decisions Log

| ID | Decision | Alternatives considered | Rationale | Date |
|---|---|---|---|---|
| IA-D01 | Use goal-based grouping supported by responsibility visibility | Entity-based; lifecycle-only; department-based | Matches top tasks and separates personal, team, and administrative work | 2026-08-31 |
| IA-D02 | Use responsive side navigation plus persistent top navbar | Header tabs; hub-and-spoke; search-first | Supports role breadth and shallow persistent access without crowding the header | 2026-08-31 |
| IA-D03 | Navbar left contains logo/menu button; right contains current-user dropdown | Profile in sidebar; separate utility rail | Keeps product/navigation control and account actions predictable | 2026-08-31 |
| IA-D04 | Every sidebar destination keeps an icon when collapsed | Show top-level icons only; hide nested areas; collapsed labels | User explicitly requires every page destination to remain represented; flyouts preserve nesting | 2026-08-31 |
| IA-D05 | Use section-scoped search, not global search | Search-first/global index; no search | Fits initial scale and reduces cross-scope/privacy risk | 2026-08-31 |
| IA-D06 | Use one Administration group with role-filtered subsections | Separate HR/Admin applications; mix settings contextually | Preserves one coherent product while keeping responsibilities clear | 2026-08-31 |
| IA-D07 | Administrator sees every feature through explicit permissions | Narrow access-only Administrator; unrestricted client bypass | Preserves sponsor direction while retaining server authorization, audit, and no-self-approval | 2026-08-31 |
| IA-D08 | Limit hierarchy to four levels and use contextual details/states | Deep entity tree; every state as a destination | Protects findability and keeps interaction states out of the sitemap | 2026-08-31 |

## 11. Acceptance Criteria

- [x] The navigation model is selected and justified against the five top tasks.
- [x] The sitemap covers all approved PRD functional areas with no hierarchy deeper than four levels.
- [x] Main, administration, utility, screen, and controlled-vocabulary labels are documented consistently.
- [x] Entry points, scoped search, cross-links, deep links, denied/missing/stale outcomes, and return paths are defined.
- [x] Employee, Manager, HR, and Administrator visibility is explicit.
- [x] Expanded, collapsed, and drawer navigation preserve the same authorized destinations.
- [x] Every sidebar destination has an icon that remains visible when collapsed, plus an accessible name, tooltip, and active state.
- [x] Top navbar placement and sidebar-toggle/current-user-menu behaviour are defined.
- [x] Content entities, relationships, ownership, and governance are mapped to the structure.
- [x] Open questions have prioritized methods, participants, thresholds, and timing.
- [x] All five top tasks have at least one direct or clearly owned navigation path.
- [x] Mobile/responsive and keyboard-focus implications are documented.

**Validation status**: The stakeholder has approved the IA decisions. Representative tree/card/first-click testing remains pending and must not be reported as completed.

## Related Artifacts

- [PRD](../prds/employee-hub-prd.md)
- [Context](../explore-employee-hub/context.md)
- [Personas](../domain/personas-employee-hub.md)
- [Current-State Journey](../domain/journey-employee-hub.md)
- [Domain Analysis](../explore-employee-hub/domain-analysis.md)
- [Glossary](../glossary.md)
- [Regulatory and Compliance Baseline](../explore-employee-hub/regulatory-compliance.md)
- Planned User Flows: `explore/domain/flows-employee-hub.md`
- Planned Wireframes: `explore/design/wireframes-employee-hub.md`

**Last Updated**: 2026-08-31  
**Status**: Stakeholder-approved; user validation planned
