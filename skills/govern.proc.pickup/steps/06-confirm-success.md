# Step 6: Confirm Success

## Objective

Confirm the task has been successfully picked up and advise the developer on next steps.

## Entry Criteria

- Assignment claimed and pushed
- Task moved to working folder

## Actions

### 6.1 Display Success Message

Based on the task type (planning or implementation), display the appropriate message:

**For planning work:**
```
## ✅ Task Picked Up Successfully

**Task:** <task-number> - <task-name>
**Assigned to:** <git-email>
**Moved to:** work/02-planning/<task-folder>

### Next Steps

1. **Notify your team** — Post in the team channel that you've picked up this task
2. **Start a new session** — Begin the planning process with:
   `Plan <task-number>`
```

**For implementation work:**
```
## ✅ Task Picked Up Successfully

**Task:** <task-number> - <task-name>
**Assigned to:** <git-email>
**Moved to:** work/04-implementing/<task-folder>

### Next Steps

1. **Notify your team** — Post in the team channel that you've picked up this task
2. **Start a new session** — Begin the implementation process with:
   `Impl <task-number>`
```

### 6.2 Team Notification Template

Provide a copy-paste template for team notification:

**For planning work:**
```
📋 Picked up task <task-number> for planning
Task: <task-name>
Location: work/02-planning/<task-folder>
```

**For implementation work:**
```
🚀 Picked up task <task-number> for implementation
Task: <task-name>
Location: work/04-implementing/<task-folder>
```

## Discussion Point (Governed Mode)

None - this is an informational step.

## Heuristic (Delegated Mode)

Always display the full success message with all next steps.

## Exit Criteria

- [ ] Success message displayed
- [ ] Branch command provided
- [ ] Process trigger reminder provided
- [ ] Team notification template provided

## Process Complete

The pickup process is now complete. The developer can proceed with their work.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.pickup:0.1.3:2026-09-02T12:19:11Z -->
