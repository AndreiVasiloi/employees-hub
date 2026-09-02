# Task Implementation

> Collaborative, test-driven implementation of a planned task — one test at a time.

## What It Does

Task Implementation takes a task with a completed technical plan and produces working, tested, merge-ready code. It runs as a structured pair programming session between you and the LLM, enforcing a discipline that keeps the implementation incremental, traceable, and verifiable at every step.

**Theory**: The biggest implementation risks aren't writing the wrong code — they're skipping tests until the end, making changes too large to reason about, and discovering integration failures only after everything is built. This process addresses those risks structurally: tests are written first and must fail before any implementation begins, changes stay small enough to understand and revert if needed, and real integration points are verified as you go — not mocked and deferred. The process doesn't just encourage these disciplines; it enforces them as the shape of every session.

## When to Use It

Use this process when a task has completed planning, passed Task Check, and is ready for implementation. It is typically delegated to by the Govern Agent once a task that has cleared both of those stages is selected.

**What you need before starting:**
- A completed task definition and technical plan
- Access to the codebase the task modifies

## What to Expect

The process runs in two modes:

**Governed mode** (default) — interactive pair programming with step-by-step confirmation. You approve findings and decisions as the session progresses. Use this for complex implementations, security-sensitive changes, unfamiliar codebases, or wherever you want to stay closely in the loop.

**Delegated mode** — autonomous execution within guardrails. The LLM implements end-to-end with self-reflection checkpoints and presents results for your review. Time-boxed to keep scope contained. Use this for straightforward tasks with a clear, unambiguous plan.

In both modes, the process works the same way: all tests are written first and confirmed failing before any implementation code is written. Then, one test at a time, the implementation is built until that test passes — then integration is verified before moving to the next. This loop continues until every test in the inventory passes. The full test suite (not just the new tests) must pass before the session closes.

The session concludes with a summary of what was built and a merge request ready for review.

## What Comes Out

- **Working code** with passing tests for all new behaviour
- **Updated documentation** relevant to what changed
- **Implementation summary** capturing what was built, decisions made, and any divergences from the plan
- **Merge request** with a complete description linking code to the task and acceptance criteria

## Boundaries

- **Does not** begin without a completed technical plan — requirements-only tasks must go through Task Planning first
- **Does not** write tests after implementation — tests come first, always
- **Does not** implement multiple tests in a single pass — the per-test loop is the unit of progress
- **Does not** close until the full test suite passes — not just the new tests
- **Does not** review the resulting code for merge readiness — that belongs to Task Review

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:govern.proc.task-implementation:0.2.2:2026-09-02T06:10:56Z -->
