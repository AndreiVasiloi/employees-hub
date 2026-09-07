# Test Inventory: EH0004

## Unit Tests

### `PostgresWorkforceRepository`

- [ ] `createEmployee_createsEmployeeWithTeam` — inserts a new employee linked to an account and team in the same organization.
- [ ] `createEmployee_rejectsAccountFromOtherOrganization` — throws when the linked account belongs to a different organization.
- [ ] `createEmployee_rejectsInactiveAccount` — throws when the linked account is inactive.
- [ ] `createEmployee_rejectsTeamFromOtherOrganization` — throws when the optional team belongs to a different organization.
- [ ] `getEmployee_returnsEmployeeByIdAndOrganization` — returns the matching employee.
- [ ] `getEmployee_returnsUndefinedForWrongOrganization` — returns undefined when the employee exists in another organization.
- [ ] `listEmployees_returnsPagedOrganizationScopedResults` — returns paginated employees ordered by `name` or `id`.
- [ ] `listEmployees_capsLimitAtFifty` — clamps `limit` to 50 and rejects negative offset.
- [ ] `updateEmployee_updatesDisplayNameAndTeam` — applies display name and team changes.
- [ ] `updateEmployee_throwsOnStaleVersion` — throws `ConflictError` when `expectedVersion` does not match.
- [ ] `updateEmployee_incrementsVersion` — returns the new version after a successful update.
- [ ] `createTeam_createsTeamInOrganization` — inserts a new team and returns it.
- [ ] `createTeam_rejectsDuplicateName` — throws when the organization already has a team with the same name.
- [ ] `getTeam_returnsTeamByIdAndOrganization` — returns the matching team.
- [ ] `listTeams_returnsPagedOrganizationScopedResults` — returns paginated teams.
- [ ] `updateTeam_updatesNameAndActive` — applies name and active flag changes.
- [ ] `updateTeam_throwsOnStaleVersion` — throws `ConflictError` when `expectedVersion` does not match.

### `WorkforceService`

- [ ] `createEmployee_emitsAuditEvent` — appends a structured `AuditPort` event on success.
- [ ] `createEmployee_mapsRepositoryResultToResponse` — returns the expected DTO.
- [ ] `updateTeam_emitsAuditEvent` — appends a structured `AuditPort` event on success.
- [ ] `assignManager_callsEmployeeRelationshipRepository` — delegates to `EmployeeRelationshipRepository.assignManager`.
- [ ] `assignManager_emitsAuditEvent` — appends a structured `AuditPort` event on success.

### `WorkforceController`

- [ ] `createEmployee_returns201ForManagerWithPermission` — returns 201 when caller has `workforce:manage`.
- [ ] `createEmployee_returns403ForUnauthorizedRole` — returns 403 when caller lacks `workforce:manage`.
- [ ] `getEmployee_returns200ForReaderWithPermission` — returns 200 when caller has `workforce:read:organization`.
- [ ] `getEmployee_returns404ForOtherOrganization` — returns 404 for a resource in another organization.

## Integration Tests

- [ ] `migrations_applyWorkforceSchema` — `CreateWorkforceSchema1710000000001` runs cleanly against a fresh PostgreSQL container and creates `teams` and extends `employees`.
- [ ] `migrations_accessAndWorkforceSchemasRunSequentially` — both EH0003 and EH0004 migrations apply in order.
- [ ] `employeeRelationshipRepository_assignManagerWithCompositeKeys` — the existing manager assignment guard still works after the `employees` composite unique/index changes.

## API Tests

### Teams

- [ ] `POST /api/v1/workforce/teams_createsTeam` — 201 for HR/Administrator with `workforce:manage`; response includes `version: 0`.
- [ ] `POST /api/v1/workforce/teams_rejectsForReader` — 403 for Employee/Manager.
- [ ] `GET /api/v1/workforce/teams_listsTeams` — 200 with pagination for `workforce:read:organization`.
- [ ] `GET /api/v1/workforce/teams/:id_returnsTeam` — 200 for the same organization; 404 for another organization.
- [ ] `PATCH /api/v1/workforce/teams/:id_updatesNameAndVersion` — 200 with incremented `version`.
- [ ] `PATCH /api/v1/workforce/teams/:id_returns409OnStaleVersion` — 409 when `expectedVersion` is outdated.
- [ ] `PATCH /api/v1/workforce/teams/:id_deactivateDoesNotCascadeToEmployees` — team `active=false` but employees still report `active=true`.

### Employees

