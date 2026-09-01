# Sequencing and Scope: EH0002

## Implementation Phases

### Phase 1: Workspace Foundation

- [ ] Pin Node/tooling versions and create the root npm workspace structure.
- [ ] Generate the Angular web and strict CommonJS NestJS API applications in their separate workspace paths.
- [ ] Add root scripts, ignore rules, safe example configuration, and local setup documentation.

### Phase 2: Local Database and Readiness

- [ ] Add version-pinned PostgreSQL Compose configuration for Rancher Desktop.
- [ ] Configure validated API database settings, TypeORM migration tooling, and disabled automatic schema synchronization.
- [ ] Implement live/readiness endpoints and unit/integration tests for safe available/unavailable database behavior.

### Phase 3: Quality Evidence

- [ ] Finalize root format, lint, type-check, test, and build commands.
- [ ] Add GitHub Actions quality workflow for pull requests and pushes to `master`.
- [ ] Run clean-checkout/local verification and document the evidence.

## Parallel Work Opportunities

- **Angular and NestJS generation:** can proceed independently after the root workspace and version pins exist.
- **Documentation and safe example configuration:** can proceed in parallel with application generation.
- **GitHub Actions workflow:** can be drafted after root command names are known; final verification waits for the commands and tests.

## Dependency Validation

- Phase 2 depends on the API workspace from Phase 1.
- Phase 3 depends on stable root commands and tests from Phases 1–2.
- No external blocker prevents local implementation; BLK-001 through BLK-003 remain excluded and task-gated for later work.
- E1–E6 follow-on work depends on this foundation but does not block it.

## Scope Validation

### Original Requirements

- [x] Reproducible Angular/NestJS/npm foundation: Phase 1.
- [x] Local PostgreSQL through Rancher Desktop/Compose and safe readiness: Phase 2.
- [x] Baseline quality commands and GitHub Actions evidence: Phase 3.
- [x] Fictional-data and no-secret boundary: Phases 1–3.

### Scope Creep Detected

- None. Identity, workforce, leave, business schema, Rancher deployment, external integrations, and real credentials remain excluded.

### Non-Goals Confirmed Excluded

- Authentication and real identity-provider integration: not included.
- Business entities, Employee Hub APIs, fixtures, and migrations: not included.
- Shared Rancher deployment, registry/image publishing, secrets, monitoring stack, and production claims: not included.

## Task Tags

- **Complexity:** moderate
- **Component:** cross-cutting
- **Type:** enhancement
- **Priority:** high
- **Risk:** medium
