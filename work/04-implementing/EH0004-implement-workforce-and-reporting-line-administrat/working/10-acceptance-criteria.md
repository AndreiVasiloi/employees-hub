# Acceptance Criteria

## Epic Link

- **Addresses Epic AC**: `EH-E1 AC1` — R-001, R-009, R-011, and R-017
  acceptance criteria pass with fictional data.
- **Addresses Epic AC**: `EH-E1 AC2` — The approved positive/negative
  permission matrix proves isolation and no bypass.
- **Addresses Epic AC**: `EH-E1 AC3` — Authentication, authorization,
  safe-error, audit, and correlation evidence are automated where applicable.

## Happy Path Criteria

- [ ] **AC1**: HR user with `workforce:manage` can `POST /api/v1/workforce/teams`
  and receive `201` with an `id`, `name`, `active: true`, and `version: 0`.
- [ ] **AC2**: HR user with `workforce:manage` can `POST /api/v1/workforce/employees`
  with a valid `accountId` and optional `teamId` and receive `201` with an
  employee record whose `organizationId` matches the caller's organization.
- [ ] **AC3**: HR user with `workforce:read:organization` can `GET` an employee
  or team by `id` and receive `200` with the matching record.
- [ ] **AC4**: HR user with `workforce:manage` can `PATCH` an employee or
  team with the correct `expectedVersion` and receive `200` with the updated
  record and an incremented `version`.
- [ ] **AC5**: HR user with `workforce:manage` can `POST /api/v1/workforce/employees/:id/manager`
  and receive `200` with `managerEmployeeId` set to the target manager.
- [ ] **AC6**: HR user with `workforce:manage` can reassign an employee to a
  different manager and receive `200` with the new `managerEmployeeId`.

## Error Handling Criteria

- [ ] **AC7**: A request without valid `x-identity-subject` / `x-identity-provider`
  headers returns `401` with a stable `INVALID_IDENTITY` error code and a
  `correlationId`, and no internal details.
- [ ] **AC8**: A request from an identity that lacks `workforce:manage` or
  `workforce:read:organization` returns `403` with a stable `ACCESS_DENIED`
  error code and a `correlationId`.
- [ ] **AC9**: A `POST /api/v1/workforce/employees` referencing an `accountId`
  from a different organization returns `400` with a stable error message and
  does not create the employee.
- [ ] **AC10**: A `PATCH` with a stale `expectedVersion` returns `409` with a
  safe, stable conflict message.
- [ ] **AC11**: A `POST /api/v1/workforce/employees/:id/manager` with a
  self-reference, duplicate active manager, cyclic chain, inactive manager,
  or cross-organization manager returns `400` with a stable, safe error
  message and does not persist the invalid relationship.
- [ ] **AC12**: A `GET /api/v1/workforce/employees/:id` or
  `/api/v1/workforce/teams/:id` for a resource in another organization returns
  `404` for a caller with read permission, and `403` if the caller lacks
  permission, without exposing the resource's existence.

## Edge Case Criteria

- [ ] **AC13**: Deactivating a team does not deactivate its employees;
  subsequent employee reads still return the employee with the original
  `active` state and `teamId` unchanged.
- [ ] **AC14**: Listing employees or teams with `limit > 50` is capped at 50;
  negative `offset` or `limit` returns `400` with a stable error message.
- [ ] **AC15**: A manager chain up to any depth supported by the recursive
  CTE is accepted when acyclic, and a cyclic attempt at any depth is rejected
  with `400`.
- [ ] **AC16**: Creating an employee with an inactive `accountId` returns `400`
  and does not create the employee.

## Integration Criteria

- [ ] **AC17**: Every successful `POST`/`PATCH`/`POST .../manager` mutation emits
  one `AuditPort` event containing `actor`, `organizationId`, `target`, `action`,
  `outcome`, `correlationId`, and `timestamp`.
- [ ] **AC18**: `DataSource.initialize()` with `migrationsRun: true` applies
  both `CreateAccessSchema1710000000000` and `CreateWorkforceSchema1710000000001`
  successfully against a clean PostgreSQL database.
- [ ] **AC19**: Cross-organization reads and writes are fully isolated;
  integration tests prove that HR acting for organization A cannot see or
  modify organization B's employees, teams, or manager relationships.
- [ ] **AC20**: The full root quality command (format, lint, type-check, unit,
  integration, build) passes with the new `workforce` code and migrations.
