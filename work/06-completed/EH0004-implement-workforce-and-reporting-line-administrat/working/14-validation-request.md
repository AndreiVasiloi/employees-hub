# Govern Validation Request

## Task

EH0004 — Implement workforce and reporting-line administration.

## Acceptance Criteria

Validate that the implementation provides HR-scoped employee and team CRUD,
safe manager assignment with self/duplicate/inactive/cross-organization/cycle
rejection, server-derived authorization scope, structured audit evidence,
explicit TypeORM migrations with `synchronize: false`, and automated happy,
negative, and isolation coverage.

## Review Scope

- `apps/api/src/workforce/teams/`
- `apps/api/src/workforce/employees/`
- `apps/api/src/access/access-request.executor.ts`
- `apps/api/src/common/optimistic-lock.error.ts`
- `apps/api/src/database/migrations/1710000000001-CreateWorkforceSchema.ts`
- `apps/api/src/database/database.provider.ts`
- `apps/api/src/app.module.ts`
- `apps/api/src/workforce/workforce.spec.ts`
- `apps/api/test/health.integration-spec.ts`
- `work/05-pending-completion/EH0004-implement-workforce-and-reporting-line-administrat/task.md`
- `work/05-pending-completion/EH0004-implement-workforce-and-reporting-line-administrat/summary.md`

## Evidence

- Workspace web tests: 2 passed.
- Workspace script tests: 4 passed.
- API tests: 57 passed, 35 legacy scenarios skipped.
- Type-check and production builds passed.
- Testcontainers migration test passed in isolation and in the succeeding full
  API run; one earlier parallel run timed out at the existing 60-second limit.

## Instructions

Perform a read-only review. Do not edit files or run destructive commands.
Assess the listed artifacts only against the stated acceptance criteria and
project constraints. Return a concise report with PASS, WARN, or FAIL for:

1. domain and API behavior;
2. security and organization isolation;
3. persistence and migration correctness;
4. audit integration;
5. test coverage and quality evidence;
6. completion artifacts.

For every WARN or FAIL, provide a concrete reason and remediation. Do not
invent requirements beyond the task definition.
