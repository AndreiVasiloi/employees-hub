# Task Planning

> Transform a task definition into an implementation-ready technical plan.

## What It Does

Task Planning takes a task definition — which describes *what* needs to be built — and produces a detailed technical plan that describes *how* to build it. By the time this process completes, every major technical decision has been made and documented. Nothing is left to be figured out during coding.

**Theory**: Implementation quality degrades when decisions get deferred. When an engineer hits an ambiguous requirement or an unresolved architecture question mid-implementation, they either guess or stop — both are expensive. Task Planning moves all that decision-making to a dedicated, lower-stakes moment before a line of code is written. The plan becomes the contract for implementation: complete enough that the implementer knows exactly what to build and how to verify it.

## When to Use It

Use this process when a task definition has been written and approved, and the task is waiting for a technical plan before implementation can begin. It is typically delegated to by the Govern Agent once a task is selected.

**What you need before starting:**
- A completed task definition covering the problem, goals, and requirements
- Knowledge of which part of the codebase the task touches

## What to Expect

The process runs in two modes:

**Governed mode** (default) — interactive and collaborative. The process pauses at meaningful decision points for your input and confirmation before proceeding. Use this for complex or high-risk tasks, unfamiliar domains, or when the technical approach genuinely needs human judgement.

**Delegated mode** — autonomous within guardrails. The process makes decisions independently and presents results for review at the end rather than step-by-step. Use this for straightforward tasks with clear requirements where the technical path is unambiguous.

In both modes, the process works through: understanding the problem and constraints in depth, researching related work and existing patterns in the codebase, defining a test inventory (what must be verified and how), making architecture and approach decisions, assessing risks and dependencies, and sequencing the work into implementable phases.

The output is reviewed and approved before the process closes — the plan must be genuinely implementation-ready, not just complete on paper.

## What Comes Out

- **Technical plan** — the full implementation approach: decisions made, test inventory, implementation phases, architecture context, acceptance criteria, risks and dependencies, and sizing estimate
- **Updated task definition** — if the planning process surfaces new constraints or requirements, the task definition is updated to reflect them
- **Merge request** — a MR from the planning branch to the project's main branch, ready for review alongside the plan

## Boundaries

- **Does not** write any code — that belongs to Task Implementation
- **Does not** review the plan for standards alignment — that belongs to Task Check
- **Does not** define the requirements — those come from the task definition that enters this process
- **Does not** complete until the plan is genuinely implementation-ready — a rough plan is not an exit condition

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-planning:0.2.0:2026-09-01T12:25:50Z -->
