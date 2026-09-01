# Step 16: Commit and Publish

## Objective

Commit all planning artifacts and push for review. Task.md should already be complete from earlier steps.

## Entry Criteria

- Sizing complete (Step 14 complete)
- All planning artifacts ready:
  - task.md (product-readable requirements)
  - plan.md (technical implementation details)
  - size.md (complexity assessment)

## Actions

### 16.1 Verify Planning Artifacts

Confirm all files are present in `work/02-planning/{TASK_ID}-{slug}/`:

| File | Content |
|------|---------|
| **task.md** | Product-readable requirements |
| **plan.md** | Technical implementation details |
| **size.md** | Complexity assessment |

### 16.2 Verify task.md Structure

Task.md should use `flow.util.task-definition` skill template with:
- TOML frontmatter (`[metadata]`, `[sources]`, `[links]`)
- Product-readable body (Problem, Goals, Non-Goals, Context, Constraints)
- **NO technical implementation details** (those are in plan.md)

### 16.3 Add Supporting Files (if any)

Add to task directory:
- Diagrams (if created)
- Mockups (if applicable)

### 16.4 Session History Export

**CRITICAL: LLM must NOT create session history manually. User must export from their tool.**

1. Create session-history folder:
   ```bash
   mkdir -p work/02-planning/{TASK_ID}-{slug}/session-history
   ```

2. **STOP and ask user:** "Please export the session trajectory to the task folder"

3. Guide user to save to: `{TASK_FOLDER}/session-history/`

4. Suggested filename: `SESSION-HISTORY-{YYYY-MM-DD}-{HH-MM-SS}.md`

5. **DO NOT** create a manual summary or transcript of the conversation

6. Confirm export is complete before proceeding

### 16.5 User Review

Present final artifacts for review:
- Verify task.md is product-readable
- Verify plan.md has all technical details
- Verify size.md has complexity assessment
- Verify session-history folder has trajectory export
- Get user approval

### 16.6 Commit and Push

```bash
git add work/02-planning/{TASK_ID}-{slug}/
git commit -m "plan({TASK_ID}): complete planning for {brief-title}

Task: {TASK_ID} - {title}

Planning artifacts:
- task.md: Requirements and acceptance criteria
- plan.md: Technical implementation plan
- size.md: Complexity assessment ({size}, {time estimate})

Key decisions:
- {decision 1}
- {decision 2}

Blocks: {blocked tasks if any}"

git push -u origin plan/{TASK_ID}-{slug}
```

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Present final artifacts for review:
  - "Planning artifacts ready for {TASK_ID}"
  - "task.md: Product-readable requirements"
  - "plan.md: Technical implementation details"
  - "size.md: Complexity assessment"
  - "Ready to commit and push?"
- Wait for explicit approval before continuing execution.

## 🤖 If DELEGATED Mode

- Verify all planning artifacts present
- Check task.md is product-readable (no technical details)
- Check plan.md has all technical details
- Commit and push without explicit approval

## Exit Criteria

- [ ] task.md verified (product-readable, TOML frontmatter)
- [ ] plan.md verified (all technical details)
- [ ] size.md verified (complexity assessment)
- [ ] session-history folder created with trajectory export
- [ ] Supporting files added (if any)
- [ ] All artifacts committed to planning branch
- [ ] Branch pushed to origin
- [ ] MR link provided

## Session Complete Prompt

```
Planning session complete. Outputs:

- task.md: Product-readable requirements
- plan.md: Technical implementation plan
- size.md: Complexity assessment

Branch: plan/{TASK_ID}-{slug}
MR: [link]

Plan summary:
- ID: {TASK_ID}
- Problem: [one-line summary]
- Size: {shirt size} ({time estimate})
- Key decisions: [list]
- Blocks: [blocked tasks if any]

Task is ready for implementation once MR is merged.
```

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
