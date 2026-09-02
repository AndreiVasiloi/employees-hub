# Step 4: Review Technical Plan

## Objective

Review `plan.md` for technical completeness, feasibility, and implementation readiness.

## Entry Criteria

- Task definition reviewed (Step 3 complete)
- `plan.md` exists in task folder

## Actions

### 4.1 Check Plan Template Conformance

Verify `plan.md` conforms to the canonical structure produced by [Create Technical Plan](../../govern.proc.task-planning/steps/13-create-technical-plan.md):

- [ ] **Technical Approach**: Clear description of implementation approach
- [ ] **Component Changes**: Files/modules to be modified or created
- [ ] **Test Inventory**: Comprehensive test list (unit, integration, e2e)
- [ ] **Implementation Phases**: Ordered steps with dependencies
- [ ] **Sizing/Estimates**: Complexity assessment present

### 4.2 Review Technical Approach

Evaluate the implementation strategy:

| Aspect | Question | Rating |
|--------|----------|--------|
| **Clarity** | Is the approach understandable? | ✓ Clear / ⚠ Vague / ✗ Missing |
| **Feasibility** | Is this technically achievable? | ✓ Yes / ⚠ Concerns / ✗ Unrealistic |
| **Completeness** | Are all aspects covered? | ✓ Complete / ⚠ Gaps / ✗ Incomplete |
| **Alternatives** | Were alternatives considered? | ✓ Yes / ⚠ Limited / ✗ No |

### 4.3 Review Test Inventory

Check that tests are comprehensive:

- [ ] **Unit tests**: Core logic covered
- [ ] **Integration tests**: Component interactions tested
- [ ] **Contract tests**: API contracts verified (if applicable)
- [ ] **E2E tests**: Critical paths covered
- [ ] **Edge cases**: Error handling, boundary conditions

**TDD Principle**: Test inventory should drive implementation, not follow it.

### 4.4 Review Implementation Phases

Check phase structure:

- [ ] Phases are ordered logically
- [ ] Dependencies between phases are explicit
- [ ] Each phase produces verifiable output
- [ ] Phases are appropriately sized (not too large)

### 4.5 Review Sizing

Check complexity assessment:

- [ ] Sizing present (S/M/L or points)
- [ ] Sizing rationale documented
- [ ] Sizing aligns with phase breakdown

### 4.6 Record Findings

```markdown
## Technical Plan Findings

### Strengths
- 

### Issues
- 

### Test Coverage Concerns
- 

### Phase/Sizing Concerns
- 
```

## Discussion Point (Governed Mode)

**STOP**: Share technical plan findings:
- "Technical plan review complete. Key findings:"
- Highlight any feasibility concerns
- "Shall I continue to standards alignment check?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Flag missing test inventory as major issue
- Flag missing phases as major issue
- Score overall plan quality and proceed to Step 5

## Exit Criteria

- [ ] Plan template conformance checked
- [ ] Technical approach evaluated
- [ ] Test inventory reviewed
- [ ] Implementation phases validated
- [ ] Sizing reviewed
- [ ] Findings documented

## Next Step

→ [05-check-standards-alignment.md](./05-check-standards-alignment.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-check:0.2.1:2026-09-02T06:10:56Z -->
