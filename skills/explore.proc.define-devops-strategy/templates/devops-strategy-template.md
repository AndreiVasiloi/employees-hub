# DevOps Strategy: [Project Name]

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | [date] | [author] | Initial DevOps strategy |

---

## 1. Overview & Context

### Purpose
[1-2 sentences: what this DevOps strategy covers and why it exists.]

### System Profile

| Attribute | Value |
|-----------|-------|
| Architecture Type | [monolith / modular-monolith / microservices / event-driven / hybrid] |
| Deployable Units | [count and names] |
| Tech Stack | [frontend] + [backend] + [database] + [build tools] |
| System Criticality | [safety-critical / business-critical / standard-commercial / internal-MVP] |
| Strategy Profile | [Lean / Standard / Enterprise] |

### Quality Attributes (from PRD)

| Attribute | Target | Source |
|-----------|--------|--------|
| Availability | [target, e.g. 99.9%] | PRD NFR-[N] |
| Response Time | [target, e.g. p95 < 500ms] | PRD NFR-[N] |
| Throughput | [target, e.g. 120 concurrent users] | PRD NFR-[N] |
| Recovery | [RTO/RPO targets] | PRD NFR-[N] |
| Security/Compliance | [requirements] | PRD NFR-[N] |

### Risk Posture
[Safety-critical / Business-critical / Standard commercial / MVP]

### Source Documents
- PRD: `explore/prds/[slug]-prd.md`
- HLD: `explore/hlds/[slug]-hld.md`
- ADRs: [list relevant ADRs]
- Test Strategy: `explore/explore-[slug]/test-strategy.md`

---

## 2. CI/CD Pipeline Design

### Pipeline Stages

```
Commit → [Lint+Format] → [Unit Test] → [Integration] → [Build] → [E2E+NFR] → [Smoke]
          < 1 min          < 3 min       < 10 min       < 5 min    < 30 min     < 5 min
```

| Stage | Name | Checks Run | Trigger | Max Duration | On Failure |
|-------|------|------------|---------|-------------|-----------|
| 1 | Lint + Format | [checks] | Every push | < 1 min | Block PR |
| 2 | Unit Test | [checks] | Every push | < 3 min | Block merge |
| 3 | Integration + Contract | [checks] | Every PR | < 10 min | Block merge |
| 4 | Build + Package | [checks] | Merge to main | < 5 min | Block deploy |
| 5 | E2E + NFR | [checks] | Deploy to staging | < 30 min | Block promotion |
| 6 | Smoke + Verify | [checks] | Deploy to prod | < 5 min | Alert + rollback |

### Artifact Strategy

| Aspect | Approach |
|--------|----------|
| Artifact type | [container image / JAR + static bundle / etc.] |
| Registry | [registry name and type] |
| Versioning | [strategy] |
| Immutability | Artifacts are immutable once published |
| Configuration | Environment-specific config injected at deploy time |

### CI/CD Platform
[Platform name and rationale]

---

## 3. Quality Gates

### Gate 1 — PR Merge Gate (Stages 1-3)

| Check | Threshold | Tool |
|-------|-----------|------|
| Lint + format | Zero violations | [tool] |
| Unit test pass rate | 100% | [tool] |
| Unit coverage (line) | ≥ [80]% on changed files | [tool] |
| Unit coverage (branch) | ≥ [75]% on changed files | [tool] |
| Integration test pass rate | 100% | [tool] |
| No new critical/high vulnerabilities | Zero | [tool] |

### Gate 2 — Build Gate (Stage 4)

| Check | Threshold | Tool |
|-------|-----------|------|
| Build succeeds | Pass | [tool] |
| Container image builds | Pass | [tool] |
| SBOM generated | Present | [tool] |

### Gate 3 — Production Promotion Gate (Stage 5)

| Check | Threshold | Tool |
|-------|-----------|------|
| E2E test pass rate | 100% | [tool] |
| Performance NFR targets met | Per PRD thresholds | [tool] |
| Security scan clean | Zero critical | [tool] |

### Gate 4 — Post-Deploy Validation (Stage 6)

| Check | Threshold | Tool |
|-------|-----------|------|
| Smoke test pass rate | 100% | [tool] |
| Error rate | < [threshold] | [tool] |
| Response time p95 | < [target] | [tool] |

### Failure Policies

| Gate | Failure Policy |
|------|---------------|
| Gate 1 (PR Merge) | PR cannot merge; author must fix |
| Gate 2 (Build) | Build rejected; no staging deployment |
| Gate 3 (Promote Prod) | Staging stays; production blocked |
| Gate 4 (Post-Deploy) | Alert; rollback vs hotfix decision |

