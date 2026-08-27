# Step 6: Refinement

**Consolidates**: Lightweight iteration workflow (from davaflow.explore.refine)

**Objective**: Handle incremental updates to specifications, epics, or tasks without re-running the entire Explore workflow. Enables fast iteration on changing requirements, new feedback, or decisions.

---

## Trigger Phrases

| Shorthand | Full Phrase |
|-----------|-------------|
| `Explore Refinement` | `Let's refine the explore artifacts...` |
| `Update the PRD with [new requirement]` | `Add [constraint] to the technical feasibility...` |
| `New feedback: [change]` | `Stakeholder decision: [update]...` |
| `Refine [artifact] based on [input]` | `Update [artifact] with new information...` |

---

## Prerequisites (Gate In)

Before running this step:
- [ ] At least one artifact from Steps 1-5 exists
- [ ] The change/update/feedback is clearly defined
- [ ] Change is incremental (not fundamental restructuring)

**If prerequisites are not met or change is too large, re-run the appropriate full step instead.**

---

## Execution Settings

> See SKILL.md § Execution Defaults for temperature, one-step-at-a-time, and Human-First rules.

**Step-specific risks with high temperature (>0.5):**
- Incorrect impact assessment (missing affected artifacts)
- Hallucinated dependencies
- Inconsistent updates across artifacts
- False confidence in consistency checks

---

## Loader Protocol

Every `**Load skill:**` block in this step MUST be executed as follows:

1. **Check presence:**
   ```bash
   dft skills list --json | jq -e '.[] | select(.slug == "<slug>")'
   ```
2. **Install if missing:**
   ```bash
   dft skills add <slug>
   ```
   `dft skills add` resolves transitive dependencies automatically.
3. **Install optional sub-skills, if any.** `dft skills add <slug>` (step 2) resolves the full transitive `requires` tree automatically. Any `optional = [...]` entries in the skill's `flow.toml` are NOT resolved by `dft` and must be installed explicitly by the step body when the corresponding sub-step may run (see Step 5 § Sub-skill Install Pass for the canonical pattern).
4. **On install failure**, branch by class:
   - **Workflow skill** → **STOP**. Surface the `dft` error to the steering team. Do not proceed to the next action.
   - **Auxiliary skill** → warn the steering team, note degraded quality, continue.
5. **Confirm readiness** before executing the skill:
   ```
   ✓ <slug> ready
   ```

**Classification for this step (conditional — only the skills covering the affected artifact are loaded):**

| Slug | Class | On install failure |
|------|-------|--------------------|
| `explore.proc.prd-generation` | workflow | STOP — PRD update cannot be produced |
| `explore.proc.hld-drafting` | workflow | STOP — HLD/ADR update cannot be produced |
| `explore.proc.persona` | auxiliary | warn + continue with inline persona update |
| `explore.proc.journey-mapping` | auxiliary | warn + continue with inline journey update |
| `explore.proc.risk-documentation` | auxiliary | warn + continue with inline risk update |

---

## When to Use This Step

**Use this instead of re-running Steps 1-5 when:**
- New requirement emerges after PRD approval
- Stakeholder provides feedback on existing artifacts
- Technical constraint discovered during Govern
- Scope adjustment needed (add/remove feature)
- Compliance requirement added
- Architecture decision changes

---

## What This Step Does

1. **Identify Affected Artifacts** - Determine which artifacts need updates (not full re-run)
2. **Load Minimal Context** - Load only affected artifacts + dependencies
3. **Apply Updates** - Update specific sections, not entire artifacts
4. **Validate Consistency** - Check updated artifacts align with unchanged ones
5. **Notify Stakeholders** - Inform relevant parties of changes

---

## Workflow

### Step 1: Assess Impact (Human Leads)

**Human-First Pattern: Steering team describes change, agent proposes impact, steering team approves before updates**

**Agent asks:**

```
What needs to be updated?

Please provide:
1. The change/new requirement/feedback
2. Which artifact(s) it affects (if known)
3. Urgency (blocking Govern / nice-to-have)
```

**Agent analyzes and proposes (does NOT make changes yet):**

