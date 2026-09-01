# Step 4: Create Flow Set Document

## Objective

After all flow parameters and structures are confirmed, generate all flows as a single agent-ready document.

## Entry Criteria

- [ ] Step 3 (Propose Structure) complete with human validation

## Actions

### 4.1 For Each Flow, Create:

1. **Flow metadata**:
   - flow_id (F1, F2, F3...)
   - objective with [VALIDATED] or [ASSUMPTION] tag
   - entry_point, exit_point with tags
   - persona_id, journey_id references

2. **User Flow Table**:
   - Step number, screen/action name
   - Decision? (Y/N), outcome
   - Shape (Rectangle/Circle/Diamond)
   - Tag ([VALIDATED] or [ASSUMPTION])

3. **Narrative Task Flow**:
   - Step-by-step paragraph from entry to exit
   - Use only [VALIDATED] data unless prefixed with "Assumed:"
   - Include decision paths and edge cases

4. **Assumptions to Validate**:
   - All [ASSUMPTION]-tagged items as checkboxes
   - Prioritize by impact on implementation

## Exit Criteria

- [ ] All flows documented with metadata, table, narrative, and assumptions
- [ ] All steps tagged as [VALIDATED] or [ASSUMPTION]
- [ ] Agent-ready structure with flow_ids

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.user-flow-creation:0.2.1:2026-08-31T12:53:29Z -->
