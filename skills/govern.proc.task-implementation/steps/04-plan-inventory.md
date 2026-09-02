# Step 4: Plan Inventory

## Objective

Create a comprehensive test inventory from acceptance criteria and plan the implementation strategy.

## Entry Criteria

- Context loaded and understood (Step 3 complete)
- Dependencies verified as unblocked
- Integration points identified

## Actions

### 4.1 Build Test Inventory

From the task's acceptance criteria, create a complete inventory of ALL tests needed:

**Test Categories to Include:**
- **Unit tests**: For each new function, method, or class
- **Integration tests**: For each integration point identified in Step 3
- **API tests**: For each endpoint or external interface
- **Event tests**: For each event consumed or published
- **Error handling tests**: For each error condition or edge case
- **Pipeline tests**: CATS smoke/fuzz, Karate tests (if required)

**Test Inventory Format:**
```
## Test Inventory for {TASK_ID}

### Unit Tests
- [ ] Test {function_name}_{scenario} — {description}
- [ ] Test {class_name}_{method}_{scenario} — {description}

### Integration Tests  
- [ ] Test {integration_point}_{scenario} — {description}
- [ ] Test {event_flow}_{scenario} — {description}

### API Tests
- [ ] Test {endpoint}_{method}_{scenario} — {description}

### Pipeline Tests
- [ ] CATS smoke test for {service}
- [ ] Karate test for {feature} (if applicable)
```

### 4.2 Check Pipeline Test Requirements

Based on task planning artifacts, repository docs, and CI configuration:
- Verify CATS tests are specified if service changes
- Verify Karate tests are specified if API changes
- Ensure required repos (xelerator_cats, xelerator_tests) are present
- Note any special test setup requirements

### 4.3 Plan Implementation Strategy

Create a high-level implementation approach:
- **Order of implementation**: Which tests to implement first (usually core functionality first)
- **Integration approach**: How to handle each integration point
- **Data model changes**: Any schema or data structure changes needed
- **Configuration changes**: Any new config properties or environment changes

### 4.4 Verify Inventory Completeness

Review the test inventory against acceptance criteria:
- Does each acceptance criterion have corresponding tests?
- Are all integration points covered?
- Are all error conditions tested?
- Are pipeline tests included if required?

## Discussion Point (Governed Mode)

**STOP**: Present test inventory and strategy:
- "I've created a test inventory for {TASK_ID} with {X} tests:"
- "Unit tests: {count}, Integration tests: {count}, API tests: {count}"
- "Pipeline tests required: {CATS/Karate/none}"
- "Implementation strategy: {brief approach}"
- "Does this inventory cover all acceptance criteria?"
- Wait for user approval before proceeding

## Heuristic (Delegated Mode)

If in delegated mode:
- Auto-generate test inventory from acceptance criteria using patterns
- Auto-include pipeline tests based on task type and component
- Auto-verify inventory completeness against task scope
- Create implementation strategy based on architectural context
- Proceed to Step 5 after inventory created

## Exit Criteria

- [ ] Complete test inventory created from acceptance criteria
- [ ] Pipeline test requirements identified and verified
- [ ] Implementation strategy planned
- [ ] Inventory completeness verified against acceptance criteria
- [ ] User approval received (governed) or heuristic applied (delegated)

## Next Step

→ [05-validate-skeletons.md](./05-validate-skeletons.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-implementation:0.2.2:2026-09-02T06:10:56Z -->