```
Impact Assessment:

Change: [user input]

Affected artifacts (will update):
  ✓ [artifact 1] — Section: [specific section]
  ✓ [artifact 2] — Section: [specific section]

Dependent artifacts (will validate):
  ⚠ [artifact 3] — Check: [consistency check]
  ⚠ [artifact 4] — Check: [consistency check]

Unaffected artifacts (no changes):
  • [artifact 5]
  • [artifact 6]

Estimated effort: [Low / Medium / High]
  Low: Single section update
  Medium: Multiple sections or cross-artifact
  High: Requires re-running activity (suggest full step re-run instead)
```

**STOP — AskUserQuestion:**

```
Question R-1
  Header:      "Impact assessment (HUMAN APPROVES BEFORE CHANGES)"
  Question:    "I've identified which artifacts need updates (above).
                I will NOT make any changes until you approve.
                Does this impact assessment look correct?"
  Multi-select: No
  Options:
    - Correct — proceed           — Apply updates as proposed
    - Add another artifact        — Tell me which artifact also needs updating
    - This is too big for refinement — Re-run the full step instead
    - Cancel                      — Don't make any changes
```

**After user responds:**
- If correct: Steering team has approved changes; continue to Step 2 (Load Minimal Context)
- If adding artifact: Update impact assessment and re-present for approval
- If too big: Recommend which full step to re-run; do NOT proceed with refinement
- If cancel: Stop without making any changes

**Human-First Enforcement:**
- Agent does NOT make any changes until steering team approves impact assessment
- Steering team controls which artifacts get updated (leading authority)
- Agent proposes, steering team decides, then agent executes

---

### Human Checkpoint: Impact Assessment Review

**Pause for human review before loading context.**

**Review Criteria:**
- [ ] All affected artifacts are identified
- [ ] Dependent artifacts for validation are correct
- [ ] Effort estimate is realistic
- [ ] Change is appropriate for refinement (not too large)

**Questions to consider:**
- Does the impact assessment capture all affected areas?
- Should this be a full step re-run instead?
- Are there any hidden dependencies?

**Once reviewed:**
- Continue to Step 2 (Load Minimal Context)
- OR stop here and re-run full step if change is too large

---

### Step 2: Load Minimal Context - Conditional Skill Loading

**Check if specialized skills are needed for updates:**

**If updating PRD:**
> **Load skill:** `explore.proc.prd-generation` — follow Loader Protocol above. Workflow skill.
> 
> Use for PRD section updates.

**If updating HLD or ADRs:**
> **Load skill:** `explore.proc.hld-drafting` — follow Loader Protocol above. Invoke with `mode: baseline`. Workflow skill.
> 
> Use for architecture updates.

**If updating personas or journeys:**
> **Load skill:** `explore.proc.persona` or `explore.proc.journey-mapping` — follow Loader Protocol above (install whichever is needed).
> 
> Use for user research updates.

**If updating risk register:**
> **Load skill:** `explore.proc.risk-documentation` — follow Loader Protocol above.
> 
> Use for risk assessment updates.

**Otherwise:**
> Proceed with inline updates using existing artifact templates.

**Agent loads only:**
1. Affected artifacts (to update)
2. Dependent artifacts (to validate)
3. Relevant skills (if needed for updates)

**Context budget:**
- Target: <50K tokens (vs 100K+ for full re-run)
- Load artifact sections, not full files
- Skip unaffected artifacts entirely

---

### Step 3: Apply Updates (Only After Steering Team Approval)

**Agent updates affected sections (only those approved in Step 1):**

For each affected artifact (that steering team approved):

1. **Load current version** from disk
2. **Identify section to update** (not entire file)
3. **Apply change** with evidence tagging
4. **Mark as updated** with timestamp and reason

**Human-First Enforcement:**
- Agent updates ONLY artifacts steering team approved in Step 1
- No speculative updates to artifacts not in approved list
- Steering team controlled scope upfront (leading authority)

**Update format:**

```markdown
## [Section Name]

[Updated content]

---
**Last Updated**: [timestamp]  
**Change**: [brief description]  
**Triggered by**: [user input / stakeholder feedback / new requirement]
```

**Evidence discipline:**
- New claims tagged `[ASSUMPTION]` if unvalidated
- Validated claims tagged `[VALIDATED]`
- Changed claims show `[UPDATED: reason]`

---

### Step 4: Validate Consistency

**Agent checks cross-artifact consistency:**

| Check | Validation |
|-------|-----------|
| **PRD ↔ Context** | New requirements align with scope boundaries |
| **PRD ↔ HLD** | Technical changes reflected in architecture |
| **Personas ↔ Journeys** | User changes consistent across artifacts |
| **Hypothesis ↔ PRD** | Goals still aligned with hypothesis |
| **Risks ↔ All** | New risks captured in risk register |

