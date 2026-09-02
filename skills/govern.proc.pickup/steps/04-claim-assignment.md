# Step 4: Claim Assignment

## Objective

Atomically claim the task by updating `assignments.toml` and pushing to main. Handle race conditions if another developer claims the task simultaneously.

## Entry Criteria

- Task available (assignment field is empty)
- User's git email retrieved

## Actions

### 4.1 Update assignments.toml

Update the relevant field with the user's git email:

**For pending-planning tasks:**
```toml
planning = "developer@example.com"
implementation = ""
```

**For pending-implementation tasks:**
```toml
planning = "planner@example.com"  # May already have a value
implementation = "developer@example.com"
```

### 4.2 Stage the Assignment File

```bash
git add <task-folder>/assignments.toml
```

### 4.3 Commit the Assignment

```bash
git commit -m "chore: assign <task-number> <explore/implementation> to <email>"
```

**Example:**
```bash
git commit -m "chore: assign 0044 implementation to developer@example.com"
```

### 4.4 Push to Main (Atomic Claim)

```bash
git push origin main
```

This is the critical atomic operation. Only one developer can successfully push at a time.

### 4.5 Handle Push Conflict

If push fails with a conflict:

```bash
# Fetch latest to see what changed
git fetch origin main

# Check the remote assignments.toml
git show origin/main:<task-folder>/assignments.toml
```

**Determine conflict cause:**

1. **Another developer claimed the same task:**
   - The remote `assignments.toml` now has a value in the field you were trying to claim

2. **Unrelated conflict:**
   - Other files changed, or the assignments.toml changed for a different reason

### 4.6 Handle Race Condition (Someone Else Won)

If another developer claimed the task:

```
⚠️ Task <task-number> was just claimed by another developer.

**Task:** <task-folder-name>
**Claimed by:** <winning-developer-email>
**For:** <explore/implementation> work

You were beaten to this task by a few seconds. Run `govern.proc.next` to find another task to pick up.
```

Then reset local state:
```bash
git reset --hard origin/main
```

### 4.7 Handle Other Conflicts

If the conflict is unrelated to the assignment:

```
⚠️ Push failed due to upstream changes (not assignment-related).

Attempting to rebase and retry...
```

```bash
git pull --rebase origin main
git push origin main
```

If rebase fails, provide manual resolution instructions.

## Discussion Point (Governed Mode)

**STOP if push fails and cannot be automatically resolved:**
- Explain what happened
- Provide manual resolution steps
- Suggest trying again after resolution

## Heuristic (Delegated Mode)

- If push succeeds: Proceed to Step 5
- If push fails due to assignment conflict: Stop with "claimed by" message
- If push fails for other reasons: Attempt rebase, retry once
- If retry fails: Stop with manual resolution instructions

## Exit Criteria

- [ ] `assignments.toml` updated with user's email
- [ ] Change committed to local main
- [ ] Change pushed to origin/main successfully

## Next Step

→ [05-move-task.md](./05-move-task.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.pickup:0.1.3:2026-09-02T12:19:11Z -->
