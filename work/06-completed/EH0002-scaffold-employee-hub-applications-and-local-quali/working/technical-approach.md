# Technical Approach: EH0002

## High-Level Strategy

Create a root npm workspace that hosts independently runnable Angular and NestJS applications. Keep the applications separate and introduce no shared package until real shared code exists. Rancher Desktop runs only a version-pinned PostgreSQL Compose service; the applications run through npm scripts on the host machine.

The increment proves reproducibility and safe local readiness, not any Employee Hub business capability. It establishes configuration, TypeORM migration tooling, a database-readiness path, baseline tests, and GitHub Actions quality evidence while preserving the later E1 identity adapter boundary.

## Architecture Decisions

### Version and package policy

- **Choice:** pin Node.js `24.20.0` LTS in repository tooling and CI; generate with Angular `22.x` and NestJS `12.0.1`; use PostgreSQL `18.6`; use TypeORM `1.1.0`; resolve exact package versions in committed `package-lock.json` files.
- **Rationale:** the selected Node LTS is supported by the active Angular line and NestJS generators; PostgreSQL 18.6 is the current supported minor; TypeORM follows ADR-001.
- **Alternatives considered:** use the Node Current line or older framework/database releases. Rejected because the project requires an LTS runtime and current supported tooling.

### Workspace layout

- **Choice:** root `package.json` declares npm workspaces for `apps/web` and `apps/api`; each application retains its own generator-managed configuration and package manifest.
- **Rationale:** preserves the approved separate applications while giving contributors one discoverable command surface.
- **Alternative considered:** a single application project or a premature shared library. Rejected because it blurs deployment and architecture boundaries without current shared code.

### Application generation and test baseline

- **Choice:** generate Angular with the current CLI defaults, retaining Vitest; generate NestJS as a strict CommonJS project retaining Jest.
- **Rationale:** matches the approved frontend Vitest and backend Jest strategies; CommonJS avoids changing backend test tooling during the foundation increment.
- **Alternative considered:** NestJS ESM starter. Rejected for this increment because its default toolchain differs from the approved Jest baseline.

### Database and readiness

- **Choice:** add a Compose file with a PostgreSQL-only `postgres:18.6-alpine` service, persistent named volume, local non-secret credentials supplied through ignored environment files, and a documented Rancher Desktop command. Configure TypeORM with `synchronize: false`, migration paths, and no business entities/migrations. Implement `GET /health/live` and `GET /health/ready`; readiness runs `SELECT 1` and emits only a stable status result.
- **Rationale:** meets the local-data and migration-direction requirements without creating a premature domain schema or exposing connection data.
- **Alternative considered:** containerize web/API or use `synchronize: true`. Rejected because applications are intentionally host-run and automatic schema mutation conflicts with migration discipline.

### Configuration and security baseline

- **Choice:** commit example configuration only; ignore runtime environment files; validate required database settings at API startup; keep health responses, logs, and errors free of credentials, URLs, or driver details.
- **Rationale:** supports NFR-006/NFR-011 and later real secret injection without implementing identity or deployment integration.

### GitHub Actions baseline

- **Choice:** create a least-privilege workflow triggered on pull requests and pushes to `master`. It performs deterministic installs, format check, lint, type-check, unit tests, and production builds. It uses no secrets, deployment permissions, registry publishing, or Rancher access.
- **Rationale:** gives immediate repeatable quality evidence and aligns the strategy with the repository's confirmed default branch.

## Component Changes

### Root workspace and documentation

- [ ] Add root workspace metadata, Node-version declaration, consistent npm scripts, ignore rules, and setup documentation.
- [ ] Add Compose and safe example configuration for Rancher Desktop PostgreSQL.

### Angular web application

- [ ] Generate the Angular 22 application in `apps/web` with Vitest baseline.
- [ ] Expose development, test, lint, build, type-check, and format-check commands through the root workspace.

### NestJS API application

- [ ] Generate the strict CommonJS NestJS 12 application in `apps/api` with Jest baseline.
- [ ] Add configuration validation, TypeORM data source/migration scripts, and live/readiness endpoints.
- [ ] Add unit and integration tests for health/readiness behavior; no business modules, identity adapter, or domain entities.

### Delivery automation

- [ ] Add a GitHub Actions quality workflow for `master` and pull requests.
- [ ] Document its evidence and local equivalent commands.

## Data Model Changes

No Employee Hub business tables, entities, fixtures, or migrations are created. The only persistence work is TypeORM data-source and migration infrastructure plus a live PostgreSQL connection check.

## Integration Points

- Rancher Desktop executes the local Compose configuration; it does not imply a Rancher shared-cluster deployment.
- NestJS connects to local PostgreSQL using validated environment configuration.
- GitHub Actions runs repository quality commands without database, deployment, registry, or identity-provider credentials unless a narrow health integration test requires a disposable PostgreSQL service.

## Configuration

| Setting | Local default | Handling |
|---|---|---|
| `NODE_VERSION` | `24.20.0` | Pinned in repository tooling and CI. |
| PostgreSQL image | `postgres:18.6-alpine` | Pinned in Compose. |
| API port | `3000` | Example only; configurable through ignored local environment file. |
| Database host / port / database / user / password | Local Compose values | Documented in `.env.example`; runtime value files are ignored. |
| TypeORM synchronize | `false` | Never enabled for scaffold or later shared environments. |

## Developer Hints

- Use `npm ci` from a clean checkout; do not install packages globally for normal development.
- Start PostgreSQL through Rancher Desktop using the documented Compose command, then run the API and web app through root npm scripts.
- Keep the first API routes limited to health; do not introduce placeholder Employee, role, or leave APIs.
- Treat migration generation and execution as explicit scripts; do not rely on automatic schema synchronization.
