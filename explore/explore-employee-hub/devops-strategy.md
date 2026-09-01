# DevOps Strategy: Employee Hub

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 0.1 | 2026-09-01 | Dava.Flow with Sponsor/Andrei | Initial strategy |

## 1. Overview & Context

### Purpose

This strategy defines a beginner-friendly, standard delivery approach for the Employee Hub learning project. It turns the approved architecture, requirements, and test strategy into repeatable GitHub-based build, deployment, security, and operational practices.

### System Profile

| Attribute | Value |
| --- | --- |
| Architecture type | Modular NestJS monolith with separate Angular frontend |
| Deployable units | Angular web application; NestJS API/worker application; PostgreSQL dependency |
| Tech stack | Angular + NestJS/TypeScript + PostgreSQL + npm + Docker; Rancher target |
| System criticality | Business-critical learning project |
| Strategy profile | Standard, adapted for a beginner DevOps team |

### Quality Attributes

| Attribute | Target | Source |
| --- | --- | --- |
| Scoped reads | API p95 below 500 ms under the agreed 10-employee profile | PRD NFR-001 |
| Critical commands | API p95 below 1 second, excluding async delivery | PRD NFR-002 |
| Query safety | Scoped, indexed, deterministic lists; default maximum 50 | PRD NFR-003 |
| Security | Server-side authn/authz, fictional/minimized data, encrypted shared traffic and protected secrets | PRD NFR-004 to NFR-007 |
| Recovery | No uptime, RTO, RPO, or backup/restore claim until Rancher ownership and tests exist | PRD NFR-012 |
| Observability | Health/readiness, safe structured logs, metrics, and correlation across API and worker | PRD NFR-020 |

### Risk Posture

Business-critical workflow correctness, authorization/isolation, audit evidence, and outbox delivery receive deep automated coverage. The project makes no production-compliance or availability certification claim.

### Source Documents

- [PRD](../prds/employee-hub-prd.md)
- [HLD](../hlds/employee-hub-hld.md)
- [ADRs 001-006](../decisions/)
- [Test strategy](test-strategy.md)
- [Tooling](../tooling.md) and [glossary](../glossary.md)

## 2. CI/CD Pipeline Design

GitHub Actions provides one pipeline for the modular monolith. Fast feedback runs first; the normal commit-to-staging path targets under 25 minutes.

| Stage | Checks | Trigger | Target | Failure action |
| --- | --- | --- | --- | --- |
| 1. Validate | format, lint, TypeScript checks, secret scan, SAST | Push and PR | < 1 min | Block PR |
| 2. Unit | Angular and NestJS unit tests; coverage | Push and PR | < 3 min | Block merge |
| 3. Integration + contract | PostgreSQL integration, OpenAPI/Spectral, dependency/license scan | PR | < 10 min | Block merge |
| 4. Build + package | production builds, container images, SBOM, image scan | Merge to `main` | < 5 min | Block staging deploy |
| 5. Staging validation | E2E, accessibility, k6 baseline, ZAP baseline | Staging deploy | < 30 min | Block production promotion |
| 6. Smoke + verify | health/readiness and critical-path smoke tests | Production deploy | < 5 min | Alert and rollback decision |

### Artifact Strategy

| Aspect | Approach |
| --- | --- |
| Artifacts | Immutable OCI container images for web and API/worker, plus generated SBOMs |
| Registry | GitHub Container Registry |
| Versioning | Commit SHA for CI images; semantic-version Git tags for releases |
| Promotion | Build once and promote the exact image digest across environments |
| Configuration | Environment-specific configuration and secrets injected at deployment time; never baked into images |

## 3. Quality Gates

| Gate | Required evidence |
| --- | --- |
| PR merge | Zero format/lint/type violations; 100% unit/integration/contract pass rate; 90% line and 85% branch coverage on changed business logic; 95%/90% for high-risk logic; no new critical/high security findings |
| Build | Web/API builds and images succeed; images scanned; CycloneDX SBOM present |
| Production promotion | 100% selected E2E pass rate; p95 read/command targets met; axe critical-path checks pass; no critical staging security finding |
| Post-deploy | 100% smoke/health/readiness checks; measured error/latency remain within the defined SLOs |

