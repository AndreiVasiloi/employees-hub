# Task Sizing: EH0004

## Complexity Dimensions

### Technical Complexity

- **Analysis Scope**: 4 folders to analyze and extend (`apps/api/src/access`,
  `apps/api/src/database/migrations`, `apps/api/src/workforce` (new),
  `apps/api/src/workforce` tests).
- **Estimated File Count**: 10–12 new/modified source files
  - New: `workforce-context.ts`, `workforce.service.ts`,
    `workforce.controller.ts`, `workforce.repository.ts`,
    `1710000000001-CreateWorkforceSchema.ts`, `workforce.spec.ts`, plus
    integration test helpers/fixtures.
  - Modified: `app.module.ts`, `database.provider.ts`.
- **Cross-References**: ~8 references to validate (permissions, audit port,
  account repository, employee relationship repository, ADR-001/ADR-006,
  R-011, HLD/PRD data model).
- **Integration Points**: 6 key dependencies
  (`AccessContext`, `AuditPort`, `PostgresAccountRepository`,
  `EmployeeRelationshipRepository`, `DataSource`/migrations, NestJS HTTP layer).

## Effort Estimation

### Multi-Axis Scoring

| Axis | Score (0-3) | Rationale |
|---|---|---|
| Scope / Surface Area | 1 | Multiple files in one server module; bounded to `apps/api/src/workforce` plus two small edits to `app.module.ts` and `database.provider.ts`. |
| Coupling / Interfaces | 1 | The new API surface is additive and self-contained; it consumes existing access/audit interfaces without changing them. |
| Novelty / Uncertainty | 1 | Known patterns from EH0003 (raw-SQL repository, `AuditPort`, composite FKs, permission checks) plus a small optimistic-concurrency twist. |
| Dependencies | 1 | Builds on completed EH0002 (scaffold) and EH0003 (access layer); no external systems or teams. |
| Testing & Verification | 3 | Requires unit tests, controller/repository integration tests with `PostgreSqlContainer`, migration tests, permission-matrix coverage, and cross-org/manager-guard validation. |
| Risk / Blast Radius | 1 | Migration alters `employees` but is additive/corrective rather than breaking; rollback is straightforward with the existing migration baseline. |

### Total Complexity Score: 8 / 18

### Size Estimate

- **Shirt Size**: M
- **Time Estimate**: 1–2 weeks
- **Confidence**: medium

## Sizing Rationale

EH0004 remains a medium-sized server feature, but the scope and coupling are
smaller than a multi-service change because the work is contained within the
API server's `workforce` bounded context. The testing axis is high because
verification must cover:

- Happy-path CRUD for teams and employees.
- Permission matrix and cross-organization isolation.
- Manager relationship guards (self, duplicate, cyclic, inactive, cross-org).
- Optimistic concurrency conflicts.
- Audit event emission.
- Clean migration application.

The risk is scored conservatively at 1 because the migration is additive
(adds `teams`, adds columns to `employees`, redefines an existing FK with the
same semantic intent) and rollback is a single migration revert in a
`migrationsRun: true` environment.

The total score of 8 maps to the lower end of the M band (8–11). It is larger
than a small, isolated CRUD story because of the breadth of test coverage and
the existing table changes, but it does not require new services, external
integrations, or breaking contract changes.
