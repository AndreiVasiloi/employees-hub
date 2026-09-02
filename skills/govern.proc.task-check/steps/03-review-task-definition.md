# Step 3: Review Task Definition

## Objective

Review `task.md` for completeness, clarity, and quality of requirements.

## Entry Criteria

- Artifact checklist complete (Step 2)
- `task.md` exists in task folder

## Actions

### 3.1 Check Template Conformance

Verify `task.md` conforms to the canonical task structure from [flow.util.task-definition](../../flow.util.task-definition/templates/task.md):

- [ ] **Title**: Clear, specific, action-oriented
- [ ] **TOML Frontmatter**: Present with required fields (id, status, priority, tags)
- [ ] **Problem Statement**: Clear description of what problem this solves
- [ ] **Goals**: What success looks like
- [ ] **Non-Goals**: Explicit scope boundaries
- [ ] **Constraints**: Technical or business constraints

### 3.2 Review Problem & Goals

Evaluate clarity and specificity:

| Aspect | Question | Rating |
|--------|----------|--------|
| **Problem clarity** | Is the problem well-defined? | ✓ Clear / ⚠ Vague / ✗ Missing |
| **Goal specificity** | Are goals measurable/observable? | ✓ Clear / ⚠ Vague / ✗ Missing |
| **Scope boundaries** | Are non-goals explicit? | ✓ Clear / ⚠ Vague / ✗ Missing |
| **Constraints** | Are constraints documented? | ✓ Clear / ⚠ Vague / ✗ N/A |

### 3.3 Review Acceptance Criteria

Check that acceptance criteria are:
- [ ] **Observable**: Can be verified without subjective judgment
- [ ] **Testable**: Can be validated by automated or manual tests
- [ ] **Complete**: Cover all goals stated
- [ ] **Atomic**: Each criterion is independent

### 3.4 Review Tags

Per [task-tagging skill](../../../skills/task-tagging/):
- [ ] Tags present in frontmatter
- [ ] Required tags: domain, service/component, lifecycle/concern
- [ ] Tags match actual scope (not aspirational)
- [ ] No more than 8 tags

### 3.5 Record Findings

Document issues found:

```markdown
## Task Definition Findings

### Strengths
- 

### Issues
- 

### Tag Suggestions
- Missing: 
- Incorrect: 
```

## Discussion Point (Governed Mode)

**STOP**: Share task definition findings:
- "Task definition review complete. Key findings:"
- List strengths and issues
- "Shall I continue to technical plan review?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Score each aspect (Clear/Vague/Missing)
- If >2 aspects are "Missing" → Flag as major issue
- Record all findings and proceed to Step 4

## Exit Criteria

- [ ] Template conformance checked
- [ ] Problem, goals, non-goals evaluated
- [ ] Acceptance criteria validated
- [ ] Tags reviewed
- [ ] Findings documented

## Next Step

→ [04-review-technical-plan.md](./04-review-technical-plan.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-check:0.2.1:2026-09-02T06:10:56Z -->
