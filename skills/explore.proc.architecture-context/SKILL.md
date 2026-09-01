+++
name = "explore.proc.architecture-context"
description = "Use this skill when you need to read existing client architecture documentation, capture the architecture landscape, extract drivers and constraints, and perform light domain modeling during discovery. Produces a consolidated architecture-context.md that feeds directly into architecture solutioning (Step 5). Also relevant when someone says 'document the existing architecture,' 'capture architecture constraints,' or 'what does the current system look like.' Replaces the former architecture-documentation (baseline mode) and architect Phase A (Steps 01-05)."
license = "Proprietary. See LICENSE.md"
+++

# Architecture Context

Read existing client documentation, capture the architecture landscape, extract architecture drivers and constraints, perform light domain modeling, and produce a consolidated architecture context baseline for downstream solutioning.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Ingest and document existing client architecture (HLDs, diagrams, runbooks, API specs)
- Capture the IT landscape, stakeholders, and organizational maturity
- Extract architecture drivers — functional drivers, quality attributes, constraints
- Perform light domain modeling (bounded contexts, context mapping)
- Produce a consolidated architecture context baseline before PRD and solutioning

**Key principle**: Discovery is about capturing what exists and what constrains — not making design decisions. Architecture decisions belong in solutioning (Step 5). If you find yourself selecting architecture styles or defining component boundaries, you have crossed into solutioning territory.

## Inputs to Request (if missing)

Before running this skill, ensure you have:

1. **Context baseline** — `explore/explore-[slug]/context.md` (problem statement, scope, stakeholder map, technical constraints)
2. **Technical feasibility** — `explore/explore-[slug]/technical-feasibility.md` (system context, constraints, opportunities)
3. **Slug** — Project identifier for file naming (e.g., `care-it`, `uw-workbench`)

**Optional inputs** (enhance quality if available):
- Existing client architecture documents (HLDs, diagrams, API specs, runbooks) — binary files converted via `explore.util.document-ingestion`
- `explore/explore-[slug]/domain-analysis.md` — if Activity 3 (Domain Analysis) also ran
- `explore/explore-[slug]/regulatory-compliance.md` — if Activity 4 ran
- `explore/explore-[slug]/market-research.md` — if Activity 2 ran

**STOP**: If no context baseline (`context.md`) exists, ask the human to run Context Documentation (Activity 1) first.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-ingest-existing-docs.md](./steps/01-ingest-existing-docs.md) | Read all client-provided architecture documents; produce existing-state baseline |
| 2 | [02-capture-landscape.md](./steps/02-capture-landscape.md) | Structured questions (AQ-001–012) for IT environment, stakeholders, maturity |
| 3 | [03-extract-drivers.md](./steps/03-extract-drivers.md) | Functional drivers, quality attributes, constraints — scored and prioritized |
| 4 | [04-model-domain.md](./steps/04-model-domain.md) | Light domain modeling — bounded contexts, context mapping, aggregate sketch |
| 5 | [05-write-architecture-context.md](./steps/05-write-architecture-context.md) | Produce consolidated `architecture-context.md` |

## Explore Type Adaptation

| Step | Fast Lane | ERC | Diverge/Converge |
|------|-----------|-----|------------------|
| **Step 1** (Ingest Existing Docs) | ✅ Ingest only (no existing-state HLD) | ✅ Ingest + existing-state HLD via `hld-drafting` baseline | ✅ Full ingest + existing-state HLD via `hld-drafting` baseline if legacy system |
| **Step 2** (Capture Landscape) | ❌ Skip — use constraints from `technical-feasibility.md` only | ⚠️ Targeted — only AQ questions not answered by Explore artifacts | ✅ Full question bank (AQ-001–012) |
| **Step 3** (Extract Drivers) | ⚠️ Light — extract drivers from documents only, no human elicitation | ✅ Full driver extraction with human validation | ✅ Full with tension analysis and PoC flagging |
| **Step 4** (Model Domain) | ❌ Skip — defer to solutioning | ⚠️ Light — bounded contexts only, no aggregates | ✅ Full DDD: bounded contexts + context map + aggregates |
| **Step 5** (Write Context) | ✅ Consolidated context (lightweight) | ✅ Full `architecture-context.md` | ✅ Full `architecture-context.md` + sub-artifacts |

## Output Artifacts

**Primary output:**
```
explore/explore-[slug]/architecture-context.md
```