**Agent presents:**

```
Consistency Validation:

✓ PRD Section 3.2 aligns with updated Context scope
✓ HLD ADR-003 reflects new architecture decision
⚠ Personas.md mentions "mobile app" but PRD now excludes mobile
  → Recommendation: Update Personas section 2.3

Inconsistencies found: [N]
  1. [Description] — Affects: [artifacts]
     Recommendation: [fix]
```

**STOP — AskUserQuestion:**

```
Question R-2
  Header:      "Consistency check (HUMAN APPROVES FIXES)"
  Question:    "I found [N] inconsistencies (above).
                I will NOT fix them until you approve.
                How should I proceed?"
  Multi-select: No
  Options:
    - Yes — fix all automatically  — Agent updates all inconsistencies
    - Let me review each one        — Agent asks per inconsistency for approval
    - Skip consistency fixes        — Proceed with primary updates only
```

**After user responds:**
- If fix all: Steering team has approved all fixes; apply consistency fixes
- If review each: Present each inconsistency for individual steering team approval
- If skip: Steering team chose to skip; proceed with primary updates only
- Continue to Step 5 (Write Updates)

**Human-First Enforcement:**
- Agent does NOT fix inconsistencies until steering team approves
- Steering team controls which inconsistencies get fixed (leading authority)
- Agent proposes fixes, steering team decides, then agent executes

---

### Human Checkpoint: Consistency Validation

**Pause for human review before writing updates.**

**Review Criteria:**
- [ ] All inconsistencies are identified
- [ ] Proposed fixes are correct
- [ ] No hallucinated inconsistencies (all are real)
- [ ] Fixes maintain evidence discipline

**Questions to consider:**
- Are the identified inconsistencies accurate?
- Should we fix all automatically or review individually?
- Are there any inconsistencies we should leave as-is?

**Once reviewed:**
- Continue to Step 5 (Write Updates)
- OR stop here and adjust consistency fixes if needed

---

### Step 5: Write Updates

**Agent writes updated artifacts to disk:**

```
Writing updates:

Updated:
  ✓ explore/prds/[slug]-prd.md (Section 3.2)
  ✓ explore/hlds/[slug]-hld.md (ADR-003)
  ✓ explore/explore-[slug]/context.md (Scope section)

Validated (no changes):
  • explore/explore-[slug]/hypothesis.md
  • explore/domain/personas-[slug].md

Change log:
  → Added GDPR compliance requirement to PRD Section 3.2
  → Updated HLD ADR-003 to reflect data residency constraint
  → Expanded Context scope to include EU region
```

---

### Step 6: Notify Stakeholders

**Agent proposes notification:**

```
Stakeholder Notification:

Who to notify:
  • [Product Manager Name] — PRD owner
  • [Architect Name] — HLD owner
  • [Compliance Lead] — New GDPR requirement

Message:
  Subject: Explore [slug] - Specification Updated
  
  The following artifacts have been updated based on [trigger]:
  
  - PRD Section 3.2: Added GDPR compliance requirement
  - HLD ADR-003: Updated for data residency
  - Context: Expanded scope to EU region
  
  Please review updated sections and confirm alignment.
  
  Updated files: [links]
```

**STOP — AskUserQuestion:**

```
Question R-3
  Header:      "Stakeholder notification"
  Question:    "Should I notify stakeholders of these changes?"
  Multi-select: No
  Options:
    - Yes — send notification     — Agent logs notification (manual send)
    - No — I'll notify them       — Skip notification
    - Adjust message              — Tell me what to change
```

**After user responds:**
- If yes: Log notification for manual send
- If no: Skip notification
- If adjust: Update message and re-present
- Complete refinement workflow

---

### Human Checkpoint: Stakeholder Notification

**Final review before completing refinement.**

**Review Criteria:**
- [ ] All updates are written to disk
- [ ] Change log is documented
- [ ] Stakeholder notification is appropriate
- [ ] All affected parties are identified

**Questions to consider:**
- Should we notify stakeholders of these changes?
- Is the notification message clear and complete?
- Are there any other stakeholders to notify?

**Once reviewed:**
- Refinement is complete
- Updates are applied and documented

---

## Artifact Dependency Map

