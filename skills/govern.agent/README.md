# Govern Agent

> Orchestrates all Govern-phase work: finds what to work on, loads the right context, delegates to the right workflow, and validates the result.

## What It Does

The Govern Agent is the entry point for all implementation-phase work. Rather than asking you what needs doing or making judgements about priority, it discovers what's available — deterministically, from the project's task system — and presents the options. Once you select a task, it loads the right context and delegates to the right workflow. When the workflow completes, it validates the output independently before accepting the work.

It has two jobs:

**Routing** — it runs task discovery against the project's task system and always gives you a prioritised, actionable list of what can be worked on right now. There's no guessing, no prioritisation judgment from the agent, and no ambiguity about what's ready. You pick a task; the agent figures out everything else.

**Project context steering** — this is where the Govern Agent earns its place as an orchestration layer rather than a direct process call. Generic govern processes (planning, implementation, review) don't know anything about your specific project — your technology stack, your architectural patterns, your compliance requirements, your domain rules. The Govern Agent classifies what the selected task is actually about, then loads the knowledge and technology skills that match those concerns. A task touching the API layer gets API conventions loaded. A task in a regulated domain gets the relevant compliance context. A task involving a specific framework gets the framework guide. Only the context that applies to this task, not everything at once. Those processes then run with full project awareness.

**Theory**: Implementation work fails in predictable ways — wrong task priority, missing context at execution time, and outputs accepted without independent review. The Govern Agent addresses all three: task discovery is fully deterministic (no LLM heuristics), context is loaded precisely for the task at hand, and outputs are always validated by a separate subagent running in a clean context with no session history. The agent never accepts its own work.

## Who Uses It

Developers, leads, and architects doing Govern-phase work — planning tasks, writing code, running reviews, or checking consistency across artifacts.

## How to Start

| Trigger | Platform |
|---------|----------|
| `Let's Govern` | Any LLM IDE |
| `/govern` | Windsurf |
| `$govern` | Codex |

The agent is also reached via the Flow Agent when you select the Govern phase.

## What to Expect

At the start of every session, the agent reads your project's Govern configuration — the project-specific file that maps your technology stack, domain knowledge, and architectural context to the skills that represent them. This is what enables context steering; without this file the agent can bootstrap a starting configuration from a built-in template and prompt you to review it before continuing.

It then runs task discovery to find what's next and presents a prioritised list. You select one task. The agent identifies what kinds of concerns that task touches — domain logic, architecture, APIs, UI, security, implementation, or others — and loads only the knowledge and technology skills relevant to those concerns. Anything irrelevant stays out of context.

From there, it delegates to the appropriate workflow: planning if the task needs a technical plan before code can be written, implementation if you're ready to build, review if the work needs assessment, check if you're running consistency validation across artifacts, or pickup if you're resuming or claiming a task that's already in progress.

When the workflow finishes, a validation subagent runs in a completely clean context — it sees only the output artifacts and the project's acceptance criteria. No session history, no accumulated context from the working session. If validation passes, the session closes. If it flags issues, there's a refinement loop before re-validation.

**The exit state**: the selected task's workflow is complete, outputs have passed clean-context validation, and the work is accepted.

## What Comes Out

The Govern Agent itself produces no artifacts — it orchestrates:

- Technical plans (from the planning workflow)
- Code changes and tests (from the implementation workflow)
- Review feedback and approval or rejection decisions (from the review workflow)
- Consistency reports and issue lists (from the check workflow)
- Task context restoration and assignment (from the pickup workflow)

## Boundaries

- **Does not** guess what to work on — task discovery always comes from the project's task system, not from LLM inference
- **Does not** load all project context eagerly — only the knowledge and stack skills matched to the selected task's specific concerns
- **Does not** accept outputs without running independent clean-context validation
- **Does not** auto-advance from task selection — you always make the explicit choice of what to work on
- **Does not** run validation in the same context as execution — the validation subagent is always isolated
