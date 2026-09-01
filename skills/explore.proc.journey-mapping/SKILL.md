+++
name = "explore.proc.journey-mapping"
description = "Use this skill when you need to map current-state and future-state user journeys — identifying pain points, opportunities, and emotional touchpoints across the experience. Activates after personas define who the users are. Also relevant when someone says 'walk me through the user experience,' 'where are the pain points,' or 'map the end-to-end flow.' Does NOT define who the users are — use Persona for that. Does NOT detail screen-level interaction steps — use User Flow Creation for that."
license = "Proprietary. See LICENSE.md"
+++

# Journey Mapping

Create current-state and future-state user journey maps with pain points, opportunities, and validation tracking.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Map current-state user journeys to understand existing experiences
- Design future-state experiences after solution design
- Identify pain points and improvement opportunities
- Validate user flows with stakeholders
- Document touchpoints and interactions across channels
- Understand user thoughts, feelings, and behaviors at each stage
- Produce agent-ready journey sets for downstream consumption

**Key principle**: All journeys are produced as a single set document with agent-ready structure, enabling downstream AI agents to parse and use each journey by `journey_id` and cross-reference with `persona_id`.

## Pre-Check

If journey maps already exist at `explore/domain/journeys-[slug].md`:
1. Load the existing journey maps
2. Present to the steering team: "Existing journey maps found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before creating journey maps, ensure you have:

1. **Personas** - From Persona skill (primary actor for the journey)
2. **Context baseline** - From Context Documentation skill
3. **Stakeholder input** - Information about current user experience
4. **Slug** - Project identifier for file naming (e.g., `care-it`)

**STOP**: If personas are missing, create them first using the Persona skill.

## Process Steps

### Part A: Current-State Journey (Discovery)

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-identify-persona.md](./steps/01-identify-persona.md) | Identify which persona to map |
| 2 | [02-define-stages.md](./steps/02-define-stages.md) | Define journey stages |
| 3 | [03-map-current-state.md](./steps/03-map-current-state.md) | Map current-state for each stage |
| 4 | [04-identify-opportunities.md](./steps/04-identify-opportunities.md) | Identify opportunities from pain points |
| 5 | [05-write-current-state.md](./steps/05-write-current-state.md) | Write current-state journey map |

### Part B: Future-State Journey (Solution Design)

| Step | File | Purpose |
|------|------|---------|
| 6 | [06-load-journey.md](./steps/06-load-journey.md) | Load existing journey map |
| 7 | [07-design-future-state.md](./steps/07-design-future-state.md) | Design future-state for each stage |
| 8 | [08-update-journey.md](./steps/08-update-journey.md) | Update journey map with future-state |

### Validation

| Step | File | Purpose |
|------|------|---------|
| 9 | [09-validation.md](./steps/09-validation.md) | Run completeness validation |

## Output Format

```
explore/domain/journey-[slug].md
```

**Template**: `templates/journey-template.md`

**Structure**:
- Journey overview (scope, primary actor, timeframe, last updated)
- Journey Stages table (current-state and future-state columns)
- Pain Points Summary table
- Opportunities Summary table
- Validation Log table
- AGENT USAGE INSTRUCTIONS section

## Integration with Workflows

**Consumes**:
- **Persona** — Journey maps reference personas as primary actors
- **Context Documentation** — Journey maps reference system map for touchpoints

**Produces** (consumed by):
- **Hypothesis Documentation** (`explore.proc.hypothesis-documentation`) — Pain points and opportunity moments feed hypothesis
- **Information Architecture** (`explore.proc.information-architecture`) — Key tasks and workflows inform IA
- **User Flow Creation** (`explore.proc.user-flow-creation`) — Journeys provide context for flow creation
- **Wireframing** (`explore.proc.wireframing`) — Identifies key tasks and workflows
- **Usability Testing** (`explore.proc.usability-testing`) — Key tasks to test
- **PRD Generation** (`explore.proc.prd-generation`) — Journey pain points become requirements
- **Architecture Solutioning** (`explore.proc.architecture-solutioning`) — Flows inform integration and data flow design

## Best Practices

**Do**:
- ✅ Focus on one primary persona per journey map
- ✅ Tag all stages with [VALIDATED] or [ASSUMPTION]
- ✅ Document both rational (thoughts) and emotional (feelings) aspects
- ✅ Identify specific, actionable pain points
- ✅ Link opportunities directly to pain points
- ✅ Update future-state after HLD is created
- ✅ Break journey into 4-7 stages (not too granular, not too high-level)
- ✅ Produce all journeys in a single set document with AGENT USAGE INSTRUCTIONS
- ✅ Use consistent `journey_id` format (J1, J2, J3...) for cross-referencing
- ✅ Calculate validation priority based on assumption percentage

**Don't**:
- ❌ Mix multiple personas in one journey map
- ❌ Skip validation status tagging
- ❌ Create future-state before HLD exists
- ❌ Forget to update journey map after Solution Design
- ❌ Ignore emotional/feeling aspects
- ❌ Create vague pain points like "user is frustrated" (be specific about why)
- ❌ Create one file per journey (always use single journey set document)
- ❌ Omit AGENT USAGE INSTRUCTIONS section

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] Current-state journey mapped with pain points per stage
- [ ] At least one failure/recovery path per journey
- [ ] Touchpoints identified per stage
- [ ] Emotional states captured with specific causes
- [ ] Opportunities linked to pain points
- [ ] Single journey set document with AGENT USAGE INSTRUCTIONS
- [ ] Future-state deferred until HLD exists (or grounded in HLD)

## Gotchas

- ⚡ **Happy path tunnel vision**: The agent tends to map only the ideal journey. Real journeys include error states, dead ends, and recovery paths. Always map at least one failure/recovery path per journey — these reveal the most impactful pain points.
- ⚡ **Future-state before solution design**: The agent sometimes creates future-state journeys before the HLD exists, filling in imagined solutions. Future-state journeys must be grounded in actual solution design decisions — otherwise they become aspirational fiction.
- ⚡ **Emotion flattening**: Pain points like "user is frustrated" are too vague. The agent often defaults to generic emotional labels. Always specify the cause of the emotion (e.g., "user is frustrated because they can't find the order status after 3 clicks").

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.journey-mapping:0.1.2:2026-08-27T13:34:42Z -->
