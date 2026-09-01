# Domain Profile: Employee Leave Management

**Domain**: Employee leave management  
**Created**: 2026-09-01  
**Status**: Approved learning-project baseline  
**Evidence labels**: `[OBS]` directly supported by an Employee Hub artifact or sponsor decision; `[INF]` inferred from multiple approved artifacts; `[ASM]` unresolved or deliberately provisional.

## 1. Domain Overview

Employee leave management supports an employee requesting time away, a manager making a single approval decision, and HR/administrators maintaining workforce, policy, balance, and audit information. Employee Hub is a greenfield, fictional-data learning project, deliberately limited to leave management rather than a full HR platform. `[OBS: context.md; signal]`

## 2. Domain Vocabulary

| Term | Definition | Evidence |
| --- | --- | --- |
| Organization | Security, ownership, and configuration boundary for all records. | `[OBS: domain-analysis.md]` |
| User Account | Authentication identity that may link to an employee and hold fixed roles. | `[OBS: domain-analysis.md]` |
| Employee / Team | Workforce profile and its organizational grouping/reporting structure. | `[OBS: domain-analysis.md]` |
| Leave Type / Leave Policy | A category of leave and its effective-dated entitlement/balance rules. | `[OBS: domain-analysis.md]` |
| Leave Request | An employee request for one leave type across a calendar-date range. | `[OBS: domain-analysis.md]` |
| Approval Decision | The one immutable approve/reject record for an MVP request. | `[OBS: domain-analysis.md]` |
| Leave Balance / Balance Transaction | Current projection and immutable explanation of grants, reservations, use, release, or corrections. | `[OBS: domain-analysis.md]` |
| Work Schedule / Holiday Calendar | Effective-dated working pattern and non-working public-holiday data used for calculations. | `[OBS: domain-analysis.md]` |
| Request Day Breakdown | Per-date explanation of whether and how much a requested date counts. | `[OBS: domain-analysis.md]` |
| Audit Event / Notification | Immutable business/security history and independent delivery record. | `[OBS: domain-analysis.md]` |
| Requester / Approver | Domain actors who submit and decide requests; the MVP approver is the employee's manager. | `[OBS: domain-analysis.md; context.md]` |
| Workforce, Policy, Balance, and Access Administrator | Administrative responsibility groupings represented by fixed Employee, Manager, HR, and Administrator roles in the MVP. | `[INF: domain-analysis.md; PRD]` |

Canonical request states are Pending, Approved, Rejected, and Cancelled. Configuration states are Draft, Active, and Retired where applicable. Immutable records are corrected by an appended compensating record, never silent mutation. `[OBS: domain-analysis.md]`

## 3. Key Architectural Concerns

1. Request state change, balance effect, day breakdown, and audit event require one atomic committed outcome. `[OBS: architecture-context.md#3]`
2. Every read, write, relationship, and event must be scoped to its organization; server authorization is authoritative. `[OBS: domain-analysis.md; architecture-context.md#5]`
3. Working-day calculations must be date-only, explainable, and reproducible from policy, schedule, and holiday evidence. `[OBS: architecture-context.md#5]`
4. Balance effects must be ledger-based/reconcilable, protected from retries and concurrent decisions. `[OBS: technical-feasibility.md; architecture-context.md#3]`
5. Audit history is immutable and sensitive actions are traceable; notification delivery is not proof of business-state commitment. `[OBS: domain-analysis.md; architecture-context.md#5]`
6. The user experience is responsive and keyboard accessible, with clear error and status communication. `[OBS: accessibility-employee-hub.md]`

## 4. Known Constraints

| Category | Constraint | Evidence |
| --- | --- | --- |
| Technology | Angular frontend; NestJS/TypeScript backend; PostgreSQL; npm; separate apps in one repository. | `[OBS: context.md]` |
| Architecture | Modular monolith; no unjustified distributed infrastructure. | `[OBS: signal; architecture-context.md]` |
| Scope | Fixed roles; one manager approval; simple policy model; payroll, recruitment, performance, and legal-compliance features deferred. | `[OBS: context.md]` |
| Data/security | Fictional data only; local development begins with one organization while APIs and persistence retain organization boundaries. | `[OBS: context.md]` |
| Consistency | Critical commands need transactions, concurrency protection, and idempotency. | `[OBS: architecture-context.md#5]` |
| Operations | Rancher is the deployment target; provider, cluster, registry, CI, secrets, backup, recovery, and observability capabilities are unknown. | `[OBS: architecture-context.md#1; #6]` |
| Scale | Initial scenario is 10 employees with holiday-season peaks; capacity targets remain unmeasured. | `[OBS: architecture-context.md#2]` |

## 5. Regulatory Landscape

