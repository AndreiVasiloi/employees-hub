# Step 3: Propose Flow Structure

## Objective

For each flow, propose a step sequence using the shape system (Rectangle=screen, Circle=action, Diamond=decision).

## Entry Criteria

- [ ] Step 2 (Gather Parameters) complete for all flows

## Actions

### 3.1 Propose Structure Per Flow

For each flow, propose:

```
Entry: [entry point] → Exit: [desired outcome]

Step 1 — [Screen/Page name] [▭ Rectangle]
Step 2 — [User action] [○ Circle]
Step 3 — [Decision: condition?] [◇ Diamond]
  → Yes: Step 4a
  → No: Step 4b
Step 4a — [Screen if Yes] [▭ Rectangle]
Step 4b — [Screen if No] [▭ Rectangle]
Step 5 — [Final action] [○ Circle]
Exit: [Success state]
```

**Shape Legend**:
- ▭ Rectangle = Screen or page
- ○ Circle = User action or event
- ◇ Diamond = Decision point
- → Arrow = Direction of flow

**STOP**: Wait for human to validate each flow structure.

## Exit Criteria

- [ ] Flow structure proposed for each flow
- [ ] Human has validated or adjusted each structure

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.user-flow-creation:0.2.1:2026-08-31T12:53:29Z -->
