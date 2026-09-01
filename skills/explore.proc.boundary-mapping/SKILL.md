+++
name = "explore.proc.boundary-mapping"
description = "Use this skill when starting a new HLD engagement and you need to establish who owns what — mapping service boundaries, truth hierarchy, upstream dependencies, and platform conventions before any design work begins. Also relevant when someone says 'where do the boundaries sit,' 'who owns this data,' or 'map the dependencies.' Does NOT produce architecture designs — use Design Sketch for that after boundaries are established."
license = "Proprietary. See LICENSE.md"
+++

# Boundary Mapping

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:

- Establish which input documents are canonical vs directional before any design work
- Map domain ownership boundaries across multiple bounded contexts
- Identify upstream dependencies and classify their contract status
- Catalog platform conventions from adjacent designs for inheritance decisions
- Surface ambiguities and open questions that must be resolved before drafting
- Build the foundational context layer for an HLD engagement

**Processes that use this skill**:
- Architecture Copilot (Step 1: Context & Design Direction — Action 2)

**Key principle**: Boundaries ARE the architecture — ownership clarity matters more than feature completeness. No design work should begin until the boundary map is validated.

## Inputs to Request

Before producing a boundary map, ensure you have:

1. **PRD or initiating requirements document** — the primary input artifact uploaded by the architect
2. **HLD template** — organizational standard structure from persistent knowledge
3. **Adjacent HLDs** — Clearing, Settlement, or equivalent bounded-context designs from persistent knowledge
4. **Domain glossary** — controlled vocabulary for the architecture domain (from persistent knowledge, if available)
5. **Slug** — project identifier for file naming (e.g., `payments-reconciliation`)

**STOP**: If the PRD or initiating requirements document is missing, request it from the architect before proceeding.

## Procedure

### Step 1: Read All Uploaded Artifacts

Ingest the PRD, HLD template, adjacent HLDs, domain glossary, and any other uploaded documents. Catalog what is available and what is missing.

```
Artifact Inventory

| # | Document | Available | Classification |
|---|----------|-----------|---------------|
| 1 | [Document name] | Yes / No | Canonical / Directional / Unknown |
| 2 | [Document name] | Yes / No | Canonical / Directional / Unknown |

Missing artifacts: [N]
Unknown classifications: [N]

How would you like to proceed?
- Classify now — tell me which documents are canonical vs directional
- Proceed with assumptions — I'll mark unknown classifications as [ASSUMPTION]
- Upload missing — provide the missing artifacts before I continue
```

**STOP**: Wait for architect to confirm artifact inventory and initial classifications.

### Step 2: Extract Truth Hierarchy

Classify every input document as canonical (authoritative) or directional (useful but overridable by architectural findings).

```
Truth Hierarchy

| # | Document | Classification | Rationale | Evidence |
|---|----------|---------------|-----------|----------|
| 1 | [Document name] | Canonical | [Why this is authoritative] | [VALIDATED] / [ASSUMPTION] |
| 2 | [Document name] | Directional | [Why this is overridable] | [VALIDATED] / [ASSUMPTION] |

How would you like to proceed?
- All correct — proceed to ownership matrix
- Reclassify — tell me which document and new classification
- Add context — I'll share why a classification should differ
```

**STOP**: Wait for architect to validate truth hierarchy. This is the highest-priority decision of the engagement.

### Step 3: Build Ownership Matrix

For each domain mentioned across all input artifacts, map what it owns, consumes, and produces.

```
Ownership Matrix

| # | Domain | Owns (authoritative) | Consumes (depends on) | Produces (hands off to) | Evidence |
|---|--------|---------------------|----------------------|------------------------|----------|
| 1 | [Domain] | [Decisions] | [Dependencies] | [Handoffs] | [VALIDATED] / [ASSUMPTION] |
| 2 | [Domain] | [Decisions] | [Dependencies] | [Handoffs] | [VALIDATED] / [ASSUMPTION] |

Domains identified: [N]
Ownership conflicts detected: [N]

How would you like to proceed?
- All correct — proceed to upstream dependencies
- Correct ownership — tell me which domain and what to change
- Add domain — tell me the domain name and what it covers
- Flag conflict — tell me which ownership overlap to resolve
```

