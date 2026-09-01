+++
name = "explore.proc.persona"
description = "Use this skill when you need to create evidence-based user personas — documenting user needs, behaviors, goals, and frustrations with validation status tracking. Activates during discovery after context documentation. Also relevant when someone says 'who are our users,' 'target audience profiles,' 'define the user types,' or 'what do our users need.' Does NOT map what users experience over time — use Journey Mapping for that."
license = "Proprietary. See LICENSE.md"
+++

# Persona

Create evidence-based user personas with validation status tracking using [VALIDATED] and [ASSUMPTION] tags.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Create user personas from stakeholder input or research
- Document user needs, behaviors, and pain points
- Track evidence vs assumptions in user research
- Build empathy maps for design work
- Define target users for product development
- Produce agent-ready persona sets for downstream consumption

**Key principle**: All personas are produced as a single set document with agent-ready structure, enabling downstream AI agents to parse and use each persona by `persona_id` without further interpretation.

## Pre-Check

If a persona set already exists at `explore/domain/personas-[slug].md`:
1. Load the existing personas
2. Present to the steering team: "Existing personas found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before creating personas, ensure you have:

1. **Stakeholder input** - Information about target users from interviews, surveys, or workshops
2. **Context baseline** - From Context Documentation skill (domain model, system map)
3. **Signal document** - If available, actors identified in the Signal
4. **Research data** - User interviews, analytics, customer feedback (if available)
5. **Slug** - Project identifier for file naming (e.g., `care-it`)

**STOP**: If stakeholder input is missing, ask the human to provide information about target users before proceeding.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-identify-personas.md](./steps/01-identify-personas.md) | Identify persona count and types |
| 2 | [02-gather-information.md](./steps/02-gather-information.md) | Gather information per persona |
| 3 | [03-create-documents.md](./steps/03-create-documents.md) | Create persona documents with tagging |
| 4 | [04-present-validation.md](./steps/04-present-validation.md) | Present personas for human validation |
| 5 | [05-validation-summary.md](./steps/05-validation-summary.md) | Create validation summary |
| 6 | [06-write-document.md](./steps/06-write-document.md) | Write persona set to Context Warehouse |
| 7 | [07-validation.md](./steps/07-validation.md) | Run completeness validation |

## Output Format

```
explore/domain/personas-[slug].md
```

**Template**: `templates/persona-template.md`

**Structure**:
- YAML frontmatter (version, created, source, product_context, persona_count, status)
- Agent Usage Instructions
- One section per persona (P1, P2, P3, etc.) with:
  - Demographics table
  - Goals & Motivations
  - Pain Points
  - Behaviors
  - Mental Models
  - Devices & Channels
  - Values
  - Assumptions to Validate
  - Brief Narrative
- Validation Summary table

## Integration with Workflows

**Consumes**:
- **Context Documentation** — Personas reference domain model and actors
- **Domain Analysis** — Domain roles inform user personas
- **Market Research** — Target customer segments inform persona definition

**Produces** (consumed by):
- **Journey Mapping** (`explore.proc.journey-mapping`) — Personas are primary actors in journey maps
- **Hypothesis Documentation** (`explore.proc.hypothesis-documentation`) — User needs articulation feeds hypothesis
- **Information Architecture** (`explore.proc.information-architecture`) — User mental models inform IA structure
- **User Flow Creation** (`explore.proc.user-flow-creation`) — Personas as flow actors
- **Wireframing** (`explore.proc.wireframing`) — User needs and priorities inform wireframe scope
- **Usability Testing** (`explore.proc.usability-testing`) — Informs participant recruitment
- **PRD Generation** (`explore.proc.prd-generation`) — Target users section references personas
- **Architecture Solutioning** (`explore.proc.architecture-solutioning`) — User roles inform API surface and component design

## Best Practices

**Do**:
- ✅ Tag every single field with [VALIDATED] or [ASSUMPTION]
- ✅ Ask human for information before inferring
- ✅ List all assumptions in "Assumptions to Validate" section
- ✅ Calculate validation priority based on assumption percentage (>50% = High, 25-50% = Medium, <25% = Low)
- ✅ Write brief narratives using only validated data (or prefix with "Assumed:")
- ✅ Create 2-4 personas (not too many, not too few)
- ✅ Focus on needs and behaviors, not just demographics
- ✅ Produce all personas in a single set document with AGENT USAGE INSTRUCTIONS
- ✅ Use consistent `persona_id` format (P1, P2, P3...) for cross-referencing

**Don't**:
- ❌ Treat [ASSUMPTION] fields as facts
- ❌ Skip the validation priority calculation
- ❌ Create generic personas without specific details
- ❌ Forget to present personas for human validation
- ❌ Mix validated and assumed data without clear tagging
- ❌ Create too many personas (>5 becomes unmanageable)
- ❌ Create one file per persona (always use single persona set document)
- ❌ Omit AGENT USAGE INSTRUCTIONS section

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] All personas tagged with [VALIDATED] or [ASSUMPTION]
- [ ] 2–4 personas created (not too many, not too few)
- [ ] Each persona has goals, pain points, behaviors, and mental models
- [ ] Validation priority calculated per persona (>50% assumptions = High)
- [ ] Assumptions to Validate section populated per persona
- [ ] Single persona set document with AGENT USAGE INSTRUCTIONS

## Gotchas

- ⚡ **Persona proliferation**: The agent tends to create a new persona for every user type mentioned. More than 5 personas becomes unmanageable — downstream skills must reference all of them. Consolidate similar users and only create distinct personas for genuinely different needs and behaviors.
- ⚡ **Demographic over-specification**: The agent often fills in demographic details (age, location, income) without evidence, creating false precision. Only include demographics that actually affect behavior or design decisions — unsupported demographics are noise.
- ⚡ **Validated/Assumption tag inflation**: When creating personas from limited stakeholder input, the agent may tag stakeholder opinions as `[VALIDATED]`. Stakeholder opinion is evidence but not validation — only user research with actual users produces `[VALIDATED]` data.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.persona:0.1.2:2026-08-27T13:34:41Z -->
