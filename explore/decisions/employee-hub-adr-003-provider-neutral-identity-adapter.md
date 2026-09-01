# ADR-003: Provider-Neutral Identity Adapter
**Status**: Accepted  
**Date**: 2026-09-01  
**Decision Maker**: Andrei, Architect  
**Supersedes**: None

## Context
Authentication provider facts are unknown, but server-side scope is mandatory. **Affects**: [HLD Section 4](../hlds/employee-hub-hld.md#4-integration--data-flows), Section 7.
## Decision
Use a provider-neutral OIDC/JWT adapter with a local development identity stub.
## Options Considered
- **Adapter/stub (selected):** isolates provider choice; requires test-double design.
- **Provider now:** realistic; rejected due to setup/delivery overhead.
- **Local passwords:** self-contained; rejected as unnecessary security scope.
## Consequences
**Positive:** clean future integration; learning progress. **Negative:** BLK-001 remains. **Risk:** claim mismatch; mitigate with contract tests.
## Related Decisions
DEC-014; [HLD](../hlds/employee-hub-hld.md#5-key-architectural-decisions).
