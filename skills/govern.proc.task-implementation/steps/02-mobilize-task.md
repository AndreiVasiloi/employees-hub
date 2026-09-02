# Step 2: Mobilize Task

## Objective

Move the task to the implementation folder and create the initial commit to signal work has begun.

## Entry Criteria

- Task location and assignment verified (Step 1 complete)
- Task is assigned to current user (ready for implementation)
- Ready to begin mobilization

## Actions

### 2.1 Ensure Correct Branch

Ensure you are on the correct branch for the task:
- If task branch exists: `git checkout <task-branch>`
- If no task branch: Create from main: `git checkout -b <task-branch>`

### 2.2 Move Task (if in 03-pending-implementation)

If task is in `03-pending-implementation/`:

1. **Follow Task Movement Best Practice**:
   - Stage both new location and deletion from old location
   - Verify `git status` shows move (not separate add/delete)

2. Move task folder to `work/04-implementing/{TASK_ID}-<slug>/`

3. Create commit:
   ```
   chore(impl): start implementation for {TASK_ID} - {brief-title}

   Moving task to 04-implementing to begin implementation process

   Task: {TASK_ID}
   ```

4. Push to remote: `git push origin <task-branch>`

5. Confirm push succeeded

### 2.3 Verify Assignment

Confirm the task is properly assigned:
- Check that `assignments.toml` exists and has your email in the implementation field
- If assignment is missing or incorrect, stop and run `govern.proc.pickup` for `<task-number>` first
- Do not proceed with implementation without proper assignment

### 2.4 Verify Location

If task is already in `04-implementing/`:
- Confirm location and assignment
- Ensure assignment is claimed before proceeding
- Skip to Step 2.5 if already mobilized

### 2.5 Confirm Setup

Verify the working state:
- Task folder is in `work/04-implementing/`
- Assignment is verified in `assignments.toml` (assigned to current user)
- Branch is correct and pushed
- Ready to begin implementation work

## Discussion Point (Governed Mode)

**STOP**: Confirm task mobilization:
- "Task {TASK_ID} moved to 04-implementing and assignment verified."
- "Branch: {branch-name}, Pushed: {yes/no}"
- "Ready to proceed with context loading?"
- Wait for confirmation before continuing

## Heuristic (Delegated Mode)

If in delegated mode:
- Move task without confirmation if in 03-pending-implementation
- Verify assignment is already claimed to current user (don't auto-claim)
- If assignment missing: Stop and direct user to run `govern.proc.pickup` for `<task-number>`
- Verify push succeeded before proceeding
- Skip if already in 04-implementing (just verify assignment)
- Proceed to Step 3 after all actions complete

## Exit Criteria

- [ ] Task is in `work/04-implementing/{TASK_ID}-<slug>/`
- [ ] Assignment verified in `assignments.toml` (assigned to current user)
- [ ] Move commit pushed to remote (if moved)
- [ ] Branch is correct and up to date
- [ ] Ready to begin context loading

## Next Step

→ [03-load-context.md](./03-load-context.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-implementation:0.2.2:2026-09-02T06:10:56Z -->
