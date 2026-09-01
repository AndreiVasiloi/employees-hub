+++
template_name = "Hypothesis Documentation Template"
version = "1.0"
output_format = "explore/explore-[slug]/hypothesis.md"
validation_required = true
+++

# Hypothesis: {Project Name}

**Signal**: {signal-id}  
**Phase**: SP2 — Stakeholder & User Research  
**Created**: {YYYY-MM-DD}  
**Status**: {Draft / Validated / Invalidated}  

---

## Hypothesis Statement

**We believe that** {target user/persona}

**experiences** {problem/pain point}

**when** {context/situation}

**because** {root cause}

**We will know we're right when** {measurable success criteria}

---

## Evidence Base

### From Signal

**Validated evidence**:
- ✅ {Evidence point 1 from Signal} `[VALIDATED]`
- ✅ {Evidence point 2 from Signal} `[VALIDATED]`

**Assumed evidence**:
- ⚠️ {Assumption 1 from Signal} `[ASSUMPTION]`
- ⚠️ {Assumption 2 from Signal} `[ASSUMPTION]`

### From Context (SP1)

**Domain insights**:
- {Insight 1 from context baseline}
- {Insight 2 from domain model}

**System constraints**:
- {Constraint 1 that shapes the hypothesis}
- {Constraint 2 that shapes the hypothesis}

### From Personas (SP2)

**Persona insights**:
- **{Persona 1 name}**: {Key need/pain point that supports hypothesis}
- **{Persona 2 name}**: {Key need/pain point that supports hypothesis}

### From Journey Maps (SP2)

**Journey insights**:
- **{Journey 1}**: {Pain point or opportunity that supports hypothesis}
- **{Journey 2}**: {Pain point or opportunity that supports hypothesis}

---

## Success Criteria

### Quantitative Metrics

| Metric | Baseline | Target | Measurement Method | Timeline |
|--------|----------|--------|-------------------|----------|
| {Metric 1} | {Current state} | {Desired state} | {How to measure} | {When to measure} |
| {Metric 2} | {Current state} | {Desired state} | {How to measure} | {When to measure} |
| {Metric 3} | {Current state} | {Desired state} | {How to measure} | {When to measure} |

### Qualitative Indicators

- ✅ {Indicator 1 - observable behavior or outcome}
- ✅ {Indicator 2 - observable behavior or outcome}
- ✅ {Indicator 3 - observable behavior or outcome}

---

## Assumptions to Validate

**Critical assumptions** (must validate before proceeding):

| # | Assumption | Risk if Wrong | Validation Method | Owner | Status |
|---|------------|---------------|-------------------|-------|--------|
| A1 | {Critical assumption 1} | {High impact if incorrect} | {How to validate - interview/test/data} | {Stakeholder} | ⚠️ Pending |
| A2 | {Critical assumption 2} | {High impact if incorrect} | {How to validate} | {Stakeholder} | ⚠️ Pending |

**Supporting assumptions** (validate during implementation):

| # | Assumption | Risk if Wrong | Validation Method | Owner | Status |
|---|------------|---------------|-------------------|-------|--------|
| A3 | {Supporting assumption 1} | {Medium impact if incorrect} | {How to validate} | {Stakeholder} | ⚠️ Pending |
| A4 | {Supporting assumption 2} | {Medium impact if incorrect} | {How to validate} | {Stakeholder} | ⚠️ Pending |

**Status Legend**:
- ⚠️ Pending = Not yet validated
- ✅ Validated = Confirmed through research/data
- ❌ Invalidated = Proven incorrect, hypothesis needs revision

---

## Alternative Hypotheses

**If this hypothesis is wrong, alternative explanations could be**:

1. **Alternative 1**: {Different problem/cause/solution}
   - Evidence that would support this: {What would prove this instead}
   - Impact on solution: {How this would change the approach}

