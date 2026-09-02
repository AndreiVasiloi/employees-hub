# Decision Log: Employee Hub HLD

**Engagement start**: 2026-09-01  
**Last updated**: 2026-09-01  
**Total decisions**: 22  
**Architect**: Andrei  
**Slug**: employee-hub

---

## Decision Index

| # | Date | Step | Decision | Driver | Status |
| --- | --- | --- | --- | --- | --- |
| DEC-001 | 2026-09-01 | B.1.2 / Boundary Mapping Step 1 | Classify architecture input authority | Architect | Active |
| DEC-002 | 2026-09-01 | B.1.2 / Boundary Mapping Step 2 | Confirm truth hierarchy | Architect | Active |
| DEC-003 | 2026-09-01 | B.1.2 / Boundary Mapping Step 3 | Confirm bounded-context ownership | Architect | Active |
| DEC-004 | 2026-09-01 | B.1.2 / Boundary Mapping Step 4 | Confirm dependency map and provisional contracts | Architect | Active |
| DEC-005 | 2026-09-01 | B.1.2 / Boundary Mapping Step 5 | Adopt warehouse conventions; establish application conventions | Architect | Active |
| DEC-006 | 2026-09-01 | B.1.2 / Boundary Mapping Step 6 | Carry unresolved architecture questions forward | Architect | Active |
| DEC-007 | 2026-09-01 | B.1.3 / Design Sketch Step 1 | Confirm backend modular-monolith service boundary | Architect | Active |
| DEC-008 | 2026-09-01 | B.1.3 / Design Sketch Step 2 | Confirm five-module map and HTTP/worker triggers | Architect | Active |
| DEC-009 | 2026-09-01 | B.1.3 / Design Sketch Step 3 | Confirm authoritative leave-management data model | Architect | Active |
| DEC-010 | 2026-09-01 | B.1.3 / Design Sketch Step 4 | Confirm milestone-event and API contract map | Architect | Active |
| DEC-011 | 2026-09-01 | B.1.3 / Design Sketch Step 5 | Confirm quality-attribute constraints | Architect | Active |
| DEC-012 | 2026-09-01 | B.1.3 / Design Sketch Step 6 | Select TypeORM and PostgreSQL migrations | Architect | Active |
| DEC-013 | 2026-09-01 | B.1.3 / Design Sketch Step 6 | Select idempotency, versioning, and targeted locks | Architect | Active |
| DEC-014 | 2026-09-01 | B.1.3 / Design Sketch Step 6 | Select provider-neutral OIDC/JWT boundary | Architect | Active |
| DEC-015 | 2026-09-01 | B.1.3 / Design Sketch Step 6 | Select transactional outbox and in-process worker | Architect | Active |
| DEC-016 | 2026-09-01 | B.1.3 / Design Sketch Step 6 | Select breakdown and configuration-version references | Architect | Active |
| DEC-017 | 2026-09-01 | B.1.3 / Design Sketch Step 6 | Select explicit fixed-role permission matrix | Architect | Active |
| DEC-018 | 2026-09-01 | B.1.3 / Design Sketch Step 7 | Accept explicit open questions and assumptions | Architect | Active |
| DEC-019 | 2026-09-01 | B.1 Gate | Approve architecture direction | Architect | Active |
| DEC-020 | 2026-09-01 | B.2 Gate | Approve consolidated HLD draft for hardening | Architect | Active |
| DEC-021 | 2026-09-01 | B.3 Gate | Accept hardening caveats; conditional pass | Architect | Active |
| DEC-022 | 2026-09-01 | B.4 Gate | Approve final HLD and accept ADR-001–006 | Architect | Active |

## Decision Details

### DEC-001: Classify Architecture Input Authority

