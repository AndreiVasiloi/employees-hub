# Step 9: Validation

## Entry Criteria
- Test strategy document written in Step 8

## Actions

### Action 1: Run Completeness Check

**Agent validates the document against all required sections:**

```
Completeness Validation:

Section 1  — Overview                    [✓/✗] Purpose, scope, principles present
Section 2  — Testing Pyramid             [✓/✗] All layers defined with targets
Section 3  — Unit Testing                [✓/✗] Scope, patterns, framework, targets
Section 4  — Integration Testing         [✓/✗] Boundaries, approach, framework
Section 5  — Contract Testing            [✓/✗] Approach defined or "N/A" with rationale
Section 6  — E2E Testing                 [✓/✗] Journeys listed, framework, stability
Section 7  — Non-Functional Testing      [✓/✗] All selected types covered
Section 8  — Test Data & Environments    [✓/✗] Data per layer, env topology
Section 9  — CI/CD Integration           [✓/✗] Stages, gates, failure policies
Section 10 — Metrics & Success Criteria  [✓/✗] Targets, KPIs, red flags
Section 11 — Risks & Mitigations         [✓/✗] Risks identified with mitigations
Section 12 — References                  [✓/✗] PRD, HLD, ADR links correct
```

### Action 2: Run Consistency Check

**Agent validates cross-references and internal consistency:**

```
Consistency Validation:

[✓/✗] Tech stack in strategy matches HLD tech stack
[✓/✗] NFR targets in strategy match PRD NFR section
[✓/✗] E2E journeys reference PRD user journeys by name
[✓/✗] Integration boundaries match HLD component boundaries
[✓/✗] Coverage targets in metrics section match pyramid layer definitions
[✓/✗] Quality gate thresholds match metrics section targets
[✓/✗] Tooling selections are compatible with tech stack
[✓/✗] Pipeline stages cover all pyramid layers
[✓/✗] Risk heat map areas match PRD functional scope
[✓/✗] Document history is populated
```

### Action 3: Run Actionability Check

**Agent validates that the strategy is executable (not just descriptive):**

```
Actionability Validation:

[✓/✗] Every pyramid layer has a named framework and tool
[✓/✗] Every layer has a concrete coverage target (number, not "adequate")
[✓/✗] Every quality gate has a measurable threshold
[✓/✗] E2E tests have specific journeys listed (not "critical paths")
[✓/✗] Test data strategy has concrete approach per layer
[✓/✗] Pipeline stages have max duration targets
[✓/✗] Failure policies state what happens (not "investigate")
[✓/✗] Flaky test policy has a concrete SLA (fix within N sprints)
[✓/✗] Metrics have measurement tools identified
```

### Action 4: Present Validation Results

```
Test Strategy Validation: [PASS / FAIL]

Completeness:  [N]/12 sections complete
Consistency:   [N]/10 checks passed
Actionability: [N]/9 checks passed

Issues found:
  [List any failures with specific section and what needs fixing]

Overall: [PASS — ready for steering team review / FAIL — [N] issues to address]
```

**If FAIL**: Fix issues and re-validate before proceeding.

### Action 5: Request Steering Team Approval

**STOP — AskUserQuestion:**

```
Question TS-11
  Header:      "Test Strategy approval"
  Question:    "The test strategy document is complete and validated
                ([N]/12 sections, [N]/10 consistency, [N]/9 actionability).
                Review explore/explore-[slug]/test-strategy.md.
                Does this strategy meet the project's quality needs?"
  Multi-select: No
  Options:
    - Approved                    — Strategy is complete; ready for implementation
    - Adjust coverage targets     — Tell me which targets to change
    - Adjust tooling              — Tell me which tools to change
    - Revise scope                — Tell me what to add or remove
```

**After approval, update discovery.md:**

Agent enriches `explore/explore-[slug]/discovery.md` — updates test strategy row from ⏳ → ✓.

## Checkpoint
- [ ] Completeness check passed (12/12 sections)
- [ ] Consistency check passed (all cross-references valid)
- [ ] Actionability check passed (all targets measurable and specific)
- [ ] Steering team approved the strategy

## Exit Criteria
- Test strategy document validated and approved
- Discovery document updated
- Strategy is ready to inform Task Planning and Task Implementation

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.test-strategy:0.2.1:2026-09-01T09:06:28Z -->
