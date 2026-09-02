# Step 1: Locate Task

## Objective

Find the task folder to review and verify it's in a reviewable workflow state.

## Entry Criteria

- Task ID or path provided by user
- Review session initiated with trigger phrase

## Actions

### 1.1 Identify Task Folder

Locate the task folder in the workflow directory:

```
work/03-pending-implementation/{TASK_ID}-<slug>/
```

**Valid locations for review:**
- `work/03-pending-implementation/` — Tasks ready for implementation (primary review target)
- `work/04-implementing/` — Tasks in progress (re-review if needed)

### 1.2 Verify Workflow Stage

Check that the task is in a reviewable state:
- **✓ Reviewable**: `03-pending-implementation`, `04-implementing`
- **✗ Not reviewable**: `01-pending-planning`, `02-planning` (planning not complete)
- **✗ Not reviewable**: `05-pending-release`, `06-released` (already in release flow or released)

### 1.3 Record Task Metadata

Capture basic information:
- **Task ID**: `{TASK_ID}`
- **Task slug**: `<slug>`
- **Full path**: `work/{stage}/{TASK_ID}-<slug>/`
- **Current stage**: `03-pending-implementation` | `04-implementing`

## Discussion Point (Governed Mode)

**STOP**: Confirm task location with user:
- "I found task `{TASK_ID}` at `work/03-pending-implementation/{TASK_ID}-<slug>/`"
- "This task is ready for review. Shall I proceed?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Accept task ID from trigger phrase if provided
- Search `03-pending-implementation/` first, then `04-implementing/`
- If task not found, report error and halt
- Proceed to Step 2 after task located

## Exit Criteria

- [ ] Task folder located
- [ ] Task is in reviewable workflow stage
- [ ] Task path recorded for subsequent steps

## Next Step

→ [02-verify-structure.md](./02-verify-structure.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-check:0.2.1:2026-09-02T06:10:56Z -->