- **Date**: 2026-09-01
- **Step**: B.1.2 / Boundary Mapping Step 1
- **Driver**: Architect
- **Decision**: Treat the approved PRD, architecture context, domain profile/domain analysis, and canonical HLD template as authoritative inputs. Treat feasibility, regulatory, UX, and ideation artifacts as directional. Record that no adjacent HLD or inherited platform convention exists for this greenfield project.
- **Rationale**: The approved requirements and consolidated architecture/domain artifacts define project intent and ownership; supporting research/design artifacts inform but do not override them.
- **Alternatives rejected**:
  - Treat every Explore artifact as equally authoritative — rejected because it could silently override approved requirements or domain constraints.
  - Invent adjacent platform conventions — rejected because no adjacent HLD exists.
- **Evidence level**: [VALIDATED]
- **Impact**: Establishes the truth hierarchy for boundary mapping, design sketch, HLD, and ADRs.
- **Status**: Active

### DEC-002: Confirm Truth Hierarchy

- **Date**: 2026-09-01
- **Step**: B.1.2 / Boundary Mapping Step 2
- **Driver**: Architect
- **Decision**: Confirm the approved PRD, architecture context, domain profile/domain analysis, and HLD template as canonical; retain other Explore artifacts as directional; record no adjacent HLD.
- **Rationale**: The hierarchy provides one unambiguous authority order before ownership and design decisions are made.
- **Alternatives rejected**:
  - Reclassify a directional artifact as canonical — rejected because no correction was requested.
  - Delay hierarchy confirmation — rejected because boundary mapping requires it before ownership analysis.
- **Evidence level**: [VALIDATED]
- **Impact**: Ownership, dependencies, and architecture design must preserve this authority order.
- **Status**: Active

### DEC-003: Confirm Bounded-Context Ownership

- **Date**: 2026-09-01
- **Step**: B.1.2 / Boundary Mapping Step 3
- **Driver**: Architect
- **Decision**: Confirm five ownership boundaries: Organization & Access, Workforce Directory, Leave Policy & Calendar, Leave Workflow & Balances, and Audit & Notification.
- **Rationale**: The boundaries align with the approved domain model while preserving a modular monolith with explicit internal collaboration.
- **Alternatives rejected**:
  - A single undifferentiated HR module — rejected because it would blur authorization, configuration, workflow, accounting, and audit responsibilities.
  - Separate deployable services — rejected at this stage because the approved scope is a modular monolith and no autonomy/scale evidence justifies distributed deployment.
- **Evidence level**: [VALIDATED]
- **Impact**: Defines module/data ownership and constrains the HLD, API, transaction, and event design.
- **Status**: Active

### DEC-004: Confirm Dependency Map and Provisional Contracts

- **Date**: 2026-09-01
- **Step**: B.1.2 / Boundary Mapping Step 4
- **Driver**: Architect
- **Decision**: Confirm the internal module dependencies as contracts to create and retain the identity-provider and Rancher/delivery dependencies as explicit provisional gaps.
- **Rationale**: No existing implementation or external provider contract exists, while the modular-monolith design needs explicit collaboration points from the outset.
- **Alternatives rejected**:
  - Treat future provider/platform behavior as a confirmed contract — rejected because evidence is unavailable.
  - Delay all boundary work until providers are selected — rejected because the internal architecture can progress with isolated, explicit gaps.
- **Evidence level**: [VALIDATED]
- **Impact**: BLK-001 and BLK-002 remain open; module APIs/events must be specified during design/HLD work.
- **Status**: Active

### DEC-005: Adopt Warehouse Conventions; Establish Application Conventions

- **Date**: 2026-09-01
- **Step**: B.1.2 / Boundary Mapping Step 5
- **Driver**: Architect
- **Decision**: Inherit the warehouse HLD, evidence, Git, and Dava.Flow conventions; establish application architecture conventions within this engagement because no adjacent application/HLD exists.
- **Rationale**: Existing repository governance is authoritative, while copying unverified patterns from an absent application would be unsound.
- **Alternatives rejected**:
  - Invent adjacent application conventions — rejected because this is a greenfield repository.
  - Defer all conventions until implementation — rejected because core patterns must be explicit in the HLD.
