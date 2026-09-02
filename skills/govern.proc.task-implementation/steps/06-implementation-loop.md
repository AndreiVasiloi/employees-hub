# Step 6: Implementation Loop

## Objective

Execute the core TDD cycle for ONE test: select the best next test, implement minimal code to make it pass, then proceed through Steps 7-8 for that test before returning here for the next test.

## Loop Structure

**This step is part of a per-test loop:**
```
For each test in inventory:
  → Step 6: Select test & implement
  → Step 7: Verify integration  
  → Step 8: Validate quality
  → Return to Step 6 for next test

When all tests complete:
  → Step 9: Finalize implementation
```

## Entry Criteria

- All test skeletons written and confirmed failing (Step 5 complete)
- Test infrastructure verified
- Tests remaining in inventory to implement

## Actions

### 6.1 Select Next Test

Choose ONE test from the inventory to implement:
- Prioritize based on implementation strategy from Step 4
- Usually start with core functionality tests
- Follow dependency order (prerequisites first)

### 6.2 Make Test Pass (Red → Green)

**Add only the implementation dependencies needed** for this specific test:
- Add library dependencies if required
- Create new classes/methods as needed
- Implement minimal code to satisfy the test assertions
- DO NOT add extra features or optimizations

**Implementation Guidelines:**
- Write the simplest code that makes the test pass
- Follow existing code patterns and conventions
- Keep changes small and focused (<300 lines per iteration)
- Add inline comments for complex logic

### 6.3 Run Local Validation

Execute tests to verify the implementation:
- Run the specific test: must pass (green)
- Run ALL tests: must all pass (no regressions)
- Run linting/format checks: must be clean
- Run build: must succeed

### 6.4 Integration Checkpoint

After making a test pass, verify the implementation actually integrates:

**Re-read the Architectural Context diagram** in `task.md`
**Check each integration point** from the diagram:
- If diagram shows "consumes event X" → Is there actual Kafka listener code? Not just a mock?
- If diagram shows "publishes event Y" → Is there actual Kafka producer code? Not just a stub?
- If diagram shows "calls API Z" → Is there actual HTTP client code? Not just an interface?
- If diagram shows "persists to DB" → Is there actual repository implementation? Not just in-memory?

**Verify real dependencies are wired:**
- Spring beans configured for actual infrastructure (Kafka, Redis, MongoDB, etc.)
- Configuration properties defined for real endpoints
- Integration tests use real containers (Testcontainers) not just mocks

**If implementation is stub-only:** Flag to user — "This test passes but implementation is not integrated. Should I: a) Add integration test that requires real infrastructure? b) Implement actual integration code? c) Document this as intentional (e.g., interface-only for now)?"

### 6.5 Commit Implementation

Create a focused commit for the implementation:
```
feat(impl): implement {feature_description} for {TASK_ID}

- Add {class/method/function} to satisfy test {test_name}
- Wire real integration for {integration_point}
- Configure {infrastructure_component}

Fixes #{test_number} in test inventory

Task: {TASK_ID}
```

### 6.6 Decision Logging (if applicable)

If this implementation involves any of the following, log decisions in `decisions.md`:
- Security-sensitive flow changes (with reasoning and risks)
- Schema migrations (with reasoning and risks)
- API changes (with reasoning and risks)

## Discussion Point (Governed Mode)

**STOP** after implementation:
- "I've implemented {feature} to make test {test_name} pass"
- "All tests pass: ✓, Build succeeds: ✓"
- "Commit message: {show commit message}"
- "Proceeding to integration verification (Step 7)"
- Wait for confirmation before continuing

## Heuristic (Delegated Mode)

If in delegated mode:
- Select next test based on inventory priority
- Implement minimal code using established patterns
- Auto-run local validation (tests, lint, build)
- Auto-commit with conventional format
- Auto-log decisions for sensitive changes
- Proceed to Step 7 automatically

## Exit Criteria (for this test)

- [ ] ONE test selected from inventory
- [ ] Implementation complete and test passes (green)
- [ ] Full test suite passes (no regressions)
- [ ] Linting clean, build succeeds
- [ ] Changes committed with conventional message
- [ ] Decision log updated if sensitive changes

## Next Step

→ [07-verify-integration.md](./07-verify-integration.md) — Verify integration for this test

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-implementation:0.2.2:2026-09-02T06:10:56Z -->
