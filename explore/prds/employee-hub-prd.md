---
domain: Leave Request
slug: employee-hub
source: ../explore-employee-hub/domain-analysis.md
glossary_version: 2026-08-31
validated_by: Andrei
explore_type: Diverge-Converge
evidence_label: OBS
---

# PRD · Leave Request

**Status**: Approved  
**Priority**: Medium  
**Stakeholder Appetite**: Moderate  
**Created**: 2026-08-31  
**Last Updated**: 2026-09-01

**Related Documents**:

- [Signal](../../signal/signals/20260827-employee-hub-leave-management.md)
- [Hypothesis](../explore-employee-hub/hypothesis.md)
- [Context](../explore-employee-hub/context.md)
- [Market Research](../explore-employee-hub/market-research.md)
- [Domain Analysis](../explore-employee-hub/domain-analysis.md)
- [Technical Feasibility](../explore-employee-hub/technical-feasibility.md)
- [Architecture Context](../explore-employee-hub/architecture-context.md)
- [Regulatory and Compliance Baseline](../explore-employee-hub/regulatory-compliance.md)
- [Personas](../domain/personas-employee-hub.md)
- [Current-State Journey](../domain/journey-employee-hub.md)
- [Refined Concepts](../explore-employee-hub/ideation/employee-hub-refined-concepts.md)
- [Glossary](../glossary.md)
- [HLD](../hlds/employee-hub-hld.md) and [accepted ADRs](../decisions/)

## Problem Statement

**User need**: Employees need to understand their available leave, submit a request consistently, know which dates count, follow the decision, and recover when a request is rejected, delayed, or cancellable. Managers need enough scoped information to decide requests from direct reports, while HR and administrators need reliable employee, policy, holiday, access, and audit records. When this information and these decisions are split across spreadsheets, email, chat, or disconnected systems, users may face unclear ownership, inconsistent calculations, delayed outcomes, and inappropriate access. The exact frequency and impact of these problems for Employee Hub users remain assumptions because no direct user interviews or production data exist.

**Background**: Published category evidence supports broader HR administrative workload, leave-management complexity, and gaps in manager support, but it does not validate demand for this product. The stakeholder-validated learning hypothesis is that a focused, explainable leave workflow may improve employee clarity while creating a realistic environment for testing authorization, organization isolation, date rules, transactions, concurrency, auditability, deployment, and observability. The initial direction remains low-confidence for customer demand and usability until representative participants provide evidence. [Sources: [Signal](../../signal/signals/20260827-employee-hub-leave-management.md), [Hypothesis](../explore-employee-hub/hypothesis.md), [Context](../explore-employee-hub/context.md)]

## Goals

1. **Enable understandable employee self-service**: In a fictional-data task test, at least 2 of 3 representative participants submit a leave request without facilitator assistance and correctly identify its status. [Source: [Hypothesis](../explore-employee-hub/hypothesis.md)]
2. **Make leave effects explainable and reliable**: At least 2 of 3 participants correctly explain included and excluded dates and the balance effect, while automated scenarios produce the expected working-day and balance results. [Sources: [Hypothesis](../explore-employee-hub/hypothesis.md), [Signal](../../signal/signals/20260827-employee-hub-leave-management.md)]
3. **Demonstrate a trustworthy end-to-end workflow**: At least 2 of 3 participants judge the workflow clearer than their current process, and the shared MVP passes its approval, authorization-isolation, concurrency, audit, deployment, and observability acceptance checks. [Sources: [Hypothesis](../explore-employee-hub/hypothesis.md), [Context](../explore-employee-hub/context.md)]

## Success Metrics & KPIs

| Metric | Baseline | Target | Measurement Method | Timeline |
|---|---|---|---|---|
| Unassisted request completion | Not measured | At least 2 of 3 participants complete a fictional-data request without facilitator assistance | Moderated prototype or working-increment task test | Before describing the direction as user-validated |
| Correct leave-effect explanation | Not measured | At least 2 of 3 participants correctly explain included/excluded dates and balance effect | Ask each participant to explain the result after the task | Same participant sessions |
| Relative workflow clarity | Not measured | At least 2 of 3 participants say the workflow is clearer than their current process and explain why | Short post-task question with reasoning recorded | Same participant sessions |
| Working-day calculation correctness | No implementation baseline | 100% of agreed weekend, public-holiday, boundary, and time-zone examples pass | Automated domain tests against approved examples | Before completing the calculation increment |
| Balance and concurrent-decision integrity | No implementation baseline | 100% of agreed approval, rejection, cancellation, insufficient-balance, and competing-decision scenarios preserve invariants | Transactional integration and concurrency tests | Before completing the approval/balance increment |
| Unauthorized-access rejection | No implementation baseline | 100% of the agreed cross-role, cross-manager, and cross-organization denial matrix is rejected server-side | API integration and end-to-end authorization tests | Before sharing the MVP |
| Audit trace completeness | No implementation baseline | 100% of agreed leave, balance, access, employee, role, policy, holiday, and security-sensitive actions emit required safe audit events | Audit contract and integration tests | Before sharing the MVP |
| Deployable and observable workflow | No deployed baseline | One reproducible Rancher deployment completes the core request-to-decision flow with health, logs, metrics, and correlation evidence available | Deployment runbook and smoke test | Before Explore-to-Govern success is claimed for deployment learning |

**Key Performance Indicators**:

- **Primary KPI**: unassisted request completion by at least 2 of 3 participants.
- **Secondary KPIs**: correct leave-effect explanation, relative clarity, and complete passing evidence for calculation, transaction, authorization, audit, and deployment scenarios.
- **Interpretation guardrail**: results from 2–3 participants are directional learning, not proof of market demand or broad usability.

## Target Users

### Primary users

