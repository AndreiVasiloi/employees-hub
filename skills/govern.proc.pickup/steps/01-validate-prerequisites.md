# Step 1: Validate Prerequisites

## Objective

Ensure the repository is on the `main` branch and synchronized with upstream before attempting to pick up a task.

## Entry Criteria

- Developer has provided a task number to pick up

## Actions

### 1.1 Check Current Branch

```bash
git branch --show-current
```

**Expected:** `main`

If not on main:
```
⚠️ You're currently on branch '<current-branch>', not 'main'.

To pick up a task, you must be on the main branch:
  git checkout main

Would you like me to switch to main for you?
```

### 1.2 Fetch Latest from Upstream

```bash
git fetch origin main
```

### 1.3 Check if Main is Up-to-Date

```bash
git status -uno
```

Look for:
- "Your branch is up to date with 'origin/main'" → ✅ Proceed
- "Your branch is behind 'origin/main'" → Need to pull
- "Your branch is ahead of 'origin/main'" → Local commits need pushing first

**If behind:**
```bash
git pull origin main
```

If pull fails due to conflicts:
```
⚠️ Cannot update main branch - there are conflicts or uncommitted changes.

Please resolve the following before continuing:
1. Stash or commit any local changes: `git stash`
2. Pull the latest: `git pull origin main`
3. Resolve any conflicts
4. Run `Pickup <task-number>` again
```

**If ahead:**
```
⚠️ Your local main branch has unpushed commits.

Please push your changes before picking up a new task:
  git push origin main

Or if these commits shouldn't be on main, reset to origin:
  git reset --hard origin/main
```

### 1.4 Check for Uncommitted Changes

```bash
git status --porcelain
```

If there are uncommitted changes:
```
⚠️ You have uncommitted changes in your working directory.

Please commit or stash these changes before picking up a task:
  git stash        # To temporarily save changes
  git stash pop    # To restore them later
```

## Discussion Point (Governed Mode)

**STOP if any prerequisite fails:**
- Not on main branch
- Main branch not up-to-date with upstream
- Uncommitted changes present

Provide clear instructions for the user to resolve the issue.

## Heuristic (Delegated Mode)

- If not on main: Offer to switch (with user confirmation)
- If behind upstream: Attempt `git pull origin main`
- If pull fails: Stop and provide resolution instructions
- If uncommitted changes: Stop and advise stash/commit

## Exit Criteria

- [ ] On `main` branch
- [ ] Main branch is up-to-date with `origin/main`
- [ ] No uncommitted changes in working directory

## Next Step

→ [02-locate-task.md](./02-locate-task.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.pickup:0.1.3:2026-09-02T12:19:11Z -->
