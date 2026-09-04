# Sequencing and Scope

## Implementation Phases

### Phase 1: Foundation — Schema and Shared Contracts

- [ ] Create the `CreateWorkforceSchema1710000000001` migration that adds the
  `teams` table, extends `employees` with `display_name`, `team_id`, and
  `version`, and redefines `manager_employee_id` as a composite FK.
- [ ] Set `migrationsRun: true` in `database.provider.ts`.
- [ ] Add `apps/api/src/workforce/workforce-context.ts` with domain and
  command/DTO types.
- [ ] Add `apps/api/src/workforce/workforce.repository.ts` implementing raw-SQL
  CRUD for teams and employees with organization scoping and optimistic
  concurrency.

### Phase 2a: Team CRUD Endpoints

- [ ] Add `WorkforceService` methods for `createTeam`, `getTeam`, `listTeams`,
  and `updateTeam`.
- [ ] Add `WorkforceController` routes for `POST/GET /api/v1/workforce/teams`
  and `PATCH /api/v1/workforce/teams/:id`.
- [ ] Enforce `workforce:manage` for writes and `workforce:read:organization`
  for reads.
- [ ] Emit `AuditPort` events for team creation and update.

### Phase 2b: Employee CRUD Endpoints

- [ ] Add `WorkforceService` methods for `createEmployee`, `getEmployee`,
  `listEmployees`, and `updateEmployee`.
- [ ] Add `WorkforceController` routes for `POST/GET /api/v1/workforce/employees`
  and `PATCH /api/v1/workforce/employees/:id`.
- [ ] Validate that `accountId` belongs to an active user account in the same
  organization and (optionally) that `teamId` exists in the same organization.
- [ ] Emit `AuditPort` events for employee creation and update.

### Phase 2c: Manager Reporting-Line Endpoint

- [ ] Add `POST /api/v1/workforce/employees/:id/manager` controller route.
- [ ] Wire `EmployeeRelationshipRepository.assignManager` to enforce single
  active manager, self/cycle/cross-org/inactive guards.
- [ ] Emit `AuditPort` events for manager assignment and reassignment.

### Phase 3: Registration, Tests, and Quality

- [ ] Register `WorkforceController` and `WorkforceService` in `AppModule`.
- [ ] Add unit tests for `WorkforceService` and `PostgresWorkforceRepository`
  using mocked `DataSource` and a test `AuditPort`.
- [ ] Add API integration tests with `PostgreSqlContainer` covering happy paths,
  permission/role matrix, cross-org isolation, manager guards, optimistic
  concurrency, and audit events.
- [ ] Run the root `format`, `lint`, `type-check`, `test`, and `build` commands
  and fix any failures.
- [ ] Update `task.md` to mark status `03-pending-implementation` and move the
  task to `work/03-pending-implementation/` when the plan is approved.

## Parallel Work Opportunities

- Phase 2a and 2b can be developed in parallel once Phase 1 is complete, because
  they share the same repository and DTO contracts but exercise different
  tables.
- Phase 2c can be built in parallel with 2a/2b if the composite unique
  `(id, organization_id)` on `employees` and the `EmployeeRelationshipRepository`
  signature are stable; otherwise it is blocked until the end of Phase 1.
- `WorkforceController` route skeletons can be drafted while repository queries
  are being written, as long as `workforce-context.ts` is the shared source of
  truth for DTO shapes.
- EH0005 and EH0006 can continue their planning phases in parallel with EH0004
  implementation, but they cannot implement consumer code until EH0004
  completes.

## Dependency Analysis

### Independent Work

- Phase 2a (Team CRUD) and Phase 2b (Employee CRUD) are independent after
  Phase 1.
- Phase 2b employee creation does not depend on Phase 2c manager assignment;
  employees can be created with `managerEmployeeId` null.

### Blocked Dependencies

- Phase 2c is blocked until `EmployeeRelationshipRepository` and the
  `employees` composite unique `(id, organization_id)` are in place.
- Integration tests covering the full lifecycle are blocked until Phase 2a,
  2b, and 2c are complete.

### Dependent Tasks

- **EH0005** depends on the `employees`/`teams` schema and API surface.
- **EH0006** depends on `AuditPort` events emitted by EH0004 mutations.

## Scope Validation

### Original Requirements

| Requirement | Addressed In |
|---|---|
| HR can create, view, update, activate, and deactivate Employee records | Phase 1, 2b |
| HR can create, view, update, activate, and deactivate Team records | Phase 1, 2a |
| Single active manager per employee | Phase 2c |
| Reject self/cyclic/inactive/duplicate/cross-org reporting lines | Phase 2c |
| Server-side `AccessContext` and permission matrix | Phase 2a, 2b, 2c |
| Audit events through `AuditPort` | Phase 2a, 2b, 2c |
| TypeORM migrations apply cleanly | Phase 1, 3 |
| Automated unit, integration, and API tests | Phase 3 |

### Scope Creep Detected

- None. All planned capabilities are within R-011 and the epic scope.

### Non-Goals Confirmed Excluded

- Leave policies, balances, requests, approvals, notifications — excluded.
- Dynamic roles or configurable permissions — excluded.
- External identity-provider or HRIS integration — excluded.
- Production deployment, secrets management, real employee data — excluded.
- UI/UX beyond the API boundary — excluded.

## Task Tags

- **Complexity**: moderate
- **Component**: server
- **Type**: feature
- **Priority**: high
- **Risk**: medium
