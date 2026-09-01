+++
name = "explore.proc.feedback-integration"
description = "Use this skill when stakeholders have reviewed an HLD draft and you need to process their feedback — classifying each change as improvement, regression, or contradiction, checking for consistency across the document, and hardening the draft before the next review cycle. Also relevant when someone says 'we got comments back' or 'integrate the review notes.' Does NOT collect feedback from stakeholders — it processes feedback that already exists. Does NOT produce the initial HLD — use HLD Drafting for that."
license = "Proprietary. See LICENSE.md"
+++

# Feedback Integration

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:

- Audit stakeholder-edited HLD versions for consistency before rewriting
- Classify each piece of stakeholder feedback (accept / modify / reject / defer to LLD)
- Detect silent decision reversals, terminology drift, and boundary ownership shifts
- Run canonical hardening checks for implementation safety (determinism, contracts, boundaries, failure modes)
- Classify hardening findings by severity (BLOCKER / SIGNIFICANT / MINOR)
- Produce a traceable feedback disposition log

**Processes that use this skill**:
- Architecture Solutioning (B.3: Review & Hardening — primary skill)

**Key principle**: Stakeholder feedback is input to be evaluated through the established truth hierarchy, not truth to be incorporated. Audit BEFORE rewriting.

## Inputs to Request

Before integrating feedback, ensure you have:

1. **Stakeholder-edited HLD or external critique** — the new version or feedback document uploaded by the architect
2. **Last canonical draft** — the most recent architect-approved HLD version (`explore/hlds/[slug]-hld.md`)
3. **Decision log** — current state of all decisions (`explore/hlds/[slug]-decision-log.md`)
4. **Blocker register** — current state of all blockers (`explore/hlds/[slug]-blocker-register.md`)
5. **Truth hierarchy** — which documents are canonical vs directional (from boundary map)
6. **Slug** — project identifier for file naming (e.g., `payments-reconciliation`)

**STOP**: If the stakeholder feedback has not been uploaded by the architect, request it before proceeding.

## Procedure

Execute each step file in order. Load one step at a time.

1. [Catalog Feedback Sources](steps/01-catalog-feedback-sources.md) — Identify source, role, and scope before analysis
2. [Consistency Audit](steps/02-consistency-audit.md) — Compare stakeholder version against canonical draft BEFORE rewriting
3. [Feedback Disposition](steps/03-feedback-disposition.md) — Recommend accept/modify/reject/defer for each item
4. [Integrate Feedback and Regression Check](steps/04-integrate-regression-check.md) — Apply approved feedback and verify no regressions
5. [Evidence Escalation](steps/05-evidence-escalation.md) — Force-resolve assumptions with real upstream evidence
6. [Canonical Hardening](steps/06-canonical-hardening.md) — Run BASE + EXTENDED + DOMAIN hardening checklists
7. [Classify Hardening Findings](steps/07-classify-hardening-findings.md) — Severity classification with priority-ordered resolution
8. [Validate and Write Disposition Log](steps/08-validate-write-disposition-log.md) — Run validation checklist and write final log

## Output Format

```
explore/hlds/[slug]-feedback-disposition.md
```

**Template**: `templates/feedback-disposition.md`

1. **Header** — HLD name, date, feedback source, canonical draft version reviewed against
2. **Consistency Audit Summary** — table of changes with classification (Improvement / Neutral / Regression / Contradiction)
3. **Feedback Disposition** — table of items with disposition (Accept / Modify / Reject / Defer) and rationale
4. **Regression Check** — pass/fail checklist for decision stability, boundary ownership, semantic consistency
5. **Hardening Findings** — table of findings with category, severity, and recommended resolution
6. **Summary** — counts for feedback dispositions and hardening severity distribution

## Integration with Workflows

Architecture Solutioning (B.3: Review & Hardening) loads this skill as the primary domain skill (Lazy). It consumes the canonical HLD draft from B.2 and the stakeholder feedback uploaded by the architect. The hardened, feedback-integrated HLD feeds into the Socialization & Handoff skill in B.4.

**Consumes**:
- **HLD Drafting** (`explore.proc.hld-drafting`) — Canonical draft as the baseline for consistency audit

**Produces** (consumed by):
- **Decision Log** (`explore.util.decision-log`) — Feedback dispositions and hardening decisions as new entries
- **Blocker Register** (`explore.util.blocker-register`) — ASSUMED contracts and hardening findings as new blockers
- **Socialization & Handoff** (`explore.proc.socialization-handoff`) — Hardened draft as input for simplification and polish

## Best Practices

**Do**:
- Run the consistency audit BEFORE any rewriting — surface contradictions first
- Treat stakeholder feedback as input to be adjudicated, not truth to be pasted in
- Provide a rejection rationale for every rejected item — cite the architectural rule violated
- Run regression check immediately after integration, before hardening
- Classify every hardening finding with severity AND evidence
- Present hardening categories one at a time for focused architect review

**Don't**:
- Accept all stakeholder feedback uncritically — evaluate through the truth hierarchy
- Skip the consistency audit — rewriting before understanding changes launders regressions
- Blur the distinction between BLOCKER and SIGNIFICANT — use the severity definitions
- Silently reopen previously resolved decisions — flag every reopening immediately
- Combine feedback integration and hardening results into one undifferentiated list
- Proceed to Step 4 with unresolved BLOCKER items unless architect explicitly defers them

If you propose changes, keep them minimal and clearly scoped.

## Completeness Checklist

- [ ] All feedback items catalogued with source and authority level
- [ ] Each item classified (accept, reject, defer, clarify)
- [ ] Rejection rationale cites specific architectural rule
- [ ] Accepted changes applied to the HLD
- [ ] Regression check passed after all changes
- [ ] Decision log updated for every accepted change
- [ ] Blocker register updated if new blockers surfaced

## Gotchas

- ⚡ **Contradiction averaging**: When two reviewers give contradictory feedback, the agent tends to "split the difference." This destroys both signals. Always escalate contradictions to the architect as a decision point — never average.
- ⚡ **Phantom regression**: Changing one section to satisfy feedback can silently break consistency in another section. Always run the full consistency audit after every feedback integration pass, not just on the changed sections.
- ⚡ **Authority inversion**: Junior reviewers sometimes give technically correct feedback that conflicts with a senior architect's strategic decision. Always check feedback against the truth hierarchy before applying.
- ⚡ **Hardening scope creep**: Extended and domain hardening checks can surface dozens of findings. Present them categorized by severity — don't dump an undifferentiated list on the architect.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.feedback-integration:0.1.2:2026-09-01T08:21:27Z -->
