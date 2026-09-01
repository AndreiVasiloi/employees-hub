# ADR-002: Idempotency, Versioning, and Targeted Locks
**Status**: Accepted  
**Date**: 2026-09-01  
**Decision Maker**: Andrei, Architect  
**Supersedes**: None

## Context
Retries and competing decisions must create at most one business effect. **Affects**: [HLD Section 4](../hlds/employee-hub-hld.md#4-integration--data-flows), Section 8.
## Decision
Use idempotency records, optimistic versions, and targeted PostgreSQL locks for balance-changing commands.
## Options Considered
- **Combined approach (selected):** strongest retry/conflict protection; higher complexity.
- **Versioning only:** simpler; rejected because conflicts/retries are weaker.
- **Locks only:** serializes writes; rejected because stable retry semantics remain unclear.
## Consequences
**Positive:** one request/decision/effect; safe conflicts. **Negative:** schema/test complexity. **Risk:** deadlocks; mitigate with stable lock ordering and tests.
## Related Decisions
DEC-013; [HLD](../hlds/employee-hub-hld.md#5-key-architectural-decisions).