**Use this to identify affected artifacts:**

```
Signal
  └─> Explore Bundle ─────────────────────────────> Context
       │                                              │
       └─> Discovery Index ─ ─ ─> Govern Readiness    ├─> Domain Analysis ──> Glossary
                                                      ├─> Market Research ─ ─> PRD, HLD
                                                      ├─> Regulatory Compliance ─ ─> PRD, HLD, Test Strategy, DevOps Strategy
                                                      ├─> Technical Feasibility ──> PRD
                                                      ├─> Architecture Drivers ──> HLD, Test Strategy, Risks
                                                      ├─> Domain Model (Step 2) ─ ─> Final Domain, HLD
                                                      └─> Landscape Assessment ──> HLD

  Personas ──> PRD          Journey Maps ──> PRD          Hypothesis ──> PRD

  Glossary ─ ─> PRD, HLD, Epics, Final Domain

  PRD ──> IA ──> Flows ──> Wireframes ──> Usability Test Plan ─ ─> Risks
           │        │           │              └─> Accessibility Specs ─ ─> Epics, Test Strategy
           │        │           └─ ─> PRD (retroactive: requirement gaps)
           │        └─ ─> HLD (API surface, state transitions)
           └─> Risks

  Wireframes ──> Handoff Notes ──> Risks, HLD

  Design Pipeline (UX/UI gated):
    OOUX Analysis ──> OOUX Map ─ ─> HLD
    Design Language ─ ─> HLD (conditional: FL exit)
    Design System ─ ─> HLD (conditional: D/C)
    Component Inventory ─ ─> HLD (API contracts)

  PRD ──> HLD ──> ADRs ─ ─> Risks
           │        └─> Govern Readiness
           ├─> Test Strategy ──> Govern Readiness
           ├─> DevOps Strategy ──> Govern Readiness
           ├─> Epics ──> Govern Readiness
           └─ ─> PRD (retroactive: feasibility constraints)

  Legend: ──> primary dependency    ─ ─> conditional/soft dependency
```

**Dependency rules:**
- Updating parent → validate all children
- Updating child → validate parent only
- Updating sibling → validate shared parent
- Retroactive feeds (PRD ← wireframes, PRD ← HLD, Risks ← ADRs) → re-validate the enriched artifact

---

## Common Update Patterns

### Pattern 1: Add New Requirement

**Affects:**
- PRD (new section or requirement)
- Context (scope validation)
- Risks (if new risk introduced)

**Steps:**
1. Add requirement to PRD
2. Validate scope in Context
3. Add risk if applicable
4. Check HLD for architecture impact

---

### Pattern 2: Change Architecture Decision

**Affects:**
- HLD (ADR update or new ADR)
- PRD (technical notes section)
- Technical Feasibility (constraints update)
- Risks (technical risk update)

**Steps:**
1. Update or create ADR
2. Update PRD technical notes
3. Validate technical feasibility
4. Update risk register

---

### Pattern 3: Scope Reduction

**Affects:**
- Context (scope boundaries)
- PRD (remove sections)
- Epics (remove or adjust)
- Tasks (remove affected tasks)

**Steps:**
1. Update Context out-of-scope
2. Remove PRD sections
3. Mark epics as out-of-scope
4. Archive affected tasks

---

### Pattern 4: New Compliance Requirement

**Affects:**
- Regulatory Compliance artifact
- PRD (constraints section)
- HLD (compliance architecture)
- Risks (compliance risks)

**Steps:**
1. Add to Regulatory Compliance
2. Update PRD constraints
3. Update HLD for compliance (consent, encryption, audit trail patterns)
4. Add compliance risks
5. Update test-strategy (compliance test cases)
6. Update devops-strategy (audit logging, data residency, retention policies)

---

### Pattern 5: Change Design Decision (UX/UI in scope)

**Affects:**
- Design Language / Design System (token or component change)
- HLD (frontend architecture direction, component delivery)
- Component Inventory (if D/C)
- Risks (design feasibility)

**Steps:**
1. Update design artifact (design-language, design-system, or component-inventory)
2. Validate OOUX map consistency
3. Update HLD sections affected by design change
4. Update risk register if feasibility affected
5. Re-validate handoff-notes (if D/C)

---

### Pattern 6: Retroactive Feed Triggered

**Affects:** The *upstream* artifact that received the retroactive feed.