Failures stop progression. A flaky test is quarantined immediately, tracked in a GitHub Issue, fixed within one sprint, and excluded from blocking only while quarantined; the target flaky ratio is below 1%.

## 4. Testing Integration

| Layer | Pipeline stage | Tools | Scope |
| --- | --- | --- | --- |
| Unit | 2 | Vitest + Angular Testing Library; Jest | Rules, lifecycle, authorization, balance, audit/outbox, UI components |
| Integration | 3 | Jest + Supertest + Testcontainers PostgreSQL | API, TypeORM, transactions, identity adapter, worker |
| Contract | 3 | Nest Swagger/OpenAPI + Spectral | Angular-Nest API schema compatibility |
| E2E | 5 | Playwright | Five approved critical journeys |
| Accessibility | 5 | axe + Playwright; keyboard/manual NVDA evidence | P0 flows |
| Performance | 5 | k6 | NFR-001/002 baseline |
| Smoke | 6 | Playwright/API health checks | Production critical path |

This is aligned with the [test strategy](test-strategy.md). External IdP and Rancher integrations remain stubbed until their contracts are selected.

## 5. Environment Strategy

| Environment | Purpose | Data | Users | Provisioning/lifecycle |
| --- | --- | --- | --- | --- |
| Local | Inner development loop | Fictional seed data; Docker Compose/Testcontainers | Developer | Permanent local setup |
| CI | PR validation | Ephemeral PostgreSQL containers | GitHub Actions | Per run, disposable |
| Staging | Release/E2E/NFR validation | Separate deterministic fictional data | Team and automation | Automated Rancher deployment, persistent |
| Production | Learning-project demonstration | Separate fictional data only | Intended users | Manual-approved Rancher deployment, persistent |

Per-PR preview environments are excluded initially: CI containers and shared staging are sufficient for the team size and avoid Kubernetes/DNS/secret cleanup overhead. Staging and production use the same topology and image digests, with separate databases, credentials, and injected configuration. Production credentials never appear outside production.

## 6. Infrastructure as Code

Rancher deployment manifests are version-controlled in this repository, using Helm/Kubernetes manifests once the runtime contract is known. GitHub Actions provisions the disposable CI environment; local remains developer-managed. Staging and production deployment configuration is represented by those version-controlled manifests. Required deployment policies include health/readiness probes, resource limits, non-root containers, required labels, encrypted ingress, and no plaintext secrets.

> **TBD**: Select the Rancher namespace, ingress, registry access, secret-store integration, database/volume ownership, backup/restore ownership, and the underlying cloud provider before shared deployment.

Terraform/OpenTofu is deferred until the cloud/platform target is selected. At that point, infrastructure changes use PR validation, plan review, policy scanning, manual staging/production approval, health verification, and scheduled drift checks. No manual infrastructure changes are permitted except documented break-glass actions.

## 7. Release & Deployment Strategy

### Deployment and rollback

Use Rancher/Kubernetes rolling deployments. This is the simplest fit for the initial team; blue-green, canary, and a feature-flag platform are deferred.

- `main` builds deploy automatically to staging after all required gates pass.
- Production promotion needs successful staging validation and manual GitHub Environment approval by the Lead Engineer.
- A feature-specific issue may use a tightly scoped, temporary configuration toggle; remove it and dead code within two sprints.
- Roll back an application issue by redeploying the previous immutable image, targeting under five minutes.
- Use backward-compatible expand-and-contract database migrations; use backup restore only as a last resort.

### Hotfix path

`hotfix/<short-description>` branches receive expedited review, stages 1-3, an abbreviated staging smoke test, and then manual production approval. Enhanced monitoring follows for two hours; the full E2E suite and an incident review run within 24 hours if time-critical checks were bypassed.

## 8. Observability & Incident Response

