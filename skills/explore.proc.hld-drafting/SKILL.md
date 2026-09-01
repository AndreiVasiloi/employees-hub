+++
name = "explore.proc.hld-drafting"
description = "Use this skill when you need to produce a structured High-Level Design document — either from an approved design sketch (mode: new) or by documenting an existing system architecture with HLD and ADRs (mode: baseline). Activates after design sketch approval (new mode) or when baselining a legacy/existing system (baseline mode). Also relevant when someone says 'write up the design,' 'create the HLD,' 'document the architecture,' or 'write an ADR.' Does NOT do initial architecture sketching — use Design Sketch for that. Does NOT handle review feedback — use Feedback Integration for that."
license = "Proprietary. See LICENSE.md"
+++

# HLD Drafting

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## Mode Parameter

This skill operates in two modes. Declare the mode at invocation:

| Mode | When to use | Steps |
|------|-------------|-------|
| `new` | Producing an HLD from an approved design sketch (Architecture Copilot path) | Steps 01–07 |
| `baseline` | Documenting an existing system's architecture into an HLD + ADRs | Steps 08b–13b |

**Default**: `new`

## When to Use

**Mode `new`** — use when you need to:
- Freeze an approved architectural direction into a coherent HLD document
- Enforce architecture rules during generation (bounded-context, event-driven, immutable corrections)
- Enforce abstraction rules (public states externally meaningful, no unjustified infrastructure)
- Convert decision points from options to committed statements
- Produce a complete, readable document ready for stakeholder review

**Mode `baseline`** — use when you need to:
- Create an HLD document for an existing system with no current baseline
- Document architectural decisions (ADRs) with rationale and trade-offs for existing choices
- Define existing system components, boundaries, and integration flows
- Establish architecture baseline before new design work begins
- Record existing technical choices and their consequences

**Processes that use this skill**:
- Architecture Copilot (Sub-step B.2: Consolidated Draft — `mode: new`, primary skill)
- Explore Agent Activity 5a: Existing Architecture Documentation — `mode: baseline`

**Key principle (new)**: This is convergent generation. Resolved decisions become statements. Open questions remain explicitly listed. The agent commits to the design, not presents alternatives.

**Key principle (baseline)**: Documentation, not design. Capture what exists accurately. Every claim must be evidence-tagged. Decisions already made get ADRs — do not redesign.

## Inputs to Request

### Mode `new`

Before drafting a consolidated HLD, ensure you have:

1. **Approved design sketch** — output of the Design Sketch skill with architect's direction approval
2. **Validated boundary map** — output of the Boundary Mapping skill from Sub-step B.1
3. **Decision log** — current state of all decisions made during Sub-step B.1
4. **Blocker register** — current state of all known blockers
5. **Slug** — project identifier for file naming (e.g., `payments-reconciliation`)

**STOP**: If the design direction has not been approved by the architect, return to the Design Sketch skill before proceeding.

### Mode `baseline`

Before documenting existing architecture, ensure you have:

1. **Context baseline** — domain model with entities and relationships, system map showing existing integrations, technical constraints and requirements
2. **Problem statement** — clear understanding of what the existing system does
3. **Slug** — project identifier for file naming (e.g., `care-it`)

**Pre-check**: If an HLD already exists for the target system, load it and ask: "Existing architecture documentation found. Review and update, or create fresh?" If updating → skip to Step 12b (validate) with existing data for review. If creating fresh → proceed from Step 08b.

**STOP**: If context baseline is missing, ask the human to provide it before proceeding.

## Procedure

### Mode `new` — Steps 01–07

Execute each step file in order. Load one step at a time.

1. [Freeze the Architectural Branch](steps/01-freeze-architectural-branch.md) — Consolidate decisions from Sub-step B.1 into statements vs open questions
2. [Draft System Overview and Architecture Approach](steps/02-system-overview-architecture-approach.md) — Establish foundational framing and architecture pattern
3. [Draft Component Breakdown and Integration](steps/03-component-breakdown-integration.md) — Generate structural core: components, integrations, data flows
4. [Draft Key Decisions and Technology Stack](steps/04-decisions-technology-stack.md) — Document ADR references and committed vs TBD technology choices
5. [Draft Security, Scalability, Deployment, and Monitoring](steps/05-security-scalability-deployment-monitoring.md) — Generate operational and non-functional sections
6. [Draft Open Questions and Document History](steps/06-open-questions-enrichment-history.md) — Complete remaining HLD sections
7. [Validate and Finalize Draft](steps/07-validate-finalize.md) — Run validation checklist and produce final summary

### Mode `baseline` — Steps 08b–13b

Execute each step file in order. Load one step at a time.

1. [Load Existing Context](steps/08-b-load-existing-context.md) — Load context baseline, system map, and constraints; confirm slug and inputs
2. [Populate HLD](steps/09-b-populate-hld.md) — Fill all 13 HLD sections from existing system evidence
3. [Present HLD for Review](steps/10-b-present-hld.md) — Present the populated HLD to the steering team for confirmation
4. [Write HLD](steps/11-b-write-hld.md) — Write confirmed HLD to output path
5. [Create ADRs](steps/12-b-create-adrs.md) — Identify significant existing decisions; create ADRs using `explore.util.adr-lifecycle`
6. [Validate](steps/13-b-validate.md) — Run completeness check and present validation results

## Output Format

```
explore/hlds/[slug]-hld.md                         (both modes)
explore/hlds/[slug]-existing-hld.md                (baseline mode: Status: Existing Baseline)
explore/decisions/[slug]-adr-NNN-[name].md         (baseline mode only)
```

**Template**: `explore.util.hld-template/templates/hld-template.md`

### Canonical 13 HLD Sections (both modes)

