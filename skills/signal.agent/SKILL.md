+++
name = "signal.agent"
description = "Use this skill when you need to capture a new observation, problem, opportunity, or risk and transform it into a validated Signal Seed. Activates when someone says 'let's capture a signal,' 'I noticed something,' 'there's a problem with,' 'new opportunity,' or 'we should look at.' Does NOT shape signals into specifications — use Explore Agent for that."
license = """
© 2026 Endava (UK) Limited. All rights reserved.
Endava Confidential and Proprietary. May include Endava trade secrets.
Internal reference / reusable material.
Use is restricted to authorised persons on a need-to-know basis for approved Endava or project purposes.
Do not disclose outside authorised recipients except under applicable confidentiality obligations. See the LICENSE.md file in this repository.
"""
+++

> **Project paths**: This skill writes artifacts to directories that depend on the target project.
> Replace `{signals-dir}` and `{clients-dir}` with the actual paths in your project
> (e.g. `signal/signals/` and `explore/clients/`).

# Signal Agent

Transform raw observations into validated Signal Seeds with 7 completion criteria and explicit routing decisions.

## Step Execution Rule

**ONE STEP AT A TIME. AGENT PROBES FIRST, HUMAN PROVIDES.**

❌ Reading ahead ❌ Multiple steps ❌ Skipping step files ❌ Designing solutions during Signal phase

## Overview

**Who this is for**: Anyone capturing a new observation entering DavaFlow.

**Interaction model**: Human-First with Agent Guidance
- **Strategic decisions** (Human leads): What to capture, claim classification, routing decision, sponsor identification
- **Tactical execution** (Agent leads): Structuring the Signal Seed, assessing completion gaps, running route-readiness checks
- **Pattern**: Agent probes → Human provides → Agent structures → Human confirms

**Input conversion rule**: All inputs must be converted to plain text before ingestion, regardless of original format. Binary documents require the Document Ingestion skill.

## When to Use

- Capturing a new observation, problem, opportunity, or risk
- A stakeholder mentions something worth investigating
- New information arrives that could trigger Explore
- Opening phrase: `Let's capture a signal...` | `Signal` | `Capture`

## Inputs

**Primary**: Raw observations — conversations, documents, client profiles, interactive Q&A.

**Supported input types**:
- Conversations (verbal/written observations)
- Documents (`.docx`, `.pdf`, `.pptx`, `.txt`, `.md`, `.xlsx`, `.csv`, images, email exports)
- Client Profiles (existing from `{clients-dir}/` or new)
- Interactive input (guided Q&A, default mode)

## Process Steps

| # | Step | File | Purpose |
|---|------|------|---------|
| 1 | Signal Capture | [01-signal-capture.md](./steps/01-signal-capture.md) | Transform raw input into a Signal Seed document |
| 2 | Signal Strengthen | [02-signal-strengthen.md](./steps/02-signal-strengthen.md) | Fill gaps in 7 completion criteria |
| 3 | Signal Route | [03-signal-route.md](./steps/03-signal-route.md) | Route-Readiness verification and routing decision |
| * | Signal Clarify | [04-signal-clarify.md](./steps/04-signal-clarify.md) | Challenge and reclassify assumptions (optional, any time after capture) |

## Common Capture Patterns

**Conversation mode (default):**
User describes an observation verbally → agent probes for evidence, actors, impact → agent structures into Signal Seed → user confirms/corrects each section

**Document mode:**
User provides documents (.pdf, .docx, etc.) → invoke Document Ingestion skill first → convert to text → extract observations → structure into Signal Seed → user validates extracted content

**Client profile mode:**
Existing client profile in `{clients-dir}/` or new client information → agent loads/creates profile → captures signal in client context → links Signal Seed to client profile

## 7 Completion Criteria

1. **Fundamentals** — Type, importance, source, duplicates resolved
2. **Evidence & Context** — Corroborating sources, no contradictions, historical patterns, all claims tagged
3. **Framing & Meaning** — Scope, actors, constraints, outcomes all clear
4. **Strategic Alignment** — Sponsor confirmed, North Star link, market/regulatory tracked
5. **Readiness & Feasibility** — Urgency, technical/data feasibility, risk of inaction
6. **Prioritisation** — Importance/urgency scored (1-5) with mandatory rationale, position defined
7. **Explore Type** — Fast Lane / Explore Readiness Check / Diverge-Converge selected

## Templates

- **Signal Seed**: Use the template in [templates/signal-seed.md](./templates/signal-seed.md) when creating a new Signal Seed in Step 1

## Outputs

| Step | Artifact | Location |
|------|----------|----------|
| Capture | Signal Seed | `{signals-dir}/YYYYMMDD-[slug].md` |
| Capture (optional) | Client Profile | `{clients-dir}/[client-slug].md` |
| Strengthen | Updated Signal Seed with gaps filled | `{signals-dir}/YYYYMMDD-[slug].md` |
| Route | Signal Seed with Routing Decision section | `{signals-dir}/YYYYMMDD-[slug].md` |

