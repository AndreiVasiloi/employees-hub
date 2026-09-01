# Context: Employee Hub

**Signal:** [20260827-employee-hub-leave-management](../../signal/signals/20260827-employee-hub-leave-management.md)  
**Phase:** Discovery — Context Capture and Signal Enrichment  
**Created:** 2026-08-28  
**Status:** Complete

## Problem Statement

**Reframed from Signal:**

Employees may lack a consistent way to understand leave balances, submit requests, track status, or know when cancellation is allowed. Managers may lack a reliable view of pending requests, approval context, and team availability. HR and administrators may need to coordinate employee data, policies, holidays, access, and audit history through fragmented processes. These pain points are supported by broader industry evidence but remain unvalidated for a specific Employee Hub user group.

The underlying difficulty is not merely request submission. Leave decisions depend on consistent policy interpretation, working-day calculations, balance updates, organization boundaries, authorization, concurrency control, and traceable changes. Spreadsheet, email, and chat-based workflows may not enforce those rules consistently or provide a shared audit trail.

Success means demonstrating an evidence-traceable workflow in which an employee submits and tracks leave, a manager decides it, calculations remain consistent, unauthorized access is rejected, concurrent actions preserve balances, changes are audited, tests cover the workflow, and the application can be deployed and observed.

**Root cause:** Leave information, decisions, and business rules are fragmented across inconsistent processes without a shared, enforceable source of truth.

**Impact:** If the assumptions are correct, fragmentation creates administrative effort, unclear ownership, inconsistent balances, delayed decisions, and sensitive-data access risks. The size of that impact is not yet quantified.

**Desired outcome:** Validate and specify a bounded leave-management workflow whose core calculations, authorization boundaries, approval transitions, and audit behavior are explicit and testable.

## Scope & Boundaries

### In Scope

**Core platform:**

- Angular frontend and modular NestJS backend as separate applications in one repository.
- PostgreSQL relational model for organization-scoped employee, team, policy, holiday, request, balance, notification, and audit data.
- Authentication boundary and fixed-role authorization for Employee, Manager, HR, and Administrator.
- One manager approval step and a simple leave-policy model.
- Working-day and balance calculations, transaction safety, concurrency protection, and audit history.

**User capabilities:**

- Employee information, balance, request submission, status, cancellation eligibility, and notifications.
- Manager direct reports, pending requests, approval/rejection, and team availability.
- HR employee/team, leave-type, policy, holiday, history, and audit administration.
- Administrator organization configuration, high-level access, and security-activity review.
- Static frontend-managed translations.

**Engineering and infrastructure:**

- Fictional seed data only.
- Unit, integration, API end-to-end, browser, authorization, and concurrency tests.
- Docker-based local environment, CI/CD, Rancher deployment, configuration management, and observability.
- Governed AI-assisted development with human review and traceability.

### Out of Scope

- Payroll, recruitment, performance management, and complete HRIS capabilities.
- Formal legal or jurisdictional compliance claims.
- Dynamic roles and configurable or multi-step approval workflows.
- Database-managed translations and native mobile applications.
- Production employee data.
- Multiple organizations in the initial local runtime, while preserving organization boundaries in design.

### Boundary Conditions

**Integration boundaries:**

- Notification intent and delivery status belong to Employee Hub; channels and external provider remain undecided.
- Identity provider selection remains open; identity establishment is separate from domain authorization.
- Public holidays are managed internally initially; no external calendar integration is selected.
- Delivery depends on a future GitHub/CI provider, container registry, and Rancher-managed runtime.
- Observability tools are undecided and must avoid exposing sensitive employee data.

**Ownership boundaries:**

- The project owns frontend, backend, schema, tests, containers, and deployment configuration.
- Andrei owns Product and Architecture approvals.
- The initiative owner/developer owns engineering execution, sponsor decisions, tooling, and risk acceptance.
- External providers own delivery mechanisms only after explicit selection.

## Domain Model

### Core Entities