### Telemetry

| Pillar | Design |
| --- | --- |
| Logs | Structured JSON containing timestamp, level, service, trace ID, safe anonymized internal IDs, message, and allow-listed context; searchable for 30 days |
| Metrics | Prometheus-compatible RED and USE metrics plus workflow submissions, decisions, balance-adjustment failures, and outbox failures |
| Traces | OpenTelemetry with W3C trace propagation across HTTP, PostgreSQL, and worker paths; 100% error sampling |

Grafana, Loki, and Tempo are the vendor-neutral preferred stack when supported by the Rancher platform; exact hosted tools remain TBD.

| SLO | Target |
| --- | --- |
| Scoped-read latency | p95 < 500 ms |
| Critical-command latency | p95 < 1 s |
| Critical command success | 99.5% over a rolling 30 days |
| Outbox processing | 99% within 5 minutes |
| Deployment checks | 100% required health/readiness checks pass |

Error-budget policy: above 50% remaining, ship normally; 25-50%, increase monitoring; below 25%, freeze non-critical releases; exhausted, prioritize reliability work.

P1 means outage, authorization/security exposure, or data-integrity risk; P2 means a degraded core workflow. Initially the Lead Engineer is the shared on-call primary, with a secondary added when another active contributor joins. Every P1/P2 has a linked runbook and a blameless review within 48 hours. Dashboards cover service health, deployments, infrastructure/pods, SLOs, and business workflow metrics.

## 9. DevSecOps

| Pipeline point | Control | Tool/approach | Blocks on |
| --- | --- | --- | --- |
| Pre-commit/CI | Secret scanning | Gitleaks | Any detected secret |
| Stage 1 | TypeScript SAST | CodeQL | New critical/high finding |
| Stage 2 | Security behavior tests | Jest/Vitest | Test failure |
| Stage 3 | Dependency updates/scanning | Dependabot + `npm audit`/Trivy | New critical/high finding |
| Stage 3 | License review | CI license check | Non-approved license |
| Stage 4 | Container scan/SBOM | Trivy + CycloneDX | Critical/high image CVE or missing SBOM |
| Stage 5 | Staging DAST | OWASP ZAP baseline | Critical finding |
| Deployment manifests | Configuration scan | Trivy config | Violations of required deployment policies |

GitHub Environment secrets initially hold CI/deployment credentials. Rancher/Kubernetes uses separate per-environment secrets; a managed runtime secret store is selected with the hosting target. Secrets are injected only at deployment/runtime and never committed or included in images.

| Severity | Triage | Remediation |
| --- | --- | --- |
| Critical | < 4 hours | < 24 hours |
| High | < 1 business day | < 7 days |
| Medium | < 3 business days | < 30 days |
| Low | < 5 business days | Normal maintenance |

There is no formal GDPR or certification automation claim. Release evidence remains available for learning, security review, and traceability.

## 10. Governance & Compliance

GitHub Flow is used: short-lived `feature/...`, `fix/...`, and `hotfix/...` branches merge through PRs into `main`; immutable semantic-version tags identify releases.

| Change | Review/approval |
| --- | --- |
| Application code | Required CI gates and one peer approval once two contributors are active; self-review checklist until then |
| Pipeline or Helm/Kubernetes manifests | Required CI gates and one peer approval once available; no auto-merge |
| Future production IaC/policy | Required policy checks, plan review, and manual approval; add second independent reviewer when team capacity exists |
| Production deployment | Required staging evidence and manual Lead Engineer approval |
| Hotfix | Expedited review and documented follow-up evidence |

Release evidence includes the PR/review history, pipeline stages, test/coverage results, security scans, SBOM, image digest, deployment record, and approval. Keep it at least one year; Git history remains permanent. GitHub Issues record incidents, rollbacks, vulnerability exceptions, and quarantined tests.

## 11. Developer Experience

