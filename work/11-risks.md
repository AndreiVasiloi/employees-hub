# Risks and Dependencies: EH0003

## Risk Assessment

| Risk | Category | Likelihood | Impact | Mitigation |
|---|---|---:|---:|---|
| Incorrect identity claim mapping or unsafe local override | Security / Dependencies | Medium | High | Keep the provider-neutral adapter narrow, validate the signed-token-shaped contract, isolate the fictional override to non-production, and test absent/invalid/expired/unlinked identities. |
| Cross-organization or role bypass | Security | Medium | High | Resolve scope only from server-owned records, centralize policies, reject client scope, and run the complete positive/negative matrix. |
| Manager sees unrelated or inactive employees | Security / Data Model | Medium | High | Enforce same-organization direct-report predicates and test self, unrelated, inactive, and cross-organization cases. |
| Administrator permission breadth weakens prohibitions | Security | Medium | High | Use ADR-006 explicit permissions; add regression tests for self-approval and immutable audit/ledger mutation denial. |
| Invalid relationships or duplicate account links | Data Model | Medium | High | Use migrations, unique/foreign-key constraints, application validation, and integration tests for duplicate, self, cyclic, inactive, and cross-organization relationships. |
| Audit port omits safe attribution or correlation | Security / Operations | Medium | Medium | Define a typed event contract with allow-listed actor, organization, target, outcome, time, and correlation fields; test sanitization. Durable storage remains a later task. |
| Authorization queries become slow as data grows | Performance | Low | Medium | Scope indexed queries by organization and relationship; keep the initial fictional dataset small and add a focused API smoke/performance check later. |
| Migration conflicts with future workforce schema | Data Model / Dependencies | Medium | Medium | Keep the minimum schema explicit, use TypeORM migrations, document ownership, and avoid leave/business tables in this task. |
| Angular presents permissions as if they were authoritative | UX / Security | Low | Medium | Add no feature UI in EH0003 and document that role-aware navigation is presentation only; API policies remain authoritative. |
| Provider, deployment, or observability platform remains unavailable | Dependencies / Operations | High | Medium | Use local/test adapters and existing CI evidence; do not claim external provider or shared deployment integration in this task. |

## Dependencies

### Blocking (must complete first)

- [ ] **EH0002:** The scaffold, TypeORM/PostgreSQL migration path, Vitest setup,
      and repository verification baseline must be accepted before EH0003
      implementation is merged. Local task metadata currently shows EH0002 in
      `04-implementing` despite its implementation being complete; this is a
      workflow readiness dependency, not an architecture conflict.

### Dependent (depends on this task)

- [ ] **Future E1 workforce/profile task:** Requires resolved identity,
      organization scope, fixed roles, and manager relationship policies.
- [ ] **Future leave workflow task:** Requires reusable server-side role and
      direct-report authorization without introducing a second policy mechanism.
- [ ] **Future audit task:** Requires the typed audit-event port and its
      sanitized event contract.

### Related (shared context)

- [ ] **EH0001:** Established the E1–E6 epic decomposition and Govern handoff;
      it has no code dependency.
- [ ] **ADR-003 and ADR-006:** Accepted decisions governing identity and fixed
      permissions.

## Validation Against Research

- [x] No unresolved conflict with ADR-003, ADR-006, the HLD, or the PRD.
- [x] Dependencies align with the EH0002 foundation and E1 epic boundaries.
- [x] Research gaps are captured as explicit implementation guards.
- [x] The earlier Jest/Vitest wording mismatch is resolved in favor of the
      repository's current Vitest baseline.
- [x] EH0003 task links now point to the current planning and foundation paths.

### Conflicts/Gaps Found

| Issue | Description | Resolution |
|---|---|---|
| EH0002 workflow status | EH0002's implementation evidence exists, but its local task directory is still marked `04-implementing`. | Treat it as a prerequisite for implementation readiness and reconcile its Dava.Flow completion state before EH0003 implementation handoff. |
| External identity contract | Provider, claim names, and account-linking lifecycle remain open. | Keep the adapter contract provider-neutral and use fictional local/test identities only. |
| Durable audit storage | Audit persistence is not owned by EH0003. | Emit a typed sanitized audit event and defer durable storage to the Audit task. |

