# Refined Concepts: Employee Hub

**Date**: 2026-08-31  
**Explore type**: Diverge-Converge  
**Phase**: F — Refine  
**Status**: Steering-team approved  
**Signal**: [Employee Hub Leave Management](../../../signal/signals/20260827-employee-hub-leave-management.md)

## Session Summary

- **Problem**: Leave information, decisions, calculations, and audit evidence may be fragmented across inconsistent processes.
- **Framings used**: F3 shared leave workflow; F1 calculation clarity.
- **Methods used**: How Might We, structural analogy, flexibility generation, SCAMPER persistence, affinity clustering, portfolio evaluation.
- **Total ideas generated**: 33.
- **Product/workflow ideas evaluated**: 32.
- **Clusters formed**: 4.
- **Concepts refined**: 3.
- **Loops completed**: 0.
- **Fixation interventions**: category switching, forced privacy/administration cluster, portfolio shortlist.
- **Validation mechanism retained**: I-18 fictional-data walkthrough.

## Discovery Evidence Used

- [Context](../context.md): focused organization-scoped leave workflow, fixed roles, one approval, and assumption catalogue.
- [Hypothesis](../hypothesis.md): low-confidence Employee problem hypothesis and three-participant learning threshold.
- [Personas](../../domain/personas-employee-hub.md): sponsor-approved role capabilities; experience details remain assumptions.
- [Journey J1](../../domain/journey-employee-hub.md): assumed guidance, preparation, submission, waiting, and recovery pain points.
- [Domain Analysis](../domain-analysis.md): working-day, balance, lifecycle, organization, authorization, and audit invariants.
- [Market Research](../market-research.md): established leave-management category; differentiation is not proven.
- [Technical Feasibility](../technical-feasibility.md): transaction, concurrency, security, privacy, notification, and configuration risks.

## Concept 1: Explainable Leave Receipt

### Description

The Explainable Leave Receipt makes a leave request understandable as a durable calculation and balance record. Before submission, the Employee sees the applicable leave type and policy context, which dates count, which dates are excluded, and the projected balance effect. After a decision, the receipt shows the committed outcome and links it to balance history.

The default presentation is concise, with date-level and policy evidence available progressively. It does not make the browser authoritative: the server calculates and commits the result.

### Journey Mechanism

| Journey stage | Concept behavior |
|---|---|
| Find guidance | Present applicable leave information in the context of the selected leave type. |
| Prepare request | Show server-produced date breakdown and projected before/after balance. |
| Submit and wait | Preserve a durable receipt reference and calculation evidence. |
| Receive decision and recover | Show committed decision, final balance effect, and related balance-history entry. |

### Value Proposition

- **P1 Employee**: understands request eligibility and balance effect.
- **P2 Manager**: sees decision impact without unrestricted ledger access.
- **P3 HR Administrator**: investigates disputes using reproducible evidence.

### Differentiation

The concept emphasizes explanation and historical reproducibility rather than claiming a novel leave-management category. Market differentiation remains unvalidated.

### Constraints

- **Met**: server-authoritative calculation, date-only leave semantics, immutable audit/balance evidence, fictional data, focused leave scope.
- **Supported**: responsive progressive detail; scoped read/command performance budgets.
- **Not yet met**: effective policy/schedule/calendar snapshot design, validated leave rules, and direct evidence that Employees want this level of detail.

### Risks

| Risk | Likelihood | Impact | Mitigation | Source |
|---|---|---|---|---|
| Incorrect working-day calculation | High | High | Worked examples, property tests, immutable day breakdown | Technical Feasibility TR-03 |
| Configuration change alters historical meaning | Medium | High | Effective versions or request snapshots | Technical Feasibility TR-04 |
| Explanation overwhelms Employees | Medium | Medium | Progressive detail and usability test | New from ideation |
| Balance projection differs from ledger | Medium | High | Transactional update and reconciliation test | Domain Analysis R-06 |

### Assumptions and Next Step

- **A3**: Employees can understand the explanation. Status: Untested.
- **AT-3**: Date, balance, and concurrency rules can be consistent. Status: Untested.
- **Validate**: test simple and detailed receipt views with three representative Employees.
- **Prototype**: fictional annual-leave examples including weekend, holiday, conflict, and insufficient balance.
- **Consult**: Employee and HR representatives; Lead Engineer for calculation evidence.
- **Go/no-go**: proceed if at least 2 of 3 participants complete the request and correctly explain the leave effect, and worked examples are deterministic.

