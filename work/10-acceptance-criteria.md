# Acceptance Criteria: EH0003

## Epic Link

Addresses Epic AC: EH-E1 AC1, AC2, AC3, and AC4.

## Happy Path Criteria

- [ ] **AC1:** A valid fictional identity linked to an active account resolves
      to exactly one server-owned organization, fixed role, and permitted
      employee context.
- [ ] **AC2:** Each fixed role—Employee, Manager, HR, and Administrator—can
      complete every permitted E1 identity/profile/workforce action in the
      approved permission matrix.
- [ ] **AC3:** An authorized request returns only fields permitted for the
      actor's role, organization, and reporting-line scope.
- [ ] **AC4:** A valid protected access-context request returns a stable success
      response containing a correlation identifier and no secrets or excessive
      personal data.

## Error Handling Criteria

- [ ] **AC5:** Requests with absent, malformed, invalid, expired, unlinked, or
      inactive identities are rejected with a stable safe error and make no
      protected data available.
- [ ] **AC6:** Requests attempting to use client-supplied organization or role
      values are evaluated using server-owned context; tampering cannot grant
      access.
- [ ] **AC7:** Cross-organization and role-inappropriate access is rejected
      without revealing whether the requested record exists.
- [ ] **AC8:** Denied authorization outcomes contain safe error codes and
      correlation identifiers and emit the required typed audit evidence without
      secrets, tokens, stack traces, or unnecessary leave text.

## Edge Case Criteria

- [ ] **AC9:** A Manager can access only active direct reports in the same
      organization; self, unrelated, inactive, and cross-organization subjects
      are denied.
- [ ] **AC10:** Administrator permissions are explicit and testable; broad
       access does not permit self-approval or mutation of immutable audit or
       ledger history.
- [ ] **AC11:** Invalid account, role, employee, organization, and manager
       relationships—including duplicate links, self/cyclic relationships, and
       cross-organization relationships—are rejected consistently.
- [ ] **AC12:** The local/test identity override is unavailable in production
       configuration and cannot be used as a real authentication mechanism.

## Integration Criteria

- [ ] **AC13:** The access boundary persists and retrieves its authoritative
       organization, account, role, and employee relationships through the
       approved database model and migrations.
- [ ] **AC14:** Unit, HTTP, and disposable-PostgreSQL integration tests cover
       the positive and negative permission matrix and pass through the root
       verification command.
- [ ] **AC15:** The implementation preserves the typed audit-event port so a
       later durable Audit module can consume attributable, sanitized events
       without changing authorization policies.
- [ ] **AC16:** No Angular client behavior, UI visibility, or client-provided
       scope can bypass the server-side authorization boundary.

