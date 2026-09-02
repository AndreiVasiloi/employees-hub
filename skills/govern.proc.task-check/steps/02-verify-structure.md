# Step 2: Verify Structure

## Objective

Verify all expected artifacts from the planning process exist in the task folder.

## Entry Criteria

- Task folder located (Step 1 complete)
- Task path confirmed

## Actions

### 2.1 Check Required Artifacts

The task-planning process produces these artifacts. Verify each exists:

| Artifact | Purpose | Required |
|----------|---------|----------|
| `task.md` | Task definition (problem, goals, acceptance criteria) | ✓ Yes |
| `plan.md` | Technical implementation plan | ✓ Yes |

### 2.2 Check Supporting Artifacts

These may exist depending on task complexity:

| Artifact | Purpose | Required |
|----------|---------|----------|
| `architecture-context.md` or diagram | Architectural context | Optional |
| `research-notes.md` | Technical research findings | Optional |
| `work/` subfolder | Planning session working files | Optional |

### 2.3 Create Artifact Checklist

Document what's present and what's missing:

```markdown
## Artifact Checklist

### Required
- [ ] task.md — Present / Missing
- [ ] plan.md — Present / Missing

### Optional
- [ ] Architecture diagram — Present / Missing / N/A
- [ ] Research notes — Present / Missing / N/A
- [ ] Working folder — Present / Missing / N/A
```

### 2.4 Assess Completeness

- **Complete**: All required artifacts present → Continue review
- **Incomplete**: Missing required artifacts → Flag for rework, may halt review

## Discussion Point (Governed Mode)

**STOP**: Report artifact status:
- "Task folder contains: [list artifacts found]"
- "Missing artifacts: [list if any]"
- If incomplete: "This task may need to return to planning. Continue review anyway?"

## Heuristic (Delegated Mode)

If in delegated mode:
- If `task.md` AND `plan.md` exist → Proceed to Step 3
- If either is missing → Mark task as "Rework" verdict early, but continue review to identify other issues
- Record missing artifacts in findings

## Exit Criteria

- [ ] Required artifacts checked (`task.md`, `plan.md`)
- [ ] Optional artifacts noted
- [ ] Completeness assessment recorded
- [ ] Decision made: continue review or flag for rework

## Next Step

→ [03-review-task-definition.md](./03-review-task-definition.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-check:0.2.1:2026-09-02T06:10:56Z -->