| Entity | Description | Key Attributes | Relationships |
|--------|-------------|----------------|---------------|
| Organization | Tenant and configuration boundary | `id`, `name`, `defaultTimeZone`, `status` | Owns all organization-scoped records |
| UserAccount | Authentication identity | `id`, `organizationId`, `email`, `status` | Links to Employee and RoleAssignment |
| Employee | Worker profile | `id`, `organizationId`, `userAccountId`, `teamId`, `managerId`, `status` | Belongs to Organization and Team; may report to Employee |
| RoleAssignment | Fixed access role | `userAccountId`, `role` | Assigns Employee, Manager, HR, or Administrator |
| Team | Organizational grouping | `id`, `organizationId`, `name`, `managerId` | Contains Employees |
| LeaveType | Leave category | `id`, `organizationId`, `code`, `name`, `unit`, `active` | Referenced by policy, balance, and request |
| LeavePolicy | Rules for a leave type | `id`, `organizationId`, `leaveTypeId`, `entitlement`, `carryOverRule`, `activeFrom` | Governs balance and request validation |
| LeaveBalance | Current balance projection | `employeeId`, `leaveTypeId`, `period`, `available`, `reserved`, `used`, `version` | Derived from BalanceTransactions |
| BalanceTransaction | Immutable balance change | `id`, `balanceId`, `type`, `amount`, `requestId`, `reason`, `createdBy` | Changes or explains LeaveBalance |
| LeaveRequest | Leave period and lifecycle | `id`, `organizationId`, `employeeId`, `leaveTypeId`, `startDate`, `endDate`, `workingDays`, `status`, `version` | Has at most one ApprovalDecision in MVP |
| ApprovalDecision | Manager decision record | `id`, `requestId`, `approverId`, `decision`, `reason`, `decidedAt` | Belongs to LeaveRequest |
| PublicHoliday | Non-working calendar date | `id`, `organizationId`, `date`, `name` | Used in working-day calculation |
| Notification | Delivery intent and outcome | `id`, `organizationId`, `recipientId`, `type`, `status`, `channel` | May reference LeaveRequest |
| AuditEvent | Immutable business/security history | `id`, `organizationId`, `actorId`, `action`, `subjectType`, `subjectId`, `occurredAt`, `metadata` | References affected domain record |

### Entity Relationships

```text
Organization 1 ──< UserAccount, Employee, Team, LeaveType, LeavePolicy,
                  PublicHoliday, LeaveRequest, Notification, AuditEvent
Employee many ──> 1 Team
Employee many ──> 0..1 Manager (Employee)
UserAccount 1 ──< RoleAssignment
Employee 1 ──< LeaveBalance >── 1 LeaveType
LeaveBalance 1 ──< BalanceTransaction
Employee 1 ──< LeaveRequest >── 1 LeaveType
LeaveRequest 1 ── 0..1 ApprovalDecision
LeaveRequest 1 ──< BalanceTransaction, Notification, AuditEvent
```

### Initial Business Rules

- Every tenant-owned record is scoped to one organization.
- Fixed roles are Employee, Manager, HR, and Administrator.
- An employee has at most one manager in the MVP.
- A leave request has one employee, one leave type, and one inclusive date range.
- Working days exclude configured weekends and public holidays; exact rules remain open.
- Approval and balance mutation occur atomically.
- Balance adjustments create immutable transactions.
- Concurrent mutations require versioning and transactional protection.
- Cancellation behavior depends on request status and reverses applicable balance effects.
- Important state, balance, access, and configuration changes create audit events.
- Leave periods use calendar dates; event timestamps are interpreted through organization time-zone rules.

## System Map

### Integration Architecture

| Component | Role | Technology/status | Integrates With | Data Flow |
|-----------|------|-------------------|-----------------|-----------|
| Angular Web App | Browser UI for all roles | Angular, TypeScript | API, authentication boundary | Sends authenticated requests and renders scoped responses |
| NestJS API | Modular monolith and domain boundary | NestJS, TypeScript, Node.js LTS | Web app, PostgreSQL, auth, worker, observability | Enforces authorization/rules, executes transactions, emits audit and notification intents |
| Authentication Adapter | Establishes identity | Provider open | Web app, API | Issues or validates credentials; API owns authorization |
| PostgreSQL | System of record | Supported version to be pinned | API, worker | Stores scoped domain data, transactions, intents, and audit events |
| Background Processor | Deferred work | NestJS process/module; topology open | PostgreSQL/outbox, notifications, observability | Claims jobs, retries, sends, records outcomes |
| Notification Adapter | Message delivery | Provider/channel open | Worker, external provider | Translates intents and records delivery status |
| CI Pipeline | Validation and packaging | Provider open | GitHub, npm, tests, registry | Builds, tests, scans, and publishes images |
| Container Registry | Image storage | Provider open | CI, Rancher runtime | Stores and distributes immutable images |
| Rancher-managed Runtime | Deployment and operation | Rancher/Kubernetes target | Registry, app workloads, observability | Runs versioned workloads and supplies configuration |
| Observability Stack | Logs, metrics, traces, alerts | Tooling open | Frontend, API, worker, runtime | Collects sanitized operational signals |

### Data Flows

**Build and delivery:**

