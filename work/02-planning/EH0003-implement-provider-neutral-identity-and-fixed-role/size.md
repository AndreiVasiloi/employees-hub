# Task Sizing: EH0003

## Complexity Dimensions

### Technical Complexity

- **Analysis scope:** 1 NestJS application, shared repository tooling, and
  PostgreSQL migration/test infrastructure.
- **Estimated file count:** 8–15 implementation, migration, fixture, and test
  files, keeping the increment focused on a small local proof boundary.
- **Cross-references:** Approximately 10–15 links across the E1 epic, PRD,
  HLD, ADRs, test strategy, task plan, and acceptance evidence.
- **Integration points:** HTTP identity boundary, TypeORM/PostgreSQL,
  authorization policies, typed audit port, Vitest, and GitHub verification.

## Effort Estimation

### Multi-Axis Scoring

| Axis | Score (0–3) | Rationale |
|---|---:|---|
| Scope / Surface Area | 1 | A small Access module, one proof API surface, minimum persistence, fixtures, and focused tests within one service. |
| Coupling / Interfaces | 1 | Adds narrow internal contracts and a minimal protected route; future modules consume the boundary later. |
| Novelty / Uncertainty | 1 | The provider-neutral adapter and fixed-role policy are new, but decisions and implementation boundaries are already defined. |
| Dependencies | 1 | EH0002 is an internal prerequisite; real provider and deployment dependencies are intentionally deferred. |
| Testing & Verification | 1 | Uses the existing Vitest and disposable PostgreSQL harness with focused positive and negative authorization cases. |
| Risk / Blast Radius / NFR | 2 | It is a security-sensitive boundary, but the implementation is local, fictional-data-only, and protected by focused negative tests. |

### Total Complexity Score: 7/18

### Size Estimate

- **Shirt Size:** S
- **Time Estimate:** 2–3 focused development days
- **Confidence:** Medium

## Main Effort Drivers

- Designing a provider-neutral identity contract without accidentally creating a
  production authentication mechanism.
- Enforcing organization, role, and Manager direct-report boundaries centrally.
- Building and maintaining the positive/negative permission matrix.
- Creating migration and integration evidence for invalid relationships.
- Verifying safe errors, correlation IDs, and sanitized audit events.

## Sizing Assumptions

- EH0002's scaffold and verification baseline are available before
  implementation handoff.
- The task remains limited to E1 access/workforce proof capabilities.
- No real identity provider, external credentials, durable audit storage, or
  Angular feature UI is added.
- One fictional organization is used for local development while tests include
  a second organization to prove isolation.

## Re-sizing Triggers

Re-size before implementation if the task adds a real identity provider,
multiple organizations or approvers as production behavior, durable audit
storage, leave workflows, deployment integration, or a broad production-ready
permission surface.
