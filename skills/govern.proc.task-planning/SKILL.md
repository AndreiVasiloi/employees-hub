+++
name = "task-planning"
description = "Create technical implementation plans from task definitions through detailed analysis and decision-making. Use when you need to transform requirements into implementation-ready technical plans."
license = """
© 2026 Endava (UK) Limited. All rights reserved.
Endava Confidential and Proprietary. May include Endava trade secrets.
Internal reference / reusable material.
Use is restricted to authorised persons on a need-to-know basis for approved Endava or project purposes.
Do not disclose outside authorised recipients except under applicable confidentiality obligations. See the LICENSE.md file in this repository.
"""
+++

# Task Planning

Create technical implementation plans from task definitions through detailed analysis and decision-making.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## Purpose

Transform task definitions (requirements-only) into detailed technical implementation plans. Bridges the gap between high-level requirements and implementation-ready technical details, ensuring all major technical decisions are documented before coding begins.

## Trigger Phrases

| Shorthand | Full Phrase |
|-----------|-------------|
| `Plan` | `Let's start a planning session...` |

## Process Modes

### Governed Mode (Default)
- **How to trigger**: Use standard trigger phrase `Plan`
- **Behavior**: Interactive with discussion points at each step
- **User interaction**: User confirms before proceeding to next step
- **Best for**: Complex specifications, unfamiliar domains, critical decisions

### Delegated Mode
- **How to trigger**: Add `delegated` or `auto` to trigger phrase (`Plan delegated`)
- **Behavior**: Autonomous decision-making within guardrails
- **User interaction**: Minimal, only for major issues
- **Best for**: Straightforward technical planning with clear requirements

## Process Steps

| Step | File | Purpose | Mode |
|------|------|---------|------|
| 1 | [01-check-task-location.md](./steps/01-check-task-location.md) | Move task to 02-planning, commit to main | Both |
| 2 | [02-create-branch.md](./steps/02-create-branch.md) | Create planning branch | Both |
| 3 | [03-capture-problem.md](./steps/03-capture-problem.md) | Capture problem and requirements | Both |
| 4 | [04-define-goals.md](./steps/04-define-goals.md) | Define goals, constraints, non-goals | Both |
| 5 | [05-search-related-work.md](./steps/05-search-related-work.md) | Technical research & related work | Both |
| 6 | [06-update-task-with-research.md](./steps/06-update-task-with-research.md) | Update task.md with research findings | Both |
| 7 | [07-iterative-refinement.md](./steps/07-iterative-refinement.md) | Add technical detail until implementation-ready | Both |
| 8 | [08-pipeline-tests.md](./steps/08-pipeline-tests.md) | Define pipeline test requirements | Both |
| 9 | [09-architectural-context.md](./steps/09-architectural-context.md) | Create architectural context diagram | Both |
| 10 | [10-acceptance-criteria.md](./steps/10-acceptance-criteria.md) | Define acceptance criteria | Both |
| 11 | [11-risks-and-dependencies.md](./steps/11-risks-and-dependencies.md) | Risk assessment and dependencies | Both |
| 12 | [12-sequencing-and-scope.md](./steps/12-sequencing-and-scope.md) | Implementation phases and scope | Both |
| 13 | [13-create-technical-plan.md](./steps/13-create-technical-plan.md) | Create plan.md using task-planning skill | Both |
| 14 | [14-sizing.md](./steps/14-sizing.md) | Size task using task-sizing skill | Both |
| 15 | [15-finalize-task.md](./steps/15-finalize-task.md) | Review plan, quality gates, user approval | Both |
| 16 | [16-commit-and-publish.md](./steps/16-commit-and-publish.md) | Commit, push, create MR | Both |

## Inputs

- **Required**: Task definition in `work/01-pending-planning/{TASK_ID}-<slug>/task.md`
- **Required**: Target component(s) (Manager, Server, App, or cross-cutting)
- **Optional**: Related documentation, issues, constraints

## Outputs

- `work/02-planning/{TASK_ID}-<slug>/plan.md` — Technical implementation plan
- Supporting documentation (diagrams, research notes, etc.)
- Updated task definition if requirements evolve
- Merge request from planning branch to main

## Operating Principles

- **TDD Required**: Comprehensive test inventory drives implementation
- **Small, Reversible Steps**: Break complex work into implementable phases
- **Explicit Versions**: Document all version requirements
- **Link Everything**: Cross-reference tasks, docs, specs, issues
- **Clarity Over Cleverness**: Prefer simple, understandable approaches
- **Technical Decision Making**: Make all implementation decisions during planning

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
