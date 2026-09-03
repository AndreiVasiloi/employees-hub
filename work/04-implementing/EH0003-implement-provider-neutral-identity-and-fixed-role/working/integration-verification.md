# Integration Verification: EH0003 Access Boundary Tests

## Current Test Boundary

The current green tests verify the provider-neutral identity and authorization
boundaries plus real PostgreSQL persistence integrations. The access schema
migration and organization relationship test run against disposable
PostgreSQL 18.6 containers with TypeORM synchronization disabled. Repository,
HTTP, and audit-port integrations remain deferred to later TDD loops.

## Integration Status

### Identity Adapter

- [x] A real TypeScript adapter implementation exists.
- [x] The test exercises the adapter directly rather than mocking it.
- [x] The adapter returns the normalized provider-neutral identity contract.
- [x] Lifecycle validation uses a deterministic injected clock and rejects
      empty, malformed, and expired identities with a safe error.

### Access Resolver

- [x] A real resolver implementation exists and consumes the typed account
      repository boundary.
- [x] The linked-account test exercises subject matching and returns the
      server-owned organization, role, employee, and manager context.
- [x] Missing and inactive account links fail closed through the resolver and
      return the same safe identity error.

### Fixed-Role Policies

- [x] The explicit E1 permission matrix is implemented as a server-side policy
      function.
- [x] The policy test exercises all five E1 permissions for all four fixed
      roles; no client or persistence integration is required yet.
- [x] Organization policy checks use the resolved server-owned organization and
      reject cross-organization targets and unauthorized role escalation.
- [x] Manager scope requires an active same-organization direct-report relation
      and rejects self, unrelated, inactive, and cross-organization targets.

### Security Evidence

- [x] Safe authorization errors have stable codes, status values, messages, and
      correlation identifiers.
- [x] Audit-event shaping retains attribution and outcome facts while dropping
      metadata that could contain tokens or unnecessary leave details.

### API Producers

- [x] `AccessController` exposes the protected `/api/v1/access/me` and
      `/api/v1/access/policy-fixture` routes.
- [x] `AccessController` is registered in the real NestJS `AppModule`.
- [x] HTTP tests verify valid, missing, invalid/expired, unlinked, allowed, and
      denied requests with stable safe responses.

### Data Persistence

- [x] A real TypeORM migration creates the minimum access schema in disposable
      PostgreSQL 18.6.
- [x] The migration test verifies the expected organization, account, role, and
      employee tables through `information_schema`.
- [x] Schema synchronization remains disabled; schema changes are migration-
      driven.
- [x] The composite account/organization foreign key accepts same-organization
      links and rejects cross-organization employee links.
- [x] `EmployeeRelationshipRepository` uses a real TypeORM query runner and
      transaction to validate and persist manager assignments.
- [x] Employee and manager rows are locked with `FOR UPDATE` while checking
      active state, duplicate links, and manager-chain cycles.
- [x] The integration test verifies valid assignment and rejects duplicate,
      self, inactive, and cyclic manager relationships.
- [x] `PostgresAccountRepository` joins account, role, and employee records
      from PostgreSQL and returns server-owned access context.
- [x] Inactive accounts, roles, and linked employees, as well as unknown roles,
      fail closed at the repository boundary.
- [x] The rejected-input integration test confirms malformed and expired
      identities are rejected before lookup, while unlinked and inactive
      database identities resolve to no access context.

### Audit Events

- [x] The typed audit port accepts allowed and denied authorization events.
- [x] The port stores only sanitized event fields and preserves correlation IDs.

## Real Connections Verified

**25/25 task-test connections verified.** The adapter, resolver, fixed-role,
organization-scope, Manager reporting, security-evidence, migration,
organization-relationship, manager-relationship, PostgreSQL identity-
resolution, rejected-input, protected HTTP, and security-evidence boundaries
are directly exercised by passing Vitest tests. The persistence tests use real
disposable PostgreSQL connections and the manager assignment uses a real
transaction. All EH0003 inventory tests are implemented; remaining work is
final task completion and review evidence.

## Validation

- Targeted Vitest identity, resolver, policy, and security-evidence tests:
  passed (8 tests).
- Targeted PostgreSQL migration test with Rancher Desktop container runtime:
  passed (1 test).
- Targeted PostgreSQL organization-relationship test with Rancher Desktop
  container runtime: passed (1 test).
- Targeted PostgreSQL manager-relationship test with Rancher Desktop container
  runtime: passed (1 test).
- Targeted PostgreSQL identity-resolution test with Rancher Desktop container
  runtime: passed (1 test).
- Targeted rejected-identity test with Rancher Desktop container runtime:
  passed (1 test).
- Protected API tests for valid, missing, invalid/expired, unlinked, allowed,
  and denied requests: passed (6 tests).
- Security evidence tests for correlation, sanitization, and production guard:
  passed (3 tests).
- API lint: passed.
- API TypeScript check: passed.
- API build: passed.
- Full API suite: passed (33 tests).
- Workspace quality tests: passed (4 tests).
- Repository-wide format check: still reports baseline formatting debt in
  existing files; no broad formatting rewrite was introduced by EH0003.
