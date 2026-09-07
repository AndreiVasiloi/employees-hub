# Pipeline Test Requirements: EH0004

## Smoke Tests

Post-deployment happy-path validation of the new Workforce API surface.

| Endpoint | Method | Scenario | Expected |
|---|---|---|---|
| `/api/v1/workforce/teams` | `POST` | HR creates a team with a fictional name. | `201` with `id`, `organizationId`, `name`, `active: true`, `version: 0`. |
| `/api/v1/workforce/teams` | `GET` | HR lists teams in their organization. | `200` with a paginated list scoped to the caller's organization. |
| `/api/v1/workforce/employees` | `POST` | HR creates an employee linked to an existing active account. | `201` with `id`, `accountId`, `displayName`, `active: true`, `version: 0`. |
| `/api/v1/workforce/employees` | `GET` | HR lists employees in their organization. | `200` with a paginated list scoped to the caller's organization. |
| `/api/v1/workforce/employees/:id` | `GET` | HR fetches an employee they just created. | `200` with the employee record and `correlationId`. |
| `/api/v1/workforce/employees/:id` | `PATCH` | HR updates the employee's team with a valid `expectedVersion`. | `200` with updated `teamId` and incremented `version`. |
| `/api/v1/workforce/employees/:id/manager` | `POST` | HR assigns a manager to the employee. | `200` with `managerEmployeeId` set. |
| `/api/v1/workforce/employees/:id/manager` | `POST` | HR reassigns the employee to a different manager. | `200` with the new `managerEmployeeId` and the old relationship replaced. |

## Fuzz Tests

- **Reference data**: a seeded organization with one active HR account, one active manager account, one active employee account, and one active team.
- **Excluded endpoints**: none; all `/api/v1/workforce/*` endpoints should be fuzzed.
- **Special configuration / considerations**:
  - Identity and role headers are synthesized for each request; fuzzing focuses on request bodies and path parameters.
  - Test inputs must include invalid `displayName` (empty, too long, wrong type), invalid `teamId` / `accountId` / `managerEmployeeId` (not UUID, unknown IDs, IDs from other organizations, inactive records), malformed `expectedVersion` (negative, string, missing), and out-of-range pagination (`limit > 50`, negative `offset`).
  - Endpoints must not leak stack traces, database errors, or record-existence details for any fuzzed input.
  - `POST /api/v1/workforce/employees/:id/manager` must reject self-assignment, duplicate assignment of the same manager, cyclic chains, inactive managers, and cross-organization IDs with stable `400` responses.

## Integration Tests

End-to-end business-flow validation using a disposable PostgreSQL container and the real `AppModule`.

| Scenario | Steps | Test data | Expected |
|---|---|---|---|
| HR creates and manages an employee lifecycle | 1. Create organization, accounts, and roles. <br>2. Create a team. <br>3. Create an employee linked to an account. <br>4. Update employee to the team. <br>5. Assign a manager. <br>6. Deactivate the employee. <br>7. Reactivate the employee. | Two fictional organizations with HR and manager accounts; one active team per org. | Each step returns the expected status code and the database reflects the final state scoped to the organization. Deactivated employee reads still return the record; updates are blocked by optimistic concurrency if `expectedVersion` is stale. |
| Manager relationship guards work correctly | 1. Create two employees in the same org. <br>2. Attempt self-assignment, duplicate assignment, cyclic assignment (A→B→A and deeper chains), assignment of an employee from another org, and assignment of an inactive employee. | Three or more employees in two organizations; one inactive employee. | All invalid assignments return `400` with safe, stable error messages. No circular or cross-organization manager chain is persisted. |
| Cross-organization isolation | 1. Create employees and teams in organization A and B. <br>2. Use an HR identity scoped to A to read/write B's resources. | Two full sets of fictional test data in separate organizations. | All cross-org reads return `404` (or `403` for unauthorized role), and all cross-org writes return `403` or `400` without exposing resource existence. Audit events include the correct `organizationId` and never leak the other organization. |
| Optimistic concurrency prevents lost updates | 1. Fetch an employee (version 0). <br>2. Update the employee with version 0 from one client. <br>3. Attempt to update the same employee with version 0 from a second client. | One employee and one HR account. | First update succeeds with version 1. Second update returns `409` with a safe conflict message. |
| Audit events are emitted for every mutation | 1. Perform create, update, manager assignment, and deactivate operations. <br>2. Inspect the `AuditPort` sink. | Fictional employee and team records. | Each successful mutation emits an event containing `actor`, `organizationId`, `target`, `action`, `outcome`, `correlationId`, and `timestamp`. No event contains secrets or internal error details. |
| Migrations apply cleanly in a clean database | 1. Start a fresh PostgreSQL container. <br>2. Initialize `DataSource` with `migrationsRun: true`. | Empty database. | `CreateAccessSchema1710000000000` and `CreateWorkforceSchema1710000000001` both run successfully and all tables, columns, indexes, and composite FKs are present. |

## CI Mapping

- Pull requests run the full EH0004 unit, integration, and pipeline-test suite against a Testcontainers PostgreSQL instance.
- Smoke scenarios are exercised by the integration tests on every PR; post-deployment smoke tests can reuse the same endpoints against a staging container.
- Fuzz-style negative cases are implemented as deterministic integration tests; randomized fuzzing may be added later as a separate CI job.
