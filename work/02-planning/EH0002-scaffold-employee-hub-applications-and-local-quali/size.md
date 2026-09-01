# Task Sizing: EH0002

## Complexity Dimensions

### Technical Complexity

- **Analysis scope:** root workspace, Angular app, NestJS app, PostgreSQL Compose configuration, GitHub Actions, and onboarding documentation.
- **Estimated implementation files:** approximately 25–40 files, mostly generated application/configuration files plus tests and workflow documentation.
- **Cross-references:** E1, PRD, HLD, four relevant ADRs, test strategy, DevOps strategy, and task-local planning evidence.
- **Integration points:** Angular workspace, NestJS API, TypeORM/PostgreSQL, Rancher Desktop Compose, and GitHub Actions.

## Effort Estimation

### Multi-Axis Scoring

| Axis | Score (0–3) | Rationale |
|---|---:|---|
| Scope / Surface Area | 3 | Covers client, server, local database infrastructure, repository tooling, documentation, and CI. |
| Coupling / Interfaces | 2 | Adds root workspace commands and health/readiness HTTP contracts across the API and database. |
| Novelty / Uncertainty | 2 | Learning project using a new workspace, current framework versions, TypeORM 1.1, and Rancher Desktop. |
| Dependencies | 1 | Depends on local Rancher Desktop and GitHub Actions, with no external team or shared-runtime dependency. |
| Testing & Verification | 2 | Requires a new frontend/backend test baseline, disposable PostgreSQL integration, clean-checkout verification, and CI evidence. |
| Risk / Blast Radius | 2 | This foundation affects every later capability, although it has no production data and is straightforward to recreate. |

### Total Complexity Score: 12/18

### Size Estimate

- **Shirt Size:** L (Large)
- **Time Estimate:** 2–3 weeks for one developer learning the stack
- **Confidence:** Medium

## Main Effort Drivers

- Making Angular, NestJS, TypeScript, Node, TypeORM, PostgreSQL, and npm versions work together reproducibly.
- Establishing safe configuration and real database readiness tests without introducing business schema.
- Aligning local commands with GitHub Actions and documenting Rancher Desktop setup.

## Scope Guard

The estimate excludes identity integration, workforce/leave features, business schema, Rancher deployment, registry/secrets, and production operations. Adding any of those should create a separate task or require explicit re-sizing.
