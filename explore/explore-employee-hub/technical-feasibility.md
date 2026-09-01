+++
template_name = "Technical Feasibility and Trends Template"
version = "1.0"
output_format = "explore/explore-employee-hub/technical-feasibility.md"
validation_required = true
+++

# Technical Feasibility and Trends: Employee Hub

**Project**: Employee Hub  
**Created**: 2026-08-28  
**Last Updated**: 2026-08-28  
**Status**: Complete — ready for engineering validation  
**Review owner**: Sponsor — Lead Engineer  
**Scope note**: Greenfield learning project; no application, environment, provider, or production data exists yet.  

---

## 1. System Context

### Existing Platforms

There are no inherited production platforms or legacy applications. The following are planned components, not active deployed systems.

| Platform | Purpose | Version | Status | Owner | Constraints |
|---|---|---|---|---|---|
| Angular Web App | Role-scoped employee, manager, HR, and administrator browser interface | Not pinned | Planned | Sponsor — Lead Engineer | Must remain a separate application; mobile responsiveness required; no native app scope |
| NestJS API | Modular-monolith HTTP API and domain boundary | Not pinned | Planned | Sponsor — Lead Engineer | Must enforce server-side authorization, organization scope, transactions, and audit events |
| PostgreSQL | System of record for configuration, transactions, outbox, and audit history | Not pinned | Planned | Sponsor — Lead Engineer | Must support scoped persistence, migrations, transaction isolation, and recovery |
| Background Processor | Claims outbox records and delivers notifications | Not selected as separate topology | Planned | Sponsor — Lead Engineer | Must not change committed business outcomes; retries must be idempotent |
| Rancher-managed Runtime | Kubernetes deployment target | Cluster details not supplied | Planned | Runtime owner not identified | Namespace, ingress, secrets, registry, and rollout access are unknown |

### Dependencies

| Dependency | Purpose | Version | Criticality | Update frequency | Constraint |
|---|---|---|---|---|---|
| Node.js LTS | Frontend and backend runtime | Current LTS to be pinned | Critical | LTS/security cadence | Exact major must be pinned in repository and CI before scaffolding |
| npm | Package management and scripts | Current compatible version to be pinned | High | Node release cadence | Lockfile must be committed and reproducible |
| Angular | Browser application framework | Current supported version to be pinned | High | Framework release cadence | Testing uses Vitest/jsdom per selected direction |
| NestJS | Backend framework | Current compatible version to be pinned | High | Framework release cadence | Version must align with chosen Node and TypeScript versions |
| PostgreSQL | Relational database | Current supported major to be pinned | Critical | Major/minor security cadence | Requires migration, backup, and transaction strategy |
| Docker | Local reproducible environment and image build | Version not selected | High | Tooling cadence | Local daemon and Rancher build/runtime expectations require confirmation |
| GitHub | Future repository, review, CI, and security automation | Organization/repository not connected | High | SaaS-managed | Actions, branch protection, registry, and secrets process are unknown |

### Integrations

| System | Purpose | Integration method | Data flow | Owner | SLA | Constraint |
|---|---|---|---|---|---|---|
| Authentication provider | Establish identity and issue/validate credentials | Provider and protocol open; OIDC is a candidate, not a decision | Inbound identity claims | Not identified | Not defined | API owns authorization regardless of provider |
| Notification provider | Deliver request and decision messages | Provider/channel open | Outbound asynchronous | Not identified | Not defined | Delivery failure cannot roll back a decision |
| Container registry | Store versioned images | Registry open | Outbound from CI; inbound to Rancher | Not identified | Not defined | Image access and retention policy unknown |
| Observability stack | Receive sanitized logs, metrics, traces, and alerts | Tooling open | Outbound telemetry | Not identified | Not defined | Employee and sensitive operational data must be excluded or minimized |
| Calendar, HRIS, payroll, collaboration tools | Future interoperability | Deferred | None for MVP | Future | Not applicable | No MVP dependency or product promise |

### Technology Stack

**Frontend**

- Framework: Angular, TypeScript
- Tests: Vitest with jsdom
- Package manager: npm
- State management, styling, component library, build configuration, and exact version: not selected

**Backend**

- Runtime and language: Node.js LTS, TypeScript
- Framework: NestJS modular monolith
- Tests: Jest and Supertest
- API style: HTTP/REST is the working direction; contract/versioning approach is open
- Authentication: provider open; API-owned fixed-role authorization is mandatory
- ORM, migrations, transaction library, and job mechanism: not selected

