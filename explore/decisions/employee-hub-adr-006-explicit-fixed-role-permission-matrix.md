# ADR-006: Explicit Fixed-Role Permission Matrix
**Status**: Accepted  
**Date**: 2026-09-01  
**Decision Maker**: Andrei, Architect  
**Supersedes**: None

## Context
Administrator breadth must preserve least privilege and immutable prohibitions. **Affects**: [HLD Section 7](../hlds/employee-hub-hld.md#7-security-considerations).
## Decision
Use explicit fixed-role permissions; no role bypasses self-approval or audit/ledger immutability.
## Options Considered
- **Explicit matrix (selected):** testable breadth/safeguards; needs clear maintenance.
- **Admin bypass:** fast; rejected because it violates safeguards.
- **Settings-only Admin:** strict; rejected because it conflicts with R-017.
## Consequences
**Positive:** least privilege, testable authorization. **Negative:** matrix design effort. **Risk:** missed permission; mitigate negative matrix tests.
## Related Decisions
DEC-017; [HLD](../hlds/employee-hub-hld.md#5-key-architectural-decisions).
