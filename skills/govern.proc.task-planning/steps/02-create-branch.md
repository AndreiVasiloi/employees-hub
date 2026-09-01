# Step 2: Create Planning Branch

## Objective

Create and checkout a planning branch for the task work.

## Entry Criteria

- Task is in `work/02-planning/{TASK_ID}-<slug>/`
- Move committed to main (Step 1 complete)

## Actions

### 2.1 Verify Current Branch

Check current branch is NOT `main`:
```bash
git branch --show-current
```

### 2.2 Create Branch

If on `main`, create and checkout planning branch:
```bash
git checkout -b plan/{TASK_ID}-<slug>
```

**Branch naming convention**: `plan/{TASK_ID}-<slug>`
- Example: `plan/0030-transaction-selection`

### 2.3 Confirm Branch

Verify you are on the correct planning branch before proceeding.

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Confirm branch creation:
  - "On main branch (Step 1 complete). Ready to begin planning."
- Wait for confirmation before continuing execution.

## 🤖 If DELEGATED Mode

- Apply the following heuristic
- Create branch without confirmation
- Use task folder slug for branch name
- Proceed to Step 3 immediately

## Exit Criteria

- [ ] On branch `plan/{TASK_ID}-<slug>`
- [ ] Not on `main` branch

## Next Step

→ [03-capture-problem.md](./03-capture-problem.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