**STOP**: Wait for architect to validate ownership matrix.

### Step 4: Map Upstream Dependencies

Identify every event, API, or data source this new domain needs from upstream. Classify each contract's status.

```
Upstream Dependencies

| # | Dependency | Source Domain | Type | Contract Status | Evidence |
|---|-----------|-------------|------|-----------------|----------|
| 1 | [Event/API/Data] | [Domain] | Event / API / Data | Exists / Needs Creation / PROVISIONAL | [VALIDATED] / [ASSUMPTION] |

Total dependencies: [N]
Confirmed contracts: [N]
PROVISIONAL (assumed, not confirmed): [N]
Needs creation: [N]

⚠️ PROVISIONAL dependencies are potential blockers. Each will be added to the Blocker Register.

How would you like to proceed?
- All correct — proceed to platform conventions
- Correct dependency — tell me which item and what to change
- Add dependency — tell me what's missing
- Confirm provisional — tell me which PROVISIONAL items are actually confirmed
```

**STOP**: Wait for architect to validate upstream dependencies.

### Step 5: Catalog Platform Conventions

Extract patterns from adjacent HLDs and recommend inheritance or deviation for each.

```
Platform Conventions

| # | Convention | Adjacent HLD Source | Pattern | Recommendation | Justification | Evidence |
|---|-----------|-------------------|---------|---------------|---------------|----------|
| 1 | [Eventing pattern] | [HLD name] | [Description] | Inherit / Deviate | [Why] | [VALIDATED] / [ASSUMPTION] |
| 2 | [Naming convention] | [HLD name] | [Description] | Inherit / Deviate | [Why] | [VALIDATED] / [ASSUMPTION] |

Conventions identified: [N]
Inherit: [N] | Deviate: [N]

How would you like to proceed?
- All correct — proceed to open questions
- Override recommendation — tell me which convention and your preferred decision
- Add convention — tell me about a pattern I missed
```

**STOP**: Wait for architect to validate convention decisions.

### Step 6: Compile Open Questions

List every ambiguity, gap, or unresolved item discovered during Steps 1-5.

```
Open Questions

| # | Question | Source | Impact | Blocking? | Proposed Resolution |
|---|----------|--------|--------|-----------|-------------------|
| 1 | [Question] | [Which step surfaced this] | [What it blocks or affects] | Yes / No | [How to resolve] |

Total open questions: [N]
Blocking questions: [N]

How would you like to proceed?
- Answer some questions — I'll provide answers to blocking questions
- Proceed with questions open — carry them forward as explicit gaps
- Add questions — I have additional questions to surface
```

**STOP**: Wait for architect to address blocking questions or approve carrying them forward.

### Step 7: Assemble and Validate Boundary Map

Write the complete boundary map to `explore/hlds/[slug]-boundary-map.md`. Run the validation checklist.

**Validation checklist** (re-run after any boundary map modification):

- [ ] Truth hierarchy covers every input document
- [ ] Every document classified as Canonical or Directional (no Unknown remaining)
- [ ] Ownership matrix covers every domain mentioned in the PRD
- [ ] No overlapping ownership claims without explicit resolution
- [ ] Every upstream dependency has a contract status
- [ ] All PROVISIONAL dependencies flagged for blocker register
- [ ] Platform conventions cataloged with inherit/deviate decision for each
- [ ] All open questions listed with impact and blocking classification
- [ ] Evidence tags ([VALIDATED] / [ASSUMPTION]) on every claim
- [ ] File written to correct path with correct slug

