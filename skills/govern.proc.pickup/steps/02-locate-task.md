# Step 2: Locate Task

## Objective

Find the specified task and verify it's in a state that can be picked up.

## Entry Criteria

- Prerequisites validated (on main, up-to-date)
- Task number provided by user

## Actions

### 2.1 Search for Task in Pickable Locations

Tasks can only be picked up from these folders:
- `work/01-pending-planning/` — For planning work
- `work/03-pending-implementation/` — For implementation work

```bash
# Search for task folder by number
find work/01-pending-planning work/03-pending-implementation -maxdepth 1 -type d -name "<task-number>-*" 2>/dev/null
```

**Example:** For task `0044`:
```bash
find work/01-pending-planning work/03-pending-implementation -maxdepth 1 -type d -name "0044-*" 2>/dev/null
```

### 2.2 Determine Task State

Based on where the task is found:

| Location | State | Assignment Field |
|----------|-------|------------------|
| `01-pending-planning` | Pending Planning | `planning` |
| `03-pending-implementation` | Pending Implementation | `implementation` |

### 2.3 Handle Task Not Found

If the task is not found in either pickable location, check other locations:

```bash
# Check if task exists elsewhere
find working -maxdepth 2 -type d -name "<task-number>-*"
```

**If found in another location:**
```
⚠️ Task <task-number> exists but is not available for pickup.

Current location: work/<folder>/<task-folder>
Status: <status based on folder>

Tasks can only be picked up from:
- pending-planning (for planning work)
- pending-implementation (for implementation work)

This task is currently: <in planning / being implemented / completed / etc.>
```

**If not found anywhere:**
```
⚠️ Task <task-number> not found.

Please verify:
1. The task number is correct
2. The task has been created in the working folder

Available tasks in pending-planning:
<list folders>

Available tasks in pending-implementation:
<list folders>
```

### 2.4 Record Task Details

Once found, record:
- **Task folder path**: e.g., `work/03-pending-implementation/0044-CLR-integration-tests-edge-cases`
- **Task state**: `pending-planning` or `pending-implementation`
- **Assignment field**: `planning` or `implementation`
- **Target folder**: `02-planning` or `04-implementing`

## Discussion Point (Governed Mode)

**STOP if task not in pickable state:**
- Provide current location and status
- Explain why it cannot be picked up
- Suggest alternatives (run `govern.proc.next` to find available tasks)

## Heuristic (Delegated Mode)

- If task found in pickable location: Proceed to Step 3
- If task found elsewhere: Stop with status explanation
- If task not found: Stop with available task list

## Exit Criteria

- [ ] Task located in `pending-planning` or `pending-implementation`
- [ ] Task state and assignment field identified
- [ ] Target folder for move identified

## Next Step

→ [03-check-assignments.md](./03-check-assignments.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.pickup:0.1.3:2026-09-02T12:19:11Z -->
