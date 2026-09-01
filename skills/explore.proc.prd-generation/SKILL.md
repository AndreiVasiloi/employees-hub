+++
name = "explore.proc.prd-generation"
description = "Use this skill when you need to generate a Product Requirements Document from discovery outputs — converting validated Signals, hypotheses, personas, and journeys into structured requirements with a 4-group approval workflow. Activates after solution design is complete. Also relevant when someone says 'write the PRD,' 'document the requirements,' or 'what are we building.' Does NOT break requirements into epics — use Epic Forming for backlog structuring."
license = "Proprietary. See LICENSE.md"
+++

# PRD Generation

Generate Product Requirements Documents using Signal-to-PRD bridge with 4-group approval workflow.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Convert validated Signals into Product Requirements Documents
- Document product requirements with structured stakeholder approval
- Create specification artifacts for implementation (Govern phase)
- Bridge discovery outputs into actionable requirements
- Ensure all assumptions are tracked as open questions

## Pre-Check

If a PRD already exists at `explore/prds/[slug]-prd.md`:
1. Load the existing PRD
2. Present to the steering team: "Existing PRD found. Review and update, or create fresh?"
3. If updating → load existing content and skip to Group 4 (Specification Completion) for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before generating a PRD, ensure you have:

1. **Signal document** — The validated Signal from Signal Agent
2. **Hypothesis** — Validated hypothesis from Discovery
3. **Technical feasibility notes** — From Step 2 technical feasibility assessment
4. **Personas** — From Persona skill
5. **Journey Maps** — From Journey Mapping skill
6. **Context baseline** — From Context Documentation skill
7. **Market research** — `explore/explore-[slug]/market-research.md` (competitive positioning, market gaps)
8. **Regulatory compliance** — `explore/explore-[slug]/regulatory-compliance.md` (compliance requirements as product constraints)
9. **Glossary** — `explore/glossary.md` (canonical terminology for requirements)
10. **Slug** — Project identifier (e.g., `care-it`)

**Optional inputs** (enhance quality if available):
- Refined concepts (`explore/explore-[slug]/ideation/[slug]-refined-concepts.md`) — if ideation ran, experience design direction and architecture implications
- HLD (`explore/hlds/[slug]-hld.md`) — if already produced, enriches Technical Notes
- Risk register (`explore/explore-[slug]/risks.md`) — if updating PRD after risk documentation, risk-driven requirement amendments

**STOP**: If any required inputs (1–10) are missing, ask the human to provide them before proceeding.

## Signal-to-PRD Bridge

| Signal Field | PRD Section | Transformation |
|-------------|-------------|----------------|
| The Signal | Problem Statement | 2–4 sentences; strip tags; preserve meaning |
| Initial Evidence | Background / Research | Linked sources; flag `[ASSUMPTION]` items as unverified |
| Why This Matters | Goals / Value Proposition | Validated hypothesis → goals |
| Actors identified | Target Users | Actor + persona need statement |
| Expected outcomes | Success Metrics | Measurable, testable acceptance criteria |
| Constraints identified | Constraints | Direct transfer; flag `[ASSUMPTION]`-tagged items |
| Technical feasibility | Technical Notes | Step 2 baseline + architecture discovery enrichment (if available); HLD summary added when HLD exists |
| Severity score (1–5) | Priority | 1–2 Low · 3 Medium · 4–5 High |
| Resonance score (1–5) | Stakeholder Appetite | 1–2 Low · 3 Moderate · 4–5 High |
| `[ASSUMPTION]` claims | Open Questions | Every assumption → prioritised open question |

## Process Steps

### Group 1: Product Definition

| Step | File | Purpose | Gate |
|------|------|---------|------|
| 1 | [01-load-template.md](./steps/01-load-template.md) | Load PRD template and gather inputs | — |
| 2 | [02-product-definition.md](./steps/02-product-definition.md) | Generate product definition sections | — |
| 3 | [03-review-group-1.md](./steps/03-review-group-1.md) | Present Group 1 for human approval | PRD-1 |

### Group 2: Technical Specification

| Step | File | Purpose | Gate |
|------|------|---------|------|
| 4 | [04-technical-spec.md](./steps/04-technical-spec.md) | Generate technical specification sections | — |
| 5 | [05-review-group-2.md](./steps/05-review-group-2.md) | Present Group 2 for human approval | PRD-2 |

### Group 3: Quality Definition

| Step | File | Purpose | Gate |
|------|------|---------|------|
| 6 | [06-quality-definition.md](./steps/06-quality-definition.md) | Generate NFRs, DoD, DoR, testing & DevOps strategy | — |
| 7 | [07-review-group-3-quality.md](./steps/07-review-group-3-quality.md) | Present Group 3 for human approval | PRD-3 |

### Group 4: Specification Completion

| Step | File | Purpose | Gate |
|------|------|---------|------|
| 8 | [08-specification-completion.md](./steps/08-specification-completion.md) | Generate open questions, dependencies, assumptions, epic plan | — |
| 9 | [09-review-group-4.md](./steps/09-review-group-4.md) | Present Group 4 for human approval | PRD-4 |

