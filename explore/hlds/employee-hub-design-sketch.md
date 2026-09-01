# Design Sketch: Employee Hub HLD

**Date**: 2026-09-01  
**Status**: Direction Approved  
**Iteration**: 1  
**Architect**: Andrei  
**Slug**: employee-hub

## 1. Service Boundary

**Proposed boundary**: One deployable Employee Hub backend modular monolith, authoritative for fictional leave-management workflows and data. `[VALIDATED]`

**Justification**: Five validated bounded contexts require explicit ownership, but the initial ten-employee workload does not justify independent deployment units. `[VALIDATED]`

**Includes**: Organization & Access; Workforce Directory; Leave Policy & Calendar; Leave Workflow & Balances; Audit & Notification. `[VALIDATED]`

**Excludes**: Angular frontend; future identity provider; external delivery channels; payroll, recruitment, performance, and formal compliance features. `[VALIDATED]`

**Negative boundaries**: the service never trusts browser scope; Audit & Notification never changes leave state; Workflow & Balances never owns access/workforce/configuration; the service is not a general HR platform. `[VALIDATED]`

## 2. Module Map

| # | Module | Responsibility / owns | Consumes | Produces | Evidence |
| ---: | --- | --- | --- | --- | --- |
| 1 | Organization & Access | Organization, accounts, roles, authorization. | Provider claims. | Scoped subject/permissions, security facts. | `[VALIDATED]` |
| 2 | Workforce Directory | Employees, teams, managers, schedules. | Organization/HR authority. | Eligibility and schedule facts. | `[VALIDATED]` |
| 3 | Leave Policy & Calendar | Types, policies, calendars, holidays. | Organization/HR authority. | Effective calculation inputs. | `[VALIDATED]` |
| 4 | Leave Workflow & Balances | Requests, breakdowns, decisions, balances, immutable ledger. | Scope, workforce, policy/calendar facts. | Committed outcomes/milestones. | `[VALIDATED]` |
| 5 | Audit & Notification | Audit events, notification intent/delivery status. | Committed outcomes. | Scoped history/delivery outcomes. | `[VALIDATED]` |

## 3. Runtime Trigger

- **Primary**: authenticated HTTP API requests from Angular invoke scoped queries/commands. `[VALIDATED]`
- **Asynchronous**: an in-process worker claims transactional-outbox notification work after commit. `[VALIDATED]`
- **Not in MVP**: scheduled recalculation, webhooks, external delivery providers. `[VALIDATED]`

## 4. Data Model Sketch

### Entities

| Entity group | Key fields | Source of truth | Relationship | Evidence |
| --- | --- | --- | --- | --- |
| Organization/account/role | IDs, timezone, provider ref, status, role. | Organization & Access. | Account may link to Employee. | `[VALIDATED]` |
| Employee/team/schedule | IDs, manager, team, effective dates. | Workforce Directory. | Employee uses schedule/reports to Employee. | `[VALIDATED]` |
| Type/policy/calendar/holiday | code, entitlement, effective dates, holiday date. | Leave Policy & Calendar. | Governs calculation. | `[VALIDATED]` |
| Request/breakdown/decision | range, status/version, counted day, decision/reason. | Workflow & Balances. | One request has lines and ≤1 decision. | `[VALIDATED]` |
| Balance/transaction | period, available/reserved/used, kind/amount/reason. | Workflow & Balances. | Projection reconciles to immutable entries. | `[VALIDATED]` |
| Audit/notification | actor/action/outcome; recipient/type/delivery state. | Audit & Notification. | Records committed outcomes. | `[VALIDATED]` |

### Authoritative Data Sources

| Input | Source | Authority | Contract | Evidence |
| --- | --- | --- | --- | --- |
| Identity claims | Future provider | Provisional external | Assumed | `[ASSUMPTION]` |
| Local scope/roles | Organization & Access | Canonical | Needs creation | `[VALIDATED]` |
| Workforce/configuration/workflow/audit data | Respective owned module | Canonical | Needs creation | `[VALIDATED]` |

## 5. Event Map

