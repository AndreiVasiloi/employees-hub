# Goals and Constraints: EH0002

## Measurable Goals

- [ ] **MUST — reproducible workspace:** the repository has npm workspaces with separately runnable Angular web and NestJS API applications; documented root commands install, develop, build, lint, type-check, test, and format-check each relevant project.
- [ ] **MUST — local database readiness:** PostgreSQL starts through a version-pinned Docker Compose configuration executed by Rancher Desktop; the API has a safe health/readiness path that verifies database connectivity without exposing configuration or credentials.
- [ ] **MUST — quality baseline:** generated applications have their approved baseline unit-test tooling and root quality commands fail reliably on formatting, lint, types, tests, or builds.
- [ ] **MUST — GitHub verification:** a least-privilege GitHub Actions workflow executes the applicable validation, test, and build checks without deployment credentials.
- [ ] **MUST — safe onboarding:** setup documentation and example environment configuration support fictional or empty local data only and never commit secrets.

## Constraints

- **Timeline:** no fixed delivery date; scope must remain a small, independently verifiable foundation increment.
- **Resources:** one developer with regular development time; GitHub repository is connected.
- **Technical:** npm; current Node.js LTS; Angular; NestJS/TypeScript; PostgreSQL; TypeORM migrations; separate frontend and backend applications; modular-monolith boundaries; Docker Compose configuration run by Rancher Desktop.
- **Security and data:** only fictional/minimized data; no committed credentials, tokens, keys, or real employee data; safe errors and structured health responses only.
- **Delivery:** Rancher is the future shared-runtime target, but its namespace, registry, ingress, secrets, storage, and operational ownership are unresolved; no Rancher deployment is included here.
- **Compliance:** this is a learning project; it makes no GDPR, certification, availability, RTO, or RPO claim.

## Non-Goals

- Authentication, identity-provider integration, fixed-role authorization, workforce CRUD, and profile features — these follow the scaffold in later E1 work.
- Leave policies, calendars, balance calculations, requests, approvals, audit business events, notifications, or external integrations — outside the scaffold boundary.
- Production/Rancher manifests, registry publishing, deployment credentials, shared-environment testing, or monitoring-stack integration — blocked by the runtime contract and owned by later work.
- E2E, performance, DAST, and business-security scenarios that require implemented workflows or shared runtime — only the tooling hooks may be prepared when low-cost.

## Assumptions

| Assumption | Risk | Validation |
|---|---|---|
| Rancher Desktop can run the selected Compose configuration and PostgreSQL image locally. | Medium | Start the database and run the API database-readiness check on the developer machine. |
| The selected current Angular, NestJS, TypeScript, and Node LTS versions are mutually compatible in an npm workspace. | High | Pin versions, install from a clean checkout, build both applications, and run unit tests. |
| GitHub Actions can execute validation, tests, and builds without deployment permissions or secrets. | Medium | Run the workflow on a pull request or branch push and inspect the emitted evidence. |
| A minimal health/readiness endpoint can prove database availability without adding business schema or leaking operational details. | Medium | Automated API tests cover healthy and unavailable database behavior with safe output. |
