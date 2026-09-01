+++
template_name = "Persona Set Template"
version = "1.0"
output_format = "explore/domain/personas-[slug].md"
validation_required = true
+++

# Persona Set: {Product / Context Name}

**version**: 1.0
**created**: {YYYY-MM-DD}
**source**: {Upload / Manual}
**product_context**: {The product or service these personas represent}
**persona_count**: {N}
**status**: draft

---

## AGENT USAGE INSTRUCTIONS

This document is designed to be read and used by a downstream AI agent.

- Reference personas by ID (e.g., `persona_id: P1`)
- `[VALIDATED]` = confirmed from human-provided input. Safe to use in downstream artifacts.
- `[ASSUMPTION]` = agent-inferred. Must be validated with real user research before use
  in strategic decisions, journey maps, or user flows.
- Do not treat `[ASSUMPTION]` fields as facts. Surface them as hypotheses.
- The "Assumptions to Validate" section per persona lists the highest-priority items needing research.
- **Validation priority** in the summary table = High if >50% of fields are assumptions;
  Medium if 25–50%; Low if <25%.

---

## Persona P1: {Full Name}

**persona_id**: P1
**status**: draft

### Demographics

| Field | Value | Tag |
|-------|-------|-----|
| Name | {Full name — fictional but realistic} | [VALIDATED / ASSUMPTION] |
| Age | {Number or range} | [VALIDATED / ASSUMPTION] |
| Location | {City, Country — or general region} | [VALIDATED / ASSUMPTION] |
| Occupation | {Job title and industry} | [VALIDATED / ASSUMPTION] |
| Education | {Highest level + field of study} | [VALIDATED / ASSUMPTION] |
| Technical Proficiency | {Novice / Intermediate / Advanced / Expert — brief description} | [VALIDATED / ASSUMPTION] |

### Goals & Motivations

- {Goal 1} `[VALIDATED / ASSUMPTION]` 
- {Goal 2} `[VALIDATED / ASSUMPTION]` 
- {Goal 3} `[VALIDATED / ASSUMPTION]` 

### Pain Points

- {Pain point 1} `[VALIDATED / ASSUMPTION]` 
- {Pain point 2} `[VALIDATED / ASSUMPTION]` 
- {Pain point 3} `[VALIDATED / ASSUMPTION]` 

### Behaviors

- {Behavior 1 — how they act in relevant contexts} `[VALIDATED / ASSUMPTION]` 
- {Behavior 2} `[VALIDATED / ASSUMPTION]` 

### Mental Models

- {How they think about the problem space} `[VALIDATED / ASSUMPTION]` 
- {What they expect the product/service to do} `[VALIDATED / ASSUMPTION]` 

### Devices & Channels

- Primary: {device / channel} `[VALIDATED / ASSUMPTION]` 
- Secondary: {device / channel} `[VALIDATED / ASSUMPTION]` 
- Usage context: {when and where they use these} `[VALIDATED / ASSUMPTION]` 

### Values

- {Value 1 — what matters beyond the task} `[VALIDATED / ASSUMPTION]` 
- {Value 2} `[VALIDATED / ASSUMPTION]` 

### Assumptions to Validate

> All items below are agent-inferred. Confirm with real user research before using
> in journey maps, user flows, or strategic decisions.

- [ ] {Assumption 1 — specific hypothesis about this persona}
- [ ] {Assumption 2}

### Brief Narrative

> Agent-consumable summary. Written in third person. Contains only [VALIDATED] data
> unless a sentence is explicitly prefixed with "Assumed:".

{2-4 sentences describing who this person is, what they're trying to accomplish,
and what gets in their way. Inferred elements prefixed with "Assumed:".}

---

## Persona P2: {Full Name}

**persona_id**: P2
**status**: draft

### Demographics

| Field | Value | Tag |
|-------|-------|-----|
| Name | {Full name} | [VALIDATED / ASSUMPTION] |
| Age | {Number or range} | [VALIDATED / ASSUMPTION] |
| Location | {City, Country} | [VALIDATED / ASSUMPTION] |
| Occupation | {Job title and industry} | [VALIDATED / ASSUMPTION] |
| Education | {Highest level + field of study} | [VALIDATED / ASSUMPTION] |
| Technical Proficiency | {Novice / Intermediate / Advanced / Expert — brief description} | [VALIDATED / ASSUMPTION] |

### Goals & Motivations

- {Goal 1} `[VALIDATED / ASSUMPTION]` 
- {Goal 2} `[VALIDATED / ASSUMPTION]` 
- {Goal 3} `[VALIDATED / ASSUMPTION]` 

### Pain Points

- {Pain point 1} `[VALIDATED / ASSUMPTION]` 
- {Pain point 2} `[VALIDATED / ASSUMPTION]` 
- {Pain point 3} `[VALIDATED / ASSUMPTION]` 

### Behaviors

- {Behavior 1} `[VALIDATED / ASSUMPTION]` 
- {Behavior 2} `[VALIDATED / ASSUMPTION]` 

### Mental Models

- {Mental model 1} `[VALIDATED / ASSUMPTION]` 
- {Mental model 2} `[VALIDATED / ASSUMPTION]` 

### Devices & Channels

- Primary: {device / channel} `[VALIDATED / ASSUMPTION]` 
- Secondary: {device / channel} `[VALIDATED / ASSUMPTION]` 
- Usage context: {when and where they use these} `[VALIDATED / ASSUMPTION]` 

### Values

- {Value 1} `[VALIDATED / ASSUMPTION]` 
- {Value 2} `[VALIDATED / ASSUMPTION]` 

### Assumptions to Validate

> All items below are agent-inferred. Confirm with real user research before using
> in journey maps, user flows, or strategic decisions.

- [ ] {Assumption 1}
- [ ] {Assumption 2}

### Brief Narrative

> Agent-consumable summary. Written in third person.

{2-4 sentences. Inferred elements prefixed with "Assumed:".}

---

<!-- Repeat the Persona block above for P3, P4, etc. -->

---

## Validation Summary

| Persona | Total Fields | Validated | Assumptions | Validation Priority |
|---------|-------------|-----------|-------------|-------------------|
| P1: {Name} | {N} | {N} | {N} | {High / Medium / Low} |
| P2: {Name} | {N} | {N} | {N} | {High / Medium / Low} |

**Validation priority** = High if >50% of fields are assumptions; Medium if 25–50%; Low if <25%.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.persona:0.1.2:2026-08-27T13:34:41Z -->
