# Step 3: Define Testing Pyramid Layers

## Entry Criteria
- Testing scope and risk profile from Step 2 are locked
- Tech stack is known from Step 1 context

## Actions

### Action 1: Define Unit Test Layer (Base — 70-80%)

**Agent defines the unit test layer based on component inventory from HLD:**

**Unit Test Definition:**

| Aspect | Definition |
|--------|-----------|
| **What is a "unit"** | [Single class/function/module in isolation — adapted to project's architecture] |
| **Scope** | Business logic, domain rules, data transformations, utility functions, validators |
| **Exclusions** | No database, no network, no filesystem, no external services |
| **Isolation strategy** | Mocks/stubs for all external dependencies |
| **Speed target** | Individual test < 100ms; full suite < 2 minutes |
| **Coverage target** | ≥ 90% line coverage on business logic; ≥ 85% branch coverage (these are **floors** — high-risk and regulated modules should target ≥ 95% line / ≥ 90% branch) |
| **Ownership** | Developer who writes the code writes the unit tests (TDD) |

**Unit test scope per component:**

| Component | Key Unit Test Areas | Priority |
|-----------|-------------------|----------|
| [Component 1 from HLD] | [business logic, validation, transformations] | [High/Medium/Low from risk map] |
| [Component 2 from HLD] | [domain rules, calculations] | [priority] |

**Patterns to enforce:**
- **Arrange-Act-Assert** (AAA) or **Given-When-Then** structure
- One assertion concept per test
- Test naming: `should_[expected]_when_[condition]` or equivalent
- Test data factories over raw literals
- No test interdependencies (each test runs in isolation)

### Action 2: Define Integration Test Layer (Middle — 20-30%)

**Agent defines the integration test layer based on boundaries from HLD:**

**Integration Test Definition:**

| Aspect | Definition |
|--------|-----------|
| **What is "integration"** | Code that crosses a boundary — database, external API, filesystem, message queue |
| **Scope** | Serialisation/deserialisation, repository queries, API client calls, queue producers/consumers |
| **Pattern** | Test ONE integration point at a time (narrow integration tests) |
| **External deps** | Real database (testcontainers/in-memory); stubbed external APIs (WireMock/similar) |
| **Speed target** | Individual test < 5s; full suite < 10 minutes |
| **Coverage target** | Every integration boundary has ≥ 1 happy-path + ≥ 1 error-path + ≥ 1 edge-case test. High-risk boundaries (payments, auth, external APIs) should have comprehensive scenario coverage (these are **floors**) |
| **Ownership** | Developer who owns the integration code |

**Integration boundaries to test:**

| Boundary | Type | Test Approach |
|----------|------|--------------|
| [App] ↔ [Database] | DB integration | Testcontainers / in-memory DB; verify read/write/query |
| [App] ↔ [External API] | API integration | WireMock/stub; verify request format + response parsing |
| [App] ↔ [Message Queue] | Queue integration | Embedded broker; verify publish/consume + schema |
| [App] ↔ [Filesystem] | File integration | Temp directory; verify read/write/format |

**Key principle** (Fowler): *"Write integration tests for all pieces of code where you either serialise or deserialise data."*

### Action 3: Define Contract Test Layer (Optional — Multi-Service Only)

**If HLD shows multiple services communicating:**

**Contract Test Definition:**

| Aspect | Definition |
|--------|-----------|
| **What is a "contract"** | The agreed interface between a consumer and provider service |
| **Pattern** | Consumer-Driven Contracts (CDC) — consumers define expectations, providers verify them |
| **Scope** | API request/response shape, required fields, data types, status codes |
| **Not covered** | Business logic (that's unit test territory), full integration (that's E2E) |
| **Speed target** | Runs in CI without requiring all services to be deployed |
| **Ownership** | Consumer team writes consumer tests; provider team runs provider verification |

**Contracts to define:**

| Consumer | Provider | Interface | Contract Scope |
|----------|----------|-----------|---------------|
| [Service A] | [Service B] | REST/gRPC/Event | [endpoints/events covered] |

**If single service / monolith**: Skip contract tests. Integration tests at module boundaries provide equivalent confidence.

**STOP — AskUserQuestion:**

```
Question TS-5
  Header:      "Contract testing approach"
  Question:    "Based on the architecture, [the system has N service boundaries / is a monolith].
                How should we handle inter-service contract validation?"
  Multi-select: No
  Options:
    - CDC with Pact or similar     — Consumer-Driven Contracts; provider verifies consumer expectations
    - OpenAPI schema validation    — Validate requests/responses against OpenAPI spec at build time
    - Skip contract tests          — Architecture doesn't warrant a separate contract layer
    - Discuss further              — Need more context on service interactions before deciding
```

### Action 4: Define E2E Test Layer (Top — 5-10%)

**Agent proposes E2E tests based on critical user journeys from PRD:**

**E2E Test Definition:**

| Aspect | Definition |
|--------|-----------|
| **What is "E2E"** | Tests that exercise the full deployed system through the user interface or primary API |
| **Scope** | Critical user journeys ONLY — the paths that define core product value |
| **Not covered** | Edge cases (unit tests), integration correctness (integration tests), contract shape (contract tests) |
| **Speed target** | Full suite < 30 minutes |
| **Stability target** | Flaky test ratio < 1% |
| **Ownership** | QA / test engineering with developer collaboration |

**E2E test candidates (from PRD critical journeys):**

| # | Journey | Steps | Risk Level | Include? |
|---|---------|-------|-----------|---------|
| 1 | [Journey from PRD — e.g., "User completes insurance quote"] | [N steps] | [from risk map] | ✅ / ❌ |
| 2 | [Journey 2] | [N steps] | [risk] | ✅ / ❌ |
| 3 | [Journey 3] | [N steps] | [risk] | ✅ / ❌ |

**Key principle** (Fowler): *"Think about the high-value interactions users will have with your application. Translate the most important steps of these user journeys into automated E2E tests. Everything more than that will likely be more painful than helpful."*

**STOP — AskUserQuestion:**

```
Question TS-6
  Header:      "E2E journey selection"
  Question:    "I've identified [N] critical user journeys from the PRD as E2E test
                candidates. These are the ONLY scenarios that will have full E2E coverage.
                Everything else is covered by lower pyramid layers. Confirm the selection."
  Multi-select: No
  Options:
    - All correct — proceed       — E2E journeys confirmed
    - Add a journey               — Tell me which journey to add and why it's critical
    - Remove a journey            — Tell me which journey can be covered by lower-level tests
    - Adjust priority             — Tell me which journeys to re-prioritise
```

### Action 5: Present Pyramid Summary

**Agent presents the complete pyramid:**

```
Testing Pyramid Definition:

Layer 4 — E2E (5-10%):
  [N] critical journeys | [framework TBD] | Suite < 30 min | Flaky < 1%

Layer 3 — Contract ([if applicable]):
  [N] service contracts | [approach] | Runs in CI

Layer 2 — Integration (20-30%):
  [N] boundaries | Narrow integration | Suite < 10 min

Layer 1 — Unit (70-80%):
  [N] component scopes | ≥ 90% line / ≥ 85% branch (FLOOR) | Suite < 2 min

Distribution Target (FLOORS — push higher where risk justifies):
  Unit:        ██████████████████████ 75%
  Integration: ██████                 20%
  Contract:    █                       2%
  E2E:         █                       3%

NOTE: All percentage targets are FLOORS, not ceilings.
High-risk / regulated modules should exceed these significantly.
The goal is to automate every testable behaviour.
```

## Checkpoint
- [ ] Unit test layer defined (scope, patterns, targets)
- [ ] Integration test layer defined (boundaries, approach, targets)
- [ ] Contract test decision made (include/skip with rationale)
- [ ] E2E journeys selected and confirmed by user
- [ ] Pyramid distribution targets set

## Exit Criteria
- All pyramid layers defined with scope, targets, and ownership
- User has confirmed E2E journey selection and contract approach
- Ready to select tooling

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.test-strategy:0.2.1:2026-09-01T09:06:28Z -->