```text
GitHub source
  → npm install/build/lint/test/security checks
  → frontend and backend container images
  → versioned container registry
  → Rancher-managed deployment
  → smoke checks and operational verification
```

**Runtime request:**

```text
User → Angular Web App → Authentication boundary → NestJS API
                                                  → authorization and tenant checks
                                                  → domain rules and transaction
                                                  → PostgreSQL
                                                  → audit event
                                                  → notification intent
```

**Deferred work:**

```text
PostgreSQL outbox → Background Processor → Notification Adapter
                  → External provider → Persist result → Emit telemetry
```

### Critical Dependencies

- PostgreSQL unavailability blocks persistent operations.
- Authentication unavailability blocks protected access or new sessions.
- Organization-scope enforcement must fail closed.
- Worker/provider outages delay notifications without rolling back leave decisions.
- Registry/Rancher outages block delivery but need not stop healthy running workloads.
- Observability outages reduce incident detection and diagnosis.
- GitHub/CI outages block new delivery, not runtime operation.
- Incorrect calendar/time-zone configuration can corrupt calculations.

## Technical Constraints

| Constraint | Source | Status | Impact | Notes |
|------------|--------|--------|--------|-------|
| Angular frontend | Sponsor | Confirmed | High | Version pinned at scaffolding |
| NestJS modular monolith with TypeScript | Initiative | Confirmed | High | Explicit module boundaries |
| Node.js latest LTS | Sponsor | Confirmed | Medium | Pin in tooling and CI |
| PostgreSQL primary database | Initiative | Confirmed | High | Pin supported major version |
| Separate frontend/backend applications in one repository | Initiative | Confirmed | Medium | Shared automation, separate runtimes |
| npm | Sponsor | Confirmed | Medium | Lockfiles required |
| Rancher deployment target | Sponsor | Confirmed | High | Cluster ownership open |
| Fictional employee data only | Initiative | Confirmed | High | Real personal data prohibited |
| Organization-scoped API and persistence | Security requirement | Confirmed | High | Design from the start |
| Fixed roles | Initiative | Confirmed | High | Employee, Manager, HR, Administrator |
| One manager approval step | Initiative | Confirmed | High | Dynamic/multi-step excluded |
| Simple leave-policy model | Initiative | Confirmed | High | Details remain open |
| Static frontend translations | Initiative | Confirmed | Low | Database-managed translation deferred |
| Transactional balance updates | Signal risk | Assumed | High | Strategy requires feasibility validation |
| Optimistic versioning | System-map judgment | Assumed | Medium | Compare with locking alternatives |
| Calendar-date leave periods | Domain judgment | Assumed | High | Avoid timestamp semantics for date ranges |
| Organization time zone governs event interpretation | Domain judgment | Assumed | High | Multi-office support open |
| PostgreSQL-backed outbox/jobs | System-map judgment | Assumed | Medium | Queue choice remains open |
| Docker-based local environment | Tooling recommendation | Assumed | Medium | Confirm at scaffolding |
| Authentication provider | Discovery gap | Open | High | Separate identity and domain authorization |
| Notification provider/channels | Discovery gap | Open | Medium | Failure must not roll back decisions |
| CI provider and registry | Discovery gap | Open | Medium | GitHub planned but not connected |
| Observability stack | Discovery gap | Open | Medium | No sensitive-data leakage |
| ORM, migrations, transaction library | Discovery gap | Open | High | Must support scoping, locking, tests |
| Performance and availability targets | Discovery gap | Open | Medium | No expected scale or SLA |
| Accessibility target | Discovery gap | Open | Medium | Formal baseline undecided |

## Stakeholder Map & RACI

### Stakeholders

| Stakeholder | Context | Role and Authority | Interest | Influence | Engagement Strategy |
|-------------|---------|--------------------|----------|-----------|---------------------|
| Initiative owner/developer | Employee Hub | Sponsor and Lead Engineer | Learning, quality, security, delivery | High | Engineering gates and phase approvals |
| Andrei | Employee Hub | Product Manager and Architect | User value, coherent requirements, viable architecture | High | Product and architecture checkpoints |
| Employee representatives | Future validators | Intended users; no assigned authority | Balances, requests, status, cancellation, notifications | Medium | Personas, journeys, hypothesis, PRD |
| Manager representatives | Future validators | Intended approvers | Approval clarity, reports, availability, visibility | Medium | Journeys, rules, PRD |
| HR representatives | Future validators | Domain practitioners | Policies, balances, holidays, auditability | High | Domain analysis, hypothesis, PRD |
| Administrator/security reviewer | Future validator | Access/security reviewer | Tenant isolation, authorization, configuration, auditing | High | Feasibility and architecture |
| GitHub/CI/Rancher operators | Future providers/maintainers | Operational stakeholders | Reproducibility, deployability, observability | Medium | Tooling selection |