**Database**

- Primary: PostgreSQL
- Cache: none proposed for MVP
- Search: none proposed for MVP
- Async processing: PostgreSQL-backed outbox/job pattern is the working direction `[NEEDS VALIDATION]`

**Infrastructure**

- Local development: Docker-based environment is assumed `[NEEDS VALIDATION]`
- Deployment: Rancher/Kubernetes target
- CI/CD: GitHub direction; workflow and runner details open
- Monitoring: logging, metrics, tracing, and alerting tooling open

### Deployment Context

| Environment | Purpose | Current status | Required future capability |
|---|---|---|---|
| Local development | Developer feedback and fictional-data workflow | Available only as an intention; no app or compose definition exists | Reproducible containers, migrations, seed data, tests |
| Test/CI | Automated validation and image build | Not provisioned | GitHub Actions or equivalent, secrets isolation, test database, artifacts |
| Staging | Integrated pre-production review | Not provisioned | Rancher namespace, ingress, image promotion, fictional data only |
| Production-like learning environment | Deployment and observability practice | Not provisioned | Rollout/rollback, backup/restore test, telemetry, alerting, access control |

Deployment frequency, approval process, zero-downtime expectation, rollback procedure, and recovery objectives are not defined. They are engineering decisions, not assumed capabilities.

---

## 2. Data Realities

### Data Availability

| Data type | Source | Quality | Latency | Owner | Availability | Access method |
|---|---|---|---|---|---|---|
| Fictional employee and organization seed data | Project fixtures | High for intended test scenarios; not representative | Local/transactional | Sponsor — Lead Engineer | On demand | Database fixtures/seeding |
| Workforce structure | HR/configuration UI in future app | Unknown until entered | Intended synchronous read | Future HR role | Application availability | API/database |
| Policies, schedules, and holidays | HR/configuration UI in future app | Unknown until validated | Intended synchronous read | Future HR role | Application availability | API/database |
| Requests, decisions, transactions, audits | Employee Hub API | High if invariants hold | Intended synchronous commit | System of record | Application availability | API/database |
| Day breakdown and balance projection | Deterministic derivation from committed data | High only when inputs/versioning are correct | Calculated in command/read path | System | Application availability | API/database |
| Authentication identity | Future identity provider | Unknown | Provider-dependent | Provider owner | Provider-dependent | Token/claims |
| Notification delivery outcome | Future provider | Provider-dependent | Eventual; seconds to minutes expected but uncommitted | Provider owner | Provider-dependent | Worker/provider API |

### Data Quality Issues

| Issue | Affected data | UX impact | Workaround and resolution |
|---|---|---|---|
| No production source data exists | All domain data | Cannot infer real policy, role, or volume patterns | Use fictional fixtures; validate with representative research before real-use claims |
| Manager/team relationships may be incomplete | Employee, Team | Request can lack an approver or visibility may be wrong | Show configuration readiness errors; require steward correction |
| Policies, schedules, and holiday calendars may conflict | Configuration and calculations | Incorrect working days or balances | Effective-date validation; test fixtures; domain-expert review |
| External identity claims are unknown | User Account, Role Assignment | Login/account linking cannot be designed conclusively | Select provider and define claim mapping before implementation |
| Notification reliability is unknown | Notification | Users may not see an update promptly | Show application status as source of truth; record delivery outcome and retry |

### Data Latency and UX Implications

- **Synchronous target**: request status, decision outcome, balance, day breakdown, and audit acknowledgement should be returned from the committed API transaction.
- **Eventual**: notification delivery, observability export, and any future integration synchronization.
- **No batch dependency**: the MVP should not require hourly/daily feeds to calculate or approve leave.
- **Historical**: immutable audit and transaction records remain queryable through pagination; retention period is not defined.

UX must distinguish “decision committed” from “message delivered,” prevent submission before mandatory configuration exists, display a fresh server calculation before decision, and avoid presenting stale or missing configuration as authoritative.

### Data Ownership and Gaps

