# Idea Clusters: Employee Hub

**Date**: 2026-08-31  
**Explore type**: Diverge-Converge  
**Phase**: D — Externalize  
**Status**: Steering-team approved clustering  
**Source**: [Raw Ideas](employee-hub-ideas-raw.md)

## Summary

- Raw ideas clustered: 32 product or workflow ideas
- Clusters formed: 4
- Orphans: 1 validation mechanism
- Bridges: 3
- Evaluation status: not evaluated

## Clusters

### C1: Explainable Leave Commitments

**Thesis**: Ideas that turn dates, policy inputs, and balance changes into an understandable record employees can trust.

| Member ideas | Main journey stage | Primary personas |
|---|---|---|
| I-02, I-04, I-09, I-14, I-16 | Prepare request; Receive decision and recover | P1 Employee; P3 HR Administrator |
| P-A1, P-A2, P-A3, P-A4, P-A5 | Prepare request; Receive decision and recover | P1 Employee; P2 Manager; P3 HR Administrator |

**Mechanism**: Make working-day inclusion, policy context, balance effect, and historical record explainable at the point a request is prepared, decided, or reviewed.

### C2: Reliable Workflow Ownership and Recovery

**Thesis**: Ideas that make the request’s owner, committed state, exceptions, and next action visible across hand-offs.

| Member ideas | Main journey stage | Primary personas |
|---|---|---|
| I-01, I-03, I-06, I-11, I-12, I-15, I-17 | Submit and wait; Receive decision and recover | P1 Employee; P2 Manager |
| P-B1, P-B2, P-B3, P-B4, P-B5 | Prepare request; Submit and wait; Receive decision and recover | P1 Employee; P2 Manager |

**Mechanism**: Treat request progression as accountable hand-offs with a committed state, clear exception explanation, and safe recovery rather than a message sent into an opaque queue.

### C3: Minimum-necessary Role Views and Oversight

**Thesis**: Ideas that help Managers, HR, and Administrators act safely without exposing unnecessary employee detail.

| Member ideas | Main journey stage | Primary personas |
|---|---|---|
| I-07, I-08, I-13 | Manager decision; administrative oversight | P2 Manager; P3 HR Administrator; P4 Organization Administrator |
| P-C1, P-C2, P-C4, P-C5 | Manager decision; recovery; administrative oversight | P1–P4 |

**Mechanism**: Match data visibility and explanations to role responsibility, preserve audit evidence, and make access limits understandable.

### C4: Configuration Readiness Before Employee Failure

**Thesis**: Ideas that prevent invalid requests by ensuring policy, calendar, schedule, and reporting data are ready first.

| Member ideas | Main journey stage | Primary personas |
|---|---|---|
| I-05, I-10, P-C3 | Find guidance; Prepare request | P1 Employee; P3 HR Administrator |

**Mechanism**: Detect missing or invalid organization configuration early and direct the responsible role to fix it before an Employee reaches a misleading submission failure.

## Orphan

| Idea | Why it is separate |
|---|---|
| I-18 — fictional-data walkthrough | A learning and validation mechanism, not a product/workflow mechanism. It should inform testing and usability validation rather than product selection. |

## Bridges

| Idea | Connects | Why it matters |
|---|---|---|
| I-05 — request preflight | C1 and C4 | Calculation clarity depends on configuration readiness. |
| I-08 — authorized request timeline | C2 and C3 | Workflow status and audit/oversight share a traceable history. |
| P-C4 — role-specific denied-action explanation | C2 and C3 | Recovery guidance must respect role scope and privacy. |

## Cluster Relationships

| From | Relationship | To | Implication |
|---|---|---|---|
| C1 | Combines | C2 | An employee can understand both the request’s effect and where it is in the workflow. |
| C2 | Depends on | C4 | Reliable routing and recovery require policy, manager, calendar, and schedule data to be valid. |
| C3 | Constrains | C2 | More Manager context must not turn into broad employee-data exposure. |
| C3 | Supports | C1, C2, C4 | Audit and role-aware visibility make calculation, workflow, and configuration changes trustworthy. |

## Steering Team Validation

The Sponsor / Lead Engineer approved this cluster map on 2026-08-31. No ideas have been evaluated or selected for solution design yet.

