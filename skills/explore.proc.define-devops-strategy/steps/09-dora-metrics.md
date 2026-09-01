# Step 9: Define DORA Metrics and Continuous Improvement

## Objective

Define DORA metrics baselines, targets, and improvement loops. Establish a measurement framework that connects delivery performance to business outcomes and drives continuous improvement.

## Entry Criteria

- [ ] Steps 3-8 complete with pipeline, environment, release, observability, security, and governance designs confirmed
- [ ] Deployment frequency expectation known from DS-02
- [ ] System criticality known from DS-01

## Actions

### 9.1 Define DORA Metrics

The four DORA metrics measure software delivery performance. Define baselines (current or estimated) and targets:

**Core DORA Metrics:**

| Metric | Definition | Baseline | Target | Measurement |
|--------|-----------|----------|--------|-------------|
| **Deployment Frequency** | How often code is deployed to production | [current or "new project"] | [target from DS-02] | CI/CD platform: count of production deployments per time period |
| **Lead Time for Changes** | Time from commit to production deploy | [current or estimate] | [target based on profile] | CI/CD platform: timestamp diff between first commit and prod deploy |
| **Change Failure Rate** | % of deployments causing a failure (rollback, hotfix, incident) | [current or estimate] | < 5% (elite) / < 15% (high) | Incident tracking: failed deploys / total deploys |
| **Mean Time to Restore (MTTR)** | Time from failure detection to service restoration | [current or estimate] | < 1 hour (elite) / < 1 day (high) | Incident tracking: time from P1/P2 alert to resolution |

**DORA Performance Levels (2024/2025 benchmarks):**

| Level | Deploy Frequency | Lead Time | Change Failure Rate | MTTR |
|-------|-----------------|-----------|-------------------|------|
| **Elite** | Multiple per day | < 1 hour | < 5% | < 1 hour |
| **High** | Weekly to daily | 1 day to 1 week | 5-15% | < 1 day |
| **Medium** | Monthly to weekly | 1 week to 1 month | 15-30% | 1 day to 1 week |
| **Low** | Monthly or less | > 1 month | > 30% | > 1 week |

**Target level per strategy profile:**

| Profile | Target DORA Level | Rationale |
|---------|------------------|-----------|
| **Lean** | Medium → High | Establish automation first; improve incrementally |
| **Standard** | High | Fast delivery with controlled risk |
| **Enterprise** | High → Elite | Invest in automation and platform for elite performance |

### 9.2 Define Extended Metrics

Beyond DORA, measure developer experience and operational health:

**Developer Experience Metrics:**

| Metric | Definition | Target | Measurement |
|--------|-----------|--------|-------------|
| **Build time** (commit to green) | Time for full CI pipeline to pass | < 15 min | CI platform |
| **PR review time** | Time from PR opened to first review | < 4 hours | Git platform |
| **PR merge time** | Time from PR opened to merge | < 1 business day | Git platform |
| **Environment provisioning time** | Time to get a working dev/test environment | < 10 min | Platform metrics |
| **Developer NPS / Satisfaction** | Internal satisfaction with tooling and processes | > 7/10 | Quarterly survey |

**Operational Health Metrics:**

| Metric | Definition | Target | Measurement |
|--------|-----------|--------|-------------|
| **SLO compliance** | % of SLOs met in rolling window | > 99% of SLOs met | Observability platform |
| **Alert-to-incident ratio** | How many alerts result in real incidents | > 50% (less noise) | Incident tracking |
| **On-call burden** | Pages per on-call shift | < 2 P1/P2 per week | On-call platform |
| **Flaky test ratio** | % of tests that are non-deterministic | < 1% | Test reporting |
| **Dependency freshness** | % of dependencies at latest minor/patch | > 80% | Dependency scanner |
| **Security vulnerability backlog** | Count of open vulns beyond SLA | 0 critical; < 5 high | Security dashboard |

### 9.3 Design Measurement Infrastructure

**Data Collection:**

| Data Source | What it Provides | Tool |
|-------------|-----------------|------|
| CI/CD platform | Pipeline runs, stage durations, deployment timestamps | [GitHub Actions / GitLab CI / Azure DevOps] |
| Git platform | PR metrics, review times, merge times, commit history | [GitHub / GitLab / Azure Repos] |
| Incident tracking | Incidents, severity, MTTR, change failure correlation | [PagerDuty / OpsGenie / Jira] |
| Observability platform | SLO compliance, error rates, latency, uptime | [Grafana / Datadog / CloudWatch] |
| Security scanning | Vulnerability counts, MTTR, SBOM freshness | [Snyk / Trivy / SonarQube] |

**Dashboards:**

| Dashboard | Audience | Refresh |
|-----------|----------|---------|
| **DORA Metrics** | Engineering leadership | Weekly |
| **Team Health** | Team leads | Daily |
| **Security Posture** | Security / Compliance | Daily |
| **SLO Status** | On-call / Product | Real-time |

### 9.4 Design Continuous Improvement Loops

**Improvement Cadence:**

| Cycle | Frequency | Participants | Focus |
|-------|-----------|-------------|-------|
| **Sprint retro** | Every sprint | Dev team | Process friction, tooling issues, recent incidents |
| **Monthly DevOps review** | Monthly | Team leads + Platform | DORA trends, SLO compliance, security posture |
| **Quarterly strategy review** | Quarterly | Engineering leadership | Strategic alignment, investment priorities, maturity progress |

**Improvement Process:**

```
Measure → Identify bottleneck → Hypothesise improvement → Implement → Measure again
```

**Common improvement patterns:**

| Bottleneck | Symptom | Improvement |
|-----------|---------|-------------|
| Slow pipeline | Lead time > target | Parallelise stages; cache dependencies; split test suites |
| High change failure rate | CFR > 15% | Increase test coverage; add contract tests; improve PR review |
| Slow recovery | MTTR > target | Improve runbooks; automate rollback; better alerting |
| Low deploy frequency | < target | Reduce batch size; feature flags; trunk-based development |
| Alert fatigue | High on-call burden | Consolidate alerts; raise thresholds; fix noisy alerts |
| Slow PR review | Review time > 4 hours | Smaller PRs; async review norms; auto-assign reviewers |

### 9.5 Define Maturity Roadmap

**Phased maturity progression:**

| Phase | Timeline | Focus | DORA Target |
|-------|----------|-------|-------------|
| **Phase 1: Foundation** | Month 1-3 | Basic CI/CD; automated tests; staging environment; basic monitoring | Medium |
| **Phase 2: Automation** | Month 3-6 | Full pipeline; IaC; security scanning; SLOs; on-call | High |
| **Phase 3: Optimisation** | Month 6-12 | Progressive delivery; policy-as-code; DX improvements; DORA tracking | High → Elite |
| **Phase 4: Platform** | Month 12+ | Self-service platform; golden paths; chaos engineering; AI-assisted ops | Elite |

**Phase gates** (move to next phase when):
- All metrics in current phase meet targets for 2 consecutive months
- No critical security vulnerabilities open beyond SLA
- Team satisfaction score stable or improving
- No P1 incidents caused by process gaps

## Checkpoint

- [ ] DORA metrics defined with baselines and targets
- [ ] Extended metrics defined (DX + operational health)
- [ ] Measurement infrastructure designed
- [ ] Continuous improvement loops defined
- [ ] Maturity roadmap drafted
- [ ] User confirmed metrics and improvement approach

## Exit Criteria

- DORA metrics and continuous improvement strategy is complete
- Ready to write the full DevOps strategy document

## Next Step

-> [10-write-document.md](./10-write-document.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
