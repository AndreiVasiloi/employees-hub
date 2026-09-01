+++
name = "explore.util.problem-classification"
description = "Use this skill at the start of every brainstorm session to classify the problem along 4 dimensions — definition level, solution space, novelty requirement, and complexity — then route to the right methods and pathways for the session. Also relevant when someone says 'how should we approach this,' 'what method fits,' or 'I don't know where to start.' Does NOT generate ideas or solutions — it determines the approach so the right ideation methods are selected."
license = "Proprietary. See LICENSE.md"
+++

# Problem Classification

Classify brainstorming problems along 4 dimensions and route to appropriate methods and pathways.

## When to Use

Load this skill at the start of every brainstorm session (Step 1: Frame). It determines which methods, primitives, and pathways to use for the entire session.

## Inputs to Request (if missing)

1. **Context baseline** — `explore/explore-[slug]/context.md` (problem statement, scope, constraints)
2. **User state** — fresh / informed / stuck / frustrated
3. **Prior context** — greenfield / building on previous work

**Strongly recommended** (enhance classification accuracy if available):
- **Hypothesis** — `explore/explore-[slug]/hypothesis.md` (validated hypotheses as framing context)
- **Domain analysis** — `explore/explore-[slug]/domain-analysis.md` (entity relationships, domain rules)
- **Technical feasibility** — `explore/explore-[slug]/technical-feasibility.md` (technical constraints and opportunities)
- **Regulatory compliance** — `explore/explore-[slug]/regulatory-compliance.md` (compliance constraints)

If specific artifact files are unavailable, accept problem statement and constraints from the steering team directly.

## Procedure

### Step 1: Classify Along 4 Dimensions

#### Dimension 1: Definition Level

| Level | Description | Signal phrases |
|-------|-------------|----------------|
| **Well-defined** | Clear goal, known constraints, measurable outcome | "optimize", "improve", "fix", "reduce" |
| **Semi-defined** | Goal is known but path is open | "design", "build", "create a way to" |
| **Ill-defined** | Even the goal is fuzzy or contested | "figure out", "explore", "what should we", "I don't know where to start" |

#### Dimension 2: Solution Space

| Type | Description | Signal |
|------|-------------|--------|
| **Narrow** | Few viable solutions, need to find the right one | Technical constraints, regulatory limits |
| **Wide** | Many viable solutions, need to find the best one | Greenfield, strategic choices |
| **Contradictory** | Competing requirements that seem mutually exclusive | "we need X but also Y", tradeoffs |

#### Dimension 3: Novelty Requirement

| Level | Description | Signal |
|-------|-------------|--------|
| **Incremental** | Improve what exists | "iterate", "enhance", "version 2" |
| **Adjacent** | New for us, exists elsewhere | "what does [industry] do?", "best practices" |
| **Breakthrough** | New to the world or domain | "disrupt", "reimagine", "from scratch" |

#### Dimension 4: Complexity

| Level | Description | Signal |
|-------|-------------|--------|
| **Simple** | Few parameters, clear dependencies | Single feature, one user type |
| **Complicated** | Many parameters, but knowable | System design, multi-stakeholder |
| **Complex** | Emergent behavior, unpredictable interactions | Platform strategy, ecosystem design |

### Step 2: Quick Classification Checklist

Fill out this checklist for the problem:

```
Definition level: well / semi / ill-defined
Solution space: narrow / wide / contradictory
Novelty needed: incremental / adjacent / breakthrough
Complexity: simple / complicated / complex
User state: fresh / informed / stuck / frustrated
Prior context: greenfield / building on previous work
```

### Step 3: Method Routing

Use the classification to select methods from this routing table:

