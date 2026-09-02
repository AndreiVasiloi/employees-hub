+++
[metadata]
task_id = "EH0002"
title   = "Scaffold Employee Hub applications and local quality baseline"
status  = "04-implementing"

[sources]
epic      = "../../../explore/epics/EH-E1-secure-workforce-foundation.md#L21"
documents = [
  "../../../explore/tooling.md#L3",
  "../../../explore/hlds/employee-hub-hld.md#L39",
  "../../../explore/decisions/employee-hub-adr-001-typeorm-postgresql-migrations.md#L9",
  "../../../explore/decisions/employee-hub-adr-003-provider-neutral-identity-adapter.md#L9",
  "../../../explore/explore-employee-hub/test-strategy.md#L28",
  "../../../explore/explore-employee-hub/devops-strategy.md#L46"
]

[links]
blocks  = []
related = [
  "../../05-pending-completion/EH-0001-explore-consistency-check/task.md",
  "../../05-pending-completion/EH0001-form-employee-hub-epics/task.md"
]
parent  = ["../../../explore/epics/EH-E1-secure-workforce-foundation.md"]
child   = []

[workflow]
defined = "2026-09-01"
planned = ""
implemented = "2026-09-02"

[assignments]
definition     = ""
planning       = ""
implementation = "andrei_vasiloi@yahoo.com"
+++

# Task: Scaffold Employee Hub applications and local quality baseline

**Task ID**: EH0002
**Status**: 04-implementing
**Phase**: govern
**Date**: 2026-09-01
**Branch**: impl/EH0002-scaffold-employee-hub-applications-and-local-quali

## Problem Statement

Employee Hub has an approved product and architecture direction but no runnable applications or reproducible developer workflow. A small foundation increment is needed so later workforce and leave capabilities can be built and verified consistently.

## Goals & Acceptance Criteria

### Goals

- Provide separate, runnable web and API application foundations.
- Provide a repeatable local database and development setup.
- Provide baseline quality checks and GitHub verification.
- Preserve the fictional-data and no-secrets boundary.

### Acceptance Criteria

- [ ] A clean checkout can install dependencies and start the web and API applications using documented commands.
- [ ] The local PostgreSQL service can be started through the documented developer setup.
- [ ] The API exposes safe live and database-readiness outcomes for local verification.
- [ ] Baseline format, lint, type-check, unit-test, and production-build checks pass locally and in GitHub Actions for pull requests and pushes to `master`.
- [ ] No real employee data, credentials, runtime environment files, identity-provider integration, business leave functionality, or shared deployment configuration is included.

## Non-Goals

- Authentication, identity-provider integration, roles, workforce/profile features, and authorization.
- Leave policies, calendars, balances, requests, approvals, notifications, audit business events, and business schema.
- Rancher shared-cluster deployment, image publishing, deployment credentials, and production operations.

## Context & References

### Source Material

- [EH-E1 Secure Workforce Foundation](../../../explore/epics/EH-E1-secure-workforce-foundation.md) - establishes this scaffold as an E1 prerequisite.
- [Employee Hub PRD](../../../explore/prds/employee-hub-prd.md) - defines quality, security, fictional-data, and traceability requirements.
- [Employee Hub HLD](../../../explore/hlds/employee-hub-hld.md) - defines separate applications, PostgreSQL, and modular-monolith boundaries.
- [Test strategy](../../../explore/explore-employee-hub/test-strategy.md) and [DevOps strategy](../../../explore/explore-employee-hub/devops-strategy.md) - define approved testing, CI expectations, and the `master` branch.

### Related Tasks

- **Blocks**: Later E1 identity, workforce, authorization, and audit implementation tasks; E2-E6 foundation-dependent tasks.
- **Related**: EH-0001 Explore consistency check and EH0001 epic-forming session.

## Constraints & Dependencies

- Use npm, current compatible Node.js LTS, Angular, NestJS/TypeScript, PostgreSQL, TypeORM, and Rancher Desktop for local Compose execution.
- Use fictional or empty local data only; never commit secrets or runtime environment files.
- Identity-provider, Rancher shared-runtime, and API/event-schema blockers remain deferred.
- No blocking dependency prevents this local foundation task.

## Success Metrics

- A contributor can complete the documented clean-checkout setup and run the baseline verification commands.
- GitHub Actions produces passing quality evidence without deployment credentials.
- API health/readiness behavior is covered by automated tests and does not expose sensitive configuration.

## Notes

Technical implementation details, test inventory, risks, sequencing, and exact decisions are documented in [plan.md](plan.md). Supporting planning evidence is in [working/](working/), and the sizing assessment is in [size.md](size.md).
---

**Implementation Note**: This task definition captures requirements and acceptance criteria only. Technical implementation details belong in `plan.md`, created during the planning phase.

## Decision Changes During Implementation

- **2026-09-02 — Backend test runner changed from Jest to Vitest.** NestJS 12 generates an ESM application and its current CLI baseline uses Vitest. The initial Jest/CommonJS attempt failed while loading the ESM `@nestjs/testing` package. Vitest preserves the framework-supported setup with less configuration complexity and no product-scope impact.
