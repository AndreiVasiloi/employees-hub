# Implementation Inventory: EH0003

## Test Inventory

### Unit Tests — 8

- [ ] `identityAdapter_validIdentity` — maps the signed-token-shaped subject and
      lifecycle claims to the provider-neutral identity contract.
- [ ] `identityAdapter_invalidLifecycle` — rejects malformed, invalid, and
      expired identity input without exposing provider details.
- [ ] `accessResolver_linkedActiveAccount` — resolves the authoritative account,
      organization, role, employee, and manager context.
- [ ] `accessResolver_unlinkedOrInactiveAccount` — rejects missing or inactive
      server-owned account links.
- [ ] `permissionPolicy_fixedRoleMatrix` — verifies every E1 permission for
      Employee, Manager, HR, and Administrator.
- [ ] `permissionPolicy_organizationScope` — rejects client-supplied or
      cross-organization scope tampering.
- [ ] `permissionPolicy_managerDirectReports` — allows direct reports and
      denies self, unrelated, inactive, and cross-organization subjects.
- [ ] `safeErrorAndAuditEvent_sanitized` — produces stable safe errors and
      allow-listed attributable audit events with correlation IDs.

### Integration Tests — 8

- [ ] `migrations_accessSchema` — applies cleanly with synchronization disabled.
- [ ] `relationships_sameOrganization` — accepts valid links and rejects
      cross-organization account, role, employee, and manager relationships.
- [ ] `relationships_invalidManager` — rejects self, cyclic, duplicate, and
      inactive manager relationships.
- [ ] `identityResolution_postgres` — resolves a fictional linked identity from
      real PostgreSQL records.
- [ ] `identityResolution_rejectedInputs` — absent, invalid, expired, unlinked,
      and inactive identities cause no protected mutation.
- [ ] `authorization_isolation` — two fictional organizations cannot cross-read
      or cross-operate through the policy fixture.
- [ ] `authorization_roleAndManagerScope` — verifies the full fixed-role and
      reporting-line matrix using persisted records.
- [ ] `auditPort_authorizationOutcomes` — receives sanitized allowed and denied
      events with actor, organization, target, outcome, and correlation facts.

### API Tests — 6

- [ ] `GET /api/v1/access/me_validIdentity` — returns the safe resolved context.
- [ ] `GET /api/v1/access/me_missingIdentity` — returns a stable safe `401`.
- [ ] `GET /api/v1/access/me_invalidOrExpiredIdentity` — returns safe rejection
      without provider or account details.
- [ ] `GET /api/v1/access/me_unlinkedIdentity` — returns safe rejection without
      account-existence leakage.
- [ ] `GET /api/v1/access/policy-fixture_allowedCapability` — permits an
      authorized E1 capability.
- [ ] `GET /api/v1/access/policy-fixture_deniedScopeOrRole` — denies tampered,
      cross-organization, and role-inappropriate requests safely.

### Event and Security Tests — 3

- [ ] Correlation ID is preserved from request to emitted audit event.
- [ ] Audit/error payloads exclude secrets, tokens, stack traces, and
      unnecessary personal or leave data.
- [ ] Local/test identity override is unavailable when the application runs in
      production mode.

### Pipeline Tests

- [ ] No CATS or Karate suites are specified for this repository.
- [ ] Run the existing GitHub Actions quality workflow and root `verify` command.
- [ ] Use disposable PostgreSQL for integration tests; do not require shared
      credentials, external identity providers, or deployment infrastructure.

## Acceptance-Criteria Coverage

| Criteria | Evidence |
|---|---|
| AC1–AC4 | Identity, resolver, and valid API tests. |
| AC5–AC8 | Rejected-input, safe-error, isolation, and audit tests. |
| AC9–AC12 | Manager, Administrator, relationship, and production-guard tests. |
| AC13–AC16 | Migration, PostgreSQL, audit-port, API, and client-boundary tests. |

## Implementation Strategy

1. Establish the Access module contracts and write the first failing unit test
   for identity resolution.
2. Add the minimum entities, repositories, migrations, and fictional fixtures;
   prove persistence constraints with PostgreSQL tests.
3. Implement the identity adapter and account/context resolver until the unit
   and integration tests pass.
4. Implement the explicit E1 policy matrix and manager scope, then add the
   protected HTTP routes and API tests.
5. Add safe error mapping, correlation propagation, and the typed audit port;
   verify sanitized outcomes.
6. Run the complete root verification command and review the diff against the
   plan and acceptance criteria.

## Integration and Configuration Notes

- Extend the existing `apps/api/src` NestJS ESM layout; keep `.js` import
  suffixes and existing Vitest configuration conventions.
- Keep `synchronize: false` and add explicit TypeORM migrations.
- Use non-production configuration to enable the fictional identity override;
  fail closed in production.
- Keep Angular unchanged for this task.