| Capability | Initial design | Target |
| --- | --- | --- |
| Local setup | Documented npm/Docker Compose workflow with fictional seeds and Testcontainers | Working tests within 15 minutes of clone after scaffold |
| Fast feedback | Local format/lint/type/unit commands and CI cache | Commit-to-staging < 25 minutes |
| Testing | Unit and narrow integration tests runnable locally | No shared environment required for inner loop |
| Logs/metrics | Self-service dashboards when staging platform is available | Immediate access |

Golden paths will be added with the scaffold: create module, migration, endpoint, Angular page/form, test, and deployment change. PR review time and developer satisfaction are measured only after a second active participant joins; target review time is under one business day.

## 12. DORA Metrics & Continuous Improvement

| Metric | Baseline | Initial target |
| --- | --- | --- |
| Deployment frequency | New project | Weekly production deployments, progressing toward daily |
| Lead time for changes | New project | < 3 business days, first commit to production |
| Change failure rate | New project | < 15% |
| Time to restore P1/P2 | New project | < 1 business day |
| Flaky tests | New project | < 1% |
| Overdue vulnerabilities | New project | 0 critical; fewer than 5 high |
| SLO compliance | New project | At least 99% of defined SLOs met |

GitHub Actions and PR/deployment history provide the first measurements; GitHub Issues provide incident/rollback data; Grafana adds runtime data when staging exists. Review metrics at each development-iteration retrospective and conduct a deeper monthly DevOps review.

| Phase | Timeline | Focus |
| --- | --- | --- |
| Foundation | Months 1-3 | Scaffold, CI, core automated tests, staging, basic telemetry |
| Automation | Months 3-6 | Full gates, Rancher deployment, security scans, SLO measurement |
| Optimization | Months 6-12 | IaC after platform selection, policy-as-code, DX improvements |

Move forward only after two stable months, no overdue critical vulnerability, and no unresolved process-caused P1 incident.

## 13. Risks & Open Questions

| Item | Impact if unresolved | Owner | Target |
| --- | --- | --- | --- |
| Rancher/runtime contract: namespace, ingress, registry, secrets, PostgreSQL, backups, monitoring ownership | Shared deployment, security, recovery, and observability cannot be verified | Sponsor / Lead Engineer | Before shared staging |
| Identity provider and claims/account-linking contract | Auth integration and production authorization validation blocked | Architect | Before authentication implementation |
| API/event schemas | Contract validation and module integration remain incomplete | Architect / Lead Engineer | Before module implementation |
| Supported versions and exact CI/container tools | Reproducibility cannot be demonstrated | Lead Engineer | At scaffold |
| Path-to-production plan | Delivery readiness work is not sequenced as a dedicated roadmap yet | Sponsor / Lead Engineer | Before shared staging |
| Representative load and peak profile; RTO/RPO expectations | Performance and recovery claims must remain provisional | Sponsor / Lead Engineer | Before operational acceptance |
| Second/third participant availability | Peer review and directional usability validation are delayed | Sponsor / Product Manager | Before usability validation |

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Beginner DevOps maturity | Delivery setup may slow feature work | Start with the documented standard baseline; add complexity only after measured need |
| One active developer | No independent review/on-call secondary yet | Self-review checklist now; enforce peer review once a contributor joins |
| Broad PeopleOps scope | Delayed leave-workflow learning | Retain PRD exclusions and deliver by approved epics |
| Incorrect leave/balance behavior | High trust and data-integrity risk | TDD, integration/concurrency tests, immutable audit and ledger evidence |

## 14. References

| Document | Path |
| --- | --- |
| PRD | [explore/prds/employee-hub-prd.md](../prds/employee-hub-prd.md) |
| HLD | [explore/hlds/employee-hub-hld.md](../hlds/employee-hub-hld.md) |
| ADRs | [explore/decisions](../decisions/) |
| Test strategy | [explore/explore-employee-hub/test-strategy.md](test-strategy.md) |
| Path to production | Planned; `explore/employee-hub/path-to-production.md` does not yet exist |
| Tooling | [explore/tooling.md](../tooling.md) |
| Glossary | [explore/glossary.md](../glossary.md) |
