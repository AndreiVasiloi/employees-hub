# Acceptance Criteria

Define testable, bullet-point outcomes that define when the task is complete. Create interim artifact `work/10-acceptance-criteria.md`.

## Entry Criteria

- [ ] Step 09 (Architectural Context) completed with diagram and boundaries
- [ ] `work/09-architecture.md` exists
- [ ] Test requirements identified

## Actions

### Write Testable Criteria

Each acceptance criterion must be:
- **Verifiable**: Can be tested (pass/fail)
- **Specific**: Clear what "done" means
- **Implementation-agnostic**: Describes "what", not "how"

### Link to Epic Criteria

If task is part of an epic:
- Reference which epic acceptance criteria this task addresses
- Use format: `Addresses Epic AC: <epic-id> AC<n>`

### Ensure Coverage

Verify acceptance criteria cover:
- Happy path scenarios
- Error handling scenarios
- Edge cases identified during refinement
- Integration points

### Avoid Common Mistakes

❌ **Bad**: "System handles errors gracefully"
✅ **Good**: "System returns 400 Bad Request with error code `INVALID_AMOUNT` when amount is negative"

❌ **Bad**: "Performance is acceptable"
✅ **Good**: "Batch processing completes within 5 minutes for 10,000 transactions"

### Create Interim Artifact

Write findings to `work/10-acceptance-criteria.md`:

```markdown
# Acceptance Criteria

## Epic Link
Addresses Epic AC: [epic-id] AC[n] (if applicable)

## Happy Path Criteria
- [ ] AC1: [Testable outcome]
- [ ] AC2: [Testable outcome]

## Error Handling Criteria
- [ ] AC3: [Error scenario] returns [expected response]
- [ ] AC4: [Error scenario] returns [expected response]

## Edge Case Criteria
- [ ] AC5: [Edge case] behaves as [expected]

## Integration Criteria
- [ ] AC6: [Integration point] [expected behavior]
```

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Present acceptance criteria:
  - "I've defined [N] acceptance criteria:"
  - [List criteria]
  - "Are these testable and complete?"
- Wait for confirmation before continuing execution.

## 🤖 If DELEGATED Mode

- Apply the following heuristic
- Derive criteria from goals in `work/04-goals.md`
- Add error handling criteria for each integration point
- Include at least one criterion per major feature
- Create `work/10-acceptance-criteria.md` with findings
- Proceed to Step 11 after criteria defined

## Exit Criteria

- [ ] All acceptance criteria are testable (pass/fail)
- [ ] Criteria are implementation-agnostic
- [ ] Epic criteria linked (if applicable)
- [ ] Coverage includes happy path, errors, edge cases
- [ ] `work/10-acceptance-criteria.md` created

## Next Step

→ [11-risks-and-dependencies.md](./11-risks-and-dependencies.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