```
Boundary Map Complete

File: explore/hlds/[slug]-boundary-map.md
Documents classified: [N] ([N] canonical, [N] directional)
Domains mapped: [N]
Upstream dependencies: [N] ([N] confirmed, [N] PROVISIONAL)
Platform conventions: [N] ([N] inherit, [N] deviate)
Open questions: [N] ([N] blocking)
Validation status: [N] of [N] assumptions

Validation: [N] of 10 checks passed ✓

Ready for Design Sketch skill.
```

**STOP**: Wait for architect to confirm boundary map is complete and validated.

## Output Format

```
explore/hlds/[slug]-boundary-map.md
```

**Template**: `templates/boundary-map.md`

1. **Header** — HLD name, date, status (Draft/Validated), architect name
2. **Truth Hierarchy** — table of documents with classification and rationale
3. **Ownership Matrix** — table of domains with owns/consumes/produces
4. **Upstream Dependencies** — table of dependencies with source, type, contract status
5. **Platform Conventions** — table of conventions with source, recommendation, justification
6. **Open Questions** — table of questions with source, impact, blocking status, proposed resolution

## Templates

- `templates/boundary-map.md` — Output template for the boundary map artifact
- `templates/engagement-brief.md` — Template for capturing engagement context, quality attributes, and scope
- `templates/session-state.md` — Template for persisting session state across multi-session engagements
- `templates/truth-hierarchy.md` — Template for documenting the truth hierarchy and document authority classification

## Integration with Workflows

Architecture Copilot (Step 1: Context & Design Direction) loads this skill as the first domain skill (Lazy). It is loaded after the Decision Log and Blocker Register skills are initialized. The boundary map produced here feeds directly into the Design Sketch skill.

**Consumes**:
- **Decision Log** (`explore.util.decision-log`) — Receives existing decisions as context for boundary classification
- **Blocker Register** (`explore.util.blocker-register`) — Receives existing blockers for dependency awareness

**Produces** (consumed by):
- **Decision Log** (`explore.util.decision-log`) — Feeds truth hierarchy and ownership decisions as DEC-001 through DEC-00N
- **Blocker Register** (`explore.util.blocker-register`) — Feeds PROVISIONAL upstream dependencies as potential blockers
- **Design Sketch** (`explore.proc.design-sketch`) — Boundary map is the foundational context for sketch generation

## Best Practices

**Do**:
- Tag every claim with [VALIDATED] or [ASSUMPTION] — no unmarked assertions
- Surface ambiguities in Step 1, not after drafting has started
- Ask targeted questions when classifications are unclear — do not guess
- Mark PROVISIONAL dependencies explicitly — each becomes a blocker candidate
- Catalog conventions from ALL adjacent HLDs, not just the most similar one
- List open questions with impact assessment — not just the question itself

**Don't**:
- Begin HLD drafting before the boundary map is validated by the architect
- Treat all input documents as equally authoritative without classification
- Assume upstream contracts exist without evidence — mark them PROVISIONAL
- Skip the ownership matrix for domains that seem "obvious"
- Present assumptions as facts — always use evidence tags
- Resolve open questions yourself — surface them for the architect to decide

If you propose changes, keep them minimal and clearly scoped.

## Gotchas

- ⚡ **Phantom ownership**: When no team explicitly owns a boundary, the agent tends to assign it to the most-mentioned team. This creates false confidence. Always mark unowned boundaries as `UNRESOLVED` and escalate — never infer ownership.
- ⚡ **Stale adjacent HLDs**: Adjacent domain HLDs may reference contracts or events that have since been deprecated. Always verify contract currency before cataloging conventions — copying stale patterns propagates technical debt.
- ⚡ **Truth hierarchy inversion**: External vendor documentation is sometimes treated as higher-authority than internal architecture decisions. The truth hierarchy must reflect actual authority — vendor docs inform but do not override internal ownership decisions.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.boundary-mapping:0.1.2:2026-09-01T08:21:27Z -->