| Data or decision | Provisional owner | Restriction or gap |
|---|---|---|
| Fictional seed data and schema | Sponsor — Lead Engineer | Real employee data is prohibited |
| Workforce, policy, schedule, calendar configuration | Future HR role | HR domain representative has not validated required fields or rules |
| Access roles and organization settings | Future Administrator role | Identity-provider mapping and access-review policy are open |
| Domain transaction and audit records | Employee Hub system | Retention, export, and recovery requirements are open |
| External identity and delivery data | Future provider | Provider, SLA, data-processing conditions, and failure handling are open |

Key gaps are an authentication provider, notification provider, launch-country policy rules, representative users, expected scale, browser/accessibility expectations, deployment access, backup/recovery objectives, and observability tooling.

---

## 3. Technical Constraints

### Authentication and Authorization

- **MUST**: The API establishes authorization from authenticated identity, active role assignments, and authoritative organization scope. Client-supplied organization IDs or UI visibility cannot grant access.
- **MUST**: Fixed roles are Employee, Manager, HR, and Administrator; permissions are server-enforced and minimum necessary.
- **MUST**: Identity-provider choice remains separate from domain authorization.
- **OPEN**: Authentication protocol, session duration, token storage, account invitation, recovery, and account-to-employee linking.

### Performance and Scale

No throughput, concurrency, availability, geographic, or data-volume target has been supplied. The following are design budgets to validate, not contractual SLOs:

| Interaction | Provisional target | Constraint |
|---|---|---|
| Read current balance, team availability, or request list | p95 under 500 ms in a representative learning environment | Must be measured after implementation |
| Submit, approve, reject, or cancel | p95 under 1 second excluding notification delivery | Must commit atomically; never trade correctness for speed |
| Notification attempt | Eventual processing; no target committed | Delivery provider and retry policy are open |
| List rendering | Server pagination with a default maximum of 50 records | Avoid unbounded employee, request, or audit tables |

### Offline, Devices, and Connectivity

- **MUST**: Commands require connectivity and a committed server response. No offline command queue or conflict synchronization is in MVP scope.
- **SHOULD**: Provide responsive browser support for desktop and phone-sized screens; tablet support follows responsive layout rather than a separate app.
- **SHOULD**: Support current evergreen Chrome, Edge, Firefox, and Safari versions; exact baseline requires engineering confirmation.
- **SHOULD**: Treat keyboard, mouse, and touch as supported input methods. Camera, GPS, sensors, voice input, and native device capabilities are out of scope.
- **COULD**: Permit a local unsaved draft only if it stores no sensitive data and cannot be mistaken for a submitted request.

### API and Integration

- **MUST**: JSON over HTTPS outside local development; UTF-8; structured validation and authorization errors; no sensitive details in error responses.
- **MUST**: State-changing commands use transaction boundaries, an expected version or equivalent concurrency control, and an idempotency strategy.
- **SHOULD**: Use a documented REST contract and version policy before external consumers exist.
- **OPEN**: Authentication API, notification provider protocol/rate limits, registry, observability endpoint, and any external integration SLA.

### Security and Legacy