### Flaky Test Policy
- Detected → quarantine immediately
- Bug ticket → fix within 1 sprint
- Quarantined tests do not block pipeline
- Flaky ratio tracked as KPI (target < 1%)

---

## 4. Testing Integration

### Test Pyramid to Pipeline Mapping

| Pyramid Layer | Pipeline Stage | Duration Target | Coverage Target |
|--------------|---------------|----------------|-----------------|
| Unit Tests | Stage 2 | < 3 min | ≥ [80]% line / [75]% branch |
| Integration Tests | Stage 3 | < 10 min | Every boundary tested |
| Contract Tests | Stage 3 | < 2 min | Every service contract |
| E2E Tests | Stage 5 | < 30 min | Critical user journeys |
| Performance Tests | Stage 5 | < 15 min | NFR thresholds met |
| Smoke Tests | Stage 6 | < 5 min | Critical path verified |

### Cross-Reference
- Test Strategy: `explore/explore-[slug]/test-strategy.md`
- [Note alignment status: aligned / strategy pending / defined independently]

---

## 5. Environment Strategy

### Environment Topology

| Environment | Purpose | Pipeline Stage | Data | Who Uses It | Provisioning | Lifecycle |
|-------------|---------|---------------|------|-------------|-------------|-----------|
| **Local** | Developer inner loop | Pre-commit | In-memory / Testcontainers | Individual developer | Manual / docker-compose | Permanent |
| **CI** | PR validation | Stages 1-3 | Ephemeral containers | Automated per PR | IaC / CI runner | Ephemeral |
| **Staging** | Release validation | Stages 4-5 | Production-like (anonymised) | QA, automated E2E | IaC / automated | Persistent |
| **Production** | Live system | Stage 6 | Real | End users | IaC / automated | Persistent |

### Ephemeral Environments
[Describe ephemeral environment strategy or state "Not applicable for this profile"]

### Environment Parity Rules
- Staging mirrors production topology
- Same artifacts across environments (config injected at deploy time)
- No shared databases across environments
- Production credentials never in non-prod

---

## 6. Infrastructure as Code

### IaC Approach

| Aspect | Design |
|--------|--------|
| Tool | [Terraform / OpenTofu / Bicep / Pulumi / CloudFormation] |
| State Management | [backend details] |
| Module Strategy | Reusable modules per resource type; versioned; private registry |
| Repository | [mono-repo / dedicated infra repo] |

### IaC Pipeline

| Stage | Action | Gate |
|-------|--------|------|
| 1. Validate | Syntax + format check | Clean |
| 2. Plan | Show proposed changes | Plan review |
| 3. Policy Check | Policy engine evaluation | Zero violations |
| 4. Apply | Execute changes | Approval for staging/prod |
| 5. Verify | Health checks | Resources healthy |

### Drift Management
- Detection: Scheduled plan comparison ([frequency])
- Alert: Drift → infrastructure channel
- Remediation: [auto-reconcile / human approval]
- Prevention: All changes via IaC PRs; no manual changes

---

## 7. Release & Deployment Strategy

### Deployment Style
**[Rolling / Blue-Green / Canary / Feature Flags]**

Rationale: [why this style was chosen]

### Progressive Delivery
[Describe progressive delivery phases or state "Not applicable"]

| Phase | Traffic | Duration | Gate |
|-------|---------|----------|------|
| Deploy (flag off) | 0% | Immediate | Build passes |
| Canary | [N]% | [duration] | SLO within thresholds |
| Full rollout | 100% | — | Automated validation |

### Feature Flag Strategy

| Aspect | Design |
|--------|--------|
| Tool | [tool name] |
| Flag types | Release (temporary), Ops (permanent), Experiment (A/B) |
| Lifecycle | Create → Enable → Full rollout → Remove within 2 sprints |
| Governance | Max active flags: [N]; stale alert: 30 days |

### Rollback Strategy

**Application Rollback:**

| Mechanism | When | RTO |
|-----------|------|-----|
| Feature flag off | Feature-scoped issue | Seconds |
| Previous artifact redeploy | Deployment-scoped issue | < 5 min |
| [Blue-green switchback / Canary abort] | Full rollback | < 1 min |

**Database Rollback:**

| Approach | When |
|----------|------|
| Expand-and-contract | Preferred for all schema changes |
| Reversible migrations | Simple changes |
| Backup restore | Last resort |

