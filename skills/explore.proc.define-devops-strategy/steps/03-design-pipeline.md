# Step 3: Design CI/CD Pipeline

## Objective

Design the CI/CD pipeline stages with quality gates, feedback loops, and tooling aligned to the project's architecture type, tech stack, and strategy profile. Integrate with the testing pyramid if a test strategy exists.

## Entry Criteria

- [ ] Step 2 complete with confirmed strategy profile (Lean / Standard / Enterprise)
- [ ] Architecture type and tech stack known from Step 1
- [ ] Test strategy status known (exists or not)

## Actions

### 3.1 Define Pipeline Stage Model

**Design pipeline stages following the fast-feedback principle** (Fowler): *"Put fast-running checks in earlier stages. The speed and scope of a check — not its type — determines its pipeline position."*

**Standard Pipeline Model** (adapt per strategy profile):

```
Commit → [Stage 1] → [Stage 2] → [Stage 3] → [Stage 4] → [Stage 5] → [Stage 6]
          Seconds      Minutes      Minutes      Minutes      Minutes      Minutes
```

| Stage | Name | Checks Run | Trigger | Max Duration | Failure Action |
|-------|------|------------|---------|-------------|----------------|
| 1 | **Lint + Format** | Linting, format check, type check | Every push | < 1 min | Block PR |
| 2 | **Unit Test** | Unit tests, coverage measurement | Every push | < 3 min | Block merge |
| 3 | **Integration + Contract** | Integration tests, contract tests, API schema validation | Every PR | < 10 min | Block merge |
| 4 | **Build + Package** | Compile, build artifacts, container images, SBOM generation | PR merge to main | < 5 min | Block deploy |
| 5 | **E2E + NFR** | E2E tests, performance tests, security scans (on staging) | Post-deploy to staging | < 30 min | Block promotion to prod |
| 6 | **Smoke + Verify** | Critical path smoke tests, health checks | Post-deploy to prod | < 5 min | Alert + rollback decision |

**Adapt per strategy profile**:

| Profile | Pipeline Adaptation |
|---------|-------------------|
| **Lean** | Merge stages 1-2; skip contract tests; E2E optional; manual prod deploy |
| **Standard** | Full 6-stage pipeline; automated staging deploy; manual prod approval |
| **Enterprise** | Full pipeline + policy-as-code gates; automated canary; automated rollback |

**Adapt per architecture type**:

| Architecture | Pipeline Adaptation |
|--------------|-------------------|
| **Monolith** | Single pipeline; all tests run on every change; longer stage 2-3 durations acceptable |
| **Microservices** | Per-service pipeline; contract tests mandatory in stage 3; independent deployability |
| **Event-driven** | Schema registry validation in stage 3; async integration test patterns |
| **Modular monolith** | Single pipeline; module-scoped test execution where possible |

### 3.2 Define Quality Gates

**Quality gates are pass/fail checkpoints that block pipeline progression.**

**Gate 1 — PR Merge Gate (Stages 1-3):**

| Check | Threshold | Tool |
|-------|-----------|------|
| Lint + format | Zero violations | [ESLint / Checkstyle / per stack] |
| Type check | Zero errors | [TypeScript / Java compiler] |
| Unit test pass rate | 100% | [Jest / JUnit] |
| Unit coverage (line) | ≥ 80% on changed files | [Istanbul / JaCoCo] |
| Unit coverage (branch) | ≥ 75% on changed files | [Istanbul / JaCoCo] |
| Integration test pass rate | 100% | [Test runner] |
| Contract test pass rate | 100% (if applicable) | [Pact / Spectral / schema validator] |
| Security: no new critical/high vulnerabilities | Zero | [Snyk / Trivy / Dependabot] |

**Gate 2 — Build Gate (Stage 4):**

| Check | Threshold | Tool |
|-------|-----------|------|
| Build succeeds | Pass | [npm / Maven] |
| Container image builds (if applicable) | Pass | [Docker / Buildah] |
| SBOM generated | Present | [Syft / Trivy] |
| All prior gates pass | Pass | CI pipeline |

