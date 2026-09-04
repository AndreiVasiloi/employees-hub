+++
[metadata]
task_id = "EH0006"
title   = "Implement durable audit storage"
status  = "01-pending-planning"
kind    = "story"

[sources]
epic      = "../../../explore/epics/EH-E1-secure-workforce-foundation.md#L21"
documents = [
  "../../../explore/epics/EH-E1-secure-workforce-foundation.md#L25-L33",
  "../../../explore/prds/employee-hub-prd.md#L140",
  "../../../explore/hlds/employee-hub-hld.md#L45-L51",
  "../../../explore/decisions/employee-hub-adr-001-typeorm-postgresql-migrations.md#L9",
  "../../../explore/decisions/employee-hub-adr-006-explicit-fixed-role-permission-matrix.md#L9"
]

[links]
blocks  = [
  "../../02-planning/EH0004-implement-workforce-and-reporting-line-administrat/task.md",
  "../../06-completed/EH0003-implement-provider-neutral-identity-and-fixed-role/task.md"
]
related = []
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

# Task: Implement durable audit storage

**Task ID**: EH0006
**Status**: 01-pending-planning
**Phase**: govern
**Date**: 2026-09-03
**Branch**: 

## Problem Statement

EH0003 introduced a typed `AuditPort` with an in-memory adapter for authorization outcomes, satisfying the immediate test boundary but leaving events ephemeral. EH-E1 explicitly includes foundational audit and telemetry, and the EH0003 implementation summary notes that durable audit storage is deferred. Without durable, queryable audit records, security investigations and compliance review cannot be supported, and later epics that depend on immutable audit history (E5) will lack a store.

## Goals & Acceptance Criteria

### Goals

- Replace or extend the in-memory `AuditPort` with a durable, PostgreSQL-backed implementation for access and workforce events.
- Provide a safe, organization- and role-scoped read endpoint for audit history.
- Ensure emitted audit events are safe by design: no secrets, tokens, stack traces, or unnecessary personal/leave text.
- Wire the durable audit adapter into existing access decisions and workforce mutations from EH0003 and EH0004.

### Acceptance Criteria

- [ ] A new TypeORM entity/migration stores audit events with actor, organization, action, target, outcome, timestamp, and correlation facts.
- [ ] The `AuditPort` has a `PostgresAuditPort` implementation that persists events transactionally with their business action.
- [ ] Access-denied and access-allowed authorization outcomes are persisted through the new adapter.
- [ ] Workforce mutations from EH0004 emit persisted audit events.
- [ ] A protected read endpoint returns audit events scoped to the authenticated role and organization:
  - Employee sees own events.
  - Manager sees direct-report events.
  - HR and Administrator see organization events.
- [ ] Audit payloads exclude secrets, tokens, stack traces, and sensitive leave notes.
- [ ] Automated tests cover persistence, role/organization scoping, safe payload filtering, and transactional consistency.

## Non-Goals

- Full immutable ledger legal compliance or WORM storage.
- Audit investigation UI or advanced search/filtering.
- Notification delivery or external observability platform integration.
- Real-time streaming, metrics dashboards, or log aggregation.

## Context & References

### Source Material

- [EH-E1 Secure Workforce Foundation](../../../explore/epics/EH-E1-secure-workforce-foundation.md) — foundational audit and telemetry are in scope.
- [EH-E1 Scope & Boundaries](../../../explore/epics/EH-E1-secure-workforce-foundation.md#L25-L33) — server-derived identity, authorization, employee/team/profile, safe errors, audit, and telemetry.
- [R-010 Traceable sensitive actions](../../../explore/prds/employee-hub-prd.md#L140) — immutable audit history for leave, balance, employee, role, policy, holiday, access-denial, and configuration actions.
- [HLD Component Breakdown](../../../explore/hlds/employee-hub-hld.md#L45-L51) — Audit & Notification component owns audit, outbox, and delivery status.
- [ADR-001 TypeORM PostgreSQL migrations](../../../explore/decisions/employee-hub-adr-001-typeorm-postgresql-migrations.md) — explicit migration strategy.
- [ADR-006 Explicit fixed-role permission matrix](../../../explore/decisions/employee-hub-adr-006-explicit-fixed-role-permission-matrix.md) — role and permission boundary.
- [EH0003 Implementation Summary](../../06-completed/EH0003-implement-provider-neutral-identity-and-fixed-role/summary.md) — documents the deferred durable audit storage.

### Related Tasks

- **Blocks**: [EH0004 Implement workforce and reporting-line administration](../../02-planning/EH0004-implement-workforce-and-reporting-line-administrat/task.md) — workforce mutations to audit.
- **Blocks**: [EH0003 Implement provider-neutral identity and fixed-role authorization boundary](../../06-completed/EH0003-implement-provider-neutral-identity-and-fixed-role/task.md) — authorization outcomes to audit and `AuditPort` contract.

## Constraints & Dependencies

- Depends on EH0003's `AuditPort` contract and EH0004's workforce actions.
- Must use PostgreSQL, TypeORM, explicit migrations, and the existing Vitest/Supertest/Testcontainers test setup.
- Must remain provider-neutral and fictional-data only.
- Audit read operations must themselves be authorized and, where feasible, also auditable.
- Must not expose record existence or unauthorized organization data through audit queries.

## Success Metrics

- Authorization and workforce events survive application restart and are queryable by authorized roles.
- Cross-organization and unauthorized audit reads are rejected safely.
- Audit payloads are provably free of secrets and sensitive free text.
- All acceptance criteria have automated evidence and pass in the root quality command and GitHub Actions.

## Notes

---

**Implementation Note**: This task definition captures requirements and acceptance criteria only. Technical implementation details belong in `plan.md`, created during the planning phase.
