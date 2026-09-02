+++
name = "task-implementation"
description = "Implement features and changes with Human + LLM pair programming, following test-driven development in small, reversible increments. Use when a task has passed planning and check, and is ready for implementation."
license = """
© 2026 Endava (UK) Limited. All rights reserved.
Endava Confidential and Proprietary. May include Endava trade secrets.
Internal reference / reusable material.
Use is restricted to authorised persons on a need-to-know basis for approved Endava or project purposes.
Do not disclose outside authorised recipients except under applicable confidentiality obligations. See the LICENSE.md file in this repository.
"""
+++

# Task Implementation

Implement features and changes with Human + LLM pair programming, following test-driven development in small, reversible increments.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## Purpose

This process transforms detailed task specifications into working code through collaborative implementation. It supports both governed mode (interactive pair programming) and delegated mode (autonomous execution within guardrails) to accommodate different complexity levels and collaboration needs.

## When to Use

Use this skill when you need to:
- Implement a task that has completed planning and check
- Write code following TDD methodology with failing tests first
- Execute a per-test implementation loop with integration verification
- Create merge-ready code with comprehensive test coverage

## Inputs to Request (if missing)

Before starting task implementation, ensure you have:

1. **Task folder** - `work/04-implementing/{TASK_ID}-<slug>/` with `task.md`, `plan.md`, `size.md` (required)
2. **Target component(s)** - Branch and codebase to modify (required)
3. **Existing code/tests** - Files to touch (required)
4. **Acceptance criteria** - From the task definition (required)

## Process Modes

### Governed Mode (Interactive)
Default collaborative mode with step-by-step user approval:
- User confirms before proceeding to each step
- Presents findings and proposals for approval
- Mandatory step gate system prevents premature advancement

### Delegated Mode (Autonomous)
Triggered by adding `delegated` or `auto` to the trigger phrase:
- Replaces discussion points with heuristics
- LLM makes decisions autonomously within guardrails
- Time-boxed to ≤1 hour with self-reflection checkpoints

## Guardrails and Principles

- **TDD Required**: Write failing tests first for all new behavior
- **Small, Reversible Steps**: Keep changes incremental (<300 lines per iteration)
- **File Size Limit**: Keep files <500 lines (soft limit; add override comment if needed)
- **Explicit Versions**: Pin dependencies, tools, and images to exact versions
- **Link Everything**: Cross-reference code ↔ docs ↔ specs ↔ issues
- **Clarity Over Cleverness**: Prefer readable, maintainable code

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-check-location-and-assignment.md](./steps/01-check-location-and-assignment.md) | Verify task location and check assignments.toml |
| 2 | [02-mobilize-task.md](./steps/02-mobilize-task.md) | Move task to 04-implementing and start work |
| 3 | [03-load-context.md](./steps/03-load-context.md) | Load dependencies, architectural context, guidelines |
| 4 | [04-plan-inventory.md](./steps/04-plan-inventory.md) | Create test inventory and implementation strategy |
| 5 | [05-validate-skeletons.md](./steps/05-validate-skeletons.md) | Write and validate ALL test skeletons (must fail) |
| 6 | [06-implementation-loop.md](./steps/06-implementation-loop.md) | Select ONE test, implement to pass |
| 7 | [07-verify-integration.md](./steps/07-verify-integration.md) | Verify integration for current test |
| 8 | [08-validate-quality.md](./steps/08-validate-quality.md) | Quality gates, then loop or proceed |
| 9 | [09-complete-task.md](./steps/09-complete-task.md) | Create summary.md and prepare artifacts |
| 10 | [10-commit-and-publish.md](./steps/10-commit-and-publish.md) | Commit, create MR with full description |

**Per-Test Loop (Steps 6–8):** For each test in inventory, execute steps 6→7→8, then loop back to step 6 for the next test. When all tests are complete, proceed to step 9.

## Outputs

- Code changes (<300 lines/iter) with adjacent tests
- Passing tests for new behavior
- Updated docs (README/inline/related)
- Conventional commits linked to task/issue
- `summary.md` using summary template
- Session history export (optional)

## Quality Gates

Before completing implementation:
- [ ] Task moved from 03-pending-implementation to 04-implementing (committed to main)
- [ ] Task location and assignment verified (prevent conflicts)
- [ ] ALL test skeletons written and confirmed failing
- [ ] Integration checkpoint passed (real connections vs stubs)
- [ ] **FULL test suite passing** (ALL tests, not just current task)
- [ ] Test files alongside implementation with `_test` suffix
- [ ] No linting errors
- [ ] Build succeeds locally
- [ ] Pipeline tests validated locally (if required)
- [ ] Documentation updated
- [ ] All commits follow conventional format and reference task
- [ ] Decision log complete (for API/security/schema changes)
- [ ] summary.md created using template
- [ ] Time-box respected (≤1 hour for delegated mode)

## Integration with Workflows

**Integrates with**:
- **Task Planning** - Produces the task.md and plan.md consumed by this process
- **Task Check** - Reviews task readiness before implementation begins
- **Task Review** - Reviews code changes after implementation completes
- **Iteration Management** - Tasks from iterations flow through implementation
- **Release Lifecycle** - Completed tasks move to `05-pending-completion/{release-slug}/` grouped by release, then to `06-completed/` when the release is cut

## Best Practices

**Do**:
- ✅ Write failing tests first (TDD is mandatory)
- ✅ Keep changes small and focused (<300 lines per iteration)
- ✅ Verify real integration points, not just mocks/stubs
- ✅ Run the FULL test suite, not just current task tests
- ✅ Commit after each test passes with conventional format
- ✅ Log decisions for API, security, and schema changes
- ✅ Create summary.md capturing what was actually built

**Don't**:
- ❌ Skip the test skeleton validation step
- ❌ Implement multiple tests in a single iteration
- ❌ Leave stub implementations without flagging them
- ❌ Exceed 300 lines of changes per iteration
- ❌ Commit without running the full test suite
- ❌ Start implementation without verified assignment

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-implementation:0.2.2:2026-09-02T06:10:56Z -->