### Write & Validate

| Step | File | Purpose | Gate |
|------|------|---------|------|
| 10 | [10-write-document.md](./steps/10-write-document.md) | Write complete PRD document | — |
| 11 | [11-validation.md](./steps/11-validation.md) | Run completeness validation | — |

## Output Format

```
explore/prds/[slug]-prd.md
```

**Slug-to-domain mapping**: The file name uses the slug (`[slug]-prd.md`), but the PRD title uses the domain name from the glossary (`PRD · [Domain Name]`). If slug ≠ domain name, the traceability header includes both `domain:` and `slug:` fields to maintain consistency.

**Template**: `templates/prd-template.md`

**Complete Structure**:
1. **Problem Statement** - User need and background
2. **Goals** - Measurable outcomes from hypothesis
3. **Success Metrics & KPIs** - Metrics table with targets
4. **Target Users** - From personas with need statements
5. **User Flows & Scenarios** - Primary, alternative, edge cases
6. **Functional Requirements** - Core and supporting features table
7. **Non-Functional Requirements** - Performance, security, reliability, usability
8. **Constraints** - Technical, business, regulatory, resource
9. **Out of Scope** - Explicitly excluded items
10. **Open Questions** - From assumptions, prioritised
11. **Technical Architecture** - Summary from HLD
12. **Risks & Mitigation** - From risk register
13. **Dependencies** - Upstream, downstream, external
14. **Epic Extraction** - Breakdown for implementation
15. **Approval & Sign-Off** - 4-role approval table

## Integration with Workflows

**Consumes**:
- **Context Documentation** — Problem statement and domain context
- **Hypothesis Documentation** — Validated hypothesis → goals and metrics
- **Persona** — Target users with need statements
- **Journey Mapping** — Pain points and opportunity moments → requirements
- **Market Research** — Competitive positioning and market gaps
- **Regulatory Compliance** — Compliance requirements as product constraints
- **Glossary** — Canonical terminology for requirement naming
- **Architecture Documentation** — HLD → technical architecture section (optional; enriches Technical Notes when available)
- **Risk Documentation** — Risk register → risks & mitigation (conditional: during PRD updates)

**Produces** (consumed by):
- **Information Architecture** (`explore.proc.information-architecture`) — Navigation requirements, page hierarchy
- **User Flow Creation** (`explore.proc.user-flow-creation`) — Requirements and user tasks define flow scope
- **Wireframing** (`explore.proc.wireframing`) — Requirements scope wireframe content
- **OOUX Analysis** (`explore.proc.ooux-analysis`) — Product description for object extraction
- **Hi-Fi Handoff** (`explore.proc.hifi-handoff`) — R-XXX requirement traceability
- **Risk Documentation** (`explore.proc.risk-documentation`) — Requirements analysis risks
- **Architecture Solutioning** (`explore.proc.architecture-solutioning`) — Requirements drive architecture
- **Test Strategy** (`explore.proc.test-strategy`) — Requirements to validate
- **Epic Forming** (`explore.proc.epic-forming`) — PRD → epic extraction for Govern phase

## Best Practices

**Do**:
- ✅ Use Signal-to-PRD bridge for consistent transformation
- ✅ Present each group for approval before proceeding
- ✅ Make success metrics measurable and time-bound
- ✅ Convert all [ASSUMPTION] items to open questions
- ✅ Link to all source artifacts (Signal, Hypothesis, HLD, etc.)
- ✅ Write acceptance criteria as testable statements
- ✅ Include both functional and non-functional requirements

**Don't**:
- ❌ Skip group-by-group approval workflow
- ❌ Leave assumptions untracked
- ❌ Write vague requirements without acceptance criteria
- ❌ Forget to link source artifacts
- ❌ Mix solution design into problem statement
- ❌ Skip non-functional requirements
- ❌ Proceed without all required inputs

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] All 15 PRD sections populated per template
- [ ] Signal-to-PRD bridge applied for all mapped fields
- [ ] Every `[ASSUMPTION]` tag converted to an open question
- [ ] All 4 group gates (PRD-1 through PRD-4) passed
- [ ] Success metrics are measurable and time-bound
- [ ] Source artifacts linked (Signal, Hypothesis, Personas, Journeys)
- [ ] Acceptance criteria are testable statements
- [ ] NFRs integrated alongside functional requirements

## Gotchas

- ⚡ **Requirements without acceptance criteria**: The agent tends to write requirements as narrative descriptions rather than testable statements. Every requirement must have at least one acceptance criterion — if you can't test it, it's not a requirement.
- ⚡ **Source artifact amnesia**: PRDs that don't link back to their source evidence (personas, journeys, hypotheses) become unverifiable. Always include explicit `[Source: ...]` references — a PRD requirement without provenance is an opinion.
- ⚡ **Non-functional requirements afterthought**: The agent frequently completes all functional requirements first, then adds NFRs as a thin appendix. NFRs (performance, security, accessibility) must be integrated alongside functional requirements — they shape the solution as much as features do.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.prd-generation:0.1.2:2026-08-31T11:34:43Z -->
