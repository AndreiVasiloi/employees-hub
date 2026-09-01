# Test Strategy: [Project Name]

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | [date] | [author] | Initial test strategy |

---

## 1. Overview

### Purpose
[1-2 sentences: what this test strategy covers and why it exists.]

### Scope
- **In scope**: [features, components, and services covered]
- **Out of scope**: [what is explicitly excluded and why]

### Guiding Principles
1. **Testing pyramid** — many fast unit tests, fewer integration tests, minimal E2E tests
2. **Automate everything** — the goal is to automate as close to 100% of test execution as possible; manual testing is reserved exclusively for exploratory sessions
3. **Push tests down** — if a condition can be tested at a lower level, test it there
4. **No duplication across layers** — each layer tests what the layer below cannot
5. **Fast feedback** — pipeline gives feedback in minutes, not hours
6. **Test code is production code** — same quality standards, same review rigour
7. **Targets are floors, not ceilings** — all numeric targets are minimums; teams should exceed them wherever risk, regulation, or complexity justifies it

### Risk Posture
[Safety-critical / Business-critical / Standard commercial / MVP]

### Source Documents
- PRD: `explore/prds/[slug]-prd.md`
- HLD: `explore/hlds/[slug]-hld.md`
- ADRs: [list relevant ADRs]

---

## 2. Testing Pyramid

```
         /\
        /  \         E2E Tests ([N]%)
       / E2E\        [N] critical journeys
      /------\
     /Contract\      Contract Tests ([N]%)
    /----------\     [N] service contracts
   /Integration \    Integration Tests ([N]%)
  /--------------\   [N] boundaries
 /   Unit Tests   \  Unit Tests ([N]%)
/------------------\ [N] component scopes
```

### Layer Distribution Targets

| Layer | Target % | Test Count (est.) | Suite Duration |
|-------|---------|-------------------|---------------|
| Unit | [70-80]% (FLOOR) | [estimate] | < 2 min |
| Integration | [20-30]% (FLOOR) | [estimate] | < 10 min |
| Contract | [0-5]% | [estimate] | < 2 min |
| E2E | [5-10]% | [estimate] | < 30 min |

### Pyramid Health Red Flags
- Unit < 60% → too few unit tests; push tests down
- E2E > 15% → ice-cream cone forming; refactor to lower layers
- Pipeline > 30 min → feedback too slow; optimise or parallelise

**All targets are FLOORS, not ceilings.** High-risk, regulated, or business-critical modules should exceed these minimums significantly. The goal is to automate every testable behaviour.

---

## 3. Unit Testing

### Definition
A "unit" is [single class/function/module in isolation — project-specific definition].

### Scope
- Business logic and domain rules
- Data transformations and validators
- Utility functions and helpers
- UI component rendering and behaviour (frontend)

### Exclusions
- No database, no network, no filesystem, no external services

### Framework and Tooling

| Stack | Framework | Assertions | Mocking | Coverage |
|-------|-----------|-----------|---------|----------|
| [Backend] | [framework] | [library] | [library] | [tool] |
| [Frontend] | [framework] | [library] | [library] | [tool] |

### Patterns
- **Structure**: Arrange-Act-Assert (AAA) or Given-When-Then
- **Naming**: `should_[expected]_when_[condition]`
- **Data**: Test data factories, no hard-coded literals
- **Isolation**: Each test independent; no shared mutable state

### Coverage Targets

| Metric | Target | Scope |
|--------|--------|-------|
| Line coverage | ≥ [90]% (FLOOR) | Business logic classes/modules |
| Branch coverage | ≥ [85]% (FLOOR) | Business logic classes/modules |
| Function coverage | ≥ [95]% (FLOOR) | Public interfaces |

### Component Scope

| Component | Key Test Areas | Priority |
|-----------|---------------|----------|
| [Component 1] | [areas] | [High/Med/Low] |
| [Component 2] | [areas] | [priority] |

---

## 4. Integration Testing

### Definition
Tests that cross a boundary — database, external API, filesystem, message queue. One boundary per test (narrow integration).

### Boundaries

| Boundary | Type | Approach | Tool |
|----------|------|----------|------|
| [App] ↔ [Database] | DB | [Testcontainers / in-memory] | [tool] |
| [App] ↔ [External API] | API | [WireMock / MSW stub] | [tool] |
| [App] ↔ [Queue] | Queue | [Embedded broker] | [tool] |

