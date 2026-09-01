+++
[metadata]
epic_id = "EH-E4"
last_updated = "2026-09-01"

[epochs]
  [epochs.0]
  name = "Manager Decision and Availability"
  started = "2026-09-01"
  jira_key = ""
+++

# Epic: Manager Decision and Availability

**Epic ID:** EH-E4  
**Domain:** Employee Leave Management  
**Source:** [PRD E4](../prds/employee-hub-prd.md#epic-extraction)  
**Owner:** Andrei  
**Status:** Draft

## Objective

Enable an assigned manager to make one accountable decision on each direct-report request using only the minimum necessary request, balance-effect, and team-availability context.

## Scope & Boundaries

**In scope:** scoped pending queue, approve/reject decision, exactly-once decision behavior, privacy-aware team availability, employee-visible final status, audit/outbox intent.

**Out of scope:** multiple approvers, configurable workflow steps, cross-team visibility, sensitive leave notes, and HR balance correction.

## Key Behaviors

1. Only the current assigned manager can view and decide eligible direct-report requests.
2. A decision is committed once with the resulting balance effect and audit evidence.
3. Availability communicates coverage without unnecessary leave detail.

## Acceptance Criteria

- [ ] R-005, R-006, and R-015 acceptance criteria pass.
- [ ] Self-approval, repeated/concurrent decisions, cross-manager, cross-team, and cross-organization attempts are rejected.
- [ ] Applicable privacy, audit, lifecycle, accessibility, and performance NFRs pass.

## Dependencies

| Dependency | Type |
| --- | --- |
| EH-E1 to EH-E3 | Blocking |
| Manager visibility/privacy field decision | Blocking product detail |

## Technical Considerations

- Preserve the explicit permission matrix and transactional decision boundary.
- Team availability is a scoped projection, not a general employee leave disclosure.

## Risks & Mitigations

| Risk | Mitigation |
| --- | --- |
| Excessive manager visibility | Minimum-necessary field policy and negative authorization tests |

## Links & References

- [PRD](../prds/employee-hub-prd.md), [accessibility specification](../design/accessibility-employee-hub.md)

## Manager Decision and Availability

Deliver one scoped manager decision path and privacy-aware availability context for direct-report requests.
