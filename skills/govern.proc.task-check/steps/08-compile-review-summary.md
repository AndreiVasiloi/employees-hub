# Step 8: Compile Review Summary

## Objective

Aggregate all findings from previous steps, provide a clear outcome with actionable recommendations, and commit the review summary to the task folder.

## Entry Criteria

- All review steps complete (Steps 1-7)
- Findings documented for each area

## Actions

### 8.1 Aggregate Findings

Compile findings from all review steps:

| Step | Area | Status | Key Issues |
|------|------|--------|------------|
| 2 | Structure | ✓ / ⚠ / ✗ | |
| 3 | Task Definition | ✓ / ⚠ / ✗ | |
| 4 | Technical Plan | ✓ / ⚠ / ✗ | |
| 5 | Standards Alignment | ✓ / ⚠ / ✗ | |
| 6 | Architecture & Tests | ✓ / ⚠ / ✗ | |
| 7 | Risks & Dependencies | ✓ / ⚠ / ✗ | |

### 8.2 Categorize Issues

Group issues by severity:

#### Critical (Blocks Implementation)
- Missing required artifacts
- Fundamental approach flaws
- Unresolved conflicts with decisions/PRDs

#### Major (Must Fix Before Implementation)
- Incomplete test inventory
- Missing acceptance criteria
- Unaddressed risks

#### Minor (Can Fix During Implementation)
- Documentation gaps
- Missing optional artifacts
- Style/formatting issues

### 8.3 Determine Outcome

Apply outcome criteria:

| Outcome | Criteria |
|---------|----------|
| **Ready** | No critical or major issues; minor issues only |
| **Ready w/ changes** | No critical issues; major issues are addressable quickly |
| **Rework** | Critical issues present; return to planning |

### 8.4 Create Recommendations

For each issue, provide actionable recommendation:

```markdown
### Recommendations

| # | Issue | Severity | Recommendation | Owner |
|---|-------|----------|----------------|-------|
| 1 | | Critical/Major/Minor | | |
| 2 | | Critical/Major/Minor | | |
```

### 8.5 Document Review Summary

Create `review/` folder and `task-planning-review.md` in the task folder:

```markdown
# Review Summary

**Task**: {TASK_ID}-<slug>
**Reviewer**: <name>
**Date**: <YYMMDD>

## Outcome: [Ready | Ready w/ changes | Rework]

### Summary
<2-3 sentence summary of review outcome>

### Strengths
- 
- 

### Issues Requiring Action
| # | Issue | Severity | Recommendation |
|---|-------|----------|----------------|
| 1 | | | |

### Suggested Links to Add
- 

## Next Steps
- [ ] <action 1>
- [ ] <action 2>
```

### 8.6 Commit and Push

Save the review summary to the task folder:

1. **Create folder**: `mkdir -p work/{stage}/{TASK_ID}-<slug>/review`
2. **Write file**: Save as `work/{stage}/{TASK_ID}-<slug>/review/task-planning-review.md`
3. **Stage**: `git add work/{stage}/{TASK_ID}-<slug>/review/task-planning-review.md`
4. **Commit**: `git commit -m "review({TASK_ID}): add task planning review - [Ready|Ready w/ changes|Rework]"`
5. **Push**: `git push`

## Discussion Point (Governed Mode)

**STOP**: Present review summary:
- "Review complete. **Outcome: [X]**"
- Summarize key findings
- List required actions before implementation
- "Ready to commit task-planning-review.md to the task folder?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Apply outcome criteria strictly
- If any critical issues → Rework
- If >3 major issues → Rework
- If 1-3 major issues → Ready w/ changes
- If only minor issues → Ready
- Write task-planning-review.md and commit automatically

## Exit Criteria

- [ ] All findings aggregated
- [ ] Issues categorized by severity
- [ ] Outcome determined and justified
- [ ] Recommendations documented with owners
- [ ] Next steps clear
- [ ] `review/` folder created
- [ ] `review/task-planning-review.md` committed to task folder

## Process Complete

Review session complete. The `review/task-planning-review.md` file:
- Is committed to the task folder for traceability
- Guides any required changes before implementation
- Is referenced when task moves to implementation

**Note**: This process does not modify task definition files (`task.md`, `plan.md`). All changes are recommendations for the task owner to implement.

## Links

- [docs/process/task-planning/](../../task-planning/) — For tasks requiring rework
- [docs/process/task-implementation/](../../task-implementation/) — For approved tasks
- [AGENTS.md](../../../../AGENTS.md) — Operating principles

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-check:0.2.1:2026-09-02T06:10:56Z -->
