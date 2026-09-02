# Pipeline Test Requirements: EH0003

## Smoke Tests

This task adds protected API endpoints and therefore requires an authenticated
happy-path smoke check after the API is running. The local/test identity stub is
the only permitted identity source for this increment.

| Endpoint | Method | Scenario | Expected |
|---|---|---|---|
| `/api/v1/access/me` | GET | Linked fictional account presents a valid signed-token-shaped identity. | `200`; returns only the resolved account, organization, role, and permitted employee context. |
| `/api/v1/access/policy-fixture` | GET | A fixture identity invokes an allowed E1 policy capability. | `200`; response contains no unrelated organization or employee data. |
| `/api/v1/access/me` | GET | Valid identity is linked to an inactive or missing account. | `401` or `403` with stable safe error and correlation ID; no context is returned. |

## Fuzz Tests

- **Reference Data:** Fictional organizations, accounts, fixed roles, employees,
  and direct-report relationships for positive and negative matrix cases.
- **Inputs:** Missing, malformed, tampered, expired, unlinked, and oversized
  identity headers/tokens; client-supplied organization and role values;
  unknown route identifiers.
- **Excluded Endpoints:** Health endpoints and the development-only identity
  override are excluded from shared-environment fuzzing; the override must be
  covered by isolated unit/integration tests and unavailable in production.
- **Special Config:** Fuzz assertions must verify stable safe errors, no stack
  traces or secrets, no record-existence leakage, and no database mutation.

## Integration Tests

| Scenario | Steps | Test Data | Expected |
|---|---|---|---|
| Identity resolution | Seed a fictional organization and linked account; call `/access/me` with a valid adapter identity. | One active account, one role, one employee. | The server resolves the authoritative organization and role and returns safe context. |
| Identity rejection | Repeat with absent, invalid, expired, unlinked, and inactive identities. | Separate invalid identity cases. | Each request is rejected safely, emits required audit-event data, and changes no records. |
| Organization isolation | Present an identity from organization A while requesting a fixture subject in organization B. | Two organizations with equivalent fictional records. | Access is denied without revealing whether the other record exists. |
| Fixed-role matrix | Exercise every E1 capability as Employee, Manager, HR, and Administrator. | One account for each fixed role. | Allowed actions succeed; unspecified and prohibited actions are denied server-side. |
| Manager scope | Exercise self, direct-report, unrelated, inactive, and cross-organization employee cases. | Manager with one direct report plus negative subjects. | Only the direct report is accessible; self and unrelated cases are denied. |
| Administrator safeguards | Attempt broad permitted E1 actions, self-approval-shaped access, and immutable audit/ledger mutation-shaped access. | Administrator account and fictional protected subjects. | Explicit permissions allow only approved E1 actions; safeguards remain denied. |
| Persistence constraints | Apply migrations and attempt invalid account, role, organization, and manager relationships. | Duplicate, inactive, self, cyclic, and cross-organization fixtures. | Database constraints and application policies reject invalid relationships. |
| Audit event contract | Correlate allowed and denied requests through the typed audit port. | Fictional actor, organization, target, outcome, and correlation ID. | Event payload is attributable and sanitized; durable audit persistence remains deferred. |

## Unit and CI Evidence

- Vitest unit tests cover identity mapping, role permissions, organization
  scope, direct-report scope, safe error construction, and audit-event shaping.
- PostgreSQL integration tests run against a disposable database and apply real
  migrations; no shared credentials or real data are used.
- The existing root verification command must pass format, lint, type-check,
  all unit/integration tests, and production builds.
- GitHub Actions must publish the same test evidence on pull requests and
  pushes to `master`.
- Coverage should emphasize the authorization matrix and negative paths; no
  blanket threshold is added beyond the repository's current policy.