- **Evidence level**: [VALIDATED]
- **Impact**: The design sketch and HLD will define module, API, persistence, identity, event, deployment, CI, and observability conventions.
- **Status**: Active

### DEC-006: Carry Unresolved Architecture Questions Forward

- **Date**: 2026-09-01
- **Step**: B.1.2 / Boundary Mapping Step 6
- **Driver**: Architect
- **Decision**: Retain identity, persistence/concurrency, historical configuration, authorization-policy, platform, and supported-version questions as explicit gaps; none blocks boundary validation today.
- **Rationale**: Their implications are known and can be isolated in the design sketch/HLD, while prematurely choosing details would create unsupported commitments.
- **Alternatives rejected**:
  - Resolve all questions before design sketching — rejected because further architecture analysis is needed to evaluate several choices.
  - Omit unresolved questions — rejected because they materially affect implementation and deployment readiness.
- **Evidence level**: [VALIDATED]
- **Impact**: Questions remain traceable in the boundary map, blocker register, design sketch, and HLD risk section.
- **Status**: Active

### DEC-007: Confirm Backend Modular-Monolith Service Boundary

- **Date**: 2026-09-01
- **Step**: B.1.3 / Design Sketch Step 1
- **Driver**: Architect
- **Decision**: Use one deployable Employee Hub backend modular monolith as the authoritative boundary for fictional leave-management workflows and records, with the Angular frontend and external providers outside that boundary.
- **Rationale**: This matches the approved modular-monolith scope while retaining explicit domain module boundaries and avoiding unjustified distributed infrastructure.
- **Alternatives rejected**:
  - Separate deployable services for each domain — rejected because no autonomy or scale evidence warrants that complexity.
  - A single unstructured backend module — rejected because it would obscure data ownership and critical invariants.
- **Evidence level**: [VALIDATED]
- **Impact**: The HLD will define one backend deployment unit with internal module APIs/events and separate frontend/provider adapters.
- **Status**: Active

### DEC-008: Confirm Five-Module Map and HTTP/Worker Triggers

- **Date**: 2026-09-01
- **Step**: B.1.3 / Design Sketch Step 2
- **Driver**: Architect
- **Decision**: Use five domain-aligned NestJS modules—Organization & Access, Workforce Directory, Leave Policy & Calendar, Leave Workflow & Balances, and Audit & Notification—with authenticated HTTP as the primary trigger and a post-commit notification worker as the asynchronous trigger.
- **Rationale**: This mirrors the validated bounded contexts and supports independent notification delivery without broadening the deployment architecture.
- **Alternatives rejected**:
  - Additional business modules before evidence of need — rejected to keep the modular monolith small and comprehensible.
  - Notification delivery in the synchronous request path — rejected because delivery failure must not change committed workflow state.
- **Evidence level**: [VALIDATED]
- **Impact**: Defines the initial NestJS module map, transaction boundaries, and runtime paths used by the design sketch/HLD.
- **Status**: Active

### DEC-009: Confirm Authoritative Leave-Management Data Model

- **Date**: 2026-09-01
- **Step**: B.1.3 / Design Sketch Step 3
- **Driver**: Architect
- **Decision**: Confirm application ownership for organization/access, workforce, configuration, workflow/balance, and audit/notification records; retain future identity assertions as a provisional external input.
- **Rationale**: The model preserves the approved domain invariants, organization isolation, effective calculation inputs, and immutable accounting/audit evidence.
- **Alternatives rejected**:
  - Treat the identity provider as authoritative for local role/scope decisions — rejected because server authorization remains an application responsibility.
  - Use mutable balance history — rejected because reconciliation and auditability require immutable transactions.
- **Evidence level**: [VALIDATED]
- **Impact**: Constrains persistence, transactions, APIs, events, authorization, and tests in the design sketch/HLD.
- **Status**: Active

