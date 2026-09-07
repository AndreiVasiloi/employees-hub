# Risks and Dependencies

## Risk Assessment

| Risk | Category | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| Altering the existing `employees` table and replacing `fk_employees_manager` with a composite FK breaks environments that already ran EH0003's migration. | Data Model / Migration | Medium | High | Include both schema changes in `CreateWorkforceSchema1710000000001`; test clean-slate and incremental migration paths in CI. If a conflict is found during implementation, drop and recreate the FK in the migration. |
| `EmployeeRelationshipRepository.assignManager` creates its own `queryRunner`, which means create-employee and assign-manager cannot be wrapped in a single transaction without refactoring. | Data Integrity / Transaction | Medium | Medium | Scope manager assignment as a dedicated endpoint so each call is atomic; document in plan that manager-at-creation is not supported. |
| Cycle detection uses a recursive CTE with `FOR UPDATE` locks; deep chains or high concurrency could cause lock contention or performance degradation. | Performance | Low | Medium | Cap recursion depth in the guard query and add an integration test with deep-but-acyclic chains. Monitor query plans. |
| `AuditPort` events are stored in memory only; a process restart loses audit evidence until EH0006 is implemented. | Operations / Security | Medium | High | Document as a known limitation. EH0006 will swap the adapter without changing call sites. Integration tests assert event shape and count. |
| Optimistic concurrency `version` conflicts if the client sends the same `expectedVersion` twice in quick succession. | UX / Correctness | Low | Medium | Return `409` with a stable message and require the client to re-fetch. Document this behavior in API contract tests. |
| Team deactivation does not deactivate its employees; downstream features may assume otherwise. | UX / Data Model | Low | Medium | Treat as an explicit assumption in the plan (flagged for Architect review) and validate in an edge-case integration test. |
| Cross-organization isolation relies on both application checks and composite FKs; a missing composite FK in one relationship could leak data. | Security | Low | High | Every new FK in the migration is composite `(id, organization_id)`. Add integration tests that prove cross-org reads return `404/403` and writes are rejected. |
| Reusing `AccessContext` and permissions incorrectly could allow a non-HR user to mutate workforce records. | Security | Low | High | Add explicit permission matrix tests for each endpoint using each fixed role. Ensure `canAccessOrganization` is called on all reads. |

## Dependencies

### Blocking (must complete first)

- **EH0002** — Provides the NestJS/TypeORM/Vitest/PostgreSQL scaffold; EH0004 adds a new bounded context and migration.
- **EH0003** — Provides `AccessContext`, fixed-role permissions, `AuditPort`, `PostgresAccountRepository`, and `EmployeeRelationshipRepository`; EH0004 reuses all of them.

### Dependent (depends on this task)

- **EH0005** — Requires `employees`, `teams`, and manager relationships created by EH0004.
- **EH0006** — Will persist the `AuditPort` events EH0004 emits.

### Related (shared context)

- None beyond EH0002/EH0003/EH0005/EH0006.

## Validation Against Research

- `work/05-research.md` found no conflicts with ADR-001, ADR-003, or ADR-006.
- `work/05-research.md` identified three gaps. Resolution status:
  - **Employee display name**: resolved in `07-technical-approach.md` by adding a `display_name` column to `employees`.
  - **Optimistic concurrency**: resolved by adding a `version` column to both `employees` and `teams`.
  - **Team/employee lifecycle independence**: resolved by documenting that deactivating a team does not deactivate its employees.
- No stale references found.
- No blocking conflicts remain.
