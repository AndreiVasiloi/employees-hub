---
version: 1.0
created: 2026-08-31
source: Approved Employee Hub PRD, IA, personas, journey, and steering-team flow decisions
product_context: Employee Hub leave-management learning project
flow_count: 9
persona_set_ref: explore/domain/personas-employee-hub.md
journey_set_ref: explore/domain/journey-employee-hub.md
prd_ref: explore/prds/employee-hub-prd.md
ia_ref: explore/design/information-architecture-employee-hub.md
status: stakeholder-approved and UX-rule-validated; HLD alignment reviewed; representative-user validation pending
---

# Flow Set: Employee Hub

## AGENT USAGE INSTRUCTIONS

This single flow set is designed for downstream design, usability, architecture, test, and implementation agents.

- Reference flows by `flow_id` F1–F9 and actors by `persona_id` P1–P4.
- `[VALIDATED]` means the steering team explicitly confirmed the workflow direction. It does not mean representative users completed the flow.
- `[ASSUMPTION]` identifies unresolved policy, user, field, or technical detail that must not be silently treated as fact.
- Use only screens/actions shown here when deriving wireframes; additions require a traceable flow/PRD update.
- Every decision node has exactly two labelled paths. Preserve both paths in wireframes and tests.
- Every terminal state provides a return, retry, corrective, or escalation action.
- The [HLD](../hlds/employee-hub-hld.md) and accepted ADRs are available. Enrich flows retroactively only if a later architecture decision alters visible behaviour without weakening approved requirements.

### Shape Legend

- ▭ Rectangle — Screen or page
- ○ Circle — User action or event
- ◇ Diamond — Decision point
- → Arrow — direction of flow

## Flow F1: Plan and Submit Leave

**flow_id**: F1  
**objective**: Submit one valid, understandable Leave Request. `[VALIDATED]`  
**entry_point**: Home CTA, Request leave navigation, or My leave shortcut. `[VALIDATED]`  
**exit_point**: One visible Pending request with a durable reference, or a clear non-mutating recovery path. `[VALIDATED]`  
**persona_id**: P1  
**journey_id**: J1  
**requirements**: R-002, R-003, R-009, R-010, R-013, R-016  
**status**: stakeholder-approved

### User Flow Table

| Step | Screen / Action | Decision? | Outcome | Shape | Tag |
|---|---|:---:|---|---|---|
| 1 | Request leave | N | Show Leave Type and inclusive-date inputs | ▭ Rectangle | [VALIDATED] |
| 2 | Select Leave Type and dates | N | Request a server-authoritative preview | ○ Circle | [VALIDATED] |
| 3 | Can an eligible preview be produced? | Y | Yes → 4 / No → 3a | ◇ Diamond | [VALIDATED] |
| 3a | Validation or readiness state | N | Explain invalid input, conflict, balance, or missing prerequisite | ▭ Rectangle | [VALIDATED] |
| 3b | Correct inputs or follow readiness route | N | Return to 1 or exit to Home/HR support path | ○ Circle | [VALIDATED] |
| 4 | Review request | N | Show counted/excluded dates, balance effect, and Manager role | ▭ Rectangle | [VALIDATED] |
| 5 | Confirm submission? | Y | Yes → 6 / No → 5a | ◇ Diamond | [VALIDATED] |
| 5a | Edit request | N | Return to 1 and regenerate preview | ○ Circle | [VALIDATED] |
| 6 | Submit request | N | Wait for committed result; do not assume browser success | ○ Circle | [VALIDATED] |
| 7 | Was the request committed? | Y | Yes → 8 / No → 7a | ◇ Diamond | [VALIDATED] |
| 7a | Conflict or uncertain-result state | N | Explain current evidence and safe choices | ▭ Rectangle | [VALIDATED] |
| 7b | Is safe retry available? | Y | Yes → 7c / No → return to 1 or My leave | ◇ Diamond | [VALIDATED] |
| 7c | Retry with the same command identity | N | Return to 7 without creating a duplicate | ○ Circle | [VALIDATED] |
| 8 | Request submitted | N | Show reference, Pending status, receipt, Manager role, and next links | ▭ Rectangle | [VALIDATED] |

### Narrative Task Flow

