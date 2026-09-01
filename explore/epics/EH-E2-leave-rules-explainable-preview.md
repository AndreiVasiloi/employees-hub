+++
[metadata]
epic_id = "EH-E2"
last_updated = "2026-09-01"

[epochs]
  [epochs.0]
  name = "Leave Rules and Explainable Preview"
  started = "2026-09-01"
  jira_key = ""
+++

# Epic: Leave Rules and Explainable Preview

**Epic ID:** EH-E2  
**Domain:** Employee Leave Management  
**Source:** [PRD E2](../prds/employee-hub-prd.md#epic-extraction)  
**Owner:** Andrei  
**Status:** Draft

## Objective

Enable HR to establish minimum leave readiness and let employees receive an explainable, server-produced preview of eligible dates and balance effect before submission.

## Scope & Boundaries

**In scope:** leave types/policies, work schedule, holiday calendar, public holidays, organization time zone, readiness checks, date breakdown, and preview.

**Out of scope:** country-specific legal automation, partial-day rules, multi-office policy variation, or committed leave requests.

## Key Behaviors

1. HR configures the simple effective leave-policy/calendar model.
2. The server calculates working/countable days and balance effect using approved calendar data.
3. Employee preview explains included/excluded dates and recoverable readiness/validation failures.

## Acceptance Criteria

- [ ] R-002, R-012, and R-013 acceptance criteria pass with deterministic date examples.
- [ ] Preview and configuration respect role/organization boundaries and retain configuration-version evidence.
- [ ] Calculation, accessibility, performance, and negative-path tests cover applicable NFR-001 to NFR-007 and NFR-013 to NFR-020.

## Dependencies

| Dependency | Type |
| --- | --- |
| EH-E1 access/workforce foundation | Blocking |
| Approved worked calendar/policy examples | Blocking rule evidence |

## Technical Considerations

- Policy & Calendar is the owning HLD context.
- Date-only breakdown and configuration-version references follow ADR-005.

## Risks & Mitigations

| Risk | Mitigation |
| --- | --- |
| Incorrect counted days/balance explanation | Worked examples, deterministic tests, server-owned calculation |

## Links & References

- [HLD](../hlds/employee-hub-hld.md), [ADR-005](../decisions/employee-hub-adr-005-calculation-breakdown-version-references.md)

## Leave Rules and Explainable Preview

Establish minimum leave readiness and deterministic, explainable server-side date and balance previews.
