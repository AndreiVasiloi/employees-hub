# Task Check

> Review a completed technical plan for completeness and standards alignment — before implementation begins.

## What It Does

Task Check is a pre-implementation quality gate. It reviews the output of Task Planning — the task definition, technical plan, test inventory, and supporting documentation — to determine whether the task is genuinely ready to implement. It produces a formal verdict that either clears the task for implementation or sends it back for rework.

**Theory**: Deficiencies caught in a plan are far cheaper to fix than deficiencies discovered mid-implementation. A missing acceptance criterion, a plan that contradicts an architecture decision, or a test inventory with obvious gaps — all of these are quick to correct on paper and expensive to discover in code. Task Check exists to make the pre-implementation moment explicit and deliberate: a distinct activity, not a quick skim before getting started.

## When to Use It

Use this process after Task Planning completes and before Task Implementation begins. It is typically delegated to by the Govern Agent as part of the task workflow.

**What you need before starting:**
- A completed task definition and technical plan from the planning process
- Access to the project's specifications, architecture decisions, and any relevant PRDs for standards comparison

## What to Expect

The process runs in two modes:

**Governed mode** (default) — interactive, with findings presented for discussion at each area of review before proceeding. Use this for complex tasks, critical features, or unfamiliar domains where you want to evaluate the findings yourself.

**Delegated mode** — autonomous review within guardrails, with findings surfaced at the end. Use this for straightforward tasks where the plan is expected to be solid and you want a quick independent assessment.

The review covers: whether all planning artifacts are present and well-formed, whether the task definition is clear and the goals are concrete, whether the technical plan is complete enough to implement without discovering missing decisions mid-build, whether the plan aligns with project decisions and specifications, whether the architecture approach and test strategy are sound, and whether risks and dependencies have been assessed.

At the end, a verdict is issued:

| Verdict | Meaning |
|---------|---------|
| **Ready** | No blocking issues — proceed to implementation |
| **Ready with changes** | Minor issues to address first, then proceed |
| **Rework** | Significant issues — return to planning |

The review findings are committed to the task for traceability, regardless of the verdict.

## What Comes Out

- **Verdict** — a clear disposition: Ready, Ready with changes, or Rework
- **Findings** — specific issues identified, each with an owner and recommended action
- **Review document** — committed to the task folder as a permanent record

## Boundaries

- **Does not** modify the task definition or plan — it reviews and recommends, never edits
- **Does not** review code — that belongs to Task Review (which runs *after* implementation)
- **Does not** skip standards alignment even for simple-looking tasks — the check is always complete
- **Does not** approve tasks with missing required planning artifacts — all artifacts must be present before the review begins

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-check:0.2.1:2026-09-02T06:10:56Z -->
