+++
name = "explore.proc.domain-analysis"
description = "Use this skill when you need to analyze a domain in depth — defining entities, modeling relationships, documenting business rules, and creating a shared vocabulary that supports product decisions. Activates after context documentation establishes the baseline. Also relevant when someone says 'map the domain,' 'what are the business rules,' or 'how do these entities relate.' Does NOT capture initial domain vocabulary — use Domain Onboarding for lightweight profiling of a new domain."
license = "Proprietary. See LICENSE.md"
+++

# Domain Analysis

Analyze the domain to understand entities, relationships, rules, and constraints that support product decisions.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Understand the domain deeply to support product decisions
- Define domain entities, relationships, and lifecycle states
- Document domain rules, constraints, and business logic
- Clarify user roles and responsibilities within the domain
- Map current state and identify pain points
- Identify domain risks and unknowns
- Create a shared domain vocabulary (glossary)
- Support technical architecture and data modeling

**Key principle**: Domain analysis focuses on understanding the domain in a way that supports product decisions, not creating a generic overview. It provides the foundation for designing solutions that align with how the domain actually works.

## Pre-Check

If a domain analysis already exists at `explore/domain/domain-analysis-[slug].md`:
1. Load the existing domain analysis
2. Present to the steering team: "Existing domain analysis found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before conducting domain analysis, ensure you have:

1. **Context baseline** - From Context Documentation skill (problem statement, scope)
2. **Signal document** - Initial domain context and actors
3. **Stakeholder input** - Domain experts who can validate understanding
4. **Product concept** - What you're building and why
5. **Slug** - Project identifier for file naming (e.g., `care-it`)

**Optional inputs**:
- Existing domain documentation or glossaries
- Current system diagrams or data models
- Business process documentation
- Regulatory or compliance requirements

**STOP**: If domain experts are not available, document assumptions and flag them for validation.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-domain-glossary.md](./steps/01-domain-glossary.md) | Define shared vocabulary for consistent communication |
| 2 | [02-domain-entities.md](./steps/02-domain-entities.md) | Model core entities and relationships |
| 3 | [03-lifecycle-states.md](./steps/03-lifecycle-states.md) | Document how entities change over time |
| 4 | [04-domain-rules.md](./steps/04-domain-rules.md) | Define rules and constraints |
| 5 | [05-user-roles.md](./steps/05-user-roles.md) | Map user roles and responsibilities |
| 6 | [06-current-state.md](./steps/06-current-state.md) | Document current state and pain points |
| 7 | [07-risks-and-unknowns.md](./steps/07-risks-and-unknowns.md) | Identify domain risks and unknowns |
| 8 | [08-domain-summary.md](./steps/08-domain-summary.md) | Create domain model summary |
| 9 | [09-assumptions.md](./steps/09-assumptions.md) | List assumptions to validate |
| 10 | [10-write-document.md](./steps/10-write-document.md) | Write domain analysis document |
| 11 | [11-validation.md](./steps/11-validation.md) | Run completeness validation |

## Output Format

```
explore/explore-[slug]/domain-analysis.md
```

**Template**: `templates/domain-analysis-template.md`

**Complete Structure** (9 sections):
1. **Domain Glossary** - Terms, definitions, synonyms, examples
2. **Domain Model** - Entities, attributes, relationships, categories
3. **Entity Lifecycle States** - States, transitions, rules per entity
4. **Domain Rules and Constraints** - Business rules, constraints, invariants, validations
5. **User Roles and Responsibilities** - Roles, permissions, tasks, permission matrix
6. **Current State** - Processes, systems, pain points, what works well
7. **Domain Risks and Unknowns** - Unknowns, assumptions, risks, edge cases
8. **Domain Model Summary** - Core entities, relationships, implications
9. **Assumptions to Validate** - Prioritized assumptions with validation plan

## Integration with Workflows

**Consumes**:
- **Context Documentation** — Provides domain foundation for problem statement
- **Signal Document** — Initial domain context and actors

**Produces** (consumed by):
- **Glossary** — Domain vocabulary feeds canonical glossary
- **Hypothesis Documentation** (`explore.proc.hypothesis-documentation`) — Entity relationships and domain rules feed hypothesis
- **Problem Framing** (Step 3 Phase A) — Domain context frames ideation
- **Raw Ideas** (Step 3 Phase C) — Domain entities as divergence seeds
- **Domain Finalization** (Step 4 inline) — Domain analysis becomes the final domain model
- **Market Research** (`explore.proc.market-research`) — Domain understanding informs competitive analysis
- **Persona** (`explore.proc.persona`) — Domain roles inform user personas
- **Journey Mapping** (`explore.proc.journey-mapping`) — Domain processes inform journey stages
- **OOUX Mapping** (`explore.proc.ooux-mapping`) — Domain vocabulary cross-referenced during extraction
- **Design Language** (`explore.proc.design-language`) — Domain tone classification drives token generation
- **Architecture Context** (`explore.proc.architecture-context`) — Domain model informs architecture context
- **Architecture Solutioning** (`explore.proc.architecture-solutioning`) — Domain model informs system design
- **PRD Generation** (`explore.proc.prd-generation`) — Domain rules inform functional requirements
- **Risk Documentation** (`explore.proc.risk-documentation`) — Domain risks feed into overall risk register

## Best Practices

**Do**:
- ✅ Focus on domain understanding that supports product decisions
- ✅ Define terms clearly and use them consistently
- ✅ Document business rules explicitly (don't assume they're obvious)
- ✅ Map entity relationships and lifecycle states
- ✅ Define roles by domain responsibility, not job titles
- ✅ Identify what you don't know and need to validate
- ✅ Tag assumptions as [VALIDATED] or [NEEDS VALIDATION]
- ✅ Document current state to understand what to preserve

**Don't**:
- ❌ Create a generic domain overview without actionable insights
- ❌ Use ambiguous or inconsistent terminology
- ❌ Skip business rules (they're critical for validation logic)
- ❌ Confuse domain roles with organizational roles
- ❌ Ignore current state and existing pain points
- ❌ Assume domain knowledge is shared (make it explicit)
- ❌ Document everything (focus on what matters for product decisions)
- ❌ Forget to identify and prioritize assumptions

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] Domain entities identified with relationships mapped
- [ ] Business rules extracted into structured table (not buried in narrative)
- [ ] Domain vocabulary defined with consistent usage
- [ ] Domain roles distinguished from organizational roles
- [ ] Bounded contexts or sub-domains identified
- [ ] Assumptions tagged [VALIDATED] or [NEEDS VALIDATION]

## Gotchas

- ⚡ **Domain role vs. organizational role confusion**: The agent frequently conflates domain roles (e.g., "approver", "reviewer") with organizational roles (e.g., "team lead", "manager"). Domain roles describe what actors do in the system; organizational roles describe reporting structure. Keep them separate.
- ⚡ **Over-documentation**: The agent tends to document every entity and relationship exhaustively. Focus domain analysis on entities that drive product decisions — a complete domain model is a goal for architects, not for product discovery.
- ⚡ **Business rules buried in narrative**: Business rules expressed in paragraph form are easily missed by downstream consumers. Always extract business rules into a structured table or numbered list — narrative descriptions of rules are unreliable.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.domain-analysis:0.1.2:2026-08-27T13:34:37Z -->
