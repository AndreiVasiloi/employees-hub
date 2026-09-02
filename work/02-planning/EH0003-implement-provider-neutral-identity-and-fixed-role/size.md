# Task Sizing: EH0003

## Complexity Dimensions

### Technical Complexity

- **Analysis scope:** 1 NestJS application, shared repository tooling, and
  PostgreSQL migration/test infrastructure.
- **Estimated file count:** 15–25 implementation, migration, fixture, and test
  files, depending on the existing EH0002 module layout.
- **Cross-references:** Approximately 10–15 links across the E1 epic, PRD,
  HLD, ADRs, test strategy, task plan, and acceptance evidence.
- **Integration points:** HTTP identity boundary, TypeORM/PostgreSQL,
  authorization policies, typed audit port, Vitest, and GitHub verification.

## Effort Estimation

### Multi-Axis Scoring

| Axis | Score (0–3) | Rationale |
|---|---:|---|
| Scope / Surface Area | 2 | Multiple API, access, persistence, migration, fixture, and test components within one service. |
| Coupling / Interfaces | 2 | Adds a protected API surface and contracts consumed by future workforce, leave, and audit modules. |
| Novelty / Uncertainty | 2 | Provider-neutral identity, fixed-role authorization, and reporting-line policy are new patterns in the codebase. |
| Dependencies | 1 | EH0002 is an internal prerequisite; real provider and deployment dependencies are intentionally deferred. |
| Testing & Verification | 2 | Requires new fixtures, real PostgreSQL migrations, HTTP integration tests, and a complete negative authorization matrix. |
| Risk / Blast Radius / NFR | 3 | This is a core security boundary where an error could expose organization or employee data. |

### Total Complexity Score: 12/18

### Size Estimate

- **Shirt Size:** L
- **Time Estimate:** 2–3 weeks of regular development time
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
storage, leave workflows, or deployment integration.