### What to Test at Each Boundary
- Serialisation and deserialisation correctness
- Query correctness (DB)
- Request format and response parsing (API)
- Publish/consume and schema compliance (Queue)
- Error handling (connection failure, timeout, malformed response)

### Coverage Targets
- Every integration boundary has ≥ 1 happy-path test
- Every integration boundary has ≥ 1 error-path test

---

## 5. Contract Testing

### Applicability
[Applicable — multi-service architecture / Not applicable — monolith or single service]

### Approach
[Consumer-Driven Contracts (CDC) / OpenAPI schema validation / N/A]

### Contracts

| Consumer | Provider | Interface | Tool |
|----------|----------|-----------|------|
| [Service A] | [Service B] | [REST/gRPC/Event] | [Pact / Spectral] |

### Process
1. Consumer team writes contract expectations
2. Provider team runs contract verification in CI
3. Breaking changes detected before deployment

*If not applicable, state rationale and skip this section.*

---

## 6. E2E Testing

### Definition
Tests that exercise the full deployed system through the user interface or primary API. Limited to critical user journeys only.

### Critical User Journeys

| # | Journey | Steps | Risk Level | Automated |
|---|---------|-------|-----------|-----------|
| 1 | [Journey name] | [N] | [High/Med] | ✅ |
| 2 | [Journey name] | [N] | [High/Med] | ✅ |

### Framework and Tooling

| Type | Tool | Rationale |
|------|------|-----------|
| Browser E2E | [Playwright / Cypress] | [reason] |
| API E2E | [REST Assured / Supertest] | [reason] |
| Visual regression | [tool or N/A] | [reason] |

### Stability Approach
- **Flaky test target**: < 1%
- **Quarantine policy**: Flaky tests moved to quarantine immediately; fixed within 1 sprint
- **Retry policy**: [N] retries before marking as failure
- **Wait strategy**: Explicit waits on conditions, never `sleep()`

---

## 7. Non-Functional Testing

### Performance Testing
- **Tool**: [k6 / JMeter / Gatling]
- **Targets**: [from PRD NFRs — response time, throughput, concurrent users]
- **When**: [staging environment, pre-release]
- **Approach**: [load test, stress test, soak test]

### Security Testing
- **Tool**: [OWASP ZAP / Snyk / Trivy]
- **Scope**: [OWASP Top 10, dependency vulnerabilities, auth/authz]
- **When**: [CI pipeline for dependency scan; staging for dynamic scan]

### Accessibility Testing
- **Tool**: [axe-core / Pa11y / Lighthouse]
- **Target**: [WCAG 2.2 AA]
- **When**: [CI for automated checks; manual audit per release]

### Compatibility Testing
- **Tool**: [BrowserStack / Playwright multi-browser]
- **Scope**: [browsers, devices, breakpoints]
- **When**: [pre-release]

*Include only the types selected by the steering team.*

---

## 8. Test Data and Environments

### Test Data Strategy

| Layer | Approach | Details |
|-------|----------|---------|
| Unit | Factories + builders | In-memory, no shared state |
| Integration | Seed + rollback | Per-test transaction rollback or truncation |
| E2E | Seed scripts + test accounts | Version-controlled, anonymised |

### Data Rules
- All test data and fixtures are version-controlled
- No real customer or PII data in tests
- Factories preferred over hard-coded literals
- Each test manages its own data lifecycle

### Environment Topology

| Environment | Purpose | Tests Run | Data | Infra |
|-------------|---------|-----------|------|-------|
| Local | Dev testing | Unit + narrow integration | In-memory | Dev machine |
| CI | PR validation | Unit + integration + contract | Ephemeral containers | [CI platform] |
| Staging | Release validation | E2E + performance + security | Production-like (anonymised) | [cloud] |
| Production | Post-deploy checks | Smoke tests | Real | Production |

---

## 9. CI/CD Integration

### Pipeline Stages

```
Push → [Lint+Unit] → [Integration] → [Build] → [E2E+NFR] → [Smoke]
        < 3 min       < 10 min       < 5 min    < 30 min     < 5 min
```

