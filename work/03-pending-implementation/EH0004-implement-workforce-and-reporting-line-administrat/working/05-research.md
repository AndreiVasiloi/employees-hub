# Research Findings

## Search Terms

- `workforce`, `team`, `Team\b`
- `reporting-line`, `manager relationship`
- `EmployeeRelationshipRepository`, `assignManager`
- `R-011`
- `AuditPort`

## Decision Inventory

No decision in `explore/decisions/` mentions workforce, teams, or reporting-line
administration directly. The applicable accepted ADRs are the same ones EH0003
already followed:

| Decision ID | Status | Key Requirement | Link |
|-------------|--------|------------------|------|
| ADR-001 | Accepted | TypeORM + PostgreSQL, explicit migrations, `synchronize: false` | [employee-hub-adr-001-typeorm-postgresql-migrations.md](../../../../explore/decisions/employee-hub-adr-001-typeorm-postgresql-migrations.md) |
| ADR-006 | Accepted | Explicit fixed-role permission matrix (Employee/Manager/HR/Administrator) | [employee-hub-adr-006-explicit-fixed-role-permission-matrix.md](../../../../explore/decisions/employee-hub-adr-006-explicit-fixed-role-permission-matrix.md) |
| ADR-003 | Accepted | Provider-neutral identity adapter (no changes needed; EH0004 only consumes `AccessContext`) | [employee-hub-adr-003-provider-neutral-identity-adapter.md](../../../../explore/decisions/employee-hub-adr-003-provider-neutral-identity-adapter.md) |

No conflicts found with these decisions.

## Related Tasks

| Task ID | Status | Relationship | Link |
|---------|--------|---------------|------|
| EH0002 | Completed | Provides the NestJS/TypeORM/PostgreSQL/Vitest scaffold EH0004 extends. | [task.md](../../../06-completed/EH0002-scaffold-employee-hub-applications-and-local-quali/task.md) |
| EH0003 | Completed | Provides `AccessContext`, `FixedRole`, `E1Permission`, `AuditPort`, `PostgresAccountRepository`, and `EmployeeRelationshipRepository` that EH0004 builds directly on. | [task.md](../../../06-completed/EH0003-implement-provider-neutral-identity-and-fixed-role/task.md), [summary.md](../../../06-completed/EH0003-implement-provider-neutral-identity-and-fixed-role/summary.md) |
| EH0005 | Pending planning | Blocked by EH0004; consumes the Employee/profile records this task creates. | [task.md](../../../01-pending-planning/EH0005-implement-employee-profile-and-leave-summary/task.md) |
| EH0006 | Pending planning | Blocked by EH0004 and EH0003; will replace `InMemoryAuditPort` with durable storage without changing EH0004's `AuditPort` call sites. | [task.md](../../../01-pending-planning/EH0006-implement-durable-audit-storage/task.md) |

## Documentation References