1. **Executive Summary** — purpose, objectives, scope, key decisions, system identifier
2. **System Overview** — business context, stakeholders, requirements, boundary, context diagram
3. **Architecture Principles** — relevant principles, deviations linked to ADRs
4. **Technology Stack** — core tech, cloud services, libraries, config management
5. **High-Level Architecture** — context view, container diagram, service responsibilities
6. **Component Architecture** — internal decomposition, cross-cutting concerns
7. **Runtime View** — sequence diagrams for key flows (happy path + failure)
8. **Data & Domain Model** — bounded contexts, domain concepts, persistence, state transitions
9. **Quality Attributes** — performance, availability, scalability, resilience, security, observability
10. **Operational Concerns** — deployment, configuration, observability, failure modes
11. **API & Integration Contracts** — endpoints, error semantics, events
12. **Risks, Trade-offs, and Open Questions** — risks, trade-offs, open questions, assumptions
13. **Future Enhancements** — likely future changes with triggers and design accommodation

## Integration with Workflows

**Mode `new`** — Architecture Copilot (Sub-step B.2: Consolidated Draft) loads this skill as the primary domain skill (Lazy). It consumes the boundary map and design sketch from Sub-step B.1 and produces the first coherent HLD draft.

**Mode `baseline`** — Explore Agent Activity 5a loads this skill when the team is inheriting or extending an existing system. The HLD it produces (`[slug]-existing-hld.md`) becomes an input to Architecture Discovery Phase A Step 1 context loading.

**Consumes**:
- **Boundary Mapping** (`mode: new`) — validated boundary map for context and scope sections
- **Design Sketch** (`mode: new`) — approved sketch for all structural sections
- **Decision Log** (`mode: new`) — feeds new decisions made during drafting
- **Blocker Register** (`mode: new`) — feeds new blockers discovered during drafting
- **Context Documentation** (`mode: baseline`) — domain model feeds into system components
- **ADR Lifecycle** (`explore.util.adr-lifecycle`, `mode: baseline`) — handles ADR creation, numbering, and status transitions

**Produces** (consumed by):
- **Feedback Integration** — references the draft as the canonical version for consistency audit
- **Epic Forming** (`explore.proc.epic-forming`) — HLD modules/components become candidate epics
- **Test Strategy** (`explore.proc.test-strategy`) — component boundaries define integration test surface
- **Risk Documentation** (`explore.proc.risk-documentation`) — architecture risks feed into risk register
- **Govern Readiness** — HLD is a primary artifact in the Govern Readiness checklist

## Best Practices

**Do**:
- Follow the 13-section template structure strictly — every section must be present
- Convert resolved decisions to statements (`mode: new`) — no more "Option A vs B" for decided items
- Keep open questions explicit in Section 12.3 — never silently assume an answer
- Enforce all 7 architecture rules during generation, not as a post-check (`mode: new`)
- Enforce all 3 abstraction rules during generation — especially public state model (`mode: new`)
- Tag every claim with `OBS`, `INF`, or `ASM` — no unmarked assertions
- Consider at least 2 options for each ADR (`mode: baseline`)
- Link HLD to ADRs bidirectionally (`mode: baseline`)

**Don't**:
- Present options for already-decided items — they are now committed statements (`mode: new`)
- Silently assume answers to open questions — carry them forward explicitly
- Blur bounded-context ownership — the ownership matrix is authoritative
- Inherit infrastructure from adjacent systems without workload justification
- Expose internal execution phases as public states — they are checkpoints only
- Skip the architecture/abstraction rule enforcement — it is not optional (`mode: new`)
- Use `[VALIDATED]/[ASSUMPTION]` labeling — the canonical scheme is `OBS/INF/ASM`
- Leave ADRs in Proposed status — always transition to Accepted or Deprecated (`mode: baseline`)

If you propose changes, keep them minimal and clearly scoped.

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] All 13 HLD sections populated per `explore.util.hld-template`
- [ ] Resolved decisions stated as commitments (not options) — `mode: new`
- [ ] Open questions listed in Section 12.3 with owners
- [ ] All claims tagged `OBS`, `INF`, or `ASM`
- [ ] Architecture and abstraction rules enforced during generation — `mode: new`
- [ ] ADR references linked bidirectionally
- [ ] Blocker register updated with new blockers — `mode: new`
- [ ] All ADRs created with at least 2 options each — `mode: baseline`
- [ ] ADR numbering sequential with no gaps — `mode: baseline`
- [ ] All ADRs transitioned from Proposed to Accepted/Deprecated — `mode: baseline`

## Gotchas

- ⚡ **Internal state leakage** (`mode: new`): The agent frequently exposes internal execution phases (e.g., "processing", "validating") as public domain states. Public states must reflect what external consumers observe, not what happens inside the service. Enforce the abstraction rule on every state model.
- ⚡ **Infrastructure inheritance** (`mode: new`): When an adjacent domain uses a specific platform service (e.g., a message broker, cache), the agent copies that choice into the new HLD without workload justification. Each bounded context must justify its own infrastructure choices.
- ⚡ **Open question burial** (both modes): Open questions documented in Section 12.3 tend to be forgotten once drafting momentum builds. Every open question must be cross-referenced from the section it affects — not only listed at the end.
- ⚡ **ADR status rot** (`mode: baseline`): ADRs left in "Proposed" status are treated as accepted by downstream consumers. Always update status to "Accepted" or "Superseded" after the decision is made — stale status is worse than no ADR.
- ⚡ **Copy-paste architecture** (`mode: baseline`): The agent tends to copy descriptions from source code comments or README files verbatim. These are often stale. Always verify documentation against actual system behavior, not just existing docs.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hld-drafting:0.2.1:2026-08-31T12:53:29Z -->
