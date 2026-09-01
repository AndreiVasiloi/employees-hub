+++
template_name = "Journey Set Template"
version = "1.0"
output_format = "explore/domain/journey-[slug].md"
validation_required = true
+++

# Journey Set: {Product / Context Name}

**version**: 1.0
**created**: {YYYY-MM-DD}
**source**: {Human-provided}
**product_context**: {The product or service these journeys cover}
**journey_count**: {N}
**persona_set_ref**: ux/personas/{slug}-personas.md
**status**: draft

---

## AGENT USAGE INSTRUCTIONS

This document is designed to be read and used by a downstream AI agent.

- Reference journeys by ID (e.g., `journey_id: J1`)
- `[VALIDATED]` = step confirmed from human-provided input or persona [VALIDATED] fields.
  Safe to use in downstream flows, specs, or decisions.
- `[ASSUMPTION]` = step inferred by agent based on scenario context or domain patterns.
  Must be validated with real user research before use in design or strategic decisions.
- Narrative text: confirmed content is written plainly. Inferred content is prefixed "Assumed:".
- The "Assumptions to Validate" section per journey lists the highest-priority items.
- `journey_id` and `persona_id` fields enable cross-referencing with the persona set and flow set.
- **Validation priority** = High if >50% of steps are assumptions; Medium if 25–50%; Low if <25%.

---

## Journey J1: {Title}

**journey_id**: J1
**persona_id**: {P1 / N/A}
**persona_name**: {Name or N/A}
**scenario**: {1-sentence goal statement — e.g., "User discovers and signs up for the product"} `[VALIDATED / ASSUMPTION]` 
**journey_type**: {Linear / Loop / Decision tree} `[VALIDATED / ASSUMPTION]` 
**entry**: {Starting state — e.g., "User lands on homepage from paid ad"} `[VALIDATED / ASSUMPTION]` 
**exit**: {End state / success condition — e.g., "User completes onboarding and reaches dashboard"} `[VALIDATED / ASSUMPTION]` 
**status**: draft

### Journey Map Table

| Phase | Step | Actor | Action | Thought | Emotion | Goal | Input | Output | CTA | Shape | Tag |
|-------|------|-------|--------|---------|---------|------|-------|--------|-----|-------|-----|
| {Phase name} | 1 | {Who — user / system / support} | {What they do} | {What they're thinking} | {😊 / 😐 / 😟} | {What they want at this step} | {What triggers this step} | {What results from this step} | {Next action prompt} | Rectangle | [VALIDATED / ASSUMPTION] |
| {Phase name} | 2 | {Who} | {What they do} | {What they're thinking} | {😊 / 😐 / 😟} | {What they want} | {Trigger} | {Result} | {Next prompt} | Circle | [VALIDATED / ASSUMPTION] |
| {Phase name} | 3 | {Who} | {Decision point description} | {What they're thinking} | {😊 / 😐 / 😟} | {What they want} | {Trigger} | {Yes → Step 4a / No → Step 4b} | {Next prompt} | Diamond | [VALIDATED / ASSUMPTION] |

**Shape key**: Rectangle = screen or touchpoint · Circle = user action · Diamond = decision point

### Narrative Walkthrough

> Confirmed content written plainly. Inferred content prefixed "Assumed:".

{Paragraph-by-paragraph story of the journey, written from the persona's perspective.

Example: "She opens the app for the first time after clicking a social ad. She's curious
but skeptical — she's tried similar tools before without success. Assumed: she feels mild
anxiety about yet another sign-up form. She scans the landing page quickly, looking for
social proof before committing..."}

### Assumptions to Validate

> All items below are agent-inferred. Confirm with real user research before using
> in user flows, wireframes, or strategic decisions.

- [ ] {Assumption 1 — e.g., "User feels anxious at Step 2 — confirm with interview data"}
- [ ] {Assumption 2 — e.g., "Primary device is mobile — confirm with analytics"}

### Opportunities

- {Opportunity 1 — where the experience can be improved} `[VALIDATED / ASSUMPTION]` 
- {Opportunity 2} `[VALIDATED / ASSUMPTION]` 

---

## Journey J2: {Title}

**journey_id**: J2
**persona_id**: {P2 / N/A}
**persona_name**: {Name or N/A}
**scenario**: {1-sentence goal statement} `[VALIDATED / ASSUMPTION]` 
**journey_type**: {Linear / Loop / Decision tree} `[VALIDATED / ASSUMPTION]` 
**entry**: {Starting state} `[VALIDATED / ASSUMPTION]` 
**exit**: {End state / success condition} `[VALIDATED / ASSUMPTION]` 
**status**: draft

### Journey Map Table

| Phase | Step | Actor | Action | Thought | Emotion | Goal | Input | Output | CTA | Shape | Tag |
|-------|------|-------|--------|---------|---------|------|-------|--------|-----|-------|-----|
| {Phase} | 1 | {Who} | {Action} | {Thought} | {😊 / 😐 / 😟} | {Goal} | {Input} | {Output} | {CTA} | Rectangle | [VALIDATED / ASSUMPTION] |
| {Phase} | 2 | {Who} | {Action} | {Thought} | {😊 / 😐 / 😟} | {Goal} | {Input} | {Output} | {CTA} | Circle | [VALIDATED / ASSUMPTION] |

### Narrative Walkthrough

> Confirmed content written plainly. Inferred content prefixed "Assumed:".

{Narrative...}

### Assumptions to Validate

- [ ] {Assumption 1}
- [ ] {Assumption 2}

### Opportunities

- {Opportunity 1} `[VALIDATED / ASSUMPTION]` 

---

<!-- Repeat the Journey block above for J3, J4, etc. -->

---

## Validation Summary

| Journey | Total Steps | Validated | Assumptions | Validation Priority |
|---------|-------------|-----------|-------------|-------------------|
| J1: {Title} | {N} | {N} | {N} | {High / Medium / Low} |
| J2: {Title} | {N} | {N} | {N} | {High / Medium / Low} |

**Validation priority** = High if >50% of steps are assumptions; Medium if 25–50%; Low if <25%.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.journey-mapping:0.1.2:2026-08-27T13:34:42Z -->