## Concept 2: Tracked Request and Recovery

### Description

Tracked Request and Recovery treats a leave request as an accountable sequence of committed states rather than a message sent to a Manager. The Employee receives a durable request reference, sees the responsible role and current state, and receives a safe next action for rejection, conflict, missing configuration, or stalled routing.

Notification delivery remains separate from business state. Retried commands return the original committed outcome rather than creating duplicate requests or balance effects.

### Journey Mechanism

| Journey stage | Concept behavior |
|---|---|
| Prepare request | Show expected approver and unresolved prerequisite before submission. |
| Submit and wait | Return durable reference, committed state, current owner, and next action. |
| Receive decision and recover | Explain approval, rejection, conflict, or stalled routing with a safe path. |
| Retry/failure | Preserve one request and one balance effect under duplicate command attempts. |

### Value Proposition

- **P1 Employee**: knows whether the request exists, who acts next, and how to recover.
- **P2 Manager**: receives a clear pending-decision responsibility.
- **P3 HR Administrator**: traces exceptions and committed state without reconstructing messages.

### Differentiation

The concept prioritizes committed workflow truth over notification delivery. This is an architecture-aware trust mechanism, not a proven market differentiator.

### Constraints

- **Met**: one approval step, committed online commands, idempotency, auditability, notification separation, fixed roles.
- **Supported**: clear structured errors and explicit recovery.
- **Not yet met**: manager absence/fallback policy, status timing expectations, notification channels, and validated cancellation/edit behavior.

### Risks

| Risk | Likelihood | Impact | Mitigation | Source |
|---|---|---|---|---|
| Retry or concurrency duplicates effects | Medium | High | Idempotency, unique decision, transaction, conflict tests | Technical Feasibility TR-02 |
| Notification failure looks like workflow failure | Medium | Medium | Separate business and delivery status | Technical Feasibility TR-07 |
| Request has no available approver | Medium | High | Validate fallback/administrative recovery before implementation | Domain Analysis U-09 |
| Ownership feels like performance monitoring | Low | Medium | Show responsibility, not response-time scoring | New from ideation |

### Assumptions and Next Step

- **A6/AO-1**: one Manager approval step is sufficient. Status: Untested.
- **AS-2**: Employees need clearer request status and recovery. Status: Untested.
- **Validate**: test submitted, approved, rejected, conflicted, and stalled timeline scenarios.
- **Prototype**: clickable workflow timeline plus PostgreSQL idempotency/concurrency spike.
- **Consult**: Employee, Manager, and HR representatives.
- **Go/no-go**: proceed if participants correctly identify status and next action, and technical tests prove one request, one final decision, and one balance effect under retry.

## Concept 3: Safe Operational Readiness

### Description

Safe Operational Readiness prevents avoidable employee failures by checking whether the organization has the minimum policy, schedule, holiday, balance, and Manager data required for leave requests. HR receives actionable readiness guidance rather than allowing an apparently valid request flow to fail unpredictably.

The concept also gives each role the minimum necessary information: Managers see team impact without sensitive leave reasons, denied actions explain safe corrective steps without leaking data, and high-impact administrative changes remain auditable.

### Journey Mechanism

| Journey or role stage | Concept behavior |
|---|---|
| Before Employee use | HR sees missing organization configuration and responsible corrective action. |
| Find guidance / Prepare request | Employee receives a configuration-needed state instead of fabricated balance or success. |
| Manager decision | Manager receives minimum necessary request and team-impact context. |
| Administrative oversight | Access/configuration changes produce explicit audit evidence and scoped explanations. |

### Value Proposition

- **P1 Employee**: avoids misleading or late failures.
- **P2 Manager**: receives sufficient decision context without broad private data.
- **P3 HR Administrator**: fixes configuration gaps before workflow use.
- **P4 Organization Administrator**: maintains accountable access and security-sensitive history.

### Differentiation

The concept combines configuration readiness with privacy-aware role views. Its user value and market distinctiveness remain unvalidated.

### Constraints