### DEC-010: Confirm Milestone-Event and API Contract Map

- **Date**: 2026-09-01
- **Step**: B.1.3 / Design Sketch Step 4
- **Driver**: Architect
- **Decision**: Use five post-commit internal workflow/balance milestone events for audit/notification and define grouped REST/API contracts for frontend, identity, worker, and runtime interactions.
- **Rationale**: Milestone events preserve audit/notification decoupling without event noise; grouped contracts keep the sketch broad while surfacing the required implementation work.
- **Alternatives rejected**:
  - Emit per-record events — rejected because they add noise without MVP value.
  - Couple notification delivery to synchronous commands — rejected because delivery failure cannot reverse business state.
- **Evidence level**: [VALIDATED]
- **Impact**: BLK-003 remains open until schemas, error semantics, correlation, and idempotency details are specified in the HLD/ADRs.
- **Status**: Active

### DEC-011: Confirm Quality-Attribute Constraints

- **Date**: 2026-09-01
- **Step**: B.1.3 / Design Sketch Step 5
- **Driver**: Architect
- **Decision**: Constrain the design around atomic correctness, server-side organization isolation, explainable immutable evidence, bounded performance, and accessible/understandable state.
- **Rationale**: These priorities are directly traced to the approved PRD and architecture context.
- **Alternatives rejected**:
  - Optimize early for distributed scale — rejected because the initial workload does not justify added infrastructure.
  - Treat accessibility or auditability as post-MVP concerns — rejected because both are explicit requirements and trust drivers.
- **Evidence level**: [VALIDATED]
- **Impact**: These constraints govern all options considered in the next decision-point review.
- **Status**: Active

### DEC-012: Select TypeORM and PostgreSQL Migrations

- **Date**: 2026-09-01
- **Step**: B.1.3 / Design Sketch Step 6
- **Driver**: Architect
- **Decision**: Use TypeORM with PostgreSQL migrations and explicit transaction/query-runner control.
- **Rationale**: Supports NestJS integration and the required locking/transaction control.
- **Alternatives rejected**: Prisma — advanced locking may require raw SQL; SQL-first layer — excess mapping/boilerplate.
- **Evidence level**: [VALIDATED]
- **Impact**: Persistence and migration implementation; DEC-013.
- **Status**: Active

### DEC-013: Select Idempotency, Versioning, and Targeted Locks

- **Date**: 2026-09-01
- **Step**: B.1.3 / Design Sketch Step 6
- **Driver**: Architect
- **Decision**: Use an idempotency-key record, optimistic version checks, and targeted PostgreSQL row locks for balance-changing commands.
- **Rationale**: Protects retry and competing-decision invariants.
- **Alternatives rejected**: Versioning only — weaker conflict protection; locking only — weaker retry semantics.
- **Evidence level**: [VALIDATED]
- **Impact**: Commands, schema, tests, error semantics.
- **Status**: Active

### DEC-014: Select Provider-Neutral OIDC/JWT Boundary

- **Date**: 2026-09-01
- **Step**: B.1.3 / Design Sketch Step 6
- **Driver**: Architect
- **Decision**: Use a provider-neutral OIDC/JWT adapter with a local development identity stub.
- **Rationale**: Preserves learning progress while isolating future provider integration.
- **Alternatives rejected**: Immediate external provider — delivery overhead; local passwords — unnecessary security scope.
- **Evidence level**: [VALIDATED]
- **Impact**: BLK-001 resolution path, auth adapter, integration tests.
- **Status**: Active

### DEC-015: Select Transactional Outbox and In-Process Worker

- **Date**: 2026-09-01
- **Step**: B.1.3 / Design Sketch Step 6
- **Driver**: Architect
- **Decision**: Use a transactional outbox table and in-process worker/poller for notification delivery.
- **Rationale**: Keeps delivery independent from the committed workflow without a broker.
- **Alternatives rejected**: Synchronous delivery — couples failure; broker now — unjustified infrastructure.
- **Evidence level**: [VALIDATED]
- **Impact**: Notification persistence, retries, observability.
- **Status**: Active