| Problem Profile | Primary Method | Supporting Methods | Pathway |
|----------------|----------------|-------------------|---------|
| **Well-defined + Narrow + Incremental** | SCAMPER | Reverse Brainstorm | Persistence |
| **Well-defined + Narrow + Contradictory** | TRIZ Lite | Constraint Flip | Persistence |
| **Well-defined + Wide + Incremental** | Morphological Analysis | Affinity + Impact-Effort | Persistence |
| **Semi-defined + Wide + Adjacent** | HMW + Synectics | Round-Robin Perspectives | Flexibility then Persistence |
| **Semi-defined + Wide + Breakthrough** | Synectics/Bisociation | Crazy 8s then Blend | Flexibility |
| **Semi-defined + Contradictory** | TRIZ + Reframe | Six Hats | Persistence |
| **Ill-defined + Wide + Any novelty** | HMW + Starbursting | Crazy 8s then Affinity | Flexibility first |
| **Ill-defined + Complex + Breakthrough** | Full meta-framework | All primitives, multiple loops | Flexibility then Persistence then Flexibility |
| **Any + Stakeholder-heavy** | Round-Robin + Six Hats | HMW per stakeholder | Mode switching |
| **Any + User stuck/frustrated** | Reverse Brainstorm | Provocation + Random Entry | Stimulation-heavy |

If the classification is ambiguous, default to **HMW + Crazy 8s** as a flexible starting point.

### Step 4: Pathway Selection

**Start with Flexibility when:**
- Problem is ill-defined
- User hasn't articulated constraints clearly
- It's early in the process
- User says "I have no idea where to start"
- Previous attempts have been too narrow

**Start with Persistence when:**
- Problem is well-defined with clear parameters
- User already has a direction and wants to explore deeply
- There's an existing concept to improve
- Constraint space is tight

**Use Mode Switching when:**
- Multiple stakeholders with different priorities
- User oscillates between optimism and doubt
- Evaluation is getting muddled

**Use Stimulation-Heavy Start when:**
- User says they're stuck
- Previous brainstorming produced bland/obvious results
- Problem space feels exhausted
- User's first suggestion is very conventional

## Output Format

**Template:** `templates/classification-checklist.md`

Classification is embedded in the framing artifact (Step 1 output), not a standalone file. Use the template to structure the classification.

```markdown
## Problem Classification
- **Definition level**: [value]
- **Solution space**: [value]
- **Novelty needed**: [value]
- **Complexity**: [value]
- **User state**: [value]

## Method Routing
- **Primary method**: [method name]
- **Supporting methods**: [method names]
- **Pathway**: [Flexibility / Persistence / Mode Switching]
```

## Integration with Workflows

**Consumes**:
- **Context Documentation** — Problem statement, scope, and constraints
- **Hypothesis Documentation** — Validated hypotheses as framing context
- **Domain Analysis** — Entity relationships and domain rules as framing context
- **Technical Feasibility** — Technical constraints and opportunities
- **Regulatory Compliance** — Compliance constraints

**Produces** (consumed by):
- **Raw Ideas** (Step 3 Phase C) — Classification and method routing frame the divergence phase

**Trigger**: Brainstorm (Step 1: Frame) — Eager load at session start

## Validation Checklist

**Post-edit**: Re-run this checklist after any reclassification or override.

- [ ] All 4 dimensions classified with evidence from problem statement
- [ ] Signal phrases cited for each dimension choice
- [ ] Classification presented to steering team for confirmation
- [ ] Method routing matches the classification profile (or override documented with rationale)
- [ ] Pathway selection justified with user state and prior context
- [ ] Output embedded in framing artifact using the template

## Best Practices

**Do**: Use signal phrases from the problem statement to classify. If ambiguous, ask the steering team.
**Do**: Present the classification for confirmation before proceeding.
**Don't**: Guess at classification without evidence from the problem statement.
**Don't**: Skip classification — it determines the entire session's approach.

## Gotchas

- ⚡ **Ambiguity defaulting**: When a problem is ambiguous on a dimension, the agent tends to pick the "safer" middle classification instead of surfacing the ambiguity. Always ask the steering team when classification is unclear — a wrong classification sends the entire session down the wrong path.
- ⚡ **Classification lock-in**: Once classified, the agent treats the classification as immutable. If mid-session evidence contradicts the initial classification, surface it immediately — reclassification mid-session is better than completing the wrong approach.
- ⚡ **Method routing override without documentation**: When the steering team overrides the recommended method routing, the agent sometimes applies the override without documenting the rationale. Every override must be recorded with the reason — it's critical for post-session learning.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.util.problem-classification:0.1.2:2026-08-31T08:53:46Z -->
