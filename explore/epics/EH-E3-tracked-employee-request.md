+++
[metadata]
epic_id = "EH-E3"
last_updated = "2026-09-01"

[epochs]
  [epochs.0]
  name = "Tracked Employee Request"
  started = "2026-09-01"
  jira_key = ""
+++

# Epic: Tracked Employee Request

**Epic ID:** EH-E3  
**Domain:** Employee Leave Management  
**Source:** [PRD E3](../prds/employee-hub-prd.md#epic-extraction)  
**Owner:** Andrei  
**Status:** Draft

## Objective

Let an employee submit, track, and when eligible cancel one coherent leave request with correct balance reservation and history.

## Scope & Boundaries

**In scope:** request preview-to-submit flow, receipt/status/history, eligible cancellation, request-day breakdown, balance reservation/projection, idempotency, and transactional audit/outbox intent.

**Out of scope:** manager decisions, HR adjustments, external notifications, editing a pending request, and overlapping-policy changes.

## Key Behaviors

1. A request command has at most one business effect under retries/concurrency.
2. Submission atomically commits request, breakdown, balance evidence, audit event, and notification intent.
3. Status/history and eligible cancellation are scoped and explainable.

## Acceptance Criteria

- [ ] R-003, R-004, R-007, and R-008 acceptance criteria pass.
- [ ] Transaction fault-injection, retry, concurrency, lifecycle, audit, and balance tests prove no partial effect.
- [ ] Applicable NFR-001 to NFR-011 and NFR-013 to NFR-020 are met.

## Dependencies

| Dependency | Type |
| --- | --- |
| EH-E1 access/workforce | Blocking |
| EH-E2 readiness and preview | Blocking |

## Technical Considerations

- Workflow & Balances owns the command boundary.
- TypeORM migrations (ADR-001), idempotency/versioning/locks (ADR-002), and calculation evidence (ADR-005) apply.

## Risks & Mitigations

| Risk | Mitigation |
| --- | --- |
| Duplicate request or balance inconsistency | Idempotency key, targeted locks/versioning, real PostgreSQL concurrency tests |

## Links & References

- [HLD](../hlds/employee-hub-hld.md), [ADR-001](../decisions/employee-hub-adr-001-typeorm-postgresql-migrations.md), [ADR-002](../decisions/employee-hub-adr-002-idempotency-versioning-locks.md)

## Tracked Employee Request

Deliver the idempotent employee request lifecycle, balance evidence, and eligible cancellation as one atomic workflow capability.
