+++
name = "task-check"
description = "Review tasks from the planning process for completeness, quality, and standards alignment before implementation begins. Use when a task has completed planning and needs validation before moving to implementation."
license = """
© 2026 Endava (UK) Limited. All rights reserved.
Endava Confidential and Proprietary. May include Endava trade secrets.
Internal reference / reusable material.
Use is restricted to authorised persons on a need-to-know basis for approved Endava or project purposes.
Do not disclose outside authorised recipients except under applicable confidentiality obligations. See the LICENSE.md file in this repository.
"""
+++

# Task Check

Review tasks created through the task-planning process to ensure completeness, quality, and alignment with standards before implementation begins.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## Purpose

Ensure tasks are well-formed, complete, and ready for implementation. Reviews the multi-artifact output from task-planning including task definitions, technical plans, test inventories, and supporting documentation. Produces actionable recommendations and a clear verdict.

## When to Use

Use this skill when you need to:
- Review a task that has completed the planning process
- Validate task completeness before implementation begins
- Check alignment with PRDs, decisions, and platform standards
- Assess test strategy and architecture context
- Provide a formal verdict: Ready, Ready w/ changes, or Rework

## Inputs to Request (if missing)

Before starting task check, ensure you have:

1. **Task folder** - Task in `work/03-pending-implementation/` (required)
2. **Task artifacts** - `task.md` and `plan.md` from planning (required)
3. **Specification access** - Access to decisions, PRDs, platform standards (context)

## Process Modes

### Governed Mode (Default)
- Interactive with discussion points at each step
- User confirms findings before proceeding
- Best for complex tasks, critical features, unfamiliar domains

### Delegated Mode
- Add `delegated` or `auto` to trigger phrase
- Autonomous review within guardrails
- Minimal user interaction, only for major issues
- Best for straightforward tasks with clear requirements

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-locate-task.md](./steps/01-locate-task.md) | Find task folder, verify reviewable state |
| 2 | [02-verify-structure.md](./steps/02-verify-structure.md) | Check all planning artifacts exist |
| 3 | [03-review-task-definition.md](./steps/03-review-task-definition.md) | Review task.md quality |
| 4 | [04-review-technical-plan.md](./steps/04-review-technical-plan.md) | Review plan.md completeness |
| 5 | [05-check-standards-alignment.md](./steps/05-check-standards-alignment.md) | PRDs, decisions, platform standards |
| 6 | [06-review-architecture-tests.md](./steps/06-review-architecture-tests.md) | Architecture context, test strategy |
| 7 | [07-review-risks-dependencies.md](./steps/07-review-risks-dependencies.md) | Risks, dependencies, adjacent tasks |
| 8 | [08-compile-review-summary.md](./steps/08-compile-review-summary.md) | Summarize findings, provide verdict |

## Outputs

- Completed review checklist (review findings per step)
- Recommendations list with owners
- Verdict: **Ready** | **Ready w/ changes** | **Rework**
- `review/task-planning-review.md` committed to task folder

## Verdict Criteria

| Outcome | Criteria |
|---------|----------|
| **Ready** | No critical or major issues; minor issues only |
| **Ready w/ changes** | No critical issues; major issues are addressable quickly |
| **Rework** | Critical issues present; return to planning |

## Quality Gates

Before completing a review:
- [ ] Task folder structure verified (all planning artifacts present)
- [ ] Task definition reviewed (problem, goals, acceptance criteria)
- [ ] Technical plan reviewed (approach, phases, test inventory)
- [ ] Standards alignment checked (PRDs, decisions, platform standards)
- [ ] Architecture and test strategy validated
- [ ] Risks and dependencies assessed
- [ ] Verdict recorded with actionable recommendations

## Operating Principles

- **Review-only**: Do not modify code or docs; provide recommendations only
- **Clarity over cleverness**: Small, reversible steps
- **Link everything**: Code ↔ docs ↔ tasks ↔ decisions
- **Adhere to accepted decisions**: `explore/decisions/` and platform standards
- **Avoid duplication**: Single source of truth in the task

## Integration with Workflows

**Integrates with**:
- **Task Planning** - Reviews artifacts produced by planning
- **Task Implementation** - Approved tasks proceed to implementation
- **Iteration Management** - Tasks from iterations pass through check

## Best Practices

**Do**:
- ✅ Review all required artifacts before forming a verdict
- ✅ Traverse to parent epic for standards context
- ✅ Check adjacent tasks for conflicts and synergies
- ✅ Provide actionable recommendations with clear owners
- ✅ Commit the review summary to the task folder for traceability
- ✅ Fix quality failures by regeneration, not manual editing

**Don't**:
- ❌ Modify task definition files (task.md, plan.md) directly
- ❌ Skip standards alignment even for simple tasks
- ❌ Approve tasks with missing required artifacts
- ❌ Ignore test inventory gaps
- ❌ Provide vague recommendations without actionable steps

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-check:0.2.1:2026-09-02T06:10:56Z -->
