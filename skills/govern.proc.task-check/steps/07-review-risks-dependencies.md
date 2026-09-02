# Step 7: Review Risks and Dependencies

## Objective

Assess risk identification, dependency documentation, and adjacent task awareness.

## Entry Criteria

- Architecture and tests reviewed (Step 6 complete)
- Access to working folder for adjacent tasks

## Actions

### 7.1 Review Risk Assessment

Check that risks are properly identified:

- [ ] **Technical risks**: Implementation challenges documented
- [ ] **Integration risks**: External dependency risks noted
- [ ] **Timeline risks**: Effort estimation risks considered
- [ ] **Mitigation strategies**: Each risk has a mitigation plan

**Risk assessment:**
```markdown
### Risk Review
- Risks documented: Yes / Partial / No
- Mitigation plans: Present / Missing
- Unidentified risks (reviewer-spotted):
  - 
```

### 7.2 Review Dependencies

Check dependency documentation:

#### Upstream Dependencies
- [ ] Prerequisites identified (what must be done first)
- [ ] Blocking tasks documented
- [ ] External service dependencies noted

#### Downstream Dependencies
- [ ] Tasks that depend on this one identified
- [ ] Impact on other work understood

#### External Dependencies
- [ ] Third-party services/APIs documented
- [ ] Version requirements explicit
- [ ] Availability/reliability considered

### 7.3 Review Adjacent Tasks

Check context from neighboring tasks:

1. **Identify neighbors**: List tasks in same workflow stage (3 before, 3 after by ID)
2. **Check for conflicts**: Overlapping scope or contradictory approaches
3. **Identify synergies**: Shared code, similar patterns
4. **Cross-link**: Ensure relevant neighbors are referenced

**Adjacent tasks:**
```markdown
### Adjacent Tasks Context
- Neighbors checked: [list IDs]
- Conflicts found: None / [describe]
- Synergies identified: None / [describe]
- Cross-links needed: None / [list]
```

### 7.4 Review Sequencing

Check implementation sequencing:

- [ ] Phase order is logical
- [ ] Dependencies respected in sequencing
- [ ] Parallel work opportunities identified
- [ ] Critical path clear

### 7.5 Record Findings

```markdown
## Risks & Dependencies Findings

### Risk Assessment
- Quality:
- Gaps:
- Unidentified risks:

### Dependencies
- Upstream:
- Downstream:
- External:
- Issues:

### Adjacent Tasks
- Conflicts:
- Synergies:
- Missing links:

### Sequencing
- Status:
- Issues:
```

## Discussion Point (Governed Mode)

**STOP**: Share risks and dependencies findings:
- "Risks and dependencies review complete."
- Highlight any unidentified risks
- "Ready to compile final verdict?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Flag missing risk documentation as issue
- Note missing dependency documentation
- Proceed to Step 8

## Exit Criteria

- [ ] Risk assessment reviewed
- [ ] Dependencies documented and validated
- [ ] Adjacent tasks checked for conflicts/synergies
- [ ] Sequencing validated
- [ ] Findings documented

## Next Step

→ [08-compile-review-summary.md](./08-compile-review-summary.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-check:0.2.1:2026-09-02T06:10:56Z -->
