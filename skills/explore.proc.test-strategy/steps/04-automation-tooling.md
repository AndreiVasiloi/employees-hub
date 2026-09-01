# Step 4: Automation Frameworks and Tooling

## Entry Criteria
- Pyramid layers defined from Step 3
- Tech stack known from Step 1

## Actions

### Action 1: Propose Tooling Per Layer

**Agent maps project tech stack to recommended tooling for each pyramid layer:**

**Unit Test Tooling:**

| Stack | Framework | Assertion Library | Mocking | Coverage |
|-------|-----------|------------------|---------|----------|
| Java / Spring Boot | JUnit 5 | AssertJ / Hamcrest | Mockito | JaCoCo |
| React / TypeScript | Jest + React Testing Library | Jest built-in | Jest mocks / MSW | Istanbul (via Jest) |
| [Other stack] | [framework] | [assertions] | [mocking] | [coverage] |

**Integration Test Tooling:**

| Boundary Type | Tool | Purpose |
|--------------|------|---------|
| Database | Testcontainers / H2 (in-memory) | Real DB in containers or in-memory for fast tests |
| External REST APIs | WireMock (Java) / MSW (JS/TS) | Stub external APIs at the HTTP level |
| Message Queues | Embedded broker / Testcontainers | Test publish/consume without external infra |
| REST API verification | REST Assured (Java) / Supertest (JS) | HTTP-level API testing |

**Contract Test Tooling (if applicable):**

| Approach | Tool | How It Works |
|----------|------|-------------|
| CDC | Pact | Consumer writes expectations → Provider verifies |
| Schema validation | OpenAPI diff / Spectral | Validates API changes against spec |

**E2E Test Tooling:**

| Layer | Tool | Rationale |
|-------|------|-----------|
| Browser-based E2E | Playwright / Cypress | Modern, stable, good debugging, parallel execution |
| API-level E2E | REST Assured / Supertest | Faster than browser E2E; covers backend journeys |
| Visual regression | Playwright screenshots / Percy | Catch unintended visual changes |

**Non-Functional Test Tooling (based on Step 2 selections):**

| Type | Tool | Purpose |
|------|------|---------|
| Performance / Load | k6 / JMeter / Gatling | Load testing against NFR targets |
| Security | OWASP ZAP / Snyk / Trivy | Vulnerability scanning and dependency audit |
| Accessibility | axe-core / Pa11y / Lighthouse | Automated WCAG conformance checks |
| Compatibility | BrowserStack / Playwright multi-browser | Cross-browser/device validation |

**STOP — AskUserQuestion:**

```
Question TS-7
  Header:      "Tooling selection"
  Question:    "I've proposed testing tools aligned with the project's tech stack
                ([stack summary]). Do you have existing tooling preferences or
                constraints I should account for?"
  Multi-select: No
  Options:
    - Use recommended tooling       — Proceed with the proposed tools
    - We have existing tools        — Tell me what tools are already in use
    - Specific constraints          — Tell me about licensing, approval, or infrastructure limits
    - Discuss alternatives          — I'd like to consider different options for specific layers
```

### Action 2: Define Test Code Organisation

**Agent proposes test code structure:**

**Backend (Java / Spring Boot):**
```
src/
├── main/java/...              # Production code
├── test/java/...              # Unit tests (mirror main structure)
└── integration-test/java/...  # Integration tests (separate source set)
```

**Frontend (React / TypeScript):**
```
src/
├── components/
│   ├── MyComponent.tsx
│   └── MyComponent.test.tsx     # Co-located unit tests
├── __tests__/
│   └── integration/             # Integration tests
└── e2e/                         # E2E tests (or top-level /e2e)
```

**Naming conventions:**
- Unit tests: `*Test.java` / `*.test.ts(x)`
- Integration tests: `*IT.java` / `*.integration.test.ts`
- E2E tests: `*.e2e.test.ts` / `*.spec.ts`
- Contract tests: `*ContractTest.java` / `*.contract.test.ts`

### Action 3: Define Test Execution Commands

**Agent proposes standardised Taskfile commands:**

| Command | Scope | When |
|---------|-------|------|
| `task test:unit` | Unit tests only | Every commit, pre-push |
| `task test:integration` | Integration tests | Every PR, CI pipeline |
| `task test:contract` | Contract tests | Every PR, CI pipeline |
| `task test:e2e` | E2E tests | Post-deploy to staging |
| `task test:all` | Full suite | Release gate |
| `task test:coverage` | Coverage report | CI pipeline, release gate |

## Checkpoint
- [ ] Tooling proposed for every pyramid layer
- [ ] User confirmed tooling selection or provided constraints
- [ ] Test code organisation defined
- [ ] Execution commands standardised

## Exit Criteria
- Tooling is selected for all layers
- Code organisation and naming conventions are defined
- Ready to define test data and environments

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.test-strategy:0.2.1:2026-09-01T09:06:28Z -->
