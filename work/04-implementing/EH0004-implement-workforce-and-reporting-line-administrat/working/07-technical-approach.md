# Technical Approach

## High-Level Strategy

EH0004 introduces a new `workforce` bounded context in `apps/api/src/workforce`.
It builds directly on the EH0003 access layer (`AccessContext`, fixed-role
permissions, `AuditPort`, `PostgresAccountRepository`, and
`EmployeeRelationshipRepository`) and adds PostgreSQL-backed repositories for
Employee and Team administration. The implementation keeps the same raw-SQL,
migration-driven, `synchronize: false` persistence style used by EH0003.

All endpoints derive organization scope from the server-side `AccessContext`;
no client-supplied `organizationId` is trusted.

## Architecture Decisions

### Decision 1: New `workforce` folder/module, separate from `access`

- **Choice**: Add `apps/api/src/workforce/` containing controller, service,
  repository, context types, and a new TypeORM migration.
- **Rationale**: Matches the HLD's separate Workforce bounded context and
  keeps EH0003's authorization surface untouched. `access` already owns
  identity resolution and the `employees` table used for account linking;
  `workforce` owns the HR-facing business operations over that data.
- **Alternatives considered**: Extend `AccessController` — rejected because it
  would mix authorization and workforce responsibilities and blur the HLD
  boundary.

### Decision 2: Reuse existing `AccessContext`, permissions, and `AuditPort`

- **Choice**: Use `IdentityAdapter` + `PostgresAccountRepository` +
  `AccessResolver` to obtain `AccessContext`, check `hasPermission` /
  `canAccessOrganization`, and emit audit events through the existing
  `AuditPort`/`InMemoryAuditPort` contract.
- **Rationale**: No new permission constants are required (`workforce:manage`,
  `workforce:read:organization` already exist in `permissions.ts`). Reusing
  `AuditPort` satisfies the "relevant changes are audited" acceptance
  criterion while leaving durable persistence to EH0006.
- **Alternatives considered**: Introduce a new `WorkforceAuditPort` —
  rejected because the existing event shape already contains the required
  actor/organization/action/target/outcome/correlation/timestamp fields.

### Decision 3: Reuse `EmployeeRelationshipRepository.assignManager` for manager assignment

- **Choice**: Import `EmployeeRelationshipRepository` from `access` and call
  its `assignManager` method from a dedicated
  `POST /api/v1/workforce/employees/:id/manager` endpoint.
- **Rationale**: The repository already contains the exact transactional
  guard set R-011 requires (self, duplicate, inactive, cross-organization via
  composite FK, and cycle detection with `FOR UPDATE` locks). This avoids
  duplicating the guard logic.
- **Alternatives considered**: Duplicate the cycle/lock logic in a new
  `workforce` repository — rejected because it duplicates proven code and
  increases drift risk.

### Decision 4: Manager assignment is a separate endpoint, not part of Employee creation

- **Choice**: `POST /employees` creates an Employee without a manager.
  `POST /employees/:id/manager` assigns or reassigns the manager using
  `EmployeeRelationshipRepository.assignManager`.
- **Rationale**: `assignManager` manages its own `queryRunner` transaction.
  Running an insert and the assignment in separate transactions is simpler
  and avoids needing to refactor `EmployeeRelationshipRepository` to accept an
  external `queryRunner`. R-011 only requires "at most one active Manager,"
  not manager-at-creation.
- **Alternatives considered**: Allow `managerEmployeeId` on creation and
  wrap insert + assignment atomically — rejected because it complicates the
  transaction boundary with the existing repository.

### Decision 5: Add `teams` table and extend `employees` with `team_id`, `display_name`, and `version`

- **Choice**: Create a new migration `1710000000001-CreateWorkforceSchema`
  that:
  - Adds `teams` table: `id` (varchar PK), `organization_id` (FK),
    `name` (varchar 120), `active` (boolean default true), `version`
    (integer default 0). Unique on `(organization_id, name)` and
    `(id, organization_id)`.
  - Alters `employees` to add `team_id` (nullable FK to `teams(id, organization_id)`
    via composite FK), `display_name` (varchar 120), and `version` (integer default 0).
  - Adds a composite unique `(employees.id, employees.organization_id)` so that
    `team_id` and `manager_employee_id` composite foreign keys can enforce
    same-organization integrity at the database level.
  - Replaces the existing `fk_employees_manager` with a composite
    `(manager_employee_id, organization_id) -> (employees.id, organization_id)` FK.
- **Rationale**: The PRD data model explicitly states `Employee` belongs to
  exactly one `Team` and references one Manager. Composite FKs extend the
  same-organization protection already used for `employees.account_id` in
  EH0003.
- **Alternatives considered**: Enforce team/manager organization scope only in
  application code — rejected because EH0003's approach demonstrates the
  value of enforcing invariants at the persistence boundary.

### Decision 6: Optimistic concurrency with integer `version`

- **Choice**: Every `PATCH` and `DELETE` (soft-deactivate) must include an
  `expectedVersion`. The repository increments `version` only when the row's
  current version matches; otherwise it throws a 409 conflict.