The Employee opens Request leave, selects a Leave Type and dates, and requests a preview. If the request cannot be previewed, the visible state explains the invalid input or missing readiness prerequisite and provides a correction or support route. If eligible, the Employee reviews counted dates and balance effect, then either edits or submits. A committed submission ends on Request submitted with a durable reference and Pending state. An uncertain or conflicting result never claims success; the Employee safely retries with the same command identity where available or returns to Request leave/My leave.

### Assumptions to Validate

- [ ] Employees understand the calculation and balance explanation without assistance.
- [ ] The readiness route identifies the right HR corrective destination without leaking restricted configuration.
- [ ] Retry wording helps users avoid creating a second request.
- [ ] HLD confirms the visible conflict/idempotency outcomes.

## Flow F2: Track and Cancel Eligible Leave

**flow_id**: F2  
**objective**: Understand one request's committed status and cancel it when eligible. `[VALIDATED]`  
**entry_point**: Home recent request, My leave, notification, or authorized deep link. `[VALIDATED]`  
**exit_point**: Current status understood, or one eligible cancellation committed with a visible balance effect. `[VALIDATED]`  
**persona_id**: P1  
**journey_id**: J1  
**requirements**: R-004, R-007, R-008, R-016  
**status**: stakeholder-approved

### User Flow Table

| Step | Screen / Action | Decision? | Outcome | Shape | Tag |
|---|---|:---:|---|---|---|
| 1 | Is a permitted request already identified? | Y | Yes → 3 / No → 2 | ◇ Diamond | [VALIDATED] |
| 2 | My requests | N | Show authorized request list and filters | ▭ Rectangle | [VALIDATED] |
| 2a | Filter/search and select request | N | Open 3 | ○ Circle | [VALIDATED] |
| 3 | Leave request detail and receipt | N | Show committed status, evidence, delivery, and permitted actions | ▭ Rectangle | [VALIDATED] |
| 4 | Does the Employee want to cancel? | Y | Yes → 5 / No → return or remain | ◇ Diamond | [VALIDATED] |
| 5 | Is the request self-cancellable? | Y | Yes → 6 / No → 5a | ◇ Diamond | [VALIDATED] |
| 5a | Cancellation unavailable | N | Explain reason and HR/recovery path; return to 3/list | ▭ Rectangle | [VALIDATED] |
| 6 | Confirm cancellation | N | Show cancellation and balance consequence | ▭ Rectangle | [VALIDATED] |
| 6a | Confirm cancellation? | Y | Yes → 6b / No → 3 | ◇ Diamond | [VALIDATED] |
| 6b | Cancel request | N | Wait for committed result | ○ Circle | [VALIDATED] |
| 7 | Was cancellation committed? | Y | Yes → 8 / No → 7a | ◇ Diamond | [VALIDATED] |
| 7a | Request changed state | N | Show stale/conflict explanation | ▭ Rectangle | [VALIDATED] |
| 7b | Refresh current request | N | Return to 3 | ○ Circle | [VALIDATED] |
| 8 | Request cancelled | N | Show Cancelled state, restored/released balance, and next actions | ▭ Rectangle | [VALIDATED] |

### Narrative Task Flow

The Employee reaches an own request directly or selects it from My requests. The receipt remains the source of committed status. If no cancellation is needed, the Employee returns or continues reading. If cancellation is requested, eligibility is checked before confirmation. An ineligible request explains why and routes to an allowed recovery. A successful cancellation shows the balance effect and offers My requests or a replacement request. A stale request refreshes to the current committed state.

### Assumptions to Validate

- [ ] Pending and future Approved cancellation rules match the intended policy.
- [ ] Cancel-and-resubmit is acceptable instead of editing Pending dates/type.
- [ ] Employees understand why started/historical leave requires HR correction.
- [ ] Deep links and notification labels preserve context without causing status confusion.

## Flow F3: Review and Decide a Request

**flow_id**: F3  
**objective**: Record one informed approval or rejection for an assigned Pending request. `[VALIDATED]`  
**entry_point**: Home approval card, Pending approvals, notification, or authorized deep link. `[VALIDATED]`  
**exit_point**: Exactly one final decision is visible, or the Manager receives a safe current-state/recovery path. `[VALIDATED]`  
**persona_id**: P2  
**journey_id**: J1  
**requirements**: R-005, R-006, R-009, R-010, R-015, R-016  
**status**: stakeholder-approved