**Triggers:**
- Wireframes reveal PRD requirement gaps → update PRD, re-validate HLD
- HLD reveals PRD feasibility constraints → update PRD, re-validate epics
- ADRs reveal trade-off risks → update risk register, re-validate epics

**Steps:**
1. Update the upstream artifact with the new information
2. Tag the change as retroactive: `[RETROACTIVE: source artifact → target artifact]`
3. Validate all downstream dependents of the updated artifact
4. Update discovery.md enrichment log

---

## Exit Criteria

**Refinement complete when:**

- ✅ All affected artifacts updated
- ✅ Consistency validated across artifacts
- ✅ Evidence discipline maintained (`[ASSUMPTION]` / `[VALIDATED]` tags)
- ✅ Change log documented
- ✅ Stakeholders notified (or notification skipped by steering team)

**Agent confirms:**

```
Refinement Complete

Updated: [N] artifacts
Validated: [N] dependent artifacts
Inconsistencies fixed: [N]
Stakeholders notified: [Yes/No]

Next steps:
  • Review updated artifacts: [links]
  • [If PRD changed] Re-run Govern Readiness Check
  • [If epics changed] Regenerate affected task stubs
  • [If major change] Consider re-running full Explore step
```

---

## Exit Criteria (Gate Out)

Before completing refinement, verify:

**Update Artifacts:**
- [ ] All affected artifacts updated with changes
- [ ] All updates have timestamps and change descriptions
- [ ] Evidence discipline maintained (`[ASSUMPTION]` / `[VALIDATED]` tags)
- [ ] Change log documented in each updated artifact

**Consistency Validation:**
- [ ] Cross-artifact consistency validated
- [ ] All identified inconsistencies fixed or documented
- [ ] Dependent artifacts validated (no new inconsistencies)
- [ ] No hallucinated dependencies or inconsistencies

**Documentation:**
- [ ] Change log complete with trigger and reason
- [ ] Stakeholder notification prepared (if applicable)
- [ ] Updated artifacts follow naming conventions
- [ ] All cross-references remain valid

**Quality Gates:**
- [ ] Updates are evidenced (no hallucinated content)
- [ ] Changes align with original discovery findings
- [ ] No scope creep beyond stated change
- [ ] Refinement effort matches estimate (Low/Medium/High)

**If any criterion fails, STOP and address before completing refinement.**

---

## Workflow Complete

**STOP HERE** - Refinement step has finished.

**What to do next:**

This workflow is complete. Depending on what was updated, you may need to:

1. **If PRD changed:** Re-run Govern Readiness Check to validate handoff readiness
2. **If epics changed:** Regenerate affected task stubs using iteration event
3. **If major change:** Consider re-running the full Explore step for that phase
4. **Review updates:** Check all updated artifacts before proceeding
5. **Continue Explore:** Run another refinement if more changes needed

**Do NOT automatically proceed to next action.**

**Human decision required for next steps.**

---

## Related

- **Previous Steps:** Any of Steps 1-5 (depending on what was refined)
- **Next Action:** Depends on what was updated (see "What to do next" above)
- **Skills Used:** 
  - `explore.proc.prd-generation` (conditional - if PRD updated)
  - `explore.proc.hld-drafting` with `mode: baseline` (conditional - if HLD/ADRs updated)
  - `explore.proc.persona` (conditional - if personas updated)
  - `explore.proc.journey-mapping` (conditional - if journeys updated)
  - `explore.proc.risk-documentation` (conditional - if risks updated)
- **Artifacts:** Any artifacts in `explore/` that were identified as affected
- **Key Pattern:** Minimal context loading, targeted updates, consistency validation

---

## When NOT to Use Refinement

**Re-run full step instead if:**

- Change affects >50% of an artifact
- Requires new discovery activities (interviews, research)
- Fundamentally changes hypothesis or problem statement
- Affects 5+ artifacts significantly
- Requires new stakeholder validation
- Changes Explore Type (Fast Lane → D/C)

**Agent will recommend:**

```
⚠ This change is too large for refinement.

Recommendation: Re-run Step [N] instead

Reason: [explanation]
  • Affects [N] artifacts significantly
  • Requires new [activity type]
  • Changes fundamental [assumption/hypothesis/scope]

Estimated effort:
  • Refinement: Low-Medium but high risk of inconsistency
  • Full re-run: Higher but guaranteed consistency

Proceed with refinement anyway? (not recommended)
```

---