- [ ] `POST /api/v1/workforce/employees_createsEmployee` — 201 with linked active account and optional team.
- [ ] `POST /api/v1/workforce/employees_rejectsInactiveAccount` — 400 when account is inactive.
- [ ] `POST /api/v1/workforce/employees_rejectsCrossOrgAccount` — 400 when account belongs to another organization.
- [ ] `POST /api/v1/workforce/employees_rejectsCrossOrgTeam` — 400 when optional team belongs to another organization.
- [ ] `GET /api/v1/workforce/employees_listsEmployees` — 200 paginated, scoped to caller's organization.
- [ ] `GET /api/v1/workforce/employees/:id_returnsEmployee` — 200 for same org; 404 for other org; 403 for unauthorized role.
- [ ] `PATCH /api/v1/workforce/employees/:id_updatesDisplayNameAndTeam` — 200 with incremented `version`.
- [ ] `PATCH /api/v1/workforce/employees/:id_returns409OnStaleVersion` — 409 when `expectedVersion` is outdated.
- [ ] `PATCH /api/v1/workforce/employees/:id_deactivateAndReactivate` — toggles `active` and increments `version`.

### Manager Reporting Line

- [ ] `POST /api/v1/workforce/employees/:id/manager_assignsManager` — 200 with `managerEmployeeId` set.
- [ ] `POST /api/v1/workforce/employees/:id/manager_rejectsSelf` — 400 when `managerEmployeeId === employeeId`.
- [ ] `POST /api/v1/workforce/employees/:id/manager_rejectsDuplicate` — 400 when the same manager is already assigned.
- [ ] `POST /api/v1/workforce/employees/:id/manager_rejectsInactiveManager` — 400 when the manager is inactive.
- [ ] `POST /api/v1/workforce/employees/:id/manager_rejectsCrossOrgManager` — 400 when manager belongs to another organization.
- [ ] `POST /api/v1/workforce/employees/:id/manager_rejectsCyclic` — 400 for A→B→A and deeper cycles.
- [ ] `POST /api/v1/workforce/employees/:id/manager_reassignsToDifferentManager` — 200 replaces existing manager.

### Authorization and Isolation

- [ ] `workforceEndpoints_enforceFixedRolePermissionMatrix` — each endpoint returns 403 when caller lacks the required permission.
- [ ] `workforceEndpoints_deriveOrganizationFromAccessContext` — requests with no `organizationId` in body are scoped by server-side `AccessContext`.
- [ ] `workforceEndpoints_doNotLeakCrossOrgExistence` — 404 (or 403 for unauthorized) for cross-org reads; no internal details in errors.

### Audit

- [ ] `workforceMutations_emitAuditEvent` — every successful `POST`/`PATCH`/`POST .../manager` emits one `AuditPort` event with actor, organization, target, action, outcome, correlation, timestamp.
- [ ] `workforceMutations_auditEventsExcludeSecretsAndInternalDetails` — events do not contain stack traces, DB errors, or tokens.

## Pipeline Tests

- No separate CATS/Karate pipeline tests are required for EH0004. The integration tests above serve as smoke tests against a disposable PostgreSQL container.
- Post-deployment smoke tests can reuse the happy-path `POST/GET` scenarios once a staging database is available.

## Implementation Strategy

1. **Phase 1 — Schema and Repository Skeleton**
   - Write the migration `1710000000001-CreateWorkforceSchema` (teams table + employee extensions).
   - Set `migrationsRun: true` in `database.provider.ts`.
   - Create `workforce-context.ts` with domain/DTO types.
   - Create `PostgresWorkforceRepository` with raw-SQL CRUD and unit tests.

2. **Phase 2 — Service and Controller**
   - Create `WorkforceService` (validation, audit, repository orchestration).
   - Create `WorkforceController` with team/employee CRUD routes and `AccessContext` resolution.
   - Register `WorkforceController` and `WorkforceService` in `AppModule`.
   - Add API tests for team and employee CRUD.

3. **Phase 3 — Manager Reporting Line**
   - Add `POST /employees/:id/manager` route.
   - Wire `EmployeeRelationshipRepository.assignManager`.
   - Add API tests for all manager guards (self, duplicate, inactive, cross-org, cyclic, reassign).

4. **Phase 4 — Quality and Edge Cases**
   - Add cross-organization isolation, pagination, optimistic concurrency, and audit-event tests.
   - Run full `npm run verify`, `type-check`, `build`.
   - Update `plan.md` and `task.md` if any deviations arise.