**Gate 3 — Production Promotion Gate (Stage 5):**

| Check | Threshold | Tool |
|-------|-----------|------|
| E2E test pass rate | 100% | [Playwright / Cypress / REST Assured] |
| E2E flaky ratio | < 1% | Test reporting |
| Performance NFR targets met | Per PRD thresholds | [k6 / JMeter / Gatling] |
| Security scan clean | Zero critical | [OWASP ZAP / Trivy] |
| Accessibility score (if frontend) | ≥ target | [axe-core / Lighthouse] |

**Gate 4 — Post-Deploy Validation (Stage 6):**

| Check | Threshold | Tool |
|-------|-----------|------|
| Smoke test pass rate | 100% | [Playwright / API health checks] |
| Error rate | < [threshold from NFR] | Monitoring / APM |
| Response time p95 | < [target from NFR] | Monitoring / APM |

### 3.3 Define Failure Policies

| Gate | Failure Policy |
|------|---------------|
| Gate 1 (PR Merge) | PR cannot merge; author must fix and re-push |
| Gate 2 (Build) | Build rejected; no staging deployment; investigate |
| Gate 3 (Promote Prod) | Staging deployment stays; production promotion blocked; investigate |
| Gate 4 (Post-Deploy) | Automated alert; team decides rollback vs hotfix |

**Flaky test policy:**
- Flaky test detected → quarantine immediately (move to `@Quarantined` / `.skip`)
- Create bug ticket to fix within 1 sprint
- Quarantined tests do NOT block pipeline
- Flaky ratio tracked as KPI (target < 1%)

### 3.4 Define Artifact Strategy

**Principle**: Build once, promote everywhere. The same artifact is promoted across environments.

| Aspect | Approach |
|--------|----------|
| **Artifact type** | [Container image / JAR + static bundle / platform package] |
| **Registry** | [Container registry / artifact repository] |
| **Versioning** | Semantic versioning for releases; commit SHA for CI builds |
| **Immutability** | Artifacts are immutable once published; never overwrite a version |
| **Configuration** | Environment-specific config injected at deploy time (env vars / config maps / secrets manager) |

### 3.5 Align with Test Strategy (if exists)

If a test strategy document exists (`explore/explore-[slug]/test-strategy.md`):
- Map test pyramid layers to pipeline stages
- Adopt the quality gate thresholds defined in the test strategy
- Reference the test strategy's CI/CD integration section (Section 9)
- Ensure no contradiction between test strategy gates and pipeline gates

If no test strategy exists:
- Define testing integration based on the pipeline stages above
- Note that a dedicated test strategy should be created separately using `explore.proc.test-strategy`

**STOP — AskUserQuestion:**

```
Question DS-11
  Header:      "Pipeline design review"
  Question:    "I've designed a [N]-stage CI/CD pipeline with quality gates.
                The target is commit-to-staging in under [X] minutes.
                Are these pipeline stages and gate thresholds appropriate?"
  Multi-select: No
  Options:
    - Pipeline design is correct     — Proceed with these stages and gates
    - Adjust stage structure          — Tell me which stages to change
    - Adjust gate thresholds          — Tell me the desired thresholds
    - Simplify pipeline               — We need fewer stages for our maturity level
```

## Checkpoint

- [ ] Pipeline stages defined with triggers and duration targets
- [ ] Quality gates defined with measurable thresholds
- [ ] Failure policies documented
- [ ] Artifact strategy defined
- [ ] Test strategy alignment checked
- [ ] User confirmed pipeline design

## Exit Criteria

- CI/CD pipeline design is complete
- Quality gates have clear thresholds and failure actions
- Ready to design environment model

## Next Step

-> [04-design-environments.md](./04-design-environments.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.define-devops-strategy:0.1.3:2026-09-01T09:19:01Z -->