- **P1 — Employee**: Needs to request leave, view profile and leave information, understand available balance and counted days, track status, and identify an eligible cancellation or recovery action. The role and core capabilities are stakeholder-validated; pain points, device use, and detailed behaviours remain assumptions. [Source: [Persona P1](../domain/personas-employee-hub.md#persona-p1-employee)]
- **P2 — Manager**: Has Employee capabilities and needs to approve or reject requests from direct reports using clear, minimum-necessary context. Approval responsibility is stakeholder-validated; the need for team availability and the correct privacy boundary remain assumptions. [Source: [Persona P2](../domain/personas-employee-hub.md#persona-p2-manager)]

### Secondary users

- **P3 — HR Administrator**: Has Employee capabilities and must be able to add employees. Policy, holiday, balance-adjustment, history, and broader administration needs remain assumptions to resolve against MVP scope. [Source: [Persona P3](../domain/personas-employee-hub.md#persona-p3-hr-administrator)]
- **P4 — Organization Administrator**: Has stakeholder-confirmed access to every feature and is assumed to manage organization access, settings, and security-sensitive activity with traceability. The breadth and operational pattern of that access require validation. [Source: [Persona P4](../domain/personas-employee-hub.md#persona-p4-organization-administrator)]

**User segments**: The first validation focuses on 2–3 representative Employee participants. Manager and HR perspectives are needed for approval, privacy, policy, and administration assumptions; the Administrator remains an operational/security validation role. All participants and application records use fictional data.

## User Flows & Scenarios

**Reference**: The approved [current-state Journey J1](../domain/journey-employee-hub.md#journey-j1-employee-requests-and-tracks-leave) supplies the problem stages. These provisional future-state flows are derived from the three [refined concepts](../explore-employee-hub/ideation/employee-hub-refined-concepts.md) and must later be expanded in `explore/domain/flows-employee-hub.md`.

### F1 — Employee requests leave and Manager decides

**Scenario**: An active Employee prepares and submits a full-day leave request, and the assigned active Manager approves or rejects it.

1. The authenticated Employee opens their leave summary and selects an active leave type.
2. The Employee enters an inclusive start and end calendar date.
3. The server validates readiness and returns the effective policy context, counted/excluded date breakdown, conflicts, and projected balance effect.
4. The Employee submits with an idempotency key after reviewing the explanation.
5. In one transaction, the server creates one Pending request and reference, records the active breakdown and configuration evidence, reserves the amount, appends the required audit event, and creates notification intent.
6. The assigned Manager sees the request in a scoped pending queue with minimum-necessary employee, request, balance-effect, and team-availability context.
7. The Manager approves or rejects once; stale, duplicate, self, or out-of-scope decisions are rejected without a second effect.
8. The decision, request state, balance transactions, audit event, and notification intent commit atomically.
9. The Employee sees the committed outcome, final balance effect, decision history, and next action even if notification delivery is delayed or fails.

[Sources: J1; Refined Concepts 1–3; Domain BR-01–BR-19]

### Alternative flows

| Flow | Scenario | Outcome |
|---|---|---|
| F2 — Cancel and resubmit | Employee needs to change a Pending request | Employee cancels the request, reservation is released atomically, and the UI offers a new request prefilled from safe prior values; Pending requests are not edited. `[ASSUMPTION]` |
| F3 — Cancel future approved leave | Employee cancels eligible Approved leave before it starts | A compensating balance transaction restores used leave and the request becomes Cancelled; started or historical leave routes to HR correction. `[ASSUMPTION]` |
| F4 — Recover from rejection or conflict | Request is rejected, overlaps another request, has insufficient balance, or changed concurrently | The committed state remains unchanged, the reason is safe and specific, and the user receives an allowed next action without duplicate effects. |
| F5 — Resolve readiness gap | Manager, policy, schedule, holiday calendar, or balance prerequisite is missing | Submission is blocked before a misleading success; HR receives the missing prerequisite and corrective action. `[ASSUMPTION]` |
| F6 — Configure organization | HR adds an Employee and configures leave inputs | Effective configuration is validated and audited before it becomes available to calculation and workflow services. |
| F7 — Investigate or correct | HR identifies an incorrect balance or workflow outcome | HR reviews scoped history and appends a reasoned balance correction; immutable prior decisions, transactions, and audit events remain unchanged. |

### Edge cases

- Invalid or zero-working-day date range: reject with field-level explanation and no mutation.
- Weekend/public-holiday boundaries: display every included and excluded date and preserve the calculation evidence.
- Pending or Approved counted-date overlap: reject with a safe conflicting-request reference. `[ASSUMPTION]`
- Missing/inactive Manager: block submission or decision and expose an HR readiness action; no fallback approver is invented. `[ASSUMPTION]`
- Employee is their own Manager: prohibit self-approval and audit the attempt.
- Insufficient or concurrently changed balance: return current availability/conflict; create no partial request or ledger effect.
- Duplicate submission or decision retry: return the original committed outcome; create no duplicate request, decision, balance transaction, or audit business event.
- Competing Manager decisions: exactly one succeeds; the other receives a conflict and refresh action.
- Policy, schedule, calendar, or time-zone configuration changes after submission: historical explanation continues to use the version/snapshot captured for the request.
- Notification failure: request, decision, and balance remain committed; delivery retries independently.
- Cross-role, cross-manager, or cross-organization identifier guessing: reject without revealing whether the target record exists and record a safe security event where appropriate.

## Functional Requirements

### Core features

| # | Requirement | User Story | Acceptance Criteria | Priority |
|---|---|---|---|---|
| R-001 | Own profile and leave summary `[Source: P1; J1]` | As an Employee, I want to view my profile, active leave balances, and request summary so that I know my current leave position. | - [ ] The API returns only the authenticated Employee's permitted profile, balances, and requests.<br>- [ ] Each balance identifies leave type, entitlement period, available, reserved, and used amounts.<br>- [ ] Inactive or unavailable configuration is explained without fabricating a balance. | High |
| R-002 | Explainable request preview `[Source: J1; BR-06–BR-09, BR-16; Concept 1]` | As an Employee, I want to preview counted dates and balance effect so that I understand the request before submitting. | - [ ] The server accepts an inclusive date-only range and active leave type and returns one line per date.<br>- [ ] Each date states counted amount or exclusion reason using the effective schedule, holiday calendar, and organization time zone.<br>- [ ] The preview shows current balance and projected available/reserved effect.<br>- [ ] Invalid, zero-day, overlap, insufficient-balance, and missing-configuration outcomes are specific and non-mutating. | High |
| R-003 | Idempotent request submission and reservation `[Source: BR-05, BR-10–BR-12, BR-16–BR-18; Concept 2]` | As an Employee, I want to submit one durable request so that retries cannot duplicate my leave or balance effect. | - [ ] A valid command creates one Pending request, durable reference, active breakdown, reservation transaction, audit event, and notification intent atomically.<br>- [ ] The server recalculates and validates against current authoritative data rather than trusting the preview or browser total.<br>- [ ] Reusing the same idempotency key and payload returns the original outcome; conflicting reuse is rejected.<br>- [ ] Any failed invariant rolls back the entire command. | High |
| R-004 | Request history, receipt, and status `[Source: P1; J1; Concepts 1–2]` | As an Employee, I want to track each request and its explanation so that I know what is committed and who acts next. | - [ ] Own requests are listable and filterable by status and relevant date period.<br>- [ ] Request detail shows reference, current state, approver role, calculation evidence, balance effect, timeline, and permitted next action.<br>- [ ] Committed workflow state is visible independently of notification delivery state.<br>- [ ] Terminal records remain readable and are not silently rewritten. | High |
| R-005 | Scoped Manager decision queue `[Source: P2; BR-03, BR-04, BR-19; Concept 3]` | As a Manager, I want to see Pending requests assigned to me with minimum-necessary context so that I can make a responsible decision. | - [ ] The queue contains only requests for current direct reports assigned to the authenticated Manager.<br>- [ ] A decision card shows request dates, counted amount, leave type, balance effect, and permitted team-availability context.<br>- [ ] Sensitive free-text or medical detail is absent by default.<br>- [ ] Self, inactive, cross-manager, and cross-organization access is denied server-side. | High |
| R-006 | Atomic approve or reject `[Source: BR-04, BR-05, BR-11, BR-17, BR-18; Concept 2]` | As a Manager, I want to approve or reject once so that the Employee receives a reliable outcome. | - [ ] Only the assigned active Manager can decide a Pending request and cannot decide their own request.<br>- [ ] Approval moves the reserved amount to used; rejection releases the reservation. `[ASSUMPTION]`<br>- [ ] Decision, state, ledger, audit event, and notification intent commit atomically.<br>- [ ] Optimistic versioning/locking permits exactly one final decision; stale and duplicate commands create no second effect.<br>- [ ] Rejection records a concise reason and exposes a safe Employee recovery action. | High |
| R-007 | Eligible cancellation `[Source: BR-13, BR-14; J1]` | As an Employee, I want to cancel eligible leave so that my request and balance reflect changed plans. | - [ ] A Pending own request can be cancelled and its reservation released atomically. `[ASSUMPTION]`<br>- [ ] A future Approved own request can be cancelled and its used effect restored with a compensating transaction. `[ASSUMPTION]`<br>- [ ] Rejected, Cancelled, started, or historical requests cannot be self-cancelled and show the allowed HR/recovery path.<br>- [ ] Dates or leave type cannot be edited; changing them requires cancellation and a new request. `[ASSUMPTION]` | High |
| R-008 | Immutable balance accounting `[Source: BR-09–BR-11, BR-15; Domain invariants]` | As an Employee or authorized reviewer, I want to reconcile balances to their history so that the displayed amount is trustworthy. | - [ ] Available, reserved, and used projections reconcile to immutable grants, adjustments, reservations, uses, releases, and restorations.<br>- [ ] Request-related entries carry the request reference and calculation amount.<br>- [ ] Normal workflows cannot update or delete posted Balance Transactions.<br>- [ ] A reconciliation test detects any projection/ledger drift. | High |
| R-009 | Organization and permission enforcement `[Source: BR-01, BR-02, BR-19; Regulatory baseline]` | As an organization user, I want to have access limited to my identity and responsibilities so that records are not exposed or changed improperly. | - [ ] Every protected command and query derives organization and role scope from the authenticated server-side identity.<br>- [ ] Every referenced organization-owned record is checked against that authoritative scope.<br>- [ ] UI visibility is never accepted as an authorization control.<br>- [ ] The agreed cross-role, cross-manager, and cross-organization negative matrix passes without record-existence leakage. | High |
| R-010 | Traceable sensitive actions `[Source: BR-17; Regulatory baseline]` | As an authorized reviewer, I want to review immutable audit history so that decisions and sensitive changes can be investigated. | - [ ] Required leave, balance, employee, role, policy, holiday, access-denial, and configuration actions append structured audit events.<br>- [ ] A required event commits with its business action or causes that action to roll back.<br>- [ ] Events include safe actor, organization, action, target, time, outcome, and correlation facts and exclude secrets and unnecessary leave text.<br>- [ ] Audit reads are role- and organization-scoped and are themselves audited. | High |

### Supporting features

| # | Requirement | User Story | Acceptance Criteria | Priority |
|---|---|---|---|---|
| R-011 | Workforce and reporting-line administration `[Source: P3; BR-02, BR-03]` | As HR, I want to add and maintain Employees, teams, and Manager relationships so that workflows have eligible actors. | - [ ] HR can create, view, update, activate, and deactivate fictional Employee and Team records.<br>- [ ] Each active Employee has at most one active Manager in the same organization for MVP approval. `[ASSUMPTION]`<br>- [ ] Invalid, cyclic/self, inactive, or cross-organization relationships are rejected.<br>- [ ] Relevant changes are audited and historical references remain readable. | High |
| R-012 | Simple leave configuration `[Source: P3; BR-07–BR-09, BR-16; Concept 3]` | As HR, I want to configure leave types, a simple policy, work schedule, public holidays, and organization time zone so that requests can be calculated consistently. | - [ ] HR can create and manage effective active/retired versions without overwriting history.<br>- [ ] MVP supports full-day requests, one default work schedule, one holiday calendar, and one organization time zone. `[ASSUMPTION]`<br>- [ ] Seed configuration provides one annual-leave type; additional simple balance-based types use the same model. `[ASSUMPTION]`<br>- [ ] Conflicting effective ranges and incomplete calculation configuration are rejected. | High |
| R-013 | Operational readiness `[Source: Concept 3]` | As HR, I want to review actionable readiness checks so that Employees do not encounter avoidable workflow failures. | - [ ] Readiness reports active Employee/account, Manager, leave type/policy, schedule/calendar, time zone, and balance prerequisites.<br>- [ ] Each failed check identifies the responsible role and a safe corrective action.<br>- [ ] Submission is blocked when authoritative calculation or approval prerequisites are absent.<br>- [ ] Readiness does not invent defaults that alter historical or balance meaning. | Medium |
| R-014 | Reasoned balance adjustment `[Source: P3; BR-15]` | As HR, I want to append a balance adjustment with a reason so that corrections remain controlled and traceable. | - [ ] Only HR or an explicitly permitted Administrator can append a non-zero adjustment for an open period.<br>- [ ] Amount, leave type, entitlement period, Employee, and concise reason are required and organization-scoped.<br>- [ ] Transaction, projection update, and audit event commit atomically.<br>- [ ] Existing Balance Transactions cannot be edited or deleted. | Medium |
| R-015 | Privacy-aware team availability `[Source: P2; BR-19; Concept 3]` | As a Manager, I want to view scoped team availability so that I can assess coverage without seeing unnecessary leave information. | - [ ] The view is limited to the Manager's current direct-report team and relevant date range.<br>- [ ] It communicates availability without exposing leave notes or medical/sensitive reasons.<br>- [ ] Exact fields and granularity remain configurable pending Employee/Manager validation. `[ASSUMPTION]`<br>- [ ] Cross-team and cross-organization access tests are rejected. | Medium |
| R-016 | In-app workflow notifications `[Source: BR-18; Concept 2]` | As an Employee or Manager, I want to receive notification of workflow responsibility and outcomes so that I know when action is needed. | - [ ] Submission, decision, and eligible cancellation create durable in-app notification intent in the business transaction. `[ASSUMPTION]`<br>- [ ] Delivery state is visible separately and cannot change request or balance state.<br>- [ ] Retries are idempotent and a failed delivery remains diagnosable.<br>- [ ] Email, chat, SMS, and push providers are not required for MVP. | Medium |
| R-017 | Administrator access and security oversight `[Source: P4]` `[DOMAIN-RULE-VIOLATION: requirement conflicts with rule "Administrator does not implicitly inherit HR or leave-detail access" in domain-analysis.md]` | As an Administrator, I want to access every Employee Hub feature so that I can configure and oversee the organization. | - [ ] The Administrator can exercise each product capability through explicit, testable permissions rather than a client-only bypass.<br>- [ ] Role/account and organization-setting changes require valid scope and create security audit events.<br>- [ ] Broad access does not permit audit/ledger history mutation or self-approval.<br>- [ ] The Product Manager and Architect reconcile this sponsor-confirmed breadth with least privilege in the HLD before R-017 implementation planning. | High |

## Non-Functional Requirements

### Performance and scale

- **NFR-001 — Scoped read latency**: For the initial 10-Employee learning dataset, profile, balance, request, approval, readiness, and audit-list reads target p95 below 500 ms at the API boundary under the agreed local/shared test profile. Owner: Lead Engineer. Validation: repeatable performance smoke test.
- **NFR-002 — Critical command latency**: Preview, submit, decide, cancel, adjustment, and configuration commands target p95 below 1 second, excluding asynchronous notification delivery, under the same profile. Owner: Lead Engineer. Validation: repeatable command test.
- **NFR-003 — Bounded queries**: Lists default to at most 50 records, use deterministic pagination/sorting, and execute organization-scoped indexed queries without unbounded relation loading. Owner: Lead Engineer. Validation: API and query-plan review.

### Security and data protection

- **NFR-004 — Authentication boundary**: Every non-public operation requires an authenticated server-side identity; exact provider, protocol, session/token, and account-linking design remain open. Owner: Architect. Validation: threat model and integration tests.
- **NFR-005 — Authorization and isolation**: Organization, role, reporting-line, record, field, and command authorization is centralized and tested negatively; client-provided scope is never authoritative. Owner: Architect. Validation: authorization matrix.
- **NFR-006 — Learning-data boundary**: Only fictional, minimized records are allowed; real names, identifiers, medical details, documents, credentials, tokens, and keys are prohibited from fixtures, application logs, and audit metadata. Owner: Product Manager and Lead Engineer. Validation: fixture/schema/log review and secret scan.
- **NFR-007 — Protected deployment**: Shared environments use encrypted transport and protected secrets and database/volume configuration. OWASP ASVS 5.0.0 informs controls without an ASVS certification claim. Owner: Architect. Validation: deployment-security checklist.

### Reliability, consistency, and recovery

- **NFR-008 — Atomic invariants**: Request state, active breakdown, decision, balance entries/projection, required audit event, and notification intent commit atomically wherever one command affects them. Owner: Lead Engineer. Validation: transaction fault-injection integration tests.
- **NFR-009 — Concurrency and idempotency**: Duplicate/retried submissions and decisions and competing commands produce at most one business effect and return a stable original outcome or explicit conflict. Owner: Lead Engineer. Validation: concurrency and retry tests.
- **NFR-010 — Durable asynchronous delivery**: Notification work is claimed, retried, and diagnosed independently from committed workflow state; notification failure never reverses a request or balance. Owner: Lead Engineer. Validation: worker retry/failure tests.
- **NFR-011 — Safe errors and recovery**: Errors use stable codes, field/action context, correlation IDs, and allowed next actions without stack traces, secrets, sensitive details, or unauthorized record existence. Owner: Lead Engineer. Validation: negative-path API/UI tests.
- **NFR-012 — Availability and disaster recovery claims**: No uptime, RTO, RPO, or backup/restore target is claimed until the Rancher runtime and ownership are known. A shared release must document what was actually tested. Owner: Sponsor/runtime owner. Validation: operational readiness review.

### Usability and accessibility

- **NFR-013 — Accessibility target**: Critical profile, request, status, decision, configuration, and error paths target WCAG 2.2 Level AA through keyboard operation, visible/unobscured focus, semantics, announcements, contrast, non-color cues, text alternatives, and accessible authentication. This is not a conformance claim. Owner: Product Manager and Lead Engineer. Validation: automated checks plus keyboard and representative screen-reader review.
- **NFR-014 — Responsive web experience**: Critical flows remain usable at 200% zoom and across supported desktop and phone-sized browser layouts without losing content or actions. Exact browser/version matrix is a scaffold decision. Owner: Lead Engineer. Validation: responsive browser test.
- **NFR-015 — Understandable state**: UI copy distinguishes preview, Pending request, committed decision, balance effect, and notification delivery and provides a safe next action for every modeled failure. Owner: Product Manager. Validation: acceptance and participant tests.
- **NFR-016 — Localization**: MVP content is English and static application translations remain frontend-managed; database-managed translations are deferred. Owner: Product Manager. Validation: architecture and content review.

### Maintainability and observability

- **NFR-017 — Modular monolith**: NestJS modules preserve the domain boundaries for access, workforce, configuration/calendar, workflow/balance, and audit/notification; cross-module writes occur through explicit application services and transactions. Owner: Architect. Validation: architecture and dependency review.
- **NFR-018 — TDD and traceability**: Code changes follow red-green-refactor and link tests to R-/NFR IDs, domain rules, tasks, and decisions. Critical authorization, calculation, lifecycle, transaction, concurrency, and audit branches require automated evidence; a blanket coverage percentage is not yet asserted. Owner: Lead Engineer. Validation: review and CI evidence.
- **NFR-019 — Supported versions**: Node.js, Angular, NestJS, TypeScript, PostgreSQL, npm, test tools, and container tooling are explicitly pinned to supported versions when scaffolded. Owner: Lead Engineer. Validation: manifest and CI review.
- **NFR-020 — Observability**: Shared deployments expose health/readiness, structured logs, metrics, and correlation across HTTP commands and background jobs while excluding prohibited data. Exact platform tools and alerts remain open. Owner: Lead Engineer. Validation: deployment smoke test and telemetry inspection.

### NFR traceability and acceptance

| NFR | Related functional requirements | Pass/fail acceptance criterion |
|---|---|---|
| NFR-001 | R-001, R-004, R-005, R-010–R-015 | The agreed 10-Employee test profile reports p95 below 500 ms for every named scoped-read route, with raw results retained. |
| NFR-002 | R-002, R-003, R-006, R-007, R-012, R-014 | The same profile reports p95 below 1 second for every named critical API command, excluding asynchronous delivery, with raw results retained. |
| NFR-003 | R-004, R-005, R-010, R-011, R-015 | Contract tests prove deterministic paging and a maximum default page of 50; query review finds no unscoped or unbounded list route. |
| NFR-004 | R-001–R-017 | Integration tests prove every non-public route rejects an absent, invalid, expired, or unlinked identity without mutation or protected data. |
| NFR-005 | R-001–R-017 | The approved positive/negative permission matrix passes for all roles, Manager scopes, organizations, fields, and commands. |
| NFR-006 | R-001, R-002, R-005, R-009–R-011, R-015, R-017 | Fixture, schema, response, application-log, and audit-log review contains no prohibited real, medical, credential, token, or key data. |
| NFR-007 | R-001–R-017 | A shared-environment checklist proves encrypted ingress and protected secret/storage configuration, and no documentation claims ASVS certification. |
| NFR-008 | R-003, R-006–R-008, R-010, R-014, R-016 | Injected failure at each persistence boundary leaves either the complete expected command result or no business mutation. |
| NFR-009 | R-003, R-006–R-008, R-014, R-016 | Retry and concurrency suites prove one request, one final decision, and one corresponding balance effect for each command identity. |
| NFR-010 | R-003, R-006, R-007, R-016 | Worker tests prove retriable delivery, idempotent claim/dispatch, recorded terminal failure, and no request/balance rollback. |
| NFR-011 | R-002, R-003, R-005–R-007, R-009, R-011–R-017 | Negative-path tests assert stable code, safe message, correlation ID, and allowed next action while excluding stack traces and unauthorized details. |
| NFR-012 | R-001–R-017 | Release notes state tested operational capabilities and explicitly state that uptime, RTO, RPO, and untested backup/restore behaviour are not promised. |
| NFR-013 | R-001–R-007, R-010–R-017 | Automated checks plus keyboard and representative screen-reader review find no blocking issue in every critical path; any residual issue is documented and blocks a conformance claim. |
| NFR-014 | R-001–R-007, R-010–R-017 | Critical pages remain operable at 200% zoom and at each supported desktop/phone viewport without hidden content, horizontal loss, or unreachable action. |
| NFR-015 | R-002–R-007, R-013, R-016 | Scenario tests show users can distinguish preview, Pending, final decision, balance effect, and delivery status and can identify the next action for every modeled failure. |
| NFR-016 | R-001–R-017 | All shipped UI text is sourced from frontend-managed English translation resources; no database translation dependency exists. |
| NFR-017 | R-001–R-017 | Automated dependency rules and architecture review find no prohibited module dependency or cross-module persistence mutation. |
| NFR-018 | R-001–R-017 | Every implemented requirement links red/green evidence and automated acceptance tests; all critical domain and security branches named in the PRD pass in CI. |
| NFR-019 | R-001–R-017 | Runtime, framework, database, package-manager, test, and container versions are explicit in manifests/configuration and reproduce under `npm ci` in CI. |
| NFR-020 | R-003, R-006, R-007, R-009, R-010, R-013, R-016, R-017 | A shared-environment smoke test follows one correlation ID across API and worker telemetry, verifies health/readiness, and finds no prohibited data. |

## Quality Gates

### Definition of Ready

An implementation increment is Ready only when:

- The in-scope R-/NFR IDs, user, outcome, acceptance examples, and explicit exclusions are linked from its Flow task.
- Relevant domain rules and glossary terms are linked; any unresolved assumption is either answered or recorded as an accepted learning constraint with an owner and validation point.
- UI work has an approved flow/state description covering success, empty, loading, validation, authorization, conflict, and recovery states.
- Security impact identifies identity, role, organization, Manager, record, and field-level access plus required negative tests.
- Calculation or accounting work includes worked examples and invariants; concurrent or retryable work includes an idempotency/locking test design.
- Data changes define forward migration, synthetic fixtures, compatibility, and recovery; no real-person data is needed.
- External/runtime needs—GitHub, registry, Rancher, identity, notifications, or observability—are available or safely represented by an explicit adapter/test boundary.
- The test layers and review evidence needed for completion are agreed, and no known critical blocker is hidden.

**Ready decision**: Andrei as Product Manager confirms product scope; Andrei as Architect and the Lead Engineer confirm technical readiness. A failed criterion keeps the task in planning.

### Definition of Done

An implementation increment is Done only when:

- Every applicable functional acceptance criterion and linked NFR criterion passes, with skipped checks named and justified.
- TDD evidence shows the relevant test failed before implementation, then passed; refactoring preserves the green suite.
- Unit, PostgreSQL integration, API, browser, authorization, concurrency, accessibility, performance, and deployment checks appropriate to the risk have passed.
- Server-side authorization, organization isolation, calculation/balance invariants, idempotency, audit creation, and error-safety tests cover every affected critical path.
- Migrations apply from the supported prior state, synthetic seeds remain fictional, and rollback/forward-fix limitations are documented.
- Code is formatted, linted, type-checked, built, dependency/secret checked, peer-reviewed, and free of unresolved critical/high findings within the increment.
- Documentation links code, PRD requirements, domain rules, ADRs, API/schema changes, tests, Flow task, and operational steps.
- Telemetry and audit evidence are sufficient to diagnose the feature without exposing prohibited data.
- For deployable increments, immutable images are produced, health/readiness and smoke checks pass in the target environment, and the tested rollback or forward-fix path is recorded.
- Product, architecture, and engineering review evidence is attached; no unsupported legal, security, accessibility, availability, or production-readiness claim is introduced.

**Done decision**: the Lead Engineer supplies evidence; Product and Architecture approve where the increment changes behaviour, scope, risk, or a recorded decision.

### Requirement acceptance rule

Each R-XXX is accepted only when all checkboxes in its PRD row pass and every linked NFR criterion applicable to that increment passes. Partial implementation remains incomplete unless the PRD and task explicitly define a smaller independently valuable slice with its own acceptance evidence.

## Testing Strategy Summary

The full test strategy is produced later in Explore. This PRD establishes the minimum testing shape:

| Layer | Scope | Working tool direction | Required evidence |
|---|---|---|---|
| Domain unit | Date breakdown, lifecycle, balance formulas, permissions, errors | Jest for backend; table-driven/property-style examples without assuming a new library | Boundary, invalid, and invariant examples linked to BR and R IDs |
| Angular unit/component | Forms, state rendering, accessible semantics, error/recovery behaviour | Angular-supported Vitest with jsdom | User-observable component behaviour; avoid implementation-detail assertions |
| PostgreSQL integration | Constraints, migrations, effective versions, transactions, locks/versions, idempotency, outbox, reconciliation | Jest against a real PostgreSQL test database | Commit/rollback, competing-command, retry, and migration evidence |
| HTTP/API integration | Authentication boundary, DTO validation, authorization, organization scoping, workflow contracts | Jest and Supertest | Positive and adversarial role/scope matrix plus stable error contracts |
| Browser E2E | Request-to-decision, cancellation, readiness, HR configuration, Administrator oversight | Tool selected during frontend scaffold; no runtime dependency is committed here | Critical happy and recovery flows against a real API/database |
| Accessibility | Keyboard, focus, semantics, announcements, contrast, zoom/reflow | Automated checker selected during scaffold plus manual keyboard/screen-reader checks | Checklist/results for every critical flow; no conformance claim from automation alone |
| Performance | Provisional read/command budgets and bounded queries | Repeatable API/browser profile with stored raw output | p95 results, environment/profile, regressions, and query review |
| Security | Threat cases, permission matrix, secret/dependency checks, safe errors/logs | Automated tests and CI scanners selected during scaffold | Negative-access evidence and reviewed findings |
| Deployment/operations | Image, migration, probes, smoke path, telemetry, rollback/forward fix | GitHub CI direction and Rancher target | Immutable image reference and environment-specific verification record |

Testing uses only deterministic fictional fixtures. Time-dependent tests control the organization-local date and event clock. Concurrency tests use real simultaneous PostgreSQL transactions rather than mocked sequencing. External identity and delivery adapters use contract tests until real providers are selected.

## DevOps & Deployment Strategy Summary

### Environments

| Environment | Purpose | Minimum gate |
|---|---|---|
| Local | Fast TDD, migrations, and complete fictional workflow | Reproducible npm install, PostgreSQL startup, migrate/seed, tests, and app startup |
| GitHub CI | Clean validation and immutable artifact production | Lockfile install, format/lint/type check, unit/integration/API tests, builds, security checks, and retained evidence |
| Rancher staging | Integrated review using fictional data | Protected configuration, migration job, deployment, probes, smoke/E2E checks, and telemetry inspection |
| Production-like learning | Rollout, observability, recovery, and operational practice—not real HR operation | Explicitly selected learning objectives such as rollback and backup/restore must be tested before being claimed |

### Delivery path

1. A GitHub change passes branch/review rules and the full applicable CI gate.
2. CI builds versioned frontend and backend images once and records immutable digests; promoted environments reuse those images.
3. Database migrations run as an explicit, observable deployment step before incompatible application traffic is enabled.
4. Rancher deploys using namespace-scoped service accounts, protected secrets/configuration, resource requests/limits, and startup/readiness/liveness probes defined from verified platform capability.
5. Automated smoke tests exercise health, authentication boundary, one fictional request-to-decision path, database connectivity, and required telemetry.
6. Promotion is manual until evidence supports automation. Failed verification stops promotion and invokes the documented rollback or forward-fix path; migrations must be designed with compatibility in mind.

### Operational guardrails

- No repository, GitHub Actions runner, registry, Rancher namespace, identity provider, notification provider, or observability stack is assumed to exist until verified.
- Secrets never enter Git, images, logs, fixtures, or client bundles; environment access follows least privilege and is auditable where the platform supports it.
- Health reports process state; readiness verifies dependencies needed to accept traffic without leaking configuration details.
- Logs are structured and correlated with metrics/traces where selected, but exclude tokens, secrets, medical details, unnecessary leave text, and broad employee payloads.
- Deployment evidence names the environment, image digest, migration version, test result, approver, and tested operational claims.
- No uptime, RTO, RPO, zero-downtime, backup/restore, or production-readiness claim is made until the runtime owner and a repeatable test establish it.

## Constraints

### Technical constraints

- Angular frontend and modular NestJS/TypeScript backend as separate applications in one repository. `[CONFIRMED]`
- Node.js LTS, npm, PostgreSQL, and Rancher deployment target; exact supported versions are selected and pinned during scaffolding. `[CONFIRMED]`
- PostgreSQL is authoritative for request state, calculation evidence, balances, decisions, audit events, and notification intent. `[CONFIRMED]`
- One organization runs locally at first, while API, query, relationship, uniqueness, and audit design preserve organization boundaries. `[CONFIRMED]`
- Calendar dates represent leave periods; event timestamps use instants interpreted through the organization time zone. `[CONFIRMED]`
- One default full-day work schedule, holiday calendar, and organization time zone are sufficient for MVP. `[ASSUMPTION]`
- Reservation on submission, no counted-date overlap, and cancel-and-resubmit instead of editing are the provisional lifecycle model. `[ASSUMPTION]`
- Identity provider, notification provider, observability stack, container registry, and Rancher capabilities are undecided. TypeORM migrations, idempotency/versioning/targeted locks, and the transactional outbox/in-process worker are selected by ADR-001 through ADR-004. `[ASSUMPTION]`

### Business constraints

- Fixed Employee, Manager, HR, and Administrator roles and one Manager approval step bound the MVP. `[CONFIRMED]`
- Administrator access to every feature is sponsor-confirmed but must be reconciled with explicit permissions and least privilege. `[CONFIRMED]`
- The simple leave-policy model supports full-day balance-based leave and avoids country-specific legal automation. `[CONFIRMED]`
- Annual leave is the initial seeded type; whether other leave types are required for MVP remains unvalidated. `[ASSUMPTION]`
- Initial learning scale is 10 Employees with expected holiday-season concentration but no measured production load. `[CONFIRMED]`
- User needs, current-state pain, adoption, privacy detail, team-availability detail, and workflow usability have not been validated with representative users. `[ASSUMPTION]`

### Regulatory and quality constraints

- Fictional data only; no target jurisdiction, production-personal-data processing, formal GDPR/legal-compliance feature, certification, or legal approval is claimed. `[CONFIRMED]`
- Real-person data, a target deployment market, regulated-sector use, procurement demand, or formal conformance claim triggers a new compliance assessment. `[CONFIRMED]`
- WCAG 2.2 AA and OWASP ASVS 5.0.0 are voluntary engineering references, not compliance claims. `[CONFIRMED]`
- Shared instances display the learning/demo notice and avoid unsupported legal, security, or accessibility claims. `[CONFIRMED]`

### Resource constraints

- Andrei covers Product Manager and Architect responsibilities; the initiative owner/developer covers Sponsor and Lead Engineer responsibilities. `[CONFIRMED]`
- The Sponsor can dedicate regular development time, but no delivery date, production launch, paid-service budget, or external reviewer availability is committed. `[CONFIRMED]`
- The 2–3 participant validation target depends on participant availability and yields directional learning only. `[ASSUMPTION]`

## Out of Scope

### Explicitly excluded from this PRD

- Payroll, recruitment, performance management, and a complete HRIS — preserve the focused leave-management boundary.
- Real employee or other real-person data — the project permits fictional data only.
- Formal legal/jurisdictional compliance automation or claims — no launch jurisdiction or qualified legal review exists.
- Dynamic/custom roles, per-feature permission builders, delegation, fallback approvers, and configurable or multi-step approval workflows — fixed roles and one Manager step bound the MVP.
- Partial-hour or partial-day leave, multiple work schedules, offices, holiday calendars, and organization time zones — the provisional MVP uses one full-day model. `[ASSUMPTION]`
- Accrual engines, complex carry-over/expiry, closed-period accounting, negative-balance policies, and country-specific entitlement calculations — the simple policy model is intentionally bounded.
- Editing dates or leave type on a Pending request and reopening terminal requests — cancel-and-resubmit preserves a simple auditable lifecycle. `[ASSUMPTION]`
- Native mobile applications — the product is a responsive browser application.
- External HRIS, payroll, calendar, public-holiday, email, chat, SMS, or push integrations — in-app intent/delivery is sufficient for the provisional MVP. `[ASSUMPTION]`
- Database-managed translations — static application translation remains a frontend responsibility.
- Production-scale service levels, availability claims, disaster-recovery commitments, and certifications — platform capability and ownership are not established.

### Future considerations

- Additional leave types and policy models based on validated organization needs.
- Delegated/multiple approvers and Manager-absence recovery.
- Multiple offices, work schedules, calendars, time zones, partial days, and external calendar integration.
- Real identity and notification providers, reporting/export, and stronger operational service levels.
- More granular administrator permissions if research shows “every feature” is unnecessarily broad.

## Technical Architecture

**Summary**: Employee Hub is a TypeScript monorepository containing a responsive Angular web application and a modular NestJS monolith backed by PostgreSQL. The API is the authority for identity-derived organization scope, authorization, leave calculation, request lifecycle, transaction boundaries, idempotency, balance accounting, audit, and notification intent. Critical online commands commit synchronously; notification delivery and similar side effects run asynchronously from durable intent. Rancher is the target runtime, but its concrete cluster, ingress, secrets, storage, registry, observability, rollout, rollback, and backup capabilities must be verified before deployment claims are made. [Sources: [Technical Feasibility](../explore-employee-hub/technical-feasibility.md), [Architecture Context](../explore-employee-hub/architecture-context.md)]

### Key components

- **Angular Web App**: role-aware presentation, accessible forms and states, server-produced calculation explanations, and responsive views; it does not enforce authoritative authorization or calculate committed balances.
- **NestJS API / Access module**: authenticated identity mapping, active account/role resolution, organization context, and command/query authorization.
- **Workforce module**: Employees, Teams, Manager relationships, and active-status rules.
- **Leave Configuration module**: Leave Types, effective Leave Policies, Work Schedules, Holiday Calendars, Public Holidays, and organization time zone.
- **Leave Workflow and Balance module**: preview, Leave Requests, Request Day Breakdowns, lifecycle, Approval Decisions, Leave Balances, immutable Balance Transactions, transactions, version checks, and idempotency.
- **Audit and Notification module**: required append-only Audit Events, durable Notification intents, worker claims, retries, and delivery status.
- **PostgreSQL**: organization-scoped relational constraints, effective versions, unique decision/idempotency guarantees, transactional ledger/projection consistency, and durable outbox-style work.
- **Operational boundary**: health/readiness, structured telemetry, migrations, configuration/secrets, container images, and Rancher deployment assets.

### Integrations

- **Authentication provider**: not selected. A provider adapter must establish identity without granting domain authorization directly.
- **Notification provider**: not required for MVP; the internal in-app channel exercises durable intent and delivery semantics. External adapters are future work.
- **GitHub, CI runner, container registry, Rancher, and observability services**: operational dependencies whose concrete contracts and ownership remain open.
- **HRIS, payroll, external calendar/holiday, and collaboration systems**: no MVP integration.

### Data model

`Organization` owns all scoped records. `UserAccount` and explicit `RoleAssignment` establish access identity; `Employee` belongs to a `Team` and may reference one Manager Employee. Effective `LeaveType`, `LeavePolicy`, `WorkSchedule`, `HolidayCalendar`, and `PublicHoliday` records feed a date-only `RequestDayBreakdown`. A `LeaveRequest` belongs to one Employee and Leave Type, has at most one immutable `ApprovalDecision`, and produces immutable `BalanceTransaction`, `AuditEvent`, and `Notification` records. `LeaveBalance` is a reconcilable projection unique by Employee, Leave Type, and entitlement period. TypeORM/PostgreSQL migrations are selected; physical schema detail awaits implementation-level design.

**HLD status**: Complete and socialization-ready: [Employee Hub HLD](../hlds/employee-hub-hld.md), with [six accepted ADRs](../decisions/). Identity-provider and Rancher runtime contracts remain explicitly open; implementation must not weaken the approved persistence, concurrency, historical-evidence, job, or deployment constraints.

## Open Questions

Exact calendar dates are not invented because no delivery schedule is committed. Each target is therefore a mandatory resolution milestone.

| # | Question | Source coverage | Owner | Priority | Target resolution |
|---|---|---|---|---|---|
| Q1 | Do representative Employees actually experience fragmented guidance, balance, request, acknowledgement, and recovery problems, and is a focused workflow valuable enough to adopt? | Signal problem/evidence/impact assumptions; J1; Hypothesis A1–A2; Context AS-1, AB-1 | Andrei — Product Manager | High | Before any customer/problem-validation claim; test during solution validation |
| Q2 | Which Employee information, explanation depth, status, cancellation guidance, privacy, device, and accessibility needs are real and highest priority? | P1; Hypothesis A3/A5; Context AS-2; Concepts 1–2 | Andrei — Product Manager | High | Before affected UX is accepted; validate with 2–3 participants |
| Q3 | What request, balance-effect, team-availability, reason, and privacy fields does a Manager need to decide fairly? | P2; Hypothesis A4; Context AS-3; Domain U-07; Architecture OQ-07; Concept 3 | Andrei — Product Manager | High | Before R-005/R-015 implementation planning |
| Q4 | Which workforce, policy, calendar, balance, audit, reporting, and device capabilities does HR need in the first useful increment? | P3; Domain U-08; Context G1/G5; Concept 3 | Andrei — Product Manager | High | Before HR epic planning |
| Q5 | How will “Administrator can access every feature” be represented through explicit permissions while preserving least privilege, no self-approval, and separate audit responsibility? | P4; confirmed sponsor direction; R-017 domain-rule conflict; Architecture OQ-07 | Andrei — Product Manager and Architect | High | Before final role/permission model is approved in HLD |
| Q6 | Which leave types and simple entitlement, grant, accrual, carry-over, expiry, and negative-balance rules are required? | Domain U-01/U-02; Context G1; PRD annual-leave seed assumption | Andrei — Product Manager with HR representative | High | Before R-012/R-008 implementation planning |
| Q7 | What exact weekend, holiday, work-schedule, full/partial-day, organization-date, and historical configuration rules produce working days? | Signal complexity assumption; Domain U-04/U-10; Context AT-3/G3/G8; Architecture OQ-06/OQ-08; Concept 1 | Andrei — Architect and Lead Engineer with HR representative | High | Before R-002 calculation implementation |
| Q8 | Should submission reserve balance, which Pending/Approved dates conflict, and when may requests be edited, cancelled, or corrected? | Hypothesis A5; Domain U-03/U-05/U-06; Context G2/G4; Architecture OQ-08; PRD provisional rules | Andrei — Product Manager and Architect | High | Before R-003/R-007 implementation planning |
| Q9 | Is one active Manager sufficient, and what happens when the Manager is absent, changed, inactive, or also the requester? | Signal fixed-workflow assumption; Hypothesis A6; Context AO-1/G7; Domain U-09; Concept 2 | Andrei — Product Manager | High | Before R-005/R-006 implementation planning |
| Q10 | Which notification events, in-app behaviour, external channels, timing, retry limit, and failure visibility are required? | Signal notification assumption; Context G9; Domain U-11; Technical TU-07; Architecture OQ-09; Concept 2 | Andrei — Product Manager and Lead Engineer | Medium | Before R-016 implementation planning |
| Q11 | Which identity provider, protocol, session/token model, claim mapping, account linking, logout, and failure behaviour establish identity safely? | Context G12/AT-2; Technical TU-01; Architecture OQ-01; Concept 3 | Andrei — Architect and Lead Engineer | High | Before authentication implementation |
| Q12 | Which ORM/migration tool and PostgreSQL transaction, lock/version, idempotency, outbox, and reconciliation patterns prove the domain invariants? | Context AT-1/AT-3; Technical TU-02; Architecture OQ-02; Concepts 1–2 | Andrei — Architect and Lead Engineer | High | Before persistence scaffold/HLD approval |
| Q13 | Which exact supported versions, browser matrix, browser E2E tool, automated accessibility tool, styling, and component strategy are pinned? | Context AT-4; Technical TU-03/TU-09; Architecture OQ-03/OQ-10; persona device assumptions | Lead Engineer with Andrei — Product Manager | High | Before application scaffolding |
| Q14 | Which GitHub organization/repository, Actions runners, branch rules, review protections, registry, secrets, and artifact-retention conventions apply? | Context G13; Technical TU-05; Architecture OQ-05 | Sponsor / Lead Engineer | High | Before Govern implementation workflow |
| Q15 | Which Rancher cluster, namespace, ingress, registry, secret, storage, probe, rollout, rollback, backup, access, and ownership capabilities are available? | Context G13/AT-4; Technical TU-04; Architecture OQ-04 | Sponsor / runtime owner | High | Before deployment epic planning |
| Q16 | Which logs, metrics, traces, alerts, retention, export, backup/restore, audit-query, and sensitive-data rules are required? | Context G14; Technical TU-08; Architecture OQ-09/OQ-10; Regulatory baseline | Lead Engineer and runtime owner | Medium | Before observability/deployment implementation |
| Q17 | What representative load, holiday-season peak, availability, RTO/RPO, and performance profile should replace provisional learning targets? | Signal complexity assumption; Context G14; Technical TU-06; Architecture OQ-10 | Sponsor and Lead Engineer | Medium | Before performance and operational acceptance |
| Q18 | Will users require calendar, HRIS, payroll, email/chat, export, or other integrations before the focused workflow is useful? | Hypothesis alternative 3; Context AB-1/integration boundaries; Technical integration assumptions | Andrei — Product Manager | Medium | Before expanding beyond MVP; validate in participant/stakeholder research |
| Q19 | Can 2–3 suitable participants be recruited, and what evidence is sufficient to keep, change, or reject the product and experience direction? | Hypothesis validation-plan assumption; persona/journey validation priority; Context AO-2 | Sponsor and Andrei — Product Manager | High | Before claiming solution validation |

### Assumption coverage audit

| Source assumption set | Covered by questions |
|---|---|
| Signal problem, workflow, complexity, impact, security, fixed-role, and one-step assumptions | Q1, Q3, Q7–Q10, Q17 |
| Journey J1 current-state and recovery assumptions | Q1–Q2 |
| Persona P1 Employee assumptions | Q2, Q13, Q19 |
| Persona P2 Manager assumptions | Q3, Q9, Q13, Q19 |
| Persona P3 HR assumptions | Q4, Q6–Q8, Q13, Q19 |
| Persona P4 Administrator assumptions | Q5, Q13, Q19 |
| Hypothesis A1–A6 and validation assumptions | Q1–Q3, Q8–Q9, Q19 |
| Context AS-1–AS-3, AT-1–AT-4, AO-1–AO-2, AB-1 and G1–G15 | Q1–Q19 |
| Domain U-01–U-11 and rules marked needs-validation | Q3–Q10, Q12 |
| Technical TU-01–TU-09 and assumed local/outbox/runtime directions | Q10–Q17 |
| Architecture OQ-01–OQ-10 and ASM items | Q3, Q5–Q17 |
| Refined Concepts 1–3 assumptions | Q2–Q3, Q5, Q7–Q12 |

## Assumptions

| # | Assumption | Risk if wrong | Validation plan | Related questions |
|---|---|---|---|---|
| A-01 | A focused leave workflow solves a meaningful Employee problem without a complete HRIS. | High — the product direction lacks value or adoption. | Interview and task-test 2–3 representative Employees; treat results as directional. | Q1, Q18, Q19 |
| A-02 | Employees benefit from pre-submit calculation/balance explanation, durable status, and recovery guidance. | High — the core experience may add complexity without clarity. | Compare concise/progressive receipt and recovery scenarios; require the 2-of-3 thresholds. | Q2 |
| A-03 | Managers need a focused queue and team context but not sensitive leave reasons. | High — decisions may lack information or expose too much. | Test decision cards and field visibility with Employee/Manager perspectives. | Q3 |
| A-04 | HR needs workforce/configuration readiness, balance correction, and business audit in MVP. | Medium — scope may overbuild administration. | Prioritize HR scenarios and remove capabilities without evidence or prerequisite value. | Q4 |
| A-05 | Administrators can access every feature safely through explicit auditable permissions. | High — broad access can defeat least privilege or role separation. | Resolve the role model in HLD and execute a complete positive/negative permission matrix. | Q5 |
| A-06 | One seeded annual-leave type and a simple full-day balance model are sufficient to prove the workflow. | Medium — calculation/accounting model may not generalize even for learning goals. | Review worked policy examples with an HR/domain representative before implementation. | Q6–Q7 |
| A-07 | Submission reserves balance and Pending/Approved counted dates do not overlap. | High — balance availability and conflict behaviour may be wrong. | Review scenarios, implement transaction spike, and retain decision as an ADR/domain rule. | Q8 |
| A-08 | Pending changes use cancel-and-resubmit; future Approved leave is self-cancellable. | Medium — lifecycle may frustrate users or complicate corrections. | Usability scenarios plus lifecycle/reversal tests before accepting R-007. | Q2, Q8 |
| A-09 | One active direct Manager is the only MVP approver. | High — missing/changed Managers can block or misroute requests. | Manager/HR scenario review; keep delegation/fallback excluded until evidenced. | Q9 |
| A-10 | In-app notification intent is sufficient for MVP and delivery may be eventual. | Medium — users may miss responsibility or outcomes. | Validate event/timing expectations and demonstrate status as source of truth. | Q10 |
| A-11 | A conventional identity provider and PostgreSQL modular-monolith design can enforce isolation and consistency. | High — security or transaction invariants may fail. | Threat model plus identity, transaction, concurrency, idempotency, and reconciliation spikes. | Q11–Q12 |
| A-12 | Current supported TypeScript tooling can be pinned compatibly and tested across an agreed modern browser matrix. | Medium — scaffold or CI incompatibility delays learning. | Compatibility matrix and minimal vertical-slice build in CI. | Q13 |
| A-13 | GitHub, a registry, and Rancher access will be available for governed deployment practice. | High — deployment learning outcome is blocked. | Confirm ownership/permissions and run a minimal build-push-deploy-probe exercise. | Q14–Q15 |
| A-14 | Provisional performance targets are meaningful for 10 Employees and holiday-season scenarios. | Medium — tests may prove irrelevant behaviour. | Define and record a reproducible load profile, then replace provisional targets with evidence. | Q17 |
| A-15 | Useful observability can exclude sensitive employee content while diagnosing workflows and jobs. | Medium — troubleshooting may be weak or telemetry may overexpose data. | Define allow-listed events and inspect one correlated deployed workflow. | Q16 |
| A-16 | Responsive desktop and phone-sized browser support and WCAG 2.2 AA targeting are appropriate. | Medium — effort may target the wrong device/accessibility needs. | Participant/device research plus automated and manual accessibility review. | Q2, Q13, Q19 |

## Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation strategy | Owner |
|---|---|---|---|---|
| Product problem and adoption remain unvalidated | High | High | Keep claims assumption-labelled; run the 2–3 participant test and revisit scope before customer-validation claims. | Andrei — Product Manager |
| Incorrect working-day or balance calculation | High | High | Date-only model, versioned evidence, worked examples, invariant/property-style tests, and HR review. | Lead Engineer and HR representative |
| Concurrent/retried commands duplicate decisions or balance effects | Medium | High | PostgreSQL transaction/uniqueness/version/idempotency design, fault injection, concurrency tests, and reconciliation. | Lead Engineer |
| Cross-organization, cross-manager, or excessive Administrator access | Medium | High | Authoritative server scope, explicit permissions, persistence constraints, threat model, and adversarial authorization matrix. | Andrei — Architect |
| Configuration changes alter historical request meaning | High | High | Effective versions or snapshots, immutable breakdown evidence, configuration audit, and historical replay tests. | Andrei — Architect and Lead Engineer |
| Unnecessary leave detail appears in UI, logs, audit, or telemetry | Medium | High | Minimized schema, allow-listed metadata, field-level response policy, fixture/log review, and negative tests. | Andrei — Product Manager and Lead Engineer |
| Real-person data enters the learning environment | Medium | High | Persistent demo notice, synthetic fixture review, resettable environments, and sharing gate. | Sponsor / Lead Engineer |
| GitHub, registry, Rancher, or observability access is unavailable | Medium | High | Confirm platform ownership before the delivery epic and retain a local vertical slice while blocked. | Sponsor / runtime owner |
| Critical flows are inaccessible or unclear | Medium | Medium | WCAG target, automated/manual checks, progressive explanation, and participant task testing. | Andrei — Product Manager |
| Scope expands into HRIS, integrations, legal automation, or AI decisioning | Medium | Medium | Enforce Out of Scope, require evidence and an explicit Flow/architecture decision for expansion. | Andrei and Sponsor |

## Dependencies

### Upstream dependencies

| Dependency | Status | Requirement before Govern |
|---|---|---|
| Routed Signal and Explore Bundle | Complete | Preserve accepted assumptions and Diverge-Converge route |
| Discovery context, market, domain, feasibility, and architecture artifacts | Complete | Keep links and update when decisions change |
| Personas, current-state journey, and stakeholder-validated hypothesis | Complete but assumption-heavy | Do not claim direct-user validation |
| Regulatory/compliance learning baseline | Complete; not legal approval | Preserve fictional-data and claim boundaries |
| Refined concept portfolio | Complete | Treat concepts as direction, not proof |
| PRD Product, Technical, and Quality groups | Approved | Group 4 and final PRD validation remain |
| Future-state IA, flows, wireframes, and accessibility specification | Complete; detailed future-state journey remains deferred | Required before affected frontend epics are Ready |
| HLD, architecture decisions, risk, test, and DevOps strategies | Complete and approved | Required before relevant implementation/deployment epics are Ready |

### Downstream dependencies

- Information architecture and detailed future-state user flows consume R-001–R-017 and the modeled states.
- Wireframes/prototypes and usability validation consume F1–F7, NFR-013–NFR-016, and Q1–Q5/Q19.
- HLD and ADRs consume the invariants, NFRs, Q5/Q7/Q11–Q17, and risk register.
- Test and DevOps strategy artifacts elaborate the approved Group 3 summaries.
- Epic forming maps the proposed epic plan below into governed backlog artifacts and Flow tasks.
- Govern implementation remains blocked until Explore completion gates and dependency-specific Definition of Ready criteria pass.

### External dependencies

| Dependency | Current need | Status/constraint | Owner |
|---|---|---|---|
| Representative Employee/Manager/HR participants | Directional problem and solution validation | 2–3 desired; availability unconfirmed | Sponsor and Andrei |
| GitHub organization/repository and Actions | Review, CI, evidence, image build | Not connected/defined | Sponsor / Lead Engineer |
| Container registry | Immutable image storage and Rancher pull | Not selected | Sponsor / runtime owner |
| Rancher/Kubernetes environment | Deployment and operational learning | Target named; capabilities/access unknown | Runtime owner |
| Identity provider | Real authentication integration | Not selected; adapter boundary required | Lead Engineer |
| Observability platform | Shared-environment telemetry | Not selected | Lead Engineer / runtime owner |
| External notification provider | Not needed for provisional MVP | Deferred until Q10 evidence requires it | Andrei / Lead Engineer |

## Epic Extraction

**Status**: Extracted into [EH-E1 through EH-E6](../epics/); Govern task breakdown has not started.

| Proposed epic | Outcome | Requirements covered | Key prerequisite | Priority |
|---|---|---|---|---|
| E1 — Secure Workforce Foundation | Authenticated fictional users can access correctly scoped profile/workforce capabilities with explicit roles | R-001, R-009, R-011, R-017 | Q5, Q11–Q13; HLD identity/permission decision | High |
| E2 — Leave Rules and Explainable Preview | HR establishes minimum leave readiness and Employees understand a server-produced date/balance preview | R-002, R-012, R-013 | Q6–Q8; calculation examples and configuration design | High |
| E3 — Tracked Employee Request | One idempotent request, receipt, balance reservation/history, and eligible cancellation remain coherent | R-003, R-004, R-007, R-008 | E1–E2; Q8; transaction/idempotency design | High |
| E4 — Manager Decision and Availability | Assigned Managers decide exactly once with minimum-necessary team context | R-005, R-006, R-015 | E1–E3; Q3/Q9; visibility and concurrency tests | High |
| E5 — HR Corrections and Audit | HR performs controlled balance corrections and authorized reviewers investigate immutable evidence | R-008, R-010, R-014 | E1–E4; audit/ledger query design | Medium |
| E6 — Notifications and Production-like Delivery | Users see workflow notification state and the complete fictional flow is built, deployed, observed, and recoverable to the tested level | R-016; NFR-001–NFR-020 across all epics | Q10, Q14–Q17; test and DevOps strategies; Rancher access | Medium |

Every epic must carry its applicable NFRs; E6 does not postpone foundational security, accessibility, testing, or observability work from earlier epics.

## Implementation Notes

### Phasing

1. **Architecture and scaffold decisions**: resolve Q5/Q11–Q15, pin supported versions, connect GitHub, prove a minimal Angular–NestJS–PostgreSQL vertical slice, and record HLD/ADRs.
2. **Secure foundation**: implement E1 using server-authoritative scope, synthetic fixtures, migrations, negative authorization tests, and basic telemetry.
3. **Rules before workflow**: implement E2 from approved worked examples; preserve per-date and historical configuration evidence.
4. **Transactional request and decision**: implement E3–E4 with real PostgreSQL concurrency/idempotency tests before adding delivery convenience.
5. **Administration and evidence**: implement E5 while preserving immutable ledgers/audit and field-level privacy.
6. **Delivery learning**: complete E6 through GitHub CI and verified Rancher capabilities; state only the operational properties actually tested.

### Technical considerations

- Prefer one deployable NestJS modular monolith and PostgreSQL transaction boundary until measured evidence justifies another topology.
- Keep leave dates separate from event instants; inject clock/time-zone decisions and avoid browser/host-local defaults.
- Store or reference immutable calculation inputs sufficiently to reproduce historical results.
- Use database constraints plus application checks for organization relationships, one decision, idempotency, and ledger uniqueness.
- Keep notification and telemetry adapters replaceable, but do not create distributed services without need.
- Introduce runtime dependencies only through an explicit supported-version and maintenance decision.

### Design considerations

- Lead with a concise receipt and reveal date/policy evidence progressively.
- Show committed workflow state and delivery state separately.
- Pair each validation/conflict/authorization failure with a safe next action without leaking record existence.
- Use role-specific navigation while keeping authorization exclusively server-authoritative.
- Design success, loading, empty, readiness, stale/conflict, rejection, cancellation, delivery-failure, and denied states before implementation.
- Keep sensitive leave reasons and health details out of the default request and team views.

## Approval & Sign-Off

| Role | Name | Date | Status |
|---|---|---|---|
| Product Manager | Andrei | 2026-08-31 | Approved |
| Tech Lead | Initiative owner / developer | 2026-08-31 | Approved |
| UX Lead | Andrei | 2026-08-31 | Approved |
| Stakeholder / Sponsor | Initiative owner / developer | 2026-08-31 | Approved |

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | 2026-08-31 | Dava.Flow with Andrei and Sponsor | Product Definition drafted and PRD-1 approved |
| 0.2 | 2026-08-31 | Dava.Flow with Andrei and Sponsor | Technical Specification drafted and PRD-2 confirmed |
| 0.3 | 2026-08-31 | Dava.Flow with Andrei and Sponsor | Quality Definition drafted and PRD-3 approved |
| 0.4 | 2026-08-31 | Dava.Flow with Andrei and Sponsor | Specification Completion drafted for PRD-4 review |
| 1.0 | 2026-08-31 | Dava.Flow with Andrei and Sponsor | All four PRD groups approved; complete PRD finalized for validation |

## Related Documentation

### Explore artifacts

- [Discovery Index](../explore-employee-hub/discovery.md)
- [Context](../explore-employee-hub/context.md)
- [Market Research](../explore-employee-hub/market-research.md)
- [Domain Analysis](../explore-employee-hub/domain-analysis.md)
- [Hypothesis](../explore-employee-hub/hypothesis.md)
- [Technical Feasibility](../explore-employee-hub/technical-feasibility.md)
- [Architecture Context](../explore-employee-hub/architecture-context.md)
- [Regulatory and Compliance Baseline](../explore-employee-hub/regulatory-compliance.md)

### Design and technical artifacts

- [Personas](../domain/personas-employee-hub.md)
- [Current-State Journey](../domain/journey-employee-hub.md)
- [Refined Concepts](../explore-employee-hub/ideation/employee-hub-refined-concepts.md)
- [Future-state flows](../domain/flows-employee-hub.md), [wireframes](../design/wireframes-employee-hub.md), [HLD](../hlds/employee-hub-hld.md), [ADRs](../decisions/), [test strategy](../explore-employee-hub/test-strategy.md), and [DevOps strategy](../explore-employee-hub/devops-strategy.md): complete. The detailed future-state journey remains deferred.

### Implementation artifacts

- Epics: proposed above; no epic files extracted yet.
- Flow tasks: no implementation tasks created from this PRD yet.

**Slug**: `employee-hub`  
**Domain**: Leave Request  
**Last Updated**: 2026-08-31  
**Status**: Reviewed — all PRD approval gates passed
