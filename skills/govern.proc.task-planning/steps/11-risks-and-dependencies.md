# Risks and Dependencies

Technical risk assessment, dependencies, and validation. Create interim artifact `work/11-risks.md`.

## Entry Criteria

- [ ] Step 10 (Acceptance Criteria) completed with comprehensive criteria
- [ ] `work/10-acceptance-criteria.md` exists
- [ ] All dependencies identified from research

## Actions

### Assess Risks

Evaluate risk categories:
- **Security**: Authentication, authorization, data exposure
- **Performance**: Response times, throughput, scalability
- **Data Model**: Schema changes, migrations, compatibility
- **UX**: User experience impacts
- **Operations**: Deployment, monitoring, maintenance
- **Dependencies**: External services, libraries, teams

### Document Dependencies

Identify:
- **Blocking**: Tasks that must complete before this one
- **Dependent**: Tasks that depend on this one
- **Related**: Tasks with shared context

### Validate Against Research

Cross-reference with `work/05-research.md`:
- Verify no conflicts with existing decisions
- Confirm dependencies align with related tasks
- Flag any gaps or stale references

### Create Interim Artifact

Write findings to `work/11-risks.md`:

```markdown
# Risks and Dependencies

## Risk Assessment

| Risk | Category | Likelihood | Impact | Mitigation |
|------|----------|------------|--------|------------|
| [Risk 1] | [Category] | [High/Medium/Low] | [High/Medium/Low] | [Strategy] |
| [Risk 2] | [Category] | [High/Medium/Low] | [High/Medium/Low] | [Strategy] |

## Dependencies

### Blocking (must complete first)
- [ ] [Task ID]: [Why blocking]

### Dependent (depends on this task)
- [ ] [Task ID]: [Why dependent]

### Related (shared context)
- [ ] [Task ID]: [Relationship]

## Validation Against Research

- [ ] No conflicts with existing decisions
- [ ] Dependencies align with related tasks
- [ ] No gaps or stale references

### Conflicts/Gaps Found
| Issue | Description | Resolution |
|-------|-------------|------------|
| [Issue] | [Details] | [How to resolve] |
```

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Present risks and dependencies:
  - "Risks identified: [list with likelihood/impact]"
  - "Dependencies: [blocking, dependent, related]"
  - "Validation against Step 5: [pass/conflicts]"

**STOP and ask user** if:
- Conflicting decisions found
- Ambiguous decisions affect this task
- Gaps need clarification
- Stale references found

Wait for confirmation before continuing execution.

## 🤖 If DELEGATED Mode

- Apply the following heuristic
- Assess all risk categories, mark N/A if not applicable
- Extract dependencies from `work/05-research.md`
- Validate against research automatically
- Create `work/11-risks.md` with findings
- Only stop for true conflicts requiring user input
- Proceed to Step 12 after assessment complete

## Exit Criteria

- [ ] Risk assessment completed for all categories
- [ ] Mitigation strategies documented
- [ ] Dependencies identified and categorized
- [ ] Conflicts resolved or documented
- [ ] `work/11-risks.md` created

## Next Step

→ [12-sequencing-and-scope.md](./12-sequencing-and-scope.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
