# Risks and Dependencies: EH0002

## Risk Assessment

| Risk | Category | Likelihood | Impact | Mitigation |
|---|---|---:|---:|---|
| TypeORM `1.1.0` introduces compatibility or migration-tooling issues. | Data model / dependency | Medium | High | Pin exact versions, verify clean installation, run migration commands and disposable-PostgreSQL readiness integration tests. |
| Rancher Desktop runs the selected Compose configuration differently from the documented local workflow. | Operations | Medium | Medium | Prove the documented PostgreSQL start/stop/readiness path locally before acceptance. |
| Configuration or health failure leaks credentials or connection details. | Security | Medium | High | Commit examples only, ignore runtime files, validate configuration, return stable safe readiness errors, and run secret/error-output checks. |
| Scaffold work expands into identity, workforce, or leave implementation. | Scope / architecture | Medium | Medium | Enforce task non-goals and AC9; defer E1 business work to follow-up tasks. |
| GitHub Actions behaves differently from the local workspace. | Operations | Low | Medium | Use the same root commands, lockfiles, supported Node version, and a disposable PostgreSQL dependency only where required. |
| Health readiness can delay or mask API startup failures. | Reliability | Low | Medium | Keep liveness independent from PostgreSQL; use bounded database checks and explicit `503` readiness behavior. |

## Dependencies

### Blocking

- None. Approved E1, PRD, HLD, ADRs, test strategy, DevOps strategy, and the confirmed `master` branch provide sufficient planning input.

### Dependent

- Future E1 identity, workforce, authorization, and audit tasks depend on the version-pinned API/database/testing foundation.
- E2–E6 tasks depend on shared workspace quality commands and PostgreSQL migration infrastructure, but do not inherit business schema from this task.

### Related

- [EH-0001 — Explore Consistency Check](../../../05-pending-completion/EH-0001-explore-consistency-check/task.md) — validated Explore consistency before epic formation.
- [EH0001 — Form Employee Hub Epics](../../../05-pending-completion/EH0001-form-employee-hub-epics/task.md) — established the E1–E6 backlog boundary.

## Validation Against Research

- [x] ADR-001 is followed: PostgreSQL/TypeORM migration infrastructure is selected and automatic synchronization is disabled.
- [x] ADR-003 is followed: no real identity provider is chosen or integrated.
- [x] ADR-002 and ADR-005 are preserved: no premature business schema, idempotency, lock, or calculation implementation is introduced.
- [x] The test and DevOps strategies are followed: approved test stacks, fictional-data boundary, GitHub Actions, and `master` branch decision are reflected.
- [x] BLK-001 through BLK-003 remain explicit deferrals, not hidden requirements.

## Conflicts and Gaps

| Issue | Description | Resolution |
|---|---|---|
| DevOps branch wording | Strategy referred to `main`; the connected repository uses `master`. | Sponsor confirmed `master`; this task updates the strategy/CI plan to match. |
| Exact versions | Explore deliberately deferred exact supported versions. | Resolved during refinement with current compatible version pins; verify through clean installation and generated lockfiles. |