### DEC-016: Select Breakdown and Configuration-Version References

- **Date**: 2026-09-01
- **Step**: B.1.3 / Design Sketch Step 6
- **Driver**: Architect
- **Decision**: Store request-day breakdowns and references to effective policy, schedule, and calendar versions.
- **Rationale**: Preserves explainable historical calculations without full per-request configuration duplication.
- **Alternatives rejected**: Totals only — not explainable; full JSON snapshot — unnecessary duplication.
- **Evidence level**: [VALIDATED]
- **Impact**: Configuration versioning, request persistence, audit/recalculation evidence.
- **Status**: Active

### DEC-017: Select Explicit Fixed-Role Permission Matrix

- **Date**: 2026-09-01
- **Step**: B.1.3 / Design Sketch Step 6
- **Driver**: Architect
- **Decision**: Use an explicit fixed-role permission matrix; Admin capabilities never override no-self-approval or immutable ledger/audit prohibitions.
- **Rationale**: Reconciles sponsor-approved Admin breadth with least privilege.
- **Alternatives rejected**: Unrestricted bypass — violates safeguards; settings-only Admin — conflicts with approved direction.
- **Evidence level**: [VALIDATED]
- **Impact**: Authorization design, PRD R-017 reconciliation, negative tests.
- **Status**: Active

### DEC-018: Accept Explicit Open Questions and Assumptions

- **Date**: 2026-09-01
- **Step**: B.1.3 / Design Sketch Step 7
- **Driver**: Architect
- **Decision**: Carry six non-blocking questions and seven assumptions explicitly into the design sketch and HLD.
- **Rationale**: They are visible, owned, and do not invalidate the approved architecture direction.
- **Alternatives rejected**: Resolve all items immediately — rejected because several require future platform or HR-domain evidence.
- **Evidence level**: [VALIDATED]
- **Impact**: Questions and assumptions remain linked to blockers, risk management, implementation planning, and HLD Section 12.
- **Status**: Active

### DEC-019: Approve Architecture Direction

- **Date**: 2026-09-01
- **Step**: B.1 Gate
- **Driver**: Architect
- **Decision**: Approve the validated boundary map and direction-approved design sketch; proceed to consolidated HLD drafting.
- **Rationale**: All required module boundaries, quality constraints, decision points, questions, and assumptions are explicit and accepted.
- **Alternatives rejected**: Return for scoped B.1 rework — rejected because no correction or evaluation reset was requested.
- **Evidence level**: [VALIDATED]
- **Impact**: Freezes B.1 decisions as inputs to B.2; later change requires an explicit reversal/supersession.
- **Status**: Active

### DEC-020: Approve Consolidated HLD Draft for Hardening

- **Date**: 2026-09-01
- **Step**: B.2 Gate
- **Driver**: Architect
- **Decision**: Approve HLD v0.1 and its six Proposed ADRs for B.3 review and hardening.
- **Rationale**: The draft captures the approved design direction, requirement references, decisions, and explicit blockers.
- **Alternatives rejected**: Return to B.2 for corrections — rejected because no correction was requested.
- **Evidence level**: [VALIDATED]
- **Impact**: B.3 may harden the package; ADRs remain Proposed until the later acceptance gate.
- **Status**: Active

### DEC-021: Accept Hardening Caveats; Conditional Pass

- **Date**: 2026-09-01
- **Step**: B.3 Gate
- **Driver**: Architect
- **Decision**: Accept BLK-001 through BLK-003 as significant tracked caveats and proceed to B.4 finalization.
- **Rationale**: No blocker invalidates the design; caveats are owned, explicit, and isolated from the approved architecture direction.
- **Alternatives rejected**: Reclassify a caveat as blocking — rejected by architect acceptance.
- **Evidence level**: [VALIDATED]
- **Impact**: Final handoff must retain the three caveats and no implementation/deployment claim may conceal them.
- **Status**: Active

