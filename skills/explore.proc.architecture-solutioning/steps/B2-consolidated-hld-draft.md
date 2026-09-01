# B.2: Consolidated HLD Draft

## Objective

Freeze the approved design direction into a template-conformant 14-section HLD draft with inline PRD requirement cross-references and one ADR per significant architectural decision.

## Entry Criteria

- [ ] Gate B.1 PASS or CONDITIONAL PASS
- [ ] `[slug]-design-sketch.md` approved
- [ ] `[slug]-engagement-brief.md`, `[slug]-boundary-map.md`, `[slug]-truth-hierarchy.md` complete
- [ ] `[slug]-decision-log.md` and `[slug]-blocker-register.md` initialized

**Load skill**: `explore.proc.hld-drafting`

## Inputs Consumed

| Artifact | Location | What is extracted |
|----------|----------|------------------|
| `[slug]-engagement-brief.md` | `explore/hlds/` | Engagement type, quality attributes, constraints, stakeholders, hardening config |
| `[slug]-boundary-map.md` | `explore/hlds/` | Ownership matrix, upstream dependencies, platform conventions |
| `[slug]-truth-hierarchy.md` | `explore/hlds/` | Authority classification for all design decisions |
| `[slug]-design-sketch.md` | `explore/hlds/` | Approved architecture direction, component boundaries, decision points resolved |
| `architecture-context.md` | `explore/explore-[slug]/` | Architecture drivers, constraints register, existing architecture baseline |
| `technical-feasibility.md` | `explore/explore-[slug]/` | Technology stack confirmation, technical constraints |
| `regulatory-compliance.md` | `explore/explore-[slug]/` | Security and compliance requirements for Section 7 |
| `personas-[slug].md` | `explore/domain/` | User-facing component descriptions, access patterns |
| `journey-[slug].md` | `explore/domain/` | Future-state experience journey (Section 12) |
| `flows-[slug].md` | `explore/domain/` | State transitions, error paths for runtime view |
| `[slug]-prd.md` | `explore/prds/` | Primary grounding document — R-XXX requirements, NFR-XXX targets |
| `domain-analysis.md` | `explore/explore-[slug]/` | Bounded contexts for data and domain model section |
| `design-language.md` | `explore/design/` | Frontend architecture direction (conditional: FL exit) |
| `design-system.md` | `explore/design/` | Token pipeline, component delivery strategy (conditional: D/C with `ui_in_scope`) |
| `component-inventory.md` | `explore/design/` | Component data needs → API contract requirements (conditional: D/C) |
| `handoff-notes.md` | `explore/design/` | Interaction-driven NFRs: latency, state sync, offline (conditional: D/C) |
| `accessibility-[slug].md` | `explore/design/` | Accessibility requirements shaping component architecture (conditional) |

## Actions

### B.2.1 — Draft Each HLD Section

Draft each section enforcing Architecture Rules throughout:
- **M1** — bounded-context ownership (never blur boundaries)
- **M3** — cross-view consistency (diagrams tell the same story)
- **M4** — negative boundary statements on every component
- **M5** — deterministic replay from inputs
- **M6** — milestone events only (no per-record firehoses)
- **M7** — operational simplification (nothing unjustified)
- **M8** — implementation readiness (teams can build without guessing)

**PRD ID Cross-Referencing** — reference PRD requirement IDs inline in each section:
- Functional requirements: `R-XXX`
- Non-functional requirements: `NFR-XXX`
- Example: "Component X handles R-003 (user authentication) and must meet NFR-002 (< 200ms response time)."

**HLD Sections** (14 total):

| # | Section | Primary Sources |
|---|---------|----------------|
| 1 | System Overview | `[slug]-boundary-map.md` + `context.md` system map |
| 2 | Architecture Approach | Pattern selection with rationale from approved design sketch |
| 3 | Component Breakdown | Table: Component · Responsibility · Technology · Dependencies |
| 4 | Integration & Data Flows | `[slug]-boundary-map.md` dependencies + `technical-feasibility.md` |
| 5 | Key Architectural Decisions | ADR references (link, do not inline) |
| 6 | Technology Stack | `technical-feasibility.md` (committed vs TBD) |
| 7 | Security Considerations | `regulatory-compliance.md` |
| 8 | Quality Attributes & Operational Requirements | NFR targets from engagement brief + PRD Group 3 |
| 9 | Scalability & Performance | Aligned with NFR-XXX targets |
| 10 | Deployment Architecture | Environments, strategy |
| 11 | Monitoring & Observability | Logging, metrics, tracing, alerting |
| 12 | Future-State Experience Journey | `journey-[slug].md` target-state flows |
| 13 | Open Questions | With owners and target resolution |
| 14 | Enrichment Log | Running change history (initialized empty) |

