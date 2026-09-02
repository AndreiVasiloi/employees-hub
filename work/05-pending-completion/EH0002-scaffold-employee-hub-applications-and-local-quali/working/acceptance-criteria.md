# Acceptance Criteria: EH0002

## Epic Link

Enables EH-E1 dependency: **supported-version/scaffold decision**. This task does not independently satisfy EH-E1 workforce, profile, authorization, or audit acceptance criteria.

## Happy-Path Criteria

- [ ] **AC1 — reproducible workspace:** from a clean checkout, npm installs dependencies and documented root commands start the Angular and NestJS applications independently.
- [ ] **AC2 — local database:** Rancher Desktop starts the version-pinned PostgreSQL service with the documented Compose command.
- [ ] **AC3 — API liveness:** the API live endpoint returns `200` without requiring a database connection.
- [ ] **AC4 — API readiness:** with the configured PostgreSQL service available, the API readiness endpoint returns `200`.
- [ ] **AC5 — quality evidence:** format, lint, type-check, unit-test, and production-build commands pass locally and in GitHub Actions for pull requests and pushes to `master`.

## Error-Handling Criteria

- [ ] **AC6 — safe unavailable database:** when PostgreSQL is unavailable, the API readiness endpoint returns `503` and reveals no host, port, username, password, URL, stack trace, or driver detail.
- [ ] **AC7 — safe configuration:** missing or invalid required local database configuration fails predictably without logging secrets or connection details.

## Edge-Case Criteria

- [ ] **AC8 — migration discipline:** TypeORM migration tooling is configured with automatic schema synchronization disabled; no Employee Hub business table, entity, fixture, or migration is introduced.
- [ ] **AC9 — scope and data boundary:** the repository contains no real employee data, credentials, runtime environment files, identity-provider integration, business APIs, or deployment configuration.

## Evidence

- Root and application command output, including clean-checkout verification.
- Automated unit and disposable-PostgreSQL integration tests for live/readiness behavior.
- GitHub Actions run on a pull request or branch push to `master`.
- Repository/secret scan and manual review of committed configuration examples.
