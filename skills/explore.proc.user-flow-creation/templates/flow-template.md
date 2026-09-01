+++
template_name = "Flow Set Template"
version = "1.0"
output_format = "explore/domain/flows-[slug].md"
validation_required = true
+++

# Flow Set: {Product / Context Name}

**version**: 1.0
**created**: {YYYY-MM-DD}
**source**: {Human-provided}
**product_context**: {The product or service these flows cover}
**flow_count**: {N}
**persona_set_ref**: explore/domain/personas-{slug}.md
**journey_set_ref**: explore/domain/journey-{slug}.md
**status**: draft

---

## AGENT USAGE INSTRUCTIONS

This document is designed to be read and used by a downstream AI agent.

- Reference flows by ID (e.g., `flow_id: F1`)
- `[VALIDATED]` = step confirmed from human-provided input or system specification.
  Safe to use in wireframes, prototypes, or implementation specs.
- `[ASSUMPTION]` = step inferred by agent based on common UX patterns or context.
  Must be confirmed with the product team before implementation.
- Narrative text: confirmed steps written plainly. Inferred steps prefixed "Assumed:".
- The "Assumptions to Validate" section per flow lists the highest-priority items.
- `flow_id`, `persona_id`, and `journey_id` fields enable cross-referencing across all artifact sets.
- **Validation priority** = High if >50% of steps are assumptions; Medium if 25–50%; Low if <25%.

### Shape Legend (applies to all flows in this set)
- ▭ Rectangle — Screen or page
- ○ Circle — User action or event
- ◇ Diamond — Decision point
- → Arrow — Direction of flow

---

## Flow F1: {Title}

**flow_id**: F1
**objective**: {One clear task goal} `[VALIDATED / ASSUMPTION]` 
**entry_point**: {Starting state} `[VALIDATED / ASSUMPTION]` 
**exit_point**: {Successful completion state} `[VALIDATED / ASSUMPTION]` 
**persona_id**: {P1 / N/A}
**journey_id**: {J1 / N/A}
**status**: draft

### User Flow Table

| Step | Screen / Action | Decision? | Outcome | Shape | Tag |
|------|----------------|-----------|---------|-------|-----|
| 1 | {Screen or action name} | N | {What happens next} | ▭ Rectangle | [VALIDATED / ASSUMPTION] |
| 2 | {User action} | N | {Result} | ○ Circle | [VALIDATED / ASSUMPTION] |
| 3 | {Decision: condition?} | Y | Yes → Step 4a / No → Step 4b | ◇ Diamond | [VALIDATED / ASSUMPTION] |
| 4a | {Screen if Yes} | N | {Next step} | ▭ Rectangle | [VALIDATED / ASSUMPTION] |
| 4b | {Screen if No} | N | {Next step} | ▭ Rectangle | [VALIDATED / ASSUMPTION] |

### Narrative Task Flow

> Confirmed steps written plainly. Inferred steps prefixed "Assumed:".

{Step-by-step paragraph describing the flow from entry to exit, including
decision paths and edge cases. 

Example: "The user lands on the homepage and clicks Sign Up. The sign-up modal appears
with email and password fields. Assumed: password requirements are displayed inline as
the user types. The user submits the form. If validation passes, they proceed to Step 5.
If validation fails, they see inline error messages and remain on the form (Step 4b)..."}

### Assumptions to Validate

> All items below are agent-inferred. Confirm with the product team before
> using in wireframes, prototypes, or implementation specs.

- [ ] {Assumption 1 — e.g., "Step 3 decision condition needs engineering confirmation"}
- [ ] {Assumption 2 — e.g., "Password validation rules need product team approval"}

---

## Flow F2: {Title}

**flow_id**: F2
**objective**: {One clear task goal} `[VALIDATED / ASSUMPTION]` 
**entry_point**: {Starting state} `[VALIDATED / ASSUMPTION]` 
**exit_point**: {Successful completion state} `[VALIDATED / ASSUMPTION]` 
**persona_id**: {P2 / N/A}
**journey_id**: {J2 / N/A}
**status**: draft

### User Flow Table

| Step | Screen / Action | Decision? | Outcome | Shape | Tag |
|------|----------------|-----------|---------|-------|-----|
| 1 | {Screen or action name} | N | {What happens next} | ▭ Rectangle | [VALIDATED / ASSUMPTION] |
| 2 | {User action} | N | {Result} | ○ Circle | [VALIDATED / ASSUMPTION] |

### Narrative Task Flow

> Confirmed steps written plainly. Inferred steps prefixed "Assumed:".

{Narrative...}

### Assumptions to Validate

- [ ] {Assumption 1}
- [ ] {Assumption 2}

---

<!-- Repeat the Flow block above for F3, F4, etc. -->

---

## Validation Summary

| Flow | Total Steps | Validated | Assumptions | Validation Priority |
|------|-------------|-----------|-------------|-------------------|
| F1: {Title} | {N} | {N} | {N} | {High / Medium / Low} |
| F2: {Title} | {N} | {N} | {N} | {High / Medium / Low} |

**Validation priority** = High if >50% of steps are assumptions; Medium if 25–50%; Low if <25%.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.user-flow-creation:0.2.1:2026-08-31T12:53:29Z -->
