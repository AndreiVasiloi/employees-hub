# Flow Agent

> The universal starting point for any Dava.Flow session.

## What It Does

The Flow Agent is the single entry point you use when you want to start a Dava.Flow session but don't need to specify upfront which phase of work you're entering. Say "Let's Flow," and it handles the rest.

It has two jobs:

**Routing** — it presents a phase selection menu and routes you to the right phase agent: Signal, Explore, Govern, or Evolve. You always land somewhere actionable — the Flow Agent never leaves you wondering what to do next.

**Setup check** — before presenting the menu, it checks whether your project warehouse has completed first-run configuration. If it hasn't, it routes you through setup first. You only ever see the phase menu once the warehouse is ready to use.

The Flow Agent does not perform any work itself. Its purpose is orientation: one check, one question, one handoff.

## Who Uses It

Anyone — developers, leads, analysts, architects, designers — who wants to start a session without having to know in advance which Dava.Flow phase applies to what they're about to do. It's also the recommended starting point for people new to the project or to Dava.Flow itself.

## How to Start

| Trigger | Platform |
|---------|----------|
| `Let's Flow` | Any LLM IDE (Windsurf, Cursor, etc.) |
| `Flow` or `flow` | Any LLM IDE |
| `/flow` | Windsurf |
| `$flow` | Codex |

## What to Expect

When triggered:

1. The agent checks whether your warehouse needs first-run setup. If it does, setup runs before you see anything else — this only happens once.
2. You're presented with a phase selection menu: Signal, Explore, Govern, or Evolve. In tools that support it, this is interactive; otherwise it's a numbered list.
3. You select a phase. The Flow Agent installs the phase agent if it isn't already available, announces the handoff, and steps aside. The phase agent takes over completely.

The entire interaction is intentionally brief. One checkpoint, one question, then you're in.

## What Comes Out

The Flow Agent produces no artifacts. Its output is an active, loaded phase agent session ready to begin work.

## Boundaries

- **Does not** perform any phase work — all work happens in the phase agent it hands off to
- **Does not** ask about your task or goals before routing — that belongs to the phase agent
- **Does not** bypass setup if the warehouse isn't configured — setup is always first
- **Does not** load more than one phase agent — you make one selection, then the Flow Agent is done