### DEC-022: Approve Final HLD and Accept ADR-001–006

- **Date**: 2026-09-01
- **Step**: B.4 Gate
- **Driver**: Architect
- **Decision**: Approve the socialization-ready HLD and transition ADR-001 through ADR-006 from Proposed to Accepted.
- **Rationale**: The final review approved the package without corrections.
- **Alternatives rejected**: Retain Proposed status — rejected because architect approval is explicit.
- **Evidence level**: [VALIDATED]
- **Impact**: The six decisions are now binding inputs to implementation planning; tracked caveats remain open.
- **Status**: Active

### DEC-023: Enforce Organization Scope at the Database Boundary

- **Date**: 2026-09-02
- **Step**: EH0003 implementation
- **Driver**: Architect
- **Decision**: Enforce the employee-to-account organization relationship with
  a composite foreign key on `(account_id, organization_id)`.
- **Rationale**: Authorization checks are necessary but insufficient on their
  own; the relational schema must reject cross-organization account links even
  if an application caller supplies tampered identifiers.
- **Alternatives rejected**: A single-column account foreign key with service-
  only organization validation — rejected because it leaves the invariant
  unenforced at the persistence boundary.
- **Evidence level**: [ASSUMPTION]
- **Impact**: Employee account links are organization-scoped by PostgreSQL;
  future repository writes must preserve this invariant.
- **Status**: Active

## Reversals

No reversals.

## Enrichment Log

| Date | Change | Source | Updated By |
| --- | --- | --- | --- |
| 2026-09-01 | Initialized architecture decision log. | Architecture Solutioning B.1.1 | Explore Agent |
| 2026-09-01 | Recorded DEC-001. | Sponsor-confirmed artifact inventory | Explore Agent |
| 2026-09-01 | Recorded DEC-002. | Architect-confirmed truth hierarchy | Explore Agent |
| 2026-09-01 | Recorded DEC-003. | Architect-confirmed ownership matrix | Explore Agent |
| 2026-09-01 | Recorded DEC-004. | Architect-confirmed dependency map | Explore Agent |
| 2026-09-01 | Recorded DEC-005. | Architect-confirmed platform-convention approach | Explore Agent |
| 2026-09-01 | Recorded DEC-006. | Architect-confirmed open-question disposition | Explore Agent |
| 2026-09-01 | Recorded DEC-007. | Architect-confirmed service boundary | Explore Agent |
| 2026-09-01 | Recorded DEC-008. | Architect-confirmed module and trigger map | Explore Agent |
| 2026-09-01 | Recorded DEC-009. | Architect-confirmed data-model sketch | Explore Agent |
| 2026-09-01 | Recorded DEC-010. | Architect-confirmed event/API map | Explore Agent |
| 2026-09-01 | Recorded DEC-011. | Architect-confirmed quality constraints | Explore Agent |
| 2026-09-01 | Recorded DEC-012 through DEC-017. | Architect-selected decision points | Explore Agent |
| 2026-09-01 | Recorded DEC-018. | Architect accepted questions and assumptions | Explore Agent |
| 2026-09-01 | Recorded DEC-019. | Architect-approved B.1 gate | Explore Agent |
| 2026-09-01 | Recorded DEC-020. | Architect-approved B.2 gate | Explore Agent |
| 2026-09-01 | Recorded DEC-021. | Architect-accepted B.3 conditional pass | Explore Agent |
| 2026-09-01 | Recorded DEC-022 and accepted ADR-001–006. | Architect-approved final HLD | Explore Agent |
| 2026-09-01 | Linked DEC-012–017 to proposed ADR-001–006. | Architecture Solutioning B.2 | Explore Agent |

## Document History

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 0.1 | 2026-09-01 | Explore Agent | Initial decision log. |
