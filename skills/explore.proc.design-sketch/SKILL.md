+++
name = "explore.proc.design-sketch"
description = "Use this skill when you need to produce an initial architecture sketch before committing to a full HLD — mapping service boundaries, modules, data models, events, and APIs at breadth-first level. Activates after boundary mapping is complete and the architect needs to see the design landscape with decision points presented as options. Also relevant when someone says 'show me the architecture options' or 'let's sketch this out.' Does NOT produce a final HLD document — use HLD Drafting for that."
license = "Proprietary. See LICENSE.md"
+++

# Design Sketch

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:

- Produce a breadth-first design scaffold before committing to a full HLD draft
- Map service boundaries, modules, data model, events, and APIs at sketch level
- Present architectural decision points as options with tradeoffs for architect selection
- Classify architect feedback as content correction, evaluation reset, or context injection
- Iterate through calibration until the architect approves the design direction
- Make all assumptions and open questions explicitly visible

**Processes that use this skill**:
- Architecture Copilot (Step 1: Context & Design Direction — Action 4)

**Key principle**: Do not over-resolve. Early certainty is dangerous. Present the decision landscape, not a finished design.

## Pre-Check

If `explore/hlds/[slug]-design-sketch.md` already exists:
1. Load the existing design sketch
2. Present to the architect: "Existing design sketch found. Review and update, or create fresh?"
3. If updating → load existing sketch as baseline in Step 8 (Calibration Loop)
4. If creating fresh → proceed from Step 1

## Inputs to Request

Before generating a design sketch, ensure you have:

1. **Validated boundary map** — output of the Boundary Mapping skill, confirmed by architect
2. **Truth hierarchy declaration** — which documents are canonical vs directional (from boundary map)
3. **Engagement brief** — engagement type, quality attributes, constraints, regulations, stakeholders
4. **PRD or initiating requirements document** — primary input artifact
5. **Decision log** — current state from Boundary Mapping decisions
6. **Architectural pattern library** — from persistent knowledge (if available for this domain)
7. **Slug** — project identifier for file naming (e.g., `payments-reconciliation`)

**STOP**: If the boundary map has not been validated by the architect, complete Boundary Mapping skill first before proceeding.

## Procedure

Execute each step file in order. Load one step at a time.

1. [Propose Service Boundary](steps/01-propose-service-boundary.md) — Propose and validate service boundary with justification
2. [Map Modules and Runtime Trigger](steps/02-map-modules-runtime-trigger.md) — Identify modules, responsibilities, and the initiating trigger
3. [Sketch Data Model and Authoritative Sources](steps/03-sketch-data-model.md) — Define entities, relationships, and map authoritative sources
4. [Map Events and API Contracts](steps/04-map-events-api-contracts.md) — List all events and APIs with ownership and schema status
5. [Quality Attribute Constraints](steps/05-quality-attribute-constraints.md) — Map architecture against top NFRs from engagement brief
6. [Present Architectural Decision Points](steps/06-present-decision-points.md) — Present options with tradeoffs for architect selection
7. [List Open Questions and Assumptions](steps/07-open-questions-assumptions.md) — Compile all remaining questions and every assumption
8. [Calibration Loop](steps/08-calibration-loop.md) — Classify architect feedback before responding (Content / Eval Reset / Context)
9. [Assemble and Validate Design Sketch](steps/09-assemble-validate.md) — Write complete sketch and run validation checklist

## Output Format

```
explore/hlds/[slug]-design-sketch.md
```

**Template**: `templates/design-sketch.md`

1. **Header** — HLD name, date, status (Draft/Direction Approved), iteration count
2. **Service Boundary** — proposed boundary with justification
3. **Module Map** — table of modules with responsibilities, owns/consumes/produces
4. **Runtime Trigger** — what initiates the process, source, evidence
5. **Data Model Sketch** — entities, relationships, key fields, authoritative sources
6. **Event Map** — events produced/consumed with ownership and schema status
7. **API Contracts** — upstream/downstream APIs with purpose and contract status
8. **Quality Attribute Constraints** — how architecture addresses each top NFR, with targets and tradeoffs
9. **Architectural Decision Points** — each with options, tradeoffs, NFR impact, and architect selection
10. **Open Questions** — questions with source, impact, blocking status
11. **Assumptions Register** — every assumption with evidence level and risk
12. **Evaluation Criteria Log** — calibration history showing type, change, and impact

## Integration with Workflows

Architecture Copilot (Step 1: Context & Design Direction) loads this skill conditionally after the boundary map is validated. It replaces the Boundary Mapping skill to stay within the 3-skill limit. The approved design sketch feeds directly into the HLD Drafting skill in Step 2.

**Consumes**:
- **Boundary Mapping** (`explore.proc.boundary-mapping`) — Validated boundary map as foundational context
- **Decision Log** (`explore.util.decision-log`) — Existing decisions inform design direction

**Produces** (consumed by):
- **Decision Log** (`explore.util.decision-log`) — Architect selections for each decision point as new entries
- **Blocker Register** (`explore.util.blocker-register`) — Assumed event schemas and API contracts as potential blockers
- **HLD Drafting** (`explore.proc.hld-drafting`) — Approved sketch is the basis for the consolidated draft

## Best Practices

**Do**:
- Present decision points as options with tradeoffs — let the architect choose
- Tag every claim with [VALIDATED] or [ASSUMPTION] — no unmarked assertions
- Classify architect feedback before responding — Content / Eval Reset / Context
- Distinguish OBSERVED vs INFERRED vs ASSUMED evidence levels explicitly
- Keep the sketch breadth-first — cover all sections before going deep on any
- Log every calibration iteration in the evaluation criteria log

**Don't**:
- Pre-resolve architectural decisions — present the landscape, not a finished design
- Present assumptions as facts — always use evidence tags
- Treat all architect feedback as content corrections — check for evaluation resets
- Skip the feedback classification step — it is the highest-leverage behavior
- Go deep on one section before covering all sections at sketch level
- Proceed past a decision point without architect selection or explicit deferral

If you propose changes, keep them minimal and clearly scoped.

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] Architecture approach selected with rationale
- [ ] Component boundaries identified at sketch level
- [ ] Integration points mapped
- [ ] All decision points documented with options and tradeoffs
- [ ] Open questions explicitly listed with owners
- [ ] All claims tagged [VALIDATED] or [ASSUMPTION]
- [ ] Sketch approved by architect before proceeding to drafting

## Gotchas

- ⚡ **Depth trap**: The agent tends to go deep on the first service or module it encounters, producing implementation-level detail while other areas remain uncharted. Enforce breadth-first: all sections at sketch level before any section goes deep.
- ⚡ **Decision point collapse**: When an architect defers a decision, the agent sometimes silently picks the "simplest" option in subsequent sections. Deferred decisions must remain explicitly open with all options preserved until the architect decides.
- ⚡ **Evaluation lens drift**: Architect feedback may shift the evaluation criteria mid-sketch without the agent recognizing it as a lens reset. Always classify feedback first — content correction, evaluation reset, or context injection — before responding.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.design-sketch:0.1.2:2026-09-01T08:21:27Z -->
