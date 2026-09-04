# Goals and Constraints

## Measurable Goals

- [ ] HR can create, view, update, activate, and deactivate Employee records
      within their organization: verified by API tests exercising each
      operation with fictional data.
- [ ] HR can create, view, update, activate, and deactivate Team records
      within their organization: verified by API tests.
- [ ] Each active Employee has at most one active Manager in the same
      organization, enforced transactionally: verified by integration tests
      reusing/extending the EH0003 relationship-guard pattern.
- [ ] Self, cyclic, inactive, duplicate, and cross-organization manager
      relationships are rejected with safe, stable errors: verified by
      negative integration tests.
- [ ] All workforce endpoints derive organization/role scope from the
      server-side `AccessContext` (never client input) and enforce the fixed
      role permission matrix (`workforce:manage`, `workforce:read:organization`):
      verified by authorization tests, including cross-organization isolation.
- [ ] Workforce mutations emit structured audit events via `AuditPort` with
      actor, organization, target, action, outcome, and correlation facts:
      verified by unit/integration tests against `InMemoryAuditPort`.
- [ ] New TypeORM migrations (Team table, any schema extensions) apply
      cleanly with `synchronize: false`, alongside the existing
      `CreateAccessSchema1710000000000` migration: verified by migration
      tests against disposable PostgreSQL.

## Constraints

- **Timeline**: No fixed deadline; sequenced after EH0003 (complete) and
  before EH0005 (blocked by this task).
- **Resources**: Single developer + LLM pairing, consistent with EH0002/EH0003.
- **Technical**:
  - Must extend the existing NestJS ESM app (`apps/api/src`), TypeORM 1.1,
    PostgreSQL 18.6, Vitest 4.1 + Supertest 7 + Testcontainers 11.7 stack.
  - Must preserve `synchronize: false` and use explicit migrations (ADR-001).
  - Must reuse the `AccessContext`, `E1Permission`/`FixedRole` matrix, and
    `AuditPort` contracts from EH0003 rather than duplicating them.
  - Employee creation requires an existing, linked `user_accounts` row
    (decided in Step 3) — no account-less employee creation path.
- **Compliance**: Fictional/minimized data only; no real employee data,
  secrets, or credentials (NFR-006).

## Non-Goals

- Leave policies, balances, previews, requests, approvals, or notifications
  (E2/E3/E4) — excluded because EH-E1 scope is limited to workforce/profile
  foundation, not leave business logic.
- Dynamic roles or configurable permissions — excluded per EH-E1 epic scope
  (fixed-role model only, ADR-006).
- External identity-provider or payroll/HRIS integration — excluded per
  EH-E1 epic out-of-scope statement.
- Durable/queryable audit storage (EH0006) — excluded; EH0004 emits through
  the existing `AuditPort` interface and EH0006 supplies persistence later.
- Account-less Employee creation / pre-onboarding flow — excluded per the
  Step 3 decision requiring a linked account at creation time.
- UI/UX implementation — excluded; this task is server-side API only,
  consistent with EH0002/EH0003 scope boundaries.

## Assumptions

| Assumption | Risk | Validation |
|------------|------|------------|
| A minimal `teams` table (id, organization_id, name, active) with an optional employee-to-team membership is sufficient for R-011's "maintain fictional Employee and Team records" requirement, without deeper team hierarchy. | Medium | Confirm against R-011 acceptance criteria and HLD Workforce component description during Step 5 research; keep schema extensible. |
| The general HR "assign/change manager" capability can reuse `EmployeeRelationshipRepository`'s transactional guard logic (self, cycle, inactive, cross-organization, duplicate checks) with at most minor extension, rather than requiring a new repository. | Low | Confirm during Step 5 by re-reading `employee-relationship.repository.ts` and its test coverage. |
| Existing fixed-role permissions (`workforce:read:organization`, `workforce:manage`) are sufficient for all EH0004 endpoints; no new permission constants are needed beyond possibly a scoped read for HR's own organization. | Low | Confirm during Step 5 by reviewing `permissions.ts` against planned endpoints. |
| The `InMemoryAuditPort` used by EH0003 is acceptable for EH0004's audit evidence in tests, with the understanding it does not persist across process restarts. | Low (explicitly accepted in Step 3) | No further validation needed; documented as a known limitation carried into EH0006. |