2. **Alternative 2**: {Different problem/cause/solution}
   - Evidence that would support this: {What would prove this instead}
   - Impact on solution: {How this would change the approach}

---

## Validation Plan

### Phase 1: Stakeholder Validation (SP2)

**Activities**:
- {Activity 1 - e.g., "Interview 5 healthcare providers about current pain points"}
- {Activity 2 - e.g., "Review analytics data on user drop-off rates"}

**Expected outcomes**:
- {Outcome 1 - what we expect to learn}
- {Outcome 2 - what we expect to learn}

**Timeline**: {Date range}

### Phase 2: Solution Validation (SP3)

**Activities**:
- {Activity 1 - e.g., "Prototype testing with 3 target users"}
- {Activity 2 - e.g., "Architecture feasibility assessment"}

**Expected outcomes**:
- {Outcome 1 - what we expect to learn}
- {Outcome 2 - what we expect to learn}

**Timeline**: {Date range}

### Phase 3: Implementation Validation (Govern)

**Activities**:
- {Activity 1 - e.g., "Beta testing with 10 early adopters"}
- {Activity 2 - e.g., "Monitor success metrics for 30 days"}

**Expected outcomes**:
- {Outcome 1 - what we expect to learn}
- {Outcome 2 - what we expect to learn}

**Timeline**: {Date range}

---

## Risks to Hypothesis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| {Risk 1 - e.g., "Users don't actually experience this pain point"} | High/Medium/Low | High/Medium/Low | {How to address - e.g., "Validate with 5+ user interviews"} |
| {Risk 2 - e.g., "Root cause is different than assumed"} | High/Medium/Low | High/Medium/Low | {How to address} |
| {Risk 3 - e.g., "Success criteria are not measurable"} | High/Medium/Low | High/Medium/Low | {How to address} |

---

## Stakeholder Validation

### Validation Sessions

| Date | Stakeholder | Feedback | Status |
|------|-------------|----------|--------|
| {YYYY-MM-DD} | {Name (Title)} | {Key feedback points} | ✅ Approved / ⚠️ Concerns / ❌ Rejected |
| {YYYY-MM-DD} | {Name (Title)} | {Key feedback points} | ✅ Approved / ⚠️ Concerns / ❌ Rejected |

### Consensus Status

**Overall validation**: {✅ Validated / ⚠️ Needs revision / ❌ Invalidated}

**Key concerns raised**:
- {Concern 1}
- {Concern 2}

**Revisions made**:
- {Revision 1 - what changed based on feedback}
- {Revision 2 - what changed based on feedback}

---

## Impact on Solution Design

**If hypothesis is validated**:
- {Implication 1 for solution design}
- {Implication 2 for solution design}
- {Implication 3 for solution design}

**If hypothesis is invalidated**:
- {What we would need to revisit}
- {Alternative approach to explore}
- {Impact on timeline/scope}

---

## Related Artifacts

- **Signal**: `signal/signals/signal-{source}-{slug}.md`
- **Context**: `explore/explore-{slug}/context.md`
- **Personas**: `explore/domain/personas-{slug}.md`
- **Journey Maps**: `explore/domain/journey-{slug}.md`
- **HLD**: `explore/hlds/{slug}-hld.md` (validates hypothesis in SP3)
- **PRD**: `explore/prds/{slug}-prd.md` (incorporates validated hypothesis)

---

## Enrichment Log

| Date | Trigger | Change |
|------|---------|--------|
| {YYYY-MM-DD} | SP2 completion | Initial hypothesis drafted |
| {YYYY-MM-DD} | Stakeholder feedback | {What changed} |
| {YYYY-MM-DD} | Validation results | {What changed} |

---

**Last Updated**: {YYYY-MM-DD}  
**Updated By**: {Agent or Human name}  
**Validation Status**: {Draft / Validated / Invalidated}

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.hypothesis-documentation:0.1.2:2026-08-27T13:34:43Z -->