| Event | Direction | Owner | Consumers | Schema | Evidence |
| --- | --- | --- | --- | --- | --- |
| LeaveRequestSubmitted / Approved / Rejected / Cancelled | Produced post-commit | Workflow & Balances | Audit & Notification | Assumed | `[ASSUMPTION]` |
| BalanceAdjusted | Produced post-commit | Workflow & Balances | Audit & Notification | Assumed | `[ASSUMPTION]` |

## 6. API Contracts

| API group | Direction | Purpose | Status | Evidence |
| --- | --- | --- | --- | --- |
| Identity adapter | Inbound dependency | Validate subject and derive server scope. | Provisional | `[ASSUMPTION]` |
| Profile/request/decision/balance APIs | Frontend to backend | Employee and Manager workflows. | Needs creation | `[VALIDATED]` |
| Workforce/configuration/access/audit APIs | Frontend to backend | HR/Admin workflow and investigation. | Needs creation | `[VALIDATED]` |
| Notification worker and health/telemetry | Internal/runtime | Delivery retries and operations. | Needs creation | `[VALIDATED]` |

## 7. Architectural Decision Points

| Decision | Options considered | Architect selection | NFR impact |
| --- | --- | --- | --- |
| Persistence | TypeORM; Prisma; SQL-first. | **TypeORM + PostgreSQL migrations/explicit transaction control** (DEC-012). | Correctness, maintainability. |
| Idempotency/concurrency | Combined idempotency/version/locks; version-only; locks-only. | **Combined approach** (DEC-013). | Atomicity, retry safety. |
| Authentication | Provider-neutral adapter/stub; provider now; local passwords. | **Provider-neutral OIDC/JWT adapter + local stub** (DEC-014). | Security, delivery. |
| Notifications | Outbox/worker; synchronous; broker. | **Transactional outbox + in-process worker** (DEC-015). | Resilience, simplicity. |
| Historical calculations | Breakdown + version refs; totals only; JSON snapshots. | **Breakdown + version refs** (DEC-016). | Auditability, explainability. |
| Administrator authority | Explicit matrix; bypass; settings-only. | **Explicit matrix with non-bypass prohibitions** (DEC-017). | Security, R-017. |

The approved domain profile pattern library informed the ledger/projection, transactional command, idempotency, outbox, and effective-dating selections. `[VALIDATED]`

## 8. Open Questions

| Question | Impact | Blocking? | Resolution |
| --- | --- | ---: | --- |
| Concrete OIDC provider/claims mapping | Auth integration. | No | Select before non-stub implementation. |
| Exact supported tool versions | Reproducible CI. | No | Pin at scaffold planning. |
| Rancher/GitHub capabilities | Shared deployment. | No | Obtain checklist before deployment. |
| Leave policy and Manager-routing/visibility details | Workflow/API behavior. | No | PM/HR validation before relevant features. |

## 9. Assumptions Register

| Assumption | Source | Evidence | Risk |
| --- | --- | --- | --- |
| One fictional organization, ten employees, holiday peaks. | Context | INFERRED | Scale/tenancy may expand. |
| Full-day, default schedule/calendar/timezone MVP. | PRD | ASSUMED | Calculation model may widen. |
| One direct Manager decides each request. | PRD | ASSUMED | Delegation/escalation may be required. |
| Reservation/use/release/restore balance model. | Domain analysis | ASSUMED | Policy expectations may differ. |
| In-process outbox worker is sufficient. | Scale/context | INFERRED | Runtime may require separate worker. |
| Local identity stub supports learning safely. | DEC-014 | ASSUMED | Provider needs may accelerate. |
| Version references explain historical calculations. | DEC-016 | INFERRED | More snapshot data may be needed. |

## 10. Evaluation Criteria Log

| Date | Type | Change | Impact |
| --- | --- | --- | --- |
| 2026-09-01 | None | No feedback correction/reset/context injection occurred. | Initial criteria retained. |

## 11. Enrichment Log

| Date | Change | Source | Updated By |
| --- | --- | --- | --- |
| 2026-09-01 | Created initial design sketch from validated B.1 artifacts and decisions. | Architecture Solutioning B.1.3 | Explore Agent |

## 12. Document History

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 1.0 | 2026-09-01 | Explore Agent | Direction-approved initial design sketch. |
