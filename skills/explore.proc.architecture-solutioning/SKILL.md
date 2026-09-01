+++
name = "explore.proc.architecture-solutioning"
description = "Use this skill when you need to produce a complete architecture package (HLD, ADRs, supporting artifacts) after the PRD step. Consumes architecture-context.md from discovery and full Explore pipeline artifacts. Also relevant when someone says 'design the architecture,' 'create the HLD,' 'architecture solutioning,' or 'produce the architecture package.' Replaces the former architecture-copilot (B.0-B.4) and architect Phase B (Steps 06-10)."
license = "Proprietary. See LICENSE.md"
+++

# Architecture Solutioning

Context-consumption-first architecture solutioning. Accepts `architecture-context.md` from discovery and full Explore pipeline artifacts (approved PRD, domain analysis, technical feasibility, ideation) to produce a complete architecture package through a structured B.0–B.4 lifecycle with explicit human gates at every sub-step.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when:
- The PRD is approved (Step 4 complete)
- Discovery artifacts are available (at minimum: `context.md`, `technical-feasibility.md`)
- `architecture-context.md` exists from `explore.proc.architecture-context` (Step 2, Activity 6)
- The team is ready to produce the architecture package

**Key principle**: This skill does NOT perform discovery or document existing architecture. It consumes the architecture context produced in discovery and designs the solution. If you need to capture what exists first, use `explore.proc.architecture-context`.

## Inputs to Request (if missing)

**Required:**
1. **Slug** — Project identifier (e.g., `care-it`, `uw-workbench`)
2. **Approved PRD** — `explore/prds/[slug]-prd.md`
3. **Domain analysis** — `explore/explore-[slug]/domain-analysis.md`

**Primary context input:**
4. **Architecture context** — `explore/explore-[slug]/architecture-context.md` (from `explore.proc.architecture-context`)

**Additional Explore artifacts consumed per sub-step:**
- `explore/explore-[slug]/context.md`
- `explore/explore-[slug]/technical-feasibility.md`
- `explore/explore-[slug]/regulatory-compliance.md`
- `explore/explore-[slug]/market-research.md`
- `explore/explore-[slug]/ideation/[slug]-refined-concepts.md`
- `explore/explore-[slug]/ideation/[slug]-framing.md`
- `explore/explore-[slug]/hypothesis.md`
- `explore/explore-[slug]/risks.md`
- `explore/domain/personas-[slug].md`
- `explore/domain/journey-[slug].md`
- `explore/domain/flows-[slug].md`
- `explore/design/*` (conditional: D/C with `ui_in_scope`)

**STOP**: If no approved PRD exists, architecture solutioning cannot proceed. Ask the team to complete Step 4 (PRD & Experience Design) first.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| B.0 | [B0-domain-onboarding.md](./steps/B0-domain-onboarding.md) | Bootstrap domain profile from Explore artifacts (conditional — skip if profile exists) |
| B.1 | [B1-context-design-direction.md](./steps/B1-context-design-direction.md) | Scope engagement, produce boundary map, truth hierarchy, and design sketch |
| B.2 | [B2-consolidated-hld-draft.md](./steps/B2-consolidated-hld-draft.md) | Freeze approved design into 14-section HLD draft + ADRs |
| B.3 | [B3-review-and-hardening.md](./steps/B3-review-and-hardening.md) | Feedback integration, cross-domain alignment, evidence escalation, canonical hardening |
| B.4 | [B4-finalization-handoff.md](./steps/B4-finalization-handoff.md) | Simplification audit, polish, produce final architecture package |

## Explore Type Adaptation

| Sub-Step | Fast Lane | ERC | Diverge/Converge |
|----------|-----------|-----|------------------|
| **B.0** Domain Onboarding | ❌ Skip | ⚠️ Only if domain profile missing | ✅ Full (bootstrap from Explore artifacts) |
| **B.1** Context & Design Direction | ⚠️ Confirm existing architecture only | ✅ Full engagement setup + boundary map + sketch | ✅ Full with calibration loop |
| **B.2** Consolidated HLD Draft | ❌ Skip (reference existing HLD) | ✅ Full HLD draft | ✅ Full HLD draft with all 14 sections |
| **B.3** Review & Hardening | ❌ Skip | ⚠️ BASE hardening only (4 categories) | ✅ Full hardening (BASE + EXTENDED + DOMAIN) |
| **B.4** Finalization & Handoff | ❌ Skip | ⚠️ Light polish | ✅ Full simplification audit + polish + package |

## Context Consumption Model

This skill always reads `architecture-context.md` as its primary context input. There is no `context_mode` branching — the `architecture-context.md` artifact contains whatever depth of discovery was performed (light for Fast Lane, full for D/C).

