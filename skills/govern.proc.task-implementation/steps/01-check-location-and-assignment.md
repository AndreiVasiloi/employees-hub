# Step 1: Check Location and Assignment

## Objective

Verify the task exists in the correct location, check assignments.toml to prevent pickup conflicts, and ensure the user is properly identified for assignment tracking.

## Entry Criteria

- Task ID provided (e.g., `0043`)
- Task exists in `work/03-pending-implementation/` or `work/04-implementing/`

## Actions

### 1.1 Locate Task

Check if task is in:
- `work/03-pending-implementation/{TASK_ID}-<slug>/`
- `work/04-implementing/{TASK_ID}-<slug>/`

### 1.2 Check for assignments.toml

```bash
ls <task-folder>/assignments.toml
```

**If file exists:** Read current assignments
**If file doesn't exist:** Do not create it manually — direct the user to run `govern.proc.pickup` for `<task-number>` so assignment claiming and file creation happen through the canonical pickup flow.

### 1.3 Read Current Assignments

Parse the TOML to extract:
- `implementation` value (relevant for implementation tasks)

### 1.4 Check Assignment Availability

For implementation tasks, check the `implementation` field:
- **Available if**: Value is empty (`""`)
- **Unavailable if**: Value has an email address

### 1.5 Handle Already Assigned

If the implementation field has a value:
```
⚠️ Task <task-number> has already been picked up for implementation.

**Task:** <task-folder-name>
**Assigned to:** <email-from-assignments.toml>

This task is already assigned to someone else. Options:
1. Run `govern.proc.next` to find another available task
2. If you need to work on this specific task, contact the assigned person or your team lead
3. If you must override this assignment, ensure you have coordination with the current assignee
```

### 1.6 Handle Missing Assignment

If `assignments.toml` doesn't exist or the implementation field is empty:
```
ℹ️ Task <task-number> is available but not picked up.

**Task:** <task-folder-name>
**Status:** Available for implementation

To pick up this task, run `govern.proc.pickup` for `<task-number>`.

The pickup process will:
- Check for conflicts with other users
- Create the assignments.toml file
- Claim the implementation assignment for you
- Ensure proper deconfliction

After picking up the task, return to this implementation process.
```

### 1.7 Gate Check: Planning Complete

**CRITICAL**: Verify task has completed planning phase before implementation.

Check for required files in task folder:
```bash
ls <task-folder>/
```

**Required files must exist:**
- [ ] `task.md` - Task definition (requirements)
- [ ] `plan.md` - Technical implementation plan  
- [ ] `size.md` - Sizing analysis

**If any required file missing:**
```
⚠️ Task <task-number> has not completed planning phase.

**Missing files:** [list missing files]
**Current location:** <task-folder>

This task must complete the planning process before implementation can begin.

Required actions:
1. Run task planning: `Let's start a planning session for <task-number>`
2. Ensure all planning artifacts are created and approved
3. Return to implementation process after planning is complete

The planning process creates:
- task.md (requirements definition)
- plan.md (technical implementation plan)
- size.md (effort estimation)

Implementation cannot proceed without these artifacts.
```

### 1.8 Verify Task State

Ensure task is ready for implementation:
- task.md exists and contains requirements definition
- plan.md exists and contains technical approach
- size.md exists and contains sizing analysis
- Dependencies are resolved (check summary.md of dependency tasks)
- Architectural context diagram is present in plan.md

## Discussion Point (Governed Mode)

**STOP** if task already assigned:
- Show who has the assignment
- Suggest running `govern.proc.next` to find available work

**STOP** if planning incomplete:
- Show which required files are missing
- Direct user to run planning process first
- Do not proceed with implementation until planning is complete

**STOP** for location verification:
- "Task {TASK_ID} is in {location}. Ready to proceed with implementation?"
- Wait for confirmation before continuing

## Heuristic (Delegated Mode)

If in delegated mode:
- If assignments.toml missing: Direct user to run `govern.proc.pickup` for `<task-number>` (don't auto-create)
- If assignment field empty: Direct user to run `govern.proc.pickup` for `<task-number>` (don't auto-proceed)
- If assignment field has value: Stop with assignment info and options
- Auto-verify task state and flag any blockers
- Proceed to Step 2 only if assignment is already claimed by current user

## Exit Criteria

- [ ] Task is located and verified
- [ ] `assignments.toml` exists and checked
- [ ] Implementation assignment is either:
  - Assigned to current user (proceed with implementation)
  - Available (user directed to run `govern.proc.pickup` for `<task-number>`)
  - Assigned to others (user notified of options)
- [ ] **Planning gate check passed**:
  - [ ] `task.md` exists (requirements definition)
  - [ ] `plan.md` exists (technical implementation plan)
  - [ ] `size.md` exists (sizing analysis)
- [ ] Task state verified as ready for implementation

## Next Step

→ [02-mobilize-task.md](./02-mobilize-task.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-implementation:0.2.2:2026-09-02T06:10:56Z -->
