# Step 6: CI/CD Integration and Quality Gates

## Entry Criteria
- Pyramid layers and tooling from Steps 3-4
- Environment topology from Step 5

## Actions

### Action 1: Define Pipeline Stage Model

**Agent maps test layers to CI/CD pipeline stages following the fast-feedback principle:**

```
Commit → [Stage 1] → [Stage 2] → [Stage 3] → [Stage 4] → Deploy
         Seconds      Minutes      Minutes      Minutes
```

| Stage | Name | Tests Run | Trigger | Max Duration | Failure Action |
|-------|------|-----------|---------|-------------|---------------|
| 1 | **Lint + Unit** | Lint, format check, unit tests, coverage | Every push / PR | < 3 min | Block merge |
| 2 | **Integration** | Narrow integration tests, contract tests | Every PR | < 10 min | Block merge |
| 3 | **Build + Package** | Build artifacts, container images | PR merge to main | < 5 min | Block deploy |
| 4 | **E2E + NFR** | E2E tests, performance (on staging) | Post-deploy to staging | < 30 min | Block promotion to prod |
| 5 | **Smoke** | Critical path smoke tests | Post-deploy to prod | < 5 min | Alert + rollback |

**Fast-feedback ordering** (Fowler): *"Put fast-running tests in earlier stages. The speed and scope of a test — not its type — determines its pipeline position."*

### Action 2: Define Quality Gates

**Quality gates are pass/fail checkpoints that block progression:**

**Gate 1 — PR Merge Gate (Stages 1-2):**

| Check | Threshold | Tool |
|-------|-----------|------|
| Unit test pass rate | 100% | JUnit / Jest |
| Unit test coverage (line) | ≥ 90% on changed files (FLOOR) | JaCoCo / Istanbul |
| Unit test coverage (branch) | ≥ 85% on changed files (FLOOR) | JaCoCo / Istanbul |
| Integration test pass rate | 100% | Test runner |
| Contract test pass rate | 100% (if applicable) | Pact / schema validator |
| Lint + format | Zero violations | ESLint / Checkstyle |
| No new security vulnerabilities | Zero critical/high | Snyk / Trivy |

**Gate 2 — Deploy to Staging Gate (Stage 3):**

| Check | Threshold | Tool |
|-------|-----------|------|
| Build succeeds | Pass | Maven / npm |
| Container image builds | Pass | Docker |
| All Stage 1-2 gates pass | Pass | CI pipeline |

**Gate 3 — Promote to Production Gate (Stage 4):**

| Check | Threshold | Tool |
|-------|-----------|------|
| E2E test pass rate | 100% | Playwright / Cypress |
| E2E flaky test ratio | < 1% | Test reporting |
| Performance NFR targets met | Per PRD thresholds | k6 / JMeter |
| Accessibility score | ≥ [target] | axe-core / Lighthouse |
| Security scan clean | Zero critical | OWASP ZAP |

**Gate 4 — Post-Deploy Validation (Stage 5):**

| Check | Threshold | Tool |
|-------|-----------|------|
| Smoke test pass rate | 100% | Playwright / API checks |
| Error rate | < [threshold] | Monitoring / APM |
| Response time p95 | < [target from NFR] | Monitoring / APM |

### Action 3: Define Failure Policies

**What happens when a gate fails:**

| Gate | Failure Policy |
|------|---------------|
| Gate 1 (PR Merge) | PR cannot be merged; author must fix and re-push |
| Gate 2 (Deploy to Staging) | Build is rejected; no staging deployment |
| Gate 3 (Promote to Prod) | Staging deployment stays; production promotion blocked; investigate |
| Gate 4 (Post-Deploy) | Automated alert; manual decision on rollback vs hotfix |

**Flaky test policy:**
- Flaky test detected → quarantine immediately (move to `@Quarantined` / `.skip`)
- Create a bug ticket to fix the flaky test within 1 sprint
- Quarantined tests do NOT block the pipeline
- Flaky ratio tracked as a KPI (target < 1%)

**STOP — AskUserQuestion:**

```
Question TS-10
  Header:      "Quality gate strictness"
  Question:    "I've defined quality gates for each pipeline stage. The coverage
                thresholds are set at 90% line / 85% branch for changed files
                (these are floors — high-risk modules should exceed them).
                Are these appropriate for the project?"
  Multi-select: No
  Options:
    - Thresholds are correct        — Proceed with these targets
    - Increase thresholds           — Tell me the desired coverage targets
    - Decrease thresholds           — Tell me why lower targets are appropriate
    - Adjust gate structure         — Tell me which gates to change
```

## Checkpoint
- [ ] Pipeline stages mapped to test layers
- [ ] Quality gates defined with measurable thresholds
- [ ] Failure policies documented
- [ ] Flaky test policy defined
- [ ] User confirmed gate strictness

## Exit Criteria
- CI/CD integration is fully defined
- Quality gates have clear thresholds and failure actions
- Ready to define metrics

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.test-strategy:0.2.1:2026-09-01T09:06:28Z -->