**B.1 reads from `architecture-context.md`:**

| B.1 Field | Architecture Context Section |
|-----------|------------------------------|
| Existing architecture state | Section 1 — Existing Architecture Baseline |
| Landscape answers (AQ-001–012) | Section 2 — Landscape Assessment |
| Architecture drivers (functional, QA, constraints) | Section 3 — Architecture Drivers |
| Domain model (bounded contexts, context map) | Section 4 — Domain Model Sketch |
| Constraints | Section 5 — Constraints Register |
| Open questions | Section 6 — Open Questions |

**If `architecture-context.md` does not exist:**
B.1 falls back to reading individual Explore artifacts directly (`context.md`, `technical-feasibility.md`, `domain-analysis.md`, etc.). This is the backward-compatible path but produces lower-quality results because discovery findings are not consolidated.

## Gate Model

Each sub-step ends with a human gate:

| Outcome | Action |
|---------|--------|
| **PASS** | Proceed to next sub-step |
| **CONDITIONAL PASS** | Proceed with tracked caveats |
| **FAIL** | Loop back within sub-step for scoped rework |
| **WHOLESALE REDESIGN** | Retain completed outcomes per M12 → loop to B.1.1 |

## Always-Active Behaviors

These behaviors are active throughout all B sub-steps:

- **Evidence labeling**: Every claim tagged `[OBS]`, `[INF]`, or `[ASM]` with source artifact reference
- **Decision log maintenance**: Every architectural decision logged immediately to `[slug]-decision-log.md`
- **Blocker tracking**: Any item that prevents progress added to `[slug]-blocker-register.md`
- **Mindset enforcement**: Architecture rules M1–M12 enforced throughout
- **Regression detection**: After every edit, verify no previously accepted decisions silently changed
- **Diff manifests**: When modifying existing artifacts, produce clear change summaries

## Output Artifacts

**Architecture Package** (all in `explore/hlds/`):

| Artifact | Sub-Step | Description |
|----------|----------|-------------|
| `[slug]-engagement-brief.md` | B.1 | Architecture engagement scope |
| `[slug]-boundary-map.md` | B.1 | Ownership matrix, upstream dependencies |
| `[slug]-truth-hierarchy.md` | B.1 | Authority classification for design decisions |
| `[slug]-design-sketch.md` | B.1 | Initial breadth-first design direction |
| `[slug]-hld.md` | B.2 | 14-section High-Level Design document |
| `[slug]-decision-log.md` | B.1+ | Running decision record |
| `[slug]-blocker-register.md` | B.1+ | All blockers with status |
| `[slug]-feedback-disposition.md` | B.3 | Stakeholder feedback disposition (if B.3.1 ran) |
| `[slug]-cross-domain-alignment.md` | B.3 | Cross-domain alignment findings (if B.3.2 ran) |
| `[slug]-backport-findings.md` | B.4 | Upstream update instructions |

**ADRs** (in `explore/decisions/`):
- `[slug]-adr-[###]-[name].md` — one per significant decision, all `Accepted` after B.4

## Integration with Workflows

**Invoked by**:
- `explore.agent` Step 5, Part 1 (Architecture) — primary invocation path

**Consumes**:
- **Architecture Context** (`explore.proc.architecture-context`) — `architecture-context.md` is the primary input
- **PRD Generation** (`explore.proc.prd-generation`) — approved PRD requirements, NFRs, constraints
- **Domain Analysis** (`explore.proc.domain-analysis`) — domain model, entity relationships
- **Ideation** — refined concepts, architecture implications
- **Experience Design** — design artifacts (conditional: D/C with `ui_in_scope`)

**Produces for**:
- **Test Strategy** (`explore.proc.test-strategy`) — HLD components inform test scope
- **DevOps Strategy** (`explore.proc.define-devops-strategy`) — deployment architecture informs DevOps
- **Epic Forming** (`explore.proc.epic-forming`) — HLD components and ADRs inform epics
- **Govern Readiness** — architecture package is a Govern gate prerequisite

**Backports to**:
- `[slug]-prd.md` — new technical constraints (Group 2)
- `risks.md` — architecture risks not in risk register
- `explore/glossary.md` — new domain terms discovered during HLD

## Copilot Governance

### Feedback Classification

When PM/Architect provides feedback:
1. **Content Correction** — factual error → fix, update decision log
2. **Evaluation Function Reset** — different framing or priority → adjust evaluation criteria, re-run affected analysis
3. **Context Injection** — new information → integrate, check for cascading impacts

### Regression Detection

After every modification:
- Check component names consistent across all artifacts
- Check no ownership changes contradict validated truth hierarchy
- Check terminology has not drifted from domain-analysis.md glossary
- Check no previously accepted ADR decisions silently reversed

### Canonical Hardening (B.3)