### User Flow Table

| Step | Screen / Action | Decision? | Outcome | Shape | Tag |
|---|---|:---:|---|---|---|
| 1 | Is a specific assigned request identified? | Y | Yes → 3 / No → 2 | ◇ Diamond | [VALIDATED] |
| 2 | Pending approvals | N | Show assigned Pending requests and filters | ▭ Rectangle | [VALIDATED] |
| 2a | Filter and select request | N | Open 3 | ○ Circle | [VALIDATED] |
| 3 | Can this request still be reviewed by this Manager? | Y | Yes → 4 / No → 3a | ◇ Diamond | [VALIDATED] |
| 3a | Access/current-state outcome | N | Safe reason and return to queue/current status | ▭ Rectangle | [VALIDATED] |
| 4 | Review leave request | N | Show minimum-necessary request and balance context | ▭ Rectangle | [VALIDATED] |
| 5 | Is more team context needed? | Y | Yes → 5a / No → 6 | ◇ Diamond | [VALIDATED] |
| 5a | Team availability | N | Show permitted coverage context | ▭ Rectangle | [VALIDATED] |
| 5b | Return to same request | N | Return to 4 | ○ Circle | [VALIDATED] |
| 6 | Approve or reject? | Y | Approve → 7a / Reject → 7b | ◇ Diamond | [VALIDATED] |
| 7a | Approval confirmation | N | Show approval consequence | ▭ Rectangle | [VALIDATED] |
| 7b | Rejection reason | N | Ask for concise Employee-safe reason | ▭ Rectangle | [VALIDATED] |
| 7c | Provide rejection reason | N | Continue to 8 | ○ Circle | [VALIDATED] |
| 8 | Confirm decision? | Y | Yes → 8a / No → 4 | ◇ Diamond | [VALIDATED] |
| 8a | Submit decision | N | Wait for committed result | ○ Circle | [VALIDATED] |
| 9 | Was the decision committed? | Y | Yes → 10 / No → 9a | ◇ Diamond | [VALIDATED] |
| 9a | Request changed state | N | Explain conflict/current status | ▭ Rectangle | [VALIDATED] |
| 9b | Refresh current outcome | N | View committed result or return to queue | ○ Circle | [VALIDATED] |
| 10 | Decision recorded | N | Show final status, balance effect, Employee outcome, and next request | ▭ Rectangle | [VALIDATED] |

### Narrative Task Flow

The Manager opens an assigned request directly or from Pending approvals. If it is unauthorized or no longer Pending, the Manager sees only a safe current-state outcome. Otherwise the review shows minimum-necessary context. The Manager may visit Team availability and return, then chooses approval or rejection. Rejection requires a concise reason. After confirmation, exactly one committed outcome appears. A competing decision refreshes to the result rather than permitting a second effect.

### Assumptions to Validate

- [ ] Managers can decide with the proposed minimum-necessary fields.
- [ ] Team availability contains enough context without exposing sensitive detail.
- [ ] A concise rejection reason is required and understandable to Employees.
- [ ] HLD confirms one-decision conflict behaviour and current-state refresh semantics.

## Flow F4: Add or Maintain an Employee

**flow_id**: F4  
**objective**: Create or update one eligible fictional Employee and workforce relationships. `[VALIDATED]`  
**entry_point**: Home/readiness shortcut, Add employee, Employees list, or Employee deep link. `[VALIDATED]`  
**exit_point**: One valid Employee/workforce change is visible and auditable, or correction is non-mutating. `[VALIDATED]`  
**persona_id**: P3  
**journey_id**: J1 (prerequisite)  
**requirements**: R-011, R-013, R-017  
**status**: stakeholder-approved

### User Flow Table

