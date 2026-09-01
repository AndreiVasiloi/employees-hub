# Blocker Register: Employee Hub HLD

**Engagement start**: 2026-09-01  
**Last updated**: 2026-09-01  
**Open blockers**: 3 | **Resolved**: 0  
**Architect**: Andrei  
**Slug**: employee-hub

---

## Summary

| Severity | Open | Resolved |
| --- | ---: | ---: |
| BLOCKER | 0 | 0 |
| SIGNIFICANT | 3 | 0 |
| MINOR | 0 | 0 |

## Open Blockers

### BLK-001: Identity Provider and Account-Linking Contract Is Unselected

- **Severity**: SIGNIFICANT
- **Severity rationale**: The architecture can define an identity boundary, but secure implementation and end-to-end authorization testing need a selected provider/protocol/account-linking contract before implementation.
- **Discovered**: 2026-09-01 (Step B.1.2 / Boundary Mapping Step 4)
- **Category**: Missing Contract
- **Description**: No identity provider, authentication protocol, token/session model, or account-linking rule has been selected.
- **Impact**: Authentication integration, role/scope mapping, and NFR-004 validation cannot be finalized.
- **Owning team**: Lead Engineer
- **Resolution path**: Choose and document a development and target identity approach; define claims, organization/role mapping, session/token behavior, and account linking; prove it with integration tests.
- **Related decisions**: Pending design-sketch identity decision

### BLK-002: Rancher Runtime and Delivery Contracts Are Unknown

- **Severity**: SIGNIFICANT
- **Severity rationale**: The architecture can state deployment requirements, but a shared deployment/operational claim cannot be designed or tested safely without runtime ownership and platform facts.
- **Discovered**: 2026-09-01 (Step B.1.2 / Boundary Mapping Step 4)
- **Category**: Unresolved Dependency
- **Description**: Rancher cluster/namespace, ingress, registry, secrets, health-check, rollout, rollback, backup, observability, and GitHub/CI ownership are not known.
- **Impact**: NFR-007, NFR-012, and NFR-020 implementation evidence and deployment design remain incomplete.
- **Owning team**: Sponsor / runtime owner
- **Resolution path**: Obtain the target-environment capability and ownership checklist before shared deployment; design local/Docker development independently.
- **Related decisions**: Pending design-sketch deployment decision

### BLK-003: Internal API and Milestone-Event Schemas Are Undefined

- **Severity**: SIGNIFICANT
- **Severity rationale**: Explicit module contracts are required before implementation and test planning, but they can be designed during the HLD without blocking the current sketch.
- **Discovered**: 2026-09-01 (Step B.1.3 / Design Sketch Step 4)
- **Category**: Missing Contract
- **Description**: Resource/API shapes, error semantics, and milestone-event envelopes for the five modules do not yet exist.
- **Impact**: Module integration, frontend contract tests, audit/notification handoff, and idempotency/correlation evidence cannot be implemented safely.
- **Owning team**: Lead Engineer / Architect
- **Resolution path**: Define versioned REST resource contracts, stable error semantics, correlation/idempotency fields, and internal milestone-event envelopes in the HLD and ADRs before implementation planning.
- **Related decisions**: Pending API/event contract decision

## Resolved Blockers

No resolved blockers.

## Enrichment Log

| Date | Change | Source | Updated By |
| --- | --- | --- |
| 2026-09-01 | Initialized architecture blocker register. | Architecture Solutioning B.1.1 | Explore Agent |
| 2026-09-01 | Logged BLK-001 and BLK-002 from provisional external/platform dependencies. | Boundary Mapping Step 4 | Explore Agent |
| 2026-09-01 | Architect acknowledged dependency map and blocker classifications. | Boundary Mapping Step 4 | Explore Agent |
| 2026-09-01 | Logged BLK-003 from undefined internal API/event schemas. | Design Sketch Step 4 | Explore Agent |
| 2026-09-01 | Architect acknowledged BLK-003 classification. | Design Sketch Step 4 | Explore Agent |

## Document History

| Version | Date | Author | Changes |
| --- | --- | --- |
| 0.1 | 2026-09-01 | Explore Agent | Initial blocker register. |