- **Rationale**: The HR edit domain flow explicitly requires stale updates
  to be "refreshed and reconciled rather than silently overwritten." An
  integer version is the simplest correct mechanism and aligns with
  ADR-002's idempotency/versioning theme.
- **Alternatives considered**: Last-write-wins or timestamp-based concurrency —
  rejected because they do not provide deterministic conflict detection.

### Decision 7: Set `migrationsRun: true` in the runtime `DataSource`

- **Choice**: Change `apps/api/src/database/database.provider.ts` from
  `migrationsRun: false` to `migrationsRun: true` so the application applies
  pending migrations on `DataSource.initialize()`.
- **Rationale**: EH0003's implementation summary lists as a known
  limitation that the access migration is "present but is not yet
  registered in the application's runtime database configuration." Without
  this change, the EH0003 and EH0004 migrations would never be applied in
  the running app or in container-based integration tests that rely on the
  production `databaseProvider`.
- **Alternatives considered**: Add a separate `npm run db:migrate` script —
  rejected as additional complexity for the learning-project scope; can be
  revisited when Rancher deployment automation is implemented.

### Decision 8: Manual DTO validation, no new dependencies

- **Choice**: Use TypeScript interfaces/classes for DTOs and perform explicit
  validation in `WorkforceService`. Return stable 400 errors without leaking
  internal details.
- **Rationale**: `class-validator` is not currently a dependency, and adding
  it would require package-lock changes and configuration.
- **Alternatives considered**: Add `class-validator` and `ValidationPipe` —
  rejected to keep the dependency footprint minimal and consistent with
  EH0003's explicit validation style.

## Component Changes

### `apps/api/src/workforce/workforce-context.ts`

- Domain types: `WorkforceEmployee`, `WorkforceTeam`.
- Command/DTO types:
  - `CreateEmployeeCommand`
  - `UpdateEmployeeCommand`
  - `AssignManagerCommand`
  - `CreateTeamCommand`
  - `UpdateTeamCommand`
  - `ListOptions` (limit, offset, max 50)

### `apps/api/src/workforce/workforce.repository.ts`

- `PostgresWorkforceRepository` using `DataSource` and raw SQL.
- Methods:
  - `createEmployee`, `getEmployee`, `listEmployees`, `updateEmployee`
  - `createTeam`, `getTeam`, `listTeams`, `updateTeam`
- All reads are scoped by `organization_id`.
- Updates use `version = expectedVersion` and `version = version + 1`.

### `apps/api/src/workforce/workforce.service.ts`

- `WorkforceService` orchestrating repository calls, validation, and audit.
- Validates DTOs, checks referenced `account_id`/`team_id` exist in the same
  organization, calls `EmployeeRelationshipRepository.assignManager` for the
  manager endpoint, and emits `AuditPort` events for every mutation.

### `apps/api/src/workforce/workforce.controller.ts`

- `@Controller('api/v1/workforce')` with the following routes:
  - `POST /employees` (requires `workforce:manage`)
  - `GET /employees` (requires `workforce:read:organization`)
  - `GET /employees/:id` (requires `workforce:read:organization`)
  - `PATCH /employees/:id` (requires `workforce:manage`)
  - `POST /employees/:id/manager` (requires `workforce:manage`)
  - `POST /teams` (requires `workforce:manage`)
  - `GET /teams` (requires `workforce:read:organization`)
  - `GET /teams/:id` (requires `workforce:read:organization`)
  - `PATCH /teams/:id` (requires `workforce:manage`)
- Reads `x-identity-*` and `x-correlation-id` headers, resolves `AccessContext`,
  enforces permissions and organization scope, then delegates to service.
- Returns safe 401/403 errors using `createSafeAuthorizationError`;
  domain errors return stable 400/409 responses without internal details.

### `apps/api/src/app.module.ts`

- Register `WorkforceController` and `WorkforceService` as providers.

### `apps/api/src/database/database.provider.ts`

- Change `migrationsRun` to `true`.

### `apps/api/src/database/migrations/1710000000001-CreateWorkforceSchema.ts`

- New TypeORM migration creating `teams` and altering `employees`.

### `apps/api/src/access/permissions.ts`

- No changes required; existing permissions already cover EH0004.

## Data Model Changes

```text
organizations (existing)
  └─ user_accounts (existing)
  └─ role_assignments (existing)
  └─ employees
       + display_name: varchar(120)
       + team_id: varchar nullable -> teams(id, organization_id)
       + version: integer default 0
       ~ manager_employee_id FK becomes composite (manager_employee_id, organization_id)
         -> employees(id, organization_id)
       + unique (id, organization_id)
  └─ teams (new)
       - id: varchar PK
       - organization_id: varchar -> organizations(id)
       - name: varchar(120)
       - active: boolean default true
       - version: integer default 0
       - unique (organization_id, name)
       - unique (id, organization_id) for composite FK target
```

## API Design

