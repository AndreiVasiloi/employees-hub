# Idea Evaluation: Employee Hub

**Date**: 2026-08-31  
**Explore type**: Diverge-Converge  
**Phase**: E — Converge  
**Status**: Shortlist selected by steering team  
**Source ideas**: [Raw Ideas](employee-hub-ideas-raw.md)  
**Cluster map**: [Idea Clusters](employee-hub-idea-clusters.md)  
**Selection policy**: Portfolio mix

## Evaluation Criteria

| Criterion | Priority | Interpretation |
|---|---|---|
| Security and privacy | Pass/fail | Organization isolation, fixed-role authorization, minimum data, auditability |
| Impact | High | Improvement to clarity, status, recovery, or trust |
| Feasibility | High | Fit with Angular, NestJS, PostgreSQL, modular monolith, learning scope |
| Correctness risk | High | Exposure to balance, decision, historical, or committed-state errors; Low is better |
| Scope alignment | High | Fit with focused leave management |
| Persona fit | Medium | Fit with sponsor-approved personas; direct research absent |
| Learning value | Medium | Full-stack, security, transaction, testing, deployment learning |
| Novelty | Low | Useful difference, subordinate to correctness |

Scores are relative High/Medium/Low judgments grounded in Discovery. Risk exposure uses Low as the favorable result. I-18 is excluded from product scoring because it is a validation mechanism.

## Batch Evaluation

### Batch 1

| Idea | Security | Impact | Feasibility | Risk exposure | Alignment | Persona fit | Learning | Novelty |
|---|---|---|---|---|---|---|---|---|
| I-01 | Pass | H | H | L | H | M | H | L |
| I-02 | Pass | H | M | M | H | M | H | M |
| I-03 | Pass | H | M | M | H | M | M | L |
| I-04 | Pass | H | H | M | H | M | H | L |

### Batch 2

| Idea | Security | Impact | Feasibility | Risk exposure | Alignment | Persona fit | Learning | Novelty |
|---|---|---|---|---|---|---|---|---|
| I-05 | Pass | H | M | M | H | M | H | M |
| I-06 | Pass | H | H | L | H | M | H | M |
| I-07 | Pass | H | M | M | H | M | H | M |
| I-08 | Pass | M | H | L | H | M | H | L |

### Batch 3

| Idea | Security | Impact | Feasibility | Risk exposure | Alignment | Persona fit | Learning | Novelty |
|---|---|---|---|---|---|---|---|---|
| I-09 | Pass | H | H | L | H | M | M | L |
| I-10 | Pass | H | M | M | H | M | H | M |
| I-11 | Pass | H | H | L | H | M | H | L |
| I-12 | Pass | H | M | M | H | M | H | M |

### Batch 4

| Idea | Security | Impact | Feasibility | Risk exposure | Alignment | Persona fit | Learning | Novelty |
|---|---|---|---|---|---|---|---|---|
| I-13 | Pass | H | M | M | H | M | H | M |
| I-14 | Pass | H | M | M | H | M | H | M |
| I-15 | Pass | M | H | L | H | M | M | L |
| I-16 | Pass | M | H | L | H | M | M | L |

### Batch 5

| Idea | Security | Impact | Feasibility | Risk exposure | Alignment | Persona fit | Learning | Novelty |
|---|---|---|---|---|---|---|---|---|
| I-17 | Pass | H | M | L | H | M | H | M |
| P-A1 | Pass | H | M | M | H | H | H | M |
| P-A2 | Pass | H | M | M | H | M | H | M |
| P-A3 | Pass | H | H | L | H | H | M | M |

### Batch 6

| Idea | Security | Impact | Feasibility | Risk exposure | Alignment | Persona fit | Learning | Novelty |
|---|---|---|---|---|---|---|---|---|
| P-A4 | Pass | H | M | M | H | M | H | L |
| P-A5 | Pass | M | M | M | H | M | H | M |
| P-B1 | Pass | H | H | L | H | H | H | M |
| P-B2 | Pass | H | M | M | H | H | M | M |

### Batch 7

| Idea | Security | Impact | Feasibility | Risk exposure | Alignment | Persona fit | Learning | Novelty |
|---|---|---|---|---|---|---|---|---|
| P-B3 | Pass | H | H | L | H | H | H | M |
| P-B4 | Pass | H | M | L | H | M | H | M |
| P-B5 | Pass | H | M | M | H | M | H | M |
| P-C1 | Pass | H | H | M | H | M | H | M |