## Process Modes

### Governed Mode (Default)
Interactive session with stops at each completion criterion and routing decision.

### Delegated Mode
Agent runs Capture + Strengthen autonomously, presents results at Route step for human decision.

## Gotchas

- **Claim tagging must happen during capture, not after**: If you defer tagging to a later step, untagged claims propagate into the Signal Seed and downstream consumers treat them as facts. Tag every statement as it enters the document.
- **Binary documents require the Document Ingestion skill first**: Don't attempt to read `.pdf`, `.docx`, `.pptx`, or `.xlsx` directly. Load the Document Ingestion skill, convert to text, then proceed with Signal Capture. Skipping this produces garbled or incomplete signals.
- **"I noticed something" is a Signal — "let's fix it" is not**: Signal phase qualifies the problem, not the solution. If the user starts describing solutions, redirect: capture the underlying observation, then let Explore shape solutions.
- **Low-confidence Signals must not be routed to Explore**: If completion criteria show significant gaps (3+ criteria Partial/Missing) and confidence is Low, the Signal needs more completion work — not routing. Route-Readiness verification will catch this, but don't waste time on routing prep for incomplete Signals.
- **Importance and urgency scores without rationale are incomplete**: A score of "4" means nothing without explaining why. Both scores require mandatory written rationale — one sentence minimum explaining the reasoning.
- **Duplicate detection happens at capture, not routing**: Check for existing active Signals with overlapping observations before creating a new Signal Seed. Merging after the fact is significantly more work.

## Violation Checks

- ❌ Claims left untagged in Signal Seed: silent assumptions in the pipeline
- ❌ Agent designs solutions during Signal phase: wrong phase for solution design
- ❌ Low-confidence Signal routed to Explore: insufficient validation
- ❌ Importance or urgency scores lack rationale: incomplete prioritisation
- ❌ Signal routed without confirmed sponsor appetite: no ownership
- ❌ Explore Type recommendation not set: no lane assignment for Explore
- ❌ Duplicate Signal created for existing active Signal: merge required
- ❌ Binary document processed without conversion: ingestion integrity violated

## Quality Gates

- [ ] Signal Seed created with all required sections
- [ ] All claims tagged as `[ASSUMPTION]`, `[OPINION]`, or `[FACT]`
- [ ] 7 completion criteria assessed with clear status
- [ ] Importance and urgency scores include written rationale
- [ ] Explore Type recommendation set via score-based checklists
- [ ] Sponsor appetite confirmed (required for Explore routing)
- [ ] Signal Summary appended before routing
- [ ] Routing decision made explicitly with named approver

## Eval Cases

### Trigger Queries

**Should trigger:**
- "I noticed something weird with the authentication flow"
- "Let's capture a signal about a new market opportunity"
- "There's a problem with how we handle client onboarding"
- "We should look at competitor X's new feature"
- "Signal" / "Capture"
- "The PM confirmation scan found 8 unverified assumptions in the Signal Seed. Can you clarify them?"

**Should NOT trigger:**
- "Write the PRD for the authentication redesign"
- "Create an architecture decision record for the database migration"
- "Run a governance check on the project"
- "Deploy the fix for the onboarding issue"

### Output Eval: Interactive Capture

**Prompt**: "I noticed that our client onboarding takes 3 weeks but competitors do it in 3 days. Let's capture this as a signal."

**Expected**: Agent enters conversation mode, probes for evidence/actors/impact, tags all claims, creates Signal Seed document.

**Assertions**:
1. Signal Seed has all required sections per `templates/signal-seed.md`
2. Every claim is tagged `[FACT]`, `[OPINION]`, or `[ASSUMPTION]`
3. Initial completion criteria status assessed
4. No solution design attempted during Signal phase

### Output Eval: Document Mode

**Prompt**: "Here's a PDF report from the market research team. Can you capture this as a signal?"

**Expected**: Agent detects document mode, requests Document Ingestion skill, converts to text, then captures.

**Assertions**:
1. Agent does NOT read PDF directly
2. Document Ingestion skill invoked for conversion
3. Converted text used as input for capture
4. Binary document input noted in Signal Seed source field

### Output Eval: Route-Readiness

**Prompt**: "Route the widget-redesign signal to Explore"

**Expected**: Agent loads signal, runs self-audit against Quality Gates, performs route-readiness verification.

**Assertions**:
1. Self-audit runs before route-readiness (Step 3, Action 2)
2. Sponsor appetite checked
3. All 7 completion criteria verified
4. Routing decision includes named approver

## Links

**Within this skill group:**
- [PM Confirmation Agent](../pm.agent/) - Downstream: governance scanning

**External dependencies (in main skills/):**
- Explore Agent (`explore.agent`) - Downstream: shapes validated Signals
- Document Ingestion (`explore.util.document-ingestion`) - Utility: binary document conversion

