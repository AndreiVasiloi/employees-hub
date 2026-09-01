# ADR-004: Transactional Outbox and In-Process Worker
**Status**: Accepted  
**Date**: 2026-09-01  
**Decision Maker**: Andrei, Architect  
**Supersedes**: None

## Context
Notification delivery must not alter committed workflow state. **Affects**: [HLD Section 4](../hlds/employee-hub-hld.md#4-integration--data-flows), Section 8.
## Decision
Persist notification intent transactionally and process it with an in-process worker/poller.
## Options Considered
- **Outbox/worker (selected):** reliable separation without broker; needs retry design.
- **Synchronous delivery:** simple; rejected because failure couples to commands.
- **Broker:** scalable; rejected as unjustified infrastructure.
## Consequences
**Positive:** durable independent delivery. **Negative:** worker operations. **Risk:** duplicate dispatch; mitigate idempotent claim/dispatch.
## Related Decisions
DEC-015; [HLD](../hlds/employee-hub-hld.md#5-key-architectural-decisions).