- **MUST**: Least privilege, organization isolation, audit of sensitive actions, secret management, secure transport outside local development, and fictional data only.
- **MUST**: Minimize leave reasons and prevent sensitive health details from being a default input or broad team-visible field.
- **SHOULD**: Use OWASP ASVS as a verification baseline, as recorded in [Market Research](market-research.md#regulatory--compliance-context).
- **OPEN**: Encryption-at-rest ownership, key management, log retention, backup/restore, access review frequency, and formal compliance requirements.
- **Legacy systems**: None. There is no migration or retirement constraint.

---

## 4. Technical Opportunities

| Category | Opportunity | Feasibility | Effort | Impact | Dependencies | Priority |
|---|---|---|---|---|---|---|
| Automation | Calculate request-day breakdown, reserve/use/release balance, and append audit event in one transaction | High | Medium | High | Chosen data/migration/transaction approach | MVP |
| Automation | Validate configuration readiness before request submission | High | Small | High | Policy, schedule, holiday, manager data | MVP |
| Automation | Durable notification intent with retry and delivery outcome | High | Medium | Medium | Outbox/job pattern; notification provider | MVP |
| Personalization | Role-specific dashboards and scoped navigation | High | Small | High | Fixed roles and server authorization | MVP |
| Instrumentation | Sanitized workflow/audit events and operational metrics | Medium | Medium | Medium | Event schema and observability destination | MVP foundation |
| Real-time | Refresh status after an action; add polling/SSE only with evidence | High for refresh; medium for push | Small then medium | Medium | API freshness contract; load evidence | Later |
| Progressive enhancement | Responsive layout, semantic controls, keyboard flow, reduced-motion-friendly UI | High | Medium | High | Angular UI decisions and accessibility checks | MVP |
| AI assistance | Policy Q&A or guided request entry with deterministic validation | Medium | Large | Medium | Validated policy source, privacy/security review, UX evidence | Later |
| AI decisioning | Approval or staffing recommendations | Low for MVP | Large | Low | Representative data, bias controls, legal assessment, human oversight | Excluded |

The MVP should prioritize deterministic automation and clear status over AI, prediction, or live-update complexity.

---

## 5. Technical Risks and Unknowns

### Technical Risks

| ID | Risk | Likelihood | Impact | Mitigation, detection, and response | Owner | Status |
|---|---|---|---|---|---|---|
| TR-01 | Cross-organization data exposure | Medium | High | Central scope resolution; persistence constraints; negative authorization tests; alert/audit denied access; halt and investigate exposure | Lead Engineer + Architect | Open |
| TR-02 | Concurrent or retried request command duplicates balance effect | Medium | High | Transaction, unique decision constraint, version/idempotency key, reconciliation tests; return conflict on stale command | Lead Engineer | Open |
| TR-03 | Incorrect date/holiday/schedule calculation | High | High | Date-only model, breakdown evidence, worked examples, property tests; block release on invariant failure | Lead Engineer + HR representative | Open |
| TR-04 | Configuration change alters historical interpretation | Medium | High | Effective versions/snapshots; audit configuration; test change scenarios | Architect + Lead Engineer | Open |
| TR-05 | Identity provider or role mapping is insecure/incomplete | Medium | High | Decide protocol/claims, threat model, integration tests; disable access until mapping is valid | Lead Engineer | Open |
| TR-06 | CI/deployment/observability gap delays real-environment learning | Medium | High | Establish GitHub/Rancher/registry/telemetry ownership before deployment increment | Sponsor — Lead Engineer | Open |
| TR-07 | Notification failure is mistaken for workflow failure | Medium | Medium | Separate business status and delivery status; durable retries; visible in-app status | Lead Engineer | Open |
| TR-08 | Scope expands into integrations, AI, or HRIS features | Medium | Medium | Keep exclusions explicit; require evidence and decision record for expansion | Andrei + Sponsor | Open |

### Technical Unknowns

| ID | Unknown | Why it matters | Resolution | Owner | Deadline | Priority |
|---|---|---|---|---|---|---|
| TU-01 | Identity provider, protocol, token/session model | Authentication and account linking depend on it | Select provider and write a threat-model decision | Lead Engineer | Before implementation | High |
| TU-02 | ORM, migration, transaction, locking, and idempotency approach | Must prove balance and audit invariants | Small spike with PostgreSQL concurrent-command tests | Lead Engineer | Before solution design | High |
| TU-03 | Exact runtime/framework/database/tool versions | Reproducible builds and security updates require pinning | Select compatible supported versions in scaffold decision | Lead Engineer | Before scaffolding | High |
| TU-04 | Rancher environment and deployment permissions | Determines deployability, secrets, ingress, rollback, and recovery | Obtain platform context from runtime owner | Sponsor — Lead Engineer | Before deployment work | High |
| TU-05 | GitHub organization, Actions, registry, secrets, branch protection | Determines review and CI workflow | Connect repository and configure governance | Sponsor — Lead Engineer | Before implementation workflow | High |
| TU-06 | Expected scale and performance targets | Guides pagination, indexes, SLOs, and rollout confidence | Define learning-load scenario and measure | Andrei + Lead Engineer | Before performance acceptance | Medium |
| TU-07 | Notification provider, channels, rate limits, and delivery expectations | Determines job/retry design and UX | Select after personas/journeys | Andrei + Lead Engineer | Before notification implementation | Medium |
| TU-08 | Observability stack and sensitive-data policy | Needed for operability without leakage | Select tooling and event schema | Lead Engineer | Before deployment work | Medium |
| TU-09 | Browser, device, and accessibility baseline | Needed for test matrix and UI design | Product/engineering decision with user evidence | Andrei + Lead Engineer | Before frontend implementation | Medium |

### Technical Debt and Scalability

No inherited code debt exists. Avoidable debt includes unpinned versions, ad hoc migrations, authorization only in the UI, direct mutable balance edits, missing idempotency, and deployment without observability or restore testing.

| Concern | Potential bottleneck | Mitigation |
|---|---|---|
| Balance contention | Many commands for one employee/type/period contend on one balance | Keep transactions short; lock or use compare-and-swap deliberately; measure before adding distributed mechanisms |
| Audit growth | Immutable history grows without bound | Paginate, index by organization/subject/time, define retention later |
| Notification retries | Provider failures create duplicate deliveries or backlog | Idempotency key, bounded retries, visible failed state, dead-letter policy later |
| List queries | Employee/request/audit tables grow | Server filters, pagination, appropriate scoped indexes |
| Multiple workers | Outbox rows may be claimed twice | Atomic claim strategy and idempotent handlers |

### Integration Risks

| Integration | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Identity provider | Medium | High | Select early; document claims, roles, account-linking, logout, and failure behavior |
| Notification provider | Medium | Medium | Use adapter and durable intent; treat provider response as delivery evidence only |
| GitHub/CI/registry | Medium | High | Connect before workflow work; validate pull/build/push permissions with a minimal pipeline |
| Rancher runtime | Medium | High | Confirm platform prerequisites, deployment ownership, ingress, secrets, probes, rollback, and backup before environment-dependent claims |
| Future calendar/HRIS/payroll | High if introduced early | Medium | Keep out of MVP; define stable domain boundaries first |

---

## 6. Design Constraints and Guardrails

### Must Constraints

1. **Server-authoritative workflow**
   - Rationale: Balances, decisions, and authorization are sensitive and concurrent.
   - Impact: A browser preview is advisory; submit/approve/cancel success appears only after committed API response.
   - Validation: Command/integration tests prove transaction and authorization behavior.

2. **Organization and role scope on every data access**
   - Rationale: Sensitive employee data and multi-tenant design.
   - Impact: Screens, lists, deep links, and APIs cannot expose out-of-scope data.
   - Validation: Negative authorization tests and review of query boundaries.

3. **Explainable calendar-date calculation**
   - Rationale: Working-day calculation is a highest-risk domain rule.
   - Impact: Show included/excluded dates and balance effect; do not silently use UTC timestamp logic.
   - Validation: Worked examples, deterministic test cases, and reconciliation with stored breakdown.

4. **No default collection of sensitive leave detail**
   - Rationale: Data minimization and manager visibility risk.
   - Impact: Reason/document fields are omitted unless later validated with authority and safeguards.
   - Validation: API schema/UI review and access tests.

5. **No optimistic mutation for critical commands**
   - Rationale: A stale or duplicate decision can corrupt user trust.
   - Impact: Disable duplicate submission, show progress, refresh on conflict, and present committed result.
   - Validation: Concurrency and retry tests.

### Should Constraints

1. **Responsive, keyboard-accessible web UX**: preserve usability across desktop and phone layouts. Challenge only if representative device evidence supports a narrower baseline.
2. **Server-paginated lists and scoped filters**: prevent unbounded data transfer. Challenge only with measured small-data evidence and no privacy downside.
3. **Clear configuration-readiness messaging**: direct an employee to the right administrator/support path instead of allowing a misleading failed request.
4. **Eventual notification transparency**: show committed request status independently from delivery outcome.
5. **Provisional performance budgets**: use them to prevent regressions, then replace with measured requirements once load/environment evidence exists.

### Performance and Data Guardrails

| Guardrail | Provisional target | Maximum acceptable until formal SLOs exist | Measurement |
|---|---|---|---|
| Initial application shell on representative broadband | Under 3 seconds | Under 5 seconds | Lighthouse and browser measurement |
| Time to usable primary form | Under 3 seconds | Under 5 seconds | Browser measurement |
| Standard scoped read | p95 under 500 ms | p95 under 1 second | API timing/telemetry |
| Critical command commit | p95 under 1 second | p95 under 2 seconds | API timing plus transaction tests |
| List page size | 25–50 records | 50 records by default | API contract/UI test |

- Require server pagination for employee, request, balance-history, and audit lists.
- Cache only non-sensitive static assets by default; refresh server state after critical commands.
- Never persist employee data to a browser offline store in the MVP.
- Display a clear empty/configuration-needed state rather than a fabricated zero or success state.

### Interaction, Accessibility, and Device Guardrails

- Debounce text search only when introduced; 250–300 ms is a proposed baseline.
- Use a visible loading state and prevent duplicate state-changing submissions.
- Preserve safe form input after server-side validation failure; do not preserve sensitive future fields by default.
- Announce dynamic validation/errors to assistive technology; use semantic controls, labels, logical focus, visible focus, no keyboard traps, and readable error text.
- Use a 4.5:1 text contrast target and at least 44 × 44 CSS-pixel touch targets as design baselines.
- Design responsively from 320 CSS pixels upward with layout changes around 768 and 1024 pixels; exact browser/device support is still open.
- No camera, GPS, sensor, voice, native-mobile, or offline requirement exists.

---

## 7. Questions for Engineering

### High Priority

| ID | Question | Why it matters | Owner |
|---|---|---|---|
| EQ-01 | Which identity provider and OIDC/token/session model will establish identity, and which claims map to User Account and organization? | Blocks authentication, account linking, logout, and threat model | Lead Engineer |
| EQ-02 | Which ORM/migration tool and PostgreSQL transaction/concurrency pattern can prove one decision and one balance effect under retries? | Blocks the highest-risk correctness invariant | Lead Engineer |
| EQ-03 | Which exact supported Node, Angular, NestJS, TypeScript, PostgreSQL, Docker, Vitest, Jest, and Supertest versions will be pinned? | Blocks reproducible scaffold, CI, and security maintenance | Lead Engineer |
| EQ-04 | What Rancher cluster, namespace, ingress, image registry, secret, probe, rollout, rollback, backup, and access capabilities are available? | Blocks any credible deployment design | Sponsor — Lead Engineer / runtime owner |
| EQ-05 | Which GitHub organization, repository, Actions runner, registry, branch protection, secret, and review conventions will be used? | Blocks governed CI/CD and GitHub integration | Sponsor — Lead Engineer |
| EQ-06 | How will effective policy/schedule/calendar versions be stored and replayed for historical request calculation? | Blocks auditability and rule correctness | Lead Engineer + Architect |

### Data and Performance Questions

| ID | Question | Why it matters | Priority |
|---|---|---|---|
| EQ-07 | What learning-load scenario should be used for employee count, teams, policies, requests, concurrent approvals, and audit volume? | Determines indexes, pagination, and meaningful performance tests | Medium |
| EQ-08 | Which balance operations require row locking versus optimistic versions, and how will conflicts be surfaced? | Determines UX and transaction design | High |
| EQ-09 | What retention, export, backup, restore, and audit-query expectations apply to fictional learning data and later real data? | Determines schema, operations, and privacy design | Medium |
| EQ-10 | What current-browser and accessibility baseline will the frontend test matrix support? | Determines UI guardrails and automation | Medium |

### Integration and Delivery Questions

| ID | Question | Why it matters | Priority |
|---|---|---|---|
| EQ-11 | Which notification channels are required, what provider limits apply, and what delivery latency/failure behavior is acceptable? | Determines adapter, job, retry, and UI status design | Medium |
| EQ-12 | Which logs, metrics, traces, audit views, and alerts are required, and how is sensitive data prevented from leaving the system? | Determines operability and safe instrumentation | Medium |
| EQ-13 | When should calendar, HRIS, payroll, or collaboration integrations be evaluated, and what stable domain events/exports would they need? | Prevents premature coupling while preserving future options | Low |

### Timeline and Scope Questions

| ID | Question | Why it matters | Priority |
|---|---|---|---|
| EQ-14 | Which high-priority domain assumptions must be resolved before implementation, and which can remain explicit scope limitations? | Prevents building on silent product decisions | High |
| EQ-15 | What must be demonstrated in a Rancher environment for the learning outcome: deployment only, rollback, observability, backup/restore, or all? | Determines release scope and environment dependencies | High |
| EQ-16 | What approval evidence is required before enabling real data or publishing a compliance statement? | Prevents unsafe scope expansion | High |

---

## Related Artifacts

- [Context](context.md)
- [Domain Analysis](domain-analysis.md)
- [Market Research](market-research.md)
- [Shared Glossary](../glossary.md)
- [Explore Bundle](explore-bundle.md)

---

**Last Updated**: 2026-08-28  
**Status**: Complete — ready for engineering validation  
**Engineering Review Date**: 2026-08-28 (document completeness review)  
**Reviewed By**: Sponsor — Lead Engineer  