### Hotfix Path

| Aspect | Standard | Hotfix |
|--------|----------|--------|
| Branch | Feature → main | hotfix/AM-XXX → main |
| Pipeline | All stages | Stages 1-3 + smoke |
| Approval | Standard review | 1 reviewer minimum |
| Follow-up | None | Full E2E within 24h |

---

## 8. Observability & Incident Response

### Three Pillars

**Structured Logging:**

| Aspect | Design |
|--------|--------|
| Format | Structured JSON |
| Fields | timestamp, level, service, traceId, spanId, userId, message |
| Tool | [logging platform] |
| Retention | Hot: 30 days / Cold: [90-365] days |

**Metrics (RED + USE):**

| Method | Metrics | Tool |
|--------|---------|------|
| RED | Rate, Errors, Duration (per service) | [metrics platform] |
| USE | Utilisation, Saturation, Errors (per resource) | [metrics platform] |
| Business | [project-specific business metrics] | [metrics platform] |

**Distributed Tracing:**

| Aspect | Design |
|--------|--------|
| Standard | OpenTelemetry |
| Sampling | 100% errors; [N]% success |
| Tool | [tracing platform] |

### SLOs and Error Budgets

| Journey | SLI | SLO | Window | Error Budget |
|---------|-----|-----|--------|-------------|
| [Journey 1] | [indicator] | [target]% | 30-day | [budget] |
| [Journey 2] | [indicator] | [target]% | 30-day | [budget] |

**Error Budget Policy:**
- > 50% remaining → Ship freely
- 25-50% → Increase monitoring
- < 25% → Freeze non-critical deploys
- Exhausted → Stop features; fix reliability

### Alerting

| Severity | Criteria | Response Time | Notification |
|----------|----------|--------------|-------------|
| P1 — Critical | User-facing outage | < 15 min | PagerDuty + phone |
| P2 — High | Degraded performance | < 1 hour | Slack + on-call |
| P3 — Medium | Approaching thresholds | < 4 hours | Slack |
| P4 — Low | Informational | Next business day | Ticket |

### Incident Response

| Aspect | Design |
|--------|--------|
| On-call | [rotation model] |
| Escalation | Primary → Secondary → Lead → Manager |
| Runbooks | Every P1/P2 alert has a linked runbook |
| Post-Incident Review | Within 48h for P1/P2; blameless; tracked action items |

### Dashboards

| Dashboard | Audience | Key Metrics |
|-----------|----------|------------|
| Service Health | On-call | RED metrics, active alerts |
| SLO Status | Team lead | SLO compliance, error budget |
| Deployment Tracker | Dev team | Recent deploys, canary status |
| Business Metrics | Product | [project-specific metrics] |

---

## 9. DevSecOps

### Shift-Left Security Pipeline

| Pipeline Stage | Security Check | Tool | Blocks On |
|---------------|---------------|------|-----------|
| Pre-commit | Secret detection | [tool] | Any secret |
| Stage 1 | SAST — static analysis | [tool] | Critical/High |
| Stage 3 | Dependency scanning | [tool] | Critical vulns |
| Stage 3 | License compliance | [tool] | Non-compliant |
| Stage 4 | Container image scanning | [tool] | Critical/High CVEs |
| Stage 4 | SBOM generation | [tool] | SBOM absent |
| Stage 5 | DAST — dynamic testing | [tool] | Critical findings |

### Supply Chain Security
- SBOM: [format] generated at build
- Artifact signing: [approach or N/A]
- Provenance: [SLSA level or N/A]

### Secrets Management

| Aspect | Design |
|--------|--------|
| Secret store | [tool] |
| Injection | Deploy-time via [mechanism] |
| Rotation | [period] auto-rotate |
| Access control | Per-environment, per-service; least privilege |

### Vulnerability Management SLAs

| Severity | Triage | Remediation |
|----------|--------|-------------|
| Critical | < 4 hours | < 24 hours |
| High | < 1 day | < 7 days |
| Medium | < 3 days | < 30 days |
| Low | < 5 days | Next release |

### Compliance Automation
[Describe compliance automation per regulatory requirements, or state "Standard commercial practices"]

---

## 10. Governance & Compliance

### Policy-as-Code

| Category | Policy Examples | Engine | Enforcement Point |
|----------|----------------|--------|-------------------|
| Security | [policies] | [engine] | [point] |
| Compliance | [policies] | [engine] | [point] |
| Cost | [policies] | [engine] | [point] |
| Quality | [policies] | [engine] | [point] |