### Batch 8

| Idea | Security | Impact | Feasibility | Risk exposure | Alignment | Persona fit | Learning | Novelty |
|---|---|---|---|---|---|---|---|---|
| P-C2 | Pass | H | M | M | H | M | H | M |
| P-C3 | Pass | H | M | M | H | M | H | M |
| P-C4 | Pass | M | H | M | H | M | H | M |
| P-C5 | Pass | M | M | L | M | M | H | M |

## Batch Interpretation

- **C1 explainable commitments** scored strongly on impact, alignment, and learning; its main risk is calculation/versioning complexity.
- **C2 workflow ownership** scored strongly on impact and feasibility; recovery and fallback policy remain uncertain.
- **C3 role views and oversight** passed the security gate because ideas minimize or explain access rather than broaden it; direct persona evidence is weak.
- **C4 configuration readiness** scored strongly on prevention and learning but can add administrative friction.
- No idea failed the security/privacy gate at this abstraction level. Detailed design may still reveal a failure.

## Bias Checks

| Check | Result | Response |
|---|---|---|
| Anchoring | Pass | I-01 was not automatically selected as the best standalone idea; shortlist is composite. |
| Fixation | Pass | Shortlist spans C1, C2, C3, and C4 rather than one cluster. |
| Availability/familiarity | Caution | Tracking and statement patterns are familiar; they remain because they support correctness and clarity, not because familiarity was scored as novelty. |
| Homogeneity | Pass | Employee trust, workflow reliability, privacy, and configuration are all represented. |
| Sycophancy | Pass | Alternatives were generated and clustered before adopting the steering team’s choices. |
| Novelty | Intentional low weight | Employee Hub is an adjacent learning project, not a breakthrough-category initiative. |

## Shortlist and Devil’s Advocate

### Candidate 1: Explainable Leave Receipt

**Source ideas**: I-02, I-04, I-09, I-14, I-16, P-A1–P-A5.

Combines date breakdown, policy context, before/after balance, and durable balance-history evidence.

- **Strongest argument against**: It may overwhelm Employees with details they do not want.
- **Failure scenario**: Configuration changes make the recorded explanation irreproducible.
- **Resistant stakeholder**: An Employee seeking a very fast request or an HR reviewer concerned about incorrect policy wording.
- **Trade-off**: More transparency requires careful information hierarchy and historical calculation evidence.

### Candidate 2: Tracked Request and Recovery

**Source ideas**: I-01, I-03, I-06, I-11, I-12, I-15, I-17, P-B1–P-B5.

Combines committed receipt, ownership, visible state, retry safety, exception explanations, and next actions.

- **Strongest argument against**: It may over-engineer a one-step approval.
- **Failure scenario**: Manager absence or invalid configuration creates a status with no legitimate recovery route.
- **Resistant stakeholder**: A Manager who sees explicit ownership as monitoring or administrative pressure.
- **Trade-off**: Status clarity depends on product decisions about fallback authority and timing.

### Candidate 3: Safe Operational Readiness

**Source ideas**: I-05, I-07, I-08, I-10, I-13, P-C1–P-C5.

Combines HR readiness checks, minimum-necessary Manager views, role-aware denied-action explanations, and auditable administrative changes.

- **Strongest argument against**: Controls may create too much setup and friction before the core Employee workflow works.
- **Failure scenario**: Unknown policy and visibility rules make readiness appear complete when it is not.
- **Resistant stakeholder**: HR or Administrators who prefer flexible manual exceptions.
- **Trade-off**: Prevention and privacy increase configuration and governance work.

## Portfolio Decision

The portfolio mix intentionally covers:

1. **Employee trust** — Explainable Leave Receipt.
2. **Workflow reliability** — Tracked Request and Recovery.
3. **Safe administration** — Safe Operational Readiness.

**Steering team decision**: Refine all three candidates.  
**Decision date**: 2026-08-31.  
**Rationale**: Together they cover the core journey, the highest-risk calculation rules, and safe role/configuration boundaries without expanding into a complete HR platform.

## Discovery Evidence Used

- [Hypothesis](../hypothesis.md): success metrics and low-confidence user assumptions.
- [Technical Feasibility](../technical-feasibility.md): transaction, authorization, performance, and audit guardrails.
- [Context](../context.md): scope, stakeholders, and hard constraints.
- [Personas](../../domain/personas-employee-hub.md): role needs, explicitly assumption-heavy.
- [Market Research](../market-research.md): adjacent category and competitor context.

