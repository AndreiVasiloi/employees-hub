+++
name = "explore.proc.hypothesis-documentation"
description = "Use this skill when you need to document evidence-based hypotheses with measurable success criteria and validation tracking — bridging discovery insights to solution design decisions. Activates after discovery produces evidence worth formalizing. Also relevant when someone says 'what do we believe,' 'what should we validate,' or 'turn these insights into testable hypotheses.' Does NOT plan how to validate them — use Discovery Planning to structure validation activities."
license = "Proprietary. See LICENSE.md"
+++

# Hypothesis Documentation

Document evidence-based hypotheses with validation tracking and measurable success criteria.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Draft hypotheses from discovery evidence
- Document evidence base and assumptions
- Track stakeholder validation
- Record hypothesis outcomes and validation status
- Bridge discovery insights to solution design

## Pre-Check

If hypothesis documentation already exists at `explore/explore-[slug]/hypotheses.md`:
1. Load the existing hypotheses
2. Present to the steering team: "Existing hypotheses found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before creating hypothesis documentation, ensure you have:

1. **Context baseline** — From Context Documentation skill
2. **Personas** — From Persona skill
3. **Journey maps** — From Journey Mapping skill
4. **Signal document** — "Why This Matters" section
5. **Market research** — `explore/explore-[slug]/market-research.md` (competitive gaps, white space)
6. **Domain analysis** — `explore/explore-[slug]/domain-analysis.md` (entity relationships, domain rules)
7. **Technical feasibility** — `explore/explore-[slug]/technical-feasibility.md` (technical constraints)
8. **Slug** — Project identifier for file naming (e.g., `care-it`)

**STOP**: If context, personas, or journey maps are missing, create them first. Market research, domain analysis, and technical feasibility are strongly recommended — hypotheses without these inputs lack competitive, domain, and technical grounding.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-gather-evidence.md](./steps/01-gather-evidence.md) | Collect evidence from discovery artifacts |
| 2 | [02-draft-hypothesis.md](./steps/02-draft-hypothesis.md) | Draft hypothesis using standard format |
| 3 | [03-evidence-base.md](./steps/03-evidence-base.md) | Link hypothesis to discovery evidence |
| 4 | [04-identify-assumptions.md](./steps/04-identify-assumptions.md) | List assumptions embedded in hypothesis |
| 5 | [05-success-criteria.md](./steps/05-success-criteria.md) | Define measurable success criteria |
| 6 | [06-stakeholder-validation.md](./steps/06-stakeholder-validation.md) | Present hypothesis for stakeholder confirmation |
| 7 | [07-update-status.md](./steps/07-update-status.md) | Update status after stakeholder validation |
| 8 | [08-write-document.md](./steps/08-write-document.md) | Write hypothesis document |
| 9 | [09-validation.md](./steps/09-validation.md) | Run completeness validation |

## Output Format

```
explore/explore-[slug]/hypothesis.md
```

**Template**: `templates/hypothesis-template.md`

**Structure**:
- Hypothesis Statement
- Evidence Base (table with sources and validation status)
- Assumptions to Validate (table)
- Success Criteria (table with metrics and targets)
- Stakeholder Validation (record)
- Status, dates, and validation notes

## Integration with Workflows

**Consumes**:
- **Context Documentation** — Problem reframe, constraints, and assumptions feed hypothesis
- **Persona** — User needs articulation feeds hypothesis
- **Journey Mapping** — Pain points and opportunity moments feed hypothesis
- **Market Research** — Competitive gaps and white space feed hypothesis
- **Domain Analysis** — Entity relationships and domain rules feed hypothesis
- **Technical Feasibility** — Technical constraints feed hypothesis

**Produces** (consumed by):
- **Problem Framing** (Step 3 Phase A) — Validated direction frames ideation
- **Raw Ideas** (Step 3 Phase C) — Assumptions as divergence seeds
- **PRD Generation** (`explore.proc.prd-generation`) — Hypothesis outcomes become PRD goals

## Best Practices

**Do**:
- ✅ Use specific user/persona names, not generic "users"
- ✅ Base hypothesis on discovery evidence, not assumptions
- ✅ Make success criteria measurable and time-bound
- ✅ Identify and document all critical assumptions
- ✅ Get stakeholder validation before proceeding to design
- ✅ Link hypothesis to specific evidence sources
- ✅ Define what would invalidate the hypothesis

**Don't**:
- ❌ Create vague hypotheses without measurable outcomes
- ❌ Skip evidence documentation
- ❌ Assume all evidence is validated
- ❌ Forget to identify critical assumptions
- ❌ Proceed to design without stakeholder validation
- ❌ Make success criteria unmeasurable (e.g., "users will be happier")

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] Every hypothesis is falsifiable with measurable criteria
- [ ] Evidence linked to each hypothesis (independent per hypothesis)
- [ ] Assumptions separated from validated facts with tags
- [ ] Success criteria are quantifiable and time-bound
- [ ] Invalidation criteria defined (what would disprove the hypothesis)
- [ ] Stakeholder validation obtained

## Gotchas

- ⚡ **Unfalsifiable hypotheses**: The agent tends to write hypotheses that can only be confirmed, not disproven (e.g., "Users may benefit from..."). Every hypothesis must be falsifiable — if no outcome could disprove it, it's not a hypothesis.
- ⚡ **Evidence laundering**: The agent sometimes cites the same piece of evidence across multiple hypotheses, making all of them appear well-supported. Each hypothesis should have independent evidence — shared evidence should be flagged as a single point of support.
- ⚡ **Assumption → validated creep**: Over time, `[ASSUMPTION]` tags tend to be silently upgraded to `[VALIDATED]` without actual validation occurring. Always require explicit validation evidence (date, method, source) before changing any tag.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hypothesis-documentation:0.1.2:2026-08-27T13:34:43Z -->