Formal GDPR analysis, certification, jurisdictional compliance, and data-residency commitments are outside this learning project's scope. The project must not make compliance/certification claims. `[OBS: regulatory-compliance.md; sponsor]`

Practical engineering safeguards remain: least privilege, data minimization, secure transport outside local development, auditability, and WCAG 2.2 AA as a non-binding accessibility learning target. `[OBS: regulatory-compliance.md; accessibility-employee-hub.md]`

## 6. Common Architectural Patterns

| Pattern | When to use | When not to use | Evidence |
| --- | --- | --- | --- |
| Modular monolith | Initial Employee Hub modules with explicit boundaries and in-process collaboration. | Do not split into services without a real autonomy/scale need. | `[OBS: context.md; architecture-context.md]` |
| Transactional command + ledger projection | Request submission/decision/adjustment where state, balance, and audit must commit coherently. | Do not use mutable balance totals without immutable explanatory transactions. | `[INF: domain-analysis.md; technical-feasibility.md]` |
| Optimistic concurrency and idempotency | Retried/concurrent commands that could create duplicate decisions or balance effects. | Do not rely on UI disabling as the only safeguard. | `[OBS: architecture-context.md#3]` |
| Transactional outbox/durable notification intent | Events or notifications emitted after a committed workflow change. | Do not allow delivery success/failure to alter the business decision. | `[INF: technical-feasibility.md; architecture-context.md#5]` |
| Effective-dated configuration snapshot/reference | Policies, schedules, and holidays used to explain historical requests. | Do not silently reinterpret historical calculations after configuration changes. | `[OBS: domain-analysis.md; architecture-context.md#6]` |

## 7. Authority Patterns

| Decision/data area | Default authority | Guidance | Evidence |
| --- | --- | --- | --- |
| Product scope/outcomes | Andrei as Product Manager; Sponsor as final project authority. | Requirements and scope changes need explicit approval. | `[OBS: context.md]` |
| Architecture/delivery | Sponsor as Lead Engineer; Andrei reviews architecture. | Architecture decisions are documented and reviewed before implementation. | `[OBS: context.md]` |
| Leave-policy practice | Future HR reviewer. | Treat real policy practices as assumptions until an HR/domain reviewer validates them. | `[OBS: domain-analysis.md]` |
| Application-owned records | Employee Hub. | The application is authoritative for fictional workforce, policy, request, balance, decision, audit, and notification-intent data. | `[OBS: architecture-context.md#2]` |
| Identity and delivery | Future selected providers. | External provider identity/delivery facts supersede local copies once integration exists. | `[OBS: architecture-context.md#2]` |

## 8. Quality Priorities

1. **Correctness** — atomic final decision, balance effect, calculation breakdown, and audit evidence. `[OBS: architecture-context.md#3]`
2. **Security** — authenticated, active, organization-scoped, fixed-role authorization with negative tests. `[OBS: architecture-context.md#3]`
3. **Explainability and auditability** — reproducible working-day calculations and reconcilable immutable history. `[OBS: architecture-context.md#3]`
4. **Accessibility** — responsive, semantic keyboard workflow with readable errors and status. `[OBS: accessibility-employee-hub.md]`
5. **Maintainability and operational simplicity** — tested modular boundaries, pinned versions, and no infrastructure without workload justification. `[OBS: architecture-context.md#3; #5]`

## 9. Domain-Specific Hardening Items

- Verify organization isolation on every data access and relationship. `[OBS]`
- Prove one final decision and one balance effect under retry and concurrent approval. `[OBS]`
- Reconcile balance projection against immutable transactions. `[OBS]`
- Preserve or version policy/schedule/calendar inputs used by historical calculations. `[OBS]`
- Keep notifications asynchronous from committed workflow state. `[OBS]`
- Validate accessible date entry, errors, confirmation, and dynamic status on every leave-critical flow. `[OBS]`

## 10. Open Items

| Item | Owner | Impact | Evidence |
| --- | --- | --- | --- |
| Identity provider, protocol, token/session, and account linking | Lead Engineer | Authentication and role/scope mapping cannot be finalized. | `[OBS: architecture-context.md#6]` |
| ORM, migration, transaction, locking/versioning, and idempotency approach | Lead Engineer | Balance invariants need implementation proof. | `[OBS: architecture-context.md#6]` |
| Exact supported versions and GitHub/CI/Rancher capabilities | Sponsor / Lead Engineer | Reproducible delivery remains open. | `[OBS: architecture-context.md#6]` |
| Leave types, overlap/edit/cancel rules, visibility, and historical configuration rules | Product Manager / future HR reviewer | Policy acceptance criteria remain provisional. | `[OBS: architecture-context.md#6]` |
