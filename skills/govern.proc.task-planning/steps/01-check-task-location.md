# Step 1: Check Task Location

**READ THIS STEP ONLY** - Do not read other steps until this step is complete

## Session Start Prompt
```
# ⚙️ Task Planning Session: {TASK_ID}

## Planning Mode: {GOVERNED | DELEGATED}

I'm starting a planning session. I will follow the steps in govern.proc.task-planning:
1. Check task location and move to 02-planning (commit to main)
2. Create planning branch (plan/{TASK_ID}-<slug>)
3. Capture high-level problem and requirements
4. Define goals, constraints, and non-goals
5. Technical research & related work search
6. Update task.md with research findings (task-definition skill)
7. Add technical detail until implementation-ready
8. Pipeline test requirements
9. Architectural context diagram
10. Define acceptance criteria
11. Technical risk assessment, dependencies, validation
12. Implementation phases, dependencies, tags
13. Create technical plan (task-planning skill)
14. Size the task
15. Review plan, quality gates, user approval
16. Commit and publish (MR)

Current inputs: [task definition, target component, constraints]
Expected output: work/02-planning/<TASK_ID>-<slug>/plan.md with supporting docs

I'll proceed with Step 1 (Check Task Location) unless you have questions or adjustments.
```

## Objective

Verify the task exists and move it to `02-planning` if needed, committing to main branch.

## Entry Criteria

- Task ID provided (e.g., `0030`)
- Task exists in `work/01-pending-planning/` or `work/02-planning/`
- Current step file read completely
- No other step files read

## Actions

### 1.1 Locate Task

Check if task is in:
- `work/01-pending-planning/{TASK_ID}-<slug>/`
- `work/02-planning/{TASK_ID}-<slug>/`

### 1.2 Move Task (if in 01-pending-planning)

If task is in `01-pending-planning/`:

1. Ensure you are on `main` branch
2. Move task folder to `work/02-planning/{TASK_ID}-<slug>/`
3. **Follow Task Movement Best Practice**:
   - Stage both new location and deletion from old location
   - Verify `git status` shows move (not separate add/delete)
4. Create commit:
   ```
   chore(plan): start planning for {TASK_ID} - {brief-title}

   Moving task to 02-planning to begin planning process

   Task: {TASK_ID}
   ```
5. Push to main: `git push origin main`
6. Confirm push succeeded

### 1.3 Verify Location

If task is already in `02-planning/`, confirm and apply the correct mode branch below:

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Confirm task location with user with the format "Task {TASK_ID} is in {location}. Moving to 02-planning and committing to main."
- Wait for confirmation before committing and continuing execution.

## 🤖 If DELEGATED Mode

- Apply the following heuristic
- Move task without confirmation if in 01-pending-planning
- Skip if already in 02-planning
- Proceed to Step 2 after commit succeeds

## Exit Criteria

- [ ] Task is in `work/02-planning/{TASK_ID}-<slug>/`
- [ ] Move committed to main branch (if moved)
- [ ] Push to origin succeeded

## Next Step

→ [02-create-branch.md](./02-create-branch.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
