# Step 3: Check Assignments

## Objective

Ensure the `assignments.toml` file exists in the task folder and verify the task hasn't already been assigned.

## Entry Criteria

- Task located and in pickable state
- Task state and assignment field identified

## Actions

### 3.1 Check for assignments.toml

```bash
ls <task-folder>/assignments.toml
```

**If file exists:** Read current assignments
**If file doesn't exist:** Copy template into task folder

### 3.2 Create assignments.toml if Missing

```bash
cp skills/govern/proc/pickup/templates/assignments.toml <task-folder>/assignments.toml
```

This creates the file with empty assignments:
```toml
planning = ""
implementation = ""
```

### 3.3 Read Current Assignments

```bash
cat <task-folder>/assignments.toml
```

Parse the TOML to extract:
- `planning` value
- `implementation` value

### 3.4 Check Assignment Availability

Based on task state, check the relevant field:

| Task State | Check Field | Available If |
|------------|-------------|--------------|
| `pending-planning` | `planning` | Value is empty (`""`) |
| `pending-implementation` | `implementation` | Value is empty (`""`) |

### 3.5 Handle Already Assigned

If the relevant field has a value (not empty):

```
⚠️ Task <task-number> has already been picked up.

**Task:** <task-folder-name>
**Assigned to:** <email-from-assignments.toml>
**For:** <planning/implementation> work

This task is no longer available. Run `govern.proc.next` to find another task to pick up.
```

### 3.6 Get User's Git Email

```bash
git config user.email
```

Store this for the next step - it will be used to claim the assignment.

## Discussion Point (Governed Mode)

**STOP if task already assigned:**
- Show who has the assignment
- Suggest running `govern.proc.next` to find available work

## Heuristic (Delegated Mode)

- If assignments.toml missing: Create it from template
- If assignment field empty: Proceed to Step 4
- If assignment field has value: Stop with assignment info

## Exit Criteria

- [ ] `assignments.toml` exists in task folder
- [ ] Relevant assignment field is empty (available)
- [ ] User's git email retrieved for claiming

## Next Step

→ [04-claim-assignment.md](./04-claim-assignment.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.pickup:0.1.3:2026-09-02T12:19:11Z -->
