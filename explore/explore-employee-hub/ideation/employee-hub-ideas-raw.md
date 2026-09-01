# Raw Ideas: Employee Hub

**Date**: 2026-08-31  
**Explore type**: Diverge-Converge  
**Phase**: C — Diverge  
**Status**: Raw ideas captured; not evaluated  
**Selected framings**: F3 shared leave workflow; F1 calculation clarity  
**Selected stimuli**: S1 tracked hand-off; S2 explainable commitment record  
**Methods**: Flexibility generation; persistence generation with SCAMPER transforms  
**Primitives**: generate, transform  
**Total ideas**: 33

## Guardrails

Ideas in this document are exploratory, not commitments. Later evaluation must reject anything that weakens organization isolation, fixed-role authorization, transaction safety, auditability, or the focused MVP boundary.

## Flexibility Pass

| ID | Category | Raw idea |
|---|---|---|
| I-01 | Status | A request has a visible current-owner and next-action state throughout its lifecycle. |
| I-02 | Calculation | A date-by-date receipt shows counted days, excluded days, and why each was treated that way. |
| I-03 | Recovery | A delayed request exposes a clear follow-up path rather than leaving the employee to guess whom to contact. |
| I-04 | Balance | A before/after balance view links the change directly to the request decision. |
| I-05 | Guidance | A request preflight explains missing policy, manager, balance, or date information before submission. |
| I-06 | Trust | Every employee status distinguishes committed workflow state from notification-delivery state. |
| I-07 | Manager | A decision view shows only the team-impact information needed to approve or reject. |
| I-08 | Audit | An authorized request timeline replays what changed, by whom, and when. |
| I-09 | Explanation | An employee can switch between a simple balance summary and a detailed calculation view. |
| I-10 | Configuration | HR sees a readiness checklist for policy, holiday, schedule, and manager data before requests are enabled. |
| I-11 | Exception | A request conflict returns a human-readable explanation with a safe next action. |
| I-12 | Handoff | Approval ownership is explicit, including a defined recovery path when the expected manager is unavailable. |
| I-13 | Privacy | Team availability conveys absence impact without showing leave reasons. |
| I-14 | History | Balance history reads like a statement: each entry has a reason, source request, and resulting balance. |
| I-15 | Confirmation | Submission produces a durable reference usable when seeking support. |
| I-16 | Policy | Policy explanation appears in the context of selected leave type and dates. |
| I-17 | Resilience | Retried submissions receive the original committed outcome instead of creating duplicate requests. |
| I-18 | Learning | A fictional-data walkthrough validates calculation understanding before real use. |

## Persistence Pass

### Cluster A: Calculation and Balance Explanation

| ID | Transform | Variant | Persona / journey target | Assumption challenged |
|---|---|---|---|---|
| P-A1 | Combine | Combine date breakdown, balance impact, and policy rule into one pre-submit explanation card. | P1; Prepare request | Employees need all three explanations together. |
| P-A2 | Adapt | Adapt a bank-statement pattern: each balance effect has a source request, amount, and resulting total. | P1, P3; Receive decision | Ledger-style history improves trust. |
| P-A3 | Modify | Offer progressive detail: a simple total by default, with expanded per-date evidence only when requested. | P1; Prepare request | Detail can be understandable without overwhelming. |
| P-A4 | Eliminate | Remove manual day counting by making the server result the only authoritative calculation and showing its explanation. | P1, P2; Prepare request / approve | Manual calculation is a main source of uncertainty. |
| P-A5 | Reverse | Start with the intended leave outcome and work backward to reveal dates/policy inputs that prevent submission. | P1; Prepare request | A reverse explanation helps recovery from invalid requests. |

### Cluster B: Reliable Request Hand-offs and Recovery

| ID | Transform | Variant | Persona / journey target | Assumption challenged |
|---|---|---|---|---|
| P-B1 | Combine | Combine request status, current owner, and next action into a single workflow timeline. | P1, P2; Submit and wait | One view reduces follow-up uncertainty. |
| P-B2 | Adapt | Adapt parcel exception handling: a stalled request displays the reason category and safe route to resolve it. | P1; Receive decision and recover | Employees can self-direct recovery when the cause is clear. |
| P-B3 | Substitute | Replace “sent” acknowledgement with a durable committed reference and request state. | P1; Submit and wait | A committed receipt is more trustworthy than a delivery message. |
| P-B4 | Eliminate | Remove duplicate-submission anxiety by disabling repeated commands while the committed result is pending and returning the original outcome on retry. | P1; Submit and wait | Retry-safe behavior improves trust without user effort. |
| P-B5 | Reverse | Surface the expected approver and unresolved prerequisite before submission, rather than only after a request stalls. | P1, P2; Prepare request | Early ownership visibility prevents orphaned requests. |

### Cluster C: Role-aware Administration and Privacy

| ID | Transform | Variant | Persona / journey target | Assumption challenged |
|---|---|---|---|---|
| P-C1 | Eliminate | Remove leave-reason fields from the default manager approval view. | P2, P1; Manager decision | Minimum-necessary data is enough for a fair decision. |
| P-C2 | Combine | Combine team availability with explicit privacy labels that explain what information is intentionally hidden. | P2; Manager decision | Managers can trust a limited view when its limits are clear. |
| P-C3 | Adapt | Adapt a configuration preflight: HR cannot activate request availability until essential policy, holiday, schedule, and manager data are complete. | P3; Before request journey | Configuration gaps should be caught before employees fail. |
| P-C4 | Modify | Provide role-specific “why can’t I do this?” explanations for denied actions without leaking sensitive information. | P1–P4; Recovery | Clear denial explanations improve support and correct use. |
| P-C5 | Reverse | Show an administrator the audit consequence before a high-impact access change, then require the explicit change. | P4; Administrative oversight | Pre-change traceability reduces unsafe broad access. |

## Fixation Interventions

- Switched categories after no more than two consecutive ideas in one area during flexibility generation.
- Forced a privacy/administration cluster after workflow and calculation ideas began to dominate.
- Retained potentially difficult ideas such as progressive calculation detail and pre-change audit preview for later evaluation.

## Flagged Ideas

- **P-A3**: May balance clarity and detail through progressive disclosure; needs user testing.
- **P-B2**: Depends on defining safe recovery routes without inventing unsupported policy.
- **P-C2**: May resolve the Manager context/privacy tension; needs representative manager/employee validation.
- **P-C5**: May add valuable security learning but could be beyond the first employee workflow increment.

## Discovery Links

- [Framing](employee-hub-framing.md)
- [Hypothesis](../hypothesis.md)
- [Journey J1](../../domain/journey-employee-hub.md)
- [Personas](../../domain/personas-employee-hub.md)
- [Domain Analysis](../domain-analysis.md)
- [Technical Feasibility](../technical-feasibility.md)

