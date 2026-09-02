# EH0002 Test Inventory and Implementation Strategy

## Test Inventory

### Web unit tests

- [x] Generated Angular baseline test executes through the root test command.
- [x] Angular production build completes through the root build command.

### API unit tests

- [x] `health_live_returns_200_without_database` verifies liveness does not depend on PostgreSQL.
- [x] `health_ready_returns_200_when_database_query_succeeds` verifies the ready response mapping.
- [x] `health_ready_returns_503_when_database_query_fails` verifies the not-ready response mapping.
- [x] `health_responses_exclude_sensitive_configuration` verifies responses contain no host, port, user, password, URL, stack, or driver details.
- [x] `configuration_rejects_invalid_database_settings_without_logging_secrets` verifies safe configuration validation.

### API and database integration tests

- [x] `health_ready_reaches_disposable_postgresql` verifies the API executes a bounded `SELECT 1` against disposable PostgreSQL.
- [x] `typeorm_configuration_disables_synchronization` verifies migration configuration uses `synchronize: false` and introduces no business schema.

### Workspace and pipeline tests

- [x] Clean-install verification runs `npm ci` and all documented root quality commands.
- [x] GitHub Actions quality workflow runs for pull requests and pushes to `master` with the pinned Node version.
- [x] Rancher Desktop Compose starts the documented PostgreSQL service and reports healthy.

### Security and scope checks

- [x] Repository review confirms no runtime `.env`, credentials, real employee data, identity-provider integration, business API, or deployment configuration is committed.

### Pipeline test requirements

CATS, Karate, fuzz testing, and business E2E tests are not required. This task adds only scaffold health endpoints and local quality infrastructure; the planned API tests and CI checks provide the required evidence.

## Implementation Strategy

1. Create the root npm workspace, Node pin, ignore rules, documentation, and application directories.
2. Generate the Angular and NestJS applications with their framework-supported test baselines.
3. Add root scripts and verify install, format, lint, type-check, test, and build commands.
4. Add Rancher Desktop PostgreSQL Compose configuration and non-secret example settings.
5. Add validated API configuration and TypeORM migration infrastructure with synchronization disabled.
6. Write failing API health/readiness tests, then implement the endpoints in small increments.
7. Add disposable-PostgreSQL readiness integration coverage and verify the migration configuration.
8. Add the GitHub Actions workflow and run the same root commands locally.
9. Perform the final scope, secret, and clean-checkout checks.

## Coverage Check

| Acceptance criterion                           | Tests/evidence                 |
| ---------------------------------------------- | ------------------------------ |
| Clean install and documented app startup       | Workspace and pipeline tests   |
| Local PostgreSQL through Rancher Desktop       | Compose lifecycle verification |
| Safe live/readiness outcomes                   | API unit and integration tests |
| Quality checks locally and in GitHub Actions   | Workspace and pipeline tests   |
| No sensitive data or out-of-scope integrations | Security and scope check       |
