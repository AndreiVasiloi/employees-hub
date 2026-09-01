# DevOps Strategy Best Practices

Use these as evaluation heuristics and design guidance, not as facts about the user's system.

## 1. CI/CD Pipeline Design

- **Fast feedback first**: Put fast-running checks (lint, unit tests) in early stages; slow checks (E2E, performance) in later stages.
- **Build once, promote everywhere**: The same artifact is promoted across environments — never rebuild per environment.
- **Immutable artifacts**: Once published, an artifact version is never overwritten.
- **Configuration injection**: Environment-specific config injected at deploy time (env vars, config maps, secrets manager) — never baked into artifacts.
- **Pipeline-as-code**: Pipeline definitions are version-controlled and reviewed via PRs, just like application code.
- **Parallelise where possible**: Independent checks (lint, unit, security scan) can run in parallel within a stage.
- **Target**: Commit to staging deploy in under 20 minutes; commit to production in under 1 hour.

## 2. Quality Gates

- Every quality gate must be **measurable** — a numeric threshold, not "looks good".
- Gates are **pass/fail** — no partial passes, no "advisory only" gates in critical paths.
- Coverage targets apply to **changed files** (delta), not entire codebase (avoids gaming).
- **Flaky test policy**: Quarantine immediately; fix within 1 sprint; never disable permanently.
- **Security gates**: Zero tolerance for critical/high vulnerabilities at PR merge time.

## 3. Environment Strategy

- **Minimum viable environments**: Local → CI (ephemeral) → Staging (production-like) → Production.
- **Ephemeral environments**: Per-PR isolated environments reduce contention and enable parallel testing.
- **Staging mirrors production**: Same topology, same container images, same IaC — only scale and data differ.
- **No shared databases** across environments — prevents data leakage and test pollution.
- **Production credentials never in non-prod** — separate secret stores per environment.
- **Environment parity**: Eliminate "works on my machine" by making all environments reproducible via IaC.

## 4. Infrastructure as Code

- **IaC is production code**: Same PR review, testing, and quality standards as application code.
- **Reusable modules**: Standardised, versioned modules for common infrastructure patterns.
- **Policy gates**: Automated policy checks (OPA, Checkov, tfsec) on every IaC PR before merge.
- **Drift detection**: Scheduled comparison of declared vs actual state; alert on divergence.
- **No manual changes**: All infrastructure changes via IaC PRs (except documented break-glass procedures).
- **State management**: Remote state with locking; never local state files.

## 5. Release Strategy

- **Decouple deploy from release**: Feature flags allow deploying code without exposing it to users.
- **Progressive delivery**: Canary (% traffic) → validate metrics → ramp up → full release.
- **Automated rollback**: SLO breach triggers automatic rollback (canary abort or previous artifact redeploy).
- **Database migrations**: Expand-and-contract pattern for backward-compatible schema changes.
- **Hotfix path**: Expedited but not uncontrolled — still requires review, testing, and approval.
- **Feature flag hygiene**: Remove flags within 2 sprints of full rollout; track stale flags as tech debt.

## 6. Observability

- **Three pillars from day one**: Structured logs, metrics (RED/USE), distributed tracing.
- **OpenTelemetry**: Vendor-neutral standard for instrumentation; recommended for all new systems.
- **SLOs over SLAs**: SLOs measure user experience; SLAs are contractual — design for SLOs.
- **Error budgets**: Explicit trade-off between velocity and reliability.
- **Alert on symptoms, not causes**: Alert when users are affected, not when CPU is high.
- **Every alert is actionable**: If no one needs to act, it's a dashboard metric, not an alert.
- **Change correlation**: Link deployments to observability data — "what changed?" is the first incident question.

## 7. DevSecOps

- **Shift left**: Security checks in the earliest pipeline stage where they are effective.
- **SBOM for every release**: Know exactly what's in your software; enables rapid CVE response.
- **Secret detection**: Pre-commit hooks + CI scanning prevent secrets from entering version control.
- **Vulnerability SLAs**: Critical < 24h, High < 7d, Medium < 30d — enforce via dashboards and alerts.
- **Supply chain security**: Artifact signing, dependency pinning, provenance attestation for high-security environments.
- **Compliance as code**: Audit evidence generated automatically per release, not manually compiled.

## 8. Governance

- **GitOps model**: Git is the single source of truth; all changes via PRs with review and approval trail.
- **Policy-as-code**: Policies are version-controlled, testable, and enforced automatically.
- **Segregation of duties**: Deployer ≠ approver for production changes in regulated environments.
- **Standard changes**: Pre-approved templates for routine deployments; no CAB review needed.
- **Audit trail**: Every production change traceable to a PR, reviewer, test result, and deployment record.

## 9. Developer Experience

- **Fast inner loop**: Clone to running tests in < 10 minutes; local changes reflected in < 5 seconds.
- **Self-service**: Developers can provision environments, view logs, and access dashboards without tickets.
- **Golden paths**: Opinionated, supported workflows for common tasks (create service, add dependency, deploy).
- **Cognitive load**: Minimise the number of tools and contexts a developer must manage.
- **DX metrics**: Track build time, PR review time, environment provisioning time, developer satisfaction.

## 10. DORA Metrics

- **Four key metrics**: Deployment Frequency, Lead Time, Change Failure Rate, MTTR.
- **Measure to improve, not to judge**: Metrics inform process improvement, not individual performance.
- **Elite targets**: Multiple deploys/day, < 1 hour lead time, < 5% CFR, < 1 hour MTTR.
- **Start from where you are**: Set realistic targets based on current maturity; improve incrementally.
- **Continuous improvement loops**: Sprint retros → monthly DevOps reviews → quarterly strategy reviews.

## 11. Modern Trends (2025-2026)

- **Platform engineering**: Internal Developer Platforms (IDPs) with self-service capabilities and golden paths.
- **AI in CI/CD**: Intelligent test selection, risk-based change scoring, automated remediation suggestions.
- **GitOps**: Declarative infrastructure with pull-based reconciliation (Argo CD, Flux CD).
- **Policy-as-code maturity**: From optional checks to mandatory enforcement at every pipeline stage.
- **Observability 2.0**: AI-assisted anomaly detection, change correlation, and incident triage.
- **FinOps integration**: Cost-aware SLOs, rightsizing policies, environment auto-teardown.
- **SLSA and supply chain**: Provenance attestation, SBOM as standard, artifact signing.
- **Value stream management**: End-to-end visibility from idea to production; identify bottlenecks across the entire flow.

## 12. Anti-Patterns to Avoid

- **Tool-first thinking**: Choosing tools before understanding requirements.
- **Over-engineering**: Enterprise-grade DevOps for an MVP or internal tool.
- **Manual gates in automated pipelines**: Humans as bottlenecks in otherwise automated flows.
- **Observability as afterthought**: "We'll add monitoring later" means you won't understand production.
- **Security as separate phase**: Gate at the end catches problems too late; shift left.
- **Ignoring developer experience**: Slow pipelines and complex tooling kill productivity.
- **Metrics without action**: Measuring DORA without acting on the data is performative, not productive.
- **Feature flag debt**: Flags that are never cleaned up become permanent complexity.
- **Shared mutable environments**: Shared staging with manual deployments causes contention and flaky tests.
- **Testing ice-cream cone**: Mostly E2E tests, few unit tests — slow, brittle, expensive.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