| Step | Screen / Action | Decision? | Outcome | Shape | Tag |
|---|---|:---:|---|---|---|
| 1 | Create new or maintain existing Employee? | Y | Create → 2a / Maintain → 2b | ◇ Diamond | [VALIDATED] |
| 2a | Add employee | N | Show fictional workforce form | ▭ Rectangle | [VALIDATED] |
| 2b | Employees | N | Show organization-scoped list | ▭ Rectangle | [VALIDATED] |
| 2c | Search/filter and select Employee | N | Open 2d | ○ Circle | [VALIDATED] |
| 2d | Employee details | N | Show committed profile and relationships | ▭ Rectangle | [VALIDATED] |
| 2e | Choose edit or status action | N | Open editable form | ○ Circle | [VALIDATED] |
| 3 | Enter/update profile, Team, Manager, Account link, and status | N | Validate inputs | ○ Circle | [VALIDATED] |
| 4 | Are required fields valid and unique? | Y | Yes → 5 / No → 4a | ◇ Diamond | [VALIDATED] |
| 4a | Field validation state | N | Explain fields to correct | ▭ Rectangle | [VALIDATED] |
| 4b | Correct fields | N | Return to 3 | ○ Circle | [VALIDATED] |
| 5 | Are Team, Manager, Account, and organization relationships valid? | Y | Yes → 6 / No → 5a | ◇ Diamond | [VALIDATED] |
| 5a | Relationship/readiness state | N | Correct selection or open permitted setup, then return to 3 | ▭ Rectangle | [VALIDATED] |
| 6 | Review Employee changes | N | Show proposed profile/relationship/status changes | ▭ Rectangle | [VALIDATED] |
| 7 | Confirm save? | Y | Yes → 7a / No → edit/detail | ◇ Diamond | [VALIDATED] |
| 7a | Save Employee | N | Wait for committed result | ○ Circle | [VALIDATED] |
| 8 | Was the change committed? | Y | Yes → 9 / No → 8a | ◇ Diamond | [VALIDATED] |
| 8a | Employee changed concurrently | N | Refresh/reconcile and return to detail/edit | ▭ Rectangle | [VALIDATED] |
| 9 | Employee details | N | Show committed data, readiness effect, and return actions | ▭ Rectangle | [VALIDATED] |

### Narrative Task Flow

HR creates a fictional Employee or selects an existing one. The form validates profile uniqueness and workforce relationships before presenting a review. Invalid Team, Manager, Account, or organization relationships route back to correction or permitted setup. A committed change returns to Employee details with readiness impact. A stale update is refreshed and reconciled rather than silently overwriting another change.

### Assumptions to Validate

- [ ] Exact fictional Employee fields and uniqueness rules are sufficient.
- [ ] HR should manage Account links from Employee context rather than only Access & settings.
- [ ] Creating/selecting a missing Team can return without losing safe form progress.
- [ ] Inactive Employee/future Approved leave handling is defined before implementation.

## Flow F5: Configure Leave Rules and Readiness

**flow_id**: F5  
**objective**: Make the organization ready to calculate and accept requests for one Leave Type. `[VALIDATED]`  
**entry_point**: Home readiness card, Leave readiness, or blocked-request readiness link. `[VALIDATED]`  
**exit_point**: Readiness passes for the selected scope, or a saved Draft identifies remaining work. `[VALIDATED]`  
**persona_id**: P3  
**journey_id**: J1 (prerequisite)  
**requirements**: R-012, R-013, R-017  
**status**: stakeholder-approved

### User Flow Table

