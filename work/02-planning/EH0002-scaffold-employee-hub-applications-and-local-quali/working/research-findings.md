# Research Findings: EH0002

## Search Terms

- TypeORM / PostgreSQL migrations
- provider-neutral identity adapter
- version pinning / Node LTS
- Docker Compose / local environment
- GitHub Actions / quality gates

## Decision Inventory

| Decision | Status | Requirement for EH0002 | Link |
|---|---|---|---|
| ADR-001 — TypeORM with PostgreSQL Migrations | Accepted | Establish the TypeORM/PostgreSQL migration foundation; later critical commands require explicit transaction/query-runner control. | [ADR-001](../../../../explore/decisions/employee-hub-adr-001-typeorm-postgresql-migrations.md) |
| ADR-002 — Idempotency, Versioning, and Targeted Locks | Accepted | Do not add command-level idempotency or locks in the scaffold; keep the database/tooling choices compatible with them. | [ADR-002](../../../../explore/decisions/employee-hub-adr-002-idempotency-versioning-locks.md) |
| ADR-003 — Provider-Neutral Identity Adapter | Accepted | Do not select or integrate a real identity provider; preserve a NestJS structure that can host a local identity stub later. | [ADR-003](../../../../explore/decisions/employee-hub-adr-003-provider-neutral-identity-adapter.md) |
| ADR-005 — Calculation Breakdown and Version References | Accepted | No calculation model belongs in the scaffold; avoid schema shortcuts that preclude versioned domain records later. | [ADR-005](../../../../explore/decisions/employee-hub-adr-005-calculation-breakdown-version-references.md) |

## Related Tasks

| Task | Status | Relationship | Link |
|---|---|---|---|
| EH-0001 — Explore Consistency Check | Pending Completion | Validated the Explore handoff and corrected artifact navigation before epic formation. It contains no application implementation. | [task.md](../../../05-pending-completion/EH-0001-explore-consistency-check/task.md) |
| EH0001 — Form Employee Hub Epics | Pending Completion | Formed E1–E6 and confirms Govern owns the task-level breakdown. It excludes application scaffolding. | [task.md](../../../05-pending-completion/EH0001-form-employee-hub-epics/task.md) |

## Documentation References

| Document | Relevance | Link |
|---|---|---|
| Tooling | Requires exact Node.js, PostgreSQL, Angular, NestJS, and TypeScript versions to be pinned at scaffold time. | [tooling.md](../../../../explore/tooling.md) |
| HLD | Defines the separate Angular/NestJS applications, PostgreSQL, Docker local environment, and modular-monolith target. | [HLD](../../../../explore/hlds/employee-hub-hld.md) |
| Test strategy | Selects Jest and Vitest plus Angular Testing Library, and requires fictional data. | [test strategy](../../../../explore/explore-employee-hub/test-strategy.md) |
| DevOps strategy | Establishes GitHub Actions validation/build expectations and Docker-based local development. | [DevOps strategy](../../../../explore/explore-employee-hub/devops-strategy.md) |
| Blocker register | Keeps real identity, Rancher runtime, and API/event contract work explicitly deferred. | [blocker register](../../../../explore/hlds/employee-hub-blocker-register.md) |

## Conflicts and Gaps

| Conflict or gap | Description | Resolution |
|---|---|---|
| Default-branch naming | The repository's connected default branch is `master`, while the DevOps strategy describes `main` as the GitHub Flow integration branch. | Sponsor confirmed `master` remains the default branch; this task's CI triggers and the DevOps strategy update must use `master`. |
| Local container runtime | The original tooling document names Docker/Compose without naming the desktop runtime. | Resolved by Sponsor: use Rancher Desktop to execute version-pinned Docker Compose configuration. |
| Exact supported versions | The architecture intentionally defers exact versions to scaffold time. | Research current compatible versions before implementation and pin them in repository tooling and CI. |
| External contracts | BLK-001 through BLK-003 are unresolved. | Keep out of scope; record task-specific guards and do not claim real integration or shared deployment. |
