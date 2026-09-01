# Step 5: Test Data and Environment Strategy

## Entry Criteria
- Tooling selected from Step 4
- Integration boundaries known from Step 3

## Actions

### Action 1: Define Test Data Strategy

**Agent proposes test data approach per pyramid layer:**

**Unit Tests — Factories and Builders:**
- Use test data factories (e.g., Builder pattern, Object Mother, Faker libraries)
- No shared state between tests
- Each test creates its own data, asserts its own results
- No reliance on external data sources

**Integration Tests — Managed Test Data:**
- Database tests: seed → test → rollback (transaction rollback or truncation per test)
- API stub tests: fixture files or inline response definitions
- Message queue tests: test-specific payloads

**E2E Tests — Realistic Test Data:**
- Production-like data sampling (anonymised, never real customer data)
- Dedicated test accounts and personas
- Test data seeding scripts that are version-controlled
- Cleanup strategy: tests clean up after themselves or use isolated environments

**Test data management rules:**
- ✅ Version-control all test fixtures and seed scripts
- ✅ Use factories over hard-coded literals
- ✅ Anonymise any production-derived data
- ❌ Never use real customer data in tests
- ❌ Never depend on manually-created data that isn't in source control

**STOP — AskUserQuestion:**

```
Question TS-8
  Header:      "Test data constraints"
  Question:    "Are there specific data constraints I should account for in
                the test data strategy?"
  Multi-select: Yes
  Options:
    - PII / GDPR constraints        — Test data must not contain personal data; anonymisation required
    - Complex domain data            — Domain entities are complex; we need realistic seed scenarios
    - Third-party data dependencies  — Some data comes from external sources we can't easily replicate
    - No special constraints         — Standard test data approach is fine
```

### Action 2: Define Test Environment Topology

**Agent proposes environment strategy:**

| Environment | Purpose | Data | Who Uses It | Infra |
|-------------|---------|------|-------------|-------|
| **Local / Developer** | Unit + narrow integration tests | In-memory / Testcontainers | Individual developer | Developer machine |
| **CI Pipeline** | Unit + integration + contract tests | Ephemeral containers | Automated on every PR | CI runner (e.g., GitHub Actions) |
| **Staging / QA** | E2E + performance + security tests | Production-like seed data | QA, automated E2E suite | Cloud environment (mirrors prod) |
| **Production** | Smoke tests + monitoring | Real production data | Automated post-deploy checks | Production infrastructure |

**Environment isolation rules:**
- Each PR gets isolated test execution (no shared mutable state between PRs)
- Staging environment is refreshed regularly from anonymised production snapshots
- E2E tests never run against production (except post-deploy smoke tests)
- Performance tests run in a dedicated environment to avoid noisy-neighbour effects

**STOP — AskUserQuestion:**

```
Question TS-9
  Header:      "Environment and infrastructure"
  Question:    "What CI/CD platform and infrastructure will be used for
                test execution? This affects environment strategy."
  Multi-select: No
  Options:
    - GitHub Actions                — Standard cloud CI; ephemeral runners
    - GitLab CI/CD                  — GitLab runners; container-based
    - Azure DevOps / AWS CodePipeline — Cloud-native CI/CD
    - Not yet decided               — I'll define the environment topology generically for now
```

### Action 3: Present Combined Data & Environment Summary

```
Test Data & Environment Strategy:

Data Strategy:
  Unit:        Factories + builders (in-memory, no shared state)
  Integration: Seed + rollback per test (Testcontainers / in-memory DB)
  E2E:         Version-controlled seed scripts + dedicated test accounts
  Constraints: [from user responses]

Environment Topology:
  Local:    Unit + integration (developer machine)
  CI:       Unit + integration + contract (ephemeral, per PR)
  Staging:  E2E + performance + security (production-like)
  Prod:     Smoke tests only (post-deploy)

CI Platform: [from user response or TBD]
```

## Checkpoint
- [ ] Test data strategy defined per layer
- [ ] Data constraints captured from user
- [ ] Environment topology defined
- [ ] CI/CD platform identified or noted as TBD

## Exit Criteria
- Data and environment strategies are complete
- Ready to define CI/CD quality gates

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.test-strategy:0.2.1:2026-09-01T09:06:28Z -->
