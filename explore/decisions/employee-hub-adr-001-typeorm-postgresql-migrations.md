# ADR-001: TypeORM with PostgreSQL Migrations
**Status**: Accepted  
**Date**: 2026-09-01  
**Decision Maker**: Andrei, Architect  
**Supersedes**: None

## Context
Critical leave/balance commands require explicit transaction and locking control. **Affects**: [HLD Section 4](../hlds/employee-hub-hld.md#4-integration--data-flows), Section 6.
## Decision
Use TypeORM with PostgreSQL migrations and explicit transaction/query-runner control.
## Options Considered
- **TypeORM (selected):** NestJS-aligned explicit control; more configuration discipline.
- **Prisma:** strong typing; rejected because advanced locking may require raw SQL.
- **SQL-first:** maximum control; rejected because of excess mapping/boilerplate.
## Consequences
**Positive:** explicit transactions/locks; reproducible migrations. **Negative:** ORM discipline and tests required. **Risk:** misuse; mitigate with transaction integration tests.
## Related Decisions
DEC-012; [HLD](../hlds/employee-hub-hld.md#5-key-architectural-decisions).
