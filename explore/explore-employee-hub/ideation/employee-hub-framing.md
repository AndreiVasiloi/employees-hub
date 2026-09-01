# Ideation Framing: Employee Hub

**Date**: 2026-08-31  
**Explore type**: Diverge-Converge  
**Phase**: A — Frame  
**Status**: Steering-team selected framings  
**Selected by**: Sponsor / Lead Engineer

## Problem Classification

| Dimension | Classification | Evidence and rationale |
|---|---|---|
| Definition level | Semi-defined | The desired leave workflow is clear, but policy, visibility, calculation, provider, and operating details remain unresolved. |
| Solution space | Wide | Greenfield application with several workflow and experience directions, bounded by security and transaction constraints. |
| Novelty needed | Adjacent | Leave-management products exist; Employee Hub explores a focused learning-project version rather than a new category. |
| Complexity | Complicated | Roles, policies, calendars, balances, approvals, audit, and concurrency interact but can be explicitly modeled and tested. |
| User state | Informed | Context, domain analysis, feasibility, personas, journey, and stakeholder-validated learning hypothesis exist. |
| Prior context | Greenfield | No implementation, legacy system, or prior architecture exists. |

## Method Routing

- **Primary method**: How Might We plus stakeholder perspectives.
- **Supporting method**: Synectics-style analogy during stimulation.
- **Pathway**: Flexibility first, then persistence on selected directions.
- **Rationale**: The goal is known, the solution space is broad, and the problem involves several roles with distinct needs.

## Framings Explored

| # | Framing | Type | Why it opens useful search space |
|---|---|---|---|
| F1 | How might we help an Employee understand balance and counted leave days before submitting? | Narrow | Targets the high-risk trust moment of calculation clarity. |
| F2 | How might we make request submission and status unambiguous without relying on email or chat follow-up? | Narrow | Targets fragmented acknowledgement and ownership. |
| F3 | How might we replace leave-request chasing with a shared workflow that is clear for Employees, actionable for Managers, and auditable for HR? | Broad | Connects the core operational roles across the end-to-end journey. |
| F4 | How might we keep leave management simple enough for a focused MVP while making rules explainable and trustworthy? | Broad | Prevents scope expansion into a complete HR platform. |
| F5 | How might we make the process impossible to trust—unclear ownership, hidden calculations, duplicate decisions—and then design against each failure? | Inverted | Uses known failure modes to surface reliability and recovery mechanisms. |
| F6 | How might leave tracking feel like parcel tracking plus a bank statement: visible lifecycle plus an explainable balance? | Analogical | Uses familiar mental models to expand transparency ideas without copying a competitor. |
| F7 | How might a Manager make a fair approval decision with only the minimum necessary employee information? | Role-specific | Explores the privacy-versus-decision-context tension. |

## Selected Framings

1. **F3 — Shared leave workflow**: Explore a coherent cross-role experience from Employee request to Manager decision and HR audit.
2. **F1 — Calculation clarity**: Explore ways to make date inclusion, balance effect, and request eligibility understandable before and after submission.

## Constraints to Preserve

### Hard constraints

- Angular frontend, NestJS/TypeScript backend, PostgreSQL, npm, and Rancher target.
- Modular monolith; one initial local organization with organization boundaries in API and persistence.
- Fixed Employee, Manager, HR, and Administrator roles; one manager approval step.
- Fictional data only; no payroll, recruiting, full HRIS, dynamic workflows, or formal compliance claims.
- Server-authoritative authorization; least privilege; organization isolation; auditable sensitive actions.
- Atomic, idempotent request, balance, decision, breakdown, and audit behavior.
- Date-only, explainable working-day calculation.

### Soft constraints

- Prefer proven, well-documented approaches.
- Responsive, keyboard-accessible browser experience.
- Provisional scoped-read p95 under 500 ms and critical-commit p95 under 1 second.
- Notification delivery is separate from committed workflow state and may be eventual.
- Initial learning scenario uses 10 employees and holiday-season peaks.

## Success Signals for Ideation

- Ideas support unassisted request completion and correct leave-effect explanation by at least 2 of 3 representative participants in a fictional-data learning test.
- Ideas preserve clear status and a recovery path after delayed, unclear, or rejected requests.
- Ideas do not weaken organization isolation, authorization, calculation correctness, auditability, or transaction safety.
- Ideas remain within a focused leave-management scope.

## Stimuli

**Method**: Structural analogy (Synectics / Bisociation) using far associations and conceptual blending.  
**Selected by**: Sponsor / Lead Engineer on 2026-08-31.

| ID | Input domains | Shared structure | Stimulus | Emergent question | Status |
|---|---|---|---|---|---|
| S1 | Parcel tracking + leave approval | A stateful item moves between responsible owners and can stall | Treat a leave request as accountable hand-offs, showing current owner and next action without exposing private internals. | How should a committed decision be distinguished from a notification that may arrive later? | Selected |
| S2 | Bank statement + leave calculation | A user needs to trust a changing balance | Make request impact understandable through a before/after record of counted dates, excluded dates, and balance change. | How can one explanation remain valid when policy, holiday, or schedule configuration changes later? | Selected |
| S3 | Airport-slot coordination + team leave | One booking affects shared availability without requiring broad disclosure | Give a Manager minimum-necessary team-impact context for a fair decision. | What availability signal is enough without exposing sensitive reasons or unrestricted employee data? | Not selected |

S1 and S2 seed the next divergence phase. They are exploratory prompts, not committed product features or architecture decisions.

## Discovery Sources

- [Context](../context.md)
- [Hypothesis](../hypothesis.md)
- [Domain Analysis](../domain-analysis.md)
- [Technical Feasibility](../technical-feasibility.md)
- [Personas](../../domain/personas-employee-hub.md)
- [Journey J1](../../domain/journey-employee-hub.md)
- [Market Research](../market-research.md)
