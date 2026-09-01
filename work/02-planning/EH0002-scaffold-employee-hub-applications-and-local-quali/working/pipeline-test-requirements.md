# Pipeline Test Requirements: EH0002

## Smoke Tests

| Endpoint | Method | Scenario | Expected |
|---|---|---|---|
| `/health/live` | `GET` | API process is running without requiring PostgreSQL. | `200` with a stable, non-sensitive live status. |
| `/health/ready` | `GET` | API is connected to the configured PostgreSQL service. | `200` with a stable, non-sensitive ready status. |
| `/health/ready` | `GET` | PostgreSQL is unavailable or the API cannot connect. | `503` with a stable, non-sensitive not-ready status and no connection details. |

## Fuzz Tests

- **Reference data:** none; the health routes accept no user-controlled business payload.
- **Excluded endpoints:** `/health/live` and `/health/ready` are excluded from automated fuzzing for this increment.
- **Special configuration:** none. Fuzzing begins with business APIs that have documented input contracts.

## Integration Tests

| Scenario | Steps | Test data | Expected |
|---|---|---|---|
| Database readiness succeeds | Start PostgreSQL through Testcontainers or a CI service container, boot the API, call readiness. | Empty fictional database. | Readiness returns `200`; no business schema or data is required. |
| Database readiness fails safely | Boot the API against unavailable database configuration, call readiness. | None. | Readiness returns `503` without host, port, username, password, URL, stack trace, or driver detail. |
| Clean workspace verification | From a clean checkout, install dependencies and run root format, lint, type-check, unit-test, and production-build commands. | None. | Every command succeeds locally and in GitHub Actions. |

## CI Mapping

- Pull requests and pushes to `master` run clean install, format check, lint, type-check, unit tests, and production builds.
- Database-readiness integration tests use a disposable PostgreSQL dependency; no shared environment, deployment credential, identity provider, or real data is used.
- Later E2E, performance, DAST, and authorization matrices remain out of scope until their owning capabilities exist.
