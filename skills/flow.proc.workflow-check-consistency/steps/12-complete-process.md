# Step 10: Complete Process

## Objective

Move the workflow-check-consistency task to completed status since the ad-hoc implementation tasks have been created and are ready for pickup.

## Entry Criteria

- All specified folders have been analyzed and validated
- Consistency issues identified and documented
- Work plan generated for identified issues
- Ad-hoc implementation tasks created with complete task.md, plan.md, and size.md
- Implementation tasks placed in `04-implementing/` ready for pickup
- Process mode determined (governed or delegated)

## Actions

### 10.1 Confirm Process Completion

Verify all deliverables are complete:
- All selected folders analyzed and validated
- Cross-folder consistency checks completed
- Work plan generated and documented
- Implementation tasks created and ready for pickup
- Quality reports generated
- User review completed (if in governed mode)

### 10.2 Move Task to Completed

Since this was a workflow-check-consistency session (not implementation work), move the session task to pending-release:
- If a session task was created for the workflow-check-consistency work, move it to `05-pending-release/{release-slug}/` (using the task's `[metadata].release` identifier)
- The implementation tasks remain in `04-implementing/` for actual implementation work

### 10.3 Final Verification

Confirm:
- All consistency issues are documented and addressed in work plan
- Work plan is complete and actionable
- No workflow-check-consistency artifacts remain in working folders
- Process is complete and ready for next consistency check session

## Discussion Point (Governed Mode)

**STOP**: Present process completion for validation:
- "Workflow-check-consistency process complete"
- "Analysis completed for <X> folders with <Y> issues identified"
- "Work plan generated with documented consistency issues"
- "<count> ad-hoc implementation tasks created and ready for pickup"
- "Next task to pick up is {TASK_ID} - `pickup {TASK_ID}`"
- "Workflow-check-consistency session task moved to completed"
- "Is the consistency check work complete?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Verify all deliverables are complete
- Move any session task to `05-pending-release/{release-slug}/`
- Confirm work plan is complete and documented
- Process complete

## Exit Criteria

- [ ] All specified folders analyzed and validated
- [ ] Consistency issues identified and documented
- [ ] Work plan generated and documented
- [ ] Ad-hoc implementation tasks created (up to 3): <count>
- [ ] Workflow-check-consistency session task moved to completed (if created)
- [ ] No workflow-check-consistency artifacts remain in working folders
- [ ] Process complete and ready for next session

## Next Step

→ [workflow-next/](../../workflow-next/)

## Notes

This step handles the completion of the workflow-check-consistency process itself. The actual implementation work will happen in the separate ad-hoc implementation tasks that were created in Step 9.

The workflow-check-consistency session task (if one was created) is moved to completed since the consistency analysis work is done. The implementation tasks remain active in `04-implementing/` for the actual coding work.

## Multiple Task Summary Format

When multiple implementation tasks are created, use this format for completion messaging:

```
"3 ad-hoc implementation tasks created and ready for pickup"
"Next task to pick up is ABC-123 - `pickup ABC-123`"
```

This provides clear scope (3 tasks created) while giving a specific next action without overwhelming the user with all task details.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:flow.proc.workflow-check-consistency:0.1.2:2026-09-01T11:38:02Z -->