### RACI Matrix

| Activity | Andrei — Product/Architecture | Sponsor — Lead Engineer | User/domain representatives |
|----------|-------------------------------|-------------------------|-----------------------------|
| Signal acceptance | C | A/R | I |
| Explore Bundle and scope | A/R | C | I |
| Context baseline | A/R | C | C |
| Market/comparable research | A/R | C | C |
| Domain model and leave rules | A | R | C |
| Personas and current journeys | A/R | C | C |
| Hypothesis approval | R | A | C |
| Technical feasibility | A | R | C |
| Architecture context and HLD | A/R | C | C |
| Security and tenant isolation | A | R | C |
| PRD approval | A/R | C | C |
| Test and DevOps strategies | C | A/R | I |
| Epic and task formation | A | R | I |
| Govern readiness | R | A | C |
| Implementation and engineering acceptance | C | A/R | I |

## Governance Framework

### Decision Authority

| Decision Type | Decision Maker | Consulted | Informed | Escalation Path |
|---------------|----------------|-----------|----------|-----------------|
| Product scope/priorities | Andrei — Product | Sponsor, representatives | Steering team | Sponsor decides additional time/budget |
| Domain policy/workflow | Andrei — Product | HR, Employee, Manager, Lead | Sponsor | Keep unresolved without evidence |
| UX/accessibility | Andrei — Product | Users, Lead | Sponsor | Track assumption and validation |
| Architecture/patterns | Andrei — Architect | Lead Engineer | Sponsor | Pause and record ADR |
| Engineering quality | Sponsor — Lead Engineer | Andrei — Architect | Steering team | Either may block unsafe or incoherent work |
| Security/privacy/tenant isolation | Andrei — Architect | Lead, security reviewer | Sponsor | High-risk disagreement blocks progression |
| Tooling/providers | Sponsor — Lead Engineer | Andrei — Architect | Steering team | Paid services require Sponsor approval |
| Evidence/hypothesis | Andrei — Product | Sponsor, representatives | Steering team | Unsupported claims remain assumptions |
| Timeline/resources | Sponsor | Andrei | Steering team | Re-scope before extension |
| Risk acceptance | Sponsor | Andrei, reviewers | Steering team | Record high-impact residual risk |
| Formal compliance scope | Sponsor | Andrei, qualified expert | Steering team | No compliance claims without expert review |

### Approval Gates

| Gate | Approver | Criteria | Fallback |
|------|----------|----------|----------|
| Signal acceptance | Sponsor | Problem framed, assumptions tagged, route risk accepted | Return to Signal Strengthen |
| Explore Bundle | Andrei and Sponsor | Scope, activities, owners, questions, risks, timeline approved | Revise bundle |
| Context baseline | Andrei and Sponsor | Context sections consistent and evidenced | Correct before parallel discovery |
| Part A discovery | Andrei and Sponsor | Research, domain, feasibility, architecture artifacts consistent | Repeat targeted activity |
| Personas/journeys | Andrei plus available representatives | Evidence tags accurate; assumptions explicit | Do not claim validation |
| Hypothesis-ready | Andrei and Sponsor | Evidence sufficient and signals measurable | Gather evidence |
| Hypothesis validated | Sponsor and Andrei, with representative input | Feedback incorporated; residual assumptions accepted | Remain Draft or accept risk |
| PRD approval | Andrei; Sponsor concurs technically | Requirements testable, scope bounded, links complete | Return to discovery/design |
| Architecture/HLD approval | Andrei; Sponsor concurs technically | Drivers, boundaries, data, security, operations coherent | Resolve decisions |
| Govern readiness | Andrei and Sponsor | Required artifacts complete, no unowned blockers | Remain in Explore |

## Assumptions Catalogue

