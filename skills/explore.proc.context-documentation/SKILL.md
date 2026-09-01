+++
name = "explore.proc.context-documentation"
description = "Use this skill when you need to build a complete context baseline — problem reframe, domain model, system map, and assumptions catalogue — as the foundation for all downstream Explore activities. Activates at the start of any project or when context is unclear. Also relevant when someone says 'what problem are we solving,' 'set the context,' or 'I need to understand the landscape.' Does NOT analyze domain entities in depth — use Domain Analysis for that."
license = "Proprietary. See LICENSE.md"
+++

# Context Documentation

Build complete context baseline with problem reframe, domain model, system map, and assumptions catalogue.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Build a complete context baseline at project start
- Document domain models with entities and relationships
- Map existing systems and integrations
- Create stakeholder RACI matrices
- Catalog assumptions and gaps for validation
- Establish technical constraints and boundaries

## Pre-Check

If a context baseline already exists at `explore/explore-[slug]/context.md`:
1. Load the existing context baseline
2. Present to the steering team: "Existing context baseline found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before creating context documentation, ensure you have:

1. **Signal document** - The validated Signal from Signal Agent
2. **Domains in scope** - From Step 1 (Explore Bundle)
3. **Stakeholder access** - Ability to ask clarifying questions
4. **Slug** - Project identifier for file naming (e.g., `care-it`)

**STOP**: If the Signal document is missing, request it before proceeding.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-problem-statement.md](./steps/01-problem-statement.md) | Reframe problem statement from Signal |
| 2 | [02-scope-and-boundaries.md](./steps/02-scope-and-boundaries.md) | Define in/out of scope and boundaries |
| 3 | [03-domain-model.md](./steps/03-domain-model.md) | Create entity-relationship model |
| 4 | [04-system-map.md](./steps/04-system-map.md) | Document system components and integrations |
| 5 | [05-technical-constraints.md](./steps/05-technical-constraints.md) | Document constraints with status and impact |
| 6 | [06-stakeholder-map.md](./steps/06-stakeholder-map.md) | Identify stakeholders and RACI matrix |
| 7 | [07-assumptions-and-gaps.md](./steps/07-assumptions-and-gaps.md) | Catalog assumptions and gaps |
| 8 | [08-governance-framework.md](./steps/08-governance-framework.md) | Document decision authority and approval gates |
| 9 | [09-context-summary.md](./steps/09-context-summary.md) | Create one-page baseline summary |
| 10 | [10-write-context-document.md](./steps/10-write-context-document.md) | Write complete context document |
| 11 | [11-validation.md](./steps/11-validation.md) | Run completeness validation |

## Output Format

```
explore/explore-[slug]/context.md
```

**Template**: `templates/context-template.md`

**Complete Structure** (13 sections):
1. **Header** - Signal ID, Phase (SP1), Created date, Status
2. **Problem Statement** - Reframed from Signal, Root cause, Impact, Desired outcome
3. **Scope & Boundaries** - In Scope, Out of Scope, Boundary Conditions
4. **Domain Model** - Core Entities table, Entity Relationships diagram
5. **System Map** - Integration Architecture table, Data Flow Diagrams
6. **Technical Constraints** - Table with Status, Impact, Notes
7. **Stakeholder Map & RACI** - Stakeholders table, RACI Matrix
8. **Governance Framework** - Decision Authority, Approval Gates
9. **Assumptions Catalogue** - With Owner and Closes In columns
10. **Gaps Catalogue** - With Why It Matters and Question for Stakeholder
11. **Context Summary** - One-Page Baseline
12. **Enrichment Log** - Change tracking
13. **Footer** - Last Updated, Updated By

## Integration with Workflows

**Consumes**:
- **Signal Document** — Validated Signal from Signal Agent
- **Explore Bundle** — Domains in scope, scope boundaries from Step 1

**Produces** (consumed by):
- **Market Research** (`explore.proc.market-research`) — Context baseline informs research scope
- **Domain Analysis** (`explore.proc.domain-analysis`) — Domain foundation for entity modeling
- **Regulatory Compliance** (`explore.proc.regulatory-compliance`) — Problem statement and scope drive compliance analysis
- **Technical Feasibility** (`explore.proc.technical-feasibility`) — System context and constraints
- **Persona** (`explore.proc.persona`) — Domain model informs persona context
- **Journey Mapping** (`explore.proc.journey-mapping`) — System map informs touchpoints
- **Hypothesis Documentation** (`explore.proc.hypothesis-documentation`) — Assumptions feed hypothesis validation
- **Architecture Context** (`explore.proc.architecture-context`) — System map and constraints inform architecture context
- **Architecture Solutioning** (`explore.proc.architecture-solutioning`) — Context feeds into HLD generation
- **PRD Generation** (`explore.proc.prd-generation`) — Assumptions become open questions
- **Risk Documentation** (`explore.proc.risk-documentation`) — Assumptions become risks

## Best Practices

**Do**:
- ✅ Reframe problem to be actionable and measurable
- ✅ Explicitly document out-of-scope items
- ✅ Show entity relationships, not just list entities
- ✅ Map all external integrations and dependencies
- ✅ Document why constraints exist, not just what they are
- ✅ Assign RACI for all key decisions
- ✅ Give every assumption a validation plan

**Don't**:
- ❌ Leave problem statement vague or solution-prescriptive
- ❌ Skip out-of-scope documentation
- ❌ Create entity lists without relationships
- ❌ Forget external integrations
- ❌ Document constraints without rationale
- ❌ Leave assumptions without validation plans

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] Problem statement describes pain, not solution
- [ ] System context documented with actors and boundaries
- [ ] Domain model captured with entity relationships
- [ ] Constraints documented with rationale (why they exist)
- [ ] Assumptions have validation plans (method, timing)
- [ ] Out-of-scope items explicitly documented
- [ ] RACI assigned for key decisions

## Gotchas

- ⚡ **Solution-prescriptive problem statements**: The agent tends to embed solution assumptions into the problem reframe (e.g., "We need a microservice that..." instead of "Users cannot..."). Always validate that the problem statement describes the pain, not the fix.
- ⚡ **Stale system maps**: Existing system documentation is frequently outdated. The agent may build the system map from provided docs without verifying currency. Always tag system map entries with their source and date — flag anything older than 6 months for re-verification.
- ⚡ **Assumption without validation plan**: Every assumption must have a validation plan. The agent sometimes documents assumptions without specifying how or when they will be validated — this makes assumptions immortal. No validation plan = no assumption entry.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.context-documentation:0.1.2:2026-08-27T13:34:36Z -->
