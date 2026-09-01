# Step 15: Review and Finalize Plan

## Objective

Review the completed plan.md document and get user approval before committing the planning work.

## Entry Criteria

- Sizing complete (Step 14 complete)
- Technical plan created and ready for review
- All planning artifacts completed

## Actions

### 15.1 Review Technical Plan

Review the completed `work/02-planning/{TASK_ID}-{slug}/plan.md`:
- Verify all technical decisions are documented
- Confirm implementation strategy is clear
- Check that all research findings are incorporated
- Validate that the plan is implementation-ready

### 15.2 Ensure Plan Completeness

Plan must include all technical details consolidated from working files:

| Section | Content |
|---------|---------|
| **Context & References** | Epic link, related tasks, decisions |
| **Technical Approach** | Architecture decisions and component changes |
| **Implementation Strategy** | Development phases and dependencies |
| **Test Requirements** | Unit, integration, and pipeline test needs |
| **Risk Assessment** | Technical risks and mitigation strategies |
| **Dependencies** | Blocking, dependent, and related tasks |
| **Sizing** | Complexity analysis and time estimates |

### 15.3 Add Supporting Files

Add to task directory:
- Diagrams (if created)
- Mockups (if applicable)
- Research notes (if extensive)

### 15.4 Quality Gates Validation

Before finalizing, verify all quality gates are met:

| Quality Gate | Status | Notes |
|--------------|--------|-------|
| Task moved to 02-planning | [ ] | Committed to main (Step 1) |
| Planning branch created | [ ] | plan/{TASK_ID}-{slug} (Step 2) |
| Technical constraints documented | [ ] | Implementation boundaries clear |
| Major technical decisions documented | [ ] | Only tactical coding choices remain |
| Technical detail level sufficient | [ ] | User-confirmed: no architectural choices left |
| Test inventory complete | [ ] | Comprehensive test scenarios |
| Pipeline test requirements documented | [ ] | Or marked N/A |
| Architectural context diagram included | [ ] | Key relationships documented |
| Technical risks assessed | [ ] | All applicable categories covered |
| Dependencies and related work identified | [ ] | Linked and documented |
| Implementation sequencing documented | [ ] | Phases and dependencies clear |
| Supporting documentation added | [ ] | Diagrams, research notes in task directory |
| All links cross-referenced | [ ] | Docs, issues, tasks linked |
| User review and approval | [ ] | Plan reviewed and approved |
| Sizing complete | [ ] | Multi-axis scoring completed |

### 15.5 User Review

Present final plan for review:
- Verify all sections are complete
- Confirm acceptance criteria are testable
- Ensure technical decisions are sound
- Get user approval

### 15.6 Session Complete Prompt
```
Planning session complete. Outputs:

- work/02-planning/<TASK_ID>-<slug>/plan.md — [link]
- Updated task.md if requirements evolved — [link]
- Supporting docs: [list any diagrams, mockups, etc.]
- Merge request: [link]

Plan summary:
- ID: <TASK_ID>
- Problem: [one-line summary]
- Technical approach: [key technical decisions from core planning]
- Test inventory: [count] test scenarios
- Technical risks: [list applicable risk categories]
- Dependencies: [list if any]
- Implementation phases: [brief overview from core planning]

Task is ready for implementation once MR is merged.
```

## 💬 If GOVERNED Mode

- **Stop**
- Display > ## 💬 Discussion Point
- Present final plan for review:
  - "Here's the final plan.md for {TASK_ID}"
  - "Please review and confirm it's ready for commit"
- Wait for explicit approval before continuing execution.

## 🤖 If DELEGATED Mode

- Apply the following heuristic
- Review plan.md for completeness and technical soundness
- Verify all required sections are present
- Proceed to Step 16 after review

## Exit Criteria

- [ ] plan.md reviewed and approved
- [ ] All technical decisions validated
- [ ] Supporting files added (if any)
- [ ] User approved (governed) or verified (delegated)

## Next Step

→ [16-commit-and-publish.md](./16-commit-and-publish.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