| Document | Relevance | Link |
|----------|-----------|------|
| R-011 requirement | Defines exact acceptance criteria: create/view/update/activate/deactivate Employee and Team; single active manager; reject invalid/cyclic/self/inactive/cross-org; audit changes. | [employee-hub-prd.md#L146](../../../../explore/prds/employee-hub-prd.md#L146) |
| PRD Data model | Confirms `Employee` belongs to exactly one `Team` (simple FK relationship, not a membership/join table) and may reference one Manager Employee. | [employee-hub-prd.md#L384](../../../../explore/prds/employee-hub-prd.md#L384) |
| HLD Component Breakdown | Confirms Workforce component owns Employee, team, manager, schedule; does not own Policy or Balances. | [employee-hub-hld.md#L45-L51](../../../../explore/hlds/employee-hub-hld.md#L45-L51) |
| Boundary map | "Workforce Directory" context: Employees, teams, manager relationships, assigned schedules; input is organization scope and HR authority; output is eligible employee/manager/team/schedule facts. | [employee-hub-boundary-map.md#L27](../../../../explore/hlds/employee-hub-boundary-map.md#L27) |
| Domain flows (employee edit) | HR edit flow validates "Team, Manager, Account, and organization relationships" before commit; a stale update must be refreshed/reconciled rather than silently overwritten — implies optimistic concurrency on Employee updates. | [flows-employee-hub.md#L183-L206](../../../../explore/domain/flows-employee-hub.md) |
| `EmployeeRelationshipRepository` (code) | Already implements exactly the guard set R-011 requires for manager assignment: self, duplicate, inactive, cross-organization (via DB constraint), and cycle detection, inside a transactional `FOR UPDATE` lock. Confirmed reusable as-is for an HR-facing "assign manager" operation. | [employee-relationship.repository.ts](../../../../apps/api/src/access/employee-relationship.repository.ts) |
| `postgres-account.repository.ts` / `access.resolver.ts` (code) | Show the established pattern for a PostgreSQL-backed repository behind a narrow interface, consumed by a resolver — the pattern EH0004's Workforce repositories should follow. | [postgres-account.repository.ts](../../../../apps/api/src/access/postgres-account.repository.ts), [access.resolver.ts](../../../../apps/api/src/access/access.resolver.ts) |
| `permissions.ts` (code) | Existing `E1Permission` set already includes `workforce:read:direct-reports`, `workforce:read:organization`, and `workforce:manage`, granted to HR and Administrator (`workforce:manage`) and Manager (`workforce:read:direct-reports`). No new permission constants are required for EH0004's planned endpoints. | [permissions.ts](../../../../apps/api/src/access/permissions.ts) |
| `audit.port.ts` / `security-evidence.ts` (code) | `AuditPort.emit()` and `createAuthorizationAuditEvent()` define the existing safe audit-event shape (actor, organization, action, target, outcome, correlationId, occurredAt). EH0004 will reuse this shape for workforce mutation events rather than defining a new one. | [audit.port.ts](../../../../apps/api/src/access/audit.port.ts), [security-evidence.ts](../../../../apps/api/src/access/security-evidence.ts) |
| `1710000000000-CreateAccessSchema.ts` (migration) | Existing `employees` table already has `manager_employee_id` and organization/account foreign keys; EH0004 needs a new migration to add a `teams` table and an `employees.team_id` foreign key, and CRUD-supporting columns (e.g., name) if not already present. | [1710000000000-CreateAccessSchema.ts](../../../../apps/api/src/database/migrations/1710000000000-CreateAccessSchema.ts) |

## Conflicts and Gaps

| Conflict/Gap | Description | Resolution |
|--------------|--------------|------------|
| `employees` table has no `name` column | The existing schema (from EH0003) only has `id`, `organization_id`, `account_id`, `manager_employee_id`, `active`. R-011 requires viewable Employee records, which implies at least a display name. | Add `employees.team_id` (nullable FK to new `teams` table) in the EH0004 migration. Employee display name/profile fields: use the linked `user_accounts.identity_subject` for now if a friendly name is not otherwise available, or add a minimal `display_name` column if profile fields are in scope — resolve exact column set during technical approach/architecture step, informed by R-001 (EH0005) profile needs to avoid rework. |
| Optimistic concurrency for Employee updates | Domain flow (edit Employee) implies a stale update should be detected and reconciled, not silently overwritten. | Adopt a lightweight `version` column (matching the versioning pattern referenced by ADR-002 for other write paths) on `employees` and `teams`, checked on update. Confirm exact mechanism during technical approach (Step 7). |
| Team activate/deactivate cascading | R-011 requires Team activate/deactivate; unclear whether deactivating a Team cascades to its Employees or is independent. | No existing decision addresses this. Treat as an EH0004-scoped design decision: deactivating a Team does not deactivate its Employees (independent lifecycle), consistent with the epic's non-goal of avoiding leave-workflow side effects. Document as an assumption in the plan, flagged for Architect confirmation if raised during review. |

No blocking conflicts found. All ambiguities are resolvable within the technical approach step without further clarifying questions to the user, except the "Team activate/deactivate cascading" assumption, which will be stated explicitly in the plan for visibility.