### Approval Workflows

| Change Type | Reviewers | Auto-merge | Gate |
|-------------|-----------|-----------|------|
| Application code | [N] peer | [yes/no] | PR merge |
| IaC (non-prod) | [N] peer | [yes/no] | IaC PR |
| IaC (production) | [N] + senior | No | IaC PR + manual |
| Policy changes | [N] + security | No | PR merge |
| Hotfix | [N] (expedited) | No | Hotfix gate |

### Audit Trail

| Event | Recorded | Retention |
|-------|----------|-----------|
| Code change | PR, reviewers, approval, ticket | Permanent |
| Pipeline run | Stages, gates, artifacts, duration | 365 days |
| Deployment | Version, env, timestamp, deployer | 365 days |
| Secret access | Who, which, timestamp | 365 days |

### Branch Strategy
**[Trunk-based / GitHub Flow / GitFlow]**

Rationale: [why this strategy was chosen]

---

## 11. Developer Experience

### Local Development Loop

| Aspect | Design |
|--------|--------|
| Setup time | < [N] minutes from clone to running tests |
| Dependencies | [docker-compose / Testcontainers / in-memory stubs] |
| Hot reload | [approach per stack] |
| Local testing | Unit + narrow integration tests runnable locally |

### Self-Service Capabilities

| Capability | Method | Target Time |
|-----------|--------|-------------|
| Environment provisioning | [IaC / platform CLI] | < 10 min |
| Pipeline execution | Push/PR trigger | Automatic |
| Log access | [tool] self-service | Immediate |
| Metric dashboards | [tool] self-service | Immediate |

### Golden Paths
[Describe standardised paths for common tasks, or state "To be defined as platform matures"]

### DX Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Build time (commit to green) | < 15 min | CI platform |
| PR review time | < 4 hours | Git platform |
| Environment provisioning | < 10 min | Platform metrics |
| Developer satisfaction | > 7/10 | Quarterly survey |

---

## 12. DORA Metrics & Continuous Improvement

### DORA Metrics

| Metric | Baseline | Target | Target Level |
|--------|----------|--------|-------------|
| Deployment Frequency | [current] | [target] | [elite/high/medium] |
| Lead Time for Changes | [current] | [target] | [level] |
| Change Failure Rate | [current] | < [N]% | [level] |
| MTTR | [current] | < [target] | [level] |

### Extended Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Flaky test ratio | < 1% | Test reporting |
| Dependency freshness | > 80% | Dependency scanner |
| SLO compliance | > 99% | Observability |
| On-call burden | < 2 P1/P2 per week | On-call platform |

### Maturity Roadmap

| Phase | Timeline | Focus | DORA Target |
|-------|----------|-------|-------------|
| Foundation | Month 1-3 | Basic CI/CD, tests, staging, monitoring | Medium |
| Automation | Month 3-6 | Full pipeline, IaC, security, SLOs | High |
| Optimisation | Month 6-12 | Progressive delivery, policy-as-code, DX | High → Elite |
| Platform | Month 12+ | Self-service, golden paths, chaos engineering | Elite |

### Continuous Improvement

| Cycle | Frequency | Focus |
|-------|-----------|-------|
| Sprint retro | Every sprint | Process friction, incidents |
| Monthly DevOps review | Monthly | DORA trends, SLO compliance |
| Quarterly strategy review | Quarterly | Investment, maturity progress |

---

## 13. Risks & Open Questions

### Open Questions

| # | Question | Impact | Owner | Target |
|---|----------|--------|-------|--------|
| 1 | [question] | [impact] | [owner] | [date] |

### Delivery Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| [risk] | [H/M/L] | [H/M/L] | [mitigation] |

### Dependencies

| Dependency | Status | Impact if Unresolved |
|-----------|--------|---------------------|
| [dependency] | [resolved/pending] | [impact] |

### Assumptions

| # | Assumption | Risk if Wrong |
|---|-----------|--------------|
| 1 | [assumption] | [risk] |

---

## 14. References

| Document | Path |
|----------|------|
| PRD | `explore/prds/[slug]-prd.md` |
| HLD | `explore/hlds/[slug]-hld.md` |
| ADRs | `explore/decisions/[slug]-adr-*.md` |
| Test Strategy | `explore/explore-[slug]/test-strategy.md` |
| Path to Production | `explore/[slug]/path-to-production.md` |
| Tooling | `explore/tooling.md` |
| Glossary | `explore/glossary.md` |

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
