# Problem Capture: EH0002

## Problem Statement

Employee Hub has an approved product, architecture, quality, and delivery direction but no runnable applications or reproducible developer workflow. Without a version-pinned Angular and NestJS foundation, local PostgreSQL environment, and baseline quality automation, later E1 work cannot be implemented or verified consistently.

This task establishes that learning-project foundation now. Success is a developer being able to clone the repository, install dependencies, start PostgreSQL locally, run the web and API applications, and execute the baseline quality checks with only fictional or empty data.

## Stakeholders

- Sponsor / Lead Engineer: owns the learning outcome, local development experience, and delivery evidence.
- Andrei — Product Manager and Architect: protects the approved scope, modular-monolith boundaries, and deferred-contract decisions.
- Future contributors: need repeatable commands, clear configuration, and fast feedback.

## Affected Components

- [x] Angular web application
- [x] NestJS API application
- [x] PostgreSQL local environment
- [x] Cross-cutting workspace, quality tooling, and GitHub Actions baseline
- [ ] Manager application

## Confirmed Scope Decisions

1. Include the first GitHub Actions workflow for validation, build, and test.
2. Include a minimal API health endpoint and a database connectivity check, without business data or business endpoints.
3. Use Docker Compose for PostgreSQL only; run the Angular and NestJS applications locally through npm commands.

## Initial Questions

- Which exact current Node.js LTS, Angular, NestJS, TypeScript, PostgreSQL, and supporting-tool versions will be pinned in the repository?
- What npm-workspace layout and root commands give a clear developer workflow while preserving separate frontend and backend applications?
- Which quality checks can run immediately, and which require later business logic or a resolved Rancher contract?
- How will the API health and database-readiness paths avoid exposing configuration, credentials, or connection details?
- What minimal GitHub Actions permissions and workflow structure allow quality verification without introducing deployment credentials?

## Existing Context

- [EH-E1 Secure Workforce Foundation](../../../../explore/epics/EH-E1-secure-workforce-foundation.md) — requires a supported-version/scaffold decision before reproducible implementation.
- [PRD](../../../../explore/prds/employee-hub-prd.md) — NFR-004 to NFR-007, NFR-011, NFR-017 to NFR-020 govern the foundation.
- [HLD](../../../../explore/hlds/employee-hub-hld.md) — separate Angular/NestJS applications, PostgreSQL, modular-monolith boundaries, and local Docker direction.
- [ADR-001](../../../../explore/decisions/employee-hub-adr-001-typeorm-postgresql-migrations.md) and [ADR-003](../../../../explore/decisions/employee-hub-adr-003-provider-neutral-identity-adapter.md) — TypeORM/PostgreSQL migrations and a later provider-neutral identity adapter.
- [Test strategy](../../../../explore/explore-employee-hub/test-strategy.md) and [DevOps strategy](../../../../explore/explore-employee-hub/devops-strategy.md) — Jest, Vitest plus Angular Testing Library, GitHub Actions, and fictional-data constraints.

## Planning Constraint

The task intentionally does not resolve the external identity-provider, Rancher runtime, or API/event-schema contracts. They remain explicit task-gated deferrals recorded in the Explore handoff.