**BASE Categories** (always, all domains):
1. BOUNDARY INTEGRITY (M1, M4)
2. CROSS-VIEW CONSISTENCY (M3)
3. FAILURE MODE ANALYSIS
4. CONTRACT COMPLETENESS (M8, M9)

**EXTENDED Categories** (from engagement brief quality attributes):
- REGULATORY COMPLIANCE, LATENCY BUDGET, THREAT MODEL, AVAILABILITY, AUDITABILITY

**DOMAIN Categories** (from domain profile, if exists)

### Architecture Rules (M1–M12)

| Rule | Description |
|------|-------------|
| M1 | Bounded-context ownership — never blur boundaries |
| M3 | Cross-view consistency — diagrams tell the same story |
| M4 | Negative boundary statements on every component |
| M5 | Deterministic replay from inputs |
| M6 | Milestone events only — no per-record firehoses |
| M7 | Operational simplification — nothing unjustified |
| M8 | Implementation readiness — teams can build without guessing |
| M12 | Retain completed outcomes on wholesale redesign |

## Architecture Style Matrix

Use when selecting the architecture style in B.1.3 Design Sketch:

| Architecture Type | Decomposition | Communication | Data | Resilience | Deployment |
|-------------------|--------------|---------------|------|------------|------------|
| **Monolith** | Layers/modules within single unit | In-process method calls | Single shared database | Error handling, graceful degradation | Single artifact; blue-green/rolling |
| **Modular monolith** | Domain-aligned modules with enforced boundaries | In-process with module APIs | Shared DB with schema-per-module ownership | Module-level circuit breakers; Outbox for async | Single artifact; feature flags per module |
| **Microservices** | Independent services per bounded context | REST/gRPC + async events | Database-per-service; eventual consistency | Circuit breaker, bulkhead, saga | Per-service pipeline; canary/blue-green |
| **Event-driven** | Event producers/consumers/processors | Async events via broker | Event sourcing or CQRS; schema registry | Dead letter queues, replay, compensating events | Schema-compatible; expand-and-contract |

## Best Practices

**Do**:
- ✅ Read `architecture-context.md` fully before starting B.1 — it contains pre-validated findings
- ✅ Cross-reference PRD requirement IDs (R-XXX, NFR-XXX) inline in every HLD section
- ✅ Tag every claim with evidence labels (OBS/INF/ASM) throughout
- ✅ Present OPTIONS with tradeoffs at decision points — do NOT pre-select
- ✅ Run regression detection after every modification
- ✅ Maintain the decision log and blocker register continuously

**Don't**:
- ❌ Re-ask questions already answered in `architecture-context.md` landscape assessment
- ❌ Skip human gates — every sub-step requires explicit approval
- ❌ Silently reverse previously accepted decisions
- ❌ Include LLD-level detail in the HLD (class structure, method signatures, SQL schemas)
- ❌ Create noisy events — milestone events only (M6)
- ❌ Add unjustified infrastructure components (M7)

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification.

- [ ] B.0: Domain profile written (or skipped with reason)
- [ ] B.1: Engagement brief, boundary map, truth hierarchy, design sketch — all written and approved
- [ ] B.2: HLD with all 14 sections, front matter, document history, PRD cross-references
- [ ] B.2: ADRs created (one per significant decision, all Proposed)
- [ ] B.3: Feedback integrated, cross-domain aligned, evidence escalated, hardening complete
- [ ] B.4: Simplification audit, terminology check, template compliance, backport findings
- [ ] B.4: All ADRs promoted to Accepted
- [ ] All architecture rules (M1–M12) enforced
- [ ] All evidence labeled (OBS/INF/ASM)
- [ ] Decision log and blocker register complete

## Gotchas

- ⚡ **Discovery in solutioning**: If the team skipped `explore.proc.architecture-context`, this skill will lack consolidated findings. It can fall back to reading individual Explore artifacts, but results are lower quality. Always run architecture context first.
- ⚡ **PRD drift**: If the PRD is modified after solutioning begins, regression detection must re-validate all R-XXX and NFR-XXX cross-references. Flag any new requirements that emerged post-HLD.
- ⚡ **Over-engineering**: The agent tends to produce Diverge/Converge-depth artifacts even for Fast Lane engagements. Always check Explore Type adaptation tables before each sub-step.
- ⚡ **Silent decision reversal**: When integrating feedback, the agent sometimes reverses earlier decisions without logging the change. Always run regression detection after feedback integration.
- ⚡ **Boundary creep**: During B.2 HLD drafting, component responsibilities tend to expand beyond the validated boundary map. Cross-check every component against `[slug]-boundary-map.md`.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.architecture-solutioning:1.0.1:2026-09-01T08:21:26Z -->