All request/response bodies are JSON. Organization scope is derived from the
authenticated `AccessContext`; the API never trusts a client `organizationId`.

### `POST /api/v1/workforce/employees`

**Request body**:
```json
{
  "accountId": "account-001",
  "displayName": "Jane Doe",
  "teamId": "team-001"
}
```

- `teamId` optional.
- `accountId` must reference an active `user_accounts` row in the same
  organization.

**Response 201**:
```json
{
  "id": "employee-001",
  "accountId": "account-001",
  "organizationId": "organization-001",
  "displayName": "Jane Doe",
  "teamId": "team-001",
  "managerEmployeeId": null,
  "active": true,
  "version": 0,
  "correlationId": "corr-001"
}
```

### `GET /api/v1/workforce/employees`

**Query**: `?limit=20&offset=0` (limit defaults to 50, capped at 50)

**Response 200**:
```json
{
  "items": [ ... ],
  "total": 12,
  "limit": 20,
  "offset": 0,
  "correlationId": "corr-001"
}
```

### `GET /api/v1/workforce/employees/:id`

**Response 200** (or 404 if not found in the same organization; 403 if caller
has no `workforce:read:organization` permission).

### `PATCH /api/v1/workforce/employees/:id`

**Request body**:
```json
{
  "displayName": "Jane Doe",
  "teamId": "team-002",
  "active": true,
  "expectedVersion": 0
}
```

- All fields optional except `expectedVersion`.
- `expectedVersion` is required for optimistic concurrency.

**Response 200** with the updated employee (or 409 if `expectedVersion` stale).

### `POST /api/v1/workforce/employees/:id/manager`

**Request body**:
```json
{
  "managerEmployeeId": "employee-002"
}
```

- Uses `EmployeeRelationshipRepository.assignManager` under the hood.
- Returns 200 with the updated employee.
- Returns 400 with stable messages for self, duplicate, inactive,
  cross-organization, or cyclic relationships.

### `POST /api/v1/workforce/teams`

**Request body**:
```json
{
  "name": "Engineering"
}
```

**Response 201** with team object including `version: 0`.

### `GET /api/v1/workforce/teams` and `GET /api/v1/workforce/teams/:id`

- Same pagination and scope pattern as employees.

### `PATCH /api/v1/workforce/teams/:id`

**Request body**:
```json
{
  "name": "Engineering",
  "active": true,
  "expectedVersion": 0
}
```

- Deactivating a team does **not** deactivate its employees (independent
  lifecycle assumption, flagged for review).

## Error Handling

| Scenario | HTTP | Safe response |
|----------|------|---------------|
| Missing/invalid/expired identity | 401 | `INVALID_IDENTITY` with stable message and correlationId |
| Caller lacks role/permission or wrong organization | 403 | `ACCESS_DENIED` with stable message and correlationId |
| Referenced account/team/manager not in same org or inactive | 400 | Stable message, no record-existence leakage |
| Manager relationship violates guard (self/cycle/etc.) | 400 | Stable message from `EmployeeRelationshipRepository` |
| Stale `expectedVersion` | 409 | "Resource was modified by another request" |
| Employee/Team not found in caller's organization (read) | 404 | Standard safe 404 |

All safe errors exclude stack traces, tokens, database details, and unrelated
organization data.

## State Management

- **No hard deletes**; `active` flag controls soft activation/deactivation.
- **Optimistic concurrency** via `version` column; every write increments version
  and requires the client to send the last known version.
- **Audit events** are appended via `AuditPort.emit` for every successful
  mutation. The in-memory implementation is acceptable for EH0004; EH0006
  will swap the adapter without changing call sites.
- **Same-organization invariant** enforced by composite FKs and application
  checks (double defense).

## Integration Points

- `IdentityAdapter` (from `access`) — validates header lifecycle claims.
- `PostgresAccountRepository` + `AccessResolver` (from `access`) — resolves
  the authenticated `AccessContext`.
- `hasPermission` / `canAccessOrganization` (from `access/permissions`) —
  enforces fixed-role and organization scope.
- `EmployeeRelationshipRepository` (from `access`) — assigns managers with
  transactional guard logic.
- `AuditPort` (from `access`) — emits sanitized workforce mutation events.
- `DataSource` (from `database`) — connection and transaction runner.

## Configuration

- No new environment variables.
- `migrationsRun: true` in the runtime `DataSource`.
- Pagination defaults: `limit` 50, `offset` 0.

## Dev Hints

- Reuse the `PostgreSqlContainer('postgres:18.6-alpine')` pattern from
  `access.spec.ts` for repository and API integration tests.
- For controller API tests, use
  `Test.createTestingModule({ imports: [AppModule] }).overrideProvider(DataSource).useValue(dataSource).compile()`.
- Run root quality checks with the existing `npm run ...` commands defined in
  the workspace `package.json`.
- When adding the migration, import both `CreateAccessSchema1710000000000` and
  `CreateWorkforceSchema1710000000001` into tests so the disposable database
  starts from a clean, fully migrated state.
