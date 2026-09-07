# Problem Capture

## Problem Statement

**Current state**: EH0003 delivered a provider-neutral identity adapter and fixed-role
authorization boundary (Employee, Manager, HR, Administrator). It exposes
`GET /api/v1/access/me` and `GET /api/v1/access/policy-fixture` backed by a
`PostgresAccountRepository` and an `EmployeeRelationshipRepository` that already
enforces same-organization and manager-cycle invariants for a single hard-coded
manager assignment operation. There is no HR-facing capability to create, view,
update, activate/deactivate Employee or Team records, and no general-purpose
API for managing manager relationships.

**Desired state**: HR can manage the workforce (Employees, Teams, and manager
reporting lines) for their own organization through safe, authorized,
audited APIs. Every mutation enforces the same-organization boundary and
rejects self, cyclic, inactive, duplicate, and cross-organization
relationships. This unlocks eligible actors for later leave-request,
approval, and availability epics (E2–E4).

**Business driver**: R-011 (Workforce and reporting-line administration) is
one of the four requirements (R-001, R-009, R-011, R-017) that EH-E1's
acceptance criteria require to pass with fictional data before the epic can
be accepted. Without it, HR has no way to onboard fictional employees or
correct reporting lines, blocking all downstream leave-management epics.

## Stakeholders

- **HR**: Primary actor; creates/maintains Employee and Team records and
  manager relationships.
- **Administrator**: Has `workforce:manage` and `workforce:read:organization`
  permissions (per the existing E1Permission matrix) and can perform the same
  workforce operations as HR within their organization.
- **Employee / Manager**: Indirect stakeholders — their profile and reporting
  line data is created/maintained by this task, consumed by later epics
  (EH0005 and beyond).
- **Architect / Andrei**: Approves the technical plan and epic-level scope
  boundary (EH-E1 vs. later epics).

## Affected Components

- [ ] Manager
- [x] Server (`apps/api/src/access` extended with a new Workforce module or
      new files under `apps/api/src/workforce`)
- [ ] App
- [ ] Cross-cutting

## Initial Questions

- [x] Should Workforce be a new NestJS module/folder distinct from `access/`,
      matching the HLD's five bounded contexts (Access vs. Workforce)? —
      Yes, per HLD Component Breakdown (Access ≠ Workforce ownership).
- [x] Does Team need its own table now, or can it be deferred? — R-011
      explicitly requires HR to manage Team records, so a minimal `teams`
      table is in scope.
- [x] Should Employee creation also create a linked `user_accounts` row, or
      can Employees exist without a linked account (e.g., pre-onboarding)? —
      **Decided**: Employee creation requires an existing, linked
      `user_accounts` row; account-less employees are out of scope for
      EH0004.
- [ ] Should the general-purpose "assign/change manager" endpoint replace or
      wrap the existing `EmployeeRelationshipRepository.assignManager`, or is
      a new repository method needed for HR-driven changes (vs. the
      EH0003-internal usage)? To confirm during technical research.
- [x] What audit mechanism should workforce mutations use given EH0006
      (durable audit storage) is not yet implemented? — **Decided**: reuse
      the existing `AuditPort`/`InMemoryAuditPort` interface now; EH0006
      will swap in the durable implementation without changing EH0004's
      call sites.

## Existing Context

- [EH-E1 Secure Workforce Foundation](../../../../explore/epics/EH-E1-secure-workforce-foundation.md)
- [R-011 Workforce and reporting-line administration](../../../../explore/prds/employee-hub-prd.md#L146)
- [HLD Component Breakdown](../../../../explore/hlds/employee-hub-hld.md#L45-L51)
- [ADR-006 Explicit fixed-role permission matrix](../../../../explore/decisions/employee-hub-adr-006-explicit-fixed-role-permission-matrix.md)
- [ADR-001 TypeORM PostgreSQL migrations](../../../../explore/decisions/employee-hub-adr-001-typeorm-postgresql-migrations.md)
- [EH0003 task.md](../../../06-completed/EH0003-implement-provider-neutral-identity-and-fixed-role/task.md) and [summary.md](../../../06-completed/EH0003-implement-provider-neutral-identity-and-fixed-role/summary.md) — existing Access module, `employees`/`user_accounts` schema, and `EmployeeRelationshipRepository` to build on.
- [EH0004 task.md](../task.md) — this task's requirements-only definition.
