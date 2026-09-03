+++
[metadata]
task_id = "EH0005"
title   = "Implement employee profile and leave summary"
status  = "01-pending-planning"
kind    = "story"

[sources]
epic      = "../../../explore/epics/EH-E1-secure-workforce-foundation.md#L21"
documents = [
  "../../../explore/epics/EH-E1-secure-workforce-foundation.md#L37-L43",
  "../../../explore/prds/employee-hub-prd.md#L131",
  "../../../explore/hlds/employee-hub-hld.md#L45-L51",
  "../../../explore/decisions/employee-hub-adr-006-explicit-fixed-role-permission-matrix.md#L9",
  "../../../explore/decisions/employee-hub-adr-001-typeorm-postgresql-migrations.md#L9"
]

[links]
blocks  = ["../EH0004-implement-workforce-and-reporting-line-administrat/task.md"]
related = [
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

# Task: Implement employee profile and leave summary

**Task ID**: EH0005
**Status**: 01-pending-planning
**Phase**: govern
**Date**: 2026-09-03
**Branch**: 

## Problem Statement

Employees need a secure, server-side view of their own profile and current leave position. EH0003 provides identity and authorization, and EH0004 will provide the workforce records, but no endpoint yet returns an employee's permitted profile, leave balances, or request summary. R-001 is part of EH-E1 acceptance criteria and must pass with fictional data before the epic can be accepted.

## Goals & Acceptance Criteria

### Goals

- Provide a server-side endpoint that returns the authenticated employee's own profile and leave summary.
- Ensure the response is scoped to the employee's organization and never trusts client-supplied identifiers.
- Return real leave balances when configuration exists and a safe explanation when it does not.
- Build on the existing `AccessContext` and permission matrix from EH0003.

### Acceptance Criteria

- [ ] The API returns only the authenticated Employee's permitted profile, balances, and request summary.
- [ ] Each balance identifies leave type, entitlement period, available, reserved, and used amounts.
- [ ] Inactive or unavailable leave configuration is explained without fabricating a balance.
- [ ] The endpoint respects the fixed-role permission matrix and denies cross-organization or unauthenticated access safely.
- [ ] The response shape can be populated with fictional seed data for acceptance testing and with real policy/balance data in later epics without API changes.
- [ ] Manager and HR scoped views (e.g. direct-report profile for a Manager) are not required here but must not be blocked by the design.
- [ ] Automated tests cover own-profile reads, missing identity, cross-organization isolation, and unavailable-balance explanation.

## Non-Goals

- Manager direct-report queue or team availability (R-005, R-015) — belongs to later epics.
- Leave request preview, submission, cancellation, or decision workflows (R-002–R-008).
- Full leave policy, calendar, schedule, or balance ledger implementation (E2 and E3).
- UI/UX implementation beyond the server-side API.

## Context & References

### Source Material

- [EH-E1 Secure Workforce Foundation](../../../explore/epics/EH-E1-secure-workforce-foundation.md) — epic objective and acceptance criteria.
- [EH-E1 Acceptance Criteria](../../../explore/epics/EH-E1-secure-workforce-foundation.md#L37-L43) — requires R-001, R-009, R-011, and R-017 to pass with fictional data.
- [R-001 Own profile and leave summary](../../../explore/prds/employee-hub-prd.md#L131) — requirement definition and acceptance criteria.
- [HLD Component Breakdown](../../../explore/hlds/employee-hub-hld.md#L45-L51) — Workforce context provides employee/profile data; Workflow & Balances owns ledger details.
- [ADR-006 Explicit fixed-role permission matrix](../../../explore/decisions/employee-hub-adr-006-explicit-fixed-role-permission-matrix.md) — role and permission boundary.

### Related Tasks

- **Blocks**: [EH0004 Implement workforce and reporting-line administration](../EH0004-implement-workforce-and-reporting-line-administrat/task.md) — provides employee and profile records.
- **Related**: [EH0003 Implement provider-neutral identity and fixed-role authorization boundary](../../06-completed/EH0003-implement-provider-neutral-identity-and-fixed-role/task.md) — provides `AccessContext` and permissions.

## Constraints & Dependencies

- Depends on EH0004 for employee/profile records and EH0003 for authentication/authorization.
- Must use PostgreSQL, TypeORM, explicit migrations, and the existing Vitest/Supertest/Testcontainers test setup.
- Must use fictional local data only; real employee data and secrets are prohibited.
- Must not trust client-supplied employee or organization identifiers.
- The leave balance read must not duplicate the eventual ledger logic in E2/E3; it may surface a simple, authoritative projection that later epics replace or extend.

## Success Metrics

- An authenticated employee can retrieve their own profile and leave summary via the API.
- Cross-organization and unauthorized requests are rejected safely.
- The unavailable-configuration case returns a clear, non-fabricated explanation.
- Automated evidence passes in the root quality command and GitHub Actions.

## Notes

---

**Implementation Note**: This task definition captures requirements and acceptance criteria only. Technical implementation details belong in `plan.md`, created during the planning phase.
