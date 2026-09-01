# ADR-005: Calculation Breakdown and Version References
**Status**: Accepted  
**Date**: 2026-09-01  
**Decision Maker**: Andrei, Architect  
**Supersedes**: None

## Context
Historical leave calculations need explainable evidence. **Affects**: [HLD Section 8](../hlds/employee-hub-hld.md#8-quality-attributes--operational-requirements).
## Decision
Store request-day breakdowns and effective policy/schedule/calendar version references.
## Options Considered
- **Breakdown/references (selected):** explainable without duplication; needs retention rules.
- **Totals only:** simple; rejected because not explainable.
- **Full JSON snapshots:** self-contained; rejected because of duplication.
## Consequences
**Positive:** reproducible evidence. **Negative:** version lifecycle complexity. **Risk:** missing version; mitigate foreign keys/validation.
## Related Decisions
DEC-016; [HLD](../hlds/employee-hub-hld.md#5-key-architectural-decisions).
