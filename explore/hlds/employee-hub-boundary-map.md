# Boundary Map: Employee Hub HLD

**Date**: 2026-09-01  
**Status**: Validated  
**Architect**: Andrei  
**Slug**: employee-hub

## 1. Truth Hierarchy

| # | Document | Classification | Rationale | Evidence |
| ---: | --- | --- | --- | --- |
| 1 | Employee Hub PRD | Canonical | Approved requirements, quality gates, scope, and acceptance criteria. | `[OBS]` |
| 2 | Architecture Context | Canonical | Consolidated landscape, drivers, constraints, bounded contexts, and open questions. | `[OBS]` |
| 3 | Domain Profile, Domain Analysis, Shared Glossary | Canonical | Controlled terminology, invariants, lifecycles, and domain boundaries. | `[OBS]` |
| 4 | Canonical HLD Template | Canonical | Required HLD structure, diagrams, and evidence convention. | `[OBS]` |
| 5 | Technical Feasibility | Directional | Technical guardrails and risk evidence; concrete choices remain unresolved. | `[OBS]` |
| 6 | Regulatory/Compliance Focus | Directional | Practical safeguards and no-claim boundaries; not a formal compliance assessment. | `[OBS]` |
| 7 | IA, flows, wireframes, usability, accessibility | Directional | Informs experience/API constraints without overriding domain ownership. | `[OBS]` |
| 8 | Ideation concepts | Directional | Direction seeds only; not committed architecture. | `[OBS]` |
| 9 | Adjacent HLDs/platform conventions | Unavailable | No adjacent implementation or HLD exists in this greenfield warehouse. | `[OBS]` |

## 2. Ownership Matrix

| # | Domain | Owns (authoritative) | Consumes (depends on) | Produces (hands off to) | Evidence |
| ---: | --- | --- | --- | --- | --- |
| 1 | Organization & Access | Organization scope, accounts, fixed-role assignments, authorization decisions. | Future identity assertions; authenticated request context. | Subject, organization scope, permission decisions, access/security audit facts. | `[OBS]` |
| 2 | Workforce Directory | Employees, teams, manager relationships, assigned schedules. | Organization scope and HR authority. | Eligible employee/manager/team/schedule facts. | `[OBS]` |
| 3 | Leave Policy & Calendar | Leave types, effective policies, calendars, public holidays. | Organization scope and HR authority. | Effective calculation rules and readiness facts. | `[OBS]` |
| 4 | Leave Workflow & Balances | Requests, day breakdowns, decisions, balance projections, immutable transactions. | Scope/authorization, workforce relationship, schedule, policy, calendar data. | Committed request/balance milestones and required audit facts. | `[OBS]` |
| 5 | Audit & Notification | Immutable audit events, notification intent, delivery status. | Committed business/security outcomes and authorized audit queries. | Scoped audit history and independent delivery outcomes. | `[OBS]` |

The internal module handoffs are inferred from the approved modular-monolith constraint. `[INF]` Audit & Notification does not own or mutate leave state; Leave Workflow & Balances does not own configuration or authorization. `[OBS]`

## 3. Upstream Dependencies

| # | Dependency | Source Domain | Type | Contract Status | Evidence |
| ---: | --- | --- | --- | --- |
| 1 | Authenticated identity, organization scope, role claims | Future identity provider | External API/claims | PROVISIONAL | `[OBS]` |
| 2 | Authorization and account-role mapping | Organization & Access | Internal module API | Needs Creation | `[INF]` |
| 3 | Employee, manager, team, schedule eligibility | Workforce Directory | Internal module API/query | Needs Creation | `[INF]` |
| 4 | Effective policy, holiday, calendar rules | Leave Policy & Calendar | Internal module API/query | Needs Creation | `[INF]` |
| 5 | Committed leave/balance milestones | Leave Workflow & Balances | Internal milestone events | Needs Creation | `[INF]` |
| 6 | Auditable business/security action facts | Business modules | Internal append command/event | Needs Creation | `[INF]` |
| 7 | Deployment, secrets, health, rollout, telemetry capability | Rancher/GitHub/CI environment | Platform contract | PROVISIONAL | `[OBS]` |

PROVISIONAL dependencies are tracked by BLK-001 and BLK-002 in the [blocker register](employee-hub-blocker-register.md). `[OBS]`

## 4. Platform Conventions

| # | Convention | Adjacent HLD Source | Pattern | Recommendation | Justification | Evidence |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | HLD structure and Mermaid diagrams | Canonical HLD template | 13 required sections and Mermaid conventions. | Inherit | Required warehouse architecture standard. | `[OBS]` |
| 2 | Architecture evidence labels | Canonical HLD template | `OBS`/`INF`/`ASM`. | Inherit | Distinguishes fact, inference, and assumption. | `[OBS]` |
| 3 | Git and artifact traceability | Root AGENTS | Conventional commits and linked artifacts. | Inherit | Established repository governance. | `[OBS]` |
| 4 | Flow workflow and deterministic tooling | Root AGENTS | Dava.Flow and `dft`. | Inherit | Established delivery process. | `[OBS]` |
| 5 | Application module/API/persistence/identity/event/deployment/CI/observability patterns | None | No existing app convention. | Establish | Greenfield project; no safe convention to copy. | `[OBS]` |

## 5. Open Questions

| # | Question | Source | Impact | Blocking? | Proposed Resolution |
| ---: | --- | --- | --- | ---: | --- |
| 1 | Which identity provider, claims, session/token, and account-linking model applies? | Architecture Context OQ-01 | Auth integration and authorization tests. | No | Provider-neutral boundary now; choose/prove before implementation. |
| 2 | Which ORM/migration, transaction, concurrency, and idempotency approach proves invariants? | Architecture Context OQ-02 | Atomic leave/balance commands. | No | Evaluate and choose in design sketch before HLD finalization. |
| 3 | How are configuration versions retained for historical calculations? | Architecture Context OQ-06 | Calculation explainability/audit. | No | Define snapshot/version-reference model in design sketch. |
| 4 | How does broad Admin access preserve least privilege, no self-approval, and immutable history? | PRD R-017 | Authorization policy. | No | Define explicit permissions and prohibitions; review with PM/Architect. |
| 5 | What Manager availability and leave-detail visibility is permitted? | PRD R-015 | Data exposure/API shape. | No | PM/HR validation before feature planning. |
| 6 | What Rancher/GitHub/CI/registry/secrets/observability capabilities exist? | Architecture Context OQ-04/OQ-05 | Deployment evidence. | No | Obtain ownership/capability checklist before shared deployment. |
| 7 | Which supported runtime/framework/database/test/container versions apply? | Architecture Context OQ-03 | Reproducible scaffold/CI. | No | Pin supported versions during scaffold planning. |

## 6. Enrichment Log

| Date | Change | Source | Updated By |
| --- | --- | --- |
| 2026-09-01 | Created from architect-confirmed inventory, hierarchy, ownership, dependencies, conventions, and questions. | Architecture Solutioning B.1.2 | Explore Agent |

## 7. Document History

| Version | Date | Author | Changes |
| --- | --- | --- |
| 1.0 | 2026-09-01 | Explore Agent | Validated initial boundary map. |
