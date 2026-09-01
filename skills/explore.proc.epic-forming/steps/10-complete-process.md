# Step 10: Complete Process

## Objective

Complete the epic formation process by moving the epic-forming working task to the completed state, ensuring all work is properly documented and the task is ready for archival.

## Entry Criteria

- Epic successfully created or amended
- Epic epochs properly formed
- Epic boundaries validated
- Epic indexed and discoverable
- Epic indexed and linked
- Govern readiness validation passed or issues addressed
- All process steps completed successfully

## Actions

### 10.1 Validate Process Completion

Ensure all epic formation work is complete:
- **Epic File**: Complete epic markdown file created in `explore/epics/`
- **Epic Index**: Epic properly indexed in `explore/epics/README.md`
- **Working Task**: Task folder contains complete task.md, plan.md, and size.md
- **Process Quality**: All quality gates satisfied
- **Documentation**: All decisions and rationale documented

### 10.2 Update Task Status

Prepare the epic-forming task for completion:
- **Task Completion**: Mark epic formation work as complete in task.md
- **Summary Creation**: Create summary.md
- **Session History**: Export conversation history to `session-history/` folder
- **Final Review**: Verify all artifacts are complete and accurate

### 10.3 Move Task to Completed

Move the epic-forming task to the pending-release location:
- **Read Release Identifier**: From the task's `[metadata].release`
- **Task Location**: Move task folder from `work/04-implementing/` to `work/05-pending-release/{release-slug}/`
- **Task Reference**: Update any references to task location
- **Process Archive**: Ensure epic formation work is properly archived

### 10.4 Final Quality Check

Perform final validation of epic formation outcomes:
- **Epic Quality**: Epic follows template structure completely
- **Capability Grouping**: Aligns with existing epic patterns
- **Epic Boundaries**: Maintain logical coherence
- **Index Status**: Epic indexed and discoverable
- **Process Integrity**: No task breakdown or demo planning (handled by iteration-management)

## Discussion Point (Governed Mode)

**STOP**: Present epic formation completion for validation:
- "Epic formation process is complete"
- "Epic created/updated: [epic-name]"
- "Epic indexed and discoverable"
- "Working task moved to completed"
- "Epic ready for iteration-management consumption"
- "Does this complete the epic formation work correctly?"

## Heuristic (Delegated Mode)

If in delegated mode:
- Complete process validation without confirmation
- Move epic-forming task to completed location
- Create summary.md with epic formation outcomes
- Export session history to task folder
- Process complete - epic ready for iteration-management

## Process Complete

The epic-forming process is now complete. The outcomes are:

- **Epic File**: Complete epic markdown file in `explore/epics/`
- **Epic Index**: Epic indexed in `explore/epics/README.md`
- **Working Task**: Epic formation task moved to `work/05-pending-release/{release-slug}/`
- **Capability Grouping**: Consistent with existing epic patterns
- **Epic Boundaries**: Clear interfaces for iteration planning

## Next Steps

The epic is now ready for:
- **Iteration Management**: Use epic as interface for task creation
- **Capability Planning**: Reference epic for iteration planning
- **Epic Maintenance**: Update epic as capabilities evolve
- **Pattern Consistency**: Maintain epic grouping patterns over time

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.epic-forming:0.1.3:2026-09-01T11:38:04Z -->