Contains clearly delineated sections:
- **Existing Architecture Baseline** — current-state findings from ingested documents
- **Landscape Assessment** — AQ-001–012 answers, IT environment, maturity
- **Architecture Drivers** — functional drivers, quality attributes, constraints (scored)
- **Domain Model Sketch** — bounded contexts, context map (if Step 4 ran)
- **Constraints Register** — all hard and soft constraints consolidated
- **Open Questions** — gaps, unknowns, items needing resolution

**Optional sub-artifacts** (produced by `explore.proc.hld-drafting` mode `baseline`, delegated from Step 1):
```
explore/hlds/[slug]-existing-hld.md          (Step 1 — if legacy system exists)
explore/decisions/[slug]-adr-NNN-[name].md   (Step 1 — existing decisions via adr-lifecycle)
```

## Integration with Workflows

**Invoked by**:
- `explore.agent` Step 2, Activity 6 (Architecture Context) — primary invocation path

**Consumes**:
- **Context Documentation** (`explore.proc.context-documentation`) — problem statement, scope, stakeholder map, technical constraints
- **Technical Feasibility** (`explore.proc.technical-feasibility`) — system context, constraints, opportunities, design guardrails
- **Domain Analysis** (`explore.proc.domain-analysis`) — if Activity 3 also ran, consolidate domain modeling
- **Regulatory Compliance** (`explore.proc.regulatory-compliance`) — compliance constraints feed into drivers

**Produces for**:
- **Architecture Solutioning** (`explore.proc.architecture-solutioning`) — `architecture-context.md` is the primary input for B.1 Context & Design Direction
- **PRD Generation** (`explore.proc.prd-generation`) — architecture drivers and constraints enrich PRD Technical Notes (Group 2)
- **Risk Documentation** (`explore.proc.risk-documentation`) — architecture risks feed into risk register

## Evidence Labeling

Every claim must be tagged with evidence labels:
- **OBS** (OBSERVED) — directly evidenced in an ingested document or Explore artifact
- **INF** (INFERRED) — inferred from patterns across multiple artifacts
- **ASM** (ASSUMED) — filling a gap; never present as fact

## Best Practices

**Do**:
- ✅ Read all client documents before asking questions — many AQ answers are in the docs
- ✅ Tag every finding with evidence labels (OBS/INF/ASM)
- ✅ Consolidate with `domain-analysis.md` if Activity 3 also ran — do not create duplicate domain artifacts
- ✅ Capture constraints from multiple sources (technical, regulatory, organizational, delivery)
- ✅ Present findings for human validation before finalizing
- ✅ Flag high-uncertainty drivers that may need PoC validation in solutioning

**Don't**:
- ❌ Make design decisions — this is discovery, not solutioning
- ❌ Select architecture styles or patterns — that belongs in Step 5
- ❌ Define component boundaries — that belongs in solutioning B.1
- ❌ Skip reading existing documents and jump to questions
- ❌ Treat existing architecture documentation as current truth without verification
- ❌ Create duplicate domain artifacts when `domain-analysis.md` already exists

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] All client-provided architecture documents ingested and summarized
- [ ] Existing-state architecture baselined via `explore.proc.hld-drafting` mode `baseline` (if legacy system)
- [ ] Landscape questions answered or confirmed from artifacts (per Explore Type depth)
- [ ] Architecture drivers captured with measurable targets and priorities
- [ ] Constraints register complete (hard/soft classification)
- [ ] Domain model sketch produced (per Explore Type depth)
- [ ] All findings evidence-labeled (OBS/INF/ASM)
- [ ] Open questions documented with owners
- [ ] Consolidated `architecture-context.md` written

## Gotchas

- ⚡ **Copy-paste architecture**: When documenting existing systems, the agent tends to copy descriptions from source code comments or README files verbatim. These are often stale. Always verify architecture documentation against actual system behavior, not just existing docs.
- ⚡ **Discovery/solutioning bleed**: This skill should produce architectural context — NOT design decisions. If the agent starts selecting architecture styles or defining component boundaries during discovery, redirect to Step 5 where design decisions belong.
- ⚡ **Domain model duplication**: If Activity 3 (Domain Analysis) also ran, the domain model in Step 4 must consolidate with `domain-analysis.md` — never produce competing domain artifacts.
- ⚡ **Depth trap on familiar domains**: When the architect has strong opinions about a domain, the agent tends to skip the structured question bank and jump straight to conclusions. Always run the question set appropriate for the Explore Type.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.architecture-context:1.0.1:2026-08-27T13:34:38Z -->
