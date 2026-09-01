+++
name = "explore.proc.socialization-handoff"
description = "Use this skill when a hardened HLD is ready for wider review and you need to prepare it for the target audience — auditing for unnecessary complexity, simplifying language, polishing structure, and producing the final handoff package with all companion documents. Also relevant when someone says 'get this ready for review' or 'package this for the team.' Does NOT handle feedback from the review itself — use Feedback Integration for that."
license = "Proprietary. See LICENSE.md"
+++

# Socialization & Handoff

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:

- Audit an HLD for complexity that doesn't carry architectural weight
- Simplify the document for wider audience consumption without losing real decisions
- Polish terminology consistency, component descriptions, and cross-references
- Compile back-port findings for upstream document updates
- Produce the final handoff package (HLD + decision log + blocker register + back-port findings)
- Prepare a document that is socially defensible against avoidable debate

**Processes that use this skill**:
- Architecture Copilot (Step 4: Socialization & Handoff — primary skill)

**Key principle**: Wider audiences challenge visible complexity more than invisible correctness. Strip complexity that invites avoidable debate while preserving real decisions.

## Inputs to Request

Before preparing for socialization, ensure you have:

1. **Hardened HLD draft** — output of the Feedback Integration skill from Step 3 (`explore/hlds/[slug]-hld.md`)
2. **Decision log** — current state of all decisions (`explore/hlds/[slug]-decision-log.md`)
3. **Blocker register** — current state of all blockers (`explore/hlds/[slug]-blocker-register.md`)
4. **Target audience context** — who will review (engineers, PMs, leadership, other architects)
5. **Slug** — project identifier for file naming (e.g., `payments-reconciliation`)

**STOP**: If the hardened HLD draft is not available or BLOCKER items remain unresolved, return to Step 3 before proceeding.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-audit-public-state-model.md](./steps/01-audit-public-state-model.md) | Examine every public state for unnecessary visibility |
| 2 | [02-audit-infrastructure-abstraction.md](./steps/02-audit-infrastructure-abstraction.md) | Examine technology choices and abstraction level for unjustified complexity |
| 3 | [03-audit-event-model-structure.md](./steps/03-audit-event-model-structure.md) | Examine events for noise and document for redundancy |
| 4 | [04-simplification-summary.md](./steps/04-simplification-summary.md) | Compile all proposals from Steps 1-3 for architect selection |
| 5 | [05-apply-simplifications-polish.md](./steps/05-apply-simplifications-polish.md) | Apply architect-approved simplifications and run local polish pass |
| 6 | [06-final-review.md](./steps/06-final-review.md) | Present socialization-ready HLD for architect's final approval |
| 7 | [07-handoff-package-validate.md](./steps/07-handoff-package-validate.md) | Produce handoff package and run validation checklist |

## Output Format

```
explore/hlds/[slug]-hld.md
explore/hlds/[slug]-backport-findings.md
```

**Templates**:
- `templates/backport-findings.md` — Template for structured back-port findings
- `templates/backport-change-requests.md` — Template for actionable change requests routed to target document owners

1. **Final HLD** — socialization-ready version with all simplifications applied, terminology consistent, cross-references valid
2. **Back-Port Findings** — table of discoveries with finding, target document, recommended change, priority

**See example**: The Decision Log and Blocker Register use their respective skill templates — this skill updates them but does not define their format.

## Integration with Workflows

Architecture Copilot (Step 4: Socialization & Handoff) loads this skill as the primary domain skill (Lazy). It consumes the hardened HLD from Step 3 and produces the final handoff package. This is the last skill loaded in the engagement.

**Consumes**:
- **Feedback Integration** — References the hardened draft as input for simplification
- **Decision Log** — Feeds simplification selections as final entries; finalizes the log
- **Blocker Register** — Finalizes the register with resolution status for all entries

**Produces** (consumed by):
- **Govern Readiness** — Final HLD handoff package is a primary artifact in the Govern Readiness checklist
- **Back-port targets** — Back-port findings routed to upstream document owners (PRD, Risk Register, Glossary)

## Best Practices

**Do**:
- Present all simplification proposals for architect approval before applying
- Flag politically sensitive simplifications with stakeholder risk assessment
- Preserve all real architectural decisions — simplify presentation, not substance
- Ensure every back-port finding is actionable (target document + recommended change)
- Run cross-reference integrity check — broken links undermine credibility
- Document every applied simplification in the decision log with rationale

**Don't**:
- Apply simplifications without architect approval — this is politically sensitive
- Remove complexity that carries architectural weight — only strip presentational noise
- Skip the cross-reference integrity check — broken links are the #1 credibility killer
- Produce back-port findings without target documents — unrouted findings don't get acted on
- Forget to log simplifications in the decision log — they are architectural decisions too
- Rush the final review — this is the last quality gate before wider distribution

If you propose changes, keep them minimal and clearly scoped.

## Gotchas

- ⚡ **Substance vs. presentation confusion**: The agent sometimes removes genuinely important architectural complexity during simplification, mistaking it for jargon. Only strip presentational noise — if removing a term changes the meaning, it carries architectural weight and must stay.
- ⚡ **Political landmines**: Simplification proposals that rename or restructure sections owned by specific stakeholders can trigger political resistance. Flag any change that affects a named owner's section as "politically sensitive" and require explicit architect approval.
- ⚡ **Broken cross-references**: After simplification and restructuring, internal links and cross-references are the first thing to break. Always run the cross-reference integrity check as the final step — broken links are the #1 credibility killer during socialization.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.socialization-handoff:0.1.2:2026-09-01T08:21:28Z -->
