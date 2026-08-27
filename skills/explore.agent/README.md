# Explore Agent

> Transforms validated Signals into Govern-ready specifications, with the steering team in the lead.

## What It Does

The Explore Agent guides a steering team through the full Explore phase: from a validated Signal through discovery, ideation, solution design, and a prioritised epic backlog. When an Explore session closes, the Context Warehouse is fully populated — PRDs, high-level architecture, decisions, test strategy, and actionable epics — with nothing left for the Govern team to discover before they can begin.

It has two jobs:

**Routing** — it keeps the steering team oriented throughout what is intentionally a long, multi-stage process. Discovery, ideation, architecture, and backlog are distinct activities with different participants and different outputs. The agent always knows where you are, what's been completed, what the current activity requires, and what comes next. It selects and sequences activities based on the Explore Type the team chose — so lighter Signals get a proportionally lighter process, and complex Signals get the full depth.

**Project context steering** — the processes that run inside an Explore session are generic; the agent makes them specific to your project. It loads domain analysis skills when multi-domain naming must be consistent, brings in architecture context when existing system constraints need to be carried through to the High-Level Design, activates design pipeline skills when the Explore Type calls for experience design, and ensures that any project-specific compliance or regulatory constraints surface in the right activities. The steering team sees a process calibrated to their Signal and their project — not a one-size-fits-all template.

**Theory**: Exploration quality determines governance quality. Rushing discovery or skipping ideation produces PRDs built on assumptions, architectures that haven't accounted for domain boundaries, and epics that surface blockers mid-implementation. The Explore Agent enforces a deliberate, sequenced process where each stage gates the next. Crucially, the steering team — not the agent — makes every strategic call. The agent's role is to structure the thinking and execute selected activities; human judgment drives what gets explored, scoped, and approved.

## Who Uses It

Steering teams — at minimum a Product Manager, Architect, and Lead Engineer — running the Explore phase for a validated Signal. For complex Explores, UX Designers, Domain Experts, and Compliance Leads join the steering team.

## How to Start

| Trigger | Platform |
|---------|----------|
| `Let's explore this...` | Any LLM IDE |
| `Let's start an exploration...` | Any LLM IDE |
| `Let's assess this opportunity...` | Any LLM IDE |

The agent is also reached via the Flow Agent when you select the Explore phase.

## What to Expect

Before any work begins, the agent adapts its intensity to your Signal through three Explore Types:

- **Fast Lane** — well-scoped Signals with low technical risk and aligned stakeholders
- **Explore Readiness Check (ERC)** — partially defined scope with some unknowns to resolve
- **Diverge/Converge** — ambiguous, high-risk, or multi-stakeholder Signals that need structured exploration before any design can happen

The steering team selects which activities to run and at what depth — upfront, before execution begins. The agent then executes exactly what was selected: no more, no less. Requests for unselected artifacts are declined.

The session moves through several broad stages, each producing its own set of outputs before gating into the next. Discovery informs ideation; ideation informs solution design; solution design informs architecture and backlog. The agent surfaces readiness checks at key transitions — if a stage isn't complete enough to support the next, it says so before proceeding.

At the end, the agent runs a Govern Readiness Check to confirm the Context Warehouse is fully populated. Only when that check passes is the Explore session considered closed.

**Refinement**: After the session closes, any artifact can be incrementally updated without re-running the full process. The Explore Agent supports returning to refine or extend specific outputs when new information arrives or stakeholder feedback requires a targeted update.

**The exit state**: a Govern Readiness Check confirmed, with every selected artifact produced, stored, and traceable — and the Govern team able to begin without discovering anything new.

## What Comes Out

Depending on the Explore Type and activities selected by the steering team, outputs include some or all of:

- Discovery plan and capability area map
- Context documentation, stakeholder maps, and journey maps
- Domain analysis and glossary (for multi-domain Signals)
- Hypothesis documentation
- Architecture context assessment
- Ideation artifacts: framings, evaluated concepts, refined ideas
- Product Requirements Documents (per domain or subdomain)
- Experience design artifacts: information architecture, user flows, wireframes, hi-fi handoff
- High-Level Design documents
- Architecture Decision Records
- Test strategy and DevOps strategy
- Epic backlog with tasks ready for Govern

## Boundaries

- **Does not** handle implementation planning or governance work — those belong to the Govern phase
- **Does not** begin without a passing Signal Acceptance Gate — a rough brief is accepted, but all gates still apply
- **Does not** produce artifacts for activities the steering team did not select in the opening activity selection
- **Does not** make design decisions during discovery — architectural context is captured in discovery, not designed; design belongs in later stages
- **Does not** close the session until the Govern Readiness Check passes