| Step | Screen / Action | Decision? | Outcome | Shape | Tag |
|---|---|:---:|---|---|---|
| 1 | Leave readiness | N | Show checks by Leave Type/scope | ▭ Rectangle | [VALIDATED] |
| 2 | Select scope and review failed checks | N | Continue to 3 | ○ Circle | [VALIDATED] |
| 3 | Do all required checks pass? | Y | Yes → show active configuration and return to Leave readiness/Home / No → 4 | ◇ Diamond | [VALIDATED] |
| 4 | Select one failed prerequisite | N | Open its configuration detail | ○ Circle | [VALIDATED] |
| 5 | Configuration detail | N | Show current effective versions/drafts | ▭ Rectangle | [VALIDATED] |
| 6 | Is an editable draft available? | Y | Yes → 6a / No → 6b | ◇ Diamond | [VALIDATED] |
| 6a | Edit draft | N | Continue to 7 | ○ Circle | [VALIDATED] |
| 6b | Create new effective version | N | Continue to 7 | ○ Circle | [VALIDATED] |
| 7 | Enter configuration and effective dates | N | Validate values/ranges | ○ Circle | [VALIDATED] |
| 8 | Are values and effective ranges valid? | Y | Yes → 9 / No → 8a | ◇ Diamond | [VALIDATED] |
| 8a | Validation/conflict state | N | Correct and return to 7 | ▭ Rectangle | [VALIDATED] |
| 9 | Review configuration | N | Show proposed version and historical boundary | ▭ Rectangle | [VALIDATED] |
| 10 | Activate now? | Y | Yes → 10a / No → save Draft and return | ◇ Diamond | [VALIDATED] |
| 10a | Confirm activation | N | Wait for committed result | ○ Circle | [VALIDATED] |
| 11 | Was configuration committed? | Y | Yes → 12 / No → 11a | ◇ Diamond | [VALIDATED] |
| 11a | Stale/conflicting configuration | N | Refresh/reconcile and return to 5 | ▭ Rectangle | [VALIDATED] |
| 12 | Return to Leave readiness | N | Re-run checks | ▭ Rectangle | [VALIDATED] |
| 13 | Do all checks now pass? | Y | Yes → 14 / No → 4 | ◇ Diamond | [VALIDATED] |
| 14 | Leave ready | N | Show passed checks and return to blocked context | ▭ Rectangle | [VALIDATED] |

### Narrative Task Flow

HR chooses a Leave Type/scope in Leave readiness. If checks pass, active configuration is available and the flow may end. Otherwise HR selects one failed prerequisite and edits a Draft or creates a new effective version. Invalid values/ranges loop to correction. HR may save Draft work or activate valid configuration. After commit, readiness reruns until all checks pass, then offers a safe return to the original blocked context.

### Assumptions to Validate

- [ ] The minimum readiness checklist contains exactly the required Employee/Manager/configuration/balance inputs.
- [ ] Draft/Active/Retired version behaviour matches the eventual persistence design.
- [ ] HR can understand effective-date conflicts and historical consequences.
- [ ] Return-to-blocked-context links are useful and permission-safe.

## Flow F6: Review and Adjust a Balance

**flow_id**: F6  
**objective**: Append one controlled, reasoned balance adjustment for an Employee. `[VALIDATED]`  
**entry_point**: Employee balances, Employee details, readiness issue, or investigation link. `[VALIDATED]`  
**exit_point**: Balance understood without mutation, or one adjustment is committed and traceable. `[VALIDATED]`  
**persona_id**: P3  
**journey_id**: J1 (support/recovery)  
**requirements**: R-008, R-010, R-014, R-017  
**status**: stakeholder-approved

### User Flow Table

| Step | Screen / Action | Decision? | Outcome | Shape | Tag |
|---|---|:---:|---|---|---|
| 1 | Is a specific Employee balance identified? | Y | Yes → 3 / No → 2 | ◇ Diamond | [VALIDATED] |
| 2 | Employee balances | N | Show scoped list and filters | ▭ Rectangle | [VALIDATED] |
| 2a | Search/filter and select balance | N | Open 3 | ○ Circle | [VALIDATED] |
| 3 | Balance detail | N | Show projection and reconciled history | ▭ Rectangle | [VALIDATED] |
| 4 | Does HR want to append an adjustment? | Y | Yes → 5 / No → return | ◇ Diamond | [VALIDATED] |
| 5 | Adjust balance | N | Show amount/type/period/reason inputs | ▭ Rectangle | [VALIDATED] |
| 6 | Enter adjustment | N | Validate policy and scope | ○ Circle | [VALIDATED] |
| 7 | Is adjustment valid and permitted? | Y | Yes → 8 / No → 7a | ◇ Diamond | [VALIDATED] |
| 7a | Validation/policy state | N | Correct and return to 6 | ▭ Rectangle | [VALIDATED] |
| 8 | Review adjustment | N | Show current, proposed, resulting balance, and reason | ▭ Rectangle | [VALIDATED] |
| 9 | Confirm adjustment? | Y | Yes → 9a / No → 5 | ◇ Diamond | [VALIDATED] |
| 9a | Submit adjustment | N | Wait for committed result | ○ Circle | [VALIDATED] |
| 10 | Was adjustment committed? | Y | Yes → 11 / No → 10a | ◇ Diamond | [VALIDATED] |
| 10a | Balance changed concurrently | N | Refresh/reassess and return to 3 | ▭ Rectangle | [VALIDATED] |
| 11 | Balance adjusted | N | Show updated projection, history entry, audit, and returns | ▭ Rectangle | [VALIDATED] |

