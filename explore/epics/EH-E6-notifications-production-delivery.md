+++
[metadata]
epic_id = "EH-E6"
last_updated = "2026-09-01"

[epochs]
  [epochs.0]
  name = "Notifications and Production-like Delivery"
  started = "2026-09-01"
  jira_key = ""
+++

# Epic: Notifications and Production-like Delivery

**Epic ID:** EH-E6  
**Domain:** Employee Leave Management  
**Source:** [PRD E6](../prds/employee-hub-prd.md#epic-extraction)  
**Owner:** Andrei  
**Status:** Draft

## Objective

Make notification delivery state visible and demonstrate the complete fictional workflow through a verified, observable, recoverable delivery environment.

## Scope & Boundaries

**In scope:** in-app notification state, durable outbox worker behavior, GitHub Actions pipeline, container artifacts, staging/production-like deployment evidence, health/readiness, safe telemetry, smoke/E2E/NFR validation, and rollback practice.

**Out of scope:** real employee data, external notification channels, uptime/RTO/RPO claims, unverified Rancher capabilities, and formal compliance certification.

## Key Behaviors

1. Notification failure is diagnosable and never reverses a committed request/balance workflow.
2. The same immutable artifact is promoted with environment-specific protected configuration.
3. A shared deployment demonstrates health, correlation, safe telemetry, and only operational claims that were actually tested.

## Acceptance Criteria

- [ ] R-016 and every applicable NFR acceptance criterion have retained evidence.
- [ ] CI gates, container/SBOM/security checks, staging E2E/accessibility/performance checks, and deploy smoke checks pass as applicable.
- [ ] Deployment, rollback/forward-fix, telemetry, and incident evidence remain linked to the release.

## Dependencies

| Dependency | Type |
| --- | --- |
| EH-E1 to EH-E5 | Blocking workflow capability |
| GitHub, registry, Rancher, and observability capability contract | Blocking shared-delivery validation |

## Technical Considerations

- Apply ADR-004 and the approved DevOps strategy; use fictional data only.
- No production reliability or recovery promise is made before verified platform ownership/testing.

## Risks & Mitigations

| Risk | Mitigation |
| --- | --- |
| Runtime capability unavailable | Keep local vertical slice; obtain platform checklist before shared deployment |

## Links & References

- [DevOps strategy](../explore-employee-hub/devops-strategy.md), [test strategy](../explore-employee-hub/test-strategy.md), [HLD blockers](../hlds/employee-hub-blocker-register.md)

## Notifications and Production-like Delivery

Deliver visible notification state and evidenced fictional-environment delivery without making unverified production claims.