| ID | Assumption | Open Question | Risk if Wrong | Owner | Closes In |
|----|------------|---------------|---------------|-------|-----------|
| AS-1 | Broad leave-administration problems justify exploration | Does evidence support relevance? | Low-value problem targeted | Andrei | A2, A6 |
| AS-2 | Employees need clearer balances, requests, status, cancellation, notifications | Which needs are real and highest priority? | Wrong employee pain points | Andrei | A4, A5 |
| AS-3 | Managers need consolidated approvals and availability | What information/actions are required? | Unnecessary manager complexity | Andrei | A4, A5 |
| AT-1 | Modular NestJS monolith is sufficient | Do scale or workloads require another shape? | Architectural restructuring | Andrei | A7, A8, A13 |
| AT-2 | Organization isolation can be enforced reliably | Where is scope established and verified? | Cross-tenant exposure | Sponsor/Lead | A7, A8, A13 |
| AT-3 | Date, balance, and concurrency rules can be consistent | Which invariants and transactions are required? | Incorrect balances/approvals | Sponsor/Lead | A3, A7, A13 |
| AT-4 | Selected stack supports learning and deployment | Are there compatibility/operational blockers? | Tooling friction or failure | Sponsor/Lead | A7, A8, A14 |
| AO-1 | Fixed roles and one approval step are sufficient | Which workflows require flexibility? | Redesign or scope growth | Andrei | A3, A5, A6 |
| AO-2 | Part-time capacity supports six-week Explore | Can reviews occur at checkpoints? | Delayed Govern handoff | Sponsor | A1, A16 |
| AB-1 | Focused leave management works without full HRIS | Is the bounded capability coherent? | MVP lacks value/realism | Andrei | A2, A6, A12 |

## Gaps Catalogue

| ID | Gap | Why It Matters | Question for Stakeholder | Stakeholder |
|----|-----|----------------|--------------------------|-------------|
| G1 | MVP leave types | Defines policies, balances, forms, tests | Which types are essential? | HR |
| G2 | Request overlap | Affects validation/availability | May pending or approved requests overlap? | HR, Manager |
| G3 | Working-day rules | Highest-risk calculation area | How are weekends, holidays, partial days, time zones handled? | HR |
| G4 | Editing/cancellation | Defines lifecycle | When may employees edit or cancel? | Employee, HR |
| G5 | Balance adjustments | Affects trust/audit | Who may adjust, why, and with what approval? | HR, Administrator |
| G6 | Manager visibility | Affects usefulness/privacy | Which details may managers see? | Employee, Manager, Security |
| G7 | Approval authority | Defines authorization | Is one manager sufficient; what about absence? | Manager, HR |
| G8 | Office/time-zone scope | Affects calendar semantics | Is one organization calendar sufficient? | HR |
| G9 | Notifications | Affects channels/jobs | Which events and channels are required? | Employee, Manager |
| G10 | Product vs learning scope | Controls acceptance | Which capabilities provide value versus practice? | Andrei, Sponsor |
| G11 | Adoption evidence | Determines confidence | Would users adopt this over current methods? | Employee, Manager, HR |
| G12 | Authentication | Affects security/deployment | Which identity approach first? | Andrei, Sponsor |
| G13 | Delivery platforms | Blocks DevOps design | Which GitHub, CI, registry, cluster, observability services exist? | Sponsor |
| G14 | Scale/service goals | Affects architecture/tests | What volume, availability, and recovery targets apply? | Andrei, Sponsor |
| G15 | Accessibility | Affects interaction design | Which accessibility baseline applies? | Andrei, users |

## Context Summary

### One-Page Baseline

**Problem:** Leave information, decisions, calculations, and audit evidence may be fragmented across inconsistent processes, creating administrative effort, unreliable balances, delayed decisions, and access risks.

**Solution direction:** Explore a bounded organization-scoped web platform that makes workflows explicit, applies rules consistently, enforces authorization, preserves transaction integrity, and records auditable changes.

**Scope:** Angular, NestJS, PostgreSQL, fixed roles, one approval step, simple policies, core leave administration, tests, Docker, CI/CD, Rancher, and observability. **Out:** full HRIS, dynamic workflows, mobile apps, real employee data, and formal compliance claims.

**Actors:** Andrei owns Product/Architecture; the initiative owner owns sponsorship/engineering; representative users and operators remain consultation roles.

**Constraints:** Fictional data, one initial organization, organization isolation, selected stack, six-week part-time Explore, no assumed paid-service budget, compliance deferred.

**Assumptions:** 10 tracked assumptions and 15 gaps across value, workflows, domain rules, security, transactions, time, providers, scale, operations, and accessibility.

**Next:** Execute market research, domain analysis, technical feasibility, and architecture context; then personas, journeys, and hypothesis validation.

## Enrichment Log

| Date | Trigger | Change |
|------|---------|--------|
| 2026-08-28 | Context completion | Initial context baseline created from the approved Signal and Explore Bundle. |
| 2026-08-31 | Ideation completion | Three concepts selected: Explainable Leave Receipt, Tracked Request and Recovery, and Safe Operational Readiness. Existing assumptions AS-2, AS-3, AT-2, AT-3, AO-1, and AB-1 remain open and are linked to concept validation. |

---

**Last Updated:** 2026-08-28  
**Updated By:** Explore Agent
