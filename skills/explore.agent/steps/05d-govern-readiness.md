# Step 5d: Govern Readiness

## Entry Condition

Epic forming completed (human-triggered) — proceed from [`05c-epic-forming.md`](./05c-epic-forming.md).

---

## Part 4: Govern Readiness Check

**The agent runs this checklist — not the human.**

Agent evaluates each item based on artifacts produced throughout the session. For each item it cannot confirm from artifacts alone, it asks the human a single targeted question.

> **Load before running**: [Govern Readiness Checklist](../references/completeness-checklist.md) § Step 5 — Govern Readiness Check. Evaluate each item; return here for the STOP gate.

**If any items are ✗**: agent identifies the specific artifact or action that closes the gap and proposes it.

**STOP — AskUserQuestion (only for ✗ items the agent cannot close from artifacts):**

```
Question SB-4
  Header:      "Govern Readiness gaps"
  Question:    "I found [N] items I cannot confirm from the artifacts alone.
                I need your input on: [specific items listed]."
  Multi-select: No
  Options:
    - I'll answer them now     — Provide input in the next message
    - They can be closed now   — Tell me what artifact or action closes each
    - Accept as known gaps     — Document as explicitly deferred with an owner
```

**After user responds:**
- Close gaps with provided information or artifacts
- Document deferred items with owners
- Update discovery.md status to PRD-READY
- Continue to Final Confirmation

---

### Human Checkpoint: Govern Readiness

**Final review before completing Step 5.**

**Review Criteria:**
- [ ] All Govern Readiness checklist items are ✓
- [ ] All gaps are closed or explicitly deferred
- [ ] Consistency check passed
- [ ] Epic forming completed
- [ ] All artifacts are in correct locations

**Questions to consider:**
- Is Govern ready to execute without additional discovery?
- Are all critical gaps closed?
- Should we address any deferred items before handoff?

**Once reviewed:**
- Step 5 is complete
- Explore phase is complete
- Ready for Govern phase handoff

Once all items are confirmed, agent updates `discovery.md` status to PRD-READY and proceeds to final confirmation.

---

## Final Confirmation

**Agent presents complete artifact set:**

> **Load template**: see [Completeness Checklist](../references/completeness-checklist.md) § Step 5 — Final Confirmation Template. Present the full artifact set using that template.

---

## Exit Criteria (Gate Out)

Before completing Step 5 and handing off to Govern, verify:

> **Full checklist**: see [Completeness Checklist](../references/completeness-checklist.md) § Step 5 — Exit Criteria. Verify all items before completing Explore phase.

**If any criterion fails, STOP and address before completing Explore phase.**

---

## Related

- **Previous Step:** `04-solution-design.md` (requires human trigger — say `Explore PRD & Experience Design`)
- **Next Step:** Govern Phase (separate process - requires human trigger)
- **Refinement:** `06-refinement.md` (say `Explore Refinement` if new inputs arrive)
- **Skills Used:** 
  - Architecture Solutioning (Part 1): `explore.proc.architecture-solutioning` (orchestrates B.0–B.4; manages all sub-skills internally)
  - `explore.proc.test-strategy` (invoked in Part 2 after HLD, before epic forming)
  - `explore.proc.define-devops-strategy` (invoked in Part 2 after HLD, before epic forming)
- **Artifacts Folders:** 
  - `explore/hlds/` (HLD, boundary map, truth hierarchy, design sketch, decision log, blocker register)
  - `explore/decisions/` (ADRs)
  - `explore/prds/` (PRD — from Step 4)
  - `explore/epics/` (epics)
  - `explore/domain/` (domain model)
  - `explore/explore-[slug]/` (all discovery artifacts, test strategy, devops strategy)
- **Key Files:** 
  - `[slug]-hld.md` (socialization-ready HLD)
  - `[slug]-adr-*.md` (architectural decision records)
  - `[slug]-prd.md` (complete PRD — from Step 4)
  - `[slug]-domain.md` (locked domain model)
  - `DFE-[EPIC-ID].md` (formed epics)
  - `discovery.md` (artifact index - status: PRD-READY)
  - `glossary.md` (updated terminology)

---

## Workflow Complete

**STOP HERE** - Architecture, Strategy & Backlog step has finished.

**Explore Phase Complete**

This is the final step of the Explore Agent process. The Explore phase is now complete.

**What to do next:**

1. **Handoff to Govern:** The Govern Agent can now execute using the complete artifact set
2. **Review all artifacts:** Check the complete specification set in `explore/` before handoff
3. **Refinement (if needed):** Say `Explore Refinement` if new inputs arrive

**Do NOT automatically proceed to Govern. Human decision required for phase transition.**
