+++
name = "pickup"
description = "Pick up a specific task for planning or implementation work, with atomic assignment via assignments.toml to prevent conflicts."
license = """
© 2026 Endava (UK) Limited. All rights reserved.
Endava Confidential and Proprietary. May include Endava trade secrets.
Internal reference / reusable material.
Use is restricted to authorised persons on a need-to-know basis for approved Endava or project purposes.
Do not disclose outside authorised recipients except under applicable confidentiality obligations. See the LICENSE.md file in this repository.
"""
+++

# Workflow: Pickup Task

Pick up a specific task for planning or implementation work, with atomic assignment to prevent conflicts.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## Purpose

This process provides a safe, conflict-free way for developers to claim a task. It uses an `assignments.toml` file in each task folder to track who has picked up the task, with atomic push-to-main to prevent race conditions when multiple developers try to pick up the same task.

The process handles two scenarios:
- **Pending Planning** → Developer picks up to create the technical plan
- **Pending Implementation** → Developer picks up to implement the task

## When to Use

Use this skill when you need to:
- Claim a specific task for planning or implementation work
- Safely assign yourself to a task without conflicts
- Move a task from pending to active working state

## Inputs to Request (if missing)

1. **Task number** — The task ID to pick up, e.g. `0044`, `0071` (required)

## Prerequisites

- **Git**: Repository must be on `main` branch and up-to-date with upstream
- **Task State**: Task must be in `pending-planning` or `pending-implementation`

## Process Modes

### Governed Mode (Default)
- Confirms before moving task
- Stops on any prerequisite failure with clear instructions
- Best for first-time use or unfamiliar tasks

### Delegated Mode
- Runs all checks and claims automatically
- Stops only on conflicts or errors
- Best for experienced developers picking up known tasks

## Procedure

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-validate-prerequisites.md](./steps/01-validate-prerequisites.md) | Check main branch and upstream sync |
| 2 | [02-locate-task.md](./steps/02-locate-task.md) | Find task and validate pickable state |
| 3 | [03-check-assignments.md](./steps/03-check-assignments.md) | Ensure assignments.toml exists, check availability |
| 4 | [04-claim-assignment.md](./steps/04-claim-assignment.md) | Atomically claim the task via push-to-main |
| 5 | [05-move-task.md](./steps/05-move-task.md) | Move task to working folder (planning or implementing) |
| 6 | [06-confirm-success.md](./steps/06-confirm-success.md) | Confirm pickup and advise next steps |

## Process Flow

```
1. Validate Prerequisites
   ├─ Check on main branch
   ├─ Check main is up-to-date with upstream
   └─ If not: Ask user to resolve, STOP

2. Locate Task
   ├─ Search pending-planning and pending-implementation
   └─ If not found or wrong state: Alert user, STOP

3. Check Assignments
   ├─ If assignments.toml missing: Copy template into task folder
   ├─ Read current assignments
   └─ If already assigned: Alert user, STOP

4. Claim Assignment (Atomic)
   ├─ Update assignments.toml with user's git email
   ├─ Commit and push to main
   └─ If conflict: Check who won, alert user, STOP

5. Move Task to Working Folder
   ├─ pending-planning → 02-planning
   ├─ pending-implementation → 04-implementing
   └─ Commit the move

6. Confirm Success
   └─ Advise user to notify team channel
```

## Output Format

### Success (Implementation)
```
## ✅ Task Picked Up Successfully

**Task:** <task-number> - <task-name>
**Assigned to:** <git-email>
**Moved to:** work/04-implementing/<task-folder>

### Next Steps
1. **Notify your team** — Post in the team channel
2. **Start a new session** — `Impl <task-number>`
```

### Success (Planning)
```
## ✅ Task Picked Up Successfully

**Task:** <task-number> - <task-name>
**Assigned to:** <git-email>
**Moved to:** work/02-planning/<task-folder>

### Next Steps
1. **Notify your team** — Post in the team channel
2. **Start a new session** — `Plan <task-number>`
```

### Conflict
```
## ⚠️ Task Already Claimed

**Task:** <task-number> - <task-name>
**Picked up by:** <other-developer-email>

Run `govern.proc.next` to find another task to pick up.
```

## Quality Gates

- [ ] On main branch, up-to-date with upstream, no uncommitted changes
- [ ] Task located in pickable state (pending-planning or pending-implementation)
- [ ] assignments.toml exists and relevant field is available
- [ ] Assignment atomically claimed via push-to-main
- [ ] Task moved to appropriate working folder
- [ ] Success confirmation with next steps provided

## Integration with Workflows

**Integrates with**:
- **govern.proc.next** — Suggests tasks to pick up; pickup is the follow-through
- **govern.proc.task-planning** — Planning work begins after pickup from pending-planning
- **govern.proc.task-implementation** — Implementation begins after pickup from pending-implementation

## Best Practices

**Do**:
- ✅ Ensure main is up-to-date before picking up a task
- ✅ Notify your team channel after successful pickup
- ✅ Start the appropriate process (`Plan`/`Impl`) in a new session after pickup
- ✅ Run `govern.proc.next` if your pickup attempt loses a race condition

**Don't**:
- ❌ Pick up tasks from branches other than main
- ❌ Manually edit assignments.toml without going through this process
- ❌ Pick up multiple tasks simultaneously
- ❌ Skip the team notification step

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.pickup:0.1.3:2026-09-02T12:19:11Z -->
