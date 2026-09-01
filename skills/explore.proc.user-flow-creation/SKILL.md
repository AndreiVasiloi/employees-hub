+++
name = "explore.proc.user-flow-creation"
description = "Use this skill when you need to create task-specific user flows — diagramming screen-to-screen navigation, decision points, and alternate paths with UX validation. Activates after personas and journeys define the user context. Also relevant when someone says 'diagram the flow,' 'map the interaction steps,' or 'how does the user get from A to B.' Does NOT define content structure or navigation hierarchy — use Information Architecture for that. Does NOT produce screen layouts — use Wireframing for that."
license = "Proprietary. See LICENSE.md"
+++

# User Flow Creation

Create task-specific user flows with UX validation, decision points, and agent-ready structure for wireframing and prototyping.

## Step Execution Rule
**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step
❌ Reading ahead ❌ Multiple steps ❌ Skipping step files

## When to Use

Use this skill when you need to:
- Diagram task-specific user flows before wireframing or prototyping
- Map decision points and alternate paths in a feature
- Validate flow logic against UX best practices
- Document screen-to-screen navigation
- Create implementation-ready flow specifications
- Produce agent-ready flow sets for downstream consumption (design handoff, dev specs, prototyping)

**Key principle**: All flows are produced as a single set document with agent-ready structure, enabling downstream AI agents to parse and use each flow by `flow_id` and cross-reference with `persona_id` and `journey_id` without further interpretation.

## Pre-Check

If user flows already exist at `explore/domain/flows-[slug].md`:
1. Load the existing flows
2. Present to the steering team: "Existing user flows found. Review and update, or create fresh?"
3. If updating → skip to the validation step with existing data for review
4. If creating fresh → proceed from Step 1

## Inputs to Request (if missing)

Before creating user flows, ensure you have:

1. **PRD** — `explore/prds/[slug]-prd.md` (requirements, user tasks, acceptance criteria)
2. **Information Architecture** — `explore/design/information-architecture-[slug].md` (page structure, navigation model)
3. **Personas** — From Persona skill (who is performing the task)
4. **Journey maps** — From Journey Mapping skill (context for the flow)
5. **Task objective** — Clear goal for each flow (e.g., "User signs up for account")
6. **Slug** — Project identifier for file naming (e.g., `care-it`)

**STOP**: If PRD or Information Architecture is missing, create them first using the appropriate skills.

> **Note**: Technical constraints from HLD will be incorporated retroactively when Architecture Discovery completes. User flows can be created before architecture exists; update flows incrementally as HLD and ADRs mature.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-identify-flows.md](./steps/01-identify-flows.md) | Identify flow count and scope |
| 2 | [02-gather-parameters.md](./steps/02-gather-parameters.md) | Gather flow parameters per flow |
| 3 | [03-propose-structure.md](./steps/03-propose-structure.md) | Propose flow structure per flow |
| 4 | [04-create-flow-set.md](./steps/04-create-flow-set.md) | Create flow set document |
| 5 | [05-ux-validation.md](./steps/05-ux-validation.md) | Run UX validation check |
| 6 | [06-present-validation.md](./steps/06-present-validation.md) | Present flows for human validation |
| 7 | [07-validation-summary.md](./steps/07-validation-summary.md) | Create validation summary |
| 8 | [08-write-document.md](./steps/08-write-document.md) | Write to Context Warehouse |
| 9 | [09-final-validation.md](./steps/09-final-validation.md) | Final validation |

## Output Format

```
explore/domain/flows-[slug].md
```

**Template**: `templates/flow-template.md`

**Structure**:
- YAML frontmatter (version, created, source, product_context, flow_count, persona/journey refs, status)
- Agent Usage Instructions (including Shape Legend)
- One section per flow (F1, F2, F3, etc.) with metadata, flow table, narrative, assumptions
- Validation Summary table

**Shape Legend**:
- ▭ Rectangle — Screen or page
- ○ Circle — User action or event
- ◇ Diamond — Decision point
- → Arrow — Direction of flow

## Integration with Workflows

**Consumes**:
- **PRD Generation** — Requirements and user tasks define flow scope and acceptance criteria
- **Information Architecture** — Page structure and navigation model define flow paths
- **Persona** — Flows reference personas as actors
- **Journey Mapping** — Flows implement specific journey stages

**Produces** (consumed by):
- **Wireframing** (`explore.proc.wireframing`) — Screen sequences derived from flow steps
- **Usability Testing** (`explore.proc.usability-testing`) — Flow scenarios become test tasks
- **Risk Documentation** (`explore.proc.risk-documentation`) — Edge cases from error states and decision-point failures
- **Architecture Solutioning** (`explore.proc.architecture-solutioning`) — API surface, state transitions, error handling paths

## Best Practices

**Do**:
- ✅ Define one clear task objective per flow
- ✅ Tag every step with [VALIDATED] or [ASSUMPTION]
- ✅ Ensure every decision node has exactly 2 labeled paths
- ✅ Validate against UX best practices before presenting
- ✅ Write narratives using only validated data (or prefix with "Assumed:")
- ✅ Cross-reference personas and journeys by ID
- ✅ Produce all flows in a single set document with AGENT USAGE INSTRUCTIONS
- ✅ Use consistent `flow_id` format (F1, F2, F3...) for cross-referencing
- ✅ Calculate validation priority based on assumption percentage
- ✅ Include Shape Legend in AGENT USAGE INSTRUCTIONS

**Don't**:
- ❌ Create flows with multiple objectives
- ❌ Skip UX validation checks
- ❌ Leave decision nodes with unlabeled paths
- ❌ Create dead ends or circular loops without clear exit
- ❌ Mix shape types inconsistently
- ❌ Treat [ASSUMPTION] steps as confirmed
- ❌ Create one file per flow (always use single flow set document)
- ❌ Omit AGENT USAGE INSTRUCTIONS section
- ❌ Forget to cross-reference personas and journeys

## Completeness Checklist

**Post-edit**: Re-run this checklist after any modification to the output artifact.

- [ ] All critical user flows documented with entry and exit points
- [ ] Happy path and at least one error/alternate path per flow
- [ ] Decision points marked with labeled branching paths
- [ ] Flows cross-reference personas and journeys by ID
- [ ] Single flow set document with AGENT USAGE INSTRUCTIONS
- [ ] No dead-end flows — every terminal specifies next action

## Gotchas

- ⚡ **Happy path only**: The agent tends to map only the success path. Every flow must include at least one error/alternate path — validation failures, permission denials, and edge cases are where most UX problems hide.
- ⚡ **Technical flow masquerading as user flow**: The agent sometimes maps backend processes (API calls, database writes) as user flow steps. User flows describe what the user sees and does, not what the system does behind the scenes. If a step isn't visible to the user, it doesn't belong in the flow.
- ⚡ **Dead-end flows**: Flows that terminate without a clear next action leave users stranded. The agent may end a flow at "Success" without specifying where the user goes next. Every flow terminal must specify the user's next available action or destination.

<!-- dft:verified:Qt3BkmVuxpxTGpADkGLiMemVY0P9iBzvjM80QbkOs5M=:explore.proc.user-flow-creation:0.2.1:2026-08-31T12:53:29Z -->
