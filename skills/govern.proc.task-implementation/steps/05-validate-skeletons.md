# Step 5: Validate Skeletons

## Objective

Write ALL test skeletons and verify they fail, ensuring the test framework is properly set up before implementation begins.

## Entry Criteria

- Test inventory approved (Step 4 complete)
- Implementation strategy planned
- Ready to begin TDD cycle

## Actions

### 5.1 Create ALL Test Skeletons

For every test in the approved inventory, create a skeleton file:

**Skeleton Structure:**
```java
// Example for Java
@Test
public void test_{function_name}_{scenario}() {
    // TODO: Implement test based on acceptance criteria
    // Given: {precondition}
    // When: {action}
    // Then: {expected outcome}
    fail("Test skeleton - not implemented");
}
```

**Skeleton Requirements:**
- One skeleton per test in inventory
- Clear test name indicating scenario
- Comments describing Given/When/Then
- Must call `fail()` or equivalent to ensure failure
- Follow language-specific testing conventions

### 5.2 Add Minimal Test Dependencies

Add only the dependencies needed to run the test skeletons:
- Test framework (JUnit, pytest, etc.)
- Assertion library
- Test utilities or helpers
- DO NOT add implementation dependencies yet

### 5.3 Run All Skeletons

Execute the complete test suite:
- Run ALL tests (not just new skeletons)
- Verify ALL new test skeletons fail
- Verify existing tests still pass
- No compilation errors or missing dependencies

### 5.4 Commit Failing Skeletons

Create a commit with all failing skeletons:
```
test(impl): add failing test skeletons for {TASK_ID}

Added {X} test skeletons covering:
- Unit tests: {count}
- Integration tests: {count}  
- API tests: {count}

All skeletons fail as expected before implementation

Task: {TASK_ID}
```

### 5.5 Verify Test Infrastructure

Confirm the testing setup is complete:
- Test runner can find and execute all new tests
- Test reports show expected failures
- CI system can run the test suite
- No configuration issues with test framework

## Discussion Point (Governed Mode)

**STOP**: Confirm skeleton validation:
- "I've created {X} test skeletons for {TASK_ID}"
- "All skeletons fail as expected: ✓"
- "Existing tests still pass: ✓"
- "Test infrastructure verified: ✓"
- "Ready to begin implementation loop?"
- Wait for confirmation before proceeding

## Heuristic (Delegated Mode)

If in delegated mode:
- Auto-generate ALL test skeletons based on inventory
- Add minimal test dependencies automatically
- Auto-run and verify all skeletons fail
- Auto-commit failing skeletons
- Proceed to Step 6 after validation complete

## Exit Criteria

- [ ] ALL test skeletons created from inventory
- [ ] Minimal test dependencies added
- [ ] ALL new test skeletons fail (red)
- [ ] Existing tests still pass
- [ ] Test infrastructure verified
- [ ] Failing skeletons committed to version control

## Next Step

→ [06-implementation-loop.md](./06-implementation-loop.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-implementation:0.2.2:2026-09-02T06:10:56Z -->
