+++
[metadata]
task_id = "EH0004"
title   = "Implement workforce and reporting-line administration"
status  = "01-pending-planning"
kind    = "story"

[sources]
epic      = "../../../explore/epics/EH-E1-secure-workforce-foundation.md#L21"
documents = [
  "../../../explore/epics/EH-E1-secure-workforce-foundation.md#L25-L33",
  "../../../explore/epics/EH-E1-secure-workforce-foundation.md#L37-L43",
  "../../../explore/prds/employee-hub-prd.md#L146",
  "../../../explore/hlds/employee-hub-hld.md#L45-L51",
  "../../../explore/decisions/employee-hub-adr-006-explicit-fixed-role-permission-matrix.md#L9",
  "../../../explore/decisions/employee-hub-adr-001-typeorm-postgresql-migrations.md#L9"
]

[links]
blocks  = []
related = [
  "../../06-completed/EH0002-scaffold-employee-hub-applications-and-local-quali/task.md",
  "../../06-completed/EH0003-implement-provider-neutral-identity-and-fixed-role/task.md"
]
parent  = ["../../../explore/epics/EH-E1-secure-workforce-foundation.md"]
child   = []

[workflow]
defined = "2026-09-03"
planned = ""
implemented = ""

[assignments]
definition     = ""
planning       = ""
implementation = ""
+++

# Task: Implement workforce and reporting-line administration

**Task ID**: EH0004
**Status**: 01-pending-planning
**Phase**: govern
**Date**: 2026-09-03
**Branch**: 

## Problem Statement

EH-E1 has a working identity and fixed-role authorization boundary from EH0003, but no workforce capability yet. HR cannot maintain employee, team, or manager reporting-line records, and employees have no profile data. Without this foundation, later leave requests, approvals, and availability views have no eligible actors or organizational context to act on.

## Goals & Acceptance Criteria

### Goals

- Introduce a Workforce bounded context alongside the existing Access context.
- Provide HR with safe, organization-scoped APIs to create, view, update, activate, and deactivate fictional Employee and Team records.
- Enforce single active manager per employee, same-organization scope, and rejection of self, cyclic, inactive, and cross-organization reporting lines.
- Ensure every workforce mutation is attributable and emits audit evidence through the existing `AuditPort`.
- Register and apply the new TypeORM migration(s) in local development and CI.

### Acceptance Criteria

- [ ] HR can create, view, update, activate, and deactivate Employee records within their organization.
- [ ] HR can create, view, update, activate, and deactivate Team records within their organization.
- [ ] Each active Employee has at most one active Manager in the same organization.
- [ ] Self, cyclic, inactive, duplicate, and cross-organization manager relationships are rejected with safe, stable error messages.
- [ ] All workforce endpoints derive organization and role scope from the server-side `AccessContext` and respect the fixed-role permission matrix.
- [ ] Changes emit structured audit events through `AuditPort` with actor, organization, target, action, outcome, and correlation facts.
- [ ] New and existing TypeORM migrations apply cleanly with `synchronize: false` in local and CI environments.
- [ ] Automated unit, integration, and API tests cover happy paths, negative paths, and cross-organization isolation.

## Non-Goals

- Leave policies, balances, previews, requests, approvals, or notifications.
- Dynamic roles or configurable permissions.
- External identity-provider or payroll/HRIS integration.
- Production deployment, secrets management, or real employee data.
- UI/UX beyond the server-side API boundary.

## Context & References

### Source Material

- [EH-E1 Secure Workforce Foundation](../../../explore/epics/EH-E1-secure-workforce-foundation.md) — epic objective, scope, and acceptance criteria.
- [EH-E1 Scope & Boundaries and Key Behaviors](../../../explore/epics/EH-E1-secure-workforce-foundation.md#L25-L33) — in-scope workforce/profile capabilities and safe-error behavior.
- [EH-E1 Acceptance Criteria](../../../explore/epics/EH-E1-secure-workforce-foundation.md#L37-L43) — R-001, R-009, R-011, and R-017 pass with fictional data.
- [R-011 Workforce and reporting-line administration](../../../explore/prds/employee-hub-prd.md#L146) — requirement for HR employee/team/manager management.
- [HLD Component Breakdown](../../../explore/hlds/employee-hub-hld.md#L45-L51) — Workforce component owns employee, team, manager, and schedule.
- [ADR-006 Explicit fixed-role permission matrix](../../../explore/decisions/employee-hub-adr-006-explicit-fixed-role-permission-matrix.md) — role/permission boundary.
- [ADR-001 TypeORM PostgreSQL migrations](../../../explore/decisions/employee-hub-adr-001-typeorm-postgresql-migrations.md) — explicit migration strategy and `synchronize: false`.

### Related Tasks

- **Related**: [EH0002 Scaffold Employee Hub applications and local quality baseline](../../06-completed/EH0002-scaffold-employee-hub-applications-and-local-quali/task.md) — provides the NestJS/TypeORM scaffold.
- **Related**: [EH0003 Implement provider-neutral identity and fixed-role authorization boundary](../../06-completed/EH0003-implement-provider-neutral-identity-and-fixed-role/task.md) — provides `AccessContext`, permissions, and `AuditPort`.

## Constraints & Dependencies

- Depends on the completed EH0002 scaffold and EH0003 authorization boundary.
- Must use PostgreSQL, TypeORM, explicit migrations, and the existing Vitest/Supertest/Testcontainers test setup.
- Must use fictional local data only; never commit real employee data, secrets, or runtime environment files.
- Must preserve the provider-neutral identity contract and not reconstruct role or organization scope from client input.
- Manager relationship validation must be transactional with appropriate locking, consistent with the pattern in `employee-relationship.repository.ts`.

## Success Metrics

- HR can manage employees, teams, and reporting lines through the API using only fictional test data.
- Cross-organization and unauthorized access attempts are rejected without exposing record existence or internal details.
- All acceptance criteria have automated evidence and pass in the root quality command and GitHub Actions.

## Notes

---

**Implementation Note**: This task definition captures requirements and acceptance criteria only. Technical implementation details belong in `plan.md`, created during the planning phase.
