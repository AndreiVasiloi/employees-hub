# Step 5: Move Task

## Objective

Move the task from its pending folder to the appropriate working folder.

## Entry Criteria

- Assignment successfully claimed and pushed to main

## Actions

### 5.1 Determine Target Folder

| Current Location | Target Location |
|------------------|-----------------|
| `work/01-pending-planning/` | `work/02-planning/` |
| `work/03-pending-implementation/` | `work/04-implementing/` |

### 5.2 Move the Task Folder

```bash
git mv <current-path> <target-path>
```

**Example for planning:**
```bash
git mv work/01-pending-planning/0071-SCH-pipeline-jenkins-integration \
       work/02-planning/0071-SCH-pipeline-jenkins-integration
```

**Example for implementation:**
```bash
git mv work/03-pending-implementation/0044-CLR-integration-tests-edge-cases \
       work/04-implementing/0044-CLR-integration-tests-edge-cases
```

### 5.3 Commit the Move

```bash
git commit -m "chore: move <task-number> to <planning/implementing>"
```

**Example:**
```bash
git commit -m "chore: move 0044 to implementing"
```

### 5.4 Push the Move

```bash
git push origin main
```

### 5.5 Handle Push Conflict

If push fails (unlikely at this point since assignment was already claimed):

```bash
git pull --rebase origin main
git push origin main
```

If this fails, the task is still assigned to the user - they just need to resolve the conflict manually.

## Discussion Point (Governed Mode)

**Confirm before moving:**
- "Moving task <task-number> from <source> to <target>. Proceed?"

## Heuristic (Delegated Mode)

- Move task immediately after successful assignment claim
- If push fails: Attempt rebase and retry
- Task remains assigned even if move push fails

## Exit Criteria

- [ ] Task folder moved to target location
- [ ] Move committed and pushed to main

## Next Step

→ [06-confirm-success.md](./06-confirm-success.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.pickup:0.1.3:2026-09-02T12:19:11Z -->
