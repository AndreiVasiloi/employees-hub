# Step 9: Finalize Implementation

## Objective

Create the final implementation artifacts including summary.md and prepare for merge request creation.

## Entry Criteria

- **ALL tests from inventory implemented** (Step 6-7-8 loop complete)
- All quality gates satisfied across all iterations
- No remaining tests in inventory
- Ready to finalize implementation artifacts

## Actions

### 9.1 Update Documentation

Update all relevant documentation:
- **README files**: Update for new features, configuration changes
- **API documentation**: Update Swagger/OpenAPI if APIs changed
- **Architecture diagrams**: Update if component boundaries changed
- **Inline documentation**: Ensure complex logic is well-commented
- **Decision log**: Promote significant decisions to central log if needed

### 9.2 Create Summary

Create `summary.md` in the task folder using the template:
- Use [templates/summary.md](../templates/summary.md)
- Document what was actually built vs. designed
- Capture implementation approach and divergences
- Note design decisions and integration points
- List known limitations or follow-up work

### 9.3 Session History Export (Optional)

Export session history for future reference:
- Export Cascade session trajectories to `{TASK_FOLDER}/session-history/`
- File naming: `SESSION-HISTORY-{YYYY-MM-DD}-{HH-MM-SS}.md`
- Provides detailed context for future maintainers

### 9.4 User Review

Present final implementation for review:
- Verify all acceptance criteria are met
- Confirm documentation is complete
- Ensure summary.md captures implementation reality
- Get user approval for commit and MR creation

## Discussion Point (Governed Mode)

**STOP**: Present implementation for final review:
- "Implementation complete for {TASK_ID}:"
- "All acceptance criteria met: ✓"
- "Documentation updated: ✓"
- "summary.md created: ✓"
- "Ready to commit and create MR?"
- Wait for explicit approval before proceeding

## Heuristic (Delegated Mode)

If in delegated mode:
- Auto-update documentation based on changes detected
- Auto-create summary.md using template
- Auto-export session history
- Proceed to Step 10 (commit) without explicit approval

## Exit Criteria

- [ ] All documentation updated
- [ ] summary.md created using template
- [ ] Session history exported (optional)
- [ ] User reviewed and approved (augmented) or verified (delegated)
- [ ] Ready for commit and MR creation

## Next Step

→ [10-commit-and-publish.md](./10-commit-and-publish.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-implementation:0.2.2:2026-09-02T06:10:56Z -->
