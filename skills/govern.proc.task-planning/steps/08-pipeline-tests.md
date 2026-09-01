# Pipeline Tests

Define pipeline test requirements for comprehensive test coverage. Create interim artifact `work/08-pipeline-tests.md`.

## Entry Criteria

- [ ] Step 07 (Iterative Refinement) completed with technical implementation details
- [ ] `work/07-technical-approach.md` exists
- [ ] Architecture decisions documented

## Actions

### Smoke Tests

Happy-path validation that runs post-deployment.

Answer:
- [ ] Does this task add or modify API endpoints?
- [ ] What are the key happy-path scenarios to validate?
- [ ] What request/response patterns should smoke tests verify?

### Fuzz Tests

Negative scenario validation.

Answer:
- [ ] What reference data is needed for fuzz testing?
- [ ] Are there endpoints or response codes to exclude from fuzzing?
- [ ] Any special considerations?

### Integration Tests

E2E business flow validation.

Answer:
- [ ] Does this task introduce complex business flows needing E2E validation?
- [ ] What scenarios require multi-step API interactions?
- [ ] What test data setup is required?

### Create Interim Artifact

Write findings to `work/08-pipeline-tests.md`:

```markdown
# Pipeline Test Requirements

## Smoke Tests

| Endpoint | Method | Scenario | Expected |
|----------|--------|----------|----------|
| [endpoint] | [GET/POST] | [Happy path] | [200 OK] |

Or: "No smoke tests identified during planning. May arise during implementation."

## Fuzz Tests

- **Reference Data**: [Requirements or N/A]
- **Excluded Endpoints**: [List or none]
- **Special Config**: [Details or N/A]

Or: "No fuzz tests identified during planning."

## Integration Tests

| Scenario | Steps | Test Data | Expected |
|----------|-------|-----------|----------|
| [Flow name] | [Multi-step description] | [Setup required] | [Outcome] |

Or: "No integration tests identified during planning."
```

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Present pipeline test requirements:
  - "Smoke tests: [scenarios or N/A]"
  - "Fuzz tests: [config or N/A]"
  - "Integration tests: [scenarios or N/A]"
  - "Does this cover the key validation scenarios?"
- Wait for confirmation before continuing execution.

## 🤖 If DELEGATED Mode

- Apply the following heuristic
- If task adds/modifies endpoints → document smoke test scenarios
- If task has complex flows → document integration scenarios
- Mark as N/A if no API changes or simple CRUD
- Create `work/08-pipeline-tests.md` with findings
- Proceed to Step 9 after documenting

## Exit Criteria

- [ ] Smoke test requirements documented (or marked N/A)
- [ ] Fuzz test requirements documented (or marked N/A)
- [ ] Integration test requirements documented (or marked N/A)
- [ ] `work/08-pipeline-tests.md` created

## Next Step

→ [09-architectural-context.md](./09-architectural-context.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
