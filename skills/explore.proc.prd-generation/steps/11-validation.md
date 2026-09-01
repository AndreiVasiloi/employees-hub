# Step 11: Validation

## Objective

Run a completeness check on the PRD document.

## Entry Criteria

- [ ] Step 10 (Write Document) complete
- [ ] Document exists at `explore/prds/[slug]-prd.md`

## Actions

### 11.1 Run Completeness Check

Verify all required elements:

- [ ] Problem statement is user-focused (not solution-focused)
- [ ] Goals are measurable with clear outcomes
- [ ] Success metrics have baselines, targets, and measurement methods
- [ ] Target users linked to personas
- [ ] Functional requirements have user stories and acceptance criteria
- [ ] Functional requirements use `R-XXX` ID format
- [ ] Non-functional requirements cover performance, security, reliability, usability
- [ ] Non-functional requirements use `NFR-XXX` ID format
- [ ] Quality gates defined (DoD, DoR)
- [ ] All constraints tagged [CONFIRMED] or [ASSUMPTION]
- [ ] Out of scope items explicitly listed
- [ ] All [ASSUMPTION] items converted to open questions
- [ ] Risks documented with mitigation strategies
- [ ] Dependencies mapped
- [ ] All source artifacts linked
- [ ] Traceability header present (domain, source, glossary_version, validated_by, explore_type, evidence_label)
- [ ] Approval table present

### 11.2 Present Validation Results

```
PRD Generation Complete

File: explore/prds/[slug]-prd.md
Status: Created
Priority: [High/Medium/Low]
Requirements: [N] functional (R-XXX), [N] non-functional (NFR-XXX)
Open Questions: [N] from assumptions
Risks: [N] with mitigation
Dependencies: [N] total

All 4 groups approved ✓
Ready for epic extraction and Govern phase.
```

## Exit Criteria

- [ ] All completeness checks pass
- [ ] Validation results presented to human
- [ ] Document ready for epic extraction

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.prd-generation:0.1.2:2026-08-31T11:34:43Z -->
