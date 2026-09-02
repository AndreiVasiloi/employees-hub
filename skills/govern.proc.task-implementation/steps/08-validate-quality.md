# Step 8: Validate Quality

## Objective

Run quality validation for the CURRENT test implementation, then determine whether to loop back for more tests or proceed to finalization.

## Loop Context

**This step is part of a per-test loop:**
```
For each test in inventory:
  → Step 6: Select test & implement
  → Step 7: Verify integration
  → Step 8: Validate quality (YOU ARE HERE)
  → Return to Step 6 for next test

When all tests complete:
  → Step 9: Finalize implementation
```

## Entry Criteria

- Integration verification complete for current test (Step 7 complete)
- Current test's integration points verified
- Ready for quality validation

## Actions

### 8.1 Full CI Validation

Run the complete CI pipeline locally:
```bash
# Example for Maven
mvn clean verify

# Example for other build systems
<build-command> --full-test-suite
```

**Validation Requirements:**
- **ALL tests pass** (not just current task tests)
- No compilation errors or warnings
- No linting or formatting violations
- Build succeeds completely
- Code coverage meets requirements (if applicable)

### 8.2 Pipeline Test Validation (if required)

If the task has Pipeline Test Requirements from Step 4:

**CATS Tests:**
- Ensure xelerator_cats repository is available
- Start local service if needed
- Run CATS smoke tests against local service
- Run CATS fuzz tests if specified
- Verify all CATS tests pass

**Karate Tests:**
- Ensure xelerator_tests repository is available
- Start local service if needed
- Run Karate feature tests
- Verify all Karate tests pass

**Note:** Local validation is for confidence; pipeline is final authority.

### 8.3 Performance and Security Checks

Run additional quality checks if applicable:
- Performance tests for critical paths
- Security scans for sensitive changes
- Dependency vulnerability scans
- Memory leak checks for long-running processes

### 8.4 Documentation Validation

Verify all documentation is updated:
- README files updated for new features
- API documentation updated (Swagger/OpenAPI)
- Inline code comments for complex logic
- Architecture diagrams updated if changed
- Decision log complete for all sensitive changes

### 8.5 Final Quality Gate Checklist

Complete the quality gate verification:
```
## Quality Gate Validation for {TASK_ID}

### Code Quality
- [✓/✗] All tests pass (full suite)
- [✓/✗] No linting errors
- [✓/✗] Build succeeds
- [✓/✗] Code coverage meets requirements

### Pipeline Tests
- [✓/✗] CATS tests pass (if required)
- [✓/✗] Karate tests pass (if required)
- [✓/✗] Local validation successful

### Integration
- [✓/✗] All integration points verified
- [✓/✗] Real infrastructure connections
- [✓/✗] Integration tests pass

### Documentation
- [✓/✗] README updated
- [✓/✗] API documentation updated
- [✓/✗] Decision log complete
- [✓/✗] Inline comments added

### Security
- [✓/✗] No hardcoded secrets
- [✓/✗] Security changes documented
- [✓/✗] Vulnerability scan clean
```

### 8.6 Address Quality Issues

If any quality gates fail:
- Fix the issues systematically
- Re-run validation after fixes
- Document any temporary exceptions with justification
- Ensure no critical issues remain

## Discussion Point (Governed Mode)

**STOP**: Present quality validation results:
- "Quality validation complete for {TASK_ID}:"
- "Full test suite: ✓/✗ ({X} tests passed)"
- "Pipeline tests: ✓/✗ (CATS: {status}, Karate: {status})"
- "Quality gates: {X}/{Y} passed"
- "Any issues to address before completion?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Auto-run full CI validation
- Auto-validate pipeline tests if required
- Auto-check documentation completeness
- Auto-verify quality gates
- Auto-fix simple issues (formatting, linting)
- Flag complex issues for user review
- Proceed to Step 9 if all quality gates pass

## Exit Criteria (for this test)

- [ ] Full test suite passing (ALL tests, not just current)
- [ ] No linting errors or formatting issues
- [ ] Build succeeds completely
- [ ] Pipeline tests validated locally (if required)
- [ ] Quality gates satisfied for this iteration

## Next Step Decision

**Check remaining tests in inventory:**

→ **If MORE tests remain**: Return to [06-implementation-loop.md](./06-implementation-loop.md) — Select next test

→ **If ALL tests complete**: Proceed to [09-complete-task.md](./09-complete-task.md) — Finalize implementation

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-implementation:0.2.2:2026-09-02T06:10:56Z -->