| Stage | Tests | Trigger | Max Duration | On Failure |
|-------|-------|---------|-------------|-----------|
| 1. Lint + Unit | Lint, format, unit, coverage | Every push | < 3 min | Block merge |
| 2. Integration | Integration, contract | Every PR | < 10 min | Block merge |
| 3. Build | Compile, package, image | Merge to main | < 5 min | Block deploy |
| 4. E2E + NFR | E2E, performance, security | Deploy to staging | < 30 min | Block promotion |
| 5. Smoke | Critical path smoke | Deploy to prod | < 5 min | Alert + rollback |

### Quality Gates

| Gate | Checks | Thresholds |
|------|--------|-----------|
| PR Merge | Unit pass, coverage, lint, security | 100% pass, ≥ [90]% line (FLOOR), ≥ [85]% branch (FLOOR) |
| Deploy Staging | Build success, stages 1-2 pass | All prior gates pass |
| Promote Prod | E2E pass, NFR targets met | 100% E2E, flaky < 1%, NFR within targets |
| Post-Deploy | Smoke pass, error rate, latency | 100% smoke, error < [X]%, p95 < [Y]ms |

### Failure Policies
- **PR gate failure**: Author fixes and re-pushes
- **Build failure**: No staging deployment; investigate
- **E2E/NFR failure**: Staging stays; production blocked; investigate
- **Post-deploy failure**: Alert; manual rollback vs hotfix decision

### Flaky Test Policy
- Detected → quarantine immediately
- Bug ticket created → fix within 1 sprint
- Quarantined tests do not block pipeline
- Flaky ratio tracked as KPI (target < 1%)

---

## 10. Metrics and Success Criteria

### Coverage Metrics

| Metric | Target | Tool | Frequency |
|--------|--------|------|-----------|
| Line coverage (unit) | ≥ [90]% (FLOOR) | [tool] | Every PR |
| Branch coverage (unit) | ≥ [85]% (FLOOR) | [tool] | Every PR |
| Integration boundary coverage | 100% boundaries | Audit | Monthly |
| E2E journey coverage | 100% critical journeys | Audit | Per release |

### Performance Metrics

| Metric | Target |
|--------|--------|
| Unit suite duration | < 2 min |
| Integration suite duration | < 10 min |
| E2E suite duration | < 30 min |
| Full pipeline (commit → staging) | < 20 min |

### Quality Metrics

| Metric | Target | Action Threshold |
|--------|--------|-----------------|
| Flaky test ratio | < 1% | > 2% → halt new E2E; fix existing |
| Test maintenance ratio | < 20% dev time | > 25% → refactor test infra |
| Defect escape rate | < 3% | > 5% → post-mortem; add lower-level tests |

### Pyramid Distribution

| Layer | Target | Red Flag |
|-------|--------|----------|
| Unit | 70-80% (FLOOR) | < 60% |
| Integration | 20-30% (FLOOR) | > 35% |
| E2E | 5-10% | > 15% |

**All targets are FLOORS.** Push higher wherever risk, regulation, or complexity justifies it. The goal is near-complete automated coverage.

### DORA Metrics (Baseline)

| Metric | Current | Target |
|--------|---------|--------|
| Deployment frequency | [baseline] | [target] |
| Lead time (commit → prod) | [baseline] | [target] |
| Change failure rate | [baseline] | < 5% |
| MTTR | [baseline] | [target] |

---

## 11. Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| [Risk 1 — e.g., Flaky E2E tests slow pipeline] | [Med/High] | [Med/High] | [Quarantine + fix policy; retry mechanism] |
| [Risk 2 — e.g., Test data drift from production] | [Med] | [Med] | [Regular data refresh; anonymisation pipeline] |
| [Risk 3 — e.g., External API instability] | [Med] | [Low] | [WireMock stubs; contract tests; circuit breakers] |
| [Risk 4 — e.g., Coverage targets not met initially] | [Low] | [High] | [Incremental targets; TDD enforcement; PR reviews] |

---

## 12. References

| Document | Path |
|----------|------|
| PRD | `explore/prds/[slug]-prd.md` |
| HLD | `explore/hlds/[slug]-hld.md` |
| ADRs | `explore/decisions/[slug]-adr-*.md` |
| Tooling | `explore/tooling.md` |
| Glossary | `explore/glossary.md` |

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.test-strategy:0.2.1:2026-09-01T09:06:28Z -->