### Narrative Task Flow

HR opens a specific Employee balance directly or selects one from the scoped list. Balance detail supports investigation without mutation. If an adjustment is needed, HR enters a non-zero amount and reason, reviews the before/after result, and confirms. Invalid policy/scope returns to correction. A committed adjustment shows the reconciled result and audit acknowledgement; a concurrent change returns to refreshed Balance detail.

### Assumptions to Validate

- [ ] Closed-period and negative-result policies are resolved.
- [ ] Review-before-submit is necessary and understandable for balance corrections.
- [ ] The reason field captures enough evidence without collecting unnecessary sensitive text.
- [ ] HLD confirms projection/reconciliation and conflict-visible behaviour.

## Flow F7: Investigate Business Activity

**flow_id**: F7  
**objective**: Find and understand evidence for one leave, balance, Employee, or configuration change. `[VALIDATED]`  
**entry_point**: Business activity, Home shortcut, or permitted subject cross-link. `[VALIDATED]`  
**exit_point**: Change explained and permitted correction traceable, or safe escalation/return provided. `[VALIDATED]`  
**persona_id**: P3  
**journey_id**: J1 (support/recovery)  
**requirements**: R-010, R-017  
**status**: stakeholder-approved

### User Flow Table

| Step | Screen / Action | Decision? | Outcome | Shape | Tag |
|---|---|:---:|---|---|---|
| 1 | Is a specific Audit event identified? | Y | Yes → 3 / No → 2 | ◇ Diamond | [VALIDATED] |
| 2 | Business activity | N | Show scoped filters/results | ▭ Rectangle | [VALIDATED] |
| 2a | Filter and select event | N | Open 3 | ○ Circle | [VALIDATED] |
| 3 | Is event/subject permitted and available? | Y | Yes → 4 / No → 3a | ◇ Diamond | [VALIDATED] |
| 3a | Safe unavailable/access state | N | Return to filtered activity without leakage | ▭ Rectangle | [VALIDATED] |
| 4 | Audit event detail | N | Show safe evidence and permitted links | ▭ Rectangle | [VALIDATED] |
| 5 | Does evidence explain the issue? | Y | Yes → 6 / No → 5a | ◇ Diamond | [VALIDATED] |
| 5a | View correlated events or refine filters | N | Return to 2/4 | ○ Circle | [VALIDATED] |
| 6 | Is corrective action required? | Y | Yes → 7 / No → return to Business activity or the permitted subject | ◇ Diamond | [VALIDATED] |
| 7 | Is in-product correction permitted? | Y | Yes → 7b / No → 7a | ◇ Diamond | [VALIDATED] |
| 7a | Record/escalate external follow-up | N | Preserve context and return | ○ Circle | [VALIDATED] |
| 7b | Open permitted corrective flow | N | Complete Request, Employee, configuration, or Balance flow | ○ Circle | [VALIDATED] |
| 8 | Return to investigation filters | N | Show same result context | ▭ Rectangle | [VALIDATED] |
| 9 | Verify resulting Audit event? | Y | Yes → 9a / No → return to Business activity or the permitted subject | ◇ Diamond | [VALIDATED] |
| 9a | Open new/related event | N | Return to 4 | ○ Circle | [VALIDATED] |

### Narrative Task Flow

HR opens Business activity or a specific permitted event. Unavailable or unauthorized subjects produce a safe return without leakage. The detail presents allow-listed evidence and correlated links. If evidence is incomplete, HR refines the result set. If correction is required, HR follows a permitted owning flow or records/escalates external follow-up. Returning to the same filters allows verification of a resulting Audit event.

### Assumptions to Validate

- [ ] Audit filters and allow-listed detail answer common HR investigation questions.
- [ ] Correlation navigation is understandable to non-technical reviewers.
- [ ] Corrective links do not imply permissions HR lacks.
- [ ] An external follow-up process and retention expectations are eventually defined.

## Flow F8: Manage Accounts and Roles

