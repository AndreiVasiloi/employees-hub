# Signal Agent

> The entry point for all new observations entering Dava.Flow.

## What It Does

The Signal Agent captures raw observations — problems noticed, opportunities spotted, risks identified, things worth investigating — and transforms them into structured, validated Signal Seeds. A Signal Seed is the entry currency for the Explore phase: without a validated signal, there's nothing to explore.

It has two jobs:

**Routing** — it walks you through the full lifecycle of a signal: from first capture through strengthening the evidence to making an explicit routing decision (send to Explore, deprioritise, or hold). You're never left with a half-formed observation and no clear next action.

**Context steering** — the agent adapts to what you bring. When observations arrive as documents rather than conversation, it brings in the right tools for converting them to usable text. When a signal is tied to a client or account, it pulls in the relevant client context. The signal capture process runs in the context of your project, not in a vacuum.

**Theory**: Not every observation deserves a full Explore cycle. The Signal phase acts as a qualification gate — it ensures that what reaches the Explore team is coherent, properly evidenced, correctly scoped, and has a sponsor willing to own it. Raw observations are a jumble of facts, opinions, and assumptions; the Signal Agent makes those distinctions explicit and assesses the observation's strength before any routing decision is made. This discipline prevents Explore teams from chasing noise.

## Who Uses It

Analysts, leads, and developers who have observed something worth capturing — whether from a client conversation, an internal review, a market signal, competitor intelligence, or a technical discovery.

## How to Start

| Trigger | Platform |
|---------|----------|
| `Let's capture a signal` | Any LLM IDE |
| `Signal` or `Capture` | Any LLM IDE |

The agent also activates contextually when someone says things like "I noticed something," "there's a problem with," or "new opportunity."

## What to Expect

You can approach signal capture in several ways:

**Conversation mode** (default) — describe what you've observed and the agent probes for evidence, actors, and impact through structured questions. You confirm or correct each section as it takes shape.

**Document mode** — if you have research reports, meeting notes, competitor analyses, or client documents, the agent helps extract and structure the relevant observations from them. Binary documents (PDFs, Word files, slide decks) require a conversion step before capture begins; the agent handles this automatically.

**Client profile mode** — when the observation is tied to a specific client or account, the agent links the signal to that client's context, creating or updating a profile as needed.

As capture progresses, every claim is tagged as a fact, opinion, or assumption. This happens during capture — not as a cleanup step afterward. Once structured, the agent assesses the signal against a set of completion criteria covering evidence quality, scope clarity, strategic alignment, urgency, and prioritisation. As part of that assessment, an Explore Type recommendation is set — Fast Lane, Explore Readiness Check, or Diverge/Converge — which signals how intensive the Explore phase should be when the signal arrives there. When the signal is strong enough across all criteria, an explicit routing decision is made with a named approver.

The process runs in two modes: **Governed mode** (default) is fully interactive, stopping at each completion criterion for your input and confirmation. **Delegated mode** runs capture and strengthening autonomously, presenting the results for your decision at the routing step.

**The exit state**: a Signal Seed document with a clear routing decision and an identified sponsor — ready to hand off to the Explore Agent.

## What Comes Out

- **Signal Seed** — a structured document capturing the observation, its evidence, completion assessment, Explore Type recommendation, and routing decision
- **Client Profile** (optional) — created or updated when the signal relates to a specific client or account

## Boundaries

- **Does not** design or suggest solutions — the Signal phase qualifies problems, not answers; that belongs to Explore
- **Does not** route incomplete or low-confidence signals to Explore — completion criteria must be met first
- **Does not** treat all inputs as equally valid — claims are explicitly distinguished as facts, opinions, or assumptions throughout
- **Does not** ingest binary documents without conversion — all inputs are converted to plain text before processing