**Front Matter** (before Section 1):
```yaml
---
domain: [Domain Name from domain-analysis.md glossary]
source: explore/explore-[slug]/domain-analysis.md
glossary_version: [hash or date of domain-analysis.md]
validated_by: [steering team member]
explore_type: [Fast Lane / ERC / Diverge/Converge]
evidence_label: OBS
prd_source: explore/prds/[slug]-prd.md
prd_requirements_mapped: [R-001 through R-NNN]
prd_nfrs_mapped: [NFR-001 through NFR-NNN]
architecture_context_source: explore/explore-[slug]/architecture-context.md
---
```

**Document History** (after front matter):

| Version | Date | Author | Changes | Reviewed By |
|---------|------|--------|---------|-------------|
| 0.1 | [date] | [agent/architect] | Initial draft from B.2 | — |

Write `explore/hlds/[slug]-hld.md`.

### B.2.2 — Create ADRs

For each significant architectural decision identified in the design sketch or during HLD drafting:

> **Load utility:** `explore.util.adr-lifecycle`
>
> Follow the utility's procedure for creating, numbering, and managing ADRs.

- Create `explore/decisions/[slug]-adr-NNN-[decision-name].md`
- Follow `adr-lifecycle` numbering convention (scan existing ADRs, continue from highest)
- Status: `Proposed` (will be promoted to `Accepted` after Gate B.3)
- Include at least 2 options considered with rationale for rejection
- Include consequences (both positive and negative)
- Cross-reference bidirectionally: HLD → ADR (`See ADR-NNN: [name]`) and ADR → HLD (`Affects: HLD Section N`)

**Note**: If existing ADRs were created during discovery (`explore.proc.architecture-context` Step 1 via `hld-drafting` baseline) with status `Accepted`, review them for continued validity. Update status to `Superseded` if a new decision replaces them, linking old → new via `adr-lifecycle` supersession chain.

Update `[slug]-decision-log.md` with each ADR entry.

### B.2.3 — Update Blocker Register

Add any new blockers discovered during HLD drafting:
- Missing upstream contracts identified in Section 4 (Integration) → PROVISIONAL → blocker candidate
- Unresolved technology choices (TBD items in Section 6) → flag with resolution deadline
- Open questions from Section 13 → if blocking → add to register

## Checkpoint

**STOP — AskUserQuestion:**

```
Question ARCH-B2
  Header:      "HLD Draft Review"
  Question:    "I've produced the consolidated HLD draft (v0.1).
                - [N] sections completed (14 of 14)
                - [N] PRD requirements cross-referenced (R-XXX)
                - [N] NFRs cross-referenced (NFR-XXX)
                - [N] ADRs created (all Proposed)
                - [N] open questions (Section 13)
                - [N] blockers identified
                
                Please review for correctness and completeness."
  Multi-select: No
  Options:
    - Approved — ready for review and hardening
    - Corrections needed — I'll provide specific fixes
    - Major revision — needs significant rework
```

**Gate B.2** (human decides): PASS / CONDITIONAL PASS / FAIL

- **PASS** / **CONDITIONAL PASS** → proceed to B.3
- **FAIL** → corrections applied; re-present draft

## Exit Criteria

- [ ] `[slug]-hld.md` written with all 14 sections populated
- [ ] Front matter complete with domain traceability header and `architecture_context_source`
- [ ] All PRD R-XXX and NFR-XXX requirements cross-referenced inline
- [ ] All Architecture Rules (M1, M3, M4, M5, M6, M7, M8) enforced
- [ ] ADRs created at `explore/decisions/` (one per significant decision, all Proposed)
- [ ] Existing ADRs from discovery reviewed and updated if superseded
- [ ] Bidirectional HLD <-> ADR cross-referencing complete
- [ ] `[slug]-decision-log.md` updated with all decisions
- [ ] `[slug]-blocker-register.md` updated with new blockers
- [ ] Gate B.2 PASS or CONDITIONAL PASS

## Next Step

→ [B3-review-and-hardening.md](./B3-review-and-hardening.md)

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.architecture-solutioning:1.0.1:2026-09-01T08:21:26Z -->