**flow_id**: F8  
**objective**: Create, link, activate/disable, or change fixed-role access for one Account. `[VALIDATED]`  
**entry_point**: Accounts and roles, Home access alert, or permitted Account deep link. `[VALIDATED]`  
**exit_point**: One Account/access change is committed and audited, or a safeguard prevents unsafe mutation. `[VALIDATED]`  
**persona_id**: P4  
**journey_id**: J1 (security prerequisite)  
**requirements**: R-009, R-010, R-017  
**status**: stakeholder-approved

### User Flow Table

| Step | Screen / Action | Decision? | Outcome | Shape | Tag |
|---|---|:---:|---|---|---|
| 1 | Create a new Account? | Y | Yes → 2a / No → 2b | ◇ Diamond | [VALIDATED] |
| 2a | Add Account | N | Show fictional identity/access form | ▭ Rectangle | [VALIDATED] |
| 2b | Accounts and roles | N | Show scoped Account list | ▭ Rectangle | [VALIDATED] |
| 2c | Search/filter and select Account | N | Open 2d | ○ Circle | [VALIDATED] |
| 2d | Account detail | N | Show status, link, and explicit roles | ▭ Rectangle | [VALIDATED] |
| 2e | Choose edit, role, or status action | N | Open editable form | ○ Circle | [VALIDATED] |
| 3 | Enter/update identity, Employee link, roles, and status | N | Validate inputs | ○ Circle | [VALIDATED] |
| 4 | Are data/link valid and unique? | Y | Yes → 5 / No → 4a | ◇ Diamond | [VALIDATED] |
| 4a | Validation/link state | N | Correct and return to 3 | ▭ Rectangle | [VALIDATED] |
| 5 | Would change violate an administration safeguard? | Y | Yes → 5a / No → 6 | ◇ Diamond | [VALIDATED] |
| 5a | Safeguard warning | N | Adjust/cancel and return to 3/detail | ▭ Rectangle | [VALIDATED] |
| 6 | Review Account changes | N | Show links, roles, status, and access impact | ▭ Rectangle | [VALIDATED] |
| 7 | Confirm changes? | Y | Yes → 7a / No → edit | ◇ Diamond | [VALIDATED] |
| 7a | Save Account and roles | N | Wait for committed result | ○ Circle | [VALIDATED] |
| 8 | Was change committed? | Y | Yes → 9 / No → 8a | ◇ Diamond | [VALIDATED] |
| 8a | Account changed concurrently | N | Refresh/reconcile and return to detail/edit | ▭ Rectangle | [VALIDATED] |
| 9 | Account detail | N | Show committed access, nav impact, audit, and return | ▭ Rectangle | [VALIDATED] |

### Narrative Task Flow

The Administrator creates an Account or selects an existing one, then edits the fictional identity link, explicit roles, or status. Invalid/duplicate relationships return to correction. A safeguard prevents lockout or loss of required organization administration. After review and confirmation, committed Account detail shows the resulting access/navigation summary and audit acknowledgement. Concurrent updates are refreshed and reconciled.

### Assumptions to Validate

- [ ] Exact Account fields and identity-provider linking rules await HLD/provider choice.
- [ ] Safeguards for the last active Administrator and self-affecting changes are approved.
- [ ] The access/navigation summary accurately communicates every fixed-role permission.
- [ ] The Administrator-all-features rule is reconciled with explicit assignments before implementation.

## Flow F9: Investigate Security Activity

**flow_id**: F9  
**objective**: Find, understand, and safely respond to one security-sensitive event. `[VALIDATED]`  
**entry_point**: Security activity, Home alert, Account detail, or authorized deep link. `[VALIDATED]`  
**exit_point**: Event understood with no action needed, or safe response/escalation followed and reviewed. `[VALIDATED]`  
**persona_id**: P4  
**journey_id**: J1 (cross-cutting security)  
**requirements**: R-009, R-010, R-017  
**status**: stakeholder-approved

### User Flow Table

