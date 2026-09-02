# Sequencing and Scope: EH0003

## Implementation Phases

### Phase 1: Foundation

- [ ] Reconcile EH0002 workflow readiness and confirm the existing NestJS,
      TypeORM, PostgreSQL, and Vitest baseline is available.
- [ ] Define the provider-neutral identity, resolved access-context, permission,
      and audit-event contracts.
- [ ] Add the minimum access/workforce entities, constraints, and TypeORM
      migrations for organization, account, role, employee, and manager links.

### Phase 2: Core Features

- [ ] Implement the signed-token-shaped adapter and development/test identity
      override with production safeguards.
- [ ] Implement server-owned account, organization, role, and reporting-line
      resolution.
- [ ] Implement the explicit E1 fixed-role policy matrix and safe denial paths.
- [ ] Add the protected access-context and policy-proof API surfaces.

### Phase 3: Integration & Polish

- [ ] Connect authorization outcomes to the typed audit-event port and
      correlation context.
- [ ] Add unit, HTTP, and disposable-PostgreSQL tests for all positive and
      negative acceptance criteria.
- [ ] Run the complete root verification command and update task traceability
      and implementation documentation.

## Parallel Work Opportunities

- [ ] Identity contract tests and permission-matrix unit tests can proceed in
      parallel once the shared access-context contract is agreed.
- [ ] Migration constraint tests and safe-error/event-shaping tests can proceed
      in parallel after entity and event contracts are defined.
- [ ] Documentation and traceability updates can proceed independently of
      implementation once acceptance evidence is available.

## Blocked Dependencies

- [ ] EH0002 completion-state reconciliation blocks EH0003 implementation
      handoff, but does not block this planning work.
- [ ] External identity-provider selection blocks real provider integration only;
      it does not block the local adapter/stub.
- [ ] Durable audit storage blocks audit querying only; EH0003 can define and
      emit the typed event contract.

## Scope Validation

### Original Requirements

- [ ] Provider-neutral identity resolves fictional users: addressed in Phase 2.
- [ ] Fixed Employee, Manager, HR, and Administrator roles are enforced:
      addressed in Phase 2.
- [ ] Organization and reporting-line boundaries are server-authoritative:
      addressed in Phases 1 and 2.
- [ ] Unauthorized access fails safely and is attributable: addressed in Phase 3.
- [ ] Automated identity and authorization evidence exists: addressed in Phase 3.

### Scope Creep Detected

- **Real identity-provider integration:** Beyond EH0003; retain the adapter
  boundary and defer provider selection/integration.
- **Leave calculations, requests, approvals, or balances:** Beyond EH0003;
  defer to leave workflow tasks.
- **Durable audit storage and audit screens:** Beyond EH0003; defer to Audit.
- **Angular feature UI or role-specific navigation:** Beyond EH0003; defer to
  workforce/profile UI tasks.
- **Dynamic roles, delegated approval, or multiple approvers:** Beyond the
  fixed-role MVP; explicitly excluded.

### Non-Goals Confirmed Excluded

- Payroll, recruitment, performance management, and formal compliance claims.
- Real employee data, credentials, tokens, or provider secrets.
- Shared Rancher deployment, registry, and production operations.
- Full business APIs beyond the access proof surface.

## Task Tags

- **Complexity**: complex
- **Component**: cross-cutting
- **Type**: feature
- **Priority**: high
- **Risk**: high

