+++
[metadata]
epic_id = "EH-E5"
last_updated = "2026-09-01"

[epochs]
  [epochs.0]
  name = "HR Corrections and Audit"
  started = "2026-09-01"
  jira_key = ""
+++

# Epic: HR Corrections and Audit

**Epic ID:** EH-E5  
**Domain:** Employee Leave Management  
**Source:** [PRD E5](../prds/employee-hub-prd.md#epic-extraction)  
**Owner:** Andrei  
**Status:** Draft

## Objective

Allow authorized HR users to perform controlled balance corrections and authorized reviewers to investigate immutable workflow and balance evidence.

## Scope & Boundaries

**In scope:** controlled adjustments, balance history, audit investigation, authorization/field boundaries, correlation and durable evidence.

**Out of scope:** rewriting past ledger/audit records, payroll reconciliation, arbitrary role administration, or external reporting.

## Key Behaviors

1. An authorized correction creates an immutable balance transaction and audit event.
2. Reviewers can trace authorized workflow and balance changes without sensitive overexposure.
3. Correction failures never create partial evidence or unauthorized disclosure.

## Acceptance Criteria

- [ ] R-008, R-010, and R-014 acceptance criteria pass.
- [ ] Ledger/audit immutability, scope, safe errors, and investigation paths are integration tested.
- [ ] Applicable authorization, transaction, observability, accessibility, and performance NFRs pass.

## Dependencies

| Dependency | Type |
| --- | --- |
| EH-E1 to EH-E4 | Blocking |
| Audit/ledger query design | Blocking technical detail |

## Technical Considerations

- Audit & Notification and Workflow & Balances coordinate through explicit application services.
- ADR-004 preserves durable notification intent without making it a workflow rollback mechanism.

## Risks & Mitigations

| Risk | Mitigation |
| --- | --- |
| Correction erases trust/evidence | Append-only transactions/audit and strict authorization |

## Links & References

- [HLD](../hlds/employee-hub-hld.md), [ADR-004](../decisions/employee-hub-adr-004-transactional-outbox-worker.md)

## HR Corrections and Audit

Deliver controlled HR balance corrections and immutable, authorized investigation evidence.