- **Met**: least privilege, organization isolation, fixed roles, auditability, no default sensitive reasons, fictional data.
- **Supported**: configuration-readiness messaging and negative authorization testing.
- **Not yet met**: exact access matrix, identity-provider mapping, policy completeness definition, and representative Manager/HR validation.
- **Scope guard**: readiness does not expand into full HRIS administration.

### Risks

| Risk | Likelihood | Impact | Mitigation | Source |
|---|---|---|---|---|
| Cross-organization data exposure | Medium | High | Central scope resolution, persistence constraints, negative tests | Technical Feasibility TR-01 |
| Identity/role mapping incomplete | Medium | High | Threat model, claims decision, integration tests | Technical Feasibility TR-05 |
| Readiness gates create excessive setup | Medium | Medium | Define minimum viable readiness and allow safe staged configuration | New from ideation |
| Manager view reveals too much or too little | Medium | High | Employee/Manager scenario validation and field-level tests | Hypothesis A4 / Domain Analysis R-05 |

### Assumptions and Next Step

- **A4**: minimum-necessary Manager visibility supports decisions. Status: Untested.
- **AS-3**: Managers need consolidated approvals and availability. Status: Untested.
- **AT-2**: organization isolation can be enforced reliably. Status: Untested.
- **Validate**: review readiness and visibility scenarios with Manager/HR representatives.
- **Prototype**: readiness checklist, Manager decision card, denied-action states, and authorization test matrix.
- **Consult**: Manager, HR, Administrator/security reviewer, Lead Engineer.
- **Go/no-go**: proceed if configuration gaps are caught before submission, Managers can decide without sensitive detail, and all out-of-scope authorization tests are denied.

## Concept Comparison

| Dimension | Explainable Leave Receipt | Tracked Request and Recovery | Safe Operational Readiness |
|---|---|---|---|
| Impact | High | High | High |
| Feasibility | Medium | High | Medium |
| Novelty | Medium | Low–Medium | Medium |
| Risk exposure | Medium | Medium | Medium |
| Time to validate | One small usability session plus calculation examples | One workflow session plus technical spike | Role scenarios plus authorization matrix |
| Key assumption | Explanation improves understanding | Visible committed status reduces uncertainty | Readiness/privacy controls help rather than obstruct |

## Steering Team Decision

- **Selected for pursuit**: all three refined concepts.
- **Approved by**: Sponsor / Lead Engineer.
- **Decision date**: 2026-08-31.
- **Rationale**: the portfolio covers Employee trust, workflow reliability, and safe administration while preserving the focused leave-management boundary.
- **Immediate next step**: use the concepts as direction seeds in Explore Solution Design; do not treat them as committed requirements until PRD and architecture decisions validate them.

## Session Assessment

| Loop-back condition | Status | Outcome |
|---|---|---|
| Top candidates all from one cluster | No | Portfolio spans calculation, workflow, privacy, and configuration. |
| Best concept contains unresolved contradiction | No | Known privacy/context and simplicity/reliability tensions have validation paths. |
| Concepts are acceptable but lack team interest | No | Steering team approved all three. |
| Missing parameters prevent refinement | No | Open rules are documented and carried forward. |
| Novelty too low for initiative goal | No | Adjacent, proven-choice direction is intentional. |

No ideation loop is required.

## Solution Design Seeding

- **Experience direction**: one coherent journey combining readiness, explainable calculation, committed tracking, role-specific decision, and recovery.
- **Architecture implications to explore**: historical calculation evidence; request state machine; idempotent command handling; role/scoping policy; configuration-readiness rules; audit and notification boundaries.
- **Risk areas**: calculation correctness, concurrency, configuration versioning, identity mapping, privacy, fallback approval, scope growth.
- **User-flow implications**: preflight, submit, track, approve/reject, conflict recovery, configuration correction, administrative audit.
- **Open questions**: leave types/rules, balance reservation, overlap, edit/cancel, fallback approver, Manager visibility, identity provider, notification channels.
- **Validation mechanism**: use I-18 fictional-data walkthrough with the three-participant learning threshold.

## Ideation Artifacts

- [Framing and Stimuli](employee-hub-framing.md)
- [Raw Ideas](employee-hub-ideas-raw.md)
- [Idea Clusters](employee-hub-idea-clusters.md)
- [Evaluation](employee-hub-evaluation.md)

