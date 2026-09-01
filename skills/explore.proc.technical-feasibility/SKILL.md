+++
name = "explore.proc.technical-feasibility"
description = "Use this skill when you need to identify technical feasibility constraints and opportunities that affect UX and design decisions — mapping system context, documenting data realities, and defining design guardrails. Activates after context documentation and domain analysis. Also relevant when someone says 'can we build this,' 'what are the technical limits,' or 'is this feasible.' Does NOT document general project risks — use Risk Documentation for impact/likelihood scoring and mitigation."
license = "Proprietary. See LICENSE.md"
+++

# Technical Feasibility and Trends

Identify feasibility constraints and opportunities that affect UX decisions based on technical context.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Understand technical constraints that shape UX decisions
- Map system context (existing platforms, dependencies, integrations)
- Document data realities (availability, quality, latency, ownership)
- Identify technical constraints (auth, roles, performance, offline, devices)
- Discover technical opportunities (automation, AI, personalization, instrumentation)
- Document technical risks and unknowns
- Define design constraints and guardrails for UX team
- Generate questions for engineering validation

**Key principle**: Technical feasibility analysis identifies constraints and opportunities that affect UX decisions, ensuring designs are grounded in technical reality while maximizing what's possible.

## Pre-Check

If a technical feasibility document already exists at `explore/explore-[slug]/technical-feasibility.md`:
1. Load the existing feasibility document
2. Present to the steering team: "Existing technical feasibility analysis found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before conducting technical feasibility analysis, ensure you have:

1. **Context baseline** - From Context Documentation skill (problem statement, scope)
2. **System context** - Existing systems, platforms, and integrations
3. **Technical constraints** - Known limitations from stakeholders
4. **Domain analysis** - From Domain Analysis skill (entities, rules)
5. **Slug** - Project identifier for file naming (e.g., `care-it`)

**Optional inputs**:
- Existing architecture documentation
- System diagrams or data models
- Performance requirements
- Device/platform requirements
- Engineering team input

**STOP**: If system context is unclear, work with engineering stakeholders to understand existing technical landscape.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-system-context.md](./steps/01-system-context.md) | Map system context |
| 2 | [02-data-realities.md](./steps/02-data-realities.md) | Document data realities |
| 3 | [03-technical-constraints.md](./steps/03-technical-constraints.md) | Identify technical constraints |
| 4 | [04-opportunities.md](./steps/04-opportunities.md) | Discover technical opportunities |
| 5 | [05-risks-unknowns.md](./steps/05-risks-unknowns.md) | Document technical risks and unknowns |
| 6 | [06-design-guardrails.md](./steps/06-design-guardrails.md) | Define design constraints and guardrails |
| 7 | [07-engineering-questions.md](./steps/07-engineering-questions.md) | Generate questions for engineering |
| 8 | [08-write-document.md](./steps/08-write-document.md) | Write technical feasibility document |
| 9 | [09-validation.md](./steps/09-validation.md) | Run completeness validation |

## Output Format

```
explore/explore-[slug]/technical-feasibility.md
```

**Template**: `templates/technical-feasibility-template.md`

**Complete Structure** (7 sections):
1. **System Context** - Platforms, dependencies, integrations, tech stack, deployment
2. **Data Realities** - Availability, quality, latency, ownership, gaps, implications
3. **Technical Constraints** - Auth, performance, offline, devices, APIs, security, legacy
4. **Technical Opportunities** - Automation, AI, personalization, analytics, real-time, progressive enhancement
5. **Technical Risks and Unknowns** - Risks, unknowns, debt, scalability, integration
6. **Design Constraints and Guardrails** - Must/should constraints, performance, data, interaction, accessibility, device
7. **Questions for Engineering** - Targeted questions by category with rationale

## Integration with Workflows

**Consumes**:
- **Context Documentation** — Provides technical context for constraints
- **Domain Analysis** — Technical constraints inform domain rules
- **Regulatory and Compliance Focus** — Security and compliance constraints

**Produces** (consumed by):
- **Hypothesis Documentation** (`explore.proc.hypothesis-documentation`) — Technical constraints feed hypothesis
- **Problem Framing** (Step 3 Phase A) — Technical constraints inform framing
- **Raw Ideas** (Step 3 Phase C) — Technical opportunities as divergence seeds
- **Idea Evaluation** (Step 3 Phase D) — Feasibility as evaluation criterion
- **PRD Generation** (`explore.proc.prd-generation`) — Technical notes and constraints
- **Information Architecture** (`explore.proc.information-architecture`) — Technical constraints shape navigation and structure
- **Architecture Context** (`explore.proc.architecture-context`) — Technical context informs architecture context
- **Architecture Solutioning** (`explore.proc.architecture-solutioning`) — Technical constraints inform HLD
- **Risk Documentation** (`explore.proc.risk-documentation`) — Technical risks feed into overall risk register

## Best Practices

**Do**:
- ✅ Engage engineering early (before design decisions are made)
- ✅ Document constraints with rationale (why they exist)
- ✅ Identify opportunities (not just constraints)
- ✅ Create clear guardrails for designers (what's allowed/not allowed)
- ✅ Generate specific questions (not generic "is this feasible?")
- ✅ Understand data realities (availability, quality, latency)
- ✅ Document technical risks (what could go wrong)
- ✅ Distinguish must vs should constraints (what's negotiable)

**Don't**:
- ❌ Assume technical feasibility without validation
- ❌ Ignore data realities (designs fail when data doesn't exist)
- ❌ Skip performance considerations (slow = bad UX)
- ❌ Forget about offline and connectivity (not everyone has perfect internet)
- ❌ Overlook device constraints (not everyone has latest devices)
- ❌ Miss opportunities for automation or AI (technology can enable better UX)
- ❌ Create designs that violate must constraints (will be rejected)
- ❌ Forget to validate assumptions with engineering (ask questions)

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] System context mapped with integration points
- [ ] Data realities documented (availability, quality, latency)
- [ ] Constraints classified as MUST / SHOULD / COULD
- [ ] Technical opportunities paired with effort estimates
- [ ] Design guardrails defined for downstream design work
- [ ] Specific questions generated for engineering validation

## Gotchas

- ⚡ **Constraint vs. preference confusion**: The agent frequently treats engineering preferences as hard constraints (e.g., "we always use PostgreSQL" becomes a must-have). Always classify constraints as MUST (non-negotiable) vs. SHOULD (preferred) vs. COULD (nice-to-have) — false constraints limit design space unnecessarily.
- ⚡ **Opportunity overreach**: Technical opportunities (AI, personalization, automation) are exciting but can derail scope. The agent tends to list every possible opportunity without feasibility assessment. Always pair each opportunity with an effort estimate and dependency list.
- ⚡ **Stale platform assumptions**: The agent may document platform capabilities based on training data that predates recent platform changes. Always tag platform capability claims with their verification status — unverified claims must be flagged for engineering review.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.technical-feasibility:0.1.2:2026-08-27T13:34:37Z -->
