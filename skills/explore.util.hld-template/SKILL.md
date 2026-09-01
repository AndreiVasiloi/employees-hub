+++
name = "explore.util.hld-template"
description = "Use this skill when you need to load the canonical High-Level Design template for any architecture skill. Provides the single authoritative 13-section HLD structure, evidence-labeling rules, and Mermaid diagram conventions. Used by explore.proc.architecture-solutioning, explore.proc.hld-drafting (both new and baseline modes). Does NOT produce an HLD — use explore.proc.architecture-solutioning or explore.proc.hld-drafting for that."
license = "Proprietary. See LICENSE.md"
+++

# HLD Template

Single source of truth for the canonical 13-section High-Level Design (HLD) template and its usage rules. All architecture skills that produce HLD documents load from this utility.

## When to Use

Use this utility when you need to:

- Load the canonical HLD template structure before populating a new HLD
- Verify that an existing HLD conforms to the standard section structure
- Reference the evidence-labeling convention for architecture claims
- Understand the expected Mermaid diagram types for each section

**Skills that use this utility**:
- `explore.proc.architecture-solutioning` — loads template in B.2 (Consolidated HLD Draft)
- `explore.proc.hld-drafting` — loads template for both `new` mode (Step 2) and `baseline` mode (Step 8b)

## Template Location

```
explore.util.hld-template/templates/hld-template.md
```

## Canonical Section Structure

| # | Section | Required | Key Content |
|---|---------|----------|-------------|
| 1 | Executive Summary | ✅ | Purpose, objectives, scope, key decisions, system identifier |
| 2 | System Overview | ✅ | Business context, stakeholders, requirements, boundary, context diagram |
| 3 | Architecture Principles | ✅ | Relevant principles, deviations linked to ADRs |
| 4 | Technology Stack | ✅ | Core tech, cloud services, libraries, config management |
| 5 | High-Level Architecture | ✅ | Context view, container diagram, service responsibilities |
| 6 | Component Architecture | ✅ | Internal decomposition, cross-cutting concerns |
| 7 | Runtime View | ✅ | Sequence diagrams for key flows (happy path + failure) |
| 8 | Data & Domain Model | ✅ | Bounded contexts, domain concepts, persistence, state transitions |
| 9 | Quality Attributes | ✅ | Performance, availability, scalability, resilience, security, observability |
| 10 | Operational Concerns | ✅ | Deployment topology, config, observability, failure modes |
| 11 | API & Integration Contracts | ✅ | Endpoints, error semantics, event types |
| 12 | Risks, Trade-offs, and Open Questions | ✅ | Risks, trade-offs, open questions, assumptions |
| 13 | Future Enhancements | ✅ | Likely future changes with triggers and design accommodation |

## Evidence-Labeling Convention

All architecture claims **within HLD documents** must be tagged with evidence level. This convention applies to HLD content only — upstream explore skills (persona, hypothesis, journey-mapping, domain-analysis, etc.) use `[VALIDATED]/[ASSUMPTION]` for their own artifacts, which is correct for those contexts.

| Label | Meaning | When to use |
|-------|---------|-------------|
| `OBS` | **Observed** — confirmed by direct inspection, measurement, or documented evidence | Facts from PRD, ADRs, existing systems, stakeholder interviews |
| `INF` | **Inferred** — logical deduction from observed facts; not directly confirmed | Derived constraints, patterns inferred from requirements |
| `ASM` | **Assumed** — believed true but not yet validated; needs verification | Design choices pending stakeholder sign-off, TBD technology decisions |

**Rule**: No unmarked assertions. Every claim that is not an `OBS` must carry `INF` or `ASM`.

## Diagram Convention

All diagrams **must use Mermaid** (no PlantUML, no ASCII art for structural diagrams).

| Section | Diagram Type | C4 Level |
|---------|-------------|---------|
| 2.5 | Context diagram | C4 Level 1 |
| 5.2 | Container / Service diagram | C4 Level 2 |
| 6 | Component diagram (if applicable) | C4 Level 3 |
| 7 | Sequence diagrams | N/A |
| 8.4 | State diagrams (for stateful aggregates) | N/A |

## Procedure

1. Load `templates/hld-template.md`
2. Replace guidance text with system-specific content
3. Preserve all 13 section headings and numbered subsections
4. Apply evidence labels (`OBS`/`INF`/`ASM`) to every claim
5. Include Mermaid diagrams per the diagram convention table above

## Best Practices

**Do**:
- Keep all 13 sections — mark sections as "N/A — [reason]" if genuinely not applicable rather than omitting them
- Link to ADRs from relevant HLD sections (bidirectional cross-reference)
- Use system `slug` as prefix for all artifact file names

**Don't**:
- Add sections beyond the 13 — open questions go in Section 12.3, future work in Section 13
- Use `[VALIDATED]/[ASSUMPTION]` labeling **inside HLD documents** — the canonical HLD scheme is `OBS/INF/ASM`. Upstream explore artifacts that use `[VALIDATED]/[ASSUMPTION]` are correct for their own context and do not need conversion
- Mix Mermaid with PlantUML in the same document

If you propose changes, keep them minimal and clearly scoped.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.util.hld-template:0.1.2:2026-08-31T12:53:30Z -->