| Step | Screen / Action | Decision? | Outcome | Shape | Tag |
|---|---|:---:|---|---|---|
| 1 | Is a specific Security event identified? | Y | Yes → 3 / No → 2 | ◇ Diamond | [VALIDATED] |
| 2 | Security activity | N | Show scoped filters/results | ▭ Rectangle | [VALIDATED] |
| 2a | Filter and select event | N | Open 3 | ○ Circle | [VALIDATED] |
| 3 | Is event/context permitted and available? | Y | Yes → 4 / No → 3a | ◇ Diamond | [VALIDATED] |
| 3a | Safe unavailable/access state | N | Return to filtered activity without leakage | ▭ Rectangle | [VALIDATED] |
| 4 | Security event detail | N | Show safe evidence and correlation context | ▭ Rectangle | [VALIDATED] |
| 5 | Is there enough evidence? | Y | Yes → 6 / No → 5a | ◇ Diamond | [VALIDATED] |
| 5a | Inspect correlated events/refine filters | N | Return to 2/4 | ○ Circle | [VALIDATED] |
| 6 | Classify event | N | Expected, denied access, configuration issue, or suspected misuse | ○ Circle | [VALIDATED] |
| 7 | Is a response required? | Y | Yes → 8 / No → return to Security activity or the permitted subject | ◇ Diamond | [VALIDATED] |
| 8 | Can response be performed safely in Employee Hub? | Y | Yes → 8a / No → 8b | ◇ Diamond | [VALIDATED] |
| 8a | Open F8 Account/role action | N | Perform in-product containment | ○ Circle | [VALIDATED] |
| 8b | Preserve context and escalate externally | N | Return after responsible process action | ○ Circle | [VALIDATED] |
| 9 | Return to investigation context | N | Show retained filters/correlation | ▭ Rectangle | [VALIDATED] |
| 10 | Does follow-up evidence confirm response? | Y | Yes → 10a / No → 10b | ◇ Diamond | [VALIDATED] |
| 10a | Close and return to Security activity | N | End with evidence understood | ○ Circle | [VALIDATED] |
| 10b | Inspect more events or escalate | N | Return to 5 | ○ Circle | [VALIDATED] |

### Narrative Task Flow

The Administrator selects a Security event directly or through scoped filters. Unauthorized/unavailable context returns safely. The detail supplies correlation and allow-listed evidence. The Administrator gathers more evidence if needed, classifies the event, and decides whether response is required. Safe Account/role containment enters F8; platform concerns preserve context for external escalation. Follow-up evidence either closes the investigation or continues the loop.

### Assumptions to Validate

- [ ] Event classification labels match the eventual threat model and operational process.
- [ ] Security detail exposes enough evidence without sensitive employee or platform data.
- [ ] In-product containment actions and external escalation ownership are defined.
- [ ] Alerting, incident retention, and closure records await operational/HLD decisions.

## Validation Summary

| Flow | Total Steps | Validated | Assumptions | Validation Priority |
|---|---:|---:|---:|---|
| F1: Plan and Submit Leave | 14 | 14 | 0 | Low |
| F2: Track and Cancel Eligible Leave | 14 | 14 | 0 | Low |
| F3: Review and Decide a Request | 19 | 19 | 0 | Low |
| F4: Add or Maintain an Employee | 18 | 18 | 0 | Low |
| F5: Configure Leave Rules and Readiness | 19 | 19 | 0 | Low |
| F6: Review and Adjust a Balance | 15 | 15 | 0 | Low |
| F7: Investigate Business Activity | 15 | 15 | 0 | Low |
| F8: Manage Accounts and Roles | 17 | 17 | 0 | Low |
| F9: Investigate Security Activity | 17 | 17 | 0 | Low |

`[VALIDATED]` in this table means steering-team-confirmed workflow structure. F1-F9 were also individually approved by the project sponsor on 2026-08-31. The assumption checklists remain pending representative-user, product-policy, or HLD validation and must be carried into downstream work.

## Related Artifacts

- [PRD](../prds/employee-hub-prd.md)
- [Information Architecture](../design/information-architecture-employee-hub.md)
- [Personas](personas-employee-hub.md)
- [Current-State Journey](journey-employee-hub.md)
- [Domain Analysis](../explore-employee-hub/domain-analysis.md)
- [Technical Feasibility](../explore-employee-hub/technical-feasibility.md)
- Planned HLD: `explore/hlds/employee-hub-hld.md`
- Planned Wireframes: `explore/design/wireframes-employee-hub.md`

**Last Updated**: 2026-08-31  
**Status**: Stakeholder-approved and UX-rule-validated; representative-user and HLD validation pending
